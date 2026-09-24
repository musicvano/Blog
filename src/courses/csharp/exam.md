---
title: "Review tasks"
description: "Object-Oriented Programming in C#: practical tasks by course topic"
sourceHash: "fc2f33616e03f1e68936740d94fc5c2dbebfe4f0b068deaa649693fa5ff90b7e"
---

# Review tasks

Practical tasks by course topic to check your knowledge. Each task is a separate program.

## Topic 1. .NET and program structure

1. Create a console program that asks the user for the length of a film in minutes (a positive integer) and prints it in the format “X h Y min.” An invalid or negative value is rejected with a message.
2. Create a console program that asks the user for the price of a product (UAH) and a discount percentage (from 0 to 100) and prints the discount amount and the price to pay in currency format.
3. Create a console program that calculates the area and perimeter of an equilateral triangle. The side length is passed as a command-line argument, and if there is no argument, it is requested from the user; a nonpositive value is rejected.
4. Create a console program that asks the user for a length in meters and prints it in centimeters, feet, and inches with two decimal places.
5. Create a console program that asks the user for their year of birth, determines the current year from the system date, and prints the user’s age and the number of days until the next New Year.
6. Create a console program that asks the user for two floating-point numbers and prints their sum, difference, product, and quotient as an aligned table; when dividing by zero, a message is printed instead of the quotient.
7. Use the dotnet CLI to create a console application with a `Main` method that prints the number of command-line arguments and the sum of the arguments that are integers.
8. Create a console program that asks the user for the power of an electrical appliance (W), the number of hours it runs per day, and the rate (UAH per kWh) and prints the cost of electricity for 30 days.
9. Create a console program that asks the user for the radius and height of a cylindrical tank in centimeters (positive numbers) and prints its volume in liters.
10. Create a console program that asks the user for a distance (km) and travel time (hours and minutes) and prints the average speed in km/h and m/s with two decimal places.

## Topic 2. Types, variables, operators

11. Create a console program that asks the user for a number of minutes (a nonnegative integer) and prints it in the format “X d Y h Z min” using integer division and the `%` operator. An invalid value is rejected with a message.
12. Create a console program that asks the user for the price of a product (UAH) and a quantity, calculates the total and the 20% VAT included in it using the `decimal` type, and prints the VAT rounded to kopiykas with the `MidpointRounding.ToEven` and `MidpointRounding.AwayFromZero` modes.
13. Create a console program that asks the user for an integer from 0 to 255 and prints its 8-digit binary representation, its hexadecimal representation, the number of set bits, and the number with inverted bits within a byte.
14. Create a console program that asks the user for a temperature in Fahrenheit and prints it in Celsius and Kelvin with one decimal place; values below absolute zero are rejected with a message.
15. Create a console program that asks the user for two integers of type `int` and prints their sum and product calculated in a `checked` context; if overflow occurs, the program reports it and prints the result calculated using the `long` type.
16. Create a console program that asks the user for the color components R, G, B (0–255), packs them into an integer with shifts, and prints the color in the `#RRGGBB` format and the gray level 0.299R + 0.587G + 0.114B rounded to an integer.
17. Create a console program that asks the user for the mass (kg) and speed (km/h) of a body and prints the kinetic energy in joules and kilojoules and the momentum; the speed is converted to m/s, and invalid values are rejected.
18. Create a console program that asks the user for a file size in bytes (type `long`) and prints it in KB, MB, and GB (powers of 1000) and KiB, MiB, and GiB (powers of 1024) with two decimal places.
19. Create a console program that asks the user for a floating-point number and the number of decimal places (0–10) and prints the results of `Math.Round` in the `ToEven` and `AwayFromZero` modes, as well as the results of `Math.Floor`, `Math.Ceiling`, `Math.Truncate`, and an explicit cast to `int`.
20. Create a console program that asks the user for a bill amount (UAH), a tip percentage, and the number of people and prints each person’s share rounded up to a whole hryvnia and the total overpayment due to rounding.

