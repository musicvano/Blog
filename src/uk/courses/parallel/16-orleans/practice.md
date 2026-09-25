---
title: "Практика"
description: "Тема 16. Актори та Microsoft Orleans: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Кошик інтернет-магазину з нагадуванням

Створити застосунок Orleans (силос і клієнт в одному процесі) із зерном кошика `CartGrain`: додавання товару, оформлення замовлення й вихід користувача (деактивація зерна). Кожна зміна кошика переносить нагадування «покинутий кошик» (перше через 5 с, далі кожні 5 с); після двох нагадувань кошик очищається, а нагадування скасовується. Без параметрів стан і нагадування зберігаються в пам’яті, з параметром `--redis` – у Redis (контейнер `pro15-redis` з лекції); параметр `--wait` лише запускає силос і чекає нагадувань. Перевірити, чи переживає нагадування аварійний перезапуск процесу для обох провайдерів.

Проєкт – консольний, пакети `Microsoft.Orleans.Server`, `Microsoft.Orleans.Reminders`, `Microsoft.Orleans.Reminders.Redis`, `Microsoft.Orleans.Persistence.Redis` (10.3.1).

```cs
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Orleans.Configuration;
using Orleans.Runtime;
using StackExchange.Redis;

Console.OutputEncoding = System.Text.Encoding.UTF8;
bool redis = args.Contains("--redis");      // стійкий стан
bool waitOnly = args.Contains("--wait");    // лише чекати нагадувань

HostApplicationBuilder builder = Host.CreateApplicationBuilder();
builder.Logging.SetMinimumLevel(LogLevel.Error);
builder.UseOrleans(silo =>
{
    silo.UseLocalhostClustering();
    // Мінімальний період нагадування: типово 1 хв, тут 5 с.
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
        silo.UseInMemoryReminderService();  // лише для розробки
    }
});
using IHost host = builder.Build();
await host.StartAsync();
IGrainFactory grains =
    host.Services.GetRequiredService<IGrainFactory>();
Log($"силос запущено, сховище: {(redis ? "Redis" : "пам’ять")}");

if (!waitOnly)
{
    ICartGrain olena = grains.GetGrain<ICartGrain>("olena");
    await olena.Add("Навушники", 1, 1500);
    await olena.Checkout();

    ICartGrain bohdan = grains.GetGrain<ICartGrain>("bohdan");
    await bohdan.Add("Клавіатура", 1, 1200);
    await bohdan.Add("Килимок", 2, 250);
    await bohdan.Leave();                 // деактивувати зерно
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
        Log($"  активація кошика {User}, товарів " +
            $"{cart.State.Items.Count}");
        return Task.CompletedTask;
    }

    public async Task Add(string product, int quantity, decimal price)
    {
        cart.State.Items[product] = new(quantity, price);
        cart.State.Reminded = 0;
        await cart.WriteStateAsync();
        // Кожна зміна кошика переносить нагадування.
        await this.RegisterOrUpdateReminder(Abandoned,
            dueTime: TimeSpan.FromSeconds(5),
            period: TimeSpan.FromSeconds(5));
        Log($"{User}: + {product} × {quantity}, " +
            $"разом {Total:N2} грн");
    }

    public async Task Checkout()
    {
        Log($"{User}: оформлено замовлення на {Total:N2} грн");
        await cart.ClearStateAsync();
        await UnregisterAsync();
    }

    public Task Leave()
    {
        this.DeactivateOnIdle();          // активацію буде вилучено
        return Task.CompletedTask;
    }

    // Нагадування надходить навіть до деактивованого зерна.
    public async Task ReceiveReminder(string name, TickStatus status)
    {
        cart.State.Reminded++;
        if (cart.State.Reminded < 3)
        {
            Log($"нагадування {cart.State.Reminded} для {User}: " +
                $"у кошику {cart.State.Items.Count} товари " +
                $"на {Total:N2} грн");
            await cart.WriteStateAsync();
            return;
        }
        Log($"{User}: кошик очищено після 2 нагадувань");
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

Метод `Leave` викликає `DeactivateOnIdle`: активацію вилучено одразу після виклику, але нагадування прив’язане до **зерна**, тому через 5 с Orleans знову активує кошик Богдана і викликає `ReceiveReminder`. `RegisterOrUpdateReminder` з тим самим іменем не створює нового нагадування, а переносить наявне. Мінімальний період нагадування зменшено до 5 с лише для демонстрації. Результат без параметрів:

```
21:45:17 силос запущено, сховище: пам’ять
21:45:17   активація кошика olena, товарів 0
21:45:17 olena: + Навушники × 1, разом 1 500,00 грн
21:45:17 olena: оформлено замовлення на 1 500,00 грн
21:45:17   активація кошика bohdan, товарів 0
21:45:17 bohdan: + Клавіатура × 1, разом 1 200,00 грн
21:45:17 bohdan: + Килимок × 2, разом 1 700,00 грн
21:45:22   активація кошика bohdan, товарів 2
21:45:22 нагадування 1 для bohdan: у кошику 2 товари на 1 700,00 грн
21:45:27 нагадування 2 для bohdan: у кошику 2 товари на 1 700,00 грн
21:45:32 bohdan: кошик очищено після 2 нагадувань
```

Під час першої перевірки стан кошика був словником `Dictionary<string, (int, decimal)>`: запис пройшов, а читання після повторної активації завершилося `JsonSerializationException` («type could not be found or is not permitted by the configured type allow-list»). Провайдери зберігають стан у JSON і відновлюють лише дозволені типи, тому кортеж замінено записом `CartItem` з `[GenerateSerializer]`.

Перевірка стійкості: процес з параметром `--redis` зупинено командою `Stop-Process -Force` через 4 с (до першого нагадування), потім запущено `dotnet run -c Release -- --redis --wait`:

```
21:45:40 силос запущено, сховище: Redis
21:45:41   активація кошика bohdan, товарів 2
21:45:41 нагадування 1 для bohdan: у кошику 2 товари на 1 700,00 грн
21:45:46 нагадування 2 для bohdan: у кошику 2 товари на 1 700,00 грн
21:45:51 bohdan: кошик очищено після 2 нагадувань
```

Нагадування і стан пережили аварію: новий процес прочитав нагадування з Redis, активував кошик із двома товарами й продовжив відлік. Той самий сценарій без `--redis` після перезапуску вивів лише рядок «силос запущено, сховище: пам’ять» – нагадування в пам’яті втрачено разом із процесом. Redis зберігає нагадування в ключі `default/reminders`, стан кошика – у ключах `default/state/cart/…`.

## Приклад 2. Кластер із двох силосів і відновлення після відмови

Створити застосунок `Sensors` з режимами `silo 1`, `silo 2` і `client`. Силоси утворюють кластер `pro15` з таблицею членства й станом зерен у Redis. Зерно датчика `SensorGrain` накопичує кількість і суму показників, записує стан після кожного показника й повертає номер силосу, на якому активоване. Клієнт щосекунди надсилає показники шести датчиків і виводить рядок «датчик: силос/кількість». Перевірити розподіл зерен, аварійну та коректну зупинку силосу.

Проєкт – консольний, пакети `Microsoft.Orleans.Server`, `Microsoft.Orleans.Client`, `Microsoft.Orleans.Clustering.Redis`, `Microsoft.Orleans.Persistence.Redis` (10.3.1), у `.csproj` – `<ServerGarbageCollection>true</ServerGarbageCollection>`.

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
            "Використання: Sensors silo 1|2 | client");
        Environment.ExitCode = 1;
        break;
}

// Силос N: порти 11110+N (між силосами) і 30000+N (шлюз клієнтів).
static async Task RunSiloAsync(int number)
{
    HostApplicationBuilder builder = Host.CreateApplicationBuilder();
    builder.Logging.SetMinimumLevel(LogLevel.Warning);
    builder.UseOrleans(silo =>
    {
        silo.Configure<ClusterOptions>(o =>
        {
            o.ClusterId = "pro15";         // один кластер
            o.ServiceId = "sensors";       // ключ стану в сховищі
        });
        silo.UseRedisClustering(Redis);  // таблиця членства
        silo.ConfigureEndpoints(IPAddress.Loopback,
            siloPort: 11110 + number, gatewayPort: 30000 + number);
        silo.AddRedisGrainStorage("sensors", o =>
            o.ConfigurationOptions =
                ConfigurationOptions.Parse(Redis));
    });
    using IHost host = builder.Build();
    await host.StartAsync();
    Console.WriteLine($"Силос {number} запущено. Enter – коректна " +
        "зупинка, закриття вікна – аварія.");
    await Task.Run(Console.ReadLine);
    Stopwatch clock = Stopwatch.StartNew();
    await host.StopAsync();          // деактивація зерен, вихід
    Console.WriteLine($"Силос {number} зупинено за " +
        $"{clock.Elapsed.TotalSeconds:F1} с");
}

// Клієнт: щосекунди надсилає показники шести датчиків.
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
        client.UseRedisClustering(Redis);   // список шлюзів
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
                cells.Add($"s{d}:збій");
                errors.Add(ex.GetType().Name);
            }
        }
        Console.WriteLine($"{clock.Elapsed.TotalSeconds,5:F1} с " +
            string.Join(" ", cells));
        await Task.Delay(1000);
    }
    Console.WriteLine($"Помилки: {string.Join(", ", errors)}");
    await host.StopAsync();
}

public interface ISensorGrain : IGrainWithStringKey
{
    Task<SensorReport> Record(double value);
}

[GenerateSerializer, Immutable]
public sealed record SensorReport(
    [property: Id(0)] int Silo,        // номер силосу з активацією
    [property: Id(1)] int Count,       // збережених показників
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
        Console.WriteLine($"  активація {key}" +
            $", показників у сховищі: {state.State.Count}");
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

Силоси й клієнт запускають у трьох вкладках Windows Terminal: `dotnet run -c Release -- silo 1`, `dotnet run -c Release -- silo 2`, через кілька секунд `dotnet run -c Release -- client`. Силоси знаходять один одного через ключ Redis `sensors/members/pro15`, клієнт бере з нього список шлюзів (порти 30001 і 30002). Через 10 с роботи клієнта вікно силосу 1 закрито (аварійне завершення процесу, рис. 16.8). Результат клієнта:

```
  0,1 с s1:1/1  s2:1/1  s3:1/1  s4:1/1  s5:1/1  s6:1/1
  1,2 с s1:1/2  s2:1/2  s3:1/2  s4:1/2  s5:1/2  s6:1/2
  2,2 с s1:1/3  s2:1/3  s3:1/3  s4:1/3  s5:1/3  s6:1/3
  3,2 с s1:1/4  s2:1/4  s3:1/4  s4:1/4  s5:1/4  s6:1/4
  4,2 с s1:1/5  s2:1/5  s3:1/5  s4:1/5  s5:1/5  s6:1/5
  5,2 с s1:1/6  s2:1/6  s3:1/6  s4:1/6  s5:1/6  s6:1/6
  6,2 с s1:1/7  s2:1/7  s3:1/7  s4:1/7  s5:1/7  s6:1/7
  7,3 с s1:1/8  s2:1/8  s3:1/8  s4:1/8  s5:1/8  s6:1/8
  8,3 с s1:1/9  s2:1/9  s3:1/9  s4:1/9  s5:1/9  s6:1/9
  9,3 с s1:1/10 s2:1/10 s3:1/10 s4:1/10 s5:1/10 s6:1/10
 18,2 с s1:збій s2:збій s3:збій s4:збій s5:збій s6:збій
 21,3 с s1:2/11 s2:2/11 s3:2/11 s4:2/11 s5:2/11 s6:2/11
 22,3 с s1:2/12 s2:2/12 s3:2/12 s4:2/12 s5:2/12 s6:2/12
 23,4 с s1:2/13 s2:2/13 s3:2/13 s4:2/13 s5:2/13 s6:2/13
 24,4 с s1:2/14 s2:2/14 s3:2/14 s4:2/14 s5:2/14 s6:2/14
 25,4 с s1:2/15 s2:2/15 s3:2/15 s4:2/15 s5:2/15 s6:2/15
 26,4 с s1:2/16 s2:2/16 s3:2/16 s4:2/16 s5:2/16 s6:2/16
 27,4 с s1:2/17 s2:2/17 s3:2/17 s4:2/17 s5:2/17 s6:2/17
 28,4 с s1:2/18 s2:2/18 s3:2/18 s4:2/18 s5:2/18 s6:2/18
 29,4 с s1:2/19 s2:2/19 s3:2/19 s4:2/19 s5:2/19 s6:2/19
 30,4 с s1:2/20 s2:2/20 s3:2/20 s4:2/20 s5:2/20 s6:2/20
 31,4 с s1:2/21 s2:2/21 s3:2/21 s4:2/21 s5:2/21 s6:2/21
 32,4 с s1:2/22 s2:2/22 s3:2/22 s4:2/22 s5:2/22 s6:2/22
 33,5 с s1:2/23 s2:2/23 s3:2/23 s4:2/23 s5:2/23 s6:2/23
 34,5 с s1:2/24 s2:2/24 s3:2/24 s4:2/24 s5:2/24 s6:2/24
 35,5 с s1:2/25 s2:2/25 s3:2/25 s4:2/25 s5:2/25 s6:2/25
 36,5 с s1:2/26 s2:2/26 s3:2/26 s4:2/26 s5:2/26 s6:2/26
 37,5 с s1:2/27 s2:2/27 s3:2/27 s4:2/27 s5:2/27 s6:2/27
 38,5 с s1:2/28 s2:2/28 s3:2/28 s4:2/28 s5:2/28 s6:2/28
 39,5 с s1:2/29 s2:2/29 s3:2/29 s4:2/29 s5:2/29 s6:2/29
 40,5 с s1:2/30 s2:2/30 s3:2/30 s4:2/30 s5:2/30 s6:2/30
 41,5 с s1:2/31 s2:2/31 s3:2/31 s4:2/31 s5:2/31 s6:2/31
 42,5 с s1:2/32 s2:2/32 s3:2/32 s4:2/32 s5:2/32 s6:2/32
 43,6 с s1:2/33 s2:2/33 s3:2/33 s4:2/33 s5:2/33 s6:2/33
 44,6 с s1:2/34 s2:2/34 s3:2/34 s4:2/34 s5:2/34 s6:2/34
 45,6 с s1:2/35 s2:2/35 s3:2/35 s4:2/35 s5:2/35 s6:2/35
 46,6 с s1:2/36 s2:2/36 s3:2/36 s4:2/36 s5:2/36 s6:2/36
 47,6 с s1:2/37 s2:2/37 s3:2/37 s4:2/37 s5:2/37 s6:2/37
 48,6 с s1:2/38 s2:2/38 s3:2/38 s4:2/38 s5:2/38 s6:2/38
 49,6 с s1:2/39 s2:2/39 s3:2/39 s4:2/39 s5:2/39 s6:2/39
