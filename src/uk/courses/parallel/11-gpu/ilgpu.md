---
title: "ILGPU, порівняння та типові помилки"
description: "Тема 11. Обчислення на GPU: ILGPU, порівняння та типові помилки"
outline: [2, 3]
---

# ILGPU, порівняння та типові помилки

## Бібліотека ILGPU для C#

**ILGPU** (<https://ilgpu.net/>) – бібліотека з відкритим кодом, яка компілює методи C# на льоту (*JIT*) у код для GPU. Вона не потребує CUDA Toolkit (лише драйвера) і встановлюється пакетом NuGet `ILGPU` (<https://www.nuget.org/packages/ILGPU>; у вересні 2026 року версія 1.5.3, працює з .NET 10). Основні поняття:

- `Context` – середовище ILGPU; `Context.CreateDefault()` знаходить усі пристрої;
- `Device` – опис пристрою, `Accelerator` – відкритий пристрій: `CudaAccelerator` (NVIDIA), `CLAccelerator` (OpenCL), `CPUAccelerator` (імітація GPU потоками CPU для налагодження);
- `MemoryBuffer1D<T, Stride1D.Dense>` – буфер у пам’яті пристрою (`Allocate1D`, `CopyFromCPU`, `CopyToCPU`, `GetAsArray1D`); `ArrayView<T>` – «вигляд» буфера, який передають у ядро;
- ядро – статичний метод, перший параметр якого індекс `Index1D`, `Index2D` або `Index3D`; `accelerator.LoadAutoGroupedStreamKernel<…>(метод)` компілює його й повертає делегат, а ILGPU сам обирає розмір груп (блоків);
- запуск ядра асинхронний: `accelerator.Synchronize()` чекає на завершення; копіювання `CopyToCPU` і `GetAsArray1D` чекають на попередні ядра самі.

**Обмеження ядер** (<https://ilgpu.net/docs/>): лише типи-значення (`int`, `float`, структури), без класів, посилань, масивів `T[]` і рядків; не можна створювати об’єкти й масиви (`new`), використовувати LINQ і винятки. Математичні функції беруть з `Math` і `MathF`, а пакет `ILGPU.Algorithms` додає клас `XMath`, редукції, сканування та сортування на пристрої.

### Приклад: SAXPY і розмиття зображення

Програма виводить перелік пристроїв, обирає GPU (з ключем `--cpu` – CPU-акселератор ILGPU), обчислює SAXPY для мільйона чисел і розмиває зображення (середнє у квадраті 7×7 навколо пікселя) для роздільностей 4K і 8K, порівнюючи з послідовним циклом і `Parallel.For` (тема 6). Проєкт – консольний застосунок .NET 10 з пакетом `ILGPU` 1.5.3 (`dotnet add package ILGPU`).

```cs
// ILGPU: перелік пристроїв, SAXPY і розмиття зображення на GPU.
// Аргумент --cpu – CPU-акселератор ILGPU замість відеокарти.
using System.Diagnostics;
using ILGPU;
using ILGPU.Runtime;
using ILGPU.Runtime.CPU;

using Context context = Context.CreateDefault(); // CUDA, OpenCL, CPU
Console.WriteLine("Пристрої ILGPU:");
foreach (Device d in context)
    Console.WriteLine($"  {d.AcceleratorType,-6} {d.Name}" +
        (d.AcceleratorType == AcceleratorType.CPU ? ""
            : $", {d.MemorySize / 1073741824.0:F1} ГБ"));

Device device = args.Contains("--cpu")
    ? context.GetCPUDevice(0)
    : context.GetPreferredDevice(preferCPU: false);
using Accelerator accelerator = device.CreateAccelerator(context);
Console.WriteLine($"Обрано: {accelerator.Name}");

// SAXPY: y = a·x + y для мільйона елементів.
const int N = 1_000_000;
float[] x = Enumerable.Range(0, N).Select(i => (float)i).ToArray();
float[] y = Enumerable.Repeat(1.0f, N).ToArray();
using MemoryBuffer1D<float, Stride1D.Dense> dx =
    accelerator.Allocate1D(x);             // виділення й копіювання
using MemoryBuffer1D<float, Stride1D.Dense> dy =
    accelerator.Allocate1D(y);
var saxpy = accelerator.LoadAutoGroupedStreamKernel<
    Index1D, float, ArrayView<float>, ArrayView<float>>(Saxpy);
saxpy((int)dx.Length, 2.0f, dx.View, dy.View);  // асинхронний запуск
accelerator.Synchronize();                      // чекати на ядро
float[] result = dy.GetAsArray1D();             // копіювання на хост
Console.WriteLine($"SAXPY: y[0] = {result[0]}, y[{N - 1}] = " +
                  $"{result[N - 1]}");

// Розмиття: середнє у квадраті (2r + 1)×(2r + 1) навколо пікселя.
var blur = accelerator.LoadAutoGroupedStreamKernel<Index2D,
    ArrayView<float>, ArrayView<float>, int, int, int>(Blur);
Console.WriteLine(
    $"{"Розмір",-10}{"Спосіб",-24}{"Час, мс",9}{"S",7}");
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
        dst.CopyToCPU(gpu);                     // чекає на ядро
    });
    float diff = 0;
    for (int i = 0; i < gpu.Length; i++)
        diff = Math.Max(diff, Math.Abs(gpu[i] - cpu[i]));

    string size = $"{w}x{h}";
    Row(size, "CPU, послідовно", seq, seq);
    Row(size, "CPU, Parallel.For", par, seq);
    Row(size, "ILGPU, лише ядро", kernel, seq);
    Row(size, "ILGPU, з копіюваннями", total, seq);
    Console.WriteLine($"{"",-10}найбільша різниця з CPU: {diff}");
}

static void Row(string size, string name, double ms, double seq) =>
    Console.WriteLine(
        $"{size,-10}{name,-24}{ms,9:F2}{seq / ms,7:F1}");

// Медіана 5 вимірювань після прогрівання.
static double Median(Action action)
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

static void Saxpy(Index1D i, float a, ArrayView<float> x,
                  ArrayView<float> y) => y[i] = a * x[i] + y[i];

// Ядро: потік p = (X, Y) обчислює один піксель.
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

// Та сама формула на CPU: послідовно або Parallel.For за рядками.
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

Розмиття на GPU записане як звичайний метод C#: `Math.Max`, цикли й індексування `ArrayView` дозволені, бо не створюють об’єктів. Прогрівання триває 0,3 с: перший виклик компілює ядро, а GPU за цей час виходить з енергозберігального стану. Результат (Windows 11, Release; рис. 11.10):

```
Пристрої ILGPU:
  CPU    CPUAccelerator
  Cuda   NVIDIA GeForce RTX 3060, 12,0 ГБ
Обрано: NVIDIA GeForce RTX 3060
SAXPY: y[0] = 1, y[999999] = 1999999
Розмір    Спосіб                    Час, мс      S
3840x2160 CPU, послідовно            294,55    1,0
3840x2160 CPU, Parallel.For           39,54    7,5
3840x2160 ILGPU, лише ядро             0,87  340,2
3840x2160 ILGPU, з копіюваннями        6,97   42,3
          найбільша різниця з CPU: 0
7680x4320 CPU, послідовно           1207,24    1,0
7680x4320 CPU, Parallel.For          166,36    7,3
7680x4320 ILGPU, лише ядро             3,56  338,7
7680x4320 ILGPU, з копіюваннями       26,90   44,9
          найбільша різниця з CPU: 0
```

На розмиття 7×7 припадає 49 додавань на піксель, тому навіть із копіюваннями GPU в 6 разів швидший за `Parallel.For` на 16 логічних процесорах. Результати CPU і GPU збігаються точно: ядро лише додає й ділить, без множення, яке компілятор міг би об’єднати у FMA. Пристрій OpenCL на лабораторному ПК ILGPU не показав. З ключем `--cpu` та сама програма працює на CPU-акселераторі (варп із 4 потоків, групи до 16 потоків): розмиття 4K триває 907 мс, утричі **довше** за послідовний цикл і в 22 рази довше, ніж `Parallel.For`. CPU-акселератор призначений для налагодження ядер (точки зупину в Rider) і як запасний варіант, коли GPU NVIDIA немає, а не для швидкості.

::: info Знімок екрана
Rider: console project with the ILGPU 1.5.3 package (NuGet tool window or .csproj visible), Run tool window with the device list (CPUAccelerator, NVIDIA GeForce RTX 3060) and the blur timing table
:::

Рис. 11.10. Перелік пристроїв ILGPU і час розмиття в Rider {.caption}

## Порівняння CPU і GPU

Час програми на GPU складається з копіювання на пристрій, роботи ядра й копіювання назад: $T_{\text{GPU}} = T_{\text{H2D}} + T_{\text{ядро}} + T_{\text{D2H}}$. Навіть коли ядро миттєве, прискорення відносно CPU не перевищує $T_{\text{CPU}} / (T_{\text{H2D}} + T_{\text{D2H}})$ – це закон Амдала (тема 1), у якому «послідовною частиною» є пересилання через PCIe. Підсумок вимірювань лекції та лабораторної роботи наведено в табл. 11.5.

Таблиця 11.5. Порівняння CPU (усі ядра) і GPU з урахуванням копіювань {.caption}

| **Задача** | **CPU, мс** | **ядро, мс** | **GPU разом, мс** | **Висновок** |
| --- | --- | --- | --- | --- |
| відтінки сірого 8K | 6,4 | 0,53 | 12,2 | GPU повільніший через копіювання |
| сума 64 млн чисел | 5,7 | 1,17 | 24,3 | GPU повільніший через копіювання |
| множення матриць 2048 | 151 | 16,7 | 21,8 | GPU у 7 разів швидший |
| розмиття 7×7, 8K (C#) | 166 | 3,56 | 26,9 | GPU у 6 разів швидший |
| Мандельброт 4K (C#) | 460 | – | 7,9 | GPU у 58 разів швидший |

GPU вигідний, коли:

- дані великі (мільйони елементів), а обчислення незалежні й однакові (мало розгалужень);
- на кожен переданий байт припадає багато операцій (матриці, фільтри з великим вікном, ітераційні методи, Монте-Карло);
- дані залишаються на GPU між кроками (моделювання на багатьох кроках, конвеєр обробки зображень), тож копіювання виконуються рідко.

CPU кращий для малих даних, для алгоритмів із великою кількістю розгалужень і залежностей, для простих операцій над даними, що вже в пам’яті хоста, і коли потрібна точність `double`: у GeForce RTX 3060 операції `double` у 64 рази повільніші за `float`. Чесне порівняння завжди враховує найкращу версію для CPU (усі ядра, SIMD, прив’язку потоків) і час копіювань (рис. 11.11).

::: info Знімок екрана
Windows Terminal, Ubuntu-26.04 (WSL2), `export OMP_PLACES=cores OMP_PROC_BIND=spread`, then `./grayscale 7680 4320` and `./matmul 2048`: H2D/kernel/D2H times, CPU OpenMP times and speed-ups
:::

Рис. 11.11. Порівняння часу CPU та GPU {.caption}

## Типові помилки

Найпоширеніші помилки програм CUDA та ILGPU зібрано в табл. 11.6.

Таблиця 11.6. Типові помилки в програмах для GPU {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| `nvidia-smi` у WSL не бачить GPU або `libcuda.so` не знайдено | у WSL установлено драйвер Linux або пакет `cuda`/`cuda-drivers`; видалити, залишити лише драйвер Windows і `cuda-toolkit-13-3` |
| `nvcc: command not found` | не додано `/usr/local/cuda/bin` до `PATH` |
| CMake: `unsupported GNU version` | версія GCC новіша, ніж підтримує `nvcc`; використати GCC 15 для CUDA 13.3 |
| `no kernel image is available for execution on the device` | `CMAKE_CUDA_ARCHITECTURES` не відповідає GPU; задати `86` або `native` |
| ядро «не виконується», результат нульовий | помилку запуску не перевірено; `cudaGetLastError` після запуску й `CUDA_CHECK` |
| `cudaErrorIllegalAddress` | немає перевірки меж `if (i < n)` або вказівник хоста в ядрі; `compute-sanitizer` |
| результат неправильний лише для деяких розмірів | кількість блоків не округлено вгору |
| ядро зі спільною пам’яттю зависає або дає сміття | `__syncthreads()` в умовній гілці або пропущено другий бар’єр |
| час ядра 0,01 мс замість мілісекунд | виміряно лише запуск; події CUDA або синхронізація |
| GPU повільніший за CPU | копіювання переважають обчислення; тримати дані на GPU, закріплена пам’ять, потоки CUDA |
| ILGPU: помилка компіляції ядра | у ядрі клас, масив `T[]`, `new` або LINQ; лише `ArrayView` і структури |
