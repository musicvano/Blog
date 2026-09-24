---
title: "Summary"
description: "Topic 8. Encapsulation, static members: conclusions and review questions"
sourceHash: "e3f8d1580428abf07fbf7dd7202cf13242bdebe2aee82c0aac295bdb30ec10dd"
---

# Summary

## Conclusions

Encapsulation hides an object’s state and exposes only a public contract, which lets a class guarantee its invariants. Access modifiers define visibility scopes: `private` is the class, `internal` is the assembly, `public` is any code, and the options involving `protected` relate to inheritance. A multi-project solution with a class library uses `internal` for hidden helper types. State is protected by properties with restricted setters, command methods, and defensive copies. Static members belong to the class: static fields are shared by all objects, a static constructor runs once, static classes group helper functions, and factory methods with private constructors provide clear ways to create objects.

## Self-check questions

1. What is encapsulation? What is a class invariant?
2. Why are public fields considered bad practice?
3. What access modifiers exist in C#? What is the access scope of each?
4. What is the default access for class members and top-level types?
5. What is an assembly? How is the `internal` modifier related to assemblies?
6. How do you create a solution with a class library and a console application?
7. What is a defensive copy? When is it needed?
8. How do `const`, `readonly`, and `static readonly` differ?
9. What is a static field? Give examples of its use.
10. Why can’t a static method access instance fields?
11. When does a static constructor run?
12. What is a static class? What is the `using static` directive for?
13. What are factory methods and private constructors used for?
14. How are namespaces and project files organized?
15. Why is global mutable state dangerous?

## Useful links

- Access modifiers: <https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers>
- Static classes and members: <https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/static-classes-and-static-class-members>
- Static constructors: <https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/static-constructors>
- The `readonly` keyword: <https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/readonly>
- Class library in Visual Studio: <https://learn.microsoft.com/dotnet/core/tutorials/library-with-visual-studio>
