---
title: "Contracts and boundary checks"
description: "Topic 2. Types, null safety, and control flow: Contracts and boundary checks"
outline: [2, 3]
sourceHash: "88c09e9d35b6935f709bc922fdfa4a756a0baba7328ca211327f59e586cda529"
---

# Contracts and boundary checks

## Contracts and boundary checks

### Example. Finding the greatest common divisor

The Euclidean algorithm replaces a pair of positive numbers `(a, b)` with `(b, a % b)` until the second component is zero. This preserves the common divisors. For a positive divisor, the remainder is smaller than the divisor, so the process terminates.

```kotlin
fun main() {
    print("First number 1–1000000: ")
    val first = readlnOrNull()?.toIntOrNull()
    print("Second number 1–1000000: ")
    val second = readlnOrNull()?.toIntOrNull()
    if (first == null || second == null ||
        first !in 1..1000000 || second !in 1..1000000
    ) {
        println("Two positive integers are required")
        return
    }
    var a: Int = first
    var b: Int = second
    var steps = 0
    while (b != 0) {
        val remainder = a % b
        a = b
        b = remainder
        steps++
    }
    println("GCD: $a")
    println("Steps: $steps")
}
```

For `84` and `30`, the GCD is `6` and the step count is `3`. Intermediate pairs are `(30,24)`, `(24,6)`, and `(6,0)`. The temporary variable `remainder` is needed to avoid losing the old value of `a` before computing the remainder.

For two equal numbers, the algorithm takes one step. When one number divides the other, the result should equal the smaller one. Zero is rejected by this contract; generalizing the algorithm to zeros would require a separate definition for `(0,0)`.

### Example. Checking for a prime number

A number is prime if it is greater than one and has only 1 and itself as divisors. There is no need to check every number up to `n - 1`: if a nontrivial pair of divisors exists, one does not exceed the square root.

```kotlin
fun main() {
    print("Number 0–1000000000: ")
    val n = readlnOrNull()?.toIntOrNull()
    if (n == null || n !in 0..1000000000) {
        println("Invalid number")
        return
    }
    var prime = n >= 2
    var divisor = 2
    while (prime && divisor <= n / divisor) {
        if (n % divisor == 0) {
            prime = false
        } else {
            divisor++
        }
    }
    println(if (prime) "Prime" else "Not prime")
}
```

For `97`, the program prints `Prime`; for `49`, `Not prime`. The condition `divisor <= n / divisor` avoids overflow in `divisor * divisor`. The divisor starts at 2, so division by zero cannot occur.

Check 0, 1, 2, 3, 4, 49, and 97. The square of a prime is especially important: an incorrect strict inequality instead of `<=` can miss the only required divisor. The `prime` flag changes only after compositeness has been proved.

### Example. Normalizing a direction

Given an integer angle from −1000000 to 1000000 degrees, obtain the equivalent angle 0–359. The ordinary remainder of a negative angle can be negative, so add a full turn before taking the remainder again.

```kotlin
fun main() {
    print("Angle in degrees: ")
    val angle = readlnOrNull()?.toIntOrNull()
    if (angle == null || angle !in -1000000..1000000) {
        println("Invalid angle")
        return
    }
    val normal = ((angle % 360) + 360) % 360
    val direction = when (normal) {
        0 -> "north"
        90 -> "east"
        180 -> "south"
        270 -> "west"
        else -> "intermediate direction"
    }
    println("$normal: $direction")
}
```

For `-90`, the result is `270: west`; for `720`, `0: north`. Here, angles are measured clockwise from north. The convention is often different in a mathematical coordinate system, so document it.

Notice that the normalization expression first reduces the value's magnitude. Adding 360 to an arbitrary maximum-sized `Int` could overflow; adding it to a remainder of 0–359 is safe. Operation order is part of correctness.

![Invariant and termination of the Euclidean loop](./images/06-idea-loop-state.png)

Figure 2.7. Invariant and termination of the Euclidean loop {.caption}

### Building a test table

To stop a search in two nested loops, use a label. Find the first pair of integer coordinates 1–5 whose sum is 8. Traversal order is part of the definition of the “first” pair.

```kotlin
fun main() {
    var found = false
    outer@ for (row in 1..5) {
        for (column in 1..5) {
            if (row + column == 8) {
                println("$row, $column")
                found = true
                break@outer
            }
        }
    }
    if (!found) println("No pair found")
}
```

Output: `3, 5`. An ordinary `break` would exit only the inner loop, and the search would continue with the next row. The label explicitly identifies the intended loop. After moving the search into a separate function in Topic 3, an early `return` will often be a simpler way to stop.

`do-while` is appropriate for a menu because it must appear at least once. Below, EOF also ends the program; an unknown command does not change state.

```kotlin
fun main() {
    var command: String
    do {
        println("1 – help; 0 – exit")
        command = readlnOrNull() ?: "0"
        when (command) {
            "1" -> println("Educational menu example")
            "0" -> println("Finished")
            else -> println("Unknown command")
        }
    } while (command != "0")
}
```

For input `1`, then `0`, the menu appears twice: the first command prints help, and the second prints `Finished`. No input gives one menu display and a clean exit rather than infinite repetition.

Input validation has several independent stages: a line exists, it can be converted, the value is finite, it belongs to the range, and the units match the formula. A successful `toDoubleOrNull` does not replace the final stages.

For the range 1–100, check 0, 1, 100, 101, a nonnumeric string, and end of input. For a loop, check 0, 1, and several iterations. For `when`, check every branch and neighboring values around boundaries. For floating-point numbers, check `NaN`, infinity, and a valid zero.

When debugging, inspect the loop invariant as well as the final total. For example, after each iteration, `count` equals the number of accepted values and `sum` equals their sum. An invalid line must not change either quantity.

Official sources: <https://kotlinlang.org/docs/numbers.html>, <https://kotlinlang.org/docs/null-safety.html>, <https://kotlinlang.org/docs/control-flow.html>, <https://kotlinlang.org/docs/typecasts.html>.
