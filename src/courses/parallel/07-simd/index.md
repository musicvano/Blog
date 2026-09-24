---
title: "Topic 7. SIMD vectorization"
description: "SIMD vectorization in .NET and parallel linear algebra algorithms"
sourceHash: "fdf1028ed2f15326a7e43747d2ee9255c0881003618c3966833fb9279ef1ca43"
---

# Topic 7. SIMD vectorization in .NET and parallel linear algebra algorithms

**Goal:** become familiar with vector registers, SIMD instruction sets, and the vectorization tools of the .NET platform; learn to write vectorized loops with Vector&lt;T> and Vector128/256/512&lt;T>, using masks and tail handling, and to use TensorPrimitives; master combining SIMD with multithreading in linear algebra algorithms, measuring speedup, and verifying results against a scalar version.

## Lecture contents

1. [SIMD and System.Numerics types](./simd-basics) — SIMD in modern processors · The Vector&lt;T&gt; type and System.Numerics types
2. [Fixed-width vectors and intrinsics](./fixed-width-intrinsics) — Fixed-width vectors · Platform intrinsics
3. [Memory, the tail, and TensorPrimitives](./memory-tensor) — Working with memory and handling the tail · The TensorPrimitives library · SIMD and multithreading
4. [Linear algebra and performance](./linear-algebra) — BLAS levels and matrix multiplication · Parallel methods for solving linear systems · Measuring and analyzing performance
5. [Examples and common mistakes](./case-studies) — Program examples · Common mistakes

## Practice and review

- [Practice](./practice) — 3 worked examples with complete code and output
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
