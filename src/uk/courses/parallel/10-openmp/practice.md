---
title: "Практика"
description: "Тема 10. OpenMP: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Теплопровідність пластини і прив’язка потоків

Квадратна пластина розміром $n \times n$ вузлів сітки має верхній край із температурою 100 °C, решта – 0 °C. Моделювати поширення тепла явною схемою для рівняння теплопровідності $$u_{i , j}^{k + 1} = u_{i , j}^{k} + r (u_{i - 1 , j}^{k} + u_{i + 1 , j}^{k} + u_{i , j - 1}^{k} + u_{i , j + 1}^{k} - 4 u_{i , j}^{k}) ,$$ де $r = 0 {,} 2$. Розмір сітки, кількість кроків і спосіб ініціалізації (`parallel` – за політикою першого дотику, `serial` – головним потоком) задаються аргументами. Порівняти час для різних значень `OMP_PLACES` і `OMP_PROC_BIND` та перевірити, що результат (сумарне тепло) не змінюється.

```cpp
#include <omp.h>
#include <cstdlib>
#include <print>
#include <string_view>
#include <utility>

// Явна схема для рівняння теплопровідності на сітці n × n.
// Аргументи: n, кількість кроків, parallel | serial (ініціалізація).
int main(int argc, char* argv[])
{
    const long n = argc > 1 ? std::atol(argv[1]) : 1000;
    const int steps = argc > 2 ? std::atoi(argv[2]) : 2000;
    const bool firstTouch =
        argc <= 3 || std::string_view(argv[3]) != "serial";

    // new без ініціалізації: фізичні сторінки ще не виділено.
    double* u = new double[n * n];
    double* v = new double[n * n];

    double start = omp_get_wtime();
    // Перший запис розміщує сторінку у вузлі NUMA потоку,
    // тому ініціалізація має той самий розподіл, що й обчислення.
    #pragma omp parallel for collapse(2) schedule(static) \
        if(firstTouch)
    for (long i = 0; i < n; ++i)
        for (long j = 0; j < n; ++j)
        {
            bool edge = i == 0;              // верхній край гарячий
            u[i * n + j] = v[i * n + j] = edge ? 100.0 : 0.0;
        }
    double init = omp_get_wtime() - start;

    const double r = 0.2;                    // r = a·Δt/h² < 0,25
    start = omp_get_wtime();
    for (int s = 0; s < steps; ++s)
    {
        #pragma omp parallel for collapse(2) schedule(static)
        for (long i = 1; i < n - 1; ++i)
            for (long j = 1; j < n - 1; ++j)
            {
                long k = i * n + j;
                v[k] = u[k] + r * (u[k - n] + u[k + n] + u[k - 1]
                                   + u[k + 1] - 4 * u[k]);
            }
        std::swap(u, v);
    }
    double time = omp_get_wtime() - start;

    double heat = 0.0;
    #pragma omp parallel for reduction(+:heat)
    for (long k = 0; k < n * n; ++k) heat += u[k];

    const char* binds[] = {"false", "true", "primary", "close",
                           "spread"};
    std::println("{:<6} p={:<2} місць {:>2}  {:<8} {:.3f} + {:.3f} с"
                 "  {:.6e}", binds[omp_get_proc_bind()],
                 omp_get_max_threads(), omp_get_num_places(),
                 firstTouch ? "parallel" : "serial", init, time,
                 heat);
    delete[] u;
    delete[] v;
}
```

Клауза `collapse(2)` ділить між потоками всі $(n - 2)^{2}$ внутрішніх вузлів, а `schedule(static)` гарантує, що ініціалізація та обчислення розподіляють рядки однаково: кожен потік працює з тими сторінками пам’яті, яких він торкнувся першим. Клауза `if(firstTouch)` вимикає паралельну ініціалізацію для порівняння, а масиви `u` і `v` міняються вказівниками без копіювання.

У Windows прив’язку підтримує лише `libomp`, тому програму зібрано Clang 23.1 (`clang++ -std=c++23 -O2 -fopenmp heat.cpp -o heat.exe`) і запущено сценарієм PowerShell для 4 потоків (перший рядок – один потік для порівняння):

