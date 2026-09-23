---
title: "Practice"
description: "Topic 4. Arrays and strings: worked examples"
outline: [2, 3]
sourceHash: "ce2e4d9271de74d46c6c52dcec126118bf4ee1b86b79437cb9c9d5c8207b7ac8"
---

# Practice

## Example 1. Array rotation and second maximum

Write a program that reads space-separated integers and a number of positions *k*, rotates the array right by *k* positions (left for negative *k*), and finds the second-largest element distinct from the maximum.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine("Enter space-separated integers:");
string[] parts = (Console.ReadLine() ?? "").Split(' ',
    StringSplitOptions.RemoveEmptyEntries);

int[] numbers = new int[parts.Length];
for (int i = 0; i < parts.Length; i++)
{
    if (!int.TryParse(parts[i], out numbers[i]))
    {
        Console.WriteLine($"“{parts[i]}” — not an integer.");
        return;
    }
}
if (numbers.Length < 2)
{
    Console.WriteLine("At least two numbers are required.");
    return;
}

Console.Write("Rotate right by k positions: ");
if (!int.TryParse(Console.ReadLine(), out int k))
{
    Console.WriteLine("An integer is required.");
    return;
}

int n = numbers.Length;
int shift = ((k % n) + n) % n;        // negative k rotates left
int[] shifted = new int[n];
for (int i = 0; i < n; i++)
{
    shifted[(i + shift) % n] = numbers[i];
}

int first = int.MinValue;
int second = int.MinValue;
foreach (int x in numbers)
{
    if (x > first)
    {
        second = first;
        first = x;
    }
    else if (x > second && x < first)
    {
        second = x;
    }
}

Console.WriteLine($"Original: [{string.Join(", ", numbers)}]");
Console.WriteLine($"After rotation: [{string.Join(", ", shifted)}]");
Console.WriteLine($"Maximum: {first}");
Console.WriteLine(second == int.MinValue
    ? "No second maximum: all numbers are equal."
    : $"Second maximum: {second}");
```

The string is split using `Split` with `RemoveEmptyEntries`, so extra spaces do not cause problems. The `int.TryParse` method stores its result directly in array element `numbers[i]`. The new position of the element at index *i* is computed by `(i + shift) % n`; `((k % n) + n) % n` reduces any *k*, including negative values or values greater than the length, to the range from 0 to *n* − 1. The second maximum is found in one pass: when a new maximum appears, the previous maximum becomes second. The condition `x < first` skips repeated maximum values. Output:

```
Enter space-separated integers:
3 8 -2 8 5 1
Rotate right by k positions: 2
Original: [3, 8, -2, 8, 5, 1]
After rotation: [5, 1, 3, 8, -2, 8]
Maximum: 8
Second maximum: 5
```

```
Enter space-separated integers:
4 4 4
Rotate right by k positions: -1
Original: [4, 4, 4]
After rotation: [4, 4, 4]
Maximum: 4
No second maximum: all numbers are equal.
```

## Example 2. Pascal’s triangle in a jagged array

Write a program that builds Pascal’s triangle with a specified number of rows (from 1 to 12) in a jagged array and displays it as an isosceles triangle.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Number of rows (1–12): ");
if (!int.TryParse(Console.ReadLine(), out int rows)
    || rows is < 1 or > 12)
{
    Console.WriteLine("An integer from 1 to 12 is required.");
    return;
}

// Jagged array: row i has i + 1 elements.
long[][] triangle = new long[rows][];
for (int i = 0; i < rows; i++)
{
    triangle[i] = new long[i + 1];
    triangle[i][0] = 1;
    triangle[i][^1] = 1;
    for (int j = 1; j < i; j++)
    {
        triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
    }
}

// The largest number is in the middle of the last row; the field width is even.
int digits = triangle[^1][(rows - 1) / 2].ToString().Length;
int width = 2 * (digits / 2 + 1);
for (int i = 0; i < rows; i++)
{
    Console.Write(new string(' ', (rows - 1 - i) * width / 2));
    foreach (long value in triangle[i])
    {
        Console.Write(value.ToString().PadLeft(width));
    }
    Console.WriteLine();
}

long rowSum = 0;
foreach (long value in triangle[^1])
{
    rowSum += value;
}
Console.WriteLine($"Last row sum: {rowSum} = 2^{rows - 1}");
```

Row *i* has *i* + 1 elements, so a jagged array is convenient: each row is created separately with `new long[i + 1]`. The edge elements equal 1 (`triangle[i][^1]` is the last element in the row), and each interior element is the sum of the two elements above it. The field width is determined by the number of digits in the largest number — the middle element of the last row — and the indentation decreases by half a field with each row. The `PadLeft` method pads the number with spaces on the left. The sum of row *n* is 2<sup>*n*</sup>. Output for 6 rows:

```
Number of rows (1–12): 6
              1
           1   1
         1   2   1
       1   3   3   1
     1   4   6   4   1
   1   5  10  10   5   1
Last row sum: 32 = 2^5
```

## Example 3. Phone number normalization

Write a program that reads phone numbers in any format until a blank line, keeps only the digits in each, normalizes Ukrainian numbers to `+380 XX XXX XX XX`, and also displays a masked version.

```cs
using System.Text;

Console.OutputEncoding = Encoding.UTF8;

Console.WriteLine("Phone number (a blank line ends input):");
string? input = Console.ReadLine();

while (!string.IsNullOrWhiteSpace(input))
{
    // Keep only digits.
    var digits = new StringBuilder();
    foreach (char c in input)
    {
        if (char.IsDigit(c))
        {
            digits.Append(c);
        }
    }
    string d = digits.ToString();

    // Normalize to 12 digits, 380XXXXXXXXX.
    d = d.Length switch
    {
        10 when d.StartsWith('0') => "38" + d,
        11 when d.StartsWith("80") => "3" + d,
        _ => d,
    };

    if (d.Length == 12 && d.StartsWith("380"))
    {
        string code = d.Substring(3, 2);
        string formatted =
            $"+380 {code} {d[5..8]} {d[8..10]} {d[10..]}";
        string masked = $"+380 {code} *** ** {d[10..]}";
        Console.WriteLine($"  {formatted}   (masked: {masked})");
    }
    else
    {
        Console.WriteLine($"  “{input.Trim()}” — invalid number");
    }
    input = Console.ReadLine();
}
```

The number’s digits are collected in `StringBuilder` because the string is built one character at a time in a loop. A `switch` expression on string length with `when` conditions adds the missing prefix to numbers without a country code (`067…`) or with code `8` (`8067…`). Parts of the number are extracted using ranges (`d[5..8]`) and `Substring(3, 2)`, which produce the same result. Output:

```
Phone number (a blank line ends input):
067 123-45-67
  +380 67 123 45 67   (masked: +380 67 *** ** 67)
+38 (050) 987 65 43
  +380 50 987 65 43   (masked: +380 50 *** ** 43)
8-093-111-22-33
  +380 93 111 22 33   (masked: +380 93 *** ** 33)
12345
  “12345” — invalid number
```
