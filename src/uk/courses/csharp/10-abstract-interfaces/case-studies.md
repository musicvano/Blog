---
title: "Приклади та типові помилки"
description: "Тема 10. Абстрактні класи, інтерфейси: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

### Абстрактний клас `Shape`

Абстрактний клас `Shape` зберігає назву й містить абстрактні члени `Area` і `Kind`, а звичайний метод `Describe` використовує їх для форматованого опису. Звіт обробляє масив фігур поліморфно.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Shape[] shapes =
[
    new Circle("Кришка люка", 0.4),
    new Rectangle("Підлога", 5.2, 3.8),
    new Triangle("Фронтон", 6, 2.5),
];

double total = 0;
foreach (Shape s in shapes)
{
    Console.WriteLine(s.Describe());
    total += s.Area();
}
Console.WriteLine($"Загальна площа: {total:F2} м²");

// Абстрактний клас: об’єкт Shape створити не можна.
abstract class Shape
{
    protected Shape(string name)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        Name = name;
    }

    public string Name { get; }

    // Абстрактні члени: реалізацію мусить надати похідний клас.
    public abstract double Area();
    public abstract string Kind { get; }

    // Звичайний метод використовує абстрактні члени.
    public string Describe() =>
        $"{Kind,-13}{Name,-14}{Area(),8:F2} м²";
}

class Circle(string name, double radius) : Shape(name)
{
    public override string Kind => "круг";
    public override double Area() => Math.PI * radius * radius;
}

class Rectangle(string name, double width, double height)
    : Shape(name)
{
    public override string Kind => "прямокутник";
    public override double Area() => width * height;
}

class Triangle(string name, double baseLength, double height)
    : Shape(name)
{
    public override string Kind => "трикутник";
    public override double Area() => baseLength * height / 2;
}
```

Конструктор абстрактного класу має модифікатор `protected`: його викликають лише похідні класи. Похідні класи використовують первинні конструктори й передають назву в `Shape(name)`. Результат:

```
круг         Кришка люка       0,50 м²
прямокутник  Підлога          19,76 м²
трикутник    Фронтон           7,50 м²
Загальна площа: 27,76 м²
```

### Шаблонний метод для звітів

Абстрактний клас `Report` задає порядок друку: заголовок, тіло, підвал. Тіло звіту є абстрактним кроком, підвал – віртуальним, а заголовок – приватним і незмінним.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Report[] reports =
[
    new SalesReport(["Ноутбук;3;32999", "Миша;12;449,5"]),
    new StockReport(["Ноутбук;4", "Миша;0", "Кабель USB-C;57"]),
];

foreach (Report r in reports)
{
    r.Print();
    Console.WriteLine();
}

abstract class Report
{
    // Шаблонний метод: порядок кроків спільний для всіх звітів.
    public void Print()
    {
        PrintHeader();
        PrintBody();
        PrintFooter();
    }

    protected abstract string Title { get; }
    protected abstract void PrintBody();

    // Необов’язковий крок: похідний клас може змінити підвал.
    protected virtual void PrintFooter() =>
        Console.WriteLine(new string('─', 34));

    private void PrintHeader()
    {
        Console.WriteLine(Title.ToUpper());
        Console.WriteLine(new string('─', 34));
    }
}

class SalesReport(string[] lines) : Report
{
    private decimal total;

    protected override string Title => "Звіт про продажі";

    protected override void PrintBody()
    {
        foreach (string line in lines)
        {
            string[] p = line.Split(';');
            decimal sum = int.Parse(p[1]) * decimal.Parse(p[2]);
            total += sum;
            Console.WriteLine($"{p[0],-16}{p[1],4} шт.{sum,11:N2}");
        }
    }

    protected override void PrintFooter()
    {
        base.PrintFooter();
        Console.WriteLine($"{"Разом",-23}{total,11:N2}");
    }
}

class StockReport(string[] lines) : Report
{
    protected override string Title => "Залишки на складі";

    protected override void PrintBody()
    {
        foreach (string line in lines)
        {
            string[] p = line.Split(';');
            string mark = p[1] == "0" ? "  ← закінчився" : "";
            Console.WriteLine($"{p[0],-16}{p[1],4} шт.{mark}");
        }
    }
}
```

Метод `Print` не віртуальний: похідні класи не можуть змінити порядок кроків. `SalesReport` перевизначає підвал і викликає базову версію, щоб додати рядок «Разом». Результат:

```
ЗВІТ ПРО ПРОДАЖІ
──────────────────────────────────
Ноутбук            3 шт.  98 997,00
Миша              12 шт.   5 394,00
──────────────────────────────────
Разом                   104 391,00

ЗАЛИШКИ НА СКЛАДІ
──────────────────────────────────
Ноутбук            4 шт.
Миша               0 шт.  ← закінчився
Кабель USB-C      57 шт.
──────────────────────────────────
```

### Інтерфейси розумного дому

Пристрої реалізують інтерфейс `ISwitchable`, а регульовані лампи – ще й `IDimmable`. Програма вмикає всі пристрої й зменшує яскравість тих, що її підтримують.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

ISwitchable[] devices =
[
    new SmartLamp("Лампа у вітальні"),
    new Kettle("Чайник"),
    new SmartLamp("Нічник"),
];

foreach (ISwitchable device in devices)
{
    device.TurnOn();
    if (device is IDimmable dimmable)       // перевірка інтерфейсу
    {
        dimmable.Brightness = 40;
    }
}

