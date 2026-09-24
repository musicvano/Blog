---
title: "Tasks"
description: "Topic 5. Asynchrony with async/await: task variants"
outline: [2, 3]
sourceHash: "92d8262bfa26fc4935f83e8719c53396b03bac085337edd2ec338e46023e5391"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Duplicate file finder {#v1}

**1. Initial level.** Create a Windows Forms application that, when a button is clicked, asynchronously computes the SHA-256 hash of each file in a selected folder and shows groups of files with the same hash in a `ListBox`; during the work, the button is disabled, and the window does not "freeze".

**2. Basic level.** Create a Windows Forms application for finding duplicates in a folder with subfolders that first groups files by size and computes hashes only for files of the same size; a `ProgressBar` shows progress, the *Cancel* button cancels the search, and the status bar shows the number of groups and the amount of space that can be freed.

**3. Advanced level.** Create a "Duplicates" Windows Forms application that finds identical files in a selected folder by SHA-256 hash, computing hashes concurrently (no more than a given number of files, `SemaphoreSlim`), shows groups of duplicates in a `DataGridView`, lets you mark and delete extra copies with confirmation via `TaskDialog.ShowDialogAsync`, and saves a report to CSV; inaccessible files go to an error log.

### Variant 2. Prime number generator {#v2}

**1. Initial level.** Create a Windows Forms application that finds all prime numbers in the range from *a* to *b* (`NumericUpDown` fields) in `Task.Run` and displays their count and the last 20 numbers; a clock on the form keeps updating during the computation.

**2. Basic level.** Create a Windows Forms application that searches for prime numbers in a range up to 100,000,000 with progress in a `ProgressBar` (reported no more often than once per 1%), a *Cancel* button, an *a* ≤ *b* check, and display of the computation time.

**3. Advanced level.** Create a "Prime numbers" Windows Forms application that searches for prime numbers in a given range from *a* to *b*: it splits the range into parts and processes them in parallel in several tasks (`Task.WhenAll`), compares the time of the sequential and parallel variants in a table, and asynchronously saves the numbers found to a text file via `SaveFileDialog`.

### Variant 3. Book text analysis {#v3}

**1. Initial level.** Create a Windows Forms application that asynchronously reads a selected text file (`File.ReadAllTextAsync`) and shows the number of characters, words, and lines.

**2. Basic level.** Create a Windows Forms application that builds a frequency dictionary of a selected file (words case-insensitively, without punctuation) in a background task and shows the 20 most frequent words in a `DataGridView`; an empty file and read errors are reported in a `MessageBox`.

**3. Advanced level.** Create a "Book analysis" Windows Forms application that builds word frequency dictionaries for several selected text files, processing them concurrently, adds the results (file, number of words, most frequent words) to a table in the order of completion (`Task.WhenEach`), shows a combined dictionary of all books, lets you cancel the analysis, and exports the dictionary to CSV.

### Variant 4. Simulated episode downloads {#v4}

**1. Initial level.** Create a Windows Forms application that simulates downloading five episodes (each a `Task.Delay` of random duration from 1 to 4 s) sequentially and shows the completion time of each in a list.

**2. Basic level.** Create a Windows Forms application that starts a simulated download of five episodes (each a `Task.Delay` of random duration of 1–4 s) concurrently (`Task.WhenAll`), shows a separate `ProgressBar` for each episode and the total time, and the *Cancel* button cancels all downloads with one token.

**3. Advanced level.** Create an "Episode downloader" Windows Forms application that simulates downloading episodes (`Task.Delay` of random duration) with a limit on the number of concurrent downloads, a timeout per episode, random failures (20%), and automatic retry of failed ones up to three times; a table shows the status, attempts, and time of each episode, and the log is saved to a file.

### Variant 5. Sorting large arrays {#v5}

**1. Initial level.** Create a Windows Forms application that generates an array of a given number of random numbers (up to 10,000,000) and sorts it in `Task.Run`, showing the sorting time.

**2. Basic level.** Create a Windows Forms application that generates an array of random numbers of a given size and, in the background, sequentially compares insertion sort, quicksort, and `Array.Sort` on identical copies of the array, fills in a table of times as they complete, and lets you cancel the comparison.

**3. Advanced level.** Create a "Sorting comparison" Windows Forms application that measures in the background the time of insertion sort, quicksort, and `Array.Sort` on arrays of random numbers of several sizes, draws a graph of time versus size (GDI+), updates it after each measurement, supports cancellation, and saves the results to CSV.

### Variant 6. Folder backup {#v6}

**1. Initial level.** Create a Windows Forms application that asynchronously copies all files of a selected folder to another folder (`Stream.CopyToAsync`) and shows the number of files copied.

**2. Basic level.** Create a Windows Forms application for copying a folder with subfolders with progress in bytes (a `ProgressBar` and a "copied / total MB" label), a *Cancel* button after which a partially copied file is deleted, and a free-space check.

**3. Advanced level.** Create a "Backup" Windows Forms application that asynchronously copies only new and changed files (by size and date) from a selected folder to a backup folder, processes several files concurrently, shows the current speed and remaining time, keeps a log of skipped and failed files, and remembers the last folders in a JSON file.

### Variant 7. Computing π {#v7}

**1. Initial level.** Create a Windows Forms application that estimates π with the Monte Carlo method for a given number of random points in `Task.Run` and shows the estimate and the error.

**2. Basic level.** Create a Windows Forms application in which the Monte Carlo computation of π continues until *Stop* is clicked, and a label with the current estimate and number of points is updated every 100 ms through `IProgress<T>`.

**3. Advanced level.** Create a "Number π" Windows Forms application that estimates π with the Monte Carlo method in several tasks concurrently, draws points inside and outside a quarter circle (GDI+), plots the convergence of the estimate, supports pause and resume, and saves the final statistics to a file.

### Variant 8. Log search {#v8}

**1. Initial level.** Create a Windows Forms application that asynchronously reads the lines of a selected log file (`StreamReader.ReadLineAsync`) and shows the lines containing an entered word in a `ListBox`.

**2. Basic level.** Create a Windows Forms application for searching a selected log file by a regular expression that returns found lines through `IAsyncEnumerable<T>` and adds them to the list immediately, shows progress by file size, validates the regular expression before searching, and cancels the search with a button.

**3. Advanced level.** Create a "Log analyzer" Windows Forms application that searches all `*.log` files of a selected folder (lines `yyyy-mm-dd hh:mm:ss [LEVEL] text`) concurrently, filters lines by level (INFO, WARN, ERROR) and time range, shows the results in a `DataGridView` with the line number and file name, and exports the results to a text file.

### Variant 9. CSV-to-JSON converter {#v9}

**1. Initial level.** Create a Windows Forms application that asynchronously reads a selected CSV file with a header and writes it to a JSON file as an array of objects.

**2. Basic level.** Create a Windows Forms application that converts all CSV files in a folder to JSON one by one with progress by the number of files, skips lines with the wrong number of fields, and shows an error log with line numbers.

**3. Advanced level.** Create a "CSV → JSON" Windows Forms application that converts CSV files with a header from a selected folder into JSON files (arrays of objects), processes the files in parallel with a limit on their number, lets you choose the delimiter and encoding, determines value types (number, date, string), cancels batch processing, and shows a summary table of files.

### Variant 10. Conway's Game of Life {#v10}

**1. Initial level.** Create a Windows Forms application that computes a given number of generations of the Game of Life on a 200 × 200 board with random filling in `Task.Run` and draws the last generation.

**2. Basic level.** Create a Windows Forms application in which generations of the Game of Life are computed in the background and shown in a loop with `PeriodicTimer`, the *Start*, *Pause*, and *Step* buttons control the simulation, and a mouse click changes a cell's state while paused.

**3. Advanced level.** Create a "Life" Windows Forms application that supports a board of up to 2000 × 2000 with parallel computation of generations, zooming with the mouse wheel, adjustable speed, loading and saving patterns in a text format, and display of the number of live cells on a chart.

### Variant 11. File encryption {#v11}

**1. Initial level.** Create a Windows Forms application that asynchronously encrypts a selected file with the AES algorithm using a key derived from a password (`Rfc2898DeriveBytes.Pbkdf2`) and writes the result to a file with the `.enc` extension.

**2. Basic level.** Create a Windows Forms application for encrypting and decrypting files with AES with progress in bytes, a *Cancel* button (the unfinished output file is deleted), and password verification: a wrong password during decryption is reported, and a corrupted file is not saved.

**3. Advanced level.** Create a "Vault" Windows Forms application that encrypts several files concurrently with the AES algorithm using a key derived from a password, stores the salt, initialization vector, and a verification hash in the file, checks integrity after decryption, shows a table of file statuses, and requires a password of at least 8 characters with confirmation.

### Variant 12. Weather station statistics {#v12}

**1. Initial level.** Create a Windows Forms application that asynchronously reads a CSV file of measurements from one weather station (date, temperature) and shows the minimum, maximum, and average.

**2. Basic level.** Create a Windows Forms application that asynchronously processes CSV measurement files from several weather stations (date, temperature) concurrently and adds a station row with the minimum, maximum, and average to a table in the order of completion (`Task.WhenEach`); invalid lines are skipped and counted, and an error in one file does not stop the others.

**3. Advanced level.** Create a "Weather stations" Windows Forms application that asynchronously reads CSV measurement files from several stations (date, temperature) and shows monthly statistics for each station, a chart of average temperatures (GDI+), a filter by year, supports canceling the processing, and exports the summary table to a JSON file.

### Variant 13. Sales report generation {#v13}

**1. Initial level.** Create a Windows Forms application that simulates generating a report for one branch (`Task.Delay` 3 s) and writes the report to a text file without blocking the interface.

**2. Basic level.** Create a Windows Forms application that simulates generating sales reports for ten branches (`Task.Delay` 1–3 s, writing the report to a text file) concurrently, but no more than three at a time (`SemaphoreSlim`), shows the status of each branch in a list ("waiting", "generating", "done"), and the total time.

**3. Advanced level.** Create a "Reports" Windows Forms application that reads branch sales from CSV files (product, quantity, price), calculates totals by product, asynchronously generates branch reports into text files with limited parallelism, lets you cancel generation, regenerates only the failed reports, and opens a finished report in a modeless form with `ShowAsync`.

### Variant 14. Sudoku solver {#v14}

**1. Initial level.** Create a Windows Forms application in which a 9 × 9 sudoku is entered in a `DataGridView`, and the backtracking solution is performed in `Task.Run` and shown in the table.

**2. Basic level.** Create a Windows Forms application in which a 9 × 9 sudoku puzzle is entered in a `DataGridView`; the application checks that the puzzle is valid, solves it with backtracking in the background with a *Cancel* button, and shows the solution, the solving time, and the number of variants tried; an unsolvable puzzle is reported.

**3. Advanced level.** Create a "Sudoku" Windows Forms application that opens puzzles from a text file (a line of 81 digits, 0 is an empty cell), solves all puzzles in the file concurrently with a limit on the number of tasks, shows a table of solving times, generates new puzzles of a given difficulty in the background, and saves the solutions.

### Variant 15. Counting lines of code {#v15}

**1. Initial level.** Create a Windows Forms application that asynchronously counts the number of lines in all `*.cs` files of a selected folder with subfolders and shows the total.

**2. Basic level.** Create a Windows Forms application that asynchronously counts lines of code, blank lines, and comments for the files of a selected project folder with subfolders, groups the results by extension in a `DataGridView` with a totals row, and skips the `bin` and `obj` folders; progress is shown by the number of files.

**3. Advanced level.** Create a "Code statistics" Windows Forms application that counts lines of code, blank lines, and comments in the files of a selected folder, processes files concurrently, adds results gradually through `IAsyncEnumerable<T>`, shows the 10 largest files, supports cancellation, saves a report to CSV, and has an option to exclude folders by pattern.

### Variant 16. Image thumbnails {#v16}

**1. Initial level.** Create a Windows Forms application that asynchronously loads the images of a selected folder and shows their 100 × 100 thumbnails in a `FlowLayoutPanel`.

**2. Basic level.** Create a Windows Forms application that creates 100 × 100 thumbnails of the images of a selected folder in the background and adds them to a `FlowLayoutPanel` one at a time, as soon as each thumbnail is ready; corrupted files are marked with a label, and the *Cancel* button stops loading.

**3. Advanced level.** Create a "Photo viewer" Windows Forms application that creates thumbnails of the images of a selected folder with several tasks concurrently, caches them in the application folder, opens the full image on a double-click in a modeless form, and cancels loading of the previous folder when a new one is selected.

### Variant 17. Bank queue simulation {#v17}

**1. Initial level.** Create a Windows Forms application that simulates customers arriving at a bank every 1–3 s and service by one teller taking 2–4 s (`Task.Delay`), and shows the queue length.

**2. Basic level.** Create a Windows Forms application that asynchronously simulates a bank queue: customers arrive every 1–3 s and are served by a given number of tellers in 2–4 s (`Task.Delay`); the state (queue length, busy tellers) is updated in a loop with `PeriodicTimer`, and after stopping, the average and maximum waiting times are shown.

**3. Advanced level.** Create a "Bank" Windows Forms application that simulates a customer queue (arrivals and service of random duration) and several tellers as separate tasks with a shared queue, lets you change the simulation speed, draws a chart of the queue length, and saves an event log to a file.

### Variant 18. Archiver {#v18}

**1. Initial level.** Create a Windows Forms application that asynchronously compresses a selected file into GZip format (`GZipStream`, `CopyToAsync`) and shows the size before and after compression.

**2. Basic level.** Create a Windows Forms application for compressing and decompressing GZip files with progress in bytes and a *Cancel* button after which the unfinished archive is deleted; the compression percentage is shown in the status bar.

**3. Advanced level.** Create an "Archiver" Windows Forms application that asynchronously compresses several selected files into GZip format concurrently into separate archives with a limit on the number of tasks, compares compression levels by time and size in a table, and verifies the archives by decompressing them into memory.

### Variant 19. Spell checker {#v19}

**1. Initial level.** Create a Windows Forms application that asynchronously loads a dictionary (a text file, one word per line) and shows the words of the entered text that are not in the dictionary.

**2. Basic level.** Create a Windows Forms application that asynchronously loads a dictionary (a text file, one word per line), checks the spelling of a selected document in the background, shows unknown words with the number of occurrences and line numbers, and lets you add a word to a user dictionary saved to a file.

**3. Advanced level.** Create a "Spelling" Windows Forms application that checks several text documents concurrently against a dictionary from a file (one word per line), suggests up to three closest dictionary words for unknown words (Levenshtein distance, computed in `Task.Run`), supports cancellation, and exports a report.

### Variant 20. Chef's timer {#v20}

**1. Initial level.** Create a Windows Forms application that starts an asynchronous cooking timer for a given number of minutes and seconds and shows a `MessageBox` when it finishes.

**2. Basic level.** Create a Windows Forms application with several independent dish timers (name, time), each of which runs in a separate asynchronous method with `PeriodicTimer`, shows the remaining time, and has its own *Cancel* button.

**3. Advanced level.** Create a "Kitchen" Windows Forms application in which a recipe with steps and durations is loaded from JSON, step timers are started sequentially or in parallel according to the recipe, pause is supported, and notifications are shown through `TaskDialog.ShowDialogAsync`.

### Variant 21. BigInteger factorials {#v21}

**1. Initial level.** Create a Windows Forms application that computes *n*! for *n* up to 50,000 with the `BigInteger` type in `Task.Run` and shows the number of digits in the result and the computation time.

**2. Basic level.** Create a Windows Forms application that computes *n*! in the background for an entered *n* with the `BigInteger` type, with progress by the number of multiplications performed, a *Cancel* button, and asynchronous saving of the full number to a text file.

**3. Advanced level.** Create a "Big numbers" Windows Forms application that computes *n*! for an entered *n* with the `BigInteger` type sequentially and in parallel (multiplying parts of the range in separate tasks), compares the times, computes the sum of the digits of the result, and saves a report; an invalid *n* is marked with `ErrorProvider`.

### Variant 22. Integral of a function {#v22}

**1. Initial level.** Create a Windows Forms application that computes the definite integral of sin(*x*) on the interval [*a*; *b*] using the rectangle method with millions of subintervals in `Task.Run`.

**2. Basic level.** Create a Windows Forms application that computes the definite integral of a selected function (sin *x*, $x^{2}$, exp *x*) on the interval [*a*; *b*] using the rectangle, trapezoidal, and Simpson's methods concurrently (`Task.WhenAll`) and shows in a table the values, times, and errors relative to the exact value.

**3. Advanced level.** Create an "Integrals" Windows Forms application that computes the definite integral of a selected function on the interval [*a*; *b*] using the rectangle, trapezoidal, and Simpson's methods in the background, doubles the number of subintervals until a given accuracy or a timeout is reached, shows the progress of each method, draws a graph of the function and the area under it, and saves the results to CSV.

### Variant 23. Merging sorted files {#v23}

**1. Initial level.** Create a Windows Forms application that asynchronously merges two text files with sorted numbers into one sorted file.

**2. Basic level.** Create a Windows Forms application that asynchronously merges any number of text files with sorted numbers into one sorted file with progress by lines read, checks that the input data is ordered, and cancels merging with a button.

**3. Advanced level.** Create an "External sort" Windows Forms application that splits a large file of numbers into parts, sorts the parts in parallel into separate files, merges them, shows the stages and the progress of each stage, and deletes the temporary files after completion or cancellation.

### Variant 24. Folder monitoring {#v24}

**1. Initial level.** Create a Windows Forms application that uses `FileSystemWatcher` to show the names of new files in a selected folder in a list and asynchronously calculates their size.

**2. Basic level.** Create a Windows Forms application that watches a selected folder (`FileSystemWatcher`) and asynchronously processes new text files (counting lines), waits until a file is no longer being written by retrying to open it with `Task.Delay`, and shows the results in a table.

**3. Advanced level.** Create an "Inbox folder" Windows Forms application that watches a selected folder (`FileSystemWatcher`), queues new files, asynchronously processes them (counting lines) with no more than a given number at a time, moves processed files to a `done` folder and failed ones to `failed`, keeps a log, and stops processing correctly when the form is closed.

### Variant 25. Test data generator {#v25}

**1. Initial level.** Create a Windows Forms application that asynchronously generates a CSV file with a given number of records (name, age, city) and shows the generation time.

**2. Basic level.** Create a Windows Forms application for asynchronously generating a million random records (name, age, city) into a CSV file in batches of 10,000 with progress, a *Cancel* button, and parameter validation (number of records, age range).

**3. Advanced level.** Create a "Test data" Windows Forms application that generates data in CSV or JSON according to a field schema defined in a table (type, range, list of values), writes several files concurrently, and verifies the generated files by reading them again asynchronously.

### Variant 26. Chess problems {#v26}

**1. Initial level.** Create a Windows Forms application that, in `Task.Run`, counts the number of ways to place *n* queens on an *n* × *n* board (*n* from 4 to 14) and shows the computation time.

**2. Basic level.** Create a Windows Forms application that searches for a knight's tour visiting all squares of an *n* × *n* board (*n* from 5 to 8) in a background task with a *Cancel* button and a timeout, and draws the tour found.

**3. Advanced level.** Create a "Queens" Windows Forms application that searches for placements of *n* queens on an *n* × *n* board, distributing the search by the first row among several tasks, shows the progress of each task, draws several placements found, supports cancellation, and saves the solutions to a file.

### Variant 27. Route finding {#v27}

**1. Initial level.** Create a Windows Forms application that generates a random graph with a given number of vertices and finds the shortest path with Dijkstra's algorithm in `Task.Run`.

**2. Basic level.** Create a Windows Forms application that asynchronously loads a graph from a file (one edge per line: start, end, weight), validates the format, and finds the shortest path between selected vertices with a *Cancel* button for large graphs.

**3. Advanced level.** Create a "Routes" Windows Forms application that asynchronously loads a graph from a file (one edge per line: start, end, weight), searches for shortest paths from several start vertices concurrently, draws the graph and the route found (GDI+), compares the time of Dijkstra's algorithm and breadth-first search for an unweighted graph, and saves the routes to a file.

### Variant 28. Grade statistics {#v28}

**1. Initial level.** Create a Windows Forms application that asynchronously reads a CSV file of a group's grades (surname, subject, score) and shows the group's average score.

**2. Basic level.** Create a Windows Forms application that asynchronously processes CSV grade files of several groups (surname, subject, score) and returns the results through `IAsyncEnumerable<T>`, adding a group row with the average score to a table as soon as it has been processed; invalid scores (outside 0–100) are counted as errors.

**3. Advanced level.** Create an "Academic performance" Windows Forms application that asynchronously processes the CSV grade files of all groups (surname, subject, score) concurrently, builds a student ranking and a histogram of scores (GDI+), filters by subject, lets you cancel processing, and saves the ranking to a JSON file.

### Variant 29. Checking links in documents {#v29}

**1. Initial level.** Create a Windows Forms application that finds `https://…` addresses in a selected text file with a regular expression and simulates checking each one (`Task.Delay`, a random result), showing the status in a list.

**2. Basic level.** Create a Windows Forms application that finds `https://…` addresses in a selected text file and simulates checking them concurrently (`Task.Delay` of random duration, a random result) with a timeout per check (`WaitAsync`), shows the statuses "OK", "error", "timeout" in a table, and the total checking time.

**3. Advanced level.** Create a "Links" Windows Forms application that finds `https://…` addresses in several selected documents and simulates checking them (`Task.Delay`, a random result) with limited parallelism, uses the faster of two attempts for each address (`Task.WhenAny`), cancels the rest, and saves a report on unreachable links.

### Variant 30. Julia fractal {#v30}

**1. Initial level.** Create a Windows Forms application that draws the Julia set for a given parameter *c* in `Task.Run` into a `Bitmap` and shows it in a `PictureBox`.

**2. Basic level.** Create a Windows Forms application in which the Julia fractal is drawn in horizontal strips, each of which appears on the screen as soon as it is computed; changing *c* with sliders cancels drawing of the previous frame.

**3. Advanced level.** Create a "Julia" Windows Forms application that draws the Julia fractal for the parameter *c*, computing horizontal strips in parallel (`Parallel.ForEachAsync`), supports zooming with the mouse, animation of the parameter *c* without overlapping frames, and saving the image as PNG at a selected resolution.

## Procedure

1. Study the theory and worked examples.
2. Determine which operations in the task are I/O operations and which are computations; plan the form, the controls, and the button states during an operation.
3. Create a *Windows Forms App* (.NET 10) project in Visual Studio 2026; move long-running operations into separate classes with asynchronous methods that take `IProgress<T>` and `CancellationToken`.
4. Implement event handlers with `async`/`await`: disabling buttons, progress, cancellation, timeouts, exception handling; make sure that the code contains no `.Result`, `.Wait()`, or `async void` outside event handlers.
5. Build the project without warnings (in particular CS4014 and WFO2001) and check that during an operation the window can be dragged and is repainted, and that cancellation and invalid data are handled correctly; if necessary, examine the tasks in the *Tasks* and *Parallel Stacks* windows.
6. Demonstrate the application to your instructor, explain the code, and answer the review questions.
