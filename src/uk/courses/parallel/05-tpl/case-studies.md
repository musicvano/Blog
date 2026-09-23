---
title: "Приклади та типові помилки"
description: "Тема 5. Задачі TPL і async/await: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

Усі програми перевірено з .NET SDK 10.0.401 у конфігурації Release. Час виміряно на процесорі Intel Core i9-11900KF (8 ядер, 16 логічних процесорів) з прогрівом і медіаною п’яти вимірювань; на інших комп’ютерах числа будуть іншими.

### Паралельні обчислення статистики

Програма розбиває масив з 20 мільйонів випадкових чисел на 8 частин, обчислює статистику кожної частини в окремій задачі `Task.Run` і об’єднує результати після `Task.WhenAll`. Друга частина програми показує, як `await` і `AggregateException` повідомляють про помилки кількох задач.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

double[] data = new double[20_000_000];
Random random = new(42);
for (int i = 0; i < data.Length; i++) data[i] = random.NextDouble();

Stats seq = null!, par = null!;
double tSeq = await MedianAsync(() =>
{
    seq = Compute(data, 0, data.Length);
    return Task.CompletedTask;
});
double tPar = await MedianAsync(async () =>
    par = await ComputeParallelAsync(data, parts: 8));
Console.WriteLine($"Послідовно: {seq}");
Console.WriteLine($"Паралельно: {par}");
Console.WriteLine($"Різниця сум: {Math.Abs(seq.Sum - par.Sum):E1}");
Console.WriteLine(
    $"Час: {tSeq:F1} мс проти {tPar:F1} мс, S = {tSeq / tPar:F2}");

// Дві частини з трьох містять некоректні значення.
data[3] = double.NaN;
data[^1] = double.PositiveInfinity;
int third = data.Length / 3;
Task<Stats>[] tasks =
[
    Task.Run(() => Compute(data, 0, third)),
    Task.Run(() => Compute(data, third, 2 * third)),
    Task.Run(() => Compute(data, 2 * third, data.Length)),
];
Task<Stats[]> all = Task.WhenAll(tasks);
try
{
    await all;                        // кидає лише перший виняток
}
catch (InvalidDataException ex)
{
    Console.WriteLine($"await: {ex.Message}");
    foreach (Exception inner in all.Exception!.InnerExceptions)
    {
        Console.WriteLine($"  AggregateException: {inner.Message}");
    }
}
for (int i = 0; i < tasks.Length; i++)
{
    Console.WriteLine($"Задача {i}: {tasks[i].Status}");
}

static async Task<Stats> ComputeParallelAsync(double[] a, int parts)
{
    Task<Stats>[] tasks = new Task<Stats>[parts];
    int chunk = a.Length / parts;
    for (int p = 0; p < parts; p++)
    {
        int from = p * chunk;                  // копії для замикання
        int to = p == parts - 1 ? a.Length : from + chunk;
        tasks[p] = Task.Run(() => Compute(a, from, to));
    }
    Stats[] partial = await Task.WhenAll(tasks);   // порядок задач
    return partial.Aggregate(Stats.Combine);
}

static Stats Compute(double[] a, int from, int to)
{
    double sum = 0, squares = 0, max = double.MinValue;
    for (int i = from; i < to; i++)
    {
        double x = a[i];
        if (!double.IsFinite(x))
        {
            throw new InvalidDataException($"a[{i}] = {x}");
        }
        sum += x;
        squares += x * x;
        max = Math.Max(max, x);
    }
    return new(to - from, sum, squares, max);
}

// Прогрів і медіана п’яти вимірювань.
static async Task<double> MedianAsync(Func<Task> action)
{
    await action();
    double[] times = new double[5];
    for (int i = 0; i < times.Length; i++)
    {
        long start = Stopwatch.GetTimestamp();
        await action();
        times[i] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    }
    Array.Sort(times);
    return times[2];
}

