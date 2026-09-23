---
title: "Приклади та типові помилки"
description: "Тема 6. Паралелізм даних і PLINQ: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

Приклади запускалися в конфігурації *Release* на .NET 10 на процесорі Intel Core i9-11900KF (8 ядер, 16 логічних процесорів); на іншому комп’ютері й між запусками час відрізняється.

### Множина Мандельброта

Програма обчислює зображення множини Мандельброта 2400×1600 пікселів: для кожного пікселя виконується до 1000 ітерацій $z \leftarrow z^{2} + c$. Рядки зображення незалежні, тому зовнішній цикл за рядками замінено на `Parallel.For`. Для кожного $p$ виводяться час, прискорення, ефективність і перевірка: загальна кількість ітерацій має збігтися з послідовною версією. Зображення записується у файл PGM (відтінки сірого), який відкривають, наприклад, у GIMP.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Width = 2400, Height = 1600, MaxIter = 1000;
byte[] image = new byte[Width * Height];

// Послідовний варіант – еталон для перевірки та T1.
long checkSeq = 0;
double tSeq = Median(() => checkSeq = RenderSequential(image));
Console.WriteLine($"Послідовно: {tSeq,8:F1} мс, " +
    $"ітерацій {checkSeq:N0}");

Console.WriteLine(" p   Час, мс   S      E      Перевірка");
foreach (int p in new[] { 1, 2, 4, 8, 16 })
{
    long check = 0;
    double t = Median(() => check = RenderParallel(image, p));
    double s = tSeq / t;
    string ok = check == checkSeq ? "так" : "НІ";
    Console.WriteLine(
        $"{p,2} {t,9:F1} {s,5:F2} {s / p,6:F2}    {ok}");
}

WritePgm("mandelbrot.pgm", image);
Console.WriteLine("Зображення: mandelbrot.pgm");

static long RenderSequential(byte[] pixels)
{
    long total = 0;
    for (int y = 0; y < Height; y++)
    {
        total += RenderRow(pixels, y);
    }
    return total;
}

static long RenderParallel(byte[] pixels, int threads)
{
    ParallelOptions options = new()
    {
        MaxDegreeOfParallelism = threads
    };
    long total = 0;
    Parallel.For(0, Height, options, y =>
    {
        long rowIterations = RenderRow(pixels, y);
        Interlocked.Add(ref total, rowIterations);
    });
    return total;
}

// Рядок y незалежний від інших: пише лише у свої пікселі.
static long RenderRow(byte[] pixels, int y)
{
    long iterations = 0;
    double ci = -1.0 + 2.0 * y / Height;
    for (int x = 0; x < Width; x++)
    {
        double cr = -2.2 + 3.0 * x / Width;
        double zr = 0, zi = 0;
        int n = 0;
        while (n < MaxIter && zr * zr + zi * zi <= 4.0)
        {
            double t = zr * zr - zi * zi + cr;
            zi = 2 * zr * zi + ci;
            zr = t;
            n++;
        }
        iterations += n;
        pixels[y * Width + x] =
            (byte)(n == MaxIter ? 0 : 255 - n % 256);
    }
    return iterations;
}

// Прогрівання JIT, потім медіана п’яти запусків.
static double Median(Action action, int runs = 5)
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

static void WritePgm(string path, byte[] pixels)
{
    using FileStream file = File.Create(path);
    string header = $"P5\n{Width} {Height}\n255\n";
    file.Write(System.Text.Encoding.ASCII.GetBytes(header));
    file.Write(pixels);
}
```

Кожна ітерація `Parallel.For` пише лише в пікселі свого рядка, тому синхронізація масиву не потрібна. Кількість ітерацій рядка додається до спільного лічильника через `Interlocked.Add` – це одна атомарна операція на рядок, а не на піксель. Рядки в центрі зображення (усередині множини) обчислюються довше, тому ефективність залежить від того, як рядки розподілено між потоками; для цього симетричного зображення навантаження виявилося майже рівномірним. Прискорення майже лінійне до 8 потоків (8 фізичних ядер), а на 16 логічних процесорах ефективність знижується до 0,72. Результат:

```
Послідовно:   2830,7 мс, ітерацій 989 814 242
 p   Час, мс   S      E      Перевірка
 1    2807,8  1,01   1,01    так
 2    1486,3  1,90   0,95    так
 4     766,3  3,69   0,92    так
 8     405,6  6,98   0,87    так
