---
title: "Summary"
description: "Topic 1. .NET and program structure: conclusions and review questions"
sourceHash: "3598208cb8e40649f66e87ed9142513b64c50fadc69ff3c5b33d8cda00697ffe"
---

# Summary

## Conclusions

The .NET platform consists of the CLR runtime, the Base Class Library, and development tools, and runs on Windows, Linux, and macOS. A C# program compiles to the intermediate language IL, which the CLR converts to machine code at runtime while managing memory and type safety. Development requires the .NET SDK, and you can choose a development environment to suit your operating system: Visual Studio 2026, Visual Studio Code with C# Dev Kit, or JetBrains Rider. All of them use the dotnet CLI tool. A program is organized into projects and solutions; execution begins at the entry point—the `Main` method or top-level statements—and the `Console` class handles user interaction.

## Self-check questions

1. How does modern .NET differ from .NET Framework?
2. What is the difference between LTS and STS releases of .NET? Which version should you choose for learning?
3. Which operating systems and processor architectures does .NET 10 support?
4. What is the intermediate language IL, and what are the benefits of compiling to IL?
5. When is a method JIT-compiled? What is Native AOT?
6. What role does the garbage collector play?
7. How does the .NET SDK differ from the .NET Runtime? How can you check which versions are installed?
8. How do you install the .NET SDK on Windows, Linux, and macOS?
9. Which Visual Studio Installer workload is needed for C# console applications?
10. Which C# development environments can you use on Linux and macOS?
11. How do you create, build, and run a project with the dotnet CLI?
12. What does a `.csproj` project file contain? How does a project differ from a solution?
13. How does the compiler handle top-level statements?
14. What is the difference between `int.Parse` and `int.TryParse`?
15. How do you display a number with two decimal places and align it in a field of a specified width?
16. What are the Debug and Release configurations for?

## Useful links

- .NET documentation: <https://learn.microsoft.com/dotnet/>
- C# documentation: <https://learn.microsoft.com/dotnet/csharp/>
- C# learning materials for beginners: <https://dotnet.microsoft.com/learn/csharp>
- A tour of C#: <https://learn.microsoft.com/dotnet/csharp/tour-of-csharp/>
- What's new in C# 14: <https://learn.microsoft.com/dotnet/csharp/whats-new/csharp-14>
- Visual Studio for beginners: <https://learn.microsoft.com/visualstudio/get-started/csharp/>
- C# in Visual Studio Code: <https://code.visualstudio.com/docs/csharp/get-started>
- JetBrains Rider: <https://www.jetbrains.com/help/rider/>
