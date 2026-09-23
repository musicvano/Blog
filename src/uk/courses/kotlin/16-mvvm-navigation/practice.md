---
title: "Практика"
description: "Тема 16. MVVM і навігація: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Конвертер валют MVVM

Курс фіксований навчальний, не актуальне котирування. ViewModel перевіряє скінченність і діапазон суми, а UI лише відображає стан. Для фінансового обліку потрібні точна десяткова арифметика та погоджене правило округлення; цей приклад демонструє MVVM.

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
            if (valid || text.isEmpty()) null else "Сума 0–1000000")
    }
}

@Composable
fun CurrencyScreen(model: CurrencyViewModel = viewModel {
    CurrencyViewModel()
}) {
    val state by model.state.collectAsState()
    Column(Modifier.padding(20.dp)) {
        Text("Навчальний курс: 1 одиниця = 40 грн")
        OutlinedTextField(state.input, onValueChange = model::edit,
            label = { Text("Сума") }, isError = state.error != null)
        Text(state.result?.let { "$it грн" } ?: "Немає результату")
        state.error?.let { Text(it) }
    }
}

fun main() = application {
    Window(onCloseRequest = ::exitApplication, title = "Конвертер") {
        MaterialTheme { CurrencyScreen() }
    }
}
```

Для `2,5` результат – `100.0 грн`; для `-1`, `NaN` і нескінченності результат відсутній. Тест ViewModel викликає `edit` без composable й порівнює `state.value`.

## Приклад 2. Каталог контактів

До деталей передаємо числовий id. Дані надає невеликий репозиторій у пам’яті; навігація не передає копію всього контакту. Компонент деталей отримує предметний об’єкт і callback повернення.

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
    val all = listOf(Contact(1, "Олена", "+380000000001"),
        Contact(2, "Тарас", "+380000000002"))
    fun find(id: Int): Contact? = all.find { it.id == id }
}
@Serializable object ContactList
@Serializable data class ContactDetail(val id: Int)

@Composable
fun Detail(contact: Contact?, back: () -> Unit) {
    Column(Modifier.padding(20.dp)) {
        Text(contact?.name ?: "Контакт не знайдено")
        contact?.let { Text(it.phone) }
        Button(onClick = back) { Text("Назад") }
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
            title = "Контакти") {
            MaterialTheme { ContactApp(repository) }
        }
    }
}
```

Номери є демонстраційними. Для id 2 показуються Тарас і `+380000000002`; невідомий id показує повідомлення. Тестуйте повернення кілька разів: історія не повинна необмежено рости через створення нового списку замість зняття деталей зі стека.

## Приклад 3. Облік книг і підтвердження збереження

Самостійний приклад має репозиторій SQLite. Користувач вводить id для редагування чи видалення; порожній id означає нову книгу. Повідомлення зберігається у стані до завершення показу Snackbar. Під час дії поля заблоковані, тому відповідь не очищає новішу чернетку.

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
                it.copy(message = "Перевірте id і назву")
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
                    message = if (load) "Оновлено" else "Збережено") }
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                mutable.update {
                    it.copy(message = "Операція не вдалася")
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
                label = { Text("id; порожній для нової книги") },
                enabled = !state.busy)
            OutlinedTextField(state.title, model::editTitle,
                label = { Text("Назва") }, enabled = !state.busy)
            Row {
                Button(enabled = !state.busy,
                    onClick = { model.apply() }) { Text("Зберегти") }
                Button(enabled = !state.busy,
                    onClick = { model.apply(delete = true) }) {
                    Text("Видалити")
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
        Window(onCloseRequest = ::exitApplication, title = "Книги") {
            val model = viewModel { BookViewModel(repository) }
            MaterialTheme { BooksScreen(model) }
        }
    }
}
```

Додайте книгу з порожнім id, прочитайте виданий id у списку, змініть назву за цим id і видаліть запис. Спроба змінити невідомий id повертає помилку. Чернетка не очищається, тому повторне натискання з порожнім id означає додавання ще однієї книги: для запобігання дублікатам потрібне окреме предметне правило.

Для великого каталогу замініть звичайний цикл на LazyColumn. Для черги однакових повідомлень додайте messageId: StateFlow об’єднує рівні значення, а ключ ефекту повинен розрізняти події. Цей невеликий приклад показує один поточний статус операції.
