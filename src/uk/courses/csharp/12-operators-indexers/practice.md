---
title: "Практика"
description: "Тема 12. Операції та індексатори: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Вектор на площині

Оголосити незмінну структуру `Vector2` з операціями додавання, віднімання, унарного мінуса, множення на число, скалярним добутком і операціями `==`/`!=`. Обчислити рівнодійну кількох сил.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Vector2 wind = new(3, -1);
Vector2 engine = new(10, 4);
Vector2 drag = -0.5 * engine;

Vector2 total = wind + engine + drag;
Console.WriteLine($"Рівнодійна: {total}, модуль {total.Length:F2}");
Console.WriteLine($"Двигун − вітер: {engine - wind}");

Vector2 east = new(1, 0);
Vector2 north = new(0, 1);
Console.WriteLine($"east · north = {Vector2.Dot(east, north)}");
double angle = Vector2.AngleDegrees(east, total);
Console.WriteLine($"Кут до сходу: {angle:F1}°");
bool same = 2 * east == east + east;
Console.WriteLine($"2 * east == east + east: {same}");
Console.WriteLine($"total != engine: {total != engine}");

readonly struct Vector2(double x, double y) : IEquatable<Vector2>
{
    public double X { get; } = x;
    public double Y { get; } = y;
    public double Length => Math.Sqrt(Dot(this, this));

    public static Vector2 operator +(Vector2 a, Vector2 b) =>
        new(a.X + b.X, a.Y + b.Y);
    public static Vector2 operator -(Vector2 a, Vector2 b) =>
        new(a.X - b.X, a.Y - b.Y);
    public static Vector2 operator -(Vector2 v) => new(-v.X, -v.Y);

    // Множення на число в обох порядках операндів.
    public static Vector2 operator *(double k, Vector2 v) =>
        new(k * v.X, k * v.Y);
    public static Vector2 operator *(Vector2 v, double k) => k * v;

    public static double Dot(Vector2 a, Vector2 b) =>
        a.X * b.X + a.Y * b.Y;

    public static double AngleDegrees(Vector2 a, Vector2 b) =>
        Math.Acos(Dot(a, b) / (a.Length * b.Length)) * 180 / Math.PI;

    public static bool operator ==(Vector2 a, Vector2 b) =>
        a.Equals(b);
    public static bool operator !=(Vector2 a, Vector2 b) =>
        !a.Equals(b);

    public bool Equals(Vector2 other) => X == other.X && Y == other.Y;
    public override bool Equals(object? obj) =>
        obj is Vector2 other && Equals(other);
    public override int GetHashCode() => HashCode.Combine(X, Y);
    public override string ToString() => $"({X}; {Y})";
}
```

Структура використовує первинний конструктор, значення якого зберігаються у властивостях лише для читання. Множення на число оголошено двічі, тому працюють обидва записи: `-0.5 * engine` і `engine * 2`. Операції `==` і `!=` виражено через `Equals`, а `GetHashCode` узгоджено з ними. Кут між векторами обчислюється через скалярний добуток. Результат:

```
Рівнодійна: (8; 1), модуль 8,06
Двигун − вітер: (7; 5)
east · north = 0
Кут до сходу: 7,1°
2 * east == east + east: True
total != engine: True
```

## Приклад 2. Многочлен

Створити клас `Polynomial`, у якому індексатор задає й повертає коефіцієнт при степені `x`, а операція `+` додає многочлени. Обчислити значення многочлена в точці схемою Горнера.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Polynomial p = new();
p[2] = 3;           // 3x^2
p[0] = 1;           // + 1
p[1] = -2;          // − 2x

Polynomial q = new();
q[3] = 1;
q[2] = -3;
q[0] = 4;

Console.WriteLine($"p(x) = {p}");
Console.WriteLine($"q(x) = {q}");
Console.WriteLine($"p + q = {p + q}");
Console.WriteLine($"Коефіцієнт p при x^5: {p[5]}");
Console.WriteLine($"p(2) = {p.Evaluate(2)}, q(2) = {q.Evaluate(2)}");
Console.WriteLine($"(p + q)(3) = {(p + q).Evaluate(3)}");

class Polynomial
{
    private double[] coefficients = [];

    public int Degree
    {
        get
        {
            for (int i = coefficients.Length - 1; i >= 0; i--)
                if (coefficients[i] != 0)
                    return i;
            return 0;
        }
    }

    // Індексатор: степінь → коефіцієнт.
    public double this[int power]
    {
        get
        {
            ArgumentOutOfRangeException.ThrowIfNegative(power);
            return power < coefficients.Length
                ? coefficients[power]
                : 0;
        }
        set
        {
            ArgumentOutOfRangeException.ThrowIfNegative(power);
            if (power >= coefficients.Length)
            {
                Array.Resize(ref coefficients, power + 1);
            }
            coefficients[power] = value;
        }
    }

    public static Polynomial operator +(Polynomial a, Polynomial b)
    {
        Polynomial sum = new();
        for (int i = Math.Max(a.Degree, b.Degree); i >= 0; i--)
        {
            sum[i] = a[i] + b[i];
        }
        return sum;
    }

    // Схема Горнера.
    public double Evaluate(double x)
    {
        double result = 0;
        for (int i = Degree; i >= 0; i--)
        {
            result = result * x + this[i];
        }
        return result;
    }

    public override string ToString()
    {
        var text = new System.Text.StringBuilder();
        for (int i = Degree; i >= 0; i--)
        {
            double c = this[i];
            if (c == 0 && !(i == 0 && text.Length == 0)) continue;
            text.Append(text.Length == 0
                ? (c < 0 ? "-" : "")
                : (c < 0 ? " - " : " + "));
            double abs = Math.Abs(c);
            if (abs != 1 || i == 0) text.Append(abs);
            if (i > 0) text.Append(i == 1 ? "x" : $"x^{i}");
        }
        return text.ToString();
    }
}
```

