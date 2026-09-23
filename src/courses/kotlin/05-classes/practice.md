---
title: "Practice"
description: "Topic 5. Classes and objects: worked examples"
outline: [2, 3]
sourceHash: "88da1dd0221a278764b617f306964af19034277a841f4e3b2c8addb12e69ff4e"
---

# Practice

## Example 1. A rectangle without duplicating area

The sides are finite and positive. The scaling method first calculates and validates both results, then changes state. This matters: the second check must not leave the first side already changed. Length units are arbitrary.

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

## Example 2. A clock with normalization

Hours are normalized to 0..23, and minutes to 0..59. Assigning a minute component separately does not carry into hours: `minute = 75` means a component of 15. For adding a duration, `addMinutes` works with total minutes since the start of the day. These are different operations with explicit contracts. Unlike the simple remainder `%`, `floorMod` handles negative values correctly.

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

## Example 3. A player and related types

Track does not depend on a particular player, so it is a nested class. Playback is linked to its owner through `inner`. This example does not play audio: the program models state and returns a testable description.

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
