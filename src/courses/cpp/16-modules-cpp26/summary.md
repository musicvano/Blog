---
title: Summary
description: "Topic 16. Modules and C++26: conclusions and review questions"
sourceHash: "b3aff8a64b1de061f5cbe31045ae076c5d37b981a8109877feeeab893d9359b5"
---

# Summary

## Conclusions

Splitting code into files and libraries helps make the boundaries of responsibility explicit.
A header describes an interface for textual inclusion; a module provides controlled
exports and import dependencies. Both approaches require correct
linking and consistent options. An automated build description
and tests make a project reproducible, and checking specific features
lets you use modern C++ without assuming full support for the standard.

## Self-check questions

1. How does a declaration differ from a definition?
2. What exactly does an include guard protect against, and what does it not guarantee?
3. Why do `extern` in a header and a definition in a `.cpp` file form one object?
4. Why can `static` in a header change the behavior of a shared counter?
5. What is the language role of `inline`, apart from its historical connection with optimization?
6. Why should you not open the whole `std` namespace in a public header?
7. Which artifacts are needed to use a static library?
8. How does a module export differ from a Windows DLL export?
9. What roles do `.ixx`, `.ifc`, and `.obj` files play?
10. What is the global module fragment `module;` for?
11. How does `import :part` differ from `export import :part`?
12. Why does the compilation order of modules depend on the import graph?
13. Why does `import std` not replace a header with the required macros?
14. How do configure, build, and test differ in CMake?
15. Why does the presence of the old `execution` macro not prove C++26 support?

## Review questions for the lab

1. Which files does the client’s compiler need, and which does the linker need?
2. Why does an include guard not eliminate ODR violations between different `.cpp` files?
3. How do an external variable, the internal state of a file, and an `inline` variable differ?
4. Why is a module `export` not a Windows DLL export?
5. What roles do the primary interface, a partition, and a module implementation unit play?
6. Why do you distinguish the names of the object files of the interface and the implementation?
7. Why can a ready-made IFC not be moved arbitrarily between toolsets?
8. How does CMake determine the compilation order of a client and a module?
9. Why should mandatory tests not rely only on `assert`?
10. Which check proves that the required C++26 feature is available in your project?

## Useful links

- Translation units and linkage: <https://learn.microsoft.com/cpp/cpp/program-and-linkage-cpp>.
- Named modules: <https://learn.microsoft.com/cpp/cpp/tutorial-named-modules-cpp>.
- The standard library module: <https://learn.microsoft.com/cpp/cpp/tutorial-import-stl-named-module>.
- Modules in CMake: <https://cmake.org/cmake/help/latest/manual/cmake-cxxmodules.7.html>.
- MSVC support status: <https://learn.microsoft.com/cpp/overview/visual-cpp-language-conformance>.
