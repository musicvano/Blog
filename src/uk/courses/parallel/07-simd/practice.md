---
title: "Практика"
description: "Тема 7. Векторизація SIMD: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Пошук байта в буфері

Створити програму, яка знаходить позиції всіх символів переведення рядка в текстовому буфері 64 МБ: скалярним циклом і векторно блоками по 16 байтів (`Vector128.Equals`, `ExtractMostSignificantBits`, `BitOperations.TrailingZeroCount`). Порівняти час і результат з бібліотечним методом `MemoryExtensions.Count`.

```cs
using System.Diagnostics;
using System.Numerics;
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

byte[] text = CreateLog(sizeMb: 64, seed: 3);
Console.WriteLine($"Буфер: {text.Length / 1_048_576} МБ");

List<int> positions = [];
double t0 = Median(() => positions = FindScalar(text, (byte)'\n'));
List<int> found = [];
double t1 = Median(() => found = FindVector128(text, (byte)'\n'));
int count = 0;
double t2 = Median(() => count = text.AsSpan().Count((byte)'\n'));

Console.WriteLine($"Рядків: {positions.Count:N0}; перші переходи: " +
    string.Join(", ", positions.Take(4)));
Console.WriteLine("Спосіб                       Час, мс     S  Збіг");
Print("скалярний цикл", t0, true);
Print("Vector128 + маска", t1, found.SequenceEqual(positions));
Print("MemoryExtensions.Count", t2, count == positions.Count);

void Print(string name, double t, bool same) =>
    Console.WriteLine($"{name,-26} {t,9:F1} {t0 / t,5:F1}  " +
        (same ? "так" : "НІ"));

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
        // 16 порівнянь однією інструкцією: 0xFF для збігів.
        Vector128<byte> eq = Vector128.Equals(block, target);
        uint mask = eq.ExtractMostSignificantBits();  // 16 бітів
        while (mask != 0)
        {
            int offset = BitOperations.TrailingZeroCount(mask);
            result.Add(i + offset);
            mask &= mask - 1;             // скинути молодший біт
        }
    }
    for (; i < data.Length; i++)          // хвіст < 16 байтів
    {
        if (data[i] == value) result.Add(i);
    }
    return result;
}

// Текстовий журнал: рядки з 20–100 символів.
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

`ExtractMostSignificantBits` перетворює маску 16 порівнянь на число; цикл `while` перебирає його одиничні біти: `TrailingZeroCount` дає зміщення збігу, а `mask &= mask - 1` скидає молодший біт. Векторний пошук утричі швидший за скалярний, але більшу частину часу займає додавання позицій у список (у середньому один збіг на 61 байт). Метод `MemoryExtensions.Count` лише рахує збіги без запису позицій, тому він ще майже в 4 рази швидший: для типових задач спершу шукайте готовий векторизований метод. Результат:

```
Буфер: 64 МБ
Рядків: 1 100 571; перші переходи: 43, 103, 142, 174
Спосіб                       Час, мс     S  Збіг
скалярний цикл                  32,8   1,0  так
Vector128 + маска               11,8   2,8  так
MemoryExtensions.Count           3,0  11,0  так
```

## Приклад 2. Метод Якобі для СЛАР

Створити програму, яка розв’язує систему лінійних рівнянь $2000 \times 2000$ з діагональною перевагою та відомим точним розв’язком методом Якобі до точності $10^{- 10}$ трьома способами: скалярно, з векторизованим скалярним добутком рядка (`TensorPrimitives.Dot`) і з векторизацією та `Parallel.For` за рядками. Вивести кількість ітерацій, час, прискорення й похибку.

```cs
using System.Diagnostics;
using System.Numerics.Tensors;

Console.OutputEncoding = System.Text.Encoding.UTF8;

int n = args.Length > 0 ? int.Parse(args[0]) : 2000;
const double Tolerance = 1e-10;
var (a, b, exact) = CreateSystem(n, seed: 5);
Console.WriteLine($"СЛАР {n}×{n}, точність {Tolerance:E0}");
Console.WriteLine("Спосіб               Ітерацій  Час, мс     S" +
    "   max|x - x*|");

