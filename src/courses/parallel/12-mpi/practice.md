---
title: "Practice"
description: "Topic 12. MPI message passing: worked examples"
outline: [2, 3]
sourceHash: "817a6dd20eefee4b6ef69ad38b777b802e98df76628e9df522e8427f1d155f97"
---

# Practice

The examples are built by a single CMake project, as in the lecture (a `foreach` loop over the names `mandel`, `stats`, `life` with `MPI::MPI_CXX`), and run in Ubuntu (WSL2) with `mpirun -np N ./build/<name>`; for 16 processes on 8 cores, add `--use-hwthread-cpus`.

## Example 1. Manager–worker for the Mandelbrot set

Compute the number of iterations for every point of a 2400×1600 image of the Mandelbrot set (at most 2000 iterations per point) in two ways: by statically dividing rows into contiguous blocks, and with the manager–worker scheme, in which rank 0 hands out row numbers to workers one at a time as they become free. The method is set by the argument `static` or `dynamic`. Print the time, the ratio of the working times of the fastest and slowest workers, the total number of iterations for verification, and the smallest and largest number of rows processed by one worker.

```cpp
#include <mpi.h>
#include <algorithm>
#include <print>
#include <string_view>
#include <vector>

// The Mandelbrot set: static row distribution or manager–worker
// with dynamic distribution. Argument: static | dynamic.
const int Width = 2400, Height = 1600, MaxIter = 2000;
const int TagWork = 1, TagStop = 2;

// Number of iterations for each point of row y.
void Row(int y, std::vector<int>& out)
{
    double ci = -1.0 + 2.0 * y / Height;
    for (int x = 0; x < Width; ++x)
    {
        double cr = -2.2 + 3.0 * x / Width, zr = 0, zi = 0;
        int k = 0;
        while (k < MaxIter && zr * zr + zi * zi <= 4.0)
        {
            double t = zr * zr - zi * zi + cr;
            zi = 2 * zr * zi + ci;
            zr = t;
            ++k;
        }
        out[x] = k;
    }
}

long long Sum(const std::vector<int>& v)
{
    long long s = 0;
    for (int k : v) s += k;
    return s;
}

// The manager (rank 0) hands out row numbers and collects results.
long long Master(int size, std::vector<int>& rowsDone)
{
    std::vector<int> row(Width + 1);      // [0] – row number
    int next = 0, active = 0;
    long long total = 0;
    for (int w = 1; w < size; ++w)        // first task for everyone
    {
        MPI_Send(&next, 1, MPI_INT, w, TagWork, MPI_COMM_WORLD);
        ++next;
        ++active;
    }
    while (active > 0)
    {
        MPI_Status status;                // from any worker
        MPI_Recv(row.data(), Width + 1, MPI_INT, MPI_ANY_SOURCE,
                 TagWork, MPI_COMM_WORLD, &status);
        int worker = status.MPI_SOURCE;
        ++rowsDone[worker];
        for (int x = 1; x <= Width; ++x) total += row[x];
        if (next < Height)                // rows remain – a new one
        {
            MPI_Send(&next, 1, MPI_INT, worker, TagWork,
                     MPI_COMM_WORLD);
            ++next;
        }
        else                              // no rows left – stop
        {
            MPI_Send(&next, 0, MPI_INT, worker, TagStop,
                     MPI_COMM_WORLD);
            --active;
        }
    }
    return total;
}

// A worker receives row numbers until the TagStop tag arrives.
int Worker()
{
    std::vector<int> row(Width + 1), values(Width);
    int done = 0;
    while (true)
    {
        MPI_Status status;
        MPI_Recv(&row[0], 1, MPI_INT, 0, MPI_ANY_TAG, MPI_COMM_WORLD,
                 &status);
        if (status.MPI_TAG == TagStop) return done;
        Row(row[0], values);
        std::copy(values.begin(), values.end(), row.begin() + 1);
        MPI_Send(row.data(), Width + 1, MPI_INT, 0, TagWork,
                 MPI_COMM_WORLD);
        ++done;
    }
}

int main(int argc, char* argv[])
{
    MPI_Init(&argc, &argv);
    int rank = 0, size = 0;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);
    bool dynamic = argc > 1 && std::string_view(argv[1]) == "dynamic";
    if (dynamic && size < 2)
    {
        if (rank == 0)
            std::println(stderr, "At least 2 ranks are required");
        MPI_Abort(MPI_COMM_WORLD, 1);
    }

    MPI_Barrier(MPI_COMM_WORLD);
    double start = MPI_Wtime(), busy = 0;   // busy – the rank's work time
    long long total = 0;
    std::vector<int> rowsDone(size, 0);
    if (dynamic)
    {
        if (rank == 0) total = Master(size, rowsDone);
        else rowsDone[rank] = Worker();
        busy = MPI_Wtime() - start;
    }
    else
    {   // Static: rank r computes a contiguous block of rows.
        std::vector<int> values(Width);
        long long local = 0;
        int begin = rank * Height / size;
        int end = (rank + 1) * Height / size;
        for (int y = begin; y < end; ++y)
        {
            Row(y, values);
            local += Sum(values);
        }
        rowsDone[rank] = end - begin;
        busy = MPI_Wtime() - start;
        MPI_Reduce(&local, &total, 1, MPI_LONG_LONG, MPI_SUM, 0,
                   MPI_COMM_WORLD);
    }

    std::vector<double> busyAll(size);
    MPI_Gather(&busy, 1, MPI_DOUBLE, busyAll.data(), 1, MPI_DOUBLE, 0,
               MPI_COMM_WORLD);
    MPI_Allreduce(MPI_IN_PLACE, rowsDone.data(), size, MPI_INT,
                  MPI_MAX, MPI_COMM_WORLD);
    if (rank == 0)
    {   // Workers: all ranks (static) or ranks 1…size-1 (dynamic).
        int first = dynamic ? 1 : 0, rowsLo = Height, rowsHi = 0;
        double hi = 0, lo = 1e9;
        for (int r = first; r < size; ++r)
        {
            hi = std::max(hi, busyAll[r]);
            lo = std::min(lo, busyAll[r]);
            rowsLo = std::min(rowsLo, rowsDone[r]);
            rowsHi = std::max(rowsHi, rowsDone[r]);
        }
        std::println("{:<7} {:>2} {:>7.3f} {:>9.2f} {:>11} {:>5}–{}",
                     dynamic ? "dynamic" : "static", size, hi,
                     lo / hi, total, rowsLo, rowsHi);
    }
    MPI_Finalize();
}
```

