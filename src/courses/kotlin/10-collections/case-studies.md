---
title: "Case studies and design mistakes"
description: "Topic 10. Arrays and collections: Case studies and design mistakes"
outline: [2, 3]
sourceHash: "31c6fecd3220923330b28426cc2242c01dbae574d5a336a7c3cbf74dfca94237"
---

# Case studies and design mistakes

## Collection ownership in a domain class

Suppose a student group class has an internal list of names. Returning this list as `List<String>` hides the modifying methods but keeps a live link to future updates. For a report at a specific moment, this can be wrong: an already generated roster suddenly changes its contents after a new addition.

The model below returns a snapshot. The internal `LinkedHashSet` provides both uniqueness and insertion order. The name contract is a non-empty string after trimming spaces; case matters. This decision should be stated explicitly rather than relying on incidental features of string comparison.

```kotlin
class StudyGroup {
    private val names = linkedSetOf<String>()

    fun enroll(rawName: String): Boolean {
        val name = rawName.trim()
        require(name.isNotEmpty()) { "empty name" }
        return names.add(name)
    }

    fun snapshot(): List<String> = names.toList()

    fun remove(name: String): Boolean = names.remove(name.trim())
}

fun main() {
    val group = StudyGroup()
    println(group.enroll("Ada"))
    println(group.enroll(" Ada "))
    val firstReport = group.snapshot()
    group.enroll("Olena")
    println(firstReport)
    println(group.snapshot())
    group.remove("Ada")
    println(firstReport)
}
```

```text
true
false
[Ada]
[Ada, Olena]
[Ada]
```

The snapshot contains strings, which are themselves immutable, so in this example copying the elements is enough. If the string were replaced with `Student(var name: String)`, a snapshot of the structure would not be a snapshot of the students' state. You would need either to make the elements immutable or to return independent DTOs with the required values.

The class also does not expose the concrete `LinkedHashSet` in its signature. If needed, the implementation can be changed while keeping order and uniqueness as the external contract. If a client depends on a concrete collection class, such a replacement becomes much harder.

## Choosing a structure: a request queue

A support queue has an identifier, an arrival time, and a priority. If the oldest request is always served first, `ArrayDeque` directly expresses FIFO. If the highest priority is always taken, a priority queue is needed. If an operator frequently looks up a specific request by id, an additional map may be more useful than repeated linear traversal of the queue.

Multiple indexes create a new invariant: a request must be consistently present in, or absent from, every structure. Premature complexity can cause more bugs than a simple O(n) operation over a few dozen records. So choose the structure by the expected volume and frequency of operations, not only by the best asymptotic estimate.

A priority comparator must define ties. You can compare the priority first and then the arrival sequence number. Do not subtract arbitrary large `Int` values to implement comparison: the difference can overflow. Use `compareTo` or a composition of comparators.

If the priority of an element already in a `PriorityQueue` is changed in place, the structure is not obliged to restore the order automatically. You need to remove the element and insert it with the new key, or use a structure with explicitly supported priority updates. This problem is similar to changing a hashed key: the index depends on a stable property of the element.

## Collection checks that reveal design mistakes

A test with an empty set shows whether the algorithm accidentally accesses the first element. One element tests the loop bounds, two equal elements test the duplicate policy, and two different elements with the same priority test the tie rule. These cases are usually more useful than a large random set without an independent expected result.

For an array, test the first and last indices, as well as -1 and `size`. For a map, separately test a missing key and a nullable value. For a set, use two different instances with equal contents to make sure `equals` and `hashCode` are correct, rather than just adding the same reference again.

For defensive copying, first obtain the result, then modify the source and check the old result. If the elements are mutable, repeat the check by changing an internal field. This clearly shows whether the contract promises a copy of the structure or a deeper snapshot of the domain state.

A report-order test must not depend on the insertion order into a hash table. Add the same records in a different sequence and compare the sorted reports. If insertion order is a requirement, on the contrary, make sure it is preserved after replacing a value and after removal followed by re-adding.
