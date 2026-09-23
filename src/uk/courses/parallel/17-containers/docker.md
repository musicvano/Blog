---
title: "Контейнеризація та Docker"
description: "Тема 17. Docker, Kubernetes, Aspire: Контейнеризація та Docker"
outline: [2, 3]
---

# Контейнеризація та Docker

## Віртуалізація і контейнеризація

У темах 14–16 кожен сервіс розподіленої системи запускали командою `dotnet run` в окремому вікні, а RabbitMQ і Redis – готовими образами Docker. Щоб перенести таку систему на інший комп’ютер чи сервер, потрібно відтворити все середовище: версію .NET, бібліотеки, змінні середовища, порти, порядок запуску. Цю задачу розв’язують **віртуальні машини** і **контейнери** (рис. 17.1).

- **Віртуальна машина** (ВМ, *virtual machine*) емулює цілий комп’ютер: гіпервізор (Hyper-V, VMware, KVM) виділяє їй процесори, пам’ять і диск, а всередині працює повна **гостьова ОС** зі своїм ядром. ВМ добре ізольовані, але образ займає гігабайти, а запуск триває секунди–хвилини.
- **Контейнер** (*container*) – звичайний процес ОС хоста, якому ядро показує ізольоване оточення: власну файлову систему, мережу, список процесів і ліміти ресурсів. Ядро **спільне** для всіх контейнерів, тому контейнер стартує за мілісекунди–секунди, а образ займає мегабайти.

```mermaid
block-beta
  columns 1
  block:VM
    columns 3
    vt["<b>Віртуальні машини</b>"]:3
    va1["застосунок 1"] va2["застосунок 2"] va3["застосунок 3"]
    vb1["бібліотеки"] vb2["бібліотеки"] vb3["бібліотеки"]
    vg1["гостьова ОС"] vg2["гостьова ОС"] vg3["гостьова ОС"]
    vn["кожна ВМ має власне ядро ОС"]:3
    vh["гіпервізор (Hyper-V)"]:3
    vo["ОС хоста"]:3
    vw["апаратне забезпечення"]:3
    vs["старт: секунди – хвилини; образ: гігабайти"]:3
  end
  block:CT
    columns 3
    ct["<b>Контейнери</b>"]:3
    block:k1
      columns 1
      ca1["застосунок 1"] cb1["бібліотеки"]
    end
    block:k2
      columns 1
      ca2["застосунок 2"] cb2["бібліотеки"]
    end
    block:k3
      columns 1
      ca3["застосунок 3"] cb3["бібліотеки"]
    end
    cn["контейнер – ізольований процес хоста"]:3
    ce["рушій контейнерів: Docker Engine, containerd"]:3
    ck["<b>спільне ядро Linux</b>: простори імен, cgroups"]:3
    co["ОС хоста або ВМ WSL 2"]:3
    cw["апаратне забезпечення"]:3
    cs["старт: мілісекунди – секунди; образ: мегабайти"]:3
  end
```

Рис. 17.1. Віртуальні машини та контейнери {.caption}

Ізоляцію контейнера забезпечують два механізми ядра Linux:

- **простори імен** (*namespaces*) обмежують, що процес **бачить**: `pid` (власна нумерація процесів, перший процес контейнера має PID 1), `net` (власні мережеві інтерфейси й порти), `mnt` (власна коренева файлова система), `uts` (ім’я хоста), `ipc`, `user`;
- **контрольні групи** (*control groups*, cgroups) обмежують, скільки процес **споживає**: процесорний час, пам’ять, введення-виведення.

Перевірка в контейнері Ubuntu з обмеженнями `--memory 64m --cpus 0.5`: файл `/sys/fs/cgroup/memory.max` містить `67108864` (64 МіБ), файл `cpu.max` – `50000 100000` (50 мс процесорного часу на кожні 100 мс), команда `ps` показує лише два процеси (`sh` з PID 1 і сам `ps`), а ім’я хоста збігається з ідентифікатором контейнера.

