---
title: "Review tasks"
description: "Object-oriented programming in Python: practical tasks by course topic"
sourceHash: "c4c3314942a887e13cc9df6027b1626fef213a9d5aa8a8f67e15604f3532715b"
---

# Review tasks

Practical tasks by course topic to check your knowledge. Each task is a separate program.

## Topic 1. Python, PyCharm, and Git

1. Create a Python 3.14 project with a venv environment: from two positive numbers on the command line, compute the area of a rectangle and print the result in m². Reject invalid data; describe how to run the program in a README and make a local commit.
2. Create a module with a main function and a `__name__` check: get a radius from the command line and print the area of a circle. Demonstrate that importing the module does not run the calculation.
3. Create a program that shows the Python version, the operating system, sys.executable, and whether a virtual environment is active. Run it with the base Python and with the environment's Python; explain the difference in the results.
4. Create a script that accepts a name and a group name as two arguments and prints a greeting. Check the number of arguments, and demonstrate running it with a two-word name in the terminal and in a PyCharm run configuration.
5. Create a venv project with the humanize package. Get a positive integer number of seconds as an argument and print it as a human-readable duration. Save requirements.txt and reproduce the run in a clean environment.
6. Create a uv project with rich. For three positive lengths in meters from the arguments, print a table of the lengths in meters and centimeters. Save pyproject.toml and uv.lock and check `uv sync --locked`.
7. Create a program that reads a YYYY-MM-DD date from an argument and shows the date seven days later. Describe how to run it in a README, exclude the environment and caches from Git, and make two meaningful commits.
8. Create a local Git repository for a Celsius-to-Fahrenheit conversion program. The input is a number from an argument, and the output is both temperatures; check the lower physical limit. Show git diff before and after git add and a history of two commits.
9. Create a script that computes the download time from a file size in MB and a speed in Mbit/s given as arguments. Add `--help` and a positivity check. Submit a local repository with a README and a reference result.
10. Create a venv project with rich that prints a table of the squares of the numbers 1, 2, and 3. Save the dependencies and instructions, clone the local repository into another directory, and reproduce the run without copying .venv.

## Topic 2. Types, operations, control flow

11. Create a Python console program. Enter a nonnegative number of seconds up to 1000000. Using divmod, print the full hours, minutes, and seconds in the HH:MM:SS format. Check 0, 59, 60, and 3661.
12. Create a Python console program. Enter an integer score of 0..100. Print "excellent" for 90..100, "good" for 75..89, "satisfactory" for 60..74, and "unsatisfactory" for 0..59. Reject an invalid score.
13. Create a Python console program. Create a match menu with the commands square, cube, and exit. For the first two, enter an integer from -100 to 100 and print its square or cube; for any other command, report it and repeat the menu.
14. Create a Python console program. Enter N=1..100 and N integers from -1000 to 1000. Without storing the series, print the sum, the minimum, the maximum, and the number of negative numbers.
15. Create a Python console program. Enter a positive integer up to 1000000. Using while, //, and %, compute the sum of its digits and the number of zero digits. Print both results.
16. Create a Python console program. Enter two positive integers up to 1000000. Implement the Euclidean algorithm and print the GCD, the LCM, and the number of iterations.
17. Create a Python console program. Enter n=2..100000. Using for and else, determine whether it is prime; when a divisor is found, print it and end the search with break.
18. Create a Python console program. Read integers from -100 to 100 until zero. Skip negative numbers with continue, and accumulate the sum and count of positive ones. Print the mean or report that there are no positive numbers.
19. Create a Python console program. Enter n=1..12. Using nested loops, print a 1..n multiplication table with aligned fields; print the number of products printed.
20. Create a Python console program. Enter a price in integer kopiykas 1..100000 and a quantity 1..100. For a total of 100000 kopiykas or more, apply a 5 percent discount; round the discount to a whole kopiyka using the HALF\_UP rule. Print the initial total, the discount, and the result in hryvnias with two decimal places.

## Topic 3. Functions

