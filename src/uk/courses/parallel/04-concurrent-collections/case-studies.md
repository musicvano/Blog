---
title: "Приклади та типові помилки"
description: "Тема 4. Потокобезпечні колекції: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

Часи виконання в прикладах отримано на процесорі Intel Core i9-11900KF (8 ядер, 16 логічних процесорів) у конфігурації Release; на інших комп’ютерах вони будуть іншими.

### Частота слів

Програма рахує частоту слів у двох мільйонах слів трьома способами: послідовно звичайним словником (еталон), чотирма потоками зі спільним `Dictionary<TKey, TValue>` (помилка) і чотирма потоками з `ConcurrentDictionary<TKey, TValue>`.

```cs
using System.Collections.Concurrent;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int WordCount = 2_000_000;
const int ThreadCount = 4;

// Детермінований «текст»: слова словника у псевдовипадковому порядку.
string[] vocabulary =
[
    "потік", "дані", "черга", "ядро", "кеш", "канал",
    "задача", "пам’ять", "процес", "блокування",
];
Random random = new(42);
string[] words = new string[WordCount];
for (int i = 0; i < words.Length; i++)
{
    // Квадрат випадкового числа: перші слова трапляються частіше.
    double r = random.NextDouble();
    words[i] = vocabulary[(int)(r * r * vocabulary.Length)];
}

// 1. Еталон: послідовний підрахунок звичайним словником.
Dictionary<string, int> expected = [];
foreach (string w in words)
{
    expected[w] = expected.GetValueOrDefault(w) + 1;
}

// 2. Помилка: спільний Dictionary у кількох потоках.
Dictionary<string, int> unsafeCounts = [];
int failures = 0;
RunInParallel((from, to) =>
{
    for (int i = from; i < to; i++)
    {
        try
        {
            string w = words[i];
            unsafeCounts[w] = unsafeCounts.GetValueOrDefault(w) + 1;
        }
        catch (Exception)
        {
            Interlocked.Increment(ref failures);
        }
    }
});
Console.WriteLine($"Dictionary: слів {unsafeCounts.Values.Sum():N0}" +
    $" з {WordCount:N0}, винятків {failures}");

// 3. ConcurrentDictionary: атомарне додавання або оновлення.
ConcurrentDictionary<string, int> counts = new();
RunInParallel((from, to) =>
{
    for (int i = from; i < to; i++)
    {
        counts.AddOrUpdate(words[i], 1, (_, old) => old + 1);
    }
});
bool same = expected.All(p => counts[p.Key] == p.Value);
Console.WriteLine($"ConcurrentDictionary: слів " +
    $"{counts.Values.Sum():N0}, збігається з еталоном: {same}");
Console.WriteLine($"«потік»: {counts["потік"]:N0}, " +
    $"«кеш»: {counts["кеш"]:N0}");

// Ділить масив на рівні частини й обробляє кожну окремим потоком.
static void RunInParallel(Action<int, int> body)
{
    Thread[] threads = new Thread[ThreadCount];
    int chunk = WordCount / ThreadCount;
    for (int t = 0; t < ThreadCount; t++)
    {
        int from = t * chunk;
        int to = t == ThreadCount - 1 ? WordCount : from + chunk;
        threads[t] = new Thread(() => body(from, to));
        threads[t].Start();
    }
    foreach (Thread thread in threads) thread.Join();
}
```

Зерно `Random(42)` робить «текст» однаковим у кожному запуску, тому еталонні частоти не змінюються. У другому способі операція «прочитати значення – записати значення + 1» не атомарна, а внутрішній стан словника пошкоджується: слова губляться, іноді виникають винятки. Рядок «Dictionary» відрізняється в кожному запуску (в одному з пробних запусків вціліло лише 736 032 слова й виникло понад мільйон винятків), а на деяких запусках така програма може навіть зависнути. `AddOrUpdate` оновлює лічильник атомарно, і результат збігається з еталоном. Результат одного із запусків:

```
Dictionary: слів 1 202 975 з 2 000 000, винятків 0
ConcurrentDictionary: слів 2 000 000, збігається з еталоном: True
«потік»: 632 691, «кеш»: 149 284
```

### Черга замовлень

Два виробники (сайт і мобільний застосунок) додають замовлення в обмежену `BlockingCollection<T>` на 4 місця, а три «кухарі»-споживачі обробляють їх.

