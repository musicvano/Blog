---
title: "Examples and common mistakes"
description: "Topic 12. Operators and indexers: Examples and common mistakes"
outline: [2, 3]
sourceHash: "367402acca8ceebecd5d4c083d0a08c9a97e616c4d3c0c49c82866358e279613"
---

# Examples and common mistakes

## Example programs

### Rational fractions

The immutable `Fraction` structure reduces the fraction in its constructor and overloads arithmetic, comparison, and conversion operators.

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

double value = (double)(a + b);                    // explicit
Console.WriteLine($"(double)(a + b) = {value}");

readonly struct Fraction : IEquatable<Fraction>
{
    public Fraction(long numerator, long denominator)
    {
        if (denominator == 0)
        {
            throw new DivideByZeroException("the denominator is 0");
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

    // Comparisons are declared in pairs.
    public static bool operator ==(Fraction x, Fraction y) =>
        x.Equals(y);
    public static bool operator !=(Fraction x, Fraction y) =>
        !x.Equals(y);
    public static bool operator <(Fraction x, Fraction y) =>
        x.Numerator * y.Denominator < y.Numerator * x.Denominator;
    public static bool operator >(Fraction x, Fraction y) => y < x;

    // Conversions: from an integer without loss, to double explicitly.
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

Subtraction is expressed through addition and unary minus, and the `>` operator through `<`. The implicit conversion from `long` allows the expression `a + 2`, and the conversion to `double` is explicit because precision may be lost. The equality `2/4 == 1/2` holds because both fractions are stored in reduced form. Output:

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

### Matrix

The `Matrix` class stores a two-dimensional array and provides a `[row, col]` indexer with bounds checking and addition and multiplication operators with size checking.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Matrix a = new(new double[,] { { 1, 2, 3 }, { 4, 5, 6 } });
Matrix b = new(new double[,] { { 1, 0 }, { 0, 1 }, { 2, -1 } });

a[1, 2] = 7;                        // writing through the indexer
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
    Console.WriteLine($"Error: {e.Message}");
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

    // An indexer with two parameters.
    public double this[int row, int col]
    {
        get => cells[Check(row, Rows), Check(col, Cols)];
        set => cells[Check(row, Rows), Check(col, Cols)] = value;
    }

    public static Matrix operator +(Matrix x, Matrix y)
    {
        if (x.Rows != y.Rows || x.Cols != y.Cols)
        {
            throw new ArgumentException("matrix sizes differ");
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
            throw new ArgumentException("columns of A ≠ rows of B");
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
            : throw new IndexOutOfRangeException($"index {index}");
}
```

The constructor copies the passed array with the `Clone` method, so changes to the original array do not affect the matrix. The operators access elements through the indexer, which checks the bounds. For addition, the sizes must match; for multiplication, the number of columns of the first matrix must equal the number of rows of the second. Output:

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

Error: matrix sizes differ
```

### Chessboard

The `ChessBoard` class has two indexers: by row and column numbers and by chess notation such as `"e4"`.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

ChessBoard board = new();
board["e1"] = 'K';
board["d1"] = 'Q';
board["e2"] = 'P';
board["e8"] = 'k';

board.Move("e2", "e4");
Console.WriteLine(board);
Console.WriteLine($"On e4: {board["e4"]}, on e2: {board["e2"]}");
Console.WriteLine($"Row 0, column 3: {board[0, 3]}");

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

    // Indexer by numbers: row 0 is rank 1.
    public char this[int row, int col]
    {
        get => cells[row, col];
        set => cells[row, col] = value;
    }

    // A string indexer using chess notation.
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
            throw new ArgumentException("a square like e4 is required");
        }
        int col = char.ToLower(file) - 'a';
        int row = rank - '1';
        if (col is < 0 or > 7 || row is < 0 or > 7)
        {
            throw new ArgumentException("the square is off the board");
        }
        return (row, col);
    }
}
```

The string indexer parses the notation with the list pattern `[var file, var rank]` (Topic 4), which checks that the string has exactly two characters, and converts the letter and digit into indexes. The `Move` method uses the indexer through `this[to]`. The letter case does not matter, and invalid squares cause `ArgumentException`. Output:

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
On e4: P, on e2: .
Row 0, column 3: Q
E8: k
i2: the square is off the board
a9: the square is off the board
b: a square like e4 is required
```

### String and date extensions

Classic extension methods add word counting and title case to `string`, and `extension` blocks add an `IsWeekend` property, an `AddWorkDays` method, and a static `ParseUkrainian` method to `DateTime`.

```cs
using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

string title = "object-oriented   programming in c#";
Console.WriteLine(title.ToTitleCase());
Console.WriteLine($"Words: {title.WordCount()}");

DateTime start = DateTime.ParseUkrainian("18.09.2026");
for (int i = 0; i < 4; i++)
{
    DateTime day = start.AddDays(i);
    string kind = day.IsWeekend ? "day off" : "working day";
    Console.WriteLine($"{day:dd.MM ddd} – {kind}");
}
Console.WriteLine($"+3 working days: {start.AddWorkDays(3):dd.MM}");

// Classic extension methods: a static class and a this parameter.
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

// extension blocks (C# 14): properties and static members.
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

The `AddWorkDays` method inside the block uses the `IsWeekend` extension property just like a regular property. The static member is called through the type name: `DateTime.ParseUkrainian(…)`. The `ddd` format prints the abbreviated day of the week according to the current culture (en-US in the output below). Output:

```
Object-oriented Programming In C#
Words: 4
18.09 Fri – working day
19.09 Sat – day off
20.09 Sun – day off
21.09 Mon – working day
+3 working days: 23.09
```

## Common mistakes

Table 12.1. Common mistakes with operator overloading, indexers, and extensions {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| CS0216: a matching operator is required | only `==` or `<` is declared; declare `!=` or `>`, respectively |
| CS0660 / CS0661 | `==` without `Equals` and `GetHashCode`; override them consistently with `==` |
| unclear operator semantics | `cart + product` or `file - 1`; use a method with a meaningful name |
| an implicit conversion that loses data | `implicit` for a conversion that may lose precision or throw an exception; declare it `explicit` |
| `a * 2` compiles, but `2 * a` does not | the compiler does not swap operands; declare both versions of the operator |
| an indexer without bounds checking | errors surface far from their cause; check indexes and throw an exception |
| an extension method is not called | the namespace is not imported, or the type has an instance method with the same signature |
| an extension instead of a method of your own class | logic is scattered across static classes; add the method to the class itself |
