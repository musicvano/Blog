---
title: "Tasks"
description: "Topic 10. OpenMP: task variants"
outline: [2, 3]
sourceHash: "081f96e1c17f679b3856900db0ef7a8cd1a0de87406b405ebc7d55393042d40f"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Heat conduction in a plate {#v1}

**1. Initial level.** Create a C++ console program with OpenMP that simulates the heating of a 500×500-node square plate (left edge 100 °C, the rest 0 °C) with an explicit scheme with the coefficient $r = 0 {,} 2$ for 1000 steps, parallelizing the node updates with the `parallel for collapse(2)` directive, and prints the temperature at the center of the plate, the sum of the temperatures, and the computation time (`omp_get_wtime`).

**2. Basic level.** Create a C++ console program with OpenMP that simulates the heating of a square plate (left edge 100 °C, the rest 0 °C) with an explicit scheme. The program prompts for the grid size $n$ (100 to 4000) and the number of steps (1 to 10,000), validates the input, runs the simulation sequentially and in parallel (`collapse(2)`, first-touch initialization) for 1, 2, 4, 8, and 16 threads, checks that the temperature difference does not exceed $10^{- 12}$, and prints a “threads – time, s – $S$ – $E$” table.

**3. Advanced level.** Create a CMake project (`find_package(OpenMP)`, the `OpenMP::OpenMP_CXX` target) with a `heat2d` program that simulates the heating of a square plate with an explicit scheme (node updates with `parallel for collapse(2)`) with the options `--size <n>`, `--steps <k>`, `--threads 1,2,4,8`, `--init parallel|serial`, `--csv <file>`, `--image <file.pgm>`, and `--help`. The program prints the median of three runs, the speedup, and the efficiency for each thread count with the current `OMP_PROC_BIND` and `OMP_PLACES`, and writes a CSV and a PGM temperature image. A script runs the program for `OMP_PROC_BIND=close|spread` and `OMP_PLACES=threads|cores`. Invalid options go to `stderr` with exit code 1.

### Variant 2. The Mandelbrot set {#v2}

**1. Initial level.** Create a C++ console program with OpenMP that computes the Mandelbrot set for a 1600×1200-point image (at most 1000 iterations per point) with the `parallel for` directive over rows, writes the result to the file `mandel.pgm`, and prints the total number of iterations and the computation time.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the image dimensions (100 to 8000) and the maximum number of iterations (100 to 10,000), validates the input, and computes the Mandelbrot set with `schedule(static)`, `schedule(dynamic, 1)`, `schedule(dynamic, 16)`, and `schedule(guided)`. For each kind, the program prints the median of three runs, the speedup relative to the sequential version, and the ratio of the working times of the least and most loaded threads, and checks that the total number of iterations matches.

**3. Advanced level.** Create a CMake project with a `mandelbench` program that computes the Mandelbrot set with a parallel loop over rows with `schedule(runtime)` and accepts the options `--size <w>x<h>`, `--iter <n>`, `--schedules static,dynamic,guided`, `--chunks 1,8,64`, `--threads 1,2,4,8,16`, `--csv <file>`, `--image <file.pgm>`, and `--help`. For each combination of schedule kind (`omp_set_schedule`), chunk size, and thread count, the program measures the median of three runs, prints a “kind – chunk – threads – time – $S$ – $E$” table, marks the best combination for each thread count, and writes a CSV. An invalid schedule kind or size goes to `stderr` with exit code 1.

### Variant 3. The n-queens problem {#v3}

**1. Initial level.** Create a C++ console program with OpenMP that counts the placements of $n = 12$ queens on an $n \times n$ chessboard, creating a separate `task` for each position of the queen in the first row, collects the task results without a race, and prints the number of solutions (14,200) and the time.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the board size $n$ (4 to 16) and the cut-off depth $d$ (0 to 4), validates the input, and counts the solutions to the $n$-queens problem by a recursive search with OpenMP tasks down to depth $d$ (sequentially below it). The program prints the number of solutions, the number of tasks created (`atomic`), and a time and speedup table for 1, 2, 4, 8, and 16 threads.

**3. Advanced level.** Create a CMake project with an `nqueens` program that accepts the options `--n 8-16`, `--cutoff 0,1,2,3,4`, `--threads 1,2,4,8,16,32`, `--csv <file>`, and `--help`. For each $n$ in the range, the program solves the problem sequentially and with OpenMP tasks with different cut-off depths (`taskgroup`, bit masks of occupied columns and diagonals), checks the number of solutions against known values, and prints a table of time, speedup, efficiency, and number of tasks, and the best depth for each thread count. A mismatch in the number of solutions uses exit code 2, and option errors code 1.

### Variant 4. An integral by the Monte Carlo method {#v4}

**1. Initial level.** Create a C++ console program with OpenMP that estimates the integral of the function $e^{- x^{2}}$ on the segment $[ 0 , 2 ]$ by the Monte Carlo method from $10^{8}$ random points: each thread has its own `std::mt19937_64` generator with the seed `42 + thread number`, and the sum is accumulated with the `reduction(+:sum)` clause. The program prints the estimate, the deviation from the exact value $\sqrt{\pi} / 2 \cdot \text{erf} (2)$, and the time.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the number of trials $N$ (from $10^{5}$ to $10^{9}$) and a function number from a menu ($\sin (x)$ on $[ 0 , \pi ]$, $x^{2}$ on $[ 0 , 3 ]$, $e^{- x^{2}}$ on $[ 0 , 2 ]$), validates the input, and estimates the integral for 1, 2, 4, 8, and 16 threads. The generators are created for blocks of $10^{6}$ trials (the seed is the block number), so the estimate does not depend on the number of threads. The program prints a “threads – estimate – error – standard error – time – $S$ – $E$” table.

**3. Advanced level.** Create a CMake project with an `mcint` program that estimates an integral by the Monte Carlo method in parallel (OpenMP, independent generators for blocks of trials) with the options `--function sin|poly|gauss`, `--samples 1e6,1e7,1e8`, `--threads 1,2,4,8,16`, `--seed <n>`, `--csv <file>`, and `--help`. The program prints a table of estimates, absolute and standard errors, time, speedup, and efficiency, checks reproducibility (the same `--seed` with a different number of threads gives the same estimate; otherwise, exit code 2), and writes a CSV. Argument errors go to `stderr` with exit code 1.

### Variant 5. The Game of Life {#v5}

**1. Initial level.** Create a C++ console program with OpenMP that simulates Conway’s Game of Life on a 2000×2000-cell board with wraparound edges (a random initial state, 30% alive, fixed seed) for 500 generations, parallelizing the computation of each new generation with the `parallel for` directive, and prints the number of live cells (`reduction`) and the time.

**2. Basic level.** Create a C++ console program with OpenMP that reads the board dimensions (10 to 10,000), the number of generations, and the share of live cells, validates the input, runs the simulation sequentially and in parallel (both board arrays are initialized in parallel according to the first-touch policy), checks that the final boards match, and prints a table of time, speedup, and efficiency for 1, 2, 4, 8, and 16 threads, as well as the number of live cells every 100 generations.

**3. Advanced level.** Create a CMake project with a `life` program that simulates Conway’s Game of Life in parallel (OpenMP). The initial state is read from a text file (`.` and `#`) or generated (`--random <w>x<h>`); options: `--generations <n>`, `--threads`, `--init parallel|serial`, `--out <file>`, `--csv <file>`, `--check`, and `--help`. The program prints a table of the time per generation for each thread count and initialization method, saves the final state, and with `--check` compares the result with the sequential one. Measurements with `OMP_PROC_BIND=close` and `spread` are added to the report. File errors use exit code 2, argument errors code 1.

### Variant 6. k-means customer clustering {#v6}

**1. Initial level.** Create a C++ console program with OpenMP that generates 1,000,000 customers with two features (annual spending and number of purchases, 5 normal clusters, fixed seed), performs 20 iterations of the k-means algorithm for $k = 5$, parallelizing the search for the nearest centroid with the `parallel for` directive, and prints the centroid coordinates and the time.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the number of customers (from 1000 to $10^{7}$), the number of clusters $k$ (2 to 20), and the maximum number of iterations, validates the input, and runs k-means until the centroids stabilize. The coordinate sums and point counts of the clusters are accumulated with a user-defined reduction (`declare reduction` for a structure of sum arrays). The program prints the centroids, the cluster sizes, the number of iterations, and the average iteration time, and checks that the result matches the sequential version.

**3. Advanced level.** Create a CMake project with a `kmeans` program that reads customers from a CSV file (`id;spending;purchases`), accepts the options `--k <n>`, `--max-iter <n>`, `--threads 1,2,4,8,16`, `--seed <n>`, `--out <file>`, and `--help`, normalizes the features, runs k-means with a user-defined reduction, writes each customer’s cluster number to the output CSV, and prints a “threads – iterations – time per iteration – $S$ – $E$” table and the total within-cluster variance. Format errors (with the line number) go to `stderr` with exit code 2, and argument errors with code 1.

### Variant 7. Floyd–Warshall shortest paths {#v7}

**1. Initial level.** Create a C++ console program with OpenMP that generates a road network of 1500 cities (random distances from 1 to 100 km for 5% of the pairs, fixed seed), computes the matrix of shortest distances with the Floyd–Warshall algorithm with a parallel loop over rows inside the outer loop over $k$, and prints the sum of all finite distances and the time.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the number of cities (10 to 4000) and the road density in percent, validates the input, runs the Floyd–Warshall algorithm sequentially and in parallel for 1, 2, 4, 8, and 16 threads, checks that the matrices match, and prints a table of time, speedup, and efficiency, as well as the longest shortest path (the network diameter) and the corresponding pair of cities.

**3. Advanced level.** Create a CMake project with a `roads` program that reads a list of roads from a file (`city1;city2;km`), accepts the options `--threads`, `--schedule static|dynamic`, `--route <A>,<B>`, `--sizes 500,1000,2000` (for synthetic networks), and `--help`, computes the distance and predecessor matrices, reconstructs the route between the given cities, and prints a strong scaling table for each size with the share of time in `parallel` regions. An unknown city uses exit code 2, and file or argument errors code 1.

### Variant 8. Quicksort with tasks {#v8}

**1. Initial level.** Create a C++ console program with OpenMP that fills a vector of 20,000,000 integers with a fixed-seed generator, sorts copies with a sequential quicksort and with a parallel quicksort on OpenMP tasks (`taskgroup`, a threshold of 10,000 elements), checks that they are sorted (`std::is_sorted`), and prints the time of both sorts.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the array size (from $10^{5}$ to $10^{8}$) and a comma-separated list of thresholds, validates the input, and for each threshold measures the median of three runs of a parallel quicksort with tasks. The program prints a “threshold – time – speedup relative to sequential – speedup relative to `std::sort`” table, marks the best threshold, and checks each result.

**3. Advanced level.** Create a CMake project with a `qsortomp` program that accepts the options `--size`, `--threads`, `--cutoff`, `--data random|sorted|reversed|few-unique`, `--pivot middle|median3`, and `--help`. The program compares a sequential quicksort, OpenMP tasks, and `std::sort` with `std::execution::par` (if available), prints a time and speedup table for each kind of data and thread count, and checks the results. For `sorted` and `few-unique` data, the program shows the effect of the pivot choice. Option errors go to `stderr` with exit code 1.

### Variant 9. LU decomposition of a matrix {#v9}

**1. Initial level.** Create a C++ console program with OpenMP that generates a 1000×1000 diagonally dominant matrix (fixed seed), performs an LU decomposition without pivoting, parallelizing the submatrix update at each step with the `parallel for` directive, and prints the time and the maximum deviation of the product $L U$ from the original matrix.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the matrix size (10 to 3000), validates the input, performs the LU decomposition sequentially and in parallel with `schedule(static)` and `schedule(dynamic)` for 1, 2, 4, 8, and 16 threads, solves the system $A x = b$ for a known $x$, and prints a table of time, speedup, and the solution error norm for each variant.

**3. Advanced level.** Create a CMake project with an `lu` program that reads a matrix from a file or generates it (`--random <n>`), accepts the options `--pivot none|partial`, `--block <b>` (a blocked decomposition), `--threads`, `--csv <file>`, and `--help`, performs an LU decomposition with partial pivoting, and computes the determinant and the solution for a right-hand side from a file. The program prints a table of time, speedup, efficiency, and the residual $\left\Vert A x - b \right\Vert$ for each block size and thread count. A singular matrix uses exit code 2, and argument errors code 1.

### Variant 10. The conjugate gradient method {#v10}

**1. Initial level.** Create a C++ console program with OpenMP that solves a system with a tridiagonal matrix of size 1,000,000 (4 on the diagonal, −1 next to it) by the conjugate gradient method, parallelizing the dot product (`reduction(+:…)`), the `axpy` operation, and the matrix–vector multiplication, and prints the number of iterations, the residual norm, and the time.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the system size (from $10^{3}$ to $10^{8}$) and the tolerance $\epsilon$, validates the input, solves the system for the five-point matrix of the two-dimensional Poisson problem by the conjugate gradient method sequentially and in parallel, and prints a table: threads, number of iterations, residual norm, total time, the shares of time spent on dot products, `axpy`, and matrix–vector multiplication, and the speedup.

**3. Advanced level.** Create a CMake project with a `cg` program that reads a sparse symmetric matrix in Matrix Market format (`.mtx`, CSR storage), accepts the options `--tol`, `--max-iter`, `--threads`, `--schedule static|dynamic`, `--precond none|jacobi`, and `--help`, solves the system with a right-hand side of ones, and prints the history of the residual norm every 10 iterations and a scalability table. A nonsymmetric matrix or lack of convergence uses exit code 2 with a message in `stderr`, and argument errors code 1.

### Variant 11. Gaussian blur for photos {#v11}

**1. Initial level.** Create a C++ console program with OpenMP that reads an image in PGM (P5) format whose path the user enters, applies a Gaussian blur with a 5×5 kernel with the `parallel for collapse(2)` directive, writes the result to the file `blur.pgm`, and prints the image dimensions and the processing time.

**2. Basic level.** Create a C++ console program with OpenMP that reads a PPM (P6) image and a blur radius $r$ (1 to 20), builds a one-dimensional Gaussian kernel, and performs the blur in two passes in four ways: sequentially, `omp simd` for the inner loop, `parallel for`, and `parallel for simd`. The program checks that the results match byte for byte and prints a table of the time and speedup of each way.

**3. Advanced level.** Create a CMake project with a `gblur` program that accepts the arguments `input.ppm output.ppm` and the options `--radius <r>`, `--mode seq|simd|parallel|parallel-simd|all`, `--threads`, `--repeat <n>`, and `--help`. The convolution kernel is declared as a `declare simd` function. The program prints a “mode – threads – time, ms – $S$ – megapixels per second” table, saves the result, and checks that all modes produce the same image (otherwise, exit code 3). PPM format errors use exit code 2, argument errors code 1.

### Variant 12. A histogram of population heights {#v12}

**1. Initial level.** Create a C++ console program with OpenMP that generates the heights of 50,000,000 people (a normal distribution: mean 170 cm, standard deviation 10 cm, a generator per thread) and builds a histogram over 5 cm intervals from 120 to 220 cm with `reduction(+:hist[0:20])`, printing the histogram as a table with rows of `#` characters.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the number of people (from $10^{5}$ to $10^{9}$) and the interval width, validates the input, and builds the histogram in four ways: a shared array with `critical`, a shared array with `atomic`, per-thread local histograms merged at the end, and an array `reduction`. The program checks that the histograms are identical and prints a table of the time and speedup of each way for 16 threads.

**3. Advanced level.** Create a CMake project with a `heights` program that reads heights from a text or binary file or generates the data (`--generate <n>`), accepts the options `--bin <cm>`, `--method critical|atomic|local|reduction|all`, `--threads`, `--csv <file>`, and `--help`, builds the histogram, computes the mean, the median (from the histogram), and the standard deviation, and prints a text plot and a performance table of the methods. Values outside the range 50–250 cm are counted separately and reported in `stderr`; argument errors use exit code 1.

### Variant 13. Prime numbers {#v13}

**1. Initial level.** Create a C++ console program with OpenMP that counts the primes up to 20,000,000 by trial division up to $\sqrt{n}$, parallelizing the loop with the `parallel for reduction(+:count) schedule(dynamic)` directive, and prints the number of primes and the time.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the upper limit $N$ (from 1000 to $10^{9}$), validates the input, and counts the primes by trial division for `schedule(static)`, `schedule(static, 1000)`, `schedule(dynamic, 1000)`, and `schedule(guided)`. The program prints a “schedule – time – speedup” table, explains in a comment why the iterations are uneven, and checks the number of primes with the sieve of Eratosthenes.

**3. Advanced level.** Create a CMake project with a `primes` program that accepts the options `--limit <N>`, `--method trial|sieve|segmented`, `--segment <size>`, `--threads`, `--schedule static|dynamic|guided`, `--chunk <n>`, `--out <file>`, and `--help`. The segmented sieve processes the segments in parallel. The program prints the number of primes, the largest gap between neighboring primes, and a time and speedup table for each method, and writes the primes to a file (if needed). Argument errors go to `stderr` with exit code 1.

### Variant 14. The n-body problem {#v14}

**1. Initial level.** Create a C++ console program with OpenMP that simulates the motion of 5000 bodies (random masses and positions, fixed seed) for 50 steps with the Euler method, computing the gravitational forces between all pairs with a `parallel for` loop, and prints the total energy of the system at the first and last steps and the time.

**2. Basic level.** Create a C++ console program with OpenMP that simulates the motion of bodies under gravity (the $n$-body problem, random masses and positions) with the velocity Verlet method with parallel computation of the accelerations. The program prompts for the number of bodies (100 to 50,000) and steps, validates the input, and prints a table of time, speedup, and efficiency for 1, 2, 4, 8, and 16 threads, the relative change in energy, and a check that the positions match the sequential version.

**3. Advanced level.** Create a CMake project with an `nbody` program that simulates the motion of bodies under gravity (forces between all pairs, OpenMP). The initial data is read from a CSV (`mass;x;y;z;vx;vy;vz`) or generated; options: `--steps`, `--dt`, `--threads`, `--layout aos|soa`, `--out <file>`, and `--help`. The program prints a table of the time per step for the AoS and SoA layouts with the `parallel for simd` directive and writes the trajectories; a script compares `OMP_PROC_BIND=close` and `spread` with `OMP_PLACES=cores`. Data errors use exit code 2, argument errors code 1.

### Variant 15. Traversing a directory tree {#v15}

**1. Initial level.** Create a C++ console program with OpenMP that builds a synthetic directory tree in memory (depth 8, 2 to 6 subdirectories and 0 to 20 files of up to 10 MB in each, fixed seed) and computes the total number of files and their total size by a recursive traversal with `task` and `taskwait`, printing the result and the time.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the tree depth (2 to 12) and the maximum number of subdirectories, validates the input, builds a synthetic tree, and computes the number of files, the total size, and the largest file sequentially and with tasks with a depth threshold. The program prints the tree size (nodes), the results, whether the sequential and parallel traversals match, and a time table for thresholds 0–5.

**3. Advanced level.** Create a CMake project with a `dutree` program that traverses a real directory (`std::filesystem`) or a synthetic tree (`--synthetic <depth>`), accepts the options `--threads`, `--cutoff <depth>`, `--top <n>`, `--ext` (group by extension), and `--help`, builds the tree with OpenMP tasks, and prints a table of the n largest directories, statistics by extension (a user-defined reduction of dictionaries), and the traversal time. Inaccessible directories are skipped with a warning in `stderr`; a nonexistent path uses exit code 2.

### Variant 16. The Poisson equation by the Jacobi method {#v16}

**1. Initial level.** Create a C++ console program with OpenMP that solves the Poisson equation $\Delta u = - 1$ in a square with zero boundary conditions on a 500×500 grid by the Jacobi method (a parallel `collapse(2)` update, the norm of the difference between iterations through `reduction(max:…)`) until a tolerance of $10^{- 6}$ is reached, and prints the number of iterations, the value at the center, and the time.

**2. Basic level.** Create a C++ console program with OpenMP that solves the Poisson equation $\Delta u = - 1$ in a square with zero boundary conditions by the Jacobi method. The program prompts for the grid size (50 to 2000), the tolerance, and the maximum number of iterations, validates the input, prints a strong scaling table (a fixed grid, 1–16 threads): time, speedup, efficiency, and the Karp–Flatt metric, and checks that the solution matches the sequential one.

**3. Advanced level.** Create a CMake project with a `poisson` program that solves the Poisson equation $\Delta u = - 1$ in a square with zero boundary conditions in parallel (OpenMP) with the options `--mode strong|weak`, `--base <n>`, `--threads 1,2,4,8,16`, `--iters <k>`, `--method jacobi|redblack`, and `--help`. In `weak` mode, the number of grid nodes grows in proportion to the number of threads. The program prints a strong or weak scaling table (for weak scaling, $T_{1} / T_{p}$), writes a CSV, and checks the convergence of the red–black Gauss–Seidel method. Argument errors use exit code 1.

### Variant 17. An ensemble of pendulums {#v17}

**1. Initial level.** Create a C++ console program with OpenMP that integrates the equations of motion of 100,000 independent simple pendulums (initial angles from 1° to 179°) by the fourth-order Runge–Kutta method for 10 s with a step of 0.001 s with the `parallel for` directive, and prints the average amplitude at the end and the time.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the number of pendulums, the simulation time, and the step, validates the input, and integrates pendulums with friction. Pendulums with large angles are computed with an adaptive step and take longer, so the program compares `schedule(static)`, `schedule(dynamic, 64)`, and `schedule(guided)` and prints a table of time, speedup, and the largest energy error.

**3. Advanced level.** Create a CMake project with a `pendulums` program that reads pendulum parameters from a CSV (`length;angle;velocity;friction`) or generates them, accepts the options `--t-end`, `--tol`, `--method rk4|rk45`, `--threads`, `--schedule`, `--out <file>`, and `--help`, and writes the final states and oscillation periods, as well as a time table for each schedule kind with the number of steps of the lightest and heaviest pendulum. Data errors use exit code 2, argument errors code 1.

### Variant 18. DNA sequence alignment {#v18}

**1. Initial level.** Create a C++ console program with OpenMP that generates two random DNA sequences of length 20,000 (the alphabet A, C, G, T, fixed seed) and computes the global alignment score with the Needleman–Wunsch algorithm (match +1, mismatch −1, gap −2), filling the table by antidiagonals with a parallel loop, and prints the score and the time.

**2. Basic level.** Create a C++ console program with OpenMP that reads two DNA sequences from FASTA files, checks the alphabet, prompts for the match, mismatch, and gap weights, and computes the alignment score sequentially (by rows) and in parallel (by antidiagonals) for 1, 2, 4, 8, and 16 threads. The program checks that the scores match and prints a time and speedup table.

**3. Advanced level.** Create a CMake project with an `nwalign` program that accepts the arguments `a.fasta b.fasta` and the options `--match`, `--mismatch`, `--gap`, `--threads`, `--block <size>` (blocked table filling with `depend` tasks), `--show-alignment`, and `--help`, reconstructs the alignment for sequences of up to 20,000 characters, prints it in fragments of 60 characters, and prints a time table for the antidiagonal and blocked variants. Invalid characters use exit code 2, arguments code 1.

### Variant 19. The Barnsley fractal {#v19}

**1. Initial level.** Create a C++ console program with OpenMP that builds the Barnsley fern with an iterated function system: each thread generates 5,000,000 points with its own generator and marks them in a shared 1000×1000 image (writing the byte “1” without synchronization is acceptable), writes the file `fern.pgm`, and prints the number of colored pixels and the time.

**2. Basic level.** Create a C++ console program with OpenMP that builds the Barnsley fern with an iterated function system (each thread generates points with its own generator). The program prompts for the number of points (from $10^{6}$ to $10^{9}$) and the image size, validates the input, and counts the hits in the pixels in two ways: `atomic` for a shared array, and per-thread local arrays merged at the end. The program saves the image with logarithmic brightness and prints a time and speedup table for 1, 2, 4, 8, and 16 threads.

**3. Advanced level.** Create a CMake project with an `ifs` program that reads the coefficients of affine transformations and the probabilities from a text file (fern, Sierpinski triangle, dragon), accepts the options `--points`, `--size`, `--threads`, `--seed`, `--out <file.pgm>`, and `--help`, checks that the probabilities sum to 1, builds the image without races, and prints a performance table. The result does not depend on the number of threads for the same `--seed` (a generator per block of points). File errors use exit code 2, arguments code 1.

### Variant 20. Merge sort {#v20}

**1. Initial level.** Create a C++ console program with OpenMP that sorts a vector of 20,000,000 floating-point numbers with a recursive merge sort in which the two halves are sorted by OpenMP tasks down to a size of 50,000 elements, checks the result by comparing it with `std::sort`, and prints the time of both sorts.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the array size and the number of threads, validates the input, generates an array of random numbers, and sorts it with merge sort in two parallel ways: recursively with `task` tasks, and bottom-up, where each level of merging is performed by a `taskloop` loop. The program checks that the array is sorted and prints a table of time, speedup, and efficiency for 1, 2, 4, 8, and 16 threads.

**3. Advanced level.** Create a CMake project with an `msort` program that sorts the lines of a text file (the arguments `input.txt output.txt`) and accepts the options `--threads`, `--cutoff`, `--method tasks|taskloop|std`, `--parallel-merge`, and `--help`. The `--parallel-merge` option enables merging by splitting at the median with a binary search. The program writes the sorted file and prints a time and speedup table and a CSV for a plot. File errors use exit code 2, arguments code 1.

### Variant 21. Ray tracing spheres {#v21}

**1. Initial level.** Create a C++ console program with OpenMP that renders a scene of 50 random spheres and one light source (diffuse lighting and shadows) into a 1280×720 image, parallelizing the loop over pixel rows with `parallel for schedule(dynamic)`, writes `scene.ppm`, and prints the rendering time.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the image size, the number of spheres, and the reflection depth (0 to 5), validates the input, renders a scene with mirror reflections, and compares `schedule(static)`, `schedule(dynamic, 1)`, and `schedule(dynamic, 16)` over rows and `collapse(2)` over pixels. The program prints a table of time, speedup, and the average number of rays per row, and checks that the images are identical.

**3. Advanced level.** Create a CMake project with a `raytrace` program that reads a scene description from a text file (a camera, spheres with materials, light sources), accepts the options `--size`, `--samples <n>` (antialiasing), `--depth`, `--threads`, `--schedule`, `--out <file.ppm>`, and `--help`, renders the scene, and prints a table of time, speedup, and rays per second. The random number generator for antialiasing is seeded per pixel, so the image does not depend on the number of threads. Scene errors (with the line number) use exit code 2.

### Variant 22. Transaction statistics {#v22}

**1. Initial level.** Create a C++ console program with OpenMP that generates 20,000,000 bank transactions (an amount from 1 to 100,000 UAH, one of 8 categories, fixed seed) and, in `parallel sections`, simultaneously computes the total amount, the largest transaction, and the number of transactions over 50,000 UAH, printing the results and the time.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the number of transactions, validates the input, and computes five metrics (the sum, the mean, the minimum, the maximum, and the number of suspicious transactions above a threshold) in three ways: sequentially, with sections (each metric in a separate section), and with a single `parallel for` loop with several reductions. The program prints the metrics, whether the results match, and a time table, explaining why a single loop is faster than sections.

**3. Advanced level.** Create a CMake project with a `txstats` program that reads transactions from a CSV (`date;account;category;amount`), accepts the options `--threads`, `--threshold <UAH>`, `--by category|day`, `--top <n>`, and `--help`, computes statistics by group with a user-defined reduction, finds the accounts with the most suspicious transactions, and prints summary tables and the time of the stages (reading, parsing, aggregation). Invalid lines are counted and reported in `stderr`; argument errors use exit code 1.

### Variant 23. An echo filter for an audio file {#v23}

**1. Initial level.** Create a C++ console program with OpenMP that generates 60 s of a stereo signal (48 kHz sampling rate, sine waves), applies an echo filter (a delay of 250 ms, an attenuation of 0.5) with a `parallel for simd` loop, writes the result to a WAV file, and prints the peak amplitude and the processing time.

**2. Basic level.** Create a C++ console program with OpenMP that reads a 16-bit WAV file, prompts for the delay (10 to 2000 ms) and the attenuation factor (0 to 1), validates the input, and applies an echo filter in four ways (sequentially, `simd`, `parallel for`, `parallel for simd`) with `float` numbers. The program normalizes the volume, saves the result, and prints a table of time, speedup, and the maximum discrepancy between the ways.

**3. Advanced level.** Create a CMake project with an `echo` program that accepts the arguments `input.wav output.wav` and the options `--delays 120,250,400`, `--gains 0.6,0.4,0.2` (multiple echoes), `--mode`, `--threads`, `--repeat <n>`, and `--help`, processes mono and stereo files, prints a “mode – threads – time – $S$ – minutes of audio per second” table, and writes a CSV for comparison with a C# implementation with SIMD. An unsupported WAV format uses exit code 2, arguments code 1.

### Variant 24. Breadth-first search in a social graph {#v24}

**1. Initial level.** Create a C++ console program with OpenMP that generates a social graph of 1,000,000 users with 20 friends on average (adjacency lists, fixed seed) and finds the distances from user 0 to all others by a level-synchronous breadth-first search: the vertices of the current level are processed by a `parallel for` loop, and the visited mark is set atomically. The program prints the number of vertices at each level and the time.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the number of users, the average number of friends, and the starting user, validates the input, runs a level-synchronous BFS sequentially and in parallel (`std::atomic<int>` and `compare_exchange_strong` for the distances, per-thread local next-level lists), and prints a table of distances (how many users are at distance 1, 2, …), whether the results match, and the time for 1–16 threads.

**3. Advanced level.** Create a CMake project with a `socialbfs` program that reads a graph from an edge list (an `id1 id2` file), accepts the options `--source <id>`, `--threads`, `--direction top-down|hybrid` (a hybrid BFS that switches to “bottom-up” on large levels), `--schedule`, and `--help`, and prints the distribution of distances, the diameter from the source, and a time and speedup table for each variant. A nonexistent vertex uses exit code 2, and file errors code 1.

### Variant 25. A point distance matrix {#v25}

**1. Initial level.** Create a C++ console program with OpenMP that generates 20,000 points on a plane (fixed seed), computes the average distance between all pairs of points with a `parallel for collapse(2) reduction(+:sum)` loop, and prints the result and the time.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the number of points and the dimension of the space (2 to 16), validates the input, and finds the nearest neighbor of each point in two ways: per-thread counters in a shared array `counts[thread number]`, and per-thread local variables. The program prints the time of both ways for 1–16 threads, explains the effect of false sharing, and checks that the results are identical.

**3. Advanced level.** Create a CMake project with a `distmatrix` program that reads points from a CSV, accepts the options `--metric euclid|manhattan|cosine`, `--threads`, `--layout aos|soa`, `--block <b>` (a cache-blocked traversal), `--out <file>`, and `--help`, computes the upper triangle of the distance matrix (`schedule(dynamic)`, because the rows have different lengths), saves it to a binary file, and prints a time table for each metric and data layout. File errors use exit code 2, arguments code 1.

### Variant 26. Option pricing with a binomial tree {#v26}

**1. Initial level.** Create a C++ console program with OpenMP that computes the price of a European call option (stock price 100, strike 100, rate 5%, volatility 20%, maturity 1 year) with the Cox–Ross–Rubinstein binomial model with 20,000 steps, parallelizing the collapse of each tree level with the `parallel for` directive, and prints the price, the Black–Scholes price, and the time.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the option parameters, the type (call/put, European/American), and the number of steps, validates the input, computes the price with the binomial model sequentially and in parallel (a parallel loop only for levels wider than 1000 nodes, the `if` clause), and prints the price, whether it matches the sequential version, the difference from Black–Scholes (for European options), and a time table for 1–16 threads.

**3. Advanced level.** Create a CMake project with an `options` program that reads a portfolio of options from a CSV (`type;style;S;K;r;sigma;T`), accepts the options `--steps`, `--threads`, `--level outer|inner|nested` (parallel over options, over tree nodes, or nested with `omp_set_max_active_levels(2)`), and `--help`, computes the prices and the Greek “delta,” writes the result to a CSV, and prints a time table for each level of parallelism. Invalid option parameters (with the line number) use exit code 2.

### Variant 27. An SIR epidemic on a grid {#v27}

**1. Initial level.** Create a C++ console program with OpenMP that simulates the spread of a disease on a grid of 1000×1000 people (states S, I, R; an infected person infects each of the 4 neighbors with a probability of 0.2 and recovers after 10 days; a generator per row and day) for 200 days, parallelizing the grid update with the `parallel for` directive, and prints the number of S, I, R every 20 days and the time.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the grid size, the number of days, the infection probability, and the disease duration, validates the input, simulates the epidemic with a 5-point stencil with parallel grid initialization (first touch), finds the peak number of infected people and the day of the peak, and prints a table of time, speedup, and efficiency for 1–16 threads. The result does not depend on the number of threads.

**3. Advanced level.** Create a CMake project with an `sir` program that accepts the options `--size`, `--days`, `--beta`, `--recovery`, `--vaccinated <share>`, `--threads`, `--init parallel|serial`, `--csv <file>`, `--frames <directory>` (PGM images every n days), and `--help`, writes the S/I/R curve to a CSV, saves the frames, and prints a performance table for both initialization methods. A script for running on a NUMA node with `numactl --cpunodebind --membind` and `OMP_PROC_BIND` is added to the project. Argument errors use exit code 1.

### Variant 28. The traveling salesman problem {#v28}

**1. Initial level.** Create a C++ console program with OpenMP that generates 13 cities with random coordinates (fixed seed) and finds the shortest closed route by exhaustive search, creating a task for each second city of the route; the best length is updated in a `critical` section. The program prints the route, its length, and the time.

**2. Basic level.** Create a C++ console program with OpenMP that prompts for the number of cities (5 to 16), validates the input, and solves the traveling salesman problem by branch and bound: OpenMP tasks are created down to depth 3, and the current best length is read without locking and updated in a `critical` section with a recheck. The program prints the route, the number of pruned branches, and a time table for 1, 2, 4, 8, and 16 threads.

**3. Advanced level.** Create a CMake project with a `tsp` program that reads city coordinates from a file (`name;x;y`), accepts the options `--cutoff <depth>`, `--threads`, `--bound simple|mst`, `--initial nearest` (an initial bound from a greedy algorithm), `--time-limit <s>`, and `--help`, finds the optimal route, and prints it with city names, the number of tasks and prunings, and a speedup table. When the time limit is exceeded, the best route found is printed with a “not proven” mark and exit code 3; file errors use code 2.

### Variant 29. A wave on a membrane {#v29}

**1. Initial level.** Create a C++ console program with OpenMP that simulates the vibration of an 800×800 square membrane with fixed edges (an explicit scheme for the wave equation, an initial disturbance at the center) for 2000 steps with a `parallel for collapse(2)` loop, and prints the energy of the membrane every 500 steps and the time.

**2. Basic level.** Create a C++ console program with OpenMP that simulates the vibration of a square membrane with fixed edges (an explicit scheme for the wave equation with three time layers, an initial disturbance at the center). The program prompts for the grid size, the number of steps, and the Courant number (less than $1 / \sqrt{2}$), validates the input, prints a table of time, speedup, and efficiency for 1–16 threads and the current `OMP_PLACES` and `OMP_PROC_BIND`, and checks energy conservation (a deviation of less than 1%).

**3. Advanced level.** Create a CMake project with a `wave2d` program that simulates in parallel (OpenMP) the vibration of a square membrane with fixed edges with an explicit scheme for the wave equation, with the options `--size`, `--steps`, `--courant`, `--source center|random:<n>` (initial disturbances), `--threads`, `--frames <directory>`, `--csv <file>`, and `--help`, and saves PGM frames and a performance table. The project script runs the program for `OMP_PLACES=threads|cores` and `OMP_PROC_BIND=close|spread` and builds a “places – binding – threads – time – $S$” table. A Courant number beyond the stability limit uses exit code 2, argument errors code 1.

### Variant 30. A built-in OpenMP benchmark {#v30}

**1. Initial level.** Create a C++ console program with OpenMP that runs three test kernels (an array sum with `reduction`, 800×800 matrix multiplication, and an uneven prime-counting loop) and for each prints the current number of threads (`omp_get_max_threads`), the schedule kind (`omp_get_schedule`), and the execution time.

**2. Basic level.** Create a C++ console program with OpenMP that runs three test kernels (an array sum with `reduction`, 800×800 matrix multiplication, an uneven prime-counting loop) with `schedule(runtime)` for all combinations of thread counts 1, 2, 4, 8, 16 and the schedule kinds `static`, `dynamic,64`, `guided`, changing them with the `omp_set_num_threads` and `omp_set_schedule` functions. For each kernel, the program prints a time and speedup table marking the best schedule and checks the checksums.

**3. Advanced level.** Create a CMake project with an `ompbench` program that reads its settings only from environment variables (`OMP_NUM_THREADS`, `OMP_SCHEDULE`, `OMP_PROC_BIND`, `OMP_PLACES`), accepts the options `--kernels sum,matmul,primes,stencil`, `--size <n>`, `--csv <file>` (appending), and `--help`, and a script (bash and PowerShell) that runs the program for all combinations of the environment variables and builds a summary table from the CSV: kernel, threads, schedule, binding, median time, speedup. An unknown kernel uses exit code 1, and a checksum mismatch code 2.

## Procedure

1. Study the theory and worked examples.
2. Create a CMake project with `find_package(OpenMP REQUIRED)` (GCC, CMake, and Ninja in Ubuntu 26.04, or CLion) and check the `_OPENMP` macro.
3. Implement a sequential version of the task, parallelize it with OpenMP directives (variable scopes with `default(none)`), and check that the result matches the sequential version.
4. Measure the time for 1, 2, 4, 8, and 16 threads (`OMP_NUM_THREADS`) with different `schedule` kinds and bindings (`OMP_PLACES`, `OMP_PROC_BIND`), build a table and a plot of the speedup and efficiency, and explain the values obtained.
5. Demonstrate the program, explain the code and the measurement results, and answer the review questions.
