---
title: "Practice"
description: "Topic 1. Fundamentals of parallel computing: worked examples"
outline: [2, 3]
sourceHash: "da1229fe07bf78b999915d1734b9289e0ca07564f2826051e2927cd7fdb44d47"
---

# Practice

## Example 1. Amdahl and Gustafson predictions

A weather forecasting model spends 4% of its time reading the grid and writing results (sequentially), and 96% calculating grid cells. Write a program that compares the speedup and efficiency predicted by Amdahl’s and Gustafson’s laws for 1–128 cores in one table, and determines how many cores each law requires for a speedup of 20.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// Weather model: 4% of the time is spent reading the grid and writing results
// (sequentially), 96% calculating grid cells (in parallel).
const double Serial = 0.04;
int[] cores = [1, 2, 4, 8, 16, 32, 64, 128];

Console.WriteLine($"Serial fraction s = {Serial:P0}");
Console.WriteLine(
    $"{"p",4} | {"Amdahl S",8} {"E",5} | {"Gustafson S",11} {"E",5}");
Console.WriteLine(new string('-', 42));
foreach (int p in cores)
{
    double amdahl = 1 / (Serial + (1 - Serial) / p);
    double gustafson = Serial + (1 - Serial) * p;
    Console.WriteLine($"{p,4} | {amdahl,8:F2} {amdahl / p,5:P0} | " +
                      $"{gustafson,11:F2} {gustafson / p,5:P0}");
}

// How many cores are needed to make the calculation 20 times faster?
const double Target = 20;
int needed = Enumerable.Range(1, 1024)
    .FirstOrDefault(p => 1 / (Serial + (1 - Serial) / p) >= Target);
Console.WriteLine(needed > 0
    ? $"Amdahl: S ≥ {Target} requires p = {needed}"
    : $"Amdahl: S = {Target} is unreachable (limit {1 / Serial:F0})");
Console.WriteLine(
    $"Gustafson: S ≥ {Target} at p = " +
    $"{Math.Ceiling((Target - Serial) / (1 - Serial))}");
```

Under Amdahl’s law, the grid size is fixed, so speedup approaches the limit $1 / 0 {,} 04 = 25$ and efficiency drops rapidly. Under Gustafson’s law, the grid grows with the number of cores and efficiency stays close to 96%. The `FirstOrDefault` method returns 0 if no core count up to 1024 provides the required speedup. For Gustafson’s law, the core count is obtained from the equation $s + p (1 - s) = 20$. Output:

```
Serial fraction s = 4%
   p | Amdahl S     E | Gustafson S     E
------------------------------------------
   1 |     1,00  100% |        1,00  100%
   2 |     1,92   96% |        1,96   98%
   4 |     3,57   89% |        3,88   97%
   8 |     6,25   78% |        7,72   96%
  16 |    10,00   62% |       15,40   96%
  32 |    14,29   45% |       30,76   96%
  64 |    18,18   28% |       61,48   96%
 128 |    21,05   16% |      122,92   96%
Amdahl: S ≥ 20 requires p = 96
Gustafson: S ≥ 20 at p = 21
```

## Example 2. The parallel code fraction by program stage

A program reads 2,000,000 integers from a text file, computes the number of divisors of each integer, and writes a report to a file. Measure each stage’s time, determine the fraction spent in the computation stage (which can be parallelized), and use Amdahl’s law to predict execution time on 2–16 cores.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const string Input = "numbers.txt";
const string Output = "report.txt";
const int Count = 2_000_000;

// Prepare the input file (excluded from measurements).
Random random = new(42);
File.WriteAllLines(Input,
    Enumerable.Range(0, Count).Select(_ => random.Next(2, 1_000_000)
        .ToString()));

var stages = new List<(string Name, double Ms)>();
Stopwatch sw = Stopwatch.StartNew();

int[] numbers = File.ReadAllLines(Input).Select(int.Parse).ToArray();
stages.Add(("Reading file", Lap(sw)));

int[] divisors = new int[numbers.Length];
for (int i = 0; i < numbers.Length; i++)
{
    divisors[i] = CountDivisors(numbers[i]);
}
stages.Add(("Computation", Lap(sw)));

File.WriteAllLines(Output,
    numbers.Zip(divisors, (n, d) => $"{n};{d}"));
stages.Add(("Writing report", Lap(sw)));

double total = stages.Sum(s => s.Ms);
foreach (var (name, ms) in stages)
{
    Console.WriteLine($"{name,-15} {ms,8:F0} ms {ms / total,6:P1}");
}
Console.WriteLine($"{"Total",-15} {total,8:F0} ms");

// Only computation is parallelized: f is its fraction of the time.
double f = stages[1].Ms / total;
Console.WriteLine($"Parallel code fraction f = {f:P1}");
foreach (int p in new[] { 2, 4, 8, 16 })
{
    double s = 1 / ((1 - f) + f / p);
    Console.WriteLine(
        $"p = {p,2}: S = {s,5:F2}, predicted {total / s,6:F0} ms");
}

static double Lap(Stopwatch sw)
{
    double ms = sw.Elapsed.TotalMilliseconds;
    sw.Restart();
    return ms;
}

static int CountDivisors(int n)
{
    int count = 0;
    for (int d = 1; d * d <= n; d++)
    {
        if (n % d == 0) count += d * d == n ? 1 : 2;
    }
    return count;
}
```

