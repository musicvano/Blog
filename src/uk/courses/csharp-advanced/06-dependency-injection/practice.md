---
title: "Практика"
description: "Тема 6. DI, конфігурація, журналювання: розібрані приклади"
outline: [2, 3]
---

# Практика

Приклади 1 і 2 – проєкти шаблону *Worker Service* (`dotnet new worker`), у яких файл `Worker.cs` видалено. Шаблон уже підключає пакет `Microsoft.Extensions.Hosting` і копіює `appsettings.json` у вихідну папку.

## Приклад 1. Калькулятор доставки

Написати консольний застосунок, який обчислює вартість доставки замовлення кур’єром, поштою або самовивозом. Тарифи (базова вартість і ціна за кожен почато кілограм) і поріг безкоштовної доставки задано в `appsettings.json`, вагу, суму та спосіб доставки – аргументами командного рядка. Способи доставки зареєструвати як ключові сервіси; без аргументу `Order:Method` вивести таблицю всіх тарифів, для невідомого способу – повідомлення в потік помилок і код завершення 1.

Файл `appsettings.json`:

```json
{
  "Delivery": {
    "Courier": { "BaseCost": 120, "PerKg": 15 },
    "Post": { "BaseCost": 60, "PerKg": 20 },
    "PickupCost": 0,
    "FreeFrom": 2000
  },
  "Logging": {
    "LogLevel": { "Default": "Warning" }
  }
}
```

Тарифи `Tariffs.cs` отримують параметри через `IOptions<DeliveryOptions>`. Спільну формулу винесено в абстрактний клас `RateTariff`, а нащадки лише обирають свій розділ параметрів:

```cs
using Microsoft.Extensions.Options;

public class RateOptions
{
    public decimal BaseCost { get; set; }
    public decimal PerKg { get; set; }
}

public class DeliveryOptions
{
    public RateOptions Courier { get; set; } = new();
    public RateOptions Post { get; set; } = new();
    public decimal PickupCost { get; set; }
    public decimal FreeFrom { get; set; }
}

public interface ITariff
{
    string Name { get; }
    decimal Cost(double weight, decimal orderSum);
}

// Спільна логіка: безкоштовна доставка від FreeFrom.
public abstract class RateTariff(IOptions<DeliveryOptions> options)
    : ITariff
{
    protected DeliveryOptions Settings => options.Value;
    public abstract string Name { get; }
    protected abstract RateOptions Rate { get; }

    public decimal Cost(double weight, decimal orderSum) =>
        orderSum >= Settings.FreeFrom ? 0 :
        Rate.BaseCost + Rate.PerKg * (decimal)Math.Ceiling(weight);
}

public class CourierTariff(IOptions<DeliveryOptions> options)
    : RateTariff(options)
{
    public override string Name => "Кур’єр";
    protected override RateOptions Rate => Settings.Courier;
}

public class PostTariff(IOptions<DeliveryOptions> options)
    : RateTariff(options)
{
    public override string Name => "Пошта";
    protected override RateOptions Rate => Settings.Post;
}

public class PickupTariff(IOptions<DeliveryOptions> options) : ITariff
{
    public string Name => "Самовивіз";
    public decimal Cost(double weight, decimal orderSum) =>
        options.Value.PickupCost;
}
```

Вкладені класи `RateOptions` зв’язуються з вкладеними розділами `Delivery:Courier` і `Delivery:Post` автоматично. `Program.cs` реєструє тарифи з ключами і читає замовлення з конфігурації, до якої хост уже додав аргументи командного рядка:

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Services.Configure<DeliveryOptions>(
    builder.Configuration.GetSection("Delivery"));
builder.Services.AddKeyedSingleton<ITariff, CourierTariff>("courier");
builder.Services.AddKeyedSingleton<ITariff, PostTariff>("post");
builder.Services.AddKeyedSingleton<ITariff, PickupTariff>("pickup");
using IHost host = builder.Build();

