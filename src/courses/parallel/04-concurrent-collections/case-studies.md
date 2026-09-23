---
title: "Examples and common mistakes"
description: "Topic 4. Thread-safe collections: examples and common mistakes"
outline: [2, 3]
sourceHash: "0060b4b02deb2d2d5dc9b031ca8d5a8e5b805b7121ce619582a1e919ac1512f0"
---

# Examples and common mistakes

## Program examples

The example execution times were measured on an Intel Core i9-11900KF (8 cores, 16 logical processors) in Release; they will differ on other computers.

### Word frequencies

The program counts word frequencies in two million words in three ways: sequentially with an ordinary dictionary (the reference), using four threads with a shared `Dictionary<TKey, TValue>` (incorrect), and using four threads with `ConcurrentDictionary<TKey, TValue>`.

```cs
using System.Collections.Concurrent;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int WordCount = 2_000_000;
const int ThreadCount = 4;

// Deterministic “text”: vocabulary words in pseudorandom order.
string[] vocabulary =
[
    "thread", "data", "queue", "core", "cache", "channel",
    "task", "memory", "process", "locking",
];
Random random = new(42);
string[] words = new string[WordCount];
for (int i = 0; i < words.Length; i++)
{
    // Square the random number: earlier words occur more often.
    double r = random.NextDouble();
    words[i] = vocabulary[(int)(r * r * vocabulary.Length)];
}

// 1. Reference: sequential counting with an ordinary dictionary.
Dictionary<string, int> expected = [];
foreach (string w in words)
{
    expected[w] = expected.GetValueOrDefault(w) + 1;
}

// 2. Incorrect: a shared Dictionary in multiple threads.
Dictionary<string, int> unsafeCounts = [];
int failures = 0;
RunInParallel((from, to) =>
{
    for (int i = from; i < to; i++)
    {
        try
        {
            string w = words[i];
            unsafeCounts[w] = unsafeCounts.GetValueOrDefault(w) + 1;
        }
        catch (Exception)
        {
            Interlocked.Increment(ref failures);
        }
    }
});
Console.WriteLine($"Dictionary: words {unsafeCounts.Values.Sum():N0}" +
    $" of {WordCount:N0}, exceptions {failures}");

// 3. ConcurrentDictionary: atomic addition or update.
ConcurrentDictionary<string, int> counts = new();
RunInParallel((from, to) =>
{
    for (int i = from; i < to; i++)
    {
        counts.AddOrUpdate(words[i], 1, (_, old) => old + 1);
    }
});
bool same = expected.All(p => counts[p.Key] == p.Value);
Console.WriteLine($"ConcurrentDictionary: words " +
    $"{counts.Values.Sum():N0}, matches reference: {same}");
Console.WriteLine($"“thread”: {counts["thread"]:N0}, " +
    $"“cache”: {counts["cache"]:N0}");

// Divides the array into equal parts and processes each in a separate thread.
static void RunInParallel(Action<int, int> body)
{
    Thread[] threads = new Thread[ThreadCount];
    int chunk = WordCount / ThreadCount;
    for (int t = 0; t < ThreadCount; t++)
    {
        int from = t * chunk;
        int to = t == ThreadCount - 1 ? WordCount : from + chunk;
        threads[t] = new Thread(() => body(from, to));
        threads[t].Start();
    }
    foreach (Thread thread in threads) thread.Join();
}
```

The `Random(42)` seed makes the “text” identical on every run, so reference frequencies remain unchanged. In the second method, “read a value – write value + 1” is not atomic, and the dictionary's internal state becomes corrupted: words are lost and exceptions sometimes occur. The “Dictionary” line differs on every run (in one trial, only 736 032 words survived and over a million exceptions occurred), and some runs may even hang. `AddOrUpdate` updates the counter atomically, producing the reference result. Output from one run:

```
Dictionary: words 1 202 975 of 2 000 000, exceptions 0
ConcurrentDictionary: words 2 000 000, matches reference: True
“thread”: 632 691, “cache”: 149 284
```

### Order queue

