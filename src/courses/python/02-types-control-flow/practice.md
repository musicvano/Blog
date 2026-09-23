---
title: "Practice"
description: "Topic 2. Types, operations, and control flow: worked examples"
outline: [2, 3]
sourceHash: "3ff0b0c7fdacdd6399b7f82ae12d1c86051bb76f7a6ef4297f74ce2001d407a8"
---

# Practice

## Example 1. Body mass index

Calculate the ratio of mass in kilograms to the square of height in meters. For a branching exercise, use these index intervals: below 18.5; from 18.5 to 25; from 25 to 30; and 30 or above. Left endpoints are inclusive, and right endpoints are exclusive. This is an arithmetic classification exercise for adults, rather than an individual medical assessment. Information about the measure: <https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html>.

Input must use numeric notation with a decimal point. The program rejects nonfinite and nonpositive values. To guard against obvious unit errors, this exercise uses learning limits: mass up to 500 kg, and height from 0.5 to 2.5 m. These are not medical standards.

```py
import math

mass = float(input("Mass, kg: "))
height = float(input("Height, m: "))
if not (math.isfinite(mass) and math.isfinite(height)):
    print("Finite numbers are required")
elif not (0 < mass <= 500 and 0.5 <= height <= 2.5):
    print("Check the input limits and units")
else:
    bmi = mass / height ** 2
    if bmi < 18.5:
        interval = "below 18.5"
    elif bmi < 25:
        interval = "from 18.5 to 25"
    elif bmi < 30:
        interval = "from 25 to 30"
    else:
        interval = "30 or above"
    print(f"Index: {bmi:.2f}")
    print("Interval:", interval)
```

For a mass of 72 kg and height of 1.8 m:

```
Index: 22.22
Interval: from 18.5 to 25
```

Conditions are checked using the unrounded value; `.2f` applies only to printing. With a height of 2 m and masses of 74, 100, and 120 kg, the exact boundaries are 18.5, 25, and 30. They should fall in the next interval. Zero height must be rejected before division. Entering `180` instead of `1.8` should not produce a plausible result.

## Example 2. Prime numbers in a range

Enter integer endpoints `left` and `right`. Values from 0 to 100000 are allowed, with the left endpoint no greater than the right and a range width of at most 1000. Print all prime numbers, including endpoints, and their count. The range is limited for fast interactive execution.

Check the integer format before conversion: up to six unsigned ASCII digits. The numbers 0 and 1 are not prime. Search for a divisor up to and including `isqrt(number)`; a found divisor ends the inner loop through `break`. If no divisor exists, its `else` runs.

```py
from math import isqrt

left_text = input("Left endpoint: ").strip()
right_text = input("Right endpoint: ").strip()
valid = (1 <= len(left_text) <= 6
         and left_text.isascii() and left_text.isdecimal()
         and 1 <= len(right_text) <= 6
         and right_text.isascii() and right_text.isdecimal())
if not valid:
    print("Enter 1 to 6 digits for each endpoint")
else:
    left = int(left_text)
    right = int(right_text)
    if not (0 <= left <= right <= 100000
            and right - left <= 1000):
        print("Invalid endpoints or range too wide")
    else:
        count = 0
        for number in range(max(2, left), right + 1):
            for divisor in range(2, isqrt(number) + 1):
                if number % divisor == 0:
                    break
            else:
                print(number, end=" ")
                count += 1
        print()
        print("Count:", count)
```

For endpoints 10 and 20:

```
11 13 17 19
Count: 4
```

A space is technically printed after the last prime, followed by a newline. You do not need to mark it explicitly in the report. For endpoints 0 and 1, the first line is empty and the count is 0. For endpoints 2 and 2, the only prime is 2, even though the inner loop performs no iterations. This case specifically checks your understanding of `for ... else`.

The indentation of `else` matches the inner `for`, not the `if`. Moving it to another level changes the algorithm's meaning. Also test equal composite endpoints `9, 9`, reversed endpoints `20, 10`, a minus sign, an empty string, and the superscript-two character.

## Example 3. A currency converter with a menu

Build a menu for converting hryvnias to example USD and EUR amounts. The fixed hypothetical rates are 40.00 UAH per USD and 44.00 UAH per EUR. These are test constants, not current exchange rates. Command `0` exits. Print a rate table and a result with two decimal places.

The amount is entered as an integer number of hryvnias from 1 to 1000000. This contract lets you focus on the menu and loop without using exceptions prematurely. Calculations use Decimal, with explicit `ROUND_HALF_UP` rounding for the result.

```py
from decimal import Decimal, ROUND_HALF_UP

print(f"{'Currency':<10}{'UAH per unit':>15}")
print(f"{'USD':<10}{'40.00':>15}")
print(f"{'EUR':<10}{'44.00':>15}")
while True:
    command = input("1 - USD, 2 - EUR, 0 - exit: ").strip()
    match command:
        case "0":
            break
        case "1":
            currency, rate = "USD", Decimal("40.00")
        case "2":
            currency, rate = "EUR", Decimal("44.00")
        case _:
            print("Unknown command")
            continue
    text = input("Amount, whole UAH: ").strip()
    if not (1 <= len(text) <= 7 and text.isascii()
            and text.isdecimal()):
        print("Enter a whole amount using digits")
        continue
    amount = int(text)
    if not 1 <= amount <= 1_000_000:
        print("Amount outside 1..1000000")
        continue
    result = (Decimal(amount) / rate).quantize(
        Decimal("0.01"), rounding=ROUND_HALF_UP
    )
    print(f"{amount:.2f} UAH = {result:.2f} {currency}")
```

For command `1`, amount `1000`, and then command `0`, the table and result are:

```
Currency     UAH per unit
USD                 40.00
EUR                 44.00
1000.00 UAH = 25.00 USD
```

Header spacing is determined by the width of the second field: the complete actual output also includes the `input` prompts. For command `2` and amount `1000`, expect `22.73 EUR`. An unknown command returns to the menu before asking for an amount. An invalid amount does not terminate the program; it starts a new iteration. The exit command is handled before selecting a rate, so an old rate cannot accidentally be used after termination.
