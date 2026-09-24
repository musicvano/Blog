---
title: "Tasks"
description: "Topic 12. Files, NIO.2, and serialization: task variants"
outline: [2, 3]
sourceHash: "8057f6d8801be1f41608326edae02d524ce50eb9d09d1d6309bfb018a6818359"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

Run all tests in a dedicated working directory; do not use personal documents as test data. Define the format, UTF-8 for text, limits, and the policy for an existing target file before you start implementing.

## Variants

### Variant 1. Expense tracking {#v1}

**1. Initial level.** Create a complete Java program on JDK 27. Read a UTF-8 CSV of date,category,cents without quotes or commas in fields; print the total. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Read a UTF-8 CSV of date,category,cents without quotes or commas in fields; print the total; write totals by category and a log of invalid lines. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Read a UTF-8 CSV of date,category,cents without quotes or commas in fields; print the total; write totals by category and a log of invalid lines; add a date filter and save the new report through a temporary file. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 2. A backup copy {#v2}

**1. Initial level.** Create a complete Java program on JDK 27. Enter a source directory and an empty target directory; copy the regular files of one level. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Enter a source directory and an empty target directory; copy the regular files of one level; recursively copy only the specified extensions without following symlinks. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter a source directory and an empty target directory; copy the regular files of one level; recursively copy only the specified extensions without following symlinks; show the count and bytes, reject a target inside the source, and do not overwrite existing files. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 3. Duplicate files {#v3}

**1. Initial level.** Create a complete Java program on JDK 27. Scan a given directory and group regular files by size. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Scan a given directory and group regular files by size; compare SHA-256 only within groups of the same size. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Scan a given directory and group regular files by size; compare SHA-256 only within groups of the same size; confirm duplicates byte by byte and print a report without automatic deletion. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 4. Log rotation {#v4}

**1. Initial level.** Create a complete Java program on JDK 27. Read text events and append them to a UTF-8 log. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Read text events and append them to a UTF-8 log; when the given number of bytes is exceeded, close and rename the log. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Read text events and append them to a UTF-8 log; when the given number of bytes is exceeded, close and rename the log; keep no more than the given number of your own archived logs; test a rename failure. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 5. Text notes {#v5}

**1. Initial level.** Create a complete Java program on JDK 27. Enter a title and multiline text; save it as UTF-8 to a new file. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Enter a title and multiline text; save it as UTF-8 to a new file; read the notes directory and search for a phrase. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Enter a title and multiline text; save it as UTF-8 to a new file; read the notes directory and search for a phrase; restrict names so they cannot escape the working directory, and apply a safe update. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 6. Encoding conversion {#v6}

**1. Initial level.** Create a complete Java program on JDK 27. Read a file in an explicitly specified UTF-8 or windows-1251 and write the other encoding. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Read a file in an explicitly specified UTF-8 or windows-1251 and write the other encoding; the decoder and encoder must report malformed and unmappable characters. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Read a file in an explicitly specified UTF-8 or windows-1251 and write the other encoding; the decoder and encoder must report malformed and unmappable characters; leave the source unchanged and test a round trip for an allowed character set. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 7. Disk analysis {#v7}

**1. Initial level.** Create a complete Java program on JDK 27. Use Files.walk to count regular files and the total size. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Use Files.walk to count regular files and the total size; print the top-k largest with relative paths. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Use Files.walk to count regular files and the total size; print the top-k largest with relative paths; group by extension, report inaccessible paths, and do not follow symlinks. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 8. A game save {#v8}

**1. Initial level.** Create a complete Java program on JDK 27. A Serializable class stores a fictional name and a level 0..100 in your own local file. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. A Serializable class stores a fictional name and a level 0..100 in your own local file; add serialVersionUID, a transient cache, and validation after reading. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. A Serializable class stores a fictional name and a level 0..100 in your own local file; add serialVersionUID, a transient cache, and validation after reading; apply an ObjectInputFilter allowlist and file limits, and test a wrong class and a truncated stream. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 9. A binary directory {#v9}

**1. Initial level.** Create a complete Java program on JDK 27. Write an id and a phone number as a fixed number of ASCII bytes with explicit padding. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Record format: a positive id as an 8-byte big-endian long, then a phone number of 1..16 ASCII characters (digits and an optional leading +), right-padded with spaces to 16 bytes; a record takes 24 bytes. Print the number of records written.

**2. Basic level.** Create a complete Java program on JDK 27. Write an id and a phone number as a fixed number of ASCII bytes with explicit padding; RandomAccessFile reads a record by index. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Record format: a positive id as an 8-byte big-endian long, then a phone number of 1..16 ASCII characters (digits and an optional leading +), right-padded with spaces to 16 bytes; a record takes 24 bytes. Print the number of records written.

**3. Advanced level.** Create a complete Java program on JDK 27. Write an id and a phone number as a fixed number of ASCII bytes with explicit padding; RandomAccessFile reads a record by index; add a magic number, a version, a count limit, and an offset overflow check. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break. Record format: a positive id as an 8-byte big-endian long, then a phone number of 1..16 ASCII characters (digits and an optional leading +), right-padded with spaces to 16 bytes; a record takes 24 bytes. Print the number of records written. Extended header: int magic `0x44495231`, int version=1, int count 0..10000; the record offset equals `12+24*index`, with zero-based indices.

### Variant 10. Training XOR {#v10}

**1. Initial level.** Create a complete Java program on JDK 27. Read bytes and apply XOR with a key 1..255 into a new file. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Read bytes and apply XOR with a key 1..255 into a new file; restore the source by applying it again and check equality. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Read bytes and apply XOR with a key 1..255 into a new file; restore the source by applying it again and check equality; process large files with a buffer and state explicitly that this is not secure encryption. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 11. Properties profiles {#v11}

**1. Initial level.** Create a complete Java program on JDK 27. Read title,limit,folder through a UTF-8 Reader with default values. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Defaults: title=Demo, limit=100, folder=the current working directory; show all three resulting values. A missing file means these defaults; an invalid existing file is an error.

**2. Basic level.** Create a complete Java program on JDK 27. Read title,limit,folder through a UTF-8 Reader with default values; check limit 1..1000 and that the directory exists. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Defaults: title=Demo, limit=100, folder=the current working directory; show all three resulting values. A missing file means these defaults; an invalid existing file is an error.

**3. Advanced level.** Create a complete Java program on JDK 27. Read title,limit,folder through a UTF-8 Reader with default values; check limit 1..1000 and that the directory exists; support base and additional profiles with explicit precedence and no secrets in the report. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break. Defaults: title=Demo, limit=100, folder=the current working directory; show all three resulting values. A missing file means these defaults; an invalid existing file is an error. Values from the additional profile override the base one; missing keys inherit the base or default value.

### Variant 12. Photos by date {#v12}

**1. Initial level.** Create a complete Java program on JDK 27. Scan regular files and read their mtime; build a plan of year-month directories. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Scan regular files and read their mtime; build a plan of year-month directories; copy files according to the plan without overwriting. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Scan regular files and read their mtime; build a plan of year-month directories; copy files according to the plan without overwriting; resolve name collisions with a suffix, show a dry run first, and do not modify the originals. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 13. A CSV grade log {#v13}

**1. Initial level.** Create a complete Java program on JDK 27. Read id,name,score 0..100 in a format without quotes or commas in fields. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Read id,name,score 0..100 in a format without quotes or commas in fields; write the valid records and separate errors with line numbers. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Read id,name,score 0..100 in a format without quotes or commas in fields; write the valid records and separate errors with line numbers; reject duplicate ids and keep the previous report until the new one is complete. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 14. Line comparison {#v14}

**1. Initial level.** Create a complete Java program on JDK 27. Read two UTF-8 files and print the lines with the same numbers that differ. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Read two UTF-8 files and print the lines with the same numbers that differ; show the missing lines of the shorter file. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Read two UTF-8 files and print the lines with the same numbers that differ; show the missing lines of the shorter file; support a mode that ignores trailing spaces, and EOF without a line break. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 15. A safe ZIP {#v15}

**1. Initial level.** Create a complete Java program on JDK 27. Create a ZIP from given regular files of one directory. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Create a ZIP from given regular files of one directory; extract only into a new empty directory, checking normalized paths. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Create a ZIP from given regular files of one directory; extract only into a new empty directory, checking normalized paths; reject absolute paths and escapes through .., and limit the number of entries and the total extracted bytes. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 16. A file word-frequency dictionary {#v16}

**1. Initial level.** Create a complete Java program on JDK 27. Read UTF-8 text in Latin letters and count the words. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Read UTF-8 text in Latin letters and count the words; write a sorted word,count report. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Read UTF-8 text in Latin letters and count the words; write a sorted word,count report; process line by line without loading the whole file, and test empty and long lines. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 17. A serialized warehouse {#v17}

**1. Initial level.** Create a complete Java program on JDK 27. Save your own local list of id–quantity products through Serializable. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Save your own local list of id–quantity products through Serializable; add a UID and domain validation of unique ids and nonnegative quantities. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Save your own local list of id–quantity products through Serializable; add a UID and domain validation of unique ids and nonnegative quantities; restrict the allowed classes and graph size, and test an incompatible version and corruption. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 18. Mail templates {#v18}

**1. Initial level.** Create a complete Java program on JDK 27. Read a UTF-8 template with a NAME marker and a CSV of id,name without quotes or commas. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Replace every literal NAME marker with the name from the current CSV line and print the id and the finished text. An id consists of 1..20 ASCII letters, digits, hyphens, or underscores; the output file name has the form id.txt.

**2. Basic level.** Create a complete Java program on JDK 27. Read a UTF-8 template with a NAME marker and a CSV of id,name without quotes or commas; create a separate new text file for each id. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Replace every literal NAME marker with the name from the current CSV line and print the id and the finished text. An id consists of 1..20 ASCII letters, digits, hyphens, or underscores; the output file name has the form id.txt.

**3. Advanced level.** Create a complete Java program on JDK 27. Read a UTF-8 template with a NAME marker and a CSV of id,name without quotes or commas; create a separate new text file for each id; prohibit duplicate ids and unsafe names; treat unknown markers as an error. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break. Replace every literal NAME marker with the name from the current CSV line and print the id and the finished text. An id consists of 1..20 ASCII letters, digits, hyphens, or underscores; the output file name has the form id.txt.

### Variant 19. A directory watcher {#v19}

**1. Initial level.** Create a complete Java program on JDK 27. WatchService registers create/delete/modify and exits after the given number of seconds. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. WatchService registers create/delete/modify and exits after the given number of seconds; after OVERFLOW, it rescans the state and explains possible repeated events. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. WatchService registers create/delete/modify and exits after the given number of seconds; after OVERFLOW, it rescans the state and explains possible repeated events; test closing the resource and an invalid WatchKey without waiting forever. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 20. Binary weather {#v20}

**1. Initial level.** Create a complete Java program on JDK 27. Write a magic number, a count, and fixed epochDay–double records. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Big-endian format: magic int `0x57454131`, count int 0..10000, followed by 16-byte records: a long epochDay and a double temperature of -90..60 °C. The header takes 8 bytes; print the count and the dates/temperatures read.

**2. Basic level.** Create a complete Java program on JDK 27. Write a magic number, a count, and fixed epochDay–double records; read a record by index through RandomAccessFile. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Big-endian format: magic int `0x57454131`, count int 0..10000, followed by 16-byte records: a long epochDay and a double temperature of -90..60 °C. The header takes 8 bytes; print the count and the dates/temperatures read.

**3. Advanced level.** Create a complete Java program on JDK 27. Write a magic number, a count, and fixed epochDay–double records; read a record by index through RandomAccessFile; reject NaN, infinity, an invalid file size, and an out-of-range index. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break. Big-endian format: magic int `0x57454131`, count int 0..10000, followed by 16-byte records: a long epochDay and a double temperature of -90..60 °C. The header takes 8 bytes; print the count and the dates/temperatures read.

### Variant 21. Batch renaming {#v21}

**1. Initial level.** Create a complete Java program on JDK 27. Generate a plan of new names by prefix and number for the given files. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Generate a plan of new names by prefix and number for the given files; check all targets for collisions before making changes. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Generate a plan of new names by prefix and number for the given files; check all targets for collisions before making changes; dry run only by default; changes only with an explicit apply; report a partial failure without hiding it. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 22. Subtitle shift {#v22}

**1. Initial level.** Create a complete Java program on JDK 27. Read a restricted SRT: a number, a time pair, one text line, an empty separator. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Time has the format HH:mm:ss,SSS with hours 00..99; the pair is separated by a literal ` --> `. Print the number, start, end, and duration of each block; the start is earlier than the end.

**2. Basic level.** Create a complete Java program on JDK 27. Read a restricted SRT: a number, a time pair, one text line, an empty separator; shift the time by the given milliseconds and reject a negative result. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Time has the format HH:mm:ss,SSS with hours 00..99; the pair is separated by a literal ` --> `. Print the number, start, end, and duration of each block; the start is earlier than the end.

**3. Advanced level.** Create a complete Java program on JDK 27. Read a restricted SRT: a number, a time pair, one text line, an empty separator; shift the time by the given milliseconds and reject a negative result; check the start–end order, save as UTF-8, and do not modify the source. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break. Time has the format HH:mm:ss,SSS with hours 00..99; the pair is separated by a literal ` --> `. Print the number, start, end, and duration of each block; the start is earlier than the end.

### Variant 23. Room bookings {#v23}

**1. Initial level.** Create a complete Java program on JDK 27. Read a CSV of room,date,start,end with whole hours. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. The date is in ISO format, the hours are integers 0..24, and the start is earlier than the end. Print a table of bookings and total hours by room; receive a new booking as a separate line in the same format.

**2. Basic level.** Create a complete Java program on JDK 27. Read a CSV of room,date,start,end with whole hours; reject overlapping half-open intervals. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. The date is in ISO format, the hours are integers 0..24, and the start is earlier than the end. Print a table of bookings and total hours by room; receive a new booking as a separate line in the same format.

**3. Advanced level.** Create a complete Java program on JDK 27. Read a CSV of room,date,start,end with whole hours; reject overlapping half-open intervals; update the file through a temporary file in the same directory and handle the absence of ATOMIC\_MOVE explicitly. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break. The date is in ISO format, the hours are integers 0..24, and the start is earlier than the end. Print a table of bookings and total hours by room; receive a new booking as a separate line in the same format.

### Variant 24. A translation dictionary {#v24}

**1. Initial level.** Create a complete Java program on JDK 27. Read UTF-8 lines of key=translation, where the key does not contain =. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Read UTF-8 lines of key=translation, where the key does not contain =; support lookup and addition with a duplicate check. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Read UTF-8 lines of key=translation, where the key does not contain =; support lookup and addition with a duplicate check; save in sorted order through a new file, and test Cyrillic text and empty values. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 25. An HTML report {#v25}

**1. Initial level.** Create a complete Java program on JDK 27. Read name–integer value records from a restricted CSV and create an HTML table. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Read name–integer value records from a restricted CSV and create an HTML table; escape ampersands, angle brackets, and quotes in text. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Read name–integer value records from a restricted CSV and create an HTML table; escape ampersands, angle brackets, and quotes in text; add a total and test malicious text as data, without executing HTML. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 26. A training budget {#v26}

**1. Initial level.** Create a complete Java program on JDK 27. Save fictional categories and amounts in cents in your own Serializable state. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Save fictional categories and amounts in cents in your own Serializable state; export the same data to a restricted CSV. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Save fictional categories and amounts in cents in your own Serializable state; export the same data to a restricted CSV; use a deserialization filter and test the semantic equality of the two formats, without financial advice. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 27. A Markdown report {#v27}

**1. Initial level.** Create a complete Java program on JDK 27. Read name–quantity records and write a Markdown table. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Read name–quantity records and write a Markdown table; escape vertical bars and line breaks in cells. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Read name–quantity records and write a Markdown table; escape vertical bars and line breaks in cells; add sorted totals and test an empty set and special characters. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 28. A SHA-256 manifest {#v28}

**1. Initial level.** Create a complete Java program on JDK 27. For the regular files of a directory, write the relative path and SHA-256. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. For the regular files of a directory, write the relative path and SHA-256; verify files against the manifest and show changed and missing ones. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. For the regular files of a directory, write the relative path and SHA-256; verify files against the manifest and show changed and missing ones; prohibit paths that escape the root, handle manifest duplicates, and do not treat a hash as authentication. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

### Variant 29. CSV to JSON {#v29}

**1. Initial level.** Create a complete Java program on JDK 27. Read a restricted CSV of id,name without quotes or commas in fields. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. The id is a positive long integer; the name is a nonempty string; print an id/name table and the number of records. JSON output, if required by the level, contains objects with a numeric id and a text name.

**2. Basic level.** Create a complete Java program on JDK 27. Read a restricted CSV of id,name without quotes or commas in fields; write a JSON array with the standard library, correctly escaping quotes, backslashes, and control characters. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. The id is a positive long integer; the name is a nonempty string; print an id/name table and the number of records. The JSON array contains objects with a numeric id and a text name.

**3. Advanced level.** Create a complete Java program on JDK 27. Read a restricted CSV of id,name without quotes or commas in fields; write a JSON array with the standard library, correctly escaping quotes, backslashes, and control characters; reject invalid ids and test an empty set and Unicode; do not call split a complete CSV parser. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break. The id is a positive long integer; the name is a nonempty string; print an id/name table and the number of records. JSON output, if required by the level, contains objects with a numeric id and a text name.

### Variant 30. Reader records {#v30}

**1. Initial level.** Create a complete Java program on JDK 27. Serialize a record ReaderCard with an id and a nonempty name into your own local file. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**2. Basic level.** Create a complete Java program on JDK 27. Serialize a record ReaderCard with an id and a nonempty name into your own local file; check the invariants with the canonical constructor during restoration. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file.

**3. Advanced level.** Create a complete Java program on JDK 27. Serialize a record ReaderCard with an id and a nonempty name into your own local file; check the invariants with the canonical constructor during restoration; add an ObjectInputFilter, limits, and tests of a wrong root type and a truncated file. Use try-with-resources and a separate test directory; print a labeled result. Test an empty, an invalid, and a missing file. Support key=value CLI arguments and `--help`; with no arguments, read the same fields from the keyboard. The report is a table with totals; errors go to stderr. Exit codes: 0 success/help, 2 invalid input, 1 operational failure. Add automated tests and a check of EOF without a final line break.

## Procedure

1. Describe the format and the difference between an empty file and an empty set.
2. Separate reading, validation, computation, and writing.
3. Close all resources, including Files.lines/list/walk streams.
4. Test a missing path, an invalid header, EOF without a final line break, a truncated record, and a refused overwrite.
5. Submit sample input, the actual result files, and a table of tests.
6. Explain what happens to the old result after a failure.
