---
title: "Практика"
description: "Тема 4. Потокобезпечні колекції: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Кеш дорогих обчислень

Створити програму, у якій вісім потоків одночасно запитують у спільному кеші `ConcurrentDictionary<TKey, TValue>` кількість простих чисел, не більших за 2, 4 і 6 мільйонів. Порівняти кількість викликів дорогої функції та час роботи для `GetOrAdd` з фабрикою значення і для словника, що зберігає `Lazy<int>`.

```cs
using System.Collections.Concurrent;
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int ThreadCount = 8;
int[] limits = [2_000_000, 4_000_000, 6_000_000];
int calls = 0;

// Дорога функція: кількість простих чисел, не більших за n.
int CountPrimes(int n)
{
    Interlocked.Increment(ref calls);
    int count = 0;
    for (int k = 2; k <= n; k++)
    {
        bool prime = true;
        for (int d = 2; d * d <= k; d++)
        {
            if (k % d == 0) { prime = false; break; }
        }
        if (prime) count++;
    }
    return count;
}

// 1. Фабрика GetOrAdd може виконатися кілька разів для ключа.
ConcurrentDictionary<int, int> plain = new();
Measure("GetOrAdd(key, factory)", () =>
{
    foreach (int n in limits)
    {
        plain.GetOrAdd(n, CountPrimes);
    }
});

// 2. Словник зберігає Lazy<int>: у словник може потрапити лише
// один об’єкт Lazy, тому обчислення виконується один раз.
ConcurrentDictionary<int, Lazy<int>> lazy = new();
Measure("GetOrAdd + Lazy<int>", () =>
{
    foreach (int n in limits)
    {
        _ = lazy.GetOrAdd(n, key => new Lazy<int>(
            () => CountPrimes(key))).Value;
    }
});

foreach (int n in limits)
{
    Console.WriteLine(
        $"π({n:N0}) = {plain[n]:N0} = {lazy[n].Value:N0}");
}

// Запускає однакову роботу в кількох потоках одночасно.
void Measure(string title, Action work)
{
    calls = 0;
    using Barrier start = new(ThreadCount);
    Thread[] threads = new Thread[ThreadCount];
    for (int i = 0; i < ThreadCount; i++)
    {
        threads[i] = new Thread(() =>
        {
            start.SignalAndWait();   // усі потоки стартують разом
            work();
        });
        threads[i].Start();
    }
    long t0 = Stopwatch.GetTimestamp();
    foreach (Thread t in threads) t.Join();
    double ms = Stopwatch.GetElapsedTime(t0).TotalMilliseconds;
    Console.WriteLine(
        $"{title,-24} викликів фабрики: {calls,2}, час {ms:F0} мс");
}
```

Клас `Barrier` змушує всі вісім потоків почати роботу одночасно. У першому варіанті фабрика виконується поза блокуванням словника, тож кожен потік обчислює кожне значення сам: 8 × 3 = 24 виклики, з яких у словник потрапляє лише по одному результату. У другому варіанті `GetOrAdd` повертає всім потокам той самий об’єкт `Lazy<int>`, а `Value` обчислює результат один раз, поки решта потоків чекають. Процесорного часу витрачено у вісім разів менше. Результат (у першому рядку викликів може бути менше за 24, якщо якийсь потік запізниться):

```
GetOrAdd(key, factory)   викликів фабрики: 24, час 2919 мс
GetOrAdd + Lazy<int>     викликів фабрики:  3, час 1940 мс
π(2 000 000) = 148 933 = 148 933
π(4 000 000) = 283 146 = 283 146
π(6 000 000) = 412 849 = 412 849
```

## Приклад 2. Незмінний список налаштувань

Створити програму, у якій чотири потоки-записувачі додають по 5 000 налаштувань у спільний незмінний список `ImmutableList<Setting>`, а потік-читач одночасно перевіряє, що кожен знімок списку цілісний. Показати, що звичайне присвоєння губить оновлення, а `ImmutableInterlocked.Update` – ні, і що знімок, зроблений до змін, не змінюється.

