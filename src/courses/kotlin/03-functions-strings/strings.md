---
title: "Strings and string templates"
description: "Topic 3. Functions and strings: strings and string templates"
outline: [2, 3]
sourceHash: "282dd58b60ee60f1b27b77aa0631fcd7cef48e5debc8467283d5a4647d4b66c1"
---

# Strings and string templates

## String immutability and characters

The operations `trim`, `replace`, and `uppercase` return a new string. Calling them without assigning or using the result does not change the original variable. You can iterate over a `String` with `for`, read a character by index, and compare contents with `==`. For case-insensitive comparison, use `equals(other, ignoreCase = true)`.

On the JVM, `length` counts UTF-16 code units. Some characters outside the Basic Multilingual Plane are represented by a pair of `Char` values; a combined letter may consist of several code points. Thus, rearranging `Char` values is not always a correct way to rearrange visible characters. Explicitly define the alphabet for teaching algorithms.

`Char.isDigit()` recognizes more digits than just ASCII 0..9. If a protocol format allows only decimal ASCII digits, check `character in '0'..'9'`. `isLetter` is useful for a broad notion of a letter but does not prove membership in a particular alphabet. `uppercaseChar` returns one Char and does not cover all transformations that may require several characters.

## Templates and multiline literals

`$name` inserts a simple variable, and `${expression}` inserts an expression's value. To place a name next to adjacent letters, braces are required; otherwise, the compiler may read a longer name. A nullable value becomes the text `null`; if you need another label, use the Elvis operator in the template.

An ordinary string supports the escape sequences `\n`, `\t`, `\"`, and `\\`. A multiline literal in triple quotes preserves line breaks and does not process these escape sequences. `trimIndent` removes common indentation, while `trimMargin` removes the part of each line up to a specified marker, which defaults to a vertical bar.

Kotlin 2.4.20 supports multi-dollar interpolation. A `$$` prefix before a literal means that two consecutive dollar signs start interpolation; a single dollar sign remains text. This is useful for JSON schemas, command templates, and text with prices.

```kotlin
fun main() {
    val name = "Ada"
    val text = $$"""Cost $10; user=$$name"""
    println(text)
    val missing: String? = null
    println("User: ${missing ?: "anonymous"}")
}
```

```text
Cost $10; user=Ada
User: anonymous
```

## Searching, slicing, and formatting

`substring(start, end)` uses a half-open interval: the start is included, and the end is excluded. The difference between the indices equals the result's length in code units. Invalid bounds cause an exception. After `indexOf`, check for -1 instead of immediately passing the result as a slice index.

`split` returns parts based on a delimiter; this does not yet prove that the format is valid. For a `name;score` record, check both the number of parts and each field. `trim` removes leading and trailing whitespace but does not normalize all internal whitespace. `replace` can mean literal replacement or Regex replacement, depending on the argument type.

`padStart` and `padEnd` pad to a minimum length but do not truncate a long string. `repeat` requires a nonnegative repetition count. For a table, separately define what happens to an excessively long value: reject, wrap, or shorten it.

JVM formatting with `String.format(Locale.ROOT, "%.2f", value)` specifies a reproducible decimal point. Without an explicit locale, the format may depend on the environment. Human-readable formats and machine data exchange formats may have different requirements.

## StringBuilder and incremental text construction

Repeated `result += piece` in a loop may create many intermediate strings. `StringBuilder` accumulates fragments in a mutable buffer, and `toString()` produces the result. It also provides insertion, replacement, and deletion operations by index.

`buildString { append(...); appendLine(...) }` is a concise way to use a local builder. The braces define a block that works with it; lambdas with receivers will be studied in detail in Topic 11. For these examples, it is enough to understand that `append` adds a fragment to the resulting string.
