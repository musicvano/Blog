---
title: "Summary"
description: "Topic 4. Arrays and strings: conclusions and review questions"
sourceHash: "6d7ed9c0f9a30cdf9e1e5a37b99e42b5e602079db7394e4255831ad74fa07745"
---

# Summary

## Conclusions

An array stores a fixed number of elements of one type, accessed by zero-based indices; indices from the end `^n` and ranges `a[x..y]` simplify working with the end and portions of an array. An array is a reference type, so assignment copies the reference; use `Clone` or `Array.Copy` to create an independent copy. The `Array` class provides methods for sorting, searching, filling, and resizing. Store tabular data in rectangular arrays `T[,]` and rows of different lengths in jagged arrays `T[][]`. A string is an immutable sequence of `char` characters: its methods return new strings, comparisons use the selected `StringComparison`, and `StringBuilder` is used to build large strings in loops. For Ukrainian text, consider culture when sorting and normalize apostrophes.

## Self-check questions

1. What is an array? How do you create one using a collection expression and the `new` operator?
2. What values do array elements have after `new double[10]`?
3. What do `a[^1]`, `a[1..^1]`, and `a[..3]` mean?
4. Why does `b = a` not copy the array? How do you create a copy?
5. How does `==` compare arrays?
6. Which `Array` class methods do you know? What is required to use `BinarySearch`?
7. How does `Array.Resize` work? Does it change the length of the existing array?
8. How does a rectangular array differ from a jagged array? How do you find their dimensions?
9. What does string immutability mean? What are its consequences?
10. How do `Ordinal`, `OrdinalIgnoreCase`, and `CurrentCulture` comparisons differ?
11. How do you split a string into parts and discard empty parts?
12. How do regular, verbatim, interpolated, and raw string literals differ?
13. What is the `StringBuilder` class for? When should you use it?
14. Why does sorting Ukrainian words by character codes produce the wrong order?
15. What are regular expressions used for?

## Useful links

- Arrays: <https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/arrays>
- Collection expressions: <https://learn.microsoft.com/dotnet/csharp/language-reference/operators/collection-expressions>
- The `Array` class: <https://learn.microsoft.com/dotnet/api/system.array>
- Strings: <https://learn.microsoft.com/dotnet/csharp/programming-guide/strings/>
- Raw string literals: <https://learn.microsoft.com/dotnet/csharp/language-reference/tokens/raw-string>
- String comparisons: <https://learn.microsoft.com/dotnet/standard/base-types/best-practices-strings>
- The `StringBuilder` class: <https://learn.microsoft.com/dotnet/standard/base-types/stringbuilder>
- Regular expression language: <https://learn.microsoft.com/dotnet/standard/base-types/regular-expression-language-quick-reference>