Two producers (a website and a mobile app) add orders to a bounded `BlockingCollection<T>` with 4 slots, while three “cook” consumers process them.

```cs
using System.Collections.Concurrent;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// Bounded queue: no more than 4 orders at once.
using BlockingCollection<Order> queue = new(boundedCapacity: 4);

// Two producers: a website and mobile app, 6 orders each.
Thread[] producers =
[
    new(() => Produce("Website", 1, 6, delayMs: 5)),
    new(() => Produce("App", 101, 6, delayMs: 8)),
];
// Three consumers: cooks who process orders more slowly.
int[] processed = new int[3];
decimal[] revenue = new decimal[3];
Thread[] consumers = new Thread[3];
for (int c = 0; c < consumers.Length; c++)
{
    int id = c;
    consumers[c] = new Thread(() => Consume(id));
}

foreach (Thread t in consumers) t.Start();
foreach (Thread t in producers) t.Start();

foreach (Thread t in producers) t.Join();
queue.CompleteAdding();              // no more orders will arrive
Console.WriteLine("Producers finished");
foreach (Thread t in consumers) t.Join();

Console.WriteLine($"Processed: {processed.Sum()} orders " +
    $"totaling {revenue.Sum():N2} UAH");

void Produce(string source, int firstId, int count, int delayMs)
{
    for (int i = 0; i < count; i++)
    {
        Order order = new(firstId + i, source, 100m + 25m * i);
        queue.Add(order);            // blocks if the queue is full
        Thread.Sleep(delayMs);
    }
}

void Consume(int id)
{
    // The loop ends after CompleteAdding and draining the queue.
    foreach (Order order in queue.GetConsumingEnumerable())
    {
        Thread.Sleep(30);            // cooking
        processed[id]++;
        revenue[id] += order.Amount;
        Console.WriteLine(
            $"  Cook {id + 1}: №{order.Id,-3} ({order.Source})");
    }
    Console.WriteLine($"Cook {id + 1} finished: {processed[id]}");
}

record Order(int Id, string Source, decimal Amount);
```

Producers add orders every 5 and 8 ms, while a cook takes 30 ms to prepare an order, so the queue quickly fills and `Add` blocks producers — this is backpressure. Each consumer writes only to its own elements of `processed` and `revenue`, so no locks are needed; totals are read after `Join`. After `CompleteAdding`, the `GetConsumingEnumerable` loops drain the remaining items and finish. Line order varies between runs, but the totals do not. Output from one run (abridged):

```
  Cook 3: №101 (App)
  Cook 2: №1   (Website)
  Cook 1: №2   (Website)
  Cook 2: №3   (Website)
…
Producers finished
  Cook 1: №5   (Website)
  Cook 2: №105 (App)
  Cook 3: №106 (App)
Cook 3 finished: 4
Cook 2 finished: 4
  Cook 1: №6   (Website)
Cook 1 finished: 4
Processed: 12 orders totaling 1 950,00 UAH
```

### Log pipeline

A three-stage pipeline processes 100 000 web server log lines: a reader writes lines to a bounded channel, two parsers convert them to `LogRecord` entries, and an aggregator counts responses by status code and calculates the average response time.

