---
title: "Comparison, hashing, and containers"
description: "Topic 10. Special methods, dataclass: Comparison, hashing, and containers"
outline: [2, 3]
sourceHash: "9a2c548cd3c69cb56ac1d9e04b809c136e2b82010b2338858a6cf36cd63fcbfd"
---

# Comparison, hashing, and containers

## Equality, ordering, and hashing

`__eq__` defines equality, and `__lt__` defines “less than.” The other rich comparisons are `__le__`, `__gt__`, `__ge__`, and `__ne__`. For an unknown type, return `NotImplemented` rather than `False`: the other operand may know how to perform the comparison. If both types decline equality, Python falls back to an identity check; there is no such general convention for ordering.

The `functools.total_ordering` decorator builds missing ordering operations from `__eq__` and one ordering method, usually `__lt__`. This reduces duplication but does not fix incorrect logic in the underlying methods. Reference: <https://docs.python.org/3.14/library/functools.html#functools.total_ordering>.

If `a == b`, their hashes must match. The reverse is not true: different values can have the same hash. A hash value must remain constant while the object is in a set or dictionary. An object whose equality fields can change should therefore not be a key. Overriding `__eq__` in an ordinary class without `__hash__` usually makes it unhashable.

### Example 2. Money as an immutable value

The amount is stored in `Decimal`, and the currency as a string code. Ordering comparisons are allowed only within one currency; there is no automatic conversion. Create `Decimal` from text rather than `float`. This example does not require rounding: the contract allows any finite decimal amount, while the representation displays two decimal places.

```py
from dataclasses import dataclass
from decimal import Decimal
from functools import total_ordering
from types import NotImplementedType


@total_ordering
@dataclass(frozen=True)
class Money:
    amount: Decimal
    currency: str = "UAH"

    def __post_init__(self) -> None:
        if not self.amount.is_finite():
            raise ValueError("nonfinite amount")
        if self.currency not in ("UAH", "EUR"):
            raise ValueError("unknown currency")

    def __lt__(self, other: object) -> bool | NotImplementedType:
        if not isinstance(other, Money):
            return NotImplemented
        if self.currency != other.currency:
            raise ValueError("currencies do not match")
        return self.amount < other.amount

    def __str__(self) -> str:
        return f"{self.amount:.2f} {self.currency}"


a = Money(Decimal("10.00"))
b = Money(Decimal("12.50"))
print(a, a < b, a <= a)
print(len({a, Money(Decimal("10.0")), b}))
```

```
10.00 UAH True True
2
```

`dataclass` generated equality based on both fields and, thanks to `frozen`, a compatible hash. `10.00` and `10.0` are equal as `Decimal` values, so the set has two elements. Different currencies are unequal even if the amounts match. A complete money type defines scale, rounding, and permitted signs separately; hidden conversion in `__add__` would make a simple operation depend on an external exchange rate.

## The container protocol and callable objects

`__getitem__` receives an index or a `slice` object. A slice stores `start`, `stop`, and `step`, some of which may be `None`. For a container built on a list, passing the index to that list is convenient: it already handles negative indices, slices, and `IndexError` correctly. Define what a slice returns: a list or a new instance of your type. The sequence `[start:stop]` excludes `stop`.

`__contains__` implements `in`; without it, iteration may be used. `__iter__` must return an iterator, not an arbitrary list. Calling `iter(self._items)` gives each loop an independent traversal. If the container itself returns `self` and maintains a single index, nested loops may interfere with each other. A separate iterator needs `__next__`, which raises `StopIteration` when finished.

`__setitem__` and `__delitem__` are needed only for a mutable container. Supporting reading does not require supporting writing. For example, a results archive can allow indexing and iteration but prohibit deletion. Do not return an internal mutable list directly if external code must not bypass the container's checks.

A callable object implements `__call__`. It is useful when you need to store settings along with a calculation rule. For example, an instance representing a linear function stores coefficients and calculates values.

```py
from dataclasses import dataclass


@dataclass(frozen=True)
class Linear:
    a: float
    b: float

    def __call__(self, x: float) -> float:
        return self.a * x + self.b


rule = Linear(2, 3)
print(rule(4), rule(-1))
```

```
11 1
```

An operation should remain meaningful. The `__call__` method should not unexpectedly delete a file or terminate the process if the object looks like a mathematical function. Consistency with user expectations is part of interface quality.
