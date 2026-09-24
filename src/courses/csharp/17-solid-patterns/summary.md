---
title: "Summary"
description: "Topic 17. SOLID and design patterns: conclusions and review questions"
sourceHash: "ff24bbac6dc488b1b22b449aa9d4a34ec4ddc777c1db07fcf25a636b785a6761"
---

# Summary

## Conclusions

Good design aims for high cohesion within classes and loose coupling between them. The SOLID principles make this goal concrete: a class has one responsibility, is extended without being changed, derived classes correctly substitute for base classes, interfaces are narrow, and dependencies point to abstractions. Constructor injection with a composition root implements DIP; a DI container automates object creation in large applications. Design patterns are proven solutions to typical problems: creational patterns control object creation, structural patterns control composition, and behavioral patterns control interaction. In .NET, many patterns are built into the language and the library, for example, Observer in events and Iterator in `foreach`. Patterns are applied to solve real problems while avoiding unnecessary complexity.

## Self-check questions

1. What are cohesion and coupling? What should they be like?
2. What do the DRY, KISS, and YAGNI principles mean?
3. State the single responsibility principle. Give an example of a violation.
4. How is the open/closed principle related to polymorphism?
5. Why does a square inherited from a rectangle violate the Liskov principle?
6. What is a “fat” interface? How do you fix it?
7. What is dependency inversion? How does constructor injection implement it?
8. What are a composition root and a DI container?
9. Into which groups are the GoF design patterns divided?
10. What are Factory Method and Builder for?
11. What are the drawbacks of the Singleton pattern?
12. How does Adapter differ from Decorator?
13. How does Strategy differ from State?
14. How is the Observer pattern implemented in .NET?
15. What advantages does the Command pattern provide?
16. What are anti-patterns? Give examples.

## Useful links

- Architectural principles: <https://learn.microsoft.com/dotnet/architecture/modern-web-apps-azure/architectural-principles>
- Dependency injection in .NET: <https://learn.microsoft.com/dotnet/core/extensions/dependency-injection>
- The Observer pattern: <https://learn.microsoft.com/dotnet/standard/events/observer-design-pattern>
- .NET design guidelines: <https://learn.microsoft.com/dotnet/standard/design-guidelines/>
- `Lazy<T>`: <https://learn.microsoft.com/dotnet/api/system.lazy-1>
