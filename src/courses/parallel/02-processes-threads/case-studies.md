---
title: "Examples and common mistakes"
description: "Topic 2. Processes and threads: Examples and common mistakes"
outline: [2, 3]
sourceHash: "2c8afde074e9cffebe151569cb8951ad193bd7701257e30ceada989fe223ee84"
---

# Examples and common mistakes

## Program examples

All examples were run in *Release* configuration with .NET SDK 10.0.401 on an Intel Core i9-11900KF processor (8 cores, 16 logical processors) on Windows 11. Execution times differ on other computers and even between runs, and lines printed by different threads may appear in a different order.

### Workers

The program creates four named threads with different “work durations,” shows thread states before `Start`, after `Start`, and after `Join`, and finally starts a background thread with an infinite loop.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Thread main = Thread.CurrentThread;
main.Name = "Main";
Console.WriteLine(
    $"{main.Name}: id={main.ManagedThreadId}, " +
    $"background={main.IsBackground}");

int[] delays = [400, 100, 300, 200];      // “work duration,” ms
string[] reports = new string[delays.Length];
Thread[] workers = new Thread[delays.Length];

for (int i = 0; i < workers.Length; i++)
{
    int index = i;                        // copy for the lambda
    workers[i] = new Thread(
        () => reports[index] = Work(delays[index]))
    {
        Name = $"Worker {i + 1}",
    };
}
Console.WriteLine($"Before Start: {workers[0].ThreadState}");

foreach (Thread worker in workers) worker.Start();
Console.WriteLine($"After Start: {workers[0].ThreadState}");

foreach (Thread worker in workers) worker.Join();  // wait
Console.WriteLine($"After Join: {workers[0].ThreadState}");
foreach (string report in reports) Console.WriteLine(report);

// A background thread does not keep the process alive: the infinite loop
// stops when the process exits.
Thread heartbeat = new(() =>
{
    while (true) Thread.Sleep(50);
})
{ Name = "Heartbeat", IsBackground = true };
heartbeat.Start();
Console.WriteLine(
    $"{heartbeat.Name}: background={heartbeat.IsBackground}");
Console.WriteLine("Main is exiting");

static string Work(int delayMs)
{
    Thread me = Thread.CurrentThread;
    Console.WriteLine($"  {me.Name} started (id={me.ManagedThreadId})");
    Thread.Sleep(delayMs);                // simulate work
    Console.WriteLine($"  {me.Name} finished");
    return $"{me.Name}: {delayMs} ms, pool={me.IsThreadPoolThread}";
}
```

The state immediately after `Start` depends on whether the first thread has already reached `Thread.Sleep`: it is `Running` or `WaitSleepJoin`. Each thread writes a report to its own element of the `reports` array, so the main thread reads the reports after `Join` without synchronization. The “started” and “finished” lines are interleaved: threads run simultaneously, and the thread with the shortest delay finishes first. The background `Heartbeat` thread does not prevent process termination — the program ends immediately after the last line of `Main`. If `IsBackground` were `false`, the process would never finish. Output:

```
Main: id=2, background=False
Before Start: Unstarted
After Start: Running
  Worker 1 started (id=4)
  Worker 2 started (id=5)
  Worker 4 started (id=7)
  Worker 3 started (id=6)
  Worker 2 finished
  Worker 4 finished
  Worker 3 finished
  Worker 1 finished
