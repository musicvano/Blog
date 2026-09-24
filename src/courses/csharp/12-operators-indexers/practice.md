---
title: "Practice"
description: "Topic 12. Operators and indexers: worked examples"
outline: [2, 3]
sourceHash: "69a143531ac5f2a9f76d7c04b67871f1876138094156b5452897e4569e8d212d"
---

# Practice

## Example 1. A vector in the plane

Declare an immutable `Vector2` structure with addition, subtraction, unary minus, multiplication by a number, a dot product, and the `==`/`!=` operators. Calculate the resultant of several forces.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Vector2 wind = new(3, -1);
Vector2 engine = new(10, 4);
Vector2 drag = -0.5 * engine;

Vector2 total = wind + engine + drag;
Console.WriteLine($"Resultant: {total}, magnitude {total.Length:F2}");
Console.WriteLine($"Engine − wind: {engine - wind}");

Vector2 east = new(1, 0);
Vector2 north = new(0, 1);
Console.WriteLine($"east · north = {Vector2.Dot(east, north)}");
double angle = Vector2.AngleDegrees(east, total);
Console.WriteLine($"Angle to east: {angle:F1}°");
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

    // Multiplication by a number in both operand orders.
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

The structure uses a primary constructor whose values are stored in read-only properties. Multiplication by a number is declared twice, so both forms work: `-0.5 * engine` and `engine * 2`. The `==` and `!=` operators are expressed through `Equals`, and `GetHashCode` is consistent with them. The angle between the vectors is calculated using the dot product. Output:

```
Resultant: (8; 1), magnitude 8,06
Engine − wind: (7; 5)
east · north = 0
Angle to east: 7,1°
2 * east == east + east: True
total != engine: True
```

## Example 2. A polynomial

Create a `Polynomial` class in which an indexer sets and returns the coefficient of a power of `x`, and the `+` operator adds polynomials. Evaluate the polynomial at a point using Horner’s method.

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
Console.WriteLine($"Coefficient of x^5 in p: {p[5]}");
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

    // Indexer: power → coefficient.
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

    // Horner's method.
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

The indexer’s `get` accessor returns 0 for powers greater than the array length, so the access `p[5]` is safe. The `set` accessor grows the coefficient array with the `Array.Resize` method. Both accessors reject a negative power. The `Degree` property ignores zero leading coefficients, so the `x^2` term disappears in the sum `p + q`. Output:

```
p(x) = 3x^2 - 2x + 1
q(x) = x^3 - 3x^2 + 4
p + q = x^3 - 2x + 5
Coefficient of x^5 in p: 0
p(2) = 9, q(2) = 0
(p + q)(3) = 26
```

## Example 3. Extensions for integers

Create extension methods for `int`: an `IsPrime` primality check, a `Digits` method that splits a number into digits, and a `ToRoman` method that converts to a Roman numeral. Use them in a console loop.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

while (true)
{
    Console.Write("Number (empty line to exit): ");
    string? input = Console.ReadLine();
    if (string.IsNullOrWhiteSpace(input))
    {
        break;
    }
    if (!int.TryParse(input, out int n) || n <= 0)
    {
        Console.WriteLine("  a natural number is required");
        continue;
    }

    // Extension methods are called like instance methods of int.
    Console.WriteLine($"  digits: {string.Join(" ", n.Digits())}");
    Console.WriteLine($"  prime: {(n.IsPrime() ? "yes" : "no")}");
    Console.WriteLine(n <= 3999
        ? $"  Roman: {n.ToRoman()}"
        : "  Roman: only up to 3999");
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

The extension methods are called on the variable `n` as if they were methods of the `int` type. The `ToRoman` method checks the 1–3999 range with the `ArgumentOutOfRangeException` helpers, and the program does not call it for larger numbers. Output for the input `2026`, `97`, `-5`, `4000`, and an empty line:

```
Number (empty line to exit): 2026
  digits: 2 0 2 6
  prime: no
  Roman: MMXXVI
Number (empty line to exit): 97
  digits: 9 7
  prime: yes
  Roman: XCVII
Number (empty line to exit): -5
  a natural number is required
Number (empty line to exit): 4000
  digits: 4 0 0 0
  prime: no
  Roman: only up to 3999
Number (empty line to exit):
```
