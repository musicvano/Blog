---
title: "Приклади та типові помилки"
description: "Тема 17. SOLID і шаблони проєктування: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

### Рефакторинг замовлення: SRP і DIP

Обробку замовлення розділено на обчислення суми, збереження та повідомлення. `OrderService` отримує залежності через конструктор, а конкретні класи обираються в композиційному корені.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// Композиційний корінь: тут обирають конкретні реалізації.
IOrderRepository repository = new InMemoryOrderRepository();
INotifier notifier = new SmsNotifier();
PriceCalculator calculator = new(discountThreshold: 2_000m,
    rate: 0.05m);
OrderService service = new(calculator, repository, notifier);

service.Place(new Order("Олена",
    [new("Навушники", 1_499m, 1), new("Чохол", 350m, 2)]));
service.Place(new Order("Петро", [new("Миша", 449m, 1)]));
Console.WriteLine($"Збережено замовлень: {repository.Count}");

// Тест чи інша програма підставляє інші реалізації без змін сервісу.
OrderService quiet =
    new(calculator, repository, new SilentNotifier());
quiet.Place(new Order("Ірина", [new("Кабель", 199m, 3)]));
Console.WriteLine($"Збережено замовлень: {repository.Count}");

record OrderLine(string Product, decimal Price, int Quantity);
record Order(string Customer, OrderLine[] Lines);

// SRP: кожен клас має одну причину для змін.
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
        Console.WriteLine($"  SMS для {customer}: {message}");
}

class SilentNotifier : INotifier
{
    public void Notify(string customer, string message) { }
}

// DIP: сервіс залежить від абстракцій, отриманих через конструктор.
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
            $"замовлення на {total:N2} грн");
    }
}
```

Кожен клас має одну відповідальність і може змінюватися незалежно. Сервіс залежить від інтерфейсів `IOrderRepository` і `INotifier`, тому другий сервіс отримує «тихий» сповіщувач без зміни коду `OrderService`; так само в тестах (тема 18) підставляють тестові реалізації. Знижка 5 % діє для замовлень від 2 000 грн: (1 499 + 2 · 350) · 0,95 = 2 089,05. Результат:

```
  SMS для Олена: замовлення на 2 089,05 грн
  SMS для Петро: замовлення на 449,00 грн
Збережено замовлень: 2
Збережено замовлень: 3
```

### Розрахунок доставки: «Стратегія» і фабричний метод

Способи розрахунку вартості доставки реалізовано стратегіями, а вибір стратегії за назвою – фабричним методом.

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
        Console.WriteLine($"{strategy.Name,-12} {cost,8:N2} грн");
    }
    catch (ArgumentException e)
    {
        Console.WriteLine($"{method,-12} {e.Message}");
    }
}

record Parcel(double WeightKg, decimal DeclaredValue);

// Стратегія: спільний інтерфейс алгоритмів розрахунку.
interface IShippingStrategy
{
    string Name { get; }
    decimal Calculate(Parcel parcel);
}

class NovaPoshtaStrategy : IShippingStrategy
{
    public string Name => "Нова пошта";
    public decimal Calculate(Parcel p) =>
        70m + 12m * (decimal)p.WeightKg + p.DeclaredValue * 0.005m;
}

class UkrposhtaStrategy : IShippingStrategy
{
    public string Name => "Укрпошта";
    public decimal Calculate(Parcel p) =>
        45m + 8m * (decimal)Math.Ceiling(p.WeightKg);
}

class PickupStrategy : IShippingStrategy
{
    public string Name => "Самовивіз";
    public decimal Calculate(Parcel p) => 0m;
}

// Контекст не знає конкретних стратегій і не змінюється (OCP).
class ShippingCalculator(IShippingStrategy strategy)
{
    public decimal Calculate(Parcel parcel) =>
        Math.Round(strategy.Calculate(parcel), 2);
}

// Фабричний метод: єдине місце, що знає конкретні класи.
static class ShippingFactory
{
    public static IShippingStrategy Create(string method) =>
        method switch
        {
            "nova" => new NovaPoshtaStrategy(),
            "ukrposhta" => new UkrposhtaStrategy(),
            "pickup" => new PickupStrategy(),
            _ => throw new ArgumentException(
                $"невідомий спосіб «{method}»"),
        };
}
```

`ShippingCalculator` працює з будь-якою реалізацією `IShippingStrategy`. Додавання нової служби доставки потребує нового класу стратегії та рядка у фабриці, але не змінює калькулятор і код, що його використовує (OCP). Невідомий спосіб доставки обробляється в одному місці. Результат:

```
Нова пошта     121,00 грн
Укрпошта        77,00 грн
Самовивіз        0,00 грн
drone        невідомий спосіб «drone»
```

### Кав’ярня: «Декоратор» і «Будівельник»

Добавки до кави реалізовано декораторами, а замовлення створює будівельник з перевіркою обов’язкових даних.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// Декоратори обгортають напій і додають вартість та опис.
IBeverage latte = new Syrup(new Milk(new Espresso()), "карамель");
IBeverage doubleMilk = new Milk(new Milk(new Americano()));
Console.WriteLine($"{latte.Description} – {latte.Cost:N2} грн");
Console.WriteLine(
    $"{doubleMilk.Description} – {doubleMilk.Cost:N2} грн");

// Будівельник: покрокове створення замовлення з перевіркою.
CoffeeOrder order = new CoffeeOrderBuilder()
    .ForCustomer("Олена")
    .Add(latte)
    .Add(new Espresso())
    .WithTakeaway()
    .Build();
