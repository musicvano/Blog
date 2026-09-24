---
title: "Summary"
description: "Topic 12. Files, NIO.2, and serialization: conclusions and review questions"
sourceHash: "e6230136590868cd053371c2242edf77e1e44adcfb0af203e722e8c4a7e274f9"
---

# Summary

## Conclusions

A file is a sequence of bytes, and its meaning is defined by an agreed format: the encoding, field order, version, and allowed sizes. `Path` and `Files` from NIO.2 build paths and perform file operations, and a relative path depends on the process's working directory. Byte streams work with bytes and character streams with characters, and converting between them requires an explicit encoding, usually UTF-8. Resources are closed with try-with-resources, and reading into a buffer takes into account the number of bytes actually received. An existence check does not replace handling the actual failure of an operation, and traversing directories and extracting archives require control of bounds, links, and sizes. A reliable update writes a temporary file and moves it to the target only after checking it. Standard serialization stores an object graph but does not repeat the constructor's validation, so the restored state is checked, and a different format is chosen for untrusted data. A file-processing program is tested in a separate temporary directory with normal, empty, invalid, and truncated data.

## Review questions

1. How does normalize differ from toRealPath?
2. Why is a resource closed even after an exception?
3. When do you need a byte stream, and when a Reader?
4. Which contract allows a simple split in the CSV example?
5. Why must Files.walk be closed?
6. What does ATOMIC\_MOVE not guarantee on an arbitrary provider?
7. Why doesn't Serializable perform all domain validation?
8. What limitations does ObjectInputFilter have?

## Useful links

- <https://dev.java/learn/java-io/>.
- <https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>.
- <https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/ObjectInputFilter.html>.
- <https://openjdk.org/jeps/400>.
- <https://openjdk.org/jeps/415>.
