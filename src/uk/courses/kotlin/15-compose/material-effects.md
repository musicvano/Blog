---
title: "Material 3 і побічні ефекти"
description: "Тема 15. Compose Multiplatform: Material 3 і побічні ефекти"
outline: [2, 3]
---

# Material 3 і побічні ефекти

## Material 3, Scaffold і діалоги

`MaterialTheme` надає кольори, типографіку й форми. Компоненти `Text`, `Button`, `OutlinedTextField`, `Checkbox`, `Switch`, `RadioButton`, `Slider`, `Card` узгоджують оформлення. `Image` показує графіку, `Icon` – невелику піктограму дії. Декоративним зображенням можна не задавати опис, змістовним потрібний `contentDescription`, зрозумілий без самого зображення.

`Scaffold` організовує основні області екрана: верхню панель, плаваючу кнопку й основний вміст. Переданий `innerPadding` потрібно застосувати до вмісту; інакше список перекриється панеллю. `TopAppBar` у вибраній Material 3 API може потребувати явної згоди `ExperimentalMaterial3Api`.

`AlertDialog` присутній у композиції, доки відповідний стан дорівнює `true`. `onDismissRequest` задає поведінку закриття; підтвердження і скасування – окремі події. Чернетку не слід одразу записувати в основний список: натискання Cancel має залишити предметні дані без змін.

### Приклад 4. Список справ

Зберігаємо незмінні елементи з `id`; при зміні прапорця замінюємо елемент через `copy`. `mutableStateListOf` спостерігає структурні зміни, але не зробить довільні mutable-поля елемента спостережуваними.

```kotlin
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.*

data class Task(val id: Int, val title: String, val done: Boolean)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Tasks() {
    val tasks = remember { mutableStateListOf<Task>() }
    var nextId by remember { mutableStateOf(1) }
    var dialog by remember { mutableStateOf(false) }
    var draft by remember { mutableStateOf("") }
    Scaffold(topBar = { TopAppBar(title = { Text("Справи") }) },
        floatingActionButton = {
            FloatingActionButton(onClick = { dialog = true }) {
                Text("+")
            }
        }) { padding ->
        LazyColumn(Modifier.padding(padding)) {
            items(tasks, key = { it.id }) { task ->
                Row(Modifier.padding(8.dp)) {
                    Checkbox(task.done, onCheckedChange = { done ->
                        val index = tasks.indexOfFirst {
                            it.id == task.id
                        }
                        if (index >= 0) {
                            tasks[index] = task.copy(done = done)
                        }
                    })
                    Text(task.title)
                }
            }
        }
    }
    if (dialog) AlertDialog(onDismissRequest = { dialog = false },
        title = { Text("Нова справа") },
        text = {
            OutlinedTextField(draft, onValueChange = { draft = it })
        },
        confirmButton = {
            TextButton(enabled = draft.isNotBlank(), onClick = {
                tasks.add(Task(nextId++, draft.trim(), false))
                draft = ""
                dialog = false
            }) { Text("Додати") }
        },
        dismissButton = {
            TextButton(onClick = { draft = ""; dialog = false }) {
                Text("Скасувати")
            }
        })
}

fun main() = application {
    Window(onCloseRequest = ::exitApplication, title = "Справи") {
        MaterialTheme { Tasks() }
    }
}
```

Порожня назва не додається. Після підтвердження з’являється один рядок; зміна прапорця зберігає id і назву. Перевірте дві справи з однаковими назвами: вони залишаються різними за id. Для сталого списку наступна тема перенесе збереження в репозиторій.

::: info Знімок екрана
Two tasks, one checked; open Add dialog with a draft.
:::

Рис. 15.8. Список справ і чернетка нового запису {.caption}

## Побічні ефекти й корутини

`LaunchedEffect(key)` запускає корутину, пов’язану з місцем композиції. Коли ключ змінюється, попередня корутина скасовується і запускається нова; при виході компонента з композиції робота також скасовується. Це придатно для таймера або спостереження за конкретним id. Випадковий ключ спричинятиме зайві перезапуски.

`rememberCoroutineScope` дає область для подій користувача, наприклад показу `Snackbar`. Не запускайте корутину безпосередньо в тілі composable на кожній рекомпозиції. Довга предметна робота, яка має пережити зміну дочірніх компонентів, належить ViewModel або іншому явному власникові життєвого циклу.

`DisposableEffect` реєструє ресурс чи слухача й знімає його у `onDispose`. `rememberUpdatedState` дозволяє довгому ефекту бачити актуальну callback-функцію без перезапуску всього ефекту. Ці засоби не замінюють звичайний `try/finally` у предметному коді.

Для секундоміра `delay(10)` не означає, що пройшло рівно 10 мс. Відлік спирається на монотонний годинник, а затримка лише визначає частоту оновлення UI. Системний календарний час може змінюватися й непридатний для точного вимірювання інтервалу.
