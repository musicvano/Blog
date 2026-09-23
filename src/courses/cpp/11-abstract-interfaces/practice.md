---
title: Practice
description: "Topic 11. Abstract Classes, Interfaces: worked examples"
outline: [2, 3]
sourceHash: "60c4a11b5e45863dda5f41a8e706e38bc1b922eb4b9d103f8fcf6064e9cdd8e8"
---

# Practice

Each example is a separate program. The `assert` checks run in a build without `NDEBUG`; they check the logic of the example and do not replace validation of user input. Invalid arguments are handled with explicit exceptions.

## Example 1. A smart lamp

**Problem.** Combine three narrow interfaces: switching on, brightness and a training schedule hour.

```cpp
#include <cassert>
#include <print>
#include <stdexcept>
struct Switchable {
    virtual ~Switchable() = default;
    virtual void setOn(bool value) = 0;
};
struct Dimmable {
    virtual ~Dimmable() = default;
    virtual void brightness(int value) = 0;
};
struct Schedulable {
    virtual ~Schedulable() = default;
    virtual void schedule(int hour) = 0;
};
class SmartLamp final : public Switchable, public Dimmable,
                        public Schedulable {
    bool on_ = false;
    int brightness_ = 50, hour_ = 0;
public:
    void setOn(bool value) override { on_ = value; }
    void brightness(int n) override {
        if (n < 0 || n > 100) throw std::invalid_argument("light");
        brightness_ = n;
    }
    void schedule(int h) override {
        if (h < 0 || h > 23) throw std::invalid_argument("hour");
        hour_ = h;
    }
    int effective() const { return on_ ? brightness_ : 0; }
    int hour() const { return hour_; }
};
int main() {
    SmartLamp lamp;
    Switchable& power = lamp; power.setOn(true);
    Dimmable& light = lamp; light.brightness(80);
    Schedulable& plan = lamp; plan.schedule(18);
    try { light.brightness(101); assert(false); }
    catch (const std::invalid_argument&) {}
    assert(lamp.effective() == 80 && lamp.hour() == 18);
    power.setOn(false); assert(lamp.effective() == 0);
    std::println("Schedule: {}; light: {}",
        lamp.hour(), lamp.effective());
}
```

The schedule only stores the hour; the example does not start a background timer and does not control any hardware. The separate roles work with the same state of one object.

Output:

```text
Schedule: 18; light: 0
```

## Example 2. A weather observer

**Problem.** Subscribe a display, avoid a duplicate and stop notifications after unsubscription.

```cpp
#include <algorithm>
#include <cassert>
#include <cmath>
#include <print>
#include <stdexcept>
#include <vector>
struct Listener {
    virtual ~Listener() = default;
    virtual void update(double value) = 0;
};
struct Display final : Listener {
    int calls = 0;
    double last = 0;
    void update(double value) override { ++calls; last = value; }
};
class Station {
    std::vector<Listener*> listeners_;
public:
    void subscribe(Listener& listener) {
        for (auto* item : listeners_) if (item == &listener) return;
        listeners_.push_back(&listener);
    }
    void unsubscribe(Listener& listener) {
        std::erase(listeners_, &listener);
    }
    void publish(double value) {
        if (!std::isfinite(value))
            throw std::invalid_argument("measurement");
        for (auto* listener : listeners_) listener->update(value);
    }
};
int main() {
    Display display;
    Station station;
    station.subscribe(display); station.subscribe(display);
    station.publish(21.5);
    assert(display.calls == 1 && display.last == 21.5);
    station.unsubscribe(display); station.publish(30);
    assert(display.calls == 1);
    try { station.publish(std::nan("")); assert(false); }
    catch (const std::invalid_argument&) {}
    std::println("Events: {}; last: {}",
        display.calls, display.last);
}
```

The listener outlives the station, and it is unsubscribed before the later events. The contract of the example forbids changing subscriptions from update and does not catch listener exceptions; these policies must be extended explicitly.

Output:

```text
Events: 1; last: 21.5
```

## Example 3. An editor with commands

**Problem.** Store text-append commands; check undo, redo and clearing the old branch after a new action.

```cpp
#include <cassert>
#include <memory>
#include <print>
#include <string>
#include <utility>
#include <vector>
struct Command {
    virtual ~Command() = default;
    virtual void execute() = 0;
    virtual void undo() = 0;
};
class Append final : public Command {
    std::string& text_;
    std::string suffix_;
public:
    Append(std::string& text, std::string suffix)
        : text_(text), suffix_(std::move(suffix)) {}
    void execute() override { text_ += suffix_; }
    void undo() override {
        text_.resize(text_.size() - suffix_.size());
    }
};
class History {
    std::vector<std::unique_ptr<Command>> done_, undone_;
public:
    void run(std::unique_ptr<Command> command) {
        if (!command) return;
        done_.reserve(done_.size() + 1);
        command->execute();
        undone_.clear(); done_.push_back(std::move(command));
    }
    bool undo() {
        if (done_.empty()) return false;
        undone_.reserve(undone_.size() + 1);
        done_.back()->undo();
        undone_.push_back(std::move(done_.back())); done_.pop_back();
        return true;
    }
    bool redo() {
        if (undone_.empty()) return false;
        done_.reserve(done_.size() + 1);
        undone_.back()->execute();
        done_.push_back(std::move(undone_.back()));
        undone_.pop_back();
        return true;
    }
};
int main() {
    std::string text;
    History history;
    assert(!history.undo() && !history.redo());
    history.run(std::make_unique<Append>(text, "A"));
    history.run(std::make_unique<Append>(text, "B"));
    assert(text == "AB");
    assert(history.undo() && text == "A");
    assert(history.redo() && text == "AB");
    assert(history.undo());
    history.run(std::make_unique<Append>(text, "C"));
    assert(!history.redo() && text == "AC");
    std::println("Text: {}", text);
}
```

The text outlives the history and is changed only by its commands. Undo is called only for an executed command, in reverse order. For arbitrary external editing or other commands, this contract must be strengthened.

Output:

```text
Text: AC
```
