---
title: "Practice"
description: "Topic 11. GPU computing: worked examples"
outline: [2, 3]
sourceHash: "a93017fbb82f283db8c0170a0794dd16f36b3cb7acff12f0784e81bf5cdf2b0e"
---

# Practice

Examples 1 and 2 use the `common.cuh` header from the lecture and are built by the lecture’s CMake project: add the names `reduce` and `histogram` to the `foreach` list. Run the programs in Ubuntu under WSL2 with `export OMP_PLACES=cores OMP_PROC_BIND=spread` and `./build/reduce`.

## Example 1. Parallel sum reduction

Sum an array of $2^{26}$ random integers from 0 to 99 (generator with seed 26) on the GPU with two shared-memory reduction kernels: interleaved addressing and sequential addressing. Compare the kernel times with OpenMP and the Thrust library, compute the effective bandwidth (GB/s), and verify the sum.

```cpp
// reduce.cu – parallel sum reduction on the GPU: interleaved
// addressing and sequential addressing; comparison with Thrust and OpenMP.
#include <omp.h>
#include <thrust/device_ptr.h>
#include <thrust/reduce.h>
#include <random>
#include "common.cuh"

constexpr int Threads = 256;              // threads per block

// 1. Interleaved addressing: at step `step`, threads that are multiples
//    of 2·step work – divergence inside warps.
__global__ void ReduceInterleaved(const int* in, long long n,
                                  unsigned long long* total)
{
    __shared__ long long s[Threads];
    int tid = threadIdx.x;
    long long i = (long long)blockIdx.x * Threads + tid;
    s[tid] = i < n ? in[i] : 0;
    __syncthreads();
    for (int step = 1; step < Threads; step *= 2)
    {
        if (tid % (2 * step) == 0) s[tid] += s[tid + step];
        __syncthreads();
    }
    if (tid == 0) atomicAdd(total, (unsigned long long)s[0]);
}

// 2. Sequential addressing: contiguous threads 0 … step-1 work;
//    during loading, each thread already adds two elements.
__global__ void ReduceSequential(const int* in, long long n,
                                 unsigned long long* total)
{
    __shared__ long long s[Threads];
    int tid = threadIdx.x;
    long long i = (long long)blockIdx.x * Threads * 2 + tid;
    long long sum = i < n ? in[i] : 0;
    if (i + Threads < n) sum += in[i + Threads];
    s[tid] = sum;
    __syncthreads();
    for (int step = Threads / 2; step > 0; step /= 2)
    {
        if (tid < step) s[tid] += s[tid + step];
        __syncthreads();
    }
    if (tid == 0) atomicAdd(total, (unsigned long long)s[0]);
}

int main()
{
    const long long n = 1LL << 26;          // 64 Mi numbers = 256 MB
    std::vector<int> data(n);
    std::mt19937 gen(26);
    for (int& x : data) x = (int)(gen() % 100);

    int* dIn;
    unsigned long long* dTotal;
    CUDA_CHECK(cudaMalloc(&dIn, n * sizeof(int)));
    CUDA_CHECK(cudaMalloc(&dTotal, sizeof(unsigned long long)));
    float copyMs = MedianMs([&] { return GpuMs([&] {
        CUDA_CHECK(cudaMemcpy(dIn, data.data(), n * sizeof(int),
                              cudaMemcpyHostToDevice)); }); });

    long long expected = 0;                 // CPU, OpenMP
    float cpuMs = MedianMs([&] { return CpuMs([&] {
        long long sum = 0;
        #pragma omp parallel for reduction(+:sum)
        for (long long i = 0; i < n; ++i) sum += data[i];
        expected = sum; }); });

    std::printf("n = %lld, copy to GPU: %.1f ms\n", n, copyMs);
    std::printf("time, ms    GB/s      S  sum          method\n");
    auto row = [&](const char* name, float ms, long long sum) {
        std::printf("%8.2f %7.1f %6.1f  %-11lld  %s%s\n", ms,
                    n * sizeof(int) / ms / 1e6, cpuMs / ms, sum, name,
                    sum == expected ? "" : " – ERROR");
    };
    row("CPU, OpenMP", cpuMs, expected);

    auto run = [&](const char* name, auto kernel, int perBlock) {
        unsigned blocks = (unsigned)((n + perBlock - 1) / perBlock);
        float ms = MedianMs([&] { return GpuMs([&] {
            CUDA_CHECK(cudaMemset(dTotal, 0, sizeof(long long)));
            kernel<<<blocks, Threads>>>(dIn, n, dTotal);
            CUDA_CHECK(cudaGetLastError()); }); });
        unsigned long long total = 0;
        CUDA_CHECK(cudaMemcpy(&total, dTotal, sizeof(total),
                              cudaMemcpyDeviceToHost));
        row(name, ms, (long long)total);
    };
    run("interleaved addressing", ReduceInterleaved, Threads);
    run("sequential addressing", ReduceSequential, 2 * Threads);

    long long sum = 0;                      // Thrust library
    thrust::device_ptr<int> p(dIn);
    float ms = MedianMs([&] { return GpuMs([&] {
        sum = thrust::reduce(p, p + n, 0LL); }); });
    row("thrust::reduce", ms, sum);
    CUDA_CHECK(cudaFree(dIn));
    CUDA_CHECK(cudaFree(dTotal));
}
```

