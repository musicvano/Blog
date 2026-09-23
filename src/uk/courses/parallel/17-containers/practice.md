---
title: "Практика"
description: "Тема 17. Docker, Kubernetes, Aspire: розібрані приклади"
outline: [2, 3]
---

# Практика

Приклади 1 і 2 виконуються в кластері kind з лекції (сценарій `kind-setup.ps1`, реєстр `localhost:5001`, простір імен `pro16`). Приклад 3 потребує лише Docker Desktop і CLI `aspire`.

## Приклад 1. Розподілене обчислення π завданням Kubernetes

Створити консольну програму, яка обчислює одну частину числа $\pi$ методом Монте-Карло: номер частини береться зі змінної `JOB_COMPLETION_INDEX` (або з аргументу), кількість точок – зі змінної `POINTS`, результат виводиться одним рядком. Зібрати образ, запустити 8 частин як індексоване завдання (*Indexed Job*) Kubernetes з різним ступенем паралельності, зібрати результати з журналів подів і виміряти час.

Проєкт – консольний (`dotnet new console -n Pi`), `Program.cs`:

```cs
using System.Diagnostics;

// Одна частина обчислення π методом Монте-Карло.
// Номер частини – з JOB_COMPLETION_INDEX (Indexed Job) або
// з аргументу; кількість точок – зі змінної POINTS.
string? env = Environment.GetEnvironmentVariable(
    "JOB_COMPLETION_INDEX");
int index = int.Parse(env ?? (args.Length > 0 ? args[0] : "0"));
long points = long.Parse(
    Environment.GetEnvironmentVariable("POINTS") ?? "100000000");

Stopwatch clock = Stopwatch.StartNew();
ulong state = 0x9E3779B97F4A7C15UL * (ulong)(index + 1); // зерно
long inside = 0;
for (long i = 0; i < points; i++)
{
    double x = Next(ref state), y = Next(ref state);
    if (x * x + y * y <= 1.0) inside++;
}
// Один рядок результату: його збирає kubectl logs.
Console.WriteLine($"part={index} inside={inside} total={points} " +
    $"seconds={clock.Elapsed.TotalSeconds:F2} " +
    $"host={Environment.MachineName}");

// Генератор xorshift64*: швидкий і свій для кожної частини.
static double Next(ref ulong s)
{
    s ^= s >> 12; s ^= s << 25; s ^= s >> 27;
    return ((s * 2685821657736338717UL) >> 11) * (1.0 / (1UL << 53));
}
```

Кожна частина має власне зерно генератора, тому частини незалежні й результат відтворюваний. `Dockerfile` (і `.dockerignore` з рядками `bin/`, `obj/`) у теці проєкту:

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/runtime:10.0-noble-chiseled
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "Pi.dll"]
```

```powershell
docker build -t localhost:5001/pi:1.0 .
docker push localhost:5001/pi:1.0
docker run --rm -e POINTS=100000000 localhost:5001/pi:1.0 5
```

Локальна перевірка вивела `part=5 inside=78532068 total=100000000 seconds=0.53 host=aa437cfaca3a` (у контейнері інваріантна культура, тому десяткова крапка). Маніфест `pi-job.yaml`:

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: pi
  namespace: pro16
spec:
  completions: 8             # вісім частин обчислення
  parallelism: 4             # одночасно не більше 4 подів
  completionMode: Indexed    # под отримує JOB_COMPLETION_INDEX
  backoffLimit: 2
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: pi
          image: localhost:5001/pi:1.0
          env:
            - { name: POINTS, value: "1000000000" }
          resources:
            requests: { cpu: "1" }
            limits: { cpu: "1", memory: 128Mi }
```

Запуск, очікування й збирання результату в PowerShell:

```powershell
kubectl apply -f pi-job.yaml
kubectl -n pro16 wait --for=condition=complete job/pi --timeout=300s
kubectl -n pro16 get job pi
$parts = kubectl -n pro16 logs -l job-name=pi --tail=-1 |
    Select-String 'inside=(\d+) total=(\d+)' |
    ForEach-Object { [pscustomobject]@{
        Inside = [long]$_.Matches[0].Groups[1].Value
        Total = [long]$_.Matches[0].Groups[2].Value } }
$inside = ($parts | Measure-Object Inside -Sum).Sum
$total = ($parts | Measure-Object Total -Sum).Sum
"частин: {0}, точок: {1:N0}, π ≈ {2:F6}" -f $parts.Count,
    $total, (4.0 * $inside / $total)
```

