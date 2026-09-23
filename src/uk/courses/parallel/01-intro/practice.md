---
title: "Практика"
description: "Тема 1. Основи паралельних обчислень: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Прогнози Амдала й Густафсона

Модель прогнозу погоди витрачає 4 % часу на читання сітки й запис результатів (послідовно), а 96 % – на розрахунок клітинок сітки. Створити програму, яка в одній таблиці порівнює прогнози прискорення й ефективності за законами Амдала та Густафсона для 1–128 ядер і визначає, скільки ядер потрібно для прискорення в 20 разів за кожним законом.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// Модель погоди: 4 % часу – читання сітки й запис результатів
// (послідовно), 96 % – розрахунок клітинок сітки (паралельно).
const double Serial = 0.04;
int[] cores = [1, 2, 4, 8, 16, 32, 64, 128];

Console.WriteLine($"Послідовна частка s = {Serial:P0}");
Console.WriteLine(
    $"{"p",4} | {"Амдал S",8} {"E",5} | {"Густафсон S",11} {"E",5}");
Console.WriteLine(new string('-', 42));
foreach (int p in cores)
{
    double amdahl = 1 / (Serial + (1 - Serial) / p);
    double gustafson = Serial + (1 - Serial) * p;
    Console.WriteLine($"{p,4} | {amdahl,8:F2} {amdahl / p,5:P0} | " +
                      $"{gustafson,11:F2} {gustafson / p,5:P0}");
}

// Скільки ядер потрібно, щоб прискорити розрахунок у 20 разів?
const double Target = 20;
int needed = Enumerable.Range(1, 1024)
    .FirstOrDefault(p => 1 / (Serial + (1 - Serial) / p) >= Target);
Console.WriteLine(needed > 0
    ? $"Амдал: S ≥ {Target} потребує p = {needed}"
    : $"Амдал: S = {Target} недосяжне (межа {1 / Serial:F0})");
Console.WriteLine(
    $"Густафсон: S ≥ {Target} при p = " +
    $"{Math.Ceiling((Target - Serial) / (1 - Serial))}");
```

За законом Амдала розмір сітки фіксований, тому прискорення прямує до межі $1 / 0 {,} 04 = 25$, а ефективність швидко падає. За законом Густафсона сітка збільшується разом із кількістю ядер, і ефективність залишається близькою до 96 %. Метод `FirstOrDefault` повертає 0, якщо жодна кількість ядер до 1024 не дає потрібного прискорення. Для закону Густафсона кількість ядер отримано з рівності $s + p (1 - s) = 20$. Результат:

```
Послідовна частка s = 4%
   p |  Амдал S     E | Густафсон S     E
------------------------------------------
   1 |     1,00  100% |        1,00  100%
   2 |     1,92   96% |        1,96   98%
   4 |     3,57   89% |        3,88   97%
   8 |     6,25   78% |        7,72   96%
  16 |    10,00   62% |       15,40   96%
  32 |    14,29   45% |       30,76   96%
  64 |    18,18   28% |       61,48   96%
 128 |    21,05   16% |      122,92   96%
Амдал: S ≥ 20 потребує p = 96
Густафсон: S ≥ 20 при p = 21
```

## Приклад 2. Частка паралельного коду за етапами програми

Програма зчитує з текстового файлу 2 000 000 цілих чисел, для кожного числа обчислює кількість дільників і записує звіт у файл. Виміряти час кожного етапу, визначити частку етапу обчислень (його можна розпаралелити) і спрогнозувати за законом Амдала час виконання на 2–16 ядрах.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const string Input = "numbers.txt";
const string Output = "report.txt";
const int Count = 2_000_000;

// Підготовка вхідного файлу (не входить у вимірювання).
Random random = new(42);
File.WriteAllLines(Input,
    Enumerable.Range(0, Count).Select(_ => random.Next(2, 1_000_000)
        .ToString()));

var stages = new List<(string Name, double Ms)>();
Stopwatch sw = Stopwatch.StartNew();

int[] numbers = File.ReadAllLines(Input).Select(int.Parse).ToArray();
stages.Add(("Читання файлу", Lap(sw)));

int[] divisors = new int[numbers.Length];
for (int i = 0; i < numbers.Length; i++)
{
    divisors[i] = CountDivisors(numbers[i]);
}
stages.Add(("Обчислення", Lap(sw)));

File.WriteAllLines(Output,
    numbers.Zip(divisors, (n, d) => $"{n};{d}"));
stages.Add(("Запис звіту", Lap(sw)));

double total = stages.Sum(s => s.Ms);
foreach (var (name, ms) in stages)
{
    Console.WriteLine($"{name,-15} {ms,8:F0} мс {ms / total,6:P1}");
}
Console.WriteLine($"{"Разом",-15} {total,8:F0} мс");

// Паралелізується лише обчислення: f – його частка часу.
double f = stages[1].Ms / total;
Console.WriteLine($"Частка паралельного коду f = {f:P1}");
foreach (int p in new[] { 2, 4, 8, 16 })
{
    double s = 1 / ((1 - f) + f / p);
    Console.WriteLine(
        $"p = {p,2}: S = {s,5:F2}, прогноз {total / s,6:F0} мс");
}

static double Lap(Stopwatch sw)
{
    double ms = sw.Elapsed.TotalMilliseconds;
    sw.Restart();
    return ms;
}

static int CountDivisors(int n)
{
    int count = 0;
    for (int d = 1; d * d <= n; d++)
    {
        if (n % d == 0) count += d * d == n ? 1 : 2;
    }
    return count;
}
```

