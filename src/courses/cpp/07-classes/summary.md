---
title: Summary
description: "Topic 7. Classes and Objects: conclusions and review questions"
sourceHash: "bdca64505143b555e5163614c614c2b310234b90f2730b5d15ee7a4454438be3"
---

# Summary

## Conclusions

An invariant defines the valid state of an object. A constructor establishes the invariant before the object is used. Composition manages the lifetime of member values. A minimal interface makes testing easier.

## Self-check questions

1. How does a class differ from a particular object?
2. Why should a check be performed before a data member changes?
3. In what order are data members initialized?
4. What happens if a constructor throws an exception?
5. When is an explicit constructor needed?
6. What promise does a const member function make?
7. What are this and mutable for?
8. How does a static data member differ from an ordinary one?
9. What belongs in a header, and what belongs in a .cpp file?
10. When is a struct more appropriate than an encapsulated class?
11. Why can a setter for every data member make an interface worse?
12. What does the created counter count in the order example?
13. How do you check that a rejection leaves the state unchanged?
14. Why does unique_ptr remove the need for a manual delete?
15. What rules apply to designated initialization of an aggregate?

## Useful links

- <https://learn.microsoft.com/cpp/cpp/classes-and-structs-cpp>
- <https://learn.microsoft.com/cpp/cpp/constructors-cpp>
- <https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines>
