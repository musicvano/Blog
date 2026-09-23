---
title: "Examples and common mistakes"
description: "Topic 2. Types, variables, and operators: Examples and common mistakes"
outline: [2, 3]
sourceHash: "30f836b8d58163e1b3e926d0fe2b4abc655a7d475ea7259931f050d34d959c99"
---

# Examples and common mistakes

## Program examples

### Numeric type ranges

The program displays the size and range of each numeric type. The `Print` method has `object` parameters, so it accepts values of any type (with boxing).

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine($"{"Type",-7}{"Bytes",6}  {"Minimum",-21}Maximum");
Print("sbyte", sizeof(sbyte), sbyte.MinValue, sbyte.MaxValue);
Print("byte", sizeof(byte), byte.MinValue, byte.MaxValue);
Print("short", sizeof(short), short.MinValue, short.MaxValue);
Print("ushort", sizeof(ushort), ushort.MinValue, ushort.MaxValue);
Print("int", sizeof(int), int.MinValue, int.MaxValue);
Print("uint", sizeof(uint), uint.MinValue, uint.MaxValue);
Print("long", sizeof(long), long.MinValue, long.MaxValue);
Print("ulong", sizeof(ulong), ulong.MinValue, ulong.MaxValue);
Print("nint", nint.Size, nint.MinValue, nint.MaxValue);

Console.WriteLine();
Console.WriteLine($"{"Type",-7}{"Bytes",6}  Range");
PrintReal("float", sizeof(float), float.MaxValue);
PrintReal("double", sizeof(double), double.MaxValue);
PrintReal("decimal", sizeof(decimal), decimal.MaxValue);

// An object parameter accepts a value of any type.
static void Print(string name, int size, object min, object max)
{
    Console.WriteLine($"{name,-7}{size,6}  {min,-21}{max}");
}

static void PrintReal(string name, int size, object max)
{
    Console.WriteLine($"{name,-7}{size,6}  ±{max}");
}
```

`sizeof` returns a type's size in bytes, while `nint.Size` returns the size of `nint` in the current process. Output in a 64-bit process:

```
Type    Bytes  Minimum              Maximum
sbyte       1  -128                 127
byte        1  0                    255
short       2  -32768               32767
ushort      2  0                    65535
int         4  -2147483648          2147483647
uint        4  0                    4294967295
long        8  -9223372036854775808 9223372036854775807
ulong       8  0                    18446744073709551615
nint        8  -9223372036854775808 9223372036854775807

Type    Bytes  Range
float       4  ±3,4028235E+38
double      8  ±1,7976931348623157E+308
decimal    16  ±79228162514264337593543950335
```

### Money calculator

The program calculates a product's price including VAT. Amounts are calculated using `decimal` and rounded in two ways; for comparison, the same calculation is performed using `double`.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Price excluding VAT, UAH: ");
decimal price = decimal.Parse(Console.ReadLine() ?? "0");
Console.Write("Quantity: ");
int count = int.Parse(Console.ReadLine() ?? "0");
Console.Write("VAT rate, %: ");
decimal rate = decimal.Parse(Console.ReadLine() ?? "20") / 100;

decimal net = price * count;
decimal vatExact = net * rate;
decimal vatEven = Math.Round(vatExact, 2);
decimal vat = Math.Round(vatExact, 2,
    MidpointRounding.AwayFromZero);
decimal total = net + vat;

Console.WriteLine($"Amount excl. VAT: {net,10:N2} UAH");
Console.WriteLine($"Unrounded VAT:    {vatExact,10} UAH");
Console.WriteLine($"VAT (ToEven):     {vatEven,10:N2} UAH");
Console.WriteLine($"VAT (AwayFromZero): {vat,8:N2} UAH");
Console.WriteLine($"Total due:        {total,10:N2} UAH");

// The same calculation using double.
double netD = (double)price * count;
double totalD = netD + netD * (double)rate;
Console.WriteLine($"Unrounded double: {totalD} UAH");
```

A rate of 7% (the reduced VAT rate) produces a tax of 1.365 UAH, exactly halfway between two kopiyka amounts: banker's rounding gives 1.36, while rounding away from zero gives 1.37. The `double` sum contains an error in the final digits:

```
Price excluding VAT, UAH: 9,75
Quantity: 2
VAT rate, %: 7
Amount excl. VAT:      19,50 UAH
Unrounded VAT:        1,3650 UAH
VAT (ToEven):           1,36 UAH
VAT (AwayFromZero):     1,37 UAH
Total due:             20,87 UAH
Unrounded double: 20,865000000000002 UAH
```

`decimal` preserves the number of decimal places: `1,3650` has four because the price had two and the rate had two.

### Duration in days, hours, and minutes

