---
title: Tasks
description: "Topic 6. Debugging and Errors: task variants"
outline: [2, 3]
sourceHash: "723e478b0ef600e19a067863d135188420d7866363e72c718f30a3bdefaf1589"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

In the report, state which state is preserved after each failure.

## Variants

### Variant 1. A sample card number {#v1}

**1. Initial level.** Create a console program. Read a string of 16 decimal digits; print whether the Luhn checksum is valid. Don’t use real payment data. Check the length and the characters before computing; starting from the right, double every second digit, subtract 9 from results greater than 9; the sum must be divisible by 10. Throw `invalid_argument` for errors.

**2. Basic level.** Create a console program. Read a string of 16 decimal digits; print whether the Luhn checksum is valid. Don’t use real payment data. Return `std::expected<bool, Error>` with the codes Length and Character; for the Luhn sum, starting from the right, double every second digit, reduce values greater than 9 by 9, and check that the sum is divisible by 10. Print the name of the error or the result.

**3. Advanced level.** Create a console program. Read a string of 16 decimal digits; print whether the Luhn checksum is valid. Don’t use real payment data. Process lines until end using expected and `and_then`: length, digits, Luhn sum. Starting from the right, double every second digit and subtract 9 from values greater than 9. Print the result for each line and the count of errors of each kind; an invalid sum must not stop the series.

### Variant 2. ISBN-13 {#v2}

**1. Initial level.** Create a console program. Read the 13 digits of an ISBN without separators; print valid or the reason for rejection. The sum of the first 12 digits with the weights 1, 3, together with the last digit, must be divisible by 10. Check the length and the characters; catch `invalid_argument` by const reference.

**2. Basic level.** Create a console program. Read the 13 digits of an ISBN without separators; print valid or the reason for rejection. The sum of the first 12 digits with the weights 1, 3, together with the last digit, must be divisible by 10. Return expected with a length, character or check digit error code; for an invalid number, print the correct check digit.

**3. Advanced level.** Create a console program. Read the 13 digits of an ISBN without separators; print valid or the reason for rejection. The sum of the first 12 digits with the weights 1, 3, together with the last digit, must be divisible by 10. Read lines until end; for each one, print the line number and the diagnosis, then a summary. Format a success with transform; test an empty line, a letter and a wrong check digit.

### Variant 3. An RPN calculator {#v3}

**1. Initial level.** Create a console program. Read a line with a postfix expression of real numbers and the tokens +, -, /; print the result or a diagnosis. Use a vector as a stack; before an operation, check that two operands are available, and after the expression, that there is exactly one result. Reject division by zero with an exception.

**2. Basic level.** Create a console program. Read a line with a postfix expression of real numbers and the tokens +, -, /; print the result or a diagnosis. For an unknown token, missing operands and a zero divisor, return expected with the index of the token; reject infinite numbers.

**3. Advanced level.** Create a console program. Read a line with a postfix expression of real numbers and the tokens +, -, /; print the result or a diagnosis. Process several expressions until end, keeping a history of successful results only. A failed operation doesn’t change the history; print it at the end and check the recovery after three different errors.

### Variant 4. A sample currency converter {#v4}

**1. Initial level.** Create a console program. Read an amount and the code UAH, USD or EUR; print the amount in UAH at the sample rates 1, 40, 45 defined in code. This is a fixed model, not current exchange rates. Reject an unknown currency and a negative or infinite amount with `invalid_argument`.

**2. Basic level.** Create a console program. Read an amount and the code UAH, USD or EUR; print the amount in UAH at the sample rates 1, 40, 45 defined in code. This is a fixed model, not current exchange rates. Split looking up the rate and validating the amount into expected-returning functions and chain them with `and_then`; print the exact error code.

**3. Advanced level.** Create a console program. Read an amount and the code UAH, USD or EUR; print the amount in UAH at the sample rates 1, 40, 45 defined in code. This is a fixed model, not current exchange rates. Read a batch of operations and validate it completely before computing the total. On any error, don’t publish a partial total; print the number of the failed record and check the strong contract.

