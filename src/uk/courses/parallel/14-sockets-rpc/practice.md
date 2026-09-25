---
title: "Практика"
description: "Тема 14. Сокети, RPC і gRPC: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Передавання файлу через TCP з контрольною сумою

Створити програму, яка передає файл від клієнта до сервера через TCP. Протокол: заголовок (довжина імені 2 байти, ім’я в UTF-8, розмір файла 8 байтів), вміст файла блоками, хеш SHA-256 (32 байти); сервер відповідає одним байтом: 1 – хеш збігся, 0 – ні. Клієнт виводить прогрес через кожні 25 % і швидкість передавання, сервер зберігає файл лише за правильного хешу. Розмір тестового файла в мегабайтах – аргумент командного рядка (типово 64). Перевірити передавання без помилок і з пошкодженим байтом.

```cs
using System.Buffers.Binary;
using System.Diagnostics;
using System.Net;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;
const int Port = 5002;

int sizeMb = args.Length > 0 ? int.Parse(args[0]) : 64;
string folder = Path.Combine(Path.GetTempPath(), "tcp-files");
string source = Path.Combine(folder, "data.bin");
string inbox = Path.Combine(folder, "inbox");
Directory.CreateDirectory(inbox);
CreateFile(source, sizeMb);

TcpListener listener = new(IPAddress.Loopback, Port);
listener.Start();
Task server = ReceiveFilesAsync(listener, inbox, count: 2);

await SendFileAsync(source, corrupt: false);
await SendFileAsync(source, corrupt: true);   // один байт зіпсовано
await server;
listener.Stop();

// Клієнт: заголовок, вміст файла блоками, хеш SHA-256.
static async Task SendFileAsync(string path, bool corrupt)
{
    using TcpClient client = new();
    await client.ConnectAsync(IPAddress.Loopback, Port);
    NetworkStream net = client.GetStream();
    await using FileStream file = File.OpenRead(path);
    long size = file.Length;

    byte[] name = Encoding.UTF8.GetBytes(Path.GetFileName(path));
    byte[] header = new byte[2 + name.Length + 8];
    BinaryPrimitives.WriteUInt16BigEndian(header,
        (ushort)name.Length);
    name.CopyTo(header, 2);
    BinaryPrimitives.WriteInt64BigEndian(
        header.AsSpan(2 + name.Length), size);
    await net.WriteAsync(header);

    using IncrementalHash sha = IncrementalHash.CreateHash(
        HashAlgorithmName.SHA256);
    byte[] buffer = new byte[81_920];
    long sent = 0;
    int nextPercent = 25;
    Stopwatch clock = Stopwatch.StartNew();
    int n;
    while ((n = await file.ReadAsync(buffer)) > 0)
    {
        sha.AppendData(buffer, 0, n);       // хеш правильних даних
        if (corrupt && sent == 0) buffer[100] ^= 0xFF;
        await net.WriteAsync(buffer.AsMemory(0, n));
        sent += n;
        if (sent * 100 / size >= nextPercent)
        {
            Console.WriteLine($"  надіслано {sent * 100 / size,3} %");
            nextPercent += 25;
        }
    }
    await net.WriteAsync(sha.GetHashAndReset());

    byte[] answer = new byte[1];
    await net.ReadExactlyAsync(answer);         // 1 – хеш збігся
    double seconds = clock.Elapsed.TotalSeconds;
    double mb = size / 1048576.0;
    Console.WriteLine($"Клієнт: {mb:F0} МБ за {seconds:F2} с " +
        $"({mb / seconds:F0} МБ/с), сервер: " +
        (answer[0] == 1 ? "OK" : "ХЕШ НЕ ЗБІГАЄТЬСЯ"));
}

// Сервер: приймає count файлів по черзі.
static async Task ReceiveFilesAsync(TcpListener listener,
    string inbox, int count)
{
    for (int i = 0; i < count; i++)
    {
        using TcpClient client =
            await listener.AcceptTcpClientAsync();
        NetworkStream net = client.GetStream();

        byte[] word = new byte[2];
        await net.ReadExactlyAsync(word);
        int nameLength = BinaryPrimitives.ReadUInt16BigEndian(word);
        byte[] name = new byte[nameLength];
        await net.ReadExactlyAsync(name);
        byte[] sizeBytes = new byte[8];
        await net.ReadExactlyAsync(sizeBytes);
        long size = BinaryPrimitives.ReadInt64BigEndian(sizeBytes);
        // Лише ім’я файла: захист від шляхів на кшталт ..\..\x.
        string fileName =
            Path.GetFileName(Encoding.UTF8.GetString(name));
        string target = Path.Combine(inbox, $"{i + 1}-{fileName}");

        using IncrementalHash sha = IncrementalHash.CreateHash(
            HashAlgorithmName.SHA256);
        byte[] buffer = new byte[81_920];
        await using (FileStream file = File.Create(target))
        {
            long left = size;
            while (left > 0)
            {
                int want = (int)Math.Min(buffer.Length, left);
                int n = await net.ReadAsync(buffer.AsMemory(0, want));
                if (n == 0) throw new EndOfStreamException("обрив");
                sha.AppendData(buffer, 0, n);
                await file.WriteAsync(buffer.AsMemory(0, n));
                left -= n;
            }
        }
        byte[] expected = new byte[32];
        await net.ReadExactlyAsync(expected);
        bool ok = sha.GetHashAndReset().AsSpan()
            .SequenceEqual(expected);
        if (!ok) File.Delete(target);          // пошкоджений файл
        Console.WriteLine($"Сервер: {fileName}, {size:N0} байтів, " +
            (ok ? $"збережено як {Path.GetFileName(target)}"
                : "хеш не збігся, файл вилучено"));
        await net.WriteAsync(new[] { ok ? (byte)1 : (byte)0 });
    }
}

static void CreateFile(string path, int sizeMb)
{
    if (File.Exists(path)
        && new FileInfo(path).Length == (long)sizeMb << 20)
    {
        return;
    }

    byte[] block = new byte[1 << 20];
    Random random = new(13);
    using FileStream file = File.Create(path);
    for (int i = 0; i < sizeMb; i++)
    {
        random.NextBytes(block);
        file.Write(block);
    }
}
```

