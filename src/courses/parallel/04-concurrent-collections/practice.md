---
title: "Practice"
description: "Topic 4. Thread-safe collections: worked examples"
outline: [2, 3]
sourceHash: "9f4001b0185ead216401eeabf96ad9c793d090d2afae6213c9606915281862ce"
---

# Practice

## Example 1. Caching expensive computations

Create a program in which eight threads simultaneously request the number of primes no greater than 2, 4, and 6 million from a shared `ConcurrentDictionary<TKey, TValue>` cache. Compare the expensive function call count and execution time for `GetOrAdd` with a value factory and for a dictionary storing `Lazy<int>`.

```cs
using System.Collections.Concurrent;
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int ThreadCount = 8;
int[] limits = [2_000_000, 4_000_000, 6_000_000];
int calls = 0;

// Expensive function: count primes no greater than n.
int CountPrimes(int n)
{
    Interlocked.Increment(ref calls);
    int count = 0;
    for (int k = 2; k <= n; k++)
    {
        bool prime = true;
        for (int d = 2; d * d <= k; d++)
        {
            if (k % d == 0) { prime = false; break; }
        }
        if (prime) count++;
    }
    return count;
}

// 1. The GetOrAdd factory may run several times per key.
ConcurrentDictionary<int, int> plain = new();
Measure("GetOrAdd(key, factory)", () =>
{
    foreach (int n in limits)
    {
        plain.GetOrAdd(n, CountPrimes);
    }
});

// 2. The dictionary stores Lazy<int>: only one Lazy object can enter
// the dictionary, so the computation runs once.
ConcurrentDictionary<int, Lazy<int>> lazy = new();
Measure("GetOrAdd + Lazy<int>", () =>
{
    foreach (int n in limits)
    {
        _ = lazy.GetOrAdd(n, key => new Lazy<int>(
            () => CountPrimes(key))).Value;
    }
});

foreach (int n in limits)
{
    Console.WriteLine(
        $"π({n:N0}) = {plain[n]:N0} = {lazy[n].Value:N0}");
}

// Runs the same work in several threads simultaneously.
void Measure(string title, Action work)
{
    calls = 0;
    using Barrier start = new(ThreadCount);
    Thread[] threads = new Thread[ThreadCount];
    for (int i = 0; i < ThreadCount; i++)
    {
        threads[i] = new Thread(() =>
        {
            start.SignalAndWait();   // all threads start together
            work();
        });
        threads[i].Start();
    }
    long t0 = Stopwatch.GetTimestamp();
    foreach (Thread t in threads) t.Join();
    double ms = Stopwatch.GetElapsedTime(t0).TotalMilliseconds;
    Console.WriteLine(
        $"{title,-24} factory calls: {calls,2}, time {ms:F0} ms");
}
```

The `Barrier` class makes all eight threads start together. In the first version, the factory runs outside the dictionary lock, so each thread computes each value itself: 8 × 3 = 24 calls, only one result per key entering the dictionary. In the second version, `GetOrAdd` returns the same `Lazy<int>` object to all threads, and `Value` computes the result once while the others wait. CPU time is reduced eightfold. Output (the first line may show fewer than 24 calls if a thread starts late):

```
GetOrAdd(key, factory)   factory calls: 24, time 2919 ms
GetOrAdd + Lazy<int>     factory calls:  3, time 1940 ms
π(2 000 000) = 148 933 = 148 933
π(4 000 000) = 283 146 = 283 146
π(6 000 000) = 412 849 = 412 849
```

## Example 2. An immutable settings list

Create a program in which four writer threads each add 5 000 settings to a shared immutable `ImmutableList<Setting>`, while a reader thread concurrently verifies that every list snapshot is intact. Show that ordinary assignment loses updates but `ImmutableInterlocked.Update` does not, and that a snapshot taken before the changes remains unchanged.

```cs
using System.Collections.Immutable;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Writers = 4;
const int PerWriter = 5_000;

ImmutableList<Setting> settings = [new("theme", "light")];
ImmutableList<Setting> snapshot = settings;    // state snapshot

// 1. Incorrect: non-atomic read–modify–write.
ImmutableList<Setting> naive = [];
RunWriters(w =>
{
    for (int i = 0; i < PerWriter; i++)
    {
        naive = naive.Add(new($"w{w}.key{i}", "1")); // race condition
    }
});
int added = Writers * PerWriter;
Console.WriteLine($"No CAS:  {naive.Count,6:N0} of {added:N0}");

// 2. ImmutableInterlocked.Update repeats the transformation until
// CompareExchange replaces exactly the list that was read.
int attempts = 0;
int readerChecks = 0;
bool stop = false;
Thread reader = new(() =>
{
    int last = 0;
    while (!Volatile.Read(ref stop))
    {
        ImmutableList<Setting> current = settings;  // snapshot
        int count = current.Count;
        if (count < last || current[count - 1] is null)
        {
            throw new InvalidOperationException("Corrupted state");
        }
        last = count;
        readerChecks++;
    }
});
reader.Start();

RunWriters(w =>
{
    for (int i = 0; i < PerWriter; i++)
    {
        Setting item = new($"w{w}.key{i}", i.ToString());
        ImmutableInterlocked.Update(ref settings, list =>
        {
            Interlocked.Increment(ref attempts);
            return list.Add(item);
        });
    }
});
Volatile.Write(ref stop, true);
reader.Join();

Console.WriteLine(
    $"Update: {settings.Count - 1,6:N0} of {added:N0}, " +
    $"transformation retries: {attempts - added:N0}");
Console.WriteLine($"Reader checks: {readerChecks:N0}");
Console.WriteLine($"Snapshot before changes: {snapshot.Count} item " +
    $"({snapshot[0].Name} = {snapshot[0].Value})");

static void RunWriters(Action<int> body)
{
    Thread[] threads = new Thread[Writers];
    for (int w = 0; w < Writers; w++)
    {
        int id = w;
        threads[w] = new Thread(() => body(id));
        threads[w].Start();
    }
    foreach (Thread t in threads) t.Join();
}

record Setting(string Name, string Value);
```

