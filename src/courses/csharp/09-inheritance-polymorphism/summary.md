---
title: "Summary"
description: "Topic 9. Inheritance and polymorphism: conclusions and review questions"
sourceHash: "a7ad22bb2615d9c750ad8747918bb5871f423e16e1cb527d25dd1a8c7a8ce1d2"
---

# Summary

## Conclusions

Inheritance creates a derived class based on a base class and models an “is-a” relationship. A derived class receives the members of the base class, `protected` members are accessible only to descendants, and constructors are not inherited but are called in a chain through `base(…)` from the base class to the derived class. Virtual methods overridden with the `override` modifier provide polymorphism: the call is determined by the object’s actual type, so one piece of code works with different derived classes. Hiding with `new` selects the method by the variable’s type and is rarely used. All classes derive from `object` and can override `ToString`, `Equals`, and `GetHashCode`. Types are checked with `is`, `as`, and patterns; `sealed` prohibits inheritance; custom exceptions inherit from `Exception`; and when there is no “is-a” relationship, composition is used instead of inheritance.

## Self-check questions

1. What is inheritance? How do you declare a derived class?
2. Which base class members are accessible in a derived class? What is the `protected` modifier for?
3. In what order do constructors run? What is `base(…)` for?
4. How do the `virtual`, `override`, and `new` modifiers differ?
5. What are polymorphism and late binding?
6. What role does the virtual method table play?
7. What methods does the `object` class have? Which of them are virtual?
8. What rules must you follow when overriding `Equals` and `GetHashCode`?
9. How do upcasting and downcasting differ?
10. How do the `is` and `as` operators differ? What is a type pattern?
11. When is it better to use virtual methods, and when a `switch` on types?
12. What is the `sealed` modifier for?
13. How do you create a custom exception class?
14. How does composition differ from inheritance? What is the fragile base class problem?
15. How are generalization, association, aggregation, and composition shown in UML diagrams?

## Useful links

- Inheritance: <https://learn.microsoft.com/dotnet/csharp/fundamentals/object-oriented/inheritance>
- Polymorphism: <https://learn.microsoft.com/dotnet/csharp/fundamentals/object-oriented/polymorphism>
- `override` and `new`: <https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/knowing-when-to-use-override-and-new-keywords>
- `sealed`: <https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/sealed>
- Custom exceptions: <https://learn.microsoft.com/dotnet/standard/exceptions/how-to-create-user-defined-exceptions>
- The `Object` class: <https://learn.microsoft.com/dotnet/api/system.object>
