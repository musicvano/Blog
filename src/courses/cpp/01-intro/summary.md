---
title: Summary
description: "Topic 1. The C++ Language and Your First Program: conclusions and review questions"
sourceHash: "1b5091febb08e503abfb3ab14cc31fcc8f823bca6922513f80c66fa7c81e6b61"
---

# Summary

## Conclusions

C++ lets you create native programs and use different ways of
organizing code. The edition of the standard, the compiler version, and the project
settings are different characteristics. The examples in this topic require a current
MSVC, a standard library with `std::println`, the `/std:c++latest` mode,
and UTF-8. The path with the `<print>` header works both in a Visual Studio project
and in a simple `cl` command; the `import std;` path requires preparing the module.

Preprocessing, compilation, and linking turn source code
into an executable file. A successful build checks only part of correctness:
you need to compare the result with the expected one. Git stores clear steps
in the development of a program, and `.gitignore` separates source materials from build
outputs. Publishing to GitHub complements the local history but doesn’t replace it.

## Self-check questions

1. Which problems motivate the use of C++, and what responsibilities does the developer have?
2. How does the C++ standard differ from MSVC and Visual Studio?
3. Why doesn’t `/std:c++latest` guarantee full support for C++26?
4. Which standard do `std::println` and the `std` module belong to?
5. What is a translation unit, and why do you need a linker?
6. How do `.cpp`, `.obj`, `.exe`, and `.vcxproj` files differ in purpose?
7. Which Installer workload is required for a C++ console project?
8. Why should properties be checked for all configurations?
9. What do `int`, `main`, `std::`, and `return 0` mean in the first program?
10. How does `#include <print>` differ from `import std;` when building?
11. How do `{:<28}` and `{:.2f}` affect the output?
12. How does a compilation error differ from a linker error and a logic error?
13. Why do you need Developer PowerShell, and what does `$LASTEXITCODE` show?
14. How do saving a file, `git add`, `git commit`, and `git push` differ?
15. Which project files should be stored in Git, and what is `.gitignore` for?

## Review questions for the lab

1. What stages does a `.cpp` file go through before an executable file appears?
2. What are `<print>`, the `main` function, and `return 0` needed for?
3. How does the `/std:c++latest` mode differ from full support for the standard?
4. What do the width, the alignment, and `.2f` denote in a format string?
5. Why doesn’t changing the source code without rebuilding change the `.exe`?
6. How do Debug and Release differ, and why can their text output be the same?
7. What is `/utf-8` used for, and what else affects how the console looks?
8. How do the working directory, the index, and a local Git commit differ?
9. Which project files should be stored in Git, and which should be ignored?
10. Where does `git restore -- main.cpp` get the contents from, and what should you check before restoring a file?

## Useful links

- C++ standardization: <https://isocpp.org/std/status>.
- Microsoft C++ documentation: <https://learn.microsoft.com/cpp/>.
- MSVC feature support:
  <https://learn.microsoft.com/cpp/overview/visual-cpp-language-conformance>.
- Library modules:
  <https://learn.microsoft.com/cpp/cpp/tutorial-import-stl-named-module>.
- UTF-8 in MSVC:
  <https://learn.microsoft.com/cpp/build/reference/utf-8-set-source-and-executable-character-sets-to-utf-8>.
- A Git tutorial: <https://git-scm.com/docs/gittutorial>.
- Ignore rules: <https://git-scm.com/docs/gitignore>.
- GitHub documentation: <https://docs.github.com/get-started>.
