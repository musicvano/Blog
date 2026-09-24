---
title: "Practice"
description: "Topic 11. Structures, records, tuples: worked examples"
outline: [2, 3]
sourceHash: "578faf52bdf8b9fe22df3c4120e7d4975997df68c93452e4719c0e4f43aa7b2d"
---

# Practice

## Example 1. The closest pair of points

Declare an immutable record structure `Point` with a method that calculates distance. For an array of points, find the pair with the smallest distance, and demonstrate value equality and the `with` expression.

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
    $"Closest: {stops[best.First]} and {stops[best.Second]}");
Console.WriteLine($"Distance: {best.Distance:F3}");

// Value equality and a copy with a different coordinate.
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

A `readonly record struct` automatically gets `==`, `Equals`, and `GetHashCode`, and the custom `ToString` replaces the generated one. The best pair is stored in a tuple with named elements: each assignment `best = (i, j, d)` updates all three values. The expression `a with { Y = 7 }` creates a new point without changing `a`. Output:

```
Closest: (4,5; 1) and (5; 1,5)
Distance: 0,707
(2; 6) == (2; 6): True
(2; 6) == (2; 7): False
```

## Example 2. Parsing a season

Declare a `Season` enumeration numbered from 1 and read seasons entered by the user, ignoring case. Reject invalid input, including numbers out of range.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

string names = string.Join(", ", Enum.GetNames<Season>());
Console.WriteLine($"Seasons: {names}");
while (true)
{
    Console.Write("Season (empty line to exit): ");
    string? input = Console.ReadLine();
    if (string.IsNullOrWhiteSpace(input))
    {
        break;
    }

    // TryParse also accepts numbers, so we additionally check IsDefined.
    if (Enum.TryParse(input.Trim(), true, out Season season)
        && Enum.IsDefined(season))
    {
        Console.WriteLine(
            $"  {season} ({(int)season}): {Describe(season)}");
    }
    else
    {
        Console.WriteLine($"  “{input}” is an unknown season");
    }
}

static string Describe(Season season) => season switch
{
    Season.Winter => "December – February",
    Season.Spring => "March – May",
    Season.Summer => "June – August",
    Season.Autumn => "September – November",
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

The first constant has the value 1, and the following ones get 2, 3, and 4. The second argument `true` of the `Enum.TryParse` method turns off case sensitivity. The method also accepts a numeric string, so `"2"` is parsed as `Spring`, and `"7"` as an unnamed value, which `Enum.IsDefined` rejects. The `_` arm of the `switch` expression eliminates warning CS8524. Output for the input `winter`, `SUMMER`, `7`, `2`, `autumn`, and an empty line:

```
Seasons: Winter, Spring, Summer, Autumn
Season (empty line to exit): winter
  Winter (1): December – February
Season (empty line to exit): SUMMER
  Summer (3): June – August
Season (empty line to exit): 7
  “7” is an unknown season
Season (empty line to exit): 2
  Spring (2): March – May
Season (empty line to exit): autumn
  Autumn (4): September – November
Season (empty line to exit):
```

## Example 3. Measurement statistics

Create a method that returns the minimum, maximum, and average as a tuple in a single pass over an array. Demonstrate accessing elements by name, deconstruction, comparison, and swapping values.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

double[] temperatures = [12.5, 15.1, 9.8, 17.4, 14.0, 11.2, 16.3];

// A tuple variable with named elements.
var stats = GetStats(temperatures);
Console.WriteLine($"Tuple: {stats}");
Console.WriteLine($"Average: {stats.Average:F2} °C");

// Deconstruction into separate variables; the average is discarded.
var (min, max, _) = GetStats(temperatures);
Console.WriteLine($"Range: {min} … {max}, spread {max - min:F1}");

// Tuples are compared element by element.
Console.WriteLine($"Match: {(min, max) == (9.8, 17.4)}");

// Swapping values without a temporary variable.
(min, max) = (max, min);
Console.WriteLine($"After swapping: min = {min}, max = {max}");

static (double Min, double Max, double Average) GetStats(
    double[] values)
{
    if (values.Length == 0)
    {
        throw new ArgumentException("the array is empty", nameof(values));
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

The method declares the result type `(double Min, double Max, double Average)`, so the access `stats.Average` is clear without comments. When printed, the tuple is formatted as `(…, …, …)`. The deconstruction `var (min, max, _)` creates two variables and discards the average. Tuples are compared element by element. Output:

```
Tuple: (9,8, 17,4, 13,757142857142858)
Average: 13,76 °C
Range: 9,8 … 17,4, spread 7,6
Match: True
After swapping: min = 17,4, max = 9,8
```
