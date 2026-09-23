---
title: "Practice"
description: "Topic 1. Python, PyCharm, and Git: worked examples"
outline: [2, 3]
sourceHash: "c3d938b20651fa65c4194e0c995abb2e318fcb3f5d132d6b13a9479a7bf6e364"
---

# Practice

## Example 1. Room area

Create a `room` project in PyCharm with a *Project venv* environment. For a room 3.5 m wide and 4.2 m long, calculate the floor area and the length of the baseboard, ignoring doors. Specify the data in the program. Save the first working version in local Git. This example needs no external packages.

```py
"""Floor area and room perimeter."""


def main():
    width = 3.5
    length = 4.2
    area = width * length
    perimeter = 2 * (width + length)
    print(f"Floor area: {area:.2f} m²")
    print(f"Baseboard length: {perimeter:.2f} m")


if __name__ == "__main__":
    main()
```

Output:

```
Floor area: 14.70 m²
Baseboard length: 15.40 m
```

The decimal separator in code is a period. The `.2f` format retains two decimal places and does not depend on the Ukrainian keyboard layout. This differs from locale-based number formatting in some other languages. Change the width to 5 m, run again, and check the expected 21.00 m² and 18.40 m.

Create `.gitignore` in the project directory following the example in the lecture. Run `git init -b main` and set the author's name and email locally. Then:

```powershell
git add main.py .gitignore
git commit -m "Calculate room area and perimeter"
git status
```

The message should describe the change. After the commit, `git status` should not suggest adding `.venv`. If you changed the width for testing, restore the example data or record the change in a separate, justified commit.

## Example 2. Today's date and the humanize dependency

Create a separate `calendar_demo` project. The program must show the current date, the date seven days later, and the seven-day duration in words. For testing, support an optional `YYYY-MM-DD` date argument. Since the current date changes, the reference run uses the fixed argument `2026-09-16`.

In the terminal, in the new directory, run:

```powershell
py -V:3.14 -m venv .venv
.\.venv\Scripts\python.exe -m pip install humanize
.\.venv\Scripts\python.exe -m pip freeze > requirements.txt
```

In PyCharm, select this interpreter under *Settings → Python → Interpreter*. The `humanize` package converts quantities into textual representations: <https://humanize.readthedocs.io/en/stable/>. Its default English wording is retained here to make the test result predictable.

```py
"""Date and duration; the argument specifies a reference day."""
from datetime import date, timedelta
import sys

import humanize


def main():
    today = date.today()
    if len(sys.argv) > 1:
        today = date.fromisoformat(sys.argv[1])
    week = timedelta(days=7)
    print("Date:", today.isoformat())
    print("In a week:", (today + week).isoformat())
    print("Duration:", humanize.precisedelta(week))


if __name__ == "__main__":
    main()
```

Running `.\.venv\Scripts\python.exe main.py 2026-09-16` produces:

```
Date: 2026-09-16
In a week: 2026-09-23
Duration: 7 days
```

Without arguments, the system date is used. If you pass `16.09.2026`, `fromisoformat` reports `ValueError`: ISO format is required. We will study full error handling separately; here it is important to identify the cause correctly in the traceback. Test crossing a month boundary, for example with `2026-01-28`.

Create a clean `.check` environment alongside it, install packages with `.\.check\Scripts\python.exe -m pip install -r requirements.txt`, and repeat the run. Add `.check/` to `.gitignore` as well. Include `main.py`, `requirements.txt`, and the README in the commit; exclude environment directories. This checks that the program does not depend on a package installed globally by chance.

## Example 3. A distance converter in a uv project

Create a `distance` project that accepts one distance in kilometers from the command line, checks that the number is positive and finite, and prints meters and miles. One international statute mile is 1609.344 m. The `--help` option must explain usage; an invalid value must terminate the program with a nonzero exit code. This is a model for advanced-level tasks.

```powershell
uv init --python 3.14 distance
cd distance
uv add rich
```

Replace the generated `main.py` with this code:

```py
"""Convert kilometers to meters and miles."""
import argparse
import math
from rich.console import Console


def main():
    parser = argparse.ArgumentParser(description="km -> m, mi")
    parser.add_argument("km", type=float, help="distance in km")
    args = parser.parse_args()
    if not math.isfinite(args.km) or args.km <= 0:
        parser.error("km must be finite and positive")
    console = Console(color_system=None)
    console.print(f"Meters: {args.km * 1000:.2f}")
    console.print(f"Miles: {args.km / 1.609344:.3f}")


if __name__ == "__main__":
    main()
```

For `uv run main.py 5`, the output is:

```
Meters: 5000.00
Miles: 3.107
```

`argparse` belongs to the standard library. It converts the argument to a number, generates help, and prints errors to the error stream; `parser.error` terminates the process with exit code 2. The `isfinite` check also rejects `nan` and `inf`, which `float` can accept. We will study these constructs in detail in later topics; you can adapt the example for the first assignment.

Test `uv run main.py --help`, running without an argument, and the values `abc`, `0`, `-5`, and `nan`. These should not print a plausible conversion result. For valid data, check the units as well as the numbers.

Save `main.py`, `pyproject.toml`, `uv.lock`, `.python-version`, `.gitignore`, and the README in Git. Make separate meaningful commits for the calculations, argument validation, and reproduction instructions. In a clean copy of the directory, `uv sync --locked` should prepare the dependencies for another run. Uploading to GitHub from PyCharm is an optional extra step.
