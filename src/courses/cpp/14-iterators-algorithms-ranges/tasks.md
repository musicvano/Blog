---
title: Tasks
description: "Topic 14. Iterators, Algorithms, Ranges: task variants"
outline: [2, 3]
sourceHash: "d9f74c16b6284b24e9c60ff4a577c6f0197428c7e91ef19669c1d1a26c396316"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

If specific test data is not given, choose it and list it in the report. The teaching examples are not intended for working with real account data or third-party files.

## Variants

### Variant 1. Marathon results {#v1}

**1. Initial level.** Create a console program: for records of marathon participants with a bib number, an age, and a time in seconds, sort the participants by time, breaking ties by bib number. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: for records of marathon participants with a bib number, an age, and a time in seconds, select the age group \[18,30) and show the three fastest using filter/take. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: for records of marathon participants with a bib number, an age, and a time in seconds, form the top three of each ten-year age group without changing the original order of the input records. Define the input records in the code; print the result and an edge-case check.

### Variant 2. Stock prices {#v2}

**1. Initial level.** Create a console program: find the minimum and maximum sample price using minmax\_element. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: compute a moving average with a window of 3; for fewer than three prices, the result is empty. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: find the best pair of buying on an earlier day and selling on a later day; if there is no profit, report that rather than choosing a negative one. Define the input records in the code; print the result and an edge-case check.

### Variant 3. Store orders {#v3}

**1. Initial level.** Create a console program: select the paid orders using copy\_if. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: compute the total of each customer’s paid orders; prices are in whole kopiykas. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: build a ranking of customers by the total of their paid orders, breaking ties by ID, and keep the canceled records unchanged. Define the input records in the code; print the result and an edge-case check.

### Variant 4. Fitness data {#v4}

**1. Initial level.** Create a console program: find the record step count using max\_element. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: for a vector of daily step counts, compute the weekly totals using chunk(7) and mark the last incomplete week. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: from the daily steps, find the longest run of days with at least 8000 steps and compare it with the weekly totals. Define the input records in the code; print the result and an edge-case check.

### Variant 5. Sensors with outliers {#v5}

**1. Initial level.** Create a console program: remove negative measurements using erase\_if. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: in a vector of sensor measurements, replace the inner elements with the median of a window of 3 computed from the original data; leave the edge elements unchanged. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: from a vector of sensor measurements, remove the values outside \[median-3,median+3\], computing the median from the original set; show the before/after data and the number removed. Define the input records in the code; print the result and an edge-case check.

### Variant 6. A payroll {#v6}

**1. Initial level.** Create a console program: sort payroll records with a name, a department, and a sample payment amount by amount in descending order, using a projection to the amount field. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: for payroll records with a name, a department, and a sample payment amount, compute the mean and median amount for each department. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: for the sample payroll amounts, compute the quartiles as the medians of the lower and upper halves of the sorted data, excluding the central element for an odd n; for n&lt;2, do not define quartiles. Define the input records in the code; print the result and an edge-case check.

### Variant 7. Overdue books {#v7}

**1. Initial level.** Create a console program: select the records whose integer return day is less than the current sample day. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: for book loan records with a reader, a title, and an integer return day, select those that are overdue relative to the current day, compute a nominal fee of 2 units per overdue day, and sort the debtors by amount. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: for book loan records with a reader, a title, and an integer return day, group the overdue books by reader, charge a nominal amount of 2 units per day, and show the first 3 records; future due dates do not produce a negative fee. Define the input records in the code; print the result and an edge-case check.

### Variant 8. Catalog pages {#v8}

**1. Initial level.** Create a console program: from a vector of catalog titles, show the first 3 entries using take. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: split the catalog using chunk(3) and number the pages with enumerate. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: first filter the ASCII titles by a substring, then form pages of a given positive capacity; test an empty search and a short last page. Define the input records in the code; print the result and an edge-case check.

### Variant 9. An event log {#v9}

**1. Initial level.** Create a console program: count the ERROR-level records using count\_if. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: split the given lines in the hour|level|text format using split, and reject a wrong number of fields. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: from valid hour|level|text lines, get hourly ERROR counts and a sorted report; check that the hour is 0..23 and test empty text. Define the input records in the code; print the result and an edge-case check.

### Variant 10. Prime numbers with a pipeline {#v10}

**1. Initial level.** Create a console program: get the prime numbers from 2 to 30 using iota/filter. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: get the first 20 primes using a bounded iota(2,1000), filter, and take. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: get the primes up to 1000 and the gaps between neighboring ones; find the largest gap and all the pairs that form it. Define the input records in the code; print the result and an edge-case check.

### Variant 11. A deck of cards {#v11}

