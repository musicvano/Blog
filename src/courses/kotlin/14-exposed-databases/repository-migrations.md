---
title: "Repository, migrations, and tests"
description: "Topic 14. Databases with Exposed: Repository, migrations, and tests"
outline: [2, 3]
sourceHash: "ca9c93b67f9259ac085765a1b76668adeaae42f4a7e5f87afd1ac91379d7e3a8"
---

# Repository, migrations, and tests

## The repository and coroutines

A **repository** provides a domain API, for example `listBooks`, and keeps SQL inside. It returns data classes, not lazy Query objects or DAO entities. The result must be materialized before the transaction ends. This simplifies testing and does not tie a screen to an active JDBC connection.

JDBC is blocking. The `suspend` modifier does not turn it into a non-blocking driver. In the example, `withContext(IO)` moves a short ordinary transaction to the appropriate pool. The transaction contains no additional suspensions and does not hand its state over to another thread.

### Example 4. An asynchronous title repository

```kotlin
import java.nio.file.Files
import kotlinx.coroutines.*
import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.jdbc.*
import org.jetbrains.exposed.v1.jdbc.transactions.transaction

object Titles : Table("titles") {
    val id = integer("id").autoIncrement()
    val name = varchar("name", 120).uniqueIndex()
    override val primaryKey = PrimaryKey(id)
}

data class Title(val id: Int, val name: String)

class TitleRepository(private val db: Database) {
    suspend fun add(name: String): Unit =
        withContext(Dispatchers.IO) {
            require(name.isNotBlank() && name.length <= 120)
            transaction(db) {
                Titles.insert { it[Titles.name] = name.trim() }
            }
        }

    suspend fun all(): List<Title> = withContext(Dispatchers.IO) {
        transaction(db) {
            Titles.selectAll().orderBy(Titles.id).map {
                Title(it[Titles.id], it[Titles.name])
            }
        }
    }
}

fun main() = runBlocking {
    val path = Files.createTempFile("titles-", ".db")
    val db = Database.connect("jdbc:sqlite:$path",
        "org.sqlite.JDBC")
    withContext(Dispatchers.IO) {
        transaction(db) { SchemaUtils.create(Titles) }
    }
    val repository = TitleRepository(db)
    repository.add("Kobzar")
    println(repository.all())
    path.toFile().deleteOnExit()
}
```

```text
[Title(id=1, name=Kobzar)]
```

Exposed has a separate `exposed-r2dbc` module with a reactive driver and `suspendTransaction`. This is a different execution model; do not copy its imports into a JDBC project. Old examples with `newSuspendedTransaction` need to be checked against the current API migration. For our SQLite program, an explicit short JDBC transaction on `Dispatchers.IO` is enough.

## Migrations, protection, and tests

Once real data appears, the schema is changed with versioned migrations. A migration adds a column, moves values, creates an index, and must be tested on a copy of the previous version of the database. Exposed provides tools for generating migrations; Flyway is a separate tool for managing SQL migrations. An automatic schema diff must be read before it is applied, especially when data is deleted.

Parameterized DSL conditions protect values from SQL injection. If raw SQL is needed, use driver parameters, not `"... WHERE name = '$name'"`. Table names or a sort direction chosen by the user are checked against an allowlist: a value parameter does not substitute arbitrary SQL syntax.

A repository test creates its own temporary database, prepares the schema, performs the operation, and reads the result in a new transaction. Test an empty list, a duplicate of a unique field, an unknown foreign key, deleting a missing id, a rollback after the first change, and reopening the file. An in-memory SQLite database can be tied to the lifetime of a connection, so a file is often simpler for a test.

H2 is fast for some tests, but it is not an exact emulator of SQLite or PostgreSQL. Tests of key constraints and transactions should be repeated on the DBMS the application will use. A fake repository tests UI logic, and an integration test with the driver tests SQL; these checks complement each other.

### Checking the schema before the domain logic

First, check that the database actually enforces the declared constraints. This is a separate question from the correctness of the Kotlin form: a user can open the file with another client. Prepare three scenarios, each in its own transaction on a new temporary file.

1. Insert an author and a book with that author's id. After COMMIT, read them again in a new transaction and compare the fields.
2. Try to insert a book with the id of an author who does not exist. The exception must leave the transaction, and the number of books must stay the same.
3. Try to delete an author referenced by a book. The result must match the chosen ON DELETE: prohibition, cascade, or clearing a nullable reference. Do not accept any behavior as success just because the process did not crash.

Checking `PRAGMA foreign_keys` on the same connection helps you find disabled reference checks. A value of 0 explains why a "correct" schema let an unknown key through. Enabling it on one connection of the pool is not enough: every connection needs the setting.

Next, check the transfer invariant: the sum of two balances before and after a successful operation is the same. After an artificial failure, both balances must equal their initial values. For an insufficient balance, no table must change, including the operation log. Such a test checks the result that matters to the domain.

### Handling failures and logging

Distinguish invalid data, temporary database contention, and a programming error. The user needs a clear message about a failed operation; the developer needs the cause and context without passwords or unnecessary personal data. Retrying an SQL query after every exception can hide a corrupted schema or execute an external action multiple times.

On JDK 27, SQLite JDBC uses a native library. For a trusted dependency, the JVM option `--enable-native-access=ALL-UNNAMED` explicitly allows such access. A warning about SLF4J without a provider means that no logging backend is attached; it is not evidence of an SQL error. For educational results, separate domain stdout from diagnostic stderr. Check non-ASCII text (for example, Ukrainian) in redirected output with a consistent UTF-8 encoding in the terminal and the JVM.
