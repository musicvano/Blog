---
title: "The .NET client and work queues"
description: "Topic 15. The RabbitMQ broker: the .NET client and work queues"
outline: [2, 3]
sourceHash: "0b2e1ae5f3ed1099f3d998d491faefed967beb521977e09cb14442fdc3eb150b"
---

# The .NET client and work queues

## The `RabbitMQ.Client` 7 .NET client

The official library for .NET is the NuGet package `RabbitMQ.Client` (<https://www.nuget.org/packages/RabbitMQ.Client>), version 7.2.2 as of September 2026. In version 7, the API is fully asynchronous: the `IModel` channel interface was renamed to `IChannel`, and all operations have the `Async` suffix and return `Task`/`ValueTask` (guide: <https://www.rabbitmq.com/client-libraries/dotnet-api-guide>). There is a separate client for AMQP 1.0, `RabbitMQ.AMQP.Client`, which is not used in this topic.

```powershell
dotnet new console -n Hello
cd Hello
dotnet add package RabbitMQ.Client --version 7.2.2
```

### Connection and channel

```cs
ConnectionFactory factory = new() { HostName = "localhost" };
await using IConnection connection =
    await factory.CreateConnectionAsync("hello-demo");
await using IChannel channel = await connection.CreateChannelAsync();
```

`ConnectionFactory` sets the parameters: `HostName`, `Port` (5672), `VirtualHost` (`/`), `UserName` and `Password` (`guest`), or everything at once as `Uri = new Uri("amqp://user:pass@host:5672/vhost")`. The string in `CreateConnectionAsync` is the connection name, which is visible in the web console. The defaults were verified: `AutomaticRecoveryEnabled = true` (after a disconnection, the client itself restores the connection, channels, queues, and consumers every 5 s), `RequestedHeartbeat` of 60 s (a connection liveness check, Topic 14), and `MaxInboundMessageBodySize` of 64 MB.

### Declaring a queue and publishing

```cs
await channel.QueueDeclareAsync(queue: "hello", durable: true,
    exclusive: false, autoDelete: false, arguments: null);
await channel.BasicPublishAsync(exchange: "", routingKey: "hello",
    body: Encoding.UTF8.GetBytes("Hello, RabbitMQ!"));
```

`QueueDeclareAsync` is **idempotent**: it creates the queue if it does not exist and changes nothing if it already exists with the same parameters. Therefore both the publisher and the consumer call it. The parameters:

- `durable`: the queue is **durable**, and its definition survives a broker restart;
- `exclusive`: the queue belongs only to this connection and is deleted when the connection closes;
- `autoDelete`: delete the queue when the last consumer unsubscribes from it;
- `arguments`: additional `x-…` arguments: queue type, TTL, length limits, and so on.

::: tip RabbitMQ 4.3 pitfall
Classic examples declare a queue with `durable: false`. In RabbitMQ 4.3, **non-durable non-exclusive** queues are disabled by default, and such a call closes the connection with the error `541 INTERNAL_ERROR - Feature transient_nonexcl_queues is deprecated` (verified). Use durable queues, and for temporary ones use `exclusive: true` (<https://www.rabbitmq.com/docs/deprecated-features>).
:::

`BasicPublishAsync` sends the body (`ReadOnlyMemory<byte>`) to an exchange. The empty string is the **default exchange**, to which every queue is automatically bound with a key equal to its name; therefore a message with `routingKey: "hello"` ends up in the `hello` queue. Properties are set with the `BasicProperties` class (Table 15.2):

```cs
BasicProperties props = new()
{
    Persistent = true, ContentType = "application/json",
    MessageId = "order-17",
};
await channel.BasicPublishAsync("", "orders", mandatory: false,
    basicProperties: props, body: json);
```

Table 15.2. Main message properties {.caption}

| **Property** | **Purpose** |
| --- | --- |
| `Persistent` | `true` means write the message to disk (delivery mode 2) |
| `ContentType` | the body type: `application/json`, `text/plain` |
| `MessageId` | a unique identifier for eliminating duplicates |
| `CorrelationId`, `ReplyTo` | linking a response to a request and the queue for the response (RPC) |
| `Expiration` | the message time-to-live in milliseconds (a string) |
| `Priority` | a priority of 0–255 for priority queues |
| `Headers` | arbitrary key–value headers |
| `Type`, `Timestamp` | the message type and creation time |

### Consuming

```cs
AsyncEventingBasicConsumer consumer = new(channel);
consumer.ReceivedAsync += async (sender, ea) =>
{
    string text = Encoding.UTF8.GetString(ea.Body.Span);
    Console.WriteLine($"received \"{text}\"");
    await channel.BasicAckAsync(ea.DeliveryTag, multiple: false);
};
await channel.BasicConsumeAsync("hello", autoAck: false, consumer);
```

`BasicConsumeAsync` registers a consumer, and the broker sends messages as soon as they appear; the asynchronous `ReceivedAsync` handler is called for each one. The `BasicDeliverEventArgs` object contains the `Body`, the `BasicProperties`, the exchange, the routing key, the `Redelivered` flag, and the **delivery tag** `DeliveryTag`, the delivery number in the channel by which it is acknowledged.

Rules for working with the client:

- the handlers of one channel are called **sequentially** by default (`ConsumerDispatchConcurrency = 1`), so long computations are moved to `Task.Run`, and waiting is done with `await`;
- the `ea.Body` memory is valid **only until the handler finishes**: the body must be deserialized or copied inside it;
- a channel must not be used for publishing from several threads at once; give each task its own channel or use a lock;
- connections and channels are closed (`await using`); otherwise the broker keeps them until a timeout.

The complete “Hello, RabbitMQ” program is given at the end of the lecture.

## Work queues and consumer acknowledgments

A **work queue** (*task queue*) is a pattern in which several **competing consumers** read one queue, and each message is received by only one of them (Fig. 15.4). This is how time-consuming jobs (order processing, image thumbnails, computations) are distributed among processes on the same or different computers, and scaling is done by starting additional workers.

```mermaid
flowchart TB
  P["Publisher"] --> Q["queue <code>orders</code><br>tail 9 | 8 | 7 | 6 | 5 | 4 head"]
  Q -->|"delivery"| W1["Worker 1<br>processing No. 1"]
  Q --> W2["Worker 2<br>processing No. 2"]
  Q --> W3["✗ Worker 3<br>processing No. 3"]
  W1 -.->|"<code>ack</code>"| Q
  W2 -.-> Q
  W3 -.->|"failure:<br>unacknowledged<br>No. 3 returns<br>to the queue"| Q
  W2 ~~~ PF["each has <code>prefetch = 1</code>"]
  PF ~~~ N["a worker receives the next message<br>only after the <code>ack</code> of the previous one"]
```

Figure 15.4. A work queue with competing consumers {.caption}

### Consumer acknowledgments

The broker removes a message from the queue only after the consumer’s **acknowledgement** (ack) (<https://www.rabbitmq.com/docs/confirms>):

- `autoAck: true`: a message is considered delivered immediately after it is sent; if the worker crashes during processing, the message is **lost**;
- `autoAck: false`: manual acknowledgments after processing:
  - `BasicAckAsync(tag, multiple)`: processed successfully (`multiple: true` acknowledges all deliveries with tags up to and including `tag`);
  - `BasicNackAsync(tag, multiple, requeue)`: not processed; `requeue: true` returns the message to the queue, and `false` discards it or passes it to a dead letter exchange;
  - `BasicRejectAsync(tag, requeue)`: the same for a single delivery.

If a channel or connection closes (the worker crashed, the network went away), all **unacknowledged** deliveries return to the queue and are delivered to other consumers with the `Redelivered = true` flag. Quorum queues also have an **acknowledgment timeout** (*consumer timeout*), 30 min by default: a message not acknowledged within this time returns to the queue.

::: tip Pitfall
A forgotten acknowledgment is a common mistake: messages “hang” in the *Unacked* state, and when the consumer exits, they return and are processed again. Acknowledgments are sent on the same channel on which the delivery was received: a tag makes sense only within its channel.
:::

### Prefetch

Without limits, the broker sends messages to consumers **in turn** (*round-robin*) right away, regardless of how many each one is already processing. **Prefetch** limits the number of unacknowledged deliveries per consumer (<https://www.rabbitmq.com/docs/consumer-prefetch>):

```cs
await channel.BasicQosAsync(prefetchSize: 0, prefetchCount: 1,
    global: false);
```

The `global: true` parameter (a limit on the whole channel) is not allowed in RabbitMQ 4.3; only per-consumer limits are used. The author tested the effect of prefetch on distribution with the “Order processing queue” example (at the end of the lecture): two workers, 12 orders with 1–4 lines, 250 ms of processing per line. Without a limit (prefetch 0), each got 6 orders, but worker A got 18 lines (4.5 s of work) and B got 12 (3 s) and sat idle. With prefetch 1, both got 15 lines: a new order goes to whoever becomes free.

A small prefetch evens out the load but limits throughput: after each acknowledgment, the consumer waits for the next delivery over the network. Measurements on an i9-11900KF (the broker in Docker Desktop on the same PC, 20,000 persistent messages of 256 bytes, one consumer, acknowledging every message, the median of 5 runs after warmup) are given in Table 15.3.

Table 15.3. Consumption rate depending on prefetch (i9-11900KF, Docker Desktop) {.caption}

| **Consumer mode** | **Classic queue, msg/s** | **Quorum queue, msg/s** |
| --- | --- | --- |
| `autoAck: true` | 90,786 | 111,221 |
| manual ack, prefetch 1 | 2,354 | 184 |
| manual ack, prefetch 10 | 16,227 | 643 |
| manual ack, prefetch 100 | 37,703 | 6,336 |
| manual ack, prefetch 1000 | 50,900 | 65,508 |

With prefetch 1, each message costs a full network round trip, and for a quorum queue also a write of the acknowledgment to the Raft log on disk: only 184 messages per second. The RabbitMQ documentation notes that values of 100–300 usually give the best throughput. For long jobs (seconds), even distribution matters more, and a prefetch of 1–2 is appropriate; for short messages, prefetch is increased. The state of the queue and its consumers is visible in the web console (Fig. 15.5): *Ready* messages are waiting, and *Unacked* ones have been delivered but not acknowledged.

::: info Screenshot
Management UI → Queues and Streams → `orders` while three `Orders work A|B|C 1` workers run and `Orders publish 30` was just started: Overview with Ready / Unacked / Total, Consumers section listing 3 consumers with Prefetch count 1 and Ack required ●
:::

Figure 15.5. The `orders` queue with three consumers {.caption}
