---
title: Tasks
description: "Topic 13. Containers: task variants"
outline: [2, 3]
sourceHash: "924f00bd0dc06d1c077e0ee8e2624bc44a9c9eb61cb4e48315cc01e470fe6a18"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

If specific test data is not given, choose it and list it in the report. The teaching examples are not intended for working with real account data or third-party files.

## Variants

### Variant 1. Vote counting {#v1}

**1. Initial level.** Create a console program. Count the sample votes A,B,A,C,A in an unordered\_map and print the result by candidate name. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Process a list of voter,candidate pairs; reject a repeated voter and store the totals in a map. Test an empty list. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Build a sample vote register that lets one voter change their vote; keep the total counters consistent and never let them go negative. Test a tie and an invalid candidate. Define the input data in the code; print the results of the operations and checks.

### Variant 2. Spell checking {#v2}

**1. Initial level.** Create a console program. Find the words of a text that are missing from a dictionary unordered\_set; the words are ASCII and case-sensitive. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Create a dictionary of ASCII words, normalize case, and print unknown words with their counts; separate punctuation explicitly. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. For an unknown ASCII word, find dictionary candidates that differ by one inserted, deleted, or replaced letter; remove duplicates and sort the suggestions. Define the input data in the code; print the results of the operations and checks.

### Variant 3. Anagram groups {#v3}

**1. Initial level.** Create a console program. Group eat,tea,ate,bat by their sorted ASCII letters in a `map<string,vector<string>>`. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Group an arbitrary given list of ASCII words into anagrams, ignoring case; do not add repeats of the same word. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Build anagram groups and sort the groups by size in descending order, breaking ties by key; print the words, the number of unique words, and the frequency of each original word. Define the input data in the code; print the results of the operations and checks.

### Variant 4. An order book {#v4}

**1. Initial level.** Create a console program. Store sample buy orders by price in a map, summing equal prices; find the best price. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Create two maps for buying and selling with integer prices and quantities; show the best levels and do not dereference an empty side. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Store sample buy and sell orders with integer prices and quantities in two maps and implement matching when the best buy is not lower than the sell; execute a trade at the sell price and fill quantities partially. This is a data model, not a trading service. Define the input data in the code; print the results of the operations and checks.

### Variant 5. A queue of urgent requests {#v5}

**1. Initial level.** Create a console program. Store sample requests with a numeric urgency in a priority\_queue; a higher score is served first. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Create a queue of sample records with a priority and an arrival time; with equal priority, the earlier one goes first. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Model a queue of sample records with an ID and a priority in a priority\_queue, with priority changes and cancellation by ID through versioned records. Ignore stale tops; do not use real medical data or rules. Define the input data in the code; print the results of the operations and checks.

### Variant 6. An LRU cache {#v6}

**1. Initial level.** Create a console program. Create a cache on a list of pairs with a capacity of 3; a lookup moves the found item to the front, and the excess tail is removed. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Implement an LRU cache with a list and an unordered\_map key→iterator, using splice; test a repeated key. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Implement an LRU cache with a list and an unordered\_map key→iterator with a capacity (including 0), resize, and hit statistics; after every operation, check that the dictionary and the list are consistent and that there are no dangling iterators. Define the input data in the code; print the results of the operations and checks.

### Variant 7. An event calendar {#v7}

**1. Initial level.** Create a console program. Store several events of one day in a multimap with YYYY-MM-DD keys; print the day using equal\_range. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Store a calendar in a multimap and find the events in the closed period between two ISO dates using lower\_bound/upper\_bound. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Store a calendar of events with unique IDs in a multimap with YYYY-MM-DD keys; implement moving an event by ID between dates and searching for the events of a period; test repeated dates, a missing ID, and that the other events stay unchanged. Define the input data in the code; print the results of the operations and checks.

### Variant 8. Bus routes {#v8}

