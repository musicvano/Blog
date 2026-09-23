---
title: "Examples and common mistakes"
description: "Topic 3. Branching and loops: Examples and common mistakes"
outline: [2, 3]
sourceHash: "e56d78afacb159a55a650eeeebda892d29bdc1723d403980632c7b97acf7ac88"
---

# Examples and common mistakes

## Example programs

### ECTS grade

The program converts a point total to an ECTS grade and a national-scale grade according to the grading scale of Kryvyi Rih National University. Both conversions use `switch` expressions: the first uses relational patterns, and the second uses constant patterns joined by `or`.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Points (0–100): ");
if (!int.TryParse(Console.ReadLine(), out int points)
    || points is < 0 or > 100)
{
    Console.WriteLine("Error: an integer from 0 to 100 is required.");
    return;
}

string ects = points switch
{
    >= 90 => "A",
    >= 80 => "B",
    >= 71 => "C",
    >= 61 => "D",
    >= 50 => "E",
    >= 30 => "FX",
    _ => "F",
};

string national = ects switch
{
    "A" => "excellent",
    "B" or "C" => "good",
    "D" or "E" => "satisfactory",
    _ => "unsatisfactory",
};

Console.WriteLine($"ECTS grade: {ects}");
Console.WriteLine($"National-scale grade: {national}");
```

Results for 85 and 47 points and for an invalid value:

```
Points (0–100): 85
ECTS grade: B
National-scale grade: good
```

```
Points (0–100): 47
ECTS grade: FX
National-scale grade: unsatisfactory
```

```
Points (0–100): 120
Error: an integer from 0 to 100 is required.
```

### Calculator menu

The calculator stores the current value and executes user commands in a `do`/`while` loop until the user enters `q`. A `switch` statement handles commands, and a branch with a `when` condition handles division by zero.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

double result = 0;
string command;

do
{
    Console.WriteLine($"Current value: {result}");
    Console.Write("Command (+, -, *, /, c – reset, q – quit): ");
    command = Console.ReadLine() ?? "q";

    if (command == "c")
    {
        result = 0;
        continue;                 // go to the loop condition check
    }
    if (command is not ("+" or "-" or "*" or "/"))
    {
        if (command != "q")
        {
            Console.WriteLine($"Unknown command “{command}”.");
        }
        continue;
    }

    Console.Write("Number: ");
    if (!double.TryParse(Console.ReadLine(), out double number))
    {
        Console.WriteLine("This is not a number.");
        continue;
    }

    switch (command)
    {
        case "+":
            result += number;
            break;
        case "-":
            result -= number;
            break;
        case "*":
            result *= number;
            break;
        case "/" when number == 0:
            Console.WriteLine("Cannot divide by zero.");
            break;
        case "/":
            result /= number;
            break;
    }
} while (command != "q");

Console.WriteLine($"Result: {result}");
```

The `continue` statement in a `do`/`while` loop jumps to the condition check, so the `q` command ends the loop immediately. The `??` operator supplies `"q"` when input ends (`ReadLine` returns `null`). The `not ("+" or "-" or "*" or "/")` pattern checks that the command is none of these operators. Example session:

```
Current value: 0
Command (+, -, *, /, c – reset, q – quit): +
Number: 12,5
Current value: 12,5
Command (+, -, *, /, c – reset, q – quit): *
Number: 4
Current value: 50
Command (+, -, *, /, c – reset, q – quit): /
Number: 0
Cannot divide by zero.
Current value: 50
Command (+, -, *, /, c – reset, q – quit): %
Unknown command “%”.
Current value: 50
Command (+, -, *, /, c – reset, q – quit): -
Number: 10
Current value: 40
Command (+, -, *, /, c – reset, q – quit): q
Result: 40
```

### Statistics for entered numbers

The program reads numbers until a blank line, skips invalid values, and displays the count, minimum, maximum, and average.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

int count = 0;
double sum = 0;
double min = double.MaxValue;
double max = double.MinValue;

Console.WriteLine("Enter numbers; a blank line ends input:");
string? line = Console.ReadLine();

