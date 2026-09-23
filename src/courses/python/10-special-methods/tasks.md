---
title: "Tasks"
description: "Topic 10. Special methods, dataclass: task variants"
outline: [2, 3]
sourceHash: "992f38620e321d0be0cd332f0785b989740155aa562c57c41be2c89799f17213"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

Use Python 3.14 and parameter and return annotations. Before implementation, define valid operand types, behavior for invalid data, and the rule for state changes. Do not overload an operation just to have it: explain its domain meaning.

## Variants

### Variant 1. Rational fractions {#v1}

**1. Initial level.** Create a Python 3.14 console program that reads two fractions as integer numerator/denominator pairs. Reduce them using gcd, reject a zero denominator, and calculate the sum. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads two fractions as integer numerator/denominator pairs. Reduce them using gcd, reject a zero denominator, and calculate the sum. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads two fractions as integer numerator/denominator pairs. Reduce them using gcd, reject a zero denominator, and calculate the sum. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add comparison using cross products and an immutable hash. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 2. Complex numbers {#v2}

**1. Initial level.** Create a Python 3.14 console program that reads two pairs of finite real coordinates. Add the complex numbers and output the magnitude using hypot. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads two pairs of finite real coordinates. Add the complex numbers and output the magnitude using hypot. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads two pairs of finite real coordinates. Add the complex numbers and output the magnitude using hypot. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add multiplication `(a*c-b*d, a*d+b*c)` and a custom .2f format. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 3. Duration {#v3}

**1. Initial level.** Create a Python 3.14 console program that reads two nonnegative integer durations in seconds. Calculate their sum and display hours, minutes, and seconds. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads two nonnegative integer durations in seconds. Calculate their sum and display hours, minutes, and seconds. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads two nonnegative integer durations in seconds. Calculate their sum and display hours, minutes, and seconds. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, implement a frozen dataclass, multiplication by a nonnegative integer, and `total_ordering`. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 4. Multicurrency money {#v4}

**1. Initial level.** Create a Python 3.14 console program that reads two decimal amounts and UAH or EUR codes. Add only amounts in the same currency and print the sum with two decimal places. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads two decimal amounts and UAH or EUR codes. Add only amounts in the same currency and print the sum with two decimal places. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads two decimal amounts and UAH or EUR codes. Add only amounts in the same currency and print the sum with two decimal places. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, store Decimal values and an Enum of currencies; use a separate method to convert at a fixed sample rate of 50 UAH/EUR. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 5. Polynomials {#v5}

**1. Initial level.** Create a Python 3.14 console program that reads the coefficients a, b, c of two quadratic polynomials and a number x. Implement coefficient addition and calling for `a*x*x+b*x+c`. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads the coefficients a, b, c of two quadratic polynomials and a number x. Implement coefficient addition and calling for `a*x*x+b*x+c`. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads the coefficients a, b, c of two quadratic polynomials and a number x. Implement coefficient addition and calling for `a*x*x+b*x+c`. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add multiplication with a result of degree up to four and a coefficient container. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 6. Deck of cards {#v6}

**1. Initial level.** Create a Python 3.14 console program that reads a number of cards n from 1 to 52. Create a card dataclass with an Enum suit and a rank of 2..14, and output the first n without repetition. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads a number of cards n from 1 to 52. Create a card dataclass with an Enum suit and a rank of 2..14, and output the first n without repetition. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads a number of cards n from 1 to 52. Create a card dataclass with an Enum suit and a rank of 2..14, and output the first n without repetition. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add a Deck container, indexing, and shuffling with an explicitly entered seed. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 7. Matrices {#v7}

**1. Initial level.** Create a Python 3.14 console program that reads two 2 by 2 matrices of integers. Implement (row, column) indexing and elementwise addition. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads two 2 by 2 matrices of integers. Implement (row, column) indexing and elementwise addition. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads two 2 by 2 matrices of integers. Implement (row, column) indexing and elementwise addition. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, implement matrix multiplication with the `@` operator and transposition. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 8. Temperature {#v8}

**1. Initial level.** Create a Python 3.14 console program that reads two finite values with scale C or F. Convert to C using (F-32)\*5/9 and compare, rejecting C below -273.15. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads two finite values with scale C or F. Convert to C using (F-32)\*5/9 and compare, rejecting C below -273.15. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads two finite values with scale C or F. Convert to C using (F-32)\*5/9 and compare, rejecting C below -273.15. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add an Enum of scales and `__format__` with .1f precision and an explicit scale suffix. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 9. GPS coordinates {#v9}

**1. Initial level.** Create a Python 3.14 console program that reads two latitudes of -90..90 and longitudes of -180..180. Create a frozen dataclass and output equality and the number of distinct points. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads two latitudes of -90..90 and longitudes of -180..180. Create a frozen dataclass and output equality and the number of distinct points. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads two latitudes of -90..90 and longitudes of -180..180. Create a frozen dataclass and output equality and the number of distinct points. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, implement subtraction as angular distance: acos of the dot product of unit 3D vectors, clamping the argument to -1..1; return radians. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 10. Software versions {#v10}

**1. Initial level.** Create a Python 3.14 console program that reads two major.minor.patch entries with nonnegative integer parts. Create an immutable type and compare the numeric triples lexicographically. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads two major.minor.patch entries with nonnegative integer parts. Create an immutable type and compare the numeric triples lexicographically. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads two major.minor.patch entries with nonnegative integer parts. Create an immutable type and compare the numeric triples lexicographically. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add `from_string`, `total_ordering`, and sorting of three versions; prohibit suffixes. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 11. Shopping cart {#v11}

**1. Initial level.** Create a Python 3.14 console program that reads three product names, prices in kopiykas, and quantities of 1..100. Calculate the total cost and check for a name using in. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads three product names, prices in kopiykas, and quantities of 1..100. Calculate the total cost and check for a name using in. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads three product names, prices in kopiykas, and quantities of 1..100. Calculate the total cost and check for a name using in. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add `__iadd__` for a new line item and a StrEnum of categories; reject a repeated name with a different price. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 12. Numeric intervals {#v12}

**1. Initial level.** Create a Python 3.14 console program that reads two pairs of integer bounds l&lt;=r. Build closed intervals and test membership of an entered number. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads two pairs of integer bounds l&lt;=r. Build closed intervals and test membership of an entered number. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads two pairs of integer bounds l&lt;=r. Build closed intervals and test membership of an entered number. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, implement & as intersection with None for an empty result, and | as a list of one or two continuous intervals. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 13. 3D vector {#v13}

**1. Initial level.** Create a Python 3.14 console program that reads two triples of finite coordinates. Implement addition and the magnitude `sqrt(x*x+y*y+z*z)`. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads two triples of finite coordinates. Implement addition and the magnitude `sqrt(x*x+y*y+z*z)`. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads two triples of finite coordinates. Implement addition and the magnitude `sqrt(x*x+y*y+z*z)`. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add a dot product through `@` and `__iter__` for unpacking. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 14. Class schedule {#v14}

**1. Initial level.** Create a Python 3.14 console program that reads three records: day 1..7, start time 0..1439 minutes, and name. Create Lesson and output classes by day and time. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads three records: day 1..7, start time 0..1439 minutes, and name. Create Lesson and output classes by day and time. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads three records: day 1..7, start time 0..1439 minutes, and name. Create Lesson and output classes by day and time. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add an Enum of days, `order=True` with the correct field order, and rejection of an empty name. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 15. Access permissions {#v15}

**1. Initial level.** Create a Python 3.14 console program that reads two sets of letters R, W, X and a requested permission. Build a Flag and check permission membership. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads two sets of letters R, W, X and a requested permission. Build a Flag and check permission membership. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads two sets of letters R, W, X and a requested permission. Build a Flag and check permission membership. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, output the union and intersection of permissions; reject unknown letters and allow an empty set. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 16. Length with units {#v16}

**1. Initial level.** Create a Python 3.14 console program that reads two nonnegative lengths in mm, cm, or m. Convert to integer millimeters and calculate the sum. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads two nonnegative lengths in mm, cm, or m. Convert to integer millimeters and calculate the sum. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads two nonnegative lengths in mm, cm, or m. Convert to integer millimeters and calculate the sum. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add an Enum of units, comparison, and formatting in the selected unit. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 17. Tennis score {#v17}

**1. Initial level.** Create a Python 3.14 console program that reads a sequence of rally winners A or B. Track points in one game until a win: at least four points with a two-point lead. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads a sequence of rally winners A or B. Track points in one game until a win: at least four points with a two-point lead. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads a sequence of rally winners A or B. Track points in one game until a win: at least four points with a two-point lead. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add an Enum of states and `__str__` for deuce/advantage/win; reject new points after the game ends. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 18. Taxi booking {#v18}

**1. Initial level.** Create a Python 3.14 console program that reads a passenger name and a sequence of statuses new, accepted, done. Create a dataclass and allow only new→accepted→done. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads a passenger name and a sequence of statuses new, accepted, done. Create a dataclass and allow only new→accepted→done. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads a passenger name and a sequence of statuses new, accepted, done. Create a dataclass and allow only new→accepted→done. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add a separate history through `default_factory` and match for a status message. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 19. RGB colors {#v19}

**1. Initial level.** Create a Python 3.14 console program that reads two colors as triples of integers 0..255. Create a frozen dataclass and display HEX through `__format__`. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads two colors as triples of integers 0..255. Create a frozen dataclass and display HEX through `__format__`. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads two colors as triples of integers 0..255. Create a frozen dataclass and display HEX through `__format__`. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, implement blending with the + operator as a componentwise average rounded down. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 20. Weekly alarms {#v20}

**1. Initial level.** Create a Python 3.14 console program that reads two sets of day numbers 1..7 and a time HH:MM. Create a Flag of days and display active days. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads two sets of day numbers 1..7 and a time HH:MM. Create a Flag of days and display active days. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads two sets of day numbers 1..7 and a time HH:MM. Create a Flag of days and display active days. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add union and intersection of schedules with the same time; reject different times. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 21. Bank history {#v21}

**1. Initial level.** Create a Python 3.14 console program that reads three transactions: a description and a signed integer amount in kopiykas. Create a container and output the total and last transaction. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads three transactions: a description and a signed integer amount in kopiykas. Create a container and output the total and last transaction. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads three transactions: a description and a signed integer amount in kopiykas. Create a container and output the total and last transaction. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add slices returning a new container, independent iteration, and immutable dataclass records. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 22. Chess position {#v22}

**1. Initial level.** Create a Python 3.14 console program that reads three distinct squares a1..h8 and codes K, Q, R. Create a Square dataclass and an Enum of pieces, and display the piece on an entered square. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads three distinct squares a1..h8 and codes K, Q, R. Create a Square dataclass and an Enum of pieces, and display the piece on an entered square. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads three distinct squares a1..h8 and codes K, Q, R. Create a Square dataclass and an Enum of pieces, and display the piece on an entered square. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add board indexing and occupied-square conflict checks; move rules are not required. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 23. Recipe ingredients {#v23}

**1. Initial level.** Create a Python 3.14 console program that reads three ingredient names, positive quantities, and units g or ml. Create a recipe and multiply quantities by an entered positive factor. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads three ingredient names, positive quantities, and units g or ml. Create a recipe and multiply quantities by an entered positive factor. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads three ingredient names, positive quantities, and units g or ml. Create a recipe and multiply quantities by an entered positive factor. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add an Enum of units and immutable records; do not mix g and ml, and round only for printing. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 24. Custom date {#v24}

**1. Initial level.** Create a Python 3.14 console program that reads an ISO date YYYY-MM-DD and an integer number of days. Wrap datetime.date in a custom immutable type and add the days. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads an ISO date YYYY-MM-DD and an integer number of days. Wrap datetime.date in a custom immutable type and add the days. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads an ISO date YYYY-MM-DD and an integer number of days. Wrap datetime.date in a custom immutable type and add the days. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add the difference between two dates, comparison, and `__format__` for the %d.%m.%Y format. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 25. Task queue {#v25}

**1. Initial level.** Create a Python 3.14 console program that reads three names and priorities of 1..3. Create a dataclass and output tasks by priority and arrival order. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads three names and priorities of 1..3. Create a dataclass and output tasks by priority and arrival order. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads three names and priorities of 1..3. Create a dataclass and output tasks by priority and arrival order. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add IntEnum and heapq; use a key consisting of priority and a unique number, with text having no effect on order. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 26. Time measurement {#v26}

**1. Initial level.** Create a Python 3.14 console program that reads a count n from 1 to 100000. Measure calculation of the sum of range(n) with a context manager. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads a count n from 1 to 100000. Measure calculation of the sum of range(n) with a context manager. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads a count n from 1 to 100000. Measure calculation of the sum of range(n) with a context manager. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add separate nested timers, a report, and a cleanup check after ValueError; do not fix the duration to a constant. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 27. Shapes in match {#v27}

**1. Initial level.** Create a Python 3.14 console program that reads the type circle or rectangle and positive parameters. Create shape data classes and calculate area through match. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads the type circle or rectangle and positive parameters. Create shape data classes and calculate area through match. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads the type circle or rectangle and positive parameters. Create shape data classes and calculate area through match. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add sorting by area and equality by type and dimensions, and describe `__match_args__`. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 28. Order statuses {#v28}

**1. Initial level.** Create a Python 3.14 console program that reads an order number and the commands pay, ship. Create a StrEnum with new, paid, shipped and perform permitted transitions. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads an order number and the commands pay, ship. Create a StrEnum with new, paid, shipped and perform permitted transitions. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads an order number and the commands pay, ship. Create a StrEnum with new, paid, shipped and perform permitted transitions. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add history, match, and rejection of repeated/premature commands without changing state. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 29. Lap time {#v29}

**1. Initial level.** Create a Python 3.14 console program that reads three positive integer results in milliseconds. Create LapTime, implement addition, and format as minutes:seconds.milliseconds. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads three positive integer results in milliseconds. Create LapTime, implement addition, and format as minutes:seconds.milliseconds. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads three positive integer results in milliseconds. Create LapTime, implement addition, and format as minutes:seconds.milliseconds. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add comparison, an average as Decimal milliseconds, and a prohibition on changing a hashed value. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

### Variant 30. Sparse vector {#v30}

**1. Initial level.** Create a Python 3.14 console program that reads a length of 1..100 and three index/finite value pairs. Store nonzero coordinates in a dictionary and read absent ones as 0. Output the result with labels or an invalid-data message. Use a class with annotated methods.

**2. Basic level.** Create a Python 3.14 console program that reads a length of 1..100 and three index/finite value pairs. Store nonzero coordinates in a dictionary and read absent ones as 0. Output the result with labels or an invalid-data message. Use a class with annotated methods. Implement consistent `__repr__` and `__str__`, domain validation, and a check for an unknown operand type. Provide five test cases.

**3. Advanced level.** Create a Python 3.14 console program that reads a length of 1..100 and three index/finite value pairs. Store nonzero coordinates in a dictionary and read absent ones as 0. Output the result with labels or an invalid-data message. Use a class with annotated methods. Additionally, add `__setitem__`, `__len__` as the mathematical length, and addition for equal dimensions; zero removes an entry. Test normal, boundary, and invalid cases, instance independence, and the behavior of unsupported operations.

## Procedure

1. Write down the class's fields, invariants, and supported operations; identify immutable and mutable parts of the model.
2. Implement the class and a console scenario with an explicit input contract. Return `NotImplemented` for unknown arithmetic operands.
3. Test ordinary, zero, boundary, and invalid cases, instance independence, and preservation of the original operands.
4. For a hashable class, test equal instances in a set; for a container, test indices, a slice, and repeated traversal; for a context, test a failure.
5. Show the dataclass parameters and the object's state after an operation in PyCharm. Submit a table of at least five checks.
6. Save the code and README in a local Git repository; GitHub is optional. During the defense, explain why one operator is inappropriate.
