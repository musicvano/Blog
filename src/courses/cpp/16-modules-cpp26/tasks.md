---
title: Tasks
description: "Topic 16. Modules and C++26: task variants"
outline: [2, 3]
sourceHash: "83bb54f09362e082e9d614e2f2b43f4371b7fe961fe8f8d74bf983b645faebc1"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

In a library, do not add console input to domain logic functions: the client reads the data and passes it through the interface. The base toolset is MSVC in Visual Studio 2026. Using unsupported C++26 features is not required; the variant with a feature report must correctly report their absence. A static library is sufficient where no other kind of organization is specified. The hypothetical numeric rates in the tasks are data of a training model, not actual financial terms.

## Variants

### Variant 1. A bank account {#v1}

**1. Initial level.** Create a console program. Read an initial balance in kopiykas and a deposit amount from the keyboard; both numbers are non-negative. Move the account class to bank.h/bank.cpp and print the new balance.

**2. Basic level.** Create a console program. Read deposit and withdraw commands with an amount in kopiykas until end. Export an Account class from the bank module, reject withdrawals exceeding the balance, and print the balance after each command.

**3. Advanced level.** Create a console program for managing several accounts with the commands open, transfer, and report. Read identifiers and amounts from the keyboard; the bank.domain and bank.report modules must separate the transfer rules from the output. Print the balances, check that a rejected transfer leaves no partial transfer, and prepare a separate test target.

### Variant 2. A statistics library {#v2}

**1. Initial level.** Create a console program. Read a count from 1 to 100 and a sequence of real numbers. Move the computation of the mean to stats.h/stats.cpp and print the count and the mean.

**2. Basic level.** Create a console program. Read a set of numbers from the keyboard until the end of input. The stats static library must return the count, minimum, maximum, and mean; the console client prints a report or reports an empty set.

**3. Advanced level.** Create a statistics static library, a console client, and a test program. The client gets the path to a text file from an argument or --help; the file contains one number per line. Print the minimum, maximum, mean, and median; check an empty file, a single element, and duplicates. Send file errors to std::cerr with exit code 1.

### Variant 3. The Game of Life {#v3}

**1. Initial level.** Create a console program. Set a 5×5 grid of zeros and ones in the code. In life.h/life.cpp, implement counting live neighbors without wrapping the edges; print a table of counts.

**2. Basic level.** Create a console program. Read a grid of five lines of five characters 0 or 1 each. The life module must perform one step of the rules: a live cell survives with 2–3 neighbors, and a dead cell is born with 3. Print the new grid without changing the data in the middle of counting.

**3. Advanced level.** Create the life.engine and life.output modules. The console program reads a rectangular grid from a file, gets the path and the number of steps 0–1000 from arguments, and supports --help. Print the grid after each step; do not wrap the edges. A separate test target checks a still-life block and a periodic “blinker” row.

### Variant 4. A matrix library {#v4}

**1. Initial level.** Create a console program. Read two 2×2 matrices of integers from −100 to 100. Move addition to matrix.h/matrix.cpp and print the resulting matrix.

**2. Basic level.** Create a console program. Read two 2×2 matrices, export a Matrix type and the addition and multiplication operations from the matrix module; print both results. Check the identity and zero matrices.

**3. Advanced level.** Create a matrix module with the types and operations partitions. Read sizes 1–20 and the values of two matrices from the keyboard; print the product or an explanation of the size mismatch. A separate tests target checks a rectangular product, the identity matrix, and an out-of-range index.

### Variant 5. Warehouse inventory {#v5}

**1. Initial level.** Create a console program. Read a product code, a quantity, and a price in kopiykas. Move the structure and the cost function to a separate header and implementation, and print the total cost.

**2. Basic level.** Create a console program. The stock module must store products by a unique code. Read the commands add, take, and report from the keyboard until end; print the stock levels, and reject a negative quantity and taking more than is in stock.

**3. Advanced level.** Create the stock.domain, stock.storage, and stock.report modules. Pass the file path as an argument; a line contains a code, a quantity, and a price separated by spaces. The program reads the inventory, accepts commands from the keyboard, and writes the state only after the data has been fully checked. Print the total cost; test duplicates, an invalid line, and that the file stays unchanged after a failure.

### Variant 6. An expression calculator {#v6}

**1. Initial level.** Create a console program. Read two real numbers and one sign: +, −, \*, or /. Move the implementation of the operation to calc.cpp and the declaration to calc.h. Print the result or report division by zero.

