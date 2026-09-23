---
title: "Приклади та типові помилки"
description: "Тема 14. Делегати, лямбди, події: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

### Табулювання функцій

Метод `Tabulate` приймає функцію як параметр типу `Func<double, double>` і виводить її значення на відрізку. Функції передаються як метод бібліотеки, лямбда-вираз і власний метод.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// Змінна делегата може посилатися на будь-який сумісний метод.
Func<double, double> sin = Math.Sin;            // метод BCL
Func<double, double> square = x => x * x;       // лямбда-вираз
Func<double, double> damped = Damped;           // власний метод

Tabulate("sin x", sin, 0, 1.5, 0.5);
Tabulate("x²", square, 0, 1.5, 0.5);
Tabulate("e^(-x)·cos 3x", damped, 0, 1.5, 0.5);

// Лямбду можна передати й безпосередньо.
Tabulate("√x + 1", x => Math.Sqrt(x) + 1, 0, 1.5, 0.5);

static void Tabulate(
    string title, Func<double, double> f,
    double from, double to, double step)
{
    Console.Write($"{title,-14}|");
    for (double x = from; x <= to + step / 2; x += step)
    {
        Console.Write($"{f(x),8:F3}");       // виклик через делегат
    }
    Console.WriteLine();
}

static double Damped(double x) => Math.Exp(-x) * Math.Cos(3 * x);
```

Метод `Tabulate` не знає, яку функцію табулює: він лише викликає `f(x)`. Групи методів `Math.Sin` і `Damped` перетворюються на делегат автоматично, бо їхні сигнатури сумісні з `Func<double, double>`. Умова `x <= to + step / 2` компенсує похибку накопичення дійсних кроків. Результат:

```
sin x         |   0,000   0,479   0,841   0,997
x²            |   0,000   0,250   1,000   2,250
e^(-x)·cos 3x |   1,000   0,043  -0,364  -0,047
√x + 1        |   1,000   1,707   2,000   2,225
```

### Фільтрація та сортування товарів

Умови відбору описано делегатами `Predicate<Product>`, а функції вищого порядку `And` і `Not` будують з них складені умови. Сортування задає лямбда `Comparison<Product>`.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

List<Product> products =
[
    new("Ноутбук", 32_999m, "техніка", 4.6),
    new("Миша", 449m, "техніка", 4.1),
    new("Чайник", 1_299m, "побут", 4.8),
    new("Навушники", 2_499m, "техніка", 3.9),
    new("Праска", 1_899m, "побут", 4.4),
];

Predicate<Product> isTech = p => p.Category == "техніка";
Predicate<Product> isCheap = p => p.Price < 3_000m;
Predicate<Product> wellRated = p => p.Rating >= 4.0;

Print("Недорога техніка", products.FindAll(And(isTech, isCheap)));
Print("Добрий рейтинг, не техніка",
    products.FindAll(And(wellRated, Not(isTech))));

// Comparison<T>: спочатку категорія, потім ціна за спаданням.
products.Sort((a, b) =>
{
    int byCategory = string.Compare(a.Category, b.Category);
    return byCategory != 0 ? byCategory : b.Price.CompareTo(a.Price);
});
Print("Відсортовано", products);

int removed = products.RemoveAll(p => p.Rating < 4.0);
Console.WriteLine($"Вилучено з низьким рейтингом: {removed}");

// Функції вищого порядку: приймають і повертають делегати.
static Predicate<T> And<T>(Predicate<T> a, Predicate<T> b) =>
    item => a(item) && b(item);

static Predicate<T> Not<T>(Predicate<T> condition) =>
    item => !condition(item);

static void Print(string title, List<Product> items)
{
    Console.WriteLine($"{title}:");
    foreach (Product p in items)
    {
        string price = $"{p.Price:N2}";
        Console.WriteLine(
            $"  {p.Name,-10} {p.Category,-8} {price,10}  {p.Rating}");
    }
}

record Product(
    string Name, decimal Price, string Category, double Rating);
```

Методи `And` і `Not` повертають нові лямбди, які захоплюють передані умови. `FindAll` повертає новий список, `Sort` упорядковує наявний список за лямбдою-блоком, а `RemoveAll` вилучає елементи й повертає їхню кількість. Результат:

```
Недорога техніка:
  Миша       техніка      449,00  4,1
  Навушники  техніка    2 499,00  3,9
Добрий рейтинг, не техніка:
  Чайник     побут      1 299,00  4,8
  Праска     побут      1 899,00  4,4
Відсортовано:
  Праска     побут      1 899,00  4,4
  Чайник     побут      1 299,00  4,8
  Ноутбук    техніка   32 999,00  4,6
  Навушники  техніка    2 499,00  3,9
  Миша       техніка      449,00  4,1
Вилучено з низьким рейтингом: 1
```

### Лічильники й пастка змінної циклу

Метод `MakeCounter` повертає лямбду, що захоплює власну змінну `count`. Друга частина демонструє захоплення змінної циклу `for`.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// Кожен лічильник має власну захоплену змінну count.
Func<int> tickets = MakeCounter("Т-", 100);
Func<int> orders = MakeCounter("З-", 1);
tickets();
tickets();
orders();
tickets();

// Пастка: усі лямбди захоплюють одну змінну i циклу for.
List<Action> wrong = [];
for (int i = 1; i <= 3; i++)
{
    wrong.Add(() => Console.Write($"{i} "));
}
Console.Write("for без копії: ");
foreach (Action action in wrong) action();
Console.WriteLine();

