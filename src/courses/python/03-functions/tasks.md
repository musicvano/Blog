---
title: "Tasks"
description: "Topic 3. Functions: task variants"
outline: [2, 3]
sourceHash: "ce310f573939e240ac4918ad3af6b9c3452be4cbe60fe074bf3aa12a4604d803"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

Each problem defines its own inputs and outputs and can be completed separately. Python 3.14, the standard library, and a console interface are sufficient. Annotate the parameters and results of your own functions, and add docstrings with limits and units. You may use lists, tuples, and dictionaries at the basic level shown in the lecture. Custom classes and decorators are unnecessary. You may use `functools.cache` as a ready-made tool. For integers, check text before conversion; for real numbers, define a contract of numeric notation with a decimal point, and check finiteness and the domain. The advanced level requires menus, several functions, batch execution, and result comparisons. Adapt the `argparse` interface from Assignment 1: named options specify scalar data, and repeated `--item` options accept records or commands with colon-separated fields. For example, `--item "tea:40" --item "bread:60"` describes two order items. Include your record format, units, and examples in `--help`. If there are no arguments, use console prompts. Collect all values, validate them, and only then call the calculation function: the same contract applies to both interfaces. For numeric scalars, `argparse` supports `type=int` or `type=float`; split a compound record with `split(":")` and check the field count and format before conversion. `parser.error("message")` prints diagnostics to stderr and exits with code 2. A successful run and `--help` must exit with code 0. Files are not yet required. Reference: <https://docs.python.org/3.14/library/argparse.html>. All prices, rates, physical coefficients, and models in these problems are for learning purposes.

## Variants

### Variant 1. Cooking recipes {#v1}