**2. Basic level.** Create the calc.parse and calc.eval modules. Read one line of the form number operator number, where the operator is +, -, \*, or /; reject extra characters and a zero divisor. Print the result or the position of the error.

**3. Advanced level.** Create the lexer, parser, and evaluator modules for integers, +, -, and parentheses. Read expressions from the keyboard until an empty line, and print the value or the position of a syntax error. Limit the absolute value of a number to 1000 and the line length to 100; a separate test target checks nested parentheses, spaces, and an unclosed parenthesis.

### Variant 7. A date library {#v7}

**1. Initial level.** Create a console program. Read a year 1900–2100. In a separate library function, determine whether it is a leap year by the Gregorian rule and print the answer.

**2. Basic level.** Create a calendar module with a Date type. Read a day, a month, and a year 1900–2100 from the keyboard; check that the date is valid and print the next date, including a transition to the next year.

**3. Advanced level.** Create a console program. Split the calendar module into the date and arithmetic partitions. Read pairs of dates 1900–2100 from a file whose path is given as an argument, and print the signed number of days between them. Add --help and separate tests for 1900, 2000, February 29, and the year boundaries; the diagnostics for an invalid line include its number.

### Variant 8. A text adventure {#v8}

**1. Initial level.** Create a console program. Set three rooms with names and exits in the code. Move the room model and the description to rooms.h/rooms.cpp, and print the list of transitions.

**2. Basic level.** Create the adventure.world and adventure.commands modules. A map of three rooms is set in the code; read north, south, look, and end from the keyboard. Print the current room, and reject a missing transition without changing the state.

**3. Advanced level.** Create modules for the world, the inventory, and saving. The program works with a fixed map of five rooms and reads the commands move, take, inventory, save, and load; the save file is given as an argument. Print the state after each command, and check the file data before restoring. The tests check an unavailable exit, taking an item twice, and a corrupted save.

### Variant 9. A school timetable {#v9}

**1. Initial level.** Create a console program. Read a day number 1–5 and the start and end of a class in minutes from the beginning of the day. A separate library checks the bounds and a positive duration; print the duration.

**2. Basic level.** Create a schedule module that takes two classes with a day, a room, and an interval in minutes from the keyboard. Print whether there is a conflict; the end touching the start does not count as a conflict.

**3. Advanced level.** Create a CMake project for a school timetable with the schedule.model and schedule.conflicts modules and a console program. Read classes from a file in the format day room start end (minutes from the beginning of the day); pass the path as an argument. Print all conflicting pairs (the same day and room, overlapping intervals) without duplicates; the tests cover touching bounds, different rooms, and fully nested intervals.

### Variant 10. A weather station {#v10}

**1. Initial level.** Create a console program. Read three temperatures. Move the mean and the range to weather.h/weather.cpp and print both results.

**2. Basic level.** Create a weather module for readings with a time in minutes and a temperature. Read 1–100 readings, reject non-numeric and infinite values and a duplicate time, and print the mean and the extremes.

**3. Advanced level.** Create the weather.input, weather.aggregate, and weather.report modules. The console client reads a file with time temperature pairs and the argument --window N, and prints moving averages for full windows. Prepare tests for N=1, N=the number of readings, and a window that is too large; the diagnostics for an invalid file must include the line number.

### Variant 11. Training encryption {#v11}

**1. Initial level.** Create a console program. Read a Latin string and a shift 0–25. Move the Caesar cipher to cipher.h/cipher.cpp and print the encrypted string; leave other characters unchanged.

**2. Basic level.** Create a cipher static library with encoding and decoding of Latin text with a shift 0–25. The console client reads the mode, the shift, and a string; it prints the result and checks that the original text is restored.

**3. Advanced level.** Create a cipher module and two console clients, encode and decode, with a shared implementation. Pass the input file path and the shift as arguments; print the result to stdout and support --help. The tests cover empty text, uppercase letters, and wrapping around Z. State in the README that this is a training algorithm unsuitable for protecting secrets; a DLL is not required.

### Variant 12. PPM images {#v12}

**1. Initial level.** Create a console program. Set a 2×2 image of integer RGB components 0–255 in the code. Move inversion 255−component to a separate library and print the new RGB triples.

**2. Basic level.** Create the image.model and image.filter modules. Read sizes 1–20 and RGB triples from the keyboard, check the count and the ranges, and print a grayscale image using the mean of the three components with integer division.

