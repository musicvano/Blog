---
title: "Приклади та типові помилки"
description: "Тема 15. Брокер RabbitMQ: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

Усі програми перевірено з .NET SDK 10.0.401 у конфігурації Release на Windows 11 з брокером RabbitMQ 4.3.6 у контейнері Docker Desktop на тому самому комп’ютері. Кожен приклад – окремий консольний проєкт (`dotnet new console`) з пакетом `RabbitMQ.Client` 7.2.2.

### Привіт, RabbitMQ

Програма з аргументом `send` публікує повідомлення в чергу `hello`, без аргументів – споживає повідомлення з неї до натискання **Enter**.

```cs
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

Console.OutputEncoding = Encoding.UTF8;
ConnectionFactory factory = new() { HostName = "localhost" };
await using IConnection connection =
    await factory.CreateConnectionAsync("hello-demo");
await using IChannel channel = await connection.CreateChannelAsync();

// Оголошення ідемпотентне: черга створюється, якщо її ще немає.
await channel.QueueDeclareAsync(queue: "hello", durable: true,
    exclusive: false, autoDelete: false);

if (args is ["send", .. string[] words])
{
    string text = words.Length > 0
        ? string.Join(' ', words) : "Привіт, RabbitMQ!";
    byte[] body = Encoding.UTF8.GetBytes(text);
    // Обмінник "" (default) доставляє в чергу з ім’ям routingKey.
    await channel.BasicPublishAsync(exchange: "",
        routingKey: "hello", body: body);
    Console.WriteLine($"надіслано «{text}»");
    return;
}

AsyncEventingBasicConsumer consumer = new(channel);
consumer.ReceivedAsync += (sender, ea) =>
{
    string text = Encoding.UTF8.GetString(ea.Body.Span);
    Console.WriteLine($"отримано «{text}» (тег {ea.DeliveryTag})");
    return Task.CompletedTask;
};
await channel.BasicConsumeAsync("hello", autoAck: true, consumer);
Console.WriteLine("очікування повідомлень, Enter – вихід");
Console.ReadLine();
```

Повідомлення, надіслані до запуску споживача, чекають у стійкій черзі. Команди `dotnet run -c Release -- send` і `dotnet run -c Release -- send Черги й обмінники` виводять «надіслано «Привіт, RabbitMQ!»» і «надіслано «Черги й обмінники»», а потім споживач:

```
очікування повідомлень, Enter – вихід
отримано «Привіт, RabbitMQ!» (тег 1)
отримано «Черги й обмінники» (тег 2)
```

Тут `autoAck: true`, бо втрата привітання не критична; наступні приклади підтверджують вручну.

### Черга обробки замовлень

Команда `publish N` публікує N стійких замовлень у кворумну чергу `orders`, команда `work ім’я prefetch [аварія]` запускає робітника, який «обробляє» замовлення 250 мс на позицію й підтверджує його. Необов’язковий третій аргумент імітує падіння робітника після заданої кількості замовлень (до підтвердження останнього).

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

// Стійка кворумна черга: переживає перезапуск брокера.
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
        Order order = new(id, 1 + id * 7 % 4);   // 1–4 позиції
        BasicProperties props = new()
        {
            Persistent = true,                  // записати на диск
            MessageId = $"order-{id}",
            ContentType = "application/json",
        };
        await channel.BasicPublishAsync(exchange: "",
            routingKey: Queue, mandatory: false,
            basicProperties: props,
            body: JsonSerializer.SerializeToUtf8Bytes(order));
    }
    Console.WriteLine($"опубліковано замовлень: {count}");
    return;
}

if (args is not ["work", string name, string prefetchText, ..])
{
    Console.Error.WriteLine(
        "orders publish N | orders work ім’я prefetch [аварія]");
    return;
}
ushort prefetch = ushort.Parse(prefetchText);
int crashAfter = args.Length > 3 ? int.Parse(args[3]) : int.MaxValue;

// Не більше prefetch невідтверджених повідомлень на споживача.
await channel.BasicQosAsync(prefetchSize: 0, prefetchCount: prefetch,
    global: false);
int done = 0;
AsyncEventingBasicConsumer consumer = new(channel);
consumer.ReceivedAsync += async (_, ea) =>
{
    Order order = JsonSerializer.Deserialize<Order>(ea.Body.Span)!;
    string again = ea.Redelivered ? " (повторно)" : "";
    Console.WriteLine($"{name}: замовлення {order.Id}, " +
        $"позицій {order.Items}{again}");
    await Task.Delay(order.Items * 250);      // «обробка»
    if (++done == crashAfter)
    {
        Console.WriteLine($"{name}: аварійне завершення!");
        Environment.Exit(1);                  // без BasicAck
    }
    await channel.BasicAckAsync(ea.DeliveryTag, multiple: false);
};
await channel.BasicConsumeAsync(Queue, autoAck: false, consumer);
Console.WriteLine($"{name}: prefetch = {prefetch}, очікування…");
Console.ReadLine();

