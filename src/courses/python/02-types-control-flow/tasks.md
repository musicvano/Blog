---
title: "Tasks"
description: "Topic 2. Types, operations, and control flow: task variants"
outline: [2, 3]
sourceHash: "8a4ee5ead5dd702c4bfb3d5d97c82aba7c8ac9d7f0fb39bd69802d37cde48bab"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

In this assignment, the main interface is console input and menus. Use Python 3.14, PyCharm, and the standard library. Create `.venv` as in Assignment 1; no additional packages are needed. Classes, list comprehensions, and your own general-purpose validation functions are optional: they will be covered in later topics. Define the input format explicitly for each program. For positive integers, check the length, ASCII digits, and allowed limits before `int`. For signed integers, you can separate one leading minus sign; a string with only a sign is invalid. For real numbers, you may use a contract of “valid numeric notation with a decimal point”, but finiteness and domain checks are required. `try`/`except` is not needed before Topic 4. All prices, rates, and exchange rates below are for learning purposes.

## Variants

### Variant 1. Leap year {#v1}

**1. Initial level.** Create a Python console program. Enter a year in 1..9999. Determine whether it is a leap year: divisible by 400, or divisible by 4 but not by 100. Print the answer and the number of days in the year.

**2. Basic level.** Create a Python console program. Enter a year in 1..9999 and a month in 1..12. Print the number of days in the month, accounting for leap years. Repeat the prompt until year 0.

**3. Advanced level.** Create a Python console program. Create a menu: leap-year check, month calendar, exit. For the calendar, enter a year in 1..9999, month in 1..12, and weekday number for the first day in 1..7 (Monday..Sunday). Print a seven-column grid with correct indentation; build the calendar using loops, without the calendar module.

### Variant 2. Prime numbers {#v2}

**1. Initial level.** Create a Python console program. Enter an integer n from 2 to 100000. Test primality by searching for a divisor up to and including isqrt(n); explain the result in the output.

**2. Basic level.** Create a Python console program. Enter endpoints 0 &lt;= a &lt;= b &lt;= 100000 with a width of at most 1000. Print prime numbers including endpoints, their count, and their sum. Do not treat 0 or 1 as prime.

**3. Advanced level.** Create a Python console program. Create a menu for testing primality, prime factorization, and finding primes in a range. Numbers are in 2..100000, with a range width of at most 1000. Print repeated factors, for example 12 = 2 \* 2 \* 3; return to the menu after each operation.

### Variant 3. Guess the number {#v3}

**1. Initial level.** Create a Python console program. Set the secret to 7. Ask for one integer in 1..20 and print whether it equals the secret, is smaller, or is larger.

**2. Basic level.** Create a Python console program. Choose a secret using randint(1, 100). Allow seven valid attempts and print higher/lower hints. Invalid formats and values outside 1..100 do not use an attempt. At the end, show the secret and the attempt count.

**3. Advanced level.** Create a Python console program. Create a game menu with levels: 1..20 with 5 attempts, and 1..100 with 7 attempts. After each game, offer a new game or exit. Count wins, losses, and the total number of valid attempts. Invalid input does not use an attempt. Provide a test mode with a specified secret within the level's range.

### Variant 4. Loan calculator {#v4}

**1. Initial level.** Create a Python console program. Enter principal P from 1 to 1000000 UAH and term n from 1 to 60 months. For a zero interest rate, print payment P/n with two decimal places.

**2. Basic level.** Create a Python console program. Enter P=1..1000000 UAH, annual rate r=0..50 percent, and n=1..60 months. Calculate i=r/1200 and payment A=P\*i/(1-(1+i)\*\*(-n)); when i=0, use P/n. Print A and the amount paid above the principal A\*n-P without intermediate rounding.

**3. Advanced level.** Create a Python console program. For P=1..1000000 UAH, r=0..50 percent, and n=1..60, build an annuity payment table: month, interest, principal repayment, remaining balance. i=r/1200, A=P\*i/(1-(1+i)\*\*(-n)); when i=0, A=P/n. Round interest and the regular payment to kopiykas using Decimal ROUND\_HALF\_UP; the last payment equals the remaining balance plus interest. Print the total payments and the amount above the principal; the balance after the last payment must be zero.

### Variant 5. ECTS scale {#v5}

**1. Initial level.** Create a Python console program. Enter an integer score in 0..100. Print A for 90..100, B for 82..89, C for 74..81, D for 64..73, E for 60..63, FX for 35..59, and F for 0..34.

