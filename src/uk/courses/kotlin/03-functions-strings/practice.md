---
title: "Практика"
description: "Тема 3. Функції та рядки: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Цілий степінь

Обчислити цілий степінь числа двома способами: звичайною та хвостовою рекурсією. Для основи від -10 до 10 і показника 0..18 результат уміщується в `Long`. У цьому програмному контракті нульовий степінь, включно з `0^0`, визначено як 1.

```kotlin
fun powerRecursive(base: Long, exponent: Int): Long {
    require(base in -10L..10L && exponent in 0..18)
    if (exponent == 0) return 1L
    return base * powerRecursive(base, exponent - 1)
}

fun powerTail(base: Long, exponent: Int): Long {
    require(base in -10L..10L && exponent in 0..18)
    tailrec fun accumulate(remaining: Int, result: Long): Long =
        if (remaining == 0) result
        else accumulate(remaining - 1, result * base)
    return accumulate(exponent, 1L)
}

fun main() {
    println(powerRecursive(2, 10))
    println(powerTail(-2, 3))
    println(powerTail(0, 0))
    for (exponent in 0..18) {
        check(powerRecursive(10, exponent) == powerTail(10, exponent))
    }
    println(powerTail(10, 18))
}
```

```text
1024
-8
1
1000000000000000000
```

У хвостовій версії накопичений результат передається в наступний виклик. Після нього не виконується множення, тому компілятор може прибрати рекурсивний стек. Обидва алгоритми мають O(exponent) арифметичних кроків; оптимізація стека не зменшує цю кількість.

## Приклад 2. Ініціали

Вхід має два або три непорожні слова: прізвище, ім’я та необов’язкове по батькові. Порядок заданий явно. Вихід зберігає прізвище й додає перші літери решти слів. Відновити повне ім’я з ініціалів без зовнішнього довідника неможливо.

```kotlin
fun String.toInitials(): String {
    val parts = trim().split(Regex("\\s+"))
    require(parts.size in 2..3) { "expected two or three words" }
    for (part in parts) {
        require(part.isNotEmpty() && part[0].isLetter())
    }
    return buildString {
        append(parts[0])
        append(' ')
        for (index in 1 until parts.size) {
            append(parts[index][0].uppercaseChar())
            append('.')
        }
    }
}

fun main() {
    println("Шевченко Тарас Григорович".toInitials())
    println("  Lovelace   Ada  ".toInitials())
    check("Коваль Олена".toInitials() == "Коваль О.")
}
```

```text
Шевченко Т.Г.
Lovelace A.
```

Контракт підтримує звичайні літери BMP на початку слова. Складні імена, подвійні прізвища та інші культурні порядки потребують окремої моделі. Не варто стверджувати, що поділ довільного людського імені за пробілами завжди дає правильні частини.

## Приклад 3. Рамка для тексту

Параметр `width` задає внутрішню ширину, `border` – символ рамки. Рядок, довший за ширину, відхиляється. Функція не друкує сама, а повертає рядок, тому її результат можна перевірити або використати як частину іншого звіту.

```kotlin
fun frame(
    text: String,
    width: Int = 20,
    border: Char = '*'
): String {
    require(width in 1..60)
    require(border != '\n' && border != '\r')
    val lines = text.lines()
    for (line in lines) require(line.length <= width)
    val horizontal = border.toString().repeat(width + 4)
    return buildString {
        appendLine(horizontal)
        for (line in lines) {
            append(border)
            append(' ')
            append(line.padEnd(width))
            append(' ')
            appendLine(border)
        }
        append(horizontal)
    }
}

fun main() {
    println(frame("Ada\nKotlin", width = 6, border = '#'))
    println(frame("", width = 1, border = '+'))
}
```

```text
##########
# Ada    #
# Kotlin #
##########
+++++
+   +
+++++
```

Порожній текст трактується як один порожній рядок усередині рамки. Останній рядок результату не має завершального переносу. Ширина рахується через `String.length`, тому для табуляції, emoji й комбінованих графем це не гарантія однакової візуальної ширини термінала; навчальний ввід не повинен містити таких символів.