```cs
using System.Threading.Channels;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int LineCount = 100_000;
BoundedChannelOptions options = new(50)
{
    FullMode = BoundedChannelFullMode.Wait,   // backpressure
};
Channel<string> lines = Channel.CreateBounded<string>(options);
Channel<LogRecord> records =
    Channel.CreateBounded<LogRecord>(options);

// Stage 1: read the log (lines are generated deterministically).
Task reader = Task.Run(async () =>
{
    string[] paths = ["/", "/api/orders", "/api/users", "/login"];
    int[] codes = [200, 200, 200, 201, 404, 500];
    for (int i = 0; i < LineCount; i++)
    {
        string line = $"{i} GET {paths[i % paths.Length]} " +
                      $"{codes[i * 7 % codes.Length]} {i % 900 + 5}";
        if (i % 1000 == 999) line = "corrupted line";
        await lines.Writer.WriteAsync(line);   // waits if full
    }
    lines.Writer.Complete();          // no more lines will arrive
});

// Stage 2: two parsers read from one channel.
int badLines = 0;
Task[] parsers = new Task[2];
for (int p = 0; p < parsers.Length; p++)
{
    parsers[p] = Task.Run(async () =>
    {
        await foreach (string line in lines.Reader.ReadAllAsync())
        {
            string[] parts = line.Split(' ');
            if (parts.Length == 5
                && int.TryParse(parts[3], out int status)
                && int.TryParse(parts[4], out int ms))
            {
                await records.Writer.WriteAsync(
                    new LogRecord(parts[2], status, ms));
            }
            else
            {
                Interlocked.Increment(ref badLines);
            }
        }
    });
}
// The second channel closes when both parsers finish.
Task closeRecords = Task.Run(async () =>
{
    await Task.WhenAll(parsers);
    records.Writer.Complete();
});

// Stage 3: aggregation in one thread; no locks needed.
SortedDictionary<int, int> byStatus = [];
long totalMs = 0;
int count = 0;
await foreach (LogRecord r in records.Reader.ReadAllAsync())
{
    byStatus[r.Status] = byStatus.GetValueOrDefault(r.Status) + 1;
    totalMs += r.Milliseconds;
    count++;
}
await Task.WhenAll(reader, closeRecords);

Console.WriteLine(
    $"Records: {count:N0}, corrupted lines: {badLines}");
foreach (var (status, n) in byStatus)
{
    double share = (double)n / count;
    Console.WriteLine($"  {status}: {n,7:N0} ({share,6:P1})");
}
double average = (double)totalMs / count;
Console.WriteLine($"Average response time: {average:F1} ms");

record LogRecord(string Path, int Status, int Milliseconds);
```

Both channels have a capacity of 50, so no more than a hundred lines and records are in memory at once, regardless of the log's length. The reader closes the first channel when there are no more lines; a separate task closes the second after **both** parsers finish: closing it after the first parser would cause `ChannelClosedException` in the second. The aggregator is the sole consumer of the second channel, so its ordinary `SortedDictionary<TKey, TValue>` is safe. Every thousandth line is deliberately corrupted, and the parsers count these lines using `Interlocked.Increment`. Output:

```
Records: 99 900, corrupted lines: 100
  200:  49 968 ( 50,0%)
  201:  16 633 ( 16,6%)
  404:  16 666 ( 16,7%)
  500:  16 633 ( 16,6%)
Average response time: 454,1 ms
```

### False sharing

The program counts even numbers in an array of 100 million pseudorandom numbers using 1, 2, 4, and 8 threads in three ways: counters in a shared `long[]` array, local variables, and padded structures. Each method is warmed up, and the median of seven runs is used.