```
NAME   STATUS     COMPLETIONS   DURATION   AGE
pi     Complete   8/8           10s        20s
частин: 8, точок: 8 000 000 000, π ≈ 3,141592
```

Журнал кожного пода (`kubectl -n pro16 logs -l job-name=pi --prefix`) містить рядок на зразок `part=6 inside=785395223 total=1000000000 seconds=5.95 host=pi-6`: под індексованого завдання отримує ім’я хоста `pi-<номер>`, а одна частина з мільярдом точок рахується ≈ 6 с. Щоб повторити запуск, завдання спочатку видаляють (`kubectl -n pro16 delete job pi`), бо Job не перезапускається після завершення. Час від `kubectl apply` до завершення для різних значень `parallelism` (медіана п’яти запусків) наведено в табл. 17.6.

Таблиця 17.6. Час індексованого завдання з 8 частин {.caption}

| **parallelism** | **Час, с** | **Прискорення** | **Хвиль подів** |
| --- | --- | --- | --- |
| 1 | 64,97 | 1,00 | 8 |
| 2 | 34,93 | 1,86 | 4 |
| 4 | 17,88 | 3,63 | 2 |
| 8 | 9,88 | 6,57 | 1 |

Прискорення менше за кількість подів, бо кожен под має накладні витрати ≈ 2 с (планування, запуск контейнера, завантаження .NET): при послідовному виконанні це $8 \times (6 + 2) \approx 65$ с. Чим довша одна частина, тим менша частка накладних витрат. Ресурси `requests: { cpu: "1" }` гарантують кожному поду ядро, тож 8 подів на двох вузлах kind не заважають одне одному.

## Приклад 2. Автомасштабування обчислювального сервісу

Розгорнути обчислювальний сервіс (API застосунку `Primes` з лекції, ендпоінт `GET /primes?to=N`) з HorizontalPodAutoscaler: від 1 до 8 реплік, ціль – 60 % процесора від `requests`. Створити консольний навантажувальний клієнт, який заданою кількістю задач безперервно викликає URL і кожні 10 с виводить пропускну здатність, середню затримку, кількість подів, що відповідали, і кількість помилок. Простежити масштабування під навантаженням і після нього.

Спочатку в кластер встановлюють metrics-server з офіційного маніфесту і додають параметр, без якого він не приймає самопідписані сертифікати kubelet у kind:

```powershell
$ms = "https://github.com/kubernetes-sigs/metrics-server/" +
    "releases/latest/download/components.yaml"
kubectl apply -f $ms
$patch = '[{"op":"add","path":"/spec/template/spec/containers/0/' +
    'args/-","value":"--kubelet-insecure-tls"}]'
kubectl -n kube-system patch deployment metrics-server `
    --type=json -p $patch
kubectl top nodes
```

Через ≈ 30 с `kubectl top nodes` показує процесор і пам’ять вузлів. Маніфест `calc-hpa.yaml` (порт 30081 опубліковано в `kind.yaml`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: calc
  namespace: pro16
spec:
  replicas: 1
  selector:
    matchLabels: { app: calc }
  template:
    metadata:
      labels: { app: calc }
    spec:
      containers:
        - name: calc
          image: localhost:5001/primes-api:1.1
          ports: [{ containerPort: 8080 }]
          resources:
            requests: { cpu: 250m }   # база для відсотків HPA
            limits: { cpu: 500m, memory: 256Mi }
          readinessProbe:
            httpGet: { path: /health/live, port: 8080 }
            periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: calc
  namespace: pro16
spec:
  type: NodePort
  selector: { app: calc }
  ports: [{ port: 80, targetPort: 8080, nodePort: 30081 }]
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: calc
  namespace: pro16
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: calc
  minReplicas: 1
  maxReplicas: 8
  metrics:
    - type: Resource
      resource:
        name: cpu
        target: { type: Utilization, averageUtilization: 60 }
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 60   # типово 300 с
```

Ендпоінт `/primes` не використовує RabbitMQ і Redis, тому готовність перевіряє `/health/live`. Навантажувальний клієнт (`dotnet new console -n Load`):

