---
title: "Практика"
description: "Тема 13. Кластер і планувальник Slurm: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Гібридне завдання MPI + OpenMP

Створити гібридну програму, яка підраховує прості числа до $N = 2 \cdot 10^{7}$: процеси MPI ділять діапазон блоками по 100 000 чисел по черзі, а потоки OpenMP усередині процесу перевіряють числа блоку з динамічним розподілом (вартість перевірки різна). З аргументом `verbose` кожен ранг виводить кількість потоків, кількість доступних йому CPU і вузол. Написати скрипт завдання для трьох вузлів (по два ранги з двома потоками на вузлі) і порівняти на одному вузлі з 16 CPU розкладки «процеси × потоки» від 1 × 16 до 16 × 1.

```cpp
// Гібридна програма MPI + OpenMP: кількість простих чисел до N.
// Процеси MPI ділять діапазон блоками по черзі, потоки OpenMP
// усередині процесу – динамічно (вартість чисел різна).
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

    // Розміщення: вузол, потоки й доступні процесору CPU.
    char host[64];
    gethostname(host, sizeof host);
    cpu_set_t set;
    sched_getaffinity(0, sizeof set, &set);
    if (argc > 2)
        std::println("ранг {:>2}: {} потоків, {} CPU, вузол {}", rank,
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
        std::println("{:>2} x {:>2}: простих {}, час {:.3f} с", size,
                     omp_get_max_threads(), total, time);
    MPI_Finalize();
}
```

`MPI_Init_thread` з рівнем `MPI_THREAD_FUNNELED` повідомляє бібліотеці MPI, що в процесі працюють потоки, але функції MPI викликає лише головний потік. Блоки розподілено по черзі (ранг $r$ бере блоки $r , r + p , r + 2 p , \dots$), тому «дорогі» великі числа дістаються всім рангам порівну. Функція `sched_getaffinity` повертає набір процесорів, на яких процесу дозволено працювати: так видно, чи прив’язав Slurm задачу до виділених їй CPU. Програму збирають на вузлі `head`:

```bash
mpicxx -std=c++23 -O2 -fopenmp hybrid.cpp -o hybrid
```

Скрипт завдання для кластера: 3 вузли, 2 ранги на вузлі, 2 CPU на ранг, кількість потоків OpenMP дорівнює `SLURM_CPUS_PER_TASK`:

```bash
#!/bin/bash
#SBATCH --job-name=hybrid
#SBATCH --nodes=3
#SBATCH --ntasks-per-node=2
#SBATCH --cpus-per-task=2
#SBATCH --mem-per-cpu=500M
#SBATCH --time=00:10:00
#SBATCH --output=hybrid-%j.out

# Потоки OpenMP = CPU, виділені кожній задачі (рангу MPI).
export OMP_NUM_THREADS=$SLURM_CPUS_PER_TASK
echo "Вузли: $SLURM_JOB_NODELIST; рангів: $SLURM_NTASKS," \
     "потоків на ранг: $OMP_NUM_THREADS"
srun --mpi=pmix ./hybrid 20000000 verbose
```

Результат на тестовому кластері з контейнерів (час не показовий: усі «вузли» ділили чотири процесори ПК):

```
Вузли: node[01-03]; рангів: 6, потоків на ранг: 2
ранг  3: 2 потоків, 2 CPU, вузол node02
ранг  5: 2 потоків, 2 CPU, вузол node03
ранг  0: 2 потоків, 2 CPU, вузол node01
 6 x  2: простих 1270607, час 4.296 с
ранг  2: 2 потоків, 2 CPU, вузол node02
ранг  1: 2 потоків, 2 CPU, вузол node01
ранг  4: 2 потоків, 2 CPU, вузол node03
```

Кожен ранг бачить рівно 2 CPU: `srun` у скрипті успадкував `--cpus-per-task=2`, а `task/cgroup` і `task/affinity` обмежили задачу виділеними процесорами. Кількість простих чисел до $2 \cdot 10^{7}$ (1 270 607) збігається з послідовною версією.

**Порівняння розкладок.** На одному вузлі з 16 CPU (WSL на навчальному ПК) скрипт в одному виділенні `--exclusive` запускає кроки з різними розкладками, для кожної – прогрівання й 5 вимірювань:

```bash
#!/bin/bash
#SBATCH --job-name=hybrid-scan
#SBATCH --nodes=1
#SBATCH --exclusive
#SBATCH --time=00:20:00
#SBATCH --output=scan-%j.out

# Усі розкладки «процеси x потоки» на 16 CPU одного вузла.
N=${1:-20000000}
for layout in "1 1" "1 16" "2 8" "4 4" "8 2" "16 1" "8 1" "4 2"; do
    set -- $layout
    export OMP_NUM_THREADS=$2
    for run in 1 2 3 4 5 6; do          # 1-й запуск – прогрівання
        srun --mpi=pmix -n $1 -c $2 ./hybrid $N
    done
done
```

Медіани часу для кожної розкладки (кількість простих чисел у всіх запусках – 1 270 607):

