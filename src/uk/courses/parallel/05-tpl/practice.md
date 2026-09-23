---
title: "Практика"
description: "Тема 5. Задачі TPL і async/await: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Граф залежних задач з умовними продовженнями

Створити програму, яка імітує завантаження даних із трьох джерел (A, B, C) з різними затримками, після завантаження всіх джерел формує звіт і зберігає його, а в разі помилки будь-якого джерела записує помилку в журнал. Граф задач побудувати методом `ContinueWith` з умовними продовженнями. Виконати два сценарії: усі джерела доступні та джерело B недоступне; для кожного вивести кінцеві стани задач.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

await RunScenarioAsync("усі джерела доступні", failing: null);
await RunScenarioAsync("джерело B недоступне", failing: "B");

static async Task RunScenarioAsync(string title, string? failing)
{
    Console.WriteLine($"=== Сценарій: {title}");
    Task<int> a = LoadAsync("A", 300, 120, failing);
    Task<int> b = LoadAsync("B", 200, 80, failing);
    Task<int> c = LoadAsync("C", 100, 45, failing);
    Task<int[]> all = Task.WhenAll(a, b, c);

    // Гілка успіху: звіт, потім збереження.
    Task<string> report = all.ContinueWith(
        t => $"звіт: сума = {t.Result.Sum()}, " +
             $"максимум = {t.Result.Max()}",
        CancellationToken.None,
        TaskContinuationOptions.OnlyOnRanToCompletion,
        TaskScheduler.Default);
    Task save = report.ContinueWith(
        t => Console.WriteLine($"  збережено {t.Result}"),
        CancellationToken.None,
        TaskContinuationOptions.OnlyOnRanToCompletion,
        TaskScheduler.Default);

    // Гілка помилки: виконується лише для Faulted.
    Task log = all.ContinueWith(
        t =>
        {
            foreach (Exception ex in t.Exception!.InnerExceptions)
            {
                Console.WriteLine($"  журнал помилок: {ex.Message}");
            }
        },
        CancellationToken.None,
        TaskContinuationOptions.OnlyOnFaulted,
        TaskScheduler.Default);

    // Одна з гілок завжди стає Canceled – чекаємо обидві.
    await Task.WhenAll(save, log).ContinueWith(_ => { },
        TaskScheduler.Default);

    Console.WriteLine($"  стани: all = {all.Status}, " +
        $"report = {report.Status},");
    Console.WriteLine($"         save = {save.Status}, " +
        $"log = {log.Status}");
}

static async Task<int> LoadAsync(
    string name, int delayMs, int value, string? failing)
{
    Console.WriteLine($"  завантаження {name} почато");
    await Task.Delay(delayMs);
    if (name == failing)
    {
        throw new HttpRequestException($"джерело {name}: тайм-аут");
    }
    Console.WriteLine($"  завантаження {name} завершено: {value}");
    return value;
}
```

Метод `LoadAsync` імітує завантаження через `Task.Delay`. Задача `all` завершується після всіх трьох завантажень; якщо хоча б одне кинуло виняток, вона переходить у стан `Faulted`. Від неї відходять дві гілки: `report` → `save` з умовою `OnlyOnRanToCompletion` і `log` з умовою `OnlyOnFaulted`. Продовження, умова якого не виконалася, отримує стан `Canceled`, тому `Task.WhenAll(save, log)` завжди завершується зі станом `Canceled`. Щоб не перехоплювати виняток, його «гасить» ще одне продовження `ContinueWith(_ => { })`. У кожне `ContinueWith` явно передано `TaskScheduler.Default`. Результат:

```
=== Сценарій: усі джерела доступні
  завантаження A почато
  завантаження B почато
  завантаження C почато
  завантаження C завершено: 45
  завантаження B завершено: 80
  завантаження A завершено: 120
  збережено звіт: сума = 245, максимум = 120
  стани: all = RanToCompletion, report = RanToCompletion,
         save = RanToCompletion, log = Canceled
=== Сценарій: джерело B недоступне
  завантаження A почато
  завантаження B почато
  завантаження C почато
  завантаження C завершено: 45
  завантаження A завершено: 120
  журнал помилок: джерело B: тайм-аут
  стани: all = Faulted, report = Canceled,
         save = Canceled, log = RanToCompletion
