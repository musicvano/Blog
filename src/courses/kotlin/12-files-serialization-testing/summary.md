---
title: "Summary"
description: "Topic 12. Files, serialization, and tests: conclusions and review questions"
sourceHash: "4061d47b817651d59b55c33963be3dead0fe65ac47b0cf395798fd8804b63b8b"
---

# Summary

## Conclusions

A path only describes a file's location, and a relative path depends on the process's working directory, so input and output paths are better passed as arguments. Text is stored as bytes in a specific encoding, and `use` and `useLines` close the resource when the block finishes, even on an exception. I/O errors are handled precisely, and an important file is updated through a fully written temporary file and a rename with an explicit atomicity policy. CSV has its own format contract, so `split` is suitable only for a deliberately restricted variant with validation of all lines. The kotlinx.serialization plugin generates serializers for classes annotated with `@Serializable`, and the `Json` settings define the schema, default values, and the reaction to unknown fields. A sealed hierarchy with a discriminator defines polymorphic encoding, and a type without built-in support, such as `LocalDate`, needs a custom serializer. A unit test is an executable contract with an Arrange–Act–Assert structure and an independently determined expected value. The Gradle report and coverage show what was executed, but correctness is proven by checks of behavior, boundaries, and corrupted data.

## Self-check questions

1. What does a relative path depend on?
2. Why does an exists check not replace handling IOException?
3. How do bytes differ from String.length?
4. Why must you not return a Sequence from useLines?
5. What guarantees does ATOMIC\_MOVE give and not give?
6. Why is split not a general CSV parser?
7. Why does serialization have both a plugin and a runtime?
8. When does ignoreUnknownKeys hide an error?
9. Which type determines the polymorphic serializer?
10. Why does LocalDate need an explicitly defined representation?
11. What are the roles of kotlin.test, the Platform, and Jupiter?
12. Why does coverage not prove correctness?

## Useful links

- <https://kotlinlang.org/docs/serialization.html>.
- <https://github.com/Kotlin/kotlinx.serialization/releases/tag/v1.11.0>.
- <https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.io.path/>.
- <https://kotlinlang.org/docs/jvm-test-using-junit.html>.
- <https://docs.junit.org/>.
