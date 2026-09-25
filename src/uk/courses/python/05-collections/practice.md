---
title: "Практика"
description: "Тема 5. Вбудовані колекції: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Матриця

Написати програму, яка отримує прямокутну матрицю цілих чисел у вигляді вкладеного списку, обчислює суми рядків і стовпців та транспонує її. Транспонування міняє місцями індекси рядка й стовпця. Порожню матрицю, порожній рядок і рядки різної довжини відхилити. Початкову матрицю не змінювати. У демонстрації дані задано в коді.

```py
def transpose(matrix: list[list[int]]) -> list[list[int]]:
    if not matrix or not matrix[0]:
        raise ValueError("Матриця не може бути порожньою")
    width = len(matrix[0])
    if any(len(row) != width for row in matrix):
        raise ValueError("Рядки мають різну довжину")
    return [[row[column] for row in matrix]
            for column in range(width)]


def main() -> None:
    matrix = [[1, 2, 3], [4, 5, 6]]
    transposed = transpose(matrix)
    print("Суми рядків:", [sum(row) for row in matrix])
    print("Суми стовпців:", [sum(row) for row in transposed])
    print("Транспонована:")
    for row in transposed:
        print(*row)


if __name__ == "__main__":
    main()
```

```text
Суми рядків: [6, 15]
Суми стовпців: [5, 7, 9]
Транспонована:
1 4
2 5
3 6
```

Функція повертає нові рядки, тому зміна елемента результату не змінює джерело. Сума всіх сум рядків дорівнює сумі всіх сум стовпців: це додаткова перевірка без повторення алгоритму транспонування. Для `[[7]]` результат `[[7]]`; для `[[-1, 1]]` сума рядка 0. Для `[]`, `[[]]` та `[[1], [2, 3]]` очікується `ValueError`.

## Приклад 2. Телефонна книга

Написати програму, яка приймає контакти у форматі `ім’я:номер` через аргументи командного рядка. Без аргументів запитати один рядок таких записів через пробіл. Імена не містять пробілів або двокрапок; номер складається з десяти ASCII-цифр, включаючи початкові нулі. Імена та номери мають бути унікальними, щоб зворотний словник «номер – ім’я» не втрачав записів.

Команда `--help` друкує довідку. Помилки записати до потоку помилок і завершити з кодом 2; успішне виконання – з кодом 0. Вивести відсортований довідник, підсумок, результат пошуку контакту `Анна` через `get` і зворотний пошук першого номера. Це невеликий приклад інтерфейсу для високого рівня завдань.

```py
import sys


def parse_contacts(records: list[str]) -> dict[str, str]:
    contacts: dict[str, str] = {}
    phones: set[str] = set()
    for record in records:
        name, phone = record.split(":")
        if not name or any(char.isspace() for char in name):
            raise ValueError("Некоректне ім’я")
        if len(phone) != 10 or not phone.isascii():
            raise ValueError("Потрібно 10 ASCII-цифр")
        if not phone.isdecimal():
            raise ValueError("Номер містить нецифрові символи")
        if name in contacts or phone in phones:
            raise ValueError("Повторене ім’я або номер")
        contacts[name] = phone
        phones.add(phone)
    return contacts


def main() -> int:
    args = sys.argv[1:]
    if args == ["--help"]:
        print("main.py ім’я:номер ...; без аргументів: введення")
        return 0
    try:
        if not args:
            args = input("Контакти: ").split()
        contacts = parse_contacts(args)
    except ValueError, EOFError:
        print("Помилка: перевірте формат і повтори", file=sys.stderr)
        return 2
    reverse = {phone: name for name, phone in contacts.items()}
    for name in sorted(contacts):
        print(f"{name:<10} {contacts[name]}")
    print("Усього:", len(contacts))
    print("Анна:", contacts.get("Анна", "не знайдено"))
    if contacts:
        first_phone = contacts[sorted(contacts)[0]]
        print("За номером:", reverse[first_phone])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

Для аргументів `Олег:0671112233 Анна:0502223344` результат:

```text
Анна       0502223344
Олег       0671112233
Усього: 2
Анна: 0502223344
За номером: Анна
```

Номер є рядком, адже арифметика над ним не потрібна, а початковий нуль важливий. Розпакування результату `split` перевіряє рівно два поля: нуль або дві двокрапки спричиняють `ValueError`. Python 3.14 дозволяє `except ValueError, EOFError:` без дужок, якщо не використовується `as`. У попередніх версіях цей запис не працює. Порожній введений рядок дає коректний порожній довідник; кінець потоку до рядка розглядається як помилка введення.

У загальному довіднику спільні номери можуть бути дозволені. Тоді зворотне відображення повинно мати тип `dict[str, list[str]]`, а не мовчки перезаписувати попереднього власника. Правило цієї задачі про унікальні номери робить словникове включення коректним.

## Приклад 3. Відвідувачі двох днів

Задано списки відвідувань за два дні. Ім’я може повторюватися, якщо відвідувач заходив кілька разів. Порахувати унікальних відвідувачів кожного дня, спільних і нових другого дня та загальні частоти візитів. Результат за частотами впорядкувати за спаданням кількості, за рівності – за іменем. Дані задано в коді.

```py
from collections import Counter


def visit_report(days: list[list[str]]) -> None:
    if len(days) != 2:
        raise ValueError("Потрібно рівно два дні")
    labels = ["Перший", "Другий"]
    for number, (label, visits) in enumerate(
        zip(labels, days, strict=True), start=1
    ):
        print(f"{number}. {label}: {len(set(visits))}")
    first, second = (set(day) for day in days)
    print("Спільні:", sorted(first & second))
    print("Нові:", sorted(second - first))
    counts = Counter(name for day in days for name in day)
    ordered = sorted(counts.items(),
                     key=lambda item: (-item[1], item[0]))
    for name, count in ordered:
        print(f"{name}: {count}")
    print("Візитів:", sum(counts.values()))


days = [["Анна", "Олег", "Анна"], ["Олег", "Іра"]]
visit_report(days)
```

```text
1. Перший: 2
2. Другий: 2
Спільні: ['Олег']
Нові: ['Іра']
Анна: 2
Олег: 2
Іра: 1
Візитів: 5
```

Множина відповідає на запитання «хто був», лічильник – «скільки разів». Загальна кількість візитів дорівнює сумі довжин початкових списків. Для двох порожніх днів обидві множини й лічильник порожні, підсумок 0. Один порожній день не заважає обробити інший.
