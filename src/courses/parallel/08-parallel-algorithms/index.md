---
title: "Topic 8. Parallel algorithms"
description: "Models and levels of parallelism, grid systems; designing parallel algorithms for vectors, matrices, and numerical methods"
sourceHash: "4bb9f2768ac12918adb627326cba70d926c3466a48ab8a25888249544272541e"
---

# Topic 8. Models and levels of parallelism, grid systems; designing parallel algorithms for vectors, matrices, and numerical methods

**Goal:** become familiar with the levels and models of parallelism (dependency graph, PRAM, work and span, BSP), grid systems, and the PCAM design methodology; learn to distribute vectors and matrices among threads and to parallelize numerical integration, root finding, iterative methods, and the solution of ODE systems with static and dynamic load balancing; master analytical speedup prediction and comparing predictions with measurements.

## Lecture contents

1. [Levels and models of parallelism](./levels-models) — Levels of parallelism · Models of parallel computation
2. [Grid systems and Foster’s methodology](./grid-pcam) — Grid systems · Foster’s PCAM methodology
3. [Data decomposition and integration](./decomposition) — Vector decomposition · Matrix decomposition · Parallel numerical integration
4. [Numerical methods and performance prediction](./numerical-methods) — Parallel solution of nonlinear equations · The conjugate gradient method · Systems of ordinary differential equations · Analytical performance prediction
5. [Examples and common mistakes](./case-studies) — Program examples · Common mistakes

## Practice and review

- [Practice](./practice) — 3 worked examples with complete code and output
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
