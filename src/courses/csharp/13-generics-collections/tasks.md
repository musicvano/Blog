---
title: "Tasks"
description: "Topic 13. Generics and collections: task variants"
outline: [2, 3]
sourceHash: "4de0e0ab815e014c1fda16f75254241fb8f8820d7ff97cf169b1fc86686fbc68"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Taxi service {#v1}

**1. Initial level.** Create an `Order` record (number, address, ride class) and a console program that adds several orders to a `Queue<Order>` and serves them in order of arrival, printing each served order.

**2. Basic level.** Create a taxi service console program with an order record (number, district, class: business, standard, economy; arrival time), a `PriorityQueue` of orders by class that preserves the order of arrival within the same class, and a dictionary of available drivers by district. The program assigns drivers and prints the waiting times.

**3. Advanced level.** Create a taxi dispatch class library: orders (number, coordinates, district), drivers with coordinates, selection of the nearest available driver through a `PriorityQueue` by distance, order cancellation, and statistics by district. A dotnet CLI application simulates a shift from an event log on standard input (order, cancellation, driver becomes available) and prints statistics; errors go to `Console.Error`.

### Variant 2. Glossary of terms {#v2}

**1. Initial level.** Create a `Dictionary<string, string>` of OOP terms and definitions. Print the definition of the entered term or a message that it is missing (`TryGetValue`).

**2. Basic level.** Create a console program for a glossary of OOP terms (a `Dictionary<string, string>` of terms and definitions) with case-insensitive search, a request counter in a second dictionary, and alphabetical output of the terms through a `SortedDictionary`. The program executes search, add, and statistics commands.

**3. Advanced level.** Create an OOP glossary class library: terms with definitions, synonyms (several keys for one definition), prefix search, and top requests. A dotnet CLI application imports the glossary from standard input (lines of the form “term; synonyms; definition”) and answers queries from command-line arguments; errors go to `Console.Error`.

### Variant 3. RPN calculator {#v3}

**1. Initial level.** Write a console program that evaluates an entered expression in reverse Polish notation (for example, `3 4 + 2 *`) with the operators `+`, `-`, `*`, and `/` using a `Stack<double>` and prints the result.

**2. Basic level.** Create your own array-based generic class `ArrayStack<T>` with `Push`, `Pop`, `TryPop`, and `Peek`, and a console calculator that uses it to evaluate an entered expression in reverse Polish notation (`3 4 + 2 *`) and reports errors: an unknown token, missing operands, division by zero.

**3. Advanced level.** Create a calculator library: a `yield return` iterator over the tokens of an infix expression, conversion to reverse Polish notation with the shunting-yard algorithm supporting parentheses and precedence, and evaluation through a `Stack<double>`. A dotnet CLI application evaluates expressions from standard input (one per line); errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 4. Tagged notes {#v4}

**1. Initial level.** Create a `Note` record with a title and a `HashSet<string>` of tags, and a console program that stores several notes in a list and prints the notes with the entered tag.

**2. Basic level.** Create a notes console program (a `Note` record with a title and a set of tags) with a `Dictionary<string, List<Note>>` index by tag and a search for notes that have all the entered tags (set intersection). The program prints the notes found.

**3. Advanced level.** Create a class library of notes with tags (`HashSet<string>`) and a tag index: renaming and merging tags, a tag cloud by frequency, and an “any of the tags” search. A dotnet CLI application processes commands for adding notes, working with tags, and searching from standard input; errors go to `Console.Error`.

### Variant 5. LRU cache {#v5}

**1. Initial level.** Write a console program that caches the results of a slow calculation (for example, the square of a number) in a `Dictionary<int, string>`, processes a sequence of number requests, and prints the number of cache hits and misses.

**2. Basic level.** Create a generic `LruCache<TKey, TValue>` class with limited capacity based on a dictionary and a `LinkedList<TKey>` that evicts the least recently used element. The console program processes the entered keys and shows the cache contents after each request.

**3. Advanced level.** Create a library with a generic LRU cache `LruCache<TKey, TValue>` of limited capacity (a dictionary and a `LinkedList<TKey>`) with entry lifetimes, hit statistics, and a `GetOrAdd` method that loads a missing value through an `IValueLoader<TKey, TValue>` interface. A dotnet CLI application compares the hit ratio for different capacities on a sequence of keys from standard input.

### Variant 6. City map {#v6}

**1. Initial level.** Write a console program that stores two-way roads between cities in a dictionary of adjacency lists `Dictionary<string, List<string>>` and prints the neighbors of each city.

**2. Basic level.** Create a city map console program (a dictionary of adjacency lists `Dictionary<string, List<string>>`) with breadth-first search using a `Queue<string>` and a dictionary of predecessors. The program finds and prints the route with the fewest roads between the entered cities.

**3. Advanced level.** Create a library with a generic weighted graph class `Graph<TNode>` (road lengths), Dijkstra’s algorithm with a `PriorityQueue`, and a connectivity check. A dotnet CLI application reads roads of the form “city1 city2 length” from standard input and prints the shortest route between the cities from the arguments; errors go to `Console.Error`.

### Variant 7. Browser history {#v7}

**1. Initial level.** Write a console program that simulates browser navigation to entered page addresses and the “Back” button using a `Stack<string>` and prints the current page after each action.

**2. Basic level.** Create a browser history console program with two `Stack<string>` stacks for the “Back” and “Forward” buttons, clearing of the “Forward” stack after a new navigation, and output of both stacks. The program executes the commands `open`, `back`, and `forward`.

**3. Advanced level.** Create a browser history library with tabs (a dictionary of tabs, each with “back” and “forward” history on stacks), a history depth limit, and a list of frequently visited sites. A dotnet CLI application processes a script of commands (`open`, `back`, `forward`, `tab`) from standard input; errors go to `Console.Error`.

### Variant 8. Unique visitors {#v8}

**1. Initial level.** Write a console program that, for an array of visitor logins for a day, counts the unique visitors using a `HashSet<string>` and prints their number and list.

**2. Basic level.** Write a console program that, for a week’s visit log (an array of logins for each day), uses `HashSet<string>` operations to determine the visitors who came every day (intersection), at least once (union), and the new ones for each day (difference), and prints a report.

**3. Advanced level.** Create a visit analytics library based on `HashSet<T>`: user retention (the share of those who returned after N days) and a comparison of lookup speed in `HashSet<T>` and `List<T>` on a large log. A dotnet CLI application processes a log of the form “date login” from standard input; errors go to `Console.Error`.

### Variant 9. League table {#v9}

**1. Initial level.** Write a console program that accumulates team points in a `Dictionary<string, int>` from the entered match results (“team1 team2 score”; a win is 3, a draw is 1) and prints the league table.

**2. Basic level.** Create a `Team` class with statistics (points, goals scored and conceded), an `IComparer<Team>` comparer (points, goal difference, goals scored), and a console program that processes the entered match results and prints the sorted `List<Team>`.

**3. Advanced level.** Create a library with a team class that implements `IComparable<T>` (points, goal difference, goals scored) and a generic class `Standings<T> where T : IComparable<T>` based on `SortedSet<T>` that keeps the table sorted after each match. A dotnet CLI application processes a season (rounds with match results) from standard input and prints the table after each round.

### Variant 10. Generic pairs {#v10}

**1. Initial level.** Create a generic class `Pair<TFirst, TSecond>` with the properties `First` and `Second`, and a console program that fills an array of “city – population” pairs and prints the pairs.

**2. Basic level.** Create a generic class `Pair<TFirst, TSecond>` and a generic method `MinMax<T>(T[] items) where T : IComparable<T>` that returns a `Pair<T, T>`. The console program applies the method to arrays of numbers, strings, and dates and prints the results.

**3. Advanced level.** Create a generic statistics library with the methods `MinMax` (returns a pair), `Median<T>`, and `Mode<T>` (a frequency dictionary) and the constraints `IComparable<T>` and `notnull`. A dotnet CLI application calculates statistics for numbers or strings from standard input according to the `--type` option; errors go to `Console.Error`.

### Variant 11. Flight schedule {#v11}

**1. Initial level.** Write a console program that stores flights in a `SortedDictionary<TimeOnly, string>` (departure time – destination) and prints the schedule in time order.

**2. Basic level.** Create a flight schedule console program based on a `SortedDictionary<TimeOnly, string>` (time – destination) with adding and canceling flights, finding the nearest flight after the entered time, and the flights in a given interval.

**3. Advanced level.** Create an airport schedule library: flights (number, destination, time, delay) in a collection sorted by time, a dictionary of flights by destination, delay tracking, and a generic iterator over flights in a time interval. A dotnet CLI application reads flights from standard input and prints the departure board for the time from the arguments; errors go to `Console.Error`.

### Variant 12. A queue on two stacks {#v12}

**1. Initial level.** Write a console program that pushes the entered numbers onto a `Stack<int>`, moves them to a second `Stack<int>`, and prints them in FIFO order, showing how two stacks form a queue.

**2. Basic level.** Create a generic class `TwoStackQueue<T>` (a queue on two stacks) with `Enqueue`, `Dequeue`, `TryPeek`, `Count`, and a `yield return` iterator. The console program performs the same operations on it and on a `Queue<T>` and compares the results.

**3. Advanced level.** Create a library with a generic queue that returns its minimum in O(1), `MinQueue<T> where T : IComparable<T>` (on two stacks that store the current minimum), and tests on large sequences. A dotnet CLI application calculates the minimum in a sliding window of a given size for numbers from standard input; errors go to `Console.Error`.

### Variant 13. Game inventory {#v13}

**1. Initial level.** Write a game inventory console program that stores items in a `Dictionary<string, int>` (name – quantity), adds and uses several items (an item with zero quantity is removed), and prints the inventory.

**2. Basic level.** Create an `Item` class (name, weight) and an inventory class with a total weight limit, stacks of identical items, and sorting by weight through an `IComparer<T>`. The console program executes the player’s commands: pick up, drop, show.

**3. Advanced level.** Create an inventory library: an `Item` base class (name, weight) with derived classes, generic slots `Slot<T> where T : Item` (an item and a quantity), crafting recipes (a dictionary of ingredients with quantities), and a check of whether crafting is possible. A dotnet CLI application processes commands from standard input; errors go to `Console.Error`.

### Variant 14. Print queue {#v14}

**1. Initial level.** Create a `PrintJob` record (document, number of pages) and a console program that puts several jobs in a `Queue<PrintJob>` and prints them one by one, printing each job.

**2. Basic level.** Create a console program that simulates a printer: print jobs (document, pages, urgency) in a `PriorityQueue` with priority by urgency and page count, job cancellation, and a report on the pages printed.

**3. Advanced level.** Create a print server library: print jobs (document, pages, priority), several printers, a dictionary of queues by printer, and redistribution of jobs when a printer fails. A dotnet CLI application processes an event log (new job, failure, recovery) from standard input and prints statistics; errors go to `Console.Error`.

### Variant 15. Thesaurus {#v15}

**1. Initial level.** Write a console program that stores synonyms in a `Dictionary<string, HashSet<string>>` and prints the synonyms of the entered word.

**2. Basic level.** Create a synonym dictionary console program (`Dictionary<string, HashSet<string>>`) with a symmetric relationship (if “large” is a synonym of “significant,” then the reverse is also true) and merging of groups when adding. The program executes commands for adding and searching for synonyms.

**3. Advanced level.** Create a thesaurus library with groups of synonyms (a disjoint-set structure), antonyms, and case-insensitive search. A dotnet CLI application loads the thesaurus from the file given in the arguments and replaces the words of a text from standard input with synonyms according to an option; errors go to `Console.Error`.

### Variant 16. Binary search tree {#v16}

**1. Initial level.** Create a binary search tree class for integers with the methods `Add` and `Contains`, and a console program that adds the entered numbers and checks for several values.

**2. Basic level.** Create a generic tree `BinarySearchTree<T> where T : IComparable<T>` with an in-order traversal through `yield return`, the minimum, the maximum, and the height. The console program builds a tree from the words of an entered text and prints the words in alphabetical order, the minimum, the maximum, and the height.

**3. Advanced level.** Create a library with a generic binary search tree `BinarySearchTree<T> where T : IComparable<T>` that implements `IEnumerable<T>`, with node removal, height, and breadth-first (`Queue`) and depth-first (`Stack`) traversals. A dotnet CLI application compares the tree height for sorted and shuffled numbers from standard input; errors go to `Console.Error`.

### Variant 17. Package dependency graph {#v17}

**1. Initial level.** Write a console program that stores package dependencies in a `Dictionary<string, List<string>>` (package – direct dependencies) and prints the direct dependencies of each package.

**2. Basic level.** Create a package dependency graph console program (`Dictionary<string, List<string>>`) that finds all transitive dependencies of the entered package by a traversal with a `HashSet<string>` of visited nodes and prints the dependency tree.

**3. Advanced level.** Create a package dependency graph library (a dictionary of lists) with topological sorting by Kahn’s algorithm (a `Queue` and a dictionary of in-degrees) and cycle detection. A dotnet CLI application reads lines of the form “package: dependencies” from standard input and prints the installation order; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 18. Business trip expenses {#v18}

**1. Initial level.** Create an `Expense` record (date, category, amount) and a console program that stores business trip expenses in a `List<Expense>`, calculates the total for each category in a dictionary, and prints it.

**2. Basic level.** Create a business trip expense console program (an `Expense` record: date, category, amount) that groups expenses by date in a `SortedDictionary<DateOnly, List<Expense>>`, checks daily limits by category (a dictionary of limits), and prints a report by day with overruns.

**3. Advanced level.** Create an expense report library: expenses (date, category, amount, currency), a dictionary of exchange rates, limits by category, and detection of overruns. A dotnet CLI application processes a CSV of expenses from standard input and prints a report in hryvnias; errors go to `Console.Error`.

### Variant 19. Operation result {#v19}

**1. Initial level.** Create a generic class `Result<T>` with the properties `IsSuccess`, `Value`, and `Error` and the static methods `Ok` and `Fail`. The console program divides two entered numbers and prints the value or a division-by-zero error.

**2. Basic level.** Create a generic class `Result<T>` (`IsSuccess`, `Value`, `Error`, the methods `Ok` and `Fail`) and a console program that, for several entered strings, parses a number, checks the range, and calculates the result without exceptions, collecting errors in a `List<string>` and printing them.

**3. Advanced level.** Create a validation library with a generic class `Result<T>` (success, value, errors), a generic rule interface `IRule<T>`, and accumulation of all validation errors. A dotnet CLI application validates questionnaires (name, age, email) from standard input and prints a report; errors go to `Console.Error`.

### Variant 20. Task scheduler {#v20}

**1. Initial level.** Write a console program that puts tasks into a `PriorityQueue<string, DateTime>` by deadline and executes (prints) them one by one, starting with the nearest deadline.

**2. Basic level.** Create a scheduler console program: tasks with deadlines in a `PriorityQueue<string, DateTime>`, task dependencies in a dictionary (a task becomes available after all its dependencies are completed), and a `HashSet` of completed tasks. The program prints the execution order.

**3. Advanced level.** Create a scheduler library: tasks (name, duration, deadline, dependencies), several workers, a queue of ready tasks, and detection of missed deadlines. A dotnet CLI application simulates the execution of a project from standard input and prints a character-based Gantt chart; errors go to `Console.Error`.

### Variant 21. Frequency analysis {#v21}

**1. Initial level.** Write a console program that counts the frequencies of letters of an entered text in a `Dictionary<char, int>`, ignoring case, and prints them.

**2. Basic level.** Write a console program that, for an entered text, counts letter and bigram frequencies in dictionaries, ignoring case, and prints the top 10 letters and bigrams, sorting the list of pairs with an `IComparer<T>` comparer.

**3. Advanced level.** Create a text frequency analysis library (dictionaries of letter frequencies) that detects the language (Ukrainian or English) by the deviation from reference frequencies. A dotnet CLI application breaks a Caesar cipher for a text from standard input by frequency analysis and prints the key and the decrypted text; errors go to `Console.Error`.

### Variant 22. Generic matrix {#v22}

**1. Initial level.** Create a generic class `Grid<T>` with a two-dimensional indexer and a method that fills it with a value. The console program creates and prints `int` and `char` grids.

**2. Basic level.** Create a generic class `Grid<T>` with a two-dimensional indexer, an iterator over all elements, an `IndexOf(T value)` search using `EqualityComparer<T>.Default`, and transposition. The console program demonstrates working with grids of different types.

**3. Advanced level.** Create a library with a `Matrix<T> where T : INumber<T>` class (indexer, dimensions) with addition and multiplication operations for `int`, `double`, and `decimal` (an overview of generic math). A dotnet CLI application multiplies two matrices from standard input with the type from the `--type` option; errors go to `Console.Error`.

### Variant 23. Social network {#v23}

**1. Initial level.** Write a console program that stores users’ friends in a `Dictionary<string, HashSet<string>>` and prints the mutual friends of two entered users.

**2. Basic level.** Create a social network console program (a `Dictionary<string, HashSet<string>>` of friends) with symmetric addition of friendships and “friends of friends” recommendations sorted by the number of mutual friends. The program executes add and recommendation commands.

**3. Advanced level.** Create a social graph library (a dictionary of friend sets) with the distance between users (breadth-first search) and community detection (connected components). A dotnet CLI application reads pairs of friends and queries from standard input and prints distances and communities; errors go to `Console.Error`.

### Variant 24. Undo/Redo {#v24}

**1. Initial level.** Write a console program that simulates text input: after each entered line, it saves the state on a `Stack<string>`, and on the `undo` command, it reverts the last action and prints the current text.

**2. Basic level.** Create a console text editor that stores commands (insert, delete) on stacks instead of full states and implements `Undo`/`Redo`. The program executes the entered editor commands and prints the text.

**3. Advanced level.** Create a change history library with a generic `ICommand<TState>` interface (`Execute`, `Undo`), `Undo`/`Redo` operations, command grouping, and a depth limit (`LinkedList`). A dotnet CLI application runs a text editing script from standard input and prints the result; errors go to `Console.Error`.

### Variant 25. Train composition {#v25}

**1. Initial level.** Write a console program that builds a train as a `LinkedList<string>` of cars, adds cars to the front and to the end, and prints the composition.

**2. Basic level.** Create a train composition console program (a `LinkedList<string>` of car numbers) with inserting a car after a given one, uncoupling a group of cars, and finding a car by number (`LinkedListNode`). The program executes shunting commands and prints the composition.

**3. Advanced level.** Create a classification yard library: numbered cars, several dead-end tracks (`Stack`), and assembling a train in a given order of cars with the minimum number of moves. A dotnet CLI application processes tasks (the initial and the required order) from standard input and prints the moves; errors go to `Console.Error`.

### Variant 26. Pet registry {#v26}

**1. Initial level.** Create a `Pet` class (chip, name, species) and a console program that stores animals in a `Dictionary<string, Pet>` by chip number and finds an animal by the entered number.

**2. Basic level.** Create a pet registry console program (a `Pet` class: chip, name, species, vaccination dates) in a `Dictionary<string, Pet>` by chip with a chip uniqueness check, grouping by species in a `Dictionary<string, List<Pet>>`, and a report on overdue vaccinations.

**3. Advanced level.** Create a library with a generic registry `Registry<TKey, TValue> where TKey : notnull` and indexes by several fields through an `IKeySelector<TValue, TIndex>` interface, and apply it to animals (chip, name, species, owner). A dotnet CLI application imports animals from standard input and runs queries by field; errors go to `Console.Error`.

### Variant 27. Multiset {#v27}

**1. Initial level.** Write a console program that counts the quantity of each entered product in a shopping cart using a `Dictionary<string, int>` and prints the result.

**2. Basic level.** Create a generic multiset class `Bag<T> where T : notnull` based on a dictionary with the methods `Add`, `Remove`, and `CountOf` and an iterator that returns each element as many times as it occurs. The console program demonstrates it on the words of an entered text.

**3. Advanced level.** Create a library with a generic multiset `Bag<T> where T : notnull` (a dictionary of counts) with union, intersection, and difference operations and a subset check. A dotnet CLI application checks whether a word can be made from the letters of another word for pairs from standard input; errors go to `Console.Error`.

### Variant 28. Bilingual dictionary {#v28}

**1. Initial level.** Write a console program with two dictionaries, “Ukrainian – English” and “English – Ukrainian,” that translates the entered words in both directions.

**2. Basic level.** Create a generic class `BiDictionary<TFirst, TSecond>` (a two-way dictionary on two `Dictionary` objects) with conflict checking (one word – several translations) and pair removal. The console program translates entered sentences word by word.

**3. Advanced level.** Create a bilingual dictionary library with several translations of a word (`Dictionary<string, SortedSet<string>>`) in both directions, frequency of use, and prefix search. A dotnet CLI application loads the dictionary from the file given in the arguments and translates a text from standard input with the most frequently used translations; errors go to `Console.Error`.

### Variant 29. Knockout tournament {#v29}

**1. Initial level.** Write a console program that puts the entered participants into a `Queue<string>` and builds and prints the first-round pairs of a knockout tournament.

**2. Basic level.** Write a knockout tournament console program: participants in a `Queue<string>`, ratings in a `Dictionary<string, int>`; the winner of a pair (the higher rating) goes to the end of the queue, and with an odd number, a participant advances automatically. The program prints the results of the rounds and the winner.

**3. Advanced level.** Create a knockout tournament library: participants with ratings, seeding by rating, a bracket for a number of participants that is not a power of two, and a consolation tournament. A dotnet CLI application runs a tournament using data from standard input (participants and ratings) and prints the bracket; errors go to `Console.Error`.

### Variant 30. Pagination {#v30}

**1. Initial level.** Write a console program that splits a `List<string>` of news items into pages of 5 elements and prints the page with the entered number.

**2. Basic level.** Create a generic class `Paginator<T>` with a page size, a number of pages, a current page property as `IReadOnlyList<T>`, forward and backward navigation, and bounds checking. The console program pages through a list of news items using commands.

**3. Advanced level.** Create a library with a generic class `Paginator<T>` (page size and count, the current page as `IReadOnlyList<T>`), a `yield return` iterator over pages, sorting through an `IComparer<T>`, and filtering through an `IFilter<T>` interface. A dotnet CLI application reads a product catalog from the file given in the arguments and pages through it using commands from standard input; errors go to `Console.Error`.

## Procedure

1. Study the theory and worked examples.
2. For your variant, identify the main data operations and choose collections; justify your choice by the complexity of the operations.
3. Create a solution and project; put each type in a separate file.
4. Implement generic types and methods with the necessary constraints for the chosen difficulty level; return internal collections as read-only interfaces.
5. Test working with empty collections and missing keys; inspect the contents of collections in the debugger.
6. Demonstrate the program to the instructor, explain the code, and answer the review questions.
