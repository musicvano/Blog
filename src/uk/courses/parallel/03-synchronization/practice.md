---
title: "Практика"
description: "Тема 3. Синхронізація потоків: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Каталог бібліотеки з `ReaderWriterLockSlim`

Створити модель каталогу бібліотеки: вісім потоків-читачів перевіряють наявність книг із замовлень (по 100 ISBN у замовленні), а один потік-письменник рідко додає нові книги. Порівняти час роботи каталогу, захищеного `lock`, і каталогу на `ReaderWriterLockSlim`; для кожного варіанта виконати прогрівання й вивести медіану п’яти вимірювань.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Books = 10_000, Readers = 8, Orders = 4_000, Size = 100;
Console.WriteLine($"Читачів: {Readers}, замовлень у кожного: " +
    $"{Orders:N0} по {Size} книг, письменник: 1");
Console.WriteLine($"{"Засіб",-22}{"Час, мс",9}{"Знайдено",11}" +
    $"{"Додано",8}");
Report("lock", () => new LockCatalog(Books));
Report("ReaderWriterLockSlim", () => new RwCatalog(Books));

// Прогрівання, потім медіана п’яти вимірювань.
static void Report(string name, Func<Catalog> create)
{
    Measure(create());
    var runs = Enumerable.Range(0, 5).Select(_ => Measure(create()))
        .OrderBy(r => r.Ms).ToList();
    var (ms, found, added) = runs[2];
    Console.WriteLine($"{name,-22}{ms,9:F0}{found,11:N0}{added,8}");
}

static (double Ms, long Found, int Added) Measure(Catalog catalog)
{
    long found = 0;
    int added = 0;
    bool readersDone = false;
    var sw = Stopwatch.StartNew();

    var readers = Enumerable.Range(0, Readers).Select(r =>
        new Thread(() =>
        {
            var random = new Random(r);       // фіксоване зерно
            var order = new string[Size];
            long hits = 0;
            for (int i = 0; i < Orders; i++)
            {
                for (int k = 0; k < Size; k++)
                    order[k] = $"ISBN-{random.Next(Books * 2):D5}";
                hits += catalog.CountAvailable(order);
            }
            Interlocked.Add(ref found, hits);
        })).ToList();

    // Письменник рідко додає нові книги, доки працюють читачі.
    var writer = new Thread(() =>
    {
        for (int i = 0; !Volatile.Read(ref readersDone); i++)
        {
            catalog.Add($"NEW-{i:D5}", $"Нова книга {i}");
            added++;
            Thread.Sleep(5);
        }
    });

    readers.ForEach(t => t.Start());
    writer.Start();
    readers.ForEach(t => t.Join());
    Volatile.Write(ref readersDone, true);
    writer.Join();
    return (sw.Elapsed.TotalMilliseconds, found, added);
}

// Спільна частина каталогів: словник «ISBN – назва».
abstract class Catalog
{
    protected readonly Dictionary<string, string> books = [];

    protected Catalog(int count)
    {
        for (int i = 0; i < count; i++)
            books[$"ISBN-{i:D5}"] = $"Книга {i}";
    }

    public abstract int CountAvailable(string[] isbns);
    public abstract void Add(string isbn, string title);
}

// Один замок і для читання, і для запису.
class LockCatalog(int count) : Catalog(count)
{
    private readonly Lock gate = new();

    public override int CountAvailable(string[] isbns)
    {
        lock (gate) return isbns.Count(books.ContainsKey);
    }

    public override void Add(string isbn, string title)
    {
        lock (gate) books[isbn] = title;
    }
}

// Читачі працюють паралельно, письменник – монопольно.
class RwCatalog(int count) : Catalog(count)
{
    private readonly ReaderWriterLockSlim rw = new();

    public override int CountAvailable(string[] isbns)
    {
        rw.EnterReadLock();                 // спільний доступ
        try { return isbns.Count(books.ContainsKey); }
        finally { rw.ExitReadLock(); }
    }

