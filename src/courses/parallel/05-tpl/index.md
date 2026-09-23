---
title: "Topic 5. TPL tasks and async/await"
description: "Task parallelism: TPL, cancellation, and exception handling; asynchronous programming with async/await"
sourceHash: "a2c8270c9dea124311bc2661120e665b466c012dee02c64f5db91fc7489cb9b8"
---

# Topic 5. Task parallelism: TPL, cancellation, and exception handling; asynchronous programming with async/await

**Goal:** become familiar with the Task Parallel Library (TPL) and the .NET async/await asynchronous programming model; learn to start and combine tasks, build task graphs with continuations, handle AggregateException exceptions, cancel operations using tokens and timeouts, and report progress; master asynchronous streams, TaskCompletionSource, and limits on concurrent asynchronous operations.

## Lecture contents

1. [Tasks, states, and continuations](./task-basics) — From threads to tasks · Task states and waiting · Continuations and task graphs
2. [Exceptions, cancellation, and timeouts](./exceptions-cancellation) — Exception handling · Cooperative cancellation · Progress and timeouts
3. [The async/await model](./async-await) — The async/await model · ValueTask, asynchronous streams, and PeriodicTimer · TaskCompletionSource&lt;T>: turning events into tasks
4. [Limits, antipatterns, and debugging](./async-practices) — Limiting concurrent operations · Asynchronous code antipatterns · Debugging tasks in Rider
5. [Examples and common mistakes](./case-studies) — Program examples · Common mistakes

## Practice and review

- [Practice](./practice) — 3 worked examples with complete code and output
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
