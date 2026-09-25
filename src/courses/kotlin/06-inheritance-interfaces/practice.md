---
title: "Practice"
description: "Topic 6. Inheritance and polymorphism: worked examples"
outline: [2, 3]
sourceHash: "b231d2308833917d4769c0b2c874f513943bdb144c7135d6e53bc48317c874e4"
---

# Practice

## Example 1. Trip cost

The client works with Transport. Each implementation accepts the same valid distance of 0..1000 km and returns a nonnegative cost in kopiykas. The fares are fictional. For a zero distance, both types return zero to preserve the common contract.

```kotlin
abstract class Transport(val name: String) {
    fun cost(km: Int): Long {
        require(km in 0..1000)
        return if (km == 0) 0 else calculate(km)
    }

    protected abstract fun calculate(km: Int): Long
}

class Bus : Transport("Bus") {
    override fun calculate(km: Int): Long = km * 150L
}

class Taxi : Transport("Taxi") {
    override fun calculate(km: Int): Long = 4000 + km * 800L
}

fun main() {
    val vehicles: Array<Transport> = arrayOf(Bus(), Taxi())
    for (vehicle in vehicles) {
        println("${vehicle.name}: ${vehicle.cost(10)}")
        println("zero=${vehicle.cost(0)}")
    }
}
```

```text
Bus: 1500
zero=0
Taxi: 12000
zero=0
```

## Example 2. A report template method

The render method is final by default: subclasses do not change the order of the header, body, and ending. They implement only the protected body step. This structure ensures a consistent format without copying the entire algorithm into every class.

```kotlin
abstract class Report(private val title: String) {
    init { require(title.isNotBlank()) }
    fun render(): String =
        "[$title]\n${body()}\nEND"
    protected abstract fun body(): String
}

class AttendanceReport(private val present: Int) :
    Report("Attendance") {
    init { require(present in 0..100) }
    override fun body(): String = "present=$present"
}

class StockReport(private val quantity: Int) : Report("Stock") {
    init { require(quantity >= 0) }
    override fun body(): String = "quantity=$quantity"
}

fun main() {
    val reports: Array<Report> = arrayOf(
        AttendanceReport(24), StockReport(15)
    )
    for (report in reports) println(report.render())
}
```

```text
[Attendance]
present=24
END
[Stock]
quantity=15
END
```

## Example 3. An account as an entity with a stable number

Account is final, so a subclass cannot extend its equality rule inconsistently. Two objects with the same number represent one entity, even if their locally loaded balances differ. Real accounting would require a separate synchronization rule; this example demonstrates only the equality contract.

```kotlin
class Account(val id: String, val balance: Long) {
    init {
        require(id.isNotBlank() && balance >= 0)
    }

    override fun equals(other: Any?): Boolean =
        other is Account && id == other.id

    override fun hashCode(): Int = id.hashCode()

    override fun toString(): String =
        "Account(id=$id, balance=$balance)"
}

fun main() {
    val first = Account("A1", 1000)
    val second = Account("A1", 1500)
    val third = Account("A2", 1000)
    println(first == second)
    println(first.hashCode() == second.hashCode())
    println(first === second)
    println(first == third)
    println(first)
}
```

```text
true
true
false
false
Account(id=A1, balance=1000)
```
