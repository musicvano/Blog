---
title: "Practice"
description: "Topic 6. DI, configuration, logging: worked examples"
outline: [2, 3]
sourceHash: "8c2f4305b0ebe3cc9448cb50efa721f5c3f8bb6fa9dca39b33d6930d492a664f"
---

# Practice

Examples 1 and 2 are *Worker Service* template projects (`dotnet new worker`) in which the `Worker.cs` file has been deleted. The template already references the `Microsoft.Extensions.Hosting` package and copies `appsettings.json` to the output folder.

## Example 1. Delivery calculator

Write a console application that calculates the cost of delivering an order by courier, by post, or by in-store pickup. The rates (the base cost and the price for each started kilogram) and the free delivery threshold are set in `appsettings.json`, and the weight, amount, and delivery method are given as command-line arguments. Register the delivery methods as keyed services; without the `Order:Method` argument, print a table of all rates, and for an unknown method print a message to the error stream and exit with code 1.

The `appsettings.json` file:

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

The rates in `Tariffs.cs` receive their options through `IOptions<DeliveryOptions>`. The shared formula is moved into the abstract `RateTariff` class, and the descendants only choose their own options section:

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

// Shared logic: free delivery from FreeFrom.
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
    public override string Name => "Courier";
    protected override RateOptions Rate => Settings.Courier;
}

public class PostTariff(IOptions<DeliveryOptions> options)
    : RateTariff(options)
{
    public override string Name => "Post";
    protected override RateOptions Rate => Settings.Post;
}

public class PickupTariff(IOptions<DeliveryOptions> options) : ITariff
{
    public string Name => "Pickup";
    public decimal Cost(double weight, decimal orderSum) =>
        options.Value.PickupCost;
}
```

The nested `RateOptions` classes are bound to the nested `Delivery:Courier` and `Delivery:Post` sections automatically. `Program.cs` registers the rates with keys and reads the order from the configuration, to which the host has already added the command-line arguments:

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Services.Configure<DeliveryOptions>(
    builder.Configuration.GetSection("Delivery"));
builder.Services.AddKeyedSingleton<ITariff, CourierTariff>("courier");
builder.Services.AddKeyedSingleton<ITariff, PostTariff>("post");
builder.Services.AddKeyedSingleton<ITariff, PickupTariff>("pickup");
using IHost host = builder.Build();

// The order from the command line: Order:Weight=2.5 Order:Sum=1500
IConfiguration config = builder.Configuration;
double weight = config.GetValue("Order:Weight", 1.0);
decimal sum = config.GetValue("Order:Sum", 0m);
string? method = config["Order:Method"];
IServiceProvider services = host.Services;

Console.WriteLine($"Weight {weight} kg, amount {sum} UAH");
if (method is null)
{
    // All rates registered with keys.
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
    Console.Error.WriteLine($"Unknown delivery method: {method}");
    return 1;
}
return 0;
```

`GetKeyedService` returns `null` for an unregistered key, so the error is handled by the `is { } tariff` pattern without an exception. The configuration converts the value `Order:Weight=2.5` to `double` using the invariant culture (with a period), while the program formats its output with the current culture (here, English (United States)). Four runs of `dotnet run --` (the service lines from `dotnet run` are omitted):

```
> dotnet run -- Order:Weight=2.5 Order:Sum=1500
Weight 2.5 kg, amount 1500 UAH
  Courier      165.00
  Post         120.00
  Pickup         0.00
> dotnet run -- Order:Weight=4 Order:Sum=2400 Order:Method=courier
Weight 4 kg, amount 2400 UAH
  Courier: 0.00
> dotnet run -- Order:Weight=2.5 Order:Sum=900 Order:Method=post
Weight 2.5 kg, amount 900 UAH
  Post: 120.00
> dotnet run -- Order:Method=drone
Weight 1 kg, amount 0 UAH
Unknown delivery method: drone
```

To change the rates, it is enough to edit `appsettings.json` or override the value with the `Delivery__Courier__BaseCost` environment variable, without changing the code.

## Example 2. Scheduled backup

Write a background service that, at an interval set in the configuration, archives a folder into a ZIP file with the date and time in its name and keeps only a given number of the latest copies. Validate the options at startup: the source folder must exist, the interval must be from 1 s to one day, and the number of copies from 1 to 100. The service must stop gracefully on **Ctrl+C**.

`Program.cs` combines validation by attributes with a custom `Validate` rule. The `TimeProvider` clock is registered as a service so that it can be replaced in tests:

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

The `Microsoft.Extensions.Options.DataAnnotations` package is added with the command `dotnet add package Microsoft.Extensions.Options.DataAnnotations`. The `appsettings.json` file contains a `"Backup"` section with the values `Source` = `Documents`, `Target` = `Backups`, `IntervalSeconds` = 3, `KeepCopies` = 2 (relative paths are resolved from the current folder). The `BackupWorker.cs` service uses `PeriodicTimer`: unlike `Task.Delay` in a loop, it does not accumulate time drift, and `WaitForNextTickAsync` returns `false` or is canceled when the host stops.

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

The file names contain the date in the `yyyyMMdd-HHmmss` format, so sorting by name matches sorting by time. A write error (`IOException`) does not stop the service: it is logged, and the next attempt happens on schedule. The result of a run with a `Documents` folder of two text files (the first host records are omitted; each record takes two lines):

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

A run of `dotnet run -- Backup:Source=Docs Backup:KeepCopies=0` ends before the first copy is created, because both rules are violated (lines wrapped):

```
Unhandled exception. Microsoft.Extensions.Options.
OptionsValidationException: DataAnnotation validation failed for
'BackupOptions' members: 'KeepCopies' with the error: 'The field
KeepCopies must be between 1 and 100.'.; Source folder does not exist.
```

## Example 3. Unit tests for a service with fake time

Write a library with a "happy hour" discount service: from 16:00 to 18:00 the price is reduced by a percentage from the options, and applying the discount is logged. Test the service with xUnit.net v3 unit tests for the interval boundaries and the passage of time, without waiting for real time and without creating a host.

The solution with a library and a test project is created as in Topic 2; the library gets only the logging and options abstractions, and the tests get a fake clock:

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

The `Shop.Core/DiscountService.cs` service receives the clock, options, and logger through its constructor:

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

The tests in `Shop.Tests/DiscountServiceTests.cs` create the service without a container. `FakeTimeProvider` uses the UTC time zone by default, so the local time in the test equals the specified UTC time and does not depend on the computer's settings:

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
    [InlineData(15, 59, 200.00)]   // not started yet
    [InlineData(16, 00, 180.00)]   // the first minute
    [InlineData(17, 59, 180.00)]
    [InlineData(18, 00, 200.00)]   // already over
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

xUnit.net converts the `double` numbers from `[InlineData]` to the `decimal` parameter, because the attribute does not accept `decimal` literals. The result of `dotnet test` (the path is shortened):

```
Running tests from …\Shop.Tests.dll (net10.0|x64)
…\Shop.Tests.dll (net10.0|x64) passed (817ms)

Test run summary: Passed!
  total: 5
  failed: 0
  succeeded: 5
  skipped: 0
```

The interval boundaries (15:59, 16:00, 17:59, 18:00) are tested with separate data rows, and `Advance` shows that the same object reacts to the change of time. In a real program, the container registers `TimeProvider.System` and `Configure<DiscountOptions>`.
