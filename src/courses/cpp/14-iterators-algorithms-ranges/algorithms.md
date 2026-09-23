---
title: "Standard library algorithms"
description: "Topic 14. Iterators, Algorithms, Ranges: Standard Library Algorithms"
outline: [2, 3]
sourceHash: "85be812ecd3529b875fcf490b886dd5fb17db0182aaff8e596090b860348c126"
---

# Standard library algorithms

## Searching, filtering, sorting, and permuting

`find` compares with a value, `find_if` applies a condition,
and `count_if` counts the matching elements. `any_of` and `all_of`
express existence and a universal check. For an empty
range, `any_of` gives false and `all_of` gives true: there is no element
that violates the requirement. If an empty set is not allowed in the domain,
check for it separately.

`sort` does not guarantee that the order of equivalent elements is preserved;
`stable_sort` does. `partial_sort(first,middle,last)`
orders only the required smallest prefix, and the rest has no
guaranteed order. Ensuring that middle lies within the valid
range is the caller’s responsibility.

`unique` removes only adjacent duplicates, and only logically, much like
remove. To eliminate repeats globally, you often sort first,
but that changes the original order. If the order of first appearance
matters, you need a different algorithm with a set of already seen
values. The name unique does not mean automatic global uniqueness.

`binary_search` and `lower_bound` require a range that is properly sorted
or partitioned with respect to the condition. Sorting
in descending order and then searching with the default less is incorrect. For map/set,
the `lower_bound` member function uses the tree; the general algorithm
on their iterators may require a linear number of steps.

`transform` computes new values, and `copy_if` keeps only
the selected ones. You must ensure room at the destination and allowed
overlap. Reading from and writing to the same range is not allowed
for every arbitrary combination of algorithms.

### Sales analytics

**Problem.** For the given amounts, find the total, the number of large sales, and the descending order.

```cpp
#include <algorithm>
#include <numeric>
#include <print>
#include <vector>

int main()
{
    std::vector<int> sales{30, 10, 20, 10};
    auto sum = std::accumulate(sales.begin(), sales.end(), 0);
    auto count = std::count_if(sales.begin(), sales.end(),
        [](int value) { return value >= 20; });
    std::sort(sales.begin(), sales.end(),
        [](int x, int y) { return x > y; });
    std::println("sum: {}, large: {}", sum, count);
    for (int value : sales) std::print("{} ", value);
    std::println();
}
```

Output:

```text
sum: 70, large: 2
30 20 10 10
```

The initial value 0 in accumulate sets an integer accumulation type. For floating-point numbers, use 0.0; otherwise the intermediate results can lose their fractional part. Here the small integer amounts do not overflow. The order of sales is changed by the sort, not just the look of the report.

## Numeric algorithms and associativity

`accumulate` performs a sequential fold with an initial
value. `reduce` allows a different grouping of operations, even
without an explicit parallel policy. For adding floating-point numbers,
this can change the last digits because of rounding. For subtraction
or concatenation with a specific order, such a substitution can change
the very meaning of the result.

`iota` fills with a sequence, `inner_product` accumulates
pairwise products, and `partial_sum` computes prefix sums.
In the classic `inner_product`, the second sequence must have
enough elements; passing only its beginning
does not let the algorithm check the length. The precondition must be
checked before the call, or a different interface chosen.

C++23 `std::ranges::fold_left` explicitly describes a left fold
and works conveniently with a range. The availability of a new interface
does not cancel integer overflow or floating-point errors.
The type of the initial value and the result type of the operation
remain part of the mathematical model.
