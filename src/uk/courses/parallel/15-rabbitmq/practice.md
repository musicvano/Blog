---
title: "Практика"
description: "Тема 15. Брокер RabbitMQ: розібрані приклади"
outline: [2, 3]
---

# Практика

Для всіх прикладів брокер запущено командою `docker run` з розділу «Розгортання RabbitMQ»; кожен приклад – консольний проєкт .NET 10 з пакетом `RabbitMQ.Client` 7.2.2.

## Приклад 1. RPC через черги: числа Фібоначчі

Створити сервер, який отримує з черги `rpc.fib` число $n$ і відповідає числом Фібоначчі $F_{n}$ (`BigInteger`, $0 \le n \le 10 \, 000$) або повідомленням про помилку, та клієнт, який надсилає кілька запитів **одночасно**, розрізняє відповіді за `CorrelationId` і чекає кожну не довше 2 с. Запити, не взяті сервером за 2 с, брокер має вилучити. Перевірити роботу з сервером і без нього.

Програма з аргументом `server` працює як сервер, без аргументів – як клієнт:

```cs
using System.Collections.Concurrent;
using System.Diagnostics;
using System.Numerics;
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

Console.OutputEncoding = Encoding.UTF8;
const string RpcQueue = "rpc.fib";
ConnectionFactory factory = new() { HostName = "localhost" };
await using IConnection connection =
    await factory.CreateConnectionAsync("fib-demo");

if (args is ["server"])
{
    await RunServerAsync(connection);
    return;
}

await using FibClient client =
    await FibClient.CreateAsync(connection);
int[] numbers = [10, 90, 300, -5];
Stopwatch clock = Stopwatch.StartNew();
// Усі запити одночасно: відповіді розрізняє CorrelationId.
await Task.WhenAll(numbers.Select(async n =>
{
    try
    {
        string value = await client.CallAsync(n,
            TimeSpan.FromSeconds(2));
        Console.WriteLine($"F({n}) = {Short(value)}  " +
            $"[{clock.ElapsedMilliseconds} мс]");
    }
    catch (Exception ex) when (ex is TimeoutException
        or InvalidOperationException)
    {
        Console.WriteLine($"F({n}): {ex.Message}  " +
            $"[{clock.ElapsedMilliseconds} мс]");
    }
}));

static string Short(string s) =>
    s.Length <= 24 ? s : $"{s[..10]}…{s[^6..]} ({s.Length} цифр)";

static async Task RunServerAsync(IConnection connection)
{
    IChannel channel = await connection.CreateChannelAsync();
    await channel.QueueDeclareAsync(RpcQueue, durable: true,
        exclusive: false, autoDelete: false);
    await channel.BasicQosAsync(0, prefetchCount: 1, global: false);
    AsyncEventingBasicConsumer consumer = new(channel);
    consumer.ReceivedAsync += async (_, ea) =>
    {
        IReadOnlyBasicProperties request = ea.BasicProperties;
        string text = Encoding.UTF8.GetString(ea.Body.Span);
        bool ok = int.TryParse(text, out int n)
            && n is >= 0 and <= 10_000;
        Console.WriteLine($"запит F({text}) від {request.ReplyTo}");
        BasicProperties reply = new()
        {
            CorrelationId = request.CorrelationId,   // як у запиті
            Type = ok ? "result" : "error",
        };
        string answer = ok ? Fibonacci(n).ToString()
            : "n має бути цілим від 0 до 10 000";
        if (request.ReplyTo is { } replyTo)
        {
            await channel.BasicPublishAsync("", replyTo, false, reply,
                Encoding.UTF8.GetBytes(answer));
        }
        await channel.BasicAckAsync(ea.DeliveryTag, false);
    };
    await channel.BasicConsumeAsync(RpcQueue, autoAck: false,
        consumer);
    Console.WriteLine("RPC-сервер Фібоначчі, Enter – вихід");
    Console.ReadLine();
    await channel.CloseAsync();
}

static BigInteger Fibonacci(int n)
{
    BigInteger a = 0, b = 1;
    for (int i = 0; i < n; i++)
    {
        (a, b) = (b, a + b);
    }
    return a;
}

// Клієнт RPC: одна тимчасова черга відповідей на весь клієнт.
sealed class FibClient : IAsyncDisposable
{
    readonly IChannel channel;
    readonly string replyQueue;
    readonly ConcurrentDictionary<string,
        TaskCompletionSource<Reply>> pending = new();

    FibClient(IChannel channel, string replyQueue) =>
        (this.channel, this.replyQueue) = (channel, replyQueue);

    public static async Task<FibClient> CreateAsync(IConnection conn)
    {
        IChannel channel = await conn.CreateChannelAsync();
        QueueDeclareOk queue = await channel.QueueDeclareAsync("",
            durable: false, exclusive: true, autoDelete: true);
        FibClient client = new(channel, queue.QueueName);
        AsyncEventingBasicConsumer consumer = new(channel);
        consumer.ReceivedAsync += client.OnReplyAsync;
        await channel.BasicConsumeAsync(queue.QueueName,
            autoAck: true, consumer);
        return client;
    }

    Task OnReplyAsync(object sender, BasicDeliverEventArgs ea)
    {
        // Невідомий ідентифікатор – запізніла відповідь, ігноруємо.
        if (ea.BasicProperties.CorrelationId is { } id
            && pending.TryRemove(id, out var waiter))
        {
            // Тіло дійсне лише під час обробника – копіюємо.
            waiter.TrySetResult(new(ea.BasicProperties.Type,
                Encoding.UTF8.GetString(ea.Body.Span)));
        }
        return Task.CompletedTask;
    }

    public async Task<string> CallAsync(int n, TimeSpan timeout)
    {
        string id = Guid.NewGuid().ToString("N");
        TaskCompletionSource<Reply> waiter =
            new(TaskCreationOptions.RunContinuationsAsynchronously);
        pending[id] = waiter;
        BasicProperties props = new()
        {
            CorrelationId = id,
            ReplyTo = replyQueue,
            // Запит, не взятий сервером за timeout, брокер вилучить.
            Expiration = ((int)timeout.TotalMilliseconds).ToString(),
        };
        await channel.BasicPublishAsync("", "rpc.fib", false, props,
            Encoding.UTF8.GetBytes(n.ToString()));
        try
        {
            Reply reply = await waiter.Task.WaitAsync(timeout);
            return reply.Type == "error"
                ? throw new InvalidOperationException(reply.Text)
                : reply.Text;
        }
        catch (TimeoutException)
        {
            pending.TryRemove(id, out _);
            throw new TimeoutException(
                $"немає відповіді за {timeout.TotalSeconds} с");
        }
    }

    public async ValueTask DisposeAsync()
    {
        await channel.CloseAsync();
        channel.Dispose();
    }
}

record Reply(string? Type, string Text);
```

