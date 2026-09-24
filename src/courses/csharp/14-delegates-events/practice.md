---
title: "Practice"
description: "Topic 14. Delegates, lambdas, events: worked examples"
outline: [2, 3]
sourceHash: "6d34e2060a093fca5c90ffb54834625229a8c74c079c5934998a2f57af310e73"
---

# Practice

## Example 1. A calculator based on a dictionary of delegates

Create a calculator in which operations are stored in a `Dictionary<string, Func<double, double, double>>`. Show that a new operation can be added without changing the evaluation code.

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
// A new operation is added without changing the evaluation code.
operations["max"] = Math.Max;

Console.WriteLine($"Operations: {string.Join(" ", operations.Keys)}");
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
        return "format: number operation number";
    }
    if (!operations.TryGetValue(parts[1], out var operation))
    {
        return $"unknown operation “{parts[1]}”";
    }
    try
    {
        return operation(left, right).ToString();
    }
    catch (DivideByZeroException)
    {
        return "division by zero";
    }
}

static double Divide(double a, double b) =>
    b == 0 ? throw new DivideByZeroException() : a / b;
```

The dictionary values are lambda expressions, the custom `Divide` method, and the library methods `Math.Pow` and `Math.Max`, which are compatible with `Func<double, double, double>`. The local function `Evaluate` finds the delegate with the `TryGetValue` method and calls it. It is not static because it uses the `operations` variable. Output:

```
Operations: + - * / ^ max
12 + 30  → 42
2 ^ 10   → 1024
7 / 0    → division by zero
3 max 8  → 8
5 % 2    → unknown operation “%”
x * 2    → format: number operation number
```

## Example 2. Retries

Create a higher-order function `Retry` that executes the passed action until it succeeds, but no more than a given number of attempts. Pass the attempt log as an `Action<string>` delegate.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// An unstable “connection”: the first two attempts fail.
int calls = 0;
bool Connect()
{
    calls++;
    return calls >= 3;
}

bool ok = Retry(Connect, attempts: 5, log: Console.WriteLine);
Console.WriteLine($"Connected: {ok}, calls: {calls}\n");

// An operation that always fails; the log is collected in a list.
List<string> journal = [];
ok = Retry(() => false, attempts: 3, log: journal.Add);
Console.WriteLine($"Saved: {ok}");
Console.WriteLine($"Log: {string.Join("; ", journal)}");

// A higher-order function: the action and the log are passed as delegates.
static bool Retry(Func<bool> action, int attempts, Action<string> log)
{
    ArgumentOutOfRangeException.ThrowIfLessThan(attempts, 1);
    for (int attempt = 1; attempt <= attempts; attempt++)
    {
        if (action())
        {
            log($"attempt {attempt}: success");
            return true;
        }
        log($"attempt {attempt}: failure");
    }
    return false;
}
```

The local function `Connect` changes the outer variable `calls`, so the first two calls return `false`. In the first call, the `Console.WriteLine` method is passed as the log, and in the second, the `journal.Add` method of a specific list: `Retry` does not depend on how logging is done. The lambda `() => false` models an operation that always fails. Output:

```
attempt 1: failure
attempt 2: failure
attempt 3: success
Connected: True, calls: 3

Saved: False
Log: attempt 1: failure; attempt 2: failure; attempt 3: failure
```

## Example 3. Bank account events

Create a `BankAccount` class with the events `BalanceChanged` (with data about the amount and balance) and `Overdrawn` (an attempt to exceed the credit limit). Subscribe a statement and SMS notifications to the events, then unsubscribe the SMS notifications from balance changes.

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
account.Withdraw(900m);           // exceeds the credit limit

account.BalanceChanged -= sms.OnBalanceChanged;
account.Deposit(1_000m);          // SMS is no longer sent

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
        Console.WriteLine("Statement:");
        foreach (string line in lines) Console.WriteLine($"  {line}");
    }
}

class SmsNotifier(string phone)
{
    public void OnBalanceChanged(
        object? sender, BalanceChangedEventArgs e) =>
        Console.WriteLine($"SMS {phone}: balance {e.Balance:N2} UAH");

    public void OnOverdrawn(object? sender, EventArgs e)
    {
        string number = (sender as BankAccount)?.Number ?? "?";
        Console.WriteLine($"SMS {phone}: {number} – declined, limit");
    }
}
```

The `BalanceChanged` event has the type `EventHandler<BalanceChangedEventArgs>`, and the `Overdrawn` event without data is an `EventHandler` with the `EventArgs.Empty` argument. Both subscribers get the account through `sender`. After unsubscribing, no SMS notification is sent for the 1,000 UAH deposit, but the statement records the operation. The `+0.00;-0.00` format prints the sign of the amount. Output:

```
SMS +380 67 000 00 00: balance 2 500,00 UAH
SMS +380 67 000 00 00: balance -500,00 UAH
SMS +380 67 000 00 00: UA-001 – declined, limit
Statement:
    +2500,00   2 500,00
    -3000,00    -500,00
    +1000,00     500,00
```