**1. Initial level.** Create a console program. Create a `map<string,set<string>>` of neighboring stops and find direct connections without repeats. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Store the stop graph as a `map<string,set<string>>` of neighboring stops and find connections with at most one transfer; decide whether the graph is directed and test a missing stop. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Store the stop graph as a `map<string,set<string>>` of neighboring stops; use a queue to run BFS and reconstruct a route with the minimum number of edges; test a cycle and an unreachable stop. Define the input data in the code; print the results of the operations and checks.

### Variant 9. A text concordance {#v9}

**1. Initial level.** Create a console program. For three given lines, create a map word→set of line numbers, numbered from 1; the words are ASCII. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Build a concordance with ASCII case normalization; a repeated word in the same line does not duplicate the number. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Build an index word→lines and find the lines that contain all the words of a query; test an empty query, a missing word, and repeats in the query. Define the input data in the code; print the results of the operations and checks.

### Variant 10. A leaderboard {#v10}

**1. Initial level.** Create a console program. Store score,name records in a set ordered by score descending and name ascending; show the top three. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Store score,name records in a set ordered by score descending and name ascending; implement updating a player’s score by removing the old record and inserting a new one, without changing set elements in place. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Combine a map name→score with a ranking set, and support updates and removals. Check that both containers are consistent and that ties are handled correctly. Define the input data in the code; print the results of the operations and checks.

### Variant 11. A warehouse by section {#v11}

**1. Initial level.** Create a console program. Store a `map<string,vector<Item>>` for two sections and print the quantities of goods. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Store a warehouse as a `map<string,vector<Item>>` of sections with goods that have a unique code; implement moving goods by code between sections, with a refusal for a missing code and for the same section. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Store a warehouse as a `map<string,vector<Item>>` of sections with goods (code, quantity); implement a partial transfer of a quantity of goods between sections; merge identical codes, never lose the total quantity, and never allow a negative one. Define the input data in the code; print the results of the operations and checks.

### Variant 12. Friends in a social network {#v12}

**1. Initial level.** Create a console program. Store an unordered\_map user→unordered\_set of friends and find the mutual friends of two sample users. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Store an unordered\_map user→unordered\_set of friends; support symmetric adding and removing of friendships, and forbid friendship with oneself and repeated edges. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Store an unordered\_map user→unordered\_set of friends; find friend-of-a-friend recommendations, excluding the user and existing friends; sort by the number of mutual friends, breaking ties by name. Define the input data in the code; print the results of the operations and checks.

### Variant 13. A train timetable {#v13}

**1. Initial level.** Create a console program. Store a multimap station→minute of the day and print all departures from a given station. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Store a timetable as a multimap station→minute of the day; for a station and a time, find the nearest departure not earlier than the given time; after the last one, report that there are none today. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Store stations, directions, and times, and find options with one transfer of at least 10 min; times are within a single day; print all valid pairs. Define the input data in the code; print the results of the operations and checks.

### Variant 14. A translator {#v14}

**1. Initial level.** Create a console program. Create a map word→translation for a sample ASCII dictionary; do not insert a missing key. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Create bidirectional `map<string,set<string>>` maps for multiple translations; adding a pair updates both sides. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Store a sample dictionary as bidirectional `map<string,set<string>>` maps of translations; support adding and removing a translation pair, cleaning up empty keys, and query frequency; check the symmetry of the dictionaries after every change. Define the input data in the code; print the results of the operations and checks.

### Variant 15. Airplane seats {#v15}

**1. Initial level.** Create a console program. Store a set of occupied seats 1..10; reject a repeated booking and an invalid number. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Combine a set of occupied seats with a map seat→passenger; implement cancellation and a list of free seats. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Store a set of occupied seats 1..10 and a map seat→passenger; implement moving a passenger between seats as an indivisible logical operation: if the new seat is occupied, the old booking is kept. Test all refusals. Define the input data in the code; print the results of the operations and checks.

### Variant 16. A print queue {#v16}

