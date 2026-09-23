---
title: Summary
description: "Topic 15. Streams and Files: conclusions and review questions"
sourceHash: "a36e97e75807b97f328910b321e82894f8a75ccf8230599f5be2730c948952d6"
---

# Summary

## Conclusions

A stream connects a source or a sink of bytes with operations, an error
state, and formatting parameters. The good, eof, fail, and bad states
are checked after each operation, and a read loop is written using
the read attempt itself. RAII closes a file, but an important
result requires an explicit close and a state check. A text
format defines the fields, the value ranges, and the reaction to an invalid
line, so a record is accepted only after it has been parsed completely.
Binary mode turns off text conversions but does not create a
portable format: logical fields are serialized separately, and record
offsets are computed from the size defined by the format. `filesystem::path` represents
a path as a structure, and a relative path depends on the working directory
of the process. When traversing a directory, every operation is checked with
an exception or `error_code`. Writing to a temporary file followed by
a rename reduces the risk of a truncated result but does not give
all reliability guarantees.

## Self-check questions

1. Why is eof checked after a read attempt?
2. How does clear differ from seekg?
3. Why is a close with a check necessary despite RAII?
4. How does app differ from ate?
5. Why is a simple split by commas not a complete CSV parser?
6. Why does `trivially_copyable` not mean portable serialization?
7. How do you compute the offset of a record after a header?
8. What does a relative path depend on in Visual Studio?
9. How do you check for errors during increment of a directory iterator?
10. Which guarantees does writing to a tmp file followed by rename not provide?

## Review questions for the lab

1. Which bytes and encoding does your format define?
2. How does a corrupted record differ from the end of a file?
3. Which operations can overwrite an existing result?
4. Has closing the stream been checked?
5. Why does exists before an operation not guarantee its success?