**2. Basic level.** Create a Python console program. Enter a student count in 1..50, then scores in 0..100. Convert each score using A:90..100, B:82..89, C:74..81, D:64..73, E:60..63, FX:35..59, F:0..34. Print the grades, mean score, and count of scores below 60.

**3. Advanced level.** Create a Python console program. Create a menu for entering a group of 1..50 scores, displaying a report, and exiting. Scale: A from 90, B from 82, C from 74, D from 64, E from 60, FX from 35, F below 35; valid scores are 0..100. The report contains the count and percentage of each grade, minimum, maximum, and mean. Entering a new group resets previous totals; a report requested before input must not divide by zero.

### Variant 6. Taxi fares {#v6}

**1. Initial level.** Create a Python console program. Enter a positive distance up to 500 km. The example fare is a 60 UAH base charge plus 12 UAH per kilometer. Print the amount with two decimal places.

**2. Basic level.** Create a Python console program. Enter distance 0..500 km, fare economy or comfort, and hour 0..23. The base and per-kilometer charges are 60 and 12 UAH, or 90 and 18 UAH. From 22:00 to 05:59, multiply the entire fare by 1.2. Print a breakdown.

**3. Advanced level.** Create a Python console program. Process a shift of 1..100 rides: distance 0..500 km, hour 0..23, economy/comfort. Fares are 60+12d or 90+18\*d UAH; nighttime hours 22..23 and 0..5 apply a multiplier of 1.2. Print a row for each ride and count revenue, kilometers, and nighttime rides. Calculate monetary totals from rows rounded to kopiykas.

### Variant 7. Divisibility {#v7}

**1. Initial level.** Create a Python console program. Enter two positive integers up to 1000000. Calculate the GCD using Euclid's algorithm and print the result.

**2. Basic level.** Create a Python console program. Enter two positive integers up to 1000000. Calculate the GCD and LCM using a//gcd\*b; use a loop to print all positive divisors of the smaller number.

**3. Advanced level.** Create a Python console program. Create a menu for the GCD/LCM of two numbers, divisors of a number, and testing for a perfect number. Arguments are in 1..100000. A perfect number equals the sum of its positive divisors smaller than itself; 1 is not perfect. Print input data and the result for each operation; 0 in the menu exits.

### Variant 8. Triangle classification {#v8}

**1. Initial level.** Create a Python console program. Enter three positive integer side lengths up to 1000. Check the strict triangle inequalities and classify the triangle as equilateral, isosceles, or scalene.

**2. Basic level.** Create a Python console program. Enter three positive integer side lengths up to 1000. Check existence, classify by side lengths, and calculate the perimeter and Heron's area sqrt(p\*(p-a)\*(p-b)\*(p-c)), where p=(a+b+c)/2.

**3. Advanced level.** Create a Python console program. For 1..20 sets of integer side lengths in 1..1000, check whether a triangle exists. For valid sets, calculate Heron's area, angles in degrees using the law of cosines, and classification by angles. Compare squared integer sides exactly; clamp the acos argument to \[-1,1\]. Print a table and the count of rejected sets.

### Variant 9. ATM {#v9}

**1. Initial level.** Create a Python console program. Enter a positive amount up to 10000 UAH divisible by 100. Banknotes of 1000, 500, 200, and 100 UAH are unlimited. Use greedy division to print the count of each denomination.

**2. Basic level.** Create a Python console program. For an amount of 100..10000 UAH divisible by 100 and an initial balance of 0..100000 UAH, check sufficient funds. With unlimited banknotes of 1000, 500, 200, and 100, dispense the minimum number of notes and show the new balance; do not change the balance on rejection.

**3. Advanced level.** Create a Python console program. Create a menu for balance, withdrawal, and exit. The initial balance is 20000 UAH, the per-withdrawal limit is 10000 UAH, and the session limit is 15000 UAH. Banknotes of 1000, 500, 200, and 100 are unlimited; the amount must be divisible by 100. Show the dispensed denominations, a text log with successful operation numbers, and the total withdrawn; rejections must not change the balance or limit.

### Variant 10. Utility bills {#v10}

**1. Initial level.** Create a Python console program. Enter previous and current nonnegative integer meter readings up to 1000000. The current reading must be at least the previous one. Calculate consumption and the amount due at 4 UAH per unit.

**2. Basic level.** Create a Python console program. For nondecreasing readings in 0..1000000, calculate consumption. The first 100 units cost 3 UAH each, and the rest cost 5 UAH each. Print the amount for each tier and the total.

