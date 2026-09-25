---
title: "Practice"
description: "Topic 10. OpenMP: worked examples"
outline: [2, 3]
sourceHash: "e5272f7c9190f69ba02ee19a661aa8d9ca526a0b21a5412da67f8590e9fc2712"
---

# Practice

## Example 1. Heat conduction in a plate and thread affinity

A square plate of $n \times n$ grid nodes has a top edge at a temperature of 100 °C, and the rest at 0 °C. Simulate the spread of heat with an explicit scheme for the heat equation

$$
u_{i , j}^{k + 1} = u_{i , j}^{k} + r (u_{i - 1 , j}^{k} + u_{i + 1 , j}^{k} + u_{i , j - 1}^{k} + u_{i , j + 1}^{k} - 4 u_{i , j}^{k}) ,
$$

where $r = 0 {,} 2$. The grid size, the number of steps, and the initialization method (`parallel` – according to the first-touch policy, `serial` – by the primary thread) are given as arguments. Compare the time for different values of `OMP_PLACES` and `OMP_PROC_BIND` and check that the result (the total heat) does not change.

```cpp
#include <omp.h>
#include <cstdlib>
#include <print>
#include <string_view>
#include <utility>

// An explicit scheme for the heat equation on an n × n grid.
// Arguments: n, number of steps, parallel | serial (initialization).
int main(int argc, char* argv[])
{
    const long n = argc > 1 ? std::atol(argv[1]) : 1000;
    const int steps = argc > 2 ? std::atoi(argv[2]) : 2000;
    const bool firstTouch =
        argc <= 3 || std::string_view(argv[3]) != "serial";

    // new without initialization: the physical pages are not allocated yet.
    double* u = new double[n * n];
    double* v = new double[n * n];

    double start = omp_get_wtime();
    // The first write places a page in the thread's NUMA node,
    // so initialization has the same distribution as the computation.
    #pragma omp parallel for collapse(2) schedule(static) \
        if(firstTouch)
    for (long i = 0; i < n; ++i)
        for (long j = 0; j < n; ++j)
        {
            bool edge = i == 0;              // the top edge is hot
            u[i * n + j] = v[i * n + j] = edge ? 100.0 : 0.0;
        }
    double init = omp_get_wtime() - start;

    const double r = 0.2;                    // r = a·Δt/h² < 0.25
    start = omp_get_wtime();
    for (int s = 0; s < steps; ++s)
    {
        #pragma omp parallel for collapse(2) schedule(static)
        for (long i = 1; i < n - 1; ++i)
            for (long j = 1; j < n - 1; ++j)
            {
                long k = i * n + j;
                v[k] = u[k] + r * (u[k - n] + u[k + n] + u[k - 1]
                                   + u[k + 1] - 4 * u[k]);
            }
        std::swap(u, v);
    }
    double time = omp_get_wtime() - start;

    double heat = 0.0;
    #pragma omp parallel for reduction(+:heat)
    for (long k = 0; k < n * n; ++k) heat += u[k];

    const char* binds[] = {"false", "true", "primary", "close",
                           "spread"};
    std::println("{:<6} p={:<2} places {:>2}  {:<8} {:.3f} + {:.3f} s"
                 "  {:.6e}", binds[omp_get_proc_bind()],
                 omp_get_max_threads(), omp_get_num_places(),
                 firstTouch ? "parallel" : "serial", init, time,
                 heat);
    delete[] u;
    delete[] v;
}
```

The `collapse(2)` clause divides all $(n - 2)^{2}$ interior nodes among the threads, and `schedule(static)` guarantees that initialization and computation distribute the rows in the same way: each thread works with the memory pages it touched first. The `if(firstTouch)` clause disables parallel initialization for comparison, and the arrays `u` and `v` are swapped by pointer without copying.

On Windows, binding is supported only by `libomp`, so the program was built with Clang 23.1 (`clang++ -std=c++23 -O2 -fopenmp heat.cpp -o heat.exe`) and run with a PowerShell script for 4 threads (the first line is one thread for comparison):

