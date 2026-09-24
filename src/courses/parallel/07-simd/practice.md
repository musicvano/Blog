---
title: "Practice"
description: "Topic 7. SIMD vectorization: worked examples"
outline: [2, 3]
sourceHash: "d9478671a4993fe5ef803898137ad4ef30c0460396c2f11e5cc3d5805df52c8b"
---

# Practice

## Example 1. Searching for a byte in a buffer

Create a program that finds the positions of all newline characters in a 64 MB text buffer: with a scalar loop and with vectors in 16-byte blocks (`Vector128.Equals`, `ExtractMostSignificantBits`, `BitOperations.TrailingZeroCount`). Compare the time and the result with the library method `MemoryExtensions.Count`.

```cs
using System.Diagnostics;
using System.Numerics;
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

byte[] text = CreateLog(sizeMb: 64, seed: 3);
Console.WriteLine($"Buffer: {text.Length / 1_048_576} MB");

List<int> positions = [];
double t0 = Median(() => positions = FindScalar(text, (byte)'\n'));
List<int> found = [];
double t1 = Median(() => found = FindVector128(text, (byte)'\n'));
int count = 0;
double t2 = Median(() => count = text.AsSpan().Count((byte)'\n'));

Console.WriteLine($"Lines: {positions.Count:N0}; first newlines: " +
    string.Join(", ", positions.Take(4)));
Console.WriteLine("Method                      Time, ms     S  Match");
Print("scalar loop", t0, true);
Print("Vector128 + mask", t1, found.SequenceEqual(positions));
Print("MemoryExtensions.Count", t2, count == positions.Count);

void Print(string name, double t, bool same) =>
    Console.WriteLine($"{name,-26} {t,9:F1} {t0 / t,5:F1}  " +
        (same ? "yes" : "NO"));

static List<int> FindScalar(byte[] data, byte value)
{
    List<int> result = [];
    for (int i = 0; i < data.Length; i++)
    {
        if (data[i] == value) result.Add(i);
    }
    return result;
}

static List<int> FindVector128(byte[] data, byte value)
{
    List<int> result = [];
    if (!Vector128.IsHardwareAccelerated)
        return FindScalar(data, value);
    ref byte start = ref MemoryMarshal.GetArrayDataReference(data);
    Vector128<byte> target = Vector128.Create(value);
    int i = 0;
    for (; i <= data.Length - Vector128<byte>.Count; i += 16)
    {
        Vector128<byte> block =
            Vector128.LoadUnsafe(ref start, (nuint)i);
        // 16 comparisons in one instruction: 0xFF for matches.
        Vector128<byte> eq = Vector128.Equals(block, target);
        uint mask = eq.ExtractMostSignificantBits();  // 16 bits
        while (mask != 0)
        {
            int offset = BitOperations.TrailingZeroCount(mask);
            result.Add(i + offset);
            mask &= mask - 1;             // clear the lowest set bit
        }
    }
    for (; i < data.Length; i++)          // tail < 16 bytes
    {
        if (data[i] == value) result.Add(i);
    }
    return result;
}

// A text log: lines of 20–100 characters.
static byte[] CreateLog(int sizeMb, int seed)
{
    byte[] data = new byte[sizeMb * 1_048_576];
    Random random = new(seed);
    int pos = 0;
    while (pos < data.Length)
    {
        int length = random.Next(20, 101);
        for (int k = 0; k < length && pos < data.Length; k++)
            data[pos++] = (byte)random.Next('a', 'z' + 1);
        if (pos < data.Length) data[pos++] = (byte)'\n';
    }
    return data;
}

static double Median(Action action, int runs = 7)
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

`ExtractMostSignificantBits` converts the mask of 16 comparisons into a number; the `while` loop iterates over its set bits: `TrailingZeroCount` gives the offset of a match, and `mask &= mask - 1` clears the lowest set bit. The vector search is three times faster than the scalar one, but most of the time goes into adding positions to the list (on average, one match per 61 bytes). The `MemoryExtensions.Count` method only counts matches without recording positions, so it is almost 4 times faster still: for typical tasks, look for a ready-made vectorized method first. Output:

```
Buffer: 64 MB
Lines: 1 100 571; first newlines: 43, 103, 142, 174
Method                      Time, ms     S  Match
scalar loop                     32,8   1,0  yes
Vector128 + mask                11,8   2,8  yes
MemoryExtensions.Count           3,0  11,0  yes
```

## Example 2. The Jacobi method for a linear system

Create a program that solves a $2000 \times 2000$ diagonally dominant system of linear equations with a known exact solution by the Jacobi method to a tolerance of $10^{- 10}$ in three ways: scalar, with a vectorized row dot product (`TensorPrimitives.Dot`), and with vectorization plus `Parallel.For` over rows. Print the number of iterations, the time, the speedup, and the error.

```cs
using System.Diagnostics;
using System.Numerics.Tensors;

