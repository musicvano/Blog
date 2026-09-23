---
title: "Practice"
description: "Topic 7. Classes and objects: worked examples"
outline: [2, 3]
sourceHash: "167b8442b9b6932ea4f5c2df2a743653a95440ef88d40623b1ebec9927f0a2de"
---

# Practice

## Example 1. Products with required properties

Create a `Product` class with required name and price properties, optional quantity and discount properties, and a computed cost property. Build a shopping cart and print an aligned table with a total.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Product[] cart =
[
    new Product { Name = "Laptop", Price = 32_999m, Quantity = 1,
                  DiscountPercent = 7 },
    new Product { Name = "Mouse", Price = 449.5m, Quantity = 2 },
    new Product { Name = "USB-C cable", Price = 199m, Quantity = 3,
                  DiscountPercent = 15 },
];

decimal total = 0;
Console.WriteLine($"{"Product",-14}{"Price",10}{"Qty",6}"
    + $"{"Discount",8}{"Amount",12}");
foreach (Product p in cart)
{
    Console.WriteLine($"{p.Name,-14}{p.Price,10:N2}{p.Quantity,6}"
        + $"{p.DiscountPercent,7}%{p.Cost,12:N2}");
    total += p.Cost;
}
Console.WriteLine($"{"Total",-38}{total,12:N2}");

class Product
{
    public required string Name { get; init; }
    public required decimal Price { get; init; }
    public int Quantity { get; init; } = 1;
    public int DiscountPercent { get; init; }

    // Cost including the discount, rounded to kopiykas.
    public decimal Cost =>
        Math.Round(Price * Quantity * (100 - DiscountPercent) / 100,
            2);
}
```

The `required` modifier prevents creating a product without a name or price: omitting either causes compilation error CS9035. The `Quantity` property defaults to 1, so it can be omitted for the mouse; the discount defaults to 0. Cost is calculated each time from the current properties and is not stored separately. Output:

```
Product            Price   QtyDiscount      Amount
Laptop         32 999,00     1      7%   30 689,07
Mouse             449,50     2      0%      899,00
USB-C cable       199,00     3     15%      507,45
Total                                    32 095,52
```

## Example 2. A rectangle with side validation

Create a `Rectangle` class whose `Width` and `Height` properties reject nonpositive values, with computed properties for area, perimeter, and whether it is a square, plus a scaling method.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var rect = new Rectangle(4, 2.5);
Print("Initial", rect);

rect.Scale(1.5);
Print("After Scale(1.5)", rect);

rect.Width = 3;
Print("Width = 3", rect);

try
{
    rect.Height = -1;
}
catch (ArgumentOutOfRangeException ex)
{
    Console.WriteLine($"Error: {ex.ParamName} = {ex.ActualValue}");
    Print("Unchanged", rect);
}

static void Print(string title, Rectangle r) =>
    Console.WriteLine($"{title,-17} {r.Width} × {r.Height}: "
        + $"S = {r.Area:F2}, P = {r.Perimeter:F2}");

class Rectangle
{
    private double width;
    private double height;

    public Rectangle(double width, double height)
    {
        Width = width;      // validation in the properties
        Height = height;
    }

    public double Width
    {
        get => width;
        set
        {
            ArgumentOutOfRangeException.ThrowIfNegativeOrZero(value);
            width = value;
        }
    }

    public double Height
    {
        get => height;
        set
        {
            ArgumentOutOfRangeException.ThrowIfNegativeOrZero(value);
            height = value;
        }
    }

    public double Area => width * height;
    public double Perimeter => 2 * (width + height);
    public bool IsSquare => Math.Abs(width - height) < 1e-9;

    public void Scale(double factor)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(factor);
        width *= factor;
        height *= factor;
    }
}
```

The constructor assigns values through properties, so validation is written only once, in the `set` accessors. If the assignment `Height = -1` fails, the exception occurs before the field changes, and the object remains in a valid state. The `Scale` method changes both sides, and the computed `Area` and `Perimeter` properties immediately reflect the new dimensions. Output:

```
Initial           4 × 2,5: S = 10,00, P = 13,00
After Scale(1.5)  6 × 3,75: S = 22,50, P = 19,50
Width = 3         3 × 3,75: S = 11,25, P = 13,50
Error: value = -1
Unchanged         3 × 3,75: S = 11,25, P = 13,50
```

## Example 3. Lap timer

Create a `LapTimer` class that stores lap times in an array of limited length, allows laps to be added, finds the best lap, and generates a text report.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var timer = new LapTimer("Running track, 400 m", maxLaps: 10);

// Lap times are specified in seconds so the result does not depend on the clock.
double[] times = [92.4, 88.1, 90.7, 86.9, 89.3];
foreach (double t in times)
{
    timer.AddLap(t);
}

Console.WriteLine(timer.Report());

class LapTimer
{
    private readonly double[] laps;
    private int count;

    public LapTimer(string title, int maxLaps = 20)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(title);
        ArgumentOutOfRangeException.ThrowIfLessThan(maxLaps, 1);
        Title = title;
        laps = new double[maxLaps];
    }

    public string Title { get; }
    public int LapCount => count;

    public double TotalSeconds
    {
        get
        {
            double sum = 0;
            for (int i = 0; i < count; i++)
            {
                sum += laps[i];
            }
            return sum;
        }
    }

    public void AddLap(double seconds)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(seconds);
        if (count == laps.Length)
        {
            throw new InvalidOperationException("Lap limit reached.");
        }
        laps[count++] = seconds;
    }

    public int BestLap()
    {
        if (count == 0)
        {
            throw new InvalidOperationException("No laps yet.");
        }
        int best = 0;
        for (int i = 1; i < count; i++)
        {
            if (laps[i] < laps[best])
            {
                best = i;
            }
        }
        return best;
    }

    public string Report()
    {
        var sb = new System.Text.StringBuilder();
        sb.AppendLine(Title);
        int best = BestLap();
        double elapsed = 0;
        for (int i = 0; i < count; i++)
        {
            elapsed += laps[i];
            string mark = i == best ? " ← best" : "";
            sb.AppendLine($"  Lap {i + 1}: {Format(laps[i])}"
                + $"  (total {Format(elapsed)}){mark}");
        }
        sb.Append($"Average lap: {Format(TotalSeconds / count)}");
        return sb.ToString();
    }

    private static string Format(double seconds) =>
        TimeSpan.FromSeconds(seconds).ToString(@"m\:ss\.f");
}
```

The constructor creates the `laps` array with length `maxLaps`, and the `count` field stores the number of filled elements. This hides storage details, exposing only the `LapCount` property and methods to the caller. The `AddLap` method validates the time and checks whether the array is full. The `Format` helper is declared `private static`: it is needed only inside the class and does not use object state (static members are covered in Topic 8). The `m\:ss\.f` format prints minutes, seconds, and tenths of a second. Output:

```
Running track, 400 m
  Lap 1: 1:32.4  (total 1:32.4)
  Lap 2: 1:28.1  (total 3:00.5)
  Lap 3: 1:30.7  (total 4:31.2)
  Lap 4: 1:26.9  (total 5:58.1) ← best
  Lap 5: 1:29.3  (total 7:27.4)
Average lap: 1:29.4
```
