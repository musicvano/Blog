---
title: "Practice"
description: "Topic 2. Types, null safety, and control flow: worked examples"
outline: [2, 3]
sourceHash: "5ff5f4d889012998eb3986f56e1e0c5a9f3111b720d219195a6335ac03a233c1"
---

# Practice

## Example 1. Leap year

For a year from 1–9999, determine whether it is a leap year using the Gregorian rule: divisible by 400, or divisible by 4 but not by 100.

```kotlin
fun main() {
    print("Year: ")
    val year = readlnOrNull()?.toIntOrNull()
    if (year == null || year !in 1..9999) {
        println("Invalid year")
        return
    }
    val leap = year % 400 == 0 ||
        (year % 4 == 0 && year % 100 != 0)
    println(if (leap) "Leap year" else "Common year")
}
```

For 2000, the result is `Leap year`; for 1900, `Common year`. The model extends the Gregorian rule over the entire specified range and does not model historical calendar transitions. Also check 2024, 2026, 0, text, and end of input.

## Example 2. Educational ATM

The amount 10–100000 UAH must be divisible by 10. Unlimited banknotes of 100, 50, 20, and 10 UAH are available. For this set of denominations, successively choosing the largest banknote gives the minimum count; this is not guaranteed for an arbitrary set.

```kotlin
fun main() {
    print("Amount: ")
    val amount = readlnOrNull()?.toIntOrNull()
    if (amount == null || amount !in 10..100000 ||
        amount % 10 != 0
    ) {
        println("Invalid amount")
        return
    }
    var rest = amount
    var total = 0
    for (index in 0..<4) {
        val value = when (index) {
            0 -> 100
            1 -> 50
            2 -> 20
            else -> 10
        }
        val count = rest / value
        rest %= value
        total += count
        println("$value UAH: $count")
    }
    println("Banknotes: $total; remainder: $rest")
}
```

For 280 UAH, we obtain 2 banknotes of 100, 1 of 50, 1 of 20, and 1 of 10; 5 in total, with remainder 0. Separately check the minimum amount, an amount not divisible by 10, and the upper bound. Do not use this simplified algorithm as a model of a real ATM with limited banknote counts.

## Example 3. Average temperature of a stream

Read one line at a time until `stop` or end of stream. Accept at most 1000 finite temperatures from −50 to 60 °C; report and skip invalid lines.

```kotlin
import java.util.Locale

fun main() {
    var sum = 0.0
    var count = 0
    var rejected = 0
    while (count < 1000) {
        val text = readlnOrNull() ?: break
        if (text == "stop") break
        val value = text.toDoubleOrNull()
        if (value == null || !value.isFinite() ||
            value !in -50.0..60.0
        ) {
            rejected++
            println("Line rejected")
            continue
        }
        sum += value
        count++
    }
    if (count == 0) {
        println("No accepted data")
    } else {
        val locale = Locale.forLanguageTag("uk-UA")
        println(String.format(locale, "Average: %.2f", sum / count))
    }
    println("Accepted: $count; rejected: $rejected")
}
```

For `10`, `bad`, `20`, and `stop`, the average is `15,00`, with 2 accepted and 1 rejected. For an empty stream, no average is printed. A separate `NaN` check is necessary because parsing a string successfully does not itself prove the number is suitable for statistics.
