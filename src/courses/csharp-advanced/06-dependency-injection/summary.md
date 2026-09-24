---
title: "Summary"
description: "Topic 6. DI, configuration, logging: conclusions and review questions"
sourceHash: "7a50ee7b66ad7e74ee6a4bfddc5515aad7cad6e9af47d3633a9b55d3d063da55"
---

# Summary

## Conclusions

Dependency injection makes classes independent of concrete implementations: a class declares the interfaces it needs in its constructor, and the objects are wired together in the composition root. The `Microsoft.Extensions.DependencyInjection` container creates services from registrations, supports multiple implementations, factories, and keyed services, and manages the Singleton, Scoped, and Transient lifetimes; the `ValidateScopes` and `ValidateOnBuild` checks detect captive and missing dependencies. The Generic Host combines DI, configuration, logging, and background services and shuts down gracefully on **Ctrl+C**. Configuration is assembled from JSON files, user secrets, environment variables, and the command line, with later sources overriding earlier ones. The options pattern provides typed access to settings that is validated at startup. The `ILogger<T>` logger with levels, categories, and message templates writes structured data to several providers, and the `[LoggerMessage]` generator makes it fast. The same techniques work in Windows Forms and simplify unit testing.

## Self-check questions

1. What are a dependency and tight coupling? What problems does `new` of a concrete class inside a service create?
2. State the dependency inversion principle. What is constructor injection?
3. What is a composition root? Why is the service locator considered an antipattern?
4. What are `IServiceCollection` and `IServiceProvider` for? How does `GetService` differ from `GetRequiredService`?
5. What does the container return if one interface is registered twice? How do you get all implementations?
6. What are keyed services and the `[FromKeyedServices]` attribute for?
7. How do the Singleton, Scoped, and Transient lifetimes differ? When does the container release objects?
8. What is a captive dependency? How do you detect it?
9. What does `Host.CreateApplicationBuilder` configure? How does `BackgroundService` work?
10. Which configuration providers does the host add, and in what order of priority?
11. How do you set the runtime environment? What is the `launchSettings.json` file for?
12. How do you write a hierarchical key in an environment variable and in a command-line argument?
13. Why are user secrets needed? Where are they stored?
14. How do `IOptions<T>`, `IOptionsSnapshot<T>`, and `IOptionsMonitor<T>` differ? How do you validate options at startup?
15. What log levels exist? What is a log category?
16. Why do you pass a message template rather than an interpolated string to the `Log…` methods?
17. Which built-in logging providers does .NET have? How do you configure filters in `appsettings.json`?
18. How do you add the host and dependency injection to a Windows Forms application?

## Useful links

- Dependency injection in .NET: <https://learn.microsoft.com/dotnet/core/extensions/dependency-injection/overview>
- Service lifetimes: <https://learn.microsoft.com/dotnet/core/extensions/dependency-injection/service-lifetimes>
- The .NET Generic Host: <https://learn.microsoft.com/dotnet/core/extensions/generic-host>
- Configuration in .NET: <https://learn.microsoft.com/dotnet/core/extensions/configuration>
- Configuration providers: <https://learn.microsoft.com/dotnet/core/extensions/configuration-providers>
- The options pattern: <https://learn.microsoft.com/dotnet/core/extensions/options>
- Logging in .NET: <https://learn.microsoft.com/dotnet/core/extensions/logging/overview>
- Compile-time logging source generation: <https://learn.microsoft.com/dotnet/core/extensions/logging/source-generation>
- User secrets: <https://learn.microsoft.com/aspnet/core/security/app-secrets>
- The host in Windows Forms: <https://learn.microsoft.com/dotnet/desktop/winforms/advanced/how-to-use-host-builder>
- The `TimeProvider` time abstraction: <https://learn.microsoft.com/dotnet/standard/datetime/timeprovider-overview>
