---
title: "Examples and common mistakes"
description: "Topic 5. Methods, parameters, recursion: Examples and common mistakes"
outline: [2, 3]
sourceHash: "887590578c4e477e4b2879d3cc20315897d41f4433d40101da1b022381d17ce3"
---

# Examples and common mistakes

## Example programs

### Input validation library

The `ReadInt` and `ReadDouble` methods repeat a prompt until the user enters a number in the valid range. Optional parameters and named arguments let you specify only the constraints you need and a custom error message.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

int age = ReadInt("Age: ", min: 0, max: 120);
double height = ReadDouble("Height, m: ", 0.5, 2.5);
int children = ReadInt("Number of children: ", min: 0,
    error: "The count cannot be negative.");

Console.WriteLine($"Age {age}, height {height:F2}, children {children}");

// Reads an integer in [min; max], repeating the prompt.
static int ReadInt(string prompt, int min = int.MinValue,
    int max = int.MaxValue, string? error = null)
{
    while (true)
    {
        Console.Write(prompt);
        if (int.TryParse(Console.ReadLine(), out int value)
            && value >= min && value <= max)
        {
            return value;
        }
        Console.WriteLine(error
            ?? $"Enter an integer from {min} to {max}.");
    }
}

// Reads a real number in [min; max].
static double ReadDouble(string prompt, double min, double max)
{
    while (true)
    {
        Console.Write(prompt);
        string text = (Console.ReadLine() ?? "").Replace('.', ',');
        if (double.TryParse(text, out double value)
            && value >= min && value <= max)
        {
            return value;
        }
        Console.WriteLine($"Enter a number from {min} to {max}.");
    }
}
```

The `ReadDouble` method accepts both commas and periods by replacing a period with a comma before parsing with Ukrainian settings. The third `ReadInt` call specifies only the minimum and message: the maximum uses its default. Output:

```
Age: 150
Enter an integer from 0 to 120.
Age: 35
Height, m: 1.82
Number of children: -1
The count cannot be negative.
Number of children: 2
Age 35, height 1,82, children 2
```

### Array statistics

The static `Stats` class contains overloaded `Summary` methods for `int[]` and `double[]` arrays, returning the average and supplying the minimum and maximum through `out` parameters, plus a `TryAverage` method following the `TryParse` pattern.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

int[] scores = [78, 92, 65, 88, 54];
double[] temps = [-2.5, 0.8, 3.1, -0.4];

double avg = Stats.Summary(scores, out int low, out int high);
Console.WriteLine($"Scores: average {avg:F1}, from {low} to {high}");

double avgT = Stats.Summary(temps, out double minT, out double maxT);
Console.WriteLine($"Temperatures: {avgT:F2}, from {minT} to {maxT}");

int[] empty = [];
if (!Stats.TryAverage(empty, out double average))
{
    Console.WriteLine("Empty array: the average is undefined.");
}
if (Stats.TryAverage(scores, out average))
{
    Console.WriteLine($"TryAverage: {average}");
}

static class Stats
{
    // Average, minimum, and maximum of an integer array.
    public static double Summary(int[] values,
        out int min, out int max)
    {
        min = values[0];
        max = values[0];
        long sum = 0;
        foreach (int v in values)
        {
            min = Math.Min(min, v);
            max = Math.Max(max, v);
            sum += v;
        }
        return (double)sum / values.Length;
    }

    // Overload for an array of real numbers.
    public static double Summary(double[] values,
        out double min, out double max)
    {
        min = values[0];
        max = values[0];
        double sum = 0;
        foreach (double v in values)
        {
            min = Math.Min(min, v);
            max = Math.Max(max, v);
            sum += v;
        }
        return sum / values.Length;
    }

    // TryXxx pattern: false instead of an exception for an empty array.
    public static bool TryAverage(int[] values, out double average)
    {
        if (values.Length == 0)
        {
            average = 0;
            return false;
        }
        average = Summary(values, out _, out _);
        return true;
    }
}
```

The compiler selects the `Summary` overload by array type. `TryAverage` reuses `Summary`, discarding the unneeded minimum and maximum (`out _`). For an empty array, it returns `false` instead of the `IndexOutOfRangeException` that `Summary` would throw when accessing `values[0]`. Output:

```
Scores: average 75,4, from 54 to 92
Temperatures: 0,25, from -2,5 to 3,1
Empty array: the average is undefined.
TryAverage: 75,4
```

### Towers of Hanoi

