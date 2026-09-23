---
title: "Практика"
description: "Тема 16. Пакування та типізація: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Консольна статистика CSV

Створимо пакет `csv_stats` із точкою входу `csv-stats`. Вхідний UTF-8 CSV містить лише стовпець `value` і 1–1000 скінченних чисел від −1000000 до 1000000. Виведемо кількість і середнє. Увесь файл перевіряється до друку підсумку.

Файл `src/csv_stats/__init__.py` порожній; у `cli.py`:

```py
import argparse
import csv
from math import isfinite
from pathlib import Path
from statistics import mean


def read_values(path: Path) -> list[float]:
    with path.open(encoding="utf-8", newline="") as source:
        reader = csv.DictReader(source)
        if reader.fieldnames != ["value"]:
            raise ValueError("Потрібен стовпець value")
        values: list[float] = []
        for row in reader:
            if set(row) != {"value"} or row["value"] is None:
                raise ValueError("Неправильний рядок")
            value = float(row["value"])
            if not isfinite(value) or abs(value) > 1e6:
                raise ValueError("Число поза межами")
            values.append(value)
            if len(values) > 1000:
                raise ValueError("Забагато рядків")
    if not values:
        raise ValueError("Немає даних")
    return values


def main() -> int:
    parser = argparse.ArgumentParser(description="Середнє CSV")
    parser.add_argument("input", type=Path)
    args = parser.parse_args()
    try:
        values = read_values(args.input)
    except (OSError, ValueError) as error:
        parser.error(str(error))
    print(f"n={len(values)}; mean={mean(values):.2f}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

Дужки в `except` потрібні, оскільки є `as error`. Без прив’язування змінної Python 3.14 дозволяє запис `except OSError, ValueError:`. Не переносіть це правило на старі версії інтерпретатора.

Метадані використовують той самий бекенд Hatchling:

```toml
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
[project]
name = "course-csv-stats"
version = "0.1.0"
requires-python = ">=3.14"
[project.scripts]
csv-stats = "csv_stats.cli:main"
[tool.hatch.build.targets.wheel]
packages = ["src/csv_stats"]
```

Для `value`, `2`, `4`, `6` в окремих рядках результат – `n=3; mean=4.00`. Зберіть wheel і встановіть у чисте середовище поза джерелами, як у лекції. Перевірте `--help`, відсутній файл, порожній набір, `nan`, зайвий стовпець і 1001 рядок. Відповідні помилки мають давати код 2 без часткового успішного підсумку. Для встановлення через uv використайте `uv tool install` із точним шляхом до локального wheel.

## Приклад 2. Типізований кеш LRU

Кеш містить не більше `capacity` пар. Читання робить ключ найновішим, додавання до повного кешу витісняє найдавніший. Повторний ключ оновлює значення й не збільшує кількості пар. Ключ має бути хешованим; відсутній ключ спричиняє `KeyError`.

```py
from collections import OrderedDict
from collections.abc import Hashable


class LRU[K: Hashable, V]:
    def __init__(self, capacity: int) -> None:
        if capacity < 1:
            raise ValueError("Місткість має бути додатною")
        self._capacity = capacity
        self._data: OrderedDict[K, V] = OrderedDict()

    def get(self, key: K) -> V:
        value = self._data[key]
        self._data.move_to_end(key)
        return value

    def put(self, key: K, value: V) -> None:
        self._data[key] = value
        self._data.move_to_end(key)
        if len(self._data) > self._capacity:
            self._data.popitem(last=False)


def main() -> None:
    cache = LRU[str, int](2)
    cache.put("a", 10)
    cache.put("b", 20)
    print(cache.get("a"))
    cache.put("c", 30)
    try:
        cache.get("b")
    except KeyError:
        print("b витіснено")


if __name__ == "__main__":
    main()
```

Результат – `10`, потім `b витіснено`. Збережіть як `lru.py`. Файл `test_lru.py` перевіряє поведінку, а не приватні поля:

```py
import pytest

from lru import LRU


def test_access_changes_order() -> None:
    cache = LRU[str, int](2)
    cache.put("a", 1)
    cache.put("b", 2)
    assert cache.get("a") == 1
    cache.put("c", 3)
    with pytest.raises(KeyError):
        cache.get("b")


def test_update() -> None:
    cache = LRU[str, int](1)
    cache.put("a", 1)
    cache.put("a", 9)
    assert cache.get("a") == 9


def test_capacity() -> None:
    with pytest.raises(ValueError):
        LRU[str, int](0)
