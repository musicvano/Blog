---
title: "Practice"
description: "Topic 5. TPL tasks and async/await: worked examples"
outline: [2, 3]
sourceHash: "832cfb51e8b12282dd70ca919438da69a5eff44b8263756fcb24cc299b23ec73"
---

# Practice

## Example 1. A dependency graph with conditional continuations

Create a program that simulates loading data from three sources (A, B, C) with different delays, generates and saves a report after all sources finish loading, and logs an error if any source fails. Build the task graph using `ContinueWith` with conditional continuations. Run two scenarios: all sources available, and source B unavailable; print the final task states for each.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

await RunScenarioAsync("all sources available", failing: null);
await RunScenarioAsync("source B unavailable", failing: "B");

static async Task RunScenarioAsync(string title, string? failing)
{
    Console.WriteLine($"=== Scenario: {title}");
    Task<int> a = LoadAsync("A", 300, 120, failing);
    Task<int> b = LoadAsync("B", 200, 80, failing);
    Task<int> c = LoadAsync("C", 100, 45, failing);
    Task<int[]> all = Task.WhenAll(a, b, c);

    // Success branch: report, then save.
    Task<string> report = all.ContinueWith(
        t => $"report: sum = {t.Result.Sum()}, " +
             $"maximum = {t.Result.Max()}",
        CancellationToken.None,
        TaskContinuationOptions.OnlyOnRanToCompletion,
        TaskScheduler.Default);
    Task save = report.ContinueWith(
        t => Console.WriteLine($"  saved {t.Result}"),
        CancellationToken.None,
        TaskContinuationOptions.OnlyOnRanToCompletion,
        TaskScheduler.Default);

    // Failure branch: runs only for Faulted.
    Task log = all.ContinueWith(
        t =>
        {
            foreach (Exception ex in t.Exception!.InnerExceptions)
            {
                Console.WriteLine($"  error log: {ex.Message}");
            }
        },
        CancellationToken.None,
        TaskContinuationOptions.OnlyOnFaulted,
        TaskScheduler.Default);

    // One branch always becomes Canceled — wait for both.
    await Task.WhenAll(save, log).ContinueWith(_ => { },
        TaskScheduler.Default);

    Console.WriteLine($"  states: all = {all.Status}, " +
        $"report = {report.Status},");
    Console.WriteLine($"         save = {save.Status}, " +
        $"log = {log.Status}");
}

static async Task<int> LoadAsync(
    string name, int delayMs, int value, string? failing)
{
    Console.WriteLine($"  loading {name} started");
    await Task.Delay(delayMs);
    if (name == failing)
    {
        throw new HttpRequestException($"source {name}: timeout");
    }
    Console.WriteLine($"  loading {name} finished: {value}");
    return value;
}
```

`LoadAsync` simulates loading with `Task.Delay`. The `all` task completes after all three loads; if any throws an exception, it enters `Faulted`. Two branches follow it: `report` → `save` with `OnlyOnRanToCompletion`, and `log` with `OnlyOnFaulted`. A continuation whose condition is not met becomes `Canceled`, so `Task.WhenAll(save, log)` always finishes in `Canceled`. Instead of catching the exception, another continuation, `ContinueWith(_ => { })`, suppresses it. Each `ContinueWith` explicitly receives `TaskScheduler.Default`. Output:

```
=== Scenario: all sources available
  loading A started
  loading B started
  loading C started
  loading C finished: 45
  loading B finished: 80
  loading A finished: 120
  saved report: sum = 245, maximum = 120
  states: all = RanToCompletion, report = RanToCompletion,
         save = RanToCompletion, log = Canceled
=== Scenario: source B unavailable
  loading A started
  loading B started
  loading C started
  loading C finished: 45
  loading A finished: 120
  error log: source B: timeout
  states: all = Faulted, report = Canceled,
         save = Canceled, log = RanToCompletion
