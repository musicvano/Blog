---
title: "Validation, resources, and logging"
description: "Topic 4. Exceptions and debugging: Validation, resources, and logging"
outline: [2, 3]
sourceHash: "b0c1e1e4ffb49c64a87899cc995d40ae88043eb202f795a497e4b29a10ad3ebb"
---

# Validation, resources, and logging

## Validation, invariants, and resource cleanup

**LBYL** (*look before you leap*) means checking a condition before acting. For example, check that a quantity is positive before calculating. **EAFP** (*easier to ask forgiveness than permission*) means trying an operation and handling an expected failure. `int(text)` with `except ValueError` is an example of EAFP. These approaches complement each other: valid numeric format does not guarantee an allowed range, and an allowed range does not explain how to read a number.

For resources, checking beforehand is insufficient: another process may delete a file between checking its existence and opening it. Handle errors when opening it. The `with` construct invokes the resource's exit protocol; for a file, this ensures closure even when reading fails. Files and context managers are covered in later topics.

`contextlib.suppress(FileNotFoundError)` suits a narrow case: an optional temporary file being absent during deletion is acceptable. Do not suppress `Exception` around a calculation that must produce a result. The absence of a message does not mean success. Reference: <https://docs.python.org/3.14/library/contextlib.html#contextlib.suppress>.

An **invariant** is a property that an algorithm must preserve, such as a nonnegative processed-element count. `assert condition` checks this developer assumption and raises `AssertionError` if it is false. Running with `-O` removes `assert` checks. Therefore, input, access-right, or financial-limit checks must use `if` and an appropriate `raise`.

```py
def checked_square(number: int) -> int:
    if number < 0:
        raise ValueError("a nonnegative number is required")
    result = number * number
    assert result >= 0, "square invariant violated"
    return result


print(checked_square(7))
```

```
49
```

Compare a normal run with `python -O square.py`: `-1` should raise `ValueError` in both modes. Do not perform necessary actions inside `assert`, such as calling a file-writing function: optimization removes the action too.

::: tip Cleanup mistake
A `return` inside `finally` may override the previous result and even suppress an exception. Python 3.14 warns about such exits with `SyntaxWarning`. Release resources in `finally` and leave the result decision to the main algorithm.
:::

## Event logging

`print` is primarily for results and user dialogue. The `logging` module records diagnostic events with severity levels. `DEBUG` contains calculation details, `INFO` ordinary events, `WARNING` an unusual but acceptable state, `ERROR` a failed operation, and `CRITICAL` a serious application failure. Level `INFO` filters out `DEBUG` but admits the other listed levels.

`getLogger(__name__)` creates or returns a logger for the current module. Configure `basicConfig` once at program startup. Usually, this call changes nothing if the root logger already has handlers. When learning, run each example in a separate process so earlier interactive-console configuration does not affect the result. Reference: <https://docs.python.org/3.14/howto/logging.html>.

The following parameters are enough for a file. This code creates `events.log` in the current working directory, appending messages on later runs. `encoding="utf-8"` preserves Ukrainian characters.

```py
import logging

logging.basicConfig(filename="events.log", encoding="utf-8",
                    level=logging.INFO,
                    format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)
logger.debug("Calculation details")
logger.info("Validation started")
try:
    int("abc")
except ValueError:
    logger.exception("Could not read a number")
```

This example prints nothing to the screen. The file contains `INFO`, `ERROR`, and a traceback ending in `ValueError`; there is no `DEBUG` line. Call `logger.exception` while handling an exception: it adds the current diagnostic information to an `ERROR` message. `logger.error("...")` without `exc_info` prints only the message.

Using `%s` and separate arguments in a log message is convenient: `logger.info("Balance: %s", balance)`. This lets the logger defer formatting. A log explains what happened but does not change control flow: after `logger.error`, the program continues unless you separately raise an exception or end the action.
