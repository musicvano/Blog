---
title: "Examples and common mistakes"
description: "Topic 17. SOLID and design patterns: Examples and common mistakes"
outline: [2, 3]
sourceHash: "252260a5b6da870250ed97c4aae5f39522a5937a3ec66dd6ebd1bffbfef11c9d"
---

# Examples and common mistakes

## Example programs

### Refactoring an order: SRP and DIP

Order processing is split into calculating the total, saving, and notification. `OrderService` receives its dependencies through the constructor, and the concrete classes are chosen in the composition root.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// The composition root: concrete implementations are chosen here.
IOrderRepository repository = new InMemoryOrderRepository();
INotifier notifier = new SmsNotifier();
PriceCalculator calculator = new(discountThreshold: 2_000m,
    rate: 0.05m);
OrderService service = new(calculator, repository, notifier);

service.Place(new Order("Olena",
    [new("Headphones", 1_499m, 1), new("Case", 350m, 2)]));
service.Place(new Order("Petro", [new("Mouse", 449m, 1)]));
Console.WriteLine($"Orders saved: {repository.Count}");

// A test or another program substitutes other implementations without changing the service.
OrderService quiet =
    new(calculator, repository, new SilentNotifier());
quiet.Place(new Order("Iryna", [new("Cable", 199m, 3)]));
Console.WriteLine($"Orders saved: {repository.Count}");

record OrderLine(string Product, decimal Price, int Quantity);
record Order(string Customer, OrderLine[] Lines);

// SRP: each class has one reason to change.
class PriceCalculator(decimal discountThreshold, decimal rate)
{
    public decimal Total(Order order)
    {
        decimal sum = 0;
        foreach (OrderLine line in order.Lines)
        {
            sum += line.Price * line.Quantity;
        }
        return sum >= discountThreshold ? sum * (1 - rate) : sum;
    }
}

interface IOrderRepository
{
    int Count { get; }
    void Save(Order order, decimal total);
}

interface INotifier
{
    void Notify(string customer, string message);
}

class InMemoryOrderRepository : IOrderRepository
{
    private readonly List<(Order, decimal)> orders = [];
    public int Count => orders.Count;
    public void Save(Order order, decimal total) =>
        orders.Add((order, total));
}

class SmsNotifier : INotifier
{
    public void Notify(string customer, string message) =>
        Console.WriteLine($"  SMS to {customer}: {message}");
}

class SilentNotifier : INotifier
{
    public void Notify(string customer, string message) { }
}

// DIP: the service depends on abstractions received through the constructor.
class OrderService(
    PriceCalculator calculator,
    IOrderRepository repository,
    INotifier notifier)
{
    public void Place(Order order)
    {
        decimal total = calculator.Total(order);
        repository.Save(order, total);
        notifier.Notify(order.Customer,
            $"order for {total:N2} UAH");
    }
}
```

Each class has one responsibility and can change independently. The service depends on the `IOrderRepository` and `INotifier` interfaces, so the second service receives a “silent” notifier without any change to the `OrderService` code; in the same way, tests (Topic 18) substitute test implementations. The 5% discount applies to orders of 2,000 UAH or more: (1 499 + 2 · 350) · 0.95 = 2 089.05. Output:

```
  SMS to Olena: order for 2 089,05 UAH
  SMS to Petro: order for 449,00 UAH
