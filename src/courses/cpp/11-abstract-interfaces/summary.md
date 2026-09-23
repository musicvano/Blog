---
title: Summary
description: "Topic 11. Abstract Classes, Interfaces: conclusions and review questions"
sourceHash: "64074f59b93a103ae10b93283c5ee17e060d2ef3f797606305606a5fbf7c26b0"
---

# Summary

## Conclusions

An interface describes a capability that the client needs. Composition combines a context with a variable algorithm. A shared virtual base removes the duplicated state of a diamond. The lifetime of non-owning links is part of the contract.

## Self-check questions

1. What makes a class abstract?
2. Why does a pure virtual destructor need a definition?
3. Who initializes a virtual base?
4. How does virtual inheritance differ from a virtual method?
5. How does NVI guarantee a shared check?
6. Can a private virtual method be overridden?
7. What problems do a qualified name and using solve?
8. When are several interfaces better than one large one?
9. Who owns the strategy in the Order example?
10. What is the risk of subscribing through a raw pointer?
11. What happens to redo after a new command?
12. How do you prepare the history for a possible allocation exception?
13. What is a mixin, and what name risks does it add?
14. Why does a layout diagram not allow reinterpret_cast between roles?
15. When should you choose static polymorphism, and when dynamic polymorphism?

## Useful links

- <https://learn.microsoft.com/cpp/cpp/abstract-classes-cpp>
- <https://learn.microsoft.com/cpp/cpp/multiple-base-classes>
- <https://isocpp.org/wiki/faq/multiple-inheritance>