**3. Advanced level.** Create a Python console program. Process 1..50 apartments with previous and current readings in 0..1000000. The first 100 consumed units cost 3 UAH each, and subsequent units cost 5 UAH. Print a number/consumption/amount table, total consumption, revenue, and the count of apartments consuming more than 100 units. Prompt again for an invalid pair.

### Variant 11. Chessboard {#v11}

**1. Initial level.** Create a Python console program. Enter the row and column of two squares as integers in 1..8. Determine whether they have the same color using the parity of their coordinate sums.

**2. Basic level.** Create a Python console program. Enter two different squares with coordinates in 1..8. Determine whether a knight can move from the first to the second in one move: absolute coordinate differences must be 1 and 2 in either order.

**3. Advanced level.** Create a Python console program. Create a menu for a knight's or queen's attack board. Enter the piece's position with coordinates in 1..8; print 8 rows of 8 characters: K/Q for the piece, \* for attacked squares, and . for the rest. There are no other pieces. For the queen, use a shared row, column, or diagonal; count attacked squares.

### Variant 12. Armstrong numbers {#v12}

**1. Initial level.** Create a Python console program. Enter a three-digit integer in 100..999. Extract digits using // and %, and check whether the number equals the sum of the cubes of its digits.

**2. Basic level.** Create a Python console program. Enter endpoints 0 &lt;= a &lt;= b &lt;= 9999. Print numbers equal to the sum of their digits raised to the number of digits. The number 0 has one digit. Count the numbers found.

**3. Advanced level.** Create a Python console program. Create a menu for checking a number in 0..999999, searching a range with a width of at most 10000, and exiting. An Armstrong number equals the sum of its digits raised to their count; 0 has one digit. For a search, print the numbers and separate result counts for 1, 2, 3, 4, 5, and 6 digits.

### Variant 13. Weekly temperatures {#v13}

**1. Initial level.** Create a Python console program. Enter seven finite temperatures from -60 to 60 degrees. Calculate their mean using a loop and print it with one decimal place.

**2. Basic level.** Create a Python console program. Enter seven temperatures in -60..60. Without storing the entire series, find the mean, minimum, maximum, and count of temperatures below zero. Use the first measurement to initialize the extrema.

**3. Advanced level.** Create a Python console program. Enter seven temperatures in -60..60. Print each day number and temperature, the mean, minimum/maximum, and the days of their first occurrence. Count increases, decreases, and equal values relative to the previous day, as well as the longest sequence of days below zero. The first day has no preceding comparison.

### Variant 14. Numeral systems {#v14}

**1. Initial level.** Create a Python console program. Enter an integer in 0..65535. Convert it to binary by repeated division by 2, without bin or format; print 0 for zero.

**2. Basic level.** Create a Python console program. Enter an integer in 0..65535 and a base in 2..16. Use repeated division to obtain a representation with digits 0123456789ABCDEF, without built-in base conversion.

**3. Advanced level.** Create a Python console program. Create a menu: convert a decimal number in 0..1000000 to base 2..16, or a 1..16-character representation in a specified base to decimal. Allowed digits are 0123456789ABCDEF, without a sign; accept lowercase after upper. Validate each digit and accumulate the value as value\*base+digit. Do not use int(text, base), bin, oct, or hex.

### Variant 15. Roman numerals {#v15}

**1. Initial level.** Create a Python console program. Enter an integer in 1..10 and use match to print its Roman representation I..X; reject other values.

**2. Basic level.** Create a Python console program. Enter an integer in 1..3999. Build the canonical Roman representation by successively subtracting 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 and appending M, CM, D, CD, C, XC, L, XL, X, IX, V, IV, I. The implementation may use successive while loops without collections.

**3. Advanced level.** Create a Python console program. Create a menu for converting 1..3999 to Roman numerals and a Roman string of up to 15 characters to a number. Allowed symbols are IVXLCDM, with subtractive pairs IV, IX, XL, XC, CD, CM. Check canonical form by converting the resulting number back to Roman and comparing exactly after upper; reject IIII, IC, and empty input.

### Variant 16. Progressive tax {#v16}

**1. Initial level.** Create a Python console program. For an example income of 0..1000000 UAH, calculate a 10 percent tax and show the tax and remainder with two decimal places.

