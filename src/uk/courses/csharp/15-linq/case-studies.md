---
title: "Приклади та типові помилки"
description: "Тема 15. LINQ: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

### Студенти та оцінки

Запит відбирає студентів із середнім балом не нижче 4, сортує їх і створює анонімні об’єкти. Запит записано в обох синтаксисах.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

List<Student> students =
[
    new("Коваль Олена", "ПІ-21", 4.7),
    new("Бондар Петро", "ПІ-22", 3.6),
    new("Мельник Ірина", "ПІ-21", 4.2),
    new("Ткач Андрій", "ПІ-22", 4.9),
    new("Шевчук Марія", "ПІ-21", 3.9),
];

// Синтаксис методів.
var byMethods = students
    .Where(s => s.Average >= 4.0)
    .OrderByDescending(s => s.Average)
    .Select(s => new { s.Name, Grade = Math.Round(s.Average) });

// Синтаксис запитів – той самий запит.
var byQuery =
    from s in students
    where s.Average >= 4.0
    orderby s.Average descending
    select new { s.Name, Grade = Math.Round(s.Average) };

Console.WriteLine("Відмінники й хорошисти:");
foreach (var item in byMethods)
{
    Console.WriteLine($"  {item.Name,-14} {item.Grade}");
}
bool same = byMethods.SequenceEqual(byQuery);
Console.WriteLine($"Результати однакові: {same}");

// Проєкція з індексом і фільтрація за групою.
var group21 = students
    .Where(s => s.Group == "ПІ-21")
    .Select((s, i) => $"{i + 1}. {s.Name}");
Console.WriteLine(string.Join("; ", group21));

record Student(string Name, string Group, double Average);
```

`SequenceEqual` порівнює результати поелементно; анонімні типи з однаковим набором властивостей в одній збірці є одним типом, тому їхні об’єкти порівнюються за значеннями. `Math.Round` округлює 4,7 і 4,9 до 5. Номер у `Select((s, i) => …)` відповідає позиції після фільтрації. Результат:

```
Відмінники й хорошисти:
  Ткач Андрій    5
  Коваль Олена   5
  Мельник Ірина  4
Результати однакові: True
1. Коваль Олена; 2. Мельник Ірина; 3. Шевчук Марія
```

### Продажі магазину

Програма групує продажі за категоріями, обчислює кількість позицій, виручку та найприбутковіший товар кожної категорії, а також загальні підсумки.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Sale[] sales =
[
    new("Кобзар", "Книги", 3, 350m),
    new("Шахи", "Ігри", 2, 890m),
    new("Навушники", "Техніка", 1, 2_499m),
    new("Тигролови", "Книги", 5, 280m),
    new("Монополія", "Ігри", 1, 1_150m),
    new("Миша", "Техніка", 4, 449m),
    new("Маруся", "Книги", 2, 310m),
    new("Павербанк", "Техніка", 2, 1_199m),
];

// Класичний спосіб: GroupBy і агрегування в кожній групі.
var report = sales
    .GroupBy(s => s.Category)
    .Select(g => new
    {
        Category = g.Key,
        Count = g.Count(),
        Revenue = g.Sum(s => s.Quantity * s.Price),
        Best = g.MaxBy(s => s.Quantity * s.Price)!.Product,
    })
    .OrderByDescending(r => r.Revenue);

Console.WriteLine("Категорія  Позицій   Виручка  Лідер");
foreach (var r in report)
{
    Console.WriteLine(
        $"{r.Category,-10} {r.Count,7} {r.Revenue,9:N0}  {r.Best}");
}

decimal total = sales.Sum(s => s.Quantity * s.Price);
Console.WriteLine($"Разом: {total:N0} грн, середній чек " +
    $"{sales.Average(s => s.Quantity * s.Price):N0} грн");

// .NET 9+: CountBy та AggregateBy без проміжних груп.
foreach (var (category, units) in sales.AggregateBy(
    s => s.Category, 0, (sum, s) => sum + s.Quantity))
{
    Console.Write($"{category}: {units} шт.  ");
}
Console.WriteLine();

record Sale(
    string Product, string Category, int Quantity, decimal Price);
```

Для кожної групи `g` виконуються агрегатні оператори `Count`, `Sum` і `MaxBy`; `MaxBy` повертає продаж, тому з нього береться назва товару. Сортування застосовано до вже згрупованих результатів. `AggregateBy` підсумовує кількість одиниць за категоріями без створення груп; порядок ключів відповідає порядку їх першої появи. Результат:

```
Категорія  Позицій   Виручка  Лідер
Техніка          3     6 693  Навушники
Книги            3     3 070  Тигролови
Ігри             2     2 930  Шахи
Разом: 12 693 грн, середній чек 1 587 грн
Книги: 10 шт.  Ігри: 3 шт.  Техніка: 7 шт.
```

### Відкладене виконання

Лямбда умови виводить кожне перевірене значення, тому видно, коли саме виконується запит.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

List<int> temperatures = [18, 25, 31, 22];

// Запит лише описано: жодна умова ще не перевірялася.
IEnumerable<int> hot = temperatures.Where(t =>
{
    Console.Write($"[{t}?] ");
    return t > 24;
});
Console.WriteLine("Запит створено");

