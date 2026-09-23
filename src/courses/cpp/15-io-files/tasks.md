---
title: Tasks
description: "Topic 15. Streams and Files: task variants"
outline: [2, 3]
sourceHash: "380dfcbfbfdae3715c7c5b0d0c9a6167ce743e3fedb3c2dcf3d0d2d3251ef438"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

If specific test data is not given, choose it and include it in the report. The training examples are not intended for working with real account data or third-party files.

## Variants

### Variant 1. A server log analyzer {#v1}

**1. Initial level.** Create a console program: generate log.txt with lines of the form hour level message; count ERROR entries. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: generate a log of the form hour|level|message, check hour 0..23 and the levels INFO/WARN/ERROR, and print the numbers of rejected lines. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate a log of the form hour|level|message, build an hourly ERROR report in report.txt, and check the write after close. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 2. Finding duplicate files {#v2}

**1. Initial level.** Create a console program: generate three files, two of them identical; group the candidates by size. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: in your own training folder, group files by size and by a training checksum, then confirm byte-for-byte equality. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate a nested set with duplicates, empty files, and different files of the same length; write the groups of confirmed duplicates and delete nothing. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 3. Renaming photos {#v3}

**1. Initial level.** Create a console program: generate the empty training files img1.jpg, img2.jpg; print a plan for renaming them to photo-001.jpg and so on without executing it. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: generate files with different last\_write\_time values and build a plan of names ordered by date; number any collisions. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate training photo files img1.jpg, img2.jpg, and so on with different last\_write\_time values and implement separate plan/apply modes for renaming them to photo-001.jpg and so on by date, for this fixture only; before apply, check all target names and refuse without making changes if there is a collision. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 4. Expense tracking {#v4}

**1. Initial level.** Create a console program: generate a CSV file date,category,cents without quotes, read it, and total the cents. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: for your own CSV file YYYY-MM-DD,category,cents, check the fields and append one valid record in app mode. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate a CSV file of expenses, group them by YYYY-MM and category, write a report, and save the invalid lines with their numbers separately. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 5. Contacts {#v5}

**1. Initial level.** Create a console program: generate contacts.csv name,phone, read it, and find a name given in the code. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: generate a CSV file of contacts without commas in the fields, remove exact duplicate pairs, and export them in sorted order. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate contacts with repeated phone numbers; normalize only the ASCII digits of the phone numbers, keep all names of a group, and write a separate conflict report. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 6. A binary product database {#v6}

**1. Initial level.** Create a console program: generate two records id uint32 and price uint32 in an explicitly described little-endian format, read them, and display them. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: generate a binary product database of fixed 8-byte records (id uint32, price uint32, little-endian), change the price of the second one with seekp, and read it again to check. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate a binary product database with a header (magic, version, count) and fixed records id uint32, price uint32 in little-endian; read and modify records while checking the length and the record number; do not use raw strings or addresses in the file. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 7. Merging sorted files {#v7}

**1. Initial level.** Create a console program: generate two text files of sorted integers and merge them into a third one, keeping duplicates. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: generate two text files of sorted integers and merge them into a third one as a stream without loading all the numbers; reject unsorted input. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate three sorted files, perform a k-way merge using a priority queue, and check an empty file and an invalid number. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 8. Splitting a large file {#v8}

**1. Initial level.** Create a console program: generate 10 bytes and split them into parts of 4; check the last 2 bytes. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: split a generated file into parts of a positive size and write a manifest with the names and lengths. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: split a generated file into parts of a given size with a manifest of names and lengths, then restore the file from the manifest, reject a missing or invalid part, and compare the bytes of the result with the original. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 9. A BMP header {#v9}

**1. Initial level.** Create a console program: create a minimal training BMP with a 14-byte header and a DIB of 40, and read the magic and the offset. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: for a generated uncompressed 24-bit BMP, read the width, the height, and bits-per-pixel with explicit little-endian functions. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate a valid and a truncated BMP, check the magic, DIB size, planes=1, compression=0, and the bounds of the pixel data; write an error report and reject unsupported formats. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 10. A WAV header {#v10}

**1. Initial level.** Create a console program: generate a PCM WAV mono 16-bit 8000 Hz file with 8000 given samples, and read RIFF/WAVE. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: in a generated PCM WAV file, find the fmt and data chunks and compute the duration dataSize/byteRate. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: parse your own WAV files with an additional odd-sized chunk and truncated data; take chunk padding into account, and reject out-of-bounds reads and an unsupported format. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 11. A diary {#v11}

**1. Initial level.** Create a console program: create your own file demo/2026/09/17.txt with a training entry and read it. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: generate three entries in year/month directories and find an ASCII word in the contents; print the path and the line. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate a diary for several months in year/month/day.txt files, build an index of dates and a report of matches of a given ASCII word for a period; check the dates and do not modify other directories. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 12. The tree command {#v12}

**1. Initial level.** Create a console program: generate a folder with two files and a subdirectory, and print the structure of one level. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: generate a training tree of directories and files and display it recursively with indentation and a depth limit, in sorted order. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate a training tree of directories and files, print it with the logical sizes of files and directory totals, do not follow symlinks, and mark every error as an incomplete total. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 13. Extension statistics {#v13}

**1. Initial level.** Create a console program: generate .cpp and .txt files and files without an extension, and count them by extension. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: for your own nested directory, group the count and the bytes by extension; mark an empty extension explicitly. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate a fixture and write a CSV file extension,count,total,max; normalize ASCII extensions to lowercase, and do not turn file\_size errors into zeros. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 14. A CSV to Markdown converter {#v14}

**1. Initial level.** Create a console program: generate a simple CSV file name,score and write a Markdown table to a file. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: convert your own CSV file with a fixed number of fields to Markdown, escape | in a cell, and reject invalid lines. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate a CSV file id,name,score, select the given column names, reject a missing column and malformed lines, and write the finished table through a temporary file. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 15. Fixed-width records {#v15}

**1. Initial level.** Create a console program: generate ASCII text records with an ID of width 4 and a name of width 10; parse them by offsets. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: for your own records of width 4+10+3, check an integer score 0..100 and the exact length, and create a CSV file. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate valid and short fixed-width records, convert the valid ones to CSV, write the invalid ones with their numbers and reasons, and trim whitespace only at the edges of a field. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 16. A recipe book {#v16}

**1. Initial level.** Create a console program: generate text with title= and ingredient= blocks and read one recipe. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: generate several recipes with an empty line between blocks and find them by an ASCII substring of the title. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: describe your own format with title and ingredient=name;grams, check that the grams are positive, find recipes without a given ingredient, and write a report. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 17. A quiz from a file {#v17}

**1. Initial level.** Create a console program: generate a question|answer file with two training questions, read it, and display it. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: generate a question|answer quiz and the given user answers in another file, and count exact ASCII matches. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate files of questions with IDs and of answers, check for unique IDs and missing answers, and write a detailed result and the total score. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 18. Training XOR notes {#v18}

**1. Initial level.** Create a console program: generate ASCII text and apply a bytewise XOR with a given byte, save it, and restore it for comparison. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: encrypt generated ASCII text with a bytewise XOR with a given byte and write a file with a header of magic, version, and length; check the header before restoring the text. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate a valid and a truncated file with text encrypted by XOR with a repeating key, a length header, and a checksum of the plaintext; check them when restoring; state explicitly that XOR with a repeating key is not secure encryption. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 19. Checking a training archive {#v19}

**1. Initial level.** Create a console program: create a fixture folder, check for README.md, main.cpp, and report.txt, and print the missing ones. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: check your own submission folder for required non-empty files and unwanted .exe/.obj files; delete nothing. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate a submission tree, read a manifest of allowed relative paths, reject absolute paths and .., and write a report of missing and extra files without unpacking someone else’s archive. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 20. A hex editor {#v20}

**1. Initial level.** Create a console program: generate 16 bytes and print a hex dump with offsets. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: change one byte of your own file at a given offset; check the bounds and the value 0..255. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate a binary file, build a plan of three byte changes (offsets and values 0..255), check all offsets before writing, save a new copy, and show only the differing positions in a hex dump. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 21. Weather data {#v21}

**1. Initial level.** Create a console program: generate a CSV file station,month,temp and compute the average temperature. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: generate data for several stations and months, check month 1..12, and group the averages. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate a CSV file with missing and invalid temperatures, report the accepted/rejected records separately, and report the number of observations for each average. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 22. A word index for a directory {#v22}

**1. Initial level.** Create a console program: generate two text files and find a given ASCII word with line numbers. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: generate several text files and build an index ASCII word→file→set of lines. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate nested texts, build an index and a search for all words of a query in one line, sort the result, and do not interpret binary files as text. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 23. Cleaning up temporary files {#v23}

**1. Initial level.** Create a console program: generate your own .tmp files with different last\_write\_time values and show the candidates older than a given duration without deleting them. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: generate a fixture and write a dry-run cleanup plan only for .tmp files in its root; compare file\_time\_type times explicitly. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate .tmp and other files with different last\_write\_time values and implement a dry run and an explicit apply that deletes only .tmp files older than a given duration; before deleting, check the type and age again; do not delete symlinks, and report every failure. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 24. A school grade book {#v24}

**1. Initial level.** Create a console program: generate binary records id uint32,score uint32 with explicit little-endian, read them, and print them. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: generate a binary grade book with a header and fixed records id uint32, score uint32 in little-endian, and update a grade by index with a 0..100 check. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate a binary grade book of records id uint32, score uint32 in little-endian, read it, check the IDs and the grades 0..100, sort a copy by score, and write a new file without modifying the original. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 25. Synchronizing directories {#v25}

**1. Initial level.** Create a console program: generate two folders of your own and print the names that exist only in the source. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: build a plan for copying new files and files that differ by bytes between two folders of your own, without executing it. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate two training folders, build a plan for copying new files and files that differ by bytes from the source to the destination, and execute it only in apply mode; do not delete files in the destination, forbid nesting one folder inside the other, and report errors. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 26. A code line counter {#v26}

**1. Initial level.** Create a console program: generate a .cpp file with empty and non-empty lines and count both groups. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: generate a .cpp file and count the lines that start with `//` after whitespace; treat the remaining non-empty lines as code. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate a test .cpp file and implement a training state machine for block comments and string literals; describe the unsupported raw literals, and do not call the result a complete C++ parser. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 27. A game high score table {#v27}

**1. Initial level.** Create a console program: generate an id,score file in an explicit binary format, read it, and print the top 3. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: generate 15 high score records id,score, sort them by score in descending order and by id in ascending order, and save the top 10 in an explicit binary format with a header. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: save a high score table id,score in a binary file with a header, a version, and a simple byte checksum; generate a corrupted copy and reject it; the checksum detects accidental changes but does not provide authenticity. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 28. Comparing text files {#v28}

**1. Initial level.** Create a console program: generate two texts and print the numbers of lines that differ at the same positions. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: compare your own texts of different lengths, show the missing lines, and save a report. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: implement a line diff based on the longest common subsequence for two small generated files; show insertions/deletions and limit the size because of the quadratic memory. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 29. Project configuration {#v29}

**1. Initial level.** Create a console program: generate key=value with width and height, read it, and print it. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: generate a config with width, height, fullscreen, check for positive sizes and true/false, and reject unknown keys. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate a key=value config with the keys width, height, and fullscreen; substitute default values for missing keys, and treat invalid explicit values as an error; write the normalized configuration and a report of the checks. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

### Variant 30. A receipt archive {#v30}

**1. Initial level.** Create a console program: generate training CSV receipts YYYY-MM-DD,cents in a year folder and read the amounts. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**2. Basic level.** Create a console program: generate receipts for two years and find records within a closed period of ISO dates and with a minimum amount. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

**3. Advanced level.** Create a console program: generate an archive of CSV receipts id,YYYY-MM-DD,cents in year folders, build an index, check for unique receipt IDs, and write the annual totals and, separately, the duplicates; do not modify the originals. Set the parameters in the code; work in a separate training folder; print the result and messages about file errors.

## Procedure

1. Build the examples and compare the results with the ones shown.
1. Create a separate program for the chosen level of your variant.
1. Write down the requirements, the valid data, and the expected results before implementing.
1. Check the ordinary, empty, and edge cases that make sense for the task.
1. Save the code, the build commands, and the check results in a local Git repository.

Work in a separate training folder. The programs create their own data; check the names before running them again. For the renaming, cleanup, and synchronization tasks, build a dry-run plan first, and do not work with personal directories.

## Report requirements

Submit the problem statement of the chosen task, the solution with an explanation of the invariants,
the build command, the MSVC version, the test data, and the actual output.
For expected errors, separate the negative test from the working program.
Explain the cause of the failure and the fix; a screenshot of the Error List alone is not enough.
