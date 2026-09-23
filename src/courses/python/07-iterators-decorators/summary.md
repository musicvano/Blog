---
title: "Summary"
description: "Topic 7. Generators and decorators: conclusions and review questions"
sourceHash: "0bdbc99a5b6c1490254535f9ec1b85ab67d11f7a7f06b9a74cb8099ebc443489"
---

# Summary

## Conclusions

An iterator separates obtaining the next element from processing it. A generator implements this contract with `yield`, while `itertools` combines ready-made traversal patterns. A lambda suits a short local rule; a decorator suits shared behavior around a call. In both cases, readability and an explicit contract matter more than reducing the line count.

## Self-check questions

1. How does an iterable differ from an iterator?
2. Who handles `StopIteration` in a `for` loop?
3. When does a generator function's body start executing?
4. What state is preserved after `yield`?
5. What do `yield from`, `send`, and `close` do?
6. Why might summing a generator a second time give zero?
7. How does `takewhile` differ from `filter`?
8. When is sorting before `groupby` necessary, and when is it harmful?
9. How does `batched` handle an incomplete final batch?
10. What does `sys.getsizeof` actually measure?
11. Why might a closure in a loop see the final value?
12. How do you choose between `map`, a comprehension, and `reduce`?
13. When is a decorator applied, and when does its wrapper execute?
14. Why are `wraps` and `ParamSpec` needed?
15. How does decorator order change retries and timing?

## Useful links

1. Functional programming tools: <https://docs.python.org/3.14/howto/functional.html>.
2. Iterators: <https://docs.python.org/3.14/library/itertools.html>.
3. Decorators and caching: <https://docs.python.org/3.14/library/functools.html>.
4. Operations as functions: <https://docs.python.org/3.14/library/operator.html>.
