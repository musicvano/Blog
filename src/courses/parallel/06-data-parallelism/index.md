---
title: "Topic 6. Data parallelism and PLINQ"
description: "Data parallelism: parallel loops, PLINQ, data partitioning; parallel sorting and reduction algorithms"
sourceHash: "f3013281505e428e9679f23b532c9ca1f78f46959dda9bb79a5f9e17c52e1252"
---

# Topic 6. Data parallelism: parallel loops, PLINQ, data partitioning; parallel sorting and reduction algorithms

**Goal:** become familiar with data parallelism on .NET; learn to parallelize loops with Parallel.For and Parallel.ForEach using thread-local state, choose a data partitioning strategy, and write PLINQ queries with aggregation; master parallel reduction, prefix sum, and sorting algorithms, speedup and efficiency measurement, and result verification against a sequential version.

## Lecture contents

1. [Parallel loops with the Parallel class](./parallel-loops) — Data parallelism and task parallelism · Parallel.For and Parallel.ForEach loops
2. [Parallel.Invoke and data partitioning](./invoke-partitioning) — Parallel.Invoke, Parallel.ForAsync, and Parallel.ForEachAsync · Data partitioning
3. [PLINQ and aggregation](./plinq-aggregation) — PLINQ: parallel queries · Aggregation: associativity and commutativity
4. [Reduction, sorting, and performance](./reduction-sorting) — Parallel reduction and prefix sum · Parallel sorting algorithms · Other data parallelism patterns · Performance analysis
5. [Examples and common mistakes](./case-studies) — Program examples · Common mistakes

## Practice and review

- [Practice](./practice) — 3 worked examples with complete code and output
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
