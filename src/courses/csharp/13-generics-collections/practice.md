---
title: "Practice"
description: "Topic 13. Generics and collections: worked examples"
outline: [2, 3]
sourceHash: "4b206f4c28deb66989c4fefdfc77314324e419b2b95eff3af1289b80b0598a38"
---

# Practice

## Example 1. A generic range

Create a generic `Range<T>` class that checks whether a value belongs to it and intersects ranges. Use it for integers, dates, and amounts of money.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Range<int> working = new(9, 18);
Range<int> meeting = new(16, 20);
Console.WriteLine($"{working} contains 12: {working.Contains(12)}");
Console.WriteLine($"Intersection with {meeting}: {working.Intersect(meeting)}");
Range<int>? none = working.Intersect(new(19, 22));
Console.WriteLine($"Intersection with [19; 22]: {none?.ToString() ?? "none"}");

Range<DateOnly> trip = new(new(2026, 7, 1), new(2026, 7, 21));
DateOnly check = new(2026, 7, 15);
Console.WriteLine($"{trip} contains {check}: {trip.Contains(check)}");

Range<decimal> budget = new(500m, 1500m);
foreach (decimal p in new[] { 499.99m, 1200m, 1500m })
{
    Console.WriteLine($"{budget} contains {p}: {budget.Contains(p)}");
}

try
{
    Range<double> wrong = new(5.5, 1.0);
}
catch (ArgumentException e)
{
    Console.WriteLine($"Error: {e.Message}");
}

class Range<T> where T : IComparable<T>
{
    public Range(T start, T end)
    {
        if (start.CompareTo(end) > 0)
        {
            throw new ArgumentException(
                $"start {start} is after end {end}");
        }
        Start = start;
        End = end;
    }

    public T Start { get; }
    public T End { get; }

    public bool Contains(T value) =>
        value.CompareTo(Start) >= 0 && value.CompareTo(End) <= 0;

    // The intersection, or null if the ranges do not overlap.
    public Range<T>? Intersect(Range<T> other)
    {
        T start = Max(Start, other.Start);
        T end = Min(End, other.End);
        return start.CompareTo(end) <= 0
            ? new Range<T>(start, end)
            : null;
    }

    public override string ToString() => $"[{Start}; {End}]";

    private static T Max(T a, T b) => a.CompareTo(b) >= 0 ? a : b;
    private static T Min(T a, T b) => a.CompareTo(b) <= 0 ? a : b;
}
```

The `where T : IComparable<T>` constraint lets you compare bounds with the `CompareTo` method, so the class works with `int`, `DateOnly`, `decimal`, and any other comparable type. The `Intersect` method returns `Range<T>?`: `null` means that the ranges do not overlap. The constructor rejects a range in which the start is greater than the end. The `wrong` variable is not used because the constructor throws an exception. Output:

```
[9; 18] contains 12: True
Intersection with [16; 20]: [16; 18]
Intersection with [19; 22]: none
[01.07.2026; 21.07.2026] contains 15.07.2026: True
[500; 1500] contains 499,99: False
[500; 1500] contains 1200: True
[500; 1500] contains 1500: True
Error: start 5,5 is after end 1
```

## Example 2. Checking brackets

Check that parentheses, square brackets, and braces in expressions are correctly balanced. For an error, report the position.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

string[] expressions =
[
    "(a + b) * [c - {d / e}]",
    "arr[i] = (x + y]",
    "f(g(x)",
    "{ return a); }",
    "no brackets",
];

foreach (string expression in expressions)
{
    string? error = CheckBrackets(expression);
    Console.WriteLine($"{expression,-24} {error ?? "OK"}");
}

// Returns a description of the first error, or null.
static string? CheckBrackets(string text)
{
    Stack<(char Bracket, int Position)> open = new();
    for (int i = 0; i < text.Length; i++)
    {
        char c = text[i];
        if (c is '(' or '[' or '{')
        {
            open.Push((c, i));
        }
        else if (c is ')' or ']' or '}')
        {
            if (open.Count == 0)
            {
                return $"extra “{c}” at position {i}";
            }
            var (bracket, position) = open.Pop();
            if (Pair(bracket) != c)
            {
                return $"“{bracket}”({position}) closed by “{c}”({i})";
            }
        }
    }
    return open.TryPeek(out var last)
        ? $"“{last.Bracket}” not closed ({last.Position})"
        : null;
}

static char Pair(char bracket) => bracket switch
{
    '(' => ')',
    '[' => ']',
    _ => '}',
};
```

An opening bracket is pushed onto a `Stack<(char, int)>` together with its position. A closing bracket must match the bracket on top of the stack; otherwise, the expression is incorrect. If the stack is empty when closing, the bracket is extra; if something remains in the stack after the scan, a bracket is not closed. Positions are numbered from 0. Output:

```
(a + b) * [c - {d / e}]  OK
arr[i] = (x + y]         “(”(9) closed by “]”(15)
f(g(x)                   “(” not closed (1)
{ return a); }           “{”(0) closed by “)”(10)
no brackets              OK
```

## Example 3. Lookup speed in `List<T>` and `HashSet<T>`

Compare the time of 2,000 checks for a number among 1,000,000 elements in a list and in a set.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Size = 1_000_000;
const int Lookups = 2_000;

List<int> list = new(Size);
for (int i = 0; i < Size; i++)
{
    list.Add(i * 2);                       // even numbers only
}
HashSet<int> set = [.. list];

Random random = new(42);
int[] queries = new int[Lookups];
for (int i = 0; i < Lookups; i++)
{
    queries[i] = random.Next(2 * Size);    // half are odd
}

Stopwatch watch = Stopwatch.StartNew();
int foundInList = 0;
foreach (int q in queries)
{
    if (list.Contains(q)) foundInList++;
}
double listMs = watch.Elapsed.TotalMilliseconds;

watch.Restart();
int foundInSet = 0;
foreach (int q in queries)
{
    if (set.Contains(q)) foundInSet++;
}
double setMs = watch.Elapsed.TotalMilliseconds;

Console.WriteLine($"Lookups: {Lookups:N0} among {Size:N0} elements");
Console.WriteLine($"List<int>:    {foundInList}, {listMs,8:F2} ms");
Console.WriteLine($"HashSet<int>: {foundInSet}, {setMs,8:F2} ms");
Console.WriteLine($"HashSet is {listMs / setMs:F0} times faster");
```

`List<int>.Contains` compares elements sequentially, so a single search for a missing number scans the entire million. `HashSet<int>.Contains` calculates the hash and checks a single bucket. The queries are generated with a fixed seed, so the number of numbers found is the same in both collections. The time depends on the computer; for measurements, the program is run in the Release configuration (`dotnet run -c Release`). Output of one run:

```
Lookups: 2 000 among 1 000 000 elements
List<int>:    990,   178,28 ms
HashSet<int>: 990,     0,05 ms
HashSet is 3793 times faster
```
