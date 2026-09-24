---
title: "Tasks"
description: "Topic 10. Arrays and collections: task variants"
outline: [2, 3]
sourceHash: "4cfcda416cc0326b8678c65c764ca04f1c6863425589bd7f184921313bc18c73"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

Specify Kotlin/JVM, JDK 27, and the input data contract. Handle an empty collection explicitly. In the report, define the order of rows so that the result can be compared with the expected one regardless of the hash table implementation.

## Variants

### Variant 1. Phone book {#v1}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a phone book. The user enters a name and a phone number; store contacts in a Map; a new phone number for an existing name replaces the old one. Implement adding contacts, viewing them, and printing a list of contacts ordered by name. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a phone book. The user enters a name and a phone number; store contacts in a Map; a new phone number for an existing name replaces the old one. Implement adding contacts, viewing them, and printing a list of contacts ordered by name. Additionally: search by prefix and a contact group. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a phone book. The user enters a name and a phone number; store contacts in a Map; a new phone number for an existing name replaces the old one. Implement adding contacts, viewing them, and printing a list of contacts ordered by name. Additionally: search by prefix and a contact group; an index of groups without duplicating contacts. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 2. Translation dictionary {#v2}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a translation dictionary. The user enters a word and a translation; store several translations of one word in a Set. Implement adding translations, viewing the dictionary, and looking up the translations of a given word. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a translation dictionary. The user enters a word and a translation; store several translations of one word in a Set. Implement adding translations, viewing the dictionary, and looking up the translations of a given word. Additionally: lookup in both directions. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a translation dictionary. The user enters a word and a translation; store several translations of one word in a Set. Implement adding translations, viewing the dictionary, and looking up the translations of a given word. Additionally: lookup in both directions; consistent removal from both indexes. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 3. School gradebook {#v3}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a school gradebook. The user enters a student's name and a grade of 0..100; store grades in a Map&lt;String,MutableList&lt;Int&gt;&gt;. Implement adding grades, viewing the gradebook, and printing the grades of a given student. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a school gradebook. The user enters a student's name and a grade of 0..100; store grades in a Map&lt;String,MutableList&lt;Int&gt;&gt;. Implement adding grades, viewing the gradebook, and printing the grades of a given student. Additionally: each student's average and an overall list of grades. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a school gradebook. The user enters a student's name and a grade of 0..100; store grades in a Map&lt;String,MutableList&lt;Int&gt;&gt;. Implement adding grades, viewing the gradebook, and printing the grades of a given student. Additionally: each student's average and an overall list of grades; merging two gradebooks with an explicit rule for repeats. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 4. Warehouse inventory {#v4}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for tracking warehouse stock. The user enters a product code and a quantity; store the stock in a MutableMap. Implement adding products, viewing them, and printing the current stock by code. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for tracking warehouse stock. The user enters a product code and a quantity; store the stock in a MutableMap. Implement adding products, viewing them, and printing the current stock by code. Additionally: receiving and shipping commands without a negative balance. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for tracking warehouse stock. The user enters a product code and a quantity; store the stock in a MutableMap. Implement adding products, viewing them, and printing the current stock by code. Additionally: receiving and shipping commands without a negative balance; a batch of operations: validate the whole batch before making changes. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 5. Unique visitors {#v5}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for tracking unique website visitors. The user enters a day and the visitor's IPv4 address; store a set of addresses for each day. Implement adding visits, viewing them, and the number of unique addresses per day. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for tracking unique website visitors. The user enters a day and the visitor's IPv4 address; store a set of addresses for each day. Implement adding visits, viewing them, and the number of unique addresses per day. Additionally: the intersection and difference of two days. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for tracking unique website visitors. The user enters a day and the visitor's IPv4 address; store a set of addresses for each day. Implement adding visits, viewing them, and the number of unique addresses per day. Additionally: the intersection and difference of two days; unique addresses for the whole period and the frequency of appearance by day. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 6. Tournament table {#v6}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a tournament table. The user enters a match result: the names of two teams and their goals; a win gives 3 points, a draw 1, a loss 0. Implement adding matches, viewing results, and a table of team points. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a tournament table. The user enters a match result: the names of two teams and their goals; a win gives 3 points, a draw 1, a loss 0. Implement adding matches, viewing results, and a table of team points. Additionally: goal difference and the order points/difference/name. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a tournament table. The user enters a match result: the names of two teams and their goals; a win gives 3 points, a draw 1, a loss 0. Implement adding matches, viewing results, and a table of team points. Additionally: goal difference and the order points/difference/name; rejecting a repeated match and recalculating a corrected one. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 7. Playlist {#v7}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for managing a playlist. The user enters a track name and a duration in seconds; store tracks in a MutableList. Implement adding tracks, viewing the playlist, and its total duration. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for managing a playlist. The user enters a track name and a duration in seconds; store tracks in a MutableList. Implement adding tracks, viewing the playlist, and its total duration. Additionally: moving by indices and search. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for managing a playlist. The user enters a track name and a duration in seconds; store tracks in a MutableList. Implement adding tracks, viewing the playlist, and its total duration. Additionally: moving by indices and search; shuffling with a given seed and a check that the multiset is preserved. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 8. Clinic queue {#v8}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for modeling an electronic queue in a clinic. The user enters a ticket number; store tickets in a FIFO queue on ArrayDeque. Implement adding tickets, viewing the queue, and calling the next ticket. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for modeling an electronic queue in a clinic. The user enters a ticket number; store tickets in a FIFO queue on ArrayDeque. Implement adding tickets, viewing the queue, and calling the next ticket. Additionally: two queues with a service priority, without medical conclusions. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for modeling an electronic queue in a clinic. The user enters a ticket number; store tickets in a FIFO queue on ArrayDeque. Implement adding tickets, viewing the queue, and calling the next ticket. Additionally: two queues with a service priority, without medical conclusions; serve no more than three priority tickets in a row while regular ones are waiting. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 9. Bus timetable {#v9}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a bus timetable. The user enters a route, a stop, and a departure time as a minute of the day 0..1439. Implement adding trips, viewing them, and the timetable of a given stop ordered by time. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a bus timetable. The user enters a route, a stop, and a departure time as a minute of the day 0..1439. Implement adding trips, viewing them, and the timetable of a given stop ordered by time. Additionally: the next trip after a given time. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a bus timetable. The user enters a route, a stop, and a departure time as a minute of the day 0..1439. Implement adding trips, viewing them, and the timetable of a given stop ordered by time. Additionally: the next trip after a given time; the minimum interval between trips at a shared stop. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 10. Library catalog {#v10}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a library catalog. The user enters a book's id, title, author, and genres; store books in a Map by id, and genres in a Set. Implement adding books, viewing the catalog, and finding a book by id. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a library catalog. The user enters a book's id, title, author, and genres; store books in a Map by id, and genres in a Set. Implement adding books, viewing the catalog, and finding a book by id. Additionally: author search and genre intersection. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a library catalog. The user enters a book's id, title, author, and genres; store books in a Map by id, and genres in a Set. Implement adding books, viewing the catalog, and finding a book by id. Additionally: author search and genre intersection; author and genre indexes with consistent removal of a book. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 11. Recipes {#v11}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a recipe collection. The user enters a recipe name and the set of its ingredients. Implement adding recipes, viewing them, and printing the ingredients of a given recipe. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a recipe collection. The user enters a recipe name and the set of its ingredients. Implement adding recipes, viewing them, and printing the ingredients of a given recipe. Additionally: recipes available from the ingredients at hand. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a recipe collection. The user enters a recipe name and the set of its ingredients. Implement adding recipes, viewing them, and printing the ingredients of a given recipe. Additionally: recipes available from the ingredients at hand; recipes with no more than two missing ingredients. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 12. Movie theater hall {#v12}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for tracking seats in a movie theater hall. The user sets the number of rows and seats per row 1..30 and enters a row and a seat; store seat states in an Array&lt;BooleanArray&gt;. Implement marking occupied seats, viewing the seating chart, and the number of free seats. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for tracking seats in a movie theater hall. The user sets the number of rows and seats per row 1..30 and enters a row and a seat; store seat states in an Array&lt;BooleanArray&gt;. Implement marking occupied seats, viewing the seating chart, and the number of free seats. Additionally: booking and cancellation without a repeated change. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for tracking seats in a movie theater hall. The user sets the number of rows and seats per row 1..30 and enters a row and a seat; store seat states in an Array&lt;BooleanArray&gt;. Implement marking occupied seats, viewing the seating chart, and the number of free seats. Additionally: booking and cancellation without a repeated change; finding k adjacent free seats with the lowest row number. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 13. Frequency analysis {#v13}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for word frequency analysis. The user enters a line of space-separated words; store word frequencies in a Map. Implement adding lines of text, viewing frequencies, and printing the frequency of a given word. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for word frequency analysis. The user enters a line of space-separated words; store word frequencies in a Map. Implement adding lines of text, viewing frequencies, and printing the frequency of a given word. Additionally: the top 10 by frequency descending, then by word. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for word frequency analysis. The user enters a line of space-separated words; store word frequencies in a Map. Implement adding lines of text, viewing frequencies, and printing the frequency of a given word. Additionally: the top 10 by frequency descending, then by word; comparing two texts by their common words and frequency differences. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 14. Duty roster {#v14}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for creating a duty roster. The user enters a list of names and a number of days 1..366. Implement adding names, viewing the list, and a roster showing the person on duty for each day. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for creating a duty roster. The user enters a list of names and a number of days 1..366. Implement adding names, viewing the list, and a roster showing the person on duty for each day. Additionally: cyclic assignment without repeats within one day. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for creating a duty roster. The user enters a list of names and a number of days 1..366. Implement adding names, viewing the list, and a roster showing the person on duty for each day. Additionally: cyclic assignment without repeats within one day; skipping unavailable people and an explicit rejection if no one is available. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 15. Maze {#v15}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for analyzing a maze. The user enters a rectangular field of `.` (passage) and `#` (wall) characters and the start coordinates. Implement entering the field, viewing it, checking that the start is on a passage, and counting the passable cells. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for analyzing a maze. The user enters a rectangular field of `.` (passage) and `#` (wall) characters and the start coordinates. Implement entering the field, viewing it, checking that the start is on a passage, and counting the passable cells. Additionally: BFS search for the exit via ArrayDeque. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for analyzing a maze. The user enters a rectangular field of `.` (passage) and `#` (wall) characters and the start coordinates. Implement entering the field, viewing it, checking that the start is on a passage, and counting the passable cells. Additionally: BFS search for the exit via ArrayDeque; reconstructing the shortest path and the unreachable case. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 16. Exchange rates {#v16}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a history of exchange rates. The user enters a currency code, an ISO date, and a positive finite rate. Implement adding rates, viewing a currency's history by date, and the currency's rate on a given date. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a history of exchange rates. The user enters a currency code, an ISO date, and a positive finite rate. Implement adding rates, viewing a currency's history by date, and the currency's rate on a given date. Additionally: min/max for each currency. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a history of exchange rates. The user enters a currency code, an ISO date, and a positive finite rate. Implement adding rates, viewing a currency's history by date, and the currency's rate on a given date. Additionally: min/max for each currency; a TreeMap of the history and the last known rate no later than the date. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 17. Friend network {#v17}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for modeling a network of friends. The user enters pairs of different names that are friends; store friendships symmetrically in a Map&lt;String,Set&lt;String&gt;&gt;. Implement adding pairs, viewing the network, and the list of friends of a given person. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for modeling a network of friends. The user enters pairs of different names that are friends; store friendships symmetrically in a Map&lt;String,Set&lt;String&gt;&gt;. Implement adding pairs, viewing the network, and the list of friends of a given person. Additionally: mutual friends of two people. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for modeling a network of friends. The user enters pairs of different names that are friends; store friendships symmetrically in a Map&lt;String,Set&lt;String&gt;&gt;. Implement adding pairs, viewing the network, and the list of friends of a given person. Additionally: mutual friends of two people; finding the shortest chain of friendship without traversal cycles. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 18. The Game of Life {#v18}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for simulating the Game of Life. The user enters a rectangular array of 0/1 cells; cells outside the field are considered dead, with no wrapping of the edges. Implement entering the field, viewing it, and the number of live neighbors of each cell. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for simulating the Game of Life. The user enters a rectangular array of 0/1 cells; cells outside the field are considered dead, with no wrapping of the edges. Implement entering the field, viewing it, and the number of live neighbors of each cell. Additionally: the next generation B3/S23 in a new array. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for simulating the Game of Life. The user enters a rectangular array of 0/1 cells; cells outside the field are considered dead, with no wrapping of the edges. Implement entering the field, viewing it, and the number of live neighbors of each cell. Additionally: the next generation B3/S23 in a new array; k generations and detection of a repeated state. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 19. Class attendance {#v19}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for tracking class attendance. The user enters the group list and the set of those present at a class. Implement adding the list and attendance marks, viewing them, and the number of those present. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for tracking class attendance. The user enters the group list and the set of those present at a class. Implement adding the list and attendance marks, viewing them, and the number of those present. Additionally: absent and unknown names. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for tracking class attendance. The user enters the group list and the set of those present at a class. Implement adding the list and attendance marks, viewing them, and the number of those present. Additionally: absent and unknown names; each person's attendance rate over several dates. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 20. Company structure {#v20}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a company structure. The user enters a department name and its parent department or a root marker. Implement adding departments, viewing the structure, and listing the direct subdepartments of a given department. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a company structure. The user enters a department name and its parent department or a root marker. Implement adding departments, viewing the structure, and listing the direct subdepartments of a given department. Additionally: traversal of descendants and depth. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a company structure. The user enters a department name and its parent department or a root marker. Implement adding departments, viewing the structure, and listing the direct subdepartments of a given department. Additionally: traversal of descendants and depth; rejecting cycles and moving a subtree. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 21. Online store cart {#v21}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for managing an online store cart. The user enters a product code, a quantity of 1..1000, and a price in kopiykas. Implement adding products, viewing the cart, and the cost of each line item. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for managing an online store cart. The user enters a product code, a quantity of 1..1000, and a price in kopiykas. Implement adding products, viewing the cart, and the cost of each line item. Additionally: adding and removing with a Long total. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for managing an online store cart. The user enters a product code, a quantity of 1..1000, and a price in kopiykas. Implement adding products, viewing the cart, and the cost of each line item. Additionally: adding and removing with a Long total; merging carts with rejection of conflicting prices. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 22. Metro map {#v22}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a metro map. The user enters a line name and the sequence of its stations. Implement adding lines, viewing the map, and the list of lines passing through a given station. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a metro map. The user enters a line name and the sequence of its stations. Implement adding lines, viewing the map, and the list of lines passing through a given station. Additionally: a graph of adjacent stations and the minimum number of rides. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a metro map. The user enters a line name and the sequence of its stations. Implement adding lines, viewing the map, and the list of lines passing through a given station. Additionally: a graph of adjacent stations and the minimum number of rides; a station/line vertex state and a search for the minimum number of transfers. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 23. Elections {#v23}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for counting votes in an election. The user enters a list of candidates with identifiers, and then votes by candidate identifier. Implement adding candidates and votes, viewing them, and the number of votes for each candidate. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for counting votes in an election. The user enters a list of candidates with identifiers, and then votes by candidate identifier. Implement adding candidates and votes, viewing them, and the number of votes for each candidate. Additionally: vote shares and the two leaders; show a tie explicitly. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for counting votes in an election. The user enters a list of candidates with identifiers, and then votes by candidate identifier. Implement adding candidates and votes, viewing them, and the number of votes for each candidate. Additionally: vote shares and the two leaders; show a tie explicitly; a win with more than 50% of the valid votes, or all contenders for the second place. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 24. Cloud storage {#v24}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for tracking files in cloud storage. The user enters a file path and its size in bytes as a Long. Implement adding files, viewing them, and the total size of the storage. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for tracking files in cloud storage. The user enters a file path and its size in bytes as a Long. Implement adding files, viewing them, and the total size of the storage. Additionally: totals for immediate folders. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for tracking files in cloud storage. The user enters a file path and its size in bytes as a Long. Implement adding files, viewing them, and the total size of the storage. Additionally: totals for immediate folders; totals for all ancestors and detection of a duplicated full path. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 25. Magic squares {#v25}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for checking magic squares. The user enters a square matrix of integers. Implement entering the matrix, viewing it, and the sum of each row. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for checking magic squares. The user enters a square matrix of integers. Implement entering the matrix, viewing it, and the sum of each row. Additionally: a check that the sums of rows, columns, and diagonals are equal. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for checking magic squares. The user enters a square matrix of integers. Implement entering the matrix, viewing it, and the sum of each row. Additionally: a check that the sums of rows, columns, and diagonals are equal; generating a normal square of odd order 3..15 and checking 1..n². Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 26. Text editor {#v26}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for a text editor with a change history. The user enters the commands replace (replace the current text with new text) and undo; store text snapshots in two stacks. Implement executing commands, viewing the current text, and undoing the last change. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for a text editor with a change history. The user enters the commands replace (replace the current text with new text) and undo; store text snapshots in two stacks. Implement executing commands, viewing the current text, and undoing the last change. Additionally: redo and clearing redo after a new replace. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for a text editor with a change history. The user enters the commands replace (replace the current text with new text) and undo; store text snapshots in two stacks. Implement executing commands, viewing the current text, and undoing the last change. Additionally: redo and clearing redo after a new replace; a limited history of the last 20 actions without changing the current state. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 27. Gym {#v27}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for tracking gym visits. The user enters a client and the set of their visit dates. Implement adding visits, viewing them, and the number of visits of each client. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for tracking gym visits. The user enters a client and the set of their visit dates. Implement adding visits, viewing them, and the number of visits of each client. Additionally: the common dates of two clients. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for tracking gym visits. The user enters a client and the set of their visit dates. Implement adding visits, viewing them, and the number of visits of each client. Additionally: the common dates of two clients; a membership with a limit and rejection of a repeated charge on the same day. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 28. Chemical elements {#v28}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a reference of chemical elements. The user enters an element's symbol, name, group 1..18, and positive atomic mass. Implement adding elements, viewing the reference ordered by symbol, and printing an element by its symbol. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a reference of chemical elements. The user enters an element's symbol, name, group 1..18, and positive atomic mass. Implement adding elements, viewing the reference ordered by symbol, and printing an element by its symbol. Additionally: search by symbol and by group. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for maintaining a reference of chemical elements. The user enters an element's symbol, name, group 1..18, and positive atomic mass. Implement adding elements, viewing the reference ordered by symbol, and printing an element by its symbol. Additionally: search by symbol and by group; a mass range and a check that symbols are unique. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 29. Weather stations {#v29}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for tracking weather station observations. The user enters a station name, an ISO date, and a finite temperature. Implement adding observations, viewing them, and the average temperature of each station. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for tracking weather station observations. The user enters a station name, an ISO date, and a finite temperature. Implement adding observations, viewing them, and the average temperature of each station. Additionally: a TreeMap of dates with min/max. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for tracking weather station observations. The user enters a station name, an ISO date, and a finite temperature. Implement adding observations, viewing them, and the average temperature of each station. Additionally: a TreeMap of dates with min/max; the common dates of two stations and the temperature difference. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 30. Survey {#v30}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 for counting survey results. The user enters a respondent and their answer A, B, or C. Implement adding answers, viewing them, and the count of each answer. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 for counting survey results. The user enters a respondent and their answer A, B, or C. Implement adding answers, viewing them, and the count of each answer. Additionally: an independent snapshot of the answers and the shares. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 for counting survey results. The user enters a respondent and their answer A, B, or C. Implement adding answers, viewing them, and the count of each answer. Additionally: an independent snapshot of the answers and the shares; a history of snapshots; prove that a new vote does not change an old report. Define the report order; test empty data, duplicates, and invalid values. Print the result or the reason for rejection. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

## Procedure

1. Choose a structure for each part of the data and explain the choice.
2. Define the unique keys, allowed duplicates, and the report order.
3. Implement input, validation, domain operations, and output.
4. Test empty data, duplicates, a missing key, and an invalid index.
5. Show which results are copies and which are live views.
6. Provide five actual checks and an estimate of the complexity of the main operation.
7. Keep the code and README in a local repository.
