---
title: "Приклади та типові помилки"
description: "Тема 3. Синхронізація потоків: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

Усі приклади – консольні застосунки .NET 10 (у Rider: *File → New Solution… → Console*). Час вимірювався в конфігурації *Release* на Intel Core i9-11900KF.

### Лічильник відвідувачів

Сайт реєструє 8 000 000 відвідувань, які обробляють від 1 до 16 потоків. Програма порівнює п’ять способів збільшення спільного лічильника: без синхронізації, `Interlocked`, `lock` з об’єктом, `lock` з `Lock` і локальний лічильник потоку. Для кожної комбінації виконується прогрівання і п’ять вимірювань, виводиться медіана.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Total = 8_000_000;     // відвідувань на всі потоки
int[] threadCounts = [1, 2, 4, 8, 16];

long unsafeCount = 0, atomicCount = 0, monitorCount = 0,
    lockCount = 0, localCount = 0;
object monitorGate = new();
Lock gate = new();

// Спосіб: назва, робота потоку (n відвідувань), читання, скидання.
(string Name, Action<int> Work, Func<long> Read, Action Reset)[]
    methods =
[
    ("без синхронізації", n =>
        { for (int i = 0; i < n; i++) unsafeCount++; },
        () => unsafeCount, () => unsafeCount = 0),
    ("Interlocked", n =>
        { for (int i = 0; i < n; i++)
            Interlocked.Increment(ref atomicCount); },
        () => atomicCount, () => atomicCount = 0),
    ("lock(object)", n =>
        { for (int i = 0; i < n; i++)
            lock (monitorGate) monitorCount++; },
        () => monitorCount, () => monitorCount = 0),
    ("lock(Lock)", n =>
        { for (int i = 0; i < n; i++)
            lock (gate) lockCount++; },
        () => lockCount, () => lockCount = 0),
    ("локальний лічильник", n =>
        {
            long local = 0;                 // без спільного стану
            for (int i = 0; i < n; i++) local++;
            Interlocked.Add(ref localCount, local);
        },
        () => localCount, () => localCount = 0),
];

Console.WriteLine($"Процесорів: {Environment.ProcessorCount}, " +
    $"відвідувань: {Total:N0}");
Console.WriteLine(
    $"{"Спосіб",-20}{"Потоки",7}{"Результат",12}{"Час, мс",9}");
foreach (var m in methods)
{
    foreach (int p in threadCounts)
    {
        Run(m.Work, p);                     // прогрівання JIT
        double[] times = new double[5];
        long result = 0;
        for (int r = 0; r < times.Length; r++)
        {
            m.Reset();
            times[r] = Run(m.Work, p);
            result = m.Read();
        }
        Array.Sort(times);                  // медіана 5 запусків
        Console.WriteLine(
            $"{m.Name,-20}{p,7}{result,12:N0}{times[2],9:F1}");
    }
}

