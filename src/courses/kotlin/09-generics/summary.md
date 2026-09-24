---
title: "Summary"
description: "Topic 9. Generic programming: conclusions and review questions"
sourceHash: "453147099546746f0c25033153e33fe6f1de36ceee58ecda4b6c0bdfdc9e4d02"
---

# Summary

## Conclusions

A type parameter makes the value's type part of a class's or function's contract, and the compiler checks this contract without casts. Upper bounds, including `T : Comparable<T>` and multiple bounds in `where`, describe the capabilities the algorithm needs rather than concrete classes. By default a parameter can be nullable, so the meaning of `null` is defined before choosing the bound `T : Any` or `T & Any`. An ordinary generic class is invariant: an element subtype does not make the container a subtype if it can be written through. The `out` and `in` markers at the declaration site and projections at the use site open only the safe direction of access, and `Box<*>` denotes an unknown but consistent argument. Because of type erasure on the JVM, an `is T` check is possible only for a `reified` parameter of an inline function, and it does not check the contents of nested generics. Sealed results with `Nothing` express success and failure, whereas `typealias` merely gives another name to the same type. The contract of a generic API is verified both by runnable examples and by separate examples that must not compile.

## Self-check questions

1. How does a type parameter differ from a type argument?
2. Which upper bound is used by default?
3. When is `T : Any` better than a nullable parameter?
4. What does `T & Any` mean?
5. Why is a container with reading and writing invariant?
6. In which direction can `Source<Cat>` be assigned?
7. Why is a consumer of animals suitable for cats?
8. How does a projection differ from declared variance?
9. Why is `Box<*>` not the same as `Box<Any?>`?
10. Which checks does type erasure not allow?
11. What does reified not guarantee for nested collections?
12. Why does an alias not create a new domain type?

## Useful links

- <https://kotlinlang.org/docs/generics.html>.
- <https://kotlinlang.org/docs/inline-functions.html>.
- <https://kotlinlang.org/docs/type-aliases.html>.
- <https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.reflect/type-of.html>.