record Stats(long Count, double Sum, double Squares, double Max)
{
    public double Mean => Sum / Count;
    public double StdDev => Math.Sqrt(Squares / Count - Mean * Mean);

    public static Stats Combine(Stats x, Stats y) => new(
        x.Count + y.Count, x.Sum + y.Sum, x.Squares + y.Squares,
        Math.Max(x.Max, y.Max));

    public override string ToString() =>
        $"n = {Count:N0}, x̄ = {Mean:F5}, σ = {StdDev:F5}";
}
```

Межі частин `from` і `to` оголошено всередині циклу, тому кожна лямбда захоплює власні копії. `Task.WhenAll` повертає масив результатів у порядку задач, а не в порядку завершення, тому об’єднання детерміноване. Суми трохи відрізняються: дійсні числа додаються в іншому порядку, а додавання з плаваючою комою не асоціативне. Прискорення близько 7 на 8 частинах обмежують пропускна здатність пам’яті та накладні витрати на запуск задач.

Метод `Compute` кидає `InvalidDataException`, якщо трапляється `NaN` або нескінченність. У другій частині програми дві задачі з трьох кидають виняток. `await all` кидає перший `InvalidDataException`, а властивість `all.Exception` містить обидва. Задачі, що кинули виняток, мають стан `Faulted`, а успішна – `RanToCompletion`. Результат:

```
Послідовно: n = 20 000 000, x̄ = 0,49994, σ = 0,28865
Паралельно: n = 20 000 000, x̄ = 0,49994, σ = 0,28865
Різниця сум: 4,2E-007
Час: 37,3 мс проти 5,2 мс, S = 7,14
await: a[3] = NaN
  AggregateException: a[3] = NaN
  AggregateException: a[19999999] = ∞
Задача 0: Faulted
Задача 1: RanToCompletion
Задача 2: Faulted
```

### Хешування файлів зі скасуванням

Програма створює 100 файлів по 1 МБ і обчислює їхні хеші SHA-256. Операцію можна скасувати клавішею **Esc** або таймаутом (кількість секунд – аргумент командного рядка). Два джерела скасування об’єднано пов’язаним токеном, прогрес виводить власна реалізація `IProgress<T>`.

```cs
using System.Security.Cryptography;

Console.OutputEncoding = System.Text.Encoding.UTF8;

int seconds = args.Length > 0 ? int.Parse(args[0]) : 10;
string folder = Path.Combine(Path.GetTempPath(), "hash-demo");
string[] files = await CreateFilesAsync(folder, count: 100);

using CancellationTokenSource esc = new();
using CancellationTokenSource timeout = new();
timeout.CancelAfter(TimeSpan.FromSeconds(seconds));
using CancellationTokenSource linked = CancellationTokenSource
    .CreateLinkedTokenSource(esc.Token, timeout.Token);
using CancellationTokenRegistration reg = linked.Token.Register(
    () => Console.WriteLine("  [Register] запит скасування"));

_ = WatchEscapeAsync(esc);    // окрема задача стежить за клавіатурою
Console.WriteLine($"Хешування {files.Length} файлів, " +
    $"Esc – скасувати, таймаут {seconds} с");

ConsoleProgress progress = new(files.Length);
int done = 0;
try
{
    done = await HashAllAsync(files, progress, linked.Token);
    Console.WriteLine($"Готово: {done} файлів");
}
catch (OperationCanceledException)
{
    string reason = timeout.IsCancellationRequested
        ? "таймаут" : "клавіша Esc";
    Console.WriteLine($"Операцію скасовано ({reason}), " +
        $"оброблено {progress.Done} з {files.Length} файлів");
}

static async Task<int> HashAllAsync(string[] files,
    IProgress<string> progress, CancellationToken token)
{
    foreach (string file in files)
    {
        token.ThrowIfCancellationRequested();
        await using FileStream stream = File.OpenRead(file);
        byte[] hash = await SHA256.HashDataAsync(stream, token);
        await Task.Delay(40, token);   // імітація повільного диска
        string hex = Convert.ToHexString(hash)[..16];
        progress.Report($"{Path.GetFileName(file)} {hex}");
    }
    return files.Length;
}

