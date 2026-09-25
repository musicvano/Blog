---
title: Практика
description: "Тема 14. Ітератори, алгоритми, ranges: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожен завершений приклад має власний `main` і збирається в окремому
консольному проєкті. Початкові дані наведено безпосередньо в програмі.
Використайте x64, `/std:c++latest`, `/EHsc`, `/W4`, `/utf-8` та
`/permissive-`. Після помилки збирання не запускайте старий виконуваний файл.

## Приклад 1. Очищення вимірювань

**Умова.** Відкинути від’ємні навчальні значення та знайти межі залишку.

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

Результат виконання:

```text
removed: 1
min: 0, max: 4
```

Ітератори minmax отримано після `erase_if`, а не до видалення. Перед розіменуванням перевірено порожній набір. Окремо перевірте всі від’ємні значення й одну допустиму точку; NaN потребує окремої політики.

## Приклад 2. Сторінки каталогу фільмів

**Умова.** Розбити п’ять назв на сторінки по два записи з нумерацією від 1.

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

Результат виконання:

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

Enumerate нумерує саме сторінки, тому стоїть після chunk. Розмір сторінки повинен бути додатним. Остання сторінка не доповнюється вигаданими записами.

## Приклад 3. Власний діапазон Фібоначчі

**Умова.** Створити input-діапазон і прочитати вісім значень через take.

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

Результат виконання:

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

Unreachable sentinel позначає відсутність власної кінцевої межі; take робить навчальний обхід скінченним. Використовуйте не більш ніж перші 93 значення для математично точних unsigned long long значень і не продовжуйте обхід без перевірки переповнення. Для цього прикладу вісім значень безпечні. Повернення числа за значенням відповідає обчислюваній послідовності, а не посиланню на елемент контейнера.
