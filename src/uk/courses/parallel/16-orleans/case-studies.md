---
title: "Розбори та типові помилки"
description: "Тема 16. Актори та Microsoft Orleans: Розбори та типові помилки"
outline: [2, 3]
---

# Розбори та типові помилки

## Приклади архітектур на акторах

- **Ігровий сервер**: зерна гравців, кімнат і матчів; зерно кімнати керує таймером гри, стан гравця зберігається у сховищі, а події кімнати йдуть потоками (Halo, PlayFab).
- **Цифрові двійники IoT**: зерно на кожен пристрій приймає показники, агрегує їх і передає зерну будинку чи цеху; нагадування перевіряють пристрої, що замовкли.
- **Банківські рахунки**: зерно рахунку послідовно обробляє операції (немає гонитви), стан з ETag зберігається у сховищі, перекази між рахунками – транзакції Orleans або саги.
- **Кошики й замовлення**: зерно кошика з нагадуванням про покинутий кошик, `[StatelessWorker]` для перевірки цін.

Спільне правило: **одне зерно – одна сутність предметної області** з природним ключем. Тоді навантаження розподіляється між багатьма зернами, а гарячі ключі (одне зерно, яке викликають усі) стають помітними й вимагають окремого рішення (шардування, `[StatelessWorker]`, агрегація).

## Приклади програм

Усі програми перевірено з .NET SDK 10.0.401 у конфігурації Release на Windows 11; Redis і дашборд Aspire працювали в Docker Desktop. Кожен приклад – консольний проєкт (`dotnet new console`); до прикладів Orleans додано пакет `Microsoft.Orleans.Server` (10.3.1), до «Ігрового лобі» – ще `Microsoft.Orleans.Streaming`.

### Лічильник-актор без Orleans

Актор на каналі `Channel<Message>`: поштова скринька, приватний стан і один цикл обробки. Порівнюється з незахищеним лічильником.

```cs
using System.Diagnostics;
using System.Threading.Channels;

Console.OutputEncoding = System.Text.Encoding.UTF8;
const int Senders = 16, PerSender = 100_000;

// 1. Спільне поле без синхронізації: оновлення губляться.
int unsafeCounter = 0;
Parallel.For(0, Senders, _ =>
{
    for (int i = 0; i < PerSender; i++) unsafeCounter++;
});
Console.WriteLine($"Без синхронізації: {unsafeCounter:N0}");

// 2. Актор: стан змінює лише один цикл обробки поштової скриньки.
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
    $"Актор: {value:N0} за {clock.ElapsedMilliseconds} мс");
await actor.StopAsync();

// Повідомлення актора – незмінні записи.
abstract record Message;
sealed record Increment(int Amount) : Message;
sealed record Get(TaskCompletionSource<int> Reply) : Message;

sealed class CounterActor
{
    readonly Channel<Message> mailbox =
        Channel.CreateUnbounded<Message>(
            new UnboundedChannelOptions { SingleReader = true });
    readonly Task loop;
    int count;                         // приватний стан актора

    public CounterActor() => loop = Task.Run(ProcessAsync);

    public ValueTask SendAsync(Message message) =>
        mailbox.Writer.WriteAsync(message);   // «надіслати й забути»

    public Task<int> AskAsync()               // запит – відповідь
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
        // Одне повідомлення за раз: блокування не потрібні.
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

Скринька FIFO гарантує, що `Get` оброблено після всіх `Increment`, надісланих раніше. `RunContinuationsAsynchronously` не дає продовженню викликальника виконуватися в потоці актора. Результат (значення без синхронізації змінюється від запуску до запуску):

```
Без синхронізації: 322 214
Актор: 1 600 000 за 224 мс
```

### Ігрове лобі

Силос і клієнт в одному процесі. Зерно-робітник без стану `MatchmakerGrain` розподіляє гравців у кімнати за рейтингом, зерно кімнати `RoomGrain` після третього гравця запускає таймер відліку, наприкінці вибирає переможця й оновлює зерна гравців, а події кімнати публікує в потік Orleans, на який підписано клієнта.

```cs
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Orleans.Concurrency;
using Orleans.Runtime;
using Orleans.Streams;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// Силос і клієнт в одному процесі (co-hosting).
HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Logging.SetMinimumLevel(LogLevel.Error);
builder.UseOrleans(silo =>
{
    silo.UseLocalhostClustering();
    silo.AddMemoryGrainStorage("PubSubStore");  // підписки потоків
    silo.AddMemoryStreams("events");            // потоки в пам’яті
});
using IHost host = builder.Build();
await host.StartAsync();
IClusterClient client =
    host.Services.GetRequiredService<IClusterClient>();

