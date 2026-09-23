---
title: "Logical operators and the Math class"
description: "Topic 2. Types, variables, and operators: Logical operators and the Math class"
outline: [2, 3]
sourceHash: "b08ad9d18f8a3ff27ee27c494314acab12dca3379a10f8ccd5fac3f2859037f7"
---

# Logical operators and the Math class

## Comparison, logical, and bitwise operators

### Comparison operators

The operators `==` (equal), `!=` (not equal), `<`, `>`, `<=`, and `>=` compare values and return `bool`. Do not confuse equality `==` with assignment `=`. For floating-point numbers, remember representation errors (see above) (<https://learn.microsoft.com/dotnet/csharp/language-reference/operators/comparison-operators>).

### Logical operators

Logical operators act on `bool` values (<https://learn.microsoft.com/dotnet/csharp/language-reference/operators/boolean-logical-operators>):

- `!a` — logical NOT (negation);
- `a && b` — conditional logical AND: `true` if both operands are `true`;
- `a || b` — conditional logical OR: `true` if at least one operand is `true`;
- `a ^ b` — exclusive OR: `true` if the operands differ;
- `a & b`, `a | b` — logical AND and OR that always evaluate both operands.

`&&` and `||` use **short-circuit evaluation**: the right operand is not evaluated if the left already determines the result. This allows safe conditions where the second part makes sense only when the first is satisfied:

```cs
int count = 0, total = 10, age = 19, day = 6;
bool ok = count != 0 && total / count > 1;   // False, no division
bool isAdult = age >= 18 && age < 120;       // True
bool isWeekend = day == 6 || day == 7;       // True
```

### Bitwise and shift operators

Bitwise operators act on individual bits of integers (Table 2.6). They are used for flags and masks, packing multiple values into one number, and fast multiplication and division by powers of two (<https://learn.microsoft.com/dotnet/csharp/language-reference/operators/bitwise-and-shift-operators>).

Table 2.6. Bitwise and shift operators {.caption}

| **Operator** | **Name** | **Example** | **Result** |
| --- | --- | --- | --- |
| `&` | bitwise AND | `0b1100 & 0b1010` | `0b1000` (8) |
| `\|` | bitwise OR | `0b1100 \| 0b1010` | `0b1110` (14) |
| `^` | bitwise exclusive OR | `0b1100 ^ 0b1010` | `0b0110` (6) |
| `~` | bitwise complement | `~5` | −6 |
| `<<` | left shift | `1 << 10` | 1024 |
| `>>` | arithmetic right shift | `-16 >> 2` | −4 |
| `>>>` | logical right shift | `-16 >>> 2` | 1 073 741 820 |

Shifting left by *n* bits multiplies a number by 2<sup>*n*</sup>; shifting right divides it. For signed types, `>>` preserves the sign (filling high-order bits with the sign bit), whereas `>>>` fills them with zeros. Typical operations with a **mask**, a number whose set bits identify the bits of interest:

```cs
const int Read = 0b100, Write = 0b010, Execute = 0b001;
int rights = Read | Write;              // set bits: 0b110
bool canWrite = (rights & Write) != 0;  // test a bit: True
rights &= ~Write;                       // clear a bit: 0b100
rights ^= Execute;                      // toggle a bit: 0b101
```

### Operator precedence and associativity

Operations follow **precedence** rules (Table 2.7): in `2 + 3 * 4`, multiplication happens first, giving 14. Operators with the same precedence are evaluated left to right (**left-associative**): `10 - 4 - 3` is 3. Assignment, `??`, and `?:` are exceptions, evaluated right to left: `a = b = 0` first assigns 0 to `b` (<https://learn.microsoft.com/dotnet/csharp/language-reference/operators/#operator-precedence>).

Table 2.7. C# operator precedence {.caption}

| **Group (highest precedence first)** | **Operators** |
| --- | --- |
| primary | `x.y`, `f(x)`, `a[i]`, `x++`, `x--`, `checked`, `default`, `new` |
| unary | `+x`, `-x`, `!x`, `~x`, `++x`, `--x`, `(T)x` |
| multiplicative | `*`, `/`, `%` |
| additive | `+`, `-` |
| shift | `<<`, `>>`, `>>>` |
| relational | `<`, `>`, `<=`, `>=`, `is`, `as` |
| equality | `==`, `!=` |
| bitwise and logical | `&`, then `^`, then `\|` |
| conditional logical | `&&`, then `\|\|` |
| null-coalescing | `??` |
| conditional | `?:` |
| assignment | `=`, `+=`, `-=`, `*=`, `/=`, `%=`, `&=`, `\|=`, `^=`, `??=` |

Comparison operators have higher precedence than `&`, `^`, and `|`. The compiler therefore reads `flags & mask != 0` as `flags & (mask != 0)` and reports CS0019. You do not need to memorize the entire table: use parentheses in complex expressions to make evaluation order clear.

## The `Math` class and random numbers

The static `Math` class contains mathematical constants and functions (Table 2.8). Trigonometric functions take angles in **radians** (<https://learn.microsoft.com/dotnet/api/system.math>).

Table 2.8. Main members of the `Math` class {.caption}

| **Method or constant** | **Purpose and example** |
| --- | --- |
| `Math.PI`, `Math.E` | the numbers π = 3.14159… and *e* = 2.71828… |
| `Math.Abs(x)` | absolute value: `Math.Abs(-5)` is 5 |
| `Math.Pow(x, y)` | power: `Math.Pow(2, 10)` is 1024 (type `double`) |
| `Math.Sqrt(x)`, `Math.Cbrt(x)` | square and cube roots: `Math.Cbrt(27)` is 3 |
| `Math.Round(x)` | round to an integer: `Math.Round(2.5)` is 2, `Math.Round(3.5)` is 4 |
| `Math.Round(x, n)` | round to *n* decimal places: `Math.Round(1.23456, 2)` is 1.23 |
| `Math.Ceiling(x)` | round upward: `Math.Ceiling(2.1)` is 3 |
| `Math.Floor(x)` | round downward: `Math.Floor(-2.1)` is −3 |
| `Math.Truncate(x)` | discard the fractional part: `Math.Truncate(-2.7)` is −2 |
| `Math.Min(a, b)`, `Math.Max(a, b)` | the smaller or larger of two numbers |
| `Math.Clamp(x, min, max)` | constrain to a range: `Math.Clamp(15, 0, 10)` is 10 |
| `Math.Sin(x)`, `Math.Cos(x)` | sine and cosine of an angle in radians |
| `Math.Log(x)`, `Math.Log10(x)` | natural and base-10 logarithms |

### Rounding modes

By default, `Math.Round` uses **banker's rounding** (`MidpointRounding.ToEven`): a value exactly halfway between two candidates rounds to the nearest **even** one. Thus `Math.Round(2.5)` is 2, and `Math.Round(3.5)` is 4. This mode reduces accumulated error when summing many rounded values. The familiar school rule of rounding midpoints “away from zero” is selected with `MidpointRounding.AwayFromZero` (<https://learn.microsoft.com/dotnet/api/system.midpointrounding>):

```cs
var away = MidpointRounding.AwayFromZero;
Console.WriteLine(Math.Round(2.5));               // 2
Console.WriteLine(Math.Round(2.5, away));         // 3
Console.WriteLine(Math.Round(2.345m, 2));         // 2,34
Console.WriteLine(Math.Round(2.345m, 2, away));   // 2,35
```

With `double`, rounding to decimal places may produce unexpected results because the number itself is stored inexactly. Round monetary values using `decimal`.

### Random numbers

The `Random` class generates random numbers. The simplest approach is to use the shared `Random.Shared` generator (<https://learn.microsoft.com/dotnet/api/system.random.shared>):

```cs
int dice = Random.Shared.Next(1, 7);        // 1 through 6
double chance = Random.Shared.NextDouble(); // 0 up to 1 (excluding 1)
int percent = Random.Shared.Next(101);      // 0 through 100
```

The upper bound of `Next` is **excluded**: `Next(1, 7)` returns numbers from 1 through 6.
