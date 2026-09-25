---
title: "Практика"
description: "Тема 8. Інкапсуляція та статичні члени: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Температура з фабричними методами

Створити клас `Temperature`, об’єкти якого не можна створити конструктором напряму: лише фабричними методами `FromCelsius`, `FromFahrenheit`, `FromKelvin` або методом `TryParse`. Клас не дозволяє температуру нижче абсолютного нуля.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var boiling = Temperature.FromCelsius(100);
var body = Temperature.FromFahrenheit(98.6);
var space = Temperature.FromKelvin(2.7);

Console.WriteLine(boiling);
Console.WriteLine(body);
Console.WriteLine(space);
Console.WriteLine($"Абсолютний нуль: {Temperature.AbsoluteZero}");

string[] inputs = ["36,6C", "451F", "-300C", "abc"];
foreach (string text in inputs)
{
    Console.WriteLine(Temperature.TryParse(text, out Temperature? t)
        ? $"{text,-6} → {t}"
        : $"{text,-6} → некоректне значення");
}

class Temperature
{
    public static readonly Temperature AbsoluteZero = new(-273.15);

    private readonly double celsius;

    // Закритий конструктор: об’єкти створюються лише методами класу.
    private Temperature(double celsius)
    {
        if (celsius < -273.15)
        {
            throw new ArgumentOutOfRangeException(nameof(celsius),
                "Нижче абсолютного нуля.");
        }
        this.celsius = celsius;
    }

    public double Celsius => celsius;
    public double Fahrenheit => celsius * 9 / 5 + 32;
    public double Kelvin => celsius + 273.15;

    public static Temperature FromCelsius(double c) => new(c);
    public static Temperature FromFahrenheit(double f) =>
        new((f - 32) * 5 / 9);
    public static Temperature FromKelvin(double k) => new(k - 273.15);

    // Розбирає «36,6C» або «451F»; false замість винятку.
    public static bool TryParse(string text, out Temperature? result)
    {
        result = null;
        if (text.Length < 2
            || !double.TryParse(text[..^1], out double value))
        {
            return false;
        }

        double c = char.ToUpper(text[^1]) switch
        {
            'C' => value,
            'F' => (value - 32) * 5 / 9,
            'K' => value - 273.15,
            _ => double.NaN,
        };
        if (double.IsNaN(c) || c < -273.15)
        {
            return false;
        }
        result = new Temperature(c);
        return true;
    }

    public override string ToString() =>
        $"{celsius:F2} °C = {Fahrenheit:F2} °F = {Kelvin:F2} K";
}
```

Три шкали задаються числом типу `double`, тому три перевантажені конструктори оголосити неможливо: фабричні методи з різними назвами розв’язують цю проблему й роблять виклик зрозумілим. Закритий конструктор перевіряє інваріант в одному місці. Поле `AbsoluteZero` оголошено `static readonly`, бо його тип – клас, недоступний для `const`. Метод `TryParse` повертає `false` замість винятку, а результат передає через `out`-параметр типу `Temperature?`. Результат:

```
100,00 °C = 212,00 °F = 373,15 K
37,00 °C = 98,60 °F = 310,15 K
-270,45 °C = -454,81 °F = 2,70 K
Абсолютний нуль: -273,15 °C = -459,67 °F = 0,00 K
36,6C  → 36,60 °C = 97,88 °F = 309,75 K
451F   → 232,78 °C = 451,00 °F = 505,93 K
-300C  → некоректне значення
abc    → некоректне значення
```

## Приклад 2. Студент з незмінним номером залікової книжки

Створити клас `Student`, у якому номер залікової книжки формується автоматично з року вступу та статичного лічильника створених об’єктів і після створення не змінюється, а прізвище можна змінювати з перевіркою.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

var students = new[]
{
    new Student("Коваль Олена", 2026),
    new Student("Бондар Петро", 2026),
    new Student("Мельник Ірина", 2025),
};

foreach (Student s in students)
{
    Console.WriteLine($"{s.RecordBookNumber}  {s.FullName}");
}
Console.WriteLine($"Створено студентів: {Student.Count}");

students[1].FullName = "Бондаренко Петро";   // прізвище можна змінити
// students[1].RecordBookNumber = "…";        // CS0200: лише читання
Console.WriteLine(students[1]);

class Student
{
    private static int count;
    private string fullName = "";

    public Student(string fullName, int admissionYear)
    {
        FullName = fullName;
        count++;
        RecordBookNumber = $"{admissionYear % 100:D2}-{count:D4}";
    }

    public static int Count => count;

    // Номер присвоюється один раз і більше не змінюється.
    public string RecordBookNumber { get; }

    public string FullName
    {
        get => fullName;
        set
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(value);
            fullName = value.Trim();
        }
    }

    public override string ToString() =>
        $"{RecordBookNumber} {FullName}";
}
```