### Variant 5. Parsing a time {#v5}

**1. Initial level.** Create a console program. Read a time in the format hh:mm; print the minutes since the start of the day. Hours 00–23, minutes 00–59, length exactly 5. Throw `invalid_argument` for the format and `out_of_range` for a value; repeat the input after an error until success or EOF.

**2. Basic level.** Create a console program. Read a time in the format hh:mm; print the minutes since the start of the day. Hours 00–23, minutes 00–59, length exactly 5. Return expected with the codes Format, Hour, Minute; print the code without calling value for an error.

**3. Advanced level.** Create a console program. Read a time in the format hh:mm; print the minutes since the start of the day. Hours 00–23, minutes 00–59, length exactly 5. Read the start and end of an interval; with `and_then`, check both times and their order within a single day. Print the duration or the exact stage of failure; test equal times and 23:59.

### Variant 6. Safe arithmetic {#v6}

**1. Initial level.** Create a console program. Read two int values; print their sum or overflow. Perform the check before the potentially dangerous operation. Use `numeric_limits` and branching on the sign of the second operand; throw `overflow_error`.

**2. Basic level.** Create a console program. Read two int values; print their sum or overflow. Perform the check before the potentially dangerous operation. Return `std::expected<int, Overflow>` for addition and subtraction; also read the operation sign and print the result or the code.

**3. Advanced level.** Create a console program. Read two int values; print their sum or overflow. Perform the check before the potentially dangerous operation. Implement a chain of int addition, subtraction and multiplication with expected and checks before the operations. Read an initial number and commands until end, keeping the previous result on a failure; test `INT_MIN` and `INT_MAX`.

### Variant 7. User registration {#v7}

**1. Initial level.** Create a console program. Read a login, an email and a sample password on three lines; print accepted or a diagnosis. The login contains 3–12 ASCII letters or digits; the sample email format is exactly one `@` and nonempty parts; the password has at least 8 ASCII characters. Don’t print the password. Use `invalid_argument` for rule violations; print the first reason found.

**2. Basic level.** Create a console program. Read a login, an email and a sample password on three lines; print accepted or a diagnosis. The login contains 3–12 ASCII letters or digits; the sample email format is exactly one `@` and nonempty parts; the password has at least 8 ASCII characters. Don’t print the password. Separate validators return expected; combine them with `and_then` and report the first error without saving an invalid record.

**3. Advanced level.** Create a console program. Read a login, an email and a sample password on three lines; print accepted or a diagnosis. The login contains 3–12 ASCII letters or digits; the sample email format is exactly one `@` and nonempty parts; the password has at least 8 ASCII characters. Don’t print the password. Read a count and a batch of registrations under these rules, and additionally check that the logins are unique. Prepare the new registry in a temporary container and replace the main one only after the whole batch succeeds; print the logins or the number of the error.

### Variant 8. Student grades {#v8}

**1. Initial level.** Create a console program. Read the number of grades and integer grades of 0–100; print the average with two decimal places or an error. Reject a zero count and a grade out of range with a custom GradeError derived from `runtime_error`.

**2. Basic level.** Create a console program. Read the number of grades and integer grades of 0–100; print the average with two decimal places or an error. The average function returns expected; store the index of the first invalid grade in the error and print it.

**3. Advanced level.** Create a console program. Read the number of grades and integer grades of 0–100; print the average with two decimal places or an error. After the initial list, accept commands to replace a grade by index until end. A failed replacement doesn’t change the list; after each command, print the average or a diagnosis. Test an empty list and the extreme grades.

### Variant 9. Sensor readings {#v9}

**1. Initial level.** Create a console program. Read lines until end: a temperature number or missing; for each one, print the value, its absence or an error. The range of the sample sensor is from -50 to 150 Celsius. Represent absence with optional, and reject values out of range with an exception; missing is not the number 0.

**2. Basic level.** Create a console program. Read lines until end: a temperature number or missing; for each one, print the value, its absence or an error. The range of the sample sensor is from -50 to 150 Celsius. Return expected with an optional inside: a syntax error differs from a missing measurement. Print separate counters of the states.

