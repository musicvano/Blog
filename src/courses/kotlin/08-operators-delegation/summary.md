---
title: "Summary"
description: "Topic 8. Operations and delegation: conclusions and review questions"
sourceHash: "bda547d7d9addce9ea82134b0d975fa4425ed3c2280946b208df84ae0c09a662"
---

# Summary

## Conclusions

Operator conventions make your own type natural in expressions, as long as the symbol keeps its expected semantics. Delegates separate out repetitive access logic, and interface delegation supports composition. For every mechanism, what matters is the moment of execution, the owner of the state, and a verified contract.

## Self-check questions

1. Why does operator not let you invent a new symbol?
2. How does plusAssign differ from plus with assignment?
3. Why does compareTo==0 not always mean equals?
4. On which object is contains called for `x in a`?
5. Which methods are needed to iterate over a range repeatedly?
6. What do getValue and setValue receive?
7. When does lazy call the initializer again?
8. How does the moment of observable differ from that of vetoable?
9. What is provideDelegate for?
10. Why does an internal call of the delegate bypass the wrapper's override?
