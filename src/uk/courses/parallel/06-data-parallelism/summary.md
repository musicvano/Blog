---
title: "Підсумки"
description: "Тема 6. Паралелізм даних і PLINQ: висновки та контрольні питання"
---

# Підсумки

## Висновки

Паралелізм даних застосовує одну операцію до частин великого набору даних і масштабується разом з обсягом даних. Цикл розпаралелюють, якщо ітерації незалежні; залежності через спільні змінні усувають редукцією з локальним станом потоку. Клас `Parallel` надає цикли `For` і `ForEach` з налаштуваннями `ParallelOptions`, достроковим завершенням `Break`/`Stop` та збиранням винятків в `AggregateException`, а для асинхронних тіл – `ForEachAsync` і `ForAsync`. Швидкодія визначається розбиттям даних: діапазонне розбиття має найменші накладні витрати, блочне й динамічне балансують навантаження, а `Partitioner.Create` з діапазонами потрібен для дрібних тіл циклу. PLINQ розпаралелює запити LINQ одним викликом `AsParallel`, але не зберігає порядок без `AsOrdered` і не завжди швидший за LINQ. Паралельна агрегація коректна лише для асоціативних (а без упорядкування – і комутативних) операцій. Дерево редукції та алгоритм Блеллока мають логарифмічну глибину, а паралельні сортування (злиттям, швидке, парно-непарне, sample sort) поєднують поділ даних із задачами та порогом переходу на послідовний алгоритм. Результати оцінюють таблицями прискорення й ефективності для сильної та слабкої масштабованості.

## Питання для самоперевірки

1. Чим паралелізм даних відрізняється від паралелізму задач?
2. За яких умов ітерації циклу можна виконувати паралельно?
3. Які параметри має `ParallelOptions`?
4. Чим відрізняються методи `Break` і `Stop`? Що містить `ParallelLoopResult`?
5. Як обробляються винятки в паралельних циклах і PLINQ?
6. Для чого використовують делегати `localInit` і `localFinally`?
7. Коли потрібні `Parallel.ForEachAsync` і `Parallel.ForAsync`?
8. Порівняйте діапазонне, блочне й динамічне розбиття даних.
9. Навіщо використовувати `Partitioner.Create(from, to, rangeSize)`?
10. Які режими злиття має PLINQ і чим вони відрізняються?
11. Як впорядкованість впливає на результат і швидкодію PLINQ?
12. Коли запит PLINQ повільніший за LINQ?
13. Чому операція агрегації має бути асоціативною? Коли потрібна ще й комутативність?
14. Опишіть дерево редукції та алгоритм Блеллока для префіксної суми.
15. Як влаштоване паралельне сортування злиттям і чим обмежене його прискорення?
16. Як забезпечити відтворюваність паралельного методу Монте-Карло?

## Корисні посилання

- Паралелізм даних (TPL): <https://learn.microsoft.com/dotnet/standard/parallel-programming/data-parallelism-task-parallel-library>
- Клас `Parallel`: <https://learn.microsoft.com/dotnet/api/system.threading.tasks.parallel>
- Цикли з локальними змінними потоку: <https://learn.microsoft.com/dotnet/standard/parallel-programming/how-to-write-a-parallel-for-loop-with-thread-local-variables>
- Розбивачі для PLINQ і TPL: <https://learn.microsoft.com/dotnet/standard/parallel-programming/custom-partitioners-for-plinq-and-tpl>
- Вступ до PLINQ: <https://learn.microsoft.com/dotnet/standard/parallel-programming/introduction-to-plinq>
- Режими злиття PLINQ: <https://learn.microsoft.com/dotnet/standard/parallel-programming/merge-options-in-plinq>
- Потенційні проблеми паралелізму даних і задач: <https://learn.microsoft.com/dotnet/standard/parallel-programming/potential-pitfalls-in-data-and-task-parallelism>
- Профілювання в Rider: <https://www.jetbrains.com/help/rider/Profiling_Applications.html>