21. Create a console program that reads a distance in meters and a unit m, cm, or km; a function with a keyword-only parameter unit and a default value of km performs the conversion, rejects an unknown unit, and the program prints the result. Use type annotations and validate the input.
22. Create a console program that reads from 1 to 10 grades of 0..100; a function with `*args` returns a pair of the minimum and the mean, and a keyword-only parameter precision determines the rounding; print both results. Use type annotations and validate the input.
23. Create a console program that reads the names and amounts of three products; it passes a dictionary via \*\* to a report function, which returns the total, and prints a table and the total. Use type annotations and validate the input.
24. Create a console program that reads the initial values of two counters and a sequence of their numbers, 1 or 2; a factory creates a closure with nonlocal, and the new value of the corresponding counter is printed after each call. Use type annotations and validate the input.
25. Create a console program that reads n from 0 to 20; an annotated recursive function computes the factorial with the base case n=0, and the program prints the result and compares it with an iterative calculation. Use type annotations and validate the input.
26. Create a console program that reads two integers from 0 to 1000000; a recursive Euclidean function computes the GCD, taking the result for the pair 0, 0 to be 0; print the result. Use type annotations and validate the input.
27. Create a console program that reads a string of 1..12 digits; recursive functions compute the sum of the digits and whether the original string is a palindrome, preserving leading zeros; print both results. Use type annotations and validate the input.
28. Create a console program that reads up to 20 integers in nondecreasing order and a target; a recursive binary search function returns the index or None, and the program prints a clear message and the number of calls. Use type annotations and validate the input.
29. Create a console program that reads up to 6 distinct Latin letters; a recursive function returns their permutations, and the program prints each of them and the total count and checks it against the factorial of the length. Use type annotations and validate the input.
30. Create a console program that reads an integer and a choice of square or double; it passes the corresponding function to an apply\_twice function with a Callable annotation and prints the result of applying it twice; each function has annotations and a docstring. Use type annotations and validate the input.

## Topic 4. Exceptions and debugging

31. Create a console program that repeatedly reads an integer quantity of 1..30 until the input is valid; handle an invalid format and range through ValueError, and print the successful number. Annotate the functions and test abc, 0, and 30.
32. Create a program that divides two numbers entered from the keyboard. Reject infinite values, handle ValueError and ZeroDivisionError separately, print the result in else, and print a message about the end of the attempt in finally.
33. Create a function that writes off an integer quantity of goods. Read the stock and the request from the keyboard; reject a nonpositive request and represent a shortage as StockError. Print the new stock or a refusal, and prove that the stock is unchanged on refusal.
34. Write a function that reads a calendar date in DD.MM.YYYY format using datetime.strptime. Convert ValueError into a custom DateInputError with the raise from statement; print the ISO date or the type of its original cause.
35. Create a console program that reads a name and an age from the keyboard and validates them: the name is nonempty, and the age is an integer of 16..100. Collect independent errors into an `ExceptionGroup`, add field names via `add_note`, and print all messages with an `except* ValueError` handler; for valid data, print the accepted form.
36. Create a program that converts three strings entered from the keyboard into numbers. Configure logging to a UTF-8 file: INFO for success and logger.exception for ValueError; print the number of successful conversions on the screen.
37. Create a function for the average of a list of grades in which the wrong formula `sum(scores)/(len(scores)-1)` is deliberately written. For the list `[60, 70, 80, 90]`, show the sum and the count in the debugger, fix the function, and print 75.0; explicitly reject an empty list, and for a single element, return its value.
38. Create a console program that reads a nonnegative integer from the keyboard and prints its square. Validate the input with `if` and `raise ValueError`, and check that the result is nonnegative with `assert`. Show that the input -1 is rejected both with the `-O` option and without it.
39. Create a program that, for the values `"12"`, `"abc"`, and None, calls int and catches ValueError, TypeError without parentheses in Python 3.14. Print the numbers or the rejections; then bind the exception object with as using the correct syntax and show its args.
40. Create a function that calculates a training bonus from a score of 0..100: 90..100 gives 2000, 75..89 gives 1500, and 0..74 gives 0. First write it with an initial `amount=0` and two independent checks: if `score>=90`, assign `amount=2000`; if `score>=75`, assign `amount=1500`, else `amount=0`; return `amount`. Use a conditional breakpoint to show the overwrite for 90, and fix the second check to `elif`. Print the results for 74, 75, 89, 90, and 100.

