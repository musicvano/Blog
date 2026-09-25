---
title: "Практика"
description: "Тема 6. Налагодження та винятки: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Налагодження пошуку максимуму

Програма шукає найвищу температуру тижня, але виводить 21 °C, хоча в масиві є значення 25. Знайти й виправити помилку за допомогою налагоджувача.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

int[] temps = [12, 15, 9, 21, 18, 14, 25];

int max = FindMax(temps, out int day);
Console.WriteLine($"Максимум {max} °C у день {day + 1}");

// ПОМИЛКА: цикл не доходить до останнього елемента.
static int FindMax(int[] values, out int index)
{
    index = 0;
    for (int i = 1; i < values.Length - 1; i++)
    {
        if (values[i] > values[index])
        {
            index = i;
        }
    }
    return values[index];
}
```

Результат роботи програми з помилкою:

```
Максимум 21 °C у день 4
```

Порядок налагодження:

1. Встановити точку зупинки на рядку `if (values[i] > values[index])` і запустити програму (**F5**).
2. Натискаючи **F5**, спостерігати у вікні *Locals* значення `i` та `index`. Щоб не зупинятися на кожній ітерації, задати умову точки зупинки `i >= values.Length - 2` (*Conditions…*).
3. Після зупинки при `i = 5` натиснути **F10** кілька разів: цикл завершується, і рядок з умовою для `i = 6` не виконується ніколи.
4. Додати у вікно *Watch* вираз `values.Length - 1`: він дорівнює 6, а умова циклу `i < 6` відкидає останній індекс.

Помилка в межі циклу: має бути `i < values.Length`. Після виправлення програма виводить `Максимум 25 °C у день 7`. Такі помилки «на одиницю» (*off-by-one*) найчастіше трапляються на межах циклів, тому перевіряйте першу й останню ітерації.

## Приклад 2. Калькулятор дробів

Написати програму, яка додає звичайні дроби, введені у форматі `a/b`, до порожнього рядка, скорочує суму й обробляє некоректне введення, нульовий знаменник і переповнення, не завершуючи роботу.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

long numerator = 0, denominator = 1;
Console.WriteLine("Вводьте дроби a/b (порожній рядок – кінець):");

while (true)
{
    string? line = Console.ReadLine();
    if (string.IsNullOrWhiteSpace(line))
    {
        break;
    }
    try
    {
        (long a, long b) = ParseFraction(line);
        numerator = checked(numerator * b + a * denominator);
        denominator = checked(denominator * b);
        long gcd = Gcd(Math.Abs(numerator), denominator);
        numerator /= gcd;
        denominator /= gcd;
        Console.WriteLine($"  сума = {numerator}/{denominator}");
    }
    catch (FormatException ex)
    {
        Console.WriteLine($"  {ex.Message} Спробуйте ще раз.");
    }
    catch (DivideByZeroException)
    {
        Console.WriteLine("  Знаменник не може бути нулем.");
    }
    catch (OverflowException)
    {
        Console.WriteLine("  Сума завелика; дріб пропущено.");
    }
}

Console.WriteLine($"Результат: {numerator}/{denominator}"
    + $" ≈ {(double)numerator / denominator:F4}");

// Розбирає «a/b»; знак переносить у чисельник.
static (long, long) ParseFraction(string text)
{
    string[] parts = text.Split('/');
    if (parts.Length != 2
        || !long.TryParse(parts[0], out long a)
        || !long.TryParse(parts[1], out long b))
    {
        throw new FormatException($"«{text}» не є дробом a/b.");
    }

    if (b == 0)
    {
        throw new DivideByZeroException();
    }
    return b < 0 ? (-a, -b) : (a, b);
}

static long Gcd(long a, long b) =>
    b == 0 ? Math.Max(a, 1) : Gcd(b, a % b);
```

