---
title: "Tasks"
description: "Topic 5. TPL tasks and async/await: task variants"
outline: [2, 3]
sourceHash: "7fae4ff9fbefe3a4919f490142934299a339802d77e41c2b053c2416862368d0"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Folder backups {#v1}

**1. Initial level.** Create a console program that prompts for source and backup folder paths, asynchronously copies all top-level files (`FileStream.CopyToAsync`), and prints each file's name and size after copying it. Finally, print the copied file count and total size in megabytes.

**2. Basic level.** Create a console program that asynchronously copies a folder and all subfolders to another folder (paths entered from the keyboard). Check that the source folder exists, report progress through `IProgress<T>` (percentage of bytes copied after each file), and allow cancellation with Esc. After cancellation, print how many files and bytes were copied and delete the partially copied file.

**3. Advanced level.** Create a `backup` console application accepting `source` and `target` arguments and the options `--parallel N` (concurrent copies, default 4), `--timeout sec`, `--only-newer` (copy only files newer than those in the backup), and `--help`. Limit copying with `SemaphoreSlim`, copy each file in a separate task, and display progress on one line. Individual file errors (access denied, file in use) must not stop the operation: afterward, print a “file – size – result – time, ms” table and totals, and send all `AggregateException` errors to the error stream. For a test folder with 200 files, measure times for `--parallel` 1, 2, 4, 8 and print a speedup table. Exit codes: 0 — success, 1 — partial errors, 2 — canceled, 3 — invalid arguments.

### Variant 2. Hashing distribution files {#v2}

**1. Initial level.** Create a console program that computes SHA-256 hashes for every file in a user-specified folder using `SHA256.HashDataAsync` and prints a “file – size – hash” table. Process files sequentially with `await`.

**2. Basic level.** Create a console program that verifies distribution checksums. Read `SHA256SUMS.txt` (lines in “hash filename” format), compute file hashes concurrently with a limit of 4 tasks (`SemaphoreSlim`), and print “OK”, “MISMATCH”, or “MISSING” for each file. Finally, print file counts by category and total time; report a missing or invalid checksum file.

**3. Advanced level.** Create a `hashcheck` console application with commands `create folder` (create a checksum file) and `verify folder`, and options `--algorithm sha256|sha512`, `--parallel N`, and `--help`. Hash files in tasks with limited parallelism, report progress through `IProgress<T>`, and allow Esc to cancel with a processed file count. Generate a test folder containing 100 files of 20 MB each if it does not exist, measure times for 1, 2, 4, 8, and 16 concurrent tasks, and print a “tasks – time, s – speedup – efficiency” table; every run's results must match sequential processing. Send read errors to the error stream and exit with code 1 if checksums differ.

### Variant 3. Exchange rates from multiple sources {#v3}

**1. Initial level.** Create a console program that simulates three dollar exchange rate sources (asynchronous methods with different `Task.Delay` delays from 200 to 1500 ms and fixed rates), starts requests concurrently, and uses `Task.WhenAny` to print the first rate received, its source name, and wait time.

**2. Basic level.** Create a console program that prompts for a currency code (USD, EUR, PLN) and concurrently queries three simulated rate sources with random delays and a 30% failure probability. Use the first successful response (`WhenAny` in a loop, skipping failed tasks), limit the overall wait to 1 s (`WaitAsync`), and use a fallback rate from a local JSON file labeled “fallback source” if the timeout expires or all sources fail.

**3. Advanced level.** Create a `rates` console application accepting currency codes as arguments and options `--timeout ms`, `--sources N` (simulated source count), `--strategy first|median`, and `--help`. The `first` strategy takes the first successful response and cancels remaining requests with a token; `median` waits for all responses until the timeout and calculates the median. Configure simulated sources' delays and failures in `sources.json`. Print a “currency – rate – source(s) – time, ms – status” table and counts of canceled, failed, and timed-out requests. Send all source exceptions to the error stream; exit with code 1 if no rates were obtained.

### Variant 4. Processing tourists' photos {#v4}

**1. Initial level.** Create a console program that simulates processing 10 photos: start a `Task.Run` task for each photo that “resizes” it (a 100–500 ms delay) and returns the new file size. After `Task.WhenAll`, print a “photo – size before – size after” table and total space saved.

**2. Basic level.** Create a console program that builds a “resize → watermark → save” task graph using continuations for a user-specified number of photos. Resizing throws an exception for 10% of photos (selected by `Random` with a fixed seed); `OnlyOnRanToCompletion` continuations skip these photos, and an `OnlyOnFaulted` continuation logs the error. Print all task states and a report on processed and corrupt photos.

**3. Advanced level.** Create a `photos` console application accepting a CSV photo list (name, size, megapixels) and options `--steps resize,watermark,compress`, `--parallel N`, `--fail-rate percent`, and `--help`. Build a chain of stages for each photo (duration proportional to megapixels), limiting concurrently processed photos. Collect errors from any stage through `AggregateException` without stopping other photos. Print a “photo – stages – status – time, ms” table, an error report including stage names, and processing times and speedups for `--parallel` 1, 4, and 16. Send invalid CSV rows to the error stream.

### Variant 5. Polling weather stations {#v5}

**1. Initial level.** Create a console program with an asynchronous `IAsyncEnumerable<double>` generator that returns a simulated weather station's temperature every 500 ms (`PeriodicTimer`). Iterate over 10 readings with `await foreach`, printing the number, time, and temperature.

**2. Basic level.** Create a console program that polls three simulated weather stations concurrently (asynchronous generators with different periods) and prints readings as they arrive. Compute the minimum, maximum, and average for each station. Stop after a user-specified number of seconds (`CancelAfter`) or on Esc, then print a station statistics table.

**3. Advanced level.** Create a `weather` console application that reads station configuration from JSON (name, period, base temperature, failure probability) and accepts options `--duration sec`, `--window N` (moving window), `--alert degrees`, `--csv file`, and `--help`. Each station is an asynchronous generator with `[EnumeratorCancellation]`; a station failure does not stop the others, and a retry occurs after 1 s. Print moving averages and threshold warnings, write every reading to CSV through `await using`, and finally print a “station – readings – failures – min – max – average” table. Invalid configuration results in exit code 2.

### Variant 6. Checking document links {#v6}

**1. Initial level.** Create a console program that starts a local `HttpListener` test server with `/ok`, `/missing` (404), and `/slow` (a 3 s delay) pages, checks the three links sequentially using `HttpClient` and `await`, and prints each response code and request time.

**2. Basic level.** Create a console program that reads a text file, finds all links to a local test server (`http://localhost:port/...`, started in the same program), and checks them concurrently with at most 5 requests at once (`SemaphoreSlim`) and a 2 s request timeout. Print a “link – result – time, ms” table and counts of working, broken, and timed-out links.

**3. Advanced level.** Create a `linkcheck` console application accepting Markdown or HTML files as arguments and options `--parallel N`, `--timeout ms`, `--retries K`, `--report file`, and `--help`. Check links with `HttpClient` against a local test server simulating delays, codes 200, 301, 404, 500, and dropped connections; retry only 5xx errors and timeouts. Print a “file – line – link – result – attempts – time” table and totals, write a CSV report, compare total times for `--parallel` 1, 5, and 20, and return code 1 if broken links are found.

### Variant 7. Importing orders from CSV {#v7}

**1. Initial level.** Create a console program that asynchronously reads `orders.csv` (number, customer, amount) with `File.ReadAllLinesAsync`, converts lines to records, and prints the order count and total amount.

**2. Basic level.** Create a console program that concurrently imports orders from multiple CSV files (space-separated filenames entered by the user) in `Task.Run` tasks. An invalid row throws `FormatException` with the line number and filename during parsing. After `Task.WhenAll`, print all errors from `AggregateException.InnerExceptions`, plus the successfully imported order count and total for each file.

**3. Advanced level.** Create an `import` console application accepting CSV files or a folder and options `--strict` (any error cancels the entire import), `--parallel N`, `--out file`, and `--help`. Read file lines through an asynchronous `IAsyncEnumerable<string>` generator, validate them (date, amount, email), and collect them in a shared list without duplicate numbers. In `--strict` mode, the first error cancels remaining tasks through a shared token; otherwise, accumulate errors. Print a “file – rows – imported – errors – time” table and the first 10 errors, write the result to CSV, and return code 0, 1 (partial errors), or 2 (import canceled).

### Variant 8. Payroll calculation {#v8}

**1. Initial level.** Create a console program with employee lists for three departments (base salary, percentage bonus). Start a `Task<decimal>` for each department to calculate its payroll; after `Task.WhenAll`, print each department's payroll and the overall total.

**2. Basic level.** Create a console program that reads an employee CSV file (department, full name, base salary, days worked, bonus) and calculates pay after taxes (18% personal income tax, 5% military levy) in a separate task for each department. Invalid department data puts its task in `Faulted`, while other departments are still processed. Print departmental payroll statements with totals and a list of departments with errors.

**3. Advanced level.** Create a `payroll` console application accepting an employee file, a month (`--month 2026-09`), and options `--departments list`, `--parallel`, `--out folder`, and `--help`. For each department, build a “calculate → check limits → write statement to file” chain with asynchronous writing. Generate test data for 100 000 employees, compare sequential and parallel calculation times in an “implementation – time – speedup” table, and verify that totals agree to the kopiyka. Send department errors to the error stream and print the overall statement as an aligned table with a “Total” row.

### Variant 9. Broadcasting sporting events {#v9}

**1. Initial level.** Create a console program simulating three matches: an asynchronous method for each generates an event (“goal”, “corner”, “card”) every 300–800 ms and prints it with the match name. Start the matches concurrently and wait for them with `Task.WhenAll`.

**2. Basic level.** Create a console program in which simulated matches pass events to a `Channel<MatchEvent>` and several asynchronous handlers (scoreboard, statistics, log) process them. Limit each event's processing to 200 ms (`WaitAsync`) and record a warning when processing times out. Prompt for broadcast duration; finally, print scores and event statistics by type.

**3. Advanced level.** Create a `broadcast` console application that reads a match schedule from JSON and accepts options `--speed multiplier`, `--handlers scoreboard,log,statistics`, `--handler-timeout ms`, and `--help`. Match events enter a channel, and each handler runs in its own task; a slow or failing handler must not delay others, and its exceptions are collected. Esc stops the broadcast gracefully, draining the channel. Finally, print a “match – score – events” table and a “handler – processed – timed out – errors – average time, ms” table; write the event log asynchronously to a file.

### Variant 10. Log archiver {#v10}

**1. Initial level.** Create a console program that asynchronously compresses a user-specified log file into GZip (`GZipStream`, `CopyToAsync`) and prints sizes before and after compression and the compression ratio.

**2. Basic level.** Create a console program that compresses all `*.log` files in a specified folder into GZip concurrently (at most 4 files at once), reports progress through `IProgress<T>` (processed files and bytes), and allows Esc to cancel; delete partially written archives on cancellation. Finally, print a file table with compression ratios.

**3. Advanced level.** Create a `logzip` console application accepting a folder and options `--older-than days`, `--level fastest|optimal|smallest`, `--parallel N`, `--delete-source`, `--timeout sec`, and `--help`. Generate test logs (200 files), compress them with limited parallelism, verify each archive by decompressing it into memory, and only then delete the source file. Print a “level – parallelism – time – speedup – overall ratio” table for the compression levels and 1, 2, 4, 8 tasks. Send file access errors to the error stream; exit with code 2 on cancellation.

### Variant 11. Searching a book library {#v11}

**1. Initial level.** Create a console program that prompts for a word, asynchronously reads all text files in the `books` folder, and prints the names of books containing that word and its occurrence count in each.

**2. Basic level.** Create a console program that searches all books in a folder concurrently for a user-entered phrase (one task per book) and uses `Task.WhenAny` to print the first matching book and line number. After the first result, cancel other tasks with a shared token; print completed and canceled task counts and time to the first result.

**3. Advanced level.** Create a `booksearch` console application accepting a folder and phrase and options `--mode first|all`, `--ignore-case`, `--parallel N`, `--timeout ms`, and `--help`. In `first` mode, return the first match and cancel other tasks; in `all` mode, return every match as it becomes available (`Task.WhenEach`), printing “book – line – excerpt”. Generate a test library of 500 books, measure both modes for `--parallel` 1, 4, 16, and verify that `all` finds the same number of matches as sequential search. Send file read errors to the error stream.

### Variant 12. Airline ticket booking {#v12}

**1. Initial level.** Create a console program with a simulated booking service: an asynchronous `BookAsync` method throws `TimeoutException` with a 50% probability. Retry up to 5 times with a 300 ms delay between attempts, printing each attempt's number and result.

**2. Basic level.** Create a console program that books tickets for a user-entered flight number through a simulated service with random failures. Retry with exponential delays (200, 400, 800 ms…) and random jitter up to 20%, only for transient errors (`TimeoutException`, `HttpRequestException`); do not retry a “no seats available” error. Limit total time to 5 s with a cancellation token; print an attempt log and the result.

**3. Advanced level.** Create a `booking` console application that reads booking requests from CSV (passenger, flight, class) and accepts options `--max-retries`, `--base-delay ms`, `--timeout sec`, `--parallel N`, `--seed`, and `--help`. Implement retries as a generic higher-order function `RetryAsync<T>` with a cancellation token. Process bookings concurrently with a limit; the service simulates overload (more errors when concurrent requests exceed 5). Print a “passenger – flight – result – attempts – time” table, attempt statistics, and a comparison of successes for `--parallel` 2, 5, 10.

### Variant 13. Music playlist {#v13}

**1. Initial level.** Create a console program with a simulated player class that raises `TrackFinished` after a specified time. Use `TaskCompletionSource` to turn the event into a task and sequentially “play” three tracks, printing each name and completion time.

**2. Basic level.** Create a console program that reads a playlist from a file (name, duration in seconds) and plays it with a simulated player exposing `TrackFinished` and `PlaybackError` events. `PlayAsync` returns a task through `TaskCompletionSource` (`RunContinuationsAsynchronously`); an error puts the task in `Faulted`, and S (skip) cancels the current track. Print a playback log and total time.

**3. Advanced level.** Create a `player` console application accepting a playlist file and options `--shuffle`, `--repeat N`, `--speed multiplier`, `--crossfade ms`, and `--help`. The simulated player has start, completion, error, and buffering events; turn each into a task with a timeout (`WaitAsync`) so a “stuck” track is skipped. Handle N, P, and Esc (next, pause, stop) in a separate task. Finally, print a “track – scheduled – actual – result” table and overall statistics; unknown options and missing files produce error-stream messages and exit code 1.

### Variant 14. Computing π with several methods {#v14}

**1. Initial level.** Create a console program that concurrently starts two π computation tasks: the Leibniz series (100 million terms) and Monte Carlo (100 million points). Print each task's value, error, and time.

**2. Basic level.** Create a console program that prompts for required accuracy (3–9 decimal places) and starts a “race” between three π methods (Leibniz series, Wallis formula, Monte Carlo), each periodically checking the achieved accuracy and cancellation token. Use `Task.WhenAny` to identify the first method to reach the accuracy and cancel the others; print the winner, all task states, and iteration counts.

**3. Advanced level.** Create a `pi-race` console application accepting options `--digits N`, `--methods leibniz,wallis,montecarlo,nilakantha`, `--timeout sec`, `--parallel-mc N` (Monte Carlo task count), and `--help`. Each method reports progress through `IProgress<T>`; divide Monte Carlo into N tasks with independent generators. Print a “method – achieved accuracy – iterations – time – status” table and, for Monte Carlo, a “tasks – time – speedup – efficiency” table for 1, 2, 4, 8, 16 tasks. Verify that canceled tasks are `Canceled`, not `Faulted`.

### Variant 15. Website monitoring {#v15}

**1. Initial level.** Create a console program that starts a local `HttpListener` test server with three pages having different delays and uses `PeriodicTimer` to check page availability with `HttpClient` every 2 s, printing the check time, response code, and response time. Run 5 check cycles.

**2. Basic level.** Create a console program that periodically (at a user-entered interval) checks pages of a local test server concurrently; the server randomly slows down or returns 503. Each request has a 1 s timeout. For each page, accumulate check and failure counts and minimum, average, and maximum response times. Esc stops monitoring, after which a statistics table is printed.

**3. Advanced level.** Create a `monitor` console application that reads checks from JSON (local test server address, interval, timeout, expected code) and accepts options `--duration min`, `--alert-after N` (consecutive failures), `--log file`, and `--help`. Each check runs in its own `PeriodicTimer` loop, writing results asynchronously to a log. After N consecutive failures, print a warning; on recovery, report the downtime. Finally, print a “site – availability, % – failures – p50, ms – p95, ms – maximum, ms” table. Configuration errors result in exit code 2.

### Variant 16. Subtitle converter {#v16}

**1. Initial level.** Create a console program that asynchronously reads an SRT subtitle file, shifts all subtitle times by a user-entered number of seconds (possibly negative), and asynchronously writes the result to a new file.

**2. Basic level.** Create a console program that converts SRT subtitles to WebVTT through a three-stage asynchronous pipeline: read blocks (`IAsyncEnumerable<string>`), convert, write. Skip invalid blocks with a message containing the block number. Print converted and skipped block counts, and allow Esc to cancel conversion of a large file.

**3. Advanced level.** Create a `subconv` console application accepting files or a folder and options `--to srt|vtt`, `--shift ms`, `--fps-from`, `--fps-to` (frame rate conversion), `--parallel N`, and `--help`. Process each file through an asynchronous “read → parse → convert → write” pipeline, limiting concurrent files. Collect individual file errors and send them to the error stream while continuing other files. Generate 100 test files, print a “file – blocks – skipped – time” table, and compare times for 1, 4, and 16 concurrent files.

### Variant 17. School timetable {#v17}

**1. Initial level.** Create a console program that starts 4 `Task.Run` tasks, each generating a random weekly lesson schedule for one class (with its own `Random` seed) and counting gaps. Print the schedule with the fewest gaps.

**2. Basic level.** Create a console program that generates alternative school timetables for several classes concurrently in multiple tasks, subject to constraints (at most 7 lessons per day, no teacher assigned two lessons at once). Limit search time to a user-entered number of seconds (`CancelAfter`); after the timeout, each task returns its best candidate. Print the best timetable and the number of candidates checked by each task.

**3. Advanced level.** Create a `timetable` console application that reads teachers, classes, and teaching loads from JSON and accepts options `--tasks N`, `--time sec`, `--seed`, `--out file`, and `--help`. Each task performs random search with local improvement, periodically reports its best score through `IProgress<T>`, and checks the token. Esc or a timeout stops the search. Print the best timetable for each class and a “tasks – candidates checked – best score” table for 1, 2, 4, 8, 16 tasks; write the timetable to CSV. Invalid input results in exit code 2.

### Variant 18. Warehouse inventory {#v18}

**1. Initial level.** Create a console program with a dictionary of stock levels for 5 products that concurrently starts 20 tasks updating stock (receipts and shipments) using `ConcurrentDictionary.AddOrUpdate`. Print final stock levels and verify that they match sequential calculation.

**2. Basic level.** Create a console program that processes a warehouse operations file (product, type, quantity) in concurrent batches. A shipment that would make stock negative throws an exception; reject a failing batch (validate before changing stock), but apply other batches. Print stock levels, applied and rejected batch counts, and all errors from `AggregateException`.

**3. Advanced level.** Create a `warehouse` console application accepting operation files for several warehouses and options `--batch N`, `--parallel N`, `--on-error skip|stop`, and `--help`. Process each warehouse in a separate task and batches atomically (apply changes to a copy and commit only after validation). In `stop` mode, cancel all warehouses after the first error through a shared token. Print a “warehouse – operations – applied – rejected – task state” table and final stock levels, verifying them against sequential processing; send a partial failure report to the error stream. Exit with code 1 if any batches were rejected.

### Variant 19. Drug interactions {#v19}

**1. Initial level.** Create a console program that asynchronously loads a local drug interaction database from JSON (`JsonSerializer.DeserializeAsync`), prompts for two drug names, and prints their interaction description or a message that none exists.

**2. Basic level.** Create a console program that checks a user-entered comma-separated drug list for pairwise interactions. Each query to the “slow” database (300 ms delay) runs asynchronously, and results are cached as tasks in `ConcurrentDictionary<string, Task<Interaction?>>` so an identical query is not executed twice. Print a table of interactions found, database query count, and cache access count.

**3. Advanced level.** Create an `interactions` console application accepting a prescription file (patient, drug list) and options `--db file`, `--parallel N`, `--cache-ttl sec`, `--severity minor|moderate|major`, and `--help`. Database queries simulate delays and transient failures; the task cache retains only successful results (remove failed tasks). Check prescriptions concurrently, print each patient's interactions at the specified severity, a “prescriptions – database queries – cache hits – errors” summary, and a timing comparison with and without caching.

### Variant 20. Batch notifications {#v20}

**1. Initial level.** Create a console program simulating 20 notifications sent by an asynchronous method with a 100 ms delay, with at most 5 sent concurrently (`SemaphoreSlim`). Print each notification's send time and the total time.

**2. Basic level.** Create a console program that reads recipients from a file and sends notifications through a simulated gateway with a rate limit of N messages per second (N entered by the user). The gateway fails randomly with a 10% probability; retry failed messages once. Print progress and a delivery report: delivered, delivered after retry, undelivered.

**3. Advanced level.** Create a `notify` console application accepting a recipient file and message template and options `--rate N/s`, `--burst N`, `--channels email,sms,push`, `--retries K`, `--dry-run`, and `--help`. Each channel has its own rate limit (implemented with `PeriodicTimer` and `SemaphoreSlim`); channels run concurrently, and Esc stops sending after waiting for current deliveries. Print a “channel – sent – errors – retries – average delay” report, write undelivered messages to a file for a later run, and verify that the actual rate did not exceed the limit.

### Variant 21. Route navigator {#v21}

**1. Initial level.** Create a console program that concurrently starts three route search tasks (simulated with different delays, each returning distance and travel time) and, after `Task.WhenAll`, prints all routes and the fastest one.

**2. Basic level.** Create a console program that reads a road graph from a file (city, city, distance, average speed) and searches for a route between user-entered cities using several strategies in separate tasks (shortest distance, least time, fewest transfers). Limit the overall search to 2 s; cancel tasks that do not finish in time, and print the best route found and each task's state.

**3. Advanced level.** Create a `route` console application accepting a graph file, `--from` and `--to` locations, and options `--via` (intermediate locations), `--strategy`, `--timeout ms`, and `--help`. Search for alternative routes concurrently (Dijkstra's algorithm with different weights and a variant excluding each edge of the best route); each task checks the token. Print a “route – distance – time – transfers – task – search time” table, generate a graph with 10 000 vertices to measure sequential and parallel alternative search times, and return code 1 if no route is found.

### Variant 22. Checking homework {#v22}

**1. Initial level.** Create a console program simulating “compilation” of 8 student submissions: each task takes a random 0.5–3 s. Use `WaitAsync(TimeSpan)` with a 2 s timeout to identify submissions built on time and print a results table.

**2. Basic level.** Create a console program that checks student submissions from a folder (each submission is a text file containing “code”). Simulate compilation and tests for each submission in a task with a user-specified timeout; cancel timed-out work with a token, rather than merely stopping the wait. Print a “student – result – tests passed – time” table and submission counts by category.

**3. Advanced level.** Create a `grader` console application accepting a submissions folder, test file, and options `--timeout sec`, `--parallel N`, `--attempts K`, `--report file`, and `--help`. Check each submission through a “compile → tests (in parallel) → grade” task graph: failed compilation cancels tests, while a single test's timeout does not stop others. Print a grade table with totals and a compilation error report, write results to CSV, and compare total checking time for `--parallel` 1, 4, 8. Invalid arguments result in exit code 2.

### Variant 23. Local network port scanner {#v23}

**1. Initial level.** Create a console program that checks whether ports 1–1024 on `127.0.0.1` are open by connecting asynchronously with `TcpClient.ConnectAsync` and a 200 ms timeout, then prints open ports. For testing, open two `TcpListener` ports before scanning.

**2. Basic level.** Create a console program that concurrently scans a user-entered port range on `localhost`, with at most 100 connections at once and a connection timeout. Open several test `TcpListener` ports before scanning. Print a table of open ports with response times, counts of closed and timed-out ports, and total scan time.

**3. Advanced level.** Create a `portscan` console application accepting options `--host` (only `localhost` or addresses in `127.0.0.0/8`), `--ports 1-1024,8080`, `--parallel N`, `--timeout ms`, `--open-test 3` (test listener count), and `--help`. Limit scan parallelism, report progress through `IProgress<T>`, and allow Esc to cancel. Print a “port – status – time, ms – known service” table, a scan time comparison for `--parallel` 1, 10, 100, 500, and pool thread counts before and after scanning (`ThreadPool.ThreadCount`). A disallowed address or invalid range results in exit code 2.

### Variant 24. Generating PDF reports {#v24}

**1. Initial level.** Create a console program simulating generation of 8 reports (synchronous computation lasting about 1 s each) in `Task.Run` tasks. Print total time and pool thread count (`ThreadPool.ThreadCount`) during execution.

**2. Basic level.** Create a console program that generates N reports (N entered by the user), simulating a blocking `Thread.Sleep(2000)` operation in two ways: `Task.Run` pool tasks and tasks with `TaskCreationOptions.LongRunning`. For each method, print total time, maximum pool thread count, the number of individual threads (`Process.GetCurrentProcess().Threads.Count`), and an explanatory conclusion.

**3. Advanced level.** Create a `reports` console application accepting options `--count N`, `--mode pool|longrunning|async`, `--work ms`, `--compare`, and `--help`. The `async` mode replaces blocking with `Task.Delay`. A separate task records pool and process thread counts every 100 ms. `--compare` runs every mode for N = 10, 50, 200 and prints a “mode – N – time, s – max pool threads – max process threads” table and the last report's start delay, showing pool starvation. Write reports asynchronously to files; send invalid options to the error stream.

### Variant 25. Laboratory measurements {#v25}

**1. Initial level.** Create a console program with an asynchronous `IAsyncEnumerable<double>` generator simulating an instrument: return a noisy voltage reading every 100 ms. Iterate over 50 measurements, printing every tenth, then the mean and standard deviation.

**2. Basic level.** Create a console program that reads an asynchronous stream of simulated instrument measurements and computes moving statistics over a user-specified window (mean, minimum, maximum, deviation). Mark measurements more than 3 standard deviations from the moving mean as outliers. Stop after a specified number of seconds (`WithCancellation`), then print measurement and outlier counts.

**3. Advanced level.** Create a `lab-meter` console application accepting options `--channels N` (instrument count), `--rate Hz`, `--window N`, `--duration sec`, `--csv file`, `--replay file`, and `--help`. In `--replay` mode, read measurements from a previously recorded CSV while preserving intervals; otherwise, simulate them. Merge channels into one asynchronous stream, update each channel's statistics on one line every second, and write all measurements to CSV through `await using`. Finally, print a “channel – measurements – mean – σ – outliers – missed” table and verify that the actual frequency matches the requested frequency within 5%.

### Variant 26. Game servers {#v26}

**1. Initial level.** Create a console program simulating “pings” to 5 game servers through asynchronous methods with random delays (a specified `Random` seed), awaiting all responses concurrently and printing servers sorted by latency.

**2. Basic level.** Create a console program that reads servers from a file (name, region, base latency) and performs 5 simulated pings per server, concurrently across all servers. A ping longer than 500 ms is considered lost (timeout through a token). Print a “server – region – average latency – loss, %” table sorted by average latency, and recommend a server.

**3. Advanced level.** Create a `ping-servers` console application accepting a server file and options `--count N`, `--interval ms`, `--timeout ms`, `--region`, `--watch` (continuous mode with `PeriodicTimer`, stopped by Esc), and `--help`. Compute minimum, median, p95, jitter, and loss for each server; print results as they arrive through `Task.WhenEach`. To compare with a real network call, start a local TCP server and measure `TcpClient.ConnectAsync` time. Sort the table by median and mark servers with loss above 20%.

### Variant 27. Downloading map tiles {#v27}

**1. Initial level.** Create a console program that simulates concurrent downloads of 16 map tiles (a 4×4 grid) using asynchronous methods with random delays, and prints a grid containing each tile's download time and the total time.

**2. Basic level.** Create a console program that downloads tiles at a user-entered zoom level (tile count 4^zoom) from a local test server or simulated source, with at most 8 concurrent downloads and up to 3 retries for failures. Save tiles to `z/x/y.png`, display progress as a percentage, and finally print successful, retried, and failed tile counts.

**3. Advanced level.** Create a `tiles` console application accepting options `--zoom from-to`, `--bbox x1,y1,x2,y2`, `--parallel N`, `--retries K`, `--cache folder`, `--timeout ms`, and `--help`. Do not download already saved tiles again. The source simulates delays and errors 429 (too many requests) and 500; after 429, wait for the delay specified by the source. Esc cancels downloads and deletes incomplete files. Print a “zoom – tiles – from cache – downloaded – retries – errors – time” table and compare times for `--parallel` 1, 4, 16, 64.

### Variant 28. Tax returns {#v28}

**1. Initial level.** Create a console program that sequentially performs three checks on a tax return (income, expenses, and allowances defined in the program) as a `ContinueWith` chain: required fields, arithmetic, allowance limits. Print each check's result.

**2. Basic level.** Create a console program that reads tax returns from JSON and builds a continuation chain with conditional branches for each: after successful field validation, run arithmetic and allowance checks concurrently, then calculate the tax; a failed check produces a rejection message through `OnlyOnFaulted`. Print each return's status and tax amount or rejection reasons.

**3. Advanced level.** Create a `tax-check` console application accepting a tax return file and options `--rules file` (limits and rates), `--year`, `--parallel N`, `--out folder`, and `--help`. Build a task graph for each return with conditional continuations and a timeout for an “external registry” check (simulated delays and failures). Collect exceptions from all checks using `AggregateException.Flatten()`. Print a “taxpayer – status – tax – errors – time” table, write receipts for accepted returns and notices for rejected returns to files, and return code 1 if any returns are rejected.

### Variant 29. Electronic queue at an administrative service center {#v29}

**1. Initial level.** Create a console program simulating queue ticket issuance: a `PeriodicTimer` issues a new ticket every 500 ms, and an asynchronous clerk method serves each ticket for 1–2 s. Run for 10 s and print an issuance and service log.

**2. Basic level.** Create a console program simulating an electronic queue with several service windows (count entered by the user): a visitor generator uses `PeriodicTimer`, and windows are asynchronous tasks taking tickets from a queue. Esc stops operation; after stopping, no new tickets are issued, but the remaining queue is served. Write the event log asynchronously to a file and print average wait time and the number served.

**3. Advanced level.** Create a `queue` console application accepting a services file (name, average service time, share of visitors) and options `--windows N`, `--hours H`, `--speed multiplier`, `--break-every min`, `--log file`, and `--help`. Windows take breaks, services have priorities, a timer ends the workday, and unfinished service is canceled gracefully. Write the log asynchronously without blocking windows. Print a “service – visitors – average wait – maximum wait – not served” table and find the minimum number of windows that keeps average wait at or below 15 min.

### Variant 30. Comparing async and threads {#v30}

**1. Initial level.** Create a console program that starts 1 000 tasks, each executing `await Task.Delay(1000)`, and prints total time, process thread count, and memory used (`GC.GetTotalMemory`).

**2. Basic level.** Create a console program that performs a user-specified number of waits in two ways: dedicated `Thread` threads with `Thread.Sleep(1000)`, and tasks with `await Task.Delay(1000)`. For each method, print a table of total time, maximum process thread count, and working set increase (`Process.WorkingSet64`).

**3. Advanced level.** Create a `wait-bench` console application accepting options `--counts 100,1000,10000`, `--modes thread,pool-sleep,async`, `--delay ms`, `--csv file`, and `--help`. The `pool-sleep` mode executes `Thread.Sleep` in pool tasks. A separate task records process and pool thread counts and working set every 50 ms. Print a “mode – count – time, s – max threads – memory, MB – last wait's start delay, ms” table, write results to CSV, skip `thread` mode for 10 000 with a warning if required memory exceeds available memory, and explain each mode's scalability.

## Procedure

1. Study the theory and worked examples.
2. Identify which operations in your variant are CPU-bound and which are I/O-bound; draw a task graph and specify cancellation checkpoints, timeouts, and progress reporting.
3. Create a .NET 10 console project in JetBrains Rider; simulate slow sources with `Task.Delay` and a cancellation token, and create files in a temporary folder.
4. Implement the chosen difficulty level without blocking `Wait()` or `Result` calls on incomplete tasks and without `async void` (except for event handlers).
5. Test success, single-task failure, timeout, and cancellation scenarios; measure time in Release configuration (the median of several runs) and inspect tasks in the debugger's *Parallel Stacks* and *Tasks* tabs.
6. Demonstrate the program to your instructor, explain the code, and answer the review questions.
