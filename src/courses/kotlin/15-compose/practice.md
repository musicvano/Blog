---
title: "Practice"
description: "Topic 15. Compose Multiplatform: worked examples"
outline: [2, 3]
sourceHash: "f24fec6d7ffce6e9c3df523d37f58d43b007cf1d0157a7b436d1fa1ce4158c4d"
---

# Practice

## Example 1. A tip calculator

The amount is given in kopiykas; the percentage is set with a slider. A switch rounds the total payment up to the next hryvnia. The formula is moved out of the composable so that overflow and rounding can be tested separately.

```kotlin
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.*
import kotlin.math.roundToInt

fun payment(cents: Long, percent: Int, round: Boolean): Long {
    require(cents in 0..100_000_000 && percent in 0..30)
    val total = cents + (cents * percent + 50) / 100
    return if (round) ((total + 99) / 100) * 100 else total
}

@Composable
fun Tips() {
    var input by remember { mutableStateOf("10000") }
    var percent by remember { mutableStateOf(10f) }
    var round by remember { mutableStateOf(false) }
    val cents = input.toLongOrNull()?.takeIf {
        it in 0..100_000_000
    }
    Column(Modifier.padding(20.dp)) {
        OutlinedTextField(input, onValueChange = { input = it },
            label = { Text("Bill, kop.") },
            isError = cents == null)
        Text("Tip: ${percent.roundToInt()} %")
        Slider(percent, onValueChange = { percent = it },
            valueRange = 0f..30f, steps = 29)
        Row {
            Switch(round, onCheckedChange = { round = it })
            Text("Round up to the next hryvnia")
        }
        Text(cents?.let {
            "Total: ${payment(it, percent.roundToInt(), round)} kop."
        } ?: "Check the amount")
    }
}

fun main() = application {
    Window(onCloseRequest = ::exitApplication, title = "Tips") {
        MaterialTheme { Tips() }
    }
}
```

For 10000 kopiykas and 10%, the result is 11000 kopiykas. For 10001 kopiykas and 0% with rounding, it is 10100 kopiykas. A negative number and values above the limit are not allowed. Integer calculations give a well-defined rounding rule without `Double` error.

## Example 2. A participant form

The form contains a name, one of two participation formats, and consent to the terms of the educational event. The button is enabled only after validation. Confirmation stores a snapshot of the data, not a reference to the mutable draft.

```kotlin
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.*

fun validName(text: String): Boolean = text.trim().length in 2..60

@Composable
fun Registration() {
    var name by remember { mutableStateOf("") }
    var mode by remember { mutableStateOf("Online") }
    var consent by remember { mutableStateOf(false) }
    var saved by remember { mutableStateOf<String?>(null) }
    Column(Modifier.padding(20.dp)) {
        OutlinedTextField(name, onValueChange = { name = it },
            label = { Text("Name, 2–60 characters") },
            isError = name.isNotEmpty() && !validName(name))
        for (option in listOf("Online", "In person")) {
            Row {
                RadioButton(mode == option,
                    onClick = { mode = option })
                Text(option)
            }
        }
        Row {
            Checkbox(consent, onCheckedChange = { consent = it })
            Text("I agree to the terms of the educational event")
        }
        Button(enabled = validName(name) && consent,
            onClick = { saved = "${name.trim()}: $mode" }) {
            Text("Confirm")
        }
        saved?.let { Text("Saved snapshot: $it") }
    }
}

fun main() = application {
    Window(onCloseRequest = ::exitApplication, title = "Form") {
        MaterialTheme { Registration() }
    }
}
```

With an empty name the button is disabled; the checkbox alone does not make the form valid. After confirming "Olena: Online", further editing of the draft does not change the saved label until the next click. In a real application, confirmation passes an object to a repository rather than merely producing a string on the screen.

## Example 3. A stopwatch with laps

A monotonic clock measures the interval. On pause, we accumulate the elapsed nanoseconds; on resume, we set a new starting point. The effect's coroutine only updates the display every 30 ms.

```kotlin
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.*
import kotlinx.coroutines.delay

class Stopwatch(private val now: () -> Long = System::nanoTime) {
    private var stored = 0L
    private var start: Long? = null
    fun elapsed(): Long = stored + (start?.let { now() - it } ?: 0)
    fun resume() { if (start == null) start = now() }
    fun pause() { stored = elapsed(); start = null }
    fun reset() { stored = 0; start = null }
}

@Composable
fun StopwatchScreen() {
    val clock = remember { Stopwatch() }
    val laps = remember { mutableStateListOf<Long>() }
    var running by remember { mutableStateOf(false) }
    var nanos by remember { mutableStateOf(0L) }
    LaunchedEffect(running) {
        while (running) {
            nanos = clock.elapsed()
            delay(30)
        }
    }
    Column(Modifier.padding(20.dp)) {
        Text("${nanos / 1_000_000} ms")
        Row {
            Button(onClick = {
                if (running) clock.pause() else clock.resume()
                running = !running
                nanos = clock.elapsed()
            }) { Text(if (running) "Pause" else "Start") }
            Button(enabled = running, onClick = {
                laps.add(clock.elapsed())
            }) { Text("Lap") }
            Button(onClick = {
                running = false
                clock.reset()
                nanos = 0
                laps.clear()
            }) { Text("Reset") }
        }
        LazyColumn {
            itemsIndexed(laps) { index, time ->
                Text("${index + 1}: ${time / 1_000_000} ms")
            }
        }
    }
}

fun main() = application {
    Window(onCloseRequest = ::exitApplication,
        title = "Stopwatch") {
        MaterialTheme { StopwatchScreen() }
    }
}
```

The laps show the accumulated time since the start, not the difference between adjacent laps. Indices are acceptable here for a list where items are only appended at the end or all removed at once. Arbitrary editing requires stable ids. Test the model with a fake clock: 100 ns of running, a pause, and another 50 ns of running give 150 ns, regardless of the pause's duration.
