---
title: "Tasks"
description: "Topic 6. Data parallelism and PLINQ: task variants"
outline: [2, 3]
sourceHash: "78cbd51fc59f710e6943f8a6bde20f829eab0eec72aee50c8ec609715afade93"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Matrix multiplication {#v1}

**1. Initial level.** Create a console program that fills two 800×800 square matrices with random floating-point numbers from 0 to 1 (a generator with a fixed seed), multiplies them sequentially and using `Parallel.For` over result rows, and prints both execution times, speedup, and the maximum difference between corresponding result elements.

**2. Basic level.** Create a console program that prompts for square matrix size $n$ (100–2000) and validates the input. Multiply the matrices sequentially and in parallel by rows using `ParallelOptions.MaxDegreeOfParallelism` for $p = 1 , 2 , 4 , 8 , 16$ (no more than `Environment.ProcessorCount`). For each $p$, measure the median of three runs after warmup, verify agreement with the sequential result (error at most $10^{- 9}$), and print an aligned “$p$ – time, ms – speedup $S$ – efficiency $E$” table.

**3. Advanced level.** Create a `matmul` console application accepting options `--sizes 500,1000,1500`, `--threads 1,2,4,8,16`, `--order ijk|ikj`, `--csv <file>`, and `--help`. For each size, measure sequential and row-parallel multiplication (median of five runs after warmup), verify the result, print an “$n$ – $p$ – time – $S$ – $E$” table, and write it to CSV (decimal point) for a speedup chart. Also compare `ijk` and `ikj` loop orders. Report invalid options to the error stream with exit code 1; mismatched results produce code 2.

### Variant 2. Blurring a PPM image {#v2}

**1. Initial level.** Create a console program that reads a user-specified PPM (P6) color image, applies a 3×3 mean blur using `Parallel.For` over rows (writing to a new array), and saves the result as `blur.ppm`, printing image dimensions and processing time.

**2. Basic level.** Create a console program that reads a PPM (P6) image and Gaussian filter radius $r$ (1–10), builds the filter kernel, and blurs the image in two passes (horizontal and vertical), sequentially and in parallel by rows. Verify matching results and print a time, speedup, and efficiency table for 1, 2, 4, 8, and 16 threads. Report an invalid file or radius with a clear message.

**3. Advanced level.** Create a `gblur` console application accepting `input.ppm output.ppm` arguments and options `--radius <r>`, `--threads 1,2,4,8`, `--scale 1,2,4`, `--csv <file>`, and `--help`. `--scale` enlarges each image dimension by the specified factor before processing to study strong scaling at different sizes. Print a “size – threads – time, ms – $S$ – $E$” table, write CSV, and save the largest case’s result. Parallel output must match sequential output byte for byte. Send PPM format errors (unknown header, incomplete data) to the error stream with exit code 2; argument errors use code 1.

### Variant 3. Trapezoidal integration {#v3}

**1. Initial level.** Create a console program that integrates $\sin (x) \cdot e^{- \frac{x}{5}}$ over $[ 0 , 20 ]$ using the trapezoidal rule with $n$ = 50,000,000 intervals, sequentially and in parallel with `Parallel.For` and thread-local state (`localInit`, `localFinally`). Print both values to 10 decimal places and the computation times.

**2. Basic level.** Create a console program that prompts for integration bounds $a \lt b$ and interval count $n$ (1000–10⁹), validates them, and integrates $x^{2} \cdot \cos (x)$ with the trapezoidal rule in three ways: `Parallel.For` with local state, `Parallel.ForEach` with `Partitioner.Create(0, n)`, and `Partitioner.Create(0, n, rangeSize)` with range size 100,000. For each approach, print the value, deviation from the sequential result, time, and speedup.

**3. Advanced level.** Create a `trapz` console application accepting options `--function sin|exp|poly`, `--from`, `--to`, `--n`, `--threads 1,2,4,8,16`, `--range-sizes 1000,100000,10000000`, and `--help`. Integrate the selected function sequentially and in parallel with a range partitioner for each thread count/range size pair. Print a time and speedup table, the best range size for each thread count, and error relative to the analytical integral. Write results to CSV; send invalid parameters to the error stream with exit code 1.

### Variant 4. Estimating π with Monte Carlo {#v4}

**1. Initial level.** Create a console program that estimates π by Monte Carlo using 100,000,000 random points in the square $[ 0 , 1 ] \times [ 0 , 1 ]$, dividing trials into 64 blocks, each with its own `new Random(1000 + block number)` generator, processed by `Parallel.For`. Print the π estimate, absolute error, and time.

**2. Basic level.** Create a console program that prompts for trial count $N$ (10⁶–10⁹) and block count (1–1024), validates them, and estimates π by Monte Carlo (the fraction of random points in the unit square inside a quarter circle), in parallel with one generator per block for 1, 2, 4, 8, and 16 threads. Print a “threads – π estimate – error – time – $S$ – $E$” table and verify identical estimates for every thread count.

**3. Advanced level.** Create an `mcpi` console application estimating π by parallel Monte Carlo (random points in the unit square), with options `--samples`, `--blocks`, `--threads 1,2,4,8,16`, `--seed`, `--mode blocks|shared`, and `--help`. In `blocks` mode, each block’s generator uses `seed + block number`; `shared` uses `Random.Shared`. For 10⁶, 10⁷, 10⁸ trials (or the specified count), print the estimate, error, theoretical standard error $\sqrt{\pi (4 - \pi) / N}$, time, and speedup, and verify reproducibility in `blocks` mode. Write the table to CSV; argument errors use code 1.

### Variant 5. Merge sort {#v5}

**1. Initial level.** Create a console program that fills an array of 5,000,000 integers using a generator with a fixed seed, sorts copies with sequential and parallel merge sort (`Parallel.Invoke` for the two halves, cutoff 10,000 elements), verifies both results against `Array.Sort`, and prints sorting times and speedup.

**2. Basic level.** Create a console program that prompts for array size (10⁵–5·10⁷) and a comma-separated list of cutoffs for switching to sequential sorting (for example, `1000,10000,100000`), validates input, and measures parallel merge sort for each cutoff (median of three runs). Print a “cutoff – time, ms – speedup over sequential” table, mark the best cutoff, and verify that every result is sorted.

**3. Advanced level.** Create a `pmsort` console application sorting random integer arrays with parallel merge sort (halves in separate tasks, fragments below the cutoff sequentially), with options `--sizes`, `--threads`, `--threshold`, `--parallel-merge`, `--csv <file>`, and `--help`. With `--parallel-merge`, parallelize merging too: find the larger half’s middle element in the smaller half by binary search, then merge the parts in separate tasks. For each size and thread count, print time, $S$, and $E$ for both merge variants, verify against `Array.Sort`, and write CSV. Argument errors use code 1; incorrect sorting uses code 2.

### Variant 6. Photo brightness histogram {#v6}

**1. Initial level.** Create a console program generating an 8000×6000 grayscale image (byte values 0–255, fixed seed), building its brightness histogram sequentially and with `Parallel.For` using local histogram arrays (`localInit`, `localFinally`), and printing both times, histogram agreement, and the five most frequent brightness values.

**2. Basic level.** Create a console program that reads a user-specified PPM (P6) image, computes pixel brightness ($0 {,} 299 R + 0 {,} 587 G + 0 {,} 114 B$), and builds a histogram in three ways: a shared array with `Interlocked.Increment`, local histograms with `localInit`/`localFinally`, and `Partitioner.Create` with ranges. Print a time and speedup table for 16 threads, verify matching histograms, and print mean and median brightness.

**3. Advanced level.** Create a `histo` console application accepting paths to one or more PPM files or a folder, and options `--threads`, `--bins <count>`, `--csv <file>`, and `--help`. Build each file’s brightness histogram using local partition histograms, print a “file – size – mean – median – dark pixel fraction” table, and display the combined histogram as a text chart using `#`. For the largest file, print speedup and efficiency for 1, 2, 4, 8, 16 threads. Skip invalid files with error-stream messages; exit with code 2 if no files are processed.

### Variant 7. Conway’s Game of Life {#v7}

**1. Initial level.** Create a console program simulating 200 generations of Conway’s Game of Life on a toroidal 1000×1000 grid with 30% random initial occupancy (fixed seed). Compute each new generation into a separate array using `Parallel.For` over rows; print the live cell count every 50 generations and total time.

**2. Basic level.** Create a console program that prompts for grid size, generation count, and initial occupancy (5–95%), validates input, and simulates the Game of Life sequentially and in parallel by rows for 1, 2, 4, 8, and 16 threads. Verify identical final grids and print time per generation, speedup, and efficiency.

**3. Advanced level.** Create a `life` console application simulating Conway’s Game of Life on a toroidal grid (each generation computed in parallel by rows into a separate array), with options `--threads`, `--generations`, `--base-size <n>`, `--mode strong|weak`, `--pattern <file>`, and `--help`. In `strong` mode, grid size is fixed; in `weak`, its area grows proportionally to thread count (side $n \sqrt{p}$). Print a “threads – grid size – time per generation – $S$ or $T_{1} / T_{p}$” table and write CSV. Load the initial grid from a text file (`.` and `O`) or generate it randomly; for invalid files, report the line number to the error stream and use code 2.

### Variant 8. Word frequency in a text corpus {#v8}

**1. Initial level.** Create a console program that reads all `*.txt` files in a user-specified folder and counts word frequencies case-insensitively with PLINQ (`AsParallel`, `SelectMany`, `GroupBy`). Print the 20 most frequent words with counts and query time.

**2. Basic level.** Create a console program generating a text corpus (user-entered sentence count from 10⁴ to 10⁷, a 200-word vocabulary, fixed seed) and counting word frequencies in three ways: LINQ, PLINQ with `GroupBy`, and `Parallel.ForEach` with local dictionaries (`localInit`/`localFinally`). Verify matching results and print each method’s time and speedup and the 10 most frequent words.

**3. Advanced level.** Create a `wordfreq` console application accepting a text folder and options `--method linq|plinq|foreach|aggregate|all`, `--threads`, `--min-length`, `--top <k>`, `--stop-words <file>`, and `--help`. Count word frequencies with the selected methods, print a “method – threads – time – $S$ – $E$” table, verify agreement across all methods, and write the $k$ most frequent words to CSV. Skip unreadable files with error-stream messages; a missing folder uses exit code 2 and invalid options code 1.

### Variant 9. Prime numbers up to 10⁸ {#v9}

**1. Initial level.** Create a console program counting primes up to 10⁷ by testing divisors up to $\sqrt{n}$, sequentially and with `Parallel.For` using a thread-local counter. Print both counts and computation times.

**2. Basic level.** Create a console program that prompts for upper bound $N$ (10⁶–10⁹) and segment size (10⁴–10⁷), validates input, and counts primes using a segmented sieve of Eratosthenes: compute base primes up to $\sqrt{N}$ sequentially, then sieve segments in parallel. Print the prime count, largest prime, time, and speedup over a sequential segmented sieve.

**3. Advanced level.** Create a `primes` console application accepting options `--limit`, `--segment-sizes 32768,262144,2097152`, `--threads 1,2,4,8,16`, `--csv <file>`, and `--help`. Count primes with a parallel segmented sieve (a separate segment array per partition), print a “segment size – threads – time – $S$ – $E$” table, the best configuration, and the prime count, which must match across all runs (5,761,455 for 10⁸). Write the table to CSV; mismatched counts use exit code 2, argument errors code 1.

### Variant 10. k-means clustering {#v10}

**1. Initial level.** Create a console program generating 1,000,000 points in a plane around five centers (fixed seed) and performing 20 k-means iterations for $k = 5$, assigning points to their nearest centers with `Parallel.For`. Print the resulting center coordinates and average iteration time.

**2. Basic level.** Create a console program that prompts for point count, cluster count $k$, and maximum iterations, validates input, and runs k-means until centers stabilize (movement below $10^{- 6}$). Compute new centers in parallel using thread-local coordinate sums and point counts. Verify agreement with sequential centers and print iteration count, cluster sizes, time per iteration, and speedup.

**3. Advanced level.** Create a `kmeans` console application reading points from CSV (`x,y` or more dimensions) and accepting options `--k`, `--max-iter`, `--threads`, `--init random|plus`, `--seed`, `--out <file>`, and `--help`. Run k-means with parallel point assignment and center calculation (aggregation of local sums), print an “iteration – center movement – sum of squared distances – time, ms” table and speedup for 1, 2, 4, 8, 16 threads, and write cluster labels to a file. Report invalid CSV rows with line numbers to the error stream; an empty file uses exit code 2.

### Variant 11. Quicksort with tasks {#v11}

**1. Initial level.** Create a console program sorting an array of 10,000,000 random integers with quicksort, sorting the two partitions in parallel (`Parallel.Invoke`) down to recursion depth 4, then sequentially. Verify ordering and print time compared with `Array.Sort`.

**2. Basic level.** Create a console program that prompts for array size and maximum parallel recursion depth (0–10), validates input, and sorts three kinds of arrays with parallel quicksort: random, nearly sorted (1% swaps), and many duplicate values. Print a “data type – parallel quicksort time – `Array.Sort` time – ratio” table and verify every result.

**3. Advanced level.** Create a `pqsort` console application accepting options `--size`, `--depths 0,2,4,6,8`, `--pivot first|middle|random|median3`, `--cutoff <n>`, `--data random|sorted|dups|all`, and `--help`. Measure parallel quicksort for each depth and pivot selection method, compare with `Array.Sort` and sequential quicksort, and print a speedup table and the best configuration for each data type. Incorrect sorting produces an error-stream message and exit code 2.

### Variant 12. Sales prefix sums {#v12}

**1. Initial level.** Create a console program that computes an exclusive prefix sum for an array of daily store sales of length $2^{20}$ (random amounts from 0 to 10,000 UAH, fixed seed) using the Blelloch algorithm (up-sweep and down-sweep, levels executed through `Parallel.For`). Verify against sequential accumulation, printing the first 10 values and both times.

**2. Basic level.** Create a console program that reads daily sales amounts from a user-specified text file (one number per line), pads the array with zeros to a power of two, and computes an inclusive prefix sum with the Blelloch algorithm. Verify against sequential accumulation, print the day when cumulative sales first exceeded half the total, and print a timing table for levels executed in parallel starting at different pair-count thresholds (1, 1024, 65,536).

**3. Advanced level.** Create a `scan` console application accepting a sales CSV (`date,store,amount`) and options `--op sum|max|min`, `--threads`, `--min-pairs <n>`, `--csv <file>`, and `--help`. For each store, compute the prefix operation (cumulative sum, running maximum, or minimum) with the Blelloch algorithm, verify it with a sequential pass, and write the result to CSV. For a synthetic array of $2^{24}$ elements, print Blelloch time, speedup, and efficiency relative to a sequential pass for 1, 2, 4, 8, 16 threads. Send invalid rows to the error stream; argument errors use code 1.

### Variant 13. Substring search in logs {#v13}

**1. Initial level.** Create a console program generating an array of 5,000,000 log lines (fixed seed, lines containing `ERROR 503` inserted at random positions) and finding the index of the first line containing `ERROR 503` with `Parallel.For` and `Break`. Print `LowestBreakIteration`, the line itself, and search time compared with sequential search.

**2. Basic level.** Create a console program that reads all lines of a text log file (path and target substring entered by the user) and runs three searches: first occurrence (`Parallel.For` with `Break`), any occurrence (`Stop`), and total occurrence count (local counter). Verify that the first occurrence matches sequential search, and print line numbers, count, and each search’s time.

**3. Advanced level.** Create a `loggrep` console application accepting a log folder, substring or regular expression (`--regex`), and options `--first`, `--count`, `--threads`, `--timeout <s>`, and `--help`. Process files with `Parallel.ForEach` and `ParallelOptions` (a cancellation token with a timeout), and large files' lines in ranges. Print a “file – lines – occurrences – first occurrence” table, total count and time, and, for `--first`, the first occurrence in file and line order. After a timeout, print partial results marked “canceled” and exit with code 3; a missing folder uses code 2.

### Variant 14. Weather archive statistics {#v14}

**1. Initial level.** Create a console program generating 10,000,000 weather records (year 1980–2025, month, temperature; fixed seed) and computing mean, minimum, and maximum temperature over the entire period with one PLINQ `Aggregate` query using seed, update, combine, and result functions. Print the result and time compared with LINQ.

**2. Basic level.** Create a console program that reads a user-specified weather observations CSV (`date,station,temperature`), skips and counts invalid rows, and uses PLINQ to compute each year’s mean, minimum, and maximum temperature (`Aggregate` with a structure accumulator) and median (grouping and sorting). Print a yearly table and compare PLINQ and LINQ times.

**3. Advanced level.** Create a `climate` console application accepting one or more archive CSV files and options `--from <year>`, `--to <year>`, `--station <code>`, `--threads`, `--merge not|auto|full`, and `--help`. Use PLINQ to compute yearly and monthly statistics (mean, minimum, maximum, median, observation count), print a table with the mean temperature trend (linear regression by year), compare query times for different merge modes and thread counts, and verify that settings do not affect results. Count invalid rows and report the first 10 to the error stream; argument errors use code 1.

### Variant 15. Julia set {#v15}

**1. Initial level.** Create a console program computing the Julia set for $c = - 0 {,} 8 + 0 {,} 156 i$ on a 2000×1500 image (up to 500 iterations) using `Parallel.For` over rows, writing a grayscale PGM image and printing computation time.

**2. Basic level.** Create a console program that prompts for the real and imaginary parts of $c$, image dimensions, and maximum iterations, validates input, and computes the Julia set with three row distribution strategies: equal static blocks (`Parallel.For` over block numbers), `Parallel.For` over rows, and `Partitioner.Create` with dynamic load balancing. Print each method’s time for 16 threads and the slowest and fastest static block times, and save a PGM.

**3. Advanced level.** Create a `julia` console application computing the Julia set in parallel by rows and saving a PGM (`--out <file.pgm>`), with options `--c <re,im>`, `--size WxH`, `--iter`, `--partition static|rows|chunk|dynamic|all`, `--chunk <n>`, `--threads`, and `--help`. For each row partitioning method, measure time and load imbalance (iterations per thread, maximum/mean ratio), print a “method – threads – time – $S$ – imbalance” table, and verify identical images. Invalid `--c` or `--size` values produce error-stream messages and code 1.

### Variant 16. Black–Scholes options {#v16}

**1. Initial level.** Create a console program estimating the price of a European call option by Monte Carlo ($S_{0} = 100$, $K = 105$, $r = 5$%, $\sigma = 20$%, $T = 1$ year, 10,000,000 paths), in parallel with one generator per block. Print the estimated price, exact Black–Scholes value, and computation time.

**2. Basic level.** Create a console program that prompts for option parameters ($S_{0}$, $K$, $r$, $\sigma$, $T$, call/put type) and path count, validates input, and estimates price by parallel Monte Carlo (`Parallel.For` over blocks with their own generators and local sums). Print the estimate, 95% confidence interval, exact Black–Scholes value, and a time and speedup table for 1, 2, 4, 8, 16 threads.

**3. Advanced level.** Create an `mcoption` console application reading an option portfolio from CSV (`id,type,S0,K,r,sigma,T`) and accepting options `--paths`, `--threads`, `--seed`, `--antithetic` (antithetic paths to reduce variance), and `--help`. Price all options in parallel (`--level outer|inner`), print an “option – estimate – confidence interval – exact value – deviation” table and total portfolio value, plus time and speedup. Results must be reproducible with the same seed; file errors use exit code 2.

### Variant 17. Floyd–Warshall shortest paths {#v17}

**1. Initial level.** Create a console program generating a weighted directed graph with 1000 vertices (5% edge probability, weights 1–100, fixed seed) and computing the shortest-path matrix with Floyd–Warshall, executing the row loop $i$ through `Parallel.For` for each intermediate vertex $k$. Verify against a sequential version and print both times.

**2. Basic level.** Create a console program that prompts for vertex count (100–3000) and edge probability, validates input, and computes Floyd–Warshall shortest paths sequentially, with a parallel $i$ loop, and with a parallel $j$ loop. Explain in the output why the $k$ loop cannot be parallelized, verify matching matrices, and print time and speedup for each version with 16 threads.

**3. Advanced level.** Create an `apsp` console application that reads a graph from an edge-list file (`from to weight`) or generates a random graph (`--random <n> <p>`), accepting options `--threads`, `--path <u> <v>`, and `--help`. Compute shortest paths using parallel Floyd–Warshall with path reconstruction (a next-vertex matrix), print distance and route between the specified vertices, graph diameter, unreachable pair count, and time, speedup, and efficiency for 1, 2, 4, 8, 16 threads. Detect and report negative cycles with exit code 3; file errors use code 2.

### Variant 18. Grades at a large university {#v18}

**1. Initial level.** Create a console program generating 5,000,000 grade records (faculty, group, course, score 0–100; fixed seed) and grouping them by faculty with PLINQ. Print each faculty’s mean score, grade count, and fraction below 60, plus query time.

**2. Basic level.** Create a console program generating a user-specified number of grade records and running a PLINQ query for “the ten groups with the highest mean score” with different merge modes (`NotBuffered`, `AutoBuffered`, `FullyBuffered`), both with and without `AsOrdered`. Print query results, time to first element, and total time for each mode, and verify identical results.

**3. Advanced level.** Create a `grades` console application reading grade CSV files (`student,faculty,group,course,score`) and accepting options `--report faculty|group|course`, `--threshold <score>`, `--threads`, `--merge not|auto|full`, `--out <file>`, and `--help`. Build a PLINQ report (mean, median, standard deviation, failing grade count), print an aligned table with a totals row, write CSV, and compare LINQ and PLINQ query times for 1, 2, 4, 8, 16 threads. Skip rows with invalid scores and report them to the error stream.

### Variant 19. Video frame color conversion {#v19}

**1. Initial level.** Create a console program generating 200 color frames of 1280×720 pixels (RGB byte arrays, fixed seed) and converting each to grayscale with `Parallel.ForEach` over frames. Print the first and last frames' mean brightness and total time.

**2. Basic level.** Create a console program that prompts for frame count and resolution, generates frames, and converts them to grayscale in three ways: a parallel outer frame loop, a parallel inner row loop for each frame, and both loops in parallel. Verify identical results and print time and speedup for two workloads: many small frames and a few large frames.

**3. Advanced level.** Create a `frames` console application reading PPM frames from a folder (or generating them with `--generate <n> <WxH>`), accepting options `--filter gray|sepia|invert|contrast`, `--level outer|inner|both|auto`, `--threads`, `--out <folder>`, and `--help`. The `auto` mode chooses the parallelism level based on frame count and size. Process frames, save results, print a “level – threads – frames per second – $S$ – $E$” table, and explain the `auto` choice. Mixed resolutions or corrupt files produce error-stream messages and exit code 2.

### Variant 20. The $n$-body problem {#v20}

**1. Initial level.** Create a console program simulating 50 steps of motion for 3000 bodies under gravity (random masses and coordinates, fixed seed), computing accelerations with `Parallel.For` (the outer body loop, $O (n^{2})$), and updating positions after all forces are computed. Print total system energy at the start and end and simulation time.

**2. Basic level.** Create a console program that prompts for body count, step count, and time step, validates input, and simulates the $n$-body problem sequentially and in parallel for 1, 2, 4, 8, 16 threads. Verify that final coordinates agree with the sequential version (deviation at most $10^{- 9}$), and print time per step, speedup, efficiency, and relative energy change.

**3. Advanced level.** Create an `nbody` console application simulating $n$ bodies under gravity (all-pairs accelerations, $O (n^{2})$, parallelized by body). Read the initial state from CSV (`mass,x,y,z,vx,vy,vz`) or generate it (`--random <n>`); options are `--steps`, `--dt`, `--threads`, `--mode strong|weak`, `--snapshot <every k steps>`, and `--help`. Periodically write the state to CSV, monitor energy and momentum conservation, and print a strong or weak scaling table (body count grows as $n \sqrt{p}$). Invalid file rows produce a line number and code 2.

### Variant 21. Password hashing for an audit {#v21}

**1. Initial level.** Create a console program with a list of 20,000 passwords (generated with a fixed seed) that uses `Parallel.ForEach` to compute a PBKDF2 hash for each (`Rfc2898DeriveBytes.Pbkdf2`, SHA-256, 10,000 iterations, salt derived from the login). Print passwords processed per second and the first three hashes in hexadecimal.

**2. Basic level.** Create a console program that reads an account file `login;salt;hash` and a common-password dictionary (user-entered paths), then checks whether any account uses a dictionary password. Run `Parallel.ForEach` over accounts, report progress every second, and let Esc cancel through `CancellationToken` in `ParallelOptions`. Print weak accounts found (without plaintext passwords), checked account count, and throughput.

**3. Advanced level.** Create a `pwaudit` console application accepting an account file, dictionary file, and options `--iterations`, `--threads 1,2,4,8,16`, `--timeout <s>`, `--report <file>`, and `--help`. Check passwords in parallel, stop checking an account after its first match, cancel after the timeout, print a “threads – hashes per second – $S$ – $E$” table, and write an audit report (login, result, check time) to CSV. After cancellation, print partial results and exit with code 3; file format errors use code 2.

### Variant 22. Odd–even sort {#v22}

**1. Initial level.** Create a console program sorting 20,000 random integers with odd–even transposition sort, comparing each phase’s pairs through `Parallel.For`. Verify ordering, print the number of phases after which the array actually became sorted, and compare time with a sequential version.

**2. Basic level.** Create a console program that prompts for array size (1000–100,000), validates input, and sorts with sequential and parallel odd–even sort (each phase’s pairs divided into $p$ contiguous blocks) for 1, 2, 4, 8, 16 threads, and with sequential merge sort. Print time, speedup, efficiency, and the ratio of odd–even sort time to merge sort time.

**3. Advanced level.** Create an `oddeven` console application accepting options `--sizes`, `--threads`, `--early-exit` (stop if two consecutive phases have no swaps), `--csv <file>`, and `--help`. Measure parallel odd–even sort and parallel merge sort for every size and thread count, print an “$n$ – $p$ – odd–even time – merge sort time – $S$ – $E$” table, identify the array size above which parallel execution outperforms sequential execution, and write CSV. An incorrect result uses exit code 2.

### Variant 23. The 1D heat equation {#v23}

**1. Initial level.** Create a console program solving the one-dimensional heat equation with an explicit scheme on a rod with 1,000,000 nodes (initial temperature 100 in the middle tenth, 0 elsewhere, endpoints 0) for 1000 time steps. Compute each new time layer using `Parallel.For` with a range partitioner; print the center temperature and time.

**2. Basic level.** Create a console program that prompts for node count, step count, and coefficient $\alpha \cdot \Delta t / \Delta x^{2}$ (verify the stability condition: at most 0.5), solves the heat equation with an explicit scheme sequentially and in parallel for 1, 2, 4, 8, 16 threads, verifies matching final temperatures, and prints time per step, speedup, and efficiency.

**3. Advanced level.** Create a `heat1d` console application solving the one-dimensional heat equation on a rod with an explicit scheme, computing each new layer in parallel by ranges, with options `--nodes`, `--steps`, `--r` ($\alpha \cdot \Delta t / \Delta x^{2}$), `--threads`, `--mode strong|weak`, `--range-size`, `--profile <file>`, and `--help`. In `weak` mode, node count grows proportionally to thread count. Write the temperature profile to CSV every 100 steps, print a scaling table (using $T_{1} / T_{p}$ for weak scaling), and verify energy conservation with insulated ends. A stability violation ($r \gt 0 {,} 5$) produces an error-stream message and code 1.

### Variant 24. Ranking search results {#v24}

**1. Initial level.** Create a console program generating 2,000,000 documents (ID, keyword match count, page rank, date; fixed seed), computing each document’s relevance with a formula defined in the program, and using PLINQ `OrderByDescending` to print the top 10 documents and query time compared with LINQ.

**2. Basic level.** Create a console program generating a user-specified number of documents and querying the “20 most relevant documents” in four ways: LINQ, PLINQ `OrderByDescending(...).Take(20)`, PLINQ with `AsOrdered`, and PLINQ with custom “top k” aggregation (`Aggregate` with local `PriorityQueue` min-heaps). Verify identical results and print time and speedup.

**3. Advanced level.** Create a `rank` console application reading a document CSV and a query file (one query per line), accepting options `--top <k>`, `--method linq|orderby|topk`, `--ordered`, `--threads`, and `--help`. For each query, compute relevance from query-word occurrence counts and rank, return the top $k$ documents, write CSV results, and print a “method – threads – queries per second – $S$” table. Verify that `AsOrdered` and `AsUnordered` produce identical result sets, and report where ordering differs for equal scores.

### Variant 25. Parallel maximum reduction {#v25}

**1. Initial level.** Create a console program finding the maximum element and its index in an array of 100,000,000 random floating-point numbers (fixed seed), sequentially and with `Parallel.For` using local state (a value/index pair). Print results and times.

**2. Basic level.** Create a console program that prompts for array size and partition count $p$ (a power of two), validates input, and finds the maximum in three ways: a reduction tree (partial maxima, then pairwise level-by-level combination through `Parallel.For`), PLINQ `Max`, and `Aggregate` with a custom combining function. Print the maximum and index, tree level count, each method’s time and speedup, and verify that equal values select the lowest index.

**3. Advanced level.** Create a `reduce` console application accepting options `--size`, `--op max|min|sum|argmax|minmax`, `--parts 1,2,4,…,256`, `--threads`, and `--help`, implementing generic parallel tree reduction (operation supplied as a delegate, with identity-element validation). Test associativity on random triples, warn for a non-associative operation (such as `avg` of two numbers), and show how the result varies with partition count. Write an “operation – partitions – time – $S$” table to CSV; an unknown operation uses code 1.

### Variant 26. Perceptron on a dataset {#v26}

**1. Initial level.** Create a console program generating 1,000,000 linearly separable points in 10-dimensional space (fixed seed) and training a perceptron by batch gradient descent for 20 epochs, computing the gradient over all points with `Parallel.For` and local gradient vectors. Print accuracy every fifth epoch and time per epoch.

**2. Basic level.** Create a console program that prompts for point count, feature count, learning rate, and epochs, validates input, and trains logistic regression by batch gradient descent sequentially and in parallel (`Parallel.ForEach` with `Partitioner.Create` and local gradients). Verify trained weights agree within $10^{- 9}$ and print loss by epoch, accuracy, time per epoch, and speedup.

**3. Advanced level.** Create a `perceptron` console application reading a CSV dataset (features and a 0/1 label) and accepting options `--epochs`, `--lr`, `--test-split <fraction>`, `--threads`, `--batch full|mini <size>`, `--model <file>`, and `--help`. Normalize features in parallel, train with parallel gradient computation, print an “epoch – loss – training and test accuracy – time” table, save weights, and build a speedup table for 1, 2, 4, 8, 16 threads. Invalid CSV format produces a message with a line number and exit code 2.

### Variant 27. BFS on a large graph {#v27}

**1. Initial level.** Create a console program generating an undirected graph with 2,000,000 vertices and average degree 8 (fixed seed), performing level-by-level breadth-first search from vertex 0 and processing current-level vertices through `Parallel.ForEach`. Print each level’s vertex count, reachable vertex count, and time.

**2. Basic level.** Create a console program that prompts for vertex count and average degree, validates input, and runs sequential and parallel level-by-level BFS. In the parallel version, mark next-level vertices atomically (`Interlocked.CompareExchange` on the distance array) and collect them in thread-local lists. Verify matching distances and print level count, level sizes, time, and speedup.

**3. Advanced level.** Create a `pbfs` console application reading a graph from an edge list (`u v`) or generating it (`--random <n> <degree>`), accepting options `--source`, `--threads`, `--direction top-down|bottom-up|hybrid`, and `--help`. Perform parallel BFS with the selected approach (in `bottom-up`, unvisited vertices search for a parent in the current level), print a “level – vertices – method – level time” table, total time, and speedup for 1, 2, 4, 8, 16 threads, and verify distances against sequential BFS. An invalid source vertex or file produces an error-stream message and exit code 2.

### Variant 28. Photo mosaic {#v28}

**1. Initial level.** Create a console program generating 5000 “tiles” (random average RGB colors, fixed seed) and a target image of 400×300 blocks. For each block, find the tile with the closest mean color (Euclidean distance), using `Parallel.For` over block rows. Print the number of distinct tiles used and time.

**2. Basic level.** Create a console program that reads a target PPM image, block size, and a PPM tile folder (user-entered paths), computes tile mean colors in parallel (`Parallel.ForEach` over files) and image block mean colors, selects each block’s closest tile with restrictions on reuse by neighboring blocks, and saves the mosaic. Print stage times (reading, matching, writing) and matching speedup for 1, 2, 4, 8, 16 threads.

**3. Advanced level.** Create a `mosaic` console application accepting `target.ppm`, `tiles/`, and `output.ppm` arguments and options `--block <size>`, `--metric rgb|lab`, `--no-repeat <radius>`, `--threads`, `--cache <file>`, and `--help`. Cache tile mean colors in CSV (subsequent runs do not reread unchanged tiles), match tiles in parallel, and print stage times, the program’s sequential fraction, and predicted speedup from Amdahl’s law compared with measured speedup. Skip individual tile read errors with a message; a missing target image uses code 2.

### Variant 29. Sample sort {#v29}

**1. Initial level.** Create a console program sorting 10,000,000 random integers with sample sort using 8 buckets: an 800-element sample, 7 splitters, parallel bucket distribution with local lists, parallel bucket sorting, and concatenation. Verify ordering and print bucket sizes and time compared with `Array.Sort`.

**2. Basic level.** Create a console program that prompts for array size, bucket count (2–64), and sampling factor (sample elements per bucket), validates input, and sample-sorts arrays with uniform and normal value distributions. For each distribution, print minimum, maximum, and mean bucket size, imbalance coefficient (maximum/mean), time, and speedup over `Array.Sort`; verify sorting correctness.

**3. Advanced level.** Create a `samplesort` console application accepting options `--size`, `--buckets 2,4,8,16,32`, `--oversampling 1,4,16,64`, `--distribution uniform|normal|zipf|sorted`, `--threads`, `--csv <file>`, and `--help`. Distribute into buckets in two passes: parallel bucket-size counting and a prefix sum of offsets, then parallel element writes without locks. Print a “distribution – buckets – sampling factor – imbalance – time – $S$” table and the best parameters for each distribution, write CSV, and verify against `Array.Sort` (mismatch uses code 2).

### Variant 30. Metro traffic statistics {#v30}

**1. Initial level.** Create a console program generating 50,000,000 turnstile passage records (station 0–51, hour 5–23; fixed seed) and counting passages per station with `Parallel.ForEach`, `Partitioner.Create(0, n, rangeSize)`, and local counter arrays. Print the five busiest stations and time.

**2. Basic level.** Create a console program generating a user-specified number of passage records and building a “station × hour” table in parallel using a range partitioner with sizes 1, 1000, 100,000, and 10,000,000, and without a partitioner (`Parallel.For` with local state). Verify tables against sequential counting, print a “range size – range count – time – $S$” table, and identify the best range size.

**3. Advanced level.** Create a `metro` console application reading turnstile CSV logs (`timestamp,station,card,direction`) and accepting options `--from`, `--to`, `--range-sizes`, `--threads`, `--report hourly|daily|peak`, `--out <file>`, and `--help`. In parallel, compute passenger flow by station and hour, each station’s peak hours, and unique cards per day. Find the optimal range size for 1, 2, 4, 8, 16 threads, print a timing table, and write the report to CSV. Count invalid rows and report the first 10 to the error stream; argument errors use code 1 and missing files code 2.

## Procedure

1. Study the theory and worked examples.
2. For your variant, identify the data to partition, whether iterations are independent, which results need reduction, and the operation that combines them (associativity, commutativity).
3. Create a console project in JetBrains Rider; implement a sequential version, a parallel version (`Parallel`, `Partitioner`, or PLINQ), and a check that their results agree.
4. Measure time in *Release* configuration (warmup, median of runs) for 1, 2, 4, 8, and 16 threads, and calculate speedup and efficiency.
5. Write results to CSV, plot speedup, and explain deviations from ideal speedup.
6. Demonstrate the program, explain the code, table, and chart, and answer questions.
