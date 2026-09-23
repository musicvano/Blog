---
title: "Practice"
description: "Topic 3. Functions: worked examples"
outline: [2, 3]
sourceHash: "7f8f9f5e85211ca2921413f226892b9640736f1c21497d5ce1b8fb0c26b632e2"
---

# Practice

## Example 1. A length unit converter

Write a program that reads a nonnegative integer length in meters from 0 to 1000000 and an output unit `m`, `cm`, or `km`. The calculation function accepts a keyword-only unit parameter and returns `None` for an unknown unit. An input function is unnecessary here: validation is short and runs only once.

```py
def convert(metres: float, *, unit: str = "km") -> float | None:
    """Convert a nonnegative finite length in meters."""
    if unit == "m":
        return metres
    if unit == "cm":
        return metres * 100
    if unit == "km":
        return metres / 1000
    return None


text = input("Meters, integer 0..1000000: ").strip()
unit = input("Unit m/cm/km: ").strip()
if not (1 <= len(text) <= 7 and text.isascii()
        and text.isdecimal() and int(text) <= 1_000_000):
    print("Error: an integer from 0 to 1000000 is required")
else:
    answer = convert(float(text), unit=unit)
    if answer is None:
        print("Error: unknown unit")
    else:
        print(f"Result: {answer:.3f} {unit}")
```

For input `1250`, `km`:

```
Result: 1.250 km
```

Short-circuit evaluation of `and` guarantees that `int` runs only after the digits are checked. Zero is a valid length, so check the result with `is None` rather than its truthiness. The calculation contract requires a finite number; the console interface ensures this precondition by limiting the text length. For `0`, `cm`, expect `0.000 cm`; for `-1`, an empty string, or `1000001`, expect an error message.

## Example 2. Digit sum and palindrome

Enter 1 to 12 ASCII digits. Calculate the digit sum by recursively separating the last digit. Check the palindrome using the original text, so leading zeros matter. For example, `0110` is a palindrome, although the integer 110 is not.

```py
def digit_sum(number: int) -> int:
    """Digit sum of a nonnegative integer."""
    if number < 10:
        return number
    return number % 10 + digit_sum(number // 10)


def palindrome(text: str, left: int, right: int) -> bool:
    """Check text between inclusive indices."""
    if left >= right:
        return True
    return (text[left] == text[right]
            and palindrome(text, left + 1, right - 1))


text = input("From 1 to 12 digits: ").strip()
if not (1 <= len(text) <= 12 and text.isascii()
        and text.isdecimal()):
    print("Error: ASCII digits are required, at most 12")
else:
    print("Sum:", digit_sum(int(text)))
    print("Palindrome:", palindrome(text, 0, len(text) - 1))
```

For input `12321`:

```
Sum: 9
Palindrome: True
```

The sum for `0` is 0; single-character text is a palindrome. For `123`, the sum is 6 and the check returns `False`. The length limit protects both conversion and recursion depth. The recursive check creates no substring copies because it passes indices. When the outer characters differ, `and` skips the next call.

## Example 3. An order report

Create a program with a function that accepts the customer's name positionally only, a discount factor by keyword only, and any set of named product amounts. In this learning example, all amounts are nonnegative integer hryvnias, and the discount is from 0 to 1. Return a report string and the total. We do not validate arbitrary input here: data is specified directly to demonstrate unpacking.

```py
def order_report(customer: str, /, *, discount: float = 0.0,
                 **amounts: int) -> tuple[str, float]:
    """Report for integer amounts >= 0 and 0 <= discount <= 1."""
    lines = [f"Customer: {customer}"]
    subtotal = 0
    for name, amount in amounts.items():
        lines.append(f"{name:<12}{amount:>8.2f}")
        subtotal += amount
    total = subtotal * (1 - discount)
    lines.append(f"{'Amount due':<12}{total:>8.2f}")
    return "\n".join(lines), total


products = {"tea": 40, "bread": 60}
report, total = order_report("Olena", discount=0.1, **products)
print(report)
print("Check:", total == 90.0)
```

```
Customer: Olena
tea            40.00
bread          60.00
Amount due     90.00
Check: True
```

`items()` yields key/value pairs, and `join` joins strings with a newline character. Product order follows dictionary insertion order. Do not use the keys `discount` and `customer` as product names: the first has a special meaning, while the second creates unnecessary ambiguity in the contract. Real monetary calculations need explicitly defined decimal rounding; this example demonstrates functions using simple exercise amounts.
