---
title: "Examples and common mistakes"
description: "Topic 8. Encapsulation, static members: Examples and common mistakes"
outline: [2, 3]
sourceHash: "7d19ea86e3a98d4d367b16d62439c2ce6fbbd9780d163cf93ba1c80c9a0ba2d4"
---

# Examples and common mistakes

## Example programs

### An encapsulated account

The `Account` class stores the balance and operation history in private fields, maintains the “balance ≥ 0” invariant, and exposes the history only as a defensive copy.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var account = new Account("UA-001");
account.Deposit(1000m);
account.Withdraw(250m);
account.Deposit(80m);

decimal[] history = account.GetHistory();
history[0] = 1_000_000m;          // only the copy changes

Console.WriteLine($"Balance: {account.Balance:N2} UAH");
string operations = string.Join("; ", account.GetHistory());
Console.WriteLine($"Operations: {operations}");

try
{
    account.Withdraw(5000m);
}
catch (InvalidOperationException ex)
{
    Console.WriteLine(ex.Message);
}

class Account
{
    private decimal balance;               // invariant: balance >= 0
    private decimal[] operations = new decimal[4];
    private int count;

    public Account(string number)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(number);
        Number = number;
    }

    public string Number { get; }
    public decimal Balance => balance;

    public void Deposit(decimal amount)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(amount);
        balance += amount;
        Record(amount);
    }

    public void Withdraw(decimal amount)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(amount);
        if (amount > balance)
        {
            throw new InvalidOperationException(
                $"Cannot withdraw {amount:N2}: balance {balance:N2}");
        }
        balance -= amount;
        Record(-amount);
    }

    // Defensive copy: external code cannot change the internal array.
    public decimal[] GetHistory() => operations[..count];

    private void Record(decimal amount)
    {
        if (count == operations.Length)
        {
            Array.Resize(ref operations, operations.Length * 2);
        }
        operations[count++] = amount;
    }
}
```

The private `Record` method grows the array when needed: this is an implementation detail invisible to external code. Changing an element of the array returned by `GetHistory` does not affect the account. Output:

```
Balance: 830,00 UAH
Operations: 1000; -250; 80
Cannot withdraw 5 000,00: balance 830,00
```

### Orders with automatic numbers

The `Order` class assigns each order a unique number from a static counter and stores the VAT rate in a `static readonly` field initialized by a static constructor.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine("Program start");
var first = new Order(1200m);
var second = new Order(349.99m);
var third = new Order(80m);

foreach (Order o in new[] { first, second, third })
{
    Console.WriteLine($"{o.Number}: {o.Net,8:N2} + VAT {o.Vat,7:N2}");
}
Console.WriteLine($"Orders created: {Order.CreatedCount}");

class Order
{
    public static readonly decimal VatRate;      // set once
    private static int nextNumber;               // shared by all

    // Static constructor: runs once before the class
    // is first used.
    static Order()
    {
        VatRate = 0.20m;
        nextNumber = 1001;
        Console.WriteLine("Order static constructor");
    }

    public Order(decimal net)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(net);
        Net = net;
        Number = $"ORD-{nextNumber++}";
    }

    public string Number { get; }
    public decimal Net { get; }
    public decimal Vat => Math.Round(Net * VatRate, 2);

    public static int CreatedCount => nextNumber - 1001;
}
```

The static constructor’s message is printed once, after “Program start,” before the first order is created. The static `CreatedCount` property is accessed through the class name. Output:

```
Program start
Order static constructor
ORD-1001: 1 200,00 + VAT  240,00
ORD-1002:   349,99 + VAT   70,00
ORD-1003:    80,00 + VAT   16,00
Orders created: 3
```

### A validation utility class

The static `Validation` class contains a constant and data validation methods; `using static` directives let you call these methods and the `Math` methods without the class name.