Console.OutputEncoding = System.Text.Encoding.UTF8;

int n = args.Length > 0 ? int.Parse(args[0]) : 2000;
const double Tolerance = 1e-10;
var (a, b, exact) = CreateSystem(n, seed: 5);
Console.WriteLine($"System {n}×{n}, tolerance {Tolerance:E0}");
Console.WriteLine("Method              Iterations Time, ms     S" +
    "   max|x - x*|");

double t0 = 0;
foreach (var (name, simd, parallel) in new[]
{
    ("scalar", false, false),
    ("SIMD", true, false),
    ("SIMD + Parallel.For", true, true),
})
{
    double[] x = [];
    int iterations = 0;
    double t = Median(() =>
        (x, iterations) = Solve(a, b, n, Tolerance, simd, parallel));
    if (t0 == 0) t0 = t;
    double error = 0;
    for (int i = 0; i < n; i++)
        error = Math.Max(error, Math.Abs(x[i] - exact[i]));
    Console.WriteLine($"{name,-20} {iterations,9} {t,8:F1} " +
        $"{t0 / t,5:F1}   {error:E2}");
}

// Jacobi method: x'[i] = (b[i] - Σ(j≠i) a[i,j]·x[j]) / a[i,i].
static (double[] X, int Iterations) Solve(double[] a, double[] b,
    int n, double tolerance, bool simd, bool parallel)
{
    double[] x = new double[n], next = new double[n];
    for (int iter = 1; iter <= 10_000; iter++)
    {
        if (parallel)
            Parallel.For(0, n,
                i => UpdateRow(a, b, x, next, n, i, simd));
        else
            for (int i = 0; i < n; i++)
                UpdateRow(a, b, x, next, n, i, simd);

        double delta = 0;
        for (int i = 0; i < n; i++)
            delta = Math.Max(delta, Math.Abs(next[i] - x[i]));
        (x, next) = (next, x);            // x is the new approximation
        if (delta < tolerance) return (x, iter);
    }
    return (x, -1);
}

// Row i reads only the old x and writes only next[i]: rows are independent.
static void UpdateRow(double[] a, double[] b, double[] x,
    double[] next, int n, int i, bool simd)
{
    ReadOnlySpan<double> row = a.AsSpan(i * n, n);
    double dot = simd
        ? TensorPrimitives.Dot(row, x)    // SIMD
        : DotScalar(row, x);
    double diagonal = row[i];
    next[i] = (b[i] - (dot - diagonal * x[i])) / diagonal;
}

static double DotScalar(ReadOnlySpan<double> u,
    ReadOnlySpan<double> v)
{
    double sum = 0;
    for (int j = 0; j < u.Length; j++) sum += u[j] * v[j];
    return sum;
}

