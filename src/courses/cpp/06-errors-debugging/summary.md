---
title: Summary
description: "Topic 6. Debugging and Errors: conclusions and review questions"
sourceHash: "0f2a5b11c9f930fcac2da930e5220b7a4b0d2d5490783c7787c23f095dc83c06"
---

# Summary

## Conclusions

The search for a defect starts
with a reproducible example.
The debugger shows
the state, but explaining
the cause requires
an understanding of types,
bounds and invariants.
RAII supports
releasing resources
when exceptions occur.
Expected makes
an error an explicit
part of the result.
Every interface
must define
the state after a failure.

## Self-check questions

1. How does a logic error differ from UB?
2. What do you need for a reproducible example?
3. How do F10, F11 and Shift+F11 differ?
4. When is a conditional breakpoint useful?
5. Why can a Watch expression change the state?
6. Why doesn’t assert check input in all builds?
7. What is destroyed during stack unwinding?
8. Why catch by const reference?
9. How does throw; differ from throw error;?
10. What happens when noexcept is violated?
11. What does strong exception safety guarantee?
12. When is optional not enough?
13. What is the precondition for calling error()?
14. How does and_then differ from transform?
15. Why doesn’t C++26 in the course title guarantee the debugging API?

## Review questions for the lab

1. What is the first point of discrepancy?
2. When do you need Step Into?
3. How does a break on thrown differ from a break on unhandled?
4. Why define a custom exception type?
5. Why are exceptions caught by const\&?
6. How does RAII work during an exception?
7. What does noexcept mean?
8. What does the strong guarantee preserve?
9. When is expected appropriate?
10. Why doesn’t assert replace input validation?

## Useful links

- Exceptions: <https://learn.microsoft.com/cpp/cpp/errors-and-exception-handling-modern-cpp>.
- Debugging: <https://learn.microsoft.com/visualstudio/debugger/getting-started-with-the-debugger-cpp>.
- The MSVC implementation of expected: <https://github.com/microsoft/STL/blob/main/stl/inc/expected>.
- Hot Reload: <https://learn.microsoft.com/visualstudio/debugger/hot-reload>.
