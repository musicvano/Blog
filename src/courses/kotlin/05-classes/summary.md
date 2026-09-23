---
title: "Summary"
description: "Topic 5. Classes and objects: conclusions and review questions"
sourceHash: "d36bcdc2e5ebc04f89e9b9e74dd210c350f54dceadea9a4b6557690c13143a06"
---

# Summary

## Conclusions

A class defines a validated way to create and change state. Constructors ensure consistent initial data, properties separate access from storage, and visibility modifiers restrict where changes can occur. Packages organize names; nested types express a local relationship. A model's quality is determined by its contract and checks, not by the number of classes written.

## Self-check questions

1. Why does `val` not guarantee object immutability?
2. How does a constructor parameter differ from a property?
3. In what order do `init` and a secondary constructor execute?
4. Why must an initial value be checked separately from the setter?
5. When is `field` needed, and when is a field unnecessary?
6. What risk does reading an uninitialized `lateinit` create?
7. How does a module differ from a package?
8. When should a nested class be `inner`?
9. What should be checked after a method fails?
10. How will the class look in UML and to a Java client?