The manager first gives each worker one row, and then in a loop receives a finished row from **any** worker (`MPI_ANY_SOURCE`) and, using the `status.MPI_SOURCE` field, sends the next number to exactly that worker. The row number is passed in element 0 of the same message, so the manager does not need to remember who is computing what. When no rows remain, the worker receives an empty message with the `TagStop` tag: the worker’s `MPI_Recv` specifies `MPI_ANY_TAG`, and the kind of message is determined by `status.MPI_TAG`. The program was run for 1–16 processes (columns: method, processes, time, $T_{\text{min}} / T_{\text{max}}$, iterations, rows per worker):

```bash
for np in 1 2 4 8 16; do
    opts=""; [ $np -gt 8 ] && opts="--use-hwthread-cpus"
    mpirun -np $np $opts ./build/mandel static
    [ $np -gt 1 ] && mpirun -np $np $opts ./build/mandel dynamic
done
```

```
static   1   5.608      1.00  1955911157  1600–1600
static   2   2.830      1.00  1955911157   800–800
dynamic  2   5.631      1.00  1955911157  1600–1600
static   4   2.381      0.20  1955911157   400–400
dynamic  4   1.946      1.00  1955911157   525–545
static   8   1.461      0.05  1955911157   200–200
dynamic  8   0.842      1.00  1955911157   224–232
static  16   0.885      0.00  1955911157   100–100
dynamic 16   0.419      1.00  1955911157    97–110
```

The number of iterations is the same in all runs, so every row was computed exactly once. With static division, the rows in the middle of the image (which cross the set) go to a few ranks, and on 8 processes the fastest rank works only 5 % of the slowest one’s time, so the speedup is 3.8. Manager–worker balances the load ($T_{\text{min}} / T_{\text{max}} = 1 {,} 00$): on 8 processes with 7 workers the speedup is 6.7, and on 16 it is 13.4. The price of the scheme is a manager that does almost no computation: with 2 processes, only one worker is working, and the time equals the sequential time. The number of rows differs among workers (224–232), because each receives a new task as soon as it becomes free. Sending a row of 2401 integers (9.6 KB) takes microseconds, while computing a row takes milliseconds, so the scheme works just as well on a cluster; for finer-grained tasks, several rows are handed out at once.