Клієнт тримає словник очікувальників (`ConcurrentDictionary`, ключ – `CorrelationId`, значення – `TaskCompletionSource`): `CallAsync` реєструє очікувальника під новим `CorrelationId`, публікує запит і чекає з `WaitAsync(timeout)`, а обробник черги відповідей знаходить очікувальника за ідентифікатором і завершує його. Опція `RunContinuationsAsynchronously` не дає продовженню `CallAsync` виконуватися всередині обробника споживача. Помилку сервер передає властивістю `Type = "error"`, і клієнт перетворює її на виняток. Властивість `Expiration` дорівнює таймауту: запит, який ніхто не взяв вчасно, брокер вилучить, і сервер, запущений пізніше, не обчислюватиме непотрібних відповідей.

Спочатку запущено сервер (`dotnet run -c Release -- server`), потім клієнт в іншому вікні. Результат клієнта (у квадратних дужках – час від початку):

```
F(90) = 2880067194370816120  [30 мс]
F(10) = 55  [30 мс]
F(300) = 2222322446…979600 (63 цифр)  [77 мс]
F(-5): n має бути цілим від 0 до 10 000  [120 мс]
```

Сервер:

```
RPC-сервер Фібоначчі, Enter – вихід
запит F(10) від amq.gen-4GM2fGEr7AevNGZYauPcAQ
запит F(90) від amq.gen-4GM2fGEr7AevNGZYauPcAQ
запит F(300) від amq.gen-4GM2fGEr7AevNGZYauPcAQ
запит F(-5) від amq.gen-4GM2fGEr7AevNGZYauPcAQ
```

