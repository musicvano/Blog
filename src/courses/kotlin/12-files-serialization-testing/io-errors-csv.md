---
title: "Safe writing and CSV format"
description: "Topic 12. Files, serialization, and tests: Safe writing and CSV format"
outline: [2, 3]
sourceHash: "d08c90638071dcf1ed3c7ecefab0bd8e49d535461a637b7a9fcc67d1f2a2385f"
---

# Safe writing and CSV format

## I/O errors and safe replacement

`NoSuchFileException` is a special case of `IOException`. Catch specific failures where you can produce a useful message or apply a fallback policy. Do not turn every error into an empty list: a corrupted file would then silently look like an absence of data.

To update an important file, first fully validate the data and serialize the result, then write a temporary file in the same directory and rename it. The `ATOMIC_MOVE` option asks the file system to perform an atomic move. If it is not supported, the program must have an explicit policy: refuse, or perform the replacement without promising atomicity.

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

Renaming does not guarantee physical persistence after a power failure. Also, atomic replacement of an existing file depends on the file system provider. The example deliberately does not hide the lack of support and does not promise a universal transaction across several files. The lab repository uses small temporary files; describe the persistence policy in the report.

## CSV: a format has a contract

General CSV allows separators and line breaks inside quotes, and the quotes themselves are doubled. So `line.split(',')` is not a complete CSV parser. Arbitrary CSV needs a well-tested library or a complete state machine with separate tests. The educational example below deliberately uses a restricted format: one record per line, a semicolon separator, and quotes and separators forbidden inside fields.

The header, column order, encoding, decimal separator, and empty-line policy are also part of the format. It is better to reject an unsupported variant with a line number than to silently corrupt the data. All lines are validated before the output file is created.

### Example 2. Importing grades

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

An empty set after the header is valid for the parser, but `average()` of an empty set returns `NaN`. A console report for arbitrary input must show "no grades" separately. In the demo, the set is explicitly non-empty; the testing below includes empty data and boundary scores.
