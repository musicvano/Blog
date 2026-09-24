---
title: "Case studies and common mistakes"
description: "Topic 16. Actors and Microsoft Orleans: case studies and common mistakes"
outline: [2, 3]
sourceHash: "387afa1a6783276ade2d2702dea3fcb8017c78f135cb50a9778ee001a61e9c6a"
---

# Case studies and common mistakes

## Examples of actor-based architectures

- **A game server**: grains for players, rooms, and matches; a room grain manages the game timer, player state is kept in storage, and room events go through streams (Halo, PlayFab).
- **IoT digital twins**: a grain for each device receives readings, aggregates them, and passes them to the grain of a building or workshop; reminders check devices that have gone silent.
- **Bank accounts**: an account grain processes operations sequentially (no races), state with an ETag is kept in storage, and transfers between accounts are Orleans transactions or sagas.
- **Carts and orders**: a cart grain with an abandoned-cart reminder, and a `[StatelessWorker]` for price checks.

The common rule: **one grain is one domain entity** with a natural key. Then the load is distributed among many grains, and hot keys (a single grain that everyone calls) become visible and require a separate solution (sharding, `[StatelessWorker]`, aggregation).

## Program examples

All programs were tested with .NET SDK 10.0.401 in Release configuration on Windows 11; Redis and the Aspire dashboard ran in Docker Desktop. Each example is a console project (`dotnet new console`); the `Microsoft.Orleans.Server` package (10.3.1) was added to the Orleans examples, and `Microsoft.Orleans.Streaming` to the “Game lobby” as well.

### Counter actor without Orleans

An actor on a `Channel<Message>` channel: a mailbox, private state, and a single processing loop. It is compared with an unprotected counter.

```cs
using System.Diagnostics;
using System.Threading.Channels;

Console.OutputEncoding = System.Text.Encoding.UTF8;
const int Senders = 16, PerSender = 100_000;

// 1. A shared field without synchronization: updates are lost.
int unsafeCounter = 0;
Parallel.For(0, Senders, _ =>
{
    for (int i = 0; i < PerSender; i++) unsafeCounter++;
});
Console.WriteLine($"Without synchronization: {unsafeCounter:N0}");

// 2. An actor: only one mailbox processing loop changes the state.
CounterActor actor = new();
Stopwatch clock = Stopwatch.StartNew();
await Task.WhenAll(Enumerable.Range(0, Senders).Select(_ =>
    Task.Run(async () =>
    {
        for (int i = 0; i < PerSender; i++)
            await actor.SendAsync(new Increment(1));
    })));
int value = await actor.AskAsync();
Console.WriteLine(
    $"Actor: {value:N0} in {clock.ElapsedMilliseconds} ms");
await actor.StopAsync();

// Actor messages are immutable records.
abstract record Message;
sealed record Increment(int Amount) : Message;
sealed record Get(TaskCompletionSource<int> Reply) : Message;

sealed class CounterActor
{
    readonly Channel<Message> mailbox =
        Channel.CreateUnbounded<Message>(
            new UnboundedChannelOptions { SingleReader = true });
    readonly Task loop;
    int count;                         // the actor's private state

    public CounterActor() => loop = Task.Run(ProcessAsync);

    public ValueTask SendAsync(Message message) =>
        mailbox.Writer.WriteAsync(message);   // "fire and forget"

    public Task<int> AskAsync()               // request – reply
    {
        TaskCompletionSource<int> reply = new(
            TaskCreationOptions.RunContinuationsAsynchronously);
        mailbox.Writer.TryWrite(new Get(reply));
        return reply.Task;
    }

    public Task StopAsync()
    {
        mailbox.Writer.Complete();
        return loop;
    }

    async Task ProcessAsync()
    {
        // One message at a time: no locks needed.
        await foreach (Message m in mailbox.Reader.ReadAllAsync())
        {
            switch (m)
            {
                case Increment inc: count += inc.Amount; break;
                case Get get: get.Reply.SetResult(count); break;
            }
        }
    }
}
```

The FIFO mailbox guarantees that `Get` is processed after all the `Increment` messages sent before it. `RunContinuationsAsynchronously` prevents the caller’s continuation from running on the actor’s thread. Output (the value without synchronization changes from run to run):

```
Without synchronization: 322,214
Actor: 1,600,000 in 224 ms
```

### Game lobby

The silo and the client run in one process. The stateless worker grain `MatchmakerGrain` assigns players to rooms by rating, the room grain `RoomGrain` starts a countdown timer after the third player, picks a winner at the end, and updates the player grains, and it publishes room events to an Orleans stream that the client subscribes to.

