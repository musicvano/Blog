---
title: "Review questions"
description: "Object-oriented programming in Python: review questions on the course topics"
sourceHash: "11804bf99b4f2e1e54f36854b93044153594537d99b679909d267dd19eff40a3"
---

# Review questions

Questions for self-check and exam preparation, grouped by course topic.

## Topic 1. Python, PyCharm, and Git

1. What is the Python language? Explain how the CPython interpreter works: bytecode, the virtual machine, and dynamic typing.
2. How do you create and run a Python project in JetBrains PyCharm? How do you configure the project interpreter?
3. What are virtual environments? How do you create and activate them (venv)?
4. How do you install packages with pip and uv? What are PyPI and the requirements.txt file?
5. What is the Git version control system? Explain the concepts of a repository, a commit, and a branch, and the basic Git commands.
6. How do you work with a Git repository in PyCharm? Which files of a Python project should be added to .gitignore?

## Topic 2. Types, operations, control flow

7. What built-in data types does Python have? Explain the concept of variables as references to objects.
8. Compare mutable and immutable data types. Give examples.
9. What operations does Python support? Explain integer division, exponentiation, and the assignment expression operator :=.
10. How do you perform console input with input and output with print? How do you convert data types?
11. Explain the if-elif-else conditional statement, the for and while loops, and the range function.
12. What is structural pattern matching (match-case)? Give examples.

## Topic 3. Functions

13. Explain function definitions in Python, return values, and docstrings.
14. Explain the kinds of function parameters: positional, keyword, default parameters, \*args, and \*\*kwargs.
15. Why should you not use mutable objects as default parameter values?
16. Explain variable scopes according to the LEGB rule and the global and nonlocal keywords.
17. What is recursion? What recursion depth limits does Python have?
18. What are type annotations? Explain annotations of parameters and return values, and the None type. How are annotations evaluated in Python 3.14, and why do they not check values at run time?

## Topic 4. Exceptions and debugging

19. Explain Python's built-in exception hierarchy: BaseException, Exception, and their subclasses.
20. Explain how the try, except, else, and finally blocks work. When can several exception types be written without parentheses in Python 3.14, and why are parentheses required when binding with as?
21. How do you raise an exception (raise) and create a custom exception class? What is exception chaining?
22. What are exception groups (ExceptionGroup) and the except\* construct?
23. What are context managers and the with statement?
24. What debugging tools does PyCharm provide? What are the logging and pdb modules used for?

## Topic 5. Built-in collections

25. Explain the basic list operations: indexing, slicing, adding and removing elements, and sorting.
26. Compare lists and tuples. What is tuple unpacking?
27. Explain sets (set, frozenset) and the operations on them.
28. Explain dictionaries: creation, element access, and the get, items, and update methods.
29. What are list, set, and dictionary comprehensions?
30. Explain the collections in the collections module: namedtuple, deque, Counter, and defaultdict.
31. Compare the complexity of the basic operations on lists, sets, and dictionaries.

## Topic 6. Strings and regular expressions

32. Explain the basic string methods: searching, replacing, splitting, and joining.
33. What are f-strings? Explain formatting numbers and dates in f-strings.
34. What are the template strings (t-strings) of Python 3.14, and how do they differ from f-strings? What is the responsibility of the handler of text substitutions?
35. Explain string encodings, the str and bytes types, and conversion between them.
36. Explain the main functions of the re module: match, fullmatch, search, findall, finditer, sub, and split. Why is fullmatch used to validate the entire input?
37. What are groups and named groups in regular expressions? How do you compile a regular expression?

## Topic 7. Generators and decorators

38. What are iterables and iterators? Explain the iteration protocol (iter, next).
39. What are generators and the yield statement? Compare generators with lists.
40. What are generator expressions? When is it appropriate to use them?
41. Explain the useful functions of the itertools module.
42. What are lambda functions? Explain the map, filter, and sorted functions with the key parameter.
43. What is a closure? Explain higher-order functions and the functools module.
44. What are decorators? How do you create a decorator with parameters and preserve a function's metadata (functools.wraps)?

## Topic 8. Classes and objects

45. Explain class definitions, object creation, and the \_\_init\_\_ initializer.
46. Compare instance attributes and class attributes.
47. Compare instance methods, class methods (@classmethod), and static methods (@staticmethod).
48. What are properties (@property)? How do you create a property setter?
49. How is encapsulation implemented in Python: naming conventions with one and two underscores?
50. What is the \_\_slots\_\_ attribute used for?

