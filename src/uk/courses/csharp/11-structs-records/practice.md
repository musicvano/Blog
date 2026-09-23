---
title: "Практика"
description: "Тема 11. Структури, записи, кортежі: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Найближча пара точок

Оголосити незмінну структуру-запис `Point` з методом обчислення відстані. Для масиву точок знайти пару з найменшою відстанню та показати рівність значень і вираз `with`.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Point[] stops =
[
    new(0, 0), new(4.5, 1), new(2, 6),
    new(5, 1.5), new(-3, 2), new(2.4, 5.2),
];

(int First, int Second, double Distance) best =
    (-1, -1, double.MaxValue);
for (int i = 0; i < stops.Length; i++)
{
    for (int j = i + 1; j < stops.Length; j++)
    {
        double d = stops[i].DistanceTo(stops[j]);
        if (d < best.Distance)
        {
            best = (i, j, d);
        }
    }
}

Console.WriteLine(
    $"Найближчі: {stops[best.First]} і {stops[best.Second]}");
Console.WriteLine($"Відстань: {best.Distance:F3}");

// Рівність значень і копія з іншою координатою.
Point a = new(2, 6);
Point b = a with { Y = 7 };
Console.WriteLine($"{a} == {stops[2]}: {a == stops[2]}");
Console.WriteLine($"{a} == {b}: {a == b}");

readonly record struct Point(double X, double Y)
{
    public double DistanceTo(Point other) =>
        Math.Sqrt((X - other.X) * (X - other.X)
            + (Y - other.Y) * (Y - other.Y));

    public override string ToString() => $"({X}; {Y})";
}
```

Структура-запис `readonly record struct` автоматично отримує `==`, `Equals` і `GetHashCode`, а власний `ToString` замінює згенерований. Найкращу пару зберігає кортеж з іменованими елементами: кожне присвоєння `best = (i, j, d)` оновлює всі три значення. Вираз `a with { Y = 7 }` створює нову точку, не змінюючи `a`. Результат:

```
Найближчі: (4,5; 1) і (5; 1,5)
Відстань: 0,707
(2; 6) == (2; 6): True
(2; 6) == (2; 7): False
```

## Приклад 2. Розбір пори року

Оголосити перелічення `Season` із нумерацією від 1 і прочитати пори року, введені користувачем, без урахування регістру. Некоректне введення, зокрема числа поза діапазоном, відхиляти.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

string names = string.Join(", ", Enum.GetNames<Season>());
Console.WriteLine($"Пори року: {names}");
while (true)
{
    Console.Write("Пора року (порожній рядок – вихід): ");
    string? input = Console.ReadLine();
    if (string.IsNullOrWhiteSpace(input))
    {
        break;
    }

    // TryParse приймає й числа, тому додатково перевіряємо IsDefined.
    if (Enum.TryParse(input.Trim(), true, out Season season)
        && Enum.IsDefined(season))
    {
        Console.WriteLine(
            $"  {season} ({(int)season}): {Describe(season)}");
    }
    else
    {
        Console.WriteLine($"  «{input}» – невідома пора року");
    }
}

static string Describe(Season season) => season switch
{
    Season.Winter => "грудень – лютий",
    Season.Spring => "березень – травень",
    Season.Summer => "червень – серпень",
    Season.Autumn => "вересень – листопад",
    _ => throw new ArgumentOutOfRangeException(nameof(season)),
};

enum Season
{
    Winter = 1,
    Spring,
    Summer,
    Autumn,
}
```

Перша константа має значення 1, наступні отримують 2, 3, 4. Другий аргумент `true` методу `Enum.TryParse` вимикає врахування регістру. Метод приймає й числовий рядок, тому `"2"` розбирається як `Spring`, а `"7"` – як значення без назви, яке відхиляє `Enum.IsDefined`. Гілка `_` виразу `switch` усуває попередження CS8524. Результат для введення `winter`, `SUMMER`, `7`, `2`, `autumn` і порожнього рядка:

```
Пори року: Winter, Spring, Summer, Autumn
Пора року (порожній рядок – вихід): winter
  Winter (1): грудень – лютий
Пора року (порожній рядок – вихід): SUMMER
  Summer (3): червень – серпень
Пора року (порожній рядок – вихід): 7
  «7» – невідома пора року
Пора року (порожній рядок – вихід): 2
  Spring (2): березень – травень
Пора року (порожній рядок – вихід): autumn
  Autumn (4): вересень – листопад
Пора року (порожній рядок – вихід):
```

## Приклад 3. Статистика вимірювань

Створити метод, який за один прохід масиву повертає мінімум, максимум і середнє значення кортежем. Показати доступ до елементів за іменами, деконструкцію, порівняння й обмін значень.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

double[] temperatures = [12.5, 15.1, 9.8, 17.4, 14.0, 11.2, 16.3];

// Змінна кортежу з іменованими елементами.
var stats = GetStats(temperatures);
Console.WriteLine($"Кортеж: {stats}");
Console.WriteLine($"Середня: {stats.Average:F2} °C");

// Деконструкція в окремі змінні; середнє відкинуто.
var (min, max, _) = GetStats(temperatures);
Console.WriteLine($"Діапазон: {min} … {max}, розмах {max - min:F1}");

// Порівняння кортежів поелементне.
Console.WriteLine($"Збіг: {(min, max) == (9.8, 17.4)}");

// Обмін значень без тимчасової змінної.
(min, max) = (max, min);
Console.WriteLine($"Після обміну: min = {min}, max = {max}");

static (double Min, double Max, double Average) GetStats(
    double[] values)
{
    if (values.Length == 0)
    {
        throw new ArgumentException("масив порожній", nameof(values));
    }

    double min = values[0], max = values[0], sum = 0;
    foreach (double v in values)
    {
        min = Math.Min(min, v);
        max = Math.Max(max, v);
        sum += v;
    }
    return (min, max, sum / values.Length);
}
```

Метод оголошує тип результату `(double Min, double Max, double Average)`, тому звертання `stats.Average` зрозуміле без коментарів. Під час виведення кортеж форматується як `(…, …, …)`. Деконструкція `var (min, max, _)` створює дві змінні й відкидає середнє. Порівняння кортежів виконується поелементно. Результат:

```
Кортеж: (9,8, 17,4, 13,757142857142858)
Середня: 13,76 °C
Діапазон: 9,8 … 17,4, розмах 7,6
Збіг: True
Після обміну: min = 17,4, max = 9,8
```
