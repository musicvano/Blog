---
title: "Практика"
description: "Тема 2. Процеси та потоки: розібрані приклади"
outline: [2, 3]
---

# Практика

Приклади виконано в конфігурації *Release* з .NET SDK 10.0.401 на процесорі Intel Core i9-11900KF (8 ядер, 16 логічних процесорів) у Windows 11. На інших комп’ютерах час виконання інший.

## Приклад 1. Процеси-обчислювачі

Створити консольну програму, яка рахує прості числа в діапазоні \[0; 10 000 000) за допомогою N дочірніх процесів. Кількість процесів задається аргументом командного рядка (за замовчуванням 4). Та сама програма, запущена з аргументами `--worker <from> <to>`, працює як обчислювач: рахує прості числа в діапазоні й виводить результат; для хибного діапазону повідомляє про помилку в потік помилок і повертає код 2. Координатор запускає обчислювачі, збирає їхній вивід, перевіряє коди завершення та виводить загальну кількість простих чисел і час.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// Режим обчислювача: B1Processes --worker <from> <to>
if (args is ["--worker", var fromText, var toText])
{
    if (!int.TryParse(fromText, out int from)
        || !int.TryParse(toText, out int to) || from >= to)
    {
        Console.Error.WriteLine(
            $"Хибний діапазон: {fromText}..{toText}");
        return 2;
    }

    Console.WriteLine(CountPrimes(from, to));
    return 0;
}

// Режим координатора: B1Processes [кількість процесів]
int count = args.Length > 0 ? int.Parse(args[0]) : 4;
const int Limit = 10_000_000;
string exe = Environment.ProcessPath!;       // цей самий застосунок

long start = Stopwatch.GetTimestamp();
List<(Process Proc, string Range)> children = [];
for (int i = 0; i < count; i++)
{
    int from = Limit / count * i;
    int to = i == count - 1 ? Limit : Limit / count * (i + 1);
    ProcessStartInfo info = new(exe)
    {
        RedirectStandardOutput = true,
        UseShellExecute = false,
    };
    info.ArgumentList.Add("--worker");
    info.ArgumentList.Add(from.ToString());
    info.ArgumentList.Add(to.ToString());
    children.Add((Process.Start(info)!, $"[{from}; {to})"));
}

long total = 0;
foreach (var (proc, range) in children)
{
    string output = proc.StandardOutput.ReadToEnd();
    proc.WaitForExit();
    if (proc.ExitCode != 0)
    {
        Console.Error.WriteLine(
            $"PID {proc.Id}: код завершення {proc.ExitCode}");
        return 1;
    }
    int primes = int.Parse(output);
    total += primes;
    Console.WriteLine(
        $"PID {proc.Id,6} {range,-22} простих: {primes,7}");
    proc.Dispose();
}
double ms = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
Console.WriteLine($"Процесів: {count}, усього простих: {total}, " +
    $"час: {ms:F0} мс");
return 0;

static int CountPrimes(int from, int to)
{
    int count = 0;
    for (int n = Math.Max(from, 2); n < to; n++)
    {
        bool prime = true;
        for (int d = 2; (long)d * d <= n; d++)
            if (n % d == 0) { prime = false; break; }
        if (prime) count++;
    }
    return count;
}
```

Програма має два режими, які розрізняє шаблон списку `["--worker", var fromText, var toText]`. Координатор запускає **той самий** виконуваний файл (`Environment.ProcessPath`), передаючи діапазон через `ArgumentList`, і перенаправляє лише стандартний вивід: повідомлення про помилки обчислювачів одразу з’являються в консолі. Усі процеси стартують до читання результатів, тому працюють одночасно; `ReadToEnd` і `WaitForExit` чекають кожен процес по черзі. Результати запусків у PowerShell з 1 і 8 процесами та прямого запуску обчислювача з хибним діапазоном:

```
PS> .\B1Processes.exe 1
PID  38716 [0; 10000000)          простих:  664579
Процесів: 1, усього простих: 664579, час: 2330 мс
PS> .\B1Processes.exe 8
PID  48380 [0; 1250000)           простих:   96469
PID  48412 [1250000; 2500000)     простих:   86603
PID  48480 [2500000; 3750000)     простих:   83645
PID  48376 [3750000; 5000000)     простих:   81796
PID  39992 [5000000; 6250000)     простих:   80303
PID  48084 [6250000; 7500000)     простих:   79445
PID  39996 [7500000; 8750000)     простих:   78589
PID  48320 [8750000; 10000000)    простих:   77729
Процесів: 8, усього простих: 664579, час: 641 мс
PS> .\B1Processes.exe --worker 10 5; $LASTEXITCODE
Хибний діапазон: 10..5
2
```

Вісім процесів дали прискорення 2330 / 641 ≈ 3,6. Воно менше за 8, бо запуск кожного процесу .NET коштує десятки мілісекунд, а перші частини діапазону (малі числа) перевіряються швидше за останні, тож процеси завантажені нерівномірно. Загальна кількість простих чисел збігається з результатом одного процесу.

## Приклад 2. Зупинка потоку прапорцем і винятки в потоках

Створити консольну програму з двома потоками. Потік `Scanner` у циклі імітує перевірку блоків диска, доки основний потік через 300 мс не надішле запит на зупинку; основний потік чекає його завершення не довше 2 с. Потік `Parser` підсумовує рядки-числа і не повинен аварійно завершувати процес у разі некоректного рядка: виняток має бути переданий основному потоку та виведений.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

DiskMonitor monitor = new();

Thread scanner = new(monitor.Scan) { Name = "Scanner" };
Thread parser = new(() => monitor.Parse(["12", "7", "x5", "40"]))
{
    Name = "Parser",
};
scanner.Start();
parser.Start();

Thread.Sleep(300);                  // основний потік «працює»
monitor.RequestStop();              // запит на зупинку
Console.WriteLine("Main: запит на зупинку надіслано");

bool stopped = scanner.Join(TimeSpan.FromSeconds(2));
parser.Join();
Console.WriteLine($"Scanner зупинився: {stopped}, " +
    $"перевірено блоків: {monitor.Blocks}");
Console.WriteLine($"Parser: сума {monitor.Sum}");
if (monitor.Error is { } error)
{
    Console.WriteLine($"Помилка в Parser: {error.GetType().Name}");
    Console.WriteLine($"  {error.Message}");
}

class DiskMonitor
{
    private volatile bool stopRequested;   // читається іншим потоком

    public int Blocks { get; private set; }
    public int Sum { get; private set; }
    public Exception? Error { get; private set; }

    public void RequestStop() => stopRequested = true;

    public void Scan()
    {
        while (!stopRequested)             // кооперативна зупинка
        {
            Thread.Sleep(20);              // «перевірка блоку диска»
            Blocks++;
        }
        Console.WriteLine($"{Thread.CurrentThread.Name}: зупинка");
    }

    public void Parse(string[] items)
    {
        try
        {
            foreach (string item in items)
                Sum += int.Parse(item);
        }
        catch (Exception ex)   // виняток не виходить за межі потоку
        {
            Error = ex;
        }
    }
}
```

