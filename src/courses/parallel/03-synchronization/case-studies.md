---
title: "Examples and common mistakes"
description: "Topic 3. Thread synchronization: examples and common mistakes"
outline: [2, 3]
sourceHash: "5b0e81a077e3ad43e3ef17e5f118ed8b47d312dd0ae3af18e9260ce252bd8f66"
---

# Examples and common mistakes

## Program examples

All examples are .NET 10 console applications (in Rider: *File → New Solution… → Console*). Times were measured in the *Release* configuration on an Intel Core i9-11900KF.

### Visitor counter

A website records 8 000 000 visits handled by 1 to 16 threads. The program compares five ways to increment a shared counter: no synchronization, `Interlocked`, `lock` with an object, `lock` with `Lock`, and a thread-local counter. Each combination includes warm-up and five measurements, with the median printed.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Total = 8_000_000;     // visits across all threads
int[] threadCounts = [1, 2, 4, 8, 16];

long unsafeCount = 0, atomicCount = 0, monitorCount = 0,
    lockCount = 0, localCount = 0;
object monitorGate = new();
Lock gate = new();

// Method: name, thread work (n visits), read, reset.
(string Name, Action<int> Work, Func<long> Read, Action Reset)[]
    methods =
[
    ("unsynchronized", n =>
        { for (int i = 0; i < n; i++) unsafeCount++; },
        () => unsafeCount, () => unsafeCount = 0),
    ("Interlocked", n =>
        { for (int i = 0; i < n; i++)
            Interlocked.Increment(ref atomicCount); },
        () => atomicCount, () => atomicCount = 0),
    ("lock(object)", n =>
        { for (int i = 0; i < n; i++)
            lock (monitorGate) monitorCount++; },
        () => monitorCount, () => monitorCount = 0),
    ("lock(Lock)", n =>
        { for (int i = 0; i < n; i++)
            lock (gate) lockCount++; },
        () => lockCount, () => lockCount = 0),
    ("local counter", n =>
        {
            long local = 0;                 // no shared state
            for (int i = 0; i < n; i++) local++;
            Interlocked.Add(ref localCount, local);
        },
        () => localCount, () => localCount = 0),
];

Console.WriteLine($"Processors: {Environment.ProcessorCount}, " +
    $"visits: {Total:N0}");
Console.WriteLine(
    $"{"Method",-20}{"Threads",7}{"Result",12}{"Time, ms",9}");
foreach (var m in methods)
{
    foreach (int p in threadCounts)
    {
        Run(m.Work, p);                     // JIT warm-up
        double[] times = new double[5];
        long result = 0;
        for (int r = 0; r < times.Length; r++)
        {
            m.Reset();
            times[r] = Run(m.Work, p);
            result = m.Read();
        }
        Array.Sort(times);                  // median of 5 runs
        Console.WriteLine(
            $"{m.Name,-20}{p,7}{result,12:N0}{times[2],9:F1}");
    }
}

