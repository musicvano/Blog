---
title: "Adapters and new interfaces"
description: "Topic 13. Containers: Adapters and New Interfaces"
outline: [2, 3]
sourceHash: "321bd38c5301d1eb7173cb525e3aca4ae4056e6a0c33b1795a784e050de4efed"
---

# Adapters and new interfaces

## Adapters: a restricted interface as an advantage

`stack` expresses LIFO, `queue` expresses FIFO, and `priority_queue` expresses choosing
the highest-priority element. They use another container
for storage but expose a narrow set of operations. For example,
an ordinary queue does not let you sort its middle arbitrarily; this
helps preserve the chosen service rules.

`pop` in the standard adapters does not return the removed value.
First you read `front` or `top`, and then you call pop.
Reading the top of an empty container is incorrect: calling
empty is part of the algorithm, not optional diagnostics.
Do not keep a reference to the top after it has been removed.

The `priority_queue` comparator may seem “reversed”: the default less
puts the largest element on top. In the example, a smaller priority means
a lower place, and with equal priority a larger arrival goes later.
This explicitly defines the tie-break, which `priority_queue` itself is not required
to resolve stably by insertion order.

### Serving customers and jobs

**Problem.** Compare FIFO service with priorities and a time-based tie-break.

```cpp
#include <print>
#include <queue>
#include <string>
#include <vector>

struct Job { std::string name; int priority, arrival; };
struct Later {
    bool operator()(const Job& a, const Job& b) const {
        if (a.priority != b.priority)
            return a.priority < b.priority;
        return a.arrival > b.arrival;
    }
};
int main()
{
    std::queue<std::string> fifo;
    fifo.push("A"); fifo.push("B");
    while (!fifo.empty()) {
        std::println("FIFO: {}", fifo.front());
        fifo.pop();
    }
    std::priority_queue<Job, std::vector<Job>, Later> jobs;
    jobs.push({"normal", 1, 0});
    jobs.push({"urgent-1", 3, 1});
    jobs.push({"urgent-2", 3, 2});
    while (!jobs.empty()) {
        std::println("job: {}", jobs.top().name);
        jobs.pop();
    }
}
```

Output:

```text
FIFO: A
FIFO: B
job: urgent-1
job: urgent-2
job: normal
```

A priority queue is not a model of real medical triage. Here the numeric priorities are arbitrary and are used for software jobs. Test two elements with the same priority, an empty queue, and a sequence of only normal jobs.

## New interfaces and checking support

C++23 `flat_map` and `flat_set` combine an ordered interface
with compact sequential storage. Lookup can be logarithmic,
and insertion linear because of moves. They are not just another
name for map. In the tested MSVC 19.51, the `flat_map` header is present,
and `__cpp_lib_flat_map` is defined. For your own environment, check
both the macro and the compilation of a small example; an entry in the course plan
must not replace the actual support table.

`mdspan` is a non-owning multidimensional view, not a container
that owns the elements of a matrix by itself. It describes the mapping of
indices to memory and depends on the owner’s lifetime. `inplace_vector`
and `hive` are associated with C++26; in the tested build, these headers are missing.
That is why the required examples use the available containers, and these
names are given to show the direction in which the library is developing.

Do not confuse the fixed maximum capacity of `inplace_vector` with
the unchangeable element count of array. Hive targets a different model
of element stability, not the random access of a vector.
Making a decision requires specific operations and guarantees,
not just a newer year in the name of the standard.

## Checking the choice in practice

First write down what the key is and whether duplicates are allowed.
Then list the operations: insertion, lookup, selection by range,
removal, printing. If you need to select all dates between two bounds,
an ordered dictionary and `lower_bound` are more natural than a hash table.
If you only need a membership test for a large set without ordering,
consider `unordered_set`, but take the quality of the hash into account.

Be especially careful about changing the structure during iteration. A safe
removal pattern uses the iterator returned by erase, where
the interface provides it. A range-for gives no automatic protection
against `push_back`, a rehash, or removing the current element. The next
topic covers these rules in more detail; for now, separate
the phase of collecting changes from the phase of applying them if the guarantees are unclear.

In tests, compare the mathematical content, not the arbitrary order
of a hashed iteration. An empty set, a repeated key, a lookup of a missing element,
priority ties, and repeated updates of a value are different scenarios.
After each update you can check the invariant: the number of
entries, the uniqueness of keys, and the preservation of the required values.