```cs
using System.Collections.Concurrent;
using System.Diagnostics;
using System.Net.Http.Json;

// Навантажувальний клієнт: N задач безперервно викликають URL;
// кожні 10 с – пропускна здатність, затримка, кількість подів.
Console.OutputEncoding = System.Text.Encoding.UTF8;
if (args.Length < 1 || args.Contains("--help"))
{
    Console.WriteLine("Використання: Load <url> [задач] [секунд]");
    return 1;
}
string url = args[0];
int tasks = args.Length > 1 ? int.Parse(args[1]) : 8;
int seconds = args.Length > 2 ? int.Parse(args[2]) : 120;

// Нове з’єднання кожні 2 с: інакше keep-alive «прив’язує»
// клієнта до одного пода (Service балансує з’єднання).
using HttpClient http = new(new SocketsHttpHandler
{
    PooledConnectionLifetime = TimeSpan.FromSeconds(2),
})
{ Timeout = TimeSpan.FromSeconds(30) };

ConcurrentDictionary<string, int> hosts = new();
long count = 0, errors = 0, ticks = 0;
Stopwatch total = Stopwatch.StartNew();
using CancellationTokenSource stop =
    new(TimeSpan.FromSeconds(seconds));

Task[] clients = [.. Enumerable.Range(0, tasks).Select(_ =>
    Task.Run(async () =>
    {
        while (!stop.IsCancellationRequested)
        {
            long start = Stopwatch.GetTimestamp();
            try
            {
                Reply? r = await http.GetFromJsonAsync<Reply>(url);
                hosts.AddOrUpdate(r!.Host, 1, (_, n) => n + 1);
                Interlocked.Add(ref ticks,
                    Stopwatch.GetTimestamp() - start);
                Interlocked.Increment(ref count);
            }
            catch (Exception) when (!stop.IsCancellationRequested)
            {
                Interlocked.Increment(ref errors);
            }
            catch (OperationCanceledException) { }
        }
    }))];

Console.WriteLine("   час  запитів/с  затримка, мс  подів  помилок");
while (!stop.IsCancellationRequested)
{
    try { await Task.Delay(10_000, stop.Token); }
    catch (OperationCanceledException) { }
    long n = Interlocked.Exchange(ref count, 0);
    long t = Interlocked.Exchange(ref ticks, 0);
    int pods = hosts.Count;
    hosts.Clear();
    double ms = n == 0 ? 0
        : t * 1000.0 / Stopwatch.Frequency / n;
    Console.WriteLine($"{total.Elapsed.TotalSeconds,5:F0} с" +
        $"{n / 10.0,11:F1}{ms,14:F0}{pods,7}" +
        $"{Interlocked.Exchange(ref errors, 0),9}");
}
await Task.WhenAll(clients);
return 0;

sealed record Reply(long To, long Primes, string Host);
```

Запуск: `kubectl apply -f calc-hpa.yaml`, у другій вкладці термінала `kubectl -n pro16 get hpa calc -w`, у першій – клієнт з 8 задачами на 180 с (один запит рахує прості числа до 300 000, ≈ 30 мс процесорного часу):

```powershell
dotnet run -c Release -- `
    "http://localhost:30081/primes?to=300000" 8 180
```

```
 час  запитів/с  затримка, мс  подів  помилок
 10 с       30,4           258      1        0
 20 с       30,6           264      1        0
 30 с       36,0           223      2        0
 40 с       63,6           126      2        0
 50 с      102,9            78      4        0
 60 с      111,5            72      4        0
 70 с      108,2            74      4        0
 80 с      126,9            63      7        0
 90 с      177,5            45      8        0
