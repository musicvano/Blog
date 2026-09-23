---
title: "Summary"
description: "Topic 2. Types, null safety, and control flow: conclusions and review questions"
sourceHash: "bd0eee58c84e5a0bd9190a3d243a5361f53ca93584c667b3eff22a3362e816a8"
---

# Summary

## Conclusions

Every variable has a static type, even when inferred by the compiler, and `val` only prevents reference reassignment. Numeric types have limited ranges, so account for overflow and `Double` imprecision when choosing types and operation order. Kotlin does not implicitly widen `Int` to `Long`, and rounding rules must be chosen explicitly according to the problem's contract. Nullable types make a potentially absent value part of the contract: `?.`, `?:`, and checks with smart casts handle it safely, while `!!` merely asserts that there is no `null`. `==` compares values, while `===` compares reference identity. `if` and `when` are expressions, so their results must be defined on every path, and branch boundaries are tested with neighboring values. Ranges, loops, `break`, `continue`, and labels determine traversal termination, which should be clear. A reliable program is checked using a table of boundary cases and a loop invariant, not one successful run.

## Self-check questions

1. Why does val not mean that every object is immutable?
2. When must Int be widened to Long?
3. How does null differ from an empty string?
4. Why is !! not input validation?
5. What conditions are required for a smart cast?
6. How does == differ from ===?
7. When is a range's right bound excluded?
8. How can you formulate an accumulator loop's invariant?
