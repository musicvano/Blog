---
title: "Review tasks"
description: "Object-oriented programming in Kotlin: practical tasks by course topic"
sourceHash: "48b25e397663c86f3133e88f39c18f8f4e3c37bad305d07c1db43445e3c0f5a5"
---

# Review tasks

Practical tasks by course topic to check your knowledge. Each task is a separate program.

## Topic 1. Kotlin and your first program

1. Create a Kotlin/JVM program: read from the keyboard a distance d of 1–10000 km and fuel l of 0.1–1000 l; print the consumption 100\*l/d in l/100 km. Print fractional results with two decimal places and whole numbers without a fractional part. Record the correct input format in the README, test two cases, and make three local Git commits.
2. Create a Kotlin/JVM program: read from the keyboard an amount s of 0–100000 UAH and an educational rate r of 1–100 UAH per conventional unit; print s/r conventional units. Print fractional results with two decimal places and whole numbers without a fractional part. Record the correct input format in the README, test two cases, and make three local Git commits.
3. Create a Kotlin/JVM program: read from the keyboard a mass m of 1–300 kg and a height h of 0.5–2.5 m; print the educational index m/(h\*h), without medical interpretation. Print fractional results with two decimal places and whole numbers without a fractional part. Record the correct input format in the README, test two cases, and make three local Git commits.
4. Create a Kotlin/JVM program: read from the keyboard a length l and a width w of 1–100 m and a paint consumption c of 0.1–2 l/m²; print the paint l\*w\*c liters for the floor. Print fractional results with two decimal places and whole numbers without a fractional part. Record the correct input format in the README, test two cases, and make three local Git commits.
5. Create a Kotlin/JVM program: read from the keyboard a temperature t from −100 to 100 °C; print the temperatures 1.8\*t+32 °F and t+273.15 K. Print fractional results with two decimal places and whole numbers without a fractional part. Record the correct input format in the README, test two cases, and make three local Git commits.
6. Create a Kotlin/JVM program: read from the keyboard an integer number of seconds s of 0–1000000; print the full hours and the remaining minutes and seconds. Print fractional results with two decimal places and whole numbers without a fractional part. Record the correct input format in the README, test two cases, and make three local Git commits.
7. Create a Kotlin/JVM program: read from the keyboard an educational p of 1–100000 UAH and r of 0–20 percent per year; print p\*(1+r/100) after one year without fees. Print fractional results with two decimal places and whole numbers without a fractional part. Record the correct input format in the README, test two cases, and make three local Git commits.
8. Create a Kotlin/JVM program: read from the keyboard integer values of a quantity n of 1–100 and a price c of 1–10000 kop.; print the total n\*c kopiykas. Print fractional results with two decimal places and whole numbers without a fractional part. Record the correct input format in the README, test two cases, and make three local Git commits.
9. Create a Kotlin/JVM program: read from the keyboard a distance d of 0.1–100 km and a time t of 1–1000 min; print the pace t/d min/km and the speed 60\*d/t km/h. Print fractional results with two decimal places and whole numbers without a fractional part. Record the correct input format in the README, test two cases, and make three local Git commits.
10. Create a Kotlin/JVM program: read from the keyboard dimensions a,b,c of 0.1–100 m and a flow rate q of 1–1000 l/min; print the volume 1000\*a\*b\*c l and the filling time in minutes. Print fractional results with two decimal places and whole numbers without a fractional part. Record the correct input format in the README, test two cases, and make three local Git commits.

## Topic 2. Types, null safety, and control flow

