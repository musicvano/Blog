---
title: "Практика"
description: "Тема 8. Операції та делегування: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Гроші в копійках

Незмінний тип Money підтримує суму, різницю, множення на невід’ємну кількість і природний порядок. Дозволені значення 0..1 мільярд копійок; перевірка перед множенням запобігає переповненню. Різниця не може бути від’ємною.

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

## Приклад 2. Перевірений делегат рядка

Trimmed нормалізує початкове та нове значення однаково. Порожній після обрізання рядок і довжина понад 20 відхиляються. Перевірка виконується до присвоєння, тому попередній рядок зберігається після винятку. Делегат не є спільним singleton: кожний Profile створює власний екземпляр.

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

## Приклад 3. Журнал прямих викликів

Декоратор журналює успішні прямі виклики add і делегує label без дублювання реалізації. Лічильник та буфер журналу належать обгортці. Операція з неправильними аргументами не потрапляє до журналу успішних обчислень.

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
