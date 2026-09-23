---
title: "Практика"
description: "Тема 6. Наслідування та поліморфізм: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Вартість поїздки

Клієнт працює з Transport. Кожна реалізація приймає однакову допустиму відстань 0..1000 км і повертає невід’ємну вартість у копійках. Тарифи умовні. Для нульової відстані обидва види повертають нуль, щоб зберегти спільний контракт.

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

## Приклад 2. Шаблонний метод звіту

Метод render остаточний за замовчуванням: підкласи не змінюють порядок заголовка, тіла та завершення. Вони реалізують лише захищений крок body. Така структура забезпечує єдиний формат без копіювання всього алгоритму в кожному класі.

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

## Приклад 3. Рахунок як сутність зі стабільним номером

Клас Account остаточний, тому правило рівності не може бути неузгоджено розширене підкласом. Два об’єкти з однаковим номером представляють одну сутність, навіть якщо локально завантажений баланс різний. Для реального обліку це потребувало б окремого правила синхронізації; приклад демонструє лише контракт рівності.

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