```
розкладка  CPU   час, с      S
  1 x  1     1   10,083   1,00
  1 x 16    16    1,759   5,73
  2 x  8    16    1,444   6,98
  4 x  4    16    1,367   7,38
  8 x  2    16    1,338   7,54
 16 x  1    16    1,335   7,55
  8 x  1     8    1,883   5,35
  4 x  2     8    1,795   5,62
```

Таблицю складено з файлу `scan-<номер>.out` (48 рядків виводу програми). У повторній серії через кілька хвилин розкладка 1 × 16 дала 2,639 с, а решта розкладок – у межах 6 % від наведених значень. Висновки:

- найповільніша розкладка – один процес із 16 потоками: кожен блок із 100 000 чисел закінчується неявним бар’єром паралельного циклу, і в кінці блоку частина потоків чекає на найповільніший; коли рангів кілька, блоки різних рангів обробляються незалежно, і простої перекриваються;
- розкладки 4 × 4, 8 × 2 і 16 × 1 дають майже однаковий час: на одному вузлі обмін між рангами (один виклик `MPI_Reduce`) нічого не коштує;
- 16 CPU замість 8 (логічні процесори SMT) прискорюють програму лише в 1,4 раза.

На кластері з кількох вузлів гібридна розкладка зменшує кількість процесів MPI і повідомлень між вузлами, тому її перевага проявляється в програмах з інтенсивним обміном (тема 12), а для цієї задачі різниця між розкладками залишиться малою.

## Приклад 2. Ланцюжок завдань: підготовка → обчислення → звіт

Побудувати конвеєр із трьох залежних завдань. Завдання `prepare` генерує 4 файли по 250 000 вимірювань температури (CSV, генератор `awk` із зерном – номером файлу). Масив `compute` з 4 елементів обчислює для свого файлу кількість, середнє, мінімум і максимум, а завдання `report` будує зведену таблицю. Кожне наступне завдання стартує лише після **успішного** завершення попереднього. Аргумент скрипту запуску – номер файлу, який `prepare` пропускає: так перевіряють поведінку ланцюжка під час збою.

```bash
#!/bin/bash
#SBATCH --job-name=prepare
#SBATCH --ntasks=1
#SBATCH --time=00:02:00
#SBATCH --output=logs/%x-%j.out

# Етап 1: 4 файли по 250 000 вимірювань температури (зерно = номер).
# Аргумент – номер частини, яку пропустити (імітація збою).
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

# Етап 2: статистика однієї частини (елемент масиву = номер файлу).
PART=$SLURM_ARRAY_TASK_ID
FILE=data/part-$PART.csv
if [ ! -s "$FILE" ]; then
    echo "Немає файлу $FILE" >&2
    exit 2
fi
mkdir -p results
awk -F, -v part=$PART '
    NR == 1 { min = max = $2 }
    { sum += $2; if ($2 < min) min = $2; if ($2 > max) max = $2 }
    END { printf "%d %d %.3f %.2f %.2f\n", part, NR, sum / NR,
                 min, max }' "$FILE" > results/part-$PART.txt
echo "Частину $PART оброблено на $(hostname)"
```

```bash
#!/bin/bash
#SBATCH --job-name=report
#SBATCH --ntasks=1
#SBATCH --time=00:02:00
#SBATCH --output=logs/%x-%j.out

# Етап 3: зведена таблиця за результатами всіх частин.
echo "частина         N   середнє     мін    макс"
sort -n results/part-*.txt | awk '
    { printf "%-8s %8d %9.3f %7.2f %7.2f\n", $1, $2, $3, $4, $5
      n += $2; s += $2 * $3 }
    END { printf "усього   %8d %9.3f\n", n, s / n }'
```

Скрипт `submit.sh` надсилає три завдання з умовами `afterok` і показує чергу. Ключ `--parsable` змушує `sbatch` вивести лише номер завдання, а `set -e` зупиняє скрипт, якщо `sbatch` повідомив про помилку:

```bash
#!/bin/bash
# Ланцюжок завдань: підготовка -> обчислення (масив) -> звіт.
set -e
mkdir -p logs
prep=$(sbatch --parsable prepare.sbatch "$@")
comp=$(sbatch --parsable --dependency=afterok:$prep compute.sbatch)
rep=$(sbatch --parsable --dependency=afterok:$comp report.sbatch)
echo "prepare=$prep compute=$comp report=$rep"
squeue -u "$USER" -o "%.8i %.8j %.25E %R"
```

Каталог `logs` створюється до надсилання, бо Slurm відкриває файли виводу ще до запуску скрипту. Результат на тестовому кластері (користувач `ivan`): стовпець `DEPENDENCY` (`%E`) показує невиконані умови, а для масиву умова стосується всіх елементів (`88_*`):

```
$ ./submit.sh
prepare=87 compute=88 report=89
   JOBID     NAME                DEPENDENCY NODELIST(REASON)
      89   report afterok:88_*(unfulfilled) (Dependency)
88_[1-4]  compute   afterok:87(unfulfilled) (None)
      87  prepare                    (null) (None)
$ cat logs/compute-88_2.out
Частину 2 оброблено на node01
$ cat logs/report-89.out
частина         N   середнє     мін    макс
1          250000    19.994   15.02   24.98
2          250000    20.006   15.02   24.99
3          250000    19.998   15.01   24.98
4          250000    19.997   15.01   24.99
усього    1000000    19.999
```

