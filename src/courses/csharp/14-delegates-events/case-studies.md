---
title: "Examples and common mistakes"
description: "Topic 14. Delegates, lambdas, events: Examples and common mistakes"
outline: [2, 3]
sourceHash: "34f1905e3a4bee966943a7247fdab68e99d6feea0a4077fc9dad602d5c874724"
---

# Examples and common mistakes

## Example programs

### Tabulating functions

The `Tabulate` method takes a function as a parameter of type `Func<double, double>` and prints its values on an interval. The functions are passed as a library method, a lambda expression, and a custom method.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// A delegate variable can refer to any compatible method.
Func<double, double> sin = Math.Sin;            // a BCL method
Func<double, double> square = x => x * x;       // a lambda expression
Func<double, double> damped = Damped;           // a custom method

Tabulate("sin x", sin, 0, 1.5, 0.5);
Tabulate("x²", square, 0, 1.5, 0.5);
Tabulate("e^(-x)·cos 3x", damped, 0, 1.5, 0.5);

// A lambda can also be passed directly.
Tabulate("√x + 1", x => Math.Sqrt(x) + 1, 0, 1.5, 0.5);

static void Tabulate(
    string title, Func<double, double> f,
    double from, double to, double step)
{
    Console.Write($"{title,-14}|");
    for (double x = from; x <= to + step / 2; x += step)
    {
        Console.Write($"{f(x),8:F3}");       // a call through the delegate
    }
    Console.WriteLine();
}

static double Damped(double x) => Math.Exp(-x) * Math.Cos(3 * x);
```

The `Tabulate` method does not know which function it tabulates: it just calls `f(x)`. The method groups `Math.Sin` and `Damped` are converted to a delegate automatically because their signatures are compatible with `Func<double, double>`. The condition `x <= to + step / 2` compensates for the accumulated error of floating-point steps. Output:

```
sin x         |   0,000   0,479   0,841   0,997
x²            |   0,000   0,250   1,000   2,250
e^(-x)·cos 3x |   1,000   0,043  -0,364  -0,047
√x + 1        |   1,000   1,707   2,000   2,225
```

### Filtering and sorting products

The selection conditions are described by `Predicate<Product>` delegates, and the higher-order functions `And` and `Not` build compound conditions from them. Sorting is defined by a `Comparison<Product>` lambda.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

List<Product> products =
[
    new("Laptop", 32_999m, "tech", 4.6),
    new("Mouse", 449m, "tech", 4.1),
    new("Kettle", 1_299m, "home", 4.8),
    new("Headphones", 2_499m, "tech", 3.9),
    new("Iron", 1_899m, "home", 4.4),
];

Predicate<Product> isTech = p => p.Category == "tech";
Predicate<Product> isCheap = p => p.Price < 3_000m;
Predicate<Product> wellRated = p => p.Rating >= 4.0;

Print("Affordable tech", products.FindAll(And(isTech, isCheap)));
Print("Good rating, not tech",
    products.FindAll(And(wellRated, Not(isTech))));

// Comparison<T>: first by category, then by descending price.
products.Sort((a, b) =>
{
    int byCategory = string.Compare(a.Category, b.Category);
    return byCategory != 0 ? byCategory : b.Price.CompareTo(a.Price);
});
Print("Sorted", products);

int removed = products.RemoveAll(p => p.Rating < 4.0);
Console.WriteLine($"Removed with a low rating: {removed}");

// Higher-order functions: they take and return delegates.
static Predicate<T> And<T>(Predicate<T> a, Predicate<T> b) =>
    item => a(item) && b(item);

static Predicate<T> Not<T>(Predicate<T> condition) =>
    item => !condition(item);

static void Print(string title, List<Product> items)
{
    Console.WriteLine($"{title}:");
    foreach (Product p in items)
    {
        string price = $"{p.Price:N2}";
        Console.WriteLine(
            $"  {p.Name,-10} {p.Category,-8} {price,10}  {p.Rating}");
    }
}

record Product(
    string Name, decimal Price, string Category, double Rating);
```

The `And` and `Not` methods return new lambdas that capture the conditions passed to them. `FindAll` returns a new list, `Sort` sorts the existing list using a statement lambda, and `RemoveAll` removes elements and returns their number. Output:

```
Affordable tech:
  Mouse      tech         449,00  4,1
  Headphones tech       2 499,00  3,9
Good rating, not tech:
  Kettle     home       1 299,00  4,8
  Iron       home       1 899,00  4,4
Sorted:
  Iron       home       1 899,00  4,4
  Kettle     home       1 299,00  4,8
  Laptop     tech      32 999,00  4,6
  Headphones tech       2 499,00  3,9
  Mouse      tech         449,00  4,1
Removed with a low rating: 1
```

### Counters and the loop variable trap

The `MakeCounter` method returns a lambda that captures its own `count` variable. The second part demonstrates capturing a `for` loop variable.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// Each counter has its own captured count variable.
Func<int> tickets = MakeCounter("T-", 100);
Func<int> orders = MakeCounter("O-", 1);
tickets();
tickets();
orders();
tickets();