The `Lap` method returns the time since the previous mark and restarts the stopwatch, so each stage is measured separately. A `Random` generator with seed 42 creates the same file on each run. The reading and writing stages are limited by disk speed and string parsing, so they are treated as sequential. Output:

```
Reading file         201 ms   8,9%
Computation         1728 ms  76,7%
Writing report       324 ms  14,4%
Total               2252 ms
Parallel code fraction f = 76,7%
p =  2: S =  1,62, predicted   1388 ms
p =  4: S =  2,36, predicted    956 ms
p =  8: S =  3,04, predicted    740 ms
p = 16: S =  3,56, predicted    632 ms
```

Counting divisors takes more than three quarters of the time, so this is the stage worth parallelizing. However, even with infinitely many cores, speedup cannot exceed $1 / (1 - 0 {,} 767) \approx 4 {,} 3$, and execution time cannot fall below 525 ms: reading and writing remain sequential. To speed up the program further, you would need faster I/O, for example by reading the file in blocks and parsing numbers in parallel.

## Example 3. How cache affects array traversal time

Compute the sum of the elements of a square `int[n, n]` matrix in two ways: by rows and by columns. Compare the time for sizes from 250 to 8000 and explain the difference in terms of the memory hierarchy.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine($"{"n",6} {"Memory",9} {"Rows, ms",10} " +
                  $"{"Columns, ms",12} {"Ratio",8}");
foreach (int n in new[] { 250, 1_000, 2_000, 4_000, 8_000 })
{
    int[,] matrix = new int[n, n];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            matrix[i, j] = (i + j) % 10;

    SumByRows(matrix);                     // warmup
    SumByColumns(matrix);
    double rows = Median(() => SumByRows(matrix));
    double columns = Median(() => SumByColumns(matrix));
    string size = $"{n * n * sizeof(int) / 1048576.0:F1} MB";
    Console.WriteLine($"{n,6} {size,9} {rows,10:F2} " +
                      $"{columns,12:F2} {columns / rows,7:F1}×");
}

// Traversal order matches the memory layout: row by row.
static long SumByRows(int[,] a)
{
    long sum = 0;
    int n = a.GetLength(0);
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            sum += a[i, j];
    return sum;
}

// Consecutive accesses are n elements apart, causing frequent cache misses.
static long SumByColumns(int[,] a)
{
    long sum = 0;
    int n = a.GetLength(0);
    for (int j = 0; j < n; j++)
        for (int i = 0; i < n; i++)
            sum += a[i, j];
    return sum;
}

static double Median(Func<long> action)
{
    double[] times = new double[5];
    for (int k = 0; k < times.Length; k++)
    {
        long start = Stopwatch.GetTimestamp();
        action();
        times[k] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    }
    Array.Sort(times);
    return times[2];
}
```

A rectangular .NET array is stored in memory row by row. Row traversal accesses neighboring cells that have already been loaded into cache as part of a cache line, and the processor also prefetches subsequent lines. Column traversal “jumps” forward by $n$ elements each time. Output:

```
     n    Memory   Rows, ms  Columns, ms    Ratio
   250    0,2 MB       0,05         0,06     1,2×
  1000    3,8 MB       0,67         0,79     1,2×
  2000   15,3 MB       2,76         8,28     3,0×
  4000   61,0 MB      11,28        71,37     6,3×
  8000  244,1 MB      44,93       361,69     8,1×
```

While the matrix fits in L2 (512 KB) or L3 (16 MB) cache, the difference is small. When its size reaches tens or hundreds of megabytes and exceeds L3 cache, column traversal becomes several times slower. For parallel programs, this means organizing data processing so that each thread accesses memory sequentially.
