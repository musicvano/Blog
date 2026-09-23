---
title: "Підсумки"
description: "Тема 5. Задачі TPL і async/await: висновки та контрольні питання"
---

# Підсумки

## Висновки

Задача TPL описує операцію, яка завершиться успішно, з винятком або скасуванням, і не є потоком: обчислення виконуються в пулі потоків, а очікування вводу-виводу потоку не займає. `Task.Run` запускає обчислення, `Task.WhenAll`, `WhenAny` і `WhenEach` поєднують задачі без блокування, а `Wait` і `Result` блокують потік і можуть спричинити взаємоблокування. Продовження `ContinueWith` з умовами будують граф задач. Винятки задач накопичуються в `AggregateException`; `await` кидає перший із них. Скасування в .NET кооперативне: джерело `CancellationTokenSource` надсилає запит, а операція перевіряє токен і кидає `OperationCanceledException`. Компілятор перетворює `async`-метод на машину станів, продовження якої виконуються в захопленому контексті синхронізації або в пулі. `ValueTask`, `IAsyncEnumerable<T>`, `PeriodicTimer` і `TaskCompletionSource<T>` розширюють модель для синхронних результатів, потоків даних, періодичних дій і подій. Кількість одночасних операцій обмежують `SemaphoreSlim`, а `async void` і синхронне очікування асинхронного коду є найпоширенішими антипатернами.

## Питання для самоперевірки

1. Чим задача відрізняється від потоку?
2. Коли використовують `Task.Factory.StartNew` замість `Task.Run`? Що дає `LongRunning`?
3. Які стани має задача? Які з них кінцеві?
4. Чим відрізняються `Task.WaitAll` і `Task.WhenAll`?
5. Чому звернення до `Result` може спричинити взаємоблокування?
6. Що таке продовження? Як запустити продовження лише у разі помилки попередника?
7. Чим дочірня задача відрізняється від вкладеної?
8. Чому властивість `Exception` задачі має тип `AggregateException`? Для чого методи `Flatten` і `Handle`?
9. Як отримати всі винятки після `await Task.WhenAll(...)`?
10. Опишіть кооперативне скасування. Які ролі `CancellationTokenSource` і `CancellationToken`?
11. За якої умови задача переходить у стан `Canceled`, а не `Faulted`?
12. Як компілятор перетворює `async`-метод? Що зберігає поле стану машини станів?
13. Що таке контекст синхронізації? Коли використовують `ConfigureAwait(false)`?
14. Чим обчислювальні операції відрізняються від операцій вводу-виводу з погляду `async`/`await`?
15. Коли доцільно використовувати `ValueTask`? Які в нього обмеження?
16. Для чого призначений `TaskCompletionSource<T>`? Навіщо параметр `RunContinuationsAsynchronously`?
17. Як обмежити кількість одночасних асинхронних операцій?
18. Чому `async void` і `.Result` вважають антипатернами?

## Корисні посилання

- Бібліотека паралельних задач (TPL): <https://learn.microsoft.com/dotnet/standard/parallel-programming/task-parallel-library-tpl>
- Асинхронне програмування на основі задач: <https://learn.microsoft.com/dotnet/standard/parallel-programming/task-based-asynchronous-programming>
- Обробка винятків у TPL: <https://learn.microsoft.com/dotnet/standard/parallel-programming/exception-handling-task-parallel-library>
- Скасування в керованих потоках: <https://learn.microsoft.com/dotnet/standard/threading/cancellation-in-managed-threads>
- Асинхронне програмування з `async` і `await`: <https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/>
- Асинхронний шаблон на основі задач (TAP): <https://learn.microsoft.com/dotnet/standard/asynchronous-programming-patterns/task-based-asynchronous-pattern-tap>
- Використання TAP: комбінатори, прогрес, скасування: <https://learn.microsoft.com/dotnet/standard/asynchronous-programming-patterns/consuming-the-task-based-asynchronous-pattern>
- `TaskCompletionSource<TResult>`: <https://learn.microsoft.com/dotnet/api/system.threading.tasks.taskcompletionsource-1>
- Налагодження багатопотокових і асинхронних програм у Rider: <https://www.jetbrains.com/help/rider/Debugging_Multithreaded_Applications.html>
