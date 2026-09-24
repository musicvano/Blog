---
title: "Topic 9. Generic programming"
description: "Generic programming: generic classes and functions, variance, reified parameters"
sourceHash: "e901a608dbcc9554bf5fca0b0f65fce9ac65fdce209bd8db766fa76cc13742f6"
---

# Topic 9. Generic programming: generic classes and functions, variance, reified parameters

**Goal:** learn to design generic types, specify sufficient constraints, distinguish producers from consumers, and verify both the behavior and the static contract of your own API.

## Lecture contents

1. [Type parameters and generic classes](./type-parameters) — A type parameter as part of the contract · Example 1. A stack on linked nodes
2. [Generic functions and bounds](./generic-functions) — Generic functions and constraints · Nullable bounds and definitely non-null
3. [Variance and projections](./variance) — Invariance: why an element subtype is not enough · Declaration-site variance · Use-site projections
4. [Type erasure and reified](./reified) — Type erasure and reified · Sealed results, Nothing, and aliases
5. [API design and testing](./api-design) — API design: from operations to variance · Verifying contracts without unchecked casts · Generalization and domain identity

## Practice and review

- [Practice](./practice) — 3 worked examples with complete code
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions, self-check questions, and useful links
