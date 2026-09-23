---
title: "Практика"
description: "Тема 10. Спеціальні методи, dataclass: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Раціональні дроби

Реалізувати незмінний дріб із цілим чисельником і ненульовим цілим знаменником. Знак зберігається в чисельнику, дріб скорочується через найбільший спільний дільник. Нормалізація робить `1/2` і `2/4` однаковими значеннями, тому згенеровані рівність і хеш узгоджені. У frozen-конструкторі `object.__setattr__` використовується лише для початкової нормалізації; після створення поля не змінюємо.

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
            raise ValueError("нульовий знаменник")
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

Вхідні типи тут задаються контрактом конструктора; для консольного введення перетворюйте текст на `int` перед створенням. Перевірте нульовий чисельник, два від’ємні аргументи, знаменник 0 та додавання рядка. `NotImplemented` дозволяє інтерпретатору видати стандартний `TypeError` для останнього випадку.

## Приклад 2. Плейлист як контейнер

Плейлист зберігає копію початкового списку назв. Він дозволяє читання за індексом, зрізи, належність та незалежні обходи. Зріз повертає новий `Playlist`. Ми не надаємо операцій зміни, щоб приклад зосереджувався на протоколі читання.

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


items = ["Ранок", "Дощ", "Вечір"]
playlist = Playlist(items)
items.clear()
print(len(playlist), playlist[-1], "Дощ" in playlist)
print(", ".join(playlist[:2]))
print(list(playlist) == list(playlist))
```

```
3 Вечір True
Ранок, Дощ
True
```

Очищення `items` не очищує плейлист, бо список скопійовано. Це поверхнева копія, але назви є незмінними рядками, тому цього достатньо. Дві послідовні ітерації дають однаковий результат. Для порожнього плейлиста `len` дорівнює нулю, а індекс `0` має спричинити `IndexError`; порожній зріз залишається допустимим.

## Приклад 3. Замовлення піци

Побудувати незмінне замовлення з переліком розмірів та прапорцями добавок. Навчальні ціни задаються цілими гривнями: мала – 100, велика – 160, сир – 20, гриби – 30. Комбінація добавок не створює нового елемента переліку розмірів: це окремий набір ознак.

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

Перевірте всі чотири комбінації добавок для обох розмірів. Для введення тексту спочатку перетворіть його на `Size` за ім’ям, перехопивши `KeyError`. Не порівнюйте `Size.LARGE` із числом 160: для ціни призначений атрибут `value`, а для стану – член переліку.
