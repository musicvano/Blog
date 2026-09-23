---
title: "Підсумки"
description: "Тема 13. Узагальнення та колекції: висновки та контрольні питання"
---

# Підсумки

## Висновки

Узагальнення дозволяють писати код один раз для багатьох типів без упакування й приведень, а компілятор перевіряє типи. Узагальнені методи виводять аргументи типу з аргументів виклику, узагальнені класи утворюють закриті типи, а обмеження `where` дозволяють використовувати можливості параметра типу; generic math поширює це на арифметику. Колекції обирають за основними операціями та їх складністю: `List<T>` для списків з доступом за індексом, `Dictionary<TKey, TValue>` і `HashSet<T>` для швидкого пошуку, `Queue<T>`, `Stack<T>` і `PriorityQueue` для порядку обробки, упорядковані колекції для перебору за ключем. Інтерфейси `IEnumerable<T>` і `IReadOnlyList<T>` роблять код гнучким і захищають внутрішні дані, а ітератори `yield return` створюють відкладені послідовності.

## Питання для самоперевірки

1. Які недоліки мають колекції `object`, наприклад `ArrayList`?
2. Що таке параметр типу? Як компілятор виводить аргумент типу?
3. Чим відкритий узагальнений тип відрізняється від закритого?
4. Що повертає `default(T)`?
5. Для чого потрібні обмеження `where`? Наведіть приклади.
6. Що таке generic math?
7. Як обрати колекцію? Що означають O(1), O(log *n*), O(*n*)?
8. Чим `Count` відрізняється від `Capacity` у `List<T>`?
9. Як працює пошук за ключем у `Dictionary<TKey, TValue>`? Які вимоги до ключа?
10. Чим `TryGetValue` кращий за індексатор словника?
11. Які операції над множинами підтримує `HashSet<T>`?
12. Чим відрізняються `Queue<T>`, `Stack<T>` і `PriorityQueue<TElement, TPriority>`?
13. Коли доцільно використовувати `LinkedList<T>`?
14. Для чого повертати колекції як `IReadOnlyList<T>`?
15. Як працює ітератор з `yield return`?
16. Чому не можна змінювати колекцію в циклі `foreach`?

## Корисні посилання

- Узагальнення: <https://learn.microsoft.com/dotnet/csharp/fundamentals/types/generics>
- Обмеження параметрів типу: <https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/where-generic-type-constraint>
- Колекції .NET: <https://learn.microsoft.com/dotnet/standard/collections/>
- Вибір колекції: <https://learn.microsoft.com/dotnet/standard/collections/selecting-a-collection-class>
- Ітератори: <https://learn.microsoft.com/dotnet/csharp/iterators>
- `PriorityQueue<TElement, TPriority>`: <https://learn.microsoft.com/dotnet/api/system.collections.generic.priorityqueue-2>
