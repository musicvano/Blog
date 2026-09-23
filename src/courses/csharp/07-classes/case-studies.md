---
title: "Examples and common mistakes"
description: "Topic 7. Classes and objects: Examples and common mistakes"
outline: [2, 3]
sourceHash: "dc2853573015672e896f6a829831afb4f7bb61dcf9ff4382b3d4c07f969ac323"
---

# Examples and common mistakes

## Example programs

### The `Book` class

The class describes a book using auto-properties with `init` and a computed property. Objects are created with initializers in an array, and the program searches for books by part of the author’s name.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

Book[] books =
[
    new Book { Title = "Kobzar", Author = "Taras Shevchenko",
               Year = 1840 },
    new Book { Title = "Shadows of Forgotten Ancestors",
               Author = "Mykhailo Kotsiubynskyi", Year = 1911 },
    new Book { Title = "Haidamaky", Author = "Taras Shevchenko",
               Year = 1841 },
    new() { Title = "Intermezzo", Author = "Mykhailo Kotsiubynskyi",
            Year = 1908 },
];

Console.Write("Author (part of name): ");
string query = Console.ReadLine() ?? "";

int found = 0;
foreach (Book book in books)
{
    if (book.Author.Contains(query,
            StringComparison.OrdinalIgnoreCase))
    {
        Console.WriteLine($"  {book.Describe()}");
        found++;
    }
}
Console.WriteLine($"Found: {found}");

class Book
{
    public string Title { get; init; } = "";
    public string Author { get; init; } = "";
    public int Year { get; init; }

    // Computed property: the value is not stored.
    public string Century => $"century {(Year - 1) / 100 + 1}";

    public string Describe() =>
        $"“{Title}”, {Author}, {Year} ({Century})";
}
```

The `init` properties cannot be changed after creation, so a book added to the array cannot change accidentally. The last object in the array is created with `new()`: the element type is known from the array type. Output for the query “shevchenko”:

```
Author (part of name): shevchenko
  “Kobzar”, Taras Shevchenko, 1840 (century 19)
  “Haidamaky”, Taras Shevchenko, 1841 (century 19)
Found: 2
```

### The `BankAccount` class

The account stores its balance in a private field, exposes it through a read-only property, and allows changes only through `Deposit` and `Withdraw`, which validate the amount.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var account = new BankAccount("Olena Koval", 500m);
account.Deposit(1200m);
Console.WriteLine($"{account.Owner}: {account.Balance:N2} UAH");

try
{
    account.Withdraw(2000m);
}
catch (InvalidOperationException ex)
{
    Console.WriteLine($"Rejected: {ex.Message}");
}

account.Withdraw(700m);
Console.WriteLine($"After withdrawal: {account.Balance:N2} UAH");
Console.WriteLine($"Operations: {account.OperationCount}");

class BankAccount
{
    private decimal balance;      // hidden object state
    private int operationCount;

    public BankAccount(string owner, decimal initialBalance)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(owner);
        ArgumentOutOfRangeException.ThrowIfNegative(initialBalance);
        Owner = owner;
        balance = initialBalance;
    }

    public string Owner { get; }
    public decimal Balance => balance;
    public int OperationCount => operationCount;

    public void Deposit(decimal amount)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(amount);
        balance += amount;
        operationCount++;
    }

    public void Withdraw(decimal amount)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(amount);
        if (amount > balance)
        {
            throw new InvalidOperationException(
                $"insufficient funds (available: {balance:N2} UAH)");
        }
        balance -= amount;
        operationCount++;
    }
}
```

The constructor validates the owner and initial balance, so an invalid account cannot be created. The `Owner` property has no `set` and can be assigned only in the constructor. A failed withdrawal throws `InvalidOperationException` and leaves the state unchanged. Output:

```
Olena Koval: 1 700,00 UAH
Rejected: insufficient funds (available: 1 700,00 UAH)
After withdrawal: 1 000,00 UAH
Operations: 2
```

### The `Time` class

The class stores a time of day and validates hours and minutes in its main constructor; two other constructors call it through `this(…)`. The `AddMinutes` method returns a new object.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var start = new Time(8, 45);
var lesson = start.AddMinutes(80);
var midnight = new Time();
var noon = new Time(12);

Console.WriteLine($"{start.Format()} + 80 min = {lesson.Format()}");
Console.WriteLine($"Minutes since midnight: {lesson.TotalMinutes}");
Console.WriteLine($"{midnight.Format()} {noon.Format()}");
Console.WriteLine(new Time(23, 30).AddMinutes(45).Format());