// The trap: all lambdas capture the single for loop variable i.
List<Action> wrong = [];
for (int i = 1; i <= 3; i++)
{
    wrong.Add(() => Console.Write($"{i} "));
}
Console.Write("for without a copy: ");
foreach (Action action in wrong) action();
Console.WriteLine();

// The fix: a local copy is created on each iteration.
List<Action> right = [];
for (int i = 1; i <= 3; i++)
{
    int copy = i;
    right.Add(() => Console.Write($"{copy} "));
}
Console.Write("for with a copy:    ");
foreach (Action action in right) action();
Console.WriteLine();

static Func<int> MakeCounter(string prefix, int start)
{
    int count = start - 1;             // captured by the lambda
    return () =>
    {
        count++;
        Console.WriteLine($"Issued number {prefix}{count}");
        return count;
    };
}
```

The `tickets` and `orders` counters are independent: each call to `MakeCounter` creates a new `count` variable. In the first loop, all three lambdas capture the single variable `i`, which equals 4 after the loop ends. In the second loop, the `copy` variable is declared in the loop body, so a new variable is captured on each iteration. Output:

```
Issued number T-100
Issued number T-101
Issued number O-1
Issued number T-102
for without a copy: 4 4 4
for with a copy:    1 2 3
```

### Thermostat

The `Thermostat` class raises the `TemperatureChanged` event according to the standard .NET pattern. The event has three subscribers: a “display” lambda, a static logging method, and a method of an `AlarmSystem` object.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Thermostat thermostat = new("Server room", maxAllowed: 27);
AlarmSystem alarm = new();

// Subscription: a lambda, a static method, and an object method.
thermostat.TemperatureChanged += (sender, e) =>
    Console.WriteLine($"  [Display] {e.NewValue:F1} °C");
thermostat.TemperatureChanged += LogChange;
thermostat.TemperatureChanged += alarm.OnTemperatureChanged;

thermostat.Measure(24.5);
thermostat.Measure(24.5);        // no change – no event
thermostat.Measure(28.2);

// Unsubscribing the log: a method can be removed by name.
thermostat.TemperatureChanged -= LogChange;
Console.WriteLine("Log unsubscribed");
thermostat.Measure(26.0);

static void LogChange(object? sender, TemperatureChangedEventArgs e)
{
    string room = (sender as Thermostat)?.Room ?? "?";
    Console.WriteLine(
        $"  [Log] {room}: {e.OldValue:F1} → {e.NewValue:F1}");
}

// Event data.
class TemperatureChangedEventArgs(double oldValue, double newValue)
    : EventArgs
{
    public double OldValue { get; } = oldValue;
    public double NewValue { get; } = newValue;
}

// The publisher.
class Thermostat(string room, double maxAllowed)
{
    private double current = double.NaN;

    public string Room { get; } = room;
    public double MaxAllowed { get; } = maxAllowed;

    public event EventHandler<TemperatureChangedEventArgs>?
        TemperatureChanged;

    public void Measure(double value)
    {
        Console.WriteLine($"Measurement: {value:F1} °C");
        if (value == current)
        {
            return;
        }
        TemperatureChangedEventArgs e = new(current, value);
        current = value;
        OnTemperatureChanged(e);
    }

    protected virtual void OnTemperatureChanged(
        TemperatureChangedEventArgs e) =>
        TemperatureChanged?.Invoke(this, e);
}

// A subscriber.
class AlarmSystem
{
    public void OnTemperatureChanged(
        object? sender, TemperatureChangedEventArgs e)
    {
        if (sender is Thermostat t && e.NewValue > t.MaxAllowed)
        {
            Console.WriteLine(
                $"  [Alarm] {t.Room}: above {t.MaxAllowed} °C!");
        }
    }
}
```

The event is raised only when the value has changed. Initially, the temperature has not been measured (`double.NaN`), so in the first log entry, the old value is `NaN`. The handlers identify the publisher through the `sender` parameter, so `AlarmSystem` can serve several thermostats. After the log unsubscribes, only the display and the alarm receive the event. Output:

```
Measurement: 24,5 °C
  [Display] 24,5 °C
  [Log] Server room: NaN → 24,5
Measurement: 24,5 °C
Measurement: 28,2 °C
  [Display] 28,2 °C
  [Log] Server room: 24,5 → 28,2
  [Alarm] Server room: above 27 °C!
Log unsubscribed
Measurement: 26,0 °C
  [Display] 26,0 °C
```

## Common mistakes

Table 14.2. Common mistakes when working with delegates and events {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| `NullReferenceException` when calling a delegate or event | there are no methods or subscribers; call through `?.Invoke` |
| CS0070: the event cannot be invoked from outside the class | only the publisher class raises the event; add a public method that raises it inside |
| unsubscribing with a lambda does not work | a lambda written again is a different delegate; store the lambda in a variable |
| a memory leak | the subscriber did not unsubscribe from a long-lived publisher; unsubscribe when finishing work |
| all lambdas from a `for` loop see the last value | a single loop variable was captured; copy the value into a local variable in the loop body |
| the results of a multicast delegate are lost | only the last method’s value is returned; use `void` or separate calls |
| a heavy handler blocks the publisher | handlers run synchronously one after another; keep handlers short |
| CS8917: the delegate type could not be inferred | a lambda without a target type or parameter types; specify the variable type or the parameter types |
