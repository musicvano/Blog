---
title: "Practice"
description: "Topic 8. Encapsulation, static members: worked examples"
outline: [2, 3]
sourceHash: "0661a53f8850cdf4bc137180899d5a56b3acd7ea2e62fb97b37e8f44af2d6f85"
---

# Practice

## Example 1. Temperature with factory methods

Create a `Temperature` class whose objects cannot be created directly with a constructor, only with the factory methods `FromCelsius`, `FromFahrenheit`, and `FromKelvin` or the `TryParse` method. The class does not allow temperatures below absolute zero.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var boiling = Temperature.FromCelsius(100);
var body = Temperature.FromFahrenheit(98.6);
var space = Temperature.FromKelvin(2.7);

Console.WriteLine(boiling);
Console.WriteLine(body);
Console.WriteLine(space);
Console.WriteLine($"Absolute zero: {Temperature.AbsoluteZero}");

string[] inputs = ["36,6C", "451F", "-300C", "abc"];
foreach (string text in inputs)
{
    Console.WriteLine(Temperature.TryParse(text, out Temperature? t)
        ? $"{text,-6} → {t}"
        : $"{text,-6} → invalid value");
}

class Temperature
{
    public static readonly Temperature AbsoluteZero = new(-273.15);

    private readonly double celsius;

    // Private constructor: objects are created only by class methods.
    private Temperature(double celsius)
    {
        if (celsius < -273.15)
        {
            throw new ArgumentOutOfRangeException(nameof(celsius),
                "Below absolute zero.");
        }
        this.celsius = celsius;
    }

    public double Celsius => celsius;
    public double Fahrenheit => celsius * 9 / 5 + 32;
    public double Kelvin => celsius + 273.15;

    public static Temperature FromCelsius(double c) => new(c);
    public static Temperature FromFahrenheit(double f) =>
        new((f - 32) * 5 / 9);
    public static Temperature FromKelvin(double k) => new(k - 273.15);

    // Parses "36,6C" or "451F"; returns false instead of throwing.
    public static bool TryParse(string text, out Temperature? result)
    {
        result = null;
        if (text.Length < 2
            || !double.TryParse(text[..^1], out double value))
        {
            return false;
        }
        double c = char.ToUpper(text[^1]) switch
        {
            'C' => value,
            'F' => (value - 32) * 5 / 9,
            'K' => value - 273.15,
            _ => double.NaN,
        };
        if (double.IsNaN(c) || c < -273.15)
        {
            return false;
        }
        result = new Temperature(c);
        return true;
    }

    public override string ToString() =>
        $"{celsius:F2} °C = {Fahrenheit:F2} °F = {Kelvin:F2} K";
}
```

All three scales are represented by a `double`, so three overloaded constructors cannot be declared: factory methods with different names solve this problem and make the call clear. The private constructor checks the invariant in one place. The `AbsoluteZero` field is declared `static readonly` because its type is a class, which is not allowed for `const`. The `TryParse` method returns `false` instead of throwing an exception and passes the result through an `out` parameter of type `Temperature?`. Output:

```
100,00 °C = 212,00 °F = 373,15 K
37,00 °C = 98,60 °F = 310,15 K
-270,45 °C = -454,81 °F = 2,70 K
Absolute zero: -273,15 °C = -459,67 °F = 0,00 K
36,6C  → 36,60 °C = 97,88 °F = 309,75 K
451F   → 232,78 °C = 451,00 °F = 505,93 K
-300C  → invalid value
abc    → invalid value
```

## Example 2. A student with an immutable record book number

Create a `Student` class in which the record book number is generated automatically from the admission year and a static counter of created objects and does not change after creation, while the name can be changed with validation.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var students = new[]
{
    new Student("Koval Olena", 2026),
    new Student("Bondar Petro", 2026),
    new Student("Melnyk Iryna", 2025),
};

foreach (Student s in students)
{
    Console.WriteLine($"{s.RecordBookNumber}  {s.FullName}");
}
Console.WriteLine($"Students created: {Student.Count}");

students[1].FullName = "Bondarenko Petro";   // the name can be changed
// students[1].RecordBookNumber = "…";        // CS0200: read-only
Console.WriteLine(students[1]);

class Student
{
    private static int count;
    private string fullName = "";

    public Student(string fullName, int admissionYear)
    {
        FullName = fullName;
        count++;
        RecordBookNumber = $"{admissionYear % 100:D2}-{count:D4}";
    }

    public static int Count => count;

    // The number is assigned once and never changes.
    public string RecordBookNumber { get; }

    public string FullName
    {
        get => fullName;
        set
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(value);
            fullName = value.Trim();
        }
    }

    public override string ToString() =>
        $"{RecordBookNumber} {FullName}";
}
```

