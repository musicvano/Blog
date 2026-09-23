---
title: "Summary"
description: "Topic 10. Special methods, dataclass: conclusions and review questions"
sourceHash: "f9e8c3999c7b7c2b7699f24db527901f89bda10113d38872a98c154db974d9f3"
---

# Summary

## Conclusions

A special method is part of the language contract. It lets you use a class as a value, container, or resource if its behavior meets expectations. Dataclass removes repetition from code, and an enumeration makes valid states explicit. Immutability, equality, and hashing must be designed together.

## Self-check questions

1. Where does Python look for the special method for `len`?
2. How do `repr`, `str`, and `format` differ?
3. Why does an arithmetic method return `NotImplemented`?
4. When can the right type's reflected method take priority?
5. Does `+=` always preserve object identity?
6. What is the relationship between equality and hashing?
7. Why is a mutable key dangerous for a dictionary?
8. What does `__getitem__` receive for a slice?
9. How can you provide two independent traversals of a container?
10. What should `__exit__` return to avoid hiding a failure?
11. Which methods does dataclass generate by default?
12. Why is `default_factory` better than a shared list?
13. Does `frozen` make nested fields immutable?
14. When do you need `Enum`, `StrEnum`, and `Flag`?
15. How does `__match_args__` affect positional patterns?

## Useful links

- <https://docs.python.org/3.14/reference/datamodel.html>.
- <https://docs.python.org/3.14/library/dataclasses.html>.
- <https://docs.python.org/3.14/library/enum.html>.
- <https://docs.python.org/3.14/library/contextlib.html>.
