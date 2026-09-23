---
title: "Console input and output"
description: "Topic 1. .NET and program structure: Console input and output"
outline: [2, 3]
sourceHash: "9e582777ae4d165be6c02da6308988ea5dabed6f0718dcb652e837ed8c2b63be"
---

# Console input and output

## Console input and output

The `Console` class (<https://learn.microsoft.com/dotnet/api/system.console>) provides console operations:

- `Console.Write(value)` — writes a value without moving to a new line;
- `Console.WriteLine(value)` — writes a value and moves to a new line;
- `Console.ReadLine()` — reads a line entered by the user and returns it as `string?` (`null` when input has ended);
- `Console.ReadKey()` — waits for a single key press;
- `Console.Clear()` — clears the console window.

### Converting input

`ReadLine` always returns a string, so you must convert it to obtain a number. `int.Parse` throws a `FormatException` if the string is not a number, whereas `int.TryParse` returns a Boolean success value and writes the result to an output parameter:

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Enter your birth year: ");
string? input = Console.ReadLine();

if (int.TryParse(input, out int year))
{
    int age = DateTime.Now.Year - year;
    Console.WriteLine($"You turn {age} this year.");
}
else
{
    Console.WriteLine("Invalid value.");
}
```

Similarly, use `double.Parse` and `double.TryParse` for real numbers, and the `decimal` type with `decimal.Parse` and `decimal.TryParse` for monetary amounts. The decimal separator depends on the system's regional settings: a comma (`12,5`) for Ukrainian and a period (`12.5`) for English. A program expecting `12,5` will therefore not accept that value on a computer with English settings.

### Formatted output

**Interpolated strings** prefixed with `$` are convenient for formatted output: expressions in braces are evaluated and inserted into the string, and a format can be specified after a colon (Table 1.5):

```cs
double price = 1234.5;
// Prints: Price: 1234,50 UAH
Console.WriteLine($"Price: {price:F2} UAH");
```

Table 1.5. Numeric format specifiers {.caption}

| **Format** | **Example** | **Result for 1234,567** |
| --- | --- | --- |
| `F2` | `{x:F2}` | 1234,57 — fixed number of decimal places |
| `N2` | `{x:N2}` | 1 234,57 — with digit grouping separators |
| `E2` | `{x:E2}` | 1,23E+003 — scientific notation |
| `C` | `{x:C}` | 1 234,57 ₴ — currency format |
| `P1` | `{0.25:P1}` | 25,0% — percentage (without a space before %) |
| `,10` | `{x,10:F1}` | right-aligned in a field 10 characters wide |
| `,-10` | `{s,-10}` | left-aligned in a field 10 characters wide |

All standard numeric format specifiers are documented at <https://learn.microsoft.com/dotnet/standard/base-types/standard-numeric-format-strings>. Dates and times are formatted similarly: `{date:dd.MM.yyyy}` displays the date, and `{date:HH:mm}` the time (<https://learn.microsoft.com/dotnet/standard/base-types/custom-date-and-time-format-strings>).

Strings can contain **escape sequences**: `\n` for a new line, `\t` for a tab, `\"` for a quotation mark, and `\\` for a backslash. In a string prefixed with `@` (`@"C:\Temp"`), the backslash has no special meaning, which is convenient for file paths.

### UTF-8 encoding

To display and enter Ukrainian letters correctly in the Windows console, set UTF-8 encoding at the beginning of the program:

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;
```

The `Console.ForegroundColor` property changes the text color, for example `Console.ForegroundColor = ConsoleColor.Red;`, and `Console.ResetColor()` restores the default colors. Do not convey important information through color alone: colors look different in different terminal themes.

## Program examples

### Temperature converter

The program asks for a temperature in Celsius and converts it to Fahrenheit and Kelvin. If the user enters something other than a number, the prompt repeats.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

double celsius = ReadNumber("Temperature in Celsius: ");
double fahrenheit = celsius * 9 / 5 + 32;
double kelvin = celsius + 273.15;

Console.WriteLine($"In Fahrenheit: {fahrenheit:F1} °F");
Console.WriteLine($"In Kelvin: {kelvin:F2} K");

// Repeats the prompt until the user enters a number.
static double ReadNumber(string prompt)
{
    while (true)
    {
        Console.Write(prompt);
        string? input = Console.ReadLine();
        if (double.TryParse(input, out double value))
        {
            return value;
        }
        Console.WriteLine("That is not a number. Try again.");
    }
}
```

Repeated input is extracted into the **local function** `ReadNumber`; the `while (true)` loop ends with `return` as soon as a number is entered. Example session (the user enters `abc` and `-12,5`):

```
Temperature in Celsius: abc
That is not a number. Try again.
Temperature in Celsius: -12,5
In Fahrenheit: 9,5 °F
In Kelvin: 260,65 K
```

### Purchase receipt

The program reads a product name, price, and quantity, then prints a receipt as an aligned table. Monetary amounts use `decimal`, which stores decimal fractions without rounding errors; the `m` suffix indicates a `decimal` literal.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

Console.Write("Product name: ");
string name = Console.ReadLine() ?? "";
Console.Write("Unit price, UAH: ");
decimal price = decimal.Parse(Console.ReadLine() ?? "0");
Console.Write("Quantity: ");
int count = int.Parse(Console.ReadLine() ?? "0");

decimal total = price * count;
decimal vat = total * 0.2m / 1.2m; // 20% VAT included in the price
string line = new string('-', 38);

Console.WriteLine();
Console.WriteLine($"{"Product",-20}{"Qty",6}{"Amount",12}");
Console.WriteLine(line);
Console.WriteLine($"{name,-20}{count,6}{total,12:N2}");
Console.WriteLine(line);
Console.WriteLine($"{"Total due:",-26}{total,12:N2}");
Console.WriteLine($"{"including VAT:",-26}{vat,12:N2}");
```

The `??` operator substitutes an empty string or `"0"` if `ReadLine` returns `null`. A negative field width (`-20`) aligns text to the left; a positive width (`6`, `12`) aligns it to the right. Output:

```
Product name: Headphones
Unit price, UAH: 1299,50
Quantity: 2

Product                Qty      Amount
--------------------------------------
Headphones               2    2 599,00
--------------------------------------
Total due:                    2 599,00
including VAT:                  433,17
```

### Travel time

The program calculates how many hours and minutes a trip will take and the estimated arrival time.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Distance, km: ");
int distance = int.Parse(Console.ReadLine() ?? "0");
Console.Write("Average speed, km/h: ");
int speed = int.Parse(Console.ReadLine() ?? "0");

int totalMinutes = distance * 60 / speed; // integer division
int hours = totalMinutes / 60;
int minutes = totalMinutes % 60;          // remainder

DateTime arrival = DateTime.Now.AddMinutes(totalMinutes);
Console.WriteLine($"Travel time: {hours} h {minutes} min");
Console.WriteLine($"Estimated arrival at {arrival:HH:mm}");
```

Integer division discards the fractional part, and `%` returns the remainder, so 331 minutes is 5 hours and 31 minutes. `AddMinutes` adds minutes to the current time. Output (the arrival time depends on when the program runs):

```
Distance, km: 470
Average speed, km/h: 85
Travel time: 5 h 31 min
Estimated arrival at 16:45
```

::: tip Self-check task
What happens if you enter a speed of `0`? Change the program to report an invalid speed using `int.TryParse` and a `speed > 0` check.
:::