The static `count` field is shared by all students, so each new object gets the next number. The `RecordBookNumber` property has no `set`: assigning it outside the constructor causes error CS0200. The static `Count` property lets you find out the number of created objects without any object. Output:

```
26-0001  Koval Olena
26-0002  Bondar Petro
25-0003  Melnyk Iryna
Students created: 3
26-0002 Bondarenko Petro
```

## Example 3. A class library for safe input

Create a `Survey` solution with a `Common.Input` class library containing a static `ConsoleInput` class with methods for safely reading numbers and choosing an option, and a `Survey.App` console application that uses the library for a questionnaire.

```
dotnet new sln -n Survey
dotnet new classlib -n Common.Input
dotnet new console -n Survey.App
dotnet sln add Common.Input Survey.App
dotnet add Survey.App reference Common.Input
```

The `Common.Input/ConsoleInput.cs` file:

```cs
namespace Common.Input;

/// <summary>Safe reading of data from the console.</summary>
public static class ConsoleInput
{
    public const string DefaultError =
        "Invalid value, try again.";

    public static int ReadInt(string prompt, int min = int.MinValue,
        int max = int.MaxValue)
    {
        while (true)
        {
            string text = ReadText(prompt);
            if (int.TryParse(text, out int value)
                && value >= min && value <= max)
            {
                return value;
            }
            Console.WriteLine($"{DefaultError} ({min}…{max})");
        }
    }

    public static double ReadDouble(string prompt)
    {
        while (true)
        {
            string text = ReadText(prompt).Replace('.', ',');
            if (double.TryParse(text, out double value))
            {
                return value;
            }
            Console.WriteLine(DefaultError);
        }
    }

    public static int ReadChoice(string prompt,
        params string[] options)
    {
        for (int i = 0; i < options.Length; i++)
        {
            Console.WriteLine($"  {i + 1}. {options[i]}");
        }
        return ReadInt(prompt, 1, options.Length) - 1;
    }

    // Internal method: library users do not need it.
    internal static string ReadText(string prompt)
    {
        Console.Write(prompt);
        return (Console.ReadLine() ?? throw new EndOfStreamException(
            "Input ended")).Trim();
    }
}
```

The `Survey.App/Program.cs` file:

```cs
using Common.Input;

Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

int age = ConsoleInput.ReadInt("Age: ", 10, 100);
int course = ConsoleInput.ReadChoice("Year of study: ",
    "first", "second", "third", "fourth");
double hours =
    ConsoleInput.ReadDouble("Hours of programming per week: ");

Console.WriteLine(
    $"Age {age}, year {course + 1}, {hours} h/week");
```

The library methods are public, and the helper `ReadText` is `internal`: the application cannot see it, but the library methods use it. If input ends (end of stream), `ReadText` throws `EndOfStreamException` instead of looping forever. The `ReadChoice` method with a `params` parameter accepts any number of options and returns the index of the selected one. The same library can be referenced by other applications in the course. Output (the `dotnet run --project Survey.App` command):

```
Age: 9
Invalid value, try again. (10…100)
Age: seventeen
Invalid value, try again. (10…100)
Age: 18
  1. first
  2. second
  3. third
  4. fourth
Year of study: 5
Invalid value, try again. (1…4)
Year of study: 1
Hours of programming per week: 7.5
Age 18, year 1, 7,5 h/week
```