11. Create a Kotlin console program: read years a,b in 1–9999, a&lt;=b; print the leap years according to the Gregorian rule: divisible by 400, or by 4 but not by 100. Use nullable conversion without !!, check the bounds and EOF; repeat the prompt after an invalid line. Print a summary only for a valid data set.
12. Create a Kotlin console program: read minutes 0–10000; compare the educational plans A=100+2\*m and B=200+m, and print both if they are equal. Use nullable conversion without !!, check the bounds and EOF; repeat the prompt after an invalid line. Print a summary only for a valid data set.
13. Create a Kotlin console program: read the coordinates of two different squares 1–8; check a rook move with no other pieces on the board. Use nullable conversion without !!, check the bounds and EOF; repeat the prompt after an invalid line. Print a summary only for a valid data set.
14. Create a Kotlin console program: read a,b in 0–10000, a&lt;=b; print the number of primes in the inclusive range. Use nullable conversion without !!, check the bounds and EOF; repeat the prompt after an invalid line. Print a summary only for a valid data set.
15. Create a Kotlin console program: read an amount of 10–100000 that is a multiple of 10; break it down into an unlimited supply of 100, 50, 20, and 10 banknotes and print the counts. Use nullable conversion without !!, check the bounds and EOF; repeat the prompt after an invalid line. Print a summary only for a valid data set.
16. Create a Kotlin console program: read a month 1–12 and a day; validate the date of a non-leap year against the actual length of the month. Use nullable conversion without !!, check the bounds and EOF; repeat the prompt after an invalid line. Print a summary only for a valid data set.
17. Create a Kotlin console program: set a secret of 37; read up to 7 integer guesses 1–100 and print higher/lower/correct and the number of attempts. Use nullable conversion without !!, check the bounds and EOF; repeat the prompt after an invalid line. Print a summary only for a valid data set.
18. Create a Kotlin console program: read n 1–10000; compute the sum of the proper positive divisors and classify n accordingly. Use nullable conversion without !!, check the bounds and EOF; repeat the prompt after an invalid line. Print a summary only for a valid data set.
19. Create a Kotlin console program: read n 1–1000 finite temperatures −50..60; count those below 0, exactly 0, and above 0. Use nullable conversion without !!, check the bounds and EOF; repeat the prompt after an invalid line. Print a summary only for a valid data set.
20. Create a Kotlin console program: read an integer 1–10; print the exact numeral I, II, III, IV, V, VI, VII, VIII, IX, X using when. Use nullable conversion without !!, check the bounds and EOF; repeat the prompt after an invalid line. Print a summary only for a valid data set.

## Topic 3. Functions and strings

21. Create a Kotlin/JVM console program that reads a product price in kopiykas and a discount of 0..1 and prints the discounted price. The price function has a default discount of 0 and formats the currency; show calls with named arguments.
22. Create a Kotlin/JVM console program that reads integers and prints their min, max, and average. Perform the computation with a vararg function for Int; handle an empty set explicitly, and pass an existing array with the spread operator.
23. Create a Kotlin/JVM console program that reads an integer n 0..20 and prints n! computed by a recursive function. Explain the base case; reject the value 21.
24. Create a Kotlin/JVM console program that reads a base -10..10 and an exponent 0..18 and prints the power computed by a tailrec function. Compare it with ordinary recursion.
25. Create a Kotlin/JVM console program that reads a string and prints whether it is a palindrome. Implement the extension function String.isPalindrome, ignoring spaces and case; define the behavior for an empty string.
26. Create a Kotlin/JVM console program that reads a string and prints the number of words in it. Implement the extension property String.wordCount based on transitions between whitespace and non-whitespace characters.
27. Create a Kotlin/JVM console program that reads a name, a job title, and a phone number and prints a business card. Build the card from a multiline template with trimMargin, and pass the field width as a named argument.
28. Create a Kotlin/JVM console program that reads a phone number and prints whether it matches the full format +380 followed by 9 digits. Perform the check with Regex; show why find is not suitable for validating the whole string.
29. Create a Kotlin/JVM console program that reads a last name and a first name on one line and prints the initials. Implement String.toInitials; normalize extra spaces; a single word is not enough.
30. Create a Kotlin/JVM console program that reads a line of text and prints it in a frame. The frame function has a default character \* and a width of 20; reject a long line and display an empty one.

## Topic 4. Exceptions, Result, and debugging

