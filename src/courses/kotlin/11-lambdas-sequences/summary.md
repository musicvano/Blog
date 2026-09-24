---
title: "Summary"
description: "Topic 11. Lambdas and sequences: conclusions and review questions"
sourceHash: "cb39ce84ac398f8a5ae5e8e92c3f866ff5c11bb304be5f5478ec4ff73e2df83c"
---

# Summary

## Conclusions

A function type describes the parameters and result of a function that can be stored, passed, or returned, and lambdas and function references create such values. A closure captures variables of its environment, so a captured `var` makes the order of calls part of the behavior. `inline` substitutes the body of the function and its lambdas at the call site, enabling non-local return, while `noinline` and `crossinline` restrict this substitution. Lambdas with a receiver underlie builders, and the scope functions `let`, `run`, `with`, `apply`, and `also` differ in their receiver and result. The operations `map`, `filter`, `any`, `firstOrNull`, and `sumOf` express transformation, filtering, and aggregation without a manual loop. `groupBy`, `associateBy`, `partition`, and `fold` each have their own policy for repeated keys and empty data, which must be chosen deliberately. Sequences process elements lazily and allow early termination, but they are not always faster than lists. The choice between a loop, collection operations, and a sequence depends on the task, and each option is tested on an empty set, repeated keys, and the limits of numeric types.

## Self-check questions

1. How does a nullable function differ from a nullable result?
2. What does a lambda without an explicit return return?
3. When is an explicit name better than it?
4. Why can a closure keep state after the factory has finished?
5. What does `return@forEach` mean?
6. How does crossinline differ from noinline?
7. Which scope functions return the object itself?
8. How does groupBy differ from associateBy?
9. Why is fold safer than reduce for empty data?
10. Which sequence operations need all the elements?
11. Why can a repeated traversal repeat side effects?
12. When is a functional interface better than a typealias?

## Useful links

- <https://kotlinlang.org/docs/lambdas.html>.
- <https://kotlinlang.org/docs/inline-functions.html>.
- <https://kotlinlang.org/docs/scope-functions.html>.
- <https://kotlinlang.org/docs/collection-grouping.html>.
- <https://kotlinlang.org/docs/sequences.html>.
- <https://kotlinlang.org/docs/type-safe-builders.html>.