```cs
using System.Diagnostics;
using System.Runtime.InteropServices;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Size = 100_000_000;
const int Runs = 7;
int[] threadCounts = [1, 2, 4, 8];

// Data: 100 million pseudorandom numbers (fixed seed).
int[] data = new int[Size];
Random random = new(42);
for (int i = 0; i < data.Length; i++) data[i] = random.Next();
int expected = data.Count(x => x % 2 == 0);
Console.WriteLine($"Even numbers: {expected:N0}");
Console.WriteLine(
    "Threads | Shared array   | Local variable  | Padding");

foreach (int p in threadCounts)
{
    double shared = Median(() => SharedArray(data, p));
    double local = Median(() => LocalVariable(data, p));
    double padded = Median(() => PaddedStruct(data, p));
    Console.WriteLine(
        $"{p,7} | {shared,11:F0} ms | {local,12:F0} ms |" +
        $" {padded,8:F0} ms");
}

// Thread counters are adjacent elements of one long[] array.
static long SharedArray(int[] data, int threads)
{
    long[] counters = new long[threads];
    Run(data.Length, threads, (i, from, to) =>
    {
        for (int j = from; j < to; j++)
        {
            if (data[j] % 2 == 0) counters[i]++;  // shared line
        }
    });
    return counters.Sum();
}

// Each thread counts in a local variable and writes the result once.
static long LocalVariable(int[] data, int threads)
{
    long[] counters = new long[threads];
    Run(data.Length, threads, (i, from, to) =>
    {
        long count = 0;
        for (int j = from; j < to; j++)
        {
            if (data[j] % 2 == 0) count++;
        }
        counters[i] = count;
    });
    return counters.Sum();
}

// Counters in 128-byte structures occupy different cache lines.
static long PaddedStruct(int[] data, int threads)
{
    PaddedCounter[] counters = new PaddedCounter[threads];
    Run(data.Length, threads, (i, from, to) =>
    {
        for (int j = from; j < to; j++)
        {
            if (data[j] % 2 == 0) counters[i].Value++;
        }
    });
    return counters.Sum(c => c.Value);
}

// Divides indices 0..length into parts and starts threads.
static void Run(int length, int threads, Action<int, int, int> body)
{
    Thread[] workers = new Thread[threads];
    int chunk = length / threads;
    for (int i = 0; i < threads; i++)
    {
        int index = i;
        int from = i * chunk;
        int to = i == threads - 1 ? length : from + chunk;
        workers[i] = new Thread(() => body(index, from, to));
        workers[i].Start();
    }
    foreach (Thread t in workers) t.Join();
}

// Warm-up and the median of several runs.
double Median(Func<long> action)
{
    action();
    double[] times = new double[Runs];
    for (int r = 0; r < Runs; r++)
    {
        long start = Stopwatch.GetTimestamp();
        long result = action();
        times[r] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
        if (result != expected) throw new InvalidOperationException();
    }
    Array.Sort(times);
    return times[Runs / 2];
}

// Size 128 bytes: neighboring counters do not share a cache line.
[StructLayout(LayoutKind.Sequential, Size = 128)]
struct PaddedCounter
{
    public long Value;
}
```

All three methods do the same work and produce the same result, verified by `Median`. With one thread, their times are nearly equal. With the shared array, eight threads achieve only 363 / 221 ≈ 1.6 speedup, and times for 2, 4, and 8 threads are nearly identical: every `counters[i]++` invalidates the cache line in other cores. Local variables achieve 342 / 54 ≈ 6.3 speedup, while padded structures achieve 348 / 74 ≈ 4.7: false sharing is absent, but each increment still writes to memory. Results on the i9-11900KF (numbers vary by 10–20% between runs):

```
Even numbers: 49 996 376
Threads | Shared array   | Local variable  | Padding
      1 |         363 ms |          342 ms |      348 ms
      2 |         218 ms |          170 ms |      194 ms
      4 |         259 ms |           89 ms |      122 ms
      8 |         221 ms |           54 ms |       74 ms
```

## Common mistakes

Table 4.4. Common mistakes when using thread-safe collections {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| Lost items, `InvalidOperationException`, or hangs when writing to `List<T>` or `Dictionary<TKey, TValue>` | Ordinary collections are not thread-safe; use a concurrent collection, locking, or local collections followed by merging |
| `if (dict.ContainsKey(k)) …` or `if (queue.Count > 0) …` produces an incorrect result | Compound check-then-act operation; use atomic `TryAdd`, `GetOrAdd`, or `TryDequeue` |
| A `GetOrAdd` factory or `AddOrUpdate` function runs several times | Delegates execute outside locks and may be repeated; store `Lazy<T>` and keep update functions pure |
| `settings = settings.Add(x)` loses updates across threads | Reference replacement is not atomic; use `ImmutableInterlocked.Update` |
| Consumers never finish, or a producer receives `InvalidOperationException` or `ChannelClosedException` | `CompleteAdding()` / `Writer.Complete()` was not called or was called before all producers finished; close after all producers, including on exceptions (`try/finally`) |
| Memory grows while the producer is faster than the consumer | Unbounded queue; limit capacity (`boundedCapacity`, `CreateBounded`) |
| Speedup is far below expectations; time does not decrease with more threads | False sharing; accumulate in local variables, pad structures, and measure in Release with warm-up and the median or BenchmarkDotNet |