## Topic 5. Built-in collections

41. Create a console program that reads integers separated by spaces, selects the positive ones with a comprehension, and prints their squares, every second element, and the reverse order. Reject an invalid number; an empty list is allowed.
42. Create a console program that reads `name:score` lines until an empty line, checks for nonempty unique names and integer scores of 0–100, sorts by descending score and ascending name, and prints a numbered ranking.
43. Create a console program that reads at least two integers, forms a tuple, and unpacks the first, the last, and the rest with a star; it prints these parts and the minimum and maximum returned by a function. Test an invalid entry and an insufficient number of values.
44. Create a console program that reads two comma-separated lists of tags, strips spaces and case, and rejects empty tags inside a list. It prints the intersection, the union, both differences, and the symmetric difference in alphabetical order; an empty line means an empty set.
45. Create a console program that reads words separated by spaces, counts them case-insensitively with `Counter`, and prints a frequency table sorted by descending count and then by word, the total number of words, and the number of distinct words. For empty input, both totals are zero.
46. Create a console program that reads `group:student` lines until an empty line, groups them with `defaultdict(list)`, and prints the groups and students in alphabetical order. Reject empty fields and a repeated pair, and show the totals by group and the total number of registrations.
47. Create a console queue program with the commands `add:name`, `serve`, `show`, and `exit` entered from the keyboard. Use `deque`, reject empty names and unknown commands, handle an empty queue safely, and print the number of people served and those remaining before exiting.
48. Create a console program that reads `student:subject:grade` lines until an empty line, builds a nested dictionary, and prints the students' average grades. Reject empty fields, a repeated pair, and a grade outside 0–100; also print the subjects with grades below 50.
49. Create a console program that reads a matrix as rows of integers separated by spaces, with rows separated by semicolons. Check that it is nonempty and rectangular, print the transposed matrix and the row and column sums, and check that both grand totals are equal.
50. Create a console program that reads a nonempty rectangular matrix of integers, creates a shallow copy and a deep copy, adds 10 to the first element of the shallow copy and 20 to the first element of the deep copy. Print the three matrices, check whether the nested row is shared using `is`, and explain why the original matrix changed only once.

## Topic 6. Strings and regular expressions

51. Create a console program that reads several SMS messages until an empty line and extracts `+380` phone numbers with nine digits and amounts of the form `12,50 UAH`; it prints the number of phone numbers and the total in kopiykas, ignoring entries with a negative amount.
52. Create a console program that reads start and end timestamps in `HH:MM:SS,mmm` format and an integer offset in milliseconds; it checks the ranges, the order, and that the result is nonnegative, and prints the shifted pair.
53. Create a console program that reads a Ukrainian text and a nonempty key of Ukrainian letters; it encrypts the text with the Vigenère cipher over the 33-letter alphabet, advancing the key only on letters, and prints the ciphertext and the result of the reverse transformation.
54. Create a console program that reads a name and a course title, creates a t-string for a trusted HTML paragraph, escapes only the text substitutions with `html.escape`, and prints the result; it rejects conversion and format\_spec.
55. Create a console program that reads `name;quantity;price_kop` records until an empty line and rejects negative values and names longer than 20 characters; it prints a table of items and the grand total without using float calculations.
56. Create a console program that reads words until an empty line, normalizes them to NFC and case, rejects nonalphabetic characters, groups anagrams by their sorted letters, and prints only the groups with at least two different words.
57. Create a console program that reads a text, finds dates in the `DD.MM.YYYY` and `YYYY-MM-DD` formats, validates them against the calendar, and prints only the valid dates in a common ISO format with their positions.
58. Create a console program that reads a name and an integer score of 0–100; it processes a trusted query t-string, returning SQL with `?` placeholders and a list of values; it forbids conversion and format\_spec and prints both structures without joining the values into the SQL.
59. Create a console program that reads lines until an empty one, allows ASCII keys `[A-Za-z_][A-Za-z0-9_]*`, ignores comments starting with `;`, rejects duplicates, and prints a dictionary of keys and values.
60. Create a console program that reads a formula without parentheses made of the elements H, O, C, N, Na, and Cl; a subscript is a positive integer, and a missing one means 1; it checks that the whole formula is parsed, sums repeated elements, and prints the composition.