```cs
using static System.Math;
using static Validation;

Console.OutputEncoding = System.Text.Encoding.UTF8;

string[] emails =
    ["olena@knu.edu.ua", "petro@", "@mail.com", "a.b@c.ua"];
foreach (string e in emails)
{
    Console.WriteLine($"{e,-18} {(IsEmail(e) ? "yes" : "no")}");
}

Console.WriteLine(IsInRange(42, 0, 100));        // True
Console.WriteLine(IsUkrainianPhone("+380671234567"));
Console.WriteLine(Round(Sqrt(Validation.MaxAge), 2));

static class Validation
{
    public const int MaxAge = 150;

    public static bool IsInRange(int value, int min, int max) =>
        value >= min && value <= max;

    public static bool IsEmail(string text)
    {
        int at = text.IndexOf('@');
        return at > 0
            && at == text.LastIndexOf('@')
            && text.IndexOf('.', at) > at + 1
            && !text.EndsWith('.');
    }

    public static bool IsUkrainianPhone(string text)
    {
        if (text.Length != 13 || !text.StartsWith("+380"))
        {
            return false;
        }
        foreach (char c in text[1..])
        {
            if (!char.IsDigit(c))
            {
                return false;
            }
        }
        return true;
    }
}
```

The `IsEmail` method performs a simplified check: there is exactly one `@` character, not at the beginning, and a period in the domain. Output:

```
olena@knu.edu.ua   yes
petro@             no
@mail.com          no
a.b@c.ua           yes
True
True
12,25
```

### A class library and a console application

The `Bank` solution consists of the `Bank.Core` class library and the `Bank.App` console application, created with the dotnet CLI commands shown above. The library contains the public classes `Account` and `InterestService` and the internal class `Validator`.

The `Bank.Core/Account.cs` file:

```cs
namespace Bank.Core;

public class Account
{
    private decimal balance;

    public Account(string owner)
    {
        Owner = Validator.RequireName(owner);
    }

    public string Owner { get; }
    public decimal Balance => balance;

    public void Deposit(decimal amount)
    {
        Validator.RequirePositive(amount);
        balance += amount;
    }

    internal void ApplyInterest(decimal rate) =>
        balance += Math.Round(balance * rate, 2);
}
```

The `Bank.Core/Validator.cs` file:

```cs
namespace Bank.Core;

// The helper class is accessible only inside the Bank.Core assembly.
internal static class Validator
{
    public static string RequireName(string name)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        return name.Trim();
    }

    public static void RequirePositive(decimal amount) =>
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(amount);
}
```

The `Bank.Core/InterestService.cs` file:

```cs
namespace Bank.Core;

public static class InterestService
{
    // The only public way to add interest.
    public static void AddMonthlyInterest(Account account,
        decimal annualRate)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(annualRate);
        account.ApplyInterest(annualRate / 12);
    }
}
```

The `Bank.App/Program.cs` file:

```cs
using Bank.Core;

Console.OutputEncoding = System.Text.Encoding.UTF8;

var account = new Account("  Olena Koval ");
account.Deposit(12_000m);
InterestService.AddMonthlyInterest(account, 0.12m);

Console.WriteLine($"{account.Owner}: {account.Balance:N2} UAH");

// account.ApplyInterest(0.5m);         // CS1061: the method is internal
// Validator.RequirePositive(10m);      // CS0122: the class is internal
```

The `Validator` class and the `ApplyInterest` method have `internal` access: library classes use them, but the application cannot see them. If you uncomment the last lines of `Program.cs`, the build fails with errors CS1061 and CS0122. The only way for the application to add interest is the public `InterestService.AddMonthlyInterest` method, which validates the rate. The `dotnet run --project Bank.App` command prints:

```
Olena Koval: 12 120,00 UAH
```

## Common mistakes

Table 8.2. Common mistakes with encapsulation and static members {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| object state changed, bypassing validation | a public field or a property that returns an internal array; use a private field, command methods, and a defensive copy |
| CS0122: *inaccessible due to its protection level* | a `private`/`internal` member used outside its allowed scope; change the modifier or use a public member |
| CS0120: an object reference is required for the non-static member | a static method accesses an instance field; pass the object as a parameter or remove `static` |
| all methods and fields are marked `static` | procedural style instead of objects; make static only members not tied to object state |
| a static field’s value “changes by itself” | a static field is shared by all objects; use an instance field for per-object data |
| a `readonly` array changes | `readonly` only prevents assigning a different array; return a copy |
| CS0131/CS0133 for a `const` with an object or a run-time calculation | `const` is only for values known to the compiler; use `static readonly` |
