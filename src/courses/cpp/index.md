---
title: "Object-oriented programming in C++"
description: "The course is designed for students with no prior C++ programming experience. It covers the C++ language according to the C++26 standard in Microsoft Visual Studio 2026: from basic language constructs, functions and memory management to object-oriented programming, templates, concepts, the C++ standard library, file handling and modules. Each topic of the course combines a lecture with a lab assignment."
sourceHash: "f148f0a7225060e479448a5db8f94af0d58a592bcc8fce81d1810105fa2b1358"
---

# Object-oriented programming in C++

Knowing C++ opens the way to developing system software, game engines, embedded systems and high-performance computing – fields where performance and control over resources matter most. The course requires no prior experience with C++ and teaches the modern C++26 standard from the start, and understanding how memory and objects work makes it easier to learn any other language.

The course is designed for students with no prior C++ programming experience. It covers the C++ language according to the C++26 standard in Microsoft Visual Studio 2026: from basic language constructs, functions and memory management to object-oriented programming, templates, concepts, the C++ standard library, file handling and modules. Each topic of the course combines a lecture with a lab assignment.

## Course program

### C++ language basics

1. [The C++ language and the C++26 standard, the Microsoft Visual Studio 2026 environment, your first program and the Git version control system](./01-intro/)
2. [Data types, variables, operators, console input and output (std::print) and control structures](./02-types-control-flow/)
3. [Functions: parameters, passing by reference, overloading, recursion](./03-functions/)
4. [Arrays, the strings std::string and std::string_view, the dynamic array std::vector](./04-arrays-strings/)
5. [Pointers, references and memory management: the new and delete operators, smart pointers](./05-pointers-memory/)
6. [Debugging programs and handling errors: exceptions and std::expected](./06-errors-debugging/)

### Object-oriented programming

7. [Classes and objects: fields, methods, constructors, destructors, encapsulation](./07-classes/)
8. [Copying and moving objects, the RAII idiom, the rules of zero, three and five](./08-copy-move-raii/)
9. [Operator overloading and friend functions](./09-operators/)
10. [Inheritance, virtual functions and polymorphism](./10-inheritance-polymorphism/)
11. [Abstract classes, interfaces and multiple inheritance](./11-abstract-interfaces/)

### Generic programming and the standard library

12. [Function and class templates, concepts](./12-templates-concepts/)
13. [Standard library containers: vector, list, deque, set, map, `unordered_map`](./13-containers/)
14. [Iterators, algorithms, ranges and lambda expressions](./14-iterators-algorithms-ranges/)
15. [Input/output streams, working with text and binary files, the std::filesystem library](./15-io-files/)
16. [C++ modules, organizing multi-file projects and new features of the C++26 standard](./16-modules-cpp26/)

## Required software {#software}

| Software | Purpose | Topic |
| --- | --- | :-: |
| [Visual Studio 2026](https://visualstudio.microsoft.com/downloads/) Community with the *Desktop development with C++* workload (MSVC, Windows SDK, CMake tools, AddressSanitizer) | Development environment, compiler and debugger | 1 |
| [Git for Windows](https://git-scm.com/downloads/win) | Version control | 1 |
| [CMake](https://cmake.org/download/) 4.2 or later (CMake tools from Visual Studio or a separate install) | Building projects with C++26 modules | 16 |

A GitHub account is needed only for the optional publishing of your repository.

<!--@include: ../_shared/introduction.md-->

## Course materials

- [Review questions](./questions) — 100 questions on the course topics for self-check and exam preparation
- [Review tasks](./exam) — practical tasks by topic
- [Useful links](./links) — documentation and online resources
- [Recommended reading](./literature) — textbooks and study guides
