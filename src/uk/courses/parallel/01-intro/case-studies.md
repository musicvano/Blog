---
title: "Приклади та типові помилки"
description: "Тема 1. Основи паралельних обчислень: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

Усі наведені результати отримано на комп’ютері з процесором Intel Core i9-11900KF (8 ядер, 16 логічних процесорів) у конфігурації Release. На іншому комп’ютері час буде іншим, але співвідношення величин зберігаються.

### Відомості про систему

Програма виводить відомості про операційну систему, середовище .NET, кількість логічних процесорів, доступну пам’ять і таймер. Такий звіт варто додавати до результатів будь-яких вимірювань.

```cs
using System.Diagnostics;
using System.Runtime;
using System.Runtime.InteropServices;

Console.OutputEncoding = System.Text.Encoding.UTF8;

GCMemoryInfo memory = GC.GetGCMemoryInfo();
double gb = memory.TotalAvailableMemoryBytes / Math.Pow(1024, 3);

Print("Операційна система", RuntimeInformation.OSDescription);
Print("Архітектура ОС", RuntimeInformation.OSArchitecture);
Print("Архітектура процесу", RuntimeInformation.ProcessArchitecture);
Print("64-розрядний процес", Environment.Is64BitProcess);
Print("Середовище .NET", RuntimeInformation.FrameworkDescription);
Print("Ідентифікатор RID", RuntimeInformation.RuntimeIdentifier);
Print("Логічних процесорів", Environment.ProcessorCount);
Print("Доступна пам’ять, ГБ", $"{gb:F1}");
Print("Серверний збирач сміття", GCSettings.IsServerGC);
Print("Таймер високої точності", Stopwatch.IsHighResolution);
Print("Тактів Stopwatch за 1 с", $"{Stopwatch.Frequency:N0}");

#if DEBUG
Print("Конфігурація", "Debug");
#else
Print("Конфігурація", "Release");
#endif

static void Print(string name, object value) =>
    Console.WriteLine($"{name,-26}{value}");
```

Клас `RuntimeInformation` описує платформу, `Environment.ProcessorCount` – кількість логічних процесорів, доступних процесу, а `GC.GetGCMemoryInfo` повідомляє обсяг пам’яті, який бачить збирач сміття. Директива `#if DEBUG` дозволяє переконатися, що вимірювання виконуються в конфігурації Release. Результат:

```
Операційна система        Microsoft Windows 10.0.26200
Архітектура ОС            X64
Архітектура процесу       X64
64-розрядний процес       True
Середовище .NET           .NET 10.0.12
Ідентифікатор RID         win-x64
Логічних процесорів       16
Доступна пам’ять, ГБ      63,8
Серверний збирач сміття   False
Таймер високої точності   True
Тактів Stopwatch за 1 с   10 000 000
Конфігурація              Release
```

### Калькулятор Амдала

Програма отримує в аргументі командного рядка частку паралельного коду $f$ (`0,9` або `90%`) і виводить таблицю прискорення та ефективності для $p = 1 , 2 , 4 , \dots , 64$.

```cs
using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// Частка паралельного коду f задається аргументом: 0,9 або 90%.
double f = args.Length > 0 ? ParseFraction(args[0]) : 0.9;
if (double.IsNaN(f))
{
    Console.Error.WriteLine("Частка f: від 0 до 1 або 0–100%.");
    return 1;
}

Console.WriteLine($"Частка паралельного коду f = {f:P0}");
Console.WriteLine($"{"p",4} {"S(p)",8} {"E(p)",8}");
for (int p = 1; p <= 64; p *= 2)
{
    double speedup = Amdahl(f, p);
    double efficiency = speedup / p;
    Console.WriteLine($"{p,4} {speedup,8:F2} {efficiency,8:P0}");
}

string limit = f < 1 ? $"{1 / (1 - f):F1}" : "∞";
Console.WriteLine($"Межа прискорення 1/(1 - f) = {limit}");
return 0;

// Закон Амдала: S = 1 / ((1 - f) + f / p).
static double Amdahl(double f, int p) => 1 / ((1 - f) + f / p);

static double ParseFraction(string text)
{
    bool percent = text.EndsWith('%');
    string number = text.TrimEnd('%').Replace(',', '.');
    if (!double.TryParse(number, NumberStyles.Float,
            CultureInfo.InvariantCulture, out double value))
    {
        return double.NaN;
    }
    if (percent) value /= 100;
    return value is >= 0 and <= 1 ? value : double.NaN;
}
```

