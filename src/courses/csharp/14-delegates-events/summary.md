---
title: "Summary"
description: "Topic 14. Delegates, lambdas, events: conclusions and review questions"
sourceHash: "b66d96ab2e1bb977c5735e182ad9ce2d7b29511f8f0d4a8c48176952e3c678c2"
---

# Summary

## Conclusions

Delegates let you store references to methods and pass behavior as a parameter. Multicast delegates call several methods in the order they were added and return the result of the last one. The built-in delegates `Action`, `Func`, `Predicate<T>`, and `Comparison<T>` cover most signatures, and lambda expressions let you write a function right where it is used. Lambdas capture variables, forming closures that extend the lifetime of the variables; in a `for` loop, this can lead to bugs. Higher-order functions build new functions from existing ones. Events implement the “publisher – subscriber” pattern: the `event` keyword allows outside code only to subscribe and unsubscribe, and the standard `EventHandler<TEventArgs>` pattern with an `On<EventName>` method makes events uniform across the .NET platform. Subscriptions that are never removed can cause memory leaks.

## Self-check questions

1. What is a delegate? How do you declare a delegate type?
2. When is a method compatible with a delegate?
3. How do you safely call a delegate that may be `null`?
4. What is a multicast delegate? What result does calling it return?
5. How do `Action`, `Func`, `Predicate<T>`, and `Comparison<T>` differ?
6. What is the syntax of expression lambdas and statement lambdas?
7. What is the natural type of a lambda?
8. What are `static` lambdas used for?
9. What is a closure? How long does a captured variable live?
10. What is the trap of capturing a `for` loop variable?
11. What is a higher-order function? Give examples.
12. How does an event differ from a public delegate field?
13. Describe the standard .NET event pattern.
14. Why can subscriptions that are never removed cause memory leaks?
15. Why does unsubscribing with a lambda written again not work?

## Useful links

- Delegates: <https://learn.microsoft.com/dotnet/csharp/delegates-overview>
- Lambda expressions: <https://learn.microsoft.com/dotnet/csharp/language-reference/operators/lambda-expressions>
- Events: <https://learn.microsoft.com/dotnet/csharp/events-overview>
- Handling and raising events: <https://learn.microsoft.com/dotnet/standard/events/>
- Distinguishing delegates and events: <https://learn.microsoft.com/dotnet/csharp/distinguish-delegates-events>
- `EventHandler<TEventArgs>`: <https://learn.microsoft.com/dotnet/api/system.eventhandler-1>
