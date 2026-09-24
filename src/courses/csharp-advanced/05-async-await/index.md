---
title: "Topic 5. Asynchrony with async/await"
description: "Asynchronous programming with async/await in GUI applications"
sourceHash: "a6a108d5316207f75e33d29b2d8766097942a8159f1e266bcc6c17936b9a4a97"
---

# Topic 5. Asynchronous programming with async/await in graphical user interface applications

**Goal:** become familiar with the UI thread, Task objects, and the Windows Forms synchronization context; learn to perform I/O operations and computations asynchronously with async/await and Task.Run, report progress through IProgress&lt;T>, and cancel operations with a token; master running several tasks concurrently, limiting parallelism, handling exceptions, and the asynchronous Windows Forms methods in .NET 10.

## Lecture contents

1. [Tasks, async, and await](./tasks-await) — Why the interface "freezes" · Task and Task&lt;T> · The async and await keywords
2. [Context, computation, and cancellation](./context-cancellation) — The synchronization context · I/O operations and computations · Operation progress and cancellation
3. [Asynchronous streams and multiple tasks](./streams-combinators) — Asynchronous data streams · Several tasks at once
4. [Exceptions and asynchronous form methods](./exceptions-winforms) — Exceptions in asynchronous code · Asynchronous Windows Forms methods in .NET 9–10
5. [Debugging and common mistakes](./debugging-mistakes) — Debugging and common mistakes

## Practice and review

- [Practice](./practice) — 3 worked examples with complete code
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
