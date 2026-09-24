---
title: "Review questions"
description: "Java OOP: review questions on the course topics"
sourceHash: "5b2b5aa922a30996a0274d7a3a3cfe7fdda13a20d3258ce42e68c9036fa923b8"
---

# Review questions

Questions for self-check and exam preparation, grouped by course topic.

## Topic 1. Java and your first program

1. What is the Java platform? Explain the purpose of the JVM, JRE, and JDK.
2. Explain how a Java program is compiled and executed: bytecode, the class loader, JIT compilation.
3. Describe the structure of a Java program: a class, the main method, packages, imports.
4. How do you create, run, and debug a Java project in IntelliJ IDEA? Which JDK tools (javac, java, jshell) do you know?
5. What is the Git version control system? Explain the concepts of a repository, a commit, and a branch, and the basic Git commands.
6. How do you work with a Git repository in IntelliJ IDEA? Which Java project files should be added to .gitignore?

## Topic 2. Types and control flow

7. What primitive data types does Java have? Give their sizes and value ranges.
8. Compare primitive and reference types. What are wrapper classes, autoboxing, and unboxing?
9. Explain implicit and explicit type conversion and local variable type inference (var).
10. Which operators does Java support? Explain operator precedence and integer division.
11. How do you perform console input with the Scanner class and formatted output with printf?
12. Describe Java's control structures: if, the switch statement and expression, and the for, while, do-while, and for-each loops.

## Topic 3. Methods, arrays, and strings

13. Explain method declarations, pass-by-value parameter passing, and method overloading.
14. What are variable-argument methods (varargs) and recursive methods?
15. How do you declare, create, and initialize one-dimensional and multidimensional arrays? Which methods does the Arrays class provide?
16. Why are String objects immutable? What is the string pool, and how should strings be compared?
17. Compare the String, StringBuilder, and StringBuffer classes.
18. What are text blocks and string formatting methods (formatted, String.format)?

## Topic 4. Exceptions and debugging

19. Describe the Java exception hierarchy: Throwable, Error, Exception, RuntimeException.
20. Compare checked and unchecked exceptions.
21. Explain how try, catch, and finally blocks and multi-catch work.
22. What is the try-with-resources statement and the AutoCloseable interface?
23. How do you create your own exception class? What is exception chaining?
24. Which debugging tools does IntelliJ IDEA provide: breakpoints, stepping, expression evaluation?

## Topic 5. Classes and objects

25. What are a class and an object? How is an object created, and where is it placed in memory?
26. Explain constructors, constructor overloading, and calling this(…).
27. What is encapsulation? Explain the access modifiers public, protected, and private, and package-private access.
28. What are static fields, static methods, and initialization blocks? What is the final keyword used for?
29. What are packages in Java? How are they related to the project's directory structure?
30. How does the garbage collector work in the JVM? What are unreachable objects?
31. What are immutable classes, and how do you create them?

## Topic 6. Inheritance and polymorphism

32. What is inheritance? Explain the extends and super keywords.
33. What is polymorphism? Explain method overriding and the @Override annotation.
34. Compare method overloading and overriding.
35. Which methods does the Object class define? Why override equals, hashCode, and toString?
36. Explain upcasting and downcasting and the instanceof operator.
37. What are final classes and final methods used for?

## Topic 7. Abstraction and interfaces

38. What are an abstract class and an abstract method?
39. What is an interface? Explain default, static, and private interface methods.
40. Compare abstract classes and interfaces. When should you use each of them?
41. Explain the kinds of nested classes: static nested, inner, local, and anonymous classes.
42. What are anonymous classes used for? Compare them with lambda expressions.
43. Explain the standard Comparable and Comparator interfaces.

## Topic 8. Records, enums, sealed classes

44. What are records? Which methods does the compiler generate for a record automatically?
45. What are enums? How do you add fields, constructors, and methods to an enum?
46. What are sealed classes and interfaces? Explain the permits and non-sealed keywords.
47. Explain pattern matching for instanceof and in the switch statement.
48. What are record patterns and record deconstruction?
49. How do sealed hierarchies help check the exhaustiveness of switch branches?

## Topic 9. Generics

