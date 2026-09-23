---
title: "Summary"
description: "Topic 4. Exceptions and debugging: conclusions and review questions"
sourceHash: "daf4a778e98d88774c3f70ff86b7f4cec8b49b9666687123bb0373293c536eb1"
---

# Summary

## Conclusions

Place a handler where it can provide a meaningful response. Check preconditions before changing state, close resources automatically, and preserve the cause when converting an exception.

## Self-check questions

1. How do checked and unchecked exceptions differ?
2. Why must a catch for a subtype precede one for a supertype?
3. Which types can be combined using multi-catch?
4. How does throw differ from throws?
5. Why is finally not guaranteed when a process crashes?
6. Why is a return in finally dangerous?
7. How do you preserve an exception's original cause?
8. In what order are resources closed?
9. How does suppressed differ from cause?
10. Why does assert not reliably validate user input?
11. What state should you inspect for an error in an average?
12. How do you verify that state remains unchanged after a failure?
