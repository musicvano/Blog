---
title: "Practice"
description: "Topic 13. Coroutines and Flow: worked examples"
outline: [2, 3]
sourceHash: "8e4395c3b35968115dddf38501477520706f21ae68c989565855b56247eb3f74"
---

# Practice

## Example 1. Parallel summation

Find the sum of the integers from 1 to 1000 by splitting the range between two tasks. The partial sums are local; there is no shared mutable accumulator. The scope returns the result only after both parts. A check on each iteration ensures cooperative cancellation.

```kotlin
import kotlinx.coroutines.*
import kotlin.coroutines.coroutineContext

suspend fun sumRange(first: Int, last: Int): Long {
    require(first >= 1 && last >= first)
    var sum = 0L
    for (number in first..last) {
        coroutineContext.ensureActive()
        sum += number
    }
    return sum
}

suspend fun parallelSum(): Long = coroutineScope {
    val left = async(Dispatchers.Default) {
        sumRange(1, 500)
    }
    val right = async(Dispatchers.Default) {
        sumRange(501, 1000)
    }
    left.await() + right.await()
}

fun main() = runBlocking {
    val result = parallelSum()
    check(result == 500500L)
    check(sumRange(1, 1) == 1L)
    println("Sum: $result")
}
```

```text
Sum: 500500
```

For such a small range, creating tasks costs more than the addition itself. The purpose of the example is correct partitioning, not a speedup. With an arbitrary number of parts, check the boundaries: no number may end up in two parts or get lost between them. A value `first > last` is an error here, not an empty range.

## Example 2. Independent checks in a supervisor

We simulate two sources: the first responds, and the second fails with a domain error. After launching both, we read each result. We do not turn the owner's cancellation into a server-failure message.

```kotlin
import kotlinx.coroutines.*

suspend fun inspect(): List<String> = supervisorScope {
    val jobs = listOf(
        async {
            delay(5)
            "A: available"
        },
        async<String> {
            delay(1)
            error("B: no response")
        }
    )
    jobs.map { job ->
        try {
            job.await()
        } catch (e: CancellationException) {
            throw e
        } catch (e: IllegalStateException) {
            e.message ?: "Unknown error"
        }
    }
}

fun main() = runBlocking {
    val results = inspect()
    results.forEach(::println)
    check(results.first() == "A: available")
    check(results.last() == "B: no response")
}
```

```text
A: available
B: no response
```

The order of the lines is determined by the order of the list, not by completion time. The exception is handled at the boundary of an individual result. If `supervisorScope` is replaced with `coroutineScope`, the failure of the second task cancels the scope and the first task: that is a different contract, not an accidental error.

## Example 3. Searching after a typing pause

The input sequence is fixed so that the example can be repeated without a network or keyboard timing. The first two prefixes arrive quickly; the third stays stable longer than the `debounce` window. The empty final query is filtered out before the search.

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

@OptIn(FlowPreview::class)
fun main() = runBlocking {
    val words = listOf("Kotlin", "Java", "Ktor")
    val queries = flow {
        emit("K")
        delay(10)
        emit("Ko")
        delay(10)
        emit("Kot")
        delay(100)
        emit("")
    }
    val answers = queries
        .debounce(50)
        .filter { it.isNotBlank() }
        .map { query ->
            words.filter { it.startsWith(query, true) }
        }
        .toList()
    println(answers)
    check(answers == listOf(listOf("Kotlin")))
}
```

```text
[[Kotlin]]
```

A real timer depends on OS scheduling, so for an automated test you should move the pipeline into a function and check it under `runTest`. Separately test a query with no matches, an empty flow, mixed case, and the rapid arrival of two different queries. If the search is long, add cancellation of the previous operation, not just a delay before it starts.
