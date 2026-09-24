---
title: "Topic 9. Multithreading in C++"
description: "Multithreaded programming in C++ and the parallel algorithms of the standard library"
sourceHash: "ffc5ed5590dab7cb22092a3bbb5ae6b18304eaa08ab364ebd79871bd1c7b2b2a"
---

# Topic 9. Multithreaded programming in C++ and the parallel algorithms of the standard library

**Goal:** become familiar with the multithreading facilities of the C++ standard library and the parallel algorithms with execution policies; learn to create and build projects with CMake, presets, and Ninja, start std::jthread threads with cooperative cancellation, synchronize them with mutexes, condition variables, semaphores, and atomic variables, and obtain results through std::future; master measuring speedup and finding data races with ThreadSanitizer.

## Lecture contents

1. [GCC, CMake, Ninja, and CLion](./toolchain) — Tools: GCC, CMake, Ninja, and CLion · Building a project: CMake and Ninja
2. [Threads and synchronization in C++](./threads-sync) — std::thread and std::jthread threads · Mutexes and locking · Condition variables, semaphores, latch, and barrier
3. [Atomic operations and asynchronous results](./atomics-async) — Atomic operations · Asynchronous results: async, future, promise · A thread pool
4. [Parallel algorithms and diagnostics](./std-algorithms) — Parallel algorithms of the standard library · Finding bugs: ThreadSanitizer and the debugger · Measuring performance
5. [Examples and common mistakes](./case-studies) — Program examples · Common mistakes

## Practice and review

- [Practice](./practice) — 3 worked examples with complete code and output
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
