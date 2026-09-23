---
title: "Практика"
description: "Тема 12. Передавання повідомлень MPI: розібрані приклади"
outline: [2, 3]
---

# Практика

Приклади збираються одним проєктом CMake, як у лекції (цикл `foreach` для назв `mandel`, `stats`, `life` з `MPI::MPI_CXX`), і запускаються в Ubuntu (WSL2) командою `mpirun -np N ./build/<назва>`; для 16 процесів на 8 ядрах додається `--use-hwthread-cpus`.

## Приклад 1. «Майстер–робітник» для множини Мандельброта

Обчислити кількість ітерацій для кожної точки зображення 2400×1600 множини Мандельброта (не більше 2000 ітерацій на точку) двома способами: статичним поділом рядків на суміжні блоки і за схемою «майстер–робітник», у якій ранг 0 видає робітникам номери рядків по одному в міру звільнення. Спосіб задає аргумент `static` або `dynamic`. Вивести час, відношення часу роботи найшвидшого й найповільнішого робітника, загальну кількість ітерацій для перевірки та найменшу й найбільшу кількість рядків, оброблених одним робітником.

```cpp
#include <mpi.h>
#include <algorithm>
#include <print>
#include <string_view>
#include <vector>

// Множина Мандельброта: статичний розподіл рядків або «майстер–
// робітник» з динамічним розподілом. Аргумент: static | dynamic.
const int Width = 2400, Height = 1600, MaxIter = 2000;
const int TagWork = 1, TagStop = 2;

// Кількість ітерацій для кожної точки рядка y.
void Row(int y, std::vector<int>& out)
{
    double ci = -1.0 + 2.0 * y / Height;
    for (int x = 0; x < Width; ++x)
    {
        double cr = -2.2 + 3.0 * x / Width, zr = 0, zi = 0;
        int k = 0;
        while (k < MaxIter && zr * zr + zi * zi <= 4.0)
        {
            double t = zr * zr - zi * zi + cr;
            zi = 2 * zr * zi + ci;
            zr = t;
            ++k;
        }
        out[x] = k;
    }
}

long long Sum(const std::vector<int>& v)
{
    long long s = 0;
    for (int k : v) s += k;
    return s;
}

// Майстер (ранг 0) роздає номери рядків і збирає результати.
long long Master(int size, std::vector<int>& rowsDone)
{
    std::vector<int> row(Width + 1);      // [0] – номер рядка
    int next = 0, active = 0;
    long long total = 0;
    for (int w = 1; w < size; ++w)        // перше завдання кожному
    {
        MPI_Send(&next, 1, MPI_INT, w, TagWork, MPI_COMM_WORLD);
        ++next;
        ++active;
    }
    while (active > 0)
    {
        MPI_Status status;                // від будь-якого робітника
        MPI_Recv(row.data(), Width + 1, MPI_INT, MPI_ANY_SOURCE,
                 TagWork, MPI_COMM_WORLD, &status);
        int worker = status.MPI_SOURCE;
        ++rowsDone[worker];
        for (int x = 1; x <= Width; ++x) total += row[x];
        if (next < Height)                // ще є рядки – новий
        {
            MPI_Send(&next, 1, MPI_INT, worker, TagWork,
                     MPI_COMM_WORLD);
            ++next;
        }
        else                              // рядків немає – стоп
        {
            MPI_Send(&next, 0, MPI_INT, worker, TagStop,
                     MPI_COMM_WORLD);
            --active;
        }
    }
    return total;
}

// Робітник отримує номер рядка, доки не прийде тег TagStop.
int Worker()
{
    std::vector<int> row(Width + 1), values(Width);
    int done = 0;
    while (true)
    {
        MPI_Status status;
        MPI_Recv(&row[0], 1, MPI_INT, 0, MPI_ANY_TAG, MPI_COMM_WORLD,
                 &status);
        if (status.MPI_TAG == TagStop) return done;
        Row(row[0], values);
        std::copy(values.begin(), values.end(), row.begin() + 1);
        MPI_Send(row.data(), Width + 1, MPI_INT, 0, TagWork,
                 MPI_COMM_WORLD);
        ++done;
    }
}

int main(int argc, char* argv[])
{
    MPI_Init(&argc, &argv);
    int rank = 0, size = 0;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);
    bool dynamic = argc > 1 && std::string_view(argv[1]) == "dynamic";
    if (dynamic && size < 2)
    {
        if (rank == 0)
            std::println(stderr, "Потрібно щонайменше 2 ранги");
        MPI_Abort(MPI_COMM_WORLD, 1);
    }

    MPI_Barrier(MPI_COMM_WORLD);
    double start = MPI_Wtime(), busy = 0;   // busy – час роботи рангу
    long long total = 0;
    std::vector<int> rowsDone(size, 0);
    if (dynamic)
    {
        if (rank == 0) total = Master(size, rowsDone);
        else rowsDone[rank] = Worker();
        busy = MPI_Wtime() - start;
    }
    else
    {   // Статично: ранг r обчислює суміжний блок рядків.
        std::vector<int> values(Width);
        long long local = 0;
        int begin = rank * Height / size;
        int end = (rank + 1) * Height / size;
        for (int y = begin; y < end; ++y)
        {
            Row(y, values);
            local += Sum(values);
        }
        rowsDone[rank] = end - begin;
        busy = MPI_Wtime() - start;
        MPI_Reduce(&local, &total, 1, MPI_LONG_LONG, MPI_SUM, 0,
                   MPI_COMM_WORLD);
    }

    std::vector<double> busyAll(size);
    MPI_Gather(&busy, 1, MPI_DOUBLE, busyAll.data(), 1, MPI_DOUBLE, 0,
               MPI_COMM_WORLD);
    MPI_Allreduce(MPI_IN_PLACE, rowsDone.data(), size, MPI_INT,
                  MPI_MAX, MPI_COMM_WORLD);
    if (rank == 0)
    {   // Робітники: усі ранги (static) або ранги 1…size-1 (dynamic).
        int first = dynamic ? 1 : 0, rowsLo = Height, rowsHi = 0;
        double hi = 0, lo = 1e9;
        for (int r = first; r < size; ++r)
        {
            hi = std::max(hi, busyAll[r]);
            lo = std::min(lo, busyAll[r]);
            rowsLo = std::min(rowsLo, rowsDone[r]);
            rowsHi = std::max(rowsHi, rowsDone[r]);
        }
        std::println("{:<7} {:>2} {:>7.3f} {:>9.2f} {:>11} {:>5}–{}",
                     dynamic ? "dynamic" : "static", size, hi,
                     lo / hi, total, rowsLo, rowsHi);
    }
    MPI_Finalize();
}
```

