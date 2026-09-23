---
title: Tasks
description: "Topic 9. Operator Overloading: task variants"
outline: [2, 3]
sourceHash: "ec952bac9409c9736443088c59b7e0618f8ee07bb94f8ffa8167384cbe224172"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Rational numbers {#v1}

**1. Initial level.** Create a console program with the type “Rational Numbers”: implement a reduced numerator and denominator; + and &lt;&lt;. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Rational Numbers”: implement a reduced numerator and denominator; + and &lt;&lt;, as well as comparison and rejection of a zero denominator. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Rational Numbers”: implement a rational number type with a reduced numerator and denominator and the operators +, -, \*, / and &lt;&lt;, and solving a 2×2 system with fractions, rejecting a zero determinant. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 2. Complex numbers {#v2}

**1. Initial level.** Create a console program with the type “Complex Numbers”: implement real and imaginary parts; + and \*. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Complex Numbers”: implement real and imaginary parts; + and \*, as well as reading a pair with >> without a partial change. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Complex Numbers”: implement a complex number type with real and imaginary parts and the operators +, -, \*, / and &lt;&lt;, and the roots of a quadratic equation with a complex discriminant, plus a report. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 3. Duration {#v3}

**1. Initial level.** Create a console program with the type “Duration”: implement whole seconds; + and comparison. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Duration”: implement whole seconds; + and comparison, as well as subtraction and multiplication with an overflow check. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Duration”: implement a duration type in whole seconds with the operators +, - and comparison, and a shift schedule, the sum of durations and overlaps without calendar time zones. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 4. Date {#v4}

**1. Initial level.** Create a console program with the type “Date”: implement a valid date in 2000–2099; == and &lt;&lt;. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Date”: implement a valid date in 2000–2099; == and &lt;&lt;, as well as ++ and adding days with leap years. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Date”: implement a date type for 2000–2099 with the operators ==, &lt;=>, ++ and &lt;&lt;, an event calendar, the difference between dates and a sorted report. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 5. Angle {#v5}

**1. Initial level.** Create a console program with the type “Angle”: implement degrees normalized to 0–360; +. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Angle”: implement degrees normalized to 0–360; +, as well as the difference between headings in the range -180..180 and comparison. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Angle”: implement an angle type in degrees normalized to 0–360 with the operators + and -, a route of turns, the final heading and trigonometric projections. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 6. Temperature {#v6}

**1. Initial level.** Create a console program with the type “Temperature”: implement degrees Celsius and &lt;&lt;. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Temperature”: implement degrees Celsius and &lt;&lt;, as well as conversion to Fahrenheit and comparison of finite values. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Temperature”: implement a temperature type in degrees Celsius with comparison and &lt;&lt;, a table of temperatures in two scales, a separate temperature difference type and adding a difference. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 7. Length {#v7}

**1. Initial level.** Create a console program with the type “Length”: implement non-negative millimeters; + and &lt;=>. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Length”: implement non-negative millimeters; + and &lt;=>, as well as multiplication by a count and input in meters. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Length”: implement a length type in non-negative millimeters with the operators +, \* by a count and &lt;=>, and a bill of materials with inches converted at 25.4 mm and a rounding policy. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 8. RGB color {#v8}

**1. Initial level.** Create a console program with the type “RGB Color”: implement three components 0–255; == and &lt;&lt;. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “RGB Color”: implement three components 0–255; == and &lt;&lt;, as well as mixing by averaging and saturating addition. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “RGB Color”: implement an RGB color type with three components 0–255 and the operators == and &lt;&lt;, a palette, brightness and hex output without changing the state of someone else’s stream. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 9. Quaternion {#v9}

**1. Initial level.** Create a console program with the type “Quaternion”: implement four components; + and conjugation. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Quaternion”: implement four components; + and conjugation, as well as multiplication and the norm with a check against normalizing zero. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Quaternion”: implement a quaternion type with four components, the operators + and \*, conjugation and the norm, and rotating a point by a unit quaternion with numeric tests. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 10. Modular arithmetic {#v10}

**1. Initial level.** Create a console program with the type “Modular Arithmetic”: implement values modulo 17; + and \*. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Modular Arithmetic”: implement values modulo 17; + and \*, as well as subtraction, exponentiation and ==. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Modular Arithmetic”: implement a type of numbers modulo 17 with the operators +, -, \* and ==, a table of inverses of nonzero elements and a check of the products. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 11. Polynomial {#v11}

**1. Initial level.** Create a console program with the type “Polynomial”: implement coefficients; + and operator(). Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Polynomial”: implement coefficients; + and operator(), as well as multiplication and a checked [] for the coefficients. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Polynomial”: implement a polynomial type with coefficients, the operators + and \* and evaluation via operator(), evaluating several polynomials on a grid of points and a summary table. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 12. Big integer {#v12}

**1. Initial level.** Create a console program with the type “Big Integer”: implement decimal digits; + and &lt;&lt;. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Big Integer”: implement decimal digits; + and &lt;&lt;, as well as multiplication of non-negative numbers and comparison. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Big Integer”: implement a big non-negative integer type with decimal digits, the operators +, \*, comparison and &lt;&lt;, and factorials 0–100 checked against known reference values. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 13. Set of small numbers {#v13}

**1. Initial level.** Create a console program with the type “Set of Small Numbers”: implement elements 0–31 in a mask; | and &. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Set of Small Numbers”: implement elements 0–31 in a mask; | and &, as well as difference, symmetric difference and membership. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Set of Small Numbers”: implement a type for a set of numbers 0–31 in a bit mask with the operators |, &, - and membership, and evaluating expressions over named sets with a table of results. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 14. Interval {#v14}

**1. Initial level.** Create a console program with the type “Interval”: implement the ends of a half-open interval; ==. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Interval”: implement the ends of a half-open interval; ==, as well as intersection and point membership without a made-up contiguous union. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Interval”: implement a half-open interval type with == and intersection, and a meeting schedule with a conflict check and union of adjacent intervals only. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 15. Point on a map {#v15}

**1. Initial level.** Create a console program with the type “Point on a Map”: implement latitude and longitude with bounds; &lt;&lt;. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Point on a Map”: implement latitude and longitude with bounds; &lt;&lt;, as well as equality and the distance under an explicitly chosen spherical model. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Point on a Map”: implement a map point type with latitude and longitude within bounds, == and &lt;&lt;, and a route, the total distance under a spherical model and coordinate output in degrees-minutes-seconds. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 16. Matrix {#v16}

**1. Initial level.** Create a console program with the type “Matrix”: implement dimensions and double elements; a checked []. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Matrix”: implement dimensions and double elements; a checked [], as well as multiplication of compatible matrices and transposition. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Matrix”: implement a matrix type with dimensions, double elements, a checked [] and multiplication, and a chain of operations, == for exactly specified integer data and a report of the dimensions. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 17. Amount of money {#v17}

**1. Initial level.** Create a console program with the type “Amount of Money”: implement kopiykas and a currency code; + and &lt;&lt;. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Amount of Money”: implement kopiykas and a currency code; + and &lt;&lt;, as well as rejecting addition of different currencies and multiplication by a count. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Amount of Money”: implement a money amount type in kopiykas with a currency code and the operators + and &lt;&lt;, and a converter with entered rational exchange rates and rounding to a kopiyka. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 18. Playing card {#v18}

**1. Initial level.** Create a console program with the type “Playing Card”: implement rank 2–14 and suit 0–3; &lt;=>. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Playing Card”: implement rank 2–14 and suit 0–3; &lt;=>, as well as comparison by rank, then by suit, and &lt;&lt;. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Playing Card”: implement a playing card type with rank 2–14, suit 0–3, &lt;=> and &lt;&lt;, and comparing five-card hands by a clearly described order of combinations. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 19. Chess position {#v19}

**1. Initial level.** Create a console program with the type “Chess Position”: implement 64 square codes; [] and ==. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Chess Position”: implement 64 square codes; [] and ==, as well as const access and validation of the symbols. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Chess Position”: implement a chess position type with 64 square codes, a checked [] and ==, and a sequence of practice board changes and a search for repeated positions without the check rule. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 20. Product weight {#v20}

**1. Initial level.** Create a console program with the type “Product Weight”: implement non-negative grams; + and \*. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Product Weight”: implement non-negative grams; + and \*, as well as input in kilograms and overflow control. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Product Weight”: implement a product weight type in non-negative grams with the operators + and \*, and scaling recipes and a total shopping list. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 21. Dual numbers {#v21}

**1. Initial level.** Create a console program with the type “Dual Numbers”: implement real and derivative parts; + and \*. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Dual Numbers”: implement real and derivative parts; + and \*, as well as division when the real part is nonzero. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Dual Numbers”: implement a dual number type with real and derivative parts and the operators +, - and \*, and automatic differentiation of a polynomial at several points compared with the hand-derived formula. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 22. N-dimensional vector {#v22}

**1. Initial level.** Create a console program with the type “N-Dimensional Vector”: implement coordinates; + and []. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “N-Dimensional Vector”: implement coordinates; + and [], as well as the dot product of compatible sizes and the norm. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “N-Dimensional Vector”: implement an N-dimensional vector type with coordinates, the operators +, [] and the dot product, and a table of pairwise distances with operator&lt;&lt;; formatter only as an optional extra. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 23. Rectangle {#v23}

**1. Initial level.** Create a console program with the type “Rectangle”: implement coordinates and sides; ==. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Rectangle”: implement coordinates and sides; ==, as well as & as intersection and | as the bounding rectangle. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Rectangle”: implement a rectangle type with coordinates and sides, == and & as intersection, and a set of regions, pairwise intersections and the sum of areas, without confusing it with the area of the union. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 24. Match score {#v24}

**1. Initial level.** Create a console program with the type “Match Score”: implement the goals of two teams; +=. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Match Score”: implement the goals of two teams; +=, as well as comparing results by points and goal difference. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Match Score”: implement a match score type with the goals of two teams, += and comparison, and a league table with explicit rules of equality and order. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 25. IPv4 address {#v25}

**1. Initial level.** Create a console program with the type “IPv4 Address”: implement four octets 0–255; &lt;&lt; and ==. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “IPv4 Address”: implement four octets 0–255; &lt;&lt; and ==, as well as >> without partial assignment, and ++ with bound protection. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “IPv4 Address”: implement an IPv4 address type with four octets 0–255 and the operators &lt;&lt;, >>, == and &lt;=>, and an address range with a membership check without network requests. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 26. Counter iterator {#v26}

**1. Initial level.** Create a console program with the type “Counter Iterator”: implement the current integer value; \* and ++. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Counter Iterator”: implement the current integer value; \* and ++, as well as postfix increment and ==. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Counter Iterator”: implement a counter iterator type with the current integer value and the operators \*, ++ and ==, and a custom practice range with a finite bound and the sum of its elements. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 27. Rate functor {#v27}

**1. Initial level.** Create a console program with the type “Rate Functor”: implement the price per minute in kopiykas; operator(). Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Rate Functor”: implement the price per minute in kopiykas; operator(), as well as a free threshold and rounding the duration up. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Rate Functor”: implement a rate functor with the price per minute in kopiykas and operator() for the cost of a call, and a report of call costs under two independent rates. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 28. Speed and distance {#v28}

**1. Initial level.** Create a console program with the type “Speed and Distance”: implement meters and seconds as separate types. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “Speed and Distance”: implement meters and seconds as separate types, as well as distance / time with rejection of a zero time. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “Speed and Distance”: implement separate types for meters and seconds with the operators + and distance / time, and a route with type-safe sums and the average speed over the total time. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 29. ECTS grade {#v29}

**1. Initial level.** Create a console program with the type “ECTS Grade”: implement an integer score 0–100; &lt;=>. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “ECTS Grade”: implement an integer score 0–100; &lt;=>, as well as explicit operator int and a letter by explicitly specified bounds. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “ECTS Grade”: implement an ECTS grade type with an integer score 0–100, &lt;=> and a letter by explicitly specified bounds, and a grade sheet with sorting and category frequencies. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

### Variant 30. DNA string {#v30}

**1. Initial level.** Create a console program with the type “DNA String”: implement the symbols A/C/G/T; + and []. Enter the operands from the keyboard; print the result and the initial values. The constructor must check the invariant.

**2. Basic level.** Create a console program for the type “DNA String”: implement the symbols A/C/G/T; + and [], as well as == and the complementary strand. Read the operands from the keyboard; print the results of the operations and clear rejection messages. Test the boundary values and the consistency of the operators, and don’t modify the operands of ordinary addition.

**3. Advanced level.** Create a console project “DNA String”: implement a DNA string type of the symbols A/C/G/T with the operators +, [] and ==, and fragment search, input validation and a report of nucleotide frequencies. Enter data and commands from the keyboard until `end`; `--help` describes the units and limits. Print a tabular report using streams, and add tests of algebraic properties and invalid input. Send errors to `std::cerr` and exit with code 1 on invalid data; preserve the invariant after a failure.

## Procedure

1. Write down the input data, the output format and the class invariants; prepare
  examples of ordinary, empty, boundary and invalid data.
1. Define the public interface and the responsibility of each class.
  Explain who owns each resource and when its lifetime ends.
1. Implement a separate console project. Check the arguments before changing
  the state; send error messages to `std::cerr`.
1. Build with `/std:c++latest /EHsc /W4 /utf-8` and eliminate the warnings;
  run the prepared checks without disabling `assert`.
1. Compare the results with manual calculations. Make sure that an error
  doesn’t leave an object in a state that breaks its contract.
1. Prepare a report with the code, the build command, the actual results,
  a table of tests and an explanation of the limitations. Commit the changes to Git.
1. At the defense, explain the chosen interface, run a new edge case
  and show how a change in the requirements affects the implementation.