```

## Example 2. An asynchronous sensor reading generator

Create an asynchronous `IAsyncEnumerable<Reading>` generator that returns temperature readings at regular intervals (`PeriodicTimer`, 200 ms). The consumer prints each reading and the moving average of the last 4 measurements, marks when the moving average exceeds 22 °C, writes readings to a CSV file, and stops polling after 10 readings; the overall timeout is 5 s.

```cs
using System.Runtime.CompilerServices;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Window = 4;          // moving average window
const double Limit = 22.0;     // alert threshold, °C
string csv = Path.Combine(Path.GetTempPath(), "sensor.csv");

using CancellationTokenSource cts = new();
cts.CancelAfter(TimeSpan.FromSeconds(5));   // safety timeout
Queue<double> window = new();
int count = 0;

await using (StreamWriter writer = new(csv))   // IAsyncDisposable
{
    await writer.WriteLineAsync("n;t;avg");
    try
    {
        await foreach (Reading r in ReadSensorAsync(
            "T1", TimeSpan.FromMilliseconds(200), cts.Token))
        {
            window.Enqueue(r.Value);
            if (window.Count > Window) window.Dequeue();
            double avg = window.Average();
            string alarm = avg > Limit ? "  ALERT" : "";
            Console.WriteLine($"{r.Number,2}. {r.Sensor}: " +
                $"{r.Value,5:F1} °C, average {avg,5:F2}{alarm}");
            await writer.WriteLineAsync(
                $"{r.Number};{r.Value:F1};{avg:F2}");
            if (++count == 10)
            {
                await cts.CancelAsync();   // enough readings
            }
        }
    }
    catch (OperationCanceledException)
    {
        Console.WriteLine(
            $"Polling stopped, readings: {count}");
    }
}
Console.WriteLine($"File: {Path.GetFileName(csv)}, " +
    $"lines: {File.ReadLines(csv).Count()}");

// Asynchronous generator: a new reading on every timer tick.
static async IAsyncEnumerable<Reading> ReadSensorAsync(
    string sensor, TimeSpan period,
    [EnumeratorCancellation] CancellationToken token = default)
{
    Random random = new(7);
    double value = 21.0;
    using PeriodicTimer timer = new(period);
    int number = 0;
    while (await timer.WaitForNextTickAsync(token))
    {
        value += random.NextDouble() - 0.35;   // slow increase
        yield return new Reading(sensor, ++number, value);
    }
}

record Reading(string Sensor, int Number, double Value);
```

The generator receives its token through a parameter with `[EnumeratorCancellation]`, so cancellation interrupts `WaitForNextTickAsync` even between ticks. `Random` with a fixed seed simulates sensor readings, making the result reproducible. The consumer stops polling by calling `CancelAsync()`: the next `WaitForNextTickAsync` throws `OperationCanceledException`. A `StreamWriter` writes the file and implements `IAsyncDisposable`, so `await using` closes it before the lines are counted. A `Queue<double>` stores the moving window. Output:

```
 1. T1:  21,0 °C, average 21,03
 2. T1:  21,6 °C, average 21,29
 3. T1:  21,9 °C, average 21,48
 4. T1:  21,6 °C, average 21,51
 5. T1:  21,6 °C, average 21,64
 6. T1:  21,9 °C, average 21,73
 7. T1:  21,6 °C, average 21,67
 8. T1:  22,2 °C, average 21,83
 9. T1:  22,7 °C, average 22,10  ALERT
10. T1:  23,2 °C, average 22,43  ALERT
Polling stopped, readings: 10
File: sensor.csv, lines: 11
```

## Example 3. Parallel page downloads with timeouts

Create a program that downloads five pages concurrently with `HttpClient`, using a 1 s timeout per request, and prints a report: page, result (success, HTTP error code, timeout), size, and time, plus the successful request count, total time, and sum of request times. A local `HttpListener` test server in the same program serves pages with different response delays, so the program needs no internet access.

```cs
using System.Diagnostics;
using System.Net;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;

const string Prefix = "http://localhost:5055/";
using CancellationTokenSource stop = new();
Task server = RunServerAsync(Prefix, stop.Token);

string[] pages = ["news", "weather", "slow", "missing", "rates"];
TimeSpan timeout = TimeSpan.FromSeconds(1);
using HttpClient client = new() { BaseAddress = new Uri(Prefix) };