After Join: Stopped
Worker 1: 400 ms, pool=False
Worker 2: 100 ms, pool=False
Worker 3: 300 ms, pool=False
Worker 4: 200 ms, pool=False
Heartbeat: background=True
Main is exiting
```

### Summing an array in parts

The program fills an array of 100 million integers (fixed seed `Random(42)`), sums a function of the elements sequentially and on N threads for N = 1, 2, 4, …, 32, and prints the median of 7 runs, speedup, and efficiency.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Size = 100_000_000;
const int Runs = 7;
int[] data = new int[Size];
Random random = new(42);
for (int i = 0; i < Size; i++) data[i] = random.Next(1_000);

long expected = SumRange(data, 0, Size);  // sequential reference
SumParallel(data, Environment.ProcessorCount); // JIT warmup

Console.WriteLine($"Cores (logical): {Environment.ProcessorCount}");
Console.WriteLine("Threads Time, ms      Speedup    Efficiency");
double t1 = 0;
for (int n = 1; n <= Environment.ProcessorCount * 2; n *= 2)
{
    double time = Median(Runs, () =>
    {
        if (SumParallel(data, n) != expected)
            throw new InvalidOperationException("Incorrect sum");
    });
    if (n == 1) t1 = time;
    double s = t1 / time;
    Console.WriteLine($"{n,6} {time,8:F1} {s,12:F2} {s / n,13:F2}");
}

static long SumParallel(int[] data, int threadCount)
{
    long[] partial = new long[threadCount];   // one element per thread
    Thread[] threads = new Thread[threadCount];
    int chunk = data.Length / threadCount;
    for (int t = 0; t < threadCount; t++)
    {
        int index = t;
        int from = t * chunk;
        int to = t == threadCount - 1 ? data.Length : from + chunk;
        threads[t] = new Thread(
            () => partial[index] = SumRange(data, from, to));
        threads[t].Start();
    }
    foreach (Thread thread in threads) thread.Join();
    return partial.Sum();
}

static long SumRange(int[] data, int from, int to)
{
    long sum = 0;
    for (int i = from; i < to; i++)
    {
        int x = data[i];
        sum += (long)x * x % 1_000_003;       // a “heavier” operation
    }
    return sum;
}

static double Median(int runs, Action action)
{
    double[] times = new double[runs];
    for (int r = 0; r < runs; r++)
    {
        long start = Stopwatch.GetTimestamp();
        action();
        times[r] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    }
    Array.Sort(times);
    return times[runs / 2];
}
```

Each call to `SumParallel` creates fresh threads, so the measured time includes thread creation overhead. Each thread writes its sum to its own `partial` element, and the result is compared with the sequential reference. Output on the i9-11900KF:

```
Cores (logical): 16
Threads Time, ms      Speedup    Efficiency
     1    107,0         1,00          1,00
     2     55,2         1,94          0,97
     4     40,1         2,67          0,67
     8     21,9         4,88          0,61
    16     20,7         5,18          0,32
    32     18,5         5,79          0,18
```

Speedup increases up to 8 threads (the physical core count), although efficiency gradually drops: the loop performs simple operations on 400 MB of data, and memory bandwidth limits its speed. SMT logical processors (16 threads) add almost no speedup, and 32 threads on 16 logical processors achieve an efficiency of only 0.18.

### The thread pool

The program queues 100 jobs (summing a number’s divisors), waits for completion using `CountdownEvent`, and determines how many distinct pool threads performed the work.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

ThreadPool.GetMinThreads(out int minWorker, out int minIo);
ThreadPool.GetMaxThreads(out int maxWorker, out int maxIo);
Console.WriteLine($"Minimum: workers {minWorker}, I/O {minIo}");
Console.WriteLine($"Maximum: workers {maxWorker}, I/O {maxIo}");

const int Jobs = 100;
int[] threadIds = new int[Jobs];    // each job writes to its own element
long[] results = new long[Jobs];
using CountdownEvent done = new(Jobs);  // a ready-made waiting primitive

for (int i = 0; i < Jobs; i++)
{
    ThreadPool.QueueUserWorkItem(job =>
    {
        threadIds[job] = Environment.CurrentManagedThreadId;
        results[job] = SumOfDivisors(1_000_000 + job);
        done.Signal();                // “one more job completed”
    }, i, preferLocal: false);
}
done.Wait();                          // wait for all 100 jobs

Console.WriteLine($"Sum of results: {results.Sum()}");
Console.WriteLine($"Current pool threads: {ThreadPool.ThreadCount}");
Console.WriteLine(
    $"Completed jobs: {ThreadPool.CompletedWorkItemCount}");
var groups = threadIds.GroupBy(id => id)
    .OrderByDescending(g => g.Count()).ToList();
Console.WriteLine($"Distinct threads that ran jobs: {groups.Count}");
foreach (var g in groups.Take(5))
    Console.WriteLine($"  thread {g.Key,3}: {g.Count(),3} jobs");

static long SumOfDivisors(int n)
{
    long sum = 0;
    for (int d = 1; d <= n; d++)
        if (n % d == 0) sum += d;
    return sum;
}
```

The lambda uses strongly typed `int` state (the overload with `preferLocal`), so the job number does not need to be cast from `object`. Jobs write their thread IDs to their own elements of the `threadIds` array, and LINQ groups jobs by thread. Only 14 threads performed the hundred jobs: each pool thread executes jobs one after another. Output:

```
Minimum: workers 16, I/O 1
Maximum: workers 32767, I/O 1000
Sum of results: 164283553
Current pool threads: 15
Completed jobs: 100
Distinct threads that ran jobs: 14
  thread  14:  12 jobs
  thread  15:  12 jobs
  thread  16:  11 jobs
  thread  13:  10 jobs
  thread  11:   8 jobs