In the `ReduceInterleaved` kernel, threads 0, 2, 4, … work at the first step and 0, 4, 8, … at the second: in every warp, some threads sit idle, and the `%` operator is slow. In `ReduceSequential`, contiguous threads $0 \dots \text{step} - 1$ work, so at the last steps only the first warp works, without divergence; moreover, each thread adds two elements during loading, so there are half as many blocks. Block sums (up to $512 \cdot 99$) are accumulated in a 64-bit variable using `atomicAdd` for `unsigned long long`. Output:

```
n = 67108864, copy to GPU: 23.1 ms
time, ms    GB/s      S  sum          method
    5.74    46.7    1.0  3321858913   CPU, OpenMP
    2.32   115.8    2.5  3321858913   interleaved addressing
    1.17   229.1    4.9  3321858913   sequential addressing
    0.94   286.0    6.1  3321858913   thrust::reduce
```

Sequential addressing is twice as fast as interleaved addressing and reaches 64 % of the GPU memory bandwidth (360 GB/s); the library `thrust::reduce` reaches 79 %. Reduction is memory-bound: there is one addition per number read. Therefore copying 256 MB to the GPU (23 ms) takes 20 times longer than the reduction itself, and for data residing in host memory, OpenMP (5.7 ms) is the better choice. GPU reduction is useful when the array has already been computed on the GPU.

## Example 2. A brightness histogram with local histograms

For an 8K grayscale image (7680×4320 pixels), build a 256-bin histogram in three ways: OpenMP with per-thread local histograms, a kernel with atomic operations on the global histogram, and a kernel with per-block local histograms in shared memory. Compare the times for a “photo” (a gradient with normal noise, seed 8) and a flat image (all pixels 128), and verify that the histograms match.