Майстер спочатку дає кожному робітникові по рядку, а потім у циклі приймає готовий рядок від **будь-якого** робітника (`MPI_ANY_SOURCE`) і за полем `status.MPI_SOURCE` надсилає саме йому наступний номер. Номер рядка передається в елементі 0 того самого повідомлення, тому майстрові не потрібно пам’ятати, хто що обчислює. Коли рядків не залишилося, робітник отримує порожнє повідомлення з тегом `TagStop`: у `MPI_Recv` робітника вказано `MPI_ANY_TAG`, а вид повідомлення визначається за `status.MPI_TAG`. Програму запущено для 1–16 процесів (стовпці: спосіб, процеси, час, $T_{\text{min}} / T_{\text{max}}$, ітерації, рядків на робітника):

```bash
for np in 1 2 4 8 16; do
    opts=""; [ $np -gt 8 ] && opts="--use-hwthread-cpus"
    mpirun -np $np $opts ./build/mandel static
    [ $np -gt 1 ] && mpirun -np $np $opts ./build/mandel dynamic
done
```

```
static   1   5.608      1.00  1955911157  1600–1600
static   2   2.830      1.00  1955911157   800–800
dynamic  2   5.631      1.00  1955911157  1600–1600
static   4   2.381      0.20  1955911157   400–400
dynamic  4   1.946      1.00  1955911157   525–545
static   8   1.461      0.05  1955911157   200–200
dynamic  8   0.842      1.00  1955911157   224–232
static  16   0.885      0.00  1955911157   100–100
dynamic 16   0.419      1.00  1955911157    97–110
```

