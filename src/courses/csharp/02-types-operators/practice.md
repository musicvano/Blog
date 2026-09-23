---
title: "Practice"
description: "Topic 2. Types, variables, and operators: worked examples"
outline: [2, 3]
sourceHash: "46a5fffc500ea0a7b08144bbc3f8bade2e7b0aac34acf0b36d1812bad202448c"
---

# Practice

## Example 1. Converting speed units

Write a program that asks for a speed in kilometers per hour, validates the input, and prints a table with the speed in miles per hour, knots, and meters per second.

```cs
using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const double KmPerMile = 1.609344;         // international mile
const double KmPerNauticalMile = 1.852;    // nautical mile

Console.Write("Speed, km/h: ");
string input = (Console.ReadLine() ?? "").Replace(',', '.');

if (!double.TryParse(input, NumberStyles.Float,
        CultureInfo.InvariantCulture, out double kmh)
    || kmh < 0 || double.IsInfinity(kmh))
{
    Console.WriteLine("Error: enter a nonnegative number.");
    return;
}

double mph = kmh / KmPerMile;
double knots = kmh / KmPerNauticalMile;
double ms = kmh * 1000 / 3600;

Console.WriteLine($"{"Unit",-12}{"Value",12}");
Console.WriteLine(new string('-', 24));
Console.WriteLine($"{"km/h",-12}{kmh,12:F2}");
Console.WriteLine($"{"mph",-12}{mph,12:F2}");
Console.WriteLine($"{"knots",-12}{knots,12:F2}");
Console.WriteLine($"{"m/s",-12}{ms,12:F2}");
```

Conversion factors are declared with `const`, so the calculations contain no “magic numbers.” A comma in the input is replaced with a period, and the string is parsed with `CultureInfo.InvariantCulture`, so the program accepts both separators. The condition uses `!` and `||`: if `TryParse` returns `false`, the rest of the condition is not evaluated (short-circuit evaluation). `1e400` does not fit in `double` and is parsed as infinity, so `double.IsInfinity` rejects it. The `return` statement ends the program. Output:

```
Speed, km/h: 90
Unit               Value
------------------------
km/h               90,00
mph                55,92
knots              48,60
m/s                25,00
```

For invalid input (`abc`, `-5`, or `1e400`), the program displays `Error: enter a nonnegative number.`

## Example 2. Taxi fare

Write a program that calculates a taxi fare: a base fare of 60 UAH, 18.50 UAH per kilometer, and 3 UAH for each started minute of travel. The user enters the distance, duration in seconds, and an optional promotional discount percentage (no more than 50%).

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

const decimal BaseFare = 60m;        // base fare, UAH
const decimal PricePerKm = 18.50m;   // UAH per kilometer
const decimal PricePerMinute = 3m;   // UAH per minute of travel

Console.Write("Distance, km: ");
decimal distance = decimal.Parse(Console.ReadLine() ?? "0");
Console.Write("Trip duration, s: ");
int durationSeconds = int.Parse(Console.ReadLine() ?? "0");
Console.Write("Promo code, % discount (Enter – no discount): ");
string? promo = Console.ReadLine();

// A partial minute is charged as a full minute.
int minutes = (int)Math.Ceiling(durationSeconds / 60.0);

// int? – an integer or null if no discount was entered.
int? discount = int.TryParse(promo, out int percent)
    ? percent
    : null;
int discountPercent = Math.Clamp(discount ?? 0, 0, 50);

decimal cost = BaseFare + distance * PricePerKm
    + minutes * PricePerMinute;
decimal discountSum = Math.Round(cost * discountPercent / 100, 2);
decimal toPay = cost - discountSum;

Console.WriteLine($"Billable minutes: {minutes}");
Console.WriteLine($"Fare:  {cost,10:N2} UAH");
Console.WriteLine($"Discount {discountPercent,2} %: {discountSum,7:N2} UAH");
Console.WriteLine($"Total due: {toPay,10:N2} UAH");
```

Monetary values use `decimal`. The division `durationSeconds / 60.0` uses `double` (the second operand is floating-point), and `Math.Ceiling` rounds upward: 1275 s is 21.25 min, or 22 billable minutes. The variable `discount` has type `int?`: the conditional operator `?:` returns a number if parsing succeeds, otherwise `null`. The `??` operator replaces `null` with zero, and `Math.Clamp` limits the discount to 0–50. Results with a 15% discount and without a discount:

```
Distance, km: 12,4
Trip duration, s: 1275
Promo code, % discount (Enter – no discount): 15
Billable minutes: 22
Fare:      355,40 UAH
Discount 15 %:   53,31 UAH
Total due:     302,09 UAH
```

```
Distance, km: 3
Trip duration, s: 200
Promo code, % discount (Enter – no discount):
Billable minutes: 4
Fare:      127,50 UAH
Discount  0 %:    0,00 UAH
Total due:     127,50 UAH
```

## Example 3. Bit analysis of an integer

Write a program that reads an `int` and displays its binary and hexadecimal representations, the same bits interpreted as `uint`, whether it is even and a power of two, the number of set bits, the low-order byte, and the results of shifting by one bit.

```cs
using System.Numerics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Integer: ");
if (!int.TryParse(Console.ReadLine(), out int n))
{
    Console.WriteLine("Error: an integer of type int is required.");
    return;
}

uint bits = (uint)n;              // the same 32 bits, unsigned
bool isEven = (n & 1) == 0;
bool isPowerOfTwo = n > 0 && (n & (n - 1)) == 0;
int ones = BitOperations.PopCount(bits);

Console.WriteLine($"Binary:        {n:B32}");
Console.WriteLine($"Hexadecimal:  0x{n:X8}");
Console.WriteLine($"As uint:          {bits}");
Console.WriteLine($"Even:            {isEven}");
Console.WriteLine($"Power of two:   {isPowerOfTwo}");
Console.WriteLine($"Set bits:  {ones}");
Console.WriteLine($"Low-order byte:    {n & 0xFF}");
Console.WriteLine($"n << 1 = {n << 1}, n >> 1 = {n >> 1}");
```

A number is even if its low-order bit is zero: `(n & 1) == 0`. A power of two has exactly one set bit, so `n & (n - 1)` is zero. Parentheses are needed because `==` has higher precedence than `&`. `BitOperations.PopCount` in `System.Numerics` counts set bits (<https://learn.microsoft.com/dotnet/api/system.numerics.bitoperations>). Negative numbers use **two’s complement**, so the high-order bits of −8 are ones, and casting to `uint` gives 4 294 967 288. Results for 2026 and −8:

```
Integer: 2026
Binary:        00000000000000000000011111101010
Hexadecimal:  0x000007EA
As uint:          2026
Even:            True
Power of two:   False
Set bits:  8
Low-order byte:    234
n << 1 = 4052, n >> 1 = 1013
```

```
Integer: -8
Binary:        11111111111111111111111111111000
Hexadecimal:  0xFFFFFFF8
As uint:          4294967288
Even:            True
Power of two:   False
Set bits:  29
Low-order byte:    248
n << 1 = -16, n >> 1 = -4
```

The number 3000000000 does not fit in `int`, so `TryParse` returns `false` and the program displays an error message.