16     245,3 11,54   0,72    так
Зображення: mandelbrot.pgm
```

### Аналіз тексту PLINQ

Програма генерує корпус з 400 000 речень (генератор із фіксованим зерном) і підраховує частоту слів завдовжки від 4 літер двома способами: запитом із `GroupBy` у LINQ і PLINQ та через `Aggregate` з локальним словником у кожному розділі для $p = 1 , 2 , 4 , 8 , 16$.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

string[] lines = GenerateCorpus(lineCount: 400_000, seed: 7);
Console.WriteLine($"Рядків: {lines.Length:N0}");

// 1. GroupBy: LINQ і PLINQ з однаковим запитом.
double tLinq = Median(() => CountByGroup(lines.AsEnumerable()));
double tPlinq = Median(() => CountByGroup(lines.AsParallel()));
Console.WriteLine($"GroupBy LINQ:  {tLinq,7:F1} мс");
Console.WriteLine($"GroupBy PLINQ: {tPlinq,7:F1} мс " +
    $"(S = {tLinq / tPlinq:F2})");

// 2. Aggregate: локальний словник у кожному розділі.
Dictionary<string, int> expected = CountSequential(lines);
double t1 = Median(() => CountSequential(lines));
Console.WriteLine($"Словник, послідовно: {t1,6:F1} мс");
foreach (int p in new[] { 1, 2, 4, 8, 16 })
{
    Dictionary<string, int> counts = CountParallel(lines, p);
    double t = Median(() => CountParallel(lines, p));
    bool same = counts.Count == expected.Count && counts.All(
        pair => expected[pair.Key] == pair.Value);
    Console.WriteLine($"Aggregate, p = {p,2}: {t,6:F1} мс  " +
        $"S = {t1 / t,5:F2}  збіг: {(same ? "так" : "НІ")}");
}

Console.WriteLine("Найчастіші слова:");
foreach (var (word, count) in expected
    .OrderByDescending(pair => pair.Value).Take(3))
{
    Console.WriteLine($"  {word,-10} {count,9:N0}");
}

static List<(string, int)> CountByGroup(IEnumerable<string> src) =>
    src.SelectMany(Split)
        .Where(w => w.Length >= 4)
        .Select(w => w.ToLowerInvariant())
        .GroupBy(w => w)
        .Select(g => (g.Key, g.Count()))
        .ToList();

static Dictionary<string, int> CountSequential(string[] lines)
{
    Dictionary<string, int> counts = [];
    foreach (string line in lines) AddWords(counts, line);
    return counts;
}

static Dictionary<string, int> CountParallel(
    string[] lines, int threads) =>
    lines.AsParallel()
        .WithDegreeOfParallelism(threads)
        .Aggregate(
            // seed: окремий словник для кожного розділу
            seedFactory: () => new Dictionary<string, int>(),
            // update: без блокувань, словник належить розділу
            updateAccumulatorFunc: (local, line) =>
            {
                AddWords(local, line);
                return local;
            },
            // combine: злиття словників двох розділів
            combineAccumulatorsFunc: (left, right) =>
            {
                foreach (var (word, n) in right)
                {
                    left[word] = left.GetValueOrDefault(word) + n;
                }
                return left;
            },
            resultSelector: counts => counts);

static void AddWords(Dictionary<string, int> counts, string line)
{
    foreach (string word in Split(line))
    {
        if (word.Length < 4) continue;
        string key = word.ToLowerInvariant();
        counts[key] = counts.GetValueOrDefault(key) + 1;
    }
}

static string[] Split(string line) => line.Split(
    [' ', ',', '.', '!', '?'], StringSplitOptions.RemoveEmptyEntries);

static string[] GenerateCorpus(int lineCount, int seed)
{
    string[] vocabulary =
    [
        "Потік", "задача", "ядро", "дані", "розбиття", "цикл",
        "запит", "злиття", "сортування", "редукція", "масив",
        "паралельний", "процесор", "пам’ять", "кеш", "результат",
        "швидкість", "прискорення", "ефективність", "обчислення"
    ];
    Random random = new(seed);
    string[] result = new string[lineCount];
    for (int i = 0; i < lineCount; i++)
    {
        string[] words = new string[random.Next(5, 16)];
        for (int j = 0; j < words.Length; j++)
        {
            // Квадрат рівномірного числа: перші слова частіші.
            double u = random.NextDouble();
            words[j] = vocabulary[(int)(u * u * vocabulary.Length)];
        }
        result[i] = string.Join(' ', words) + ".";
    }
    return result;
}

static double Median(Action action, int runs = 5)
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

Запит із `GroupBy` у PLINQ не швидший за LINQ: мільйони рядків-слів групуються в спільні групи, робота впирається в злиття груп і збирання сміття. Той самий підрахунок через `Aggregate` з окремим словником для кожного розділу масштабується: `update` не потребує синхронізації, а `combine` зливає лише 20 записів словника. Операція злиття словників асоціативна й комутативна, тому результат збігається з послідовним. Прискорення обмежене виділенням пам’яті під рядки (`Split`, `ToLowerInvariant`) і тим, що 16 логічних процесорів мають лише 8 фізичних ядер. Результат:

```
Рядків: 400 000
GroupBy LINQ:    964,5 мс
GroupBy PLINQ:   999,9 мс (S = 0,96)
Словник, послідовно:  336,0 мс
Aggregate, p =  1:  321,6 мс  S =  1,04  збіг: так
Aggregate, p =  2:  171,5 мс  S =  1,96  збіг: так
Aggregate, p =  4:   94,5 мс  S =  3,56  збіг: так
Aggregate, p =  8:   59,0 мс  S =  5,69  збіг: так
Aggregate, p = 16:   60,8 мс  S =  5,53  збіг: так
Найчастіші слова:
  потік        896 425
  задача       371 241
  ядро         283 168
