---
title: "Examples and common mistakes"
description: "Topic 15. The RabbitMQ broker: examples and common mistakes"
outline: [2, 3]
sourceHash: "35805ef2d916e0e0e15b3830104cf57f00585d8b2d2a824f6295d0cd5ac972b0"
---

# Examples and common mistakes

## Program examples

All programs were tested with .NET SDK 10.0.401 in Release configuration on Windows 11 with the RabbitMQ 4.3.6 broker in a Docker Desktop container on the same computer. Each example is a separate console project (`dotnet new console`) with the `RabbitMQ.Client` 7.2.2 package.

### Hello, RabbitMQ

With the `send` argument, the program publishes a message to the `hello` queue; without arguments, it consumes messages from it until **Enter** is pressed.

```cs
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

Console.OutputEncoding = Encoding.UTF8;
ConnectionFactory factory = new() { HostName = "localhost" };
await using IConnection connection =
    await factory.CreateConnectionAsync("hello-demo");
await using IChannel channel = await connection.CreateChannelAsync();

// The declaration is idempotent: the queue is created if it does not exist.
await channel.QueueDeclareAsync(queue: "hello", durable: true,
    exclusive: false, autoDelete: false);

if (args is ["send", .. string[] words])
{
    string text = words.Length > 0
        ? string.Join(' ', words) : "Hello, RabbitMQ!";
    byte[] body = Encoding.UTF8.GetBytes(text);
    // The "" (default) exchange delivers to the queue named routingKey.
    await channel.BasicPublishAsync(exchange: "",
        routingKey: "hello", body: body);
    Console.WriteLine($"sent \"{text}\"");
    return;
}

AsyncEventingBasicConsumer consumer = new(channel);
consumer.ReceivedAsync += (sender, ea) =>
{
    string text = Encoding.UTF8.GetString(ea.Body.Span);
    Console.WriteLine($"received \"{text}\" (tag {ea.DeliveryTag})");
    return Task.CompletedTask;
};
await channel.BasicConsumeAsync("hello", autoAck: true, consumer);
Console.WriteLine("waiting for messages, Enter to exit");
Console.ReadLine();
```

Messages sent before the consumer starts wait in the durable queue. The commands `dotnet run -c Release -- send` and `dotnet run -c Release -- send Queues and exchanges` print “sent "Hello, RabbitMQ!"” and “sent "Queues and exchanges",” and then the consumer prints:

```
waiting for messages, Enter to exit
received "Hello, RabbitMQ!" (tag 1)
received "Queues and exchanges" (tag 2)
```

Here `autoAck: true` is used because losing a greeting is not critical; the following examples acknowledge manually.

### Order processing queue

The `publish N` command publishes N persistent orders to the `orders` quorum queue, and the `work name prefetch [crash]` command starts a worker that “processes” an order for 250 ms per line and acknowledges it. The optional third argument simulates a worker crash after a given number of orders (before the last one is acknowledged).

```cs
using System.Text;
using System.Text.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

Console.OutputEncoding = Encoding.UTF8;
const string Queue = "orders";
ConnectionFactory factory = new() { HostName = "localhost" };
await using IConnection connection =
    await factory.CreateConnectionAsync($"orders-{args[0]}");
await using IChannel channel = await connection.CreateChannelAsync();

// A durable quorum queue: survives a broker restart.
await channel.QueueDeclareAsync(Queue, durable: true,
    exclusive: false, autoDelete: false,
    arguments: new Dictionary<string, object?>
    {
        ["x-queue-type"] = "quorum",
    });

if (args is ["publish", string countText])
{
    int count = int.Parse(countText);
    for (int id = 1; id <= count; id++)
    {
        Order order = new(id, 1 + id * 7 % 4);   // 1–4 lines
        BasicProperties props = new()
        {
            Persistent = true,                  // write to disk
            MessageId = $"order-{id}",
            ContentType = "application/json",
        };
        await channel.BasicPublishAsync(exchange: "",
            routingKey: Queue, mandatory: false,
            basicProperties: props,
            body: JsonSerializer.SerializeToUtf8Bytes(order));
    }
    Console.WriteLine($"orders published: {count}");
    return;
}

if (args is not ["work", string name, string prefetchText, ..])
{
    Console.Error.WriteLine(
        "orders publish N | orders work name prefetch [crash]");
    return;
}
ushort prefetch = ushort.Parse(prefetchText);
int crashAfter = args.Length > 3 ? int.Parse(args[3]) : int.MaxValue;

// At most prefetch unacknowledged messages per consumer.
await channel.BasicQosAsync(prefetchSize: 0, prefetchCount: prefetch,
    global: false);
int done = 0;
AsyncEventingBasicConsumer consumer = new(channel);
consumer.ReceivedAsync += async (_, ea) =>
{
    Order order = JsonSerializer.Deserialize<Order>(ea.Body.Span)!;
    string again = ea.Redelivered ? " (redelivered)" : "";
    Console.WriteLine($"{name}: order {order.Id}, " +
        $"items {order.Items}{again}");
    await Task.Delay(order.Items * 250);      // "processing"
    if (++done == crashAfter)
    {
        Console.WriteLine($"{name}: crashing!");
        Environment.Exit(1);                  // without BasicAck
    }
    await channel.BasicAckAsync(ea.DeliveryTag, multiple: false);
};
await channel.BasicConsumeAsync(Queue, autoAck: false, consumer);
Console.WriteLine($"{name}: prefetch = {prefetch}, waiting…");
Console.ReadLine();

record Order(int Id, int Items);
```