Відповіді на третій і четвертий запити затрималися приблизно на 45 мс кожна: сервер з prefetch 1 отримує наступний запит лише після того, як брокер побачить його `BasicAck`, а через проброшений порт Docker Desktop другий із двох малих кадрів поспіль (відповідь і `BasicAck`) надходить із затримкою (лекція, розділ «Розподілені обчислення через брокер»). Той самий сервер, запущений у контейнері поруч із брокером, відповів на всі чотири запити за 23 мс. Без сервера клієнт отримує таймаути, а запити зникають із черги `rpc.fib` через 2 с:

```
F(-5): немає відповіді за 2 с  [2006 мс]
F(90): немає відповіді за 2 с  [2006 мс]
F(10): немає відповіді за 2 с  [2006 мс]
F(300): немає відповіді за 2 с  [2006 мс]
```

## Приклад 2. Розподілене обчислення інтеграла

Створити програму з трьома режимами: `coordinator частин кроків` розбиває інтеграл $\int_{0}^{1} 4 / (1 + x^{2}) \mathrm{d} x = \pi$ на задану кількість частин, публікує їх у чергу `integral.tasks`, збирає результати й виводить значення, похибку, час і кількість частин, обчислених кожним робітником; `worker ім’я` обчислює частини методом середніх прямокутників; `local частин кроків` – послідовне обчислення для порівняння. Виміряти час для 1, 2, 4, 8 і 16 робітників і перевірити, що після падіння робітника результат залишається правильним.

```cs
using System.Diagnostics;
using System.Text.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

Console.OutputEncoding = System.Text.Encoding.UTF8;
const string TaskQueue = "integral.tasks";
ConnectionFactory factory = new() { HostName = "localhost" };

switch (args)
{
    case ["worker", string name]:
        await RunWorkerAsync(factory, name);
        break;
    case ["local", string parts, string steps]:
        RunLocal(int.Parse(parts), long.Parse(steps));
        break;
    case ["coordinator", string parts, string steps]:
        await RunCoordinatorAsync(factory, int.Parse(parts),
            long.Parse(steps));
        break;
    default:
        Console.Error.WriteLine("integral worker ім’я | " +
            "coordinator частин кроків | local частин кроків");
        Environment.ExitCode = 1;
        break;
}

// f(x) = 4 / (1 + x²), інтеграл на [0; 1] дорівнює π.
static double Midpoint(double a, double b, long steps)
{
    double h = (b - a) / steps, sum = 0;
    for (long i = 0; i < steps; i++)
    {
        double x = a + (i + 0.5) * h;
        sum += 4.0 / (1.0 + x * x);
    }
    return sum * h;
}

static void RunLocal(int parts, long steps)
{
    Stopwatch clock = Stopwatch.StartNew();
    double total = 0;
    for (int i = 0; i < parts; i++)
    {
        total += Midpoint((double)i / parts, (double)(i + 1) / parts,
            steps / parts);
    }
    Console.WriteLine($"послідовно: {total:F12}, " +
        $"{clock.Elapsed.TotalSeconds:F3} с");
}

static async Task RunWorkerAsync(ConnectionFactory factory,
    string name)
{
    await using IConnection conn =
        await factory.CreateConnectionAsync($"worker-{name}");
    await using IChannel channel = await conn.CreateChannelAsync();
    await channel.QueueDeclareAsync(TaskQueue, durable: true,
        exclusive: false, autoDelete: false);
    // 2, а не 1: наступна частина вже в робітника, поки він
    // надсилає результат і підтвердження.
    await channel.BasicQosAsync(0, prefetchCount: 2, global: false);
    AsyncEventingBasicConsumer consumer = new(channel);
    consumer.ReceivedAsync += async (_, ea) =>
    {
        Part part = JsonSerializer.Deserialize<Part>(ea.Body.Span)!;
        // Обчислення в пулі потоків, щоб не блокувати диспетчер.
        double value = await Task.Run(() =>
            Midpoint(part.A, part.B, part.Steps));
        Result result = new(part.Index, value, name);
        BasicProperties props = new()
        {
            CorrelationId = ea.BasicProperties.CorrelationId,
        };
        await channel.BasicPublishAsync("",
            ea.BasicProperties.ReplyTo!, false, props,
            JsonSerializer.SerializeToUtf8Bytes(result));
        await channel.BasicAckAsync(ea.DeliveryTag, false);
    };
    await channel.BasicConsumeAsync(TaskQueue, autoAck: false,
        consumer);
    Console.WriteLine($"робітник {name}: очікування, Enter – вихід");
    Console.ReadLine();
}

static async Task RunCoordinatorAsync(ConnectionFactory factory,
    int parts, long steps)
{
    await using IConnection conn =
        await factory.CreateConnectionAsync("coordinator");
    await using IChannel channel = await conn.CreateChannelAsync();
    await channel.QueueDeclareAsync(TaskQueue, durable: true,
        exclusive: false, autoDelete: false);
    QueueDeclareOk results = await channel.QueueDeclareAsync("",
        durable: false, exclusive: true, autoDelete: true);

    string job = Guid.NewGuid().ToString("N");
    int received = 0;
    double total = 0;
    Dictionary<string, int> perWorker = [];
    TaskCompletionSource done = new();
    AsyncEventingBasicConsumer consumer = new(channel);
    consumer.ReceivedAsync += (_, ea) =>
    {
        if (ea.BasicProperties.CorrelationId != job)
        {
            return Task.CompletedTask;       // застаріла відповідь
        }
        Result r = JsonSerializer.Deserialize<Result>(ea.Body.Span)!;
        total += r.Value;                    // обробник викликається
        perWorker[r.Worker] =                // послідовно
            perWorker.GetValueOrDefault(r.Worker) + 1;
        if (++received == parts)
        {
            done.SetResult();
        }
        return Task.CompletedTask;
    };
    await channel.BasicConsumeAsync(results.QueueName, autoAck: true,
        consumer);

    Stopwatch clock = Stopwatch.StartNew();
    BasicProperties props = new()
    {
        CorrelationId = job, ReplyTo = results.QueueName,
    };
    for (int i = 0; i < parts; i++)
    {
        Part part = new(i, (double)i / parts, (double)(i + 1) / parts,
            steps / parts);
        await channel.BasicPublishAsync("", TaskQueue, false, props,
            JsonSerializer.SerializeToUtf8Bytes(part));
    }
    await done.Task.WaitAsync(TimeSpan.FromMinutes(5));
    double seconds = clock.Elapsed.TotalSeconds;
    Console.WriteLine($"інтеграл = {total:F12}, " +
        $"похибка {Math.Abs(total - Math.PI):E1}, {seconds:F3} с");
    Console.WriteLine("частин за робітниками: " + string.Join(", ",
        perWorker.OrderBy(p => p.Key)
            .Select(p => $"{p.Key} – {p.Value}")));
}

record Part(int Index, double A, double B, long Steps);
record Result(int Index, double Value, string Worker);
```