Аксесор `get` індексатора повертає 0 для степенів, більших за довжину масиву, тому звертання `p[5]` безпечне. Аксесор `set` збільшує масив коефіцієнтів методом `Array.Resize`. Обидва аксесори відхиляють від’ємний степінь. Властивість `Degree` ігнорує нульові старші коефіцієнти, тому в сумі `p + q` доданок з `x^2` зникає. Результат:

```
p(x) = 3x^2 - 2x + 1
q(x) = x^3 - 3x^2 + 4
p + q = x^3 - 2x + 5
Коефіцієнт p при x^5: 0
p(2) = 9, q(2) = 0
(p + q)(3) = 26
```

## Приклад 3. Розширення для цілих чисел

Створити методи розширення для `int`: перевірку на простоту `IsPrime`, розкладання на цифри `Digits` і перетворення в римське число `ToRoman`. Використати їх у консольному циклі.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

while (true)
{
    Console.Write("Число (порожній рядок – вихід): ");
    string? input = Console.ReadLine();
    if (string.IsNullOrWhiteSpace(input))
    {
        break;
    }
    if (!int.TryParse(input, out int n) || n <= 0)
    {
        Console.WriteLine("  потрібне натуральне число");
        continue;
    }

    // Методи розширення викликаються як методи екземпляра int.
    Console.WriteLine($"  цифри: {string.Join(" ", n.Digits())}");
    Console.WriteLine($"  просте: {(n.IsPrime() ? "так" : "ні")}");
    Console.WriteLine(n <= 3999
        ? $"  римське: {n.ToRoman()}"
        : "  римське: лише до 3999");
}

static class IntExtensions
{
    public static bool IsPrime(this int n)
    {
        if (n < 2) return false;
        for (int d = 2; d * d <= n; d++)
        {
            if (n % d == 0) return false;
        }
        return true;
    }

    public static int[] Digits(this int n)
    {
        string text = Math.Abs(n).ToString();
        int[] digits = new int[text.Length];
        for (int i = 0; i < text.Length; i++)
        {
            digits[i] = text[i] - '0';
        }
        return digits;
    }

    public static string ToRoman(this int n)
    {
        ArgumentOutOfRangeException.ThrowIfLessThan(n, 1);
        ArgumentOutOfRangeException.ThrowIfGreaterThan(n, 3999);
        int[] values =
            [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        string[] symbols =
            ["M", "CM", "D", "CD", "C", "XC", "L", "XL",
             "X", "IX", "V", "IV", "I"];
        var roman = new System.Text.StringBuilder();
        for (int i = 0; i < values.Length; i++)
        {
            while (n >= values[i])
            {
                roman.Append(symbols[i]);
                n -= values[i];
            }
        }
        return roman.ToString();
    }
}
```

Методи розширення викликаються для змінної `n` так, ніби це методи типу `int`. Метод `ToRoman` перевіряє діапазон 1–3999 помічниками `ArgumentOutOfRangeException`, а програма не викликає його для більших чисел. Результат для введення `2026`, `97`, `-5`, `4000` і порожнього рядка:

```
Число (порожній рядок – вихід): 2026
  цифри: 2 0 2 6
  просте: ні
  римське: MMXXVI
Число (порожній рядок – вихід): 97
  цифри: 9 7
  просте: так
  римське: XCVII
Число (порожній рядок – вихід): -5
  потрібне натуральне число
Число (порожній рядок – вихід): 4000
  цифри: 4 0 0 0
  просте: ні
  римське: лише до 3999
Число (порожній рядок – вихід):
```
