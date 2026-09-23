---
title: Practice
description: "Topic 2. Types, Operators, Control Flow: worked examples"
outline: [2, 3]
sourceHash: "2975594dff4926d9d4532909f02e7301eba82c877ac1f73071d8e6c9f0be9341"
---

# Practice

Each example is a separate complete program: first the problem, then the code and an explanation.

## Example 1. Seconds in time format

Read an integer duration from 0 to 86400 seconds and print the hours,
minutes, and seconds. This is a duration, so 86400 corresponds to `24:00:00`,
not to a change to the next calendar date.

```cpp
#include <print>
#include <iostream>

int main()
{
    int total{};
    if (!(std::cin >> total) || total < 0 || total > 86400)
    {
        std::cerr << "Expected seconds in 0..86400\n";
        return 1;
    }
    const int hours = total / 3600;
    const int minutes = total % 3600 / 60;
    const int seconds = total % 60;
    std::println("{:02}:{:02}:{:02}", hours, minutes, seconds);
}
```

For the input `3661`, the result is `01:01:01`. Also check 0, 59,
60, 3600, 86400, and -1. The remainder `% 3600` keeps the part after the full
hours. The `02` format adds a leading zero to a single-digit component.
Forbidding values over a day is a condition of this problem, not a limitation of the `%` operator.

## Example 2. Triangle type

Read three integer sides in the range 1–10000. First check whether
a triangle exists, then determine whether it is equilateral, isosceles, or scalene.
Integers let you compare lengths exactly in this model.

```cpp
#include <print>
#include <iostream>

enum class Kind { equilateral, isosceles, scalene };

int main()
{
    int a{}, b{}, c{};
    if (!(std::cin >> a >> b >> c)
        || a < 1 || b < 1 || c < 1
        || a > 10000 || b > 10000 || c > 10000)
    {
        std::cerr << "Invalid sides\n";
        return 1;
    }
    if (a + b <= c || a + c <= b || b + c <= a)
    {
        std::println("No triangle");
        return 0;
    }
    const Kind kind = a == b && b == c ? Kind::equilateral
        : a == b || a == c || b == c ? Kind::isosceles
        : Kind::scalene;
    switch (kind)
    {
    case Kind::equilateral: std::println("Equilateral"); break;
    case Kind::isosceles: std::println("Isosceles"); break;
    case Kind::scalene: std::println("Scalene"); break;
    }
}
```

For `3 4 5`, the result is `Scalene`; for `2 2 2`, it is `Equilateral`;
for `2 2 3`, it is `Isosceles`; and `1 2 3` gives `No triangle`.
The last case is degenerate: when the sum of two sides equals the third,
they don’t form a triangle. The limit of 10000 guarantees that the sums in the checks
fit in an `int`; for arbitrarily large sides, this needs to be reconsidered.

## Example 3. A sample ATM

The initial balance is 1000 notional whole units. Commands: 1 – balance,
2 – deposit, 3 – withdrawal, 0 – exit. Amounts are 1–10000,
and the balance doesn’t exceed 100000. This is a model of a menu, not a financial service.

```cpp
#include <print>
#include <iostream>

int main()
{
    int balance = 1000;
    int command{};
    while (std::cin >> command && command != 0)
    {
        if (command == 1)
        {
            std::println("Balance: {}", balance);
            continue;
        }
        if (command != 2 && command != 3)
        {
            std::println("Unknown command");
            continue;
        }
        int amount{};
        if (!(std::cin >> amount)) return 1;
        if (amount < 1 || amount > 10000)
        {
            std::println("Invalid amount");
            continue;
        }
        switch (command)
        {
        case 2:
            if (amount <= 100000 - balance) balance += amount;
            else std::println("Balance limit");
            break;
        case 3:
            if (amount <= balance) balance -= amount;
            else std::println("Insufficient funds");
            break;
        }
    }
    if (std::cin.fail() && !std::cin.eof()) return 1;
    std::println("Final balance: {}", balance);
}
```

The sequence `1 3 200 2 50 1 0` prints the balance 1000, then 850,
and the total `Final balance: 850`. A failed operation doesn’t change the balance.
Check a withdrawal of a larger amount, an unknown command, and a non-numeric amount.
Each branch defines a separate result; repeating the menu must not
reapply the previous operation after an error.
