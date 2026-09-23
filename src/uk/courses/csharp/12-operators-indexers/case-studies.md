---
title: "Приклади та типові помилки"
description: "Тема 12. Операції та індексатори: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

### Раціональні дроби

Незмінна структура `Fraction` скорочує дріб у конструкторі й перевантажує арифметичні операції, операції порівняння та перетворення.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Fraction a = new(1, 2);
Fraction b = new(3, 4);

Console.WriteLine($"{a} + {b} = {a + b}");
Console.WriteLine($"{a} - {b} = {a - b}");
Console.WriteLine($"{a} * {b} = {a * b}");
Console.WriteLine($"{a} / {b} = {a / b}");
Console.WriteLine($"-({b}) = {-b}");
Console.WriteLine($"{a} + 2 = {a + 2}");           // int → Fraction
Console.WriteLine($"{b} > {a}: {b > a}");
Console.WriteLine($"2/4 == {a}: {new Fraction(2, 4) == a}");

double value = (double)(a + b);                    // явне
Console.WriteLine($"(double)(a + b) = {value}");

readonly struct Fraction : IEquatable<Fraction>
{
    public Fraction(long numerator, long denominator)
    {
        if (denominator == 0)
        {
            throw new DivideByZeroException("знаменник дорівнює 0");
        }
        long gcd = Gcd(Math.Abs(numerator), Math.Abs(denominator));
        int sign = denominator < 0 ? -1 : 1;
        Numerator = sign * numerator / gcd;
        Denominator = sign * denominator / gcd;
    }

    public long Numerator { get; }
    public long Denominator { get; }

    public static Fraction operator +(Fraction x, Fraction y) =>
        new(x.Numerator * y.Denominator + y.Numerator * x.Denominator,
            x.Denominator * y.Denominator);

    public static Fraction operator -(Fraction x) =>
        new(-x.Numerator, x.Denominator);

    public static Fraction operator -(Fraction x, Fraction y) =>
        x + -y;

    public static Fraction operator *(Fraction x, Fraction y) =>
        new(x.Numerator * y.Numerator, x.Denominator * y.Denominator);

    public static Fraction operator /(Fraction x, Fraction y) =>
        new(x.Numerator * y.Denominator, x.Denominator * y.Numerator);

    // Порівняння оголошують парами.
    public static bool operator ==(Fraction x, Fraction y) =>
        x.Equals(y);
    public static bool operator !=(Fraction x, Fraction y) =>
        !x.Equals(y);
    public static bool operator <(Fraction x, Fraction y) =>
        x.Numerator * y.Denominator < y.Numerator * x.Denominator;
    public static bool operator >(Fraction x, Fraction y) => y < x;

    // Перетворення: з цілого без втрат, у double – явно.
    public static implicit operator Fraction(long n) => new(n, 1);
    public static explicit operator double(Fraction f) =>
        (double)f.Numerator / f.Denominator;

    public bool Equals(Fraction other) =>
        Numerator == other.Numerator
        && Denominator == other.Denominator;
    public override bool Equals(object? obj) =>
        obj is Fraction other && Equals(other);
    public override int GetHashCode() =>
        HashCode.Combine(Numerator, Denominator);
    public override string ToString() => $"{Numerator}/{Denominator}";

    private static long Gcd(long x, long y) =>
        y == 0 ? Math.Max(x, 1) : Gcd(y, x % y);
}
```

Віднімання виражене через додавання й унарний мінус, а операція `>` – через `<`. Неявне перетворення з `long` дозволяє вираз `a + 2`, а перетворення в `double` явне, бо можлива втрата точності. Рівність `2/4 == 1/2` виконується, бо обидва дроби зберігаються скороченими. Результат:

```
1/2 + 3/4 = 5/4
1/2 - 3/4 = -1/4
1/2 * 3/4 = 3/8
1/2 / 3/4 = 2/3
-(3/4) = -3/4
1/2 + 2 = 5/2
3/4 > 1/2: True
2/4 == 1/2: True
(double)(a + b) = 1,25
```

### Матриця

Клас `Matrix` зберігає двовимірний масив, надає індексатор `[row, col]` з перевіркою меж та операції додавання й множення з перевіркою розмірів.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Matrix a = new(new double[,] { { 1, 2, 3 }, { 4, 5, 6 } });
Matrix b = new(new double[,] { { 1, 0 }, { 0, 1 }, { 2, -1 } });

a[1, 2] = 7;                        // запис через індексатор
Console.WriteLine($"a[1, 2] = {a[1, 2]}");
Console.WriteLine($"A (2×3):\n{a}");
Console.WriteLine($"A + A:\n{a + a}");
Console.WriteLine($"A * B (2×2):\n{a * b}");

try
{
    Console.WriteLine(a + b);
}
catch (ArgumentException e)
{
    Console.WriteLine($"Помилка: {e.Message}");
}

class Matrix
{
    private readonly double[,] cells;

    public Matrix(int rows, int cols) =>
        cells = new double[rows, cols];

    public Matrix(double[,] values) =>
        cells = (double[,])values.Clone();

    public int Rows => cells.GetLength(0);
    public int Cols => cells.GetLength(1);

    // Індексатор з двома параметрами.
    public double this[int row, int col]
    {
        get => cells[Check(row, Rows), Check(col, Cols)];
        set => cells[Check(row, Rows), Check(col, Cols)] = value;
    }

    public static Matrix operator +(Matrix x, Matrix y)
    {
        if (x.Rows != y.Rows || x.Cols != y.Cols)
        {
            throw new ArgumentException("різні розміри матриць");
        }
        Matrix result = new(x.Rows, x.Cols);
        for (int i = 0; i < x.Rows; i++)
            for (int j = 0; j < x.Cols; j++)
                result[i, j] = x[i, j] + y[i, j];
        return result;
    }

    public static Matrix operator *(Matrix x, Matrix y)
    {
        if (x.Cols != y.Rows)
        {
            throw new ArgumentException("стовпців A ≠ рядків B");
        }
        Matrix result = new(x.Rows, y.Cols);
        for (int i = 0; i < x.Rows; i++)
            for (int j = 0; j < y.Cols; j++)
                for (int k = 0; k < x.Cols; k++)
                    result[i, j] += x[i, k] * y[k, j];
        return result;
    }

    public override string ToString()
    {
        var text = new System.Text.StringBuilder();
        for (int i = 0; i < Rows; i++)
        {
            for (int j = 0; j < Cols; j++)
            {
                text.Append($"{cells[i, j],6}");
            }
            text.AppendLine();
        }
        return text.ToString();
    }

    private static int Check(int index, int size) =>
        index >= 0 && index < size
            ? index
            : throw new IndexOutOfRangeException($"індекс {index}");
}
```