## Topic 3. Branching and loops

21. Create a console program that asks the user for a natural number and prints the number of its digits, the sum of its digits, and the number written with its digits in reverse order.
22. Create a console program that asks the user for a score (0–100), repeats the request on invalid input, and prints the ECTS grade (A – 90–100, B – 80–89, C – 71–79, D – 61–70, E – 50–60, FX – 30–49, F – 0–29) determined by a `switch` expression with relational patterns.
23. Create a console program that asks the user for a month number and a year and prints the number of days in the month, taking leap years into account, and the name of the season.
24. Create a console program that asks the user for two natural numbers and prints their greatest common divisor calculated with the Euclidean algorithm and their least common multiple.
25. Create a console program that reads floating-point numbers until an empty line, skips invalid values, and prints the number of positive and negative numbers, their arithmetic mean, and the largest number.
26. Create a console program that asks the user for an integer *n* (from 1 to 20) and uses nested loops to print an *n* × *n* multiplication table with aligned columns.
27. Create a console program that asks the user for *x* and a precision and calculates cos *x* as the sum of the series 1 − *x*<sup>2</sup>/2! + *x*<sup>4</sup>/4! − …, printing the result, the number of terms, and the value of `Math.Cos`.
28. Create a console program that asks the user for the bounds of a range and prints all the primes in it and their count, using the `break` statement to finish checking divisors.
29. Create a console menu program in a `do`/`while` loop that performs addition, subtraction, multiplication, and division on two entered numbers as chosen by the user until the “exit” item is selected and reports division by zero.
30. Create a console game program in which the computer picks a random number from 1 to 50 and the user has 6 attempts to guess it; after each attempt, the program hints “higher” or “lower.”

## Topic 4. Arrays and strings

31. Create a console program that reads integers entered separated by spaces and prints the array after a cyclic left shift by one position, the sum of the negative elements, and the index of the largest element.
32. Create a console program that asks for the size of a square matrix *n* (from 2 to 10), fills it with random numbers from 1 to 99, and prints the matrix, the transposed matrix, and the sums of the main and secondary diagonals.
33. Create a console program that asks for a number of rows and builds a jagged array in which row *i* contains the numbers from 1 to *i* + 1, and prints it and the sum of the elements of each row.
34. Create a console program that asks for a sentence and prints the number of words, the longest word, and the words in alphabetical order ignoring case.
35. Create a console program that reads a string of integers separated by commas and spaces, skips invalid values, and prints the sum, the average, and the numbers in ascending order.
36. Create a console program that asks for a string and prints the number of letters, digits, spaces, and other characters, as well as the string without repeated spaces.
37. Create a console program that encrypts and decrypts the entered text with a Caesar cipher using a key entered by the user, for the Latin alphabet, preserving case and leaving other characters unchanged.
38. Create a console program that asks for the number of rows *n* and uses `StringBuilder` to build and print a table of the squares and cubes of the numbers from 1 to *n* with a border and aligned columns.
39. Create a console program that reads an array of integers, sorts a copy of it, prints the original and sorted arrays, and performs a binary search in the sorted array for an entered number.
40. Create a console program that asks for a word or phrase and checks whether it is a palindrome, ignoring case, spaces, and punctuation.

## Topic 5. Methods and recursion

