---
title: "Tasks"
description: "Topic 16. Files, streams, JSON: task variants"
outline: [2, 3]
sourceHash: "44a7137f2ea680ce87143e2a92edb254e648be19f89e38cb36270321fe5a4745"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Mood diary {#v1}

**1. Initial level.** Write a console program that saves mood diary entries entered by the user (date, rating 1–5, comment) to a JSON file, reads the file, and prints all entries.

**2. Basic level.** Create a mood diary console program (entry: date, rating 1–5, comment) with a JSON file that, through a menu, executes commands for adding an entry and searching by period and by a word in the comment, prints the average rating by week, and handles a missing or corrupted file with a message.

**3. Advanced level.** Create a mood diary library (entries: date, rating 1–5, comment) in a JSON file with an automatic backup before each save (the last 5 copies with the date in the name) and restoration from a selected copy. A dotnet CLI application executes add, view, and restore commands from arguments; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 2. Class timetable from CSV {#v2}

**1. Initial level.** Write a console program that reads a CSV timetable file (day, period, course, instructor, classroom) into a list of `Lesson` records and prints the classes of the entered day sorted by period number.

**2. Basic level.** Create a console program that reads a CSV timetable file (day, period, course, instructor, classroom) with support for quoted fields containing a comma, skips invalid lines with a message giving the line number, groups the classes by instructor, and writes a report to a text file.

**3. Advanced level.** Create a library for importing a CSV timetable (day, period, course, instructor, classroom) with automatic detection of the separator (`,` or `;`) and the encoding (UTF-8 or Windows-1251) and export of the classes to JSON. A dotnet CLI application converts an input file into an output file, with the paths given as arguments; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 3. SRT subtitles {#v3}

**1. Initial level.** Write a console program that reads an SRT subtitle file (blocks: number, a time line `00:01:02,500 --> 00:01:04,000`, text) into a list of records and prints the number of subtitles and the length of the film based on the end of the last subtitle.

**2. Basic level.** Create a console program that reads an SRT subtitle file (number, start and end time, text), shifts all timestamps by the entered number of milliseconds (`TimeSpan`), and writes the result to a new file without changing the original. Skip invalid blocks with a message.

**3. Advanced level.** Create an SRT subtitle library (number, start, end, text) with synchronization by two reference points (a linear time transformation), merging of two files with renumbering, and a check for overlapping subtitles. A dotnet CLI application processes the files from the arguments and writes the result to a new file; errors go to `Console.Error`.

### Variant 4. UI translation dictionary {#v4}

**1. Initial level.** Write a console program that loads a `Dictionary<string, string>` of user interface strings in Ukrainian (key – translation) from a JSON file and, for the entered key, prints the translation or the key itself if there is no translation.

**2. Basic level.** Create a localization console program that loads language JSON files (`uk.json`, `en.json`) as “key – string” dictionaries, prints strings in the selected language with a default language for missing keys, and prints a report of the keys missing from each file.

**3. Advanced level.** Create a localization library that reads language JSON files with nested keys (`menu.file.open`) through `JsonNode`, substitutes parameters (`{name}`) into strings, and checks that each key has the same set of parameters in all languages. A dotnet CLI application checks the directory of language files given as an argument and prints the discrepancies; errors go to `Console.Error`.

### Variant 5. Contacts {#v5}

**1. Initial level.** Write a console program that saves a list of contacts (name, phone, email) entered by the user to a JSON file, reads it, and prints the contacts.

**2. Basic level.** Create a contacts console program (name, phone, email) with JSON storage that exports contacts to CSV with escaping of quotes, imports CSV, and merges the imported contacts with the existing ones without duplicates by phone number.

**3. Advanced level.** Create a contacts library (name, phones, email) with import of the vCard format (`.vcf`), export to JSON and CSV, merging by phone number, and a report of merge conflicts (different data for the same contact). A dotnet CLI application converts files from the arguments between formats; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 6. Reading tracker {#v6}

**1. Initial level.** Write a console program that saves the books read (title, author, pages, completion date) to a JSON file, reads it, and prints the number of pages read in the entered year.

**2. Basic level.** Create a reading tracker console program (book: title, author, pages, completion date) with a JSON file that prints statistics of books and pages by month and favorite authors and saves a monthly report to a text file named like `report-2026-09.txt`.

**3. Advanced level.** Create a reading tracker library (books with a title, author, pages, and completion date in JSON) with yearly goals (books or pages), a forecast of meeting the goal at the current pace, and export of a report to HTML. A dotnet CLI application executes commands from arguments; errors go to `Console.Error`.

### Variant 7. Photo archive {#v7}

**1. Initial level.** Write a console program that, for the entered directory, prints all `.jpg` and `.png` files including subdirectories (`Directory.EnumerateFiles`), their number, and their total size.

**2. Basic level.** Create a console program that finds photos (`.jpg`, `.png`) in a given directory including subdirectories, groups them by the year and month the file was modified (`FileInfo`), and prints groups of files with the same size as duplicate candidates.

**3. Advanced level.** Create a photo archive library that finds the photos (`.jpg`, `.png`) of a directory including subdirectories, detects duplicates by the SHA-256 hash of their contents (`SHA256.HashData` from a stream), builds a plan for organizing them into `year/month` directories by modification date, and writes the plan to JSON. A dotnet CLI application executes the plan only with the `--apply` option; errors go to `Console.Error`.

### Variant 8. BMP header {#v8}

**1. Initial level.** Write a console program that, using `BinaryReader`, reads the signature, file size, and image width and height from the header of a BMP file whose path is entered and prints them.

**2. Basic level.** Create a console program that reads the header of a BMP file through `BinaryReader`, checks the “BM” signature, and prints the file size, width, height, color depth, and compression, and prints a clear message for a file shorter than the header or a file of another format.

**3. Advanced level.** Create a library that writes a 24-bit BMP image from a two-dimensional array of colors (`BinaryWriter`, rows padded to 4 bytes) and reads it back. A dotnet CLI application generates a gradient of a given size; errors go to `Console.Error`.

### Variant 9. Cookbook {#v9}

**1. Initial level.** Write a console program that saves recipes (name, ingredients with a quantity and unit of measurement) to a JSON file, reads it, and prints the recipes that contain an ingredient entered by the user.

**2. Basic level.** Create a cookbook console program (recipe: name, servings, ingredients with quantities) with a JSON file that finds the recipes that can be cooked from the entered available products, scales a recipe to a given number of servings, and saves a shopping list to a text file.

**3. Advanced level.** Create a cookbook library (recipe: name, category, ingredients with a quantity and unit of measurement) with categories as enumerations (`JsonStringEnumConverter`), import of recipes from all JSON files of a directory, and validation of units of measurement against an allowed list. A dotnet CLI application performs a search with options (category, ingredient); errors go to `Console.Error`.

### Variant 10. File comparison {#v10}

**1. Initial level.** Write a console program that compares two text files line by line, with the paths entered, and prints the numbers of the lines that differ.

**2. Basic level.** Create a console program that compares two text files line by line and prints the differences with line numbers in the format “− line of the first file / + line of the second,” optionally ignores trailing spaces, and writes a report to a file.

**3. Advanced level.** Create a text file comparison library based on the longest common subsequence of lines that prints the inserted (`+`) and removed (`-`) lines and reads large files through `StreamReader`. A dotnet CLI application compares the files from the arguments; exit codes: 0 – identical, 1 – different, 2 – error.

### Variant 11. File encryption {#v11}

**1. Initial level.** Write a console program that encrypts a text file with the XOR operation using a one-byte key entered by the user, writes the result to a new file, and decrypts it back.

**2. Basic level.** Create a console program for XOR encryption of files with a string key that processes the file through `FileStream` in blocks of 4096 bytes, writes the result to a new file, and checks that the decrypted file matches the original.

**3. Advanced level.** Create a library for XOR encryption of files with a string key (streaming processing through `FileStream`) that adds a header with the format version and a SHA-256 checksum of the original data to the encrypted file and checks integrity during decryption. A dotnet CLI application executes `encrypt` and `decrypt`; errors go to `Console.Error`.

### Variant 12. Classroom inventory {#v12}

**1. Initial level.** Write a console program that saves a list of classroom equipment (inventory number, name, condition) to a JSON file, reads it, and prints it as a table.

**2. Basic level.** Create an inventory console program (equipment: inventory number, name, condition, room) with a JSON file that moves equipment between rooms, appends each move to a text log, and prints a report on the equipment in each room.

**3. Advanced level.** Create an equipment inventory library (inventory number, name, room) that reconstructs the current state from an event log of receipts, moves, and write-offs (JSON Lines: one JSON object per line) and compares it with the actual list from a CSV. A dotnet CLI application prints the discrepancies; errors go to `Console.Error`.

### Variant 13. Word frequency list of a text {#v13}

**1. Initial level.** Write a console program that reads a text file, counts the occurrences of each word in a `Dictionary<string, int>`, and writes each word with its number of occurrences to a CSV file.

**2. Basic level.** Create a word frequency console program that reads a large text file line by line (`File.ReadLines`) in UTF-8 or Windows-1251 encoding, ignores case and punctuation, sorts the words by descending frequency, and writes the result to CSV.

**3. Advanced level.** Create a frequency analysis library that processes all text files of a directory (ignoring case and punctuation) and writes to JSON the overall word frequency list and the list for each file. A dotnet CLI application takes the directory and the minimum frequency as arguments; errors go to `Console.Error`.

### Variant 14. Backup {#v14}

**1. Initial level.** Write a console program that copies all files of the entered directory to a backup directory, preserving the structure of subdirectories, and prints the number of files copied.

**2. Basic level.** Create a console program for backing up a directory, preserving the structure of subdirectories, that copies only new and changed files (by modification date and size) and writes each operation with its time and size to a log.

**3. Advanced level.** Create a library for incremental backup of a directory with a JSON manifest (path, size, hash), optional deletion from the backup of files that no longer exist in the source, and a mode for verifying the backup against the manifest. A dotnet CLI application performs the backup using the arguments; errors go to `Console.Error`.

### Variant 15. Meeting room booking {#v15}

**1. Initial level.** Write a console program that saves meeting room bookings (room, start, end, organizer) to a JSON file, reads it, and prints the bookings for the entered date.

**2. Basic level.** Create a meeting room booking console program (room, start, end, organizer) with a JSON file that rejects bookings with a time conflict, saves the file after each change through a temporary file, and prints the free slots of a room on a date.

**3. Advanced level.** Create a meeting room booking library (room, start, end, organizer) in JSON with recurring events (daily or weekly until a given date) and export to the iCalendar text format (`.ics`). A dotnet CLI application executes commands from arguments; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 16. Weather archive {#v16}

**1. Initial level.** Write a console program that reads a CSV file of daily measurements for a year (date, temperature, precipitation) and prints the average annual temperature.

**2. Basic level.** Create a console program that reads CSV files of daily measurements (date, temperature, precipitation), a separate file per year, calculates the average temperature of each month of each year, and writes the result to JSON.

**3. Advanced level.** Create a weather archive library based on CSV files of daily measurements (date, temperature, precipitation) that checks for missing and duplicate dates, fills gaps by linear interpolation, and exports the climate normal (monthly averages over all years) to JSON. A dotnet CLI application processes a directory of files; errors go to `Console.Error`.

### Variant 17. Quiz {#v17}

**1. Initial level.** Write a quiz console program that loads questions (text, answer options, number of the correct one) from a JSON file, asks them to the user, and prints the score.

**2. Basic level.** Create a quiz console program with questions from a JSON file that, after the game, saves the player’s result (name, score, date) to a separate JSON results file and prints a table of the ten best results.

**3. Advanced level.** Create a quiz library with several JSON topic files (question: text, options, correct answer), shuffling of questions with a fixed seed, and validation of the file structure (`[JsonRequired]`). A dotnet CLI application checks all files of a directory and prints the errors of each; errors go to `Console.Error`.

### Variant 18. Media library {#v18}

**1. Initial level.** Write a console program that saves a list of books (title, author, year) to a JSON file, reads it, and prints the books.

**2. Basic level.** Create a hierarchy of media library records with an abstract base record (title, year) and the derived records “book,” “audiobook,” and “film,” serialize a mixed list to JSON with `[JsonDerivedType]`, and read it back. The console program prints the records with their type.

**3. Advanced level.** Create a media library with a hierarchy of records (book, audiobook, film), polymorphic serialization to JSON (`[JsonDerivedType]`), search by type, and export of a report to CSV separately for each type. A dotnet CLI application imports and exports the media library; errors go to `Console.Error`.

### Variant 19. Splitting files {#v19}

**1. Initial level.** Write a console program that splits the file whose path is entered into parts of a given size in bytes (`part001`, `part002`…).

**2. Basic level.** Create a console program that splits a file into parts of a given size (`part001`, `part002`…) and reassembles it from the parts in the correct order through a buffered `FileStream`, checking that the size of the reassembled file matches the original.

**3. Advanced level.** Create a library for splitting a file into parts of a given size that writes a JSON manifest with the file size and the hashes of the parts, checks the integrity of the parts before reassembly, and reports which parts are missing. A dotnet CLI application executes `split` and `join`; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 20. Bulk renaming {#v20}

**1. Initial level.** Write a console program that renames all `.jpg` files of the entered directory according to the pattern `photo_001.jpg`, `photo_002.jpg`… in alphabetical order of names.

**2. Basic level.** Create a console program that renames the `.jpg` files of a directory according to the pattern `photo_001.jpg`…, shows a preview “old name → new name” without renaming, checks for name conflicts, and writes a renaming log to CSV.

**3. Advanced level.** Create a library for bulk renaming the files of a directory according to patterns (`{date}`, `{n:000}`, `{name}`) with a renaming log and undoing the last operation using the log. A dotnet CLI application executes `preview`, `apply`, and `undo`; errors go to `Console.Error`.

### Variant 21. Table storage {#v21}

**1. Initial level.** Write a console program that writes fixed-length product records (code, price, name of up to 30 characters) to a binary file through `BinaryWriter` and reads them through `BinaryReader`.

**2. Basic level.** Create a console program for storing products in a binary file with fixed-length records (code, price, name) that reads and updates a record by number through `FileStream.Seek` and deletes a record with a mark without moving other records.

**3. Advanced level.** Create a library for binary storage of products with fixed-length records (code, price, name, deletion mark), an index file (code → record number), reuse of deleted records, and file compaction. A dotnet CLI application executes CRUD commands from arguments; errors go to `Console.Error`.

### Variant 22. Habit tracker {#v22}

**1. Initial level.** Write a console program that saves habits and their completion marks by day (`DateOnly`) to a JSON file and prints a table of marks for the current week.

**2. Basic level.** Create a habit tracker console program (habit: name, completion dates) with a JSON file that calculates the current and longest streak of each habit, saves the data after each change, and handles a corrupted file.

**3. Advanced level.** Create a habit library (name, schedule: daily or on certain days of the week, completion dates) in JSON with a monthly calendar in a text file and migration of a file in an older format version. A dotnet CLI application executes commands from arguments; errors go to `Console.Error`.

### Variant 23. Bank statements {#v23}

**1. Initial level.** Write a console program that reads a CSV bank statement file (date, description, amount) and prints the total income and expenses.

**2. Basic level.** Create a console program that reads CSV statements from two banks with different separators, date formats, and a decimal comma, normalizes the transactions into a common record (date, description, amount), and saves them to JSON.

**3. Advanced level.** Create a library for importing CSV statements of different banks with automatic format detection by the header, normalization of transactions (date, description, amount), categorization by rules from a JSON file (keyword → category), and a report of totals by category. A dotnet CLI application processes a directory of statements; errors go to `Console.Error`.

### Variant 24. Spelling dictionary {#v24}

**1. Initial level.** Write a console program that loads a dictionary of words from a text file into a `HashSet<string>`, reads a text file, and prints the words that are not in the dictionary.

**2. Basic level.** Create a spell-checking console program with a dictionary from a text file in a `HashSet<string>` that, for unknown words of a text, suggests similar dictionary words (Levenshtein distance of at most 2) and saves the words added by the user to a separate file.

**3. Advanced level.** Create a library for spell-checking a text with several dictionaries from text files, suggestions by Levenshtein distance with a cache, and a JSON report with the positions of errors (line, column, word). A dotnet CLI application checks the file from the arguments; errors go to `Console.Error`.

### Variant 25. Medical visits {#v25}

**1. Initial level.** Write a console program that saves patient visits (patient, date, doctor, diagnosis) to a JSON file, reads it, and prints the visit history of the entered patient.

**2. Basic level.** Create a medical visits console program (patient, `DateOnly` date, doctor, specialty enumeration, diagnosis) with a JSON file that uses `JsonStringEnumConverter` and `[JsonPropertyName]` attributes and prints the visits for the selected specialty.

**3. Advanced level.** Create a medical records library with a separate JSON file per patient (visits: date, doctor, specialty, diagnosis), search across all files of a directory, and export of a doctor’s report for a period to a text file. A dotnet CLI application executes queries from arguments; errors go to `Console.Error`.

### Variant 26. Sports club {#v26}

**1. Initial level.** Write a console program that saves the memberships of sports club members (member, type, start and end dates) to a JSON file and prints the memberships that expire this month.

**2. Basic level.** Create a sports club console program with memberships in JSON (number, member, end date) that reads a visit log from CSV (date, membership number), counts the visits by membership, and writes a report to a text file.

**3. Advanced level.** Create a sports club library with different membership types (single visit, monthly, unlimited) and their polymorphic serialization to JSON, and with membership renewal and freezing. A dotnet CLI application generates a monthly report; errors go to `Console.Error`.

### Variant 27. HTML report {#v27}

**1. Initial level.** Write a console program that reads a JSON array of products (name, price) and writes an HTML file with a table of names and prices.

**2. Basic level.** Create a console program that reads a JSON array of products (name, price) and writes an HTML file with a table sorted by the column from the arguments, a totals row, and escaping of HTML special characters (`<`, `>`, `&`).

**3. Advanced level.** Create a report generation library with a simple HTML template in a file (<code v-pre>&#123;&#123;title}}</code>, <code v-pre>&#123;&#123;rows}}</code>) and any JSON array of objects (columns from `JsonNode`). A dotnet CLI application creates a report from a data file and a template; errors go to `Console.Error`.

### Variant 28. File integrity {#v28}

**1. Initial level.** Write a console program that calculates the SHA-256 hash of the file whose path is entered and prints it in hexadecimal.

**2. Basic level.** Create a console program that calculates the SHA-256 of all files of a directory, saves a manifest in JSON (relative path and hash), and verifies the directory against the manifest, printing changed, new, and deleted files.

**3. Advanced level.** Create a library for verifying the integrity of a directory with a JSON manifest (path, size, SHA-256), streaming hash calculation for large files, and exclusions by masks from an `.integrityignore` file. A dotnet CLI application executes `create` and `verify`; exit codes: 0 – intact, 1 – changes, 2 – error.

### Variant 29. Searching files by content {#v29}

**1. Initial level.** Write a console program that finds all `.txt` files in the entered directory that contain a given string and prints their names.

**2. Basic level.** Create a console program that searches for a given string in the `.txt` files of a directory, prints the file name, the line numbers, and the fragments with matches, optionally searches case-insensitively, and writes the results to a file.

**3. Advanced level.** Create a library for searching the contents of the files of a directory with file masks, regular expressions, skipping of binary files, and a JSON report (file, line, fragment). A dotnet CLI application takes a directory and a pattern; file access errors go to `Console.Error` without stopping the search.

### Variant 30. Game saves {#v30}

**1. Initial level.** Write a console program that saves the game state (level, health, position, inventory) to a JSON file, loads it, and prints it.

**2. Basic level.** Create a game save console program (level, health, position, inventory) with several slots in JSON files, a save date, a check for a corrupted file, and autosave through a temporary file.

**3. Advanced level.** Create a game save library (level, health, position, inventory) in JSON with a format version and migration of old versions (renaming properties through `JsonNode`). A dotnet CLI application migrates all saves of a directory; errors go to `Console.Error`.

## Procedure

1. Study the theory and worked examples.
2. Prepare test data files for your variant, including ones with format errors, and configure copying them to the output directory.
3. Create a solution and project; put the data models and the classes for reading and writing files in separate files.
4. Implement the task of the chosen difficulty level; create all streams in `using` and build paths with `Path` methods.
5. Test the program when the file is missing, with a corrupted file, and with a file opened in another program; inspect the JSON in the debugger visualizer.
6. Demonstrate the program to the instructor, explain the code, and answer the review questions.
