---
title: "Приклади та типові помилки"
description: "Тема 8. Паралельні алгоритми: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

Приклади запускалися в конфігурації *Release* (`dotnet run -c Release`) на .NET 10 на процесорі Intel Core i9-11900KF (8 ядер, 16 логічних процесорів, 64 ГБ DDR4-3600). Кожне вимірювання – медіана 5–9 запусків після прогрівання, яке дає JIT час перекомпілювати методи з оптимізаціями; на іншому комп’ютері й між запусками час відрізняється.

### Скалярний добуток і розподіли вектора

Програма обчислює скалярний добуток двох векторів з 20 мільйонів випадкових `double` для блочного, циклічного й блочно-циклічного (блоки по 1024 елементи) розподілів на 1, 2, 4, 8 і 16 потоках, виводить час, прискорення й результат з усіма значущими цифрами (формат `R`), а також норму вектора. Наприкінці ту саму суму п’ять разів обчислює `Parallel.For` з локальними сумами, які додаються під `lock` у порядку завершення потоків.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

int n = args.Length > 0 ? int.Parse(args[0]) : 20_000_000;
const int Block = 1024;                  // блок блочно-циклічного
double[] x = new double[n], y = new double[n];
Random random = new(8);
for (int i = 0; i < n; i++)
{
    x[i] = random.NextDouble() * 2 - 1;
    y[i] = random.NextDouble() * 2 - 1;
}

string[] names = ["блочний", "циклічний", "блочно-циклічний"];
Console.WriteLine($"n = {n:N0}, блок {Block}");
Console.WriteLine("Розподіл           p  Час, мс     S" +
    "  Скалярний добуток");
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
Console.WriteLine($"Норма x: {Math.Sqrt(Dot(x, x, 8, 0, Block)):F6}");

// Недетермінована редукція: суми потоків додаються в порядку
// завершення, тому остання цифра змінюється від запуску до запуску.
Console.WriteLine("Parallel.For + lock, 5 запусків:");
for (int run = 0; run < 5; run++)
{
    double sum = 0;
    object gate = new();
    Parallel.For(0, n, () => 0.0,
        (i, _, local) => local + x[i] * y[i],
        local => { lock (gate) sum += local; });
    Console.WriteLine($"  {sum:R}");
}

// Потік t (t = 0..p-1) обробляє свою частину вектора.
static double Dot(double[] x, double[] y, int p, int kind, int b)
{
    int n = x.Length;
    double[] partial = new double[p];
    ParallelOptions options = new() { MaxDegreeOfParallelism = p };
    Parallel.For(0, p, options, t =>
    {
        double sum = 0;
        if (kind == 0)                   // блочний
        {
            int lo = (int)((long)t * n / p);
            int hi = (int)((long)(t + 1) * n / p);
            for (int i = lo; i < hi; i++) sum += x[i] * y[i];
        }
        else if (kind == 1)              // циклічний: t, t + p, …
        {
            for (int i = t; i < n; i += p) sum += x[i] * y[i];
        }
        else                             // блоки t, t + p, …
        {
            for (int s = t * b; s < n; s += p * b)
            {
                int e = Math.Min(s + b, n);
                for (int i = s; i < e; i++) sum += x[i] * y[i];
            }
        }
        partial[t] = sum;                // один запис на потік
    });
    double total = 0;                    // фіксований порядок
    for (int t = 0; t < p; t++) total += partial[t];
    return total;
}

