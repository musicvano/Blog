---
title: Tasks
description: "Topic 12. Templates and Concepts: task variants"
outline: [2, 3]
sourceHash: "b6fdd28d002e222019ab9da9bd09ead8dc4e949b112a42261a13abf0cc8cc335"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

If specific test data is not given, choose it yourself and include it in the report. The training examples are not intended for working with real credentials or third-party files.

## Variants

### Variant 1. A generic matrix {#v1}

**1. Initial level.** Create a console program. Implement `Matrix<T,R,C>` on std::array with at access; test int and double and out-of-range access. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Implement `Matrix<T,R,C>` with addition of matrices of the same size; test two 2×3 matrices and the rejection for 2×2. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Implement multiplication of `Matrix<T,R,K>` by `Matrix<T,K,C>`. Constrain the arithmetic operations with a concept, test the result of 2×3 by 3×2 and a negative test of incompatible sizes. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 2. A ring buffer {#v2}

**1. Initial level.** Create a console program. Create `RingBuffer<T,N>` with adding and reading the first element; reject on overflow, and test N=2. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Create `RingBuffer<T,N>` that evicts the oldest element; for a capacity of 3, add 1, 2, 3, 4 and get 2, 3, 4. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Create `RingBuffer<T,N>` for move-only values, checked with a concept. Define a rejection policy on overflow, and test N=0, N=1 and moving a unique\_ptr without copying. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 3. A priority queue {#v3}

**1. Initial level.** Create a console program. Implement `PriorityQueue<T,Compare>` on a vector with a search for the highest-priority element; test the numbers 5, 1, 3. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Implement `PriorityQueue<T,Compare>` for training jobs with a priority and an arrival number; for equal priorities, serve the one added earlier. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Implement `PriorityQueue<T,Compare>` with a concept of a callable comparator. Compare the maximum and minimum order, test an empty queue and a negative test of an invalid comparator. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 4. An interval {#v4}

**1. Initial level.** Create a console program. Create `Interval<T>` for totally\_ordered types with a left&lt;=right check and contains; the bounds are inclusive. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Create `Interval<T>` with the intersection of closed intervals; return optional. Test \[1,3\] and \[3,5\], as well as non-intersecting bounds. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Create a booking template on half-open `Interval<T>`. Detect a conflict without including the right bound, reject an empty booking, and test adjacent and nested intervals. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 5. A fraction over integers {#v5}

**1. Initial level.** Create a console program. Implement `Fraction<integral T>` for positive denominators; test a zero denominator and printing the numerator/denominator. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Implement `Fraction<T>` with reduction through gcd and addition for int and long long; use small values without overflow. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Implement `Fraction<T>` with a signed integer T, sign normalization, addition and multiplication. State the allowed number limits and test zero, negative fractions and the rejection for double. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 6. A polynomial {#v6}

**1. Initial level.** Create a console program. Create `Polynomial<T>` with coefficients in a vector and evaluation by Horner’s method for int and double. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Create `Polynomial<T>` with addition of polynomials of different degrees and Horner’s method; represent the zero polynomial explicitly. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Create `Polynomial<T>` with a concept for the zero, addition and multiplication operations. Test double and your own Complex on x²+1; specify the order of the coefficients and test an empty sequence. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 7. A geometric vector {#v7}

**1. Initial level.** Create a console program. Implement `Vec<N,T>` with addition of coordinates; test N=2 for int and double. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Implement `Vec<N,T>` with the dot product and a double norm; test (3,4) and the zero vector. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Implement `Vec<N,T>` with a numeric concept, a norm and normalization to `Vec<N,double>`. Reject normalizing zero and compiling a product of different N. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 8. A histogram {#v8}

**1. Initial level.** Create a console program. Create `Histogram<T>` for three explicit intervals \[0,10), \[10,20), \[20,30); also count the values outside them. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Create `Histogram<T>` with ordered bounds in a vector; include the last right bound. Test all boundary values. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Create `Histogram<T>` with a numeric concept and arbitrary strictly increasing bounds; print the counts and the proportions, and do not divide by zero for an empty set. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 9. Strong identifiers {#v9}

**1. Initial level.** Create a console program. Implement `StrongId<Tag>` over int and create UserTag and BookTag; print two IDs. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Implement `StrongId<Tag>` with equality and ordering only for identical tags; write a negative test of comparing a user and a book. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Implement `StrongId<Tag>` with a positivity check and a function that looks up a record by a typed key. Prove with a negative test that passing a BookId to a UserId lookup is forbidden. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 10. A binary search tree {#v10}

**1. Initial level.** Create a console program. Create `BST<T>` with unique\_ptr nodes, insertion and search; ignore duplicates. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Create `BST<T>` with an ordering requirement and in-order traversal; test int and string, an empty tree and duplicates. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Create `BST<T,Compare>` with search and node removal, including the case of two children. Test the root, a leaf and a missing key; constrain the comparator with a concept. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 11. A linked list {#v11}

**1. Initial level.** Create a console program. Implement `List<T>` on unique\_ptr with push\_front and output for int and string. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Implement `List<T>` with removal of the first occurrence of a value and length counting; test an empty list. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Implement `List<T>` with deep copying and moving. Test the independence of copies, self-assignment, the empty state and a negative test of copying a move-only T. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 12. Table output {#v12}

**1. Initial level.** Create a console program. Write a variadic row that prints its arguments with a separator; test zero, one and three arguments. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Write a variadic row with the same minimum field width and a fold over the comma; test long strings and an empty pack. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Create typed row output with a separate width for each field, and check the number of fields with static\_assert. Test mixed types and a negative test of different counts. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 13. A typed log {#v13}

**1. Initial level.** Create a console program. Write a variadic log with an INFO/WARN level that prints the arguments through a fold, without global mutable state. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Write log(`std::format_string<Args...>`,Args&&...) with compile-time format checking; demonstrate two levels and an invalid format in a separate file. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Implement a `Logger<Sink>` template with a concept of a string sink, a level filter and a checked format\_string. Test a console sink and an accumulating sink and the absence of a filtered-out message. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 14. A value cache {#v14}

**1. Initial level.** Create a console program. Create `Cache<K,V>` on a vector of pairs with put/get; mark a missing key with optional. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Create `Cache<K,V>` with a limit of 3, updating an existing key and FIFO eviction; test int and string keys. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Create `Cache<K,V>` with a key equality concept, hit statistics and FIFO eviction. Test a zero capacity, a repeated key and the exact hit-rate value without dividing by zero. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 15. Measurement statistics {#v15}

**1. Initial level.** Create a console program. Write a Numeric mean for `vector<int>` and `vector<double>`; reject an empty sample. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Write a template for the median of a copy of a numeric sample; for an even count, take the mean of the two middle values without integer division. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Create Numeric statistics with the median, all modes and the population variance (division by n). Test empty data, all equal values and several modes. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 16. A generic binary search {#v16}

**1. Initial level.** Create a console program. Implement a search in a sorted `std::array<T,N>` that returns an optional index; test the bounds and a missing value. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Write a binary search template for a collection with size and indexing; test array and your own wrapper. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Write a search for the first occurrence with a comparator constrained by a concept in a sorted collection; test duplicates, empty data and reverse order with the matching comparator. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 17. A bit set {#v17}

**1. Initial level.** Create a console program. Create `Bits<N>` on `array<bool,N>` with set/test and index checking. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Create `Bits<N>` with union and intersection for the same N; test N=0 and disjoint sets. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Create `Bits<N>` on an array of integer blocks with complement and counting of ones. Do not count the unused bits of the last block; test N=1, 64, 65. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 18. Money amounts {#v18}

**1. Initial level.** Create a console program. Create `Money<Currency>` in integer kopiykas/cents and UAH/USD tags; print two amounts. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Create `Money<Currency>` with addition of the same currency; check that UAH+USD is forbidden with a separate negative test. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Create an explicit converter from `Money<From>` to `Money<To>` with a positive rate and rounding to the nearest minor unit. The rate is for training only and the amounts are limited; test 0 and the half case. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 19. A graph {#v19}

**1. Initial level.** Create a console program. Implement `Graph<Vertex>` as a list of edge pairs with a neighbor search; test int and string. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Implement `Graph<Vertex>` on unordered\_map with a concept of hashability and equality, and adding undirected edges without duplicates. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Implement `Graph<Vertex>` with BFS and the shortest path by the number of edges; test disconnection, a self-loop, an unknown start and your own hashable vertex type. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 20. An optional value {#v20}

**1. Initial level.** Create a console program. Create a training `Maybe<T>` on `std::optional<T>` with has\_value/value\_or; test the empty and the filled state. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Create `Maybe<T>` as an explicit adapter of optional with reset/emplace; test int and string, and forbid unchecked access. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Create `Maybe<T>` with map(F), which returns a Maybe of the call result. Check callability with a concept; an empty value must not call F. Verify this with a call counter. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 21. An event system {#v21}

**1. Initial level.** Create a console program. Create `Event<int>` with a vector of subscriber functions; call two listeners with one number. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Implement `Event<Args...>` that passes parameters to two subscribers; test the packs int,string and an empty one. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Implement `Event<Args...>` with a subscription ID and unsubscription. Forbid changing subscriptions during dispatch or work with a snapshot; describe the exception policy and test it. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 22. A sparse matrix {#v22}

**1. Initial level.** Create a console program. Create `SparseMatrix<T>` with a vector of row,column,value triples, fixed dimensions and returning T{} for a missing element. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Create `SparseMatrix<T>` with a set that removes a zero entry, and addition of matrices of the same size; test values cancelling out. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Create `SparseMatrix<T>` with a concept of addition, multiplication and zero; implement multiplication of compatible matrices and check that the result contains no explicit zeros. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 23. Tuple printing {#v23}

**1. Initial level.** Create a console program. Write code that prints a `tuple<int,double,string>` through std::get, and explain the type of each field. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Write a template for recursively printing a tuple of arbitrary length through a compile-time index; test an empty tuple. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Write tuple printing through std::apply and a fold, and compare it with the recursive version. Test 0, 1 and 4 fields, the order and the absence of an extra separator. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 24. A min-max heap {#v24}

**1. Initial level.** Create a console program. Create a `MinMaxHeap<T>` container on a vector with finding the minimum/maximum by a linear pass; state the actual complexity. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Implement `MinMaxHeap<T>` with extract\_min/extract\_max without requiring heap complexity; test duplicates and the empty state. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Implement a real min-max heap with alternating levels, logarithmic extraction of both extremes and an ordering concept. Check the invariant after each operation on 20 values. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 25. Measurable quantities {#v25}

**1. Initial level.** Create a console program. Create `Quantity<Tag,T>` for mass, length and time, with addition only for the same tag. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Create a quantity template with three integer dimension exponents; add only quantities with the same dimensions. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Create quantities with mass, length and time exponents; multiplication adds the exponents, and division subtracts them. Test velocity and acceleration and a negative test of adding a length to a time. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 26. Generic sorting {#v26}

**1. Initial level.** Create a console program. Write insertion\_sort for `vector<T>` with the &lt; operator; test int and string. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Write insertion\_sort with a comparator; sort training records by score while keeping the order of equal ones. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Write insertion\_sort with the strict\_weak\_order concept and test stability by two fields. State which semantic violations of the comparator the concept does not detect; test empty data. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 27. A leaderboard {#v27}

**1. Initial level.** Create a console program. Create `Leaderboard<Score>` with a name and a numeric score; find the best one for int and double. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Create `Leaderboard<Score>` with top(k), sorting names for equal scores; test k=0 and k greater than the number of participants. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Create `Leaderboard<Score>` that updates only a better result, ranks ties with the same rank and uses a numeric concept. Reject NaN for double. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 28. A range validator {#v28}

**1. Initial level.** Create a console program. Implement `Bounded<T,Min,Max>` for an integral T with a compile-time check of Min&lt;=Max and a check of the value in the constructor. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Implement `Bounded<T,Min,Max>` with a controlled set that does not change the state on failure; test the bounds and values one past them. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Implement `Bounded<T,Min,Max>` with addition that first checks machine overflow and the allowed range. Test a narrow range and the extreme values of the type. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 29. A string converter {#v29}

**1. Initial level.** Create a console program. Create `parse<T>` with an int specialization; require the whole string to be consumed, and test 42 and 42x. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Create `parse<T>` with int and double specializations and an optional result; reject an empty string and overflow. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Create `parse<T>` for int, double and bool with explicit true/false rules and full consumption. Reject an unsupported type at compile time; test spaces, trailing characters and limits. Set the demonstration data in the code; print the results of the operations and the check messages.

### Variant 30. A generic warehouse {#v30}

**1. Initial level.** Create a console program. Create `Inventory<Item>` on a vector with a concept that requires price(); compute the total of two items. Set the demonstration data in the code; print the results of the operations and the check messages.

**2. Basic level.** Create a console program. Create `Inventory<Item>` with HasPrice, a quantity and the total value; check that prices and quantities are non-negative. Set the demonstration data in the code; print the results of the operations and the check messages.

**3. Advanced level.** Create a console program. Create `Inventory<Item>` with a concept of a const price(), search by code and a shortage report. Test two different item types and a negative test of a missing price; compute the total in minor currency units. Set the demonstration data in the code; print the results of the operations and the check messages.

## Procedure

1. Build the examples and compare the results with the ones shown.
1. Create a separate program for the chosen level of your variant.
1. Write down the requirements, the allowed data and the expected results before implementing.
1. Test the ordinary, empty and boundary cases that make sense for the task.
1. Save the code, the build commands and the test results in a local Git repository.

Create separate files for the negative tests. In the report, compare the diagnostics with and without the concept, and explain each required template parameter.

## Report requirements

Include the statement of the chosen task, the solution with an explanation of the invariants, the build command, the MSVC version, the test data and the actual output. For expected errors, separate the negative test from the working program. Explain the cause of the failure and the fix; a screenshot of the Error List alone is not enough.