```cs
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Orleans.Concurrency;
using Orleans.Runtime;
using Orleans.Streams;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// The silo and the client in one process (co-hosting).
HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Logging.SetMinimumLevel(LogLevel.Error);
builder.UseOrleans(silo =>
{
    silo.UseLocalhostClustering();
    silo.AddMemoryGrainStorage("PubSubStore");  // stream subscriptions
    silo.AddMemoryStreams("events");            // in-memory streams
});
using IHost host = builder.Build();
await host.StartAsync();
IClusterClient client =
    host.Services.GetRequiredService<IClusterClient>();

// Subscribe to the events of rooms with a rating of 1000–1099.
IAsyncStream<string> events = client.GetStreamProvider("events")
    .GetStream<string>(StreamId.Create("rooms", "room-10"));
await events.SubscribeAsync((text, _) =>
{
    Console.WriteLine($"[stream] {text}");
    return Task.CompletedTask;
});

string[] players = ["Olena", "Bohdan", "Iryna", "Taras", "Marko"];
int[] ratings = [1040, 1075, 1010, 1260, 1090];
IMatchmakerGrain matchmaker = client.GetGrain<IMatchmakerGrain>(0);
await Task.WhenAll(players.Select((name, i) =>
    matchmaker.Enter(name, ratings[i])));

await Task.Delay(TimeSpan.FromSeconds(5));     // countdown and game
foreach (string name in players)
{
    PlayerStats s =
        await client.GetGrain<IPlayerGrain>(name).GetStats();
    Console.WriteLine($"{name,-7} games {s.Games}, wins {s.Wins}");
}
await host.StopAsync();

// ---------------- Contracts ----------------
public interface IMatchmakerGrain : IGrainWithIntegerKey
{
    Task<string> Enter(string player, int rating);
}

public interface IRoomGrain : IGrainWithStringKey
{
    Task Join(string player);
}

public interface IPlayerGrain : IGrainWithStringKey
{
    Task AddResult(bool win);
    Task<PlayerStats> GetStats();
}

[GenerateSerializer, Immutable]
public sealed record PlayerStats(
    [property: Id(0)] int Games, [property: Id(1)] int Wins);

// ---------------- Implementations ----------------

// Stateless: Orleans creates several activations on a silo.
[StatelessWorker]
public sealed class MatchmakerGrain : Grain, IMatchmakerGrain
{
    public async Task<string> Enter(string player, int rating)
    {
        string room = $"room-{rating / 100}";  // room by rating
        await GrainFactory.GetGrain<IRoomGrain>(room).Join(player);
        return room;
    }
}

public sealed class RoomGrain : Grain, IRoomGrain
{
    readonly List<string> players = [];
    IAsyncStream<string>? events;
    IGrainTimer? countdown;
    int secondsLeft;

    public override Task OnActivateAsync(CancellationToken token)
    {
        events = this.GetStreamProvider("events").GetStream<string>(
            StreamId.Create("rooms", this.GetPrimaryKeyString()));
        return Task.CompletedTask;
    }

    public async Task Join(string player)
    {
        players.Add(player);
        await Publish($"+ {player} (players: {players.Count})");
        if (players.Count == 3)              // enough to start
        {
            secondsLeft = 3;
            await Publish("starting in 3 s");
            countdown = this.RegisterGrainTimer(Tick,
                new GrainTimerCreationOptions
                {
                    DueTime = TimeSpan.FromSeconds(1),
                    Period = TimeSpan.FromSeconds(1),
                });
        }
    }

    // The timer callback runs as a separate grain turn.
    async Task Tick(CancellationToken token)
    {
        if (--secondsLeft > 0)
        {
            await Publish($"starting in {secondsLeft} s");
            return;
        }
        countdown!.Dispose();
        string winner = players[Random.Shared.Next(players.Count)];
        await Task.WhenAll(players.Select(p => GrainFactory
            .GetGrain<IPlayerGrain>(p).AddResult(p == winner)));
        await Publish($"game over, {winner} won");
        players.Clear();
    }

    Task Publish(string text) =>
        events!.OnNextAsync($"{this.GetPrimaryKeyString()}: {text}");
}

public sealed class PlayerGrain : Grain, IPlayerGrain
{
    int games, wins;

    public Task AddResult(bool win)
    {
        games++;
        if (win) wins++;
        return Task.CompletedTask;
    }

    public Task<PlayerStats> GetStats() =>
        Task.FromResult(new PlayerStats(games, wins));
}
```

The five `Enter` calls run at the same time, so the order in which players enter the room differs each time, but `RoomGrain` processes them one after another, and the `players` list needs no lock. Taras, with a rating of 1260, ended up in the `room-12` room and is waiting for opponents. The timer and the `Join` calls do not overlap: the fourth player entered between two ticks. The player statistics live only in the activations’ memory (without `IPersistentState`) and will disappear after deactivation. The output of one run:

```
[stream] room-10: + Marko (players: 1)
[stream] room-10: + Iryna (players: 2)
[stream] room-10: + Bohdan (players: 3)
[stream] room-10: starting in 3 s
[stream] room-10: + Olena (players: 4)
[stream] room-10: starting in 2 s
[stream] room-10: starting in 1 s
[stream] room-10: game over, Bohdan won
Olena   games 1, wins 0
Bohdan  games 1, wins 1
Iryna   games 1, wins 0
Taras   games 0, wins 0
Marko   games 1, wins 0
```

### Quorum simulator

A model of $N = 5$ replicas with versions: a write updates $W$ random available replicas, and a read takes the highest version from $R$ replicas; “cut-off” replicas are unavailable to the coordinator.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
const int N = 5, Operations = 100_000;

Console.WriteLine(
    "Cut off    W  R  R+W>N  failed  stale reads");
(int Down, int W, int R)[] configs =
[
    (0, 3, 3), (0, 1, 1), (0, 2, 2), (0, 1, 5), (0, 5, 1),
    (2, 3, 3), (2, 5, 1), (2, 1, 1), (3, 3, 3), (3, 1, 1),
];
foreach ((int down, int w, int r) in configs)
{
    Run(w, r, down);
}

static void Run(int w, int r, int down)
{
    Random random = new(15);
    Replica[] replicas = [.. Enumerable.Range(0, N)
        .Select(i => new Replica { Online = i >= down })];
    int latest = 0, rejected = 0, stale = 0, reads = 0;
    for (int op = 0; op < Operations; op++)
    {
        // The coordinator sends a request to random available replicas.
        Replica[] online = [.. replicas.Where(x => x.Online)];
        if (op % 2 == 0)                       // write
        {
            if (online.Length < w) { rejected++; continue; }
            latest++;
            foreach (Replica x in Pick(online, w, random))
                x.Version = latest;            // W replicas acknowledged
        }
        else                                   // read
        {
            if (online.Length < r) { rejected++; continue; }
            int seen = Pick(online, r, random).Max(x => x.Version);
            reads++;
            if (seen < latest) stale++;     // the latest write not seen
        }
    }
    string quorum = r + w > N ? "yes" : "no";
    Console.WriteLine($"{down,4} of {N} {w,2} {r,2}  {quorum,-5}" +
        $"{100.0 * rejected / Operations,6:F1} %" +
        $"{100.0 * stale / Math.Max(reads, 1),12:F1} %");
}

static IEnumerable<Replica> Pick(Replica[] from, int count,
    Random rnd) =>
    from.OrderBy(_ => rnd.Next()).Take(count);

sealed class Replica
{
    public int Version { get; set; }      // version of the latest write
    public bool Online { get; set; }
}
```

The model is simplified: it does not show what happens to the writes of the “cut-off” part after connectivity is restored (that requires versions with vector clocks or a “last write wins” rule). Output (summarized in Table 16.3):

```
Cut off    W  R  R+W>N  failed  stale reads
   0 of 5  3  3  yes     0.0 %         0.0 %
   0 of 5  1  1  no      0.0 %        80.0 %
   0 of 5  2  2  no      0.0 %        30.0 %
   0 of 5  1  5  yes     0.0 %         0.0 %
   0 of 5  5  1  yes     0.0 %         0.0 %
   2 of 5  3  3  yes     0.0 %         0.0 %
   2 of 5  5  1  yes    50.0 %         0.0 %
   2 of 5  1  1  no      0.0 %        66.8 %
   3 of 5  3  3  yes   100.0 %         0.0 %
   3 of 5  1  1  no      0.0 %        49.9 %
```

## Common mistakes

Table 16.4. Common mistakes in Orleans and distributed systems {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| the client cannot connect: `SiloUnavailableException` or waiting for a gateway | the silo is not running, or the `ClusterId`/`ServiceId` or clustering method differs; start the silo first and align `ClusterOptions` |
| `TimeoutException` after 30 s when calling a grain | a cycle of calls between non-reentrant grains (A → B → A) or a long operation in a grain; break the cycle, use `AllowCallChainReentrancy` or `[AlwaysInterleave]`, or move the work out |
| a reentrant grain “loses” updates | the state was read before `await` and written after it; do not enable `[Reentrant]` for such code, or re-read the state after `await` |
| state disappears after a silo restart | `AddMemoryGrainStorage` was used or `WriteStateAsync` was not called; use a durable provider (Redis, SQL) and write after every important change |
| `JsonSerializationException` when reading state: “type is not permitted” | the state contains tuples or other undescribed types (for example, `Dictionary<string, (int, decimal)>`); use records and classes with `[GenerateSerializer]` |
| `InconsistentStateException` | someone else modified the record (ETag); the grain is deactivated, so retry the operation after re-reading the state |
| a reminder does not fire more often than once a minute | `MinimumReminderPeriod` = 1 min; use a timer for frequent events |
| data “diverges” after a network partition | AP mode or $R + W \le N$; use quorums with $R + W \gt N$, versions, and conflict resolution |
