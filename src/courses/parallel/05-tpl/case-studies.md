---
title: "Examples and common mistakes"
description: "Topic 5. TPL tasks and async/await: examples and common mistakes"
outline: [2, 3]
sourceHash: "6a47e50e7b318e932918ddeb8f0392979610bf749f1a81df13585e9e56301a3c"
---

# Examples and common mistakes

## Program examples

All programs were tested with .NET SDK 10.0.401 in Release configuration. Times were measured on an Intel Core i9-11900KF (8 cores, 16 logical processors) after warmup, using the median of five measurements; results will differ on other computers.

### Parallel statistics computation

The program divides an array of 20 million random numbers into 8 parts, computes statistics for each part in a separate `Task.Run` task, and combines the results after `Task.WhenAll`. The second part of the program shows how `await` and `AggregateException` report failures in multiple tasks.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

double[] data = new double[20_000_000];
Random random = new(42);
for (int i = 0; i < data.Length; i++) data[i] = random.NextDouble();

Stats seq = null!, par = null!;
double tSeq = await MedianAsync(() =>
{
    seq = Compute(data, 0, data.Length);
    return Task.CompletedTask;
});
double tPar = await MedianAsync(async () =>
    par = await ComputeParallelAsync(data, parts: 8));
Console.WriteLine($"Sequential: {seq}");
Console.WriteLine($"Parallel: {par}");
Console.WriteLine($"Sum difference: {Math.Abs(seq.Sum - par.Sum):E1}");
Console.WriteLine(
    $"Time: {tSeq:F1} ms versus {tPar:F1} ms, S = {tSeq / tPar:F2}");

// Two of the three parts contain invalid values.
data[3] = double.NaN;
data[^1] = double.PositiveInfinity;
int third = data.Length / 3;
Task<Stats>[] tasks =
[
    Task.Run(() => Compute(data, 0, third)),
    Task.Run(() => Compute(data, third, 2 * third)),
    Task.Run(() => Compute(data, 2 * third, data.Length)),
];
Task<Stats[]> all = Task.WhenAll(tasks);
try
{
    await all;                        // throws only the first exception
}
catch (InvalidDataException ex)
{
    Console.WriteLine($"await: {ex.Message}");
    foreach (Exception inner in all.Exception!.InnerExceptions)
    {
        Console.WriteLine($"  AggregateException: {inner.Message}");
    }
}
for (int i = 0; i < tasks.Length; i++)
{
    Console.WriteLine($"Task {i}: {tasks[i].Status}");
}

static async Task<Stats> ComputeParallelAsync(double[] a, int parts)
{
    Task<Stats>[] tasks = new Task<Stats>[parts];
    int chunk = a.Length / parts;
    for (int p = 0; p < parts; p++)
    {
        int from = p * chunk;                  // copies for the closure
        int to = p == parts - 1 ? a.Length : from + chunk;
        tasks[p] = Task.Run(() => Compute(a, from, to));
    }
    Stats[] partial = await Task.WhenAll(tasks);   // task order
    return partial.Aggregate(Stats.Combine);
}

static Stats Compute(double[] a, int from, int to)
{
    double sum = 0, squares = 0, max = double.MinValue;
    for (int i = from; i < to; i++)
    {
        double x = a[i];
        if (!double.IsFinite(x))
        {
            throw new InvalidDataException($"a[{i}] = {x}");
        }
        sum += x;
        squares += x * x;
        max = Math.Max(max, x);
    }
    return new(to - from, sum, squares, max);
}

// Warmup and median of five measurements.
static async Task<double> MedianAsync(Func<Task> action)
{
    await action();
    double[] times = new double[5];
    for (int i = 0; i < times.Length; i++)
    {
        long start = Stopwatch.GetTimestamp();
        await action();
        times[i] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    }
    Array.Sort(times);
    return times[2];
}

record Stats(long Count, double Sum, double Squares, double Max)
{
    public double Mean => Sum / Count;
    public double StdDev => Math.Sqrt(Squares / Count - Mean * Mean);

    public static Stats Combine(Stats x, Stats y) => new(
        x.Count + y.Count, x.Sum + y.Sum, x.Squares + y.Squares,
        Math.Max(x.Max, y.Max));

