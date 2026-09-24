---
title: "Tasks"
description: "Topic 9. Generic programming: task variants"
outline: [2, 3]
sourceHash: "1e01dde8082809bae0c95f8979c2131a54629e8557020fa9718b0d670469825d"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

Use Kotlin/JVM and JDK 27. Each container must have a stated invariant. For node-based structures, do not substitute a ready-made collection for the implementation.

## Variants

### Variant 1. Service queue {#v1}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter customer names until an empty line; Queue&lt;T&gt; on nodes must add at the end and remove from the front. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter customer names until an empty line; Queue&lt;T&gt; on nodes must add at the end and remove from the front. Add peek and size; removal from an empty queue returns a separate result. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter customer names until an empty line; Queue&lt;T&gt; on nodes must add at the end and remove from the front. Add peek and size; removal from an empty queue returns a separate result; separate Source&lt;out T&gt; and Sink&lt;in T&gt;; test the order for Int and String. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 2. Parse result {#v2}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter lines with grades; Either&lt;String,T&gt; must separate non-integer text from a grade of 0..100. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter lines with grades; Either&lt;String,T&gt; must separate non-integer text from a grade of 0..100. Implement map, which transforms the success without changing the error. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter lines with grades; Either&lt;String,T&gt; must separate non-integer text from a grade of 0..100. Implement map, which transforms the success without changing the error; add flatMap for sequential checks and prove that an error stops the chain. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 3. Tuples {#v3}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter a name and an integer score; Duo&lt;A,B&gt; returns the swapped pair. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter a name and an integer score; Duo&lt;A,B&gt; returns the swapped pair. Add TripleValue&lt;A,B,C&gt; and a cyclic rotation of the triple. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter a name and an integer score; Duo&lt;A,B&gt; returns the swapped pair. Add TripleValue&lt;A,B,C&gt; and a cyclic rotation of the triple; justify the covariance of all parameters and test three rotations. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 4. Value ranges {#v4}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter two integer bounds and a number; Range&lt;T:Comparable&lt;T&gt;&gt; checks inclusion with both bounds included. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter two integer bounds and a number; Range&lt;T:Comparable&lt;T&gt;&gt; checks inclusion with both bounds included. Test ISO dates with the same class; reject reversed bounds. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter two integer bounds and a number; Range&lt;T:Comparable&lt;T&gt;&gt; checks inclusion with both bounds included. Test ISO dates with the same class; reject reversed bounds; add the intersection of two ranges with a sealed result for an empty intersection. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 5. Warehouse boxes {#v5}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter cargo names; Box&lt;out T&gt; stores one immutable Cargo element. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter cargo names; Box&lt;out T&gt; stores one immutable Cargo element. Add Cargo and FragileCargo and pass a box of fragile cargo as a box of cargo. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter cargo names; Box&lt;out T&gt; stores one immutable Cargo element. Add Cargo and FragileCargo and pass a box of fragile cargo as a box of cargo; implement a node-based Source&lt;out T&gt; of boxes without unsafe casts. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 6. Sorting requests {#v6}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter three requests with an id and a priority of 0..9; a generic function selects the minimum via Comparator&lt;T&gt;. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter three requests with an id and a priority of 0..9; a generic function selects the minimum via Comparator&lt;T&gt;. When priorities are equal, choose the smaller id; show another comparator. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter three requests with an id and a priority of 0..9; a generic function selects the minimum via Comparator&lt;T&gt;. When priorities are equal, choose the smaller id; show another comparator; use Comparator&lt;Request&gt; for UrgentRequest and explain contravariance. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 7. Physical units {#v7}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter two lengths; Quantity&lt;U&gt; stores a finite Double and adds only identical units. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter two lengths; Quantity&lt;U&gt; stores a finite Double and adds only identical units. Add the Meter and Second types and an explicit conversion of meters to kilometers. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter two lengths; Quantity&lt;U&gt; stores a finite Double and adds only identical units. Add the Meter and Second types and an explicit conversion of meters to kilometers; provide a negative compilation example for adding a length to a time; test overflow. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 8. Binary search tree {#v8}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter integers; BST&lt;T:Comparable&lt;T&gt;&gt; on nodes adds unique values and searches for a number. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter integers; BST&lt;T:Comparable&lt;T&gt;&gt; on nodes adds unique values and searches for a number. Implement in-order traversal and size; a duplicate does not change the tree. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter integers; BST&lt;T:Comparable&lt;T&gt;&gt; on nodes adds unique values and searches for a number. Implement in-order traversal and size; a duplicate does not change the tree; add deletion of a node with zero, one, and two children. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 9. Cached value {#v9}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter a string; Cached&lt;T&gt; computes the length only on the first get. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter a string; Cached&lt;T&gt; computes the length only on the first get. Add invalidate and a computation counter; show two independent caches. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter a string; Cached&lt;T&gt; computes the length only on the first get. Add invalidate and a computation counter; show two independent caches; support a nullable result with a separate state flag and test caching of null. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 10. Optional value {#v10}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter an integer or an empty line; sealed Option&lt;out T&gt; has Some and None. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter an integer or an empty line; sealed Option&lt;out T&gt; has Some and None. Add getOrElse and map for doubling the number. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter an integer or an empty line; sealed Option&lt;out T&gt; has Some and None. Add getOrElse and map for doubling the number; implement flatMap and test that None does not call the transformer. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 11. Priority queue {#v11}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter numbers; a generic node-based min-heap returns the smallest. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter numbers; a generic node-based min-heap returns the smallest. Support insertion and removal while restoring a complete tree; duplicates are allowed. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter numbers; a generic node-based min-heap returns the smallest. Support insertion and removal while restoring a complete tree; duplicates are allowed; check the heap invariant after each operation and use Comparable requests. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 12. Object registry {#v12}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: create a node-based registry of Any with strings and numbers; reified firstOf&lt;T&gt; returns the first match or null. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: create a node-based registry of Any with strings and numbers; reified firstOf&lt;T&gt; returns the first match or null. Add countOf&lt;T&gt; and test Int, String, and an absent type. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: create a node-based registry of Any with strings and numbers; reified firstOf&lt;T&gt; returns the first match or null. Add countOf&lt;T&gt; and test Int, String, and an absent type; show the limitation of nested type parameters using List&lt;String&gt; as an example, without an unsafe cast. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 13. Typed input {#v13}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter a type int/double/bool and text; reified parse&lt;T&gt; supports these three scalar types. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter a type int/double/bool and text; reified parse&lt;T&gt; supports these three scalar types. Invalid text and infinite numbers return a sealed error. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter a type int/double/bool and text; reified parse&lt;T&gt; supports these three scalar types. Invalid text and infinite numbers return a sealed error; compare the reified API with Parser&lt;T&gt; and add a custom Parser for an ISO date. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 14. Player inventory {#v14}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter an item's name and mass; Slot&lt;T:Item&gt; stores one item or nothing. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter an item's name and mass; Slot&lt;T:Item&gt; stores one item or nothing. Add Weapon and Potion; print the item and check that the mass is non-negative and finite. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter an item's name and mass; Slot&lt;T:Item&gt; stores one item or nothing. Add Weapon and Potion; print the item and check that the mass is non-negative and finite; separate out reading from in writing and test that slots are independent. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 15. Container terminal {#v15}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter a cargo code and mass; Container&lt;out T&gt; shows Cargo without changing it. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter a cargo code and mass; Container&lt;out T&gt; shows Cargo without changing it. Add RefrigeratedCargo with a temperature and a covariant source of containers. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter a cargo code and mass; Container&lt;out T&gt; shows Cargo without changing it. Add RefrigeratedCargo with a temperature and a covariant source of containers; implement a terminal capacity check without erasing the domain type. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 16. Action history {#v16}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter commands that append characters; History&lt;T&gt; on nodes stores previous values. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter commands that append characters; History&lt;T&gt; on nodes stores previous values. Add undo and an empty history that does not change the current text. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter commands that append characters; History&lt;T&gt; on nodes stores previous values. Add undo and an empty history that does not change the current text; add redo; a new action after undo clears the redo branch. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 17. Sensor readings {#v17}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter three readings; Reading&lt;T:Number&gt; stores a value and a sequence number. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter three readings; Reading&lt;T:Number&gt; stores a value and a sequence number. Compute min/max/mean via toDouble for Int and Double; reject NaN. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter three readings; Reading&lt;T:Number&gt; stores a value and a sequence number. Compute min/max/mean via toDouble for Int and Double; reject NaN; explain the loss of Long precision in toDouble and test large values. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 18. Product comparison {#v18}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter two products with a name and a price in kopiykas; a function with where Named and Comparable&lt;T&gt; selects the cheaper one. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter two products with a name and a price in kopiykas; a function with where Named and Comparable&lt;T&gt; selects the cheaper one. With equal prices, choose the lexicographically smaller name. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter two products with a name and a price in kopiykas; a function with where Named and Comparable&lt;T&gt; selects the cheaper one. With equal prices, choose the lexicographically smaller name; show another class with the same interfaces without changing the function. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 19. Competition podium {#v19}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter three unique athlete names; Podium&lt;out T:Athlete&gt; has three places. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter three unique athlete names; Podium&lt;out T:Athlete&gt; has three places. Add Runner and a covariant view of Podium&lt;Runner&gt; as Podium&lt;Athlete&gt;. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter three unique athlete names; Podium&lt;out T:Athlete&gt; has three places. Add Runner and a covariant view of Podium&lt;Runner&gt; as Podium&lt;Athlete&gt;; test that repeated participants are forbidden and the order of places is preserved. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 20. Linked list {#v20}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter strings; LinkedList&lt;T&gt; on nodes appends at the end and returns the elements one by one. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter strings; LinkedList&lt;T&gt; on nodes appends at the end and returns the elements one by one. Implement Iterator&lt;T&gt; with independent state for two traversals. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter strings; LinkedList&lt;T&gt; on nodes appends at the end and returns the elements one by one. Implement Iterator&lt;T&gt; with independent state for two traversals; define and test the policy for structural modification during traversal. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 21. Validators {#v21}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter a name; Validator&lt;in T&gt; returns a message or null; check that the name is not empty. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter a name; Validator&lt;in T&gt; returns a message or null; check that the name is not empty. Implement Validator&lt;Person&gt; and apply it to Student. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter a name; Validator&lt;in T&gt; returns a message or null; check that the name is not empty. Implement Validator&lt;Person&gt; and apply it to Student; combine two validators, returning the first or all messages according to an explicit mode. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 22. Data sources {#v22}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter three temperatures; Source&lt;out T&gt; returns the next value or a sealed end marker. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter three temperatures; Source&lt;out T&gt; returns the next value or a sealed end marker. Implement a WeatherReading source and its view as an Observation source. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter three temperatures; Source&lt;out T&gt; returns the next value or a sealed end marker. Implement a WeatherReading source and its view as an Observation source; pass the source to an observation consumer and test exhaustion without duplication. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 23. Category tree {#v23}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter a root and two children; Tree&lt;T&gt; stores nodes and prints a depth-first traversal. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter a root and two children; Tree&lt;T&gt; stores nodes and prints a depth-first traversal. Add search by equality and the depth of each node. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter a root and two children; Tree&lt;T&gt; stores nodes and prints a depth-first traversal. Add search by equality and the depth of each node; do not allow cycles or attaching the same node twice. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 24. Multicurrency wallet {#v24}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter two amounts in kopiykas; Money&lt;C:Currency&gt; adds amounts in one currency. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter two amounts in kopiykas; Money&lt;C:Currency&gt; adds amounts in one currency. Add UAH and EUR; perform conversion only explicitly, at a positive rate. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter two amounts in kopiykas; Money&lt;C:Currency&gt; adds amounts in one currency. Add UAH and EUR; perform conversion only explicitly, at a positive rate; specify a BigDecimal rounding rule and a negative example of mixing currencies. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 25. Leaderboard {#v25}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter names and scores; Leaderboard&lt;T:Comparable&lt;T&gt;&gt; on nodes keeps values ordered. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter names and scores; Leaderboard&lt;T:Comparable&lt;T&gt;&gt; on nodes keeps values ordered. Add top(k) and define the tie order and the behavior for k=0. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter names and scores; Leaderboard&lt;T:Comparable&lt;T&gt;&gt; on nodes keeps values ordered. Add top(k) and define the tie order and the behavior for k=0; test updating a result without duplicating the participant. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 26. Object factory {#v26}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter a type circle/rectangle; reified create&lt;T&gt; creates only known models with the given dimensions. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter a type circle/rectangle; reified create&lt;T&gt; creates only known models with the given dimensions. An unknown type returns a described error; dimensions are finite and positive. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter a type circle/rectangle; reified create&lt;T&gt; creates only known models with the given dimensions. An unknown type returns a described error; dimensions are finite and positive; compare with Factory&lt;out T&gt;, which receives parameters explicitly without reflection. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 27. Print queue {#v27}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter a document name and pages; PrintQueue&lt;T:Document&gt; on nodes serves FIFO. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter a document name and pages; PrintQueue&lt;T:Document&gt; on nodes serves FIFO. Add a priority of 0..9 with stable order for equal priorities. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter a document name and pages; PrintQueue&lt;T:Document&gt; on nodes serves FIFO. Add a priority of 0..9 with stable order for equal priorities; implement Sink&lt;in T&gt; and Source&lt;out T&gt; as different queue interfaces. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 28. Settings {#v28}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter a port and a name; Key&lt;T&gt; binds a key to a validator and a typed value. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter a port and a name; Key&lt;T&gt; binds a key to a validator and a typed value. Support Int and String without casts in the client code. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter a port and a name; Key&lt;T&gt; binds a key to a validator and a typed value. Support Int and String without casts in the client code; guard against identical key names with different types and test the nullable contract. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 29. Two-way conversion {#v29}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter a temperature; Bidirectional&lt;A,B&gt; has forward and backward for Celsius and Fahrenheit. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter a temperature; Bidirectional&lt;A,B&gt; has forward and backward for Celsius and Fahrenheit. Test both directions and the finiteness of the result. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter a temperature; Bidirectional&lt;A,B&gt; has forward and backward for Celsius and Fahrenheit. Test both directions and the finiteness of the result; test the round trip with a tolerance of 1e-9 over the given range -100..100. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 30. Event handlers {#v30}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27: enter an event code; Handler&lt;in E&gt; handles Event and the subtype ClickEvent. Print the result with labels; test the normal, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27: enter an event code; Handler&lt;in E&gt; handles Event and the subtype ClickEvent. Pass Handler&lt;Event&gt; where Handler&lt;ClickEvent&gt; is expected. Print the result with labels; test the normal, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27: enter an event code; Handler&lt;in E&gt; handles Event and the subtype ClickEvent. Pass Handler&lt;Event&gt; where Handler&lt;ClickEvent&gt; is expected; implement a chain of two handlers with a stable order and an error policy. Print the result with labels; test the normal, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a total; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

## Procedure

1. Write down the allowed type arguments and the container's operations.
2. Implement a complete console program with a validated input format.
3. Test the empty state, one element, several elements, and an error.
4. Use at least two different type arguments.
5. Keep a separate negative compilation example with an explanation.
6. Provide a table of inputs and actual results, the code, and a README.
7. During the presentation, explain the direction of one assignment with `in` or `out`.
