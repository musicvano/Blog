---
title: "Debugging and tests"
description: "Topic 13. Coroutines and Flow: Debugging and tests"
outline: [2, 3]
sourceHash: "f3ddb5534f88a851c871e96fce78f614dd54877cba978fb78300dcb82ea03f69"
---

# Debugging and tests

## Debugging and tests

In *Run → Edit Configurations*, add the VM option `-Dkotlinx.coroutines.debug`, and give tasks a `CoroutineName`. In *Debug*, stop inside a `suspend` function and open *Coroutines*. Compare the coroutine's logical stack with the thread's stack: a waiting task may not occupy any thread right now.

::: info Screenshot
Run with -Dkotlinx.coroutines.debug; show named coroutines.
:::

Figure 13.7. Coroutine names in the IntelliJ IDEA log {.caption}

::: info Screenshot
Pause in launch; Debug, Coroutines, suspended stack.
:::

Figure 13.8. Logical stacks in the Coroutines tab {.caption}

`runTest` uses a virtual-time scheduler and skips the delays of coroutines running on the test dispatcher. A delay on an explicitly specified `Dispatchers.Default` does not become virtual. That is why the dispatcher is often passed as a dependency of a function or class. A test checks the result, cancellation, and cleanup, not the exact milliseconds of a real machine.

For the timeout example, test a short successful operation, a slow operation, and external cancellation. For the account, test concurrent deposits, rejection of zero, and the absence of a partial change. For a flow, test an empty source, the order of elements, completion via `take`, and propagation of a consumer error. A successful ordinary run does not prove the absence of a race: it may manifest rarely.

### A cleanup-on-timeout test

Create `src/test/kotlin/CancellationTest.kt`. The test does not wait a real 1000 ms: both delays run on the `runTest` scheduler. The local flag checks precisely the cleanup contract, not some incidental log text. The second test demonstrates the successful branch of the same operation. Run it with `./gradlew test`.

```kotlin
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue
import kotlinx.coroutines.delay
import kotlinx.coroutines.withTimeoutOrNull
import kotlinx.coroutines.test.runTest

class CancellationTest {
    @Test
    fun timeoutClosesResource() = runTest {
        var closed = false
        val result = withTimeoutOrNull(10) {
            try {
                delay(1000)
                "done"
            } finally {
                closed = true
            }
        }
        assertNull(result)
        assertTrue(closed)
    }

    @Test
    fun quickOperationCompletes() = runTest {
        val result = withTimeoutOrNull(1000) {
            delay(10)
            "done"
        }
        assertEquals("done", result)
    }
}
```

If you put `withContext(Dispatchers.IO)` inside, the test will no longer control all of the operation's time. For such a component, pass the dispatcher through the constructor: IO in the program, `StandardTestDispatcher(testScheduler)` in the test. All test dispatchers of one scenario must use the same scheduler. After launching a new coroutine, `runCurrent` executes the ready tasks, and `advanceUntilIdle` advances a finite queue to completion. An infinite hot flow cannot thoughtlessly be "waited out to the end".