Workers `work A 1`, `work B 1`, and `work C 1 2` (C “crashes” after the second order) were started in three terminal windows, and `publish 9` in the fourth. Workers A and B:

```
A: prefetch = 1, waiting…        B: prefetch = 1, waiting…
A: order 3, items 2              B: order 1, items 4
A: order 4, items 1              B: order 7, items 2
A: order 6, items 3              B: order 8, items 1
A: order 9, items 4              B: order 5, items 4 (redelivered)
```

Worker C:

```
C: prefetch = 1, waiting…
C: order 2, items 3
C: order 5, items 4
C: crashing!
```

Order 5, which C processed but did not acknowledge, was returned to the queue by the broker and delivered to B with the `Redelivered` flag. No order was lost, and order 5 was processed twice; that is why real processing must be idempotent (see “Delivery guarantees”). The distribution among workers depends on the order in which they start and on the duration of the orders.

### Event log

The `events` topic exchange receives events with keys of the form `<service>.<level>`. Three subscribers with exclusive queues: “on-call” (`*.error`, `*.critical`), “orders” (`orders.#`), and “archive” (`#`).

```cs
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

Console.OutputEncoding = Encoding.UTF8;
const string Exchange = "events";
ConnectionFactory factory = new() { HostName = "localhost" };
await using IConnection connection =
    await factory.CreateConnectionAsync("event-log");

// Routing key: <service>.<level>, for example orders.error.
await using (IChannel setup = await connection.CreateChannelAsync())
{
    await setup.ExchangeDeclareAsync(Exchange, ExchangeType.Topic,
        durable: true);
}

// Three independent subscribers, each with its own temporary queue.
await SubscribeAsync("on-call", "*.error", "*.critical");
await SubscribeAsync("orders", "orders.#");
await SubscribeAsync("archive", "#");

await using IChannel publisher =
    await connection.CreateChannelAsync();
(string Key, string Text)[] events =
[
    ("orders.info", "order 17 created"),
    ("payments.error", "bank not responding"),
    ("orders.error", "out of stock"),
    ("auth.warning", "5 failed logins"),
    ("orders.db.critical", "database connection lost"),
    ("payments.critical", "payment gateway unavailable"),
];
foreach ((string key, string text) in events)
{
    await publisher.BasicPublishAsync(Exchange, key,
        Encoding.UTF8.GetBytes(text));
}
Console.ReadLine();                   // Enter to exit

async Task SubscribeAsync(string name, params string[] patterns)
{
    IChannel channel = await connection.CreateChannelAsync();
    // The broker generates the queue name: amq.gen-…; exclusive – only
    // for this connection, deleted when it closes.
    QueueDeclareOk queue = await channel.QueueDeclareAsync(
        queue: "", durable: false, exclusive: true, autoDelete: true);
    foreach (string pattern in patterns)
    {
        await channel.QueueBindAsync(queue.QueueName, Exchange,
            routingKey: pattern);
    }
    AsyncEventingBasicConsumer consumer = new(channel);
    consumer.ReceivedAsync += (_, ea) =>
    {
        string text = Encoding.UTF8.GetString(ea.Body.Span);
        Console.WriteLine($"{name,-11} ← [{ea.RoutingKey}] {text}");
        return Task.CompletedTask;
    };
    await channel.BasicConsumeAsync(queue.QueueName, autoAck: true,
        consumer);
}
```

