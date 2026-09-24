---
title: "Practice"
description: "Topic 13. Clusters and the Slurm scheduler: worked examples"
outline: [2, 3]
sourceHash: "170fb6cef431bc6dfb71f55b76afeb62a64a938e1dbf4c7e8fb0585d19164d78"
---

# Practice

## Example 1. A hybrid MPI + OpenMP job

Create a hybrid program that counts the primes up to $N = 2 \cdot 10^{7}$: MPI processes divide the range into blocks of 100,000 numbers in turn, and OpenMP threads inside a process check the numbers of a block with dynamic scheduling (the cost of a check varies). With the `verbose` argument, each rank prints its number of threads, the number of CPUs available to it, and its node. Write a job script for three nodes (two ranks with two threads each per node), and compare “processes × threads” layouts from 1 × 16 to 16 × 1 on a single node with 16 CPUs.

```cpp
// Hybrid MPI + OpenMP program: the number of primes up to N.
// MPI processes divide the range into blocks in turn, OpenMP threads
// inside a process – dynamically (numbers differ in cost).
#include <mpi.h>
#include <omp.h>
#include <sched.h>
#include <unistd.h>
#include <cstdlib>
#include <print>

bool IsPrime(long long n)
{
    if (n < 2) return false;
    for (long long d = 2; d * d <= n; ++d)
        if (n % d == 0) return false;
    return true;
}

int main(int argc, char* argv[])
{
    int provided;
    MPI_Init_thread(&argc, &argv, MPI_THREAD_FUNNELED, &provided);
    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);
    const long long n = argc > 1 ? std::atoll(argv[1]) : 20'000'000;
    const long long block = 100'000;

    // Placement: node, threads, and CPUs available to the process.
    char host[64];
    gethostname(host, sizeof host);
    cpu_set_t set;
    sched_getaffinity(0, sizeof set, &set);
    if (argc > 2)
        std::println("rank {:>2}: {} threads, {} CPUs, node {}", rank,
                     omp_get_max_threads(), CPU_COUNT(&set), host);

    MPI_Barrier(MPI_COMM_WORLD);
    double start = MPI_Wtime();
    long long local = 0;
    for (long long lo = rank * block; lo < n; lo += size * block)
    {
        long long hi = lo + block < n ? lo + block : n;
        #pragma omp parallel for schedule(dynamic, 1000) \
            reduction(+:local)
        for (long long k = lo; k < hi; ++k)
            if (IsPrime(k)) ++local;
    }
    long long total = 0;
    MPI_Reduce(&local, &total, 1, MPI_LONG_LONG, MPI_SUM, 0,
               MPI_COMM_WORLD);
    double time = MPI_Wtime() - start;
    if (rank == 0)
        std::println("{:>2} x {:>2}: primes {}, time {:.3f} s", size,
                     omp_get_max_threads(), total, time);
    MPI_Finalize();
}
```

`MPI_Init_thread` with the `MPI_THREAD_FUNNELED` level tells the MPI library that the process runs threads but only the main thread calls MPI functions. Blocks are distributed in turn (rank $r$ takes blocks $r , r + p , r + 2 p , \dots$), so the “expensive” large numbers are shared equally among all ranks. The `sched_getaffinity` function returns the set of processors the process is allowed to run on: this shows whether Slurm has bound the task to the CPUs allocated to it. The program is built on the `head` node:

```bash
mpicxx -std=c++23 -O2 -fopenmp hybrid.cpp -o hybrid
```

The job script for the cluster: 3 nodes, 2 ranks per node, 2 CPUs per rank, and the number of OpenMP threads equals `SLURM_CPUS_PER_TASK`:

```bash
#!/bin/bash
#SBATCH --job-name=hybrid
#SBATCH --nodes=3
#SBATCH --ntasks-per-node=2
#SBATCH --cpus-per-task=2
#SBATCH --mem-per-cpu=500M
#SBATCH --time=00:10:00
#SBATCH --output=hybrid-%j.out

# OpenMP threads = CPUs allocated to each task (MPI rank).
export OMP_NUM_THREADS=$SLURM_CPUS_PER_TASK
echo "Nodes: $SLURM_JOB_NODELIST; ranks: $SLURM_NTASKS," \
     "threads per rank: $OMP_NUM_THREADS"
srun --mpi=pmix ./hybrid 20000000 verbose
```

Output on the container-based test cluster (the time is not representative: all the “nodes” shared the PC’s four processors):

```
Nodes: node[01-03]; ranks: 6, threads per rank: 2
rank  3: 2 threads, 2 CPUs, node node02
rank  5: 2 threads, 2 CPUs, node node03
rank  0: 2 threads, 2 CPUs, node node01
 6 x  2: primes 1270607, time 4.296 s
rank  2: 2 threads, 2 CPUs, node node02
rank  1: 2 threads, 2 CPUs, node node01
rank  4: 2 threads, 2 CPUs, node node03
```

