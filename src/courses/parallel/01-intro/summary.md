---
title: "Summary"
description: "Topic 1. Fundamentals of parallel computing: conclusions and review questions"
sourceHash: "93b7ac5e681485be45ad03952a2310923966d33735f33f4a937b34f3e57d586a"
---

# Summary

## Conclusions

Processor clock frequencies stopped increasing because of the “power wall,” so performance now grows through additional cores, graphics accelerators, and clusters, and programs need to be parallelized. Shared-memory systems (SMP, NUMA) let threads exchange data through shared variables; distributed-memory systems communicate only through messages over a network. The memory hierarchy and cache significantly affect parallel program performance. Flynn’s taxonomy divides systems into SISD, SIMD, MISD, and MIMD. The quality of a parallel program is evaluated through speedup, efficiency, and cost. Amdahl’s law limits speedup for a fixed-size problem to $1 / (1 - f)$, while the Gustafson–Barsis law shows that speedup can grow almost linearly as the problem size increases. The Karp–Flatt metric helps identify what limits speedup: sequential code or overhead. Measure execution time in Release configuration using `Stopwatch`, with warmup and the median of several runs. The practical assignments in Module 1 use .NET 10 in JetBrains Rider.

## Self-check questions

1. What is the “power wall,” and how has it affected processor development?
2. How does parallel computing differ from concurrent and distributed computing?
3. What are the granularity and overhead of a parallel task?
4. How do SMP and NUMA architectures differ?
5. What are SMT (Hyper-Threading) and hybrid processors with P-cores and E-cores?
6. Why does a processor need cache? What are a cache line, a cache hit, and a cache miss?
7. Which systems use distributed memory?
8. Name the classes in Flynn’s taxonomy and give examples of systems.
9. What do the SPMD and MPMD models mean?
10. Which parallelism models do you know?
11. How do you calculate the speedup, efficiency, and cost of a parallel program?
12. What causes superlinear speedup?
13. State Amdahl’s law. What is the speedup limit at $f = 0 {,} 95$?
14. How does the Gustafson–Barsis law differ from Amdahl’s law? What are strong and weak scaling?
15. What does the Karp–Flatt metric show?
16. Which rules should you follow when measuring a program’s execution time?
17. How do the .NET SDK and runtime differ? How can you view the installed versions?

## Useful links

- Download .NET 10: <https://dotnet.microsoft.com/download/dotnet/10.0>
- Install .NET on Ubuntu: <https://learn.microsoft.com/dotnet/core/install/linux-ubuntu>
- Install WSL: <https://learn.microsoft.com/windows/wsl/install>
- The `Stopwatch` class: <https://learn.microsoft.com/dotnet/api/system.diagnostics.stopwatch>
- BenchmarkDotNet: <https://benchmarkdotnet.org/>
- JetBrains Rider documentation: <https://www.jetbrains.com/help/rider/>
- TOP500 ranking: <https://top500.org/>