double t0 = 0;
foreach (var (name, simd, parallel) in new[]
{
    ("скалярно", false, false),
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

// Метод Якобі: x'[i] = (b[i] - Σ(j≠i) a[i,j]·x[j]) / a[i,i].
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
        (x, next) = (next, x);            // x – нове наближення
        if (delta < tolerance) return (x, iter);
    }
    return (x, -1);
}

// Рядок i читає лише старе x і пише лише next[i]: рядки незалежні.
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

// Матриця з діагональною перевагою: |a[i,i]| > Σ|a[i,j]|,
// тому метод Якобі збігається. Точний розв’язок x*[i] = 1 + i % 10.
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

Кожне рівняння ітерації читає лише старе наближення `x` і пише лише свій елемент `next[i]`, тому рядки обробляються паралельно без синхронізації, а після ітерації масиви міняються місцями без копіювання. Сума $\sum_{j \ne i} a_{i j} x_{j}$ обчислюється як повний скалярний добуток рядка мінус діагональний доданок. Усі способи виконують однакову кількість ітерацій і дають однакову похибку, отже векторизація не змінила обчислень. Векторний добуток прискорив розв’язання втричі (не в 4–8 разів: 32 МБ матриці читаються з пам’яті), а 16 потоків – ще в 1,9 раза: межею знову стає пропускна здатність пам’яті. Результат:

```
СЛАР 2000×2000, точність 1E-010
Спосіб               Ітерацій  Час, мс     S   max|x - x*|
скалярно                   266    902,0   1,0   4,70E-011
SIMD                       266    271,2   3,3   4,70E-011
SIMD + Parallel.For        266    144,0   6,3   4,70E-011
```

## Приклад 3. Нормалізація 3D-векторів

Створити програму, яка нормалізує мільйон тривимірних векторів (ділить кожен на його довжину) двома способами: методом `Vector3.Normalize` для масиву структур `Vector3` і векторно `Vector256<float>` для окремих масивів координат. Перевірити максимальну різницю результатів і порівняти час.

```cs
using System.Diagnostics;
using System.Numerics;
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int N = 1_000_000;
Random random = new(11);
// AoS (масив структур): x, y, z кожної точки поруч.
Vector3[] points = new Vector3[N];
// SoA (структура масивів): окремий масив для кожної координати.
float[] xs = new float[N], ys = new float[N], zs = new float[N];
for (int i = 0; i < N; i++)
{
    points[i] = new Vector3(Next(), Next(), Next());
    (xs[i], ys[i], zs[i]) = (points[i].X, points[i].Y, points[i].Z);
}
float Next() => random.NextSingle() * 200 - 100;

Vector3[] expected = new Vector3[N];
float[] rx = new float[N], ry = new float[N], rz = new float[N];

Console.WriteLine($"Нормалізація {N:N0} векторів");
Console.WriteLine("Спосіб                    Час, мс     S   max|Δ|");
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

// Вісім векторів за крок: координати x, y, z – у трьох регістрах.
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
    for (; i < x.Length; i++)             // хвіст
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

Масив `Vector3[]` – це **масив структур** (*array of structures, AoS*): координати однієї точки лежать поруч. `Vector3.Normalize` прискорює обчислення для однієї точки (три координати в одному регістрі XMM), але цикл усе одно обробляє точки по одній. У **структурі масивів** (*structure of arrays, SoA*) кожна координата – окремий масив, тому `Vector256` обробляє вісім точок за крок: це в 2,2 раза швидше за `Vector3.Normalize`. Для масивів з мільйонами точок SoA – типовий спосіб векторизації. Результати обох способів збігаються точно. Результат:

```
Нормалізація 1 000 000 векторів
Спосіб                    Час, мс     S   max|Δ|
Vector3.Normalize (AoS)       1,7   1,0   0
Vector256 (SoA)               0,7   2,2   0
```
