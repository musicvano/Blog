---
title: "Practice"
description: "Topic 11. Modules, files, pytest: worked examples"
outline: [2, 3]
sourceHash: "f8546cc2b1ce7cac80cad3182748b6bfe215f787a6ec80e0853d338837d7c044"
---

# Practice

## Example 1. Folder analysis

Traverse a directory tree and calculate the total size of regular files by extension. Skip symbolic links. Convert extensions to lowercase and label absent extensions `(none)`. Sort the CSV report by extension; create the output file after scanning so it is not included in its own statistics. For the demonstration, use a temporary tree of three files.

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

Size is measured in bytes, not characters. During a real scan, a file may disappear after `is_file`, and access may be denied. Define a policy: terminate with an error or include a list of skipped paths in the report. Do not report complete success if part of the tree could not be read.

## Example 2. Contacts in JSON

Store a “name → phone” dictionary. The name is nonempty, and the phone is a nonempty string of ASCII digits. This is a learning format without international phone-number rules. The `contacts.py` file has save and load functions that do not change the original dictionary.

```py
# contacts.py
import json
from pathlib import Path


def validate(data: object) -> dict[str, str]:
    if not isinstance(data, dict):
        raise ValueError("a dictionary is required")
    for name, phone in data.items():
        if not isinstance(name, str) or not name.strip():
            raise ValueError("invalid name")
        if not isinstance(phone, str):
            raise ValueError("phone must be a string")
        if not phone.isascii() or not phone.isdecimal():
            raise ValueError("phone must contain digits only")
    return data.copy()


def save(path: Path, contacts: dict[str, str]) -> None:
    text = json.dumps(validate(contacts), ensure_ascii=False)
    path.write_text(text, encoding="utf-8")


def load(path: Path) -> dict[str, str]:
    data = json.loads(path.read_text(encoding="utf-8"))
    return validate(data)
```

The `test_contacts.py` file checks preservation of a Ukrainian name, a phone's leading zero, and rejection of an invalid format.

```py
# test_contacts.py
from pathlib import Path
import pytest
from contacts import load, save, validate


def test_round_trip(tmp_path: Path) -> None:
    path = tmp_path / "contacts.json"
    save(path, {"Olena": "0123"})
    assert load(path) == {"Olena": "0123"}


@pytest.mark.parametrize("phone", ["", "12x", 123])
def test_bad_phone(phone: object) -> None:
    with pytest.raises(ValueError):
        validate({"Olena": phone})
```

`python -m pytest -q test_contacts.py` gives `4 passed`. The phone is not converted to a number because the leading zero matters. Also test invalid JSON by expecting `json.JSONDecodeError`, and a missing file by expecting `FileNotFoundError`. Do not confuse these cases with a valid empty address book `{}`.

## Example 3. A CSV → JSON conversion package

Create a `tableconvert` folder with an empty `__init__.py`. The `tableconvert/core.py` file reads CSV with the exact headers `name;quantity`, validates nonnegative integer quantities, and writes a JSON array. All rows are validated before the output file is opened. Reading and overwriting the same path is explicitly prohibited.

```py
# tableconvert/core.py
import csv
import json
from pathlib import Path


def convert(source: Path, target: Path) -> int:
    if source.resolve() == target.resolve():
        raise ValueError("input and output must be different")
    result: list[dict[str, str | int]] = []
    with source.open(encoding="utf-8-sig", newline="") as stream:
        reader = csv.DictReader(stream, delimiter=";")
        if reader.fieldnames != ["name", "quantity"]:
            raise ValueError("invalid header")
        for row in reader:
            if None in row or any(v is None for v in row.values()):
                raise ValueError("invalid field count")
            name = row["name"].strip()
            quantity = int(row["quantity"])
            if not name or quantity < 0:
                raise ValueError("invalid record")
            result.append({"name": name, "quantity": quantity})
    text = json.dumps(result, ensure_ascii=False, indent=2)
    target.write_text(text, encoding="utf-8")
    return len(result)
```

The `tableconvert/__main__.py` file defines the console interface.

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
    print("Records:", count)


if __name__ == "__main__":
    main()
```

For an `input.csv` file with the contents below, the command `python -m tableconvert input.csv output.json` prints `Records: 2`; quantities in JSON are numbers rather than strings.

```text
name;quantity
Notebook;3
Pencil;0
```

Add `test_convert.py` in the project root. The test demonstrates that an invalid row does not overwrite the previous result.

```py
# test_convert.py
from pathlib import Path
import pytest
from tableconvert.core import convert


def test_invalid_preserves_output(tmp_path: Path) -> None:
    source = tmp_path / "input.csv"
    target = tmp_path / "output.json"
    source.write_text("name;quantity\nNotebook;-1\n",
                      encoding="utf-8")
    target.write_text("old", encoding="utf-8")
    with pytest.raises(ValueError):
        convert(source, target)
    assert target.read_text(encoding="utf-8") == "old"
```

`python -m pytest -q test_convert.py` gives `1 passed`. This guarantee applies to an input-data error. A disk failure during writing requires a separate atomic file replacement policy, which can be added at the advanced task level.
