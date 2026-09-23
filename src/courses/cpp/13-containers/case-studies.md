---
title: "Case studies and common mistakes"
description: "Topic 13. Containers: Case Studies and Common Mistakes"
outline: [2, 3]
sourceHash: "d86348d3f44e2a844e1cce731bae73439acd72509303c54b875d54f9696358d8"
---

# Case studies and common mistakes

## Scenario walkthrough: a catalog and two independent orders

Consider a catalog of books with a code, an author, a title, and the number
of copies. The requirement “lookup by code” naturally leads to map or
`unordered_map`. The requirement “all books by an author” has a different key and allows
repeats. A single container is not obliged to provide
both interfaces with the best complexity at the same time. You can store the main
records by code, and a secondary index – author → book codes.

In such a model, the secondary index should not contain copies of whole
mutable records. Otherwise, changing a title in the main storage will not
change the second copy. A reference by ID is easier to check: every
code in the index must exist in the main storage, and the author must match
the record. If a small catalog does not need a fast second lookup,
a plain linear pass can be simpler and more reliable than
maintaining two indexes.

Now suppose you need to change a book’s author. The order of steps matters:
find the record, check that the new author is valid, prepare
the new index, remove the old link, and change the main record.
If an exception is possible in the middle of the operation, you must define the consistency
guarantee. For a small teaching database, you can build the new
state in a copy and swap it in after the checks succeed. This is more expensive,
but it makes the guarantee clear.

Table 13.1. Keeping two indexes of one catalog consistent {.caption}

| Operation | Main storage | Author index |
| --- | --- | --- |
| Adding | A new unique code | Add the code to the author’s group |
| Changing the title | Change the record field | No changes needed |
| Changing the author | Update the author | Move the code between groups |
| Removing | Remove the code | Remove the link and an empty group |

Tests should check more than a nice-looking report. After a book is removed,
no index should return its code. After an author is renamed,
the total number of books does not change. Adding
the same code again must either be rejected or perform an explicitly defined
update; these two policies must not be mixed by accident by using []
in one place and insert in another.

### When one vector is enough

If there are only a few dozen records, they change rarely, and the report
has to be printed in several orders, a vector is a good start.
You can keep the main order, and for the report create a vector of indices
or a copy of the filtered records. This separates the storage order
from the presentation order. However, indices also need updating
after removal from the middle, so you should not keep them indefinitely.

A vector is especially convenient for batch processing: load all the data,
sort it once, and perform many reads. A map can be more convenient
for constant insertions while maintaining order. A hash table wins
in a different scenario: frequent exact lookups by key without range
queries. None of these statements is a universal ranking of containers.

## Common mistakes reproduced with small traces

The first case: a dictionary has one entry `A → 10`. You only want to
check B and write `if (prices["B"] == 0)`. After the check,
the dictionary already has two keys, because [] created B. Now size reports
2, and the report contains a made-up zero. The correct way to read depends
on the policy for missing keys: contains, find, or at, but not an implicit insertion.

The second case: a multiset contains `{2,2,2,5}`. The call `erase(2)`
removes all equivalent keys. To write off one copy,
first call find, then erase by iterator if it is not end.
The expected result is then `{2,2,5}`. The difference between the overloads has
a direct domain meaning: one copy versus all copies.

The third case: a ranking set compares only the score. Two different players
with a score of 100 become equivalent keys, and the second one is not inserted.
If you need both, add a unique ID to the comparator as a second
criterion, or use a multiset with a different lookup model.
The player’s operator == will not fix the comparator’s equivalence.

The fourth case: a `priority_queue` holds A with priority 3
and B with priority 1. Changing the external object A does not
change the record already copied into the queue. If you change the key in place through an indirect
pointer-based model, the heap structure will not be
rebuilt automatically. Mutable priorities need an
explicit strategy: rebuilding, reinsertion with a version, or
a different data structure.

## A plan for a reproducible complexity experiment

To compare containers, generate one vector of keys with a
fixed seed and use it for all implementations.
Build the queries separately: half existing keys, half missing ones.
Measure the construction time separately from the query time. Otherwise a container
with an expensive initial organization of data will seem slow
even in a problem where it then serves millions of lookups.

Check the number of keys found before comparing times. If
one lookup evaluates a different condition, the timings do not correspond to
the same problems. Print the lookup total or use it
in another observable way so that the optimizer cannot remove the
computation as unnecessary. Do not print each query inside the
measured interval: the console will outweigh the cost of the container.

Perform at least several repetitions for each size and
report the median, not a lucky best run. Record the
optimization mode, the architecture, the compiler version, and whether
reserve was called. If the speed ranking changed between n=100 and n=1000,
that is a reason to explain the constant costs, not to hide
an inconvenient result. One machine and one key type give no
grounds to declare a container the best for all programs.

## Checking invariants after an operation

The following table is not a list of required containers but a way
to turn a general requirement into a specific check. For example,
“the cache works” is too vague; “after inserting the fourth key,
the capacity of 3 is not exceeded and the oldest key is missing” already
has an observable result. Choose the checks for your own
variant before writing the code of the operation.

Table 13.2. From a general requirement to a specific invariant {.caption}

| Scenario | What to check after a change |
| --- | --- |
| Contact dictionary | A repeated `try_emplace` did not change the old number or the size. |
| Print queue | Each accepted ID was executed once; a canceled one was not executed. |
| LRU cache | The dictionary keys exactly match the list nodes; size does not exceed the limit. |
| Library copies | Writing off one copy reduced the multiplicity by exactly one. |
| Ranking | Updating a score did not leave an old version of the record in the set. |
| Friendship graph | Every edge A–B has a matching B–A; there is no edge A–A. |
| Parking lot | Occupied and free spots do not overlap, and their sum equals the capacity. |
| Word frequencies | The sum of the counters equals the number of accepted words. |
| Warehouse by section | A transfer did not change the total quantity of goods. |

An invariant is not always checked by a full traversal in the final
product, but for a teaching implementation it is a useful tool.
If a check fails after a specific step, you know which operation
broke the state. This approach is far more precise than looking only at the
last report after dozens of changes. For structures with two
indexes, check both directions of the link: that every
indexed record exists and that there are no main records without an index entry.