Orders saved: 2
Orders saved: 3
```

### Calculating shipping: Strategy and a factory method

The ways of calculating the shipping cost are implemented as strategies, and a strategy is chosen by name with a factory method.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Parcel parcel = new(WeightKg: 3.5, DeclaredValue: 1_800m);
string[] methods = ["nova", "ukrposhta", "pickup", "drone"];

foreach (string method in methods)
{
    try
    {
        IShippingStrategy strategy = ShippingFactory.Create(method);
        ShippingCalculator calculator = new(strategy);
        decimal cost = calculator.Calculate(parcel);
        Console.WriteLine($"{strategy.Name,-12} {cost,8:N2} UAH");
    }
    catch (ArgumentException e)
    {
        Console.WriteLine($"{method,-12} {e.Message}");
    }
}

record Parcel(double WeightKg, decimal DeclaredValue);

// Strategy: a common interface for the calculation algorithms.
interface IShippingStrategy
{
    string Name { get; }
    decimal Calculate(Parcel parcel);
}

class NovaPoshtaStrategy : IShippingStrategy
{
    public string Name => "Nova Poshta";
    public decimal Calculate(Parcel p) =>
        70m + 12m * (decimal)p.WeightKg + p.DeclaredValue * 0.005m;
}

class UkrposhtaStrategy : IShippingStrategy
{
    public string Name => "Ukrposhta";
    public decimal Calculate(Parcel p) =>
        45m + 8m * (decimal)Math.Ceiling(p.WeightKg);
}

class PickupStrategy : IShippingStrategy
{
    public string Name => "Pickup";
    public decimal Calculate(Parcel p) => 0m;
}

// The context does not know the concrete strategies and does not change (OCP).
class ShippingCalculator(IShippingStrategy strategy)
{
    public decimal Calculate(Parcel parcel) =>
        Math.Round(strategy.Calculate(parcel), 2);
}

// Factory method: the only place that knows the concrete classes.
static class ShippingFactory
{
    public static IShippingStrategy Create(string method) =>
        method switch
        {
            "nova" => new NovaPoshtaStrategy(),
            "ukrposhta" => new UkrposhtaStrategy(),
            "pickup" => new PickupStrategy(),
            _ => throw new ArgumentException(
                $"unknown method “{method}”"),
        };
}
```

`ShippingCalculator` works with any implementation of `IShippingStrategy`. Adding a new delivery service requires a new strategy class and a line in the factory but does not change the calculator or the code that uses it (OCP). An unknown delivery method is handled in one place. Output:

```
Nova Poshta    121,00 UAH
Ukrposhta       77,00 UAH
Pickup           0,00 UAH
drone        unknown method “drone”
```

### A coffee shop: Decorator and Builder

Coffee add-ons are implemented as decorators, and an order is created by a builder that validates the required data.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// Decorators wrap a beverage and add cost and description.
IBeverage latte = new Syrup(new Milk(new Espresso()), "caramel");
IBeverage doubleMilk = new Milk(new Milk(new Americano()));
Console.WriteLine($"{latte.Description} – {latte.Cost:N2} UAH");
Console.WriteLine(
    $"{doubleMilk.Description} – {doubleMilk.Cost:N2} UAH");

// Builder: step-by-step creation of an order with validation.
CoffeeOrder order = new CoffeeOrderBuilder()
    .ForCustomer("Olena")
    .Add(latte)
    .Add(new Espresso())
    .WithTakeaway()
    .Build();
Console.WriteLine(order);

try
{
    new CoffeeOrderBuilder().ForCustomer("Petro").Build();
}
catch (InvalidOperationException e)
{
    Console.WriteLine($"Error: {e.Message}");
}

interface IBeverage
{
    string Description { get; }
    decimal Cost { get; }
}

class Espresso : IBeverage
{
    public string Description => "espresso";
    public decimal Cost => 45m;
}

class Americano : IBeverage
{
    public string Description => "americano";
    public decimal Cost => 50m;
}

abstract class BeverageDecorator(IBeverage inner) : IBeverage
{
    protected IBeverage Inner { get; } = inner;
    public abstract string Description { get; }
    public abstract decimal Cost { get; }
}

class Milk(IBeverage inner) : BeverageDecorator(inner)
{
    public override string Description =>
        $"{Inner.Description} + milk";
    public override decimal Cost => Inner.Cost + 15m;
}

class Syrup(IBeverage inner, string flavor) : BeverageDecorator(inner)
{
    public override string Description =>
        $"{Inner.Description} + syrup ({flavor})";
    public override decimal Cost => Inner.Cost + 20m;
}

record CoffeeOrder(string Customer, IBeverage[] Items, bool Takeaway)
{
    public override string ToString()
    {
        decimal total = Items.Sum(i => i.Cost) + (Takeaway ? 5m : 0m);
        string place = Takeaway ? "takeaway" : "for here";
        return $"{Customer}: {Items.Length} pcs, {place}, {total:N2}";
    }
}

class CoffeeOrderBuilder
{
    private string? customer;
    private readonly List<IBeverage> items = [];
    private bool takeaway;

    public CoffeeOrderBuilder ForCustomer(string name)
    {
        customer = name;
        return this;                      // for chaining calls
    }

    public CoffeeOrderBuilder Add(IBeverage beverage)
    {
        items.Add(beverage);
        return this;
    }

