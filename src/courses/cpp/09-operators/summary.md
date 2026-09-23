---
title: Summary
description: "Topic 9. Operator Overloading: conclusions and review questions"
sourceHash: "182b6a35bef670ee05c517674513d77f7c8ae1068dd276ced8ccb97da6c42fe9"
---

# Summary

## Conclusions

Operators must preserve their expected domain meaning. An invariant makes value comparison consistent. Stream input must preserve the state on failure. Tests check both the result and the algebraic laws.

## Self-check questions

1. Which properties of an operator can’t be changed by overloading?
2. When should an operator be a free function?
3. Why does += return a reference, while + returns a value?
4. How do strong, weak and partial ordering differ?
5. Does a user-defined spaceship operator automatically create equality?
6. What does friend give, and what doesn’t it give?
7. Why are two versions of operator[] needed?
8. How do prefix and postfix ++ differ?
9. What does explicit operator bool mean?
10. Why isn’t operator&lt;&lt; enough for std::println?
11. How do you avoid a partial change with >>?
12. Why does the order of fields matter for a defaulted comparison?
13. What contract does m[row, column] have?
14. When is a named method better than an operator?
15. How do you check for overflow before an arithmetic operation?

## Useful links

- <https://learn.microsoft.com/cpp/cpp/operator-overloading>
- <https://learn.microsoft.com/cpp/cpp/general-rules-for-operator-overloading>
- <https://learn.microsoft.com/cpp/standard-library/overloading-the-output-operator-for-your-own-classes>
