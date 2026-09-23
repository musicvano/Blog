---
title: "Приклади та типові помилки"
description: "Тема 11. Структури, записи, кортежі: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

### Грошова сума

Незмінна структура `Money` зберігає суму й код валюти. Методи додавання й множення повертають нові значення, а не змінюють поточне.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Money price = new(1250m, "uah");
Money delivery = new(87.5m, "UAH");

Money total = price.Add(delivery);
Money copy = total;               // копіюється все значення
copy = copy.Multiply(2);          // новий об’єкт; total не змінено

Console.WriteLine($"Ціна:     {price}");
Console.WriteLine($"Доставка: {delivery}");
Console.WriteLine($"Разом:    {total}");
Console.WriteLine($"Подвоєно: {copy}");
Console.WriteLine($"Рівні: {price.Equals(new Money(1250, "UAH"))}");

try
{
    price.Add(new Money(10m, "EUR"));
}
catch (InvalidOperationException e)
{
    Console.WriteLine($"Помилка: {e.Message}");
}

// Незмінна структура: усі поля лише для читання.
readonly struct Money
{
    public Money(decimal amount, string currency)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(amount);
        ArgumentException.ThrowIfNullOrWhiteSpace(currency);
        Amount = decimal.Round(amount, 2);
        Currency = currency.ToUpperInvariant();
    }

    public decimal Amount { get; }
    public string Currency { get; }

    public Money Add(Money other)
    {
        if (other.Currency != Currency)
        {
            throw new InvalidOperationException(
                $"різні валюти {Currency} і {other.Currency}");
        }
        return new Money(Amount + other.Amount, Currency);
    }

    public Money Multiply(decimal factor) =>
        new(Amount * factor, Currency);

    public override string ToString() =>
        $"{Amount,10:N2} {Currency}";
}
```

Конструктор перевіряє аргументи й округлює суму до копійок. Присвоєння `copy = total` копіює значення, тому подальша зміна змінної `copy` не впливає на `total`. Метод `Equals`, успадкований від `ValueType`, порівнює структури за значеннями полів. Результат:

```
Ціна:       1 250,00 UAH
Доставка:      87,50 UAH
Разом:      1 337,50 UAH
Подвоєно:   2 675,00 UAH
Рівні: True
Помилка: різні валюти UAH і EUR
```

### Записи книг

Позиційний запис `Book` описує видання каталогу, а похідний запис `EBook` додає формат файлу.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Book first = new("Тигролови", "Іван Багряний", 1944);
Book same = new("Тигролови", "Іван Багряний", 1944);

Console.WriteLine(first);
Console.WriteLine($"==: {first == same}");
Console.WriteLine($"Один об’єкт: {ReferenceEquals(first, same)}");

// Нове видання: копія з іншим роком.
Book reprint = first with { Year = 2025 };
Console.WriteLine(reprint);
Console.WriteLine($"Оригінал не змінився: {first.Year}");

// Деконструкція: автор не потрібен.
var (title, _, year) = reprint;
Console.WriteLine($"«{title}», {year}");

EBook ebook = new("Тигролови", "Іван Багряний", 1944, "EPUB");
Console.WriteLine($"Формат: {ebook.Format}");
Console.WriteLine($"Книга == електронна книга: {first == ebook}");

record Book(string Title, string Author, int Year);

record EBook(string Title, string Author, int Year, string Format)
    : Book(Title, Author, Year);
```

Два записи з однаковими даними рівні, хоча це різні об’єкти. Вираз `with` створює нове видання, не змінюючи оригінал. Запис `EBook` не дорівнює `Book` з тими самими даними, бо рівність записів враховує тип. Результат:

```
Book { Title = Тигролови, Author = Іван Багряний, Year = 1944 }
==: True
Один об’єкт: False
Book { Title = Тигролови, Author = Іван Багряний, Year = 2025 }
Оригінал не змінився: 1944
«Тигролови», 2025
Формат: EPUB
Книга == електронна книга: False
```

### Статуси замовлення

Перелічення `OrderStatus` і `OrderAction` разом із виразом `switch` за кортежем реалізують автомат станів з рис. 11.7.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Стани:");
foreach (OrderStatus s in Enum.GetValues<OrderStatus>())
{
    Console.Write($" {s}={(int)s}");
}
Console.WriteLine();

OrderAction[] actions =
[
    OrderAction.Pay, OrderAction.Ship,
    OrderAction.Cancel, OrderAction.Deliver,
];

OrderStatus state = OrderStatus.New;
foreach (OrderAction action in actions)
{
    try
    {
        OrderStatus next = Next(state, action);
        Console.WriteLine($"{state,-9} --{action,-8}--> {next}");
        state = next;
    }
    catch (InvalidOperationException e)
    {
        Console.WriteLine($"{state,-9} --{action,-8}--> {e.Message}");
    }
}

