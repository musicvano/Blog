---
title: "Приклади та типові помилки"
description: "Тема 2. Процеси та потоки: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

Усі приклади виконано в конфігурації *Release* з .NET SDK 10.0.401 на процесорі Intel Core i9-11900KF (8 ядер, 16 логічних процесорів) у Windows 11. Час виконання на інших комп’ютерах і навіть між запусками відрізняється, а порядок рядків, які виводять різні потоки, може бути іншим.

### Робітники

Програма створює чотири іменовані потоки з різною «тривалістю роботи», показує стани потоку до `Start`, після `Start` і після `Join`, а наприкінці запускає фоновий потік із нескінченним циклом.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Thread main = Thread.CurrentThread;
main.Name = "Main";
Console.WriteLine(
    $"{main.Name}: id={main.ManagedThreadId}, " +
    $"фоновий={main.IsBackground}");

int[] delays = [400, 100, 300, 200];      // «тривалість роботи», мс
string[] reports = new string[delays.Length];
Thread[] workers = new Thread[delays.Length];

for (int i = 0; i < workers.Length; i++)
{
    int index = i;                        // копія для лямбди
    workers[i] = new Thread(
        () => reports[index] = Work(delays[index]))
    {
        Name = $"Worker {i + 1}",
    };
}
Console.WriteLine($"До Start: {workers[0].ThreadState}");

foreach (Thread worker in workers) worker.Start();
Console.WriteLine($"Після Start: {workers[0].ThreadState}");

foreach (Thread worker in workers) worker.Join();  // очікування
Console.WriteLine($"Після Join: {workers[0].ThreadState}");
foreach (string report in reports) Console.WriteLine(report);

// Фоновий потік не утримує процес: нескінченний цикл
// завершиться разом із процесом.
Thread heartbeat = new(() =>
{
    while (true) Thread.Sleep(50);
})
{ Name = "Heartbeat", IsBackground = true };
heartbeat.Start();
Console.WriteLine(
    $"{heartbeat.Name}: фоновий={heartbeat.IsBackground}");
Console.WriteLine("Main завершується");

static string Work(int delayMs)
{
    Thread me = Thread.CurrentThread;
    Console.WriteLine($"  {me.Name} почав (id={me.ManagedThreadId})");
    Thread.Sleep(delayMs);                // імітація роботи
    Console.WriteLine($"  {me.Name} завершив");
    return $"{me.Name}: {delayMs} мс, пул={me.IsThreadPoolThread}";
}
```

Стан одразу після `Start` залежить від того, чи встиг перший потік дійти до `Thread.Sleep`: `Running` або `WaitSleepJoin`. Кожен потік записує звіт у свій елемент масиву `reports`, тому основний потік читає звіти після `Join` без синхронізації. Рядки «почав» і «завершив» перемішуються: потоки працюють одночасно, і першим завершується потік із найкоротшою затримкою. Фоновий потік `Heartbeat` не заважає завершенню процесу – програма закінчується одразу після останнього рядка `Main`. Якби `IsBackground` мав значення `false`, процес ніколи б не завершився. Результат:

```
Main: id=2, фоновий=False
До Start: Unstarted
Після Start: Running
  Worker 1 почав (id=4)
  Worker 2 почав (id=5)
  Worker 4 почав (id=7)
  Worker 3 почав (id=6)
  Worker 2 завершив
  Worker 4 завершив
  Worker 3 завершив
  Worker 1 завершив
Після Join: Stopped
Worker 1: 400 мс, пул=False
Worker 2: 100 мс, пул=False
Worker 3: 300 мс, пул=False
Worker 4: 200 мс, пул=False
Heartbeat: фоновий=True
Main завершується
```

### Сума масиву частинами

Програма заповнює масив зі 100 млн цілих чисел (фіксоване зерно `Random(42)`), обчислює суму функції елементів послідовно та в N потоках для N = 1, 2, 4, …, 32 і виводить медіану 7 запусків, прискорення й ефективність.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Size = 100_000_000;
const int Runs = 7;
int[] data = new int[Size];
Random random = new(42);
for (int i = 0; i < Size; i++) data[i] = random.Next(1_000);

long expected = SumRange(data, 0, Size);  // послідовний еталон
SumParallel(data, Environment.ProcessorCount); // прогрівання JIT

Console.WriteLine($"Ядер (логічних): {Environment.ProcessorCount}");
Console.WriteLine("Потоки  Час, мс  Прискорення  Ефективність");
double t1 = 0;
for (int n = 1; n <= Environment.ProcessorCount * 2; n *= 2)
{
    double time = Median(Runs, () =>
    {
        if (SumParallel(data, n) != expected)
            throw new InvalidOperationException("Хибна сума");
    });
    if (n == 1) t1 = time;
    double s = t1 / time;
    Console.WriteLine($"{n,6} {time,8:F1} {s,12:F2} {s / n,13:F2}");
}

static long SumParallel(int[] data, int threadCount)
{
    long[] partial = new long[threadCount];   // свій елемент на потік
    Thread[] threads = new Thread[threadCount];
    int chunk = data.Length / threadCount;
    for (int t = 0; t < threadCount; t++)
    {
        int index = t;
        int from = t * chunk;
        int to = t == threadCount - 1 ? data.Length : from + chunk;
        threads[t] = new Thread(
            () => partial[index] = SumRange(data, from, to));
        threads[t].Start();
    }
    foreach (Thread thread in threads) thread.Join();
    return partial.Sum();
}

static long SumRange(int[] data, int from, int to)
{
    long sum = 0;
    for (int i = from; i < to; i++)
    {
        int x = data[i];
        sum += (long)x * x % 1_000_003;       // «важча» операція
    }
    return sum;
}

static double Median(int runs, Action action)
{
    double[] times = new double[runs];
    for (int r = 0; r < runs; r++)
    {
        long start = Stopwatch.GetTimestamp();
        action();
        times[r] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    }
    Array.Sort(times);
    return times[runs / 2];
}
```