// Виправлення: локальна копія створюється на кожній ітерації.
List<Action> right = [];
for (int i = 1; i <= 3; i++)
{
    int copy = i;
    right.Add(() => Console.Write($"{copy} "));
}
Console.Write("for з копією:  ");
foreach (Action action in right) action();
Console.WriteLine();

static Func<int> MakeCounter(string prefix, int start)
{
    int count = start - 1;             // захоплюється лямбдою
    return () =>
    {
        count++;
        Console.WriteLine($"Видано номер {prefix}{count}");
        return count;
    };
}
```

Лічильники `tickets` і `orders` незалежні: кожен виклик `MakeCounter` створює нову змінну `count`. У першому циклі всі три лямбди захоплюють одну змінну `i`, яка після завершення циклу дорівнює 4. У другому циклі змінна `copy` оголошена в тілі циклу, тому на кожній ітерації захоплюється нова змінна. Результат:

```
Видано номер Т-100
Видано номер Т-101
Видано номер З-1
Видано номер Т-102
for без копії: 4 4 4
for з копією:  1 2 3
```

### Термостат

Клас `Thermostat` генерує подію `TemperatureChanged` за стандартним шаблоном .NET. На подію підписані лямбда-«дисплей», статичний метод-журнал і метод об’єкта `AlarmSystem`.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Thermostat thermostat = new("Серверна", maxAllowed: 27);
AlarmSystem alarm = new();

// Підписка: лямбда, статичний метод і метод об’єкта.
thermostat.TemperatureChanged += (sender, e) =>
    Console.WriteLine($"  [Дисплей] {e.NewValue:F1} °C");
thermostat.TemperatureChanged += LogChange;
thermostat.TemperatureChanged += alarm.OnTemperatureChanged;

thermostat.Measure(24.5);
thermostat.Measure(24.5);        // без змін – подія не виникає
thermostat.Measure(28.2);

// Відписка журналу: метод можна зняти за іменем.
thermostat.TemperatureChanged -= LogChange;
Console.WriteLine("Журнал відписано");
thermostat.Measure(26.0);

static void LogChange(object? sender, TemperatureChangedEventArgs e)
{
    string room = (sender as Thermostat)?.Room ?? "?";
    Console.WriteLine(
        $"  [Журнал] {room}: {e.OldValue:F1} → {e.NewValue:F1}");
}

// Дані події.
class TemperatureChangedEventArgs(double oldValue, double newValue)
    : EventArgs
{
    public double OldValue { get; } = oldValue;
    public double NewValue { get; } = newValue;
}

// Видавець.
class Thermostat(string room, double maxAllowed)
{
    private double current = double.NaN;

    public string Room { get; } = room;
    public double MaxAllowed { get; } = maxAllowed;

    public event EventHandler<TemperatureChangedEventArgs>?
        TemperatureChanged;

    public void Measure(double value)
    {
        Console.WriteLine($"Вимір: {value:F1} °C");
        if (value == current)
        {
            return;
        }
        TemperatureChangedEventArgs e = new(current, value);
        current = value;
        OnTemperatureChanged(e);
    }

    protected virtual void OnTemperatureChanged(
        TemperatureChangedEventArgs e) =>
        TemperatureChanged?.Invoke(this, e);
}

// Підписник.
class AlarmSystem
{
    public void OnTemperatureChanged(
        object? sender, TemperatureChangedEventArgs e)
    {
        if (sender is Thermostat t && e.NewValue > t.MaxAllowed)
        {
            Console.WriteLine(
                $"  [Тривога] {t.Room}: понад {t.MaxAllowed} °C!");
        }
    }
}
```

Подія генерується лише тоді, коли значення змінилося. Спочатку температура не виміряна (`double.NaN`), тому в першому записі журналу старе значення – `NaN`. Обробники визначають видавця через параметр `sender`, тому `AlarmSystem` може обслуговувати кілька термостатів. Після відписки журналу подію отримує лише дисплей і тривога. Результат:

```
Вимір: 24,5 °C
  [Дисплей] 24,5 °C
  [Журнал] Серверна: NaN → 24,5
Вимір: 24,5 °C
Вимір: 28,2 °C
  [Дисплей] 28,2 °C
  [Журнал] Серверна: 24,5 → 28,2
  [Тривога] Серверна: понад 27 °C!
Журнал відписано
Вимір: 26,0 °C
  [Дисплей] 26,0 °C
```

## Типові помилки

Таблиця 14.2. Типові помилки під час роботи з делегатами та подіями {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| `NullReferenceException` під час виклику делегата чи події | немає жодного методу чи підписника; викликати через `?.Invoke` |
| CS0070: подію не можна викликати ззовні класу | подію генерує лише клас-видавець; додати відкритий метод, що генерує подію всередині |
| відписка лямбдою не спрацьовує | повторно записана лямбда – інший делегат; зберегти лямбду в змінній |
| витік пам’яті | підписник не відписався від довгоживучого видавця; відписуватися під час завершення роботи |
| усі лямбди з циклу `for` бачать останнє значення | захоплено одну змінну циклу; скопіювати значення в локальну змінну тіла циклу |
| результати групового делегата втрачаються | повертається значення лише останнього методу; використовувати `void` або окремі виклики |
| важкий обробник блокує видавця | обробники виконуються синхронно по черзі; робити обробники короткими |
| CS8917: неможливо вивести тип делегата | лямбда без типу призначення й типів параметрів; вказати тип змінної або параметрів |
