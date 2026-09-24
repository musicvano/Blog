---
title: "Practice"
description: "Topic 9. Multithreading in C++: worked examples"
outline: [2, 3]
sourceHash: "30f5fb0afea8a500509542c219dbc7cf7fa6a0644722385238de4806fadbd630"
---

# Practice

Each example is a CMake project, as in the lecture’s “Parallel vector sum” example, with the target name replaced.

## Example 1. Asynchronously counting the files in a directory

Create a program that takes a directory path as a command-line argument (the current directory by default), starts a separate `std::async` task for each first-level subdirectory that recursively counts the files and their total size using `std::filesystem`, and prints a table of the subdirectories, a total, and the time. A task’s file system errors must be written to the error stream, and an invalid path must terminate the program with exit code 1. For comparison, measure the time of a sequential traversal.

```cpp
#include <algorithm>
#include <chrono>
#include <cstdint>
#include <filesystem>
#include <future>
#include <print>
#include <string>
#include <vector>

namespace fs = std::filesystem;

struct Stats {
    std::uintmax_t files = 0;
    std::uintmax_t bytes = 0;
};

// Sequential recursive counting of files and their size.
Stats count_files(const fs::path& dir) {
    Stats s;
    auto options = fs::directory_options::skip_permission_denied;
    for (const auto& entry :
         fs::recursive_directory_iterator(dir, options)) {
        if (entry.is_regular_file()) {
            ++s.files;
            s.bytes += entry.file_size();
        }
    }
    return s;
}

int main(int argc, char* argv[]) {
    fs::path root = argc > 1 ? argv[1] : fs::current_path();
    if (!fs::is_directory(root)) {
        std::println(stderr, "Not a directory: {}", root.string());
        return 1;
    }
    auto start = std::chrono::steady_clock::now();

    // Each first-level subdirectory is a separate asynchronous task.
    std::vector<std::pair<std::string, std::future<Stats>>> tasks;
    Stats top;                               // files in root itself
    for (const auto& entry : fs::directory_iterator(root)) {
        if (entry.is_directory()) {
            tasks.emplace_back(entry.path().filename().string(),
                std::async(std::launch::async, count_files,
                           entry.path()));
        } else if (entry.is_regular_file()) {
            ++top.files;
            top.bytes += entry.file_size();
        }
    }

    Stats total = top;
    std::println("{:<24} {:>7} {:>10}", "Directory", "files", "KB");
    for (auto& [name, future] : tasks) {
        try {
            Stats s = future.get();       // the task's exception – here
            std::println("{:<24} {:>7} {:>10}", name, s.files,
                         s.bytes / 1024);
            total.files += s.files;
            total.bytes += s.bytes;
        } catch (const fs::filesystem_error& e) {
            std::println(stderr, "{}: {}", name, e.what());
        }
    }
    std::chrono::duration<double, std::milli> ms =
        std::chrono::steady_clock::now() - start;
    std::println("{:<24} {:>7} {:>10}", "Total", total.files,
                 total.bytes / 1024);
    std::println("Tasks: {}, time: {:.1f} ms", tasks.size(),
                 ms.count());

    start = std::chrono::steady_clock::now();    // for comparison
    Stats check = count_files(root);
    ms = std::chrono::steady_clock::now() - start;
    std::println("Sequential: {} files, {:.1f} ms", check.files,
                 ms.count());
}
```

The `count_files` function walks the directory tree with `recursive_directory_iterator` and skips directories without access permissions. For each subdirectory, `std::async` with the `launch::async` policy starts a separate thread; the “name – `future`” pairs are stored in a vector, so the tasks run simultaneously rather than one after another. A `filesystem_error` exception that occurred in a task is rethrown by the `get()` method and caught in the main thread. The output for the `include/c++` header directory of the GCC 15.2 compiler from CLion (in Ubuntu, the similar directory is `/usr/include/c++/15`):

