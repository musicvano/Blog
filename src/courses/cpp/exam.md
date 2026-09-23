---
title: "Review tasks"
description: "Object-Oriented Programming in C++: practical tasks by course topic"
sourceHash: "1e458b3ebb2650d0bbfacb0c9bcdb649de71c66a56f98c07ada90199d43e1d76"
---

# Review tasks

Practical tasks by course topic to check your knowledge. Each task is a separate console program.

## Topic 1. C++ and your first program

1. Write a console program that, without input, prints two fictional business cards with a name, group and major specified in the code. Use identical frames and check the alignment for names of different lengths.
2. Write a console program that displays a menu of three drinks with prices specified in the code and the cost of an order of one drink of each kind. Align the numeric column and show two decimal places; there is no input.
3. Write a console program that prints a schedule of three classes with their numbers, start and end times and rooms specified in the code. Format the headers and columns without keyboard input; save the code as the first Git commit.
4. Write a console program that, for a rectangular 3 m by 4 m room, computes the floor area and the cost of flooring at 350 UAH/m². Specify the data in the code and print the input values and the results with units, without input.
5. Write a receipt console program: 2 notebooks at 30 UAH and 3 pens at 15 UAH, with a 10 % discount on the whole purchase. Specify the values in the code; without input, print the items, the total before the discount, the discount and the amount due with two decimal places.
6. Write a console program that, for the grades 72, 85 and 94, prints a table of courses and the average grade with two decimal places. Specify the data in the code, without input; save the code and `.gitignore` in a local Git repository.
7. Write a console program that, for route segments of 3 km and 5 km and a speed of 4 km/h, computes the travel time for each segment and the total time in minutes. Specify the data in the code; print a table with units, without input.
8. Write an MSVC console program that, without input, prints the values of `__cplusplus`, `_MSVC_LANG` and `_MSC_VER`. Build it with `/Zc:__cplusplus`, record the standard mode used and explain the purpose of each macro.
9. Write a console program that, without input, prints a fictional ticket with a route, time and price from the code. Save the initial ticket and a change of the time as two Git commits; show the difference and ignore `.exe` and `.obj`.
10. Write a console program that, for a group of 20 students with 15 present, computes the number of absent students and the attendance percentage. Specify the data in the code; print labeled results without input, build the program with `/W4` and explain the difference between compiler messages and program output.

## Topic 2. Types, operators, control flow

11. Write a console program: read a year and a month and print the number of days, validating the numbers. Validate the input; explain invalid data with a message.
12. Write a console program: read a, b, c; also handle the linear, contradictory and identity cases; print the type of solution. Validate the input; explain invalid data with a message.
13. Write a console program: read a number up to 1000000000; print its reverse and whether it is a palindrome, handling 0 separately. Validate the input; explain invalid data with a message.
14. Write a console program: read the minutes 1–1440 and the day of the week 1–7; round the hours up, apply a rate of 20 on weekdays and 15 on weekends, and print the receipt. Validate the input; explain invalid data with a message.
15. Write a console program: read a unit code m, cm or km and a non-negative value; print the value in meters and reject an unknown code. Validate the input; explain invalid data with a message.
16. Write a console program: read a count 1–100 and the scores; print the letters A/B/C/D/E/F using the thresholds 90/82/74/64/60 and the average score. Validate the input; explain invalid data with a message.
17. Write a console program: read the weight `weight` in 0–30 kg, the integer zone `zone` in 1–3 and the urgency `urgent` as 0 or 1; compute `base = 50 + 10 * ceil(weight)` and `total = base * zone * (urgent == 1 ? 1.5 : 1.0)`. Print the number of started kilograms, the base price, both multipliers and the final price in UAH with two decimal places. For zero weight, the base price is 50 UAH. Validate the input; explain invalid data with a message.
18. Write a console program: read a numerator 0–1000000 and a denominator 1–1000000; print the reduced fraction. Validate the input; explain invalid data with a message.
19. Write a console program: read an amount; apply 0 % below 1000, 5 % from 1000 and 10 % from 5000, and print the discount and the payment. Validate the input; explain invalid data with a message.
20. Write a console program: read hours 0–23 and minutes 0–59; print the time in the 12-hour format with AM/PM. Validate the input; explain invalid data with a message.

