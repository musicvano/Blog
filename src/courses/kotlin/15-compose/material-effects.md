---
title: "Material 3 and side effects"
description: "Topic 15. Compose Multiplatform: Material 3 and side effects"
outline: [2, 3]
sourceHash: "e063532bb876231d954ffbe7633f2dbb5682e7d3c7770ec3182291d2cb133ec4"
---

# Material 3 and side effects

## Material 3, Scaffold, and dialogs

`MaterialTheme` provides colors, typography, and shapes. The components `Text`, `Button`, `OutlinedTextField`, `Checkbox`, `Switch`, `RadioButton`, `Slider`, and `Card` keep styling consistent. `Image` displays graphics, and `Icon` a small action icon. Decorative images can omit a description; meaningful ones need a `contentDescription` that is understandable without the image itself.

`Scaffold` organizes the main areas of a screen: the top bar, a floating action button, and the main content. The provided `innerPadding` must be applied to the content; otherwise the list will be overlapped by the bar. `TopAppBar` in the chosen Material 3 API may require explicit opt-in to `ExperimentalMaterial3Api`.

An `AlertDialog` is present in the composition as long as the corresponding state is `true`. `onDismissRequest` defines the closing behavior; confirmation and cancellation are separate events. A draft should not be written to the main list immediately: pressing Cancel must leave the domain data unchanged.

### Example 4. A to-do list

We store immutable items with an `id`; when a checkbox changes, we replace the item via `copy`. `mutableStateListOf` observes structural changes, but it will not make arbitrary mutable fields of an item observable.

```kotlin
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.*

data class Task(val id: Int, val title: String, val done: Boolean)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Tasks() {
    val tasks = remember { mutableStateListOf<Task>() }
    var nextId by remember { mutableStateOf(1) }
    var dialog by remember { mutableStateOf(false) }
    var draft by remember { mutableStateOf("") }
    Scaffold(topBar = { TopAppBar(title = { Text("Tasks") }) },
        floatingActionButton = {
            FloatingActionButton(onClick = { dialog = true }) {
                Text("+")
            }
        }) { padding ->
        LazyColumn(Modifier.padding(padding)) {
            items(tasks, key = { it.id }) { task ->
                Row(Modifier.padding(8.dp)) {
                    Checkbox(task.done, onCheckedChange = { done ->
                        val index = tasks.indexOfFirst {
                            it.id == task.id
                        }
                        if (index >= 0) {
                            tasks[index] = task.copy(done = done)
                        }
                    })
                    Text(task.title)
                }
            }
        }
    }
    if (dialog) AlertDialog(onDismissRequest = { dialog = false },
        title = { Text("New task") },
        text = {
            OutlinedTextField(draft, onValueChange = { draft = it })
        },
        confirmButton = {
            TextButton(enabled = draft.isNotBlank(), onClick = {
                tasks.add(Task(nextId++, draft.trim(), false))
                draft = ""
                dialog = false
            }) { Text("Add") }
        },
        dismissButton = {
            TextButton(onClick = { draft = ""; dialog = false }) {
                Text("Cancel")
            }
        })
}

fun main() = application {
    Window(onCloseRequest = ::exitApplication, title = "Tasks") {
        MaterialTheme { Tasks() }
    }
}
```

An empty title is not added. After confirmation, one row appears; changing the checkbox keeps the id and the title. Test two tasks with identical titles: they remain different by id. For a persistent list, the next topic moves storage into a repository.

::: info Screenshot
Two tasks, one checked; open Add dialog with a draft.
:::

Figure 15.8. A to-do list and a draft of a new entry {.caption}

## Side effects and coroutines

`LaunchedEffect(key)` launches a coroutine tied to a place in the composition. When the key changes, the previous coroutine is canceled and a new one is launched; when the component leaves the composition, the work is also canceled. This is suitable for a timer or for observing a specific id. A random key will cause unnecessary restarts.

`rememberCoroutineScope` provides a scope for user events, for example showing a `Snackbar`. Do not launch a coroutine directly in the body of a composable on every recomposition. Long domain work that must survive changes of child components belongs to a ViewModel or another explicit lifecycle owner.

`DisposableEffect` registers a resource or listener and removes it in `onDispose`. `rememberUpdatedState` lets a long-running effect see the current callback without restarting the whole effect. These tools do not replace an ordinary `try/finally` in domain code.

For a stopwatch, `delay(10)` does not mean that exactly 10 ms have passed. The count relies on a monotonic clock, and the delay only determines how often the UI is updated. System calendar time can change and is unsuitable for precisely measuring an interval.
