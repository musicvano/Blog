---
title: "Examples and common mistakes"
description: "Topic 8. Parallel algorithms: Examples and common mistakes"
outline: [2, 3]
sourceHash: "99a4026f602778a50d12afa8138dba950c3d28cc5e1dadbbeb7427ee58d77def"
---

# Examples and common mistakes

## Program examples

The examples were run in the *Release* configuration (`dotnet run -c Release`) on .NET 10 on an Intel Core i9-11900KF processor (8 cores, 16 logical processors, 64 GB DDR4-3600). Each measurement is the median of 5–9 runs after a warmup that gives the JIT time to recompile the methods with optimizations; timings differ on another computer and between runs.

### Dot product and vector distributions

The program computes the dot product of two vectors of 20 million random `double` values for the block, cyclic, and block-cyclic (blocks of 1024 elements) distributions on 1, 2, 4, 8, and 16 threads, and prints the time, the speedup, and the result with all significant digits (the `R` format), as well as the norm of the vector. At the end, it computes the same sum five times with `Parallel.For` and local sums that are added under a `lock` in the order in which the threads finish.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

int n = args.Length > 0 ? int.Parse(args[0]) : 20_000_000;
const int Block = 1024;                  // block of the block-cyclic distribution
double[] x = new double[n], y = new double[n];
Random random = new(8);
for (int i = 0; i < n; i++)
{
    x[i] = random.NextDouble() * 2 - 1;
    y[i] = random.NextDouble() * 2 - 1;
}

string[] names = ["block", "cyclic", "block-cyclic"];
Console.WriteLine($"n = {n:N0}, block {Block}");
Console.WriteLine("Distribution       p  Time, ms     S" +
    "  Dot product");
for (int kind = 0; kind < 3; kind++)
{
    double t1 = 0;
    foreach (int p in new[] { 1, 2, 4, 8, 16 })
    {
        double dot = 0;
        double t = Median(() => dot = Dot(x, y, p, kind, Block));
        if (p == 1) t1 = t;
        Console.WriteLine($"{names[kind],-17}{p,3}{t,9:F1}" +
            $"{t1 / t,6:F1}  {dot:R}");
    }
}
Console.WriteLine($"Norm of x: {Math.Sqrt(Dot(x, x, 8, 0, Block)):F6}");

// Nondeterministic reduction: the threads' sums are added in the order
// in which they finish, so the last digit changes from run to run.
Console.WriteLine("Parallel.For + lock, 5 runs:");
for (int run = 0; run < 5; run++)
{
    double sum = 0;
    object gate = new();
    Parallel.For(0, n, () => 0.0,
        (i, _, local) => local + x[i] * y[i],
        local => { lock (gate) sum += local; });
    Console.WriteLine($"  {sum:R}");
}

// Thread t (t = 0..p-1) processes its part of the vector.
static double Dot(double[] x, double[] y, int p, int kind, int b)
{
    int n = x.Length;
    double[] partial = new double[p];
    ParallelOptions options = new() { MaxDegreeOfParallelism = p };
    Parallel.For(0, p, options, t =>
    {
        double sum = 0;
        if (kind == 0)                   // block
        {
            int lo = (int)((long)t * n / p);
            int hi = (int)((long)(t + 1) * n / p);
            for (int i = lo; i < hi; i++) sum += x[i] * y[i];
        }
        else if (kind == 1)              // cyclic: t, t + p, …
        {
            for (int i = t; i < n; i += p) sum += x[i] * y[i];
        }
        else                             // blocks t, t + p, …
        {
            for (int s = t * b; s < n; s += p * b)
            {
                int e = Math.Min(s + b, n);
                for (int i = s; i < e; i++) sum += x[i] * y[i];
            }
        }
        partial[t] = sum;                // one write per thread
    });
    double total = 0;                    // fixed order
    for (int t = 0; t < p; t++) total += partial[t];
    return total;
}

