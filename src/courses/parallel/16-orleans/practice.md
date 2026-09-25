---
title: "Practice"
description: "Topic 16. Actors and Microsoft Orleans: worked examples"
outline: [2, 3]
sourceHash: "859b86d370c6b5e7eecf0540cd8a6a5f27620a5439840a3f1b6b6cb4ccb8f7ca"
---

# Practice

## Example 1. An online store cart with a reminder

Create an Orleans application (the silo and the client in one process) with a cart grain `CartGrain`: adding a product, checking out, and the user leaving (grain deactivation). Every change to the cart reschedules an “abandoned cart” reminder (the first after 5 s, then every 5 s); after two reminders the cart is cleared and the reminder is cancelled. Without parameters, the state and reminders are kept in memory; with the `--redis` parameter, in Redis (the `pro15-redis` container from the lecture); the `--wait` parameter only starts the silo and waits for reminders. Check whether a reminder survives a process crash and restart for both providers.

The project is a console project with the `Microsoft.Orleans.Server`, `Microsoft.Orleans.Reminders`, `Microsoft.Orleans.Reminders.Redis`, and `Microsoft.Orleans.Persistence.Redis` (10.3.1) packages.

```cs
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Orleans.Configuration;
using Orleans.Runtime;
using StackExchange.Redis;

Console.OutputEncoding = System.Text.Encoding.UTF8;
bool redis = args.Contains("--redis");      // durable state
bool waitOnly = args.Contains("--wait");    // only wait for reminders

HostApplicationBuilder builder = Host.CreateApplicationBuilder();
builder.Logging.SetMinimumLevel(LogLevel.Error);
builder.UseOrleans(silo =>
{
    silo.UseLocalhostClustering();
    // Minimum reminder period: 1 min by default, 5 s here.
    silo.Configure<ReminderOptions>(o =>
        o.MinimumReminderPeriod = TimeSpan.FromSeconds(5));
    if (redis)
    {
        var options = ConfigurationOptions.Parse("localhost:6379");
        silo.AddRedisGrainStorage("carts",
            o => o.ConfigurationOptions = options);
        silo.UseRedisReminderService(
            o => o.ConfigurationOptions = options);
    }
    else
    {
        silo.AddMemoryGrainStorage("carts");
        silo.UseInMemoryReminderService();  // for development only
    }
});
using IHost host = builder.Build();
await host.StartAsync();
IGrainFactory grains =
    host.Services.GetRequiredService<IGrainFactory>();
Log($"silo started, storage: {(redis ? "Redis" : "memory")}");

if (!waitOnly)
{
    ICartGrain olena = grains.GetGrain<ICartGrain>("olena");
    await olena.Add("Headphones", 1, 1500);
    await olena.Checkout();

    ICartGrain bohdan = grains.GetGrain<ICartGrain>("bohdan");
    await bohdan.Add("Keyboard", 1, 1200);
    await bohdan.Add("Mouse pad", 2, 250);
    await bohdan.Leave();                 // deactivate the grain
}
await Task.Delay(TimeSpan.FromSeconds(waitOnly ? 25 : 18));
await host.StopAsync();

static void Log(string text) =>
    Console.WriteLine($"{DateTime.Now:HH:mm:ss} {text}");

public interface ICartGrain : IGrainWithStringKey
{
    Task Add(string product, int quantity, decimal price);
    Task Checkout();
    Task Leave();
}

[GenerateSerializer]
public sealed record CartItem(
    [property: Id(0)] int Qty, [property: Id(1)] decimal Price);

[GenerateSerializer]
public sealed class CartState
{
    [Id(0)] public Dictionary<string, CartItem> Items { get; set; }
        = [];
    [Id(1)] public int Reminded { get; set; }
}

public sealed class CartGrain(
    [PersistentState("cart", "carts")]
    IPersistentState<CartState> cart)
    : Grain, ICartGrain, IRemindable
{
    const string Abandoned = "abandoned-cart";
    string User => this.GetPrimaryKeyString();
    decimal Total =>
        cart.State.Items.Values.Sum(i => i.Qty * i.Price);

    public override Task OnActivateAsync(CancellationToken token)
    {
        Log($"  activating cart {User}, items " +
            $"{cart.State.Items.Count}");
        return Task.CompletedTask;
    }

    public async Task Add(string product, int quantity, decimal price)
    {
        cart.State.Items[product] = new(quantity, price);
        cart.State.Reminded = 0;
        await cart.WriteStateAsync();
        // Every change to the cart reschedules the reminder.
        await this.RegisterOrUpdateReminder(Abandoned,
            dueTime: TimeSpan.FromSeconds(5),
            period: TimeSpan.FromSeconds(5));
        Log($"{User}: + {product} × {quantity}, " +
            $"total {Total:N2} UAH");
    }

    public async Task Checkout()
    {
        Log($"{User}: order placed for {Total:N2} UAH");
        await cart.ClearStateAsync();
        await UnregisterAsync();
    }

    public Task Leave()
    {
        this.DeactivateOnIdle();          // the activation will be removed
        return Task.CompletedTask;
    }

    // A reminder arrives even for a deactivated grain.
    public async Task ReceiveReminder(string name, TickStatus status)
    {
        cart.State.Reminded++;
        if (cart.State.Reminded < 3)
        {
            Log($"reminder {cart.State.Reminded} for {User}: " +
                $"{cart.State.Items.Count} items in the cart " +
                $"for {Total:N2} UAH");
            await cart.WriteStateAsync();
            return;
        }
        Log($"{User}: cart cleared after 2 reminders");
        await cart.ClearStateAsync();
        await UnregisterAsync();
    }

    async Task UnregisterAsync()
    {
        IGrainReminder? r = await this.GetReminder(Abandoned);
        if (r is not null) await this.UnregisterReminder(r);
    }

    static void Log(string text) =>
        Console.WriteLine($"{DateTime.Now:HH:mm:ss} {text}");
}
```

