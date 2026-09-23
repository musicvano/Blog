---
title: "Spin locks and signaling primitives"
description: "Topic 3. Thread synchronization: spin locks and signaling primitives"
outline: [2, 3]
sourceHash: "3da5ab2c4acb810cd875d2abed6f383ae009609026df95628404032567eaccee"
---

# Spin locks and signaling primitives

## `ReaderWriterLockSlim`, `SpinLock`, and `SpinWait`

### Reader/writer locks

Many kinds of data are read frequently and changed rarely: reference data, caches, and settings. An ordinary `lock` admits one thread at a time even when all threads only read. The `ReaderWriterLockSlim` class has three modes:

- **read** (`EnterReadLock`/`ExitReadLock`) — any number of readers simultaneously;
- **write** (`EnterWriteLock`/`ExitWriteLock`) — exclusive access for one writer;
- **upgradeable read** (`EnterUpgradeableReadLock`) — only one thread, which reads alongside other readers and switches to write mode if needed.

```cs
private readonly ReaderWriterLockSlim rw = new();
private readonly Dictionary<string, decimal> rates = [];

public decimal? GetRate(string code)
{
    rw.EnterReadLock();
    try { return rates.TryGetValue(code, out var r) ? r : null; }
    finally { rw.ExitReadLock(); }
}

public void SetRate(string code, decimal rate)
{
    rw.EnterWriteLock();
    try { rates[code] = rate; }
    finally { rw.ExitWriteLock(); }
}
```

Recursive entry is prohibited by default (`LockRecursionPolicy.NoRecursion`), and a thread in read mode cannot switch to write mode: two such threads would block each other, which is why upgradeable mode exists. When a writer is waiting, new readers also wait, preventing writer starvation. `ReaderWriterLockSlim` implements `IDisposable`. It provides a benefit only when reads greatly outnumber writes and take long enough; for very short sections, its overhead exceeds that of `lock`.

### `SpinLock` and `SpinWait`

Blocking a thread through the OS kernel costs microseconds for context switching and waking up. If the lock will be released in a few nanoseconds, it is cheaper to **spin** — run an empty loop checking the lock. The `SpinLock` structure implements this kind of lock:

```cs
private SpinLock spin = new(enableThreadOwnerTracking: false);

public void Add(int value)
{
    bool taken = false;
    try
    {
        spin.Enter(ref taken);
        sum += value;                    // a very short section
    }
    finally
    {
        if (taken) spin.Exit();
    }
}
```

`SpinLock` is a **structure**, so it must not be copied or declared as a `readonly` field: calling a method on a copy locks the copy rather than the shared lock. The lock is not reentrant; do not wait or perform I/O inside the section. The documentation recommends switching to `SpinLock` only when profiling shows that `lock` or `Interlocked` is a bottleneck.

The `SpinWait` structure helps implement custom waiting: `SpinOnce()` initially spins, then yields the processor to other threads after several iterations; `SpinWait.SpinUntil(() => ready)` waits for a condition. Modern `lock`, `SemaphoreSlim`, and `ManualResetEventSlim` already combine brief spinning with subsequent blocking.

## Signaling primitives

Signaling primitives do not protect data; they **coordinate** threads: one thread notifies others that something has happened (Table 3.2).

- `ManualResetEventSlim` is a “gate”: `Set()` opens it, and all threads waiting in `Wait()` pass through; the gate remains open until `Reset()`. Examples include a “start” signal for all worker threads or a “stop” signal for all of them.
- `AutoResetEvent` is a “turnstile”: each `Set()` lets **one** thread through and automatically closes. If no one is waiting, the signal is remembered but does not accumulate (two consecutive `Set()` calls = one).
- `CountdownEvent` is a counter: `Signal()` decrements it, and `Wait()` waits for zero. It is convenient for waiting until N jobs started in the thread pool finish.
- `Barrier` is a meeting point for N participants: `SignalAndWait()` blocks until all participants reach the barrier, after which they all continue together and the barrier is ready for the next round.

```cs
using CountdownEvent pending = new(initialCount: 5);
for (int i = 1; i <= 5; i++)
{
    int id = i;
    ThreadPool.QueueUserWorkItem(_ =>
    {
        Console.WriteLine($"Report {id} is ready");
        pending.Signal();               // one job completed
    });
}
pending.Wait();                         // wait for all five
Console.WriteLine("All reports are ready");
```

Table 3.2. .NET synchronization tools {.caption}

| **Tool** | **Across processes** | **Purpose** |
| --- | --- | --- |
| `lock` / `Lock` / `Monitor` | No | Mutual exclusion; `Monitor` also provides condition variables |
| `Interlocked` | No | Atomic operations on one variable |
| `Mutex` | Yes (named) | Mutual exclusion, including across processes |
| `SemaphoreSlim` | No | Limiting the number of threads, asynchronous waiting |
| `Semaphore` | Yes (Windows) | Limiting the number of threads and processes |
| `ReaderWriterLockSlim` | No | Multiple readers or one writer |
| `SpinLock`, `SpinWait` | No | Very short sections without entering the kernel |
| `ManualResetEventSlim` | No | A signal for all waiting threads |
| `AutoResetEvent` | Yes (`EventWaitHandle`, Windows) | A signal for one thread |
| `CountdownEvent` | No | Waiting for N jobs to finish |
| `Barrier` | No | Moving N threads to the next phase simultaneously |

Classes with the `Slim` suffix operate within a process and are faster than their system counterparts because they initially avoid the OS kernel. An overview of all primitives: <https://learn.microsoft.com/dotnet/standard/threading/overview-of-synchronization-primitives>.
