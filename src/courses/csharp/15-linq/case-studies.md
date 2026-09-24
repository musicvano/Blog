---
title: "Examples and common mistakes"
description: "Topic 15. LINQ: Examples and common mistakes"
outline: [2, 3]
sourceHash: "d5fe47e6fe078109fdf1beaeefe5476840b29b3457d63d83ad43e8da7a40c9ff"
---

# Examples and common mistakes

## Example programs

### Students and grades

The query selects students with an average grade of at least 4, sorts them, and creates anonymous objects. The query is written in both syntaxes.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

List<Student> students =
[
    new("Koval Olena", "SE-21", 4.7),
    new("Bondar Petro", "SE-22", 3.6),
    new("Melnyk Iryna", "SE-21", 4.2),
    new("Tkach Andrii", "SE-22", 4.9),
    new("Shevchuk Mariia", "SE-21", 3.9),
];

// Method syntax.
var byMethods = students
    .Where(s => s.Average >= 4.0)
    .OrderByDescending(s => s.Average)
    .Select(s => new { s.Name, Grade = Math.Round(s.Average) });

// Query syntax – the same query.
var byQuery =
    from s in students
    where s.Average >= 4.0
    orderby s.Average descending
    select new { s.Name, Grade = Math.Round(s.Average) };

Console.WriteLine("Top students:");
foreach (var item in byMethods)
{
    Console.WriteLine($"  {item.Name,-14} {item.Grade}");
}
bool same = byMethods.SequenceEqual(byQuery);
Console.WriteLine($"Results are the same: {same}");

// Projection with an index and filtering by group.
var group21 = students
    .Where(s => s.Group == "SE-21")
    .Select((s, i) => $"{i + 1}. {s.Name}");
Console.WriteLine(string.Join("; ", group21));

record Student(string Name, string Group, double Average);
```

`SequenceEqual` compares the results element by element; anonymous types with the same set of properties in the same assembly are one type, so their objects are compared by value. `Math.Round` rounds 4.7 and 4.9 to 5. The index in `Select((s, i) => …)` corresponds to the position after filtering. Output:

```
Top students:
  Tkach Andrii   5
  Koval Olena    5
  Melnyk Iryna   4
Results are the same: True
1. Koval Olena; 2. Melnyk Iryna; 3. Shevchuk Mariia
```

### Store sales

The program groups sales by category and calculates the number of items, the revenue, and the most profitable product in each category, as well as the overall totals.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Sale[] sales =
[
    new("Kobzar", "Books", 3, 350m),
    new("Chess", "Games", 2, 890m),
    new("Headphones", "Tech", 1, 2_499m),
    new("Tiger Trappers", "Books", 5, 280m),
    new("Monopoly", "Games", 1, 1_150m),
    new("Mouse", "Tech", 4, 449m),
    new("Marusia", "Books", 2, 310m),
    new("Power bank", "Tech", 2, 1_199m),
];

// The classic approach: GroupBy and aggregation in each group.
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

Console.WriteLine("Category     Items   Revenue  Top");
foreach (var r in report)
{
    Console.WriteLine(
        $"{r.Category,-10} {r.Count,7} {r.Revenue,9:N0}  {r.Best}");
}

decimal total = sales.Sum(s => s.Quantity * s.Price);
Console.WriteLine($"Total: {total:N0} UAH, average sale " +
    $"{sales.Average(s => s.Quantity * s.Price):N0} UAH");

// .NET 9+: CountBy and AggregateBy without intermediate groups.
foreach (var (category, units) in sales.AggregateBy(
    s => s.Category, 0, (sum, s) => sum + s.Quantity))
{
    Console.Write($"{category}: {units} pcs  ");
}
Console.WriteLine();

record Sale(
    string Product, string Category, int Quantity, decimal Price);
```

For each group `g`, the aggregate operators `Count`, `Sum`, and `MaxBy` are executed; `MaxBy` returns a sale, so the product name is taken from it. Sorting is applied to the already grouped results. `AggregateBy` totals the number of units by category without creating groups; the order of the keys corresponds to the order in which they first appear. Output:

```
Category     Items   Revenue  Top
Tech             3     6 693  Headphones
Books            3     3 070  Tiger Trappers
Games            2     2 930  Chess
Total: 12 693 UAH, average sale 1 587 UAH
Books: 10 pcs  Games: 3 pcs  Tech: 7 pcs
```

### Deferred execution

The condition lambda prints each value it checks, so you can see exactly when the query runs.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

