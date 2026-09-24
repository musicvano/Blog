---
title: "Practice"
description: "Topic 12. Files, serialization, and tests: worked examples"
outline: [2, 3]
sourceHash: "1f76ada188d76c477b6f114855af7652f7c6d2ba9dc9fb2bb8ef484d5fb7886f"
---

# Practice

## Example 1. Text file statistics

We count lines, words, and UTF-16 code units excluding line separators. A word is defined as a non-empty fragment between whitespace characters. This is an explicit educational contract, not linguistic segmentation or a count of visible graphemes.

```kotlin
import java.nio.file.Files
import java.nio.file.Path
import kotlin.io.path.bufferedReader
import kotlin.io.path.writeText

data class TextStats(val lines: Int, val words: Int, val units: Int)

fun statistics(path: Path): TextStats {
    var lines = 0
    var words = 0
    var units = 0
    path.bufferedReader(Charsets.UTF_8).use { reader ->
        while (true) {
            val line = reader.readLine() ?: break
            lines++
            units += line.length
            if (line.isNotBlank()) {
                words += line.trim().split(Regex("\\s+")).size
            }
        }
    }
    return TextStats(lines, words, units)
}

fun main() {
    val path = Files.createTempFile("stats-", ".txt")
    try {
        path.writeText("Ada Lovelace\nKotlin\n", Charsets.UTF_8)
        println(statistics(path))
        path.writeText("", Charsets.UTF_8)
        println(statistics(path))
    } finally {
        Files.deleteIfExists(path)
    }
}
```

```text
TextStats(lines=2, words=3, units=18)
TextStats(lines=0, words=0, units=0)
```

For very large files, `Int` counters can overflow; in a production contract, `Long` and a check of the allowed size are appropriate. This example uses small local files. Line-break characters are not included in `units` because `readLine` strips them.

## Example 2. JSON settings

The fields have default values, so old files without new fields can remain valid. Unknown fields are deliberately ignored. The port is checked by a domain rule, and the transient flag is not stored in the format.

```kotlin
import kotlinx.serialization.Serializable
import kotlinx.serialization.Transient
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

@Serializable
data class Settings(
    val title: String = "Demo",
    val port: Int = 8080,
    val theme: String = "light",
    @Transient val loaded: Boolean = false
) {
    init {
        require(title.isNotBlank())
        require(port in 1..65535)
        require(theme in setOf("light", "dark"))
    }
}

fun main() {
    val format = Json {
        ignoreUnknownKeys = true
        encodeDefaults = true
    }
    val text = """{"title":"Course","future":1}"""
    val settings = format.decodeFromString<Settings>(text)
    println(settings)
    println(format.encodeToString(settings))
    check(format.decodeFromString<Settings>("{}").port == 8080)
}
```

```text
Settings(title=Course, port=8080, theme=light, loaded=false)
{"title":"Course","port":8080,"theme":"light"}
```

In this model, `loaded` remains false after decoding because the field is excluded from the schema. If a flag of actual loading is needed, a separate service sets it. Do not expect the property's name by itself to change the serializer's behavior.

## Example 3. A testable note repository

Place the file `NoteRepository.kt` in `src/main/kotlin`. Saving validates all records before writing the file. For this lab, the storage has a direct-write policy; the atomic replacement from the lecture can be added as a separate extension. A missing file means a new storage, while corrupted JSON is an error.

```kotlin
import java.nio.file.NoSuchFileException
import java.nio.file.Path
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlin.io.path.readText
import kotlin.io.path.writeText

@Serializable
data class Note(val id: Int, val text: String)

class NoteRepository(private val path: Path) {
    private val format = Json { prettyPrint = true }

    private fun validate(notes: List<Note>) {
        require(notes.all { it.id > 0 && it.text.isNotBlank() })
        require(notes.map { it.id }.toSet().size == notes.size)
    }

    fun save(notes: List<Note>) {
        validate(notes)
        val encoded = format.encodeToString(notes)
        path.writeText(encoded, Charsets.UTF_8)
    }

    fun load(): List<Note> {
        val text = try {
            path.readText(Charsets.UTF_8)
        } catch (error: NoSuchFileException) {
            return emptyList()
        }
        val result = format.decodeFromString<List<Note>>(text)
        validate(result)
        return result
    }
}
```

The test `NoteRepositoryTest.kt` uses a separate directory for each test. The field with `@TempDir` is filled in by JUnit; it does not point to real user data. The invalid-save test additionally proves that the previous file remained readable.

```kotlin
import java.nio.file.Path
import kotlinx.serialization.SerializationException
import kotlin.io.path.writeText
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import org.junit.jupiter.api.io.TempDir

class NoteRepositoryTest {
    @TempDir
    lateinit var directory: Path

    @Test
    fun roundTrip() {
        val repository = NoteRepository(
            directory.resolve("notes.json")
        )
        val notes = listOf(Note(1, "Ada"), Note(2, "Kotlin"))
        repository.save(notes)
        assertEquals(notes, repository.load())
    }

    @Test
    fun missing() {
        val repository = NoteRepository(
            directory.resolve("absent.json")
        )
        assertEquals(emptyList(), repository.load())
    }

    @Test
    fun invalidPreservesPrevious() {
        val repository = NoteRepository(
            directory.resolve("notes.json")
        )
        repository.save(listOf(Note(1, "old")))
        assertFailsWith<IllegalArgumentException> {
            repository.save(listOf(Note(1, "a"), Note(1, "b")))
        }
        assertEquals(listOf(Note(1, "old")), repository.load())
    }

    @Test
    fun brokenJson() {
        val path = directory.resolve("broken.json")
        path.writeText("[", Charsets.UTF_8)
        assertFailsWith<SerializationException> {
            NoteRepository(path).load()
        }
    }
}
```

The result of `gradlew test` for the two test classes of this topic should contain ten successful test invocations: six for the grade calculator and four for the repository. In your own work, add checks that correspond specifically to your schema and rules.