## Topic 3. Functions

21. Write a console program: read the sides a, b, c; return a struct with the perimeter and the area computed by Heron’s formula; print the result. Use functions and check the preconditions.
22. Write a console program: read a double base and an exponent 0–30; implement recursive exponentiation by halving the exponent; print the result. Use functions and check the preconditions.
23. Write a console program: read the bounds 0–3 and a tolerance 1e-10..1e-3; find a root by bisection with a limit of 100 steps; print the result. Use functions and check the preconditions.
24. Write a console program: read an amount, a rate 0–100 and a number of years 0–50; use a default parameter of 12 compounding periods; print the result. Use functions and check the preconditions.
25. Write a console program: read n in 0–20 and k in 0..n; return the number of k-permutations and combinations from separate functions; print the result. Use functions and check the preconditions.
26. Write a console program: read a number 2–1000000; recursively print its prime factors with exponents; print the result. Use functions and check the preconditions.
27. Write a console program: read two durations with hours, minutes and seconds 0–1000; add and subtract them with functions; print the normalized result. Use functions and check the preconditions.
28. Write a console program: read an income 0–1000000; return a struct with a 10 % withholding, a 2 % levy and the net amount; print the result. Use functions and check the preconditions.
29. Write a console program: read three positive resistances in ohms; overload functions for two and three resistors and for a parallel connection; print the result. Use functions and check the preconditions.
30. Write a console program: read an initial length and an order 0–15; return a struct with the number of segments of the Koch curve, the segment length and the total length; print the result. Use functions and check the preconditions.

## Topic 4. Arrays, strings, vector

31. Write a console program: read N in 2–100000; print the number of primes and the largest gap between adjacent primes; print the result and report input errors.
32. Write a console program: read N, M in 1–30; fill an N×M matrix with consecutive numbers in a clockwise spiral; print the matrix and report input errors.
33. Write a console program: read an encoded string of up to 10000 characters in the format `A:3,B:2`: a letter A–Z, a colon and a positive decimal count, with runs separated by commas; decode it, rejecting an incomplete format and a result longer than 10000 characters, and print the restored string; print the result and report input errors.
34. Write a console program: read an ASCII string up to 100 characters long; check for uppercase letters, lowercase letters, a digit and a ! or ? character; print all violations; print the result and report input errors.
35. Write a console program: read up to 31 finite readings -100..100; compute a moving average with an odd window of 3 or 5 for full windows only; print the result and report input errors.
36. Write a console program: read up to 1000 integer scores 0–100; group them into the ranges 0–9, ..., 90–100 and print a histogram with one asterisk for each score in a group; report input errors.
37. Write a console program: read up to 100 records of an ASCII name and a number; sort the structs by name manually and perform a binary search; print the result and report input errors.
38. Write a console program: read the coefficients from the constant term up to degree N, where N is at most 20; build the vector of coefficients of the derivative; print the result and report input errors.
39. Write a console program: read up to 1000 amounts, with income positive and expenses negative; print the largest expense and the running balances; print the result and report input errors.
40. Write a console program: read up to 100 bus departure times hh:mm and the current time; convert the times to minutes, sort them and use binary search to find the nearest departure; print the result and report input errors.

## Topic 5. Pointers and memory