The `Leave` method calls `DeactivateOnIdle`: the activation is removed right after the call, but the reminder is bound to the **grain**, so 5 s later Orleans activates Bohdan’s cart again and calls `ReceiveReminder`. `RegisterOrUpdateReminder` with the same name does not create a new reminder but reschedules the existing one. The minimum reminder period is reduced to 5 s only for the demonstration. Output without parameters:

```
21:45:17 silo started, storage: memory
21:45:17   activating cart olena, items 0
21:45:17 olena: + Headphones × 1, total 1,500.00 UAH
21:45:17 olena: order placed for 1,500.00 UAH
21:45:17   activating cart bohdan, items 0
21:45:17 bohdan: + Keyboard × 1, total 1,200.00 UAH
21:45:17 bohdan: + Mouse pad × 2, total 1,700.00 UAH
21:45:22   activating cart bohdan, items 2
21:45:22 reminder 1 for bohdan: 2 items in the cart for 1,700.00 UAH
21:45:27 reminder 2 for bohdan: 2 items in the cart for 1,700.00 UAH
21:45:32 bohdan: cart cleared after 2 reminders
```

In the first test, the cart state was a `Dictionary<string, (int, decimal)>` dictionary: the write succeeded, but reading it after reactivation ended with a `JsonSerializationException` (“type could not be found or is not permitted by the configured type allow-list”). Providers store state in JSON and restore only permitted types, so the tuple was replaced with a `CartItem` record with `[GenerateSerializer]`.

A durability test: the process with the `--redis` parameter was killed with `Stop-Process -Force` after 4 s (before the first reminder), and then `dotnet run -c Release -- --redis --wait` was started:

```
21:45:40 silo started, storage: Redis
21:45:41   activating cart bohdan, items 2
21:45:41 reminder 1 for bohdan: 2 items in the cart for 1,700.00 UAH
21:45:46 reminder 2 for bohdan: 2 items in the cart for 1,700.00 UAH
21:45:51 bohdan: cart cleared after 2 reminders
```

The reminder and the state survived the crash: the new process read the reminder from Redis, activated the cart with two items, and continued the countdown. The same scenario without `--redis` printed only the line “silo started, storage: memory” after the restart: the in-memory reminder was lost together with the process. Redis stores reminders in the `default/reminders` key, and the cart state in the `default/state/cart/…` keys.

## Example 2. A two-silo cluster and recovery after a failure

Create a `Sensors` application with the modes `silo 1`, `silo 2`, and `client`. The silos form the `pro15` cluster with the membership table and grain state in Redis. The sensor grain `SensorGrain` accumulates the count and sum of readings, writes its state after every reading, and returns the number of the silo on which it is activated. Every second, the client sends readings for six sensors and prints a “sensor: silo/count” line. Check the distribution of grains and a crash and a graceful shutdown of a silo.

The project is a console project with the `Microsoft.Orleans.Server`, `Microsoft.Orleans.Client`, `Microsoft.Orleans.Clustering.Redis`, and `Microsoft.Orleans.Persistence.Redis` (10.3.1) packages, and `<ServerGarbageCollection>true</ServerGarbageCollection>` in the `.csproj`.

