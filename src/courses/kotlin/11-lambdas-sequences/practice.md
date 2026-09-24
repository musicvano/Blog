---
title: "Practice"
description: "Topic 11. Lambdas and sequences: worked examples"
outline: [2, 3]
sourceHash: "bc7bf26273562c6f969531b1d1b43334d86318951e7a893d5b37e357b951e5c1"
---

# Practice

## Example 1. Independent counters

The factory creates a function that returns the next integer value. Each call of the factory has its own state. The `Int` limit is checked before incrementing, so overflow does not turn a positive number into a negative one.

```kotlin
fun makeCounter(start: Int = 0): () -> Int {
    var current = start
    return {
        check(current < Int.MAX_VALUE) { "counter exhausted" }
        current++
        current
    }
}

fun main() {
    val first = makeCounter()
    val second = makeCounter(10)
    println("${first()} ${first()} ${second()} ${first()}")
    val last = makeCounter(Int.MAX_VALUE - 1)
    println(last())
    try {
        last()
    } catch (error: IllegalStateException) {
        println(error.message)
    }
}
```

```text
1 2 11 3
2147483647
counter exhausted
```

The contract assumes sequential calls from a single thread. This counter is not a generator of globally unique identifiers for a concurrent system. The assignment `val copy = first` does not create a new counter: both references will call the same closure.

## Example 2. Students and result groups

We need to split students by a threshold of 60, build an index by unique id, and find the highest score. With equal scores, sorting by name defines a stable selection rule.

```kotlin
data class Student(val id: Int, val name: String, val score: Int)

fun report(students: List<Student>): String {
    require(students.all { it.id > 0 && it.score in 0..100 })
    require(students.all { it.name.isNotBlank() })
    val byId = students.associateBy { it.id }
    require(byId.size == students.size) { "duplicate id" }
    val (passed, failed) = students.partition { it.score >= 60 }
    val best = students.sortedBy { it.name }.maxByOrNull { it.score }
    return buildString {
        appendLine("passed=${passed.size}, failed=${failed.size}")
        append("best=${best?.name ?: "none"}")
    }
}

fun main() {
    println(report(listOf(
        Student(1, "Olena", 90),
        Student(2, "Ada", 90),
        Student(3, "Bohdan", 50)
    )))
    println(report(emptyList()))
    try {
        report(listOf(Student(1, "A", 60), Student(1, "B", 70)))
    } catch (error: IllegalArgumentException) {
        println(error.message)
    }
}
```

```text
passed=2, failed=1
best=Ada
passed=0, failed=0
best=none
duplicate id
```

`associateBy` itself does not throw an exception for a repeated key, so comparing the sizes here is a separate check. If the program needs to list all duplicates, it is better to group by id explicitly and select the groups with several elements.

## Example 3. A minimal HTML DSL

The builder lets you add a heading and paragraphs. The input text is escaped so that user characters do not become HTML markup. This is a narrow educational DSL, not a universal browser templating engine.

```kotlin
fun escapeHtml(text: String): String = text
    .replace("&", "&amp;")
    .replace("<", "&lt;")
    .replace(">", "&gt;")
    .replace("\"", "&quot;")

class HtmlPage {
    private val content = StringBuilder()

    fun heading(text: String) {
        content.append("<h1>${escapeHtml(text)}</h1>")
    }

    fun paragraph(text: String) {
        content.append("<p>${escapeHtml(text)}</p>")
    }

    fun render(): String = "<main>$content</main>"
}

fun html(block: HtmlPage.() -> Unit): String =
    HtmlPage().apply(block).render()

fun main() {
    val page = html {
        heading("A & B")
        paragraph("2 < 3")
    }
    println(page)
    check(html {} == "<main></main>")
    check(escapeHtml("<script>") == "&lt;script&gt;")
}
```

```text
<main><h1>A &amp; B</h1><p>2 &lt; 3</p></main>
```

The order of replacements matters: the ampersand is escaped first so that the ampersands of the entities just created are not escaped a second time. The DSL deliberately does not provide arbitrary insertion of raw HTML. For nested builders, a separate DSL annotation can restrict access to outer receivers; in this single-level example there is no such ambiguity.