// Starts p threads, each handling Total / p visits.
static double Run(Action<int> work, int p)
{
    var threads = new Thread[p];
    for (int t = 0; t < p; t++)
        threads[t] = new Thread(() => work(Total / p));
    var sw = Stopwatch.StartNew();
    foreach (var t in threads) t.Start();
    foreach (var t in threads) t.Join();
    return sw.Elapsed.TotalMilliseconds;
}
```

Each method is described by a tuple of delegates: the thread work, reading its counter, and resetting it. The lambdas capture local variables, making them shared among all threads. The `Run` method creates the threads in advance and measures only their work. The beginning of the output (the remaining 20 rows are summarized in Table 3.3):

```
Processors: 16, visits: 8 000 000
Method              Threads      Result Time, ms
unsynchronized            1   8 000 000      2,3
unsynchronized            2   4 377 251      5,7
unsynchronized            4   2 398 408      3,0
unsynchronized            8   3 015 383      4,3
unsynchronized           16   2 387 323      3,7
Interlocked               1   8 000 000     33,9
…
```

Only the unsynchronized version produces an incorrect result, different on every run. The timing analysis is given in “The cost of synchronization.”

### Bank transfers

Two clients simultaneously transfer money between accounts A and B in opposite directions: the first transfers UAH 0.10 from A to B 100 000 times, and the second transfers from B to A 60 000 times. The naive transfer locks accounts in “from – to” order and deadlocks. The corrected transfer always locks the lower-numbered account first.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// The naive argument runs only the naive version; the process hangs
// for diagnosis; without the argument, run both versions.
bool hang = args is ["naive"];
Simulate(ordered: false, hang);
if (!hang) Simulate(ordered: true, hang);

static void Simulate(bool ordered, bool hang)
{
    Account a = new(1, 10_000m), b = new(2, 10_000m);
    string title = ordered ? "Ordered locks"
                           : "Naive locks";
    Console.WriteLine($"{title}:");

    // The first client transfers from A to B, the second from B to A.
    Thread t1 = Start("A→B", () => Repeat(a, b, 100_000, ordered));
    Thread t2 = Start("B→A", () => Repeat(b, a, 60_000, ordered));

    bool done = t1.Join(TimeSpan.FromSeconds(3))
             && t2.Join(TimeSpan.FromSeconds(3));
    if (!done)
    {
        Console.WriteLine("  threads did not finish within 3 s: " +
            "deadlock");
        if (hang) Thread.Sleep(Timeout.Infinite);
        return;
    }
    Console.WriteLine($"  A = {a.Balance:N2}, B = {b.Balance:N2}, " +
        $"total {a.Balance + b.Balance:N2}");
}

static Thread Start(string name, ThreadStart body)
{
    // A background thread does not prevent the process from exiting.
    Thread t = new(body) { Name = name, IsBackground = true };
    t.Start();
    return t;
}

static void Repeat(Account from, Account to, int count, bool ordered)
{
    for (int i = 0; i < count; i++)
    {
        if (ordered) TransferOrdered(from, to, 0.10m);
        else TransferNaive(from, to, 0.10m);
    }
}

// Unsafe: acquisition order depends on the transfer direction.
static void TransferNaive(Account from, Account to, decimal sum)
{
    lock (from.Sync)
    {
        Thread.SpinWait(100);        // allows the other thread to start
        lock (to.Sync)
        {
            from.Balance -= sum;
            to.Balance += sum;
        }
    }
}

// Safe: always lock the lower-numbered account first.
static void TransferOrdered(Account from, Account to, decimal sum)
{
    Account first = from.Id < to.Id ? from : to;
    Account second = from.Id < to.Id ? to : from;
    lock (first.Sync)
    {
        Thread.SpinWait(100);
        lock (second.Sync)
        {
            from.Balance -= sum;
            to.Balance += sum;
        }
    }
}

class Account(int id, decimal balance)
{
    public int Id { get; } = id;
    public decimal Balance { get; set; } = balance;
    public object Sync { get; } = new();   // lock object
}
```

`Thread.SpinWait(100)` between the two locks makes deadlock almost inevitable: without it, deadlock still occurs, but less often and at an unpredictable moment. The main thread does not wait forever; it calls `Join` with a timeout, and stuck background threads do not prevent the process from exiting. In the ordered version, both threads acquire account 1 first, so circular wait is impossible and the total balance remains unchanged. Output:

```
Naive locks:
  threads did not finish within 3 s: deadlock
Ordered locks:
  A = 6 000,00, B = 14 000,00, total 20 000,00
```

Running with the `naive` argument (`dotnet run -c Release -- naive`) leaves the process deadlocked so you can investigate it in Rider or with `dotnet-dump`.

### Bounded buffer

Two producers each put 20 numbers, in batches of 5, into a buffer with a capacity of 3 items, while three consumers remove and process them. The buffer uses a monitor with condition variables; the program verifies that no item is lost and occupancy never exceeds capacity.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

BoundedBuffer<int> buffer = new(capacity: 3);
const int Producers = 2, Consumers = 3, ItemsPerProducer = 20;
long consumedSum = 0;
int[] consumedBy = new int[Consumers];