```cs
using System.Diagnostics;
using System.Net;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Orleans.Configuration;
using Orleans.Runtime;
using StackExchange.Redis;

Console.OutputEncoding = System.Text.Encoding.UTF8;
const string Redis = "localhost:6379";

switch (args)
{
    case ["silo", var n] when int.TryParse(n, out int number):
        await RunSiloAsync(number);
        break;
    case ["client"]:
        await RunClientAsync();
        break;
    default:
        Console.Error.WriteLine(
            "Usage: Sensors silo 1|2 | client");
        Environment.ExitCode = 1;
        break;
}

// Silo N: ports 11110+N (between silos) and 30000+N (client gateway).
static async Task RunSiloAsync(int number)
{
    HostApplicationBuilder builder = Host.CreateApplicationBuilder();
    builder.Logging.SetMinimumLevel(LogLevel.Warning);
    builder.UseOrleans(silo =>
    {
        silo.Configure<ClusterOptions>(o =>
        {
            o.ClusterId = "pro15";         // one cluster
            o.ServiceId = "sensors";       // the state key in storage
        });
        silo.UseRedisClustering(Redis);  // membership table
        silo.ConfigureEndpoints(IPAddress.Loopback,
            siloPort: 11110 + number, gatewayPort: 30000 + number);
        silo.AddRedisGrainStorage("sensors", o =>
            o.ConfigurationOptions =
                ConfigurationOptions.Parse(Redis));
    });
    using IHost host = builder.Build();
    await host.StartAsync();
    Console.WriteLine($"Silo {number} started. Enter – graceful " +
        "shutdown, closing the window – a crash.");
    await Task.Run(Console.ReadLine);
    Stopwatch clock = Stopwatch.StartNew();
    await host.StopAsync();          // deactivate grains, exit
    Console.WriteLine($"Silo {number} stopped in " +
        $"{clock.Elapsed.TotalSeconds:F1} s");
}

// Client: sends readings for six sensors every second.
static async Task RunClientAsync()
{
    HostApplicationBuilder builder = Host.CreateApplicationBuilder();
    builder.Logging.SetMinimumLevel(LogLevel.None);
    builder.UseOrleansClient(client =>
    {
        client.Configure<ClusterOptions>(o =>
        {
            o.ClusterId = "pro15";
            o.ServiceId = "sensors";
        });
        client.UseRedisClustering(Redis);   // list of gateways
    });
    using IHost host = builder.Build();
    await host.StartAsync();
    IClusterClient cluster =
        host.Services.GetRequiredService<IClusterClient>();

    HashSet<string> errors = [];
    Stopwatch clock = Stopwatch.StartNew();
    for (int tick = 1; tick <= 40; tick++)
    {
        List<string> cells = [];
        for (int d = 1; d <= 6; d++)
        {
            ISensorGrain sensor =
                cluster.GetGrain<ISensorGrain>($"s{d}");
            try
            {
                SensorReport r = await sensor
                    .Record(20 + d + tick % 3)
                    .WaitAsync(TimeSpan.FromSeconds(3));
                cells.Add($"s{d}:{r.Silo}/{r.Count,-2}");
            }
            catch (Exception ex)
            {
                cells.Add($"s{d}:failure");
                errors.Add(ex.GetType().Name);
            }
        }
        Console.WriteLine($"{clock.Elapsed.TotalSeconds,5:F1} s " +
            string.Join(" ", cells));
        await Task.Delay(1000);
    }
    Console.WriteLine($"Errors: {string.Join(", ", errors)}");
    await host.StopAsync();
}

public interface ISensorGrain : IGrainWithStringKey
{
    Task<SensorReport> Record(double value);
}

[GenerateSerializer, Immutable]
public sealed record SensorReport(
    [property: Id(0)] int Silo,        // number of the silo with the activation
    [property: Id(1)] int Count,       // saved readings
    [property: Id(2)] double Average);

[GenerateSerializer]
public sealed class SensorState
{
    [Id(0)] public int Count { get; set; }
    [Id(1)] public double Sum { get; set; }
}

public sealed class SensorGrain(
    [PersistentState("sensor", "sensors")]
    IPersistentState<SensorState> state,
    ILocalSiloDetails silo) : Grain, ISensorGrain
{
    public override Task OnActivateAsync(CancellationToken token)
    {
        string key = this.GetPrimaryKeyString();
        Console.WriteLine($"  activating {key}" +
            $", readings in storage: {state.State.Count}");
        return Task.CompletedTask;
    }

    public async Task<SensorReport> Record(double value)
    {
        state.State.Count++;
        state.State.Sum += value;
        await state.WriteStateAsync();
        int number = silo.SiloAddress.Endpoint.Port - 11110;
        return new SensorReport(number, state.State.Count,
            state.State.Sum / state.State.Count);
    }
}
```

