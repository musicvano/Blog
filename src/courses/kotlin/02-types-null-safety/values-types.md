---
title: "Values, types, and conversions"
description: "Topic 2. Types, null safety, and control flow: Values, types, and conversions"
outline: [2, 3]
sourceHash: "b57e9aaeec8033b5fe8ccbd7d2d2a86a1264b6f0c10883fc22cba2f93d343403"
---

# Values, types, and conversions

## Values, variables, and types

A type defines valid values and operations. A variable has a static type even when it is not written after a colon. For example, `val count = 10` means `Int`, while `val count = 10L` means `Long`. Trying to assign a string to an `Int` variable stops compilation before the program runs.

`val` allows one assignment; `var` allows reassignment. Start with `val` and use `var` when change is actually part of the algorithm: a counter, sum, or current loop state. An immutable reference does not always mean the object it points to is immutable; this becomes important in the collections topic.

```kotlin
fun main() {
    val group = "KI-26"
    var present = 18
    present += 2
    val total: Int = 24
    println("$group: $present of $total")
}
```

Output: `KI-26: 20 of 24`. The name `present` explains meaning, while `Int` describes storage. The name itself cannot prove that the count is nonnegative or no greater than `total`; those are domain contract checks.

For a true top-level compile-time constant, use `const val`, such as `const val DAYS = 7`. A local `val` computed from console input is not such a constant. Avoid transliterated names such as `kolvo`: the short, clear `count` conveys the purpose better.

## Basic types and number representation

| **Type** | **Size** | **Purpose** |
| --- | --- | --- |
| `Byte` | 8 bits | Integers from −128 to 127 |
| `Short` | 16 bits | Integers from −32768 to 32767 |
| `Int` | 32 bits | Ordinary integer counters |
| `Long` | 64 bits | Large integers and intermediate products |
| `Float` | 32 bits | Binary floating-point numbers |
| `Double` | 64 bits | The main floating-point type in the examples |
| `Boolean` | Logical | `true` or `false` |
| `Char` | UTF-16 | One code unit |
| `String` | Sequence | Text |

`Int` ranges from −2147483648…2147483647. The literal `1_000_000` is easier to read than an uninterrupted series of digits. The suffix `L` denotes `Long`, and `f` denotes `Float`; `0xFF` is hexadecimal and `0b1010` is binary. The literal `1.0` has type `Double`.

Unsigned `UInt` and `ULong` do not store negative values, but they still have a limited number of bits. They do not make arbitrary arithmetic exact or overflow-safe. We use `Int`/`Long` for ordinary teaching counters to avoid mixing types unnecessarily.

`Double` stores approximations of many decimal fractions. Consequently, financial amounts in problems with exact kopiykas are better stored as integer `Long` values; fractional models are used where error and rounding are explicitly defined.

```kotlin
fun main() {
    println(Int.MAX_VALUE)
    val x = 0.1 + 0.2
    println(x)
    println(kotlin.math.abs(x - 0.3) < 1e-12)
    val cents = 125L * 3
    println("Kopiykas: $cents")
}
```

Output: `2147483647`, `0.30000000000000004`, `true`, `Kopiykas: 375`. The tolerance `1e-12` was chosen only for this small example; there is no universal tolerance for all units and scales. Relative and absolute error should relate to the meaning of the measurement.

## Conversions and overflow

Kotlin does not generally allow implicit assignment of `Int` to `Long`: use `toLong()`. However, overloaded arithmetic operations allow certain combinations of numeric types. Check the result type instead of guessing.

```kotlin
fun main() {
    val count = 50000
    val unsafe = count * count
    val safe = count.toLong() * count
    println(unsafe)
    println(safe)
    println(3.9.toInt())
    println((-3.9).toInt())
}
```

Output: `-1794967296`, `2500000000`, `3`, `-3`. Overflow has already occurred before assignment to `unsafe`. Converting an already incorrect product to `Long` cannot recover lost information. Widen one operand before multiplying.

For a floating-point number, `toInt()` truncates toward zero. Use `roundToInt()` to round to the nearest integer, or `ceil` and `floor` to always round upward or downward. Choose the rule according to the contract; for example, the required number of boxes is rounded up.

An external string can be converted with `toIntOrNull()` or `toDoubleOrNull()`. A failed operation returns `null`, which the program must handle. For `Double`, also check `isFinite()`: `NaN` and infinity may formally be numeric values, but not valid measurements.

::: info Screenshot
Debug Int product versus Long product; show actual values.
:::

Figure 2.1. Product type and Int overflow in the debugger {.caption}