41. Write a console program that reads up to 20 integers into a `new[]` array and traverses it with pointers within the bounds of that single object. Print the sum and the index of the maximum; for empty input print empty, and finish with `delete[]`.
42. Write a console program that reads two integers and swaps them through a function taking pointers, which rejects nullptr before dereferencing. Print the result and separately check the failure for a null pointer.
43. Write a console program that reads a matrix of up to 10×10 into a contiguous `unique_ptr` array and prints the row sums. Check the coordinates and explain how `new[]` and `delete[]` must match.
44. Write a console program that reads numbers until EOF, builds a singly linked list of `unique_ptr` nodes, removes all negative nodes and prints the rest. Check an empty list and the removal of all nodes.
45. Write a console program in which two `shared_ptr` objects share ownership of a sample resource and a `weak_ptr` observes it. Reset the owners one by one and print the lock/expired results before and after the last reset.
46. Write a console program with a tree specified in the code: children are held via `shared_ptr` and the parent via `weak_ptr`. Print the path from a leaf to the root, clear the owners and use a destructor counter to prove that there is no ownership cycle.
47. Write a console program that reads a set of numbers, builds a binary search tree on `unique_ptr`, and prints the in-order traversal and the result of searching for an entered key. Don’t add duplicates; check an empty tree.
48. Write a console program that reads an ASCII string and creates an independent copy of it in a dynamic null-terminated char array. For non-empty input, change the first character of the copy, print both strings and free the buffers.
49. Write a console program with a safe scenario, specified in the code, of transferring a `unique_ptr` between two owners. Print the state of the source, the value of the destination and the number of destroyed objects; don’t dereference an empty source.
50. Write a console program that reads the capacity of a dynamic buffer and the number of elements, checks the bounds before writing and prints the result. Run the correct program with AddressSanitizer. Separately, in a throwaway copy, reproduce one out-of-bounds access, save the diagnostic and fix it; don’t include the faulty copy in the final solution.

## Topic 6. Debugging and errors

51. Write a console program that reads two finite numbers and the / sign; the division function throws `domain_error` for a zero divisor. Catch the exception by const reference, and print the result, or a message and exit code 1 for an error.
52. Write a console program that reads an index and a list of three numbers. Implement your own IndexError derived from `runtime_error` and include the stored index in its message; print the selected element or a diagnostic.
53. Write a console program with three nested functions and local objects whose destructors print messages; the innermost function throws an exception. Print the exact order of destruction and the catch, and explain stack unwinding.
54. Write a console program that reads a string containing an integer and returns an expected with a format or range error, consuming the whole string. Use transform to double only a safe value; print the result or the error code.
55. Write a console program that reads the string missing or a temperature number; optional marks absence and expected marks a parse error. Print one of the three states and demonstrate all the states with tests in the code.
56. Write a console program with sample accounts A=10000 and B=5000 kopiykas. Read the count and a list of positive transfer amounts from A to B. Execute the batch through a temporary copy; if funds are insufficient, refuse without partial changes. Print the initial and final balances.
57. Write a console program with a function that finds the maximum and test sets specified in the code, including an empty one. Handle the empty set with an ordinary check and verify correct results with assert; print the number of checks and explain NDEBUG.
58. Write a console program that reads an array length 1–10 and the values and safely computes the average. On the data set 2, 3, reproduce only the logical error of integer division, find it with the Watch window and print the corrected result.
59. Write a console program with a noexcept function that catches all of its own errors and returns a status. Read a finite number and print its square root, or the failure status for a negative number; don’t demonstrate terminate by running it in the regular test flow.
60. Write a console program that reads a string hh:mm; chain the expected checks of format and range with `and_then`, formatting with transform, and logging with `or_else`. Print the minutes since midnight or the reason for failure, and test 00:00, 23:59 and 24:00.

## Topic 7. Classes and objects

