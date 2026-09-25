---
title: "Практика"
description: "Тема 11. Обчислення на GPU: розібрані приклади"
outline: [2, 3]
---

# Практика

Приклади 1 і 2 використовують заголовок `common.cuh` з лекції та збираються проєктом CMake лекції: до списку `foreach` додають назви `reduce` і `histogram`. Програми запускають в Ubuntu у WSL2 командами `export OMP_PLACES=cores OMP_PROC_BIND=spread` і `./build/reduce`.

## Приклад 1. Паралельна редукція суми

Масив із $2^{26}$ випадкових цілих чисел від 0 до 99 (генератор із зерном 26) потрібно підсумувати на GPU двома ядрами редукції у спільній пам’яті: з чергуванням адрес і з послідовною адресацією. Порівняти час ядер з OpenMP і бібліотекою Thrust, обчислити ефективну пропускну здатність (ГБ/с) і перевірити суму.

```cpp
// reduce.cu – паралельна редукція суми на GPU: чергування адрес
// і послідовна адресація; порівняння з Thrust і OpenMP.
#include <omp.h>
#include <thrust/device_ptr.h>
#include <thrust/reduce.h>
#include <random>
#include "common.cuh"

constexpr int Threads = 256;              // потоків у блоці

// 1. Чергування адрес: на кроці step працюють потоки, кратні
//    2·step, – розгалуження всередині варпів.
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

// 2. Послідовна адресація: працюють потоки 0 … step-1 поспіль;
//    під час завантаження кожен потік уже додає два елементи.
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
    const long long n = 1LL << 26;          // 64 Mi чисел = 256 МБ
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

    std::printf("n = %lld, копіювання на GPU: %.1f мс\n", n, copyMs);
    std::printf(" час, мс    ГБ/с      S  сума         спосіб\n");
    auto row = [&](const char* name, float ms, long long sum) {
        std::printf("%8.2f %7.1f %6.1f  %-11lld  %s%s\n", ms,
                    n * sizeof(int) / ms / 1e6, cpuMs / ms, sum, name,
                    sum == expected ? "" : " – ПОМИЛКА");
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
    run("чергування адрес", ReduceInterleaved, Threads);
    run("послідовна адресація", ReduceSequential, 2 * Threads);

    long long sum = 0;                      // бібліотека Thrust
    thrust::device_ptr<int> p(dIn);
    float ms = MedianMs([&] { return GpuMs([&] {
        sum = thrust::reduce(p, p + n, 0LL); }); });
    row("thrust::reduce", ms, sum);
    CUDA_CHECK(cudaFree(dIn));
    CUDA_CHECK(cudaFree(dTotal));
}
```

У ядрі `ReduceInterleaved` на першому кроці працюють потоки 0, 2, 4, …, на другому – 0, 4, 8, …: у кожному варпі частина потоків простоює, а оператор `%` повільний. У `ReduceSequential` працюють потоки $0 \dots \text{step} - 1$ поспіль, тож на останніх кроках працює лише перший варп без розгалужень; крім того, кожен потік під час завантаження додає два елементи, і блоків удвічі менше. Суми блоків (до $512 \cdot 99$) накопичуються в 64-бітовій змінній функцією `atomicAdd` для `unsigned long long`. Результат:

```
n = 67108864, копіювання на GPU: 23.1 мс
 час, мс    ГБ/с      S  сума         спосіб
    5.74    46.7    1.0  3321858913   CPU, OpenMP
    2.32   115.8    2.5  3321858913   чергування адрес
    1.17   229.1    4.9  3321858913   послідовна адресація
    0.94   286.0    6.1  3321858913   thrust::reduce
```

Послідовна адресація вдвічі швидша за чергування адрес і досягає 64 % пропускної здатності пам’яті GPU (360 ГБ/с); бібліотечна `thrust::reduce` – 79 %. Редукція обмежена пам’яттю: на кожне прочитане число одне додавання. Тому копіювання 256 МБ на GPU (23 мс) у 20 разів довше за саму редукцію, і для даних, що лежать у пам’яті хоста, OpenMP (5,7 мс) вигідніший. GPU-редукція корисна, коли масив уже обчислено на GPU.

## Приклад 2. Гістограма яскравості з локальними гістограмами

