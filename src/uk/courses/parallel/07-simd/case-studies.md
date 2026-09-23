---
title: "Приклади та типові помилки"
description: "Тема 7. Векторизація SIMD: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

Приклади запускалися в конфігурації *Release* на .NET 10 на процесорі Intel Core i9-11900KF (8 ядер, 16 логічних процесорів, AVX-512); на іншому комп’ютері й між запусками час відрізняється. Приклад «Сума елементів масиву» використовує пакет `System.Numerics.Tensors`.

### Можливості процесора

Програма виводить, які вектори прискорюються апаратно та які набори інструкцій підтримує процесор. Властивості `IsSupported` класів Arm на процесорі x86-64 повертають `false`.

```cs
using System.Numerics;
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics;
using System.Runtime.Intrinsics.Arm;
using System.Runtime.Intrinsics.X86;

Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine($"{RuntimeInformation.OSArchitecture}, " +
    $"{RuntimeInformation.FrameworkDescription}, логічних " +
    $"процесорів: {Environment.ProcessorCount}");

Console.WriteLine("Апаратно-незалежні вектори:");
Show("Vector.IsHardwareAccelerated", Vector.IsHardwareAccelerated);
Show("Vector<float>.Count", Vector<float>.Count);
Show("Vector<double>.Count", Vector<double>.Count);
Show("Vector128.IsHardwareAccelerated",
    Vector128.IsHardwareAccelerated);
Show("Vector256.IsHardwareAccelerated",
    Vector256.IsHardwareAccelerated);
Show("Vector512.IsHardwareAccelerated",
    Vector512.IsHardwareAccelerated);

Console.WriteLine("Набори інструкцій x86/x64:");
Show("Avx2", Avx2.IsSupported);
Show("Fma", Fma.IsSupported);
Show("Avx512F", Avx512F.IsSupported);
Show("Avx10v1", Avx10v1.IsSupported);
Show("Avx10v2", Avx10v2.IsSupported);
Console.WriteLine("Набори інструкцій Arm64:");
Show("AdvSimd (NEON)", AdvSimd.IsSupported);

static void Show(string name, object value)
{
    string text = value is bool b ? (b ? "так" : "ні") : $"{value}";
    Console.WriteLine($"  {name,-32} {text}");
}
```

Метод `Show` приймає `object`, тому виводить і логічні значення, і кількість елементів. Процесор Rocket Lake підтримує AVX-512, але не AVX10, а `Vector<T>` типово має 256 бітів. Результат:

```
X64, .NET 10.0.12, логічних процесорів: 16
Апаратно-незалежні вектори:
  Vector.IsHardwareAccelerated     так
  Vector<float>.Count              8
  Vector<double>.Count             4
  Vector128.IsHardwareAccelerated  так
  Vector256.IsHardwareAccelerated  так
  Vector512.IsHardwareAccelerated  так
Набори інструкцій x86/x64:
  Avx2                             так
  Fma                              так
  Avx512F                          так
  Avx10v1                          ні
  Avx10v2                          ні
Набори інструкцій Arm64:
  AdvSimd (NEON)                   ні
```

Якщо перед запуском задати `DOTNET_EnableAVX512=0`, рядки `Vector512` і `Avx512…` покажуть «ні» – так перевіряють запасні шляхи.

### Сума елементів масиву

Програма обчислює суму мільйона чисел `float` чотирма способами: скалярним циклом, `Vector<T>`, `Vector256<T>` і `TensorPrimitives`. Для кожного способу виводяться медіана часу одного виклику в мікросекундах, прискорення й результат, а також точне значення, обчислене в `double`.

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
    ("скалярно", SumScalar),
    ("Vector<T>", SumVectorT),
    ("Vector256", SumVector256),
    ("TensorPrimitives", x => TensorPrimitives.Sum(x)),
];

Console.WriteLine($"n = {N:N0}, Vector<float>.Count = " +
    $"{Vector<float>.Count}");
Console.WriteLine("Спосіб             Час, мкс     S         Сума");
double t0 = 0;
foreach (var (name, sum) in methods)
{
    float s = 0;
    double t = Median(() => s = sum(a));
    if (t0 == 0) t0 = t;
    Console.WriteLine(
        $"{name,-16} {t,10:F1} {t0 / t,5:F1} {s,12:F1}");
}
double exact = 0;                       // еталон у double
foreach (float x in a) exact += x;
Console.WriteLine($"{"double (еталон)",-33} {exact,12:F1}");

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
    for (; i < x.Length; i++) sum += x[i];     // хвіст
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
    for (; i < n; i++) sum += x[i];            // хвіст
    return sum;
}