Середнє кожного файлу близьке до 20 °C, а крайні значення – до 15 і 25 °C, як і має бути для суми двох рівномірних випадкових величин. Запуск зі збоєм (файл 3 не створено):

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
Немає файлу data/part-3.csv
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

Елемент `94_3` завершився з кодом 2, тому умова `afterok` для `report` уже не може виконатися: завдання назавжди залишається в черзі з причиною `DependencyNeverSatisfied`, і його скасовують командою `scancel 95`. Щоб звіт будувався й за часткових результатів, для нього задають `afterany`, а щоб Slurm сам скасовував такі завдання, – `--kill-on-invalid-dep=yes`.

## Приклад 3. Звіт використання кластера за даними sacct

Створити консольну програму C# (.NET 10), яка читає вивід `sacct --parsable2` з файлу, заданого аргументом (без аргументу – сама запускає `sacct`), і виводить для кожної пари «користувач – рахунок» кількість завдань, частку успішних, середню кількість CPU на завдання, використаний час CPU в годинах і середнє очікування в черзі, а також кількість завдань у кожному стані. Рядки кроків (`123.batch`, `123.0`) не враховувати.

Проєкт створюють командою `dotnet new console -n SacctReport` (або в Rider) і замінюють вміст `Program.cs`:

```cs
// Звіт використання кластера за виводом sacct --parsable2.
// Використання: SacctReport <файл> або SacctReport (запуск sacct).
using System.Diagnostics;
using System.Globalization;

const string Fields = "JobID,User,Account,State,AllocCPUS," +
                      "ElapsedRaw,CPUTimeRAW,Submit,Start";

string[] lines = args.Length > 0
    ? File.ReadAllLines(args[0])
    : RunSacct($"--allusers --parsable2 --format={Fields}");

// Перший рядок – заголовок: індекси полів за назвами.
string[] header = lines[0].Split('|');
int Col(string name) => Array.IndexOf(header, name);
int id = Col("JobID"), user = Col("User"), acc = Col("Account"),
    state = Col("State"), cpus = Col("AllocCPUS"),
    cpuTime = Col("CPUTimeRAW"), submit = Col("Submit"),
    start = Col("Start");

// Лише завдання: рядки кроків (123.batch, 123.0) мають крапку.
var jobs = lines.Skip(1)
    .Select(l => l.Split('|'))
    .Where(f => f.Length == header.Length && !f[id].Contains('.'))
    .Select(f => new Job(f[user], f[acc], f[state].Split(' ')[0],
        int.Parse(f[cpus]), long.Parse(f[cpuTime]),
        Wait(f[submit], f[start])))
    .ToList();

Console.WriteLine($"Завдань: {jobs.Count}");
Console.WriteLine($"{"Користувач",-11}{"Рахунок",-9}{"Завд.",6}" +
    $"{"Успішні",9}{"CPU/з.",7}{"CPU·год",9}{"Очік., с",9}");
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
Console.WriteLine($"{"Разом",-20}{jobs.Count,6}{"",16}" +
                  $"{jobs.Sum(j => j.CpuSec) / 3600.0,9:F3}");

Console.WriteLine("Стани завдань:");
foreach (var s in jobs.GroupBy(j => j.State).OrderBy(s => s.Key))
    Console.WriteLine($"  {s.Key,-14}{s.Count(),4}");

// Очікування в черзі: Start – Submit (для PENDING Start = Unknown).
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

Індекси стовпців шукаються за назвами із заголовка, тому порядок полів у `--format` може бути довільним. Стан `CANCELLED by 2001` скорочується до першого слова, а рядок `Unknown` у полі `Start` (завдання ще чекає) не розбирається як дата, і очікування вважається нульовим. На вузлі `head` з .NET SDK (`dotnet-sdk-10.0`) програма запускає `sacct` сама; у Windows їй передають файл, збережений на кластері:

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

Результат `dotnet run -c Release -- sacct.txt` для журналу тестового кластера за 50 хвилин (усі завдання цієї теми; елементи масивів – окремі завдання):

```
Завдань: 83
Користувач Рахунок   Завд.  Успішні CPU/з.  CPU·год Очік., с
olena      physics       7      43%    4,6    0,681     42,9
student    lab          34      82%    4,1    0,595     14,2
ivan       lab          42      90%    2,1    0,408      4,4
Разом                   83                    1,683
Стани завдань:
  CANCELLED        6
  COMPLETED       69
  FAILED           5
  NODE_FAIL        1
  OUT_OF_MEMORY    1
  TIMEOUT          1
```

Числа виведено з десятковою комою, бо програма використовує регіональні налаштування Windows (українська мова). Користувачка `olena` запустила найменше завдань, але використала найбільше часу CPU: її завдання займали всі три вузли (`big-A`) і мали найдовше очікування. Рядок кроку `1.0` зі станом `NODE_FAIL` відфільтровано, тому стан `NODE_FAIL` має лише завдання 48.
