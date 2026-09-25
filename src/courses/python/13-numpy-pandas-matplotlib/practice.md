---
title: "Practice"
description: "Topic 13. NumPy, pandas, Matplotlib: worked examples"
outline: [2, 3]
sourceHash: "22ff3afd83983fbc66c1e6e39c0ef2cc66fdf84818dfc404c3a2e7861f2fe774"
---

# Practice

## Example 1. Temperature deviations from a reference

Readings at three reference temperatures are given for three sensors. Find each sensor's mean error and the largest absolute deviation. The reference has one value per row; its shape for subtraction is a column, not a row.

```py
import numpy as np
from numpy.typing import NDArray


def errors(data: NDArray[np.float64],
           reference: NDArray[np.float64]) -> NDArray[np.float64]:
    if data.ndim != 2 or data.size == 0:
        raise ValueError("A nonempty matrix is required")
    if reference.shape != (data.shape[0],):
        raise ValueError("Incorrect number of reference values")
    if not np.isfinite(data).all():
        raise ValueError("Invalid measurement")
    if not np.isfinite(reference).all():
        raise ValueError("Invalid reference value")
    return data - reference[:, None]


def main() -> None:
    data = np.array([[1., -1., 0.], [11., 9., 10.],
                     [21., 19., 20.]])
    delta = errors(data, np.array([0., 10., 20.]))
    print("Mean errors:", delta.mean(axis=0).tolist())
    print(f"Largest deviation: {np.abs(delta).max():.1f}")


if __name__ == "__main__":
    main()
```

Output:

```
Mean errors: [1.0, -1.0, 0.0]
Largest deviation: 1.0
```

The expression `reference[:, None]` adds a length-one axis, producing shape `(3, 1)`, which is compatible with the matrix. Without this, the expression for a square matrix might run without an error but subtract reference values along columns. That is why a test must check the numeric meaning, not merely the absence of an exception. Add a matrix of shape `(2, 3)` and verify that there are exactly two reference values.

## Example 2. An attendance table

Each CSV row describes one day for a group: `group,present,total`. The group is nonempty, counts are integers, `total` is within 1–100, and `present` is between zero and `total`. For each group, calculate the overall attendance share, not the mean of daily percentages.

```py
from io import StringIO
import pandas as pd


def attendance(source: str) -> pd.DataFrame:
    frame = pd.read_csv(StringIO(source), dtype="string")
    required = {"group", "present", "total"}
    if not required.issubset(frame.columns) or frame.empty:
        raise ValueError("Missing data or columns")
    for column in ["present", "total"]:
        frame[column] = pd.to_numeric(frame[column], errors="coerce")
    valid = (frame["group"].str.strip().ne("")
             & frame["total"].between(1, 100)
             & frame["present"].between(0, frame["total"])
             & frame["present"].mod(1).eq(0)
             & frame["total"].mod(1).eq(0))
    if not valid.fillna(False).all():
        raise ValueError("Invalid attendance record")
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

Output: `A: 86.7%`, then `B: 90.0%`. For A, calculate 26/30; averaging 90% and 80% would give a different result because the denominators differ. Under this example's rules, the entire import is rejected if even one record is invalid. Do not remove problematic rows without reporting it.

## Example 3. A console experiment report

Create `experiment.py` that accepts a CSV path with a `value` column, validates 1–10000 finite values within ±1000000, prints the mean and standard deviation of the entire available population (`ddof=0`), and saves a histogram. The image path is passed through `--plot`. Do not overwrite an existing file without an explicit choice of another name; errors have exit code 2.

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
        raise ValueError("Expected 1–10000 value entries")
    values = pd.to_numeric(frame["value"], errors="raise")
    data = values.to_numpy(dtype=float)
    if not np.isfinite(data).all() or (np.abs(data) > 1e6).any():
        raise ValueError("Invalid values")
    return data


def main() -> int:
    parser = argparse.ArgumentParser(description="Experiment report")
    parser.add_argument("csv", type=Path)
    parser.add_argument("--plot", type=Path, default=Path("plot.png"))
    args = parser.parse_args()
    try:
        data = read_values(args.csv)
        if args.plot.exists():
            raise ValueError("Plot file already exists")
        fig, ax = plt.subplots(layout="constrained")
        try:
            ax.hist(data, bins=min(10, len(data)), color="0.75",
                    edgecolor="black")
            ax.set(xlabel="Value, arbitrary units", ylabel="Frequency")
            fig.savefig(args.plot, dpi=150)
        finally:
            plt.close(fig)
    except OSError, ValueError, pd.errors.ParserError:
        print("CSV or output-path error", file=sys.stderr)
        return 2
    print(f"n={len(data)}, mean={data.mean():.2f}, "
          f"std={data.std():.2f}")
    print(f"Plot: {args.plot.name}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

For a `values.csv` file with a `value` column and rows 1, 2, 3, the command `python experiment.py values.csv --plot result.png` outputs `n=3, mean=2.00, std=0.82` and `Plot: result.png`. A second run with the same output path exits with code 2. Do not confuse standard deviation with the standard error of the mean: they require different formulas and assumptions.

Data validation is separate from the plotting code. Create `test_experiment.py` beside the program; `tmp_path` provides a temporary directory, so the tests do not change working data.

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

Running `python -m pytest -q` checks five cases. Test the CLI separately: `--help`, a missing file, an existing PNG, a valid run, and the exit code. The general error printed in the short example can be expanded into a specific message without exposing unrelated data from the file.