Метод `Lap` повертає час від попередньої позначки й перезапускає секундомір, тому кожен етап вимірюється окремо. Генератор `Random` із зерном 42 створює однаковий файл під час кожного запуску. Етапи читання й запису обмежені швидкістю диска та розбором рядків, тому вважаються послідовними. Результат:

```
Читання файлу        201 мс   8,9%
Обчислення          1728 мс  76,7%
Запис звіту          324 мс  14,4%
Разом               2252 мс
Частка паралельного коду f = 76,7%
p =  2: S =  1,62, прогноз   1388 мс
p =  4: S =  2,36, прогноз    956 мс
p =  8: S =  3,04, прогноз    740 мс
p = 16: S =  3,56, прогноз    632 мс
```

Обчислення дільників триває понад три чверті часу, тому саме цей етап має сенс розпаралелювати. Проте навіть на нескінченній кількості ядер прискорення не перевищить $1 / (1 - 0 {,} 767) \approx 4 {,} 3$, а час – не стане меншим за 525 мс: читання та запис залишаються послідовними. Щоб прискорити програму далі, довелося б пришвидшувати введення-виведення, наприклад читати файл блоками й розбирати числа паралельно.

## Приклад 3. Вплив кешу на час обходу масиву

Обчислити суму елементів квадратної матриці `int[n, n]` двома способами: за рядками і за стовпцями. Порівняти час для розмірів від 250 до 8000 і пояснити різницю з погляду ієрархії пам’яті.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine($"{"n",6} {"Пам’ять",9} {"Рядки, мс",10} " +
                  $"{"Стовпці, мс",12} {"Різниця",8}");
foreach (int n in new[] { 250, 1_000, 2_000, 4_000, 8_000 })
{
    int[,] matrix = new int[n, n];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            matrix[i, j] = (i + j) % 10;

    SumByRows(matrix);                     // прогрівання
    SumByColumns(matrix);
    double rows = Median(() => SumByRows(matrix));
    double columns = Median(() => SumByColumns(matrix));
    string size = $"{n * n * sizeof(int) / 1048576.0:F1} МБ";
    Console.WriteLine($"{n,6} {size,9} {rows,10:F2} " +
                      $"{columns,12:F2} {columns / rows,7:F1}×");
}

// Порядок обходу збігається з розміщенням у пам’яті: рядок за рядком.
static long SumByRows(int[,] a)
{
    long sum = 0;
    int n = a.GetLength(0);
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            sum += a[i, j];
    return sum;
}

// Сусідні звернення віддалені на n елементів – часті промахи кешу.
static long SumByColumns(int[,] a)
{
    long sum = 0;
    int n = a.GetLength(0);
    for (int j = 0; j < n; j++)
        for (int i = 0; i < n; i++)
            sum += a[i, j];
    return sum;
}

static double Median(Func<long> action)
{
    double[] times = new double[5];
    for (int k = 0; k < times.Length; k++)
    {
        long start = Stopwatch.GetTimestamp();
        action();
        times[k] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    }
    Array.Sort(times);
    return times[2];
}
```

Прямокутний масив .NET зберігається в пам’яті рядок за рядком. Обхід за рядками звертається до сусідніх комірок, які вже завантажено в кеш разом із кеш-лінією, а процесор ще й заздалегідь підвантажує наступні лінії. Обхід за стовпцями щоразу «перестрибує» на $n$ елементів уперед. Результат:

```
   n   Пам’ять  Рядки, мс  Стовпці, мс  Різниця
 250    0,2 МБ       0,05         0,06     1,2×
1000    3,8 МБ       0,67         0,79     1,2×
2000   15,3 МБ       2,76         8,28     3,0×
4000   61,0 МБ      11,28        71,37     6,3×
8000  244,1 МБ      44,93       361,69     8,1×
```

Поки матриця вміщується в кеш L2 (512 КБ) або L3 (16 МБ), різниця невелика. Коли розмір у десятки й сотні мегабайтів перевищує кеш L3, обхід за стовпцями стає в кілька разів повільнішим. Для паралельних програм це означає: обробку даних слід організовувати так, щоб кожен потік звертався до пам’яті послідовно.
