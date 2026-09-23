---
title: "Практика"
description: "Тема 6. Паралелізм даних і PLINQ: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Префіксна сума алгоритмом Блеллока

Створити програму, яка обчислює виключну префіксну суму (накопичені продажі **до** кожного дня) алгоритмом Блеллока, показує роботу на восьми значеннях, перевіряє результат для $2^{24}$ елементів послідовним накопиченням і порівнює час.

```cs
using System.Collections.Concurrent;
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// Демонстрація на восьми денних продажах.
long[] sales = [3, 1, 7, 0, 4, 1, 6, 3];
long[] demo = (long[])sales.Clone();
Blelloch.PrefixSum(demo);
Console.WriteLine($"Продажі:          {string.Join(" ", sales)}");
Console.WriteLine($"Накопичено (до):  {string.Join(" ", demo)}");

// Перевірка та вимірювання на 2^24 елементах.
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
        expected[i] = sum;          // сума елементів до i
        sum += source[i];
    }
});
double tPar = Median(
    prepare: () => source.CopyTo(actual, 0),
    action: () => Blelloch.PrefixSum(actual));
bool same = actual.AsSpan().SequenceEqual(expected);
Console.WriteLine($"n = {N:N0}: послідовно {tSeq:F1} мс, " +
    $"Блеллок {tPar:F1} мс, S = {tSeq / tPar:F2}");
Console.WriteLine($"Результати збігаються: {(same ? "так" : "ні")}");

// prepare не входить у вимірюваний час.
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
    // Префіксна сума «до елемента» на місці; довжина = 2^k.
    public static void PrefixSum(long[] a)
    {
        int n = a.Length;
        if (!int.IsPow2(n))
            throw new ArgumentException("Довжина має бути 2^k");
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

    // Підйом: правий вузол пари отримує суму піддерева.
    static void UpSweep(long[] a, int step, int from, int to)
    {
        int half = step / 2;
        for (int k = from; k < to; k++)
        {
            int right = (k + 1) * step - 1;
            a[right] += a[right - half];
        }
    }

    // Спуск: лівий нащадок отримує значення батька,
    // правий – значення батька плюс старе значення лівого.
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

    // Пари одного рівня незалежні: ділимо їх на діапазони.
    static void ForPairs(long[] a, int step,
        Action<long[], int, int, int> level)
    {
        const int MinRange = 1 << 16;
        int pairs = a.Length / step;
        if (pairs <= MinRange)
        {
            level(a, step, 0, pairs);     // малий рівень – послідовно
            return;
        }
        var ranges = Partitioner.Create(0, pairs, MinRange);
        Parallel.ForEach(ranges,
            r => level(a, step, r.Item1, r.Item2));
    }
}
```

Алгоритм працює на місці й вимагає довжини $2^{k}$ (метод `int.IsPow2`). Пари одного рівня не перетинаються, тому їхні діапазони обробляє `Parallel.ForEach` з `Partitioner.Create`, а рівні з невеликою кількістю пар виконуються послідовно. Копіювання вихідних даних (`prepare`) не входить у виміряний час.

На 16 логічних процесорах алгоритм Блеллока **повільніший** за послідовний цикл у 3–4 рази: операцій удвічі більше, кожен рівень заново проходить 128 МБ пам’яті, а одна операція – лише додавання. Менша глибина алгоритму окупається для дорогих операцій і на GPU. Результат:

```
Продажі:          3 1 7 0 4 1 6 3
Накопичено (до):  0 3 4 11 11 15 16 22
n = 16 777 216: послідовно 18,4 мс, Блеллок 63,9 мс, S = 0,29
Результати збігаються: так
```

## Приклад 2. Число π методом Монте-Карло

Створити програму, яка оцінює число π методом Монте-Карло: частка випадкових точок квадрата $[ 0 , 1 ] \times [ 0 , 1 ]$, що потрапили в чверть круга, наближено дорівнює $\pi / 4$. Використати 200 мільйонів випробувань, розбитих на 256 блоків з власними генераторами, вивести таблицю часу, прискорення й ефективності для 1–16 потоків і показати, що результат не залежить від кількості потоків.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const long Samples = 200_000_000;
const int Blocks = 256;              // незалежні блоки випробувань