Обидві сторони обчислюють хеш **потоково** (`IncrementalHash`), тому файл будь-якого розміру не завантажується в пам’ять повністю. Числові поля заголовка записано в порядку big-endian (`BinaryPrimitives`), а службові частини протоколу читає `ReadExactlyAsync`. Вміст файла сервер читає рівно `size` байтів: без цього обмеження він прочитав би й хеш як частину файла. Ім’я з мережі проходить через `Path.GetFileName`, щоб клієнт не міг записати файл за межі теки `inbox`. У другому сеансі клієнт псує байт уже **після** обчислення хешу, імітуючи пошкодження в дорозі, і сервер вилучає файл. Результат (швидкість залежить від комп’ютера й від кешу диска):

```
  надіслано  25 %
  надіслано  50 %
  надіслано  75 %
  надіслано 100 %
Сервер: data.bin, 67 108 864 байтів, збережено як 1-data.bin
Клієнт: 64 МБ за 0,11 с (588 МБ/с), сервер: OK
  надіслано  25 %
  надіслано  50 %
  надіслано  75 %
  надіслано 100 %
Сервер: data.bin, 67 108 864 байтів, хеш не збігся, файл вилучено
Клієнт: 64 МБ за 0,09 с (699 МБ/с), сервер: ХЕШ НЕ ЗБІГАЄТЬСЯ
```

## Приклад 2. Сервіс CoreWCF і клієнт на `System.ServiceModel.Http`

Створити SOAP-сервіс складу на CoreWCF з кінцевою точкою `BasicHttpBinding` за адресою `http://localhost:5003/WarehouseService.svc` і операціями «перелік товарів» та «резервування товару». Резервування понад залишок повертає помилку SOAP. Консольний клієнт через `ChannelFactory` виводить товари, надсилає шість одночасних замовлень по 2 монітори (на складі 4) і замовлення неіснуючого товару, а потім знову виводить залишки.

Проєкт `Warehouse.Server` створено шаблоном `dotnet new web` з пакетами `CoreWCF.Primitives` і `CoreWCF.Http` (1.9.1). Контракти (`Contracts.cs`): клас `Product` (властивості `Id`, `Name`, `Stock`, `Price`) з атрибутами `[DataContract(Namespace = "urn:pro13:warehouse")]` і `[DataMember]` на кожній властивості та інтерфейс сервісу:

```cs
[ServiceContract(Namespace = "urn:pro13:warehouse")]
public interface IWarehouseService
{
    [OperationContract]
    Product[] GetProducts();

    [OperationContract]
    int Reserve(int productId, int quantity);   // повертає залишок
}
```

Реалізація сервісу (`WarehouseService.cs`):

```cs
using CoreWCF;

namespace Warehouse;

public class WarehouseService : IWarehouseService
{
    static readonly Lock Gate = new();
    static readonly List<Product> Products =
    [
        new() { Id = 1, Name = "Ноутбук", Stock = 10, Price = 32500 },
        new() { Id = 2, Name = "Монітор", Stock = 4, Price = 8900 },
    ];

    public Product[] GetProducts()
    {
        lock (Gate)
        {
            return Products.Select(p => new Product { Id = p.Id,
                Name = p.Name, Stock = p.Stock, Price = p.Price })
                .ToArray();
        }
    }

    public int Reserve(int productId, int quantity)
    {
        Thread.Sleep(100);                 // «робота» з базою даних
        lock (Gate)                        // виклики паралельні
        {
            Product product = Products.Find(p => p.Id == productId)
                ?? throw new FaultException(
                    $"товар {productId} не існує");
            if (quantity <= 0 || quantity > product.Stock)
            {
                throw new FaultException(
                    $"{product.Name}: запит {quantity}, " +
                    $"на складі {product.Stock}");
            }
            product.Stock -= quantity;
            Console.WriteLine($"  [сервер] {product.Name} " +
                $"−{quantity}, залишок {product.Stock}");
            return product.Stock;
        }
    }
}
```

Налаштування кінцевої точки (`Program.cs`):

```cs
using CoreWCF;
using CoreWCF.Configuration;
using CoreWCF.Description;
using Warehouse;

Console.OutputEncoding = System.Text.Encoding.UTF8;
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.WebHost.ConfigureKestrel(k => k.ListenLocalhost(5003));
builder.Services.AddServiceModelServices();
builder.Services.AddServiceModelMetadata();      // WSDL для svcutil

WebApplication app = builder.Build();
app.UseServiceModel(model =>
{
    model.AddService<WarehouseService>();
    // ABC: адреса, прив’язка, контракт.
    model.AddServiceEndpoint<WarehouseService, IWarehouseService>(
        new BasicHttpBinding(), "/WarehouseService.svc");
    app.Services.GetRequiredService<ServiceMetadataBehavior>()
        .HttpGetEnabled = true;
});
Console.WriteLine(
    "CoreWCF: http://localhost:5003/WarehouseService.svc");
app.Run();
```

Клієнт `Warehouse.Client` – консольний проєкт з пакетом `System.ServiceModel.Http` (10.0.652802). Файл `Contracts.cs` клієнта – копія серверного з простором імен `System.ServiceModel` замість `CoreWCF` (атрибути й простори імен XML мають збігатися). Проксі також можна згенерувати з WSDL (`http://localhost:5003/WarehouseService.svc?wsdl`) утилітою `dotnet-svcutil`. `Program.cs` клієнта:

```cs
using System.ServiceModel;
using Warehouse;

Console.OutputEncoding = System.Text.Encoding.UTF8;

using ChannelFactory<IWarehouseService> factory = new(
    new BasicHttpBinding(),                         // B – прив’язка
    new EndpointAddress(                            // A – адреса
        "http://localhost:5003/WarehouseService.svc"));
// Проксі – клієнтський стаб, що реалізує інтерфейс контракту.
IWarehouseService proxy = factory.CreateChannel();

Print(proxy.GetProducts());

// Шість одночасних замовлень по 2 монітори (на складі 4)
// і одне замовлення неіснуючого товару.
Task[] orders = Enumerable.Range(1, 7).Select(n => Task.Run(() =>
{
    IWarehouseService channel = factory.CreateChannel();
    try
    {
        int left = channel.Reserve(n < 7 ? 2 : 9, quantity: 2);
        Console.WriteLine($"замовлення {n}: OK, залишок {left}");
    }
    catch (FaultException ex)
    {
        Console.WriteLine($"замовлення {n}: відмова – {ex.Message}");
    }
    finally
    {
        ((IClientChannel)channel).Close();
    }
})).ToArray();
await Task.WhenAll(orders);
Print(proxy.GetProducts());
((IClientChannel)proxy).Close();

static void Print(Product[] products)
{
    foreach (Product p in products)
    {
        Console.WriteLine($"  {p.Id}. {p.Name,-8} {p.Stock,3} шт. " +
            $"{p.Price,10:N2} грн");
    }
}
```

