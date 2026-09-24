---
title: "Examples and common mistakes"
description: "Topic 7. SIMD vectorization: Examples and common mistakes"
outline: [2, 3]
sourceHash: "d2d8f49a860a5a7464e8426141191fe2b10541ae0b111da9d881fd95a0538058"
---

# Examples and common mistakes

## Program examples

The examples were run in the *Release* configuration on .NET 10 on an Intel Core i9-11900KF processor (8 cores, 16 logical processors, AVX-512); timings differ on another computer and between runs. The “Array element sum” example uses the `System.Numerics.Tensors` package.

### CPU capabilities

The program prints which vectors are hardware-accelerated and which instruction sets the processor supports. The `IsSupported` properties of the Arm classes return `false` on an x86-64 processor.

```cs
using System.Numerics;
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics;
using System.Runtime.Intrinsics.Arm;
using System.Runtime.Intrinsics.X86;

Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine($"{RuntimeInformation.OSArchitecture}, " +
    $"{RuntimeInformation.FrameworkDescription}, logical " +
    $"processors: {Environment.ProcessorCount}");

Console.WriteLine("Hardware-independent vectors:");
Show("Vector.IsHardwareAccelerated", Vector.IsHardwareAccelerated);
Show("Vector<float>.Count", Vector<float>.Count);
Show("Vector<double>.Count", Vector<double>.Count);
Show("Vector128.IsHardwareAccelerated",
    Vector128.IsHardwareAccelerated);
Show("Vector256.IsHardwareAccelerated",
    Vector256.IsHardwareAccelerated);
Show("Vector512.IsHardwareAccelerated",
    Vector512.IsHardwareAccelerated);

Console.WriteLine("x86/x64 instruction sets:");
Show("Avx2", Avx2.IsSupported);
Show("Fma", Fma.IsSupported);
Show("Avx512F", Avx512F.IsSupported);
Show("Avx10v1", Avx10v1.IsSupported);
Show("Avx10v2", Avx10v2.IsSupported);
Console.WriteLine("Arm64 instruction sets:");
Show("AdvSimd (NEON)", AdvSimd.IsSupported);

static void Show(string name, object value)
{
    string text = value is bool b ? (b ? "yes" : "no") : $"{value}";
    Console.WriteLine($"  {name,-32} {text}");
}
```

The `Show` method accepts `object`, so it prints both Boolean values and element counts. The Rocket Lake processor supports AVX-512 but not AVX10, and `Vector<T>` is 256 bits by default. Output:

```
X64, .NET 10.0.12, logical processors: 16
Hardware-independent vectors:
  Vector.IsHardwareAccelerated     yes
  Vector<float>.Count              8
  Vector<double>.Count             4
  Vector128.IsHardwareAccelerated  yes
  Vector256.IsHardwareAccelerated  yes
  Vector512.IsHardwareAccelerated  yes
x86/x64 instruction sets:
  Avx2                             yes
  Fma                              yes
  Avx512F                          yes
  Avx10v1                          no
  Avx10v2                          no
Arm64 instruction sets:
  AdvSimd (NEON)                   no
```

If you set `DOTNET_EnableAVX512=0` before starting the program, the `Vector512` and `Avx512…` lines show “no” – this is how fallback paths are tested.

### Array element sum

The program computes the sum of a million `float` numbers in four ways: a scalar loop, `Vector<T>`, `Vector256<T>`, and `TensorPrimitives`. For each approach, it prints the median time of one call in microseconds, the speedup, and the result, as well as the exact value computed in `double`.

