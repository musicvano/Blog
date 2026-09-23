---
title: "Your first programs"
description: "Topic 1. Kotlin and your first program: Your first programs"
outline: [2, 3]
sourceHash: "ff25071a52b7a1660d82842ba24055eed6dd8f7db2b71e9ebab322204a18672b"
---

# Your first programs

## Entry point and first run

The `main` function is the entry point. Braces delimit its body; statements usually appear on separate lines without semicolons. Indentation does not define blocks, but makes their structure visible. Standard function names and keywords are case-sensitive.

```kotlin
fun main() {
    println("Hello, Kotlin!")
    println("The program runs on the JVM")
}
```

The output contains two lines:

```text
Hello, Kotlin!
The program runs on the JVM
```

`println` adds a newline; `print` does not. Save the file as UTF-8. To run it, click the icon next to `main` or execute this from the project root:

```powershell
.\gradlew.bat run --console=plain
```

On Linux/macOS, use `./gradlew`. The wrapper may download Gradle on the first run. `BUILD SUCCESSFUL` means the task succeeded, not that every formula in your program is correct.

::: info Screenshot
Show Main.kt and Run output with two Ukrainian lines.
:::

Figure 1.6. The main code and console after a successful run {.caption}

Use `//` for a comment extending to the end of the line and `/* ... */` for a multiline comment. Comments should explain a reason or constraint rather than repeat the name of an obvious action. KDoc documentation comments start with `/**`; they become useful when creating your own APIs.

## Example 2. Name and year of birth

`readln()` reads a line, and `toInt()` converts it to a number. In this first example, we assume the user enters an integer year from 1900–2026. Invalid input currently terminates the program with an exception; the next topic covers validation without exceptions.

```kotlin
fun main() {
    print("Name: ")
    val name = readln()
    print("Year of birth: ")
    val birthYear = readln().toInt()
    val referenceYear = 2026
    val ageAtYearEnd = referenceYear - birthYear
    println("Hello, $name!")
    println("At the end of $referenceYear: $ageAtYearEnd years old")
}
```

For the name `Olena` and year `2006`, the result is `20 years old`. This is the age at the end of the specified year, not the exact age today: the latter requires a full date of birth. The variable name should help make that distinction clear.

`val` allows a reference or value to be assigned once. When a result is determined once, start with `val`. `$name` inserts a value into a string. A more complex expression can appear as `${referenceYear - birthYear}` in program text; Topic 3 covers templates in detail.

For Gradle's `run` task, console input must be explicitly forwarded through the `standardInput` property in the script. Backticks around `in` in Kotlin allow access to a Java name that matches a Kotlin keyword. If the program exits without waiting for input, check this configuration and the standard input source.

## Example 3. Travel time

Assume the distance is in kilometers and the constant speed is in kilometers per hour. Calculate time by dividing distance by speed. For the demonstration, use values that yield a whole number of minutes; the model does not account for stops.

```kotlin
fun main() {
    val distanceKm = 150.0
    val speedKmH = 60.0
    val totalMinutes = (distanceKm / speedKmH * 60).toInt()
    val hours = totalMinutes / 60
    val minutes = totalMinutes % 60
    println("Time: $hours h $minutes min")
}
```

Output: `Time: 2 h 30 min`. For `Int`, `/` performs integer division, and `%` finds the remainder. `toInt()` discards the fractional part rather than rounding to the nearest integer. A different contract requires an explicit rounding rule; do not hide the difference with formatting.

Also check 60 km at 60 km/h: the result must be exactly one hour. Zero speed is invalid for this model. Checking units and valid values often reveals an error before the debugger does.

## Example 4. Command-line arguments

Another form of the entry point accepts `Array<String>`. For now, we use only its size and two indices; general array and collection operations come later.

```kotlin
fun main(args: Array<String>) {
    if (args.size != 2) {
        println("Required arguments: name group")
        return
    }
    println("Name: ${args[0]}")
    println("Group: ${args[1]}")
}
```

Running `run --args="Olena KI-26"` prints the name and group. With no arguments, the program explains the expected format and exits before accessing any indices. The first element's index is zero. In later assignments, CLI errors will have a separate exit code that another program can check.

Configure IDE launch parameters under *Run → Edit Configurations*. The program arguments field and JVM options field serve different purposes. Do not enter a user's name as a JVM option. The working directory is also part of the run configuration.
