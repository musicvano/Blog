---
title: "Узагальнені функції та межі"
description: "Тема 9. Узагальнене програмування: Узагальнені функції та межі"
outline: [2, 3]
---

# Узагальнені функції та межі

## Узагальнені функції та обмеження

У функції параметри типу розміщують перед її назвою: `fun <T> identity(value: T): T = value`. Такий контракт дозволяє повернути те саме значення, але не дозволяє безумовно додати до нього одиницю або звернутися до властивості `length`. Компілятор перевіряє тіло функції для всіх дозволених `T`.

Щоб порівнювати значення, потрібна верхня межа `T : Comparable<T>`. Вона описує необхідну можливість: значення типу `T` можна порівняти з іншим `T`. Саме можливість, а не список конкретних класів, визначає придатність алгоритму.

### Приклад 2. Максимум трьох значень

```kotlin
import java.time.LocalDate

fun <T : Comparable<T>> greatest(a: T, b: T, c: T): T {
    var result = a
    if (b > result) result = b
    if (c > result) result = c
    return result
}

interface Named {
    val name: String
}

data class Candidate(
    override val name: String,
    val score: Int
) : Named, Comparable<Candidate> {
    override fun compareTo(other: Candidate): Int =
        score.compareTo(other.score)
}

fun <T> winnerName(a: T, b: T): String
    where T : Named, T : Comparable<T> =
    if (a >= b) a.name else b.name

fun main() {
    println(greatest(4, 9, 2))
    println(greatest("pear", "apple", "plum"))
    val start = LocalDate.of(2026, 1, 1)
    println(greatest(start, start.plusDays(2), start))
    val first = Candidate("Ada", 90)
    val second = Candidate("Bohdan", 85)
    println(winnerName(first, second))
}
```

```text
9
plum
2026-01-03
Ada
```

Кілька меж записують у `where`. Функція `winnerName` може читати назву завдяки `Named` і порівнювати завдяки `Comparable<T>`. Вона не повинна вимагати конкретного `Candidate`, якщо її алгоритм не використовує інших особливостей цього класу. При рівності приклад повертає першого кандидата: правило розв’язання нічиєї є частиною контракту, хоча не відображене в типах.

Порівняння рядків не є мовним сортуванням українського словника. Воно виконує природний для `String` лексикографічний порядок. Для предметного порядку, незалежного від реалізації `Comparable`, доречний окремий `Comparator`; його застосування вивчатиметься разом із колекціями.

## Nullable-межі й definitely non-null

Без явної межі верхня межа параметра – `Any?`, тому `T` може бути nullable. Межа `T : Any` звужує множину допустимих аргументів до не-null типів. Запис `T?` допускає `null` незалежно від того, чи конкретний аргумент `T` уже nullable.

`T & Any` позначає **definitely non-null** використання параметра, який має nullable верхню межу. Це особливо корисно при реалізації Java-інтерфейсів, де анотації обіцяють не-null результат окремого методу. Це не довільне об’єднання типів і не заміна загального оголошення `T : Any`.

```kotlin
fun <T> orFallback(value: T, fallback: T & Any): T & Any =
    value ?: fallback

fun main() {
    val text = orFallback<String?>(null, "default")
    println(text.length)
}
```

Після виклику `text` не nullable, і `length` доступне без `?.`. Якщо алгоритм має коректно зберігати відсутнє значення, не слід додавати межу `Any` лише для зручності. Спочатку визначають зміст `null`, а вже потім обирають типи та операції.

Узагальнене розширення також оголошує параметр перед назвою. Наприклад, `fun <T> Box<T>.unpack(): T = value` працює для кожного аргументу `Box`. Розширення не додає поле до об’єкта й не має доступу до приватних деталей. Узагальнена властивість-розширення повинна мати параметр типу, який можна визначити з приймача; вона не створює сховища для нового значення.
