---
title: "Topic 6. Debugging and errors"
description: "Debugging programs and handling errors: exceptions and std::expected"
sourceHash: "f44d0832193340bc2562b67a678875938278cd1d65779b61aa76891e2b934c38"
---

# Topic 6. Debugging programs and handling errors: exceptions and std::expected

**Goal:** learn to reproduce and localize defects; handle exceptions; return typed errors and check the state after a failure

## Lecture contents

1. [Errors and the debugger](./errors-debugger) — An error as a violation of expected behavior · Working with the Visual Studio debugger
2. [assert and exceptions](./assert-exceptions) — assert, static_assert and context · An exception as a way to pass on a failure
3. [noexcept, optional and expected](./noexcept-expected) — noexcept and safety guarantees · optional and expected
4. [An error-handling strategy](./error-strategy) — Choosing how to report an error · Systematically searching for the cause of a defect · Designing failure messages
5. [Checking guarantees after a failure](./exception-guarantees) — Checking a guarantee after a failure

## Practice and review

- [Practice](./practice) — 3 worked examples with full code
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
