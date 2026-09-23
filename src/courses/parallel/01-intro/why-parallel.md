---
title: "Why parallel computing"
description: "Topic 1. Fundamentals of parallel computing: Why parallel computing"
outline: [2, 3]
sourceHash: "555c661b77250985ce020a30cb6c444007cf2e0351c4f3bfa2db45e2e3efe021"
---

# Why parallel computing

## Why we need parallel computing

For several decades, programs became faster “on their own”: each new generation of processors had a higher clock frequency, so the same sequential program ran faster. Around 2005, this came to an end. The power dissipated by a processor increases with its frequency and supply voltage, and removing more than 100–150 W of heat from a chip a few square centimeters in area is difficult and expensive. This limitation is called the **“power wall”** (*power wall*). Desktop processor clock frequencies leveled off at 3–5 GHz.

Meanwhile, the number of transistors on a chip continues to increase (Moore’s law), so manufacturers use them differently: they put several **cores** (*cores*) on one chip. For example, the Intel Core i9-11900KF processor in the lab computers has 8 cores and 16 logical processors. However, multiple cores do not speed up an ordinary program: sequential code runs on only one of them. To benefit, you need to **parallelize** the program — divide the work into parts that run simultaneously.

Parallel computing is used at every level:

- **multicore processors** (*multicore CPU*) in computers, smartphones, and servers;
- **graphics processors** (*GPU*) with thousands of simple cores for graphics, scientific calculations, and neural network training;
- **computing clusters** (*clusters*) — hundreds or thousands of computers connected by a fast network;
- **clouds** (*cloud*) — computing resources rented for the time you need them.

The course progresses from threads on a single computer (Module 1, C#), through high-performance computing in C++ with OpenMP, CUDA, and MPI on a cluster (Module 2), to distributed applications in containers (Module 3).

## Basic concepts

**Parallel computing** (*parallel computing*) means executing parts of a single problem simultaneously on several computing devices to reduce the time needed to solve it. **Concurrency** (*concurrency*) means organizing a program as several independent flows of control whose execution overlaps in time. A concurrent program can run on a single core if the operating system switches between threads (for example, a server serving many clients). Parallelism is physically simultaneous execution; concurrency is a way of structuring a program. **Distributed computing** (*distributed computing*) means computing on several computers that have no shared memory and communicate over a network.

Key course terms:

- **process** (*process*) — a running program with its own address space (Topic 2);
- **thread** (*thread*) — a sequence of execution within a process; threads in the same process share memory;
- **node** (*node*) — an individual computer in a cluster with its own memory and operating system;
- **granularity** (*granularity*) — the amount of computation in one parallel part relative to the amount of communication between parts: a **coarse-grained** (*coarse-grained*) task exchanges data infrequently, while a **fine-grained** (*fine-grained*) task does so frequently;
- **overhead** (*overhead*) — time a parallel program spends on activities other than useful work: creating threads, distributing data, synchronizing, and passing messages.

::: tip Tip
The smaller the parallel parts, the larger the share of overhead. Parallelize work that takes at least milliseconds; a parallelized loop containing only a few operations usually runs more slowly than a sequential one.
:::
