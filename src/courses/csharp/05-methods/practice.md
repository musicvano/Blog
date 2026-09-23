---
title: "Practice"
description: "Topic 5. Methods, parameters, recursion: worked examples"
outline: [2, 3]
sourceHash: "91b9d5967639efb70184364a090aaeaa18fbc749d42f267ce4c2c0400666b87a"
---

# Practice

## Example 1. Swapping values and sorting three numbers

Write a program that reads three integers, sorts them in ascending order using a `Swap` method that swaps two variable values, and displays the number of swaps performed.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine("Enter three space-separated integers:");
string[] parts = (Console.ReadLine() ?? "").Split(' ',
    StringSplitOptions.RemoveEmptyEntries);

if (parts.Length != 3
    || !int.TryParse(parts[0], out int a)
    || !int.TryParse(parts[1], out int b)
    || !int.TryParse(parts[2], out int c))
{
    Console.WriteLine("Exactly three integers are required.");
    return;
}

int swaps = SortThree(ref a, ref b, ref c);
Console.WriteLine($"Ascending: {a} {b} {c}");
Console.WriteLine($"Swaps: {swaps}");

// Sorts three caller variables; returns the swap count.
static int SortThree(ref int x, ref int y, ref int z)
{
    int count = 0;
    if (x > y) { Swap(ref x, ref y); count++; }
    if (y > z) { Swap(ref y, ref z); count++; }
    if (x > y) { Swap(ref x, ref y); count++; }
    return count;
}

// Swaps the values of two caller variables.
static void Swap(ref int first, ref int second)
{
    int temp = first;
    first = second;
    second = temp;
}
```

The `Swap` method must operate on the caller’s variables, so both parameters are passed by reference (`ref`). `SortThree` also receives variables by reference and passes them on to `Swap`. Three comparisons of adjacent pairs guarantee the correct order: after the first two, the largest number is in `z`, and the third orders `x` and `y`. For brevity, the conditional bodies are written on one line. Results for different sets of numbers:

```
Enter three space-separated integers:
9 -4 7
Ascending: -4 7 9
Swaps: 2
```

```
Enter three space-separated integers:
3 2 1
Ascending: 1 2 3
Swaps: 3
```

## Example 2. Overloaded formatting methods

Create a static `Formatter` class with overloaded `Format` methods for a date, monetary amount, and fraction expressed as a percentage, using optional parameters, and demonstrate calls with named arguments.

```cs
using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

var date = new DateTime(2026, 9, 1);
Console.WriteLine(Formatter.Format(date));
Console.WriteLine(Formatter.Format(date, withWeekday: true));
Console.WriteLine(Formatter.Format(1299.5m));
Console.WriteLine(Formatter.Format(49.99m, currency: "$"));
Console.WriteLine(Formatter.Format(0.157));
Console.WriteLine(Formatter.Format(-0.0345, decimals: 2,
    showSign: true));
Console.WriteLine(Formatter.Format(fraction: 0.5, showSign: true));

static class Formatter
{
    static readonly CultureInfo Ukrainian = new("uk-UA");

    // Date: “01.09.2026” or “вівторок, 01.09.2026”.
    public static string Format(DateTime value,
        bool withWeekday = false)
    {
        string text = value.ToString("dd.MM.yyyy");
        return withWeekday
            ? $"{value.ToString("dddd", Ukrainian)}, {text}"
            : text;
    }

    // Money: digit grouping, two decimal places, currency.
    public static string Format(decimal amount,
        string currency = "UAH") =>
        $"{amount.ToString("N2", Ukrainian)} {currency}";

    // Fraction as a percentage: 0.157 → “15,7 %”.
    public static string Format(double fraction, int decimals = 1,
        bool showSign = false)
    {
        string number = (fraction * 100).ToString("F" + decimals,
            Ukrainian);
        string sign = showSign && fraction > 0 ? "+" : "";
        return $"{sign}{number} %";
    }
}
```

The compiler selects an overload by the first argument’s type: `DateTime`, `decimal` (suffix `m`), or `double`. Calling `Formatter.Format(5)` would cause CS0121: an integer converts equally well to `decimal` and `double`. Named arguments `withWeekday: true` and `showSign: true` explain the Boolean values, and the final call changes argument order. The `Ukrainian` field specifies Ukrainian culture, so the weekday name and separators do not depend on computer settings. Output:

```
01.09.2026
вівторок, 01.09.2026
1 299,50 UAH
49,99 $
15,7 %
-3,45 %
+50,0 %
```

## Example 3. Recursive digit sum and palindrome check

Write a program with recursive methods that computes the digit sum and digital root of an entered number (repeat the digit sum until one digit remains), and checks whether an entered phrase is a palindrome, ignoring case, spaces, and punctuation.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

Console.Write("Natural number: ");
if (long.TryParse(Console.ReadLine(), out long number)
    && number >= 0)
{
    int sum = DigitSum(number);
    Console.WriteLine($"Digit sum: {sum}");
    Console.WriteLine($"Digital root: {DigitalRoot(number)}");
}
else
{
    Console.WriteLine("A nonnegative integer is required.");
}

Console.Write("Phrase: ");
string phrase = Console.ReadLine() ?? "";
string letters = OnlyLetters(phrase);
string verdict = IsPalindrome(letters, 0, letters.Length - 1)
    ? "a palindrome"
    : "not a palindrome";
Console.WriteLine($"“{phrase}” — {verdict}");

// Digit sum: last digit + digit sum of the remaining number.
static int DigitSum(long n) =>
    n < 10 ? (int)n : (int)(n % 10) + DigitSum(n / 10);

// Sum digits until only one digit remains.
static int DigitalRoot(long n)
{
    int sum = DigitSum(n);
    return sum < 10 ? sum : DigitalRoot(sum);
}

// Compares the outer characters and moves inward.
static bool IsPalindrome(string s, int left, int right)
{
    if (left >= right)
    {
        return true;                      // 0 or 1 character
    }
    if (s[left] != s[right])
    {
        return false;
    }
    return IsPalindrome(s, left + 1, right - 1);
}

// Lowercase letters without spaces, punctuation, or apostrophes.
static string OnlyLetters(string text)
{
    var sb = new System.Text.StringBuilder();
    foreach (char c in text)
    {
        if (char.IsLetter(c))
        {
            sb.Append(char.ToLower(c));
        }
    }
    return sb.ToString();
}
```

The `DigitSum` method reduces the problem to the smaller number `n / 10`; its base case is a single-digit number. `DigitalRoot` calls itself until the sum has one digit. `IsPalindrome` compares the outer characters and recursively checks the inner part, passing `left` and `right` bounds instead of creating new strings; its base case is a single-character or empty fragment. Output:

```
Natural number: 9876543210
Digit sum: 45
Digital root: 9
Phrase: A man, a plan, a canal: Panama!
“A man, a plan, a canal: Panama!” — a palindrome
```

```
Natural number: 2026
Digit sum: 10
Digital root: 1
Phrase: Hello
“Hello” — not a palindrome
```
