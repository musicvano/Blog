---
title: "Measurement, .NET 10, and Rider"
description: "Topic 1. Fundamentals of parallel computing: Measurement, .NET 10, and Rider"
outline: [2, 3]
sourceHash: "15d6f198f065452084c6835cecf9875e447e19b7e70d48344b35e8f39489605d"
---

# Measurement, .NET 10, and Rider

## Measurement methodology

Execution time is the basis of every metric, so you need to measure it correctly.

**Timer.** In .NET, use the `Stopwatch` class (<https://learn.microsoft.com/dotnet/api/system.diagnostics.stopwatch>) to measure intervals rather than `DateTime.Now`: the system clock can be adjusted during time synchronization and, on some systems, has a resolution of only a few milliseconds. The `Stopwatch.IsHighResolution` property indicates whether a high-resolution hardware timer is being used. To avoid creating an object, use the static methods:

```cs
long start = Stopwatch.GetTimestamp();
DoWork();
TimeSpan elapsed = Stopwatch.GetElapsedTime(start);
Console.WriteLine($"{elapsed.TotalMilliseconds:F1} ms");
```

**Release configuration.** In *Debug* configuration, the compiler does not optimize the code, and the program may run several times more slowly. Take all measurements in *Release* configuration (`dotnet run -c Release`).

**Warmup.** The first time a method is called, the JIT compiler converts intermediate IL code into machine code; *tiered compilation* later reoptimizes “hot” methods. Therefore, run the measured section once without including its time.

**Multiple runs.** Time varies because of other processes, garbage collection, changes in processor frequency, and temperature. Run the section 5–10 times and take the **median**, which is more resistant to individual outliers than the mean; also report the minimum, maximum, or relative standard deviation.

**Environment.** During measurements, close resource-intensive programs, connect your laptop to power, and select the *Best performance* power mode. `Environment.ProcessorCount` returns the number of logical processors; build a speedup table for $p = 1 , 2 , 4 , \dots$ up to this number, remembering that SMT logical processors are not equivalent to physical cores.

### The BenchmarkDotNet library

Use the **BenchmarkDotNet** library (<https://benchmarkdotnet.org/>) for precise comparisons of small code sections. It handles warmup, determines the number of repetitions, runs benchmarks in a separate process, and reports statistics. Add the package with `dotnet add package BenchmarkDotNet`, mark methods with the `[Benchmark]` attribute, and run in Release configuration:

```cs
using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Running;

BenchmarkRunner.Run<HarmonicBenchmarks>();

public class HarmonicBenchmarks
{
    [Params(1_000_000, 10_000_000)]
    public int N;

    [Benchmark(Baseline = true)]
    public double Forward()
    {
        double sum = 0;
        for (int k = 1; k <= N; k++) sum += 1.0 / k;
        return sum;
    }

    [Benchmark]
    public double Backward()
    {
        double sum = 0;
        for (int k = N; k >= 1; k--) sum += 1.0 / k;
        return sum;
    }
}
```

The result is a table with `Mean` (average time), `Error`, `StdDev`, and `Ratio` (relative to the baseline method) columns. This course uses BenchmarkDotNet regularly from Topic 4 onward; for timing entire parallel programs, `Stopwatch` with warmup and a median is sufficient.

## The .NET 10 platform

The practical assignments in Module 1 use C# 14 on **.NET 10** (<https://dotnet.microsoft.com/download/dotnet/10.0>). This is a long-term support (*LTS*) release: it was released on November 11, 2025, and is supported until November 14, 2028. As of September 2026, the current versions are .NET runtime 10.0.12 and SDK 10.0.401.

- The **SDK** (*software development kit*) includes compilers, libraries, and the `dotnet` utility for creating, building, and running programs; developers need it.
- The **runtime** (*runtime*) only runs existing programs; it is included in the SDK.

On Windows, install the SDK using the installer from the website or the command `winget install Microsoft.DotNet.SDK.10`. Module 2 uses Linux, so it is convenient to install **Ubuntu 26.04 LTS** in **WSL2** (*Windows Subsystem for Linux*) immediately using `wsl --install -d Ubuntu-26.04` (<https://learn.microsoft.com/windows/wsl/install>). On Ubuntu 26.04, .NET 10 is available in the standard Ubuntu packages (<https://learn.microsoft.com/dotnet/core/install/linux-ubuntu>):

```bash
sudo apt-get update && sudo apt-get install -y dotnet-sdk-10.0
dotnet --info
```

The `dotnet --info` command prints the SDK version, operating system, runtime identifier (*RID*, such as `win-x64` or `linux-x64`), and installed runtimes (Fig. 1.8). The same .NET program runs on Windows and Linux without changes.

::: info Screenshot
Windows Terminal: `dotnet --info`; top part with SDK 10.0.x, OS, RID, installed runtimes
:::

Figure 1.8. Information about the installed .NET 10 SDK {.caption}

## The JetBrains Rider environment

The C# programs in this course are created in the **JetBrains Rider** integrated development environment (<https://www.jetbrains.com/rider/>), which runs on Windows, Linux, and macOS. Rider is free for noncommercial and educational use.

**Creating a solution.** The *File → New Solution…* command opens the new solution dialog (Fig. 1.9). Choose *Console* from the template list, enter the solution and project names, select a folder, C# as the language, and `net10.0` as the target framework, then click *Create*.

::: info Screenshot
Rider: File → New Solution… → Console; Solution name `Speedup`, Framework `net10.0`, the Create button
:::

Figure 1.9. Creating a console solution in Rider {.caption}

**Debug and Release configurations.** A new solution has two **build configurations** (*build configurations*): *Debug* for debugging and *Release* with code optimization. Select the current configuration from the list on the right side of the toolbar. Start the program with *Run* (**Shift+F10**) or under the debugger with *Debug* (**Shift+F9**); output appears in the *Run* window (Fig. 1.10).

::: info Screenshot
Rider toolbar: configuration drop-down set to Release, `Program.cs` open, Run tool window with the timing table
:::

Figure 1.10. Running in Release configuration {.caption}

**Monitoring.** When you run a program, Rider automatically opens the *Monitoring* window (<https://www.jetbrains.com/help/rider/Program-Monitoring.html>) with CPU usage, memory, and garbage collection charts (Fig. 1.11). It helps you see whether a parallel program actually uses all the cores. On Windows, this window also detects performance problems and lets you open the dotTrace profiler.

::: info Screenshot
Rider: run the program → Monitoring tool window; CPU and memory charts during the calculation
:::

Figure 1.11. Monitoring CPU and memory during execution {.caption}

Table 1.2 lists the software used throughout the course.

Table 1.2. Course software {.caption}

| **Module** | **Languages, technologies, and tools** |
| --- | --- |
| 1. Shared memory, C# | .NET 10, C# 14, JetBrains Rider; threads, synchronization, TPL, PLINQ, channels, SIMD |
| 2. HPC, C++ | GCC, CMake, Ninja, JetBrains CLion; std::thread, OpenMP, CUDA, ILGPU, Open MPI; Ubuntu 26.04, Slurm |
| 3. Distributed systems | sockets, gRPC, CoreWCF, RabbitMQ, Microsoft Orleans, Docker, Kubernetes, Aspire, OpenTelemetry |
