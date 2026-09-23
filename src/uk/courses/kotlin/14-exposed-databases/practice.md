---
title: "Практика"
description: "Тема 14. Бази даних з Exposed: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Облік студентів

Створити студента, змінити бал, прочитати результат і видалити рядок. Демонстрація повного CRUD використовує окрему тимчасову базу; повторний запуск не залежить від попередніх записів.

```kotlin
import java.nio.file.Files
import org.jetbrains.exposed.v1.core.dao.id.IntIdTable
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.jdbc.*
import org.jetbrains.exposed.v1.jdbc.transactions.transaction

object Students : IntIdTable("students") {
    val name = varchar("name", 80)
    val points = integer("points")
}

fun main() {
    val path = Files.createTempFile("students-", ".db")
    val db = Database.connect("jdbc:sqlite:$path",
        "org.sqlite.JDBC")
    transaction(db) {
        SchemaUtils.create(Students)
        val id = Students.insertAndGetId {
            it[name] = "Олена"
            it[points] = 80
        }
        val changed = Students.update({ Students.id eq id }) {
            it[points] = 90
        }
        check(changed == 1)
        val row = Students.selectAll()
            .where { Students.id eq id }.single()
        println("${row[Students.name]}: ${row[Students.points]}")
        check(Students.deleteWhere { Students.id eq id } == 1)
        println("Залишилося: ${Students.selectAll().count()}")
    }
    path.toFile().deleteOnExit()
}
```

```text
Олена: 90
Залишилося: 0
```

У формі введення перевіряють діапазон бала до транзакції. Для постійного журналу додайте CHECK-обмеження в схемі міграції, щоб інший клієнт також не міг записати бал за межами 0–100. Окремий тест має оновити невідомий id і отримати нуль рядків.

## Приклад 2. Звіт продажів із нульовими групами

Вивести кількість рядків продажів кожного товару, включно з товаром без продажів. `count` рахує ненульовий ключ правої таблиці; `count(*)` у зовнішньому з’єднанні мав би інший зміст.

```kotlin
import java.nio.file.Files
import org.jetbrains.exposed.v1.core.*
import org.jetbrains.exposed.v1.jdbc.*
import org.jetbrains.exposed.v1.jdbc.transactions.transaction

object Goods : Table("goods") {
    val id = integer("id")
    val name = varchar("name", 80)
    override val primaryKey = PrimaryKey(id)
}
object Sales : Table("sales") {
    val id = integer("id").autoIncrement()
    val good = integer("good_id").references(Goods.id)
    override val primaryKey = PrimaryKey(id)
}

fun main() {
    val path = Files.createTempFile("sales-", ".db")
    val db = Database.connect(
        "jdbc:sqlite:$path?foreign_keys=on", "org.sqlite.JDBC"
    )
    transaction(db) {
        SchemaUtils.create(Goods, Sales)
        for ((id, name) in listOf(1 to "Чай", 2 to "Кава")) {
            Goods.insert {
                it[Goods.id] = id
                it[Goods.name] = name
            }
        }
        repeat(2) { Sales.insert { it[good] = 1 } }
        val count = Sales.id.count()
        val report = (Goods leftJoin Sales)
            .select(Goods.name, count)
            .groupBy(Goods.id, Goods.name).orderBy(Goods.id)
            .map { it[Goods.name] to it[count] }
        report.forEach { (name, number) ->
            println("$name: $number")
        }
        check(report == listOf("Чай" to 2L, "Кава" to 0L))
    }
    path.toFile().deleteOnExit()
}
```

```text
Чай: 2
Кава: 0
```

Додавання умови `Sales.id greater 0` у WHERE вилучить рядок без продажів. Поясніть на захисті, чому це змінює звіт. Суми продажів потребують окремого поля точної вартості: кількість рядків не дорівнює виручці чи кількості одиниць товару.

## Приклад 3. Переказ балів і перевірка відкату

Після зменшення першого балансу штучно кидаємо виняток. Перевірку виконуємо новою транзакцією. Потім повторюємо переказ без збою й перевіряємо обидва кінцеві баланси.

```kotlin
import java.nio.file.Files
import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.jdbc.*
import org.jetbrains.exposed.v1.jdbc.transactions.transaction

object Wallets : Table("wallets") {
    val id = integer("id")
    val points = integer("points")
    override val primaryKey = PrimaryKey(id)
}

fun balances(db: Database): List<Int> = transaction(db) {
    Wallets.selectAll().orderBy(Wallets.id).map {
        it[Wallets.points]
    }
}

fun transfer(db: Database, amount: Int, fail: Boolean) {
    require(amount > 0)
    transaction(db) {
        maxAttempts = 1
        val rows = Wallets.selectAll().orderBy(Wallets.id)
            .map { it[Wallets.points] }
        require(rows.size == 2 && rows[0] >= amount)
        val target = Math.addExact(rows[1], amount)
        Wallets.update({ Wallets.id eq 1 }) {
            it[points] = rows[0] - amount
        }
        check(!fail) { "Імітований збій" }
        Wallets.update({ Wallets.id eq 2 }) {
            it[points] = target
        }
    }
}

fun main() {
    val path = Files.createTempFile("wallets-", ".db")
    val db = Database.connect("jdbc:sqlite:$path",
        "org.sqlite.JDBC")
    transaction(db) {
        SchemaUtils.create(Wallets)
        for (number in 1..2) {
            Wallets.insert { it[id] = number; it[points] = 100 }
        }
    }
    try {
        transfer(db, 30, true)
        error("Очікували виняток")
    } catch (e: IllegalStateException) {
        check(e.message == "Імітований збій")
    }
    check(balances(db) == listOf(100, 100))
    println("Після відкату: ${balances(db)}")
    transfer(db, 30, false)
    check(balances(db) == listOf(70, 130))
    println("Після переказу: ${balances(db)}")
    path.toFile().deleteOnExit()
}
```

```text
Після відкату: [100, 100]
Після переказу: [70, 130]
```

Приклад розрахований на послідовні навчальні виклики. Для конкурентних клієнтів перевіряйте ізоляцію цільової СКБД, блокування або атомарне умовне оновлення й повторні спроби. Тест відкату не доводить правильності всіх конкурентних сценаріїв. Нульова сума й сума понад залишок мають відхилятися без змін.
