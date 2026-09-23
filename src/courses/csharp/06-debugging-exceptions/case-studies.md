---
title: "Examples and common mistakes"
description: "Topic 6. Debugging and exceptions: Examples and common mistakes"
outline: [2, 3]
sourceHash: "75d71589de43a4b48e81aad2d4c343303cfa4d0c1698d4b64f5ae9021180ca3c"
---

# Examples and common mistakes

## Example programs

### Finding a logic error

The program calculates an average score but prints 77 instead of the expected 77.75. There are no compilation errors or exceptions: this is a logic error.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

int[] scores = [90, 85, 72, 64];

double average = Average(scores);
Console.WriteLine($"Average score: {average}");

// Bug: the sum and length are integers, so division is integer division.
static double Average(int[] values)
{
    int sum = 0;
    foreach (int value in values)
    {
        sum += value;
    }
    double result = sum / values.Length;
    return result;
}
```

To debug this, set a breakpoint on `return result;`, run the program (**F5**), and add `sum`, `values.Length`, and `sum / values.Length` to the *Watch* window. The window shows `sum = 311`, `values.Length = 4`, and `sum / values.Length = 77`: both operands are integers, so integer division discards the fractional part before the result is assigned to the `double` variable. Fix this by casting one operand to `double`:

```cs
double result = (double)sum / values.Length;
```

After the fix, the program prints `Average score: 77,75`.

### Safe division

The program divides two integers entered by the user and handles all possible exceptions: invalid format, division by zero, and overflow.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Dividend: ");
string? first = Console.ReadLine();
Console.Write("Divisor: ");
string? second = Console.ReadLine();

try
{
    int dividend = int.Parse(first ?? "");
    int divisor = int.Parse(second ?? "");
    int quotient = dividend / divisor;
    int remainder = dividend % divisor;
    Console.WriteLine($"Quotient: {quotient}, remainder: {remainder}");
}
catch (FormatException)
{
    Console.WriteLine("Error: integers are required.");
}
catch (DivideByZeroException)
{
    Console.WriteLine("Error: division by zero.");
}
catch (OverflowException ex)
{
    Console.WriteLine($"Overflow error: {ex.Message}");
}
finally
{
    Console.WriteLine("Calculation completed.");
}
```

Overflow occurs in two cases: a number does not fit in an `int` (`int.Parse` throws `OverflowException`), or the division is `int.MinValue / -1`, whose result (2,147,483,648) also does not fit in an `int`. The `finally` block runs regardless of the outcome. Output for different inputs:

```
Dividend: 17
Divisor: 5
Quotient: 3, remainder: 2
Calculation completed.
```

```
Dividend: 17
Divisor: 0
Error: division by zero.
Calculation completed.
```

```
Dividend: -2147483648
Divisor: -1
Overflow error: Arithmetic operation resulted in an overflow.
Calculation completed.
```

This example uses exceptions for demonstration; in a real program, it is better to validate input with `int.TryParse` and check the divisor with a condition.

### Argument validation

The `ApplyDiscount` method validates its arguments with `ArgumentOutOfRangeException` helpers. The main program catches exceptions separately for each price–discount pair, so an error in one pair does not stop it from processing the others.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

decimal[] prices = [1200m, 850m, -40m, 499.9m];
int[] percents = [10, 150, 5, 0];

for (int i = 0; i < prices.Length; i++)
{
    try
    {
        decimal result = ApplyDiscount(prices[i], percents[i]);
        Console.WriteLine(
            $"{prices[i],8} − {percents[i],3} % = {result:N2}");
    }
    catch (ArgumentOutOfRangeException ex)
    {
        Console.WriteLine($"{prices[i],8} − {percents[i],3} %: "
            + $"{ex.ParamName} is out of range");
    }
}

// Returns the discounted price; invalid arguments cause an exception.
static decimal ApplyDiscount(decimal price, int percent)
{
    ArgumentOutOfRangeException.ThrowIfNegative(price);
    ArgumentOutOfRangeException.ThrowIfNegative(percent);
    ArgumentOutOfRangeException.ThrowIfGreaterThan(percent, 100);

    return Math.Round(price * (100 - percent) / 100, 2);
}
```

The `ParamName` property contains the name of the parameter that failed validation. Output:

```
 1200 −  10 % = 1 080,00
  850 − 150 %: percent is out of range
  -40 −   5 %: price is out of range
499,9 −   0 % = 499,90
```

### Processing data lines

The program parses “surname;score” lines, skips invalid lines with a message to the error stream, counts errors, and sets the exit code.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

string[] lines =
[
    "Koval;92",
    "Bondar;seventy",
    "Melnyk",
    "Shevchuk;105",
    "Tkachenko;64",
];

int total = 0, errors = 0;
for (int i = 0; i < lines.Length; i++)
{
    try
    {
        (string name, int score) = ParseLine(lines[i], i + 1);
        total += score;
        Console.WriteLine($"{name,-10}{score,4}");
    }
    catch (FormatException ex) when (ex.InnerException is not null)
    {
        errors++;
        Console.Error.WriteLine(
            $"{ex.Message} ({ex.InnerException.GetType().Name})");
    }
    catch (FormatException ex)
    {
        errors++;
        Console.Error.WriteLine(ex.Message);
    }
}

int processed = lines.Length - errors;
Console.WriteLine($"Processed: {processed}, errors: {errors}");
Environment.ExitCode = errors == 0 ? 0 : 1;

// Parses a “surname;score” line and checks the score range.
static (string Name, int Score) ParseLine(string line, int number)
{
    string[] parts = line.Split(';');
    if (parts.Length != 2)
    {
        throw new FormatException(
            $"Line {number}: expected “surname;score”");
    }
    int score;
    try
    {
        score = int.Parse(parts[1]);
    }
    catch (FormatException ex)
    {
        throw new FormatException(
            $"Line {number}: score is not a number", ex);
    }
    if (score is < 0 or > 100)
    {
        throw new FormatException(
            $"Line {number}: score {score} is outside 0–100");
    }
    return (parts[0], score);
}
```

The `ParseLine` method throws `FormatException` with the line number. If `int.Parse` caused the error, its exception is passed as `InnerException`, and the `when (ex.InnerException is not null)` filter selects the first `catch` block, which displays the inner exception type. Output (error lines go to `Console.Error`, and the exit code is 1):

```
Koval       92
Line 2: score is not a number (FormatException)
Line 3: expected “surname;score”
Line 4: score 105 is outside 0–100
Tkachenko   64
Processed: 2, errors: 3
```

## Common mistakes

Table 6.3. Common mistakes in debugging and exception handling {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| empty `catch { }` | the error is hidden; handle the exception (report it, retry) or do not catch it |
| `catch (Exception)` around all the code | expected errors cannot be distinguished from program bugs; catch specific types |
| CS0160: an earlier `catch` already catches this type | a general type precedes a specific one; order `catch` clauses from derived to base types |
| `try`/`catch` around `int.Parse` for input | invalid input is expected; use `int.TryParse` |
| `throw ex;` in a `catch` block | the call stack is lost; use `throw;` or a new exception with `InnerException` |
| error messages are mixed with results | errors are sent to `Console.WriteLine`; use `Console.Error.WriteLine` and an exit code |
| `Debug.WriteLine` produces no output | messages go to the *Output* window, and only in the Debug configuration |
| the debugger does not stop at a breakpoint | the program was started without debugging (**Ctrl+F5**) or in Release; use **F5** in Debug |
