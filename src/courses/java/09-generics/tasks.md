---
title: "Tasks"
description: "Topic 9. Generics: task variants"
outline: [2, 3]
sourceHash: "d535218ea766571f453430e22e6c84c5d5109ed5f8f73817489e6fe11d1a33dc"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Procedure

1. Define the data types, allowed empty states, and the `null` policy.
2. Implement the initial, basic, or advanced level of your variant.
3. Separate console input, the generic model, and report generation.
4. Run normal, boundary, and invalid examples. For type bounds, add separate files that must not compile.
5. Explain every use of a wildcard, a bound, or warning suppression. Do not suppress warnings for the entire project.

## Variants

### Variant 1. Pairs and triples {#v1}

**1. Initial level.** Create a Java console program on JDK 27. Enter a name and an integer score; `Pair<A,B>` returns the swapped pair. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter a name and an integer score; `Pair<A,B>` returns the swapped pair; add `Triple<A,B,C>` with cyclic rotation. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter a name and an integer score; `Pair<A,B>` returns the swapped pair; add `Triple<A,B,C>` with cyclic rotation; test a double swap and three rotations for different types. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 2. Brackets and a stack {#v2}

**1. Initial level.** Create a Java console program on JDK 27. Enter a string with parentheses; check the balance with your own array-based `Stack<T>`. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter a string with parentheses; check the balance with your own array-based `Stack<T>`; support square and curly brackets and the position of the first error. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter a string with parentheses; check the balance with your own array-based `Stack<T>`; support square and curly brackets and the position of the first error; add capacity growth and also test the stack with integers. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 3. A sensor buffer {#v3}

**1. Initial level.** Create a Java console program on JDK 27. Enter a positive capacity and a sequence of integer measurements; `RingBuffer<T>` stores the latest values. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter a positive capacity and a sequence of integer measurements; `RingBuffer<T>` stores the latest values; add reading from oldest to newest without changing state. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter a positive capacity and a sequence of integer measurements; `RingBuffer<T>` stores the latest values; add reading from oldest to newest without changing state; test several full wraparounds and the same container with strings. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 4. A FIFO cache {#v4}

**1. Initial level.** Create a Java console program on JDK 27. Enter a positive capacity and key–value pairs; `Cache<K,V>` evicts the earliest added key. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter a positive capacity and key–value pairs; `Cache<K,V>` evicts the earliest added key; updating an existing key must not change the queue. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter a positive capacity and key–value pairs; `Cache<K,V>` evicts the earliest added key; updating an existing key must not change the queue; add hit and miss counters and demonstrate two key types. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 5. Closed ranges {#v5}

**1. Initial level.** Create a Java console program on JDK 27. Enter two integer bounds and a number; `Range<T>` bounded by Comparable checks membership. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter two integer bounds and a number; `Range<T>` bounded by Comparable checks membership; find the intersection of two ranges; mark an empty intersection explicitly. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter two integer bounds and a number; `Range<T>` bounded by Comparable checks membership; find the intersection of two ranges; mark an empty intersection explicitly; add a union only for overlapping ranges and test ISO dates. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 6. A numeric matrix {#v6}

**1. Initial level.** Create a Java console program on JDK 27. Enter the dimensions and a rectangular Integer matrix; `Matrix<T extends Number>` computes the sum as a double. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter the dimensions and a rectangular Integer matrix; `Matrix<T extends Number>` computes the sum as a double; check that the matrix is rectangular and add row sums. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter the dimensions and a rectangular Integer matrix; `Matrix<T extends Number>` computes the sum as a double; check that the matrix is rectangular and add row sums; test a Double matrix and reject null and infinite values. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 7. A parse result {#v7}

**1. Initial level.** Create a Java console program on JDK 27. Enter lines of integers; `Result<T,E>` separates an Integer success from a text error. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter lines of integers; `Result<T,E>` separates an Integer success from a text error; add mapping of the success through your own generic interface. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter lines of integers; `Result<T,E>` separates an Integer success from a text error; add mapping of the success through your own generic interface; build a chain of parsing and range checking without losing the original error. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 8. An array-based repository {#v8}

**1. Initial level.** Create a Java console program on JDK 27. Enter id–name records; `Repository<T>` stores objects implementing the Identified interface. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter id–name records; `Repository<T>` stores objects implementing the Identified interface; add lookup and removal by a unique id. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter id–name records; `Repository<T>` stores objects implementing the Identified interface; add lookup and removal by a unique id; test two record classes, duplicates, and the independence of the result array copy. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 9. A binary heap {#v9}

**1. Initial level.** Create a Java console program on JDK 27. Enter integers; `Heap<T>` with a Comparator returns the minimum. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter integers; `Heap<T>` with a Comparator returns the minimum; implement sift-up and sift-down in your own array. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter integers; `Heap<T>` with a Comparator returns the minimum; implement sift-up and sift-down in your own array; test requests with a priority and an id, and verify the invariant after every removal. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 10. Numeric statistics {#v10}

**1. Initial level.** Create a Java console program on JDK 27. Enter finite numbers; `Stats<T extends Number>` computes the count, minimum, and maximum. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter finite numbers; `Stats<T extends Number>` computes the count, minimum, and maximum; add the mean and the population variance with divisor n. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter finite numbers; `Stats<T extends Number>` computes the count, minimum, and maximum; add the mean and the population variance with divisor n; define the empty result and test Integer and Double without losing the fractional part. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 11. A search tree {#v11}

**1. Initial level.** Create a Java console program on JDK 27. Enter integer keys; `Node<T>` forms a binary tree ordered by a Comparator. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter integer keys; `Node<T>` forms a binary tree ordered by a Comparator; add search and in-order traversal; count duplicates in the node. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter integer keys; `Node<T>` forms a binary tree ordered by a Comparator; add search and in-order traversal; count duplicates in the node; implement removal of a node with two children and test string keys. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 12. A network of cities {#v12}

**1. Initial level.** Create a Java console program on JDK 27. Enter city names and undirected edges; `Graph<T>` checks adjacency. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter city names and undirected edges; `Graph<T>` checks adjacency; find a path with BFS using your own generic queue. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter city names and undirected edges; `Graph<T>` checks adjacency; find a path with BFS using your own generic queue; test a disconnected graph, self-loops, and vertices of another type. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 13. Warehouse crates {#v13}

**1. Initial level.** Create a Java console program on JDK 27. Enter products with a name and a weight; `Crate<T extends Product>` stores a product. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter products with a name and a weight; `Crate<T extends Product>` stores a product; compute the weight of a source of crates through an extends wildcard. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter products with a name and a weight; `Crate<T extends Product>` stores a product; compute the weight of a source of crates through an extends wildcard; move products into a super-wildcard destination and test the FragileProduct subtype. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 14. A doubly linked list {#v14}

**1. Initial level.** Create a Java console program on JDK 27. Enter strings; your own `LinkedList<T>` adds to the front and back. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter strings; your own `LinkedList<T>` adds to the front and back; add removal and traversal in both directions. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter strings; your own `LinkedList<T>` adds to the front and back; add removal and traversal in both directions; implement `Iterator<T>` with correct termination and test a list of integers. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 15. A leaderboard {#v15}

**1. Initial level.** Create a Java console program on JDK 27. Enter players with a name and a score; `Leaderboard<T>` sorts Comparable elements. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter players with a name and a score; `Leaderboard<T>` sorts Comparable elements; add an alternative Comparator and a stable order for equal scores. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter players with a name and a score; `Leaderboard<T>` sorts Comparable elements; add an alternative Comparator and a stable order for equal scores; apply `Comparable<? super T>` to a participant subclass and test the top-k boundary. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 16. A dictionary of pairs {#v16}

**1. Initial level.** Create a Java console program on JDK 27. Enter string keys and integer values; `Dictionary<K,V>` stores its own array of pairs. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter string keys and integer values; `Dictionary<K,V>` stores its own array of pairs; add replacement, lookup, and removal without duplicate keys. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter string keys and integer values; `Dictionary<K,V>` stores its own array of pairs; add replacement, lookup, and removal without duplicate keys; test object keys with equals and an unambiguous result for a missing key. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 17. A message queue {#v17}

**1. Initial level.** Create a Java console program on JDK 27. Enter texts; `Queue<T>` passes them to `Handler<? super T>` in FIFO order. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter texts; `Queue<T>` passes them to `Handler<? super T>` in FIFO order; add messages with an id and a base Object handler. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter texts; `Queue<T>` passes them to `Handler<? super T>` in FIFO order; add messages with an id and a base Object handler; define the handler failure policy: stop and keep the unprocessed element. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 18. Version history {#v18}

**1. Initial level.** Create a Java console program on JDK 27. Enter string states; `History<T>` stores the current and previous states. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter string states; `History<T>` stores the current and previous states; add undo and redo, clearing redo after a new change. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter string states; `History<T>` stores the current and previous states; add undo and redo, clearing redo after a new change; test a history of immutable records and explain why mutable objects must be copied. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 19. A time series {#v19}

**1. Initial level.** Create a Java console program on JDK 27. Enter ordered time–integer value pairs; `Series<T extends Number>` sums an interval. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter ordered time–integer value pairs; `Series<T extends Number>` sums an interval; add averages of non-overlapping windows of a given positive size. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter ordered time–integer value pairs; `Series<T extends Number>` sums an interval; add averages of non-overlapping windows of a given positive size; define the policy for an incomplete window and test Double and identical timestamps. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 20. A mixed basket {#v20}

**1. Initial level.** Create a Java console program on JDK 27. Enter products of the Book and Food subtypes; `Basket<T extends Product>` stores the elements. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter products of the Book and Food subtypes; `Basket<T extends Product>` stores the elements; the sum method accepts a producer extends Product. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter products of the Book and Food subtypes; `Basket<T extends Product>` stores the elements; the sum method accepts a producer extends Product; the transfer method accepts a consumer super T; test copying into the same basket. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 21. A multiset {#v21}

**1. Initial level.** Create a Java console program on JDK 27. Enter words; `MultiSet<T>` stores the count of each value. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter words; `MultiSet<T>` stores the count of each value; add removal of a single occurrence and the total size. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter words; `MultiSet<T>` stores the count of each value; add removal of a single occurrence and the total size; find the intersection with minimum multiplicities and test a custom key type. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 22. A sparse array {#v22}

**1. Initial level.** Create a Java console program on JDK 27. Enter a positive length and index–string pairs; `SparseArray<T>` stores only the assigned cells. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter a positive length and index–string pairs; `SparseArray<T>` stores only the assigned cells; add removal and traversal in index order. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter a positive length and index–string pairs; `SparseArray<T>` stores only the assigned cells; add removal and traversal in index order; distinguish an unassigned cell from null and test out-of-bounds access. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 23. Searching and sorting {#v23}

**1. Initial level.** Create a Java console program on JDK 27. Enter an array of words; a generic mergeSort sorts by a Comparator. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter an array of words; a generic mergeSort sorts by a Comparator; add binary search with the same ordering. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter an array of words; a generic mergeSort sorts by a Comparator; add binary search with the same ordering; return the first position of a duplicate and test reverse order and an array of records. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 24. A tournament bracket {#v24}

**1. Initial level.** Create a Java console program on JDK 27. Enter a nonzero number of participants that is a power of two; `Bracket<T>` builds the pairs. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter a nonzero number of participants that is a power of two; `Bracket<T>` builds the pairs; choose the winner of each pair through your own `Judge<T>` interface. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter a nonzero number of participants that is a power of two; `Bracket<T>` builds the pairs; choose the winner of each pair through your own `Judge<T>` interface; test players and teams, and reject a result that is not a participant of the pair. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 25. Composing validations {#v25}

**1. Initial level.** Create a Java console program on JDK 27. Enter strings; `Validator<T>` checks that text is not empty. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter strings; `Validator<T>` checks that text is not empty; add and-composition that stops after the first error. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter strings; `Validator<T>` checks that text is not empty; add and-composition that stops after the first error; test a base `Validator<Object>` for strings and keep the rejection explanation. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 26. Typed units {#v26}

**1. Initial level.** Create a Java console program on JDK 27. Enter two lengths; `Quantity<U extends Unit>` stores a finite value. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter two lengths; `Quantity<U extends Unit>` stores a finite value; add separate Meter and Second types and addition of matching units only. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter two lengths; `Quantity<U extends Unit>` stores a finite value; add separate Meter and Second types and addition of matching units only; prove with a negative compilation example that adding time to length is prohibited, and test null. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 27. A category tree {#v27}

**1. Initial level.** Create a Java console program on JDK 27. Enter a category hierarchy with unique ids; `Tree<T>` traverses nodes depth-first. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter a category hierarchy with unique ids; `Tree<T>` traverses nodes depth-first; add search and height computation. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter a category hierarchy with unique ids; `Tree<T>` traverses nodes depth-first; add search and height computation; prohibit cycles when reparenting and test moving the root. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 28. A circular deque {#v28}

**1. Initial level.** Create a Java console program on JDK 27. Enter commands and integer values; an array-based `Deque<T>` adds at both ends. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter commands and integer values; an array-based `Deque<T>` adds at both ends; implement removal from both ends and capacity growth. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter commands and integer values; an array-based `Deque<T>` adds at both ends; implement removal from both ends and capacity growth; test the order after wraparound, growth, and alternating operations for strings. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 29. An event log {#v29}

**1. Initial level.** Create a Java console program on JDK 27. Enter Move and Score events; `Journal<T extends Event>` preserves the order. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter Move and Score events; `Journal<T extends Event>` preserves the order; select a subtype through a passed `Class<S>` and Class.cast. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter Move and Score events; `Journal<T extends Event>` preserves the order; select a subtype through a passed `Class<S>` and Class.cast; test an empty result and do not apply an unchecked cast to S. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

### Variant 30. Comparator algorithms {#v30}

**1. Initial level.** Create a Java console program on JDK 27. Enter name–price records; a generic max selects by a `Comparator<? super T>`. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**2. Basic level.** Create a Java console program on JDK 27. Enter name–price records; a generic max selects by a `Comparator<? super T>`; add sorting and binary search with the same comparator. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy.

**3. Advanced level.** Create a Java console program on JDK 27. Enter name–price records; a generic max selects by a `Comparator<? super T>`; add sorting and binary search with the same comparator; test a base class comparator on subclasses and define the policy for equal keys. Print a labeled result. Test the normal, empty or single-element, and invalid cases; state the null policy. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. Present a table with a summary. Write errors to stderr; exit codes: 0 – success/help, 2 – invalid input, 1 – operational failure. Add automated tests of the algorithm and the CLI.

## Report contents

1. Problem statement, operation contracts, and a type diagram.
2. Program code, compilation commands, and actual results.
3. A table of checks: input, expected result, and actual result.
4. A conclusion about the parameter bounds and the absence of unsafe casts.