100 с      164,1            49      8        0
…
180 с      188,6            42      8        0
```

Стовпці `TARGETS` і `REPLICAS` команди `kubectl get hpa calc -w` за той самий час:

```
cpu: 4%/60%     1      (до навантаження)
cpu: 101%/60%   1
cpu: 200%/60%   2
cpu: 199%/60%   4
cpu: 173%/60%   8
cpu: 131%/60%   8      (навантаження триває)
cpu: 0%/60%     8      (клієнт завершився)
cpu: 0%/60%     5
cpu: 0%/60%     1      (через ≈ 75 с після завершення)
```

Один под обмежений `limits.cpu: 500m`, тобто 200 % від `requests` (250m), і обслуговує лише ≈ 30 запитів за секунду з затримкою 260 мс. HPA перераховує кількість реплік кожні 15 с за формулою $\text{replicas} = \lceil \text{replicas} \times \frac{\text{поточне}}{\text{ціль}} \rceil$ і за один крок щонайбільше подвоює її (типова поведінка `scaleUp`), тому кількість подів росла 1 → 2 → 4 → 8. З 8 подами пропускна здатність зросла в ≈ 6 разів, а затримка впала до 45 мс; завантаження так і не впало до 60 %, бо 8 – максимум. Після зупинки клієнта HPA чекав вікно стабілізації (60 с) і зменшив кількість подів до 1. Без `PooledConnectionLifetime` клієнт тримав би 8 постійних з’єднань, і нові поди майже не отримували б запитів.

## Приклад 3. Застосунок Aspire з кешем Redis і власною метрикою

Створити застосунок Aspire з двох вебсервісів: `calc` (повільне обчислення кількості простих чисел до $n$, дві репліки) і `front` (приймає `GET /count/{n}`, шукає відповідь у кеші Redis, а в разі промаху викликає `calc` через виявлення сервісів і зберігає результат на 10 хв). Фронтенд публікує власні метрики: лічильник запитів `front.requests` з міткою `result` (`hit`/`miss`) і гістограму `front.calc.duration`. Перевірити кешування, розподіл викликів між репліками й трасування.

Рішення `Cache` з чотирьох проєктів: `Cache.AppHost`, `Cache.ServiceDefaults` (з шаблону `aspire-starter`), вебпроєкти `Cache.Calc` і `Cache.Front` (`dotnet new web`) з посиланням на `Cache.ServiceDefaults`; у `Cache.Front` додано пакет `Aspire.StackExchange.Redis.DistributedCaching` (13.5.4), у `Cache.AppHost` – `Aspire.Hosting.Redis`. AppHost:

```cs
IDistributedApplicationBuilder builder =
    DistributedApplication.CreateBuilder(args);

var redis = builder.AddRedis("redis")
    .WithContainerName("pro16-cache-redis");

var calc = builder.AddProject<Projects.Cache_Calc>("calc")
    .WithReplicas(2);                       // два екземпляри

builder.AddProject<Projects.Cache_Front>("front")
    .WithReference(calc)                    // services__calc__…
    .WithReference(redis).WaitFor(redis)    // рядок підключення
    .WithExternalHttpEndpoints();

builder.Build().Run();
```

`Cache.Calc/Program.cs` (файл `PrimeMath.cs` – з лекції):

```cs
using Primes;

// Повільний сервіс: кількість простих чисел до n.
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();
WebApplication app = builder.Build();
app.MapDefaultEndpoints();

app.MapGet("/primes/{n:long}", (long n) => new CalcReply(
    n, PrimeMath.Count(2, n), Environment.MachineName +
    "/" + Environment.ProcessId));

app.Run();

record CalcReply(long N, long Primes, string Host);
```

`Cache.Front/Program.cs`:

```cs
using System.Diagnostics;
using System.Diagnostics.Metrics;
using Microsoft.Extensions.Caching.Distributed;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();
builder.AddRedisDistributedCache("redis");     // IDistributedCache
// Адресу «https+http://calc» розв’язує виявлення сервісів.
builder.Services.AddHttpClient("calc",
    c => c.BaseAddress = new Uri("https+http://calc"));
// Власні метрики: зареєструвати лічильник у OpenTelemetry.
builder.Services.AddOpenTelemetry()
    .WithMetrics(m => m.AddMeter(FrontMetrics.Name));
builder.Services.AddSingleton<FrontMetrics>();
WebApplication app = builder.Build();
app.MapDefaultEndpoints();

app.MapGet("/count/{n:long}", async (long n, IDistributedCache cache,
    IHttpClientFactory factory, FrontMetrics metrics) =>
{
    string key = $"primes:{n}";
    string? cached = await cache.GetStringAsync(key);
    if (cached is not null)
    {
        metrics.Request("hit");
        return Results.Ok(new { n, primes = long.Parse(cached),
            source = "cache" });
    }
    metrics.Request("miss");
    long start = Stopwatch.GetTimestamp();
    CalcReply? reply = await factory.CreateClient("calc")
        .GetFromJsonAsync<CalcReply>($"/primes/{n}");
    metrics.CalcTime.Record(
        Stopwatch.GetElapsedTime(start).TotalMilliseconds);
    DistributedCacheEntryOptions tenMinutes = new()
    {
        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10),
    };
    await cache.SetStringAsync(key, reply!.Primes.ToString(),
        tenMinutes);
    return Results.Ok(new { n, primes = reply.Primes,
        source = reply.Host });
});