Статичне поле `count` спільне для всіх студентів, тому кожен новий об’єкт отримує наступний номер. Властивість `RecordBookNumber` не має `set`: присвоєння поза конструктором спричиняє помилку CS0200. Статична властивість `Count` дозволяє дізнатися кількість створених об’єктів без жодного об’єкта. Результат:

```
26-0001  Коваль Олена
26-0002  Бондар Петро
25-0003  Мельник Ірина
Створено студентів: 3
26-0002 Бондаренко Петро
```

## Приклад 3. Бібліотека класів для безпечного введення

Створити рішення `Survey` з бібліотекою класів `Common.Input`, що містить статичний клас `ConsoleInput` з методами безпечного зчитування чисел і вибору варіанта, та консольним застосунком `Survey.App`, який використовує бібліотеку для анкети.

```
dotnet new sln -n Survey
dotnet new classlib -n Common.Input
dotnet new console -n Survey.App
dotnet sln add Common.Input Survey.App
dotnet add Survey.App reference Common.Input
```

Файл `Common.Input/ConsoleInput.cs`:

```cs
namespace Common.Input;

/// <summary>Безпечне зчитування даних із консолі.</summary>
public static class ConsoleInput
{
    public const string DefaultError =
        "Некоректне значення, повторіть.";

    public static int ReadInt(string prompt, int min = int.MinValue,
        int max = int.MaxValue)
    {
        while (true)
        {
            string text = ReadText(prompt);
            if (int.TryParse(text, out int value)
                && value >= min && value <= max)
            {
                return value;
            }
            Console.WriteLine($"{DefaultError} ({min}…{max})");
        }
    }

    public static double ReadDouble(string prompt)
    {
        while (true)
        {
            string text = ReadText(prompt).Replace('.', ',');
            if (double.TryParse(text, out double value))
            {
                return value;
            }
            Console.WriteLine(DefaultError);
        }
    }

    public static int ReadChoice(string prompt,
        params string[] options)
    {
        for (int i = 0; i < options.Length; i++)
        {
            Console.WriteLine($"  {i + 1}. {options[i]}");
        }
        return ReadInt(prompt, 1, options.Length) - 1;
    }

    // Внутрішній метод: не потрібен користувачам бібліотеки.
    internal static string ReadText(string prompt)
    {
        Console.Write(prompt);
        return (Console.ReadLine() ?? throw new EndOfStreamException(
            "Введення завершено")).Trim();
    }
}
```

Файл `Survey.App/Program.cs`:

```cs
using Common.Input;

Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

int age = ConsoleInput.ReadInt("Вік: ", 10, 100);
int course = ConsoleInput.ReadChoice("Курс навчання: ",
    "перший", "другий", "третій", "четвертий");
double hours =
    ConsoleInput.ReadDouble("Годин програмування на тиждень: ");

Console.WriteLine(
    $"Вік {age}, курс {course + 1}, {hours} год/тиждень");
```

Методи бібліотеки публічні, а допоміжний `ReadText` – `internal`: застосунок його не бачить, але методи бібліотеки використовують. Якщо введення завершено (кінець потоку), `ReadText` генерує `EndOfStreamException` замість нескінченного циклу. Метод `ReadChoice` з параметром `params` приймає будь-яку кількість варіантів і повертає індекс обраного. Ту саму бібліотеку можна підключити до інших застосунків курсу. Результат (команда `dotnet run --project Survey.App`):

```
Вік: 9
Некоректне значення, повторіть. (10…100)
Вік: сімнадцять
Некоректне значення, повторіть. (10…100)
Вік: 18
  1. перший
  2. другий
  3. третій
  4. четвертий
Курс навчання: 5
Некоректне значення, повторіть. (1…4)
Курс навчання: 1
Годин програмування на тиждень: 7.5
Вік 18, курс 1, 7,5 год/тиждень
```