// Замовлення з командного рядка: Order:Weight=2.5 Order:Sum=1500
IConfiguration config = builder.Configuration;
double weight = config.GetValue("Order:Weight", 1.0);
decimal sum = config.GetValue("Order:Sum", 0m);
string? method = config["Order:Method"];
IServiceProvider services = host.Services;

Console.WriteLine($"Вага {weight} кг, сума {sum} грн");
if (method is null)
{
    // Усі тарифи, зареєстровані з ключами.
    foreach (ITariff t in
             services.GetKeyedServices<ITariff>(KeyedService.AnyKey))
        Console.WriteLine(
            $"  {t.Name,-10} {t.Cost(weight, sum),8:N2}");
}
else if (services.GetKeyedService<ITariff>(method) is { } tariff)
{
    Console.WriteLine(
        $"  {tariff.Name}: {tariff.Cost(weight, sum):N2}");
}
else
{
    Console.Error.WriteLine($"Невідомий спосіб доставки: {method}");
    return 1;
}
return 0;
```

`GetKeyedService` повертає `null` для незареєстрованого ключа, тому помилку обробляє шаблон `is { } tariff` без винятку. Значення `Order:Weight=2.5` конфігурація перетворює на `double` з інваріантною культурою (з крапкою), а виводить програма з культурою `uk-UA`. Чотири запуски `dotnet run --` (службові рядки `dotnet run` пропущено):

```
> dotnet run -- Order:Weight=2.5 Order:Sum=1500
Вага 2,5 кг, сума 1500 грн
  Кур’єр       165,00
  Пошта        120,00
  Самовивіз      0,00
> dotnet run -- Order:Weight=4 Order:Sum=2400 Order:Method=courier
Вага 4 кг, сума 2400 грн
  Кур’єр: 0,00
> dotnet run -- Order:Weight=2.5 Order:Sum=900 Order:Method=post
Вага 2,5 кг, сума 900 грн
  Пошта: 120,00
> dotnet run -- Order:Method=drone
Вага 1 кг, сума 0 грн
Невідомий спосіб доставки: drone
```

Щоб змінити тарифи, досить відредагувати `appsettings.json` або перевизначити значення змінною середовища `Delivery__Courier__BaseCost`, не змінюючи коду.

## Приклад 2. Резервне копіювання за розкладом

Написати фонову службу, яка з інтервалом, заданим у конфігурації, архівує папку в ZIP-файл з датою й часом у назві і залишає лише задану кількість останніх копій. Параметри перевіряти під час запуску: папка-джерело має існувати, інтервал – від 1 с до доби, кількість копій – від 1 до 100. Служба має коректно зупинятися за **Ctrl+C**.

`Program.cs` поєднує перевірку атрибутами і власне правило `Validate`. Годинник `TimeProvider` зареєстровано як сервіс, щоб у тестах його можна було замінити:

```cs
using System.ComponentModel.DataAnnotations;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Services.AddOptions<BackupOptions>()
    .Bind(builder.Configuration.GetSection("Backup"))
    .ValidateDataAnnotations()
    .Validate(o => Directory.Exists(o.Source),
        "Source folder does not exist.")
    .ValidateOnStart();
builder.Services.AddSingleton(TimeProvider.System);
builder.Services.AddHostedService<BackupWorker>();

using IHost host = builder.Build();
await host.RunAsync();

