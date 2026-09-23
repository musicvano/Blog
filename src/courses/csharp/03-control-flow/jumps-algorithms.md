---
title: "Jump statements and common algorithms"
description: "Topic 3. Branching and loops: Jump statements and common algorithms"
outline: [2, 3]
sourceHash: "57d22fa95abdebe5d91e9f34d1aee8edb169cc1d39b47946156ad111ecf205bf"
---

# Jump statements and common algorithms

## Jump statements

Jump statements change a loop's execution flow (<https://learn.microsoft.com/dotnet/csharp/language-reference/statements/jump-statements>):

- `break` — immediately exits the nearest loop or `switch` branch;
- `continue` — skips the remaining body and starts the next iteration of the nearest loop;
- `return` — exits the method, or the entire program in top-level statements;
- `goto label` — transfers to a labeled statement (used very rarely).

```cs
// The first number from 100 divisible by both 7 and 13.
int found = 0;
for (int n = 100; ; n++)
{
    if (n % 7 != 0)
    {
        continue;           // not divisible by 7 – continue
    }
    if (n % 13 == 0)
    {
        found = n;
        break;              // found – exit the loop
    }
}
Console.WriteLine(found);   // 182
```

In a nested loop, `break` exits only the **inner** loop. To exit several loops at once, use a Boolean flag checked by the outer loop, or move the loops into a separate method and exit with `return`. C# also supports `goto`, but jumps to labels make code difficult to read and verify, so modern programs do not use it. Note that `break` inside `switch` exits only the `switch`, not its containing loop.

## Common loop algorithms

Most loop tasks reduce to a few patterns (Table 3.2).

Table 3.2. Common loop algorithms {.caption}

| **Task** | **Approach** |
| --- | --- |
| sum, product | an accumulator: `sum = 0` (`product = 1`) before the loop, `sum += x` inside |
| count | counter `count = 0`, with `count++` for matching elements |
| minimum, maximum | `min = double.MaxValue` or the first element; `min = Math.Min(min, x)` |
| average | sum and count; check that count is nonzero before dividing |
| search | loop with `break` when the element is found; a `found` flag |
| digits of a number | `n % 10` gets the last digit, `n /= 10` discards it, while `n > 0` |
| approximate calculation | repeat until the change in the result is smaller than accuracy `eps` |
| repeated input | `do`/`while` or `while (true)` with `TryParse` and `break` |

Iterative calculations with a target accuracy use a loop that stops when the next term or change in the result falls below that accuracy. Add an iteration limit to guarantee termination:

```cs
// e^x = 1 + x + x²/2! + x³/3! + …
double x = 1.0, eps = 1e-12;
double term = 1, sum = 1;
int k = 0;

while (Math.Abs(term) >= eps && k < 1000)
{
    k++;
    term *= x / k;      // derive the next term from the previous one
    sum += term;
}
Console.WriteLine($"e^{x} ≈ {sum} using {k} terms");
Console.WriteLine($"Math.Exp: {Math.Exp(x)}");
```

Each term is obtained by multiplying the previous one by `x / k`, so no separate factorial calculation is needed. The program displays `e^1 ≈ 2,718281828458995 using 15 terms` and `Math.Exp: 2,718281828459045`.

`Random.Shared.Next(min, max)` generates random numbers for games and simulations (the upper bound is excluded):

```cs
int secret = Random.Shared.Next(1, 101);   // 1 through 100
int attempts = 0;
int guess;
do
{
    Console.Write("Your number: ");
    if (!int.TryParse(Console.ReadLine(), out guess))
    {
        break;
    }
    attempts++;
    Console.WriteLine(guess < secret ? "Higher" :
                      guess > secret ? "Lower" : "Correct!");
} while (guess != secret);
Console.WriteLine($"Attempts: {attempts}");
```