31. Create a Kotlin console program: read a line a op b, where a/b are finite from −1000 to 1000 and op is only +,-,\*,/; print the result and reject division by 0. Describe the domain error with a custom type and keep the cause when wrapping; test normal, boundary, and invalid input, and that the state is unchanged after a failure.
32. Create a Kotlin console program: read a line limit=number; allow only the key limit and an integer 1–100, and print the accepted value. Describe the domain error with a custom type and keep the cause when wrapping; test normal, boundary, and invalid input, and that the state is unchanged after a failure.
33. Create a Kotlin console program: read from,to,amount as whole kopiykas 0–1000000; amount&gt;0 and &lt;=from, to+amount&lt;=1000000; return both new balances only after validation. Describe the domain error with a custom type and keep the cause when wrapping; test normal, boundary, and invalid input, and that the state is unchanged after a failure.
34. Create a Kotlin console program: read a number 0–1000000 and a unit m, cm, km; convert to meters and reject an unknown unit. Describe the domain error with a custom type and keep the cause when wrapping; test normal, boundary, and invalid input, and that the state is unchanged after a failure.
35. Create a Kotlin console program: set 20 seats, with seats 3 and 7 occupied; read a number 1–20 and print a confirmation only for a free seat. Describe the domain error with a custom type and keep the cause when wrapping; test normal, boundary, and invalid input, and that the state is unchanged after a failure.
36. Create a Kotlin console program: read an ISO date yyyy-MM-dd; use java.time.LocalDate to check calendar validity and print the day of the year. Describe the domain error with a custom type and keep the cause when wrapping; test normal, boundary, and invalid input, and that the state is unchanged after a failure.
37. Write a Kotlin console program that reads a line with two finite comma-separated coordinates and prints the parsed pair or the reason for the error. The parsing function returns a Result of a Double pair; handle success and failure with fold; test an empty line, an extra field, and NaN.
38. Write a Kotlin console program that reads integers from a multiline text specified in the code via StringReader and use and prints their sum. Show normal completion and a conversion failure, explain how the resource is closed, and keep the original exception as the cause.
39. Write a Kotlin console program with a function that averages only positive numbers; for the array 10, −5, 20, print the result. For an empty set, the function returns null. Show the local variables and the correct denominator in the debugger; check that the result is 15.0.
40. Write a CLI that converts Celsius to kelvins: one finite argument within −273.15–10000. On success it prints the result and returns code 0; a format or range error prints an explanation to stderr and returns code 2.

## Topic 5. Classes and objects

41. Create a Kotlin/JVM console program: enter a name and a year of study 1..6; create a Student with a primary constructor and an init check, and print the properties or the reason for rejecting an invalid year.
42. Create a Kotlin/JVM console program: enter a temperature; implement a validated Celsius setter and a computed Fahrenheit, and reject NaN, infinity, and values below −273.15.
43. Create a Kotlin/JVM console program: enter a balance and a withdrawal amount; implement an Account with private set, and print the balance after success or the unchanged balance after a rejection.
44. Create a Kotlin/JVM console program: enter the side lengths of a rectangle; implement computed area and perimeter and check that the dimensions are positive.
45. Create a Kotlin/JVM console program: enter hryvnias and kopiykas; implement two Money constructors delegating via this, and print the total kopiykas without Double.
46. Create a Kotlin/JVM console program: enter a name and a mentor; implement a Student with a lateinit property and an isInitialized check, and print the description before and after assignment.
47. Create a Kotlin/JVM console program: create a Ticket class in the model package and main in the app package; enter a number, check that it is not empty, import the class with an alias, and print the number.
48. Create a Kotlin/JVM console program: enter a player name and a track name; implement a nested Track and an inner Playback, and show the inner object's access to the owner's name.
49. Create a Kotlin/JVM console program: enter an object name; create a Trace with two init blocks and a secondary constructor, and print the actual order of initialization.
50. Create a Kotlin/JVM console program: enter an account number and balance; create two independent objects and a second reference to the first one, change the first, and print the results of == and ===.

## Topic 6. Inheritance and polymorphism