Кожен виклик `SumParallel` створює потоки заново, тому час включає витрати на створення потоків. Кожен потік записує суму у свій елемент `partial`, а результат порівнюється з послідовним еталоном. Результат на i9-11900KF:

```
Ядер (логічних): 16
Потоки  Час, мс  Прискорення  Ефективність
     1    107,0         1,00          1,00
     2     55,2         1,94          0,97
     4     40,1         2,67          0,67
     8     21,9         4,88          0,61
    16     20,7         5,18          0,32
    32     18,5         5,79          0,18
```

До 8 потоків (кількість фізичних ядер) прискорення зростає, хоча ефективність поступово падає: цикл виконує прості операції над 400 МБ даних, і його швидкість обмежує пропускна здатність пам’яті. Логічні процесори SMT (16 потоків) майже не додають прискорення, а 32 потоки на 16 логічних процесорах мають ефективність лише 0,18.

### Пул потоків

Програма ставить у пул 100 робіт (сума дільників числа), чекає їх завершення за допомогою `CountdownEvent` і з’ясовує, скільки різних потоків пулу виконали роботи.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

ThreadPool.GetMinThreads(out int minWorker, out int minIo);
ThreadPool.GetMaxThreads(out int maxWorker, out int maxIo);
Console.WriteLine($"Мінімум: робочих {minWorker}, I/O {minIo}");
Console.WriteLine($"Максимум: робочих {maxWorker}, I/O {maxIo}");

const int Jobs = 100;
int[] threadIds = new int[Jobs];    // робота пише у свій елемент
long[] results = new long[Jobs];
using CountdownEvent done = new(Jobs);  // готовий засіб очікування

for (int i = 0; i < Jobs; i++)
{
    ThreadPool.QueueUserWorkItem(job =>
    {
        threadIds[job] = Environment.CurrentManagedThreadId;
        results[job] = SumOfDivisors(1_000_000 + job);
        done.Signal();                // «ще одна робота виконана»
    }, i, preferLocal: false);
}
done.Wait();                          // очікування всіх 100 робіт

Console.WriteLine($"Сума результатів: {results.Sum()}");
Console.WriteLine($"Потоків пулу зараз: {ThreadPool.ThreadCount}");
Console.WriteLine(
    $"Виконано робіт: {ThreadPool.CompletedWorkItemCount}");
var groups = threadIds.GroupBy(id => id)
    .OrderByDescending(g => g.Count()).ToList();
Console.WriteLine($"Різних потоків виконали роботи: {groups.Count}");
foreach (var g in groups.Take(5))
    Console.WriteLine($"  потік {g.Key,3}: {g.Count(),3} робіт");

static long SumOfDivisors(int n)
{
    long sum = 0;
    for (int d = 1; d <= n; d++)
        if (n % d == 0) sum += d;
    return sum;
}
```

Лямбда використовує типізований стан `int` (перевантаження з `preferLocal`), тому номер роботи не потрібно приводити з `object`. Роботи записують номер потоку у свій елемент масиву `threadIds`, а LINQ групує роботи за потоками. Сто робіт виконали лише 14 потоків: кожен потік пулу виконує роботи одну за одною. Результат:

```
Мінімум: робочих 16, I/O 1
Максимум: робочих 32767, I/O 1000
Сума результатів: 164283553
Потоків пулу зараз: 15
Виконано робіт: 100
Різних потоків виконали роботи: 14
  потік  14:  12 робіт
  потік  15:  12 робіт
  потік  16:  11 робіт
  потік  13:  10 робіт
  потік  11:   8 робіт