    public override void Add(string isbn, string title)
    {
        rw.EnterWriteLock();                // монопольний доступ
        try { books[isbn] = title; }
        finally { rw.ExitWriteLock(); }
    }
}
```

Абстрактний клас `Catalog` містить словник, а похідні класи відрізняються лише засобом синхронізації, тому вимірювання порівнюють саме засоби. Рядки ISBN формуються поза замком: під замком виконується тільки перевірка 100 ключів. Письменник додає книги з префіксом `NEW-`, тому кількість знайдених книг однакова для обох варіантів і служить перевіркою правильності. Прапорець завершення читається й записується через `Volatile`. Кількість доданих книг залежить від тривалості вимірювання. Результат (Intel Core i9-11900KF):

```
Читачів: 8, замовлень у кожного: 4 000 по 100 книг, письменник: 1
Засіб                   Час, мс   Знайдено  Додано
lock                        112  1 600 896       8
ReaderWriterLockSlim         49  1 600 896       3
```

Читачі `ReaderWriterLockSlim` перевіряють замовлення одночасно, тому каталог працює вдвічі швидше. Виграш залежить від частки часу під замком: для замовлень з однієї книги (`Orders = 400_000, Size = 1`) на тому самому комп’ютері отримано 567 і 416 мс, тобто лише в 1,4 разу, бо більшу частину часу потоки формують рядки поза замком.

## Приклад 2. Обідаючі філософи з таймаутом

Розв’язати задачу про п’ятьох обідаючих філософів, кожен з яких має пообідати 200 разів. Філософ бере ліву виделку, а праву намагається взяти з таймаутом 10 мс за допомогою `Monitor.TryEnter`; у разі невдачі кладе ліву виделку, чекає випадковий час і повторює спробу. Вивести загальний час і кількість повторних спроб кожного філософа.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Count = 5, Meals = 200;
object[] forks = Enumerable.Range(0, Count)
    .Select(_ => new object()).ToArray();
int[] retries = new int[Count];
var sw = Stopwatch.StartNew();

var philosophers = Enumerable.Range(0, Count)
    .Select(id => new Thread(() =>
    {
        object left = forks[id], right = forks[(id + 1) % Count];
        var random = new Random(id);
        for (int meal = 0; meal < Meals; meal++)
        {
            while (!TryEat(left, right))
            {
                retries[id]++;                   // поступка
                Thread.Sleep(random.Next(1, 4)); // випадкова пауза
            }
            Thread.SpinWait(20_000);             // розмірковує
        }
    })).ToList();

philosophers.ForEach(t => t.Start());
philosophers.ForEach(t => t.Join());

Console.WriteLine($"Кожен філософ поїв {Meals} разів за " +
    $"{sw.ElapsedMilliseconds} мс, взаємоблокування немає");
for (int i = 0; i < Count; i++)
    Console.WriteLine($"  Ф{i}: повторних спроб {retries[i]}");

// Бере ліву виделку, праву – з таймаутом; у разі невдачі
// кладе ліву назад, порушуючи умову «утримання й очікування».
static bool TryEat(object left, object right)
{
    lock (left)
    {
        if (!Monitor.TryEnter(right, TimeSpan.FromMilliseconds(10)))
            return false;
        try
        {
            Thread.SpinWait(50_000);             // їсть
            return true;
        }
        finally
        {
            Monitor.Exit(right);
        }
    }
}
```

Виделки – звичайні об’єкти-монітори. Якщо всі філософи одночасно візьмуть ліву виделку, кожен через 10 мс відмовиться від спроби й звільнить її, тому цикл очікування розривається. Випадкова пауза перед повтором (кожен філософ має власний `Random` із фіксованим зерном) запобігає livelock – синхронним повторам усіх філософів. Масив `retries` не потребує синхронізації: кожен потік змінює лише свій елемент. Кількість повторів і час змінюються від запуску до запуску. Результат:

```
Кожен філософ поїв 200 разів за 826 мс, взаємоблокування немає
  Ф0: повторних спроб 6
  Ф1: повторних спроб 3
  Ф2: повторних спроб 3
  Ф3: повторних спроб 7
  Ф4: повторних спроб 5
```

## Приклад 3. Одночасний старт бігунів

Змоделювати старт забігу: п’ять бігунів готуються різний час, після чого суддя переконується, що всі на місцях (`Barrier`), витримує паузу й дає один сигнал старту всім бігунам (`ManualResetEventSlim`). Вивести повідомлення про готовність і таблицю результатів.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

string[] names = ["Олена", "Андрій", "Марія", "Тарас", "Ірина"];
int[] prepare = [300, 50, 200, 120, 0];      // підготовка, мс
int[] run = [540, 600, 510, 570, 630];       // «забіг», мс

// Бар’єр на бігунів і суддю: чекає, доки всі будуть готові.
using Barrier ready = new(names.Length + 1,
    b => Console.WriteLine($"Бар’єр пройдено: усі " +
        $"{b.ParticipantCount} учасників на місцях"));
using ManualResetEventSlim startGun = new(false);
Stopwatch clock = new();
var finish = new (string Name, long Ms)[names.Length];
int place = 0;

var runners = names.Select((name, i) => new Thread(() =>
{
    Thread.Sleep(prepare[i]);
    Console.WriteLine($"{name}: на старті");
    ready.SignalAndWait();          // чекає на всіх учасників
    startGun.Wait();                // чекає на постріл
    Thread.Sleep(run[i]);           // біжить
    long ms = clock.ElapsedMilliseconds;
    int index = Interlocked.Increment(ref place) - 1;
    finish[index] = (name, ms);
})).ToList();

runners.ForEach(t => t.Start());
ready.SignalAndWait();              // суддя – останній учасник
Console.WriteLine("Суддя: увага…");
Thread.Sleep(500);
clock.Start();
startGun.Set();                     // один сигнал для всіх
runners.ForEach(t => t.Join());

Console.WriteLine($"{"Місце",5}  {"Бігун",-8}{"Час, мс",8}");
for (int i = 0; i < finish.Length; i++)
    Console.WriteLine($"{i + 1,5}  {finish[i].Name,-8}" +
        $"{finish[i].Ms / 10 * 10,8}");
```

Бар’єр створено на шість учасників: п’ять бігунів і суддю (основний потік). Дія, передана в конструктор `Barrier`, виконується один раз, коли всі учасники дійшли до бар’єра. Після цього бігуни чекають на `ManualResetEventSlim`, а суддя витримує паузу й викликає `Set`, що одночасно пропускає всіх бігунів. Місце визначає атомарний лічильник `place`: кожен бігун отримує унікальний індекс у масиві `finish`. Порядок рядків «на старті» визначається часом підготовки, а фінішний час округлено до 10 мс і може відрізнятися на 10 мс між запусками. Результат:

```
Ірина: на старті
Андрій: на старті
Тарас: на старті
Марія: на старті
Олена: на старті
Бар’єр пройдено: усі 6 учасників на місцях
Суддя: увага…
Місце  Бігун    Час, мс
    1  Марія        510
    2  Олена        540
    3  Тарас        580
    4  Андрій       600
    5  Ірина        630
```