Console.WriteLine(order);

try
{
    new CoffeeOrderBuilder().ForCustomer("Петро").Build();
}
catch (InvalidOperationException e)
{
    Console.WriteLine($"Помилка: {e.Message}");
}

interface IBeverage
{
    string Description { get; }
    decimal Cost { get; }
}

class Espresso : IBeverage
{
    public string Description => "еспресо";
    public decimal Cost => 45m;
}

class Americano : IBeverage
{
    public string Description => "американо";
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
        $"{Inner.Description} + молоко";
    public override decimal Cost => Inner.Cost + 15m;
}

class Syrup(IBeverage inner, string flavor) : BeverageDecorator(inner)
{
    public override string Description =>
        $"{Inner.Description} + сироп ({flavor})";
    public override decimal Cost => Inner.Cost + 20m;
}

record CoffeeOrder(string Customer, IBeverage[] Items, bool Takeaway)
{
    public override string ToString()
    {
        decimal total = Items.Sum(i => i.Cost) + (Takeaway ? 5m : 0m);
        string place = Takeaway ? "з собою" : "у закладі";
        return $"{Customer}: {Items.Length} шт., {place}, {total:N2}";
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
        return this;                      // для ланцюжка викликів
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
                "потрібні ім’я клієнта й хоча б один напій");
        }
        return new CoffeeOrder(customer, [.. items], takeaway);
    }
}
```

Кожен декоратор додає до опису й вартості свою частку та делегує решту обгорнутому напою, тому добавки комбінуються довільно, зокрема повторно (подвійне молоко). Будівельник накопичує дані й створює незмінний запис `CoffeeOrder` лише в методі `Build`, коли вказано клієнта й хоча б один напій. Результат:

```
еспресо + молоко + сироп (карамель) – 80,00 грн
американо + молоко + молоко – 80,00 грн
Олена: 2 шт., з собою, 130,00
Помилка: потрібні ім’я клієнта й хоча б один напій
```

### Метеостанція: «Спостерігач» на інтерфейсах і на подіях

Метеостанція повідомляє спостерігачів про зміну температури у двох варіантах: з явним інтерфейсом і списком спостерігачів та з подією .NET.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine("Спостерігач на інтерфейсах:");
WeatherStation station = new();
PhoneDisplay phone = new();
FrostAlarm alarm = new(threshold: 0);
station.Subscribe(phone);
station.Subscribe(alarm);
station.SetTemperature(3.5);
station.SetTemperature(-1.2);
station.Unsubscribe(phone);
station.SetTemperature(-4.0);

Console.WriteLine("Спостерігач на подіях:");
EventWeatherStation eventStation = new();
eventStation.TemperatureChanged +=
    t => Console.WriteLine($"  дисплей: {t} °C");
eventStation.TemperatureChanged += t =>
{
    if (t < 0) Console.WriteLine("  тривога: мороз!");
};
eventStation.SetTemperature(-2.5);

// Варіант 1: явний інтерфейс спостерігача.
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
        Console.WriteLine($" станція: {value} °C");
        foreach (IWeatherObserver o in observers.ToArray())
        {
            o.Update(value);
        }
    }
}

class PhoneDisplay : IWeatherObserver
{
    public void Update(double t) =>
        Console.WriteLine($"  телефон: {t} °C");
}

class FrostAlarm(double threshold) : IWeatherObserver
{
    public void Update(double t)
    {
        if (t < threshold)
        {
            Console.WriteLine($"  тривога: {t} °C < {threshold}");
        }
    }
}

// Варіант 2: подія .NET замість списку спостерігачів.
class EventWeatherStation
{
    public event Action<double>? TemperatureChanged;

    public void SetTemperature(double value) =>
        TemperatureChanged?.Invoke(value);
}
```

У першому варіанті станція сама зберігає список і надає методи підписки й відписки; перебір копії `observers.ToArray()` дозволяє спостерігачу відписатися під час повідомлення. Другий варіант коротший: подія вже містить список обробників, а підписниками можуть бути лямбди. Інтерфейс доречний, коли спостерігач має кілька пов’язаних методів. Результат:

```
Спостерігач на інтерфейсах:
 станція: 3,5 °C
  телефон: 3,5 °C
 станція: -1,2 °C
  телефон: -1,2 °C
  тривога: -1,2 °C < 0
 станція: -4 °C
  тривога: -4 °C < 0
Спостерігач на подіях:
  дисплей: -2,5 °C
  тривога: мороз!
```

## Типові помилки

Таблиця 17.3. Типові помилки проєктування {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| клас на сотні рядків «вміє все» | порушення SRP; розділити на класи з однією відповідальністю |
| новий варіант потребує змін у багатьох `switch` | порушення OCP; винести варіанти в класи зі спільним інтерфейсом |
| похідний клас генерує `NotSupportedException` | порушення LSP; переглянути ієрархію, винести здатність в інтерфейс |
| `new` конкретних класів усередині сервісів | жорстке зчеплення; впроваджувати залежності через конструктор |
| «Одинак» для зручного доступу | прихована глобальна залежність; створити об’єкт один раз і передавати його |
| шаблон заради шаблону | зайва складність (KISS, YAGNI); застосовувати шаблон лише для реальної проблеми |
| інтерфейс з однією реалізацією «на майбутнє» | передчасна абстракція; додати інтерфейс, коли з’явиться друга реалізація або тест |
