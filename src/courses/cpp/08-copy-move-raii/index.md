---
title: "Topic 8. Copy, move, RAII"
description: "Copying and moving objects, the RAII idiom, and the rules of zero, three, and five"
sourceHash: "1bb17f21093f76e25110e9ae851992e93cd1d6a225eb7c6b5dc4016138e7c59f"
---

# Topic 8. Copying and moving objects, the RAII idiom, and the rules of zero, three, and five

**Goal:** learn to apply the concepts of the topic “Copying and moving objects, the RAII idiom, and the rules of zero, three, and five” in console projects; justify invariants and the contracts of operations; test both ordinary and edge cases.

## Lecture contents

1. [Copy and move](./copy-move) — Copying a value and copying an address · Move and noexcept
2. [RAII and the rules of zero, three, and five](./raii-rules) — RAII and the scope boundary · The rules of zero, three, and five
3. [Value categories and copy-and-swap](./value-categories) — Value categories and references · Copy-and-swap and the exception guarantee · Returning values and copy elision · RAII for state and transactions
4. [Case studies and common mistakes](./case-studies) — Checking the owner of a resource · A step-by-step audit of assignment for an owned buffer · A scenario matrix for the rule of five · How to choose a resource for an RAII wrapper · What value should remain after a move · Checking the strong guarantee without triggering undefined behavior · From a local guard to a composite operation

## Practice and review

- [Practice](./practice) — 3 worked examples with full code and output
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
