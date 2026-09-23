---
title: "Summary"
description: "Topic 7. Classes and objects: conclusions and review questions"
sourceHash: "46b55a8dea8d9ceb2b2be8acc3af8eeaa4a255583d46c6959f0d5a5a6f997d79"
---

# Summary

## Conclusions

A class describes the data and behavior of objects of the same kind, and objects created with `new` have their own state. Classes are reference types: variables store references, assignment does not copy an object, and `null` requires checking. Store object state in private fields and expose it through properties that validate values; auto-properties, `init`, `required`, computed properties, and the `field` keyword make the code shorter. Constructors put an object into a valid initial state, can be overloaded, and call one another through `this(…)`; primary constructors and object initializers make object creation more concise. The garbage collector frees memory occupied by unreachable objects.

## Self-check questions

1. What are a class and an object? What makes up an object's state and behavior?
2. How do you declare a class and create an instance? What does target-typed `new()` mean?
3. What happens when class-type variables are assigned? How does `==` compare objects?
4. What is `null`? How does the `?.` operator work?
5. How does a field differ from a property? Why make fields private?
6. What does the `this` keyword mean?
7. How do you write a property that validates its value? What is `value`?
8. How do `{ get; }`, `{ get; init; }`, and `{ get; private set; }` properties differ?
9. What is the `required` modifier for?
10. What is a computed property? What does the `field` keyword refer to?
11. When does the compiler create a default constructor?
12. How does a `: this(…)` constructor chain work?
13. How do primary constructor parameters differ from fields?
14. In what order do the constructor and object initializer run?
15. Who frees memory occupied by objects, and when?

## Useful links

- Classes: <https://learn.microsoft.com/dotnet/csharp/fundamentals/types/classes>
- Objects: <https://learn.microsoft.com/dotnet/csharp/fundamentals/object-oriented/objects>
- Properties: <https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/properties>
- Constructors: <https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/constructors>
- What's new in C# 14: <https://learn.microsoft.com/dotnet/csharp/whats-new/csharp-14>
- Nullable reference types: <https://learn.microsoft.com/dotnet/csharp/nullable-references>
