---
title: "Summary"
description: "Topic 12. Operators and indexers: conclusions and review questions"
sourceHash: "3e44e295384af67fea20d79c1ccec462f19798989dd3d75b8b889c97f9e96bbf"
---

# Summary

## Conclusions

Operator overloading provides a natural notation for mathematical types: operators are declared as public static methods with the `operator` keyword, and the compiler converts expressions into calls to them. Comparison operators are declared in pairs and kept consistent with `Equals`, `GetHashCode`, and `IComparable<T>`; in C# 14, you can declare your own compound assignments, and `checked` operators support overflow checking. `implicit` conversion operators are used only for lossless conversions; otherwise, use `explicit`. Indexers provide access to an object by index, including with several or string parameters, and a type with `Length` and an indexer supports indexes from the end. Extension methods add members to existing types without changing them; `extension` blocks in C# 14 add properties and static members. Instance methods take precedence over extensions.

## Self-check questions

1. Why are operators overloaded? When should you not do it?
2. What is the syntax for declaring an overloaded operator?
3. Which operators are overloaded in pairs?
4. Why must `==` be consistent with `Equals` and `GetHashCode`?
5. Which operators cannot be overloaded?
6. How is compound assignment performed? What changed in C# 14?
7. What are `checked` operators for?
8. How does an `implicit` conversion differ from an `explicit` one? When do you choose which?
9. How do you declare an indexer? How does it differ from a property?
10. How do you declare an indexer with several parameters and a string indexer?
11. What is needed for your own type to support indexes from the end and ranges?
12. What is an extension method? How do you declare and call it?
13. What happens if a type has a method with the same signature as an extension method?
14. What capabilities do `extension` blocks add in C# 14?

## Useful links

- Operator overloading: <https://learn.microsoft.com/dotnet/csharp/language-reference/operators/operator-overloading>
- Conversion operators: <https://learn.microsoft.com/dotnet/csharp/language-reference/operators/user-defined-conversion-operators>
- Indexers: <https://learn.microsoft.com/dotnet/csharp/programming-guide/indexers/>
- Extension methods: <https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/extension-methods>
- What's new in C# 14: <https://learn.microsoft.com/dotnet/csharp/whats-new/csharp-14>
