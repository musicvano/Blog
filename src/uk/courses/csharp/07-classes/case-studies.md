---
title: "Приклади та типові помилки"
description: "Тема 7. Класи та об’єкти: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

### Клас `Book`

Клас описує книгу автовластивостями з `init` і обчислюваною властивістю; об’єкти створюються ініціалізаторами в масиві, а програма шукає книги за частиною імені автора.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

Book[] books =
[
    new Book { Title = "Кобзар", Author = "Тарас Шевченко",
               Year = 1840 },
    new Book { Title = "Тіні забутих предків",
               Author = "Михайло Коцюбинський", Year = 1911 },
    new Book { Title = "Гайдамаки", Author = "Тарас Шевченко",
               Year = 1841 },
    new() { Title = "Intermezzo", Author = "Михайло Коцюбинський",
            Year = 1908 },
];

Console.Write("Автор (частина імені): ");
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
Console.WriteLine($"Знайдено: {found}");

class Book
{
    public string Title { get; init; } = "";
    public string Author { get; init; } = "";
    public int Year { get; init; }

    // Обчислювана властивість: значення не зберігається.
    public string Century => $"{(Year - 1) / 100 + 1} ст.";

    public string Describe() =>
        $"«{Title}», {Author}, {Year} ({Century})";
}
```

Властивості `init` не можна змінити після створення, тому книга, додана до масиву, не зміниться випадково. У масиві останній об’єкт створено виразом `new()`: тип елемента відомий з типу масиву. Результат для запиту «шевченко»:

```
Автор (частина імені): шевченко
  «Кобзар», Тарас Шевченко, 1840 (19 ст.)
  «Гайдамаки», Тарас Шевченко, 1841 (19 ст.)
Знайдено: 2
```

### Клас `BankAccount`

Рахунок зберігає баланс у приватному полі, дозволяє читати його через властивість лише для читання та змінювати лише методами `Deposit` і `Withdraw`, які перевіряють суму.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var account = new BankAccount("Олена Коваль", 500m);
account.Deposit(1200m);
Console.WriteLine($"{account.Owner}: {account.Balance:N2} грн");

try
{
    account.Withdraw(2000m);
}
catch (InvalidOperationException ex)
{
    Console.WriteLine($"Відмова: {ex.Message}");
}

account.Withdraw(700m);
Console.WriteLine($"Після зняття: {account.Balance:N2} грн");
Console.WriteLine($"Операцій: {account.OperationCount}");

class BankAccount
{
    private decimal balance;      // прихований стан об’єкта
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
                $"недостатньо коштів (доступно {balance:N2} грн)");
        }
        balance -= amount;
        operationCount++;
    }
}
```

Конструктор перевіряє власника й початковий баланс, тому некоректний рахунок створити неможливо. Властивість `Owner` без `set` можна присвоїти лише в конструкторі. Невдале зняття генерує `InvalidOperationException` і не змінює стан. Результат:

```
Олена Коваль: 1 700,00 грн
Відмова: недостатньо коштів (доступно 1 700,00 грн)
Після зняття: 1 000,00 грн
Операцій: 2
```

### Клас `Time`

Клас зберігає час доби, перевіряє години й хвилини в основному конструкторі, а два інші конструктори викликають його через `this(…)`. Метод `AddMinutes` повертає новий об’єкт.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var start = new Time(8, 45);
var lesson = start.AddMinutes(80);
var midnight = new Time();
var noon = new Time(12);

Console.WriteLine($"{start.Format()} + 80 хв = {lesson.Format()}");
Console.WriteLine($"Хвилин від півночі: {lesson.TotalMinutes}");
Console.WriteLine($"{midnight.Format()} {noon.Format()}");
Console.WriteLine(new Time(23, 30).AddMinutes(45).Format());

try
{
    var wrong = new Time(24, 10);
}
catch (ArgumentOutOfRangeException ex)
{
    Console.WriteLine($"Помилка: {ex.ParamName} = {ex.ActualValue}");
}

class Time
{
    private readonly int hours;
    private readonly int minutes;

