---
title: "Summary"
description: "Topic 6. Data parallelism and PLINQ: conclusions and review questions"
sourceHash: "bff18f7718b55600ef9b71d4883c4d4edd338a1d0131ae835e758f34f3ac448f"
---

# Summary

## Conclusions

Data parallelism applies one operation to parts of a large dataset and scales with data volume. A loop can be parallelized if its iterations are independent; dependencies through shared variables are eliminated by reduction with thread-local state. The `Parallel` class provides `For` and `ForEach` loops with `ParallelOptions` settings, early termination through `Break`/`Stop`, and exception collection in `AggregateException`, plus `ForEachAsync` and `ForAsync` for asynchronous bodies. Performance depends on data partitioning: range partitioning has the least overhead, chunk and dynamic partitioning balance the load, and `Partitioner.Create` with ranges is needed for small loop bodies. PLINQ parallelizes LINQ queries with a single `AsParallel` call, but does not preserve order without `AsOrdered` and is not always faster than LINQ. Parallel aggregation is correct only for associative operations (and, without ordering, commutative ones). A reduction tree and the Blelloch algorithm have logarithmic depth, while parallel sorting algorithms (merge sort, quicksort, odd-even sort, sample sort) combine data partitioning with tasks and a threshold for switching to a sequential algorithm. Evaluate results using speedup and efficiency tables for strong and weak scaling.

## Self-check questions

1. How does data parallelism differ from task parallelism?
2. Under what conditions can loop iterations run in parallel?
3. What settings does `ParallelOptions` provide?
4. How do `Break` and `Stop` differ? What does `ParallelLoopResult` contain?
5. How are exceptions handled in parallel loops and PLINQ?
6. What are the `localInit` and `localFinally` delegates for?
7. When do you need `Parallel.ForEachAsync` and `Parallel.ForAsync`?
8. Compare range, chunk, and dynamic data partitioning.
9. Why use `Partitioner.Create(from, to, rangeSize)`?
10. What merge modes does PLINQ provide, and how do they differ?
11. How does ordering affect PLINQ results and performance?
12. When is a PLINQ query slower than LINQ?
13. Why must an aggregation operation be associative? When is commutativity also required?
14. Describe a reduction tree and the Blelloch prefix sum algorithm.
15. How does parallel merge sort work, and what limits its speedup?
16. How do you make a parallel Monte Carlo method reproducible?

## Useful links

- Data parallelism (TPL): <https://learn.microsoft.com/dotnet/standard/parallel-programming/data-parallelism-task-parallel-library>
- The `Parallel` class: <https://learn.microsoft.com/dotnet/api/system.threading.tasks.parallel>
- Loops with thread-local variables: <https://learn.microsoft.com/dotnet/standard/parallel-programming/how-to-write-a-parallel-for-loop-with-thread-local-variables>
- Partitioners for PLINQ and TPL: <https://learn.microsoft.com/dotnet/standard/parallel-programming/custom-partitioners-for-plinq-and-tpl>
- Introduction to PLINQ: <https://learn.microsoft.com/dotnet/standard/parallel-programming/introduction-to-plinq>
- PLINQ merge options: <https://learn.microsoft.com/dotnet/standard/parallel-programming/merge-options-in-plinq>
- Potential pitfalls in data and task parallelism: <https://learn.microsoft.com/dotnet/standard/parallel-programming/potential-pitfalls-in-data-and-task-parallelism>
- Profiling in Rider: <https://www.jetbrains.com/help/rider/Profiling_Applications.html>