Частини й результати передаються як JSON (`record Part`, `record Result`). Робітник обчислює частину в `Task.Run`, щоб обробник споживача не займав потік диспетчера, публікує результат у чергу `ReplyTo` координатора і лише потім підтверджує завдання: якщо робітник упаде до підтвердження, частину отримає інший. Обробник координатора викликається послідовно, тому сума й словник не потребують блокувань. Відповіді з чужим `CorrelationId` (від попереднього, перерваного запуску) відкидаються.

У чотирьох вікнах запущено `dotnet run -c Release -- worker w1` … `worker w4`, а потім координатор `dotnet run -c Release -- coordinator 64 2560000000`:

```
інтеграл = 3,141592653590, похибка 1,4E-014, 1,346 с
частин за робітниками: w1 – 15, w2 – 16, w3 – 18, w4 – 15
```

Час для різних кількостей робітників (кожен – окремий процес, медіана 5 запусків) наведено в лекції (табл. «Обчислення інтеграла робітниками через RabbitMQ»). Послідовне обчислення (`local 64 2560000000`) виводить `послідовно: 3,141592653590, 2,273 с`.

Відмовостійкість перевірено так: під час обчислення з чотирма робітниками процес робітника `w2` примусово завершено. Координатор усе одно отримав усі 64 частини й правильний результат: частини, які `w2` отримав, але не встиг підтвердити, брокер повторно доставив іншим робітникам.

```
інтеграл = 3,141592653590, похибка 1,4E-014, 1,150 с
частин за робітниками: w1 – 17, w2 – 10, w3 – 19, w4 – 18
```

Час окремого запуску залежить від навантаження комп’ютера: під час підготовки прикладу інші програми використовували процесор, і серії вимірювань відрізнялися до 30 %.

