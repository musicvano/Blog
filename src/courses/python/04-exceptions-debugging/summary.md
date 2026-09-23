---
title: "Summary"
description: "Topic 4. Exceptions and debugging: conclusions and review questions"
sourceHash: "e7b7d44eccee0cc76845775a3b810640e36a0a6067d7cf55065dda6cdba7318c"
---

# Summary

## Conclusions

An exception carries information about a failed operation to a level that can make a decision. Specific handlers, short `try` blocks, and explicit causes preserve that information. A log explains the execution history, while a debugger shows program state at a selected point. Reference examples establish that a formula is correct; the absence of a traceback does not.

## Self-check questions

1. How do syntax errors, logic errors, and runtime exceptions differ?
2. Which line should you start with when reading a traceback?
3. Why does `except Exception` not catch Ctrl+C?
4. How does handler order affect the result?
5. When does `else` run, and when does `finally` run?
6. What is the syntax for several types in Python 3.14, and when are parentheses needed?
7. What does `args` contain, and why should you avoid comparing error messages?
8. How do `raise`, `raise error`, and `raise ... from error` differ?
9. Why have a separate domain-error type?
10. How does `except*` differ from ordinary `except`?
11. How does `add_note` help locate an invalid field?
12. Which checks must not use `assert`?
13. When is `logger.exception` more useful than `logger.error`?
14. What hypothesis does a conditional breakpoint test?
15. How do you reproduce a PyCharm state inspection using `pdb`?

## Useful links

- <https://docs.python.org/3.14/tutorial/errors.html>.
- <https://docs.python.org/3.14/library/exceptions.html>.
- <https://docs.python.org/3.14/reference/compound_stmts.html#the-try-statement>.
- <https://peps.python.org/pep-0758/>.
- <https://docs.python.org/3.14/howto/logging.html>.
- <https://docs.python.org/3.14/library/pdb.html>.
- <https://www.jetbrains.com/help/pycharm/debugging-code.html>.