51. Create a Kotlin/JVM console program: enter a salary and a bonus; create an open Employee and a BonusEmployee with override and super, and print the polymorphic salary.
52. Create a Kotlin/JVM console program: enter a radius or the sides of a rectangle; create an abstract Shape and two subclasses, and print the area via Shape.
53. Create a Kotlin/JVM console program: enter a lamp's charge and a command; implement Switchable and Chargeable in one class and print the state through both interfaces.
54. Create a Kotlin/JVM console program: create Swimmer and Flyer with a default move, and a Duck; print the result of an explicit super call to both implementations.
55. Create a Kotlin/JVM console program: enter a name and a quantity; implement the template method Report.render with a protected abstract body and two kinds of report.
56. Create a Kotlin/JVM console program: enter a stable number for two objects; override equals, hashCode, and toString consistently, and print the equality and a hash check.
57. Create a Kotlin/JVM console program: enter a kind, note or number, and a value; use is and as? for Printable/Note, and print the text or the reason the cast is impossible.
58. Create a Kotlin/JVM console program: create Base and Derived with init messages; enter a label and show the order of construction and the override after creation is complete.
59. Create a Kotlin/JVM console program: enter a message; implement Formatter and Printer via composition, and print the result without Printer inheriting from Formatter.
60. Create a Kotlin/JVM console program: enter two positive distances; implement Transport for bus and taxi and a single client loop, print the cost, and test a zero distance.

## Topic 7. Data classes, enums, sealed

61. Create a Kotlin/JVM console program: enter a book's title and year; create a data Book, copy it with a changed year, destructure it, and print the value equality.
62. Create a Kotlin/JVM console program: enter a name and a city; demonstrate a shallow copy of a data Customer with a mutable Address, and print whether the reference is shared.
63. Create a Kotlin/JVM console program: enter a day of the week; enum Day has weekend and next; print all weekend days via entries, and the next day.
64. Create a Kotlin/JVM console program: enter a planet name and a mass; enum Planet contains g; print the weight and handle an unknown name in valueOf.
65. Create a Kotlin/JVM console program: enter a state Created/Paid/Shipped and its data; a sealed OrderStatus and an exhaustive when produce the description.
66. Create a Kotlin/JVM console program: enter an amount and a balance; return a sealed Success/Declined/Invalid and print the corresponding result data.
67. Create a Kotlin/JVM console program: enter two ticket titles; object IdSource and a companion factory create validated tickets; print the sequential IDs.
68. Create a Kotlin/JVM console program: enter a positive identifier and a name; value UserId and User with a private constructor and a companion create; print the record.
69. Create a Kotlin/JVM console program: enter a prefix; create two anonymous Message objects via a factory, and print the texts and the result of ===.
70. Create a Kotlin/JVM console program: enter ADD/MAX and two integers −1000..1000; the enum implements an operation interface separately for each constant; print the result.

## Topic 8. Operations and delegation

71. Create a Kotlin/JVM console program: enter two vectors; implement plus, times, unaryMinus, and get, and print the results and a rejection for an invalid index.
72. Create a Kotlin/JVM console program: enter amounts in kopiykas; implement Money.plus, minus, and compareTo, print the result, and check that the operands are unchanged.
73. Create a Kotlin/JVM console program: enter the polynomial's coefficients and x; implement invoke and get by degree, and print the polynomial's value and a coefficient.
74. Create a Kotlin/JVM console program: enter two ISO dates; implement rangeTo, contains, and iterator, print all dates inclusively, and test an empty range.
75. Create a Kotlin/JVM console program: enter a number; create an immutable Counter with plus and inc, and print the difference between the prefix and postfix results.
76. Create a Kotlin/JVM console program: enter three numbers; a lazy summary computes their sum; read it twice and print the number of initializations.
77. Create a Kotlin/JVM console program: enter an initial and a new volume; vetoable allows 0..100 and observable logs the theme; print the accepted state.
78. Create a Kotlin/JVM console program: enter a name; a custom ReadWriteProperty normalizes spaces and rejects empty text; print the state after a rejection.
79. Create a Kotlin/JVM console program: enter the configuration key title; provideDelegate checks the key at creation time; print the value or a message that it is missing.
80. Create a Kotlin/JVM console program: enter strings; Repository and CountingRepository with by count successful direct saves; print the data and the count, and explain the delegate's internal calls.

## Topic 9. Generic programming