Stopwatch total = Stopwatch.StartNew();
PageResult[] results = await Task.WhenAll(
    pages.Select(p => DownloadAsync(client, p, timeout)));
total.Stop();

Console.WriteLine($"{"Page",-9} {"Result",-22} {"Bytes",6} " +
    $"{"ms",6}");
foreach (PageResult r in results)
{
    Console.WriteLine($"{r.Page,-9} {r.Status,-22} {r.Bytes,6} " +
        $"{r.Milliseconds,6:F0}");
}
int ok = results.Count(r => r.Status == "OK");
Console.WriteLine($"Successful {ok} of {results.Length}, " +
    $"total time {total.ElapsedMilliseconds} ms, " +
    $"sum of times {results.Sum(r => r.Milliseconds):F0} ms");

await stop.CancelAsync();
await server;

static async Task<PageResult> DownloadAsync(
    HttpClient client, string page, TimeSpan timeout)
{
    using CancellationTokenSource cts = new(timeout);
    long start = Stopwatch.GetTimestamp();
    string status;
    int bytes = 0;
    try
    {
        using HttpResponseMessage response =
            await client.GetAsync(page, cts.Token);
        response.EnsureSuccessStatusCode();
        byte[] body =
            await response.Content.ReadAsByteArrayAsync(cts.Token);
        (status, bytes) = ("OK", body.Length);
    }
    catch (OperationCanceledException)
        when (cts.IsCancellationRequested)
    {
        status = $"timeout {timeout.TotalSeconds} s";
    }
    catch (HttpRequestException ex)
    {
        status = $"HTTP {(int?)ex.StatusCode}";
    }
    double ms = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    return new PageResult(page, status, bytes, ms);
}

// Local test server: different delays and a 404 response.
static async Task RunServerAsync(
    string prefix, CancellationToken token)
{
    using HttpListener listener = new();
    listener.Prefixes.Add(prefix);
    listener.Start();
    using CancellationTokenRegistration reg =
        token.Register(listener.Stop);
    List<Task> handlers = [];
    try
    {
        while (!token.IsCancellationRequested)
        {
            HttpListenerContext context =
                await listener.GetContextAsync();
            handlers.Add(HandleAsync(context, token));
        }
    }
    catch (HttpListenerException) when (token.IsCancellationRequested)
    {
        // listener.Stop() interrupts waiting for a request
    }
    await Task.WhenAll(handlers);
}

static async Task HandleAsync(
    HttpListenerContext context, CancellationToken token)
{
    string page = context.Request.Url!.AbsolutePath.Trim('/');
    (int delay, int code) = page switch
    {
        "news" => (250, 200),
        "weather" => (400, 200),
        "slow" => (3000, 200),
        "rates" => (150, 200),
        _ => (50, 404),
    };
    try
    {
        await Task.Delay(delay, token);
        string html = $"<p>{page}: {new string('x', delay)}</p>";
        byte[] body = Encoding.UTF8.GetBytes(html);
        context.Response.StatusCode = code;
        await context.Response.OutputStream.WriteAsync(body, token);
        context.Response.Close();
    }
    catch (Exception ex) when (ex is OperationCanceledException
        or HttpListenerException)
    {
        context.Response.Abort();    // server is stopping
    }
}

record PageResult(string Page, string Status, int Bytes,
    double Milliseconds);
```

The server handles each request in a separate `HandleAsync` task, so the slow page `slow` (3 s) does not delay the others. Each request gets its own cancellation source with a timeout, and `when (cts.IsCancellationRequested)` distinguishes a timeout from other cancellation causes. `EnsureSuccessStatusCode` turns a 404 response into an `HttpRequestException`. The longest request determines the total time (about 1 s), while the sum of times shows how long sequential downloading would take. After the report, the `stop` token stops the server: `listener.Stop()` interrupts `GetContextAsync`, and unfinished handlers are canceled. Output (milliseconds vary between runs):

```
Page      Result                  Bytes     ms
news      OK                        263    294
weather   OK                        416    440
slow      timeout 1 s                 0   1009
missing   HTTP 404                    0    106
rates     OK                        164    192
Successful 3 of 5, total time 1015 ms, sum of times 2040 ms
```
