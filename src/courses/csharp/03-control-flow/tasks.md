---
title: "Tasks"
description: "Topic 3. Branching and loops: task variants"
outline: [2, 3]
sourceHash: "243d2c891fd1f5c67ca0e4967f420b3e71694d99106cc2f43a8d2239de068933"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Fibonacci numbers {#v1}

**1. Initial level.** Create a console program that displays the first 20 Fibonacci numbers (each number is the sum of the previous two; the first two are 0 and 1) on one line separated by spaces, and separately displays how many of them are even.

**2. Basic level.** Create a console program that asks the user for an integer *N* (from 1 to 10<sup>18</sup>), repeats the prompt for invalid input, and displays all Fibonacci numbers not exceeding *N*, 5 per line, their count and sum using `long`, and whether *N* itself is a Fibonacci number.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts `--count N` or `--max N` and `--start a,b` (the first two terms, default `0,1`). The program displays a table of “index — number — ratio to the previous number,” computing numbers in a `checked` context. If `long` overflows, it reports the term where this happened to standard error and displays the values already computed. Below the table, display how much the final ratio differs from the golden ratio (1 + √5)/2. Exit codes: 0 — success, 1 — overflow, 2 — invalid options; `--help` displays help.

### Variant 2. Guess the number {#v2}

**1. Initial level.** Create a console game in which the computer chooses a random number from 1 to 100 (`Random.Shared.Next`) and the user guesses it. After each attempt, the program hints “higher” or “lower”; after a correct guess, it displays the number of attempts.

**2. Basic level.** Create a “Guess the number” console game with difficulty selected using a `switch` expression: easy (1–50, 10 attempts), medium (1–100, 7 attempts), hard (1–1000, 10 attempts). Invalid input does not count as an attempt; if the attempts run out, the program reveals the number. After the game, offer to play again.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method in which the user and computer take turns: the user guesses in the first round; in the second, the computer guesses the user’s number by binary search using the responses `>`, `<`, `=`. Options `--rounds N`, `--max M`, and `--seed S` (for reproducible random numbers) specify the game parameters. The program detects contradictory user responses, displays a table of “round — who guessed — number — attempts,” and determines the winner by the total attempts; `--help` displays help, and invalid options are reported to standard error with exit code 2.

### Variant 3. ATM {#v3}

**1. Initial level.** Create a console program that determines the smallest number of banknotes in denominations of 1000, 500, 200, 100, 50, 20, and 10 UAH needed to dispense 3,780 UAH (specified in the program), and displays the number of banknotes of each denomination.

**2. Basic level.** Create a console ATM program with a menu in a `do`/`while` loop: check balance, deposit, withdraw cash, exit. A withdrawal must be a multiple of 10 and must not exceed the balance or the daily limit of 20,000 UAH. Dispense it using the fewest banknotes in denominations of 1000, 500, 200, 100, 50, 20, and 10 UAH, displaying the count of each.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that models an ATM with a limited banknote supply specified by `--cassettes 1000:5,500:10,200:20,100:30,50:10` and processes amounts passed as arguments. For each amount, find a way to dispense it using the remaining banknotes (if the greedy method fails, try smaller counts of larger banknotes), reduce the supply, and display a table of “amount — banknotes — result.” Report amounts that cannot be dispensed to standard error; display the remaining banknotes at the end. Exit codes: 0, 1 (some amounts were not dispensed), 2 (invalid options); `--help` displays help.

### Variant 4. Progressive tax {#v4}

**1. Initial level.** Create a console program that computes the tax on an annual income of 480,000 arbitrary units (specified in the program) using progressive brackets: up to 100,000 — 0%, from 100,000 to 300,000 — 10%, from 300,000 to 600,000 — 20%, above 600,000 — 30% (each rate applies only to the portion of income in its bracket).

**2. Basic level.** Create a console program that repeatedly asks for incomes until a blank line, computes the progressive tax on each (0% up to 100,000, 10% up to 300,000, 20% up to 600,000, 30% above), determines the rate on the highest portion of income using a `switch` expression with relational patterns, and displays the tax, net income, and effective rate, followed by totals at the end.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method in which tax brackets are specified by `--brackets 100000:0,300000:10,600000:20,max:30`, and incomes are supplied as arguments or keyboard input lines. Verify that bracket boundaries increase, compute the tax on each income using `decimal`, and display a table of “income — tax by bracket — total tax — effective rate.” With `--compare rate`, compare the progressive scale with a flat rate. Report errors to standard error with exit code 2; `--help` displays help.

### Variant 5. Mobile plan {#v5}

**1. Initial level.** Create a console program that computes overage charges (1.5 UAH per minute, 40 UAH per started GB) and the total bill for a subscriber who used 540 call minutes, 18 GB of data, and 35 SMS messages on a 250 UAH monthly plan including 400 minutes, 15 GB, and 50 SMS messages (values specified in the program).

**2. Basic level.** Create a console program that asks the user for a plan name (`lite`, `smart`, `max`; allowances and prices are specified using a `switch` expression), minutes, gigabytes, and SMS messages used, validates the input, and displays the overage charge for each service, the total, and the plan that would be cheapest for this usage.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives a daily usage log in the format `day:minutes:MB:sms` and the option `--plan lite|smart|max`. Accumulate monthly usage, record the day each allowance was exhausted, compute overage charges, and display a plan comparison table of “plan — subscription fee — overage — total,” marking the best value. Report invalid records (day outside 1–31, negative values) to standard error; exit codes: 0, 1 (some records rejected), 2 (invalid options).

### Variant 6. Armstrong numbers and perfect numbers {#v6}

**1. Initial level.** Create a console program that finds and displays all three-digit Armstrong numbers (the number equals the sum of the cubes of its digits, for example 153 = 1 + 125 + 27).

**2. Basic level.** Create a console program that asks the user for range endpoints (positive integers no greater than 100,000), validates the input, and uses nested loops to display all Armstrong numbers (the sum of digits raised to the number of digits) and perfect numbers (equal to the sum of their divisors smaller than the number itself) in the range.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts `--from`, `--to`, and `--kind armstrong|perfect|amicable|abundant|all` and classifies numbers in the range: Armstrong, perfect, abundant (the divisor sum exceeds the number), and amicable pairs (each number’s divisor sum equals the other number). Search for divisors up to √*n*. Display a table of “number — divisor sum — type,” the count of each type, and execution time. Report invalid options to standard error with exit code 2; `--help` displays help.

### Variant 7. Collatz sequence {#v7}

**1. Initial level.** Create a console program that builds the Collatz sequence for 27 (specified in the program): divide an even number by 2 and replace an odd number with 3 · *n* + 1 until reaching 1. Display the number of steps and the maximum value in the sequence.

**2. Basic level.** Create a console program that asks the user for a positive integer, validates the input, and displays the Collatz sequence, 10 numbers per line, the number of steps, the maximum value, and the counts of even and odd terms.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that, for a range specified by `--from` and `--to` (up to 10,000,000), finds the number with the longest Collatz sequence and the number whose sequence reaches the highest value. Compute using `long` in a `checked` context; `--top N` displays a table of the N numbers with the longest sequences, and `--show` displays the winning number’s sequence. Report invalid options to standard error with exit code 2; `--help` displays help.

### Variant 8. Table of function values {#v8}

**1. Initial level.** Create a console program that displays a table of values of *y* = *x*<sup>2</sup> − 4 · *x* + 3 on [−1; 5] with a step of 0.5 in two aligned columns. Below it, display the minimum function value and the point where it occurs.

**2. Basic level.** Create a console program that asks the user for a function number (1 — sin *x*, 2 — *x*<sup>2</sup> − 4 · *x* + 3, 3 — 1/*x*; select using a `switch` expression), the start, end, and tabulation step, validates the input, and displays a table of values. Display “undefined” at points where the function is undefined. Below the table, display the minimum and maximum values and the number of sign changes.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts `--function sin|cos|poly|inverse|sqrt`, `--from`, `--to`, `--steps`, and `--width`, and displays a value table and a text plot: each row contains a string of `*` characters whose length reflects the value relative to the minimum and maximum on the interval. Handle discontinuities and points outside the domain, and find approximate roots on intervals with sign changes. Report invalid options to standard error with exit code 2; `--help` displays help.

### Variant 9. Monthly calendar {#v9}

**1. Initial level.** Create a console program that uses nested loops to display a calendar for a 30-day month starting on Wednesday (values specified in the program) as a grid with the heading “Mon Tue Wed Thu Fri Sat Sun.”

**2. Basic level.** Create a console program that asks the user for the month number and year, determines the number of days (accounting for leap years) using a `switch` expression and the weekday of the first day using Zeller’s congruence, and displays a calendar grid with weekends marked `*`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that displays a calendar for a year (`--year`) or month (`--month`) without using `DateTime`: arrange three months per row, start weeks on Monday or Sunday (`--first-day mon|sun`), and mark dates from `--holidays 01.01,08.03,24.08` with `!`. Below the calendar, display the number of working days in each month. Report invalid options to standard error with exit code 2; `--help` displays help.

### Variant 10. Rock, paper, scissors {#v10}

**1. Initial level.** Create a console program that plays one round of rock, paper, scissors: ask for the user’s choice (`r`, `s`, `p`), generate the computer’s choice using `Random.Shared`, and determine and display the round’s result using a `switch` expression and conditions.

**2. Basic level.** Create a console rock, paper, scissors game played until three wins: repeatedly ask for the user’s choice, repeat the prompt for invalid input, display the computer’s choice, each round’s result, and the score, and at the end display the winner and number of draws.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method for rock, paper, scissors, lizard, Spock (5 choices), with `--wins N`, `--seed S`, and `--strategy random|repeat|counter`. The `counter` strategy chooses a move that beats the user’s most frequent choice in previous rounds. Display the score after every round and, at the end, a table of the user’s choice frequencies, the longest winning streak, and the win percentage. Report invalid options to standard error with exit code 2; `--help` displays help.

### Variant 11. Coffee vending machine {#v11}

**1. Initial level.** Create a console program that displays a coffee machine menu (espresso 35 UAH, Americano 40 UAH, cappuccino 55 UAH), asks for the drink number, determines the price using a `switch` expression, and displays the selected drink’s name and price or an unknown-number message.

**2. Basic level.** Create a console coffee machine program that accepts coins and banknotes of 1, 2, 5, 10, 20, and 50 UAH in a loop (reject other denominations) until the inserted amount covers the selected drink’s price. Then return change using the fewest 10, 5, 2, and 1 UAH coins and offer to select another drink.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that models a coffee machine with ingredient supplies (water, coffee, and milk in grams, specified by `--stock`) and coins for change. Each drink uses ingredients according to its recipe; if ingredients or change coins are insufficient, cancel the order and return the inserted money. The `service` command displays a table of remaining supplies and revenue. Report errors to standard error; exit codes: 0 or 2 (invalid options); `--help` displays help.

### Variant 12. Beaufort scale {#v12}

**1. Initial level.** Create a console program that determines the Beaufort force for a wind speed of 12.4 m/s (specified in the program) using a `switch` expression with relational patterns (0 — below 0.5 m/s, 1 — up to 1.5, 2 — up to 3.3, 3 — up to 5.4, 4 — up to 7.9, 5 — up to 10.7, 6 — up to 13.8, 7 — up to 17.1, 8 — up to 20.7, 9 — up to 24.4, 10 — up to 28.4, 11 — up to 32.6, 12 — 32.7 and above), and displays the force and wind description.

**2. Basic level.** Create a console program that repeatedly asks for wind speeds (m/s or km/h with a suffix, for example `45kmh`) until a blank line, displays the Beaufort force and description for each, and at the end displays the measurement count, average and maximum speed, and number of measurements with gale-force winds (force 8 and above).

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives measurements in the format `hh:mm@speed@direction` (direction in degrees) and `--units ms|kmh|kn`. Display a table of “time — speed — force — description — compass point” (16 compass points using a `switch` expression), the duration of the longest period with wind at or above the force specified by `--alert`, and a force histogram using `#` characters. Report invalid records to standard error; exit codes: 0, 1 (some records rejected), 2 (invalid options).

### Variant 13. Taylor series for sin x and cos x {#v13}

**1. Initial level.** Create a console program that computes sin *x* for *x* = 1 (specified in the program) using the series *x* − *x*<sup>3</sup>/3! + *x*<sup>5</sup>/5! − … until a term has magnitude below 10<sup>−8</sup>, computing each term from the previous one. Display the result, number of terms, and `Math.Sin` value.

**2. Basic level.** Create a console program that asks the user for *x* (in degrees) and a tolerance, validates the input, converts the angle to radians, and computes sin *x* and cos *x* using Taylor series sums. Display the results, number of terms for each series, and absolute error compared with `Math.Sin` and `Math.Cos`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts `--function sin|cos|ln1p|atan`, `--from`, `--to`, `--step`, and `--eps`, and displays a table of “*x* — series sum — term count — `Math` value — error.” For ln(1 + *x*) and arctan *x*, check the series convergence domain (|*x*| &lt; 1) and mark points where the series diverges or the number of terms exceeds `--max-terms`. For large angles, first reduce sin and cos arguments to [−π; π]. Report invalid options to standard error with exit code 2; `--help` displays help.

### Variant 14. Bisection method {#v14}

**1. Initial level.** Create a console program that uses bisection to find a root of *x*<sup>3</sup> − 2 · *x* − 5 = 0 on [2; 3] with a tolerance of 10<sup>−6</sup>, and displays the root, the function value there, and the number of iterations.

**2. Basic level.** Create a console program that asks the user for an equation number from a menu (three equations; select using a `switch` expression), interval endpoints, and a tolerance. Verify that the function has opposite signs at the endpoints and display a table of bisection iterations (*a*, *b*, *c*, *f*(*c*)), the root, and iteration count.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that finds all roots of the function selected by `--function` on `--from`/`--to`: divide the interval using step `--scan`, and refine a root on every subinterval with a sign change using the bisection and chord methods. Display a table of “root — iterations (bisection) — iterations (chords) — |*f*(*x*)|” and a warning if a method does not converge within `--max-iter` iterations. Report invalid options to standard error with exit code 2; `--help` displays help.

### Variant 15. Lucky tickets {#v15}

**1. Initial level.** Create a console program that enumerates all six-digit ticket numbers from 000000 to 999999, counts “lucky” tickets whose first three digits have the same sum as their last three, and displays the count.

**2. Basic level.** Create a console program that asks the user for a ticket number (exactly 6 digits), validates the input, and determines whether it is lucky under two rules: the first three and last three digits have equal sums; the digits at even and odd positions have equal sums. Also display the next closest lucky ticket.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that, for tickets with number length `--digits` (4, 6, or 8) in `--from`/`--to`, counts lucky tickets under `--rule sum|parity|both`, displays a table of “half sum — combination count,” and finds the longest gap between consecutive lucky tickets. For verification, count lucky tickets in two ways: exhaustive enumeration and using the counts of combinations for half sums. Report invalid options to standard error with exit code 2; `--help` displays help.

### Variant 16. Roman numerals {#v16}

**1. Initial level.** Create a console program that converts 2026 (specified in the program) to Roman numerals (MMXXVI), using a loop and a `switch` expression or a sequence of checks for 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1.

**2. Basic level.** Create a console program that repeatedly asks for values until a blank line: if the input is an integer from 1 to 3999, display its Roman representation; if it is a string of Roman numerals, convert it to an Arabic number. Reject invalid Roman representations (for example `IIII`, `VX`): a representation is valid if converting back produces the same string.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that evaluates expressions with Roman numerals passed as arguments (for example `XLII + VIII`, `MCM - XC`, `XII * III`, `C / VII`). Validate the operands, perform the operation, display the result in Roman and Arabic numerals (quotient and remainder for division), and report to standard error if the result is outside 1–3999. The `--table from-to` option displays a conversion table. Exit codes: 0, 1 (some expressions invalid), 2 (invalid arguments); `--help` displays help.

### Variant 17. Number systems {#v17}

**1. Initial level.** Create a console program that converts 2026 (specified in the program) to binary, octal, and hexadecimal by obtaining digits from division remainders in a loop (without `Convert`), and displays the results.

**2. Basic level.** Create a console program that asks the user for a number string and the source and target bases (from 2 to 16), verifies that all digits are valid for the source base, and converts through a decimal `long` value without using `Convert`. Display the result and intermediate decimal value.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that converts numbers between bases from 2 to 36 (`--from`, `--to`), supports negative numbers and fractional parts (`--precision` specifies the number of fractional digits in the result), and displays a table of “input — decimal value — result.” Detect `long` overflow with `checked` and report it to standard error; `--verify` performs a reverse conversion and compares the result. Exit codes: 0, 1 (errors occurred), 2 (invalid options); `--help` displays help.

### Variant 18. Next date {#v18}

**1. Initial level.** Create a console program that determines the date after 28.02.2028 (day, month, and year specified in the program) without using `DateTime`: compute the number of days in the month using a `switch` expression that accounts for leap years.

**2. Basic level.** Create a console program that asks the user for a date in `dd.MM.yyyy` format and a number of days *n* (from −1000 to 1000), validates the date, and uses a loop without `DateTime` to compute the date *n* days later (or *n* days earlier). Display the result and the number of month and year boundaries crossed.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that, without using `DateTime`, computes the days between two dates (`--from`, `--to`), the weekday of each (using the days since the known date 01.01.2001, Monday), and the number of working days between them. With `--verify`, check the results against `DateTime`. Report invalid dates to standard error; exit codes: 0 — success, 1 — discrepancy with `DateTime`, 2 — invalid arguments.

### Variant 19. Runner’s training plan {#v19}

**1. Initial level.** Create a console program that, for a runner starting at 5 km per week and increasing the distance by 10% weekly (values specified in the program), displays each week’s distance until it reaches 42 km, the number of weeks, and the total distance.

**2. Basic level.** Create a console program that asks the user for the initial weekly distance, percentage increase (1–20), and goal, and reduces the workload by 30% every fourth week (a recovery week). Validate the input and display a table of weeks with distances and recovery markers, plus the week number when the goal is reached.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that builds a race training plan with options `--start`, `--goal`, `--increase`, `--race-date dd.MM.yyyy`, and `--runs-per-week` (3–6). Distribute the weekly distance across runs (long run — 30%, the rest equally), cap the long run at `--long-max`, plan a reduction in workload two weeks before the race, and report to standard error if the goal cannot be reached by race day. Display a table of weeks; `--help` displays help; exit codes: 0, 1 (goal not reached), 2.

### Variant 20. Tennis score {#v20}

**1. Initial level.** Create a console program that, for the sequence of point winners in a game `AABBBAAA` (specified in the program), determines the current score after each point in tennis notation (0, 15, 30, 40, “deuce,” “advantage”) and the game winner.

**2. Basic level.** Create a console program that asks the user for a string of `A` and `B` letters (point winners), validates the input, and displays the score after each point, the numbers of games won, and the set score in games. The first player to win 6 games with a lead of at least 2 games wins the set.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that processes a match record (an `A`/`B` sequence from an argument or a file supplied through standard input) with `--sets 3|5`. Track points, games, sets, and a tiebreak at 6:6 (to 7 points with a 2-point lead), and display the score after every set, the match winner, and statistics: points won, games won without losing a point, and break points. Report extra points after the match has ended to standard error; exit codes: 0, 1 (invalid match record), 2 (invalid options).

### Variant 21. Elevator {#v21}

**1. Initial level.** Create a console program that, for an elevator starting on floor 1 and serving calls to floors 7, 3, 9, 2 (specified sequentially in the program), displays each movement and the total number of floors traveled.

**2. Basic level.** Create a console program that models an elevator in a 16-story building: repeatedly ask for a floor number until `0`, validate the range, display the direction and number of floors for each call, and at the end display the total floors traveled, number of upward and downward trips, and longest trip.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that models an elevator with a queue of calls passed as arguments in `time@floor` format (time in seconds) and options `--floors`, `--speed` (seconds per floor), and `--stop` (seconds per stop). The elevator travels in its current direction, stopping for all calls along the way, and changes direction only when there are no calls ahead. Display an event log of “time — floor — event,” and the average and maximum waiting time. Report invalid calls to standard error; `--help` displays help.

### Variant 22. Traffic light {#v22}

**1. Initial level.** Create a console program that, for a traffic light cycling through “green 30 s, yellow 3 s, red 25 s, red and yellow 2 s” (values specified in the program), determines the signal 1,000 seconds after startup using `%` and a `switch` expression.

**2. Basic level.** Create a console program that asks the user for the traffic light phase durations and time in seconds since startup, validates the input, and displays the current signal, how many seconds it will remain active, and a schedule of the next five signal changes in `mm:ss` format.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that models an intersection with two traffic lights (main and secondary roads), with phases specified by options, and checks safety: green signals must not overlap. The option `--from hh:mm:ss --to hh:mm:ss` displays the schedule of both lights over a time interval; `--night 23:00-06:00` enables night mode (flashing yellow). Report an unsafe configuration to standard error with exit code 1; invalid options use code 2.

### Variant 23. Drone battery charge {#v23}

**1. Initial level.** Create a console program that, for a drone with a 100% battery consuming 2.5% charge per minute of flight and 0.8% per minute of hovering, models the plan “fly 6 min, hover 10 min, fly 12 min” (specified in the program), and displays the charge after each stage.

**2. Basic level.** Create a console program that repeatedly asks for flight stages in `type minutes` format (`fly`, `hover`, `climb`; charge consumption is determined by a `switch` expression) until a blank line. After each stage, display the remaining charge; if it falls below 25%, stop accepting stages and display a return warning.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives a route as a sequence of points `x,y,altitude` (m) and options `--speed`, `--battery` (Wh), `--power-fly`, `--power-hover`, `--power-climb` (W), and `--reserve` (%). Compute time and energy consumption for every segment, check whether the drone can return from each point to the start with the reserve intact, and display a table of “segment — distance — time — consumption — remaining charge,” marking the point after which flight must stop. Report errors to standard error with exit code 2; `--help` displays help.

### Variant 24. GCD and LCM {#v24}

**1. Initial level.** Create a console program that finds the greatest common divisor of 1071 and 462 (specified in the program) using Euclid’s algorithm with remainders, displays every step, and also displays the least common multiple.

**2. Basic level.** Create a console program that asks the user for a fraction in `a/b` format (integers, *b* ≠ 0), validates the input, reduces the fraction using the GCD, normalizes its sign, and displays the result, integer part, and proper fraction (for example `-50/15` → `-10/3` = `-3 1/3`).

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that computes the GCD and LCM of any number of `long` values passed as arguments, with `--method euclid|binary` (the binary GCD algorithm using shifts and bitwise operations) and `--pairs`, which displays a table of coprime pairs among the arguments. Compute the LCM in a `checked` context and report overflow to standard error. Compare the iteration counts of both algorithms. Exit codes: 0, 1 (overflow), 2 (invalid arguments).

### Variant 25. Character patterns {#v25}

**1. Initial level.** Create a console program that uses nested loops to display an isosceles triangle of `*` characters 7 rows tall (height specified in the program).

**2. Basic level.** Create a console program that asks the user for a pattern type (`diamond`, `tree`, `chessboard`; select using a `switch` expression), size (from 2 to 20), and fill character, validates the input, and displays the pattern using nested loops.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that displays `diamond`, `tree`, `chess`, `spiral`, and `frame` patterns with `--size`, `--char`, `--hollow` (outline only), and `--border`. For the spiral, compute the character in each cell from its coordinates without arrays. The `--list` option displays all patterns in sequence with headings. Report invalid option combinations (for example an even diamond size) to standard error with exit code 2; `--help` displays help.

### Variant 26. Bacterial population {#v26}

**1. Initial level.** Create a console program that, for a colony of 1,000 bacteria growing by 35% every 20 minutes (values specified in the program), displays the population hourly for 8 hours and the time when it first exceeds 100,000.

**2. Basic level.** Create a console program that asks the user for the initial population, carrying capacity *K*, and growth coefficient *r*, and models logistic growth *N* = *N* + *r* · *N* · (1 − *N*/*K*) step by step until the population change is less than 1. Display a table of steps and the number of steps needed to reach 90% of capacity.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that models two predator–prey populations using the discrete Lotka–Volterra model with parameters supplied as options and time step `--dt`. Display a state table at a specified interval, find the maximum of each population and the oscillation period, and stop the simulation if either population dies out or values become invalid (`NaN`, infinity), reporting the reason. Report invalid options to standard error with exit code 2; `--help` displays help.

### Variant 27. Palindromic numbers {#v27}

**1. Initial level.** Create a console program that finds all four-digit palindromic numbers divisible by 11 by reversing numbers arithmetically (using `%` and `/`), and displays their count.

**2. Basic level.** Create a console program that asks the user for a positive integer, validates the input, and performs the “reverse and add” procedure (add the number’s reversal to itself) until a palindrome is reached or 100 steps have been performed, displaying each step. Compute using `long` with `checked` overflow checking.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that, for the range `--from`/`--to`, finds numbers palindromic in both decimal and binary (`--base 2`), Lychrel candidates (reverse and add does not produce a palindrome within `--steps` steps), and the largest palindrome that is a product of two numbers in the range. Display results in separate tables; report `long` overflow to standard error. Exit codes: 0 or 2 (invalid options).

### Variant 28. System of two linear equations {#v28}

**1. Initial level.** Create a console program that solves the system 2 · *x* + 3 · *y* = 13, 5 · *x* − *y* = 7 (coefficients specified in the program) using Cramer’s rule, and displays the determinants and solution.

**2. Basic level.** Create a console program that asks the user for the coefficients of two linear equations, validates the input, and handles all cases: a unique solution, no solution, infinitely many solutions (compare determinants using a tolerance of 10<sup>−9</sup>). Repeat until the user answers “no” to the continuation prompt.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that solves a system of three linear equations whose coefficients are passed as arguments (12 numbers) or entered line by line, using Gaussian elimination with pivoting in loops without arrays (variables `a11`…`a34`) or Cramer’s rule (`--method gauss|cramer`). Detect singular systems, display the solution and residual of each equation, and compare both methods with `--compare`. Report errors to standard error with exit code 2; `--help` displays help.

### Variant 29. Dice rolls {#v29}

**1. Initial level.** Create a console program that simulates 600 rolls of a die using `Random.Shared.Next(1, 7)`, counts occurrences of each face in a loop (six counters, select using a `switch` expression), and displays percentage frequencies.

**2. Basic level.** Create a console program that asks the user for the number of rolls of two dice (from 1 to 1,000,000), simulates the rolls, counts sums of 7, doubles, and the longest streak without a sum of 7, and displays the experimental and theoretical probability of a sum of 7 (1/6).

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that simulates a “first to 100 points” game: a player rolls until deciding to stop (strategy `--hold N` — stop after scoring N points during the turn) or rolling 1 (the turn’s points are lost). Options `--games`, `--seed`, and `--strategies 15,20,25` specify the number of games and strategies to compare. Display a table of “strategy — wins — average turns — longest game.” Report invalid options to standard error with exit code 2; `--help` displays help.

### Variant 30. Gas station {#v30}

**1. Initial level.** Create a console program that displays a fuel menu (A-92 — 55.49 UAH/L, A-95 — 58.99 UAH/L, diesel — 54.79 UAH/L), asks for the fuel number and liters, determines the price using a `switch` expression, and displays the amount due.

**2. Basic level.** Create a console fuel-pump program that serves customers in a loop: ask for the fuel type, fueling mode (`liters` or `amount`), and value, validate the input, apply a 2 UAH/L discount for loyalty card holders, and display a receipt. After the shift ends (`end` is entered), display total sales by fuel type.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that models a gas station with storage tanks (`--tanks A92:5000,A95:8000,DP:10000`) and a fueling log passed as arguments (`A95:40l`, `DP:1500uah`, `A92:full`, where `full` means filling a tank of capacity `--tank-size`). Check the remaining fuel, partially fulfill an order if fuel is insufficient, and display a table of operations, revenue, and remaining stock, warning when a storage tank is below 10% full. Report invalid records to standard error; exit codes: 0, 1, 2.

## Procedure

1. Study the theory and worked examples.
2. Plan the solution for your variant: which branches and loops are needed, which variables change in each loop, and which condition ends it.
3. Create a solution and project for your task variant.
4. Implement the program for the chosen difficulty level; use a `switch` expression with patterns to select by value and a loop to repeat input prompts.
5. Test the program with valid, invalid, and boundary inputs (first and last iterations, empty input); step through at least one loop in the debugger.
6. Demonstrate the program to your instructor, explain the code, and answer the review questions.