Move a tower of *n* disks from peg A to peg C using auxiliary peg B. Move one disk at a time, never placing a larger disk on a smaller one. The recursive solution moves *n* − 1 disks to the auxiliary peg, moves the largest disk to the target, then moves the *n* − 1 disks to the target.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Number of disks (1–10): ");
if (!int.TryParse(Console.ReadLine(), out int disks)
    || disks is < 1 or > 10)
{
    Console.WriteLine("An integer from 1 to 10 is required.");
    return;
}

int moves = 0;
Hanoi(disks, 'A', 'C', 'B', ref moves);
int expected = (1 << disks) - 1;     // 2^n - 1
Console.WriteLine($"Moves: {moves}, by formula: {expected}");

// Moves n disks from peg from to peg to using via.
static void Hanoi(int n, char from, char to, char via,
    ref int moves)
{
    if (n == 0)
    {
        return;                              // base case
    }
    Hanoi(n - 1, from, via, to, ref moves);  // n-1 to the auxiliary peg
    moves++;
    Console.WriteLine($"{moves,3}. Disk {n}: {from} → {to}");
    Hanoi(n - 1, via, to, from, ref moves);  // n-1 to the target peg
}
```

The move counter is passed as a `ref` parameter, so all recursive calls increment the same `moves` variable. The move count equals 2<sup>*n*</sup> − 1 (`1 << disks` is 2<sup>*n*</sup>). Output for three disks:

```
Number of disks (1–10): 3
  1. Disk 1: A → C
  2. Disk 2: A → B
  3. Disk 1: C → B
  4. Disk 3: A → C
  5. Disk 1: B → A
  6. Disk 2: B → C
  7. Disk 1: A → C
Moves: 7, by formula: 7
```

### Fibonacci numbers

The program computes the 40th Fibonacci number in three ways — direct recursion, recursion with memoization, and a loop — and measures the time for each.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int N = 40;
var watch = Stopwatch.StartNew();

long recursive = FibRecursive(N);
long recursiveMs = watch.ElapsedMilliseconds;

watch.Restart();
long[] memo = new long[N + 1];
long memoized = FibMemo(N, memo);
double memoMs = watch.Elapsed.TotalMilliseconds;

watch.Restart();
long iterative = FibIterative(N);
double iterMs = watch.Elapsed.TotalMilliseconds;

Console.WriteLine($"Recursion:   {recursive}, {recursiveMs} ms");
Console.WriteLine($"Memoization: {memoized}, {memoMs:F3} ms");
Console.WriteLine($"Iteration:   {iterative}, {iterMs:F3} ms");

// Direct recursion: each call produces two more.
static long FibRecursive(int n) =>
    n < 2 ? n : FibRecursive(n - 1) + FibRecursive(n - 2);

// Recursion that remembers computed values.
static long FibMemo(int n, long[] memo)
{
    if (n < 2)
    {
        return n;
    }
    if (memo[n] == 0)
    {
        memo[n] = FibMemo(n - 1, memo) + FibMemo(n - 2, memo);
    }
    return memo[n];
}

// Loop: the two previous values.
static long FibIterative(int n)
{
    long previous = 0, current = 1;
    for (int i = 0; i < n; i++)
    {
        (previous, current) = (current, previous + current);
    }
    return previous;
}
```

The `memo` array is passed to every recursive call: zero means a value has not yet been computed (Fibonacci numbers are positive for *n* ≥ 2). The loop stores only the last two values, and `(previous, current) = (current, previous + current)` assigns both variables simultaneously. Output (timing depends on the computer):

```
Recursion:   102334155, 566 ms
Memoization: 102334155, 0,123 ms
Iteration:   102334155, 0,065 ms
```

Direct recursion makes 331,160,281 calls and runs thousands of times slower; memoization reduces the number of computations to 41, as does the loop.

## Common mistakes

Table 5.1 lists the most common mistakes when working with methods.

Table 5.1. Common mistakes when working with methods {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| the variable is unchanged after a method call | the argument was passed by value; return the result (`x = Increment(x)`) or use `ref` |
| CS0161: *not all code paths return a value* | not every path has a `return`; add `return` after `if` or add an `else` branch |
| CS0177: output parameter is unassigned | a method with `out` must assign a value on every path, even on failure |
| CS0165 for a `ref` argument | the variable was not initialized before the call; use `out` for an output value |
| CS0128: local function already defined | local functions cannot be overloaded; declare the methods in a class |
| CS0121: ambiguous call | two overloads are equally suitable; make the argument type explicit (`F(5.0)`, `F(5m)`) |
| CS1737: optional parameters precede required parameters | move parameters with default values to the end of the list |
| the program crashes with `Stack overflow.` | there is no base case or recursion does not approach it; check the exit condition |
| the recursive method runs for a very long time | the same values are computed repeatedly; use memoization or a loop |
