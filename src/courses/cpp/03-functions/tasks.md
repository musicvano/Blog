---
title: Tasks
description: "Topic 3. Functions: task variants"
outline: [2, 3]
sourceHash: "d7c5a9b133cc80f4894fb7bb499772d0b946697221743d388bb589ed3cc75aa9"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Triangle geometry {#v1}

**1. Initial level.** Create a console program: read the sides a, b, c from the keyboard; check the triangle inequalities. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read the sides a, b, c from the keyboard; return a structure with the perimeter and Heron’s area. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read the sides a, b, c from the keyboard; also accept the sides as arguments and print the triangle type by its sides; reject degenerate triangles. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 2. Date and day of the week {#v2}

**1. Initial level.** Create a console program: read a date from the keyboard: year 1–9999, month, day; determine whether the year is a leap year with a function. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read a date from the keyboard: year 1–9999, month, day; validate the date and find the day of the week with Zeller’s algorithm. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read two dates from the keyboard (for each, year 1–9999, month and day). Validate both Gregorian calendar dates and print the signed difference of the second and the first in days; equal dates give zero. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 3. Fast exponentiation {#v3}

**1. Initial level.** Create a console program: read a double base and an exponent 0–30 from the keyboard; compute the power with a loop. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read a double base and an exponent 0–30 from the keyboard; implement recursive exponentiation by halving the exponent. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read a double base and an exponent 0–30 from the keyboard; implement iterative and recursive (by halving the exponent) exponentiation and compare the number of multiplications of both algorithms for exponents 0–30. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 4. Number systems {#v4}

**1. Initial level.** Create a console program: read a non-negative number up to 1000000 and a base 2–16 from the keyboard; print the number recursively. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read a non-negative number up to 1000000 and a base 2–16 from the keyboard; return the number of digits and check zero. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read a non-negative number up to 1000000 and a base 2–16 from the keyboard; build a table of the number in all bases 2–16, accept --help. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 5. Bisection {#v5}

**1. Initial level.** Create a console program: read bounds 0–3 and a tolerance 1e-10..1e-3 from the keyboard; check the sign of x\*x-2 at the endpoints. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read bounds `a`, `b` in 0–3, where `a < b`, and a tolerance `eps` in `1e-10..1e-3`. For `f(x) = x*x - 2` check for a root at the endpoints or for different signs, find the root by bisection until the interval half-width is at most `eps`, with at most 100 steps. Print the approximation, the number of steps and the reason for stopping. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read bounds `a`, `b` in 0–3, where `a < b`, and three tolerances in `1e-10..1e-3`. For `f(x) = x*x - 2` check for a root at the endpoints or for different signs. For each tolerance run bisection until the interval half-width is at most the tolerance, with at most 100 steps; return a structure with the root, the number of steps and the absolute residual, and print a comparison table. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 6. Newton’s method {#v6}

**1. Initial level.** Create a console program: read a positive number `1e-6..1e6` from the keyboard; approximate the square root with a function. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read a positive number `1e-6..1e6` from the keyboard; overload the function for the square and the cube root with an order parameter. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read a positive number `1e-6..1e6` from the keyboard; approximate the square root with Newton’s method, print the convergence steps, and reject a zero derivative or exceeding the limit of 100 iterations. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 7. Compound interest {#v7}

**1. Initial level.** Create a console program: read an amount, a rate 0–100 and years 0–50 from the keyboard; return the amount after the entered number of years by the formula `sum * pow(1 + rate / 100, years)`. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read an amount, a rate 0–100 and years 0–50 from the keyboard; use a default parameter of 12 compounding periods. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read an amount, a rate 0–100 and years 0–50 from the keyboard; compare annual, quarterly and monthly compounding in a table. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 8. Ballistics {#v8}

**1. Initial level.** Create a console program: read a speed 1–1000 and an angle 1–89 degrees from the keyboard; compute the range for g=9.81 without air resistance. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read a speed 1–1000 and an angle 1–89 degrees from the keyboard; return a range/height/time structure. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read a speed 1–1000 and an angle 1–89 degrees from the keyboard; find the best integer angle 1–89 and print a table with a default parameter g. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 9. Combinatorics {#v9}

**1. Initial level.** Create a console program: read n in 0–20 and k in 0..n from the keyboard; compute the factorial recursively. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read n in 0–20 and k in 0..n from the keyboard; return the number of arrangements and combinations with separate functions. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read n in 0–20 and k in 0..n from the keyboard; compare the recursive and iterative C(n, k) and check constant cases with `static_assert`. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 10. Ackermann {#v10}

**1. Initial level.** Create a console program: read m in 0–3 and n in 0–6 from the keyboard; compute A(m, n) by the standard recurrence. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read m in 0–3 and n in 0–6 from the keyboard; compute the Ackermann function A(m, n) recursively and return the number of calls through a reference. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read m in 0–3 and n in 0–6 from the keyboard; compute the Ackermann function A(m, n) recursively, track the maximum recursion depth, and stop the computation at a given call limit. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 11. Prime factors {#v11}

**1. Initial level.** Create a console program: read a number 2–1000000 from the keyboard; print its prime factors with a function. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read a number 2–1000000 from the keyboard; recursively print the factors with their powers. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read the bounds of a range of numbers 2–1000000 with a length of up to 1000 numbers from the keyboard; print the prime factorization of each number in the range and check the product. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 12. Digital root {#v12}

**1. Initial level.** Create a console program: read a number 0–1000000000 from the keyboard; find the sum of digits recursively. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read a number 0–1000000000 from the keyboard; repeat the digit sum down to a single digit and count the steps. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read a number 0–1000000000 from the keyboard; compute its multiplicative persistence – the number of steps of multiplying the digits until a single digit remains, handling zero digits. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 13. Temperatures {#v13}

**1. Initial level.** Create a console program: read a value and a scale C/F/K from the keyboard; convert C to F with a function. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read a value and a scale C/F/K from the keyboard; use enum class and overloading to return the required scale. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read a value and a scale C/F/K from the keyboard; build a table of the three scales for given bounds and step, with an absolute zero check. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 14. Dice {#v14}

**1. Initial level.** Create a console program: read a generator seed and target points 1–100 from the keyboard; return a die roll 1–6 with a function and print it. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console dice game program: read a generator seed and target points 1–100 from the keyboard; simulate two players who take turns rolling a die 1–6 and accumulate points up to the target, passing the generator by reference; print the winner. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console dice game program: read a generator seed and target points 1–100 from the keyboard; play 100 games of two players who take turns rolling a die 1–6 until the target is reached, and return a structure with wins, draws and the average number of turns. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 15. Time {#v15}

**1. Initial level.** Create a console program: read hours 0–1000, minutes 0–1000, seconds 0–1000 from the keyboard; normalize them through references. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read two durations with hours, minutes and seconds 0–1000 from the keyboard; add and subtract them with functions and print the normalized results. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read up to 100 pairs of durations with hours, minutes and seconds 0–1000 from the keyboard; print a table of the normalized sums and absolute differences of each pair. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 16. Palindromes {#v16}

**1. Initial level.** Create a console program: read a number 0–1000000000 from the keyboard; check whether it is a palindrome with a function. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read a number 0–1000000000 from the keyboard; recursively build its reverse with an overflow check. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read the bounds of a range 0–1000000000 with a width of up to 100000 numbers from the keyboard; find the numeric palindromes of the range and print them and their count. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 17. Pascal {#v17}

**1. Initial level.** Create a console program: read the number of rows 1–20 from the keyboard; print the rows of Pascal’s triangle, computing the elements with a function C(n, k). Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read the number of rows 1–20 from the keyboard; compute the coefficients of Pascal’s triangle recursively and iteratively and compare the results. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read the number of rows 1–20 from the keyboard; print a centered Pascal’s triangle with a recursive computation of C(n, k) and the number of recursive calls for each row. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 18. Patterns {#v18}

**1. Initial level.** Create a console program: read an odd width 1–39 from the keyboard; print a row of asterisks with a function. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read an odd width 1–39 from the keyboard; print a diamond recursively. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read an odd width 1–39 from the keyboard, and the pattern type (diamond or stairs) and the character from the command-line arguments, support --help; print the pattern. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 19. Teaching taxes {#v19}

**1. Initial level.** Create a console program: read an income 0–1000000 from the keyboard; compute a 10 % withholding with a function. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read an income 0–1000000 from the keyboard; return a structure: 10 % withholding, 2 % levy, net amount. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read a count and a series of incomes 0–1000000 from the keyboard; for each one compare two teaching schemes: 10 % withholding plus a 2 % levy, and 15 %. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 20. Loan {#v20}

**1. Initial level.** Create a console program: read an amount, a monthly rate 0–10 % and months 1–120 from the keyboard; compute the payment without interest. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read an amount, a monthly rate 0–10 % and months 1–120 from the keyboard; compute the annuity payment and the first differentiated payment with separate functions. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read an amount, a monthly rate 0–10 % and months 1–120 from the keyboard; print the schedules of annuity and differentiated payments and the difference in overpayment, handle a zero rate. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 21. Sum of a series {#v21}

**1. Initial level.** Create a console program: read x in 0..1 and N in 0..100 from the keyboard; compute the sum `1 + x + ... + x^N` with a loop (for N=0 the sum is 1). Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read x in 0..1 and N in 0..100 from the keyboard; compare the recursive and iterative sums `1 + x + ... + x^N` (for N=0 the sum is 1). Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read `x` in `[0, 1)`, a tolerance in `1e-12..1e-3` and the maximum number of terms in 1–100000. Add the terms of the geometric series `1, x, x*x, ...` until the absolute value of the next term is less than the tolerance or the limit is reached; print the sum, the number of added terms and the reason for stopping. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 22. Electric circuit {#v22}

**1. Initial level.** Create a console program: read two positive resistances from the keyboard; compute the series resistance. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read three positive resistances in ohms from the keyboard; overload the functions for two and three resistances and for a parallel connection. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read three positive resistances in ohms from the keyboard; compare all series-parallel circuits of three resistances and return min/max. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 23. Grading {#v23}

**1. Initial level.** Create a console program: read three scores 0–100 from the keyboard; return the average score. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read three scores 0–100 from the keyboard; return min/max through references and the average as the value. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read three scores 0–100 from the keyboard; convert the grades into letters by the thresholds 90/82/74/64/60 and build a report. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 24. PIN {#v24}

**1. Initial level.** Create a console program: read a four-digit code 0000–9999 from the keyboard; check with a function that it does not consist of four identical digits. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read a four-digit code 0000–9999 from the keyboard; reject four identical digits and the sequences 1234/4321, checking each condition with a separate predicate. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read a non-negative integer generator seed; generate 10 distinct teaching four-digit codes with leading zeros. Reject four identical digits, 1234 and 4321. Use a limit of 10000 attempts, print the generated codes and report whether the count of 10 was reached. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 25. Making change {#v25}

**1. Initial level.** Create a console program: read an amount 0–100 from the keyboard; recursively count the ways to make change with coins 1 and 5. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read an amount 0–100 from the keyboard; recursively count the ways to make change with coins 1, 5 and 10, without counting permutations of coins as different ways. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read an amount 0–100 from the keyboard; print all triples of counts of coins with denominations 1, 5 and 10 and compare their number with the recursive result. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 26. Grid paths {#v26}

**1. Initial level.** Create a console program: read M, N in 1–10 from the keyboard; recursively count the right/down paths. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read M, N in 1–10 and the coordinates of one forbidden cell (row 1–M and column 1–N). Recursively count and print the paths from (1,1) to (M,N) moving only right and down and avoiding this cell. If the start or the end is forbidden, the result is zero. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read M, N in 1–10 from the keyboard; count the grid paths from (1,1) to (M,N) moving only right and down with recursion and with the combinatorial formula, compare the results and print the number of calls. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 27. Units of mass {#v27}

**1. Initial level.** Create a console program: read a mass and a unit g/kg/t from the keyboard; convert it to kilograms with a function. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read a mass and a unit g/kg/t from the keyboard; overload the converter for integer and fractional values. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read a mass and a unit g/kg/t from the keyboard; accept the units and values from argv, fully validate the token and --help. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 28. Elo rating {#v28}

**1. Initial level.** Create a console program: read two ratings 0–4000 and a result 0/0.5/1 from the keyboard; compute the expected score. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read two ratings 0–4000 and a result 0/0.5/1 from the keyboard; update both ratings through references with K=32 by default. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read two ratings 0–4000 and a result 0/0.5/1 from the keyboard; process a series of results and compare K=16 and 32 without rounding intermediate values. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 29. Koch curve {#v29}

**1. Initial level.** Create a console program: read an initial length and an order 0–15 from the keyboard; recursively compute the number of segments of the Koch curve 4^n. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read an initial length and an order 0–15 from the keyboard; return a structure with the number of segments of the Koch curve, the segment length and the total length. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read an initial length and an order 0–15 from the keyboard; print a table of orders 0–15 and compare the recursion with the formula `L * pow(4.0 / 3.0, n)`. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

### Variant 30. Clock angles {#v30}

**1. Initial level.** Create a console program: read an hour 0–23 and a minute 0–59 from the keyboard; compute the smallest angle between the hands. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**2. Basic level.** Create a console program: read an hour 0–23 and a minute 0–59 from the keyboard; overload the function for a time with seconds. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

**3. Advanced level.** Create a console program: read an hour 0–23 and a minute 0–59 from the keyboard; iterate over a day with a step of 1 second and print the moments when the hands come within 0.01 degree of each other. Move the computations into functions, validate the input, and print the result and an explanation of the error for invalid data.

## Procedure

1. Define the input, the result and the preconditions of each function.
1. Separate the numeric computation from input and output.
1. Choose a value or a reference for each parameter.
1. For recursion, write down the base, the reduction of the argument and the limits.
1. Check ordinary, boundary and invalid arguments.
1. Inspect one nested call in the Call Stack.
1. Add a README with launch examples and create a commit.
