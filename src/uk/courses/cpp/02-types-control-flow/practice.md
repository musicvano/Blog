---
title: Практика
description: "Тема 2. Типи, операції, керування: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожен приклад — окрема повна програма: спочатку умова, потім код і пояснення.

## Приклад 1. Секунди у форматі часу

Прочитати цілу тривалість від 0 до 86400 секунд і вивести години,
хвилини та секунди. Це тривалість, тому 86400 відповідає `24:00:00`,
а не переходу на наступну календарну дату.

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

За введення `3661` результат – `01:01:01`. Перевірте також 0, 59,
60, 3600, 86400 і -1. Остача `% 3600` залишає частину після повних
годин. Формат `02` додає початковий нуль до однозначного компонента.
Заборона значень понад добу є умовою цієї задачі, а не обмеженням оператора `%`.

## Приклад 2. Тип трикутника

Прочитати три цілі сторони 1–10000. Спочатку перевірити існування
трикутника, потім визначити рівносторонній, рівнобедрений або різносторонній
тип. Цілі числа дозволяють точно порівнювати довжини в цій моделі.

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

Для `3 4 5` результат – `Scalene`, для `2 2 2` – `Equilateral`,
для `2 2 3` – `Isosceles`, а `1 2 3` дає `No triangle`.
Останній випадок вироджений: рівність суми двох сторін третій
не утворює трикутника. Межа 10000 гарантує, що суми в перевірках
вміщуються в `int`; для довільних великих сторін це потрібно переглянути.

## Приклад 3. Навчальний банкомат

Початковий баланс – 1000 умовних цілих одиниць. Команди: 1 – баланс,
2 – поповнення, 3 – зняття, 0 – завершення. Суми 1–10000,
баланс не перевищує 100000. Це модель меню, а не фінансовий сервіс.

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

Послідовність `1 3 200 2 50 1 0` виводить баланс 1000, потім 850
і підсумок `Final balance: 850`. Невдала операція не змінює баланс.
Перевірте зняття більшої суми, невідому команду і нечислову суму.
Кожна гілка визначає окремий результат; повторення меню не повинно
повторно застосовувати попередню операцію після помилки.