```cs
using System.Diagnostics;
using System.Numerics;
using System.Numerics.Tensors;
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int N = 1_000_000;
float[] a = new float[N];
Random random = new(42);
for (int i = 0; i < N; i++) a[i] = random.NextSingle();

(string Name, Func<float[], float> Sum)[] methods =
[
    ("scalar", SumScalar),
    ("Vector<T>", SumVectorT),
    ("Vector256", SumVector256),
    ("TensorPrimitives", x => TensorPrimitives.Sum(x)),
];

Console.WriteLine($"n = {N:N0}, Vector<float>.Count = " +
    $"{Vector<float>.Count}");
Console.WriteLine("Method           Time, µs     S          Sum");
double t0 = 0;
foreach (var (name, sum) in methods)
{
    float s = 0;
    double t = Median(() => s = sum(a));
    if (t0 == 0) t0 = t;
    Console.WriteLine(
        $"{name,-16} {t,10:F1} {t0 / t,5:F1} {s,12:F1}");
}
double exact = 0;                       // reference in double
foreach (float x in a) exact += x;
Console.WriteLine($"{"double (reference)",-33} {exact,12:F1}");

static float SumScalar(float[] x)
{
    float sum = 0;
    for (int i = 0; i < x.Length; i++) sum += x[i];
    return sum;
}

static float SumVectorT(float[] x)
{
    Vector<float> acc = Vector<float>.Zero;
    int i = 0;
    int count = Vector<float>.Count;
    for (; i <= x.Length - count; i += count)
    {
        acc += new Vector<float>(x.AsSpan(i));
    }
    float sum = Vector.Sum(acc);
    for (; i < x.Length; i++) sum += x[i];     // tail
    return sum;
}

static float SumVector256(float[] x)
{
    if (!Vector256.IsHardwareAccelerated) return SumScalar(x);
    ref float p = ref MemoryMarshal.GetArrayDataReference(x);
    Vector256<float> acc = Vector256<float>.Zero;
    nuint i = 0, n = (nuint)x.Length;
    nuint count = (nuint)Vector256<float>.Count;     // 8
    for (; i + count <= n; i += count)
    {
        acc += Vector256.LoadUnsafe(ref p, i);
    }
    float sum = Vector256.Sum(acc);
    for (; i < n; i++) sum += x[i];            // tail
    return sum;
}

// Warmup: 100 calls and a pause so that the JIT recompiles
// the method with optimizations (Tier 1); then the median of 21 runs, µs.
static double Median(Action action, int runs = 21)
{
    for (int i = 0; i < 100; i++) action();
    Thread.Sleep(200);
    double[] times = new double[runs];
    for (int i = 0; i < runs; i++)
    {
        long start = Stopwatch.GetTimestamp();
        action();
        times[i] = Stopwatch.GetElapsedTime(start).TotalMicroseconds;
    }
    Array.Sort(times);
    return times[runs / 2];
}
```

The `SumVectorT` and `SumVector256` methods show two styles: creating a vector from a span and loading by reference. Both handle the tail with scalar code. The warmup consists of 100 calls and a pause, because the JIT first compiles loops in a method without optimizations.

The vector approaches make the sum 6–10 times faster, roughly by the number of elements in a YMM register; the time fluctuates by 10–20% between runs. The different sums in the last column are a consequence of `float` rounding (see “float and double errors”). Output:

```
n = 1 000 000, Vector<float>.Count = 8
Method           Time, µs     S          Sum
scalar                965,0   1,0     499848,3
Vector<T>             150,1   6,4     499854,9
Vector256             123,5   7,8     499854,9
TensorPrimitives       97,7   9,9     499855,1
double (reference)                    499854,3
```

### Image thresholding

The program creates an 8000×6000-pixel grayscale image and applies a threshold: pixels brighter than 128 stay unchanged, and the rest are darkened fourfold. At the same time, it counts the bright pixels. The scalar version uses `if`; the vector version uses a `GreaterThan` mask, `ConditionalSelect`, and `ExtractMostSignificantBits` for `Vector256<byte>` (32 bytes).

