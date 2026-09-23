---
title: "Практика"
description: "Тема 7. Класи та об’єкти: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Товари з обов’язковими властивостями

Створити клас `Product` з обов’язковими властивостями назви та ціни, необов’язковими кількістю та знижкою і обчислюваною властивістю вартості. Сформувати кошик товарів і вивести вирівняну таблицю з підсумком.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Product[] cart =
[
    new Product { Name = "Ноутбук", Price = 32_999m, Quantity = 1,
                  DiscountPercent = 7 },
    new Product { Name = "Миша", Price = 449.5m, Quantity = 2 },
    new Product { Name = "Кабель USB-C", Price = 199m, Quantity = 3,
                  DiscountPercent = 15 },
];

decimal total = 0;
Console.WriteLine($"{"Товар",-14}{"Ціна",10}{"К-сть",6}"
    + $"{"Знижка",8}{"Сума",12}");
foreach (Product p in cart)
{
    Console.WriteLine($"{p.Name,-14}{p.Price,10:N2}{p.Quantity,6}"
        + $"{p.DiscountPercent,7}%{p.Cost,12:N2}");
    total += p.Cost;
}
Console.WriteLine($"{"Разом",-38}{total,12:N2}");

class Product
{
    public required string Name { get; init; }
    public required decimal Price { get; init; }
    public int Quantity { get; init; } = 1;
    public int DiscountPercent { get; init; }

    // Вартість з урахуванням знижки, округлена до копійок.
    public decimal Cost =>
        Math.Round(Price * Quantity * (100 - DiscountPercent) / 100,
            2);
}
```

Модифікатор `required` не дозволяє створити товар без назви чи ціни: пропуск будь-якої з них спричиняє помилку компіляції CS9035. Властивість `Quantity` має значення за замовчуванням 1, тому для миші її можна не вказувати; знижка за замовчуванням дорівнює 0. Вартість обчислюється щоразу з поточних властивостей і не зберігається окремо. Результат:

```
Товар               Ціна К-сть  Знижка        Сума
Ноутбук        32 999,00     1      7%   30 689,07
Миша              449,50     2      0%      899,00
Кабель USB-C      199,00     3     15%      507,45
Разом                                    32 095,52
```

## Приклад 2. Прямокутник із перевіркою сторін

Створити клас `Rectangle`, властивості `Width` і `Height` якого не дозволяють задати недодатні значення, з обчислюваними властивостями площі, периметра, ознакою квадрата та методом масштабування.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var rect = new Rectangle(4, 2.5);
Print("Початковий", rect);

rect.Scale(1.5);
Print("Після Scale(1.5)", rect);

rect.Width = 3;
Print("Width = 3", rect);

try
{
    rect.Height = -1;
}
catch (ArgumentOutOfRangeException ex)
{
    Console.WriteLine($"Помилка: {ex.ParamName} = {ex.ActualValue}");
    Print("Без змін", rect);
}

static void Print(string title, Rectangle r) =>
    Console.WriteLine($"{title,-17} {r.Width} × {r.Height}: "
        + $"S = {r.Area:F2}, P = {r.Perimeter:F2}");

class Rectangle
{
    private double width;
    private double height;

    public Rectangle(double width, double height)
    {
        Width = width;      // перевірка у властивостях
        Height = height;
    }

    public double Width
    {
        get => width;
        set
        {
            ArgumentOutOfRangeException.ThrowIfNegativeOrZero(value);
            width = value;
        }
    }

    public double Height
    {
        get => height;
        set
        {
            ArgumentOutOfRangeException.ThrowIfNegativeOrZero(value);
            height = value;
        }
    }

    public double Area => width * height;
    public double Perimeter => 2 * (width + height);
    public bool IsSquare => Math.Abs(width - height) < 1e-9;

    public void Scale(double factor)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(factor);
        width *= factor;
        height *= factor;
    }
}
```