```powershell
$env:OMP_NUM_THREADS = 1; .\heat.exe 1000 2000
$env:OMP_NUM_THREADS = 4
foreach ($places in "threads", "cores") {
  foreach ($bind in "false", "close", "spread") {
    $env:OMP_PLACES = $places; $env:OMP_PROC_BIND = $bind
    .\heat.exe 1000 2000        # 6 runs
  }
}
$env:OMP_NUM_THREADS = 8; $env:OMP_PROC_BIND = "spread"
.\heat.exe 1000 2000; .\heat.exe 1000 2000 serial
```

```
false  p=1  places  1  parallel 0.004 + 6.404 s  2.254124e+06
false  p=4  places  1  parallel 0.002 + 2.818 s  2.254124e+06
close  p=4  places 16  parallel 0.003 + 3.846 s  2.254124e+06
spread p=4  places 16  parallel 0.041 + 2.721 s  2.254124e+06
false  p=4  places  1  parallel 0.011 + 2.609 s  2.254124e+06
close  p=4  places  8  parallel 0.004 + 2.493 s  2.254124e+06
spread p=4  places  8  parallel 0.009 + 2.452 s  2.254124e+06
spread p=8  places  8  parallel 0.004 + 1.878 s  2.254124e+06
spread p=8  places  8  serial   0.003 + 1.883 s  2.254124e+06
```

The slowest variant is `close` on `threads` places: the four threads occupy logical processors 0–3, that is, only **two** physical cores. Binding to cores (`cores`) or `spread` places the threads on separate cores. The total heat is the same in all runs, so the result does not depend on the number of threads or the binding. The speedup on 8 threads is only 3.4: at each step, both arrays (8 MB each) are rewritten, and the cores wait for memory. `serial` initialization on a single-processor computer does not change the time, because there is one NUMA node here. On a two-socket cluster node, the same series is run on Linux (`OMP_PROC_BIND=close` and `spread`, `parallel` and `serial` initialization, as well as `numactl --cpunodebind=0 --membind=1`) to evaluate the effect of first touch and of remote memory.

## Example 2. Counting words in files: taskloop and a user-defined reduction

Create a program that generates 200 text files of 50,000 words each (a generator with seed 7) and then counts how many times each word occurs in all the files. The words are converted to lowercase, and punctuation is discarded. The files are processed by `taskloop` tasks, and the threads’ dictionaries are combined with a user-defined reduction. Print a table of words and the time of sequential and parallel processing, and check that the results match.