try
{
    var wrong = new Time(24, 10);
}
catch (ArgumentOutOfRangeException ex)
{
    Console.WriteLine($"Error: {ex.ParamName} = {ex.ActualValue}");
}

class Time
{
    private readonly int hours;
    private readonly int minutes;

    // Main constructor: validation and assignment.
    public Time(int hours, int minutes)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(hours);
        ArgumentOutOfRangeException.ThrowIfGreaterThan(hours, 23);
        ArgumentOutOfRangeException.ThrowIfNegative(minutes);
        ArgumentOutOfRangeException.ThrowIfGreaterThan(minutes, 59);
        this.hours = hours;
        this.minutes = minutes;
    }

    // Other constructors call the main one.
    public Time(int hours) : this(hours, 0) { }
    public Time() : this(0, 0) { }

    public int Hours => hours;
    public int Minutes => minutes;
    public int TotalMinutes => hours * 60 + minutes;

    // Returns a new object; the current one is unchanged.
    public Time AddMinutes(int delta)
    {
        int total = ((TotalMinutes + delta) % 1440 + 1440) % 1440;
        return new Time(total / 60, total % 60);
    }

    public string Format() => $"{hours:D2}:{minutes:D2}";
}
```

The `readonly` fields do not change after object creation, so `AddMinutes` creates a new object instead of modifying the current one: such a class is called **immutable**. The expression `((x % 1440) + 1440) % 1440` reduces the number of minutes to one day even for a negative `delta`. The variable `wrong` is unused, so the compiler reports warning CS0219; the example uses it only to demonstrate the exception. Output:

```
08:45 + 80 min = 10:05
Minutes since midnight: 605
00:00 12:00
00:15
Error: hours = 24
```

### The `Temperature` class

The class uses a primary constructor and a property with the `field` keyword that prevents setting a temperature below absolute zero. The `Sensor` class stores a reference to a `Temperature` object and delegates reading and writing to it.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var room = new Temperature(21.5);
Console.WriteLine(room.Describe());

room.Celsius = -300;                   // below absolute zero
Console.WriteLine(room.Describe());

var sensor = new Sensor("Kitchen", room);
sensor.Celsius = 23.25;
Console.WriteLine(sensor.Report());

// Primary constructor: the initial parameter is available in the class body.
class Temperature(double initial)
{
    // C# 14: field is the automatically generated backing field.
    public double Celsius
    {
        get;
        set => field = Math.Max(value, -273.15);
    } = Math.Max(initial, -273.15);

    public double Fahrenheit => Celsius * 9 / 5 + 32;

    public string Describe() =>
        $"{Celsius:F2} °C = {Fahrenheit:F2} °F";
}

// Primary constructor parameters are stored in properties.
class Sensor(string location, Temperature temperature)
{
    public string Location { get; } = location;

    public double Celsius
    {
        get => temperature.Celsius;
        set => temperature.Celsius = value;
    }

    public string Report() => $"{Location}: {temperature.Describe()}";
}
```

The property initializer `= Math.Max(initial, -273.15)` assigns directly to the field, bypassing `set`, so the limit is repeated there too. The `sensor` object modifies the same `room` object that it references. Output:

```
21,50 °C = 70,70 °F
-273,15 °C = -459,67 °F
Kitchen: 23,25 °C = 73,85 °F
```

## Common mistakes

Table 7.1. Common mistakes when working with classes {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| public fields (`public decimal balance;`) | any code can assign an invalid value; use a private field and a property or method with validation |
| `NullReferenceException` when accessing an object | the variable was not initialized with an object (`new` was forgotten) or is `null`; create an object, check `is not null`, or use `?.` |
| changing an object’s “copy” changes the original | `b = a` copies the reference; create a new object with the same values |
| CS7036: no argument for a required constructor parameter | a parameterless constructor is not generated if another exists; supply arguments or add a constructor |
| `StackOverflowException` in a property | `set => Price = value;` calls itself; assign to the backing field (`price = value`) or `field` |
| CS9035 / CS8852 | a `required` property was not set in the initializer / an `init` property is changed after creation |
| duplicated validation in constructors | call the main constructor through `: this(…)` |
| `Console.WriteLine(obj)` prints the class name | override `ToString` or print the required properties |
