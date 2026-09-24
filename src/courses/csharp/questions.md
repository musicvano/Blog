---
title: "Review questions"
description: "Object-Oriented Programming in C#: review questions on the course topics"
sourceHash: "e7b147f6e1f11c94601adc8193051df9b92d08365f1185650dddc86d1ae542a2"
---

# Review questions

Questions for self-check and exam preparation, grouped by course topic.

## Topic 1. .NET and program structure

1. What is the .NET platform? Explain the purpose of the Common Language Runtime (CLR), the Base Class Library (BCL), and the Common Intermediate Language (CIL).
2. Explain the process of compiling and running a C# program from source code to machine code. What is JIT compilation?
3. What capabilities does the .NET 10 SDK provide? List the main dotnet CLI commands for creating, building, and running a project.
4. Describe the structure of a solution and a project in Microsoft Visual Studio 2026. What is the purpose of the .csproj project file?
5. What is NuGet? How do you add a package to a project with Visual Studio and the dotnet CLI?
6. Describe the structure of a C# program. What are top-level statements and the Main method?
7. What are namespaces? Explain the purpose of using directives, global using directives, and implicit using directives.

## Topic 2. Types, variables, operators

8. What built-in data types does C# have? Give their value ranges and the corresponding .NET types (System.Int32, System.Double, and so on).
9. What is the difference between value types and reference types? How are they placed in memory (the stack and the managed heap)?
10. Explain implicit typing of variables with var. What are its limitations?
11. What are nullable types? Explain the ?., ??, and ??= operators.
12. Explain explicit and implicit type conversion and the Convert, Parse, and TryParse methods. What are boxing and unboxing?
13. What operators does C# support? Explain operator precedence, integer division, and overflow checking (checked, unchecked).

## Topic 3. Branching and loops

14. Explain how the if-else statement and the ternary ?: operator work.
15. Describe the switch statement and the switch expression. Give examples of pattern matching.
16. Compare the for, while, and do-while loops. When is each of them appropriate?
17. How does the foreach loop work? Which objects can it iterate over?
18. Explain the purpose of the break, continue, and return statements. Give examples of their use in nested loops.

## Topic 4. Arrays and strings

19. How do you declare, create, and initialize a one-dimensional array? What default values do array elements have?
20. Compare multidimensional (rectangular) and jagged arrays. Give examples.
21. Which methods of the System.Array class are used for sorting, searching, and copying arrays?
22. Why are strings of type string immutable? What consequences does this have for program performance?
23. Which methods of the String class are used for searching, comparing, splitting, and formatting strings? Explain string interpolation.
24. What is the StringBuilder class for? Compare using it with string concatenation.

## Topic 5. Methods and recursion

25. Describe the syntax of a method declaration. What is a method signature?
26. Explain the ways of passing parameters to methods: by value, by reference (ref), output (out) parameters, and input (in) parameters.
27. What are default parameters, named arguments, and a params parameter array?
28. What is method overloading? By what criteria does the compiler choose the appropriate method?
29. What is recursion? Give an example of a recursive method and explain when a StackOverflowException occurs.
30. What are expression-bodied members and local functions?

## Topic 6. Debugging and exceptions

31. What debugging tools does Microsoft Visual Studio 2026 provide? Explain breakpoints, stepping, and the Locals, Watch, and Call Stack windows.
32. What is an exception? Explain how try, catch, and finally blocks work.
33. Describe the hierarchy of .NET exception classes. Give examples of standard exceptions (ArgumentException, NullReferenceException, InvalidOperationException, and so on).
34. How do you create a custom exception class? Explain the difference between throw and throw ex.
35. What are exception filters (catch when)? How do you correctly handle several exception types?
36. Explain the purpose of the using statement and the IDisposable interface for releasing resources.

## Topic 7. Classes and objects

37. What are a class and an object? How is an object created with the new operator, and where is it placed in memory?
38. Compare the fields and properties of a class. What are auto-implemented properties and init-only properties?
39. What kinds of constructors exist in C#? Explain the default constructor, constructor overloading, and calling this(…).
40. What are object initializers? Compare them with using constructors.
41. What are primary constructors and required properties?
42. How does the garbage collector work in .NET? What is a finalizer for?

## Topic 8. Encapsulation, static members

43. What is encapsulation? How is it implemented in C#?
44. Explain the access modifiers public, private, protected, internal, protected internal, and private protected.
45. What are static fields, methods, and constructors? How does a static class differ from a regular one?
46. Compare constants (const) and read-only fields (readonly).
47. What are partial and nested classes? When are they used?

## Topic 9. Inheritance and polymorphism

48. What is inheritance? Explain the inheritance syntax and calling the base class constructor (base).
49. What is polymorphism? Explain virtual methods (virtual) and overriding them (override).
50. How does overriding a method (override) differ from hiding it (new)?
51. What is the sealed modifier used for with classes and methods?
52. Which methods do all classes inherit from System.Object? Why override the ToString, Equals, and GetHashCode methods?
53. Explain upcasting and downcasting in a class hierarchy, the is and as operators, and type pattern matching.

