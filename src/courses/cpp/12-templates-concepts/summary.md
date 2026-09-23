---
title: Summary
description: "Topic 12. Templates and Concepts: conclusions and review questions"
sourceHash: "3ca24f58b34b7d5f5a3591d1f5b8f6863034dbdbe094357da0d38d5c099423f3"
---

# Summary

## Conclusions

A template describes a shared algorithm once, and the compiler generates the required specializations for arguments known at compile time. Type deduction does not look for a convenient common type, so the template signature is part of the contract. A class template can have a non-type parameter, and then `FixedStack<int, 2>` and `FixedStack<int, 3>` are different types, while CTAD deduces the arguments only from a constructor. A class specialization replaces the behavior for specified arguments, and for functions you usually use overloading or constraints. For implicit instantiation, the template definition must be visible, so it is placed in a header. Parameter packs and fold expressions are expanded at compile time and are not a run-time container. Concepts and `requires` express exact requirements for types and move diagnostics closer to the interface, but they do not prove that the operations are semantically correct. Static polymorphism selects an implementation at instantiation time and does not replace a virtual interface for heterogeneous collections.

## Self-check questions

1. Why does `maxOf(3, 7.5)` not deduce a single T?
2. Which types and operations does the training FixedStack actually support?
3. Why can CTAD not deduce the capacity from an empty constructor?
4. How does a class specialization differ from function overloading?
5. What information is needed for implicit instantiation?
6. How does a requires clause differ from a requires expression?
7. Does a concept prove that a comparison operator is semantically correct?
8. Why does an empty fold over the comma work, while one over + needs a decision?
9. Where should you use `static_assert` instead of a concept?
10. When do you need dynamic selection of an implementation instead of a template?

## Review questions for the lab

1. What is a type argument, and what is a non-type argument?
2. Which constraints of your type are checked by the compiler?
3. Which properties remain run-time checks?
4. How does the CTAD guarantee differ from a constructor check?
5. Why can a failure test not be replaced with a comment?