::: tip Порада
Під час відновлення пакетів для клієнта NuGet попереджає (NU1903) про вразливість транзитивного пакета `System.Security.Cryptography.Xml` 10.0.0. Попередження усувається явним посиланням на виправлену версію: `dotnet add package System.Security.Cryptography.Xml --version 10.0.12`.
:::

`ChannelFactory<T>` створює проксі, який реалізує інтерфейс контракту: кожен виклик методу перетворюється на SOAP-повідомлення. Кожна задача створює власний канал, а сервер обробляє виклики паралельно, тому залишок змінюється лише в блокуванні `lock` (тема 3): рівно два замовлення отримують товар, а решта – `FaultException` з поясненням. Порядок рядків замовлень залежить від планування задач. Результат клієнта:

```
  1. Ноутбук   10 шт.  32 500,00 грн
  2. Монітор    4 шт.   8 900,00 грн
замовлення 3: OK, залишок 2
замовлення 4: OK, залишок 0
замовлення 1: відмова – Монітор: запит 2, на складі 0
замовлення 2: відмова – Монітор: запит 2, на складі 0
замовлення 6: відмова – Монітор: запит 2, на складі 0
замовлення 5: відмова – Монітор: запит 2, на складі 0
замовлення 7: відмова – товар 9 не існує
  1. Ноутбук   10 шт.  32 500,00 грн
  2. Монітор    0 шт.   8 900,00 грн
```

Вивід сервера:

```
CoreWCF: http://localhost:5003/WarehouseService.svc
  [сервер] Монітор −2, залишок 2
  [сервер] Монітор −2, залишок 0
```

## Приклад 3. Двонаправлений потік gRPC для чату

Створити gRPC-сервіс чату з методом `rpc Join (stream ChatMessage) returns (stream ChatMessage)`: перше повідомлення клієнта містить ім’я, наступні – текст, який сервер розсилає всім іншим учасникам разом із повідомленнями «приєднується» та «виходить»; повторне ім’я відхиляється кодом `AlreadyExists`. Клієнт запускає трьох учасників за сценарієм з паузами.

Контракт `Protos/chat.proto` (проєкти й пакети – як у прикладі «gRPC-сервіс замовлень» лекції, сервер на порту 5004):

```proto
syntax = "proto3";

option csharp_namespace = "ChatDemo";

package chat;

// Двонаправлений потік: перше повідомлення клієнта – знайомство.
service Chat {
  rpc Join (stream ChatMessage) returns (stream ChatMessage);
}

message ChatMessage {
  string user = 1;
  string text = 2;
}
```

Кімната чату `ChatRoom` (одинак, зареєстрований `builder.Services.AddSingleton<ChatRoom>()`) зберігає учасників у `ConcurrentDictionary<string, Channel<ChatMessage>>`: метод `Add` створює для учасника обмежений канал на 100 повідомлень з режимом `BoundedChannelFullMode.DropOldest` і повертає `null`, якщо ім’я зайняте; `Remove` вилучає учасника й завершує його канал; `Broadcast` розкладає повідомлення в канали всіх учасників, крім автора, методом `TryWrite`, який не блокує відправника. Сервіс (`ChatService.cs`):