The silos and the client are started in three Windows Terminal tabs: `dotnet run -c Release -- silo 1`, `dotnet run -c Release -- silo 2`, and a few seconds later `dotnet run -c Release -- client`. The silos find each other through the Redis key `sensors/members/pro15`, and the client takes the list of gateways from it (ports 30001 and 30002). After the client had been running for 10 s, the silo 1 window was closed (the process crashed, Fig. 16.8). The client’s output:

```
  0.1 s s1:1/1  s2:1/1  s3:1/1  s4:1/1  s5:1/1  s6:1/1
  1.2 s s1:1/2  s2:1/2  s3:1/2  s4:1/2  s5:1/2  s6:1/2
  2.2 s s1:1/3  s2:1/3  s3:1/3  s4:1/3  s5:1/3  s6:1/3
  3.2 s s1:1/4  s2:1/4  s3:1/4  s4:1/4  s5:1/4  s6:1/4
  4.2 s s1:1/5  s2:1/5  s3:1/5  s4:1/5  s5:1/5  s6:1/5
  5.2 s s1:1/6  s2:1/6  s3:1/6  s4:1/6  s5:1/6  s6:1/6
  6.2 s s1:1/7  s2:1/7  s3:1/7  s4:1/7  s5:1/7  s6:1/7
  7.3 s s1:1/8  s2:1/8  s3:1/8  s4:1/8  s5:1/8  s6:1/8
  8.3 s s1:1/9  s2:1/9  s3:1/9  s4:1/9  s5:1/9  s6:1/9
  9.3 s s1:1/10 s2:1/10 s3:1/10 s4:1/10 s5:1/10 s6:1/10
 18.2 s s1:failure s2:failure s3:failure s4:failure s5:failure s6:failure
 21.3 s s1:2/11 s2:2/11 s3:2/11 s4:2/11 s5:2/11 s6:2/11
 22.3 s s1:2/12 s2:2/12 s3:2/12 s4:2/12 s5:2/12 s6:2/12
 23.4 s s1:2/13 s2:2/13 s3:2/13 s4:2/13 s5:2/13 s6:2/13
 24.4 s s1:2/14 s2:2/14 s3:2/14 s4:2/14 s5:2/14 s6:2/14
 25.4 s s1:2/15 s2:2/15 s3:2/15 s4:2/15 s5:2/15 s6:2/15
 26.4 s s1:2/16 s2:2/16 s3:2/16 s4:2/16 s5:2/16 s6:2/16
 27.4 s s1:2/17 s2:2/17 s3:2/17 s4:2/17 s5:2/17 s6:2/17
 28.4 s s1:2/18 s2:2/18 s3:2/18 s4:2/18 s5:2/18 s6:2/18
 29.4 s s1:2/19 s2:2/19 s3:2/19 s4:2/19 s5:2/19 s6:2/19
 30.4 s s1:2/20 s2:2/20 s3:2/20 s4:2/20 s5:2/20 s6:2/20
 31.4 s s1:2/21 s2:2/21 s3:2/21 s4:2/21 s5:2/21 s6:2/21
 32.4 s s1:2/22 s2:2/22 s3:2/22 s4:2/22 s5:2/22 s6:2/22
 33.5 s s1:2/23 s2:2/23 s3:2/23 s4:2/23 s5:2/23 s6:2/23
 34.5 s s1:2/24 s2:2/24 s3:2/24 s4:2/24 s5:2/24 s6:2/24
 35.5 s s1:2/25 s2:2/25 s3:2/25 s4:2/25 s5:2/25 s6:2/25
 36.5 s s1:2/26 s2:2/26 s3:2/26 s4:2/26 s5:2/26 s6:2/26
 37.5 s s1:2/27 s2:2/27 s3:2/27 s4:2/27 s5:2/27 s6:2/27
 38.5 s s1:2/28 s2:2/28 s3:2/28 s4:2/28 s5:2/28 s6:2/28
 39.5 s s1:2/29 s2:2/29 s3:2/29 s4:2/29 s5:2/29 s6:2/29
 40.5 s s1:2/30 s2:2/30 s3:2/30 s4:2/30 s5:2/30 s6:2/30
 41.5 s s1:2/31 s2:2/31 s3:2/31 s4:2/31 s5:2/31 s6:2/31
 42.5 s s1:2/32 s2:2/32 s3:2/32 s4:2/32 s5:2/32 s6:2/32
 43.6 s s1:2/33 s2:2/33 s3:2/33 s4:2/33 s5:2/33 s6:2/33
 44.6 s s1:2/34 s2:2/34 s3:2/34 s4:2/34 s5:2/34 s6:2/34
 45.6 s s1:2/35 s2:2/35 s3:2/35 s4:2/35 s5:2/35 s6:2/35
 46.6 s s1:2/36 s2:2/36 s3:2/36 s4:2/36 s5:2/36 s6:2/36
 47.6 s s1:2/37 s2:2/37 s3:2/37 s4:2/37 s5:2/37 s6:2/37
 48.6 s s1:2/38 s2:2/38 s3:2/38 s4:2/38 s5:2/38 s6:2/38
 49.6 s s1:2/39 s2:2/39 s3:2/39 s4:2/39 s5:2/39 s6:2/39
Errors: ConnectionFailedException, OrleansMessageRejectionException
```