// Запускає p потоків, кожен виконує Total / p відвідувань.
static double Run(Action<int> work, int p)
{
    var threads = new Thread[p];
    for (int t = 0; t < p; t++)
        threads[t] = new Thread(() => work(Total / p));
    var sw = Stopwatch.StartNew();
    foreach (var t in threads) t.Start();
    foreach (var t in threads) t.Join();
    return sw.Elapsed.TotalMilliseconds;
}
```

Кожен спосіб описано кортежем з делегатами: роботою потоку, читанням і скиданням свого лічильника. Лямбди захоплюють локальні змінні, тому ті стають спільними для всіх потоків. Метод `Run` створює потоки заздалегідь і вимірює лише їхню роботу. Початок результату (решту 20 рядків зведено в табл. 3.3):

```
Процесорів: 16, відвідувань: 8 000 000
Спосіб               Потоки   Результат  Час, мс
без синхронізації         1   8 000 000      2,3
без синхронізації         2   4 377 251      5,7
без синхронізації         4   2 398 408      3,0
без синхронізації         8   3 015 383      4,3
без синхронізації        16   2 387 323      3,7
Interlocked               1   8 000 000     33,9
…
```

Лише варіант без синхронізації дає неправильний результат, і щоразу інший. Аналіз часу наведено в підрозділі «Ціна синхронізації».

### Банківські перекази

Два клієнти одночасно переказують кошти між рахунками A і B у протилежних напрямках: перший – 100 000 разів по 0,10 грн з A на B, другий – 60 000 разів з B на A. Наївний переказ блокує рахунки в порядку «звідки – куди» і потрапляє у взаємоблокування. Виправлений переказ завжди блокує спочатку рахунок з меншим номером.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// Аргумент naive – лише наївний варіант, процес «зависає»
// для діагностики; без аргументу – обидва варіанти.
bool hang = args is ["naive"];
Simulate(ordered: false, hang);
if (!hang) Simulate(ordered: true, hang);

static void Simulate(bool ordered, bool hang)
{
    Account a = new(1, 10_000m), b = new(2, 10_000m);
    string title = ordered ? "Упорядковані блокування"
                           : "Наївні блокування";
    Console.WriteLine($"{title}:");

    // Перший клієнт переказує з A на B, другий – з B на A.
    Thread t1 = Start("A→B", () => Repeat(a, b, 100_000, ordered));
    Thread t2 = Start("B→A", () => Repeat(b, a, 60_000, ordered));

    bool done = t1.Join(TimeSpan.FromSeconds(3))
             && t2.Join(TimeSpan.FromSeconds(3));
    if (!done)
    {
        Console.WriteLine("  потоки не завершилися за 3 с: " +
            "взаємоблокування");
        if (hang) Thread.Sleep(Timeout.Infinite);
        return;
    }
    Console.WriteLine($"  A = {a.Balance:N2}, B = {b.Balance:N2}, " +
        $"разом {a.Balance + b.Balance:N2}");
}

static Thread Start(string name, ThreadStart body)
{
    // Фоновий потік не заважає процесу завершитися.
    Thread t = new(body) { Name = name, IsBackground = true };
    t.Start();
    return t;
}

static void Repeat(Account from, Account to, int count, bool ordered)
{
    for (int i = 0; i < count; i++)
    {
        if (ordered) TransferOrdered(from, to, 0.10m);
        else TransferNaive(from, to, 0.10m);
    }
}

// Небезпечно: порядок захоплення залежить від напрямку переказу.
static void TransferNaive(Account from, Account to, decimal sum)
{
    lock (from.Sync)
    {
        Thread.SpinWait(100);        // інший потік встигає почати
        lock (to.Sync)
        {
            from.Balance -= sum;
            to.Balance += sum;
        }
    }
}

// Безпечно: спочатку завжди блокується рахунок з меншим номером.
static void TransferOrdered(Account from, Account to, decimal sum)
{
    Account first = from.Id < to.Id ? from : to;
    Account second = from.Id < to.Id ? to : from;
    lock (first.Sync)
    {
        Thread.SpinWait(100);
        lock (second.Sync)
        {
            from.Balance -= sum;
            to.Balance += sum;
        }
    }
}

class Account(int id, decimal balance)
{
    public int Id { get; } = id;
    public decimal Balance { get; set; } = balance;
    public object Sync { get; } = new();   // об’єкт блокування
}
```

`Thread.SpinWait(100)` між двома блокуваннями робить взаємоблокування майже неминучим: без нього воно теж виникає, але рідше й у непередбачуваний момент. Основний потік не чекає вічно, а викликає `Join` з таймаутом; фонові потоки, що застрягли, не заважають процесу завершитися. В упорядкованому варіанті обидва потоки спочатку захоплюють рахунок 1, тому цикл очікування неможливий, а загальна сума коштів не змінюється. Результат:

```
Наївні блокування:
  потоки не завершилися за 3 с: взаємоблокування
Упорядковані блокування:
  A = 6 000,00, B = 14 000,00, разом 20 000,00
```

Запуск з аргументом `naive` (`dotnet run -c Release -- naive`) залишає процес у стані взаємоблокування, щоб дослідити його в Rider або за допомогою `dotnet-dump`.

### Обмежений буфер

Два виробники кладуть по 20 чисел партіями по 5 у буфер ємністю 3 елементи, а три споживачі забирають і обробляють їх. Буфер реалізовано на моніторі з умовними змінними; програма перевіряє, що жоден елемент не втрачено, а заповненість ніколи не перевищує ємність.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

BoundedBuffer<int> buffer = new(capacity: 3);
const int Producers = 2, Consumers = 3, ItemsPerProducer = 20;
long consumedSum = 0;
int[] consumedBy = new int[Consumers];

