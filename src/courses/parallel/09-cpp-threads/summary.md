---
title: "Summary"
description: "Topic 9. Multithreading in C++: conclusions and review questions"
sourceHash: "dd4ff1856b624e8050c5f3dd8c56b1fcc0de14f47ed5d39fa44205c17da22d6f"
---

# Summary

## Conclusions

In this course, multithreaded C++ programs are built with the GCC 15 compiler using CMake and Ninja: CMake describes a project in terms of targets and generates `build.ninja`, presets fix the parameters of the Debug and Release configurations, and Ninja compiles files in parallel. The CLion IDE uses the same CMake files and the WSL toolchain with Ubuntu 26.04. Threads are created with the `std::thread` and `std::jthread` classes; the latter waits for the thread to finish on its own and supports cooperative cancellation through `std::stop_token`. Shared data is protected by `std::mutex` with the `lock_guard`, `unique_lock`, `scoped_lock`, and `shared_lock` guards; waiting for conditions is implemented with `condition_variable`, semaphores, `latch`, and `barrier`; and simple counters use `std::atomic`. Results and exceptions are passed between threads with `std::future`, `std::promise`, `std::packaged_task`, and `std::async`; a thread pool is built on these facilities. In GCC, the parallel algorithms of the standard library with the `seq`, `unseq`, `par`, and `par_unseq` policies require the TBB library; otherwise, they run sequentially. The C++26 `std::execution` model is not yet implemented in GCC. Data races are detected by ThreadSanitizer, and time is measured with the `steady_clock` clock and the `perf stat` utility.

## Self-check questions

1. What are the stages of building a C++ project with CMake and Ninja?
2. What do the `add_executable`, `target_compile_features`, and `target_link_libraries` commands describe?
3. Why do you need the `CMakePresets.json` file? How do you build a project with a preset?
4. What are a toolchain and a CMake profile in CLion? How do the MinGW and WSL toolchains differ?
5. How does `std::jthread` differ from `std::thread`?
6. What happens if you destroy a joinable `std::thread` object?
7. How do you pass an argument to a thread by reference?
8. How does cooperative cancellation through `std::stop_token` work?
9. How do `lock_guard`, `unique_lock`, `scoped_lock`, and `shared_lock` differ?
10. Why does a condition variable need a predicate?
11. What are `counting_semaphore`, `latch`, and `barrier` for?
12. How does the `compare_exchange_weak` operation work? Why is it called in a loop?
13. How do the `std::launch::async` and `std::launch::deferred` policies differ?
14. How is an exception from a thread passed through `std::future`?
15. What parts does a thread pool consist of?
16. How do the `seq`, `unseq`, `par`, and `par_unseq` execution policies differ?
17. What role does the TBB library play for the parallel algorithms of GCC?
18. How do you find a data race with ThreadSanitizer?

## Useful links

- The C++ thread support library: <https://en.cppreference.com/w/cpp/thread>
- Execution policies: <https://en.cppreference.com/w/cpp/algorithm/execution_policy_tag_t>
- CMake documentation: <https://cmake.org/cmake/help/latest/>
- CMake presets: <https://cmake.org/cmake/help/latest/manual/cmake-presets.7.html>
- The Ninja manual: <https://ninja-build.org/manual.html>
- GCC documentation: <https://gcc.gnu.org/onlinedocs/>
- The WSL toolchain in CLion: <https://www.jetbrains.com/help/clion/how-to-use-wsl-development-environment-in-product.html>
- The oneTBB library: <https://github.com/uxlfoundation/oneTBB>
