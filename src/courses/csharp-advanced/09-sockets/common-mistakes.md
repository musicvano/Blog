---
title: "Common mistakes"
description: "Topic 9. Networking and sockets: Common mistakes"
outline: [2, 3]
sourceHash: "b93c1ca1a678f53a965c7c93e1a114026a2a96670302ed4f57d3b7f98679eac8"
---

# Common mistakes

## Common mistakes

Table 9.4 lists the mistakes most often made when programming sockets.

Table 9.4. Common mistakes when working with sockets {.caption}

| **Problem** | **Cause** | **Fix** |
| --- | --- | --- |
| the client and server "hang", no data arrives | a `StreamWriter` without `AutoFlush` keeps the line in its buffer | `AutoFlush = true` or `await writer.FlushAsync()` |
| the first line on the server starts with an invisible character | `Encoding.UTF8` in a `StreamWriter` sends a BOM | `new UTF8Encoding(false)` |
| messages "stick together" or arrive in pieces | TCP is a byte stream without message boundaries | a `\n` delimiter, a length prefix, `ReadExactlyAsync` |
| `SocketException` 10061 *actively refused* | the server is not running, or the port or address is different | start the server, check the port with `Get-NetTCPConnection` |
| cannot connect from another computer | the server listens on `127.0.0.1` or the firewall blocks it | `IPAddress.Any`, a firewall rule for the private network |
| the server serves only one client | the accept loop waits for the exchange with the client to finish | a separate `ServeAsync` task for each client |
| interleaved messages in a broadcast | several tasks write to the stream simultaneously | `SemaphoreSlim` or a per-client message queue |
| the Windows Forms window does not respond | synchronous `Read`, `Accept` on the UI thread | asynchronous methods with `await` |
