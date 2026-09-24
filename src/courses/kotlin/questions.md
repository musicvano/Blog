---
title: "Review questions"
description: "Object-oriented programming in Kotlin: review questions on the course topics"
sourceHash: "d11c722e8a192d06c94f6baa8b47a639a2e89aa346f38573982aea501ec6a7fc"
---

# Review questions

Questions for self-check and exam preparation, grouped by course topic.

## Topic 1. Kotlin and your first program

1. What is the Kotlin language? What are its main advantages over Java? Explain the concepts of Kotlin/JVM and Kotlin Multiplatform.
2. Explain the process of compiling and running a Kotlin program on the JVM platform. How does Kotlin interoperate with Java code?
3. Describe the structure of a Kotlin program: the main function, packages, imports, and top-level files.
4. How do you create a Kotlin project in IntelliJ IDEA with the Gradle build system? Explain the build.gradle.kts file and adding dependencies.
5. What is the Git version control system? Explain the concepts of a repository, a commit, and a branch, and the basic Git commands.
6. How do you work with a Git repository in IntelliJ IDEA? Which Gradle project files should be added to .gitignore?

## Topic 2. Types, null safety, and control flow

7. Explain declaring variables with val and var and type inference in Kotlin.
8. What basic data types does Kotlin have? How are numeric types converted?
9. What is null safety in Kotlin? Compare nullable and non-nullable types.
10. Explain the safe call operator ?., the Elvis operator ?:, and the !! operator.
11. What are smart casts? Explain the is and as? operators.
12. Explain the when expression and compare it with the switch statement in Java.
13. Explain the for, while, and do-while loops, ranges, and progressions (until, step, downTo).

## Topic 3. Functions and strings

14. Explain function declarations in Kotlin, functions with an expression body, and the Unit type.
15. What are default parameters and named arguments? How do they replace function overloading?
16. What are functions with a variable number of arguments (vararg), local functions, and infix functions?
17. What are extension functions and extension properties? How do they work at the bytecode level?
18. Explain string templates, multiline strings, and the main functions for working with strings.
19. What is tail recursion and the tailrec modifier?

## Topic 4. Exceptions, Result, and debugging

20. How does exception handling work in Kotlin? Why does Kotlin have no checked exceptions?
21. Explain try as an expression, the finally block, and the Nothing type.
22. What are the Result type and the runCatching function? Compare them with exception handling.
23. What are the require, check, and error functions for?
24. How do you create a custom exception class in Kotlin?
25. What debugging tools does IntelliJ IDEA provide for Kotlin programs?

## Topic 5. Classes and objects

26. Explain class declarations, the primary constructor, and init blocks in Kotlin.
27. What are secondary constructors? How are they related to the primary constructor?
28. What are properties in Kotlin? Explain custom get and set accessors and the field identifier.
29. What is late property initialization (lateinit)?
30. Explain the visibility modifiers public, private, protected, and internal.
31. How do you organize code with packages and modules in a Kotlin project?

## Topic 6. Inheritance and polymorphism

32. Why are classes in Kotlin closed to inheritance by default? Explain the open and override modifiers.
33. How do you call the base class constructor and methods using super?
34. What are abstract classes and abstract class members?
35. What are interfaces in Kotlin? Explain methods with a default implementation and interface properties.
36. Compare abstract classes and interfaces. How do you resolve a conflict between identical methods from several interfaces?
37. What is polymorphism? Give an example of a class hierarchy with overridden methods.

## Topic 7. Data classes, enums, sealed

38. What are data classes? Which methods does the compiler generate automatically?
39. Explain the copy method and destructuring of data class objects.
40. What are enumerations (enum class)? How do you add properties and methods to an enum?
41. What are sealed classes and interfaces? How do they combine with the when expression?
42. What is an object declaration? Compare singleton objects and anonymous objects.
43. What are companion objects, and how do they replace Java's static members?

## Topic 8. Operations and delegation

44. How do you overload operators in Kotlin with the operator modifier? Give examples of the plus, get, and invoke functions.
45. How do you overload the comparison and membership operators (compareTo, contains)?
46. What are delegated properties? Explain the standard lazy delegate.
47. Explain the Delegates.observable and Delegates.vetoable delegates and storing properties in a map.
48. How do you create a custom property delegate (getValue, setValue)?
49. What is class delegation (the by keyword)? Compare it with inheritance.

