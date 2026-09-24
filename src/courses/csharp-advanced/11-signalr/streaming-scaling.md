---
title: "Streaming, MessagePack, and scaling"
description: "Topic 11. Real time with SignalR: Streaming, MessagePack, and scaling"
outline: [2, 3]
sourceHash: "22aec919c8ffe9a1a89fb731ce44d4d6b9ad88b7d5c2799a15bfd45ff4d5911a"
---

# Streaming, MessagePack, and scaling

## Data streaming

An ordinary hub method returns one result after it finishes. A **streaming** method sends the client a sequence of items as they appear: the progress of a long operation, log lines, search results (<https://learn.microsoft.com/aspnet/core/signalr/streaming>). A hub method becomes a streaming method if it returns `IAsyncEnumerable<T>` or `ChannelReader<T>`. The easiest way is to write an asynchronous iterator with `yield return`. A `CancellationToken` parameter with the `[EnumeratorCancellation]` attribute is canceled when the client stops reading the stream or disconnects.

Streaming from the client to the server is also possible: the hub method accepts an `IAsyncEnumerable<T>` or `ChannelReader<T>` parameter.

### Example: job progress

The `JobHub` hub (registered in the server of the "Stock ticker" example) simulates a long-running job and reports the completion percentage after each step:

```cs
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.SignalR;

public class JobHub(ILogger<JobHub> logger) : Hub
{
    // A streaming method: each yield return goes to the client immediately.
    public async IAsyncEnumerable<int> RunJob(int steps,
        [EnumeratorCancellation] CancellationToken token)
    {
        logger.LogInformation("Job started: {Steps} steps", steps);
        for (int step = 1; step <= steps; step++)
        {
            await Task.Delay(500, token);   // simulate work
            yield return step * 100 / steps;
        }
        logger.LogInformation("Job finished");
    }
}
```

The client reads the stream with the `StreamAsync<T>` method in an `await foreach` loop, and canceling the token passed to `StreamAsync` sends a cancellation message to the server. The job is canceled if the user presses **Enter**:

```cs
using Microsoft.AspNetCore.SignalR.Client;

await using HubConnection connection = new HubConnectionBuilder()
    .WithUrl("http://localhost:5111/hubs/jobs")
    .Build();
await connection.StartAsync();

using var cts = new CancellationTokenSource();
// Enter during execution cancels the job.
_ = Task.Run(() => { Console.ReadLine(); cts.Cancel(); });

try
{
    IAsyncEnumerable<int> progress =
        connection.StreamAsync<int>("RunJob", 10, cts.Token);
    await foreach (int percent in progress)
    {
        Console.WriteLine($"Progress: {percent,3}%");
    }
    Console.WriteLine("Done");
}
catch (OperationCanceledException)
{
    Console.WriteLine("Cancelled");
}
```

Without interruption, the client prints ten lines from `Progress: 10%` to `Progress: 100%` and `Done`, and the server prints `Job started: 10 steps` and `Job finished`. If you press **Enter** after about three seconds, the client prints the lines from `Progress: 10%` to `Progress: 50%` and `Cancelled`. The server loop is interrupted by a cancellation exception in `Task.Delay`, so the `Job finished` line does not appear in the server log.

## MessagePack, the JavaScript client, scaling, and diagnostics

**MessagePack** is a compact binary serialization format (<https://learn.microsoft.com/aspnet/core/signalr/messagepackhubprotocol>). It is enabled with the `Microsoft.AspNetCore.SignalR.Protocols.MessagePack` package (10.0.12) on the server and on the client. On the server you call `builder.Services.AddSignalR().AddMessagePackProtocol()`: JSON remains available for other clients. In the client, `.AddMessagePackProtocol()` (the `Microsoft.Extensions.DependencyInjection` namespace) is added to the builder, and the client uses only this protocol.

MessagePack is case-sensitive for property names, does not preserve `DateTime.Kind` (dates are passed in UTC), checks argument types more strictly, and serializes only **public** (`public`) types. The ticker client with MessagePack did not print prices until the `Quote` record was declared as a `public record`: the error `Building dynamic formatter only allows public type` is visible only in the client log.

The **JavaScript client** lets you connect a web page to the same hub. The `@microsoft/signalr` library is installed via npm or a CDN, and its API is similar to .NET: `HubConnectionBuilder`, `withUrl`, `withAutomaticReconnect`, `on`, `invoke`, `start`. The page can be served from the `wwwroot` folder of the same server (`app.UseStaticFiles()`), and a page from another domain requires CORS configuration (<https://learn.microsoft.com/aspnet/core/signalr/javascript-client>).

**Scaling.** A connection is bound to one server instance, so several servers behind a load balancer exchange messages through a Redis **backplane** or use the managed Azure SignalR Service (<https://learn.microsoft.com/aspnet/core/signalr/scale>).

**Diagnostics.** The server log shows SignalR's work in more detail if you set the `Debug` level for the `Microsoft.AspNetCore.SignalR` and `Microsoft.AspNetCore.Http.Connections` categories in `appsettings.json`. The option `AddSignalR(o => o.EnableDetailedErrors = true)` passes the text of ordinary exceptions to clients (for development only). The .NET client writes a log with the `ConfigureLogging(logging => logging.AddConsole())` method (the `Microsoft.Extensions.Logging.Console` package): it shows the negotiation, the chosen transport, and deserialization errors. In a browser, WebSocket frames are shown in the developer tools under the *Network* tab → the *WS* filter → *Messages* (<https://learn.microsoft.com/aspnet/core/signalr/diagnostics>).
