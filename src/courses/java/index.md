---
title: "Object-oriented programming in Java"
description: "This course explores the Java programming language on JDK 27 in IntelliJ IDEA, from basic language constructs to object-oriented and generic programming, collections and the Stream API, file handling, the module system, Maven and Gradle build systems, and unit testing. In the final stage, you learn to work with databases through JDBC and create graphical applications with JavaFX. Each topic combines a lecture with a lab assignment."
sourceHash: "eba72decd466fca689dc83a84983b66a8de4b791fbcffee3be644598784eb535"
---

# Object-oriented programming in Java

Java is one of the most sought-after languages in the job market: it powers banking, telecommunications, and cloud services, enterprise applications, and Android apps. The course takes you from your first programs to complete applications and introduces tools used by professional development teams.

This course explores the Java programming language on JDK 27 in IntelliJ IDEA, from basic language constructs to object-oriented and generic programming, collections and the Stream API, file handling, the module system, Maven and Gradle build systems, and unit testing. In the final stage, you learn to work with databases through JDBC and create graphical applications with JavaFX. Each topic combines a lecture with a lab assignment.

## Course syllabus

### Java language fundamentals

1. [The Java platform and JDK 27, IntelliJ IDEA, program structure, and the Git version control system](./01-intro/)
2. [Data types, variables, operations, console input/output, and control flow constructs](./02-types-control-flow/)
3. [Methods, arrays, and strings: String, StringBuilder, and text blocks](./03-methods-arrays-strings/)
4. [Exception handling and debugging programs](./04-exceptions-debugging/)

### Object-oriented programming

5. [Classes and objects: fields, methods, constructors, encapsulation, and packages](./05-classes/)
6. [Inheritance, polymorphism, and the Object class](./06-inheritance-polymorphism/)
7. [Abstract classes, interfaces, and nested classes](./07-abstract-interfaces/)
8. [Records, enumerations (enum), sealed classes, and pattern matching](./08-records-enums-sealed/)
9. [Generic programming (generics)](./09-generics/)

### Standard library and tools

10. [Java Collections Framework collections: lists, sets, queues, and maps](./10-collections/)
11. [Lambda expressions, functional interfaces, and the Stream API](./11-lambdas-streams/)
12. [File handling: input/output streams, NIO.2, and object serialization](./12-io-files/)
13. [The Java module system, Maven and Gradle build systems, and unit testing with JUnit](./13-modules-build-testing/)

### Databases and graphical applications

14. [Working with relational databases through JDBC](./14-jdbc/)
15. [Creating graphical applications with JavaFX: scenes, controls, layout, and events](./15-javafx/)
16. [MVC architecture, data binding, and database access in JavaFX applications](./16-mvc-data-binding/)

## Required software {#software}

| Software | Purpose | Topic |
| --- | --- | :-: |
| [OpenJDK 27](https://jdk.java.net/27/) | Java compiler and virtual machine | 1 |
| [IntelliJ IDEA](https://www.jetbrains.com/idea/download/) | Development environment | 1 |
| [Git](https://git-scm.com/downloads) | Version control | 1 |
| [Apache Maven 3.9](https://maven.apache.org/download.cgi) | Build tool | 13 |
| [Gradle 9.7](https://gradle.org/install/) and JDK 25 for the Gradle process | Second build tool | 13 |
| [PostgreSQL 18](https://www.postgresql.org/download/) with psql | Database management system | 14 |
| [Scene Builder](https://gluonhq.com/products/scene-builder/) | Visual FXML editor | 15 |

Maven downloads JUnit, the pgJDBC driver and JavaFX as project dependencies. For SQL queries you can use DataGrip or the *Database* window in IntelliJ IDEA.

<!--@include: ../_shared/introduction.md-->

## Course materials

- [Review questions](./questions) — 100 questions covering the course topics for self-checks and exam preparation
- [Review tasks](./exam) — practical tasks by topic
- [Useful links](./links) — documentation and online resources
- [Recommended reading](./literature) — textbooks and guides
