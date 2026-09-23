---
title: "Topic 4. Thread-safe collections"
description: "Thread-safe collections, channels, and the producer–consumer pattern; false sharing"
sourceHash: "bde2c458132bcfc44d2439bbbd588b532f86b8aca54d98ee7de65517000ceede"
---

# Topic 4. Thread-safe collections, channels, and the producer–consumer pattern; false sharing

**Goal:** become familiar with .NET thread-safe, immutable, and blocking collections and System.Threading.Channels; learn to perform atomic compound operations and build bounded producer–consumer pipelines with correct completion; master detecting and eliminating false sharing through measurement.

## Lecture contents

1. [Collections and lock-free algorithms](./lock-free) — Ordinary collections in a multithreaded program · Lock-free algorithms
2. [Concurrent and immutable collections](./concurrent-collections) — Concurrent collections · ConcurrentDictionary · Immutable and frozen collections
3. [The producer–consumer pattern and channels](./producer-consumer) — BlockingCollection · The producer–consumer pattern · System.Threading.Channels
4. [Caches, false sharing, and profiling](./false-sharing) — CPU caches and data locality · False sharing · Choosing a data structure · Measurement and profiling
5. [Examples and common mistakes](./case-studies) — Program examples · Common mistakes

## Practice and review

- [Practice](./practice) — 3 worked examples with complete code and output
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