```powershell
$env:OMP_NUM_THREADS = 1; .\heat.exe 1000 2000
$env:OMP_NUM_THREADS = 4
foreach ($places in "threads", "cores") {
  foreach ($bind in "false", "close", "spread") {
    $env:OMP_PLACES = $places; $env:OMP_PROC_BIND = $bind
    .\heat.exe 1000 2000        # 6 запусків
  }
}
$env:OMP_NUM_THREADS = 8; $env:OMP_PROC_BIND = "spread"
.\heat.exe 1000 2000; .\heat.exe 1000 2000 serial
```

```
false  p=1  місць  1  parallel 0.004 + 6.404 с  2.254124e+06
false  p=4  місць  1  parallel 0.002 + 2.818 с  2.254124e+06
close  p=4  місць 16  parallel 0.003 + 3.846 с  2.254124e+06
spread p=4  місць 16  parallel 0.041 + 2.721 с  2.254124e+06
false  p=4  місць  1  parallel 0.011 + 2.609 с  2.254124e+06
close  p=4  місць  8  parallel 0.004 + 2.493 с  2.254124e+06
spread p=4  місць  8  parallel 0.009 + 2.452 с  2.254124e+06
spread p=8  місць  8  parallel 0.004 + 1.878 с  2.254124e+06
spread p=8  місць  8  serial   0.003 + 1.883 с  2.254124e+06
```

Найповільніший варіант – `close` на місцях-`threads`: чотири потоки займають логічні процесори 0–3, тобто лише **два** фізичні ядра. Прив’язка до ядер (`cores`) або `spread` розміщує потоки на окремих ядрах. Сумарне тепло однакове в усіх запусках, отже, результат не залежить від кількості потоків і прив’язки. Прискорення на 8 потоках лише 3,4: на кожному кроці обидва масиви (по 8 МБ) переписуються, і ядра чекають на пам’ять. Ініціалізація `serial` на однопроцесорному комп’ютері не змінює часу, бо тут один вузол NUMA. На двосокетному вузлі кластера ту саму серію запускають у Linux (`OMP_PROC_BIND=close` і `spread`, ініціалізація `parallel` і `serial`, а також `numactl --cpunodebind=0 --membind=1`), щоб оцінити вплив першого дотику та віддаленої пам’яті.

## Приклад 2. Підрахунок слів у файлах: taskloop і власна редукція

Створити програму, яка генерує 200 текстових файлів по 50 000 слів (генератор із зерном 7), а потім підраховує, скільки разів трапляється кожне слово в усіх файлах. Слова переводяться в нижній регістр, розділові знаки відкидаються. Файли обробляються задачами `taskloop`, а словники потоків об’єднуються власною редукцією. Вивести таблицю слів, час послідовної і паралельної обробки та перевірити збіг результатів.