```cs
using System.Diagnostics;
using System.Numerics;
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Width = 8000, Height = 6000;
const byte Limit = 128;
byte[] src = CreateImage(Width, Height, seed: 7);
byte[] expected = new byte[src.Length];
byte[] dst = new byte[src.Length];

long bright = 0;
double t0 = Median(() => bright = Scalar(src, expected, Limit));
Console.WriteLine($"Image {Width}×{Height}, threshold {Limit}, " +
    $"bright pixels: {bright:N0}");
Console.WriteLine("Method      Time, ms     S   Match");
Console.WriteLine($"scalar      {t0,9:F1} {1.0,5:F1}   yes");

if (Vector256.IsHardwareAccelerated)
{
    long n = 0;
    double t = Median(() => n = Simd256(src, dst, Limit));
    Report("Vector256", t, n);
}
void Report(string name, double t, long count)
{
    bool same = count == bright
        && dst.AsSpan().SequenceEqual(expected);
    Console.WriteLine($"{name,-11} {t,9:F1} {t0 / t,5:F1}   " +
        $"{(same ? "yes" : "NO")}");
}

// Pixels no brighter than the threshold are darkened fourfold.
static long Scalar(ReadOnlySpan<byte> src, Span<byte> dst, byte limit)
{
    long count = 0;
    for (int i = 0; i < src.Length; i++)
    {
        byte p = src[i];
        if (p > limit)
        {
            dst[i] = p;
            count++;
        }
        else
        {
            dst[i] = (byte)(p >> 2);
        }
    }
    return count;
}

static long Simd256(byte[] src, byte[] dst, byte limit)
{
    ref byte s = ref MemoryMarshal.GetArrayDataReference(src);
    ref byte d = ref MemoryMarshal.GetArrayDataReference(dst);
    Vector256<byte> limits = Vector256.Create(limit);
    nuint i = 0, n = (nuint)src.Length;
    nuint step = (nuint)Vector256<byte>.Count;       // 32
    long count = 0;
    for (; i + step <= n; i += step)
    {
        Vector256<byte> p = Vector256.LoadUnsafe(ref s, i);
        // Mask: 0xFF where p > limit (unsigned comparison).
        Vector256<byte> mask = Vector256.GreaterThan(p, limits);
        Vector256<byte> dark = Vector256.ShiftRightLogical(p, 2);
        Vector256.ConditionalSelect(mask, p, dark)
            .StoreUnsafe(ref d, i);
        uint bits = mask.ExtractMostSignificantBits();
        count += BitOperations.PopCount(bits);
    }
    // Tail (fewer than 32 pixels) – scalar.
    int tail = (int)i;
    return count + Scalar(src.AsSpan(tail), dst.AsSpan(tail), limit);
}

// A smooth pattern with noise; the seed makes the data reproducible.
static byte[] CreateImage(int width, int height, int seed)
{
    byte[] image = new byte[width * height];
    Random random = new(seed);
    for (int y = 0; y < height; y++)
    {
        for (int x = 0; x < width; x++)
        {
            double v = 128 + 90 * Math.Sin(x / 300.0)
                * Math.Cos(y / 200.0) + random.Next(-30, 31);
            image[y * width + x] = (byte)Math.Clamp(v, 0, 255);
        }
    }
    return image;
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

The `GreaterThan` comparison for `byte` is unsigned, so pixels 129–255 are correctly treated as bright; the match with the reference is checked byte by byte. The shift `ShiftRightLogical(p, 2)` divides the brightness by 4. The number of set bits in the mask, `PopCount`, equals the number of bright pixels in the block.

The speedup (15–18 times in different runs) turned out to be larger than expected, because the scalar version executes a conditional `if` branch for every pixel, and for noisy pixels near the threshold the processor often mispredicts the branch; the vector version has no branches. The `Vector512<byte>` version differs only in the type and the step of 64; on the i9-11900KF it is barely faster (3.6 vs. 3.7 ms): the program reads and writes 48 MB each at about 12 GB/s, and memory becomes the limit. Output:

```
Image 8000×6000, threshold 128, bright pixels: 23 569 245
Method      Time, ms     S   Match
scalar           63,8   1,0   yes
Vector256         3,6  17,5   yes
```

### Matrix multiplication

The program multiplies two $n \times n$ matrices of `double` (1024 by default) in five ways: ijk, ikj, blocked, blocked with `Vector256`, and blocked with `Vector256` and `Parallel.For` over rows of tiles. The matrix and tile sizes can be passed as arguments. For each approach, it prints the time (median of three runs; one run for ijk), GFLOPS, the speedup relative to ijk, and the largest element difference from the ijk result.

```cs
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

