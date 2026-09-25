---
title: "Практика"
description: "Тема 14. Делегати, лямбди, події: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Калькулятор на словнику делегатів

Створити калькулятор, у якому операції зберігаються у словнику `Dictionary<string, Func<double, double, double>>`. Показати, що нову операцію можна додати без зміни коду обчислення.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Dictionary<string, Func<double, double, double>> operations = new()
{
    ["+"] = (a, b) => a + b,
    ["-"] = (a, b) => a - b,
    ["*"] = (a, b) => a * b,
    ["/"] = Divide,
    ["^"] = Math.Pow,
};
// Нову операцію додано без зміни коду обчислення.
operations["max"] = Math.Max;

Console.WriteLine($"Операції: {string.Join(" ", operations.Keys)}");
string[] inputs =
    ["12 + 30", "2 ^ 10", "7 / 0", "3 max 8", "5 % 2", "x * 2"];
foreach (string input in inputs)
{
    Console.WriteLine($"{input,-8} → {Evaluate(input)}");
}

string Evaluate(string expression)
{
    string[] parts = expression.Split(' ');
    if (parts.Length != 3
        || !double.TryParse(parts[0], out double left)
        || !double.TryParse(parts[2], out double right))
    {
        return "формат: число операція число";
    }

    if (!operations.TryGetValue(parts[1], out var operation))
    {
        return $"невідома операція «{parts[1]}»";
    }
    try
    {
        return operation(left, right).ToString();
    }
    catch (DivideByZeroException)
    {
        return "ділення на нуль";
    }
}

static double Divide(double a, double b) =>
    b == 0 ? throw new DivideByZeroException() : a / b;
```

Значеннями словника є лямбда-вирази, власний метод `Divide` і методи бібліотеки `Math.Pow` та `Math.Max`, сумісні з `Func<double, double, double>`. Локальна функція `Evaluate` знаходить делегат методом `TryGetValue` і викликає його. Вона не статична, бо використовує змінну `operations`. Результат:

```
Операції: + - * / ^ max
12 + 30  → 42
2 ^ 10   → 1024
7 / 0    → ділення на нуль
3 max 8  → 8
5 % 2    → невідома операція «%»
x * 2    → формат: число операція число
```

## Приклад 2. Повторні спроби

Створити функцію вищого порядку `Retry`, яка виконує передану дію, доки та не завершиться успішно, але не більше заданої кількості спроб. Журнал спроб передати делегатом `Action<string>`.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// Нестабільне «з’єднання»: перші дві спроби невдалі.
int calls = 0;

bool Connect()
{
    calls++;
    return calls >= 3;
}

bool ok = Retry(Connect, attempts: 5, log: Console.WriteLine);
Console.WriteLine($"Підключено: {ok}, викликів: {calls}\n");

// Завжди невдала операція; журнал збирається у список.
List<string> journal = [];
ok = Retry(() => false, attempts: 3, log: journal.Add);
Console.WriteLine($"Збережено: {ok}");
Console.WriteLine($"Журнал: {string.Join("; ", journal)}");

// Функція вищого порядку: дія та журнал передаються делегатами.
static bool Retry(Func<bool> action, int attempts, Action<string> log)
{
    ArgumentOutOfRangeException.ThrowIfLessThan(attempts, 1);
    for (int attempt = 1; attempt <= attempts; attempt++)
    {
        if (action())
        {
            log($"спроба {attempt}: успіх");
            return true;
        }
        log($"спроба {attempt}: невдача");
    }
    return false;
}
```

Локальна функція `Connect` змінює зовнішню змінну `calls`, тому перші два виклики повертають `false`. Як журнал у першому виклику передано метод `Console.WriteLine`, у другому – метод `journal.Add` конкретного списку: `Retry` не залежить від способу журналювання. Лямбда `() => false` моделює операцію, що завжди завершується невдачею. Результат:

```
спроба 1: невдача
спроба 2: невдача
спроба 3: успіх
Підключено: True, викликів: 3

Збережено: False
Журнал: спроба 1: невдача; спроба 2: невдача; спроба 3: невдача
```

## Приклад 3. Події банківського рахунку

Створити клас `BankAccount` з подіями `BalanceChanged` (з даними про суму й залишок) та `Overdrawn` (спроба перевищити кредитний ліміт). Підписати на події виписку та SMS-сповіщення, потім відписати SMS від зміни балансу.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

BankAccount account = new("UA-001", creditLimit: 1_000m);
Statement statement = new();
SmsNotifier sms = new("+380 67 000 00 00");

account.BalanceChanged += statement.OnBalanceChanged;
account.BalanceChanged += sms.OnBalanceChanged;
account.Overdrawn += sms.OnOverdrawn;

account.Deposit(2_500m);
account.Withdraw(3_000m);
account.Withdraw(900m);           // перевищення кредитного ліміту

account.BalanceChanged -= sms.OnBalanceChanged;
account.Deposit(1_000m);          // SMS більше не надсилається

statement.Print();

class BalanceChangedEventArgs(decimal amount, decimal balance)
    : EventArgs
{
    public decimal Amount { get; } = amount;
    public decimal Balance { get; } = balance;
}

class BankAccount(string number, decimal creditLimit)
{
    public string Number { get; } = number;
    public decimal Balance { get; private set; }

    public event EventHandler<BalanceChangedEventArgs>?
        BalanceChanged;
    public event EventHandler? Overdrawn;

    public void Deposit(decimal amount) => Change(amount);

    public void Withdraw(decimal amount)
    {
        if (Balance - amount < -creditLimit)
        {
            Overdrawn?.Invoke(this, EventArgs.Empty);
            return;
        }
        Change(-amount);
    }

    private void Change(decimal amount)
    {
        Balance += amount;
        BalanceChanged?.Invoke(this, new(amount, Balance));
    }
}

class Statement
{
    private readonly List<string> lines = [];

    public void OnBalanceChanged(
        object? sender, BalanceChangedEventArgs e) =>
        lines.Add($"{e.Amount,10:+0.00;-0.00} {e.Balance,10:N2}");

    public void Print()
    {
        Console.WriteLine("Виписка:");
        foreach (string line in lines) Console.WriteLine($"  {line}");
    }
}

class SmsNotifier(string phone)
{
    public void OnBalanceChanged(
        object? sender, BalanceChangedEventArgs e) =>
        Console.WriteLine($"SMS {phone}: баланс {e.Balance:N2} грн");

    public void OnOverdrawn(object? sender, EventArgs e)
    {
        string number = (sender as BankAccount)?.Number ?? "?";
        Console.WriteLine($"SMS {phone}: {number} – відмова, ліміт");
    }
}
```

Подія `BalanceChanged` має тип `EventHandler<BalanceChangedEventArgs>`, а подія без даних `Overdrawn` – `EventHandler` з аргументом `EventArgs.Empty`. Обидва підписники отримують рахунок через `sender`. Після відписки SMS-сповіщення про поповнення на 1 000 грн не надсилається, але виписка фіксує операцію. Формат `+0.00;-0.00` виводить знак суми. Результат:

```
SMS +380 67 000 00 00: баланс 2 500,00 грн
SMS +380 67 000 00 00: баланс -500,00 грн
SMS +380 67 000 00 00: UA-001 – відмова, ліміт
Виписка:
    +2500,00   2 500,00
    -3000,00    -500,00
    +1000,00     500,00
```
