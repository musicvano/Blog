---
title: "Tasks"
description: "Topic 7. Generators and decorators: task variants"
outline: [2, 3]
sourceHash: "0c53c20a6b2ba47ad3f201e9dcb8db34fa4d0f8c3d6224ef63bda538dfee06f1"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

Type your own functions; for generators, specify the element type with `Iterator[T]`. The specifications define sample data; access to external services is unnecessary. Always limit an infinite source on the consumer side. At the advanced level, use `argparse` from the example in Lab 1: scalar data as named arguments and repeatable `--item` records with colon-separated fields. Document the field order in `--help`; keyboard input is available without arguments. Errors must go to stderr with exit code 2; success and help use code 0. Compare the streaming result with a simple implementation on a small data set.

## Variants

### Variant 1. Stock quotes {#v1}

**1. Initial level.** Create a Python 3.14 console program that accepts up to 30 sample prices in 1..10000; use a generator to yield adjacent changes through pairwise. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts up to 30 sample prices in 1..10000; calculate a moving average of width 3; print the price, change, and average. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts up to 30 sample prices in 1..10000; calculate a moving average of width 3; print the price, change, and average; add a custom decorator for a timer that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 2. Sensor telemetry {#v2}

**1. Initial level.** Create a Python 3.14 console program that accepts an initial integer in 0..100 and a measurement count in 1..50; use an infinite generator to yield (start+7\*i)%101, limited with islice. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts an initial integer in 0..100 and a measurement count in 1..50; filter values above 80 and print batches of 5. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts an initial integer in 0..100 and a measurement count in 1..50; filter values above 80 and print batches of 5; add a custom decorator for an attempt counter that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 3. Marathon {#v3}

**1. Initial level.** Create a Python 3.14 console program that accepts up to 20 records name:age:time, ages 18..80 and times 120..600 minutes; use a generator to yield times in seconds. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts up to 20 records name:age:time, ages 18..80 and times 120..600 minutes; group by age below 40 and at least 40 after sorting by the key; print the winner of each group. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts up to 20 records name:age:time, ages 18..80 and times 120..600 minutes; group by age below 40 and at least 40 after sorting by the key; print the winner of each group; add a custom decorator for logging that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 4. Traffic light {#v4}

**1. Initial level.** Create a Python 3.14 console program that accepts a phase count in 1..20; use cycle to repeat red, green, and yellow and limit the stream. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts a phase count in 1..20; assign durations of 30, 25, and 5 seconds and use accumulate to print each phase's start time. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts a phase count in 1..20; assign durations of 30, 25, and 5 seconds and use accumulate to print each phase's start time; add a custom decorator for count validation that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 5. Lottery {#v5}

**1. Initial level.** Create a Python 3.14 console program that accepts an alphabet of 2..8 distinct numbers in 1..20 and k from 1 to its length; use a generator to yield combinations of length k. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts an alphabet of 2..8 distinct numbers in 1..20 and k from 1 to its length; count combinations and compare with math.comb; print all combinations and their count. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts an alphabet of 2..8 distinct numbers in 1..20 and k from 1 to its length; count combinations and compare with math.comb; print all combinations and their count; add a custom decorator for caching the count function that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 6. Prime sieve {#v6}

**1. Initial level.** Create a Python 3.14 console program that accepts a prime-number count in 1..30; yield primes with an infinite generator, consumed through islice. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts a prime-number count in 1..30; split primes into batches of 5 using batched and print the sum and largest pairwise gap. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts a prime-number count in 1..30; split primes into batches of 5 using batched and print the sum and largest pairwise gap; add a custom decorator for a check counter that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 7. Duty schedule {#v7}

**1. Initial level.** Create a Python 3.14 console program that accepts 2..8 distinct names and a day count in 1..14; use cycle to assign one person on duty per day. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts 2..8 distinct names and a day count in 1..14; combine a product of days and morning/evening shifts with a cycle of names; print the schedule and workloads. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts 2..8 distinct names and a day count in 1..14; combine a product of days and morning/evening shifts with a cycle of names; print the schedule and workloads; add a custom decorator for logging that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 8. Sample PINs {#v8}

**1. Initial level.** Create a Python 3.14 console program that accepts an alphabet of 2..4 distinct digits and a length in 1..4; use product with repeat to generate local sample codes. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts an alphabet of 2..4 distinct digits and a length in 1..4; filter for codes without identical neighbors; print the first 20 and the total count. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts an alphabet of 2..4 distinct digits and a length in 1..4; filter for codes without identical neighbors; print the first 20 and the total count; add a custom decorator for limiting the number of calls that preserves metadata, and compare the result with an independent simple traversal; make no external requests. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 9. Sample signal {#v9}

**1. Initial level.** Create a Python 3.14 console program that accepts 10..50 finite numbers from -10 to 10; use a generator to yield differences between adjacent values. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts 10..50 finite numbers from -10 to 10; find strict local maxima using triples and print indices and amplitudes; this is only a signal, with no medical conclusions. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts 10..50 finite numbers from -10 to 10; find strict local maxima using triples and print indices and amplitudes; this is only a signal, with no medical conclusions; add a custom decorator for a timer that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 10. Tournament pairs {#v10}

**1. Initial level.** Create a Python 3.14 console program that accepts 2..10 distinct team names; use combinations to form all pairs of 2. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts 2..10 distinct team names; print pairs and each team's game count, checking n\*(n-1)/2. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts 2..10 distinct team names; print pairs and each team's game count, checking n\*(n-1)/2; add a custom decorator for team uniqueness validation that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 11. Sample exchange rates {#v11}

**1. Initial level.** Create a Python 3.14 console program that accepts up to 20 requests to a fixed dictionary USD=40, EUR=44; use a generator to yield currency and sample-rate pairs. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts up to 20 requests to a fixed dictionary USD=40, EUR=44; cache the rate function and print hits/misses after repeated requests; reject unknown codes. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts up to 20 requests to a fixed dictionary USD=40, EUR=44; cache the rate function and print hits/misses after repeated requests; reject unknown codes; add a custom decorator for caching with a TTL of 5 seconds using an injected sample clock that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 12. Bank transactions {#v12}

**1. Initial level.** Create a Python 3.14 console program that accepts an initial balance in 0..10000 and up to 30 integer changes from -1000 to 1000; use accumulate to yield the balance sequence. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts an initial balance in 0..10000 and up to 30 integer changes from -1000 to 1000; mark negative balances as the stream is processed; print every step and the total without silently removing withdrawals. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts an initial balance in 0..10000 and up to 30 integer changes from -1000 to 1000; mark negative balances as the stream is processed; print every step and the total without silently removing withdrawals; add a custom decorator for logging that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 13. Menu within a budget {#v13}

**1. Initial level.** Create a Python 3.14 console program that accepts up to 8 dish names with integer prices in 1..500 and a budget in 1..1000; use combinations to form sets of 2. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts up to 8 dish names with integer prices in 1..500 and a budget in 1..1000; filter valid sets and use sorted with lambda to order by total and names. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts up to 8 dish names with integer prices in 1..500 and a budget in 1..1000; filter valid sets and use sorted with lambda to order by total and names; add a custom decorator for budget validation that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 14. Solar power plant {#v14}

**1. Initial level.** Create a Python 3.14 console program that accepts up to 48 records day:hour:kW, days 1..2, hours 0..23, and power 0..20; use a generator to yield energy for an hourly interval. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts up to 48 records day:hour:kW, days 1..2, hours 0..23, and power 0..20; sort by day, use groupby to total daily energy, and show the maximum. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts up to 48 records day:hour:kW, days 1..2, hours 0..23, and power 0..20; sort by day, use groupby to total daily energy, and show the maximum; add a custom decorator for a computation counter that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 15. ASCII graphics {#v15}

**1. Initial level.** Create a Python 3.14 console program that accepts a width in 1..30, a height in 1..15, and a character; use a generator to yield rows of a filled rectangle. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts a width in 1..30, a height in 1..15, and a character; use map to convert rows to uppercase and add a frame; print the image and dimensions. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts a width in 1..30, a height in 1..15, and a character; use map to convert rows to uppercase and add a frame; print the image and dimensions; add a custom decorator for a frame around the row-generation function that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 16. Website traffic {#v16}

**1. Initial level.** Create a Python 3.14 console program that accepts up to 30 records user:minute, with minutes in 0..1440; use a generator to yield records in time order. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts up to 30 records user:minute, with minutes in 0..1440; sort by user and time and use groupby to separate users; a gap over 30 minutes starts a session; print the session count. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts up to 30 records user:minute, with minutes in 0..1440; sort by user and time and use groupby to separate users; a gap over 30 minutes starts a session; print the session count; add a custom decorator for a timer that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 17. Game ranking {#v17}

**1. Initial level.** Create a Python 3.14 console program that accepts up to 20 records name:points:wins, points 0..1000 and wins 0..100; use a generator to yield names of players with at least 500 points. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts up to 20 records name:points:wins, points 0..1000 and wins 0..100; use sorted to print a full ranking by descending points and wins, then name. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts up to 20 records name:points:wins, points 0..1000 and wins 0..100; use sorted to print a full ranking by descending points and wins, then name; add a custom decorator for range validation that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 18. Numeric sequences {#v18}

**1. Initial level.** Create a Python 3.14 console program that accepts n from 1 to 15; use a generator to yield the arithmetic sequence 2+3\*i. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts n from 1 to 15; use chain to combine n arithmetic values, n geometric values 2\*\*i, and n Fibonacci numbers; print the blocks and sum. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts n from 1 to 15; use chain to combine n arithmetic values, n geometric values 2\*\*i, and n Fibonacci numbers; print the blocks and sum; add a custom decorator for logging that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 19. Shopping mall parking {#v19}

**1. Initial level.** Create a Python 3.14 console program that accepts a capacity in 1..100 and up to 30 entry or exit events; use a generator to yield occupancy changes of +1 or -1. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts a capacity in 1..100 and up to 30 entry or exit events; apply events sequentially, prohibiting negative occupancy or exceeding capacity; print the state and rejected events. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts a capacity in 1..100 and up to 30 entry or exit events; apply events sequentially, prohibiting negative occupancy or exceeding capacity; print the state and rejected events; add a custom decorator for logging rejections that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 20. Order packing {#v20}

**1. Initial level.** Create a Python 3.14 console program that accepts 1..30 integer order numbers and a batch capacity in 1..10; use batched to split orders into batches. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts 1..30 integer order numbers and a batch capacity in 1..10; print batch numbers, counts, and the short tail; check that order is preserved. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts 1..30 integer order numbers and a batch capacity in 1..10; print batch numbers, counts, and the short tail; check that order is preserved; add a custom decorator for retrying only TimeoutError in a controlled local simulation that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 21. Word games {#v21}

**1. Initial level.** Create a Python 3.14 console program that accepts 3..6 distinct Latin letters and up to 20 words; use permutations to yield letter permutations. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts 3..6 distinct Latin letters and up to 20 words; filter permutations found in the input dictionary and print sorted matches and their count. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts 3..6 distinct Latin letters and up to 20 words; filter permutations found in the input dictionary and print sorted matches and their count; add a custom decorator for a check counter that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 22. City temperatures {#v22}

**1. Initial level.** Create a Python 3.14 console program that accepts up to 20 records city:temperature, with temperatures from -40 to 50; use a generator expression to yield temperatures in kelvins. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts up to 20 records city:temperature, with temperatures from -40 to 50; after sorting by city, use groupby to find the minimum, maximum, and average; print a table. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts up to 20 records city:temperature, with temperatures from -40 to 50; after sorting by city, use groupby to find the minimum, maximum, and average; print a table; add a custom decorator for a timer that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 23. Bus timetable {#v23}

**1. Initial level.** Create a Python 3.14 console program that accepts a start time in 0..1200 minutes, an interval in 1..120, and a trip count in 1..20; use count and islice to produce departure times. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts a start time in 0..1200 minutes, an interval in 1..120, and a trip count in 1..20; for an entered time in 0..1440, find the next trip or None; print the table and result. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts a start time in 0..1200 minutes, an interval in 1..120, and a trip count in 1..20; for an entered time in 0..1440, find the next trip or None; print the table and result; add a custom decorator for caching a finite timetable as a tuple that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 24. Swimming pool {#v24}

**1. Initial level.** Create a Python 3.14 console program that accepts an initial ISO date, a step of 1..7 days, and a count in 1..20; use a generator to yield visit dates. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts an initial ISO date, a step of 1..7 days, and a count in 1..20; exclude entered skip dates and print the plan, actual dates, and count. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts an initial ISO date, a step of 1..7 days, and a count in 1..20; exclude entered skip dates and print the plan, actual dates, and count; add a custom decorator for logging that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 25. Chess knight move {#v25}

**1. Initial level.** Create a Python 3.14 console program that accepts a column and row in 1..8; use a generator to yield valid knight moves with offsets 1 and 2. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts a column and row in 1..8; generate second moves for each first move and print the unique reachable positions and their count. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts a column and row in 1..8; generate second moves for each first move and print the unique reachable positions and their count; add a custom decorator for a generation counter that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 26. Musical chords {#v26}

**1. Initial level.** Create a Python 3.14 console program that accepts 3..7 distinct note numbers in 0..11; use combinations to yield three-note triads. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts 3..7 distinct note numbers in 0..11; use lambda to filter triads whose adjacent differences are 3 or 4; print the options and count. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts 3..7 distinct note numbers in 0..11; use lambda to filter triads whose adjacent differences are 3 or 4; print the options and count; add a custom decorator for note validation that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 27. Saving toward a goal {#v27}

**1. Initial level.** Create a Python 3.14 console program that accepts an initial amount in 0..10000, a contribution in 1..1000, and a goal in 1..20000; use a generator to yield monthly balances without interest. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts an initial amount in 0..10000, a contribution in 1..1000, and a goal in 1..20000; use takewhile to obtain balances below the goal and separately show the first balance that reaches it, limiting the horizon to 240 months. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts an initial amount in 0..10000, a contribution in 1..1000, and a goal in 1..20000; use takewhile to obtain balances below the goal and separately show the first balance that reaches it, limiting the horizon to 240 months; add a custom decorator for a call counter that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 28. Grade normalization {#v28}

**1. Initial level.** Create a Python 3.14 console program that accepts up to 30 records group:grade, with grades in 0..100; use a generator to convert grades to proportions in 0..1. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts up to 30 records group:grade, with grades in 0..100; after sorting, use groupby to print average proportions by group and the record count. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts up to 30 records group:grade, with grades in 0..100; after sorting, use groupby to print average proportions by group and the record count; add a custom decorator for a timer that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 29. Print queue {#v29}

**1. Initial level.** Create a Python 3.14 console program that accepts up to 20 records name:pages:priority, pages 1..100 and priority 1..3; use a generator to yield job names. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts up to 20 records name:pages:priority, pages 1..100 and priority 1..3; sort stably by priority with 1 first, and use accumulate on page counts to obtain cumulative volume; print the queue. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts up to 20 records name:pages:priority, pages 1..100 and priority 1..3; sort stably by priority with 1 first, and use accumulate on page counts to obtain cumulative volume; print the queue; add a custom decorator for logging that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

### Variant 30. Grid points {#v30}

**1. Initial level.** Create a Python 3.14 console program that accepts integer grid bounds from -5 to 5; use product to generate all integer points in the rectangle. Type the functions, validate the data, and print the resulting values and their count.

**2. Basic level.** Create a Python 3.14 console program that accepts integer grid bounds from -5 to 5; use combinations to find the closest pair of grid points by squared distance, breaking ties lexicographically; print the pair and distance. Type the functions, validate the data, and print the resulting values and their count.

**3. Advanced level.** Create a Python 3.14 console program that accepts integer grid bounds from -5 to 5; use combinations to find the closest pair of grid points by squared distance, breaking ties lexicographically; print the pair and distance; add a custom decorator for caching the squared-distance function that preserves metadata, and compare the result with an independent simple traversal. Type the functions, validate the data, and print the resulting values and their count. Add `--help`, named parameters, and repeatable `--item` records with colon-separated fields; describe the format and prompt for keyboard input when there are no arguments. Errors go to stderr with code 2; success uses code 0. Provide a table and five test runs.

## Procedure

1. Record the contract of the source, each transformation, and the consumer. Determine the maximum element count and required buffers.
2. Implement generators separately from printing and console input. Identify operations that materialize the complete sequence.
3. Preserve decorator metadata with `wraps`, and forward the original function's result and exceptions without unexpected changes.
4. Test an empty stream, one element, an ordinary data set, a boundary size, and an invalid record. Add repeated traversal of an exhausted generator and a check of the wrapper's call count.
5. Run the program from PyCharm and the terminal. For the advanced level, test help, arguments, stderr, and exit codes.
6. Provide the code, README, a table of expected and actual results, and local Git history; do not include the environment or caches.
7. During the defense, explain the suspension point at `yield`, decorator order, and one example where laziness does not guarantee constant memory.