int n = args.Length > 0 ? int.Parse(args[0]) : 1024;
int block = args.Length > 1 ? int.Parse(args[1]) : 64;
double[] a = RandomMatrix(n, seed: 1);
double[] b = RandomMatrix(n, seed: 2);
double[] expected = new double[n * n];

(string Name, Action<double[]> Run)[] methods =
[
    ("ijk", c => Mul.Ijk(a, b, c, n)),
    ("ikj", c => Mul.Ikj(a, b, c, n)),
    ("blocked", c => Mul.Blocked(a, b, c, n, block, false, 1)),
    ("blocked + SIMD", c => Mul.Blocked(a, b, c, n, block, true, 1)),
    ("blocked + SIMD + threads",
        c => Mul.Blocked(a, b, c, n, block, true, -1)),
];

Console.WriteLine($"n = {n}, block {block}×{block}, " +
    $"threads {Environment.ProcessorCount}");
Console.WriteLine($"{"Method",-24}{"Time, ms",9}{"GFLOPS",8}" +
    $"{"S",7}  max|ΔC|");
double t0 = 0;
foreach (var (name, run) in methods)
{
    double[] c = t0 == 0 ? expected : new double[n * n];
    int runs = t0 == 0 ? 1 : 3;          // ijk is very slow
    double t = Median(() => { Array.Clear(c); run(c); }, runs);
    if (t0 == 0) t0 = t;
    double gflops = 2.0 * n * n * n / t / 1e9;
    double error = MaxDiff(c, expected);
    Console.WriteLine($"{name,-24}{t * 1000,9:F1}{gflops,8:F2}" +
        $"{t0 / t,7:F1}  {error:G3}");
}

static double[] RandomMatrix(int n, int seed)
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

// Median of runs in seconds; warmup only for the fast ones.
static double Median(Action action, int runs)
{
    if (runs > 1) action();
    double[] times = new double[runs];
    for (int i = 0; i < runs; i++)
    {
        long start = Stopwatch.GetTimestamp();
        action();
        times[i] = Stopwatch.GetElapsedTime(start).TotalSeconds;
    }
    Array.Sort(times);
    return times[runs / 2];
}

// Matrices are stored by rows: element (i, j) is m[i * n + j].
static class Mul
{
    public static void Ijk(double[] a, double[] b, double[] c, int n)
    {
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
            {
                double sum = 0;
                for (int k = 0; k < n; k++)
                    sum += a[i * n + k] * b[k * n + j]; // column of B
                c[i * n + j] = sum;
            }
    }

    public static void Ikj(double[] a, double[] b, double[] c, int n)
    {
        for (int i = 0; i < n; i++)
            for (int k = 0; k < n; k++)
            {
                double aik = a[i * n + k];
                for (int j = 0; j < n; j++)
                    c[i * n + j] += aik * b[k * n + j];  // along a row
            }
    }

    // threads = 1 – sequential, -1 – all cores (rows of C tiles).
    public static void Blocked(double[] a, double[] b, double[] c,
        int n, int bs, bool simd, int threads)
    {
        ParallelOptions options = new()
        {
            MaxDegreeOfParallelism = threads
        };
        int rows = (n + bs - 1) / bs;
        Parallel.For(0, rows, options,
            r => MulBlockRow(a, b, c, n, bs, r * bs, simd));
    }