**3. Advanced level.** Create a console program. Read lines until end: a temperature number or missing; for each one, print the value, its absence or an error. The range of the sample sensor is from -50 to 150 Celsius. Compute the average of the present valid readings only; diagnoses contain the line number. Test a series of only missing, NaN, infinity and the boundary values; use optional for a missing average.

### Variant 10. Ticket booking {#v10}

**1. Initial level.** Create a console program. In code, define flights A and B with 5 seats each. Read a flight and a seat number of 1–5 until end; print a confirmation or the reason for rejection. For an unknown flight, an index and an occupied seat, throw different standard exceptions.

**2. Basic level.** Create a console program. In code, define flights A and B with 5 seats each. Read a flight and a seat number of 1–5 until end; print a confirmation or the reason for rejection. Return expected with a custom error enum; after each command, print the number of free seats.

**3. Advanced level.** Create a console program. In code, define flights A and B with 5 seats each. Read a flight and a seat number of 1–5 until end; print a confirmation or the reason for rejection. Read a batch of seats for one booking, and reject duplicates and occupied seats. Apply the batch atomically by preparing a copy; after a rejection, prove that all seats are unchanged and print the final seat map.

### Variant 11. Warehouse write-offs {#v11}

**1. Initial level.** Create a console program. Define the stock levels A=10, B=20 in code. Read an item code and a positive quantity until end; print the stock levels or a diagnosis. Reject insufficient stock with a custom StockError; don’t change the quantity before the check.

**2. Basic level.** Create a console program. Define the stock levels A=10, B=20 in code. Read an item code and a positive quantity until end; print the stock levels or a diagnosis. The operation returns expected with UnknownItem, InvalidQuantity, InsufficientStock; print the name of the code.

**3. Advanced level.** Create a console program. Define the stock levels A=10, B=20 in code. Read an item code and a positive quantity until end; print the stock levels or a diagnosis. Read a batch of write-offs, including repeated codes; check the total demand and perform either the whole batch or no write-offs at all. Print the stock levels and a log of rejections; test an error in the last line.

### Variant 12. A vending machine {#v12}

**1. Initial level.** Create a console program. The item costs 7 UAH, the stock is 3 units, and the initial cash box holds two coins each of 1, 2 and 5 UAH. Read the number of inserted coins and their denominations; print the item and the change or the reason for rejection. The cash box and the inserted coins are available for giving change; on a rejection, the inserted coins are returned, and the cash box and the stock don’t change. Accept only coins of 1, 2 and 5, and check that the payment is sufficient; on an error, print the amount returned.

**2. Basic level.** Create a console program. The item costs 7 UAH, the stock is 3 units, and the initial cash box holds two coins each of 1, 2 and 5 UAH. Read the number of inserted coins and their denominations; print the item and the change or the reason for rejection. The cash box and the inserted coins are available for giving change; on a rejection, the inserted coins are returned, and the cash box and the stock don’t change. Return expected with the codes Coin, Funds, Change, Empty; find the change by exhaustive search over the available coins, without relying on a greedy algorithm.

**3. Advanced level.** Create a console program. The item costs 7 UAH, the stock is 3 units, and the initial cash box holds two coins each of 1, 2 and 5 UAH. Read the number of inserted coins and their denominations; print the item and the change or the reason for rejection. The cash box and the inserted coins are available for giving change; on a rejection, the inserted coins are returned, and the cash box and the stock don’t change. Prepare the new cash box and stock separately, and replace the state only if the sale and the change are possible. Process purchases until end; after a rejection, return the inserted coins and print the unchanged balances.

### Variant 13. A safe elevator model {#v13}

**1. Initial level.** Create a console program. Read the starting floor 1–9, the target floor and a load of 0–400 kg; print the final floor or an error. Check the floors and the load before changing the state; throw `out_of_range`.

