---
title: "Summary"
description: "Topic 3. Thread synchronization: conclusions and review questions"
sourceHash: "48fc09293bab82db64ff6068ae048ee15714566a48c1652689c98a019e77602c"
---

# Summary

## Conclusions

Shared data accessed by multiple threads creates race conditions: even `counter++` consists of several actions and can lose updates. Correct synchronization ensures safety, liveness, and fairness. The cheapest approach is to eliminate shared state; use atomic `Interlocked` operations and CAS loops for individual variables, and `lock` with a dedicated `Lock` object or `Monitor` for compound actions. The `Monitor.Wait`/`PulseAll` condition variables let threads wait for a condition inside a critical section; `SemaphoreSlim` limits the number of threads, `ReaderWriterLockSlim` allows multiple readers, and `ManualResetEventSlim`, `CountdownEvent`, and `Barrier` coordinate threads. Named `Mutex` and `Semaphore` instances synchronize processes. Deadlock occurs under the four Coffman conditions; in practice, lock ordering and timeouts prevent it, while Rider (*Parallel Stacks*) and `dotnet-dump` help diagnose it. Besides deadlock, starvation, livelock, priority inversion, and lock convoys compromise liveness. Every critical section executes sequentially, so the choice of synchronization tool and lock granularity must be checked through measurement.

## Self-check questions

1. What are shared state, a critical section, and a race condition?
2. Why is `counter++` not atomic? What other operations are non-atomic?
3. State the requirements for safety, liveness, and fairness.
4. State Bernstein's conditions and give an example of their violation.
5. What methods does the `Interlocked` class provide? How does a CAS loop work?
6. What is the `volatile` modifier for, and what does it not guarantee?
7. What does the compiler translate a `lock` statement into for the `Lock` type and for other types?
8. Which objects must not be used for locking, and why?
9. How do `Monitor.Wait`, `Pulse`, and `PulseAll` work? Why is the condition checked in a `while` loop?
10. How do `Mutex`, `Semaphore`, and `SemaphoreSlim` differ?
11. When is `ReaderWriterLockSlim` more efficient than `lock`? What is upgradeable mode?
12. How do `ManualResetEventSlim`, `AutoResetEvent`, `CountdownEvent`, and `Barrier` differ?
13. Name the Coffman conditions. Which deadlock prevention techniques break each one?
14. How can you find a deadlock using Rider and `dotnet-dump`?
15. What are starvation, livelock, priority inversion, and a lock convoy?

## Useful links

- Overview of synchronization primitives: <https://learn.microsoft.com/dotnet/standard/threading/overview-of-synchronization-primitives>
- Managed threading best practices: <https://learn.microsoft.com/dotnet/standard/threading/managed-threading-best-practices>
- The `lock` statement: <https://learn.microsoft.com/dotnet/csharp/language-reference/statements/lock>
- The `Lock` class: <https://learn.microsoft.com/dotnet/api/system.threading.lock>
- The `Interlocked` class: <https://learn.microsoft.com/dotnet/api/system.threading.interlocked>
- `Semaphore` and `SemaphoreSlim`: <https://learn.microsoft.com/dotnet/standard/threading/semaphore-and-semaphoreslim>
- The `dotnet-dump` utility: <https://learn.microsoft.com/dotnet/core/diagnostics/dotnet-dump>
- Debugging deadlock: <https://learn.microsoft.com/dotnet/core/diagnostics/debug-deadlock>
- Multithreaded debugging in Rider: <https://www.jetbrains.com/help/rider/Debugging_Multithreaded_Applications.html>
