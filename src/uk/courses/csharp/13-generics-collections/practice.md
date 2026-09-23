---
title: "Практика"
description: "Тема 13. Узагальнення та колекції: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Узагальнений діапазон

Створити узагальнений клас `Range<T>` з перевіркою належності значення й перетином діапазонів. Використати його для цілих чисел, дат і грошових сум.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Range<int> working = new(9, 18);
Range<int> meeting = new(16, 20);
Console.WriteLine($"{working} містить 12: {working.Contains(12)}");
Console.WriteLine($"Перетин {meeting}: {working.Intersect(meeting)}");
Range<int>? none = working.Intersect(new(19, 22));
Console.WriteLine($"Перетин [19; 22]: {none?.ToString() ?? "немає"}");

Range<DateOnly> trip = new(new(2026, 7, 1), new(2026, 7, 21));
DateOnly check = new(2026, 7, 15);
Console.WriteLine($"{trip} містить {check}: {trip.Contains(check)}");

Range<decimal> budget = new(500m, 1500m);
foreach (decimal p in new[] { 499.99m, 1200m, 1500m })
{
    Console.WriteLine($"{budget} містить {p}: {budget.Contains(p)}");
}

try
{
    Range<double> wrong = new(5.5, 1.0);
}
catch (ArgumentException e)
{
    Console.WriteLine($"Помилка: {e.Message}");
}

class Range<T> where T : IComparable<T>
{
    public Range(T start, T end)
    {
        if (start.CompareTo(end) > 0)
        {
            throw new ArgumentException(
                $"початок {start} після кінця {end}");
        }
        Start = start;
        End = end;
    }

    public T Start { get; }
    public T End { get; }

    public bool Contains(T value) =>
        value.CompareTo(Start) >= 0 && value.CompareTo(End) <= 0;

    // Перетин або null, якщо діапазони не перетинаються.
    public Range<T>? Intersect(Range<T> other)
    {
        T start = Max(Start, other.Start);
        T end = Min(End, other.End);
        return start.CompareTo(end) <= 0
            ? new Range<T>(start, end)
            : null;
    }

    public override string ToString() => $"[{Start}; {End}]";

    private static T Max(T a, T b) => a.CompareTo(b) >= 0 ? a : b;
    private static T Min(T a, T b) => a.CompareTo(b) <= 0 ? a : b;
}
```

Обмеження `where T : IComparable<T>` дозволяє порівнювати межі методом `CompareTo`, тому клас працює з `int`, `DateOnly`, `decimal` і будь-яким іншим порівнюваним типом. Метод `Intersect` повертає `Range<T>?`: `null` означає, що діапазони не перетинаються. Конструктор відхиляє діапазон, у якому початок більший за кінець. Змінна `wrong` не використовується, бо конструктор генерує виняток. Результат:

```
[9; 18] містить 12: True
Перетин [16; 20]: [16; 18]
Перетин [19; 22]: немає
[01.07.2026; 21.07.2026] містить 15.07.2026: True
[500; 1500] містить 499,99: False
[500; 1500] містить 1200: True
[500; 1500] містить 1500: True
Помилка: початок 5,5 після кінця 1
```

## Приклад 2. Перевірка дужок

Перевірити правильність розстановки круглих, квадратних і фігурних дужок у виразах. Для помилки вказати позицію.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

string[] expressions =
[
    "(a + b) * [c - {d / e}]",
    "arr[i] = (x + y]",
    "f(g(x)",
    "{ return a); }",
    "без дужок",
];

foreach (string expression in expressions)
{
    string? error = CheckBrackets(expression);
    Console.WriteLine($"{expression,-24} {error ?? "OK"}");
}

// Повертає опис першої помилки або null.
static string? CheckBrackets(string text)
{
    Stack<(char Bracket, int Position)> open = new();
    for (int i = 0; i < text.Length; i++)
    {
        char c = text[i];
        if (c is '(' or '[' or '{')
        {
            open.Push((c, i));
        }
        else if (c is ')' or ']' or '}')
        {
            if (open.Count == 0)
            {
                return $"зайва «{c}» у позиції {i}";
            }
            var (bracket, position) = open.Pop();
            if (Pair(bracket) != c)
            {
                return $"«{bracket}»({position}) закрито «{c}»({i})";
            }
        }
    }
    return open.TryPeek(out var last)
        ? $"не закрито «{last.Bracket}» ({last.Position})"
        : null;
}

static char Pair(char bracket) => bracket switch
{
    '(' => ')',
    '[' => ']',
    _ => '}',
};
```

Відкривна дужка разом з позицією кладеться в стек `Stack<(char, int)>`. Закривна дужка має відповідати дужці на вершині стеку: інакше вираз неправильний. Якщо стек порожній під час закривання – дужка зайва; якщо після перебору в стеку щось лишилося – дужку не закрито. Позиції нумеруються від 0. Результат:

```
(a + b) * [c - {d / e}]  OK
arr[i] = (x + y]         «(»(9) закрито «]»(15)
f(g(x)                   не закрито «(» (1)
{ return a); }           «{»(0) закрито «)»(10)
без дужок                OK
```

## Приклад 3. Швидкість пошуку в `List<T>` і `HashSet<T>`

Порівняти час 2 000 перевірок наявності числа серед 1 000 000 елементів у списку й у множині.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Size = 1_000_000;
const int Lookups = 2_000;

List<int> list = new(Size);
for (int i = 0; i < Size; i++)
{
    list.Add(i * 2);                       // лише парні числа
}
HashSet<int> set = [.. list];

Random random = new(42);
int[] queries = new int[Lookups];
for (int i = 0; i < Lookups; i++)
{
    queries[i] = random.Next(2 * Size);    // половина – непарні
}

Stopwatch watch = Stopwatch.StartNew();
int foundInList = 0;
foreach (int q in queries)
{
    if (list.Contains(q)) foundInList++;
}
double listMs = watch.Elapsed.TotalMilliseconds;

watch.Restart();
int foundInSet = 0;
foreach (int q in queries)
{
    if (set.Contains(q)) foundInSet++;
}
double setMs = watch.Elapsed.TotalMilliseconds;

Console.WriteLine($"Пошуків: {Lookups:N0} серед {Size:N0} елементів");
Console.WriteLine($"List<int>:    {foundInList}, {listMs,8:F2} мс");
Console.WriteLine($"HashSet<int>: {foundInSet}, {setMs,8:F2} мс");
Console.WriteLine($"HashSet швидший у {listMs / setMs:F0} разів");
```

`List<int>.Contains` послідовно порівнює елементи, тому один пошук відсутнього числа переглядає весь мільйон. `HashSet<int>.Contains` обчислює хеш і перевіряє один кошик. Запити генеруються з фіксованим зерном, тому кількість знайдених чисел однакова в обох колекціях. Час залежить від комп’ютера; для вимірювання програму запускають у конфігурації Release (`dotnet run -c Release`). Результат одного запуску:

```
Пошуків: 2 000 серед 1 000 000 елементів
List<int>:    990,   178,28 мс
HashSet<int>: 990,     0,05 мс
HashSet швидший у 3793 разів
```
