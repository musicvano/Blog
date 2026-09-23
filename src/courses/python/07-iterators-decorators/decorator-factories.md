---
title: "Parameterized decorators"
description: "Topic 7. Generators and decorators: parameterized decorators"
outline: [2, 3]
sourceHash: "68396b94a8280c4c10379b51b17e4a9cfa5927a0e44aa7d77a2a3901b90d8417"
---

# Parameterized decorators

## Parameterized decorators, retries, and timing

`@retry(times=3)` first calls a decorator factory, then the resulting decorator wraps the function. Three levels are needed: policy parameters, the original function, and call arguments. Do not retry every `Exception`: a programmer error or invalid argument does not become valid on the next attempt.

Below, only `TimeoutError` is retried; randomness is unnecessary. The first two calls fail in a controlled way. The timer covers all attempts because it is outermost. Time is measured with `perf_counter`, but only its nonnegativity is printed for reproducible output. This is not an algorithm performance measurement.

```py
from collections.abc import Callable
from functools import wraps
from time import perf_counter
from typing import ParamSpec, TypeVar

P = ParamSpec("P")
R = TypeVar("R")


def retry(times: int) -> Callable[[Callable[P, R]], Callable[P, R]]:
    if times < 1:
        raise ValueError("At least one attempt is required")
    def decorate(func: Callable[P, R]) -> Callable[P, R]:
        @wraps(func)
        def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except TimeoutError:
                    print("Failed attempt:", attempt)
                    if attempt == times:
                        raise
            raise AssertionError("Unreachable branch")
        return wrapper
    return decorate


def timer(func: Callable[P, R]) -> Callable[P, R]:
    @wraps(func)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
        started = perf_counter()
        try:
            return func(*args, **kwargs)
        finally:
            elapsed = perf_counter() - started
            print(func.__name__, "time >= 0:", elapsed >= 0)
    return wrapper


attempts = 0


@timer
@retry(times=3)
def fetch() -> str:
    global attempts
    attempts += 1
    if attempts < 3:
        raise TimeoutError("Simulated failure")
    return "ready"


print(fetch())
```

```
Failed attempt: 1
Failed attempt: 2
fetch time >= 0: True
ready
```

The global counter here is a controlled source simulator. In application code, pass state explicitly or hide it in a factory. Reversing the decorators prints timing for each attempt, including failed ones. Retrying an operation is safe only if it does not duplicate an irreversible action. This learning example makes no network requests or payments.

::: info Screenshot
Run fetch example. Show two failures, timer check, ready result; no invented timings.
:::

Figure 7.6. Controlled retries and a timer message {.caption}

### Caching results

`cache` does not limit the number of stored results; `lru_cache` with `maxsize` removes the least recently used entries when full. Arguments must be hashable. A cache is useful for a pure computation but hides a needed side effect if applied to a function that prints or changes external state. <https://docs.python.org/3.14/library/functools.html>.

```py
from functools import lru_cache


@lru_cache(maxsize=4)
def square(value: int) -> int:
    return value * value


print(square(5), square(5), square(6))
info = square.cache_info()
print(info.hits, info.misses, info.currsize)
square.cache_clear()
print(square.cache_info().currsize)
```

```
25 25 36
1 2 2
0
```

A cache has no automatic expiration. Changing data requires explicit clearing, a version key, or a separate lifetime policy. Do not cache a generator object: a repeated call may receive the same already exhausted generator. For small amounts of data, you can cache an immutable tuple of results and create a new iterator over it each time.

## Debugging and common mistakes

Stop a generator at the `yield` line and observe local values. The consumer's next request resumes execution after `yield`, not from the beginning of the function. Test generator creation and the first request separately: input validation may raise an exception on the first `next`. In PyCharm, examine the source frame and consumer frame, not just the last printed number.

Do not modify a list during traversal without a clearly designed algorithm. For repeated reading, do not return a single global iterator. Do not store `groupby` group objects for later traversal without materializing them. Do not call sorting a constant-memory streaming operation. In a decorator, check `__name__`, the return value, keyword argument forwarding, and exception propagation.

A test for an infinite source must include a consumption limit. For batches, test zero elements, an exact multiple, and a short tail. For groups, test a key recurring after another key. For a cache, test first and repeated calls after clearing. Such a set demonstrates specific behavior, whereas one successful large run may hide most errors.