static double Median(Action action, int runs = 7)
{
    action();
    action();                            // warmup
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

The `Dot` method runs exactly $p$ iterations of `Parallel.For`, one per “processor” $t$, and each computes its own part. The partial sum is accumulated in a local variable and written to the `partial` array only once: writing `partial[t] +=` for every element would cause false sharing (Topic 4). The partial sums are added in the order of the thread numbers, so for a given $p$ and distribution the result is the same in all runs, while for different $p$ it differs in the last digits. Output:

```
n = 20 000 000, block 1024
Distribution       p  Time, ms     S  Dot product
block              1     17,3   1,0  -111,15502539981759
block              2      9,3   1,9  -111,15502539977811
block              4      7,0   2,5  -111,15502539965507
block              8      7,1   2,4  -111,15502539963944
block             16      7,2   2,4  -111,15502539968372
cyclic             1     18,3   1,0  -111,15502539981759
cyclic             2     12,5   1,5  -111,1550253996511
cyclic             4     11,9   1,5  -111,15502539960707
cyclic             8     21,0   0,9  -111,15502539958044
cyclic            16     32,5   0,6  -111,15502539971922
block-cyclic       1     18,2   1,0  -111,15502539981759
block-cyclic       2     10,0   1,8  -111,15502539957549
block-cyclic       4      7,4   2,5  -111,15502539974682
block-cyclic       8      8,0   2,3  -111,15502539959948
block-cyclic      16      7,3   2,5  -111,1550253997417
Norm of x: 2582,027854
Parallel.For + lock, 5 runs:
  -111,1550253996977
  -111,15502539969074
  -111,15502539969052
  -111,15502539969242
  -111,1550253997076
```

The speedup of the block distribution stops at 2.4–2.5: from 4 threads on, 320 MB are read in 7 ms (about 45 GB/s), and more threads do not help. The cyclic distribution on 16 threads is almost twice as slow as the sequential one: each thread walks through all the memory with stride $p$. The `Parallel.For` sums with a `lock` differ every time, because the order in which the partial sums are added changes.

### Matrix–vector multiplication

The program multiplies an $n \times n$ matrix (a command-line argument, 1000 by default) by a vector with three schemes: horizontal stripes, vertical stripes with a reduction of the partial vectors, and the checkerboard scheme with an $r \times c$ grid of threads. For each thread count, it checks the result against a reference, measures the time, and prints the speedup predicted by the model, the measured speedup, and the efficiency.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

int n = args.Length > 0 ? int.Parse(args[0]) : 1000;
const double Bandwidth = 44e9;           // B/s, measured in Topic 7
const long CacheL3 = 16L << 20;          // 16 MB
double[] a = new double[(long)n * n], x = new double[n];
Random random = new(3);
for (long k = 0; k < a.Length; k++) a[k] = random.NextDouble();
for (int j = 0; j < n; j++) x[j] = random.NextDouble();
double[] expected = new double[n], y = new double[n];

MatVec.Rows(a, x, expected, n, 1);       // reference
double tSync = Median(() => Parallel.For(0, 16, _ => { }));
bool inCache = 8.0 * n * n <= CacheL3;
double tMem = inCache ? 0 : 8.0 * n * n / Bandwidth * 1000;
double mb = 8.0 * n * n / (1 << 20);
Console.WriteLine($"n = {n}, matrix {mb:F0} MB" +
    $"{(inCache ? " (in L3 cache)" : "")}, synchronization " +
    $"{tSync * 1000:F0} µs");
double t1 = 0;                           // the first row of the table
Console.WriteLine("Scheme         p  Time, ms     S  Predicted S     E");

foreach (string scheme in new[] { "rows", "columns", "checkerboard" })
{
    foreach (int p in new[] { 1, 2, 4, 8, 16 })
    {
        Action run = scheme switch
        {
            "rows" => () => MatVec.Rows(a, x, y, n, p),
            "columns" => () => MatVec.Columns(a, x, y, n, p),
            _ => () => MatVec.Blocks2D(a, x, y, n, p),
        };
        double t = Median(run);
        CheckResult(y, expected);
        if (t1 == 0) t1 = t;
        double tAdd = t1 / ((double)n * n);  // ms per operation
        // Prediction: computation is divided by p, but it is no faster than
        // reading the matrix from memory; plus reduction and synchronization.
        int stages = scheme == "rows" ? 1 : 2;
        int partners = scheme switch
        {
            "rows" => 1, "columns" => p, _ => MatVec.GridCols(p)
        };
        double predicted = Math.Max(t1 / p, tMem)
            + stages * tSync + (partners - 1) * n * tAdd;
        double s = t1 / t;
        Console.WriteLine($"{scheme,-12}{p,3}{t,9:F2}{s,6:F1}" +
            $"{t1 / predicted,11:F1}{s / p,6:F2}");
    }
}

static void CheckResult(double[] y, double[] expected)
{
    for (int i = 0; i < y.Length; i++)
    {
        double error = Math.Abs(y[i] - expected[i]);
        if (error > 1e-9 * Math.Abs(expected[i]))
            throw new InvalidOperationException($"y[{i}] is wrong");
    }
}

// A 0.3 s warmup and a pause: the JIT has time to recompile the methods
// with optimizations (Tier 1). Then the median of the runs, ms.
static double Median(Action action, int runs = 9)
{
    long warm = Stopwatch.GetTimestamp();
    do action();
    while (Stopwatch.GetElapsedTime(warm).TotalMilliseconds < 300);
    Thread.Sleep(200);
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

// y = A·x; A is stored by rows: a[i * n + j].
static class MatVec
{
    // Horizontal stripes: thread t computes its own rows of y.
    public static void Rows(double[] a, double[] x, double[] y,
        int n, int p)
    {
        Parallel.For(0, p, Options(p), t =>
        {
            var (lo, hi) = Range(n, p, t);
            for (int i = lo; i < hi; i++)
                y[i] = Dot(a, (long)i * n, x, 0, n);
        });
    }

    // Vertical stripes: thread t multiplies its columns by part of x
    // and gets a partial vector z[t]; then a reduction of z by rows.
    public static void Columns(double[] a, double[] x, double[] y,
        int n, int p)
    {
        double[][] z = new double[p][];
        Parallel.For(0, p, Options(p), t =>
        {
            var (lo, hi) = Range(n, p, t);
            double[] part = new double[n];
            for (int i = 0; i < n; i++)
                part[i] = Dot(a, (long)i * n + lo, x, lo, hi - lo);
            z[t] = part;
        });
        Reduce(z, y, n, p, p);
    }

    // Checkerboard: p = r × c blocks; block (bi, bj) gives a partial
    // vector for rows bi, and the reduction is over the c blocks of a row.
    public static void Blocks2D(double[] a, double[] x, double[] y,
        int n, int p)
    {
        int c = GridCols(p), r = p / c;
        double[][] z = new double[c][];
        for (int bj = 0; bj < c; bj++) z[bj] = new double[n];
        Parallel.For(0, p, Options(p), t =>
        {
            int bi = t / c, bj = t % c;
            var (i0, i1) = Range(n, r, bi);
            var (j0, j1) = Range(n, c, bj);
            for (int i = i0; i < i1; i++)
                z[bj][i] = Dot(a, (long)i * n + j0, x, j0, j1 - j0);
        });
        Reduce(z, y, n, c, p);
    }

    // Number of grid columns: the largest divisor of p not greater
    // than √p (16 → 4 × 4, 8 → 4 × 2, 2 → 2 × 1).
    public static int GridCols(int p)
    {
        int c = (int)Math.Sqrt(p);
        while (p % c != 0) c--;
        return c;
    }

    // y[i] = z[0][i] + … + z[parts - 1][i]; the rows are split among p threads.
    static void Reduce(double[][] z, double[] y, int n, int parts,
        int p)
    {
        Parallel.For(0, p, Options(p), t =>
        {
            var (lo, hi) = Range(n, p, t);
            for (int i = lo; i < hi; i++)
            {
                double sum = 0;
                for (int k = 0; k < parts; k++) sum += z[k][i];
                y[i] = sum;
            }
        });
    }

    static double Dot(double[] a, long offset, double[] x, int x0,
        int length)
    {
        double sum = 0;
        for (int j = 0; j < length; j++)
            sum += a[offset + j] * x[x0 + j];
        return sum;
    }

    static (int, int) Range(int n, int parts, int k) =>
        ((int)((long)k * n / parts),
         (int)((long)(k + 1) * n / parts));

    static ParallelOptions Options(int p) =>
        new() { MaxDegreeOfParallelism = p };
}
```

The prediction consists of three terms: the computation $T_{1} / p$, but no faster than reading the matrix from memory (if the matrix is larger than the L3 cache); the synchronization time (an empty `Parallel.For`, measured at the start); and, for vertical stripes and the checkerboard scheme, one more parallel loop and the reduction. The `GridCols` method builds the grid closest to a square: 16 threads give $4 \times 4$, and 8 give $4 \times 2$. Output for $n = 1000$ (`dotnet run -c Release -- 1000`):

```
n = 1000, matrix 8 MB (in L3 cache), synchronization 8 µs
Scheme         p  Time, ms     S  Predicted S     E
rows          1     0,76   1,0        1,0  1,00
rows          2     0,44   1,7        2,0  0,85
rows          4     0,30   2,5        3,8  0,62
rows          8     0,22   3,5        7,4  0,43
rows         16     0,22   3,4       13,8  0,21
columns       1     0,87   0,9        1,0  0,87
columns       2     0,50   1,5        1,9  0,76
columns       4     0,32   2,4        3,7  0,60
columns       8     0,20   3,7        6,6  0,46
columns      16     0,22   3,5       10,3  0,22
checkerboard  1     0,86   0,9        1,0  0,88
checkerboard  2     0,56   1,3        1,9  0,67
checkerboard  4     0,34   2,2        3,7  0,55
checkerboard  8     0,28   2,7        6,9  0,33
checkerboard 16     0,27   2,8       11,7  0,17
```

For $n = 8000$ (`dotnet run -c Release -- 8000`):

```
n = 8000, matrix 488 MB, synchronization 6 µs
Scheme         p  Time, ms     S  Predicted S     E
rows          1    53,82   1,0        1,0  1,00
rows          2    28,15   1,9        2,0  0,96
rows          4    15,22   3,5        4,0  0,88
rows          8    12,11   4,4        4,6  0,56
rows         16    11,10   4,8        4,6  0,30
columns       1    54,61   1,0        1,0  0,99
columns       2    35,53   1,5        2,0  0,76
columns       4    18,75   2,9        4,0  0,72
columns       8    12,63   4,3        4,6  0,53
columns      16    13,70   3,9        4,6  0,25
checkerboard  1    54,88   1,0        1,0  0,98
checkerboard  2    35,23   1,5        2,0  0,76
checkerboard  4    17,75   3,0        4,0  0,76
checkerboard  8    11,82   4,6        4,6  0,57
checkerboard 16    11,79   4,6        4,6  0,29
```

For the large matrix, the memory-bound model predicted a limit of 4.6, and the measurements agree with it for all three schemes. For the small matrix (8 MB, in the L3 cache), the model predicts an almost linear speedup, but in reality it does not exceed 3.7: a 0.2 ms parallel loop cannot pay back the cost of waking up the threads. Conclusion: such an operation is parallelized not on its own but together with the surrounding algorithm (for example, the whole iteration of a method), so that one parallel loop does more work.

### Adaptive integration

The program computes $\int_{0}^{L} 2 x \cos x^{2} d x = \sin L^{2}$ ($L = 200$) with the adaptive Simpson method to a tolerance of $10^{- 8}$: sequentially, with static partitioning into 16 and 256 equal parts (`Parallel.For`), and with recursive `Parallel.Invoke` tasks with depth thresholds of 4, 8, 12, and 16. The exact value is known, so the true error is printed. For 16 parts, the program shows the smallest and largest part times.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// ∫ 2x·cos(x²) dx over [0; L] = sin(L²): the oscillations become more frequent
// to the right, so the right part of the segment needs more work.
double length = args.Length > 0 ? double.Parse(args[0]) : 200;
const double Eps = 1e-8;
double exact = Math.Sin(length * length);
Console.WriteLine($"L = {length}, ε = {Eps:E0}, " +
    $"exact value {exact:F12}");
Console.WriteLine($"{"Method",-25}{"Time, ms",9}{"S",6}" +
    $"{"Error",10}{"Tasks",8}");

double value = 0;
double t0 = Median(() => value = Simpson.Whole(0, length, Eps));
Print("sequential", t0, value, 0);

foreach (int parts in new[] { 16, 256 })
{
    double[] partTimes = new double[parts];
    double t = Median(() => value =
        Simpson.Static(0, length, Eps, parts, partTimes));
    Print($"static, {parts} parts", t, value, parts);
    if (parts == 16)
        Console.WriteLine($"  part times, ms: {partTimes.Min():F1}" +
            $" … {partTimes.Max():F1}");
}

foreach (int levels in new[] { 4, 8, 12, 16 })
{
    double t = Median(() => value =
        Simpson.Tasks(0, length, Eps, levels));
    Print($"tasks, threshold 2^{levels}", t, value, Simpson.TaskCount);
}

void Print(string name, double t, double v, long tasks) =>
    Console.WriteLine($"{name,-25}{t,9:F1}{t0 / t,6:F1}" +
        $"{Math.Abs(v - exact),10:E1}{tasks,8}");

static double Median(Action action, int runs = 7)
{
    action();
    Thread.Sleep(200);
    action();                            // warmup
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

static class Simpson
{
    const int MinDepth = 14;             // at least 16,384 segments
    public static long TaskCount;

    static double F(double x) => 2 * x * Math.Cos(x * x);

    public static double Whole(double a, double b, double eps)
    {
        var (fa, fm, fb) = (F(a), F((a + b) / 2), F(b));
        double whole = Rule(a, b, fa, fm, fb);
        return Adapt(a, b, fa, fm, fb, whole, eps, 0);
    }

    static double Rule(double a, double b, double fa, double fm,
        double fb) => (b - a) / 6 * (fa + 4 * fm + fb);

    // Adaptive Simpson: split the segment until the error estimate
    // (by Runge's rule) becomes smaller than eps.
    static double Adapt(double a, double b, double fa, double fm,
        double fb, double whole, double eps, int depth)
    {
        double m = (a + b) / 2;
        double flm = F((a + m) / 2), frm = F((m + b) / 2);
        double left = Rule(a, m, fa, flm, fm);
        double right = Rule(m, b, fm, frm, fb);
        double delta = left + right - whole;
        if (depth >= MinDepth && Math.Abs(delta) <= 15 * eps
            || depth > 50)
            return left + right + delta / 15;
        return Adapt(a, m, fa, flm, fm, left, eps / 2, depth + 1)
             + Adapt(m, b, fm, frm, fb, right, eps / 2, depth + 1);
    }

    // Static partitioning into parts equal parts (parts = 2^k).
    public static double Static(double a, double b, double eps,
        int parts, double[] partTimes)
    {
        double[] sums = new double[parts];
        double h = (b - a) / parts;
        Parallel.For(0, parts, k =>
        {
            long start = Stopwatch.GetTimestamp();
            double x0 = a + k * h, x1 = x0 + h;
            var (f0, fm, f1) = (F(x0), F(x0 + h / 2), F(x1));
            sums[k] = Adapt(x0, x1, f0, fm, f1,
                Rule(x0, x1, f0, fm, f1), eps / parts,
                (int)Math.Log2(parts));
            partTimes[k] = Stopwatch.GetElapsedTime(start)
                .TotalMilliseconds;
        });
        double total = 0;
        foreach (double s in sums) total += s;
        return total;
    }

    // Recursive tasks: up to depth levels, each half becomes
    // a separate task; deeper, ordinary recursion is used.
    public static double Tasks(double a, double b, double eps,
        int levels)
    {
        TaskCount = 0;
        var (fa, fm, fb) = (F(a), F((a + b) / 2), F(b));
        return AdaptTasks(a, b, fa, fm, fb, Rule(a, b, fa, fm, fb),
            eps, 0, levels);
    }

    static double AdaptTasks(double a, double b, double fa,
        double fm, double fb, double whole, double eps, int depth,
        int levels)
    {
        if (depth >= levels)
            return Adapt(a, b, fa, fm, fb, whole, eps, depth);
        double m = (a + b) / 2;
        double flm = F((a + m) / 2), frm = F((m + b) / 2);
        double left = Rule(a, m, fa, flm, fm);
        double right = Rule(m, b, fm, frm, fb);
        double delta = left + right - whole;
        if (depth >= MinDepth && Math.Abs(delta) <= 15 * eps)
            return left + right + delta / 15;
        double l = 0, r = 0;
        Interlocked.Add(ref TaskCount, 2);
        Parallel.Invoke(
            () => l = AdaptTasks(a, m, fa, flm, fm, left, eps / 2,
                depth + 1, levels),
            () => r = AdaptTasks(m, b, fm, frm, fb, right, eps / 2,
                depth + 1, levels));
        return l + r;
    }
}
```

`MinDepth` prevents a segment shorter than 1/16,384 of the whole from being accepted too early: on a wide segment with several oscillations, the error estimate can turn out small by chance. Static partitioning into $2^{k}$ parts starts the recursion at depth $k$ with tolerance $\epsilon / 2^{k}$, and the tasks start from the same values, so all approaches build **the same** tree of segments and produce the same result: parallelism did not change the computation. Output:

```
L = 200, ε = 1E-008, exact value 0,946539656786
Method                    Time, ms     S     Error   Tasks
sequential                   170,9   1,0  5,7E-013       0
static, 16 parts              37,5   4,6  5,7E-013      16
  part times, ms: 0,4 … 32,9
static, 256 parts             32,4   5,3  5,7E-013     256
tasks, threshold 2^4          39,3   4,3  5,7E-013      30
tasks, threshold 2^8          23,4   7,3  5,7E-013     510
tasks, threshold 2^12         23,9   7,2  5,7E-013    8190
tasks, threshold 2^16         32,0   5,3  5,7E-013  130068
```

Static partitioning into 16 parts speeds up the computation only 4.6 times: the heaviest part (33 ms) takes almost as long as the whole parallel program. 256 parts with the dynamic distribution of `Parallel.For` are better, but the heaviest parts at the end of the segment are handed out last. Recursive tasks with a threshold of $2^{8}$–$2^{12}$ give the best speedup of 7.2–7.3; too few tasks ($2^{4}$) worsen balancing, and too many ($2^{16}$) increase the overhead.

The recursion tasks are convenient to examine in the debugger. In Rider, set a breakpoint in the `AdaptTasks` method on the `Parallel.Invoke` line (condition `depth == 6`), start debugging (*Run → Debug*), and open the *Parallel Stacks* tab of the *Debug* window (Fig. 8.12): the stacks of several pool threads contain chains of `AdaptTasks` calls of different depths, and the threads that stole tasks start their stacks with thread pool methods.

::: info Screenshot
Rider: breakpoint in `Simpson.AdaptTasks` at `Parallel.Invoke` with condition `depth == 6`, Run → Debug; Debug tool window → Parallel Stacks tab: several worker threads with recursive AdaptTasks frames of different depth
:::

Figure 8.12. Adaptive integration tasks in the debugger {.caption}

### Roots of an equation

The program finds all roots of the Legendre polynomial $P_{n} (x)$ ($n = 1000$) on $[ - 1 ; 1 ]$: it evaluates $P_{n}$ at the nodes of a uniform grid (the number of segments is the second argument, 400,000 by default), isolates the roots by sign changes, refines them by bisection and, independently, by Newton’s method from the known approximations $\cos (\pi (k + 0 {,} 75) / (n + 0 {,} 5))$. Each stage runs sequentially and in parallel; at the end, the roots from the two methods are compared.

```cs
using System.Collections.Concurrent;
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// The roots of the Legendre polynomial P_n on [-1; 1]: there are exactly n
// of them, and near the ends of the segment they are very densely packed.
int n = args.Length > 0 ? int.Parse(args[0]) : 1000;
int segments = args.Length > 1 ? int.Parse(args[1]) : 400_000;
Console.WriteLine($"P_{n}(x), segments: {segments:N0}");
Console.WriteLine("Stage                     1 thread, ms  " +
    "Parallel, ms     S");

double[] values = new double[segments + 1];
Report("grid evaluation",
    () => Scan(values, n, segments, parallel: false),
    () => Scan(values, n, segments, parallel: true));

// Segments at whose endpoints P_n has different signs.
List<int> brackets = [];
for (int k = 0; k < segments; k++)
    if (Math.Sign(values[k]) != Math.Sign(values[k + 1]))
        brackets.Add(k);

double h = 2.0 / segments;
double[] bisect = new double[brackets.Count];
Report("bisection", () =>
{
    for (int r = 0; r < brackets.Count; r++)
        bisect[r] = Bisection(n, -1 + brackets[r] * h, h);
}, () => Parallel.For(0, brackets.Count, r =>
    bisect[r] = Bisection(n, -1 + brackets[r] * h, h)));

// Newton from n starting points cos(π(k + 0.75)/(n + 0.5)).
double[] newton = new double[n];
Report("Newton's method", () =>
{
    for (int k = 0; k < n; k++) newton[k] = Newton(n, k);
}, () => Parallel.For(0, n, k => newton[k] = Newton(n, k)));
Array.Sort(newton);

Console.WriteLine($"Roots found: {bisect.Length} of {n}");
if (bisect.Length == n)
{
    double diff = 0;
    for (int k = 0; k < n; k++)
        diff = Math.Max(diff, Math.Abs(bisect[k] - newton[k]));
    Console.WriteLine($"max |bisection − Newton| = {diff:E1}");
}
Console.WriteLine($"Smallest root {newton[0]:F15}");

void Report(string name, Action sequential, Action parallel)
{
    double t1 = Median(sequential), tp = Median(parallel);
    Console.WriteLine($"{name,-26}{t1,10:F1}{tp,16:F1}" +
        $"{t1 / tp,6:F1}");
}

static void Scan(double[] values, int n, int segments, bool parallel)
{
    double h = 2.0 / segments;
    if (!parallel)
    {
        for (int k = 0; k <= segments; k++)
            values[k] = Legendre(n, -1 + k * h).P;
        return;
    }
    // Ranges of 4096 points: one delegate call per range.
    var ranges = Partitioner.Create(0, segments + 1, 4096);
    Parallel.ForEach(ranges, range =>
    {
        for (int k = range.Item1; k < range.Item2; k++)
            values[k] = Legendre(n, -1 + k * h).P;
    });
}

// Halve the segment until it becomes smaller than 1e-15.
static double Bisection(int n, double a, double h)
{
    double b = a + h, fa = Legendre(n, a).P;
    while (b - a > 1e-15)
    {
        double m = (a + b) / 2, fm = Legendre(n, m).P;
        if (Math.Sign(fm) == Math.Sign(fa)) (a, fa) = (m, fm);
        else b = m;
    }
    return (a + b) / 2;
}

static double Newton(int n, int k)
{
    double x = Math.Cos(Math.PI * (k + 0.75) / (n + 0.5));
    for (int iter = 0; iter < 100; iter++)
    {
        var (p, dp) = Legendre(n, x);
        double dx = p / dp;
        x -= dx;
        if (Math.Abs(dx) < 1e-15) break;
    }
    return x;
}

// P_n(x) by recurrence: (k + 1)P_{k+1} = (2k + 1)x·P_k − k·P_{k−1};
// the derivative P'_n = n(x·P_n − P_{n−1}) / (x² − 1).
static (double P, double D) Legendre(int n, double x)
{
    double p0 = 1, p1 = x;
    for (int k = 1; k < n; k++)
        (p0, p1) = (p1, ((2 * k + 1) * x * p1 - k * p0) / (k + 1));
    return (p1, n * (x * p1 - p0) / (x * x - 1));
}

static double Median(Action action, int runs = 5)
{
    action();
    Thread.Sleep(200);
    action();                            // warmup
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

$P_{n} (x)$ is computed by a recurrence in $n$ steps, so one value costs about a microsecond, and the grid of 400 thousand nodes is the most expensive stage. The grid is computed by `Parallel.ForEach` with ranges of 4096 nodes (Topic 6), and bisection and Newton’s method by `Parallel.For` over the roots. Output:

```
P_1000(x), segments: 400 000
Stage                     1 thread, ms  Parallel, ms     S
grid evaluation               1845,4           133,9  13,8
bisection                      155,7            13,2  11,8
Newton's method                 12,5             1,2  10,4
Roots found: 1000 of 1000
max |bisection − Newton| = 3,3E-016
Smallest root -0,999997111298076
```

The stages are sped up 10–14 times: the time is limited by computation, not memory, and the SMT logical processors help, because a chain of dependent divisions in one thread leaves the core’s execution units free. The roots from the two methods agree to within $3 \cdot 10^{- 16}$. With 100 thousand segments (`dotnet run -c Release -- 1000 100000`), the program finds only 996 roots: the grid step of $2 \cdot 10^{- 5}$ is larger than the distance between roots near $\pm 1$.

## Common mistakes

Table 8.7. Common mistakes in designing parallel algorithms {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| a parallel sum differs in the last digits every time | the partial sums are added in the order in which the threads finish; use a fixed partitioning into parts, add in the order of the part numbers, and compare with a tolerance |
| an iterative method performs a different number of iterations in different runs | nondeterministic dot products; use a deterministic reduction over fixed parts |
| the speedup stops at 2–5 for simple operations on large arrays | the memory bandwidth limit; estimate $8 n / B$, combine several passes into one, work with data in the cache |
| the cyclic distribution is slower than the sequential loop | each thread reads all cache lines; use a block or block-cyclic distribution |
| a static distribution gives a low speedup for uneven tasks | imbalance: the heaviest part determines the time; use a cyclic distribution, a dynamic counter, or tasks with work stealing |
| recursive tasks are slower than sequential recursion | the tasks are too small; use a depth or size threshold below which the recursion is sequential |
| a program with a `Barrier` hangs | there are more barrier participants than simultaneously running threads (`Parallel.For`, tasks); use separate `Thread` threads or `LongRunning` |
| some roots of the equation are missed | the grid step is larger than the distance between roots; reduce the step and check the number of roots using known properties |
| the predicted speedup is much larger than the measured one | the model does not account for memory, core frequency, SMT, or imbalance; add measured parameters |
| an algorithm that is fast in shared memory is slow on a cluster | the communication per node does not decrease with $p$ (stripes); use the checkerboard scheme, Fox’s and Cannon’s algorithms, and agglomerate the tasks |
