---
title: "Examples and common mistakes"
description: "Topic 9. Multithreading in C++: Examples and common mistakes"
outline: [2, 3]
sourceHash: "7f8b0bd6e7f7f93976c01f16380da46caafbaba567409ba0785758615bdbf960"
---

# Examples and common mistakes

## Program examples

All programs were built with the GCC 15.2 compiler (MinGW-w64 from CLion 2026.2.1), CMake 4.4, and Ninja 1.13 in the Release configuration and run on a computer with an Intel Core i9-11900KF processor (8 cores, 16 logical processors) under Windows 11. On another computer and in Ubuntu, the times will differ.

### Parallel vector sum

The program fills a vector with 100 million random numbers, computes the sum of their square roots in $p = 1 , 2 , 4 , 8 , 16$ `std::jthread` threads, and prints the median time of five runs, the speedup, the efficiency, and the relative error compared with the sequential sum. The project consists of the files `CMakeLists.txt`, `CMakePresets.json` (both shown above), and `main.cpp`.

```cpp
#include <algorithm>
#include <chrono>
#include <cmath>
#include <cstddef>
#include <numeric>
#include <print>
#include <random>
#include <string>
#include <thread>
#include <vector>

using Clock = std::chrono::steady_clock;

// Sum of the square roots of the elements with indices [from, to).
double sum_range(const std::vector<double>& v,
                 std::size_t from, std::size_t to) {
    double sum = 0.0;
    for (std::size_t i = from; i < to; ++i) sum += std::sqrt(v[i]);
    return sum;
}

double parallel_sum(const std::vector<double>& v, unsigned p) {
    std::vector<double> parts(p);          // the result of each thread
    {
        std::vector<std::jthread> threads;
        std::size_t chunk = v.size() / p;
        for (unsigned k = 0; k < p; ++k) {
            std::size_t from = k * chunk;
            std::size_t to = k + 1 == p ? v.size() : from + chunk;
            threads.emplace_back([&v, &parts, k, from, to] {
                parts[k] = sum_range(v, from, to);
            });
        }
    }   // here the jthread destructors wait for the threads to finish

    return std::accumulate(parts.begin(), parts.end(), 0.0);
}

// Median time (ms) of five runs; result is the sum from the last run.
double median_ms(const std::vector<double>& v, unsigned p,
                 double& result) {
    std::vector<double> times;
    for (int run = 0; run < 5; ++run) {
        auto start = Clock::now();
        result = parallel_sum(v, p);
        std::chrono::duration<double, std::milli> ms =
            Clock::now() - start;
        times.push_back(ms.count());
    }
    std::ranges::sort(times);
    return times[2];
}

int main(int argc, char* argv[]) {
    std::size_t n = argc > 1 ? std::stoull(argv[1]) : 100'000'000;
    unsigned cores = std::thread::hardware_concurrency();

    std::vector<double> v(n);
    std::mt19937_64 gen(42);                     // fixed seed
    std::uniform_real_distribution<double> dist(0.0, 100.0);
    std::ranges::generate(v, [&] { return dist(gen); });

    std::println("n = {}, logical processors: {}", n, cores);
    double expected = sum_range(v, 0, n);        // also a warmup
    double t1 = 0.0;
    std::println("{:>3} {:>9} {:>6} {:>6} {:>10}",
                 "p", "T, ms", "S", "E", "error");
    for (unsigned p = 1; p <= cores; p *= 2) {
        double sum = 0.0;
        double tp = median_ms(v, p, sum);
        if (p == 1) t1 = tp;
        double s = t1 / tp;
        std::println("{:>3} {:>9.1f} {:>6.2f} {:>5.0f}% {:>10.1e}",
                     p, tp, s, 100 * s / p,
                     std::abs(sum - expected) / expected);
    }
}
```

Each thread writes its result only to its own element `parts[k]`, so no synchronization is needed. The vector of threads is declared in a nested block: when the block closes, the `std::jthread` destructors wait for all threads, and only then are the parts added. The last thread gets the remaining elements if `n` is not divisible by `p`. The lambda captures the vector by reference and the bounds by value: capturing `k` by reference would cause a race with the loop variable. Build and output:

```
cmake --preset release
cmake --build --preset release
./build/release/parallel_sum
n = 100000000, logical processors: 16
  p     T, ms      S      E      error
  1     134.1   1.00   100%    0.0e+00
  2      69.1   1.94    97%    7.0e-14
  4      34.8   3.86    96%    2.7e-14
  8      28.5   4.70    59%    1.1e-15
 16      22.1   6.06    38%    7.1e-14
```

