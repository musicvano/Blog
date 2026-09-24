---
title: "Practice"
description: "Topic 10. Arrays and collections: worked examples"
outline: [2, 3]
sourceHash: "7b3fb66ffd1fd0253675fdd4db1b79f781c6460734a6896a346762362286a177"
---

# Practice

## Example 1. Transposing a matrix

Transposition swaps the row and column indices. The result has its own inner arrays, so changing the result must not change the original matrix. For an empty array, the result is taken to be 0×0; information about the number of columns is not stored separately in this representation.

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

The algorithm performs exactly one copy for each element, that is, O(rows·columns) time and the same amount of additional memory. Transposing a non-empty rectangular matrix twice must return equal contents; check this with `contentDeepEquals`.

## Example 2. A phone book

`TreeMap` orders the entries by name. The `put` method returns the previous value, so it lets you distinguish an addition from a replacement. The number is stored as a string: a leading plus and zeros matter. The educational contract allows an optional plus and 7–15 digits.

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

Name lookup here is exact and case-sensitive. If a different order is needed, specify it with a comparator together with a key identity rule. You cannot quietly change this rule only for display: two different names might start replacing each other.

## Example 3. Undo and redo

The editor stores snapshots of the string in two stacks. A new change pushes the old value onto undo and clears redo. After undo, the current state moves to redo. An empty operation returns `false` without changes.

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

An empty string is a full-fledged snapshot and is not confused with `null`. For large documents, storing full snapshots uses a lot of memory; the history can then store commands or differences instead. First prove the correctness of the simple contract, and only then change the representation without changing the observable behavior.