61. Write a console program for the concept “Student” that models a name and three scores 0–100; the average score, as well as adding a grade and rejecting out-of-range scores. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test a typical case and an edge case.
62. Write a console program for the concept “Rectangle” that models the coordinates of the lower-left corner and positive sides; the area, as well as moving and scaling by a positive factor. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test a typical case and an edge case.
63. Write a console program for the concept “Water meter” that models the previous and new non-negative readings; the consumption, as well as monotonic readings and a rate in kopiykas per unit. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test a typical case and an edge case.
64. Write a console program for the concept “Hotel room” that models the room number, capacity and nightly price; the cost of a stay, as well as booking half-open intervals of whole days without overlaps. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test a typical case and an edge case.
65. Write a console program for the concept “Employee” that models a name, a position and a salary in kopiykas; a profile card, as well as a bonus of 0–100 percent and the total sample payout. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test a typical case and an edge case.
66. Write a console program for the concept “Plane vector” that models finite x and y; the length, as well as the sum, scaling and projection onto a nonzero vector as methods. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test a typical case and an edge case.
67. Write a console program for the concept “Coffee machine” that models water and bean supplies; making a 100 ml, 10 g serving, as well as two recipes, refilling, and refusal without partial deduction. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test a typical case and an edge case.
68. Write a console program for the concept “Kitchen timer” that models an integer duration in seconds; the time remaining after a step, as well as the ready/running/done states and restarting. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test a typical case and an edge case.
69. Write a console program for the concept “Pizza” that models a small/large size and a base price; a description, as well as toppings with prices and no duplicate names. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test a typical case and an edge case.
70. Write a console program for the concept “Chess piece” that models a king/knight type and a square 0–7; the position, as well as checking a geometrically valid move with no other pieces on the board. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test a typical case and an edge case.

## Topic 8. Copy, move, RAII

71. Write a console program for the object “Dynamic array”: implement an array of integers of a given length, as well as modifying a copy without affecting the original. Enter the data from the keyboard; print the states of the original and the result. Check the empty case, the independence of resources or sole ownership, and the absence of double cleanup.
72. Write a console program for the object “Video frame”: implement a frame of a given width and height with pixel bytes, as well as independent editing of a copy of the frame. Enter the data from the keyboard; print the states of the original and the result. Check the empty case, the independence of resources or sole ownership, and the absence of double cleanup.
73. Write a console program for the object “Bit set”: implement an array of words for bits 0–255, as well as independent copies and setting a bit. Enter the data from the keyboard; print the states of the original and the result. Check the empty case, the independence of resources or sole ownership, and the absence of double cleanup.
74. Write a console program for the object “Network packet”: implement a move-only buffer of sample bytes, as well as transferring it between two owners without copying. Enter the data from the keyboard; print the states of the original and the result. Check the empty case, the independence of resources or sole ownership, and the absence of double cleanup.
75. Write a console program for the object “Bank transaction”: implement a guard for a single integer balance, as well as commit and rollback on error. Enter the data from the keyboard; print the states of the original and the result. Check the empty case, the independence of resources or sole ownership, and the absence of double cleanup.
76. Write a console program for the object “Spreadsheet”: implement a buffer of text cells of a rectangular sheet, as well as copying the sheet and editing a cell. Enter the data from the keyboard; print the states of the original and the result. Check the empty case, the independence of resources or sole ownership, and the absence of double cleanup.
77. Write a console program for the object “Connection pool”: implement an RAII token for a sample resource from the pool, as well as returning the token exactly once after a move. Enter the data from the keyboard; print the states of the original and the result. Check the empty case, the independence of resources or sole ownership, and the absence of double cleanup.
78. Write a console program for the object “Adjacency graph”: implement a square buffer of a 0/1 matrix, as well as independent cloning of the graph. Enter the data from the keyboard; print the states of the original and the result. Check the empty case, the independence of resources or sole ownership, and the absence of double cleanup.
79. Write a console program for the object “Small string”: implement a string with a fixed internal buffer of 15 characters, as well as switching to a dynamic buffer for longer text. Enter the data from the keyboard; print the states of the original and the result. Check the empty case, the independence of resources or sole ownership, and the absence of double cleanup.
80. Write a console program for the object “Music track”: implement a buffer of samples with a fixed sample rate, as well as copying and trimming a range into a new track. Enter the data from the keyboard; print the states of the original and the result. Check the empty case, the independence of resources or sole ownership, and the absence of double cleanup.

## Topic 9. Operator overloading

