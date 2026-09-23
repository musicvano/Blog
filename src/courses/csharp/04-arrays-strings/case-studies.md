---
title: "Examples and common mistakes"
description: "Topic 4. Arrays and strings: Examples and common mistakes"
outline: [2, 3]
sourceHash: "77c7fe452b27756e09579dd8624f0a3cb7e95aacfa90edaf1729614d0d725c02"
---

# Examples and common mistakes

## Example programs

### Group grades

The program processes an array of student scores: it computes the average, maximum and its position, and the number of scores above average, and displays the scores in descending order without modifying the original array.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

int[] scores = [78, 92, 65, 88, 54, 97, 71, 83];

int sum = 0;
int max = scores[0];
foreach (int s in scores)
{
    sum += s;
    max = Math.Max(max, s);
}
double average = (double)sum / scores.Length;

int aboveAverage = 0;
for (int i = 0; i < scores.Length; i++)
{
    if (scores[i] > average)
    {
        aboveAverage++;
    }
}

int[] sorted = (int[])scores.Clone();   // the original is unchanged
Array.Sort(sorted);
Array.Reverse(sorted);                  // in descending order

Console.WriteLine($"Students: {scores.Length}");
Console.WriteLine($"Average score: {average:F2}");
int position = Array.IndexOf(scores, max) + 1;
Console.WriteLine($"Maximum: {max}, student no. {position}");
Console.WriteLine($"Above average: {aboveAverage}");
Console.WriteLine($"Descending: {string.Join(", ", sorted)}");
Console.WriteLine($"Top three: {string.Join(", ", sorted[..3])}");
Console.WriteLine($"Lowest: {sorted[^1]}");
```

The sum is divided after casting to `double`; otherwise, the average would be an integer. The `Clone` copy is needed because `Array.Sort` modifies the array, while we search for the maximum’s position in the original order. Output:

```
Students: 8
Average score: 78,50
Maximum: 97, student no. 6
Above average: 4
Descending: 97, 92, 88, 83, 78, 71, 65, 54
Top three: 97, 92, 88
Lowest: 54
```

### Sales matrix

The program stores four months of sales for three stores in a rectangular `double[,]` array and displays a table with totals for each store, each month, and a grand total.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

string[] shops = ["Center", "Livoberezhnyi", "Inhuletskyi"];
string[] months = ["Jan", "Feb", "Mar", "Apr"];

// Rows are stores, columns are months (thousands of UAH).
double[,] sales =
{
    { 120.5, 98.0, 134.2, 141.7 },
    { 87.3, 91.6, 102.4, 99.8 },
    { 64.0, 70.5, 68.9, 81.2 },
};

int rows = sales.GetLength(0);
int cols = sales.GetLength(1);

Console.Write($"{"Store",-14}");
for (int j = 0; j < cols; j++)
{
    Console.Write($"{months[j],8}");
}
Console.WriteLine($"{"Total",9}");

double[] monthTotals = new double[cols];
for (int i = 0; i < rows; i++)
{
    double shopTotal = 0;
    Console.Write($"{shops[i],-14}");
    for (int j = 0; j < cols; j++)
    {
        Console.Write($"{sales[i, j],8:F1}");
        shopTotal += sales[i, j];
        monthTotals[j] += sales[i, j];
    }
    Console.WriteLine($"{shopTotal,9:F1}");
}

Console.Write($"{"Total",-14}");
double grandTotal = 0;
foreach (double total in monthTotals)
{
    Console.Write($"{total,8:F1}");
    grandTotal += total;
}
Console.WriteLine($"{grandTotal,9:F1}");
```

The row (store) total accumulates in `shopTotal`, which resets to zero for each row, while column (month) totals accumulate in a separate `monthTotals` array. The rectangular array is initialized with nested braces: collection expressions `[…]` are not supported for multidimensional arrays. Output:

```
Store              Jan     Feb     Mar     Apr    Total
Center           120,5    98,0   134,2   141,7    494,4
Livoberezhnyi     87,3    91,6   102,4    99,8    381,1
Inhuletskyi       64,0    70,5    68,9    81,2    284,6
Total            271,8   260,1   305,5   322,7   1160,1
```

### Sentence analysis

The program splits a sentence into words, finds the longest word, counts vowels, and capitalizes each word.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine("Enter a sentence:");
string sentence = Console.ReadLine() ?? "";

char[] separators = [' ', ',', '.', '!', '?', ';', ':', '–'];
string[] words = sentence.Split(separators,
    StringSplitOptions.RemoveEmptyEntries);

if (words.Length == 0)
{
    Console.WriteLine("No words found.");
    return;
}

string longest = words[0];
int vowels = 0;
string[] titled = new string[words.Length];

