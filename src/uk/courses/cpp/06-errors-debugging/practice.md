---
title: Практика
description: "Тема 6. Налагодження та помилки: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожен приклад — окрема повна програма: спочатку умова, потім код і пояснення.

## Приклад 1. Банкомат із власним винятком

Клас InsufficientFunds є невеликим спеціалізованим
винятком. Тут успадкування використовується лише
як готовий зразок розширення runtime_error;
повне проєктування ієрархій вивчатиметься пізніше.
Операція перевіряє всі умови до зміни балансу.

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

Введення 200 дає баланс 800,1500 повідомляє
про недостатні кошти й залишає 1000,
а−1 відхиляється як недопустима сума.
Noexcept стоїть лише на простому предикаті;
withdraw має право повідомити відмову винятком.

## Приклад 2. Перевірка IPv4

Повернути чотири цілі компоненти або
повідомлення про помилку. Вхід – один
рядок, рівно чотири десяткові частини
0–255 через крапку. Початкові нулі
дозволені як десятковий запис;
пробіли й знаки не дозволені.

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

`192.168.001.010` нормалізується до
`192.168.1.10`. Перевірте також
`0.0.0.0`,`255.255.255.255`,
`256.1.1.1`,`1..2.3`,
`1.2.3`,`1.2.3.4.5`.
Межа довжини частини перевіряється
до можливого накопичення надто
великого цілого значення.

## Приклад 3. Знайди помилку накопичення

Правильна програма рахує суму
від 1 до 10 і перевіряє інваріант
після кожної ітерації.
У копії перенесіть обнулення
total усередину циклу, щоб
отримати логічну помилку.
Порівняйте значення при i=2
та використайте умовну точку
зупинки. Tracepoint може
друкувати i і total
без ручного зупинення
на кожному кроці.

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

Результат правильної програми – `Total: 55`.
Assert перевіряє незалежну від циклу
формулу для допустимих малих меж.
Після збирання з NDEBUG
інваріант не перевірятиметься,
тому звичайні вхідні перевірки
не повинні залежати від assert.
Зберігайте навмисно дефектну
копію окремо від робочої.