81. Write a console program for the type “Rational numbers”: implement a reduced numerator and denominator; + and &lt;&lt;, as well as comparison and rejecting a zero denominator. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Check boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.
82. Write a console program for the type “Date”: implement a valid date in 2000–2099; == and &lt;&lt;, as well as ++ and adding days with leap years. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Check boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.
83. Write a console program for the type “Length”: implement non-negative millimeters; + and &lt;=>, as well as multiplication by a count and input in meters. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Check boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.
84. Write a console program for the type “Modular arithmetic”: implement values modulo 17; + and \*, as well as subtraction, exponentiation and ==. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Check boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.
85. Write a console program for the type “Set of small numbers”: implement elements 0–31 in a bit mask; | and &, as well as difference, symmetric difference and membership. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Check boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.
86. Write a console program for the type “Matrix”: implement dimensions and double elements; a checked [], as well as multiplication of compatible matrices and transposition. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Check boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.
87. Write a console program for the type “Chess position”: implement 64 square codes; [] and ==, as well as const access and character validation. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Check boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.
88. Write a console program for the type “N-dimensional vector”: implement coordinates; + and [], as well as the dot product for compatible sizes and the norm. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Check boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.
89. Write a console program for the type “IPv4 address”: implement four octets 0–255; &lt;&lt; and ==, as well as >> without partial assignment and ++ with bounds protection. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Check boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.
90. Write a console program for the type “Speed and distance”: implement meters and seconds as separate types, as well as distance / time with rejection of zero time. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Check boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

## Topic 10. Inheritance and polymorphism

91. Write a console program “Bank accounts”: implement checking and deposit accounts with a virtual monthly, and add a credit account with an explicitly specified debt limit. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.
92. Write a console program “Store products”: implement electronics and a food product with a common price, and add a warranty and a sample shelf life in days. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.
93. Write a console program “Notifications”: implement sample email and SMS notifications with a virtual text result, and add push notifications and message priority. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.
94. Write a console program “University staff”: implement a lecturer and a lab assistant with a common workload, and add an administrator and a check of the hours. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.
95. Write a console program “Sample taxpayers”: implement two kinds with entered notional rates, and add a third kind and a common check for a non-negative base. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.
96. Write a console program “Menu items”: implement a dish and a drink with a common cost, and add a set meal with a fixed sample discount. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.
97. Write a console program “Game weapons”: implement melee and ranged attacks with virtual damage, and add a magic attack and resource consumption. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.
98. Write a console program “Payment methods”: implement card and cash payments with a notional fee, and add a third local mock and limits. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.
99. Write a console program “Real estate”: implement an apartment and a land plot with a notional valuation, and add a house and an area check. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.
100. Write a console program “Electrical appliances”: implement a lamp and a heater with a power rating, and add operating modes and hours of use. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

## Topic 11. Abstract classes, interfaces

101. Write a console program “Payment gateways”: implement a Payment interface and two local mocks, and add selecting an implementation by an entered name and checking the amount. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and test the empty and error cases.
102. Write a console program “Sample ciphers”: implement a transformation interface and Caesar/XOR, and add the inverse transformation and a key check. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and test the empty and error cases.
103. Write a console program “Multifunction device”: implement the Printer and Scanner interfaces, and add separate client functions for each role. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and test the empty and error cases.
104. Write a console program “Data sources”: implement a Source interface with an array source and an input source, and add a sequence generator with a finite limit. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and test the empty and error cases.
105. Write a console program “Numerical integration”: implement the rectangle and trapezoid strategies, and add checks of the bounds and the number of steps. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and test the empty and error cases.
106. Write a console program “Cache policies”: implement an eviction interface and FIFO, and add LRU and access to an existing key. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and test the empty and error cases.
107. Write a console program “Routing”: implement an interface for choosing a route by price and by length, and add a toll road filter. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and test the empty and error cases.
108. Write a console program “Geometric solids”: implement the HasVolume and HasSurface interfaces, and add a cube and a cylinder with dimension checks. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and test the empty and error cases.
109. Write a console program “Student employee”: implement the Person–Student/Employee diamond, and add a virtual base with a single identifier. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and test the empty and error cases.
110. Write a console program “Sample string generators”: implement a generation interface and alphabet policies, and add a length, a seed and a check of the requirements. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and test the empty and error cases.

