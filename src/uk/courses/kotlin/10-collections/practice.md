---
title: "Практика"
description: "Тема 10. Масиви та колекції: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Транспонування матриці

Транспонування міняє місцями індекси рядка і стовпця. Результат має власні внутрішні масиви, тому зміна результату не повинна змінити початкову матрицю. Для порожнього масиву прийнято результат 0×0; інформацію про кількість стовпців у такому поданні окремо не збережено.

```kotlin
fun transpose(matrix: Array<IntArray>): Array<IntArray> {
    if (matrix.isEmpty()) return emptyArray()
    val columns = matrix[0].size
    for (row in matrix) {
        require(row.size == columns) { "ragged matrix" }
    }
    return Array(columns) { column ->
        IntArray(matrix.size) { row -> matrix[row][column] }
    }
}

fun main() {
    val source = arrayOf(intArrayOf(1, 2, 3), intArrayOf(4, 5, 6))
    val result = transpose(source)
    println(result.contentDeepToString())
    result[0][0] = 99
    println(source[0][0])
    check(transpose(emptyArray()).isEmpty())
    try {
        transpose(arrayOf(intArrayOf(1), intArrayOf(2, 3)))
    } catch (error: IllegalArgumentException) {
        println(error.message)
    }
}
```

```text
[[1, 4], [2, 5], [3, 6]]
1
ragged matrix
```

Алгоритм виконує рівно одне копіювання для кожного елемента, тобто O(rows·columns) часу і стільки ж додаткової пам’яті. Подвійне транспонування непорожньої прямокутної матриці має повертати рівний вміст; перевіряйте його через `contentDeepEquals`.

## Приклад 2. Телефонна книга

`TreeMap` упорядковує записи за іменами. Метод `put` повертає попереднє значення, тому дозволяє відрізнити додавання від заміни. Номер зберігається рядком: початковий плюс і нулі мають значення. Навчальний контракт допускає необов’язковий плюс і 7–15 цифр.

```kotlin
import java.util.TreeMap

class PhoneBook {
    private val contacts = TreeMap<String, String>()

    fun put(name: String, phone: String): Boolean {
        require(name.isNotBlank()) { "empty name" }
        val digits = phone.removePrefix("+")
        require(digits.length in 7..15 &&
            digits.all { it in '0'..'9' }) { "invalid phone" }
        return contacts.put(name.trim(), phone) == null
    }

    fun find(name: String): String? = contacts[name.trim()]
    fun remove(name: String): Boolean =
        contacts.remove(name.trim()) != null

    fun entries(): List<Pair<String, String>> {
        val result = mutableListOf<Pair<String, String>>()
        for ((name, phone) in contacts) result.add(name to phone)
        return result
    }
}

fun main() {
    val book = PhoneBook()
    println(book.put("Olena", "+380501112233"))
    book.put("Ada", "0123456789")
    println(book.put("Olena", "+380502223344"))
    println(book.entries())
    println(book.find("Nobody"))
    println(book.remove("Ada"))
}
```

```text
true
false
[(Ada, 0123456789), (Olena, +380502223344)]
null
true
```

Пошук імені тут точний і чутливий до регістру. Якщо потрібний інший порядок, його задають компаратором разом із правилом тотожності ключів. Не можна непомітно змінити це правило лише для відображення: дві різні назви можуть почати заміщати одна одну.

## Приклад 3. Відміна й повторення змін

Редактор зберігає знімки рядка у двох стеках. Нова зміна додає старе значення до undo і очищає redo. Після undo поточний стан переходить до redo. Порожня операція повертає `false` без змін.

```kotlin
class Editor {
    var text: String = ""
        private set
    private val undo = ArrayDeque<String>()
    private val redo = ArrayDeque<String>()

    fun replace(value: String) {
        if (value == text) return
        undo.addLast(text)
        text = value
        redo.clear()
    }

    fun undo(): Boolean {
        val previous = undo.removeLastOrNull() ?: return false
        redo.addLast(text)
        text = previous
        return true
    }

    fun redo(): Boolean {
        val next = redo.removeLastOrNull() ?: return false
        undo.addLast(text)
        text = next
        return true
    }
}

fun main() {
    val editor = Editor()
    editor.replace("A")
    editor.replace("AB")
    editor.undo()
    println(editor.text)
    editor.redo()
    println(editor.text)
    editor.undo()
    editor.replace("AC")
    println(editor.redo())
    println(editor.text)
}
```

```text
A
AB
false
AC
```

Порожній рядок є повноцінним знімком і не плутається з `null`. Для великих документів збереження повних знімків витрачає багато пам’яті; тоді історія може зберігати команди або різниці. Спершу слід довести правильність простого контракту, а вже потім змінювати подання без зміни спостережуваної поведінки.
