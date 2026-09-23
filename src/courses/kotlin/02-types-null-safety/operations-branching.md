---
title: "Operations and branching"
description: "Topic 2. Types, null safety, and control flow: Operations and branching"
outline: [2, 3]
sourceHash: "47d721975413e067668a308ce492e56670f861e7ed1a8f8a73467dc6b4353995"
---

# Operations and branching

## Arithmetic, equality, and logical operations

For integers, `7 / 2` equals `3`; `7 / 2.0` equals `3.5`. The remainder `%` can be negative for a negative dividend: `-7 % 3` yields `-1`. If you need a nonnegative index for a positive modulus, choose the appropriate `mod` rule and check negative input with a separate test.

`==` compares values through `equals`; `===` compares reference identity. Boxed JVM numbers can be cached, so `===` is unsuitable for testing numeric equality. String contents are also compared with `==`.

The logical operators `&&`, `||`, and `!` work with `Boolean`. An integer does not automatically become a truth value. Bitwise operations use the named functions `and`, `or`, `xor`, `shl`, `shr`, and `ushr`. These form a different group of operations from logical conditions.

```kotlin
fun main() {
    val permissions = 0b0101
    val canRead = (permissions and 0b0001) != 0
    val canWrite = (permissions and 0b0010) != 0
    println("read=$canRead; write=$canWrite")
    println(1 shl 3)
}
```

Output: `read=true; write=false`, then `8`. In a simple problem, do not encode many states as bits when separate boolean variables are clearer. A bitmask is appropriate when it is part of the contract.

## if as an expression

A conditional expression returns the value of the last expression in the selected branch. There is no separate ternary `?:` operator in the sense used by other languages: in Kotlin, `?:` handles `null`, while `if` selects based on a condition.

```kotlin
fun main() {
    val amount = 1200
    val fee = if (amount >= 1000) 0 else 50
    println("Delivery: $fee UAH")
    val status = if (fee == 0) {
        "free delivery"
    } else {
        "paid delivery"
    }
    println(status)
}
```

Output: `Delivery: 0 UAH` and `free delivery`. The rate is educational. Check 999 and 1000, since the boundary is where `>` and `>=` are easiest to confuse. The expression's branches must produce a consistent type together.

If `if` merely performs an action, an `else` branch is not always needed. If its result is assigned to a variable, define the result on every possible path. Do not add nested `if` statements when an early return can reject invalid input separately.

## when and exhaustive branching

A `when` with a subject compares the value against branch conditions. A branch can list several values, a range, or a type check. The first matching branch executes; there is no subsequent fall-through.

```kotlin
fun main() {
    val score = 84
    val grade = when (score) {
        in 90..100 -> "A"
        in 82..89 -> "B"
        in 74..81 -> "C"
        in 64..73 -> "D"
        in 60..63 -> "E"
        in 35..59 -> "FX"
        in 0..34 -> "F"
        else -> "error"
    }
    println(grade)
}
```

The result is `B`. These thresholds are the teaching problem's contract. `else` handles values outside 0–100 rather than hiding them as the lowest grade. In a `when` without a subject, branches are boolean conditions: this form is useful for different properties of one input.

In modern Kotlin, you can add a guard condition after the primary condition. It is checked only when the primary condition has already matched:

```kotlin
fun main() {
    val value: Any = "Kotlin"
    val label = when (value) {
        is String if value.length > 3 -> "long text"
        is String -> "short text"
        else -> "another type"
    }
    println(label)
}
```

Output: `long text`. Do not complicate a simple numeric choice with this syntax. At this stage, it is more important to formulate nonoverlapping branches correctly and test values at every boundary.

::: info Screenshot
Debug score=82 then81; inspect selected branch and grade.
:::

Figure 2.4. Checking a when branch at a boundary value {.caption}