41. Create a console program with a method `static bool TryReadInt(string prompt, int min, int max, out int value)` that makes up to three attempts to read a number from a range, and demonstrate it for reading an age and the number of children.
42. Create a console program with a method `static void Swap(ref double a, ref double b)` and a method that sorts three floating-point numbers entered by the user in descending order.
43. Create a console program with a method `static double Average(params double[] values)` that returns 0 for an empty set, and demonstrate calls with different numbers of arguments and with an array entered by the user.
44. Create a console program with a static class containing overloaded `Max` methods for two and three integers and for a `double[]` array, and demonstrate calls to them.
45. Create a console program with a recursive method that calculates the sum of the digits and the number of digits of a natural number entered by the user.
46. Create a console program with a recursive binary search method in a sorted array that returns the index of the found element or −1, and demonstrate it on an array of 20 random numbers.
47. Create a console program with a recursive method that generates all permutations of a string of distinct characters entered by the user (up to 6 characters) and prints their number.
48. Create a console program with a method `static double PowerRec(double x, int n)` that calculates a power recursively (including for negative *n*) and compares the result with `Math.Pow`.
49. Create a console program with a method that returns the minimum, maximum, and average of an integer array through `out` parameters, and a method `TryParseNumbers(string text, out int[] numbers)` for parsing an entered string.
50. Create a console program that calculates the *n*th Fibonacci number (up to 90) with a recursive method with memoization and with a loop, and prints both results and the number of recursive calls.

## Topic 6. Debugging and exceptions

51. Create a console program that asks for two integers and prints the result of dividing them, catching `FormatException`, `DivideByZeroException`, and `OverflowException` in separate `catch` blocks and printing a completion message in the `finally` block.
52. Create a console program with a method `Withdraw(decimal balance, decimal amount)` that throws `ArgumentOutOfRangeException` for a nonpositive amount and `InvalidOperationException` for insufficient funds, and demonstrate catching both exceptions.
53. Create a console program that reads lines with integers until an empty line, skips invalid lines with a message to `Console.Error`, and prints the sum of the numbers and the number of invalid lines.
54. Create a console program that gives the user three attempts to enter a number from 1 to 100 and exits with code 1 after three failed attempts, using an `int.TryParse` check without exceptions.
55. Create a console program with a method `ParseTime(string text)` that throws `FormatException` for a string not in the `hh:mm` format and `ArgumentOutOfRangeException` for hours or minutes out of range, and handle the exceptions with a `when` filter.
56. Create a console program with a custom exception class `InvalidGradeException`, a method that checks a grade from 0 to 100, and exception handling that prints the invalid value.
57. Create a console program that calculates the average of an array entered as a string and throws `InvalidOperationException` for an empty array, while the main program catches the exception and repeats the input.
58. Create a console program that converts the command-line arguments to numbers, prints the sum, reports invalid arguments to `Console.Error`, and returns exit code 0 or 1.
59. Create a console program in which a line-parsing method wraps a `FormatException` in a new exception with the line number and an `InnerException`, and the main program prints both messages.
60. Create a console program that uses `Debug.Assert` to check that an array is ordered after sorting and `Debug.WriteLine` to trace the steps of a selection sort.

## Topic 7. Classes and objects

61. Create a `Rectangle` class with width and height properties that check for positive values, constructors (the side of a square; a width and a height) chained with `this`, and computed area and perimeter properties; demonstrate how it works in a console program.
62. Create a `BankAccount` class with a private balance, a read-only property, and deposit and withdrawal methods with exceptions, and demonstrate operations with two accounts.
63. Create a `Student` class with `required` surname and group properties, an array of grades, and a computed average grade property; print the students with the highest average grade.
64. Create a `Time` class with hours and minutes, validation in the constructor, a method for adding minutes that returns a new object, and a `ToString` method in the `hh:mm` format.
65. Create a `Book` class with `init` properties and an array of five books created with object initializers; print the books published after the entered year in ascending order of year.
66. Create a `Temperature` class with a `Celsius` property that does not allow values below −273.15 and computed `Fahrenheit` and `Kelvin` properties; print a conversion table.
67. Create a `Counter` class with minimum and maximum values set in the constructor, `Increment` and `Decrement` methods that do not go out of bounds, and a `Value` property.
68. Create a `Product` class with a name, a price, and a quantity and a `Cart` class with an array of products, an add method, and a total cost property; print a receipt.
69. Create a `Point` class with coordinates and a method for the distance to another point, and a `Triangle` class whose constructor checks that the points do not lie on one line; print the perimeter and area.
70. Create a `Stopwatch`-like timer class `LapCounter` with an array of laps, a method for adding a lap, and methods for finding the best and average lap; print a report.

