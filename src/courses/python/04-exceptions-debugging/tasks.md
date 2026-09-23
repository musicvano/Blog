---
title: "Tasks"
description: "Topic 4. Exceptions and debugging: task variants"
outline: [2, 3]
sourceHash: "e9951a2134b05c473be8b354a78b67c2d0973920b694ebe85e81339dba4dba64"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

Each specification fully defines a separate program. Use Python 3.14, annotations for function parameters and return values, and the standard library. For several types without binding an object, use `except ValueError, TypeError:`; with `as`, use parentheses. All rates, exchange rates, limits, and medical parameters below are fictional constants for testing programs. The dosage task is an arithmetic simulator without real drug names. Store monetary amounts in whole units or kopiykas as specified. Reject NaN and infinities in real-valued data. Do not use `eval` for the calculator; select allowed operations through branching.

## Variants

### Variant 1. Ticket booking {#v1}

**1. Initial level.** Create a Python 3.14 console program that reads the number of available seats from 1 to 50 and a request from 1 to 50 from the keyboard. Check that the request does not exceed the available seats. Print the number of seats remaining after booking or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads the number of available seats from 1 to 50 and a request from 1 to 50 from the keyboard. Check that the request does not exceed the available seats. Print the number of seats remaining after booking or a clear rejection message. Implement annotated functions and a custom `SeatsError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads the number of available seats from 1 to 50 and a request from 1 to 50 from the keyboard. Check that the request does not exceed the available seats. Print the number of seats remaining after booking or a clear rejection message. Implement a custom `SeatsError`, annotated functions, a `logging` log, and this behavior: repeat the request until it succeeds or the stop command is entered. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 2. Bank transfers {#v2}

**1. Initial level.** Create a Python 3.14 console program that reads a balance from 0 to 1000000 kopiykas and a positive transfer amount from the keyboard. Check that the amount does not exceed the balance. Print the new balance in kopiykas or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads a balance from 0 to 1000000 kopiykas and a positive transfer amount from the keyboard. Check that the amount does not exceed the balance. Print the new balance in kopiykas or a clear rejection message. Implement annotated functions and a custom `FundsError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads a balance from 0 to 1000000 kopiykas and a positive transfer amount from the keyboard. Check that the amount does not exceed the balance. Print the new balance in kopiykas or a clear rejection message. Implement a custom `FundsError`, annotated functions, a `logging` log, and this behavior: preserve the cause of an invalid amount conversion using raise from. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 3. Drink vending machine {#v3}

**1. Initial level.** Create a Python 3.14 console program that reads a drink count of 0..20, a payment, and a change reserve in whole hryvnias from the keyboard. Check that the drink price is 25, stock is available, the payment covers the price, and enough change is available. Print the change and remaining stock or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads a drink count of 0..20, a payment, and a change reserve in whole hryvnias from the keyboard. Check that the drink price is 25, stock is available, the payment covers the price, and enough change is available. Print the change and remaining stock or a clear rejection message. Implement annotated functions and a custom `VendingError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads a drink count of 0..20, a payment, and a change reserve in whole hryvnias from the keyboard. Check that the drink price is 25, stock is available, the payment covers the price, and enough change is available. Print the change and remaining stock or a clear rejection message. Implement a custom `VendingError`, annotated functions, a `logging` log, and this behavior: distinguish an empty machine from insufficient change using custom types. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 4. Learning dosage simulator {#v4}

**1. Initial level.** Create a Python 3.14 console program that reads a hypothetical mass from 1 to 100 and a factor from 1 to 5 units per unit of mass from the keyboard. Check that their product does not exceed the hypothetical limit of 200. Print the hypothetical product without real drug names or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads a hypothetical mass from 1 to 100 and a factor from 1 to 5 units per unit of mass from the keyboard. Check that their product does not exceed the hypothetical limit of 200. Print the hypothetical product without real drug names or a clear rejection message. Implement annotated functions and a custom `DoseModelError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads a hypothetical mass from 1 to 100 and a factor from 1 to 5 units per unit of mass from the keyboard. Check that their product does not exceed the hypothetical limit of 200. Print the hypothetical product without real drug names or a clear rejection message. Implement a custom `DoseModelError`, annotated functions, a `logging` log, and this behavior: collect independent errors for the two parameters in an ExceptionGroup with add_note; use only a fictional arithmetic model. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 5. Expression calculator {#v5}

**1. Initial level.** Create a Python 3.14 console program that reads two finite real operands and an operator +, -, *, or / from the keyboard. Check that the operator is allowed, the divisor is nonzero, and the result is finite. Print the result to four decimal places or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads two finite real operands and an operator +, -, *, or / from the keyboard. Check that the operator is allowed, the divisor is nonzero, and the result is finite. Print the result to four decimal places or a clear rejection message. Implement annotated functions and a custom `OperationError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads two finite real operands and an operator +, -, *, or / from the keyboard. Check that the operator is allowed, the divisor is nonzero, and the result is finite. Print the result to four decimal places or a clear rejection message. Implement a custom `OperationError`, annotated functions, a `logging` log, and this behavior: select operations without eval; distinguish invalid format, unknown operation, and division by zero. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 6. Elevator {#v6}

**1. Initial level.** Create a Python 3.14 console program that reads a floor from 1 to 16, a passenger count from 1 to 8, and a total mass from 1 to 1000 kg from the keyboard. Check that the mass does not exceed the hypothetical capacity of 600 kg. Print permission to move and the selected floor or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads a floor from 1 to 16, a passenger count from 1 to 8, and a total mass from 1 to 1000 kg from the keyboard. Check that the mass does not exceed the hypothetical capacity of 600 kg. Print permission to move and the selected floor or a clear rejection message. Implement annotated functions and a custom `OverloadError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads a floor from 1 to 16, a passenger count from 1 to 8, and a total mass from 1 to 1000 kg from the keyboard. Check that the mass does not exceed the hypothetical capacity of 600 kg. Print permission to move and the selected floor or a clear rejection message. Implement a custom `OverloadError`, annotated functions, a `logging` log, and this behavior: preserve the current floor and change it only after a successful call. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 7. User registration {#v7}

**1. Initial level.** Create a Python 3.14 console program that reads a name, age, and password from the keyboard. Check that the name is nonempty, the age is 16..100, and the password contains at least 8 characters. Print confirmation that the form was accepted, without displaying the password or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads a name, age, and password from the keyboard. Check that the name is nonempty, the age is 16..100, and the password contains at least 8 characters. Print confirmation that the form was accepted, without displaying the password or a clear rejection message. Implement annotated functions and a custom `RegistrationError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads a name, age, and password from the keyboard. Check that the name is nonempty, the age is 16..100, and the password contains at least 8 characters. Print confirmation that the form was accepted, without displaying the password or a clear rejection message. Implement a custom `RegistrationError`, annotated functions, a `logging` log, and this behavior: collect all violations in an ExceptionGroup with field names in add_note; do not log the password. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 8. Date converter {#v8}

**1. Initial level.** Create a Python 3.14 console program that reads a date in DD.MM.YYYY format from the keyboard. Check that the input contains exactly 10 characters and is a valid calendar date in years 1..9999. Print the date in YYYY-MM-DD format or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads a date in DD.MM.YYYY format from the keyboard. Check that the input contains exactly 10 characters and is a valid calendar date in years 1..9999. Print the date in YYYY-MM-DD format or a clear rejection message. Implement annotated functions and a custom `DateFormatError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads a date in DD.MM.YYYY format from the keyboard. Check that the input contains exactly 10 characters and is a valid calendar date in years 1..9999. Print the date in YYYY-MM-DD format or a clear rejection message. Implement a custom `DateFormatError`, annotated functions, a `logging` log, and this behavior: support choosing DD.MM.YYYY or YYYY-MM-DD and preserve ValueError using raise from. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 9. Materials inventory {#v9}

**1. Initial level.** Create a Python 3.14 console program that reads a stock level of 0..1000 and a withdrawal of 1..1000 units from the keyboard. Check that the withdrawal does not exceed the stock. Print the new stock level or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads a stock level of 0..1000 and a withdrawal of 1..1000 units from the keyboard. Check that the withdrawal does not exceed the stock. Print the new stock level or a clear rejection message. Implement annotated functions and a custom `StockError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads a stock level of 0..1000 and a withdrawal of 1..1000 units from the keyboard. Check that the withdrawal does not exceed the stock. Print the new stock level or a clear rejection message. Implement a custom `StockError`, annotated functions, a `logging` log, and this behavior: distinguish negative quantities and insufficient materials using custom types. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 10. Electronic gradebook {#v10}

**1. Initial level.** Create a Python 3.14 console program that reads three integer grades from the keyboard. Check that each grade is in 0..100. Print the average to two decimal places or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads three integer grades from the keyboard. Check that each grade is in 0..100. Print the average to two decimal places or a clear rejection message. Implement annotated functions and a custom `GradeError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads three integer grades from the keyboard. Check that each grade is in 0..100. Print the average to two decimal places or a clear rejection message. Implement a custom `GradeError`, annotated functions, a `logging` log, and this behavior: collect all invalid grades in an ExceptionGroup with field numbers in add_note. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 11. Payment terminal {#v11}

**1. Initial level.** Create a Python 3.14 console program that reads a PIN string and an integer withdrawal amount from the keyboard. Check that the example PIN is 1234 and the amount is 1..5000. Print confirmation of the approved amount or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads a PIN string and an integer withdrawal amount from the keyboard. Check that the example PIN is 1234 and the amount is 1..5000. Print confirmation of the approved amount or a clear rejection message. Implement annotated functions and a custom `TerminalError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads a PIN string and an integer withdrawal amount from the keyboard. Check that the example PIN is 1234 and the amount is 1..5000. Print confirmation of the approved amount or a clear rejection message. Implement a custom `TerminalError`, annotated functions, a `logging` log, and this behavior: allow exactly three PIN attempts and stop after three failures; do not log the PIN. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 12. Weather station {#v12}

**1. Initial level.** Create a Python 3.14 console program that reads a finite temperature and humidity from the keyboard. Check that the temperature is -50..60 and humidity is 0..100. Print the accepted readings or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads a finite temperature and humidity from the keyboard. Check that the temperature is -50..60 and humidity is 0..100. Print the accepted readings or a clear rejection message. Implement annotated functions and a custom `SensorError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads a finite temperature and humidity from the keyboard. Check that the temperature is -50..60 and humidity is 0..100. Print the accepted readings or a clear rejection message. Implement a custom `SensorError`, annotated functions, a `logging` log, and this behavior: use WARNING for a temperature outside -20..40 but within the valid range, and ERROR for rejection. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 13. Knowledge test {#v13}

**1. Initial level.** Create a Python 3.14 console program that reads three answers A, B, or C from the keyboard. Check that each answer is a single allowed character. Print the number of matches with the key A, C, B or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads three answers A, B, or C from the keyboard. Check that each answer is a single allowed character. Print the number of matches with the key A, C, B or a clear rejection message. Implement annotated functions and a custom `AnswerError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads three answers A, B, or C from the keyboard. Check that each answer is a single allowed character. Print the number of matches with the key A, C, B or a clear rejection message. Implement a custom `AnswerError`, annotated functions, a `logging` log, and this behavior: retry an invalid answer for the same question; award one point for each correct answer. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 14. Train schedule {#v14}

**1. Initial level.** Create a Python 3.14 console program that reads an arrival hour of 0..23 and a minute of 0..59 from the keyboard. Check that the arrival is outside the occupied interval 10:00..10:14 inclusive. Print permission to use the track and the time in minutes since the start of the day or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads an arrival hour of 0..23 and a minute of 0..59 from the keyboard. Check that the arrival is outside the occupied interval 10:00..10:14 inclusive. Print permission to use the track and the time in minutes since the start of the day or a clear rejection message. Implement annotated functions and a custom `TrackConflictError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads an arrival hour of 0..23 and a minute of 0..59 from the keyboard. Check that the arrival is outside the occupied interval 10:00..10:14 inclusive. Print permission to use the track and the time in minutes since the start of the day or a clear rejection message. Implement a custom `TrackConflictError`, annotated functions, a `logging` log, and this behavior: process three requests in sequence; a successful request occupies the track for 15 minutes, and intervals must not overlap. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 15. Parking meter {#v15}

**1. Initial level.** Create a Python 3.14 console program that reads a duration of 1..24 hours and a payment in whole hryvnias from the keyboard. Check that the payment covers the rate of 20 UAH per hour. Print the cost and change or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads a duration of 1..24 hours and a payment in whole hryvnias from the keyboard. Check that the payment covers the rate of 20 UAH per hour. Print the cost and change or a clear rejection message. Implement annotated functions and a custom `PaymentError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads a duration of 1..24 hours and a payment in whole hryvnias from the keyboard. Check that the payment covers the rate of 20 UAH per hour. Print the cost and change or a clear rejection message. Implement a custom `PaymentError`, annotated functions, a `logging` log, and this behavior: use finally to print the attempt number and accepted/rejected status; do not print a successful receipt after rejection. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 16. Learning loan application {#v16}

**1. Initial level.** Create a Python 3.14 console program that reads a name, age, and monthly income in integer hypothetical units from the keyboard. Check that the name is nonempty, the age is 18..100, and the income is 0..1000000. Print the hypothetical decision: accepted for an income of at least 10000, otherwise denied or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads a name, age, and monthly income in integer hypothetical units from the keyboard. Check that the name is nonempty, the age is 18..100, and the income is 0..1000000. Print the hypothetical decision: accepted for an income of at least 10000, otherwise denied or a clear rejection message. Implement annotated functions and a custom `ApplicationError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads a name, age, and monthly income in integer hypothetical units from the keyboard. Check that the name is nonempty, the age is 18..100, and the income is 0..1000000. Print the hypothetical decision: accepted for an income of at least 10000, otherwise denied or a clear rejection message. Implement a custom `ApplicationError`, annotated functions, a `logging` log, and this behavior: group field errors in an ExceptionGroup; distinguish a valid but denied application from invalid data. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 17. System of two equations {#v17}

**1. Initial level.** Create a Python 3.14 console program that reads six integer coefficients a, b, c, d, e, f in -100..100 for a*x+b*y=c and d*x+e*y=f from the keyboard. Check that the determinant D=a*e-b*d is nonzero. Print x=(c*e-b*f)/D and y=(a*f-c*d)/D or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads six integer coefficients a, b, c, d, e, f in -100..100 for a*x+b*y=c and d*x+e*y=f from the keyboard. Check that the determinant D=a*e-b*d is nonzero. Print x=(c*e-b*f)/D and y=(a*f-c*d)/D or a clear rejection message. Implement annotated functions and a custom `SingularSystemError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads six integer coefficients a, b, c, d, e, f in -100..100 for a*x+b*y=c and d*x+e*y=f from the keyboard. Check that the determinant D=a*e-b*d is nonzero. Print x=(c*e-b*f)/D and y=(a*f-c*d)/D or a clear rejection message. Implement a custom `SingularSystemError`, annotated functions, a `logging` log, and this behavior: check both substitutions with a tolerance of 1e-9 and log degenerate systems. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 18. Workout timer {#v18}

**1. Initial level.** Create a Python 3.14 console program that reads an interval count of 1..10 and a duration of 1..5 seconds from the keyboard. Check that both values are integers within the specified ranges. Print the number of each completed interval after time.sleep or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads an interval count of 1..10 and a duration of 1..5 seconds from the keyboard. Check that both values are integers within the specified ranges. Print the number of each completed interval after time.sleep or a clear rejection message. Implement annotated functions and a custom `IntervalError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads an interval count of 1..10 and a duration of 1..5 seconds from the keyboard. Check that both values are integers within the specified ranges. Print the number of each completed interval after time.sleep or a clear rejection message. Implement a custom `IntervalError`, annotated functions, a `logging` log, and this behavior: catch KeyboardInterrupt at the session level; in finally, report the number of fully completed intervals. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 19. Currency exchange {#v19}

**1. Initial level.** Create a Python 3.14 console program that reads a USD or EUR code and a positive amount of up to 1000000 whole hryvnias from the keyboard. Check that the code is known and the amount is within the range. Print the converted amount at the example rate of 40 UAH/USD or 50 UAH/EUR to two decimal places or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads a USD or EUR code and a positive amount of up to 1000000 whole hryvnias from the keyboard. Check that the code is known and the amount is within the range. Print the converted amount at the example rate of 40 UAH/USD or 50 UAH/EUR to two decimal places or a clear rejection message. Implement annotated functions and a custom `CurrencyError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads a USD or EUR code and a positive amount of up to 1000000 whole hryvnias from the keyboard. Check that the code is known and the amount is within the range. Print the converted amount at the example rate of 40 UAH/USD or 50 UAH/EUR to two decimal places or a clear rejection message. Implement a custom `CurrencyError`, annotated functions, a `logging` log, and this behavior: process three requests and preserve the cause of a format error using raise from. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 20. GPS distance {#v20}

**1. Initial level.** Create a Python 3.14 console program that reads the latitude and longitude of two points in degrees from the keyboard. Check that the values are finite, latitudes are in -90..90, and longitudes are in -180..180. Print the distance 2*6371*asin(sqrt(h)) in km, where h=u+v, u=sin((p2-p1)/2)**2, v=cos(p1)*cos(p2)*sin((l2-l1)/2)**2, p1 and p2 are latitudes, and l1 and l2 are longitudes in radians or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads the latitude and longitude of two points in degrees from the keyboard. Check that the values are finite, latitudes are in -90..90, and longitudes are in -180..180. Print the distance 2*6371*asin(sqrt(h)) in km, where h=u+v, u=sin((p2-p1)/2)**2, v=cos(p1)*cos(p2)*sin((l2-l1)/2)**2, p1 and p2 are latitudes, and l1 and l2 are longitudes in radians or a clear rejection message. Implement annotated functions and a custom `CoordinateError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads the latitude and longitude of two points in degrees from the keyboard. Check that the values are finite, latitudes are in -90..90, and longitudes are in -180..180. Print the distance 2*6371*asin(sqrt(h)) in km, where h=u+v, u=sin((p2-p1)/2)**2, v=cos(p1)*cos(p2)*sin((l2-l1)/2)**2, p1 and p2 are latitudes, and l1 and l2 are longitudes in radians or a clear rejection message. Implement a custom `CoordinateError`, annotated functions, a `logging` log, and this behavior: group coordinate errors in an ExceptionGroup; clamp h to 0..1 before taking the square root to account for rounding. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 21. Travel budget {#v21}

**1. Initial level.** Create a Python 3.14 console program that reads a budget of 1..1000000 and three expenses of 0..1000000 whole hryvnias from the keyboard. Check that the sum does not exceed the budget. Print the total and unused budget or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads a budget of 1..1000000 and three expenses of 0..1000000 whole hryvnias from the keyboard. Check that the sum does not exceed the budget. Print the total and unused budget or a clear rejection message. Implement annotated functions and a custom `BudgetError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads a budget of 1..1000000 and three expenses of 0..1000000 whole hryvnias from the keyboard. Check that the sum does not exceed the budget. Print the total and unused budget or a clear rejection message. Implement a custom `BudgetError`, annotated functions, a `logging` log, and this behavior: use WARNING when at least 80% has been spent, and reject an overrun with a custom exception. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 22. Pizza order {#v22}

**1. Initial level.** Create a Python 3.14 console program that reads a size S, M, or L and a topping count of 0..5 from the keyboard. Check that the size is allowed and the count is an integer within the range. Print a receipt with a base price of 100, 150, or 200 plus 20 per topping or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads a size S, M, or L and a topping count of 0..5 from the keyboard. Check that the size is allowed and the count is an integer within the range. Print a receipt with a base price of 100, 150, or 200 plus 20 per topping or a clear rejection message. Implement annotated functions and a custom `OrderError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads a size S, M, or L and a topping count of 0..5 from the keyboard. Check that the size is allowed and the count is an integer within the range. Print a receipt with a base price of 100, 150, or 200 plus 20 per topping or a clear rejection message. Implement a custom `OrderError`, annotated functions, a `logging` log, and this behavior: group independent size and topping errors in an ExceptionGroup; do not print a receipt after rejection. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 23. Triangle existence {#v23}

**1. Initial level.** Create a Python 3.14 console program that reads three integer side lengths from 1 to 10000 from the keyboard. Check that the sum of any two sides is greater than the third. Print the perimeter or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads three integer side lengths from 1 to 10000 from the keyboard. Check that the sum of any two sides is greater than the third. Print the perimeter or a clear rejection message. Implement annotated functions and a custom `TriangleError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads three integer side lengths from 1 to 10000 from the keyboard. Check that the sum of any two sides is greater than the third. Print the perimeter or a clear rejection message. Implement a custom `TriangleError`, annotated functions, a `logging` log, and this behavior: raise explicitly for invalid input and use assert only for the perimeter invariant; compare behavior with -O. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 24. Gym {#v24}

**1. Initial level.** Create a Python 3.14 console program that reads a pass expiration day and a visit day in 1..365 from the keyboard. Check that the visit day does not exceed the expiration day. Print permission to enter and the days remaining or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads a pass expiration day and a visit day in 1..365 from the keyboard. Check that the visit day does not exceed the expiration day. Print permission to enter and the days remaining or a clear rejection message. Implement annotated functions and a custom `ExpiredPassError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads a pass expiration day and a visit day in 1..365 from the keyboard. Check that the visit day does not exceed the expiration day. Print permission to enter and the days remaining or a clear rejection message. Implement a custom `ExpiredPassError`, annotated functions, a `logging` log, and this behavior: process three visits and log expiration and invalid format separately. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 25. Archery {#v25}

**1. Initial level.** Create a Python 3.14 console program that reads three integer shot scores from the keyboard. Check that each score is in 0..10. Print the sum and average or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads three integer shot scores from the keyboard. Check that each score is in 0..10. Print the sum and average or a clear rejection message. Implement annotated functions and a custom `ShotError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads three integer shot scores from the keyboard. Check that each score is in 0..10. Print the sum and average or a clear rejection message. Implement a custom `ShotError`, annotated functions, a `logging` log, and this behavior: group all violations in an ExceptionGroup with shot numbers. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 26. Electrical grid {#v26}

**1. Initial level.** Create a Python 3.14 console program that reads a voltage of 1..250 V, a current of 0..100 A, and an allowed power of 1..25000 W from the keyboard. Check that the values are finite and their product does not exceed the limit. Print the power and remaining capacity or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads a voltage of 1..250 V, a current of 0..100 A, and an allowed power of 1..25000 W from the keyboard. Check that the values are finite and their product does not exceed the limit. Print the power and remaining capacity or a clear rejection message. Implement annotated functions and a custom `OverloadError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads a voltage of 1..250 V, a current of 0..100 A, and an allowed power of 1..25000 W from the keyboard. Check that the values are finite and their product does not exceed the limit. Print the power and remaining capacity or a clear rejection message. Implement a custom `OverloadError`, annotated functions, a `logging` log, and this behavior: wrap parameter input errors in a custom InputError using raise from, and handle overload separately. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 27. Checkout {#v27}

**1. Initial level.** Create a Python 3.14 console program that reads an order amount of 1..100000, a payment of 0..100000, and a zone A or B from the keyboard. Check that the payment covers the amount plus delivery of 50 for A or 100 for B. Print the final receipt and change or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads an order amount of 1..100000, a payment of 0..100000, and a zone A or B from the keyboard. Check that the payment covers the amount plus delivery of 50 for A or 100 for B. Print the final receipt and change or a clear rejection message. Implement annotated functions and a custom `CheckoutError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads an order amount of 1..100000, a payment of 0..100000, and a zone A or B from the keyboard. Check that the payment covers the amount plus delivery of 50 for A or 100 for B. Print the final receipt and change or a clear rejection message. Implement a custom `CheckoutError`, annotated functions, a `logging` log, and this behavior: use separate PaymentError and DeliveryError types and preserve the conversion cause using raise from. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 28. Bicycle rental {#v28}

**1. Initial level.** Create a Python 3.14 console program that reads a busy flag of 0 or 1 and planned and actual durations of 1..24 hours from the keyboard. Check that only a free bicycle can be rented. Print the cost at 40 per actual hour and a late-return flag or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads a busy flag of 0 or 1 and planned and actual durations of 1..24 hours from the keyboard. Check that only a free bicycle can be rented. Print the cost at 40 per actual hour and a late-return flag or a clear rejection message. Implement annotated functions and a custom `BikeBusyError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads a busy flag of 0 or 1 and planned and actual durations of 1..24 hours from the keyboard. Check that only a free bicycle can be rented. Print the cost at 40 per actual hour and a late-return flag or a clear rejection message. Implement a custom `BikeBusyError`, annotated functions, a `logging` log, and this behavior: use finally to report the attempt status; use WARNING for a late return and reject a busy bicycle. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 29. Cold storage {#v29}

**1. Initial level.** Create a Python 3.14 console program that reads three finite temperatures in -50..30 from the keyboard. Check that the example operating range is 2..8 inclusive. Print the average only for an accepted series or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads three finite temperatures in -50..30 from the keyboard. Check that the example operating range is 2..8 inclusive. Print the average only for an accepted series or a clear rejection message. Implement annotated functions and a custom `TemperatureError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads three finite temperatures in -50..30 from the keyboard. Check that the example operating range is 2..8 inclusive. Print the average only for an accepted series or a clear rejection message. Implement a custom `TemperatureError`, annotated functions, a `logging` log, and this behavior: use WARNING near the boundaries, at 2..3 and 7..8; group all readings outside 2..8 in an ExceptionGroup. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

### Variant 30. Lottery ticket {#v30}

**1. Initial level.** Create a Python 3.14 console program that reads three integers from the keyboard. Check that they are distinct and in 1..10. Print the number of matches with the winning numbers 2, 5, 8 or a clear rejection message. Use annotated functions; catch expected conversion errors; test ordinary and boundary cases.

**2. Basic level.** Create a Python 3.14 console program that reads three integers from the keyboard. Check that they are distinct and in 1..10. Print the number of matches with the winning numbers 2, 5, 8 or a clear rejection message. Implement annotated functions and a custom `TicketError` exception for domain failures. Record successes and failures through a named logger in a UTF-8 file; do not change state after rejection.

**3. Advanced level.** Create a Python 3.14 console program that reads three integers from the keyboard. Check that they are distinct and in 1..10. Print the number of matches with the winning numbers 2, 5, 8 or a clear rejection message. Implement a custom `TicketError`, annotated functions, a `logging` log, and this behavior: check ranges and duplicates before counting; log only the status and match count. Show a boundary case in the debugger and provide at least five checks, including a rejection; distinguish successful and rejected operations.

## Procedure

1. Record the input/output contract, formulas, ranges, and expected error types; determine which failures can be retried.
2. Implement annotated functions and short `try` blocks; separate user messages from the diagnostic log.
3. Test an ordinary case, every boundary, invalid format, every custom exception, and a retry after failure. Show that a rejected operation leaves the state unchanged. Provide a table of expected and actual results for at least five input sets.
4. Use ordinary and conditional breakpoints. Save the local values in a stack frame and check a formula in Evaluate Expression. Repeat one check in `pdb`.
5. For the invariant task, compare ordinary execution with `-O`; input checks must work in both modes. For exception groups, demonstrate at least two independent failures.
6. Save the code, a README with the launch command, the test table, and a brief description of a logic error you found in a local Git repository. Do not commit `.venv`, `__pycache__`, or logs containing personal data. Publishing on GitHub is optional.
7. During the defense, explain the `except` order, the cause preserved by `raise from`, the purpose of `finally`, the logging levels, and the result of a boundary test.
