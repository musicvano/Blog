---
title: "Practice"
description: "Topic 4. Exceptions, Result, and debugging: worked examples"
outline: [2, 3]
sourceHash: "b050c6ebb06f5b8ea3ed72a8c29ef36352c0faf8edecf14d4e555357850ea282"
---

# Practice

## Example 1. Temperature converter

The program accepts a temperature in °C from −273.15 to 10000 as an argument and prints kelvins. The domain function has a precondition, while the CLI separately checks argument format and count.

```kotlin
import java.util.Locale
import kotlin.system.exitProcess

fun kelvin(celsius: Double): Double {
    require(celsius.isFinite()) { "Temperature is not finite" }
    require(celsius in -273.15..10000.0) { "Out of range" }
    return celsius + 273.15
}

fun run(args: Array<String>): Int {
    if (args.size != 1) {
        System.err.println("One temperature in °C is required")
        return 2
    }
    val value = args[0].toDoubleOrNull()
    if (value == null) {
        System.err.println("A number with a decimal point is required")
        return 2
    }
    return try {
        val result = kelvin(value)
        val locale = Locale.forLanguageTag("uk-UA")
        println(String.format(locale, "%.2f K", result))
        0
    } catch (error: IllegalArgumentException) {
        System.err.println(error.message)
        2
    }
}

fun main(args: Array<String>) {
    exitProcess(run(args))
}
```

The argument `0` produces `273,15 K` and code 0. `abc`, `NaN`, `-274`, or a missing argument produce stderr output and code 2 without a successful result. The `exitProcess` call follows the return from `run`; any local resources would have finished their work before this point.

## Example 2. Atomicity of a sample transfer

Initial balances are specified as integer kopiykas. The function does not modify accounts: it returns a new pair only after checking every condition. This is a teaching model without a database.

```kotlin
fun transfer(from: Long, to: Long, amount: Long): Pair<Long, Long> {
    require(from in 0..100000000L && to in 0..100000000L) {
        "Invalid initial balance"
    }
    require(amount in 1..100000000L) { "Invalid amount" }
    require(amount <= from) { "Insufficient balance" }
    require(to + amount <= 100000000L) { "Limit exceeded" }
    return (from - amount) to (to + amount)
}

fun main() {
    var accounts = 10000L to 2000L
    val first = runCatching {
        transfer(accounts.first, accounts.second, 3000)
    }
    first.onSuccess { accounts = it }
    println(accounts)
    val before = accounts
    val failed = runCatching {
        transfer(accounts.first, accounts.second, 9000)
    }
    failed.onSuccess { accounts = it }
    failed.onFailure { println(it.message) }
    check(accounts == before)
    check(accounts.first + accounts.second == 12000L)
    println("State unchanged after error")
}
```

The result is `(7000, 5000)`, the message `Insufficient balance`, and confirmation that state is unchanged. All possible amounts have small bounds, so the `to + amount` check does not overflow `Long`.

In a system with a database, simultaneous changes must be protected by a transaction; a simple pair in memory is not banking software. This example studies only validation order and the absence of partial changes.

## Example 3. Debugging a loop boundary

The function should calculate the sum 1…n for n from 0 to 10000. The error `1..<n` skips the last term. Below is the corrected program with checks for representative boundaries.

```kotlin
fun sumTo(n: Int): Long {
    require(n in 0..10000) { "n out of range" }
    var total = 0L
    for (i in 1..n) {
        total += i
    }
    return total
}

fun main() {
    check(sumTo(0) == 0L)
    check(sumTo(1) == 1L)
    check(sumTo(5) == 15L)
    check(sumTo(10000) == 50005000L)
    val invalid = runCatching { sumTo(-1) }
    check(invalid.exceptionOrNull() is IllegalArgumentException)
    println("Five checks passed")
}
```

Set a conditional breakpoint on `i == 5`. Before addition, `total` should equal 10; afterward, it should equal 15. Temporarily change the boundary to `1..<n` in a separate copy: the test for n=1 or n=5 should detect the error. Restore the corrected code and retain the checks.
