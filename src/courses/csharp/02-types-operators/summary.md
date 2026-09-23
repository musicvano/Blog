---
title: "Summary"
description: "Topic 2. Types, variables, and operators: conclusions and review questions"
sourceHash: "1d6965276d749a1b713272788302a584e14d5fe02fcd4f841483ab71d4369d0a"
---

# Summary

## Conclusions

Every value in C# has a type known at compile time. Value types (numbers, `bool`, `char`, structures) store values directly, while reference types (`string`, `object`, arrays, classes) store references to objects on the managed heap. The main integer type is `int`, or `long` for large values; use `double` for fractional calculations and `decimal` for money, as it avoids decimal fraction representation errors. Safe type conversions happen implicitly, while conversions that may lose data require an explicit cast or the `Convert`, `Parse`, or `TryParse` methods. When evaluating expressions, account for integer division, overflow, operator precedence, and the rounding mode; represent potentially absent values using types with `?` and handle them with `??` and `??=`.

## Self-check questions

1. How do value types differ from reference types? Give examples.
2. What happens when assigning value-type and reference-type variables?
3. What are boxing and unboxing? When does `InvalidCastException` occur?
4. Which integer types does C# provide? How can you find a type's range?
5. How do you write hexadecimal and binary literals? What are the `L`, `U`, `f`, and `m` suffixes for?
6. How do `float`, `double`, and `decimal` differ? Which type should you choose for money?
7. Why does `0.1 + 0.2 == 0.3` produce `False`? How should you compare floating-point numbers?
8. What are `NaN` and infinity? How can you check whether a value is `NaN`?
9. How does implicit typing with `var` work? When should you use it?
10. How does a `const` constant differ from a variable?
11. What do `int?` and `string?` mean? How do `??` and `??=` work?
12. Which type conversions happen implicitly? When is an explicit cast needed?
13. How do `(int)3.5`, `Convert.ToInt32(3.5)`, and `Math.Round(3.5)` differ?
14. How do integer division and `%` work?
15. What is the difference between prefix and postfix increment?
16. What is overflow? How can you detect it with `checked`?
17. What is short-circuit evaluation of `&&` and `||`?
18. How do you test, set, and clear a bit using bitwise operators?

## Useful links

- C# built-in types: <https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/built-in-types>
- Integer types: <https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/integral-numeric-types>
- Floating-point types: <https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types>
- Numeric conversions: <https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/numeric-conversions>
- Operators and expressions: <https://learn.microsoft.com/dotnet/csharp/language-reference/operators/>
- `checked` and `unchecked` statements: <https://learn.microsoft.com/dotnet/csharp/language-reference/statements/checked-and-unchecked>
- Nullable types: <https://learn.microsoft.com/dotnet/csharp/nullable-references>
- Standard numeric formats: <https://learn.microsoft.com/dotnet/standard/base-types/standard-numeric-format-strings>