app.Run();

record CalcReply(long N, long Primes, string Host);

// Метрики: лічильник запитів і гістограма часу виклику calc.
sealed class FrontMetrics
{
    public const string Name = "Cache.Front";
    readonly Counter<long> requests;
    public Histogram<double> CalcTime { get; }

    public FrontMetrics(IMeterFactory factory)
    {
        Meter meter = factory.Create(Name);
        requests = meter.CreateCounter<long>("front.requests",
            description: "Запити до фронтенду (hit/miss кешу)");
        CalcTime = meter.CreateHistogram<double>(
            "front.calc.duration", unit: "ms",
            description: "Час виклику сервісу calc");
    }

    // Мітка result: hit – відповідь із кешу, miss – виклик calc.
    public void Request(string result) =>
        requests.Add(1,
            new KeyValuePair<string, object?>("result", result));
}
```

Лічильник створюється через `IMeterFactory`, а `AddMeter(FrontMetrics.Name)` додає лічильник `Cache.Front` до експорту OpenTelemetry. Виклик `requests.Add(1, new("result", result))` компілятор відхилив як неоднозначний (`CS0121`: перевантаження з одним тегом і з масивом тегів), тому пару «ключ–значення» записано повністю.

Запуск `aspire start` у теці рішення (або запуск `Cache.AppHost` з IDE) і перевірка `aspire describe`:

```
Name           Type       State    Health   URLs
calc-czvetjgg  Project    Running  Healthy  http://localhost:5090
calc-hhkjhddh  Project    Running  Healthy  http://localhost:5090
front          Project    Running  Healthy  http://localhost:5186
redis          Container  Running  Healthy  redis://localhost:58711
```

Обидві репліки `calc` мають спільну адресу `localhost:5090`: Aspire запускає перед ними проксі, що розподіляє з’єднання (чотири запити `curl.exe http://localhost:5090/primes/1000` відповіли процесами `INTEL/14648` і `INTEL/23092`). Запити до фронтенду:

```powershell
foreach ($n in 5000000, 5000000, 3000000, 5000000, 3000000,
    7000000, 7000000) {
    $t = Measure-Command {
        $r = Invoke-RestMethod "http://localhost:5186/count/$n" }
    "{0} {1} {2} {3:F3} с" -f $r.n, $r.primes, $r.source,
        $t.TotalSeconds
}
```

```
5000000 348513 INTEL/23092 1,509 с
5000000 348513 cache 0,005 с
3000000 216816 INTEL/23092 0,367 с
5000000 348513 cache 0,003 с
3000000 216816 cache 0,003 с
7000000 476648 INTEL/23092 1,191 с
7000000 476648 cache 0,003 с
```

Перший запит для кожного $n$ обчислює `calc` (0,4–1,5 с), повторні повертаються з Redis за 3–5 мс. У дашборді на сторінці *Metrics* ресурсу `front` з’являються `front.requests` (з фільтром за міткою `result`) і `front.calc.duration`; ту саму метрику можна прочитати без дашборду утилітою `dotnet-counters collect -n Cache.Front --counters Cache.Front` (перевірено: 20 запитів з кешу дали рядок `front.requests … [result=hit] … 20`). Трасування промаху кешу (`aspire otel spans --trace-id …`):

```
00:18:03.055 OK   1.49s front: GET /count/{n:long}
00:18:03.278 OK  4.84ms front: HMGET
00:18:03.576 OK   0.92s front: GET
00:18:03.604 OK   0.89s calc-hhkjhddh: GET /primes/{n:long}
00:18:04.532 OK  2.55ms front: HMSET
00:18:04.534 OK  1.63ms front: EXPIRE
```

Видно всі кроки: читання кешу (`HMGET`), HTTP-виклик `calc` (спан клієнта у `front` і спан сервера в репліці `calc-hhkjhddh`), запис у кеш із терміном дії (`HMSET`, `EXPIRE`). Спани Redis створює клієнтська інтеграція `Aspire.StackExchange.Redis`, HTTP-спани – інструментування з ServiceDefaults. Зупинка: `aspire stop`.
