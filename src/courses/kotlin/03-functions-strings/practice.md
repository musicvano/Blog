---
title: "Practice"
description: "Topic 3. Functions and strings: worked examples"
outline: [2, 3]
sourceHash: "24828cd58abadc2535d283ba5cf3ae846308fd669fee098384e1482f1372c4cd"
---

# Practice

## Example 1. Integer power

Calculate an integer power of a number in two ways: ordinary recursion and tail recursion. For a base from -10 to 10 and an exponent in 0..18, the result fits in `Long`. In this program contract, the zeroth power, including `0^0`, is defined as 1.

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

In the tail-recursive version, the accumulated result is passed to the next call. No multiplication follows it, so the compiler can eliminate the recursive stack. Both algorithms have O(exponent) arithmetic steps; stack optimization does not reduce this number.

## Example 2. Initials

The input contains two or three nonempty words: last name, first name, and an optional patronymic. The order is explicitly defined. The output preserves the last name and adds the first letters of the remaining words. Reconstructing a full name from initials without an external directory is impossible.

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
    println("Shevchenko Taras Hryhorovych".toInitials())
    println("  Lovelace   Ada  ".toInitials())
    check("Koval Olena".toInitials() == "Koval O.")
}
```

```text
Shevchenko T.H.
Lovelace A.
```

The contract supports ordinary BMP letters at the start of each word. Complex names, double surnames, and other cultural name orders require a separate model. You should not claim that splitting an arbitrary human name on spaces always yields the correct parts.

## Example 3. Text frame

The `width` parameter specifies the inner width, and `border` specifies the frame character. A line longer than the width is rejected. The function returns a string rather than printing it itself, so its result can be tested or used as part of another report.

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

Empty text is treated as one empty line inside the frame. The result's last line has no trailing newline. Width is counted using `String.length`, so for tabs, emoji, and combined graphemes, this does not guarantee equal visual width in a terminal; the sample input must not contain such characters.
