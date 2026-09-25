---
title: "Object-oriented programming in C# II"
description: "This course is the second part of Object-Oriented Programming and covers application development in C# on the .NET platform: Windows Forms and Windows Presentation Foundation desktop applications, database applications (ADO.NET, Entity Framework Core), network applications, ASP.NET Core and SignalR web services, cross-platform .NET MAUI applications, and applications that integrate artificial intelligence models. Students also learn Git version control, regular expressions, asynchronous programming, and dependency injection."
sourceHash: "78d03ba6bf4fa70d39b798c4f8f3a4710b34fefb10ea15d95b2425d72033c26c"
---

# Object-oriented programming in C# II

You will gain the .NET development skills used in real projects: from desktop and mobile applications to web services and databases. Each topic ends with a working application of your own, so by the end of the course you will have a project portfolio and experience combining a user interface, data, networking, and artificial intelligence in one solution.

This course is the second part of Object-Oriented Programming and covers application development in C# on the .NET platform: Windows Forms and Windows Presentation Foundation desktop applications, database applications (ADO.NET, Entity Framework Core), network applications, ASP.NET Core and SignalR web services, cross-platform .NET MAUI applications, and applications that integrate artificial intelligence models. Students also learn Git version control, regular expressions, asynchronous programming, and dependency injection.

## Course syllabus

### Developer tools and Windows Forms

1. [Git code version control](./01-git/)
2. [Regular expressions and text processing in C#](./02-regex/)
3. [Windows Forms fundamentals](./03-winforms/)
4. [Working with graphics using Windows Forms and GDI+](./04-gdi-plus/)
5. [Asynchronous programming with async/await in graphical user interface applications](./05-async-await/)
6. [Dependency injection, configuration, and logging in .NET applications](./06-dependency-injection/)

### Databases, network applications, and web services

7. [ADO.NET database access: relational database and SQL fundamentals](./07-sql-ado-net/)
8. [Object-relational mapping with Entity Framework Core](./08-ef-core/)
9. [Programming network applications with Socket](./09-sockets/)
10. [Creating and consuming REST web services: ASP.NET Core Minimal API, HttpClient, and JSON](./10-rest-api/)
11. [Real-time messaging with ASP.NET Core SignalR](./11-signalr/)

### User interface technologies and artificial intelligence

12. [Application development with Windows Presentation Foundation](./12-wpf/)
13. [Data binding, styles, templates, and the MVVM pattern in WPF](./13-wpf-mvvm/)
14. [Fundamentals of visual component animation and multimedia application development with Windows Presentation Foundation](./14-wpf-animation/)
15. [Cross-platform application development with .NET MAUI: XAML, navigation, data binding, and device services](./15-maui/)
16. [Integrating artificial intelligence models into .NET applications (Microsoft.Extensions.AI)](./16-ai/)

## Required software {#software}

| Software | Purpose | Topic |
| --- | --- | :-: |
| The environment of the “Object-oriented programming in C# I” course: Visual Studio 2026 with *.NET desktop development* and the .NET 10 SDK | Development environment | 1 |
| [Git for Windows](https://git-scm.com/install/windows) | Version control | 1 |
| xUnit v3 templates (`dotnet new install xunit.v3.templates`) | Unit tests | 2 |
| [PostgreSQL 18](https://www.postgresql.org/download/windows/) (server, psql, pgAdmin 4) | Database management system | 7 |
| [JetBrains DataGrip](https://www.jetbrains.com/datagrip/) | Working with the database and SQL queries | 7 |
| The `dotnet-ef` tool (`dotnet tool install --global dotnet-ef`) | Entity Framework Core migrations | 8 |
| The Visual Studio *ASP.NET and web development* workload | ASP.NET Core web services | 10 |
| The Visual Studio *.NET Multi-platform App UI development* workload (Android SDK and emulator) | .NET MAUI apps; needs hardware virtualization or an Android phone | 15 |
| [Ollama](https://ollama.com/download/windows) with local models | Local AI models | 16 |

NuGet libraries (Npgsql, Entity Framework Core, SignalR, CommunityToolkit and others) are added to projects in the corresponding topics.

<!--@include: ../_shared/introduction.md-->

## Course materials

- [Review questions](./questions) — 100 questions covering the course topics for self-assessment and exam preparation
- [Review tasks](./exam) — practical tasks organized by topic
- [Useful links](./links) — documentation and online resources
- [Recommended reading](./literature) — textbooks and guides
