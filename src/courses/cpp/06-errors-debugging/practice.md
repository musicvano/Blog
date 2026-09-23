---
title: Practice
description: "Topic 6. Debugging and Errors: worked examples"
outline: [2, 3]
sourceHash: "49f853e0c20921560bcdbe2ac8e5c0494c3b2a77dcb30a6a1e9c11c015fa2eab"
---

# Practice

Each example is a separate complete program: first the problem, then the code and the explanation.

## Example 1. An ATM with a custom exception

The class InsufficientFunds is a small specialized
exception. Here inheritance is used only
as a ready-made pattern for extending runtime_error;
the full design of hierarchies will be studied later.
The operation checks all conditions before changing the balance.

```cpp
#include <stdexcept>
#include <iostream>
#include <print>

struct InsufficientFunds : std::runtime_error
{
    InsufficientFunds() : std::runtime_error("Insufficient funds") {}
};

bool valid_amount(int amount) noexcept
{
    return amount > 0 && amount <= 100000;
}

void withdraw(int& balance, int amount)
{
    if (!valid_amount(amount))
        throw std::invalid_argument("Invalid amount");
    if (amount > balance) throw InsufficientFunds{};
    balance -= amount;
}

int main()
{
    int balance = 1000, amount{};
    if (!(std::cin >> amount)) return 1;
    try { withdraw(balance, amount); }
    catch (const InsufficientFunds& error)
    {
        std::println("Rejected: {}", error.what());
    }
    catch (const std::invalid_argument& error)
    {
        std::println("Invalid: {}", error.what());
    }
    std::println("Balance: {}", balance);
}
```

The input 200 gives a balance of 800, 1500 reports
insufficient funds and leaves 1000,
and −1 is rejected as an invalid amount.
Noexcept is placed only on the simple predicate;
withdraw is allowed to report a failure with an exception.

## Example 2. Validating IPv4

Return four integer components or
an error message. The input is one
line with exactly four decimal parts,
0–255, separated by dots. Leading zeros
are allowed as decimal notation;
spaces and signs are not allowed.

```cpp
#include <array>
#include <expected>
#include <string>
#include <string_view>
#include <iostream>
#include <print>

using Address = std::array<int, 4>;
using Result = std::expected<Address, std::string>;

Result parse_ip(std::string_view text)
{
    Address address{};
    std::size_t position{};
    for (int part = 0; part < 4; ++part)
    {
        const auto start = position;
        int value{};
        while (position < text.size() && text[position] != '.')
        {
            const char c = text[position++];
            if (c < '0' || c > '9')
                return std::unexpected("Non-digit");
            if (position - start > 3)
                return std::unexpected("Part too long");
            value = value * 10 + c - '0';
        }
        if (position == start || value > 255)
            return std::unexpected("Empty or out-of-range part");
        address[part] = value;
        if (part < 3)
        {
            if (position == text.size())
                return std::unexpected("Too few parts");
            ++position;
        }
        else if (position != text.size())
            return std::unexpected("Too many parts");
    }
    return address;
}

int main()
{
    std::string text;
    if (!std::getline(std::cin, text)) return 1;
    auto result = parse_ip(text);
    if (!result)
    {
        std::println("Error: {}", result.error());
        return 1;
    }
    const auto& a = *result;
    std::println("{}.{}.{}.{}", a[0], a[1], a[2], a[3]);
}
```

`192.168.001.010` is normalized to
`192.168.1.10`. Also test
`0.0.0.0`, `255.255.255.255`,
`256.1.1.1`, `1..2.3`,
`1.2.3` and `1.2.3.4.5`.
The part length limit is checked
before a too large integer value
could accumulate.

## Example 3. Find the accumulation bug

The correct program computes the sum
from 1 to 10 and checks an invariant
after each iteration.
In a copy, move the resetting of
total inside the loop to
get a logic error.
Compare the values at i=2
and use a conditional
breakpoint. A tracepoint can
print i and total
without stopping manually
at every step.

```cpp
#include <cassert>
#include <print>

int main()
{
    int total{};
    for (int i = 1; i <= 10; ++i)
    {
        total += i;
        assert(total == i * (i + 1) / 2);
    }
    std::println("Total: {}", total);
}
```

The output of the correct program is `Total: 55`.
The assert checks a formula that is independent of the loop,
for allowed small bounds.
After a build with NDEBUG,
the invariant won’t be checked,
so ordinary input checks
must not depend on assert.
Keep the deliberately defective
copy separate from the working one.