50. What are generics? What advantages do generic classes and methods provide?
51. Explain the declaration of generic classes, interfaces, and methods.
52. What are bounded type parameters (extends)?
53. Explain the wildcards ?, ? extends T, and ? super T, and the PECS principle.
54. What is type erasure? What restrictions does it impose on generics?
55. What are raw types, and why should you avoid them?

## Topic 10. Collections

56. Describe the interface hierarchy of the Java Collections Framework: Collection, List, Set, Queue, Map.
57. Compare the ArrayList and LinkedList list implementations.
58. Compare the HashSet, LinkedHashSet, and TreeSet set implementations.
59. Compare the HashMap, LinkedHashMap, and TreeMap map implementations. How does HashMap work?
60. Explain queues and deques: Queue, Deque, ArrayDeque, PriorityQueue.
61. How do you traverse collections with an iterator and a for-each loop? What is ConcurrentModificationException?
62. Compare unmodifiable collections (List.of, Map.of) and mutable collections. Which methods does the Collections class provide?

## Topic 11. Lambdas and the Stream API

63. What are lambda expressions? Explain their syntax and variable capture.
64. What are functional interfaces? Explain the Function, Predicate, Consumer, and Supplier interfaces.
65. What are method references? Give examples of their kinds.
66. What is the Stream API? Compare intermediate and terminal stream operations.
67. Explain the stream operations filter, map, flatMap, sorted, reduce, and collect.
68. How do you group and aggregate data with the Collectors class (groupingBy, joining, toMap)?
69. What is the Optional class, and what is it used for?

## Topic 12. Files, NIO.2, and serialization

70. Compare Java's byte and character I/O streams.
71. How do you read and write text files with BufferedReader and BufferedWriter?
72. What capabilities does NIO.2 provide: the Path, Paths, and Files classes?
73. How do you browse directory contents and process files with the Files.walk and Files.lines methods?
74. What is object serialization? Explain the Serializable interface and the transient keyword.
75. What security risks does standard Java serialization have? Which alternative serialization formats (JSON) do you know?

## Topic 13. Modules, builds, and testing

76. What is the Java Platform Module System (JPMS)? Explain the module-info.java file and the requires and exports directives.
77. What is the Maven build system? Explain the pom.xml file, dependencies, and the build lifecycle.
78. What is the Gradle build system? Compare Gradle and Maven.
79. What is unit testing? Explain the JUnit 6 annotations (@Test, @BeforeEach, @ParameterizedTest).
80. Explain the methods of the Assertions class and testing exceptions in JUnit.
81. How do you run tests in IntelliJ IDEA and with Maven or Gradle? What is test code coverage?

## Topic 14. Databases and JDBC

82. Explain the basic concepts of relational databases and SQL: tables, keys, relationships, and the SELECT, INSERT, UPDATE, and DELETE statements.
83. How do you create a PostgreSQL database and work with it in JetBrains DataGrip?
84. What is JDBC? Describe the Connection, Statement, PreparedStatement, and ResultSet interfaces.
85. How do you add the PostgreSQL JDBC driver to a project and connect to a database?
86. Why should you use PreparedStatement? How does it protect against SQL injection?
87. How do you perform transactions in JDBC (setAutoCommit, commit, rollback)?
88. What is a connection pool? How do you implement the DAO pattern for data access?

## Topic 15. JavaFX graphical applications

89. Describe the architecture of a JavaFX application: the Application, Stage, and Scene classes, and the scene graph.
90. Which basic JavaFX controls do you know? Explain their common properties.
91. Explain the JavaFX layout panes: VBox, HBox, BorderPane, GridPane, StackPane.
92. How do you handle events in JavaFX? Explain event handlers and lambda expressions.
93. What are FXML and Scene Builder? How do you connect FXML markup to a controller class?
94. How do you style a JavaFX interface with CSS?

## Topic 16. MVC and data binding

95. Describe the MVC architecture and its implementation in JavaFX applications.
96. What are JavaFX properties (Property)? Explain one-way and two-way data binding.
97. What is an ObservableList? How do you display data in TableView and ListView controls?
98. How do you run long operations on a background thread with Task without blocking the JavaFX interface?
99. How do you organize database access from a JavaFX application through a DAO layer?
100. How do you build and distribute a JavaFX application (jlink, jpackage)?
