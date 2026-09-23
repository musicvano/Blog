---
title: "Summary"
description: "Topic 6. Debugging and exceptions: conclusions and review questions"
sourceHash: "aecdff8c4eb68b606ee5512e212d8b1ecdb5707115aa3dda287f96738c8a0e82"
---

# Summary

## Conclusions

Errors can be syntax errors, runtime errors, or logic errors. Use a debugger to find logic errors: breakpoints (including conditional ones), stepping, and the Locals, Watch, Call Stack, and Immediate windows let you track variable values. Runtime errors in .NET are exceptions — objects of classes derived from `Exception`. Catch them using `catch` blocks ordered from specific to general types, refine handling with `when` filters, and release resources in `finally`. Methods validate arguments and throw the most specific exception type; the program reports errors through `Console.Error` and an exit code. Handle expected situations such as invalid input without exceptions, using `TryParse` and checks.

## Self-check questions

1. How do syntax, logic, and runtime errors differ?
2. What is a breakpoint? How do Step Over, Step Into, and Step Out differ?
3. What are the Locals, Autos, Watch, Call Stack, and Immediate windows for?
4. How do you configure a conditional breakpoint? What is a tracepoint?
5. How does `Debug.WriteLine` differ from `Console.WriteLine`? What does `Debug.Assert` check?
6. What is an exception? Which standard exception types do you know?
7. How does `try`/`catch` work? Why does `catch` block order matter?
8. When does a `finally` block run?
9. What are `when` exception filters used for?
10. How do you throw an exception? Which argument-validation helper methods do you know?
11. How do `throw;` and `throw ex;` differ?
12. What happens to an unhandled exception? What is a program’s exit code?
13. Why is `TryParse` preferable to exceptions for validating input?
14. How do you create a custom exception class?
15. What is the Exception Settings window for?

## Useful links

- Visual Studio debugger overview: <https://learn.microsoft.com/visualstudio/debugger/debugger-feature-tour>
- Breakpoints: <https://learn.microsoft.com/visualstudio/debugger/using-breakpoints>
- Exceptions in C#: <https://learn.microsoft.com/dotnet/csharp/fundamentals/exceptions/>
- Exception-handling statements: <https://learn.microsoft.com/dotnet/csharp/language-reference/statements/exception-handling-statements>
- Exception best practices: <https://learn.microsoft.com/dotnet/standard/exceptions/best-practices-for-exceptions>
- Managing exceptions in the debugger: <https://learn.microsoft.com/visualstudio/debugger/managing-exceptions-with-the-debugger>
