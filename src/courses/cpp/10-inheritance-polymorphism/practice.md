---
title: Practice
description: "Topic 10. Inheritance and Polymorphism: worked examples"
outline: [2, 3]
sourceHash: "ae56d02331c909633abefb97c981cc3ae538818b910e119de3d665c89d332988"
---

# Practice

Each example is a separate program. The `assert` checks run in a build
without `NDEBUG`; they check the logic of the example and don’t replace validation
of user input. Invalid arguments are handled with explicit exceptions.

## Example 1. Transport

**Problem.** Use an inherited constructor and a virtual trip duration.

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
    std::println("Hours: {:.2f}", view.hours(120));
}
```

The bus adds 15 minutes only to a nonzero trip. The explicit Vehicle::hours call uses the base check. The inherited constructor keeps the speed check.

Output:

```text
Hours: 2.25
```

## Example 2. A zoo

**Problem.** Compare a specific dynamic_cast with a general virtual sound.

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
    std::println("Wings: {}", wingCount);
}
```

The main sound loop doesn’t need to know the concrete types. Counting the wings demonstrates a separate specific capability. If it becomes central for many kinds, the common interface should be reconsidered.

Output:

```text
chirp
meow
Wings: 2
```

## Example 3. Slicing a value

**Problem.** Compare passing Base by value and by const reference.

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
    std::println("Value: {}", byValue(d));
    std::println("Reference: {}", byReference(d));
}
```

Passing by value creates a new Base. A reference doesn’t create a copy and keeps the dynamic type. This example deliberately allows copying the base to show slicing without undefined behavior.

Output:

```text
Value: Base
Reference: Derived
```
