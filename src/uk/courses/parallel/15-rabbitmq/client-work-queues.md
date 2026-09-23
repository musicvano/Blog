---
title: "Клієнт .NET і черги завдань"
description: "Тема 15. Брокер RabbitMQ: Клієнт .NET і черги завдань"
outline: [2, 3]
---

# Клієнт .NET і черги завдань

## Клієнт .NET `RabbitMQ.Client` 7

Офіційна бібліотека для .NET – NuGet-пакет `RabbitMQ.Client` (<https://www.nuget.org/packages/RabbitMQ.Client>), у вересні 2026 року версія 7.2.2. У версії 7 API повністю асинхронний: інтерфейс каналу `IModel` перейменовано на `IChannel`, а всі операції мають суфікс `Async` і повертають `Task`/`ValueTask` (посібник: <https://www.rabbitmq.com/client-libraries/dotnet-api-guide>). Для AMQP 1.0 існує окремий клієнт `RabbitMQ.AMQP.Client`, у цій темі не використовується.

```powershell
dotnet new console -n Hello
cd Hello
dotnet add package RabbitMQ.Client --version 7.2.2
```

### З’єднання і канал

```cs
ConnectionFactory factory = new() { HostName = "localhost" };
await using IConnection connection =
    await factory.CreateConnectionAsync("hello-demo");
await using IChannel channel = await connection.CreateChannelAsync();
```

`ConnectionFactory` задає параметри: `HostName`, `Port` (5672), `VirtualHost` (`/`), `UserName` і `Password` (`guest`) або все разом як `Uri = new Uri("amqp://user:pass@host:5672/vhost")`. Рядок у `CreateConnectionAsync` – ім’я з’єднання, яке видно у вебконсолі. Перевірено типові значення: `AutomaticRecoveryEnabled = true` (після розриву клієнт сам відновлює з’єднання, канали, черги та споживачів кожні 5 с), `RequestedHeartbeat` 60 с (перевірка «живості» з’єднання, тема 14), `MaxInboundMessageBodySize` 64 МБ.

### Оголошення черги та публікація

```cs
await channel.QueueDeclareAsync(queue: "hello", durable: true,
    exclusive: false, autoDelete: false, arguments: null);
await channel.BasicPublishAsync(exchange: "", routingKey: "hello",
    body: Encoding.UTF8.GetBytes("Привіт, RabbitMQ!"));
```

`QueueDeclareAsync` **ідемпотентний**: створює чергу, якщо її немає, і нічого не змінює, якщо вона вже існує з тими самими параметрами. Тому його викликають і видавець, і споживач. Параметри:

- `durable` – черга **стійка**: її опис переживає перезапуск брокера;
- `exclusive` – черга належить лише цьому з’єднанню й вилучається після його закриття;
- `autoDelete` – вилучити чергу, коли від неї відпишеться останній споживач;
- `arguments` – додаткові аргументи `x-…`: тип черги, TTL, обмеження довжини тощо.

::: tip Пастка RabbitMQ 4.3
Класичні приклади оголошують чергу з `durable: false`. У RabbitMQ 4.3 **нестійкі неексклюзивні** черги заборонено за замовчуванням, і такий виклик закриває з’єднання з помилкою `541 INTERNAL_ERROR - Feature transient_nonexcl_queues is deprecated` (перевірено). Використовуйте стійкі черги, а для тимчасових – `exclusive: true` (<https://www.rabbitmq.com/docs/deprecated-features>).
:::

`BasicPublishAsync` надсилає тіло (`ReadOnlyMemory<byte>`) в обмінник. Порожній рядок – **типовий обмінник** (*default exchange*), до якого кожна черга автоматично прив’язана ключем, що дорівнює її імені; тому повідомлення з `routingKey: "hello"` потрапляє в чергу `hello`. Властивості задає клас `BasicProperties` (табл. 15.2):

```cs
BasicProperties props = new()
{
    Persistent = true, ContentType = "application/json",
    MessageId = "order-17",
};
await channel.BasicPublishAsync("", "orders", mandatory: false,
    basicProperties: props, body: json);
```

Таблиця 15.2. Основні властивості повідомлення {.caption}

| **Властивість** | **Призначення** |
| --- | --- |
| `Persistent` | `true` – записати повідомлення на диск (режим доставки 2) |
| `ContentType` | тип тіла: `application/json`, `text/plain` |
| `MessageId` | унікальний ідентифікатор для усунення дублікатів |
| `CorrelationId`, `ReplyTo` | зв’язок відповіді із запитом і черга для відповіді (RPC) |
| `Expiration` | час життя повідомлення в мілісекундах (рядок) |
| `Priority` | пріоритет 0–255 для черг із пріоритетами |
| `Headers` | довільні заголовки «ключ–значення» |
| `Type`, `Timestamp` | тип повідомлення й час створення |

### Споживання

```cs
AsyncEventingBasicConsumer consumer = new(channel);
consumer.ReceivedAsync += async (sender, ea) =>
{
    string text = Encoding.UTF8.GetString(ea.Body.Span);
    Console.WriteLine($"отримано «{text}»");
    await channel.BasicAckAsync(ea.DeliveryTag, multiple: false);
};
await channel.BasicConsumeAsync("hello", autoAck: false, consumer);
```

`BasicConsumeAsync` реєструє споживача, і брокер надсилає повідомлення, щойно вони з’являються; для кожного викликається асинхронний обробник `ReceivedAsync`. Об’єкт `BasicDeliverEventArgs` містить тіло `Body`, властивості `BasicProperties`, обмінник, ключ маршрутизації, прапорець `Redelivered` і **тег доставки** `DeliveryTag` – номер доставки в каналі, за яким її підтверджують.

Правила роботи з клієнтом:

- обробники одного каналу типово викликаються **послідовно** (`ConsumerDispatchConcurrency = 1`), тому довгі обчислення виносять у `Task.Run`, а очікування роблять через `await`;
- пам’ять `ea.Body` дійсна **лише до завершення обробника**: тіло треба десеріалізувати чи скопіювати всередині нього;
- канал не можна одночасно використовувати для публікації з кількох потоків – кожній задачі власний канал або блокування;
- з’єднання й канали закривають (`await using`), інакше брокер тримає їх до таймауту.

Повна програма «Привіт, RabbitMQ» наведена в кінці лекції.

## Черги завдань і підтвердження споживача

**Черга завдань** (*work queue*, *task queue*) – шаблон, у якому кілька **конкуруючих споживачів** (*competing consumers*) читають одну чергу, а кожне повідомлення отримує лише один із них (рис. 15.4). Так розподіляють трудомісткі завдання (обробка замовлень, мініатюри зображень, обчислення) між процесами на одному чи різних комп’ютерах, а масштабують – запуском додаткових робітників.

```mermaid
flowchart TB
  P["Видавець"] --> Q["черга <code>orders</code><br>хвіст 9 | 8 | 7 | 6 | 5 | 4 голова"]
  Q -->|"доставка"| W1["Робітник 1<br>обробляє № 1"]
  Q --> W2["Робітник 2<br>обробляє № 2"]
  Q --> W3["✗ Робітник 3<br>обробляє № 3"]
  W1 -.->|"<code>ack</code>"| Q
  W2 -.-> Q
  W3 -.->|"збій:<br>невідтверджене<br>№ 3 повертається<br>в чергу"| Q
  W2 ~~~ PF["у кожного <code>prefetch = 1</code>"]
  PF ~~~ N["наступне повідомлення робітник<br>отримує лише після <code>ack</code> попереднього"]
```

Рис. 15.4. Черга завдань із конкуруючими споживачами {.caption}

### Підтвердження споживача

Брокер вилучає повідомлення з черги лише після **підтвердження** (*acknowledgement*, ack) споживача (<https://www.rabbitmq.com/docs/confirms>):

- `autoAck: true` – повідомлення вважається доставленим одразу після відправлення; якщо робітник упаде під час обробки, повідомлення **втрачено**;
- `autoAck: false` – ручні підтвердження після обробки:
  - `BasicAckAsync(tag, multiple)` – успішно оброблено (`multiple: true` підтверджує всі доставки з тегами до `tag` включно);
  - `BasicNackAsync(tag, multiple, requeue)` – не оброблено; `requeue: true` повертає в чергу, `false` – відкидає або передає в dead letter exchange;
  - `BasicRejectAsync(tag, requeue)` – те саме для однієї доставки.

Якщо канал чи з’єднання закрилося (робітник упав, мережа зникла), усі **невідтверджені** доставки повертаються в чергу й доставляються іншим споживачам з прапорцем `Redelivered = true`. Для кворумних черг діє ще й **таймаут підтвердження** (*consumer timeout*), типово 30 хв: повідомлення, не підтверджене за цей час, повертається в чергу.

::: tip Пастка
Забуте підтвердження – поширена помилка: повідомлення «зависають» у стані *Unacked*, а коли споживач завершується, повертаються й обробляються знову. Підтвердження надсилають тим самим каналом, яким отримано доставку: тег має сенс лише в межах каналу.
:::

### Попередня вибірка (prefetch)

Без обмежень брокер розсилає повідомлення споживачам **по черзі** (*round-robin*) одразу, не зважаючи на те, скільки кожен уже обробляє. **Попередня вибірка** (*prefetch*) обмежує кількість невідтверджених доставок на споживача (<https://www.rabbitmq.com/docs/consumer-prefetch>):

```cs
await channel.BasicQosAsync(prefetchSize: 0, prefetchCount: 1,
    global: false);
```

Параметр `global: true` (обмеження на весь канал) у RabbitMQ 4.3 заборонено, використовують лише обмеження на споживача. Вплив prefetch на розподіл автор перевірив прикладом «Черга обробки замовлень» (кінець лекції): два робітники, 12 замовлень з 1–4 позиціями, обробка 250 мс на позицію. Без обмеження (prefetch 0) кожен отримав 6 замовлень, але робітник A – 18 позицій (4,5 с роботи), а B – 12 (3 с) і простоював. З prefetch 1 обидва отримали по 15 позицій: нове замовлення дістається тому, хто звільнився.

Малий prefetch вирівнює навантаження, але обмежує пропускну здатність: після кожного підтвердження споживач чекає наступну доставку мережею. Вимірювання на i9-11900KF (брокер у Docker Desktop на тому самому ПК, 20 000 стійких повідомлень по 256 байтів, один споживач, підтвердження кожного повідомлення, медіана 5 запусків після прогріву) наведено в табл. 15.3.

Таблиця 15.3. Швидкість споживання залежно від prefetch (i9-11900KF, Docker Desktop) {.caption}

| **Режим споживача** | **Класична черга, пов./с** | **Кворумна черга, пов./с** |
| --- | --- | --- |
| `autoAck: true` | 90 786 | 111 221 |
| ручні ack, prefetch 1 | 2 354 | 184 |
| ручні ack, prefetch 10 | 16 227 | 643 |
| ручні ack, prefetch 100 | 37 703 | 6 336 |
| ручні ack, prefetch 1000 | 50 900 | 65 508 |

З prefetch 1 кожне повідомлення коштує повний «кругообіг» через мережу, а для кворумної черги – ще й запис підтвердження в журнал Raft на диск: лише 184 повідомлення за секунду. Документація RabbitMQ зазначає, що найкращу пропускну здатність зазвичай дають значення 100–300. Для довгих завдань (секунди) важливіший рівномірний розподіл, і prefetch 1–2 доречний; для коротких повідомлень prefetch збільшують. Стан черги й споживачів видно у вебконсолі (рис. 15.5): *Ready* – очікують, *Unacked* – доставлені, але не підтверджені.

::: info Знімок екрана
Management UI → Queues and Streams → `orders` while three `Orders work A|B|C 1` workers run and `Orders publish 30` was just started: Overview with Ready / Unacked / Total, Consumers section listing 3 consumers with Prefetch count 1 and Ack required ●
:::

Рис. 15.5. Черга `orders` з трьома споживачами {.caption}
