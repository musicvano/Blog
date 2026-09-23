---
title: "Практика"
description: "Тема 11. Модулі, файли, pytest: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Аналіз папки

Обійти дерево папки й обчислити сумарний розмір звичайних файлів за розширеннями. Символічні посилання пропустити. Розширення привести до нижнього регістру, відсутнє позначити `(none)`. Звіт у CSV відсортувати за розширенням; вихідний файл створюється після сканування, щоб не потрапити до власної статистики. Для демонстрації використовуємо тимчасове дерево з трьох файлів.

```py
import csv
from pathlib import Path
from tempfile import TemporaryDirectory


def summarize(root: Path) -> dict[str, int]:
    result: dict[str, int] = {}
    for path in sorted(root.rglob("*")):
        if path.is_symlink() or not path.is_file():
            continue
        suffix = path.suffix.lower() or "(none)"
        result[suffix] = result.get(suffix, 0) + path.stat().st_size
    return result


with TemporaryDirectory() as folder:
    root = Path(folder)
    (root / "a.txt").write_bytes(b"abc")
    (root / "b.TXT").write_bytes(b"12345")
    (root / "note").write_bytes(b"xy")
    totals = summarize(root)
    with (root / "report.csv").open(
        "w", encoding="utf-8-sig", newline=""
    ) as stream:
        writer = csv.writer(stream, delimiter=";")
        writer.writerow(["extension", "bytes"])
        for suffix, size in sorted(totals.items()):
            writer.writerow([suffix, size])
            print(suffix, size)
```

```
(none) 2
.txt 8
```

Розмір виміряно в байтах, не в кількості символів. Для реального сканування файл може зникнути після `is_file`, а доступ може бути заборонений. Визначте політику: завершити з помилкою або додати до звіту перелік пропущених шляхів. Не повідомляйте повний успіх, якщо частину дерева не вдалося прочитати.

## Приклад 2. Контакти у JSON

Зберігати словник «ім’я → телефон». Ім’я непорожнє, телефон – непорожній рядок ASCII-цифр. Це навчальний формат без міжнародних правил телефонних номерів. Файл `contacts.py` має функції збереження та читання, які не змінюють початковий словник.

```py
# contacts.py
import json
from pathlib import Path


def validate(data: object) -> dict[str, str]:
    if not isinstance(data, dict):
        raise ValueError("потрібен словник")
    for name, phone in data.items():
        if not isinstance(name, str) or not name.strip():
            raise ValueError("неправильне ім’я")
        if not isinstance(phone, str):
            raise ValueError("телефон має бути рядком")
        if not phone.isascii() or not phone.isdecimal():
            raise ValueError("телефон має складатися з цифр")
    return data.copy()


def save(path: Path, contacts: dict[str, str]) -> None:
    text = json.dumps(validate(contacts), ensure_ascii=False)
    path.write_text(text, encoding="utf-8")


def load(path: Path) -> dict[str, str]:
    data = json.loads(path.read_text(encoding="utf-8"))
    return validate(data)
```

Файл `test_contacts.py` перевіряє збереження українського імені, початкового нуля телефона та відмови для неправильного формату.

```py
# test_contacts.py
from pathlib import Path
import pytest
from contacts import load, save, validate


def test_round_trip(tmp_path: Path) -> None:
    path = tmp_path / "contacts.json"
    save(path, {"Олена": "0123"})
    assert load(path) == {"Олена": "0123"}


@pytest.mark.parametrize("phone", ["", "12x", 123])
def test_bad_phone(phone: object) -> None:
    with pytest.raises(ValueError):
        validate({"Олена": phone})
```

`python -m pytest -q test_contacts.py` дає `4 passed`. Телефон не перетворюється на число, бо початковий нуль має значення. Неправильний JSON додатково перевірте тестом, що очікує `json.JSONDecodeError`; відсутній файл – `FileNotFoundError`. Не плутайте ці випадки з допустимою порожньою книгою `{}`.

## Приклад 3. Пакет перетворення CSV → JSON

Створіть папку `tableconvert` з порожнім `__init__.py`. Файл `tableconvert/core.py` читає CSV із точними заголовками `name;quantity`, перевіряє цілі невід’ємні кількості та записує JSON-масив. Спочатку перевіряються всі рядки, лише потім відкривається вихідний файл. Одночасне читання й перезапис того самого шляху явно заборонено.

```py
# tableconvert/core.py
import csv
import json
from pathlib import Path


def convert(source: Path, target: Path) -> int:
    if source.resolve() == target.resolve():
        raise ValueError("вхід і вихід мають бути різними")
    result: list[dict[str, str | int]] = []
    with source.open(encoding="utf-8-sig", newline="") as stream:
        reader = csv.DictReader(stream, delimiter=";")
        if reader.fieldnames != ["name", "quantity"]:
            raise ValueError("неправильний заголовок")
        for row in reader:
            if None in row or any(v is None for v in row.values()):
                raise ValueError("неправильна кількість полів")
            name = row["name"].strip()
            quantity = int(row["quantity"])
            if not name or quantity < 0:
                raise ValueError("неправильний запис")
            result.append({"name": name, "quantity": quantity})
    text = json.dumps(result, ensure_ascii=False, indent=2)
    target.write_text(text, encoding="utf-8")
    return len(result)
```

Файл `tableconvert/__main__.py` задає консольний інтерфейс.

```py
# tableconvert/__main__.py
import argparse
from pathlib import Path
from .core import convert


def main() -> None:
    parser = argparse.ArgumentParser(description="CSV → JSON")
    parser.add_argument("source", type=Path)
    parser.add_argument("target", type=Path)
    args = parser.parse_args()
    try:
        count = convert(args.source, args.target)
    except (OSError, ValueError) as error:
        parser.error(str(error))
    print("Записів:", count)


if __name__ == "__main__":
    main()
```

Для файла `input.csv` зі змістом нижче команда `python -m tableconvert input.csv output.json` друкує `Записів: 2`; у JSON кількості є числами, а не рядками.

```text
name;quantity
Зошит;3
Олівець;0
```

Додайте `test_convert.py` у корені проєкту. Тест доводить, що неправильний рядок не затирає попередній результат.

```py
# test_convert.py
from pathlib import Path
import pytest
from tableconvert.core import convert


def test_invalid_preserves_output(tmp_path: Path) -> None:
    source = tmp_path / "input.csv"
    target = tmp_path / "output.json"
    source.write_text("name;quantity\nЗошит;-1\n",
                      encoding="utf-8")
    target.write_text("old", encoding="utf-8")
    with pytest.raises(ValueError):
        convert(source, target)
    assert target.read_text(encoding="utf-8") == "old"
```

`python -m pytest -q test_convert.py` дає `1 passed`. Ця гарантія стосується помилки вхідних даних. Відмова диска посеред запису потребує окремої політики атомарної заміни файла, яку можна додати на високому рівні завдання.
