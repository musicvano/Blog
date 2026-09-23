---
title: "Case studies and common mistakes"
description: "Topic 14. Iterators, Algorithms, Ranges: Case Studies and Common Mistakes"
outline: [2, 3]
sourceHash: "a908660cd77e0b190e3d3e5093c2caa7fccac502d6aa9a270c1d57fbc1292afa"
---

# Case studies and common mistakes

## A step-by-step pipeline walkthrough

Suppose the source contains 1,2,3,4,5,6,7,8, and the pipeline selects
the even numbers, computes their squares, and takes three results. The first request
for a result makes filter skip 1 and find 2; transform
returns 4. The next step skips 3 and uses 4,
so the result is 16. The third result is 36, from the source value 6.
The take limit means that the value 8 is no longer needed
by the consumer to get three answers.

However, you should not turn this trace into a normative count of all
internal calls. An iterator can be dereferenced several times,
and an algorithm can separately request a bound or a distance. This
trace explains the flow of values; it does not guarantee a single call to each
lambda. For an expensive or nondeterministic computation, it is sometimes
better to materialize the result once and work with it.

Table 14.1. The order of adapters is part of the problem {.caption}

| Pipeline | Values | Meaning |
| --- | --- | --- |
| filter → take(3) | 2,4,6 | The first three that qualify |
| take(3) → filter | 2 | Those that qualify among the first three |
| transform → take(3) | 1,4,9 | The squares of the first three |
| reverse → take(3) | 8,7,6 | The last three in reverse order |

If the source is a map, `values` does not copy all the values into a new
vector. It gives access to the corresponding components of the pairs.
Changing a value through a mutable reference is reflected in the map.
For a snapshot report that must not change after the storage
is edited, you need explicit copying into a container of your own.

### The difference between a view object and its elements

Copying a small view often copies only the description of the traversal
and a reference to the source, not all the elements. Two views can
see the same memory. If one loop changes the data, the other
can get new values or a broken cached beginning.
The rule “a copy means independent data” does not work for such objects,
so a lifetime check must include the owner itself.

At the same time, a vector of strings of your own, obtained through to after
conversion to string, already owns its characters. This is not the
same as a vector&lt;`string_view`>: the latter owns only small
descriptions of borrowed fragments. The choice of the element type after
materialization matters more than the mere presence of a vector.

## Contracts of numeric algorithms on concrete values

For the sequence of floating-point numbers `{0.5, 0.5, 0.5}`, a call to
accumulate with an initial int 0 can lose the fractional part
at every step. An initial double 0.0 expresses a different
accumulation policy. The same problem arises if a lambda
explicitly returns int, or if an intermediate product is computed in
a type that is too narrow before being added to a wider one.

For `inner_product` of the coefficients `{2,3,4}` and the powers
`{1,2,4}`, the result is 24. If the second array has
only two values, the classic interface will not check its
end. Do not try to “fix” this by arbitrarily shortening
the first array: the mathematical polynomial would then change.
The correct policy is to reject incompatible sizes or
deliberately define zero padding.

For a sum of money in kopiykas, the precision of integer arithmetic does not
mean there is no overflow. Before computing, estimate the bounds of the
sum from the count and the maximum value.
An average grade needs floating-point division, but the sum itself
can be accumulated exactly in a sufficiently wide integer type.
The technical choice of type follows from the range of the problem’s data.

### Stability and a deterministic report

Suppose the initial records `(A,90),(B,80),(C,90)` are already ordered
by registration time. `Stable_sort` by descending grade will keep
A before C. An ordinary sort is allowed to swap them.
If you need ordering by name, stability by itself
does not provide it: the initial order could have been different.
Specify a second criterion or a sequence of stable sorts.

Sorting by several fields should not be written as
“the first grade is greater OR the name is smaller” without handling ties.
Such a condition can return true in both directions for two records
and break the strict ordering. First compare the primary
criterion; use the second one only when the first is equivalent.
Test the comparator on an identical record and on three
records for transitivity.

## Checking lifetime before returning a result

A function that has created a local vector must not return
a view that refers to it. After the function finishes,
the elements are destroyed, but the cheap view object can still
contain addresses. Instead, return a vector of your own,
take the source from the caller with an explicit lifetime contract,
or use a correct custom range.

A similar trap arises with a predicate that captured a local
bound by reference. Even if the vector itself belongs to the
caller and lives long enough, filter keeps
a dangling reference to the bound. Copying a small number in
the capture `[limit]` solves exactly this dependency; it
does not fix the lifetime of the source itself.

When designing an API, write down the answers to three questions: who
owns the elements, who owns the predicate’s state, and which
operations can invalidate positions. If the answer is
long and unclear, returning your own result is often better than
minimizing copies. Optimization must not hide
the necessary preconditions from the function’s user.

## A test matrix for an algorithmic solution

For filtering, test these cases: no element passes, all
pass, only the first passes, only the last passes, and
an empty set. For sorting, add an already sorted
set, reverse order, duplicates, and equal keys
with different additional fields. For searching, test
a value before the minimum, between elements, and after the maximum.

For chunk, test size 1, even division, and a short
last group; reject a zero size before the adapter.
For zip, compare equal and unequal lengths according to
the problem’s contract. For split, separately test adjacent
delimiters and a delimiter at the end. Record the expected
results before running, rather than explaining an arbitrary result
after execution.

Finally, testing a custom iterator should include
more than a `static_assert` of the concept. Test dereferencing,
prefix and postfix increment, reaching the sentinel, and
that it never goes out of bounds. A concept checks that the
expressions are available, but it does not prove that operator++ really moves
to the correct next value.

## Choosing an algorithm by the required result

Before writing a loop, state the result in one sentence.
Finding the first matching element, counting all matching ones, and
creating a new set are different operations. The same condition in a lambda
does not make these problems identical. The table helps separate
consuming a range from changing its structure.

Table 14.2. Algorithm, result, and precondition {.caption}

| You need | Tool | Critical precondition |
| --- | --- | --- |
| The first matching one | `find_if` | Check the bound before reading |
| The number of matching ones | `count_if` | The predicate does not change the criterion |
| Whether all match | `all_of` | An empty range gives true |
| A new copy of the selection | `copy_if` | Enough output room or `back_inserter` |
| Lazy filtering | views::filter | The owner and the predicate’s state are alive |
| Full ordering | sort | Random access and a strict ordering |
| Preserving ties | `stable_sort` | The initial order is the one you need |
| The k smallest | `partial_sort` | The bound k is within valid limits |
| Global duplicates | sort + unique + erase | Changing the order is acceptable |
| Finding an insertion position | `lower_bound` | A consistent ordering |
| A sequential sum | accumulate / `fold_left` | The correct initial type |
| Pairs of elements | views::zip | Check the required equality of lengths |

An algorithm must not replace a domain check. For example,
`all_of` confirms that all the grades present are valid, but it does not
confirm that any grades were entered at all. Likewise, the absence of a
find result can be a normal answer or a data error –
that is determined by the problem statement. An explicitly chosen reaction to
an empty or missing result makes the interface predictable.