Прапорець `stopRequested` оголошено з модифікатором `volatile`, бо його змінює основний потік, а читає потік `Scanner`. Потік завершує поточну порцію роботи й виходить із циклу сам – дані залишаються узгодженими. `Join(TimeSpan)` повертає `false`, якщо потік не завершився вчасно. Потік `Parser` перехоплює `FormatException` і зберігає її у властивості `Error`, яку основний потік перевіряє після `Join`; без `try`/`catch` виняток завершив би весь процес. Кількість перевірених блоків залежить від точності таймера ОС. Результат:

```
Main: запит на зупинку надіслано
Scanner: зупинка
Scanner зупинився: True, перевірено блоків: 11
Parser: сума 19
Помилка в Parser: FormatException
  The input string 'x5' was not in a correct format.
```

## Приклад 3. Вартість створення потоків і пул потоків

Створити консольну програму, яка виконує 10 000 дуже коротких робіт (запис 1 у свій елемент масиву) двома способами: окремим потоком `Thread` для кожної роботи та через пул потоків. Вивести загальний час, час на одну роботу, у скільки разів пул швидший, і перевірити, що всі роботи виконано. Перед вимірюванням виконати прогрівання на 1 000 роботах.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Count = 10_000;
int[] results = new int[Count];

Measure("окремі потоки", 1_000, results, UseThreads);  // прогрівання
Measure("пул потоків", 1_000, results, UsePool);
Console.WriteLine($"Робіт: {Count}");
Console.WriteLine("Спосіб            Час, мс  На роботу, мкс");
double threads = Measure("окремі потоки", Count, results, UseThreads);
double pool = Measure("пул потоків", Count, results, UsePool);
Console.WriteLine($"Пул швидший у {threads / pool:F1} раза");
Console.WriteLine($"Потоків у пулі: {ThreadPool.ThreadCount}");

static double Measure(string name, int count, int[] results,
    Action<int, int[]> run)
{
    Array.Clear(results);
    long start = Stopwatch.GetTimestamp();
    run(count, results);
    double ms = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    if (results.Take(count).Sum() != count)
        throw new InvalidOperationException("Не всі роботи виконано");
    if (count > 1_000)
        Console.WriteLine(
            $"{name,-15} {ms,9:F1} {ms * 1000 / count,15:F1}");
    return ms;
}

static void UseThreads(int count, int[] results)
{
    Thread[] threads = new Thread[count];
    for (int i = 0; i < count; i++)
    {
        int index = i;
        threads[i] = new Thread(() => results[index] = 1);
        threads[i].Start();
    }
    foreach (Thread thread in threads) thread.Join();
}

static void UsePool(int count, int[] results)
{
    using CountdownEvent done = new(count);
    for (int i = 0; i < count; i++)
    {
        ThreadPool.QueueUserWorkItem(index =>
        {
            results[index] = 1;
            done.Signal();
        }, i, preferLocal: false);
    }
    done.Wait();
}
```

Метод `Measure` приймає спосіб виконання як делегат `Action<int, int[]>`, тому обидва способи вимірюються однаково. Перевірка суми гарантує, що жодну роботу не пропущено. Окремий потік для кожної роботи коштує близько 55 мкс (створення стеку, структур ядра й керованого об’єкта), а пул виконує роботу приблизно за 0,3 мкс: 10 000 робіт виконали 14 уже створених потоків. Результат:

```
Робіт: 10000
Спосіб            Час, мс  На роботу, мкс
окремі потоки       549,4            54,9
пул потоків           3,1             0,3
Пул швидший у 178,6 раза
Потоків у пулі: 14
```