foreach (ISwitchable device in devices)
{
    Console.WriteLine(device.Status);
}

interface ISwitchable
{
    bool IsOn { get; }
    void TurnOn();
    void TurnOff();

    // Член за замовчуванням: реалізація в інтерфейсі.
    string Status =>
        $"{GetType().Name}: {(IsOn ? "увімк." : "вимк.")}";
}

interface IDimmable
{
    int Brightness { get; set; }
}

class SmartLamp(string name) : ISwitchable, IDimmable
{
    private int brightness = 100;

    public bool IsOn { get; private set; }
    public void TurnOn() => IsOn = true;
    public void TurnOff() => IsOn = false;

    public int Brightness
    {
        get => brightness;
        set => brightness = Math.Clamp(value, 0, 100);
    }

    // Власний Status замінює реалізацію за замовчуванням.
    public string Status => IsOn
        ? $"{name}: увімк., яскравість {Brightness} %"
        : $"{name}: вимк.";
}

class Kettle(string name) : ISwitchable
{
    public bool IsOn { get; private set; }
    public void TurnOn() => IsOn = true;
    public void TurnOff() => IsOn = false;
    public override string ToString() => name;
}
```

Чайник не має власної властивості `Status`, тому використовується реалізація за замовчуванням з інтерфейсу; лампа надає власну. Шаблон `device is IDimmable dimmable` перевіряє, чи підтримує пристрій другий інтерфейс. Результат:

```
Лампа у вітальні: увімк., яскравість 40 %
Kettle: увімк.
Нічник: увімк., яскравість 40 %
```

### Сортування бігунів

Клас `Runner` реалізує `IComparable<Runner>` (природний порядок – за часом), а окремий клас `ByAgeThenName` реалізує `IComparer<Runner>` для сортування за віком і прізвищем.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Runner[] runners =
[
    new("Коваль Олена", 21, TimeSpan.Parse("00:42:15")),
    new("Бондар Петро", 34, TimeSpan.Parse("00:39:58")),
    new("Мельник Ірина", 21, TimeSpan.Parse("00:45:02")),
    new("Ткаченко Андрій", 28, TimeSpan.Parse("00:39:58")),
];

Array.Sort(runners);                        // IComparable<Runner>
Print("За часом:", runners);

Array.Sort(runners, new ByAgeThenName());   // IComparer<Runner>
Print("За віком, потім за ім’ям:", runners);

static void Print(string title, Runner[] list)
{
    Console.WriteLine(title);
    foreach (Runner r in list)
    {
        Console.WriteLine($"  {r.Name,-17}{r.Age,3}  {r.Time}");
    }
}

class Runner(string name, int age, TimeSpan time)
    : IComparable<Runner>
{
    public string Name { get; } = name;
    public int Age { get; } = age;
    public TimeSpan Time { get; } = time;

    // Природний порядок: менший час – вище; за рівного часу – ім’я.
    public int CompareTo(Runner? other)
    {
        if (other is null)
        {
            return 1;
        }
        int byTime = Time.CompareTo(other.Time);
        return byTime != 0
            ? byTime
            : string.Compare(Name, other.Name,
                StringComparison.CurrentCulture);
    }
}

// Інший порядок сортування – окремий клас-порівнювач.
class ByAgeThenName : IComparer<Runner>
{
    public int Compare(Runner? x, Runner? y)
    {
        if (x is null || y is null)
        {
            return x is null ? (y is null ? 0 : -1) : 1;
        }
        int byAge = x.Age.CompareTo(y.Age);
        return byAge != 0
            ? byAge
            : string.Compare(x.Name, y.Name,
                StringComparison.CurrentCulture);
    }
}
```

`Array.Sort(runners)` використовує `CompareTo` кожного бігуна, а `Array.Sort(runners, comparer)` – метод `Compare` порівнювача. За рівного часу або віку порядок визначає ім’я з урахуванням української культури. Результат:

```
За часом:
  Бондар Петро      34  00:39:58
  Ткаченко Андрій   28  00:39:58
  Коваль Олена      21  00:42:15
  Мельник Ірина     21  00:45:02
За віком, потім за ім’ям:
  Коваль Олена      21  00:42:15
  Мельник Ірина     21  00:45:02
  Ткаченко Андрій   28  00:39:58
  Бондар Петро      34  00:39:58
```

## Типові помилки

Таблиця 10.2. Типові помилки під час роботи з абстрактними класами та інтерфейсами {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| CS0144: неможливо створити екземпляр абстрактного класу | `new` для абстрактного класу або інтерфейсу; створювати об’єкт похідного класу |
| CS0534 / CS0535 | не реалізовано абстрактний член або член інтерфейсу; додати `override` або реалізацію |
| CS0737: реалізація не публічна | реалізація члена інтерфейсу без `public`; додати `public` або використати явну реалізацію |
| «товстий» інтерфейс із десятками методів | класи змушені реалізовувати непотрібне; розділити на кілька малих інтерфейсів |
| абстрактний клас без абстрактних членів і спільного коду | зайвий рівень ієрархії; використати інтерфейс або звичайний клас |
| `CompareTo` порушує контракт | результат несиметричний або залежить від `null`; повертати узгоджені значення, перевіряти `null` |
| ресурс не звільняється | об’єкт `IDisposable` без `using`; огорнути в `using` або викликати `Dispose` у `finally` |
| явно реалізований метод «не знайдено» | метод доступний лише через змінну інтерфейсу; привести об’єкт до інтерфейсу |