**2. Basic level.** Create a Python console program. Enter monthly income in 0..1000000 UAH. Example marginal rates: the first 10000 UAH at 0 percent, the next 20000 UAH at 10 percent, and the rest at 20 percent. Print tax by tier and net income.

**3. Advanced level.** Create a Python console program. For 12 incomes of 0..1000000 UAH each, apply this scale to each month: the first 10000 tax-free, the next 20000 at 10 percent, and the rest at 20. Print a monthly report, annual income, tax, and net amount. The effective rate is total tax/income\*100; handle zero annual income separately. These are example rates.

### Variant 17. Speeding fines {#v17}

**1. Initial level.** Create a Python console program. Enter a nonnegative speed up to 300 km/h and a limit in 1..130. Determine the amount over the limit or the absence of a violation.

**2. Basic level.** Create a Python console program. Given speed 0..300 and limit 1..130, calculate an example fine: up to 10 over the limit inclusive costs 0 UAH, over 10 through 30 inclusive costs 500 UAH, and over 30 costs 1500 UAH. Print the excess speed and amount.

**3. Advanced level.** Create a Python console program. Process 1..100 speed measurements in 0..300 km/h with a shared limit in 1..130. Example fines: excess &lt;=10 gives 0, 10..30 with an exclusive lower bound gives 500 UAH, and over 30 gives 1500 UAH. Print measurement rows, the count exceeding the speed limit, count of nonzero fines, their sum, and the greatest excess speed.

### Variant 18. Running workouts {#v18}

**1. Initial level.** Create a Python console program. Enter a distance in 0.1..100 km and duration in 1..1440 minutes. Print average speed in km/h and pace in min/km.

**2. Basic level.** Create a Python console program. For seven workouts, enter distance 0.1..100 km and time 1..1440 minutes. Print each pace in minutes and seconds per kilometer, total distance, and total time. Round pace seconds once before divmod.

**3. Advanced level.** Create a Python console program. For 1..30 workouts with distance 0.1..100 km and time 1..1440 minutes, build a pace table and find the best (lowest) pace and the number of the first workout with it. Calculate overall pace as total time/total distance, rather than the average of paces. Print the longest distance and totals.

### Variant 19. Coffee machine {#v19}

**1. Initial level.** Create a Python console program. For command espresso, americano, or latte, use match to print an example price of 30, 35, or 45 UAH; reject other commands.

**2. Basic level.** Create a Python console program. Accept one drink espresso/americano/latte at 30/35/45 UAH and an integer payment of 0..1000 UAH. If payment is sufficient, print change using the minimum number of unlimited 10, 5, 2, and 1 UAH coins; otherwise report the shortfall.

**3. Advanced level.** Create a Python console program. Create a sales menu: espresso 30 UAH (10 g coffee, 30 mL water), americano 35 (10 g, 150 mL), latte 45 (10 g, 30 mL, 150 mL milk). Start with 100 g coffee, 1000 mL water, and 1000 mL milk. Payment is an integer in 0..1000 UAH; change in 10, 5, 2, 1 coins is unlimited. Only successful sales reduce stock; print revenue, sales count, and remaining stock before exit.

### Variant 20. Collatz conjecture {#v20}

**1. Initial level.** Create a Python console program. Enter n=1..1000000. Perform one step: integer n/2 for even n, or 3\*n+1 for odd n. Print the new number.

**2. Basic level.** Create a Python console program. For n=1..1000000, print the Collatz sequence until 1 or 1000 transitions. Divide even numbers by 2 and replace odd numbers with 3\*n+1. Print the transition count and maximum; distinguish reaching the limit from reaching 1.

**3. Advanced level.** Create a Python console program. For 1 &lt;= a &lt;= b &lt;= 10000 with a width of at most 1000, calculate the Collatz transition count for each starting value with a limit of 1000. Print a start/steps/status table and the smallest starting value with the greatest step count among completed sequences. Do not consider sequences that reach the limit a proven counterexample to the conjecture.

### Variant 21. Character shapes {#v21}

**1. Initial level.** Create a Python console program. Enter n=1..20. Use nested loops to print a right triangle of asterisks: row i from 1 to n has exactly i characters.

**2. Basic level.** Create a Python console program. Enter width and height in 2..30. Print an empty rectangular frame of \*: characters only on the boundary, spaces inside. Count the printed asterisks.

**3. Advanced level.** Create a Python console program. Create a menu for a triangle, frame, and diamond. The triangle has height 1..20, the frame has dimensions 2..30, and the diamond has odd height 1..19. Center the diamond, with row widths 1, 3, …, n, …, 3, 1. Build shapes using nested loops, print the asterisk count, and return to the menu after each shape.

