---
title: "Practice"
description: "Topic 8. Parallel algorithms: worked examples"
outline: [2, 3]
sourceHash: "e6628a8e6e51a2a4a0deb0a07aa9921f038d2e72f4331391949fffff5a952979"
---

# Practice

## Example 1. Matrix multiplication: stripes, the checkerboard scheme, and Cannon’s algorithm

Create a program that multiplies two $1152 \times 1152$ `double` matrices with three parallel schemes: horizontal stripes, the checkerboard scheme ($q \times q$ blocks, each computed by its own thread from the shared matrices), and Cannon’s algorithm (private copies of the blocks, shifts, and barriers) for $p = q^{2} = 1 , 4 , 9 , 16$ threads. For each scheme, print the time, the measured speedup, the speedup predicted by the model, the efficiency, and the largest difference from the reference.

The prediction model: the work is divided into $p$ parts, but only 8 physical cores compute simultaneously, so $T_{p} = T_{1} / \min (p , 8)$; for Cannon’s algorithm, copying two blocks at each shift and two barriers are added, and the program measures their time separately. The inner loop of block multiplication is an `axpy` operation performed by the `TensorPrimitives.MultiplyAdd` method (the `System.Numerics.Tensors` package, Topic 7).

```cs
using System.Diagnostics;
using System.Numerics.Tensors;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// n is divisible by 1, 2, 3, and 4, so the 1×1 … 4×4 grids are even.
int n = args.Length > 0 ? int.Parse(args[0]) : 1152;
const int Cores = 8;                     // physical cores of the i9-11900KF
double[] a = Random(n, seed: 1), b = Random(n, seed: 2);
double[] expected = new double[n * n], c = new double[n * n];

Mul.Stripes(a, b, expected, n, 1);      // reference
Console.WriteLine($"n = {n}, physical cores {Cores}");
double t1 = 0;                           // the first row of the table
Console.WriteLine("Scheme          p  Time, ms     S  Predicted S     E" +
    "  max|ΔC|");
foreach (string scheme in new[] { "stripes", "checkerboard", "Cannon" })
{
    foreach (int q in new[] { 1, 2, 3, 4 })
    {
        int p = q * q;
        Action run = scheme switch
        {
            "stripes" => () => Mul.Stripes(a, b, c, n, p),
            "checkerboard" => () => Mul.Blocks2D(a, b, c, n, q),
            _ => () => Mul.Cannon(a, b, c, n, q),
        };
        double t = Median(run);
        if (t1 == 0) t1 = t;
        // The work is divided by p, but only 8 cores run simultaneously.
        double predicted = t1 / Math.Min(p, Cores);
        if (scheme == "Cannon")          // + communication and barriers
            predicted += Model.CannonOverhead(n, q);
        double s = t1 / t;
        Console.WriteLine($"{scheme,-13}{p,3}{t,9:F1}{s,6:F1}" +
            $"{t1 / predicted,11:F1}{s / p,6:F2}" +
            $"  {MaxDiff(c, expected):G2}");
    }
}

static double[] Random(int n, int seed)
{
    Random random = new(seed);
    double[] m = new double[n * n];
    for (int i = 0; i < m.Length; i++) m[i] = random.NextDouble();
    return m;
}

static double MaxDiff(double[] x, double[] y)
{
    double max = 0;
    for (int i = 0; i < x.Length; i++)
        max = Math.Max(max, Math.Abs(x[i] - y[i]));
    return max;
}

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

static class Mul
{
    // C[rows × cols] += A[rows × inner] · B[inner × cols]; each
    // matrix is given by an array, an offset, and a row length (ld).
    public static void Kernel(double[] a, int aOff, int lda,
        double[] b, int bOff, int ldb, double[] c, int cOff, int ldc,
        int rows, int inner, int cols)
    {
        for (int i = 0; i < rows; i++)
        {
            Span<double> ci = c.AsSpan(cOff + i * ldc, cols);
            for (int k = 0; k < inner; k++)
            {
                double aik = a[aOff + i * lda + k];
                var bk = b.AsSpan(bOff + k * ldb, cols);
                TensorPrimitives.MultiplyAdd(bk, aik, ci, ci);
            }
        }
    }

    // Horizontal stripes: thread t computes its own rows of C.
    public static void Stripes(double[] a, double[] b, double[] c,
        int n, int p)
    {
        Array.Clear(c);
        Parallel.For(0, p, new ParallelOptions
            { MaxDegreeOfParallelism = p }, t =>
        {
            int lo = t * n / p, hi = (t + 1) * n / p;
            Kernel(a, lo * n, n, b, 0, n, c, lo * n, n,
                hi - lo, n, n);
        });
    }

    // Checkerboard: thread (i, j) computes block C_ij = Σ A_ik·B_kj,
    // reading a row of blocks of A and a column of blocks of B from shared memory.
    public static void Blocks2D(double[] a, double[] b, double[] c,
        int n, int q)
    {
        Array.Clear(c);
        int bs = n / q;
        Parallel.For(0, q * q, new ParallelOptions
            { MaxDegreeOfParallelism = q * q }, t =>
        {
            int i = t / q, j = t % q;
            for (int k = 0; k < q; k++)
                Kernel(a, i * bs * n + k * bs, n,
                    b, k * bs * n + j * bs, n,
                    c, i * bs * n + j * bs, n, bs, bs, bs);
        });
    }

    // Cannon's algorithm: thread (i, j) has private copies of blocks of A and B.
    // After the alignment shift, q steps: multiplication, barrier, shift of A
    // to the left and of B up (copying the neighbor's block), barrier.
    public static void Cannon(double[] a, double[] b, double[] c,
        int n, int q)
    {
        int bs = n / q, p = q * q;
        double[][] blockA = new double[p][], blockB = new double[p][];
        double[][] nextA = new double[p][], nextB = new double[p][];
        double[][] blockC = new double[p][];
        using Barrier barrier = new(p);
        Thread[] threads = new Thread[p];
        for (int t = 0; t < p; t++)
        {
            int i = t / q, j = t % q;
            threads[t] = new Thread(() =>
            {
                int me = i * q + j;
                // Alignment: A_ij ← A_i,(i+j), B_ij ← B_(i+j),j.
                int s = (i + j) % q;
                blockA[me] = Copy(a, n, i, s, bs);
                blockB[me] = Copy(b, n, s, j, bs);
                nextA[me] = new double[bs * bs];
                nextB[me] = new double[bs * bs];
                blockC[me] = new double[bs * bs];
                barrier.SignalAndWait();
                for (int step = 0; step < q; step++)
                {
                    Kernel(blockA[me], 0, bs, blockB[me], 0, bs,
                        blockC[me], 0, bs, bs, bs, bs);
                    if (step == q - 1) break;
                    int right = i * q + (j + 1) % q;
                    int below = (i + 1) % q * q + j;
                    blockA[right].CopyTo(nextA[me], 0);   // "receive"
                    blockB[below].CopyTo(nextB[me], 0);
                    barrier.SignalAndWait();   // everyone has copied
                    (blockA[me], nextA[me]) = (nextA[me], blockA[me]);
                    (blockB[me], nextB[me]) = (nextB[me], blockB[me]);
                    barrier.SignalAndWait();   // everyone has swapped buffers
                }
                Paste(blockC[me], c, n, i, j, bs);
            });
            threads[t].Start();
        }
        foreach (Thread thread in threads) thread.Join();
    }

    // Block (bi, bj) of size bs × bs – into a separate array and back.
    static double[] Copy(double[] m, int n, int bi, int bj, int bs)
    {
        double[] block = new double[bs * bs];
        for (int r = 0; r < bs; r++)
            m.AsSpan((bi * bs + r) * n + bj * bs, bs)
                .CopyTo(block.AsSpan(r * bs, bs));
        return block;
    }

    static void Paste(double[] block, double[] m, int n, int bi,
        int bj, int bs)
    {
        for (int r = 0; r < bs; r++)
            block.AsSpan(r * bs, bs)
                .CopyTo(m.AsSpan((bi * bs + r) * n + bj * bs, bs));
    }
}

// Prediction of Cannon's overhead from two measurements:
// copying a block and a barrier phase for p threads.
static class Model
{
    public static double CannonOverhead(int n, int q)
    {
        if (q == 1) return 0;
        int bs = n / q, p = q * q;
        double[] from = new double[bs * bs], to = new double[bs * bs];
        double copy = Time(() => from.CopyTo(to, 0), 50);
        double phase = BarrierPhase(p);
        // alignment (2 blocks) + (q − 1) shifts of 2 blocks each
        // + 2 barriers per shift; creating p threads is not counted.
        return 2 * copy + (q - 1) * (2 * copy + 2 * phase);
    }

    static double BarrierPhase(int p)
    {
        const int Phases = 2000;
        using Barrier barrier = new(p);
        Thread[] threads = new Thread[p];
        long start = Stopwatch.GetTimestamp();
        for (int t = 0; t < p; t++)
        {
            threads[t] = new Thread(() =>
            {
                for (int k = 0; k < Phases; k++)
                    barrier.SignalAndWait();
            });
            threads[t].Start();
        }
        foreach (Thread thread in threads) thread.Join();
        return Stopwatch.GetElapsedTime(start).TotalMilliseconds
            / Phases;
    }

    static double Time(Action action, int repeats)
    {
        action();
        long start = Stopwatch.GetTimestamp();
        for (int k = 0; k < repeats; k++) action();
        return Stopwatch.GetElapsedTime(start).TotalMilliseconds
            / repeats;
    }
}
```

