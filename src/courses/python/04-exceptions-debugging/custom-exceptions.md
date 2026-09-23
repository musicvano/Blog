---
title: "Custom exceptions and exception groups"
description: "Topic 4. Exceptions and debugging: Custom exceptions and exception groups"
outline: [2, 3]
sourceHash: "3c9d1317929d1b2aebe0b846e54367c1f40408ceac752080ba9cbe7e4dd2e9aa"
---

# Custom exceptions and exception groups

## Custom exceptions and responsibility boundaries

A minimal class is enough to give a problem a meaningful name: `class InsufficientFundsError(Exception):` followed by an indented `pass`. `Exception` in parentheses is the base class; `pass` means no additional action. The full class mechanism is covered in Topic 8. Here, we only need a separate type that can be raised and caught.

Build a custom hierarchy around the actions handlers take. If insufficient funds and a closed account both end a transfer in the same way, a base `PaymentError` can group them. However, an incorrect password should not be called `ValueError` merely because it is also an “invalid value”: a domain-specific name explains which operation failed.

### Example 2. A learning model of a bank account

The balance and debit amount are integer kopiykas. The function does not change the balance before all checks finish and returns a new balance. Nonnumeric input becomes a `PaymentError` with its cause retained; insufficient funds has a separate type. This is an arithmetic model, rather than an implementation of a banking system.

```py
import logging

logging.basicConfig(level=logging.INFO,
                    format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)


class PaymentError(Exception):
    pass


class InsufficientFundsError(PaymentError):
    pass


def debit(balance: int, text: str) -> int:
    try:
        amount = int(text)
    except ValueError as error:
        raise PaymentError("amount must be an integer") from error
    if amount <= 0:
        raise PaymentError("amount must be positive")
    if amount > balance:
        raise InsufficientFundsError("insufficient funds")
    return balance - amount


balance = 5000
for text in ("1200", "4000", "abc"):
    try:
        balance = debit(balance, text)
    except InsufficientFundsError as error:
        logger.warning("Rejected: %s", error)
    except PaymentError as error:
        logger.error("Rejected: %s", error)
    else:
        logger.info("Balance: %s kopiykas", balance)
```

```
INFO: Balance: 3800 kopiykas
WARNING: Rejected: insufficient funds
ERROR: Rejected: amount must be an integer
```

After both rejections, the balance is 3800. Assignment to the left of the call occurs only after it returns successfully. For `abc`, the cause has type `ValueError`, although the final handler sees `PaymentError`. To include the entire chain in the developer log, replace the last `logger.error` with `logger.exception` inside the handler. Do not log passwords or payment details.

## Exception groups and notes

An ordinary `raise` stops validation at the first error. For a form with several independent fields, showing all problems at once is more convenient. `ExceptionGroup` combines a nonempty sequence of exceptions; `except*` selects subgroups by type. Unlike ordinary `except`, several `except*` handlers can run for one group. The unhandled portion propagates upward.

We will use a list here: `[]` creates an empty mutable collection of elements, `append` adds one element, and `len` counts them. `if errors` is true for a nonempty list. Collection classes will be covered in more detail later; comprehensions and complex transformations are unnecessary for this example.

### Example 3. A participant form

The example form contains a name and an age from 16 to 100. An empty name, a nonnumeric age, and an out-of-range age are independent rules. The `add_note` method adds a string note to the error; the standard traceback shows it after the message. A note does not change the exception type.

```py
def validate(name: str, age_text: str) -> None:
    errors: list[Exception] = []
    if not name.strip():
        error = ValueError("name is empty")
        error.add_note("Field: name")
        errors.append(error)
    try:
        age = int(age_text)
        if not 16 <= age <= 100:
            raise ValueError("age outside 16..100")
    except ValueError as error:
        error.add_note("Field: age")
        errors.append(error)
    if errors:
        raise ExceptionGroup("Form rejected", errors)


try:
    validate(" ", "12")
except* ValueError as group:
    print("Errors:", len(group.exceptions))
    for error in group.exceptions:
        print(error)
        for note in error.__notes__:
            print(note)
```

```
Errors: 2
name is empty
Field: name
age outside 16..100
Field: age
```

This example's group is flat and every element has notes, so direct access to `__notes__` is justified. In general, groups can be nested, and an arbitrary exception may lack this attribute. General traversal requires checking the structure, which is not required here. `validate("Olena", "20")` completes without an exception.

You cannot mix `except` and `except*` in one construct. `return`, `break`, and `continue` are not allowed directly in an `except*` body. A group does not start parallel execution: the checks in the example run sequentially. Official description: <https://docs.python.org/3.14/tutorial/errors.html#raising-and-handling-multiple-unrelated-exceptions>.