// Підписка на події кімнат рейтингу 1000–1099.
IAsyncStream<string> events = client.GetStreamProvider("events")
    .GetStream<string>(StreamId.Create("rooms", "room-10"));
await events.SubscribeAsync((text, _) =>
{
    Console.WriteLine($"[потік] {text}");
    return Task.CompletedTask;
});

string[] players = ["Олена", "Богдан", "Ірина", "Тарас", "Марко"];
int[] ratings = [1040, 1075, 1010, 1260, 1090];
IMatchmakerGrain matchmaker = client.GetGrain<IMatchmakerGrain>(0);
await Task.WhenAll(players.Select((name, i) =>
    matchmaker.Enter(name, ratings[i])));

await Task.Delay(TimeSpan.FromSeconds(5));     // триває відлік і гра
foreach (string name in players)
{
    PlayerStats s =
        await client.GetGrain<IPlayerGrain>(name).GetStats();
    Console.WriteLine($"{name,-7} ігор {s.Games}, перемог {s.Wins}");
}
await host.StopAsync();

// ---------------- Контракти ----------------
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

// ---------------- Реалізації ----------------

// Без стану: Orleans створює кілька активацій на силосі.
[StatelessWorker]
public sealed class MatchmakerGrain : Grain, IMatchmakerGrain
{
    public async Task<string> Enter(string player, int rating)
    {
        string room = $"room-{rating / 100}";  // кімната за рейтингом
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
        await Publish($"+ {player} (гравців: {players.Count})");
        if (players.Count == 3)              // досить для старту
        {
            secondsLeft = 3;
            await Publish("старт через 3 с");
            countdown = this.RegisterGrainTimer(Tick,
                new GrainTimerCreationOptions
                {
                    DueTime = TimeSpan.FromSeconds(1),
                    Period = TimeSpan.FromSeconds(1),
                });
        }
    }

    // Колбек таймера виконується як окремий хід зерна.
    async Task Tick(CancellationToken token)
    {
        if (--secondsLeft > 0)
        {
            await Publish($"старт через {secondsLeft} с");
            return;
        }
        countdown!.Dispose();
        string winner = players[Random.Shared.Next(players.Count)];
        await Task.WhenAll(players.Select(p => GrainFactory
            .GetGrain<IPlayerGrain>(p).AddResult(p == winner)));
        await Publish($"гру завершено, переміг {winner}");
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

П’ять викликів `Enter` виконуються одночасно, тому порядок входу гравців у кімнату щоразу інший, але `RoomGrain` обробляє їх по черзі, і список `players` не потребує блокування. Тарас з рейтингом 1260 потрапив у кімнату `room-12` і чекає суперників. Таймер і виклики `Join` не перетинаються: четвертий гравець увійшов між двома тиками. Статистика гравців живе лише в пам’яті активацій (без `IPersistentState`) і зникне після деактивації. Результат одного запуску:

```
[потік] room-10: + Марко (гравців: 1)
[потік] room-10: + Ірина (гравців: 2)
[потік] room-10: + Богдан (гравців: 3)
[потік] room-10: старт через 3 с
[потік] room-10: + Олена (гравців: 4)
[потік] room-10: старт через 2 с
[потік] room-10: старт через 1 с
[потік] room-10: гру завершено, переміг Богдан
Олена   ігор 1, перемог 0
Богдан  ігор 1, перемог 1
Ірина   ігор 1, перемог 0
Тарас   ігор 0, перемог 0
Марко   ігор 1, перемог 0
```

### Симулятор кворумів

Модель $N = 5$ реплік з версіями: запис оновлює $W$ випадкових доступних реплік, читання бере найбільшу версію з $R$ реплік; «відрізані» репліки недоступні координатору.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
const int N = 5, Operations = 100_000;

Console.WriteLine(
    "Відрізано  W  R  R+W>N  відмов  застарілих читань");
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
        // Координатор надсилає запит на випадкові доступні репліки.
        Replica[] online = [.. replicas.Where(x => x.Online)];
        if (op % 2 == 0)                       // запис
        {
            if (online.Length < w) { rejected++; continue; }
            latest++;
            foreach (Replica x in Pick(online, w, random))
                x.Version = latest;            // підтвердили W реплік
        }
        else                                   // читання
        {
            if (online.Length < r) { rejected++; continue; }
            int seen = Pick(online, r, random).Max(x => x.Version);
            reads++;
            if (seen < latest) stale++;     // останній запис не видно
        }
    }
    string quorum = r + w > N ? "так" : "ні";
    Console.WriteLine($"{down,4} з {N} {w,2} {r,2}  {quorum,-5}" +
        $"{100.0 * rejected / Operations,6:F1} %" +
        $"{100.0 * stale / Math.Max(reads, 1),12:F1} %");
}

