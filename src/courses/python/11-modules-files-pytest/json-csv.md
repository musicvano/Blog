---
title: "JSON and CSV"
description: "Topic 11. Modules, files, pytest: JSON and CSV"
outline: [2, 3]
sourceHash: "6815fa154379881c884fa0d70881ca051ebb47f308306ba3ab14296edec2ee2b"
---

# JSON and CSV

## JSON and the stored-data contract

JSON describes objects, arrays, strings, numbers, Boolean values, and `null`. In Python, these are mostly `dict`, `list`, `str`, `int`/ `float`, `bool`, and `None`. JSON object keys are strings; a tuple becomes a list after a round trip through JSON. A class is not restored automatically from its name: you must explicitly validate the fields and create an instance. Reference: <https://docs.python.org/3.14/library/json.html>.

```mermaid
flowchart TB
  subgraph PY["Python"]
    PD["<code>dict</code>, <code>list</code><br>numbers, strings<br><code>True</code>, <code>None</code>"]
  end
  subgraph JS["JSON"]
    JD["object, array<br><code>number</code>, <code>string</code><br><code>true</code>, <code>null</code>"]
  end
  subgraph CS["CSV"]
    CD["table of rows<br>values as text<br>validate types"]
  end
  PY <--> JS
  JS <--> CS
```

Figure 11.4. JSON preserves structure; in CSV, the contract defines field types. {.caption}

`dumps` returns a string, and `loads` reads a string; `dump` and `load` work with a file object. `ensure_ascii=False` keeps Ukrainian letters visible, and `indent=2` makes the file readable. `allow_nan=False` prohibits nonstandard NaN and infinities when writing. Domain checks are also needed when reading: syntactically valid JSON may contain unknown fields or an incorrect amount type.

### Example 2. Expense tracking

The `expenses.py` file contains a record type and two persistence functions. The amount is a positive integer number of kopiykas; `bool` is not accepted as an integer amount. Loading returns a list only after all records have been validated. A file with invalid data is not silently repaired. We will use these functions in tests later.

```py
# expenses.py
import json
from dataclasses import asdict, dataclass
from pathlib import Path


@dataclass(frozen=True)
class Expense:
    category: str
    cents: int

    def __post_init__(self) -> None:
        if not isinstance(self.category, str):
            raise ValueError("category must be a string")
        if not self.category.strip():
            raise ValueError("category is empty")
        if type(self.cents) is not int or self.cents <= 0:
            raise ValueError("amount must be a positive integer")


def save(path: Path, items: list[Expense]) -> None:
    text = json.dumps([asdict(item) for item in items],
                      ensure_ascii=False, indent=2,
                      allow_nan=False)
    path.write_text(text, encoding="utf-8")


def load(path: Path) -> list[Expense]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError("an array of records is required")
    result: list[Expense] = []
    for row in data:
        if not isinstance(row, dict):
            raise ValueError("record must be an object")
        if set(row) != {"category", "cents"}:
            raise ValueError("invalid record fields")
        result.append(Expense(row["category"], row["cents"]))
    return result
```

A separate `demo_expenses.py` file runs the demonstration. The persistence functions neither print messages nor read keyboard input, so they can also be used in another interface.

```py
# demo_expenses.py
from pathlib import Path
from tempfile import TemporaryDirectory
from expenses import Expense, load, save


with TemporaryDirectory() as folder:
    path = Path(folder) / "expenses.json"
    save(path, [Expense("Transport", 3000), Expense("Food", 7500)])
    items = load(path)
    print(len(items), sum(item.cents for item in items))
```

```
2 10500
```

`JSONDecodeError` reports invalid syntax, while our `ValueError` reports a violation of the structure or domain rules. Do not catch an error merely to overwrite the file with an empty list. A production application also considers atomic file replacement: first write a temporary file beside the target in full, then replace the target. This protects against partial results but does not solve concurrent editing by multiple processes.

## CSV as a table of text fields

CSV is a format of rows and fields with a delimiter and quote-escaping rules. Do not parse it with an ordinary `split(";")`: a quoted field can contain a delimiter or even a newline. `csv.reader` returns lists of fields, while `DictReader` uses the first row as headers. All values read require explicit type conversion.

Open the file with `newline=""` so the CSV module controls line endings itself. For exchange with some Excel configurations, `delimiter=";"` and `encoding="utf-8-sig"` are convenient: the latter adds or removes a BOM. This does not guarantee identical automatic format detection in all Excel versions, so document the format parameters in the README. Reference: <https://docs.python.org/3.14/library/csv.html>.

### Example 3. A gradebook

The program creates a small gradebook in a temporary directory, reads it, and calculates the average score. Names remain strings; scores are converted to `int` and checked against 0..100. The exact headers are checked before rows are processed.

```py
import csv
from pathlib import Path
from tempfile import TemporaryDirectory


with TemporaryDirectory() as folder:
    path = Path(folder) / "grades.csv"
    with path.open("w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["name", "score"],
                                delimiter=";")
        writer.writeheader()
        writer.writerows([{"name": "Olena", "score": 80},
                          {"name": "Ivan", "score": 90}])
    scores: list[int] = []
    with path.open(encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f, delimiter=";")
        if reader.fieldnames != ["name", "score"]:
            raise ValueError("invalid header")
        for row in reader:
            if None in row or not row["name"].strip():
                raise ValueError("invalid row")
            score = int(row["score"])
            if not 0 <= score <= 100:
                raise ValueError("score out of range")
            scores.append(score)
    if not scores:
        raise ValueError("no grades")
    print(f"Average score: {sum(scores) / len(scores):.2f}")
```

```
Average score: 85.00
```

For an external file, also check missing fields, duplicate identifiers, and the chosen rule for blank rows. If the `score` field is missing, `DictReader` may return `None`, so an explicit check is required before conversion. In this self-contained example, the file is created with a complete schema; the lab requires validation of external input data.