    // Основний конструктор: перевірка та присвоєння.
    public Time(int hours, int minutes)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(hours);
        ArgumentOutOfRangeException.ThrowIfGreaterThan(hours, 23);
        ArgumentOutOfRangeException.ThrowIfNegative(minutes);
        ArgumentOutOfRangeException.ThrowIfGreaterThan(minutes, 59);
        this.hours = hours;
        this.minutes = minutes;
    }

    // Інші конструктори викликають основний.
    public Time(int hours) : this(hours, 0) { }
    public Time() : this(0, 0) { }

    public int Hours => hours;
    public int Minutes => minutes;
    public int TotalMinutes => hours * 60 + minutes;

    // Повертає новий об’єкт; поточний не змінюється.
    public Time AddMinutes(int delta)
    {
        int total = ((TotalMinutes + delta) % 1440 + 1440) % 1440;
        return new Time(total / 60, total % 60);
    }

    public string Format() => $"{hours:D2}:{minutes:D2}";
}
```

Поля `readonly` не змінюються після створення об’єкта, тому `AddMinutes` створює новий об’єкт замість зміни поточного: такий клас називається **незмінним** (*immutable*). Вираз `((x % 1440) + 1440) % 1440` зводить кількість хвилин до однієї доби навіть для від’ємного `delta`. Змінна `wrong` не використовується, тому компілятор попереджає CS0219; у прикладі вона потрібна лише для демонстрації винятку. Результат:

```
08:45 + 80 хв = 10:05
Хвилин від півночі: 605
00:00 12:00
00:15
Помилка: hours = 24
```

### Клас `Temperature`

Клас використовує первинний конструктор і властивість із ключовим словом `field`, яка не дозволяє встановити температуру нижче абсолютного нуля. Клас `Sensor` зберігає посилання на об’єкт `Temperature` і делегує йому читання та запис.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var room = new Temperature(21.5);
Console.WriteLine(room.Describe());

room.Celsius = -300;                   // нижче абсолютного нуля
Console.WriteLine(room.Describe());

var sensor = new Sensor("Кухня", room);
sensor.Celsius = 23.25;
Console.WriteLine(sensor.Report());

// Первинний конструктор: параметр initial доступний у тілі класу.
class Temperature(double initial)
{
    // C# 14: field – автоматично створене поле властивості.
    public double Celsius
    {
        get;
        set => field = Math.Max(value, -273.15);
    } = Math.Max(initial, -273.15);

    public double Fahrenheit => Celsius * 9 / 5 + 32;

    public string Describe() =>
        $"{Celsius:F2} °C = {Fahrenheit:F2} °F";
}

// Параметри первинного конструктора зберігаються у властивостях.
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

Ініціалізатор властивості `= Math.Max(initial, -273.15)` присвоює значення безпосередньо полю, оминаючи `set`, тому обмеження повторено й там. Об’єкт `sensor` змінює той самий об’єкт `room`, на який посилається. Результат:

```
21,50 °C = 70,70 °F
-273,15 °C = -459,67 °F
Кухня: 23,25 °C = 73,85 °F
```

## Типові помилки

Таблиця 7.1. Типові помилки під час роботи з класами {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| публічні поля (`public decimal balance;`) | будь-який код може записати некоректне значення; приватне поле та властивість або метод з перевіркою |
| `NullReferenceException` під час звернення до об’єкта | змінна не ініціалізована об’єктом (`new` забуто) або дорівнює `null`; створити об’єкт, перевірити `is not null` чи `?.` |
| зміна «копії» об’єкта змінює оригінал | `b = a` копіює посилання; створити новий об’єкт із тими самими значеннями |
| CS7036: немає аргументу для обов’язкового параметра конструктора | конструктор без параметрів не створюється, якщо є інший; передати аргументи або додати конструктор |
| `StackOverflowException` у властивості | `set => Price = value;` викликає сам себе; присвоювати полю (`price = value`) або `field` |
| CS9035 / CS8852 | властивість `required` не задано в ініціалізаторі / властивість `init` змінюється після створення |
| дублювання перевірок у конструкторах | викликати основний конструктор через `: this(…)` |
| `Console.WriteLine(obj)` виводить назву класу | перевизначити `ToString` або вивести потрібні властивості |
