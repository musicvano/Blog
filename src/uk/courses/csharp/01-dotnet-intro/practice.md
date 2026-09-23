---
title: "Практика"
description: "Тема 1. .NET і структура програми: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Привітання користувача

Написати програму, яка запитує ім’я користувача та виводить привітання з поточною датою і часом.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

Console.Write("Введіть ваше ім’я: ");
string? name = Console.ReadLine();

if (string.IsNullOrWhiteSpace(name))
{
    name = "студенте";
}

DateTime now = DateTime.Now;
Console.WriteLine($"Вітаю, {name}!");
Console.WriteLine($"Сьогодні {now:dd.MM.yyyy}.");
Console.WriteLine($"Поточний час: {now:HH:mm}.");
```

Метод `ReadLine` повертає `string?`, тобто рядок, який може мати значення `null`. Метод `string.IsNullOrWhiteSpace` перевіряє, чи введено хоча б один видимий символ. Специфікатори `dd.MM.yyyy` і `HH:mm` задають формат дати й часу.

## Приклад 2. Площа та периметр прямокутника

Написати програму, яка зчитує ширину та висоту прямокутника, перевіряє коректність введених даних і виводить площу та периметр із двома знаками після коми.

```cs
using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

double width = ReadPositive("Ширина прямокутника, см: ");
double height = ReadPositive("Висота прямокутника, см: ");

double area = width * height;
double perimeter = 2 * (width + height);

Console.WriteLine($"Площа: {area:F2} см²");
Console.WriteLine($"Периметр: {perimeter:F2} см");

// Зчитує додатне число; роздільник – кома або крапка.
static double ReadPositive(string prompt)
{
    while (true)
    {
        Console.Write(prompt);
        string input = Console.ReadLine() ?? "";
        input = input.Replace(',', '.');
        if (double.TryParse(input, NumberStyles.Float,
            CultureInfo.InvariantCulture, out double value)
            && value > 0)
        {
            return value;
        }
        Console.WriteLine("Помилка: введіть додатне число.");
    }
}
```

Повторюване зчитування числа винесено в **локальну функцію** `ReadPositive` (функції детально розглядаються в темі 5). Операція `??` замінює `null` порожнім рядком, кома замінюється крапкою, а `CultureInfo.InvariantCulture` задає крапку як десятковий роздільник незалежно від налаштувань системи. Цикл повторює запит, доки користувач не введе додатне число.

Приклад роботи програми:

```
Ширина прямокутника, см: abc
Помилка: введіть додатне число.
Ширина прямокутника, см: 12,5
Висота прямокутника, см: 4.2
Площа: 52,50 см²
Периметр: 33,40 см
```

## Приклад 3. Відомості про програму та аргументи командного рядка

Створити за допомогою dotnet CLI проєкт із явним класом `Program` і методом `Main`, який виводить версію .NET, назву операційної системи та отримані аргументи командного рядка.

```
dotnet new console -n ProgramInfo --use-program-main
cd ProgramInfo
dotnet run -- alpha "beta gamma"
```

```cs
using System.Runtime.InteropServices;

namespace ProgramInfo;

internal class Program
{
    static void Main(string[] args)
    {
        Console.OutputEncoding = System.Text.Encoding.UTF8;

        string clr = RuntimeInformation.FrameworkDescription;
        string os = RuntimeInformation.OSDescription;

        Console.WriteLine($"Версія: {Environment.Version}");
        Console.WriteLine($"Середовище: {clr}");
        Console.WriteLine($"ОС: {os}");
        Console.WriteLine($"Аргументів: {args.Length}");

        for (int i = 0; i < args.Length; i++)
        {
            Console.WriteLine($"  args[{i}] = {args[i]}");
        }
    }
}
```

Параметр `--use-program-main` створює шаблон із методом `Main` замість операторів верхнього рівня. Усе, що в команді `dotnet run` записано після `--`, передається програмі як аргументи; аргумент у лапках, що містить пробіл, передається одним елементом масиву `args`. Результат виконання:

```
Версія: 10.0.11
Середовище: .NET 10.0.11
ОС: Microsoft Windows 10.0.26200
Аргументів: 2
  args[0] = alpha
  args[1] = beta gamma
```