This time, the `ResourceOptimizedPlacement` strategy placed all six sensors on silo 1 (in the previous run, they were split 2 : 4). After the crash, the calls waited until silo 2 stopped getting responses to its probes and declared silo 1 dead, so one line contains failures, and from the 21.3 s mark all sensors run on silo 2. Silo 2 printed `activating s1, readings in storage: 10` for each sensor: the counters were read from Redis, and no saved reading was lost. The reading that was being processed at the moment of the crash would have to be resent by the client (for that, the operation must be idempotent).

A graceful shutdown (the **Enter** key in the silo 1 window) took 0.1 s: the silo deactivated its grains and notified the cluster that it was leaving, so the client saw no errors, and the next calls activated the grains on silo 2.

## Example 3. A client with retries and a circuit breaker

Create an application in which the `WeatherGrain` grain simulates a weather service with the modes “normal,” “hanging” (a response after 1 s), and “failing” (an exception), and the client requests the temperature every 0.5 s through a resilience pipeline: retries (3 attempts, exponential backoff with jitter), a circuit breaker (opening at 50 % failures among at least 4 attempts within 3 s, a 2 s break), and a timeout of 300 ms per attempt. A script changes the service mode: 0 s – normal, 1.5 s – hanging, 3.5 s – failing, 6 s – normal. Print each attempt, retry, and circuit breaker state change.

The project is a console project with the `Microsoft.Orleans.Server` (10.3.1) and `Microsoft.Extensions.Resilience` (10.10.0) packages.

