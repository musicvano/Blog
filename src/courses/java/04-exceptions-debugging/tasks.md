---
title: "Tasks"
description: "Topic 4. Exceptions and debugging: task variants"
outline: [2, 3]
sourceHash: "461e2f65d82211fb809e0a41206b6d8180b049a044285b6ded06487a153b671a"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Date parsing {#v1}

**1. Initial level.** Create a Java console program on JDK 27: read an ISO yyyy-MM-dd date using the LocalDate calendar; print the day of the year; reject invalid formats or impossible dates while preserving the cause. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read an ISO yyyy-MM-dd date using the LocalDate calendar; print the day of the year; reject invalid formats or impossible dates while preserving the cause. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read an ISO yyyy-MM-dd date using the LocalDate calendar; print the day of the year; reject invalid formats or impossible dates while preserving the cause. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 2. Expression calculator {#v2}

**1. Initial level.** Create a Java console program on JDK 27: read two int values and one operator +,-,\*,/; use exact arithmetic, reject a zero divisor and MIN\_VALUE/-1, and print the result or cause. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read two int values and one operator +,-,\*,/; use exact arithmetic, reject a zero divisor and MIN\_VALUE/-1, and print the result or cause. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read two int values and one operator +,-,\*,/; use exact arithmetic, reject a zero divisor and MIN\_VALUE/-1, and print the result or cause. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 3. Unit converter {#v3}

**1. Initial level.** Create a Java console program on JDK 27: read a finite length in 0..1000000 and a unit mm/cm/m; print meters, and reject unknown units and out-of-range values. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read a finite length in 0..1000000 and a unit mm/cm/m; print meters, and reject unknown units and out-of-range values. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read a finite length in 0..1000000 and a unit mm/cm/m; print meters, and reject unknown units and out-of-range values. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 4. User registration {#v4}

**1. Initial level.** Create a Java console program on JDK 27: read a login of 3..20 ASCII letters/digits, an age in 1..120, and an email with one @ and nonempty parts; print all local errors or acceptance, without checking whether the address exists. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read a login of 3..20 ASCII letters/digits, an age in 1..120, and an email with one @ and nonempty parts; print all local errors or acceptance, without checking whether the address exists. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read a login of 3..20 ASCII letters/digits, an age in 1..120, and an email with one @ and nonempty parts; print all local errors or acceptance, without checking whether the address exists. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 5. Ticket sales {#v5}

**1. Initial level.** Create a Java console program on JDK 27: use an array of 10 free seats; read numbers in 1..10, reject occupied or nonexistent seats without changing the array, and print the occupied seat numbers. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: use an array of 10 free seats; read numbers in 1..10, reject occupied or nonexistent seats without changing the array, and print the occupied seat numbers. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: use an array of 10 free seats; read numbers in 1..10, reject occupied or nonexistent seats without changing the array, and print the occupied seat numbers. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 6. Inventory {#v6}

**1. Initial level.** Create a Java console program on JDK 27: start with a stock of 100 units; read withdrawals in 1..100, throw a custom exception when stock is insufficient, and preserve the stock; print the state after each attempt. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: start with a stock of 100 units; read withdrawals in 1..100, throw a custom exception when stock is insufficient, and preserve the stock; print the state after each attempt. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: start with a stock of 100 units; read withdrawals in 1..100, throw a custom exception when stock is insufficient, and preserve the stock; print the state after each attempt. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 7. Electronic gradebook {#v7}

**1. Initial level.** Create a Java console program on JDK 27: read lines of scores in 0..100 until EOF; skip invalid lines with their number and cause; print the mean of valid scores or indicate that no data is available. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read lines of scores in 0..100 until EOF; skip invalid lines with their number and cause; print the mean of valid scores or indicate that no data is available. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read lines of scores in 0..100 until EOF; skip invalid lines with their number and cause; print the mean of valid scores or indicate that no data is available. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 8. GPS coordinates {#v8}

**1. Initial level.** Create a Java console program on JDK 27: read two finite numbers latitude\[-90,90\], longitude\[-180,180\]; print a normalized representation with 6 decimal places, and reject other data. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read two finite numbers latitude\[-90,90\], longitude\[-180,180\]; print a normalized representation with 6 decimal places, and reject other data. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read two finite numbers latitude\[-90,90\], longitude\[-180,180\]; print a normalized representation with 6 decimal places, and reject other data. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 9. Square root {#v9}

**1. Initial level.** Create a Java console program on JDK 27: read a finite number in 0..1e12; the method returns Math.sqrt and throws IllegalArgumentException for other arguments; print the root. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read a finite number in 0..1e12; the method returns Math.sqrt and throws IllegalArgumentException for other arguments; print the root. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read a finite number in 0..1e12; the method returns Math.sqrt and throws IllegalArgumentException for other arguments; print the root. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 10. Passwords {#v10}

**1. Initial level.** Create a Java console program on JDK 27: read a sample string of 8..64 ASCII characters containing a letter and a digit; print only a list of violated rules without the password itself; this checks the format and does not guarantee security. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read a sample string of 8..64 ASCII characters containing a letter and a digit; print only a list of violated rules without the password itself; this checks the format and does not guarantee security. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read a sample string of 8..64 ASCII characters containing a letter and a digit; print only a list of violated rules without the password itself; this checks the format and does not guarantee security. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 11. Time of day {#v11}

**1. Initial level.** Create a Java console program on JDK 27: read strictly HH:mm, with hours in 0..23 and minutes in 0..59; return minutes since the start of the day; distinguish format and bounds errors. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read strictly HH:mm, with hours in 0..23 and minutes in 0..59; return minutes since the start of the day; distinguish format and bounds errors. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read strictly HH:mm, with hours in 0..23 and minutes in 0..59; return minutes since the start of the day; distinguish format and bounds errors. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 12. Matrix operations {#v12}

**1. Initial level.** Create a Java console program on JDK 27: read two rectangular matrices with dimensions in 1..10 and int elements in -100..100; check dimension compatibility for multiplication, and print the product or cause without a partial result. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read two rectangular matrices with dimensions in 1..10 and int elements in -100..100; check dimension compatibility for multiplication, and print the product or cause without a partial result. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read two rectangular matrices with dimensions in 1..10 and int elements in -100..100; check dimension compatibility for multiplication, and print the product or cause without a partial result. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 13. Mobile data {#v13}

**1. Initial level.** Create a Java console program on JDK 27: use a limit of 10000 MB and initial usage of 0; read positive integer usage amounts up to 10000, reject amounts exceeding the limit without changing usage, and print the remaining allowance. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: use a limit of 10000 MB and initial usage of 0; read positive integer usage amounts up to 10000, reject amounts exceeding the limit without changing usage, and print the remaining allowance. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: use a limit of 10000 MB and initial usage of 0; read positive integer usage amounts up to 10000, reject amounts exceeding the limit without changing usage, and print the remaining allowance. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 14. IPv4 address {#v14}

**1. Initial level.** Create a Java console program on JDK 27: read four unsigned decimal components in 0..255 separated by periods; reject extra parts, and print the address and its long representation. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read four unsigned decimal components in 0..255 separated by periods; reject extra parts, and print the address and its long representation. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read four unsigned decimal components in 0..255 separated by periods; reject extra parts, and print the address and its long representation. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 15. Recipe scaling {#v15}

**1. Initial level.** Create a Java console program on JDK 27: read original servings in 1..100, target servings in 1..100, and quantities in grams in 0..10000; print the quantities multiplied by the serving ratio; reject NaN and unknown units. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read original servings in 1..100, target servings in 1..100, and quantities in grams in 0..10000; print the quantities multiplied by the serving ratio; reject NaN and unknown units. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read original servings in 1..100, target servings in 1..100, and quantities in grams in 0..10000; print the quantities multiplied by the serving ratio; reject NaN and unknown units. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 16. Odometer {#v16}

**1. Initial level.** Create a Java console program on JDK 27: start with a reading of 1000 km; read new readings in 1000..1000000, reject those below the previous reading without changing state, and print the distance for the interval. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: start with a reading of 1000 km; read new readings in 1000..1000000, reject those below the previous reading without changing state, and print the distance for the interval. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: start with a reading of 1000 km; read new readings in 1000..1000000, reject those below the previous reading without changing state, and print the distance for the interval. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 17. Restaurant order {#v17}

**1. Initial level.** Create a Java console program on JDK 27: use a menu of soup at 60, salad at 80, and tea at 30 UAH; read a name and quantity in 1..20; reject unknown dishes, and print the sample cost of accepted items. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: use a menu of soup at 60, salad at 80, and tea at 30 UAH; read a name and quantity in 1..20; reject unknown dishes, and print the sample cost of accepted items. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: use a menu of soup at 60, salad at 80, and tea at 30 UAH; read a name and quantity in 1..20; reject unknown dishes, and print the sample cost of accepted items. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 18. Bus schedule {#v18}

**1. Initial level.** Create a Java console program on JDK 27: read HH:mm departure/arrival pairs within one day; arrival must be later; print the duration, and skip invalid lines with a cause. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read HH:mm departure/arrival pairs within one day; arrival must be later; print the duration, and skip invalid lines with a cause. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read HH:mm departure/arrival pairs within one day; arrival must be later; print the duration, and skip invalid lines with a cause. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 19. Sample measurements {#v19}

**1. Initial level.** Create a Java console program on JDK 27: read three integer measurements with predefined technical bounds of 0..300, 0..300, and 0..250; print only the range checks, without medical interpretation. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read three integer measurements with predefined technical bounds of 0..300, 0..300, and 0..250; print only the range checks, without medical interpretation. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read three integer measurements with predefined technical bounds of 0..300, 0..300, and 0..250; print only the range checks, without medical interpretation. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 20. Robot on a field {#v20}

**1. Initial level.** Create a Java console program on JDK 27: use a 10x10 field, start at (0,0), and commands N, S, E, W; reject moves outside the field and unknown commands with a custom exception without changing coordinates, and print the position. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: use a 10x10 field, start at (0,0), and commands N, S, E, W; reject moves outside the field and unknown commands with a custom exception without changing coordinates, and print the position. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: use a 10x10 field, start at (0,0), and commands N, S, E, W; reject moves outside the field and unknown commands with a custom exception without changing coordinates, and print the position. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 21. Travel budget {#v21}

**1. Initial level.** Create a Java console program on JDK 27: start with a budget of 100000 kopiykas; read positive expenses that do not exceed the remaining balance; wrap invalid format errors with cause, and print the unchanged balance after failure. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: start with a budget of 100000 kopiykas; read positive expenses that do not exceed the remaining balance; wrap invalid format errors with cause, and print the unchanged balance after failure. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: start with a budget of 100000 kopiykas; read positive expenses that do not exceed the remaining balance; wrap invalid format errors with cause, and print the unchanged balance after failure. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 22. Competition scoring {#v22}

**1. Initial level.** Create a Java console program on JDK 27: read five scores in 0..10; retry an invalid value, and stop without a summary on EOF; discard the minimum/maximum, and print the mean of the three remaining scores. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read five scores in 0..10; retry an invalid value, and stop without a summary on EOF; discard the minimum/maximum, and print the mean of the three remaining scores. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read five scores in 0..10; retry an invalid value, and stop without a summary on EOF; discard the minimum/maximum, and print the mean of the three remaining scores. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 23. Parking payment {#v23}

**1. Initial level.** Create a Java console program on JDK 27: read entry/exit times in HH:mm within one day, with exit no earlier than entry; charge 20 UAH for each started hour, with zero duration free; print the payment. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read entry/exit times in HH:mm within one day, with exit no earlier than entry; charge 20 UAH for each started hour, with zero duration free; print the payment. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read entry/exit times in HH:mm within one day, with exit no earlier than entry; charge 20 UAH for each started hour, with zero duration free; print the payment. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 24. Roman numerals {#v24}

**1. Initial level.** Create a Java console program on JDK 27: read one of I, II, III, IV, V, VI, VII, VIII, IX, X; print 1..10, and reject all other representations with a custom format exception. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read one of I, II, III, IV, V, VI, VII, VIII, IX, X; print 1..10, and reject all other representations with a custom format exception. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read one of I, II, III, IV, V, VI, VII, VIII, IX, X; print 1..10, and reject all other representations with a custom format exception. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 25. Fraction calculator {#v25}

**1. Initial level.** Create a Java console program on JDK 27: read a,b,c,d from -1000 to 1000 with b,d!=0; print the reduced fraction a/b+c/d with a positive denominator; reject zero denominators. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read a,b,c,d from -1000 to 1000 with b,d!=0; print the reduced fraction a/b+c/d with a positive denominator; reject zero denominators. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read a,b,c,d from -1000 to 1000 with b,d!=0; print the reduced fraction a/b+c/d with a positive denominator; reject zero denominators. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 26. Hotel booking {#v26}

**1. Initial level.** Create a Java console program on JDK 27: read ISO check-in/check-out dates and a price in 1..100000 kopiykas per day; check-out must be later by at most 365 days; print the nights and cost, preserving parsing causes. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read ISO check-in/check-out dates and a price in 1..100000 kopiykas per day; check-out must be later by at most 365 days; print the nights and cost, preserving parsing causes. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read ISO check-in/check-out dates and a price in 1..100000 kopiykas per day; check-out must be later by at most 365 days; print the nights and cost, preserving parsing causes. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 27. Electricity meter {#v27}

**1. Initial level.** Create a Java console program on JDK 27: read previous and new integer readings in 0..1000000, with the new one no smaller; use a sample rate of 5 UAH per kWh, and print consumption and the amount. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read previous and new integer readings in 0..1000000, with the new one no smaller; use a sample rate of 5 UAH per kWh, and print consumption and the amount. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read previous and new integer readings in 0..1000000, with the new one no smaller; use a sample rate of 5 UAH per kWh, and print consumption and the amount. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 28. Access control {#v28}

**1. Initial level.** Create a Java console program on JDK 27: use the sample PIN 2468; read exactly 4 ASCII digits, and lock the session after three unsuccessful correctly formatted attempts; print the state without printing the PIN again. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: use the sample PIN 2468; read exactly 4 ASCII digits, and lock the session after three unsuccessful correctly formatted attempts; print the state without printing the PIN again. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: use the sample PIN 2468; read exactly 4 ASCII digits, and lock the session after three unsuccessful correctly formatted attempts; print the state without printing the PIN again. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 29. Software versions {#v29}

**1. Initial level.** Create a Java console program on JDK 27: read two major.minor.patch strings of nonnegative int values without suffixes; compare the numeric triples, reject invalid formats, and print -1, 0, or 1. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read two major.minor.patch strings of nonnegative int values without suffixes; compare the numeric triples, reject invalid formats, and print -1, 0, or 1. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read two major.minor.patch strings of nonnegative int values without suffixes; compare the numeric triples, reject invalid formats, and print -1, 0, or 1. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

### Variant 30. Exam grade sheet {#v30}

**1. Initial level.** Create a Java console program on JDK 27: read name;score lines until EOF, with a nonempty name and a score in 0..100; print accepted lines, the mean, and rejected line numbers with their causes. Implement a domain method with preconditions and a specific standard exception; catch the expected failure at the console boundary.

**2. Basic level.** Create a Java console program on JDK 27: read name;score lines until EOF, with a nonempty name and a score in 0..100; print accepted lines, the mean, and rejected line numbers with their causes. Use a custom domain exception type; preserve cause when wrapping. Test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Java console program on JDK 27: read name;score lines until EOF, with a nonempty name and a score in 0..100; print accepted lines, the mean, and rejected line numbers with their causes. Separate domain methods from the CLI; accept key=value parameters or prompt for them when there are no arguments. Preserve cause and check state after failure; demonstrate one reproducible failure in the debugger. Add `--help` and checks for format, finite numbers, and bounds; print errors to stderr, with codes 0 – success/help, 2 – invalid input, 1 – operational failure. Print an aligned report with a summary. Submit at least five test cases, a README, and local Git history.

## Procedure

1. Define preconditions and expected error types.
2. Separate domain methods from reading and printing.
3. Handle expected failures at the program boundary.
4. Verify that state remains unchanged after failure.
5. Preserve cause when converting an exception.
6. Reproduce one error in the debugger.
7. Submit a test table, a README, and Git history.

