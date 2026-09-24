---
title: "Numerical methods and performance prediction"
description: "Topic 8. Parallel algorithms: Numerical methods and performance prediction"
outline: [2, 3]
sourceHash: "950e1d90c6495d8580b10baaeeb698087db44b745f188320079414a97a109a7a"
---

# Numerical methods and performance prediction

## Parallel solution of nonlinear equations

The roots of an equation $f (x) = 0$ on a segment $[ a ; b ]$ are found in two stages:

1. **root isolation**: the segment is divided into $M$ small segments, and those at whose endpoints $f$ has different signs are found; each such segment contains a root;
2. **refinement** of each root by bisection, the secant (chord) method, or Newton’s method.

Both stages are perfectly parallel: the values of $f$ at $M + 1$ nodes are independent (data parallelism), and the roots are refined independently (task parallelism). The grid step must be smaller than the smallest distance between roots: if a segment contains two roots, the signs at its endpoints are the same, and both roots will be lost. In the “Roots of an equation” example for the Legendre polynomial $P_{1000}$, a grid of 400 thousand segments finds all 1000 roots, and a grid of 100 thousand only 996: near the ends of the segment $[ - 1 ; 1 ]$, the roots are closer together than the step $2 \cdot 10^{- 5}$.

**Bisection** halves the segment at each iteration and keeps the half with a sign change; after $k$ iterations the length decreases by a factor of $2^{k}$ (for a tolerance of $10^{- 15}$ on a segment of $5 \cdot 10^{- 6}$, 32 iterations). A single bisection can be parallelized too: **$p$-section search** evaluates $f$ simultaneously at $p$ interior points and shrinks the segment by a factor of $p + 1$ per iteration. This pays off only for a very expensive function: for a cheap one, the task overhead exceeds the gain.

**Newton’s method** $x_{k + 1} = x_{k} - f (x_{k}) / f' (x_{k})$ converges quadratically (the number of correct digits doubles at each iteration), but only from a sufficiently close approximation. The **multistart** method runs Newton’s method in parallel from many starting points and collects the distinct roots found. For complex polynomials, the set of starting points from which the method converges to a particular root forms a **basin of attraction** with fractal boundaries – a classic example of data parallelism where every point of the plane is independent. For **systems** of nonlinear equations $F (x) = 0$, Newton’s method at each iteration computes the Jacobian matrix (its $n^{2}$ partial derivatives are independent – computed in parallel) and solves a linear system (Gaussian elimination, Topic 7).

## The conjugate gradient method

For large sparse systems $A x = b$ with a **symmetric positive definite** matrix (discretizations of the Laplace and Poisson equations, heat conduction and elasticity problems), the **conjugate gradient** (*CG*) method is used most often. Unlike the Jacobi method (Topic 7), it moves not along the residual but along directions that are **conjugate** with respect to $A$ ($d_{i}^{T} A d_{j} = 0$), so in exact arithmetic it finds the solution in at most $n$ iterations, and in practice it reaches the required accuracy in a number of iterations of the order of $\sqrt{\kappa}$, where $\kappa$ is the condition number of the matrix. The algorithm:

1. $x_{0} = 0$, $r_{0} = b$, $d_{0} = r_{0}$;
2. for $k = 0 , 1 , …$: $q = A d_{k}$; $\alpha = (r_{k} , r_{k}) / (d_{k} , q)$; $x_{k + 1} = x_{k} + \alpha d_{k}$; $r_{k + 1} = r_{k} - \alpha q$;
3. if $| | r_{k + 1} | | \lt \epsilon | | b | |$, stop; otherwise, $\beta = (r_{k + 1} , r_{k + 1}) / (r_{k} , r_{k})$, $d_{k + 1} = r_{k + 1} + \beta d_{k}$.

One iteration contains **one matrix–vector multiplication**, **two dot products**, and **three** `axpy` **operations** ($y \leftarrow \alpha x + y$). Sparse matrix–vector multiplication is parallel by rows (horizontal stripes), the `axpy` operations are fully parallel, and the dot products are reductions. It is the reductions that limit scalability: each requires global synchronization (`MPI_Allreduce` on a cluster, Topic 12), and the iteration cannot proceed until the number $\alpha$ or $\beta$ is known. That is why CG variants for clusters rearrange the operations to combine the two dot products into a single reduction.

