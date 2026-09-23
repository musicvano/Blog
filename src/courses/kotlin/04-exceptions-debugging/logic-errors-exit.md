---
title: "Logic errors and exit codes"
description: "Topic 4. Exceptions, Result, and debugging: logic errors and exit codes"
outline: [2, 3]
sourceHash: "5256d398206e7a2e9e4b0e11cffd0cad6671bb00731c4a7c75643186bbaa13c0"
---

# Logic errors and exit codes

## Example 4. A logic error in an average

We need to average the positive values in an array. If the sum of positive values is divided by the entire array's length, zero and negative values incorrectly affect the denominator. There may be no exception, but the result will be wrong.

```kotlin
fun positiveAverage(values: IntArray): Double? {
    var sum = 0L
    var count = 0
    for (value in values) {
        if (value > 0) {
            sum += value
            count++
        }
    }
    return if (count == 0) null else sum.toDouble() / count
}

fun main() {
    val values = intArrayOf(10, -5, 20)
    println(positiveAverage(values))
    println(positiveAverage(intArrayOf(-2, 0)))
    check(positiveAverage(values) == 15.0)
    check(positiveAverage(intArrayOf()) == null)
}
```

Output: `15.0`, followed by `null`. The array here is a small fixed data set for reproducing the error; general collections are covered in Topic 10. Using `Long` for the sum reduces the risk of intermediate `Int` overflow.

Set a breakpoint before `return`. For the first array, `sum` should be 30, `count` should be 2, and `values.size` should be 3. Evaluate both expressions in *Evaluate Expression*: `sum.toDouble()/count` and `sum.toDouble()/values.size`. The comparison shows the cause, not just the incorrect total.

::: info Screenshot
Evaluate both average expressions for[10,-5,20]; show15.0 versus10.0.
:::

Figure 4.11. Comparing the correct and incorrect denominators {.caption}

Debugger expressions can execute methods and change state. Do not run withdrawals, deletions, or network operations in them merely to inspect something. Observe pure calculations and local data.

## Exit codes and the application boundary

A console application must clearly distinguish success from invalid input. We will use code 0 for success and 2 for user errors. A domain function should not call `exitProcess`; it returns a value or throws a documented exception. The CLI boundary translates this result into text, stderr, and an exit code.

`exitProcess` terminates the process immediately; do not expect it to unwind the stack and execute every `finally` block. First close resources or return from the function that owns them, and only then terminate the program with the required code.

Correct handling must not print a successful summary after an error message. For stateful operations, verify that state has not changed. For repeated input, establish a clear termination condition, including end of stream, to avoid an infinite prompting loop.

## Final checks

For each operation, define normal input, a violated precondition, the expected error type, and the state afterward. Check not only the text but also the absence of partial changes. After fixing a logic error, retain an automated check that reproduces that specific case.

Sources: <https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/run-catching.html>, <https://www.jetbrains.com/help/idea/debugging-code.html>, <https://www.jetbrains.com/help/idea/using-breakpoints.html>.
