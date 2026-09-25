---
title: "Події, тести та пакування"
description: "Тема 16. MVVM і навігація: Події, тести та пакування"
outline: [2, 3]
---

# Події, тести та пакування

## Помилки, одноразові події та чернетки

Помилка валідації належить до стану форми: користувач має бачити її, доки не виправить дані. Чернетка після невдалого збереження залишається. Для тимчасового підтвердження можна використати `SnackbarHostState.showSnackbar`, викликаний з ефекту. Сам показ Snackbar є suspend-операцією й не належить репозиторію.

`SharedFlow` без replay може втратити повідомлення за відсутності збирача; `Channel` розподіляє повідомлення між споживачами. Жоден із них не гарантує «рівно один видимий Snackbar» при всіх змінах життєвого циклу. Для важливого підтвердження зберігайте ідентифіковане повідомлення в UiState і явно підтверджуйте обробку.

Стан чернетки може жити в ViewModel, але для відновлення після перезапуску потрібне збереження. Не записуйте кожний символ у головний запис без погодженого контракту автозбереження. Якщо користувач натискає Cancel, попередні дані мають залишитися незмінними; це перевіряють окремим тестом.

## Приклад 4. Тест ViewModel з підробленим репозиторієм

Додайте файл у `src/test/kotlin`. Він тестує `NotesViewModel` з попередньої програми, тому production-класи не дублюються. Підміна Main потрібна лише в тесті; `finally` гарантовано відновлює диспетчер. Використаний тестовий диспетчер має спільний планувальник із runTest.

```kotlin
import kotlin.test.*
import kotlinx.coroutines.*
import kotlinx.coroutines.test.*

class FakeNotes : NoteRepository {
    val rows = mutableListOf<Note>()
    var fail = false
    override suspend fun all(): List<Note> = rows.toList()

    override suspend fun add(title: String) {
        check(!fail) { "storage unavailable" }
        rows.add(Note(rows.size + 1, title))
    }

    override suspend fun delete(id: Int) {
        rows.removeAll { it.id == id }
    }
}

@OptIn(ExperimentalCoroutinesApi::class)
class NotesViewModelTest {
    @Test
    fun validatesSavesAndKeepsFailedDraft() = runTest {
        Dispatchers.setMain(StandardTestDispatcher(testScheduler))
        try {
            val repository = FakeNotes()
            val model = NotesViewModel(repository)
            model.edit(" ")
            model.add()
            assertTrue(repository.rows.isEmpty())
            assertNotNull(model.state.value.error)
            model.edit("  Перша  ")
            model.add()
            advanceUntilIdle()
            assertEquals("Перша", repository.rows.single().title)
            assertEquals("", model.state.value.draft)
            repository.fail = true
            model.edit("Друга")
            model.add()
            advanceUntilIdle()
            assertEquals("Друга", model.state.value.draft)
            assertNotNull(model.state.value.error)
            assertFalse(model.state.value.busy)
        } finally {
            Dispatchers.resetMain()
        }
    }
}
```

Тест не потребує відкритого вікна або справжнього SQLite. Це перевірка стану й координації. Окремий інтеграційний тест репозиторію повинен перевірити фактичне збереження, видалення, відкат і повторне відкриття. Обидва рівні потрібні: fake не виявить помилку SQL, а SQL-тест не перевірить очищення чернетки.

::: info Знімок екрана
Run NotesViewModelTest; show passed assertions and source.
:::

Рис. 16.8. Перевірка переходів стану без відкриття UI {.caption}

## Пакування та остаточна перевірка

Перед пакуванням запускають `test` і чисту компіляцію. У `nativeDistributions` задають ім’я, версію й потрібні формати. `packageDistributionForCurrentOS` створює пакет для поточної платформи; на Windows перевіряють також встановлення й запуск із меню, де робоча тека відрізняється від Gradle-проєкту.

Пакет має містити необхідні JVM-модулі та нативні залежності Compose/SQLite. JDK, який запускає Gradle, JDK toolchain і JDK, використаний пакувальником, не слід вважати автоматично одним і тим самим. Перевіряйте фактичний runtime інсталятора.

::: info Знімок екрана
After real packageDistributionForCurrentOS succeeds, show path.
:::

Рис. 16.9. Результат пакування desktop-застосунку {.caption}

Перевірте три профілі: новий користувач без бази, користувач із попередніми даними, недоступний шлях. Оновлення застосунку не повинно створювати новий порожній файл замість старого через зміну робочої теки. Перед незворотною міграцією потрібна копія бази та зрозуміле повідомлення про результат.
