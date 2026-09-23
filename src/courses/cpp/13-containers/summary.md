---
title: Summary
description: "Topic 13. Containers: conclusions and review questions"
sourceHash: "78bc07c73e18a5085b581a2144be9d2f91eef89b8d9bb1a2c3828a0aea4c641f"
---

# Summary

## Conclusions

You choose a container by its operations, its keys, and whether you need
ordering, duplicates, and stable elements, not by a familiar name.
Complexity notation describes how the number of operations grows and has
preconditions, so you check the actual cost with a reproducible
experiment. `vector` stores its elements contiguously and distinguishes
size from capacity, while `span` only borrows the owner’s memory.
`deque`, `list`, and `forward_list` give different guarantees for access,
insertion, and the validity of references and iterators. In `set` and `map`,
uniqueness is defined by the comparator’s equivalence, and the access
member functions treat a missing key differently. Hashed
containers need consistent equality and hashing, allow
collisions, and do not guarantee an iteration order. Adapters deliberately narrow
the interface to LIFO, FIFO, or priority rules. After every change to a
structure, check the data invariants, not just the final
report.

## Self-check questions

1. How does size differ from capacity?
2. Why does span not extend the lifetime of a vector?
3. When does constant-time insertion into a list not make the whole operation constant-time?
4. How does the comparator’s equivalence differ from ==?
5. Which map member functions can add a missing key?
6. What is a collision, and why is it acceptable?
7. How is key equality related to the hash function?
8. How do the guarantees for an iterator and a reference differ after a rehash?
9. How do you ensure a stable tie-break in a `priority_queue`?
10. Why should mdspan not be called an owning container?

## Review questions for the lab

1. What invariant does the container maintain in your variant?
2. Do you need duplicates, and in what sense are keys equal?
3. Which operation can invalidate your iterator?
4. Are the timing conditions the same for all containers?
5. How did you test a missing element?