Output (the subscribers run in parallel, so the order of lines from different subscribers changes from run to run, while the order of events for a single subscriber is preserved):

```
orders      ← [orders.info] order 17 created
on-call     ← [payments.error] bank not responding
archive     ← [orders.info] order 17 created
archive     ← [payments.error] bank not responding
archive     ← [orders.error] out of stock
archive     ← [auth.warning] 5 failed logins
orders      ← [orders.error] out of stock
on-call     ← [orders.error] out of stock
orders      ← [orders.db.critical] database connection lost
on-call     ← [payments.critical] payment gateway unavailable
archive     ← [orders.db.critical] database connection lost
archive     ← [payments.critical] payment gateway unavailable
```

Note that “on-call” did not receive `orders.db.critical`, because `*` in the `*.critical` pattern replaces exactly one word, while the key has three. To receive critical events with keys of any length, the pattern `#.critical` is needed.

### Reliable publishing

The payment program combines publisher confirms, returns of unroutable messages, manual acknowledgments, and retries through a DLX (Fig. 15.9). The payment gateway is simulated: the `timeout` card succeeds on the second attempt, and `declined` never does.

```cs
using System.Diagnostics;
using System.Text;
using System.Text.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using RabbitMQ.Client.Exceptions;

Console.OutputEncoding = Encoding.UTF8;
const string Main = "payments", Retry = "payments.retry",
    Parking = "payments.parking-lot";
const int MaxAttempts = 3;
Stopwatch clock = Stopwatch.StartNew();

ConnectionFactory factory = new() { HostName = "localhost" };
await using IConnection connection =
    await factory.CreateConnectionAsync("reliable-demo");
// A channel with publisher confirms: BasicPublishAsync waits for ack.
CreateChannelOptions confirms = new(
    publisherConfirmationsEnabled: true,
    publisherConfirmationTrackingEnabled: true);
await using IChannel channel =
    await connection.CreateChannelAsync(confirms);

// Rejected from payments → payments.retry; after 2 s (TTL) → back.
await channel.QueueDeclareAsync(Main, durable: true, exclusive: false,
    autoDelete: false, arguments: new Dictionary<string, object?>
    {
        ["x-queue-type"] = "quorum",
        ["x-dead-letter-exchange"] = "",
        ["x-dead-letter-routing-key"] = Retry,
    });
await channel.QueueDeclareAsync(Retry, durable: true,
    exclusive: false, autoDelete: false,
    arguments: new Dictionary<string, object?>
    {
        ["x-message-ttl"] = 2000,
        ["x-dead-letter-exchange"] = "",
        ["x-dead-letter-routing-key"] = Main,
    });
await channel.QueueDeclareAsync(Parking, durable: true,
    exclusive: false, autoDelete: false);

AsyncEventingBasicConsumer consumer = new(channel);
consumer.ReceivedAsync += async (_, ea) =>
{
    Payment p = JsonSerializer.Deserialize<Payment>(ea.Body.Span)!;
    long attempt = 1 + Rejections(ea.BasicProperties, Main);
    if (TryCharge(p, attempt))
    {
        Log($"{p.Id}: paid UAH {p.Amount} (attempt {attempt})");
        await channel.BasicAckAsync(ea.DeliveryTag, false);
    }
    else if (attempt < MaxAttempts)
    {
        Log($"{p.Id}: error, attempt {attempt}, retry in 2 s");
        await channel.BasicNackAsync(ea.DeliveryTag, false,
            requeue: false);                   // → dead letter
    }
    else
    {
        BasicProperties props = new()
        {
            Persistent = true,
            Headers = ea.BasicProperties.Headers,  // together with x-death
        };
        await channel.BasicPublishAsync("", Parking, true, props,
            ea.Body);                          // waits for confirmation
        await channel.BasicAckAsync(ea.DeliveryTag, false);
        Log($"{p.Id}: {attempt} failed attempts → {Parking}");
    }
};
await channel.BasicConsumeAsync(Main, autoAck: false, consumer);

Payment[] payments =
[
    new("P-1", 250, "ok"), new("P-2", 1200, "timeout"),
    new("P-3", 90, "declined"),
];
foreach (Payment p in payments)
{
    await PublishAsync(Main, p);
}
await PublishAsync("paymnts", new("P-4", 10, "ok"));  // typo
await Task.Delay(6000);                 // wait for the retries

async Task PublishAsync(string queue, Payment p)
{
    BasicProperties props = new()
    {
        Persistent = true, MessageId = p.Id,
        ContentType = "application/json",
    };
    try
    {
        // mandatory: true – cannot be routed → returned.
        await channel.BasicPublishAsync("", queue, true, props,
            JsonSerializer.SerializeToUtf8Bytes(p));
        Log($"{p.Id}: broker confirmed receipt");
    }
    catch (PublishException ex)
    {
        Log($"{p.Id}: not accepted (return: {ex.IsReturn})");
    }
}

// How many times the message was rejected from queue (x-death).
static long Rejections(IReadOnlyBasicProperties props, string queue)
{
    if (props.Headers?.TryGetValue("x-death", out object? value)
        != true || value is not List<object> deaths)
    {
        return 0;
    }
    foreach (IDictionary<string, object?> death in
        deaths.Cast<IDictionary<string, object?>>())
    {
        string q = Text(death["queue"]);
        string reason = Text(death["reason"]);
        if (q == queue && reason == "rejected")
        {
            return (long)death["count"]!;
        }
    }
    return 0;
}

static string Text(object? bytes) =>
    Encoding.UTF8.GetString((byte[])bytes!);

// A simulated payment gateway.
static bool TryCharge(Payment p, long attempt) => p.Card switch
{
    "timeout" => attempt >= 2,          // transient failure
    "declined" => false,                // permanent refusal
    _ => true,
};

void Log(string text) =>
    Console.WriteLine($"{clock.Elapsed.TotalSeconds,5:F1} s  {text}");

record Payment(string Id, decimal Amount, string Card);
```

