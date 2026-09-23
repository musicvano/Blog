---
title: "Tasks"
description: "Topic 4. Exceptions, Result, and debugging: task variants"
outline: [2, 3]
sourceHash: "79a21d4e5c8c563802fb686b9824555595494b1f7fc8fb9ab4fb2defc17c93da"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Calculator {#v1}

**1. Initial level.** Create a Kotlin console program: read an a op b string, with finite a/b from −1000 to 1000 and op limited to +,-,\*,/; print the result, and reject division by 0. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read an a op b string, with finite a/b from −1000 to 1000 and op limited to +,-,\*,/; print the result, and reject division by 0. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read an a op b string, with finite a/b from −1000 to 1000 and op limited to +,-,\*,/; print the result, and reject division by 0. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 2. Settings {#v2}

**1. Initial level.** Create a Kotlin console program: read a limit=number string; allow only the key limit and an integer in 1–100, and print the accepted value. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read a limit=number string; allow only the key limit and an integer in 1–100, and print the accepted value. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read a limit=number string; allow only the key limit and an integer in 1–100, and print the accepted value. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 3. Transfer {#v3}

**1. Initial level.** Create a Kotlin console program: read from,to,amount as integer kopiykas in 0–1000000; require amount&gt;0 and &lt;=from, to+amount&lt;=1000000; return both new balances only after validation. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read from,to,amount as integer kopiykas in 0–1000000; require amount&gt;0 and &lt;=from, to+amount&lt;=1000000; return both new balances only after validation. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read from,to,amount as integer kopiykas in 0–1000000; require amount&gt;0 and &lt;=from, to+amount&lt;=1000000; return both new balances only after validation. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 4. Units {#v4}

**1. Initial level.** Create a Kotlin console program: read a number in 0–1000000 and a unit m, cm, or km; convert to meters, and reject unknown units. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read a number in 0–1000000 and a unit m, cm, or km; convert to meters, and reject unknown units. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read a number in 0–1000000 and a unit m, cm, or km; convert to meters, and reject unknown units. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 5. Seats {#v5}

**1. Initial level.** Create a Kotlin console program: define 20 seats, with 3 and 7 occupied; read a number in 1–20, and print confirmation only for an available seat. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: define 20 seats, with 3 and 7 occupied; read a number in 1–20, and print confirmation only for an available seat. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: define 20 seats, with 3 and 7 occupied; read a number in 1–20, and print confirmation only for an available seat. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 6. Dates {#v6}

**1. Initial level.** Create a Kotlin console program: read an ISO yyyy-MM-dd date; validate it against the calendar using java.time.LocalDate, and print the day of the year. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read an ISO yyyy-MM-dd date; validate it against the calendar using java.time.LocalDate, and print the day of the year. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read an ISO yyyy-MM-dd date; validate it against the calendar using java.time.LocalDate, and print the day of the year. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 7. Inventory {#v7}

**1. Initial level.** Create a Kotlin console program: start with a stock of 100 units; read a positive withdrawal in 1–1000, check that stock is sufficient, and print the new stock. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: start with a stock of 100 units; read a positive withdrawal in 1–1000, check that stock is sufficient, and print the new stock. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: start with a stock of 100 units; read a positive withdrawal in 1–1000, check that stock is sufficient, and print the new stock. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 8. Sensor {#v8}

**1. Initial level.** Create a Kotlin console program: read a finite temperature in −50..60; return a Result with the temperature or the reason for rejection. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read a finite temperature in −50..60; return a Result with the temperature or the reason for rejection. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read a finite temperature in −50..60; return a Result with the temperature or the reason for rejection. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 9. Registration {#v9}

**1. Initial level.** Create a Kotlin console program: read a login of Latin letters/digits with length 3–20 and an integer age in 18–120; print the accepted login or all violated rules. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read a login of Latin letters/digits with length 3–20 and an integer age in 18–120; print the accepted login or all violated rules. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read a login of Latin letters/digits with length 3–20 and an integer age in 18–120; print the accepted login or all violated rules. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 10. Payment {#v10}

**1. Initial level.** Create a Kotlin console program: read an amount in 1–1000000 and an integer term in 1–120; calculate an equal payment without interest, and reject invalid input. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read an amount in 1–1000000 and an integer term in 1–120; calculate an equal payment without interest, and reject invalid input. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read an amount in 1–1000000 and an integer term in 1–120; calculate an equal payment without interest, and reject invalid input. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 11. Coordinates {#v11}

**1. Initial level.** Create a Kotlin console program: read latitude,longitude as finite numbers with bounds −90..90 and −180..180; print the normalized pair. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read latitude,longitude as finite numbers with bounds −90..90 and −180..180; print the normalized pair. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read latitude,longitude as finite numbers with bounds −90..90 and −180..180; print the normalized pair. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 12. Root {#v12}

**1. Initial level.** Create a Kotlin console program: read x in 0–1000000; calculate sqrt using Newton's method with tolerance 1e-8 and at most 100 steps; 0 returns 0, and failure to converge is an error. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read x in 0–1000000; calculate sqrt using Newton's method with tolerance 1e-8 and at most 100 steps; 0 returns 0, and failure to converge is an error. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read x in 0–1000000; calculate sqrt using Newton's method with tolerance 1e-8 and at most 100 steps; 0 returns 0, and failure to converge is an error. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 13. Time {#v13}

**1. Initial level.** Create a Kotlin console program: read start and end times in HH:mm within one day; the end must not precede the start; print the minutes. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read start and end times in HH:mm within one day; the end must not precede the start; print the minutes. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read start and end times in HH:mm within one day; the end must not precede the start; print the minutes. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 14. Rectangle {#v14}

**1. Initial level.** Create a Kotlin console program: read two finite rectangle sides in 0.1–10000; the function checks its contract using require and returns the rectangle's area. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read two finite rectangle sides in 0.1–10000; the function checks its contract using require and returns the rectangle's area. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read two finite rectangle sides in 0.1–10000; the function checks its contract using require and returns the rectangle's area. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 15. Card {#v15}

**1. Initial level.** Create a Kotlin console program: set a balance of 100000 kopiykas and an operation limit of 20000 kopiykas; read a positive amount, and print the new balance after checking both bounds. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: set a balance of 100000 kopiykas and an operation limit of 20000 kopiykas; read a positive amount, and print the new balance after checking both bounds. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: set a balance of 100000 kopiykas and an operation limit of 20000 kopiykas; read a positive amount, and print the new balance after checking both bounds. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 16. Exact sum {#v16}

**1. Initial level.** Create a Kotlin console program: read two Long values; perform Math.addExact and distinguish overflow from invalid format. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read two Long values; perform Math.addExact and distinguish overflow from invalid format. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read two Long values; perform Math.addExact and distinguish overflow from invalid format. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 17. Roman numerals {#v17}

**1. Initial level.** Create a Kotlin console program: read I, V, X, L, C, D, or M; print 1, 5, 10, 50, 100, 500, or 1000; reject any other string. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read I, V, X, L, C, D, or M; print 1, 5, 10, 50, 100, 500, or 1000; reject any other string. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read I, V, X, L, C, D, or M; print 1, 5, 10, 50, 100, 500, or 1000; reject any other string. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 18. Appointment {#v18}

**1. Initial level.** Create a Kotlin console program: read an integer hour in 9–17; 10 and 14 are booked; print confirmation only for a free hour, leaving state unchanged on error. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read an integer hour in 9–17; 10 and 14 are booked; print confirmation only for a free hour, leaving state unchanged on error. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read an integer hour in 9–17; 10 and 14 are booked; print confirmation only for a free hour, leaving state unchanged on error. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 19. CLI {#v19}

**1. Initial level.** Create a Kotlin console program: read arguments `--count N`, with N in 1–100; reject unknown flags, missing values, or extra values; print N. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read arguments `--count N`, with N in 1–100; reject unknown flags, missing values, or extra values; print N. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read arguments `--count N`, with N in 1–100; reject unknown flags, missing values, or extra values; print N. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 20. Meter {#v20}

**1. Initial level.** Create a Kotlin console program: read old and new meter readings as finite numbers in 0–100000; the new reading must not be below the old one; print the difference, which is the consumed volume. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read old and new meter readings as finite numbers in 0–100000; the new reading must not be below the old one; print the difference, which is the consumed volume. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read old and new meter readings as finite numbers in 0–100000; the new reading must not be below the old one; print the difference, which is the consumed volume. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 21. Currencies {#v21}

**1. Initial level.** Create a Kotlin console program: read an amount in 0–100000 and currency UAH/EUR; use a sample rate of 45 UAH/EUR; return a Result with the amount in hryvnias. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read an amount in 0–100000 and currency UAH/EUR; use a sample rate of 45 UAH/EUR; return a Result with the amount in hryvnias. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read an amount in 0–100000 and currency UAH/EUR; use a sample rate of 45 UAH/EUR; return a Result with the amount in hryvnias. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 22. Scores {#v22}

**1. Initial level.** Create a Kotlin console program: read lines until stop, with scores in 0–100; count and skip errors, print the attempt count in finally, and print a mean only for nonempty data. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read lines until stop, with scores in 0–100; count and skip errors, print the attempt count in finally, and print a mean only for nonempty data. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read lines until stop, with scores in 0–100; count and skip errors, print the attempt count in finally, and print a mean only for nonempty data. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 23. Character health {#v23}

**1. Initial level.** Create a Kotlin console program: set health to 100 units; read damage in 0–1000; return max(0,100-damage), with invalid input leaving health unchanged. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: set health to 100 units; read damage in 0–1000; return max(0,100-damage), with invalid input leaving health unchanged. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: set health to 100 units; read damage in 0–1000; return max(0,100-damage), with invalid input leaving health unchanged. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 24. Flight {#v24}

**1. Initial level.** Create a Kotlin console program: read a code of two uppercase Latin letters and three digits; validate the entire string, and print the accepted code. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read a code of two uppercase Latin letters and three digits; validate the entire string, and print the accepted code. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read a code of two uppercase Latin letters and three digits; validate the entire string, and print the accepted code. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 25. In-memory file {#v25}

**1. Initial level.** Create a Kotlin console program: read text containing lines of integers through StringReader; use must close the resource, and an invalid line must report the error's line number without a partial sum. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read text containing lines of integers through StringReader; use must close the resource, and an invalid line must report the error's line number without a partial sum. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read text containing lines of integers through StringReader; use must close the resource, and an invalid line must report the error's line number without a partial sum. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 26. Average {#v26}

**1. Initial level.** Create a Kotlin console program: read three finite numbers in −1000..1000; return the mean of positive values or null if there are none. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read three finite numbers in −1000..1000; return the mean of positive values or null if there are none. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read three finite numbers in −1000..1000; return the mean of positive values or null if there are none. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 27. Index {#v27}

**1. Initial level.** Create a Kotlin console program: set the string to Kotlin; read an index in 0–5 and return the character, rejecting an invalid index with a custom exception. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: set the string to Kotlin; read an index in 0–5 and return the character, rejecting an invalid index with a custom exception. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: set the string to Kotlin; read an index in 0–5 and return the character, rejecting an invalid index with a custom exception. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 28. Password {#v28}

**1. Initial level.** Create a Kotlin console program: read a synthetic string of 8–30 characters; check for a Latin letter and a digit; do not print the password itself in a message. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read a synthetic string of 8–30 characters; check for a Latin letter and a digit; do not print the password itself in a message. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read a synthetic string of 8–30 characters; check for a Latin letter and a digit; do not print the password itself in a message. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 29. Range {#v29}

**1. Initial level.** Create a Kotlin console program: read integers a,b in −10000..10000, a&lt;=b; print the sum of the inclusive range in Long. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read integers a,b in −10000..10000, a&lt;=b; print the sum of the inclusive range in Long. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read integers a,b in −10000..10000, a&lt;=b; print the sum of the inclusive range in Long. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 30. Error menu {#v30}

**1. Initial level.** Create a Kotlin console program: read commands divide a b or exit, with integers a,b in −1000..1000 and b!=0; reject unknown commands, and continue until exit/EOF. Implement a domain function with an explicit contract, handle expected exceptions separately from input, and do not print success after an error.

**2. Basic level.** Create a Kotlin console program: read commands divide a b or exit, with integers a,b in −1000..1000 and b!=0; reject unknown commands, and continue until exit/EOF. Describe the domain error with a custom type and preserve cause when wrapping; test normal, boundary, and invalid input, and verify that state remains unchanged after failure.

**3. Advanced level.** Create a Kotlin console program: read commands divide a b or exit, with integers a,b in −1000..1000 and b!=0; reject unknown commands, and continue until exit/EOF. Return the domain operation's result as Result and handle it explicitly through fold; do not catch the entire program with a single catch Throwable. For the CLI, an error produces stderr and code 2, while success produces code 0. Add at least five checks, reproduce one failure in the debugger, and explain the stack and state. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

## Procedure

1. Write down the normal result and error contract.
2. Separate the domain function from input and process termination.
3. Use narrow handlers and clear messages.
4. Verify that state remains unchanged after a failed operation.
5. Reproduce one failure and explain the stack and state in the debugger.
6. Add a check that detects the logic error you found.
7. Submit code, a scenario table, exit codes, and a conclusion.

