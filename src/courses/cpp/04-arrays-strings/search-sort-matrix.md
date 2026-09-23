---
title: "Searching, sorting and matrices"
description: "Topic 4. Arrays, Strings, vector: Searching, Sorting and Matrices"
outline: [2, 3]
sourceHash: "83f724b8a77fd19cabedc46a40a8e29fa7a69e053267d42bda0a9a1da9746e9f"
---

# Searching, sorting and matrices

## Searching, sorting and collections of structures

**Linear search** examines the elements one by
one until a match or the end. It works
without prior ordering and needs
N comparisons in the worst case. For
an empty vector it returns “not found”.
Do not use the value of element 0 as
the result of an unsuccessful search: it may
be a genuine valid value.

**Binary search** discards half of the
ordered interval each time. Its precondition is
sorting by the same rule by which
the key is compared. The convenient interval `[left,right)`
includes the left bound and excludes the right one.
The middle is computed as `left + (right-left)/2`
to avoid an unnecessary risk of overflowing the
sum of the bounds. If the data are not ordered,
correct search code does not guarantee a result.

Selection sort finds the smallest
element of the remainder and puts it in the next
position. After i steps the first i elements
are already ordered and not greater than the rest.
The algorithm is simple but performs a quadratic
number of comparisons. For practical tasks
the library has `std::ranges::sort` from
`<algorithm>`; here we mention it as
a ready-made tool and study the mechanics by hand.

### Example 2. Grade book

The `Student` structure links a name and a score.
The program adds a record, removes one at a
validated index and sorts the rest
in descending order of scores. The data are given in the code
to focus on the collection operations.

```cpp
#include <vector>
#include <string>
#include <print>
#include <utility>

struct Student { std::string name; int score; };

int main()
{
    std::vector<Student> group{{"Olena", 88}, {"Ivan", 72}};
    group.push_back({"Nina", 95});
    const std::size_t remove = 1;
    if (remove < group.size())
        group.erase(group.begin() + remove);
    for (std::size_t i = 0; i < group.size(); ++i)
    {
        std::size_t best = i;
        for (std::size_t j = i + 1; j < group.size(); ++j)
            if (group[j].score > group[best].score) best = j;
        std::swap(group[i], group[best]);
    }
    for (const auto& student : group)
        std::println("{:<10} {:3}", student.name, student.score);
}
```

```text
Nina        95
Olena       88
```

The whole structure is swapped, so the score
stays linked to the name.
If a separate array of scores were sorted
while the names were left unchanged, the grade book
would become unreliable. For equal
scores, selection sort does not guarantee
preserving the original order; if
a tie-breaking rule is needed,
it must be specified explicitly.

## Matrices and two-dimensional data

A matrix has rows and columns. The built-in
`int a[2][3]{}` is a rectangular set of
six integer values. For a dynamic
size it is convenient to use
`vector<vector<int>>`, where the outer
vector stores the rows. However, it
allows rows of different lengths; if
a mathematical matrix is needed, the program
must maintain rectangularity as an invariant.

Before `matrix[0].size()` check
that there is at least one row. For each
row, check its own length if
the data could have changed. The order
of the indices `matrix[row][column]` must
be consistent. Transposition
swaps the roles of rows and columns,
so the result for an R×C matrix has
the size C×R, not R×C.

### Example 3. Transposition

```cpp
#include <vector>
#include <print>

int main()
{
    const std::vector<std::vector<int>> a{{1, 2, 3}, {4, 5, 6}};
    const auto rows = a.size();
    const auto columns = a[0].size();
    std::vector<std::vector<int>> b(columns,
        std::vector<int>(rows));
    for (std::size_t r = 0; r < rows; ++r)
        for (std::size_t c = 0; c < columns; ++c)
            b[c][r] = a[r][c];
    for (const auto& row : b)
    {
        for (int value : row) std::print("{:3}", value);
        std::println();
    }
}
```

```text
  1  4
  2  5
  3  6
```

The example has a constant non-empty rectangular
matrix. In a version with input, limit the
rows and columns before allocating memory.
A useful property for checking:
transposing twice returns
the original matrix. A rectangular 2×3
test detects mixed-up bounds better
than only a square 3×3 one.
