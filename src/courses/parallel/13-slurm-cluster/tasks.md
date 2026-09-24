---
title: "Tasks"
description: "Topic 13. Clusters and the Slurm scheduler: task variants"
outline: [2, 3]
sourceHash: "ed3f08691235135eb1b03c4ba114c9cbca83d69d80f5608aa0b11a3ee605badd"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Heat conduction scalability {#v1}

**1. Initial level.** Create a C++ MPI program that simulates the cooling of a rod of $10^{6}$ nodes with an explicit scheme (each rank stores its part and exchanges boundary values with its neighbors) for 2000 steps and prints the time and the temperature at the center, and an `sbatch` script that runs it on one node with 4 processes via `srun --mpi=pmix` and writes the output to the file `heat-<job number>.out`.

**2. Basic level.** Create a bash script that prompts for the rod size (from $10^{5}$ to $10^{8}$ nodes) and the number of steps, validates the input and checks that the executable of the MPI heat conduction program exists, submits jobs for 1, 2, and 3 nodes with 4 processes each (`sbatch --wait` or dependencies), and after they finish collects the times from the output files and prints a “nodes – processes – time, s – speedup $S$ – efficiency $E$” table.

**3. Advanced level.** Create a `scalebench` set of scripts for studying the scalability of a C++ MPI program that simulates heat conduction in a rod with an explicit scheme (boundary value exchange between ranks), with options `--nodes 1,2,3`, `--ppn 1,2,4`, `--size <n>`, `--steps <k>`, `--repeat <r>`, `--weak`, `--csv <file>`, and `--help`. The set generates `sbatch` scripts for each configuration, submits them in one allocation or as a `singleton` chain, collects the median of $r$ runs, and prints a strong (with `--weak`, weak) scaling table and a CSV. Option errors produce code 1; jobs with a state other than `COMPLETED` (`sacct`) go to the error stream with code 2.

### Variant 2. The SIR epidemic model {#v2}

**1. Initial level.** Create a C++ console program that simulates an epidemic with the SIR model (population 100,000, 10 infected at the start, a step of 0.1 day, 200 days) for coefficients $\beta$ and $\gamma$ given as arguments and prints a CSV line: $\beta$, $\gamma$, peak number of infected, day of the peak, fraction ever infected; and an `sbatch` script with an array `--array=1-10` in which element $i$ sets $\beta = 0 {,} 1 \cdot i$ with $\gamma = 0 {,} 1$.

**2. Basic level.** Create an `sbatch` script with an array of 100 jobs, each of which runs a C++ SIR epidemic model program (CSV line: $\beta$, $\gamma$, peak number of infected, day of the peak, fraction ever infected) with a pair $(\beta , \gamma)$ derived from `SLURM_ARRAY_TASK_ID` on a 10 × 10 grid ($\beta$ 0.1–1.0, $\gamma$ 0.05–0.5), and a bash script that after the array (an `afterok` dependency) checks that there are 100 lines, merges them into a CSV, sorts by peak, and prints the 5 worst and 5 best scenarios and any missing elements.

**3. Advanced level.** Create a `sirsweep` project (CMake, a C++ model program, and bash scripts) that accepts options `--beta <from:to:step>`, `--gamma <from:to:step>`, `--days <n>`, `--max-parallel <k>` (the array’s `%k` limit), `--out <directory>`, and `--help`, generates a job array, resubmits only the elements that failed (according to `sacct`), and builds a report: a table of peak infections as a $\beta \times \gamma$ matrix, $R_{0} = \beta / \gamma$ for each cell, and a CSV. Invalid ranges produce exit code 1, and elements still unfinished after a retry produce 2.

### Variant 3. A cluster usage report {#v3}

**1. Initial level.** Create a C# console program that reads a file with `sacct --parsable2 --format=JobID,User,CPUTimeRAW` output (the file name is an argument), skips step lines (the number contains a dot), and prints for each user the number of jobs and the CPU time used in hours, sorted by time in descending order.

**2. Basic level.** Create a C# console program that prompts for a file with `sacct --parsable2` output with the fields `JobID`, `User`, `Account`, `State`, `AllocCPUS`, `ElapsedRaw`, `Submit`, `Start` and a report start date, checks that the required columns are present and the lines are well formed, and prints a “user – account – jobs – successful, % – CPU·h – average wait” table with a total line; lines with format errors are counted and printed separately.

**3. Advanced level.** Create a C# console application `clusterusage` that accepts options `--input <file>` (without it, it runs `sacct` itself), `--from`, `--to`, `--group-by user|account|partition`, `--top <n>`, `--csv <file>`, and `--help`, and builds a usage report: CPU·h, share of the total, number of jobs by state, average and maximum wait, the jobs with the most CPU time, and an hourly histogram of cluster CPU occupancy (as text bars). An unknown option produces code 1, and a read error or a failure to run `sacct` produces code 2.

### Variant 4. Checking node health {#v4}

**1. Initial level.** Create a bash script that, via `pdsh -w node[01-03]`, collects from each node its name, number of processors (`nproc`), amount of memory, kernel version, and Slurm version (`slurmd -V`) and prints a table with one line per node.

**2. Basic level.** Create a bash script that takes a node list as an argument (default `node[01-03]`) and collects from the nodes the kernel version, the versions of the `slurmd`, `munge`, and `openmpi-bin` packages, the checksums of `/etc/slurm/slurm.conf` and `munge.key` (`sha256sum`, for the key via `sudo`), the state of the `munge` and `slurmd` services, and the clock offset from the `head` node. The script prints a table and marks with `!` the values that differ from the majority of nodes; unreachable nodes are listed separately.

**3. Advanced level.** Create a `nodecheck` tool (bash or C#) that accepts options `--nodes <list>`, `--baseline <file>` (a reference configuration in JSON), `--save-baseline`, `--json`, and `--help`, collects node parameters (processors, memory, kernel, packages, configuration checksums, services, time, `ulimit -l -n` limits, frequency governor, THP, `vm.swappiness`), compares them with the baseline, and prints a table of deviations with a recommended fix. Exit code: 0 – no deviations, 1 – option error, 3 – deviations found, 4 – some nodes are unreachable.

### Variant 5. An image processing pipeline {#v5}

**1. Initial level.** Create two `sbatch` scripts and a submission script: the first job generates 8 PGM images of 600×400 with random noise (C++ or `awk`), the second is an array of 8 elements, each of which blurs one image with a 3×3 mean filter (a C++ program) and starts with an `afterok` condition; the submission script prints the job numbers.

**2. Basic level.** Create a pipeline of three Slurm jobs: generating noisy PGM images → a processing array in which each element blurs one image with a mean filter (a C++ program) → assembling a report. The submission script prompts for the number of images (from 1 to 100) and the filter size (3, 5, or 7), validates the input, and submits the jobs with `afterok` conditions; the report job prints a “file – mean brightness before – after – processing time” table. A job with an `afternotok` condition writes a list of unprocessed files in case of failure.

**3. Advanced level.** Create an `imgpipe` project (a C++ processing program and bash scripts) with options `--input <directory>`, `--filters blur,sobel,median`, `--chunk <k>` (images per array element), `--max-parallel <n>`, `--retry <r>`, and `--help`. The script builds a job chain for each filter, automatically resubmits failed elements (at most $r$ times), and creates a report: the number of processed files, errors, and total and average time according to `sacct`. Exit code: 0 – everything processed, 2 – some files are unprocessed.

### Variant 6. A slurm.conf generator {#v6}

**1. Initial level.** Create a bash script that runs `slurmd -C` on nodes `node[01-03]` via `pdsh`, keeps only the `NodeName` lines, and reduces each node’s `RealMemory` by 5 % (rounded down to hundreds of MB), printing ready-to-use lines for `slurm.conf`.

**2. Basic level.** Create a C# console program that reads `pdsh -w <nodes> slurmd -C` output from a file (the user enters the file name), parses the parameters of each node, merges nodes with the same configuration into a compact form (`node[01-03]`), and prints the `NodeName` lines and a `PartitionName=debug` line with all nodes; malformed lines are printed as warnings.

**3. Advanced level.** Create a C# console application `slurmconfgen` that generates a complete `slurm.conf` and `cgroup.conf` from the nodes’ `slurmd -C` output (the `--nodes <list>` option runs `pdsh … slurmd -C`, and `--input <file>` reads existing output), grouping identical nodes. Options: `--controller <node>`, `--mem-reserve <percent>`, `--partition <name>:<MaxTime>` (repeatable), `--accounting`, `--help`. The application checks that the nodes of each partition exist and that `MaxTime` is well formed, compares the result with the existing file, and prints the difference. Errors go to the error stream with code 1.

### Variant 7. A hybrid Mandelbrot set {#v7}

**1. Initial level.** Create a hybrid MPI + OpenMP C++ program that computes the number of iterations for a 2400×1600 image of the Mandelbrot set (at most 2000 iterations per point): ranks divide the rows in turn, and OpenMP threads process a row with `schedule(dynamic)`; and an `sbatch` script for 2 nodes with 2 ranks of 2 threads each that sets `OMP_NUM_THREADS=$SLURM_CPUS_PER_TASK`.

**2. Basic level.** Create an `sbatch` script that, in a single allocation of 12 CPUs, runs the hybrid Mandelbrot program with “ranks × threads” layouts 1 × 12, 2 × 6, 3 × 4, 6 × 2, and 12 × 1 (`srun -n … -c …` steps), performs 3 runs for each, checks that the total number of iterations is the same, and prints a table of median times and speedup relative to 1 × 1.

**3. Advanced level.** Create a `mandelhybrid` project (CMake, `find_package(MPI)` and `find_package(OpenMP)`) with a program that accepts options `--size <w>x<h>`, `--iter <n>`, `--schedule static|dynamic`, `--image <file.pgm>`, and `--help` (rank 0 gathers the image via `MPI_Gatherv`), and a script that generates jobs for all layouts on 1–3 nodes. The report: a “nodes – ranks – threads – time – $S$ – $E$” table with the best layout for each number of nodes and the share of communication time (`MPI_Wtime` around the gather).

### Variant 8. The processor frequency governor {#v8}

**1. Initial level.** Create a bash script that prints, for each logical processor, the current frequency governor and the current frequency from the `/sys/devices/system/cpu/cpu*/cpufreq` directory, and if the directory does not exist (a virtual machine), prints a message that the `cpufreq` driver is missing.

**2. Basic level.** Create an `sbatch` script that, on a physical node (the `-w` option), prints the current governor, runs a single-threaded test (computing $\pi$ with the rectangle method in $10^{9}$ steps, a C++ program) 5 times, and prints the median time and the average processor frequency during the test (`/proc/cpuinfo`, the `cpu MHz` field). The script checks that the governor is available and exits with an explanation if not.

**3. Advanced level.** Create a `govbench` tool (bash scripts and a C++ test program) that, for each governor in the list `--governors performance,powersave,schedutil`, sets it via `cpupower` (with `sudo`), runs single-threaded and multithreaded tests `--repeat <r>` times, restores the original governor even on error (`trap`), and prints a “governor – test – median time – frequency – deviation from `performance`, %” table and a CSV. In a VM without `cpufreq`, the tool exits with code 3 and a message.

### Variant 9. A queue for student jobs {#v9}

**1. Initial level.** Create a `slurm.conf` fragment with partitions `lab` (nodes `node[01-02]`, maximum time 15 min, the default) and `project` (all nodes, 4 h) and a bash script that submits a test job `sleep 30` to each partition and prints the job number, partition, and state via `squeue`.

**2. Basic level.** Create a bash script that checks the cluster’s partition limits: for each partition from `sinfo -h -o "%P %l"`, it submits jobs with a time limit below and above the maximum (`--time`) and with a memory request larger than the node’s `RealMemory`, records whether each job was accepted or rejected (the `sbatch` error text), cancels the accepted test jobs, and prints a “partition – test – expected – actual result” table.

**3. Advanced level.** Create a `queuetest` test suite (bash) for the lab cluster’s queue settings: options `--config <scenario file>`, `--user <name>`, `--cleanup`, and `--help`. A scenario describes a job (partition, nodes, time, memory, QoS) and the expected result (rejected, `PENDING` with a certain reason, `RUNNING`); the tool submits the job, waits up to 60 s, compares the state and reason with the expected ones, cancels the test jobs, and prints a “passed / failed” summary. The exit code is the number of failed scenarios.

### Variant 10. Portfolio risk with Monte Carlo {#v10}

**1. Initial level.** Create a C++ console program that uses the Monte Carlo method ($10^{7}$ scenarios, a `std::mt19937_64` generator seeded from an argument) to estimate the probability of a loss above 10 % for a portfolio of three assets with normally distributed annual returns (parameters in the program), and an `sbatch` script with an array of 10 elements in which the seed equals `SLURM_ARRAY_TASK_ID`.

**2. Basic level.** Create an `sbatch` script with an array of 20 elements, each of which runs a C++ program that uses the Monte Carlo method (seed `SLURM_ARRAY_TASK_ID`) to estimate, for a portfolio of three assets, the probability of a loss above 10 % and the 95 % VaR, and a bash script that, after the array finishes (an `afterok` dependency), collects these estimates from the output files, checks that all elements produced a result, and prints the mean, standard deviation, and 95 % confidence interval of each quantity and a table of the elements’ results.

**3. Advanced level.** Create an `mcrisk` project (a C++ program with OpenMP and scripts) that accepts options `--assets <CSV file with returns and correlations>`, `--scenarios <n>`, `--jobs <k>`, `--threads <t>`, `--confidence 0.95,0.99`, and `--help`, generates an array of $k$ elements (each with OpenMP threads using independent generators), collects the results, and computes VaR and CVaR with confidence intervals. The correctness of the correlation matrix (symmetry, Cholesky decomposition) is checked before submission; an error produces code 1.

### Variant 11. Monitoring node load {#v11}

**1. Initial level.** Create a bash script that runs `mpstat 1 5` (package `sysstat`) on nodes `node[01-03]` via `pdsh` and prints for each node its average processor load (`%usr`, `%sys`, `%idle`) on one line.

**2. Basic level.** Create a bash script that, for a user-specified time (from 10 to 600 s), collects every 5 s from all nodes the processor load, free memory, and the number of Slurm tasks on the node (`squeue -w <node> -h | wc -l`), writes the measurements to CSV, and at the end prints a “node – average / maximum load – minimum free memory” table.

**3. Advanced level.** Create a C# console application `clustermon` that accepts options `--nodes <list>`, `--interval <s>`, `--duration <s>`, `--alert-load <percent>`, `--csv <file>`, and `--help`, polls the nodes over SSH (`mpstat`, `free`, `sinfo -N`), displays a table that updates in the console, highlights nodes with load above the threshold or in the `DRAIN` and `DOWN` states, and after finishing saves a CSV and a summary. An unreachable node does not stop monitoring but is reported as a warning on the error stream.

### Variant 12. Sorting a large file {#v12}

**1. Initial level.** Create an `sbatch` script with an array of 4 elements, each of which sorts its part of a file of $4 \cdot 10^{6}$ integers (the parts were split beforehand with `split -n l/4`) with `sort -n` and writes the result to `sorted-<number>.txt`.

**2. Basic level.** Create a chain of three jobs: generating a file of $n$ random numbers ($n$ is an argument of the submission script, from $10^{5}$ to $10^{8}$) and splitting it into $k$ parts; an array of $k$ sorting elements; and a merge job `sort -m -n` with an `afterok` condition that checks the ordering and line count of the result and prints the time of each stage.

**3. Advanced level.** Create an `extsort` project (a C++ program that sorts a part with parallel `std::sort`, and scripts) that accepts options `--input <file>`, `--chunks <k>`, `--mem-per-chunk <MB>`, `--output <file>`, and `--help`, computes the number of parts from the file size and memory, builds a “split → sorting array → merge” chain, retries only the failed element if one fails, and prints a report of stage times according to `sacct`. The result is checked for ordering; a failed check produces code 2.

### Variant 13. An automatic benchmark {#v13}

**1. Initial level.** Create a bash script that, for each number of processes 1, 2, 4, and 8, generates a file `bench-<p>.sbatch` with the directive `#SBATCH --ntasks=<p>` and the command `srun --mpi=pmix ./pi_mpi`, submits all the files, and prints the job numbers.

**2. Basic level.** Create a bash script for benchmarking an MPI program that computes $\pi$ (`./pi_mpi`); it prompts for a list of process counts and the number of repetitions, validates the input, generates and submits `sbatch` jobs (`srun --mpi=pmix`), waits for them to finish (`squeue` in a loop with a pause), extracts the times from the output files, writes `results.csv` with the fields `p,run,time`, and prints a table of medians and speedup.

**3. Advanced level.** Create an `autobench` tool (bash) that reads a scenario file (program, arguments, lists of `nodes`, `ntasks`, `cpus-per-task`, environment variables, number of repetitions), generates scripts for all combinations, submits them with a limit on the number of simultaneous jobs, collects times from the output and states from `sacct`, and writes a CSV and a report with the best configuration. Options: `--scenario <file>`, `--dry-run` (only show the scripts), `--resume` (skip completed combinations), `--help`; scenario errors produce code 1.

### Variant 14. Recovering a node from the DRAIN state {#v14}

**1. Initial level.** Create a bash script that prints the nodes in the `drain`, `draining`, and `down` states with the reason, user, and time (`sinfo -R` with a custom format) and, for each such node, the `ping` response and the state of the `slurmd` service via SSH.

**2. Basic level.** Create a bash diagnostic script that, for a node given as an argument, checks SSH reachability, the state of `munge` and `slurmd`, the time difference with `head`, the free space in `/var` and `/tmp`, whether the `slurmd -C` resources match the node’s line in `slurm.conf`, and the latest errors in `/var/log/slurm/slurmd.log`; it prints a table of “ok / FAIL” checks with explanations and a recommended command (`systemctl restart …`, `scontrol update … resume`).

**3. Advanced level.** Create a `noderescue` tool (bash) for recovering Slurm nodes from the `drain`/`down` states with options `--node <name>` or `--all`, `--fix`, `--log <file>`, and `--help`. The tool checks SSH reachability, the `munge` and `slurmd` services, the time difference with `head`, the free space in `/var` and `/tmp`, whether `slurmd -C` matches the node’s line in `slurm.conf`, and errors in the `slurmd` log. With `--fix`, it performs safe fixes (restarting services, synchronizing time, `scontrol update state=resume` only after all checks pass), keeps a timestamped log of actions, and exits with a code equal to the number of unreachable nodes.

### Variant 15. Computing π on the cluster {#v15}

**1. Initial level.** Create a C++ MPI program that computes $\pi$ as the integral of $4 / (1 + x^{2})$ over $[ 0 ; 1 ]$ with the number of steps from an argument (ranks add every $p$-th rectangle, `MPI_Reduce`) and prints the value, the error, and the time, and an `sbatch` script for 2 nodes with 4 processes each.

**2. Basic level.** Create an `sbatch` script that, in a single allocation of 3 nodes, runs the $\pi$ program for 1, 2, 4, 8, and 12 processes (strong scaling, $2 \cdot 10^{9}$ steps) and for the same process counts with $2 \cdot 10^{8}$ steps per process (weak scaling), performs 5 runs for each case, and prints tables of median times, speedup, and efficiency.

**3. Advanced level.** Create a `piscale` project (a C++ program and scripts) that accepts options `--method rect|simpson|montecarlo`, `--steps <n>`, `--procs 1,2,4,8,12`, `--mode strong|weak|both`, `--repeat <r>`, `--csv <file>`, and `--help`, launches `srun` steps in a single allocation, compares running on one node and on several nodes with the same number of processes, computes the speedup, efficiency, and sequential fraction according to Amdahl’s law (a least-squares estimate), and writes a CSV for a chart.

### Variant 16. Transparent huge pages {#v16}

**1. Initial level.** Create a C++ console program that multiplies two square $n \times n$ matrices ($n$ is an argument, default 2048) with the `i-k-j` loop order and prints the time and the current THP mode from `/sys/kernel/mm/transparent_hugepage/enabled`, and an `sbatch` script that runs it for $n = 1024 , 2048 , 3072$.

**2. Basic level.** Create a C++ program that allocates memory for matrices with `aligned_alloc` (2 MB alignment) and, depending on the argument `huge` or `normal`, calls `madvise(MADV_HUGEPAGE)` or `madvise(MADV_NOHUGEPAGE)`, multiplies the matrices, and prints the time and the `AnonHugePages` value from `/proc/self/smaps_rollup`; and an `sbatch` script that compares both modes for three matrix sizes (median of 3 runs) and prints a table.

**3. Advanced level.** Create a `thpbench` study (a C++ program with OpenMP and scripts) that, for the THP modes `always`, `madvise`, and `never` (changed via `sudo` on a dedicated node, a job with `-w` and `--exclusive`) and the matrix sizes from a list, performs matrix multiplication and random memory accesses, records the time, `AnonHugePages`, and the number of TLB misses (`perf stat`, if available), restores the original mode (`trap`), and builds a report with a recommendation for the cluster nodes.

### Variant 17. Interactive sessions {#v17}

**1. Initial level.** Create a bash script that obtains an allocation `salloc -N2 -n4 -t 10` with a command that prints the job number and the node list, and then, with an `srun` step for each task, the node name, the task number, and the processors it is bound to (`taskset -cp $$`).

**2. Basic level.** Create a bash script that prompts for the number of nodes, tasks, and the session time, validates the input against `sinfo` (no more than the available nodes and CPUs), obtains an allocation with `salloc`, checks the `SLURM_*` variables in it, runs a test `srun` step on all tasks, writes a session log with the time of each command to a file, and after finishing prints the session’s steps and their duration from `sacct`.

**3. Advanced level.** Create an `hpcshell` utility (bash) that accepts options `--nodes <n>`, `--tasks <n>`, `--cpus-per-task <c>`, `--time <min>`, `--partition <partition>`, `--log <file>`, and `--help`, obtains an allocation, starts an interactive shell on the first node (`srun --pty bash`) with a prompt that contains the job number and the remaining time, logs all session commands, warns 5 min before the limit expires (the `--signal` signal), and after exit prints the CPU·h used. `salloc` errors produce code 2.

### Variant 18. Rendering animation frames {#v18}

**1. Initial level.** Create a C++ console program that draws an animation frame (a ball moving in a circle, a 640×480 PPM image) for the frame number given as an argument, and an `sbatch` script with an array `--array=0-59` in which each element creates a file `frame-<number>.ppm`.

**2. Basic level.** Create a Slurm job chain for rendering an animation: an array, each element of which runs a C++ program that draws a frame (a ball moving in a circle, a PPM file) by frame number; the user enters the number of frames and the size in the submission script, which validates them. A check job with an `afterany` condition finds missing or empty frames and prints their numbers, and a job `ffmpeg -framerate 30 -i frame-%03d.ppm` with an `afterok` condition assembles the video (without `ffmpeg`, it prints a message and the number of finished frames).

**3. Advanced level.** Create a `renderfarm` project (a C++ ray tracer for a simple scene with OpenMP, and scripts) that accepts options `--frames <n>`, `--size <w>x<h>`, `--frames-per-task <k>`, `--threads <t>`, `--max-parallel <m>`, `--output <directory>`, and `--help`, re-renders only missing frames, assembles the video, and prints a report: frame rendering time (min, mean, max), CPU·h used, and a time forecast for 4K.

### Variant 19. Lab quota accounting {#v19}

**1. Initial level.** Create a bash script that uses `sacct -X --allusers --parsable2` for the current month to sum `CPUTimeRAW` by account (`Account`) and prints an “account – CPU·h” table.

**2. Basic level.** Create a C# console program that reads a quota file (`account;quota CPU·h`) and a file with `sacct --parsable2` output (the user enters the file names), validates the format of both files, computes the usage, the remainder, and the percentage of the quota for each account, and prints a table marking accounts with usage above 80 % and above 100 %.

**3. Advanced level.** Create a C# console application `quota` that accepts options `--quotas <file>`, `--from`, `--to`, `--warn <percent>`, `--by-user`, and `--help`, builds a report of quota usage for accounts and users, forecasts the date the quota will run out based on average daily usage, and generates `sacctmgr modify account … set GrpTRESMins=cpu=…` commands for accounts that exceeded their quota (it only prints them, it does not run them). Code 3 means some quota is exceeded.

### Variant 20. Distributed word count {#v20}

**1. Initial level.** Create an `sbatch` script with an array of 4 elements (the map stage), each of which counts the words in its text file `part-<number>.txt` (`tr`, `sort`, `uniq -c`) and writes the result to `counts-<number>.txt`.

**2. Basic level.** Create a Slurm map → reduce job chain for word counting: a map array of $k$ elements (the number of files in a user-specified directory), each of which counts the words of its file (`tr`, `sort`, `uniq -c`), a reduce job with an `afterok` condition that merges the partial dictionaries (`awk`), and a submission script that checks the directory. The reduce job prints the 20 most frequent words, the total number of words, and the number of distinct words.

**3. Advanced level.** Create a `mapreduce` project (map and reduce programs in C++ or C#, and scripts) that accepts options `--input <directory>`, `--mappers <k>`, `--reducers <r>` (words are distributed among reduce jobs by hash), `--top <n>`, `--stopwords <file>`, and `--help`, builds a “map (array) → reduce (array) → merge” dependency graph, checks that the result matches a sequential count on small data, and prints a report of stage times according to `sacct`.

### Variant 21. Binding tasks to cores {#v21}

**1. Initial level.** Create an `sbatch` script that runs 4 `srun` tasks on one node with the options `--cpu-bind=cores`, `--cpu-bind=threads`, and `--cpu-bind=none` and, for each variant, prints the list of processors for each task from `taskset -cp $$`.

**2. Basic level.** Create an `sbatch` script that runs the MPI program computing $\pi$ (or another program given as an argument) with a number of tasks equal to the number of cores of the node for the variants `--cpu-bind=none`, `cores`, `threads`, `map_cpu:<list>`, and `--hint=nomultithread`, performs 5 runs of each, and prints a table of median times and the spread (min/max) for each variant.

**3. Advanced level.** Create a `bindbench` study (a hybrid MPI + OpenMP C++ program and scripts) that compares Slurm binding (`--cpu-bind`, `--distribution=block|cyclic`) combined with `OMP_PROC_BIND=close|spread` and `OMP_PLACES=cores|threads` for a compute-bound and a memory-bound test, prints the actual binding of each thread (`sched_getcpu`), a timing table, and a recommendation; options `--tests`, `--repeat`, `--csv`, `--help`.

### Variant 22. Backing up results {#v22}

**1. Initial level.** Create an `sbatch` script for a backup job that starts with the condition `afterany:<number>` after a compute job and archives the `results` directory into the file `results-<number>.tar.gz` in the `/home/$USER/backup` directory.

**2. Basic level.** Create a submission script that submits a compute job (the program and its arguments are script parameters) and a backup job with an `afterany` condition. The backup job computes the SHA-256 of each result file (`sha256sum`), creates an archive, verifies it by extracting it into a temporary directory and comparing the checksums, and prints a table of files with their verification status and the state of the compute job (`sacct`).

**3. Advanced level.** Create a `jobbackup` tool (bash) that accepts options `--job <number>` or `--watch <user>` (for each finished job), `--dest <directory>`, `--keep <n>` (number of archives), `--verify`, and `--help`, creates incremental archives of job results with a checksum manifest, verifies them, deletes old archives beyond $n$, and keeps a log. An archive verification error produces code 2, and a missing job produces 1.

### Variant 23. ulimit and memlock limits {#v23}

**1. Initial level.** Create an `sbatch` script that prints on a compute node the process limits (`ulimit -a`), the `memlock` and `nofile` values in an `srun` step, and the limits of the `slurmd` service itself from `/proc/<pid>/limits`.

**2. Basic level.** Create a C++ program that tries to lock a buffer of a given size in memory (`mlock`; from 1 to 4096 MB, an argument) and to open a given number of files, printing at what size or count an error occurred; and an `sbatch` script that runs the program for several sizes in the batch script and in an `srun` step and prints a “limit – expected – actual” table.

**3. Advanced level.** Create a `limitscheck` tool (bash and a C++ program) that compares the `memlock`, `nofile`, `nproc`, and `stack` limits in three contexts: an SSH session on a node, an `sbatch` script, and an `srun` step on each node, explains the differences (the `PropagateResourceLimits` parameter, the files in `/etc/security/limits.d/`, the `LimitMEMLOCK` of the `slurmd` service), and generates a `90-hpc.conf` settings file with recommended values. Options: `--nodes`, `--report <file>`, `--help`.

### Variant 24. A weather model with checkpoints {#v24}

**1. Initial level.** Create a C++ console program that simulates temperature propagation on a 500×500 grid (an explicit scheme), writes a checkpoint to a file every 100 steps, and on startup continues from the last checkpoint if there is one; and an `sbatch` script with a 2 min time limit.

**2. Basic level.** Create a C++ program that simulates temperature propagation on a grid with an explicit scheme and, on the `USR1` signal, writes a checkpoint and exits, and on startup continues from the last checkpoint, and an `sbatch` script with the options `--signal=B:USR1@30` and `--requeue`. A signal handler (`trap`) in the script forwards the signal to the program, after which the script requeues the job (`scontrol requeue $SLURM_JOB_ID`) until the given number of steps is completed, and prints the restart number (`SLURM_RESTART_COUNT`) and the step from which it continued.

**3. Advanced level.** Create a `weathercp` project (a C++ MPI program with a distributed grid, and scripts) that writes consistent checkpoints of all ranks (`MPI_File_write_at_all` or separate files with a manifest), verifies checkpoint integrity on restore (a checksum), supports changing the number of processes between restarts, and assembles a report: the number of restarts, lost time, and the overhead of writing checkpoints. Options: `--steps`, `--checkpoint-every`, `--size`, `--help`.

### Variant 25. Comparing mpirun and srun {#v25}

**1. Initial level.** Create an `sbatch` script that, in a single allocation with 8 tasks, runs the MPI program computing $\pi$ with `srun --mpi=pmix` and with `mpirun`, and prints the execution time of both, measured with the `time` command.

**2. Basic level.** Create an `sbatch` script that measures the launch overhead (an MPI program with minimal work) for 1, 2, 4, 8, and 16 processes with `srun --mpi=pmix` and `mpirun` (with `--use-hwthread-cpus` when there are more processes than cores), 5 times each, and prints a table of medians “processes – srun, s – mpirun, s – difference.”

**3. Advanced level.** Create a `launchbench` study (a C++ MPI program and scripts) that separately measures the launch time (from the command to `MPI_Init`), the `MPI_Init` time, and the shutdown time for `srun` (PMIx) and `mpirun` on one node and on several nodes, checks whether `sacct` accounts for the tasks in each case, and builds a report with a CSV. Options: `--procs`, `--nodes`, `--repeat`, `--help`.

### Variant 26. Forecasting wait times {#v26}

**1. Initial level.** Create a bash script that, from `sacct -X --allusers --parsable2` output for the last week, computes the average and maximum wait time (`Start` – `Submit`) of the jobs in each partition.

**2. Basic level.** Create a C# console program that reads a file with `sacct --parsable2` output (fields `Partition`, `NCPUS`, `Timelimit`, `Submit`, `Start`), groups jobs by partition, size (1, 2–4, 5–16, more than 16 CPUs), and time limit, and prints a table of the median and 90th percentile of the wait for each group, skipping malformed lines.

**3. Advanced level.** Create a C# console application `waitforecast` that accepts options `--history <file>`, `--partition`, `--cpus <n>`, `--time <min>`, and `--help`, builds a wait time forecasting model from the history (similar jobs by size, limit, and time of day, a weighted average), compares the forecast with the actual wait on the last 20 % of the history (mean absolute error), and prints the forecast for a given job along with `squeue --start` for comparison.

### Variant 27. A cluster on virtual machines {#v27}

**1. Initial level.** Create a PowerShell script that creates an internal switch `ClusterNet` in Hyper-V (if it does not exist) and a generation 2 virtual machine with the name, number of processors, and memory given as arguments, with dynamic memory disabled and an ISO image attached.

**2. Basic level.** Create a bash script for preparing a new compute node that takes a name and an IP address, validates their format, writes the Netplan configuration, the node name, and the `/etc/hosts` lines, installs `slurmd`, `munge`, and `nfs-common`, copies `munge.key` and `slurm.conf` from `head`, starts the services, and checks `munge -n | ssh head unmunge`, printing the result of each step.

**3. Advanced level.** Create a `deploycluster` set of scripts (PowerShell for Hyper-V and bash for the nodes) that, from a cluster description file (names, IPs, vCPUs, memory), creates the VMs, configures the nodes after Ubuntu is installed (network, users with identical UIDs, chrony, SSH keys, NFS, MUNGE, Slurm), generates `slurm.conf` from `slurmd -C`, checks the cluster (`sinfo`, `srun -N<n> hostname`), and prints a report. Every step is idempotent (rerunning does not change what is already configured); options `--config`, `--only <stage>`, `--help`.

### Variant 28. Network latency between nodes {#v28}

**1. Initial level.** Create a C++ MPI “ping-pong” program for two ranks that sends an 8-byte message 1000 times and prints the average latency in microseconds, and an `sbatch` script that runs it on two nodes (`--nodes=2 --ntasks-per-node=1`) and on one node.

**2. Basic level.** Create an MPI “ping-pong” program that measures latency and bandwidth for messages from 1 byte to 16 MB (powers of two), and an `sbatch` script that runs it between nodes and on one node and prints a “size – latency, µs – bandwidth, MB/s” table for both cases.

**3. Advanced level.** Create a `netbench` study (a C++ MPI program and scripts) that measures latency, bandwidth, and `MPI_Allreduce` time between all pairs of cluster nodes, checks the interface MTU (`ip link`) and the ability to transfer 9000-byte frames (`ping -M do -s 8972`), builds a matrix of latencies between nodes, flags anomalous pairs, and estimates the network parameters (with the model $t = \alpha + n / \beta$). Options: `--sizes`, `--repeat`, `--csv`, `--help`.

### Variant 29. A comparative node report {#v29}

**1. Initial level.** Create a bash script that submits the same job (a single-threaded $\pi$ test) to each node of a partition using the `-w <node>` option and after completion prints the time on each node.

**2. Basic level.** Create a bash script that gets the node list from `sinfo -N -h -o %N`, submits processor tests (single-threaded and multithreaded) and a memory test (copying a 1 GB array) to each node 3 times, collects the results, and prints a table of nodes with the deviation from the cluster median, marking nodes whose deviation exceeds 10 %.

**3. Advanced level.** Create a `nodeaudit` tool (scripts and a C++ test program with OpenMP) that regularly tests the nodes (the `--schedule` option generates jobs with `--begin`), stores a history of results in CSV, detects anomalies (a deviation from the historical median above a threshold), and suggests a command to put the node into `DRAIN` with a reason. Options: `--nodes`, `--threshold`, `--history <file>`, `--help`; code 3 means anomalous nodes were found.

### Variant 30. A shared project folder {#v30}

**1. Initial level.** Create a bash script for the administrator that creates a group `proj` with the same GID on all nodes (`pdsh`) and a directory `/home/proj` owned by `root:proj` with permissions `2770`, and checks the permissions with `ls -ld` on each node.

**2. Basic level.** Create an `sbatch` script with an array of 6 elements on different nodes, each of which writes a file with the element number and the node name to the shared project directory, appends a line to a shared log with `flock` locking, and checks the group of the created file; a job with an `afterok` condition checks that all files and log lines are in place and have the `proj` group.

**3. Advanced level.** Create a `projshare` tool (bash) that accepts options `--create <project>`, `--add-user <user>`, `--check`, `--quota <GB>`, and `--help`, creates a group and a directory on the NFS server, adds users on all nodes with the same GIDs, runs test write jobs from several nodes at once, measures the NFS write speed (MB/s), and checks access permissions for outside users. Code 2 means the permission check failed.

## Procedure

1. Study the theory and worked examples.
2. Create four Hyper-V VMs (`head`, `node01`–`node03`), install Ubuntu Server 26.04, configure static addresses, `/etc/hosts`, identical users, chrony, and SSH key-based login, and check the nodes with the `check-nodes.sh` script.
3. Configure NFS for `/home`, install MUNGE and Slurm, copy `munge.key`, write `slurm.conf` and `cgroup.conf` from the `slurmd -C` output, start the services, and check `sinfo` and `srun -N3 hostname`.
4. Complete the task for your variant: keep the `sbatch` scripts, programs, and reports in a repository; for time measurements, use a warmup, the median of at least 5 runs, a table, and a chart.
5. For OS tuning tasks, record the parameter values before and after the change and the measurement results; on a VM where a parameter is unavailable, explain why.
6. Demonstrate the cluster and the results, explain the scripts and the output of `squeue`, `sacct`, and `sinfo`, and answer the review questions. After the defense, shut down the VMs or create checkpoints.