The `Kernel` method multiplies any rectangular parts of matrices given by an offset and a row length, so all three schemes use it. Cannon’s algorithm starts $p$ separate `Thread` threads: with `Parallel.For`, a barrier for $p$ participants could hang (see the lecture section “The BSP model”). A “message” is modeled by copying the neighbor’s block into the thread’s own `nextA`/`nextB` buffer, after which a barrier guarantees that everyone has copied, and a second barrier that everyone has swapped buffers before anyone starts the next multiplication. Output:

```
n = 1152, physical cores 8
Scheme          p  Time, ms     S  Predicted S     E  max|ΔC|
stripes        1    206,3   1,0        1,0  1,00  0
stripes        4     65,0   3,2        4,0  0,79  0
stripes        9     41,6   5,0        8,0  0,55  0
stripes       16     37,6   5,5        8,0  0,34  0
checkerboard   1    208,6   1,0        1,0  0,99  0
checkerboard   4     73,0   2,8        4,0  0,71  0
checkerboard   9     54,4   3,8        8,0  0,42  0
checkerboard  16     52,0   4,0        8,0  0,25  0
Cannon         1    226,2   0,9        1,0  0,91  0
Cannon         4     73,1   2,8        4,0  0,71  1,9E-12
Cannon         9     50,3   4,1        7,9  0,46  1,9E-12
Cannon        16     42,9   4,8        7,8  0,30  2,1E-12
```