List<int> temperatures = [18, 25, 31, 22];

// The query is only described: no condition has been checked yet.
IEnumerable<int> hot = temperatures.Where(t =>
{
    Console.Write($"[{t}?] ");
    return t > 24;
});
Console.WriteLine("Query created");

temperatures.Add(28);                 // the source changes AFTER creation

Console.WriteLine($"\nHot: {string.Join(", ", hot)}");
Console.WriteLine($"\nCount: {hot.Count()}");   // another pass

// ToList executes the query immediately and captures the result.
List<int> snapshot = hot.ToList();
temperatures.Add(35);
Console.WriteLine($"\nSnapshot: {string.Join(", ", snapshot)}");
Console.WriteLine($"\nQuery now: {string.Join(", ", hot)}");
```

After the query is created, no value has been checked. The value 28, added later, gets into the result. `string.Join`, `Count()`, and `ToList()` execute the query three times. The snapshot obtained by `ToList()` does not change after 35 is added, but the query sees it during the next iteration. Output:

```
Query created
[18?] [25?] [31?] [22?] [28?]
Hot: 25, 31, 28
[18?] [25?] [31?] [22?] [28?]
Count: 3
[18?] [25?] [31?] [22?] [28?]
Snapshot: 25, 31, 28
[18?] [25?] [31?] [22?] [28?] [35?]
Query now: 25, 31, 28, 35
```

### Library

The program joins readers and book loans in three ways: an inner join, a group join, and the .NET 10 left join.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Reader[] readers =
[
    new(1, "Olena"), new(2, "Petro"),
    new(3, "Iryna"), new(4, "Andrii"),
];
Loan[] loans =
[
    new(1, "Kobzar", new(2026, 9, 20)),
    new(3, "Tiger Trappers", new(2026, 9, 10)),
    new(1, "Marusia", new(2026, 9, 5)),
    new(5, "The Forest Song", new(2026, 9, 30)),     // no reader 5
];
DateOnly today = new(2026, 9, 16);

Console.WriteLine("Join – only matching pairs:");
var pairs = readers.Join(loans,
    r => r.Id, l => l.ReaderId,
    (r, l) => $"{r.Name} – “{l.Title}”");
Console.WriteLine($"  {string.Join("; ", pairs)}");

Console.WriteLine("GroupJoin – each reader with their books:");
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
        $"  {x.Name,-7} books: {x.Count}, overdue: {x.Overdue}");
}

Console.WriteLine("LeftJoin (.NET 10) – readers without books too:");
var left = readers.LeftJoin(loans,
    r => r.Id, l => l.ReaderId,
    (r, l) => $"{r.Name}: {l?.Title ?? "–"}");
Console.WriteLine($"  {string.Join(", ", left)}");

record Reader(int Id, string Name);
record Loan(int ReaderId, string Title, DateOnly Due);
```

The loan to the reader with `Id` 5 has no match and does not appear in any result. `Join` skips Petro and Andrii because they have no loans; `GroupJoin` returns empty groups with a count of 0 for them. `LeftJoin` passes `null` instead of a loan, so the selector uses `l?.Title ?? "–"`. Output:

```
Join – only matching pairs:
  Olena – “Kobzar”; Olena – “Marusia”; Iryna – “Tiger Trappers”
GroupJoin – each reader with their books:
  Olena   books: 2, overdue: 1
  Petro   books: 0, overdue: 0
  Iryna   books: 1, overdue: 1
  Andrii  books: 0, overdue: 0
LeftJoin (.NET 10) – readers without books too:
  Olena: Kobzar, Olena: Marusia, Petro: –, Iryna: Tiger Trappers, Andrii: –
```

## Common mistakes

Table 15.2. Common mistakes when working with LINQ {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| “Sequence contains no elements” | `First`, `Single`, or `Min` on an empty sequence; use `FirstOrDefault` or an `Any()` check |
| “…more than one matching element” | `Single` found several elements; check the data or use `First` |
| a query runs several times | each iteration of a deferred query executes it again; store the result with `ToList()` |
| an unexpected result after the source changes | deferred execution sees the current data; capture the result with `ToList()` |
| `Count() > 0` to check whether elements exist | `Count()` may iterate the whole sequence; use `Any()` |
| side effects in `Where` and `Select` lambdas | lambdas run an unknown number of times; modify data in a regular loop |
| `OrderBy(…).OrderBy(…)` | the second sort cancels the first; use `ThenBy` for an additional key |
| an anonymous type cannot be returned from a method | an anonymous type has no name; declare a record |
