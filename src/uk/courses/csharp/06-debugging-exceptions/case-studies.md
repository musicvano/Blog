---
title: "Приклади та типові помилки"
description: "Тема 6. Налагодження та винятки: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

### Пошук логічної помилки

Програма обчислює середній бал, але виводить 77 замість очікуваних 77,75. Помилки компіляції та винятків немає – це логічна помилка.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

int[] scores = [90, 85, 72, 64];

double average = Average(scores);
Console.WriteLine($"Середній бал: {average}");

// Помилка: сума і довжина цілі, тому ділення цілочисельне.
static double Average(int[] values)
{
    int sum = 0;
    foreach (int value in values)
    {
        sum += value;
    }
    double result = sum / values.Length;
    return result;
}
```

Порядок налагодження: встановити точку зупинки на рядку `return result;`, запустити програму (**F5**) і додати у вікно *Watch* вирази `sum`, `values.Length` і `sum / values.Length`. Вікно покаже `sum = 311`, `values.Length = 4` і `sum / values.Length = 77`: обидва операнди цілі, тому ділення цілочисельне, а дробова частина відкидається ще до присвоєння змінній `double`. Виправлення – привести один операнд до `double`:

```cs
double result = (double)sum / values.Length;
```

Після виправлення програма виводить `Середній бал: 77,75`.

### Безпечне ділення

Програма ділить два цілі числа, введені користувачем, і обробляє всі можливі винятки: некоректний формат, ділення на нуль і переповнення.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Ділене: ");
string? first = Console.ReadLine();
Console.Write("Дільник: ");
string? second = Console.ReadLine();

try
{
    int dividend = int.Parse(first ?? "");
    int divisor = int.Parse(second ?? "");
    int quotient = dividend / divisor;
    int remainder = dividend % divisor;
    Console.WriteLine($"Частка: {quotient}, остача: {remainder}");
}
catch (FormatException)
{
    Console.WriteLine("Помилка: потрібні цілі числа.");
}
catch (DivideByZeroException)
{
    Console.WriteLine("Помилка: ділення на нуль.");
}
catch (OverflowException ex)
{
    Console.WriteLine($"Помилка переповнення: {ex.Message}");
}
finally
{
    Console.WriteLine("Обчислення завершено.");
}
```

Переповнення виникає у двох випадках: число не вміщується в `int` (`int.Parse` генерує `OverflowException`) або ділення `int.MinValue / -1`, результат якого (2 147 483 648) також не вміщується в `int`. Блок `finally` виконується за будь-якого результату. Результати для різних введень:

```
Ділене: 17
Дільник: 5
Частка: 3, остача: 2
Обчислення завершено.
```

```
Ділене: 17
Дільник: 0
Помилка: ділення на нуль.
Обчислення завершено.
```

```
Ділене: -2147483648
Дільник: -1
Помилка переповнення: Arithmetic operation resulted in an overflow.
Обчислення завершено.
```

У цьому прикладі винятки показано навчально; у реальній програмі введення краще перевіряти `int.TryParse`, а дільник – умовою.

### Перевірка аргументів

Метод `ApplyDiscount` перевіряє свої аргументи помічниками `ArgumentOutOfRangeException`, а основна програма перехоплює виняток для кожної пари «ціна – знижка» окремо, тому помилка в одних даних не зупиняє обробку інших.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

decimal[] prices = [1200m, 850m, -40m, 499.9m];
int[] percents = [10, 150, 5, 0];

for (int i = 0; i < prices.Length; i++)
{
    try
    {
        decimal result = ApplyDiscount(prices[i], percents[i]);
        Console.WriteLine(
            $"{prices[i],8} − {percents[i],3} % = {result:N2}");
    }
    catch (ArgumentOutOfRangeException ex)
    {
        Console.WriteLine($"{prices[i],8} − {percents[i],3} %: "
            + $"{ex.ParamName} поза допустимими межами");
    }
}