```

## Приклад 2. Асинхронний генератор показників датчика

Створити асинхронний генератор `IAsyncEnumerable<Reading>`, який через рівні проміжки часу (`PeriodicTimer`, 200 мс) повертає показники температури. Програма-споживач виводить кожен показник і ковзне середнє за останні 4 виміри, позначає перевищення ковзним середнім порогу 22 °C, записує показники у файл CSV і зупиняє опитування після 10 показників; загальний таймаут – 5 с.

```cs
using System.Runtime.CompilerServices;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int Window = 4;          // ковзне вікно для середнього
const double Limit = 22.0;     // поріг тривоги, °C
string csv = Path.Combine(Path.GetTempPath(), "sensor.csv");

using CancellationTokenSource cts = new();
cts.CancelAfter(TimeSpan.FromSeconds(5));   // запобіжний таймаут
Queue<double> window = new();
int count = 0;

await using (StreamWriter writer = new(csv))   // IAsyncDisposable
{
    await writer.WriteLineAsync("n;t;avg");
    try
    {
        await foreach (Reading r in ReadSensorAsync(
            "T1", TimeSpan.FromMilliseconds(200), cts.Token))
        {
            window.Enqueue(r.Value);
            if (window.Count > Window) window.Dequeue();
            double avg = window.Average();
            string alarm = avg > Limit ? "  ТРИВОГА" : "";
            Console.WriteLine($"{r.Number,2}. {r.Sensor}: " +
                $"{r.Value,5:F1} °C, середнє {avg,5:F2}{alarm}");
            await writer.WriteLineAsync(
                $"{r.Number};{r.Value:F1};{avg:F2}");
            if (++count == 10)
            {
                await cts.CancelAsync();   // досить показників
            }
        }
    }
    catch (OperationCanceledException)
    {
        Console.WriteLine(
            $"Опитування зупинено, показників: {count}");
    }
}
Console.WriteLine($"Файл: {Path.GetFileName(csv)}, " +
    $"рядків: {File.ReadLines(csv).Count()}");

// Асинхронний генератор: новий показник на кожен тік таймера.
static async IAsyncEnumerable<Reading> ReadSensorAsync(
    string sensor, TimeSpan period,
    [EnumeratorCancellation] CancellationToken token = default)
{
    Random random = new(7);
    double value = 21.0;
    using PeriodicTimer timer = new(period);
    int number = 0;
    while (await timer.WaitForNextTickAsync(token))
    {
        value += random.NextDouble() - 0.35;   // повільне зростання
        yield return new Reading(sensor, ++number, value);
    }
}

record Reading(string Sensor, int Number, double Value);
```

Генератор отримує токен через параметр з атрибутом `[EnumeratorCancellation]`, тому скасування перериває очікування `WaitForNextTickAsync` навіть між тіками. Показники датчика імітує `Random` зі сталим зерном, тому результат відтворюваний. Споживач зупиняє опитування викликом `CancelAsync()`: наступний виклик `WaitForNextTickAsync` кидає `OperationCanceledException`. Файл записує `StreamWriter`, який реалізує `IAsyncDisposable`, тому його закриває `await using` до підрахунку рядків. Ковзне вікно зберігається в черзі `Queue<double>`. Результат:

```
 1. T1:  21,0 °C, середнє 21,03
 2. T1:  21,6 °C, середнє 21,29
 3. T1:  21,9 °C, середнє 21,48
 4. T1:  21,6 °C, середнє 21,51
 5. T1:  21,6 °C, середнє 21,64
 6. T1:  21,9 °C, середнє 21,73
 7. T1:  21,6 °C, середнє 21,67
 8. T1:  22,2 °C, середнє 21,83
 9. T1:  22,7 °C, середнє 22,10  ТРИВОГА
10. T1:  23,2 °C, середнє 22,43  ТРИВОГА
Опитування зупинено, показників: 10
Файл: sensor.csv, рядків: 11
```

## Приклад 3. Паралельне завантаження сторінок з таймаутом

Створити програму, яка одночасно завантажує п’ять сторінок за допомогою `HttpClient` з таймаутом 1 с на кожен запит і виводить звіт: сторінка, результат (успіх, код помилки HTTP, таймаут), розмір, час, а також кількість успішних запитів, загальний час і суму часів запитів. Сторінки надає локальний тестовий сервер на `HttpListener` у тій самій програмі з різними затримками відповіді, тому програма не потребує інтернету.

```cs
using System.Diagnostics;
using System.Net;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;

const string Prefix = "http://localhost:5055/";
using CancellationTokenSource stop = new();
Task server = RunServerAsync(Prefix, stop.Token);