var threads = new List<Thread>();
for (int p = 0; p < Producers; p++)
{
    int id = p;
    threads.Add(new Thread(() =>
    {
        for (int i = 1; i <= ItemsPerProducer; i++)
        {
            buffer.Put(id * 100 + i);   // 1…20 and 101…120
            if (i % 5 == 0) Thread.Sleep(30);  // pause after a batch
        }
    }));
}
for (int c = 0; c < Consumers; c++)
{
    int id = c;
    threads.Add(new Thread(() =>
    {
        // An empty buffer after producers finish means completion.
        while (buffer.TryTake(out int item))
        {
            Interlocked.Add(ref consumedSum, item);
            consumedBy[id]++;
            Thread.Sleep(1);            // process the item
        }
    }));
}
foreach (var t in threads) t.Start();
foreach (var t in threads.Take(Producers)) t.Join();
buffer.Complete();                      // no more items will arrive
foreach (var t in threads.Skip(Producers)) t.Join();

long expected = 0;
for (int p = 0; p < Producers; p++)
    for (int i = 1; i <= ItemsPerProducer; i++)
        expected += p * 100 + i;

Console.WriteLine($"Consumed: {string.Join(" + ", consumedBy)} = " +
    $"{consumedBy.Sum()} items");
Console.WriteLine($"Sum: {consumedSum} (expected {expected})");
Console.WriteLine($"Maximum occupancy: {buffer.MaxCount} " +
    $"of {buffer.Capacity}");
Console.WriteLine($"Waits: producers {buffer.PutWaits}, " +
    $"consumers {buffer.TakeWaits}");

// A bounded buffer using the monitor of the gate object.
class BoundedBuffer<T>(int capacity)
{
    private readonly Queue<T> items = new();
    private readonly object gate = new();
    private bool completed;

    public int Capacity { get; } = capacity;
    public int MaxCount { get; private set; }
    public int PutWaits { get; private set; }
    public int TakeWaits { get; private set; }

    public void Put(T item)
    {
        lock (gate)
        {
            while (items.Count == Capacity)   // while, not if
            {
                PutWaits++;
                Monitor.Wait(gate);           // releases gate
            }
            items.Enqueue(item);
            MaxCount = Math.Max(MaxCount, items.Count);
            Monitor.PulseAll(gate);           // wakes consumers
        }
    }

    public bool TryTake(out T item)
    {
        lock (gate)
        {
            while (items.Count == 0 && !completed)
            {
                TakeWaits++;
                Monitor.Wait(gate);
            }
            if (items.Count == 0)             // completed and empty
            {
                item = default!;
                return false;
            }
            item = items.Dequeue();
            Monitor.PulseAll(gate);           // wakes producers
            return true;
        }
    }

    public void Complete()
    {
        lock (gate)
        {
            completed = true;
            Monitor.PulseAll(gate);
        }
    }
}
```

The `gate` object has one condition variable on which both producers (“space available”) and consumers (“item available”) wait, so `PulseAll` is used: `Pulse` could wake the wrong type of thread and the signal would be lost. The `Complete` method tells consumers that no more items will arrive; without it, they would wait forever. The `consumedBy` array needs no synchronization because each consumer changes only its own element. The number of waits and the distribution among consumers vary from run to run; the other lines do not. Output:

```
Consumed: 14 + 13 + 13 = 40 items
Sum: 2420 (expected 2420)
Maximum occupancy: 3 of 3
Waits: producers 15, consumers 13
```

### Parking

A parking lot has 3 spaces. Seven cars arrive at 20 ms intervals and stay for different durations. Each driver waits for a space only as long as their patience allows, then leaves. `SemaphoreSlim` limits the spaces, and a CAS loop calculates the maximum number of cars parked simultaneously.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Places = 3;
using SemaphoreSlim parking = new(Places, Places);
Stopwatch clock = Stopwatch.StartNew();
Lock consoleGate = new();
int parked = 0, maxParked = 0, refused = 0;

// Car: plate, arrival delay, parking duration, patience (ms).
(string Plate, int Arrive, int Stay, int Patience)[] cars =
[
    ("AA1001", 0, 400, 1000), ("AE2002", 20, 250, 1000),
    ("BC3003", 40, 600, 1000), ("KA4004", 60, 300, 1000),
    ("AX5005", 80, 200, 100), ("BI6006", 100, 300, 1000),
    ("CE7007", 120, 150, 50),
];

var threads = cars.Select(car => new Thread(() =>
{
    Thread.Sleep(car.Arrive);
    Log($"{car.Plate} arrived, spaces available: {parking.CurrentCount}");
    if (!parking.Wait(car.Patience))  // wait with a timeout
    {
        Interlocked.Increment(ref refused);
        Log($"{car.Plate} gave up waiting for a space and left");
        return;
    }
    try
    {
        int now = Interlocked.Increment(ref parked);
        UpdateMax(now);
        Log($"{car.Plate} parked, spaces occupied: {now}");
        Thread.Sleep(car.Stay);       // stays in the parking lot
    }
    finally
    {
        Interlocked.Decrement(ref parked);
        Log($"{car.Plate} left");
        parking.Release();            // release the space
    }
})).ToList();

threads.ForEach(t => t.Start());
threads.ForEach(t => t.Join());
Console.WriteLine($"Maximum simultaneous occupancy: {maxParked} of {Places}, " +
    $"turned away: {refused}");

void UpdateMax(int value)
{
    int seen;
    do
    {
        seen = maxParked;               // CAS loop for the maximum
        if (value <= seen) return;
    } while (Interlocked.CompareExchange(
        ref maxParked, value, seen) != seen);
}

void Log(string message)
{
    lock (consoleGate)
    {
        Console.WriteLine(
            $"{clock.ElapsedMilliseconds / 10 * 10,5} ms  {message}");
    }
}
```

