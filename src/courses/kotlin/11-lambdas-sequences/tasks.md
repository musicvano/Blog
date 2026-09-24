---
title: "Tasks"
description: "Topic 11. Lambdas and sequences: task variants"
outline: [2, 3]
sourceHash: "7358330d9e04a161df559a493950cf45410a61841d9463abce069ad1c23539e8"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

Use Kotlin/JVM, JDK 27, explicit types in the functional API, and a defined order of results. Do not hide the loss of duplicates in `associateBy`, and do not run an infinite sequence with a terminal operation without a limit.

## Variants

### Variant 1. Sales analysis {#v1}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for sales analysis. Input: sales records: an ISO date, a product category, an amount in kopiykas. Implement computing sales totals by category. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for sales analysis. Input: sales records: an ISO date, a product category, an amount in kopiykas. Implement computing sales totals by category; monthly totals and sorting by amount descending/name. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for sales analysis. Input: sales records: an ISO date, a product category, an amount in kopiykas. Implement computing sales totals by category; monthly totals and sorting by amount descending/name; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 2. Film library {#v2}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for working with a film library. Input: films: title, year, rating 0..10. Implement selecting films by a minimum rating. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for working with a film library. Input: films: title, year, rating 0..10. Implement selecting films by a minimum rating; a top N ordered by rating descending/year/title. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for working with a film library. Input: films: title, year, rating 0..10. Implement selecting films by a minimum rating; a top N ordered by rating descending/year/title; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 3. Web server log {#v3}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for analyzing a web server log. Input: log records: an ISO time, a request path, an HTTP status 100..599. Implement counting the number of requests for each status. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for analyzing a web server log. Input: log records: an ISO time, a request path, an HTTP status 100..599. Implement counting the number of requests for each status; the most frequent paths of 4xx/5xx errors and their shares. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for analyzing a web server log. Input: log records: an ISO time, a request path, an HTTP status 100..599. Implement counting the number of requests for each status; the most frequent paths of 4xx/5xx errors and their shares; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 4. Basketball statistics {#v4}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for analyzing basketball statistics. Input: player records: name, number of games, points scored. Implement computing average points per game without division by zero. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for analyzing basketball statistics. Input: player records: name, number of games, points scored. Implement computing average points per game without division by zero; partition by a threshold of 10 and a ranking with a tie rule. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for analyzing basketball statistics. Input: player records: name, number of games, points scored. Implement computing average points per game without division by zero; partition by a threshold of 10 and a ranking with a tie rule; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 5. Prime numbers {#v5}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for finding prime numbers. Input: an upper limit 0..1000000 and a count N. Implement a Sequence of primes up to the limit via yield and print the first N. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for finding prime numbers. Input: an upper limit 0..1000000 and a count N. Implement a Sequence of primes up to the limit via yield and print the first N; a counter of checks and a comparison of take(N) with the full list. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for finding prime numbers. Input: an upper limit 0..1000000 and a count N. Implement a Sequence of primes up to the limit via yield and print the first N; a counter of checks and a comparison of take(N) with the full list; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 6. Employees {#v6}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for tracking employees. Input: employee records: id, name, department, salary in kopiykas. Implement an index of employees by id via associateBy after checking that ids are unique. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for tracking employees. Input: employee records: id, name, department, salary in kopiykas. Implement an index of employees by id via associateBy after checking that ids are unique; groupBy department and totals/maximums without losing duplicate names. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for tracking employees. Input: employee records: id, name, department, salary in kopiykas. Implement an index of employees by id via associateBy after checking that ids are unique; groupBy department and totals/maximums without losing duplicate names; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 7. Student ranking {#v7}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for building a student ranking. Input: student records: id, name, a list of grades 0..100. Implement computing average scores via fold with an explicit empty case. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for building a student ranking. Input: student records: id, name, a list of grades 0..100. Implement computing average scores via fold with an explicit empty case; sorting by average descending/name/id and the top N. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for building a student ranking. Input: student records: id, name, a list of grades 0..100. Implement computing average scores via fold with an explicit empty case; sorting by average descending/name/id and the top N; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 8. Weather data {#v8}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for analyzing weather data. Input: a sequence of finite temperatures and a window size k&gt;0. Implement computing the average temperatures of full windows via windowed(k). Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for analyzing weather data. Input: a sequence of finite temperatures and a window size k&gt;0. Implement computing the average temperatures of full windows via windowed(k); a comparison of step 1 and step k, and an explicit policy for an incomplete tail. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for analyzing weather data. Input: a sequence of finite temperatures and a window size k&gt;0. Implement computing the average temperatures of full windows via windowed(k); a comparison of step 1 and step k, and an explicit policy for an incomplete tail; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 9. Text processing {#v9}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for processing a string with a chain of transformations. Input: a string and the names of the transformations trim/lowercase/reverse. Implement composing the selected functions in the input order and printing the transformed string. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for processing a string with a chain of transformations. Input: a string and the names of the transformations trim/lowercase/reverse. Implement composing the selected functions in the input order and printing the transformed string; a higher-order function returns a ready-made transformer; test non-commutativity. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for processing a string with a chain of transformations. Input: a string and the names of the transformations trim/lowercase/reverse. Implement composing the selected functions in the input order and printing the transformed string; a higher-order function returns a ready-made transformer; test non-commutativity; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 10. Bank transactions {#v10}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for analyzing bank transactions. Input: transactions: an account, a minute of the day 0..1439, a positive amount. Implement selecting transactions with an amount above a given educational threshold. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for analyzing bank transactions. Input: transactions: an account, a minute of the day 0..1439, a positive amount. Implement selecting transactions with an amount above a given educational threshold; grouping by account and total per hour; conclusions only about the given rule. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for analyzing bank transactions. Input: transactions: an account, a minute of the day 0..1439, a positive amount. Implement selecting transactions with an amount above a given educational threshold; grouping by account and total per hour; conclusions only about the given rule; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 11. Flight schedule {#v11}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for analyzing a flight schedule. Input: lists of route cities and arrival times in minutes of equal length. Implement combining the lists into city–time pairs via zip after checking the lengths. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for analyzing a flight schedule. Input: lists of route cities and arrival times in minutes of equal length. Implement combining the lists into city–time pairs via zip after checking the lengths; connections of 15 to 120 min in a shared city. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for analyzing a flight schedule. Input: lists of route cities and arrival times in minutes of equal length. Implement combining the lists into city–time pairs via zip after checking the lengths; connections of 15 to 120 min in a shared city; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 12. Meal plan {#v12}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for planning a meal plan. Input: dishes (name, nominal kcal), a kcal range, and a kcal budget. Implement selecting dishes whose calorie content falls within the given range. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for planning a meal plan. Input: dishes (name, nominal kcal), a kcal range, and a kcal budget. Implement selecting dishes whose calorie content falls within the given range; a sequence of pairs of different dishes within the budget; the data is educational, with no recommendations. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for planning a meal plan. Input: dishes (name, nominal kcal), a kcal range, and a kcal budget. Implement selecting dishes whose calorie content falls within the given range; a sequence of pairs of different dishes within the budget; the data is educational, with no recommendations; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 13. Fibonacci numbers {#v13}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for generating Fibonacci numbers. Input: N from 0 to 90. Implement generateSequence of pairs of consecutive Long Fibonacci numbers and print the numbers F0..FN. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for generating Fibonacci numbers. Input: N from 0 to 90. Implement generateSequence of pairs of consecutive Long Fibonacci numbers and print the numbers F0..FN; takeWhile by a limit with explicit overflow protection. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for generating Fibonacci numbers. Input: N from 0 to 90. Implement generateSequence of pairs of consecutive Long Fibonacci numbers and print the numbers F0..FN; takeWhile by a limit with explicit overflow protection; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 14. Promo codes {#v14}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for applying promo codes. Input: an amount in kopiykas and a promo code none/ten/fixed. Implement a Map of discount functions 0%, 10%, or 100 kopiykas and print the amount after the discount. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for applying promo codes. Input: an amount in kopiykas and a promo code none/ten/fixed. Implement a Map of discount functions 0%, 10%, or 100 kopiykas and print the amount after the discount; composition of strategies with an ordering rule and a lower bound of 0. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for applying promo codes. Input: an amount in kopiykas and a promo code none/ten/fixed. Implement a Map of discount functions 0%, 10%, or 100 kopiykas and print the amount after the discount; composition of strategies with an ordering rule and a lower bound of 0; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 15. Library {#v15}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for analyzing a library collection. Input: books: title, a list of authors, a list of genres. Implement obtaining the unique authors via flatMap. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for analyzing a library collection. Input: books: title, a list of authors, a list of genres. Implement obtaining the unique authors via flatMap; genre frequencies via groupingBy and a stable top. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for analyzing a library collection. Input: books: title, a list of authors, a list of genres. Implement obtaining the unique authors via flatMap; genre frequencies via groupingBy and a stable top; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 16. IoT sensors {#v16}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for processing IoT sensor readings. Input: finite readings and a batch size k&gt;0. Implement splitting the readings into batches via chunked(k) and the batch averages. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for processing IoT sensor readings. Input: finite readings and a batch size k&gt;0. Implement splitting the readings into batches via chunked(k) and the batch averages; batches with a range above a threshold and an incomplete last batch. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for processing IoT sensor readings. Input: finite readings and a batch size k&gt;0. Implement splitting the readings into batches via chunked(k) and the batch averages; batches with a range above a threshold and an incomplete last batch; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 17. Travel budget {#v17}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for tracking a travel budget. Input: a budget and expenses: category, amount in kopiykas. Implement totals by category and finding the most expensive expense via maxByOrNull. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for tracking a travel budget. Input: a budget and expenses: category, amount in kopiykas. Implement totals by category and finding the most expensive expense via maxByOrNull; the remaining budget and category shares without division by zero. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for tracking a travel budget. Input: a budget and expenses: category, amount in kopiykas. Implement totals by category and finding the most expensive expense via maxByOrNull; the remaining budget and category shares without division by zero; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 18. Validation rules {#v18}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for checking a form against validation rules. Input: form fields: name, age 0..120, email. Implement a List of rule functions that return violation messages. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for checking a form against validation rules. Input: form fields: name, age 0..120, email. Implement a List of rule functions that return violation messages; first-error/all-errors modes and a call counter. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for checking a form against validation rules. Input: form fields: name, age 0..120, email. Implement a List of rule functions that return violation messages; first-error/all-errors modes and a call counter; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 19. Game inventory {#v19}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for managing a game inventory. Input: items: id, name, mass, price. Implement selecting items whose mass does not exceed a given maximum. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for managing a game inventory. Input: items: id, name, mass, price. Implement selecting items whose mass does not exceed a given maximum; sortedWith by price descending/mass/id. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for managing a game inventory. Input: items: id, name, mass, price. Implement selecting items whose mass does not exceed a given maximum; sortedWith by price descending/mass/id; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 20. Exam session {#v20}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for analyzing an exam session. Input: results: student, subject, grade 0..100. Implement grouping the results by subject via groupBy and the average scores. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for analyzing an exam session. Input: results: student, subject, grade 0..100. Implement grouping the results by subject via groupBy and the average scores; associate the results after checking that each student/subject pair is unique. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for analyzing an exam session. Input: results: student, subject, grade 0..100. Implement grouping the results by subject via groupBy and the average scores; associate the results after checking that each student/subject pair is unique; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 21. Car market {#v21}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for searching for cars on a car market. Input: listings: make, year, price. Implement predicates for year and price limits and filtering the listings with them. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for searching for cars on a car market. Input: listings: make, year, price. Implement predicates for year and price limits and filtering the listings with them; a function composing optional filters via all. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for searching for cars on a car market. Input: listings: make, year, price. Implement predicates for year and price limits and filtering the listings with them; a function composing optional filters via all; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 22. Music charts {#v22}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for comparing two music charts. Input: two weekly charts as ordered lists of unique track ids. Implement determining track positions via withIndex and associate. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for comparing two music charts. Input: two weekly charts as ordered lists of unique track ids. Implement determining track positions via withIndex and associate; climbers/fallers/new entries/dropouts in a defined order. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for comparing two music charts. Input: two weekly charts as ordered lists of unique track ids. Implement determining track positions via withIndex and associate; climbers/fallers/new entries/dropouts in a defined order; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 23. Survey {#v23}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for counting survey results. Input: answers A/B/C. Implement counting each answer via groupingBy().eachCount. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for counting survey results. Input: answers A/B/C. Implement counting each answer via groupingBy().eachCount; a Markdown histogram with a given scale and an empty report. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for counting survey results. Input: answers A/B/C. Implement counting each answer via groupingBy().eachCount; a Markdown histogram with a given scale and an empty report; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 24. Taxi orders {#v24}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for analyzing taxi orders. Input: orders: district, hour 0..23, price in kopiykas. Implement grouping orders by district with a count and a total. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for analyzing taxi orders. Input: orders: district, hour 0..23, price in kopiykas. Implement grouping orders by district with a count and a total; nested totals by district/hour and the most expensive record. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for analyzing taxi orders. Input: orders: district, hour 0..23, price in kopiykas. Implement grouping orders by district with a count and a total; nested totals by district/hour and the most expensive record; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 25. Event builder {#v25}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for describing events via a DSL builder. Input: an event name, a start and an end in minutes. Implement a DSL Event.() -&gt; Unit with time validation. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for describing events via a DSL builder. Input: an event name, a start and an end in minutes. Implement a DSL Event.() -&gt; Unit with time validation; a list of events and detection of overlapping half-open intervals. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for describing events via a DSL builder. Input: an event name, a start and an end in minutes. Implement a DSL Event.() -&gt; Unit with time validation; a list of events and detection of overlapping half-open intervals; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 26. Consultation schedule {#v26}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for creating a consultation schedule. Input: lists of teachers, days, and hours. Implement lazy generation of teacher–day–hour combinations via sequence. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for creating a consultation schedule. Input: lists of teachers, days, and hours. Implement lazy generation of teacher–day–hour combinations via sequence; selecting available slots and take(N) with a candidate counter. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for creating a consultation schedule. Input: lists of teachers, days, and hours. Implement lazy generation of teacher–day–hour combinations via sequence; selecting available slots and take(N) with a candidate counter; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 27. Chess tournament {#v27}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for organizing a chess tournament. Input: unique participant names. Implement a sequence of all unordered pairs of participants without self-pairs. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for organizing a chess tournament. Input: unique participant names. Implement a sequence of all unordered pairs of participants without self-pairs; results 1/0.5/0 and a table by points/name. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for organizing a chess tournament. Input: unique participant names. Implement a sequence of all unordered pairs of participants without self-pairs; results 1/0.5/0 and a table by points/name; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 28. Memoization {#v28}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for demonstrating memoization. Input: integer arguments 0..30. Implement a higher-order function that caches the results of computing a square. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for demonstrating memoization. Input: integer arguments 0..30. Implement a higher-order function that caches the results of computing a square; a counter of actual computations and a caching policy for a nullable result. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for demonstrating memoization. Input: integer arguments 0..30. Implement a higher-order function that caches the results of computing a square; a counter of actual computations and a caching policy for a nullable result; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 29. Energy consumption {#v29}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for analyzing energy consumption. Input: readings: an hour 0..23, a non-negative finite consumption value. Implement finding the peak consumption hours via maxByOrNull. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for analyzing energy consumption. Input: readings: an hour 0..23, a non-negative finite consumption value. Implement finding the peak consumption hours via maxByOrNull; a windowed moving average and comparison with a threshold. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for analyzing energy consumption. Input: readings: an hour 0..23, a non-negative finite consumption value. Implement finding the peak consumption hours via maxByOrNull; a windowed moving average and comparison with a threshold; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 30. Markdown report {#v30}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for generating a report as a Markdown table. Input: column names and rows of equal width. Implement a table-building DSL with a lambda with a receiver and print the Markdown text. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for generating a report as a Markdown table. Input: column names and rows of equal width. Implement a table-building DSL with a lambda with a receiver and print the Markdown text; escaping the vertical bar and line breaks, and checking an empty table. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for generating a report as a Markdown table. Input: column names and rows of equal width. Implement a table-building DSL with a lambda with a receiver and print the Markdown text; escaping the vertical bar and line breaks, and checking an empty table; extract a generic higher-order function and compare lazy and eager traversal on the same data set. Separate input from the pure transformation; print the result or the reason for rejection. Test an empty set, a boundary, and invalid data. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

## Procedure

1. Define the types of the input, the output, and the function parameters.
2. Separate pure transformations from reading and printing.
3. Test an empty set, a tie, repeated keys, and invalid input.
4. For a Sequence, count the transformation calls and explain when it runs.
5. For a closure, test the independence of two factory instances.
6. Provide the actual results of five checks, the code, and a README.
7. During the presentation, replace one lambda with a function reference and explain its type.