Конструктор копіює переданий масив методом `Clone`, тому зміни вихідного масиву не впливають на матрицю. Операції звертаються до елементів через індексатор, який перевіряє межі. Для додавання розміри мають збігатися, для множення кількість стовпців першої матриці має дорівнювати кількості рядків другої. Результат:

```
a[1, 2] = 7
A (2×3):
     1     2     3
     4     5     7

A + A:
     2     4     6
     8    10    14

A * B (2×2):
     7    -1
    18    -2

Помилка: різні розміри матриць
```

### Шахівниця

Клас `ChessBoard` має два індексатори: за номерами рядка й стовпця та за шаховою нотацією на кшталт `"e4"`.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

ChessBoard board = new();
board["e1"] = 'K';
board["d1"] = 'Q';
board["e2"] = 'P';
board["e8"] = 'k';

board.Move("e2", "e4");
Console.WriteLine(board);
Console.WriteLine($"На e4: {board["e4"]}, на e2: {board["e2"]}");
Console.WriteLine($"Рядок 0, стовпець 3: {board[0, 3]}");

foreach (string cell in new[] { "E8", "i2", "a9", "b" })
{
    try
    {
        Console.WriteLine($"{cell}: {board[cell]}");
    }
    catch (ArgumentException e)
    {
        Console.WriteLine($"{cell}: {e.Message}");
    }
}

class ChessBoard
{
    private readonly char[,] cells = new char[8, 8];

    public ChessBoard()
    {
        for (int r = 0; r < 8; r++)
            for (int c = 0; c < 8; c++)
                cells[r, c] = '.';
    }

    // Індексатор за номерами: рядок 0 – горизонталь 1.
    public char this[int row, int col]
    {
        get => cells[row, col];
        set => cells[row, col] = value;
    }

    // Рядковий індексатор за шаховою нотацією.
    public char this[string square]
    {
        get
        {
            var (row, col) = Parse(square);
            return cells[row, col];
        }
        set
        {
            var (row, col) = Parse(square);
            cells[row, col] = value;
        }
    }

    public void Move(string from, string to)
    {
        this[to] = this[from];
        this[from] = '.';
    }

    public override string ToString()
    {
        var text = new System.Text.StringBuilder();
        for (int r = 7; r >= 0; r--)
        {
            text.Append($"{r + 1} ");
            for (int c = 0; c < 8; c++)
            {
                text.Append(cells[r, c]).Append(' ');
            }
            text.AppendLine();
        }
        return text.Append("  a b c d e f g h").ToString();
    }