## Example 2. Array statistics with chunks of different sizes

Rank 0 generates $n$ electricity meter readings (a gamma distribution with a mean of 240 kWh, generator with seed 2026; $n$ is set by an argument, default 10,000,003, which is not divisible by the number of processes). Distribute the array among processes with `MPI_Scatterv`, compute the mean, standard deviation, minimum, and maximum, convert the values to z-scores $z = (x - \overline{x}) / \sigma$, and gather them on rank 0 with `MPI_Gatherv`. Print the chunk sizes, the statistics, and a check: the mean of the z-scores must equal 0, and the variance 1.

```cpp
#include <mpi.h>
#include <algorithm>
#include <cmath>
#include <cstdlib>
#include <print>
#include <random>
#include <vector>

// Statistics of meter readings (kWh) in unequal chunks:
// MPI_Scatterv distributes the chunks, MPI_Allreduce provides sums,
// MPI_Gatherv gathers the normalized array. Argument: number of values n.
int main(int argc, char* argv[])
{
    MPI_Init(&argc, &argv);
    int rank = 0, size = 0;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    long long n = argc > 1 ? std::atoll(argv[1]) : 10'000'003;
    if (n < size || n > 1'000'000'000)
    {
        if (rank == 0)
            std::println(stderr, "n must be from {} to 10^9", size);
        MPI_Finalize();
        return 1;
    }
    // Chunk sizes and displacements: the first n % size ranks get 1 more.
    std::vector<int> counts(size), displs(size);
    for (int r = 0, offset = 0; r < size; ++r)
    {
        counts[r] = int(n / size + (r < n % size ? 1 : 0));
        displs[r] = offset;
        offset += counts[r];
    }

    std::vector<double> all;                   // only on rank 0
    if (rank == 0)
    {
        all.resize(n);
        std::mt19937_64 gen(2026);
        std::gamma_distribution<double> kwh(4.0, 60.0);
        for (double& x : all) x = kwh(gen);
    }
    std::vector<double> part(counts[rank]);
    double start = MPI_Wtime();
    MPI_Scatterv(all.data(), counts.data(), displs.data(), MPI_DOUBLE,
                 part.data(), counts[rank], MPI_DOUBLE, 0,
                 MPI_COMM_WORLD);

    // Sum, minimum, and maximum of the chunk, then of the whole array.
    double sum = 0;
    for (double x : part) sum += x;
    auto [lo, hi] = std::ranges::minmax(part);
    double minMax[2] = {-lo, hi};              // max(-x) = -min(x)
    MPI_Allreduce(MPI_IN_PLACE, &sum, 1, MPI_DOUBLE, MPI_SUM,
                  MPI_COMM_WORLD);
    MPI_Allreduce(MPI_IN_PLACE, minMax, 2, MPI_DOUBLE, MPI_MAX,
                  MPI_COMM_WORLD);
    const double mean = sum / n;

    double sq = 0;                             // second pass
    for (double x : part) sq += (x - mean) * (x - mean);
    MPI_Allreduce(MPI_IN_PLACE, &sq, 1, MPI_DOUBLE, MPI_SUM,
                  MPI_COMM_WORLD);
    const double sigma = std::sqrt(sq / n);

    for (double& x : part) x = (x - mean) / sigma;   // z-scores
    MPI_Gatherv(part.data(), counts[rank], MPI_DOUBLE, all.data(),
                counts.data(), displs.data(), MPI_DOUBLE, 0,
                MPI_COMM_WORLD);
    double time = MPI_Wtime() - start;

    if (rank == 0)
    {
        std::print("n = {}, chunks:", n);
        for (int c : counts) std::print(" {}", c);
        std::println("");
        std::println("mean {:.3f}, σ = {:.3f}, min {:.3f}, "
                     "max {:.3f} kWh", mean, sigma, -minMax[0],
                     minMax[1]);
        // Check: mean of z-scores ≈ 0, variance ≈ 1.
        double zs = 0, zq = 0;
        for (double z : all) { zs += z; zq += z * z; }
        std::println("z: mean {:.1e}, variance {:.6f}; "
                     "time {:.3f} s", zs / n, zq / n, time);
    }
    MPI_Finalize();
}
```

