---
title: "Практика"
description: "Тема 15. Compose Multiplatform: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Калькулятор чайових

Суму задають у копійках; відсоток – слайдером. Прапорець округлює загальний платіж до наступної гривні. Формулу винесено зі composable, щоб перевіряти переповнення та округлення окремо.

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
            label = { Text("Рахунок, коп.") },
            isError = cents == null)
        Text("Чайові: ${percent.roundToInt()} %")
        Slider(percent, onValueChange = { percent = it },
            valueRange = 0f..30f, steps = 29)
        Row {
            Switch(round, onCheckedChange = { round = it })
            Text("До наступної гривні")
        }
        Text(cents?.let {
            "Разом: ${payment(it, percent.roundToInt(), round)} коп."
        } ?: "Перевірте суму")
    }
}

fun main() = application {
    Window(onCloseRequest = ::exitApplication, title = "Чайові") {
        MaterialTheme { Tips() }
    }
}
```

Для 10000 копійок і 10 % результат – 11000 копійок. Для 10001 копійки й 0 % з округленням – 10100 копійок. Від’ємне число та значення понад межу не допускаються. Цілі розрахунки дають визначене правило округлення без похибки Double.

## Приклад 2. Анкета учасника

Форма містить ім’я, один із двох форматів участі та згоду з навчальними умовами. Кнопка готова лише після перевірки. Підтвердження зберігає знімок даних, а не посилання на змінну чернетку.

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
    var mode by remember { mutableStateOf("Онлайн") }
    var consent by remember { mutableStateOf(false) }
    var saved by remember { mutableStateOf<String?>(null) }
    Column(Modifier.padding(20.dp)) {
        OutlinedTextField(name, onValueChange = { name = it },
            label = { Text("Ім’я, 2–60 символів") },
            isError = name.isNotEmpty() && !validName(name))
        for (option in listOf("Онлайн", "В аудиторії")) {
            Row {
                RadioButton(mode == option,
                    onClick = { mode = option })
                Text(option)
            }
        }
        Row {
            Checkbox(consent, onCheckedChange = { consent = it })
            Text("Погоджуюся з умовами навчального заходу")
        }
        Button(enabled = validName(name) && consent,
            onClick = { saved = "${name.trim()}: $mode" }) {
            Text("Підтвердити")
        }
        saved?.let { Text("Збережений знімок: $it") }
    }
}

fun main() = application {
    Window(onCloseRequest = ::exitApplication, title = "Анкета") {
        MaterialTheme { Registration() }
    }
}
```

Для порожнього імені кнопка неактивна; лише прапорець не робить форму коректною. Після підтвердження «Олена: Онлайн» подальше редагування чернетки не змінює збережений напис до нового натискання. У реальному застосунку підтвердження передає об’єкт репозиторію, а не лише формує рядок на екрані.

## Приклад 3. Секундомір із колами

Монотонний годинник вимірює інтервал. При паузі накопичуємо пройдені наносекунди; при продовженні задаємо нову початкову точку. Корутина ефекту лише оновлює показник кожні 30 мс.

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
        Text("${nanos / 1_000_000} мс")
        Row {
            Button(onClick = {
                if (running) clock.pause() else clock.resume()
                running = !running
                nanos = clock.elapsed()
            }) { Text(if (running) "Пауза" else "Старт") }
            Button(enabled = running, onClick = {
                laps.add(clock.elapsed())
            }) { Text("Коло") }
            Button(onClick = {
                running = false
                clock.reset()
                nanos = 0
                laps.clear()
            }) { Text("Скинути") }
        }
        LazyColumn {
            itemsIndexed(laps) { index, time ->
                Text("${index + 1}: ${time / 1_000_000} мс")
            }
        }
    }
}

fun main() = application {
    Window(onCloseRequest = ::exitApplication,
        title = "Секундомір") {
        MaterialTheme { StopwatchScreen() }
    }
}
```

Кола показують накопичений час від старту, а не різницю між сусідніми колами. Індекси тут допустимі для списку, де елементи лише додаються в кінець або всі разом видаляються. Для довільного редагування потрібні сталі id. Тестуйте модель з підставним годинником: 100 нс роботи, пауза, ще 50 нс роботи дають 150 нс, незалежно від тривалості паузи.
