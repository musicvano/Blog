---
title: "Tasks"
description: "Topic 12. MPI message passing: task variants"
outline: [2, 3]
sourceHash: "76d1cdd7aaa7082c7d117fc5327c7b66c40bc92ca171a7b69a68a1757df99b51"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Function integration {#v1}

**1. Initial level.** Create a C++ console program with MPI that computes the integral $\int_{0}^{2} x^{2} e^{- x} \mathrm{d} x$ with the midpoint rule using $10^{8}$ steps: rank 0 broadcasts the number of steps with `MPI_Bcast`, each rank sums its part, `MPI_Reduce` collects the sum, and rank 0 prints the result and the `MPI_Wtime` time.

**2. Basic level.** Create a C++ console program with MPI that, on rank 0, prompts for the function number ($\sin x$, $e^{- x^{2}}$, $\sqrt{1 - x^{2}}$), the integration limits, and the number of steps, validates the input (on error, all processes exit with code 1), sends the parameters in one message, and prints the integral, the error relative to the exact value, and the time of the slowest rank.

**3. Advanced level.** Create a CMake project with a C++ MPI program `integrate` that computes the integral of a function by distributing steps among ranks, with options `--func <name>`, `--range <a>:<b>`, `--steps <n>`, `--rule rect|trap|simpson`, `--csv <file>`, and `--help`. The program computes the integral with three rules and writes the number of processes, the rule, the time, and the error to CSV. A script runs the program for 1–8 processes and prints a table of speedup and efficiency; invalid options produce a message on `stderr` and code 1.

### Variant 2. Matrix multiplication {#v2}

**1. Initial level.** Create a C++ console program with MPI that multiplies two random $n \times n$ matrices ($n = 960$, fixed seed): rank 0 broadcasts matrix $B$ with `MPI_Bcast` and the rows of $A$ with `MPI_Scatter`, each rank multiplies its rows, and `MPI_Gather` collects $C$; rank 0 verifies 10 random elements.

**2. Basic level.** Create a C++ console program with MPI that prompts for the matrix size $n$ (any size, not necessarily a multiple of the number of processes), distributes rows with `MPI_Scatterv` and `MPI_Gatherv`, verifies the result with sequential multiplication on rank 0, and prints the computation time and communication time separately along with their fractions.

**3. Advanced level.** Create a CMake project with a `matmul` program with options `--size <n>`, `--algo rows|cannon`, `--repeat <k>`, `--csv <file>`, and `--help` that implements row distribution and Cannon’s algorithm on a square process grid (`MPI_Cart_create`, `MPI_Cart_shift`, `MPI_Sendrecv_replace`), checks that the number of processes is a perfect square, and prints a “processes – algorithm – time – GFLOPS – communication fraction” table. Parameter errors produce code 1.

### Variant 3. Odd–even sort {#v3}

**1. Initial level.** Create a C++ console program with MPI in which each rank generates 100,000 random integers (the seed equals the rank), sorts them with `std::sort`, and then performs $p$ phases of odd–even exchange with a neighbor (`MPI_Sendrecv` and merging), after which rank 0 gathers the array and checks that it is sorted.

**2. Basic level.** Create a C++ console program with MPI that prompts for the total count of numbers (from $10^{3}$ to $10^{8}$), distributes them among ranks taking the remainder into account, sorts them with the odd–even algorithm, checks the ordering (each rank compares its maximum with the minimum of its right neighbor), and prints the time and the number of phases after which exchanges no longer changed anything.

**3. Advanced level.** Create a CMake project with an `oddeven` program with options `--count <n>`, `--distribution uniform|sorted|reverse`, `--input <file>`, `--output <file>`, and `--help` that reads numbers from a binary file (each rank reads its own part), sorts them with the odd–even method with early termination (`MPI_Allreduce` of a change flag), writes the result, and prints a timing table for 1–8 processes and three distributions. File errors produce code 2.

### Variant 4. Monte Carlo estimation of π {#v4}

**1. Initial level.** Create a C++ console program with MPI in which each rank generates $10^{7}$ random points in a square with a `std::mt19937_64` generator seeded with $1000 + \text{rank}$ and counts the points inside a quarter circle, and rank 0, after `MPI_Reduce`, prints the estimate of $\pi$ and the error.

**2. Basic level.** Create a C++ console program with MPI that prompts for the total number of points and a base seed, divides the points among ranks (the remainder goes to the first ranks), prints the estimate of $\pi$, the absolute error, the standard error of the estimate, and the number of points per second, and checks that the result does not change when rerun with the same seed.

**3. Advanced level.** Create a CMake project with a C++ MPI program `mcpi` that estimates $\pi$ with the Monte Carlo method (the fraction of random points in a quarter circle, with points divided among ranks) with options `--points <n>`, `--seed <s>`, `--target <error>`, and `--help`. The program doubles the number of points until the standard error (computed via `MPI_Allreduce` of sums and sums of squares) falls below the target, and prints a table of iterations and the efficiency for 1–16 processes. Unreachable precision within $10^{11}$ points produces code 3.

### Variant 5. 2D plate heat conduction {#v5}

**1. Initial level.** Create a C++ console program with MPI that simulates heat conduction in a square plate of $1200 \times 1200$ nodes (top edge at 100 °C, the others at 0 °C, 1000 steps of an explicit scheme) divided into horizontal strips with halo row exchange via `MPI_Sendrecv`, and prints the mean temperature.

**2. Basic level.** Create a C++ console program with MPI that prompts for the plate size and the number of steps, uses a two-dimensional Cartesian topology (`MPI_Dims_create`, `MPI_Cart_create`, `MPI_Cart_shift`) and a derived type for columns, checks that the mean temperature matches the single-process result, and prints the time and the communication fraction.

**3. Advanced level.** Create a CMake project with a C++ MPI program `heat2d` that simulates heat conduction in a square plate with an explicit scheme, with the grid divided among processes and halo exchange, with options `--size <n>`, `--steps <k>`, `--decomp strips|grid` (strips or a Cartesian grid), `--weak`, `--csv <file>`, and `--help`. The program measures strong and weak scaling (in `--weak` mode, the size per process is constant) for 1–16 processes and writes the time, communication time, and efficiency to CSV. An invalid number of processes for the grid produces code 1.

### Variant 6. Mandelbrot manager–worker {#v6}

**1. Initial level.** Create a C++ console program with MPI that computes a 1200×800 Mandelbrot set (at most 1000 iterations): rank 0 hands out row numbers to workers one at a time, collects the results, and writes the image to `mandel.pgm`.

**2. Basic level.** Create a C++ console program with MPI that computes the Mandelbrot set and writes it to PGM. The program prompts for the resolution, the maximum number of iterations, and the number of rows per task (1–64), implements static row distribution and dynamic distribution (manager–worker), and prints for both the time, the number of rows of each worker, and the ratio of the times of the fastest and slowest workers.

**3. Advanced level.** Create a CMake project with a C++ MPI program `mandelmw` that computes the Mandelbrot set with the manager–worker scheme (the manager also computes rows between replies, `MPI_Iprobe`) with options `--size <w>x<h>`, `--iter <n>`, `--chunk <k>`, `--mode static|cyclic|dynamic`, `--image <file.pgm>`, `--csv <file>`, and `--help`. The program writes the image and prints a timing table for all modes and chunk sizes on 2–16 processes.

### Variant 7. Distributed k-means {#v7}

**1. Initial level.** Create a C++ console program with MPI in which each rank generates 200,000 random points in the plane around three centers, and the k-means algorithm ($k = 3$, 20 iterations) combines the sums of coordinates and the point counts of the clusters with `MPI_Allreduce` at each iteration; rank 0 prints the centers found.

**2. Basic level.** Create a C++ console program with MPI that clusters points in the plane with the k-means algorithm. The program prompts for the number of points, $k$, and a center shift threshold, generates the points on rank 0 and distributes them with `MPI_Scatterv`, runs iterations (cluster sums are combined with `MPI_Allreduce`) until the shift is below the threshold, and prints the centers, the number of points in the clusters, the number of iterations, and the time per iteration.

**3. Advanced level.** Create a CMake project with a `kmeans` program with options `--input <file.csv>`, `--k <k>`, `--max-iter <n>`, `--tol <e>`, `--output <file.csv>`, and `--help` that reads points from CSV (each rank reads its own share of the lines), writes the cluster labels, and prints a “processes – iterations – time per iteration – `MPI_Allreduce` fraction” table. Format errors produce the line number on `stderr` and code 2.

### Variant 8. A histogram of large data {#v8}

**1. Initial level.** Create a C++ console program with MPI in which rank 0 generates $10^{7}$ grades from 0 to 100 and distributes them with `MPI_Scatter`, each rank builds a histogram of 10 bins, and `MPI_Reduce` with `MPI_SUM` over an array of 10 counters collects the overall histogram.

**2. Basic level.** Create a C++ console program with MPI that prompts for the number of values and the number of bins, distributes the data with `MPI_Scatterv`, builds a histogram, checks that the sum of the counters equals the number of values, and prints the histogram as text bars and the time for different numbers of processes.

**3. Advanced level.** Create a CMake project with a `histo` program with options `--input <file>`, `--bins <k>`, `--range <min>:<max>`, `--auto-range`, and `--help` that reads a binary file of `double` numbers (each rank reads its own part via a file offset), finds the limits via `MPI_Allreduce` with `--auto-range`, and prints the histogram, the quartiles, and the time. A missing file produces code 2.

### Variant 9. The Game of Life with nonblocking exchange {#v9}

**1. Initial level.** Create a C++ console program with MPI that simulates the Game of Life on a $1000 \times 1000$ board (a torus) divided into horizontal strips, exchanges halo rows via `MPI_Sendrecv`, and prints the number of live cells after 100 generations.

**2. Basic level.** Create a C++ console program with MPI that simulates Conway’s Game of Life on a toroidal board divided into horizontal strips. The program prompts for the board size and the number of generations, exchanges halo rows with nonblocking `MPI_Isend`/`MPI_Irecv`, computes the interior rows during the exchange and the boundary rows after `MPI_Waitall`, and compares the time with a blocking version (`MPI_Sendrecv`).

**3. Advanced level.** Create a CMake project with a C++ MPI program `lifempi` that simulates Conway’s Game of Life with the board divided into strips and halo exchange, with options `--size <n>`, `--gens <k>`, `--exchange blocking|overlap`, `--pattern <file.rle>`, `--snapshot <step>`, and `--help`. The program loads a pattern from an RLE file, saves snapshots of the board to PGM (gathered on rank 0), and prints a timing table of both exchange methods for 1–16 processes.

### Variant 10. Primes in a range {#v10}

**1. Initial level.** Create a C++ console program with MPI that counts the primes from 2 to $5 \cdot 10^{7}$ by trial division: the range is divided into equal contiguous parts, and `MPI_Reduce` sums the counts; rank 0 prints the count and the time of each rank (`MPI_Gather`).

**2. Basic level.** Create a C++ console program with MPI that prompts for the range limits, compares block, cyclic (number $k$ goes to rank $k \bmod p$), and dynamic (manager–worker with blocks of 10,000 numbers) distributions, and prints for each the number of primes, the time, and the ratio of the times of the fastest and slowest ranks.

**3. Advanced level.** Create a CMake project with a `primes` program with options `--range <a>:<b>`, `--method trial|sieve`, `--split block|cyclic|dynamic`, `--list <file>`, and `--help`, where the `sieve` method is a segmented sieve of Eratosthenes (the base primes are broadcast with `MPI_Bcast`), and `--list` writes the numbers found (gathered with `MPI_Gatherv`). Print a timing table for all combinations.

### Variant 11. Sample sort {#v11}

**1. Initial level.** Create a C++ console program with MPI in which each rank sorts 200,000 random numbers, rank 0 gathers $p - 1$ samples from each, chooses $p - 1$ splitters, and broadcasts them with `MPI_Bcast`, after which the program prints how many numbers of each rank fall into each bucket.

**2. Basic level.** Create a C++ console program with MPI that sorts random numbers generated on each rank with the full sample sort algorithm: local sorting, choosing splitters from samples, exchanging counts with `MPI_Alltoall`, exchanging buckets with `MPI_Alltoallv`, local merging, and checking the ordering at rank boundaries. The program prints the bucket sizes, the imbalance factor, and the time.

**3. Advanced level.** Create a CMake project with a `samplesort` program with options `--count <n>`, `--distribution uniform|normal|zipf`, `--oversampling <s>`, and `--help` that compares sample sort with odd–even sort and with gathering on rank 0 followed by `std::sort`, and prints a table of time and imbalance for 1–16 processes. A failed ordering check produces code 4.

### Variant 12. PageRank of a small web graph {#v12}

**1. Initial level.** Create a C++ console program with MPI that computes PageRank (damping factor 0.85, 50 iterations) for a graph of 8 pages defined in the program: each rank updates the ranks of its pages, and `MPI_Allgather` gathers the vector on all processes; print the page ranks.

**2. Basic level.** Create a C++ console program with MPI that reads a graph from an edge list (the user enters the file name), distributes vertices among ranks taking the remainder into account (`MPI_Allgatherv`), runs iterations until the change is below $10^{- 8}$ (`MPI_Allreduce` of the norm), and prints the 10 pages with the highest rank and the number of iterations.

**3. Advanced level.** Create a CMake project with a `pagerank` program with options `--edges <file>`, `--damping <d>`, `--tol <e>`, `--top <k>`, and `--help` that generates or reads a graph (up to $10^{6}$ vertices), handles “dangling” vertices, saves the result to CSV, and prints a “processes – iterations – time – communication fraction” table. File errors produce code 2.

### Variant 13. The n-body problem on a ring {#v13}

**1. Initial level.** Create a C++ console program with MPI in which each rank has 500 bodies with random masses and coordinates, blocks of bodies are passed around a ring (`MPI_Sendrecv`) $p - 1$ times, and each rank computes the forces from all bodies; rank 0 prints the accelerations of the first three bodies.

**2. Basic level.** Create a C++ console program with MPI that prompts for the number of bodies and steps and simulates the motion of bodies under mutual gravitation with the Euler method: blocks of bodies are passed around a ring of ranks. The program checks conservation of the system’s momentum (`MPI_Reduce`) and prints the time per step and a comparison with a version in which all coordinates are gathered with `MPI_Allgather`.

**3. Advanced level.** Create a CMake project with a C++ MPI program `nbodyring` that simulates the motion of bodies under mutual gravitation with options `--bodies <n>`, `--steps <k>`, `--exchange ring|allgather`, `--overlap`, `--csv <file>`, and `--help`. In `ring` mode, blocks of bodies are passed around a ring of ranks, and with `--overlap`, with nonblocking operations while the forces of the current block are computed. The program writes the trajectories of three bodies and prints a timing table for 1–16 processes.

### Variant 14. A word counter for files {#v14}

**1. Initial level.** Create a C++ console program with MPI that receives text file names as arguments, distributes the files among ranks by number ($i \bmod p$), counts the words in each file, and collects the counts on rank 0 (`MPI_Reduce`), printing the total number of words.

**2. Basic level.** Create a C++ console program with MPI that, for the files in a given folder, builds frequency dictionaries on each rank, sends them to rank 0 as variable-length strings (`MPI_Probe` and `MPI_Get_count`), merges them, and prints the 20 most frequent words and the time.

**3. Advanced level.** Create a CMake project with a C++ MPI program `wordcount` that builds a word frequency dictionary for the text files of a folder, distributing the files among ranks, with options `--dir <folder>`, `--top <k>`, `--min-length <n>`, `--balance files|bytes` (by number of files or by total size), and `--help`. The ranks’ dictionaries are merged by a tree of pairwise exchanges ($\log_{2} p$ steps); the program prints the $k$ most frequent words and writes the result to CSV. A missing folder produces code 2.

### Variant 15. Election results {#v15}

**1. Initial level.** Create a C++ console program with MPI in which each rank simulates a polling station: it generates the votes of 1000 voters for 5 candidates (the seed equals the rank), and `MPI_Reduce` of an array of 5 counters gives the total on rank 0 with percentages.

**2. Basic level.** Create a C++ console program with MPI in which each rank produces a variable-length text report of its polling station (number, number of voters, votes), and rank 0 gathers the reports with `MPI_Gatherv` (lengths with `MPI_Gather`), verifies the checksums, and prints a table of stations and the total.

**3. Advanced level.** Create a CMake project with an `elections` program with options `--input <reports folder>`, `--threshold <percent>`, `--report <file.csv>`, and `--help` that distributes the report files among ranks, detects reports with errors (the sum of votes exceeds the number of voters), and prints the total, the candidates above the threshold, and a list of erroneous reports on `stderr`; code 3 if there are errors.

### Variant 16. A hybrid Jacobi method {#v16}

**1. Initial level.** Create a C++ console program with MPI and OpenMP that solves the system $(2 + \sigma) u_{i} - u_{i - 1} - u_{i + 1} = b_{i}$ for $10^{6}$ unknowns with the Jacobi method, dividing them into blocks among ranks with halo exchange, and parallelizes the update loop within a block with `#pragma omp parallel for`; use `MPI_Init_thread` with `MPI_THREAD_FUNNELED`.

**2. Basic level.** Create a C++ console program with MPI and OpenMP that solves the system $(2 + \sigma) u_{i} - u_{i - 1} - u_{i + 1} = b_{i}$ with the Jacobi method, dividing the unknowns into blocks among ranks with halo exchange and updating each block in parallel with threads. The program prompts for the number of unknowns, the number of iterations, and $\sigma$, iterates until the residual norm is below $10^{- 10}$ (`MPI_Allreduce` every 10 iterations), checks the provided thread support level, and prints the number of ranks, threads, and iterations, the time, and the error.

**3. Advanced level.** Create a CMake project with a C++ MPI and OpenMP program `hybridjacobi` that solves the system $(2 + \sigma) u_{i} - u_{i - 1} - u_{i + 1} = b_{i}$ with the Jacobi method (blocks among ranks with halo exchange, block updates by threads) with options `--size`, `--iters`, `--csv`, and `--help`. A script runs the program in “ranks × threads” configurations 8×1, 4×2, 2×4, 1×8 with `--map-by slot:PE=<t>` and `--report-bindings`, checks the binding, and writes the time, communication time, and speedup to CSV.

### Variant 17. Breadth-first search in a graph {#v17}

**1. Initial level.** Create a C++ console program with MPI that, for a $100 \times 100$ grid graph defined in the program with vertices distributed in blocks among ranks, performs a level-synchronous breadth-first search from vertex 0: after each level, the frontier is combined with `MPI_Allgather`; print the number of levels and the number of vertices at each level.

**2. Basic level.** Create a C++ console program with MPI that generates a random graph (the user enters the number of vertices and the average degree), performs BFS by sending requests to vertex owners via `MPI_Alltoall` of counts and `MPI_Alltoallv` of vertices, and prints the distances to 10 random vertices and the time.

**3. Advanced level.** Create a CMake project with a `bfsmpi` program with options `--graph <file>`, `--source <v>`, `--distances <file>`, and `--help` that reads a graph as an edge list, verifies the result with a sequential BFS on rank 0 for graphs of up to $10^{6}$ vertices, and prints a table of levels and frontier sizes and the time for 1–16 processes. Unreachable vertices have distance $- 1$.

### Variant 18. Gaussian elimination {#v18}

**1. Initial level.** Create a C++ console program with MPI that solves an $n \times n$ system ($n = 500$, a random diagonally dominant matrix) with Gaussian elimination and cyclic row distribution: at each step, the owner of the pivot row broadcasts it with `MPI_Bcast`; print the maximum residual.

**2. Basic level.** Create a C++ console program with MPI that prompts for $n$, performs Gaussian elimination with partial pivoting in the column (`MPI_Allreduce` with `MPI_MAXLOC`) and back substitution, and prints the residual, the time, and a comparison of block and cyclic row distributions.

**3. Advanced level.** Create a CMake project with a `gaussmpi` program with options `--input <file>`, `--size <n>`, `--distribution block|cyclic`, `--output <file>`, and `--help` that reads a system from a text file, detects a singular matrix (code 3), writes the solution, and prints a table of time and residual for 1–16 processes.

### Variant 19. The 1D wave equation {#v19}

**1. Initial level.** Create a C++ console program with MPI that simulates string vibration (an explicit scheme for the wave equation, $10^{6}$ nodes, 2000 steps) divided into blocks with halo exchange via `MPI_Sendrecv`, and prints the energy of the string at the beginning and at the end.

**2. Basic level.** Create a C++ console program with MPI that simulates string vibration (an explicit scheme for the wave equation) divided into blocks among ranks with halo exchange. The program prompts for the number of nodes per process, the number of steps, and the Courant number (with a stability check), measures weak scaling for 1–16 processes, and prints the time, the efficiency, and the change in the string’s energy.

**3. Advanced level.** Create a CMake project with a C++ MPI program `wave1d` that simulates string vibration with an explicit scheme for the wave equation, with blocks of nodes on ranks and halo exchange, with options `--nodes <n>`, `--steps <k>`, `--courant <c>`, `--mode strong|weak`, `--snapshots <folder>`, and `--help`. The program writes string profiles to CSV (gathered with `MPI_Gatherv`), checks energy conservation within a tolerance, and prints a scalability table. An unstable scheme produces code 1.

### Variant 20. Retail chain sales statistics {#v20}

**1. Initial level.** Create a C++ console program with MPI in which rank 0 creates 100,000 sales records (a structure: store, amount, date), describes them with a derived type `MPI_Type_create_struct`, and distributes them with `MPI_Scatter`, and `MPI_Reduce` sums the revenue for 10 stores.

**2. Basic level.** Create a C++ console program with MPI that reads sales records from CSV on rank 0 (the user enters the file name), distributes them with `MPI_Scatterv` using a derived type, computes the revenue, the number of receipts, and the average receipt by store and month, and prints a table.

**3. Advanced level.** Create a CMake project with a `salesmpi` program with options `--input <file.csv>`, `--group shop|month|both`, `--top <k>`, `--report <file>`, and `--help` that finds the largest receipt with the store number using a custom reduction operation (`MPI_Op_create`), skips invalid lines with a message on `stderr`, and prints a report. A missing file produces code 2.

### Variant 21. Ray tracing {#v21}

**1. Initial level.** Create a C++ console program with MPI that renders a scene of three spheres (an 800×600 image, one ray per pixel), distributing rows among ranks and gathering them with `MPI_Gather` on rank 0 into `scene.ppm`.

**2. Basic level.** Create a C++ console program with MPI that renders a scene of spheres by ray tracing. The program prompts for the resolution and the number of rays per pixel, distributes 32×32 tiles among workers with the manager–worker scheme, gathers the image into a PPM file, and prints the time and the number of tiles of each worker.

**3. Advanced level.** Create a CMake project with a C++ MPI program `raympi` that renders by ray tracing (with shadows and reflections) a scene described in a text file, distributing image tiles among processes. Options: `--scene <file>`, `--size <w>x<h>`, `--spp <n>`, `--tile <k>`, `--output <file.ppm>`, `--help`. The program saves the image and prints a timing table for static and dynamic tile distribution on 2–16 processes.

### Variant 22. Forest fires {#v22}

**1. Initial level.** Create a C++ console program with MPI that simulates a forest fire cellular automaton (tree, fire, ash) on a $600 \times 600$ grid with a 2D Cartesian topology and halo exchange, starting from a fire in the center, and prints the number of burned trees.

**2. Basic level.** Create a C++ console program with MPI that simulates a forest fire cellular automaton (tree, fire, ash) on a grid with a 2D Cartesian topology and halo exchange. The program prompts for the grid size, the forest density, and the ignition probability, uses independent generators based on global coordinates (the result does not depend on the number of processes), and prints the fraction of burned trees and the number of steps until the fire dies out.

**3. Advanced level.** Create a CMake project with a C++ MPI program `fire` that simulates a forest fire cellular automaton on a grid distributed among processes with options `--size <n>`, `--density <d1,d2,…>`, `--runs <k>`, `--wind <direction>`, `--csv <file>`, and `--help`. For each forest density, the program performs $k$ simulations, records the average fraction of burned trees and the time, and prints a table and the density at which the fraction exceeds 50 %.

### Variant 23. Substring search in a genome {#v23}

**1. Initial level.** Create a C++ console program with MPI in which rank 0 generates a DNA sequence of $10^{8}$ ACGT characters and distributes parts with `MPI_Scatter`, each rank counts the occurrences of a given pattern of length 12 in its part, and `MPI_Reduce` gives the total count.

**2. Basic level.** Create a C++ console program with MPI that finds all occurrences of a pattern of length $m$ in a generated DNA sequence: rank 0 distributes parts of the sequence, and each rank receives $m - 1$ characters from its right neighbor (`MPI_Sendrecv`) to account for occurrences at part boundaries. The positions of the occurrences are gathered with `MPI_Gatherv` on rank 0 and verified with a sequential search.

**3. Advanced level.** Create a CMake project with a `dnasearch` program with options `--genome <file.fasta>`, `--patterns <file>`, `--mismatches <k>`, and `--help` that searches for several patterns allowing $k$ substitutions and prints a “pattern – count – first positions” table and the time for 1–16 processes. FASTA format errors produce code 2.

### Variant 24. Simpson’s rule integration to a given precision {#v24}

**1. Initial level.** Create a C++ console program with MPI that computes $\int_{0}^{1} 4 / (1 + x^{2}) \mathrm{d} x$ with Simpson’s rule using $10^{6}$ subintervals distributed among ranks, and prints the result and the error.

**2. Basic level.** Create a C++ console program with MPI that computes an integral with Simpson’s rule with subintervals distributed among ranks. The program prompts for the function, the limits, and the precision, doubles the number of subintervals until the difference between two approximations (identical on all ranks thanks to `MPI_Allreduce`) is below the precision, and prints a table of doublings.

**3. Advanced level.** Create a CMake project with a `simpson` program with options `--func <name>`, `--range <a>:<b>`, `--eps <e>`, `--adaptive`, and `--help`, where the `--adaptive` mode distributes subintervals with the manager–worker scheme with recursive subdivision, and print a comparison of the uniform and adaptive methods by the number of function evaluations and the time.

### Variant 25. Document clustering in groups {#v25}

**1. Initial level.** Create a C++ console program with MPI that divides processes into two groups with `MPI_Comm_split` (even and odd ranks); each group computes the sum of its ranks with `MPI_Allreduce` in its own communicator, and each process prints its rank in the world and in the group.

**2. Basic level.** Create a C++ console program with MPI in which documents (frequency vectors of 100 words) are distributed among ranks, processes are divided into $g$ groups (entered by the user), each group runs k-means with its own $k$ in its own communicator, and rank 0 gathers the clustering quality of the groups and prints the best $k$.

**3. Advanced level.** Create a CMake project with a `docclust` program with options `--input <folder>`, `--k-list 2,4,8`, `--groups <g>`, and `--help` that builds TF-IDF vectors of text files, runs k-means for different $k$ in parallel in process groups, and prints a “$k$ – sum of squared distances – time” table.

### Variant 26. Bank risk simulation {#v26}

**1. Initial level.** Create a C++ console program with MPI in which each rank simulates $10^{6}$ scenarios of the annual change in portfolio value (a normal distribution of returns, the seed equals the rank), and rank 0, after `MPI_Reduce`, prints the average loss.

**2. Basic level.** Create a C++ console program with MPI in which ranks simulate scenarios of the annual change in portfolio value with the Monte Carlo method. The program prompts for the number of scenarios, the portfolio composition (3 assets with return and volatility), and the confidence level, gathers the losses on rank 0 (`MPI_Gatherv`), and prints the VaR, the expected shortfall, and a 95 % confidence interval of the mean.

**3. Advanced level.** Create a CMake project with a `varsim` program with options `--portfolio <file.csv>`, `--scenarios <n>`, `--confidence 0.95,0.99`, `--seed <s>`, and `--help` that computes VaR without gathering all scenarios (a histogram of losses via `MPI_Reduce` and a quantile search), compares it with the exact method for small $n$, and prints a table. File errors produce code 2.

### Variant 27. Blocking and nonblocking communication {#v27}

**1. Initial level.** Create a C++ console program with MPI in which ranks form a ring and pass a block of 1000 `double` numbers to the right neighbor 100 times in three ways (`MPI_Sendrecv`, `MPI_Isend`/`MPI_Irecv` with `MPI_Waitall`, even/odd with `MPI_Send`/`MPI_Recv`) and prints the time of each.

**2. Basic level.** Create a C++ console program with MPI that prompts for the block size, demonstrates a deadlock with `MPI_Ssend` (after a timeout, `MPI_Test` prints a warning and terminates the program with `MPI_Abort`), and measures the size at which `MPI_Send` stops completing without a receiver.

**3. Advanced level.** Create a CMake project with an `overlap` program with options `--sizes 1e3,1e5,1e7`, `--work <µs>`, `--mode block|nonblock|test`, and `--help` that measures what fraction of the communication time can be hidden behind computation with nonblocking operations (with and without periodic `MPI_Test`), and prints a table for all sizes.

### Variant 28. A hybrid Julia set {#v28}

**1. Initial level.** Create a C++ console program with MPI and OpenMP that computes a Julia set ($c = - 0 {,} 8 + 0 {,} 156 i$, 1600×1200, 1000 iterations): rows are distributed cyclically among ranks, and within a rank among threads with `schedule(dynamic)`; rank 0 gathers the number of iterations.

**2. Basic level.** Create a C++ console program with MPI and OpenMP that computes a Julia set (rows among ranks, and within a rank among threads). The program prompts for $c$, the resolution, and the number of iterations, gathers the image on rank 0 (`MPI_Gatherv`) into a PGM file, and prints the number of ranks, the number of threads, the thread support level, and the time.

**3. Advanced level.** Create a CMake project with a C++ MPI and OpenMP program `juliahybrid` that computes a Julia set (rows among ranks, and within a rank among threads) with options `--c`, `--size`, `--iter`, and `--help`, and a script that compares “ranks × threads” configurations with different `--map-by` and `--bind-to` (including `--bind-to none` and a single rank with 8 threads without `PE`), writes the time and the binding from `--report-bindings` to CSV, and prints the best configuration.

### Variant 29. Prefix sum {#v29}

**1. Initial level.** Create a C++ console program with MPI in which each rank has 1000 random numbers, computes a local prefix sum, and obtains its rank offset with `MPI_Exscan`; rank 0 gathers the array and verifies it with a sequential computation.

**2. Basic level.** Create a C++ console program with MPI that implements a prefix sum of the ranks’ sums with the recursive doubling algorithm ($\log_{2} p$ steps of `MPI_Sendrecv` with rank $r \pm 2^{k}$), compares the result and time with `MPI_Scan`, and prints a table.

**3. Advanced level.** Create a CMake project with a `prefix` program with options `--count <n>`, `--method scan|doubling|gather`, `--op sum|max`, and `--help` that supports an arbitrary (not only a power of two) number of processes, verifies the result, and prints a timing table of the methods for 1–16 processes. A failed check produces code 4.

### Variant 30. The α–β model {#v30}

**1. Initial level.** Create a C++ console program with MPI in which ranks 0 and 1 perform a “ping-pong” with messages from 1 byte to 1 MB (in multiples of 4), and rank 0 prints a table of one-way transfer time and bandwidth.

**2. Basic level.** Create a C++ console program with MPI that measures a “ping-pong” for sizes from a file or the keyboard, finds $\alpha$ and $\beta$ of the model $T (m) = \alpha + \beta m$ with the least squares method, and prints the measured and predicted times with the relative error.

**3. Advanced level.** Create a CMake project with an `alphabeta` program with options `--sizes <list>`, `--reps <k>`, `--pairs same-node|any`, `--csv <file>`, and `--help` that measures the parameters for pairs of ranks on one node and on different nodes (a hostfile), predicts the halo exchange time for a given grid and number of processes, and compares it with the measured time.

## Procedure

1. Study the theory and worked examples.
2. Install Open MPI in Ubuntu 26.04 (WSL2 or a virtual machine), check the version with `ompi_info --version`, and run the “Hello, MPI” example with 4 processes.
3. Create a CMake project with `find_package(MPI REQUIRED)` (and `OpenMP` for hybrid tasks), implement a sequential version of the task, and verify the result of the parallel version for different numbers of processes, including ones that do not evenly divide the problem size.
4. Make sure there are no deadlocks: run the program with large messages and, if needed, replace `MPI_Send` with `MPI_Ssend` to check.
5. Measure the time for 1, 2, 4, 8, and 16 processes (median of at least 5 runs, `MPI_Wtime`, the time of the slowest rank) and the communication fraction, and for hybrid tasks, different “ranks × threads” configurations with `--report-bindings`; build a table and a speedup chart and explain the results. If several VMs are available, repeat the measurements with a hostfile.
6. Demonstrate the program, explain the code and measurement results, and answer the review questions.
