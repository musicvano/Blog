---
title: "Summary"
description: "Topic 1. Kotlin and your first program: conclusions and review questions"
sourceHash: "bfdd3a07b0710c0839c13c42123f4bf75c5aac832f544b3440db1d5ad172d5a1"
---

# Summary

## Conclusions

Kotlin is a statically typed language whose code compiles to bytecode and runs on the JVM together with the standard library. The program's JDK and the Gradle process JVM are two independent settings, and actual tool versions must be recorded in the report. A Gradle project with a wrapper fixes the build tool version, while `build.gradle.kts` describes plugins, dependencies, and tasks. The `main` entry point compiles into a class such as `MainKt`, so the filename, package, and `mainClass` must agree. Compilation and execution are different stages: the compiler finds a type error, invalid input causes an exception, and a logic error produces an ordinary but incorrect number. To share a program, use the entire `installDist` directory, not just your own JAR. Git stores source code and configuration history, while build outputs and caches can be recreated with a command. “It built” does not replace checking the result: every program needs input, an expected result, and an actual result.

## Self-check questions

1. Which stage converts Kotlin code into bytecode?
2. How does the program's JDK differ from the Gradle JVM?
3. What is the Gradle Wrapper for?
4. Why is standard input for the run task configured separately?
5. What is the difference between print and println?
6. Why might your own JAR not contain all dependencies?
7. How does commit differ from push?
8. Which files should be stored in the repository?
