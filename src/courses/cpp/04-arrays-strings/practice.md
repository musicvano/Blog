---
title: Practice
description: "Topic 4. Arrays, Strings, vector: worked examples"
outline: [2, 3]
sourceHash: "9b9784a2864728199ec79ecada48edb1d4309df36b917457e34b8b58b4537edb"
---

# Practice

Each example is a separate complete program: first the problem, then the code and the explanation.

## Example 1. Caesar cipher
Read one ASCII line and shift uppercase and lowercase Latin letters by 3.
Keep spaces, digits and punctuation. This is a teaching transformation,
not cryptographic protection. Cyrillic UTF-8 must be rejected.

```cpp
#include <string>
#include <iostream>
#include <print>

int main()
{
    std::string text;
    if (!std::getline(std::cin, text)) return 1;
    for (unsigned char c : text) if (c > 127) return 1;
    for (char& c : text)
    {
        if (c >= 'a' && c <= 'z')
            c = static_cast<char>('a' + (c - 'a' + 3) % 26);
        else if (c >= 'A' && c <= 'Z')
            c = static_cast<char>('A' + (c - 'A' + 3) % 26);
    }
    std::println("{}", text);
}
```

`Abc xyz!` turns into `Def abc!`. The end of the alphabet
wraps around to the beginning thanks to `%26`. Separate ranges for
uppercase and lowercase letters preserve the case.

## Example 2. Seat booking
The hall has 3 rows of 4 seats. Enter row/seat pairs starting from 1,
and `0 0` ends the input. Reject a repeated booking.

```cpp
#include <array>
#include <iostream>
#include <print>

int main()
{
    std::array<std::array<bool, 4>, 3> booked{};
    int row{}, seat{};
    while (std::cin >> row >> seat)
    {
        if (row == 0 && seat == 0) break;
        if (row < 1 || row > 3 || seat < 1 || seat > 4)
        {
            std::println("Invalid seat");
            continue;
        }
        auto& occupied = booked[row - 1][seat - 1];
        if (occupied) std::println("Already booked");
        else occupied = true;
    }
    for (const auto& seats : booked)
    {
        for (bool occupied : seats)
            std::print("{}", occupied ? 'X' : '.');
        std::println();
    }
}
```

For `1 2 1 2 4 1 0 0` messages appear
about a repeated and an invalid seat, and the first row
of the map is `.X..`. The conversion from numbering from 1 to
indexing from 0 happens only after the check.

## Example 3. Shopping list
Commands are read as whole lines: `add name`,
`remove name`, `find name`, `list`, `quit`.
Names may contain spaces but must not be empty.
The first match is removed; duplicates are allowed.

```cpp
#include <vector>
#include <string>
#include <iostream>
#include <print>

int main()
{
    std::vector<std::string> items;
    std::string command;
    while (std::getline(std::cin, command) && command != "quit")
    {
        if (command == "list")
        {
            for (const auto& item : items) std::println("{}", item);
            continue;
        }
        const auto space = command.find(' ');
        if (space == command.npos || space + 1 == command.size())
        {
            std::println("Invalid command");
            continue;
        }
        const auto action = command.substr(0, space);
        const auto name = command.substr(space + 1);
        if (action == "add") items.push_back(name);
        else if (action == "find" || action == "remove")
        {
            std::size_t i{};
            while (i < items.size() && items[i] != name) ++i;
            if (i == items.size()) std::println("Not found");
            else if (action == "remove")
                items.erase(items.begin() + i);
            else std::println("Position: {}", i + 1);
        }
        else std::println("Unknown action");
    }
}
```

After `add green tea`, `find green tea` the result is
`Position: 1`. After `remove green tea` and a repeated
search, it is `Not found`. The lines are stored as owning
`string` objects, so the next `getline` does not destroy the names
in the collection. Replacing them with a `string_view` of the current
`command` without changing the architecture would be an error.
