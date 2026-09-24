---
title: "Topic 13. Clusters and the Slurm scheduler"
description: "Building a Linux compute cluster with the Slurm job scheduler; tuning for high-performance computing"
sourceHash: "4d2f512eb4af0bcd78545ec1265e8dbcb42efe540b667dba224d6d26d72aed10"
---

# Topic 13. Building a Linux compute cluster with the Slurm job scheduler; tuning for high-performance computing

**Goal:** become familiar with compute cluster architecture and the components of the Slurm scheduler; learn to prepare Ubuntu Server nodes (networking, users, SSH, NFS, time synchronization), install and configure Slurm with MUNGE authentication, and write batch job scripts for sequential, MPI, and hybrid programs, job arrays, and chains of dependent jobs; master node diagnostics, job accounting with sacct, and operating system tuning for high-performance computing.

## Lecture contents

1. [Cluster architecture and nodes](./cluster-nodes) — Compute cluster architecture · Preparing the nodes
2. [SSH and a shared filesystem](./ssh-nfs) — SSH and parallel commands · The NFS shared filesystem
3. [The Slurm scheduler and commands](./slurm) — The Slurm scheduler · User commands
4. [Job scripts and accounting](./job-scripts) — Job scripts · Accounting and scheduling
5. [Configuration, monitoring, and common mistakes](./hpc-tuning) — Operating system tuning for high-performance computing · Monitoring and diagnostics · Scalability of an MPI program · Common mistakes

## Practice and review

- [Practice](./practice) — 3 worked examples with complete code and output
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
