---
title: "Summary"
description: "Topic 5. Methods, parameters, recursion: conclusions and review questions"
sourceHash: "0dc6b46862710acfa2e4a33d3176d2e6b037d701c8714a6f4516f35d1e07ec65"
---

# Summary

## Conclusions

Methods divide a program into small, named parts that perform one task. A method declaration contains the return type, name, parameters, and body; in a program with top-level statements, methods are local functions, while overloaded methods are declared in a class. By default, arguments are passed by value: for reference types, the reference is copied. The `ref`, `out`, and `in` modifiers pass a variable by reference, optional parameters and named arguments simplify calls, and `params` allows a variable number of arguments. Overloading gives the same name to operations on different data types. A recursive method must have a base case; recursion depth is limited by stack size, and memoization eliminates repeated computations. XML comments document methods and appear in IntelliSense tooltips.

## Self-check questions

1. Why divide a program into methods? What makes a good method?
2. What are the parts of a method declaration? What is a signature?
3. How does a local function differ from a class method? What is the `static` modifier for?
4. What happens when a value type or an array is passed by value?
5. How do `ref`, `out`, and `in` differ?
6. How does the `TryParse` pattern work? What does `out _` mean?
7. What rules apply to declaring optional parameters? What are named arguments for?
8. How does the `params` modifier work? Where must it appear?
9. What is method overloading? Is the return type part of the signature?
10. How does the compiler choose an overload? When does ambiguity arise?
11. How can a method return multiple values?
12. What are a base case and a recursive step?
13. What is the call stack? Why does stack overflow occur?
14. What is memoization? Why is direct recursion for Fibonacci numbers slow?
15. What are `///` XML comments for?

## Useful links

- Methods: <https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/methods>
- Method parameters: <https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/method-parameters>
- Named and optional arguments: <https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/named-and-optional-arguments>
- Local functions: <https://learn.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/local-functions>
- XML comments: <https://learn.microsoft.com/dotnet/csharp/language-reference/xmldoc/>
