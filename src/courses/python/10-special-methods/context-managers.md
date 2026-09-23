---
title: "Context managers"
description: "Topic 10. Special methods, dataclass: Context managers"
outline: [2, 3]
sourceHash: "81225c61f2bc9b489a507035cc7bfb70d29a963a67757dd7d2ac4bb8d86d334a"
---

# Context managers

## Context managers

The `with` statement is used for actions that must occur in pairs: open and close, start and finish measuring. `__enter__` performs entry and returns the value for `as`. `__exit__` receives the exception type, its object, and the traceback, or three `None` values if the body completed normally. A true result from `__exit__` suppresses the exception; `False` or `None` propagates it. An accidental `return True` can hide a program failure.

### Example 3. A timer in a context

Actual time depends on the computer, so we will print a check that the duration is nonnegative rather than invent a stable number of milliseconds. `perf_counter` measures intervals, not calendar dates. Exceptions from the timer's body are not suppressed.

```py
from time import perf_counter
from types import TracebackType


class Timer:
    def __init__(self) -> None:
        self.started = 0.0
        self.elapsed = 0.0

    def __enter__(self) -> "Timer":
        self.started = perf_counter()
        return self

    def __exit__(self, kind: type[BaseException] | None,
                 error: BaseException | None,
                 trace: TracebackType | None) -> bool:
        self.elapsed = perf_counter() - self.started
        return False


with Timer() as timer:
    total = sum(range(1000))
print(total, timer.elapsed >= 0)
```

```
499500 True
```

This timer is not designed for nested reentry into the same instance: the second entry overwrites the start time. Create separate objects for nested measurements. If an error occurs in `__enter__`, `__exit__` is not called for that entry, so a partially acquired resource must be cleaned up directly during entry.

An alternative is `@contextmanager` from `contextlib`: code before `yield` performs setup, and code in `finally` after `yield` performs cleanup. The generator must yield exactly once. An exception from the body is delivered at the `yield` point; if you catch it without reraising it, it will be suppressed. Reference: <https://docs.python.org/3.14/library/contextlib.html#contextlib.contextmanager>.

### Checking cleanup after an exception

A short context can be described with a generator function. In the following program, the event log is an ordinary list: it lets us check the exact order of setup, work, and cleanup without depending on time or the file system. The final event is added in `finally`, so it is recorded even after an error in the `with` body.

```py
from collections.abc import Iterator
from contextlib import contextmanager


@contextmanager
def tracked(events: list[str]) -> Iterator[None]:
    events.append("enter")
    try:
        yield
    finally:
        events.append("exit")


events: list[str] = []
try:
    with tracked(events):
        events.append("work")
        raise ValueError("intentional failure")
except ValueError:
    events.append("handling")
print(" -> ".join(events))
```

```
enter -> work -> exit -> handling
```

The order proves two properties: context cleanup occurred before the outer handler, and the exception did not disappear. If the generator caught `ValueError` at `yield` without another `raise`, the “handling” event would be absent. Allow such behavior only for a specific documented exception, as in a specialized context that suppresses an optional error.

One `tracked` factory can create many separate contexts, but an already used generator context object should not be reopened. Call `tracked(events)` anew in each `with`. This separates a single entry's lifecycle from the factory configuration. For a real resource, acquisition and release operations would replace event appends. Testing the error path is essential: a successful run alone does not test the cleanup guarantee.
