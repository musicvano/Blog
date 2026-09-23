---
title: "Приклади та типові помилки"
description: "Тема 14. Сокети, RPC і gRPC: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

Усі програми перевірено з .NET SDK 10.0.401 у конфігурації Release на Windows 11; сервер і клієнт працюють на тому самому комп’ютері (`localhost`). Кожен приклад – окремий консольний проєкт (`dotnet new console`), приклад gRPC – рішення з двох проєктів.

### Відлуння TCP

Асинхронний сервер `TcpListener` обслуговує багатьох клієнтів одночасно: кожне з’єднання обробляє окрема задача, повідомлення розділяються символом нового рядка. Без аргументів програма запускає сервер і двох клієнтів в одному процесі, з аргументом `server` – лише сервер (його перевіряють командами розділу «Діагностичні утиліти», рис. 14.1).

```cs
using System.Net;
using System.Net.Sockets;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;
const int Port = 5000;

if (args is ["server"])          // лише сервер, до закриття вікна
{
    await RunServerAsync(CancellationToken.None);
    return;
}

// Демонстрація: сервер і два клієнти в одному процесі.
using CancellationTokenSource stop = new();
Task server = RunServerAsync(stop.Token);
await Task.WhenAll(
    RunClientAsync("Олена", 0, ["привіт", "як справи?"]),
    RunClientAsync("Богдан", 30, ["сокети"]));
await stop.CancelAsync();
await server;

static async Task RunServerAsync(CancellationToken token)
{
    TcpListener listener = new(IPAddress.Loopback, Port);
    listener.Start();                        // Bind + Listen
    Log($"сервер слухає {listener.LocalEndpoint}");
    List<Task> sessions = [];
    try
    {
        while (true)
        {
            TcpClient client =
                await listener.AcceptTcpClientAsync(token);
            sessions.Add(ServeAsync(client, token));   // не чекаємо
        }
    }
    catch (OperationCanceledException) { }
    finally
    {
        listener.Stop();
        await Task.WhenAll(sessions);
        Log($"сервер зупинено, клієнтів: {sessions.Count}");
    }
}

static async Task ServeAsync(TcpClient client,
    CancellationToken token)
{
    using (client)
    {
        EndPoint who = client.Client.RemoteEndPoint!;
        Log($"  підключено {who}");
        NetworkStream stream = client.GetStream();
        using StreamReader reader = new(stream, Encoding.UTF8);
        StreamWriter writer = new(stream, new UTF8Encoding(false));
        writer.AutoFlush = true;
        try
        {
            string? line;
            while ((line = await reader.ReadLineAsync(token)) != null)
            {
                Log($"  {who} → {line}");
                await writer.WriteLineAsync($"ECHO {line.ToUpper()}");
            }
            Log($"  {who} закрив з’єднання");
        }
        catch (Exception ex) when (ex is IOException
            or OperationCanceledException)
        {
            Log($"  {who} обірвано: {ex.GetType().Name}");
        }
    }
}

static async Task RunClientAsync(string name, int delay,
    string[] lines)
{
    await Task.Delay(delay);
    using TcpClient client = new();
    await client.ConnectAsync(IPAddress.Loopback, Port);
    NetworkStream stream = client.GetStream();
    using StreamReader reader = new(stream, Encoding.UTF8);
    StreamWriter writer = new(stream, new UTF8Encoding(false));
    writer.AutoFlush = true;
    foreach (string line in lines)
    {
        await writer.WriteLineAsync($"{name}: {line}");
        string? reply = await reader.ReadLineAsync();
        Log($"{name} отримує «{reply}»");
        await Task.Delay(100);
    }
}                                // Dispose закриває з’єднання

static void Log(string text) => Console.WriteLine(text);
```

Цикл прийому не чекає на `ServeAsync`, тому обидва клієнти обслуговуються одночасно, а їхні повідомлення чергуються. `UTF8Encoding(false)` вимикає маркер порядку байтів (BOM), `AutoFlush` одразу відправляє рядок, а коли клієнт виходить з `using`, `ReadLineAsync` на сервері повертає `null`. Результат (порти ОС призначає довільно, порядок рядків може відрізнятися):

```
сервер слухає 127.0.0.1:5000
  підключено 127.0.0.1:50176
  127.0.0.1:50176 → Олена: привіт
Олена отримує «ECHO ОЛЕНА: ПРИВІТ»
  підключено 127.0.0.1:50177
  127.0.0.1:50177 → Богдан: сокети
Богдан отримує «ECHO БОГДАН: СОКЕТИ»
  127.0.0.1:50176 → Олена: як справи?
Олена отримує «ECHO ОЛЕНА: ЯК СПРАВИ?»
  127.0.0.1:50177 закрив з’єднання
  127.0.0.1:50176 закрив з’єднання
сервер зупинено, клієнтів: 2
```