**3. Advanced level.** Create modules for reading PPM P3, inverting, and writing. Pass the names of the input and output files as arguments; support only a maximum of 255 and explicitly reject other formats. Print the dimensions and the number of pixels; separate tests check a single pixel, extra or missing components, and an invalid header.

### Variant 13. Graph algorithms {#v13}

**1. Initial level.** Create a console program. Set an undirected graph with five vertices in the code. Move counting degrees to graph.h/graph.cpp and print the degree of each vertex.

**2. Basic level.** Create a graph module with a graph type and breadth-first search. Read the number of vertices 1–100, the edges, and the start from the keyboard; print the distances in edges, and −1 for unreachable vertices.

**3. Advanced level.** Create a graph module with the model and search partitions. Read an undirected graph from a file and the start and end of a route from arguments; print the shortest path or a message that there is none. Reject invalid indices; test an isolated vertex, a cycle, and identical start and end.

### Variant 14. Command-line arguments {#v14}

**1. Initial level.** Create a console program. Read the command-line arguments --name value and --help. Move the parsing function to cli.h/cli.cpp; print a greeting or help, and reject unknown options.

**2. Basic level.** Create a cli module for the options --count N and --verbose, where N is from 1 to 100. The console client prints the parsed values; check a missing number, a duplicate option, and an extra argument.

**3. Advanced level.** Create a cli module reused by two console programs: text repetition and a numbered report. Both take --count N, --text value, and --help; they write the result to stdout and errors to stderr with exit code 2. A separate test target checks identical parsing semantics, duplicates, and empty text.

### Variant 15. A to-do list {#v15}

**1. Initial level.** Create a console program. Read a task title and a done flag 0 or 1. Move the Task type and formatting to a separate library and print one labeled entry.

**2. Basic level.** Create a tasklist module with the commands add, done, and list, read from the keyboard until end. Assign sequential identifiers, print the list, and reject an unknown number without changing the state.

**3. Advanced level.** Create the tasklist.model, tasklist.storage, and tasklist.cli modules. The state file is given as an argument; the commands add, done, list, and save come from the keyboard. Print the number of unfinished tasks, and check for duplicate identifiers when loading; separately test an empty list and saving titles with spaces.

### Variant 16. A card game {#v16}

**1. Initial level.** Create a console program. Set a deck with suits 0–3 and ranks 2–14 in the code. Move the creation function to deck.h/deck.cpp and print 52 different cards.

**2. Basic level.** Create the deck and scoring modules for a fixed game: five cards are set in the code, and the score equals the sum of the ranks. Check that there are no duplicate cards, and print the hand and the sum.

**3. Advanced level.** Create the deck, players, and rules modules for comparing two hands of five cards by the sum of ranks. Read the cards from the keyboard, declare a draw when they are equal, and reject duplicates between hands. Add a test target with win, draw, and invalid card cases, and a reproducible build.

### Variant 17. A movie theater {#v17}

**1. Initial level.** Create a console program. Set a 3×4 hall in the code and read a row number and a seat number. A separate library checks the bounds and returns the seat number in a linear array; print the number.

**2. Basic level.** Create a cinema module for a 3×4 hall. The commands book, cancel, and report from the keyboard book, cancel, and show seats; reject a repeated booking without changing the state.

**3. Advanced level.** Create the cinema.sessions, cinema.booking, and cinema.report modules. Sessions with unique codes are set in the code, and bookings are read as commands from the keyboard; print the free seats and the revenue at a price of 150 UAH. A separate test target checks that sessions are independent, returning a seat, and a full hall.

### Variant 18. A sensor simulation {#v18}

**1. Initial level.** Create a console program. Set ten sensor readings in the code. Move the function that counts values above a threshold to sensor.h/sensor.cpp; read the threshold from the keyboard and print the count.

**2. Basic level.** Create the sensor.generator and sensor.analysis modules. Get a count 1–100 and an integer generator seed from the keyboard; generate values 0–100 and print the sequence, the minimum, and the maximum.

**3. Advanced level.** Create a CMake project for a sensor simulation with a generator library, an analysis library, and a console client. The arguments --seed, --count, and --threshold specify reproducible readings 0–100; print the mean and the number of times the threshold is exceeded. The tests check the generation bounds and the analysis results for a fixed data set without assuming the same distribution sequence across different libraries.

### Variant 19. A quiz engine {#v19}

