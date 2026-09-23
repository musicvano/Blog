---
title: Summary
description: "Topic 14. Iterators, Algorithms, Ranges: conclusions and review questions"
sourceHash: "be6430f7f1378628eaca197a915a54fdb12927d9f4249814b93766581e1e0bae"
---

# Summary

## Conclusions

An iterator separates an algorithm from the structure of a container and specifies
a position in a half-open range whose end bound is never
dereferenced. The iterator category determines the available operations
and their cost, so an algorithm requires only the capabilities
it needs. Changing the structure of a container can invalidate
positions according to the rules of that specific container. The
`remove_if` algorithm only rearranges elements, and the physical shrinking is done by
erase or `std::erase_if`. A lambda is a closure object in which
capture by value creates a snapshot, while capture by reference
requires a lifetime guarantee. For searching, sorting, and accumulation,
preconditions matter: a strict ordering from the comparator, a sorted
range, enough room at the destination, and the correct initial type.
Ranges algorithms with projections and views give a lazy pipeline
in which the order of the adapters is part of the problem. A view borrows the owner’s
data, so to get an independent result you materialize it
into a container of your own.

## Self-check questions

1. Why can end not be dereferenced?
2. What is the complexity of distance for vector and list?
3. Why does reserve not create the destination elements for copy?
4. What remains in the tail after `remove_if`?
5. How does copying a mutable lambda affect its state?
6. Why does std::function not extend the lifetime of a borrowed variable?
7. What is the precondition of `lower_bound`?
8. When can reduce differ from accumulate?
9. Why does zip not check that the lengths are equal for your problem?
10. How do you tell materialized data from a borrowed view?

## Review questions for the lab

1. Does your algorithm have access to the end of the second range?
2. Who owns the data of each view?
3. Which operation changes the container physically?
4. What does the program do with an empty set?
5. Why does the comparator define a strict ordering?
