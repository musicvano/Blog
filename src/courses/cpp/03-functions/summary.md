---
title: Summary
description: "Topic 3. Functions: conclusions and review questions"
sourceHash: "80728763b6bd3ac9cae05331b47a6d5e347372f838cc4fb81ac14fda5f141c99"
---

# Summary

## Conclusions

A function should have clear inputs, a result and
defined side effects. A value isolates local
work, a reference allows changing the original, and
a const reference allows reading without a copy. Overloading
and default arguments simplify calls only when they
do not create ambiguity. Recursion requires
a base case, reduction of the problem and an estimate of resources.

## Self-check questions

1. How does an argument differ from a parameter?
2. How does a declaration differ from a definition?
3. Why is return not console output?
4. When does changing a parameter change the caller’s argument?
5. Why is const T\& useful for a large object?
6. Why do parameter names not distinguish overloads?
7. Why is the return type not a sufficient difference?
8. Where are default arguments allowed?
9. When is a structure better than several output parameters?
10. What does a structured binding do?
11. Why is it dangerous to return a reference to a local object?
12. How does constexpr differ from mandatory compile-time evaluation?
13. What is the base case in the Towers of Hanoi?
14. How does the number of calls differ from the stack depth?
15. How is argc checked before reading argv?

## Review questions for the lab

1. Which functions of your program change their arguments?
2. How do a declaration and an implementation differ?
3. Why can an overload not be selected by its result?
4. When is an output parameter inferior to a structure?
5. What risks does a reference to a local variable have?
6. What is static_assert useful for?
7. What is the base of the chosen recursion?
8. How can you limit its resources?
9. Why is it necessary to check argc?
10. How is a complete numeric token checked?

## Useful links

- Functions: <https://learn.microsoft.com/cpp/cpp/functions-cpp>.
- Overloading: <https://learn.microsoft.com/cpp/cpp/function-overloading>.
- References: <https://learn.microsoft.com/cpp/cpp/reference-type-function-arguments>.
- Entry point: <https://learn.microsoft.com/cpp/cpp/main-function-command-line-args>.
