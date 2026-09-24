---
title: "Common mistakes"
description: "Topic 2. Regular expressions: Common mistakes"
outline: [2, 3]
sourceHash: "d0159f73347e2a20b2ab31587c0d1c3ce860c1d8ef5b7ad1cdd3049360c31aef"
---

# Common mistakes

## Common mistakes

The most common mistakes when working with regular expressions are collected in Table 2.7.

Table 2.7. Common mistakes when working with regular expressions {.caption}

| **Problem** | **Cause** | **Fix** |
| --- | --- | --- |
| an `IsMatch` check accepts a string with extra characters | a pattern without anchors looks for a match anywhere | `^…$` or `^…\z` |
| a string with a trailing `\n` passes validation | `$` also matches the position before `\n` | `\z` instead of `$` |
| `"\d+"` does not compile (CS1009) | `\d` in a regular C# string is an escape sequence | `@"\d+"` or a raw string |
| `.*` captures too much | a greedy quantifier | `.*?` or a negated class `[^<]*` |
| `[А-Яа-я]` does not accept "Їжак" | the Ukrainian letters Ґ, Є, І, Ї are outside the range | `\p{IsCyrillic}` or a full list of letters |
| `\d` accepts Arabic-Indic digits | `\d` means any Unicode digit | `[0-9]` or `RegexOptions.ECMAScript` |
| `RegexParseException` for user input | metacharacters `+`, `(`, `.` in the input | `Regex.Escape` |
| the program "hangs" on some strings | nested quantifiers, catastrophic backtracking | a simpler pattern, `matchTimeout`, `NonBacktracking` |
