---
title: "Tasks"
description: "Topic 8. Parallel algorithms: task variants"
outline: [2, 3]
sourceHash: "89fd96fa8b520437fe36c31739ae9430d54557ee64f4a29977077a8a139a971f"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Area under a curve {#v1}

**1. Initial level.** Create a console program that computes $\int_{0}^{1} 4 / (1 + x^{2}) d x = \pi$ with the composite trapezoidal rule on 10,000,000 segments sequentially and with `Parallel.For` with local sums, and prints both values, the errors relative to `Math.PI`, and the time of both approaches.

**2. Basic level.** Create a console program that prompts for the integration limits $a \lt b$, the rule (rectangles, trapezoids, or Simpson), and the tolerance $\epsilon$, validates the input, and computes $\int_{a}^{b} e^{- x^{2}} d x$ in parallel, doubling the number of segments until the error estimate by Runge’s rule becomes smaller than $\epsilon$. The program prints an “$n$ – value – Runge estimate – time” table and the refined value.

**3. Advanced level.** Create an `integrate` console application that accepts the options `--function sin|exp|poly`, `--from`, `--to`, `--eps`, `--rule mid|trap|simpson`, `--threads 1,2,4,8,16`, and `--help`. For each thread count, the program computes the integral with error control by Runge’s rule, prints a “threads – time – $S$ – $E$” table, and writes it to a CSV file; for functions with a known antiderivative, it prints the true error. Argument errors go to the error stream with exit code 1, and an unreachable tolerance (more than $2^{30}$ segments) with code 2.

### Variant 2. Adaptive integration {#v2}

**1. Initial level.** Create a console program that computes $\int_{0}^{1} \sqrt{x} d x = 2 / 3$ with the recursive adaptive Simpson method to a tolerance of $10^{- 10}$ sequentially and with `Parallel.Invoke` for the two halves of a segment down to depth 8, and prints both values, the errors, the number of function evaluations, and the time.

**2. Basic level.** Create a console program that prompts for the tolerance (from $10^{- 4}$ to $10^{- 12}$) and the depth threshold for tasks (0 to 20), validates the input, and computes $\int_{0}^{10} \sin (x^{2}) d x$ with the adaptive Simpson method sequentially and with recursive tasks. The program prints the value, the number of tasks, the number of segments, the time, and the speedup, as well as a warning if there are fewer tasks than logical processors.

**3. Advanced level.** Create an `adaptive` console application that, for three functions with singularities ($1 / \sqrt{x}$ on $[ 10^{- 8} ; 1 ]$, $x \sin (1 / x)$ on $[ 0 {,} 001 ; 1 ]$, $2 x \cos x^{2}$ on $[ 0 ; 100 ]$), compares static partitioning into $p$ parts, partitioning into $64 p$ parts with `Parallel.For`, and recursive tasks with depth thresholds of 4, 8, 12, and 16. Options: `--eps`, `--threads`, `--csv <file>`, `--help`. The program prints a “function – method – time – $S$ – max/mean part time” table and writes it to CSV; invalid options produce a message in the error stream and exit code 1.

### Variant 3. Multiple integral {#v3}

**1. Initial level.** Create a console program that computes the double integral $\int_{0}^{1} \int_{0}^{1} (x^{2} + y^{2}) d x d y = 2 / 3$ with the midpoint rule on a $4000 \times 4000$ grid sequentially and with `Parallel.For` over grid rows, and prints the value, the error, and the time of both approaches.

**2. Basic level.** Create a console program that prompts for a rectangle $[ a ; b ] \times [ c ; d ]$ and the number of nodes along each axis, validates the input, and computes $\iint e^{- (x^{2} + y^{2})} d x d y$ with the two-dimensional Simpson rule using three distributions: row stripes, column stripes, and $4 \times 4$ blocks. The program prints a “distribution – value – time – $S$” table and an error estimate by Runge’s rule.

**3. Advanced level.** Create a `double-integral` console application that accepts a function from a list (`--function gauss|poly|trig`), a domain, the number of nodes, the option `--layout rows|cols|blocks`, `--threads 1,2,4,8,16`, and `--help`. The program doubles the grid until the tolerance `--eps` is reached by Runge’s rule, prints the time, speedup, and efficiency for each thread count, and writes the results to CSV. A domain outside the allowed limits or an odd number of nodes produces a message in the error stream and exit code 1.

### Variant 4. Volume of a solid by the Monte Carlo method {#v4}

**1. Initial level.** Create a console program that estimates the volume of a ball of radius 1 by the Monte Carlo method from 100,000,000 random points of the cube $[ - 1 ; 1 ]^{3}$: 64 `Parallel.For` blocks, each with its own `Random` with seed `2026 + k`. The program prints the estimate, the exact value $4 \pi / 3$, the error, and the time.

**2. Basic level.** Create a console program that prompts for the number of points (from $10^{4}$ to $10^{9}$) and the number of blocks, validates the input, and estimates the volume of the intersection of two balls of radius 1 centered at $(0 , 0 , 0)$ and $(1 , 0 , 0)$ by the Monte Carlo method with a generator per block. The program prints the estimate, the 95% confidence interval, the exact value $5 \pi / 12$, and checks that the result does not depend on the number of threads.

**3. Advanced level.** Create a `montecarlo` console application that estimates the volume of a solid defined by a system of inequalities from a list (`--body ball|torus|intersection`) in a space of dimension 2 to 10 (`--dim`), with the options `--points`, `--blocks`, `--seed`, `--threads`, and `--help`. The program prints the estimate with a confidence interval and a time and speedup table for different thread counts, and checks the reproducibility of two runs with the same seed. Invalid options go to the error stream with exit code 1.

### Variant 5. Roots of a polynomial {#v5}

**1. Initial level.** Create a console program that finds all roots of the Chebyshev polynomial $T_{200} (x) = \cos (200 \arccos x)$ on $[ - 1 ; 1 ]$: it isolates them on a grid of 100,000 segments (`Parallel.For`) and refines them by bisection in parallel. The program prints the number of roots, the first 5 roots, and the largest difference from the exact values $\cos (\pi (2 k - 1) / 400)$.

**2. Basic level.** Create a console program that prompts for the coefficients of a polynomial (up to degree 20) and a segment, validates the input, isolates the roots on a grid with a user-specified number of segments, and refines them by parallel bisection to $10^{- 12}$. The program prints a “root – polynomial value – iterations” table and warns if a segment with a sign change might contain several roots.

**3. Advanced level.** Create a `roots` console application that reads a polynomial from a file (space-separated coefficients) and accepts the options `--from`, `--to`, `--segments`, `--method bisect|psection|newton`, `--threads`, and `--help`. The `psection` method evaluates the polynomial simultaneously at $p$ points of the segment at each iteration. The program prints the roots, the number of polynomial evaluations, and the time and speedup of each method; it repeats the search with half the step and reports any new roots found. File errors use exit code 2, option errors code 1.

### Variant 6. Newton’s method basins {#v6}

**1. Initial level.** Create a console program that, for the equation $z^{3} - 1 = 0$, runs Newton’s method from each point of a $1000 \times 1000$ grid on the square $[ - 2 ; 2 ] \times [ - 2 ; 2 ]$ of the complex plane (`System.Numerics.Complex`, `Parallel.For` over rows) and prints how many points converged to each of the three roots and how many did not, and the time of the sequential and parallel versions.

**2. Basic level.** Create a console program that prompts for the degree $n$ of the equation $z^{n} - 1 = 0$ (3 to 8), the image size, and the maximum number of iterations, validates the input, and builds the basins of attraction of Newton’s method in parallel. The program writes the image in PGM format (shade – root number, brightness – number of iterations) and prints the time and speedup.

**3. Advanced level.** Create a `newton-basins` console application that accepts a polynomial (`--poly "1 0 0 -1"`), a domain, the image size, `--schedule static|cyclic|dynamic`, `--threads`, and `--help`. The program builds the basins of attraction, writes a PGM image, and prints a “distribution – time – $S$ – max/mean thread time” table, because points near the basin boundaries require more iterations. An invalid polynomial uses exit code 1, a file write error code 2.

### Variant 7. A system of nonlinear equations {#v7}

**1. Initial level.** Create a console program that solves the system $x^{2} + y^{2} = 4$, $e^{x} + y = 1$ by Newton’s method from 10,000 starting points on the square $[ - 3 ; 3 ]^{2}$ in parallel (`Parallel.For`) and prints the distinct solutions found (to within $10^{- 9}$) and the number of points that converged to each.

**2. Basic level.** Create a console program that prompts for the dimension $n$ (10 to 2000) of the system $F_{i} (x) = 3 x_{i} - x_{i}^{3} / 10 - x_{i - 1} - x_{i + 1} - 1 = 0$ ($x_{0} = x_{n + 1} = 0$), validates the input, and solves it by Newton’s method, computing the Jacobian matrix with finite-difference derivatives in parallel by columns. The program prints the number of iterations, the residual, and the time to compute the Jacobian sequentially and in parallel.

**3. Advanced level.** Create a `newton-system` console application that solves a system from a list (`--system chain|broyden|trig`) of dimension `--n` by Newton’s method with a parallel Jacobian (`--jacobian analytic|numeric`) and parallel solution of the linear system by Gaussian elimination. Options: `--tol`, `--threads`, `--help`. The program prints a table of iterations (residual norm, step, time) and the overall speedup, and a message in the error stream with exit code 2 if the method did not converge.

### Variant 8. Dot product and norms {#v8}

**1. Initial level.** Create a console program that computes the dot product of two vectors of 10,000,000 random `double` values with a block distribution on 1, 2, 4, and 8 threads (`Parallel.For` over thread numbers) and prints the results and the time for each thread count.

**2. Basic level.** Create a console program that prompts for the vector length, the number of threads, and the block size, validates the input, and computes the dot product, the Euclidean norm, and the maximum absolute value with the block, cyclic, and block-cyclic distributions. The program prints a “distribution – time – $S$ – result with 17 digits” table and explains the difference in the last digits.

**3. Advanced level.** Create a `vecdist` console application that computes the dot product of two random vectors of length `--n` with the block, cyclic, and block-cyclic distributions for `--threads 1,2,4,8,16` and block sizes `--blocks 1,64,1024,65536`, writes the table to CSV, and separately demonstrates reproducibility: 5 runs of a nondeterministic reduction (`lock` in `localFinally`) and 5 runs of a deterministic one. For vectors larger than the L3 cache, the program computes the achieved bandwidth in GB/s. Option `--help`; option errors use exit code 1.

### Variant 9. Matrix–vector multiplication {#v9}

**1. Initial level.** Create a console program that multiplies a $4000 \times 4000$ matrix by a vector sequentially and with horizontal stripes on 8 threads (`Parallel.For` over stripe numbers), checks that the results match, and prints the time and speedup.

**2. Basic level.** Create a console program that prompts for the matrix size and the number of threads, validates the input, and multiplies the matrix by a vector with horizontal stripes and with vertical stripes with a reduction of the partial vectors. The program prints a “scheme – time – $S$ – $E$” table and the largest difference between the results of the schemes.

**3. Advanced level.** Create a `matvec` console application that multiplies a random $n \times n$ matrix by a vector with three parallel schemes (row stripes, column stripes with a reduction, an $r \times c$ checkerboard scheme) for sizes `--sizes` and thread counts `--threads`. The program measures memory bandwidth with a separate test, builds the prediction $S_{p} = T_{1} / \max (T_{1} / p , 8 n^{2} / B)$, prints an “$n$ – scheme – $p$ – prediction – measured $S$” table, and writes it to CSV. Option `--help`; errors use exit code 1.

### Variant 10. Checkerboard matrix multiplication and Fox’s algorithm {#v10}

**1. Initial level.** Create a console program that multiplies two $1024 \times 1024$ matrices with a $2 \times 2$ checkerboard scheme (4 tasks, each computing its own block $C_{i j}$) and checks the result by comparing it with sequential multiplication in ikj order, printing the time of both approaches.

**2. Basic level.** Create a console program that prompts for the matrix size $n$ and the grid size $q$ ($n$ a multiple of $q$), validates the input, and multiplies the matrices with Fox’s algorithm on $q^{2}$ separate threads with a `Barrier`: broadcasting block $A_{i k}$ along a grid row (a shared row buffer), multiplication, and shifting the blocks of $B$ up. The program prints the time, the speedup, and the largest difference from sequential multiplication.

**3. Advanced level.** Create a `fox` console application that multiplies random matrices with Fox’s algorithm (threads of a $q \times q$ grid with a `Barrier`, broadcasting blocks of $A$ along a row, shifting blocks of $B$) and with the checkerboard scheme without copying, for sizes `--sizes` and grids `--grids 1,2,3,4`. The program counts the amount of copied data (the analog of communication) and the barrier time, prints an “$n$ – $q$ – time – $S$ – communication, MB – barrier share” table, and writes it to CSV. A size that is not a multiple of $q$ produces a message in the error stream and exit code 1.

### Variant 11. Cannon’s algorithm {#v11}

**1. Initial level.** Create a console program that, for a $3 \times 3$ grid of blocks, prints which blocks $A_{i k}$ and $B_{k j}$ end up in each cell after the alignment and at each of the three steps of Cannon’s algorithm, and checks that each cell $(i , j)$ received every $k = 0 , 1 , 2$ exactly once.

**2. Basic level.** Create a console program that prompts for the matrix size $n$ and the grid size $q$, checks that $n$ is a multiple of $q$, and multiplies the matrices with Cannon’s algorithm on $q^{2}$ separate threads: private copies of the blocks, shifts by copying the neighbors’ blocks, and a `Barrier`. The program prints the time, the speedup, and the largest difference from sequential multiplication.

**3. Advanced level.** Create a `cannon` console application that multiplies two random $n \times n$ matrices with Cannon’s algorithm on a $q \times q$ grid of separate threads (alignment, shifts by copying the neighbors’ blocks, `Barrier`) with the options `--n`, `--grid`, `--kernel scalar|simd`, `--repeat`, and `--help`. The program separately measures the time of the alignment, multiplications, copies, and barriers of each thread and prints a table of time by stage, the speedup predicted by the model, and the measured speedup. Invalid sizes use exit code 1; a discrepancy from sequential multiplication of more than $10^{- 9}$ produces a message in the error stream and exit code 3.

### Variant 12. Transposing a large matrix {#v12}

**1. Initial level.** Create a console program that transposes an $8192 \times 8192$ `double` matrix with a simple double loop and with `Parallel.For` over rows, checks the result, and prints the time of both approaches.

**2. Basic level.** Create a console program that prompts for the matrix size and a list of block sizes, validates the input, and transposes the matrix by blocks in parallel over rows of blocks. The program prints a “block – time – GB/s” table and marks the best block size.

**3. Advanced level.** Create a `transpose` console application that compares transposing into a new matrix and in place (for a square matrix), the simple and blocked variants, and static and dynamic distribution of blocks, for sizes `--sizes` and threads `--threads`. The program writes a table with the bandwidth to CSV, checks each result, and accepts `--help`. Odd or excessively large sizes (beyond the available memory) produce a message in the error stream and exit code 1.

### Variant 13. The conjugate gradient method {#v13}

**1. Initial level.** Create a console program that solves a tridiagonal system of 1,000,000 equations ($4 x_{i} - x_{i - 1} - x_{i + 1} = b_{i}$, with $b$ from a known solution) by the conjugate gradient method to a residual of $10^{- 10}$ with parallel dot products and matrix–vector multiplication; the program prints the number of iterations, the error, and the time.

**2. Basic level.** Create a console program that prompts for the size $n$ of the tridiagonal system $4 x_{i} - x_{i - 1} - x_{i + 1} = b_{i}$ ($b$ from a known solution) and the number of threads, validates the input, and solves the system by the conjugate gradient method with deterministic parallel dot products (64 fixed parts). The program prints the number of iterations, the residual, and the time, and checks that the number of iterations is the same for 1, 2, 4, 8, and 16 threads.

**3. Advanced level.** Create a `cg` console application that solves the Poisson equation on an $N \times N$ grid (`--size`) by the conjugate gradient method with the options `--tol`, `--threads`, `--reduction deterministic|lock`, and `--help`. The program writes a convergence plot to a CSV file (iteration, residual norm), prints a “threads – iterations – time – $S$” table, and shows whether the number of iterations changes between runs for each reduction method. A method that does not converge within $10 N$ iterations uses exit code 2.

### Variant 14. The power method {#v14}

**1. Initial level.** Create a console program that finds the eigenvalue of largest magnitude of a $2000 \times 2000$ symmetric matrix with random elements by the power method (100 iterations) with parallel matrix–vector multiplication, and prints the eigenvalue estimate and the time.

**2. Basic level.** Create a console program that prompts for the matrix size and the tolerance, validates the input, generates a random symmetric matrix, and finds its eigenvalue of largest magnitude by the power method with vector normalization until the Rayleigh quotient converges. Matrix–vector multiplication and the norm are computed in parallel; the program prints an “iteration – estimate – change” table every 10 iterations and the time.

**3. Advanced level.** Create a `power` console application that reads a matrix from a CSV file or generates it (`--random <n>`), finds the largest eigenvalue by the power method and the smallest by inverse iteration (solving the system by the conjugate gradient method for symmetric matrices), measures the time with different thread counts (`--threads`), and accepts `--help`. A nonsymmetric matrix for inverse iteration produces a warning; file errors use exit code 2.

### Variant 15. Spline interpolation {#v15}

**1. Initial level.** Create a console program that builds a cubic spline from 1000 nodes of the function $\sin x$ on $[ 0 ; 2 \pi ]$ and evaluates it at 20,000,000 points sequentially and with `Parallel.For`, printing the largest error relative to `Math.Sin` and the time.

**2. Basic level.** Create a console program that prompts for the number of nodes and the number of evaluation points, validates the input, builds a natural cubic spline (tridiagonal algorithm) for the function $1 / (1 + 25 x^{2})$ on $[ - 1 ; 1 ]$, and evaluates it in parallel with a binary search for the segment. The program prints the error, the time, and the speedup.

**3. Advanced level.** Create a `spline` console application that reads nodes from a CSV file, takes evaluation points from another file or from the option `--grid a:b:n`, evaluates the spline in parallel with three distributions of points (block, cyclic, sorted points in blocks), and compares their times. Options: `--threads`, `--output`, `--help`; unordered or duplicate nodes produce a message in the error stream and exit code 2.

### Variant 16. The least squares method {#v16}

**1. Initial level.** Create a console program that generates 10,000,000 noisy points of $y = 2 x + 1$ and finds the coefficients of the line by the least squares method, computing the sums $\sum x$, $\sum y$, $\sum x^{2}$, $\sum x y$ with a parallel reduction; it prints the coefficients and the time.

**2. Basic level.** Create a console program that prompts for the degree of the polynomial (1 to 8) and the number of points, validates the input, generates noisy points of a given polynomial, and fits them with a polynomial by the least squares method: it computes the matrix of the normal equations (the sums $\sum x^{i + j}$ and $\sum x^{i} y$) in parallel with a deterministic reduction and solves the system by Gaussian elimination. The program prints the coefficients, the root-mean-square error, and the time.

**3. Advanced level.** Create an `lsq` console application that reads points from a CSV file (columns `x`, `y`), builds an approximation by a polynomial of degree `--degree` or by a sum of functions from the option `--basis sin,cos,exp`, computes the normal equations in parallel, prints the coefficients, the error, and the time for different thread counts, and writes a table of residuals to CSV. Option `--help`; an ill-conditioned system produces a warning, and file errors use exit code 2.

### Variant 17. A pendulum for many initial conditions {#v17}

**1. Initial level.** Create a console program that solves the equation of a simple pendulum $\theta'' = - \sin \theta$ by the fourth-order Runge–Kutta method for 10,000 initial angles from 0.01 to 3.1 radians and computes the oscillation periods in parallel; it prints the periods for several angles and the time.

**2. Basic level.** Create a console program that prompts for the damping coefficient, the integration step, and the number of initial velocities, validates the input, and for each velocity integrates the equation of a damped pendulum until it stops, counting the full revolutions. The program compares the block and dynamic distributions of tasks and prints the time and speedup.

**3. Advanced level.** Create a `pendulum-map` console application that, for a damped pendulum ($\theta'' = - \sin \theta - \gamma \theta'$, Runge–Kutta 4), computes in parallel the number of full revolutions before stopping for each point of a grid (initial angle, initial velocity), with the options `--gamma`, `--size`, `--step`, `--schedule block|cyclic|dynamic`, `--threads`, and `--help`. The program writes the map to PGM and a table of thread times (min/max/mean) to CSV. A step that produces a noticeable energy error without damping (checked with $\gamma = 0$) is flagged with a warning in the error stream.

### Variant 18. The predator–prey model {#v18}

**1. Initial level.** Create a console program that solves the Lotka–Volterra system $x' = a x - b x y$, $y' = - c y + d x y$ by the fourth-order Runge–Kutta method for 1000 values of the parameter $a$ in parallel and prints, for every tenth value, the largest and smallest prey population.

**2. Basic level.** Create a console program that prompts for the ranges of the parameters $a$ and $c$ and the number of values of each, validates the input, computes the predator–prey model with logistic limitation for the whole parameter grid in parallel, and determines whether the oscillations decay. The program prints a stability table (the characters `+` and `-`) and the time.

**3. Advanced level.** Create a `lotka` console application that solves the Lotka–Volterra predator–prey model ($x' = a x - b x y$, $y' = - c y + d x y$, Runge–Kutta 4) in parallel for each point of a parameter grid from the ranges `--a`, `--b`, `--c`, `--d`, determines the period and amplitude of the oscillations of each trajectory, writes the results to CSV, compares static and dynamic distributions of tasks, and prints a time table. Option `--help`; negative parameters use exit code 1.

### Variant 19. Projectile motion with air resistance {#v19}

**1. Initial level.** Create a console program that, for launch angles from 1° to 89° in steps of 1°, integrates in parallel the motion of a body with quadratic air resistance (Runge–Kutta 4, $v_{0} = 50$ m/s) and prints the angle with the greatest range and the range itself.

**2. Basic level.** Create a console program that prompts for the initial velocity, the drag coefficient, and the distance to the target, validates the input, and, by a parallel search over 100,000 angles, finds the angles at which the body hits the target to within 0.1 m. The program prints the angles found, the flight time, and the computation time.

**3. Advanced level.** Create a `ballistics` console application that, with the options `--v0`, `--drag`, `--target`, `--wind`, `--resolution`, and `--help`, builds a range table for a grid (angle, velocity) in parallel, finds the minimum velocity to hit the target for each angle, writes the table to CSV, and prints the time of the sequential and parallel versions. An unreachable target produces a message in the error stream and exit code 2.

### Variant 20. The spread of an epidemic (SIR) {#v20}

**1. Initial level.** Create a console program that solves the SIR model ($S' = - \beta S I$, $I' = \beta S I - \gamma I$, $R' = \gamma I$) by the fourth-order Runge–Kutta method for 10,000 values of $\beta$ in parallel and prints, for every thousandth value, the peak number of infected and the day of the peak.

**2. Basic level.** Create a console program that prompts for the ranges of $\beta$ and $\gamma$ and the number of values, validates the input, computes the SIR model on the parameter grid in parallel until the end of the epidemic ($I \lt 1$), and prints a table of epidemic durations. Since the durations differ, the program compares static and dynamic distributions.

**3. Advanced level.** Create a `sir` console application that performs a parametric computation of the SEIR model on a parameter grid from the options, with dynamic load balancing (a counter or `Parallel.For`), writes the peak and the duration for each parameter pair to CSV, and prints the time of each distribution and the 10 worst scenarios. Option `--help`; parameters outside $(0 ; 5 ]$ produce a message in the error stream and exit code 1.

### Variant 21. The 1D heat equation {#v21}

**1. Initial level.** Create a console program that solves the heat equation $u_{t} = u_{x x}$ on a rod with 1,000,000 nodes using an explicit scheme (1000 time steps) sequentially and with `Parallel.For` over the nodes at each step, and prints the temperature at the middle of the rod and the time.

**2. Basic level.** Create a console program that prompts for the number of nodes, steps, and threads, checks the stability condition $\tau \le h^{2} / 2$, and solves the heat equation with an explicit scheme in which $p$ separate threads process stripes of the rod and synchronize with a `Barrier` after each step. The program prints the time and compares the result with the sequential version.

**3. Advanced level.** Create a `heat1d` console application that solves the heat equation with boundary conditions from the options and compares three approaches: a new `Parallel.For` at each step, separate threads with a `Barrier`, and separate threads that synchronize once every $k$ steps with overlap (a halo of width $k$). The program prints a “method – $k$ – time – $S$” table, checks the results, and accepts `--help`; an unstable step uses exit code 1.

### Variant 22. Computing π with series {#v22}

**1. Initial level.** Create a console program that computes $\pi$ with the Leibniz series $4 \sum (- 1)^{k} / (2 k + 1)$ with 1,000,000,000 terms sequentially and in parallel (`Partitioner.Create` ranges and local sums), and prints the value, the error, and the time.

**2. Basic level.** Create a console program that prompts for the number of terms and the number of threads, validates the input, and computes $\pi$ with the Leibniz, Euler ($\pi^{2} / 6 = \sum 1 / k^{2}$), and Nilakantha series in parallel with a deterministic reduction. The program prints a “series – value – error – time – $S$” table.

**3. Advanced level.** Create a `pi-series` console application that computes $\pi$ in parallel with the Leibniz, Euler, or Nilakantha series (`--series`) with `--terms` terms and investigates the effect of the summation order on the error (`--order forward|backward|pairwise`, as well as Kahan summation) and the speedup for `--threads`. The program prints and writes to CSV a “series – order – value – error – time – $S$” table; option `--help`; more than $10^{12}$ terms produces a message in the error stream and exit code 1.

### Variant 23. Fibonacci numbers and DAGs {#v23}

**1. Initial level.** Create a console program that computes $F (n)$ recursively ($F (n) = F (n - 1) + F (n - 2)$) for $n = 32$ sequentially and with `Parallel.Invoke` for the two calls down to depth 10, counts the number of calls (work) and the recursion depth (span), and prints them, the parallelism, and the time.

**2. Basic level.** Create a console program that prompts for $n$ (20 to 40) and a depth threshold, validates the input, computes recursive Fibonacci numbers with `Parallel.Invoke` down to the threshold, and prints the work $T_{1}$, the span $T_{\infty}$, the Brent’s theorem bound for $p = 2 , 4 , 8 , 16$, and the measured speedup.

**3. Advanced level.** Create a `dag` console application that reads a task graph from a file (each line is “name duration dependencies”), computes the work, the span, and the critical path, simulates a greedy scheduler for $p$ processors (`--procs 1,2,4,8`) and prints a text Gantt chart, and also executes the graph with real TPL tasks using `Task.Delay`. Cycles in the graph produce a message in the error stream and exit code 2.

### Variant 24. Reduction trees and PRAM {#v24}

**1. Initial level.** Create a console program that simulates an EREW PRAM for the sum of 16 numbers: at each step, it prints which processors read and write which cells, and checks that no cell is read by two processors simultaneously.

**2. Basic level.** Create a console program that prompts for the number of values $n$ (a power of 2), validates the input, and simulates on $n / 2$ “processors” (`Parallel.For` at each step) finding the sum and the maximum by a tree in $\log_{2} n$ steps. The program prints the number of steps, the number of operations, and the result, and checks the EREW rule.

**3. Advanced level.** Create a `pram` console application that simulates programs for the EREW, CREW, and CRCW PRAM (sum, maximum in $O (1)$ on $n^{2}$ processors, broadcasting a value) with the options `--model`, `--n`, `--trace`, and `--help`. The program counts the steps and operations, detects violations of the model’s access rules, and prints them to the error stream; violations produce exit code 3.

### Variant 25. BSP supersteps {#v25}

**1. Initial level.** Create a console program that, on 4 separate threads with a `Barrier`, performs 5 BSP supersteps: each thread adds the value received from its left neighbor to its own value and sends the result to its right neighbor; the program prints the state after each superstep.

**2. Basic level.** Create a console program that prompts for the number of processors $p$ and the array size, validates the input, and computes a prefix sum with a BSP program of three supersteps (local sums, exchange of sums, correction) on $p$ separate threads with a `Barrier`. The program prints $w$, $h$, and the time for each superstep.

**3. Advanced level.** Create a `bsp` console application that provides “processor” and “message” classes for BSP programs on threads (`Send`, `Sync`, received messages), counts $w$, $h$, and the number of barriers, and on this basis implements sample sort. Options: `--p`, `--n`, `--g`, `--l`, `--help`; the program compares the prediction $\sum (w + g h + l)$ with the measured time.

### Variant 26. Load balancing {#v26}

**1. Initial level.** Create a console program that tests the numbers from 1 to 20,000,000 for primality by trial division with a block distribution on 8 threads and with a dynamic `Interlocked.Increment` counter with chunks of 1000 numbers, printing the number of primes and the time of both approaches.

**2. Basic level.** Create a console program that prompts for the number of tasks and the distribution law of their durations (uniform, increasing, random), validates the input, and executes the computational tasks with the block, cyclic, and dynamic distributions. The program prints a “distribution – time – $S$ – max/mean thread time” table.

**3. Advanced level.** Create a `balance` console application that compares the block and cyclic distributions, a counter with `--chunk` chunks, master–worker with a channel (`System.Threading.Channels`), and `Parallel.For` for tasks from a file (the duration or parameter of each task), writes the time of each thread to CSV, and prints a summary table. Option `--help`; an empty file uses exit code 2.

### Variant 27. A grid scheduler (simulation) {#v27}

**1. Initial level.** Create a console program that simulates 3 organizations (clusters with 16, 32, and 8 cores) and 200 jobs with a random number of cores and duration, assigns the jobs greedily to the resource with the shortest wait, and prints the completion time of all jobs.

**2. Basic level.** Create a console program that reads a description of the resources of three organizations and a list of jobs with requirements (cores, memory, virtual organization), validates the data, and simulates a grid broker: a job goes only to resources of its own VO. The program prints the schedule, the load of each resource, and the average waiting time.

**3. Advanced level.** Create a `gridsim` console application that simulates a grid with resources, virtual organizations, and access policies from a JSON file, compares broker strategies (`--policy random|least-queue|best-fit`), and runs the simulation in parallel for several generator seeds. The program prints a “strategy – average wait – load” table and accepts `--help`; invalid JSON uses exit code 2.

### Variant 28. Volunteer computing (simulation) {#v28}

**1. Initial level.** Create a console program that simulates a server with 1000 work units (testing numbers from a range for primality) and 8 client threads that take units from a `ConcurrentQueue`, compute them, and return the results; the program prints the number of primes and the contribution of each client.

**2. Basic level.** Create a console program that prompts for the number of clients, the probability of an erroneous result, and the quorum (2 or 3), validates the input, and simulates a volunteer computing server: each work unit is issued to several clients, and a result is accepted when a quorum of answers agrees. The program prints the number of reissues and detected errors.

**3. Advanced level.** Create a `volunteer` console application that simulates a server and clients with failures (disappearance, slowness, wrong results), deadlines, and reissuing of work units, with the options `--clients`, `--units`, `--failure`, `--quorum`, `--deadline`, and `--help`. The program prints the completion time and the share of redundant computation, and writes an event log to a file. Invalid probabilities use exit code 1.

### Variant 29. Speedup prediction {#v29}

**1. Initial level.** Create a console program that multiplies $1024 \times 1024$ matrices with stripes on 1, 2, 4, and 8 threads, computes the prediction $S_{p} = \min (p , 8)$, and prints a “threads – time – measured $S$ – predicted $S$” table.

**2. Basic level.** Create a console program that prompts for the matrix size and a list of thread counts, validates the input, measures the model parameters (the time of one multiply–add operation, the time of an empty `Parallel.For`), and for matrix multiplication with stripes prints a table of predicted and measured speedup and efficiency.

**3. Advanced level.** Create a `predict` console application that, for matrix multiplication (stripes, the checkerboard scheme, Cannon), measures the model parameters (an operation, copying a block, a barrier, memory bandwidth), builds a prediction for sizes `--sizes` and threads `--threads`, compares it with the measurements, computes the Karp–Flatt metric, and writes the table to CSV. Option `--help`; a prediction discrepancy of more than 50% is flagged with a warning.

### Variant 30. Isoefficiency {#v30}

**1. Initial level.** Create a console program that computes the sum of an array of $n$ numbers on $p$ threads for $n = 10^{5} , 10^{6} , 10^{7}$ and $p = 2 , 4 , 8$ and prints a table of the efficiency $E = T_{1} / (p T_{p})$.

**2. Basic level.** Create a console program that prompts for a target efficiency (0.3 to 0.9), validates the input, and for $p = 2 , 4 , 8 , 16$ doubles the problem size (matrix–vector multiplication) until the measured efficiency reaches the target. The program prints a “$p$ – minimum $n$ – $E$” table.

**3. Advanced level.** Create an `isoefficiency` console application that experimentally determines the isoefficiency function for three algorithms (sum, matrix–vector multiplication with stripes, matrix multiplication) by a binary search on the problem size, writes the points $(p , W)$ to CSV, fits the exponent of $W \, p^{\alpha}$ by least squares in logarithms, and compares it with the theoretical one. Options: `--target`, `--threads`, `--help`.

## Procedure

1. Study the theory and worked examples.
2. For your variant, perform an analysis using the PCAM methodology: identify the primitive tasks, the communication between them, the agglomeration method, and the distribution among threads (static or dynamic); estimate the work and span of the algorithm.
3. Create a .NET 10 console project in JetBrains Rider; implement a sequential version, a parallel version, and a check of the result against a reference (with a tolerance for floating-point numbers; for numerical methods, against the exact solution or an error estimate by Runge’s rule).
4. Build an execution time model, measure its parameters (the time of one operation, of synchronization, memory bandwidth), and compute the predicted speedup.
5. Measure the time in the *Release* configuration (warmup, median of at least 5 runs) for 1, 2, 4, 8, and 16 threads, write the table to CSV, and plot the predicted and measured speedup in Excel or LibreOffice Calc; explain the discrepancies.
6. Demonstrate the program, explain the code, the model, and the measurement results, and answer the review questions.