### Протокол з кадрами

Кадрування з префіксом довжини перевірено окремою програмою «калькулятор»: клієнт надсилає запити JSON у кадрах, а потім передає один кадр трьома шматками (3, 10 і 24 байти) з паузами. Сервер збирає кадр за полем довжини й відповідає лише після останнього шматка:

```
кадр 3: 00000021 + {"id":3,"op":"mul","a":1.5,"b":8}
клієнт: надіслано 3 байтів
клієнт: надіслано 10 байтів
клієнт: надіслано 24 байтів
сервер: запит 3 (mul)
клієнт: Response { Id = 3, Result = 12, Error =  }
```

Повний код такого протоколу (заголовок, `ReadExactlyAsync`, перевірка довжини) наведено в лабораторній роботі 14, приклад 1. Байти протоколу можна побачити у Wireshark: *Analyze → Follow → TCP Stream* показує чотирибайтові заголовки і JSON (рис. 14.10).

![Потік TCP протоколу з кадрами у Wireshark](./images/04-wireshark-tcp-stream.png)

Рис. 14.10. Потік TCP протоколу з кадрами у Wireshark {.caption}

### gRPC-сервіс замовлень

Рішення `Orders` містить проєкти `Orders.Server` (`dotnet new web`) і `Orders.Client` (`dotnet new console`); пакети й елементи `Protobuf` наведено в розділі «Пакети та генерація коду», файл `Protos/orders.proto` – у розділі «Файл `.proto`».

Сервер (`Program.cs`):

```cs
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Orders.Server;

Console.OutputEncoding = System.Text.Encoding.UTF8;
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// HTTP/2 без TLS лише для локальної розробки.
builder.WebHost.ConfigureKestrel(kestrel =>
    kestrel.ListenLocalhost(5001,
        listen => listen.Protocols = HttpProtocols.Http2));

builder.Services.AddGrpc();
builder.Services.AddGrpcReflection();

WebApplication app = builder.Build();
app.MapGrpcService<OrderApi>();
app.MapGrpcReflectionService();      // для grpcurl і Rider
Console.WriteLine("gRPC-сервер: http://localhost:5001");
app.Run();
```

Реалізація сервісу (`OrderApi.cs`):

```cs
using Grpc.Core;
using Orders;

namespace Orders.Server;

public class OrderApi : OrderService.OrderServiceBase
{
    static readonly Order[] Orders =
    [
        Create(1, "ТОВ «Сигма»", OrderStatus.Paid,
            ("Папір А4", 10, 245)),
        Create(2, "Іван Коваль", OrderStatus.New,
            ("Флешка 64 ГБ", 2, 320), ("Миша", 1, 450)),
        Create(3, "ФОП Мельник", OrderStatus.Shipped,
            ("Кабель", 3, 60)),
        Create(4, "Школа № 5", OrderStatus.Paid,
            ("Проєктор", 1, 18900)),
    ];

    public override Task<Order> GetOrder(OrderRequest request,
        ServerCallContext context)
    {
        Order? order = Orders.FirstOrDefault(o => o.Id == request.Id);
        if (order is null)
        {
            throw new RpcException(new Status(StatusCode.NotFound,
                $"замовлення {request.Id} не знайдено"));
        }
        return Task.FromResult(order);
    }

    public override async Task ListOrders(ListRequest request,
        IServerStreamWriter<Order> responseStream,
        ServerCallContext context)
    {
        string client = context.RequestHeaders
            .GetValue("client-name") ?? "невідомий";
        int sent = 0;
        try
        {
            foreach (Order order in Orders)
            {
                // Повільне сховище; токен спрацьовує після дедлайну
                // або відключення клієнта.
                await Task.Delay(400, context.CancellationToken);
                if (Total(order) >= request.MinTotal)
                {
                    await responseStream.WriteAsync(order);
                    sent++;
                }
            }
            Console.WriteLine($"  [сервер] {client}: усього {sent}");
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine(
                $"  [сервер] {client}: скасовано після {sent}");
            throw;
        }
    }

    static double Total(Order order) =>
        order.Lines.Sum(line => line.Quantity * line.Price);

    static Order Create(int id, string customer, OrderStatus status,
        params (string Product, int Quantity, double Price)[] lines)
    {
        Order order = new() { Id = id, Customer = customer,
            Status = status };
        foreach (var (product, quantity, price) in lines)
        {
            order.Lines.Add(new OrderLine
            {
                Product = product, Quantity = quantity, Price = price,
            });
        }
        return order;
    }
}
```

