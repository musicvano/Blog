---
title: "Generic functions and bounds"
description: "Topic 9. Generic programming: Generic functions and bounds"
outline: [2, 3]
sourceHash: "9fc4504ba9dd59a4a5b7e26afa158acfa97fa345c8086d9c6df50cce997da7e2"
---

# Generic functions and bounds

## Generic functions and constraints

In a function, type parameters are placed before its name: `fun <T> identity(value: T): T = value`. Such a contract allows returning the same value but does not allow unconditionally adding one to it or accessing a `length` property. The compiler checks the function body for every permitted `T`.

To compare values, you need an upper bound `T : Comparable<T>`. It describes the required capability: a value of type `T` can be compared with another `T`. It is the capability, not a list of concrete classes, that determines whether an algorithm is applicable.

### Example 2. The maximum of three values

```kotlin
import java.time.LocalDate

fun <T : Comparable<T>> greatest(a: T, b: T, c: T): T {
    var result = a
    if (b > result) result = b
    if (c > result) result = c
    return result
}

interface Named {
    val name: String
}

data class Candidate(
    override val name: String,
    val score: Int
) : Named, Comparable<Candidate> {
    override fun compareTo(other: Candidate): Int =
        score.compareTo(other.score)
}

fun <T> winnerName(a: T, b: T): String
    where T : Named, T : Comparable<T> =
    if (a >= b) a.name else b.name

fun main() {
    println(greatest(4, 9, 2))
    println(greatest("pear", "apple", "plum"))
    val start = LocalDate.of(2026, 1, 1)
    println(greatest(start, start.plusDays(2), start))
    val first = Candidate("Ada", 90)
    val second = Candidate("Bohdan", 85)
    println(winnerName(first, second))
}
```

```text
9
plum
2026-01-03
Ada
```

Multiple bounds are written in `where`. The `winnerName` function can read the name thanks to `Named` and compare thanks to `Comparable<T>`. It should not require a concrete `Candidate` if its algorithm does not use other features of that class. On a tie, the example returns the first candidate: the tie-breaking rule is part of the contract, even though it is not reflected in the types.

String comparison is not the linguistic collation of a dictionary. It performs the lexicographic order natural to `String`. For a domain-specific order independent of the `Comparable` implementation, a separate `Comparator` is appropriate; its use will be covered together with collections.

## Nullable bounds and definitely non-null

Without an explicit bound, a parameter's upper bound is `Any?`, so `T` can be nullable. The bound `T : Any` narrows the set of allowed arguments to non-null types. The notation `T?` allows `null` regardless of whether the specific argument `T` is already nullable.

`T & Any` denotes a **definitely non-null** use of a parameter that has a nullable upper bound. This is especially useful when implementing Java interfaces whose annotations promise a non-null result for a particular method. It is not an arbitrary union of types and not a replacement for the general declaration `T : Any`.

```kotlin
fun <T> orFallback(value: T, fallback: T & Any): T & Any =
    value ?: fallback

fun main() {
    val text = orFallback<String?>(null, "default")
    println(text.length)
}
```

After the call, `text` is not nullable, and `length` is available without `?.`. If the algorithm must correctly preserve a missing value, do not add the `Any` bound just for convenience. First define what `null` means, and only then choose the types and operations.

A generic extension also declares its parameter before the name. For example, `fun <T> Box<T>.unpack(): T = value` works for every `Box` argument. An extension does not add a field to the object and has no access to private details. A generic extension property must have a type parameter that can be determined from the receiver; it does not create storage for a new value.
