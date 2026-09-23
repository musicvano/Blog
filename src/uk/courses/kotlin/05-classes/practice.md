---
title: "Практика"
description: "Тема 5. Класи та об’єкти: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Прямокутник без дублювання площі

Сторони скінченні й додатні. Метод масштабування спочатку обчислює та перевіряє обидва результати, лише після цього змінює стан. Це важливо: друга перевірка не повинна залишити вже зміненою першу сторону. Одиниці довжини умовні.

```kotlin
class Rectangle(width: Double, height: Double) {
    var width = checked(width)
        private set
    var height = checked(height)
        private set
    val area: Double get() = width * height
    val perimeter: Double get() = 2 * (width + height)

    private fun checked(value: Double): Double {
        require(value.isFinite() && value in 0.001..1e6)
        return value
    }

    fun scale(factor: Double) {
        val w = checked(width * factor)
        val h = checked(height * factor)
        width = w
        height = h
    }
}

fun main() {
    val r = Rectangle(3.0, 4.0)
    println("${r.area}; ${r.perimeter}")
    r.scale(2.0)
    println("${r.area}; ${r.perimeter}")
    try {
        r.scale(-1.0)
    } catch (e: IllegalArgumentException) {
        println("Rejected")
    }
    println("${r.width} x ${r.height}")
}
```

```text
12.0; 14.0
48.0; 28.0
Rejected
6.0 x 8.0
```

## Приклад 2. Годинник із нормалізацією

Година нормалізується до 0..23, хвилина – до 0..59. Окремий запис хвилини не переносить години: `minute = 75` означає компонент 15. Для додавання тривалості є `addMinutes`, який працює з повним числом хвилин доби. Це різні операції з явно визначеним контрактом. `floorMod` коректно обробляє від’ємні значення, на відміну від простого залишку `%`.

```kotlin
class Clock(hour: Int = 0, minute: Int = 0) {
    var hour: Int = Math.floorMod(hour, 24)
        set(value) { field = Math.floorMod(value, 24) }
    var minute: Int = Math.floorMod(minute, 60)
        set(value) { field = Math.floorMod(value, 60) }

    fun addMinutes(delta: Int) {
        val total = hour * 60 + minute
        val normalized = Math.floorMod(
            total + Math.floorMod(delta, 1440), 1440
        )
        hour = normalized / 60
        minute = normalized % 60
    }

    override fun toString(): String =
        hour.toString().padStart(2, '0') + ":" +
        minute.toString().padStart(2, '0')
}

fun main() {
    val clock = Clock(23, 50)
    clock.addMinutes(25)
    println(clock)
    clock.minute = -1
    println(clock)
    clock.hour = 25
    println(clock)
}
```

```text
00:15
00:59
01:59
```

## Приклад 3. Плеєр і пов’язані типи

Track не залежить від конкретного плеєра, тому є вкладеним класом. Playback прив’язаний до власника через `inner`. У прикладі немає відтворення звуку: програма моделює стан й повертає опис, придатний для перевірки.

```kotlin
class Player(val name: String) {
    var volume: Int = 50
        private set

    class Track(val title: String, val seconds: Int) {
        init {
            require(title.isNotBlank() && seconds > 0)
        }
    }

    inner class Playback(private val track: Track) {
        fun setVolume(value: Int) {
            require(value in 0..100)
            this@Player.volume = value
        }

        fun describe(): String =
            "${this@Player.name}: ${track.title}, $volume%"
    }
}

fun main() {
    val first = Player("Desk")
    val second = Player("Room")
    val track = Player.Track("Study", 120)
    val playback = first.Playback(track)
    playback.setVolume(30)
    println(playback.describe())
    println("second=${second.volume}%")
}
```

```text
Desk: Study, 30%
second=50%
```
