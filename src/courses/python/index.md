---
title: "Object-oriented programming in Python"
description: "This course covers Python 3.14 in JetBrains PyCharm, from basic language constructs, built-in collections, and functional programming to object-oriented programming, file handling, and unit testing. In the final part, students learn to work with relational databases using sqlite3 and SQLAlchemy, perform numerical computing and data analysis with NumPy and pandas, plot with Matplotlib, create PySide6 GUI applications, package applications, and apply static code analysis. Each topic combines a lecture with a laboratory assignment."
sourceHash: "c2117ce2029c3d599bd7c9415a3a9c6d40fbc3b003a64c40ebc431cd03a98774"
---

# Object-oriented programming in Python

Python is one of the most popular programming languages and a key tool for automation, data analysis, machine learning, and web development. Its simple syntax lets you move quickly from an idea to a working program. This course provides a solid foundation in object-oriented programming for further study in these areas.

This course covers Python 3.14 in JetBrains PyCharm, from basic language constructs, built-in collections, and functional programming to object-oriented programming, file handling, and unit testing. In the final part, students learn to work with relational databases using sqlite3 and SQLAlchemy, perform numerical computing and data analysis with NumPy and pandas, plot with Matplotlib, create PySide6 GUI applications, package applications, and apply static code analysis. Each topic combines a lecture with a laboratory assignment.

## Course syllabus

### Python language fundamentals

1. [Python 3.14, JetBrains PyCharm, virtual environments, package management, and Git version control](./01-intro/)
2. [Data types, variables, operations, console input/output, and control flow](./02-types-control-flow/)
3. [Functions: parameters and arguments, scope, recursion, and type hints](./03-functions/)
4. [Exception handling and debugging](./04-exceptions-debugging/)

### Data structures and functional programming

5. [Built-in collections: lists, tuples, sets, dictionaries, and the collections module](./05-collections/)
6. [Strings, f-strings, template strings, and regular expressions](./06-strings-regex/)
7. [Iterators, generators, generator expressions, lambda functions, and decorators](./07-iterators-decorators/)

### Object-oriented programming

8. [Classes and objects: attributes, methods, constructors, properties, and encapsulation](./08-classes/)
9. [Inheritance, polymorphism, abstract classes, and protocols](./09-inheritance-protocols/)
10. [Special methods and operator overloading, data classes, and enumerations](./10-special-methods/)
11. [Modules and packages, file handling (pathlib, JSON, CSV), and unit testing with pytest](./11-modules-files-pytest/)

### Data processing and GUI applications

12. [Relational databases: SQL fundamentals, the sqlite3 module, and SQLAlchemy ORM](./12-databases/)
13. [Numerical computing, data analysis, and visualization with NumPy, pandas, and Matplotlib](./13-numpy-pandas-matplotlib/)
14. [Creating PySide6 GUI applications: widgets, layouts, signals, and slots](./14-pyside6-widgets/)
15. [Model/View architecture, dialogs, and database access in PySide6 applications](./15-model-view/)
16. [Packaging and distributing Python applications, generic types, and static code analysis](./16-packaging-typing/)

## Required software {#software}

| Software | Purpose | Topic |
| --- | --- | :-: |
| [Python 3.14](https://www.python.org/downloads/windows/) (via the Python Install Manager) | Interpreter | 1 |
| [PyCharm](https://www.jetbrains.com/pycharm/download/) | Development environment | 1 |
| [uv](https://docs.astral.sh/uv/getting-started/installation/) | Virtual environments and dependencies | 1 |
| [Git](https://git-scm.com/downloads) | Version control | 1 |

Packages are installed into the project’s virtual environment with `pip` or `uv`: pytest (topic 11), SQLAlchemy (topic 12), NumPy, pandas and Matplotlib (topic 13), PySide6 (topic 14), mypy, Ruff and PyInstaller (topic 16). You can use DataGrip to view the SQLite database.

<!--@include: ../_shared/introduction.md-->

## Course materials

- [Review questions](./questions) — 100 questions covering the course topics for self-assessment and exam preparation
- [Review tasks](./exam) — practical tasks by topic
- [Useful links](./links) — documentation and online resources
- [Recommended reading](./literature) — textbooks and study guides