## Topic 7. Generators and decorators

61. Create a Python 3.14 console program. Enter n from 0 to 100; use a generator function to yield the squares of the numbers 0..n-1, and print the sequence and the sum, creating a new generator for the second pass. Annotate the functions and methods; test the normal and boundary cases.
62. Create a Python 3.14 console program. Enter a start, a step, and a count of 1..30; limit an infinite arithmetic sequence generator with islice, and print the values and the last element. Annotate the functions and methods; test the normal and boundary cases.
63. Create a Python 3.14 console program. Enter up to 20 integers; use a generator expression to filter the positive ones and compute the sum of their squares; for an empty result, print zero. Annotate the functions and methods; test the normal and boundary cases.
64. Create a Python 3.14 console program. Enter up to 20 group:grade pairs with grades of 0..100; after sorting by group, use groupby to compute the mean and the count, and print a table. Annotate the functions and methods; test the normal and boundary cases.
65. Create a Python 3.14 console program. Enter from 2 to 8 distinct team names; use combinations to form the tournament pairs, print them, and check the number of games with the formula n\*(n-1)/2. Annotate the functions and methods; test the normal and boundary cases.
66. Create a Python 3.14 console program. Enter up to 20 name:score pairs; use sorted with a lambda to order them by descending score and ascending name, and print the ranking and the sum computed via reduce with an initial zero. Annotate the functions and methods; test the normal and boundary cases.
67. Create a Python 3.14 console program. Enter up to 10 finite numbers and a precision of 0..4; use partial to fix the ndigits parameter of the round function, apply the transformation with map, and print the original and rounded values. Annotate the functions and methods; test the normal and boundary cases.
68. Create a Python 3.14 console program. Enter up to 10 integers; write a decorator without parameters that preserves the name of a squaring function via wraps and counts the calls; print the squares, the name, and the counter. Annotate the functions and methods; test the normal and boundary cases.
69. Create a Python 3.14 console program. Enter a number of attempts of 1..5; write a retry decorator factory only for TimeoutError and a local function that fails on exactly the first two calls; print the result or the exhaustion of attempts, and check that ValueError propagates. Annotate the functions and methods; test the normal and boundary cases.
70. Create a Python 3.14 console program. Enter up to 20 integers of 0..20; apply lru\_cache(maxsize=4) to a pure factorial function, print the results and hits/misses, then clear the cache and check that currsize=0. Annotate the functions and methods; test the normal and boundary cases.

## Topic 8. Classes and objects

71. Create a Python 3.14 console program. Enter a name and two grades of 0..100; a Student class with an initializer and an add\_grade method stores a separate list, and an average property returns the mean or None; print the result. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.
72. Create a Python 3.14 console program. Enter a temperature from -273.15 to 1000; a Thermometer class has a property with a setter and a finiteness check; attempt an invalid change and show that the state is unchanged. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.
73. Create a Python 3.14 console program. Enter two positive sides; a Rectangle class has a read-only area property; print the area and check that assigning to area is rejected. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.
74. Create a Python 3.14 console program. Enter an HH:MM string; the classmethod TimeOfDay.from\_string checks the strict format and the limits and creates an object, and \_\_str\_\_ returns HH:MM; print the result or an error. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.
75. Create a Python 3.14 console program. Enter two points; the staticmethod Point.distance computes the Euclidean distance, and the constructor checks that the coordinates are finite; print the distance. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.
76. Create a Python 3.14 console program. Enter from 1 to 5 nonempty names; a Visitor class counts successful creations with a class attribute and rejects an empty name; print the objects and the number of creations. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.
77. Create a Python 3.14 console program. Enter a training PIN of four digits; a Card class with \_\_pin returns the result of checking an entered candidate without printing the PIN, and \_\_repr\_\_ shows only the owner; explain name mangling. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.
78. Create a Python 3.14 console program. Enter an order name and up to 10 items in the form name:price:quantity; Order creates its own Line objects with nonnegative integer prices and positive quantities, and a computed property returns the total; print a table. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.
79. Create a Python 3.14 console program. Enter up to 10 books with different codes; a Catalog aggregates Book objects, finds them by code, and returns a list sorted by title; print the result and prove that a book continues to exist independently after removal. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.
80. Create a Python 3.14 console program. Enter a product name and price; Product implements \_\_str\_\_ for the user and \_\_repr\_\_ for diagnostics and rejects an empty name and a negative price; print both representations of two independent objects. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.

