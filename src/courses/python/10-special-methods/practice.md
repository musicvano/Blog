---
title: "Practice"
description: "Topic 10. Special methods, dataclass: worked examples"
outline: [2, 3]
sourceHash: "2332ad8ed32c653e577c608b9ad880ae9bbd3227a9e6f9b8082e7a4642faf6b5"
---

# Practice

## Example 1. Rational fractions

Implement an immutable fraction with an integer numerator and a nonzero integer denominator. The sign is stored in the numerator, and the fraction is reduced using the greatest common divisor. Normalization makes `1/2` and `2/4` equal values, so generated equality and hashing are consistent. In the frozen constructor, `object.__setattr__` is used only for initial normalization; fields are not changed after creation.

```py
from dataclasses import dataclass
from math import gcd
from types import NotImplementedType


@dataclass(frozen=True)
class Rational:
    numerator: int
    denominator: int

    def __post_init__(self) -> None:
        if self.denominator == 0:
            raise ValueError("zero denominator")
        sign = -1 if self.denominator < 0 else 1
        divisor = gcd(self.numerator, self.denominator)
        n = sign * self.numerator // divisor
        d = abs(self.denominator) // divisor
        object.__setattr__(self, "numerator", n)
        object.__setattr__(self, "denominator", d)

    def __add__(
        self, other: object
    ) -> "Rational | NotImplementedType":
        if not isinstance(other, Rational):
            return NotImplemented
        n = self.numerator * other.denominator
        n += other.numerator * self.denominator
        d = self.denominator * other.denominator
        return Rational(n, d)

    def __str__(self) -> str:
        return f"{self.numerator}/{self.denominator}"


a = Rational(2, 4)
b = Rational(1, -6)
print(a, b, a + b)
print(len({a, Rational(3, 6)}))
```

```
1/2 -1/6 1/3
1
```

Input types here are specified by the constructor's contract; for console input, convert text to `int` before construction. Test a zero numerator, two negative arguments, a denominator of 0, and addition of a string. `NotImplemented` lets the interpreter raise the standard `TypeError` for the last case.

## Example 2. A playlist as a container

The playlist stores a copy of the initial list of titles. It allows index access, slices, membership, and independent traversals. A slice returns a new `Playlist`. We provide no mutation operations so the example focuses on the reading protocol.

```py
from collections.abc import Iterator


class Playlist:
    def __init__(self, titles: list[str]) -> None:
        self._titles = titles.copy()

    def __len__(self) -> int:
        return len(self._titles)

    def __getitem__(self, index: int | slice) -> "str | Playlist":
        if isinstance(index, slice):
            return Playlist(self._titles[index])
        return self._titles[index]

    def __contains__(self, title: object) -> bool:
        return title in self._titles

    def __iter__(self) -> Iterator[str]:
        return iter(self._titles)


items = ["Morning", "Rain", "Evening"]
playlist = Playlist(items)
items.clear()
print(len(playlist), playlist[-1], "Rain" in playlist)
print(", ".join(playlist[:2]))
print(list(playlist) == list(playlist))
```

```
3 Evening True
Morning, Rain
True
```

Clearing `items` does not clear the playlist because the list was copied. This is a shallow copy, but titles are immutable strings, so it is sufficient. Two consecutive iterations give the same result. For an empty playlist, `len` is zero and index `0` should raise `IndexError`; an empty slice remains valid.

## Example 3. A pizza order

Build an immutable order with an enumeration of sizes and flags for toppings. Sample prices are given in whole UAH: small is 100, large is 160, cheese is 20, and mushrooms are 30. A combination of toppings does not create a new member of the size enumeration: it is a separate set of attributes.

```py
from dataclasses import dataclass
from enum import Enum, Flag, auto


class Size(Enum):
    SMALL = 100
    LARGE = 160


class Topping(Flag):
    NONE = 0
    CHEESE = auto()
    MUSHROOM = auto()


@dataclass(frozen=True)
class Pizza:
    size: Size
    toppings: Topping = Topping.NONE

    def price(self) -> int:
        result = self.size.value
        if Topping.CHEESE in self.toppings:
            result += 20
        if Topping.MUSHROOM in self.toppings:
            result += 30
        return result


order = Pizza(Size.LARGE, Topping.CHEESE | Topping.MUSHROOM)
print(order.size.name, order.price())
print(Pizza(Size.SMALL).price())
```

```
LARGE 210
100
```

Test all four topping combinations for both sizes. For text input, first convert it to `Size` by name, catching `KeyError`. Do not compare `Size.LARGE` with the number 160: the `value` attribute is for the price, and the enumeration member is for the state.
