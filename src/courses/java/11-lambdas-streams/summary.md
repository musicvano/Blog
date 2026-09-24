---
title: "Summary"
description: "Topic 11. Lambdas and the Stream API: conclusions and review questions"
sourceHash: "d25160bc21b720e291c53d35326cfd327933f2f920efb50036694d7fc5b3fa45"
---

# Summary

## Conclusions

A lambda expression implements a functional interface, and its type is determined by the target context. The standard `java.util.function` interfaces describe common forms of behavior, their composition builds new conditions and transformations, and method references and `Comparator.comparing` concisely express delegation and ordering. `Optional` explicitly marks the absence of a result but does not replace an empty collection or a domain error. A stream connects a source, lazy intermediate operations, and a terminal operation, and it is not reused. The order of operations changes the meaning of the result, `reduce` requires an associative operation with a neutral identity value, and mutable accumulation, grouping, and partitioning are done by collectors. Primitive streams avoid boxing, and Gatherers from JDK 24 add stateful intermediate operations, including sliding windows. A parallel stream does not guarantee a speedup and is incompatible with shared mutable state. A pipeline is tested by its observable result and by an independent loop-based implementation, and when the policy is complex, an ordinary loop may be clearer.

## Review questions

1. Where does a lambda get the types of its parameters?
2. How does andThen differ from compose?
3. Why can orElse do unnecessary work?
4. Which operation starts a pipeline?
5. How does takeWhile differ from filter?
6. What policy do duplicate keys in toMap require?
7. What does windowSliding return for a short source?
8. Why doesn't parallelStream automatically fix a slow algorithm?

## Useful links

- <https://dev.java/learn/lambdas/>.
- <https://dev.java/learn/api/streams/>.
- <https://openjdk.org/jeps/485>.
- <https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherers.html>.