## Topic 9. Inheritance and protocols

81. Create a Python 3.14 console program. Enter a name and the data of an hourly and a salaried employee; create a base Employee class and two derived classes with super().\_\_init\_\_, override pay, and print the pay in a polymorphic loop. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.
82. Create a Python 3.14 console program. Enter the radii and sides of shapes; Circle and Rectangle implement an ABC Shape with an abstract area and a ready-made describe; print the areas, and reject nonpositive and infinite dimensions. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.
83. Create a Python 3.14 console program. Enter a heading; an ABC Report has an abstract title property and a body method, and a concrete TextReport implements them; print the report and prove that an incomplete class cannot be instantiated. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.
84. Create a Python 3.14 console program. Enter two amounts; two unrelated classes implement the Protocol Payable.pay for a local simulation; a shared function returns confirmations, which are printed without any external operations. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.
85. Create a Python 3.14 console program. Enter up to 10 cube or sphere objects with dimensions of 0.1..100; an ABC Solid defines volume; sort them polymorphically by volume, and print a table and the total. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.
86. Create a Python 3.14 console program. Enter up to 10 name:score pairs; a Record class with a JSON representation mixin serializes the data; print the JSON and the MRO, and check that there are no duplicate initializations. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.
87. Create a Python 3.14 console program. Enter the heading and items of a document; an ABC Document implements a template render method, and the subclasses Letter and Checklist define body; print both documents without checking their types in the loop. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.
88. Create a Python 3.14 console program. Enter a text and a style, upper or plain; a Logger receives an independent Formatter through a Protocol and a buffering Writer, and delegates formatting and writing to them; print the buffer, and replace the formatter without creating a new Logger subclass. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.
89. Create a Python 3.14 console program. Create a diamond A, B(A), C(A), D(B,C) with a cooperative trace method; enter a starting string, print the MRO and the sequence of classes visited, and prove that A is called only once. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.
90. Create a Python 3.14 console program. Enter a number and choose an implementation of the Protocol Converter; two independent implementations double or square the number, and a shared client prints the result. Use a separate invalid object to show that runtime\_checkable does not check signatures. Annotate the functions and methods; test the normal and boundary cases. Submit a UML class diagram.

## Topic 10. Special methods, dataclass

91. Create a console program with a `Point` class that reads two coordinates and has annotated special methods `__repr__`, `__str__`, and `__format__`. Print all three representations of the point; for the `.2f` format, show two digits after the decimal point.
92. Create a console program that reads two nonnegative integer durations in seconds and stores them in an immutable class with equality, ordering via `total_ordering`, and a compatible hash. Print the result of the comparison and the number of distinct values in a set.
93. Create a Vector for a pair of numbers with addition and reflected addition of zero. Print sum for the vectors (1, 2) and (3, 4), check that the operands are unchanged, and check for TypeError when adding a string.
94. Create a console program with a `Playlist` container that reads three track titles and supports length, indexing, slicing, and iteration. Print the last title, the first two, and the result of two independent traversals.
95. Create a console program with a callable class `Linear` (the `__call__` method) that reads the coefficients a and b and a number x and prints `a*x+b`; test the case of a zero coefficient.
96. Create a program with a `Timer` context manager based on `perf_counter`. Measure `sum(range(1000))`, print the result and whether the time is nonnegative; prove that a `ValueError` from the body of the `with` block is not suppressed.
97. Create a Product dataclass with a nonempty name and a nonnegative integer price in kopiykas. Read the data, validate it in `__post_init__`, and print the product or the ValueError.
98. Create a frozen Event dataclass with order=True and the fields day 1..7, time 0..1439, and name. Read three events and print them by day and time; order identical keys by name.
99. Create a Flag of the permissions READ, WRITE, and EXECUTE. Read two sets of R, W, and X, print their union and intersection, and check for the WRITE permission; reject unknown characters.
100. Create the dataclasses Circle(radius) and Rectangle(width,height). Read the type and positive dimensions, compute the area with match, and print it; use keyword attribute patterns.