The best speedup (5.5 on 16 threads) was achieved by the stripes, although the prediction is the same for all schemes –

1. Reasons for the discrepancy that the model does not account for:

- one core runs at a higher frequency than eight loaded simultaneously, so $T_{1}$ is relatively small;
- with stripes, all threads read the same matrix $B$ (10 MB), which resides in the shared L3 cache, whereas in the checkerboard scheme and in Cannon’s algorithm each thread works with different blocks, and the total amount of the threads’ data is larger than the cache;
- 9 equal tasks on 8 cores: one core executes two tasks (a mapping imbalance), so the efficiency at $p = 9$ drops to 0.42–0.55;
- the rows of the blocks (288 numbers) are shorter than the rows of the stripes (1152), so the `MultiplyAdd` calls are relatively more expensive.

According to the measurements, Cannon’s overhead for copying and barriers is only a few percent (a prediction of 7.8 instead of 8.0), so in shared memory its advantage is only data locality. Only Cannon’s algorithm gives a difference from the reference of about $2 \cdot 10^{- 12}$: it adds the block products in a different order ($k = (i + j + t) \bmod q$), whereas the stripes and the checkerboard scheme add them in increasing order of $k$.

## Example 2. The conjugate gradient method for the Poisson equation

Create a program that solves the system of linear equations with the pentadiagonal matrix of the discrete Poisson equation on a $500 \times 500$ grid (250 thousand unknowns) by the conjugate gradient method to a relative residual of $10^{- 8}$ on 1, 2, 4, 8, and 16 threads. The matrix is not stored: the matrix–vector multiplication computes each node from its four neighbors. Obtain the right-hand side from a known solution, and print the number of iterations, the time, the speedup, the error, and a checksum of the solution to verify that the result does not depend on the number of threads.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// The Poisson equation on an N × N grid: the pentadiagonal matrix
// A (4 on the diagonal, −1 for the neighbors) is not stored.
int size = args.Length > 0 ? int.Parse(args[0]) : 500;
const double Tolerance = 1e-8;
int n = size * size;
double[] exact = new double[n], b = new double[n];
Random random = new(4);                  // exact solution x*
for (int k = 0; k < n; k++) exact[k] = random.NextDouble();
new Solver(size, 16).Apply(exact, b);    // b = A·x*