string[] pages = ["news", "weather", "slow", "missing", "rates"];
TimeSpan timeout = TimeSpan.FromSeconds(1);
using HttpClient client = new() { BaseAddress = new Uri(Prefix) };

Stopwatch total = Stopwatch.StartNew();
PageResult[] results = await Task.WhenAll(
    pages.Select(p => DownloadAsync(client, p, timeout)));
total.Stop();

Console.WriteLine($"{"Сторінка",-9} {"Результат",-22} {"Байт",6} " +
    $"{"мс",6}");
foreach (PageResult r in results)
{
    Console.WriteLine($"{r.Page,-9} {r.Status,-22} {r.Bytes,6} " +
        $"{r.Milliseconds,6:F0}");
}
int ok = results.Count(r => r.Status == "OK");
Console.WriteLine($"Успішно {ok} з {results.Length}, " +
    $"загальний час {total.ElapsedMilliseconds} мс, " +
    $"сума часів {results.Sum(r => r.Milliseconds):F0} мс");

await stop.CancelAsync();
await server;

static async Task<PageResult> DownloadAsync(
    HttpClient client, string page, TimeSpan timeout)
{
    using CancellationTokenSource cts = new(timeout);
    long start = Stopwatch.GetTimestamp();
    string status;
    int bytes = 0;
    try
    {
        using HttpResponseMessage response =
            await client.GetAsync(page, cts.Token);
        response.EnsureSuccessStatusCode();
        byte[] body =
            await response.Content.ReadAsByteArrayAsync(cts.Token);
        (status, bytes) = ("OK", body.Length);
    }
    catch (OperationCanceledException)
        when (cts.IsCancellationRequested)
    {
        status = $"таймаут {timeout.TotalSeconds} с";
    }
    catch (HttpRequestException ex)
    {
        status = $"HTTP {(int?)ex.StatusCode}";
    }
    double ms = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
    return new PageResult(page, status, bytes, ms);
}

// Локальний тестовий сервер: різні затримки та відповідь 404.
static async Task RunServerAsync(
    string prefix, CancellationToken token)
{
    using HttpListener listener = new();
    listener.Prefixes.Add(prefix);
    listener.Start();
    using CancellationTokenRegistration reg =
        token.Register(listener.Stop);
    List<Task> handlers = [];
    try
    {
        while (!token.IsCancellationRequested)
        {
            HttpListenerContext context =
                await listener.GetContextAsync();
            handlers.Add(HandleAsync(context, token));
        }
    }
    catch (HttpListenerException) when (token.IsCancellationRequested)
    {
        // listener.Stop() перериває очікування запиту
    }
    await Task.WhenAll(handlers);
}

static async Task HandleAsync(
    HttpListenerContext context, CancellationToken token)
{
    string page = context.Request.Url!.AbsolutePath.Trim('/');
    (int delay, int code) = page switch
    {
        "news" => (250, 200),
        "weather" => (400, 200),
        "slow" => (3000, 200),
        "rates" => (150, 200),
        _ => (50, 404),
    };
    try
    {
        await Task.Delay(delay, token);
        string html = $"<p>{page}: {new string('x', delay)}</p>";
        byte[] body = Encoding.UTF8.GetBytes(html);
        context.Response.StatusCode = code;
        await context.Response.OutputStream.WriteAsync(body, token);
        context.Response.Close();
    }
    catch (Exception ex) when (ex is OperationCanceledException
        or HttpListenerException)
    {
        context.Response.Abort();    // сервер зупиняється
    }
}

record PageResult(string Page, string Status, int Bytes,
    double Milliseconds);
```

Сервер обробляє кожен запит в окремій задачі `HandleAsync`, тому повільна сторінка `slow` (3 с) не затримує інші. Для кожного запиту створюється власне джерело скасування з таймаутом, а фільтр `when (cts.IsCancellationRequested)` відрізняє таймаут від інших причин скасування. Відповідь 404 перетворюється на `HttpRequestException` методом `EnsureSuccessStatusCode`. Загальний час (близько 1 с) визначає найдовший запит, а сума часів показує тривалість послідовного завантаження. Після звіту токен `stop` зупиняє сервер: `listener.Stop()` перериває `GetContextAsync`, а незавершені обробники скасовуються. Результат (мілісекунди змінюються від запуску до запуску):

```
Сторінка  Результат                Байт     мс
news      OK                        263    294
weather   OK                        416    440
slow      таймаут 1 с                 0   1009
missing   HTTP 404                    0    106
rates     OK                        164    192
Успішно 3 з 5, загальний час 1015 мс, сума часів 2040 мс
```