// Прогрівання: 100 викликів і пауза, щоб JIT перекомпілював
// метод з оптимізаціями (Tier 1); потім медіана 21 запуску, мкс.
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

Методи `SumVectorT` і `SumVector256` показують два стилі: створення вектора з проміжку та завантаження за посиланням. В обох хвіст обробляється скалярно. Прогрівання складається зі 100 викликів і паузи, бо цикли в методі JIT спочатку компілює без оптимізацій.

Векторні способи прискорюють суму в 6–10 разів, тобто приблизно на кількість елементів у регістрі YMM; між запусками час коливається на 10–20 %. Різні суми в останньому стовпці – наслідок округлення `float` (розділ «Похибки float і double»). Результат:

```
n = 1 000 000, Vector<float>.Count = 8
Спосіб             Час, мкс     S         Сума
скалярно              965,0   1,0     499848,3
Vector<T>             150,1   6,4     499854,9
Vector256             123,5   7,8     499854,9
TensorPrimitives       97,7   9,9     499855,1
double (еталон)                       499854,3
```

### Порогова обробка зображення

Програма створює зображення у відтінках сірого 8000×6000 пікселів і обробляє його порогом: пікселі, яскравіші за 128, залишаються, решта затемнюються вчетверо. Одночасно рахується кількість яскравих пікселів. Скалярна версія використовує `if`, векторна – маску `GreaterThan`, `ConditionalSelect` і `ExtractMostSignificantBits` для `Vector256<byte>` (32 байти).

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
Console.WriteLine($"Зображення {Width}×{Height}, поріг {Limit}, " +
    $"яскравих пікселів: {bright:N0}");
Console.WriteLine("Спосіб        Час, мс     S   Збіг");
Console.WriteLine($"скалярно    {t0,9:F1} {1.0,5:F1}   так");

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
        $"{(same ? "так" : "НІ")}");
}

// Пікселі, не яскравіші за поріг, затемнюються вчетверо.
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
        // Маска: 0xFF там, де p > limit (порівняння без знака).
        Vector256<byte> mask = Vector256.GreaterThan(p, limits);
        Vector256<byte> dark = Vector256.ShiftRightLogical(p, 2);
        Vector256.ConditionalSelect(mask, p, dark)
            .StoreUnsafe(ref d, i);
        uint bits = mask.ExtractMostSignificantBits();
        count += BitOperations.PopCount(bits);
    }
    // Хвіст (менше за 32 пікселі) – скалярно.
    int tail = (int)i;
    return count + Scalar(src.AsSpan(tail), dst.AsSpan(tail), limit);
}

// Плавний візерунок із шумом; зерно робить дані відтворюваними.
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

Порівняння `GreaterThan` для `byte` виконується без знака, тому пікселі 129–255 правильно вважаються яскравими; збіг з еталоном перевіряється побайтно. Зсув `ShiftRightLogical(p, 2)` ділить яскравість на 4. Кількість одиничних бітів маски `PopCount` дорівнює кількості яскравих пікселів у блоці.

Прискорення (15–18 разів у різних запусках) виявилося більшим за очікуване, бо скалярна версія виконує на кожен піксель умовний перехід `if`, а для зашумлених пікселів поблизу порогу процесор часто помиляється в передбаченні переходу; векторна версія переходів не має. Версія з `Vector512<byte>` відрізняється лише типом і кроком 64; на i9-11900KF вона майже не швидша (3,6 проти 3,7 мс): програма читає й записує по 48 МБ зі швидкістю близько 12 ГБ/с, і межею стає пам’ять. Результат:

```
Зображення 8000×6000, поріг 128, яскравих пікселів: 23 569 245
Спосіб        Час, мс     S   Збіг
скалярно         63,8   1,0   так
Vector256         3,6  17,5   так
```

### Множення матриць

Програма множить дві матриці `double` розміром $n \times n$ (типово 1024) п’ятьма способами: ijk, ikj, блочне, блочне з `Vector256` і блочне з `Vector256` та `Parallel.For` за рядками плиток. Розмір матриці та плитки можна передати аргументами. Для кожного способу виводяться час (медіана трьох запусків, для ijk – один запуск), GFLOPS, прискорення відносно ijk і найбільша різниця елементів з результатом ijk.

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
    ("блочне", c => Mul.Blocked(a, b, c, n, block, false, 1)),
    ("блочне + SIMD", c => Mul.Blocked(a, b, c, n, block, true, 1)),
    ("блочне + SIMD + потоки",
        c => Mul.Blocked(a, b, c, n, block, true, -1)),
];