## Topic 8. Encapsulation, static members

71. Create a `BankAccount` class with a private balance, the invariant “the balance is nonnegative,” deposit and withdrawal methods, and a method that returns a copy of the transaction history.
72. Create an `Order` class with a static counter that assigns each order the number `ORD-0001`, `ORD-0002`…, and a static property for the number of orders created.
73. Create a static `Converter` class with constants for coefficients and methods for converting length, mass, and temperature, and demonstrate calls to them through `using static`.
74. Create a `Temperature` class with a private constructor and the factory methods `FromCelsius` and `FromFahrenheit`, which do not allow values below absolute zero.
75. Create a `Group` class with a private array of students and a method that returns a defensive copy; show that changing the copy does not change the group.
76. Create a class with a static constructor that initializes a `static readonly` field with the program start date, and demonstrate the order in which the static and regular constructors are called.
77. Create a `Counter` class with a `Value` property with `private set`, `Increment` and `Reset` methods, and a static field that counts the total number of increments of all counters.
78. Create a solution with a class library containing a public `Calculator` class and an `internal` argument validation class, and a console application that uses the calculator.
79. Create a `Product` class with an immutable SKU, a private price, a price change method that does not allow a change of more than 30%, and a static method that checks the SKU format.
80. Create a static `TextUtils` class with methods for counting words, checking for a palindrome, and normalizing spaces, and demonstrate them in a console program.

## Topic 9. Inheritance and polymorphism

81. Create a `Shape` base class with virtual `Area` and `Perimeter` methods and the derived classes `Circle`, `Rectangle`, and `Triangle`; print the characteristics of the shapes of a polymorphic array and the shape with the largest area.
82. Create an `Employee` → `Manager`, `Developer` hierarchy with calls to `base(…)`, a virtual pay calculation method, and a payroll for a polymorphic array.
83. Create a `Point` class with overridden `ToString`, `Equals`, and `GetHashCode` and show the difference between `==` and `Equals` for two points with the same coordinates.
84. Create an `Animal` → `Dog`, `Cat` hierarchy and an array of animals; using the `is` type pattern, count the dogs and cats and call a type-specific method of each.
85. Create the classes `Logger` and `FileLogger` and demonstrate the difference between overriding with `override` and hiding with `new` when calling through variables of the base and derived types.
86. Create a custom exception class `InvalidAgeException` with three standard constructors and a property with the invalid value, and demonstrate throwing and catching it.
87. Create an account hierarchy `Account` → `SavingsAccount`, `CreditAccount` with a virtual monthly accrual method and a `protected` balance property.
88. Create a sealed `Circle` class derived from `Shape` and show that inheriting from it is impossible; explain the compiler error in a comment.
89. Rework the incorrect hierarchy “a car is an engine” into composition: a `Car` class with an `Engine` field and an array of `Wheel`, with methods that delegate actions to the parts.
90. Create a message hierarchy `Message` → `Email`, `Sms` with address validation in the constructors and a virtual cost method, and print the total sending cost.

## Topic 10. Abstract classes, interfaces

91. Create an abstract `Shape` class with abstract `Area` and `Perimeter` methods and the derived classes `Circle` and `Square`; print the shapes of a polymorphic array sorted by area.
92. Create an abstract `Report` class with a `Print` template method that calls an abstract method for the body of the report, and two implementations of the report.
93. Create an `ISwitchable` interface and the classes `Lamp` and `Fan` that implement it; turn on all the devices of an array through an interface variable.
94. Create a class that implements two interfaces with the same `Show` method using explicit implementation, and show how to call each implementation.
95. Create a `Student` class that implements `IComparable<Student>` by average grade and an `IComparer<Student>` class by surname; sort an array in both ways.
96. Create a `LogFile` class that implements `IDisposable` and demonstrate the call to `Dispose` in a `using` statement, including when an exception occurs.
97. Create an interface with a default member and two classes, one of which provides its own implementation of this member; print the results of calling it through the interface.
98. Create the interfaces `IFlyable` and `ISwimmable` and animal classes that implement one or both; for an array of animals, print who can fly and swim.
99. Create an abstract `Employee` class with an abstract pay calculation method and an `IBonus` interface that only managers implement; calculate the payroll fund.
100. Create a `Book` class that implements `IEquatable<Book>` with overridden `Equals` and `GetHashCode`, and check the equality of two books with the same ISBN.

