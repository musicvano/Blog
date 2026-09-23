---
title: "Summary"
description: "Topic 6. Inheritance and polymorphism: conclusions and review questions"
sourceHash: "117bbec8d1d9c091121842cbabeb01e8154959130d617acfec8c8a1befeff78a"
---

# Summary

## Conclusions

A common type lets you write an algorithm once, while concrete objects supply the required behavior. An abstract class is useful for shared state and an algorithm; an interface is useful for an independent capability. Inheritance requires a substitution contract, while composition often offers a simpler separation of responsibilities.

## Self-check questions

1. Why does Kotlin make classes final by default?
2. What does the static type determine, and what does the object's actual type determine?
3. Why does a super call not disable all polymorphic calls?
4. What members can an abstract class have?
5. Why does an interface not store its own property backing field?
6. How do you resolve a conflict between two default implementations?
7. When is a smart cast impossible, and why does a local val help?
8. How are equals and hashCode related?
9. Why is an open call in a base class's init block dangerous?
10. What promise does an incorrect subtype violate?
