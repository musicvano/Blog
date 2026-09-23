---
title: Практика
description: "Тема 4. Масиви, рядки, vector: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожен приклад — окрема повна програма: спочатку умова, потім код і пояснення.

## Приклад 1. Шифр Цезаря
Прочитати один рядок ASCII та змістити великі й малі латинські літери на 3.
Пробіли, цифри і розділові знаки зберегти. Це навчальне перетворення,
не криптографічний захист. Кириличний UTF-8 потрібно відхилити.

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

`Abc xyz!` перетворюється на `Def abc!`. Кінець алфавіту
переходить до початку через `%26`. Окремі межі для
великої та малої літери зберігають регістр.

## Приклад 2. Бронювання місця
Зал має 3 ряди по 4 місця. Вводити пари ряд/місце від 1,
а `0 0` завершує введення. Повторне бронювання відхилити.

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

Для `1 2 1 2 4 1 0 0` з’являються повідомлення
про повторне та недопустиме місце, а перший ряд
карти – `.X..`. Перетворення нумерації від 1 до
індексації від 0 відбувається лише після перевірки.

## Приклад 3. Список покупок
Команди читаються цілими рядками: `add назва`,
`remove назва`, `find назва`, `list`, `quit`.
Назви можуть містити пробіли, але не бути порожніми.
Вилучається перший збіг; дублікати дозволені.

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

Після `add green tea`, `find green tea` результат
`Position: 1`. Після `remove green tea` та повторного
пошуку – `Not found`. Рядки зберігаються як власні
`string`, тому наступний `getline` не знищує назви
в колекції. Заміна їх на `string_view` поточного
`command` без зміни архітектури була б помилкою.
