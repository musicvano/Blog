---
title: "Practice"
description: "Topic 3. Branching and loops: worked examples"
outline: [2, 3]
sourceHash: "5d851bce5b6346ba66485cc269759213f55ada4697470ce9b939d6a8dbf19a42"
---

# Practice

## Example 1. Season and number of days in a month

Write a program that asks for the month number and year, validates the input, and displays the season, whether the year is a leap year, and the number of days in the month.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Month number (1–12): ");
if (!int.TryParse(Console.ReadLine(), out int month)
    || month is < 1 or > 12)
{
    Console.WriteLine("Error: the month must be from 1 to 12.");
    return;
}
Console.Write("Year: ");
if (!int.TryParse(Console.ReadLine(), out int year) || year < 1)
{
    Console.WriteLine("Error: the year must be positive.");
    return;
}

bool isLeap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

string season = month switch
{
    12 or 1 or 2 => "winter",
    >= 3 and <= 5 => "spring",
    >= 6 and <= 8 => "summer",
    _ => "fall",
};

int days = month switch
{
    2 => isLeap ? 29 : 28,
    4 or 6 or 9 or 11 => 30,
    _ => 31,
};

Console.WriteLine($"Season: {season}");
Console.WriteLine($"The year is {(isLeap ? "a leap year" : "not a leap year")}");
Console.WriteLine($"Days in the month: {days}");
```

A year is a leap year if it is divisible by 4 but not by 100, or is divisible by 400. The `month is < 1 or > 12` check runs before the `switch` expressions, so the `_` branch in the season expression covers only months 9–11. The `or` patterns combine months with the same result, and `and` specifies a range. Results for February 2024 and 1900 and November 2026:

```
Month number (1–12): 2
Year: 2024
Season: winter
The year is a leap year
Days in the month: 29
```

```
Month number (1–12): 2
Year: 1900
Season: winter
The year is not a leap year
Days in the month: 28
```

```
Month number (1–12): 11
Year: 2026
Season: fall
The year is not a leap year
Days in the month: 30
```

## Example 2. Prime numbers in a range

Write a program that asks for the endpoints of a range (in either order), displays all prime numbers in it, 10 per line, and reports their count.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

int from = ReadInt("Start of range: ");
int to = ReadInt("End of range: ");
if (from > to)
{
    (from, to) = (to, from);          // swap the endpoints
}

int count = 0;
for (int n = from; n <= to; n++)
{
    if (n < 2)
    {
        continue;                     // 0 and 1 are not prime
    }

    bool isPrime = true;
    for (int d = 2; d * d <= n; d++)
    {
        if (n % d == 0)
        {
            isPrime = false;
            break;                    // a divisor was found
        }
    }
    if (!isPrime)
    {
        continue;
    }

    count++;
    Console.Write($"{n,6}");
    if (count % 10 == 0)
    {
        Console.WriteLine();          // 10 numbers per line
    }
}

if (count % 10 != 0)
{
    Console.WriteLine();
}
Console.WriteLine($"Prime numbers: {count}");

static int ReadInt(string prompt)
{
    while (true)
    {
        Console.Write(prompt);
        if (int.TryParse(Console.ReadLine(), out int value))
        {
            return value;
        }
        Console.WriteLine("An integer is required.");
    }
}
```

A number *n* is prime if it is greater than 1 and has no divisors from 2 to √*n*: if *n* = *a* · *b* and *a* ≤ *b*, then *a* ≤ √*n*. The inner loop therefore checks the condition `d * d <= n` and ends with `break` as soon as a divisor is found. The `continue` statement skips numbers smaller than 2 and composite numbers. The statement `(from, to) = (to, from)` swaps the variable values (tuples are covered in Topic 11). The local function `ReadInt` repeats the prompt in a `while (true)` loop until an integer is entered. Output:

```
Start of range: 100
End of range: abc
An integer is required.
End of range: 1
     2     3     5     7    11    13    17    19    23    29
    31    37    41    43    47    53    59    61    67    71
    73    79    83    89    97
Prime numbers: 25
```

## Example 3. Square root using Newton’s method

Write a program that computes the square root of a nonnegative number *a* using Newton’s method with a specified tolerance, displays the approximation at each iteration and the number of iterations, and compares the result with `Math.Sqrt`.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Number a (a ≥ 0): ");
if (!double.TryParse(Console.ReadLine(), out double a) || a < 0)
{
    Console.WriteLine("Error: a nonnegative number is required.");
    return;
}
Console.Write("Tolerance (for example, 1e-10): ");
if (!double.TryParse(Console.ReadLine(), out double eps)
    || eps <= 0)
{
    Console.WriteLine("Error: the tolerance must be positive.");
    return;
}

if (a == 0)
{
    Console.WriteLine("Root: 0");  // convergence is slow for zero
    return;
}

const int MaxIterations = 100;
double x = a > 1 ? a : 1;       // initial approximation
int iterations = 0;
double delta;

do
{
    double next = (x + a / x) / 2;  // Newton’s formula
    delta = Math.Abs(next - x);
    x = next;
    iterations++;
    Console.WriteLine($"{iterations,3}: x = {x:F12}");
} while (delta >= eps && iterations < MaxIterations);

Console.WriteLine($"Root: {x}");
Console.WriteLine($"Math.Sqrt: {Math.Sqrt(a)}");
Console.WriteLine($"Iterations: {iterations}");
```

Each successive approximation is computed using the formula *x*<sub>*k*+1</sub> = (*x*<sub>*k*</sub> + *a* / *x*<sub>*k*</sub>) / 2. A `do`/`while` loop is suitable because at least one iteration is needed to compute the change `delta`. The loop ends when the change in the approximation is smaller than the tolerance, and the `MaxIterations` constant guarantees termination even for a very small tolerance. For *a* = 0, the approximation merely halves on each iteration, so this case is handled separately. Output for *a* = 2 and a tolerance of 10<sup>−10</sup>:

```
Number a (a ≥ 0): 2
Tolerance (for example, 1e-10): 1e-10
  1: x = 1,500000000000
  2: x = 1,416666666667
  3: x = 1,414215686275
  4: x = 1,414213562375
  5: x = 1,414213562373
Root: 1,414213562373095
Math.Sqrt: 1,4142135623730951
Iterations: 5
```

Newton’s method converges very quickly: the number of correct digits approximately doubles on each iteration. The result differs from `Math.Sqrt` only in the last digit.