Для 8K-зображення у відтінках сірого (7680×4320 пікселів) побудувати гістограму з 256 кошиків трьома способами: OpenMP із локальними гістограмами потоків, ядро з атомарними операціями над глобальною гістограмою та ядро з локальними гістограмами блоків у спільній пам’яті. Порівняти час для «фото» (градієнт із нормальним шумом, зерно 8) та однотонного зображення (усі пікселі 128) і перевірити збіг гістограм.

```cpp
// histogram.cu – гістограма яскравості 8K-зображення: глобальні
// атомарні операції проти локальних гістограм у спільній пам'яті.
#include <omp.h>
#include <cstring>
#include <random>
#include "common.cuh"

constexpr int Bins = 256;

// 1. Кожен потік одразу збільшує лічильник у глобальній пам'яті.
__global__ void HistGlobal(const unsigned char* pixels, int n,
                           unsigned int* hist)
{
    for (int i = blockIdx.x * blockDim.x + threadIdx.x; i < n;
         i += gridDim.x * blockDim.x)         // цикл із кроком сітки
        atomicAdd(&hist[pixels[i]], 1u);
}

// 2. Локальна гістограма блоку в спільній пам'яті, потім одне
//    додавання на кошик у глобальну гістограму.
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

// CPU: локальні гістограми потоків OpenMP, злиття в critical.
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
    const int w = 7680, h = 4320, n = w * h;    // 8K, 33 МБ
    std::vector<unsigned char> photo(n), flat(n, 128);
    std::mt19937 gen(8);
    std::normal_distribution<float> noise(0.0f, 12.0f);
    for (int y = 0; y < h; ++y)                 // градієнт із шумом
        for (int x = 0; x < w; ++x)
            photo[y * w + x] = (unsigned char)std::clamp(
                60.0f + 140.0f * x / w + noise(gen), 0.0f, 255.0f);

    int sms = 0;
    CUDA_CHECK(cudaDeviceGetAttribute(&sms,
        cudaDevAttrMultiProcessorCount, 0));
    const int blocks = sms * 8, threads = 256;  // 8 блоків на SM
    unsigned char* dPixels;
    unsigned int* dHist;
    CUDA_CHECK(cudaMalloc(&dPixels, n));
    CUDA_CHECK(cudaMalloc(&dHist, Bins * sizeof(unsigned int)));

    std::printf("Зображення %dx%d, сітка %d x %d потоків\n", w, h,
                blocks, threads);
    std::printf("Час, мс (медіана 5 запусків):\n"
                "   OpenMP  HistGlobal  HistShared  зображення\n");
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
        std::printf("%9.2f %11.2f %11.2f  %s, збіг з CPU: %s\n",
                    cpuMs, globalMs, sharedMs,
                    image == &photo ? "фото" : "однотонне",
                    same ? "так" : "НІ");
    }
    CUDA_CHECK(cudaFree(dPixels));
    CUDA_CHECK(cudaFree(dHist));
}
```

Обидва ядра використовують цикл із кроком сітки: сітка з $28 \cdot 8 = 224$ блоків по 256 потоків обробляє 33 мільйони пікселів, і в `HistShared` кожен блок лише один раз додає свої 256 лічильників до глобальної гістограми. Результат:

```
Зображення 7680x4320, сітка 224 x 256 потоків
Час, мс (медіана 5 запусків):
   OpenMP  HistGlobal  HistShared  зображення
     1.23        4.94        0.35  фото, збіг з CPU: так
     3.55       18.53        0.35  однотонне, збіг з CPU: так
```

Глобальні атомарні операції повільніші навіть за OpenMP: у «фото» більшість пікселів потрапляє в кілька десятків кошиків, тож потоки конкурують за ті самі лічильники, а в однотонному зображенні всі 33 мільйони операцій змінюють один лічильник і виконуються по черзі (18,5 мс). Локальні гістограми у спільній пам’яті в 14–53 рази швидші й не залежать від зображення. OpenMP теж сповільнюється на однотонному зображенні, бо всі потоки постійно збільшують один і той самий елемент власного масиву `local`.

## Приклад 3. Множина Мандельброта на ILGPU

Обчислити кількість ітерацій (не більше 1000) для кожної точки множини Мандельброта на зображеннях 1280×720 і 3840×2160 послідовно, за допомогою `Parallel.For` і ядрами ILGPU на всіх доступних акселераторах (GPU CUDA і CPU-акселератор). Вивести таблицю часу, прискорення і загальну кількість ітерацій для перевірки.