Up to 4 threads, the speedup is almost linear; beyond that, efficiency drops: computing a square root is very fast, and the limit becomes the memory bandwidth from which the threads read 800 MB of data. The error of the order of $10^{- 14}$ is explained by the different order in which floating-point numbers are added in the parts, not by a parallelization bug.

### Bank account

The program compares three ways of depositing money into an account from 8 threads, 1 million times each: without synchronization, with `std::mutex`, and with `std::atomic`; it then performs opposite transfers between two accounts using `std::scoped_lock` and checks that the total amount of money has not changed.

```cpp
#include <atomic>
#include <chrono>
#include <mutex>
#include <print>
#include <thread>
#include <vector>

const int Threads = 8;
const int Deposits = 1'000'000;          // deposits per thread

// Deposit amounts (1 each): a write to memory, not just to a register.
std::vector<long long> amounts(Deposits, 1);

// Starts Threads threads; each calls deposit Deposits times.
template <typename F>
double run(F deposit) {
    auto start = std::chrono::steady_clock::now();
    {
        std::vector<std::jthread> threads;
        for (int t = 0; t < Threads; ++t)
            threads.emplace_back([&] {
                for (int i = 0; i < Deposits; ++i)
                    deposit(amounts[i]);
            });
    }
    std::chrono::duration<double, std::milli> ms =
        std::chrono::steady_clock::now() - start;
    return ms.count();
}

struct Account {
    int id;
    long long balance;
    std::mutex m;
};

// Transfer: scoped_lock locks both mutexes without deadlock.
void transfer(Account& from, Account& to, long long amount) {
    std::scoped_lock lock(from.m, to.m);
    if (from.balance >= amount) {
        from.balance -= amount;
        to.balance += amount;
    }
}

int main() {
    long long expected = 1LL * Threads * Deposits;
    std::println("Expected balance: {}", expected);

    long long unsafe = 0;                        // a race!
    double t = run([&](long long x) { unsafe += x; });
    std::println("No synchronization: {:>9} ({:.0f} ms)", unsafe, t);

    long long guarded = 0;
    std::mutex m;
    t = run([&](long long x) {
        std::lock_guard lock(m);
        guarded += x;
    });
    std::println("std::mutex:         {:>9} ({:.0f} ms)", guarded, t);

    std::atomic<long long> atomic = 0;
    t = run([&](long long x) { atomic += x; });
    std::println("std::atomic:        {:>9} ({:.0f} ms)",
                 atomic.load(), t);

    // Opposite transfers between two accounts from two threads.
    Account a{1, 1'000'000, {}}, b{2, 1'000'000, {}};
    {
        std::jthread ab([&] {
            for (int i = 0; i < Deposits; ++i) transfer(a, b, 30);
        });
        std::jthread ba([&] {
            for (int i = 0; i < Deposits; ++i) transfer(b, a, 20);
        });
    }
    std::println("Accounts: {} + {} = {}", a.balance, b.balance,
                 a.balance + b.balance);
}
```

The deposit amounts are taken from an array: if a thread simply added 1, the compiler could replace the whole loop with a single addition, and the race would become invisible (but would not go away). Output (the unsynchronized value and the account balances change from run to run):

```
Expected balance: 8000000
No synchronization:   1403547 (1 ms)
std::mutex:           8000000 (263 ms)
std::atomic:          8000000 (176 ms)
Accounts: 2000000 + 0 = 2000000
```

Without synchronization, more than 80% of the deposits were lost. The mutex and the atomic variable give the correct result but are hundreds of times slower than the incorrect code: the threads constantly compete for one mutex or cache line, so multithreading does not pay off for such fine-grained work. A better option is a local sum in each thread and a single addition at the end. The opposite transfers did not cause a deadlock, and the total amount was preserved; the balances depend on how the scheduler interleaved the two threads. If you build this program with `-fsanitize=thread` in Ubuntu, TSan will report a race on the line `unsafe += x`.

### Thread pool

The program implements a thread pool on `std::jthread`, `std::condition_variable`, and `std::packaged_task`, submits four tasks that count primes in ranges up to 10 million and one task with invalid arguments, obtains the results through `std::future`, and catches the exception.

