---
title: "Topic 3. Thread synchronization"
description: "Race conditions, deadlock, and starvation; thread synchronization tools in C#"
sourceHash: "935c331cf6e150113d4a4a62bda3644a481ed6f2f883df347d15a8a166ced30a"
---

# Topic 3. Race conditions, deadlock, and starvation; thread synchronization tools in C#

**Goal:** understand the causes of race conditions, deadlock, and thread starvation; learn to protect shared data using Interlocked, lock, and Lock and coordinate threads using Monitor condition variables, semaphores, ReaderWriterLockSlim, ManualResetEventSlim, CountdownEvent, and Barrier; master ways to prevent deadlock, diagnose hangs, and measure the cost of synchronization.

## Lecture contents

1. [Race conditions and mutual exclusion](./race-conditions) — Shared state and race conditions · Mutual exclusion requirements · Atomic operations: the Interlocked class
2. [Locks and condition variables](./locks-monitor) — The lock statement, Lock type, and Monitor class · Condition variables: Monitor.Wait, Pulse, PulseAll · Mutex, Semaphore, and SemaphoreSlim
3. [Spin locks and signaling primitives](./spinlocks-signals) — ReaderWriterLockSlim, SpinLock, and SpinWait · Signaling primitives
4. [Deadlock and the cost of synchronization](./deadlock) — Deadlock · Starvation, livelock, priority inversion, and lock convoys · Classic synchronization problems · The cost of synchronization
5. [Examples and common mistakes](./case-studies) — Program examples · Common mistakes

## Practice and review

- [Practice](./practice) — 3 worked examples with complete code and output
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
