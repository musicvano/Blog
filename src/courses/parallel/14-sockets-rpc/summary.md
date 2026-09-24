---
title: "Summary"
description: "Topic 14. Sockets, RPC, and gRPC: conclusions and review questions"
sourceHash: "0261a6460e194ebcc0237f73d08003ef2133b1c9805b0c69da5919f70b777a8d"
---

# Summary

## Conclusions

A distributed system consists of processes without shared memory that exchange messages, and the network is unreliable, has latency, and has limited bandwidth. Sockets provide the lowest level of access: TCP provides a reliable ordered byte stream, so the application protocol must define message boundaries and the data format; UDP transfers individual datagrams without guarantees but supports broadcast and multicast. The asynchronous methods `AcceptTcpClientAsync`, `ReadAsync`, and `WriteAsync` make it possible to serve thousands of clients with a small number of threads. Reliable network code uses timeouts, retries with exponential backoff, keep-alive, and graceful connection shutdown. Remote procedure calls hide the network behind stubs generated from an interface description, but they do not eliminate partial failures, so call semantics and idempotency matter. WCF describes an endpoint by its address, binding, and contract; in modern .NET, its services are migrated to CoreWCF or replaced with gRPC. gRPC uses HTTP/2 and Protocol Buffers and supports unary and streaming calls, deadlines, metadata, status codes, and interceptors.

## Self-check questions

1. How does a distributed system differ from a multithreaded program? Name the interaction models.
2. What fallacies of distributed computing do you know?
3. How do the TCP and UDP protocols differ? When is UDP chosen?
4. What are an IP address, a port, and an endpoint? What does binding to `0.0.0.0` mean?
5. Describe the sequence of socket calls for a TCP server and client.
6. How do `TcpListener` and `TcpClient` differ from the `Socket` class?
7. How does an asynchronous server serve many clients? Why not use a thread per client?
8. What is message framing? Compare a delimiter and a length prefix.
9. What does `ReceiveAsync` return if the other side has closed the connection?
10. How do UDP broadcast and multicast differ?
11. How do you set a timeout for an asynchronous network operation? What are exponential backoff and “jitter” in retries for?
12. Describe the steps of a remote procedure call. What role do stubs and IDL play?
13. What are at-most-once and at-least-once semantics? How do you make an operation safe to retry?
14. What do the letters A, B, C of a WCF endpoint mean? Why is CoreWCF needed?
15. What advantages does gRPC gain from HTTP/2 and Protocol Buffers? Why must field numbers in a `.proto` file not be changed?
16. Name the four types of gRPC calls and give an example use of each.
17. What happens on the client and the server when a gRPC call’s deadline expires?
18. What are metadata, interceptors, and gRPC reflection for?

## Useful links

- Networking in .NET: <https://learn.microsoft.com/dotnet/fundamentals/networking/overview>
- Socket services: <https://learn.microsoft.com/dotnet/fundamentals/networking/sockets/socket-services>
- TCP classes: <https://learn.microsoft.com/dotnet/fundamentals/networking/sockets/tcp-classes>
- `System.IO.Pipelines`: <https://learn.microsoft.com/dotnet/standard/io/pipelines>
- gRPC on .NET: <https://learn.microsoft.com/aspnet/core/grpc/>
- gRPC core concepts: <https://grpc.io/docs/what-is-grpc/core-concepts/>
- The Protocol Buffers language (proto3): <https://protobuf.dev/programming-guides/proto3/>
- gRPC deadlines and cancellation: <https://learn.microsoft.com/aspnet/core/grpc/deadlines-cancellation>
- Testing gRPC: reflection, grpcurl: <https://learn.microsoft.com/aspnet/core/grpc/test-tools>
- CoreWCF: <https://github.com/CoreWCF/CoreWCF>
- CoreWCF support policy: <https://dotnet.microsoft.com/platform/support/policy/corewcf>
- HTTP Client in Rider: <https://www.jetbrains.com/help/rider/Http_client_in__product__code_editor.html>
