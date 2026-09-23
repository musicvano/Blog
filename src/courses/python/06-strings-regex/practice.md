---
title: "Practice"
description: "Topic 6. Strings and regular expressions: worked examples"
outline: [2, 3]
sourceHash: "9be6ba2cce520480fe9745f8a5b2e8e56d3203ea6fd5d53e1769b29d80175628"
---

# Practice

## Example 1. A learning Caesar cipher

Write a program that shifts Ukrainian letters by a given number of positions in the alphabet, preserves case, and leaves whitespace and punctuation unchanged. After encryption, reverse the transformation. This is a character-substitution exercise, unsuitable for protecting secret data.

```py
ALPHABET = "абвгґдеєжзиіїйклмнопрстуфхцчшщьюя"

def caesar(text: str, shift: int) -> str:
    shift %= len(ALPHABET)
    rotated = ALPHABET[shift:] + ALPHABET[:shift]
    source = ALPHABET + ALPHABET.upper()
    target = rotated + rotated.upper()
    return text.translate(str.maketrans(source, target))

def main() -> None:
    text = "АБВ, Ґанок!"
    encoded = caesar(text, 1)
    print(encoded)
    print(caesar(encoded, -1))
    print(caesar(text, 33) == text)

if __name__ == "__main__":
    main()
```

Output:

```
БВГ, Дбопл!
АБВ, Ґанок!
True
```

The remainder operation brings the shift into the alphabet's index range. The table contains both lowercase and uppercase letters; `translate` leaves characters outside the table unchanged. Test an empty string, a negative shift, a shift of 33, and the final letter “я”. The property `caesar(caesar(text, k), -k) == text` must hold for each test. If the input contains decomposed letters, first agree on an NFC normalization rule.

## Example 2. Checking a sample password policy

Write a program that checks given strings against a learning rule: length 8–32 characters; only ASCII letters, digits, and `!@#$%`; at least one uppercase letter, lowercase letter, digit, and special character. Explain every violation. This is a regex exercise, not an assessment of real password strength. Do not enter real passwords for the demonstration.

```py
import re

ALLOWED = r"[A-Za-z0-9!@#$%]{8,32}"
POLICY = re.compile(
    r"(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])"
    + ALLOWED
)

def violations(text: str) -> list[str]:
    errors = []
    if not 8 <= len(text) <= 32:
        errors.append("length outside the range 8–32")
    if re.fullmatch(r"[A-Za-z0-9!@#$%]*", text) is None:
        errors.append("contains disallowed characters")
    checks = [(r"[a-z]", "missing a lowercase letter"),
              (r"[A-Z]", "missing an uppercase letter"),
              (r"[0-9]", "missing a digit"),
              (r"[!@#$%]", "missing a special character")]
    for pattern, message in checks:
        if re.search(pattern, text) is None:
            errors.append(message)
    return errors

def main() -> None:
    samples = ["Abcdef1!", "abcdef12", "Abcdef1!\n"]
    for number, text in enumerate(samples, start=1):
        errors = violations(text)
        assert (POLICY.fullmatch(text) is not None) == (not errors)
        result = "; ".join(errors) if errors else "rules satisfied"
        print(f"Test {number}: {result}")

if __name__ == "__main__":
    main()
```

Output:

```
Test 1: rules satisfied
Test 2: missing an uppercase letter; missing a special character
Test 3: contains disallowed characters
```

Lookaheads only check for the required classes; the main character class and `fullmatch` define the allowed length and prohibit an extra suffix. A separate function returns explanations that a single Boolean regex result does not contain. `assert` compares two validation methods during development; it does not replace input validation because `-O` mode can disable it.

For boundary checks, add strings of lengths 7, 8, 32, and 33, a Cyrillic letter, a tab, and an empty string. In an application with arbitrary input, limit its length before searching. Do not put the entered secret in an error message or log; the test number and reason are sufficient.

## Example 3. Dates and amounts in receipt text

Write a program that finds dates in `DD.MM.YYYY` format, replaces valid dates with ISO format `YYYY-MM-DD`, and leaves invalid dates unchanged. Find nonnegative amounts such as `12,50 UAH` and calculate the total in integer kopiykas. In this learning format, a number cannot be preceded by a minus sign, digit, point, or comma.

```py
import re
from datetime import date

DATES = re.compile(r"\b([0-9]{2})\.([0-9]{2})\.([0-9]{4})\b")
MONEY = re.compile(r"(?<![\d.,-])([0-9]+),([0-9]{2}) UAH\b")

def iso_date(match: re.Match[str]) -> str:
    day, month, year = map(int, match.groups())
    try:
        return date(year, month, day).isoformat()
    except ValueError:
        return match.group()

def main() -> None:
    text = "Receipt 17.09.2026: 12,50 UAH; 7,25 UAH. 31.02.2026"
    print(DATES.sub(iso_date, text))
    amounts = MONEY.findall(text)
    total = sum(int(uah) * 100 + int(kop) for uah, kop in amounts)
    print(f"Items: {len(amounts)}")
    print(f"Total: {total // 100},{total % 100:02d} UAH")

if __name__ == "__main__":
    main()
```

Output:

```
Receipt 2026-09-17: 12,50 UAH; 7,25 UAH. 31.02.2026
Items: 2
Total: 19,75 UAH
```

The regular expression identifies the date structure, while `date` checks the calendar. The replacement function returns the original match when the date is invalid. In a production import, such a date would need a separate message, but this example's contract preserves it for manual review. We count kopiykas as integers, so `float` error does not accumulate. Test a leap day, a zero month, the amount `0,00 UAH`, no amounts, and an incorrect number of kopiyka digits.
