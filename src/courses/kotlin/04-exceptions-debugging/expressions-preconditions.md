---
title: "try/throw expressions and preconditions"
description: "Topic 4. Exceptions, Result, and debugging: try/throw expressions and preconditions"
outline: [2, 3]
sourceHash: "6da65361ef3c78e33c73d5bd5d3197e1b2231e2852a44d30b3b3568c9d0141db"
---

# try/throw expressions and preconditions

## try and throw as expressions

`try` can return the result of the last expression in the `try` block or selected `catch`. `finally` does not determine this result. Returning or throwing a new exception from `finally` can hide the previous cause, so avoid that style.

```kotlin
fun parsePort(text: String): Int {
    val port = try {
        text.toInt()
    } catch (error: NumberFormatException) {
        throw IllegalArgumentException("Port is not a number", error)
    }
    require(port in 1..65535) { "Port must be 1–65535" }
    return port
}

fun main() {
    println(parsePort("8080"))
    try {
        parsePort("abc")
    } catch (error: IllegalArgumentException) {
        println(error.message)
        println(error.cause?.javaClass?.simpleName)
    }
}
```

Output: `8080`, `Port is not a number`, `NumberFormatException`. The constructor's second parameter preserves `cause`, so the technical cause can be analyzed separately from the user-facing explanation. The port is only validated here; the program does not create a network connection.

The `throw` expression has type `Nothing`, so `value ?: throw ...` lets you obtain a non-null value or end the path with an error. This is useful when absence violates the contract, rather than being an ordinary situation to represent as `null`.

## Preconditions with require and state checks with check

`require` checks an argument and throws `IllegalArgumentException`; `check` checks state and throws `IllegalStateException`. Choosing the type helps distinguish a caller error from an impossible state. `requireNotNull` and `checkNotNull` return a non-null value or throw the corresponding exception.

| **Tool** | **Example purpose** |
| --- | --- |
| `require` | A size is positive, an argument is in range |
| `requireNotNull` | A required field is present |
| `check` | An operation is allowed in the current state |
| `checkNotNull` | An internal result has already been initialized |
| `error` | A path should not be reachable |
| `TODO()` | Unfinished code, not a completed solution |

`TODO()` does not handle user errors. It produces `NotImplementedError`, so leaving it in a final example means an implementation is missing. Likewise, do not disable preconditions instead of fixing an incorrect operation order.

### Example 2. Registering an age

The sample model accepts ages of 18–120 years. The format is checked first, followed by the domain rule. A custom exception type distinguishes these causes. Class syntax will be covered in detail in the next topic.

```kotlin
class InvalidAgeException(message: String) :
    IllegalArgumentException(message)

fun validateAge(age: Int): Int {
    if (age !in 18..120) {
        throw InvalidAgeException("Age 18–120 required")
    }
    return age
}

fun registerAge(text: String): Int {
    require(text.isNotBlank()) { "Age not specified" }
    return validateAge(text.toInt())
}

fun main() {
    print("Age: ")
    val text = readlnOrNull() ?: ""
    try {
        val age = registerAge(text)
        println("Registered age: $age")
    } catch (error: InvalidAgeException) {
        println("Registration rule: ${error.message}")
    } catch (error: NumberFormatException) {
        println("An integer age is required")
    } catch (error: IllegalArgumentException) {
        println(error.message)
    }
}
```

For 20, registration succeeds; for 17, a rule message appears; for `abc`, a message requests an integer age. These bounds are specified only by the teaching contract, not by a universal rule for every information system.

A custom exception class is appropriate when callers need to distinguish a cause programmatically. You do not need a new class for every message text. Do not parse `message` phrases using `contains` to determine the error type: localization will change the text.