static async Task WatchEscapeAsync(CancellationTokenSource cts)
{
    if (Console.IsInputRedirected) return;   // немає клавіатури
    while (!cts.IsCancellationRequested)
    {
        if (Console.KeyAvailable
            && Console.ReadKey(true).Key == ConsoleKey.Escape)
        {
            await cts.CancelAsync();
            return;
        }
        await Task.Delay(50);
    }
}

static async Task<string[]> CreateFilesAsync(string folder, int count)
{
    Directory.CreateDirectory(folder);
    string[] names = new string[count];
    byte[] buffer = new byte[1 << 20];               // 1 МБ
    for (int i = 0; i < count; i++)
    {
        names[i] = Path.Combine(folder, $"file{i:D3}.bin");
        new Random(i).NextBytes(buffer);             // сталий вміст
        await File.WriteAllBytesAsync(names[i], buffer);
    }
    return names;
}

// Власна реалізація IProgress<T>: виводить одразу й по порядку.
class ConsoleProgress(int total) : IProgress<string>
{
    public int Done { get; private set; }

    public void Report(string value)
    {
        Done++;
        if (Done % 20 == 0 || Done == total)
        {
            Console.WriteLine($"  {Done,3}/{total}: {value}");
        }
    }
}
```

Метод `HashAllAsync` перевіряє токен перед кожним файлом, а `SHA256.HashDataAsync` і `Task.Delay` отримують той самий токен, тому скасування спрацьовує навіть посеред очікування. Задача `WatchEscapeAsync` не очікується (відкидання `_ =`) і не кидає винятків; якщо введення перенаправлено з файла, клавіатури немає, тому задача одразу завершується. Реєстрація `Register` виводить повідомлення в момент скасування, ще до того, як операція його помітить. Результат запуску `dotnet run -c Release -- 2` (таймаут 2 с; кількість оброблених файлів залежить від комп’ютера):

```
Хешування 100 файлів, Esc – скасувати, таймаут 2 с
   20/100: file019.bin 3E2A6E1588BA5652
  [Register] запит скасування
