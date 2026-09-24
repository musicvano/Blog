---
title: "Summary"
description: "Topic 10. Arrays and collections: conclusions and review questions"
sourceHash: "2097ab045ecea3b3a27c3266ac1ffab9bb301850b06ec033fa8ce644404eb870"
---

# Summary

## Conclusions

An array has a fixed size, and specialized `IntArray` and similar types avoid boxing values on the JVM. The contents of arrays are compared with `contentEquals`, and the rectangular shape of a two-dimensional array must be checked separately. The collection hierarchy separates reading from modification, so functions accept the minimal sufficient interface. A read-only interface does not make an object immutable, and `toList()` creates a snapshot of the structure but does not copy mutable elements. A list preserves order and duplicates, a set ensures uniqueness by `equals` and `hashCode`, and a map holds one value per key. Keys and elements of hash structures must remain stable with respect to equality, and a collection must not be modified during an ordinary traversal. `ArrayDeque` expresses a stack and a queue, and `PriorityQueue` selection by a comparator, which must define ties. A structure is chosen by its operations, the data volume, and the ownership contract, and it is tested on an empty set, boundaries, duplicates, and snapshot independence.

## Self-check questions

1. How does `Array<Int>` differ from `IntArray`?
2. How do you compare the contents of two arrays?
3. Does `Array<IntArray>` guarantee a rectangular shape?
4. Why does `val` not make a list immutable?
5. What is the difference between a live view and a snapshot?
6. How does `remove` differ from `removeAt`?
7. Why can `subList` be dangerous after the parent changes?
8. What is the relationship between `equals` and `hashCode`?
9. How do you distinguish a missing key from a nullable value?
10. When does `getOrPut` call the initial function again?
11. How do you remove elements during traversal?
12. Why is traversing a PriorityQueue not sorting?

## Useful links

- <https://kotlinlang.org/docs/arrays.html>.
- <https://kotlinlang.org/docs/collections-overview.html>.
- <https://kotlinlang.org/docs/list-operations.html>.
- <https://kotlinlang.org/docs/set-operations.html>.
- <https://kotlinlang.org/docs/map-operations.html>.
