---
title: "Object-oriented programming in Kotlin"
description: "This course explores Kotlin 2.4 on the JVM in IntelliJ IDEA, from basic language constructs and null safety to object-oriented and functional programming, collections, file handling, data serialization, and unit testing. In the final stage, you learn asynchronous programming with coroutines and Flow, database access using the Exposed library, and graphical application development with Compose Multiplatform. Each topic combines a lecture with a lab assignment."
sourceHash: "7804db00faf9626a8705470e5a3a8b2f8c524fbfb91d3719d3ccf32c4337ffad"
---

# Object-oriented programming in Kotlin

Kotlin is a modern language recommended by Google for Android development and increasingly used for server-side and cross-platform applications. Concise syntax and built-in protection against null access errors let you write less code with fewer errors, and the same code can run on multiple platforms.

This course explores Kotlin 2.4 on the JVM in IntelliJ IDEA, from basic language constructs and null safety to object-oriented and functional programming, collections, file handling, data serialization, and unit testing. In the final stage, you learn asynchronous programming with coroutines and Flow, database access using the Exposed library, and graphical application development with Compose Multiplatform. Each topic combines a lecture with a lab assignment.

## Course syllabus

### Kotlin language fundamentals

1. [Kotlin 2.4 and the JVM platform, IntelliJ IDEA, Gradle projects, and the Git version control system](./01-intro/)
2. [Data types, variables, null safety, operations, and control flow constructs](./02-types-null-safety/)
3. [Functions: default parameters, named arguments, and extension functions; strings and string templates](./03-functions-strings/)
4. [Exception handling, the Result type, and debugging programs](./04-exceptions-debugging/)

### Object-oriented programming

5. [Classes and objects: properties, constructors, visibility modifiers, and packages](./05-classes/)
6. [Inheritance, abstract classes, interfaces, and polymorphism](./06-inheritance-interfaces/)
7. [Data classes, enumerations, sealed classes, singleton objects, and companion objects](./07-data-enum-sealed/)
8. [Operator overloading, delegated properties, and class delegation](./08-operators-delegation/)
9. [Generic programming: generic classes and functions, variance, and reified parameters](./09-generics/)

### Collections, functional programming, and data

10. [Kotlin collections: lists, sets, maps, mutable and immutable collections](./10-collections/)
11. [Lambda expressions, higher-order functions, collection operations, and sequences](./11-lambdas-sequences/)
12. [File handling, data serialization with kotlinx.serialization, and unit testing](./12-files-serialization-testing/)

### Asynchrony, databases, and graphical applications

13. [Coroutines: suspend functions, structured concurrency, dispatchers, and asynchronous Flow streams](./13-coroutines-flow/)
14. [Working with relational databases using the Exposed library](./14-exposed-databases/)
15. [Creating graphical applications with Compose Multiplatform: components, state, and layout](./15-compose/)
16. [MVVM architecture, navigation, and database access in Compose Multiplatform applications](./16-mvvm-navigation/)

## Required software {#software}

| Software | Purpose | Topic |
| --- | --- | :-: |
| [OpenJDK 27](https://jdk.java.net/27/) | Runtime for the programs | 1 |
| JDK 25 | The Gradle build process | 1 |
| [IntelliJ IDEA](https://www.jetbrains.com/idea/download/) 2025.3 or later | Development environment | 1 |
| [Git](https://git-scm.com/downloads) | Version control | 1 |

The IntelliJ IDEA wizard creates the Gradle Wrapper, and Gradle downloads the libraries (kotlinx.coroutines, kotlinx.serialization, Exposed, the SQLite driver, Compose Multiplatform) as dependencies. Topic 14 uses DataGrip and a PostgreSQL server as optional tools.

<!--@include: ../_shared/introduction.md-->

## Course materials

- [Review questions](./questions) — 100 questions covering the course topics for self-checks and exam preparation
- [Review tasks](./exam) — practical tasks by topic
- [Useful links](./links) — documentation and online resources
- [Recommended reading](./literature) — textbooks and guides