## Topic 10. Abstract classes, interfaces

54. What are an abstract class and an abstract method? When is it appropriate to use them?
55. What is an interface? Compare abstract classes and interfaces.
56. Explain how a class implements several interfaces and explicit interface implementation.
57. What are default interface methods?
58. Explain the purpose of the standard interfaces IComparable&lt;T&gt;, IComparer&lt;T&gt;, IEquatable&lt;T&gt;, and ICloneable.

## Topic 11. Structures, records, tuples

59. What is a structure (struct)? Compare structures and classes.
60. What are records (record, record struct)? Explain value-based comparison of records and the with expression.
61. What is an enumeration (enum)? How are the [Flags] attribute and bitwise operators used with enumerations?
62. What are tuples (ValueTuple)? Explain named tuple elements and deconstruction.
63. Compare the ways of returning several values from a method: output parameters, tuples, and records.

## Topic 12. Operators and indexers

64. How do you overload operators for your own class? Which operators can be overloaded, and what rules must be followed?
65. How do you overload the == and != operators and keep them consistent with the Equals and GetHashCode methods?
66. Explain user-defined implicit and explicit conversion operators.
67. What is an indexer? Give an example of a class with an indexer.
68. What are extension methods? What are the requirements for declaring them?

## Topic 13. Generics and collections

69. What are generics? What advantages do generic classes and methods have compared with using the object type?
70. Explain generic type parameter constraints (where T : class, struct, new(), a base class, an interface).
71. Describe the main collections of the System.Collections.Generic namespace: List&lt;T&gt;, Dictionary&lt;TKey, TValue&gt;, HashSet&lt;T&gt;, Queue&lt;T&gt;, and Stack&lt;T&gt;.
72. Compare arrays, List&lt;T&gt;, and LinkedList&lt;T&gt; in terms of the performance of the main operations.
73. Explain the role of the IEnumerable&lt;T&gt; and IEnumerator&lt;T&gt; interfaces. How do you create an iterator with yield return?
74. What are covariance and contravariance of generic interfaces and delegates (out, in)?

## Topic 14. Delegates, lambdas, events

75. What is a delegate? How do you declare a delegate, create an instance of it, and call a method through a delegate?
76. Explain the standard generic delegates Func, Action, and Predicate.
77. What are anonymous methods and lambda expressions? What is a closure?
78. What are multicast delegates? How do you add a method to the invocation list and remove it?
79. What are events (event)? Explain the standard .NET event pattern with the EventHandler&lt;TEventArgs&gt; delegate.

## Topic 15. LINQ

80. What is LINQ? Compare query syntax and method syntax.
81. Explain the LINQ filtering, projection, and sorting operators: Where, Select, OrderBy, ThenBy.
82. Explain the LINQ grouping and join operators: GroupBy, Join, and GroupJoin.
83. What LINQ aggregate operators do you know (Count, Sum, Average, Min, Max, Aggregate)?
84. What is the deferred execution of LINQ queries? Which methods cause a query to execute immediately?
85. Explain the LINQ partitioning and set operators: Take, Skip, Distinct, Union, Intersect, Except. What are anonymous types?

## Topic 16. Files, streams, JSON

86. Which classes of the System.IO namespace are used for working with files and directories (File, FileInfo, Directory, Path)?
87. What is a stream (Stream)? Explain working with text files with the StreamReader and StreamWriter classes.
88. Compare text and binary files. How do the FileStream, BinaryReader, and BinaryWriter classes work?
89. What is serialization? Explain serializing and deserializing objects to and from JSON with the JsonSerializer class of the System.Text.Json library.
90. How do you configure JSON serialization with JsonSerializerOptions and the [JsonPropertyName] and [JsonIgnore] attributes? How do you read and write files asynchronously (async, await)?

## Topic 17. SOLID and design patterns

91. Explain the SOLID principles. Give an example of a violation of the single responsibility principle and a way to eliminate it.
92. Explain the open/closed principle and the Liskov substitution principle using examples of class hierarchies.
93. Explain the interface segregation principle and the dependency inversion principle. What is dependency injection?
94. What are design patterns? Describe the creational patterns Singleton and Factory Method.
95. Describe the behavioral patterns Strategy and Observer and their implementation with C# language features.

## Topic 18. Testing and refactoring

96. What is unit testing? Explain the structure of a unit test according to the Arrange–Act–Assert pattern.
97. How do you create an xUnit unit test project in Visual Studio 2026? Explain the [Fact] and [Theory] attributes and the methods of the Assert class.
98. How do you run and analyze tests in the Test Explorer window? What is code coverage?
99. What are test doubles (stubs, mock objects)? What is the Moq library used for?
100. What is refactoring? Give examples of refactoring techniques (extracting a method, renaming, replacing a conditional with polymorphism) and the refactoring tools of Visual Studio 2026.
