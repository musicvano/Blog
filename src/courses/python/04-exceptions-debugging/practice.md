---
title: "Practice"
description: "Topic 4. Exceptions and debugging: worked examples"
outline: [2, 3]
sourceHash: "4145f6764716331e549a4ab5cfe8d01a4f19213f253ab85ef806cfa2fc37af4f"
---

# Practice

## Example 1. A division calculator

Write a program that reads two real numbers, calculates their quotient, and reports that the attempt has finished regardless of the result. Invalid format and division by zero must have different messages. Reject infinities and NaN; also check that the result is finite, since a very large quotient can overflow `float`.

```py
import math


def divide(left: str, right: str) -> float:
    a = float(left)
    b = float(right)
    if not (math.isfinite(a) and math.isfinite(b)):
        raise ValueError("finite numbers are required")
    result = a / b
    if not math.isfinite(result):
        raise OverflowError("result is too large")
    return result


left = input("Dividend: ")
right = input("Divisor: ")
try:
    result = divide(left, right)
except ValueError as error:
    print("Input error:", error)
except ZeroDivisionError:
    print("Division by zero is not allowed")
except OverflowError:
    print("Result does not fit in float")
else:
    print(f"Quotient: {result:.4f}")
finally:
    print("Attempt finished")
```

For input `7`, `2`:

```
Dividend: 7
Divisor: 2
Quotient: 3.5000
Attempt finished
```

For input `7`, `0`, the message “Division by zero is not allowed” replaces the quotient. The completion line remains. Also test `abc`, `nan`, and `inf`; for overflow, use `1e308`, `1e-308`. Here `finally` demonstrates execution order; it does not turn an incorrect result into a correct one.

## Example 2. Parsing a calendar date

Read a date in `DD.MM.YYYY` format, validate it, and print its ISO representation. Represent an invalid date as a custom `DateInputError`, preserving the original cause. Record the full traceback in `dates.log`; show the user a brief explanation.

The `datetime.strptime` method parses a string using `%d.%m.%Y`: day, month, year. It checks the calendar but permits some fields without a leading zero. An additional shape check ensures exactly ten characters and ASCII digits. `date()` returns only the date, and `isoformat()` returns `YYYY-MM-DD`. Documentation: <https://docs.python.org/3.14/library/datetime.html#datetime.datetime.strptime>.

```py
import logging
from datetime import date, datetime

logging.basicConfig(filename="dates.log", encoding="utf-8",
                    level=logging.INFO,
                    format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)


class DateInputError(Exception):
    pass


def parse_date(text: str) -> date:
    try:
        digits = text[:2] + text[3:5] + text[6:]
        if (len(text) != 10 or text[2] != "."
                or text[5] != "." or not digits.isascii()
                or not digits.isdecimal()):
            raise ValueError("incorrect format")
        return datetime.strptime(text, "%d.%m.%Y").date()
    except ValueError as error:
        message = "a valid DD.MM.YYYY date is required"
        raise DateInputError(message) from error


text = input("Date: ")
try:
    result = parse_date(text)
except DateInputError as error:
    logger.exception("Date rejected")
    print("Error:", error)
else:
    print("ISO:", result.isoformat())
    logger.info("Date accepted")
```

```
Date: 29.02.2024
ISO: 2024-02-29
```

For `29.02.2025`:

```
Date: 29.02.2025
Error: a valid DD.MM.YYYY date is required
```

The log contains two chained exceptions: the calendar `ValueError` and our `DateInputError`. The exact standard calendar-error message may depend on the Python version. Validation starts with length: a short string never reaches indices `2` and `5` because `or` short-circuits. Slices of short strings are safe. Also test an empty string, `1.02.2024`, `31.04.2026`, and `01.01.0001`. Changing the format requires changing both the contract and validation.

## Example 3. Debugging a scholarship calculation

Use a **hypothetical learning rule**: a mean grade of 90 or above earns 2000 units, from 75 to 90 earns 1500, and below 75 earns 0. These are test constants for the problem. Find the program's error, then check both interval boundaries.

The following code is deliberately incorrect: the second `if` has its own `else` and can overwrite the value already calculated.

```py
def scholarship(score: int) -> int:
    if not 0 <= score <= 100:
        raise ValueError("score outside 0..100")
    amount = 0
    if score >= 90:
        amount = 2000
    if score >= 75:
        amount = 1500
    else:
        amount = 0
    return amount


for score in (74, 75, 89, 90, 100):
    print(score, scholarship(score))
```

Actual incorrect output:

```
74 0
75 1500
89 1500
90 1500
100 1500
```

Set a conditional breakpoint on the second `if`: `score == 90`. Before the line runs, `amount` is 2000; after its branch runs, it is 1500. Hypothesis: the second check should belong to the same chain. Replace only the second `if` with `elif`. Running again gives:

```
74 0
75 1500
89 1500
90 2000
100 2000
```

During the defense, explain why `try`/`except` would not find this error: all operations are valid for their types, but the result contradicts the problem. Also test 0, 100, −1, and 101; the last two must still raise `ValueError` after the fix.
