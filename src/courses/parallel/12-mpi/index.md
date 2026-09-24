---
title: "Topic 12. MPI message passing"
description: "Distributed computing with MPI message passing: point-to-point and collective operations, hybrid MPI + OpenMP programs"
sourceHash: "d01dff93f564396e002ccc0ab27d8eff3aa951b622411b99b8b92c6e05cd06cd"
---

# Topic 12. Distributed computing with MPI message passing: point-to-point and collective operations, hybrid MPI + OpenMP programs

**Goal:** become familiar with the distributed-memory model and the MPI standard; learn to build and run Open MPI programs, use blocking and nonblocking point-to-point operations without deadlocks, collective operations (including those for chunks of different sizes), derived types, and Cartesian topologies; master the manager–worker scheme, domain decomposition with halo exchange, hybrid MPI + OpenMP programs with process binding, and scalability measurement.

## Lecture contents

1. [The MPI standard and running programs](./mpi-setup) — The distributed-memory model and the MPI standard · Installing, building, and running
2. [Point-to-point and nonblocking communication](./point-to-point) — The structure of an MPI program · Point-to-point operations · Deadlocks and nonblocking communication
3. [Collective operations and communicators](./collectives) — Collective operations · Derived types, communicators, and topologies · Parallel algorithms with message passing
4. [Hybrid programs and performance](./hybrid-performance) — Hybrid MPI + OpenMP programs · Running on multiple computers · Performance analysis
5. [Examples and common mistakes](./case-studies) — Program examples · Debugging and common mistakes

## Practice and review

- [Practice](./practice) — 3 worked examples with complete code and output
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
