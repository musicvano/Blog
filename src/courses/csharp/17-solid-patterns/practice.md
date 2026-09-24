---
title: "Practice"
description: "Topic 17. SOLID and design patterns: worked examples"
outline: [2, 3]
sourceHash: "4f8af788108be925489fe6b7573f880d0df2247979ead98af829c35b9cae0ac5"
---

# Practice

## Example 1. Fixing a Liskov principle violation

A hierarchy of birds with a `Fly` method in the base class violates the Liskov substitution principle: a penguin cannot fly. Show the violation and fix the hierarchy by segregating interfaces.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine("Before the fix (LSP violation):");
BadBird[] flock = [new BadSparrow(), new BadPenguin()];
foreach (BadBird bird in flock)
{
    try
    {
        Console.WriteLine($"  {bird.Fly(100)}");
    }
    catch (NotSupportedException e)
    {
        Console.WriteLine($"  Error: {e.Message}");
    }
}

Console.WriteLine("After the fix (ISP + LSP):");
Bird[] birds = [new Sparrow(), new Penguin(), new Duck()];
foreach (Bird bird in birds)
{
    Console.WriteLine($"  {bird.Name}: {bird.Move()}");
}
foreach (IFlyingBird flyer in birds.OfType<IFlyingBird>())
{
    Console.WriteLine($"  in the sky: {flyer.Fly(100)}");
}

// Bad: the base class promises flight that not everyone can perform.
abstract class BadBird
{
    public abstract string Fly(int meters);
}

class BadSparrow : BadBird
{
    public override string Fly(int meters) =>
        $"the sparrow flies {meters} m";
}

class BadPenguin : BadBird
{
    public override string Fly(int meters) =>
        throw new NotSupportedException("a penguin cannot fly");
}

// Good: what is shared goes in the base class, abilities go in interfaces.
abstract class Bird
{
    public abstract string Name { get; }
    public abstract string Move();
}

interface IFlyingBird
{
    string Fly(int meters);
}

interface ISwimmingBird
{
    string Swim(int meters);
}

class Sparrow : Bird, IFlyingBird
{
    public override string Name => "sparrow";
    public override string Move() => Fly(10);
    public string Fly(int meters) => $"flies {meters} m";
}

class Penguin : Bird, ISwimmingBird
{
    public override string Name => "penguin";
    public override string Move() => Swim(10);
    public string Swim(int meters) => $"swims {meters} m";
}

class Duck : Bird, IFlyingBird, ISwimmingBird
{
    public override string Name => "duck";
    public override string Move() => Swim(5);
    public string Fly(int meters) => $"the duck flies {meters} m";
    public string Swim(int meters) => $"swims {meters} m";
}
```

In the first hierarchy, code that works with `BadBird` cannot safely call `Fly` for any bird: `BadPenguin` throws an exception, that is, it does not substitute for the base class. In the fixed hierarchy, the base class contains only the `Move` behavior shared by all, and the abilities to fly and swim are moved into the `IFlyingBird` and `ISwimmingBird` interfaces (ISP). Code that needs flight selects only the birds with this ability through `OfType<IFlyingBird>()`. Output:

```
Before the fix (LSP violation):
  the sparrow flies 100 m
  Error: a penguin cannot fly
After the fix (ISP + LSP):
  sparrow: flies 10 m
  penguin: swims 10 m
  duck: swims 5 m
  in the sky: flies 100 m
  in the sky: the duck flies 100 m