Метод `ParseFraction` приймає десяткову кому або крапку й знак відсотка, а некоректне значення позначає `double.NaN`; тоді програма виводить повідомлення в потік помилок і повертає код 1. Формат `P0` виводить частку як відсотки. Результат запуску без аргументів ($f = 0 {,} 9$):

```
Частка паралельного коду f = 90%
   p     S(p)     E(p)
   1     1,00     100%
   2     1,82      91%
   4     3,08      77%
   8     4,71      59%
  16     6,40      40%
  32     7,80      24%
  64     8,77      14%
Межа прискорення 1/(1 - f) = 10,0
```

### Правильне вимірювання часу

Програма обчислює суму гармонічного ряду $H_{n} = 1 + 1 / 2 + \dots + 1 / n$ для $n = 2 \cdot 10^{8}$, окремо вимірює перший запуск, виконує прогрівання й серію з 10 вимірювань і виводить мінімум, медіану, максимум і відносне стандартне відхилення.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int N = 200_000_000;
const int Runs = 10;

// Перший («холодний») запуск містить JIT-компіляцію.
Stopwatch sw = Stopwatch.StartNew();
double sum = HarmonicSum(N);
sw.Stop();
double first = sw.Elapsed.TotalMilliseconds;
Console.WriteLine($"H(n) = {sum:F6}");
Console.WriteLine($"Перший запуск: {first:F1} мс");

// Прогрівання, потім серія вимірювань.
for (int i = 0; i < 3; i++) HarmonicSum(N);

double[] times = new double[Runs];
for (int i = 0; i < Runs; i++)
{
    long start = Stopwatch.GetTimestamp();
    HarmonicSum(N);
    times[i] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
}

Array.Sort(times);
double median = (times[Runs / 2 - 1] + times[Runs / 2]) / 2;
double mean = times.Average();
double sd = Math.Sqrt(times.Sum(t => (t - mean) * (t - mean))
                      / (Runs - 1));
Console.WriteLine($"Запусків: {Runs}");
Console.WriteLine($"Мінімум:  {times[0],8:F1} мс");
Console.WriteLine($"Медіана:  {median,8:F1} мс");
Console.WriteLine($"Максимум: {times[^1],8:F1} мс");
Console.WriteLine($"Відхилення: {sd / mean,6:P1}");