81. Create a Kotlin/JVM console program that reads strings and then integers, and prints each set in reverse order via a generic node-based Stack&lt;T&gt;. Implement push/pop with an explicit rejection of removal from an empty stack; demonstrate Int and String.
82. Create a Kotlin/JVM console program that reads three values, adds them to a generic node-based Queue&lt;T&gt;, and prints the removed elements and the size. Check FIFO and the size after exhaustion.
83. Create a Kotlin/JVM console program that reads three integers and three ISO dates and prints the largest value of each triple. Write one generic function for the largest of three Comparable values.
84. Create a Kotlin/JVM console program with an Animal/Cat hierarchy that reads cat names and prints them via a source of animals. Implement Source&lt;out T&gt; and show the safe assignment of Source&lt;Cat&gt; to a variable of type Source&lt;Animal&gt;.
85. Create a Kotlin/JVM console program with an Animal/Cat hierarchy that reads cat names and prints them via a consumer. Implement Sink&lt;in T&gt; and pass an Animal consumer as a Cat consumer. Explain the direction.
86. Create a Kotlin/JVM console program that reads a type name, int or bool, and a text, and prints the parsed value or the reason for rejection. Implement an inline reified parser for Int/Boolean; reject invalid text and an unsupported type.
87. Create a Kotlin/JVM console program that reads a grade 0..100 as a string and prints the accepted grade or the reason for rejection. Implement a sealed Either&lt;String,Int&gt;; handle success and two reasons for rejection: non-integer text and out of range.
88. Create a Kotlin/JVM console program that reads two integer bounds and a number and prints whether the number belongs to the range. Create a Range&lt;T:Comparable&lt;T&gt;&gt; with bound validation and contains. Test both bounds and a reversed range.
89. Create a Kotlin/JVM console program that reads a name and an integer score and prints the pair before and after swapping. Create a Duo&lt;out A,out B&gt; with swap. Prove with a double swap that the original value is returned.
90. Create a Kotlin/JVM console program that reads the names and scores of two candidates and prints the name of the better one. Implement a function with where T:Named,T:Comparable&lt;T&gt; that returns the name of the better candidate with a tie rule.

## Topic 10. Arrays and collections

91. Create a Kotlin/JVM console program that reads a non-empty DoubleArray, rejects infinite numbers, and prints min/max/mean.
92. Create a Kotlin/JVM console program that reads a rectangular matrix of integers into an Array&lt;IntArray&gt; and prints the transposed matrix. Reject rows of unequal length and check that the result is independent of the source array.
93. Create a Kotlin/JVM console program for a shopping list: the user adds names, including duplicates, and removes the first match; the program prints the list after each action. Expose a defensive snapshot of the list to the outside.
94. Create a Kotlin/JVM console program that reads two sets of words and prints their intersection, union, and both differences in a defined order.
95. Create a Kotlin/JVM console program that reads text, counts word frequencies via a MutableMap, and prints them by key; empty text gives an empty report.
96. Create a Kotlin/JVM console program that reads lines and prints, for each distinct line, the positions where it appears. Group the positions into a Map&lt;String,MutableList&lt;Int&gt;&gt; via getOrPut.
97. Create a Kotlin/JVM console program for a ticket queue: commands add a ticket or call the next one. Implement FIFO with ArrayDeque, with an explicit message about an empty queue.
98. Create a Kotlin/JVM console program – a simple text editor with commands to change the text, undo, and redo, which prints the current text after each command. Implement undo/redo with two ArrayDeques and clear redo after a new change.
99. Create a Kotlin/JVM console program that reads a list of integers and prints it after removing the even ones. Remove safely via MutableIterator.remove; test an empty list.
100. Create a Kotlin/JVM console program that reads products with a name and a price and prints them ordered by price and name. Show that the original list is preserved after sortedWith.

## Topic 11. Lambdas and sequences

101. Create a Kotlin/JVM console program – a calculator that reads a command and two numbers and prints the result. Create a Map&lt;String,(Double,Double)-&gt;Double&gt; for the four arithmetic operations; reject a zero divisor and an unknown command.
102. Create a Kotlin/JVM console program that demonstrates closure counters: a factory returns a function that increments and returns the value of its counter. Print the values of two independent instances and of two references to one instance, proving their independence and sharing.
103. Create a Kotlin/JVM console program that reads orders with the fields city/paid/cents, computes the totals of paid orders by city, and prints them sorted with a tie rule.
104. Create a Kotlin/JVM console program that reads students' names and scores, splits them by a threshold of 60 via partition, and prints both groups and the best student with a defined tie rule.
105. Create a Kotlin/JVM console program that reads employees (id, name, department) and prints an index built via associateBy, after rejecting repeated ids.
106. Create a Kotlin/JVM console program that reads a list of Long prices and prints their sum folded via fold; an empty set must give 0; reject overflow.
107. Create a Kotlin/JVM console program that reads N and prints the first N primes up to 1000000 from a Sequence and the number of candidates checked.
108. Create a Kotlin/JVM console program that reads a string and prints the length of its normalized version. Write a composition of (A)-&gt;B and (B)-&gt;C and use it to normalize the string and compute the length.
109. Create a Kotlin/JVM console program that reads a settings name and prints it, or a fallback name for empty input. Show apply/also/let on a nullable name.
110. Create a Kotlin/JVM console program that reads a title and report lines and prints a text report built with a DSL using a lambda with a receiver. Test an empty report.

