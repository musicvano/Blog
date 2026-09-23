---
title: "Summary"
description: "Topic 3. Branching and loops: conclusions and review questions"
sourceHash: "c97f80e203038f3d43a3618262b8ace5dbdee1d0cdb9bb2ddc67be6cfaa08fa3"
---

# Summary

## Conclusions

Control flow constructs change a program's sequential execution order. `if`/`else` and the ternary operator `?:` choose an action based on a Boolean condition; the `switch` statement and expression select by values and patterns: constant, relational, and logical (`and`, `or`, `not`). A `switch` expression returns a value and must be exhaustive. A `while` loop checks its condition before an iteration, while `do`/`while` checks afterward and runs the body at least once; `for` is convenient for counters, and `foreach` for iterating over collection elements. `break` and `continue` control loop execution, and most tasks can be solved with common algorithms: accumulating a sum, counting, finding minimum and maximum values, and approximate calculations with a specified accuracy.

## Self-check questions

1. What is a code block? What is the scope of a variable declared inside it?
2. How does an `else if` chain work? Why does condition order matter?
3. What happens if you place a semicolon after an `if` condition?
4. How does the ternary operator `?:` differ from an `if` statement?
5. How does a `switch` statement work? Why is there no fall-through between branches in C#?
6. Which patterns can you use with `is` and in a `switch` expression?
7. What is the purpose of a `when` condition in a `case` branch?
8. How does a `switch` expression differ from a `switch` statement? What does an exhaustive expression mean?
9. How does `while` differ from `do`/`while`? Give examples of their use.
10. What are the parts of a `for` loop header? In what order are they executed?
11. How many times is the inner loop body executed in nested loops?
12. What is `foreach` for? Can you modify its iteration variable?
13. How do `break`, `continue`, and `return` differ?
14. How can you exit multiple nested loops at once?
15. How can you use a loop to calculate a value to a specified accuracy?

## Useful links

- Selection statements: <https://learn.microsoft.com/dotnet/csharp/language-reference/statements/selection-statements>
- The `switch` expression: <https://learn.microsoft.com/dotnet/csharp/language-reference/operators/switch-expression>
- Patterns: <https://learn.microsoft.com/dotnet/csharp/language-reference/operators/patterns>
- Iteration statements: <https://learn.microsoft.com/dotnet/csharp/language-reference/statements/iteration-statements>
- Jump statements: <https://learn.microsoft.com/dotnet/csharp/language-reference/statements/jump-statements>
- Stepping through code in Visual Studio: <https://learn.microsoft.com/visualstudio/debugger/navigating-through-code-with-the-debugger>