Кількість ітерацій однакова в усіх запусках, отже, кожен рядок обчислено рівно один раз. Зі статичним поділом рядки середини зображення (які перетинають множину) дістаються кільком рангам, і на 8 процесах найшвидший ранг працює лише 5 % часу найповільнішого, тож прискорення – 3,8. «Майстер–робітник» вирівнює навантаження ($T_{\text{min}} / T_{\text{max}} = 1 {,} 00$): на 8 процесах із 7 робітниками прискорення 6,7, на 16 – 13,4. Ціна схеми – майстер, який майже не обчислює: з 2 процесами працює лише один робітник, і час такий самий, як послідовний. Кількість рядків у робітників різна (224–232), бо кожен отримує нове завдання, щойно звільниться. Відправлення рядка з 2401 цілого числа (9,6 КБ) займає мікросекунди, а обчислення рядка – мілісекунди, тож на кластері схема працює так само; для дрібніших завдань видають кілька рядків за раз.

## Приклад 2. Статистика масиву частинами різного розміру

Ранг 0 генерує $n$ показів лічильників електроенергії (гамма-розподіл із середнім 240 кВт·год, генератор із зерном 2026; $n$ задає аргумент, за замовчуванням 10 000 003 – не ділиться на кількість процесів). Розподілити масив між процесами операцією `MPI_Scatterv`, обчислити середнє, стандартне відхилення, мінімум і максимум, перетворити значення на z-оцінки $z = (x - \overline{x}) / \sigma$ і зібрати їх на ранзі 0 операцією `MPI_Gatherv`. Вивести розміри частин, статистику й перевірку: середнє z-оцінок має дорівнювати 0, дисперсія – 1.

