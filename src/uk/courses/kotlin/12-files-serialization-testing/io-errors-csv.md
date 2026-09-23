---
title: "Безпечний запис і формат CSV"
description: "Тема 12. Файли, серіалізація, тести: Безпечний запис і формат CSV"
outline: [2, 3]
---

# Безпечний запис і формат CSV

## Помилки введення-виведення та безпечна заміна

`NoSuchFileException` є окремим випадком `IOException`. Перехоплюйте точні відмови там, де можна сформувати корисне повідомлення або застосувати запасну політику. Не перетворюйте будь-яку помилку на порожній список: пошкоджений файл тоді непомітно виглядатиме як відсутність даних.

Для оновлення важливого файла спочатку повністю перевіряють дані й серіалізують результат, потім записують тимчасовий файл у тій самій теці та перейменовують його. Опція `ATOMIC_MOVE` просить файлову систему виконати атомарне переміщення. Якщо вона не підтримується, програма повинна мати явну політику: відмовитися або виконати заміну без обіцянки атомарності.

```kotlin
import java.nio.file.AtomicMoveNotSupportedException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption.ATOMIC_MOVE
import java.nio.file.StandardCopyOption.REPLACE_EXISTING
import kotlin.io.path.writeText

fun replaceText(path: Path, text: String) {
    val target = path.toAbsolutePath()
    val temporary = Files.createTempFile(
        target.parent, "new-", ".tmp"
    )
    try {
        temporary.writeText(text, Charsets.UTF_8)
        try {
            Files.move(
                temporary, target, ATOMIC_MOVE, REPLACE_EXISTING
            )
        } catch (error: AtomicMoveNotSupportedException) {
            throw IllegalStateException(
                "atomic move unavailable", error
            )
        }
    } finally {
        Files.deleteIfExists(temporary)
    }
}

fun main() {
    val path = Files.createTempFile("replace-", ".txt")
    try {
        replaceText(path, "ready")
        println(Files.readString(path))
    } finally {
        Files.deleteIfExists(path)
    }
}
```

Перейменування не гарантує фізичне збереження після аварійного вимкнення живлення. Також атомарна заміна наявного файла залежить від файлового провайдера. Приклад навмисно не приховує відсутність підтримки й не обіцяє універсальну транзакцію для кількох файлів. У лабораторному репозиторії використовуються невеликі тимчасові файли; політику збереження потрібно описати у звіті.

## CSV: формат має контракт

Загальний CSV допускає роздільники й переноси всередині лапок, а самі лапки подвоюються. Тому `line.split(',')` не є повним CSV-парсером. Для довільного CSV потрібна перевірена бібліотека або повна машина станів з окремими тестами. У навчальному прикладі нижче свідомо використовується обмежений формат: один запис на рядок, роздільник крапка з комою, лапки та роздільник у полях заборонені.

Заголовок, порядок колонок, кодування, десятковий роздільник і політика порожніх рядків також є частиною формату. Краще відхилити непідтримуваний варіант із номером рядка, ніж мовчки спотворити дані. Валідацію всіх рядків виконують до створення підсумкового файла.

### Приклад 2. Імпорт оцінок

```kotlin
data class Grade(val name: String, val score: Int)

fun parseGrades(text: String): List<Grade> {
    val lines = text.lineSequence().toList()
    require(lines.firstOrNull() == "name;score") { "bad header" }
    val result = mutableListOf<Grade>()
    for ((index, line) in lines.drop(1).withIndex()) {
        if (line.isEmpty() && index == lines.size - 2) continue
        require('"' !in line) { "quotes at line ${index + 2}" }
        val fields = line.split(';')
        require(fields.size == 2) { "columns at line ${index + 2}" }
        val name = fields[0].trim()
        val score = fields[1].toIntOrNull()
        require(name.isNotEmpty() &&
            score != null && score in 0..100) {
            "invalid data at line ${index + 2}"
        }
        result.add(Grade(name, score))
    }
    return result
}

fun main() {
    val grades = parseGrades("name;score\nAda;90\nBohdan;70\n")
    println(grades)
    println(grades.map { it.score }.average())
    try {
        parseGrades("name;score\nAda;101")
    } catch (error: IllegalArgumentException) {
        println(error.message)
    }
}
```

```text
[Grade(name=Ada, score=90), Grade(name=Bohdan, score=70)]
80.0
invalid data at line 2
```

Порожній набір після заголовка допустимий для парсера, але `average()` порожнього набору повертає `NaN`. Консольний звіт для довільного вводу має окремо показати «немає оцінок». У демонстрації набір явно непорожній; тестування нижче включає порожні дані та граничні бали.
