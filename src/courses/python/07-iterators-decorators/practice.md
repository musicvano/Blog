---
title: "Practice"
description: "Topic 7. Generators and decorators: worked examples"
outline: [2, 3]
sourceHash: "3ccea21a5b9e850fa085948cc97b27bbeff8ac22f4886540d94fea0b67db2002"
---

# Practice

## Example 1. Prime numbers in batches

Build a generator of prime numbers no greater than a given limit. The allowed range is 0..100000. A separate generator combines results for several limits using `yield from`; duplicates between ranges are intentional here. For printing, split the stream into tuples of four numbers.

```py
from collections.abc import Iterable, Iterator
from itertools import batched
from math import isqrt


def primes(limit: int) -> Iterator[int]:
    if not 0 <= limit <= 100_000:
        raise ValueError("Limit outside 0..100000")
    for number in range(2, limit + 1):
        if all(number % d for d in range(2, isqrt(number) + 1)):
            yield number


def sources(limits: Iterable[int]) -> Iterator[int]:
    for limit in limits:
        yield from primes(limit)


for batch in batched(sources([10, 5]), 4):
    print(*batch)
```

```
2 3 5 7
2 3 5
```

For the number 2, the divisor range is empty; `all` returns `True`, so the number is correctly considered prime. For a limit of 0 or 1, the stream is empty. The full result is not stored in a list; `batched` retains at most one batch. For strictly equal-length rows, you can choose `strict=True`, but the final short row will then be an error rather than an ordinary part of the report.

## Example 2. Moving average

For a stream of measurements, calculate the average of every full window of length `width`. No result is yielded until enough elements are available. `deque(maxlen=width)` automatically removes the oldest element. In this learning implementation, the window sum is recalculated; the complexity per result is proportional to the width.

```py
from collections import deque
from collections.abc import Iterable, Iterator
from itertools import accumulate
from math import isfinite


def moving_average(values: Iterable[float],
                   width: int) -> Iterator[float]:
    if width < 1:
        raise ValueError("Width must be positive")
    window: deque[float] = deque(maxlen=width)
    for value in values:
        if not isfinite(value):
            raise ValueError("Finite measurements are required")
        window.append(value)
        if len(window) == width:
            yield sum(window) / width


values = [2.0, 4.0, 6.0, 8.0]
print(list(moving_average(values, 3)))
print(list(accumulate(values)))
print(list(moving_average(values, 5)))
```

```
[4.0, 6.0]
[2.0, 6.0, 12.0, 20.0]
[]
```

The running sums from `accumulate` are not moving sums: they include all previous values. A more efficient implementation can maintain a current sum and subtract an element before removing it; separately test width 1, an exact window length, and an empty source.

## Example 3. Call log

Create a decorator factory that accepts a logging level, counts call attempts, and logs the function name and number. The counter belongs to the closure of a particular wrapped function. A failed call is also counted because an attempt occurred; the exception propagates outward. stdout is used to make the order of log messages and results explicit.

```py
import logging
import sys
from collections.abc import Callable
from functools import wraps
from typing import ParamSpec, TypeVar

P = ParamSpec("P")
R = TypeVar("R")
logging.basicConfig(level=logging.INFO, stream=sys.stdout,
                    format="%(levelname)s:%(message)s", force=True)


def logged(level: int
           ) -> Callable[[Callable[P, R]], Callable[P, R]]:

    def decorate(func: Callable[P, R]) -> Callable[P, R]:
        calls = 0

        @wraps(func)
        def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
            nonlocal calls
            calls += 1
            logging.log(level, "%s #%s", func.__name__, calls)
            return func(*args, **kwargs)
        return wrapper
    return decorate


@logged(logging.INFO)
def discount(total: int, *, percent: int = 10) -> float:
    if total < 0 or not 0 <= percent <= 100:
        raise ValueError("Invalid amount or percentage")
    return total * (100 - percent) / 100


print(discount(200))
print(discount(100, percent=20))
print(discount.__name__)
```

```
INFO:discount #1
180.0
INFO:discount #2
80.0
discount
```

The `DEBUG` level would not be printed under the current configuration, but the counter would still increase. This is correct because it counts attempts, not visible messages. The log does not need passwords, tokens, or other data that does not help check the exercise.
