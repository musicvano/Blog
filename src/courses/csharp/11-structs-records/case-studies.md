---
title: "Examples and common mistakes"
description: "Topic 11. Structures, records, tuples: Examples and common mistakes"
outline: [2, 3]
sourceHash: "6ec47b8f26d3b71d20e67b125aa7d15718137a48ece393d64e2c027fedd36311"
---

# Examples and common mistakes

## Example programs

### An amount of money

The immutable `Money` structure stores an amount and a currency code. The addition and multiplication methods return new values instead of changing the current one.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Money price = new(1250m, "uah");
Money delivery = new(87.5m, "UAH");

Money total = price.Add(delivery);
Money copy = total;               // the whole value is copied
copy = copy.Multiply(2);          // a new object; total is unchanged

Console.WriteLine($"Price:    {price}");
Console.WriteLine($"Delivery: {delivery}");
Console.WriteLine($"Total:    {total}");
Console.WriteLine($"Doubled:  {copy}");
Console.WriteLine($"Equal: {price.Equals(new Money(1250, "UAH"))}");

try
{
    price.Add(new Money(10m, "EUR"));
}
catch (InvalidOperationException e)
{
    Console.WriteLine($"Error: {e.Message}");
}

// Immutable structure: all fields are read-only.
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
                $"different currencies {Currency} and {other.Currency}");
        }
        return new Money(Amount + other.Amount, Currency);
    }

    public Money Multiply(decimal factor) =>
        new(Amount * factor, Currency);

    public override string ToString() =>
        $"{Amount,10:N2} {Currency}";
}
```

The constructor validates the arguments and rounds the amount to kopiykas. The assignment `copy = total` copies the value, so later changes to the `copy` variable do not affect `total`. The `Equals` method inherited from `ValueType` compares structures by field values. Output:

```
Price:      1 250,00 UAH
Delivery:      87,50 UAH
Total:      1 337,50 UAH
Doubled:    2 675,00 UAH
Equal: True
Error: different currencies UAH and EUR
```

### Book records

The positional `Book` record describes a catalog edition, and the derived `EBook` record adds a file format.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Book first = new("Tiger Trappers", "Ivan Bahrianyi", 1944);
Book same = new("Tiger Trappers", "Ivan Bahrianyi", 1944);

Console.WriteLine(first);
Console.WriteLine($"==: {first == same}");
Console.WriteLine($"Same object: {ReferenceEquals(first, same)}");

// A new edition: a copy with a different year.
Book reprint = first with { Year = 2025 };
Console.WriteLine(reprint);
Console.WriteLine($"The original did not change: {first.Year}");

// Deconstruction: the author is not needed.
var (title, _, year) = reprint;
Console.WriteLine($"“{title}”, {year}");

EBook ebook = new("Tiger Trappers", "Ivan Bahrianyi", 1944, "EPUB");
Console.WriteLine($"Format: {ebook.Format}");
Console.WriteLine($"Book == e-book: {first == ebook}");

record Book(string Title, string Author, int Year);

record EBook(string Title, string Author, int Year, string Format)
    : Book(Title, Author, Year);
```

Two records with the same data are equal even though they are different objects. The `with` expression creates a new edition without changing the original. The `EBook` record is not equal to a `Book` with the same data because record equality takes the type into account. Output:

```
Book { Title = Tiger Trappers, Author = Ivan Bahrianyi, Year = 1944 }
==: True
Same object: False
Book { Title = Tiger Trappers, Author = Ivan Bahrianyi, Year = 2025 }
The original did not change: 1944
“Tiger Trappers”, 2025
Format: EPUB
Book == e-book: False
```

### Order statuses

The `OrderStatus` and `OrderAction` enumerations together with a `switch` expression on a tuple implement the state machine from Fig. 11.7.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("States:");
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

// Transition table: patterns on the (state, action) tuple.
static OrderStatus Next(OrderStatus state, OrderAction action) =>
    (state, action) switch
    {
        (OrderStatus.New, OrderAction.Pay) => OrderStatus.Paid,
        (OrderStatus.Paid, OrderAction.Ship) => OrderStatus.Shipped,
        (OrderStatus.Shipped, OrderAction.Deliver) =>
            OrderStatus.Delivered,
        (OrderStatus.New or OrderStatus.Paid, OrderAction.Cancel) =>
            OrderStatus.Cancelled,
        _ => throw new InvalidOperationException("not allowed"),
    };

enum OrderStatus { New, Paid, Shipped, Delivered, Cancelled }

enum OrderAction { Pay, Ship, Deliver, Cancel }
```

The `Enum.GetValues<OrderStatus>()` method returns all constants, and the `(int)s` cast returns their numeric values. The `Next` method returns the new state or throws an exception for an invalid transition, so canceling a shipped order does not change its state. Output:

```
States: New=0 Paid=1 Shipped=2 Delivered=3 Cancelled=4
New       --Pay     --> Paid
Paid      --Ship    --> Shipped
Shipped   --Cancel  --> not allowed
Shipped   --Deliver --> Delivered
```

### Working days

The `Days` flag enumeration describes the schedules of two employees. The program finds the intersection and union of the schedules and the days when nobody works.

```cs
using System.Numerics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

Days olena = Days.Mon | Days.Wed | Days.Fri | Days.Sat;
Days petro = Days.WorkDays & ~Days.Wed;   // working days except Wednesday

Days both = olena & petro;                 // intersection
Days anyone = olena | petro;               // union
Days nobody = ~anyone & Days.All;          // complement within the week

Print("Olena", olena);
Print("Petro", petro);
Print("Both", both);
Print("At least one", anyone);
Print("Nobody", nobody);
Console.WriteLine($"Olena on Saturday: {olena.HasFlag(Days.Sat)}");
Console.WriteLine($"Petro's schedule as a number: {(int)petro}");

static void Print(string who, Days days)
{
    int count = BitOperations.PopCount((uint)days);
    Console.WriteLine($"{who,-12} {count} day(s): {days}");
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

The constants are defined with `1 << n` shifts, which clearly show the bit number. The complement uses `~anyone & Days.All`: the `~` operator inverts all 32 bits of the number, and `& Days.All` keeps only the days of the week. The `BitOperations.PopCount` method counts the set bits, that is, the number of days. The `ToString` method replaces the full set of working days with the name `WorkDays`. Output:

```
Olena        4 day(s): Mon, Wed, Fri, Sat
Petro        4 day(s): Mon, Tue, Thu, Fri
Both         2 day(s): Mon, Fri
At least one 6 day(s): WorkDays, Sat
Nobody       1 day(s): Sun
Olena on Saturday: True
Petro's schedule as a number: 27
```

## Common mistakes

Table 11.2. Common mistakes when working with structures, records, enumerations, and tuples {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| changing a copy of a structure “does not work” | the structure was copied during assignment or passing; return a new value or use a `readonly struct` |
| CS1612: cannot modify the return value | changing a field of a structure obtained from a property; assign a new value to the property |
| a large mutable structure | unnecessary copying and mistakes with changes; use a class or a `readonly struct` |
| CS8852: an init-only property | assigning a property of a positional record; create a copy with a `with` expression |
| `(Season)42` or `TryParse("42")` without an error | an enumeration does not check the range; use `Enum.IsDefined` |
| `[Flags]` with the values 1, 2, 3, 4 | the value 3 overlaps with 1 and 2; use powers of two |
| CS8509 / CS8524 in a `switch` on an enumeration | not all constants, or an unnamed value; add arms and `_ => throw …` |
| a tuple with `Item1`, `Item2` throughout the code | the meaning is unclear; name the elements or declare a record |
