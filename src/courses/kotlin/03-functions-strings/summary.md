---
title: "Summary"
description: "Topic 3. Functions and strings: conclusions and review questions"
sourceHash: "60c0b2664de6783ff680bf0fb3302117fe7cd419f0e69c4ced495e4426632154"
---

# Summary

## Conclusions

A function has a contract that includes parameter and return types, units, valid bounds, and how it fails. `Unit` denotes an action without a useful result, `Nothing` denotes a path without a normal return, and `require` explicitly rejects an invalid argument. Default parameters and named arguments make a call clear, but their values and names become part of the API. `vararg` accepts a variable number of arguments, while recursion requires a base case and a step that moves toward it; `tailrec` converts a tail call into a loop but does not fix algorithm errors. Extension functions are called like methods, but they are resolved statically and do not change the receiver class. A string is immutable: operations on it return a new string, and `String.length` on the JVM counts UTF-16 code units. Templates, slices, formatting with an explicit locale, and `StringBuilder` help produce predictable text. Regex distinguishes checking the entire string with `matches` from searching for a fragment with `find`, and syntactically valid text still needs semantic validation.

## Self-check questions

1. How does returning a value differ from printing?
2. When is an expression body convenient?
3. What do Unit and Nothing mean?
4. What data is a function's hidden input?
5. When is a default argument evaluated?
6. Why is the vararg spread operator needed?
7. Why is the usual factorial implementation not tail-recursive?
8. What restrictions does an infix function have?
9. Why does an extension not add a field to an object?
10. How does a wordCount property differ from a stored field?
11. What units does String.length count on the JVM?
12. How does matches differ from find?

## Useful links

- <https://kotlinlang.org/docs/functions.html>.
- <https://kotlinlang.org/docs/extensions.html>.
- <https://kotlinlang.org/docs/strings.html>.
- <https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.text/-regex/>.
- <https://kotlinlang.org/docs/java-to-kotlin-interop.html>.