// Ціна зі знижкою; некоректні аргументи – виняток.
static decimal ApplyDiscount(decimal price, int percent)
{
    ArgumentOutOfRangeException.ThrowIfNegative(price);
    ArgumentOutOfRangeException.ThrowIfNegative(percent);
    ArgumentOutOfRangeException.ThrowIfGreaterThan(percent, 100);

    return Math.Round(price * (100 - percent) / 100, 2);
}
```

Властивість `ParamName` містить ім’я параметра, який не пройшов перевірку. Результат:

```
 1200 −  10 % = 1 080,00
  850 − 150 %: percent поза допустимими межами
  -40 −   5 %: price поза допустимими межами
499,9 −   0 % = 499,90
```

### Обробка рядків даних

Програма розбирає рядки «прізвище;бали», пропускає некоректні з повідомленням у потік помилок, підраховує помилки й задає код завершення.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

string[] lines =
[
    "Коваль;92",
    "Бондар;сімдесят",
    "Мельник",
    "Шевчук;105",
    "Ткаченко;64",
];

int total = 0, errors = 0;
for (int i = 0; i < lines.Length; i++)
{
    try
    {
        (string name, int score) = ParseLine(lines[i], i + 1);
        total += score;
        Console.WriteLine($"{name,-10}{score,4}");
    }
    catch (FormatException ex) when (ex.InnerException is not null)
    {
        errors++;
        Console.Error.WriteLine(
            $"{ex.Message} ({ex.InnerException.GetType().Name})");
    }
    catch (FormatException ex)
    {
        errors++;
        Console.Error.WriteLine(ex.Message);
    }
}

int processed = lines.Length - errors;
Console.WriteLine($"Оброблено: {processed}, помилок: {errors}");
Environment.ExitCode = errors == 0 ? 0 : 1;

// Розбирає рядок «прізвище;бали» і перевіряє діапазон балів.
static (string Name, int Score) ParseLine(string line, int number)
{
    string[] parts = line.Split(';');
    if (parts.Length != 2)
    {
        throw new FormatException(
            $"Рядок {number}: очікується «прізвище;бали»");
    }
    int score;
    try
    {
        score = int.Parse(parts[1]);
    }
    catch (FormatException ex)
    {
        throw new FormatException(
            $"Рядок {number}: бали не є числом", ex);
    }
    if (score is < 0 or > 100)
    {
        throw new FormatException(
            $"Рядок {number}: бали {score} поза 0–100");
    }
    return (parts[0], score);
}
```

Метод `ParseLine` генерує `FormatException` з номером рядка. Якщо помилку спричинив `int.Parse`, його виняток передається як `InnerException`, і фільтр `when (ex.InnerException is not null)` обирає перший блок `catch`, який показує тип внутрішнього винятку. Результат (рядки з помилками виводяться в `Console.Error`, а код завершення дорівнює 1):

```
Коваль      92
Рядок 2: бали не є числом (FormatException)
Рядок 3: очікується «прізвище;бали»
Рядок 4: бали 105 поза 0–100
Ткаченко    64
Оброблено: 2, помилок: 3
```

## Типові помилки

Таблиця 6.3. Типові помилки під час налагодження та обробки винятків {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| порожній `catch { }` | помилка приховується; обробити виняток (повідомити, повторити) або не перехоплювати його |
| `catch (Exception)` навколо всього коду | неможливо відрізнити очікувані помилки від вад програми; перехоплювати конкретні типи |
| CS0160: попередній `catch` уже перехоплює цей тип | загальний тип стоїть перед конкретним; записувати `catch` від нащадків до базових типів |
| `try`/`catch` навколо `int.Parse` для введення | некоректне введення – очікувана ситуація; `int.TryParse` |
| `throw ex;` у блоці `catch` | втрачається стек викликів; `throw;` або новий виняток з `InnerException` |
| повідомлення про помилки змішуються з результатами | помилки виводяться в `Console.WriteLine`; `Console.Error.WriteLine` і код завершення |
| `Debug.WriteLine` нічого не виводить | повідомлення йдуть у вікно *Output* і лише в конфігурації Debug |
| налагоджувач не зупиняється на точці зупинки | програму запущено без налагодження (**Ctrl+F5**) або в Release; запускати **F5** у Debug |