**1. Initial level.** Create a console program. Store normal jobs in a deque and add priority jobs to the front; show the execution order. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Implement canceling a print job by ID in a deque, processing the head, and a refusal for an empty queue. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Create two FIFO print queues: after at most two priority jobs, serve a normal one if there is one. Check that there is no starvation on a given sequence. Define the input data in the code; print the results of the operations and checks.

### Variant 17. Shopping from recipes {#v17}

**1. Initial level.** Create a console program. Combine identical ingredients of two recipes in a map name→grams and print the total. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Collect the purchases with a name,unit pair as the key; do not add different units automatically. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Collect recipe ingredients in a map with a name,unit pair as the key; implement scaling servings and subtracting the available stock; include only a positive shortage in the shopping list, and explicitly settle units and rounding. Define the input data in the code; print the results of the operations and checks.

### Variant 18. A sparse matrix {#v18}

**1. Initial level.** Create a console program. Store the nonzero elements in a `map<pair<int,int>,double>` and check the index bounds. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Store the nonzero elements of sparse matrices in a `map<pair<int,int>,double>`; implement addition of matrices of the same size, removing an exact zero from the dictionary. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Store the nonzero elements of sparse matrices in a `map<pair<int,int>,double>`; implement multiplication of compatible matrices, compare a small result with a manual calculation, and test a zero matrix and incompatible sizes. Define the input data in the code; print the results of the operations and checks.

### Variant 19. A tournament {#v19}

**1. Initial level.** Create a console program. Count the teams’ points in a map for three matches: a win is 3, a draw 1, a loss 0. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Store a vector of matches and a map of goal and point statistics; rank by points, goal difference, and name. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Store matches with unique IDs in a vector and a map of team statistics (points: a win is 3, a draw 1; goals); implement correcting a result by rebuilding the table; reject a match of a team against itself and negative goals. Define the input data in the code; print the results of the operations and checks.

### Variant 20. A multilevel parking lot {#v20}

**1. Initial level.** Create a console program. Store free spots in a deque, hand out the first one, and put a returned one at the end; test a full parking lot. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Combine a map level→deque of spots with an unordered\_map license plate→spot; forbid a double entry. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Store a map level→deque of free spots and an unordered\_map license plate→spot; implement entry, exit, and moving a car between levels, refusing without changes if there are no spots; after the operations, check the total capacity and the uniqueness of spots. Define the input data in the code; print the results of the operations and checks.

### Variant 21. Website visitors {#v21}

**1. Initial level.** Create a console program. Count the unique sample IP strings in an unordered\_set; do not make any network requests. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Create a map day→set of IPs and print the unique visitors per day and for the whole period. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. From the given IPs and minutes, form sessions: a new one starts after a pause of more than 30 min; sort the records of each IP and count the sessions and visits. Define the input data in the code; print the results of the operations and checks.

### Variant 22. Chemical formulas {#v22}

**1. Initial level.** Create a console program. Count the atoms in the simple formulas H2O and CO2 using a map; support a symbol and an optional positive number. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Parse formulas without parentheses with one- and two-letter symbols; reject zero multipliers and unknown symbols. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Compute the molar mass of formulas without parentheses using a given sample table of masses; do not substitute zero for a missing mass, and print the contribution of each element. Define the input data in the code; print the results of the operations and checks.

### Variant 23. A checkout simulation {#v23}

**1. Initial level.** Create a console program. Store customers with a service duration in a queue, all arriving at time 0; compute the waiting time. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Model a single checkout with ordered arrival times and durations; start=max(arrival,free time); print the average wait. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Model two checkouts, assigning each customer to the one that becomes free earlier; on a tie, the first one. Test idle time, simultaneous arrivals, and an empty list. Define the input data in the code; print the results of the operations and checks.

### Variant 24. An exam schedule {#v24}

