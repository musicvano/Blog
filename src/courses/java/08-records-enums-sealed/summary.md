---
title: "Summary"
description: "Topic 8. Records, enum, and sealed classes: conclusions and review questions"
sourceHash: "2bcbccb266f4e26e55ee4d5bfefe7ff49e40690afbbcf891715791605dfca302"
---

# Summary

## Conclusions

Records describe values through components, enum defines a finite set of constants, sealed restricts alternatives, and patterns let you safely examine their structure. Compact syntax does not eliminate the need for invariants, defensive copies, or numeric bounds checks.

## Self-check questions

1. Which members does a record generate?
2. When are the fields assigned in a compact constructor?
3. Why is a record with an array not automatically immutable?
4. Why should ordinal not be stored as an external code?
5. How does enum combine fields and behavior?
6. Which modifiers do direct subtypes of sealed types have?
7. What does dominance of a switch case mean?
8. Why does default not replace case null?
9. What do var and the underscore do in patterns?
10. How do you verify that simplification preserves semantics?