Операцію скасовано (таймаут), оброблено 39 з 100 файлів
```

Без таймауту (`dotnet run -c Release -- 30`) програма обробляє всі файли й виводить рядки `40/100`, `60/100`, `80/100`, `100/100` та «Готово: 100 файлів». Скасування клавішею **Esc** у Windows Terminal показано на рис. 5.9.

::: info Знімок екрана
Windows Terminal: dotnet run -c Release – 30 in the example folder, press Esc after the 40/100 line; progress lines and «Операцію скасовано (клавіша Esc), оброблено NN з 100 файлів»
:::

Рис. 5.9. Прогрес і скасування клавішею Esc у консолі {.caption}

### Асинхронне читання файлів

Програма створює 400 текстових файлів (по 40 000 слів) і підраховує загальну кількість слів синхронно та асинхронно з різним обмеженням кількості одночасних операцій через `SemaphoreSlim`.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

string folder = Path.Combine(Path.GetTempPath(), "words-demo");
string[] files = await CreateTextFilesAsync(folder, count: 400);

await MeasureAsync("Синхронно, по черзі", () =>
    Task.FromResult(files.Sum(f => CountWords(File.ReadAllText(f)))));
foreach (int limit in new[] { 1, 4, 16, 64 })
{
    await MeasureAsync($"Асинхронно, до {limit} одночасно",
        () => CountAllAsync(files, limit));
}

static async Task<long> CountAllAsync(string[] files, int limit)
{
    using SemaphoreSlim gate = new(limit);
    Task<long>[] tasks = files.Select(async file =>
    {
        await gate.WaitAsync();          // черга на вхід
        try
        {
            string text = await File.ReadAllTextAsync(file);
            return CountWords(text);
        }
        finally
        {
            gate.Release();              // звільнити місце
        }
    }).ToArray();
    long[] counts = await Task.WhenAll(tasks);
    return counts.Sum();
}

static long CountWords(string text)
{
    long words = 0;
    bool inWord = false;
    foreach (char c in text)
    {
        bool letter = char.IsLetter(c) || c == '’';
        if (letter && !inWord) words++;
        inWord = letter;
    }
    return words;
}

static async Task MeasureAsync(string title, Func<Task<long>> run)
{
    await run();                                     // прогрів
    double[] times = new double[5];
    long words = 0;
    for (int i = 0; i < times.Length; i++)
    {
        long start = Stopwatch.GetTimestamp();
        words = await run();
        times[i] = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    }
    Array.Sort(times);
    Console.WriteLine(
        $"{title,-32} {words,12:N0} слів {times[2],8:F1} мс");
}

static async Task<string[]> CreateTextFilesAsync(
    string folder, int count)
{
    string[] vocabulary =
        ["потік", "задача", "ядро", "пам’ять", "кеш"];
    Directory.CreateDirectory(folder);
    string[] names = new string[count];
    for (int i = 0; i < count; i++)
    {
        names[i] = Path.Combine(folder, $"doc{i:D3}.txt");
        if (File.Exists(names[i])) continue;
        Random random = new(i);
        IEnumerable<string> words = Enumerable.Range(0, 40_000)
            .Select(_ => vocabulary[random.Next(vocabulary.Length)]);
        string text = string.Join(' ', words);
        await File.WriteAllTextAsync(names[i], text);
    }
    return names;
}
```

Лямбда в `Select` асинхронна, тому `Select` одразу створює 400 задач, але в критичну секцію між `WaitAsync` і `Release` одночасно потрапляє не більше `limit` з них. Решта чекає, не займаючи потоків. Результат на i9-11900KF (файли вже в кеші операційної системи):

```
Синхронно, по черзі                16 000 000 слів    578,5 мс
Асинхронно, до 1 одночасно         16 000 000 слів    916,9 мс
Асинхронно, до 4 одночасно         16 000 000 слів    249,7 мс
Асинхронно, до 16 одночасно        16 000 000 слів    153,0 мс
Асинхронно, до 64 одночасно        16 000 000 слів    170,6 мс
```

Результати показують дві важливі речі. По-перше, асинхронне читання **по одному файлу** (обмеження 1) повільніше за синхронне: асинхронний ввід-вивід має накладні витрати, а файли вже в кеші й читаються майже миттєво. Асинхронність не прискорює одну операцію, вона звільняє потік. По-друге, одночасна обробка дала прискорення майже в 4 рази: після `await` продовження (підрахунок слів) виконуються на різних потоках пулу паралельно. Понад 16 одночасних операцій (кількість логічних процесорів) виграшу немає.

### Подія в задачу

Метод `WaitForFileAsync` перетворює подію `FileSystemWatcher.Created` на задачу за допомогою `TaskCompletionSource<string>` і підтримує таймаут та скасування. Окрема задача-«виробник» імітує іншу програму, яка записує файл через 700 мс.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

string inbox = Path.Combine(Path.GetTempPath(), "inbox-demo");
Directory.CreateDirectory(inbox);
foreach (string old in Directory.GetFiles(inbox)) File.Delete(old);

Stopwatch clock = Stopwatch.StartNew();
void Log(string text) =>
    Console.WriteLine($"[{clock.ElapsedMilliseconds,5} мс] {text}");

// Інша «програма» створює звіт через 700 мс.
Task producer = Task.Run(async () =>
{
    await Task.Delay(700);
    await File.WriteAllTextAsync(
        Path.Combine(inbox, "report.csv"), "id;sum\n1;250\n");
    Log("виробник записав report.csv");
});

