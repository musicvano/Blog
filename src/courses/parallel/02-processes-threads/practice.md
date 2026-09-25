---
title: "Practice"
description: "Topic 2. Processes and threads: worked examples"
outline: [2, 3]
sourceHash: "f707025e959d880acda75effa5d4cf604e403c23e5669cd5952aaaa5e48ac8ec"
---

# Practice

The examples were run in the *Release* configuration with .NET SDK 10.0.401 on an Intel Core i9-11900KF processor (8 cores, 16 logical processors) in Windows 11. Execution times will differ on other computers.

## Example 1. Worker processes

Create a console program that counts prime numbers in the range \[0; 10 000 000) using N child processes. The number of processes is specified by a command-line argument (4 by default). The same program, started with the arguments `--worker <from> <to>`, acts as a worker: it counts primes in the range and prints the result; for an invalid range, it reports an error to the error stream and returns code 2. The coordinator starts the workers, collects their output, checks their exit codes, and prints the total number of primes and the elapsed time.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// Worker mode: B1Processes --worker <from> <to>
if (args is ["--worker", var fromText, var toText])
{
    if (!int.TryParse(fromText, out int from)
        || !int.TryParse(toText, out int to) || from >= to)
    {
        Console.Error.WriteLine(
            $"Invalid range: {fromText}..{toText}");
        return 2;
    }

    Console.WriteLine(CountPrimes(from, to));
    return 0;
}

// Coordinator mode: B1Processes [process count]
int count = args.Length > 0 ? int.Parse(args[0]) : 4;
const int Limit = 10_000_000;
string exe = Environment.ProcessPath!;       // the same application

long start = Stopwatch.GetTimestamp();
List<(Process Proc, string Range)> children = [];
for (int i = 0; i < count; i++)
{
    int from = Limit / count * i;
    int to = i == count - 1 ? Limit : Limit / count * (i + 1);
    ProcessStartInfo info = new(exe)
    {
        RedirectStandardOutput = true,
        UseShellExecute = false,
    };
    info.ArgumentList.Add("--worker");
    info.ArgumentList.Add(from.ToString());
    info.ArgumentList.Add(to.ToString());
    children.Add((Process.Start(info)!, $"[{from}; {to})"));
}

long total = 0;
foreach (var (proc, range) in children)
{
    string output = proc.StandardOutput.ReadToEnd();
    proc.WaitForExit();
    if (proc.ExitCode != 0)
    {
        Console.Error.WriteLine(
            $"PID {proc.Id}: exit code {proc.ExitCode}");
        return 1;
    }
    int primes = int.Parse(output);
    total += primes;
    Console.WriteLine(
        $"PID {proc.Id,6} {range,-22} primes: {primes,7}");
    proc.Dispose();
}
double ms = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
Console.WriteLine($"Processes: {count}, total primes: {total}, " +
    $"time: {ms:F0} ms");
return 0;

static int CountPrimes(int from, int to)
{
    int count = 0;
    for (int n = Math.Max(from, 2); n < to; n++)
    {
        bool prime = true;
        for (int d = 2; (long)d * d <= n; d++)
            if (n % d == 0) { prime = false; break; }
        if (prime) count++;
    }
    return count;
}
```

The program has two modes, distinguished by the list pattern `["--worker", var fromText, var toText]`. The coordinator starts **the same** executable (`Environment.ProcessPath`), passing the range through `ArgumentList`, and redirects only standard output: worker error messages appear in the console immediately. All processes start before their results are read, so they run concurrently; `ReadToEnd` and `WaitForExit` wait for each process in turn. Results of running the program in PowerShell with 1 and 8 processes and starting a worker directly with an invalid range:

```
PS> .\B1Processes.exe 1
PID  38716 [0; 10000000)          primes:  664579
Processes: 1, total primes: 664579, time: 2330 ms
PS> .\B1Processes.exe 8
PID  48380 [0; 1250000)           primes:   96469
PID  48412 [1250000; 2500000)     primes:   86603
PID  48480 [2500000; 3750000)     primes:   83645
PID  48376 [3750000; 5000000)     primes:   81796
PID  39992 [5000000; 6250000)     primes:   80303
PID  48084 [6250000; 7500000)     primes:   79445
PID  39996 [7500000; 8750000)     primes:   78589
PID  48320 [8750000; 10000000)    primes:   77729
Processes: 8, total primes: 664579, time: 641 ms
PS> .\B1Processes.exe --worker 10 5; $LASTEXITCODE
Invalid range: 10..5
2
```

Eight processes achieved a speedup of 2330 / 641 ≈ 3.6. This is less than 8 because starting each .NET process costs tens of milliseconds, and the first parts of the range (small numbers) are checked faster than the last, so the load is unevenly distributed among the processes. The total number of primes matches the single-process result.

## Example 2. Stopping a thread with a flag and handling thread exceptions

Create a console program with two threads. The `Scanner` thread simulates checking disk blocks in a loop until the main thread requests it to stop after 300 ms; the main thread waits no longer than 2 s for it to finish. The `Parser` thread sums numbers stored as strings and must not crash the process when a string is invalid: the exception must be passed to the main thread and displayed.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

DiskMonitor monitor = new();

Thread scanner = new(monitor.Scan) { Name = "Scanner" };
Thread parser = new(() => monitor.Parse(["12", "7", "x5", "40"]))
{
    Name = "Parser",
};
scanner.Start();
parser.Start();

Thread.Sleep(300);                  // the main thread is “working”
monitor.RequestStop();              // stop request
Console.WriteLine("Main: stop request sent");

bool stopped = scanner.Join(TimeSpan.FromSeconds(2));
parser.Join();
Console.WriteLine($"Scanner stopped: {stopped}, " +
    $"blocks checked: {monitor.Blocks}");
Console.WriteLine($"Parser: sum {monitor.Sum}");
if (monitor.Error is { } error)
{
    Console.WriteLine($"Error in Parser: {error.GetType().Name}");
    Console.WriteLine($"  {error.Message}");
}

class DiskMonitor
{
    private volatile bool stopRequested;   // read by another thread

    public int Blocks { get; private set; }
    public int Sum { get; private set; }
    public Exception? Error { get; private set; }

    public void RequestStop() => stopRequested = true;

    public void Scan()
    {
        while (!stopRequested)             // cooperative stopping
        {
            Thread.Sleep(20);              // “checking a disk block”
            Blocks++;
        }
        Console.WriteLine($"{Thread.CurrentThread.Name}: stopping");
    }

    public void Parse(string[] items)
    {
        try
        {
            foreach (string item in items)
                Sum += int.Parse(item);
        }
        catch (Exception ex)   // the exception does not escape the thread
        {
            Error = ex;
        }
    }
}
```