```cs
using System.Collections.Concurrent;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// Обмежена черга: не більше 4 замовлень одночасно.
using BlockingCollection<Order> queue = new(boundedCapacity: 4);

// Два виробники: сайт і мобільний застосунок, по 6 замовлень.
Thread[] producers =
[
    new(() => Produce("Сайт", 1, 6, delayMs: 5)),
    new(() => Produce("Застосунок", 101, 6, delayMs: 8)),
];
// Три споживачі: кухарі, що обробляють замовлення повільніше.
int[] processed = new int[3];
decimal[] revenue = new decimal[3];
Thread[] consumers = new Thread[3];
for (int c = 0; c < consumers.Length; c++)
{
    int id = c;
    consumers[c] = new Thread(() => Consume(id));
}

foreach (Thread t in consumers) t.Start();
foreach (Thread t in producers) t.Start();

foreach (Thread t in producers) t.Join();
queue.CompleteAdding();              // нових замовлень не буде
Console.WriteLine("Виробники завершили роботу");
foreach (Thread t in consumers) t.Join();

Console.WriteLine($"Оброблено: {processed.Sum()} замовлень " +
    $"на {revenue.Sum():N2} грн");

void Produce(string source, int firstId, int count, int delayMs)
{
    for (int i = 0; i < count; i++)
    {
        Order order = new(firstId + i, source, 100m + 25m * i);
        queue.Add(order);            // блокує, якщо черга повна
        Thread.Sleep(delayMs);
    }
}

void Consume(int id)
{
    // Цикл завершується після CompleteAdding і спорожнення черги.
    foreach (Order order in queue.GetConsumingEnumerable())
    {
        Thread.Sleep(30);            // приготування
        processed[id]++;
        revenue[id] += order.Amount;
        Console.WriteLine(
            $"  Кухар {id + 1}: №{order.Id,-3} ({order.Source})");
    }
    Console.WriteLine($"Кухар {id + 1} завершив: {processed[id]}");
}

record Order(int Id, string Source, decimal Amount);
```

Виробники додають замовлення кожні 5 і 8 мс, а кухар готує одне замовлення 30 мс, тому черга швидко заповнюється, і `Add` блокує виробників – так працює зворотний тиск. Кожен споживач записує лише свої елементи масивів `processed` і `revenue`, тож блокування не потрібні; сумарні значення читають після `Join`. Після `CompleteAdding` цикли `GetConsumingEnumerable` дочитують залишок і завершуються. Порядок рядків змінюється від запуску до запуску, а підсумок – ні. Результат одного із запусків (скорочено):

```
  Кухар 3: №101 (Застосунок)
  Кухар 2: №1   (Сайт)
  Кухар 1: №2   (Сайт)
  Кухар 2: №3   (Сайт)
…
Виробники завершили роботу
  Кухар 1: №5   (Сайт)
  Кухар 2: №105 (Застосунок)
  Кухар 3: №106 (Застосунок)
Кухар 3 завершив: 4
Кухар 2 завершив: 4
  Кухар 1: №6   (Сайт)
Кухар 1 завершив: 4
Оброблено: 12 замовлень на 1 950,00 грн
```

### Конвеєр журналів

Конвеєр з трьох етапів обробляє 100 000 рядків журналу вебсервера: читач записує рядки в обмежений канал, два розбирачі перетворюють їх на записи `LogRecord`, а агрегатор рахує кількість відповідей за кодами стану й середній час відповіді.

