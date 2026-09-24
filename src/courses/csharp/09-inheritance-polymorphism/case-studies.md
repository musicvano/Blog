---
title: "Examples and common mistakes"
description: "Topic 9. Inheritance and polymorphism: Examples and common mistakes"
outline: [2, 3]
sourceHash: "a7f391cb4b0600f71a30bc7a2c5b1a9f6b9030a6c1c895415e96608e7d397aa7"
---

# Examples and common mistakes

## Example programs

### Payroll

An employee hierarchy: an `Employee` base class with virtual methods and derived classes with salaried and hourly pay. The payroll is calculated polymorphically in a single loop.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Employee[] staff =
[
    new SalariedEmployee("Koval O.", 32_000m),
    new HourlyEmployee("Bondar P.", 250m, 172),
    new HourlyEmployee("Melnyk I.", 250m, 190),
    new SalariedEmployee("Tkachenko A.", 41_500m),
];

decimal total = 0;
foreach (Employee e in staff)
{
    decimal pay = e.CalculatePay();       // late binding
    total += pay;
    Console.WriteLine($"{e.Describe(),-40}{pay,10:N2}");
}
Console.WriteLine($"{"Total",-40}{total,10:N2}");

class Employee
{
    public Employee(string name)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        Name = name;
    }

    public string Name { get; }

    public virtual decimal CalculatePay() => 0m;

    public virtual string Describe() => Name;
}

class SalariedEmployee : Employee
{
    public SalariedEmployee(string name, decimal salary) : base(name)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(salary);
        Salary = salary;
    }

    public decimal Salary { get; }

    public override decimal CalculatePay() => Salary;

    public override string Describe() => $"{base.Describe()} (salaried)";
}

class HourlyEmployee : Employee
{
    private const int NormHours = 168;

    public HourlyEmployee(string name, decimal rate, int hours)
        : base(name)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(rate);
        ArgumentOutOfRangeException.ThrowIfNegative(hours);
        Rate = rate;
        Hours = hours;
    }

    public decimal Rate { get; }
    public int Hours { get; }

    // Overtime hours are paid at 1.5 times the rate.
    public override decimal CalculatePay()
    {
        int overtime = Math.Max(0, Hours - NormHours);
        return (Hours - overtime) * Rate + overtime * Rate * 1.5m;
    }

    public override string Describe() =>
        $"{base.Describe()} ({Hours} h)";
}
```

The derived class constructors pass the name to the base class through `base(name)` and validate only their own data. The overridden `Describe` methods extend the base implementation by calling `base.Describe()`. The hourly employee’s `CalculatePay` method pays hours above the norm of 168 at time and a half. Output:

```
Koval O. (salaried)                      32 000,00
Bondar P. (172 h)                        43 500,00
Melnyk I. (190 h)                        50 250,00
Tkachenko A. (salaried)                  41 500,00
Total                                   167 250,00
```

### Equality of `Book` objects

The `Book` class overrides `ToString`, `Equals`, and `GetHashCode`: two books with the same ISBN and publication year are considered equal.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var a = new Book("978-966-03-4567-8", "Kobzar", 1840);
var b = new Book("978-966-03-4567-8", "Kobzar", 1840);
var c = new Book("978-617-12-0001-2", "Haidamaky", 1841);

Console.WriteLine(a);                            // ToString
Console.WriteLine($"a == b: {a == b}");          // references
Console.WriteLine($"a.Equals(b): {a.Equals(b)}");  // values
Console.WriteLine($"a.Equals(c): {a.Equals(c)}");
bool sameHash = a.GetHashCode() == b.GetHashCode();
Console.WriteLine($"Hashes equal: {sameHash}");
Console.WriteLine($"Type: {a.GetType().Name}");

class Book
{
    public Book(string isbn, string title, int year)
    {
        Isbn = isbn;
        Title = title;
        Year = year;
    }

    public string Isbn { get; }
    public string Title { get; }
    public int Year { get; }

    public override string ToString() =>
        $"“{Title}” ({Year}), {Isbn}";

    // Books are equal if their ISBN and publication year match.
    public override bool Equals(object? obj) =>
        obj is Book other && Isbn == other.Isbn && Year == other.Year;

    // Equal objects must have the same hash code.
    public override int GetHashCode() => HashCode.Combine(Isbn, Year);
}
```

The `obj is Book other` pattern checks the type and casts `obj` at the same time; for `null` and objects of other types, the result is `false`. The `==` operator is not overloaded, so it compares references and returns `False`, even though `Equals` returns `True`. Output:

```
“Kobzar” (1840), 978-966-03-4567-8
a == b: False
a.Equals(b): True
a.Equals(c): False
Hashes equal: True
Type: Book
```

### A virtual method and a `switch` on types

The program calculates the areas of shapes in two ways, with the virtual `Area` method and with a `switch` expression on types, and also demonstrates a property pattern and the `as` operator.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Shape[] shapes =
    [new Circle(1.5), new Rect(2, 3), new Triangle(3, 4, 5)];