```cs
using System.Collections.Immutable;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Writers = 4;
const int PerWriter = 5_000;

ImmutableList<Setting> settings = [new("theme", "light")];
ImmutableList<Setting> snapshot = settings;    // знімок стану

// 1. Помилка: «прочитати–змінити–записати» без атомарності.
ImmutableList<Setting> naive = [];
RunWriters(w =>
{
    for (int i = 0; i < PerWriter; i++)
    {
        naive = naive.Add(new($"w{w}.key{i}", "1")); // гонитва
    }
});
int added = Writers * PerWriter;
Console.WriteLine($"Без CAS:  {naive.Count,6:N0} з {added:N0}");

// 2. ImmutableInterlocked.Update повторює перетворення, доки
// CompareExchange не замінить саме той список, який було прочитано.
int attempts = 0;
int readerChecks = 0;
bool stop = false;
Thread reader = new(() =>
{
    int last = 0;
    while (!Volatile.Read(ref stop))
    {
        ImmutableList<Setting> current = settings;  // знімок
        int count = current.Count;
        if (count < last || current[count - 1] is null)
        {
            throw new InvalidOperationException("Пошкоджений стан");
        }
        last = count;
        readerChecks++;
    }
});
reader.Start();

RunWriters(w =>
{
    for (int i = 0; i < PerWriter; i++)
    {
        Setting item = new($"w{w}.key{i}", i.ToString());
        ImmutableInterlocked.Update(ref settings, list =>
        {
            Interlocked.Increment(ref attempts);
            return list.Add(item);
        });
    }
});
Volatile.Write(ref stop, true);
reader.Join();

Console.WriteLine(
    $"З Update: {settings.Count - 1,6:N0} з {added:N0}, " +
    $"повторів перетворення: {attempts - added:N0}");
Console.WriteLine($"Перевірок читача: {readerChecks:N0}");
Console.WriteLine($"Знімок до змін: {snapshot.Count} елемент " +
    $"({snapshot[0].Name} = {snapshot[0].Value})");

static void RunWriters(Action<int> body)
{
    Thread[] threads = new Thread[Writers];
    for (int w = 0; w < Writers; w++)
    {
        int id = w;
        threads[w] = new Thread(() => body(id));
        threads[w].Start();
    }
    foreach (Thread t in threads) t.Join();
}

record Setting(string Name, string Value);
```

Запис `naive = naive.Add(…)` складається з читання поля, створення нового списку й запису посилання; два потоки, що прочитали ту саму версію, записують списки, у кожному з яких немає елемента іншого, тому більша частина оновлень губиться. `ImmutableInterlocked.Update` записує новий список через CAS лише тоді, коли поле досі посилається на прочитану версію, і в разі конфлікту повторює лямбду; лічильник `attempts` показує, скільки разів перетворення виконувалося марно: при частих записах повторів більше, ніж додавань. Читач працює без блокувань і не бачить частково зміненого списку, а `snapshot` зберігає початковий стан. Числа, крім рядка «Знімок», змінюються від запуску до запуску. Результат:

```
Без CAS:   7 558 з 20 000
З Update: 20 000 з 20 000, повторів перетворення: 42 226
Перевірок читача: 773 771
Знімок до змін: 1 елемент (theme = light)
```

## Приклад 3. Неблокуючий стек

Створити неблокуючий стек Трейбера на `Interlocked.CompareExchange` та перевірити його під навантаженням: вісім потоків одночасно додають по мільйону чисел і вилучають елементи. Перевірити, що кожен доданий елемент вилучено рівно один раз, і порівняти час з `ConcurrentStack<T>`.