static double HarmonicSum(int n)
{
    double sum = 0;
    for (int k = 1; k <= n; k++)
    {
        sum += 1.0 / k;
    }
    return sum;
}
```

Для парної кількості запусків медіана – середнє двох центральних значень відсортованого масиву. Результат у конфігурації Release:

```
H(n) = 19,691044
Перший запуск: 163,4 мс
Запусків: 10
Мінімум:     159,1 мс
Медіана:     160,3 мс
Максимум:    161,8 мс
Відхилення:   0,6%
```

Той самий код у конфігурації Debug:

```
H(n) = 19,691044
Перший запуск: 367,0 мс
Запусків: 10
Мінімум:     360,3 мс
Медіана:     362,1 мс
Максимум:    365,1 мс
Відхилення:   0,4%
```

Неоптимізований код Debug виконується більш ніж удвічі повільніше, тому порівнювати час запусків у різних конфігураціях не можна. Короткий цикл без викликів інших методів швидко оптимізується, тому різниця першого запуску тут невелика; у програмах із багатьма методами вона помітніша.

### Метрика Карпа–Флатта

Програма обчислює число $\pi$ як інтеграл $\int_{0}^{1} 4 / (1 + x^{2}) \mathrm{d} x$ методом середніх прямокутників. Інтервал ділиться на $p$ частин, які обчислюються одночасно; метод `Parallel.For` тут лише засіб розподілу частин між потоками (детально – у темі 6). Для кожного $p$ виводяться медіана часу, прискорення, ефективність і метрика Карпа–Флатта.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const long Steps = 400_000_000;
int maxThreads = Environment.ProcessorCount;

ComputePi(Steps, 1);                        // прогрівання
double t1 = MedianTime(() => ComputePi(Steps, 1));
Console.WriteLine($"π ≈ {ComputePi(Steps, 1):F10}");
Console.WriteLine($"{"p",3} {"Tp, мс",9} {"S",6} {"E",6} {"e",7}");
for (int p = 1; p <= maxThreads; p *= 2)
{
    double tp = p == 1 ? t1 : MedianTime(() => ComputePi(Steps, p));
    double s = t1 / tp;
    string e = p == 1 ? "–" : $"{KarpFlatt(s, p):F3}";
    Console.WriteLine($"{p,3} {tp,9:F1} {s,6:F2} {s / p,6:P0} {e,7}");
}

// Метрика Карпа–Флатта: e = (1/S - 1/p) / (1 - 1/p).
static double KarpFlatt(double s, int p) =>
    (1 / s - 1.0 / p) / (1 - 1.0 / p);

// π як інтеграл 4/(1 + x²) на [0; 1] методом середніх прямокутників.
// Інтервал ділиться на p частин, кожна частина – окремий потік
// (Parallel.For детально розглядається в темі 6).
static double ComputePi(long steps, int p)
{
    double h = 1.0 / steps;
    double[] parts = new double[p];
    Parallel.For(0, p,
        new ParallelOptions { MaxDegreeOfParallelism = p },
        part =>
        {
            long from = steps / p * part;
            long to = part == p - 1 ? steps : from + steps / p;
            double sum = 0;
            for (long i = from; i < to; i++)
            {
                double x = (i + 0.5) * h;
                sum += 4 / (1 + x * x);
            }
            parts[part] = sum;
        });
    return parts.Sum() * h;
}

static double MedianTime(Action action)
{
    double[] times = new double[5];
    for (int i = 0; i < times.Length; i++)
    {
        long start = Stopwatch.GetTimestamp();
        action();
        times[i] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    }
    Array.Sort(times);
    return times[times.Length / 2];
}
```

Кожна частина накопичує суму в локальній змінній `sum` і записує результат у спільний масив `parts` лише один раз, тому потоки не заважають один одному. Результат:

```
π ≈ 3,1415926536
  p    Tp, мс      S      E       e
  1     327,1   1,00   100%       –
  2     164,0   1,99   100%   0,003
  4      87,6   3,74    93%   0,024
  8      63,0   5,20    65%   0,077
 16      48,8   6,70    42%   0,093
```

На двох і чотирьох потоках прискорення майже лінійне, а метрика Карпа–Флатта мала: задача добре розпаралелюється. Починаючи з восьми потоків $e$ зростає, тобто прискорення обмежують уже не послідовний код, а накладні витрати й конкуренція за ресурси. На 16 потоках прискорення лише 6,7: логічних процесорів 16, але фізичних ядер – 8, і два потоки одного ядра ділять його обчислювальні блоки.

## Типові помилки

Таблиця 1.3. Типові помилки під час оцінювання паралельних програм {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| паралельна програма повільніша за послідовну | надто дрібні паралельні частини, накладні витрати перевищують виграш; збільшити обсяг роботи в кожній частині |
| неправдоподібно великий час першого вимірювання | JIT-компіляція та ініціалізація; виконати прогрівання й не враховувати перший запуск |
| прискорення значно менше, ніж очікувалося | вимірювання в конфігурації Debug; перейти на Release |
| результати сильно різняться між запусками | фонові програми, енергозбереження, один запуск; закрити програми, увімкнути режим *Best performance*, брати медіану кількох запусків |
| прискорення не зростає після 8 потоків на 16 логічних процесорах | логічні процесори SMT ділять фізичні ядра; порівнювати з кількістю фізичних ядер |
| прискорення перевищує 1/(1 − f) | неправильно визначено частку $f$ або повільний послідовний варіант; вимірювати $T_{1}$ для найкращого послідовного алгоритму |
| час виміряно через `DateTime.Now` | системний годинник не призначений для інтервалів; використовувати `Stopwatch` |
| `Environment.ProcessorCount` вважають кількістю ядер | повертається кількість логічних процесорів; фізичні ядра дивитися в диспетчері завдань або `lscpu` |