```cpp
// histogram.cu – brightness histogram of an 8K image: global
// atomic operations versus local histograms in shared memory.
#include <omp.h>
#include <cstring>
#include <random>
#include "common.cuh"

constexpr int Bins = 256;

// 1. Each thread increments a counter in global memory directly.
__global__ void HistGlobal(const unsigned char* pixels, int n,
                           unsigned int* hist)
{
    for (int i = blockIdx.x * blockDim.x + threadIdx.x; i < n;
         i += gridDim.x * blockDim.x)         // grid-stride loop
        atomicAdd(&hist[pixels[i]], 1u);
}

// 2. A per-block local histogram in shared memory, then one
//    addition per bin into the global histogram.
__global__ void HistShared(const unsigned char* pixels, int n,
                           unsigned int* hist)
{
    __shared__ unsigned int local[Bins];
    for (int b = threadIdx.x; b < Bins; b += blockDim.x) local[b] = 0;
    __syncthreads();
    for (int i = blockIdx.x * blockDim.x + threadIdx.x; i < n;
         i += gridDim.x * blockDim.x)
        atomicAdd(&local[pixels[i]], 1u);
    __syncthreads();
    for (int b = threadIdx.x; b < Bins; b += blockDim.x)
        if (local[b] > 0) atomicAdd(&hist[b], local[b]);
}

// CPU: local histograms of OpenMP threads, merged in critical.
void HistCpu(const std::vector<unsigned char>& pixels,
             unsigned int* hist)
{
    std::fill(hist, hist + Bins, 0u);
    const int n = (int)pixels.size();
    #pragma omp parallel
    {
        unsigned int local[Bins] = {};
        #pragma omp for
        for (int i = 0; i < n; ++i) ++local[pixels[i]];
        #pragma omp critical
        for (int b = 0; b < Bins; ++b) hist[b] += local[b];
    }
}

int main()
{
    const int w = 7680, h = 4320, n = w * h;    // 8K, 33 MB
    std::vector<unsigned char> photo(n), flat(n, 128);
    std::mt19937 gen(8);
    std::normal_distribution<float> noise(0.0f, 12.0f);
    for (int y = 0; y < h; ++y)                 // gradient with noise
        for (int x = 0; x < w; ++x)
            photo[y * w + x] = (unsigned char)std::clamp(
                60.0f + 140.0f * x / w + noise(gen), 0.0f, 255.0f);

    int sms = 0;
    CUDA_CHECK(cudaDeviceGetAttribute(&sms,
        cudaDevAttrMultiProcessorCount, 0));
    const int blocks = sms * 8, threads = 256;  // 8 blocks per SM
    unsigned char* dPixels;
    unsigned int* dHist;
    CUDA_CHECK(cudaMalloc(&dPixels, n));
    CUDA_CHECK(cudaMalloc(&dHist, Bins * sizeof(unsigned int)));

    std::printf("Image %dx%d, grid %d x %d threads\n", w, h,
                blocks, threads);
    std::printf("Time, ms (median of 5 runs):\n"
                "   OpenMP  HistGlobal  HistShared  image\n");
    for (auto* image : {&photo, &flat})
    {
        unsigned int cpu[Bins], gpu[Bins];
        float cpuMs = MedianMs([&] {
            return CpuMs([&] { HistCpu(*image, cpu); }); });
        CUDA_CHECK(cudaMemcpy(dPixels, image->data(), n,
                              cudaMemcpyHostToDevice));
        bool same = true;
        auto run = [&](auto kernel) {
            float ms = MedianMs([&] { return GpuMs([&] {
                CUDA_CHECK(cudaMemset(dHist, 0, sizeof(gpu)));
                kernel<<<blocks, threads>>>(dPixels, n, dHist);
            }); });
            CUDA_CHECK(cudaMemcpy(gpu, dHist, sizeof(gpu),
                                  cudaMemcpyDeviceToHost));
            same = same && std::memcmp(cpu, gpu, sizeof(cpu)) == 0;
            return ms;
        };
        float globalMs = run(HistGlobal);
        float sharedMs = run(HistShared);
        std::printf("%9.2f %11.2f %11.2f  %s, matches CPU: %s\n",
                    cpuMs, globalMs, sharedMs,
                    image == &photo ? "photo" : "flat",
                    same ? "yes" : "NO");
    }
    CUDA_CHECK(cudaFree(dPixels));
    CUDA_CHECK(cudaFree(dHist));
}
```

Both kernels use a grid-stride loop: a grid of $28 \cdot 8 = 224$ blocks of 256 threads processes 33 million pixels, and in `HistShared` each block adds its 256 counters to the global histogram only once. Output:

```
Image 7680x4320, grid 224 x 256 threads
Time, ms (median of 5 runs):
   OpenMP  HistGlobal  HistShared  image
     1.23        4.94        0.35  photo, matches CPU: yes
     3.55       18.53        0.35  flat, matches CPU: yes
```

Global atomic operations are slower even than OpenMP: in the “photo,” most pixels fall into a few dozen bins, so threads compete for the same counters, and in the flat image all 33 million operations modify a single counter and execute one after another (18.5 ms). Local histograms in shared memory are 14–53 times faster and do not depend on the image. OpenMP also slows down on the flat image, because all threads keep incrementing the same element of their own `local` array.

## Example 3. The Mandelbrot set with ILGPU

Compute the number of iterations (at most 1000) for every point of the Mandelbrot set on 1280×720 and 3840×2160 images sequentially, with `Parallel.For`, and with ILGPU kernels on all available accelerators (the CUDA GPU and the CPU accelerator). Print a table of times, speedups, and the total number of iterations for verification.

The project is a .NET 10 console application in Rider with the `ILGPU` 1.5.3 package.