```cs
using System.Diagnostics;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Polly;
using Polly.CircuitBreaker;
using Polly.Registry;
using Polly.Retry;

Console.OutputEncoding = System.Text.Encoding.UTF8;
Stopwatch clock = new();
void Log(string text) =>
    Console.WriteLine($"{clock.Elapsed.TotalSeconds,5:F1} s {text}");
ValueTask Say(string text)
{
    Log(text);
    return default;
}

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Logging.SetMinimumLevel(LogLevel.None);
builder.UseOrleans(silo => silo.UseLocalhostClustering());

// Resilience pipeline: retries → circuit breaker → attempt timeout.
builder.Services.AddResiliencePipeline("weather", pipeline => pipeline
    .AddRetry(new RetryStrategyOptions
    {
        MaxRetryAttempts = 3,
        Delay = TimeSpan.FromMilliseconds(100),
        BackoffType = DelayBackoffType.Exponential,  // 100, 200, 400
        UseJitter = true,                           // ± random
        // Do not retry an open circuit breaker.
        ShouldHandle = new PredicateBuilder()
            .Handle<Exception>(e => e is not BrokenCircuitException),
        OnRetry = a =>
        {
            Log($"  retry {a.AttemptNumber + 1} in " +
                $"{a.RetryDelay.TotalMilliseconds:F0} ms " +
                $"({a.Outcome.Exception?.GetType().Name})");
            return default;
        },
    })
    .AddCircuitBreaker(new CircuitBreakerStrategyOptions
    {
        FailureRatio = 0.5,            // 50 % failures…
        MinimumThroughput = 4,         // …among at least 4 attempts
        SamplingDuration = TimeSpan.FromSeconds(3),
        BreakDuration = TimeSpan.FromSeconds(2),
        OnOpened = _ => Say("  circuit OPENED"),
        OnHalfOpened = _ => Say("  trial attempt"),
        OnClosed = _ => Say("  circuit closed"),
    })
    .AddTimeout(TimeSpan.FromMilliseconds(300)));   // one attempt

using IHost host = builder.Build();
await host.StartAsync();
IGrainFactory grains =
    host.Services.GetRequiredService<IGrainFactory>();
ResiliencePipeline weather = host.Services
    .GetRequiredService<ResiliencePipelineProvider<string>>()
    .GetPipeline("weather");
IWeatherGrain london = grains.GetGrain<IWeatherGrain>("London");
clock.Start();

// Script: normal → "hanging" → errors → recovery.
(double At, Mode Mode)[] script =
[
    (0, Mode.Ok), (1.5, Mode.Slow), (3.5, Mode.Failing), (6, Mode.Ok),
];
int step = 0;
while (clock.Elapsed.TotalSeconds < 10)
{
    if (step < script.Length
        && clock.Elapsed.TotalSeconds >= script[step].At)
    {
        await london.SetMode(script[step].Mode);
        Log($"weather service: {script[step++].Mode}");
    }
    try
    {
        double t = await weather.ExecuteAsync(async token =>
            await london.GetTemperature().WaitAsync(token));
        Log($"OK {t:F1} °C");
    }
    catch (Exception ex)
    {
        Log($"FAILED {ex.GetType().Name}");
    }
    await Task.Delay(500);
}
await host.StopAsync();

public enum Mode { Ok, Failing, Slow }

public interface IWeatherGrain : IGrainWithStringKey
{
    Task SetMode(Mode mode);
    Task<double> GetTemperature();
}

[Orleans.Concurrency.Reentrant]   // SetMode does not wait for GetTemperature
public sealed class WeatherGrain : Grain, IWeatherGrain
{
    Mode mode;

    public Task SetMode(Mode value)
    {
        mode = value;
        return Task.CompletedTask;
    }

    public async Task<double> GetTemperature()
    {
        if (mode == Mode.Failing)
            throw new InvalidOperationException("service failure");
        if (mode == Mode.Slow)
            await Task.Delay(1000);              // longer than the timeout
        return 18 + Random.Shared.NextDouble() * 4;
    }
}
```

The strategies run in the order they were added: the retry wraps the circuit breaker, and the circuit breaker wraps the timeout of each attempt. Therefore the timeout aborts only a single attempt (`TimeoutRejectedException`), the circuit breaker counts failed attempts, and the retry does not repeat `BrokenCircuitException`, so as not to hammer an open circuit breaker. The grain is marked `[Reentrant]` so that a `SetMode` call does not wait in the queue behind a slow `GetTemperature`. Output:

```
0.1 s weather service: Ok
0.1 s OK 21.5 °C
0.6 s OK 20.2 °C
1.1 s OK 20.3 °C
1.6 s weather service: Slow
1.9 s   retry 1 in 63 ms (TimeoutRejectedException)
2.3 s   retry 2 in 182 ms (TimeoutRejectedException)
2.8 s   circuit OPENED
2.8 s   retry 3 in 223 ms (TimeoutRejectedException)
3.0 s FAILED BrokenCircuitException
3.5 s weather service: Failing
3.5 s FAILED BrokenCircuitException
4.0 s FAILED BrokenCircuitException
4.5 s FAILED BrokenCircuitException
5.0 s   trial attempt
5.1 s   circuit OPENED
5.1 s   retry 1 in 24 ms (InvalidOperationException)
5.1 s FAILED BrokenCircuitException
5.6 s FAILED BrokenCircuitException
6.1 s weather service: Ok
6.1 s FAILED BrokenCircuitException
6.6 s FAILED BrokenCircuitException
7.1 s   trial attempt
7.1 s   circuit closed
7.1 s OK 21.7 °C
7.6 s OK 20.8 °C
8.1 s OK 21.9 °C
8.6 s OK 19.2 °C
9.1 s OK 18.2 °C
9.7 s OK 18.3 °C
```

During the “hanging,” three attempts of 300 ms each ended with a timeout, and after the fourth failure the circuit breaker opened: subsequent requests failed instantly without loading the service. The trial attempt at 5.0 s hit the “failing” mode, and the circuit breaker opened again; the trial attempt at 7.1 s succeeded, the circuit breaker closed, and requests are served again. The retry delays (63, 182, 223 ms) differ from 100, 200, 400 ms because of jitter.