public class BackupOptions
{
    [Required] public string Source { get; set; } = "";
    [Required] public string Target { get; set; } = "";
    [Range(1, 86400)] public int IntervalSeconds { get; set; } = 3600;
    [Range(1, 100)] public int KeepCopies { get; set; } = 5;
}
```

Пакет `Microsoft.Extensions.Options.DataAnnotations` додають командою `dotnet add package Microsoft.Extensions.Options.DataAnnotations`. Файл `appsettings.json` містить розділ `"Backup"` зі значеннями `Source` = `Documents`, `Target` = `Backups`, `IntervalSeconds` = 3, `KeepCopies` = 2 (відносні шляхи відраховуються від поточної папки). Служба `BackupWorker.cs` використовує `PeriodicTimer`: на відміну від `Task.Delay` у циклі, він не накопичує зсув часу, а `WaitForNextTickAsync` повертає `false` або скасовується під час зупинки хоста.

```cs
using System.IO.Compression;
using Microsoft.Extensions.Options;

public class BackupWorker(IOptions<BackupOptions> options,
    TimeProvider time, ILogger<BackupWorker> logger)
    : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        BackupOptions o = options.Value;
        Directory.CreateDirectory(o.Target);
        using var timer = new PeriodicTimer(
            TimeSpan.FromSeconds(o.IntervalSeconds), time);
        do
        {
            try
            {
                CreateCopy(o);
                DeleteOldCopies(o);
            }
            catch (IOException ex)
            {
                logger.LogError(ex, "Backup of {Source} failed",
                    o.Source);
            }
        }
        while (await timer.WaitForNextTickAsync(ct));
    }

    private void CreateCopy(BackupOptions o)
    {
        string stamp = $"{time.GetLocalNow():yyyyMMdd-HHmmss}";
        string name = $"backup-{stamp}.zip";
        string path = Path.Combine(o.Target, name);
        ZipFile.CreateFromDirectory(o.Source, path);
        logger.LogInformation("Created {File} ({Size} bytes)",
            name, new FileInfo(path).Length);
    }

    private void DeleteOldCopies(BackupOptions o)
    {
        var old = new DirectoryInfo(o.Target)
            .GetFiles("backup-*.zip")
            .OrderByDescending(f => f.Name)
            .Skip(o.KeepCopies);
        foreach (FileInfo file in old)
        {
            file.Delete();
            logger.LogInformation("Deleted {File}", file.Name);
        }
    }
}
```

Назви файлів містять дату у форматі `yyyyMMdd-HHmmss`, тому сортування за назвою збігається із сортуванням за часом. Помилка запису (`IOException`) не зупиняє службу: її записано в журнал, а наступна спроба відбудеться за розкладом. Результат запуску з папкою `Documents` із двох текстових файлів (перші записи хоста пропущено, кожен запис займає два рядки):

```
info: BackupWorker[0]
      Created backup-20260917-141329.zip (246 bytes)
info: BackupWorker[0]
      Created backup-20260917-141332.zip (246 bytes)
info: BackupWorker[0]
      Created backup-20260917-141335.zip (246 bytes)
info: BackupWorker[0]
      Deleted backup-20260917-141329.zip
info: BackupWorker[0]
      Created backup-20260917-141338.zip (246 bytes)
info: BackupWorker[0]
      Deleted backup-20260917-141332.zip
info: Microsoft.Hosting.Lifetime[0]
      Application is shutting down...
```

Запуск `dotnet run -- Backup:Source=Docs Backup:KeepCopies=0` завершується до створення першої копії, бо обидва правила порушено (рядки перенесено):

```
Unhandled exception. Microsoft.Extensions.Options.
OptionsValidationException: DataAnnotation validation failed for
'BackupOptions' members: 'KeepCopies' with the error: 'The field
KeepCopies must be between 1 and 100.'.; Source folder does not exist.
```

## Приклад 3. Модульні тести сервісу з фейковим часом

Написати бібліотеку з сервісом знижок «щасливої години»: з 16:00 до 18:00 ціна зменшується на відсоток із параметрів, а застосування знижки записується в журнал. Перевірити сервіс модульними тестами xUnit.net v3 для меж інтервалу та проходження часу, не чекаючи реального часу й не створюючи хоста.

Рішення з бібліотекою та тестовим проєктом створюється, як у темі 2; бібліотека отримує лише абстракції журналу й параметрів, а тести – фейковий годинник:

```powershell
dotnet new sln -n Shop
dotnet new classlib -o Shop.Core
dotnet new xunit3 -f net10.0 -o Shop.Tests
dotnet sln add Shop.Core Shop.Tests
dotnet add Shop.Tests reference Shop.Core
dotnet add Shop.Core package Microsoft.Extensions.Logging.Abstractions
dotnet add Shop.Core package Microsoft.Extensions.Options
cd Shop.Tests
dotnet add package Microsoft.Extensions.TimeProvider.Testing
```

Сервіс `Shop.Core/DiscountService.cs` отримує годинник, параметри та журнал через конструктор:

```cs
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Shop.Core;

