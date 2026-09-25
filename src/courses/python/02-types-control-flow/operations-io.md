---
title: "Operations, input, and output"
description: "Topic 2. Types, operations, and control flow: Operations, input, and output"
outline: [2, 3]
sourceHash: "48808489d17c55cd9f2687cd61b225793f4e0932e15edfdfc7dc79388cfe719a"
---

# Operations, input, and output

## Operations and evaluation order

The operators `+`, `-`, `*`, `/`, `//`, `%`, and `**` perform addition, subtraction, multiplication, division, floor division, remainder, and exponentiation. Even `8 / 4` produces `2.0` of type `float`. For integers `a` and nonzero `b`, `a == (a // b) * b + a % b` holds.

```py
print(7 / 3, 7 // 3, 7 % 3)
print(-7 // 3, -7 % 3)
print(divmod(125, 60))
print(-2 ** 2, (-2) ** 2, 2 ** 3 ** 2)
```

Output:

```
2.3333333333333335 2 1
-3 2
(2, 5)
-4 4 512
```

`//` rounds toward negative infinity, rather than toward zero. An integer remainder has the divisor's sign or is zero. `divmod` returns the quotient and remainder together; `minutes, seconds = divmod(125, 60)` unpacks the two results. A zero divisor is invalid for `/`, `//`, and `%`.

Exponentiation has higher precedence than a unary minus on its left, and a chain of powers is evaluated from the right. When a formula is unclear, parentheses are more useful than relying on memory. Comparisons are performed after arithmetic, followed by `not`, `and`, and `or`. Complete table: <https://docs.python.org/3.14/reference/expressions.html>.

The comparison `0 <= score <= 100` is chained: `score` is evaluated once. `score == 5 or 6` means `(score == 5) or 6`, so it does not check for two valid numbers. Use `score == 5 or score == 6` or, after learning collections, `score in (5, 6)`.

### Short-circuit evaluation and assignment

`and` does not evaluate its right operand when the left is falsy; `or` skips the right operand when the left is truthy. Thus, `denominator != 0 and total / denominator > 10` avoids division by zero. These operators return one of their operands, not necessarily a `bool`: `"" or "guest"` gives `"guest"`.

`count += 1` is augmented assignment. For a number, it computes a new object and rebinds the name. `=` is not a comparison; an ordinary condition such as `if count = 1:` causes a syntax error.

The assignment expression `:=` lets you store a result and use it at the same time. For example, `while (text := input("> ")) != "0":` reads a string before each check. This is an optional feature in this topic: a regular loop with an explicit `input` and `break` is often clearer for beginners.

The bitwise operators `&`, `|`, `^`, `~`, `<<`, and `>>` work on integers: `5 & 3` gives 1, `5 | 3` gives 7, and `1 << 3` gives 8. They do not replace logical `and` and `or` and do not provide the same short-circuit evaluation. Typical uses include flags and access masks.

## Functions, rounding, and modules

`abs(x)` calculates an absolute value, `min(a, b)` and `max(a, b)` select the smaller and larger values, and `pow(a, b)` raises a value to a power. At a tie, `round(x)` rounds to the even number: `round(2.5)` gives 2, and `round(3.5)` gives 4. Because of binary representation, `round(2.675, 2)` may seem surprising: the result is 2.67. This is not a financial accounting rule.

The `math` module provides `sqrt`, `pi`, `floor`, `ceil`, trigonometric functions, and `isfinite`. Arguments to `sin` and `cos` are in radians; use `radians` for degrees. `floor(-2.3)` gives -3, and `ceil(-2.3)` gives -2. Documentation: <https://docs.python.org/3.14/library/math.html>.

The `random` module is useful for learning games and simulations. `random.randint(a, b)` includes both endpoints. For a repeatable test, you can create `random.Random(2026)`, but an ordinary game should not always be forced to start from the same state. Do not use this generator for passwords or secret tokens.

### Example. A receipt with an example VAT rate

The price before tax is 19.95 UAH, and the quantity is three units. The example rate is 20%; this is a calculation exercise, not tax advice. Round the tax once to kopiykas using `ROUND_HALF_UP`, then add it to the pretax amount.

```py
from decimal import Decimal, ROUND_HALF_UP

price = Decimal("19.95")
quantity = 3
rate = Decimal("0.20")
subtotal = price * quantity
tax = (subtotal * rate).quantize(
    Decimal("0.01"), rounding=ROUND_HALF_UP
)
total = subtotal + tax
print(f"{'Before VAT':<12}{subtotal:>8.2f}")
print(f"{'VAT':<12}{tax:>8.2f}")
print(f"{'Total':<12}{total:>8.2f}")
```

Output:

```
Before VAT     59.85
VAT            11.97
Total          71.82
```

The rounding rule is part of the problem: rounding each line item and rounding the total may produce different results. State your chosen rule explicitly in your own tasks. Learn more: <https://docs.python.org/3.14/library/decimal.html>.

## Console input and output

`input(prompt)` displays a prompt and returns a string without the trailing newline. Entering `12` does not automatically create a number. After `age = input("Age: ")`, the expression `age + age` concatenates text. A numeric problem requires explicit conversion.

`print` accepts several values. The `sep` parameter determines the separator, `end` the ending, and `file` the stream. Their defaults are a space, a newline, and standard output. Errors can be sent to `sys.stderr`.

```py
import sys

print("London", "Madrid", sep=" -> ")
print("Sum", end=": ")
print(f"{12.5:.2f}")
print("Example message", file=sys.stderr)
```

The first lines of standard output are `London -> Madrid` and `Sum: 12.50`. The last message goes to a separate stream; the order in which streams are interleaved may differ between terminals.

In an **f-string** (*formatted string literal*), an expression in braces is evaluated at runtime. The `.2f` format prints two decimal places, `>10` aligns right in a field at least 10 characters wide, and `<10` aligns left. The width does not truncate longer text.

### An input contract before studying exceptions

In this topic, we first define a simple valid format. For a counter, you can accept 1–6 unsigned ASCII digits. `isdigit()` alone is insufficient: some Unicode characters, such as a superscript two, are “digits” for this method but are not accepted by `int`. Combining `isascii()` with `isdecimal()` removes this ambiguity.

```py
text = input("Count (0..999999): ").strip()
if 1 <= len(text) <= 6 and text.isascii() and text.isdecimal():
    count = int(text)
    print("Twice as many:", 2 * count)
else:
    print("Enter 1 to 6 digits 0..9")
```

For input `12`, the result is `Twice as many: 24`; for `-2` or `2.5`, it is a format message. The length limit also prevents an excessively long string from reaching the constructor. For real numbers, the short examples below assume valid numeric notation with a decimal point and check the range of values. Full handling of arbitrary strings with `try`/`except` is covered in Topic 4.

::: tip Format and range of values
The string `"-5"` may be valid numeric notation but an invalid radius. Checking the format does not replace checking the physical meaning. In your report, state separately which errors the program handles and which are outside the learning exercise's input contract.
:::

In PyCharm, open *Tools → Python Console* and compare types and values (Fig. 2.3). The console retains state between commands, so it is best to restart it before a reference run. <https://www.jetbrains.com/help/pycharm/using-consoles.html>.

::: info Screenshot
Tools → Python Console: `x = 7 // 2`; `y = 0.1 + 0.2`; `z = 2 ** 100`; `type(y)`. Show variables.
:::

Figure 2.3. Checking expressions in Python Console {.caption}