```

Запустіть pytest і `mypy --strict lru.py`. В окремому негативному файлі передайте `str` замість значення `int`: статичний аналіз має відхилити виклик. Навмисний негативний приклад не додають до успішного набору перевірок проєкту.

## Приклад 3. Бюджет PySide6 із ресурсом

Застосунок показує залишок у цілих копійках і списує 100 грн. Початкове значення зберігається у файлі `defaults.json` поруч із `budget.py`. Це навчальна модель без збереження операцій між запусками. Файл ресурсу містить `{"cents": 25000}`.

```py
import json
import sys
from pathlib import Path

from PySide6.QtWidgets import (
    QApplication, QLabel, QPushButton, QVBoxLayout, QWidget,
)


def initial_cents() -> int:
    path = Path(__file__).with_name("defaults.json")
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError("Потрібен об’єкт")
    value = data.get("cents")
    if type(value) is not int or not 0 <= value <= 1000000:
        raise ValueError("Некоректний баланс")
    return value


class Budget(QWidget):
    def __init__(self) -> None:
        super().__init__()
        self.cents = initial_cents()
        self.setWindowTitle("Навчальний бюджет")
        self.label = QLabel()
        self.button = QPushButton("Витратити 100 грн")
        self.button.clicked.connect(self.spend)
        layout = QVBoxLayout(self)
        layout.addWidget(self.label)
        layout.addWidget(self.button)
        self.refresh()

    def refresh(self) -> None:
        self.label.setText(f"Залишок: {self.cents / 100:.2f}")
        self.button.setEnabled(self.cents >= 10000)

    def spend(self) -> None:
        if self.cents >= 10000:
            self.cents -= 10000
        self.refresh()


def main() -> int:
    app = QApplication(sys.argv)
    window = Budget()
    if "--smoke" in sys.argv:
        before = window.cents
        window.spend()
        expected = before - 10000 if before >= 10000 else before
        return 0 if window.cents == expected else 1
    window.show()
    return app.exec()


if __name__ == "__main__":
    raise SystemExit(main())
```

Ресурс знаходиться відносно `__file__`, а не поточного каталогу. Записувані дані користувача слід зберігати окремо, наприклад через `QStandardPaths`; каталог ресурсів не є базою даних. Перевірте JSON до створення пакета. Для кращої діагностики початкова збірка має консоль:

```powershell
python -m PyInstaller --clean --onedir --name Budget `
  --add-data "defaults.json:." budget.py
dist\Budget\Budget.exe --smoke
```

Збирайте в окремому середовищі. У Windows сторонні інструменти в `PATH` іноді додають несумісні DLL Qt або ICU. Під час перевірки цієї роботи саме стороння ICU спричинила помилку імпорту QtWidgets. Для ізоляції шляхів збережіть наведений `build_budget.py` поруч із програмою та запустіть його Python-інтерпретатором середовища, де встановлено PySide6 і PyInstaller:

```py
import os
import subprocess
import sys
from pathlib import Path

env = os.environ.copy()
system = Path(os.environ["SystemRoot"])
env["PATH"] = os.pathsep.join(map(str, [
    Path(sys.executable).parent, Path(sys.base_prefix),
    system / "System32", system,
]))
for key in ("QT_PLUGIN_PATH", "QT_QPA_PLATFORM_PLUGIN_PATH",
            "PYTHONPATH", "PYTHONHOME"):
    env.pop(key, None)
subprocess.run([
    sys.executable, "-m", "PyInstaller", "--clean",
    "--onedir", "--name", "BudgetClean",
    "--workpath", "build-clean", "--distpath", "dist-clean",
    "--add-data", "defaults.json:.", "budget.py",
], env=env, cwd=Path(__file__).parent, check=True)
```

Цей допоміжний файл призначений для Windows. Він змінює середовище лише дочірнього процесу. Перевірте `dist-clean/BudgetClean/BudgetClean.exe --smoke` з іншого каталогу. Зміна PATH тільки під час запуску не виправить уже включену неправильну DLL; потрібна нова збірка.

Після успішної перевірки можна додати `--windowed`. Включіть `defaults.json` за тим самим відносним шляхом, що й у коді. Запустіть exe з іншого робочого каталогу. Окремо перевірте кнопку, напис, заборону від’ємного залишку та відсутній ресурс на копії збірки. `--smoke` є швидкою перевіркою логіки; він не замінює огляд вікна й перевірку на цільовому комп’ютері.

![Бюджет, запущений зі збірки PyInstaller](./images/05-pyinstaller-budget.png)

Рис. 16.9. Бюджет, запущений зі збірки PyInstaller {.caption}