```cpp
#include <condition_variable>
#include <functional>
#include <future>
#include <mutex>
#include <print>
#include <queue>
#include <stdexcept>
#include <thread>
#include <vector>

class ThreadPool {
public:
    explicit ThreadPool(unsigned count) {
        for (unsigned i = 0; i < count; ++i)
            workers_.emplace_back([this] { work(); });
    }

    ~ThreadPool() {
        {
            std::lock_guard lock(mutex_);
            stopping_ = true;
        }

        ready_.notify_all();      // wake everyone up to finish
    }                             // then the jthread destructors: join()

    // Puts a function in the queue and returns a future for its result.
    template <typename F>
    auto submit(F f) -> std::future<decltype(f())> {
        std::packaged_task<decltype(f())()> task(std::move(f));
        auto result = task.get_future();
        {
            std::lock_guard lock(mutex_);
            tasks_.emplace(std::move(task));
        }
        ready_.notify_one();      // wake up one worker thread
        return result;
    }

private:
    void work() {
        while (true) {
            std::move_only_function<void()> task;
            {
                std::unique_lock lock(mutex_);
                ready_.wait(lock, [this] {
                    return stopping_ || !tasks_.empty();
                });
                if (tasks_.empty()) return;   // the queue is empty
                task = std::move(tasks_.front());
                tasks_.pop();
            }

            task();               // runs without holding the lock
        }
    }

    std::mutex mutex_;
    std::condition_variable ready_;
    std::queue<std::move_only_function<void()>> tasks_;
    bool stopping_ = false;
    std::vector<std::jthread> workers_;  // last: destroyed first
};

// The number of primes in the range [from, to).
int count_primes(int from, int to) {
    if (from > to) throw std::invalid_argument("from > to");
    int count = 0;
    for (int n = std::max(from, 2); n < to; ++n) {
        bool prime = true;
        for (int d = 2; d * d <= n && prime; ++d) prime = n % d != 0;
        count += prime;
    }
    return count;
}

int main() {
    ThreadPool pool(4);
    const int Step = 2'500'000;
    std::vector<std::future<int>> results;
    for (int k = 0; k < 4; ++k)
        results.push_back(pool.submit([k] {
            return count_primes(k * Step, (k + 1) * Step);
        }));
    auto wrong = pool.submit([] { return count_primes(10, 1); });

    int total = 0;
    for (int k = 0; k < 4; ++k) {
        int count = results[k].get();       // waits for the result
        std::println("[{:>8}; {:>8}): {:>6}", k * Step,
                     (k + 1) * Step, count);
        total += count;
    }
    std::println("Total primes below {}: {}", 4 * Step, total);
    try {
        wrong.get();                        // the exception from a pool thread
    } catch (const std::invalid_argument& e) {
        std::println("Task error: {}", e.what());
    }
}
```

The order of the fields matters: class members are destroyed in reverse order of declaration, so the `workers_` vector is declared last – the threads finish before the mutex, condition variable, and queue they use are destroyed. A worker exits only when the flag is set and the queue is empty, so all submitted tasks will be executed. The exception thrown in `count_primes` is stored by `packaged_task` in the `future`, and it is rethrown on `get()` in the main thread. Output:

```
[       0;  2500000): 183072
[ 2500000;  5000000): 165441
[ 5000000;  7500000): 159748
[ 7500000; 10000000): 156318
Total primes below 10000000: 664579
Task error: from > to
```

### STL parallel algorithms

The program sorts 20 million random numbers with the `seq` and `par` policies and computes the sum $\sum e^{- x_{i}^{2}}$ with the `std::transform_reduce` algorithm using all four policies. For each variant, it prints the median time of five runs and the speedup, as well as the largest relative deviation of the sum from the sequential one. `CMakeLists.txt` differs from the previous example only in its conditions: for GCC (`CMAKE_CXX_COMPILER_ID STREQUAL "GNU"`), `find_package(TBB QUIET)` is executed and, if TBB is found, `TBB::tbb` is linked; otherwise, the `message(WARNING …)` command warns that `par` runs sequentially; for Visual C++ (`if(MSVC)`), the `/O2 /utf-8` flags are set.

