---
title: "Tasks"
description: "Topic 6. Debugging and exceptions: task variants"
outline: [2, 3]
sourceHash: "4bf828c4bfb43b47573257cb483d4a9ae48db126f0b1a1c3ab2eccd57b731046"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Time calculator {#v1}

**1. Initial level.** Create a console program that requests two times in `hh:mm` format, converts them with `TimeOnly.Parse` in a `try` block, and prints their sum and difference in minutes. If a `FormatException` occurs, print an invalid-format message.

**2. Basic level.** Create a console program that repeatedly reads expressions of the form `hh:mm + hh:mm` or `hh:mm - mm min`, calculates the result, and repeats the prompt after an error. Parsing is performed by a method that throws `FormatException` with an explanation and the error position; hours outside 0–23 or minutes outside 0–59 cause `ArgumentOutOfRangeException`. Handle each exception type in a separate `catch` block.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that evaluates expressions containing durations and times from arguments (`08:15 + 2h30m - 45m`), supports crossing midnight with `--wrap`, and throws `OverflowException` without that option. Send parsing errors to `Console.Error` with the character position and exit code 2, and overflow errors with code 3. The `--debug` option prints intermediate values through `Debug.WriteLine` and checks the “result is within one day” invariant with `Debug.Assert`.

### Variant 2. Parsing dates {#v2}

**1. Initial level.** Create a console program that requests a date in `dd.MM.yyyy` format, converts it with `DateTime.ParseExact` in a `try` block, and prints the day of the week. On `FormatException`, print a message with an example of the correct format.

**2. Basic level.** Create a console program that gives the user up to three attempts to enter a birth date. For each failed attempt, print the reason (invalid format, future date, or age over 120; the last two checks throw `ArgumentOutOfRangeException` in a separate method). Exit with code 1 after three failed attempts.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that reads dates from standard input in several formats (`dd.MM.yyyy`, `yyyy-MM-dd`, and `d MMMM yyyy` in Ukrainian), normalizes them to ISO 8601, and skips invalid lines, writing the line number, text, and exception type to `Console.Error`. At the end, print a summary: the number of successful and erroneous lines grouped by error type; the exit code is 0 or 1. The `--strict` option stops processing at the first error with code 2.

### Variant 3. Ordering pizza {#v3}

**1. Initial level.** Create a console program that requests a pizza size (`S`, `M`, `L`) and quantity, determines the price with a `switch` expression whose `_` arm throws `ArgumentException`, and catches the exception in the main program to report an unknown size.

**2. Basic level.** Create a console program for placing a pizza order. Repeatedly request items as `size quantity toppings` and validate them with an `AddItem` method that throws `ArgumentOutOfRangeException` for a quantity outside 1–20 and `ArgumentException` for an unknown topping. Do not add an invalid item; print the current total in a `finally` block each time.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that processes orders from standard input (`number;items;address;time`), validates the menu, minimum delivery total, and pizzeria opening hours, creates a custom `OrderValidationException` class listing all violations in an order, and prints an “accepted / rejected with reasons” report. Send rejected orders to `Console.Error`; exit codes: 0, 1 (some rejected), 2 (input format error).

### Variant 4. Cash register {#v4}

**1. Initial level.** Create a console program with products represented by parallel arrays of codes and prices, and a `FindPrice(int code)` method that throws `InvalidOperationException` for an unknown code. Request codes until an empty line and print the receipt total, catching exceptions.

**2. Basic level.** Create a cash register console program with the commands `add code quantity`, `remove code`, `pay amount`, and `cancel`. Handle command errors in separate `catch` blocks; insufficient payment causes `InvalidOperationException`. A `finally` block prints the receipt state after each command; `cancel` clears the receipt.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that processes a cash register transaction log from standard input: opening a receipt, adding products, discounts, payment, and returns. Process each receipt in `try`; on an error (unknown product, payment without an open receipt, negative amount), cancel the receipt in `finally` and restore inventory. Print a shift report as a table and errors to `Console.Error` with line numbers; exit codes: 0, 1, 2.

### Variant 5. User registration {#v5}

**1. Initial level.** Create a console program that requests a username (3–16 Latin letters and digits) and age. Validate the data in `Register(string login, int age)` using the helpers `ArgumentException.ThrowIfNullOrWhiteSpace` and `ArgumentOutOfRangeException.ThrowIfLessThan`, and print the caught exception's message.

**2. Basic level.** Create a registration console program that checks the username, email, password, and age in separate methods that throw `ArgumentException` with the field name (`ParamName`). Collect all errors in a string array instead of stopping at the first, and print them as a list; repeat the form until every field is valid.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that validates registration requests in CSV format from standard input, uses a custom `ValidationException` class with `Field` and `Value` properties, checks username and email uniqueness without regard to case, and reports by field (the number of errors of each type). Send invalid CSV lines to `Console.Error`; exit codes: 0, 1, 2.

### Variant 6. ISBN validation {#v6}

**1. Initial level.** Create a console program with an `int CheckDigitIsbn13(string first12)` method that throws `FormatException` if the string does not contain exactly 12 digits. For the entered string, print the check digit or the caught exception's message.

**2. Basic level.** Create a console program that repeatedly reads ISBN-10 or ISBN-13 values with or without hyphens, checks the format and check digit (for ISBN-10, `X` is allowed only at the end), throws `FormatException` for an invalid format and `InvalidOperationException` for an incorrect check digit, and prints the validation result and the ISBN-10 to ISBN-13 conversion.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that validates ISBN values from standard input and arguments, with the options `--convert 13|10`, `--format` (separate groups with hyphens), and `--fix` (find one incorrect digit). Process each ISBN in a separate `try`, group errors by exception type and send them to `Console.Error`, and with `--break-on-error`, stop at the first error with code 2.

### Variant 7. Scholarship calculation {#v7}

**1. Initial level.** Create a console program with a `decimal Scholarship(double average)` method that throws `ArgumentOutOfRangeException` for an average score outside 0–100. Print the scholarship or an error message for three students whose data is defined in the program.

**2. Basic level.** Create a console program that reads a student's grades as a space-separated line, parses them with `ParseGrades`, calculates the average with `Average` (which throws `InvalidOperationException` for an empty list), and calculates the scholarship. Wrap exceptions from nested methods in `FormatException` with `InnerException`, and print both messages.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that calculates scholarships for a group from standard input (`surname;grades;benefits`) using rules from `--min-average`, `--base`, and `--bonus`. Wrap each line's errors in an exception with the line number and `InnerException`. The report contains a scholarship table and an “Errors” section with chains of inner exceptions. Exit codes: 0, 1 (errors occurred), 2 (invalid options).

### Variant 8. Matrix calculator {#v8}

**1. Initial level.** Create a console program with an `int[,] Add(int[,] a, int[,] b)` method that throws `ArgumentException` for matrices of different sizes. Add two pairs of matrices defined in the program, catching the exception for the second pair.

**2. Basic level.** Create a console matrix calculator with a menu (addition, multiplication, transposition) that reads matrices by row and throws `ArgumentException` for incompatible dimensions and `FormatException` for invalid elements. After any error, the menu continues running and a message goes to `Console.Error`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that evaluates a matrix expression from arguments (`A * B + C'`, with named matrices loaded from standard input), throws a custom `MatrixDimensionException` with the operand dimensions and operation position in the expression, and throws `InvalidOperationException` when calculating the determinant of a nonsquare matrix. Send errors to `Console.Error`; exit codes: 0, 1, 2.

### Variant 9. Robot commands {#v9}

**1. Initial level.** Create a console program that moves a robot on a 10×10 board using `U`, `D`, `L`, and `R` commands from a user-entered string and throws `InvalidOperationException` if the robot leaves the board. Print the robot's position or a message with the command number.

**2. Basic level.** Create a console program that executes the robot commands `forward N`, `left`, `right`, `pick`, and `drop` from the keyboard. An unknown command causes `FormatException`; leaving the board or colliding with an obstacle causes `InvalidOperationException`; attempting `pick` without an object is handled by a custom check. After an error, the robot stays at its previous position and the program continues accepting commands.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that runs a robot program from a file supplied through standard input (with `repeat N { … }` loops), checks syntax and reports line numbers, throws exceptions for dangerous actions during execution, and with `--trace` prints a tracepoint-like state log through `Debug.WriteLine`. The `--max-steps` option prevents infinite programs (`InvalidOperationException`). Exit codes: 0, 1 (runtime error), 2 (syntax error).

### Variant 10. Bank transfer {#v10}

**1. Initial level.** Create a console program with a `Transfer(ref decimal from, ref decimal to, decimal amount)` method that throws `ArgumentOutOfRangeException` for a nonpositive amount and `InvalidOperationException` for insufficient funds. Perform three predefined transfers and print the balances after each.

**2. Basic level.** Create a console program with accounts in an array that repeatedly executes transfer commands `number1 number2 amount`, checks account numbers (catch `IndexOutOfRangeException` and replace it with a clear message), and checks the daily limit and insufficient funds with a custom `InsufficientFundsException` class. A failed transfer must not change either balance.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that processes a batch of transfers from standard input transactionally. With `--atomic`, an error in any transfer rolls back all changes in the batch (restore a saved copy of the balances in `catch`); without the option, only the failed transfer is canceled. The report contains final balances and an error table with exception types; exit codes: 0, 1, 2.

### Variant 11. Train schedule {#v11}

**1. Initial level.** Create a console program that requests a train's departure and arrival times in `hh:mm` format, calculates the journey duration allowing for crossing midnight, and catches `FormatException` for an invalid time format.

**2. Basic level.** Create a console program that reads schedule lines `number;departure;arrival;platform` until an empty line, checks the format (`FormatException` with a line number) and platform occupancy (`InvalidOperationException` if stop intervals on the same platform overlap), and prints the accepted schedule and a list of rejected lines.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that validates a station schedule from standard input: format, unique numbers, overlapping platform intervals including preparation time `--gap`, and the minimum transfer time between trains from `--connections`. Each violation is a separate exception; the report groups errors by type. Invalid lines do not stop validation; exit codes: 0, 1, 2.

### Variant 12. Electronic gradebook {#v12}

**1. Initial level.** Create a console program with an `AddGrade(int[] grades, int index, int value)` method that throws `ArgumentOutOfRangeException` for a grade outside 1–12. Assign grades from an input array, catching exceptions for invalid values and indices.

**2. Basic level.** Create a console gradebook program with the commands `set subject day grade`, `avg subject`, and `report`. Store grades in a subjects × days matrix; an invalid subject, day, or grade causes an exception with an explanation, and calculating an average for a subject with no grades causes `InvalidOperationException`. Catch all exceptions in the main loop.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that imports a class gradebook from standard input, checks the scale (`--scale 12|100|5`), dates within the semester, and duplicate grades, throws a custom `GradeImportException` with the line number and field, and produces an academic performance report with an errors section. Exit codes: 0, 1 (errors occurred), 2 (invalid options).

### Variant 13. Fertilizer dosage {#v13}

**1. Initial level.** Create a console program that calculates the fertilizer quantity from the field area (ha) and application rate (kg/ha). The calculation method throws `ArgumentOutOfRangeException` for nonpositive values and a rate over 500 kg/ha; catch the exception and print a message.

**2. Basic level.** Create a console program that reads several fields as `name area crop` lines, determines the crop's fertilizer rate with a `switch` expression (an unknown crop causes `ArgumentException`), checks area limits, and calculates the required number of 50 kg bags. Skip an invalid line with a message to `Console.Error`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that calculates a fertilizer application plan for fields from standard input, accounting for soil nutrients, crop rates from `--norms`, and warehouse inventory `--stock`. Exceeding a safe rate causes a custom `SafetyLimitException`; insufficient stock causes `InvalidOperationException`. Do not create plans for fields with errors; include the reasons in the report; exit codes: 0, 1, 2.

### Variant 14. Meter readings {#v14}

**1. Initial level.** Create a console program that requests previous and current water meter readings and contains a `Consumption(int previous, int current)` method that throws `InvalidOperationException` if the current reading is lower than the previous one. Print consumption or a message.

**2. Basic level.** Create a console program that requests meter readings for each of 12 months and repeats each month's input until the value is valid (a number no lower than the previous reading, with an increase no greater than 100 m³). Print the reason for each rejection and, at the end, a consumption table and total amount.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that processes readings from several meters from standard input (`meter;date;reading`), detects decreasing readings (a meter replacement with `--replacements` or an error), missing months, and abnormal consumption (`--max-delta`), throwing a separate exception for each case. Print a consumption report with an errors section; exit codes: 0, 1, 2.

### Variant 15. Numerical integration {#v15}

**1. Initial level.** Create a console program with an `Integrate(double a, double b, int n)` method for sin *x* using the rectangle rule. It throws `ArgumentOutOfRangeException` for *n* ≤ 0 and `ArgumentException` for *a* ≥ *b*. Calculate the integral over [0; π] and test invalid calls.

**2. Basic level.** Create a console program that requests a function (1 — 1/*x*, 2 — √*x*, 3 — ln *x*), bounds, and number of subintervals, calculates the integral using the trapezoidal rule, and checks the result with `double.IsNaN` and `double.IsInfinity`. If the function is undefined within the integration bounds, the method throws `ArithmeticException` with an explanation instead of printing `NaN`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that integrates functions selected with `--function` using the rectangle, trapezoidal, and Simpson's rules, automatically doubling the number of subintervals until the `--eps` accuracy is reached. If accuracy is not reached within `--max-iterations`, throw `InvalidOperationException`; detect singular points (`NaN`, infinity) and report their coordinates. Send intermediate results through `Debug.WriteLine`; exit codes: 0, 1, 2.

### Variant 16. Importing temperatures {#v16}

**1. Initial level.** Create a console program that parses an array of `city;temperature` strings defined in the program. For each line, convert the temperature with `double.Parse` in a separate `try` and print the city and temperature or an invalid-line message.

**2. Basic level.** Create a console program that reads `date;city;temperature` lines until an empty line, skips lines with an invalid date, number, or temperature outside −60…60 °C (a separate exception type for each case), and prints the average temperature for each city and the number of skipped lines grouped by reason.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that imports weather data from standard input with the options `--culture uk|invariant` (decimal separator), `--max-errors N` (exceeding it stops the import with code 2), and `--errors-only`. Wrap each line's errors in an exception with the line number and `InnerException`; include statistics by city and an error table in the report; exit codes: 0, 1, 2.

### Variant 17. Hotel reservations {#v17}

**1. Initial level.** Create a console program with a `Book(bool[] rooms, int room)` method that throws `ArgumentOutOfRangeException` for a nonexistent room and `InvalidOperationException` for an occupied one. Book rooms from an array of requests and print each result.

**2. Basic level.** Create a reservation console program with check-in and check-out dates (`dd.MM.yyyy`) that stores room occupancy for 30 days in a matrix. Check that check-out is later than check-in (`ArgumentException`), dates fall within the season, and the room is available for every night; an impossible reservation must not change the matrix.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that processes reservation, cancellation, and stay-extension requests from standard input, suggests an alternative room if there is a conflict, throws custom exceptions for violations (exceeding capacity, minimum number of nights), and prints final occupancy. Options: `--rooms`, `--season`; exit codes: 0, 1 (some requests rejected), 2.

### Variant 18. Tax calculator {#v18}

**1. Initial level.** Create a console program that calculates 18% income tax and a 5% military levy for an entered amount, uses `Debug.Assert` to check that total taxes do not exceed income, and uses `Debug.WriteLine` to print intermediate values in the *Output* window.

**2. Basic level.** Create a console program that calculates taxes for several incomes entered on one line, uses `Debug.Assert` for invariants (tax is nonnegative, net income does not exceed gross income), and validates input with exceptions. In the report, describe how the program behaves differently in Debug and Release configurations.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that calculates taxes using progressive brackets from `--brackets`, validates the brackets (increasing boundaries, rates of 0–100%) with exceptions, and checks internal algorithm invariants with `Debug.Assert`. The `--trace` option enables detailed step tracing through `Debug.WriteLine`; send input errors to `Console.Error` with exit code 2.

### Variant 19. Parking lot {#v19}

**1. Initial level.** Create a console program with a `Park(string[] places, string plate)` method that throws `InvalidOperationException` if no spaces are available and `ArgumentException` for an empty license plate. Park cars from an array and print the result of each attempt.

**2. Basic level.** Create a parking management console program with the commands `in plate`, `out plate`, and `status`. Check the license plate format (`FormatException`); duplicate entry and departure of an absent car cause `InvalidOperationException`. A `finally` block prints the number of free spaces after each command.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that processes an entry and exit log from standard input, calculates charges, detects anomalies (departure without entry, entry when full, invalid time) with separate exceptions, and produces a shift report. Options: `--places`, `--rate`; with `--strict`, the first anomaly terminates the program with code 2; otherwise, send anomalies to `Console.Error` and use code 1.

### Variant 20. Vending machine {#v20}

**1. Initial level.** Create a console program with a `Buy(int[] stock, int item)` method that throws `InvalidOperationException` if the product is out of stock. Catch `IndexOutOfRangeException` for a nonexistent product number and replace it with a clear message.

**2. Basic level.** Create a console vending machine program that accepts coins and a product selection and returns change. Handle an unavailable product, insufficient payment, and inability to make change with exceptions, and return the inserted money to the user in `catch`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that simulates a machine using commands from standard input (`coin`, `select`, `cancel`, `service refill`), with a limited supply of change coins and a service mode. Perform each operation transactionally: restore the machine state if an exception occurs. Print the cash collection report as a table and errors to `Console.Error`; exit codes: 0, 1, 2.

### Variant 21. Athlete statistics {#v21}

**1. Initial level.** Create a console program with an `Average(int[] results)` method that throws `InvalidOperationException` for an empty array. Calculate the average results of three athletes (one array is empty), catching the exception.

**2. Basic level.** Create a console program that reads athletes' results as `name results` lines until an empty line and calculates the average, best result, and percentage improvement between the first and last performances. Handle division by zero and empty data with exceptions containing explanations, and list athletes with errors in a separate section.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that processes competition records from standard input, checks the result format (`m:ss,ms` for running, meters for jumping) based on the discipline, throws exceptions for invalid and impossible results (`--limits`), and builds rankings and statistics marking disqualified entries. Exit codes: 0, 1, 2.

### Variant 22. Coordinates {#v22}

**1. Initial level.** Create a console program that requests latitude in decimal degrees, converts it with `double.Parse` in a `try` block, and throws `ArgumentOutOfRangeException` for values outside −90…90, printing the message of each caught exception.

**2. Basic level.** Create a console program that parses coordinates in `47°54'36"N 33°23'28"E` format, throws `FormatException` with the position of the first invalid character and the name of the expected element (degrees, minutes, seconds, hemisphere), and prints decimal degrees or a message. Repeat input until valid data is entered.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that converts coordinates from standard input between DD, DMM, and DMS formats (`--to`), supports negative values and hemisphere letters, detects contradictions (a negative value with S), and sends errors with character positions to `Console.Error`. The `--distance` option calculates distances between successive points; exit codes: 0, 1, 2.

### Variant 23. Ticket office {#v23}

**1. Initial level.** Create a console program that sells tickets for a screening with 50 seats. The `Sell(int count)` method throws `ArgumentOutOfRangeException` for a quantity outside 1–10 and `InvalidOperationException` if there are not enough seats; process predefined requests.

**2. Basic level.** Create a ticket office console program that requests the viewer's age, ticket type, and quantity, determines the price including concessions, checks age (0–120) and the movie's age restriction, repeats the prompt after an error, and moves on to the next customer after three failed attempts. Perform all checks in methods that throw exceptions.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that processes ticket orders for several screenings from standard input, checks per-customer limits, age restrictions, and the availability of adjacent seats for a group, and produces a sales report. A custom `BookingException` contains a reason code; group rejections by code in the report; exit codes: 0, 1, 2.

### Variant 24. Inventory management {#v24}

**1. Initial level.** Create a console program with a `Remove(int[] stock, int index, int count)` method that throws `InvalidOperationException` if stock would become negative. Perform predefined operations and print stock levels and error messages.

**2. Basic level.** Create an inventory management console program with the commands `in item-code quantity`, `out item-code quantity`, and `find partial-name`. An unknown item code causes `KeyNotFoundException`; negative stock causes `InvalidOperationException`. Record each exception in a log (a string array) with the time and command, and print the log with `log`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that applies goods movement documents from standard input to warehouse stock. Apply each document completely or not at all (rollback in `catch`), log errors to `Console.Error` with the document number and exception type, and include the numbers of applied and rejected documents in the summary. Exit codes: 0, 1, 2.

### Variant 25. Limiting recursion depth {#v25}

**1. Initial level.** Create a console program with a recursive method that sums the numbers from 1 to *n*, accepts a `depth` parameter, and throws `InvalidOperationException` if the depth exceeds 1000. Catch the exception for *n* = 5000 and report that a loop should be used.

**2. Basic level.** Create a console program that calculates the Ackermann function for entered *m* and *n* using a recursive method with a depth counter. If the depth exceeds a user-specified limit, the method throws an exception; report the maximum depth reached and suggest smaller arguments, preventing `StackOverflowException`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that evaluates recursive functions selected with `--function` (Ackermann, integer partitioning, traversal of a directory tree from a text description), with a `--max-depth` limit. If the limit is exceeded, automatically switch to an iterative implementation with an explicit stack. Log the switch through `Debug.WriteLine` and compare step counts in the report; exit codes: 0, 1, 2.

### Variant 26. Survey {#v26}

**1. Initial level.** Create a console program that asks 3 questions with answer options 1–4, reads each answer with `int.Parse` in a `try` block, catches `FormatException` and `ArgumentOutOfRangeException` (for a number outside 1–4), and repeats the question.

**2. Basic level.** Create a console survey program with 10 questions where answers can be skipped (empty line), invalid answers are handled with exceptions containing explanations, and the final summary shows the number of responses for each option, skipped questions, and completion percentage.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that processes respondents' questionnaires from standard input, checks required questions, dependent questions (if the answer is A, question B is required), and answer ranges, throws a custom `SurveyValidationException` listing violations, and produces a summary report for valid questionnaires. Exit codes: 0, 1, 2.

### Variant 27. Stock quotes {#v27}

**1. Initial level.** Create a console program that parses an array of daily stock price strings (some are `N/A` or empty) in `try`, skips invalid values, and calculates the average price using only valid values.

**2. Basic level.** Create a console program that reads `date;price;volume` quotes until an empty line, handles missing values, negative prices, and invalid dates with separate exceptions, calculates the daily percentage change (handle division by zero for a zero price), and prints a table marking missing days.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that processes quotes for several stocks from standard input, fills missing values using linear interpolation (`--fill`) or drops them, detects abnormal jumps (`--max-jump`), calculates a moving average and volatility, and always produces a report even if some data is invalid. Send errors to `Console.Error`; exit codes: 0, 1, 2.

### Variant 28. Encryption tool {#v28}

**1. Initial level.** Create a console program that encrypts entered text using the Caesar cipher for Latin letters. The encryption method throws `ArgumentOutOfRangeException` for a key outside 1–25; catch the exception and repeat the key prompt.

**2. Basic level.** Create a Vigenère cipher console program that checks the key (letters only, nonempty) and text (allowed characters) with methods that throw `ArgumentException` with the position of the first invalid character. Select the mode (encryption or decryption) in a menu; errors must not terminate the program.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that encrypts and decrypts standard input using `--cipher caesar|vigenere|xor-base64` with `--key`. For `xor-base64`, invalid Base64 causes `FormatException`, wrapped in a custom `CipherException` with the algorithm name. The `--verify` option checks that decryption reproduces the original text; exit codes: 0, 1, 2.

### Variant 29. Alarm clock {#v29}

**1. Initial level.** Create a console program that requests an alarm time in `hh:mm` format, converts it with `TimeOnly.ParseExact` in a `try` block, and prints how many hours and minutes remain until the alarm relative to the current time.

**2. Basic level.** Create a console program that lets the user set up to five alarms with days of the week (`07:30 mon,tue,wed`), validates the time and days (an invalid day causes `FormatException` naming it, duplicates cause `InvalidOperationException`), and prints the next alarm occurrence and the `TimeSpan` until it. Repeat input after an error.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that processes alarm schedules from standard input (one-time, daily, by weekday, “every N minutes from … to …”), checks conflicts and invalid intervals with exceptions, and prints all occurrences for the day `--date`. Parsing errors contain the line number and position; exit codes: 0, 1, 2.

### Variant 30. Test results {#v30}

**1. Initial level.** Create a console program that calculates the total score for a 20-question test (question scores are stored in a `byte` array), performs addition in a `checked` context and catches `OverflowException`, then repeats the calculation using `int`.

**2. Basic level.** Create a console program that reads students' answers as `name answers` lines and an answer key, checks the number of answers (`ArgumentException`) and allowed characters (`FormatException`), calculates scores using `checked` arithmetic, and prints a ranking. Send students with errors to `Console.Error`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that checks test results from standard input with question weights `--weights`, wrong-answer penalties `--penalty`, and conversion to a 100-point scale. Use a custom `ScoringException` for inconsistent data, and return exit code 0 (all results calculated), 1 (data errors), or 2 (invalid options).

## Procedure

1. Study the theory and worked examples.
2. Identify possible input and calculation errors for your variant, and decide how to handle each: a condition or `TryParse`, throwing an exception, or catching an exception.
3. Create a solution and project for your task variant.
4. Implement the program for the chosen difficulty level; send error messages to `Console.Error`, and set exit codes for the advanced level.
5. Demonstrate debugging: a breakpoint (including a conditional one), stepping, and the *Locals*, *Watch*, and *Call Stack* windows; test with valid and invalid data.
6. Demonstrate the program to the instructor, explain the code, and answer the review questions.