**2. Basic level.** Create a console program. Read the starting floor 1–9, the target floor and a load of 0–400 kg; print the final floor or an error. Use expected with Floor, Weight, Overload; return the unchanged starting floor on an error.

**3. Advanced level.** Create a console program. Read the starting floor 1–9, the target floor and a load of 0–400 kg; print the final floor or an error. Process a sequence of calls until end, counting the floors traveled for successful trips only. The log contains the command number and the failure code; check that an overload doesn’t change the floor.

### Variant 14. Roman numerals {#v14}

**1. Initial level.** Create a console program. Read a Roman numeral in uppercase; print the decimal value or the position of the error. Support the symbols I, V, X and the numbers 1–39; allow only IV and IX as subtractive pairs, and check the canonical form by formatting the result back.

**2. Basic level.** Create a console program. Read a Roman numeral in uppercase; print the decimal value or the position of the error. Support the numbers 1–3999, the symbols I, V, X, L, C, D, M and the pairs IV, IX, XL, XC, CD, CM; expected contains the index of the first mismatch with the canonical formatting.

**3. Advanced level.** Create a console program. Read a Roman numeral in uppercase; print the decimal value or the position of the error. Support the numbers 1–3999, the symbols I, V, X, L, C, D, M and the subtractive pairs IV, IX, XL, XC, CD, CM. Process lines until end, and separate the character check, the computation and the canonicity check with `and_then`. Print the results and the number of rejections; test IIII, IC, an empty line and MMMCMXCIX.

### Variant 15. GPS coordinates {#v15}

**1. Initial level.** Create a console program. Read a latitude,longitude line with two finite numbers; print the normalized pair or a diagnosis. Latitude is from -90 to 90, longitude from -180 to 180. Reject a missing comma, extra text and an invalid range with `invalid_argument`.

**2. Basic level.** Create a console program. Read a latitude,longitude line with two finite numbers; print the normalized pair or a diagnosis. Latitude is from -90 to 90, longitude from -180 to 180. Return expected with the code and the name of the field; check that the numeric token is consumed completely.

**3. Advanced level.** Create a console program. Read a latitude,longitude line with two finite numbers; print the normalized pair or a diagnosis. Latitude is from -90 to 90, longitude from -180 to 180. Accept lines until end and build a list of valid points only; print the line index, the error code and the final number of points. Test NaN, infinity, both bounds and an extra comma.

### Variant 16. Matrix dimensions {#v16}

**1. Initial level.** Create a console program. Read the dimensions and elements of two rectangular matrices of real numbers, each up to 10×10; print the result of the operation or an error. Add only matrices of the same shape; reject a mismatch with `invalid_argument`.

**2. Basic level.** Create a console program. Read the dimensions and elements of two rectangular matrices of real numbers, each up to 10×10; print the result of the operation or an error. Multiply the matrices when the inner dimensions are compatible; the function returns expected with a message giving the actual shapes.

**3. Advanced level.** Create a console program. Read the dimensions and elements of two rectangular matrices of real numbers, each up to 10×10; print the result of the operation or an error. Also read the command add or multiply. Compute in a temporary matrix, and reject infinite input and output values without changing the operands. Print the result or the context of the error, and check that the inputs are unchanged.

### Variant 17. A quadratic equation {#v17}

**1. Initial level.** Create a console program. Read the finite coefficients a, b, c of the equation; print the real roots or the reason they don’t exist. For a=0, throw `invalid_argument`; for a negative discriminant, throw `domain_error`; handle a double root.

**2. Basic level.** Create a console program. Read the finite coefficients a, b, c of the equation; print the real roots or the reason they don’t exist. Return expected with the codes NotQuadratic, NoRealRoots, NumericOverflow; check that the discriminant is finite before sqrt.

**3. Advanced level.** Create a console program. Read the finite coefficients a, b, c of the equation; print the real roots or the reason they don’t exist. Read triples until EOF; for each one, print the roots and the residual after substitution, or the error code. Use a numerically stable formula via q, and handle q=0 separately; add tests for a double root and for very different scales.

