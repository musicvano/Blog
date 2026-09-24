---
title: "Summary"
description: "Topic 2. Regular expressions: conclusions and review questions"
sourceHash: "9ba28dfda5f40bb2e09a928ab5644daff5660fa4b08236b6fdeea26a90ecef6b"
---

# Summary

## Conclusions

Regular expressions are a pattern language for searching, validating, and transforming text. A pattern consists of literals, character classes, quantifiers, anchors, groups, and lookarounds, and in C# it is convenient to write it as a verbatim string `@"…"` or a raw string literal. The `Regex` class checks for a match (`IsMatch`), finds matches (`Match`, `Matches`, `Count`), replaces text (`Replace` with substitutions or a `MatchEvaluator`), and splits text (`Split`), while groups give access to parts of a match. The engine's behavior is configured with `RegexOptions`. A pattern with nested quantifiers can take exponentially long, so for external data you use a timeout, `NonBacktracking`, or simpler patterns. Patterns known at compile time are declared with the `[GeneratedRegex]` attribute, and their correctness is confirmed by parameterized unit tests. A regular expression checks the shape of text; values are checked with `TryParse` methods, and structured formats are processed with parsers.

## Self-check questions

1. Which text processing problems do regular expressions solve? How are they better than `IndexOf` and `Split`?
2. How do you write a pattern in C# code? Why are verbatim strings and raw string literals convenient?
3. What is a character class? How do `\d` and `[0-9]`, `\w` and `[A-Za-z0-9_]` differ?
4. How do you write a pattern for Ukrainian words with an apostrophe? Why is `[А-Яа-я]` unsuitable?
5. Which quantifiers exist in .NET? How does a greedy quantifier differ from a lazy one?
6. What are the anchors `^`, `$`, `\A`, `\z`, `\b` for? Why are anchors required for input validation?
7. How do the static and instance methods of the `Regex` class differ? What is the pattern cache?
8. What properties does a `Match` object have? How do you iterate over all matches?
9. How do numbered, named, and noncapturing groups differ?
10. What is a backreference? Give an example.
11. Which substitutions can you use in a replacement string? When do you need a `MatchEvaluator`?
12. What is the `Regex.Escape` method for?
13. How do the `IgnoreCase`, `Multiline`, `Singleline`, and `IgnorePatternWhitespace` options work?
14. What are lookahead and lookbehind? How do you check several password conditions with one pattern?
15. What are catastrophic backtracking and ReDoS? How do you protect against them?
16. What are the benefits of the `[GeneratedRegex]` attribute?
17. How do you test a pattern with `[Theory]` and `[InlineData]`?

## Useful links

- .NET regular expressions: <https://learn.microsoft.com/dotnet/standard/base-types/regular-expressions>
- Regular expression language quick reference: <https://learn.microsoft.com/dotnet/standard/base-types/regular-expression-language-quick-reference>
- Regular expression options: <https://learn.microsoft.com/dotnet/standard/base-types/regular-expression-options>
- Best practices for regular expressions: <https://learn.microsoft.com/dotnet/standard/base-types/best-practices-regex>
- Source generators for regular expressions: <https://learn.microsoft.com/dotnet/standard/base-types/regular-expression-source-generators>
- The `Regex` class: <https://learn.microsoft.com/dotnet/api/system.text.regularexpressions.regex>
- Regular expressions in Visual Studio: <https://learn.microsoft.com/visualstudio/ide/using-regular-expressions-in-visual-studio>
- Unit testing with xUnit: <https://learn.microsoft.com/dotnet/core/testing/unit-testing-csharp-with-xunit>
- xUnit.net v3: <https://xunit.net/docs/getting-started/v3/getting-started>
