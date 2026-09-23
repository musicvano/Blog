---
title: "Summary"
description: "Topic 7. Data classes, enums, sealed: conclusions and review questions"
sourceHash: "b7960ff1b5b85e923dc3702a74f6b75da5eb4e0badaaa08efba1a789fdc229b5"
---

# Summary

## Conclusions

Special class forms help express data structure and valid states. A data class supports value operations, enum describes constants, and sealed describes alternatives with different data. Object and companion define access and creation, while a value class distinguishes meaningful identifiers.

## Self-check questions

1. Which properties participate in data class generation?
2. Why is copy not a deep copy?
3. How does constructor order relate to destructuring?
4. Why is ordinal unsuitable for a stable code?
5. When is enum insufficient and a sealed type needed?
6. What are the limits of a sealed hierarchy's closed nature?
7. Why is an exhaustive when useful when extending a model?
8. Does thread-safe object initialization make all its methods safe?
9. How does a companion differ from an instance of the class?
10. How does a value class differ from a typealias?
