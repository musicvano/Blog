---
title: "Practice"
description: "Topic 16. MVVM and navigation: worked examples"
outline: [2, 3]
sourceHash: "3d5f97597e29180935b27de47f918ee595f51e206a5da89bed5e96dee1dc33fb"
---

# Practice

## Example 1. An MVVM currency converter

The rate is a fixed educational one, not a current quotation. The ViewModel checks the finiteness and range of the amount, and the UI only displays the state. Financial accounting needs exact decimal arithmetic and an agreed rounding rule; this example demonstrates MVVM.

```kotlin
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.*
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.compose.viewModel
import kotlinx.coroutines.flow.*

data class CurrencyState(val input: String = "",
    val result: Double? = null, val error: String? = null)

class CurrencyViewModel : ViewModel() {
    private val mutable = MutableStateFlow(CurrencyState())
    val state = mutable.asStateFlow()
    fun edit(text: String) {
        val number = text.replace(',', '.').toDoubleOrNull()
        val valid = number != null && number.isFinite() &&
            number in 0.0..1_000_000.0
        mutable.value = CurrencyState(text,
            if (valid) number * 40.0 else null,
            if (valid || text.isEmpty()) null else "Amount 0–1000000")
    }
}

@Composable
fun CurrencyScreen(model: CurrencyViewModel = viewModel {
    CurrencyViewModel()
}) {
    val state by model.state.collectAsState()
    Column(Modifier.padding(20.dp)) {
        Text("Educational rate: 1 unit = 40 UAH")
        OutlinedTextField(state.input, onValueChange = model::edit,
            label = { Text("Amount") }, isError = state.error != null)
        Text(state.result?.let { "$it UAH" } ?: "No result")
        state.error?.let { Text(it) }
    }
}

fun main() = application {
    Window(onCloseRequest = ::exitApplication, title = "Converter") {
        MaterialTheme { CurrencyScreen() }
    }
}
```

For `2,5` the result is `100.0 UAH`; for `-1`, `NaN`, and infinity there is no result. A ViewModel test calls `edit` without a composable and compares `state.value`.

## Example 2. A contact catalog

We pass a numeric id to the details screen. The data is provided by a small in-memory repository; navigation does not pass a copy of the whole contact. The details component receives a domain object and a back callback.

```kotlin
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.*
import androidx.navigation.compose.*
import androidx.navigation.toRoute
import kotlinx.serialization.Serializable

data class Contact(val id: Int, val name: String, val phone: String)
class Contacts {
    val all = listOf(Contact(1, "Olena", "+380000000001"),
        Contact(2, "Taras", "+380000000002"))
    fun find(id: Int): Contact? = all.find { it.id == id }
}
@Serializable object ContactList
@Serializable data class ContactDetail(val id: Int)

@Composable
fun Detail(contact: Contact?, back: () -> Unit) {
    Column(Modifier.padding(20.dp)) {
        Text(contact?.name ?: "Contact not found")
        contact?.let { Text(it.phone) }
        Button(onClick = back) { Text("Back") }
    }
}

@Composable
fun ContactApp(repository: Contacts) {
    val navigation = rememberNavController()
    NavHost(navigation, startDestination = ContactList) {
        composable<ContactList> {
            Column(Modifier.padding(20.dp)) {
                for (contact in repository.all) {
                    Button(onClick = {
                        navigation.navigate(ContactDetail(contact.id))
                    }) { Text(contact.name) }
                }
            }
        }
        composable<ContactDetail> { entry ->
            val id = entry.toRoute<ContactDetail>().id
            Detail(repository.find(id), back = {
                navigation.popBackStack()
            })
        }
    }
}

fun main() {
    val repository = Contacts()
    application {
        Window(onCloseRequest = ::exitApplication,
            title = "Contacts") {
            MaterialTheme { ContactApp(repository) }
        }
    }
}
```

The numbers are for demonstration only. For id 2, Taras and `+380000000002` are shown; an unknown id shows a message. Test going back several times: the history must not grow without bound because a new list is created instead of popping the details off the stack.

## Example 3. A book catalog and save confirmation

This self-contained example has an SQLite repository. The user enters an id to edit or delete; an empty id means a new book. The message is kept in the state until the Snackbar has finished showing. During an action the fields are disabled, so a response does not clear a newer draft.

