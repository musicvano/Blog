---
title: "Summary"
description: "Topic 8. Classes and objects: conclusions and review questions"
sourceHash: "a2772a3a7fdd58688a6bb47f9f1288a25da0042671dcaced7032724a8bfd433a"
---

# Summary

## Conclusions

A class defines a contract for state and behavior. The constructor establishes a valid initial state, and methods and properties maintain invariants. Encapsulation conventions help developers collaborate; they do not protect against deliberate access. Object relationships and UML help explain responsibilities before all methods are written.

## Self-check questions

1. How does a class differ from an instance?
2. What responsibilities do `__new__` and `__init__` have?
3. How is `self` passed in a bound method?
4. Why does an attribute annotation not create a value?
5. When does an instance attribute shadow a class attribute?
6. Why does a class-level list become shared among objects?
7. What priority does a data descriptor have?
8. What does `__slots__` provide, and what does it not provide?
9. How do `_name` and `__name` differ?
10. How do you avoid recursion in a setter?
11. When does a cached property become stale?
12. How do you choose between a method, classmethod, and staticmethod?
13. How do `__str__` and `__repr__` differ?
14. How do you explain aggregation and composition with UML?
15. Why does `del` not guarantee immediate finalization?

## Useful links

1. Classes: <https://docs.python.org/3.14/tutorial/classes.html>.
2. Properties: <https://docs.python.org/3.14/library/functions.html#property>.
3. Descriptors: <https://docs.python.org/3.14/howto/descriptor.html>.
4. Data model: <https://docs.python.org/3.14/reference/datamodel.html>.