**1. Initial level.** Create a console program. Set three questions with correct answers in the code. Move the answer comparison function to quiz.h/quiz.cpp; read the answers from the keyboard and print the number of correct ones.

**2. Basic level.** Create a console program with the quiz.questions and quiz.scoring modules. The questions with correct answers are set in the code, and the user’s answers are read from the keyboard; award 2 points for a correct answer and 0 for an incorrect one; print the result of each question and the total.

**3. Advanced level.** Create modules for loading questions, a session, and a report. The file is given as an argument and contains pairs of question/answer lines; read the user’s answers from the keyboard. Print the points and the percentage of correct answers; test an odd number of lines, an empty file, and the exact rule of case-insensitivity for ASCII letters.

### Variant 20. Polynomials {#v20}

**1. Initial level.** Create a console program. Read three coefficients and x, and compute a·x²+b·x+c. Move the function to polynomial.h/polynomial.cpp and print the value.

**2. Basic level.** Create a polynomial module with a function template implementing Horner’s method for arithmetic types. Set the coefficients in the code for int and double, read x from the keyboard, and print two results.

**3. Advanced level.** Create a polynomial module with the model and evaluation partitions and a concept for an allowed numeric type. The console client reads 1–20 coefficients and x, and prints the value and the derivative at x. A separate test target checks a constant polynomial, zero coefficients, and a negative test with a non-numeric type.

### Variant 21. A logger {#v21}

**1. Initial level.** Create a console program. Read a message line. Move formatting of the INFO prefix to log.h/log.cpp and print the message with the prefix.

**2. Basic level.** Create a logging module with the levels info, warning, and error. Read a level and a message until end, reject an unknown level, and print a sequential number and the prefix.

**3. Advanced level.** Create a logging module and two console clients that use it without copying the implementation. One reads messages from the keyboard, and the other from a text file; both take --min-level and --help. Print only the allowed levels and sum up the number of discarded entries; check an empty file and an unknown level.

### Variant 22. Student records {#v22}

**1. Initial level.** Create a console program. Read a student’s name and three grades 0–100. Move the Student class to a .h/.cpp pair, print the average grade, and check an invalid grade.

**2. Basic level.** Create the students.model and students.report modules. Read 1–20 students with a code and an average grade from the keyboard; print a ranking by grade in descending order, and by code when grades are equal.

**3. Advanced level.** Create a student model library, an application, and tests in separate targets. Read a file code;name;grade whose path is given as an argument; print the ranking and the group average. Check that codes are unique, the grade range, and the line format; the tests cover equal grades, a name with spaces, and an empty group.

### Variant 23. A file indexer {#v23}

**1. Initial level.** Create a console program. Read a directory path. Move getting the names of regular files to files.h/files.cpp, print the names in sorted order, and explain access errors.

**2. Basic level.** Create the files.scan and files.report modules. Get a directory from an argument, collect regular files and their sizes without recursion, and print a table and the total size; --help describes the format.

**3. Advanced level.** Create modules for recursive traversal, filtering, and reporting. Pass the directory and the extension as arguments; do not traverse symbolic links. Print relative paths and sizes, and write access errors to stderr. A separate test target creates a temporary tree with an empty directory and checks the filter and the total.

### Variant 24. A mini test suite {#v24}

**1. Initial level.** Create a console program. Move a check(bool) function and a failure counter to a separate library. Set three true conditions and one false condition in the code, print the number of failures, and return exit code 1.

**2. Basic level.** Create a checks module with an equality check and a test name. The console program runs tests of addition and multiplication set in the code, prints the status of each and the total; a successful run returns 0.

**3. Advanced level.** Create a checks module and two independent test targets for libraries of math functions and strings. The tests are set in the code, --filter selects a group name, and --help prints help. Report all failures without stopping early; separately check an empty selection and a deliberately wrong expected result.

### Variant 25. An event scheduler {#v25}

**1. Initial level.** Create a console program. Read two event start minutes 0–1439. Move the comparison function to events.h/events.cpp and print which event is earlier or that the times are equal.

**2. Basic level.** Create an events module for events with a name, a start, and a duration in minutes. Read 1–20 events of one day, reject events that go beyond the day, and print them in chronological order.

**3. Advanced level.** Create the events.model, events.conflicts, and events.export modules. Read the data from the keyboard until end, and pass the output file as an argument; print the conflicting pairs and write the sorted schedule. The tests check touching intervals, an equal start, and an event that ends at 24:00.