Log("очікуємо report.csv (таймаут 2 с)");
string path = await WaitForFileAsync(inbox, "report.csv",
    TimeSpan.FromSeconds(2));
Log($"отримано подію: {Path.GetFileName(path)}");
await producer;

try
{
    Log("очікуємо missing.csv (таймаут 1 с)");
    await WaitForFileAsync(inbox, "missing.csv",
        TimeSpan.FromSeconds(1));
}
catch (TimeoutException)
{
    Log("файл не з’явився: TimeoutException");
}

using CancellationTokenSource cts =
    new(TimeSpan.FromMilliseconds(300));
try
{
    Log("очікуємо data.csv (скасування через 300 мс)");
    await WaitForFileAsync(inbox, "data.csv",
        TimeSpan.FromSeconds(5), cts.Token);
}
catch (OperationCanceledException ex)
{
    Log($"очікування скасовано: {ex.GetType().Name}");
}

// Подія FileSystemWatcher.Created → задача Task<string>.
static async Task<string> WaitForFileAsync(string folder,
    string name, TimeSpan timeout, CancellationToken token = default)
{
    TaskCompletionSource<string> tcs =
        new(TaskCreationOptions.RunContinuationsAsynchronously);
    using FileSystemWatcher watcher = new(folder, name);
    watcher.Created += (_, e) => tcs.TrySetResult(e.FullPath);
    watcher.Error += (_, e) => tcs.TrySetException(e.GetException());
    watcher.EnableRaisingEvents = true;

    string file = Path.Combine(folder, name);
    if (File.Exists(file)) return file;   // файл уже був

    using CancellationTokenRegistration reg =
        token.Register(() => tcs.TrySetCanceled(token));
    return await tcs.Task.WaitAsync(timeout);
}
```

Спостерігача вмикають **до** перевірки `File.Exists`: інакше файл, створений між перевіркою і підпискою, було б пропущено. Подія `Error` переводить задачу в стан `Faulted`, реєстрація токена – у `Canceled`, а `WaitAsync(timeout)` обмежує очікування. Оператори `using` звільняють спостерігача та реєстрацію після завершення будь-якого з трьох сценаріїв. Результат (мілісекунди трохи змінюються від запуску до запуску):

```
[    1 мс] очікуємо report.csv (таймаут 2 с)
[  711 мс] виробник записав report.csv
[  711 мс] отримано подію: report.csv
[  711 мс] очікуємо missing.csv (таймаут 1 с)
[ 1716 мс] файл не з’явився: TimeoutException
[ 1717 мс] очікуємо data.csv (скасування через 300 мс)
[ 2024 мс] очікування скасовано: TaskCanceledException
```

## Типові помилки

Таблиця 5.2. Типові помилки під час роботи із задачами та async/await {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| програма з інтерфейсом «зависає» на `task.Result` | взаємоблокування з контекстом синхронізації; використовувати `await` по всьому ланцюжку викликів |
| `catch (IOException)` не спрацьовує після `Wait()` | `Wait` і `Result` кидають `AggregateException`; перехоплювати його або використовувати `await` |
| після `await Task.WhenAll` видно лише одну помилку | `await` кидає перший виняток; решту читати з `whenAllTask.Exception.InnerExceptions` |
| скасування не спрацьовує | токен не передано в операцію або цикл не перевіряє `IsCancellationRequested` |
| задача має стан `Faulted` замість `Canceled` | `OperationCanceledException` кинуто з іншим токеном або токен не передано в `Task.Run` |
| `StartNew(async …)` «завершується» одразу | повертає `Task<Task>`; використовувати `Task.Run` або `Unwrap()` |
| повідомлення `Progress<T>` у консолі йдуть не по порядку | немає контексту синхронізації, обробники виконуються в пулі; власна реалізація `IProgress<T>` |
| тисячі одночасних запитів або відкритих файлів | обмежити кількість операцій `SemaphoreSlim.WaitAsync` |
