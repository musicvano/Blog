---
title: "Summary"
description: "Topic 15. LINQ: conclusions and review questions"
sourceHash: "b84aed7a4ffd20fe1459181f0f14fd14841d2e50e5faa19d2b7a1b601c29ee80"
---

# Summary

## Conclusions

LINQ lets you describe queries over sequences declaratively: the operators `Where`, `Select`, `OrderBy`, `GroupBy`, `Join`, and others are extension methods for `IEnumerable<T>` that accept lambda expressions, and query syntax compiles into the same calls. Most operators use deferred execution: a query processes data during iteration, sees changes to the source, and runs again on each iteration; `ToList` and `ToArray` capture the result. Element operators react differently to an empty sequence and duplicates, aggregate operators calculate totals, `GroupBy` and joins build reports from several sources, and the new .NET 9–10 operators (`CountBy`, `AggregateBy`, `Index`, `LeftJoin`) shorten typical queries. Internally, LINQ is built on iterators, so your own operators are created the same way.

## Self-check questions

1. What is LINQ? Which interface is LINQ to Objects built on?
2. How do method syntax and query syntax differ?
3. What are `Where`, `Select`, and `SelectMany` used for?
4. What is an anonymous type? What are its limitations?
5. How do you sort a sequence by several keys?
6. What is deferred execution? Which operators execute immediately?
7. How do `First`, `FirstOrDefault`, and `Single` differ?
8. How does `MaxBy` differ from `Max`?
9. How does `GroupBy` work? What is `IGrouping<TKey, TElement>`?
10. What do `CountBy` and `AggregateBy` return?
11. How does `Join` differ from `GroupJoin` and `LeftJoin`?
12. How do you implement pagination with LINQ?
13. How do you implement your own LINQ operator?
14. Why is `Any()` better than `Count() > 0` for checking whether there are elements?

## Useful links

- LINQ: <https://learn.microsoft.com/dotnet/csharp/linq/>
- LINQ queries: <https://learn.microsoft.com/dotnet/csharp/linq/get-started/introduction-to-linq-queries>
- Standard query operators: <https://learn.microsoft.com/dotnet/csharp/linq/standard-query-operators/>
- The `Enumerable` class: <https://learn.microsoft.com/dotnet/api/system.linq.enumerable>
- What's new in .NET 10 libraries: <https://learn.microsoft.com/dotnet/core/whats-new/dotnet-10/libraries>
