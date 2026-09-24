---
title: "Topic 16. Actors and Microsoft Orleans"
description: "The actor model and the Microsoft Orleans framework; the CAP theorem and fault tolerance of distributed systems"
sourceHash: "06b1050a07cf19991d7464554bcc45b83af722d14827cfb4d6f7cfe8f02360c4"
---

# Topic 16. The actor model and the Microsoft Orleans framework; the CAP theorem and fault tolerance of distributed systems

**Goal:** become familiar with the actor model, Orleans virtual actors, the CAP theorem, consistency models, and methods of ensuring fault tolerance in distributed systems; learn to create Orleans grains, silos, and clients on .NET 10, store grain state in Redis, and use timers, reminders, and streams; master building a cluster of several silos, verifying recovery after a failure, and client-side retry and circuit breaker strategies.

## Lecture contents

1. [The actor model and the Orleans project](./actors-orleans) — The actor model · Orleans virtual actors · An Orleans project on .NET 10
2. [Grain execution and state](./grain-execution) — The execution model: turns and reentrancy · Grain state and persistence
3. [Timers, streams, and the Orleans cluster](./timers-cluster) — Timers, reminders, streams, and monitoring · The Orleans cluster and silo failures
4. [CAP, consistency, and fault tolerance](./cap-consensus) — The CAP theorem and PACELC · Consistency models and quorums · Consensus: Paxos and Raft · Fault tolerance of distributed systems
5. [Case studies and common mistakes](./case-studies) — Examples of actor-based architectures · Program examples · Common mistakes

## Practice and review

- [Practice](./practice) — 3 worked examples with complete code and output
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