Console.WriteLine($"Grid {size}×{size}, unknowns {n:N0}, " +
    $"tolerance {Tolerance:E0}");
Console.WriteLine(" p Iterations Time, ms     S  max|x - x*|" +
    "  Checksum (x, x*)");
double t1 = 0;
foreach (int p in new[] { 1, 2, 4, 8, 16 })
{
    Solver solver = new(size, p);
    double[] x = [];
    int iterations = 0;
    double t = Median(() =>
        (x, iterations) = solver.Solve(b, Tolerance));
    if (t1 == 0) t1 = t;
    double error = 0;
    for (int k = 0; k < n; k++)
        error = Math.Max(error, Math.Abs(x[k] - exact[k]));
    Console.WriteLine($"{p,2}{iterations,10}{t,9:F1}{t1 / t,6:F1}" +
        $"{error,13:E2}  {solver.Dot(x, exact):R}");
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

class Solver(int size, int p)
{
    const int Chunks = 64;               // fixed partitioning
    readonly int n = size * size;
    readonly ParallelOptions options =
        new() { MaxDegreeOfParallelism = p };
    readonly double[] partial = new double[Chunks];

    (int, int) Range(int k) =>
        ((int)((long)k * n / Chunks),
         (int)((long)(k + 1) * n / Chunks));

    // q = A·d: node (i, j) depends only on its four neighbors;
    // part k is a stripe of grid rows.
    public void Apply(double[] d, double[] q) =>
        Parallel.For(0, Chunks, options, k =>
        {
            int i0 = k * size / Chunks, i1 = (k + 1) * size / Chunks;
            for (int i = i0; i < i1; i++)
            for (int j = 0; j < size; j++)
            {
                int idx = i * size + j;
                double s = 4 * d[idx];
                if (i > 0) s -= d[idx - size];
                if (i < size - 1) s -= d[idx + size];
                if (j > 0) s -= d[idx - 1];
                if (j < size - 1) s -= d[idx + 1];
                q[idx] = s;
            }
        });

    // The partial sums of the 64 parts are added in the order of the part numbers,
    // so the result does not depend on the number of threads p.
    public double Dot(double[] u, double[] v)
    {
        Parallel.For(0, Chunks, options, k =>
        {
            var (lo, hi) = Range(k);
            double s = 0;
            for (int i = lo; i < hi; i++) s += u[i] * v[i];
            partial[k] = s;
        });
        double sum = 0;
        for (int k = 0; k < Chunks; k++) sum += partial[k];
        return sum;
    }

    public (double[] X, int Iterations) Solve(double[] b,
        double tolerance)
    {
        double[] x = new double[n], r = (double[])b.Clone();
        double[] d = (double[])b.Clone(), q = new double[n];
        double rr = Dot(r, r), limit = tolerance * Math.Sqrt(rr);
        for (int iter = 1; iter <= 10 * n; iter++)
        {
            Apply(d, q);
            double alpha = rr / Dot(d, q);
            Parallel.For(0, Chunks, options, k =>
            {
                var (lo, hi) = Range(k);
                for (int i = lo; i < hi; i++)
                {
                    x[i] += alpha * d[i];
                    r[i] -= alpha * q[i];
                }
            });
            double rrNew = Dot(r, r);
            if (Math.Sqrt(rrNew) < limit) return (x, iter);
            double beta = rrNew / rr;
            rr = rrNew;
            Parallel.For(0, Chunks, options, k =>
            {
                var (lo, hi) = Range(k);
                for (int i = lo; i < hi; i++)
                    d[i] = r[i] + beta * d[i];
            });
        }
        return (x, -1);
    }
}
```

The `Solver` class performs all operations of an iteration over 64 fixed parts: the matrix–vector multiplication (stripes of grid rows), two `axpy` operations in one loop, `d = r + βd`, and the dot products. The number of threads is set only by `MaxDegreeOfParallelism`, so the data distribution and the order in which the partial sums are added are the same for all $p$. Output:

```
Grid 500×500, unknowns 250 000, tolerance 1E-008
 p Iterations Time, ms     S  max|x - x*|  Checksum (x, x*)
 1       986   1637,1   1,0    6,78E-006  83396,574488367
 2       986   1244,9   1,3    6,78E-006  83396,574488367
 4       986    732,6   2,2    6,78E-006  83396,574488367
 8       986    405,2   4,0    6,78E-006  83396,574488367
16       986    366,4   4,5    6,78E-006  83396,574488367
```

The number of iterations, the error, and the checksum are identical to the last digit for all $p$ – which is exactly what the deterministic reduction achieves. The speedup is modest (4.5): one iteration takes about 1.7 ms on one thread, and five parallel loops per iteration add up to about 5,000 synchronizations per solution; moreover, the `axpy` operations and the dot products are limited by memory bandwidth. On a cluster, each dot product would become an `MPI_Allreduce`, and it is their number that limits the scalability of the method.

## Example 3. A parametric pendulum computation with dynamic load balancing

Create a program that, for $64 \times 48$ pairs (damping coefficient $\gamma$, initial angular velocity $\omega_{0}$), solves the equation of a damped pendulum $\theta'' = - \sin \theta - \gamma \theta'$ by the fourth-order Runge–Kutta method until the energy becomes smaller than $10^{- 6}$, and counts the full revolutions. Compare sequential execution, block and cyclic static distributions, dynamic distribution with a shared counter, and `Parallel.For`; for the distributions, print the smallest and largest thread working time.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// A damped pendulum: θ'' = −sin θ − γθ'. For each pair (γ, ω0),
// integrate with the fourth-order Runge–Kutta method until the pendulum
// settles down, and count the full revolutions.
const int Gammas = 64, Speeds = 48;
double[] gamma = new double[Gammas], speed = new double[Speeds];
for (int g = 0; g < Gammas; g++) gamma[g] = 0.02 + g * 0.015;
for (int s = 0; s < Speeds; s++) speed[s] = 0.125 * (s + 1);
int tasks = Gammas * Speeds;             // task k: g = k / Speeds
int p = Environment.ProcessorCount;
Console.WriteLine($"Tasks: {tasks}, γ = {gamma[0]} … " +
    $"{gamma[^1]:F3}, ω0 = {speed[0]} … {speed[^1]}, p = {p}");

var results = new (int Turns, double Time)[tasks];
void Solve(int k) => results[k] =
    Pendulum.Settle(gamma[k / Speeds], speed[k % Speeds]);

Console.WriteLine("Task distribution        Time, ms     S" +
    "  Threads, ms (min … max)");
double t0 = 0;
foreach (string mode in new[]
    { "sequential", "block", "cyclic", "dynamic",
      "Parallel.For" })
{
    double[] busy = new double[p];
    double t = Median(() => Run(mode, busy));
    if (t0 == 0) t0 = t;
    string spread = mode is "sequential" or "Parallel.For" ? ""
        : $"{busy.Min(),10:F0} … {busy.Max():F0}";
    Console.WriteLine($"{mode,-24}{t,9:F0}{t0 / t,6:F1}{spread}");
}

Console.WriteLine("Revolutions before stopping (rows – γ, columns – ω0):");
Console.Write("  γ \\ ω0");
int[] shown = [15, 23, 31, 39, 47];
foreach (int s in shown) Console.Write($"{speed[s],6}");
Console.WriteLine();
foreach (int g in new[] { 0, 2, 6, 20, 63 })
{
    Console.Write($"{gamma[g],8:F3}");
    foreach (int s in shown)
        Console.Write($"{results[g * Speeds + s].Turns,6}");
    Console.WriteLine();
}

// busy[t] – the working time of thread t in the parallel modes.
void Run(string mode, double[] busy)
{
    if (mode == "sequential")
    {
        for (int k = 0; k < tasks; k++) Solve(k);
        return;
    }
    if (mode == "Parallel.For")
    {
        Parallel.For(0, tasks, Solve);
        return;
    }
    int next = 0;                        // counter for the dynamic mode
    Parallel.For(0, p, new ParallelOptions
        { MaxDegreeOfParallelism = p }, t =>
    {
        long start = Stopwatch.GetTimestamp();
        if (mode == "block")             // tasks in advance, consecutive
        {
            for (int k = t * tasks / p; k < (t + 1) * tasks / p; k++)
                Solve(k);
        }
        else if (mode == "cyclic")       // t, t + p, t + 2p, …
        {
            for (int k = t; k < tasks; k += p) Solve(k);
        }
        else                             // the next free task
        {
            int k;
            while ((k = Interlocked.Increment(ref next) - 1) < tasks)
                Solve(k);
        }
        busy[t] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    });
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

static class Pendulum
{
    const double H = 0.01;               // integration step

    // Integrates until the energy ω²/2 + 1 − cos θ becomes < 1e-6.
    public static (int Turns, double Time) Settle(double gamma,
        double omega0)
    {
        double theta = 0, omega = omega0, t = 0;
        while (omega * omega / 2 + 1 - Math.Cos(theta) > 1e-6
            && t < 5000)
        {
            (theta, omega) = Step(theta, omega, gamma);
            t += H;
        }
        return ((int)(Math.Abs(theta) / (2 * Math.PI) + 0.5), t);
    }

    // One fourth-order Runge–Kutta step for the system
    // θ' = ω, ω' = −sin θ − γω.
    static (double, double) Step(double theta, double omega,
        double gamma)
    {
        double k1t = omega, k1w = -Math.Sin(theta) - gamma * omega;
        double t2 = theta + H / 2 * k1t, w2 = omega + H / 2 * k1w;
        double k2t = w2, k2w = -Math.Sin(t2) - gamma * w2;
        double t3 = theta + H / 2 * k2t, w3 = omega + H / 2 * k2w;
        double k3t = w3, k3w = -Math.Sin(t3) - gamma * w3;
        double t4 = theta + H * k3t, w4 = omega + H * k3w;
        double k4t = w4, k4w = -Math.Sin(t4) - gamma * w4;
        return (theta + H / 6 * (k1t + 2 * k2t + 2 * k3t + k4t),
                omega + H / 6 * (k1w + 2 * k2w + 2 * k3w + k4w));
    }
}
```

Task $k$ corresponds to the pair $\gamma =$ `gamma[k / Speeds]`, $\omega_{0} =$ `speed[k % Speeds]`, so the first tasks have the lowest damping and take the longest: a pendulum with $\gamma = 0 {,} 02$ settles down in hundreds of seconds of model time, and one with $\gamma \approx 1$ in a few seconds. The block distribution gives all the heavy tasks to the first threads; the cyclic one mixes them; the dynamic distribution takes the next task with `Interlocked.Increment`, so all threads finish almost simultaneously. Output:

```
Tasks: 3072, γ = 0,02 … 0,965, ω0 = 0,125 … 6, p = 16
Task distribution        Time, ms     S  Threads, ms (min … max)
sequential                    697   1,0
block                         307   2,3        12 … 295
cyclic                         63  11,0        48 … 73
dynamic                        58  11,9        59 … 59
Parallel.For                   84   8,3
Revolutions before stopping (rows – γ, columns – ω0):
  γ \ ω0     2     3     4     5     6
   0,020     0    10    19    27    35
   0,050     0     4     8    11    14
   0,110     0     2     3     5     6
   0,320     0     1     1     2     2
   0,965     0     0     0     1     1
```

The block distribution gives only 2.3: the most heavily loaded thread works for 295 ms, and the least loaded one for 12 ms. The cyclic distribution balances the load (48–73 ms) and speeds up the computation 11 times, and the dynamic counter 11.9 times, with all threads working the same 59 ms. By default, `Parallel.For` hands out ranges of iterations that gradually grow, and here it falls slightly behind the counter. The revolutions table confirms the physics: the lower the damping and the higher the initial velocity, the more revolutions the pendulum makes before it starts to oscillate.
