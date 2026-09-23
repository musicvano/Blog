---
title: "Practice"
description: "Topic 9. Inheritance and protocols: worked examples"
outline: [2, 3]
sourceHash: "09af6a46c84581740ea6ae194241c09a1bcf4c88eb497c99b3e08b5134f8f193"
---

# Practice

## Example 1. Vehicles

Create a three-level hierarchy for a sample trip cost: `Vehicle`, `LandVehicle`, `ElectricTruck`. An independent subclass, `Boat`, provides a different formula. Distance is a nonnegative finite number of kilometers. Cost is returned in hypothetical hryvnias; there are no real rates or payments here.

```py
from abc import ABC, abstractmethod
from math import isfinite
from typing import override


class Vehicle(ABC):
    def __init__(self, name: str) -> None:
        if not name.strip():
            raise ValueError("A name is required")
        self.name = name.strip()

    @abstractmethod
    def cost(self, distance: float) -> float:
        raise NotImplementedError

    @staticmethod
    def check(distance: float) -> None:
        if not isfinite(distance) or distance < 0:
            raise ValueError("Invalid distance")


class LandVehicle(Vehicle):
    def __init__(self, name: str, rate: float) -> None:
        super().__init__(name)
        if not isfinite(rate) or rate < 0:
            raise ValueError("Invalid rate")
        self.rate = rate

    @override
    def cost(self, distance: float) -> float:
        self.check(distance)
        return distance * self.rate


class ElectricTruck(LandVehicle):
    def __init__(self, name: str) -> None:
        super().__init__(name, 3.0)

    @override
    def cost(self, distance: float) -> float:
        return super().cost(distance) + 20.0


class Boat(Vehicle):
    @override
    def cost(self, distance: float) -> float:
        self.check(distance)
        return 50.0 + 2.0 * distance


fleet: list[Vehicle] = [ElectricTruck("E1"), Boat("B1")]
for vehicle in fleet:
    print(vehicle.name, f"{vehicle.cost(10):.2f}")
```

```
E1 50.00
B1 70.00
```

All concrete classes accept the same valid distance range and return the cost of one trip. At zero distance, fixed charges remain: this is part of the contract, not an arithmetic error. Test `-1`, `nan`, and `inf` for both vehicles; neither should return an amount.

## Example 2. Payment methods as a local model

Compare explicit ABC inheritance with a structural Protocol. All operations only construct messages: there is no network, bank data, or actual withdrawal. The amount is a positive integer number of kopiykas. The common consumer depends on Protocol, so it accepts both an ABC subclass and an independent implementation.

```py
from abc import ABC, abstractmethod
from typing import Protocol, runtime_checkable


@runtime_checkable
class SupportsPay(Protocol):
    def pay(self, cents: int) -> str: ...


class PaymentMethod(ABC):
    @abstractmethod
    def pay(self, cents: int) -> str:
        raise NotImplementedError


def check_amount(cents: int) -> None:
    if type(cents) is not int or cents <= 0:
        raise ValueError("A positive integer amount is required")


class Cash(PaymentMethod):
    def pay(self, cents: int) -> str:
        check_amount(cents)
        return f"Cash: {cents} kopiykas."


class TrainingWallet:
    def pay(self, cents: int) -> str:
        check_amount(cents)
        return f"Training wallet: {cents} kopiykas."


def checkout(method: SupportsPay, cents: int) -> str:
    return method.pay(cents)


methods: list[SupportsPay] = [Cash(), TrainingWallet()]
for method in methods:
    print(checkout(method, 500))
    print(isinstance(method, SupportsPay))
print(issubclass(TrainingWallet, PaymentMethod))
```

```
Cash: 500 kopiykas.
True
Training wallet: 500 kopiykas.
True
False
```

The final `False` does not contradict the wallet's suitability for `checkout`: the consumer needs behavior, not ABC ancestry. The `isinstance` check here only demonstrates the mechanism. A complete test must call the method, check the result, and verify rejection of zero and negative amounts. Real payment systems require entirely different guarantees that this exercise does not model.

## Example 3. Documents and the template method

The base document validates a nonempty title and specifies the order of text construction: title, separator, body. Derived classes implement only the body. The outer loop has no conditions based on document type.

```py
from abc import ABC, abstractmethod


class Document(ABC):
    def __init__(self, title: str) -> None:
        if not title.strip():
            raise ValueError("Empty title")
        self.title = title.strip()

    @abstractmethod
    def body(self) -> str:
        raise NotImplementedError

    def render(self) -> str:
        return f"{self.title}\n---\n{self.body()}"


class Letter(Document):
    def __init__(self, title: str, recipient: str) -> None:
        super().__init__(title)
        if not recipient.strip():
            raise ValueError("A recipient is required")
        self.recipient = recipient.strip()

    def body(self) -> str:
        return f"Dear recipient: {self.recipient}"


class Checklist(Document):
    def __init__(self, title: str, items: list[str]) -> None:
        super().__init__(title)
        if not items or any(not item.strip() for item in items):
            raise ValueError("Nonempty items are required")
        self._items = tuple(items)

    def body(self) -> str:
        return "\n".join(f"[ ] {item}" for item in self._items)


documents: list[Document] = [Letter("Invitation", "Olena"),
    Checklist("Check", ["Code", "Report"])]
for document in documents:
    print(document.render())
```

```
Invitation
---
Dear recipient: Olena
Check
---
[ ] Code
[ ] Report
```

`tuple(items)` fixes the collection of strings: adding to the original list later does not change the document. Strings are immutable, so a shallow copy is sufficient for this contract. The `render` method is not marked `final`, but the design convention is to override the `body` step rather than the entire algorithm. A static `final` marker could clarify the intent.