```cpp
#include <omp.h>
#include <algorithm>
#include <cctype>
#include <filesystem>
#include <fstream>
#include <map>
#include <print>
#include <random>
#include <string>
#include <vector>

namespace fs = std::filesystem;
using Counts = std::map<std::string, long>;

// Merging two dictionaries: the sum of the counters of identical words.
void Merge(Counts& into, const Counts& from)
{
    for (const auto& [word, n] : from) into[word] += n;
}

// A user-defined reduction: the identity element is an empty dictionary.
#pragma omp declare reduction(merge : Counts : \
    Merge(omp_out, omp_in)) initializer(omp_priv = Counts())

Counts CountFile(const fs::path& path)
{
    Counts counts;
    std::ifstream in(path);
    std::string word;
    while (in >> word)
    {
        std::erase_if(word, [](unsigned char c) {
            return !std::isalpha(c); });
        std::ranges::transform(word, word.begin(),
            [](unsigned char c) { return (char)std::tolower(c); });
        if (!word.empty()) ++counts[word];
    }
    return counts;
}

// Test files: 200 files of 50,000 words each with seed 7.
std::vector<fs::path> MakeFiles(const fs::path& dir)
{
    const std::vector<std::string> vocabulary = {
        "Thread", "task", "core", "cache", "memory,", "loop",
        "node.", "speed", "data", "OpenMP", "lock", "queue"};
    fs::create_directories(dir);
    std::mt19937 gen(7);
    std::vector<fs::path> files;
    for (int f = 0; f < 200; ++f)
    {
        fs::path path = dir / std::format("text{:03}.txt", f);
        std::ofstream out(path);
        std::uniform_int_distribution<int> pick(
            0, (int)vocabulary.size() - 1 - f % 3);
        for (int w = 0; w < 50'000; ++w)
            out << vocabulary[pick(gen)] << (w % 12 ? ' ' : '\n');
        files.push_back(path);
    }
    return files;
}

int main()
{
    std::vector<fs::path> files = MakeFiles("texts");
    long long count = (long long)files.size();
    for (const fs::path& path : files) CountFile(path); // warmup

    double start = omp_get_wtime();
    Counts serial;
    for (const fs::path& path : files) Merge(serial, CountFile(path));
    double t1 = omp_get_wtime() - start;

    start = omp_get_wtime();
    Counts total;
    #pragma omp parallel
    #pragma omp single
    #pragma omp taskloop grainsize(4) reduction(merge : total)
    for (long long i = 0; i < count; ++i)
        Merge(total, CountFile(files[i]));
    double tp = omp_get_wtime() - start;

    int column = 0;                        // three words per line
    for (const auto& [word, n] : total)
        std::print("{:<7}{:>7}{}", word, n,
                   ++column % 3 ? "   " : "\n");
    std::println("Files: {}, threads: {}", count,
                 omp_get_max_threads());
    std::println("Sequential {:.3f} s, taskloop {:.3f} s, S = {:.2f}",
                 t1, tp, t1 / tp);
    std::println("Results match: {}",
                 total == serial ? "yes" : "no");
}
```

The `declare reduction` directive describes how to combine two dictionaries (`omp_out` and `omp_in`) and what to initialize a copy with (`omp_priv`), while `taskloop` divides the 200 iterations into tasks of 4 files each (`grainsize(4)`), each with its own `total` dictionary. The warmup (the first pass over the files) excludes from the measurement the loading of the files into the cache and the antivirus scan. Output:

```
cache   912815   core    914349   data    911880
lock    584552   loop    914452   memory  914323
node    914180   openmp  913241   queue   281059
speed   913144   task    912504   thread  913501
Files: 200, threads: 16
Sequential 0.612 s, taskloop 0.065 s, S = 9.42
Results match: yes
```

The total number of words equals $200 \cdot 50 \, 000 = 10^{7}$. The words `lock` and `queue` occur less often, because the vocabulary is shortened for some of the files. The speedup is more than 8 on 8 cores: parsing text hardly accesses memory, and the SMT logical processors give an additional gain.

## Example 3. Normalizing an array: parallel for simd

An array of people’s heights (a normal distribution with a mean of 170 cm and a standard deviation of 8 cm, a generator with seed 1) must be converted into z-scores $x' = (x - \overline{x}) / \sigma$. Compare ordinary loops, `simd`, `parallel for`, and `parallel for simd` for arrays of 2 and 20 million `float` numbers (the minimum of 10 runs) and explain the difference.

