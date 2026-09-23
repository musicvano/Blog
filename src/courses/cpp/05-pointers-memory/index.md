---
title: "Topic 5. Pointers and memory"
description: "Pointers, references and memory management: the new and delete operators, smart pointers"
sourceHash: "3373b8fe89f4ab24dc28625f8d12ce201395bfc7b5dfd7858d094e858c91e05c"
---

# Topic 5. Pointers, references and memory management: the new and delete operators, smart pointers

**Goal:** learn to distinguish owners from observers; implement linked structures; check buffer bounds and find memory errors

## Lecture contents

1. [Memory and pointers](./pointers) — Memory, objects and storage duration · Pointers and access operations · Arrays and pointer arithmetic
2. [Dynamic memory and its errors](./dynamic-memory) — Manual dynamic memory · Memory errors and diagnostics
3. [Smart pointers](./smart-pointers) — unique_ptr: a single responsible owner · shared_ptr and weak_ptr · A linked list with exclusive ownership
4. [Ownership models and span](./ownership) — A non-owning interface and span · Choosing an ownership model · Analyzing an ownership graph in concrete scenarios
5. [Diagnostic experiments](./experiments) — A buffer experiment: before and after release · How to run a diagnostic experiment · Removing a node without breaking the chain

## Practice and review

- [Practice](./practice) — 3 worked examples with full code and output
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
