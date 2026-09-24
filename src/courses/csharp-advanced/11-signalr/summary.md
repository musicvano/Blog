---
title: "Summary"
description: "Topic 11. Real time with SignalR: conclusions and review questions"
sourceHash: "28bfe5a3c2e741a971039853a93ce41578d09e638e91a73af78c13961080a527"
---

# Summary

## Conclusions

ASP.NET Core SignalR simplifies building real-time applications: the server calls client methods as easily as clients call server methods. The library negotiates the transport (WebSockets, Server-Sent Events, or long polling) and the protocol (JSON or MessagePack) on its own. On the server, logic is described by a short-lived hub: `Clients` determines the recipients, `Groups` manages groups, `OnConnectedAsync` and `OnDisconnectedAsync` track connections, and state is stored in separate services. A strongly typed hub `Hub<T>` checks client method calls at compile time, and `HubException` passes understandable errors to the client. A .NET client creates a `HubConnection` with a builder, registers `On` handlers, and calls hub methods with `InvokeAsync`; in Windows Forms the handlers update the form through `InvokeAsync`. Automatic reconnection restores the connection, but not the groups. `IHubContext` sends messages from background services and REST endpoints, and streaming methods with `IAsyncEnumerable<T>` transfer data in parts.

## Self-check questions

1. How do real-time applications differ from the "request – response" exchange in REST?
2. How do polling and long polling work? What are their drawbacks?
3. How do Server-Sent Events differ from WebSocket?
4. Which transports does SignalR support, and how are they negotiated?
5. What is a hub? How do you register a hub on the server?
6. Why must you not store state in hub fields? Where should it be stored?
7. Who receives messages sent to `Clients.All`, `Clients.Caller`, `Clients.Others`, and `Clients.OthersInGroup`?
8. How does `InvokeAsync` differ from `SendAsync` in the .NET client?
9. Why do you override `OnConnectedAsync` and `OnDisconnectedAsync`?
10. How do groups work? What happens to group membership after a disconnect?
11. What advantages does a strongly typed hub `Hub<T>` give?
12. What is `HubException` used for?
13. Why can't `On` handlers in Windows Forms change controls directly?
14. How does `WithAutomaticReconnect` work? What events does the connection raise?
15. How do you send a message to clients from a background service or a REST endpoint?
16. How do you create a streaming hub method and read the stream in the client? How do you cancel a stream?
17. When does it make sense to use MessagePack? What are its limitations?

## Useful links

- Overview of ASP.NET Core SignalR: <https://learn.microsoft.com/aspnet/core/signalr/introduction>
- Hubs: <https://learn.microsoft.com/aspnet/core/signalr/hubs>
- The .NET client: <https://learn.microsoft.com/aspnet/core/signalr/dotnet-client>
- Groups and users: <https://learn.microsoft.com/aspnet/core/signalr/groups>
- `IHubContext`: <https://learn.microsoft.com/aspnet/core/signalr/hubcontext>
- SignalR in background services: <https://learn.microsoft.com/aspnet/core/signalr/background-services>
- Streaming: <https://learn.microsoft.com/aspnet/core/signalr/streaming>
- Configuration: <https://learn.microsoft.com/aspnet/core/signalr/configuration>
- The MessagePack protocol: <https://learn.microsoft.com/aspnet/core/signalr/messagepackhubprotocol>
- The JavaScript client: <https://learn.microsoft.com/aspnet/core/signalr/javascript-client>
- Authentication and authorization: <https://learn.microsoft.com/aspnet/core/signalr/authn-and-authz>
- Scaling: <https://learn.microsoft.com/aspnet/core/signalr/scale>
- Diagnostics: <https://learn.microsoft.com/aspnet/core/signalr/diagnostics>