## Topic 9. Inheritance and protocols

51. What is inheritance? Explain method overriding and the super function.
52. What are multiple inheritance and the method resolution order (MRO)?
53. What are polymorphism and duck typing in Python?
54. What are abstract classes? Explain the abc module and the @abstractmethod decorator.
55. What are protocols (typing.Protocol) and structural typing?
56. Compare abstract classes and protocols. When should each of them be used?
57. What are mixin classes? Compare inheritance and composition.

## Topic 10. Special methods, dataclass

58. What are special methods? Explain the \_\_str\_\_ and \_\_repr\_\_ methods.
59. How do you overload arithmetic and comparison operations for a custom class?
60. Which special methods implement the container protocols (\_\_len\_\_, \_\_getitem\_\_, \_\_contains\_\_, \_\_iter\_\_)?
61. What are the \_\_eq\_\_ and \_\_hash\_\_ methods? How are they related?
62. What are data classes (@dataclass)? Explain the frozen, order, and field parameters.
63. What are enumerations (Enum, IntEnum, StrEnum) and the auto function?

## Topic 11. Modules, files, pytest

64. What are modules and packages in Python? Explain importing, the \_\_init\_\_.py file, and the \_\_name\_\_ check.
65. How do you read and write text and binary files? What is the with statement used for?
66. What capabilities does the pathlib module provide for working with paths, files, and directories?
67. How do you serialize and deserialize data in JSON format with the json module?
68. How do you read and write CSV files with the csv module?
69. How do you write unit tests with pytest: test functions, assert, fixtures, and parameterization?

## Topic 12. Databases, SQL, SQLAlchemy

70. What are a table, a primary key, and a foreign key in a relational database?
71. How do you create a table and perform INSERT, SELECT, UPDATE, and DELETE operations?
72. How do you execute a parameterized query with sqlite3, and why should user input not be inserted into SQL with an f-string?
73. What is a transaction? Explain commit and rollback.
74. How does an ORM map a Python class to a table? Explain DeclarativeBase, Mapped, and `mapped_column` in SQLAlchemy.
75. What are Engine and Session needed for? How do you save an object and read it with select?

## Topic 13. NumPy, pandas, Matplotlib

76. How does a NumPy array differ from a Python list? What do shape and dtype mean?
77. What is vectorized computation? How do you perform element-wise operations on arrays?
78. How do you find the minimum, maximum, mean, and standard deviation of data?
79. What are Series and DataFrame? How do you load a CSV file and select rows by a condition?
80. How do you detect missing values and group data with pandas?
81. When are a line chart, a scatter plot, and a bar chart appropriate?
82. How do you create a Figure and Axes in Matplotlib, label the axes, add a legend, and save a chart?

## Topic 14. GUI applications with PySide6

83. What are the PySide6 library and the Qt framework? Describe the structure of the simplest application (QApplication, the main window, the event loop).
84. What are the main PySide6 widgets you know? Explain their common properties.
85. Explain the PySide6 layout managers: QVBoxLayout, QHBoxLayout, QGridLayout, and QFormLayout.
86. What are signals and slots? How do you connect a widget's signal to a handler?
87. How do you create a QMainWindow main window with a menu, a toolbar, and a status bar?
88. How do you design an interface in Qt Designer and load .ui files into an application?

## Topic 15. Model/View and databases

89. Describe the Model/View architecture in Qt: models, views, and delegates.
90. How do you display tabular data in a QTableView with a custom QAbstractTableModel? How does it differ from QAbstractListModel?
91. How do you use standard dialogs (QMessageBox, QFileDialog) and create custom dialogs (QDialog)?
92. How do you work with a database in a PySide6 application through the QtSql module or an SQLAlchemy layer?
93. How do you apply QSortFilterProxyModel for sorting and filtering? Why must a proxy index be mapped before modifying the source model?
94. How do you validate user input in PySide6 forms?

## Topic 16. Packaging and typing

95. How do you describe a Python project in the pyproject.toml file? Explain dependencies and entry points.
96. How do you build a wheel and verify its installation in a clean environment? How does local delivery differ from publishing to a registry?
97. How do you create an executable file for a PySide6 application with PyInstaller?
98. What are generic types in Python? Explain the syntax of type parameters for classes and functions, and type aliases (type).
99. What is static code analysis? How do you check types with mypy?
100. What are the Ruff linter and formatter and the PEP 8 code style standard used for?