## Приклад 3. Сповіщення fanout для незалежних сервісів

Створити програму, у якій сервіс замовлень публікує події в обмінник `order-events` типу fanout, а сервіси email, sms і audit отримують **кожну** подію через власні стійкі черги `notify.email`, `notify.sms`, `notify.audit`. Показати, що вимкнений сервіс (audit) отримує пропущені події після запуску, а тимчасовий підписник з ексклюзивною чергою (monitor) – лише події, опубліковані після підписки.

```cs
using System.Diagnostics;
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

Console.OutputEncoding = Encoding.UTF8;
const string Exchange = "order-events";
string[] services = ["email", "sms", "audit"];
Stopwatch clock = Stopwatch.StartNew();

ConnectionFactory factory = new() { HostName = "localhost" };
await using IConnection connection =
    await factory.CreateConnectionAsync("notify-demo");
await using IChannel channel = await connection.CreateChannelAsync();

// Топологія: fanout-обмінник і стійка черга для кожного сервісу.
await channel.ExchangeDeclareAsync(Exchange, ExchangeType.Fanout,
    durable: true);
foreach (string service in services)
{
    string queue = $"notify.{service}";
    await channel.QueueDeclareAsync(queue, durable: true,
        exclusive: false, autoDelete: false);
    await channel.QueueBindAsync(queue, Exchange, routingKey: "");
}

// email і sms працюють від початку, audit «вимкнено».
await StartServiceAsync("email", "notify.email");
await StartServiceAsync("sms", "notify.sms");

await PublishAsync("замовлення 101 створено");
// Тимчасовий монітор підписується після першої події.
QueueDeclareOk temp = await channel.QueueDeclareAsync("",
    durable: false, exclusive: true, autoDelete: true);
await channel.QueueBindAsync(temp.QueueName, Exchange, "");
await StartServiceAsync("monitor", temp.QueueName);
await PublishAsync("замовлення 101 оплачено");
await PublishAsync("замовлення 102 створено");

await Task.Delay(1000);
Log("audit запускається після простою");
await StartServiceAsync("audit", "notify.audit");
await Task.Delay(500);

async Task PublishAsync(string text)
{
    BasicProperties props = new() { Persistent = true };
    await channel.BasicPublishAsync(Exchange, routingKey: "", false,
        props, Encoding.UTF8.GetBytes(text));
    Log($"подія: {text}");
    await Task.Delay(100);
}

async Task StartServiceAsync(string name, string queue)
{
    IChannel ch = await connection.CreateChannelAsync();
    AsyncEventingBasicConsumer consumer = new(ch);
    consumer.ReceivedAsync += async (_, ea) =>
    {
        Log($"  {name,-7} ← {Encoding.UTF8.GetString(ea.Body.Span)}");
        await ch.BasicAckAsync(ea.DeliveryTag, multiple: false);
    };
    await ch.BasicConsumeAsync(queue, autoAck: false, consumer);
}

void Log(string text) =>
    Console.WriteLine($"{clock.Elapsed.TotalSeconds:F1} с {text}");
```

Результат:

```
0,3 с подія: замовлення 101 створено
0,3 с   email   ← замовлення 101 створено
0,3 с   sms     ← замовлення 101 створено
0,4 с подія: замовлення 101 оплачено
0,4 с   monitor ← замовлення 101 оплачено
0,4 с   email   ← замовлення 101 оплачено
0,4 с   sms     ← замовлення 101 оплачено
0,5 с подія: замовлення 102 створено
0,5 с   monitor ← замовлення 102 створено
0,5 с   email   ← замовлення 102 створено
0,5 с   sms     ← замовлення 102 створено
1,6 с audit запускається після простою
1,6 с   audit   ← замовлення 101 створено
1,6 с   audit   ← замовлення 101 оплачено
1,6 с   audit   ← замовлення 102 створено
```

Кожен сервіс отримав власну копію кожної події: fanout-обмінник кладе повідомлення в усі прив’язані черги. Стійка черга `notify.audit` накопичила три події, поки сервіс не працював, а ексклюзивна черга монітора з’явилася лише після першої події й тому її не отримала. Додати новий сервіс можна без зміни видавця: достатньо прив’язати до обмінника ще одну чергу. Черги `notify.*` залишаються в брокері після завершення програми; повторний запуск без сервісу audit накопичить у `notify.audit` нові події.
