---
title: "Practice"
description: "Topic 1. .NET and program structure: worked examples"
outline: [2, 3]
sourceHash: "c865ebeb5ea75cc7db9be58f6ca876fbef5675ba29b308d9fa31517cc9798e83"
---

# Practice

## Example 1. Greeting the user

Write a program that asks for the user's name and displays a greeting with the current date and time.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

Console.Write("Enter your name: ");
string? name = Console.ReadLine();

if (string.IsNullOrWhiteSpace(name))
{
    name = "student";
}

DateTime now = DateTime.Now;
Console.WriteLine($"Hello, {name}!");
Console.WriteLine($"Today is {now:dd.MM.yyyy}.");
Console.WriteLine($"Current time: {now:HH:mm}.");
```

`ReadLine` returns `string?`, a string that can be `null`. `string.IsNullOrWhiteSpace` checks whether at least one visible character was entered. The `dd.MM.yyyy` and `HH:mm` specifiers set the date and time formats.

## Example 2. Area and perimeter of a rectangle

Write a program that reads the width and height of a rectangle, validates the input, and displays its area and perimeter with two decimal places.

```cs
using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

double width = ReadPositive("Rectangle width, cm: ");
double height = ReadPositive("Rectangle height, cm: ");

double area = width * height;
double perimeter = 2 * (width + height);

Console.WriteLine($"Area: {area:F2} cm²");
Console.WriteLine($"Perimeter: {perimeter:F2} cm");

// Reads a positive number; the separator can be a comma or a period.
static double ReadPositive(string prompt)
{
    while (true)
    {
        Console.Write(prompt);
        string input = Console.ReadLine() ?? "";
        input = input.Replace(',', '.');
        if (double.TryParse(input, NumberStyles.Float,
            CultureInfo.InvariantCulture, out double value)
            && value > 0)
        {
            return value;
        }
        Console.WriteLine("Error: enter a positive number.");
    }
}
```

Repeated numeric input is extracted into the **local function** `ReadPositive` (functions are covered in detail in Topic 5). The `??` operator replaces `null` with an empty string, a comma is replaced with a period, and `CultureInfo.InvariantCulture` specifies a period as the decimal separator regardless of system settings. The loop repeats the prompt until the user enters a positive number.

Example session:

```
Rectangle width, cm: abc
Error: enter a positive number.
Rectangle width, cm: 12,5
Rectangle height, cm: 4.2
Area: 52,50 cm²
Perimeter: 33,40 cm
```

## Example 3. Program information and command-line arguments

Use the dotnet CLI to create a project with an explicit `Program` class and `Main` method that displays the .NET version, operating system name, and received command-line arguments.

```
dotnet new console -n ProgramInfo --use-program-main
cd ProgramInfo
dotnet run -- alpha "beta gamma"
```

```cs
using System.Runtime.InteropServices;

namespace ProgramInfo;

internal class Program
{
    static void Main(string[] args)
    {
        Console.OutputEncoding = System.Text.Encoding.UTF8;

        string clr = RuntimeInformation.FrameworkDescription;
        string os = RuntimeInformation.OSDescription;

        Console.WriteLine($"Version: {Environment.Version}");
        Console.WriteLine($"Runtime: {clr}");
        Console.WriteLine($"OS: {os}");
        Console.WriteLine($"Arguments: {args.Length}");

        for (int i = 0; i < args.Length; i++)
        {
            Console.WriteLine($"  args[{i}] = {args[i]}");
        }
    }
}
```

The `--use-program-main` option creates a template with a `Main` method instead of top-level statements. Everything after `--` in `dotnet run` is passed to the program as arguments; a quoted argument containing a space is passed as one element of the `args` array. Output:

```
Version: 10.0.11
Runtime: .NET 10.0.11
OS: Microsoft Windows 10.0.26200
Arguments: 2
  args[0] = alpha
  args[1] = beta gamma
```
