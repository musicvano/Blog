---
title: "Summary"
description: "Topic 11. Structures, records, tuples: conclusions and review questions"
sourceHash: "ca7cdbd64950acf3380cf5ab7225ca100d784505a1be021ed84d73794dcbfa82"
---

# Summary

## Conclusions

Structures are value types: assignment copies all fields, so they suit small immutable values, and `readonly struct` prevents mistakes with modifying copies. Converting a structure to `object` or an interface performs boxing. Records generate value equality, `ToString`, copying with a `with` expression, and deconstruction; `record class` is a reference type, and `record struct` is a value type. Enumerations replace “magic numbers” with named constants, and `[Flags]` lets you store sets of values in bits; together with the `switch` expression, they implement finite state machines. Tuples group several values without declaring a type and are convenient for returning several results from a method; deconstruction and positional patterns simplify working with them.

## Self-check questions

1. How does a structure differ from a class?
2. What happens when a structure variable is assigned?
3. What values do the fields of a structure’s `default` have? Is a constructor called?
4. When should you choose a structure instead of a class?
5. What is a `readonly struct`? Why are mutable structures dangerous?
6. What are boxing and unboxing? When do they happen for structures?
7. What members does the compiler generate for a record?
8. How does record equality work?
9. What is the `with` expression for?
10. How does `record struct` differ from `readonly record struct`?
11. What is the underlying type of an enumeration, and what values do its constants have by default?
12. How do you safely parse a string into an enumeration value?
13. How do you declare and use a flag enumeration?
14. What is a tuple? How do you name its elements?
15. What is deconstruction? How do you implement it for your own class?
16. What are a positional pattern and a property pattern?

## Useful links

- Structures: <https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/struct>
- Records: <https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/record>
- Enumerations: <https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/enum>
- Tuples: <https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/value-tuples>
- Deconstruction: <https://learn.microsoft.com/dotnet/csharp/fundamentals/functional/deconstruct>
- Choosing between a class and a structure: <https://learn.microsoft.com/dotnet/standard/design-guidelines/choosing-between-class-and-struct>