    public CoffeeOrderBuilder WithTakeaway()
    {
        takeaway = true;
        return this;
    }

    public CoffeeOrder Build()
    {
        if (customer is null || items.Count == 0)
        {
            throw new InvalidOperationException(
                "a customer name and at least one beverage are required");
        }
        return new CoffeeOrder(customer, [.. items], takeaway);
    }
}
```

Each decorator adds its share to the description and cost and delegates the rest to the wrapped beverage, so add-ons can be combined freely, including repeatedly (double milk). The builder accumulates data and creates the immutable `CoffeeOrder` record only in the `Build` method, once a customer and at least one beverage have been specified. Output:

```
espresso + milk + syrup (caramel) – 80,00 UAH
americano + milk + milk – 80,00 UAH
Olena: 2 pcs, takeaway, 130,00
Error: a customer name and at least one beverage are required
```

### A weather station: Observer with interfaces and with events

A weather station notifies observers of a temperature change in two variants: with an explicit interface and a list of observers, and with a .NET event.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine("Observer with interfaces:");
WeatherStation station = new();
PhoneDisplay phone = new();
FrostAlarm alarm = new(threshold: 0);
station.Subscribe(phone);
station.Subscribe(alarm);
station.SetTemperature(3.5);
station.SetTemperature(-1.2);
station.Unsubscribe(phone);
station.SetTemperature(-4.0);

Console.WriteLine("Observer with events:");
EventWeatherStation eventStation = new();
eventStation.TemperatureChanged +=
    t => Console.WriteLine($"  display: {t} °C");
eventStation.TemperatureChanged += t =>
{
    if (t < 0) Console.WriteLine("  alarm: frost!");
};
eventStation.SetTemperature(-2.5);

// Variant 1: an explicit observer interface.
interface IWeatherObserver
{
    void Update(double temperature);
}

class WeatherStation
{
    private readonly List<IWeatherObserver> observers = [];

    public void Subscribe(IWeatherObserver o) => observers.Add(o);
    public void Unsubscribe(IWeatherObserver o) =>
        observers.Remove(o);

    public void SetTemperature(double value)
    {
        Console.WriteLine($" station: {value} °C");
        foreach (IWeatherObserver o in observers.ToArray())
        {
            o.Update(value);
        }
    }
}

class PhoneDisplay : IWeatherObserver
{
    public void Update(double t) =>
        Console.WriteLine($"  phone: {t} °C");
}

class FrostAlarm(double threshold) : IWeatherObserver
{
    public void Update(double t)
    {
        if (t < threshold)
        {
            Console.WriteLine($"  alarm: {t} °C < {threshold}");
        }
    }
}

// Variant 2: a .NET event instead of a list of observers.
class EventWeatherStation
{
    public event Action<double>? TemperatureChanged;

    public void SetTemperature(double value) =>
        TemperatureChanged?.Invoke(value);
}
```

In the first variant, the station stores the list itself and provides subscribe and unsubscribe methods; iterating over the copy `observers.ToArray()` lets an observer unsubscribe during notification. The second variant is shorter: the event already contains the list of handlers, and lambdas can be subscribers. An interface is appropriate when an observer has several related methods. Output:

```
Observer with interfaces:
 station: 3,5 °C
  phone: 3,5 °C
 station: -1,2 °C
  phone: -1,2 °C
  alarm: -1,2 °C < 0
 station: -4 °C
  alarm: -4 °C < 0
Observer with events:
  display: -2,5 °C
  alarm: frost!
```

## Common mistakes

Table 17.3. Common design mistakes {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| a class of hundreds of lines “can do everything” | an SRP violation; split it into classes with a single responsibility |
| a new variant requires changes in many `switch` statements | an OCP violation; move the variants into classes with a common interface |
| a derived class throws `NotSupportedException` | an LSP violation; reconsider the hierarchy and move the ability into an interface |
| `new` of concrete classes inside services | tight coupling; inject dependencies through the constructor |
| a Singleton for convenient access | a hidden global dependency; create the object once and pass it around |
| a pattern for the sake of a pattern | unnecessary complexity (KISS, YAGNI); apply a pattern only to a real problem |
| an interface with a single implementation “for the future” | premature abstraction; add the interface when a second implementation or a test appears |