Метод `ParseFraction` генерує `FormatException` з повідомленням, у якому є введений рядок, і `DivideByZeroException` для нульового знаменника. Цикл перехоплює винятки окремо для кожного дробу, тому помилка в одному рядку не зупиняє підрахунок. Обчислення виконуються в контексті `checked`: переповнення `long` не дає неправильну суму, а спричиняє `OverflowException`, після якого дріб пропускається. Сума скорочується на НСД чисельника й знаменника. Результат:

```
Вводьте дроби a/b (порожній рядок – кінець):
1/2
  сума = 1/2
1/3
  сума = 5/6
2/0
  Знаменник не може бути нулем.
одна четверта
  «одна четверта» не є дробом a/b. Спробуйте ще раз.
-1/6
  сума = 2/3
9223372036854775807/2
  Сума завелика; дріб пропущено.

Результат: 2/3 ≈ 0,6667
```

## Приклад 3. Стійке консольне меню

Написати програму з командами `add N` (додати число до списку), `avg` (середнє), `get I` (елемент за індексом), `div A B` (цілочисельне ділення) і `q` (вихід), яка ніколи не завершується аварійно: помилка будь-якої команди виводиться в потік помилок, а наприкінці програма повідомляє кількість невдалих команд і задає код завершення.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

int[] numbers = [];
int failures = 0;

Console.WriteLine("Команди: add N, avg, get I, div A B, q");
while (true)
{
    Console.Write("> ");
    string[] cmd = (Console.ReadLine() ?? "q").Split(' ',
        StringSplitOptions.RemoveEmptyEntries);
    if (cmd.Length == 0)
    {
        continue;
    }
    if (cmd[0] == "q")
    {
        break;
    }

    try
    {
        Execute(cmd, ref numbers);
    }
    catch (Exception ex) when (ex is FormatException
        or IndexOutOfRangeException or DivideByZeroException
        or InvalidOperationException)
    {
        failures++;
        Console.Error.WriteLine($"  Помилка: {ex.Message}");
    }
}

Console.WriteLine($"Невдалих команд: {failures}");
Environment.ExitCode = failures > 0 ? 1 : 0;

static void Execute(string[] cmd, ref int[] numbers)
{
    switch (cmd[0])
    {
        case "add":
            int value = int.Parse(cmd[1]);  // спочатку розбір
            Array.Resize(ref numbers, numbers.Length + 1);
            numbers[^1] = value;
            Console.WriteLine($"  Елементів: {numbers.Length}");
            break;
        case "avg":
            if (numbers.Length == 0)
            {
                throw new InvalidOperationException(
                    "Список порожній.");
            }
            double sum = 0;
            foreach (int n in numbers)
            {
                sum += n;
            }
            double avg = sum / numbers.Length;
            Console.WriteLine($"  Середнє: {avg:F2}");
            break;
        case "get":
            int index = int.Parse(cmd[1]);
            Console.WriteLine($"  [{index}] = {numbers[index]}");
            break;
        case "div":
            int a = int.Parse(cmd[1]), b = int.Parse(cmd[2]);
            Console.WriteLine($"  {a / b}");
            break;
        default:
            throw new FormatException(
                $"Невідома команда «{cmd[0]}».");
    }
}
```

Команди виконує метод `Execute`, а головний цикл перехоплює лише ті винятки, які можуть виникнути через некоректну команду (фільтр `when` з переліком типів). Інші винятки (вади програми) не перехоплюються, щоб їх можна було помітити й виправити. У команді `add` число розбирається **до** збільшення масиву: якщо розбір невдалий, масив не змінюється. Невідома команда також повідомляється винятком `FormatException`. Результат:

```
Команди: add N, avg, get I, div A B, q
> avg
  Помилка: Список порожній.
> add 10
  Елементів: 1
> add x
  Помилка: The input string 'x' was not in a correct format.
> add
  Помилка: Index was outside the bounds of the array.
> get 5
  Помилка: Index was outside the bounds of the array.
> add 25
  Елементів: 2
> avg
  Середнє: 17,50
> div 7 0
  Помилка: Attempted to divide by zero.
> help
  Помилка: Невідома команда «help».
> q
Невдалих команд: 6
```

Код завершення програми дорівнює 1, бо були невдалі команди.