### Variant 26. Units of length {#v26}

**1. Initial level.** Create a console program. Read a non-negative length in meters. Move the conversion to centimeters to units.h/units.cpp and print both values with labels.

**2. Basic level.** Create a units module with separate Meter and Kilometer types and explicit conversions. Read a value and the unit symbol m or km from the keyboard; print the result in two units.

**3. Advanced level.** Create a units module with the length and formatting partitions and a console client. The arguments specify a number, the source unit, and the target unit m, km, or cm; --help explains the syntax. Reject non-numeric and infinite values, and print the result with three decimal places; the tests check zero and the reverse conversion.

### Variant 27. A shopping cart {#v27}

**1. Initial level.** Create a console program. Read the quantity of a product and a price in kopiykas. Move the cost function to cart.h/cart.cpp, check that the values are non-negative, and print the total.

**2. Basic level.** Create a cart static library for items with a code, a quantity, and a price. Read the data from the keyboard until end; for a total of at least 100000 kopiykas, there is a 5 % discount rounded down to the kopiyka. Print the total, the discount, and the amount to pay.

**3. Advanced level.** Create a static library of cart rules, a console client, and tests. The client reads a file code quantity price whose path is given as an argument; it prints a receipt with a 5 % discount from 100000 kopiykas. Exclude a duplicate code with a different price; the tests check the discount threshold, an empty cart, overflow of the total, and that the state stays unchanged after a failure.

### Variant 28. A maze {#v28}

**1. Initial level.** Create a console program. Set a 5×5 map of the characters . and `#` in the code. Move the free-cell check to maze.h/maze.cpp, read coordinates, and print the result.

**2. Basic level.** Create the maze.model and maze.search modules. Read a 5×5 map, a start, and a finish from the keyboard; a breadth-first search must print the length of the shortest route or report that there is none.

**3. Advanced level.** Create modules for reading the map, searching, and output. Pass the path to a file with a rectangular map of . and `#` and the coordinates as arguments; print the map with the route, and do not change the walls. The tests check an unreachable finish, identical start and finish, an invalid character, and lines of unequal length.

### Variant 29. Checking C++26 features {#v29}

**1. Initial level.** Create an MSVC console program with a separate file for the report function, without input. Print \_MSC\_VER and \_MSVC\_LANG, and write the build command in the README.

**2. Basic level.** Create a capabilities module. Without input, print the values or the absence of the macros \_\_cpp\_pack\_indexing, \_\_cpp\_lib\_flat\_map, and \_\_cpp\_lib\_execution; check the library macros after &lt;version>. Explain in the report why the old execution macro does not prove support for senders.

**3. Advanced level.** Create a CMake project with a report program and separate probes for the availability of flat\_map, pack indexing, and inplace\_vector. Exclude unsupported syntax with preprocessor conditions or from the targets. Without input, print the version, the mode, and the probe results; the README contains the exact commands and limitations, and the tests must not require an unavailable feature.

### Variant 30. A family budget {#v30}

**1. Initial level.** Create a console program. Read income and an expense in kopiykas. Move the balance function to budget.h/budget.cpp, reject negative input values, and print the signed balance.

**2. Basic level.** Create the budget.model and budget.report modules. Read entries of the form category amount\_kopecks from the keyboard until end, where a positive amount is income and a negative one is an expense; print the category totals and the overall balance.

**3. Advanced level.** Create modules for transactions, CSV import, and reports. The file is given as an argument, and a line has the format category;amount\_kopecks without nested delimiters. Print income, expenses, and the balance by category; errors include the line number and exit code 1. A separate test target checks an empty file, a negative balance, and overflow of the total.

## Procedure

1. Write down the inputs, results, errors, and invariants of your task.
1. Draw a dependency diagram: a library or module, a console client,
  a test target. The dependencies must not form a cycle.
1. Implement the interface and check that it is self-sufficient; the implementation must
  include its own header or belong to the same named module.
1. Build the project from a clean directory, and record the versions of MSVC and the build system.
  Make sure there is no dependency on an old IFC or a stray library.
1. Check ordinary values, bounds, and at least one failure. Explain
  why the expected results are independent of the implementation code.
1. Save the source files, tests, and the README in Git; exclude the build
  results. In the report, include the commands, stdout, stderr, and exit codes.
1. During the defense, change one implementation without changing the client API,
  rebuild the project, and demonstrate that the automated checks pass.