```
Directory                  files         KB
backward                       8         99
bits                         167       4857
debug                         32        530
decimal                        2         33
experimental                  63       1412
ext                          286       1918
parallel                      43        526
pstl                          22        504
tr1                           62        728
tr2                            6         62
x86_64-w64-mingw32            23        177
Total                        834      13297
Tasks: 11, time: 38.9 ms
Sequential: 834 files, 22.6 ms
```

The traversal is limited by the file system, not the processor, so for a small directory the parallel version is even slower: creating 11 threads takes longer than the traversal itself. A gain is possible for large directory trees on a fast SSD.

## Example 2. A bounded buffer on semaphores

Create a class template for a bounded buffer (a circular queue) of a given capacity in which the `put` method waits for free space and `take` waits for an element to be available. Implement the buffer on two `std::counting_semaphore` semaphores and a mutex. Test it with three producers, each producing 20 numbers, and two consumers that simulate 3 ms of processing: the sums of the produced and consumed numbers must match, and the number of elements in the buffer must not exceed the capacity.

```cpp
#include <algorithm>
#include <atomic>
#include <chrono>
#include <cstddef>
#include <mutex>
#include <print>
#include <semaphore>
#include <thread>
#include <vector>

// A bounded buffer: put() waits for free space, take() for an element.
template <typename T, std::size_t Capacity>
class BoundedBuffer {
public:
    void put(T value) {
        free_.acquire();                   // take a free slot
        {
            std::lock_guard lock(mutex_);
            items_[(head_ + count_) % Capacity] = std::move(value);
            ++count_;
            max_count_ = std::max(max_count_, count_);
        }
        used_.release();                   // an element has appeared
    }

    T take() {
        used_.acquire();                   // wait for an element
        T value;
        {
            std::lock_guard lock(mutex_);
            value = std::move(items_[head_]);
            head_ = (head_ + 1) % Capacity;
            --count_;
        }
        free_.release();                   // a slot has been freed
        return value;
    }

    std::size_t max_count() {
        std::lock_guard lock(mutex_);
        return max_count_;
    }

private:
    std::counting_semaphore<Capacity> free_{Capacity};
    std::counting_semaphore<Capacity> used_{0};
    std::mutex mutex_;
    T items_[Capacity]{};
    std::size_t head_ = 0, count_ = 0, max_count_ = 0;
};

int main() {
    const int Producers = 3, Consumers = 2, Items = 20;
    BoundedBuffer<int, 4> buffer;
    std::atomic<long> produced = 0, consumed = 0;
    std::vector<long> per_consumer(Consumers);

    auto start = std::chrono::steady_clock::now();
    {
        std::vector<std::jthread> consumers;
        for (int c = 0; c < Consumers; ++c)
            consumers.emplace_back([&, c] {
                // -1 is the completion signal for this consumer.
                for (int x; (x = buffer.take()) != -1;) {
                    std::this_thread::sleep_for(
                        std::chrono::milliseconds(3));  // processing
                    consumed += x;
                    ++per_consumer[c];
                }
            });
        {
            std::vector<std::jthread> producers;
            for (int p = 0; p < Producers; ++p)
                producers.emplace_back([&, p] {
                    for (int i = 1; i <= Items; ++i) {
                        int value = (p + 1) * 100 + i;
                        buffer.put(value);
                        produced += value;
                    }
                });
        }   // all producers have finished
        for (int c = 0; c < Consumers; ++c) buffer.put(-1);
    }       // all consumers have finished
    std::chrono::duration<double, std::milli> ms =
        std::chrono::steady_clock::now() - start;

    std::println("Items produced: {}", Producers * Items);
    for (int c = 0; c < Consumers; ++c)
        std::println("Consumer {} processed: {}", c + 1,
                     per_consumer[c]);
    std::println("Sum: produced {}, consumed {}", produced.load(),
                 consumed.load());
    std::println("Most items in the buffer: {} of 4",
                 buffer.max_count());
    std::println("Time: {:.0f} ms", ms.count());
}
```