The `counts` and `displs` arrays are the same in all processes: each process computes them itself, so there is no need to distribute them. The `MPI_MIN` and `MPI_MAX` operations are combined into one `MPI_Allreduce` call with `MPI_MAX`: the maximum of $- x$ equals the minimum of $x$ with the sign changed. The standard deviation is computed in two passes (first the mean, then the sum of squared deviations), which is more accurate than the formula $\overline{x^{2}} - \overline{x}^{2}$. Output for 1, 3, and 4 processes:

```
n = 10000003, chunks: 10000003
mean 239.991, σ = 120.035, min 2.391, max 1597.388 kWh
z: mean -9.3e-14, variance 1.000000; time 0.053 s
n = 10000003, chunks: 3333335 3333334 3333334
mean 239.991, σ = 120.035, min 2.391, max 1597.388 kWh
z: mean 4.9e-14, variance 1.000000; time 0.035 s
n = 10000003, chunks: 2500001 2500001 2500001 2500000
mean 239.991, σ = 120.035, min 2.391, max 1597.388 kWh
z: mean 4.4e-14, variance 1.000000; time 0.032 s
```

The statistics do not depend on the number of processes, and the remainder $n \bmod p$ goes to the first ranks. The error in the mean of the z-scores is $10^{- 14}$ and changes with the number of processes, because the order of addition changes. Measuring speedup makes no sense here: distributing 80 MB of data from rank 0 takes longer than the computation, which is a single pass over the array. In real problems, each rank reads its own part of the file itself (MPI-IO, <https://docs.open-mpi.org/en/v5.0.x/tuning-apps/mpi-io/index.html>).

## Example 3. The Game of Life in a Cartesian topology

Simulate Conway’s Game of Life on a torus of $N \times N$ cells ($N$ and the number of generations are arguments, 2400 and 500 by default). The processes form a two-dimensional periodic Cartesian topology; each process stores a block with a halo frame of width 1 and, before every generation, exchanges rows and columns with its four neighbors (a column is the derived type `MPI_Type_vector`). The initial state of each cell is computed by a hash function of its global coordinates, so it does not depend on the number of processes. Print the process grid, the block size, the time, the communication time, and the number of live cells at the end.

```cpp
#include <mpi.h>
#include <cstdint>
#include <cstdlib>
#include <print>
#include <vector>

// The Game of Life on an N × N torus in a rows × cols Cartesian topology.
// Each rank has an h × w block with a halo frame of width 1.
// Arguments: N, number of generations.
int main(int argc, char* argv[])
{
    MPI_Init(&argc, &argv);
    int size = 0;
    MPI_Comm_size(MPI_COMM_WORLD, &size);
    const int N = argc > 1 ? std::atoi(argv[1]) : 2400;
    const int generations = argc > 2 ? std::atoi(argv[2]) : 500;

    // Process grid: MPI_Dims_create picks, e.g., 4 = 2 × 2.
    int dims[2] = {0, 0}, periods[2] = {1, 1}, coords[2];
    MPI_Dims_create(size, 2, dims);
    MPI_Comm grid;
    MPI_Cart_create(MPI_COMM_WORLD, 2, dims, periods, 1, &grid);
    int rank = 0;
    MPI_Comm_rank(grid, &rank);                // after reorder
    MPI_Cart_coords(grid, rank, 2, coords);
    if (N % dims[0] != 0 || N % dims[1] != 0)
    {
        if (rank == 0)
            std::println(stderr, "N must be divisible by {} and {}",
                         dims[0], dims[1]);
        MPI_Abort(grid, 1);
    }
    const int h = N / dims[0], w = N / dims[1], W = w + 2;
    auto at = [W](int i, int j) { return i * W + j; };

    // Neighbors: up/down (dimension 0), left/right (dimension 1).
    int up, down, left, right;
    MPI_Cart_shift(grid, 0, 1, &up, &down);
    MPI_Cart_shift(grid, 1, 1, &left, &right);

    // A column together with two halo cells: h + 2 numbers with stride W.
    MPI_Datatype column;
    MPI_Type_vector(h + 2, 1, W, MPI_UINT8_T, &column);
    MPI_Type_commit(&column);

    // The initial state depends only on the cell's global coordinates,
    // so it does not depend on the number of processes.
    std::vector<std::uint8_t> a((h + 2) * W, 0), b = a;
    for (int i = 1; i <= h; ++i)
        for (int j = 1; j <= w; ++j)
        {
            std::uint64_t g = std::uint64_t(coords[0] * h + i - 1) * N
                              + coords[1] * w + j - 1;
            g = (g ^ (g >> 30)) * 0xBF58476D1CE4E5B9ULL; // hash
            g = (g ^ (g >> 27)) * 0x94D049BB133111EBULL; // splitmix
            a[at(i, j)] = (g >> 60) < 5;           // ~31 % alive
        }

    MPI_Barrier(grid);
    double start = MPI_Wtime(), commTime = 0;
    for (int gen = 0; gen < generations; ++gen)
    {
        double c = MPI_Wtime();
        // 1) Rows: the first goes up, the last goes down (no corners).
        MPI_Sendrecv(&a[at(1, 1)], w, MPI_UINT8_T, up, 0,
                     &a[at(h + 1, 1)], w, MPI_UINT8_T, down, 0,
                     grid, MPI_STATUS_IGNORE);
        MPI_Sendrecv(&a[at(h, 1)], w, MPI_UINT8_T, down, 1,
                     &a[at(0, 1)], w, MPI_UINT8_T, up, 1,
                     grid, MPI_STATUS_IGNORE);
        // 2) Columns together with the halo rows – corners go too.
        MPI_Sendrecv(&a[at(0, 1)], 1, column, left, 2,
                     &a[at(0, w + 1)], 1, column, right, 2,
                     grid, MPI_STATUS_IGNORE);
        MPI_Sendrecv(&a[at(0, w)], 1, column, right, 3,
                     &a[at(0, 0)], 1, column, left, 3,
                     grid, MPI_STATUS_IGNORE);
        commTime += MPI_Wtime() - c;

        for (int i = 1; i <= h; ++i)
            for (int j = 1; j <= w; ++j)
            {
                int n = a[at(i - 1, j - 1)] + a[at(i - 1, j)]
                      + a[at(i - 1, j + 1)] + a[at(i, j - 1)]
                      + a[at(i, j + 1)] + a[at(i + 1, j - 1)]
                      + a[at(i + 1, j)] + a[at(i + 1, j + 1)];
                b[at(i, j)] = n == 3 || (n == 2 && a[at(i, j)]);
            }
        a.swap(b);
    }
    double time = MPI_Wtime() - start;

    long long alive = 0, total = 0;
    for (int i = 1; i <= h; ++i)
        for (int j = 1; j <= w; ++j) alive += a[at(i, j)];
    MPI_Reduce(&alive, &total, 1, MPI_LONG_LONG, MPI_SUM, 0, grid);
    double times[2] = {time, commTime}, slowest[2];
    MPI_Reduce(times, slowest, 2, MPI_DOUBLE, MPI_MAX, 0, grid);
    if (rank == 0)
        std::println("{:>2} = {} x {}  block {} x {} {:>7.3f} {:>7.3f}"
                     "  alive {}", size, dims[0], dims[1], h, w,
                     slowest[0], slowest[1], total);
    MPI_Type_free(&column);
    MPI_Comm_free(&grid);
    MPI_Finalize();
}
```

The halo corners are transferred without separate messages to diagonal neighbors: first the processes exchange rows, and then columns **together with the halo rows** (the `column` type has $h + 2$ elements), so the corner cells just received from the upper and lower neighbors reach the left and right ones. An earlier version of the program with $h$ elements in the type gave different numbers of live cells on 1 and 4 processes, a typical bug that a comparison with the sequential program reveals. Output (median of 3 runs):

```
$ for np in 1 2 4 8; do mpirun -np $np ./build/life; done
$ mpirun -np 16 --use-hwthread-cpus ./build/life
 1 = 1 x 1  block 2400 x 2400   7.013   0.030  alive 311564
 2 = 2 x 1  block 1200 x 2400   3.886   0.040  alive 311564
 4 = 2 x 2  block 1200 x 1200   2.373   0.372  alive 311564
 8 = 4 x 2  block 600 x 1200   1.349   0.236  alive 311564
16 = 4 x 4  block 600 x 600   1.229   0.561  alive 311564
```

The number of live cells is the same for all process grids and matches the result of a separate sequential program. `MPI_Dims_create` chose the grids 2×1, 2×2, 4×2, and 4×4. The speedup on 8 processes is 5.2: computing a cell is much heavier than the exchange (only block edges of 600–1200 bytes are exchanged), but ranks synchronize at every generation, so a delay in one rank delays its neighbors; this is visible in the communication time, which is larger on 4 processes than on 8. Sixteen processes on SMT logical processors add almost nothing (5.7), and the communication time doubles.