**1. Initial level.** Create a console program. Store a set of start,end pairs for one room; the intervals are half-open; find overlaps. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Build a map room→set of intervals and check for conflicts when adding; allow adjacent events. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Store a map room→set and a map group→set of half-open exam intervals; when adding an exam, check the availability of both the room and the group at once; a refusal changes neither index. Test a conflict in only one of the conditions. Define the input data in the code; print the results of the operations and checks.

### Variant 25. A library inventory {#v25}

**1. Initial level.** Create a console program. Store a multiset of book codes and count the copies of each code. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Store a multiset of library book codes; implement writing off one copy with erase(iterator) rather than the whole group; test a missing code. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Compare the expected multiset of copies with the actual one, and print the shortage and the surplus with their multiplicities; test a full match and repeats. Define the input data in the code; print the results of the operations and checks.

### Variant 26. Undoing actions {#v26}

**1. Initial level.** Create a console program. Create a stack of previous full texts; after two changes, perform undo and print the result. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Implement undo/redo with two stacks of states; a new change after undo clears redo. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Create an editor with insertion and deletion of an ASCII substring and two stacks of commands and undo data; test an empty history and a new branch of changes. Define the input data in the code; print the results of the operations and checks.

### Variant 27. A list-based playlist {#v27}

**1. Initial level.** Create a console program. Create a list of track titles, print them, and move the last one to the front using splice. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Support moving a track by ID between two playlists using list::splice, without copying values. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Store playlists as lists of tracks; move a range of tracks between lists using splice, preserving the order and checking that the positions are valid; for a move within one list, forbid a position inside the range. Define the input data in the code; print the results of the operations and checks.

### Variant 28. A hash table of students {#v28}

**1. Initial level.** Create a console program. Create a StudentKey{group,number} key with == and a hash, and store records in an unordered\_map. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Store sample student grades in an unordered\_map with a StudentKey{group,number} key and custom == and hash; implement updating a grade by key, and test the same number in different groups. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Store student records in an unordered\_map with a StudentKey{group,number} key; compare a custom hash with a deliberately constant hash on the same keys: the lookup results must match; show bucket\_count, load\_factor, and the largest bucket, and do not draw conclusions from a single timing. Define the input data in the code; print the results of the operations and checks.

### Variant 29. Expense tracking {#v29}

**1. Initial level.** Create a console program. Sum sample amounts in whole kopiykas by category using a map. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Create a map month→map category→amount and print the monthly and overall totals. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Store transactions with an ID, a month, a category, and an amount in kopiykas, plus totals in a map month→map category→amount; implement correcting a transaction by ID with the totals rebuilt; test a move between months, a negative refund, and that the other categories stay unchanged. Define the input data in the code; print the results of the operations and checks.

### Variant 30. Comparing containers {#v30}

**1. Initial level.** Create a console program. For the same 1000 numbers, compare the correctness of lookup in a vector and a set, testing existing and missing values. Define the input data in the code; print the results of the operations and checks.

**2. Basic level.** Create a console program. Measure insertion and lookup in vector, set, and unordered\_set on the same data in Release, repeat 5 times, and print the median. Define the input data in the code; print the results of the operations and checks.

**3. Advanced level.** Create a console program. Compare 3 data sizes and 3 containers, accounting for construction and lookup separately; record the seed, the version, and the optimization level, use the lookup result, and explain the effect of reserve. Define the input data in the code; print the results of the operations and checks.

## Procedure

1. Build the examples and compare the results with the ones shown.
1. Create a separate program for the chosen level of your variant.
1. Before implementing, write down the requirements, the valid data, and the expected results.
1. Test the ordinary, empty, and edge cases that make sense for the problem.
1. Save the code, the build commands, and the test results in a local Git repository.

Justify the chosen container with a table of operations and their complexity. For unordered containers, sort the report separately; do not rely on the bucket order.

## Report requirements

Submit the statement of the chosen task, the solution with an explanation of its invariants,
the build command, the MSVC version, the test data, and the actual output.
For expected errors, keep the negative test separate from the working program.
Explain the cause of the failure and the fix; a screenshot of the Error List alone is not enough.