temperatures.Add(28);                 // зміна джерела ПІСЛЯ створення

Console.WriteLine($"\nСпекотні: {string.Join(", ", hot)}");
Console.WriteLine($"\nКількість: {hot.Count()}");   // ще один прохід

// ToList виконує запит негайно й фіксує результат.
List<int> snapshot = hot.ToList();
temperatures.Add(35);
Console.WriteLine($"\nЗнімок: {string.Join(", ", snapshot)}");
Console.WriteLine($"\nЗапит зараз: {string.Join(", ", hot)}");
```

Після створення запиту не перевірено жодного значення. Значення 28, додане пізніше, потрапляє в результат. `string.Join`, `Count()` і `ToList()` виконують запит тричі. Знімок, отриманий `ToList()`, не змінюється після додавання 35, а запит під час наступного перебору його бачить. Результат:

```
Запит створено
[18?] [25?] [31?] [22?] [28?]
Спекотні: 25, 31, 28
[18?] [25?] [31?] [22?] [28?]
Кількість: 3
[18?] [25?] [31?] [22?] [28?]
Знімок: 25, 31, 28
[18?] [25?] [31?] [22?] [28?] [35?]
Запит зараз: 25, 31, 28, 35
```

### Бібліотека

Програма з’єднує читачів і видачі книг трьома способами: внутрішнім з’єднанням, групуванням з’єднання та лівим з’єднанням .NET 10.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Reader[] readers =
[
    new(1, "Олена"), new(2, "Петро"),
    new(3, "Ірина"), new(4, "Андрій"),
];
Loan[] loans =
[
    new(1, "Кобзар", new(2026, 9, 20)),
    new(3, "Тигролови", new(2026, 9, 10)),
    new(1, "Маруся", new(2026, 9, 5)),
    new(5, "Лісова пісня", new(2026, 9, 30)),     // читача 5 немає
];
DateOnly today = new(2026, 9, 16);

Console.WriteLine("Join – лише пари, що збігаються:");
var pairs = readers.Join(loans,
    r => r.Id, l => l.ReaderId,
    (r, l) => $"{r.Name} – «{l.Title}»");
Console.WriteLine($"  {string.Join("; ", pairs)}");

Console.WriteLine("GroupJoin – кожен читач зі своїми книгами:");
var byReader = readers.GroupJoin(loans,
    r => r.Id, l => l.ReaderId,
    (r, books) => new
    {
        r.Name,
        Count = books.Count(),
        Overdue = books.Count(b => b.Due < today),
    });
foreach (var x in byReader)
{
    Console.WriteLine(
        $"  {x.Name,-7} книг: {x.Count}, прострочено: {x.Overdue}");
}

Console.WriteLine("LeftJoin (.NET 10) – читачі без книг теж:");
var left = readers.LeftJoin(loans,
    r => r.Id, l => l.ReaderId,
    (r, l) => $"{r.Name}: {l?.Title ?? "–"}");
Console.WriteLine($"  {string.Join(", ", left)}");

record Reader(int Id, string Name);
record Loan(int ReaderId, string Title, DateOnly Due);
```

Видача читачу з `Id` 5 не має пари й не потрапляє ні в один результат. `Join` пропускає Петра й Андрія, бо в них немає видач; `GroupJoin` повертає для них порожні групи з кількістю 0. `LeftJoin` передає `null` замість видачі, тому в селекторі використано `l?.Title ?? "–"`. Результат:

```
Join – лише пари, що збігаються:
  Олена – «Кобзар»; Олена – «Маруся»; Ірина – «Тигролови»
GroupJoin – кожен читач зі своїми книгами:
  Олена   книг: 2, прострочено: 1
  Петро   книг: 0, прострочено: 0
  Ірина   книг: 1, прострочено: 1
  Андрій  книг: 0, прострочено: 0
LeftJoin (.NET 10) – читачі без книг теж:
  Олена: Кобзар, Олена: Маруся, Петро: –, Ірина: Тигролови, Андрій: –
```

## Типові помилки

Таблиця 15.2. Типові помилки під час роботи з LINQ {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| «Sequence contains no elements» | `First`, `Single`, `Min` для порожньої послідовності; використовувати `FirstOrDefault` або перевірку `Any()` |
| «…more than one matching element» | `Single` знайшов кілька елементів; перевірити дані або використати `First` |
| запит виконується кілька разів | кожен перебір відкладеного запиту виконує його заново; зберегти результат `ToList()` |
| неочікуваний результат після зміни джерела | відкладене виконання бачить поточні дані; зафіксувати результат `ToList()` |
| `Count() > 0` для перевірки наявності | `Count()` може перебрати всю послідовність; використовувати `Any()` |
| побічні ефекти в лямбдах `Where`, `Select` | лямбди виконуються невідомо скільки разів; змінювати дані в звичайному циклі |
| `OrderBy(…).OrderBy(…)` | друге сортування скасовує перше; для додаткового ключа використовувати `ThenBy` |
| анонімний тип не вдається повернути з методу | анонімний тип не має назви; оголосити запис |
