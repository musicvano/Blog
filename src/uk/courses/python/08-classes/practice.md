---
title: "Практика"
description: "Тема 8. Класи та об’єкти: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Студент і оцінки

Клас студента зберігає непорожнє ім’я та окремий список оцінок. Оцінка – ціле число від 0 до 100. Середнє без оцінок відсутнє, тобто `None`, а не нуль. Атрибут класу рахує успішно створені екземпляри за весь час роботи програми, не кількість живих об’єктів.

```py
class Student:
    created = 0

    def __init__(self, name: str) -> None:
        if not name.strip():
            raise ValueError("Ім’я порожнє")
        self.name = name.strip()
        self._grades: list[int] = []
        Student.created += 1

    def add_grade(self, grade: int) -> None:
        if type(grade) is not int or not 0 <= grade <= 100:
            raise ValueError("Оцінка поза 0..100")
        self._grades.append(grade)

    @property
    def average(self) -> float | None:
        if not self._grades:
            return None
        return sum(self._grades) / len(self._grades)


anna = Student("Анна")
bohdan = Student("Богдан")
anna.add_grade(80)
anna.add_grade(100)
print(anna.average, bohdan.average, Student.created)
```

```
90.0 None 2
```

Додавання оцінок Анні не змінює стан Богдана. У зовнішньому звіті `None` можна показати як «немає оцінок». Перевірте, що спроба додати `101` не змінила середнє. Не повертайте внутрішній список без потреби: клієнт тоді зможе додати `-1` без перевірки.

## Приклад 2. Час доби

Представимо час кількістю хвилин від початку доби. Альтернативний конструктор приймає строгий запис `HH:MM`; він відхиляє неправильні години та хвилини. Сеттер загального числа хвилин натомість нормалізує будь-яке ціле значення за модулем 1440. Це два різні явно описані контракти: читання годинника та арифметика часу.

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
            raise ValueError("Потрібне ціле число хвилин")
        self._minutes = value % 1440

    @classmethod
    def from_string(cls, text: str) -> Self:
        if not (len(text) == 5 and text[2] == ":"
                and text[:2].isascii() and text[:2].isdecimal()
                and text[3:].isascii() and text[3:].isdecimal()):
            raise ValueError("Формат HH:MM")
        hours, minutes = int(text[:2]), int(text[3:])
        if not (0 <= hours < 24 and 0 <= minutes < 60):
            raise ValueError("Час поза межами доби")
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

Єдине поле `_minutes` виключає неузгоджені години й хвилини. Операція `+=` читає властивість, додає число й записує через сеттер. Для перевірки формату потрібні випадки `24:00`, `12:60`, `9:30`, порожній рядок і нецифрові символи. Вони не повинні мовчки перетворюватися на інший коректний час.

## Приклад 3. Абонемент бібліотеки

Книги створюються незалежно від читацького квитка. Квиток зберігає посилання на книги та дати повернення: це агрегація. Навчальний штраф становить 200 копійок за день прострочення кожної книги. Поточну дату передаємо параметром, щоб результат тесту не залежав від дня запуску. Це модель обліку, не юридичні правила бібліотеки.

```py
from datetime import date


class Book:
    def __init__(self, code: str, title: str) -> None:
        if not code.strip() or not title.strip():
            raise ValueError("Потрібні код і назва")
        self.code, self.title = code.strip(), title.strip()


class LibraryCard:
    def __init__(self, reader: str) -> None:
        if not reader.strip():
            raise ValueError("Потрібен читач")
        self.reader = reader.strip()
        self._loans: dict[str, tuple[Book, date]] = {}

    def borrow(self, book: Book, due: date) -> None:
        if book.code in self._loans:
            raise ValueError("Книгу вже видано цьому читачеві")
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


book = Book("B1", "Алгоритми")
card = LibraryCard("Олена")
card.borrow(book, date(2026, 9, 10))
print(card.count, card.fine(date(2026, 9, 13)))
print(card.return_book("B1") is book)
print(card.count, book.title)
```

```
1 600
True
0 Алгоритми
```

Повернення книги не знищує її об’єкт. Невідомий код у `pop` дає `KeyError`; інтерфейс може показати повідомлення про відсутню видачу. Цей клас контролює лише один читацький квиток. Для заборони одночасної видачі однієї книги різним читачам потрібен спільний каталог або служба видачі; не приписуйте прикладу гарантію, якої він не реалізує.
