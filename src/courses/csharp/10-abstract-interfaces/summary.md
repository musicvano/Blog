---
title: "Summary"
description: "Topic 10. Abstract classes, interfaces: conclusions and review questions"
sourceHash: "00b0ab021e3a7d59ba66f4b0bb13d8188bcfc7ab657b528353dc2d0aa8d7ae18"
---

# Summary

## Conclusions

Abstract classes and interfaces express abstraction: what types must be able to do, without defining the implementation. An abstract class cannot be instantiated; it contains abstract members that derived classes implement, as well as shared code, state, and constructors, which makes it the basis of the template method. An interface is a contract without state: a class can implement several interfaces, members with the same signature are implemented explicitly, and default members and static abstract members extend what interfaces can do. Standard .NET interfaces integrate your own classes with the library: `IComparable<T>` and `IComparer<T>` for sorting, `IEquatable<T>` for equality, and `IDisposable` with `using` for releasing resources. Programming to interfaces provides loose coupling and swappable implementations.

## Self-check questions

1. What is abstraction in OOP?
2. What is an abstract class? How does an abstract method differ from a virtual one?
3. Can an abstract class have a constructor and fields?
4. What is the template method? Give an example.
5. What is an interface? What members can it contain?
6. How do you implement several interfaces in one class?
7. How do you check whether an object implements an interface?
8. What is explicit interface implementation? When is it needed?
9. What are default interface members?
10. What are static abstract interface members for?
11. How do `IComparable<T>` and `IComparer<T>` differ?
12. What is `IDisposable` for? How does the `using` statement work?
13. How does an abstract class differ from an interface? When do you choose which?
14. What does programming to interfaces mean?
15. How are abstract classes and interface implementation shown in UML diagrams?

## Useful links

- The `abstract` keyword: <https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/abstract>
- Interfaces: <https://learn.microsoft.com/dotnet/csharp/fundamentals/types/interfaces>
- Explicit interface implementation: <https://learn.microsoft.com/dotnet/csharp/programming-guide/interfaces/explicit-interface-implementation>
- `IComparable<T>`: <https://learn.microsoft.com/dotnet/api/system.icomparable-1>
- Implementing `Dispose`: <https://learn.microsoft.com/dotnet/standard/garbage-collection/implementing-dispose>