```cpp
#include <omp.h>
#include <chrono>
#include <cmath>
#include <print>
#include <random>
#include <vector>

// Normalization (z-score): x' = (x - mean) / standard deviation.
// Modes: 0 – a plain loop, 1 – simd, 2 – parallel for,
// 3 – parallel for simd.
void Normalize(const std::vector<float>& x, std::vector<float>& y,
               int mode)
{
    const long n = (long)x.size();
    const float* in = x.data();
    float* out = y.data();
    double sum = 0, sq = 0;
    if (mode == 0)
        for (long i = 0; i < n; ++i)
        { sum += in[i]; sq += (double)in[i] * in[i]; }
    else if (mode == 1)
        #pragma omp simd reduction(+:sum, sq)
        for (long i = 0; i < n; ++i)
        { sum += in[i]; sq += (double)in[i] * in[i]; }
    else if (mode == 2)
        #pragma omp parallel for reduction(+:sum, sq)
        for (long i = 0; i < n; ++i)
        { sum += in[i]; sq += (double)in[i] * in[i]; }
    else
        #pragma omp parallel for simd reduction(+:sum, sq)
        for (long i = 0; i < n; ++i)
        { sum += in[i]; sq += (double)in[i] * in[i]; }

    const float mean = (float)(sum / n);
    const double variance = sq / n - (sum / n) * (sum / n);
    const float inv = (float)(1.0 / std::sqrt(variance));
    if (mode == 0)
        for (long i = 0; i < n; ++i) out[i] = (in[i] - mean) * inv;
    else if (mode == 1)
        #pragma omp simd
        for (long i = 0; i < n; ++i) out[i] = (in[i] - mean) * inv;
    else if (mode == 2)
        #pragma omp parallel for
        for (long i = 0; i < n; ++i) out[i] = (in[i] - mean) * inv;
    else
        #pragma omp parallel for simd
        for (long i = 0; i < n; ++i) out[i] = (in[i] - mean) * inv;
}

int main()
{
    using Clock = std::chrono::steady_clock;
    const char* names[] = {"plain loop", "omp simd",
                           "omp parallel for",
                           "omp parallel for simd"};
    std::println("Threads: {}", omp_get_max_threads());
    for (long n : {2'000'000L, 20'000'000L})
    {
        std::mt19937 gen(1);
        std::normal_distribution<float> dist(170.0f, 8.0f);
        std::vector<float> x(n), y(n);
        for (float& v : x) v = dist(gen);

        std::println("n = {} ({} MB per array)", n, n * 4 / 1'000'000);
        double t0 = 0;
        for (int mode = 0; mode < 4; ++mode)
        {
            Normalize(x, y, mode);             // warmup
            double best = 1e9;
            for (int r = 0; r < 10; ++r)     // minimum of 10 runs
            {
                auto start = Clock::now();
                Normalize(x, y, mode);
                std::chrono::duration<double, std::milli> t =
                    Clock::now() - start;
                best = std::min(best, t.count());
            }
            if (mode == 0) t0 = best;
            std::println("  {:<22} {:>6.2f} ms  S = {:>5.2f}  "
                         "y[0] = {:.5f}", names[mode], best,
                         t0 / best, y[0]);
        }
    }
}
```

The program was built with the flags `-std=c++23 -O2 -march=native -fopenmp`, that is, with the AVX-512 of the i9-11900KF processor. The time is measured with the `steady_clock` clock, because `omp_get_wtime` in MinGW has a resolution of 1 ms. Output:

```
Threads: 16
n = 2000000 (8 MB per array)
  plain loop               2.10 ms  S =  1.00  y[0] = 0.30578
  omp simd                 0.48 ms  S =  4.39  y[0] = 0.30578
  omp parallel for         0.57 ms  S =  3.66  y[0] = 0.30578
  omp parallel for simd    0.31 ms  S =  6.70  y[0] = 0.30578
n = 20000000 (80 MB per array)
  plain loop              23.38 ms  S =  1.00  y[0] = 0.30660
  omp simd                 9.46 ms  S =  2.47  y[0] = 0.30660
  omp parallel for         7.44 ms  S =  3.14  y[0] = 0.30660
  omp parallel for simd    6.86 ms  S =  3.41  y[0] = 0.30660
```

In a plain loop, the compiler must preserve the order in which floating-point numbers are added, so it cannot accumulate the sum in several vector elements at once. The `simd reduction` directive allows the terms to be reordered and makes the program four times faster in a single thread. For the 8 MB array, which almost fits in the L3 cache, combining threads and vectorization gives the largest speedup. For the 80 MB array, all parallel variants hit the memory bandwidth limit, and the speedup does not exceed 3.5. The values of `y[0]` are the same in all variants.
