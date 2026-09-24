---
title: "Atomic operations and asynchronous results"
description: "Topic 9. Multithreading in C++: Atomic operations and asynchronous results"
outline: [2, 3]
sourceHash: "126001d761844c56ec705991425a0212e3764186555d85202faff9719cda033c"
---

# Atomic operations and asynchronous results

## Atomic operations

The **`std::atomic<T>`** template (<https://en.cppreference.com/w/cpp/atomic/atomic>) performs operations on integers, pointers, and `bool` atomically, without a mutex, using processor instructions (`lock xadd`, `lock cmpxchg`). The `++` and `+=` operators and the `fetch_add` and `exchange` methods are atomic, whereas the expression `x = x + 1` consists of two separate atomic operations and does not eliminate the race.

The basis of nonblocking algorithms is **compare-and-swap** (CAS). The `compare_exchange_weak(expected, desired)` method writes `desired` only if the current value equals `expected`; otherwise, it writes the actual value to `expected` and returns `false`. The `weak` version can spuriously return `false`, so it is called in a loop:

```cpp
std::atomic<int> maximum = 0;

void update_max(int value) {
    int current = maximum.load();
    while (value > current &&
           !maximum.compare_exchange_weak(current, value)) {
        // current has been updated with the actual value – retry
    }
}
```

The `wait(old)` and `notify_one()` / `notify_all()` methods (C++20) make it possible to wait for an atomic variable to change without busy waiting, for example `ready.wait(false)` until a flag is set.

**False sharing** (Topic 4) also occurs in C++ when the counters of different threads end up in the same cache line. The constant `std::hardware_destructive_interference_size` (64 bytes on x86-64) sets the minimum distance by which such data should be separated:

```cpp
struct Counter {
    alignas(std::hardware_destructive_interference_size)
    std::atomic<long> value = 0;          // sizeof(Counter) == 64
};
Counter counters[16];                     // each in its own cache line
```

## Asynchronous results: async, future, promise

A `std::thread` does not return a value. To pass a result between threads, there is the **future value** `std::future<T>` (the analog of `Task<T>`) and related facilities (<https://en.cppreference.com/w/cpp/thread/async>):

- **`std::async(policy, f, args…)`** runs a function and returns a `future`. The `std::launch::async` policy starts a new thread, while `std::launch::deferred` defers execution until `get()` is called, in the calling thread. Without a policy, the implementation chooses on its own, so for parallelism the `async` policy is specified explicitly;
- **`future.get()`** waits for the result and returns it (only once) or rethrows the exception that occurred in the function; `wait_for` waits with a timeout; `std::shared_future` lets several threads read the result;
- **`std::promise<T>`** – a “promise” through which a thread itself sets a value (`set_value`) or an exception (`set_exception`) for its `future`; the analog of `TaskCompletionSource`;
- **`std::packaged_task<R(Args…)>`** – a function wrapper that, after being called, writes the result to a `future`; convenient for task queues and pools.

```cpp
// fib(n) – recursive computation of a Fibonacci number
auto f1 = std::async(std::launch::async, fib, 35);  // a new thread
long long own = fib(32);                            // in parallel
std::println("{} {}", f1.get(), own);

std::promise<double> promise;
std::future<double> reading = promise.get_future();
std::jthread sensor([p = std::move(promise)]() mutable {
    try {
        throw std::runtime_error("sensor is not responding");
    } catch (...) {
        p.set_exception(std::current_exception());
    }
});
try {
    reading.get();                      // the exception from the sensor thread
} catch (const std::exception& e) {
    std::println("{}", e.what());       // sensor is not responding
}
```

::: tip Warning
The destructor of a `future` obtained from `std::async` **waits** for the task to finish. A call to `std::async(std::launch::async, f);` without storing the result runs sequentially: the temporary `future` is destroyed immediately, and the program waits until `f` finishes.
:::

## A thread pool

Creating an operating system thread takes tens of microseconds and requires memory for the stack, so for many small tasks threads are reused in a **thread pool** (Topic 2). The C++ standard library has no pool (in C++26, its role is played by `std::execution` schedulers), so a pool is written by hand or taken from libraries (TBB, Boost.Asio). A classic pool (Fig. 9.6) consists of a vector of `std::jthread` threads; a task queue `std::queue<std::move_only_function<void()>>` under a mutex; a condition variable with a shutdown flag; a `submit(f)` method that wraps the function in a `std::packaged_task`, puts it in the queue, calls `notify_one()`, and returns a `future`; and a destructor that sets the flag, calls `notify_all()`, and waits for the threads. The `std::move_only_function` type (C++23) is needed because a `packaged_task` cannot be copied. A task is executed **after** the mutex is released; otherwise, the workers would run one at a time. The complete implementation is in the “Thread pool” example.
