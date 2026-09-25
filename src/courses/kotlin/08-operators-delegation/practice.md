---
title: "Practice"
description: "Topic 8. Operations and delegation: worked examples"
outline: [2, 3]
sourceHash: "bf8bf455da9e0fc0875f24cf09ba0796e241356be8fe74b7c3b323638e6bb6ba"
---

# Practice

## Example 1. Money in cents

The immutable Money type supports addition, subtraction, multiplication by a non-negative count, and natural ordering. Allowed values are 0..1 billion cents; a check before multiplication prevents overflow. The difference cannot be negative.

```kotlin
data class Money(val cents: Long) : Comparable<Money> {
    init { require(cents in 0..1_000_000_000L) }

    operator fun plus(other: Money): Money {
        require(other.cents <= 1_000_000_000L - cents)
        return Money(cents + other.cents)
    }

    operator fun minus(other: Money): Money {
        require(other.cents <= cents)
        return Money(cents - other.cents)
    }

    operator fun times(count: Int): Money {
        require(count >= 0)
        if (count == 0) return Money(0)
        require(cents <= 1_000_000_000L / count)
        return Money(cents * count)
    }

    override fun compareTo(other: Money): Int =
        cents.compareTo(other.cents)
}

fun main() {
    val a = Money(1250)
    val b = Money(250)
    println((a + b).cents)
    println((a - b).cents)
    println((b * 3).cents)
    println(a > b)
    println(a.cents)
}
```

```text
1500
1000
750
true
1250
```

## Example 2. A validated string delegate

Trimmed normalizes the initial and new values in the same way. A string that is empty after trimming, or longer than 20 characters, is rejected. The check runs before assignment, so the previous string is kept after an exception. The delegate is not a shared singleton: each Profile creates its own instance.

```kotlin
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty

class Trimmed(initial: String) : ReadWriteProperty<Any?, String> {
    private var text = checked(initial)

    private fun checked(value: String): String {
        val clean = value.trim()
        require(clean.isNotEmpty() && clean.length <= 20)
        return clean
    }

    override fun getValue(
        thisRef: Any?, property: KProperty<*>
    ): String = text

    override fun setValue(
        thisRef: Any?, property: KProperty<*>, value: String
    ) {
        text = checked(value)
    }
}

class Profile(name: String) {
    var name: String by Trimmed(name)
}

fun main() {
    val profile = Profile(" Olena ")
    println(profile.name)
    profile.name = " Taras "
    try {
        profile.name = "   "
    } catch (e: IllegalArgumentException) {
        println("Rejected")
    }
    println(profile.name)
}
```

```text
Olena
Rejected
Taras
```

## Example 3. A log of direct calls

The decorator logs successful direct calls to add and delegates label without duplicating the implementation. The counter and the log buffer belong to the wrapper. An operation with invalid arguments does not end up in the log of successful computations.

```kotlin
interface Calculator {
    fun add(a: Int, b: Int): Int
    fun label(): String
}

class BasicCalculator : Calculator {
    override fun add(a: Int, b: Int): Int {
        require(a in -1000..1000 && b in -1000..1000)
        return a + b
    }

    override fun label(): String = "Study calculator"
}

class LoggedCalculator(private val inner: Calculator) :
    Calculator by inner {
    private val events = mutableListOf<String>()

    override fun add(a: Int, b: Int): Int {
        val result = inner.add(a, b)
        events.add("$a + $b = $result")
        return result
    }

    fun history(): List<String> = events.toList()
}

fun main() {
    val calculator = LoggedCalculator(BasicCalculator())
    println(calculator.label())
    println(calculator.add(2, 3))
    println(calculator.add(-1, 4))
    for (event in calculator.history()) println(event)
}
```

```text
Study calculator
5
3
2 + 3 = 5
-1 + 4 = 3
```