Each rank sees exactly 2 CPUs: `srun` in the script inherited `--cpus-per-task=2`, and `task/cgroup` and `task/affinity` confined the task to the allocated processors. The number of primes up to $2 \cdot 10^{7}$ (1,270,607) matches the sequential version.

**Comparing layouts.** On a single node with 16 CPUs (WSL on the lab PC), a script in a single `--exclusive` allocation launches steps with different layouts, with a warmup and 5 measurements for each:

```bash
#!/bin/bash
#SBATCH --job-name=hybrid-scan
#SBATCH --nodes=1
#SBATCH --exclusive
#SBATCH --time=00:20:00
#SBATCH --output=scan-%j.out

# All "processes x threads" layouts on the 16 CPUs of one node.
N=${1:-20000000}
for layout in "1 1" "1 16" "2 8" "4 4" "8 2" "16 1" "8 1" "4 2"; do
    set -- $layout
    export OMP_NUM_THREADS=$2
    for run in 1 2 3 4 5 6; do          # run 1 is the warmup
        srun --mpi=pmix -n $1 -c $2 ./hybrid $N
    done
done
```

Median times for each layout (the number of primes in all runs is 1,270,607):

```
layout     CPU  time, s      S
  1 x  1     1   10.083   1.00
  1 x 16    16    1.759   5.73
  2 x  8    16    1.444   6.98
  4 x  4    16    1.367   7.38
  8 x  2    16    1.338   7.54
 16 x  1    16    1.335   7.55
  8 x  1     8    1.883   5.35
  4 x  2     8    1.795   5.62
```

The table was compiled from the `scan-<number>.out` file (48 lines of program output). In a repeat series a few minutes later, the 1 × 16 layout gave 2.639 s, and the other layouts were within 6 % of the values shown. Conclusions:

- the slowest layout is one process with 16 threads: each block of 100,000 numbers ends with the implicit barrier of the parallel loop, and at the end of a block some threads wait for the slowest one; with several ranks, the blocks of different ranks are processed independently, and the idle times overlap;
- the 4 × 4, 8 × 2, and 16 × 1 layouts give almost the same time: on a single node, communication between ranks (one `MPI_Reduce` call) costs nothing;
- 16 CPUs instead of 8 (SMT logical processors) speed up the program only 1.4 times.

On a multi-node cluster, a hybrid layout reduces the number of MPI processes and messages between nodes, so its advantage shows in programs with intensive communication (Topic 12), while for this problem the difference between layouts will remain small.

## Example 2. A job chain: prepare → compute → report

Build a pipeline of three dependent jobs. The `prepare` job generates 4 files of 250,000 temperature measurements each (CSV, an `awk` generator seeded with the file number). A `compute` array of 4 elements computes the count, mean, minimum, and maximum for its file, and the `report` job builds a summary table. Each subsequent job starts only after the previous one finishes **successfully**. The argument of the submission script is the number of a file that `prepare` skips: this is how the chain’s behavior on failure is tested.

```bash
#!/bin/bash
#SBATCH --job-name=prepare
#SBATCH --ntasks=1
#SBATCH --time=00:02:00
#SBATCH --output=logs/%x-%j.out

# Stage 1: 4 files of 250,000 temperature measurements (seed = number).
# Argument – the number of the part to skip (simulated failure).
SKIP=${1:-0}
mkdir -p data
rm -f data/part-*.csv results/part-*.txt
for part in 1 2 3 4; do
    [ "$part" = "$SKIP" ] && continue
    awk -v seed=$part 'BEGIN {
        srand(seed)
        for (i = 0; i < 250000; i++)
            printf "%d,%.2f\n", seed, 20 + 5 * (rand() + rand() - 1)
    }' > data/part-$part.csv
done
wc -l data/*.csv
```

```bash
#!/bin/bash
#SBATCH --job-name=compute
#SBATCH --array=1-4
#SBATCH --ntasks=1
#SBATCH --time=00:02:00
#SBATCH --output=logs/%x-%A_%a.out

# Stage 2: statistics of one part (array element = file number).
PART=$SLURM_ARRAY_TASK_ID
FILE=data/part-$PART.csv
if [ ! -s "$FILE" ]; then
    echo "No file $FILE" >&2
    exit 2
fi
mkdir -p results
awk -F, -v part=$PART '
    NR == 1 { min = max = $2 }
    { sum += $2; if ($2 < min) min = $2; if ($2 > max) max = $2 }
    END { printf "%d %d %.3f %.2f %.2f\n", part, NR, sum / NR,
                 min, max }' "$FILE" > results/part-$PART.txt
echo "Part $PART processed on $(hostname)"
```