foreach (Shape s in shapes)
{
    // Approach 1: a virtual method – each class knows its own area.
    double area1 = s.Area();

    // Approach 2: a switch expression on type – logic outside the classes.
    double area2 = s switch
    {
        Circle c => Math.PI * c.Radius * c.Radius,
        Rect r => r.Width * r.Height,
        Triangle t => HeronArea(t),
        _ => throw new NotSupportedException(s.GetType().Name),
    };

    string name = s.GetType().Name;
    Console.WriteLine($"{name,-9}{area1,8:F2}{area2,8:F2}");
}

if (shapes[1] is Rect { Width: > 1 } wide)
{
    Console.WriteLine($"Rectangle with width {wide.Width}");
}
Circle? circle = shapes[2] as Circle;
Console.WriteLine(circle is null ? "shapes[2] is not a circle" : "circle");

static double HeronArea(Triangle t)
{
    double p = (t.A + t.B + t.C) / 2;
    return Math.Sqrt(p * (p - t.A) * (p - t.B) * (p - t.C));
}

class Shape
{
    public virtual double Area() => 0;
}

class Circle(double radius) : Shape
{
    public double Radius { get; } = radius;
    public override double Area() => Math.PI * Radius * Radius;
}

class Rect(double width, double height) : Shape
{
    public double Width { get; } = width;
    public double Height { get; } = height;
    public override double Area() => Width * Height;
}

sealed class Triangle(double a, double b, double c) : Shape
{
    public double A { get; } = a;
    public double B { get; } = b;
    public double C { get; } = c;

    public override double Area()
    {
        double p = (A + B + C) / 2;
        return Math.Sqrt(p * (p - A) * (p - B) * (p - C));
    }
}
```

Both approaches give the same result, but for a new shape, the first requires only a new class, while the second requires changing the `switch` expression (otherwise the `_` arm with an exception is triggered). The `Triangle` class is sealed. Output:

```
Circle       7,07    7,07
Rect         6,00    6,00
Triangle     6,00    6,00
Rectangle with width 2
shapes[2] is not a circle
```

### Accounts and a custom exception

A credit account overrides the protected virtual `Available` property, so the base class’s `Withdraw` method allows going negative within the limit. A shortage of funds is reported by a custom exception with an additional property.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Account[] accounts =
[
    new Account("UA-01", 1_000m),
    new CreditAccount("UA-02", 1_000m, creditLimit: 5_000m),
];

foreach (Account acc in accounts)
{
    try
    {
        acc.Withdraw(3_000m);
        Console.WriteLine(
            $"{acc.Number}: withdrawn, balance {acc.Balance:N2}");
    }
    catch (InsufficientFundsException ex)
    {
        Console.WriteLine($"{acc.Number}: {ex.Message}");
        Console.WriteLine($"  short by {ex.Shortage:N2} UAH");
    }
}

class Account
{
    public Account(string number, decimal balance)
    {
        Number = number;
        Balance = balance;
    }

    public string Number { get; }
    public decimal Balance { get; protected set; }

    // Available amount: for a regular account, just the balance.
    protected virtual decimal Available => Balance;

    public void Withdraw(decimal amount)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(amount);
        if (amount > Available)
        {
            throw new InsufficientFundsException(amount - Available);
        }
        Balance -= amount;
    }
}

class CreditAccount : Account
{
    public CreditAccount(string number, decimal balance,
        decimal creditLimit) : base(number, balance)
    {
        CreditLimit = creditLimit;
    }

    public decimal CreditLimit { get; }

    protected override decimal Available => Balance + CreditLimit;
}

class InsufficientFundsException : Exception
{
    public InsufficientFundsException()
        : base("Insufficient funds.") { }

    public InsufficientFundsException(string message)
        : base(message) { }

    public InsufficientFundsException(string message, Exception inner)
        : base(message, inner) { }

    public InsufficientFundsException(decimal shortage)
        : this("Insufficient funds in the account.")
    {
        Shortage = shortage;
    }

    public decimal Shortage { get; }
}
```

The `Withdraw` method is not virtual and is the same for all accounts: the difference in behavior is concentrated in the `Available` property. The `Balance` property has a `protected set`: derived classes can change the balance, but client code cannot. Output:

```
UA-01: Insufficient funds in the account.
  short by 2 000,00 UAH
UA-02: withdrawn, balance -2 000,00
```

## Common mistakes

Table 9.1. Common mistakes with inheritance and polymorphism {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| the base class method is called instead of the derived one | the method is not `virtual`, or the derived class has no `override` (hiding); mark it `virtual`/`override` |
| CS0108 / CS0114: a member hides an inherited member | `override` or `new` is missing; choose overriding (usually) or an explicit `new` |
| CS0506: cannot override | the base method is not `virtual`; add `virtual` in the base class |
| CS7036 in a derived class constructor | the base class has no parameterless constructor; call `: base(…)` |
| `InvalidCastException` during a cast | the actual type is different; check with `is` or a type pattern, or use `as` |
| `Equals` overridden without `GetHashCode` | equal objects have different hash codes and “get lost” in dictionaries; override both methods |
| a “car : engine” hierarchy | there is no “is-a” relationship; use composition (an `Engine` field) |
| a deep hierarchy with many levels | changes to base classes break descendants; flatten the hierarchy and move behavior into separate classes |
