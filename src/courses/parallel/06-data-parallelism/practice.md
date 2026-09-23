---
title: "Practice"
description: "Topic 6. Data parallelism and PLINQ: worked examples"
outline: [2, 3]
sourceHash: "ee84a7d97f90ddde444ef0483baa24f6c60299dd364b9ea2f8ae8547da5d6dd6"
---

# Practice

## Example 1. Prefix sum with the Blelloch algorithm

Create a program that computes an exclusive prefix sum (cumulative sales **before** each day) using the Blelloch algorithm, demonstrates it on eight values, verifies the result for $2^{24}$ elements against sequential accumulation, and compares execution times.

```cs
using System.Collections.Concurrent;
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// Demonstration with eight daily sales values.
long[] sales = [3, 1, 7, 0, 4, 1, 6, 3];
long[] demo = (long[])sales.Clone();
Blelloch.PrefixSum(demo);
Console.WriteLine($"Sales:                {string.Join(" ", sales)}");
Console.WriteLine($"Cumulative (before):  {string.Join(" ", demo)}");

// Verification and timing with 2^24 elements.
const int N = 1 << 24;
long[] source = new long[N];
Random random = new(1);
for (int i = 0; i < N; i++) source[i] = random.Next(0, 100);

long[] expected = new long[N];
long[] actual = new long[N];
double tSeq = Median(prepare: () => { }, action: () =>
{
    long sum = 0;
    for (int i = 0; i < N; i++)
    {
        expected[i] = sum;          // sum of elements before i
        sum += source[i];
    }
});
double tPar = Median(
    prepare: () => source.CopyTo(actual, 0),
    action: () => Blelloch.PrefixSum(actual));
bool same = actual.AsSpan().SequenceEqual(expected);
Console.WriteLine($"n = {N:N0}: sequential {tSeq:F1} ms, " +
    $"Blelloch {tPar:F1} ms, S = {tSeq / tPar:F2}");
Console.WriteLine($"Results match: {(same ? "yes" : "no")}");

// prepare is excluded from the measured time.
static double Median(Action prepare, Action action, int runs = 5)
{
    prepare();
    action();
    double[] times = new double[runs];
    for (int i = 0; i < runs; i++)
    {
        prepare();
        long start = Stopwatch.GetTimestamp();
        action();
        times[i] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    }
    Array.Sort(times);
    return times[runs / 2];
}

static class Blelloch
{
    // In-place exclusive prefix sum; length = 2^k.
    public static void PrefixSum(long[] a)
    {
        int n = a.Length;
        if (!int.IsPow2(n))
            throw new ArgumentException("Length must be 2^k");
        for (int step = 2; step <= n; step *= 2)
        {
            ForPairs(a, step, UpSweep);
        }
        a[n - 1] = 0;
        for (int step = n; step >= 2; step /= 2)
        {
            ForPairs(a, step, DownSweep);
        }
    }

    // Up-sweep: the right node of a pair receives the subtree sum.
    static void UpSweep(long[] a, int step, int from, int to)
    {
        int half = step / 2;
        for (int k = from; k < to; k++)
        {
            int right = (k + 1) * step - 1;
            a[right] += a[right - half];
        }
    }

    // Down-sweep: the left child receives the parent value,
    // the right child receives the parent value plus the old left value.
    static void DownSweep(long[] a, int step, int from, int to)
    {
        int half = step / 2;
        for (int k = from; k < to; k++)
        {
            int right = (k + 1) * step - 1;
            long left = a[right - half];
            a[right - half] = a[right];
            a[right] += left;
        }
    }

    // Pairs at one level are independent: divide them into ranges.
    static void ForPairs(long[] a, int step,
        Action<long[], int, int, int> level)
    {
        const int MinRange = 1 << 16;
        int pairs = a.Length / step;
        if (pairs <= MinRange)
        {
            level(a, step, 0, pairs);     // small level — sequential
            return;
        }
        var ranges = Partitioner.Create(0, pairs, MinRange);
        Parallel.ForEach(ranges,
            r => level(a, step, r.Item1, r.Item2));
    }
}
```

