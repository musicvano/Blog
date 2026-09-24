---
title: "Common mistakes"
description: "Topic 11. Real time with SignalR: Common mistakes"
outline: [2, 3]
sourceHash: "0704a75b0269dd110f480d6c6cca79460df3dd9381505bbc5df1a30c28950c97"
---

# Common mistakes

## Common mistakes

Table 11.2 lists the mistakes that occur most often when developing SignalR applications.

Table 11.2. Common mistakes in SignalR applications {.caption}

| **Problem** | **Cause** | **Fix** |
| --- | --- | --- |
| the client receives no messages and there are no errors | the name in `On` does not match the name in `SendAsync`; the handler is registered after `StartAsync` | a strongly typed hub, register `On` before `StartAsync` |
| user data "disappears" between calls | state is stored in hub fields | a singleton service with a thread-safe collection |
| `InvalidOperationException: Cross-thread operation not valid` | an `On` handler changes the form from a thread pool thread | the form's `InvokeAsync` or `BeginInvoke` |
| the client gets *An unexpected error occurred invoking…* without details | an ordinary exception in a hub method | `HubException` for errors intended for the client |
| the program crashes at startup | the server is unavailable, `StartAsync` without `try`/`catch` | handle `HttpRequestException`, retry |
| group messages stop arriving after a reconnect | the new connection is not in any groups | rejoin the groups in the `Reconnected` event |
| all clients "hang" while one method runs | a blocking call (`Thread.Sleep`, `.Result`) in the hub | asynchronous methods with `await`, long-running work in a background service |
| with MessagePack the handler is not called | the message type is not `public` | declare the record as `public` |
