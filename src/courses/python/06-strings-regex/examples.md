---
title: "Program examples and common mistakes"
description: "Topic 6. Strings and regular expressions: program examples and common mistakes"
outline: [2, 3]
sourceHash: "93ba7f4502529b403e5daf13b4e5c9964cdfad92d3623ea77e19793d04dac017"
---

# Program examples and common mistakes

## Program examples

### Example 1. Word frequencies in a sample text

Write a program that combines equivalent Unicode forms, ignores case, counts words, and finds the longest word. In this example, assume words are separated by whitespace and only the listed punctuation may appear at word edges.

```py
import unicodedata
from collections import Counter

def words_of(text: str) -> list[str]:
    normal = unicodedata.normalize("NFC", text.casefold())
    words = []
    for item in normal.split():
        word = item.strip(".,!?;:«»")
        if word:
            words.append(word)
    return words

def main() -> None:
    text = "Кіт, кіт і їжак. Їжак!"
    words = words_of(text)
    for word, count in sorted(Counter(words).items()):
        print(f"{word}: {count}")
    longest = max(words, key=len, default="")
    print(f"Longest: {longest or 'no words'}")

if __name__ == "__main__":
    main()
```

Output:

```
кіт: 2
і: 1
їжак: 2
Longest: їжак
```

An empty list is handled by the `default` argument to `max`. Equal lengths are resolved by choosing the first occurrence. Sorting here follows code points, not a complete dictionary alphabet. Text without a space after a comma would require a different tokenization contract. An explicit limitation is better than silently changing what “word” means during counting.

### Example 2. Sales table

Build a report from a product list: name, quantity, price, amount, and share of revenue. Store monetary values as integer kopiykas; conversion to a fractional number is needed only for display.

```py
def main() -> None:
    rows = [("Notebook", 3, 2500), ("Pencil", 2, 1250)]
    total = sum(count * price for _, count, price in rows)
    print(f"{'Product':<10} {'Qty':>4} {'Amount':>8} {'Share':>7}")
    for name, count, price in rows:
        subtotal = count * price
        share = subtotal / total if total else 0
        print(f"{name:<10} {count:>4} "
              f"{subtotal / 100:>8.2f} {share:>7.1%}")
    print(f"Total: {total / 100:.2f} UAH")

if __name__ == "__main__":
    main()
```

Output:

```
Product     Qty   Amount   Share
Notebook      3    75.00   75.0%
Pencil        2    25.00   25.0%
Total: 100.00 UAH
```

Notice the protection against division by zero for an empty or zero-total report. Input validation is unnecessary for valid data defined in the program; in variants with input, reject negative quantities and prices before calculating totals.

### Example 3. An HTML message with text interpolation

Greet the user in a paragraph without interpreting the entered name as HTML. Allow interpolations only in paragraph text; this processor does not support conversions or format specifications.

```py
from html import escape
from string.templatelib import Template

def html_text(template: Template) -> str:
    pieces = [template.strings[0]]
    for index, field in enumerate(template.interpolations):
        if field.conversion or field.format_spec:
            raise ValueError("Conversion is not supported")
        pieces.append(escape(str(field.value), quote=True))
        pieces.append(template.strings[index + 1])
    return "".join(pieces)

def main() -> None:
    name = "<b>Olia & Ivan</b>"
    print(html_text(t"<p>Welcome, {name}!</p>"))

if __name__ == "__main__":
    main()
```

Output:

```
<p>Welcome, &lt;b&gt;Olia &amp; Ivan&lt;/b&gt;!</p>
```

Static parts are not escaped because they are trusted markup. Values are processed before joining, so entered angle brackets remain visible text. Do not use the function to interpolate tag names or `script` content; its contract is deliberately narrow. Tests should include an ampersand, quotes, an empty string, and several adjacent interpolations to verify that boundaries are preserved.

### Example 4. Parsing a sample log

Suppose a record has the format `time method path code`: time is `HH:MM:SS`, method is `GET` or `POST`, the path contains no spaces, and the code is a number from 100 to 599. Validate each entire line and count the codes.

```py
import re
from collections import Counter

PATTERN = re.compile(r"""
    (?P<time>(?:[01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])
    [ ](?P<method>GET|POST)
    [ ](?P<path>/\S*)
    [ ](?P<status>[1-5][0-9]{2})
""", re.VERBOSE)

def main() -> None:
    text = "12:30:00 GET /home 200\n12:31:00 POST /login 403"
    counts: Counter[str] = Counter()
    for number, line in enumerate(text.splitlines(), start=1):
        match = PATTERN.fullmatch(line)
        if match is None:
            print(f"Line {number}: invalid format")
            continue
        counts[match.group("status")] += 1
    for status, count in sorted(counts.items()):
        print(f"{status}: {count}")

if __name__ == "__main__":
    main()
```

Output: `200: 1`, then `403: 1`. The expression rejects `25:00:00` or a line with an extra field. To list match positions in arbitrary text, use `finditer`; for validating each record here, `fullmatch` is the correct choice.

## Limitations, checks, and common mistakes

Not every text needs regex. Finding a literal substring with `in` is simpler than `search`; splitting on one delimiter with `split` is clearer than an equivalent expression. Arbitrarily nested structures and formal languages require a parser for the corresponding format.

In expressions with ambiguous nested repetitions, such as `(a+)+`, a failed match on long input can cause extensive backtracking. Do not demonstrate this on unbounded data. The `re` module has no timeout argument for ordinary `search`: limit input string lengths and simplify the pattern. A lazy quantifier alone does not guarantee linear time.

When testing a validator, use a valid string, an empty string, a missing character, an extra character, boundary lengths, a final newline, and similar characters from other alphabets. For a converter, add a check that unchanged fragments are preserved. Check length limits before running a complex expression.

Table 6.1. Common mistakes in string processing {.caption}

| **Mistake** | **Cause and correction** |
| --- | --- |
| `text.strip()` changed nothing | Strings are immutable; store the returned value. |
| `strip(".txt")` damages a name | This is a character set; use `removesuffix`. |
| `len(data)` gives a different length | Bytes and code points use different units. |
| `match` accepts an extra suffix | Entire-input validation requires `fullmatch`. |
| `\d` accepts unusual digits | This is a Unicode class; use `[0-9]` as required. |
| A t-string printed a structure | A processor with a defined contract is needed. |
| Table width is disrupted | Width is a minimum; limit name lengths. |

Commands can also be parsed without regex: use `split`, then `match` with list patterns such as `case ["find", word]:`. Here, `match` is the Python statement from Topic 2, not the `re.match` function. It works with values already obtained, whereas a regular expression describes characters inside a string.