Проєкт – консольний застосунок .NET 10 у Rider з пакетом `ILGPU` 1.5.3.

```cs
// Множина Мандельброта на ILGPU: GPU (CUDA), CPU-акселератор ILGPU
// і Parallel.For. Кількість ітерацій на точку – не більше MaxIter.
using System.Diagnostics;
using ILGPU;
using ILGPU.Runtime;
using ILGPU.Runtime.CPU;
using ILGPU.Runtime.Cuda;

const int MaxIter = 1000;
using Context context = Context.CreateDefault();   // CPU і CUDA
Accelerator[] accelerators = context.Devices
    .Select(d => d.CreateAccelerator(context)).ToArray();

Console.WriteLine($"{"Розмір",-11}{"Спосіб",-26}{"Час, мс",10}" +
                  $"{"S",8}  Ітерацій");
foreach ((int w, int h) in new[] { (1280, 720), (3840, 2160) })
{
    int[] counts = new int[w * h];
    double seq = Median(() => MandelCpu(counts, w, h, false));
    long expected = counts.Sum(c => (long)c);
    Row(w, h, "CPU, послідовно", seq, seq, expected);
    double par = Median(() => MandelCpu(counts, w, h, true));
    Row(w, h, "CPU, Parallel.For", par, seq,
        counts.Sum(c => (long)c));

    foreach (Accelerator acc in accelerators)
    {
        // CPU-акселератор імітує GPU потоками й дуже повільний.
        if (acc is CPUAccelerator && w > 1280) continue;
        var kernel = acc.LoadAutoGroupedStreamKernel<Index2D,
            ArrayView<int>, int, int, int>(MandelKernel);
        using var buffer = acc.Allocate1D<int>(w * h);
        double t = Median(() =>
        {
            kernel(new Index2D(w, h), buffer.View, w, h, MaxIter);
            buffer.CopyToCPU(counts);           // чекає на ядро
        });
        string name = acc is CudaAccelerator
            ? "ILGPU, CUDA" : "ILGPU, CPU-акселератор";
        Row(w, h, name, t, seq, counts.Sum(c => (long)c));
    }
}
foreach (Accelerator acc in accelerators) acc.Dispose();

static void Row(int w, int h, string name, double ms, double seq,
                long total) =>
    Console.WriteLine($"{$"{w}x{h}",-11}{name,-26}{ms,10:F1}" +
                      $"{seq / ms,8:F1}  {total}");

static double Median(Action action)         // медіана 5 запусків
{
    var warm = Stopwatch.StartNew();         // прогрівання: JIT,
    do action();                             // частоти GPU
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

// Кількість ітерацій для точки c = cr + i·ci.
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

Функція `Iterations` не має кваліфікаторів: ILGPU компілює для GPU кожен статичний метод, який викликає ядро, тому та сама функція працює і в `MandelCpu`, і в `MandelKernel`. Метод `CopyToCPU` чекає на завершення ядра, тож вимірюваний час містить і копіювання результату. CPU-акселератор для 4K пропущено: він імітує варпи потоками CPU і працює кілька секунд. Результат (Release, Windows 11):

```
Розмір     Спосіб                       Час, мс       S  Ітерацій
1280x720   CPU, послідовно                694,8     1,0  237691869
1280x720   CPU, Parallel.For               59,8    11,6  237691869
1280x720   ILGPU, CPU-акселератор         255,7     2,7  237691869
1280x720   ILGPU, CUDA                      1,0   687,6  237690702
3840x2160  CPU, послідовно               6266,0     1,0  2138019184
3840x2160  CPU, Parallel.For              460,4    13,6  2138019184
3840x2160  ILGPU, CUDA                      7,9   790,6  2138027805
```

Множина Мандельброта – ідеальна задача для GPU: на піксель припадають сотні операцій, а передається лише результат. GPU у 58 разів швидший за `Parallel.For` на 16 логічних процесорах. Кількість ітерацій на GPU відрізняється на $4 \cdot 10^{- 4}$ %: компілятор PTX об’єднує множення з додаванням (FMA), і для точок на межі множини результат змінюється на кілька ітерацій. Перший запуск без прогрівання в окремих вимірюваннях давав для 1280×720 від 1 до 5 мс: GPU з енергозберігального стану P8 підвищує частоти поступово, тому функція `Median` прогріває програму 0,3 с.