```cs
using System.Threading.Channels;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int LineCount = 100_000;
BoundedChannelOptions options = new(50)
{
    FullMode = BoundedChannelFullMode.Wait,   // зворотний тиск
};
Channel<string> lines = Channel.CreateBounded<string>(options);
Channel<LogRecord> records =
    Channel.CreateBounded<LogRecord>(options);

// Етап 1: читання журналу (рядки генеруються детерміновано).
Task reader = Task.Run(async () =>
{
    string[] paths = ["/", "/api/orders", "/api/users", "/login"];
    int[] codes = [200, 200, 200, 201, 404, 500];
    for (int i = 0; i < LineCount; i++)
    {
        string line = $"{i} GET {paths[i % paths.Length]} " +
                      $"{codes[i * 7 % codes.Length]} {i % 900 + 5}";
        if (i % 1000 == 999) line = "пошкоджений рядок";
        await lines.Writer.WriteAsync(line);   // чекає, якщо повно
    }
    lines.Writer.Complete();          // більше рядків не буде
});

// Етап 2: два розбирачі читають з одного каналу.
int badLines = 0;
Task[] parsers = new Task[2];
for (int p = 0; p < parsers.Length; p++)
{
    parsers[p] = Task.Run(async () =>
    {
        await foreach (string line in lines.Reader.ReadAllAsync())
        {
            string[] parts = line.Split(' ');
            if (parts.Length == 5
                && int.TryParse(parts[3], out int status)
                && int.TryParse(parts[4], out int ms))
            {
                await records.Writer.WriteAsync(
                    new LogRecord(parts[2], status, ms));
            }
            else
            {
                Interlocked.Increment(ref badLines);
            }
        }
    });
}
// Другий канал закривається, коли завершилися обидва розбирачі.
Task closeRecords = Task.Run(async () =>
{
    await Task.WhenAll(parsers);
    records.Writer.Complete();
});

// Етап 3: агрегація в одному потоці – блокування не потрібні.
SortedDictionary<int, int> byStatus = [];
long totalMs = 0;
int count = 0;
await foreach (LogRecord r in records.Reader.ReadAllAsync())
{
    byStatus[r.Status] = byStatus.GetValueOrDefault(r.Status) + 1;
    totalMs += r.Milliseconds;
    count++;
}
await Task.WhenAll(reader, closeRecords);

Console.WriteLine(
    $"Записів: {count:N0}, пошкоджених рядків: {badLines}");
foreach (var (status, n) in byStatus)
{
    double share = (double)n / count;
    Console.WriteLine($"  {status}: {n,7:N0} ({share,6:P1})");
}
double average = (double)totalMs / count;
Console.WriteLine($"Середній час відповіді: {average:F1} мс");

record LogRecord(string Path, int Status, int Milliseconds);
```

Обидва канали мають ємність 50, тому в пам’яті одночасно перебуває не більше сотні рядків і записів, скільки б рядків не містив журнал. Перший канал закриває читач, коли рядки закінчилися; другий – окрема задача після завершення **обох** розбирачів: якщо закрити його після першого розбирача, другий отримав би `ChannelClosedException`. Агрегатор – єдиний споживач другого каналу, тому звичайний `SortedDictionary<TKey, TValue>` у ньому безпечний. Кожен тисячний рядок пошкоджено навмисно, і розбирачі рахують такі рядки через `Interlocked.Increment`. Результат:

```
Записів: 99 900, пошкоджених рядків: 100
  200:  49 968 ( 50,0%)
  201:  16 633 ( 16,6%)
  404:  16 666 ( 16,7%)
  500:  16 633 ( 16,6%)
Середній час відповіді: 454,1 мс
```

### Хибне розділення

Програма рахує парні числа в масиві зі 100 мільйонів псевдовипадкових чисел для 1, 2, 4 і 8 потоків трьома способами: лічильники в спільному масиві `long[]`, локальні змінні та доповнені структури. Для кожного способу виконується прогрівання й береться медіана семи запусків.

