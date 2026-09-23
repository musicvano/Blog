---
title: "Підсумки"
description: "Тема 5. Асинхронність async/await: висновки та контрольні питання"
---

# Підсумки

## Висновки

Потік інтерфейсу Windows Forms обробляє всі повідомлення по черзі, тому тривала синхронна операція в обробнику «заморожує» вікно. Задачі `Task` і `Task<T>` представляють операції, що завершаться пізніше, а оператор `await` звільняє потік на час очікування й завдяки контексту синхронізації повертає продовження в потік інтерфейсу. Операції введення-виведення викликають через їхні методи `…Async`, обчислення переносять у пул потоків через `Task.Run`. `IProgress<T>` безпечно передає перебіг у форму, `CancellationTokenSource` і `CancellationToken` реалізують кооперативне скасування й тайм-аути, `IAsyncEnumerable<T>` віддає результати поступово, а `Task.WhenAll`, `WhenAny`, `WhenEach` і `SemaphoreSlim` керують кількома задачами. Результат задачі отримують лише через `await`, `async void` використовують лише для обробників подій, а у .NET 10 асинхронні методи `InvokeAsync`, `ShowDialogAsync` і `TaskDialog.ShowDialogAsync` доступні без жодних налаштувань.

## Питання для самоперевірки

1. Чому тривалий обробник події робить вікно Windows Forms «Not Responding»?
2. Чим операції введення-виведення відрізняються від обчислень? Як виконувати кожну з них у застосунку з інтерфейсом?
3. Що таке задача `Task`? Які стани вона може мати?
4. Чому в потоці інтерфейсу не використовують `task.Result` і `task.Wait()`?
5. Що відбувається під час виконання оператора `await` над незавершеною задачею?
6. Які типи може повертати `async`-метод? Коли допустимий `async void`?
7. Про що попереджає CS4014?
8. Що таке контекст синхронізації? Чим відрізняється поведінка `await` у консольній програмі та в застосунку Windows Forms?
9. Коли виникає виняток «Cross-thread operation not valid» і як його уникнути?
10. Як виникає взаємоблокування через `Result`? Для чого `ConfigureAwait(false)`?
11. Як працюють `IProgress<T>` і `Progress<T>`? У якому потоці виконується обробник `Progress<T>`?
12. Як реалізувати скасування операції кнопкою та тайм-аут?
13. Для чого асинхронні потоки `IAsyncEnumerable<T>` і цикл `await foreach`?
14. Чим відрізняються `Task.WhenAll`, `Task.WhenAny` і `Task.WhenEach`? Як обмежити кількість одночасних операцій?
15. Як перехоплюються винятки `await` і `Task.WhenAll`? Що відбувається з винятком в `async void`?
16. Для чого `Control.InvokeAsync` і `Form.ShowDialogAsync`? Чи потрібне придушення WFO5002 у .NET 10?

## Корисні посилання

- Асинхронне програмування в C#: <https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/>
- Асинхронний шаблон на основі задач (TAP): <https://learn.microsoft.com/dotnet/standard/asynchronous-programming-patterns/task-based-asynchronous-pattern-tap>
- Типи результату async-методів: <https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/async-return-types>
- Скасування в керованих потоках: <https://learn.microsoft.com/dotnet/standard/threading/cancellation-in-managed-threads>
- Асинхронні потоки: <https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/generate-consume-asynchronous-stream>
- Звернення до елементів керування з інших потоків: <https://learn.microsoft.com/dotnet/desktop/winforms/controls/how-to-make-thread-safe-calls>
- Нове у Windows Forms для .NET 9: <https://learn.microsoft.com/dotnet/desktop/winforms/whats-new/net90>
- Помилка WFO5002: <https://learn.microsoft.com/dotnet/desktop/winforms/compiler-messages/wfo5002>
- Вікно *Tasks*: <https://learn.microsoft.com/visualstudio/debugger/using-the-tasks-window>