Помилки: ConnectionFailedException, OrleansMessageRejectionException
```

Стратегія `ResourceOptimizedPlacement` цього разу розмістила всі шість датчиків на силосі 1 (у попередньому запуску вони розподілилися 2 : 4). Після аварії виклики чекали, поки силос 2 не перестав отримувати відповіді на проби й не оголосив силос 1 мертвим, тож один рядок містить помилки, а з позначки 21,3 с усі датчики працюють на силосі 2. Силос 2 вивів `активація s1, показників у сховищі: 10` для кожного датчика: лічильники прочитано з Redis, і жоден збережений показник не загубився. Показник, що оброблявся в момент аварії, клієнт мав би надіслати повторно (для цього операція має бути ідемпотентною).

Коректна зупинка (клавіша **Enter** у вікні силосу 1) тривала 0,1 с: силос деактивував свої зерна й повідомив кластер про вихід, тому клієнт не побачив жодної помилки, а наступні виклики активували зерна на силосі 2.

## Приклад 3. Клієнт з повторами та запобіжником

Створити застосунок, у якому зерно `WeatherGrain` імітує сервіс погоди з режимами «норма», «зависання» (відповідь через 1 с) і «збій» (виняток), а клієнт кожні 0,5 с запитує температуру через конвеєр стійкості: повтори (3 спроби, експоненційна затримка з джитером), запобіжник (розмикання при 50 % невдач серед щонайменше 4 спроб за 3 с, пауза 2 с) і таймаут однієї спроби 300 мс. Сценарій змінює режим сервісу: 0 с – норма, 1,5 с – зависання, 3,5 с – збій, 6 с – норма. Вивести кожну спробу, повтор і зміну стану запобіжника.

Проєкт – консольний, пакети `Microsoft.Orleans.Server` (10.3.1) і `Microsoft.Extensions.Resilience` (10.10.0).

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
    Console.WriteLine($"{clock.Elapsed.TotalSeconds,5:F1} с {text}");
ValueTask Say(string text)
{
    Log(text);
    return default;
}

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Logging.SetMinimumLevel(LogLevel.None);
builder.UseOrleans(silo => silo.UseLocalhostClustering());

// Конвеєр стійкості: повтори → запобіжник → таймаут спроби.
builder.Services.AddResiliencePipeline("weather", pipeline => pipeline
    .AddRetry(new RetryStrategyOptions
    {
        MaxRetryAttempts = 3,
        Delay = TimeSpan.FromMilliseconds(100),
        BackoffType = DelayBackoffType.Exponential,  // 100, 200, 400
        UseJitter = true,                           // ± випадково
        // Розімкнений запобіжник не повторюємо.
        ShouldHandle = new PredicateBuilder()
            .Handle<Exception>(e => e is not BrokenCircuitException),
        OnRetry = a =>
        {
            Log($"  повтор {a.AttemptNumber + 1} через " +
                $"{a.RetryDelay.TotalMilliseconds:F0} мс " +
                $"({a.Outcome.Exception?.GetType().Name})");
            return default;
        },
    })
    .AddCircuitBreaker(new CircuitBreakerStrategyOptions
    {
        FailureRatio = 0.5,            // 50 % невдач…
        MinimumThroughput = 4,         // …серед щонайменше 4 спроб
        SamplingDuration = TimeSpan.FromSeconds(3),
        BreakDuration = TimeSpan.FromSeconds(2),
        OnOpened = _ => Say("  запобіжник РОЗІМКНЕНО"),
        OnHalfOpened = _ => Say("  пробна спроба"),
        OnClosed = _ => Say("  запобіжник замкнено"),
    })
    .AddTimeout(TimeSpan.FromMilliseconds(300)));   // одна спроба

using IHost host = builder.Build();
await host.StartAsync();
IGrainFactory grains =
    host.Services.GetRequiredService<IGrainFactory>();
ResiliencePipeline weather = host.Services
    .GetRequiredService<ResiliencePipelineProvider<string>>()
    .GetPipeline("weather");
IWeatherGrain london = grains.GetGrain<IWeatherGrain>("Лондон");
clock.Start();

// Сценарій: норма → «зависання» → помилки → відновлення.
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
        Log($"сервіс погоди: {script[step++].Mode}");
    }
    try
    {
        double t = await weather.ExecuteAsync(async token =>
            await london.GetTemperature().WaitAsync(token));
        Log($"OK {t:F1} °C");
    }
    catch (Exception ex)
    {
        Log($"ВІДМОВА {ex.GetType().Name}");
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

[Orleans.Concurrency.Reentrant]   // SetMode не чекає GetTemperature
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
            throw new InvalidOperationException("збій сервісу");
        if (mode == Mode.Slow)
            await Task.Delay(1000);              // довше за таймаут
        return 18 + Random.Shared.NextDouble() * 4;
    }
}
```