var threads = new List<Thread>();
for (int p = 0; p < Producers; p++)
{
    int id = p;
    threads.Add(new Thread(() =>
    {
        for (int i = 1; i <= ItemsPerProducer; i++)
        {
            buffer.Put(id * 100 + i);   // 1…20 та 101…120
            if (i % 5 == 0) Thread.Sleep(30);  // пауза після партії
        }
    }));
}
for (int c = 0; c < Consumers; c++)
{
    int id = c;
    threads.Add(new Thread(() =>
    {
        // Порожній буфер після завершення виробників – кінець.
        while (buffer.TryTake(out int item))
        {
            Interlocked.Add(ref consumedSum, item);
            consumedBy[id]++;
            Thread.Sleep(1);            // обробка елемента
        }
    }));
}
foreach (var t in threads) t.Start();
foreach (var t in threads.Take(Producers)) t.Join();
buffer.Complete();                      // більше елементів не буде
foreach (var t in threads.Skip(Producers)) t.Join();

long expected = 0;
for (int p = 0; p < Producers; p++)
    for (int i = 1; i <= ItemsPerProducer; i++)
        expected += p * 100 + i;

Console.WriteLine($"Спожито: {string.Join(" + ", consumedBy)} = " +
    $"{consumedBy.Sum()} елементів");
Console.WriteLine($"Сума: {consumedSum} (очікувано {expected})");
Console.WriteLine($"Максимальна заповненість: {buffer.MaxCount} " +
    $"з {buffer.Capacity}");
Console.WriteLine($"Очікувань: виробники {buffer.PutWaits}, " +
    $"споживачі {buffer.TakeWaits}");

// Обмежений буфер на основі монітора об’єкта gate.
class BoundedBuffer<T>(int capacity)
{
    private readonly Queue<T> items = new();
    private readonly object gate = new();
    private bool completed;

    public int Capacity { get; } = capacity;
    public int MaxCount { get; private set; }
    public int PutWaits { get; private set; }
    public int TakeWaits { get; private set; }

    public void Put(T item)
    {
        lock (gate)
        {
            while (items.Count == Capacity)   // while, а не if
            {
                PutWaits++;
                Monitor.Wait(gate);           // звільняє gate
            }
            items.Enqueue(item);
            MaxCount = Math.Max(MaxCount, items.Count);
            Monitor.PulseAll(gate);           // будить споживачів
        }
    }

    public bool TryTake(out T item)
    {
        lock (gate)
        {
            while (items.Count == 0 && !completed)
            {
                TakeWaits++;
                Monitor.Wait(gate);
            }
            if (items.Count == 0)             // завершено й порожньо
            {
                item = default!;
                return false;
            }
            item = items.Dequeue();
            Monitor.PulseAll(gate);           // будить виробників
            return true;
        }
    }

    public void Complete()
    {
        lock (gate)
        {
            completed = true;
            Monitor.PulseAll(gate);
        }
    }
}
```

Об’єкт `gate` має одну умовну змінну, на якій чекають і виробники («є місце»), і споживачі («є елемент»), тому використано `PulseAll`: `Pulse` міг би розбудити потік «не того» типу, і сигнал загубився б. Метод `Complete` повідомляє споживачам, що нових елементів не буде: без нього вони чекали б вічно. Масив `consumedBy` не потребує синхронізації, бо кожен споживач змінює лише свій елемент. Кількість очікувань і розподіл між споживачами змінюються від запуску до запуску, решта рядків – ні. Результат:

```
Спожито: 14 + 13 + 13 = 40 елементів
Сума: 2420 (очікувано 2420)
Максимальна заповненість: 3 з 3
Очікувань: виробники 15, споживачі 13
```

### Парковка

Парковка має 3 місця. Сім автомобілів під’їжджають з інтервалом 20 мс і стоять різний час. Кожен водій чекає місце не довше, ніж дозволяє його терпіння, інакше їде. Місця обмежує `SemaphoreSlim`, максимальну кількість одночасно запаркованих авто обчислює CAS-цикл.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Places = 3;
using SemaphoreSlim parking = new(Places, Places);
Stopwatch clock = Stopwatch.StartNew();
Lock consoleGate = new();
int parked = 0, maxParked = 0, refused = 0;

// Авто: номер, затримка приїзду, час стоянки, терпіння (мс).
(string Plate, int Arrive, int Stay, int Patience)[] cars =
[
    ("AA1001", 0, 400, 1000), ("AE2002", 20, 250, 1000),
    ("BC3003", 40, 600, 1000), ("KA4004", 60, 300, 1000),
    ("AX5005", 80, 200, 100), ("BI6006", 100, 300, 1000),
    ("CE7007", 120, 150, 50),
];

var threads = cars.Select(car => new Thread(() =>
{
    Thread.Sleep(car.Arrive);
    Log($"{car.Plate} під’їхав, вільно {parking.CurrentCount}");
    if (!parking.Wait(car.Patience))  // очікування з таймаутом
    {
        Interlocked.Increment(ref refused);
        Log($"{car.Plate} не дочекався місця й поїхав");
        return;
    }
    try
    {
        int now = Interlocked.Increment(ref parked);
        UpdateMax(now);
        Log($"{car.Plate} заїхав, зайнято {now}");
        Thread.Sleep(car.Stay);       // стоїть на парковці
    }
    finally
    {
        Interlocked.Decrement(ref parked);
        Log($"{car.Plate} виїхав");
        parking.Release();            // звільнити місце
    }
})).ToList();

threads.ForEach(t => t.Start());
threads.ForEach(t => t.Join());
Console.WriteLine($"Максимум одночасно: {maxParked} з {Places}, " +
    $"відмов: {refused}");

void UpdateMax(int value)
{
    int seen;
    do
    {
        seen = maxParked;               // CAS-цикл для максимуму
        if (value <= seen) return;
    } while (Interlocked.CompareExchange(
        ref maxParked, value, seen) != seen);
}

void Log(string message)
{
    lock (consoleGate)
    {
        Console.WriteLine(
            $"{clock.ElapsedMilliseconds / 10 * 10,5} мс  {message}");
    }
}
```

