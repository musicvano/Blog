---
title: Практика
description: "Тема 7. Класи та об’єкти: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожен приклад є окремою програмою. Перевірки `assert` виконуються у збірці
без `NDEBUG`; вони перевіряють логіку прикладу й не замінюють перевірку
користувацького введення. Помилкові аргументи обробляються явними винятками.

## Приклад 1. Секундомір

**Умова.** Реалізувати start/stop на steady_clock; відхилити повторний запуск і зупинку без запуску.

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
    std::println("Невід’ємна тривалість: {}", seconds >= 0);
}
```

`steady_clock` призначений для вимірювання інтервалів. Конкретна тривалість залежить від запуску, тому тест перевіряє властивість, а не вигадане число секунд. Відмова повторного start не скидає початковий момент.

Результат виконання:

```text
Невід’ємна тривалість: true
```

## Приклад 2. Термостат

**Умова.** Інкапсулювати режим і цільову температуру від 5 до 30 градусів; відхилити NaN та вихід за межі.

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
    std::println("Нагрівання при 4: {}", t.heating(4));
}
```

Вихід за межі перевіряється разом із скінченністю числа: звичайні порівняння самі не відхиляють NaN. Модель навчальна: гістерезис та керування реальним обладнанням не реалізуються.

Результат виконання:

```text
Нагрівання при 4: true
```

## Приклад 3. Парковка

**Умова.** Зберігати автомобілі за номерами, заборонити дублікати й перевищення місткості, підтримати виїзд.

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
    std::println("Автомобілів: {}", p.size());
}
```

Статична перевірка номера не потребує конкретної парковки. Приклад перевіряє лише навчальне правило довжини, а не державний формат номерних знаків. `vector` володіє об’єктами за значенням.

Результат виконання:

```text
Автомобілів: 0
```