```cpp
#include <mpi.h>
#include <algorithm>
#include <cmath>
#include <cstdlib>
#include <print>
#include <random>
#include <vector>

// Статистика показів лічильників (кВт·год) нерівними частинами:
// MPI_Scatterv роздає частини, MPI_Allreduce дає суми, MPI_Gatherv
// збирає нормалізований масив. Аргумент: кількість значень n.
int main(int argc, char* argv[])
{
    MPI_Init(&argc, &argv);
    int rank = 0, size = 0;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    long long n = argc > 1 ? std::atoll(argv[1]) : 10'000'003;
    if (n < size || n > 1'000'000'000)
    {
        if (rank == 0)
            std::println(stderr, "n має бути від {} до 10^9", size);
        MPI_Finalize();
        return 1;
    }
    // Розміри частин і зміщення: перші n % size рангів – на 1 більше.
    std::vector<int> counts(size), displs(size);
    for (int r = 0, offset = 0; r < size; ++r)
    {
        counts[r] = int(n / size + (r < n % size ? 1 : 0));
        displs[r] = offset;
        offset += counts[r];
    }

    std::vector<double> all;                   // лише на ранзі 0
    if (rank == 0)
    {
        all.resize(n);
        std::mt19937_64 gen(2026);
        std::gamma_distribution<double> kwh(4.0, 60.0);
        for (double& x : all) x = kwh(gen);
    }
    std::vector<double> part(counts[rank]);
    double start = MPI_Wtime();
    MPI_Scatterv(all.data(), counts.data(), displs.data(), MPI_DOUBLE,
                 part.data(), counts[rank], MPI_DOUBLE, 0,
                 MPI_COMM_WORLD);

    // Сума, мінімум і максимум частини, потім – для всього масиву.
    double sum = 0;
    for (double x : part) sum += x;
    auto [lo, hi] = std::ranges::minmax(part);
    double minMax[2] = {-lo, hi};              // max(-x) = -min(x)
    MPI_Allreduce(MPI_IN_PLACE, &sum, 1, MPI_DOUBLE, MPI_SUM,
                  MPI_COMM_WORLD);
    MPI_Allreduce(MPI_IN_PLACE, minMax, 2, MPI_DOUBLE, MPI_MAX,
                  MPI_COMM_WORLD);
    const double mean = sum / n;

    double sq = 0;                             // другий прохід
    for (double x : part) sq += (x - mean) * (x - mean);
    MPI_Allreduce(MPI_IN_PLACE, &sq, 1, MPI_DOUBLE, MPI_SUM,
                  MPI_COMM_WORLD);
    const double sigma = std::sqrt(sq / n);

    for (double& x : part) x = (x - mean) / sigma;   // z-оцінки
    MPI_Gatherv(part.data(), counts[rank], MPI_DOUBLE, all.data(),
                counts.data(), displs.data(), MPI_DOUBLE, 0,
                MPI_COMM_WORLD);
    double time = MPI_Wtime() - start;

    if (rank == 0)
    {
        std::print("n = {}, частини:", n);
        for (int c : counts) std::print(" {}", c);
        std::println("");
        std::println("середнє {:.3f}, σ = {:.3f}, мін. {:.3f}, "
                     "макс. {:.3f} кВт·год", mean, sigma, -minMax[0],
                     minMax[1]);
        // Перевірка: середнє z-оцінок ≈ 0, дисперсія ≈ 1.
        double zs = 0, zq = 0;
        for (double z : all) { zs += z; zq += z * z; }
        std::println("z: середнє {:.1e}, дисперсія {:.6f}; "
                     "час {:.3f} с", zs / n, zq / n, time);
    }
    MPI_Finalize();
}
```

Масиви `counts` і `displs` однакові в усіх процесах: кожен рахує їх сам, тому розсилати їх не потрібно. Операції `MPI_MIN` і `MPI_MAX` об’єднано в один виклик `MPI_Allreduce` з `MPI_MAX`: максимум від $- x$ дорівнює мінімуму $x$ зі зміненим знаком. Стандартне відхилення обчислюється в два проходи (спочатку середнє, потім сума квадратів відхилень), що точніше за формулу $\overline{x^{2}} - \overline{x}^{2}$. Результат для 1, 3 і 4 процесів:

```
n = 10000003, частини: 10000003
середнє 239.991, σ = 120.035, мін. 2.391, макс. 1597.388 кВт·год
z: середнє -9.3e-14, дисперсія 1.000000; час 0.053 с
n = 10000003, частини: 3333335 3333334 3333334
середнє 239.991, σ = 120.035, мін. 2.391, макс. 1597.388 кВт·год
z: середнє 4.9e-14, дисперсія 1.000000; час 0.035 с
n = 10000003, частини: 2500001 2500001 2500001 2500000
середнє 239.991, σ = 120.035, мін. 2.391, макс. 1597.388 кВт·год
z: середнє 4.4e-14, дисперсія 1.000000; час 0.032 с
```