```cpp
#include <algorithm>
#include <chrono>
#include <cmath>
#include <execution>
#include <functional>
#include <print>
#include <random>
#include <string_view>
#include <vector>

namespace ex = std::execution;
using Data = std::vector<double>;

// Median time (ms) of five runs of action(a copy of data).
double median_ms(const Data& data, auto action) {
    std::vector<double> times;
    for (int run = 0; run < 5; ++run) {
        Data copy = data;
        auto start = std::chrono::steady_clock::now();
        action(copy);
        std::chrono::duration<double, std::milli> ms =
            std::chrono::steady_clock::now() - start;
        times.push_back(ms.count());
    }
    std::ranges::sort(times);
    return times[2];
}

void report(std::string_view name, double t, double t_seq) {
    std::println("  {:<10} {:>8.1f} ms  S = {:.2f}", name, t,
                 t_seq / t);
}

// Sum of exp(-x²) with the given policy.
double gauss_sum(const auto& policy, const Data& v) {
    return std::transform_reduce(policy, v.begin(), v.end(), 0.0,
        std::plus<>{}, [](double x) { return std::exp(-x * x); });
}

int main() {
    const std::size_t N = 20'000'000;
    Data data(N);
    std::mt19937_64 gen(2026);
    std::uniform_real_distribution<double> dist(-3.0, 3.0);
    std::ranges::generate(data, [&] { return dist(gen); });

    std::println("sort, {} elements:", N);
    double seq = median_ms(data, [](Data& v) {
        std::sort(ex::seq, v.begin(), v.end());
    });
    report("seq", seq, seq);
    double par = median_ms(data, [](Data& v) {
        std::sort(ex::par, v.begin(), v.end());
    });
    report("par", par, seq);

    std::println("transform_reduce, sum of exp(-x²):");
    double sums[4];
    seq = median_ms(data, [&](Data& v) {
        sums[0] = gauss_sum(ex::seq, v); });
    report("seq", seq, seq);
    report("unseq", median_ms(data, [&](Data& v) {
        sums[1] = gauss_sum(ex::unseq, v); }), seq);
    report("par", median_ms(data, [&](Data& v) {
        sums[2] = gauss_sum(ex::par, v); }), seq);
    report("par_unseq", median_ms(data, [&](Data& v) {
        sums[3] = gauss_sum(ex::par_unseq, v); }), seq);
    double deviation = 0;
    for (double s : sums)
        deviation =
            std::max(deviation, std::abs(s - sums[0]) / sums[0]);
    std::println("Sum: {:.4f}, largest deviation: {:.1e}",
                 sums[0], deviation);
}
```

Each run gets a fresh copy of the data, so sorting always starts from the same unsorted array. The result of the GCC 15.2 build (MinGW, no TBB):

```
CMake Warning at CMakeLists.txt:13 (message):
  TBB not found: par runs sequentially
...
sort, 20000000 elements:
  seq          1373.8 ms  S = 1.00
  par          1555.1 ms  S = 0.88
transform_reduce, sum of exp(-x²):
  seq           801.4 ms  S = 1.00
  unseq         791.2 ms  S = 1.01
  par           784.7 ms  S = 1.02
  par_unseq     789.3 ms  S = 1.02
Sum: 5910395.4111, largest deviation: 2.8e-14
```

The same project built with Visual C++ 2026 (in *Developer PowerShell*: `cmake -S . -B build-msvc -G Ninja -DCMAKE_BUILD_TYPE=Release -DCMAKE_CXX_COMPILER=cl`):

```
sort, 20000000 elements:
  seq          1666.4 ms  S = 1.00
  par           285.6 ms  S = 5.84
transform_reduce, sum of exp(-x²):
  seq            80.5 ms  S = 1.00
  unseq          76.9 ms  S = 1.05
  par             9.0 ms  S = 8.90
  par_unseq       9.3 ms  S = 8.65
Sum: 5910395.4111, largest deviation: 4.6e-14
```

Without TBB, the GCC library runs all policies sequentially (differences of a few percent are measurement noise), and only CMake warns about this during configuration. In Visual C++, parallel sorting is almost 6 times faster, and the independent exponent computations about 9 times faster, that is, more than the number of physical cores thanks to SMT. The `unseq` policy added almost nothing: the compiler does not vectorize the call to `std::exp`. The different sequential times of the two compilers are explained by different implementations of `std::sort` and `std::exp`; for such short operations (tens of milliseconds), the results fluctuate noticeably between runs. In Ubuntu with the `libtbb-dev` package, GCC selects the TBB backend, and the `par` policy also uses all cores.

## Common mistakes

Table 9.3. Common mistakes in multithreaded C++ programs {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| the program terminates abnormally with `terminate called without an active exception` | a `std::thread` object was destroyed without `join`/`detach`; use `std::jthread` |
| a thread modifies a copy of a variable | arguments are copied; pass `std::ref(x)` or capture by reference |
| a counter value is smaller than expected or changes between runs | a data race; use `std::mutex`, `std::atomic`, or per-thread local results; check with TSan |
| the program “hangs” during transfers | two mutexes are locked in different orders; use `std::scoped_lock(a, b)` |
| a thread does not wake up or wakes up without data | `wait` without a predicate, or a notification outside a state change; use `cv.wait(lock, pred)` |
| `std::async` tasks run one after another | the `future` was not stored, or `std::launch::async` was not specified |
| `std::execution::par` does not speed up a program built with GCC | TBB is not installed; use `libtbb-dev`, `find_package(TBB)`, `TBB::tbb` |
| `undefined reference to std::__open_terminal` | `std::print` in MinGW; link with `stdc++exp` |
| a MinGW program does not start outside CLion (no `libstdc++-6.dll`) | add the `mingw\bin` directory to `PATH` or link statically (`-static`) |
| the speedup is much lower than in Release | built with the Debug profile (`-O0`); use `cmake --preset release` |
