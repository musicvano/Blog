---
title: Practice
description: "Topic 3. Functions: worked examples"
outline: [2, 3]
sourceHash: "b89293f494b43755db832d8c276cc56e1e5b46aad885bcc472dc5a25b31a8b7a"
---

# Practice

Each example is a separate complete program: first the problem, then the code and the explanation.

## Example 1. Normalizing time

The function converts non-negative components into hours,
minutes 0–59 and seconds 0–59. The total duration is preserved.
The parameters are also outputs, so references are needed.

```cpp
#include <print>
#include <iostream>

void normalize(int& hours, int& minutes, int& seconds)
{
    minutes += seconds / 60;
    seconds %= 60;
    hours += minutes / 60;
    minutes %= 60;
}

int main()
{
    int h{}, m{}, s{};
    if (!(std::cin >> h >> m >> s) || h < 0 || m < 0 || s < 0
        || h > 1000 || m > 1000 || s > 1000) return 1;
    normalize(h, m, s);
    std::println("{:02}:{:02}:{:02}", h, m, s);
}
```

For `1 90 90` the answer is `02:31:30`. The input limits guarantee
that the intermediate sums fit. Passing one object
as several components does not match this interface:
hours, minutes and seconds must be separate variables.

## Example 2. Binomial coefficients

Pascal’s recurrence C(n,k)=C(n−1,k−1)+C(n−1,k)
has the base C(n,0)=C(n,n)=1. For comparison, the iterative
implementation successively multiplies and divides integer values.
The limit n≤20 makes the teaching recursion acceptable.

```cpp
#include <print>
#include <iostream>

constexpr long long choose(int n, int k)
{
    if (k == 0 || k == n) return 1;
    return choose(n - 1, k - 1) + choose(n - 1, k);
}

long long iterative(int n, int k)
{
    long long result = 1;
    for (int i = 1; i <= k; ++i)
        result = result * (n - i + 1) / i;
    return result;
}

static_assert(choose(5, 2) == 10);

int main()
{
    int n{}, k{};
    if (!(std::cin >> n >> k) || n < 0 || n > 20
        || k < 0 || k > n) return 1;
    std::println("Recursive: {}", choose(n, k));
    std::println("Iterative: {}", iterative(n, k));
}
```

For `5 2` both results are 10, for `0 0` they are 1.
`static_assert` checks a constant case but does not
replace validating the entered k. The recursion repeats
many identical subproblems, so for large n
you need a different algorithm, not just a larger type.

## Example 3. Argument calculator

Modes: `int 12 5` for an integer sum and `real 1.5 2.25`
for a fractional one. `std::from_chars` also checks the end of
the token: `12x` is not accepted as 12. The allowed absolute values
of the arguments are at most 1000000, which bounds the results.

```cpp
#include <print>
#include <iostream>
#include <charconv>
#include <string_view>
#include <cmath>

int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }

bool parse(std::string_view text, int& value)
{
    auto [end, error] = std::from_chars(
        text.data(), text.data() + text.size(), value);
    return error == std::errc{} && end == text.data() + text.size()
        && value >= -1000000 && value <= 1000000;
}

bool parse(std::string_view text, double& value)
{
    auto [end, error] = std::from_chars(
        text.data(), text.data() + text.size(), value);
    return error == std::errc{} && end == text.data() + text.size()
        && std::isfinite(value) && std::abs(value) <= 1000000;
}

int main(int argc, char* argv[])
{
    if (argc == 2 && std::string_view{argv[1]} == "--help")
    {
        std::println("calc int|real number number");
        return 0;
    }
    if (argc != 4) return 1;
    const std::string_view mode{argv[1]};
    if (mode == "int")
    {
        int a{}, b{};
        if (!parse(argv[2], a) || !parse(argv[3], b)) return 1;
        std::println("{}", add(a, b));
    }
    else if (mode == "real")
    {
        double a{}, b{};
        if (!parse(argv[2], a) || !parse(argv[3], b)) return 1;
        std::println("{:.2f}", add(a, b));
    }
    else
    {
        std::cerr << "Unknown mode\n";
        return 1;
    }
}
```

The results of the calls shown are 17 and 3.75.
This example uses a string view ahead of time
as the argument text; the owner of the text remains
the launch environment. Full parsing and the lifetime of
`string_view` are covered in Topic 4. Unlike
a plain `std::cin >>`, checking the end pointer
does not allow extra text after the number.
