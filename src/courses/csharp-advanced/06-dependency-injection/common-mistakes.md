---
title: "Common mistakes"
description: "Topic 6. DI, configuration, logging: Common mistakes"
outline: [2, 3]
sourceHash: "bd21a3dc0aaefd81ea0480d36a063c6420691ecd12e895959026c6a0bc053c8f"
---

# Common mistakes

## Common mistakes

The most common mistakes when using DI, configuration, and logging are collected in Table 6.4.

Table 6.4. Common mistakes in dependency injection, configuration, and logging {.caption}

| **Problem** | **Cause** | **Fix** |
| --- | --- | --- |
| `Unable to resolve service for type …` | the dependency is not registered, or a different type is registered (a class instead of an interface) | add `Add…<IService, Impl>()`; `ValidateOnBuild` |
| `Cannot consume scoped service … from singleton` | a Scoped service in a Singleton's constructor | align the lifetimes or use `IServiceScopeFactory` |
| a value from `appsettings.json` is not read | the file was not copied to the output folder, a typo in the key | `CopyToOutputDirectory`; the options pattern |
| *Development* settings do not apply after running the `.exe` | `launchSettings.json` is read only by VS and `dotnet run` | set `DOTNET_ENVIRONMENT` |
| a password ended up in the repository | the secret was written to `appsettings.json` | user secrets, environment variables; change the password |
| log entries without fields, slow performance | `$"…"` interpolation instead of a template | a `{Name}` template or `[LoggerMessage]` |
