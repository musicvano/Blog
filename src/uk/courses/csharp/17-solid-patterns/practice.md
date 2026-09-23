---
title: "Практика"
description: "Тема 17. SOLID і шаблони проєктування: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Виправлення порушення принципу Лісков

Ієрархія птахів із методом `Fly` у базовому класі порушує принцип підстановки Лісков: пінгвін не може літати. Показати порушення та виправити ієрархію розділенням інтерфейсів.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine("До виправлення (порушення LSP):");
BadBird[] flock = [new BadSparrow(), new BadPenguin()];
foreach (BadBird bird in flock)
{
    try
    {
        Console.WriteLine($"  {bird.Fly(100)}");
    }
    catch (NotSupportedException e)
    {
        Console.WriteLine($"  Помилка: {e.Message}");
    }
}

Console.WriteLine("Після виправлення (ISP + LSP):");
Bird[] birds = [new Sparrow(), new Penguin(), new Duck()];
foreach (Bird bird in birds)
{
    Console.WriteLine($"  {bird.Name}: {bird.Move()}");
}
foreach (IFlyingBird flyer in birds.OfType<IFlyingBird>())
{
    Console.WriteLine($"  у небі: {flyer.Fly(100)}");
}

// Погано: базовий клас обіцяє політ, який не всі можуть виконати.
abstract class BadBird
{
    public abstract string Fly(int meters);
}

class BadSparrow : BadBird
{
    public override string Fly(int meters) =>
        $"горобець летить {meters} м";
}

class BadPenguin : BadBird
{
    public override string Fly(int meters) =>
        throw new NotSupportedException("пінгвін не літає");
}

// Добре: спільне – у базовому класі, здатність – в інтерфейсі.
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
    public override string Name => "горобець";
    public override string Move() => Fly(10);
    public string Fly(int meters) => $"летить {meters} м";
}

class Penguin : Bird, ISwimmingBird
{
    public override string Name => "пінгвін";
    public override string Move() => Swim(10);
    public string Swim(int meters) => $"пливе {meters} м";
}

class Duck : Bird, IFlyingBird, ISwimmingBird
{
    public override string Name => "качка";
    public override string Move() => Swim(5);
    public string Fly(int meters) => $"качка летить {meters} м";
    public string Swim(int meters) => $"пливе {meters} м";
}
```

У першій ієрархії код, що працює з `BadBird`, не може безпечно викликати `Fly` для будь-якого птаха: `BadPenguin` генерує виняток, тобто не замінює базовий клас. У виправленій ієрархії базовий клас містить лише спільну для всіх поведінку `Move`, а здатності літати й плавати винесено в інтерфейси `IFlyingBird` і `ISwimmingBird` (ISP). Код, якому потрібен політ, відбирає лише птахів з цією здатністю через `OfType<IFlyingBird>()`. Результат:

```
До виправлення (порушення LSP):
  горобець летить 100 м
  Помилка: пінгвін не літає
Після виправлення (ISP + LSP):
  горобець: летить 10 м
  пінгвін: пливе 10 м
  качка: пливе 5 м
  у небі: летить 100 м
  у небі: качка летить 100 м
```

## Приклад 2. «Адаптер» для стороннього сервісу курсів

Програма розраховує ціни через власний інтерфейс `ICurrencyConverter`. Сторонній клас `LegacyRatesService` має несумісний метод (пара валют рядком, `double`, код помилки −1) і змінити його не можна. Створити адаптер.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// Клієнтський код працює лише з власним інтерфейсом.
ICurrencyConverter converter =
    new LegacyConverterAdapter(new LegacyRatesService());
PriceList prices = new(converter);

prices.Print(["Ноутбук", "Навушники"], [32_999m, 2_499m], "USD");
prices.Print(["Ноутбук"], [32_999m], "EUR");
prices.Print(["Ноутбук"], [32_999m], "GBP");

// Інтерфейс, якого очікує наша програма.
interface ICurrencyConverter
{
    decimal Convert(decimal amount, string from, string to);
}

// Сторонній клас: змінити його не можна, інтерфейс несумісний.
class LegacyRatesService
{
    private readonly Dictionary<string, double> ratesToUah = new()
    {
        ["USD"] = 41.25, ["EUR"] = 48.10, ["UAH"] = 1.0,
    };

    // Повертає -1, якщо валюта невідома; пара у форматі "UAH>USD".
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

// Адаптер перетворює виклики та помилки у формат нашого інтерфейсу.
class LegacyConverterAdapter(LegacyRatesService service)
    : ICurrencyConverter
{
    public decimal Convert(decimal amount, string from, string to)
    {
        double result =
            service.Exchange($"{from}>{to}", (double)amount);
        if (result < 0)
        {
            throw new ArgumentException($"немає курсу {from} → {to}");
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
            Console.WriteLine($"Помилка: {e.Message}");
        }
    }
}
```

`LegacyConverterAdapter` реалізує `ICurrencyConverter` і всередині перетворює параметри на формат стороннього класу: формує рядок пари, переводить `decimal` у `double` і назад, замінює код помилки −1 на виняток. `PriceList` нічого не знає про сторонній клас, тому в майбутньому сервіс можна замінити іншою реалізацією інтерфейсу. Результат:

```
Ноутбук       799,98 USD
Навушники      60,58 USD
Ноутбук       686,05 EUR
Помилка: немає курсу UAH → GBP
```

## Приклад 3. «Команда» з Undo/Redo

Реалізувати текстовий редактор, у якому операції дописування й видалення є командами, а історія дозволяє скасовувати й повторювати їх.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

TextDocument document = new();
CommandHistory history = new();

history.Execute(new AppendCommand(document, "Привіт"));
history.Execute(new AppendCommand(document, ", світ"));
history.Execute(new AppendCommand(document, "!!!"));
Show("3 команди");

history.Undo();
Show("Undo");
history.Undo();
Show("Undo");
history.Redo();
Show("Redo");

history.Execute(new DeleteLastCommand(document, 2));
Show("Delete 2");
Console.WriteLine($"Redo можливий: {history.CanRedo}");  // false
history.Undo();
Show("Undo");

void Show(string action) =>
    Console.WriteLine($"{action,-10} → «{document.Text}»");

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
        removed = document.Text[^n..];     // запам’ятати для Undo
        document.Text = document.Text[..^n];
    }

    public void Undo() => document.Text += removed;
}

// Викликач: виконує команди й зберігає історію.
class CommandHistory
{
    private readonly Stack<ICommand> undo = new();
    private readonly Stack<ICommand> redo = new();

    public bool CanRedo => redo.Count > 0;

    public void Execute(ICommand command)
    {
        command.Execute();
        undo.Push(command);
        redo.Clear();                   // нова дія скасовує «вперед»
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

Кожна команда зберігає отримувача (`TextDocument`) і дані, потрібні для скасування: `DeleteLastCommand` запам’ятовує видалений текст. `CommandHistory` не знає конкретних команд і працює з інтерфейсом `ICommand`. Скасована команда переходить у стек `redo`, а нова команда очищає його, тому після видалення повтор неможливий. Результат:

```
3 команди  → «Привіт, світ!!!»
Undo       → «Привіт, світ»
Undo       → «Привіт»
Redo       → «Привіт, світ»
Delete 2   → «Привіт, св»
Redo можливий: False
Undo       → «Привіт, світ»
```