### Variant 18. Chess move notation {#v18}

**1. Initial level.** Create a console program. Read a string like e2-e4; print the coordinates of the start and end squares or a diagnosis. This is a check of the notation, not of all chess rules. Check the length of 5, the hyphen, the letters a–h and the digits 1–8; throw `invalid_argument`.

**2. Basic level.** Create a console program. Read a string like e2-e4; print the coordinates of the start and end squares or a diagnosis. This is a check of the notation, not of all chess rules. Return expected with the position of the invalid character, and reject identical squares.

**3. Advanced level.** Create a console program. Read a string like e2-e4; print the coordinates of the start and end squares or a diagnosis. This is a check of the notation, not of all chess rules. Read the piece type K or N and the move notation; after syntactic parsing, use `and_then` to check the geometry of a king or knight move. Print legal or the exact reason; don’t model other pieces or the board state.

### Variant 19. Scaling a recipe {#v19}

**1. Initial level.** Create a console program. Read the original and the required number of servings, the mass of an ingredient and the unit g or kg; print the required mass in grams or a diagnosis. Servings must be positive, and the mass non-negative and finite; reject errors with exceptions.

**2. Basic level.** Create a console program. Read the original and the required number of servings, the mass of an ingredient and the unit g or kg; print the required mass in grams or a diagnosis. Looking up the unit multiplier returns optional, the calculation returns expected; an unknown unit doesn’t turn into zero.

**3. Advanced level.** Create a console program. Read the original and the required number of servings, the mass of an ingredient and the unit g or kg; print the required mass in grams or a diagnosis. Read a list of ingredients and validate the whole recipe before printing the scaled table. Return expected with the line number, and reject an overflow of the result; check that on an error the table isn’t printed partially.

### Variant 20. A sample phone plan {#v20}

**1. Initial level.** Create a console program. Read the number of minutes and megabytes; print the bill in kopiykas. The base fee is 10000 kopiykas, 100 min and 1000 MB are included, and overage costs 50 kopiykas/min and 2 kopiykas/MB. Reject negative values and values above one million with an exception.

**2. Basic level.** Create a console program. Read the number of minutes and megabytes; print the bill in kopiykas. The base fee is 10000 kopiykas, 100 min and 1000 MB are included, and overage costs 50 kopiykas/min and 2 kopiykas/MB. Separate validation and calculation with expected; print the components of the bill and the error code.

**3. Advanced level.** Create a console program. Read the number of minutes and megabytes; print the bill in kopiykas. The base fee is 10000 kopiykas, 100 min and 1000 MB are included, and overage costs 50 kopiykas/min and 2 kopiykas/MB. Read a batch of subscribers with identifiers, and reject duplicates; print the bills of the valid lines and separate diagnoses for the invalid ones. Test both bounds of the included allowances and the values one unit above them.

### Variant 21. A phone number {#v21}

**1. Initial level.** Create a console program. Read a sample number in the format +380 followed by 9 digits; print the normalized number or an error code. Allow spaces and hyphens between digits, remove them, and check the prefix and the length; reject all other characters.

**2. Basic level.** Create a console program. Read a sample number in the format +380 followed by 9 digits; print the normalized number or an error code. Return expected with an error enum Character, Prefix, Length; print a clear message for each code.

**3. Advanced level.** Create a console program. Read a sample number in the format +380 followed by 9 digits; print the normalized number or an error code. Process lines until end, and don’t add repeated normalized numbers. Chain normalization and validation with `and_then`, and print the unique numbers and statistics of the rejection reasons.

### Variant 22. A sample loan application {#v22}

**1. Initial level.** Create a console program. Read the age, the monthly income and the desired payment in whole UAH; print the result of the given sample model. Conditions: age 18–70, positive income, and a positive payment that doesn’t exceed 30 % of the income; this is not financial advice. Separate invalid input values from a rejection under a model rule; report invalid input with an exception.