## Topic 11. Structures, records, tuples

101. Write a console program with an immutable structure for a point in the plane (coordinates `X`, `Y`) and a method that calculates the distance between points; show that assignment copies the value.
102. Write a console program that uses a `Counter` structure and class with a counter field to show the difference between them during assignment and passing to a method.
103. Write a console program with a positional record `Product` (name, price) that demonstrates value equality, `ToString`, and creating a copy with a changed price using a `with` expression.
104. Write a console program with a `readonly record struct Temperature` (a value in degrees Celsius) that sorts an array of temperatures and prints the result.
105. Write a console program with an enumeration of the days of the week that reads a day from the keyboard with the `Enum.TryParse` method, checks it with `Enum.IsDefined`, and prints its number or an error message.
106. Write a console program with a flag enumeration of access rights (read, write, delete) that demonstrates combining, checking, and removing rights.
107. Write a console program with a traffic light state machine: an enumeration of states and a `switch` expression determine the next state; print the sequence of states.
108. Write a console program with a method that returns the minimum and maximum elements of an array as a tuple; deconstruct the result and print it.
109. Write a console program with a `Student` class (name, group, average grade) and a `Deconstruct` method; use deconstruction in a `foreach` loop to print a list of students.
110. Write a console program that classifies `Point(int X, int Y)` records (the origin, a point on an axis, the quadrant number) with a `switch` expression using positional patterns and property patterns.

## Topic 12. Operators and indexers

111. Create a rational fraction structure (numerator, denominator) with the `+` and `*` operators and fraction reduction. The console program calculates and prints the sum and product of two entered fractions.
112. Create a `Point` class (x, y) with the `==` and `!=` operators consistent with `Equals` and `GetHashCode`. The console program compares several points and prints the results.
113. Create a `Money` class with a `decimal` amount and the `<` and `>` operators. The console program sorts an array of amounts using these operators and prints it.
114. Create a `Meters` structure with an implicit conversion from `int` and an explicit conversion to `int`. The console program demonstrates both conversions and prints the results.
115. Create a `Temperatures` class with an indexer by day-of-week number (1–7) that returns and sets a temperature, with bounds checking. The console program fills in a week and prints the temperatures.
116. Create a `double` matrix class with a two-dimensional indexer `[i, j]` and a `+` operator. The console program adds two 3×3 matrices and prints the result.
117. Create a glossary class with a string indexer that returns and sets a definition. The console program prints the definition of the entered term.
118. Create the extension methods `IsPalindrome` and `WordCount` for `string`. The console program applies them to an entered string and prints the results.
119. Create the extension methods `IsEven` and `Digits` (an array of a number’s digits) for `int`. The console program prints the parity and digits of several numbers in a loop.
120. Create an `extension` block for `DateTime` with an `IsWeekend` property. The console program prints the dates of the next 14 days, marking the weekends.

## Topic 13. Generics and collections