`Wait(car.Patience)` повертає `false`, якщо місце не звільнилося за вказаний час. `Release` стоїть у блоці `finally`, тому місце звільняється навіть у разі винятку. Журнал виводиться під окремим замком, щоб рядки різних потоків не перемішувалися, а час округлюється до 10 мс і може відрізнятися на 10–20 мс між запусками. Результат:

```
    0 мс  AA1001 під’їхав, вільно 3
    0 мс  AA1001 заїхав, зайнято 1
   20 мс  AE2002 під’їхав, вільно 2
   20 мс  AE2002 заїхав, зайнято 2
   50 мс  BC3003 під’їхав, вільно 1
   50 мс  BC3003 заїхав, зайнято 3
   70 мс  KA4004 під’їхав, вільно 0
   90 мс  AX5005 під’їхав, вільно 0
  100 мс  BI6006 під’їхав, вільно 0
  120 мс  CE7007 під’їхав, вільно 0
  170 мс  CE7007 не дочекався місця й поїхав
  190 мс  AX5005 не дочекався місця й поїхав
  270 мс  AE2002 виїхав
  270 мс  KA4004 заїхав, зайнято 3
  400 мс  AA1001 виїхав
  400 мс  BI6006 заїхав, зайнято 3
  590 мс  KA4004 виїхав
  660 мс  BC3003 виїхав
  700 мс  BI6006 виїхав
Максимум одночасно: 3 з 3, відмов: 2
```

## Типові помилки

Таблиця 3.4. Типові помилки синхронізації потоків {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| результат змінюється від запуску до запуску, «губляться» оновлення | стан гонитви; захистити спільні дані `Interlocked` або `lock`, а краще позбутися спільного стану |
| `volatile`-лічильник усе одно втрачає збільшення | `volatile` не робить `++` атомарним; використати `Interlocked.Increment` |
| у різних методах один ресурс захищено різними замками | замок не захищає; той самий ресурс – той самий об’єкт блокування |
| `lock (this)`, `lock (typeof(T))`, `lock ("key")` | чужий код може захопити той самий об’єкт; блокувати приватне поле `Lock` |
| перевірка й дія в окремих блоках `lock` | між блоками умова змінюється; виконувати «перевірити–діяти» в одній критичній секції |
| програма «зависає», процесор не завантажений | взаємоблокування; захоплювати замки в одному порядку, використовувати `TryEnter` з таймаутом |
| `Monitor.Wait` без циклу `while` | після пробудження умова може бути хибною; перевіряти умову в циклі |
| `SynchronizationLockException` | `Wait`/`Pulse`/`Exit` викликано без утримання замка або в іншому потоці |
| потоки вічно чекають сигналу | `Pulse` до `Wait` губиться; зберігати стан у змінній, для завершення – прапорець і `PulseAll` |
| `SemaphoreFullException`, семафор пропускає забагато потоків | зайвий `Release`; викликати `Release` рівно один раз у `finally` після успішного `Wait` |
| `SpinLock` не блокує | структуру скопійовано (`readonly`-поле, передача за значенням); зберігати в змінному полі |
| CS1996: `await` у тілі `lock` | асинхронне очікування під замком неможливе; `SemaphoreSlim.WaitAsync` (тема 5) |
| з ростом кількості потоків програма сповільнюється | конвой блокувань; зменшити частоту захоплень, накопичувати результати локально |
