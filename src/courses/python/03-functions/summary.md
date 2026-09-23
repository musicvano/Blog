---
title: "Summary"
description: "Topic 3. Functions: conclusions and review questions"
sourceHash: "bd74902ea1b8ed3b44ec8ac13ba9edd9b07ab26d7c32723f5bf728b95de65626"
---

# Summary

## Conclusions

A function combines a name, parameters, a contract, and a result. Its signature determines how an argument is passed; modifying a shared object differs from reassigning a local name. A closure retains state in an enclosing function. Recursion is suitable when a problem naturally splits into smaller ones, but requires a base case, limits, and control of repeated calculations. Annotations make these agreements visible to readers and tools.

## Self-check questions

1. How does a parameter differ from an argument?
2. When does a `def` body run, and when are default values evaluated?
3. How do `return`, `print`, and implicit `None` differ?
4. What does `return low, high` actually return?
5. How do the `/` and `*` markers work?
6. How does collecting arguments differ from unpacking?
7. Why does a default list retain changes between calls?
8. Why does reassigning a parameter not replace the caller's list?
9. What is the LEGB name lookup order?
10. When are `global` and `nonlocal` needed?
11. What data does a closure retain?
12. What proves that recursion terminates?
13. Why does Fibonacci caching not eliminate stack depth?
14. How do you annotate a function argument?
15. How do deferred annotations differ from string annotations?

## Useful links

1. Functions and parameters: <https://docs.python.org/3.14/tutorial/controlflow.html>.
2. Scope: <https://docs.python.org/3.14/reference/executionmodel.html>.
3. Typing: <https://docs.python.org/3.14/library/typing.html>.
4. Deferred annotations: <https://docs.python.org/3.14/library/annotationlib.html>.