121. Create a generic method `FindMin<T>` with an `IComparable<T>` constraint and apply it to arrays of numbers and strings.
122. Create a generic class `Box<T>` with a `TryGet(out T value)` method that returns `default` when the box is empty.
123. Create a generic container class `Storage<T> where T : class` with adding, searching for, and printing elements.
124. Write a console program that adds, inserts, and removes elements in a `List<T>` of products (name, price), sorts the list with an `IComparer<T>` comparer by price, and prints the result.
125. Write a console program that counts the frequency of the words of an entered text, ignoring case, using a `Dictionary<string, int>` and prints the words with their frequencies.
126. Write a console program that uses a `HashSet<T>` to find and print the elements common to two entered arrays of numbers and the elements that are in only one of them.
127. Write a console program that checks the correctness of the brackets `()`, `[]`, `{}` in an entered string using a `Stack<char>` and prints the result.
128. Write a console program that simulates serving customers: regular ones in a `Queue<T>` and priority ones in a `PriorityQueue<TElement, TPriority>` by priority level, and prints the order of service.
129. Write a console program that fills a `LinkedList<T>` with strings, inserts an element after a found node, removes a given node, and prints the list.
130. Write a console program with a `yield return` iterator method that returns the Fibonacci numbers not greater than an entered number, and print them.

## Topic 14. Delegates, lambdas, events

131. Write a console program that declares a delegate type for a binary operation on integers, calls three different methods (sum, product, power) through it, and prints the results.
132. Create a multicast `Action<string>` delegate with three methods, remove one method, and call the delegate.
133. Create a method that tabulates a function with a `Func<double, double>` parameter and call it for a library method and a lambda expression.
134. Write a console program that selects (`FindAll`) and removes (`RemoveAll`) elements from a list of integers by `Predicate<int>` conditions defined by lambda expressions and prints the results.
135. Create a `Student` record (surname, score) and sort a list of students with the `Sort` method and a `Comparison<Student>` lambda by score in descending order and, for equal scores, by surname; print the result.
136. Create a higher-order function that returns the composition of two `Func<double, double>` functions.
137. Create a counter closure and demonstrate that two counters are independent.
138. Write a console program that demonstrates the trap of capturing a `for` loop variable in lambdas stored in a `List<Action>` and fixes it with a local copy of the variable.
139. Create a `Thermometer` class with a `TemperatureChanged` event following the `EventHandler<TEventArgs>` pattern (a custom `EventArgs` with the old and new temperature) and two subscribers that print the changes.
140. Create an event without data (`EventHandler`), subscribe to it with a method and with a lambda stored in a variable, and unsubscribe in both ways.

## Topic 15. LINQ

141. Write a console program with a list of products (record `Product`: name, category, price). Select the products of the entered category, sort them by price, and print the names and prices as anonymous objects (`Select`).
142. Write a console program with a list of students (full name, group, score). Select the students of the entered group with a score of 60 or more, sort them by score, and print the full names; write the query in both method syntax and query syntax.
143. Write a console program with a list of students’ grades (full name, score). Calculate the count, average, minimum, and maximum of the scores and find the student with the highest score (`MaxBy`).
144. Write a console program with a list of orders (customer, date, amount). Group the orders by customer (`GroupBy`) and print the number and total of each customer’s orders.
145. Write a console program with lists of groups (identifier, name) and students (full name, group identifier). Join them (`Join`) and print the group name for each student.
146. Write a console program with lists of departments (identifier, name) and employees (full name, department identifier). Using `GroupJoin` or `LeftJoin`, print all departments with the number of employees, including empty ones.
147. Write a console program with two lists of the names of exhibition visitors (the first and second day). Find the visitors of both days, all visitors, and those who came only on the first day (`Intersect`, `Union`, `Except`).
148. Write a console program that prints a list of 50 products (name, price) page by page, 10 records per page: the user enters a page number, and the selection is made with `Skip` and `Take`.
149. Write a console program with a list of numbers that demonstrates the deferred execution of a LINQ query: change the list after creating the query and show the difference between iterating the query again and the result captured with `ToList`.
150. Write a console program that reads text from the console, counts word frequencies ignoring case (`CountBy`), and prints the five most frequent words.

## Topic 16. Files, streams, JSON

