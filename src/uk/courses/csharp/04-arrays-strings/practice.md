---
title: "Практика"
description: "Тема 4. Масиви та рядки: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Циклічний зсув масиву та другий максимум

Написати програму, яка зчитує цілі числа, введені через пробіл, і кількість позицій *k*, виконує циклічний зсув масиву праворуч на *k* позицій (від’ємне *k* – ліворуч) і знаходить другий за величиною елемент, відмінний від максимуму.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine("Введіть цілі числа через пробіл:");
string[] parts = (Console.ReadLine() ?? "").Split(' ',
    StringSplitOptions.RemoveEmptyEntries);

int[] numbers = new int[parts.Length];
for (int i = 0; i < parts.Length; i++)
{
    if (!int.TryParse(parts[i], out numbers[i]))
    {
        Console.WriteLine($"«{parts[i]}» – не ціле число.");
        return;
    }
}
if (numbers.Length < 2)
{
    Console.WriteLine("Потрібно щонайменше два числа.");
    return;
}

Console.Write("Зсув праворуч на k позицій: ");
if (!int.TryParse(Console.ReadLine(), out int k))
{
    Console.WriteLine("Потрібне ціле число.");
    return;
}

int n = numbers.Length;
int shift = ((k % n) + n) % n;        // від’ємний k – зсув ліворуч
int[] shifted = new int[n];
for (int i = 0; i < n; i++)
{
    shifted[(i + shift) % n] = numbers[i];
}

int first = int.MinValue;
int second = int.MinValue;
foreach (int x in numbers)
{
    if (x > first)
    {
        second = first;
        first = x;
    }
    else if (x > second && x < first)
    {
        second = x;
    }
}

Console.WriteLine($"Вихідний: [{string.Join(", ", numbers)}]");
Console.WriteLine($"Після зсуву: [{string.Join(", ", shifted)}]");
Console.WriteLine($"Максимум: {first}");
Console.WriteLine(second == int.MinValue
    ? "Другого максимуму немає: усі числа однакові."
    : $"Другий максимум: {second}");
```

Рядок розбивається методом `Split` з опцією `RemoveEmptyEntries`, тому зайві пробіли не заважають. Метод `int.TryParse` записує результат безпосередньо в елемент масиву `numbers[i]`. Нове місце елемента з індексом *i* обчислюється виразом `(i + shift) % n`, а вираз `((k % n) + n) % n` зводить будь-яке *k*, зокрема від’ємне або більше за довжину, до діапазону від 0 до *n* − 1. Другий максимум знаходиться за один прохід: коли з’являється новий максимум, попередній стає другим. Умова `x < first` пропускає повтори максимуму. Результати:

```
Введіть цілі числа через пробіл:
3 8 -2 8 5 1
Зсув праворуч на k позицій: 2
Вихідний: [3, 8, -2, 8, 5, 1]
Після зсуву: [5, 1, 3, 8, -2, 8]
Максимум: 8
Другий максимум: 5
```

```
Введіть цілі числа через пробіл:
4 4 4
Зсув праворуч на k позицій: -1
Вихідний: [4, 4, 4]
Після зсуву: [4, 4, 4]
Максимум: 4
Другого максимуму немає: усі числа однакові.
```

## Приклад 2. Трикутник Паскаля в зубчастому масиві

Написати програму, яка будує трикутник Паскаля із заданої кількості рядків (від 1 до 12) у зубчастому масиві та виводить його у вигляді рівнобедреного трикутника.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Кількість рядків (1–12): ");
if (!int.TryParse(Console.ReadLine(), out int rows)
    || rows is < 1 or > 12)
{
    Console.WriteLine("Потрібне ціле число від 1 до 12.");
    return;
}

// Зубчастий масив: рядок i має i + 1 елементів.
long[][] triangle = new long[rows][];
for (int i = 0; i < rows; i++)
{
    triangle[i] = new long[i + 1];
    triangle[i][0] = 1;
    triangle[i][^1] = 1;
    for (int j = 1; j < i; j++)
    {
        triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
    }
}

// Найбільше число – посередині останнього рядка; ширина поля парна.
int digits = triangle[^1][(rows - 1) / 2].ToString().Length;
int width = 2 * (digits / 2 + 1);
for (int i = 0; i < rows; i++)
{
    Console.Write(new string(' ', (rows - 1 - i) * width / 2));
    foreach (long value in triangle[i])
    {
        Console.Write(value.ToString().PadLeft(width));
    }
    Console.WriteLine();
}

long rowSum = 0;
foreach (long value in triangle[^1])
{
    rowSum += value;
}
Console.WriteLine($"Сума останнього рядка: {rowSum} = 2^{rows - 1}");
```

