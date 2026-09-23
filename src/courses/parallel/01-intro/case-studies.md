---
title: "Examples and common mistakes"
description: "Topic 1. Fundamentals of parallel computing: Examples and common mistakes"
outline: [2, 3]
sourceHash: "54bf62921e269958e0e43775495c28391c4011a1a735130c948d074d3567f3cf"
---

# Examples and common mistakes

## Program examples

All results shown were obtained on a computer with an Intel Core i9-11900KF processor (8 cores, 16 logical processors) in Release configuration. Timings will differ on another computer, but the relationships between the values remain the same.

### System information

The program prints information about the operating system, .NET runtime, number of logical processors, available memory, and timer. Include a report like this with any measurement results.

```cs
using System.Diagnostics;
using System.Runtime;
using System.Runtime.InteropServices;

Console.OutputEncoding = System.Text.Encoding.UTF8;

GCMemoryInfo memory = GC.GetGCMemoryInfo();
double gb = memory.TotalAvailableMemoryBytes / Math.Pow(1024, 3);

Print("Operating system", RuntimeInformation.OSDescription);
Print("OS architecture", RuntimeInformation.OSArchitecture);
Print("Process architecture", RuntimeInformation.ProcessArchitecture);
Print("64-bit process", Environment.Is64BitProcess);
Print(".NET runtime", RuntimeInformation.FrameworkDescription);
Print("Runtime identifier", RuntimeInformation.RuntimeIdentifier);
Print("Logical processors", Environment.ProcessorCount);
Print("Available memory, GB", $"{gb:F1}");
Print("Server garbage collector", GCSettings.IsServerGC);
Print("High-resolution timer", Stopwatch.IsHighResolution);
Print("Stopwatch ticks per 1 s", $"{Stopwatch.Frequency:N0}");

#if DEBUG
Print("Configuration", "Debug");
#else
Print("Configuration", "Release");
#endif

static void Print(string name, object value) =>
    Console.WriteLine($"{name,-26}{value}");
```

The `RuntimeInformation` class describes the platform, `Environment.ProcessorCount` gives the number of logical processors available to the process, and `GC.GetGCMemoryInfo` reports the memory visible to the garbage collector. The `#if DEBUG` directive lets you verify that measurements use Release configuration. Output:

```
Operating system          Microsoft Windows 10.0.26200
OS architecture           X64
Process architecture      X64
64-bit process            True
.NET runtime              .NET 10.0.12
Runtime identifier        win-x64
Logical processors        16
Available memory, GB      63,8
Server garbage collector  False
High-resolution timer     True
Stopwatch ticks per 1 s   10 000 000
Configuration             Release
```

### Amdahl calculator

The program takes the parallel code fraction $f$ (`0,9` or `90%`) as a command-line argument and prints a speedup and efficiency table for $p = 1 , 2 , 4 , \dots , 64$.

```cs
using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// The parallel code fraction f is passed as an argument: 0,9 or 90%.
double f = args.Length > 0 ? ParseFraction(args[0]) : 0.9;
if (double.IsNaN(f))
{
    Console.Error.WriteLine("Fraction f: from 0 to 1 or 0–100%.");
    return 1;
}

Console.WriteLine($"Parallel code fraction f = {f:P0}");
Console.WriteLine($"{"p",4} {"S(p)",8} {"E(p)",8}");
for (int p = 1; p <= 64; p *= 2)
{
    double speedup = Amdahl(f, p);
    double efficiency = speedup / p;
    Console.WriteLine($"{p,4} {speedup,8:F2} {efficiency,8:P0}");
}

string limit = f < 1 ? $"{1 / (1 - f):F1}" : "∞";
Console.WriteLine($"Speedup limit 1/(1 - f) = {limit}");
return 0;

// Amdahl’s law: S = 1 / ((1 - f) + f / p).
static double Amdahl(double f, int p) => 1 / ((1 - f) + f / p);

static double ParseFraction(string text)
{
    bool percent = text.EndsWith('%');
    string number = text.TrimEnd('%').Replace(',', '.');
    if (!double.TryParse(number, NumberStyles.Float,
            CultureInfo.InvariantCulture, out double value))
    {
        return double.NaN;
    }
    if (percent) value /= 100;
    return value is >= 0 and <= 1 ? value : double.NaN;
}
```

