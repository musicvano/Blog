---
title: "Summary"
description: "Topic 9. Networking and sockets: conclusions and review questions"
sourceHash: "b27f69f0a84517617245494dc7ba8c4a33b1dba131590c92e734cae04b03ed71"
---

# Summary

## Conclusions

Network applications exchange data through the TCP/IP protocol stack: IP delivers packets between computers by address, while TCP and UDP deliver data between programs by port. TCP establishes a connection and reliably transfers a byte stream in the correct order; UDP quickly transfers individual datagrams without delivery guarantees but supports broadcasting. In .NET a socket is represented by the `Socket` class, and the `TcpListener`, `TcpClient`, `NetworkStream`, and `UdpClient` classes simplify common tasks. Because TCP does not preserve message boundaries, the application protocol defines them with a line delimiter or a length prefix, and it also describes commands, response codes, session states, limits, and a version. A server serves multiple clients with asynchronous tasks, protects shared data with thread-safe collections and locks, and shuts down gracefully via a cancellation token. Reliable network code handles `SocketException` and `IOException`, limits operations in time, validates input, encrypts traffic with TLS, and is checked with Windows diagnostic tools.

## Self-check questions

1. What layers does the TCP/IP model have? What is each layer responsible for?
2. How do IPv4 and IPv6 addresses differ? What do the addresses `127.0.0.1` and `0.0.0.0` mean?
3. What are ports for? What port ranges exist?
4. How do you get IP addresses for a domain name in C#?
5. How do the TCP and UDP protocols differ? Give examples of where they are used.
6. What is the TCP three-way handshake?
7. What steps do a server and a client that use the `Socket` class perform?
8. What does the `ReceiveAsync` method return? What does a result of 0 mean?
9. What is the purpose of the `TcpListener`, `TcpClient`, and `NetworkStream` classes?
10. Why do you set `AutoFlush` and `UTF8Encoding(false)` for a `StreamWriter` over a network stream?
11. Why must message boundaries be defined in a TCP stream? What approaches exist?
12. What is network byte order? How do you write a number in big-endian format?
13. What does an application protocol describe? What are response codes and a protocol version for?
14. How does a server serve multiple clients at the same time? How do you protect shared data?
15. How do you stop a server and a client gracefully?
16. How do you send a UDP broadcast message, and what is it used for?
17. When does the Windows Firewall prompt appear, and what happens if you cancel it?
18. How do you set a timeout for a network operation?
19. How do you check which ports a computer is listening on and which connections are established?

## Useful links

- Overview of networking in .NET: <https://learn.microsoft.com/dotnet/fundamentals/networking/overview>
- Working with sockets: <https://learn.microsoft.com/dotnet/fundamentals/networking/sockets/socket-services>
- TCP classes: <https://learn.microsoft.com/dotnet/fundamentals/networking/sockets/tcp-classes>
- The `Socket` class: <https://learn.microsoft.com/dotnet/api/system.net.sockets.socket>
- The `UdpClient` class: <https://learn.microsoft.com/dotnet/api/system.net.sockets.udpclient>
- The `SslStream` class: <https://learn.microsoft.com/dotnet/api/system.net.security.sslstream>
- Windows Firewall rules: <https://learn.microsoft.com/windows/security/operating-system-security/network-security/windows-firewall/rules>
- The TCP protocol (RFC 9293): <https://www.rfc-editor.org/rfc/rfc9293>
- The UDP protocol (RFC 768): <https://www.rfc-editor.org/rfc/rfc768>