**1. Initial level.** Create a console program: create a deck of 4 suits×13 ranks and shuffle it with shuffle using a fixed seed. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: create a deck of 4 suits×13 ranks, shuffle it with shuffle using a fixed seed, deal 5 cards each to two players without repeats, and sort the hands by rank, then by suit. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: create a deck of 4 suits×13 ranks, shuffle it with a fixed seed, deal 4 hands of 5, check that all the cards are unique, and compute the rank frequencies in each hand; the randomness is for teaching purposes, so record the seed. Define the input records in the code; print the result and an edge-case check.

### Variant 12. An election {#v12}

**1. Initial level.** Create a console program: count the sample votes for each candidate using count. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: for sample ballots with a candidate identifier or an invalid-vote mark, compute each candidate’s percentage of the valid votes, handling an empty set without dividing. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: for sample ballots with a candidate identifier, determine a leader with a share of more than 50 %; otherwise, select two candidates for a hypothetical runoff, breaking a tie by identifier. Define the input records in the code; print the result and an edge-case check.

### Variant 13. Playlist duration {#v13}

**1. Initial level.** Create a console program: for playlist tracks with a title, a genre, and a duration in seconds, compute the total seconds using transform and fold\_left. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: for playlist tracks with a title and a duration in seconds, select the 3 longest tracks using partial\_sort, breaking ties by title. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: for playlist tracks with a title, a genre, and a duration, filter by genre, sort by duration, and take the largest initial prefix that fits into 600 seconds; do not call this the general knapsack problem. Define the input records in the code; print the result and an edge-case check.

### Variant 14. Restocking a warehouse {#v14}

**1. Initial level.** Create a console program: select the goods whose quantity is below the threshold. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: turn the goods in short supply into orders of threshold-minus-stock using transform. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: for goods with a name, a supplier, a stock level, a threshold, and a price in kopiykas, form threshold-minus-stock orders, group them by supplier, and compute the total; exclude goods without a shortage and test the case where the stock equals the threshold. Define the input records in the code; print the result and an edge-case check.

### Variant 15. Taxi rides {#v15}

**1. Initial level.** Create a console program: compute the average sample fare using accumulate. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: for sample taxi rides with a start hour and a fare in kopiykas, select the rides from hours 8..10 and determine the average fare without dividing by an empty count. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: for sample taxi rides with a district, a duration, and a fare in kopiykas, group the rides by district, rank the districts by revenue, and print the average duration; no network data. Define the input records in the code; print the result and an edge-case check.

### Variant 16. Energy consumption {#v16}

**1. Initial level.** Create a console program: multiply equal-length arrays of volumes and rates using zip. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: for arrays of monthly consumption volumes and rates, check that the lengths are equal before zip and compute the total sample charge. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: combine the month, volume, and rate, and print the monthly totals; reject negative values and different lengths instead of silently truncating. Define the input records in the code; print the result and an edge-case check.

### Variant 17. Normalizing scores {#v17}

**1. Initial level.** Create a console program: find the min/max of the sample grades. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: map the grades to \[0,100\] with the formula 100\*(x-min)/(max-min); when max=min, give everyone 100. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: for student records with a name and a score, normalize the scores to \[0,100\] with the formula 100\*(x-min)/(max-min) (everyone gets 100 when max=min) and stable-sort by normalized score in descending order; preserve the order of ties and do not change the original copy. Define the input records in the code; print the result and an edge-case check.

### Variant 18. Product reviews {#v18}

**1. Initial level.** Create a console program: select ratings 1..5 using filter and compute the average. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: for reviews with a product ID and a rating of 1..5, group the reviews by product and sort the products by average rating, breaking ties by ID. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: for reviews with a product ID, a rating of 1..5, and ASCII text, exclude reviews containing words from a given stop list, then build a ranking of products by average rating; explain the word rules and do not treat this as universal moderation. Define the input records in the code; print the result and an edge-case check.

### Variant 19. Nearest points {#v19}

**1. Initial level.** Create a console program: sort points by their squared distance to the origin. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: get the k points nearest to a given point using partial\_sort; limit k by the size. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: for several queries, find the k nearest points without changing the original data; for equal distances, sort by x, then by y; limit the coordinates to avoid overflow. Define the input records in the code; print the result and an edge-case check.

### Variant 20. Hashtags in posts {#v20}

**1. Initial level.** Create a console program: extract ASCII words that start with `#` using split/filter. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: normalize the ASCII case of hashtags and build a frequency ranking. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: count the co-occurrence of pairs of different hashtags in a post, counting each pair once per post; sort by frequency in descending order and the pairs lexicographically. Define the input records in the code; print the result and an edge-case check.

### Variant 21. Recipes by calories {#v21}

