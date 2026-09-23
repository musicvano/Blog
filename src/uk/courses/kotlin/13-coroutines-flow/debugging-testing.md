---
title: "Налагодження та тести"
description: "Тема 13. Корутини та Flow: Налагодження та тести"
outline: [2, 3]
---

# Налагодження та тести

## Налагодження та тести

У *Run → Edit Configurations* додайте VM option `-Dkotlinx.coroutines.debug`, а задачам – `CoroutineName`. У *Debug* зупиніться всередині `suspend`-функції та відкрийте *Coroutines*. Порівнюйте логічний стек корутини зі стеком потоку: очікувана задача може не займати жодного потоку саме зараз.

::: info Знімок екрана
Run with -Dkotlinx.coroutines.debug; show named coroutines.
:::

Рис. 13.7. Імена корутин у журналі IntelliJ IDEA {.caption}

::: info Знімок екрана
Pause in launch; Debug, Coroutines, suspended stack.
:::

Рис. 13.8. Логічні стеки у вкладці Coroutines {.caption}

`runTest` використовує планувальник віртуального часу й пропускає затримки корутин, що працюють на тестовому диспетчері. Затримка на явно заданому `Dispatchers.Default` не стає віртуальною. Тому диспетчер часто передають як залежність функції або класу. Тест перевіряє результат, скасування й очищення, а не точні мілісекунди реальної машини.

Для прикладу тайм-ауту перевірте коротку успішну операцію, повільну операцію й зовнішнє скасування. Для рахунку – конкурентні поповнення, відхилення нуля та відсутність часткової зміни. Для потоку – порожнє джерело, порядок елементів, завершення `take` і поширення помилки споживача. Успішний звичайний запуск не доводить відсутності гонитви: вона може проявлятися рідко.

### Тест очищення при тайм-ауті

Створіть `src/test/kotlin/CancellationTest.kt`. Тест не чекає реальних 1000 мс: обидві затримки виконуються на планувальнику `runTest`. Локальний прапорець перевіряє саме контракт очищення, а не випадковий текст журналу. Друга перевірка демонструє успішну гілку тієї самої операції. Запуск – `./gradlew test`.

```kotlin
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue
import kotlinx.coroutines.delay
import kotlinx.coroutines.withTimeoutOrNull
import kotlinx.coroutines.test.runTest

class CancellationTest {
    @Test
    fun timeoutClosesResource() = runTest {
        var closed = false
        val result = withTimeoutOrNull(10) {
            try {
                delay(1000)
                "готово"
            } finally {
                closed = true
            }
        }
        assertNull(result)
        assertTrue(closed)
    }

    @Test
    fun quickOperationCompletes() = runTest {
        val result = withTimeoutOrNull(1000) {
            delay(10)
            "готово"
        }
        assertEquals("готово", result)
    }
}
```

Якщо всередині поставити `withContext(Dispatchers.IO)`, тест більше не керуватиме всім часом операції. Для такого компонента передавайте диспетчер конструктором: у програмі – IO, у тесті – `StandardTestDispatcher(testScheduler)`. Усі тестові диспетчери одного сценарію мають використовувати той самий планувальник. Після запуску нової корутини `runCurrent` виконує готові задачі, а `advanceUntilIdle` просуває скінченну чергу до завершення. Нескінченний гарячий потік не можна бездумно «дочекатися до кінця».