```kotlin
import java.nio.file.Files
import java.nio.file.Path
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.*
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.compose.viewModel
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import org.jetbrains.exposed.v1.core.*
import org.jetbrains.exposed.v1.jdbc.*
import org.jetbrains.exposed.v1.jdbc.transactions.transaction

data class Book(val id: Int, val title: String)
object BookTable : Table("books") {
    val id = integer("id").autoIncrement()
    val title = varchar("title", 120)
    override val primaryKey = PrimaryKey(id)
}
class BookRepository(private val db: Database) {
    suspend fun execute(id: Int?, title: String?,
        delete: Boolean = false): List<Book> =
        withContext(Dispatchers.IO) {
            transaction(db) {
                maxAttempts = 1
                SchemaUtils.create(BookTable)
                if (delete) {
                    requireNotNull(id)
                    val removed = BookTable.deleteWhere {
                        BookTable.id eq id
                    }
                    check(removed == 1)
                } else if (title != null) {
                    require(title.trim().length in 1..120)
                    if (id == null) {
                        BookTable.insert {
                            it[BookTable.title] = title.trim()
                        }
                    } else {
                        val count = BookTable.update({
                            BookTable.id eq id
                        }) {
                            it[BookTable.title] = title.trim()
                        }
                        check(count == 1)
                    }
                }
                BookTable.selectAll().orderBy(BookTable.id).map {
                    Book(it[BookTable.id], it[BookTable.title])
                }
            }
        }
}
data class BookState(val id: String = "", val title: String = "",
    val rows: List<Book> = emptyList(), val busy: Boolean = false,
    val message: String? = null)

class BookViewModel(private val repository: BookRepository)
    : ViewModel() {
    private val mutable = MutableStateFlow(BookState())
    val state = mutable.asStateFlow()
    fun editId(text: String) { mutable.update { it.copy(id = text) } }
    fun editTitle(text: String) {
        mutable.update { it.copy(title = text) }
    }
    fun acknowledged() { mutable.update { it.copy(message = null) } }
    fun apply(load: Boolean = false, delete: Boolean = false) {
        val before = mutable.value
        if (before.busy) return
        val id = before.id.toIntOrNull()?.takeIf { it > 0 }
        if (!load && ((before.id.isNotBlank() && id == null) ||
            (delete && id == null) ||
            (!delete && before.title.trim().length !in 1..120))) {
            mutable.update {
                it.copy(message = "Check the id and the title")
            }
            return
        }
        mutable.update { it.copy(busy = true) }
        viewModelScope.launch {
            try {
                val rows = repository.execute(
                    if (load) null else id,
                    if (load || delete) null else before.title,
                    delete)
                mutable.update { it.copy(rows = rows,
                    message = if (load) "Refreshed" else "Saved") }
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                mutable.update {
                    it.copy(message = "The operation failed")
                }
            } finally {
                mutable.update { it.copy(busy = false) }
            }
        }
    }
}

@Composable
fun BooksScreen(model: BookViewModel) {
    val state by model.state.collectAsState()
    val snackbar = remember { SnackbarHostState() }
    LaunchedEffect(model) { model.apply(load = true) }
    LaunchedEffect(state.message) {
        state.message?.let {
            snackbar.showSnackbar(it)
            model.acknowledged()
        }
    }
    Scaffold(snackbarHost = { SnackbarHost(snackbar) }) { padding ->
        Column(Modifier.padding(padding).padding(16.dp)) {
            OutlinedTextField(state.id, model::editId,
                label = { Text("id; empty for a new book") },
                enabled = !state.busy)
            OutlinedTextField(state.title, model::editTitle,
                label = { Text("Title") }, enabled = !state.busy)
            Row {
                Button(enabled = !state.busy,
                    onClick = { model.apply() }) { Text("Save") }
                Button(enabled = !state.busy,
                    onClick = { model.apply(delete = true) }) {
                    Text("Delete")
                }
            }
            for (book in state.rows) Text("${book.id}: ${book.title}")
        }
    }
}

fun main() {
    val directory = Path.of(System.getProperty("user.home"),
        ".course-books")
    Files.createDirectories(directory)
    val db = Database.connect(
        "jdbc:sqlite:${directory.resolve("books.db")}",
        "org.sqlite.JDBC")
    val repository = BookRepository(db)
    application {
        Window(onCloseRequest = ::exitApplication, title = "Books") {
            val model = viewModel { BookViewModel(repository) }
            MaterialTheme { BooksScreen(model) }
        }
    }
}
```

Add a book with an empty id, read the assigned id in the list, change the title by that id, and delete the record. An attempt to change an unknown id returns an error. The draft is not cleared, so pressing the button again with an empty id means adding one more book: preventing duplicates requires a separate domain rule.

For a large catalog, replace the ordinary loop with a LazyColumn. For a queue of identical messages, add a messageId: StateFlow conflates equal values, and the effect's key must distinguish events. This small example shows a single current operation status.