```cpp
#include <omp.h>
#include <algorithm>
#include <cctype>
#include <filesystem>
#include <fstream>
#include <map>
#include <print>
#include <random>
#include <string>
#include <vector>

namespace fs = std::filesystem;
using Counts = std::map<std::string, long>;

// Злиття двох словників: сума лічильників однакових слів.
void Merge(Counts& into, const Counts& from)
{
    for (const auto& [word, n] : from) into[word] += n;
}

// Власна редукція: нейтральний елемент – порожній словник.
#pragma omp declare reduction(merge : Counts : \
    Merge(omp_out, omp_in)) initializer(omp_priv = Counts())

Counts CountFile(const fs::path& path)
{
    Counts counts;
    std::ifstream in(path);
    std::string word;
    while (in >> word)
    {
        std::erase_if(word, [](unsigned char c) {
            return !std::isalpha(c); });
        std::ranges::transform(word, word.begin(),
            [](unsigned char c) { return (char)std::tolower(c); });
        if (!word.empty()) ++counts[word];
    }
    return counts;
}

// Тестові файли: 200 файлів по 50 000 слів із зерном 7.
std::vector<fs::path> MakeFiles(const fs::path& dir)
{
    const std::vector<std::string> vocabulary = {
        "Thread", "task", "core", "cache", "memory,", "loop",
        "node.", "speed", "data", "OpenMP", "lock", "queue"};
    fs::create_directories(dir);
    std::mt19937 gen(7);
    std::vector<fs::path> files;
    for (int f = 0; f < 200; ++f)
    {
        fs::path path = dir / std::format("text{:03}.txt", f);
        std::ofstream out(path);
        std::uniform_int_distribution<int> pick(
            0, (int)vocabulary.size() - 1 - f % 3);
        for (int w = 0; w < 50'000; ++w)
            out << vocabulary[pick(gen)] << (w % 12 ? ' ' : '\n');
        files.push_back(path);
    }
    return files;
}

int main()
{
    std::vector<fs::path> files = MakeFiles("texts");
    long long count = (long long)files.size();
    for (const fs::path& path : files) CountFile(path); // прогрівання

    double start = omp_get_wtime();
    Counts serial;
    for (const fs::path& path : files) Merge(serial, CountFile(path));
    double t1 = omp_get_wtime() - start;

    start = omp_get_wtime();
    Counts total;
    #pragma omp parallel
    #pragma omp single
    #pragma omp taskloop grainsize(4) reduction(merge : total)
    for (long long i = 0; i < count; ++i)
        Merge(total, CountFile(files[i]));
    double tp = omp_get_wtime() - start;

    int column = 0;                        // по три слова в рядку
    for (const auto& [word, n] : total)
        std::print("{:<7}{:>7}{}", word, n,
                   ++column % 3 ? "   " : "\n");
    std::println("Файлів: {}, потоків: {}", count,
                 omp_get_max_threads());
    std::println("Послідовно {:.3f} с, taskloop {:.3f} с, S = {:.2f}",
                 t1, tp, t1 / tp);
    std::println("Результати збігаються: {}",
                 total == serial ? "так" : "ні");
}
```

Директива `declare reduction` описує, як об’єднати два словники (`omp_out` і `omp_in`) і чим ініціалізувати копію (`omp_priv`), а `taskloop` ділить 200 ітерацій на задачі по 4 файли (`grainsize(4)`) з власним словником `total` у кожній. Прогрівання (перший перегляд файлів) виключає з вимірювання завантаження файлів у кеш і перевірку антивірусом. Результат:

```
cache   912815   core    914349   data    911880
lock    584552   loop    914452   memory  914323
node    914180   openmp  913241   queue   281059
speed   913144   task    912504   thread  913501
Файлів: 200, потоків: 16
Послідовно 0.612 с, taskloop 0.065 с, S = 9.42
Результати збігаються: так
```

Загальна кількість слів дорівнює $200 \cdot 50 \, 000 = 10^{7}$. Слова `lock` і `queue` трапляються рідше, бо для частини файлів словник скорочено. Прискорення більше за 8 на 8 ядрах: розбір тексту мало звертається до пам’яті, і логічні процесори SMT дають додатковий виграш.

## Приклад 3. Нормалізація масиву: parallel for simd

Масив зросту людей (нормальний розподіл, середнє 170 см, відхилення 8 см, генератор із зерном 1) потрібно перетворити на z-оцінки $x' = (x - \overline{x}) / \sigma$. Порівняти звичайні цикли, `simd`, `parallel for` і `parallel for simd` для масивів із 2 і 20 мільйонів чисел `float` (мінімум із 10 запусків) і пояснити різницю.