    // Result rows i0..i0+bs: bs×bs tiles over k and j.
    static void MulBlockRow(double[] a, double[] b, double[] c,
        int n, int bs, int i0, bool simd)
    {
        int iEnd = Math.Min(i0 + bs, n);
        for (int k0 = 0; k0 < n; k0 += bs)
        for (int j0 = 0; j0 < n; j0 += bs)
        {
            int kEnd = Math.Min(k0 + bs, n);
            int len = Math.Min(j0 + bs, n) - j0;
            for (int i = i0; i < iEnd; i++)
            for (int k = k0; k < kEnd; k++)
            {
                double aik = a[i * n + k];
                Span<double> ci = c.AsSpan(i * n + j0, len);
                ReadOnlySpan<double> bk = b.AsSpan(k * n + j0, len);
                if (simd)
                {
                    AddScaled(ci, bk, aik);
                    continue;
                }
                for (int j = 0; j < len; j++) ci[j] += aik * bk[j];
            }
        }
    }

    // ci += aik * bk: 4 doubles per step in Vector256.
    static void AddScaled(Span<double> ci, ReadOnlySpan<double> bk,
        double aik)
    {
        ref double pc = ref MemoryMarshal.GetReference(ci);
        ref double pb = ref MemoryMarshal.GetReference(bk);
        Vector256<double> va = Vector256.Create(aik);
        int j = 0;
        for (; j <= ci.Length - 4; j += 4)
        {
            nuint k = (nuint)j;
            Vector256<double> r = Vector256.LoadUnsafe(ref pc, k)
                + va * Vector256.LoadUnsafe(ref pb, k);
            r.StoreUnsafe(ref pc, k);
        }
        for (; j < ci.Length; j++) ci[j] += aik * bk[j];
    }
}
```

The `MulBlockRow` method processes one row of tiles of matrix `C`. All blocked variants call it through `Parallel.For`: with `MaxDegreeOfParallelism = 1`, the rows are processed one after another, and with `-1`, on all cores. Rows of tiles write to different rows of `C`, so no synchronization is needed. The `AddScaled` method performs an `axpy` operation on a tile row: four `double` values per step.

The order of addition is the same in all approaches (increasing `k`), and FMA is not used, so the results match exactly (`max|ΔC| = 0`). With a tile of 64, blocked multiplication without SIMD for $n = 1024$ gains almost nothing over ikj (matrix `B` occupies 8 MB and fits in the L3 cache), but for $n = 2048$ it is already 1.5 times faster (Table 7.6). Output of `dotnet run -c Release` (Fig. 7.9):

```
n = 1024, block 64×64, threads 16
Method                   Time, ms  GFLOPS      S  max|ΔC|
ijk                        1404,4    1,53    1,0  0
ikj                         834,3    2,57    1,7  0
blocked                     835,6    2,57    1,7  0
blocked + SIMD              250,6    8,57    5,6  0
blocked + SIMD + threads     30,1   71,35   46,7  0
```

::: info Screenshot
Windows Terminal: `dotnet run -c Release -- 1024` in the MatMul project; table rows ijk, ikj, blocked, blocked + SIMD, blocked + SIMD + threads with time, GFLOPS, S
:::

Figure 7.9. Matrix multiplication performance {.caption}

## Common mistakes

Table 7.7. Common vectorization mistakes {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| wrong result for arrays of “non-round” length | the tail is not handled, or the loop condition is `i < n` instead of `i <= n - Count`; test lengths 0, 1, `Count - 1`, `Count + 1` |
| random values or a crash | `LoadUnsafe`/`StoreUnsafe` outside the array; check the length before the loop, and use the safe `Vector256.Create(span)` in tests |
| `PlatformNotSupportedException` on another PC | an intrinsic is called without checking `IsSupported`; add a fallback path and test it with `DOTNET_EnableAVX2=0` |
| vector code is no faster than scalar code | *Debug* configuration, no warmup, small arrays, or a memory limit; measure in *Release* with BenchmarkDotNet and check the disassembly |
| matrix multiplication is slow despite threads | ijk loop order and cache misses; use the ikj order, tiles, and SIMD in the inner loop |
| parallel Gauss–Seidel gives different results | a race between neighboring nodes; use red–black ordering or the Jacobi method |
