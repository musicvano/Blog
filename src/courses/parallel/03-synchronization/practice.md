---
title: "Practice"
description: "Topic 3. Thread synchronization: worked examples"
outline: [2, 3]
sourceHash: "6227f6a97c2a5f43d4c9f752c361293be59bbd4a6b1425f3cdf3b6a37f96b562"
---

# Practice

## Example 1. Library catalog with `ReaderWriterLockSlim`

Model a library catalog: eight reader threads check the availability of books in orders (100 ISBNs per order), while one writer thread occasionally adds new books. Compare the execution time of a catalog protected by `lock` with one using `ReaderWriterLockSlim`; warm up each version and print the median of five measurements.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Books = 10_000, Readers = 8, Orders = 4_000, Size = 100;
Console.WriteLine($"Readers: {Readers}, orders per reader: " +
    $"{Orders:N0} of {Size} books, writers: 1");
Console.WriteLine($"{"Tool",-22}{"Time, ms",9}{"Found",11}" +
    $"{"Added",8}");
Report("lock", () => new LockCatalog(Books));
Report("ReaderWriterLockSlim", () => new RwCatalog(Books));

// Warm-up, then the median of five measurements.
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
            var random = new Random(r);       // fixed seed
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

    // The writer occasionally adds books while readers are working.
    var writer = new Thread(() =>
    {
        for (int i = 0; !Volatile.Read(ref readersDone); i++)
        {
            catalog.Add($"NEW-{i:D5}", $"New book {i}");
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

// Common catalog data: an ISBN-to-title dictionary.
abstract class Catalog
{
    protected readonly Dictionary<string, string> books = [];

    protected Catalog(int count)
    {
        for (int i = 0; i < count; i++)
            books[$"ISBN-{i:D5}"] = $"Book {i}";
    }

    public abstract int CountAvailable(string[] isbns);
    public abstract void Add(string isbn, string title);
}

// One lock for both reading and writing.
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

// Readers run concurrently; the writer has exclusive access.
class RwCatalog(int count) : Catalog(count)
{
    private readonly ReaderWriterLockSlim rw = new();

    public override int CountAvailable(string[] isbns)
    {
        rw.EnterReadLock();                 // shared access
        try { return isbns.Count(books.ContainsKey); }
        finally { rw.ExitReadLock(); }
    }

    public override void Add(string isbn, string title)
    {
        rw.EnterWriteLock();                // exclusive access
        try { books[isbn] = title; }
        finally { rw.ExitWriteLock(); }
    }
}
```

The abstract `Catalog` class contains the dictionary, and the derived classes differ only in their synchronization tool, so the measurements compare the tools themselves. ISBN strings are generated outside the lock: only checking 100 keys occurs under the lock. The writer adds books with the `NEW-` prefix, so the number of books found is identical for both versions and serves as a correctness check. The completion flag is read and written through `Volatile`. The number of books added depends on the measurement duration. Output (Intel Core i9-11900KF):

```
Readers: 8, orders per reader: 4 000 of 100 books, writers: 1
Tool                   Time, ms      Found   Added
lock                        112  1 600 896       8
ReaderWriterLockSlim         49  1 600 896       3
```

The `ReaderWriterLockSlim` readers check orders concurrently, so the catalog runs twice as fast. The gain depends on the fraction of time spent holding the lock: for single-book orders (`Orders = 400_000, Size = 1`), the same computer produced 567 and 416 ms, only a 1.4-fold improvement, because threads spend most of their time building strings outside the lock.

## Example 2. Dining philosophers with a timeout

Solve the dining philosophers problem for five philosophers, each of whom must eat 200 times. A philosopher takes the left fork, then attempts to take the right fork with a 10 ms timeout using `Monitor.TryEnter`; on failure, they put down the left fork, wait for a random interval, and retry. Print the total time and each philosopher's retry count.

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
                retries[id]++;                   // back off
                Thread.Sleep(random.Next(1, 4)); // random pause
            }
            Thread.SpinWait(20_000);             // thinks
        }
    })).ToList();

philosophers.ForEach(t => t.Start());
philosophers.ForEach(t => t.Join());

Console.WriteLine($"Each philosopher ate {Meals} times in " +
    $"{sw.ElapsedMilliseconds} ms, no deadlock");
for (int i = 0; i < Count; i++)
    Console.WriteLine($"  P{i}: retries {retries[i]}");

// Takes the left fork, then the right with a timeout; on failure,
// puts the left fork back, breaking the hold-and-wait condition.
static bool TryEat(object left, object right)
{
    lock (left)
    {
        if (!Monitor.TryEnter(right, TimeSpan.FromMilliseconds(10)))
            return false;
        try
        {
            Thread.SpinWait(50_000);             // eats
            return true;
        }
        finally
        {
            Monitor.Exit(right);
        }
    }
}
```

The forks are ordinary monitor objects. If all philosophers take their left forks simultaneously, each abandons the attempt and releases the fork after 10 ms, breaking the circular wait. A random pause before retrying (each philosopher has their own `Random` with a fixed seed) prevents livelock — synchronized retries by all philosophers. The `retries` array needs no synchronization: each thread modifies only its own element. Retry counts and times vary between runs. Output:

```
Each philosopher ate 200 times in 826 ms, no deadlock
  P0: retries 6
  P1: retries 3
  P2: retries 3
  P3: retries 7
  P4: retries 5
```

## Example 3. Starting runners simultaneously

Simulate the start of a race: five runners take different amounts of time to prepare, after which the referee ensures that everyone is in position (`Barrier`), pauses, and gives one start signal to all runners (`ManualResetEventSlim`). Print readiness messages and a results table.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

string[] names = ["Olena", "Andrii", "Mariia", "Taras", "Iryna"];
int[] prepare = [300, 50, 200, 120, 0];      // preparation, ms
int[] run = [540, 600, 510, 570, 630];       // “race,” ms

// A barrier for the runners and referee: waits until everyone is ready.
using Barrier ready = new(names.Length + 1,
    b => Console.WriteLine($"Barrier passed: all " +
        $"{b.ParticipantCount} participants are in position"));
using ManualResetEventSlim startGun = new(false);
Stopwatch clock = new();
var finish = new (string Name, long Ms)[names.Length];
int place = 0;

var runners = names.Select((name, i) => new Thread(() =>
{
    Thread.Sleep(prepare[i]);
    Console.WriteLine($"{name}: at the start");
    ready.SignalAndWait();          // waits for all participants
    startGun.Wait();                // waits for the starting gun
    Thread.Sleep(run[i]);           // runs
    long ms = clock.ElapsedMilliseconds;
    int index = Interlocked.Increment(ref place) - 1;
    finish[index] = (name, ms);
})).ToList();

runners.ForEach(t => t.Start());
ready.SignalAndWait();              // the referee is the final participant
Console.WriteLine("Referee: set…");
Thread.Sleep(500);
clock.Start();
startGun.Set();                     // one signal for everyone
runners.ForEach(t => t.Join());

Console.WriteLine($"{"Place",5}  {"Runner",-8}{"Time, ms",8}");
for (int i = 0; i < finish.Length; i++)
    Console.WriteLine($"{i + 1,5}  {finish[i].Name,-8}" +
        $"{finish[i].Ms / 10 * 10,8}");
```

The barrier is created for six participants: five runners and the referee (the main thread). The action passed to the `Barrier` constructor executes once when all participants have reached the barrier. The runners then wait on `ManualResetEventSlim`, while the referee pauses and calls `Set`, releasing all runners simultaneously. The atomic `place` counter determines finishing position: each runner receives a unique index in the `finish` array. The order of the “at the start” lines depends on preparation times, while finishing times are rounded to 10 ms and may differ by 10 ms between runs. Output:

```
Iryna: at the start
Andrii: at the start
Taras: at the start
Mariia: at the start
Olena: at the start
Barrier passed: all 6 participants are in position
Referee: set…
Place  Runner  Time, ms
    1  Mariia       510
    2  Olena        540
    3  Taras        580
    4  Andrii       600
    5  Iryna        630
```