`Wait(car.Patience)` returns `false` if no space becomes available within the specified time. `Release` is in a `finally` block, so the space is released even if an exception occurs. A separate lock protects log output to prevent lines from different threads from interleaving; time is rounded to 10 ms and may differ by 10–20 ms between runs. Output:

```
    0 ms  AA1001 arrived, spaces available: 3
    0 ms  AA1001 parked, spaces occupied: 1
   20 ms  AE2002 arrived, spaces available: 2
   20 ms  AE2002 parked, spaces occupied: 2
   50 ms  BC3003 arrived, spaces available: 1
   50 ms  BC3003 parked, spaces occupied: 3
   70 ms  KA4004 arrived, spaces available: 0
   90 ms  AX5005 arrived, spaces available: 0
  100 ms  BI6006 arrived, spaces available: 0
  120 ms  CE7007 arrived, spaces available: 0
  170 ms  CE7007 gave up waiting for a space and left
  190 ms  AX5005 gave up waiting for a space and left
  270 ms  AE2002 left
  270 ms  KA4004 parked, spaces occupied: 3
  400 ms  AA1001 left
  400 ms  BI6006 parked, spaces occupied: 3
  590 ms  KA4004 left
  660 ms  BC3003 left
  700 ms  BI6006 left
Maximum simultaneous occupancy: 3 of 3, turned away: 2
```

## Common mistakes

Table 3.4. Common thread synchronization mistakes {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| Results vary between runs; updates are lost | Race condition; protect shared data with `Interlocked` or `lock`, or preferably eliminate shared state |
| A `volatile` counter still loses increments | `volatile` does not make `++` atomic; use `Interlocked.Increment` |
| Different methods protect one resource with different locks | The locks provide no protection; use the same lock object for the same resource |
| `lock (this)`, `lock (typeof(T))`, `lock ("key")` | Other code may acquire the same object; lock a private `Lock` field |
| The check and action are in separate `lock` blocks | The condition can change between blocks; perform check-then-act in one critical section |
| The program hangs with low CPU usage | Deadlock; acquire locks in the same order and use `TryEnter` with a timeout |
| `Monitor.Wait` without a `while` loop | The condition may be false after waking; check it in a loop |
| `SynchronizationLockException` | `Wait`/`Pulse`/`Exit` was called without holding the lock or from another thread |
| Threads wait forever for a signal | `Pulse` before `Wait` is lost; store state in a variable, and use a flag and `PulseAll` for completion |
| `SemaphoreFullException`; the semaphore admits too many threads | An extra `Release`; call `Release` exactly once in `finally` after a successful `Wait` |
| `SpinLock` does not lock | The structure was copied (a `readonly` field or passing by value); store it in a mutable field |
| CS1996: `await` inside `lock` | Asynchronous waiting while holding a lock is not allowed; use `SemaphoreSlim.WaitAsync` (Topic 5) |
| More threads make the program slower | Lock convoy; acquire locks less often and accumulate results locally |
