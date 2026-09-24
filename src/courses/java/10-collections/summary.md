---
title: "Summary"
description: "Topic 10. Collections: conclusions and review questions"
sourceHash: "000ca083683272d4cde974831022ed08ad99df246b53b4b099f1b9473b2e4065"
---

# Summary

## Conclusions

Choosing a collection starts with the task's contract: order and duplicates, uniqueness, the rule for selecting the next element, or lookup by key. `List`, `Set`, `Queue`, `Deque`, and `Map` define different sets of operations, and the sequenced interfaces of Java 21 unify work with the first and last elements. Complexity estimates help compare structures but do not replace measurements. An iterator separates traversal from the container's structure, and a structural change outside it causes a fail-fast exception even in a single thread of execution. Hash structures rely on consistent `equals` and `hashCode` and on immutable keys, while `TreeSet` and `TreeMap` rely on a comparator that must distinguish all the required elements. `PriorityQueue` yields elements by priority only through `poll`, and `LinkedHashMap` can preserve insertion or access order. Live views and wrappers differ from unmodifiable copies, and none of them copies elements deeply. A collection algorithm is tested by the properties of its result and by test data with empty sets, duplicates, and ties.

## Review questions

1. Which properties does the task require: order, uniqueness, an index?
2. Why do ArrayList and LinkedList have different access costs?
3. How does an unmodifiable copy differ from a live wrapper?
4. Why can a TreeSet reject different objects with the same score?
5. Why is PriorityQueue iteration not a sorted report?
6. Which key change breaks lookup in a HashMap?
7. When does reading a LinkedHashMap change its order?

## Useful links

- <https://dev.java/learn/api/collections-framework/>.
- <https://openjdk.org/jeps/431>.
- <https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SequencedMap.html>.
- <https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashMap.html>.
