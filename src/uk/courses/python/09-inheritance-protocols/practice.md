---
title: "Практика"
description: "Тема 9. Наслідування та протоколи: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Транспортні засоби

Створити ієрархію з трьох рівнів для навчальної вартості рейсу: `Vehicle`, `LandVehicle`, `ElectricTruck`. Незалежний підклас `Boat` дає іншу формулу. Відстань – невід’ємне скінченне число кілометрів. Вартість повертається у навчальних гривнях; реальних тарифів або платежів тут немає.

```py
from abc import ABC, abstractmethod
from math import isfinite
from typing import override


class Vehicle(ABC):
    def __init__(self, name: str) -> None:
        if not name.strip():
            raise ValueError("Потрібна назва")
        self.name = name.strip()

    @abstractmethod
    def cost(self, distance: float) -> float:
        raise NotImplementedError

    @staticmethod
    def check(distance: float) -> None:
        if not isfinite(distance) or distance < 0:
            raise ValueError("Некоректна відстань")


class LandVehicle(Vehicle):
    def __init__(self, name: str, rate: float) -> None:
        super().__init__(name)
        if not isfinite(rate) or rate < 0:
            raise ValueError("Некоректний тариф")
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

Усі конкретні класи приймають той самий допустимий діапазон відстані й повертають вартість однієї поїздки. Для нульової відстані фіксовані платежі залишаються: це частина контракту, а не помилка арифметики. Перевірте `-1`, `nan` і `inf` для обох транспортних засобів; жоден не повинен повертати суму.

## Приклад 2. Способи оплати як локальна модель

Порівняти явне наслідування ABC зі структурним Protocol. Усі операції лише формують повідомлення: немає мережі, банківських даних або фактичного списання. Сума – додатне ціле число копійок. Загальний споживач залежить від Protocol, тому приймає і нащадка ABC, і незалежну реалізацію.

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
        raise ValueError("Потрібна додатна ціла сума")


class Cash(PaymentMethod):
    def pay(self, cents: int) -> str:
        check_amount(cents)
        return f"Готівка: {cents} коп."


class TrainingWallet:
    def pay(self, cents: int) -> str:
        check_amount(cents)
        return f"Навчальний гаманець: {cents} коп."


def checkout(method: SupportsPay, cents: int) -> str:
    return method.pay(cents)


methods: list[SupportsPay] = [Cash(), TrainingWallet()]
for method in methods:
    print(checkout(method, 500))
    print(isinstance(method, SupportsPay))
print(issubclass(TrainingWallet, PaymentMethod))
```

```
Готівка: 500 коп.
True
Навчальний гаманець: 500 коп.
True
False
```

Останній `False` не суперечить придатності гаманця до `checkout`: споживачеві потрібна поведінка, а не походження від ABC. Перевірка `isinstance` тут лише демонструє механізм. Повний тест має викликати метод, перевірити результат і відмову для нуля та від’ємної суми. Реальні платіжні системи потребують зовсім інших гарантій, яких ця вправа не моделює.

## Приклад 3. Документи та шаблонний метод

Базовий документ перевіряє непорожній заголовок і задає порядок формування тексту: заголовок, роздільник, тіло. Похідні класи реалізують тільки тіло. Зовнішній цикл не містить умов за типом документа.

```py
from abc import ABC, abstractmethod


class Document(ABC):
    def __init__(self, title: str) -> None:
        if not title.strip():
            raise ValueError("Порожній заголовок")
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
            raise ValueError("Потрібен адресат")
        self.recipient = recipient.strip()

    def body(self) -> str:
        return f"Шановна особа: {self.recipient}"


class Checklist(Document):
    def __init__(self, title: str, items: list[str]) -> None:
        super().__init__(title)
        if not items or any(not item.strip() for item in items):
            raise ValueError("Потрібні непорожні пункти")
        self._items = tuple(items)

    def body(self) -> str:
        return "\n".join(f"[ ] {item}" for item in self._items)


documents: list[Document] = [Letter("Запрошення", "Олена"),
    Checklist("Перевірка", ["Код", "Звіт"])]
for document in documents:
    print(document.render())
```

```
Запрошення
---
Шановна особа: Олена
Перевірка
---
[ ] Код
[ ] Звіт
```

`tuple(items)` фіксує набір рядків: подальше додавання до вихідного списку не змінить документ. Рядки незмінювані, тому для цього контракту неглибокої копії достатньо. Метод `render` не позначений `final`, але домовленість дизайну полягає в перевизначенні кроку `body`, а не всього алгоритму. Статична позначка `final` могла б уточнити намір.
