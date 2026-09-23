---
title: "Налагодження та типові помилки"
description: "Тема 5. Асинхронність async/await: Налагодження та типові помилки"
outline: [2, 3]
---

# Налагодження та типові помилки

## Налагодження та типові помилки

Під час налагодження асинхронного коду вікно *Call Stack* показує лише поточний потік. Visual Studio 2026 має два спеціальні вікна (<https://learn.microsoft.com/visualstudio/debugger/using-the-tasks-window>):

- *Debug → Windows → Tasks* (доступне після зупинки на точці переривання) – таблиця задач зі стовпцями *ID*, *Status* (*Scheduled*, *Active*, *Blocked*, *Awaiting*, *Deadlocked*), *Start Time*, *Duration*, *Location* і *Task* (рис. 5.10);
- *Debug → Windows → Parallel Stacks* у режимі *Tasks* – граф асинхронних стеків викликів: видно, який метод на якому `await` чекає (рис. 5.11) (<https://learn.microsoft.com/visualstudio/debugger/using-the-parallel-stacks-window>).

![Вікно Tasks під час налагодження](./images/05-vs-tasks-window.png)

Рис. 5.10. Вікно *Tasks* під час налагодження {.caption}

![Вікно Parallel Stacks у режимі Tasks](./images/06-vs-parallel-stacks.png)

Рис. 5.11. Вікно *Parallel Stacks* у режимі *Tasks* {.caption}

Помилки, яких найчастіше припускаються під час написання асинхронного коду, наведено в табл. 5.3.

Таблиця 5.3. Типові помилки асинхронного програмування {.caption}

| **Проблема** | **Причина** | **Виправлення** |
| --- | --- | --- |
| вікно «Not Responding» під час операції | тривала синхронна робота в обробнику | `await` асинхронного методу або `await Task.Run(…)` |
| вікно зависає назавжди | `.Result` або `.Wait()` у потоці інтерфейсу (взаємоблокування) | `async`-обробник і `await` |
| `InvalidOperationException: Cross-thread operation not valid` | звернення до елемента керування в `Task.Run` або після `ConfigureAwait(false)` | повернути результат із задачі, `IProgress<T>`, `InvokeAsync` |
| операцію запущено двічі | кнопку не вимкнено на час операції (повторний вхід) | `Enabled = false`, відновлення у `finally` |
| виняток не перехоплено, застосунок завершився | `async void` поза обробником подій, забутий `await` (CS4014) | повертати `Task`, чекати через `await`, `try`/`catch` в обробнику |
| кнопка *Cancel* не зупиняє операцію | токен не передано у виклики або не перевіряється в циклі | передавати `token` далі, `ThrowIfCancellationRequested` |
| індикатор перебігу стрибає або гальмує інтерфейс | `Report` викликається тисячі разів за секунду | звітувати рідше: кожен файл, кожен відсоток |
