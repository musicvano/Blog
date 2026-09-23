---
title: Практика
description: "Тема 10. Наслідування та поліморфізм: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожен приклад є окремою програмою. Перевірки `assert` виконуються у збірці
без `NDEBUG`; вони перевіряють логіку прикладу й не замінюють перевірку
користувацького введення. Помилкові аргументи обробляються явними винятками.

## Приклад 1. Транспорт

**Умова.** Використати успадкований конструктор і віртуальну тривалість поїздки.

```cpp
#include <cassert>
#include <cmath>
#include <print>
#include <stdexcept>
class Vehicle {
    double speed_;
public:
    explicit Vehicle(double speed) : speed_(speed) {
        if (!std::isfinite(speed) || speed <= 0 || speed > 300)
            throw std::invalid_argument("speed");
    }
    virtual ~Vehicle() = default;
    virtual double hours(double km) const {
        if (!std::isfinite(km) || km < 0 || km > 10000)
            throw std::invalid_argument("distance");
        return km / speed_;
    }
};
class Bus final : public Vehicle {
public:
    using Vehicle::Vehicle;
    double hours(double km) const override {
        const double travel = Vehicle::hours(km);
        return km == 0 ? 0 : travel + 0.25;
    }
};
int main() {
    const Bus bus{60};
    const Vehicle& view = bus;
    assert(view.hours(120) == 2.25);
    assert(view.hours(0) == 0);
    try { Bus bad{0}; assert(false); }
    catch (const std::invalid_argument&) {}
    try { view.hours(-1); assert(false); }
    catch (const std::invalid_argument&) {}
    std::println("Години: {:.2f}", view.hours(120));
}
```

Автобус додає 15 хвилин лише до ненульової поїздки. Явний Vehicle::hours використовує базову перевірку. Успадкований конструктор зберігає перевірку швидкості.

Результат виконання:

```text
Години: 2.25
```

## Приклад 2. Зоопарк

**Умова.** Порівняти специфічний dynamic_cast із загальним віртуальним звуком.

```cpp
#include <cassert>
#include <memory>
#include <print>
#include <string_view>
#include <typeinfo>
#include <vector>
struct Animal {
    virtual ~Animal() = default;
    virtual std::string_view sound() const { return "..."; }
};
struct Bird final : Animal {
    std::string_view sound() const override { return "chirp"; }
    int wings() const { return 2; }
};
struct Cat final : Animal {
    std::string_view sound() const override { return "meow"; }
};
int main() {
    std::vector<std::unique_ptr<Animal>> zoo;
    zoo.push_back(std::make_unique<Bird>());
    zoo.push_back(std::make_unique<Cat>());
    int wingCount = 0;
    for (const auto& animal : zoo) {
        std::println("{}", animal->sound());
        if (const auto* bird = dynamic_cast<const Bird*>(
                animal.get())) wingCount += bird->wings();
    }
    assert(wingCount == 2);
    assert(dynamic_cast<Bird*>(zoo[1].get()) == nullptr);
    try { (void)dynamic_cast<Bird&>(*zoo[1]); assert(false); }
    catch (const std::bad_cast&) {}
    std::println("Крил: {}", wingCount);
}
```

Основний цикл звуків не потребує знання конкретних типів. Підрахунок крил демонструє окрему специфічну можливість. Якщо вона стає основною для багатьох видів, варто переглянути спільний інтерфейс.

Результат виконання:

```text
chirp
meow
Крил: 2
```

## Приклад 3. Зрізання значення

**Умова.** Порівняти передавання Base за значенням і за константним посиланням.

```cpp
#include <cassert>
#include <print>
#include <string>
struct Base {
    virtual ~Base() = default;
    virtual std::string label() const { return "Base"; }
};
struct Derived final : Base {
    std::string label() const override { return "Derived"; }
};
std::string byValue(Base value) { return value.label(); }
std::string byReference(const Base& value) { return value.label(); }
int main() {
    Derived d;
    assert(byValue(d) == "Base");
    assert(byReference(d) == "Derived");
    Base sliced = d;
    assert(sliced.label() == "Base");
    std::println("Значення: {}", byValue(d));
    std::println("Посилання: {}", byReference(d));
}
```

Передавання за значенням створює новий Base. Посилання не створює копії та зберігає динамічний тип. Цей приклад навмисно дозволяє копіювання бази, щоб показати зрізання без невизначеної поведінки.

Результат виконання:

```text
Значення: Base
Посилання: Derived
```