Console.WriteLine($"Випробувань: {Samples:N0}, блоків: {Blocks}");
Console.WriteLine(" p   Час, мс      S      E   π");
double t1 = 0;
foreach (int p in new[] { 1, 2, 4, 8, 16 })
{
    double pi = 0;
    double t = Median(() => pi = EstimatePi(p));
    if (p == 1) t1 = t;
    double s = t1 / t;
    Console.WriteLine($"{p,2} {t,9:F1} {s,6:F2} {s / p,6:F2}   " +
        $"{pi:F6} (похибка {Math.Abs(pi - Math.PI):E1})");
}

// Кожен блок має власний генератор (зерно 1000 + номер блоку),
// тому результат не залежить від кількості потоків.
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

Блок з номером `block` завжди створює генератор з тим самим зерном і генерує ту саму послідовність точок незалежно від потоку, тому оцінка π однакова для всіх $p$ (з `Random.Shared` вона змінювалася б від запуску до запуску). У тілі циклу лише одне `Interlocked.Add` на блок. Прискорення досягає 6 на 8 фізичних ядрах, далі SMT дає менший приріст. Результат:

```
Випробувань: 200 000 000, блоків: 256
 p   Час, мс      S      E   π
 1    2489,8   1,00   1,00   3,141590 (похибка 2,4E-006)
 2    1421,9   1,75   0,88   3,141590 (похибка 2,4E-006)
 4     713,4   3,49   0,87   3,141590 (похибка 2,4E-006)
 8     414,6   6,01   0,75   3,141590 (похибка 2,4E-006)
16     277,5   8,97   0,56   3,141590 (похибка 2,4E-006)
```

## Приклад 3. Парно-непарне сортування перестановками

Створити програму, яка сортує масиви з 5 000, 20 000 і 50 000 чисел парно-непарним сортуванням перестановками з паралельним виконанням кожної фази, перевіряє результат з `Array.Sort`, виводить таблицю часу, прискорення й ефективності для 1–16 потоків і записує її у файл `oddeven.csv` для побудови графіка.

```cs
using System.Diagnostics;
using System.Globalization;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;

int[] sizes = [5_000, 20_000, 50_000];
int[] threads = [1, 2, 4, 8, 16];
StringBuilder csv = new("n,p,time_ms,speedup,efficiency\n");

Console.WriteLine("      n   p    Час, мс      S      E");
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
            Console.Error.WriteLine($"Помилка: n = {n}, p = {p}");
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

// n фаз; у парній фазі порівнюються пари (0,1), (2,3), …,
// у непарній – (1,2), (3,4), … Пари однієї фази незалежні.
static void OddEvenSort(int[] a, int threads)
{
    int n = a.Length;
    ParallelOptions options = new()
    {
        MaxDegreeOfParallelism = threads
    };
    for (int phase = 0; phase < n; phase++)
    {
        int first = phase % 2;               // 0 або 1
        int pairs = (n - first) / 2;
        if (threads == 1)
        {
            ComparePairs(a, first, 0, pairs);
            continue;
        }
        // Пари фази ділимо на threads суцільних блоків.
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

Масив з $n$ елементів гарантовано сортується за $n$ фаз. Пари однієї фази не перетинаються, тому фазу ділять на `threads` суцільних блоків і виконують через `Parallel.For`. Для `threads == 1` цикл пар виконується без `Parallel.For` – це послідовна версія і час $T_{1}$.

Таблиця показує вплив **зернистості**: для $n = 5000$ фаза містить лише 2500 порівнянь, і запуск `Parallel.For` коштує більше за роботу, тому паралельна версія у 2–3 рази **повільніша**; для $n$ = 50 000 прискорення досягає 2,9. Графік будують з `oddeven.csv` в Excel або LibreOffice Calc (точкова діаграма `speedup` від `p` для кожного `n`). Результат:

```
      n   p    Час, мс      S      E
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
