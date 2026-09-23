---
title: "Підсумки"
description: "Тема 4. Потокобезпечні колекції: висновки та контрольні питання"
---

# Підсумки

## Висновки

Звичайні колекції .NET не розраховані на одночасні записи: вони гублять дані, генерують винятки або зависають, а складені операції «перевірити – діяти» небезпечні навіть для потокобезпечних колекцій. Конкурентні колекції `System.Collections.Concurrent` пропонують атомарні методи `Try…`, `GetOrAdd` і `AddOrUpdate`; частина з них побудована на неблокуючих алгоритмах з операцією CAS, як стек Трейбера. Фабрики словника виконуються поза блокуванням, тому дорогі обчислення загортають у `Lazy<T>`. Незмінні та заморожені колекції дозволяють читати без блокувань, а оновлювати – атомарною заміною посилання. Патерн «виробник – споживач» реалізують через `BlockingCollection<T>` для потоків або канали для асинхронного коду; обмежена ємність дає зворотний тиск, а сигнал завершення – коректну зупинку конвеєра. Хибне розділення кешу знищує масштабованість, коли потоки записують сусідні змінні однієї кеш-лінії; його усувають локальними змінними й доповненням структур і виявляють вимірюваннями, профілювальником dotTrace та `perf c2c`.

## Питання для самоперевірки

1. Чому `List<T>` і `Dictionary<TKey, TValue>` не можна змінювати з кількох потоків?
2. Що таке складена операція «перевірити – діяти»? Як її виправити?
3. Що виконує `Interlocked.CompareExchange`? Що таке неблокуючий алгоритм?
4. Як працює стек Трейбера?
5. У чому полягає проблема ABA і чому в .NET вона менш гостра?
6. Чим відрізняються `ConcurrentQueue<T>`, `ConcurrentStack<T>` і `ConcurrentBag<T>`?
7. Коли `ConcurrentBag<T>` ефективний, а коли ні?
8. Чому фабрика `GetOrAdd` може виконатися кілька разів? Як цьому запобігти?
9. Якою має бути функція оновлення в `AddOrUpdate`?
10. Як незмінні колекції дозволяють читати без блокувань? Для чого `ImmutableInterlocked`?
11. Для яких сценаріїв призначено `FrozenDictionary<TKey, TValue>`?
12. Які можливості додає `BlockingCollection<T>`? Як завершити роботу споживачів?
13. Що таке зворотний тиск? Порівняйте сигнал завершення й «отруйну пігулку».
14. Які режими переповнення має обмежений канал? Чим канал відрізняється від `BlockingCollection<T>`?
15. Що таке кеш-лінія та хибне розділення? Як його виявити й усунути?

## Корисні посилання

- Потокобезпечні колекції: <https://learn.microsoft.com/dotnet/standard/collections/thread-safe/>
- `BlockingCollection<T>`: <https://learn.microsoft.com/dotnet/standard/collections/thread-safe/blockingcollection-overview>
- `ConcurrentDictionary<TKey, TValue>`: <https://learn.microsoft.com/dotnet/api/system.collections.concurrent.concurrentdictionary-2>
- Канали: <https://learn.microsoft.com/dotnet/core/extensions/channels>
- Незмінні колекції: <https://learn.microsoft.com/dotnet/api/system.collections.immutable>
- `FrozenDictionary<TKey, TValue>`: <https://learn.microsoft.com/dotnet/api/system.collections.frozen.frozendictionary-2>
- BenchmarkDotNet: <https://benchmarkdotnet.org/>
- Профілювання в Rider: <https://www.jetbrains.com/help/rider/Profiling_Applications.html>
- `perf c2c`: <https://man7.org/linux/man-pages/man1/perf-c2c.1.html>