record Order(int Id, int Items);
```

У трьох вікнах терміналу запущено робітників `work A 1`, `work B 1` і `work C 1 2` (C «падає» після другого замовлення), у четвертому – `publish 9`. Робітники A і B:

```
A: prefetch = 1, очікування…     B: prefetch = 1, очікування…
A: замовлення 3, позицій 2       B: замовлення 1, позицій 4
A: замовлення 4, позицій 1       B: замовлення 7, позицій 2
A: замовлення 6, позицій 3       B: замовлення 8, позицій 1
A: замовлення 9, позицій 4       B: замовлення 5, позицій 4 (повторно)
```

Робітник C:

```
C: prefetch = 1, очікування…
C: замовлення 2, позицій 3
C: замовлення 5, позицій 4
C: аварійне завершення!
```

Замовлення 5, яке C обробив, але не підтвердив, брокер повернув у чергу й доставив B з прапорцем `Redelivered`. Жодне замовлення не втрачено, а замовлення 5 оброблено двічі – тому реальна обробка має бути ідемпотентною (розділ «Гарантії доставки»). Розподіл між робітниками залежить від порядку їх запуску і тривалості замовлень.

### Журнал подій

Обмінник `events` типу topic отримує події з ключами `<сервіс>.<рівень>`. Три підписники з ексклюзивними чергами: «чергування» (`*.error`, `*.critical`), «замовлення» (`orders.#`) і «архів» (`#`).

```cs
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

Console.OutputEncoding = Encoding.UTF8;
const string Exchange = "events";
ConnectionFactory factory = new() { HostName = "localhost" };
await using IConnection connection =
    await factory.CreateConnectionAsync("event-log");

// Ключ маршрутизації: <сервіс>.<рівень>, наприклад orders.error.
await using (IChannel setup = await connection.CreateChannelAsync())
{
    await setup.ExchangeDeclareAsync(Exchange, ExchangeType.Topic,
        durable: true);
}

// Три незалежні підписники, кожен зі своєю тимчасовою чергою.
await SubscribeAsync("чергування", "*.error", "*.critical");
await SubscribeAsync("замовлення", "orders.#");
await SubscribeAsync("архів", "#");

await using IChannel publisher =
    await connection.CreateChannelAsync();
(string Key, string Text)[] events =
[
    ("orders.info", "замовлення 17 створено"),
    ("payments.error", "банк не відповідає"),
    ("orders.error", "немає товару на складі"),
    ("auth.warning", "5 невдалих входів"),
    ("orders.db.critical", "втрачено з’єднання з БД"),
    ("payments.critical", "платіжний шлюз недоступний"),
];
foreach ((string key, string text) in events)
{
    await publisher.BasicPublishAsync(Exchange, key,
        Encoding.UTF8.GetBytes(text));
}
Console.ReadLine();                   // Enter – вихід

async Task SubscribeAsync(string name, params string[] patterns)
{
    IChannel channel = await connection.CreateChannelAsync();
    // Ім’я черги генерує брокер: amq.gen-…; exclusive – лише
    // для цього з’єднання, вилучається після його закриття.
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

Результат (підписники працюють паралельно, тому порядок рядків різних підписників змінюється від запуску до запуску, а порядок подій для одного підписника зберігається):

```
замовлення  ← [orders.info] замовлення 17 створено
чергування  ← [payments.error] банк не відповідає
архів       ← [orders.info] замовлення 17 створено
архів       ← [payments.error] банк не відповідає
архів       ← [orders.error] немає товару на складі
архів       ← [auth.warning] 5 невдалих входів
замовлення  ← [orders.error] немає товару на складі
чергування  ← [orders.error] немає товару на складі
замовлення  ← [orders.db.critical] втрачено з’єднання з БД
чергування  ← [payments.critical] платіжний шлюз недоступний
архів       ← [orders.db.critical] втрачено з’єднання з БД
архів       ← [payments.critical] платіжний шлюз недоступний
```

Зверніть увагу: «чергування» не отримало `orders.db.critical`, бо `*` у шаблоні `*.critical` замінює рівно одне слово, а ключ має три. Щоб отримувати критичні події з ключами будь-якої довжини, потрібен шаблон `#.critical`.

### Надійна публікація

Програма оплати поєднує підтвердження видавця, повернення нерозподілених повідомлень, ручні підтвердження та повтори через DLX (рис. 15.9). Платіжний шлюз імітовано: картка `timeout` спрацьовує з другої спроби, `declined` – ніколи.

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
// Канал з підтвердженнями видавця: BasicPublishAsync чекає ack.
CreateChannelOptions confirms = new(
    publisherConfirmationsEnabled: true,
    publisherConfirmationTrackingEnabled: true);
await using IChannel channel =
    await connection.CreateChannelAsync(confirms);