The algorithm operates in place and requires a length of $2^{k}$ (`int.IsPow2`). Pairs at the same level do not overlap, so `Parallel.ForEach` with `Partitioner.Create` processes their ranges, while levels with few pairs run sequentially. Copying input data (`prepare`) is excluded from the measured time.

On 16 logical processors, the Blelloch algorithm is 3–4 times **slower** than a sequential loop: it performs twice as many operations, each level traverses 128 MB of memory again, and each operation is just an addition. The shorter span pays off for expensive operations and on GPUs. Output:

```
Sales:                3 1 7 0 4 1 6 3
Cumulative (before):  0 3 4 11 11 15 16 22
n = 16 777 216: sequential 18,4 ms, Blelloch 63,9 ms, S = 0,29
Results match: yes
```

## Example 2. Estimating π with Monte Carlo

Create a program that estimates π using Monte Carlo: the fraction of random points in the square $[ 0 , 1 ] \times [ 0 , 1 ]$ that fall inside a quarter circle is approximately $\pi / 4$. Use 200 million trials divided into 256 blocks with their own generators, print a time, speedup, and efficiency table for 1–16 threads, and show that the result is independent of thread count.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const long Samples = 200_000_000;
const int Blocks = 256;              // independent trial blocks

Console.WriteLine($"Trials: {Samples:N0}, blocks: {Blocks}");
Console.WriteLine(" p   Time, ms      S      E   π");
double t1 = 0;
foreach (int p in new[] { 1, 2, 4, 8, 16 })
{
    double pi = 0;
    double t = Median(() => pi = EstimatePi(p));
    if (p == 1) t1 = t;
    double s = t1 / t;
    Console.WriteLine($"{p,2} {t,9:F1} {s,6:F2} {s / p,6:F2}   " +
        $"{pi:F6} (error {Math.Abs(pi - Math.PI):E1})");
}

// Each block has its own generator (seed 1000 + block number),
// so the result is independent of thread count.
static double EstimatePi(int threads)
{
    long inside = 0;
    ParallelOptions options = new()
    {
        MaxDegreeOfParallelism = threads
    };
    Parallel.For(0, Blocks, options, block =>
    {
        Random random = new(1000 + block);
        long count = Samples / Blocks;
        long hits = 0;
        for (long i = 0; i < count; i++)
        {
            double x = random.NextDouble();
            double y = random.NextDouble();
            if (x * x + y * y <= 1.0) hits++;
        }
        Interlocked.Add(ref inside, hits);
    });
    long total = Samples / Blocks * Blocks;
    return 4.0 * inside / total;
}

static double Median(Action action, int runs = 3)
{
    action();
    double[] times = new double[runs];
    for (int i = 0; i < runs; i++)
    {
        long start = Stopwatch.GetTimestamp();
        action();
        times[i] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    }
    Array.Sort(times);
    return times[runs / 2];
}
```

Block `block` always creates a generator with the same seed and generates the same point sequence regardless of the thread, so the π estimate is identical for every $p$ (with `Random.Shared`, it would vary between runs). The loop body has only one `Interlocked.Add` per block. Speedup reaches 6 on 8 physical cores; beyond that, SMT provides a smaller gain. Output:

```
Trials: 200 000 000, blocks: 256
 p   Time, ms      S      E   π
 1    2489,8   1,00   1,00   3,141590 (error 2,4E-006)
 2    1421,9   1,75   0,88   3,141590 (error 2,4E-006)
 4     713,4   3,49   0,87   3,141590 (error 2,4E-006)
 8     414,6   6,01   0,75   3,141590 (error 2,4E-006)
16     277,5   8,97   0,56   3,141590 (error 2,4E-006)
```

## Example 3. Odd–even transposition sort

Create a program that sorts arrays of 5 000, 20 000, and 50 000 numbers using odd–even transposition sort with parallel execution of each phase, verifies the result against `Array.Sort`, prints a time, speedup, and efficiency table for 1–16 threads, and writes it to `oddeven.csv` for plotting.

```cs
using System.Diagnostics;
using System.Globalization;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;

int[] sizes = [5_000, 20_000, 50_000];
int[] threads = [1, 2, 4, 8, 16];
StringBuilder csv = new("n,p,time_ms,speedup,efficiency\n");

