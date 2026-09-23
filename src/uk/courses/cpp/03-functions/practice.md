---
title: Практика
description: "Тема 3. Функції: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожен приклад — окрема повна програма: спочатку умова, потім код і пояснення.

## Приклад 1. Нормалізація часу

Функція перетворює невід’ємні компоненти на години,
хвилини 0–59 і секунди 0–59. Загальна тривалість зберігається.
Параметри є вихідними також, тому потрібні посилання.

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

Для `1 90 90` відповідь `02:31:30`. Межі входу гарантують,
що проміжні суми вміщуються. Передавання одного об’єкта
як кількох компонентів цьому інтерфейсу не відповідає:
години, хвилини та секунди мають бути окремими змінними.

## Приклад 2. Біноміальні коефіцієнти

Рекурентна формула Паскаля C(n,k)=C(n−1,k−1)+C(n−1,k)
має базу C(n,0)=C(n,n)=1. Для порівняння ітеративна
реалізація послідовно множить і ділить цілі величини.
Обмеження n≤20 робить навчальну рекурсію прийнятною.

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

Для `5 2` обидва результати 10, для `0 0` – 1.
`static_assert` перевіряє сталий випадок, але не
замінює перевірку введеного k. Рекурсія повторює
багато однакових підзадач, тому для великих n
потрібен інший алгоритм, а не лише більший тип.

## Приклад 3. Калькулятор аргументів

Режими: `int 12 5` для цілої суми і `real 1.5 2.25`
для дробової. `std::from_chars` перевіряє також кінець
токена: `12x` не приймається як 12. Дозволені модулі
аргументів не більше 1000000, що обмежує результати.

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

Результати зазначених викликів – 17 і 3.75.
Цей приклад випереджально використовує рядковий вигляд
як текст аргументу; власником тексту залишається
середовище запуску. Повний розбір і час життя
`string_view` розглядаються в темі 4. На відміну від
простого `std::cin >>`, перевірка кінцевого вказівника
не дозволяє зайвий текст після числа.