The client returns string values of AMQP headers as byte arrays, so `Text` decodes them from UTF-8. Output:

```
0.2 s  P-1: broker confirmed receipt
0.2 s  P-1: paid UAH 250 (attempt 1)
0.2 s  P-2: broker confirmed receipt
0.2 s  P-2: error, attempt 1, retry in 2 s
0.3 s  P-3: broker confirmed receipt
0.3 s  P-3: error, attempt 1, retry in 2 s
0.3 s  P-4: not accepted (return: True)
2.3 s  P-2: paid UAH 1200 (attempt 2)
2.3 s  P-3: error, attempt 2, retry in 2 s
4.3 s  P-3: 3 failed attempts → payments.parking-lot
```

Message P-4 with the misspelled queue name went nowhere, and thanks to `mandatory: true` the publisher found out about it. Message P-3 sits in `payments.parking-lot` with the `x-death` header (two records: `payments`, `rejected`, `count: 2` and `payments.retry`, `expired`, `count: 2`), which is visible in the web console (Fig. 15.10). The order of the “confirmed” and “paid” lines for P-1 may vary: the consumer receives the message in parallel with the confirmation to the publisher.

## Common mistakes

Table 15.7. Common mistakes when working with RabbitMQ {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| `541 INTERNAL_ERROR … transient_nonexcl_queues` | a non-durable non-exclusive queue is not allowed in RabbitMQ 4.3; declare it with `durable: true` or `exclusive: true` |
| `406 PRECONDITION_FAILED - inequivalent arg` | the queue already exists with different parameters; delete it or change the parameters with a policy |
| `404 NOT_FOUND - no queue` | the consumer started before the queue was created; declare the queue in both the publisher and the consumer |
| messages disappear after a broker restart | a non-durable queue or `Persistent = false`; both parameters or a quorum queue are required |
| messages are “stuck” in *Unacked* and repeat | `BasicAckAsync` was not called, or the acknowledgment was sent on another channel |
| a “poison” message is delivered endlessly | `BasicNackAsync(requeue: true)` in the error handler; reject with `requeue: false` to a DLX and limit attempts |
| one worker is overloaded while others sit idle | prefetch is not set; `BasicQosAsync` with a small `prefetchCount` |
| messages from a topic exchange do not arrive | the pattern does not match: `*` is exactly one word, `#` is any number |
| “garbage” in the message body after `await` | `ea.Body` was used after the handler finished; copy the body inside it |
| duplicate processing after failures | at-least-once delivery; an idempotent consumer keyed by `MessageId` |