    public override string ToString() =>
        $"n = {Count:N0}, x̄ = {Mean:F5}, σ = {StdDev:F5}";
}
```

The partition boundaries `from` and `to` are declared inside the loop, so each lambda captures its own copies. `Task.WhenAll` returns an array of results in task order, not completion order, making the merge deterministic. The sums differ slightly: floating-point numbers are added in a different order, and floating-point addition is not associative. Memory bandwidth and task startup overhead limit speedup to about 7 with 8 parts.

`Compute` throws `InvalidDataException` when it encounters `NaN` or infinity. In the second part of the program, two of the three tasks throw exceptions. `await all` throws the first `InvalidDataException`, while `all.Exception` contains both. Tasks that threw exceptions are `Faulted`, and the successful task is `RanToCompletion`. Output:

```
Sequential: n = 20 000 000, x̄ = 0,49994, σ = 0,28865
Parallel: n = 20 000 000, x̄ = 0,49994, σ = 0,28865
Sum difference: 4,2E-007
Time: 37,3 ms versus 5,2 ms, S = 7,14
await: a[3] = NaN
  AggregateException: a[3] = NaN
  AggregateException: a[19999999] = ∞
Task 0: Faulted
Task 1: RanToCompletion
Task 2: Faulted
```

### File hashing with cancellation

The program creates 100 files of 1 MB each and computes their SHA-256 hashes. The operation can be canceled with **Esc** or a timeout (the number of seconds is a command-line argument). A linked token combines two cancellation sources, and a custom `IProgress<T>` implementation displays progress.

```cs
using System.Security.Cryptography;

Console.OutputEncoding = System.Text.Encoding.UTF8;

int seconds = args.Length > 0 ? int.Parse(args[0]) : 10;
string folder = Path.Combine(Path.GetTempPath(), "hash-demo");
string[] files = await CreateFilesAsync(folder, count: 100);

using CancellationTokenSource esc = new();
using CancellationTokenSource timeout = new();
timeout.CancelAfter(TimeSpan.FromSeconds(seconds));
using CancellationTokenSource linked = CancellationTokenSource
    .CreateLinkedTokenSource(esc.Token, timeout.Token);
using CancellationTokenRegistration reg = linked.Token.Register(
    () => Console.WriteLine("  [Register] cancellation requested"));

_ = WatchEscapeAsync(esc);    // a separate task monitors the keyboard
Console.WriteLine($"Hashing {files.Length} files, " +
    $"Esc – cancel, timeout {seconds} s");

ConsoleProgress progress = new(files.Length);
int done = 0;
try
{
    done = await HashAllAsync(files, progress, linked.Token);
    Console.WriteLine($"Done: {done} files");
}
catch (OperationCanceledException)
{
    string reason = timeout.IsCancellationRequested
        ? "timeout" : "Esc key";
    Console.WriteLine($"Operation canceled ({reason}), " +
        $"processed {progress.Done} of {files.Length} files");
}

static async Task<int> HashAllAsync(string[] files,
    IProgress<string> progress, CancellationToken token)
{
    foreach (string file in files)
    {
        token.ThrowIfCancellationRequested();
        await using FileStream stream = File.OpenRead(file);
        byte[] hash = await SHA256.HashDataAsync(stream, token);
        await Task.Delay(40, token);   // simulate a slow disk
        string hex = Convert.ToHexString(hash)[..16];
        progress.Report($"{Path.GetFileName(file)} {hex}");
    }
    return files.Length;
}

static async Task WatchEscapeAsync(CancellationTokenSource cts)
{
    if (Console.IsInputRedirected) return;   // no keyboard
    while (!cts.IsCancellationRequested)
    {
        if (Console.KeyAvailable
            && Console.ReadKey(true).Key == ConsoleKey.Escape)
        {
            await cts.CancelAsync();
            return;
        }
        await Task.Delay(50);
    }
}

static async Task<string[]> CreateFilesAsync(string folder, int count)
{
    Directory.CreateDirectory(folder);
    string[] names = new string[count];
    byte[] buffer = new byte[1 << 20];               // 1 MB
    for (int i = 0; i < count; i++)
    {
        names[i] = Path.Combine(folder, $"file{i:D3}.bin");
        new Random(i).NextBytes(buffer);             // fixed content
        await File.WriteAllBytesAsync(names[i], buffer);
    }
    return names;
}

// Custom IProgress<T> implementation: prints immediately and in order.
class ConsoleProgress(int total) : IProgress<string>
{
    public int Done { get; private set; }