// A diagonally dominant matrix: |a[i,i]| > Σ|a[i,j]|,
// so the Jacobi method converges. Exact solution x*[i] = 1 + i % 10.
static (double[], double[], double[]) CreateSystem(int n, int seed)
{
    Random random = new(seed);
    double[] a = new double[n * n], b = new double[n];
    double[] exact = new double[n];
    for (int i = 0; i < n; i++)
    {
        exact[i] = 1 + i % 10;
        double rowSum = 0;
        for (int j = 0; j < n; j++)
        {
            a[i * n + j] = random.NextDouble();
            rowSum += Math.Abs(a[i * n + j]);
        }
        a[i * n + i] = 1.1 * rowSum;
    }
    for (int i = 0; i < n; i++)
        b[i] = DotScalar(a.AsSpan(i * n, n), exact);
    return (a, b, exact);
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

Each equation of an iteration reads only the old approximation `x` and writes only its own element `next[i]`, so rows are processed in parallel without synchronization, and after the iteration the arrays are swapped without copying. The sum $\sum_{j \ne i} a_{i j} x_{j}$ is computed as the full dot product of the row minus the diagonal term. All approaches perform the same number of iterations and produce the same error, so vectorization did not change the computation. The vector dot product made the solution three times faster (not 4–8 times: the 32 MB matrix is read from memory), and 16 threads made it another 1.9 times faster: memory bandwidth becomes the limit again. Output:

```
System 2000×2000, tolerance 1E-010
Method              Iterations Time, ms     S   max|x - x*|
scalar                     266    902,0   1,0   4,70E-011
SIMD                       266    271,2   3,3   4,70E-011
SIMD + Parallel.For        266    144,0   6,3   4,70E-011
```

## Example 3. Normalizing 3D vectors

Create a program that normalizes a million three-dimensional vectors (divides each by its length) in two ways: with the `Vector3.Normalize` method for an array of `Vector3` structures, and with `Vector256<float>` vectors over separate coordinate arrays. Check the maximum difference between the results and compare the times.

```cs
using System.Diagnostics;
using System.Numerics;
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int N = 1_000_000;
Random random = new(11);
// AoS (array of structures): x, y, z of each point are adjacent.
Vector3[] points = new Vector3[N];
// SoA (structure of arrays): a separate array for each coordinate.
float[] xs = new float[N], ys = new float[N], zs = new float[N];
for (int i = 0; i < N; i++)
{
    points[i] = new Vector3(Next(), Next(), Next());
    (xs[i], ys[i], zs[i]) = (points[i].X, points[i].Y, points[i].Z);
}
float Next() => random.NextSingle() * 200 - 100;

Vector3[] expected = new Vector3[N];
float[] rx = new float[N], ry = new float[N], rz = new float[N];

Console.WriteLine($"Normalizing {N:N0} vectors");
Console.WriteLine("Method                   Time, ms     S   max|Δ|");
double t0 = Median(() => NormalizeVector3(points, expected));
Print("Vector3.Normalize (AoS)", t0, 0);
double t2 = Median(() => NormalizeSoA256(xs, ys, zs, rx, ry, rz));
Vector3[] soa = new Vector3[N];
for (int i = 0; i < N; i++) soa[i] = new Vector3(rx[i], ry[i], rz[i]);
Print("Vector256 (SoA)", t2, MaxDiff(expected, soa));

void Print(string name, double t, double diff) =>
    Console.WriteLine(
        $"{name,-24} {t,8:F1} {t0 / t,5:F1}   {diff:G3}");

static void NormalizeVector3(Vector3[] src, Vector3[] dst)
{
    for (int i = 0; i < src.Length; i++)
        dst[i] = Vector3.Normalize(src[i]);
}

// Eight vectors per step: the x, y, z coordinates are in three registers.
static void NormalizeSoA256(float[] x, float[] y, float[] z,
    float[] rx, float[] ry, float[] rz)
{
    ref float px = ref MemoryMarshal.GetArrayDataReference(x);
    ref float py = ref MemoryMarshal.GetArrayDataReference(y);
    ref float pz = ref MemoryMarshal.GetArrayDataReference(z);
    ref float qx = ref MemoryMarshal.GetArrayDataReference(rx);
    ref float qy = ref MemoryMarshal.GetArrayDataReference(ry);
    ref float qz = ref MemoryMarshal.GetArrayDataReference(rz);
    int i = 0;
    for (; i <= x.Length - 8; i += 8)
    {
        nuint k = (nuint)i;
        Vector256<float> vx = Vector256.LoadUnsafe(ref px, k);
        Vector256<float> vy = Vector256.LoadUnsafe(ref py, k);
        Vector256<float> vz = Vector256.LoadUnsafe(ref pz, k);
        Vector256<float> length =
            Vector256.Sqrt(vx * vx + vy * vy + vz * vz);
        (vx / length).StoreUnsafe(ref qx, k);
        (vy / length).StoreUnsafe(ref qy, k);
        (vz / length).StoreUnsafe(ref qz, k);
    }
    for (; i < x.Length; i++)             // tail
    {
        float length = MathF.Sqrt(
            x[i] * x[i] + y[i] * y[i] + z[i] * z[i]);
        (rx[i], ry[i], rz[i]) =
            (x[i] / length, y[i] / length, z[i] / length);
    }
}

static double MaxDiff(Vector3[] u, Vector3[] v)
{
    float max = 0;
    for (int i = 0; i < u.Length; i++)
    {
        Vector3 d = Vector3.Abs(u[i] - v[i]);
        max = MathF.Max(max, MathF.Max(d.X, MathF.Max(d.Y, d.Z)));
    }
    return max;
}

static double Median(Action action, int runs = 7)
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

A `Vector3[]` array is an **array of structures** (*array of structures, AoS*): the coordinates of one point are adjacent. `Vector3.Normalize` speeds up the computation for a single point (three coordinates in one XMM register), but the loop still processes the points one at a time. In a **structure of arrays** (*structure of arrays, SoA*), each coordinate is a separate array, so `Vector256` processes eight points per step: this is 2.2 times faster than `Vector3.Normalize`. For arrays with millions of points, SoA is the typical way to vectorize. The results of both approaches match exactly. Output:

```
Normalizing 1 000 000 vectors
Method                   Time, ms     S   max|Δ|
Vector3.Normalize (AoS)       1,7   1,0   0
Vector256 (SoA)               0,7   2,2   0
```