The `ParseFraction` method accepts a decimal comma or point and a percent sign, and represents an invalid value as `double.NaN`; the program then writes a message to standard error and returns exit code 1. The `P0` format displays the fraction as a percentage. Output when run without arguments ($f = 0 {,} 9$):

```
Parallel code fraction f = 90%
   p     S(p)     E(p)
   1     1,00     100%
   2     1,82      91%
   4     3,08      77%
   8     4,71      59%
  16     6,40      40%
  32     7,80      24%
  64     8,77      14%
Speedup limit 1/(1 - f) = 10,0
```

### Measuring time correctly

The program computes the harmonic sum $H_{n} = 1 + 1 / 2 + \dots + 1 / n$ for $n = 2 \cdot 10^{8}$, times the first run separately, performs warmup and a series of 10 measurements, and reports the minimum, median, maximum, and relative standard deviation.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int N = 200_000_000;
const int Runs = 10;

// The first (“cold”) run includes JIT compilation.
Stopwatch sw = Stopwatch.StartNew();
double sum = HarmonicSum(N);
sw.Stop();
double first = sw.Elapsed.TotalMilliseconds;
Console.WriteLine($"H(n) = {sum:F6}");
Console.WriteLine($"First run: {first:F1} ms");

// Warmup, then a series of measurements.
for (int i = 0; i < 3; i++) HarmonicSum(N);

double[] times = new double[Runs];
for (int i = 0; i < Runs; i++)
{
    long start = Stopwatch.GetTimestamp();
    HarmonicSum(N);
    times[i] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
}

Array.Sort(times);
double median = (times[Runs / 2 - 1] + times[Runs / 2]) / 2;
double mean = times.Average();
double sd = Math.Sqrt(times.Sum(t => (t - mean) * (t - mean))
                      / (Runs - 1));
Console.WriteLine($"Runs: {Runs}");
Console.WriteLine($"Minimum:  {times[0],8:F1} ms");
Console.WriteLine($"Median:   {median,8:F1} ms");
Console.WriteLine($"Maximum:  {times[^1],8:F1} ms");
Console.WriteLine($"Deviation: {sd / mean,6:P1}");