    public void Report(string value)
    {
        Done++;
        if (Done % 20 == 0 || Done == total)
        {
            Console.WriteLine($"  {Done,3}/{total}: {value}");
        }
    }
}
```

`HashAllAsync` checks the token before each file, and `SHA256.HashDataAsync` and `Task.Delay` receive the same token, so cancellation works even during a wait. The `WatchEscapeAsync` task is not awaited (the `_ =` discard) and does not throw exceptions; if input is redirected from a file, there is no keyboard, so the task exits immediately. The `Register` callback prints a message at the moment of cancellation, before the operation notices it. Output from `dotnet run -c Release -- 2` (a 2 s timeout; the processed file count depends on the computer):

```
Hashing 100 files, Esc – cancel, timeout 2 s
   20/100: file019.bin 3E2A6E1588BA5652
  [Register] cancellation requested
Operation canceled (timeout), processed 39 of 100 files
```

Without hitting the timeout (`dotnet run -c Release -- 30`), the program processes every file and prints the lines `40/100`, `60/100`, `80/100`, `100/100`, and “Done: 100 files”. Figure 5.9 shows cancellation with **Esc** in Windows Terminal.

::: info Screenshot
Windows Terminal: dotnet run -c Release – 30 in the example folder, press Esc after the 40/100 line; progress lines and “Operation canceled (Esc key), processed NN of 100 files”
:::

Figure 5.9. Progress and cancellation with Esc in the console {.caption}

### Asynchronous file reading

The program creates 400 text files (40 000 words each) and counts the total number of words synchronously and asynchronously with different concurrency limits enforced by `SemaphoreSlim`.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

string folder = Path.Combine(Path.GetTempPath(), "words-demo");
string[] files = await CreateTextFilesAsync(folder, count: 400);

await MeasureAsync("Synchronous, sequential", () =>
    Task.FromResult(files.Sum(f => CountWords(File.ReadAllText(f)))));
foreach (int limit in new[] { 1, 4, 16, 64 })
{
    await MeasureAsync($"Asynchronous, up to {limit} at once",
        () => CountAllAsync(files, limit));
}

static async Task<long> CountAllAsync(string[] files, int limit)
{
    using SemaphoreSlim gate = new(limit);
    Task<long>[] tasks = files.Select(async file =>
    {
        await gate.WaitAsync();          // wait to enter
        try
        {
            string text = await File.ReadAllTextAsync(file);
            return CountWords(text);
        }
        finally
        {
            gate.Release();              // release a slot
        }
    }).ToArray();
    long[] counts = await Task.WhenAll(tasks);
    return counts.Sum();
}

static long CountWords(string text)
{
    long words = 0;
    bool inWord = false;
    foreach (char c in text)
    {
        bool letter = char.IsLetter(c) || c == '’';
        if (letter && !inWord) words++;
        inWord = letter;
    }
    return words;
}

static async Task MeasureAsync(string title, Func<Task<long>> run)
{
    await run();                                     // warmup
    double[] times = new double[5];
    long words = 0;
    for (int i = 0; i < times.Length; i++)
    {
        long start = Stopwatch.GetTimestamp();
        words = await run();
        times[i] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    }
    Array.Sort(times);
    Console.WriteLine(
        $"{title,-32} {words,12:N0} words {times[2],8:F1} ms");
}

static async Task<string[]> CreateTextFilesAsync(
    string folder, int count)
{
    string[] vocabulary =
        ["thread", "task", "core", "memory", "cache"];
    Directory.CreateDirectory(folder);
    string[] names = new string[count];
    for (int i = 0; i < count; i++)
    {
        names[i] = Path.Combine(folder, $"doc{i:D3}.txt");
        if (File.Exists(names[i])) continue;
        Random random = new(i);
        IEnumerable<string> words = Enumerable.Range(0, 40_000)
            .Select(_ => vocabulary[random.Next(vocabulary.Length)]);
        string text = string.Join(' ', words);
        await File.WriteAllTextAsync(names[i], text);
    }
    return names;
}
```

The lambda in `Select` is asynchronous, so `Select` immediately creates 400 tasks, but no more than `limit` tasks enter the critical section between `WaitAsync` and `Release` at once. The others wait without occupying threads. Output on an i9-11900KF (the files are already in the operating system cache):

```
Synchronous, sequential            16 000 000 words    578,5 ms
Asynchronous, up to 1 at once      16 000 000 words    916,9 ms
Asynchronous, up to 4 at once      16 000 000 words    249,7 ms
Asynchronous, up to 16 at once     16 000 000 words    153,0 ms
Asynchronous, up to 64 at once     16 000 000 words    170,6 ms
```

The results show two important points. First, asynchronous reading **one file at a time** (limit 1) is slower than synchronous reading: asynchronous I/O has overhead, while cached files are read almost instantly. Asynchrony does not speed up a single operation; it frees the thread. Second, concurrent processing achieved almost a fourfold speedup: after `await`, the continuations (word counting) run in parallel on different pool threads. More than 16 concurrent operations (the logical processor count) provide no further benefit.