The `free_` semaphore counts the free slots, and `used_` counts the filled ones. The sum of their permits always equals the capacity, so `put` blocks on a full buffer and `take` on an empty one, without condition variables or busy waiting. The mutex protects only the short operations on the array and indices. To stop the consumers, after the producers finish, one “signal” value −1 per consumer is put into the buffer. Output:

```
Items produced: 60
Consumer 1 processed: 30
Consumer 2 processed: 30
Sum: produced 12630, consumed 12630
Most items in the buffer: 4 of 4
Time: 495 ms
```

The sums are the same in every run, while the distribution between consumers and the time can vary. The time is longer than the expected $60 \cdot 3 / 2 = 90$ ms, because on Windows the `sleep_for` delay is rounded up to the system timer resolution.

## Example 3. Stopping threads with Ctrl+C

Create a program that computes the number $\pi$ by the Monte Carlo method in `hardware_concurrency()` `std::jthread` threads until the user presses **Ctrl+C** or the number of seconds given as an argument (10 by default) elapses. After stopping, the program correctly terminates all threads and prints the reason for stopping, the total number of points, and the approximate value of $\pi$.

```cpp
#include <atomic>
#include <chrono>
#include <csignal>
#include <cstdint>
#include <print>
#include <random>
#include <stop_token>
#include <string>
#include <thread>
#include <vector>

// A flag set by the Ctrl+C signal handler.
std::atomic<bool> interrupted = false;

void on_interrupt(int) { interrupted = true; }

struct Counts {
    std::uint64_t inside = 0, total = 0;
};

// The Monte Carlo method for π until a stop is requested.
void worker(std::stop_token token, unsigned seed, Counts& result) {
    std::mt19937_64 gen(seed);
    std::uniform_real_distribution<double> dist(0.0, 1.0);
    Counts local;              // the thread's local counter
    while (!token.stop_requested()) {
        for (int i = 0; i < 100'000; ++i) {  // a chunk
            double x = dist(gen), y = dist(gen);
            local.inside += x * x + y * y <= 1.0;
        }
        local.total += 100'000;
    }
    result = local;
}

int main(int argc, char* argv[]) {
    using namespace std::chrono;
    int limit = argc > 1 ? std::stoi(argv[1]) : 10;
    unsigned count = std::thread::hardware_concurrency();
    std::signal(SIGINT, on_interrupt);

    std::vector<Counts> results(count);
    std::vector<std::jthread> workers;
    for (unsigned i = 0; i < count; ++i)
        workers.emplace_back(worker, i + 1, std::ref(results[i]));

    std::println("Threads: {}. Computing for up to {} s or until Ctrl+C...",
                 count, limit);
    auto deadline = steady_clock::now() + seconds(limit);
    while (!interrupted && steady_clock::now() < deadline)
        std::this_thread::sleep_for(milliseconds(50));

    std::println("Stopped: {}",
                 interrupted ? "Ctrl+C" : "time is up");
    for (auto& w : workers) w.request_stop();
    workers.clear();                    // destructors: join()

    Counts sum;
    for (const Counts& c : results) {
        sum.inside += c.inside;
        sum.total += c.total;
    }
    std::println("Points: {}, π ≈ {:.6f}", sum.total,
                 4.0 * sum.inside / sum.total);
}
```

The `SIGINT` signal handler only sets a `std::atomic<bool>` flag: in a signal handler it is forbidden to lock mutexes, allocate memory, or print text, whereas a lock-free atomic variable is allowed by the standard. The main thread checks the flag and the time every 50 ms, then calls `request_stop()` for all threads, and `workers.clear()` destroys the `jthread` objects, which wait for the threads to finish. The worker threads check the `stop_token` after each chunk of 100,000 points, so they stop within a fraction of a second. Each thread has its own generator with a different seed and a counter in a local variable, and writes its result to the shared vector only once. The output of a run with the argument `3`:

```
Threads: 16. Computing for up to 3 s or until Ctrl+C...
Stopped: time is up
Points: 6384500000, π ≈ 3.141591
```

The number of points changes between runs; after **Ctrl+C**, `Stopped: Ctrl+C` is printed.
