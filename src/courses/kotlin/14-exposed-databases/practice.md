---
title: "Practice"
description: "Topic 14. Databases with Exposed: worked examples"
outline: [2, 3]
sourceHash: "da149660dd43b8f08a584bf99adf883b2126f210f560e4fe7e255a6328bb8354"
---

# Practice

## Example 1. Student records

Create a student, change the score, read the result, and delete the row. The demonstration of full CRUD uses a separate temporary database; a repeated run does not depend on previous records.

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
            it[name] = "Olena"
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
        println("Remaining: ${Students.selectAll().count()}")
    }
    path.toFile().deleteOnExit()
}
```

```text
Olena: 90
Remaining: 0
```

In the input form, the score range is checked before the transaction. For a persistent gradebook, add a CHECK constraint to the migration schema so that another client also cannot write a score outside 0–100. A separate test should update an unknown id and get zero rows.

## Example 2. A sales report with empty groups

Print the number of sales rows for each product, including a product without sales. `count` counts the non-null key of the right table; `count(*)` in an outer join would have a different meaning.

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
        for ((id, name) in listOf(1 to "Tea", 2 to "Coffee")) {
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
        check(report == listOf("Tea" to 2L, "Coffee" to 0L))
    }
    path.toFile().deleteOnExit()
}
```

```text
Tea: 2
Coffee: 0
```

Adding the condition `Sales.id greater 0` to WHERE would remove the row without sales. Explain during the presentation why this changes the report. Sales totals need a separate field with the exact cost: the number of rows is not equal to revenue or to the number of units sold.

## Example 3. Transferring points and checking the rollback

After decreasing the first balance, we throw an exception artificially. The check is performed in a new transaction. Then we repeat the transfer without a failure and check both final balances.

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
        check(!fail) { "Simulated failure" }
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
        error("Expected an exception")
    } catch (e: IllegalStateException) {
        check(e.message == "Simulated failure")
    }
    check(balances(db) == listOf(100, 100))
    println("After rollback: ${balances(db)}")
    transfer(db, 30, false)
    check(balances(db) == listOf(70, 130))
    println("After transfer: ${balances(db)}")
    path.toFile().deleteOnExit()
}
```

```text
After rollback: [100, 100]
After transfer: [70, 130]
```

The example is designed for sequential educational calls. For concurrent clients, check the isolation of the target DBMS, locking or an atomic conditional update, and retries. A rollback test does not prove the correctness of all concurrent scenarios. A zero amount and an amount above the balance must be rejected without changes.