## Topic 11. Modules, files, pytest

101. Create a geometry package with core.py and `__main__.py`: a rectangle area function and argparse for two positive sides. Run it with python -m geometry, and print the area and the `--help` text.
102. Create a console command that accepts a path and a `--suffix` option. Using pathlib, print the sorted relative paths and the sizes in bytes of the matching regular files; skip symbolic links.
103. Create a console program that receives the paths of input and output UTF-8 files, reads the input file line by line, and writes only nonempty lines to the output file. Forbid identical paths, report a missing input, and verify it with a test using `tmp_path`.
104. Create a module with a `Product(name, cents)` dataclass and functions for saving a list of products to a JSON file and restoring it. The price must be a nonnegative `int` (not `bool`), and the name must be nonempty; check the exact keys. For two products, print the total and write a `round-trip` test.
105. Create a console program that reads a CSV file with the columns `name;score` using `DictReader` and checks the header, the number of fields, and scores of 0..100. Print the average score or a refusal for an empty file; write a normalized CSV with `DictWriter`.
106. Write a function that squares a nonnegative number and parameterized pytest tests for 0, 1, and 5 with the expected values 0, 1, and 25. For -1, expect ValueError using raises.
107. Create a JSON contact storage module with save and load functions and a test using `tmp_path`: save the name Olena and the phone 0123, read them back, and check equality and that the leading zero is preserved.
108. Create a `greet` function that reads a name with `input` and prints "Hello, name!". Write a test with `monkeypatch` for the input Olena and `capsys` to check the exact output, including the newline.
109. Create a pytest fixture that returns a new list of grades [70,80,90]. Write independent tests for the mean of 80 and for adding a grade; prove that changes made by one test do not carry over to the other.
110. Create a converter from CSV name;quantity to JSON. An invalid negative quantity must raise ValueError before writing. Use a `tmp_path` test to prove that an output file with old text remains unchanged.

## Topic 12. Databases, SQL, SQLAlchemy

111. Create the SQLite tables `authors(id,name)` and `books(id,title,author_id)` with PK, FK, and NOT NULL. Through a menu, add an author and a book, and print a JOIN; check the rejection for a missing author.
112. Create contacts(id,name,phone UNIQUE), and run parameterized INSERT, UPDATE by id, and DELETE by id with data from the keyboard. Print the remaining rows and check that a quote in a name does not change the SQL.
113. Create an sqlite3 console program with the table `products(id,name,cents)` and three sample products. The program reads a minimum price in kopiykas and prints the products that cost no less than it, using `WHERE` and `ORDER BY cents, id`; reject an invalid amount.
114. Create sales(id,category,cents) and add the records A:100, A:200, and B:50. Using GROUP BY and HAVING, print the categories with a total of 100 or more; A:300 is expected.
115. Create students and grades with an FK. Add a student with grades of 80 and 100 and a student without grades. Using LEFT JOIN, print the count and the mean; show the absence of a mean explicitly.
116. Create an sqlite3 program with an `orders(id,cents)` table containing the row (1,1000) and a function that imports a batch of rows in a single transaction. Importing the batch (2,2000), (1,3000) must be rolled back completely because of the PK violation; print only the initial row and verify this with a pytest test.
117. Create an SQLAlchemy program with an ORM model `Product` using `DeclarativeBase`, `Mapped`, and `mapped_column`: id PK, name UNIQUE, and cents CHECK ≥ 0. Add two products in `Session.begin`, run a `select` by price, and print the names.
118. Create an SQLAlchemy program with the ORM models `Author` and `Book` linked through `ForeignKey` and `relationship`/`back_populates`. Add an author with two books, load them with `selectinload`, and print the titles; show the generated queries.
119. Create an ORM product repository that accepts a Session and does not commit on its own. Use a pytest test to prove the rollback of two additions with the same unique code.
120. Create a console program with the tables `students`, `courses`, and `enrollments` (a composite PK and a `grade` field of 0..100) using sqlite3 or SQLAlchemy. Add one record per course, reject a duplicate "student, course" pair, and print the student, the course, and the grade.