Рядок з номером *i* має *i* + 1 елементів, тому масив зручно зберігати як зубчастий: кожен рядок створюється окремо `new long[i + 1]`. Крайні елементи дорівнюють 1 (`triangle[i][^1]` – останній елемент рядка), а кожен внутрішній – сумі двох елементів над ним. Ширина поля визначається кількістю цифр найбільшого числа – середнього елемента останнього рядка, а відступ перед рядком зменшується на пів поля з кожним рядком. Метод `PadLeft` доповнює число пробілами зліва. Сума елементів рядка *n* дорівнює 2<sup>*n*</sup>. Результат для 6 рядків:

```
Кількість рядків (1–12): 6
              1
           1   1
         1   2   1
       1   3   3   1
     1   4   6   4   1
   1   5  10  10   5   1
Сума останнього рядка: 32 = 2^5
```

## Приклад 3. Нормалізація номера телефону

Написати програму, яка зчитує номери телефонів у довільному форматі до порожнього рядка, залишає в кожному лише цифри, зводить український номер до формату `+380 XX XXX XX XX` і виводить його також у прихованому вигляді.

```cs
using System.Text;

Console.OutputEncoding = Encoding.UTF8;

Console.WriteLine("Номер телефону (порожній рядок – кінець):");
string? input = Console.ReadLine();

while (!string.IsNullOrWhiteSpace(input))
{
    // Залишити лише цифри.
    var digits = new StringBuilder();
    foreach (char c in input)
    {
        if (char.IsDigit(c))
        {
            digits.Append(c);
        }
    }
    string d = digits.ToString();

    // Звести до 12 цифр 380XXXXXXXXX.
    d = d.Length switch
    {
        10 when d.StartsWith('0') => "38" + d,
        11 when d.StartsWith("80") => "3" + d,
        _ => d,
    };

    if (d.Length == 12 && d.StartsWith("380"))
    {
        string code = d.Substring(3, 2);
        string formatted =
            $"+380 {code} {d[5..8]} {d[8..10]} {d[10..]}";
        string masked = $"+380 {code} *** ** {d[10..]}";
        Console.WriteLine($"  {formatted}   (приховано: {masked})");
    }
    else
    {
        Console.WriteLine($"  «{input.Trim()}» – некоректний номер");
    }
    input = Console.ReadLine();
}
```

Цифри номера збираються в `StringBuilder`, бо рядок будується по одному символу в циклі. Вираз `switch` за довжиною рядка з умовами `when` доповнює номери, записані без коду країни (`067…`) або з кодом `8` (`8067…`). Частини номера вирізаються діапазонами (`d[5..8]`) і методом `Substring(3, 2)`, які дають однаковий результат. Результат:

```
Номер телефону (порожній рядок – кінець):
067 123-45-67
  +380 67 123 45 67   (приховано: +380 67 *** ** 67)
+38 (050) 987 65 43
  +380 50 987 65 43   (приховано: +380 50 *** ** 43)
8-093-111-22-33
  +380 93 111 22 33   (приховано: +380 93 *** ** 33)
12345
  «12345» – некоректний номер
```
