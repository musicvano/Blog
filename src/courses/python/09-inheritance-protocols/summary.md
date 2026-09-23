---
title: "Summary"
description: "Topic 9. Inheritance and protocols: conclusions and review questions"
sourceHash: "b73dbf4db17a4cd93db120037d3c3e21cee4942ef0d6fd4904c6296b37c4d356"
---

# Summary

## Conclusions

Inheritance defines a relationship between types and can reuse an implementation. Polymorphism lets a client work with a shared role. ABC makes some requirements explicit at instantiation, while Protocol describes a structural contract for an analyzer. MRO defines lookup order, and composition allows independent replacement of parts of behavior. Design is verified through substitution and contract tests, not merely a correctly drawn arrow.

## Self-check questions

1. How do you declare a derived class and call base initialization?
2. What does `super` mean in multiple inheritance?
3. How does `isinstance` differ from an exact type check?
4. What problem does a polymorphic loop solve?
5. Why is a matching method name insufficient for a contract?
6. When does ABC prevent creating an instance?
7. How do you declare an abstract property?
8. What is a template method?
9. How does nominal typing differ from structural typing?
10. What does `runtime_checkable` not check?
11. What does `register` change, and what stays unchanged?
12. What guarantees do `override` and `final` provide at runtime?
13. How does C3 order a diamond hierarchy?
14. What contract should a mixin have?
15. When can a square not substitute for a mutable rectangle?

## Useful links

1. ABC: <https://docs.python.org/3.14/library/abc.html>.
2. Protocols: <https://peps.python.org/pep-0544/>.
3. Collections: <https://docs.python.org/3.14/library/collections.abc.html>.
4. MRO: <https://docs.python.org/3.14/howto/mro.html>.
