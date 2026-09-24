---
title: "Tasks"
description: "Topic 10. Collections: task variants"
outline: [2, 3]
sourceHash: "0b78d773e185e3e4bafaea8eb1bad0183ee57703b707aa54737172cc9d91a16c"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

In the report, justify your choice of interface and concrete implementation. The output order must be defined by the problem statement, not by the incidental behavior of HashMap.

## Variants

### Variant 1. Word frequencies {#v1}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter text in Latin letters; a HashMap counts words case-insensitively. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter text in Latin letters; a HashMap counts words case-insensitively; print a TreeMap in alphabetical order. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter text in Latin letters; a HashMap counts words case-insensitively; print a TreeMap in alphabetical order; add top-k by frequency, breaking ties by word. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 2. A phone book {#v2}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter a name and a number; a Map stores one number per name. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter a name and a number; a Map stores one number per name; support several unique numbers per name. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter a name and a number; a Map stores one number per name; support several unique numbers per name; add prefix search and test removing the last number. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 3. A training center queue {#v3}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter fictional requests with a priority of 1..5; a PriorityQueue serves the lower priority first. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter fictional requests with a priority of 1..5; a PriorityQueue serves the lower priority first; preserve arrival order for equal priorities. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter fictional requests with a priority of 1..5; a PriorityQueue serves the lower priority first; preserve arrival order for equal priorities; add cancellation by id; no real medical advice. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 4. Library loans {#v4}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter books and loans by id; a Map stores the current reader. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter books and loans by id; a Map stores the current reader; prohibit double loans and support returns. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter books and loans by id; a Map stores the current reader; prohibit double loans and support returns; add an ArrayDeque waiting queue for each book. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 5. A room schedule {#v5}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter a room and integer start and end hours; check for overlapping half-open intervals. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter a room and integer start and end hours; check for overlapping half-open intervals; store the schedule in a TreeMap and search for a free slot. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter a room and integer start and end hours; check for overlapping half-open intervals; store the schedule in a TreeMap and search for a free slot; add rescheduling only after checking all conflicts. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 6. A road network {#v6}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter undirected edges between cities; a Map from a city to a Set of neighbors. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter undirected edges between cities; a Map from a city to a Set of neighbors; find the path with the fewest edges using BFS. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter undirected edges between cities; a Map from a city to a Set of neighbors; find the path with the fewest edges using BFS; add city removal and test a disconnected graph. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 7. Sets of IP addresses {#v7}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter two lists of valid IPv4 addresses; find the intersection with a HashSet. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter two lists of valid IPv4 addresses; find the intersection with a HashSet; print the union and difference in numeric octet order. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter two lists of valid IPv4 addresses; find the intersection with a HashSet; print the union and difference in numeric octet order; normalize addresses without DNS lookups and report invalid lines. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 8. Browser history {#v8}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter open/back/forward commands; two Deques store the history. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter open/back/forward commands; two Deques store the history; a new address after back clears forward. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter open/back/forward commands; two Deques store the history; a new address after back clears forward; limit the history length and test empty navigation. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 9. Marathon results {#v9}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter a name, an age, and seconds; a List is sorted by time. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter a name, an age, and seconds; a List is sorted by time; split participants into explicitly specified age groups. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter a name, an age, and seconds; a List is sorted by time; split participants into explicitly specified age groups; build the top 3 of each group with the same tie rules. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 10. Warehouse reservations {#v10}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter a product and a nonnegative quantity; a Map stores the stock. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter a product and a nonnegative quantity; a Map stores the stock; add reservation and cancellation without a negative balance. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter a product and a nonnegative quantity; a Map stores the stock; add reservation and cancellation without a negative balance; reserve an order with several products completely or leave the state unchanged. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 11. A synonym graph {#v11}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter pairs of words; a Map to Set stores symmetric links. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter pairs of words; a Map to Set stores symmetric links; find all reachable synonyms without repetitions. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter pairs of words; a Map to Set stores symmetric links; find all reachable synonyms without repetitions; compute the connected components and sort each one. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 12. An LRU cache {#v12}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter a positive capacity and put/get commands; a LinkedHashMap works in access order. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter a positive capacity and put/get commands; a LinkedHashMap works in access order; evict the least recently used entry. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter a positive capacity and put/get commands; a LinkedHashMap works in access order; evict the least recently used entry; print the number of hits, misses, and evictions; an update does not increase the size. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 13. Priority deadlines {#v13}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter an id, a priority, and an ISO deadline; a PriorityQueue selects the lower priority, then the earlier date. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter an id, a priority, and an ISO deadline; a PriorityQueue selects the lower priority, then the earlier date; on a complete tie, compare ids. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter an id, a priority, and an ISO deadline; a PriorityQueue selects the lower priority, then the earlier date; on a complete tie, compare ids; add priority changes through removal and reinsertion. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 14. Lottery matches {#v14}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter two sets of distinct numbers 1..49; a Set finds the matches. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter two sets of distinct numbers 1..49; a Set finds the matches; check the range and an exact count of six numbers. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter two sets of distinct numbers 1..49; a Set finds the matches; check the range and an exact count of six numbers; process several tickets and print the distribution of match counts without win predictions. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 15. An attendance log {#v15}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter ISO dates and student ids; a TreeMap stores a Set of those present. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter ISO dates and student ids; a TreeMap stores a Set of those present; count attendance in a given inclusive date range. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter ISO dates and student ids; a TreeMap stores a Set of those present; count attendance in a given inclusive date range; show students with no attendance at all based on a separate group list. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 16. Recipe ingredients {#v16}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter a recipe and a set of ingredients; a Map to Set. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter a recipe and a set of ingredients; a Map to Set; find recipes whose ingredients are all in stock. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter a recipe and a set of ingredients; a Map to Set; find recipes whose ingredients are all in stock; for every other recipe, show the missing ingredients in alphabetical order. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 17. An airport schedule {#v17}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter a flight id and an ISO time; a TreeMap finds the nearest next time. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter a flight id and an ISO time; a TreeMap finds the nearest next time; support several flights at the same time. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter a flight id and an ISO time; a TreeMap finds the nearest next time; support several flights at the same time; add cancellation and search within a half-open time interval. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 18. Friends of friends {#v18}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter symmetric pairs of users; a Map to Set. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter symmetric pairs of users; a Map to Set; find second-degree friends, excluding yourself and direct friends. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter symmetric pairs of users; a Map to Set; find second-degree friends, excluding yourself and direct friends; rank candidates by the number of mutual friends, then by id. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 19. A family tree {#v19}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter an id and a parent id or none; a Map stores the children. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter an id and a parent id or none; a Map stores the children; print descendants with BFS without repetitions. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter an id and a parent id or none; a Map stores the children; print descendants with BFS without repetitions; check for cycles and missing parents before building. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 20. Undoing edits {#v20}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter text states; two Deques support undo/redo. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter text states; two Deques support undo/redo; a new change clears redo. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter text states; two Deques support undo/redo; a new change clears redo; add a history limit and prove that snapshots are independent. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 21. Anagram groups {#v21}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter words in Latin letters; a Map groups them by sorted letters. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter words in Latin letters; a Map groups them by sorted letters; ignore case and remove repeated words. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter words in Latin letters; a Map groups them by sorted letters; ignore case and remove repeated words; print groups of size two or more in a deterministic order. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 22. A license plate registry {#v22}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter car license plates as strings; a TreeSet stores the unique ones. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter car license plates as strings; a TreeSet stores the unique ones; find plates in an inclusive lexicographic range. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter car license plates as strings; a TreeSet stores the unique ones; find plates in an inclusive lexicographic range; add floor/ceiling and explicitly report a missing neighbor. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 23. Voting {#v23}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter the candidate on each ballot; a Map counts the votes. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter the candidate on each ballot; a Map counts the votes; determine the winner only by a strict majority of all valid votes. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter the candidate on each ballot; a Map counts the votes; determine the winner only by a strict majority of all valid votes; without one, choose two finalists and break ties by id. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 24. A meeting calendar {#v24}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter the start and end of meetings; a List sorts the intervals. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter the start and end of meetings; a List sorts the intervals; merge only overlapping intervals. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter the start and end of meetings; a List sorts the intervals; merge only overlapping intervals; show free slots within a given working day. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 25. A music chart {#v25}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter a track id and the number of plays; a Map accumulates them. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter a track id and the number of plays; a Map accumulates them; sort by descending count, then by id. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter a track id and the number of plays; a Map accumulates them; sort by descending count, then by id; compare two charts and show position changes and new tracks. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 26. A subway {#v26}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter stations and undirected connections; a Map to Set. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter stations and undirected connections; a Map to Set; find the fewest connections with BFS. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter stations and undirected connections; a Map to Set; find the fewest connections with BFS; print the path itself and test identical start and end stations. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 27. Game statistics {#v27}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter WIN/LOSS/DRAW enum events; an EnumMap counts each type. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter WIN/LOSS/DRAW enum events; an EnumMap counts each type; show zero for missing types. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter WIN/LOSS/DRAW enum events; an EnumMap counts each type; show zero for missing types; keep statistics for several players and print a stable ranking. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 28. Study groups {#v28}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter groups with a capacity and student applications; a Map stores the membership. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter groups with a capacity and student applications; a Map stores the membership; prohibit duplicate students and overfilling. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter groups with a capacity and student applications; a Map stores the membership; prohibit duplicate students and overfilling; add a waiting queue and automatic transfer after someone leaves. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 29. A spell checker {#v29}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter a dictionary and the words of a text; a HashSet identifies unknown words. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter a dictionary and the words of a text; a HashSet identifies unknown words; normalize case and show unique errors. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter a dictionary and the words of a text; a HashSet identifies unknown words; normalize case and show unique errors; suggest words with one insertion, deletion, or substitution of a Latin letter. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

### Variant 30. Price history {#v30}

**1. Initial level.** Create a complete Java console program on JDK 27. Enter a unique change id and a nonnegative price in cents; a SequencedMap preserves the order. Print a labeled result; test an empty set, duplicates, and invalid values.

**2. Basic level.** Create a complete Java console program on JDK 27. Enter a unique change id and a nonnegative price in cents; a SequencedMap preserves the order; show the first, the last, and a reversed report. Print a labeled result; test an empty set, duplicates, and invalid values.

**3. Advanced level.** Create a complete Java console program on JDK 27. Enter a unique change id and a nonnegative price in cents; a SequencedMap preserves the order; show the first, the last, and a reversed report; create an independent snapshot and test it after changing the original map. Print a labeled result; test an empty set, duplicates, and invalid values. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Print a table and totals. Errors go to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational error. Add automated tests of the model and the CLI.

## Procedure

1. Define the keys, equality, ordering, and allowed repetitions.
2. Implement input, the model, and report generation as separate methods.
3. Test an empty set, duplicates, equal sort keys, a failed lookup, and invalid values.
4. For views and copies, demonstrate the consequences of changing the source.
5. Submit the code, run commands, and a table of actual results.
