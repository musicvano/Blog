---
title: "Summary"
description: "Topic 13. Generics and collections: conclusions and review questions"
sourceHash: "87507ade368a62e949033095e2e8a0f0bf192cad8a8a0befed56c723cef61fb2"
---

# Summary

## Conclusions

Generics let you write code once for many types without boxing or casts, and the compiler checks the types. Generic methods infer type arguments from the call arguments, generic classes form closed types, and `where` constraints let you use the capabilities of a type parameter; generic math extends this to arithmetic. Collections are chosen by their main operations and their complexity: `List<T>` for lists with index access, `Dictionary<TKey, TValue>` and `HashSet<T>` for fast lookup, `Queue<T>`, `Stack<T>`, and `PriorityQueue` for processing order, and sorted collections for iterating by key. The `IEnumerable<T>` and `IReadOnlyList<T>` interfaces make code flexible and protect internal data, and `yield return` iterators create lazy sequences.

## Self-check questions

1. What are the drawbacks of `object` collections such as `ArrayList`?
2. What is a type parameter? How does the compiler infer a type argument?
3. How does an open generic type differ from a closed one?
4. What does `default(T)` return?
5. What are `where` constraints for? Give examples.
6. What is generic math?
7. How do you choose a collection? What do O(1), O(log *n*), and O(*n*) mean?
8. How does `Count` differ from `Capacity` in `List<T>`?
9. How does lookup by key work in `Dictionary<TKey, TValue>`? What are the requirements for a key?
10. Why is `TryGetValue` better than the dictionary indexer?
11. What set operations does `HashSet<T>` support?
12. How do `Queue<T>`, `Stack<T>`, and `PriorityQueue<TElement, TPriority>` differ?
13. When does it make sense to use `LinkedList<T>`?
14. Why return collections as `IReadOnlyList<T>`?
15. How does an iterator with `yield return` work?
16. Why can’t you modify a collection in a `foreach` loop?

## Useful links

- Generics: <https://learn.microsoft.com/dotnet/csharp/fundamentals/types/generics>
- Type parameter constraints: <https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/where-generic-type-constraint>
- .NET collections: <https://learn.microsoft.com/dotnet/standard/collections/>
- Selecting a collection: <https://learn.microsoft.com/dotnet/standard/collections/selecting-a-collection-class>
- Iterators: <https://learn.microsoft.com/dotnet/csharp/iterators>
- `PriorityQueue<TElement, TPriority>`: <https://learn.microsoft.com/dotnet/api/system.collections.generic.priorityqueue-2>