```cs
using System.Collections.Concurrent;
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int ThreadCount = 8;
const int PerThread = 1_000_000;

Console.WriteLine($"Потоків: {ThreadCount}, операцій Push і Pop: " +
    $"{ThreadCount * PerThread:N0}");
Test("TreiberStack (CAS)", new TreiberStack<long>());
Test("ConcurrentStack", new ConcurrentStackAdapter<long>());

// Навантаження: усі потоки одночасно додають і вилучають числа.
static void Test(string title, IStack<long> stack)
{
    long pushedSum = 0, poppedSum = 0;
    int popped = 0;
    long start = Stopwatch.GetTimestamp();
    Thread[] threads = new Thread[ThreadCount];
    for (int t = 0; t < ThreadCount; t++)
    {
        int id = t;
        threads[t] = new Thread(() =>
        {
            long localPushed = 0, localPopped = 0;
            int localCount = 0;
            for (int i = 0; i < PerThread; i++)
            {
                long value = (long)id * PerThread + i;
                stack.Push(value);
                localPushed += value;
                if (i % 2 == 1)      // кожна друга ітерація – два Pop
                {
                    for (int k = 0; k < 2; k++)
                    {
                        if (stack.TryPop(out long v))
                        {
                            localPopped += v;
                            localCount++;
                        }
                    }
                }
            }
            Interlocked.Add(ref pushedSum, localPushed);
            Interlocked.Add(ref poppedSum, localPopped);
            Interlocked.Add(ref popped, localCount);
        });
        threads[t].Start();
    }
    foreach (Thread thread in threads) thread.Join();
    // Решту елементів вилучаємо в одному потоці.
    while (stack.TryPop(out long rest))
    {
        poppedSum += rest;
        popped++;
    }
    double ms = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    bool ok = popped == ThreadCount * PerThread
              && poppedSum == pushedSum;
    Console.WriteLine($"{title,-20} {ms,6:F0} мс, перевірка: " +
        (ok ? "без втрат і повторів" : "ПОМИЛКА"));
}

interface IStack<T>
{
    void Push(T item);
    bool TryPop(out T item);
}

// Неблокуючий стек Трейбера.
sealed class TreiberStack<T> : IStack<T>
{
    private sealed class Node(T value, Node? next)
    {
        public readonly T Value = value;
        public Node? Next = next;
    }

    private Node? head;

    public void Push(T item)
    {
        Node node = new(item, null);
        SpinWait spin = new();
        while (true)
        {
            Node? current = head;
            node.Next = current;
            // Замінити head, лише якщо його ніхто не змінив.
            if (Interlocked.CompareExchange(
                    ref head, node, current) == current)
            {
                return;
            }
            spin.SpinOnce();             // конфлікт: повторити
        }
    }

    public bool TryPop(out T item)
    {
        SpinWait spin = new();
        while (true)
        {
            Node? current = head;
            if (current is null)
            {
                item = default!;
                return false;
            }
            if (Interlocked.CompareExchange(
                    ref head, current.Next, current) == current)
            {
                item = current.Value;
                return true;
            }
            spin.SpinOnce();
        }
    }
}

// Адаптер ConcurrentStack<T> до інтерфейсу IStack<T>.
sealed class ConcurrentStackAdapter<T> : IStack<T>
{
    private readonly ConcurrentStack<T> items = new();
    public void Push(T item) => items.Push(item);
    public bool TryPop(out T item) => items.TryPop(out item!);
}
```

Інтерфейс `IStack<T>` дозволяє перевірити обидві реалізації одним методом `Test`. Потоки додають унікальні числа, на кожній другій ітерації двічі викликають `TryPop`, а суми накопичують у локальних змінних (без хибного розділення) і додають до спільних через `Interlocked.Add`. Якщо суми й кількості доданих і вилучених чисел рівні, жоден елемент не загубився й не був вилучений двічі. `TryPop` читає `current.Next` без блокування: вузли не використовуються повторно, а збирач сміття не звільняє вузол, на який ще посилається потік, тому проблеми ABA немає. `ConcurrentStack<T>` має додаткові можливості (`PushRange`, `TryPopRange`, перебір знімка), тож порівняння стосується лише цього навантаження. Результат (час змінюється між запусками):

```
Потоків: 8, операцій Push і Pop: 8 000 000
TreiberStack (CAS)      631 мс, перевірка: без втрат і повторів
ConcurrentStack        1342 мс, перевірка: без втрат і повторів
```