```cpp
#include <omp.h>
#include <chrono>
#include <cmath>
#include <print>
#include <random>
#include <vector>

// Нормалізація (z-оцінка): x' = (x - середнє) / відхилення.
// Режими: 0 – звичайний цикл, 1 – simd, 2 – parallel for,
// 3 – parallel for simd.
void Normalize(const std::vector<float>& x, std::vector<float>& y,
               int mode)
{
    const long n = (long)x.size();
    const float* in = x.data();
    float* out = y.data();
    double sum = 0, sq = 0;
    if (mode == 0)
        for (long i = 0; i < n; ++i)
        { sum += in[i]; sq += (double)in[i] * in[i]; }
    else if (mode == 1)
        #pragma omp simd reduction(+:sum, sq)
        for (long i = 0; i < n; ++i)
        { sum += in[i]; sq += (double)in[i] * in[i]; }
    else if (mode == 2)
        #pragma omp parallel for reduction(+:sum, sq)
        for (long i = 0; i < n; ++i)
        { sum += in[i]; sq += (double)in[i] * in[i]; }
    else
        #pragma omp parallel for simd reduction(+:sum, sq)
        for (long i = 0; i < n; ++i)
        { sum += in[i]; sq += (double)in[i] * in[i]; }

    const float mean = (float)(sum / n);
    const double variance = sq / n - (sum / n) * (sum / n);
    const float inv = (float)(1.0 / std::sqrt(variance));
    if (mode == 0)
        for (long i = 0; i < n; ++i) out[i] = (in[i] - mean) * inv;
    else if (mode == 1)
        #pragma omp simd
        for (long i = 0; i < n; ++i) out[i] = (in[i] - mean) * inv;
    else if (mode == 2)
        #pragma omp parallel for
        for (long i = 0; i < n; ++i) out[i] = (in[i] - mean) * inv;
    else
        #pragma omp parallel for simd
        for (long i = 0; i < n; ++i) out[i] = (in[i] - mean) * inv;
}

int main()
{
    using Clock = std::chrono::steady_clock;
    const char* names[] = {"звичайний цикл", "omp simd",
                           "omp parallel for",
                           "omp parallel for simd"};
    std::println("Потоків: {}", omp_get_max_threads());
    for (long n : {2'000'000L, 20'000'000L})
    {
        std::mt19937 gen(1);
        std::normal_distribution<float> dist(170.0f, 8.0f);
        std::vector<float> x(n), y(n);
        for (float& v : x) v = dist(gen);

        std::println("n = {} ({} МБ на масив)", n, n * 4 / 1'000'000);
        double t0 = 0;
        for (int mode = 0; mode < 4; ++mode)
        {
            Normalize(x, y, mode);             // прогрівання
            double best = 1e9;
            for (int r = 0; r < 10; ++r)     // мінімум 10 запусків
            {
                auto start = Clock::now();
                Normalize(x, y, mode);
                std::chrono::duration<double, std::milli> t =
                    Clock::now() - start;
                best = std::min(best, t.count());
            }
            if (mode == 0) t0 = best;
            std::println("  {:<22} {:>6.2f} мс  S = {:>5.2f}  "
                         "y[0] = {:.5f}", names[mode], best,
                         t0 / best, y[0]);
        }
    }
}
```

Програму зібрано з ключами `-std=c++23 -O2 -march=native -fopenmp`, тобто з AVX-512 процесора i9-11900KF. Час вимірюється годинником `steady_clock`, бо `omp_get_wtime` у MinGW має роздільну здатність 1 мс. Результат:

```
Потоків: 16
n = 2000000 (8 МБ на масив)
  звичайний цикл           2.10 мс  S =  1.00  y[0] = 0.30578
  omp simd                 0.48 мс  S =  4.39  y[0] = 0.30578
  omp parallel for         0.57 мс  S =  3.66  y[0] = 0.30578
  omp parallel for simd    0.31 мс  S =  6.70  y[0] = 0.30578
n = 20000000 (80 МБ на масив)
  звичайний цикл          23.38 мс  S =  1.00  y[0] = 0.30660
  omp simd                 9.46 мс  S =  2.47  y[0] = 0.30660
  omp parallel for         7.44 мс  S =  3.14  y[0] = 0.30660
  omp parallel for simd    6.86 мс  S =  3.41  y[0] = 0.30660
```

У звичайному циклі компілятор мусить зберегти порядок додавання дійсних чисел, тому не може накопичувати суму в кількох елементах вектора одночасно. Директива `simd reduction` дозволяє переставляти доданки й прискорює програму вчетверо в одному потоці. Для масиву 8 МБ, який майже вміщується в кеш L3, поєднання потоків і векторизації дає найбільше прискорення. Для масиву 80 МБ усі паралельні варіанти впираються в пропускну здатність пам’яті, і прискорення не перевищує 3,5. Значення `y[0]` однакові в усіх варіантах.
