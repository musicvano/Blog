---
title: "Practice"
description: "Topic 5. Built-in collections: worked examples"
outline: [2, 3]
sourceHash: "6d8ea97483ecffab20a05c0bd9b35afaa7a42a8fb4cb747fa6a14daca917b04b"
---

# Practice

## Example 1. Matrix

Write a program that receives a rectangular integer matrix as a nested list, calculates row and column sums, and transposes it. Transposition swaps the row and column indices. Reject an empty matrix, an empty row, and rows of different lengths. Do not modify the original matrix. The demonstration data is defined in the code.

```py
def transpose(matrix: list[list[int]]) -> list[list[int]]:
    if not matrix or not matrix[0]:
        raise ValueError("The matrix cannot be empty")
    width = len(matrix[0])
    if any(len(row) != width for row in matrix):
        raise ValueError("Rows have different lengths")
    return [[row[column] for row in matrix]
            for column in range(width)]


def main() -> None:
    matrix = [[1, 2, 3], [4, 5, 6]]
    transposed = transpose(matrix)
    print("Row sums:", [sum(row) for row in matrix])
    print("Column sums:", [sum(row) for row in transposed])
    print("Transposed:")
    for row in transposed:
        print(*row)


if __name__ == "__main__":
    main()
```

```text
Row sums: [6, 15]
Column sums: [5, 7, 9]
Transposed:
1 4
2 5
3 6
```

The function returns new rows, so changing a result element does not change the source. The sum of all row sums equals the sum of all column sums: this provides an additional check without repeating the transposition algorithm. For `[[7]]`, the result is `[[7]]`; for `[[-1, 1]]`, the row sum is 0. For `[]`, `[[]]`, and `[[1], [2, 3]]`, expect `ValueError`.

## Example 2. Phone book

Write a program that accepts contacts in `name:number` format through command-line arguments. Without arguments, prompt for one line of space-separated records. Names contain no spaces or colons; a number consists of ten ASCII digits, including leading zeros. Names and numbers must be unique so that the reverse “number–name” dictionary does not lose records.

The `--help` command prints help. Write errors to the error stream and exit with code 2; successful execution exits with code 0. Print the sorted directory, the total, the result of looking up the contact `Anna` with `get`, and a reverse lookup of the first number. This is a small interface example for the advanced tasks.

```py
import sys


def parse_contacts(records: list[str]) -> dict[str, str]:
    contacts: dict[str, str] = {}
    phones: set[str] = set()
    for record in records:
        name, phone = record.split(":")
        if not name or any(char.isspace() for char in name):
            raise ValueError("Invalid name")
        if len(phone) != 10 or not phone.isascii():
            raise ValueError("10 ASCII digits required")
        if not phone.isdecimal():
            raise ValueError("The number contains nondigit characters")
        if name in contacts or phone in phones:
            raise ValueError("Duplicate name or number")
        contacts[name] = phone
        phones.add(phone)
    return contacts


def main() -> int:
    args = sys.argv[1:]
    if args == ["--help"]:
        print("main.py name:number ...; without arguments: input")
        return 0
    try:
        if not args:
            args = input("Contacts: ").split()
        contacts = parse_contacts(args)
    except ValueError, EOFError:
        print("Error: check the format and duplicates", file=sys.stderr)
        return 2
    reverse = {phone: name for name, phone in contacts.items()}
    for name in sorted(contacts):
        print(f"{name:<10} {contacts[name]}")
    print("Total:", len(contacts))
    print("Anna:", contacts.get("Anna", "not found"))
    if contacts:
        first_phone = contacts[sorted(contacts)[0]]
        print("By number:", reverse[first_phone])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

For the arguments `Oleh:0671112233 Anna:0502223344`, the output is:

```text
Anna       0502223344
Oleh       0671112233
Total: 2
Anna: 0502223344
By number: Anna
```

A number is a string because no arithmetic is needed and the leading zero matters. Unpacking the result of `split` checks for exactly two fields: zero or two colons raise `ValueError`. Python 3.14 permits `except ValueError, EOFError:` without parentheses when `as` is not used. This syntax does not work in earlier versions. An empty input line produces a valid empty directory; end-of-stream before a line is treated as an input error.

A general directory may allow shared numbers. In that case, the reverse mapping should have type `dict[str, list[str]]` rather than silently overwrite the previous owner. This task's unique-number rule makes the dictionary comprehension correct.

## Example 3. Visitors on two days

Given visit lists for two days, a name may repeat if a visitor came several times. Count each day's unique visitors, shared visitors, new visitors on the second day, and total visit frequencies. Sort the frequency results by descending count, breaking ties by name. The data is defined in the code.

```py
from collections import Counter


def visit_report(days: list[list[str]]) -> None:
    if len(days) != 2:
        raise ValueError("Exactly two days are required")
    labels = ["First", "Second"]
    for number, (label, visits) in enumerate(
        zip(labels, days, strict=True), start=1
    ):
        print(f"{number}. {label}: {len(set(visits))}")
    first, second = (set(day) for day in days)
    print("Shared:", sorted(first & second))
    print("New:", sorted(second - first))
    counts = Counter(name for day in days for name in day)
    ordered = sorted(counts.items(),
                     key=lambda item: (-item[1], item[0]))
    for name, count in ordered:
        print(f"{name}: {count}")
    print("Visits:", sum(counts.values()))


days = [["Anna", "Oleh", "Anna"], ["Oleh", "Ira"]]
visit_report(days)
```

```text
1. First: 2
2. Second: 2
Shared: ['Oleh']
New: ['Ira']
Anna: 2
Oleh: 2
Ira: 1
Visits: 5
```

A set answers “who visited,” while a counter answers “how many times.” The total number of visits equals the sum of the original list lengths. For two empty days, both sets and the counter are empty, and the total is 0. One empty day does not prevent processing the other.