```cs
// The Mandelbrot set with ILGPU: GPU (CUDA), the ILGPU CPU accelerator,
// and Parallel.For. Iterations per point – at most MaxIter.
using System.Diagnostics;
using ILGPU;
using ILGPU.Runtime;
using ILGPU.Runtime.CPU;
using ILGPU.Runtime.Cuda;

const int MaxIter = 1000;
using Context context = Context.CreateDefault();   // CPU and CUDA
Accelerator[] accelerators = context.Devices
    .Select(d => d.CreateAccelerator(context)).ToArray();

Console.WriteLine($"{"Size",-11}{"Method",-26}{"Time, ms",10}" +
                  $"{"S",8}  Iterations");
foreach ((int w, int h) in new[] { (1280, 720), (3840, 2160) })
{
    int[] counts = new int[w * h];
    double seq = Median(() => MandelCpu(counts, w, h, false));
    long expected = counts.Sum(c => (long)c);
    Row(w, h, "CPU, sequential", seq, seq, expected);
    double par = Median(() => MandelCpu(counts, w, h, true));
    Row(w, h, "CPU, Parallel.For", par, seq,
        counts.Sum(c => (long)c));

    foreach (Accelerator acc in accelerators)
    {
        // The CPU accelerator emulates a GPU with threads and is very slow.
        if (acc is CPUAccelerator && w > 1280) continue;
        var kernel = acc.LoadAutoGroupedStreamKernel<Index2D,
            ArrayView<int>, int, int, int>(MandelKernel);
        using var buffer = acc.Allocate1D<int>(w * h);
        double t = Median(() =>
        {
            kernel(new Index2D(w, h), buffer.View, w, h, MaxIter);
            buffer.CopyToCPU(counts);           // waits for the kernel
        });
        string name = acc is CudaAccelerator
            ? "ILGPU, CUDA" : "ILGPU, CPU accelerator";
        Row(w, h, name, t, seq, counts.Sum(c => (long)c));
    }
}
foreach (Accelerator acc in accelerators) acc.Dispose();

static void Row(int w, int h, string name, double ms, double seq,
                long total) =>
    Console.WriteLine($"{$"{w}x{h}",-11}{name,-26}{ms,10:F1}" +
                      $"{seq / ms,8:F1}  {total}");

static double Median(Action action)         // median of 5 runs
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

// Number of iterations for the point c = cr + i·ci.
static int Iterations(float cr, float ci, int maxIter)
{
    float zr = 0, zi = 0;
    int k = 0;
    while (k < maxIter && zr * zr + zi * zi <= 4.0f)
    {
        float t = zr * zr - zi * zi + cr;
        zi = 2 * zr * zi + ci;
        zr = t;
        k++;
    }
    return k;
}

static void MandelKernel(Index2D p, ArrayView<int> counts, int w,
                         int h, int maxIter)
{
    float cr = -2.2f + 3.0f * p.X / w;
    float ci = -1.0f + 2.0f * p.Y / h;
    counts[p.Y * w + p.X] = Iterations(cr, ci, maxIter);
}

static void MandelCpu(int[] counts, int w, int h, bool parallel)
{
    void RowWork(int y)
    {
        for (int x = 0; x < w; x++)
            counts[y * w + x] = Iterations(-2.2f + 3.0f * x / w,
                -1.0f + 2.0f * y / h, MaxIter);
    }

    if (parallel) Parallel.For(0, h, RowWork);
    else for (int y = 0; y < h; y++) RowWork(y);
}
```

The `Iterations` function has no qualifiers: ILGPU compiles for the GPU every static method that a kernel calls, so the same function works in both `MandelCpu` and `MandelKernel`. The `CopyToCPU` method waits for the kernel to finish, so the measured time also includes copying the result. The CPU accelerator is skipped for 4K: it emulates warps with CPU threads and runs for several seconds. Output (Release, Windows 11):

```
Size       Method                      Time, ms       S  Iterations
1280x720   CPU, sequential                694.8     1.0  237691869
1280x720   CPU, Parallel.For               59.8    11.6  237691869
1280x720   ILGPU, CPU accelerator         255.7     2.7  237691869
1280x720   ILGPU, CUDA                      1.0   687.6  237690702
3840x2160  CPU, sequential               6266.0     1.0  2138019184
3840x2160  CPU, Parallel.For              460.4    13.6  2138019184
3840x2160  ILGPU, CUDA                      7.9   790.6  2138027805
```

The Mandelbrot set is an ideal GPU problem: each pixel requires hundreds of operations, and only the result is transferred. The GPU is 58 times faster than `Parallel.For` on 16 logical processors. The number of iterations on the GPU differs by $4 \cdot 10^{- 4}$ %: the PTX compiler fuses multiplication with addition (FMA), and for points on the boundary of the set, the result changes by a few iterations. In individual measurements, the first run without warmup took 1 to 5 ms for 1280×720: the GPU raises its clocks gradually from the P8 power-saving state, which is why the `Median` function warms the program up for 0.3 s.