```cs
using System.Diagnostics;
using System.Runtime.InteropServices;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Size = 100_000_000;
const int Runs = 7;
int[] threadCounts = [1, 2, 4, 8];

// Дані: 100 млн псевдовипадкових чисел (фіксоване зерно).
int[] data = new int[Size];
Random random = new(42);
for (int i = 0; i < data.Length; i++) data[i] = random.Next();
int expected = data.Count(x => x % 2 == 0);
Console.WriteLine($"Парних чисел: {expected:N0}");
Console.WriteLine(
    "Потоків | Спільний масив | Локальна змінна | Доповнення");

foreach (int p in threadCounts)
{
    double shared = Median(() => SharedArray(data, p));
    double local = Median(() => LocalVariable(data, p));
    double padded = Median(() => PaddedStruct(data, p));
    Console.WriteLine(
        $"{p,7} | {shared,11:F0} мс | {local,12:F0} мс |" +
        $" {padded,8:F0} мс");
}

// Лічильники потоків – сусідні елементи одного масиву long[].
static long SharedArray(int[] data, int threads)
{
    long[] counters = new long[threads];
    Run(data.Length, threads, (i, from, to) =>
    {
        for (int j = from; j < to; j++)
        {
            if (data[j] % 2 == 0) counters[i]++;  // спільна лінія
        }
    });
    return counters.Sum();
}

// Потік рахує в локальній змінній і записує результат один раз.
static long LocalVariable(int[] data, int threads)
{
    long[] counters = new long[threads];
    Run(data.Length, threads, (i, from, to) =>
    {
        long count = 0;
        for (int j = from; j < to; j++)
        {
            if (data[j] % 2 == 0) count++;
        }
        counters[i] = count;
    });
    return counters.Sum();
}

// Лічильники у структурах по 128 байтів – у різних кеш-лініях.
static long PaddedStruct(int[] data, int threads)
{
    PaddedCounter[] counters = new PaddedCounter[threads];
    Run(data.Length, threads, (i, from, to) =>
    {
        for (int j = from; j < to; j++)
        {
            if (data[j] % 2 == 0) counters[i].Value++;
        }
    });
    return counters.Sum(c => c.Value);
}

// Ділить індекси 0..length на частини й запускає потоки.
static void Run(int length, int threads, Action<int, int, int> body)
{
    Thread[] workers = new Thread[threads];
    int chunk = length / threads;
    for (int i = 0; i < threads; i++)
    {
        int index = i;
        int from = i * chunk;
        int to = i == threads - 1 ? length : from + chunk;
        workers[i] = new Thread(() => body(index, from, to));
        workers[i].Start();
    }
    foreach (Thread t in workers) t.Join();
}

// Прогрівання й медіана кількох запусків.
double Median(Func<long> action)
{
    action();
    double[] times = new double[Runs];
    for (int r = 0; r < Runs; r++)
    {
        long start = Stopwatch.GetTimestamp();
        long result = action();
        times[r] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
        if (result != expected) throw new InvalidOperationException();
    }
    Array.Sort(times);
    return times[Runs / 2];
}

// Розмір 128 байтів: сусідні лічильники не діляться кеш-лінією.
[StructLayout(LayoutKind.Sequential, Size = 128)]
struct PaddedCounter
{
    public long Value;
}
```

Усі три способи виконують однакову роботу й дають однаковий результат, що перевіряє метод `Median`. В одному потоці часи майже рівні. Зі спільним масивом прискорення для восьми потоків лише 363 / 221 ≈ 1,6, а часи для 2, 4 і 8 потоків майже однакові: кожен запис `counters[i]++` інвалідує кеш-лінію в інших ядрах. Локальна змінна дає прискорення 342 / 54 ≈ 6,3, доповнені структури – 348 / 74 ≈ 4,7: хибного розділення немає, але кожне збільшення все одно записує в пам’ять. Результат на процесорі i9-11900KF (між запусками числа коливаються на 10–20 %):

```
Парних чисел: 49 996 376
Потоків | Спільний масив | Локальна змінна | Доповнення
      1 |         363 мс |          342 мс |      348 мс
      2 |         218 мс |          170 мс |      194 мс
      4 |         259 мс |           89 мс |      122 мс
      8 |         221 мс |           54 мс |       74 мс
```

## Типові помилки

Таблиця 4.4. Типові помилки під час роботи з потокобезпечними колекціями {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| втрачені елементи, `InvalidOperationException` або зависання під час запису в `List<T>` чи `Dictionary<TKey, TValue>` | звичайні колекції непотокобезпечні; використати конкурентну колекцію, блокування або локальні колекції зі злиттям |
| `if (dict.ContainsKey(k)) …` або `if (queue.Count > 0) …` дає неправильний результат | складена операція «перевірити – діяти»; використати атомарні `TryAdd`, `GetOrAdd`, `TryDequeue` |
| фабрика `GetOrAdd` або функція `AddOrUpdate` виконалася кілька разів | делегати виконуються поза блокуванням і можуть повторюватися; зберігати `Lazy<T>`, функції оновлення робити чистими |
| `settings = settings.Add(x)` з кількох потоків губить оновлення | заміна посилання не атомарна; `ImmutableInterlocked.Update` |
| споживачі не завершуються або виробник отримує `InvalidOperationException` чи `ChannelClosedException` | `CompleteAdding()` / `Writer.Complete()` не викликано або викликано до завершення всіх виробників; закривати після всіх, у тому числі в разі винятку (`try/finally`) |
| пам’ять зростає, поки виробник швидший за споживача | необмежена черга; обмежити ємність (`boundedCapacity`, `CreateBounded`) |
| прискорення значно менше за очікуване, час не зменшується з потоками | хибне розділення; накопичувати в локальних змінних, доповнювати структури; вимірювати в Release з прогріванням і медіаною або BenchmarkDotNet |
