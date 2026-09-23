---
title: "Практика"
description: "Тема 11. Лямбди та послідовності: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Незалежні лічильники

Фабрика створює функцію, яка повертає наступне ціле значення. Кожен виклик фабрики має власний стан. Перед збільшенням перевіряється межа `Int`, тому переповнення не перетворює додатне число на від’ємне.

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

Контракт передбачає послідовний виклик з одного потоку. Цей лічильник не є генератором глобально унікальних ідентифікаторів для паралельної системи. Присвоєння `val copy = first` не створює новий лічильник: обидва посилання викликатимуть те саме замикання.

## Приклад 2. Студенти та групи результатів

Потрібно розділити студентів за порогом60, побудувати індекс за унікальним id і знайти найвищий бал. При рівності балів сортування за ім’ям визначає стабільне правило вибору.

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

Сам `associateBy` не кидає виняток через повторний ключ, тому порівняння розмірів тут є окремою перевіркою. Якщо програма потребує перелічити всі дублікати, краще явно групувати за id і вибрати групи з кількома елементами.

## Приклад 3. Мінімальний HTML DSL

Будівник дозволяє додавати заголовок і абзаци. Вхідний текст екранується, щоб символи користувача не стали HTML-розміткою. Це вузький навчальний DSL, а не універсальний браузерний шаблонізатор.

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

Порядок замін важливий: амперсанд екранується першим, щоб не екранувати вдруге амперсанди щойно створених сутностей. DSL навмисно не надає довільного вставлення сирого HTML. Для вкладених будівників окрема DSL-анотація може обмежувати доступ до зовнішніх приймачів; у цьому однорівневому прикладі такої неоднозначності немає.
