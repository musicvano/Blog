---
title: "Practice"
description: "Topic 9. Generic programming: worked examples"
outline: [2, 3]
sourceHash: "7ca2356f977ba3c4f7c9b9a7e793e04e49e2f4a394b695b44decd48b20da0c1d"
---

# Practice

## Example 1. A pair of values

The pair has two independent parameters. The `swap` operation returns a new pair with the types in reverse order rather than changing the fields in place. Both parameters are covariant: the available operations only return the stored values. Do not add a setter to such a contract.

```kotlin
data class Duo<out A, out B>(val first: A, val second: B) {
    fun swap(): Duo<B, A> = Duo(second, first)
}

fun main() {
    val original = Duo("Ada", 95)
    val reversed: Duo<Int, String> = original.swap()
    val general: Duo<Any, Any> = original
    println(reversed)
    println(general)
    check(original.swap().swap() == original)
    val absent = Duo<String?, Int>(null, 0)
    println(absent.swap())
}
```

```text
Duo(first=95, second=Ada)
Duo(first=Ada, second=95)
Duo(first=0, second=null)
```

The double-swap check is a property of the operation, not just an example of one expected line. Also test two identical types and a pair with a nullable component. Covariance does not mean deep immutability of the objects the fields refer to.

## Example 2. A closed range

The range contains both bounds. The constructor rejects reversed order; the `contains` method enables the expression `value in range`. `Range<T>` is invariant here because the parameter is used both in the results of reading the bounds and in the input parameter of the check.

```kotlin
import java.time.LocalDate

class Range<T : Comparable<T>>(
    val start: T,
    val endInclusive: T
) {
    init {
        require(start <= endInclusive) { "reversed range" }
    }

    operator fun contains(value: T): Boolean =
        value >= start && value <= endInclusive
}

fun main() {
    val marks = Range(0, 100)
    println("${0 in marks} ${100 in marks} ${101 in marks}")
    val dates = Range(
        LocalDate.of(2026, 9, 1),
        LocalDate.of(2026, 9, 30)
    )
    println(LocalDate.of(2026, 9, 17) in dates)
    try {
        Range(10, 2)
    } catch (error: IllegalArgumentException) {
        println(error.message)
    }
}
```

```text
true true false
true
reversed range
```

Having `Comparable` does not guarantee the ability to obtain the next value. So the class does not try to iterate over all values between the bounds. Iteration needs a separate step operation, and for dates you need to define the unit: day, month, or year.

## Example 3. Either for validating a grade

An error is a value with an explanation, and a success contains an integer grade. Each branch uses `Nothing` for the absent side. An exhaustive `when` forces both variants to be handled without unsafe casts. Input outside 0..100 is an expected rejection.

```kotlin
sealed interface Either<out L, out R> {
    data class Left<L>(val error: L) : Either<L, Nothing>
    data class Right<R>(val value: R) : Either<Nothing, R>
}

fun grade(text: String): Either<String, Int> {
    val value = text.toIntOrNull()
        ?: return Either.Left("not an integer")
    if (value !in 0..100) return Either.Left("outside 0..100")
    return Either.Right(value)
}

fun show(text: String): String = when (val result = grade(text)) {
    is Either.Left -> "error: ${result.error}"
    is Either.Right -> "grade: ${result.value}"
}

fun main() {
    println(show("90"))
    println(show("101"))
    println(show("nine"))
    check(grade("0") == Either.Right(0))
    check(grade("100") == Either.Right(100))
}
```

```text
grade: 90
error: outside 0..100
error: not an integer
```

A sealed result does not replace all of a program's exceptions. A missing file or a broken internal invariant may have a different policy. It is important to decide in advance which failures are ordinary results of a particular operation, and not to hide programming errors as "invalid input".
