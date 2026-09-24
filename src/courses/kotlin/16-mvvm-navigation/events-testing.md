---
title: "Events, tests, and packaging"
description: "Topic 16. MVVM and navigation: Events, tests, and packaging"
outline: [2, 3]
sourceHash: "8b4df4d33ff89325b0d38fa470e4bbcf1115de543fbfbf71bdb590c0b7cf11f7"
---

# Events, tests, and packaging

## Errors, one-time events, and drafts

A validation error belongs to the form's state: the user must see it until they fix the data. The draft remains after a failed save. For a temporary confirmation, you can use `SnackbarHostState.showSnackbar`, called from an effect. Showing a Snackbar is itself a suspend operation and does not belong in the repository.

A `SharedFlow` without replay can lose a message when there is no collector; a `Channel` distributes messages among consumers. Neither of them guarantees "exactly one visible Snackbar" across all lifecycle changes. For an important confirmation, store an identified message in the UiState and explicitly acknowledge that it has been handled.

The draft state can live in the ViewModel, but restoring it after a restart requires persistence. Do not write every character to the main record without an agreed autosave contract. If the user presses Cancel, the previous data must remain unchanged; this is checked by a separate test.

## Example 4. Testing a ViewModel with a fake repository

Add the file to `src/test/kotlin`. It tests `NotesViewModel` from the previous program, so the production classes are not duplicated. Replacing Main is needed only in the test; `finally` guarantees that the dispatcher is restored. The test dispatcher used shares a scheduler with runTest.

```kotlin
import kotlin.test.*
import kotlinx.coroutines.*
import kotlinx.coroutines.test.*

class FakeNotes : NoteRepository {
    val rows = mutableListOf<Note>()
    var fail = false
    override suspend fun all(): List<Note> = rows.toList()
    override suspend fun add(title: String) {
        check(!fail) { "storage unavailable" }
        rows.add(Note(rows.size + 1, title))
    }
    override suspend fun delete(id: Int) {
        rows.removeAll { it.id == id }
    }
}

@OptIn(ExperimentalCoroutinesApi::class)
class NotesViewModelTest {
    @Test
    fun validatesSavesAndKeepsFailedDraft() = runTest {
        Dispatchers.setMain(StandardTestDispatcher(testScheduler))
        try {
            val repository = FakeNotes()
            val model = NotesViewModel(repository)
            model.edit(" ")
            model.add()
            assertTrue(repository.rows.isEmpty())
            assertNotNull(model.state.value.error)
            model.edit("  First  ")
            model.add()
            advanceUntilIdle()
            assertEquals("First", repository.rows.single().title)
            assertEquals("", model.state.value.draft)
            repository.fail = true
            model.edit("Second")
            model.add()
            advanceUntilIdle()
            assertEquals("Second", model.state.value.draft)
            assertNotNull(model.state.value.error)
            assertFalse(model.state.value.busy)
        } finally {
            Dispatchers.resetMain()
        }
    }
}
```

The test does not need an open window or a real SQLite database. It is a check of state and coordination. A separate integration test of the repository must verify actual saving, deletion, rollback, and reopening. Both levels are needed: a fake will not detect an SQL error, and an SQL test will not check that the draft is cleared.

::: info Screenshot
Run NotesViewModelTest; show passed assertions and source.
:::

Figure 16.8. Testing state transitions without opening the UI {.caption}

## Packaging and final checks

Before packaging, run `test` and a clean compilation. In `nativeDistributions`, set the name, the version, and the required formats. `packageDistributionForCurrentOS` creates a package for the current platform; on Windows, also test installation and launching from the menu, where the working directory differs from the Gradle project.

The package must contain the required JVM modules and the native Compose/SQLite dependencies. The JDK that runs Gradle, the toolchain JDK, and the JDK used by the packager should not automatically be assumed to be the same. Check the installer's actual runtime.

::: info Screenshot
After real packageDistributionForCurrentOS succeeds, show path.
:::

Figure 16.9. The result of packaging a desktop application {.caption}

Test three profiles: a new user with no database, a user with previous data, and an inaccessible path. An application update must not create a new empty file in place of the old one because the working directory changed. Before an irreversible migration, you need a copy of the database and a clear message about the result.
