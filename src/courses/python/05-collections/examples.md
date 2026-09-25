---
title: "Program examples and common mistakes"
description: "Topic 5. Built-in collections: program examples and common mistakes"
outline: [2, 3]
sourceHash: "498d2f3929945590fbcd218e0a22c6f0a8da72100a3b93203fe571e1e1b45782"
---

# Program examples and common mistakes

## Program examples

### A group gradebook

Store lists of grades, calculate each student's average, and print a ranking. An empty list means no grades, not an average of zero. Valid grades are integers from 0 to 100. For equal averages, sort names using Python's ordinary string order. The example data is defined in the code.

```py
def ranking(
    journal: dict[str, list[int]],
) -> list[tuple[str, float]]:
    result: list[tuple[str, float]] = []
    for name, marks in journal.items():
        if any(mark < 0 or mark > 100 for mark in marks):
            raise ValueError("Grade outside 0..100")
        if marks:
            result.append((name, sum(marks) / len(marks)))
    return sorted(result, key=lambda item: (-item[1], item[0]))


journal = {"Oleh": [80, 90], "Anna": [90, 80], "Ira": []}
for number, (name, average) in enumerate(ranking(journal), 1):
    print(f"{number}. {name:<8} {average:6.2f}")
missing = sorted(name for name, marks in journal.items()
                 if not marks)
print("No grades:", ", ".join(missing))
```

```text
1. Anna      85.00
2. Oleh      85.00
No grades: Ira
```

The `lambda` expression defines a key function, as in the topic on functions. `any` checks whether at least one grade is invalid. The expression `condition for element in source` without square brackets is a **generator expression**: it supplies results one at a time without building a list. Here, `any` consumes it; the mechanism will be covered in detail in Topic 7. The function does not modify `journal`, so the report can be repeated. Rounding occurs only when printing. An empty gradebook produces an empty ranking. For `[0, 100]`, the average is 50; a grade of 101 is rejected.

In PyCharm, set a breakpoint on the printing loop, run *Debug*, and expand `journal` in *Threads & Variables*. Compare the dictionary's length with the lengths of its nested lists (Fig. 5.6).

![A nested dictionary of lists in the PyCharm debugger](./images/06-pycharm-debugger-collections.png)

Figure 5.6. A nested dictionary of lists in the PyCharm debugger {.caption}

### A queue to see a doctor

In this learning model, regular visitors are served in arrival order, with urgent visitors served first. A lower priority number means earlier service; for equal priorities, the earlier arrival goes first. This is a data structure model. The queues have no limit that discards records.

```py
from collections import deque
from heapq import heappop, heappush


def service_order(
    regular: list[str], urgent: list[tuple[int, str]],
) -> list[str]:
    queue = deque(regular)
    heap: list[tuple[int, int, str]] = []
    for serial, (priority, name) in enumerate(urgent):
        if priority < 1:
            raise ValueError("Priority must be positive")
        heappush(heap, (priority, serial, name))
    served: list[str] = []
    while heap or queue:
        if heap:
            _, _, name = heappop(heap)
        else:
            name = queue.popleft()
        served.append(name)
    return served


regular = ["Anna", "Oleh"]
urgent = [(2, "Ira"), (1, "Yurii"), (1, "Bohdan")]
print(" → ".join(service_order(regular, urgent)))
```

Output: `Yurii → Bohdan → Ira → Anna → Oleh`. The `serial` number prevents names from determining the order when priorities are equal. The function does not empty the caller's lists. For empty sources it returns `[]`; with no urgent visitors it preserves the order of `regular`. This processes a prepared batch, with no arrivals during service.

### Shared interests

Given the tags of two participants and a set of topics for upcoming meetings, find shared and differing interests and available topics for a joint meeting. Leading and trailing whitespace and case do not matter; empty tags are ignored. Sort the results for a stable report.

```py
def normalize(values: list[str]) -> set[str]:
    return {value.strip().casefold() for value in values
            if value.strip()}


first = normalize([" Python ", "Music", "python", ""])
second = normalize(["PYTHON", "Chess"])
available = normalize(["Python", "Sport"])
print("Shared:", ", ".join(sorted(first & second)))
print("First only:", ", ".join(sorted(first - second)))
print("Different:", ", ".join(sorted(first ^ second)))
print("For the meeting:", sorted(first & second & available))
```

```text
Shared: python
First only: music
Different: chess, music
For the meeting: ['python']
```

The union `first | second` would give all topics that interest at least one participant. Intersection requires membership in both sets. Normalizing before creating the set removes duplicates that differed in case. An empty list becomes an empty set.

### Inventory tracking

Deliveries are given as “name–quantity” pairs, and sales as a list of the names of sold units. Group deliveries, count sales, and show balances. Zero balances remain in the report. An unknown sold item or sales exceeding stock are errors. Delivery quantities are positive integers.

```py
from collections import Counter, defaultdict


def balances(
    deliveries: list[tuple[str, int]], sold: list[str],
) -> dict[str, int]:
    stock: defaultdict[str, int] = defaultdict(int)
    for name, quantity in deliveries:
        if not name or quantity <= 0:
            raise ValueError("Invalid delivery")
        stock[name] += quantity
    counts = Counter(sold)
    for name, quantity in counts.items():
        if quantity > stock.get(name, 0):
            raise ValueError(f"Insufficient stock: {name}")
    return {name: quantity - counts[name]
            for name, quantity in stock.items()}


deliveries = [("notebook", 5), ("pen", 4), ("notebook", 2)]
sold = ["pen", "notebook", "pen"]
result = balances(deliveries, sold)
for name in sorted(result):
    print(f"{name:<8} {result[name]:>3}")
print("Total:", sum(result.values()))
```

```text
notebook   6
pen        2
Total: 8
```

Checking through `stock.get` does not create a key on an error. The sources remain unchanged. A completely sold-out item has a value of 0; subtracting two `Counter` objects would remove it. Empty deliveries and sales produce `{}`.

## Common mistakes and checking a solution

Check invariants: properties that must remain true after every operation. Matrix rows have equal lengths; in a directory, a key uniquely identifies a contact; in a queue, every accepted record must be processed exactly once.

- `result = values.sort()` gives `None`: use `sorted(values)` or run `values.sort()` as a separate statement.
- `[[0] * width] * height` shares a row between positions: create rows separately with a comprehension.
- `d[key]` may raise `KeyError`: decide whether absence is an error or allows a fallback through `get`.
- `set([1, 1, 2])` loses multiplicity: choose `Counter` for frequencies.
- `a.copy()` does not separate nested lists: check the required copy depth with a test assignment.
- Removing from a list in a loop skips elements: create a new result or process a snapshot.
- `zip` without `strict=True` can hide incomplete data: decide whether unequal lengths are acceptable and check explicitly.

Test an empty collection, one element, duplicates, a missing key, and an ordinary data set. For sorting, add a tie on the first criterion; for a matrix, nonrectangular data; for a queue, equal priorities. Also check whether the source changed: a correct number in the report does not justify an unwanted side effect.
