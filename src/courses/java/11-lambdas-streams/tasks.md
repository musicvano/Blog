---
title: "Tasks"
description: "Topic 11. Lambdas and the Stream API: task variants"
outline: [2, 3]
sourceHash: "c8f47ea98ac501f7f9a3b9238e800cda7ce47f3f8aa106315e2b4f02d639ffc0"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

State the policy for an empty set, equal keys, and invalid lines before writing the pipeline. Do not accumulate the result through side effects in an external list.

## Variants

### Variant 1. Sales by region {#v1}

**1. Initial level.** Create a complete Java program on JDK 27. Enter a region and a sale amount in cents; group the amounts with groupingBy. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter a region and a sale amount in cents; group the amounts with groupingBy; print the top 3 regions and the average order amount. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter a region and a sale amount in cents; group the amounts with groupingBy; print the top 3 regions and the average order amount; support an ISO date filter and break ties by name. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 2. A web log {#v2}

**1. Initial level.** Create a complete Java program on JDK 27. Enter an hour 0..23 and an HTTP status code 100..599; count the codes. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter an hour 0..23 and an HTTP status code 100..599; count the codes; group the number of 400..599 errors by hour. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter an hour 0..23 and an HTTP status code 100..599; count the codes; group the number of 400..599 errors by hour; show all 24 hours, including those with zero, and the error share. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 3. Academic performance {#v3}

**1. Initial level.** Create a complete Java program on JDK 27. Enter students and scores 0..100; a Predicate selects scores of 60 and above. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter students and scores 0..100; a Predicate selects scores of 60 and above; partitioningBy separates passing students from the rest. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter students and scores 0..100; a Predicate selects scores of 60 and above; partitioningBy separates passing students from the rest; summarize the groups and rank students by score and id. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 4. A movie catalog {#v4}

**1. Initial level.** Create a complete Java program on JDK 27. Enter a title, a year, and a rating 0..10; a Predicate composition filters by year and rating. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter a title, a year, and a rating 0..10; a Predicate composition filters by year and rating; sort by rating, then by title. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter a title, a year, and a rating 0..10; a Predicate composition filters by year and rating; sort by rating, then by title; add independent optional filters and an Optional for the best one. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 5. Weather by month {#v5}

**1. Initial level.** Create a complete Java program on JDK 27. Enter an ISO date and a finite temperature; groupingBy groups by YearMonth. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter an ISO date and a finite temperature; groupingBy groups by YearMonth; show the minimum, maximum, and average. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter an ISO date and a finite temperature; groupingBy groups by YearMonth; show the minimum, maximum, and average; reject repeated dates and separately show months without data in the given range. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 6. Training transactions {#v6}

**1. Initial level.** Create a complete Java program on JDK 27. Enter an id and an amount in cents; a Predicate checks an explicitly specified threshold. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter an id and an amount in cents; a Predicate checks an explicitly specified threshold; separate transactions by sign and total them. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter an id and an amount in cents; a Predicate checks an explicitly specified threshold; separate transactions by sign and total them; apply several fictional rules with explanations; give no financial advice. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 7. A book catalog {#v7}

**1. Initial level.** Create a complete Java program on JDK 27. Enter a title, an author, and a year; sort with comparators. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter a title, an author, and a year; sort with comparators; group titles by author. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter a title, an author, and a year; sort with comparators; group titles by author; find each author's newest book, breaking ties by title. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 8. A medal table {#v8}

**1. Initial level.** Create a complete Java program on JDK 27. Enter a country and a medal type enum; groupingBy counts the types. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter a country and a medal type enum; groupingBy counts the types; sort by gold, silver, and bronze. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter a country and a medal type enum; groupingBy counts the types; sort by gold, silver, and bronze; show countries with zero medals of some type and test ties. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 9. Running results {#v9}

**1. Initial level.** Create a complete Java program on JDK 27. Enter positive integer seconds; IntSummaryStatistics builds the report. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter positive integer seconds; IntSummaryStatistics builds the report; filter results within a given range. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter positive integer seconds; IntSummaryStatistics builds the report; filter results within a given range; add top-k and an explicit label for an empty average. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 10. Online courses {#v10}

**1. Initial level.** Create a complete Java program on JDK 27. Enter a learner and a list of completed courses; flatMap extracts the titles. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter a learner and a list of completed courses; flatMap extracts the titles; count the popularity of unique courses per learner. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter a learner and a list of completed courses; flatMap extracts the titles; count the popularity of unique courses per learner; find courses common to all nonempty lists and define the empty case. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 11. Salary medians {#v11}

**1. Initial level.** Create a complete Java program on JDK 27. Enter a department and a nonnegative salary in cents; group the departments. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter a department and a nonnegative salary in cents; group the departments; sort the amounts and compute the median; for an even n, the average of the two middle values. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter a department and a nonnegative salary in cents; group the departments; sort the amounts and compute the median; for an even n, the average of the two middle values; use exact fractional arithmetic and show each department's count and median. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 12. Food orders {#v12}

**1. Initial level.** Create a complete Java program on JDK 27. Enter orders with lists of name–quantity items; flatMap flattens them. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter orders with lists of name–quantity items; flatMap flattens them; toMap with a merge function totals the quantities. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter orders with lists of name–quantity items; flatMap flattens them; toMap with a merge function totals the quantities; show top-k and reject zero and negative quantities. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 13. Word frequencies {#v13}

**1. Initial level.** Create a complete Java program on JDK 27. Enter several lines in Latin letters; flatMap and toMap count the words. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter several lines in Latin letters; flatMap and toMap count the words; sort by frequency and by word. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter several lines in Latin letters; flatMap and toMap count the words; sort by frequency and by word; add a stop-word list and total counts before and after the filter. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 14. Trip durations {#v14}

**1. Initial level.** Create a complete Java program on JDK 27. Enter a route and positive minutes; groupingBy collects the statistics. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter a route and positive minutes; groupingBy collects the statistics; show routes whose average exceeds a given threshold. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter a route and positive minutes; groupingBy collects the statistics; show routes whose average exceeds a given threshold; handle a time filter and empty groups without sentinel min/max values. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 15. An order pipeline {#v15}

**1. Initial level.** Create a complete Java program on JDK 27. Enter a status and an amount in cents; filter keeps PAID. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter a status and an amount in cents; filter keeps PAID; map converts to report lines and joining builds the text. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter a status and an amount in cents; filter keeps PAID; map converts to report lines and joining builds the text; compute the total and the paid share without reusing a stream. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 16. Sensor windows {#v16}

**1. Initial level.** Create a complete Java program on JDK 27. Enter integer measurements and a positive size; Gatherers.windowSliding computes averages. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter integer measurements and a positive size; Gatherers.windowSliding computes averages; explicitly choose a policy for a short source: one incomplete window or discarding. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter integer measurements and a positive size; Gatherers.windowSliding computes averages; explicitly choose a policy for a short source: one incomplete window or discarding; compare with windowFixed and test empty, short, and exact sizes. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 17. Car prices {#v17}

**1. Initial level.** Create a complete Java program on JDK 27. Enter a make, a year, and a price in cents; a composition of filters selects cars. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter a make, a year, and a price in cents; a composition of filters selects cars; find the cheapest one for each make. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter a make, a year, and a price in cents; a composition of filters selects cars; find the cheapest one for each make; add top-k by price and define the order of equal prices. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 18. Games by genre {#v18}

**1. Initial level.** Create a complete Java program on JDK 27. Enter a game, a list of genres, and a rating; flatMap creates genre–game pairs. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter a game, a list of genres, and a rating; flatMap creates genre–game pairs; group average ratings by genre. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter a game, a list of genres, and a rating; flatMap creates genre–game pairs; group average ratings by genre; do not count a repeated genre of the same game twice, and show the best game. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 19. Flight delays {#v19}

**1. Initial level.** Create a complete Java program on JDK 27. Enter an airport and integer delay minutes; groupingBy computes the average. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter an airport and integer delay minutes; groupingBy computes the average; partitioningBy separates positive delays from the rest. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter an airport and integer delay minutes; groupingBy computes the average; partitioningBy separates positive delays from the rest; show the share of delayed flights and the top-k airports by average. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 20. A fictional age registry {#v20}

**1. Initial level.** Create a complete Java program on JDK 27. Enter only fictional ids and ages 0..120; groupingBy groups by the intervals 0..17, 18..64, 65..120. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter only fictional ids and ages 0..120; groupingBy groups by the intervals 0..17, 18..64, 65..120; count each group and the total. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter only fictional ids and ages 0..120; groupingBy groups by the intervals 0..17, 18..64, 65..120; count each group and the total; add filters without any medical conclusions and test the boundaries 17, 18, 64, 65. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 21. Training taxes {#v21}

**1. Initial level.** Create a complete Java program on JDK 27. Enter income in cents and an explicitly specified rate of 0..100 percent; map computes the training payment. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter income in cents and an explicitly specified rate of 0..100 percent; map computes the training payment; group the amounts by a given category. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter income in cents and an explicitly specified rate of 0..100 percent; map computes the training payment; group the amounts by a given category; fix the rounding rule to the cent and do not refer to real legislation. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 22. An activity diary {#v22}

**1. Initial level.** Create a complete Java program on JDK 27. Enter an ISO date and a nonnegative step count; mapToLong computes the total. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter an ISO date and a nonnegative step count; mapToLong computes the total; group by week with an explicit ISO rule. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter an ISO date and a nonnegative step count; mapToLong computes the total; group by week with an explicit ISO rule; show skipped days as missing, not as zero measurements; no medical advice. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 23. Housing prices {#v23}

**1. Initial level.** Create a complete Java program on JDK 27. Enter a district, a positive area, and a price in cents; map computes the price per square meter. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter a district, a positive area, and a price in cents; map computes the price per square meter; group the averages by district. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter a district, a positive area, and a price in cents; map computes the price per square meter; group the averages by district; compare the average of individual prices with the total price divided by the total area. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 24. Movie theater occupancy {#v24}

**1. Initial level.** Create a complete Java program on JDK 27. Enter a showing, a capacity, and the seats sold; compute the share. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter a showing, a capacity, and the seats sold; compute the share; group total capacity and sales by movie. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter a showing, a capacity, and the seats sold; compute the share; group total capacity and sales by movie; rank by weighted occupancy and reject sales above capacity. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 25. Training recipes {#v25}

**1. Initial level.** Create a complete Java program on JDK 27. Enter fictional items as mass–nominal energy per 100 units; mapToDouble computes the total. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter fictional items as mass–nominal energy per 100 units; mapToDouble computes the total; group by recipe. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter fictional items as mass–nominal energy per 100 units; mapToDouble computes the total; group by recipe; check finiteness and ranges; do not produce dietary recommendations. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 26. Hotel reviews {#v26}

**1. Initial level.** Create a complete Java program on JDK 27. Enter a hotel and a score 1..5; groupingBy computes the average. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter a hotel and a score 1..5; groupingBy computes the average; show only hotels with a minimum number of reviews. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter a hotel and a score 1..5; groupingBy computes the average; show only hotels with a minimum number of reviews; sort by average, count, and name, and test ties. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 27. Energy by hour {#v27}

**1. Initial level.** Create a complete Java program on JDK 27. Enter an hour 0..23 and a finite nonnegative consumption; toMap with merging computes totals. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter an hour 0..23 and a finite nonnegative consumption; toMap with merging computes totals; show peak hours and the daily total. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter an hour 0..23 and a finite nonnegative consumption; toMap with merging computes totals; show peak hours and the daily total; add a moving average only for consecutive hours, handling gaps explicitly. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 28. Teaching workload {#v28}

**1. Initial level.** Create a complete Java program on JDK 27. Enter a teacher, a course, and positive hours; groupingBy computes totals. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter a teacher, a course, and positive hours; groupingBy computes totals; also group by course. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter a teacher, a course, and positive hours; groupingBy computes totals; also group by course; show shares of the total workload and a stable order. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 29. Video views {#v29}

**1. Initial level.** Create a complete Java program on JDK 27. Enter a channel, a video, and nonnegative views; groupingBy sums them. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter a channel, a video, and nonnegative views; groupingBy sums them; show the top-k videos of each channel. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter a channel, a video, and nonnegative views; groupingBy sums them; show the top-k videos of each channel; reject a repeated id or merge it explicitly, and test sum overflow. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

### Variant 30. A test data generator {#v30}

**1. Initial level.** Create a complete Java program on JDK 27. Enter a seed and a count 0..10000; Stream.generate with a seeded Random produces integers 0..99. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**2. Basic level.** Create a complete Java program on JDK 27. Enter a seed and a count 0..10000; Stream.generate with a seeded Random produces integers 0..99; bound the stream with limit and compute statistics. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter a seed and a count 0..10000; Stream.generate with a seeded Random produces integers 0..99; bound the stream with limit and compute statistics; prove reproducibility with the same seed and prohibit concurrent access to a shared generator. Use the Stream API without modifying the source; print a labeled result. Test an empty set, a single element, repeats, and invalid input. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests of the model and the CLI.

## Procedure

1. Write down the source type, intermediate types, and result type.
2. Implement parsing separately from computing the report.
3. Test an empty set, a single element, duplicates, and ties.
4. For Optional, test both presence and absence; for windows, a source shorter than, equal to, and longer than the window size.
5. Submit the actual output, automated tests, and an explanation of the order of operations. Add parallelism only after measuring.