### Turning an event into a task

`WaitForFileAsync` turns the `FileSystemWatcher.Created` event into a task using `TaskCompletionSource<string>` and supports timeouts and cancellation. A separate producer task simulates another program writing a file after 700 ms.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

string inbox = Path.Combine(Path.GetTempPath(), "inbox-demo");
Directory.CreateDirectory(inbox);
foreach (string old in Directory.GetFiles(inbox)) File.Delete(old);

Stopwatch clock = Stopwatch.StartNew();
void Log(string text) =>
    Console.WriteLine($"[{clock.ElapsedMilliseconds,5} ms] {text}");

// Another “program” creates a report after 700 ms.
Task producer = Task.Run(async () =>
{
    await Task.Delay(700);
    await File.WriteAllTextAsync(
        Path.Combine(inbox, "report.csv"), "id;sum\n1;250\n");
    Log("producer wrote report.csv");
});

Log("waiting for report.csv (timeout 2 s)");
string path = await WaitForFileAsync(inbox, "report.csv",
    TimeSpan.FromSeconds(2));
Log($"event received: {Path.GetFileName(path)}");
await producer;

try
{
    Log("waiting for missing.csv (timeout 1 s)");
    await WaitForFileAsync(inbox, "missing.csv",
        TimeSpan.FromSeconds(1));
}
catch (TimeoutException)
{
    Log("file did not appear: TimeoutException");
}

using CancellationTokenSource cts =
    new(TimeSpan.FromMilliseconds(300));
try
{
    Log("waiting for data.csv (cancellation after 300 ms)");
    await WaitForFileAsync(inbox, "data.csv",
        TimeSpan.FromSeconds(5), cts.Token);
}
catch (OperationCanceledException ex)
{
    Log($"wait canceled: {ex.GetType().Name}");
}

// FileSystemWatcher.Created event → Task<string> task.
static async Task<string> WaitForFileAsync(string folder,
    string name, TimeSpan timeout, CancellationToken token = default)
{
    TaskCompletionSource<string> tcs =
        new(TaskCreationOptions.RunContinuationsAsynchronously);
    using FileSystemWatcher watcher = new(folder, name);
    watcher.Created += (_, e) => tcs.TrySetResult(e.FullPath);
    watcher.Error += (_, e) => tcs.TrySetException(e.GetException());
    watcher.EnableRaisingEvents = true;

    string file = Path.Combine(folder, name);
    if (File.Exists(file)) return file;   // file already existed

    using CancellationTokenRegistration reg =
        token.Register(() => tcs.TrySetCanceled(token));
    return await tcs.Task.WaitAsync(timeout);
}
```

Enable the watcher **before** checking `File.Exists`: otherwise a file created between the check and subscription would be missed. The `Error` event puts the task in `Faulted`, token registration puts it in `Canceled`, and `WaitAsync(timeout)` limits the wait. The `using` statements dispose of the watcher and registration after any of the three scenarios completes. Output (milliseconds vary slightly between runs):

```
[    1 ms] waiting for report.csv (timeout 2 s)
[  711 ms] producer wrote report.csv
[  711 ms] event received: report.csv
[  711 ms] waiting for missing.csv (timeout 1 s)
[ 1716 ms] file did not appear: TimeoutException
[ 1717 ms] waiting for data.csv (cancellation after 300 ms)
[ 2024 ms] wait canceled: TaskCanceledException
```

## Common mistakes

Table 5.2. Common mistakes when working with tasks and async/await {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| a UI application “freezes” at `task.Result` | deadlock involving the synchronization context; use `await` throughout the call chain |
| `catch (IOException)` does not run after `Wait()` | `Wait` and `Result` throw `AggregateException`; catch it or use `await` |
| only one error is visible after `await Task.WhenAll` | `await` throws the first exception; read the rest from `whenAllTask.Exception.InnerExceptions` |
| cancellation does not work | the token was not passed to the operation, or the loop does not check `IsCancellationRequested` |
| the task is `Faulted` instead of `Canceled` | `OperationCanceledException` was thrown with a different token, or the token was not passed to `Task.Run` |
| `StartNew(async …)` “completes” immediately | it returns `Task<Task>`; use `Task.Run` or `Unwrap()` |
| `Progress<T>` messages appear out of order in the console | there is no synchronization context, so handlers run in the pool; implement a custom `IProgress<T>` |
| thousands of concurrent requests or open files | limit operations with `SemaphoreSlim.WaitAsync` |
