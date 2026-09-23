---
title: "Summary"
description: "Topic 5. Built-in collections: conclusions and review questions"
sourceHash: "35ab26ee65117e03fba9bc6cf66af4568f6ff426856481b3efbfa87fb09468b0"
---

# Summary

## Conclusions

A list is convenient for a mutable sequence, a tuple for a fixed record, a set for uniqueness, and a dictionary for access by key. `Counter`, `defaultdict`, and `deque` simplify common operations when their behavior matches the problem's rules. Copying, order, and hashability are part of the program's contract.

## Self-check questions

1. Which properties distinguish lists, tuples, sets, and dictionaries?
2. How does an out-of-bounds index differ from an out-of-bounds slice?
3. How does a negative step work, and why is `step=0` prohibited?
4. How does `append` differ from `extend`?
5. What do `sort`, `sorted`, and `pop` return?
6. Why is sorting by a tuple of keys convenient for a ranking?
7. How do you build independent matrix rows?
8. What does `copy` copy, and what does `deepcopy` copy?
9. Why is a tuple containing a list unsuitable as a dictionary key?
10. How do set difference and symmetric difference differ?
11. When do `get` and `setdefault` have different effects on a dictionary?
12. Which collection changes are dangerous during iteration?
13. How does `Counter.subtract` differ from the subtraction operator?
14. What are `maxlen`, `OrderedDict`, and `ChainMap` used for?
15. Why is `insort` O(n) even though finding the position is O(log n)?

## Useful links

- <https://docs.python.org/3.14/tutorial/datastructures.html>
- <https://docs.python.org/3.14/library/stdtypes.html>
- <https://docs.python.org/3.14/library/collections.html>
- <https://docs.python.org/3.14/library/copy.html>
- <https://docs.python.org/3.14/library/heapq.html>
- <https://docs.python.org/3.14/library/bisect.html>