public class DiscountOptions
{
    public int HappyHourStart { get; set; } = 16;
    public int HappyHourEnd { get; set; } = 18;
    public int Percent { get; set; } = 10;
}

public class DiscountService(TimeProvider time,
    IOptions<DiscountOptions> options,
    ILogger<DiscountService> logger)
{
    public decimal GetPrice(decimal price)
    {
        DiscountOptions o = options.Value;
        int hour = time.GetLocalNow().Hour;
        if (hour < o.HappyHourStart || hour >= o.HappyHourEnd)
            return price;
        logger.LogInformation("Happy hour discount {Percent} %",
            o.Percent);
        return Math.Round(price * (100 - o.Percent) / 100, 2);
    }
}
```

Тести `Shop.Tests/DiscountServiceTests.cs` створюють сервіс без контейнера. `FakeTimeProvider` за замовчуванням використовує часовий пояс UTC, тому локальний час у тесті дорівнює заданому UTC-часу і не залежить від налаштувань комп’ютера:

```cs
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Time.Testing;
using Shop.Core;

namespace Shop.Tests;

public class DiscountServiceTests
{
    private readonly FakeTimeProvider time = new();

    private DiscountService CreateService(int percent = 10) =>
        new(time,
            Options.Create(new DiscountOptions { Percent = percent }),
            NullLogger<DiscountService>.Instance);

    [Theory]
    [InlineData(15, 59, 200.00)]   // ще не почалася
    [InlineData(16, 00, 180.00)]   // перша хвилина
    [InlineData(17, 59, 180.00)]
    [InlineData(18, 00, 200.00)]   // уже закінчилася
    public void GetPrice_DependsOnTime(int hour, int minute,
        decimal expected)
    {
        time.SetUtcNow(new DateTimeOffset(
            2026, 9, 17, hour, minute, 0, TimeSpan.Zero));
        Assert.Equal(expected, CreateService().GetPrice(200m));
    }

    [Fact]
    public void GetPrice_AfterTimePasses_DiscountEnds()
    {
        time.SetUtcNow(new DateTimeOffset(
            2026, 9, 17, 17, 30, 0, TimeSpan.Zero));
        DiscountService service = CreateService(percent: 25);
        Assert.Equal(75.00m, service.GetPrice(100m));

        time.Advance(TimeSpan.FromMinutes(30));   // 18:00
        Assert.Equal(100m, service.GetPrice(100m));
    }
}
```

xUnit.net перетворює числа `double` з `[InlineData]` на параметр `decimal`, бо атрибут не приймає `decimal`-літералів. Результат `dotnet test` (шлях скорочено):

```
Running tests from …\Shop.Tests.dll (net10.0|x64)
…\Shop.Tests.dll (net10.0|x64) passed (817ms)

Test run summary: Passed!
  total: 5
  failed: 0
  succeeded: 5
  skipped: 0
```

Межі інтервалу (15:59, 16:00, 17:59, 18:00) перевірено окремими рядками даних, а `Advance` показує, що той самий об’єкт реагує на зміну часу. У справжній програмі в контейнері реєструють `TimeProvider.System` і `Configure<DiscountOptions>`.