Клієнт (`Orders.Client/Program.cs`):

```cs
using Grpc.Core;
using Grpc.Net.Client;
using Orders;

Console.OutputEncoding = System.Text.Encoding.UTF8;
using GrpcChannel channel = GrpcChannel.ForAddress(
    "http://localhost:5001");
OrderService.OrderServiceClient client = new(channel);
Metadata headers = new() { { "client-name", "lecture-demo" } };

// 1. Унарні виклики: успіх і помилка з кодом статусу.
foreach (int id in new[] { 2, 42 })
{
    try
    {
        Print(await client.GetOrderAsync(new() { Id = id }, headers));
    }
    catch (RpcException ex)
    {
        Fail(ex);
    }
}

// 2. Серверний потік без дедлайну і з дедлайном 1 с.
await ListAsync("Від 1000 грн:", new() { MinTotal = 1000 }, null);
DateTime deadline = DateTime.UtcNow.AddSeconds(1);
await ListAsync("Усі, дедлайн 1 с:", new(), deadline);

async Task ListAsync(string title, ListRequest req, DateTime? until)
{
    Console.WriteLine(title);
    try
    {
        using var call = client.ListOrders(req, headers, until);
        await foreach (var item in call.ResponseStream.ReadAllAsync())
        {
            Print(item);
        }
    }
    catch (RpcException ex)
    {
        Fail(ex);
    }
}

static void Print(Order o)
{
    double total = o.Lines.Sum(line => line.Quantity * line.Price);
    Console.WriteLine($"  №{o.Id} {o.Customer,-14} " +
        $"{o.Lines.Count} поз. {total,9:N2} грн  {o.Status}");
}

static void Fail(RpcException ex) =>
    Console.WriteLine($"помилка {ex.StatusCode} {ex.Status.Detail}");
```

Згенеровані імена відповідають правилам C#: поле `min_total` стало властивістю `MinTotal`, а значення `ORDER_STATUS_PAID` – `OrderStatus.Paid`. `repeated`-поле `Lines` доступне лише для читання, тому позиції додають методом `Add`. Сервер запускають першим (`dotnet run -c Release` у теці `Orders.Server`), потім клієнт в іншому вікні. Метадані `client-name` сервер читає з `RequestHeaders`. Серверний потік повертає замовлення від 1000 грн по одному кожні 400 мс. З дедлайном 1 с клієнт встигає отримати два замовлення й отримує `DeadlineExceeded` (без опису), а на сервері `Task.Delay` скасовується токеном. Результат клієнта:

```
  №2 Іван Коваль    2 поз.  1 090,00 грн  New
помилка NotFound замовлення 42 не знайдено
Від 1000 грн:
  №1 ТОВ «Сигма»    1 поз.  2 450,00 грн  Paid
  №2 Іван Коваль    2 поз.  1 090,00 грн  New
  №4 Школа № 5      1 поз. 18 900,00 грн  Paid
Усі, дедлайн 1 с:
  №1 ТОВ «Сигма»    1 поз.  2 450,00 грн  Paid
  №2 Іван Коваль    2 поз.  1 090,00 грн  New
помилка DeadlineExceeded 
```

Вивід сервера:

```
gRPC-сервер: http://localhost:5001
  [сервер] lecture-demo: усього 3
  [сервер] lecture-demo: скасовано після 2
```

## Типові помилки

Таблиця 14.4. Типові помилки мережевого програмування {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| повідомлення «склеюються» або приходять частинами | TCP не зберігає межі повідомлень; використовувати кадрування (роздільник або префікс довжини) і читати до заповнення буфера |
| сервер обслуговує лише одного клієнта | цикл прийому чекає на обробку клієнта; запускати `ServeAsync` окремою задачею без `await` |
| клієнт «зависає» назавжди | немає таймауту чи дедлайну; передавати токен з `CancelAfter` у мережеві операції, у gRPC задавати `deadline` |
| `SocketException`: `AddressAlreadyInUse` або `AccessDenied` під час `Bind` | порт зайнятий іншим процесом (зокрема попереднім запуском сервера); знайти процес `Get-NetTCPConnection` / `ss -tlnp`, змінити порт |
| gRPC-клієнт отримує помилку протоколу HTTP | Kestrel без TLS не ввімкнув HTTP/2; задати `HttpProtocols.Http2` або використовувати `https://` |
| після зміни `.proto` клієнт отримує неправильні значення | змінено номери полів; номери не змінюють, нові поля додають з новими номерами |
| сервер продовжує роботу після дедлайну клієнта | не передано `context.CancellationToken` в асинхронні операції сервісу |