```bash
#!/bin/bash
#SBATCH --job-name=report
#SBATCH --ntasks=1
#SBATCH --time=00:02:00
#SBATCH --output=logs/%x-%j.out

# Stage 3: a summary table from the results of all parts.
echo "part            N      mean     min     max"
sort -n results/part-*.txt | awk '
    { printf "%-8s %8d %9.3f %7.2f %7.2f\n", $1, $2, $3, $4, $5
      n += $2; s += $2 * $3 }
    END { printf "total    %8d %9.3f\n", n, s / n }'
```

The `submit.sh` script submits the three jobs with `afterok` conditions and shows the queue. The `--parsable` option makes `sbatch` print only the job number, and `set -e` stops the script if `sbatch` reports an error:

```bash
#!/bin/bash
# Job chain: prepare -> compute (array) -> report.
set -e
mkdir -p logs
prep=$(sbatch --parsable prepare.sbatch "$@")
comp=$(sbatch --parsable --dependency=afterok:$prep compute.sbatch)
rep=$(sbatch --parsable --dependency=afterok:$comp report.sbatch)
echo "prepare=$prep compute=$comp report=$rep"
squeue -u "$USER" -o "%.8i %.8j %.25E %R"
```

The `logs` directory is created before submission, because Slurm opens output files even before the script starts. Output on the test cluster (user `ivan`): the `DEPENDENCY` column (`%E`) shows unmet conditions, and for an array the condition applies to all elements (`88_*`):

```
$ ./submit.sh
prepare=87 compute=88 report=89
   JOBID     NAME                DEPENDENCY NODELIST(REASON)
      89   report afterok:88_*(unfulfilled) (Dependency)
88_[1-4]  compute   afterok:87(unfulfilled) (None)
      87  prepare                    (null) (None)
$ cat logs/compute-88_2.out
Part 2 processed on node01
$ cat logs/report-89.out
part            N      mean     min     max
1          250000    19.994   15.02   24.98
2          250000    20.006   15.02   24.99
3          250000    19.998   15.01   24.98
4          250000    19.997   15.01   24.99
total     1000000    19.999
```

The mean of each file is close to 20 °C, and the extreme values are close to 15 and 25 °C, as expected for the sum of two uniform random variables. A run with a failure (file 3 is not created):

```
$ ./submit.sh 3
prepare=93 compute=94 report=95
   JOBID     NAME                DEPENDENCY NODELIST(REASON)
      95   report afterok:94_*(unfulfilled) (Dependency)
94_[1-4]  compute   afterok:93(unfulfilled) (None)
      93  prepare                    (null) (None)
$ squeue -u ivan -o "%.8i %.8j %.25E %R"
   JOBID     NAME                DEPENDENCY NODELIST(REASON)
      95   report      afterok:94_*(failed) (DependencyNeverSatisfied)
$ cat logs/compute-94_3.out
No file data/part-3.csv
$ sacct -X -j 93,94,95 -o JobID,JobName,State,ExitCode
JobID           JobName      State ExitCode
------------ ---------- ---------- --------
93              prepare  COMPLETED      0:0
95               report    PENDING      0:0
94_1            compute  COMPLETED      0:0
94_2            compute  COMPLETED      0:0
94_3            compute     FAILED      2:0
94_4            compute  COMPLETED      0:0
```

Element `94_3` finished with code 2, so the `afterok` condition for `report` can no longer be met: the job stays in the queue forever with the reason `DependencyNeverSatisfied`, and it is cancelled with `scancel 95`. To build the report even from partial results, `afterany` is specified for it, and to have Slurm cancel such jobs automatically, `--kill-on-invalid-dep=yes`.

## Example 3. A cluster usage report from sacct data

Create a C# console program (.NET 10) that reads `sacct --parsable2` output from a file given as an argument (without an argument, it runs `sacct` itself) and prints, for each “user – account” pair, the number of jobs, the share of successful ones, the average number of CPUs per job, the CPU time used in hours, and the average queue wait, as well as the number of jobs in each state. Step lines (`123.batch`, `123.0`) are not counted.

The project is created with `dotnet new console -n SacctReport` (or in Rider), and the contents of `Program.cs` are replaced:

```cs
// Cluster usage report from sacct --parsable2 output.
// Usage: SacctReport <file> or SacctReport (runs sacct).
using System.Diagnostics;
using System.Globalization;

const string Fields = "JobID,User,Account,State,AllocCPUS," +
                      "ElapsedRaw,CPUTimeRAW,Submit,Start";

string[] lines = args.Length > 0
    ? File.ReadAllLines(args[0])
    : RunSacct($"--allusers --parsable2 --format={Fields}");

// The first line is the header: field indices by name.
string[] header = lines[0].Split('|');
int Col(string name) => Array.IndexOf(header, name);
int id = Col("JobID"), user = Col("User"), acc = Col("Account"),
    state = Col("State"), cpus = Col("AllocCPUS"),
    cpuTime = Col("CPUTimeRAW"), submit = Col("Submit"),
    start = Col("Start");

// Jobs only: step lines (123.batch, 123.0) contain a dot.
var jobs = lines.Skip(1)
    .Select(l => l.Split('|'))
    .Where(f => f.Length == header.Length && !f[id].Contains('.'))
    .Select(f => new Job(f[user], f[acc], f[state].Split(' ')[0],
        int.Parse(f[cpus]), long.Parse(f[cpuTime]),
        Wait(f[submit], f[start])))
    .ToList();

Console.WriteLine($"Jobs: {jobs.Count}");
Console.WriteLine($"{"User",-11}{"Account",-9}{"Jobs",6}" +
    $"{"OK",9}{"CPUs",7}{"CPU·h",9}{"Wait, s",9}");
foreach (var g in jobs.GroupBy(j => (j.User, j.Account))
                      .OrderByDescending(g => g.Sum(j => j.CpuSec)))
{
    double ok = 100.0 * g.Count(j => j.State == "COMPLETED")
                / g.Count();
    Console.WriteLine($"{g.Key.User,-11}{g.Key.Account,-9}" +
        $"{g.Count(),6}{ok,8:F0}%{g.Average(j => j.Cpus),7:F1}" +
        $"{g.Sum(j => j.CpuSec) / 3600.0,9:F3}" +
        $"{g.Average(j => j.WaitSec),9:F1}");
}
Console.WriteLine($"{"Total",-20}{jobs.Count,6}{"",16}" +
                  $"{jobs.Sum(j => j.CpuSec) / 3600.0,9:F3}");

Console.WriteLine("Job states:");
foreach (var s in jobs.GroupBy(j => j.State).OrderBy(s => s.Key))
    Console.WriteLine($"  {s.Key,-14}{s.Count(),4}");

// Queue wait: Start – Submit (for PENDING, Start = Unknown).
static double Wait(string submit, string start) =>
    DateTime.TryParse(start, CultureInfo.InvariantCulture, out var b)
    && DateTime.TryParse(submit, CultureInfo.InvariantCulture,
                         out var a) ? (b - a).TotalSeconds : 0;

static string[] RunSacct(string arguments)
{
    var psi = new ProcessStartInfo("sacct", arguments)
    {
        RedirectStandardOutput = true
    };
    using var p = Process.Start(psi)!;
    string text = p.StandardOutput.ReadToEnd();
    p.WaitForExit();
    return text.Split('\n', StringSplitOptions.RemoveEmptyEntries);
}

record Job(string User, string Account, string State, int Cpus,
           long CpuSec, double WaitSec);
```

Column indices are looked up by name from the header, so the order of fields in `--format` can be arbitrary. A state such as `CANCELLED by 2001` is shortened to its first word, and the string `Unknown` in the `Start` field (the job is still waiting) does not parse as a date, so the wait is taken as zero. On the `head` node with the .NET SDK (`dotnet-sdk-10.0`), the program runs `sacct` itself; on Windows, it is given a file saved on the cluster:

```bash
sacct --allusers --parsable2 -S 2026-09-18T19:00 -E 2026-09-18T19:50 \
  --format=JobID,User,Account,State,AllocCPUS,ElapsedRaw,CPUTimeRAW,\
Submit,Start > sacct.txt
head -3 sacct.txt
```

```
JobID|User|Account|State|AllocCPUS|ElapsedRaw|CPUTimeRAW|Submit|Start
1|student|lab|COMPLETED|6|1|6|2026-09-18T19:05:56|2026-09-18T19:05:56
1.0||lab|NODE_FAIL|6|1|6|2026-09-18T19:05:56|2026-09-18T19:05:56
```

Output of `dotnet run -c Release -- sacct.txt` for the test cluster’s 50-minute log (all the jobs of this topic; array elements are separate jobs):

```
Jobs: 83
User       Account    Jobs       OK   CPUs    CPU·h  Wait, s
olena      physics       7      43%    4.6    0.681     42.9
student    lab          34      82%    4.1    0.595     14.2
ivan       lab          42      90%    2.1    0.408      4.4
Total                   83                    1.683
Job states:
  CANCELLED        6
  COMPLETED       69
  FAILED           5
  NODE_FAIL        1
  OUT_OF_MEMORY    1
  TIMEOUT          1
```

Numbers are formatted according to the Windows regional settings (with English settings, a decimal point; with Ukrainian ones, a decimal comma). User `olena` submitted the fewest jobs but used the most CPU time: her jobs occupied all three nodes (`big-A`) and had the longest waits. The step line `1.0` with the `NODE_FAIL` state is filtered out, so only job 48 has the `NODE_FAIL` state.