## Topic 9. Generic programming

50. Explain declaring generic classes and functions in Kotlin.
51. What are type parameter constraints (upper bounds) and the where construct?
52. What is variance? Explain the out and in modifiers at the declaration site.
53. What are type projections and the star projection?
54. What is type erasure? How do reified parameters in inline functions let you work around it?
55. Explain generic extension functions using examples from the standard library.

## Topic 10. Arrays and collections

56. Describe the Kotlin collection hierarchy. Compare read-only and mutable collection interfaces.
57. Explain working with List and MutableList and the listOf and mutableListOf functions.
58. Explain Set and MutableSet. How does Kotlin compare set elements?
59. Explain Map and MutableMap, Pair, and the to function.
60. Compare Array and Kotlin collections. What are primitive type arrays (IntArray)?
61. How does Kotlin map Java collections, and what are the specifics of collection interoperability with Java code?

## Topic 11. Lambdas and sequences

62. What are lambda expressions and function types in Kotlin? Explain the implicit parameter it.
63. What are higher-order functions? Give examples of functions that accept and return functions.
64. What are inline functions? How do they affect the performance of lambda expressions?
65. Explain the collection operations filter, map, flatMap, groupBy, associate, and fold.
66. What are sequences (Sequence)? Compare the lazy evaluation of sequences with collection operations.
67. Explain the scope functions let, run, with, apply, and also.
68. What are function and property references (::)?

## Topic 12. Files, serialization, and tests

69. How do you read and write text files in Kotlin with the readText, readLines, writeText, and useLines functions?
70. What is the use function for? How does it guarantee that resources are closed?
71. What is the kotlinx.serialization library? How do you add its plugin and annotate classes with @Serializable?
72. How do you serialize and deserialize objects to and from JSON? Explain the settings of the Json object.
73. How do you write unit tests in Kotlin with kotlin.test and the JUnit Platform (JUnit 6)?
74. How do you run tests in IntelliJ IDEA and with Gradle? What is test code coverage?

## Topic 13. Coroutines and Flow

75. What are coroutines? Compare coroutines with operating system threads.
76. What are suspend functions? How does the compiler transform them (continuations)?
77. Explain the coroutine builders launch, async, and runBlocking, and the await function.
78. What is structured concurrency? Explain CoroutineScope, Job, and coroutine cancellation.
79. Explain the coroutine dispatchers Dispatchers.Default, Dispatchers.IO, and Dispatchers.Main, and the withContext function.
80. How do you handle exceptions in coroutines? What are SupervisorJob and CoroutineExceptionHandler?
81. What are asynchronous Flow streams? Explain flow operators, StateFlow, and SharedFlow.

## Topic 14. Databases with Exposed

82. Explain the basic concepts of relational databases and SQL: tables, keys, relationships, and the SELECT, INSERT, UPDATE, and DELETE statements.
83. How do you create a local SQLite database? Compare its deployment with PostgreSQL.
84. What is the Exposed library? How do you connect to an SQLite database and run transactions?
85. How do you describe tables and run queries with the Exposed DSL?
86. Explain the DAO approach in Exposed: Entity entities and EntityClass classes.
87. How do you describe relationships between tables in Exposed and protect against SQL injection?

## Topic 15. Compose Multiplatform

88. What is Compose Multiplatform? Compare the declarative and imperative approaches to building a user interface.
89. What are composable functions (@Composable)? How does recomposition happen?
90. Explain the basic Compose components: Text, Button, TextField, and Image.
91. Explain layout in Compose: Column, Row, Box, and Modifier.
92. How do you store component state with remember and mutableStateOf?
93. What is state hoisting and unidirectional data flow?
94. How do you display lists with LazyColumn and style the interface with Material Design 3?

## Topic 16. MVVM and navigation

95. Describe the MVVM architecture in Compose Multiplatform applications. What is the role of the ViewModel class?
96. How do you pass state from a ViewModel to the interface with StateFlow and collectAsState?
97. How do you organize navigation between screens in Compose Multiplatform?
98. How do you run database queries in coroutines without blocking the interface?
99. How do you organize a data access layer (repository) in a Compose Multiplatform application?
100. How do you build and distribute a Compose Multiplatform desktop application?