**2. Basic level.** Create a console program. Read the age, the monthly income and the desired payment in whole UAH; print the result of the given sample model. Conditions: age 18–70, positive income, and a positive payment that doesn’t exceed 30 % of the income; this is not financial advice. Return expected with the codes Age, Income, Payment, Ratio; check the ratio without integer overflow.

**3. Advanced level.** Create a console program. Read the age, the monthly income and the desired payment in whole UAH; print the result of the given sample model. Conditions: age 18–70, positive income, and a positive payment that doesn’t exceed 30 % of the income; this is not financial advice. Process a batch of applications, collect all violated rules for each record, and print explanations without personal data. Test exactly 30 % and a value one UAH above it; the log must not hide rejections.

### Variant 23. A bus timetable {#v23}

**1. Initial level.** Create a console program. Read lines route hh:mm until end; print the valid records and diagnoses with line numbers. Route is a nonempty ASCII code, and the time is within a day. Parse each line in try/catch and continue after an error; reject extra tokens.

**2. Basic level.** Create a console program. Read lines route hh:mm until end; print the valid records and diagnoses with line numbers. Route is a nonempty ASCII code, and the time is within a day. The parse function returns expected, and the conversion to minutes is done with transform; sort the valid records by time.

**3. Advanced level.** Create a console program. Read lines route hh:mm until end; print the valid records and diagnoses with line numbers. Route is a nonempty ASCII code, and the time is within a day. Forbid duplicate route/time pairs, and for equal times sort by route. Print the cleaned timetable and the Format, Time, Duplicate statistics; test an empty series and all invalid lines.

### Variant 24. A fuel tank {#v24}

**1. Initial level.** Create a console program. Read the tank capacity, the initial volume and a series of refuelings until end; print the volume after each operation or the reason for rejection. Accept only finite numbers, a positive capacity and non-negative volumes; reject exceeding the capacity with an exception.

**2. Basic level.** Create a console program. Read the tank capacity, the initial volume and a series of refuelings until end; print the volume after each operation or the reason for rejection. Return expected with the codes InvalidAmount, Capacity, InitialState; a failed refueling leaves the volume unchanged.

**3. Advanced level.** Create a console program. Read the tank capacity, the initial volume and a series of refuelings until end; print the volume after each operation or the reason for rejection. Add the commands fill and consume, and keep a log of successful changes only. Compute the new volume before committing; print the final balance in liters and the number of rejections, and test exact emptying and filling.

### Variant 25. An average grade with pitfalls {#v25}

**1. Initial level.** Create a console program. Read the count and grades of 0–100; print the average or a message about invalid data. In a safe version, deliberately use integer division to demonstrate a logic error. Find it with Watch on the data 2, 3, fix it and print both results; don’t run undefined behavior.

**2. Basic level.** Create a console program. Read the count and grades of 0–100; print the average or a message about invalid data. Prepare an example in which the last grade is skipped, without going out of bounds. Detect the error with a conditional breakpoint, fix it and add an assert for a reference data set; print the correct average.

**3. Advanced level.** Create a console program. Read the count and grades of 0–100; print the average with a fractional part or a message about invalid data. Test the average function against an independent reference sum on data sets defined in code: one element, all zeros, all 100, a fractional average. Print the number of failed tests and return a nonzero code on failure; input validation must also work with NDEBUG.

### Variant 26. A temperature converter {#v26}

**1. Initial level.** Create a console program. Read a temperature in Celsius; print Kelvin as C+273.15 or an error. The value must be finite and not lower than -273.15. Check the precondition with an ordinary if and throw `domain_error`; don’t rely on assert alone.

**2. Basic level.** Create a console program. Read a temperature in Celsius; print Kelvin as C+273.15 or an error. The value must be finite and not lower than -273.15. Return expected with InvalidNumber and BelowAbsoluteZero; prepare the formatted result with transform.

**3. Advanced level.** Create a console program. Read a temperature in Celsius; print Kelvin as C+273.15 or an error. The value must be finite and not lower than -273.15. Process a series until EOF, keep only successes and print statistics of rejections. Test -273.15, 0, 100, NaN and infinity; compare numeric results with a tolerance, not exact equality.

