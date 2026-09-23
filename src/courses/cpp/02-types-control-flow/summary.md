---
title: Summary
description: "Topic 2. Types, Operators, Control Flow: conclusions and review questions"
sourceHash: "a380d87880a4fe6d2e086e15948c6000543caa7ae27e1af285b8637e8c1bdcd4"
---

# Summary

## Conclusions

Types define the allowed values, but the programmer checks that the domain data
is correct. Initialization and limit checks prevent
a large share of defects. Input requires checking both the stream state
and the meaning of the value. Branches and loops build the algorithm, and the output
format makes the result readable. Testing at the boundaries and with
invalid tokens is needed even for a short console program.

## Self-check questions

1. How does a type differ from the current value of a variable?
2. Why doesn’t `long` in MSVC x64 necessarily take 8 bytes?
3. How do `min()` and `lowest()` differ for `double`?
4. Which narrowing does brace initialization forbid?
5. How do `const`, `constexpr`, and `auto` differ in purpose?
6. Why isn’t `char` a universal type for a Unicode letter?
7. When is division an integer division, and how do you get a fractional result?
8. Why should overflow be checked before the operation?
9. What does `{:08.3f}` mean, and does it limit the magnitude of the number?
10. Why are `clear` and `ignore` needed after an input error?
11. Why shouldn’t EOF be handled by endlessly repeating the prompt?
12. When can the body of a `while` loop not execute even once?
13. How does `break` differ from `continue`?
14. What is the difference between a random number engine and a distribution?
15. Which tests are needed for a loop with user-defined limits and step?

## Review questions for the lab

1. How do syntactic and domain input validation differ?
2. When are `int`, `long long`, and `double` appropriate?
3. What does an explicit conversion before division change?
4. How do you check for overflow when adding nonnegative numbers?
5. Why can’t you check a range with a chain of comparisons?
6. How do you correctly recover a stream after an invalid token?
7. How does `continue` affect the step of a `for` loop?
8. How does `switch` differ from `if` for ranges?
9. What does the minimum width of a formatted field mean?
10. How do you prove that a loop terminates for valid data?

## Useful links

- MSVC types: <https://learn.microsoft.com/cpp/cpp/fundamental-types-cpp>.
- The MSVC formatting implementation: <https://github.com/microsoft/STL/blob/main/stl/inc/format>.
- Input: <https://learn.microsoft.com/cpp/standard-library/basic-istream-class>.
- Random numbers: <https://learn.microsoft.com/cpp/standard-library/random>.