### Variant 22. Lucky tickets {#v22}

**1. Initial level.** Create a Python console program. Enter a number in 0..999999, treating it as six digits with leading zeros. Use // and % to compare the sums of the first three and last three digits; print the six-digit number and whether it is lucky.

**2. Basic level.** Create a Python console program. Enter 0 &lt;= a &lt;= b &lt;= 999999 with a width of at most 10000. Treat numbers as six digits with leading zeros. Count numbers with equal sums for the two digit triples; print the count and first match, or a message that none were found.

**3. Advanced level.** Create a Python console program. Create a menu for checking a six-digit ticket and finding the nearest lucky number in 0..999999. Account for leading zeros. A lucky number has equal sums of its first and last three digits. Search by increasing distance; at equal distances, choose the smaller number, and skip out-of-range values.

### Variant 23. Rock, scissors, paper {#v23}

**1. Initial level.** Create a Python console program. Enter two moves from rock, scissors, paper. Print a draw or the winner using these rules: rock beats scissors, scissors beats paper, and paper beats rock.

**2. Basic level.** Create a Python console program. Play five rounds against the computer, which chooses random.randint(1,3): rock, scissors, paper. An invalid move does not count as a round. Print moves, results, and the counts of wins, losses, and draws.

**3. Advanced level.** Create a Python console program. Play a match against a random opponent until one side reaches N wins, N=1..10. Moves are 1=rock, 2=scissors, 3=paper; a draw does not change the score. Provide q for early exit and a safety limit of 100 rounds. Print the score and distinguish winning, exiting, and reaching the limit; an invalid move does not use a round.

### Variant 24. Parking {#v24}

**1. Initial level.** Create a Python console program. Enter a duration in 0..1440 minutes. Each started hour costs 30 UAH; zero duration is free. Print the number of billable hours and the amount.

**2. Basic level.** Create a Python console program. Enter arrival and departure hours and minutes within one day; departure must not precede arrival. The first 15 minutes are free, then each started hour costs 30 UAH: ceil((minutes-15)/60). Print the duration and amount.

**3. Advanced level.** Create a Python console program. Process 1..50 parking stays: arrival and departure 00:00..23:59, a next-day departure flag 0/1, and a concession flag 0/1. Duration is 0..1440 minutes, the first 15 are free, and the rest cost 30 UAH per started hour; the concession halves the amount. Print a table of durations and amounts and the total revenue; prompt again for impossible intervals.

### Variant 25. Savings with deposits {#v25}

**1. Initial level.** Create a Python console program. Enter an initial amount of 0..1000000 UAH and annual rate of 0..30 percent. Calculate the balance after one month at rate r/1200 without an additional deposit.

**2. Basic level.** Create a Python console program. Enter an amount of 0..1000000 UAH, annual rate 0..30, monthly deposit 0..100000 UAH, and term 1..120 months. Each month, first add interest, then the deposit. Print a balance table; round interest to kopiykas using Decimal ROUND\_HALF\_UP.

**3. Advanced level.** Create a Python console program. Enter starting amount 0..1000000 UAH, target 1..2000000 UAH, rate 0..30, and deposit 0..100000 UAH. Use a loop to determine the month when the target is reached, with a limit of 600 months; a starting amount already at least the target means 0 months. Each month, add interest rounded with Decimal ROUND\_HALF\_UP, then the deposit. Show contributions and interest separately; report no growth or failure to reach the target within the limit.

### Variant 26. A series of quadratic equations {#v26}

**1. Initial level.** Create a Python console program. Enter integers a, b, c from -100 to 100, with nonzero a. Calculate the discriminant and number of distinct real roots: 0, 1, 2.

**2. Basic level.** Create a Python console program. Enter 1..20 equations with integer a, b, c from -100 to 100. Solve all real cases, including a=0; distinguish no solutions from infinitely many solutions. Print each equation's coefficients and roots.

**3. Advanced level.** Create a Python console program. For 1..20 sets of integer coefficients in -100..100, solve quadratic and degenerate equations. For a negative discriminant, use cmath.sqrt and print real and imaginary parts. Count equations with two distinct real roots, one real root, two complex roots, linear equations, no solutions, and infinitely many solutions; categories are mutually exclusive.

### Variant 27. Mental arithmetic trainer {#v27}

