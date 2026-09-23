---
title: "Practice"
description: "Topic 8. Classes and objects: worked examples"
outline: [2, 3]
sourceHash: "48c544b9ad01812b8e91e1020caa87be33a3cb087721a65d65a098e29575e2d5"
---

# Practice

## Example 1. A student and grades

The student class stores a nonempty name and a separate grade list. A grade is an integer from 0 to 100. Without grades, the average is absent, represented by `None`, not zero. A class attribute counts successfully created instances over the program's entire run, not the number of live objects.

```py
class Student:
    created = 0

    def __init__(self, name: str) -> None:
        if not name.strip():
            raise ValueError("Name is empty")
        self.name = name.strip()
        self._grades: list[int] = []
        Student.created += 1

    def add_grade(self, grade: int) -> None:
        if type(grade) is not int or not 0 <= grade <= 100:
            raise ValueError("Grade outside 0..100")
        self._grades.append(grade)

    @property
    def average(self) -> float | None:
        if not self._grades:
            return None
        return sum(self._grades) / len(self._grades)


anna = Student("Anna")
bohdan = Student("Bohdan")
anna.add_grade(80)
anna.add_grade(100)
print(anna.average, bohdan.average, Student.created)
```

```
90.0 None 2
```

Adding grades to Anna does not change Bohdan's state. An external report can display `None` as “no grades.” Check that attempting to add `101` leaves the average unchanged. Do not expose the internal list unnecessarily: a client could then add `-1` without validation.

## Example 2. Time of day

Represent time as the number of minutes since the start of the day. An alternative constructor accepts strict `HH:MM` input and rejects invalid hours and minutes. The setter for the total number of minutes instead normalizes any integer modulo 1440. These are two distinct, explicitly described contracts: reading a clock and performing time arithmetic.

```py
from typing import Self


class TimeOfDay:
    def __init__(self, minutes: int = 0) -> None:
        self.minutes = minutes

    @property
    def minutes(self) -> int:
        return self._minutes

    @minutes.setter
    def minutes(self, value: int) -> None:
        if type(value) is not int:
            raise ValueError("An integer number of minutes is required")
        self._minutes = value % 1440

    @classmethod
    def from_string(cls, text: str) -> Self:
        if not (len(text) == 5 and text[2] == ":"
                and text[:2].isascii() and text[:2].isdecimal()
                and text[3:].isascii() and text[3:].isdecimal()):
            raise ValueError("HH:MM format required")
        hours, minutes = int(text[:2]), int(text[3:])
        if not (0 <= hours < 24 and 0 <= minutes < 60):
            raise ValueError("Time outside the day bounds")
        return cls(hours * 60 + minutes)

    def __str__(self) -> str:
        return f"{self.minutes // 60:02}:{self.minutes % 60:02}"


clock = TimeOfDay.from_string("23:50")
clock.minutes += 25
print(clock)
print(TimeOfDay(-1))
```

```
00:15
23:59
```

The single `_minutes` field prevents inconsistent hours and minutes. `+=` reads the property, adds a number, and writes through the setter. Format checks need cases such as `24:00`, `12:60`, `9:30`, an empty string, and nondigit characters. These must not silently turn into a different valid time.

## Example 3. Library card

Books are created independently of a library card. The card stores references to books and their due dates: this is aggregation. The sample fine is 200 kopiykas per overdue day for each book. Pass the current date as a parameter so that test results do not depend on the run date. This is a tracking model, not legal library rules.

```py
from datetime import date


class Book:
    def __init__(self, code: str, title: str) -> None:
        if not code.strip() or not title.strip():
            raise ValueError("A code and title are required")
        self.code, self.title = code.strip(), title.strip()


class LibraryCard:
    def __init__(self, reader: str) -> None:
        if not reader.strip():
            raise ValueError("A reader is required")
        self.reader = reader.strip()
        self._loans: dict[str, tuple[Book, date]] = {}

    def borrow(self, book: Book, due: date) -> None:
        if book.code in self._loans:
            raise ValueError("The book is already loaned to this reader")
        self._loans[book.code] = book, due

    def return_book(self, code: str) -> Book:
        book, _ = self._loans.pop(code)
        return book

    def fine(self, today: date) -> int:
        return sum(max(0, (today - due).days) * 200
                   for _, due in self._loans.values())

    @property
    def count(self) -> int:
        return len(self._loans)


book = Book("B1", "Algorithms")
card = LibraryCard("Olena")
card.borrow(book, date(2026, 9, 10))
print(card.count, card.fine(date(2026, 9, 13)))
print(card.return_book("B1") is book)
print(card.count, book.title)
```

```
1 600
True
0 Algorithms
```

Returning a book does not destroy its object. An unknown code in `pop` raises `KeyError`; the interface can display a message that the loan is absent. This class controls only one library card. Preventing the same book from being loaned to different readers simultaneously requires a shared catalog or lending service; do not attribute a guarantee to the example that it does not implement.
