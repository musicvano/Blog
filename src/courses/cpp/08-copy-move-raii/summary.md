---
title: Summary
description: "Topic 8. Copy, Move, RAII: conclusions and review questions"
sourceHash: "c1dbc3d8e09e57f69905630c86e8307180c99992b19f37142435888343ed97c5"
---

# Summary

## Conclusions

An owner is responsible for releasing a resource exactly once. Copying and moving have different contracts for the source. RAII ties cleanup to the lifetime of an object. The rule of zero separates the model from manual ownership.

## Self-check questions

1. How does copying an address differ from copying a value?
2. When is the copy constructor called, and when is assignment called?
3. Why does std::move not transfer a resource by itself?
4. What does noexcept promise?
5. What state can you expect from a moved-from string?
6. Why is a named T&& parameter an lvalue expression?
7. How does copy-and-swap provide the strong guarantee?
8. How does NRVO differ from guaranteed copy elision?
9. Why can return std::move(local) prevent NRVO?
10. Which special member functions does the rule of five cover?
11. When should copying be explicitly deleted?
12. Why must a guard not outlive the state it protects?
13. How do you test self-move?
14. Why does an empty buffer need a separate branch?
15. What properties does an ordinary assert test not prove?

## Useful links

- <https://learn.microsoft.com/cpp/cpp/move-constructors-and-move-assignment-operators-cpp>
- <https://learn.microsoft.com/cpp/cpp/constructors-cpp>
- <https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines>
