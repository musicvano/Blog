---
title: "Tasks"
description: "Topic 8. Operations and delegation: task variants"
outline: [2, 3]
sourceHash: "6dac69a69946b39c8e0ca052058bcee69eb757760363b39e99de2860ecb82fd6"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

Provide a UML diagram of classes and interfaces. For operators, specify in writing the semantics, result type, bounds, and the rule for whether operands change or stay immutable. For a delegate, state the owner of the state and the moment of validation or notification. The advanced level has `--help`, named arguments, repeatable `--item` with a structured value, keyboard input with no arguments, stderr/code 2 for errors, and code 0 for success. The report contains a table and totals. Random demonstrations use a fixed seed or an explicitly specified sequence so they can be checked.

## Variants

### Variant 1. Rational numbers {#v1}

**1. Initial level.** Create a Kotlin/JVM console program: enter two fractions with numerators −1000..1000 and nonzero denominators −1000..1000; Rational normalizes the sign and GCD and implements plus, minus, times, div, and compareTo; print the results and reject division by zero. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter two fractions with numerators −1000..1000 and nonzero denominators −1000..1000; Rational normalizes the sign and GCD and implements plus, minus, times, div, and compareTo; print the results and reject division by zero. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter two fractions with numerators −1000..1000 and nonzero denominators −1000..1000; Rational normalizes the sign and GCD and implements plus, minus, times, div, and compareTo; print the results and reject division by zero. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: verify consistent equals/hashCode and the immutability of the operands. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 2. 3D vectors {#v2}

**1. Initial level.** Create a Kotlin/JVM console program: enter two vectors with three coordinates −1000..1000; Vector3 implements plus, minus, get, and the named dot/cross; print the sum, the difference, and the products. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter two vectors with three coordinates −1000..1000; Vector3 implements plus, minus, get, and the named dot/cross; print the sum, the difference, and the products. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter two vectors with three coordinates −1000..1000; Vector3 implements plus, minus, get, and the named dot/cross; print the sum, the difference, and the products. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: times for a scalar and compareTo by length, with an explanation of how it differs from equals. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 3. Money amounts {#v3}

**1. Initial level.** Create a Kotlin/JVM console program: enter two amounts in kopiykas 0..1000000 and UAH/USD; Money implements plus and compareTo only for the same currency; print the sum or the reason for rejection. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter two amounts in kopiykas 0..1000000 and UAH/USD; Money implements plus and compareTo only for the same currency; print the sum or the reason for rejection. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter two amounts in kopiykas 0..1000000 and UAH/USD; Money implements plus and compareTo only for the same currency; print the sum or the reason for rejection. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: times for a quantity, minus without a negative result, and an overflow check. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 4. Time of day {#v4}

**1. Initial level.** Create a Kotlin/JVM console program: enter hours 0..23, minutes 0..59, and an offset −1440..1440; TimeOfDay.plus adds minutes modulo a day, and compareTo compares minutes since midnight. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter hours 0..23, minutes 0..59, and an offset −1440..1440; TimeOfDay.plus adds minutes modulo a day, and compareTo compares minutes since midnight. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter hours 0..23, minutes 0..59, and an offset −1440..1440; TimeOfDay.plus adds minutes modulo a day, and compareTo compares minutes since midnight. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: rangeTo and contains for a range that does not cross midnight; it is empty if the start is later. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 5. Complex numbers {#v5}

**1. Initial level.** Create a Kotlin/JVM console program: enter two complex numbers with parts −1000..1000; Complex implements plus, minus, times, and invoke, which returns the string a+bi with the correct sign. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter two complex numbers with parts −1000..1000; Complex implements plus, minus, times, and invoke, which returns the string a+bi with the correct sign. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter two complex numbers with parts −1000..1000; Complex implements plus, minus, times, and invoke, which returns the string a+bi with the correct sign. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: div with rejection for zero, and comparison of the result with the formula. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 6. Temperatures {#v6}

**1. Initial level.** Create a Kotlin/JVM console program: enter two temperatures and the scales C/F; Temperature stores kelvins, and compareTo compares them; plus accepts only a temperature difference in kelvins, not another absolute temperature. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter two temperatures and the scales C/F; Temperature stores kelvins, and compareTo compares them; plus accepts only a temperature difference in kelvins, not another absolute temperature. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter two temperatures and the scales C/F; Temperature stores kelvins, and compareTo compares them; plus accepts only a temperature difference in kelvins, not another absolute temperature. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: a separate DeltaTemperature, and minus of two temperatures returns the difference. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 7. Calendar dates {#v7}

**1. Initial level.** Create a Kotlin/JVM console program: enter an ISO date 1900..2100; DateValue implements inc and dec as new dates via LocalDate; print the previous and next dates. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter an ISO date 1900..2100; DateValue implements inc and dec as new dates via LocalDate; print the previous and next dates. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter an ISO date 1900..2100; DateValue implements inc and dec as new dates via LocalDate; print the previous and next dates. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: rangeTo, contains, iterator; test a leap year and exhaustion. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 8. Angles {#v8}

**1. Initial level.** Create a Kotlin/JVM console program: enter two finite angles −100000..100000 degrees; Angle normalizes to [0;360) and implements plus, minus, and times for a scalar. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter two finite angles −100000..100000 degrees; Angle normalizes to [0;360) and implements plus, minus, and times for a scalar. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter two finite angles −100000..100000 degrees; Angle normalizes to [0;360) and implements plus, minus, and times for a scalar. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: get for the degree/minute/second components with clear rounding to a whole second. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 9. Application settings {#v9}

**1. Initial level.** Create a Kotlin/JVM console program: enter an initial theme light/dark and a new theme; Settings.theme uses observable and logs the old/new value; print the log. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter an initial theme light/dark and a new theme; Settings.theme uses observable and logs the old/new value; print the log. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter an initial theme light/dark and a new theme; Settings.theme uses observable and logs the old/new value; print the log. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: validation of allowed values before the delegated write, and several changes. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 10. User profile {#v10}

**1. Initial level.** Create a Kotlin/JVM console program: enter an initial and a new age; Profile.age uses vetoable and accepts 0..120; also validate the initial value; print the state after the write. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter an initial and a new age; Profile.age uses vetoable and accepts 0..120; also validate the initial value; print the state after the write. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter an initial and a new age; Profile.age uses vetoable and accepts 0..120; also validate the initial value; print the state after the write. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: a name with normalization and a log of accepted/rejected attempts. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 11. Cached report {#v11}

**1. Initial level.** Create a Kotlin/JVM console program: enter three numbers −1000..1000; Report stores immutable data, and lazy summary computes the sum and the average; read it twice and show that the computation ran once. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter three numbers −1000..1000; Report stores immutable data, and lazy summary computes the sum and the average; read it twice and show that the computation ran once. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter three numbers −1000..1000; Report stores immutable data, and lazy summary computes the sum and the average; read it twice and show that the computation ran once. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: a separate initialization counter and the independence of two Report objects. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 12. Call counter {#v12}

**1. Initial level.** Create a Kotlin/JVM console program: enter two strings; the Service.process interface returns uppercase, and CountingService implements it with by and counts successful direct process calls; print the results and the count. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter two strings; the Service.process interface returns uppercase, and CountingService implements it with by and counts successful direct process calls; print the results and the count. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter two strings; the Service.process interface returns uppercase, and CountingService implements it with by and counts successful direct process calls; print the results and the count. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: add pair processing and investigate the delegate's internal calls. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 13. Hero stats {#v13}

**1. Initial level.** Create a Kotlin/JVM console program: enter an initial and a new health value 0..100; a custom BoundedInt delegate rejects out-of-range values before the change; print the state. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter an initial and a new health value 0..100; a custom BoundedInt delegate rejects out-of-range values before the change; print the state. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter an initial and a new health value 0..100; a custom BoundedInt delegate rejects out-of-range values before the change; print the state. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: the same delegate class for mana 0..50, with independent properties. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 14. Physical quantities {#v14}

**1. Initial level.** Create a Kotlin/JVM console program: enter a mass of 0.1..1000 kg and an acceleration of −100..100 m/s²; Mass.times(Acceleration) returns Force; print the force with its unit. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter a mass of 0.1..1000 kg and an acceleration of −100..100 m/s²; Mass.times(Acceleration) returns Force; print the force with its unit. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter a mass of 0.1..1000 kg and an acceleration of −100..100 m/s²; Mass.times(Acceleration) returns Force; print the force with its unit. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: Force.plus and division of Force by a nonzero Mass with type-safe results. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 15. Numeric intervals {#v15}

**1. Initial level.** Create a Kotlin/JVM console program: enter the bounds of two closed intervals −1000..1000 and a number; Interval.contains checks membership, and intersect returns an interval or null. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter the bounds of two closed intervals −1000..1000 and a number; Interval.contains checks membership, and intersect returns an interval or null. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter the bounds of two closed intervals −1000..1000 and a number; Interval.contains checks membership, and intersect returns an interval or null. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: union returns a single interval only for overlapping/touching intervals, otherwise two; do not hide the gap. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 16. Access permissions {#v16}

**1. Initial level.** Create a Kotlin/JVM console program: enter masks 0..7: READ=1, WRITE=2, EXECUTE=4; Permissions has named infix or/and and operator contains for a single flag; print the results. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter masks 0..7: READ=1, WRITE=2, EXECUTE=4; Permissions has named infix or/and and operator contains for a single flag; print the results. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter masks 0..7: READ=1, WRITE=2, EXECUTE=4; Permissions has named infix or/and and operator contains for a single flag; print the results. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: a check for the absence of unknown bits and a table of all permissions. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 17. Chessboard {#v17}

**1. Initial level.** Create a Kotlin/JVM console program: enter a row and a column 1..8 and an offset; Cell.plus returns a new cell or a rejection past the edge; Board.get returns the educational contents of a cell. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter a row and a column 1..8 and an offset; Cell.plus returns a new cell or a rejection past the edge; Board.get returns the educational contents of a cell. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter a row and a column 1..8 and an offset; Cell.plus returns a new cell or a rejection past the edge; Board.get returns the educational contents of a cell. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: set with validation and contains for board coordinates. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 18. Memory sizes {#v18}

**1. Initial level.** Create a Kotlin/JVM console program: enter two sizes 0..1000000000 bytes; Bytes implements plus, minus without a negative result, and compareTo; invoke returns the size formatted in KiB with two decimal places. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter two sizes 0..1000000000 bytes; Bytes implements plus, minus without a negative result, and compareTo; invoke returns the size formatted in KiB with two decimal places. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter two sizes 0..1000000000 bytes; Bytes implements plus, minus without a negative result, and compareTo; invoke returns the size formatted in KiB with two decimal places. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: times for a quantity with an overflow check. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 19. Lengths {#v19}

**1. Initial level.** Create a Kotlin/JVM console program: enter lengths with units mm/cm/m and numbers 0..1000000; Length stores whole millimeters and implements plus and compareTo. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter lengths with units mm/cm/m and numbers 0..1000000; Length stores whole millimeters and implements plus and compareTo. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter lengths with units mm/cm/m and numbers 0..1000000; Length stores whole millimeters and implements plus and compareTo. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: minus and times for a non-negative integer factor without changing the operands. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 20. Pedometer {#v20}

**1. Initial level.** Create a Kotlin/JVM console program: enter a sequence of up to 20 readings 0..100000; a Maximum delegate stores the largest value provided; print the result after each write. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter a sequence of up to 20 readings 0..100000; a Maximum delegate stores the largest value provided; print the result after each write. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter a sequence of up to 20 readings 0..100000; a Maximum delegate stores the largest value provided; print the result after each write. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: separate daily and weekly counters without shared state. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 21. Questionnaire {#v21}

**1. Initial level.** Create a Kotlin/JVM console program: enter a name and a city; a TrimmedText delegate trims leading and trailing spaces and rejects an empty string and a length over 40; print the normalized fields. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter a name and a city; a TrimmedText delegate trims leading and trailing spaces and rejects an empty string and a length over 40; print the normalized fields. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter a name and a city; a TrimmedText delegate trims leading and trailing spaces and rejects an empty string and a length over 40; print the normalized fields. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: a log of property.name and the state after a rejection. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 22. Speed limit {#v22}

**1. Initial level.** Create a Kotlin/JVM console program: enter an initial and a new speed; the ReadWriteProperty SpeedRange accepts finite values 0..130 km/h; print the state after the attempt. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter an initial and a new speed; the ReadWriteProperty SpeedRange accepts finite values 0..130 km/h; print the state after the attempt. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter an initial and a new speed; the ReadWriteProperty SpeedRange accepts finite values 0..130 km/h; print the state after the attempt. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: reuse the delegate for a second independent object and test NaN. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 23. Bonus card {#v23}

**1. Initial level.** Create a Kotlin/JVM console program: enter a purchase amount of 0..1000000 kopiykas; BonusRule gives 1 point for every full 10000 kopiykas, and LoggingBonusRule logs successful calls via by. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter a purchase amount of 0..1000000 kopiykas; BonusRule gives 1 point for every full 10000 kopiykas, and LoggingBonusRule logs successful calls via by. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter a purchase amount of 0..1000000 kopiykas; BonusRule gives 1 point for every full 10000 kopiykas, and LoggingBonusRule logs successful calls via by. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: a decorator that doubles the result when an explicitly set promo flag is on. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 24. Calculator with a log {#v24}

**1. Initial level.** Create a Kotlin/JVM console program: enter two numbers −1000..1000 and add/subtract; a Calculator interface and LoggingCalculator with by, logging the arguments and the result. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter two numbers −1000..1000 and add/subtract; a Calculator interface and LoggingCalculator with by, logging the arguments and the result. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter two numbers −1000..1000 and add/subtract; a Calculator interface and LoggingCalculator with by, logging the arguments and the result. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: add multiply and demonstrate a delegated method that is not overridden. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 25. Application versions {#v25}

**1. Initial level.** Create a Kotlin/JVM console program: enter versions major.minor.patch with components 0..999; Version.compareTo compares lexicographically, and rangeTo creates only a membership interval without iteration. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter versions major.minor.patch with components 0..999; Version.compareTo compares lexicographically, and rangeTo creates only a membership interval without iteration. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter versions major.minor.patch with components 0..999; Version.compareTo compares lexicographically, and rangeTo creates only a membership interval without iteration. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: contains to check a version between inclusive bounds, and consistent equality. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 26. Dice {#v26}

**1. Initial level.** Create a Kotlin/JVM console program: enter a number of faces 2..20 and a fixed sequence of numbers 1..faces; Dice.invoke returns the next element cyclically, and plus creates a DicePair that returns the sum of two rolls. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter a number of faces 2..20 and a fixed sequence of numbers 1..faces; Dice.invoke returns the next element cyclically, and plus creates a DicePair that returns the sum of two rolls. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter a number of faces 2..20 and a fixed sequence of numbers 1..faces; Dice.invoke returns the next element cyclically, and plus creates a DicePair that returns the sum of two rolls. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: a log of rolls without a random dependency; independent cursors. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 27. Mixing paints {#v27}

**1. Initial level.** Create a Kotlin/JVM console program: enter two RGB colors with channels 0..255; Color.plus returns the per-channel average rounded down, and times scales the channels, clamped to 0..255. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter two RGB colors with channels 0..255; Color.plus returns the per-channel average rounded down, and times scales the channels, clamped to 0..255. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter two RGB colors with channels 0..255; Color.plus returns the per-channel average rounded down, and times scales the channels, clamped to 0..255. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: get by index 0..2 and a check for invalid indices. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 28. Travel budget {#v28}

**1. Initial level.** Create a Kotlin/JVM console program: enter an initial budget of 0..1000000 kopiykas and an expense; Budget uses observable to notify after a successful charge; a negative balance is not allowed. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter an initial budget of 0..1000000 kopiykas and an expense; Budget uses observable to notify after a successful charge; a negative balance is not allowed. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter an initial budget of 0..1000000 kopiykas and an expense; Budget uses observable to notify after a successful charge; a negative balance is not allowed. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: a warning when the balance falls below 10000 kopiykas and a log of crossing the threshold. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 29. Mixing concrete {#v29}

**1. Initial level.** Create a Kotlin/JVM console program: enter masses of cement, sand, and gravel 0..1000 kg and a multiplier 0..10; Mix.times returns a new mix, and plus adds the components; print the masses and the total mass. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter masses of cement, sand, and gravel 0..1000 kg and a multiplier 0..10; Mix.times returns a new mix, and plus adds the components; print the masses and the total mass. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter masses of cement, sand, and gravel 0..1000 kg and a multiplier 0..10; Mix.times returns a new mix, and plus adds the components; print the masses and the total mass. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: componentN for destructuring and a finiteness check. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

### Variant 30. Second-degree polynomials {#v30}

**1. Initial level.** Create a Kotlin/JVM console program: enter the coefficients of two polynomials ax²+bx+c within −1000..1000 and x; Polynomial.plus, times with a scalar, and invoke(x) compute the result. Provide UML and explain the owner of the state and the semantics of the operations.

**2. Basic level.** Create a Kotlin/JVM console program: enter the coefficients of two polynomials ax²+bx+c within −1000..1000 and x; Polynomial.plus, times with a scalar, and invoke(x) compute the result. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Provide UML and explain the owner of the state and the semantics of the operations.

**3. Advanced level.** Create a Kotlin/JVM console program: enter the coefficients of two polynomials ax²+bx+c within −1000..1000 and x; Polynomial.plus, times with a scalar, and invoke(x) compute the result. Process up to 20 sets, check bounds and errors before changing state, and print a table of results. Extension: get by degree 0..2, unaryMinus, and a check that the operands stay unchanged. Implement `--help`, named arguments, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Provide totals and five checks including a rejection. Provide UML and explain the owner of the state and the semantics of the operations.

## Procedure

1. Define the contract of the operations and draw the UML diagram.
2. Implement validated constructors and numeric constraints.
3. Test operators without changing the input values, if that is the type's contract; separately test plusAssign, if it is needed.
4. Test index bounds, empty ranges, and iterator exhaustion.
5. For properties, test the initial value, a successful write, a rejection, and that the state is unchanged after it.
6. For a decorator, test direct calls and the delegate's internal calls.
7. Provide code, UML, a README, and at least five checks.
8. During the presentation, navigate from an operator symbol to its function in the IDE and explain when your delegate is called.