**1. Initial level.** Create a console program that reads the flour mass for 4 servings and a desired serving count in 1..20; uses a scale function to return the required mass. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads the masses of three ingredients and a serving count; uses a function with `**kwargs` and keyword-only factor to calculate scaled masses and print a table. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that offers a menu to choose one of three recipes, specify servings and an extra allowance of 0..20 percent; separates scaling from formatting, and prints masses, their sum, and a comparison with the original recipe. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 2. Musical notes {#v2}

**1. Initial level.** Create a console program that reads a MIDI number in 0..127; uses an annotated function to calculate 440 \* 2 \*\* ((n - 69) / 12) and print the frequency. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads up to 12 MIDI numbers and a transposition from -12 to 12; a function with `*args` returns frequencies, rejecting notes outside 0..127; prints a table. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that reads a starting MIDI note and an octave count in 1..3; recursively builds a chromatic sequence of semitones, checks the upper bound of 127, and prints a frequency table and recursive call count. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 3. Molar mass {#v3}

**1. Initial level.** Create a console program that reads atom counts for H and O from 0 to 20; uses a function to calculate an example mass with H=1, O=16 and print the result. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads atom counts for H, C, O, N from 0 to 20; a function with `**kwargs` uses masses 1, 12, 16, 14 and keyword-only precision 0..3; prints contributions and the sum. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that accepts up to 10 compositions with H,C,O,N counts through a menu, checks for a nonzero composition, and uses separate functions to calculate mass and mass fractions; prints a table for each composition and checks the sum of fractions. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 4. Movie screenings {#v4}

**1. Initial level.** Create a console program that reads a ticket price and quantity in 1..10; uses a function with a default discount of 0 to return the cost. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads a price, quantity in 1..10, and an example discount of 0..50 percent; keyword-only discount controls the calculation; prints the full amount, discount, and payment. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that creates closure counters for tickets sold in two theaters; a menu accepts the theater and quantity and rejects exceeding capacity 30; prints sales, remaining seats, and revenue at a price of 100. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 5. Weight on planets {#v5}

**1. Initial level.** Create a console program that reads a mass in 1..500 kg; uses a function to calculate gravitational force on Earth with g=9.81 and print newtons. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads a mass and selects Earth, the Moon, or Mars with g=9.81, 1.62, 3.71; a function with a default g parameter returns force; prints a table. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that reads mass and jump speed in 0..10 m/s; passes functions calculating force m\*g and height v\*v/(2g) to a report function; prints results for the three celestial bodies and height ratios relative to Earth. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 6. Sierpinski triangle {#v6}

**1. Initial level.** Create a console program that reads a depth in 0..4; uses a recursive function to calculate and print the number of small triangles 3 \*\* n. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads a depth in 0..4; recursively builds a character triangle: the base is one \* character, and each next level places the previous triangle above two copies of it; prints the rows. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that accepts a depth in 0..5 and a character through a menu; separate functions build and print the Sierpinski triangle and count nonblank characters and calls; prints the drawing and checks the character count against 3 \*\* n. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 7. Combinatorics {#v7}

**1. Initial level.** Create a console program that reads n from 0 to 15; calculates factorial with an annotated recursive function and prints it. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads 0 &lt;= k &lt;= n &lt;= 20; uses functions to calculate arrangements n!/(n-k)! and combinations n!/(k!(n-k)!); prints integer results. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that reads n from 0 to 20; uses recursion with cache to calculate a Pascal triangle row through C(n,k)=C(n-1,k-1)+C(n-1,k); compares with the factorial formula, and prints the row and its sum 2 \*\* n. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 8. Towers of Hanoi {#v8}

**1. Initial level.** Create a console program that reads n from 0 to 10; uses a recursive function to count moves T(0)=0, T(n)=2T(n-1)+1 and prints the count. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads n from 1 to 8 and names for three distinct rods; uses a recursive function to print disk transfers and the total move count. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that reads n from 1 to 8; functions generate moves and independently check them on three disk lists, prohibiting a larger disk above a smaller one; prints moves, count, depth, and whether the final state is correct. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 9. Binary search {#v9}

**1. Initial level.** Create a console program that reads a target in the fixed list [2,5,8,11,14]; a recursive function returns an index or None; prints the result. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads up to 20 integers in nondecreasing order and a target; checks the order, performs recursive search, and returns an index and comparison count. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that accepts a sorted list of up to 50 integers and several targets through a menu; separate functions implement recursive and iterative searches for the first occurrence; prints indices, step counts, and a comparison of results. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 10. Wages {#v10}

**1. Initial level.** Create a console program that reads hours in 0..200 and an hourly rate; uses a function to return their product and prints gross pay. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads hours in 0..200, a rate, and an example deduction of 0..40 percent; a function with keyword-only tax returns gross and net pay as a pair; prints a report. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that accepts up to 10 employees with hours and rates through a menu; functions calculate gross pay, an example 10 percent bonus after 160 hours, and a 20 percent deduction; prints an aligned table and totals. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 11. Point transformations {#v11}

**1. Initial level.** Create a console program that reads point coordinates and a scale factor; a function returns the new coordinate pair. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads a point, translations dx, dy, and a scale; separate typed functions return coordinates after scaling and translation; prints both transformation orders. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that reads up to 10 points and an angle in degrees; an apply function accepts a rotation or scaling function and applies it to the points; prints original and new coordinates and checks that rotation preserves distance from the origin. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 12. Bisection method {#v12}

**1. Initial level.** Create a console program that reads a number a from 1 to 100; uses a bisection function on [0,a] to find the root of x\*x-a to precision 0.001 and prints it. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads endpoints and a precision from 0.000001 to 0.01; a function accepts the function x\*x-2, checks the sign change, and returns a root and step count. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that offers a menu choosing x\*x-2 or x\*x\*x-x-2 and accepts endpoints and precision; a general bisection function receives a function argument and limits steps to 100; prints the root, residual, and convergence report. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 13. Elo rating {#v13}

**1. Initial level.** Create a console program that reads two ratings in 0..3000 and a result of 0, 0.5, or 1; uses a function to calculate Rnew=R+32(S-1/(1+10\*\*((Ropp-R)/400))). Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads ratings, a result, and factor K from 1 to 64; a function with default K of 32 returns both players' new ratings; prints expected scores and changes. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that accepts two initial player ratings and up to 20 results through a menu; separate functions calculate expected scores, updates, and the report, using the old ratings for both changes; prints the history and checks that the rating sum remains constant. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 14. Photographic exposure {#v14}

**1. Initial level.** Create a console program that reads aperture N from 1 to 32 and exposure time t from 0.0001 to 30; a function calculates EV=log2(N\*N/t). Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads up to 10 N, t pairs; a function with `*args` and keyword-only precision 0..3 calculates EV; checks positivity and prints a table. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that reads initial N, t and up to 10 new apertures; functions calculate equivalent exposure times t2=t\*(N2/N)\*\*2 and EV; prints a table, rejects times outside 0.0001..30, and checks that EV remains constant. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 15. Digital root {#v15}

**1. Initial level.** Create a console program that reads an integer from 0 to 10 \*\* 12; recursively calculates the digit sum and prints the result. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads an integer from 0 to 10 \*\* 12; repeats recursive digit summation until one digit remains, returning the root and pass count. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that accepts endpoints in 1..10000 with width at most 1000 through a menu; functions find the digital root and test divisibility by the digit sum, and the program prints Harshad numbers with their roots and a count. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 16. Modular exponentiation {#v16}

**1. Initial level.** Create a console program that reads a base in 0..1000, exponent in 0..100, and modulus in 2..1000; recursively calculates and prints the modular power. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads a base, exponent in 0..10000, and modulus in 2..10000; fast recursion returns the result and call count; compares with pow(a,n,m). Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that accepts odd n from 3 to 10000 and bases in 2..n-1 through a menu; functions check gcd and the equality a\*\*(n-1) mod n=1, and the program prints a witness table; explains that passing Fermat tests does not prove primality. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 17. Luhn algorithm {#v17}

**1. Initial level.** Create a console program that reads a string of 2..19 digits; uses a function to check the Luhn checksum by doubling every second digit from the right, excluding the check digit, and subtracting 9 from values above 9; prints True or False. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads a base of 1..18 digits; a function tries check digits 0..9 and returns the completed number, while another function checks it; prints both results. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that checks or completes synthetic numeric identifiers through a menu; Luhn, formatting, and input-validation functions are independent; prints a masked number, sum, and result, does not identify a real payment system, and does not accept personal data. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 18. Population forecast {#v18}

**1. Initial level.** Create a console program that reads N0 from 1 to 1000000, annual fraction r from -0.1 to 0.1, and year count 0..20; uses a function to calculate N0\*(1+r)\*\*t. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads N0, capacity K&gt;=N0, r from 0 to 0.1, and years 0..20; functions calculate the exponential and discrete logistic model Nnext=N+r\*N\*(1-N/K); prints a table. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that selects a model through a menu, accepting N0, K, r and a horizon up to 50 years; passes an annual-step function to the forecast function and prints yearly values, absolute increases, and a summary; all data belongs to a learning model. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 19. Fibonacci numbers {#v19}

**1. Initial level.** Create a console program that reads n from 0 to 20; a recursive function with bases 0, 1 returns F(n), and the program prints it. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads n from 0 to 30; separate functions using cache and a loop calculate F(n), and the program prints the values and whether they match. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that accepts n from 0 to 25 through a menu; compares plain recursion, cache, and a loop, counting calls with a closure; clears the cache before each experiment and prints results and counters. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 20. Acoustics {#v20}

**1. Initial level.** Create a console program that reads a level L from 0 to 100 dB; a function converts it to relative intensity 10 \*\* (L/10). Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads up to 10 levels in 0..100 dB; a function with `*args` returns 10\*log10(sum(10\*\*(L/10))); prints the combined level. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that adds and removes up to 10 example sources through a menu; functions convert levels and calculate the sum; prints contributions, the overall level, and the change after removal, handling no sources separately. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 21. Delivery cost {#v21}

**1. Initial level.** Create a console program that reads a mass from 0.1 to 30 kg; a function with default rate 12 returns 30+12mass. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads mass, zone 1..3, and urgency; a function has keyword-only zone and urgent, the rate is (30+12mass)\*zone, and urgency adds 50 percent; prints the components. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that accepts up to 10 shipments with mass, zone, urgency, and declared value through a menu; functions add insurance of 1 percent of the value, and the program prints an aligned register, total mass, and total payments. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 22. Caesar cipher {#v22}

**1. Initial level.** Create a console program that reads Latin-alphabet text and a shift in 0..25; an annotated function encrypts letters preserving case and leaves other characters unchanged. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads Latin-alphabet text and an arbitrary integer shift; encryption and decryption functions normalize it modulo 26, and the program prints the result and restored text. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that offers encryption, restoration, or all 26 shifts through a menu; separate functions process a character, text, and a report; prints all candidate shifts and checks the round trip. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 23. Color models {#v23}

**1. Initial level.** Create a console program that reads three integer RGB channels in 0..255; a function returns a six-digit HEX string. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads RGB or six-digit HEX; separate functions perform both conversions, validate the format, and print the result and reverse check. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that accepts RGB through a menu and converts it to HSV using custom functions: V=max/255, S=0 for max=0, otherwise (max-min)/max; determines H from the largest channel; prints HSV and tests black, white, and primary colors. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 24. Permutations {#v24}

**1. Initial level.** Create a console program that reads up to 5 distinct Latin letters; a recursive function prints all permutations. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads up to 7 distinct Latin letters and k from 0 to the length; recursion builds arrangements of length k, returns a list, and prints the count. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that accepts up to 7 Latin letters with possible repetitions through a menu; a function recursively builds only unique permutations, prints them and their count, and compares with n! divided by factorials of the frequencies. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 25. Home energy consumption {#v25}

**1. Initial level.** Create a console program that reads power in 0..5000 W and time in 0..24 h; uses a function to calculate kWh and prints the result. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads up to 10 power/time pairs; a function with `*args` and a keyword-only rate defaulting to 4 returns energy and an example cost. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that manages up to 10 appliances with daytime and nighttime durations through a menu, with total duration up to 24; functions apply example rates of 4 and 2, and the program prints an energy/payment table and totals. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 26. Dice {#v26}

**1. Initial level.** Create a console program that reads a dice count in 1..5; a recursive function counts all outcomes of six-sided dice and prints the count. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads a dice count in 1..5 and a target sum; a recursive function counts ways to obtain the sum and prints the count and exact probability ways/6\*\*n. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that reads a dice count in 1..5; recursively counts the distribution of sums and independently checks it using nested enumeration or iterative accumulation; prints a table and checks the total count against 6\*\*n. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 27. Hiking route {#v27}

**1. Initial level.** Create a console program that reads distance in 0..50 km and ascent in 0..3000 m; a function calculates the example time d/5+h/600 in hours. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads up to 10 sections with distance and ascent; a function with keyword-only speeds defaulting to 5 and 600 returns the time; prints a table and total. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that accepts route sections and a break of 0..60 minutes after each through a menu; functions total movement and rest, and the program prints accumulated time and warns when the example limit of 8 hours is exceeded. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 28. Series sums {#v28}

**1. Initial level.** Create a console program that reads n from 1 to 1000; a function sums 1/k\*\*2 for k from 1 to n and prints the sum. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads n from 1 to 1000 and selects the term 1/k or 1/k\*\*2; a general function accepts the series-term function and returns the sum. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that selects through a menu the geometric series q\*\*k with abs(q)&lt;1 or the series 1/k\*\*2 and specifies n up to 10000; functions calculate sums of n and 2n terms and print the difference; for the geometric series, compares with (1-q\*\*n)/(1-q). Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 29. Palindromes in numeral systems {#v29}

**1. Initial level.** Create a console program that reads an integer in 0..100000 and base in 2..16; a recursive function returns its representation with digits 0..9, A..F and prints it. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads a number and base in 2..16; separate recursive functions build its representation and check for a palindrome, and the program prints both results. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that accepts a range in 0..10000 of width up to 1000 and two bases in 2..16 through a menu; functions find numbers that are palindromes in both systems, and the program prints a representation table and count. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

### Variant 30. Compound interest {#v30}

**1. Initial level.** Create a console program that reads an amount in 0..1000000, an example annual rate of 0..20 percent, and years in 0..20; a recursive function returns capital with annual compounding. Annotate the parameters and results of your own functions and document valid data.

**2. Basic level.** Create a console program that reads an amount, rate, and years; recursive and iterative functions calculate annual compounding, and the program prints a table and checks agreement with a tolerance of 0.01. Annotate the parameters and results of your own functions and document valid data.

**3. Advanced level.** Create a console program that creates two independent accumulator closures through a menu, accepts deposits and an annual-interest command at an example rate of 5 percent; prints each account's history, contributions, and growth. Annotate the parameters and results of your own functions and document valid data. Add batch execution: pass scalar data as named arguments, and data rows or menu commands using repeated `--item` options with colon-separated fields. Describe parameter names, field order, and an example compound value in `--help`. Without arguments, prompt for keyboard input. Print format and domain errors to `stderr` with exit code 2; success and help use code 0. Format the final report as an aligned table and include at least five reference runs with boundary and invalid data.

## Procedure

1. Record the variant, level, input format, and limits. Identify functions for calculation, validation, and presenting results.
2. For each custom function, define parameters, result type, preconditions, and possible side effects. Add annotations and a docstring.
3. Implement the program in a separate directory of a local Git repository. Avoid shared mutable default arguments.
4. Check ordinary, boundary, and invalid cases, and an empty result if possible. For recursion, add the base case and one step; for a closure, create two independent instances.
5. Compare one result with a manual calculation. State a tolerance for real numbers; for two implementations, compare results on the same input data.
6. Run the program in PyCharm and the terminal, and save the code, a README with instructions, and an “input – expected – actual result” table. Do not add `.venv` or `__pycache__`; GitHub is optional.
7. During the defense, explain the function signature, the LEGB rule, and recursion termination. Show what changes when you reassign a parameter or modify a passed list.
