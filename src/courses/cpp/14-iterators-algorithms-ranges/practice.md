---
title: Practice
description: "Topic 14. Iterators, Algorithms, Ranges: worked examples"
outline: [2, 3]
sourceHash: "1a2503940eef6639c2b6dae854d8f5ca52301890060540c786f78fb264234d53"
---

# Practice

Each complete example has its own `main` and is built in a separate
console project. The input data is given directly in the program.
Use x64, `/std:c++latest`, `/EHsc`, `/W4`, `/utf-8`, and
`/permissive-`. After a build error, do not run the old executable.

## Example 1. Cleaning up measurements

**Problem.** Discard negative sample values and find the bounds of the rest.

```cpp
#include <algorithm>
#include <print>
#include <vector>

int main()
{
    std::vector<double> values{2.5, -1.0, 4.0, 0.0, 3.0};
    auto removed = std::erase_if(values,
        [](double x) { return x < 0; });
    std::println("removed: {}", removed);
    if (values.empty()) return 0;
    auto [lo, hi] = std::ranges::minmax_element(values);
    std::println("min: {}, max: {}", *lo, *hi);
}
```

Output:

```text
removed: 1
min: 0, max: 4
```

The minmax iterators are obtained after `erase_if`, not before the removal. The empty set is checked before dereferencing. Separately test all negative values and a single valid point; NaN needs a separate policy.

## Example 2. Pages of a movie catalog

**Problem.** Split five titles into pages of two entries each, numbered from 1.

```cpp
#include <print>
#include <ranges>
#include <string>
#include <vector>

int main()
{
    std::vector<std::string> movies{"A", "B", "C", "D", "E"};
    for (auto [page, items] : movies
        | std::views::chunk(2) | std::views::enumerate) {
        std::println("page {}", page + 1);
        for (const auto& name : items)
            std::println("  {}", name);
    }
}
```

Output:

```text
page 1
  A
  B
page 2
  C
  D
page 3
  E
```

Enumerate numbers the pages themselves, which is why it comes after chunk. The page size must be positive. The last page is not padded with made-up entries.

## Example 3. A custom Fibonacci range

**Problem.** Create an input range and read eight values through take.

```cpp
#include <cstddef>
#include <iterator>
#include <print>
#include <ranges>

struct Fibonacci : std::ranges::view_interface<Fibonacci> {
    struct Iterator {
        using value_type = unsigned long long;
        using difference_type = std::ptrdiff_t;
        using iterator_concept = std::input_iterator_tag;
        value_type a = 0, b = 1;
        value_type operator*() const { return a; }

        Iterator& operator++() {
            auto next = a + b;
            a = b; b = next;
            return *this;
        }

        void operator++(int) { ++*this; }

        bool operator==(std::unreachable_sentinel_t) const {
            return false;
        }
    };

    Iterator begin() const { return {}; }
    std::unreachable_sentinel_t end() const { return {}; }
};

static_assert(std::ranges::input_range<Fibonacci>);

int main()
{
    for (auto value : Fibonacci{} | std::views::take(8))
        std::println("{}", value);
}
```

Output:

```text
0
1
1
2
3
5
8
13
```

The unreachable sentinel indicates that the range has no end bound of its own; take makes the teaching traversal finite. Use no more than the first 93 values to get mathematically exact unsigned long long values, and do not continue the traversal without an overflow check. For this example, eight values are safe. Returning a number by value matches a computed sequence, not a reference to a container element.