Стратегії виконуються в порядку додавання: повтор охоплює запобіжник, а той – таймаут кожної спроби. Тому таймаут перериває лише одну спробу (`TimeoutRejectedException`), запобіжник рахує невдалі спроби, а повтор не повторює `BrokenCircuitException`, щоб не штурмувати розімкнений запобіжник. Зерно позначено `[Reentrant]`, щоб виклик `SetMode` не чекав у черзі за повільним `GetTemperature`. Результат:

```
0,1 с сервіс погоди: Ok
0,1 с OK 21,5 °C
0,6 с OK 20,2 °C
1,1 с OK 20,3 °C
1,6 с сервіс погоди: Slow
1,9 с   повтор 1 через 63 мс (TimeoutRejectedException)
2,3 с   повтор 2 через 182 мс (TimeoutRejectedException)
2,8 с   запобіжник РОЗІМКНЕНО
2,8 с   повтор 3 через 223 мс (TimeoutRejectedException)
3,0 с ВІДМОВА BrokenCircuitException
3,5 с сервіс погоди: Failing
3,5 с ВІДМОВА BrokenCircuitException
4,0 с ВІДМОВА BrokenCircuitException
4,5 с ВІДМОВА BrokenCircuitException
5,0 с   пробна спроба
5,1 с   запобіжник РОЗІМКНЕНО
5,1 с   повтор 1 через 24 мс (InvalidOperationException)
5,1 с ВІДМОВА BrokenCircuitException
5,6 с ВІДМОВА BrokenCircuitException
6,1 с сервіс погоди: Ok
6,1 с ВІДМОВА BrokenCircuitException
6,6 с ВІДМОВА BrokenCircuitException
7,1 с   пробна спроба
7,1 с   запобіжник замкнено
7,1 с OK 21,7 °C
7,6 с OK 20,8 °C
8,1 с OK 21,9 °C
8,6 с OK 19,2 °C
9,1 с OK 18,2 °C
9,7 с OK 18,3 °C
```

Під час «зависання» три спроби по 300 мс завершилися таймаутом, і після четвертої невдачі запобіжник розімкнувся: наступні запити відмовляли миттєво, не навантажуючи сервіс. Пробна спроба о 5,0 с потрапила на режим «збій», і запобіжник знову розімкнувся; пробна спроба о 7,1 с була успішною, запобіжник замкнувся, і запити знову обслуговуються. Затримки повторів (63, 182, 223 мс) відрізняються від 100, 200, 400 мс через джитер.
