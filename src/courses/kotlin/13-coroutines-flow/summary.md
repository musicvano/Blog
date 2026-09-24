---
title: "Summary"
description: "Topic 13. Coroutines and Flow: conclusions and review questions"
sourceHash: "e73f02f22f2b194d7fbb3080e5f9b87643348c4ee267c9a087f251ef264f4c3b"
---

# Summary

## Conclusions

A coroutine separates a logical task from the thread that executes it. A structured scope defines the owner, cancellation defines the boundary of the work, and a dispatcher defines where it runs. `Flow` describes a sequence, and `StateFlow` the current state. Correctness starts with these contracts and only then moves on to choosing operators.

## Self-check questions

1. Does `suspend` start a new thread?
2. Why can `async { ... }.await()` leave a program sequential?
3. When does `coroutineScope` complete?
4. Why is cancellation called cooperative?
5. Which errors does `catch` handle in a Flow?
6. Why is StateFlow unsuitable for a log of all transactions?
