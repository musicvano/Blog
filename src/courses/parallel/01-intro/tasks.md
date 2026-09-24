---
title: "Tasks"
description: "Topic 1. Fundamentals of parallel computing: task variants"
outline: [2, 3]
sourceHash: "e0019b1dbea5387bd066ca0d5b9155f717369b9b24aad6c06152250bd94c17cd"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Animation rendering {#v1}

**1. Initial level.** Write a console program that uses animation renderer stage times defined in the program (loading the scene: 12 s, rendering frames: 540 s, assembling the video: 18 s), calculates the parallel code fraction $f$ (frame rendering), and prints the speedup predicted by Amdahl’s law for 2, 4, 8, and 16 cores.

**2. Basic level.** Write a console program that asks for the names and durations of renderer stages until a blank line is entered, together with a flag indicating whether each stage can be parallelized. Repeat the prompt for invalid values. Print a table of stages and their fractions of total time, the fraction $f$, a table of speedup, efficiency, and predicted time for $p = 1 , 2 , 4 , \dots , 64$, and the speedup limit $1 / (1 - f)$.

**3. Advanced level.** Write a console application that reads a renderer profile from a CSV file passed as an argument (`stage;seconds;parallel`) and accepts `--cores 1,2,4,8`, `--deadline <seconds>`, and `--help` options. Print a stage table, a prediction table for each core count marking configurations that meet the deadline, and the minimum sufficient core count. Report file format errors with line numbers to standard error; exit codes: 0 — success, 1 — argument error, 2 — file error, 3 — deadline unreachable.

### Variant 2. Video encoding {#v2}

**1. Initial level.** Write a console program that uses video encoding times defined in the program for 1, 2, 4, and 8 threads (620, 330, 185, 118 s) to calculate and print speedup, efficiency, and the Karp–Flatt metric for each thread count.

**2. Basic level.** Write a console program that reads “thread count — time in seconds” pairs from the keyboard until a blank line is entered. Check that thread counts are positive and unique, times are positive, and a measurement for one thread is present. Print an aligned table of $p$, $T_{p}$, $S$, $E$, and $e$, and a message indicating whether the Karp–Flatt metric increases (a sign of overhead).

**3. Advanced level.** Write a console application that reads a CSV file of encoding measurements (`video;threads;seconds`, several videos, several runs per configuration) from a command-line argument. For each video, take the median of the runs, print a table of $S$, $E$, and $e$, and the most efficient thread count subject to $E \ge 70$%. With `--out <file>`, write the summary table to CSV. The `--help` option prints help; skip invalid rows with a message to standard error; exit codes: 0, 1 — arguments, 2 — file.

### Variant 3. Weather forecasting {#v3}

**1. Initial level.** Write a console program that prints a table of speedup under Amdahl’s and Gustafson’s laws for 1, 2, 4, …, 256 processors for a grid-based weather model with a serial fraction $s = 6$% defined in the program.

**2. Basic level.** Write a console program that asks for the model’s serial fraction (a percentage from 0 to 100) and maximum processor count (a power of two up to 4096), validates the input, and prints a table of speedup and efficiency under both laws. Determine the processor count at which efficiency under Amdahl’s law first falls below 50%.

**3. Advanced level.** Write a console application comparing Amdahl’s and Gustafson’s laws that accepts `--serial <fraction>`, `--cores <list>` or `--max <p>`, `--grid <grid size per processor>`, and `--help`. Print a table containing $p$, grid size for weak scaling, and $S$ and $E$ under both laws; write it to CSV with `--csv <file>`. Report argument errors to standard error with exit code 1; without arguments, read the parameters from the keyboard.

### Variant 4. Overnight banking report {#v4}

**1. Initial level.** Write a console program that uses overnight transaction-processing stage times defined in the program (database export: 25 min, validation and calculation: 210 min, report generation: 15 min) to calculate the parallel code fraction and predicted processing time on 4, 8, and 16 cores under Amdahl’s law.

**2. Basic level.** Write a console program that asks for the durations of the three transaction-processing stages in minutes and the allowed processing window (for example, 01:00–05:00), validates the input, and prints a table of predicted times for $p = 1 \dots 32$, indicating whether processing finishes within the window and showing the completion time in `HH:mm` format.

**3. Advanced level.** Write a console application that reads a processing-stage log for several nights from a file (`date;stage;minutes;parallel`), determines the fraction $f$ for each night, and prints a table of nights and the mean and worst $f$ values. With `--window 01:00-05:00`, choose the minimum core count sufficient for the worst night; with `--growth <percent>`, predict that count after a year of transaction-volume growth. Report errors to standard error; exit codes 0/1/2; support `--help`.

### Variant 5. Prime numbers {#v5}

**1. Initial level.** Write a console program that counts primes in ranges up to $10^{5}$, $10^{6}$, and $10^{7}$ by trying divisors up to $\sqrt{n}$, and prints the count and computation time measured by `Stopwatch` for each range.

**2. Basic level.** Write a console program that asks for range upper bounds (space-separated integers from 1000 to $5 \cdot 10^{7}$), validates the input, warms up, and measures the median of 5 prime-counting runs for each bound. Print a table of the bound, prime count, median, time ratio relative to the previous bound, and expected ratio for $O (n \sqrt{n})$ complexity.

**3. Advanced level.** Write a console application that compares two prime-counting algorithms (trial division and the Sieve of Eratosthenes) for bounds supplied with `--limits 1e5,1e6,1e7`, using `--runs <n>` repetitions. Print a table of medians, minima, and relative deviations, verify that prime counts match, estimate the complexity exponent from the two largest bounds, and write results to CSV (`--csv`). Support `--help`, report errors to standard error, and return exit code 3 if the algorithms’ results differ.

### Variant 6. Photo archive {#v6}

**1. Initial level.** Write a console program that uses photo archive processing fractions defined in the program (8% sequential, 92% parallel, total single-core time 50 min) to print processing time and efficiency for 1–32 cores and the largest core count with efficiency of at least 70%.

**2. Basic level.** Write a console program that asks for the single-core photo archive processing time, parallel code fraction, time budget in minutes, and minimum acceptable efficiency as a percentage. After validating input, print a table for 1–64 cores and a recommended core count: the smallest count that meets the budget while maintaining the minimum efficiency, or a message that none exists.

**3. Advanced level.** Write a console application that reads a list of photo archives from a file (`archive;photos;msPerPhoto;serialPercent`) and chooses a core count for each archive based on the time budget (`--budget <min>`) and minimum efficiency (`--min-eff <%>`). Print a recommendation table with total core-hours and total time; list archives with no solution on standard error. Support `--max-cores` and `--help`; exit codes: 0 — every archive has a solution, 4 — some do not, 1/2 — argument and file errors.

### Variant 7. DNA sequences {#v7}

**1. Initial level.** Write a console program that generates two random DNA sequences (alphabet `ACGT`, $10^{7}$ characters each, fixed seed), measures generation time and the time to count positions with matching characters, and prints the comparison stage’s fraction of total time.

**2. Basic level.** Write a console program that asks for the DNA sequence length and number of runs, validates input, and measures median generation, comparison, and nucleotide-frequency counting times after warmup. Print a table of stages and their fractions, the parallel code fraction (comparison and counting), and the speedup predicted by Amdahl’s law for 2–16 cores.

**3. Advanced level.** Write a console application that reads DNA sequences from two FASTA files (paths supplied as arguments), measures the stages of reading, alphabet validation, comparison, and finding the longest shared fragment at matching positions, and prints a report with stage fractions and Amdahl’s prediction. The `--repeat <n>` option sets the number of runs (use the median), and `--help` prints help; report invalid characters with line numbers to standard error; exit codes 0/1/2.

### Variant 8. Computer profile {#v8}

**1. Initial level.** Write a console program that prints computer information: operating system, process architecture, .NET version, number of logical processors, available memory, and `Stopwatch` timer precision.

**2. Basic level.** Write a console program that produces a computer profile as an aligned table (OS, computer name without the user’s personal data, architecture, .NET version and RID, logical processors, memory, garbage collector mode, and Debug or Release configuration), and adds the result of a short performance test: the median of 5 runs computing a harmonic sum for $n = 10^{8}$.

**3. Advanced level.** Write a console application that saves a computer profile to a Markdown file (`--out passport.md`): tables named “System,” “Processor and memory,” “.NET,” and “Performance test” (median, minimum, maximum, deviation). The `--compare <other.md>` option reads a previously saved profile and prints the ratio of the two computers’ test times. Print a warning to standard error if the program is running in Debug configuration; support `--help`; exit codes 0/1/2.

### Variant 9. Web server {#v9}

**1. Initial level.** Write a console program that models web server throughput: processing one request takes 40 ms, with 10% spent on sequential access to a shared log. Print requests per second for 1, 2, 4, 8, and 16 cores under Amdahl’s law.

**2. Basic level.** Write a console program that asks for request-processing time in milliseconds, the serial fraction, and expected load (requests per second), validates input, and prints a table of throughput and server utilization for 1–64 cores and the minimum core count that keeps utilization at or below 80%.

**3. Advanced level.** Write a console application that reads an hourly load forecast from a CSV file (`hour;requests`) and uses `--request-ms`, `--serial`, and `--max-load <%>` to determine the minimum core count for each hour. Print an hourly table, the peak hour, the maximum required core count, and a cost estimate based on the price per core-hour (`--price`). Report errors to standard error; support `--help`; exit codes 0/1/2.

### Variant 10. Library catalog {#v10}

**1. Initial level.** Write a console program that generates a catalog of 500,000 books (title, author, year, fixed seed), measures the time for generation, searching for books by a given author, and sorting by year, and prints each stage’s time and fraction.

**2. Basic level.** Write a console program that asks for the number of books and number of runs, validates input, warms up, and measures median times for “generation,” “search by author,” “sort by title,” and “group by year.” Print a table of stages and their fractions, identify the slowest stage, and predict program speedup if only that stage is parallelized.

**3. Advanced level.** Write a console application that loads a book catalog from a CSV file, performs the operations specified by `--ops load,search,sort,group` using `--runs` repetitions, and prints a table of medians, minima, and stage fractions. For each stage separately, predict program speedup on 8 cores if that stage alone is parallelized, and save the report to a file (`--report`). Support `--help`; report file errors with line numbers to standard error; exit codes 0/1/2.

### Variant 11. Sports rankings {#v11}

**1. Initial level.** Write a console program that generates the results of 1,000,000 matches (fixed seed), calculates team rankings, and measures calculation time: the first run separately and the median of 10 subsequent runs.

**2. Basic level.** Write a console program that asks for the number of matches and number of runs, validates input, measures team-ranking calculations after warmup, and prints the minimum, median, mean, maximum, and relative standard deviation, plus a warning if the deviation exceeds 5%.

**3. Advanced level.** Write a console benchmark application for sports-ranking calculations that compares two ways of accumulating points (a dictionary and an array indexed by team number) for match counts supplied with `--matches 1e5,1e6,1e7`. Support `--warmup`, `--runs`, `--csv <file>`, and `--help`. Print a statistics table (median, minimum, deviation, ratio between the two methods), verify that rankings match, and return code 3 if they differ; report errors to standard error.

### Variant 12. Ray tracing {#v12}

**1. Initial level.** Write a console program that uses ray tracer stage fractions defined in the program (scene construction: 3%, tracing: 90%, filtering: 5%, file writing: 2%; tracing and filtering can be parallelized) to print the overall speedup predicted by Amdahl’s law for 1–64 cores.

**2. Basic level.** Write a console program that asks for ray tracer stages (name, percentage of total time, whether it can be parallelized, and the stage’s own parallel code fraction), checks that the percentages total 100%, and prints a strong-scaling table: $p$, each stage’s speedup, overall speedup, and efficiency.

**3. Advanced level.** Write a console application that reads ray tracer stage descriptions from a JSON file and an image size, builds a strong-scaling table for core counts supplied with `--cores`, and identifies the stage limiting speedup at the maximum core count. With `--csv`, save the table to a file for plotting. Report JSON format errors and invalid percentage totals to standard error with code 2; support `--help`.

### Variant 13. Chess engine {#v13}

**1. Initial level.** Write a console program that uses chess engine time fractions defined in the program (opening-book generation: 7%, parallel position search: 93%) to calculate speedup and the number of positions examined in 10 s for 1, 2, 4, 8, and 16 cores, assuming one core examines 2 million positions per second.

**2. Basic level.** Write a console program that asks for the parallel search fraction, single-core speed (positions per second), and cost per core-hour, validates input, and prints a table for 1–64 cores: speedup, positions in 10 s, hourly cost, and positions per hryvnia. Identify the configuration with the best positions-to-cost ratio.

**3. Advanced level.** Write a console application that reads chess-position search timings at different thread counts from a CSV file, calculates $S$, $E$, and the Karp–Flatt metric, fits the fraction $f$ in Amdahl’s law by least squares, and prints a “measured/model” table with relative error. The `--price` and `--budget` options specify the cost and budget for choosing a configuration; support `--help`; report errors to standard error; exit codes 0/1/2.

### Variant 14. Computing π with the Leibniz series {#v14}

**1. Initial level.** Write a console program that computes $\pi$ using $10^{6}$, $10^{7}$, and $10^{8}$ terms of the Leibniz series, and prints the approximation, error relative to `Math.PI`, and computation time for each case.

**2. Basic level.** Write a console program that asks for the required number of correct decimal digits of $\pi$ (from 1 to 9), validates input, and measures median times after warmup for $n = 10 , 100 , \dots$ terms of the Leibniz series. Print a table of $n$, error, number of correct digits, and time until the required accuracy is reached.

**3. Advanced level.** Write a console application that compares the Leibniz series, the Nilakantha series, and Machin’s formula for term counts supplied with `--terms`, and writes a table of “method, $n$, error, median time” to a CSV file (`--csv`) for plotting. For each method, print the time needed to reach an error of $10^{- 8}$, or a message that it is unreachable within the specified bounds. Support `--runs` and `--help`; report errors to standard error; exit codes 0/1.

### Variant 15. Cloud rental {#v15}

**1. Initial level.** Write a console program that calculates execution time and virtual-machine rental cost for a computation taking 40 hours on one core with a parallel code fraction of 97%, using 2, 4, 8, 16, 32, and 64 cores at USD 0.05 per core-hour.

**2. Basic level.** Write a console program that asks for single-core execution time, parallel code fraction, price per core-hour, and a deadline in hours, validates input, and prints a table of virtual-machine configurations (1–128 cores): time, cost, and efficiency. Choose the cheapest configuration that meets the deadline.

**3. Advanced level.** Write a console application that reads a catalog of virtual-machine types from CSV (`name;cores;pricePerHour`) and a list of tasks from another file (`task;hoursOn1Core; parallelPercent;deadlineHours`). Choose the cheapest machine type that meets each task’s deadline, print an assignment table with total cost, and list tasks without a solution on standard error. Support `--hourly-billing` (round up to whole hours) and `--help`; exit codes 0/1/2/4.

### Variant 16. Processor cache {#v16}

**1. Initial level.** Write a console program that sums the elements of `long[]` arrays ranging from 1 KB to 256 MB (each four times larger than the previous one) and prints traversal time per element in nanoseconds for each size.

**2. Basic level.** Write a console program that asks for minimum and maximum array sizes in kilobytes and the number of runs, validates input, and measures median random-access time for each size (doubling each time). Print a table of size, nanoseconds per access, and ratio relative to the smallest size. Mark sizes after which time per access increases by more than 1.5 times.

**3. Advanced level.** Write a console application that finds processor cache boundaries: measure sequential and random access times for sizes supplied with `--from`, `--to`, and `--step`, produce a table and save CSV (`--csv`), identify access-time “steps,” and compare them with L1, L2, and L3 cache sizes supplied with `--cache 48K,512K,16M`. Support `--runs` and `--help`; report errors to standard error; exit codes 0/1.

### Variant 17. University cluster {#v17}

**1. Initial level.** Write a console program that prints scaled speedup under Gustafson’s law and grid size for weak scaling (a $1000 \times 1000$ grid on one processor) for 1, 4, 16, 64, and 256 processors, using a grid-based problem with a serial fraction of 2%.

**2. Basic level.** Write a console program that asks for the serial fraction, grid size per processor, number of cluster nodes, and cores per node, validates input, and prints a weak-scaling table: nodes, cores, grid size, Gustafson speedup, and efficiency.

**3. Advanced level.** Write a console application that reads cluster weak-scaling results from CSV (`nodes;coresPerNode;cells;seconds`), calculates weak-scaling efficiency $E_{w} = T_{1} / T_{p}$ and Gustafson’s serial fraction, and prints a table marking configurations where $E_{w} \lt 80$%. The `--predict <nodes>` option predicts the time for a larger configuration; support `--help`; report errors to standard error; exit codes 0/1/2.

### Variant 18. Neural network training {#v18}

**1. Initial level.** Write a console program that uses Amdahl’s law to print epoch time and speedup for 1, 2, 4, and 8 GPUs and the total time for 50 epochs of neural network training (one epoch takes 30 min on one GPU; the parallel fraction is 90%).

**2. Basic level.** Write a console program that asks for the epoch time on one GPU, number of epochs, parallel fraction, and the fraction of time for gradient synchronization added for each additional GPU. After validating input, print a table for 1–64 GPUs and the GPU count that minimizes training time.

**3. Advanced level.** Write a console application that models neural network training on a cluster with 4 or 8 GPUs per node, using model parameters (`--epoch-min`, `--epochs`, `--parallel`, `--sync-intra`, `--sync-inter`) and a configuration list from a file (`nodes;gpusPerNode`). Print a table of training time, speedup, efficiency, and cost (`--gpu-price`), and the best configurations by time and by cost. Support `--help`; report errors to standard error; exit codes 0/1/2.

### Variant 19. Warehouse logistics {#v19}

**1. Initial level.** Write a console program that uses a warehouse route optimizer run log defined in the program (thread count and time) to calculate speedup and efficiency and print the thread count with the highest speedup.

**2. Basic level.** Write a console program that reads a route optimizer run log from the keyboard (`threads time` lines, several runs per thread count), validates input, calculates the median for each thread count, and prints a table of $S$, $E$, and $e$, plus the thread count with the highest efficiency among configurations whose speedup is at least 80% of the maximum.

**3. Advanced level.** Write a console application that analyzes a warehouse optimizer run log from a text file (`2026-09-01 12:00:03 threads=8 ms=1532`), groups entries by date and thread count, removes outliers (values differing from the median by more than 20%), prints a metrics table for each day, and saves a CSV report (`--csv`). Support `--from`, `--to` (dates), and `--help`; report unrecognized lines to standard error; exit codes 0/1/2.

### Variant 20. Seismic data {#v20}

**1. Initial level.** Write a console program that compares measured seismic-data processing speedups (defined in the program for 2, 4, 8, and 16 threads: 1.9, 3.5, 6.1, 8.7) with theoretical speedup under Amdahl’s law for $f = 95$%, and prints the percentage difference.

**2. Basic level.** Write a console program that asks for the seismic-data processing parallel code fraction and measured times for several thread counts, validates input, prints a table of measured and theoretical speedup with relative differences, and marks anomalies: superlinear speedup and deviations from theory greater than 15%.

**3. Advanced level.** Write a console application that processes a CSV file of measurements for several seismic tasks (`task;threads;run;ms`), estimates the fraction $f$ for each task by least squares, and prints a “measured/model” table and an explained list of anomalies (superlinear speedup, decreasing speedup, large variation between runs). Support `--threshold <%>`, `--csv`, and `--help`; report errors to standard error; exit codes 0/1/2.

### Variant 21. Project compilation {#v21}

**1. Initial level.** Write a console program that models building a project with 12 independently compiled modules (each module’s time is defined in the program) and a sequential linking stage of 20 s, and prints build times on 1, 2, 4, and 8 cores assuming an even distribution of modules.

**2. Basic level.** Write a console program that asks for module compilation times (space-separated) and linking time, validates input, and models module allocation for 1–16 cores using a greedy algorithm (assign the longest module to the least-loaded core). Print a table of build time, speedup, and efficiency, and compare it with Amdahl’s law predictions.

**3. Advanced level.** Write a console application that reads a project description from a file (`module;seconds; dependsOn`) and models a parallel build with dependencies: a module is compiled after its dependencies, and at most $p$ compilers run simultaneously. For core counts supplied with `--cores`, print a table of time, speedup, and maximum parallelism, and the critical dependency path. Report cyclic dependencies to standard error with code 3; support `--help`; exit codes 0/1/2/3.

### Variant 22. Medical images {#v22}

**1. Initial level.** Write a console program that prints processing time and energy consumption in watt-hours for 1, 2, 4, 8, and 16 cores for medical image processing (single-core time: 90 min, parallel code fraction: 94%, power consumption: 15 W per active core).

**2. Basic level.** Write a console program that asks for single-core processing time, parallel code fraction, active-core power, and idle-core power, validates input, and prints a table for 1–32 cores: time, efficiency, and energy (including idle cores during the sequential part). Identify the core counts that minimize energy and the “energy × time” product.

**3. Advanced level.** Write a console application that reads a batch of studies from a file (`study;images; secondsPerImage;serialPercent`), power parameters from `--active-w` and `--idle-w`, and a `--max-hours` limit. For each study, choose the core count that minimizes energy within the time limit. Print a table of decisions and total energy; report infeasible studies to standard error; support `--help`; exit codes 0/1/2/4.

### Variant 23. Particle physics {#v23}

**1. Initial level.** Write a console program that uses particle simulation times defined in the program for 1, 2, 4, and 8 threads (160, 75, 36, 19 s) to calculate speedup and efficiency, and prints a message for each configuration with superlinear speedup.

**2. Basic level.** Write a console program that asks for the number of particles, size of one particle in bytes, L2 and L3 cache sizes, and measured times for several thread counts. After validating input, print a table of $S$, $E$, data size per thread, and whether each thread’s data fits in L2 or L3, explaining possible reasons for superlinear speedup.

**3. Advanced level.** Write a console application that measures the time to update particle coordinates (an array of structures) for different particle counts (`--counts`), and compares time per particle with cache sizes (`--cache`). Print a table, mark time “steps,” predict the thread count at which the data per thread fits in L3 cache, and save CSV (`--csv`). Support `--runs` and `--help`; report errors to standard error; exit codes 0/1.

### Variant 24. Spell checking {#v24}

**1. Initial level.** Write a console program that generates texts of 10,000, 100,000, and 1,000,000 words (fixed seed), checks each word against a `HashSet<string>` dictionary, and prints the number of unknown words and checking time for each text.

**2. Basic level.** Write a console program that asks for text sizes in words (space-separated) and the number of runs, validates input, measures median spell-checking times after warmup, and prints a table of words, median, and microseconds per word. Linearly extrapolate the time for a text of 50 million words.

**3. Advanced level.** Write a console application that reads a dictionary and text files from a folder (arguments), measures the “reading,” “splitting into words,” and “checking” stages for each file, builds a time-versus-size table, fits a linear model by least squares, and predicts the time for the size supplied with `--predict <words>`. Support `--runs`, `--csv`, and `--help`; report file-reading errors to standard error; exit codes 0/1/2.

### Variant 25. Trading bot {#v25}

**1. Initial level.** Write a console program that prints the maximum quotes per second for 1, 2, 4, 8, and 16 cores and the speedup limit for a trading bot (processing one quote takes 2 ms, including 0.3 ms of sequential writing to the trade log).

**2. Basic level.** Write a console program that asks for quote-processing time, the serial fraction, and the incoming quote rate per second, validates input, and prints a table for 1–64 cores: throughput, average latency, and whether the bot keeps up with the stream. Report if the stream exceeds the speedup limit for every core count.

**3. Advanced level.** Write a console application that reads a timestamped quote log from a file (`HH:mm:ss.fff;symbol;price`), calculates peak load for each second, and uses processing parameters (`--ms`, `--serial`) to determine the minimum core count that lets the bot handle the peak. Print a table of overloaded seconds for a specified core count (`--cores`) and a summary. Support `--help`; report errors to standard error; exit codes 0/1/2/4.

### Variant 26. Archiver {#v26}

**1. Initial level.** Write a console program that uses archiver stage times defined in the program (reading files: 30 s, compression: 240 s, writing the archive: 20 s) to calculate the parallel code fraction and predict archiving time for 2, 4, 8, 16, and 32 cores.

**2. Basic level.** Write a console program that creates a temporary file containing random data with a user-specified size in megabytes (validate the range 1–1024), measures reading time, `GZipStream` compression into memory, and archive writing, prints a stage table with fractions and Amdahl’s predictions for 2–32 cores, and then deletes the temporary files.

**3. Advanced level.** Write a console application that archives files from a folder (argument) in GZip format, measures reading, compression, and writing stages for each file and overall, calculates the parallel code fraction, and predicts time for core counts supplied with `--cores`. Support `--level fastest|optimal|smallest`, `--out <folder>`, and `--help`. The report includes a file table, compression ratio, and summary; report file-access errors to standard error; exit codes 0/1/2.

### Variant 27. Social network analysis {#v27}

**1. Initial level.** Write a console program that prints efficiency $E = W / (W + T_{o})$ for $n = 100$ and $p = 1 , 2 , 4 , \dots , 64$ for social-network graph analysis with overhead $T_{o} = 0 {,} 5 p \log_{2} p$ s (the task takes $W = n$ s on one core).

**2. Basic level.** Write a console program that asks for target efficiency (from 50 to 99%) and the maximum processor count, validates input, and prints an isoefficiency table for the overhead model $T_{o} = c p \log_{2} p$ (the coefficient $c$ is entered): $p$, the minimum problem size $W$ that achieves the target efficiency, and the ratio of $W$ to the size for $p = 2$.

**3. Advanced level.** Write a console application that builds isoefficiency tables for several overhead models (`--model plogp|p|p2`) and target efficiencies (`--eff 0.6,0.7,0.8`), determines each model’s isoefficiency function, and writes the tables to CSV (`--csv`). For a measurements file (`--measured`), choose the model that best describes the data. Support `--help`; report errors to standard error; exit codes 0/1/2.

### Variant 28. Sorting benchmark {#v28}

**1. Initial level.** Write a console program that generates an array of 5,000,000 random integers (fixed seed), and measures how long it takes to sort copies with `Array.Sort` and your own merge sort.

**2. Basic level.** Write a console program that asks for array size and the number of runs, validates input, measures sorting copies of the same array with three algorithms (`Array.Sort`, merge sort, quicksort) after warmup, and prints a table of median, minimum, maximum, deviation, and ratio relative to `Array.Sort`. Also verify that the sorted results are identical.

**3. Advanced level.** Write a console sorting benchmark for sizes supplied with `--sizes` and data types `--data random,sorted,reversed,few-unique`. Print a table of medians with 95% confidence intervals (using the $t$-distribution), marking algorithms whose intervals overlap (the difference is not statistically significant). Support `--runs`, `--csv`, and `--help`; return code 3 if a sorting result is incorrect.

### Variant 29. Hybrid cores {#v29}

**1. Initial level.** Write a console program that prints speedup using only P-cores, only E-cores, and all cores for a processor with 6 P-cores and 8 E-cores (an E-core runs at 60% of a P-core’s speed) and a task with a parallel code fraction of 95%.

**2. Basic level.** Write a console program that asks for the P-core and E-core counts, relative E-core speed, and parallel code fraction, validates input, and prints a speedup table for every combination of active P-cores and E-cores (the sequential part always runs on a P-core), and the best combination with efficiency of at least 70%.

**3. Advanced level.** Write a console application that models a set of tasks running on a hybrid processor using processor parameters (`--p-cores`, `--e-cores`, `--e-speed`) and tasks from a CSV file (`task;seconds;parallelPercent`). Compare the allocation strategies “P-cores only,” “all cores,” and “long tasks on P-cores,” and print a table of total time, average speedup, and core utilization for each strategy. Support `--help`; report errors to standard error; exit codes 0/1/2.

### Variant 30. Rocket launch simulation {#v30}

**1. Initial level.** Write a console program that prints predicted rocket-launch simulation time (model preparation: 5 min, trajectory calculation: 180 min, visualization: 10 min; only calculation is parallelized) for a cluster with 1, 2, 4, and 8 nodes of 16 cores each.

**2. Basic level.** Write a console program that asks for simulation stage times, cores per node, and communication overhead between nodes (minutes per additional node), validates input, and prints a table for 1–32 nodes: time, speedup, efficiency, and the node count that minimizes time.

**3. Advanced level.** Write a console application that reads simulation parameters from a JSON file (stages, fractions, overhead) and a list of cluster configurations from CSV (`cluster;nodes;coresPerNode;pricePerNodeHour`), prints time and cost for each configuration, and chooses the cheapest one that meets the deadline (`--deadline <hours>`). With `--sweep`, also produce a table of time versus node count. Support `--help`; report errors to standard error; exit codes 0/1/2/4.

## Procedure

1. Study the theory and worked examples.
2. Install .NET 10 SDK and JetBrains Rider (and Ubuntu 26.04 in WSL2 if needed); verify the installation with `dotnet --info`.
3. Prepare a report on your computer’s hardware configuration: processor model, number of cores and logical processors, cache sizes, memory capacity, and OS and .NET versions.
4. Create a solution and console project in Rider and implement the task at your chosen difficulty level.
5. Take measurements in Release configuration with warmup and multiple runs; report the median time.
6. Compare your results with the predictions of Amdahl’s and Gustafson’s laws and explain discrepancies.
7. Demonstrate your program to the instructor, explain the code and measurement results, and answer the review questions.