```cs
using Grpc.Core;

namespace ChatDemo;

public class ChatService(ChatRoom room) : Chat.ChatBase
{
    public override async Task Join(
        IAsyncStreamReader<ChatMessage> requestStream,
        IServerStreamWriter<ChatMessage> responseStream,
        ServerCallContext context)
    {
        CancellationToken token = context.CancellationToken;
        if (!await requestStream.MoveNext(token)) return;
        string user = requestStream.Current.User.Trim();
        var outbox = room.Add(user) ?? throw new RpcException(
            new Status(StatusCode.AlreadyExists,
                $"ім’я {user} зайняте"));
        room.Broadcast(new() { User = user, Text = "приєднується" });

        // Єдиний записувач у responseStream: WriteAsync не можна
        // викликати одночасно з кількох потоків.
        Task sending = Task.Run(async () =>
        {
            await foreach (var m in outbox.Reader.ReadAllAsync())
            {
                await responseStream.WriteAsync(m, token);
            }
        }, token);

        try
        {
            await foreach (ChatMessage m in
                requestStream.ReadAllAsync(token))
            {
                room.Broadcast(new() { User = user, Text = m.Text });
            }
        }
        finally
        {
            room.Remove(user);                 // завершує outbox
            room.Broadcast(new() { User = user, Text = "виходить" });
            // Дочекатися відправника, ігноруючи його скасування.
            await sending.ContinueWith(_ => { },
                TaskScheduler.Default);
            Console.WriteLine($"  [сервер] {user} відключився");
        }
    }
}
```

Клієнт (`Chat.Client/Program.cs`):

```cs
using Grpc.Core;
using Grpc.Net.Client;
using ChatDemo;

Console.OutputEncoding = System.Text.Encoding.UTF8;
using GrpcChannel channel = GrpcChannel.ForAddress(
    "http://localhost:5004");
Chat.ChatClient client = new(channel);

// Демонстрація: три учасники; сценарій – (пауза, мс; текст).
await Task.WhenAll(
    ChatAsync(client, "Олена", 0,
        Script((300, "Привіт!"), (900, ""))),
    ChatAsync(client, "Богдан", 100,
        Script((400, "Привіт, Олено!"), (1000, ""))),
    ChatAsync(client, "Ірина", 700,
        Script((200, "Я теж тут"), (900, ""))));

static async Task ChatAsync(Chat.ChatClient client, string name,
    int joinAfter, IAsyncEnumerable<string> lines)
{
    await Task.Delay(joinAfter);
    using AsyncDuplexStreamingCall<ChatMessage, ChatMessage> call =
        client.Join();
    await call.RequestStream.WriteAsync(new() { User = name });

    Task reading = Task.Run(async () =>
    {
        await foreach (ChatMessage m in
            call.ResponseStream.ReadAllAsync())
        {
            Console.WriteLine($"{name,-6} ← {m.User}: {m.Text}");
        }
    });

    await foreach (string text in lines)
    {
        await call.RequestStream.WriteAsync(new() { Text = text });
    }
    await call.RequestStream.CompleteAsync();
    await reading;                             // сервер закрив потік
}

// Сценарій: пауза перед кожним рядком; порожній текст – вихід.
static async IAsyncEnumerable<string> Script(
    params (int Pause, string Text)[] steps)
{
    foreach ((int pause, string text) in steps)
    {
        await Task.Delay(pause);
        if (text.Length == 0) yield break;
        yield return text;
    }
}
```

Метод `IServerStreamWriter<T>.WriteAsync` не можна викликати одночасно з кількох потоків, а повідомлення для учасника надходять від різних викликів `Join`. Тому кожен учасник має власний обмежений канал `Channel<ChatMessage>` (тема 4) і одну задачу `sending`, яка єдина пише у відповідь. Режим `DropOldest` не дає повільному клієнту блокувати розсилку. Коли клієнт викликає `CompleteAsync`, цикл читання на сервері завершується, блок `finally` вилучає учасника й завершує його канал, після чого сервер закриває потік відповіді, і `reading` у клієнта теж завершується. Порядок повідомлень визначають паузи сценарію. Результат клієнта:

```
Олена  ← Богдан: приєднується
Богдан ← Олена: Привіт!
Олена  ← Богдан: Привіт, Олено!
Богдан ← Ірина: приєднується
Олена  ← Ірина: приєднується
Богдан ← Ірина: Я теж тут
Олена  ← Ірина: Я теж тут
Богдан ← Олена: виходить
Ірина  ← Олена: виходить
Ірина  ← Богдан: виходить
```

Вивід сервера:

```
Чат gRPC: http://localhost:5004
  [сервер] Олена відключився
  [сервер] Богдан відключився
  [сервер] Ірина відключився
```
