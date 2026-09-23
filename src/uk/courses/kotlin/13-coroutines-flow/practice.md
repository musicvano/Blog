---
title: "Практика"
description: "Тема 13. Корутини та Flow: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Паралельний підрахунок

Знайти суму цілих чисел від 1 до 1000, поділивши діапазон між двома задачами. Проміжні суми локальні; спільного змінного накопичувача немає. Область повертає результат лише після обох частин. Перевірка кожної ітерації забезпечує кооперативне скасування.

```kotlin
import kotlinx.coroutines.*
import kotlin.coroutines.coroutineContext

suspend fun sumRange(first: Int, last: Int): Long {
    require(first >= 1 && last >= first)
    var sum = 0L
    for (number in first..last) {
        coroutineContext.ensureActive()
        sum += number
    }
    return sum
}

suspend fun parallelSum(): Long = coroutineScope {
    val left = async(Dispatchers.Default) {
        sumRange(1, 500)
    }
    val right = async(Dispatchers.Default) {
        sumRange(501, 1000)
    }
    left.await() + right.await()
}

fun main() = runBlocking {
    val result = parallelSum()
    check(result == 500500L)
    check(sumRange(1, 1) == 1L)
    println("Сума: $result")
}
```

```text
Сума: 500500
```

Для такого малого діапазону створення задач дорожче самого додавання. Мета прикладу – правильне розбиття, а не прискорення. При довільній кількості частин перевіряйте межі: жодне число не повинно потрапити у дві частини або загубитися між ними. Значення `first > last` тут є помилкою, а не порожнім діапазоном.

## Приклад 2. Незалежні перевірки у супервізорі

Імітуємо два джерела: перше відповідає, друге завершується предметною помилкою. Після запуску обох читаємо кожний результат. Не перетворюємо скасування власника на повідомлення про збій сервера.

```kotlin
import kotlinx.coroutines.*

suspend fun inspect(): List<String> = supervisorScope {
    val jobs = listOf(
        async {
            delay(5)
            "A: доступний"
        },
        async<String> {
            delay(1)
            error("B: немає відповіді")
        }
    )
    jobs.map { job ->
        try {
            job.await()
        } catch (e: CancellationException) {
            throw e
        } catch (e: IllegalStateException) {
            e.message ?: "Невідома помилка"
        }
    }
}

fun main() = runBlocking {
    val results = inspect()
    results.forEach(::println)
    check(results.first() == "A: доступний")
    check(results.last() == "B: немає відповіді")
}
```

```text
A: доступний
B: немає відповіді
```

Порядок рядків визначений порядком списку, а не часом завершення. Виключення обробляється на межі окремого результату. Якщо замінити `supervisorScope` на `coroutineScope`, збій другої задачі скасує область та першу задачу: це інший контракт, а не випадкова помилка.

## Приклад 3. Пошук після паузи введення

Послідовність введення фіксована, щоб приклад можна було повторити без мережі й клавіатурного таймінгу. Перші два префікси надходять швидко; третій залишається стабільним довше вікна `debounce`. Порожній завершальний запит відфільтровується до пошуку.

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

@OptIn(FlowPreview::class)
fun main() = runBlocking {
    val words = listOf("Kotlin", "Java", "Ktor")
    val queries = flow {
        emit("K")
        delay(10)
        emit("Ko")
        delay(10)
        emit("Kot")
        delay(100)
        emit("")
    }
    val answers = queries
        .debounce(50)
        .filter { it.isNotBlank() }
        .map { query ->
            words.filter { it.startsWith(query, true) }
        }
        .toList()
    println(answers)
    check(answers == listOf(listOf("Kotlin")))
}
```

```text
[[Kotlin]]
```

Реальний таймер залежить від планування ОС, тому для автоматичного тесту слід перенести конвеєр у функцію й перевірити його під `runTest`. Окремо перевірте запит без збігів, порожній потік, змішані регістри та швидке надходження двох різних запитів. За наявності довгого пошуку додайте скасування попередньої операції, а не лише затримку перед її початком.
