---
title: "Summary"
description: "Topic 13. NumPy, pandas, Matplotlib: conclusions and review questions"
sourceHash: "a4acfb1ee369936bd41dee617d181ca3c1b91257e3727d90bd5e169e5a4e5b7f"
---

# Summary

## Conclusions

NumPy operates on the shapes and axes of numeric arrays, pandas adds labels and tabular transformations, and Matplotlib explains results graphically. Report quality depends on the data contract, an explicit missing-value policy, key validation, and verified totals. Vectorization shortens code but does not eliminate the need to check shapes. Every plot must include units and be readable without relying on color alone.

## Self-check questions

1. What do `dtype`, `shape`, `ndim`, and `size` mean?
2. Why do a NumPy array and a list respond differently to multiplication?
3. Which axis does `mean(axis=0)` eliminate for a matrix?
4. When does a slice modify the original array, and how can you prevent this?
5. Which shapes does broadcasting permit?
6. Why are `isfinite` and an error tolerance needed?
7. How does a `.loc` label differ from an `.iloc` position?
8. How does Copy-on-Write affect chained assignment?
9. Why can a missing measurement not automatically be replaced with zero?
10. How does `count` differ from `size` in grouping?
11. How does `validate` help during merge?
12. Why are energy and a cumulative reading aggregated differently?
13. How do you choose between a line, bars, a histogram, and points?
14. What is the `Agg` backend for in tests and batch reports?
15. What data and versions must be saved to reproduce an analysis?

## Useful links

- <https://numpy.org/doc/stable/user/absolute_beginners.html>.
- <https://numpy.org/doc/stable/user/basics.broadcasting.html>.
- <https://pandas.pydata.org/docs/user_guide/10min.html>.
- <https://pandas.pydata.org/docs/user_guide/missing_data.html>.
- <https://matplotlib.org/stable/users/explain/quick_start.html>.