Determinism is especially important in iterative methods: if the dot products depend on the order in which threads finish, the number of iterations can change from run to run. In the lab (Example 2), the conjugate gradient method for the pentadiagonal matrix of the Poisson equation on a $500 \times 500$ grid performs the same 986 iterations and produces bit-for-bit identical results for 1–16 threads, because the dot products are computed over 64 fixed parts.

## Systems of ordinary differential equations

The initial value problem for a system $y' = f (t , y)$, $y (t_{0}) = y_{0}$, where $y$ is a vector of $m$ components, is most often solved by the **fourth-order Runge–Kutta method** (*RK4*) with step $h$: $$k_{1} = f (t , y) , \quad k_{2} = f (t + \frac{h}{2} , y + \frac{h}{2} k_{1}) ,$$ $$k_{3} = f (t + \frac{h}{2} , y + \frac{h}{2} k_{2}) , \quad k_{4} = f (t + h , y + h k_{3}) ,$$ $$y (t + h) \approx y + \frac{h}{6} (k_{1} + 2 k_{2} + 2 k_{3} + k_{4}) .$$ The error over the interval is $O (h^{4})$; it is controlled by Runge’s rule (comparing steps $h$ and $h / 2$) or by embedded formulas with automatic step size selection.

Time steps are sequential: $y (t + h)$ depends on $y (t)$. Therefore, parallelism is sought in other dimensions:

- **parallelism across trajectories** (parametric computations, *parameter sweep*): the system is solved for thousands of parameter sets or initial conditions, and each trajectory is independent. This is the simplest and most efficient case, but trajectories have different durations (one stops in a second, another in a minute), so dynamic load balancing is needed. On a cluster and in a grid, each group of trajectories becomes a separate job (Slurm job arrays, Topic 13);
- **parallelism across components**: for a large system (the method of lines for the heat equation, an $N$-body problem with millions of particles), the computation of $f (t , y)$ is divided among threads by the components of $y$. Synchronization is needed between the stages $k_{1} , … , k_{4}$ (four barriers per step), so there must be enough components for the work of a stage to outweigh a barrier;
- **parallelism in time** (the Parareal algorithm and similar ones): a coarse sequential solution is refined in parallel on time intervals; it is used on very large clusters when the other dimensions are exhausted.

In the lab (Example 3), 3072 trajectories of a damped pendulum for different damping coefficients and initial velocities take from a few to hundreds of milliseconds. The block distribution gave a speedup of only 2.3, the cyclic one 11.0, and the dynamic one with a shared counter 11.9 on 16 logical processors.

## Analytical performance prediction

Amdahl’s and Gustafson’s laws (Topic 1) estimate the speedup from the fraction of sequential code. For a specific algorithm, a more accurate prediction is given by an **execution time model** built from the PCAM stages: $$T_{p} = T_{\text{comp}} (n , p) + T_{\text{comm}} (n , p) + T_{\text{sync}} (p) + T_{\text{idle}} (n , p) ,$$ where $T_{\text{comp}}$ is the computation of the most heavily loaded thread, $T_{\text{comm}}$ is communication (the α–β or LogP model on a cluster; moving data from memory and between caches in shared memory), $T_{\text{sync}}$ is barriers and starting loops and tasks, and $T_{\text{idle}}$ is idle time due to imbalance. The model parameters are obtained with microbenchmarks: the time of one operation on one core, the time of an empty parallel loop or barrier, and memory or network bandwidth. The predicted speedup $S_{p} = T_{1} / T_{p}$ is compared with the measured one: agreement means that the model accounts for the main costs, and a discrepancy indicates what exactly the model missed.