```

## Example 2. An Adapter for a third-party exchange rate service

The program calculates prices through its own `ICurrencyConverter` interface. The third-party class `LegacyRatesService` has an incompatible method (a currency pair as a string, `double`, error code −1) and cannot be changed. Create an adapter.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// Client code works only with its own interface.
ICurrencyConverter converter =
    new LegacyConverterAdapter(new LegacyRatesService());
PriceList prices = new(converter);

prices.Print(["Laptop", "Headphones"], [32_999m, 2_499m], "USD");
prices.Print(["Laptop"], [32_999m], "EUR");
prices.Print(["Laptop"], [32_999m], "GBP");

// The interface our program expects.
interface ICurrencyConverter
{
    decimal Convert(decimal amount, string from, string to);
}

// A third-party class: it cannot be changed, and its interface is incompatible.
class LegacyRatesService
{
    private readonly Dictionary<string, double> ratesToUah = new()
    {
        ["USD"] = 41.25, ["EUR"] = 48.10, ["UAH"] = 1.0,
    };

    // Returns -1 if a currency is unknown; the pair is in the "UAH>USD" format.
    public double Exchange(string pair, double value)
    {
        string[] codes = pair.Split('>');
        if (!ratesToUah.TryGetValue(codes[0], out double from)
            || !ratesToUah.TryGetValue(codes[1], out double to))
        {
            return -1;
        }
        return value * from / to;
    }
}

// The adapter converts calls and errors into the format of our interface.
class LegacyConverterAdapter(LegacyRatesService service)
    : ICurrencyConverter
{
    public decimal Convert(decimal amount, string from, string to)
    {
        double result =
            service.Exchange($"{from}>{to}", (double)amount);
        if (result < 0)
        {
            throw new ArgumentException($"no rate for {from} → {to}");
        }
        return Math.Round((decimal)result, 2);
    }
}

class PriceList(ICurrencyConverter converter)
{
    public void Print(
        string[] names, decimal[] pricesUah, string currency)
    {
        try
        {
            for (int i = 0; i < names.Length; i++)
            {
                decimal price =
                    converter.Convert(pricesUah[i], "UAH", currency);
                Console.WriteLine(
                    $"{names[i],-10} {price,9:N2} {currency}");
            }
        }
        catch (ArgumentException e)
        {
            Console.WriteLine($"Error: {e.Message}");
        }
    }
}
```

`LegacyConverterAdapter` implements `ICurrencyConverter` and internally converts the parameters into the format of the third-party class: it builds the pair string, converts `decimal` to `double` and back, and replaces the error code −1 with an exception. `PriceList` knows nothing about the third-party class, so in the future the service can be replaced with another implementation of the interface. Output:

```
Laptop        799,98 USD
Headphones     60,58 USD
Laptop        686,05 EUR
Error: no rate for UAH → GBP
```

## Example 3. Command with Undo/Redo

Implement a text editor in which appending and deleting operations are commands, and a history lets you undo and redo them.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

TextDocument document = new();
CommandHistory history = new();

history.Execute(new AppendCommand(document, "Hello"));
history.Execute(new AppendCommand(document, ", world"));
history.Execute(new AppendCommand(document, "!!!"));
Show("3 commands");

history.Undo();
Show("Undo");
history.Undo();
Show("Undo");
history.Redo();
Show("Redo");

history.Execute(new DeleteLastCommand(document, 2));
Show("Delete 2");
Console.WriteLine($"Redo possible: {history.CanRedo}");  // false
history.Undo();
Show("Undo");

void Show(string action) =>
    Console.WriteLine($"{action,-10} → “{document.Text}”");

class TextDocument
{
    public string Text { get; set; } = "";
}

interface ICommand
{
    void Execute();
    void Undo();
}

class AppendCommand(TextDocument document, string text) : ICommand
{
    public void Execute() => document.Text += text;
    public void Undo() =>
        document.Text = document.Text[..^text.Length];
}

class DeleteLastCommand(TextDocument document, int count) : ICommand
{
    private string removed = "";

    public void Execute()
    {
        int n = Math.Min(count, document.Text.Length);
        removed = document.Text[^n..];     // remember for Undo
        document.Text = document.Text[..^n];
    }

    public void Undo() => document.Text += removed;
}

// The invoker: executes commands and keeps the history.
class CommandHistory
{
    private readonly Stack<ICommand> undo = new();
    private readonly Stack<ICommand> redo = new();

    public bool CanRedo => redo.Count > 0;

    public void Execute(ICommand command)
    {
        command.Execute();
        undo.Push(command);
        redo.Clear();                   // a new action clears “forward”
    }

    public void Undo()
    {
        if (undo.TryPop(out ICommand? command))
        {
            command.Undo();
            redo.Push(command);
        }
    }

    public void Redo()
    {
        if (redo.TryPop(out ICommand? command))
        {
            command.Execute();
            undo.Push(command);
        }
    }
}
```

Each command stores the receiver (`TextDocument`) and the data needed for undo: `DeleteLastCommand` remembers the deleted text. `CommandHistory` does not know the concrete commands and works with the `ICommand` interface. An undone command moves to the `redo` stack, and a new command clears it, so redo is impossible after the deletion. Output:

```
3 commands → “Hello, world!!!”
Undo       → “Hello, world”
Undo       → “Hello”
Redo       → “Hello, world”
Delete 2   → “Hello, wor”
Redo possible: False
Undo       → “Hello, world”
```