    private static (int Row, int Col) Parse(string square)
    {
        if (square is not [var file, var rank])
        {
            throw new ArgumentException("потрібно поле, як e4");
        }
        int col = char.ToLower(file) - 'a';
        int row = rank - '1';
        if (col is < 0 or > 7 || row is < 0 or > 7)
        {
            throw new ArgumentException("поле поза дошкою");
        }
        return (row, col);
    }
}
```

Рядковий індексатор розбирає позначення списковим шаблоном `[var file, var rank]` (тема 4), який перевіряє, що рядок має рівно два символи, і перетворює літеру й цифру на індекси. Метод `Move` використовує індексатор через `this[to]`. Регістр літери не має значення, а некоректні поля спричиняють `ArgumentException`. Результат:

```
8 . . . . k . . .
7 . . . . . . . .
6 . . . . . . . .
5 . . . . . . . .
4 . . . . P . . .
3 . . . . . . . .
2 . . . . . . . .
1 . . . Q K . . .
  a b c d e f g h
На e4: P, на e2: .
Рядок 0, стовпець 3: Q
E8: k
i2: поле поза дошкою
a9: поле поза дошкою
b: потрібно поле, як e4
```

### Розширення рядків і дат

Класичні методи розширення додають до `string` підрахунок слів і заголовний регістр, а блоки `extension` додають до `DateTime` властивість `IsWeekend`, метод `AddWorkDays` і статичний метод `ParseUkrainian`.

```cs
using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

string title = "об’єктно-орієнтоване   програмування мовою c#";
Console.WriteLine(title.ToTitleCase());
Console.WriteLine($"Слів: {title.WordCount()}");

DateTime start = DateTime.ParseUkrainian("18.09.2026");
for (int i = 0; i < 4; i++)
{
    DateTime day = start.AddDays(i);
    string kind = day.IsWeekend ? "вихідний" : "робочий";
    Console.WriteLine($"{day:dd.MM ddd} – {kind}");
}
Console.WriteLine($"+3 робочі дні: {start.AddWorkDays(3):dd.MM}");

// Класичні методи розширення: статичний клас і параметр this.
static class StringExtensions
{
    public static int WordCount(this string text) =>
        text.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length;

    public static string ToTitleCase(this string text)
    {
        string[] words =
            text.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        for (int i = 0; i < words.Length; i++)
        {
            words[i] = char.ToUpper(words[i][0]) + words[i][1..];
        }
        return string.Join(' ', words);
    }
}

// Блоки extension (C# 14): властивості та статичні члени.
static class DateExtensions
{
    extension(DateTime date)
    {
        public bool IsWeekend =>
            date.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday;

        public DateTime AddWorkDays(int days)
        {
            DateTime result = date;
            while (days > 0)
            {
                result = result.AddDays(1);
                if (!result.IsWeekend)
                {
                    days--;
                }
            }
            return result;
        }
    }

    extension(DateTime)
    {
        public static DateTime ParseUkrainian(string text) =>
            DateTime.ParseExact(text, "dd.MM.yyyy",
                CultureInfo.InvariantCulture);
    }
}
```

Метод `AddWorkDays` усередині блоку використовує властивість-розширення `IsWeekend` так само, як звичайну властивість. Статичний член викликається через ім’я типу: `DateTime.ParseUkrainian(…)`. Формат `ddd` виводить скорочену назву дня тижня згідно з культурою uk-UA. Результат:

```
Об’єктно-орієнтоване Програмування Мовою C#
Слів: 4
18.09 пт – робочий
19.09 сб – вихідний
20.09 нд – вихідний
21.09 пн – робочий
+3 робочі дні: 23.09
```

## Типові помилки

Таблиця 12.1. Типові помилки під час перевантаження операцій, роботи з індексаторами та розширеннями {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| CS0216: потрібна парна операція | оголошено лише `==` або `<`; оголосити `!=` або `>` відповідно |
| CS0660 / CS0661 | `==` без `Equals` і `GetHashCode`; перевизначити їх узгоджено з `==` |
| неочевидна семантика операції | `cart + product` чи `file - 1`; використати метод з осмисленою назвою |
| неявне перетворення з втратою даних | `implicit` для перетворення, що може втратити точність або згенерувати виняток; оголосити `explicit` |
| `a * 2` компілюється, а `2 * a` – ні | компілятор не переставляє операнди; оголосити обидві версії операції |
| індексатор без перевірки меж | помилки виявляються далеко від причини; перевіряти індекси й генерувати виняток |
| метод розширення не викликається | не підключено простір імен або тип має метод екземпляра з тією самою сигнатурою |
| розширення замість методу власного класу | логіка розпорошена по статичних класах; додати метод у сам клас |
