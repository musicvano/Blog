---
title: "Practice"
description: "Topic 1. Kotlin and your first program: worked examples"
outline: [2, 3]
sourceHash: "89328e4266f74da26c072dc57f8ac4fdf4371a976f1ba262a7da485d3d781608"
---

# Practice

## Example 1. Trip cost

Enter the distance in kilometers, fuel consumption in liters per 100 km, and an educational price per liter in hryvnias. Calculate the fuel volume and cost. The initial version expects valid positive numbers with a decimal point; state this limitation in the README.

```kotlin
import java.util.Locale

fun main() {
    print("Distance, km: ")
    val distance = readln().toDouble()
    print("Consumption, L/100 km: ")
    val rate = readln().toDouble()
    print("Price, UAH/L: ")
    val price = readln().toDouble()
    val litres = distance * rate / 100
    val cost = litres * price
    val locale = Locale.forLanguageTag("uk-UA")
    println(String.format(locale, "Fuel: %.2f L", litres))
    println(String.format(locale, "Cost: %.2f UAH", cost))
}
```

For `150`, `8`, and `60`, the result is `12,00 L` and `720,00 UAH`. A point during input and a comma in localized output follow different rules. The format string specifies two decimal places but does not change the stored number. The price is a synthetic problem parameter, not a current rate.

## Example 2. Duration in days, hours, and minutes

For a nonnegative number of seconds, find whole days and remaining hours, minutes, and seconds. `Long` handles larger values than `Int`.

```kotlin
fun main() {
    print("Seconds: ")
    val total = readln().toLong()
    val days = total / 86400
    val hours = total % 86400 / 3600
    val minutes = total % 3600 / 60
    val seconds = total % 60
    println("$days d $hours h $minutes min $seconds s")
}
```

For `90061`, the result is `1 d 1 h 1 min 1 s`; for zero, every component is zero. This is a duration, not a calendar date: the problem does not account for time zones or clock changes. Check 59, 60, 3599, and 3600 seconds to see the boundaries.

## Example 3. Tile count and project history

A rectangular floor has positive dimensions in meters; tiles are square, with their side length in meters. The educational model estimates the count from total area with a 10% reserve, rounding up. It does not model tile layout or cutting.

```kotlin
import kotlin.math.ceil

fun main() {
    val length = 4.0
    val width = 3.0
    val side = 0.5
    val reserve = 1.10
    val needed = ceil(length * width / (side * side) * reserve)
    println("Estimated tiles: ${needed.toInt()}")
}
```

Output: `Estimated tiles: 53`. Rounding down would give too few tiles even within this simplified model. Prepare three meaningful commits: initial structure, program, and README with input data and checks. Add wrapper files to Git; exclude `build/` and caches.

After each commit, inspect `git status` and `git log --oneline`. Open a copy of the project in another directory and run the wrapper. Do not transfer the Gradle cache as part of a student solution: dependencies must be restored from the documented configuration.
