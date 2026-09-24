---
title: "ILGPU, comparisons, and common mistakes"
description: "Topic 11. GPU computing: ILGPU, comparisons, and common mistakes"
outline: [2, 3]
sourceHash: "3c1ee57b878eb5da4ff892e09f6e8cb23edbbd38376e1677f0bdddb8258df059"
---

# ILGPU, comparisons, and common mistakes

## The ILGPU library for C#

**ILGPU** (<https://ilgpu.net/>) is an open-source library that compiles C# methods just in time (*JIT*) into GPU code. It does not require the CUDA Toolkit (only the driver) and is installed as the `ILGPU` NuGet package (<https://www.nuget.org/packages/ILGPU>; in September 2026 the version is 1.5.3, which works with .NET 10). Key concepts:

- `Context` is the ILGPU environment; `Context.CreateDefault()` finds all devices;
- `Device` describes a device, and `Accelerator` is an opened device: `CudaAccelerator` (NVIDIA), `CLAccelerator` (OpenCL), `CPUAccelerator` (GPU emulation with CPU threads for debugging);
- `MemoryBuffer1D<T, Stride1D.Dense>` is a buffer in device memory (`Allocate1D`, `CopyFromCPU`, `CopyToCPU`, `GetAsArray1D`); `ArrayView<T>` is a “view” of a buffer that is passed to a kernel;
- a kernel is a static method whose first parameter is an index `Index1D`, `Index2D`, or `Index3D`; `accelerator.LoadAutoGroupedStreamKernel<…>(method)` compiles it and returns a delegate, and ILGPU chooses the group (block) size itself;
- a kernel launch is asynchronous: `accelerator.Synchronize()` waits for completion; the `CopyToCPU` and `GetAsArray1D` copies wait for preceding kernels on their own.

**Kernel restrictions** (<https://ilgpu.net/docs/>): only value types (`int`, `float`, structs), no classes, references, `T[]` arrays, or strings; you cannot create objects and arrays (`new`), or use LINQ and exceptions. Math functions come from `Math` and `MathF`, and the `ILGPU.Algorithms` package adds the `XMath` class plus on-device reductions, scans, and sorting.

### Example: SAXPY and image blurring

The program lists the devices, selects the GPU (with the `--cpu` option, the ILGPU CPU accelerator), computes SAXPY for a million numbers, and blurs an image (the mean over a 7×7 square around each pixel) at 4K and 8K resolutions, comparing with a sequential loop and `Parallel.For` (Topic 6). The project is a .NET 10 console application with the `ILGPU` 1.5.3 package (`dotnet add package ILGPU`).

```cs
// ILGPU: device list, SAXPY, and image blurring on the GPU.
// Argument --cpu – the ILGPU CPU accelerator instead of the GPU.
using System.Diagnostics;
using ILGPU;
using ILGPU.Runtime;
using ILGPU.Runtime.CPU;

using Context context = Context.CreateDefault(); // CUDA, OpenCL, CPU
Console.WriteLine("ILGPU devices:");
foreach (Device d in context)
    Console.WriteLine($"  {d.AcceleratorType,-6} {d.Name}" +
        (d.AcceleratorType == AcceleratorType.CPU ? ""
            : $", {d.MemorySize / 1073741824.0:F1} GB"));

Device device = args.Contains("--cpu")
    ? context.GetCPUDevice(0)
    : context.GetPreferredDevice(preferCPU: false);
using Accelerator accelerator = device.CreateAccelerator(context);
Console.WriteLine($"Selected: {accelerator.Name}");

// SAXPY: y = a·x + y for a million elements.
const int N = 1_000_000;
float[] x = Enumerable.Range(0, N).Select(i => (float)i).ToArray();
float[] y = Enumerable.Repeat(1.0f, N).ToArray();
using MemoryBuffer1D<float, Stride1D.Dense> dx =
    accelerator.Allocate1D(x);             // allocate and copy
using MemoryBuffer1D<float, Stride1D.Dense> dy =
    accelerator.Allocate1D(y);
var saxpy = accelerator.LoadAutoGroupedStreamKernel<
    Index1D, float, ArrayView<float>, ArrayView<float>>(Saxpy);
saxpy((int)dx.Length, 2.0f, dx.View, dy.View);  // asynchronous launch
accelerator.Synchronize();                      // wait for the kernel
float[] result = dy.GetAsArray1D();             // copy to the host
Console.WriteLine($"SAXPY: y[0] = {result[0]}, y[{N - 1}] = " +
                  $"{result[N - 1]}");

// Blur: the mean over a (2r + 1)×(2r + 1) square around a pixel.
var blur = accelerator.LoadAutoGroupedStreamKernel<Index2D,
    ArrayView<float>, ArrayView<float>, int, int, int>(Blur);
Console.WriteLine(
    $"{"Size",-10}{"Method",-24}{"Time, ms",9}{"S",7}");
foreach ((int w, int h) in new[] { (3840, 2160), (7680, 4320) })
{
    float[] image = new float[w * h];
    var random = new Random(10);
    for (int i = 0; i < image.Length; i++)
        image[i] = random.NextSingle() * 255;
    float[] cpu = new float[image.Length];

    double seq = Median(() => BlurCpu(image, cpu, w, h, 3, false));
    double par = Median(() => BlurCpu(image, cpu, w, h, 3, true));
    using var src = accelerator.Allocate1D<float>(image.Length);
    using var dst = accelerator.Allocate1D<float>(image.Length);
    float[] gpu = new float[image.Length];
    double kernel = Median(() =>
    {
        blur(new Index2D(w, h), src.View, dst.View, w, h, 3);
        accelerator.Synchronize();
    });
    double total = Median(() =>
    {
        src.CopyFromCPU(image);
        blur(new Index2D(w, h), src.View, dst.View, w, h, 3);
        dst.CopyToCPU(gpu);                     // waits for the kernel
    });
    float diff = 0;
    for (int i = 0; i < gpu.Length; i++)
        diff = Math.Max(diff, Math.Abs(gpu[i] - cpu[i]));

    string size = $"{w}x{h}";
    Row(size, "CPU, sequential", seq, seq);
    Row(size, "CPU, Parallel.For", par, seq);
    Row(size, "ILGPU, kernel only", kernel, seq);
    Row(size, "ILGPU, with copies", total, seq);
    Console.WriteLine($"{"",-10}max difference from CPU: {diff}");
}

static void Row(string size, string name, double ms, double seq) =>
    Console.WriteLine(
        $"{size,-10}{name,-24}{ms,9:F2}{seq / ms,7:F1}");

// Median of 5 measurements after warmup.
static double Median(Action action)
{
    var warm = Stopwatch.StartNew();         // warmup: JIT,
    do action();                             // GPU clocks
    while (warm.ElapsedMilliseconds < 300);
    double[] t = new double[5];
    for (int r = 0; r < t.Length; r++)
    {
        long start = Stopwatch.GetTimestamp();
        action();
        t[r] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    }
    Array.Sort(t);
    return t[2];
}

static void Saxpy(Index1D i, float a, ArrayView<float> x,
                  ArrayView<float> y) => y[i] = a * x[i] + y[i];

// Kernel: thread p = (X, Y) computes one pixel.
static void Blur(Index2D p, ArrayView<float> src,
                 ArrayView<float> dst, int w, int h, int r)
{
    float sum = 0;
    int count = 0;
    for (int yy = Math.Max(p.Y - r, 0);
         yy <= Math.Min(p.Y + r, h - 1); yy++)
        for (int xx = Math.Max(p.X - r, 0);
             xx <= Math.Min(p.X + r, w - 1); xx++)
        {
            sum += src[yy * w + xx];
            count++;
        }
    dst[p.Y * w + p.X] = sum / count;
}

// The same formula on the CPU: sequential or Parallel.For over rows.
static void BlurCpu(float[] src, float[] dst, int w, int h, int r,
                    bool parallel)
{
    void RowBlur(int y)
    {
        for (int x = 0; x < w; x++)
        {
            float sum = 0;
            int count = 0;
            for (int yy = Math.Max(y - r, 0);
                 yy <= Math.Min(y + r, h - 1); yy++)
                for (int xx = Math.Max(x - r, 0);
                     xx <= Math.Min(x + r, w - 1); xx++)
                {
                    sum += src[yy * w + xx];
                    count++;
                }
            dst[y * w + x] = sum / count;
        }
    }
    if (parallel) Parallel.For(0, h, RowBlur);
    else for (int y = 0; y < h; y++) RowBlur(y);
}
```

The GPU blur is written as an ordinary C# method: `Math.Max`, loops, and `ArrayView` indexing are allowed because they create no objects. Warmup lasts 0.3 s: the first call compiles the kernel, and during this time the GPU leaves its power-saving state. Output (Windows 11, Release; Fig. 11.10):

```
ILGPU devices:
  CPU    CPUAccelerator
  Cuda   NVIDIA GeForce RTX 3060, 12.0 GB
Selected: NVIDIA GeForce RTX 3060
SAXPY: y[0] = 1, y[999999] = 1999999
Size      Method                   Time, ms      S
3840x2160 CPU, sequential            294.55    1.0
3840x2160 CPU, Parallel.For           39.54    7.5
3840x2160 ILGPU, kernel only           0.87  340.2
3840x2160 ILGPU, with copies           6.97   42.3
          max difference from CPU: 0
7680x4320 CPU, sequential           1207.24    1.0
7680x4320 CPU, Parallel.For          166.36    7.3
7680x4320 ILGPU, kernel only           3.56  338.7
7680x4320 ILGPU, with copies          26.90   44.9
          max difference from CPU: 0
```

A 7×7 blur requires 49 additions per pixel, so even with copies the GPU is 6 times faster than `Parallel.For` on 16 logical processors. The CPU and GPU results match exactly: the kernel only adds and divides, with no multiplication that the compiler could fuse into an FMA. ILGPU did not show an OpenCL device on the lab PC. With the `--cpu` option, the same program runs on the CPU accelerator (a warp of 4 threads, groups of up to 16 threads): the 4K blur takes 907 ms, three times **longer** than the sequential loop and 22 times longer than `Parallel.For`. The CPU accelerator is intended for debugging kernels (breakpoints in Rider) and as a fallback when there is no NVIDIA GPU, not for speed.

::: info Screenshot
Rider: console project with the ILGPU 1.5.3 package (NuGet tool window or .csproj visible), Run tool window with the device list (CPUAccelerator, NVIDIA GeForce RTX 3060) and the blur timing table
:::

Figure 11.10. ILGPU device list and blur timings in Rider {.caption}

## Comparing CPU and GPU

The time of a GPU program consists of copying to the device, kernel execution, and copying back: $T_{\text{GPU}} = T_{\text{H2D}} + T_{\text{kernel}} + T_{\text{D2H}}$. Even when the kernel is instantaneous, the speedup over the CPU cannot exceed $T_{\text{CPU}} / (T_{\text{H2D}} + T_{\text{D2H}})$. This is Amdahl’s law (Topic 1), in which the “sequential part” is the transfer over PCIe. The measurements from the lecture and the lab are summarized in Table 11.5.

Table 11.5. Comparing the CPU (all cores) and the GPU including copies {.caption}

| **Task** | **CPU, ms** | **kernel, ms** | **GPU total, ms** | **Conclusion** |
| --- | --- | --- | --- | --- |
| grayscale 8K | 6.4 | 0.53 | 12.2 | GPU slower because of copies |
| sum of 64 million numbers | 5.7 | 1.17 | 24.3 | GPU slower because of copies |
| matrix multiplication 2048 | 151 | 16.7 | 21.8 | GPU 7 times faster |
| 7×7 blur, 8K (C#) | 166 | 3.56 | 26.9 | GPU 6 times faster |
| Mandelbrot 4K (C#) | 460 | – | 7.9 | GPU 58 times faster |

The GPU pays off when:

- the data is large (millions of elements), and the computations are independent and uniform (few branches);
- there are many operations per transferred byte (matrices, filters with a large window, iterative methods, Monte Carlo);
- the data stays on the GPU between steps (multi-step simulations, image processing pipelines), so copies are rare.

The CPU is better for small data, for algorithms with many branches and dependencies, for simple operations on data already in host memory, and when `double` precision is required: on the GeForce RTX 3060, `double` operations are 64 times slower than `float`. A fair comparison always uses the best CPU version (all cores, SIMD, thread binding) and includes copy time (Fig. 11.11).

::: info Screenshot
Windows Terminal, Ubuntu-26.04 (WSL2), `export OMP_PLACES=cores OMP_PROC_BIND=spread`, then `./grayscale 7680 4320` and `./matmul 2048`: H2D/kernel/D2H times, CPU OpenMP times and speed-ups
:::

Figure 11.11. Comparing CPU and GPU times {.caption}

## Common mistakes

The most common mistakes in CUDA and ILGPU programs are collected in Table 11.6.

Table 11.6. Common mistakes in GPU programs {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| `nvidia-smi` in WSL does not see the GPU, or `libcuda.so` is not found | a Linux driver or the `cuda`/`cuda-drivers` package is installed in WSL; remove it, keep only the Windows driver and `cuda-toolkit-13-3` |
| `nvcc: command not found` | `/usr/local/cuda/bin` has not been added to `PATH` |
| CMake: `unsupported GNU version` | the GCC version is newer than `nvcc` supports; use GCC 15 for CUDA 13.3 |
| `no kernel image is available for execution on the device` | `CMAKE_CUDA_ARCHITECTURES` does not match the GPU; set `86` or `native` |
| the kernel “does not run,” the result is zero | the launch error was not checked; `cudaGetLastError` after the launch and `CUDA_CHECK` |
| `cudaErrorIllegalAddress` | no bounds check `if (i < n)` or a host pointer in the kernel; `compute-sanitizer` |
| the result is wrong only for some sizes | the number of blocks was not rounded up |
| a kernel with shared memory hangs or produces garbage | `__syncthreads()` in a conditional branch, or the second barrier is missing |
| kernel time of 0.01 ms instead of milliseconds | only the launch was measured; use CUDA events or synchronization |
| the GPU is slower than the CPU | copies dominate computation; keep data on the GPU, use pinned memory and CUDA streams |
| ILGPU: kernel compilation error | a class, a `T[]` array, `new`, or LINQ in the kernel; only `ArrayView` and structs |
