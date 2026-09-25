---
title: "Practice"
description: "Topic 15. The RabbitMQ broker: worked examples"
outline: [2, 3]
sourceHash: "4d79589bf3ec7b63fa9a93bd00ca16a454f249a1d2caf0d03e05a0fa25d5cc76"
---

# Practice

For all the examples, the broker was started with the `docker run` command from the “Deploying RabbitMQ” section; each example is a .NET 10 console project with the `RabbitMQ.Client` 7.2.2 package.

## Example 1. RPC over queues: Fibonacci numbers

Create a server that receives a number $n$ from the `rpc.fib` queue and replies with the Fibonacci number $F_{n}$ (`BigInteger`, $0 \le n \le 10 \, 000$) or an error message, and a client that sends several requests **at the same time**, distinguishes the responses by `CorrelationId`, and waits no longer than 2 s for each. Requests not taken by the server within 2 s must be removed by the broker. Test the behavior with and without the server.

With the `server` argument, the program works as the server; without arguments, as the client:

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
// All requests at once: responses are distinguished by CorrelationId.
await Task.WhenAll(numbers.Select(async n =>
{
    try
    {
        string value = await client.CallAsync(n,
            TimeSpan.FromSeconds(2));
        Console.WriteLine($"F({n}) = {Short(value)}  " +
            $"[{clock.ElapsedMilliseconds} ms]");
    }
    catch (Exception ex) when (ex is TimeoutException
        or InvalidOperationException)
    {
        Console.WriteLine($"F({n}): {ex.Message}  " +
            $"[{clock.ElapsedMilliseconds} ms]");
    }
}));

static string Short(string s) =>
    s.Length <= 24 ? s : $"{s[..10]}…{s[^6..]} ({s.Length} digits)";

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
        Console.WriteLine($"request F({text}) from {request.ReplyTo}");
        BasicProperties reply = new()
        {
            CorrelationId = request.CorrelationId,   // as in the request
            Type = ok ? "result" : "error",
        };
        string answer = ok ? Fibonacci(n).ToString()
            : "n must be an integer from 0 to 10,000";
        if (request.ReplyTo is { } replyTo)
        {
            await channel.BasicPublishAsync("", replyTo, false, reply,
                Encoding.UTF8.GetBytes(answer));
        }
        await channel.BasicAckAsync(ea.DeliveryTag, false);
    };
    await channel.BasicConsumeAsync(RpcQueue, autoAck: false,
        consumer);
    Console.WriteLine("Fibonacci RPC server, Enter to exit");
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

// RPC client: one temporary reply queue for the whole client.
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
        // Unknown identifier – a late response, ignore it.
        if (ea.BasicProperties.CorrelationId is { } id
            && pending.TryRemove(id, out var waiter))
        {
            // The body is valid only during the handler – copy it.
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
            // The broker removes a request not taken within timeout.
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
                $"no response within {timeout.TotalSeconds} s");
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

The client keeps a dictionary of waiters (`ConcurrentDictionary`, keyed by `CorrelationId`, with `TaskCompletionSource` values): `CallAsync` registers a waiter under a new `CorrelationId`, publishes the request, and waits with `WaitAsync(timeout)`, while the reply queue handler finds the waiter by identifier and completes it. The `RunContinuationsAsynchronously` option prevents the continuation of `CallAsync` from running inside the consumer handler. The server passes an error with the property `Type = "error"`, and the client turns it into an exception. The `Expiration` property equals the timeout: the broker removes a request that nobody took in time, so a server started later will not compute unneeded responses.

The server was started first (`dotnet run -c Release -- server`), then the client in another window. The client’s output (the time since the start is in square brackets):

```
F(90) = 2880067194370816120  [30 ms]
F(10) = 55  [30 ms]
F(300) = 2222322446…979600 (63 digits)  [77 ms]
F(-5): n must be an integer from 0 to 10,000  [120 ms]
```

The server:

```
Fibonacci RPC server, Enter to exit
request F(10) from amq.gen-4GM2fGEr7AevNGZYauPcAQ
request F(90) from amq.gen-4GM2fGEr7AevNGZYauPcAQ
request F(300) from amq.gen-4GM2fGEr7AevNGZYauPcAQ
request F(-5) from amq.gen-4GM2fGEr7AevNGZYauPcAQ
```

The responses to the third and fourth requests were delayed by about 45 ms each: a server with prefetch 1 receives the next request only after the broker sees its `BasicAck`, and through Docker Desktop’s forwarded port, the second of two small frames in a row (the response and `BasicAck`) arrives with a delay (see the lecture section “Distributed computing through a broker”). The same server, run in a container next to the broker, answered all four requests in 23 ms. Without a server, the client gets timeouts, and the requests disappear from the `rpc.fib` queue after 2 s:

```
F(-5): no response within 2 s  [2006 ms]
F(90): no response within 2 s  [2006 ms]
F(10): no response within 2 s  [2006 ms]
F(300): no response within 2 s  [2006 ms]
```

## Example 2. Distributed computation of an integral

Create a program with three modes: `coordinator parts steps` splits the integral $\int_{0}^{1} 4 / (1 + x^{2}) \mathrm{d} x = \pi$ into a given number of parts, publishes them to the `integral.tasks` queue, collects the results, and prints the value, the error, the time, and the number of parts computed by each worker; `worker name` computes parts with the midpoint rule; `local parts steps` is a sequential computation for comparison. Measure the time for 1, 2, 4, 8, and 16 workers, and check that the result stays correct after a worker crashes.

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
        Console.Error.WriteLine("integral worker name | " +
            "coordinator parts steps | local parts steps");
        Environment.ExitCode = 1;
        break;
}

// f(x) = 4 / (1 + x²); the integral over [0; 1] equals π.
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
    Console.WriteLine($"sequential: {total:F12}, " +
        $"{clock.Elapsed.TotalSeconds:F3} s");
}

static async Task RunWorkerAsync(ConnectionFactory factory,
    string name)
{
    await using IConnection conn =
        await factory.CreateConnectionAsync($"worker-{name}");
    await using IChannel channel = await conn.CreateChannelAsync();
    await channel.QueueDeclareAsync(TaskQueue, durable: true,
        exclusive: false, autoDelete: false);
    // 2, not 1: the next part is already at the worker while it
    // sends the result and the acknowledgment.
    await channel.BasicQosAsync(0, prefetchCount: 2, global: false);
    AsyncEventingBasicConsumer consumer = new(channel);
    consumer.ReceivedAsync += async (_, ea) =>
    {
        Part part = JsonSerializer.Deserialize<Part>(ea.Body.Span)!;
        // Compute on the thread pool so as not to block the dispatcher.
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
    Console.WriteLine($"worker {name}: waiting, Enter to exit");
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
            return Task.CompletedTask;       // a stale response
        }
        Result r = JsonSerializer.Deserialize<Result>(ea.Body.Span)!;
        total += r.Value;                    // the handler is called
        perWorker[r.Worker] =                // sequentially
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
    Console.WriteLine($"integral = {total:F12}, " +
        $"error {Math.Abs(total - Math.PI):E1}, {seconds:F3} s");
    Console.WriteLine("parts per worker: " + string.Join(", ",
        perWorker.OrderBy(p => p.Key)
            .Select(p => $"{p.Key} – {p.Value}")));
}

