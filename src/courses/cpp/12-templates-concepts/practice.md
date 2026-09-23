---
title: Practice
description: "Topic 12. Templates and Concepts: worked examples"
outline: [2, 3]
sourceHash: "9379fc60b683de723c0432aff10819adea2c8e5a1c4459204e631fbb9c904068"
---

# Practice

Each complete example has its own `main` and is built in a separate console project. The initial data is given directly in the program. Use x64, `/std:c++latest`, `/EHsc`, `/W4`, `/utf-8` and `/permissive-`. After a build error, do not run the old executable.

## Example 1. A pair and a triple

**Problem.** Compare coordinate tuples lexicographically.

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

Output:

```text
pair: true
triple: true
```

The comparison starts with the first field that differs. It is not a comparison of coordinate sums. Test identical tuples and a difference only in the last field; CTAD requires consistent argument types.

## Example 2. Type-safe units

**Problem.** Add two lengths while keeping a separate type for time.

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

Output:

```text
distance: 4 m
time: 2 s
```

In a copy of the file, try `a + duration`: the build must fail because these are different specializations. Replacing the tags with aliases of double would destroy this protection. The type shown does not check that values are positive and does not implement unit conversion; these are separate requirements.

## Example 3. The Shape concept

**Problem.** Compute the total area of a rectangle and a square without a shared base class.

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

Output:

```text
area: 22
```

The requirement checks specifically a const call of area. A method without const will not satisfy the interface for an immutable shape. Add a negative test with a structure without area, and separately test a zero side. The concept does not forbid negative geometric dimensions: they should be checked in the constructor of a real domain class.
