---
title: "Tasks"
description: "Topic 2. Processes and threads: task variants"
outline: [2, 3]
sourceHash: "29171328ba210e1b084f130920759c2a51a2b1d32b4fb7df779c4e8d5ae07529"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Counting words in books {#v1}

**1. Initial level.** Create a console program that starts one `Thread` for each of three text strings (book excerpts defined in the program); each thread counts the words in its string and writes the result to its own array element. After calling `Join` on all threads, the program prints the word count for each excerpt and the total count.

**2. Basic level.** Create a console program that prompts for a directory path, finds all `*.txt` files in it, and counts the words in each file in a separate thread. If the directory does not exist or contains no files, the program reports this. The program prints a “file – word count – thread ID” table, the total word count, and the execution time, and verifies that the total matches a sequential count.

**3. Advanced level.** Create a console application that takes a directory of text files as an argument and supports `--threads N` (the number of logical processors by default), `--top K`, and `--help`. Distribute the files among N threads in groups of approximately equal total size. The program prints the K most frequent words (case-insensitive) and, for N = 1, 2, 4, …, `--threads`, measures the median of three runs and prints a “threads – time – speedup – efficiency” table. Verify each run against the sequential version. Write errors (missing directory, invalid number) to the error stream and exit with code 1.

### Variant 2. Finding perfect numbers {#v2}

**1. Initial level.** Create a console program that finds perfect numbers (numbers equal to the sum of their divisors smaller than the number) from 1 to 100 000, dividing the range into four equal parts, each checked by a separate thread. Print the numbers found in ascending order.

**2. Basic level.** Create a console program that prompts for an upper bound (an integer from 1 000 to 10 000 000) and a thread count (from 1 to 64), validating the input. Divide the range into equal parts; each thread collects perfect numbers in its own list. Print the numbers found, each thread's execution time, and the total time.

**3. Advanced level.** Create a console application that finds perfect numbers (numbers equal to the sum of their divisors smaller than the number) up to `--limit` in multiple threads and accepts `--threads`, `--split equal|balanced`, and `--help`. The `equal` mode divides the range into equal parts; `balanced` makes the parts with larger numbers shorter (boundaries based on the square root). For both modes and N = 1…`--threads`, print a table of time, speedup, and efficiency, and the times of the slowest and fastest threads. Report invalid options to the error stream and exit with code 2.

### Variant 3. Average weather station temperatures {#v3}

**1. Initial level.** Create a console program that calculates the average, minimum, and maximum temperature for each of five weather stations in a separate thread (arrays of 24 hourly temperatures are defined in the program) and prints a report after all threads finish.

**2. Basic level.** Create a console program that generates a year of hourly temperatures for a user-specified number of stations (from 1 to 500) using a fixed random seed, processes each group of stations in a separate thread (the thread count is entered by the user), and prints the stations with the highest and lowest average temperatures, the processing time, and whether the results match a sequential calculation.

**3. Advanced level.** Create a console application that reads a measurements CSV file (`station;date;hour; temperature`) specified as an argument and supports `--threads N`, `--out file`, and `--help`. Group rows by station and distribute the groups among threads; each thread calculates the average, minimum, maximum, and number of missing values. Skip invalid rows and count them. Write the result to a CSV file and print a table of time, speedup, and efficiency for 1…N threads (median of three runs); exit codes: 0 – success, 1 – file error, 2 – argument error.

### Variant 4. Integral worker processes {#v4}

**1. Initial level.** Create a console program that calculates the integral of sin x over [0; π] using the rectangle method with 10 000 000 steps, starting itself as a child process for each of the two halves of the interval (the bounds are passed as arguments), and prints the sum of the child processes' results.

**2. Basic level.** Create a console coordinator program that prompts for integration bounds, the number of steps, and the number of processes N (from 1 to 16), starts N worker processes (the same program with `--worker a b steps`), reads their standard output, checks their exit codes, and prints the integral, the error relative to the exact value for sin x, and the total time.

**3. Advanced level.** Create a console application that calculates the integral of one of the functions (`sin`, `exp`, `sqrt`, selected with `--f`) over `--from`/`--to` in `--mode processes|threads`, with `--n` and `--help` options. For N = 1…`--n`, print a table of process and thread execution times and explain the difference in terms of process startup overhead. If a worker exits with a nonzero code or prints an invalid number, the coordinator reports its PID and range to the error stream and exits with code 3.

### Variant 5. Part quality control {#v5}

**1. Initial level.** Create a console program that generates an array of 1 000 000 part dimensions (normal distribution, fixed seed) and uses four threads to count defective parts (deviation from the nominal 50 mm exceeds 0.2 mm). Print the defective part count for each thread and the total.

**2. Basic level.** Create a console program that prompts for the number of parts and threads, validates that both values are positive, counts defective parts in batches in parallel and sequentially, prints the percentage of defective parts, both execution times, and the speedup, and reports whether the results match.

**3. Advanced level.** Create a console application for Windows or Linux that generates `--count` part dimensions (normal distribution, fixed seed) and uses `--threads` threads to count defective parts (deviation from the nominal 50 mm exceeds 0.2 mm). The `--affinity mask` option (for example, `0x5`) sets process affinity (`Process.ProcessorAffinity`); print a timing table for the masks “all processors,” “one processor,” “two logical processors on one core,” and “two different cores.” For an unsupported OS or invalid mask, write a message to the error stream and exit with code 1; support `--help`.

### Variant 6. Armstrong numbers {#v6}

**1. Initial level.** Create a console program that finds all Armstrong numbers (numbers equal to the sum of their digits raised to the power of the number of digits) up to 10 000 000 by queuing ten jobs of one million numbers each to the thread pool (`ThreadPool.QueueUserWorkItem`), and prints the numbers found in ascending order.

**2. Basic level.** Create a console program that prompts for the upper bound and number of jobs, divides the range into thread pool jobs, each searching for Armstrong numbers (numbers equal to the sum of their digits raised to the power of the number of digits), waits for completion, and prints the numbers found in ascending order, the number of distinct pool threads that executed the jobs, and the time.

**3. Advanced level.** Create a console application with `--limit`, `--jobs`, `--mode threads|pool|both`, and `--help` options that compares finding Armstrong numbers using separate `Thread` instances (one thread per job) and the thread pool. Print a “job count (4, 16, 64, 256) – thread time – pool time – ratio” table and verify that the results match. Report invalid options to the error stream and exit with code 2.

### Variant 7. Image pixels in memory {#v7}

**1. Initial level.** Create a console program that creates a 4000×3000-pixel image in memory (a byte array of brightness values, fixed seed), calculates its average brightness in four threads using horizontal strips, and then prints the result and the average brightness of each strip.

**2. Basic level.** Create a console program that prompts for image width, height, and thread count, inverts pixel brightness in strips using threads, verifies the result against sequential inversion, and prints the sequential and parallel times and the speedup.

**3. Advanced level.** Create a console application that generates a `--width` × `--height` image in memory (a byte array of brightness values, fixed seed) and applies a `--filter invert|threshold|blur` filter in strips using 1, 2, 4, …, 2·ProcessorCount threads; for `blur`, account for neighboring rows at strip boundaries. Measure the median of five runs and print a table of time, speedup, and efficiency. Compare each run against the sequential result; on a mismatch, write a message to the error stream and exit with code 1; support `--help`.

### Variant 8. Checking password strength {#v8}

**1. Initial level.** Create a console program that checks the strength of 20 passwords defined in the program (at least 12 characters, uppercase and lowercase letters, digits, and special characters), queuing each check to the thread pool, and prints the results in password order, marked “strong” or “weak.”

**2. Basic level.** Create a console program that reads passwords from a text file (the path is entered by the user) and checks each password's strength (at least 12 characters, uppercase and lowercase letters, digits, and special characters) in a separate thread pool job, recording the pool thread's ID. Print the numbers of strong and weak passwords and “thread – passwords checked” statistics.

**3. Advanced level.** Create a console application that takes a password file and supports `--min-length`, `--report file`, and `--help`. Each thread pool job calculates a password strength score from 0 to 5 (one point each for length, uppercase letters, lowercase letters, digits, and special characters) and a reason for weakness. Write a report to a file (mask each password, retaining its first and last characters) and print a score histogram, `ThreadPool.ThreadCount`, the completed job count, and the time. For an empty or missing file, write a message to the error stream and exit with code 1.

### Variant 9. School grade statistics {#v9}

**1. Initial level.** Create a console program that uses separate threads to calculate the average grade and number of grades at each level (initial, intermediate, sufficient, advanced) for three classes (arrays of grades on a 12-point scale are defined in the program) and prints a report.

**2. Basic level.** Create a console program that generates grades for a specified number of classes and students, processes classes in threads that count processed grades with a `ThreadLocal<int>` counter, and prints the class averages, all threads' counter values (`Values`), and a check that their sum equals the number of grades.

**3. Advanced level.** Create a console application that reads a `class;student;subject;grade` CSV file (an argument) with `--threads`, `--subject`, and `--help` options. Threads process portions of the rows and accumulate intermediate statistics in `ThreadLocal` dictionaries, which are merged after the threads finish. Print a table of classes with their averages and levels, the best class in the subject, and the time for 1…N threads. Count invalid rows and report them to the error stream.

### Variant 10. Supermarket cashier simulation {#v10}

**1. Initial level.** Create a console program that simulates three cashiers as separate named threads: each serves 5 customers (service is a `Thread.Sleep` of a random duration from 50 to 200 ms, fixed seed) and prints the thread name and customer number. Wait for all cashiers and print the total time.

**2. Basic level.** Create a console program that prompts for cashier and customer counts, starts cashier threads with computational service (a loop of a specified length), assigns `ThreadPriority.Highest` to one cashier and `BelowNormal` to the others, and prints each cashier's service time; explain why the difference is small when cores are available.

**3. Advanced level.** Create a console application that simulates supermarket cashiers as threads with different priorities (customer service is a computational loop), supports `--cashiers`, `--customers`, `--affinity 1`, and `--help`, and compares service times with and without restricting the process to one logical processor. Print a “cashier – priority – unrestricted time – time on one processor” table and warn if the OS does not support affinity (exit code 1).

### Variant 11. The Collatz sequence {#v11}

**1. Initial level.** Create a console program that finds the number with the longest Collatz sequence from 1 to 1 000 000, dividing the range among four threads, and prints the number and sequence length.

**2. Basic level.** Create a console program that prompts for the upper bound and thread count, finds the number with the longest Collatz sequence in parallel and sequentially, verifies that the results match, and prints both times, the speedup, and the efficiency.

**3. Advanced level.** Create a console application that finds the number with the longest Collatz sequence up to `--limit` using N threads and measures the median of three runs for N = 1…`--max-threads` (up to 16). Print a table of time, speedup, and efficiency, the thread count with the shortest time, and the count at which efficiency drops below 0.5; save the table to a CSV file (`--csv`); support `--help`.

### Variant 12. Backup timer {#v12}

**1. Initial level.** Create a console program that uses `System.Threading.Timer` to print “backup N” with the time and pool thread ID every 500 ms, runs for 3 seconds, then stops the timer and prints the number of timer invocations.

**2. Basic level.** Create a console program that prompts for a file path, timer period in milliseconds, and duration in seconds, validates the input, and then uses `System.Threading.Timer` to copy the file to the `backup` directory with a timestamp in its name and write a log entry on every invocation. At the end, stop the timer using `Dispose` and print the log.

**3. Advanced level.** Create a console application with `--source`, `--target`, `--period`, `--keep N`, and `--help` options that periodically copies a file using a timer, keeps only the N latest copies, does not start another copy while the previous one is in progress (a busy flag), and stops gracefully when **Enter** is pressed. Print a log of invocations with copy durations and the number of skipped invocations. Record copy errors in the log and error stream without crashing.

### Variant 13. Sorting files in parts {#v13}

**1. Initial level.** Create a console program that generates an array of 1 000 000 integers (fixed seed), divides it into two parts, sorts each part in a separate thread, merges the sorted parts in the main thread, and verifies that the result is sorted.

**2. Basic level.** Create a console program that prompts for the array size and thread count (a power of two), generates an array of random integers (fixed seed), sorts its parts in separate threads, merges them pairwise, and verifies the ordering. Print the time spent sorting parts, merging time, total time, and the time for `Array.Sort` on the entire array.

**3. Advanced level.** Create a console application that sorts a text file of numbers (one per line) with `--input`, `--output`, `--threads`, and `--help` options. Threads sort blocks; the main thread performs a k-way merge, and the result is written to a file. Print a table of stage times (reading, sorting, merging, writing) for 1…N threads and the parallel fraction. Invalid file lines produce a message with the line number and exit code 1.

### Variant 14. Process monitoring {#v14}

**1. Initial level.** Create a console program that retrieves the process list with `Process.GetProcesses()` and prints the 10 processes with the most threads: name, PID, and thread count.

**2. Basic level.** Create a console program that prompts for a sort criterion (`threads`, `memory`) and row count, prints a process table (name, PID, threads, working set in MB), and skips inaccessible processes while counting them.

**3. Advanced level.** Create a console application with `--interval`, `--count`, `--top`, `--name`, and `--help` options that takes process snapshots at a specified interval, calculates each process's CPU usage between snapshots (`TotalProcessorTime`) and the change in thread count, displays an updating table of the most active processes, and writes all snapshots to a CSV file. Handle processes that exit between snapshots by skipping them.

### Variant 15. Caesar cipher for text {#v15}

**1. Initial level.** Create a console program that encrypts text (defined in the program, at least 1 000 characters) using a Caesar cipher with a shift of 3 for the Ukrainian alphabet, divides the text into four parts for four threads, combines the result, and verifies that decryption yields the original text.

**2. Basic level.** Create a console program that prompts for a text file path, shift, and thread count, encrypts the text in parts using threads and a Caesar cipher for the Ukrainian alphabet, writes the result to a file with the `.enc` suffix, and prints the parallel and sequential encryption times and the speedup.

**3. Advanced level.** Create a console application that encrypts or decrypts a text file using a Caesar cipher in multiple threads, with `--encrypt|--decrypt`, `--shift`, `--input`, `--output`, `--threads`, and `--help` options, and supports uppercase and lowercase letters in the Ukrainian and English alphabets. For large files, print a timing table for 1…N threads and verify that encryption followed by decryption restores the original text. A missing file or invalid shift produces a message in the error stream and exit code 1 or 2.

### Variant 16. Number factorization {#v16}

**1. Initial level.** Create a console program that factors 20 large `long` numbers (defined in the program) into primes, queuing each number as a separate thread pool job, and prints the factorizations in the original number order.

**2. Basic level.** Create a console program that reads numbers from a file (the path is entered by the user), queues each number's factorization to the thread pool, measures each job's time using `Stopwatch`, and prints a “number – factorization – time – thread ID” table and the total time.

**3. Advanced level.** Create a console application with `--input`, `--min-threads`, and `--help` options that factors numbers using thread pool jobs, measures each job's delay from queuing to starting and its execution time, and prints the average and maximum delay, `ThreadPool.ThreadCount`, and `CompletedWorkItemCount`. Print a table comparing runs with the default minimum thread count and the `--min-threads` value. Skip invalid numbers and report them to the error stream.

### Variant 17. Core affinity {#v17}

**1. Initial level.** Create a console program that prints its own process affinity mask in binary and the number of allowed logical processors, then restricts the process to logical processor 0 and prints the new mask.

**2. Basic level.** Create a console program that prompts for an affinity mask in hexadecimal, checks that it is nonzero and does not exceed `ProcessorCount`, sets it, performs a calculation in `ProcessorCount` threads, and prints the calculation time with and without the mask.

**3. Advanced level.** Create a console application with `--threads`, `--work`, and `--help` options that measures the same calculation using masks for one logical processor, two logical processors on one physical core, two different physical cores, half the processors, and all processors. Print a “mask – processor count – time – speedup relative to one processor” table and a conclusion about whether SMT provides additional speedup. On an OS without affinity support, exit with code 1.

### Variant 18. Shopping mall parking {#v18}

**1. Initial level.** Create a console program in which three background sensor threads print the available space count on their floors every 200 ms (random changes, fixed seed), while the main thread exits after 2 seconds; show that background threads do not keep the process alive.

**2. Basic level.** Create a console program in which floor sensor threads update the available space counts in their own array elements until a `volatile bool` emergency stop flag is set; the main thread prints the parking status once per second and, after **Enter** is pressed, sets the flag, waits for all threads to finish, and prints a summary.

**3. Advanced level.** Create a console application with `--floors`, `--places`, `--duration`, and `--help` options in which sensor threads simulate cars entering and leaving, a background display thread prints floor occupancy, and a `stop` command or the end of `--duration` seconds triggers a cooperative stop with a `Join` timeout. Report threads that did not stop in time to the error stream; return code 0 or 1 and print arrival and departure statistics for each floor.

### Variant 19. City distance matrix {#v19}

**1. Initial level.** Create a console program that generates coordinates for 2 000 cities (fixed seed) and calculates a matrix of Euclidean distances, distributing matrix rows among four threads; print the distance between the first and last cities and the sum of all distances.

**2. Basic level.** Create a console program that prompts for city and thread counts, generates city coordinates (fixed seed), calculates the Euclidean distance matrix both by distributing rows among threads and sequentially, verifies that the matrices match, and prints both times and the speedup.

**3. Advanced level.** Create a console application that reads cities from a `name;latitude;longitude` CSV file with `--threads`, `--nearest K`, and `--help` options, calculates the distance matrix using the haversine formula in threads assigned rows, and prints each city's K nearest neighbors. Print a table of time, speedup, and efficiency for 1…N threads (median of three runs). Invalid coordinates produce a message with the line number.

### Variant 20. Palindromes in a dictionary {#v20}

**1. Initial level.** Create a console program that counts palindromes in an array of words (at least 30, defined in the program) using four threads, each checking its own part of the array, and prints the palindromes found.

**2. Basic level.** Create a console program that reads a dictionary from a file (one word per line), groups words by their first letter, starts one thread for each group, and prints each group's palindrome count, the total count, and the time.

**3. Advanced level.** Create a console application that counts palindromes in a dictionary (`--dictionary` file, one word per line) using multiple threads with `--split letters|equal`, `--threads`, and `--help` options, and compares dividing the dictionary by first letter (groups of different sizes) with dividing it into equal parts. For both divisions, print the palindrome count, time, largest and smallest part sizes, speedup, and a conclusion about which division is more efficient. An empty dictionary results in exit code 1.

### Variant 21. File checksums {#v21}

**1. Initial level.** Create a console program that calculates SHA-256 checksums for all files in a directory specified in the program, using a separate thread per file, and prints each filename and checksum in hexadecimal.

**2. Basic level.** Create a console program that prompts for a directory, calculates file SHA-256 checksums sequentially and in N threads (N is entered by the user), prints a checksum table, verifies that they match, and prints both execution times.

**3. Advanced level.** Create a console application that calculates SHA-256 checksums for files in `--dir`, with `--mode threads|processes`, `--n`, and `--help` options. In `processes` mode, the coordinator starts itself as a child process for each group of files (`--worker file…`) and collects checksums from standard output. Write the checksums to `SHA256SUMS`, print a table comparing thread and process times, and report files that could not be read (exit code 1).

### Variant 22. Signal spline interpolation {#v22}

**1. Initial level.** Create a console program that, for a signal containing 1 000 samples of sin(x), calculates linear interpolation values at 10 points between each pair of samples, dividing the segments between two threads, and prints the maximum error relative to sin(x).

**2. Basic level.** Create a console program that prompts for sample and thread counts, performs Catmull–Rom cubic spline interpolation in segments using threads, compares the result against the sequential version (maximum difference less than 1e-12), and prints the time.

**3. Advanced level.** Create a console application that reads a signal (samples) from a CSV file and performs Catmull–Rom cubic spline interpolation in segments using threads, accounting for neighboring samples at part boundaries. Options: `--factor` (new points per interval), `--threads`, `--output`, `--help`. Write the result to a file and print a table of time, speedup, and efficiency for 1…N threads, checking against the sequential version.

### Variant 23. Video surveillance (simulated frames) {#v23}

**1. Initial level.** Create a console program in which four worker threads each simulate processing 20 frames (`Thread.Sleep(10)`), with one thread throwing an exception on frame 7; the worker catches the exception and saves its message, and the main thread prints a report for each camera after `Join`.

**2. Basic level.** Create a console program that prompts for camera and frame counts, starts one thread per camera, generates “corrupted frame” errors with a 2% probability (fixed seed), counts processed and corrupted frames without crashing the thread, and prints a camera table and each thread's first exception.

**3. Advanced level.** Create a console application that simulates processing `--frames` frames from `--cameras` cameras (one thread per camera; a corrupted frame with probability `--error-rate` throws an exception), with `--fail-fast` and `--help` options. Threads record exceptions in a results array; in `--fail-fast` mode, the first exception sets a stop flag for all threads. The `--crash` mode demonstrates that an unhandled exception terminates the process (logging through `AppDomain.UnhandledException`). Print a final camera table and exit with code 1 if any errors occurred.

### Variant 24. Game level loading progress {#v24}

**1. Initial level.** Create a console program in which three threads “load” game levels (a loop of 100 steps of 20 ms each) and write their progress percentages to their own array elements, while the main thread prints all levels' progress every 200 ms until all threads finish.

**2. Basic level.** Create a console program that prompts for the number of levels and their sizes in arbitrary units, starts loading threads, and displays text progress bars (`[#####-----] 50 %`) for each level and the overall progress on a single line.

**3. Advanced level.** Create a console application with `--levels file`, `--threads`, `--refresh`, and `--help` options in which levels from the file are distributed among a limited number of threads, the main thread updates a progress table in place (`Console.SetCursorPosition`) and shows the estimated time remaining, and **Esc** cooperatively cancels loading. After completion, print each level's time and thread ID.

### Variant 25. Recruit height histogram {#v25}

**1. Initial level.** Create a console program that generates 1 000 000 height values (normal distribution with a mean of 176 cm, fixed seed) and builds a histogram with 5 cm bins in four threads, each counting its part into a local array; then merge and print the local histograms.

**2. Basic level.** Create a console program that prompts for the number of values, bin width, and thread count, generates heights (normal distribution with a mean of 176 cm, fixed seed), builds a histogram using thread-local arrays, verifies that it matches the sequential result, and prints a text histogram using asterisks and the time.

**3. Advanced level.** Create a console application with `--input` (a file of values), `--bin`, `--threads`, and `--help` options that builds a histogram, calculates the mean, median, and standard deviation, rejects and counts values outside 100…250 cm, and prints a table of time, speedup, and efficiency for 1…N threads. Save the histogram to a CSV file.

### Variant 26. Bank deposit interest {#v26}

**1. Initial level.** Create a console program that uses separate threads to calculate one year's interest at an annual rate of 12% with monthly compounding for three bank branches (arrays of deposit amounts are defined in the program) and prints each branch's total interest.

**2. Basic level.** Create a console program that generates deposits for a specified number of branches (amount, rate, term in months), calculates branch interest in threads, prints a report in currency format and the total, and prints the time and speedup compared with a sequential calculation (`decimal` values must match exactly).

**3. Advanced level.** Create a console application that reads a `branch;account;amount; rate;months` CSV file of deposits, with `--threads`, `--report`, and `--help` options, groups deposits by branch, calculates interest in threads, and writes a branch report to a file. Print a timing table for 1…N threads and verify exact agreement of `decimal` amounts with the sequential version. Reject rows with negative amounts and report them.

### Variant 27. A minimal thread pool {#v27}

**1. Initial level.** Create a console program with a `SimplePool` class that creates two worker threads that take jobs (`Action`) by index from a prefilled array; run 10 jobs, printing the job number and thread name.

**2. Basic level.** Create a console program with a `SimplePool` class that has N named background worker threads, a `BlockingCollection<Action>` queue (used as a ready-made tool), and `Enqueue` and `Shutdown` methods (`Shutdown` waits for jobs to finish). Run 100 jobs and print the number completed by each thread.

**3. Advanced level.** Create a console application with a custom thread pool and `--workers`, `--jobs`, and `--help` options that handles job exceptions (collecting them in a list without stopping threads), supports `Shutdown` with a timeout, and prints a table comparing job execution times using the custom pool, `ThreadPool`, and separate threads for 100, 1 000, and 10 000 jobs.

### Variant 28. Rendering priorities {#v28}

**1. Initial level.** Create a console program that starts two “rendering” threads with identical computational work and `ThreadPriority.Lowest` and `Highest` priorities, and prints each thread's execution time.

**2. Basic level.** Create a console program that prompts for the number of rendering threads, runs threads at each of the five `ThreadPriority` levels in turn, restricts the process to one logical processor, and prints a “priority – time” table explaining the effect of priority.

**3. Advanced level.** Create a console application with `--frames`, `--affinity`, `--class Normal|BelowNormal|High`, and `--help` options that measures frame rendering times in threads with different priorities under different affinity masks and process priority classes, prints a results table, and warns that thread priorities may have no effect on Linux. Invalid options return code 2.

### Variant 29. Segmented sieve of Eratosthenes {#v29}

**1. Initial level.** Create a console program that finds primes up to 10 000 000 using a segmented sieve: the main thread finds base primes up to the square root, and four threads process four segments of the range; print the prime count.

**2. Basic level.** Create a console program that prompts for the limit and thread count, runs a segmented sieve in threads and a regular sieve sequentially, verifies that the prime counts match, and prints both times and the speedup.

**3. Advanced level.** Create a console application with `--limit`, `--segment` (segment size in KB), `--max-threads`, and `--help` options that runs a segmented sieve with 1…N threads and different segment sizes (32 KB, 256 KB, 4 MB), prints a table of time, speedup, and efficiency and the best configuration. Verify the prime count against the sequential version.

### Variant 30. Thread pool starvation {#v30}

**1. Initial level.** Create a console program that queues 40 jobs containing `Thread.Sleep(2000)` to the thread pool and prints `ThreadPool.ThreadCount` and `ThreadPool.PendingWorkItemCount` every 250 ms for 3 seconds.

**2. Basic level.** Create a console program that prompts for the number of blocking jobs and the minimum pool thread count, sets the minimum with `SetMinThreads`, measures each job's delay from queuing to starting, and prints the average and maximum delay.

**3. Advanced level.** Create a console application with `--jobs`, `--block-ms`, `--min-threads list` (for example, `default,16,64`), and `--help` options that starts a separate child process for each minimum value (so pool settings do not affect one another), collects job start delay statistics, and prints a “minimum – average delay – maximum delay – total time” table. Also print a `dotnet-counters` command for observing the process.

## Procedure

1. Study the theory and worked examples; use Task Manager or the `lscpu` command to find your computer's physical core and logical processor counts.
2. For your variant, determine how to divide the task into parts (threads, pool jobs, or processes), where each thread writes its result, and how to check the result against a sequential version.
3. Create a .NET 10 console solution in JetBrains Rider and implement the chosen difficulty level; give the threads names.
4. Check the program in the debugger: pause in a thread method and inspect the thread list in the *Debug* window; for pool tasks, inspect the `dotnet-counters` counters.
5. Measure times in the *Release* configuration with warm-up and the median of several runs; build a table of time, speedup, and efficiency and explain the values obtained.
6. Demonstrate the program to your instructor, explain the code, and answer the review questions.