Статистика не залежить від кількості процесів, а залишок $n \bmod p$ отримують перші ранги. Похибка середнього z-оцінок – $10^{- 14}$ і змінюється з кількістю процесів, бо змінюється порядок додавання. Прискорення тут немає сенсу вимірювати: розсилання 80 МБ даних з рангу 0 триває довше за обчислення, яке займає один прохід по масиву. У реальних задачах кожен ранг читає свою частину файлу сам (MPI-IO, <https://docs.open-mpi.org/en/v5.0.x/tuning-apps/mpi-io/index.html>).

## Приклад 3. Гра «Життя» в декартовій топології

Змоделювати гру «Життя» Конвея на торі $N \times N$ клітин ($N$ і кількість поколінь – аргументи, за замовчуванням 2400 і 500). Процеси утворюють двовимірну періодичну декартову топологію; кожен процес зберігає блок з рамкою гало шириною 1 і перед кожним поколінням обмінюється з чотирма сусідами рядками та стовпцями (стовпець – похідний тип `MPI_Type_vector`). Початковий стан кожної клітини обчислюється хеш-функцією від її глобальних координат, тому не залежить від кількості процесів. Вивести решітку процесів, розмір блоку, час, час обмінів і кількість живих клітин наприкінці.

```cpp
#include <mpi.h>
#include <cstdint>
#include <cstdlib>
#include <print>
#include <vector>

// Гра «Життя» на торі N × N у декартовій топології rows × cols.
// Кожен ранг має блок h × w з рамкою гало шириною 1.
// Аргументи: N, кількість поколінь.
int main(int argc, char* argv[])
{
    MPI_Init(&argc, &argv);
    int size = 0;
    MPI_Comm_size(MPI_COMM_WORLD, &size);
    const int N = argc > 1 ? std::atoi(argv[1]) : 2400;
    const int generations = argc > 2 ? std::atoi(argv[2]) : 500;

    // Решітка процесів: MPI_Dims_create підбирає, напр., 4 = 2 × 2.
    int dims[2] = {0, 0}, periods[2] = {1, 1}, coords[2];
    MPI_Dims_create(size, 2, dims);
    MPI_Comm grid;
    MPI_Cart_create(MPI_COMM_WORLD, 2, dims, periods, 1, &grid);
    int rank = 0;
    MPI_Comm_rank(grid, &rank);                // після reorder
    MPI_Cart_coords(grid, rank, 2, coords);
    if (N % dims[0] != 0 || N % dims[1] != 0)
    {
        if (rank == 0)
            std::println(stderr, "N має ділитися на {} і {}", dims[0],
                         dims[1]);
        MPI_Abort(grid, 1);
    }
    const int h = N / dims[0], w = N / dims[1], W = w + 2;
    auto at = [W](int i, int j) { return i * W + j; };

    // Сусіди: вгору/вниз (вимір 0), ліворуч/праворуч (вимір 1).
    int up, down, left, right;
    MPI_Cart_shift(grid, 0, 1, &up, &down);
    MPI_Cart_shift(grid, 1, 1, &left, &right);

    // Стовпець разом із двома клітинами гало: h + 2 числа з кроком W.
    MPI_Datatype column;
    MPI_Type_vector(h + 2, 1, W, MPI_UINT8_T, &column);
    MPI_Type_commit(&column);

    // Початковий стан залежить лише від глобальних координат клітини,
    // тому не залежить від кількості процесів.
    std::vector<std::uint8_t> a((h + 2) * W, 0), b = a;
    for (int i = 1; i <= h; ++i)
        for (int j = 1; j <= w; ++j)
        {
            std::uint64_t g = std::uint64_t(coords[0] * h + i - 1) * N
                              + coords[1] * w + j - 1;
            g = (g ^ (g >> 30)) * 0xBF58476D1CE4E5B9ULL; // хеш
            g = (g ^ (g >> 27)) * 0x94D049BB133111EBULL; // splitmix
            a[at(i, j)] = (g >> 60) < 5;           // ~31 % живих
        }

    MPI_Barrier(grid);
    double start = MPI_Wtime(), commTime = 0;
    for (int gen = 0; gen < generations; ++gen)
    {
        double c = MPI_Wtime();
        // 1) Рядки: перший – вгору, останній – вниз (без кутів).
        MPI_Sendrecv(&a[at(1, 1)], w, MPI_UINT8_T, up, 0,
                     &a[at(h + 1, 1)], w, MPI_UINT8_T, down, 0,
                     grid, MPI_STATUS_IGNORE);
        MPI_Sendrecv(&a[at(h, 1)], w, MPI_UINT8_T, down, 1,
                     &a[at(0, 1)], w, MPI_UINT8_T, up, 1,
                     grid, MPI_STATUS_IGNORE);
        // 2) Стовпці разом із рядками гало – так передаються й кути.
        MPI_Sendrecv(&a[at(0, 1)], 1, column, left, 2,
                     &a[at(0, w + 1)], 1, column, right, 2,
                     grid, MPI_STATUS_IGNORE);
        MPI_Sendrecv(&a[at(0, w)], 1, column, right, 3,
                     &a[at(0, 0)], 1, column, left, 3,
                     grid, MPI_STATUS_IGNORE);
        commTime += MPI_Wtime() - c;

        for (int i = 1; i <= h; ++i)
            for (int j = 1; j <= w; ++j)
            {
                int n = a[at(i - 1, j - 1)] + a[at(i - 1, j)]
                      + a[at(i - 1, j + 1)] + a[at(i, j - 1)]
                      + a[at(i, j + 1)] + a[at(i + 1, j - 1)]
                      + a[at(i + 1, j)] + a[at(i + 1, j + 1)];
                b[at(i, j)] = n == 3 || (n == 2 && a[at(i, j)]);
            }
        a.swap(b);
    }
    double time = MPI_Wtime() - start;

    long long alive = 0, total = 0;
    for (int i = 1; i <= h; ++i)
        for (int j = 1; j <= w; ++j) alive += a[at(i, j)];
    MPI_Reduce(&alive, &total, 1, MPI_LONG_LONG, MPI_SUM, 0, grid);
    double times[2] = {time, commTime}, slowest[2];
    MPI_Reduce(times, slowest, 2, MPI_DOUBLE, MPI_MAX, 0, grid);
    if (rank == 0)
        std::println("{:>2} = {} x {}  блок {} x {} {:>7.3f} {:>7.3f}"
                     "  живих {}", size, dims[0], dims[1], h, w,
                     slowest[0], slowest[1], total);
    MPI_Type_free(&column);
    MPI_Comm_free(&grid);
    MPI_Finalize();
}
```

Кути гало передаються без окремих повідомлень діагональним сусідам: спочатку процеси обмінюються рядками, а потім стовпцями **разом із рядками гало** (тип `column` має $h + 2$ елементи), тож кутові клітини, щойно отримані від верхнього й нижнього сусідів, потрапляють до лівого й правого. Попередня версія програми з $h$ елементами в типі давала на 1 і 4 процесах різну кількість живих клітин – типова помилка, яку виявляє порівняння з послідовною програмою. Результат (медіана 3 запусків):

```
$ for np in 1 2 4 8; do mpirun -np $np ./build/life; done
$ mpirun -np 16 --use-hwthread-cpus ./build/life
 1 = 1 x 1  блок 2400 x 2400   7.013   0.030  живих 311564
 2 = 2 x 1  блок 1200 x 2400   3.886   0.040  живих 311564
 4 = 2 x 2  блок 1200 x 1200   2.373   0.372  живих 311564
 8 = 4 x 2  блок 600 x 1200   1.349   0.236  живих 311564
16 = 4 x 4  блок 600 x 600   1.229   0.561  живих 311564
```

Кількість живих клітин однакова для всіх решіток процесів і збігається з результатом окремої послідовної програми. `MPI_Dims_create` обрала решітки 2×1, 2×2, 4×2 і 4×4. Прискорення на 8 процесах – 5,2: обчислення клітини значно важче за обмін (обмінюються лише краї блоку по 600–1200 байтів), але ранги синхронізуються на кожному поколінні, тому затримка одного рангу затримує сусідів – це видно за часом обмінів, який на 4 процесах більший, ніж на 8. Шістнадцять процесів на логічних процесорах SMT майже нічого не додають (5,7), а час обмінів зростає вдвічі.
