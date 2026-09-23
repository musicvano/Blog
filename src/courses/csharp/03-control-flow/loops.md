---
title: "Loops"
description: "Topic 3. Branching and loops: Loops"
outline: [2, 3]
sourceHash: "df3e577be792237ebc49d8119b7d245a3c15ded4c93d66744869b49f8d1dee9b"
---

# Loops

## `while` and `do`/`while` loops

A **loop** repeats its **body**, a statement or block, while a condition holds. One execution of the body is an **iteration**. C# provides four loops: `while`, `do`/`while`, `for`, and `foreach`. Figure 3.5 compares the first three (<https://learn.microsoft.com/dotnet/csharp/language-reference/statements/iteration-statements>).

```mermaid
flowchart TB
  subgraph WHILE ["<code>while</code>"]
    direction TB
    W1{"condition"} -->|<code>true</code>| W2["loop body"]
    W2 --> W1
    W1 -->|<code>false</code>| W3["exit"]
  end
  subgraph DOWHILE ["<code>do/while</code>"]
    direction TB
    D1["loop body"] --> D2{"condition"}
    D2 -->|<code>true</code>| D1
    D2 -->|<code>false</code>| D3["exit"]
  end
  subgraph FOR ["<code>for</code>"]
    direction TB
    F1["initialization"] --> F2{"condition"}
    F2 -->|<code>true</code>| F3["loop body"]
    F3 --> F4["update counter"]
    F4 --> F2
    F2 -->|<code>false</code>| F5["exit"]
  end
```

Figure 3.5. Flowcharts of `while`, `do`/`while`, and `for` loops {.caption}

### The `while` loop

A `while` loop (a **pre-test** loop) checks its condition **before** each iteration. If the condition is initially false, the body never executes. Choose `while` when the number of repetitions is unknown, for example when reading input until an empty line:

```cs
int number = 1_234_567;
int digits = 0;
int sum = 0;

while (number > 0)
{
    sum += number % 10;   // last digit
    number /= 10;         // discard the last digit
    digits++;
}
Console.WriteLine($"Digits: {digits}, digit sum: {sum}");
```

Output: `Digits: 7, digit sum: 28`. The loop body **must change** something affecting the condition, or the loop becomes **infinite**. An intentional infinite loop uses `while (true)` and exits through `break` or `return` (see below). Stop a stuck program with **Ctrl+C** in the console or **Shift+F5** in Visual Studio.

### The `do`/`while` loop

A `do`/`while` loop (a **post-test** loop) executes its body before checking the condition, so the body runs **at least once**. This is natural for menus and repeated input prompts: you must ask before checking the answer. A semicolon is required after the condition:

```cs
int level;
do
{
    Console.Write("Difficulty level (1–3): ");
}
while (!int.TryParse(Console.ReadLine(), out level)
       || level is < 1 or > 3);

Console.WriteLine($"Selected level {level}");
```

## The `for` loop

`for` is convenient when the repetition count is known or a counter is involved. The header has three semicolon-separated parts: **initialization** (executed once), **condition** (checked before every iteration), and **iterator** (executed after every iteration):

```cs
for (int i = 1; i <= 5; i++)
{
    Console.Write($"{i * i} ");      // 1 4 9 16 25
}
Console.WriteLine();

for (int i = 10; i > 0; i -= 3)
{
    Console.Write($"{i} ");          // 10 7 4 1
}
Console.WriteLine();

for (int left = 0, right = 9; left < right; left++, right--)
{
    Console.Write($"{left}-{right} "); // 0-9 1-8 2-7 3-6 4-5
}
Console.WriteLine();
```

A variable declared in the `for` header is visible only inside the loop. Any header part may be omitted: `for (;;)` is an infinite loop. Every `for` loop can be rewritten as `while`, but `for` collects all counter information on one line, making it easier to read.

### Nested loops

A loop can contain another loop. For each **outer** iteration, the **inner** loop runs in full (Fig. 3.6). If the outer loop runs *n* times and the inner loop *m* times, the inner body executes *n* · *m* times. Nested loops are used for tables, rectangular patterns, and iterating over pairs of values:

```mermaid
flowchart TD
  TOP["inner loop <code>j</code> (0…3): left to right"]
  subgraph I0 [" "]
    direction LR
    A00["<code>i=0, j=0</code>"] --> A01["<code>i=0, j=1</code>"] --> A02["<code>i=0, j=2</code>"] --> A03["<code>i=0, j=3</code>"]
  end
  subgraph I1 [" "]
    direction LR
    A10["<code>i=1, j=0</code>"] --> A11["<code>i=1, j=1</code>"] --> A12["<code>i=1, j=2</code>"] --> A13["<code>i=1, j=3</code>"]
  end
  subgraph I2 [" "]
    direction LR
    A20["<code>i=2, j=0</code>"] --> A21["<code>i=2, j=1</code>"] --> A22["<code>i=2, j=2</code>"] --> A23["<code>i=2, j=3</code>"]
  end
  TOP ~~~ I0
  I0 -.-> I1 -.-> I2
  I2 ~~~ N["outer loop <code>i</code> (0…2)<br>dashed lines – move to the next outer iteration"]
```

Figure 3.6. Execution order of nested loops {.caption}

```cs
for (int row = 1; row <= 4; row++)
{
    for (int col = 1; col <= row; col++)
    {
        Console.Write('*');
    }
    Console.WriteLine();
}
```

The program prints a triangle: one asterisk on the first line, four on the fourth. The inner counter depends on the outer one (`col <= row`), so its iteration count increases with each row.

### Stepping through a loop

To understand how variables change, step through the loop in the debugger: set a breakpoint (**F9**) inside the body, start with **F5**, and press **F10** (*Step Over*). *Autos* or *Locals* shows current values, highlighting those changed in the last step in red (Fig. 3.7). **F5** continues to the next breakpoint hit, meaning the next iteration (<https://learn.microsoft.com/visualstudio/debugger/navigating-through-code-with-the-debugger>).

![Stepping through a for loop in the debugger](./images/03-vs-step-over-loop.png)

Figure 3.7. Stepping through a `for` loop in the debugger {.caption}

## The `foreach` loop

`foreach` iterates over **collection** elements: characters in a string, array elements, or command-line arguments. No counter is needed: each iteration assigns the next element to the variable:

```cs
string text = "Object-oriented programming";
int vowels = 0;

foreach (char ch in text)
{
    if ("aeiouAEIOU".Contains(ch))
    {
        vowels++;
    }
}
Console.WriteLine($"Vowels: {vowels}");   // Vowels: 9
```

A `foreach` variable is read-only: you cannot assign to it (CS1656). Iterate over command-line arguments similarly: `foreach (string arg in args)`. Arrays and collections are covered in detail in Topics 4 and 13.