**1. Initial level.** Create a Python console program. Choose two random integers in 1..10. Ask for their sum, accept an integer answer, and report whether it is correct and the correct result.

**2. Basic level.** Create a Python console program. Ask ten random addition questions using numbers in 1..20. Check answers, count correct ones, and show the success percentage and mistakes. Allow a fixed seed for testing.

**3. Advanced level.** Create a Python console program. Ask N=1..30 random addition, subtraction, or multiplication questions using numbers in 1..20. Measure response time with time.perf\_counter; allow negative answers. Print the correct count, percentage, total and mean time, and the slowest question number. An empty string exits early; calculate the mean only over completed answers.

### Variant 28. Store discounts {#v28}

**1. Initial level.** Create a Python console program. Enter a purchase amount of 0..100000 UAH. A 5 percent discount applies from 1000 UAH inclusive. Print the discount and amount due.

**2. Basic level.** Create a Python console program. Enter an amount of 0..100000 UAH. The example discount on the entire amount is 0 percent below 1000, 5 from 1000 to 5000, and 10 from 5000. Print the original amount, discount, and total with two decimal places.

**3. Advanced level.** Create a Python console program. Enter 1..20 items: price in integer kopiykas 1..1000000 and quantity 1..100. Based on the receipt total, the discount is 0 percent below 1000 UAH, 5 from 1000, and 10 from 5000. Use match for promo code NONE/SAVE5, which gives another 0/5 percent off the amount after the main discount. Round after each discount using Decimal ROUND\_HALF\_UP; print items, both discounts, and the total.

### Variant 29. Taylor series {#v29}

**1. Initial level.** Create a Python console program. Enter x from -1 to 1. Approximate exp(x) using the first five terms 1+x+x²/2!+x³/3!+x⁴/4!, with a loop and recurrence term\*=x/k. Print the approximation and math.exp(x).

**2. Basic level.** Create a Python console program. Enter x from -3 to 3 and epsilon from 1e-12 to 1e-3. For exp(x), start with sum=term=1; add a new term term\*=x/k until its absolute value becomes smaller than epsilon. Do not add the small term. Limit the series to 1000 terms; print the sum, number of terms added, and absolute difference from math.exp.

**3. Advanced level.** Create a Python console program. Create a menu for exp(x) or sin(x), with x in \[-3,3\] radians and epsilon=1e-12..1e-3. For exp, start with 1 and term\*=x/k; for sin, start with x and term\*=-x\*x/((2k)\*(2k+1)), with k starting at 1. Include the initial term, then add subsequent terms only when abs(term)&gt;=epsilon. Limit the series to 1000 terms. Print the count, approximation, math value, and absolute error; do not describe epsilon as a guaranteed error bound for the entire sum.

### Variant 30. Class bell schedule {#v30}

**1. Initial level.** Create a Python console program. Enter a starting hour in 0..23, minute in 0..59, and duration in 1..180 minutes. Print the ending time HH:MM and whether it crosses into the next day.

**2. Basic level.** Create a Python console program. Enter the starting HH:MM as separate integers, class count 1..8, class duration 30..120 minutes, and break 0..60 minutes. Use a loop to print each class's start and end; show +1 day when crossing midnight.

**3. Advanced level.** Create a Python console program. Build a schedule of 1..8 classes starting at a given HH:MM. Duration is 30..120 minutes, regular break 0..60 minutes, with a long break of 0..120 minutes after a chosen class 1..N-1 instead of the regular break; there is none for N=1. Print a table showing day changes and the total class and break minutes. Do not add a break after the last class.

## Procedure

1. Record the variant number, level, input data, units, and limits. Write the formulas and determine which branches and loops are needed.
2. Implement the program in a separate directory of a local Git repository. Add clear input prompts and result labels.
3. Check at least five data sets: ordinary, boundary, invalid domain, one iteration, and termination/empty result where meaningful. Add a separate test for every branch not covered by these sets.
4. Calculate at least one result manually. State the rounding rule and acceptable tolerance if you use real numbers.
5. Run the file in PyCharm and the terminal: on Windows, `.\.venv\Scripts\python.exe main.py`; on Linux/macOS, `./.venv/bin/python main.py`. Compare the results.
6. Save the code, a README with run instructions, the test table, and meaningful commits. Do not add `.venv` or `__pycache__`. Submit a local repository; GitHub remains optional.
7. During the defense, explain the types, order of checks, loop termination condition, and one boundary case. Show what changes if you replace `elif` with an independent `if` or move a loop's `else`.
