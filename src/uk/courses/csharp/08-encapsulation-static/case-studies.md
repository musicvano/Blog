---
title: "Приклади та типові помилки"
description: "Тема 8. Інкапсуляція та статичні члени: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

### Інкапсульований рахунок

Клас `Account` зберігає баланс і історію операцій у приватних полях, дотримується інваріанта «баланс ≥ 0» і видає історію лише як захисну копію.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var account = new Account("UA-001");
account.Deposit(1000m);
account.Withdraw(250m);
account.Deposit(80m);

decimal[] history = account.GetHistory();
history[0] = 1_000_000m;          // змінюється лише копія

Console.WriteLine($"Баланс: {account.Balance:N2} грн");
string operations = string.Join("; ", account.GetHistory());
Console.WriteLine($"Операції: {operations}");

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
    private decimal balance;               // інваріант: balance >= 0
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
                $"Неможливо зняти {amount:N2}: баланс {balance:N2}");
        }
        balance -= amount;
        Record(-amount);
    }

    // Захисна копія: зовнішній код не змінить внутрішній масив.
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

Приватний метод `Record` збільшує масив за потреби: це деталь реалізації, яку зовнішній код не бачить. Зміна елемента масиву, отриманого з `GetHistory`, не впливає на рахунок. Результат:

```
Баланс: 830,00 грн
Операції: 1000; -250; 80
Неможливо зняти 5 000,00: баланс 830,00
```

### Замовлення з автоматичним номером

Клас `Order` присвоює кожному замовленню унікальний номер зі статичного лічильника, а ставку ПДВ зберігає в полі `static readonly`, яке ініціалізує статичний конструктор.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine("Початок програми");
var first = new Order(1200m);
var second = new Order(349.99m);
var third = new Order(80m);

foreach (Order o in new[] { first, second, third })
{
    Console.WriteLine($"{o.Number}: {o.Net,8:N2} + ПДВ {o.Vat,7:N2}");
}
Console.WriteLine($"Створено замовлень: {Order.CreatedCount}");

class Order
{
    public static readonly decimal VatRate;      // задається один раз
    private static int nextNumber;               // спільне для всіх

    // Статичний конструктор: виконується один раз перед першим
    // використанням класу.
    static Order()
    {
        VatRate = 0.20m;
        nextNumber = 1001;
        Console.WriteLine("Статичний конструктор Order");
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

Повідомлення статичного конструктора виводиться один раз, після «Початок програми» – перед створенням першого замовлення. Статична властивість `CreatedCount` викликається через ім’я класу. Результат:

```
Початок програми
Статичний конструктор Order
ORD-1001: 1 200,00 + ПДВ  240,00
ORD-1002:   349,99 + ПДВ   70,00
ORD-1003:    80,00 + ПДВ   16,00
Створено замовлень: 3
```

### Утилітний клас перевірок

Статичний клас `Validation` містить константу й методи перевірки даних; директиви `using static` дозволяють викликати ці методи та методи `Math` без імені класу.

```cs
using static System.Math;
using static Validation;

Console.OutputEncoding = System.Text.Encoding.UTF8;

string[] emails =
    ["olena@knu.edu.ua", "petro@", "@mail.com", "a.b@c.ua"];
foreach (string e in emails)
{
    Console.WriteLine($"{e,-18} {(IsEmail(e) ? "так" : "ні")}");
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

Метод `IsEmail` виконує спрощену перевірку: є один символ `@` не на початку та крапка в домені. Результат:

```
olena@knu.edu.ua   так
petro@             ні
@mail.com          ні
a.b@c.ua           так
True
True
12,25
```

### Бібліотека класів і консольний застосунок

Рішення `Bank` складається з бібліотеки класів `Bank.Core` і консольного застосунку `Bank.App`, створених командами dotnet CLI, наведеними вище. Бібліотека містить публічні класи `Account` та `InterestService` і внутрішній клас `Validator`.

Файл `Bank.Core/Account.cs`:

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

Файл `Bank.Core/Validator.cs`:

```cs
namespace Bank.Core;

// Допоміжний клас доступний лише всередині збірки Bank.Core.
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

Файл `Bank.Core/InterestService.cs`:

```cs
namespace Bank.Core;

public static class InterestService
{
    // Єдиний публічний спосіб нарахувати відсотки.
    public static void AddMonthlyInterest(Account account,
        decimal annualRate)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(annualRate);
        account.ApplyInterest(annualRate / 12);
    }
}
```

Файл `Bank.App/Program.cs`:

```cs
using Bank.Core;

Console.OutputEncoding = System.Text.Encoding.UTF8;

var account = new Account("  Олена Коваль ");
account.Deposit(12_000m);
InterestService.AddMonthlyInterest(account, 0.12m);

Console.WriteLine($"{account.Owner}: {account.Balance:N2} грн");

// account.ApplyInterest(0.5m);         // CS1061: метод internal
// Validator.RequirePositive(10m);      // CS0122: клас internal
```

Клас `Validator` і метод `ApplyInterest` мають доступ `internal`: їх використовують класи бібліотеки, але застосунок їх не бачить. Якщо розкоментувати останні рядки `Program.cs`, збирання завершиться помилками CS1061 і CS0122. Єдиний спосіб нарахувати відсотки з застосунку – публічний метод `InterestService.AddMonthlyInterest`, який перевіряє ставку. Команда `dotnet run --project Bank.App` виводить:

```
Олена Коваль: 12 120,00 грн
```

## Типові помилки

Таблиця 8.2. Типові помилки інкапсуляції та статичних членів {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| стан об’єкта змінено в обхід перевірок | публічне поле або властивість, що повертає внутрішній масив; приватне поле, методи-команди, захисна копія |
| CS0122: *inaccessible due to its protection level* | член `private`/`internal` використано поза дозволеною областю; змінити модифікатор або скористатися публічним членом |
| CS0120: для нестатичного члена потрібне посилання на об’єкт | статичний метод звертається до поля екземпляра; передати об’єкт параметром або прибрати `static` |
| усі методи й поля позначено `static` | процедурний стиль замість об’єктів; статичними роблять лише члени, не пов’язані зі станом об’єкта |
| значення статичного поля «змінюється саме» | статичне поле спільне для всіх об’єктів; для даних окремого об’єкта використовувати поле екземпляра |
| `readonly`-масив змінюється | `readonly` забороняє лише присвоїти інший масив; повертати копію |
| CS0131/CS0133 для `const` з об’єктом або обчисленням під час виконання | `const` лише для значень, відомих компілятору; використовувати `static readonly` |
