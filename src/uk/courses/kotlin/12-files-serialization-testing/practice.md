---
title: "Практика"
description: "Тема 12. Файли, серіалізація, тести: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Статистика текстового файла

Порахуємо рядки, слова й UTF-16-кодові одиниці без роздільників рядків. Слово визначено як непорожній фрагмент між пробільними символами. Це явний навчальний контракт, а не лінгвістична сегментація чи підрахунок видимих графем.

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

Для дуже великих файлів лічильники `Int` можуть переповнитися; у виробничому контракті доречні `Long` та перевірка допустимого розміру. У цьому прикладі використовуються малі локальні файли. Символи переносу не включено в `units`, бо `readLine` їх прибирає.

## Приклад 2. Налаштування JSON

Поля мають значення за замовчуванням, тому старі файли без нових полів можуть залишатися придатними. Невідомі поля свідомо ігноруються. Порт перевіряється предметним правилом, а transient позначка не зберігається у форматі.

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

У цій моделі `loaded` лишається false після декодування, оскільки поле виключено зі схеми. Якщо потрібна ознака фактичного завантаження, її встановлює окремий сервіс. Не слід очікувати, що назва властивості сама змінить поведінку серіалізатора.

## Приклад 3. Тестований репозиторій нотаток

Файл `NoteRepository.kt` розмістіть у `src/main/kotlin`. Збереження перевіряє всі записи до запису файла. Для цієї лабораторної сховище має політику прямого запису; атомарну заміну з лекції можна підключити як окреме розширення. Відсутній файл означає нове сховище, а пошкоджений JSON є помилкою.

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

Тест `NoteRepositoryTest.kt` використовує окрему теку для кожного тесту. Поле з `@TempDir` заповнює JUnit; воно не вказує на реальні користувацькі дані. Перевірка неправильного збереження додатково доводить, що попередній файл залишився читабельним.

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

Результат `gradlew test` для двох тестових класів теми має містити десять успішних тестових викликів: шість для калькулятора оцінок і чотири для репозиторію. У власній роботі додавайте перевірки, що відповідають саме вашій схемі й правилам.
