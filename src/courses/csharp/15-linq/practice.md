---
title: "Practice"
description: "Topic 15. LINQ: worked examples"
outline: [2, 3]
sourceHash: "cc83568a7c5cd5888268ba1a2211eb1cbd25466bf1a5dd4ecd230a6639974ccc"
---

# Practice

## Example 1. Analyzing the words of a text

Find the most frequent words of a text that are longer than three letters, the distribution of words by length, and the longest word. Compare grouping with `GroupBy` to the `CountBy` operator.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

string text = """
    The C# programming language lets you write programs for different
    platforms. Programs in C# are compiled into an intermediate language, and
    the .NET runtime executes programs on different platforms. The language
    supports object-oriented and functional programming.
    """;

string[] words = text
    .Split([' ', '.', ',', '\r', '\n'],
        StringSplitOptions.RemoveEmptyEntries)
    .Where(w => w.Length > 3)
    .Select(w => w.ToLower())
    .ToArray();

// The classic approach: grouping by word.
var top = words
    .GroupBy(w => w)
    .Select(g => new { Word = g.Key, Count = g.Count() })
    .OrderByDescending(x => x.Count)
    .ThenBy(x => x.Word)
    .Take(5);
Console.WriteLine("Top 5 (GroupBy):");
foreach (var x in top)
{
    Console.WriteLine($"  {x.Word,-16} {x.Count}");
}

// .NET 9+: CountBy – the same, but shorter.
var top3 = words.CountBy(w => w)
    .OrderByDescending(p => p.Value)
    .ThenBy(p => p.Key)
    .Take(3)
    .Select(p => $"{p.Key}×{p.Value}");
Console.WriteLine($"Top 3 (CountBy): {string.Join(", ", top3)}");

// Distribution of word lengths.
var lengths = words
    .GroupBy(w => w.Length)
    .OrderBy(g => g.Key)
    .Select(g => $"{g.Key}:{g.Count()}");
Console.WriteLine($"Length:count  {string.Join(" ", lengths)}");
Console.WriteLine($"Words > 3 letters: {words.Length}, " +
    $"distinct: {words.Distinct().Count()}, " +
    $"longest: {words.MaxBy(w => w.Length)}");
```

The text is split into words, short words are discarded, and the rest are converted to lowercase. `ToArray()` executes this query once because the result is used by several subsequent queries. `ThenBy` sorts words with the same frequency alphabetically. Output:

```
Top 5 (GroupBy):
  language         3
  programs         3
  different        2
  platforms        2
  programming      2
Top 3 (CountBy): language×3, programs×3, different×2
Length:count  4:2 5:1 7:1 8:9 9:4 10:1 11:2 12:1 15:1
Words > 3 letters: 22, distinct: 15, longest: object-oriented
```

## Example 2. Pagination

Generate a catalog of 23 products, print the given pages of 5 products each, and print information about all pages.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// 23 products generated with LINQ.
List<string> catalog = Enumerable.Range(1, 23)
    .Select(i => $"Product {i:D2}")
    .ToList();
const int PageSize = 5;
int pageCount = (int)Math.Ceiling(catalog.Count / (double)PageSize);

Console.WriteLine($"Products: {catalog.Count}, pages: {pageCount}");
foreach (int page in new[] { 1, 5, 6 })
{
    string items = string.Join(", ", GetPage(page));
    Console.WriteLine($"Page {page}: {items}");
}

// Chunk splits a sequence into arrays of the same size.
foreach (var (index, chunk) in catalog.Chunk(PageSize).Index())
{
    Console.WriteLine(
        $"  [{index + 1}] {chunk[0]} … {chunk[^1]} ({chunk.Length})");
}

IEnumerable<string> GetPage(int page)
{
    if (page < 1 || page > pageCount)
    {
        return [$"no page {page}"];
    }
    return catalog.Skip((page - 1) * PageSize).Take(PageSize);
}
```

The catalog is created with `Enumerable.Range` and `Select`. The page with number *p* is returned by `Skip((p − 1) · 5).Take(5)`. For a nonexistent page, the local function returns a sequence with a single message. `Chunk` splits the whole catalog into arrays, and `Index()` numbers them in `foreach`. Output:

```
Products: 23, pages: 5
Page 1: Product 01, Product 02, Product 03, Product 04, Product 05
Page 5: Product 21, Product 22, Product 23
Page 6: no page 6
  [1] Product 01 … Product 05 (5)
  [2] Product 06 … Product 10 (5)
  [3] Product 11 … Product 15 (5)
  [4] Product 16 … Product 20 (5)
  [5] Product 21 … Product 23 (3)
```

## Example 3. Custom LINQ operators

Create a deferred operator `WhereNot` that discards elements by a condition and an immediate operator `Median`. Use them to analyze request execution times that include an anomalous value.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

double[] times = [12.4, 9.8, 15.1, 11.0, 10.6, 30.2, 11.9];

// Custom operators are called in a chain, like standard ones.
var usual = times
    .WhereNot(t => t > 20)          // discard anomalies
    .OrderBy(t => t);
Console.WriteLine($"Without anomalies: {string.Join("; ", usual)}");
Console.WriteLine($"Median of all: {times.Median():F2}");
Console.WriteLine($"Median without anomalies: {usual.Median():F2}");
Console.WriteLine($"Average of all: {times.Average():F2}");

try
{
    Array.Empty<double>().Median();
}
catch (InvalidOperationException e)
{
    Console.WriteLine($"Error: {e.Message}");
}

static class LinqExtensions
{
    // A deferred operator: an iterator with yield return.
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

    // An immediate operator: calculates the value right away.
    public static double Median(this IEnumerable<double> source)
    {
        double[] sorted = source.Order().ToArray();
        if (sorted.Length == 0)
        {
            throw new InvalidOperationException("no elements");
        }
        int middle = sorted.Length / 2;
        return sorted.Length % 2 == 1
            ? sorted[middle]
            : (sorted[middle - 1] + sorted[middle]) / 2;
    }
}
```

`WhereNot` is implemented as an iterator, so it executes lazily and combines with `OrderBy` into a pipeline. `Median` immediately sorts the sequence and calculates the value. For an even number of elements, the median is the average of the two middle values. The anomaly 30.2 significantly increases the average but barely changes the median. Output:

```
Without anomalies: 9,8; 10,6; 11; 11,9; 12,4; 15,1
Median of all: 11,90
Median without anomalies: 11,45
Average of all: 14,43
Error: no elements
```
