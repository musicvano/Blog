---
title: "Збирання та базові паралельні шаблони"
description: "Тема 11. Обчислення на GPU: Збирання та базові паралельні шаблони"
outline: [2, 3]
---

# Збирання та базові паралельні шаблони

## Збирання проєкту та обробка помилок

CMake підтримує CUDA як мову проєкту. Для прикладу «Сума векторів» файл `CMakeLists.txt`:

```cmake
cmake_minimum_required(VERSION 3.28)
project(VectorAdd LANGUAGES CXX CUDA)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CUDA_STANDARD 20)
set(CMAKE_CUDA_ARCHITECTURES 86)      # RTX 3060, CC 8.6

find_package(CUDAToolkit REQUIRED)

add_executable(vector_add vector_add.cu)
target_link_libraries(vector_add PRIVATE CUDA::cudart)
```

- `LANGUAGES CXX CUDA` вмикає компілятор `nvcc` для файлів `.cu`.
- `CMAKE_CUDA_ARCHITECTURES` (<https://cmake.org/cmake/help/latest/prop_tgt/CUDA_ARCHITECTURES.html>) задає CC, для яких генерується код: `86` – машинний код і PTX для CC 8.6; `native` – для GPU цього комп’ютера; список `75;86;89` – для кількох GPU.
- Модуль `FindCUDAToolkit` (<https://cmake.org/cmake/help/latest/module/FindCUDAToolkit.html>) створює цілі бібліотек: `CUDA::cudart`, `CUDA::cublas`, `CUDA::cufft`, `CUDA::curand` тощо.

Проєкт збирається так само, як у темах 9 і 10: `cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release` і `cmake --build build`. Під час конфігурування CMake повідомляє `The CUDA compiler identification is NVIDIA 13.3.73 with host compiler GNU 15.2.0`. Кожна версія `nvcc` підтримує обмежений діапазон версій GCC: CUDA 13.3 приймає GCC 15, а з GCC 16 (теж є в Ubuntu 26.04) відмовляється працювати. У Windows із MSVC до кожного файлу `.cu` додають ключі `-Xcompiler=/utf-8,/Zc:preprocessor`: перший потрібен для українських рядків, другий – для бібліотек Thrust і CUB.

У CLion (<https://www.jetbrains.com/help/clion/cuda-projects.html>) проєкт CUDA створюють командою *File → New Project → CUDA Executable* або відкривають наявну теку з `CMakeLists.txt`. Для роботи з WSL обирають тулчейн WSL (тема 9), а шлях до `nvcc` задають змінною `PATH` в Ubuntu або параметром `-DCMAKE_CUDA_COMPILER=/usr/local/cuda/bin/nvcc` профілю CMake. CLion підсвічує ядра й синтаксис `<<<…>>>` (рис. 11.6).

::: info Знімок екрана
CLion, WSL toolchain: `vector_add.cu` in the editor (kernel highlighted), `CMakeLists.txt` with `LANGUAGES CXX CUDA` in a second tab, Run tool window with «Max error: 0»
:::

Рис. 11.6. CUDA-проєкт у CLion {.caption}

### Помилки CUDA

Кожна функція CUDA Runtime повертає код `cudaError_t`; макрос `CUDA_CHECK` перевіряє його. Запуск ядра нічого не повертає, тому помилки ядра перевіряють двома викликами:

- `cudaGetLastError()` одразу після запуску – помилки **конфігурації** (забагато потоків у блоці, забагато спільної пам’яті);
- `cudaDeviceSynchronize()` – помилки **виконання** (звернення за межі масиву тощо). Такі помилки «липкі»: контекст CUDA пошкоджено, і всі наступні виклики повертають ту саму помилку.

Програма з двома навмисними помилками (блок із 2048 потоків і ядро без перевірки меж) вивела:

```
1: cudaErrorInvalidValue: invalid argument
2: запуск cudaSuccess
3: cudaErrorIllegalAddress: an illegal memory access was encountered
4: cudaErrorIllegalAddress
```

Рядок 2 показує, що помилка виконання не видна під час запуску, а рядок 4 – що після неї навіть `cudaMalloc` не працює. Утиліта `compute-sanitizer` (<https://docs.nvidia.com/compute-sanitizer/>) знаходить місце помилки: команда `compute-sanitizer ./errors` виводить, зокрема, `Invalid __global__ write of size 4 bytes`, номер потоку й блоку та відстань від виділеної пам’яті. Налагоджувач `cuda-gdb` для ядер працює в Linux; для нього програму збирають із ключем `-G`.

## Базові паралельні шаблони

Більшість програм для GPU поєднує кілька простих шаблонів:

- **поелементна операція** (*map*): SAXPY $y = a x + y$, сума векторів, перетворення пікселів; один потік на елемент;
- **двовимірна сітка** для зображень і матриць: блок $16 \times 16$ потоків, `x` – стовпець, `y` – рядок;
- **трафарет** (*stencil*): кожен потік читає сусідні елементи (розмиття, теплопровідність);
- **редукція** і **гістограма**: багато потоків записують в одне або кілька значень (наступний розділ).

Якщо елементів більше, ніж потоків сітки, використовують **цикл із кроком сітки** (*grid-stride loop*): `for (int i = index; i < n; i += gridDim.x * blockDim.x)`. Тоді одна сітка фіксованого розміру (наприклад, 8 блоків на SM) обробляє масив будь-якої довжини.

### Відтінки сірого: 2D-сітка

Програма перетворює кольорове зображення (структура `Rgb` з трьох байтів) у відтінки сірого за формулою $Y = 0 {,} 299 R + 0 {,} 587 G + 0 {,} 114 B$ і записує результат у файл `gray.pgm` (формат PGM відкривають GIMP і більшість переглядачів). Зображення генерується програмою (кольорові градієнти), розміри задають аргументи. Час кожного етапу вимірюється окремо, а результат порівнюється з CPU – послідовним і OpenMP.

```cpp
// grayscale.cu – відтінки сірого для кольорового зображення на
// 2D-сітці потоків. Аргументи: ширина висота (типово 3840 2160).
#include <omp.h>
#include <cstdlib>
#include <fstream>
#include "common.cuh"

struct Rgb { unsigned char r, g, b; };

// Потік (x, y) обчислює яскравість одного пікселя.
__global__ void Grayscale(const Rgb* in, unsigned char* out,
                          int width, int height)
{
    int x = blockIdx.x * blockDim.x + threadIdx.x;   // стовпець
    int y = blockIdx.y * blockDim.y + threadIdx.y;   // рядок
    if (x < width && y < height)
    {
        Rgb p = in[y * width + x];
        out[y * width + x] = (unsigned char)(
            0.299f * p.r + 0.587f * p.g + 0.114f * p.b + 0.5f);
    }
}

// Та сама формула на CPU: threads = 1 – послідовно, інакше OpenMP.
void GrayscaleCpu(const std::vector<Rgb>& in,
                  std::vector<unsigned char>& out, int threads)
{
    const long long n = (long long)in.size();
    #pragma omp parallel for num_threads(threads)
    for (long long i = 0; i < n; ++i)
        out[i] = (unsigned char)(0.299f * in[i].r
            + 0.587f * in[i].g + 0.114f * in[i].b + 0.5f);
}

int main(int argc, char* argv[])
{
    const int w = argc > 1 ? std::atoi(argv[1]) : 3840;
    const int h = argc > 2 ? std::atoi(argv[2]) : 2160;
    const size_t n = (size_t)w * h;
    std::vector<Rgb> image(n);                   // градієнти
    for (int y = 0; y < h; ++y)
        for (int x = 0; x < w; ++x)
            image[(size_t)y * w + x] = {(unsigned char)(x * 255 / w),
                (unsigned char)(y * 255 / h), (unsigned char)(x ^ y)};
    std::vector<unsigned char> gray(n), check(n);

    Rgb* dIn;
    unsigned char* dOut;
    CUDA_CHECK(cudaMalloc(&dIn, n * sizeof(Rgb)));
    CUDA_CHECK(cudaMalloc(&dOut, n));
    dim3 block(16, 16);                          // 256 потоків
    dim3 grid((w + block.x - 1) / block.x,
              (h + block.y - 1) / block.y);

    float h2d = MedianMs([&] { return GpuMs([&] {
        CUDA_CHECK(cudaMemcpy(dIn, image.data(), n * sizeof(Rgb),
                              cudaMemcpyHostToDevice)); }); });
    float kernel = MedianMs([&] { return GpuMs([&] {
        Grayscale<<<grid, block>>>(dIn, dOut, w, h);
        CUDA_CHECK(cudaGetLastError()); }); });
    float d2h = MedianMs([&] { return GpuMs([&] {
        CUDA_CHECK(cudaMemcpy(gray.data(), dOut, n,
                              cudaMemcpyDeviceToHost)); }); });
    float cpu1 = MedianMs([&] {
        return CpuMs([&] { GrayscaleCpu(image, check, 1); }); });
    int p = omp_get_num_procs();
    float cpuP = MedianMs([&] {
        return CpuMs([&] { GrayscaleCpu(image, check, p); }); });

    int maxDiff = 0;
    for (size_t i = 0; i < n; ++i)
        maxDiff = std::max(maxDiff, std::abs(gray[i] - check[i]));
    std::ofstream file("gray.pgm", std::ios::binary);   // формат PGM
    file << "P5\n" << w << ' ' << h << "\n255\n";
    file.write((const char*)gray.data(), n);

    float total = h2d + kernel + d2h;
    std::printf("Зображення %dx%d, сітка %ux%u блоків 16x16\n",
                w, h, grid.x, grid.y);
    std::printf("GPU: H2D %.2f + ядро %.3f + D2H %.2f = %.2f мс\n",
                h2d, kernel, d2h, total);
    std::printf("CPU: 1 потік %.2f мс, OpenMP (%d) %.2f мс\n",
                cpu1, p, cpuP);
    std::printf("Прискорення відносно OpenMP: ядро %.1f, "
                "з копіюваннями %.2f\n", cpuP / kernel, cpuP / total);
    std::printf("Найбільша різниця з CPU: %d\n", maxDiff);
    CUDA_CHECK(cudaFree(dIn));
    CUDA_CHECK(cudaFree(dOut));
}
```

Приклади цієї лекції збираються одним проєктом CMake: для кожного прикладу – своя ціль у циклі `foreach` (у лабораторній роботі до списку додаються її програми). Модуль `FindOpenMP` з CMake 3.31 створює ціль `OpenMP::OpenMP_CUDA` для OpenMP у коді хоста файлів `.cu`:

```cmake
cmake_minimum_required(VERSION 3.31)
project(GpuExamples LANGUAGES CXX CUDA)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CUDA_STANDARD 20)
set(CMAKE_CUDA_ARCHITECTURES 86)

find_package(CUDAToolkit REQUIRED)
find_package(OpenMP REQUIRED)      # OpenMP::OpenMP_CUDA: CMake 3.31+

# Windows (MSVC): UTF-8 і стандартний препроцесор для CCCL (Thrust).
set(WIN_FLAGS -Xcompiler=/utf-8,/Zc:preprocessor)

foreach(name grayscale matmul streams thrust_demo reduce histogram
             managed cublas_demo errors)
    add_executable(${name} ${name}.cu)
    target_link_libraries(${name} PRIVATE CUDA::cudart
                          OpenMP::OpenMP_CUDA)
    if(MSVC)
        target_compile_options(${name} PRIVATE
            $<$<COMPILE_LANGUAGE:CUDA>:${WIN_FLAGS}>)
    endif()
endforeach()
target_link_libraries(cublas_demo PRIVATE CUDA::cublas)
```

Програми запущено в WSL2 зі змінними `OMP_PLACES=cores OMP_PROC_BIND=spread` (тема 10): без прив’язки короткі цикли OpenMP у WSL2 виконувалися в 3–5 разів повільніше. Результат для зображень 4K і 8K (`./grayscale` і `./grayscale 7680 4320`):

```
Зображення 3840x2160, сітка 240x135 блоків 16x16
GPU: H2D 2.48 + ядро 0.134 + D2H 0.91 = 3.52 мс
CPU: 1 потік 10.67 мс, OpenMP (16) 1.40 мс
Прискорення відносно OpenMP: ядро 10.4, з копіюваннями 0.40
Найбільша різниця з CPU: 1
Зображення 7680x4320, сітка 480x270 блоків 16x16
GPU: H2D 8.61 + ядро 0.530 + D2H 3.09 = 12.23 мс
CPU: 1 потік 42.35 мс, OpenMP (16) 6.44 мс
Прискорення відносно OpenMP: ядро 12.1, з копіюваннями 0.53
Найбільша різниця з CPU: 1
```

Ядро в 10–12 разів швидше за OpenMP, але копіювання займає 96 % часу GPU, і **з урахуванням копіювань GPU у 2–2,5 раза повільніший за CPU**. Перетворення в сірий має лише кілька операцій на піксель: такі задачі вигідні на GPU лише тоді, коли зображення вже там (наприклад, наступним кроком іде розмиття або розпізнавання). Різниця 1 в окремих пікселях пояснюється тим, що `nvcc` об’єднує множення й додавання в інструкцію FMA з одним округленням, а GCC на CPU – ні.

### Множення матриць: наївне ядро

У наївному ядрі кожен потік обчислює один елемент $C_{i j} = \sum_{k} A_{i k} B_{k j}$, читаючи рядок $A$ і стовпець $B$ з глобальної пам’яті:

```cpp
__global__ void MatMulNaive(const float* a, const float* b, float* c,
                            int n)
{
    int row = blockIdx.y * blockDim.y + threadIdx.y;
    int col = blockIdx.x * blockDim.x + threadIdx.x;
    if (row < n && col < n)
    {
        float sum = 0.0f;
        for (int k = 0; k < n; ++k)
            sum += a[row * n + k] * b[k * n + col];
        c[row * n + col] = sum;
    }
}
```

Для $n \times n$ матриць виконується $2 n^{3}$ операцій і читається $2 n^{3}$ чисел: кожен елемент $A$ і $B$ завантажується з глобальної пам’яті $n$ разів. Звертання до `b[k * n + col]` об’єднані (сусідні потоки читають сусідні стовпці), а `a[row * n + k]` в усіх потоків варпа однакове й читається один раз. Проте обчислення обмежене пам’яттю, і наступний розділ показує, як зменшити кількість звертань.