static double Median(Action action, int runs = 7)
{
    action();
    action();                            // прогрівання
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

Метод `Dot` запускає рівно $p$ ітерацій `Parallel.For`, по одній на «процесор» $t$, і кожен обчислює свою частину. Часткова сума накопичується в локальній змінній і записується в масив `partial` лише один раз: запис `partial[t] +=` на кожному елементі спричинив би хибне розділення кешу (тема 4). Часткові суми додаються в порядку номерів потоків, тому результат для даних $p$ і розподілу однаковий у всіх запусках, а для різних $p$ – відрізняється в останніх цифрах. Результат:

```
n = 20 000 000, блок 1024
Розподіл           p  Час, мс     S  Скалярний добуток
блочний            1     17,3   1,0  -111,15502539981759
блочний            2      9,3   1,9  -111,15502539977811
блочний            4      7,0   2,5  -111,15502539965507
блочний            8      7,1   2,4  -111,15502539963944
блочний           16      7,2   2,4  -111,15502539968372
циклічний          1     18,3   1,0  -111,15502539981759
циклічний          2     12,5   1,5  -111,1550253996511
циклічний          4     11,9   1,5  -111,15502539960707
циклічний          8     21,0   0,9  -111,15502539958044
циклічний         16     32,5   0,6  -111,15502539971922
блочно-циклічний   1     18,2   1,0  -111,15502539981759
блочно-циклічний   2     10,0   1,8  -111,15502539957549
блочно-циклічний   4      7,4   2,5  -111,15502539974682
блочно-циклічний   8      8,0   2,3  -111,15502539959948
блочно-циклічний  16      7,3   2,5  -111,1550253997417
Норма x: 2582,027854
Parallel.For + lock, 5 запусків:
  -111,1550253996977
  -111,15502539969074
  -111,15502539969052
  -111,15502539969242
  -111,1550253997076
```

Прискорення блочного розподілу зупиняється на 2,4–2,5: з 4 потоків 320 МБ читаються за 7 мс (близько 45 ГБ/с), і більше потоків не допомагають. Циклічний розподіл на 16 потоках майже вдвічі повільніший за послідовний: кожен потік проходить усю пам’ять з кроком $p$. Суми `Parallel.For` з `lock` щоразу різні, бо змінюється порядок додавання часткових сум.

### Множення матриці на вектор

Програма множить матрицю $n \times n$ (аргумент командного рядка, типово 1000) на вектор трьома схемами: горизонтальні смуги, вертикальні смуги з редукцією часткових векторів і шахова схема з решіткою $r \times c$ потоків. Для кожної кількості потоків вона перевіряє результат за еталоном, вимірює час і виводить прогнозоване за моделлю й виміряне прискорення та ефективність.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

int n = args.Length > 0 ? int.Parse(args[0]) : 1000;
const double Bandwidth = 44e9;           // Б/с, виміряно в темі 7
const long CacheL3 = 16L << 20;          // 16 МБ
double[] a = new double[(long)n * n], x = new double[n];
Random random = new(3);
for (long k = 0; k < a.Length; k++) a[k] = random.NextDouble();
for (int j = 0; j < n; j++) x[j] = random.NextDouble();
double[] expected = new double[n], y = new double[n];

MatVec.Rows(a, x, expected, n, 1);       // еталон
double tSync = Median(() => Parallel.For(0, 16, _ => { }));
bool inCache = 8.0 * n * n <= CacheL3;
double tMem = inCache ? 0 : 8.0 * n * n / Bandwidth * 1000;
double mb = 8.0 * n * n / (1 << 20);
Console.WriteLine($"n = {n}, матриця {mb:F0} МБ" +
    $"{(inCache ? " (у кеші L3)" : "")}, синхронізація " +
    $"{tSync * 1000:F0} мкс");
double t1 = 0;                           // перший рядок таблиці
Console.WriteLine("Схема          p  Час, мс     S  Прогноз S     E");

foreach (string scheme in new[] { "рядки", "стовпці", "шахова" })
{
    foreach (int p in new[] { 1, 2, 4, 8, 16 })
    {
        Action run = scheme switch
        {
            "рядки" => () => MatVec.Rows(a, x, y, n, p),
            "стовпці" => () => MatVec.Columns(a, x, y, n, p),
            _ => () => MatVec.Blocks2D(a, x, y, n, p),
        };
        double t = Median(run);
        CheckResult(y, expected);
        if (t1 == 0) t1 = t;
        double tAdd = t1 / ((double)n * n);  // мс на операцію
        // Прогноз: обчислення ділиться на p, але не швидше за
        // читання матриці з пам’яті; плюс редукція й синхронізація.
        int stages = scheme == "рядки" ? 1 : 2;
        int partners = scheme switch
        {
            "рядки" => 1, "стовпці" => p, _ => MatVec.GridCols(p)
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
            throw new InvalidOperationException($"y[{i}] хибний");
    }
}

// Прогрівання 0,3 с і пауза: JIT встигає перекомпілювати методи
// з оптимізаціями (Tier 1). Потім медіана запусків, мс.
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

// y = A·x; A зберігається за рядками: a[i * n + j].
static class MatVec
{
    // Горизонтальні смуги: потік t обчислює свої рядки y.
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

    // Вертикальні смуги: потік t множить свої стовпці на частину x
    // і отримує частковий вектор z[t]; потім редукція z за рядками.
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

    // Шахова схема: p = r × c блоків; блок (bi, bj) дає частковий
    // вектор для рядків bi, редукція – за c блоками рядка.
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

    // Кількість стовпців решітки: найбільший дільник p, не більший
    // за √p (16 → 4 × 4, 8 → 4 × 2, 2 → 2 × 1).
    public static int GridCols(int p)
    {
        int c = (int)Math.Sqrt(p);
        while (p % c != 0) c--;
        return c;
    }

    // y[i] = z[0][i] + … + z[parts - 1][i], рядки ділять p потоків.
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

Прогноз складається з трьох доданків: обчислення $T_{1} / p$, але не швидше за читання матриці з пам’яті (якщо матриця більша за кеш L3), час синхронізації (порожній `Parallel.For`, виміряний на початку), а для вертикальних смуг і шахової схеми – ще один паралельний цикл і редукція. Метод `GridCols` будує решітку, найближчу до квадратної: 16 потоків – $4 \times 4$, 8 – $4 \times 2$. Результат для $n = 1000$ (`dotnet run -c Release -- 1000`):

```
n = 1000, матриця 8 МБ (у кеші L3), синхронізація 8 мкс
Схема          p  Час, мс     S  Прогноз S     E
рядки         1     0,76   1,0        1,0  1,00
рядки         2     0,44   1,7        2,0  0,85
рядки         4     0,30   2,5        3,8  0,62
рядки         8     0,22   3,5        7,4  0,43
рядки        16     0,22   3,4       13,8  0,21
стовпці       1     0,87   0,9        1,0  0,87
стовпці       2     0,50   1,5        1,9  0,76
стовпці       4     0,32   2,4        3,7  0,60
стовпці       8     0,20   3,7        6,6  0,46
стовпці      16     0,22   3,5       10,3  0,22
шахова        1     0,86   0,9        1,0  0,88
шахова        2     0,56   1,3        1,9  0,67
шахова        4     0,34   2,2        3,7  0,55
шахова        8     0,28   2,7        6,9  0,33
шахова       16     0,27   2,8       11,7  0,17
```

Для $n = 8000$ (`dotnet run -c Release -- 8000`):

```
n = 8000, матриця 488 МБ, синхронізація 6 мкс
Схема          p  Час, мс     S  Прогноз S     E
рядки         1    53,82   1,0        1,0  1,00
рядки         2    28,15   1,9        2,0  0,96
рядки         4    15,22   3,5        4,0  0,88
рядки         8    12,11   4,4        4,6  0,56
рядки        16    11,10   4,8        4,6  0,30
стовпці       1    54,61   1,0        1,0  0,99
стовпці       2    35,53   1,5        2,0  0,76
стовпці       4    18,75   2,9        4,0  0,72
стовпці       8    12,63   4,3        4,6  0,53
стовпці      16    13,70   3,9        4,6  0,25
шахова        1    54,88   1,0        1,0  0,98
шахова        2    35,23   1,5        2,0  0,76
шахова        4    17,75   3,0        4,0  0,76
шахова        8    11,82   4,6        4,6  0,57
шахова       16    11,79   4,6        4,6  0,29
```

Для великої матриці модель з обмеженням пам’яті передбачила межу 4,6, і вимірювання з нею збігаються для всіх трьох схем. Для малої матриці (8 МБ у кеші L3) модель передбачає майже лінійне прискорення, а насправді воно не перевищує 3,7: паралельний цикл на 0,2 мс не встигає окупити пробудження потоків. Висновок: таку операцію розпаралелюють не окремо, а разом з навколишнім алгоритмом (наприклад, усю ітерацію методу), щоб один паралельний цикл виконував більше роботи.

### Адаптивне інтегрування

Програма обчислює $\int_{0}^{L} 2 x \cos x^{2} d x = \sin L^{2}$ ($L = 200$) адаптивним методом Сімпсона з точністю $10^{- 8}$: послідовно, статичним розбиттям на 16 і 256 рівних частин (`Parallel.For`) і рекурсивними задачами `Parallel.Invoke` з порогами глибини 4, 8, 12 і 16. Точне значення відоме, тому виводиться справжня похибка. Для 16 частин програма показує найменший і найбільший час частини.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// ∫ 2x·cos(x²) dx на [0; L] = sin(L²): коливання частішають
// праворуч, тому права частина відрізка потребує більше роботи.
double length = args.Length > 0 ? double.Parse(args[0]) : 200;
const double Eps = 1e-8;
double exact = Math.Sin(length * length);
Console.WriteLine($"L = {length}, ε = {Eps:E0}, " +
    $"точне значення {exact:F12}");
Console.WriteLine($"{"Спосіб",-25}{"Час, мс",9}{"S",6}" +
    $"{"Похибка",10}{"Задач",8}");

double value = 0;
double t0 = Median(() => value = Simpson.Whole(0, length, Eps));
Print("послідовно", t0, value, 0);

foreach (int parts in new[] { 16, 256 })
{
    double[] partTimes = new double[parts];
    double t = Median(() => value =
        Simpson.Static(0, length, Eps, parts, partTimes));
    Print($"статично, {parts} частин", t, value, parts);
    if (parts == 16)
        Console.WriteLine($"  час частин, мс: {partTimes.Min():F1}" +
            $" … {partTimes.Max():F1}");
}

foreach (int levels in new[] { 4, 8, 12, 16 })
{
    double t = Median(() => value =
        Simpson.Tasks(0, length, Eps, levels));
    Print($"задачі, поріг 2^{levels}", t, value, Simpson.TaskCount);
}

void Print(string name, double t, double v, long tasks) =>
    Console.WriteLine($"{name,-25}{t,9:F1}{t0 / t,6:F1}" +
        $"{Math.Abs(v - exact),10:E1}{tasks,8}");

static double Median(Action action, int runs = 7)
{
    action();
    Thread.Sleep(200);
    action();                            // прогрівання
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
    const int MinDepth = 14;             // не менше 16 384 відрізків
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

    // Адаптивний Сімпсон: ділимо відрізок, доки оцінка похибки
    // (за правилом Рунге) не стане меншою за eps.
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

    // Статичне розбиття на parts рівних частин (parts = 2^k).
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

    // Рекурсивні задачі: до глибини levels кожна половина стає
    // окремою задачею, глибше – звичайна рекурсія.
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

`MinDepth` не дозволяє прийняти відрізок, коротший за 16 384-ту частину, раніше: на широкому відрізку з кількома коливаннями оцінка похибки може випадково виявитися малою. Статичне розбиття на $2^{k}$ частин починає рекурсію з глибини $k$ і точності $\epsilon / 2^{k}$, а задачі – з тих самих значень, тому всі способи будують **те саме** дерево відрізків і дають однаковий результат: паралелізм не змінив обчислень. Результат:

```
L = 200, ε = 1E-008, точне значення 0,946539656786
Спосіб                     Час, мс     S   Похибка   Задач
послідовно                   170,9   1,0  5,7E-013       0
статично, 16 частин           37,5   4,6  5,7E-013      16
  час частин, мс: 0,4 … 32,9
статично, 256 частин          32,4   5,3  5,7E-013     256
задачі, поріг 2^4             39,3   4,3  5,7E-013      30
задачі, поріг 2^8             23,4   7,3  5,7E-013     510
задачі, поріг 2^12            23,9   7,2  5,7E-013    8190
задачі, поріг 2^16            32,0   5,3  5,7E-013  130068
```

Статичне розбиття на 16 частин прискорює обчислення лише в 4,6 раза: найважча частина (33 мс) обчислюється майже стільки, скільки вся паралельна програма. 256 частин з динамічним розподілом `Parallel.For` кращі, але найважчі частини в кінці відрізка роздаються останніми. Рекурсивні задачі з порогом $2^{8}$–$2^{12}$ дають найкраще прискорення 7,2–7,3; замало задач ($2^{4}$) погіршує балансування, забагато ($2^{16}$) – збільшує накладні витрати.

Задачі рекурсії зручно розглядати в налагоджувачі. У Rider поставте точку зупину в методі `AdaptTasks` на рядку `Parallel.Invoke` (умова `depth == 6`), запустіть налагодження (*Run → Debug*) і відкрийте вкладку *Parallel Stacks* вікна *Debug* (рис. 8.12): стеки кількох потоків пулу містять ланцюжки викликів `AdaptTasks` різної глибини, а потоки, які вкрали задачі, починають стек з методів пулу.

::: info Знімок екрана
Rider: breakpoint in `Simpson.AdaptTasks` at `Parallel.Invoke` with condition `depth == 6`, Run → Debug; Debug tool window → Parallel Stacks tab: several worker threads with recursive AdaptTasks frames of different depth
:::

Рис. 8.12. Задачі адаптивного інтегрування в налагоджувачі {.caption}

### Корені рівняння

Програма знаходить усі корені многочлена Лежандра $P_{n} (x)$ ($n = 1000$) на $[ - 1 ; 1 ]$: обчислює $P_{n}$ у вузлах рівномірної сітки (кількість відрізків – другий аргумент, типово 400 000), відокремлює корені за зміною знака, уточнює їх бісекцією і, незалежно, методом Ньютона з відомих наближень $\cos (\pi (k + 0 {,} 75) / (n + 0 {,} 5))$. Кожен етап виконується послідовно й паралельно; наприкінці корені двох методів порівнюються.

```cs
using System.Collections.Concurrent;
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// Корені многочлена Лежандра P_n на [-1; 1]: їх рівно n, і біля
// кінців відрізка вони розташовані дуже щільно.
int n = args.Length > 0 ? int.Parse(args[0]) : 1000;
int segments = args.Length > 1 ? int.Parse(args[1]) : 400_000;
Console.WriteLine($"P_{n}(x), відрізків: {segments:N0}");
Console.WriteLine("Етап                      1 потік, мс  " +
    "Паралельно, мс     S");

double[] values = new double[segments + 1];
Report("обчислення на сітці",
    () => Scan(values, n, segments, parallel: false),
    () => Scan(values, n, segments, parallel: true));

// Відрізки, на кінцях яких P_n має різні знаки.
List<int> brackets = [];
for (int k = 0; k < segments; k++)
    if (Math.Sign(values[k]) != Math.Sign(values[k + 1]))
        brackets.Add(k);

double h = 2.0 / segments;
double[] bisect = new double[brackets.Count];
Report("бісекція", () =>
{
    for (int r = 0; r < brackets.Count; r++)
        bisect[r] = Bisection(n, -1 + brackets[r] * h, h);
}, () => Parallel.For(0, brackets.Count, r =>
    bisect[r] = Bisection(n, -1 + brackets[r] * h, h)));

// Ньютон з n початкових точок cos(π(k + 0,75)/(n + 0,5)).
double[] newton = new double[n];
Report("метод Ньютона", () =>
{
    for (int k = 0; k < n; k++) newton[k] = Newton(n, k);
}, () => Parallel.For(0, n, k => newton[k] = Newton(n, k)));
Array.Sort(newton);

Console.WriteLine($"Знайдено коренів: {bisect.Length} з {n}");
if (bisect.Length == n)
{
    double diff = 0;
    for (int k = 0; k < n; k++)
        diff = Math.Max(diff, Math.Abs(bisect[k] - newton[k]));
    Console.WriteLine($"max |бісекція − Ньютон| = {diff:E1}");
}
Console.WriteLine($"Найменший корінь {newton[0]:F15}");

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
    // Діапазони по 4096 точок: один виклик делегата на діапазон.
    var ranges = Partitioner.Create(0, segments + 1, 4096);
    Parallel.ForEach(ranges, range =>
    {
        for (int k = range.Item1; k < range.Item2; k++)
            values[k] = Legendre(n, -1 + k * h).P;
    });
}

// Ділимо відрізок навпіл, доки він не стане меншим за 1e-15.
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

// P_n(x) рекурентно: (k + 1)P_{k+1} = (2k + 1)x·P_k − k·P_{k−1};
// похідна P'_n = n(x·P_n − P_{n−1}) / (x² − 1).
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
    action();                            // прогрівання
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

$P_{n} (x)$ обчислюється рекурентною формулою за $n$ кроків, тому одне значення коштує близько мікросекунди, і сітка з 400 тисяч вузлів – найдорожчий етап. Сітку обчислює `Parallel.ForEach` з діапазонами по 4096 вузлів (тема 6), бісекцію й метод Ньютона – `Parallel.For` за коренями. Результат:

```
P_1000(x), відрізків: 400 000
Етап                      1 потік, мс  Паралельно, мс     S
обчислення на сітці           1845,4           133,9  13,8
бісекція                       155,7            13,2  11,8
метод Ньютона                   12,5             1,2  10,4
Знайдено коренів: 1000 з 1000
max |бісекція − Ньютон| = 3,3E-016
Найменший корінь -0,999997111298076
```

Етапи прискорюються в 10–14 разів: час обмежують обчислення, а не пам’ять, і логічні процесори SMT допомагають, бо ланцюжок залежних ділень в одному потоці залишає вільні виконавчі пристрої ядра. Корені двох методів збігаються до $3 \cdot 10^{- 16}$. Зі 100 тисячами відрізків (`dotnet run -c Release -- 1000 100000`) програма знаходить лише 996 коренів: крок сітки $2 \cdot 10^{- 5}$ більший за відстань між коренями біля $\pm 1$.

## Типові помилки

Таблиця 8.7. Типові помилки проєктування паралельних алгоритмів {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| паралельна сума щоразу відрізняється в останніх цифрах | часткові суми додаються в порядку завершення потоків; фіксоване розбиття на частини й додавання в порядку номерів, порівняння з допуском |
| ітераційний метод виконує різну кількість ітерацій у різних запусках | недетерміновані скалярні добутки; детермінована редукція за фіксованими частинами |
| прискорення зупиняється на 2–5 для простих операцій над великими масивами | межа пропускної здатності пам’яті; оцінити $8 n / B$, об’єднати кілька проходів в один, працювати з даними в кеші |
| циклічний розподіл повільніший за послідовний цикл | кожен потік читає всі кеш-рядки; блочний або блочно-циклічний розподіл |
| статичний розподіл дає низьке прискорення за нерівномірних задач | дисбаланс: найважча частина визначає час; циклічний розподіл, динамічний лічильник, задачі з крадіжкою роботи |
| рекурсивні задачі повільніші за послідовну рекурсію | задачі надто дрібні; поріг глибини чи розміру, нижче якого рекурсія послідовна |
| програма з `Barrier` зависає | учасників бар’єра більше, ніж одночасно виконуваних потоків (`Parallel.For`, задачі); окремі потоки `Thread` або `LongRunning` |
| пропущено частину коренів рівняння | крок сітки більший за відстань між коренями; зменшити крок, перевірити кількість коренів відомими властивостями |
| прогноз прискорення значно більший за виміряний | модель не враховує пам’ять, частоту ядер, SMT чи дисбаланс; додати виміряні параметри |
| алгоритм, швидкий на спільній пам’яті, повільний на кластері | обміни на вузол не зменшуються з $p$ (смуги); шахова схема, алгоритми Фокса й Кеннона, укрупнення задач |
