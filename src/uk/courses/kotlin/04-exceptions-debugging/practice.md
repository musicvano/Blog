---
title: "Практика"
description: "Тема 4. Винятки, Result, налагодження: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Конвертер температур

Програма приймає з аргументів температуру в °C від −273.15 до 10000 і друкує кельвіни. Предметна функція має передумову, а CLI окремо перевіряє формат і кількість аргументів.

```kotlin
import java.util.Locale
import kotlin.system.exitProcess

fun kelvin(celsius: Double): Double {
    require(celsius.isFinite()) { "Температура нескінченна" }
    require(celsius in -273.15..10000.0) { "Поза межами" }
    return celsius + 273.15
}

fun run(args: Array<String>): Int {
    if (args.size != 1) {
        System.err.println("Потрібна одна температура у °C")
        return 2
    }
    val value = args[0].toDoubleOrNull()
    if (value == null) {
        System.err.println("Потрібне число з крапкою")
        return 2
    }
    return try {
        val result = kelvin(value)
        val locale = Locale.forLanguageTag("uk-UA")
        println(String.format(locale, "%.2f K", result))
        0
    } catch (error: IllegalArgumentException) {
        System.err.println(error.message)
        2
    }
}

fun main(args: Array<String>) {
    exitProcess(run(args))
}
```

Аргумент `0` дає `273,15 K` і код 0. `abc`, `NaN`, `-274` або відсутній аргумент дають stderr і код 2 без успішного результату. Виклик `exitProcess` розташовано після повернення з `run`; усі локальні ресурси мали б завершити роботу до цієї точки.

## Приклад 2. Атомарність навчального переказу

Початкові баланси задаються цілими копійками. Функція не змінює рахунків: вона повертає нову пару лише після перевірки всіх умов. Це навчальна модель без бази даних.

```kotlin
fun transfer(from: Long, to: Long, amount: Long): Pair<Long, Long> {
    require(from in 0..100000000L && to in 0..100000000L) {
        "Неправильний початковий баланс"
    }
    require(amount in 1..100000000L) { "Неправильна сума" }
    require(amount <= from) { "Недостатній залишок" }
    require(to + amount <= 100000000L) { "Перевищено ліміт" }
    return (from - amount) to (to + amount)
}

fun main() {
    var accounts = 10000L to 2000L
    val first = runCatching {
        transfer(accounts.first, accounts.second, 3000)
    }
    first.onSuccess { accounts = it }
    println(accounts)
    val before = accounts
    val failed = runCatching {
        transfer(accounts.first, accounts.second, 9000)
    }
    failed.onSuccess { accounts = it }
    failed.onFailure { println(it.message) }
    check(accounts == before)
    check(accounts.first + accounts.second == 12000L)
    println("Стан після помилки незмінний")
}
```

Результат – `(7000, 5000)`, повідомлення `Недостатній залишок` і підтвердження незмінності стану. Усі можливі суми задано невеликими межами, тому перевірка `to + amount` не переповнює `Long`.

У системі з базою даних одночасні зміни потрібно захищати транзакцією; проста пара в пам’яті не є банківським програмним забезпеченням. Тут вивчається лише порядок валідації та відсутність часткової зміни.

## Приклад 3. Налагодження межі циклу

Функція має обчислювати суму 1…n для n від 0 до 10000. Помилка у вигляді `1..<n` пропускає останній доданок. Нижче наведено виправлену програму з перевірками характерних меж.

```kotlin
fun sumTo(n: Int): Long {
    require(n in 0..10000) { "n поза межами" }
    var total = 0L
    for (i in 1..n) {
        total += i
    }
    return total
}

fun main() {
    check(sumTo(0) == 0L)
    check(sumTo(1) == 1L)
    check(sumTo(5) == 15L)
    check(sumTo(10000) == 50005000L)
    val invalid = runCatching { sumTo(-1) }
    check(invalid.exceptionOrNull() is IllegalArgumentException)
    println("П’ять перевірок пройдено")
}
```

Поставте умовну точку на `i == 5`. Перед додаванням значення `total` має дорівнювати 10, після нього –15. Тимчасово змініть межу на `1..<n` в окремій копії: тест для n=1 або n=5 повинен виявити помилку. Поверніть виправлений код і збережіть перевірки.