### Variant 27. A polynomial from a string {#v27}

**1. Initial level.** Create a console program. Read a polynomial without spaces; print the coefficients by degree or the position of a syntax error. Support only ax+b with explicitly written integers a and b; reject extra characters with `invalid_argument`.

**2. Basic level.** Create a console program. Read a polynomial without spaces; print the coefficients by degree or the position of a syntax error. Support a sum of terms ax^n and constants, with n from 0 to 9 and integer coefficients of at most 1000 in absolute value; expected contains the position of the error, and equal degrees are summed.

**3. Advanced level.** Create a console program. Read a polynomial without spaces; print the coefficients by degree or the position of a syntax error. Parse a sum of terms ax^n and constants: n from 0 to 9, explicitly written integer coefficients of at most 1000 in absolute value, and equal degrees are summed. Read a finite x and evaluate Horner’s scheme with `and_then`. Distinguish syntax, the coefficient range and an infinite result; print the normalized coefficients and the value.

### Variant 28. A bank transfer {#v28}

**1. Initial level.** Create a console program. Define the sample accounts A=10000 and B=5000 kopiykas. Read the sender, the recipient and a positive amount; print the balances or a diagnosis. Check that the accounts exist, that the identifiers differ and that the funds are sufficient before any changes; report a rejection with an exception.

**2. Basic level.** Create a console program. Define the sample accounts A=10000 and B=5000 kopiykas. Read the sender, the recipient and a positive amount; print the balances or a diagnosis. Combine the checks with expected and `and_then`, and print the error code with `or_else`; after a rejection, the balances are unchanged.

**3. Advanced level.** Create a console program. Define the sample accounts A=10000 and B=5000 kopiykas. Read the sender, the recipient and a positive amount; print the balances or a diagnosis. Read a batch of transfers, apply it to a temporary copy of the accounts and commit only a complete success. Print the balances and the index of the error, and check that the total sum is preserved and that the last operation can be rejected.

### Variant 29. An exam record sheet {#v29}

**1. Initial level.** Create a console program. Read pairs of sample-ID grade until end; the grade is 0–100. Print the valid records and the error diagnostics. For an invalid grade, throw `runtime_error` with the ID; catch it by const reference and continue the series.

**2. Basic level.** Create a console program. Read pairs of sample-ID grade until end; the grade is 0–100. Print the valid records and the error diagnostics. Add a custom exception with the line number and the `source_location` of the detection site; print the message and the function name, without depending on the absolute path.

**3. Advanced level.** Create a console program. Read pairs of sample-ID grade until end; the grade is 0–100. Print the valid records and the error diagnostics. At the detection site, capture std::stacktrace if the installed library supports it; otherwise explicitly report that it is unavailable and use `source_location`. Save the trace before stack unwinding, show the nested parse/validate/process calls and check that processing continues after an error.

### Variant 30. A parking lot {#v30}

**1. Initial level.** Create a console program. Set the capacity to 3 spaces; read the commands in ID and out ID until end, and print the occupied spaces or an error. Reject a repeated entry, the exit of an absent car and overflow with a custom ParkingError.

**2. Basic level.** Create a console program. Set the capacity to 3 spaces; read the commands in ID and out ID until end, and print the occupied spaces or an error. Return expected with Duplicate, Unknown, Full; after each command, print the occupancy, without changing the state on a rejection.

**3. Advanced level.** Create a console program. Set the capacity to 3 spaces; read the commands in ID and out ID until end, and print the occupied spaces or an error. Process a batch of commands on a copy of the state, committing only on complete success. Print the final list and the number of the rejected command; test a batch whose last command fails, and check that the initial occupancy is preserved.

## Procedure

1. Write down a reproducible input and the expected behavior.
1. Separate an input error from an internal defect.
1. Set a breakpoint near the first discrepancy.
1. Check the types, the values and the call stack.
1. Implement a typed failure report.
1. Test the normal path, the boundary path and every error path.
1. Save the actual results, the fix and a commit.