```

### Паралельне сортування злиттям

Програма сортує масиви з 1 і 10 мільйонів випадкових чисел паралельним сортуванням злиттям з порогом 16 384 елементи та глибиною розгалуження $\lceil \log_{2} p \rceil$. Кількості потоків можна передати аргументом командного рядка. Для кожної пари $(n , p)$ результат перевіряється з `Array.Sort`, а таблиця записується у файл `speedup.csv`.

```cs
using System.Diagnostics;
using System.Globalization;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;

// Аргумент – кількості потоків через кому, наприклад 1,2,4,8.
int[] threads = args.Length > 0
    ? args[0].Split(',').Select(int.Parse).ToArray()
    : [1, 2, 4, 8, 16];
int[] sizes = [1_000_000, 10_000_000];

StringBuilder csv = new("n,p,time_ms,speedup,efficiency\n");
Console.WriteLine("         n   p   Час, мс      S      E");
foreach (int n in sizes)
{
    int[] source = new int[n];
    Random random = new(2026);
    for (int i = 0; i < n; i++) source[i] = random.Next();
    int[] expected = (int[])source.Clone();
    Array.Sort(expected);

    int[] data = new int[n];
    double Measure(int p) => Median(() =>
    {
        source.CopyTo(data, 0);
        ParallelMergeSort.Sort(data, p);
    });
    double t1 = Measure(1);                // еталонний час T1
    foreach (int p in threads)
    {
        double t = p == 1 ? t1 : Measure(p);
        if (!data.AsSpan().SequenceEqual(expected))
        {
            Console.Error.WriteLine($"Невірний результат, p = {p}");
            return 2;
        }
        double s = t1 / t;
        Console.WriteLine($"{n,10:N0} {p,3} {t,9:F1} {s,6:F2} " +
            $"{s / p,6:F2}");
        csv.AppendLine(string.Create(CultureInfo.InvariantCulture,
            $"{n},{p},{t:F1},{s:F3},{s / p:F3}"));
    }
}
File.WriteAllText("speedup.csv", csv.ToString());
Console.WriteLine("Таблицю збережено у файлі speedup.csv");
return 0;

static double Median(Action action, int runs = 5)
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

static class ParallelMergeSort
{
    // Менші фрагменти вигідніше сортувати послідовно.
    const int Threshold = 16_384;