## Topic 12. Templates and concepts

111. Write a console program with a maxOf template for int and double; specify the data 3, 7 and 2.5, 1.0 in the code and print the maximums. In a separate file, check that maxOf(3,7.5) is rejected and explain an explicit type argument.
112. Write a console program with `Matrix<T,R,C>` and addition of matrices of the same dimensions. Specify two 2×2 int matrices in the code and print their sum; different dimensions must not compile.
113. Write a console program with a `FixedStack<T,N>` stack, push/pop and rejections for an empty and a full stack. In main, use int, a capacity of 2 and the numbers 4 and 9; print the popped values and the rejection messages.
114. Write a console program with `Interval<T>` for totally\_ordered types, closed bounds and contains. In the code, specify \[2,5\] and the values 1, 2, 5, 6, print the results and check the rejection of reversed bounds.
115. Write a console program with a Numeric mean; specify the data int {2,4,9} and double {1.5,2.5} in the code. Print the means as double and a message for empty data; explicitly exclude bool with the concept.
116. Write a console program with `StrongId<Tag>`, UserTag and BookTag; specify the values 1, 1, 2 in the code and print whether two UserId values are equal. Check that mixing tags fails with a separate negative test.
117. Write a console program with `Serializer<T>` and a full specialization for bool; for 25 and false specified in the code, print the numeric text and no. Explain why this is a class specialization.
118. Write a console program with variadic printing through a fold expression and the separator |. In main, call it for 1, 2.5, the string x and an empty pack; show the number of arguments and the result without an extra separator.
119. Write a console program with `Pair<T>` and a deduction guide. Specify the pairs (1,2) and (1,3) without an explicit T and print their lexicographic comparison; reject components of different types.
120. Write a console program with a Shape concept that requires a const area() convertible to double. In the code, specify a 2×3 rectangle and a square with side 4, print the sum of their areas and separately check the rejection for int.

## Topic 13. Containers

121. Write a console program. For a vector of strings, remove the empty ones with std::erase\_if and print the number of removed strings; check the case where all strings are empty. Specify the initial data in the code; print the result.
122. Write a console program. Keep the last 4 messages in a deque, add 6 messages and print the remaining ones in chronological order. Specify the initial data in the code; print the result.
123. Write a console program. In a list of numbers, move the first two elements to another list with splice; explain the iterator guarantees. Specify the initial data in the code; print the result.
124. Write a console program. In a map of products, perform try\_emplace with an existing key and insert\_or\_assign; print the difference in behavior. Specify the initial data in the code; print the result.
125. Write a console program. In a multimap of courses, find all courses of a lecturer with equal\_range; check a lecturer who is absent. Specify the initial data in the code; print the result.
126. Write a console program. Create a set of score,name records with a comparator that orders by score descending and by name ascending; check a tie. Specify the initial data in the code; print the result.
127. Write a console program. Count ASCII words in an unordered\_map and print the report as a sorted vector of pairs. Specify the initial data in the code; print the result.
128. Write a console program. Create an unordered\_set of coordinates with a consistent == and hash; show a duplicate and a missing key. Specify the initial data in the code; print the result.
129. Write a console program. Use a stack to check strings of parentheses, including an empty string and one that starts with a closing parenthesis. Specify the initial data in the code; print the result.
130. Write a console program. In a priority\_queue, run the tasks with the higher priority first and, on a tie, the one with the earlier ID; check the order of four tasks. Specify the initial data in the code; print the result.

## Topic 14. Iterators, algorithms, ranges