// Відхилене з payments → payments.retry; через 2 с (TTL) → назад.
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
        Log($"{p.Id}: оплачено {p.Amount} грн (спроба {attempt})");
        await channel.BasicAckAsync(ea.DeliveryTag, false);
    }
    else if (attempt < MaxAttempts)
    {
        Log($"{p.Id}: помилка, спроба {attempt}, повтор через 2 с");
        await channel.BasicNackAsync(ea.DeliveryTag, false,
            requeue: false);                   // → dead letter
    }
    else
    {
        BasicProperties props = new()
        {
            Persistent = true,
            Headers = ea.BasicProperties.Headers,  // разом з x-death
        };
        await channel.BasicPublishAsync("", Parking, true, props,
            ea.Body);                          // чекає підтвердження
        await channel.BasicAckAsync(ea.DeliveryTag, false);
        Log($"{p.Id}: {attempt} невдалі спроби → {Parking}");
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
await PublishAsync("paymnts", new("P-4", 10, "ok"));  // описка
await Task.Delay(6000);                 // дочекатися повторів

async Task PublishAsync(string queue, Payment p)
{
    BasicProperties props = new()
    {
        Persistent = true, MessageId = p.Id,
        ContentType = "application/json",
    };
    try
    {
        // mandatory: true – неможливо маршрутизувати → повернення.
        await channel.BasicPublishAsync("", queue, true, props,
            JsonSerializer.SerializeToUtf8Bytes(p));
        Log($"{p.Id}: брокер підтвердив прийом");
    }
    catch (PublishException ex)
    {
        Log($"{p.Id}: не прийнято (повернення: {ex.IsReturn})");
    }
}

// Скільки разів повідомлення відхилено з черги queue (x-death).
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

// Імітація платіжного шлюзу.
static bool TryCharge(Payment p, long attempt) => p.Card switch
{
    "timeout" => attempt >= 2,          // тимчасовий збій
    "declined" => false,                // постійна відмова
    _ => true,
};

void Log(string text) =>
    Console.WriteLine($"{clock.Elapsed.TotalSeconds,5:F1} с  {text}");

record Payment(string Id, decimal Amount, string Card);
```

Рядкові значення заголовків AMQP клієнт повертає як масиви байтів, тому `Text` декодує їх з UTF-8. Результат:

```
0,2 с  P-1: брокер підтвердив прийом
0,2 с  P-1: оплачено 250 грн (спроба 1)
0,2 с  P-2: брокер підтвердив прийом
0,2 с  P-2: помилка, спроба 1, повтор через 2 с
0,3 с  P-3: брокер підтвердив прийом
0,3 с  P-3: помилка, спроба 1, повтор через 2 с
0,3 с  P-4: не прийнято (повернення: True)
2,3 с  P-2: оплачено 1200 грн (спроба 2)
2,3 с  P-3: помилка, спроба 2, повтор через 2 с
4,3 с  P-3: 3 невдалі спроби → payments.parking-lot
```

Повідомлення P-4 з описаною назвою черги не потрапило нікуди, і завдяки `mandatory: true` видавець дізнався про це. Повідомлення P-3 лежить у `payments.parking-lot` із заголовком `x-death` (два записи: `payments`, `rejected`, `count: 2` і `payments.retry`, `expired`, `count: 2`), який видно у вебконсолі (рис. 15.10). Порядок рядків «підтвердив» і «оплачено» для P-1 може бути різним: споживач отримує повідомлення паралельно з підтвердженням видавцю.

## Типові помилки

Таблиця 15.7. Типові помилки роботи з RabbitMQ {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| `541 INTERNAL_ERROR … transient_nonexcl_queues` | нестійка неексклюзивна черга заборонена в RabbitMQ 4.3; оголошувати `durable: true` або `exclusive: true` |
| `406 PRECONDITION_FAILED - inequivalent arg` | черга вже існує з іншими параметрами; вилучити її або змінити параметри політикою |
| `404 NOT_FOUND - no queue` | споживач запущений раніше, ніж створено чергу; оголошувати чергу і у видавці, і в споживачі |
| повідомлення зникають після перезапуску брокера | нестійка черга або `Persistent = false`; потрібні обидва параметри або кворумна черга |
| повідомлення «зависли» в *Unacked* і повторюються | не викликано `BasicAckAsync` або підтвердження надіслано іншим каналом |
| «отруйне» повідомлення доставляється безкінечно | `BasicNackAsync(requeue: true)` в обробнику помилок; відхиляти з `requeue: false` у DLX, обмежити спроби |
| один робітник перевантажений, інші простоюють | не задано prefetch; `BasicQosAsync` з невеликим `prefetchCount` |
| повідомлення з topic-обмінника не надходять | шаблон не збігається: `*` – рівно одне слово, `#` – будь-яка кількість |
| у тілі повідомлення «сміття» після `await` | `ea.Body` використано після завершення обробника; копіювати тіло всередині |
| дублікати обробки після збоїв | at-least-once доставка; ідемпотентний споживач за `MessageId` |
