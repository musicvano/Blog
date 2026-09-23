---
title: "Підсумки"
description: "Тема 3. Синхронізація потоків: висновки та контрольні питання"
---

# Підсумки

## Висновки

Спільні дані, до яких звертаються кілька потоків, створюють стан гонитви: навіть `counter++` складається з кількох дій і втрачає оновлення. Коректна синхронізація забезпечує безпеку, живучість і справедливість. Найдешевший спосіб – позбутися спільного стану; для окремих змінних використовують атомарні операції `Interlocked` і CAS-цикли, для складених дій – `lock` з окремим об’єктом `Lock` або `Monitor`. Умовні змінні `Monitor.Wait`/`PulseAll` дозволяють чекати умову всередині критичної секції; `SemaphoreSlim` обмежує кількість потоків, `ReaderWriterLockSlim` пропускає багато читачів, а `ManualResetEventSlim`, `CountdownEvent` і `Barrier` координують потоки. `Mutex` і `Semaphore` з іменем синхронізують процеси. Взаємоблокування виникає за чотирьох умов Коффмана; на практиці його запобігають упорядкуванням замків і таймаутами, а діагностують у Rider (*Parallel Stacks*) і `dotnet-dump`. Крім взаємоблокувань, живучість порушують голодування, livelock, інверсія пріоритетів і конвої блокувань. Будь-яка критична секція виконується послідовно, тому вибір засобу та зернистості блокувань перевіряють вимірюваннями.

## Питання для самоперевірки

1. Що таке спільний стан, критична секція та стан гонитви?
2. Чому операція `counter++` не є атомарною? Які ще операції неатомарні?
3. Сформулюйте вимоги безпеки, живучості та справедливості.
4. Сформулюйте умови Бернштейна й наведіть приклад їх порушення.
5. Які методи має клас `Interlocked`? Як працює CAS-цикл?
6. Для чого призначено модифікатор `volatile` і чого він не гарантує?
7. На що компілятор перетворює оператор `lock` для типу `Lock` та для інших типів?
8. Які об’єкти не можна використовувати для блокування і чому?
9. Як працюють `Monitor.Wait`, `Pulse` і `PulseAll`? Чому умову перевіряють у циклі `while`?
10. Чим відрізняються `Mutex`, `Semaphore` і `SemaphoreSlim`?
11. Коли `ReaderWriterLockSlim` ефективніший за `lock`? Що таке режим оновлення?
12. Чим відрізняються `ManualResetEventSlim`, `AutoResetEvent`, `CountdownEvent` і `Barrier`?
13. Назвіть умови Коффмана. Які способи запобігання взаємоблокуванню порушують кожну з них?
14. Як знайти взаємоблокування за допомогою Rider і `dotnet-dump`?
15. Що таке голодування, livelock, інверсія пріоритетів і конвой блокувань?

## Корисні посилання

- Огляд засобів синхронізації: <https://learn.microsoft.com/dotnet/standard/threading/overview-of-synchronization-primitives>
- Рекомендації щодо багатопотоковості: <https://learn.microsoft.com/dotnet/standard/threading/managed-threading-best-practices>
- Оператор `lock`: <https://learn.microsoft.com/dotnet/csharp/language-reference/statements/lock>
- Клас `Lock`: <https://learn.microsoft.com/dotnet/api/system.threading.lock>
- Клас `Interlocked`: <https://learn.microsoft.com/dotnet/api/system.threading.interlocked>
- `Semaphore` і `SemaphoreSlim`: <https://learn.microsoft.com/dotnet/standard/threading/semaphore-and-semaphoreslim>
- Утиліта `dotnet-dump`: <https://learn.microsoft.com/dotnet/core/diagnostics/dotnet-dump>
- Налагодження взаємоблокування: <https://learn.microsoft.com/dotnet/core/diagnostics/debug-deadlock>
- Багатопотокове налагодження в Rider: <https://www.jetbrains.com/help/rider/Debugging_Multithreaded_Applications.html>