131. Write a console program: for the vector {5,-2,0,-1,8}, apply erase\_if to the negative numbers, print the remaining elements and the number of removed ones; explain why old iterators become invalid.
132. Write a console program: for three students specified in the code, sort the records with ranges::sort by the grade field and print the order; for a tie, explicitly order by name.
133. Write a console program: from iota(1,20), select the even numbers, compute their squares and take the first three; print 4, 16, 36 without an intermediate vector.
134. Write a console program: a mutable lambda returns the next number starting from 7; copy it after two calls, print the results of both copies and explain their independence.
135. Write a console program: materialize the fields of the string a,b,,c into a `vector<string>` with split/transform/to; print the empty field and show the independence of the result after clearing the source.
136. Write a console program: for the numbers 1, 2, 3, 4, compute the sum with accumulate and the prefix sums with partial\_sum; print both results.
137. Write a console program: show five titles on pages of two with chunk/enumerate, and print the number and contents of the short last page.
138. Write a console program: combine the arrays of prices and quantities specified in the code with zip, checking beforehand that they have the same length; print the total.
139. Write a console program: in the sorted vector {1,3,3,7}, find lower\_bound for 3 and 5, print the positions and check end for 9.
140. Write a console program with your own input range of the squares of the numbers 1..5. Add a static\_assert for input\_range, print the first three with take and explain the lifetime of the iterator.

## Topic 15. Streams and files

141. Write a console program that generates numbers.txt with 3, 5, 7, reads numbers while the operations succeed and prints the sum 15. Check that the file opened and distinguish an invalid token from EOF.
142. Write a console program: generate a name,score CSV with a valid and an invalid line, accept a score of 0..100 with istringstream, and write a report and the number of rejected lines.
143. Write a console program that generates five bytes, reads them in blocks of 4 and prints them in hex. Handle the short last block with gcount.
144. Write a console program: write three uint32 values in an explicit little-endian format, change the second one with seekp, read them back and print the result.
145. Write a console program: for a Windows path specified in the code, show filename, stem, extension and parent\_path; don’t require the file to exist.
146. Write a console program that generates its own directory with .txt and .cpp files, traverses it and prints the number of .txt files and their total size in bytes; check the error\_code after the operations.
147. Write a console program: generate a key=value configuration, parse a positive width, reject width=abc and print the reason and the line number.
148. Write a console program that creates a new report through a .tmp file and rename in a private sample folder; refuse if the result already exists, and check close and rename.
149. Write a console program: generate a source file, copy it to your own backup folder, compare the sizes and check byte-by-byte equality, and print success or the reason for the error.
150. Write a console program that generates a valid and a truncated binary file of fixed 8-byte records; reject an incomplete record and print the number of complete records and the status.

## Topic 16. Modules and C++26

151. Write a console program. Read deposit and withdraw commands with an amount in kopiykas until end. Export an Account class from the bank module, reject withdrawals that exceed the balance and print the balance after each command.
152. Write a console program. Read a set of numbers from the keyboard until the end of input. The static library stats must return the count, minimum, maximum and average; the console client prints a report or reports an empty set.
153. Write a console program. Read two 2×2 matrices, export a Matrix type and the addition and multiplication operations from the matrix module, and print both results. Check the identity and zero matrices.
154. Write a console program. Create a calendar module with a Date type. Read a day, month and year 1900–2100 from the keyboard; check that the date is valid and print the next date, including the transition to the next year.
155. Write a console program. Create a schedule module that reads two classes from the keyboard, each with a day, a room and a time interval in minutes. Print whether they conflict; an end touching a start doesn’t count as a conflict.
156. Write a console program. Create a cli module for the parameters --count N and --verbose, where N is from 1 to 100. The console client prints the parsed values; check a missing number, a duplicate parameter and an extra argument.
157. Write a console program. Create a polynomial module with a function template implementing Horner’s method for arithmetic types. Specify the coefficients in the code for int and double, read x from the keyboard and print the two results.
158. Write a console program. Create a units module with separate Meter and Kilometer types and explicit conversions. Read a value and the unit symbol m or km from the keyboard; print the result in both units.
159. Write a console program. Create a static library cart for line items with a code, a quantity and a price. Read the data from the keyboard until end; for a total of at least 100000 kopiykas, apply a 5 % discount rounded down to the kopiyka. Print the total, the discount and the payment.
160. Write a console program. Create the modules budget.model and budget.report. Read records of the form category amount\_kopecks from the keyboard until end, where a positive amount is income and a negative one is an expense; print the totals by category and the overall balance.