## Topic 12. Files, serialization, and tests

111. Create a Kotlin/JVM console program that reads a UTF-8 file, whose path is passed as an argument, via useLines and prints the number of non-empty lines; the resource must be closed correctly on an exception.
112. Create a Kotlin/JVM console program that reads a restricted CSV file name;score with a header and prints the average score or a message that there is no data. Reject quoted fields and scores outside 0..100.
113. Create a Kotlin/JVM console program that saves an entered list of contacts (id, name, phone) to a JSON file via @Serializable, reads it back, and prints it. Test the round trip and the uniqueness of ids.
114. Create a Kotlin/JVM console program that reads a JSON configuration from a file and prints the accepted settings. The default port is 8080; skip unknown keys via ignoreUnknownKeys; check the port limits 1..65535.
115. Create a Kotlin/JVM console program that saves to JSON and restores publications of two kinds: Printed and Audio. Implement a sealed model and a JSON discriminator kind; check and print the restoration of both variants.
116. Create a Kotlin/JVM console program that saves to JSON and restores a record with a LocalDate date. Write a KSerializer&lt;LocalDate&gt; for an ISO string and test a valid and an invalid date.
117. Create a Kotlin/JVM console program that reads a score 0..100 and prints whether the threshold of 60 has been reached. Write a parameterized kotlin.test test of the threshold for the scores 0, 59, 60, 100, and tests of invalid bounds.
118. Create a Kotlin/JVM console program for notes that saves them to a JSON file and loads them back. Create a note repository with save/load and @TempDir tests for the round trip and corrupted JSON.
119. Create a Kotlin/JVM console program that writes the entered text to a file, whose path is passed as an argument, via a temporary file and ATOMIC\_MOVE. Do not hide the lack of support for atomic moves, and clean up the temporary file.
120. Create a Kotlin/JVM console program that appends entered records with an id to a JSON file. Show that an invalid record with a repeated id does not change the previous file; verify this with a kotlin.test test.

## Topic 13. Coroutines and Flow

121. Create a standalone Kotlin program. Read two positive delays, launch two async actions, and print both results after await; explain the order.
122. Create a standalone Kotlin program. Read the bounds of two ranges, compute the sums on Dispatchers.Default, and print the total sum without a shared accumulator.
123. Create a standalone Kotlin program. Read a timeout and the duration of a simulated request, and print the result or a timeout message; confirm that finally runs.
124. Create a standalone Kotlin program. Launch an infinite computational task with ensureActive, cancel it after a user command, and print a confirmation of completion.
125. Create a standalone Kotlin program. Read deposit amounts, perform them concurrently under a Mutex, and print the balance; reject negative amounts without changing the state.
126. Create a standalone Kotlin program. Read a list of numbers, emit them via a Flow, filter the even ones, compute the squares, and print the list; allow an empty list.
127. Create a standalone Kotlin program. Model two independent sources in a supervisorScope, one of which fails; print the result or the error of each, without swallowing cancellation.
128. Create a standalone Kotlin program. Read a sequence of changes in the number of seats, keep the non-negative current state in a StateFlow, and print the final value.
129. Create a standalone Kotlin program. Pass the entered orders through a bounded Channel to two consumers; print every processed identifier exactly once.
130. Create a standalone Kotlin program. Implement a suspend function with a delayed result and two runTest tests: successful retrieval and a timeout; print the test report.

## Topic 14. Databases with Exposed

