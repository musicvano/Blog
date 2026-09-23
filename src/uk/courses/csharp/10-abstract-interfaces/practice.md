---
title: "Практика"
description: "Тема 10. Абстрактні класи, інтерфейси: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Абстрактний рахунок із нарахуванням відсотків

Створити абстрактний клас `Account` з абстрактним методом щомісячного нарахування відсотків і дві реалізації: ощадний рахунок (відсотки на додатний залишок) і кредитну картку (відсотки на заборгованість). Змоделювати три місяці.

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
    Console.WriteLine($"{a.Number}: {a.Balance,12:N2} грн "
        + $"({a.GetType().Name})");
}

abstract class Account(string number, decimal balance)
{
    public string Number { get; } = number;
    public decimal Balance { get; protected set; } = balance;

    // Кожен вид рахунку по-своєму нараховує відсотки за місяць.
    protected abstract decimal MonthlyInterest();

    public void CloseMonth() =>
        Balance += Math.Round(MonthlyInterest(), 2);
}

class SavingsAccount(string number, decimal balance,
    decimal annualRate) : Account(number, balance)
{
    // Відсотки нараховуються на додатний залишок.
    protected override decimal MonthlyInterest() =>
        Balance > 0 ? Balance * annualRate / 12 : 0;
}

class CreditCardAccount(string number, decimal balance,
    decimal annualRate) : Account(number, balance)
{
    // Відсотки списуються лише з заборгованості.
    protected override decimal MonthlyInterest() =>
        Balance < 0 ? Balance * annualRate / 12 : 0;
}
```

Метод `CloseMonth` однаковий для всіх рахунків і викликає абстрактний `MonthlyInterest`, тому кожен рахунок нараховує відсотки за власним правилом. Метод `MonthlyInterest` має модифікатор `protected`: він потрібен лише для внутрішньої роботи рахунку. Властивість `Balance` з `protected set` змінюється лише методами ієрархії. Результат:

```
UA-S1:    51 515,05 грн (SavingsAccount)
UA-C7:    -8 741,82 грн (CreditCardAccount)
UA-C8:     2 500,00 грн (CreditCardAccount)
```

## Приклад 2. Явна реалізація двох інтерфейсів

Створити клас `SalesSummary`, який реалізує інтерфейси `IPrintable` і `ILoggable` з однаковим методом `Print`, але по-різному: для принтера – рамка, для журналу – рядок із часом. Показати, як викликаються реалізації.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var report = new SalesSummary(104_391m);

report.Print();                     // звичайний метод класу
((IPrintable)report).Print();       // для друку на принтері
((ILoggable)report).Print();        // для журналу

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
        Console.WriteLine($"Продажі: {total:N2} грн");

    // Явна реалізація: доступна лише через змінну інтерфейсу.
    void IPrintable.Print()
    {
        Console.WriteLine("┌──────────────────────────┐");
        Console.WriteLine($"│ ПРОДАЖІ {total,14:N2} ₴ │");
        Console.WriteLine("└──────────────────────────┘");
    }

    void ILoggable.Print() =>
        Console.WriteLine($"2026-09-16 12:00:00 INFO sales={total}");
}
```

Публічний метод `Print` класу не пов’язаний з інтерфейсами й викликається через змінну класу. Явні реалізації `IPrintable.Print` і `ILoggable.Print` не мають модифікатора доступу й доступні лише через змінну відповідного інтерфейсу або приведення. Результат:

```
Продажі: 104 391,00 грн
┌──────────────────────────┐
│ ПРОДАЖІ     104 391,00 ₴ │
└──────────────────────────┘
2026-09-16 12:00:00 INFO sales=104391
2026-09-16 12:00:00 INFO sales=104391
```

## Приклад 3. Керований ресурс з `IDisposable`

Створити клас `DeviceSession`, що моделює з’єднання з пристроєм і звільняє його в методі `Dispose`. Показати оператор `using`, звільнення ресурсу в разі винятку та захист від використання закритого об’єкта.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// Оголошення using: Dispose викликається в кінці блоку.
using (var session = new DeviceSession("Сканер"))
{
    session.Send("SCAN 300dpi");
}

// Dispose викликається навіть у разі винятку.
try
{
    using var printer = new DeviceSession("Принтер");
    printer.Send("PRINT page 1");
    printer.Send("");                   // некоректна команда
    printer.Send("PRINT page 2");       // не виконується
}
catch (ArgumentException ex)
{
    Console.WriteLine($"Помилка: порожній аргумент {ex.ParamName}");
}

var closed = new DeviceSession("Плотер");
closed.Dispose();
closed.Dispose();                        // повторний виклик безпечний
try
{
    closed.Send("PLOT");
}
catch (ObjectDisposedException ex)
{
    Console.WriteLine($"Помилка: об’єкт {ex.ObjectName} уже закрито");
}

class DeviceSession : IDisposable
{
    private readonly string device;
    private bool disposed;

    public DeviceSession(string device)
    {
        this.device = device;
        Console.WriteLine($"[{device}] з’єднання відкрито");
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
        Console.WriteLine($"[{device}] з’єднання закрито");
    }
}
```

У першому блоці `using` з’єднання закривається після виходу з фігурних дужок. У другому оголошення `using var` закриває принтер у кінці блоку `try` навіть після винятку: повідомлення про закриття виводиться до повідомлення обробника. Метод `Dispose` запам’ятовує стан і безпечний для повторного виклику, а метод `Send` після закриття генерує `ObjectDisposedException` помічником `ObjectDisposedException.ThrowIf`. Результат:

```
[Сканер] з’єднання відкрито
[Сканер] → SCAN 300dpi
[Сканер] з’єднання закрито
[Принтер] з’єднання відкрито
[Принтер] → PRINT page 1
[Принтер] з’єднання закрито
Помилка: порожній аргумент command
[Плотер] з’єднання відкрито
[Плотер] з’єднання закрито
Помилка: об’єкт DeviceSession уже закрито
```