    public static void Sort(int[] data, int threads)
    {
        int[] buffer = new int[data.Length];
        // Глибина розгалуження: 2^depth гілок ≈ threads.
        int depth = (int)Math.Ceiling(Math.Log2(threads));
        Sort(data, buffer, 0, data.Length, depth);
    }

    static void Sort(int[] a, int[] buffer, int lo, int hi, int depth)
    {
        if (hi - lo <= Threshold)
        {
            Array.Sort(a, lo, hi - lo);
            return;
        }
        int mid = lo + (hi - lo) / 2;
        if (depth > 0)
        {
            Parallel.Invoke(
                () => Sort(a, buffer, lo, mid, depth - 1),
                () => Sort(a, buffer, mid, hi, depth - 1));
        }
        else
        {
            Sort(a, buffer, lo, mid, 0);
            Sort(a, buffer, mid, hi, 0);
        }
        Merge(a, buffer, lo, mid, hi);
    }

    // Злиття двох відсортованих половин через буфер.
    static void Merge(int[] a, int[] buffer, int lo, int mid, int hi)
    {
        int i = lo, j = mid, k = lo;
        while (i < mid && j < hi)
            buffer[k++] = a[i] <= a[j] ? a[i++] : a[j++];
        while (i < mid) buffer[k++] = a[i++];
        while (j < hi) buffer[k++] = a[j++];
        Array.Copy(buffer, lo, a, lo, hi - lo);
    }
}
```

Половини масиву не перетинаються, тому дві гілки `Parallel.Invoke` пишуть у різні частини масиву й буфера без синхронізації. Для $p = 1$ глибина дорівнює 0 і сортування повністю послідовне – це час $T_{1}$. Файл CSV записується з `CultureInfo.InvariantCulture`, щоб числа мали десяткову крапку незалежно від регіональних налаштувань. Верхні злиття послідовні, тому ефективність швидко падає: на 16 потоках прискорення лише 4–6. Результат запуску `dotnet run -c Release -- 1,2,4,8,16`:

```
         n   p   Час, мс      S      E
 1 000 000   1      59,6   1,00   1,00
 1 000 000   2      34,9   1,71   0,85
 1 000 000   4      21,7   2,74   0,69
 1 000 000   8      16,2   3,68   0,46
 1 000 000  16      15,2   3,92   0,25
10 000 000   1     761,4   1,00   1,00
10 000 000   2     473,1   1,61   0,80
10 000 000   4     269,6   2,82   0,71
10 000 000   8     181,8   4,19   0,52
10 000 000  16     133,3   5,71   0,36
Таблицю збережено у файлі speedup.csv
```

## Типові помилки

Таблиця 6.4. Типові помилки паралелізму даних {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| неправильна сума, лічильник чи список після `Parallel.For` | гонитва на спільній змінній або колекції; локальний стан (`localInit`/`localFinally`), `Aggregate`, `Interlocked`, потокобезпечні колекції |
| паралельний цикл повільніший за послідовний | мала робота на ітерацію або `lock` у тілі; `Partitioner.Create` з діапазонами, винести синхронізацію з тіла, розпаралелити зовнішній цикл |
| результат PLINQ `Aggregate` щоразу інший або відрізняється від LINQ | операція не асоціативна чи не комутативна; використовувати асоціативну операцію або `AsOrdered` для некомутативної |
| порядок результатів PLINQ не збігається з джерелом | PLINQ типово не зберігає порядок; `AsOrdered()` або сортування результату |
| `Random` у паралельному циклі повертає нулі або однакові числа | спільний екземпляр `Random` не потокобезпечний; власний генератор на блок або `Random.Shared` |
| блок `catch` для конкретного типу винятку не спрацьовує | винятки циклу й PLINQ загорнуті в `AggregateException`; перебрати `InnerExceptions` |
| фільтр зображення дає смуги на межах частин | обробка на місці читає вже змінені сусідні пікселі; писати в новий масив |
| прискорення не зростає після 8 потоків | 8 фізичних ядер з SMT, обмеження пам’яті, послідовна частина; порівнювати з Амдалом, профілювати |
| `Parallel.ForEach` з асинхронною лямбдою завершується раніше за роботу | делегат `async` перетворюється на `async void`; використовувати `Parallel.ForEachAsync` |