## Topic 13. NumPy, pandas, Matplotlib

121. Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `room,date,value; ISO date, value in °C from -40 to 60`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints mean temperatures by room. For an empty valid dataset, print a message instead of a misleading summary.
122. Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `station,date,value; ISO date, precipitation 0–500 mm`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints totals and numbers of dry days by station. For an empty valid dataset, print a message instead of a misleading summary.
123. Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `category,date,qty,price; ISO date, qty integer 1–1000, price integer 0–100000 kopiykas`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints revenue by category without floating-point money arithmetic. For an empty valid dataset, print a message instead of a misleading summary.
124. Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `group,date,present,total; ISO date, integers 0≤present≤total≤100, total>0`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints sum(present)/sum(total) shares by group. For an empty valid dataset, print a message instead of a misleading summary.
125. Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `item,date,value; ISO date, integer stock levels 0–100000`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints the latest stock level of each item by date, not the sum of stock levels. For an empty valid dataset, print a message instead of a misleading summary.
126. Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `meter,date,value; ISO date, cumulative readings 0–1000000 liters`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints differences between adjacent ordered readings, rejecting decreases. For an empty valid dataset, print a message instead of a misleading summary.
127. Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `line,date,defects,total; ISO date, integers 0≤defects≤total≤100000, total>0`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints weighted defect rates by production line. For an empty valid dataset, print a message instead of a misleading summary.
128. Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `device,time,value; ISO time YYYY-MM-DD HH:MM, charge 0–100 percent`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints level differences in chronological order by device. For an empty valid dataset, print a message instead of a misleading summary.
129. Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `region,sent,delivered; both dates ISO, delivered not earlier than sent, duration up to 60 days`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints the median duration and the number of deliveries by region. For an empty valid dataset, print a message instead of a misleading summary.
130. Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `series,repeat,value; repeat positive integer, value finite within ±1000000, key series,repeat unique`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints means, std with ddof=0, and numbers of repeats by series. For an empty valid dataset, print a message instead of a misleading summary.

## Topic 14. GUI applications with PySide6

131. Create a QFormLayout window with a price in kopiykas, a quantity of 1–100, and a QLabel with the total. Update the total after each field changes, and check a zero price and the upper limit of the quantity.
132. Create a meters-to-centimeters converter form with a QLineEdit, a QDoubleValidator, and a button. Make the validator's locale consistent with the conversion; for intermediate input, show an explanation without calculating.
133. Create two QDoubleSpinBox widgets for Celsius and Fahrenheit, and link them with two-way recalculation without recursion using QSignalBlocker. Check 0 °C and 212 °F.
134. Create a custom QWidget with a Signal(int) and buttons for incrementing and resetting a counter. A label and the window title must be updated by two listeners of the same signal.
135. Create a QMainWindow with a central QPlainTextEdit and a menu and toolbar that use the same clear QAction. Before clearing nonempty text, ask for confirmation; show the number of characters in the status bar.
136. Create a countdown timer of 1–60 seconds with a QTimer, start, and cancel. Compute the remaining time from monotonic time; after it finishes, stop the timer and show 0.
137. Create a to-do list with a QLineEdit and a QListWidget. Add items with the Enter key or a button, do not accept whitespace-only text, remove the selected item, and disable removal when nothing is selected.
138. In Designer, create a form with a field and a button, save the .ui file, generate a module with pyside6-uic, and connect your own slot in a separate class. The button shows the entered nonempty text in a QLabel; do not edit the generated file.
139. Create a form with a name, an age of 16–100, and a consent checkbox. Submitting is possible only when the form is complete; the slot rechecks the conditions and emits a Signal(str,int).
140. Create a form with a numeric field and a validation label. Mark invalid input with a QSS border and explanatory text; after it is corrected, remove the error. Check an increased scale and Tab navigation.

