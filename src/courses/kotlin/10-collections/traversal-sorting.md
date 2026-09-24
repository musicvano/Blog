---
title: "Traversal, queues, and sorting"
description: "Topic 10. Arrays and collections: Traversal, queues, and sorting"
outline: [2, 3]
sourceHash: "582d18cf6b9e313b13e95a314c4146f88f6ea30b73216e557af949c05df34a25"
---

# Traversal, queues, and sorting

## Safe traversal and modification

The loop `for (item in collection)` uses an iterator. `withIndex()` adds the index and value, and `indices` is needed when the position is used for writing. Avoid repeatedly accessing `list[index]` if the particular list implementation does not promise efficient random access.

A structural modification of a collection during an ordinary traversal can cause `ConcurrentModificationException`. The name does not mean that two threads were necessarily involved: an incorrect removal in a single loop is enough. This is a diagnostic of a bug, not a synchronization mechanism.

```kotlin
fun main() {
    val numbers = mutableListOf(1, 2, 3, 4)
    val iterator = numbers.iterator()
    while (iterator.hasNext()) {
        if (iterator.next() % 2 == 0) iterator.remove()
    }
    println(numbers)
}
```

`MutableIterator.remove()` removes the element just returned by `next()` and keeps this iterator's state consistent. Do not call `remove` twice after a single `next`. Another safe approach is to build a new collection of the filtered elements; we study it in Topic 11.

## ArrayDeque as a stack and a queue

The double-ended queue `ArrayDeque<T>` supports insertion and removal at both ends. For FIFO, add at the end and remove from the front; for LIFO, add and remove at the same end. The operation names show the service discipline explicitly.

```kotlin
fun main() {
    val queue = ArrayDeque<String>()
    queue.addLast("A")
    queue.addLast("B")
    println(queue.removeFirst())
    println(queue.removeFirstOrNull())
    println(queue.removeFirstOrNull())
    val stack = ArrayDeque<Int>()
    stack.addLast(10)
    stack.addLast(20)
    println(stack.removeLast())
}
```

Operations with the `OrNull` suffix are convenient for an empty structure. If the collection allows nullable elements, the ambiguity between absence and a stored `null` arises again; it is resolved by the contract. For a priority queue, the JVM provides `java.util.PriorityQueue`. Its `poll` returns the minimal element according to the comparator, but the ordinary iterator does not promise a sorted order of all elements.

## Sorting and choosing an implementation

`sorted()` creates a new list in natural order; `sortedDescending()` reverses the direction. For a mutable list, `sort()` changes the current object. `Comparable` defines a class's natural order, and `Comparator` a separate rule. The expression `compareBy<Person> { it.name }` creates a comparator by key; composing rules in detail comes in the next topic.

| Structure | Typical cost | When it fits |
| --- | --- | --- |
| `ArrayList` | Index O(1), search O(n) | Positional list |
| `HashSet` / `HashMap` | Expected O(1) | Membership, keys |
| `TreeMap` / sorted set | O(log n) | Ordered keys |
| `ArrayDeque` | Ends amortized O(1) | Queue or stack |
| `PriorityQueue` | Insert/remove O(log n) | Minimum by priority |

The estimates depend on the operation, the implementation, and the properties of the keys. Inserting into the middle of an `ArrayList` requires shifting elements, so it is O(n), even though indexed access is constant. Appending at the end is amortized constant: occasionally the internal array grows with copying. A hash table has an expected, not an unconditional, O(1) guarantee.

When interacting with Java, Kotlin may see platform types. Java code can return `null` or modify a collection that Kotlin code perceives through a read-only interface. At a library boundary, check the null and ownership contract. Casting to `MutableList` is not a safe universal way to "unlock" any list.