Console.WriteLine("      n   p    Time, ms      S      E");
foreach (int n in sizes)
{
    int[] source = new int[n];
    Random random = new(n);
    for (int i = 0; i < n; i++) source[i] = random.Next(1_000_000);
    int[] expected = (int[])source.Clone();
    Array.Sort(expected);

    int[] data = new int[n];
    double t1 = 0;
    foreach (int p in threads)
    {
        double t = Median(() =>
        {
            source.CopyTo(data, 0);
            OddEvenSort(data, p);
        });
        if (!data.AsSpan().SequenceEqual(expected))
        {
            Console.Error.WriteLine($"Error: n = {n}, p = {p}");
            return 1;
        }
        if (p == 1) t1 = t;
        double s = t1 / t;
        Console.WriteLine(
            $"{n,7:N0} {p,3} {t,10:F1} {s,6:F2} {s / p,6:F2}");
        csv.AppendLine(string.Create(CultureInfo.InvariantCulture,
            $"{n},{p},{t:F2},{s:F3},{s / p:F3}"));
    }
}
File.WriteAllText("oddeven.csv", csv.ToString());
Console.WriteLine("CSV: oddeven.csv");
return 0;

// n phases; an even phase compares pairs (0,1), (2,3), …,
// an odd phase compares (1,2), (3,4), … Pairs in a phase are independent.
static void OddEvenSort(int[] a, int threads)
{
    int n = a.Length;
    ParallelOptions options = new()
    {
        MaxDegreeOfParallelism = threads
    };
    for (int phase = 0; phase < n; phase++)
    {
        int first = phase % 2;               // 0 or 1
        int pairs = (n - first) / 2;
        if (threads == 1)
        {
            ComparePairs(a, first, 0, pairs);
            continue;
        }
        // Divide the phase pairs into threads contiguous blocks.
        int block = (pairs + threads - 1) / threads;
        Parallel.For(0, threads, options, t =>
        {
            int from = t * block;
            int to = Math.Min(pairs, from + block);
            ComparePairs(a, first, from, to);
        });
    }
}

static void ComparePairs(int[] a, int first, int from, int to)
{
    for (int k = from; k < to; k++)
    {
        int i = first + 2 * k;
        if (a[i] > a[i + 1])
        {
            (a[i], a[i + 1]) = (a[i + 1], a[i]);
        }
    }
}

static double Median(Action action, int runs = 3)
{
    action();
    double[] times = new double[runs];
    for (int i = 0; i < runs; i++)
    {
        long start = Stopwatch.GetTimestamp();
        action();
        times[i] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    }
    Array.Sort(times);
    return times[runs / 2];
}
```

An array of $n$ elements is guaranteed to be sorted in $n$ phases. Pairs within a phase do not overlap, so divide the phase into `threads` contiguous blocks and execute them with `Parallel.For`. For `threads == 1`, the pair loop runs without `Parallel.For`: this is the sequential version and time $T_{1}$.

The table shows the effect of **granularity**: for $n = 5000$, a phase has only 2500 comparisons, and starting `Parallel.For` costs more than the work, making the parallel version 2–3 times **slower**; for $n$ = 50 000, speedup reaches 2.9. Plot `oddeven.csv` in Excel or LibreOffice Calc (a scatter chart of `speedup` versus `p` for each `n`). Output:

```
      n   p    Time, ms      S      E
  5 000   1       14,7   1,00   1,00
  5 000   2       36,2   0,41   0,20
  5 000   4       32,3   0,45   0,11
  5 000   8       35,8   0,41   0,05
  5 000  16       41,6   0,35   0,02
 20 000   1      178,1   1,00   1,00
 20 000   2      106,1   1,68   0,84
 20 000   4       98,7   1,81   0,45
 20 000   8      110,1   1,62   0,20
 20 000  16      132,7   1,34   0,08
 50 000   1     1478,8   1,00   1,00
 50 000   2      810,7   1,82   0,91
 50 000   4      589,9   2,51   0,63
 50 000   8      514,4   2,88   0,36
 50 000  16      520,9   2,84   0,18
CSV: oddeven.csv
```
