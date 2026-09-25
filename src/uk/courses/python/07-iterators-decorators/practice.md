---
title: "Практика"
description: "Тема 7. Генератори та декоратори: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Прості числа пакетами

Побудувати генератор простих чисел не більших за задану межу. Допустимо 0..100000. Окремий генератор з’єднує результати для кількох меж через `yield from`; повтори між діапазонами тут навмисні. Для друку розбити потік на кортежі по чотири числа.

```py
from collections.abc import Iterable, Iterator
from itertools import batched
from math import isqrt


def primes(limit: int) -> Iterator[int]:
    if not 0 <= limit <= 100_000:
        raise ValueError("Межа поза 0..100000")
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

Для числа 2 діапазон дільників порожній; `all` повертає `True`, тому число правильно вважається простим. Для межі 0 або 1 потік порожній. Повний результат не зберігається у списку; `batched` утримує не більше одного пакета. Для суворо однакових рядків можна обрати `strict=True`, але тоді останній короткий рядок буде помилкою, а не звичайною частиною звіту.

## Приклад 2. Ковзне середнє

Для потоку вимірів обчислити середнє кожного повного вікна довжини `width`. Поки елементів недостатньо, результат не видається. `deque(maxlen=width)` автоматично вилучає найстаріший елемент. Для цієї навчальної реалізації сума вікна обчислюється заново; складність на один результат пропорційна ширині.

```py
from collections import deque
from collections.abc import Iterable, Iterator
from itertools import accumulate
from math import isfinite


def moving_average(values: Iterable[float],
                   width: int) -> Iterator[float]:
    if width < 1:
        raise ValueError("Ширина має бути додатною")
    window: deque[float] = deque(maxlen=width)
    for value in values:
        if not isfinite(value):
            raise ValueError("Потрібні скінченні виміри")
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

Проміжні суми `accumulate` не є ковзними: вони враховують усі попередні значення. Для ефективнішої реалізації можна зберігати поточну суму й віднімати елемент перед вилученням; перевірте окремо ширину 1, точну довжину вікна та порожнє джерело.

## Приклад 3. Журнал викликів

Створити фабрику декораторів, що приймає рівень журналу, рахує спроби виклику й записує ім’я функції та номер. Лічильник належить замиканню конкретної обгорнутої функції. Помилковий виклик також рахується, оскільки спроба відбулася; виняток передається назовні. Використано stdout, щоб порядок журналу й результатів був явним.

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
        raise ValueError("Некоректна сума або відсоток")
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

Рівень `DEBUG` за поточної конфігурації не друкувався б, але лічильник усе одно зростав би. Це коректно, бо він рахує спроби, а не кількість видимих повідомлень. У журналі не потрібні паролі, токени чи інші дані, які не допомагають перевірці вправи.
