---
title: "Tasks"
description: "Topic 9. Multithreading in C++: task variants"
outline: [2, 3]
sourceHash: "32341a27934f82713a205dc8ecdd193214b58f76b9958ed3b19dbb43b26adf74"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Parallel sorting of a phone book {#v1}

**1. Initial level.** Create a C++ console program that generates 2,000,000 phone book entries (a last name of 8 random letters and a number, a `std::mt19937` generator with a fixed seed), sorts them by last name with `std::sort` calls using the `std::execution::seq` and `std::execution::par` policies, and prints the time of both variants and whether the results are identical.

**2. Basic level.** Create a C++ console program that prompts for the number of phone book entries (10,000 to 10,000,000) and the number of threads $p$ (1 to `hardware_concurrency()`), validates the input, generates the entries (a random last name and number), and sorts them by last name in three ways: `std::sort` sequentially, `std::sort` with `std::execution::par`, and sorting $p$ parts in `std::jthread` threads followed by merging with `std::inplace_merge`. The program checks that the result is sorted and prints a time and speedup table.

**3. Advanced level.** Create a CMake project (`CMakePresets.json` with debug and release presets, the `Threads::Threads` target, and `TBB::tbb` if available) with a `phonesort` program that reads a phone book from a CSV file (`last_name;first_name;number`) given as an argument and accepts the options `--threads 1,2,4,8`, `--runs <n>`, `--out <file>`, and `--help`. The program sorts the entries by last name and first name with its own parallel merge sort for each thread count and with `std::sort` with `par`, prints a table of median times, speedup, and efficiency, and writes the sorted file. Format errors (with the line number) are written to `stderr`; exit codes: 0 – success, 1 – arguments, 2 – file.

### Variant 2. Numerical integration {#v2}

**1. Initial level.** Create a C++ console program that computes the integral of the function $4 / (1 + x^{2})$ on the segment $[ 0 , 1 ]$ by the midpoint rule with $n$ = 200,000,000 segments, splitting them into parts for 8 `std::jthread` threads, and prints the approximate value of $\pi$, the error, and the time of the sequential and parallel computations.

**2. Basic level.** Create a C++ console program that prompts for the integration limits $a \lt b$ and the number of segments $n$ (1000 to $10^{9}$) and offers a menu of three functions. The program validates the input, computes the integral by Simpson’s rule in $p = 1 , 2 , 4 , 8 , 16$ `std::jthread` threads (each thread writes its result only to its own cell), and prints a table: $p$, the value, the median time of three runs, the speedup $S$, and the efficiency $E$.

**3. Advanced level.** Create a CMake project with a `CMakePresets.json` file (debug, release, and tsan presets, the latter with the `-fsanitize=thread` flag) and an `integrate` program that accepts the options `--function sin|exp|poly`, `--from`, `--to`, `--n`, `--threads 1,2,4,8,16`, `--csv <file>`, and `--help`. The program computes the integral sequentially and in parallel, prints a table of $p$, $T_{p}$, $S$, $E$, and the Karp–Flatt metric, writes a CSV, and checks the deviation from the sequential result (at most $10^{- 9}$; otherwise, exit code 3). Argument errors are written to `stderr` with exit code 1.

### Variant 3. Processing PGM images {#v3}

**1. Initial level.** Create a C++ console program that reads an image in PGM (P5) format whose path the user enters, applies a 3×3 median filter, dividing the rows among `hardware_concurrency()` `std::jthread` threads, writes the result to the file `median.pgm`, and prints the image dimensions and the processing time.

**2. Basic level.** Create a C++ console program that reads a PGM (P5) image and the median filter window size (an odd number from 3 to 15), validates the file and the input, and processes the image in three ways: sequentially, with `std::jthread` threads over rows, and with `std::for_each` with `std::execution::par` over row indices. The program checks that the results match byte for byte and prints a time and speedup table.

**3. Advanced level.** Create a CMake project with a `pgmfilter` program that accepts the arguments `input.pgm output.pgm` and the options `--filter median|blur|sobel`, `--size <window>`, `--threads 1,2,4,8`, `--policy threads|par`, and `--help`. The program runs the filter for each thread count, prints a table of the median time of three runs, $S$, and $E$, saves the result, and checks that it matches the sequential version. PGM format errors are written to `stderr` with exit code 2, and argument errors with code 1.

### Variant 4. A document print queue {#v4}

**1. Initial level.** Create a C++ console program in which 3 “printer” threads take print jobs from a queue protected by `std::mutex` and `std::condition_variable`. The main thread queues 20 documents with a random number of pages (1–10); printing a page is simulated by a 20 ms delay. The program prints which printer printed each document and the total time.

**2. Basic level.** Create a C++ console program that simulates queued document printing in a thread pool built on `std::jthread`, `std::condition_variable`, and `std::packaged_task` with a `submit` method that returns a `std::future`. The user enters the number of printers (1–8) and documents as “name page\_count” until an empty line, with input validation; printing a page is simulated by a delay. Each job returns its printing time; the program prints a table of documents with their queue waiting and printing times, the averages, and the total time.

**3. Advanced level.** Create a CMake project with a `printqueue` program that reads jobs from a CSV file (`arrival_ms;name;pages;priority`) and simulates printing in a thread pool with a priority queue (`std::priority_queue` under a mutex). Options: `--printers <n>`, `--page-ms <ms>`, `--report <file>`, and `--help`. The program shuts down the pool correctly (all jobs done, threads joined), prints a table of documents and statistics (average and maximum wait by priority, the load of each printer), and writes a report. File errors go to `stderr`; exit codes 0/1/2.

### Variant 5. The Monte Carlo method for the area of a shape {#v5}

**1. Initial level.** Create a C++ console program that estimates the area of a circle of radius 1 by the Monte Carlo method from 100,000,000 random points in 8 `std::jthread` threads; each thread has its own `std::mt19937_64` generator with a different seed. The program prints the area estimate, the error compared with $\pi$, and the time.

**2. Basic level.** Create a C++ console program that estimates the area of the shape defined by the inequality $x^{2} / a^{2} + y^{2} / b^{2} \le 1$ (an ellipse) for user-entered $a$, $b$ (positive) and number of points $N$ (from $10^{6}$ to $10^{9}$). The generators are declared `thread_local`. For $p = 1 , 2 , 4 , 8 , 16$ threads, the program prints the estimate, the relative error compared with $\pi a b$, the time, and the speedup.

**3. Advanced level.** Create a CMake project with a `montecarlo` program that estimates the area of a polygon whose vertices are read from a file (one coordinate pair per line), within its bounding rectangle. Options: `--points <N>`, `--threads 1,2,4,8`, `--seed <number>`, `--runs <n>`, and `--help`. The program computes the exact area by the shoelace (Gauss) formula, prints for each thread count the estimate, the relative error, the median time, $S$, and $E$, and checks that the result with the same seed does not depend on the number of runs. File or argument errors go to `stderr` with codes 2 and 1.

### Variant 6. Bank transfers in C++ {#v6}

**1. Initial level.** Create a C++ console program with an account class (number, balance, `std::mutex`) in which 4 threads each perform 100,000 random transfers among 10 accounts using `std::scoped_lock` for the two mutexes. The program prints the account balances and checks that the total amount has not changed.

**2. Basic level.** Create a C++ console program that prompts for the number of accounts (2–1000), the number of threads (1–16), and the number of transfers per thread, performs the transfers in two ways – locking the mutexes in account number order and with `std::scoped_lock` – and prints for each way the time, the number of rejected transfers (insufficient funds), and the result of checking the total amount.

**3. Advanced level.** Create a CMake project with a `tsan` preset (`-fsanitize=thread -g`) and a `bank` program that reads accounts from a CSV file and accepts the options `--threads`, `--transfers`, `--seed`, `--mode mutex|scoped|atomic-total`, and `--help`. The program performs a transfer stress test, keeps an operation log in a thread-safe container, prints a table of modes with the time and throughput (transfers per second), and writes the final balances. The report includes the output of a `tsan` build run without warnings. A violation of the total amount invariant uses exit code 3.

### Variant 7. Finding prime numbers {#v7}

**1. Initial level.** Create a C++ console program that counts the primes up to 20,000,000, dividing the range into 8 parts, each processed by a `std::async` task with the `std::launch::async` policy, and prints the number of primes in each part, the total count, and the time.

**2. Basic level.** Create a C++ console program that prompts for the upper limit (up to $10^{9}$) and the number of parts, validates the input, and counts the primes in three ways: sequentially, with `std::async` with the `launch::async` policy, and with the `launch::deferred` policy. The program prints a time and speedup table and an explanatory message about why the `deferred` policy gives no speedup.

**3. Advanced level.** Create a CMake project with a `primes` program that counts the primes in the range `--from`…`--to` using a segmented sieve of Eratosthenes, where each segment is processed by a `std::async` task. Options: `--segment <size>`, `--tasks 1,2,4,8,16`, `--list <file>` (write the primes), and `--help`. The program prints a “number of tasks – time – $S$ – $E$” table, checks that the count matches the sequential sieve, and reports the best segment size. Argument errors go to `stderr` with exit code 1.

### Variant 8. Seismic sensor statistics {#v8}

**1. Initial level.** Create a C++ console program that generates 50,000,000 seismic sensor readings (normal distribution, fixed seed) and computes the mean value and the mean square amplitude with `std::transform_reduce` using the `seq` and `par_unseq` policies, printing the results and the time.

**2. Basic level.** Create a C++ console program that reads sensor readings (an array of `float`) from a binary file whose path the user enters and computes the minimum, maximum, mean, standard deviation, and the number of values above a given threshold with the `std::reduce`, `std::transform_reduce`, `std::count_if`, and `std::minmax_element` algorithms using all four execution policies. The program prints a time table and checks that the results are identical.

**3. Advanced level.** Create a CMake project that links `TBB::tbb` for GCC, with a `seismo` program that processes a directory of binary sensor files: for each file, it computes statistics and the number of “events” (windows with energy above a threshold) with parallel algorithms. Options: `--dir`, `--threshold`, `--window`, `--policy seq|unseq|par|par_unseq|all`, `--csv`, and `--help`. The program prints a table of files and a table of policy times, writes a CSV, and warns in `stderr` if the backend of the parallel algorithms is sequential (TBB was not found at build time).

### Variant 9. Matrix operations {#v9}

**1. Initial level.** Create a C++ console program that multiplies two 1000×1000 square matrices (fixed seed) sequentially and in 8 `std::jthread` threads over rows of the result, and prints the time of both variants, the speedup, and the maximum element difference.

**2. Basic level.** Create a C++ console program with its own thread pool (`std::jthread`, `std::condition_variable`, `std::packaged_task`) that prompts for the matrix size (100–3000) and the block size, validates the input, and multiplies the matrices with a blocked algorithm: each block is a separate pool task. The program compares the time of ordinary and blocked multiplication for 1, 2, 4, 8, and 16 threads and prints a speedup table.

**3. Advanced level.** Create a CMake project with a `matrix` library target (a matrix class and algorithms) and a `matbench` program that accepts the options `--sizes`, `--blocks`, `--threads`, `--op mul|transpose|inverse`, and `--help`. The operations run in a thread pool, the results are checked against sequential ones, and a “size – block – threads – time – $S$ – $E$” table is printed and written to CSV. The targets in `CMakeLists.txt` are defined with `add_library` and `target_link_libraries`; argument errors go to `stderr` with exit code 1.

### Variant 10. A parking lot with sensors {#v10}

**1. Initial level.** Create a C++ console program in which 20 car threads try to enter a parking lot with 5 spaces limited by a `std::counting_semaphore`; each car stays for a random time of 50–200 ms. The program prints an “entered / left” event log with the number of free spaces and the total time.

**2. Basic level.** Create a C++ console program that prompts for the number of spaces (1–100), the number of cars, and the maximum time to wait for entry. A car uses `try_acquire_for` and drives away if a space does not become free in time. The event log is kept under a mutex with a timestamp from the start; at the end, the program prints the number of cars served and of cars that drove away, and the average waiting time.

**3. Advanced level.** Create a CMake project with a `parking` program that simulates a multilevel parking garage (a separate semaphore per level) according to a scenario from a CSV file (`arrival_time;number; duration`). Options: `--levels 10,20,15`, `--patience <ms>`, `--speed <multiplier>`, `--log <file>`, and `--help`. The program writes an event log, prints a report with the load of each level, peak occupancy, refusals, and the average wait, and checks that the number of occupied spaces never exceeded the capacity. Errors go to `stderr`; exit codes 0/1/2.

### Variant 11. The Game of Life {#v11}

**1. Initial level.** Create a C++ console program that simulates 500 generations of the Game of Life on a 1000×1000 board (30% random fill, fixed seed) in 4 `std::jthread` threads that process horizontal stripes of the board, and prints the number of live cells after every hundredth generation and the time.

**2. Basic level.** Create a C++ console program that simulates Conway’s Game of Life on a board with a random initial fill. The program prompts for the board size and the number of generations and threads; the worker threads process stripes of the board throughout the simulation and synchronize between generations with a `std::barrier` (swapping the boards after all stripes have been processed). The program checks that the result matches the sequential version and prints a time and speedup table for 1, 2, 4, and 8 threads.

**3. Advanced level.** Create a CMake project with a `life` program that simulates Conway’s Game of Life in parallel (threads process stripes of the board), reading the initial state from a file in RLE or text format (`.` and `O`). Options: `--generations`, `--threads`, `--weak <size per thread>`, `--snapshot <step>`, `--help`. In `--weak` mode, the board size grows in proportion to the number of threads, and the program prints a weak scaling table (the time should stay constant). Board snapshots are written to PGM files. File errors go to `stderr` with exit code 2.

### Variant 12. Counting words in files {#v12}

**1. Initial level.** Create a C++ console program that counts the words in each of the text files whose paths are passed as command-line arguments, starting a separate thread for each file that returns its result through a `std::promise`, and prints a “file – words” table and the total count.

**2. Basic level.** Create a C++ console program that processes all `.txt` files in a directory entered by the user: each `std::async` task builds a word frequency dictionary (`std::unordered_map`, words in lowercase), and the main thread merges the dictionaries and prints the 20 most frequent words. File read errors are passed through the `future` and written to the error stream without stopping the processing of other files.

**3. Advanced level.** Create a CMake project with a `wordfreq` program that accepts a directory and the options `--threads <n>`, `--top <k>`, `--min-length <n>`, `--stop-words <file>`, `--csv <file>`, and `--help`. The files are distributed among $n$ threads through a shared queue, and the partial dictionaries are merged at the end. The program prints the most frequent words and the number of files, words, and the time for each thread count in the list, checks that the frequencies match a sequential count, and writes a CSV. Exit codes 0/1/2.

### Variant 13. The Newton fractal {#v13}

**1. Initial level.** Create a C++ console program that builds the Newton fractal for the equation $z^{3} - 1 = 0$ on a 1200×1200 image using `std::for_each` with the `std::execution::par` policy over row numbers and writes the image to a PPM file, printing the build time.

**2. Basic level.** Create a C++ console program that builds the Newton fractal (the basins of attraction of the roots of $z^{n} - 1 = 0$ under Newton’s method) and writes it to a PPM file. The program prompts for the image size, the degree $n$ (3 to 8), and the maximum number of iterations, validates the input, builds the fractal sequentially, with `par`, and with `par_unseq`, and prints a time and speedup table, checking that the images match byte for byte.

**3. Advanced level.** Create a CMake project with a `newton` program that builds the Newton fractal for $z^{n} - 1 = 0$ (image rows in parallel, `std::for_each` with an execution policy) and writes PPM files. Options: `--size WxH`, `--degree`, `--iterations`, `--region x1,y1,x2,y2`, `--policy`, `--frames <n>`, `--help`. The `--frames` mode builds a series of frames with a gradually increasing zoom: frames sequentially, the rows of a frame in parallel. The program prints a table of frame times and the overall speedup and warns if the parallel algorithms were built without TBB. Errors go to `stderr` with exit code 1.

### Variant 14. Caching results {#v14}

**1. Initial level.** Create a C++ console program with a cache class for computed function values (`std::map` under `std::shared_mutex`) in which 8 reader threads and 1 writer thread access the cache for 2 s. The program prints the number of reads and writes performed.

**2. Basic level.** Create a C++ console program with a cache of computed function values (`std::map`) that threads access with reads and writes. The program compares the throughput of the cache with `std::mutex` and with `std::shared_mutex` for a user-entered number of threads (1–16) and test duration, and prints a “mode – operations per second – cache hit ratio” table for write shares of 1, 10, and 50%.

**3. Advanced level.** Create a CMake project with an `lrucache` program that implements a thread-safe, size-limited LRU cache with sharding (several parts, each with its own `shared_mutex`). Options: `--capacity`, `--shards 1,4,16`, `--threads 1,2,4,8,16`, `--write-ratio`, `--seconds`, and `--help`. The program prints a table of throughput and hit ratio for each combination, checks the cache size invariant, and writes a CSV. A build with `-fsanitize=thread` must produce no warnings.

### Variant 15. Merge sort {#v15}

**1. Initial level.** Create a C++ console program that sorts 10,000,000 random integers with a recursive merge sort in which the two halves at the top three levels of recursion are sorted in parallel through `std::async`, and prints the time, the speedup compared with the sequential version, and a sortedness check.

**2. Basic level.** Create a C++ console program that sorts an array of random integers with a recursive merge sort in which the halves are sorted in parallel by `std::async` tasks down to a given recursion depth. The program prompts for the array size, validates the input, prints a time table for depths 0–6 and a comparison with `std::sort` and `std::stable_sort`, and checks that the result matches `std::sort`.

**3. Advanced level.** Create a CMake project with a `mergesort` program that sorts data from a binary or text file (`--input`) and accepts the options `--depth`, `--cutoff <size for sequential sorting>`, `--runs`, `--csv`, and `--help`. The program prints a “depth – cutoff – median time – $S$” table, finds the best combination, writes a CSV for plotting the speedup, and checks the stability of sorting records. Errors go to `stderr` with codes 1 and 2.

### Variant 16. Simulating a bank queue {#v16}

**1. Initial level.** Create a C++ console program in which 3 teller threads (`std::jthread`) serve customers from a queue (`std::mutex` and `std::condition_variable`), while a customer generator adds a customer every 30 ms. After 3 s, the main thread calls `request_stop()`, the tellers finish the current service, and the program prints the number of customers served by each teller.

**2. Basic level.** Create a C++ console program that prompts for the number of tellers, the mean customer arrival interval and mean service duration (ms), and the simulation duration. The tellers wait for customers in `std::condition_variable_any::wait` with a `std::stop_token`. The program prints the average and maximum queue waiting time, the maximum queue length, and the tellers’ utilization.

**3. Advanced level.** Create a CMake project with a `bankqueue` program that accepts the options `--tellers 1,2,3,4`, `--arrival <ms>`, `--service <ms>`, `--duration <s>`, `--vip <share>`, and `--help`. VIP customers are served first. For each number of tellers, the program prints a table of waiting statistics (mean, 95th percentile, maximum) separately for VIP and regular customers and recommends the minimum number of tellers at which the average wait does not exceed 2 arrival intervals. Threads are stopped only through a `stop_token`.

### Variant 17. An event counter {#v17}

**1. Initial level.** Create a C++ console program in which 8 threads each increment a shared counter 5,000,000 times in three ways: without synchronization, under a `std::mutex`, and through `std::atomic<long long>`, and prints the resulting values and the time of each way.

**2. Basic level.** Create a C++ console program that prompts for the number of threads and the number of events per thread and compares four ways of counting: a shared `std::atomic`, an array of `std::atomic` with one per thread (adjacent elements), the same array aligned with `alignas(std::hardware_destructive_interference_size)`, and local counters with one addition at the end. The program prints a time table and explains the effect of false sharing.

**3. Advanced level.** Create a CMake project with a `counters` program that measures the throughput of event counters of different types (`mutex`, `atomic`, `padded`, `local`) for thread counts `--threads 1,2,4,8,16` and a duration of `--seconds`. The program prints a “method – threads – events per second – scalability” table, writes a CSV, and prints the cache line size and the `sizeof` of the counter structures. Option `--help`; argument errors go to `stderr` with exit code 1; a `tsan` build must produce no warnings for the correct methods.

### Variant 18. Hashing files {#v18}

**1. Initial level.** Create a C++ console program that computes the FNV-1a checksum (64 bits) of each file whose path is passed as a command-line argument, using `std::packaged_task` objects run in separate threads, and prints a “file – size – hash” table in hexadecimal.

**2. Basic level.** Create a C++ console program with a thread pool (the user enters its size) that computes the FNV-1a hash of all files in an entered directory recursively. Each job returns a `std::future` with a result structure; files that could not be read pass an exception through the `future`. The program prints a table of hashes, a list of errors, and the total volume and speed (MB/s).

**3. Advanced level.** Create a CMake project with a `hashdir` program that accepts a directory and the options `--threads`, `--block <KB>`, `--verify <file>`, and `--help`. Without `--verify`, the program writes a `path;size;hash` manifest to standard output; with it, the program compares the current hashes with the manifest and prints the changed, new, and deleted files. Large files are divided into blocks that are hashed by pool tasks, and the block hashes are combined. Exit codes: 0 – match, 4 – changes found, 1/2 – argument and file errors.

### Variant 19. The n-queens problem {#v19}

**1. Initial level.** Create a C++ console program that counts the solutions to the 12-queens problem, starting a separate `std::async` task for each position of the queen in the first row, and prints the number of solutions for each position, the total number, and the time.

**2. Basic level.** Create a C++ console program that counts the solutions to the $n$-queens problem. The program prompts for $n$ (4 to 16) and the split depth (the first 1 or 2 rows), validates the input, and distributes the placement prefixes among `std::jthread` threads through an atomic index of the next task. The program prints the number of solutions, the time, and the speedup for 1, 2, 4, 8, and 16 threads and checks that the count matches a sequential search.

**3. Advanced level.** Create a CMake project with a `queens` program that counts the solutions to the $n$-queens problem in parallel by a bitmask search, distributing the placement prefixes among threads. Options: `--n`, `--prefix-depth`, `--threads`, `--first` (find the first solution and stop all threads through a `std::stop_source`), `--print`, `--help`. The program prints a time table for different prefix depths and thread counts; in `--first` mode, it prints the board of the solution found and the time until all threads stop. Argument errors go to `stderr` with exit code 1.

### Variant 20. Highway traffic {#v20}

**1. Initial level.** Create a C++ console program in which 6 sensor threads get ready to work (a random initialization delay) and start measuring simultaneously after a `std::latch`; each generates 1000 speed readings, and the main thread waits for them to finish through a second `std::latch` and prints the average speed at each sensor.

**2. Basic level.** Create a C++ console program that prompts for the number of sensors and the measurement duration, starts the sensors simultaneously through a `std::latch`, and every second the sensors pass the number of cars and the average speed to an aggregator through a protected queue. The aggregator prints a per-second table and the overall traffic intensity, marking the seconds with traffic jams (average speed below 30 km/h).

**3. Advanced level.** Create a CMake project with a `highway` program that reads a description of highway sections from a file (`section;length_km;limit_kmh`) and sensor logs from a directory. The sensors are processed by threads with a simultaneous start (`std::latch`) and per-minute phases (`std::barrier`). Options: `--from`, `--to`, `--jam-speed`, `--csv`, and `--help`. The program prints a report by section (intensity, average speed, minutes of jams), writes a CSV, and reports incomplete logs in `stderr`.

### Variant 21. Lexicographic permutations {#v21}

**1. Initial level.** Create a C++ console program that generates all permutations of a string of 11 distinct letters, dividing the work among threads by the first letter (a separate thread for each letter, `std::next_permutation` for the rest), and prints the total number of permutations and the time.

**2. Basic level.** Create a C++ console program that prompts for a string (up to 13 characters, repetitions allowed) and the number of threads, distributes the permutations among threads by the prefix of the first character, and counts the permutations that are palindromes or match an entered pattern. The program checks the number of permutations against the multiset formula and prints a time table for 1, 2, 4, and 8 threads.

**3. Advanced level.** Create a CMake project with a `permute` program that accepts a string and the options `--threads`, `--prefix <length>`, `--output <file>`, `--from <index> --count <k>`, and `--help`. The program computes the lexicographic index of each prefix in order to generate the required range of permutations in parallel and write it to the file in the correct order (each thread writes to a buffer, and the buffers are merged). Sortedness and the absence of duplicates are checked; errors go to `stderr` with codes 1/2.

### Variant 22. Evaluating the integrals of several functions {#v22}

**1. Initial level.** Create a C++ console program that computes the integrals of five functions defined in the program on the segment $[ 0 , 1 ]$ by the trapezoidal rule with $10^{8}$ segments, running each computation as a `std::async` task, and prints a “function – value – time” table.

**2. Basic level.** Create a C++ console program that, for functions with known antiderivatives (chosen from a menu) and entered limits, computes the integrals by the rectangle, trapezoidal, and Simpson rules for $n = 10^{3} … 10^{8}$; each combination is a task with its result in a `std::future`. The program prints a table of values, absolute errors, and times, and the total time of the parallel and sequential computation of the whole table.

**3. Advanced level.** Create a CMake project with a `quadrature` program that reads integration jobs from a file (`function;a;b;tolerance`) and computes each integral by the adaptive Simpson method, in which the recursive halves of a segment run as `std::async` tasks down to a given depth. Options: `--depth`, `--threads-limit`, `--csv`, and `--help`. The program prints a table of values, error estimates, numbers of function evaluations, and times, and writes a CSV; unknown functions and invalid limits go to `stderr` with exit code 2.

### Variant 23. Elo chess ratings {#v23}

**1. Initial level.** Create a C++ console program that generates the results of 10,000 tournaments (100 games each between random players out of 1000) and, for each tournament, computes the sum of rating changes by the Elo formula in parallel using `std::transform_reduce` with the `par` policy, printing the total sum of changes and the time compared with `seq`.

**2. Basic level.** Create a C++ console program that reads game results from a file (`tournament;white;black;result`), groups them by tournament, computes the rating changes of the participants of each tournament in parallel (the tournaments are independent, and the starting ratings are the same), and combines the results with `std::reduce`. The program prints the 10 players with the largest rating gain and checks that the result matches a sequential computation.

**3. Advanced level.** Create a CMake project with an `elo` program that processes a directory of tournament files in chronological order: the tournaments of one day are computed in parallel (the players do not overlap – this is checked), and the days sequentially. Options: `--k-factor`, `--initial`, `--policy seq|par`, `--top <n>`, `--out <file>`, and `--help`. The program prints the final ratings, the history of a selected player, and the time of both policies, and reports a player taking part in two tournaments on the same day in `stderr` with exit code 3.

### Variant 24. Signal filtering {#v24}

**1. Initial level.** Create a C++ console program that generates a signal of 50,000,000 samples (a sum of sine waves and noise) and applies a nonlinear transformation to each sample (amplitude clipping and quadratic gain) using `std::transform` with the `seq` and `unseq` policies, printing the time of both variants and the maximum difference between the results.

**2. Basic level.** Create a C++ console program that generates a signal (a sum of sine waves and noise) of a given length, prompts for the order of the moving average (3–101), validates the input, and filters the signal with a moving average in three ways: a simple loop, `std::transform` with `unseq` for prefix sums, and `par_unseq`. The program prints a time table and whether the results match, and compares the time with a build without `-march=native`.

**3. Advanced level.** Create a CMake project with the option `option(USE_NATIVE "Use -march=native" ON)` and a `firfilter` program that reads a signal from a WAV file (16-bit, mono) and the FIR filter coefficients from a text file. Options: `--policy seq|unseq|par|par_unseq`, `--runs`, `--out <file.wav>`, and `--help`. The program filters the signal (convolution), writes the result, prints a table of median times for all policies and for a hand-vectorized version (blocks of 8 samples), and checks that the results match to within $10^{- 6}$.

### Variant 25. XOR encryption of files in blocks {#v25}

**1. Initial level.** Create a C++ console program that encrypts a file whose path the user enters with an XOR operation using a string key, splitting the content into 8 blocks processed by `std::jthread` threads, writes the result to a `.xor` file, and prints the file size and the time.

**2. Basic level.** Create a C++ console program that prompts for a file path, a key, and the number of threads, encrypts the file with XOR in blocks (the key offset depends on the position in the file, so the result does not depend on the number of threads), decrypts the result, and checks that it matches the original byte for byte. The program prints a table of time and speed (MB/s) for 1, 2, 4, and 8 threads.

**3. Advanced level.** Create a CMake project with an `xorcrypt` program that accepts `encrypt|decrypt input output` and the options `--key-file`, `--threads`, `--block <MB>`, `--verify`, and `--help`. The file is processed in blocks without loading it entirely into memory; a header with a checksum of the original is added to the result. The `--verify` mode checks the sum after decryption. The program prints the progress and the speed; errors go to `stderr` with codes 1/2, and a checksum mismatch uses code 3.

### Variant 26. The sleeping barber in C++ {#v26}

**1. Initial level.** Create a C++ console program that simulates the sleeping barber problem: one barber thread, 3 chairs in the waiting room, and 15 customers arriving at random intervals; use `std::mutex` and `std::condition_variable`. The program prints an event log (arrived, sat down to wait, left without a haircut, getting a haircut) and a summary.

**2. Basic level.** Create a C++ console program that prompts for the number of barbers, chairs, and customers and the haircut duration, and simulates a barbershop with `std::jthread` threads, in which the barbers wait in `std::condition_variable_any::wait` with a `stop_token`. After the last customer, the main thread stops the barbers through `request_stop()`. The program prints the number of customers served and lost, the average wait, and the utilization of each barber.

**3. Advanced level.** Create a CMake project with a `tsan` preset and a `barbershop` program that simulates a barbershop (the sleeping barber problem: barbers and customers are threads, with a mutex and condition variables) with the options `--barbers`, `--chairs`, `--customers`, `--arrival <ms>`, `--haircut <ms>`, `--seed`, `--log <file>`, and `--help`. The program runs a series of simulations for 0…10 chairs in the waiting room, prints a table of the share of lost customers and the average wait, writes a log, and checks the invariants (a violation uses exit code 3).

### Variant 27. Comparing C# and C++ {#v27}

**1. Initial level.** Create a C++ console program that computes the sum $\sum_{i = 1}^{n} \sqrt{i}$ for $n$ = 500,000,000 sequentially and in 8 `std::jthread` threads, and a similar C# program on .NET 10 (`Parallel.For` with local state); both programs print the result and the median time of three runs in the Release configuration.

**2. Basic level.** Create two console programs (C++ and C#) that solve the same problem – multiplying square matrices of a user-entered size sequentially and in $p$ threads over rows – with the same data generator. The programs print lines `language;n;p;time_ms;checksum` in a standard format, and a third C++ program reads both outputs from files and builds a comparison table of time, speedup, and the ratio of the C# time to the C++ time.

**3. Advanced level.** Create a CMake project with a `bench-cpp` program and a .NET console project `bench-cs` that implement the same set of tests (a sum with a square root, matrix multiplication, sorting, Monte Carlo) with the options `--test`, `--size`, `--threads`, `--runs`, `--warmup`. A script or a C++ program runs both programs for all combinations, checks that the checksums match (otherwise, exit code 3), and prints a summary table of median times and time ratios.

### Variant 28. Parallel BFS of a maze {#v28}

**1. Initial level.** Create a C++ console program that generates a 2000×2000 maze (passable cells with a probability of 70%, fixed seed) and finds the distance from the top-left to the bottom-right corner by a level-synchronous breadth-first search, processing the cells of the current level in 4 threads, and prints the distance and the time.

**2. Basic level.** Create a C++ console program that reads a maze from a text file (`#` – wall, `.` – passage, `S` and `F` – start and finish), performs a level-synchronous parallel breadth-first search with visited marks in a vector of `std::atomic<bool>` (`compare_exchange_strong`), checks the result with a sequential BFS, and prints the length of the shortest path and a time table for 1, 2, 4, and 8 threads.

**3. Advanced level.** Create a CMake project with a `mazebfs` program that accepts a maze file or the option `--generate WxH`, as well as `--threads`, `--path <file>`, and `--help`. The program performs a level-synchronous parallel BFS with local next-level buffers in each thread, reconstructs the shortest path, writes the maze with the path to a file, prints the size of each frontier level and a time and speedup table, and checks the path length with a sequential BFS. An unreachable finish uses exit code 3, and file errors code 2.

### Variant 29. A temperature map of a region {#v29}

**1. Initial level.** Create a C++ console program that, from 20 weather stations with coordinates and temperatures defined in the program, builds a 1000×1000-cell temperature map by inverse distance weighting, processing the map rows in 8 threads, and writes the map to a PGM file (temperature as grayscale), printing the time.

**2. Basic level.** Create a C++ console program that reads weather stations from a file (`name;x;y;temperature`), prompts for the map size and the weighting power, validates the input, builds the map sequentially and in $p$ threads, and prints the minimum, maximum, and average temperature of the map, a time table for 1, 2, 4, and 8 threads, and a check that the results match.

**3. Advanced level.** Create a CMake project with the options `option(ENABLE_NATIVE …)` and `option(ENABLE_LTO …)` and a `heatmap` program that accepts a station file and the options `--size WxH`, `--power`, `--radius <km>`, `--threads`, `--policy threads|par`, `--out <file.ppm>`, and `--help`. The program builds a color map and prints a time table for different thread counts and for builds with `-O2`, `-O3`, and `-march=native`. Errors go to `stderr` with codes 1/2.

### Variant 30. Testing the thread safety of a queue {#v30}

**1. Initial level.** Create a C++ console program with a thread-safe queue (`std::queue` under a `std::mutex` with `push` and `try_pop` methods) in which 4 producer threads each add 100,000 numbers and 4 consumers remove them. The program checks that the sum of the removed numbers equals the sum of the added ones and prints the result of the check.

**2. Basic level.** Create a C++ console program that implements two queues – one without synchronization and one with a mutex and a condition variable (`wait_and_pop`) – and runs a stress test for each with a user-entered number of producers, consumers, and elements. The program checks the count, the sum, and the absence of duplicates among the removed elements and prints a report on the violations found for each queue (they are expected for the queue without synchronization).

**3. Advanced level.** Create a CMake project with `release` and `tsan` presets and a `queuetest` program that tests several queue implementations (`mutex`, `two-locks` with separate head and tail mutexes, `bounded` on semaphores). Options: `--impl`, `--producers`, `--consumers`, `--items`, and `--help`. The program prints a throughput table and the results of the invariant checks (a violation uses exit code 3); the output of the `tsan` build is added to the report.

## Procedure

1. Study the theory and worked examples.
2. Install the `build-essential`, `cmake`, `ninja-build`, `gdb`, and `libtbb-dev` packages in Ubuntu 26.04 (WSL2), and configure the WSL toolchain and the *Debug* and *Release* CMake profiles with the Ninja generator in CLion.
3. Create a CMake project with a `CMakePresets.json` file, implement the task of the chosen difficulty level, and check that it builds from the command line.
4. Check the result against a sequential version, eliminate ThreadSanitizer warnings (`-fsanitize=thread`), and measure the median time, speedup, and efficiency in Release.
5. Demonstrate the program to the instructor, explain the code, the CMake files, and the measurement results, and answer the review questions.
