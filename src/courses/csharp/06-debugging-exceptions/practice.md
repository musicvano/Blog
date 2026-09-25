---
title: "Practice"
description: "Topic 6. Debugging and exceptions: worked examples"
outline: [2, 3]
sourceHash: "11b6a8f70c8ef3065727310a993fe61f62281c8829ef1eb8ef7c5815298387cd"
---

# Practice

## Example 1. Debugging a maximum search

The program finds the highest temperature of the week but prints 21 °C even though the array contains 25. Find and fix the error using the debugger.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

int[] temps = [12, 15, 9, 21, 18, 14, 25];

int max = FindMax(temps, out int day);
Console.WriteLine($"Maximum {max} °C on day {day + 1}");

// BUG: the loop does not reach the last element.
static int FindMax(int[] values, out int index)
{
    index = 0;
    for (int i = 1; i < values.Length - 1; i++)
    {
        if (values[i] > values[index])
        {
            index = i;
        }
    }
    return values[index];
}
```

Output from the buggy program:

```
Maximum 21 °C on day 4
```

Debugging procedure:

1. Set a breakpoint on `if (values[i] > values[index])` and run the program (**F5**).
2. Press **F5** and watch `i` and `index` in the *Locals* window. To avoid stopping on every iteration, set the breakpoint condition to `i >= values.Length - 2` (*Conditions…*).
3. After stopping at `i = 5`, press **F10** several times: the loop ends, and the condition is never evaluated for `i = 6`.
4. Add `values.Length - 1` to the *Watch* window: it equals 6, and the loop condition `i < 6` excludes the last index.

The error is in the loop bound: it should be `i < values.Length`. After the fix, the program prints `Maximum 25 °C on day 7`. These *off-by-one* errors most often occur at loop boundaries, so check the first and last iterations.

## Example 2. Fraction calculator

Write a program that adds fractions entered in `a/b` format until an empty line is entered, reduces the sum, and handles invalid input, a zero denominator, and overflow without terminating.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

long numerator = 0, denominator = 1;
Console.WriteLine("Enter fractions a/b (empty line to finish):");

while (true)
{
    string? line = Console.ReadLine();
    if (string.IsNullOrWhiteSpace(line))
    {
        break;
    }
    try
    {
        (long a, long b) = ParseFraction(line);
        numerator = checked(numerator * b + a * denominator);
        denominator = checked(denominator * b);
        long gcd = Gcd(Math.Abs(numerator), denominator);
        numerator /= gcd;
        denominator /= gcd;
        Console.WriteLine($"  sum = {numerator}/{denominator}");
    }
    catch (FormatException ex)
    {
        Console.WriteLine($"  {ex.Message} Try again.");
    }
    catch (DivideByZeroException)
    {
        Console.WriteLine("  The denominator cannot be zero.");
    }
    catch (OverflowException)
    {
        Console.WriteLine("  The sum is too large; fraction skipped.");
    }
}

Console.WriteLine($"Result: {numerator}/{denominator}"
    + $" ≈ {(double)numerator / denominator:F4}");

// Parses “a/b”; moves the sign to the numerator.
static (long, long) ParseFraction(string text)
{
    string[] parts = text.Split('/');
    if (parts.Length != 2
        || !long.TryParse(parts[0], out long a)
        || !long.TryParse(parts[1], out long b))
    {
        throw new FormatException($"“{text}” is not an a/b fraction.");
    }

    if (b == 0)
    {
        throw new DivideByZeroException();
    }
    return b < 0 ? (-a, -b) : (a, b);
}

static long Gcd(long a, long b) =>
    b == 0 ? Math.Max(a, 1) : Gcd(b, a % b);
```

The `ParseFraction` method throws `FormatException` with a message containing the input line, and `DivideByZeroException` for a zero denominator. The loop catches exceptions separately for each fraction, so an error in one line does not stop the calculation. Calculations run in a `checked` context: overflowing `long` causes `OverflowException` instead of an incorrect sum, and the fraction is then skipped. The sum is reduced by the GCD of the numerator and denominator. Output:

```
Enter fractions a/b (empty line to finish):
1/2
  sum = 1/2
1/3
  sum = 5/6
2/0
  The denominator cannot be zero.
one quarter
  “one quarter” is not an a/b fraction. Try again.
-1/6
  sum = 2/3
9223372036854775807/2
  The sum is too large; fraction skipped.

Result: 2/3 ≈ 0,6667
```

## Example 3. A robust console menu

Write a program with the commands `add N` (add a number to the list), `avg` (average), `get I` (element by index), `div A B` (integer division), and `q` (quit) that never crashes: errors in any command go to the error stream, and at the end the program reports the number of failed commands and sets the exit code.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

int[] numbers = [];
int failures = 0;

Console.WriteLine("Commands: add N, avg, get I, div A B, q");
while (true)
{
    Console.Write("> ");
    string[] cmd = (Console.ReadLine() ?? "q").Split(' ',
        StringSplitOptions.RemoveEmptyEntries);
    if (cmd.Length == 0)
    {
        continue;
    }
    if (cmd[0] == "q")
    {
        break;
    }

    try
    {
        Execute(cmd, ref numbers);
    }
    catch (Exception ex) when (ex is FormatException
        or IndexOutOfRangeException or DivideByZeroException
        or InvalidOperationException)
    {
        failures++;
        Console.Error.WriteLine($"  Error: {ex.Message}");
    }
}

Console.WriteLine($"Failed commands: {failures}");
Environment.ExitCode = failures > 0 ? 1 : 0;

static void Execute(string[] cmd, ref int[] numbers)
{
    switch (cmd[0])
    {
        case "add":
            int value = int.Parse(cmd[1]);  // parse first
            Array.Resize(ref numbers, numbers.Length + 1);
            numbers[^1] = value;
            Console.WriteLine($"  Elements: {numbers.Length}");
            break;
        case "avg":
            if (numbers.Length == 0)
            {
                throw new InvalidOperationException(
                    "The list is empty.");
            }
            double sum = 0;
            foreach (int n in numbers)
            {
                sum += n;
            }
            double avg = sum / numbers.Length;
            Console.WriteLine($"  Average: {avg:F2}");
            break;
        case "get":
            int index = int.Parse(cmd[1]);
            Console.WriteLine($"  [{index}] = {numbers[index]}");
            break;
        case "div":
            int a = int.Parse(cmd[1]), b = int.Parse(cmd[2]);
            Console.WriteLine($"  {a / b}");
            break;
        default:
            throw new FormatException(
                $"Unknown command “{cmd[0]}”.");
    }
}
```

The `Execute` method runs commands, and the main loop catches only exceptions that can result from an invalid command (a `when` filter listing the types). Other exceptions (program bugs) are not caught, so they can be noticed and fixed. In `add`, the number is parsed **before** the array is enlarged: if parsing fails, the array stays unchanged. An unknown command is also reported with `FormatException`. Output:

```
Commands: add N, avg, get I, div A B, q
> avg
  Error: The list is empty.
> add 10
  Elements: 1
> add x
  Error: The input string 'x' was not in a correct format.
> add
  Error: Index was outside the bounds of the array.
> get 5
  Error: Index was outside the bounds of the array.
> add 25
  Elements: 2
> avg
  Average: 17,50
> div 7 0
  Error: Attempted to divide by zero.
> help
  Error: Unknown command “help”.
> q
Failed commands: 6
```

The program exits with code 1 because some commands failed.