Конструктор присвоює значення через властивості, тому перевірка записана лише один раз – у методах доступу `set`. Якщо присвоєння `Height = -1` невдале, виняток виникає до зміни поля, і стан об’єкта залишається коректним. Метод `Scale` змінює обидві сторони, а обчислювані властивості `Area` і `Perimeter` одразу відображають нові розміри. Результат:

```
Початковий        4 × 2,5: S = 10,00, P = 13,00
Після Scale(1.5)  6 × 3,75: S = 22,50, P = 19,50
Width = 3         3 × 3,75: S = 11,25, P = 13,50
Помилка: value = -1
Без змін          3 × 3,75: S = 11,25, P = 13,50
```

## Приклад 3. Таймер кіл

Створити клас `LapTimer`, який зберігає час кіл у масиві обмеженої довжини, дозволяє додавати кола, знаходить найкраще коло та формує текстовий звіт.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var timer = new LapTimer("Бігова доріжка, 400 м", maxLaps: 10);

// Час кіл задано в секундах, щоб результат не залежав від годинника.
double[] times = [92.4, 88.1, 90.7, 86.9, 89.3];
foreach (double t in times)
{
    timer.AddLap(t);
}

Console.WriteLine(timer.Report());

class LapTimer
{
    private readonly double[] laps;
    private int count;

    public LapTimer(string title, int maxLaps = 20)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(title);
        ArgumentOutOfRangeException.ThrowIfLessThan(maxLaps, 1);
        Title = title;
        laps = new double[maxLaps];
    }

    public string Title { get; }
    public int LapCount => count;

    public double TotalSeconds
    {
        get
        {
            double sum = 0;
            for (int i = 0; i < count; i++)
            {
                sum += laps[i];
            }
            return sum;
        }
    }

    public void AddLap(double seconds)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(seconds);
        if (count == laps.Length)
        {
            throw new InvalidOperationException("Ліміт кіл.");
        }
        laps[count++] = seconds;
    }

    public int BestLap()
    {
        if (count == 0)
        {
            throw new InvalidOperationException("Кіл ще немає.");
        }
        int best = 0;
        for (int i = 1; i < count; i++)
        {
            if (laps[i] < laps[best])
            {
                best = i;
            }
        }
        return best;
    }

    public string Report()
    {
        var sb = new System.Text.StringBuilder();
        sb.AppendLine(Title);
        int best = BestLap();
        double elapsed = 0;
        for (int i = 0; i < count; i++)
        {
            elapsed += laps[i];
            string mark = i == best ? " ← найкраще" : "";
            sb.AppendLine($"  Коло {i + 1}: {Format(laps[i])}"
                + $"  (разом {Format(elapsed)}){mark}");
        }
        sb.Append($"Середнє коло: {Format(TotalSeconds / count)}");
        return sb.ToString();
    }

    private static string Format(double seconds) =>
        TimeSpan.FromSeconds(seconds).ToString(@"m\:ss\.f");
}
```

Масив `laps` створюється в конструкторі з довжиною `maxLaps`, а поле `count` зберігає кількість заповнених елементів: так клас приховує деталі зберігання, і користувач бачить лише властивість `LapCount` та методи. Метод `AddLap` перевіряє час і переповнення масиву. Допоміжний метод `Format` оголошено `private static`: він потрібен лише всередині класу й не використовує стан об’єкта (статичні члени – тема 8). Формат `m\:ss\.f` виводить хвилини, секунди й десяті частки секунди. Результат:

```
Бігова доріжка, 400 м
  Коло 1: 1:32.4  (разом 1:32.4)
  Коло 2: 1:28.1  (разом 3:00.5)
  Коло 3: 1:30.7  (разом 4:31.2)
  Коло 4: 1:26.9  (разом 5:58.1) ← найкраще
  Коло 5: 1:29.3  (разом 7:27.4)
Середнє коло: 1:29.4
```
