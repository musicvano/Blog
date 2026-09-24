---
title: "Summary"
description: "Topic 15. Compose Multiplatform: conclusions and review questions"
sourceHash: "ee3e63365f9a1ce68962954315c7a7eef67e05c7727a7e30a600907ec2ad1f55"
---

# Summary

## Conclusions

Compose describes UI as a function of state. State has an owner, events change it explicitly, and layout adapts elements to the available space. Side effects have a defined lifecycle; domain computations remain independent of composables.

## Self-check questions

1. What triggers recomposition?
2. Why is remember not saving to disk?
3. How does the order of padding and background affect the result?
4. Why does a list need a stable key?
5. When does LaunchedEffect cancel its coroutine?
6. What must be checked besides a successful compilation?
