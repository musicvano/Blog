---
title: "Практика"
description: "Тема 9. Узагальнене програмування: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Пара значень

Пара має два незалежні параметри. Операція `swap` повертає нову пару зі зворотним порядком типів, а не змінює поля на місці. Обидва параметри коваріантні: доступні операції лише повертають збережені значення. Не слід додавати setter до такого контракту.

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

Перевірка подвійного обміну є властивістю операції, а не лише прикладом одного очікуваного рядка. Перевірте також два однакові типи й пару з nullable-компонентом. Коваріантність не означає глибоку незмінність об’єктів, на які посилаються поля.

## Приклад 2. Замкнений діапазон

Діапазон містить обидві межі. Конструктор відхиляє зворотний порядок; метод `contains` дозволяє вираз `value in range`. `Range<T>` тут інваріантний, бо параметр використовується і в результатах читання меж, і у вхідному параметрі перевірки.

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

Наявність `Comparable` не гарантує можливості отримати наступне значення. Тому клас не намагається перебирати всі значення між межами. Для перебору потрібна окрема операція кроку, а для дат потрібно визначити одиницю: день, місяць чи рік.

## Приклад 3. Either для перевірки оцінки

Помилка є значенням із поясненням, а успіх містить цілу оцінку. Кожна гілка використовує `Nothing` для відсутнього боку. Вичерпний `when` змушує обробити обидва варіанти, не застосовуючи небезпечних приведень. Введення за межами 0..100 є очікуваною відмовою.

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

Sealed-результат не замінює всі винятки програми. Відсутній файл або порушений внутрішній інваріант можуть мати іншу політику. Важливо заздалегідь визначити, які відмови є звичайними результатами конкретної операції, і не ховати програмні помилки як «невдале введення».
