---
title: "Практика"
description: "Тема 15. LINQ: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Аналіз слів тексту

Знайти найчастіші слова тексту довжиною понад три літери, розподіл слів за довжиною та найдовше слово. Порівняти групування `GroupBy` з оператором `CountBy`.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

string text = """
    Мова програмування C# дає змогу писати програми для різних
    платформ. Програми мовою C# компілюються в проміжну мову, а
    середовище .NET виконує програми на різних платформах. Мова
    підтримує об’єктно-орієнтоване та функціональне програмування.
    """;

string[] words = text
    .Split([' ', '.', ',', '\r', '\n'],
        StringSplitOptions.RemoveEmptyEntries)
    .Where(w => w.Length > 3)
    .Select(w => w.ToLower())
    .ToArray();

// Класичний спосіб: групування за словом.
var top = words
    .GroupBy(w => w)
    .Select(g => new { Word = g.Key, Count = g.Count() })
    .OrderByDescending(x => x.Count)
    .ThenBy(x => x.Word)
    .Take(5);
Console.WriteLine("Топ-5 (GroupBy):");
foreach (var x in top)
{
    Console.WriteLine($"  {x.Word,-16} {x.Count}");
}

// .NET 9+: CountBy – те саме коротше.
var top3 = words.CountBy(w => w)
    .OrderByDescending(p => p.Value)
    .ThenBy(p => p.Key)
    .Take(3)
    .Select(p => $"{p.Key}×{p.Value}");
Console.WriteLine($"Топ-3 (CountBy): {string.Join(", ", top3)}");

// Розподіл довжин слів.
var lengths = words
    .GroupBy(w => w.Length)
    .OrderBy(g => g.Key)
    .Select(g => $"{g.Key}:{g.Count()}");
Console.WriteLine($"Довжина:кількість  {string.Join(" ", lengths)}");
Console.WriteLine($"Слів > 3 літер: {words.Length}, " +
    $"різних: {words.Distinct().Count()}, " +
    $"найдовше: {words.MaxBy(w => w.Length)}");
```

Текст розбивається на слова, короткі слова відкидаються, решта переводиться в нижній регістр. `ToArray()` виконує цей запит один раз, бо результат використовується кількома наступними запитами. `ThenBy` упорядковує слова з однаковою частотою за абеткою. Результат:

```
Топ-5 (GroupBy):
  програми         3
  мова             2
  програмування    2
  різних           2
  виконує          1
Топ-3 (CountBy): програми×3, мова×2, програмування×2
Довжина:кількість  4:3 5:2 6:3 7:1 8:5 9:1 10:2 12:1 13:3 20:1
Слів > 3 літер: 22, різних: 17, найдовше: об’єктно-орієнтоване
```

## Приклад 2. Посторінковий вивід

Згенерувати каталог із 23 товарів, вивести задані сторінки по 5 товарів та інформацію про всі сторінки.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// 23 товари, згенеровані LINQ.
List<string> catalog = Enumerable.Range(1, 23)
    .Select(i => $"Товар {i:D2}")
    .ToList();
const int PageSize = 5;
int pageCount = (int)Math.Ceiling(catalog.Count / (double)PageSize);

Console.WriteLine($"Товарів: {catalog.Count}, сторінок: {pageCount}");
foreach (int page in new[] { 1, 5, 6 })
{
    string items = string.Join(", ", GetPage(page));
    Console.WriteLine($"Сторінка {page}: {items}");
}

// Chunk розбиває послідовність на масиви однакового розміру.
foreach (var (index, chunk) in catalog.Chunk(PageSize).Index())
{
    Console.WriteLine(
        $"  [{index + 1}] {chunk[0]} … {chunk[^1]} ({chunk.Length})");
}

IEnumerable<string> GetPage(int page)
{
    if (page < 1 || page > pageCount)
    {
        return [$"немає сторінки {page}"];
    }
    return catalog.Skip((page - 1) * PageSize).Take(PageSize);
}
```

Каталог створюється `Enumerable.Range` і `Select`. Сторінку з номером *p* повертає `Skip((p − 1) · 5).Take(5)`. Для неіснуючої сторінки локальна функція повертає послідовність з одним повідомленням. `Chunk` розбиває весь каталог на масиви, а `Index()` нумерує їх у `foreach`. Результат:

```
Товарів: 23, сторінок: 5
Сторінка 1: Товар 01, Товар 02, Товар 03, Товар 04, Товар 05
Сторінка 5: Товар 21, Товар 22, Товар 23
Сторінка 6: немає сторінки 6
  [1] Товар 01 … Товар 05 (5)
  [2] Товар 06 … Товар 10 (5)
  [3] Товар 11 … Товар 15 (5)
  [4] Товар 16 … Товар 20 (5)
  [5] Товар 21 … Товар 23 (3)
```

## Приклад 3. Власні оператори LINQ

Створити відкладений оператор `WhereNot`, що відкидає елементи за умовою, та негайний оператор `Median`. Використати їх для аналізу часу виконання запитів з аномальним значенням.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

double[] times = [12.4, 9.8, 15.1, 11.0, 10.6, 30.2, 11.9];

// Власні оператори викликаються в ланцюжку, як стандартні.
var usual = times
    .WhereNot(t => t > 20)          // відкинути аномалії
    .OrderBy(t => t);
Console.WriteLine($"Без аномалій: {string.Join("; ", usual)}");
Console.WriteLine($"Медіана всіх: {times.Median():F2}");
Console.WriteLine($"Медіана без аномалій: {usual.Median():F2}");
Console.WriteLine($"Середнє всіх: {times.Average():F2}");

try
{
    Array.Empty<double>().Median();
}
catch (InvalidOperationException e)
{
    Console.WriteLine($"Помилка: {e.Message}");
}

static class LinqExtensions
{
    // Відкладений оператор: ітератор з yield return.
    public static IEnumerable<T> WhereNot<T>(
        this IEnumerable<T> source, Func<T, bool> predicate)
    {
        foreach (T item in source)
        {
            if (!predicate(item))
            {
                yield return item;
            }
        }
    }

    // Негайний оператор: одразу обчислює значення.
    public static double Median(this IEnumerable<double> source)
    {
        double[] sorted = source.Order().ToArray();
        if (sorted.Length == 0)
        {
            throw new InvalidOperationException("немає елементів");
        }
        int middle = sorted.Length / 2;
        return sorted.Length % 2 == 1
            ? sorted[middle]
            : (sorted[middle - 1] + sorted[middle]) / 2;
    }
}
```

`WhereNot` реалізовано ітератором, тому він виконується відкладено й поєднується з `OrderBy` у конвеєр. `Median` одразу сортує послідовність і обчислює значення. Для парної кількості елементів медіана – середнє двох центральних значень. Аномалія 30,2 суттєво збільшує середнє, але майже не змінює медіану. Результат:

```
Без аномалій: 9,8; 10,6; 11; 11,9; 12,4; 15,1
Медіана всіх: 11,90
Медіана без аномалій: 11,45
Середнє всіх: 14,43
Помилка: немає елементів
```