The `stopRequested` flag is declared with the `volatile` modifier because the main thread changes it and the `Scanner` thread reads it. The thread finishes its current unit of work and exits the loop on its own, leaving the data consistent. `Join(TimeSpan)` returns `false` if the thread does not finish in time. The `Parser` thread catches `FormatException` and stores it in the `Error` property, which the main thread checks after `Join`; without `try`/`catch`, the exception would terminate the entire process. The number of blocks checked depends on the accuracy of the OS timer. Output:

```
Main: stop request sent
Scanner: stopping
Scanner stopped: True, blocks checked: 11
Parser: sum 19
Error in Parser: FormatException
  The input string 'x5' was not in a correct format.
```

## Example 3. Thread creation cost and the thread pool

Create a console program that performs 10 000 very short jobs (writing 1 to its own array element) in two ways: using a separate `Thread` for each job and using the thread pool. Print the total time, time per job, and how many times faster the pool is, and verify that all jobs were completed. Before measuring, warm up with 1 000 jobs.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Count = 10_000;
int[] results = new int[Count];

Measure("new threads", 1_000, results, UseThreads);  // warm-up
Measure("thread pool", 1_000, results, UsePool);
Console.WriteLine($"Jobs: {Count}");
Console.WriteLine("Method           Time, ms    Per job, μs");
double threads = Measure("new threads", Count, results, UseThreads);
double pool = Measure("thread pool", Count, results, UsePool);
Console.WriteLine($"Pool is {threads / pool:F1} times faster");
Console.WriteLine($"Threads in the pool: {ThreadPool.ThreadCount}");

static double Measure(string name, int count, int[] results,
    Action<int, int[]> run)
{
    Array.Clear(results);
    long start = Stopwatch.GetTimestamp();
    run(count, results);
    double ms = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    if (results.Take(count).Sum() != count)
        throw new InvalidOperationException("Not all jobs completed");
    if (count > 1_000)
        Console.WriteLine(
            $"{name,-15} {ms,9:F1} {ms * 1000 / count,15:F1}");
    return ms;
}

static void UseThreads(int count, int[] results)
{
    Thread[] threads = new Thread[count];
    for (int i = 0; i < count; i++)
    {
        int index = i;
        threads[i] = new Thread(() => results[index] = 1);
        threads[i].Start();
    }
    foreach (Thread thread in threads) thread.Join();
}

static void UsePool(int count, int[] results)
{
    using CountdownEvent done = new(count);
    for (int i = 0; i < count; i++)
    {
        ThreadPool.QueueUserWorkItem(index =>
        {
            results[index] = 1;
            done.Signal();
        }, i, preferLocal: false);
    }
    done.Wait();
}
```

The `Measure` method accepts the execution method as an `Action<int, int[]>` delegate, so both approaches are measured the same way. Checking the sum ensures that no job was skipped. A separate thread for each job costs about 55 μs (creating the stack, kernel structures, and managed object), while the pool performs a job in about 0.3 μs: 14 existing threads completed 10 000 jobs. Output:

```
Jobs: 10000
Method           Time, ms    Per job, μs
new threads         549,4            54,9
thread pool           3,1             0,3
Pool is 178,6 times faster
Threads in the pool: 14
```