// Таблиця переходів: шаблони кортежу (стан, дія).
static OrderStatus Next(OrderStatus state, OrderAction action) =>
    (state, action) switch
    {
        (OrderStatus.New, OrderAction.Pay) => OrderStatus.Paid,
        (OrderStatus.Paid, OrderAction.Ship) => OrderStatus.Shipped,
        (OrderStatus.Shipped, OrderAction.Deliver) =>
            OrderStatus.Delivered,
        (OrderStatus.New or OrderStatus.Paid, OrderAction.Cancel) =>
            OrderStatus.Cancelled,
        _ => throw new InvalidOperationException("недопустимо"),
    };

enum OrderStatus { New, Paid, Shipped, Delivered, Cancelled }

enum OrderAction { Pay, Ship, Deliver, Cancel }
```

Метод `Enum.GetValues<OrderStatus>()` повертає всі константи, а приведення `(int)s` – їхні числові значення. Метод `Next` повертає новий стан або генерує виняток для недопустимого переходу, тому скасування відправленого замовлення не змінює стан. Результат:

```
Стани: New=0 Paid=1 Shipped=2 Delivered=3 Cancelled=4
New       --Pay     --> Paid
Paid      --Ship    --> Shipped
Shipped   --Cancel  --> недопустимо
Shipped   --Deliver --> Delivered
```

### Робочі дні

Перелічення-прапорці `Days` описують графіки двох працівників. Програма знаходить перетин і об’єднання графіків та дні, коли не працює ніхто.

```cs
using System.Numerics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

Days olena = Days.Mon | Days.Wed | Days.Fri | Days.Sat;
Days petro = Days.WorkDays & ~Days.Wed;   // робочі дні, крім середи

Days both = olena & petro;                 // перетин
Days anyone = olena | petro;               // об’єднання
Days nobody = ~anyone & Days.All;          // доповнення до тижня

Print("Олена", olena);
Print("Петро", petro);
Print("Обидва", both);
Print("Хоча б один", anyone);
Print("Ніхто", nobody);
Console.WriteLine($"Олена в суботу: {olena.HasFlag(Days.Sat)}");
Console.WriteLine($"Графік Петра як число: {(int)petro}");

static void Print(string who, Days days)
{
    int count = BitOperations.PopCount((uint)days);
    Console.WriteLine($"{who,-12} {count} дн.: {days}");
}

[Flags]
enum Days
{
    None = 0,
    Mon = 1,
    Tue = 1 << 1,
    Wed = 1 << 2,
    Thu = 1 << 3,
    Fri = 1 << 4,
    Sat = 1 << 5,
    Sun = 1 << 6,
    WorkDays = Mon | Tue | Wed | Thu | Fri,
    Weekend = Sat | Sun,
    All = WorkDays | Weekend,
}
```

Константи задано зсувами `1 << n`, що наочно показує номер біта. Для доповнення використано `~anyone & Days.All`: операція `~` інвертує всі 32 біти числа, а `& Days.All` залишає лише дні тижня. Метод `BitOperations.PopCount` рахує одиничні біти, тобто кількість днів. Метод `ToString` замінює повний набір робочих днів назвою `WorkDays`. Результат:

```
Олена        4 дн.: Mon, Wed, Fri, Sat
Петро        4 дн.: Mon, Tue, Thu, Fri
Обидва       2 дн.: Mon, Fri
Хоча б один  6 дн.: WorkDays, Sat
Ніхто        1 дн.: Sun
Олена в суботу: True
Графік Петра як число: 27
```

## Типові помилки

Таблиця 11.2. Типові помилки під час роботи зі структурами, записами, переліченнями та кортежами {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| зміна копії структури «не працює» | структура скопійована під час присвоєння чи передавання; повертати нове значення або використовувати `readonly struct` |
| CS1612: неможливо змінити значення, що повертається | зміна поля структури, отриманої з властивості; присвоїти властивості нове значення |
| велика змінна структура | зайве копіювання й помилки зі змінами; використати клас або `readonly struct` |
| CS8852: властивість лише для ініціалізації | присвоєння властивості позиційного запису; створити копію виразом `with` |
| `(Season)42` чи `TryParse("42")` без помилки | перелічення не перевіряє діапазон; використовувати `Enum.IsDefined` |
| `[Flags]` зі значеннями 1, 2, 3, 4 | значення 3 перетинається з 1 і 2; використовувати степені двійки |
| CS8509 / CS8524 у `switch` за переліченням | не всі константи або значення без назви; додати гілки та `_ => throw …` |
| кортеж із `Item1`, `Item2` по всьому коду | незрозумілий зміст; дати елементам імена або оголосити запис |
