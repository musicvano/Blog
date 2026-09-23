---
title: "Summary"
description: "Topic 4. Thread-safe collections: conclusions and review questions"
sourceHash: "dcd33ce3d147bf6946d4c8c8307a38300020c09e0d6d7aef8873ba1daded15e7"
---

# Summary

## Conclusions

Ordinary .NET collections are not designed for concurrent writes: they lose data, throw exceptions, or hang, and compound check-then-act operations are unsafe even with thread-safe collections. The concurrent collections in `System.Collections.Concurrent` offer atomic `Try…`, `GetOrAdd`, and `AddOrUpdate` methods; some use lock-free algorithms based on CAS, such as the Treiber stack. Dictionary factories execute outside locks, so expensive computations are wrapped in `Lazy<T>`. Immutable and frozen collections allow lock-free reads, with updates performed by atomically replacing a reference. The producer–consumer pattern is implemented using `BlockingCollection<T>` for threads or channels for asynchronous code; bounded capacity provides backpressure, and a completion signal allows the pipeline to stop correctly. False sharing destroys scalability when threads write to neighboring variables on the same cache line; eliminate it with local variables and structure padding, and detect it using measurements, the dotTrace profiler, and `perf c2c`.

## Self-check questions

1. Why must `List<T>` and `Dictionary<TKey, TValue>` not be modified from multiple threads?
2. What is a compound check-then-act operation? How can it be fixed?
3. What does `Interlocked.CompareExchange` do? What is a lock-free algorithm?
4. How does the Treiber stack work?
5. What is the ABA problem, and why is it less severe in .NET?
6. How do `ConcurrentQueue<T>`, `ConcurrentStack<T>`, and `ConcurrentBag<T>` differ?
7. When is `ConcurrentBag<T>` efficient, and when is it not?
8. Why can a `GetOrAdd` factory execute several times? How can this be prevented?
9. What requirements must an `AddOrUpdate` update function meet?
10. How do immutable collections allow lock-free reads? What is `ImmutableInterlocked` for?
11. Which scenarios is `FrozenDictionary<TKey, TValue>` designed for?
12. What capabilities does `BlockingCollection<T>` add? How do you stop consumers?
13. What is backpressure? Compare a completion signal with a “poison pill.”
14. What full modes does a bounded channel provide? How does a channel differ from `BlockingCollection<T>`?
15. What are a cache line and false sharing? How can false sharing be detected and eliminated?

## Useful links

- Thread-safe collections: <https://learn.microsoft.com/dotnet/standard/collections/thread-safe/>
- `BlockingCollection<T>`: <https://learn.microsoft.com/dotnet/standard/collections/thread-safe/blockingcollection-overview>
- `ConcurrentDictionary<TKey, TValue>`: <https://learn.microsoft.com/dotnet/api/system.collections.concurrent.concurrentdictionary-2>
- Channels: <https://learn.microsoft.com/dotnet/core/extensions/channels>
- Immutable collections: <https://learn.microsoft.com/dotnet/api/system.collections.immutable>
- `FrozenDictionary<TKey, TValue>`: <https://learn.microsoft.com/dotnet/api/system.collections.frozen.frozendictionary-2>
- BenchmarkDotNet: <https://benchmarkdotnet.org/>
- Profiling in Rider: <https://www.jetbrains.com/help/rider/Profiling_Applications.html>
- `perf c2c`: <https://man7.org/linux/man-pages/man1/perf-c2c.1.html>