record Part(int Index, double A, double B, long Steps);
record Result(int Index, double Value, string Worker);
```

Parts and results are transferred as JSON (`record Part`, `record Result`). A worker computes a part in `Task.Run` so that the consumer handler does not occupy the dispatcher thread, publishes the result to the coordinator’s `ReplyTo` queue, and only then acknowledges the job: if the worker crashes before acknowledging, another worker will get the part. The coordinator’s handler is called sequentially, so the sum and the dictionary need no locks. Responses with a foreign `CorrelationId` (from a previous, interrupted run) are discarded.

`dotnet run -c Release -- worker w1` … `worker w4` were started in four windows, and then the coordinator `dotnet run -c Release -- coordinator 64 2560000000`:

```
integral = 3.141592653590, error 1.4E-014, 1.346 s
parts per worker: w1 – 15, w2 – 16, w3 – 18, w4 – 15
```

The times for different numbers of workers (each a separate process, the median of 5 runs) are given in the lecture (the “Computing an integral with workers through RabbitMQ” table). The sequential computation (`local 64 2560000000`) prints `sequential: 3.141592653590, 2.273 s`.

Fault tolerance was tested as follows: during a computation with four workers, the `w2` worker process was killed. The coordinator still received all 64 parts and the correct result: the parts that `w2` had received but not acknowledged were redelivered by the broker to other workers.

```
integral = 3.141592653590, error 1.4E-014, 1.150 s
parts per worker: w1 – 17, w2 – 10, w3 – 19, w4 – 18
```

The time of an individual run depends on the computer’s load: while the example was being prepared, other programs were using the processor, and series of measurements differed by up to 30 %.

## Example 3. Fanout notifications for independent services

Create a program in which an order service publishes events to the `order-events` fanout exchange, and the email, sms, and audit services receive **every** event through their own durable queues `notify.email`, `notify.sms`, `notify.audit`. Show that a service that was down (audit) receives the missed events after it starts, while a temporary subscriber with an exclusive queue (monitor) receives only the events published after it subscribed.

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

// Topology: a fanout exchange and a durable queue for each service.
await channel.ExchangeDeclareAsync(Exchange, ExchangeType.Fanout,
    durable: true);
foreach (string service in services)
{
    string queue = $"notify.{service}";
    await channel.QueueDeclareAsync(queue, durable: true,
        exclusive: false, autoDelete: false);
    await channel.QueueBindAsync(queue, Exchange, routingKey: "");
}

// email and sms run from the start, audit is "down."
await StartServiceAsync("email", "notify.email");
await StartServiceAsync("sms", "notify.sms");

await PublishAsync("order 101 created");
// A temporary monitor subscribes after the first event.
QueueDeclareOk temp = await channel.QueueDeclareAsync("",
    durable: false, exclusive: true, autoDelete: true);
await channel.QueueBindAsync(temp.QueueName, Exchange, "");
await StartServiceAsync("monitor", temp.QueueName);
await PublishAsync("order 101 paid");
await PublishAsync("order 102 created");

await Task.Delay(1000);
Log("audit starts after downtime");
await StartServiceAsync("audit", "notify.audit");
await Task.Delay(500);

async Task PublishAsync(string text)
{
    BasicProperties props = new() { Persistent = true };
    await channel.BasicPublishAsync(Exchange, routingKey: "", false,
        props, Encoding.UTF8.GetBytes(text));
    Log($"event: {text}");
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
    Console.WriteLine($"{clock.Elapsed.TotalSeconds:F1} s {text}");
```

Output:

```
0.3 s event: order 101 created
0.3 s   email   ← order 101 created
0.3 s   sms     ← order 101 created
0.4 s event: order 101 paid
0.4 s   monitor ← order 101 paid
0.4 s   email   ← order 101 paid
0.4 s   sms     ← order 101 paid
0.5 s event: order 102 created
0.5 s   monitor ← order 102 created
0.5 s   email   ← order 102 created
0.5 s   sms     ← order 102 created
1.6 s audit starts after downtime
1.6 s   audit   ← order 101 created
1.6 s   audit   ← order 101 paid
1.6 s   audit   ← order 102 created
```

Each service received its own copy of every event: a fanout exchange puts a message into all bound queues. The durable `notify.audit` queue accumulated three events while the service was down, while the monitor’s exclusive queue appeared only after the first event and therefore did not receive it. A new service can be added without changing the publisher: it is enough to bind one more queue to the exchange. The `notify.*` queues remain in the broker after the program exits; running it again without the audit service will accumulate new events in `notify.audit`.