for (int i = 0; i < words.Length; i++)
{
    string word = words[i];
    if (word.Length > longest.Length)
    {
        longest = word;
    }
    foreach (char c in word)
    {
        if ("aeiou".Contains(char.ToLower(c)))
        {
            vowels++;
        }
    }
    titled[i] = char.ToUpper(word[0]) + word[1..].ToLower();
}

Console.WriteLine($"Words: {words.Length}");
Console.WriteLine($"Longest word: {longest} ({longest.Length})");
Console.WriteLine($"Vowels: {vowels}");
Console.WriteLine($"Capitalized: {string.Join(" ", titled)}");
```

The hyphen and apostrophe are not separators, so “object-oriented” remains one word. The expression `char.ToUpper(word[0]) + word[1..]` combines a character and a string: the result has type `string`. Output:

```
Enter a sentence:
C# – modern, object-oriented and VERY popular language!
Words: 7
Longest word: object-oriented (15)
Vowels: 17
Capitalized: C# Modern Object-oriented And Very Popular Language
```

### Report using `StringBuilder`

The program builds a bordered product table in `StringBuilder` and compares the time needed to build a 20,000-character string using concatenation and `Append`.

```cs
using System.Diagnostics;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;

string[] items = ["Keyboard", "Mouse", "Monitor 27\"", "Headphones"];
int[] counts = [3, 5, 2, 4];
decimal[] prices = [1250m, 480m, 9999m, 1299.5m];

var report = new StringBuilder();
report.AppendLine("┌────────────────────┬──────┬───────────┐");
report.AppendLine($"│{"Item",-20}│{"Count",6}│{"Amount",11}│");
report.AppendLine("├────────────────────┼──────┼───────────┤");

decimal total = 0;
for (int i = 0; i < items.Length; i++)
{
    decimal sum = counts[i] * prices[i];
    total += sum;
    report.AppendLine($"│{items[i],-20}│{counts[i],6}│{sum,11:N2}│");
}

report.AppendLine("├────────────────────┴──────┼───────────┤");
report.AppendLine($"│{"Total",-27}│{total,11:N2}│");
report.Append("└───────────────────────────┴───────────┘");
Console.WriteLine(report);

// Speed comparison: 20,000 string appends.
const int N = 20_000;
var watch = Stopwatch.StartNew();
string text = "";
for (int i = 0; i < N; i++)
{
    text += "x";
}
watch.Stop();
long concatMs = watch.ElapsedMilliseconds;

watch.Restart();
var builder = new StringBuilder();
for (int i = 0; i < N; i++)
{
    builder.Append('x');
}
string built = builder.ToString();
watch.Stop();

Console.WriteLine($"Concatenation:  {concatMs} ms");
Console.WriteLine($"StringBuilder: {watch.ElapsedMilliseconds} ms");
Console.WriteLine($"Equal strings: {text == built}");
```

Three parallel arrays, `items`, `counts`, and `prices`, describe products: elements at the same index belong to one product (Topic 7 groups such data into a class). The `Stopwatch` class measures time. Output (timing depends on the computer):

```
┌────────────────────┬──────┬───────────┐
│Item                │ Count│     Amount│
├────────────────────┼──────┼───────────┤
│Keyboard            │     3│   3 750,00│
│Mouse               │     5│   2 400,00│
│Monitor 27"         │     2│  19 998,00│
│Headphones          │     4│   5 198,00│
├────────────────────┴──────┼───────────┤
│Total                      │  31 346,00│
└───────────────────────────┴───────────┘
Concatenation:  29 ms
StringBuilder: 0 ms
Equal strings: True
```

## Common mistakes

Table 4.3 lists the most common mistakes when working with arrays and strings.

Table 4.3. Common mistakes when working with arrays and strings {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| `IndexOutOfRangeException` | condition `i <= a.Length` or index −1; loop while `i < a.Length`, the last element is `a[^1]` |
| modifying the “copy” changes the original | `b = a` copies the reference; create a copy with `Clone`, `a[..]`, or `Array.Copy` |
| `NullReferenceException` for `j[i][k]` | a jagged array row has not been created; first use `j[i] = new int[n]` |
| the string is unchanged after `s.Replace(…)` | string methods return a new string; `s = s.Replace(…)` |
| `System.Int32[]` is displayed | `Console.WriteLine(a)` does not display elements; use `string.Join(", ", a)` |
| empty elements after `Split` | consecutive separators; use `RemoveEmptyEntries` |
| `"Kyiv" == "kyiv"` gives `False` | comparison is case-sensitive; use `StringComparison.OrdinalIgnoreCase` |
| building a large string is slow | `+=` in a loop copies the entire string each time; use `StringBuilder` |
| `BinarySearch` gives the wrong result | the array is not sorted; call `Array.Sort` first |
