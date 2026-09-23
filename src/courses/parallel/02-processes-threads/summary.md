---
title: "Summary"
description: "Topic 2. Processes and threads: conclusions and review questions"
sourceHash: "faab9286cd3b3e9927291f02272da51c4348fc721300da41f5b337fdaf9e7df1"
---

# Summary

## Conclusions

A process is an isolated container of resources (address space, handles), while a thread is a unit of execution scheduled by the OS; threads in one process share memory but have their own stacks and contexts. A preemptive scheduler gives threads time slices according to priorities (classes and levels on Windows, nice values and EEVDF on Linux), while affinity restricts the processor set. The `Process` class starts worker processes and collects their output and exit codes. The `Thread` class creates OS threads: `Start`, `Join`, background threads, and cooperative stopping with a flag; an unhandled exception in a thread terminates the process. The thread pool reuses threads for short jobs, adjusts their count through hill climbing, and suffers when jobs block. Partitioning an array among N threads provides speedup limited by overhead, memory, and the physical core count, so measurements determine the optimal thread count.

## Self-check questions

1. How does a process differ from a thread? Which resources do threads in a process share, and which are private?
2. How can you view a process’s thread count on Windows and Linux?
3. What is a context switch, and why does it have an indirect cost?
4. What are preemptive multitasking and a time slice?
5. How is a thread’s base priority determined on Windows?
6. What do nice values mean on Linux? Which scheduler has Linux used since kernel 6.6?
7. What is processor affinity? How can you set it in C#, `cmd`, and `taskset`?
8. How do you start a process with redirected output and obtain its exit code?
9. How do you pass data to a thread and obtain a result?
10. How does a foreground thread differ from a background thread?
11. What states can a managed thread have?
12. Why is there no `Thread.Abort` in .NET, and how do you stop a thread correctly?
13. What happens to an unhandled exception in a thread?
14. What are `ThreadLocal<T>` and `[ThreadStatic]` used for?
15. How does the thread pool work: queues, work stealing, hill climbing, and starvation?
16. What limits speedup when partitioning an array among N threads?

## Useful links

- Managed threading: <https://learn.microsoft.com/dotnet/standard/threading/>
- The thread pool: <https://learn.microsoft.com/dotnet/standard/threading/the-managed-thread-pool>
- The `Thread` class: <https://learn.microsoft.com/dotnet/api/system.threading.thread>
- The `Process` class: <https://learn.microsoft.com/dotnet/api/system.diagnostics.process>
- Scheduling priorities in Windows: <https://learn.microsoft.com/windows/win32/procthread/scheduling-priorities>
- .NET runtime metrics: <https://learn.microsoft.com/dotnet/core/diagnostics/built-in-metrics-runtime>
- The `dotnet-counters` utility: <https://learn.microsoft.com/dotnet/core/diagnostics/dotnet-counters>
- The EEVDF scheduler: <https://docs.kernel.org/scheduler/sched-eevdf.html>
- Linux scheduling policies, sched(7): <https://man7.org/linux/man-pages/man7/sched.7.html>
- Debugging in Rider: <https://www.jetbrains.com/help/rider/Debugging_Code.html>
