---
title: Практика
description: "Тема 12. Шаблони та концепти: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожен завершений приклад має власний `main` і збирається в окремому
консольному проєкті. Початкові дані наведено безпосередньо в програмі.
Використайте x64, `/std:c++latest`, `/EHsc`, `/W4`, `/utf-8` та
`/permissive-`. Після помилки збирання не запускайте старий виконуваний файл.

## Приклад 1. Пара та трійка

**Умова.** Порівняти координатні набори лексикографічно.

```cpp
#include <compare>
#include <print>

template<class T>
struct Pair {
    T first, second;
    auto operator<=>(const Pair&) const = default;
};
template<class T>
Pair(T, T) -> Pair<T>;

template<class T>
struct Triple {
    T first, second, third;
    auto operator<=>(const Triple&) const = default;
};
template<class T>
Triple(T, T, T) -> Triple<T>;

int main()
{
    Pair a{2, 9}, b{3, 1};
    Triple x{1, 2, 3}, y{1, 2, 4};
    std::println("pair: {}", a < b);
    std::println("triple: {}", x < y);
}
```

Результат виконання:

```text
pair: true
triple: true
```

Порівняння починається з першого відмінного поля. Це не порівняння сум координат. Перевірте однакові набори та відмінність лише останнього поля; CTAD вимагає узгоджених типів аргументів.

## Приклад 2. Типобезпечні одиниці

**Умова.** Додати дві довжини, зберігши окремий тип часу.

```cpp
#include <concepts>
#include <print>

struct Metres {};
struct Seconds {};
template<class Unit, std::floating_point T = double>
struct Quantity {
    T value;
    Quantity operator+(Quantity rhs) const {
        return {value + rhs.value};
    }
};

int main()
{
    Quantity<Metres> a{2.5}, b{1.5};
    Quantity<Seconds> duration{2.0};
    auto distance = a + b;
    std::println("distance: {} m", distance.value);
    std::println("time: {} s", duration.value);
}
```

Результат виконання:

```text
distance: 4 m
time: 2 s
```

У копії файла спробуйте `a + duration`: збирання має відмовити, бо це різні спеціалізації. Заміна тегів псевдонімами double знищила б цей захист. Наведений тип не перевіряє додатність і не реалізує перетворення одиниць; це окремі вимоги.

## Приклад 3. Концепт Shape

**Умова.** Порахувати сумарну площу прямокутника й квадрата без спільного базового класу.

```cpp
#include <concepts>
#include <print>

template<class T>
concept Shape = requires(const T& shape) {
    { shape.area() } -> std::convertible_to<double>;
};
struct Rectangle {
    double width, height;
    double area() const { return width * height; }
};
struct Square {
    double side;
    double area() const { return side * side; }
};
double total(Shape auto a, Shape auto b)
{
    return a.area() + b.area();
}

int main()
{
    std::println("area: {}",
        total(Rectangle{2, 3}, Square{4}));
}
```

Результат виконання:

```text
area: 22
```

Вимога перевіряє саме const-виклик area. Метод без const не задовольнить інтерфейс для незмінної фігури. Додайте негативний тест зі структурою без area і окремо перевірте нульову сторону. Концепт не забороняє від’ємні геометричні розміри: їх слід перевіряти в конструкторі реального доменного класу.
