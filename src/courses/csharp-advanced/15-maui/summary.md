---
title: "Summary"
description: "Topic 15. Cross-platform .NET MAUI: conclusions and review questions"
sourceHash: "2f783aea273074430c7fda74316c3d71c9dca522229fd0c41f5b2e38c0410a02"
---

# Summary

## Conclusions

.NET MAUI lets you create applications for Android, iOS, macOS, and Windows from one project in C# and XAML: handlers convert cross-platform elements into native ones, and the shared code runs on .NET 10. Development is convenient on the *Windows Machine* target, and testing in an Android emulator with hardware virtualization or on your own phone. Pages are built from layout containers, styles, and themes, data is shown through compiled `x:DataType` bindings and `CollectionView`, and logic is moved into ViewModels with CommunityToolkit.Mvvm that receive services through the DI container in `MauiProgram`. Shell describes tabs and routes and passes parameters between pages. Device services (`Preferences`, `Geolocation`, `MediaPicker`, sensors) require checking for support, permissions, and work with the main thread, and data is stored in files or SQLite or obtained from web services.

## Self-check questions

1. What is .NET MAUI? For which platforms can you create applications, and where are they built?
2. What is a handler? How is a MAUI button displayed on Android and on Windows?
3. How do you install MAUI in Visual Studio 2026 and with the dotnet CLI?
4. What parts does a MAUI single project consist of? What are the `Platforms` and `Resources` folders for?
5. What does the `MauiProgram.CreateMauiApp` method do? What is the `App.CreateWindow` method for?
6. What does the Android emulator need to work? How do you run the application on your own phone?
7. How does XAML Hot Reload differ from .NET Hot Reload?
8. Which MAUI classes replace `StackPanel`, `TextBox`, and `ListBox` from WPF?
9. How do you set different values for the light and dark themes, platforms, and device types?
10. What do compiled bindings give? Why is `x:DataType` also set on a `DataTemplate`?
11. How do you register pages, ViewModels, and services in the DI container? When do you choose `AddTransient`?
12. What capabilities does `CollectionView` have? Why should you not use `ListView` in .NET 10?
13. How do you register a route and navigate to a page with parameters? How do you receive the parameters?
14. How do you check and request the location permission? Where are permissions declared on Android?
15. How do you access a web service running on the computer from the Android emulator?

## Useful links

- .NET MAUI documentation: <https://learn.microsoft.com/dotnet/maui/>
- Installation: <https://learn.microsoft.com/dotnet/maui/get-started/installation>
- What's new in .NET MAUI for .NET 10: <https://learn.microsoft.com/dotnet/maui/whats-new/dotnet-10>
- Shell navigation: <https://learn.microsoft.com/dotnet/maui/fundamentals/shell/navigation>
- Data binding: <https://learn.microsoft.com/dotnet/maui/fundamentals/data-binding/>
- Dependency injection: <https://learn.microsoft.com/dotnet/maui/fundamentals/dependency-injection>
- Platform integration: <https://learn.microsoft.com/dotnet/maui/platform-integration/>
- The Android emulator: <https://learn.microsoft.com/dotnet/maui/android/emulator/>
- Local databases: <https://learn.microsoft.com/dotnet/maui/data-cloud/database-sqlite>
- CommunityToolkit.Maui: <https://learn.microsoft.com/dotnet/communitytoolkit/maui/>
- .NET MAUI support policy: <https://dotnet.microsoft.com/platform/support/policy/maui>
