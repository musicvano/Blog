---
title: "Практика"
description: "Тема 13. NumPy, pandas, Matplotlib: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Відхилення температур від еталона

Для трьох датчиків задано показання на трьох еталонних температурах. Потрібно знайти середню похибку кожного датчика й найбільше абсолютне відхилення. Еталон має по одному значенню на рядок; його форма для віднімання – стовпець, а не рядок.

```py
import numpy as np
from numpy.typing import NDArray


def errors(data: NDArray[np.float64],
           reference: NDArray[np.float64]) -> NDArray[np.float64]:
    if data.ndim != 2 or data.size == 0:
        raise ValueError("Потрібна непорожня матриця")
    if reference.shape != (data.shape[0],):
        raise ValueError("Неправильна кількість еталонів")
    if not np.isfinite(data).all():
        raise ValueError("Некоректне вимірювання")
    if not np.isfinite(reference).all():
        raise ValueError("Некоректний еталон")
    return data - reference[:, None]


def main() -> None:
    data = np.array([[1., -1., 0.], [11., 9., 10.],
                     [21., 19., 20.]])
    delta = errors(data, np.array([0., 10., 20.]))
    print("Середні похибки:", delta.mean(axis=0).tolist())
    print(f"Найбільше відхилення: {np.abs(delta).max():.1f}")


if __name__ == "__main__":
    main()
```

Результат:

```
Середні похибки: [1.0, -1.0, 0.0]
Найбільше відхилення: 1.0
```

Запис `reference[:, None]` додає одиничну вісь і утворює форму `(3, 1)`, сумісну з матрицею. Без цього вираз для квадратної матриці міг би виконатися без помилки, але віднімав би еталони по стовпцях. Саме тому тест має перевіряти числовий зміст, а не лише відсутність винятку. Додайте матрицю форми `(2, 3)` та переконайтеся, що еталонів рівно два.

## Приклад 2. Таблиця відвідування

Кожний рядок CSV описує один день групи: `group,present,total`. Група непорожня, кількості цілі, `total` у межах 1–100, `present` – від нуля до `total`. Для кожної групи обчислити загальну частку присутніх, а не середнє щоденних відсотків.

```py
from io import StringIO
import pandas as pd


def attendance(source: str) -> pd.DataFrame:
    frame = pd.read_csv(StringIO(source), dtype="string")
    required = {"group", "present", "total"}
    if not required.issubset(frame.columns) or frame.empty:
        raise ValueError("Немає даних або стовпців")
    for column in ["present", "total"]:
        frame[column] = pd.to_numeric(frame[column], errors="coerce")
    valid = (frame["group"].str.strip().ne("")
             & frame["total"].between(1, 100)
             & frame["present"].between(0, frame["total"])
             & frame["present"].mod(1).eq(0)
             & frame["total"].mod(1).eq(0))
    if not valid.fillna(False).all():
        raise ValueError("Некоректний запис відвідування")
    frame["group"] = frame["group"].str.strip()
    report = frame.groupby("group", as_index=False).agg(
        present=("present", "sum"), total=("total", "sum"))
    report["share"] = report["present"] / report["total"]
    return report


def main() -> None:
    source = "group,present,total\nA,18,20\nA,8,10\nB,9,10\n"
    for row in attendance(source).itertuples(index=False):
        print(f"{row.group}: {row.share:.1%}")


if __name__ == "__main__":
    main()
```

Результат: `A: 86.7%`, потім `B: 90.0%`. Для A потрібно обчислити 26/30; середнє 90 % і 80 % дало б інший результат через різні знаменники. В умовах цього прикладу весь імпорт відхиляється, якщо хоч один запис неправильний. Не вилучайте проблемні рядки без повідомлення.

## Приклад 3. Консольний звіт експерименту

Створити `experiment.py`, який приймає шлях до CSV зі стовпцем `value`, перевіряє 1–10000 скінченних значень у межах ±1000000, друкує середнє і стандартне відхилення всієї наявної сукупності (`ddof=0`) та зберігає гістограму. Шлях зображення передається через `--plot`. Готовий файл не перезаписувати без явного вибору іншого імені; помилки мають код завершення 2.

```py
import argparse
from pathlib import Path
import sys
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from numpy.typing import NDArray


def read_values(path: Path) -> NDArray[np.float64]:
    frame = pd.read_csv(path)
    if "value" not in frame or not 1 <= len(frame) <= 10000:
        raise ValueError("Очікується 1–10000 значень value")
    values = pd.to_numeric(frame["value"], errors="raise")
    data = values.to_numpy(dtype=float)
    if not np.isfinite(data).all() or (np.abs(data) > 1e6).any():
        raise ValueError("Недопустимі значення")
    return data


def main() -> int:
    parser = argparse.ArgumentParser(description="Звіт експерименту")
    parser.add_argument("csv", type=Path)
    parser.add_argument("--plot", type=Path, default=Path("plot.png"))
    args = parser.parse_args()
    try:
        data = read_values(args.csv)
        if args.plot.exists():
            raise ValueError("Файл графіка вже існує")
        fig, ax = plt.subplots(layout="constrained")
        try:
            ax.hist(data, bins=min(10, len(data)), color="0.75",
                    edgecolor="black")
            ax.set(xlabel="Значення, ум. од.", ylabel="Частота")
            fig.savefig(args.plot, dpi=150)
        finally:
            plt.close(fig)
    except OSError, ValueError, pd.errors.ParserError:
        print("Помилка CSV або шляху результату", file=sys.stderr)
        return 2
    print(f"n={len(data)}, mean={data.mean():.2f}, "
          f"std={data.std():.2f}")
    print(f"Графік: {args.plot.name}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

Для файла `values.csv` зі стовпцем `value` та рядками 1, 2, 3 команда `python experiment.py values.csv --plot result.png` виводить `n=3, mean=2.00, std=0.82` та `Графік: result.png`. Другий запуск із тим самим вихідним шляхом завершується кодом 2. Не плутайте стандартне відхилення з похибкою середнього: для них потрібні різні формули й припущення.

Перевірка даних відокремлена від графічної частини. Створіть `test_experiment.py` поруч із програмою; `tmp_path` надає тимчасовий каталог, тому тести не змінюють робочі дані.

```py
import numpy as np
import pytest
from pathlib import Path
from experiment import read_values


def test_three_values(tmp_path: Path) -> None:
    source = tmp_path / "values.csv"
    source.write_text("value\n1\n2\n3\n", encoding="utf-8")
    np.testing.assert_allclose(read_values(source), [1, 2, 3])


@pytest.mark.parametrize("text", ["value\n", "value\ninf\n",
                                 "other\n1\n", "value\nbad\n"])
def test_invalid(tmp_path: Path, text: str) -> None:
    source = tmp_path / "bad.csv"
    source.write_text(text, encoding="utf-8")
    with pytest.raises(ValueError):
        read_values(source)
```

Запуск `python -m pytest -q` перевіряє п’ять випадків. Окремо перевірте CLI: `--help`, відсутній файл, вже наявний PNG, коректний запуск і код завершення. Друк загальної причини у короткому прикладі можна розширити конкретним повідомленням, не показуючи сторонні дані з файла.
