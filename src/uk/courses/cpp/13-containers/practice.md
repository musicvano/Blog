---
title: Практика
description: "Тема 13. Контейнери: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожен завершений приклад має власний `main` і збирається в окремому
консольному проєкті. Початкові дані наведено безпосередньо в програмі.
Використайте x64, `/std:c++latest`, `/EHsc`, `/W4`, `/utf-8` та
`/permissive-`. Після помилки збирання не запускайте старий виконуваний файл.

## Приклад 1. Обмежена історія браузера

**Умова.** Зберегти три останні відвідані сторінки.

```cpp
#include <deque>
#include <print>
#include <string>

int main()
{
    std::deque<std::string> history;
    for (const auto* page : {"home", "news", "help", "docs"}) {
        history.push_back(page);
        if (history.size() > 3) history.pop_front();
    }
    for (const auto& page : history)
        std::println("{}", page);
}
```

Результат виконання:

```text
news
help
docs
```

Deque дозволяє видалити найдавнішу сторінку з початку. Це історія відвідувань, а не повна реалізація кнопок назад/уперед. Перевірте менше трьох і рівно три сторінки, а нульову місткість задайте окремою політикою.

## Приклад 2. Перевірка дужок

**Умова.** Перевірити узгодженість круглих і квадратних дужок; інші символи ігнорувати.

```cpp
#include <print>
#include <stack>
#include <string_view>

bool balanced(std::string_view text)
{
    std::stack<char> opened;
    for (char c : text) {
        if (c == '(' || c == '[') opened.push(c);
        if (c != ')' && c != ']') continue;
        if (opened.empty()) return false;
        char expected = c == ')' ? '(' : '[';
        if (opened.top() != expected) return false;
        opened.pop();
    }
    return opened.empty();
}
int main()
{
    for (auto text : {"([])", "([)]", "]", ""})
        std::println("'{}': {}", text, balanced(text));
}
```

Результат виконання:

```text
'([])': true
'([)]': false
']': false
'': true
```

Стек зберігає незакриті відкривальні дужки. Кожна закривальна повинна відповідати саме останній відкритій. Тому простого порівняння кількостей недостатньо. Порожній текст є коректним, а незакритий залишок наприкінці означає відмову.

## Приклад 3. Бібліотечний каталог

**Умова.** Знайти всі книги одного автора, допускаючи повторні ключі.

```cpp
#include <map>
#include <print>
#include <string>

int main()
{
    std::multimap<std::string, std::string> catalog{
        {"Author A", "Book 1"}, {"Author B", "Book 2"},
        {"Author A", "Book 3"}};
    auto [first, last] = catalog.equal_range("Author A");
    for (auto it = first; it != last; ++it)
        std::println("{}", it->second);
    auto [missing, end] = catalog.equal_range("Unknown");
    std::println("missing: {}", missing == end);
}
```

Результат виконання:

```text
Book 1
Book 3
missing: true
```

`equal_range` повертає межі групи, а не копію книг. Для відсутнього автора межі однакові. Не змінюйте ключ автора через ітератор; для перейменування потрібно перебудувати відповідні записи.