static double HarmonicSum(int n)
{
    double sum = 0;
    for (int k = 1; k <= n; k++)
    {
        sum += 1.0 / k;
    }
    return sum;
}
```

For an even number of runs, the median is the mean of the two central values in the sorted array. Output in Release configuration:

```
H(n) = 19,691044
First run: 163,4 ms
Runs: 10
Minimum:     159,1 ms
Median:      160,3 ms
Maximum:     161,8 ms
Deviation:   0,6%
```

The same code in Debug configuration:

```
H(n) = 19,691044
First run: 367,0 ms
Runs: 10
Minimum:     360,3 ms
Median:      362,1 ms
Maximum:     365,1 ms
Deviation:   0,4%
```

The unoptimized Debug code runs more than twice as slowly, so you cannot compare timings from different configurations. A short loop without calls to other methods is optimized quickly, so the first run differs only slightly here; the difference is more noticeable in programs with many methods.

### The Karp–Flatt metric

The program computes $\pi$ as the integral $\int_{0}^{1} 4 / (1 + x^{2}) \mathrm{d} x$ using the midpoint rule. The interval is divided into $p$ parts computed simultaneously; here, `Parallel.For` only distributes the parts among threads (covered in detail in Topic 6). For each $p$, the program prints the median time, speedup, efficiency, and Karp–Flatt metric.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const long Steps = 400_000_000;
int maxThreads = Environment.ProcessorCount;

ComputePi(Steps, 1);                        // warmup
double t1 = MedianTime(() => ComputePi(Steps, 1));
Console.WriteLine($"π ≈ {ComputePi(Steps, 1):F10}");
Console.WriteLine($"{"p",3} {"Tp, ms",9} {"S",6} {"E",6} {"e",7}");
for (int p = 1; p <= maxThreads; p *= 2)
{
    double tp = p == 1 ? t1 : MedianTime(() => ComputePi(Steps, p));
    double s = t1 / tp;
    string e = p == 1 ? "–" : $"{KarpFlatt(s, p):F3}";
    Console.WriteLine($"{p,3} {tp,9:F1} {s,6:F2} {s / p,6:P0} {e,7}");
}

// Karp–Flatt metric: e = (1/S - 1/p) / (1 - 1/p).
static double KarpFlatt(double s, int p) =>
    (1 / s - 1.0 / p) / (1 - 1.0 / p);

// π as the integral of 4/(1 + x²) over [0; 1] using the midpoint rule.
// The interval is divided into p parts, each handled by a separate thread
// (Parallel.For is covered in detail in Topic 6).
static double ComputePi(long steps, int p)
{
    double h = 1.0 / steps;
    double[] parts = new double[p];
    Parallel.For(0, p,
        new ParallelOptions { MaxDegreeOfParallelism = p },
        part =>
        {
            long from = steps / p * part;
            long to = part == p - 1 ? steps : from + steps / p;
            double sum = 0;
            for (long i = from; i < to; i++)
            {
                double x = (i + 0.5) * h;
                sum += 4 / (1 + x * x);
            }
            parts[part] = sum;
        });
    return parts.Sum() * h;
}

static double MedianTime(Action action)
{
    double[] times = new double[5];
    for (int i = 0; i < times.Length; i++)
    {
        long start = Stopwatch.GetTimestamp();
        action();
        times[i] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    }
    Array.Sort(times);
    return times[times.Length / 2];
}
```

Each part accumulates its sum in the local variable `sum` and writes the result to the shared `parts` array only once, so the threads do not interfere with one another. Output:

```
π ≈ 3,1415926536
  p    Tp, ms      S      E       e
  1     327,1   1,00   100%       –
  2     164,0   1,99   100%   0,003
  4      87,6   3,74    93%   0,024
  8      63,0   5,20    65%   0,077
 16      48,8   6,70    42%   0,093
```

With two and four threads, speedup is almost linear and the Karp–Flatt metric is small: the problem parallelizes well. Starting at eight threads, $e$ increases, meaning that overhead and competition for resources, rather than sequential code, now limit speedup. With 16 threads, speedup is only 6.7: there are 16 logical processors but only 8 physical cores, and the two threads on each core share its execution units.

## Common mistakes

Table 1.3. Common mistakes when evaluating parallel programs {.caption}

| **Problem** | **Cause and solution** |
| --- | --- |
| the parallel program is slower than the sequential one | parallel parts are too small and overhead outweighs the gain; increase the work in each part |
| the first measurement takes an implausibly long time | JIT compilation and initialization; warm up and exclude the first run |
| speedup is much lower than expected | measurements use Debug configuration; switch to Release |
| results vary widely between runs | background programs, power saving, a single run; close programs, enable *Best performance* mode, and take the median of several runs |
| speedup stops increasing beyond 8 threads on 16 logical processors | SMT logical processors share physical cores; compare against the physical core count |
| speedup exceeds 1/(1 − f) | the fraction $f$ was determined incorrectly or the sequential version is slow; measure $T_{1}$ for the best sequential algorithm |
| time is measured with `DateTime.Now` | the system clock is not intended for intervals; use `Stopwatch` |
| `Environment.ProcessorCount` is treated as the core count | it returns the logical processor count; check physical cores in Task Manager or with `lscpu` |