Console.WriteLine($"n = {n}, блок {block}×{block}, " +
    $"потоків {Environment.ProcessorCount}");
Console.WriteLine($"{"Спосіб",-24}{"Час, мс",9}{"GFLOPS",8}" +
    $"{"S",7}  max|ΔC|");
double t0 = 0;
foreach (var (name, run) in methods)
{
    double[] c = t0 == 0 ? expected : new double[n * n];
    int runs = t0 == 0 ? 1 : 3;          // ijk дуже повільний
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

// Медіана запусків у секундах; прогрівання лише для швидких.
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

// Матриці зберігаються за рядками: елемент (i, j) – m[i * n + j].
static class Mul
{
    public static void Ijk(double[] a, double[] b, double[] c, int n)
    {
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
            {
                double sum = 0;
                for (int k = 0; k < n; k++)
                    sum += a[i * n + k] * b[k * n + j]; // стовпець B
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
                    c[i * n + j] += aik * b[k * n + j];  // по рядку
            }
    }

    // threads = 1 – послідовно, -1 – усі ядра (рядки плиток C).
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

    // Рядки i0..i0+bs результату: плитки bs×bs для k і j.
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

    // ci += aik * bk: 4 double за крок у Vector256.
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

Метод `MulBlockRow` обробляє один рядок плиток матриці `C`. Усі блочні варіанти викликають його через `Parallel.For`: з `MaxDegreeOfParallelism = 1` рядки обробляються по черзі, а з `-1` – на всіх ядрах. Рядки плиток пишуть у різні рядки `C`, тому синхронізація не потрібна. Метод `AddScaled` виконує операцію `axpy` над рядком плитки: чотири `double` за крок.

Порядок додавання в усіх способах однаковий (за зростанням `k`), а FMA не використовується, тому результати збігаються точно (`max|ΔC| = 0`). З плиткою 64 блочне множення без SIMD для $n = 1024$ майже не виграє в ikj (матриця `B` займає 8 МБ і поміщається в кеш L3), а для $n = 2048$ воно вже в 1,5 раза швидше (табл. 7.6). Результат `dotnet run -c Release` (рис. 7.9):

```
n = 1024, блок 64×64, потоків 16
Спосіб                    Час, мс  GFLOPS      S  max|ΔC|
ijk                        1404,4    1,53    1,0  0
ikj                         834,3    2,57    1,7  0
блочне                      835,6    2,57    1,7  0
блочне + SIMD               250,6    8,57    5,6  0
блочне + SIMD + потоки       30,1   71,35   46,7  0
```

::: info Знімок екрана
Windows Terminal: `dotnet run -c Release -- 1024` in the MatMul project; table rows ijk, ikj, блочне, блочне + SIMD, блочне + SIMD + потоки with time, GFLOPS, S
:::

Рис. 7.9. Продуктивність множення матриць {.caption}

## Типові помилки

Таблиця 7.7. Типові помилки векторизації {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| неправильний результат для масивів «некруглої» довжини | не оброблено хвіст або умова циклу `i < n` замість `i <= n - Count`; тестувати довжини 0, 1, `Count - 1`, `Count + 1` |
| випадкові значення або аварійне завершення | `LoadUnsafe`/`StoreUnsafe` за межами масиву; перевірити довжину до циклу, для тестів – безпечний `Vector256.Create(span)` |
| `PlatformNotSupportedException` на іншому ПК | виклик інтринсика без перевірки `IsSupported`; додати запасний шлях і перевірити його з `DOTNET_EnableAVX2=0` |
| векторний код не швидший за скалярний | конфігурація *Debug*, немає прогрівання, малі масиви або обмеження пам’яті; вимірювати в *Release*, BenchmarkDotNet, перевірити дизасемблер |
| множення матриць повільне попри потоки | порядок циклів ijk і промахи кешу; порядок ikj, плитки, SIMD у внутрішньому циклі |
| паралельний Гаусс–Зейдель дає різні результати | гонитва між сусідніми вузлами; червоно-чорне впорядкування або метод Якобі |
