---
title: "Examples and common mistakes"
description: "Topic 10. Abstract classes, interfaces: Examples and common mistakes"
outline: [2, 3]
sourceHash: "28a53b0bf5db75767a88b47c0f77e153c0e7f586dc66bea268b01dc3502bb77b"
---

# Examples and common mistakes

## Example programs

### The abstract `Shape` class

The abstract `Shape` class stores a name and contains the abstract members `Area` and `Kind`, and the regular `Describe` method uses them for a formatted description. The report processes an array of shapes polymorphically.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Shape[] shapes =
[
    new Circle("Manhole cover", 0.4),
    new Rectangle("Floor", 5.2, 3.8),
    new Triangle("Gable", 6, 2.5),
];

double total = 0;
foreach (Shape s in shapes)
{
    Console.WriteLine(s.Describe());
    total += s.Area();
}
Console.WriteLine($"Total area: {total:F2} m²");

// Abstract class: a Shape object cannot be created.
abstract class Shape
{
    protected Shape(string name)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        Name = name;
    }

    public string Name { get; }

    // Abstract members: the derived class must provide the implementation.
    public abstract double Area();
    public abstract string Kind { get; }

    // A regular method uses the abstract members.
    public string Describe() =>
        $"{Kind,-13}{Name,-14}{Area(),8:F2} m²";
}

class Circle(string name, double radius) : Shape(name)
{
    public override string Kind => "circle";
    public override double Area() => Math.PI * radius * radius;
}

class Rectangle(string name, double width, double height)
    : Shape(name)
{
    public override string Kind => "rectangle";
    public override double Area() => width * height;
}

class Triangle(string name, double baseLength, double height)
    : Shape(name)
{
    public override string Kind => "triangle";
    public override double Area() => baseLength * height / 2;
}
```

The abstract class constructor has the `protected` modifier: only derived classes call it. The derived classes use primary constructors and pass the name to `Shape(name)`. Output:

```
circle       Manhole cover     0,50 m²
rectangle    Floor            19,76 m²
triangle     Gable             7,50 m²
Total area: 27,76 m²
```

### A template method for reports

The abstract `Report` class sets the printing order: header, body, footer. The report body is an abstract step, the footer is virtual, and the header is private and fixed.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Report[] reports =
[
    new SalesReport(["Laptop;3;32999", "Mouse;12;449,5"]),
    new StockReport(["Laptop;4", "Mouse;0", "USB-C cable;57"]),
];

foreach (Report r in reports)
{
    r.Print();
    Console.WriteLine();
}

abstract class Report
{
    // Template method: the order of steps is shared by all reports.
    public void Print()
    {
        PrintHeader();
        PrintBody();
        PrintFooter();
    }

    protected abstract string Title { get; }
    protected abstract void PrintBody();

    // Optional step: a derived class can change the footer.
    protected virtual void PrintFooter() =>
        Console.WriteLine(new string('─', 34));

    private void PrintHeader()
    {
        Console.WriteLine(Title.ToUpper());
        Console.WriteLine(new string('─', 34));
    }
}

class SalesReport(string[] lines) : Report
{
    private decimal total;

    protected override string Title => "Sales report";

    protected override void PrintBody()
    {
        foreach (string line in lines)
        {
            string[] p = line.Split(';');
            decimal sum = int.Parse(p[1]) * decimal.Parse(p[2]);
            total += sum;
            Console.WriteLine($"{p[0],-16}{p[1],4} pcs{sum,11:N2}");
        }
    }

    protected override void PrintFooter()
    {
        base.PrintFooter();
        Console.WriteLine($"{"Total",-23}{total,11:N2}");
    }
}

class StockReport(string[] lines) : Report
{
    protected override string Title => "Warehouse stock";

    protected override void PrintBody()
    {
        foreach (string line in lines)
        {
            string[] p = line.Split(';');
            string mark = p[1] == "0" ? "  ← out of stock" : "";
            Console.WriteLine($"{p[0],-16}{p[1],4} pcs{mark}");
        }
    }
}
```

The `Print` method is not virtual: derived classes cannot change the order of the steps. `SalesReport` overrides the footer and calls the base version to add the “Total” line. Output:

```
SALES REPORT
──────────────────────────────────
Laptop             3 pcs  98 997,00
Mouse             12 pcs   5 394,00
──────────────────────────────────
Total                   104 391,00

WAREHOUSE STOCK
──────────────────────────────────
Laptop             4 pcs
Mouse              0 pcs  ← out of stock
USB-C cable       57 pcs
──────────────────────────────────
```

### Smart home interfaces

Devices implement the `ISwitchable` interface, and dimmable lamps also implement `IDimmable`. The program turns on all devices and lowers the brightness of those that support it.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

ISwitchable[] devices =
[
    new SmartLamp("Living room lamp"),
    new Kettle("Kettle"),
    new SmartLamp("Night light"),
];

foreach (ISwitchable device in devices)
{
    device.TurnOn();
    if (device is IDimmable dimmable)       // interface check
    {
        dimmable.Brightness = 40;
    }
}