while (!string.IsNullOrEmpty(line))
{
    if (double.TryParse(line, out double value))
    {
        count++;
        sum += value;
        min = Math.Min(min, value);
        max = Math.Max(max, value);
    }
    else
    {
        Console.WriteLine($"  “{line}” skipped: not a number");
    }
    line = Console.ReadLine();
}

if (count == 0)
{
    Console.WriteLine("No numbers were entered.");
}
else
{
    Console.WriteLine($"Count: {count}");
    Console.WriteLine($"Minimum: {min}, maximum: {max}");
    Console.WriteLine($"Average: {sum / count:F2}");
}
```

A line is read before the loop and again at the end of its body, so the `while` condition checks a new line each time. The `string.IsNullOrEmpty` method returns `true` for both an empty string and `null` (end of input). The minimum starts at the largest possible value, so the first number will lower it. The `count == 0` check prevents division by zero. Output:

```
Enter numbers; a blank line ends input:
12,5
7
seven
  “seven” skipped: not a number
-3
20

Count: 4
Minimum: -3, maximum: 20
Average: 9,12
```

### Multiplication table

The program asks for the table size, repeats the prompt until a valid value is entered, and displays a multiplication table using nested `for` loops. The field width `{…,4}` right-aligns the numbers.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Table size (1–12): ");
int size;
while (!int.TryParse(Console.ReadLine(), out size)
       || size < 1 || size > 12)
{
    Console.Write("Enter an integer from 1 to 12: ");
}

Console.Write("   │");                     // column headings
for (int col = 1; col <= size; col++)
{
    Console.Write($"{col,4}");
}
Console.WriteLine();
Console.WriteLine("───┼" + new string('─', 4 * size));

for (int row = 1; row <= size; row++)     // outer loop
{
    Console.Write($"{row,2} │");
    for (int col = 1; col <= size; col++) // inner loop
    {
        Console.Write($"{row * col,4}");
    }
    Console.WriteLine();
}
```

The `while` loop header both reads and validates the number: `TryParse` stores the result in the `size` variable declared before the loop. The characters `│`, `┼`, and `─` draw the border. Output for size 9 (the first input, 15, was rejected):

```
Table size (1–12): 15
Enter an integer from 1 to 12: 9
   │   1   2   3   4   5   6   7   8   9
───┼────────────────────────────────────
 1 │   1   2   3   4   5   6   7   8   9
 2 │   2   4   6   8  10  12  14  16  18
 3 │   3   6   9  12  15  18  21  24  27
 4 │   4   8  12  16  20  24  28  32  36
 5 │   5  10  15  20  25  30  35  40  45
 6 │   6  12  18  24  30  36  42  48  54
 7 │   7  14  21  28  35  42  49  56  63
 8 │   8  16  24  32  40  48  56  64  72
 9 │   9  18  27  36  45  54  63  72  81
```

## Common mistakes

Table 3.3 lists the most common mistakes when working with branching and loops.

Table 3.3. Common mistakes when working with branching and loops {.caption}

| **Problem** | **Cause** | **Fix** |
| --- | --- | --- |
| the block after `if` always executes; warning CS0642 | a semicolon after the condition `if (x > 0);` | remove `;` after the closing parenthesis of the condition |
| the loop never ends | the body does not change the variable in the condition, or the condition is always true | update the counter; step through the condition in the debugger |
| an extra or missing iteration | `<` instead of `<=` or vice versa, an incorrect initial value | check the first and last iterations manually |
| CS0163: *Control cannot fall through…* | a `switch` branch has no `break` | end the branch with `break`, `return`, or `continue` |
| CS8509: the `switch` expression is not exhaustive | some values have no matching branch | add a `_` branch |
| CS8510: the pattern is unreachable | a more general pattern appears first (`> 0` before `> 10`) | order branches from specific to general |
| CS0165 after `if` without `else` | the variable is not assigned a value in every branch | initialize the variable or add `else` |
| CS0103: the loop variable is inaccessible | the variable is declared in the `for` header or in a block | declare the variable before the loop |
| `break` in `switch` does not end the loop | `break` applies to the nearest `switch` | use a flag for the loop or `return` |
