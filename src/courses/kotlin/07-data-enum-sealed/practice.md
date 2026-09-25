---
title: "Practice"
description: "Topic 7. Data classes, enums, sealed: worked examples"
outline: [2, 3]
sourceHash: "a249ab013afee628157fde8cc0f235265c5c3f149acf5f2e6106968c3c2996ab"
---

# Practice

## Example 1. Days of the week

A weekend day is identified by a constant property, and the next day by an exhaustive when. Changing declaration order therefore does not change transition semantics. Iterating over entries is useful for building a menu, but ordinal is not a calendar rule.

```kotlin
enum class Day(val weekend: Boolean) {
    MON(false), TUE(false), WED(false), THU(false),
    FRI(false), SAT(true), SUN(true);

    fun next(): Day = when (this) {
        MON -> TUE
        TUE -> WED
        WED -> THU
        THU -> FRI
        FRI -> SAT
        SAT -> SUN
        SUN -> MON
    }
}

fun main() {
    var count = 0
    for (day in Day.entries) {
        if (day.weekend) {
            println("${day.name}: rest")
            count++
        }
    }
    println("weekends=$count")
    println("after Sunday: ${Day.SUN.next()}")
}
```

```text
SAT: rest
SUN: rest
weekends=2
after Sunday: MON
```

## Example 2. A local payment result

The function does not contact a bank or change accounts. It validates educational numbers and returns one of three meaningful results. An input error is separate from an expected decline due to insufficient balance.

```kotlin
sealed interface PaymentOutcome
data class Success(val remaining: Long) : PaymentOutcome
data class Declined(val missing: Long) : PaymentOutcome
data class Invalid(val reason: String) : PaymentOutcome

fun pay(balance: Long, amount: Long): PaymentOutcome {
    if (balance < 0 || amount <= 0) {
        return Invalid("Invalid input")
    }
    return if (amount <= balance) {
        Success(balance - amount)
    } else {
        Declined(amount - balance)
    }
}

fun describe(result: PaymentOutcome): String = when (result) {
    is Success -> "remaining=${result.remaining}"
    is Declined -> "missing=${result.missing}"
    is Invalid -> result.reason
}

fun main() {
    println(describe(pay(1000, 250)))
    println(describe(pay(1000, 1500)))
    println(describe(pay(1000, 0)))
}
```

```text
remaining=750
missing=500
Invalid input
```

## Example 3. A factory with an educational counter

The object stores one counter within the process. The example is single-threaded; it does not guarantee uniqueness across processes, after a restart, or during concurrent calls from multiple threads. The title is validated before obtaining the next ID, so a failure does not consume a number.

```kotlin
@JvmInline
value class TicketId(val value: Long)

object IdSource {
    private var last = 0L

    fun next(): TicketId {
        check(last < Long.MAX_VALUE)
        last++
        return TicketId(last)
    }
}

class Ticket private constructor(
    val id: TicketId,
    val title: String
) {
    companion object {
        fun create(raw: String): Ticket {
            val title = raw.trim()
            require(title.isNotEmpty())
            return Ticket(IdSource.next(), title)
        }
    }

    override fun toString(): String = "${id.value}: $title"
}

fun main() {
    println(Ticket.create(" First "))
    try {
        Ticket.create("  ")
    } catch (e: IllegalArgumentException) {
        println("Rejected")
    }
    println(Ticket.create("Second"))
}
```

```text
1: First
Rejected
2: Second
```
