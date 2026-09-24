---
title: "Practice"
description: "Topic 10. Abstract classes, interfaces: worked examples"
outline: [2, 3]
sourceHash: "120cd171a9e3915df54c86aaec90eb6e68b3be3365628a7099ba619b687cf01d"
---

# Practice

## Example 1. An abstract account with interest accrual

Create an abstract `Account` class with an abstract method for monthly interest accrual and two implementations: a savings account (interest on a positive balance) and a credit card (interest on debt). Simulate three months.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Account[] accounts =
[
    new SavingsAccount("UA-S1", 50_000m, annualRate: 0.12m),
    new CreditCardAccount("UA-C7", -8_000m, annualRate: 0.36m),
    new CreditCardAccount("UA-C8", 2_500m, annualRate: 0.36m),
];

for (int month = 1; month <= 3; month++)
{
    foreach (Account a in accounts)
    {
        a.CloseMonth();
    }
}

foreach (Account a in accounts)
{
    Console.WriteLine($"{a.Number}: {a.Balance,12:N2} UAH "
        + $"({a.GetType().Name})");
}

abstract class Account(string number, decimal balance)
{
    public string Number { get; } = number;
    public decimal Balance { get; protected set; } = balance;

    // Each account type calculates monthly interest in its own way.
    protected abstract decimal MonthlyInterest();

    public void CloseMonth() =>
        Balance += Math.Round(MonthlyInterest(), 2);
}

class SavingsAccount(string number, decimal balance,
    decimal annualRate) : Account(number, balance)
{
    // Interest accrues on a positive balance.
    protected override decimal MonthlyInterest() =>
        Balance > 0 ? Balance * annualRate / 12 : 0;
}

class CreditCardAccount(string number, decimal balance,
    decimal annualRate) : Account(number, balance)
{
    // Interest is charged only on debt.
    protected override decimal MonthlyInterest() =>
        Balance < 0 ? Balance * annualRate / 12 : 0;
}
```

The `CloseMonth` method is the same for all accounts and calls the abstract `MonthlyInterest`, so each account accrues interest according to its own rule. The `MonthlyInterest` method has the `protected` modifier: it is needed only for the account’s internal work. The `Balance` property with `protected set` is changed only by methods of the hierarchy. Output:

```
UA-S1:    51 515,05 UAH (SavingsAccount)
UA-C7:    -8 741,82 UAH (CreditCardAccount)
UA-C8:     2 500,00 UAH (CreditCardAccount)
```

## Example 2. Explicit implementation of two interfaces

Create a `SalesSummary` class that implements the `IPrintable` and `ILoggable` interfaces with the same `Print` method, but in different ways: a frame for the printer and a timestamped line for the log. Show how the implementations are called.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var report = new SalesSummary(104_391m);

report.Print();                     // a regular class method
((IPrintable)report).Print();       // for printing on a printer
((ILoggable)report).Print();        // for the log

ILoggable log = report;
log.Print();

interface IPrintable
{
    void Print();
}

interface ILoggable
{
    void Print();
}

class SalesSummary(decimal total) : IPrintable, ILoggable
{
    public void Print() =>
        Console.WriteLine($"Sales: {total:N2} UAH");

    // Explicit implementation: accessible only through an interface variable.
    void IPrintable.Print()
    {
        Console.WriteLine("┌──────────────────────────┐");
        Console.WriteLine($"│ SALES   {total,14:N2} ₴ │");
        Console.WriteLine("└──────────────────────────┘");
    }

    void ILoggable.Print() =>
        Console.WriteLine($"2026-09-16 12:00:00 INFO sales={total}");
}
```

The class’s public `Print` method is not related to the interfaces and is called through a class variable. The explicit implementations `IPrintable.Print` and `ILoggable.Print` have no access modifier and are accessible only through a variable of the corresponding interface or a cast. Output:

```
Sales: 104 391,00 UAH
┌──────────────────────────┐
│ SALES       104 391,00 ₴ │
└──────────────────────────┘
2026-09-16 12:00:00 INFO sales=104391
2026-09-16 12:00:00 INFO sales=104391
```

## Example 3. A managed resource with `IDisposable`

Create a `DeviceSession` class that models a connection to a device and releases it in the `Dispose` method. Show the `using` statement, releasing the resource when an exception occurs, and protection against using a closed object.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// using statement: Dispose is called at the end of the block.
using (var session = new DeviceSession("Scanner"))
{
    session.Send("SCAN 300dpi");
}

// Dispose is called even if an exception occurs.
try
{
    using var printer = new DeviceSession("Printer");
    printer.Send("PRINT page 1");
    printer.Send("");                   // invalid command
    printer.Send("PRINT page 2");       // not executed
}
catch (ArgumentException ex)
{
    Console.WriteLine($"Error: empty argument {ex.ParamName}");
}

var closed = new DeviceSession("Plotter");
closed.Dispose();
closed.Dispose();                        // a repeated call is safe
try
{
    closed.Send("PLOT");
}
catch (ObjectDisposedException ex)
{
    Console.WriteLine($"Error: object {ex.ObjectName} is already closed");
}

class DeviceSession : IDisposable
{
    private readonly string device;
    private bool disposed;

    public DeviceSession(string device)
    {
        this.device = device;
        Console.WriteLine($"[{device}] connection opened");
    }

    public void Send(string command)
    {
        ObjectDisposedException.ThrowIf(disposed, this);
        ArgumentException.ThrowIfNullOrWhiteSpace(command);
        Console.WriteLine($"[{device}] → {command}");
    }

    public void Dispose()
    {
        if (disposed)
        {
            return;
        }
        disposed = true;
        Console.WriteLine($"[{device}] connection closed");
    }
}
```

In the first `using` block, the connection is closed after leaving the braces. In the second, the `using var` declaration closes the printer at the end of the `try` block even after an exception: the closing message is printed before the handler’s message. The `Dispose` method remembers its state and is safe to call repeatedly, and after closing, the `Send` method throws `ObjectDisposedException` using the `ObjectDisposedException.ThrowIf` helper. Output:

```
[Scanner] connection opened
[Scanner] → SCAN 300dpi
[Scanner] connection closed
[Printer] connection opened
[Printer] → PRINT page 1
[Printer] connection closed
Error: empty argument command
[Plotter] connection opened
[Plotter] connection closed
Error: object DeviceSession is already closed
```