## Topic 15. Model/View and databases

141. Create a QAbstractTableModel over a list of dataclass objects with a name and an integer quantity. Implement rowCount, columnCount, data, and headerData, and show a QTableView; unsupported roles return None, and a valid parent has no children.
142. Create a table model of grades 0–100 with DisplayRole, EditRole, ToolTipRole, and a color for low scores. Implement flags/setData; an invalid value returns False without changing the data, and a successful one emits dataChanged.
143. Create a window with a custom contacts table that supports adding and removing rows. Use beginInsertRows/endInsertRows and beginRemoveRows/endRemoveRows, and check an empty name and a missing selection.
144. Create a product table with a QSortFilterProxyModel, literal name search, and sorting by price. Removing the selected record must apply mapToSource; check it after the order changes.
145. Create a QDialog with a name and a positive price in kopiykas, a QDialogButtonBox, and validation before accept. After Accepted, add the record to the model; Cancel does not change it.
146. Create a GUI import of a name,amount CSV file via QFileDialog. Validate the entire file before adding rows, and reject empty names and negative amounts; Cancel and an invalid file leave the model unchanged.
147. Create a QSqlTableModel over a sample SQLite table with OnManualSubmit and save and cancel buttons. Check submitAll, use a transaction, and show lastError on failure.
148. Create a QStyledItemDelegate with a QComboBox of three statuses for a task table. Implement createEditor, setEditorData, and setModelData; the model must also reject an unknown status.
149. Create a master-detail view: a list of categories and a table of products in the selected category. Use a stable id, show empty details when nothing is selected, and preserve the correct link after sorting.
150. Create a table with export of all rows to CSV via QFileDialog and saving the geometry with QSettings. Handle Cancel and OSError, use UTF-8 and an explicit header; check that the window is restored on the next launch.

## Topic 16. Packaging and typing

151. Create an src package for a meters-to-centimeters converter for finite numbers of 0–1000. Add pyproject.toml, a README, and a console entry point; the command accepts a number and prints the result with two decimal places, and invalid input gives exit code 2.
152. Create a package with a function for the mean of a nonempty list of floats, and build a wheel and an sdist. Install the wheel into a clean environment outside the sources and prove the path of the imported module; check [2,4,6] and an empty list.
153. Create a module with a generic function `first[T]` that returns the first element of a `Sequence[T]` and a `Stack[T]` class with the methods `push`/`pop`. Empty input raises `ValueError` or `IndexError`, respectively. Check that it works with `int` and `str` using pytest, and reject an invalid argument type in a separate mypy run.
154. Create a module with a generic cache `Cache[K: Hashable, V]` with the methods `put`/`get` and a capacity of 1–10; adding a new key to a full cache raises `ValueError`, and a missing key raises `KeyError`. Check the key and value types with mypy and the behavior with pytest.
155. Create a console program that reads a configuration from a JSON file whose path is passed as an argument and describes it with a `TypedDict`: `mode` (`short` or `full`) and `limit` (1–100). Check the actual types and unknown keys, and print the accepted configuration; an invalid file gives exit code 2.
156. Create a module with a function add(int, int) and a deliberate call `add(1, "2")`. Demonstrate the nonzero mypy result, fix the call without Any or ignore, and repeat the strict check and the test add(1,2)==3.
157. Create a small src geometry package with pytest. Configure Ruff for Python 3.14 with the F/I/B/UP rules and a line width of 70; demonstrate check and `format --check` after fixing an unused import, and review the diff.
158. Create a PySide6 window with a label from a JSON resource located next to the module. Build a PyInstaller onedir bundle with `--add-data`, run it from a different working directory, and show the correct label; describe the behavior when the resource is missing.
159. Create a module with a `logged[**P, T]` decorator that prints the function name and returns its result without changing the signature. Check the decorated function with a positional and a keyword argument, and reject an invalid call with mypy.
160. Create a package with a typed rectangle area function that rejects nonpositive and infinite sides. Add pytest, mypy, Ruff, and a YAML CI workflow without publishing; run the same commands locally and build a wheel.
