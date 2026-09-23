---
title: "Summary"
description: "Topic 4. Exceptions, Result, and debugging: conclusions and review questions"
sourceHash: "c1420cc1e4b3463af6c7b72c04d54cd06672353f99f4c4eadfcfcc4e6b15a5ea"
---

# Summary

## Conclusions

Compilation errors, runtime exceptions, and logic errors have different causes, so exception handling does not replace checking formulas. The `Throwable` hierarchy separates `Exception` and `Error`, and handlers are ordered from narrow types to broad ones. A narrow `try` covers only the operation expected to fail, `finally` performs cleanup, and an empty `catch` hides the cause. `require` and `check` distinguish caller errors from impossible states, while a custom exception type is appropriate when causes must be distinguished programmatically. `null` suits expected absence, an exception suits a contract violation, and `Result` passes success or failure as a value that must be handled. `use` closes a resource even after an exception, preserving a closing error as suppressed. Stack traces with `Caused by` and the IntelliJ IDEA debugger with breakpoints help find the cause, rather than just its consequence. The CLI boundary converts the result into a message and exit code, and data state must not be partially changed after an error.

## Self-check questions

1. Why should you not unconditionally catch Throwable?
2. How does catch order affect handler selection?
3. How does require differ from check?
4. Why preserve cause?
5. How does map differ from mapCatching?
6. What problem does use solve?
7. Why is finally not a guarantee against process termination?
8. How does the debugger help find a logic error without an exception?