foreach (ISwitchable device in devices)
{
    Console.WriteLine(device.Status);
}

interface ISwitchable
{
    bool IsOn { get; }
    void TurnOn();
    void TurnOff();

    // Default member: an implementation in the interface.
    string Status =>
        $"{GetType().Name}: {(IsOn ? "on" : "off")}";
}

interface IDimmable
{
    int Brightness { get; set; }
}

class SmartLamp(string name) : ISwitchable, IDimmable
{
    private int brightness = 100;

    public bool IsOn { get; private set; }
    public void TurnOn() => IsOn = true;
    public void TurnOff() => IsOn = false;

    public int Brightness
    {
        get => brightness;
        set => brightness = Math.Clamp(value, 0, 100);
    }

    // Its own Status replaces the default implementation.
    public string Status => IsOn
        ? $"{name}: on, brightness {Brightness}%"
        : $"{name}: off";
}

class Kettle(string name) : ISwitchable
{
    public bool IsOn { get; private set; }
    public void TurnOn() => IsOn = true;
    public void TurnOff() => IsOn = false;
    public override string ToString() => name;
}
```

The kettle has no `Status` property of its own, so the default implementation from the interface is used; the lamp provides its own. The `device is IDimmable dimmable` pattern checks whether the device supports the second interface. Output:

```
Living room lamp: on, brightness 40%
Kettle: on
Night light: on, brightness 40%
```

### Sorting runners

The `Runner` class implements `IComparable<Runner>` (the natural order is by time), and a separate `ByAgeThenName` class implements `IComparer<Runner>` for sorting by age and name.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Runner[] runners =
[
    new("Koval Olena", 21, TimeSpan.Parse("00:42:15")),
    new("Bondar Petro", 34, TimeSpan.Parse("00:39:58")),
    new("Melnyk Iryna", 21, TimeSpan.Parse("00:45:02")),
    new("Tkachenko Andrii", 28, TimeSpan.Parse("00:39:58")),
];

Array.Sort(runners);                        // IComparable<Runner>
Print("By time:", runners);

Array.Sort(runners, new ByAgeThenName());   // IComparer<Runner>
Print("By age, then by name:", runners);

static void Print(string title, Runner[] list)
{
    Console.WriteLine(title);
    foreach (Runner r in list)
    {
        Console.WriteLine($"  {r.Name,-17}{r.Age,3}  {r.Time}");
    }
}

class Runner(string name, int age, TimeSpan time)
    : IComparable<Runner>
{
    public string Name { get; } = name;
    public int Age { get; } = age;
    public TimeSpan Time { get; } = time;

    // Natural order: shorter time ranks higher; with equal times, by name.
    public int CompareTo(Runner? other)
    {
        if (other is null)
        {
            return 1;
        }
        int byTime = Time.CompareTo(other.Time);
        return byTime != 0
            ? byTime
            : string.Compare(Name, other.Name,
                StringComparison.CurrentCulture);
    }
}

// A different sort order is a separate comparer class.
class ByAgeThenName : IComparer<Runner>
{
    public int Compare(Runner? x, Runner? y)
    {
        if (x is null || y is null)
        {
            return x is null ? (y is null ? 0 : -1) : 1;
        }
        int byAge = x.Age.CompareTo(y.Age);
        return byAge != 0
            ? byAge
            : string.Compare(x.Name, y.Name,
                StringComparison.CurrentCulture);
    }
}
```

`Array.Sort(runners)` uses each runner’s `CompareTo`, and `Array.Sort(runners, comparer)` uses the comparer’s `Compare` method. With equal times or ages, the order is determined by the name according to the current culture. Output:

```
By time:
  Bondar Petro      34  00:39:58
  Tkachenko Andrii  28  00:39:58
  Koval Olena       21  00:42:15
  Melnyk Iryna      21  00:45:02
By age, then by name:
  Koval Olena       21  00:42:15
  Melnyk Iryna      21  00:45:02
  Tkachenko Andrii  28  00:39:58
  Bondar Petro      34  00:39:58
```

## Common mistakes

Table 10.2. Common mistakes when working with abstract classes and interfaces {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| CS0144: cannot create an instance of the abstract class | `new` used for an abstract class or interface; create an object of a derived class |
| CS0534 / CS0535 | an abstract member or interface member is not implemented; add `override` or an implementation |
| CS0737: the implementation is not public | an interface member implemented without `public`; add `public` or use an explicit implementation |
| a “fat” interface with dozens of methods | classes are forced to implement things they do not need; split it into several small interfaces |
| an abstract class without abstract members or shared code | an unnecessary level in the hierarchy; use an interface or a regular class |
| `CompareTo` breaks the contract | the result is asymmetric or depends on `null`; return consistent values and check for `null` |
| a resource is not released | an `IDisposable` object without `using`; wrap it in `using` or call `Dispose` in `finally` |
| an explicitly implemented method “is not found” | the method is accessible only through an interface variable; cast the object to the interface |