**1. Initial level.** Create a console program: select sample recipes with an energy value of up to 500. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: for sample recipes with a name, calories, and a list of ingredients, find the 3 lowest-calorie recipes without a given ingredient using partial\_sort. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: for sample recipes with a name, calories, a cooking time, and ingredients, filter the recipes by a set of forbidden ingredients and rank them by calories and time; check that all forbidden ones are excluded. Define the input records in the code; print the result and an edge-case check.

### Variant 22. Flights {#v22}

**1. Initial level.** Create a console program: sort the given sample flights by price, then by time. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: find direct flights between two cities after a given minute of the day. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: find pairs of flights with one transfer of at least 30 min within a single day; sort by total price, then by arrival time. Define the input records in the code; print the result and an edge-case check.

### Variant 23. Class grades {#v23}

**1. Initial level.** Create a console program: combine equal-length names and grades using zip. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: for arrays of student names and their grades, check that the lengths are equal and select the students with a score of at least 90 using zip and filter. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: build a ranking of names and three grades with an average computed via transform; check all the lengths, and sort by average in descending order and by name in ascending order. Define the input records in the code; print the result and an edge-case check.

### Variant 24. DNA sequences {#v24}

**1. Initial level.** Create a console program: compute the G/C share in an ASCII string of A,C,G,T using count\_if. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: find all occurrences of a given non-empty motif using search, including overlapping ones. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: reject invalid characters and find the window of a given length with the highest GC content; print all ties by their starting positions. Define the input records in the code; print the result and an edge-case check.

### Variant 25. A transposition cipher {#v25}

**1. Initial level.** Create a console program: iterate next\_permutation over the indices 0, 1, 2 and print the six orders. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: permute blocks of 3 characters of ASCII text according to a given key, leaving the last short block as is. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: try all 6 keys for a block of 3 on a sample text and show recovery with the inverse key; state that this is not modern encryption. Define the input records in the code; print the result and an edge-case check.

### Variant 26. Weather records {#v26}

**1. Initial level.** Create a console program: in a series of daily temperatures, find the first two adjacent equal values using adjacent\_find. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: find the longest run of days with a temperature above 20; on a tie, choose the earlier one. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: in a series of daily temperatures, build all maximal warm runs (above 20 degrees), with the start, length, and average of each; test an empty set and the absence of warm days. Define the input records in the code; print the result and an edge-case check.

### Variant 27. Polynomials in vectors {#v27}

**1. Initial level.** Create a console program: add coefficient vectors of equal length using transform. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: evaluate a polynomial using inner\_product of the coefficients and the powers of x, explicitly setting the order starting from the constant term. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: add polynomials of different lengths with zero padding, evaluate the sum at x=2, and compare it with the sum of the separate values. Define the input records in the code; print the result and an edge-case check.

### Variant 28. Sports seasons {#v28}

**1. Initial level.** Create a console program: merge two sorted lists of results using merge. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: find the common participants of two seasons using set\_intersection after sorting and unique. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: for the participant lists of two sports seasons, build the lists of common, new, and departed participants using set algorithms; the inputs contain repeats that must be eliminated first. Define the input records in the code; print the result and an edge-case check.

### Variant 29. A custom container {#v29}

**1. Initial level.** Create a console program: create an array wrapper with begin/end and apply ranges::find. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: implement a forward iterator for a ring buffer with the logical order after wraparound. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: implement const traversal for a ring buffer and check forward\_range; apply filter/take and document invalidation after a structural change. Define the input records in the code; print the result and an edge-case check.

### Variant 30. A family budget {#v30}

**1. Initial level.** Create a console program: sum sample transactions in kopiykas using accumulate. Define the input records in the code; print the result and an edge-case check.

**2. Basic level.** Create a console program: for sample transactions with a month, a category, and an amount in kopiykas, select a given month using filter and total the categories. Define the input records in the code; print the result and an edge-case check.

**3. Advanced level.** Create a console program: for sample transactions with a month, a category, and an amount in kopiykas, build a monthly report by category with a text chart: one asterisk per full 1000 kopiykas; show negative refunds separately. Define the input records in the code; print the result and an edge-case check.

## Procedure

1. Build the examples and compare the results with the ones shown.
1. Create a separate program for the chosen level of your variant.
1. Before implementing, write down the requirements, the valid data, and the expected results.
1. Test the ordinary, empty, and edge cases that make sense for the problem.
1. Save the code, the build commands, and the test results in a local Git repository.

Document the order of the pipeline operations, the owner of the data, and the required iterator category. Run the negative test of an invalid iterator only in a separate Debug project; it is not part of the correct program.

## Report requirements

Submit the statement of the chosen task, the solution with an explanation of its invariants,
the build command, the MSVC version, the test data, and the actual output.
For expected errors, keep the negative test separate from the working program.
Explain the cause of the failure and the fix; a screenshot of the Error List alone is not enough.
