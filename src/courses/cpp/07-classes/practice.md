---
title: Practice
description: "Topic 7. Classes and Objects: worked examples"
outline: [2, 3]
sourceHash: "84671cc71067dd08d51399bd12c8bf2822025b19c4ac457442b5575c1a84316d"
---

# Practice

Each example is a separate program. The `assert` checks run in a build without
`NDEBUG`; they check the logic of the example and do not replace validating
user input. Invalid arguments are handled with explicit exceptions.

## Example 1. A stopwatch

**Problem.** Implement start/stop on top of steady_clock; reject a repeated start and a stop without a start.

```cpp
#include <cassert>
#include <chrono>
#include <print>
#include <stdexcept>

class Stopwatch {
    using Clock = std::chrono::steady_clock;
    Clock::time_point start_{};
    bool running_ = false;
public:
    void start() {
        if (running_) throw std::logic_error("already running");
        start_ = Clock::now();
        running_ = true;
    }

    double stop() {
        if (!running_) throw std::logic_error("not running");
        const auto end = Clock::now();
        running_ = false;
        return std::chrono::duration<double>(end - start_).count();
    }
};

int main() {
    Stopwatch timer;
    try { timer.stop(); assert(false); }
    catch (const std::logic_error&) {}
    timer.start();
    try { timer.start(); assert(false); }
    catch (const std::logic_error&) {}
    const double seconds = timer.stop();
    assert(seconds >= 0);
    std::println("Non-negative duration: {}", seconds >= 0);
}
```

`steady_clock` is designed for measuring intervals. The actual duration depends on the run, so the test checks a property rather than a made-up number of seconds. Rejecting a repeated start does not reset the starting moment.

Output:

```text
Non-negative duration: true
```

## Example 2. A thermostat

**Problem.** Encapsulate the mode and a target temperature from 5 to 30 degrees; reject NaN and out-of-range values.

```cpp
#include <cassert>
#include <cmath>
#include <limits>
#include <print>
#include <stdexcept>

class Thermostat {
public:
    enum class Mode { off, heat };
private:
    Mode mode_ = Mode::off;
    double target_ = 20;
public:
    void target(double value) {
        if (!std::isfinite(value) || value < 5 || value > 30)
            throw std::invalid_argument("temperature");
        target_ = value;
    }

    void mode(Mode value) { mode_ = value; }

    bool heating(double room) const {
        if (!std::isfinite(room))
            throw std::invalid_argument("room");
        return mode_ == Mode::heat && room < target_;
    }
};

int main() {
    Thermostat t;
    assert(!t.heating(10));
    t.target(5);
    t.mode(Thermostat::Mode::heat);
    assert(!t.heating(5));
    assert(t.heating(4));
    try { t.target(31); assert(false); }
    catch (const std::invalid_argument&) {}
    try { t.target(std::nan("")); assert(false); }
    catch (const std::invalid_argument&) {}
    assert(!t.heating(5));
    std::println("Heating at 4: {}", t.heating(4));
}
```

The range check is performed together with the finiteness check: ordinary comparisons do not reject NaN by themselves. The model is for training: hysteresis and control of real hardware are not implemented.

Output:

```text
Heating at 4: true
```

## Example 3. A parking lot

**Problem.** Store cars by license plate, forbid duplicates and exceeding the capacity, and support leaving.

```cpp
#include <algorithm>
#include <cassert>
#include <print>
#include <stdexcept>
#include <string>
#include <vector>

struct Car { std::string plate; };

class Parking {
    std::vector<Car> cars_;
    std::size_t capacity_;
public:
    explicit Parking(std::size_t cap) : capacity_(cap) {}

    static bool valid(const std::string& plate) {
        return !plate.empty() && plate.size() <= 12;
    }

    void enter(const std::string& plate) {
        if (!valid(plate)) throw std::invalid_argument("plate");
        for (const auto& car : cars_)
            if (car.plate == plate) throw std::logic_error("repeat");
        if (cars_.size() == capacity_)
            throw std::logic_error("full");
        cars_.push_back(Car{plate});
    }

    void leave(const std::string& plate) {
        for (auto it = cars_.begin(); it != cars_.end(); ++it)
            if (it->plate == plate) { cars_.erase(it); return; }
        throw std::logic_error("missing");
    }

    std::size_t size() const { return cars_.size(); }
};

int main() {
    Parking p{1};
    p.enter("TEST01");
    try { p.enter("TEST01"); assert(false); }
    catch (const std::logic_error&) {}
    try { p.enter("TEST02"); assert(false); }
    catch (const std::logic_error&) {}
    p.leave("TEST01");
    assert(p.size() == 0);
    try { p.leave("TEST01"); assert(false); }
    catch (const std::logic_error&) {}
    std::println("Cars: {}", p.size());
}
```

The static plate check does not need a particular parking lot. The example checks only a training length rule, not the official license plate format. The `vector` owns the objects by value.

Output:

```text
Cars: 0
```
