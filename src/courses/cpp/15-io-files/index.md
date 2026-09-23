---
title: "Topic 15. Streams and files"
description: "I/O streams, working with text and binary files, the std::filesystem library"
sourceHash: "73345b274fbfcf4644bc89e1ffde2360011b8cfde89b74dc975dab176cee4910"
---

# Topic 15. I/O streams, working with text and binary files, the std::filesystem library

**Goal:** learn to check file operations, describe formats, work with stream positions, and handle filesystem errors without losing data.

## Lecture contents

1. [Streams and their states](./streams-states) — A stream as a sequence of operations · States: good, eof, fail, and bad · Opening, modes, and lifetime
2. [Text and binary files](./text-binary) — A text format and parsing the whole line · Formatting does not change the value · Text versus binary bytes · Random access to training records
3. [std::filesystem](./filesystem) — A path is a structure, not a string with slashes · UTF-8: contents and file names · Traversing a tree and handling errors · Writing to a temporary file and publishing it · Checking the format and failures

## Practice and review

- [Practice](./practice) — 3 worked examples with full code and output
- [Tasks](./tasks) — 30 variants, each with tasks at three difficulty levels
- [Summary](./summary) — conclusions and self-check questions