static IEnumerable<Replica> Pick(Replica[] from, int count,
    Random rnd) =>
    from.OrderBy(_ => rnd.Next()).Take(count);

sealed class Replica
{
    public int Version { get; set; }      // версія останнього запису
    public bool Online { get; set; }
}
```

Модель спрощена: вона не показує, що відбувається з записами «відрізаної» частини після відновлення зв’язку (для цього потрібні версії з векторними годинниками або правило «останній запис перемагає»). Результат (зведено в табл. 16.3):

```
Відрізано  W  R  R+W>N  відмов  застарілих читань
   0 з 5  3  3  так     0,0 %         0,0 %
   0 з 5  1  1  ні      0,0 %        80,0 %
   0 з 5  2  2  ні      0,0 %        30,0 %
   0 з 5  1  5  так     0,0 %         0,0 %
   0 з 5  5  1  так     0,0 %         0,0 %
   2 з 5  3  3  так     0,0 %         0,0 %
   2 з 5  5  1  так    50,0 %         0,0 %
   2 з 5  1  1  ні      0,0 %        66,8 %
   3 з 5  3  3  так   100,0 %         0,0 %
   3 з 5  1  1  ні      0,0 %        49,9 %
```

## Типові помилки

Таблиця 16.4. Типові помилки Orleans і розподілених систем {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| клієнт не підключається: `SiloUnavailableException` або очікування шлюзу | силос не запущено або різні `ClusterId`/`ServiceId` чи спосіб кластеризації; запускати силос першим, узгодити `ClusterOptions` |
| `TimeoutException` через 30 с при виклику зерна | цикл викликів нереентрантних зерен (A → B → A) або довга операція в зерні; розірвати цикл, `AllowCallChainReentrancy`, `[AlwaysInterleave]` або винести роботу |
| реентрантне зерно «губить» оновлення | стан прочитано до `await` і записано після; не вмикати `[Reentrant]` для такого коду або перечитувати стан після `await` |
| стан зникає після перезапуску силосу | використано `AddMemoryGrainStorage` або не викликано `WriteStateAsync`; стійкий провайдер (Redis, SQL) і запис після кожної важливої зміни |
| `JsonSerializationException` при читанні стану: «type is not permitted» | у стані кортежі чи інші неописані типи (наприклад, `Dictionary<string, (int, decimal)>`); використовувати записи й класи з `[GenerateSerializer]` |
| `InconsistentStateException` | запис змінив хтось інший (ETag); зерно деактивується – повторити операцію після перечитування стану |
| нагадування не спрацьовує частіше ніж раз на хвилину | `MinimumReminderPeriod` = 1 хв; для частих подій – таймер |
| дані «розходяться» після розділення мережі | AP-режим або $R + W \le N$; кворуми $R + W \gt N$, версії й розв’язання конфліктів |
