---
title: "Приклади та типові помилки"
description: "Тема 9. Наслідування та поліморфізм: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

### Відомість заробітної плати

Ієрархія працівників: базовий клас `Employee` з віртуальними методами, похідні класи з окладною та погодинною оплатою. Відомість обчислюється поліморфно в одному циклі.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Employee[] staff =
[
    new SalariedEmployee("Коваль О.", 32_000m),
    new HourlyEmployee("Бондар П.", 250m, 172),
    new HourlyEmployee("Мельник І.", 250m, 190),
    new SalariedEmployee("Ткаченко А.", 41_500m),
];

decimal total = 0;
foreach (Employee e in staff)
{
    decimal pay = e.CalculatePay();       // пізнє зв’язування
    total += pay;
    Console.WriteLine($"{e.Describe(),-40}{pay,10:N2}");
}
Console.WriteLine($"{"Разом",-40}{total,10:N2}");

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

    public override string Describe() => $"{base.Describe()} (оклад)";
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

    // Понаднормові години оплачуються в 1,5 раза.
    public override decimal CalculatePay()
    {
        int overtime = Math.Max(0, Hours - NormHours);
        return (Hours - overtime) * Rate + overtime * Rate * 1.5m;
    }

    public override string Describe() =>
        $"{base.Describe()} ({Hours} год)";
}
```

Конструктори похідних класів передають ім’я базовому через `base(name)` і перевіряють лише власні дані. Перевизначені `Describe` доповнюють базову реалізацію викликом `base.Describe()`. Метод `CalculatePay` погодинного працівника оплачує години понад норму 168 у полуторному розмірі. Результат:

```
Коваль О. (оклад)                        32 000,00
Бондар П. (172 год)                      43 500,00
Мельник І. (190 год)                     50 250,00
Ткаченко А. (оклад)                      41 500,00
Разом                                   167 250,00
```

### Рівність об’єктів `Book`

Клас `Book` перевизначає `ToString`, `Equals` і `GetHashCode`: дві книги з однаковими ISBN і роком видання вважаються рівними.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var a = new Book("978-966-03-4567-8", "Кобзар", 1840);
var b = new Book("978-966-03-4567-8", "Кобзар", 1840);
var c = new Book("978-617-12-0001-2", "Гайдамаки", 1841);

Console.WriteLine(a);                            // ToString
Console.WriteLine($"a == b: {a == b}");          // посилання
Console.WriteLine($"a.Equals(b): {a.Equals(b)}");  // значення
Console.WriteLine($"a.Equals(c): {a.Equals(c)}");
bool sameHash = a.GetHashCode() == b.GetHashCode();
Console.WriteLine($"Хеші рівні: {sameHash}");
Console.WriteLine($"Тип: {a.GetType().Name}");

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
        $"«{Title}» ({Year}), {Isbn}";

    // Книги рівні, якщо збігаються ISBN і рік видання.
    public override bool Equals(object? obj) =>
        obj is Book other && Isbn == other.Isbn && Year == other.Year;

    // Рівні об’єкти мусять мати однаковий хеш-код.
    public override int GetHashCode() => HashCode.Combine(Isbn, Year);
}
```

Шаблон `obj is Book other` одночасно перевіряє тип і приводить `obj`; для `null` і об’єктів інших типів результат `false`. Операція `==` не перевантажена, тому порівнює посилання й повертає `False`, хоча `Equals` повертає `True`. Результат:

```
«Кобзар» (1840), 978-966-03-4567-8
a == b: False
a.Equals(b): True
a.Equals(c): False
Хеші рівні: True
Тип: Book
```

### Віртуальний метод і `switch` за типами

Програма обчислює площі фігур двома способами: віртуальним методом `Area` і виразом `switch` за типами, а також показує шаблон властивостей та операцію `as`.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Shape[] shapes =
    [new Circle(1.5), new Rect(2, 3), new Triangle(3, 4, 5)];

foreach (Shape s in shapes)
{
    // Спосіб 1: віртуальний метод – кожен клас знає свою площу.
    double area1 = s.Area();

    // Спосіб 2: вираз switch за типом – логіка поза класами.
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
    Console.WriteLine($"Прямокутник шириною {wide.Width}");
}
Circle? circle = shapes[2] as Circle;
Console.WriteLine(circle is null ? "shapes[2] не круг" : "круг");

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

Обидва способи дають однаковий результат, але для нової фігури перший потребує лише нового класу, а другий – зміни виразу `switch` (інакше спрацює гілка `_` з винятком). Клас `Triangle` запечатаний. Результат:

```
Circle       7,07    7,07
Rect         6,00    6,00
Triangle     6,00    6,00
Прямокутник шириною 2
shapes[2] не круг
```

### Рахунки та власний виняток

Кредитний рахунок перевизначає захищену віртуальну властивість `Available`, тому метод `Withdraw` базового класу дозволяє йти в мінус у межах ліміту. Нестача коштів повідомляється власним винятком із додатковою властивістю.

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
            $"{acc.Number}: знято, баланс {acc.Balance:N2}");
    }
    catch (InsufficientFundsException ex)
    {
        Console.WriteLine($"{acc.Number}: {ex.Message}");
        Console.WriteLine($"  бракує {ex.Shortage:N2} грн");
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

    // Доступна сума: для звичайного рахунку – лише баланс.
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
        : base("Недостатньо коштів.") { }

    public InsufficientFundsException(string message)
        : base(message) { }

    public InsufficientFundsException(string message, Exception inner)
        : base(message, inner) { }

    public InsufficientFundsException(decimal shortage)
        : this("Недостатньо коштів на рахунку.")
    {
        Shortage = shortage;
    }

    public decimal Shortage { get; }
}
```

Метод `Withdraw` не віртуальний і однаковий для всіх рахунків: відмінність поведінки зосереджена у властивості `Available`. Властивість `Balance` має `protected set`: похідні класи можуть змінити баланс, а клієнтський код – ні. Результат:

```
UA-01: Недостатньо коштів на рахунку.
  бракує 2 000,00 грн
UA-02: знято, баланс -2 000,00
```

## Типові помилки

Таблиця 9.1. Типові помилки наслідування та поліморфізму {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| викликається метод базового класу замість похідного | метод не `virtual` або в похідному класі немає `override` (приховування); позначити `virtual`/`override` |
| CS0108 / CS0114: член приховує успадкований | пропущено `override` або `new`; обрати перевизначення (зазвичай) чи явне `new` |
| CS0506: неможливо перевизначити | базовий метод не `virtual`; додати `virtual` у базовому класі |
| CS7036 у конструкторі похідного класу | базовий клас не має конструктора без параметрів; викликати `: base(…)` |
| `InvalidCastException` під час приведення | фактичний тип інший; перевіряти `is` / шаблоном типу або використати `as` |
| `Equals` перевизначено без `GetHashCode` | рівні об’єкти мають різні хеш-коди й «губляться» в словниках; перевизначати обидва методи |
| ієрархія «автомобіль : двигун» | немає відношення «є»; використати композицію (поле `Engine`) |
| глибока ієрархія з багатьма рівнями | зміни базових класів ламають нащадків; скоротити ієрархію, винести поведінку в окремі класи |
