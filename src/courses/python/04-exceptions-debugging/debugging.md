---
title: "Debugging in PyCharm and pdb"
description: "Topic 4. Exceptions and debugging: Debugging in PyCharm and pdb"
outline: [2, 3]
sourceHash: "d15fc747ee488a94d6d39350a743e3a5c0f4d4b9417ad4ac00ae84d6d90cd52b"
---

# Debugging in PyCharm and pdb

## Debugging a program in PyCharm

A **debugger** lets you pause execution and inspect variable values before the next statement. First reproduce the error on a small data set. Then set a **breakpoint** on the line before the suspicious calculation by clicking the gutter to the left of the line number, and start *Debug* (Shift+F9). The highlighted line at a pause has not yet executed.

Main actions in the default Windows keymap: *Step Over* (F8) executes a line without entering the called function; *Step Into* (F7) enters its body; *Step Out* (Shift+F8) continues until the current call returns; *Resume* (F9) continues to the next stop. Check names and shortcuts in your PyCharm keymap's menu: <https://www.jetbrains.com/help/pycharm/debugging-code.html>.

### Example 4. A mean grade with a logic error

The following code has an **intentionally** incorrect denominator. Save the file as `average.py`. The `scores` list contains four numbers; `sum` calculates their sum, and `len` their count. The program prints a number rather than a traceback, so merely checking that it runs is insufficient.

```py
def average(scores: list[int]) -> float:
    if not scores:
        raise ValueError("score list is empty")
    total = 0
    for score in scores:
        total += score
    return total / (len(scores) - 1)  # Intentional error.


scores = [60, 70, 80, 90]
print(f"Mean grade: {average(scores):.2f}")
```

```
Mean grade: 100.00
```

The expected result is `(60 + 70 + 80 + 90) / 4 = 75`. Set a breakpoint on `return`. The variables should show `total = 300` and `len(scores) = 4`. Thus, accumulation is correct; the problem is the final division. Replacing the denominator with `len(scores)` gives `Mean grade: 75.00`. For one grade, the corrected function returns the grade itself, while the old one raises `ZeroDivisionError`.

::: info Screenshot
average.py: total = 300; scores contains four numbers.
:::

Figure 4.5. Pausing before calculating the mean grade. {.caption}

In the *Frames* panel, select a call to view its local variables (*Variables* or *Threads & Variables*, depending on the version). **Watches** retain expressions for repeated inspection, such as `len(scores)`. *Evaluate Expression* (Alt+F8) evaluates an entered expression in the current frame. Enter `sum(scores) / len(scores)` and compare it with the program's result. Do not call functions that modify data in this window: the observation itself may affect the error.

::: info Screenshot
Evaluate Expression: sum(scores) / len(scores) → 75.0.
:::

Figure 4.6. Independently checking a formula in the current frame. {.caption}

A long loop calls for a **conditional breakpoint**: use its context menu to set a *Condition*, such as `score == 80`. For a loop with index `i`, the condition might be `i == 7`; it must use a name that already exists in that frame. If you only need to monitor values, disable *Suspend* and enable *Log evaluated expression*. The program will then continue while leaving a log entry.

::: info Screenshot
Condition: score == 80; Suspend enabled.
:::

Figure 4.7. A conditional stop at the desired loop value. {.caption}

An **exception breakpoint** locates where an exception is raised even if it is caught later. Open *Run → View Breakpoints* (Ctrl+Shift+F8), add a *Python Exception Breakpoint* for `ZeroDivisionError`, and test the old function with one grade. Options for stopping when raised or when unhandled depend on the selected debugger; follow the actual labels in your version rather than the icon color.

::: info Screenshot
View Breakpoints; add a Python Exception Breakpoint.
:::

Figure 4.8. Stopping on ZeroDivisionError before error handling. {.caption}

## The pdb debugger and a method for finding errors

The built-in `pdb` module works in the terminal. For the same file, run `python -m pdb average.py`. The command `l` shows text near the current line, `n` executes the next line, `s` enters a function, `c` continues, `p expression` prints a value, `w` shows the stack, and `q` ends debugging. `b 7` sets a breakpoint at line 7 of the example file. Reference: <https://docs.python.org/3.14/library/pdb.html>.

After starting, enter `b 7`, then `c`. Execution stops before the incorrect `return`; `p total` shows `300`, `p len(scores)` shows `4`, and `p total / len(scores)` shows `75.0`. These are the same observations as in PyCharm. Adjust line numbers to match your file if you added comments or blank lines. A `breakpoint()` call directly in the program also opens `pdb` under default settings; remove it before submission.

::: info Screenshot
b 7; c; p total; p len(scores); p total / len(scores); q.
:::

Figure 4.9. Inspecting variables with pdb. {.caption}

Finding a logic error consists of four steps. First, **reproduce** it and record the expected result. Then **locate** the first incorrect state by comparing intermediate values. Form a **hypothesis**, such as “the denominator is one too small”. Finally, **test** it with the smallest change and repeat reference examples. Changing many formulas at once does not show which one fixed the failure.

For the mean grade, test four grades, one grade, all equal grades, and an empty list. The first three cases should give correct means; the last should raise an explicit `ValueError`. After fixing the bug, keep these data in the test table: they document the discovered cause.

## Common mistakes

- A bare `except:` catches even `KeyboardInterrupt` and `SystemExit`. Identify the expected type and preserve the ability to stop the program.
- A large `try` hides the failure source. Protect the smallest operation for which you have a specific recovery strategy.
- A general handler before a specific one makes the latter unreachable. Order them from specific to base type.
- `except: pass` turns failure into apparent success. Explain the failure or raise the exception again.
- A `return` in `finally` may destroy a result or hide an exception. Use this block only for final cleanup actions.
- Input checks using `assert` disappear with `-O`. Check data limits explicitly.
- Debugging one successful example does not test the algorithm. Add boundaries, invalid formats, failures, and retries after failures.
