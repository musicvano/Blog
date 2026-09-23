---
title: "Tasks"
description: "Topic 4. Thread-safe collections: task variants"
outline: [2, 3]
sourceHash: "30a49847fa5d72e2b4fa9c0ed5a039976442e6bd3c927f8f31c2d176a8b8ceb6"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Processing web logs {#v1}

**1. Initial level.** Create a console program that generates 10 000 web server log lines in `method path code time_ms` format (fixed random seed), passes them from a reader thread through a bounded `Channel.CreateBounded<string>(100)` channel to two parsers, and prints response counts for each status code (200, 404, 500, etc.).

**2. Basic level.** Create a console program that prompts for a web server log text file path (lines in `method path code time_ms` format), channel capacity (1–10 000), and parser count (1–16), validates the input, and processes the file through a channel-based “read → parse → aggregate” pipeline. Print a “code – count – percentage” table, average response time, corrupted line count, and processing time; results must match a sequential count performed for verification.

**3. Advanced level.** Create a `logstat` console application that accepts one or more log files and `--parsers N`, `--capacity N`, `--top N`, `--out file.csv`, and `--help` options. A bounded-channel pipeline reads files, parses lines in multiple tasks, and aggregates status-code statistics and the N slowest paths by average time. Measure the maximum item count in each channel (evidence of backpressure), print aligned tables, and write them to CSV. Report missing files and invalid options to the error stream; exit codes: 0 – success, 1 – argument error, 2 – no files read.

### Variant 2. Photo thumbnails (simulation) {#v2}

**1. Initial level.** Create a console program in which a producer thread adds 50 “photos” (name and size in megapixels) to a `BlockingCollection<Photo>` with capacity 10, while three workers create “thumbnails,” simulating work with `Thread.Sleep` for 10 ms per megapixel. Print which worker processed each photo and the total processed count.

**2. Basic level.** Create a console program that prompts for photo count (1–1 000), queue capacity, and worker count (1–16), generates photos of random sizes (seed 1), and processes them using a producer–consumer arrangement with simulated work. Print a “worker – photos – total megapixels” table, execution time, and throughput (photos per second), and verify that every photo was processed exactly once.

**3. Advanced level.** Create a console application that reads a photo list from a CSV file (`name;width;height`) and accepts `--capacity`, `--workers 1,2,4,8`, `--repeat`, and `--help`. For each worker count, process the list through a bounded `BlockingCollection<T>` with simulated work proportional to pixel count, and print a “workers – time, ms – photos/s – speedup – efficiency” table (median of repeated runs). Skip malformed rows and report their line numbers to the error stream; an empty or missing file produces exit code 2.

### Variant 3. Sensor telemetry {#v3}

**1. Initial level.** Create a console program in which a sensor thread generates temperature events without delay for 1 s, writing them with `TryWrite` to a channel of capacity 10 000 in `BoundedChannelFullMode.DropOldest` mode, while a slow consumer takes 0.1 ms to process each event. Print generated, processed, and lost event counts (count losses with the `itemDropped` delegate).

**2. Basic level.** Create a console program that prompts for sensor count (1–16), channel capacity, and full mode (`Wait`, `DropOldest`, `DropNewest`, `DropWrite`), validates the input, and simulates 5 s of operation: sensors write events to a shared bounded channel, and two consumers calculate each sensor's average temperature. Print a “sensor – generated – processed – average temperature” table and the fraction of lost events.

**3. Advanced level.** Create a console application comparing channel full modes, with `--sensors`, `--rate events/s`, `--capacity`, `--duration s`, `--consumer-delay ms`, `--csv file`, and `--help` options. Run the simulation sequentially for all four `BoundedChannelFullMode` values and print a “mode – generated – processed – lost, % – maximum event delay, ms – average delay, ms” table. Calculate delays from event timestamps and append results to a CSV file. Report invalid options to the error stream and exit with code 1.

### Variant 4. Word frequencies in literary works {#v4}

**1. Initial level.** Create a console program that reads a text file specified in code, divides its lines into four parts, and uses four threads to count word frequencies in a shared `ConcurrentDictionary<string, int>` using `AddOrUpdate`. Print the 10 most frequent words and verify the result against a sequential count.

**2. Basic level.** Create a console program that prompts for a text file path and thread count (1–32) and builds word-frequency dictionaries in two ways: a shared `ConcurrentDictionary<string, int>` and thread-local `Dictionary<string, int>` instances merged after completion. Convert words to lowercase and discard punctuation. Print both execution times, whether the results match, and the 15 most frequent words.

**3. Advanced level.** Create a console application that accepts a directory of literary text files and `--threads 1,2,4,8,16`, `--min-length`, `--top`, and `--help` options. For each thread count, build a frequency dictionary using a shared `ConcurrentDictionary<TKey, TValue>` and local dictionaries followed by merging; after warm-up, measure the median of three runs and print a “threads – shared dictionary, ms – local dictionaries, ms – speedup for each method” table. Separately print the most frequent words with the number of files containing them. For an empty or missing directory, report to the error stream and exit with code 2.

### Variant 5. Restaurant orders {#v5}

**1. Initial level.** Create a console program in which two waiter producers each add 10 orders to a shared `BlockingCollection<Order>`, while three cook consumers prepare them (50 ms simulation). Call `CompleteAdding` after both waiters finish. Print a “cook – order” log and each cook's order count.

**2. Basic level.** Create a console program with urgent and ordinary order queues (`BlockingCollection<Order>`) that prompts for waiter, cook, and order counts. Cooks take orders using `BlockingCollection<Order>.TakeFromAny`, checking the urgent queue first, and finish after both queues close. Print a “cook – urgent – ordinary” table and average waiting times for urgent and ordinary orders.

**3. Advanced level.** Create a console application that reads an order scenario from a CSV file (`arrival_time_ms;table;dish;priority`) and simulates a kitchen with `--cooks N`, `--capacity N`, `--priorities 3`, and `--help`. Each dish has a preparation time in a reference table defined in the program. Stop all cooks correctly after the final order, print a “priority – orders – average wait, ms – maximum wait, ms” table and each cook's utilization percentage. Report unknown dishes and malformed rows to the error stream; if no orders are accepted, exit with code 2.

### Variant 6. Web crawler (page graph simulation) {#v6}

**1. Initial level.** Create a console program that defines a graph of 20 “pages” in code (an address-to-links dictionary) and traverses it with four threads taking addresses from `ConcurrentQueue<string>`. Store visited addresses in `ConcurrentDictionary<string, byte>` using `TryAdd` so every page is processed once. Print traversal order and the visited page count.

**2. Basic level.** Create a console program that generates a random page graph (page count and average link count are entered from the keyboard, seed 7), prompts for maximum depth and thread count, and traverses from a starting page with 5 ms simulated loading. Collect discovered pages in `ConcurrentBag<string>`. Print page counts at each depth and verify that results match a sequential breadth-first traversal.

**3. Advanced level.** Create a console application that reads a page graph from a file (lines `address -> link1 link2 …`) and accepts `--start`, `--depth`, `--workers`, `--max-pages`, `--delay ms`, and `--help`. Traverse using a worker pool over an address channel; workers finish when the queue is empty and none are processing a page. Print a “depth – pages” table, unreachable pages, broken links to missing addresses, and traversal time for the specified worker count. Report file-format errors with line numbers to the error stream.

### Variant 7. Stock exchange {#v7}

**1. Initial level.** Create a console program in which three trader threads each write 20 orders (buy or sell, price, quantity) to a `Channel<Order>`, while one exchange thread reads them and calculates total buy and sell order counts and the average price of each type.

**2. Basic level.** Create a console program that prompts for trader count and orders per trader, generates orders for one stock (seed 3), and passes them through a bounded channel to a single exchange consumer. The exchange matches orders: a buy executes if its price is at least the lowest sell price. Print a “buyer – seller – price – quantity” trade log and the unfilled order count; verify that total quantity bought equals quantity sold.

**3. Advanced level.** Create a console exchange application with `--traders`, `--orders`, `--symbols AAPL,MSFT,…`, `--capacity`, `--seed`, `--trades file.csv`, and `--help` options. Orders for different stocks pass through separate channels to separate matching consumers, so order books require no locks. Write trades to CSV and print a “stock – trades – volume – minimum, maximum, and volume-weighted average price” table and processing time; report unknown symbols in orders and invalid options to the error stream.

### Variant 8. Postal sorting centers {#v8}

**1. Initial level.** Create a console program with a three-stage `BlockingCollection<T>` pipeline: “acceptance” creates 30 shipments, “sorting” determines the region from the postal code, and “delivery” prints shipments with region names. Each stage runs in a separate thread and closes its output collection when finished.

**2. Basic level.** Create a console program that prompts for shipment count, sorter count (1–8), and queue capacity, simulates an “accept → sort → deliver” pipeline with simulated work at each stage, and records stage-entry timestamps in each shipment. Print a “stage – average delay, ms – maximum delay, ms” table and overall throughput.

**3. Advanced level.** Create a console application that reads shipments from a CSV file (`number;postal_code;weight`) and accepts `--sorters`, `--couriers`, `--capacity`, `--sort-ms`, `--deliver-ms`, and `--help`. The channel pipeline has three stages with configurable worker counts. Print each stage's delay statistics (mean, median, 95th percentile), identify the bottleneck (the stage with the longest queue wait), and suggest how many workers to add. Write shipments with invalid postal codes to a separate error file.

### Variant 9. False sharing in a histogram {#v9}

**1. Initial level.** Create a console program that builds a 100-bin histogram of 50 million pseudorandom numbers from 0 to 99 using 4 threads in two ways: all threads increment elements in a shared “thread × bin” `long[,]` array, or each thread fills a local array copied at the end. Print both times and whether the histograms match.

**2. Basic level.** Create a console program that prompts for pseudorandom number count and histogram bin count, then measures histogram construction with 1, 2, 4, and 8 threads in three ways: a shared array of per-thread counters, local histograms followed by merging, and a shared array using `Interlocked.Increment`. Warm up each method and use the median of five runs; print time and speedup tables and verify that every histogram equals the sequential result.

**3. Advanced level.** Create a console BenchmarkDotNet application comparing parallel pseudorandom-number histogram methods (shared counter array, padded `[StructLayout]` structures, local histograms), with `[Params]` values of 1, 2, 4, and 8 threads and 16 and 1 024 bins. The `--quick` mode measures using `Stopwatch` without BenchmarkDotNet. Verify histogram correctness before measurement, print the results table, and explain which method achieves the greatest speedup.

### Variant 10. Transit fare validators {#v10}

**1. Initial level.** Create a console program in which 5 validator threads each generate 1 000 trip events (route number 1–10, fare UAH 8, 15, or 30) and add them to `ConcurrentQueue<Trip>`, while an aggregator thread counts trips and revenue per route after the validators finish.

**2. Basic level.** Create a console program that prompts for validator count, event count, and N, passes trip events through a channel to an aggregator, and has the aggregator print an interim “route – trips – revenue” report every N events and a final report at the end. Verify that report revenue equals the sum of fares in all generated events.

**3. Advanced level.** Create a console application that reads events from several CSV files (`time;validator;route;fare`, one file per validator) and accepts `--every N`, `--routes file` (route names), `--out directory`, and `--help`. File readers write to a bounded channel; the aggregator creates reports every N events and writes each to a separate file. The final report contains routes in descending revenue order with a “Total” row and each route's peak hour. Report unknown routes and fares to the error stream; exit with code 2 if no events are read.

### Variant 11. Office print queue {#v11}

**1. Initial level.** Create a console program in which 4 user threads each submit 5 print jobs (document name, page count) to a `BlockingCollection<PrintJob>` with capacity 5, and two printers print them at 20 ms per page. Print a log and the total page count.

**2. Basic level.** Create a console program that prompts for user, printer, and job counts and queue capacity, and supports cancellation: a separate thread cancels every fifth job before printing begins (a flag in the job checked by the printer). Add jobs using `TryAdd` with a 100 ms timeout and count rejected submissions. Print a “printer – jobs – pages” table and canceled and rejected job counts.

**3. Advanced level.** Create a console print queue application with `--printers`, `--capacity`, `--ppm pages/min`, `--jobs file.csv`, and `--help`, where the file contains `time;user;document;pages`. Printers take jobs with a timeout and `CancellationToken`, allowing **Q** to stop the entire queue. Print a “user – jobs – pages – average wait, s” table, each printer's utilization, and the jobs remaining after stopping. Report invalid file rows with line numbers to the error stream.

### Variant 12. Product catalog {#v12}

**1. Initial level.** Create a console program that creates a catalog of 10 000 products (SKU and price) as a `FrozenDictionary<string, decimal>` and performs 1 000 000 random SKU lookups per thread in 8 threads. Print lookup time and compare it with the same workload on `ConcurrentDictionary<string, decimal>`.

**2. Basic level.** Create a console program in which 8 buyer threads continually look up prices in a `FrozenDictionary<string, decimal>`, while an administrator thread changes 1% of prices every 200 ms, builds a new frozen catalog, and atomically replaces the reference with `Interlocked.Exchange`. Each catalog version has a number. Print lookup and version counts, and verify that every buyer observed only consistent versions (prices within one snapshot have the same version number).

**3. Advanced level.** Create a console application that loads a catalog from a CSV file (`SKU;name;price`) and accepts `--readers`, `--duration s`, `--update-ms`, `--updates file` (price changes), and `--help`. Measure lookup throughput for `Dictionary<TKey, TValue>` protected by `ReaderWriterLockSlim`, `ConcurrentDictionary<TKey, TValue>`, and `FrozenDictionary<TKey, TValue>` with atomic replacement; print a “structure – lookups/s – version construction time, ms” table. Report duplicate SKUs and invalid prices to the error stream; exit with code 2 if the catalog is empty.

### Variant 13. Laboratory tests {#v13}

**1. Initial level.** Create a console program that distributes 30 test samples (patient, type: blood, urine, biochemistry) among three channels by type, while three technician threads process their respective channels with different durations. Print when and by whom each sample was processed.

**2. Basic level.** Create a console program that prompts for patient count, generates 2–4 tests of different types for each patient, passes them to channels by type, and merges results by patient in `ConcurrentDictionary<int, List<Result>>` with synchronized list access. Print each patient's record with results and verify that every test was performed exactly once.

**3. Advanced level.** Create a console application that reads referrals from a CSV file (`patient;test1,test2,…`) and accepts `--lab type=count` (repeatable, for example `--lab blood=2`), `--capacity`, and `--help`. Create a bounded channel and the specified technician count for each test type; a merging stage gathers results and issues a patient's record when all their tests are ready. Print a “type – tests – average queue time – utilization” table and write patient records to files. Report unknown test types to the error stream.

### Variant 14. Weather archives {#v14}

**1. Initial level.** Create a console program that generates a CSV file with 200 000 `date;station;temperature` rows, reads it in one thread, and parses rows in four threads through `BlockingCollection<string>`, calculating each station's average temperature. Print results and processing time.

**2. Basic level.** Create a console program that prompts for a weather archive CSV path and queue capacities (for example, `10 100 1000 10000`) and processes the file for each capacity using a “read → parse (4 threads) → aggregate” pipeline. Print a “capacity – time, ms – maximum queue items” table and station average, minimum, and maximum temperatures, verified by sequential processing.

**3. Advanced level.** Create a console application that processes a directory of weather archive CSV files with `--parsers 1,2,4,8`, `--capacity 16,256,4096`, `--batch N` (pass lines in batches), and `--help`. For each parameter combination, measure the median of three runs and print a “parsers – capacity – batch – time, ms – speedup” table; write monthly station statistics to a file. Skip rows with invalid dates or temperatures outside −90…+60 °C, counting errors.

### Variant 15. Game high scores {#v15}

**1. Initial level.** Create a console program in which 8 game-server threads each submit 10 000 results (player from 50 names, score) to a shared `ConcurrentDictionary<string, int>`, retaining each player's best score through `AddOrUpdate`. Print the top ten and verify results with sequential calculation.

**2. Basic level.** Create a console program that prompts for server and result counts, stores profiles in `ConcurrentDictionary<string, Lazy<Profile>>`, where profile creation simulates a database load (100 ms, with a call counter), and updates high scores atomically. Print the ranking, created-profile count (must equal player count), and, for comparison, the factory-call count without `Lazy<T>`.

**3. Advanced level.** Create a console application for stress-testing a high-score table with `--servers`, `--players`, `--results`, `--mode lock|concurrent|lazy`, and `--help`. For each mode, run the workload, verify invariants (each player's record equals their maximum score, each profile is created once), and print a “mode – threads – time, ms – operations/s – violations” table. Exit codes: 0 if there are no violations, 3 if there are, 1 for an argument error.

### Variant 16. Call center {#v16}

**1. Initial level.** Create a console program in which a generator thread adds 40 calls (subscriber number, duration 10–100 ms) to `ConcurrentQueue<Call>`, while four operators repeatedly take calls through `TryDequeue` and “talk” for the corresponding duration. Print each operator's call count.

**2. Basic level.** Create a console program that prompts for operator and call counts and the average interval between calls, simulates a call center using `ConcurrentQueue<Call>` with arrival timestamps, and prints average and maximum waiting times, each operator's call count, and the fraction of calls waiting longer than 1 s. Operators finish when the generator is done and the queue is empty.

**3. Advanced level.** Create a console application that reads a call schedule from a CSV file (`time_ms;subscriber;duration_ms;type`) and accepts `--operators 1-10`, `--sla seconds`, and `--help`. Simulate operation for every operator count in the range and print an “operators – average wait – 95th percentile – percentage within SLA” table, plus the minimum operator count at which at least 90% of calls meet the SLA. Report malformed rows to the error stream.

### Variant 17. Intersection traffic counters {#v17}

**1. Initial level.** Create a console program in which 8 threads simulate intersection cameras, each incrementing its own car counter 50 million times (every third generated value represents a “car”). Store counters in an array of structures with one `long` field. Print time and total cars.

**2. Basic level.** Create a console program in which intersection camera threads each increment their own car counter (every third generated value represents a “car”). Prompt for camera count (1–16) and event count, and compare counters in ordinary structures with structures marked `[StructLayout(LayoutKind.Sequential, Size = 128)]`. For each version, warm up and take the median of five runs; print time, speedup relative to one thread, and a counter-total check.

**3. Advanced level.** Create a console application in which intersection camera threads count cars among `--events` generated events, each incrementing its own counter, with `--cameras 1,2,4,8,16`, `--layout plain|padded|local|all` (ordinary structures, structures padded to 128 bytes, local variables), `--csv`, and `--help`. For every camera count and counter layout, print a “cameras – time, ms – speedup – efficiency” table, write CSV, print the structure size (`Unsafe.SizeOf<T>()`), and conclude which layout is most efficient with 8 threads.

### Variant 18. File-based unit converter {#v18}

**1. Initial level.** Create a console program that reads a text file of values in inches (one per line), passes them through `BlockingCollection<string>` to a converter thread, then through a second collection to a writer thread, which writes centimeter values to a new file. Print the converted line count.

**2. Basic level.** Create a console program that prompts for input and output files and converter count, reads `value unit` lines (in, ft, mi, lb, °F), and converts them to metric units through a channel-based “read → convert → write” pipeline. Output line order must match input order (pass the line number with the value; the writer orders results). Print statistics by unit and the invalid line count.

**3. Advanced level.** Create a `convert` console application with `input_file output_file` arguments and `--to metric|imperial`, `--workers`, `--capacity`, `--errors file`, and `--help`. A bounded-channel pipeline preserves line order, writes unrecognized lines to an error file with numbers and reasons, and completes all stages even if a converter throws an exception (`Complete` with an exception). Print a “unit – lines – converted” table and the time; exit with code 2 if the error rate exceeds 10%.

### Variant 19. Auction {#v19}

**1. Initial level.** Create a console program in which 5 bidder threads write bids (participant, amount) to a `Channel<Bid>` for 2 s, while an auctioneer thread reads them, accepts only bids above the current highest, and prints the winner and accepted and rejected bid counts after channel closure.

**2. Basic level.** Create a console program that prompts for bidder count, starting price, bid increment, and auction duration in seconds. Send timestamped bids through a channel to the auctioneer; bids created after the auction ends are late and rejected. Print accepted bid history, the winner, and rejected bid counts by reason (amount too low, late bid).

**3. Advanced level.** Create a console application running several item auctions simultaneously (items from a CSV file `item;starting_price;increment;duration_s`), with `--bidders`, `--seed`, `--log file`, and `--help`. Each item has its own bid channel and auctioneer; participants strategically bid on several items within their budgets. Print an “item – winner – price – bids – late bids” table and verify that no participant exceeds their budget. Report invalid item rows to the error stream.

### Variant 20. Lock-free task stack {#v20}

**1. Initial level.** Create a console program with a lock-free Treiber stack using `Interlocked.CompareExchange`, to which 4 threads each push 100 000 tasks (numbers), then 4 threads pop them. Verify that the count and sum of popped numbers equal those pushed.

**2. Basic level.** Create a console program that prompts for thread and operation counts and runs a mixed workload (50% `Push`, 50% `TryPop`) on a Treiber stack and `ConcurrentStack<T>`. The Treiber stack counts failed CAS attempts. Print a “stack – time, ms – operations/s – CAS retries” table and verify that no element was lost or popped twice.

**3. Advanced level.** Create a console BenchmarkDotNet application comparing a Treiber stack, `ConcurrentStack<T>`, and `Stack<T>` protected by `Lock`, using 1, 2, 4, and 8 threads and `Push`/`TryPop` ratios of 90/10, 50/50, and 10/90. The `--verify` mode runs a stress test without BenchmarkDotNet, checking invariants for every implementation (count, sum, no duplicates), and exits with code 3 on violation. Print a results table and briefly explain when the lock-free stack wins.

### Variant 21. Library loans {#v21}

**1. Initial level.** Create a console program that stores book loans in an `ImmutableDictionary<string, string>` mapping books to borrowers. Four librarian threads loan and return books through `ImmutableInterlocked.TryAdd` and `ImmutableInterlocked.TryRemove`. Print the final state and the number of successful and rejected operations.

**2. Basic level.** Create a console program that prompts for the number of books, borrowers, and operations and simulates loans in multiple threads using an immutable dictionary. Each successful change adds a state version to an immutable history stack (`ImmutableInterlocked.Push`). After the simulation, let the user enter a version number and display the loan state at that point. Also verify that no book was ever loaned to two borrowers at once.

**3. Advanced level.** Create a library console application with commands in a scenario file (`loan book borrower`, `return book`, `rollback N`) and the options `--threads`, `--snapshot-every N`, and `--help`. Multiple threads execute the scenario, state updates are atomic, and the `rollback` command restores the state from N versions earlier without losing later history entries. Print a “borrower – books held” table, the version count, and the history size. Send invalid commands to the error stream.

### Variant 22. Downloading video segments (simulation) {#v22}

**1. Initial level.** Create a console program in which a downloader thread “receives” 100 video segments (a 5 ms delay) and writes them to a bounded channel with capacity 8, while a decoder consumer takes 20 ms to process each segment. Print how many times the downloader waited for space in the channel (`WaitToWriteAsync` after a failed `TryWrite`) and the total time.

**2. Basic level.** Create a console video player simulation that prompts for the segment count, channel capacity, and segment download and decoding times. The downloader writes segments to a bounded channel, and the decoder reads them. Print average and maximum channel occupancy, total downloader wait time, and the number of “playback stalls” (the decoder waited more than 50 ms for a segment).

**3. Advanced level.** Create a console video player simulation in which a downloader writes `--segments` segments to a bounded channel with a random `--download-ms min-max` delay, and `--decoders` decoders read them. For each capacity in `--capacity 2,4,8,16,32`, print a “capacity – playback stalls – average occupancy – segment memory, MB – time, s” table and recommend the smallest capacity with no stalls. Include `--seed` and `--help`; report invalid ranges to the error stream and exit with code 1.

### Variant 23. Server monitoring {#v23}

**1. Initial level.** Create a console program in which 3 server threads write a CPU usage metric (a random value from 0–100%) to a channel every second for 10 s. A consumer prints each value and a message if usage exceeds 90%.

**2. Basic level.** Create a console program that prompts for the server count, moving average window size, and threshold, passes metrics through a channel, and calculates a moving average for each server. Generate an alert only when the moving average exceeds the threshold; alert again only after it has returned below the threshold. Print an alert log and a “server – average – maximum – alerts” table.

**3. Advanced level.** Create a monitoring console application with the options `--servers`, `--metrics cpu,ram,disk`, `--window`, `--threshold metric=value`, `--duration`, and `--help`. Pass each metric type through a separate channel to its own analyzer, and alerts through a shared channel to a logging thread that writes them to a file and the screen. Finally, print a “server – metric – average – 95th percentile – alerts” table. Shut down every stage gracefully when **Ctrl+C** is pressed.

### Variant 24. Parcel sorting {#v24}

**1. Initial level.** Create a console program in which 4 sorter threads process 1 000 parcels from a `ConcurrentQueue<Parcel>` and place them in the `ConcurrentBag<Parcel>` for the corresponding region (North, South, East, West, Central). Print the parcel count for each region and verify the total.

**2. Basic level.** Create a console program that prompts for parcel and sorter counts, sorts parcels into a `ConcurrentBag<Parcel>` for each region, then starts couriers for each region in proportion to its parcel count. Couriers take parcels using `TryTake`. Print a “region – parcels – couriers – parcels per courier” table and verify that every parcel was delivered once.

**3. Advanced level.** Create a console application that reads parcels from a CSV file (`number;region;weight`) and accepts the options `--sorters`, `--couriers`, `--balance none|proportional|steal`, and `--help`. In `steal` mode, an idle courier takes parcels from other regions' bags. For each mode, print delivery time, the maximum and minimum parcel counts per courier, and the load imbalance coefficient. Report unknown regions to the error stream.

### Variant 25. Payment processing {#v25}

**1. Initial level.** Create a console program in which a producer thread adds 100 payments to a `BlockingCollection<Payment?>`, followed by one `null` value (a “poison pill”) for each of three consumers. A consumer stops when it receives `null`. Print each consumer's payment count and sum, and the overall sum.

**2. Basic level.** Create a console program that prompts for producer, consumer, and payment counts and implements completion in two ways: poison pills and `CompleteAdding`. Add poison pills only after all producers finish. For each approach, print the processed payment count, total sum, and whether all consumers finished within 5 s (`Join` with a timeout).

**3. Advanced level.** Create a console application that processes payments from a file (`account;amount;currency`) with the options `--consumers`, `--capacity`, `--fail-rate %`, and `--help`. A consumer may throw an exception for an individual payment (a simulated failure): that payment goes to a retry queue, then to a rejected payments file after three failures. Guarantee that all consumers finish even after exceptions (`try/finally`), and print a “currency – payments – sum – retries – rejected” table and a report reconciling the sums.

### Variant 26. Synonym dictionary {#v26}

**1. Initial level.** Create a console program that builds a synonym dictionary of 5 000 words as an `ImmutableDictionary<string, string[]>` and runs 500 000 random word lookups on each of 8 threads. Print lookup time and the number of words found.

**2. Basic level.** Create a console program that prompts for word and thread counts and compares synonym lookup speed for `ImmutableDictionary<TKey, TValue>`, `ConcurrentDictionary<TKey, TValue>`, and `FrozenDictionary<TKey, TValue>` while a separate thread adds a new word every 100 ms (using `ImmutableInterlocked.AddOrUpdate` for the immutable dictionary and rebuilding the frozen dictionary). Print a “structure – lookups/s – updates” table.

**3. Advanced level.** Create a console application that loads a synonym dictionary from a file (`word: synonym1, synonym2`) and measures synonym lookup throughput for `ImmutableDictionary<TKey, TValue>`, `ConcurrentDictionary<TKey, TValue>`, and `FrozenDictionary<TKey, TValue>` with the options `--readers 1,2,4,8`, `--write-ratio 0,1,10` (percentage of writes), `--duration`, and `--help`. Print a table highlighting the best structure for each read/write ratio. Merge duplicate words, skip empty lines, and report format errors to the error stream.

### Variant 27. Regional vote counter {#v27}

**1. Initial level.** Create a console program in which 8 threads (one per region) count votes for three candidates in an array of 80 million ballots (seed 5), incrementing fields of a shared `RegionVotes { long A, B, C; }` structure in an array of regions. Print the candidates' results and the time.

**2. Basic level.** Create a console program that prompts for ballot and region counts and counts votes in three ways: structure fields in a shared array, padded structures (`StructLayout` with a size of 128 bytes), and local variables written back at the end. Print a “method – time for 1, 2, 4, 8 threads” table and verify that all methods produce the same results.

**3. Advanced level.** Create a console application that reads ballots from a binary file (one byte for candidate 0–9, generated with `--generate N`) and accepts the options `--regions 1,2,4,8,16`, `--method shared|padded|local|all`, `--runs`, and `--help`. Print a “method – regions – median, ms – speedup – efficiency” table, identify the method whose efficiency drops below 50% with 8 threads, and print the final election results with percentages. Count corrupt bytes (values outside 0–9) separately.

### Variant 28. Electronic school gradebook {#v28}

**1. Initial level.** Create a console program that generates 1 000 grade records in the form `class;student;subject;grade`, passes them through a `BlockingCollection<string>` to two validation threads (grades 1–12), and places valid records in a `ConcurrentBag<Grade>`. Print the valid and invalid line counts.

**2. Basic level.** Create a console program that prompts for the path to a grades CSV file and the validator count, imports grades through a channel-based “read → validate → aggregate” pipeline, and prints a “class – subject – average grade – grade count” table and errors with line numbers (empty name, grade outside 1–12, unknown subject).

**3. Advanced level.** Create a console application that imports grades from several files (one per class) with the options `--subjects file`, `--validators N`, `--report directory`, and `--help`. A bounded-channel pipeline validates grades, aggregates them by student and subject, and writes a report file for each class: students' average grades, subject averages, and the five best students. Print a class summary table and error counts by type; return code 2 if more than 5% of lines are invalid.

### Variant 29. Cryptocurrency price exchange (simulation) {#v29}

**1. Initial level.** Create a console program in which an exchange thread writes quotes (currency, price) without delays for 3 s using `TryWrite` on a channel with capacity 100 and `DropOldest` mode. A consumer takes 1 ms to process a quote. Print the numbers of generated, processed, and lost quotes and the latest price.

**2. Basic level.** Create a console program that prompts for the currency count, quote rate, channel capacity, and consumer delay, simulates a quote stream in `DropOldest` mode, and counts lost quotes using an `itemDropped` delegate. Print a “currency – generated – processed – lost, % – latest price” table and verify that each currency's last processed price matches its last generated price.

**3. Advanced level.** Create a console application with the options `--pairs BTC,ETH,…`, `--rate`, `--capacity`, `--mode DropOldest|DropNewest|DropWrite|Wait`, `--consumer-ms`, `--duration`, and `--help`. For each mode, simulate the exchange and calculate quote “staleness” (the difference between processing and creation times). Print a “mode – lost, % – average staleness, ms – maximum staleness, ms” table and explain which mode is best for displaying current prices.

### Variant 30. Report generation {#v30}

**1. Initial level.** Create a console program in which a producer thread adds 50 report generation jobs (duration 20–200 ms) to a `BlockingCollection<ReportJob>` and a pool of three threads processes them. Print the queue length and completed job count every second.

**2. Basic level.** Create a console program that prompts for the job count, minimum and maximum pool sizes, and queue length threshold. A supervisor thread checks the queue length every 200 ms: if it exceeds the threshold, start another worker (up to the maximum); if the queue is empty, stop an extra worker (down to the minimum) using a separate signal. Print a log of pool size changes and the average job wait time.

**3. Advanced level.** Create a console application with the options `--min`, `--max`, `--scale-up queue`, `--scale-down queue`, `--jobs file.csv` (`time_ms;type;duration_ms`), and `--help` that simulates a reporting service with an adaptive consumer pool reading from a bounded channel. Compare fixed pools of the minimum and maximum sizes with the adaptive pool. Print a “strategy – average wait – 95th percentile – thread-seconds” table and a text chart of queue length; exit with code 1 for argument errors.

## Procedure

1. Study the theory and worked examples.
2. For your variant, identify shared data, producers and consumers, pipeline stages, queue capacities, and the completion mechanism; draw a data flow diagram.
3. Create a console project in JetBrains Rider (.NET 10) and implement the task at your chosen difficulty level using thread-safe collections or channels.
4. Compare the result with a sequential version, verify completion with any number of producers and consumers, measure Release-mode execution time for different thread counts, and check the program for false sharing.
5. Demonstrate the program to your instructor, explain your choice of data structures and measurement results, and answer the review questions.