The statement `naive = naive.Add(…)` reads the field, creates a new list, and writes the reference; two threads that read the same version write lists each missing the other thread's element, so most updates are lost. `ImmutableInterlocked.Update` writes a new list through CAS only if the field still references the version read, repeating the lambda on conflict; the `attempts` counter shows how many transformations were wasted: with frequent writes, retries outnumber additions. The reader works without locks and never sees a partially modified list, while `snapshot` retains the initial state. Numbers vary between runs except in the “Snapshot” line. Output:

```
No CAS:   7 558 of 20 000
Update: 20 000 of 20 000, transformation retries: 42 226
Reader checks: 773 771
Snapshot before changes: 1 item (theme = light)
```

## Example 3. A lock-free stack

Create a lock-free Treiber stack using `Interlocked.CompareExchange` and test it under load: eight threads simultaneously each push one million numbers and pop elements. Verify that every pushed element is popped exactly once, and compare the time with `ConcurrentStack<T>`.

```cs
using System.Collections.Concurrent;
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int ThreadCount = 8;
const int PerThread = 1_000_000;

Console.WriteLine($"Threads: {ThreadCount}, Push and Pop operations: " +
    $"{ThreadCount * PerThread:N0}");
Test("TreiberStack (CAS)", new TreiberStack<long>());
Test("ConcurrentStack", new ConcurrentStackAdapter<long>());

// Workload: all threads push and pop numbers concurrently.
static void Test(string title, IStack<long> stack)
{
    long pushedSum = 0, poppedSum = 0;
    int popped = 0;
    long start = Stopwatch.GetTimestamp();
    Thread[] threads = new Thread[ThreadCount];
    for (int t = 0; t < ThreadCount; t++)
    {
        int id = t;
        threads[t] = new Thread(() =>
        {
            long localPushed = 0, localPopped = 0;
            int localCount = 0;
            for (int i = 0; i < PerThread; i++)
            {
                long value = (long)id * PerThread + i;
                stack.Push(value);
                localPushed += value;
                if (i % 2 == 1)      // two Pops every other iteration
                {
                    for (int k = 0; k < 2; k++)
                    {
                        if (stack.TryPop(out long v))
                        {
                            localPopped += v;
                            localCount++;
                        }
                    }
                }
            }
            Interlocked.Add(ref pushedSum, localPushed);
            Interlocked.Add(ref poppedSum, localPopped);
            Interlocked.Add(ref popped, localCount);
        });
        threads[t].Start();
    }
    foreach (Thread thread in threads) thread.Join();
    // Pop the remaining elements in one thread.
    while (stack.TryPop(out long rest))
    {
        poppedSum += rest;
        popped++;
    }
    double ms = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    bool ok = popped == ThreadCount * PerThread
              && poppedSum == pushedSum;
    Console.WriteLine($"{title,-20} {ms,6:F0} ms, check: " +
        (ok ? "no losses or duplicates" : "ERROR"));
}

interface IStack<T>
{
    void Push(T item);
    bool TryPop(out T item);
}

// A lock-free Treiber stack.
sealed class TreiberStack<T> : IStack<T>
{
    private sealed class Node(T value, Node? next)
    {
        public readonly T Value = value;
        public Node? Next = next;
    }

    private Node? head;

    public void Push(T item)
    {
        Node node = new(item, null);
        SpinWait spin = new();
        while (true)
        {
            Node? current = head;
            node.Next = current;
            // Replace head only if no one has changed it.
            if (Interlocked.CompareExchange(
                    ref head, node, current) == current)
            {
                return;
            }
            spin.SpinOnce();             // conflict: retry
        }
    }

    public bool TryPop(out T item)
    {
        SpinWait spin = new();
        while (true)
        {
            Node? current = head;
            if (current is null)
            {
                item = default!;
                return false;
            }
            if (Interlocked.CompareExchange(
                    ref head, current.Next, current) == current)
            {
                item = current.Value;
                return true;
            }
            spin.SpinOnce();
        }
    }
}

// An adapter from ConcurrentStack<T> to IStack<T>.
sealed class ConcurrentStackAdapter<T> : IStack<T>
{
    private readonly ConcurrentStack<T> items = new();
    public void Push(T item) => items.Push(item);
    public bool TryPop(out T item) => items.TryPop(out item!);
}
```

The `IStack<T>` interface lets one `Test` method test both implementations. Threads push unique numbers, call `TryPop` twice every other iteration, accumulate sums in local variables (avoiding false sharing), and add them to shared sums through `Interlocked.Add`. If the sums and counts of pushed and popped numbers match, no element was lost or popped twice. `TryPop` reads `current.Next` without a lock: nodes are not reused, and the garbage collector does not reclaim a node still referenced by a thread, so there is no ABA problem. `ConcurrentStack<T>` has additional capabilities (`PushRange`, `TryPopRange`, snapshot enumeration), so the comparison applies only to this workload. Output (times vary between runs):

```
Threads: 8, Push and Pop operations: 8 000 000
TreiberStack (CAS)      631 ms, check: no losses or duplicates
ConcurrentStack        1342 ms, check: no losses or duplicates
```