**Образ** (*image*) – незмінний шаблон контейнера: файлова система й метадані (команда запуску, змінні середовища, порти, користувач). Образ складається з **шарів** (*layers*): кожна інструкція збирання додає шар зі змінами файлів, а однакові шари спільні для всіх образів і кешуються. Контейнер – це образ плюс тонкий записуваний шар, який зникає разом із контейнером. Формат образів і середовища виконання стандартизує **Open Container Initiative** (OCI, <https://opencontainers.org/>), тому образ, зібраний Docker, запускають containerd, Podman і Kubernetes. Образи зберігають у **реєстрах** (*registries*): Docker Hub (`rabbitmq`, `redis`), Microsoft Artifact Registry (`mcr.microsoft.com/dotnet/…`), GitHub Container Registry, власний реєстр `registry:2`. Повне ім’я образу має вигляд `реєстр/репозиторій:тег`, наприклад `mcr.microsoft.com/dotnet/aspnet:10.0`.

::: tip Контейнери у Windows
Контейнери Linux потребують ядра Linux. **Docker Desktop** для Windows запускає легку ВМ у підсистемі WSL 2 (<https://docs.docker.com/desktop/features/wsl/>) і всі контейнери працюють у ній; команди `docker` у Windows Terminal звертаються до рушія в цій ВМ. Існують і контейнери Windows (для застосунків .NET Framework), але в курсі використовуються лише контейнери Linux.
:::

## Docker Desktop і основні команди

**Docker** – платформа для збирання, поширення й запуску контейнерів (<https://docs.docker.com/>). На лабораторних ПК встановлено Docker Desktop 4.91 з рушієм Docker Engine 29.8 (перевірка: `docker version`). Типовий життєвий цикл контейнера:

```powershell
# Завантажити образ і запустити контейнер у фоні (-d) з іменем,
# публікацією порту хост:контейнер і іменованим томом для даних.
docker run -d --name pro16-demo -p 6380:6379 `
    -v pro16-demo-data:/data redis:8.8 redis-server --appendonly yes
docker ps                          # запущені контейнери
docker logs pro16-demo             # журнал (stdout і stderr)
docker exec pro16-demo redis-cli set course PRO   # команда всередині
docker stop pro16-demo             # SIGTERM, через 10 с – SIGKILL
docker rm pro16-demo      # видалити контейнер (том лишається)
```

Результат `docker ps` і перевірка тому:

```
NAMES        IMAGE       STATUS         PORTS
pro16-demo   redis:8.8   Up 2 seconds   0.0.0.0:6380->6379/tcp
```

Після `docker rm` і повторного `docker run` з тим самим томом `pro16-demo-data` команда `docker exec pro16-demo redis-cli get course` повернула `PRO`: дані пережили видалення контейнера, бо лежать у **томі** (*volume*, <https://docs.docker.com/engine/storage/volumes/>). Основні параметри `docker run`:

- `-p 6380:6379` – публікація порту: з’єднання на `localhost:6380` хоста передаються на порт 6379 контейнера;
- `-v том:/шлях` або `-v C:\дані:/шлях` – іменований том (ним керує Docker) чи тека хоста (*bind mount*);
- `-e ІМ’Я=значення` – змінна середовища (так передають конфігурацію, рядки підключення, паролі);
- `--network мережа` – користувацька мережа (<https://docs.docker.com/engine/network/>): у ній контейнери звертаються один до одного **за іменами**, а вбудований DNS Docker перетворює ім’я на IP-адресу;
- `--rm` – видалити контейнер після завершення; `--memory`, `--cpus` – обмеження cgroups.

Інші корисні команди: `docker images` (локальні образи), `docker pull`/`docker push` (завантажити або надіслати в реєстр), `docker inspect` (усі параметри контейнера в JSON), `docker stats` (споживання процесора й пам’яті), `docker system df` (місце на диску). Контейнери, образи, томи й журнали видно також у графічному інтерфейсі Docker Desktop (рис. 17.2).

::: info Знімок екрана
Docker Desktop → Containers: Compose stack pro16 expanded (api-1, rabbitmq-1, redis-1, worker-1…4) with Image, Status, Port(s), CPU (%) columns
:::

Рис. 17.2. Контейнери в Docker Desktop {.caption}

## Застосунок-приклад: розподілений підрахунок простих чисел

Усі приклади лекції використовують один невеликий розподілений застосунок `Primes`, побудований на RabbitMQ (тема 15) і Redis (тема 16):

- **API** (`Primes.Api`, ASP.NET Core): запит `POST /jobs?to=N&chunks=K` ділить діапазон $[ 2 , N )$ на $K$ частин і публікує їх у стійку чергу `primes`; `GET /jobs/{id}` повертає, скільки частин готово, кількість простих чисел і час виконання; `GET /primes?to=N` рахує прості числа синхронно в самому API (навантаження на процесор); `GET /` повертає версію й ім’я хоста; `/health/live` і `/health/ready` – перевірки стану;
- **робітник** (`Primes.Worker`, служба .NET): споживач черги з `prefetch = 1`, який рахує прості числа в діапазоні методом пробного ділення й записує результат частини в Redis;
- **RabbitMQ** розподіляє частини між робітниками, **Redis** зберігає стан завдань.

Кількість робітників змінюється без змін коду: це і є горизонтальне масштабування, яке далі виконують Docker Compose, Kubernetes і Aspire. Рядки підключення застосунок читає з конфігурації .NET (`GetConnectionString("rabbitmq")` і `GetConnectionString("redis")`), тобто зі змінних середовища `ConnectionStrings__rabbitmq` і `ConnectionStrings__redis`: подвійне підкреслення замінює двокрапку в іменах ключів.

Спільний клас `Backend` (однаковий файл у двох проєктах) підключається до RabbitMQ і Redis у фоні з повторами. Так процес стартує, навіть якщо брокер ще не готовий, а готовність видно через властивість `Ready`:

```cs
using RabbitMQ.Client;
using StackExchange.Redis;

namespace Primes;

// З’єднання з RabbitMQ і Redis встановлюються у фоні з
// повторами: процес стартує, навіть якщо брокер ще не готовий.
public sealed class Backend(IConfiguration config,
    ILogger<Backend> log) : BackgroundService
{
    public const string Queue = "primes";
    public IConnection? Rabbit { get; private set; }
    public IConnectionMultiplexer? Redis { get; private set; }

    public bool Ready =>
        Rabbit is { IsOpen: true } && Redis is { IsConnected: true };

    protected override async Task ExecuteAsync(CancellationToken stop)
    {
        string rabbit = config.GetConnectionString("rabbitmq")
            ?? "amqp://guest:guest@localhost:5672";
        string redis = config.GetConnectionString("redis")
            ?? "localhost:6379";
        while (!Ready && !stop.IsCancellationRequested)
        {
            try
            {
                Redis ??=
                    await ConnectionMultiplexer.ConnectAsync(redis);
                Rabbit ??= await new ConnectionFactory
                    { Uri = new Uri(rabbit) }
                    .CreateConnectionAsync(stop);
                await using IChannel ch = await Rabbit
                    .CreateChannelAsync(cancellationToken: stop);
                await ch.QueueDeclareAsync(Queue, durable: true,
                    exclusive: false, autoDelete: false,
                    cancellationToken: stop);
                log.LogInformation("RabbitMQ і Redis підключено");
            }
            catch (Exception ex) when (!stop.IsCancellationRequested)
            {
                log.LogWarning(
                    "Очікування залежностей: {Error}", ex.Message);
                await Task.Delay(2000, stop);
            }
        }
    }

    public override void Dispose()
    {
        Rabbit?.Dispose();
        Redis?.Dispose();
        base.Dispose();
    }
}
```

Файл `PrimeMath.cs` містить запис повідомлення `PrimeTask(string JobId, long From, long To)` і статичний метод `PrimeMath.Count(from, to)`, що рахує прості числа від `from` до `to` (не включно) пробним діленням на непарні дільники до $\sqrt{n}$. API (`Program.cs` проєкту `Primes.Api`):

```cs
using System.Text.Json;
using Primes;
using RabbitMQ.Client;
using StackExchange.Redis;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<Backend>();
builder.Services.AddHostedService(
    sp => sp.GetRequiredService<Backend>());
WebApplication app = builder.Build();
string version = app.Configuration["APP_VERSION"] ?? "1.0";

// Хто відповів: версія застосунку та ім’я контейнера (пода).
app.MapGet("/", () => new
{
    service = "primes-api", version, host = Environment.MachineName,
});

// Проби: процес живий; залежності готові приймати запити.
app.MapGet("/health/live", () => Results.Ok("live"));
app.MapGet("/health/ready", (Backend b) => b.Ready
    ? Results.Ok("ready") : Results.StatusCode(503));

// Розбити діапазон [2, to) на частини й покласти їх у чергу.
app.MapPost("/jobs", async (long to, int chunks, Backend b) =>
{
    if (!b.Ready) return Results.StatusCode(503);
    if (to < 3 || chunks < 1 || chunks > 10_000)
        return Results.BadRequest("to >= 3, 1 <= chunks <= 10000");
    string id = Guid.NewGuid().ToString("N")[..8];
    IDatabase db = b.Redis!.GetDatabase();
    await db.HashSetAsync($"job:{id}", [
        new("to", to), new("chunks", chunks), new("started", Now()),
    ]);
    await using IChannel ch = await b.Rabbit!.CreateChannelAsync();
    long step = (to - 2 + chunks - 1) / chunks;
    for (long from = 2; from < to; from += step)
    {
        PrimeTask task = new(id, from, Math.Min(from + step, to));
        await ch.BasicPublishAsync("", Backend.Queue, false,
            new BasicProperties { Persistent = true },
            JsonSerializer.SerializeToUtf8Bytes(task));
    }
    return Results.Accepted($"/jobs/{id}", new { id });
});

// Стан завдання: скільки частин готово і скільки простих.
app.MapGet("/jobs/{id}", async (string id, Backend b) =>
{
    if (!b.Ready) return Results.StatusCode(503);
    IDatabase db = b.Redis!.GetDatabase();
    HashEntry[] job = await db.HashGetAllAsync($"job:{id}");
    if (job.Length == 0) return Results.NotFound();
    Dictionary<string, long> v = job.ToDictionary(
        e => e.Name.ToString(), e => (long)e.Value);
    // Результати частин: поле – початок діапазону, значення –
    // кількість простих чисел у частині.
    HashEntry[] parts = await db.HashGetAllAsync($"job:{id}:parts");
    double? seconds = v.TryGetValue("finished", out long end)
        ? (end - v["started"]) / 1000.0 : null;
    return Results.Ok(new
    {
        id, to = v["to"], chunks = v["chunks"], done = parts.Length,
        primes = parts.Sum(p => (long)p.Value), seconds,
    });
});

// Синхронне обчислення в самому API: навантаження на процесор.
app.MapGet("/primes", (long to) => new
{
    to, primes = PrimeMath.Count(2, to),
    host = Environment.MachineName,
});

app.Run();

static long Now() => DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
```

Робітник (`PrimeWorker.cs` проєкту `Primes.Worker`, шаблон `dotnet new worker`):

```cs
using System.Text.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using StackExchange.Redis;

namespace Primes;

// Споживач черги primes: рахує прості числа в діапазоні
// й записує результат частини завдання в Redis.
public sealed class PrimeWorker(Backend backend,
    ILogger<PrimeWorker> log) : BackgroundService
{
    readonly SemaphoreSlim busy = new(1, 1);  // обробка частини

    protected override async Task ExecuteAsync(CancellationToken stop)
    {
        while (!backend.Ready)                // чекати з’єднань
            await Task.Delay(500, stop);
        IChannel ch = await backend.Rabbit!
            .CreateChannelAsync(cancellationToken: stop);
        await ch.BasicQosAsync(0, 1, false, stop);   // prefetch 1
        IDatabase db = backend.Redis!.GetDatabase();
        string host = Environment.MachineName;

        AsyncEventingBasicConsumer consumer = new(ch);
        consumer.ReceivedAsync += async (_, ea) =>
        {
            await busy.WaitAsync();
            try
            {
                PrimeTask t = JsonSerializer
                    .Deserialize<PrimeTask>(ea.Body.Span)!;
                long primes = PrimeMath.Count(t.From, t.To);
                string key = $"job:{t.JobId}";
                // Ідемпотентно: повторна доставка не змінить суму.
                await db.HashSetAsync($"{key}:parts", t.From,
                    primes, When.NotExists);
                long done = await db.HashLengthAsync($"{key}:parts");
                long all = (long)await db.HashGetAsync(key, "chunks");
                long now = DateTimeOffset.UtcNow
                    .ToUnixTimeMilliseconds();
                if (done == all)
                    await db.HashSetAsync(key, "finished", now,
                        When.NotExists);
                await ch.BasicAckAsync(ea.DeliveryTag, false);
                log.LogInformation(
                    "{Host}: [{From}, {To}) -> {Primes}",
                    host, t.From, t.To, primes);
            }
            finally
            {
                busy.Release();
            }
        };
        string tag = await ch.BasicConsumeAsync(Backend.Queue,
            autoAck: false, consumer, stop);
        log.LogInformation("Робітник {Host} слухає чергу", host);

        try
        {
            await Task.Delay(Timeout.Infinite, stop);
        }
        catch (OperationCanceledException)
        {
            // SIGTERM: не брати нових повідомлень, дочекатися
            // підтвердження поточного й лише тоді закрити канал.
            await ch.BasicCancelAsync(tag);
            await busy.WaitAsync();
            await ch.CloseAsync();
            log.LogInformation("Робітник {Host} зупинився", host);
        }
    }
}
```

`Program.cs` робітника реєструє `Backend` і `PrimeWorker` як фонові служби й збільшує час коректного завершення хоста:

```cs
using Primes;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Services.AddSingleton<Backend>();
builder.Services.AddHostedService(
    sp => sp.GetRequiredService<Backend>());
builder.Services.AddHostedService<PrimeWorker>();
// Скільки чекати завершення поточної частини після SIGTERM.
builder.Services.Configure<HostOptions>(o =>
    o.ShutdownTimeout = TimeSpan.FromSeconds(20));
builder.Build().Run();
```

Два рішення в коді важливі саме для контейнерів:

- **ідемпотентний запис** (тема 14): результат частини записується в хеш Redis `job:{id}:parts` з умовою `When.NotExists`, тому повторна доставка того самого повідомлення (гарантія «щонайменше один раз», тема 15) не подвоює суму;
- **коректне завершення** (*graceful shutdown*): коли оркестратор зупиняє контейнер, процес отримує сигнал `SIGTERM`, хост .NET скасовує `stop`, і робітник спочатку відписується від черги (`BasicCancelAsync`), потім чекає, поки обробник підтвердить поточну частину, і лише тоді закриває канал.

У першій версії робітника канал закривався одразу після `BasicCancelAsync`. Перевірка з двома робітниками й командою `docker stop` посеред завдання дала `"done":11` при 10 частинах і неправильну суму: обробник устиг записати результат, підтвердження вже не пройшло, і RabbitMQ доставив ту саму частину другому робітникові. Семафор `busy` і ідемпотентний запис усунули обидві проблеми: `docker stop` тривав 0,5 с, журнал зупиненого робітника закінчився рядками

```
20:11:51 info: Microsoft.Hosting.Lifetime[0] Application is
  shutting down...
20:11:51 info: Primes.PrimeWorker[0] 7979f7a48cde:
  [15000002, 20000002) -> 299903
20:11:51 info: Primes.PrimeWorker[0] Робітник 7979f7a48cde зупинився
```

а завдання завершилося з правильним результатом `"done":10,"primes":3001134`. Навіть аварійне завершення `docker kill` (сигнал `SIGKILL`, код виходу 137) не зіпсувало результат: незавершену частину RabbitMQ повернув у чергу, і її обробив інший робітник.