151. Write a console program that writes an array of strings to a text file, reads the file, and prints the number of lines and words.
152. Write a console program that reads a CSV file with numbers written with a period (`CultureInfo.InvariantCulture`), skips invalid lines, and prints the sum.
153. Write a console program that, for an entered directory, prints the files including subdirectories, their sizes, and the total size.
154. Write an event log console program that appends entered events with the time to a text file through a `StreamWriter` in append mode and prints the log through a `StreamReader`.
155. Write a console program that writes fixed-length product records (code, price) to a binary file and reads the record with the entered number.
156. Write a console program that reads a text file at an entered path and handles the `FileNotFoundException`, `DirectoryNotFoundException`, and `IOException` exceptions with messages.
157. Write a console program that serializes a list of students (name, group, average grade) to JSON with indentation and camelCase names, deserializes it, and prints it.
158. Create an application settings class with default values and the `[JsonPropertyName]` and `[JsonIgnore]` attributes. The console program saves the settings to JSON and reads them back.
159. Write a console program that saves a list of tasks with a priority enumeration, written by name with `JsonStringEnumConverter`, to JSON and reads it back.
160. Write a console program that safely saves a list of notes to a file through a temporary file and `File.Move`, and at startup reads them if the file exists.

## Topic 17. SOLID and design patterns

161. Create a console program in which an `OrderProcessor` class calculates the order total, saves the order to a file, and sends a notification; identify the violation of the single responsibility principle and split the class into a calculator, a repository, and a notifier. Process an order and print the result.
162. Create a console program for calculating the areas of shapes (circle, rectangle, triangle) in which a `switch` on the shape type is replaced by polymorphism according to the open/closed principle. Print the areas of a list of shapes.
163. Create a console program with a `Rectangle`/`Square` hierarchy that shows a violation of the Liskov substitution principle, and fix the hierarchy. Print the results of polymorphic code before and after the fix.
164. Create a console program in which a “fat” device interface `IMachine` (print, scan, fax) is split according to the interface segregation principle; a simple printer and a multifunction device implement only the interfaces they need.
165. Create a console program in which an order service receives a repository and a notifier (interfaces) through its constructor, and the objects are assembled in the composition root. Place an order and print the result.
166. Create a console program with the Strategy pattern for calculating the shipping cost (standard, express, pickup). The user enters the weight of a parcel and chooses a method, and the program prints the cost.
167. Create a console program with the Decorator pattern: milk and syrup, which change the description and price, are added to a beverage (name, price). Print several beverages with different add-ons.
168. Create a console program with the Observer pattern based on an interface or events: a promotion changes the price, and subscribers (display, log) receive notifications. Change the price several times and print the notifications.
169. Create a console program with the Command pattern for a text editor: commands for inserting and deleting text with the methods `Execute` and `Undo` and a command history. Execute and undo several commands, printing the text.
170. Create a console program with the Factory Method pattern (creating a vehicle by name) or the Adapter pattern (a third-party thermometer in degrees Fahrenheit adapted to an interface in degrees Celsius). Demonstrate how it works through a common interface.

## Topic 18. Testing and refactoring

171. Create a method that calculates the area of a rectangle and MSTest tests following the Arrange–Act–Assert pattern.
172. Create a method that determines a leap year and a parameterized MSTest test with `[DataRow]`.
173. Create a method that converts a 100-point score into “excellent,” “good,” “satisfactory,” or “unsatisfactory,” choose boundary values, and write MSTest tests.
174. Create a method with a check of an argument’s range and an MSTest test that checks that `ArgumentOutOfRangeException` is thrown for an invalid argument.
175. Create a method with a `double` result (for example, the area of a circle) and an MSTest test with a tolerance.
176. Create a repository interface, a service that uses it, and a fake in-memory implementation of the repository for MSTest tests of the service.
177. Create a method that depends on the current time through `TimeProvider` (for example, a greeting by time of day) and MSTest tests with `FakeTimeProvider`.
178. Use TDD to develop a palindrome check method, showing the sequence of tests.
179. Write a method for calculating the cost of an order with “code smells” (a long method, magic numbers) and perform the Extract Method and Introduce Constant refactorings.
180. Write a method with poor variable names, MSTest characterization tests for it, and rename the variables and the method without changing its behavior.