```

### Спорідненість і пріоритет

Програма рахує прості числа до 3 млн у 8 потоках, обмежуючи власний процес різними масками спорідненості, а потім знижує клас пріоритету процесу.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

if (!OperatingSystem.IsWindows() && !OperatingSystem.IsLinux())
{
    Console.Error.WriteLine("Спорідненість: лише Windows і Linux");
    return 1;
}

using Process self = Process.GetCurrentProcess();
nint allCores = self.ProcessorAffinity;
Console.WriteLine($"Маска за замовчуванням: {Mask(allCores)}");
Console.WriteLine($"Клас пріоритету: {self.PriorityClass}");

const int Threads = 8;
CountPrimes(Threads, 200_000);                  // прогрівання JIT

(string Name, nint Mask)[] configs =
[
    ("усі ядра", allCores),
    ("ЛП 0, 2", 0b101),
    ("ЛП 0, 1", 0b11),
    ("ЛП 0", 0b1),
];
foreach (var (name, mask) in configs)
{
    self.ProcessorAffinity = mask;              // обмеження процесу
    long start = Stopwatch.GetTimestamp();
    int primes = CountPrimes(Threads, 3_000_000);
    double ms = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    Console.WriteLine(
        $"{name,-8} {Mask(mask),17} {ms,6:F0} мс  простих: {primes}");
}

self.ProcessorAffinity = allCores;              // відновлення
self.PriorityClass = ProcessPriorityClass.BelowNormal;
self.Refresh();
Console.WriteLine($"Новий клас пріоритету: {self.PriorityClass}");
return 0;

static string Mask(nint mask) =>
    Convert.ToString((long)mask, 2).PadLeft(16, '0');

static int CountPrimes(int threadCount, int limit)
{
    int[] counts = new int[threadCount];
    Thread[] threads = new Thread[threadCount];
    for (int t = 0; t < threadCount; t++)
    {
        int index = t;
        threads[t] = new Thread(() =>
        {
            // Потік t перевіряє числа виду t + k·threadCount.
            for (int n = index; n < limit; n += threadCount)
                if (IsPrime(n)) counts[index]++;
        });
        threads[t].Start();
    }
    foreach (Thread thread in threads) thread.Join();
    return counts.Sum();
}

static bool IsPrime(int n)
{
    if (n < 2) return false;
    for (int d = 2; (long)d * d <= n; d++)
        if (n % d == 0) return false;
    return true;
}
```

Потік `t` перевіряє числа `t`, `t + 8`, `t + 16`, …, тому великі (довші для перевірки) числа розподіляються між потоками рівномірно. Властивість `ProcessorAffinity` підтримується лише у Windows і Linux, тому програма перевіряє ОС (аналізатор CA1416 інакше попереджає про платформну залежність). Результат (ЛП – логічний процесор):

```
Маска за замовчуванням: 1111111111111111
Клас пріоритету: Normal
усі ядра  1111111111111111    139 мс  простих: 216816
ЛП 0, 2   0000000000000101    233 мс  простих: 216816
ЛП 0, 1   0000000000000011    417 мс  простих: 216816
ЛП 0      0000000000000001    450 мс  простих: 216816
Новий клас пріоритету: BelowNormal
```

Вісім потоків на логічних процесорах 0 і 2 (два різні фізичні ядра) працюють майже вдвічі швидше, ніж на процесорах 0 і 1: на i9-11900KF це два логічні процесори одного фізичного ядра, які дають майже той самий час, що й один процесор. Кількість простих чисел однакова в усіх конфігураціях.

## Типові помилки

Таблиця 2.3. Типові помилки під час роботи з процесами та потоками {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| програма не завершується після `Main` | працює основний (*foreground*) потік; зупинити його прапорцем або зробити фоновим |
| усі потоки з циклу `for` обробляють однакову частину | лямбда захопила змінну циклу; скопіювати `i` у локальну змінну тіла циклу |
| `try` навколо `Start` не перехоплює виняток, процес аварійно завершується | виняток виник в іншому потоці; перехоплювати в методі потоку й зберігати для основного |
| `ThreadStateException` під час `Start` | потік уже запущено; об’єкт `Thread` можна запустити лише один раз |
| `PlatformNotSupportedException` у `Thread.Abort` | примусова зупинка не підтримується; використовувати прапорець або `CancellationToken` |
| прискорення менше очікуваного або паралельна версія повільніша | малий обсяг роботи, обмеження пам’яті, SMT, конфігурація *Debug*; вимірювати в *Release* з прогріванням |
| роботи в пулі довго не стартують | голодування пулу через блокувальні роботи; не блокувати потоки пулу |
| завислий цикл `while (!done) { }` завантажує ядро на 100 % | активне очікування; використовувати `Join` або засоби синхронізації |
| дочірній процес «зависає» під час читання виводу | буфер другого перенаправленого потоку переповнився; читати асинхронно або не перенаправляти `StandardError` |
