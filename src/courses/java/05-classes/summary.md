---
title: "Summary"
description: "Topic 5. Classes and objects: conclusions and review questions"
sourceHash: "40f01d0067747b38c4f265a464cc566026888ac0281d0476c1b595b3ae95ed8d"
---

# Summary

## Conclusions

A class defines controlled creation and modification of state. Private fields, validated constructors, and domain methods reduce the number of places where an invariant can be violated. Packages organize names, static members express shared properties, and immutability and defensive copies make dependencies between objects easier to reason about.

## Self-check questions

1. How does a class differ from an instance?
2. What values do fields have before explicit initialization?
3. Why does copying a reference not copy the object?
4. When does the compiler add a default constructor?
5. What can be checked before this or super in JDK 27?
6. Why should not every field have a setter?
7. When should a field be static?
8. Why does a final reference not guarantee deep immutability?
9. Which root must be passed in the classpath?
10. What information should a Javadoc contract contain?
