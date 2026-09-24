---
title: "Practice"
description: "Topic 14. Sockets, RPC, and gRPC: worked examples"
outline: [2, 3]
sourceHash: "bb6ddb1dca205720da1e4f9ec74358274e3c072f8d4215daf7784c628167a864"
---

# Practice

## Example 1. Transferring a file over TCP with a checksum

Create a program that transfers a file from a client to a server over TCP. The protocol: a header (a 2-byte name length, the name in UTF-8, an 8-byte file size), the file contents in blocks, and a SHA-256 hash (32 bytes); the server replies with a single byte: 1 if the hash matches, 0 if not. The client prints progress every 25 % and the transfer speed, and the server saves the file only if the hash is correct. The size of the test file in megabytes is a command-line argument (64 by default). Test a transfer without errors and with a corrupted byte.

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
await SendFileAsync(source, corrupt: true);   // one byte corrupted
await server;
listener.Stop();

// Client: header, file contents in blocks, SHA-256 hash.
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
        sha.AppendData(buffer, 0, n);       // hash of the correct data
        if (corrupt && sent == 0) buffer[100] ^= 0xFF;
        await net.WriteAsync(buffer.AsMemory(0, n));
        sent += n;
        if (sent * 100 / size >= nextPercent)
        {
            Console.WriteLine($"  sent {sent * 100 / size,3} %");
            nextPercent += 25;
        }
    }
    await net.WriteAsync(sha.GetHashAndReset());

    byte[] answer = new byte[1];
    await net.ReadExactlyAsync(answer);         // 1 – the hash matched
    double seconds = clock.Elapsed.TotalSeconds;
    double mb = size / 1048576.0;
    Console.WriteLine($"Client: {mb:F0} MB in {seconds:F2} s " +
        $"({mb / seconds:F0} MB/s), server: " +
        (answer[0] == 1 ? "OK" : "HASH MISMATCH"));
}

// Server: receives count files one after another.
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
        // File name only: protection against paths like ..\..\x.
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
                if (n == 0) throw new EndOfStreamException("connection lost");
                sha.AppendData(buffer, 0, n);
                await file.WriteAsync(buffer.AsMemory(0, n));
                left -= n;
            }
        }
        byte[] expected = new byte[32];
        await net.ReadExactlyAsync(expected);
        bool ok = sha.GetHashAndReset().AsSpan()
            .SequenceEqual(expected);
        if (!ok) File.Delete(target);          // corrupted file
        Console.WriteLine($"Server: {fileName}, {size:N0} bytes, " +
            (ok ? $"saved as {Path.GetFileName(target)}"
                : "hash mismatch, file deleted"));
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

Both sides compute the hash **incrementally** (`IncrementalHash`), so a file of any size is never loaded into memory entirely. The numeric header fields are written in big-endian order (`BinaryPrimitives`), and the service parts of the protocol are read with `ReadExactlyAsync`. The server reads exactly `size` bytes of file contents: without this limit, it would also read the hash as part of the file. The name received from the network goes through `Path.GetFileName` so that the client cannot write a file outside the `inbox` folder. In the second session, the client corrupts a byte **after** computing the hash, simulating damage in transit, and the server deletes the file. Output (the speed depends on the computer and the disk cache):

```
  sent  25 %
  sent  50 %
  sent  75 %
  sent 100 %
Server: data.bin, 67,108,864 bytes, saved as 1-data.bin
Client: 64 MB in 0.11 s (588 MB/s), server: OK
  sent  25 %
  sent  50 %
  sent  75 %
  sent 100 %
Server: data.bin, 67,108,864 bytes, hash mismatch, file deleted
Client: 64 MB in 0.09 s (699 MB/s), server: HASH MISMATCH
```

## Example 2. A CoreWCF service and a client on `System.ServiceModel.Http`

Create a CoreWCF SOAP warehouse service with a `BasicHttpBinding` endpoint at `http://localhost:5003/WarehouseService.svc` and the operations “list products” and “reserve a product.” A reservation exceeding the stock returns a SOAP fault. A console client uses `ChannelFactory` to print the products, sends six simultaneous orders of 2 monitors each (4 are in stock) and an order for a nonexistent product, and then prints the stock again.

The `Warehouse.Server` project was created with the `dotnet new web` template and the `CoreWCF.Primitives` and `CoreWCF.Http` (1.9.1) packages. The contracts (`Contracts.cs`): a `Product` class (properties `Id`, `Name`, `Stock`, `Price`) with the attributes `[DataContract(Namespace = "urn:pro13:warehouse")]` and `[DataMember]` on each property, and the service interface:

```cs
[ServiceContract(Namespace = "urn:pro13:warehouse")]
public interface IWarehouseService
{
    [OperationContract]
    Product[] GetProducts();

    [OperationContract]
    int Reserve(int productId, int quantity);   // returns the stock left
}
```

The service implementation (`WarehouseService.cs`):

```cs
using CoreWCF;

namespace Warehouse;

public class WarehouseService : IWarehouseService
{
    static readonly Lock Gate = new();
    static readonly List<Product> Products =
    [
        new() { Id = 1, Name = "Laptop", Stock = 10, Price = 32500 },
        new() { Id = 2, Name = "Monitor", Stock = 4, Price = 8900 },
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
        Thread.Sleep(100);                 // "work" with the database
        lock (Gate)                        // calls run in parallel
        {
            Product product = Products.Find(p => p.Id == productId)
                ?? throw new FaultException(
                    $"product {productId} does not exist");
            if (quantity <= 0 || quantity > product.Stock)
            {
                throw new FaultException(
                    $"{product.Name}: requested {quantity}, " +
                    $"in stock {product.Stock}");
            }
            product.Stock -= quantity;
            Console.WriteLine($"  [server] {product.Name} " +
                $"−{quantity}, left {product.Stock}");
            return product.Stock;
        }
    }
}
```

The endpoint configuration (`Program.cs`):

```cs
using CoreWCF;
using CoreWCF.Configuration;
using CoreWCF.Description;
using Warehouse;

Console.OutputEncoding = System.Text.Encoding.UTF8;
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.WebHost.ConfigureKestrel(k => k.ListenLocalhost(5003));
builder.Services.AddServiceModelServices();
builder.Services.AddServiceModelMetadata();      // WSDL for svcutil

WebApplication app = builder.Build();
app.UseServiceModel(model =>
{
    model.AddService<WarehouseService>();
    // ABC: address, binding, contract.
    model.AddServiceEndpoint<WarehouseService, IWarehouseService>(
        new BasicHttpBinding(), "/WarehouseService.svc");
    app.Services.GetRequiredService<ServiceMetadataBehavior>()
        .HttpGetEnabled = true;
});
Console.WriteLine(
    "CoreWCF: http://localhost:5003/WarehouseService.svc");
app.Run();
```

The `Warehouse.Client` client is a console project with the `System.ServiceModel.Http` package (10.0.652802). The client’s `Contracts.cs` file is a copy of the server’s with the `System.ServiceModel` namespace instead of `CoreWCF` (the attributes and XML namespaces must match). The proxy can also be generated from the WSDL (`http://localhost:5003/WarehouseService.svc?wsdl`) with the `dotnet-svcutil` utility. The client’s `Program.cs`:

```cs
using System.ServiceModel;
using Warehouse;

Console.OutputEncoding = System.Text.Encoding.UTF8;

using ChannelFactory<IWarehouseService> factory = new(
    new BasicHttpBinding(),                         // B – binding
    new EndpointAddress(                            // A – address
        "http://localhost:5003/WarehouseService.svc"));
// The proxy is a client stub that implements the contract interface.
IWarehouseService proxy = factory.CreateChannel();

Print(proxy.GetProducts());

// Six simultaneous orders of 2 monitors each (4 in stock)
// and one order for a nonexistent product.
Task[] orders = Enumerable.Range(1, 7).Select(n => Task.Run(() =>
{
    IWarehouseService channel = factory.CreateChannel();
    try
    {
        int left = channel.Reserve(n < 7 ? 2 : 9, quantity: 2);
        Console.WriteLine($"order {n}: OK, left {left}");
    }
    catch (FaultException ex)
    {
        Console.WriteLine($"order {n}: rejected – {ex.Message}");
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
        Console.WriteLine($"  {p.Id}. {p.Name,-8} {p.Stock,3} pcs " +
            $"{p.Price,10:N2} UAH");
    }
}
```

::: tip Tip
When restoring packages for the client, NuGet warns (NU1903) about a vulnerability in the transitive package `System.Security.Cryptography.Xml` 10.0.0. The warning is eliminated with an explicit reference to the fixed version: `dotnet add package System.Security.Cryptography.Xml --version 10.0.12`.
:::

`ChannelFactory<T>` creates a proxy that implements the contract interface: each method call is converted into a SOAP message. Each task creates its own channel, and the server processes calls in parallel, so the stock changes only inside a `lock` (Topic 3): exactly two orders get the product, and the rest get a `FaultException` with an explanation. The order of the order lines depends on task scheduling. The client’s output:

```
  1. Laptop    10 pcs  32,500.00 UAH
  2. Monitor    4 pcs   8,900.00 UAH
order 3: OK, left 2
order 4: OK, left 0
order 1: rejected – Monitor: requested 2, in stock 0
order 2: rejected – Monitor: requested 2, in stock 0
order 6: rejected – Monitor: requested 2, in stock 0
order 5: rejected – Monitor: requested 2, in stock 0
order 7: rejected – product 9 does not exist
  1. Laptop    10 pcs  32,500.00 UAH
  2. Monitor    0 pcs   8,900.00 UAH
```

The server’s output:

```
CoreWCF: http://localhost:5003/WarehouseService.svc
  [server] Monitor −2, left 2
  [server] Monitor −2, left 0
```

## Example 3. A bidirectional gRPC stream for chat

Create a gRPC chat service with the method `rpc Join (stream ChatMessage) returns (stream ChatMessage)`: the client’s first message contains the name, and the following ones contain text, which the server broadcasts to all other participants together with “joined” and “left” messages; a duplicate name is rejected with the `AlreadyExists` code. The client runs three participants according to a script with pauses.

The contract `Protos/chat.proto` (the projects and packages are as in the lecture’s “A gRPC order service” example, with the server on port 5004):

```proto
syntax = "proto3";

option csharp_namespace = "ChatDemo";

package chat;

// Bidirectional stream: the client's first message is the introduction.
service Chat {
  rpc Join (stream ChatMessage) returns (stream ChatMessage);
}

message ChatMessage {
  string user = 1;
  string text = 2;
}
```

The `ChatRoom` chat room (a singleton registered with `builder.Services.AddSingleton<ChatRoom>()`) stores the participants in a `ConcurrentDictionary<string, Channel<ChatMessage>>`: the `Add` method creates a bounded channel of 100 messages with the `BoundedChannelFullMode.DropOldest` mode for a participant and returns `null` if the name is taken; `Remove` removes a participant and completes their channel; `Broadcast` places a message into the channels of all participants except the author with the `TryWrite` method, which does not block the sender. The service (`ChatService.cs`):

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
                $"the name {user} is taken"));
        room.Broadcast(new() { User = user, Text = "joined" });

        // The single writer to responseStream: WriteAsync must not
        // be called concurrently from several threads.
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
            room.Remove(user);                 // completes outbox
            room.Broadcast(new() { User = user, Text = "left" });
            // Wait for the sender, ignoring its cancellation.
            await sending.ContinueWith(_ => { },
                TaskScheduler.Default);
            Console.WriteLine($"  [server] {user} disconnected");
        }
    }
}
```

The client (`Chat.Client/Program.cs`):

```cs
using Grpc.Core;
using Grpc.Net.Client;
using ChatDemo;

Console.OutputEncoding = System.Text.Encoding.UTF8;
using GrpcChannel channel = GrpcChannel.ForAddress(
    "http://localhost:5004");
Chat.ChatClient client = new(channel);

// Demonstration: three participants; a script is (pause, ms; text).
await Task.WhenAll(
    ChatAsync(client, "Olena", 0,
        Script((300, "Hi!"), (900, ""))),
    ChatAsync(client, "Bohdan", 100,
        Script((400, "Hi, Olena!"), (1000, ""))),
    ChatAsync(client, "Iryna", 700,
        Script((200, "I'm here too"), (900, ""))));

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
    await reading;                             // the server closed the stream
}

// Script: a pause before each line; empty text means leaving.
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

The `IServerStreamWriter<T>.WriteAsync` method must not be called concurrently from several threads, and messages for a participant come from different `Join` calls. Therefore each participant has its own bounded channel `Channel<ChatMessage>` (Topic 4) and a single `sending` task, which is the only one that writes to the response. The `DropOldest` mode prevents a slow client from blocking the broadcast. When the client calls `CompleteAsync`, the read loop on the server ends, the `finally` block removes the participant and completes their channel, after which the server closes the response stream, and the client’s `reading` task finishes too. The order of the messages is determined by the script’s pauses. The client’s output:

```
Olena  ← Bohdan: joined
Bohdan ← Olena: Hi!
Olena  ← Bohdan: Hi, Olena!
Bohdan ← Iryna: joined
Olena  ← Iryna: joined
Bohdan ← Iryna: I'm here too
Olena  ← Iryna: I'm here too
Bohdan ← Olena: left
Iryna  ← Olena: left
Iryna  ← Bohdan: left
```

The server’s output:

```
gRPC chat: http://localhost:5004
  [server] Olena disconnected
  [server] Bohdan disconnected
  [server] Iryna disconnected
```