131. Create a standalone Kotlin program with Exposed. Create a table of products with a name and a price in kopiykas, enter three products, and show them in order of price.
132. Create a standalone Kotlin program with Exposed. For an SQLite book catalog, implement adding, renaming, and deleting by id; print the number of affected rows.
133. Create a standalone Kotlin program with Exposed. Create authors and books with a foreign key, enter data, and show the book titles together with their authors via innerJoin.
134. Create a standalone Kotlin program with Exposed. Create categories and expenses, including an empty category, and print the number of expenses via leftJoin and groupBy.
135. Create a standalone Kotlin program with Exposed. Store two balances, perform a transfer, simulate an exception after the debit, and verify a full rollback with a new transaction.
136. Create a standalone Kotlin program with Exposed. Create a contact repository that returns data classes; check saving and searching after reopening the file.
137. Create a standalone Kotlin program with Exposed. Describe a DAO entity for a publication with a title, create and rename it in a transaction, and print an ordinary string outside the transaction.
138. Create a standalone Kotlin program with Exposed. Implement an exact name search with a parameterized DSL query and test a value with an apostrophe and SQL-like text.
139. Create a standalone Kotlin program with Exposed. Implement a suspend function that reads the catalog via withContext(IO) and a short JDBC transaction; print the list or a domain error.
140. Create a standalone Kotlin program with Exposed. Add a unique index to contacts and a duplicate test; confirm that the error does not change the existing record.

## Topic 15. Compose Multiplatform

141. Create a standalone Kotlin/Compose program. Create a form that computes the area of a rectangle, reject negative and infinite numbers, and show the result and a reset.
142. Create a standalone Kotlin/Compose program. Create a counter 0–100 with increment, decrement, and reset buttons, and check that actions are unavailable at the limits.
143. Create a standalone Kotlin/Compose program. Create a shopping list with adding, a done checkbox, and deletion by a stable id, and show the number of unfinished items.
144. Create a standalone Kotlin/Compose program. Create a form with a name, a RadioButton, and a Checkbox, and disable confirmation until the input is valid.
145. Create a standalone Kotlin/Compose program. Create a length converter with state hoisting and two child components, and show an error for an empty number.
146. Create a standalone Kotlin/Compose program. Create an adaptive grid of product cards with stable keys, and test changing the window width.
147. Create a standalone Kotlin/Compose program. Create a list of notes with an AlertDialog for adding; Cancel keeps the list unchanged, and an empty title is not allowed.
148. Create a standalone Kotlin/Compose program. Create a stopwatch with pause and reset; determine the time with a monotonic clock and perform updates with LaunchedEffect.
149. Create a standalone Kotlin/Compose program. Create a tip form with a Slider and a rounding Switch, move the computation into a pure function, and test the limits.
150. Create a standalone Kotlin/Compose program. Create a Scaffold with a top bar and a button that adds a card, apply innerPadding correctly, and handle an empty list.

## Topic 16. MVVM and navigation

151. Create a standalone Kotlin/Compose program. Implement a counter ViewModel with StateFlow and a screen with increment/reset events; test the limit of 100.
152. Create a standalone Kotlin/Compose program. Implement a converter with validation in the ViewModel, keep the draft text, and show a domain error without a UI exception.
153. Create a standalone Kotlin/Compose program. Implement a contact list and details with a @Serializable id route, a Back button, and a message for an unknown id.
154. Create a standalone Kotlin/Compose program. Implement an Exposed/SQLite note repository, return data classes, and call it from the ViewModel off Main.
155. Create a standalone Kotlin/Compose program. Implement a book editing form: keep the draft after a repository error and clear it only after success.
156. Create a standalone Kotlin/Compose program. Implement loading/data/error for loading the catalog and a retry button, and do not allow two simultaneous requests.
157. Create a standalone Kotlin/Compose program. Write a runTest for the ViewModel with a fake repository: empty input, success, and an error with the draft preserved.
158. Create a standalone Kotlin/Compose program. Implement deleting a record with confirmation and reloading the list; Cancel does not call the repository.
159. Create a standalone Kotlin/Compose program. Implement a message about a successful save via a Snackbar with acknowledgment of handling, and explain the delivery contract.
160. Create a standalone Kotlin/Compose program. Implement a container for manual injection of the SQLite repository, and check that the database path is the same after launching from another working directory.
