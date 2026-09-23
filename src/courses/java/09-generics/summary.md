---
title: "Summary"
description: "Topic 9. Generics: conclusions and review questions"
sourceHash: "79a36d2d1006741e94e3ce8ec0feb2f7610078e1ab2aa878cb4c014bb818a055"
---

# Summary

## Conclusions

Generics move type compatibility checks from runtime to compile time: an `Object` container requires casts, while `Box<T>` connects writing and reading to one type argument. Type parameters can be declared in classes, records, and methods; diamond and type argument inference shorten the syntax without disabling typing. Bounds such as `<T extends Comparable<? super T>>` describe the capabilities an algorithm needs but cannot provide guarantees the type does not actually offer. Ordinary generics are invariant, while arrays are covariant and check writes only at runtime. Wildcards `? extends` and `? super` express data flow direction through the PECS principle, while wildcard capture lets a helper method name an unknown type. Type erasure prevents creating `new T()` or `new T[]`, overloading methods that coincide after erasure, or declaring a generic subclass of `Throwable`. Raw types and generic varargs weaken checks, so unchecked operations should be localized and justified by an invariant. Type safety does not replace domain validation, and a generic API's contract is checked both with tests and with negative compilation examples.

## Self-check questions

1. Why does an Object container require casts?
2. How does a type parameter differ from a type argument?
3. What is the scope of a static generic method's parameter?
4. Why does Comparable often use super?
5. How does generics invariance differ from arrays?
6. Which operations do extends and super allow?
7. When is wildcard capture needed?
8. What is erased, and what remains in metadata?
9. Why does the compiler generate a bridge method?
10. Why should you not casually return an internal E[] to the client?
11. What exactly does SafeVarargs promise?
12. How do you test a contract with a negative compilation example?

## Useful links

- <https://dev.java/learn/generics/>.
- <https://docs.oracle.com/javase/tutorial/java/generics/>.
- <https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-4.html>.
- <https://docs.oracle.com/en/java/javase/26/docs/specs/man/javap.html>.