**Example: matrix–vector multiplication.** For horizontal stripes in shared memory, $$T_{p} = \max (\frac{T_{1}}{p} , \frac{8 n^{2}}{B}) + t_{\text{sync}} ,$$ where $8 n^{2}$ is the number of bytes of the `double` matrix, $B \approx 44$ GB/s is the memory bandwidth measured in Topic 7, and $t_{\text{sync}}$ is the time of an empty `Parallel.For` (a few microseconds). For vertical stripes and the checkerboard scheme, a reduction of the partial vectors and one more parallel loop are added. For $n = 8000$, reading the matrix from memory takes at least $512 \cdot 10^{6} / 44 \cdot 10^{9} \approx 11 {,} 6$ ms, and $T_{1} \approx 54$ ms, so the prediction is $S \le 4 {,} 6$ regardless of the number of threads – and the measured speedup of 4.3–4.8 agrees with it. For $n = 1000$, the data are in the L3 cache and the model predicts an almost linear speedup, but at most 3.7 was measured: 0.8 ms of work is little, and waking up the pool threads, which the model does not account for, becomes noticeable.

**Example: matrix multiplication.** In the lab, the prediction $T_{p} = T_{1} / \min (p , 8)$ accounts only for the 8 physical cores (the 16 SMT logical processors do not double the execution units), and for Cannon’s algorithm it also includes the measured time of copying blocks and of barriers. That contribution turned out to be negligible (a prediction of 7.8 instead of 8.0), while the measured speedup was 4–5.5 (Fig. 8.11). The discrepancy shows costs that the model does not include: one core runs at a higher frequency than eight at once, and 9 blocks on 8 cores give a mapping imbalance.

::: info Screenshot
Windows Terminal: `dotnet run -c Release` of the lab example 1 project (MatMul); the table Scheme / p / Time, ms / S / Predicted S / E / max|ΔC| for stripes, checkerboard, Cannon
:::

Figure 8.11. Predicted and measured speedup {.caption}

### Isoefficiency

Efficiency can be expressed through the **overhead** $T_{o} = p T_{p} - T_{1}$ – the total time of all processors not spent on useful work: $$E = \frac{T_{1}}{p T_{p}} = \frac{1}{1 + T_{o} / T_{1}} .$$ As $p$ increases, the overhead grows (more communication and synchronization), and efficiency falls. But $T_{o}$ usually grows more slowly than the useful work $T_{1} = W$ if the problem size is increased. Efficiency stays constant if $W$ grows so that $$W = K \cdot T_{o} (W , p) , \quad K = \frac{E}{1 - E} .$$ The dependence $W (p)$ that ensures this is called the **isoefficiency function** (Grama, Gupta, Kumar, 1993). The more slowly it grows, the better the algorithm scales (Table 8.6).

Table 8.6. Isoefficiency functions of typical algorithms {.caption}

| **Algorithm (distributed memory)** | **Overhead $T_{o}$** | **Isoefficiency $W$** |
| --- | --- | --- |
| tree sum of $n$ numbers | $\Theta (p \log p)$ | $\Theta (p \log p)$ |
| matrix–vector, stripes | $\Theta (n p)$ | $\Theta (p^{2})$ |
| matrix–vector, checkerboard | $\Theta (n \sqrt{p} \log p)$ | $\Theta (p \log^{2} p)$ |
| Cannon’s matrix multiplication | $\Theta (n^{2} \sqrt{p})$ | $\Theta (p^{3 / 2})$ |

For example, for the sum of $n$ numbers on $p$ processors, each process adds $n / p$ numbers, followed by $\log_{2} p$ reduction steps; $T_{o} \approx 2 p \log_{2} p$. To maintain 80% efficiency ($K = 4$), $n \approx 8 p \log_{2} p$ is required: 512 numbers for 16 processors and 82 thousand for 1024. For matrix–vector multiplication with stripes, $W = n^{2} \approx p^{2}$, that is, doubling the number of processors requires doubling $n$, whereas the checkerboard scheme requires increasing $n$ by only a little more than $\sqrt{2}$. The isoefficiency function can also be found experimentally: for each $p$, increase the problem size until the measured efficiency reaches the specified value (variant 30 of the lab). For analyzing already measured data, the Karp–Flatt metric (Topic 1) is convenient.
