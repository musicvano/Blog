---
title: "Common problems and checks"
description: "Topic 1. Kotlin and your first program: Common problems and checks"
outline: [2, 3]
sourceHash: "871b99c6c0b0dc3b6003ba570fbefe42577de19335b7faade3aa2d0522246f70"
---

# Common problems and checks

## Common problems and checking your work

If Gradle does not start, first check the Gradle process JVM and Gradle version. If a dependency fails to download, read the artifact name and repository address. Running again without addressing the cause is not a way to fix configuration.

`Type mismatch` means the types are incompatible; for example, `readln()` returns `String`, not `Int`. Failure to find `MainKt` is often related to the filename, package, or `mainClass`. If Cyrillic text displays incorrectly, check UTF-8 encoding in the file and console; do not replace the text with `?` characters.

::: info Screenshot
Disposable val age: Int = readln(); show actual compiler diagnostic.
:::

Figure 1.11. A type error and a reference to the code line {.caption}

For each program, record the input, expected result, actual result, and conclusion. Check a normal case, the smallest valid value, and invalid input. If the first version has limitations, state them explicitly: this is better than presenting one successful run as proof of universal correctness.

### Minimal testing procedure

To practice diagnosis, consider three different situations. In the first, the code does not compile; in the second, it compiles but terminates with an exception; in the third, it runs without an exception but does not implement the required formula.

```kotlin
// Intentional type error; a separate file for diagnosis.
fun main() {
    val count: Int = "12"
    println(count)
}
```

For this file, fix the mismatch between `String` and `Int` before running. Adding a console pause or reinstalling the JDK does not change the cause of the error. Later, you will be able to explicitly convert the text `"12"` to a number.

```kotlin
// Intentional runtime error; input "abc" is invalid.
fun main() {
    println(readln().toInt())
}
```

This program is type-correct but does not handle nonnumeric input. The message contains the exception type and a line reference. The next topic introduces `toIntOrNull()` to handle this without crashing.

```kotlin
// Intentional logic error: 2.5 is expected, not 2.
fun main() {
    val hours = 150 / 60
    println(hours)
}
```

The compiler does not know the author expects fractional hours. Both operands are integers, so `2` follows the operation's semantics. For this model, make one operand fractional, for example `150.0 / 60`. A table of expected results is what exposes this error.

Do not include intentionally incorrect files in the project's normal successful build. Check them separately, save the diagnostics, and restore working code after the experiment. This lets you reproduce the learning exercise without leaving an accidentally broken main application in the repository.

Reproducibility means another person obtains the same result under the documented conditions. For the first project, a short table separating tools from logic is helpful. “It built” does not replace checking that the result is correct.

| **Check** | **What to record** |
| --- | --- |
| Tools | Versions of Kotlin, Gradle, Gradle JVM, and program JDK |
| Sources | Main filename and fully qualified mainClass name |
| Input | Exact stdin lines or arguments and units |
| Expected result | Manual calculation before running the program |
| Actual result | Output, exit code, and deviations |
| Repetition | Command to run from a clean project copy |

If the console is waiting for input, an empty line and the end of the stream are different situations. Pressing Enter sends a zero-length line; closing standard input means there is no next line. `readln()` does not return an empty line in place of the end of the stream. For controlled termination, use `readlnOrNull()`, which we will study in detail with null safety.

Do not fix an error by randomly changing every tool version at once. Save the message, find the first cause, change one setting, and repeat the same test. A commit before the change lets you compare behavior and return to the previous reproducible state.
