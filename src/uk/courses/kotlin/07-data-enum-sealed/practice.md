---
title: "Практика"
description: "Тема 7. Класи даних, переліки, sealed: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Дні тижня

Вихідний день визначено властивістю константи, а наступний день – вичерпним when. Тому зміна порядку оголошення не змінить зміст переходів. Перебір entries придатний для побудови меню, але ordinal не є календарним правилом.

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

## Приклад 2. Локальний результат оплати

Функція не звертається до банку й не змінює рахунків. Вона перевіряє навчальні числа та повертає один із трьох змістовних результатів. Помилка введення відокремлена від очікуваної відмови через недостатній залишок.

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

## Приклад 3. Фабрика з навчальним лічильником

Object зберігає один лічильник у межах процесу. Приклад однопотоковий; він не гарантує унікальності між процесами, після перезапуску або під час одночасних викликів потоків. Перевірка назви виконується до отримання наступного ID, тому відмова не витрачає номер.

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
