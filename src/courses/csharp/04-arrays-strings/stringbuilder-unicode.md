---
title: "StringBuilder, Unicode, and regular expressions"
description: "Topic 4. Arrays and strings: StringBuilder, Unicode, and regular expressions"
outline: [2, 3]
sourceHash: "a8640a0b092affe736cb80e4d9b7d89c758d4227b8b11486c1043019c4e33ee6"
---

# StringBuilder, Unicode, and regular expressions

## The `StringBuilder` class

Because strings are immutable, every `s += "..."` operation creates a new string and copies all previous text into it. In a loop with thousands of iterations, this means thousands of copies, and execution time grows quadratically. The `StringBuilder` class (in the `System.Text` namespace) stores a **mutable** character buffer: appending does not copy the text already accumulated (<https://learn.microsoft.com/dotnet/standard/base-types/stringbuilder>).

```cs
using System.Text;

var sb = new StringBuilder();
for (int i = 1; i <= 5; i++)
{
    sb.Append(i * i);
    if (i < 5)
    {
        sb.Append(", ");
    }
}
sb.Insert(0, "Squares: ");
sb.AppendLine(".");
sb.Replace(", ", "; ");
sb.Remove(0, 3);                     // remove "Squ"

string result = sb.ToString();
Console.Write(result);               // ares: 1; 4; 9; 16; 25.
```

The main methods are `Append` (append a value), `AppendLine` (append with a newline), `Insert`, `Remove`, `Replace`, `Clear`, and `ToString` (get the completed string). Use `StringBuilder` when assembling a string from many parts in a loop; for a few operations, ordinary concatenation or an interpolated string is simpler and no slower.

## Culture, Unicode, and regular expressions

### Case and culture

The methods `ToUpper`, `ToLower`, `StartsWith(string)`, `string.Compare`, and `Array.Sort` for strings use **current culture** rules unless additional parameters are supplied. For Ukrainian text, these produce correct alphabetical order, whereas code-based comparison (`Ordinal`) does not: in Unicode, the letters Ukrainian Ie (U+0404), Byelorussian-Ukrainian I (U+0406), Yi (U+0407), and Ghe with upturn (U+0490) are located separately from the main Cyrillic block:

```cs
string[] words = ["яблуко", "ґава", "груша", "Євген", "іній"];

// Current culture: груша ґава Євген іній яблуко
Array.Sort(words);
Console.WriteLine(string.Join(" ", words));

// By character codes: Євген груша яблуко іній ґава
Array.Sort(words, StringComparer.Ordinal);
Console.WriteLine(string.Join(" ", words));
```

For technical strings (codes, commands, keys) that must not depend on the system language, use `ToUpperInvariant`, `ToLowerInvariant`, and `Ordinal` comparison.

### Apostrophes and Unicode characters

Ukrainian text uses the typographic apostrophe `’` (U+2019), but users often enter `'` (U+0027) or `ʼ` (U+02BC). These are different characters to a computer, so `"м'ята" == "м’ята"` gives `false`. Before comparison or searching, **normalize** the text: replace all apostrophe variants with one form, trim whitespace, and normalize case:

```cs
string input = "  М'ЯТА ";
string normalized = input.Trim()
    .Replace('\'', '’')
    .Replace('ʼ', '’')
    .ToLower();
Console.WriteLine(normalized == "м’ята");   // True
```

The `Length` property counts `char` values, not visible characters: characters outside the Unicode Basic Multilingual Plane, including most emoji, occupy two `char` values. In Cyrillic text, each letter is one `char`.

### Regular expressions

To validate a string’s format (phone number, email address, postal code), you can use a **regular expression** — a text pattern — instead of a chain of character checks. The `Regex` class in the `System.Text.RegularExpressions` namespace tests matches with `IsMatch` and replaces fragments with `Replace` (<https://learn.microsoft.com/dotnet/standard/base-types/regular-expression-language-quick-reference>):

```cs
using System.Text.RegularExpressions;

string phone = "+380 67 123 45 67";
bool ok = Regex.IsMatch(phone,
    @"^\+380 \d{2} \d{3} \d{2} \d{2}$");
Console.WriteLine(ok);                                   // True
Console.WriteLine(Regex.Replace("a   b  c", @"\s+", " "));  // a b c
```

In the pattern, `^` and `$` mark the beginning and end of the string, `\d` is a digit, `{2}` means exactly two repetitions, and `\s+` means one or more whitespace characters. Write patterns as verbatim strings `@"…"` to avoid doubling backslashes. Regular expressions are powerful but difficult to read, so this course uses them only for simple checks.