```

### Affinity and priority

The program counts primes below 3 million using 8 threads, restricting its own process with different affinity masks, and then lowers the process priority class.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

if (!OperatingSystem.IsWindows() && !OperatingSystem.IsLinux())
{
    Console.Error.WriteLine("Affinity: Windows and Linux only");
    return 1;
}

using Process self = Process.GetCurrentProcess();
nint allCores = self.ProcessorAffinity;
Console.WriteLine($"Default mask: {Mask(allCores)}");
Console.WriteLine($"Priority class: {self.PriorityClass}");

const int Threads = 8;
CountPrimes(Threads, 200_000);                  // JIT warmup

(string Name, nint Mask)[] configs =
[
    ("all CPUs", allCores),
    ("LP 0, 2", 0b101),
    ("LP 0, 1", 0b11),
    ("LP 0", 0b1),
];
foreach (var (name, mask) in configs)
{
    self.ProcessorAffinity = mask;              // restrict the process
    long start = Stopwatch.GetTimestamp();
    int primes = CountPrimes(Threads, 3_000_000);
    double ms = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    Console.WriteLine(
        $"{name,-8} {Mask(mask),17} {ms,6:F0} ms  primes: {primes}");
}

self.ProcessorAffinity = allCores;              // restore
self.PriorityClass = ProcessPriorityClass.BelowNormal;
self.Refresh();
Console.WriteLine($"New priority class: {self.PriorityClass}");
return 0;

static string Mask(nint mask) =>
    Convert.ToString((long)mask, 2).PadLeft(16, '0');

static int CountPrimes(int threadCount, int limit)
{
    int[] counts = new int[threadCount];
    Thread[] threads = new Thread[threadCount];
    for (int t = 0; t < threadCount; t++)
    {
        int index = t;
        threads[t] = new Thread(() =>
        {
            // Thread t checks numbers of the form t + k·threadCount.
            for (int n = index; n < limit; n += threadCount)
                if (IsPrime(n)) counts[index]++;
        });
        threads[t].Start();
    }
    foreach (Thread thread in threads) thread.Join();
    return counts.Sum();
}

static bool IsPrime(int n)
{
    if (n < 2) return false;
    for (int d = 2; (long)d * d <= n; d++)
        if (n % d == 0) return false;
    return true;
}
```

Thread `t` checks the numbers `t`, `t + 8`, `t + 16`, …, so larger numbers (which take longer to test) are evenly distributed among threads. `ProcessorAffinity` is supported only on Windows and Linux, so the program checks the OS (otherwise analyzer CA1416 warns about platform dependence). Output (LP means logical processor):

```
Default mask: 1111111111111111
Priority class: Normal
all CPUs  1111111111111111    139 ms  primes: 216816
LP 0, 2   0000000000000101    233 ms  primes: 216816
LP 0, 1   0000000000000011    417 ms  primes: 216816
LP 0      0000000000000001    450 ms  primes: 216816
New priority class: BelowNormal
```

Eight threads on logical processors 0 and 2 (two different physical cores) run almost twice as fast as on processors 0 and 1: on the i9-11900KF, those are two logical processors on one physical core, giving almost the same time as a single processor. The prime count is identical in every configuration.

## Common mistakes

Table 2.3. Common mistakes when working with processes and threads {.caption}

| **Problem** | **Cause and solution** |
| --- | --- |
| the program does not exit after `Main` | a foreground (*foreground*) thread is still running; stop it with a flag or make it a background thread |
| all threads created in a `for` loop process the same part | the lambda captured the loop variable; copy `i` into a local variable inside the loop body |
| `try` around `Start` does not catch an exception, and the process crashes | the exception occurred on another thread; catch it in the thread method and store it for the main thread |
| `ThreadStateException` on `Start` | the thread has already been started; a `Thread` object can be started only once |
| `PlatformNotSupportedException` in `Thread.Abort` | forced termination is unsupported; use a flag or `CancellationToken` |
| speedup is lower than expected, or the parallel version is slower | too little work, memory limits, SMT, *Debug* configuration; measure in *Release* after warmup |
| pool jobs take a long time to start | blocking jobs cause thread pool starvation; do not block pool threads |
| a stuck `while (!done) { }` loop uses 100% of a core | busy waiting; use `Join` or synchronization primitives |
| a child process “hangs” while its output is being read | the second redirected stream’s buffer is full; read asynchronously or do not redirect `StandardError` |
