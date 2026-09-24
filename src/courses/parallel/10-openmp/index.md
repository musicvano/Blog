---
title: "Topic 10. OpenMP"
description: "OpenMP: parallel regions and loops, reductions, tasks; thread affinity and NUMA"
sourceHash: "fc3c81875f3f6fa565ec40991162a95af8d6a87c7e40738c7d297a94fba51f06"
---

# Topic 10. OpenMP: parallel regions and loops, reductions, tasks; thread affinity and NUMA

**Goal:** become familiar with the fork–join model and OpenMP directives; learn to parallelize loops with different kinds of iteration scheduling, use reductions (including user-defined ones), synchronization, and tasks for recursive algorithms, and vectorize loops with the simd directive; master first-touch data initialization, thread binding with the OMP_PLACES and OMP_PROC_BIND variables, and measuring the speedup of C++ programs.

## Lecture contents

1. [The fork–join model and parallel regions](./fork-join) — The fork–join model and building OpenMP programs · The parallel region
2. [Variables, loops, and reductions](./scope-loops) — Variable scope · Parallel loops · Reductions
3. [Synchronization, tasks, and simd](./sync-tasks) — Synchronization · Sections and tasks · simd vectorization
4. [Performance, NUMA, and thread affinity](./numa-affinity) — Performance and scalability · The NUMA architecture · Thread affinity
5. [Examples and common mistakes](./case-studies) — Program examples · Common mistakes

## Practice and review

- [Practice](./practice) — 3 worked examples with complete code and output
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