The program converts a number of seconds to days, hours, minutes, and seconds, and demonstrates `int` overflow when calculating milliseconds.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

const int SecondsPerMinute = 60;
const int SecondsPerHour = 60 * SecondsPerMinute;
const int SecondsPerDay = 24 * SecondsPerHour;

Console.Write("Duration in seconds: ");
int total = int.Parse(Console.ReadLine() ?? "0");

int days = total / SecondsPerDay;
int rest = total % SecondsPerDay;     // seconds excluding whole days
int hours = rest / SecondsPerHour;
rest %= SecondsPerHour;               // seconds excluding whole hours
int minutes = rest / SecondsPerMinute;
int seconds = rest % SecondsPerMinute;

Console.WriteLine($"{days} d {hours:D2}:{minutes:D2}:{seconds:D2}");

int millisInt = total * 1000;         // int overflow
long millisLong = total * 1000L;      // multiplication using long
Console.WriteLine($"Milliseconds (int):  {millisInt}");
Console.WriteLine($"Milliseconds (long): {millisLong}");
```

`D2` pads an integer with zeros to two digits. The product 3 000 000 · 1000 does not fit in `int`, so the first result is negative. The `L` suffix makes `1000L` a `long`, so multiplication is performed using `long`:

```
Duration in seconds: 3000000
34 d 17:20:00
Milliseconds (int):  -1294967296
Milliseconds (long): 3000000000
```

`(long)(total * 1000)` does not fix the error: multiplication has already occurred as `int`, and the incorrect result is then cast.

### RGB color code

The program packs three color components (0–255) into a single integer `0xRRGGBB` using shifts and bitwise OR, then unpacks them.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Red (0–255): ");
byte r = byte.Parse(Console.ReadLine() ?? "0");
Console.Write("Green (0–255): ");
byte g = byte.Parse(Console.ReadLine() ?? "0");
Console.Write("Blue (0–255): ");
byte b = byte.Parse(Console.ReadLine() ?? "0");

// Packing: 0x00RRGGBB.
int color = (r << 16) | (g << 8) | b;
Console.WriteLine($"HEX: #{color:X6}");
Console.WriteLine($"Binary: {color:B24}");
Console.WriteLine($"Decimal: {color}");

// Unpacking: right shift and a 0xFF mask.
int red = (color >> 16) & 0xFF;
int green = (color >> 8) & 0xFF;
int blue = color & 0xFF;
Console.WriteLine($"R = {red}, G = {green}, B = {blue}");

// Inverted color: invert the 24 low-order bits.
int inverted = ~color & 0xFFFFFF;
Console.WriteLine($"Inverted: #{inverted:X6}");

// Grayscale: a weighted average of the components.
int gray = (int)Math.Round(0.299 * r + 0.587 * g + 0.114 * b);
Console.WriteLine($"Gray: #{gray:X2}{gray:X2}{gray:X2}");
```

`X6` displays a number with at least six hexadecimal digits, while `B24` displays binary digits. `byte.Parse` checks the range itself: 256 causes `OverflowException`. Output for orange:

```
Red (0–255): 255
Green (0–255): 165
Blue (0–255): 0
HEX: #FFA500
Binary: 111111111010010100000000
Decimal: 16753920
R = 255, G = 165, B = 0
Inverted: #005AFF
Gray: #ADADAD
```

## Common mistakes

Table 2.9 lists common mistakes when working with types and expressions.

Table 2.9. Common mistakes involving types and operators {.caption}

| **Problem** | **Cause** | **Fix** |
| --- | --- | --- |
| `5 / 2` gives 2, not 2.5 | integer division discards the fractional part | `5.0 / 2` or `(double)a / b` |
| `0.1 + 0.2 == 0.3` gives `False` | binary fraction representation error | compare with a tolerance: `Math.Abs(a - b) < 1e-9`, or use `decimal` |
| CS0266: *Cannot implicitly convert type 'double' to 'int'* | conversion may lose data | explicit cast `(int)x`, `Math.Round`, or change the variable's type |
| CS0664 for `decimal price = 12.5;` | an unsuffixed literal has type `double` | `12.5m` for `decimal`, `12.5f` for `float` |
| multiplying positive numbers produces a negative result | `int` overflow | `long`, the `L` suffix, a `checked` block |
| `FormatException` during `Parse` | invalid input or a different decimal separator | `TryParse`, invariant culture |
| `(int)((0.1 + 0.7) * 10)` gives 7, not 8 | the product is 7.999…, and the cast discards its fractional part | `(int)Math.Round(x)` instead of `(int)x` |
| warning CS8602 | a `string?` variable may be `null` | `?? ""` or a `null` check |
| `flags & mask != 0` causes CS0019 | `!=` has higher precedence than `&` | parentheses: `(flags & mask) != 0` |
