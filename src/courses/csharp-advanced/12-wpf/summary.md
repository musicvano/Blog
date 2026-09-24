---
title: "Summary"
description: "Topic 12. WPF fundamentals: conclusions and review questions"
sourceHash: "9518c09bb171a503458678242b91200fce8b73f4420b39c559a19835221b682d"
---

# Summary

## Conclusions

WPF is a desktop application technology for Windows in which the interface is described with XAML markup and the behavior with C# code. XAML elements become objects, attributes become properties and event handlers, and the system renders a retained element tree through DirectX in device-independent units. The `Grid`, `StackPanel`, `DockPanel`, `WrapPanel`, `UniformGrid`, and `Canvas` panels arrange elements according to their desired size, so the interface adapts to the window, the font, and the scale. Routed events travel through the element tree by tunneling and bubbling, which makes it possible to handle the events of a group of elements with one handler and to filter input. Dependency properties support inheritance, styles, animation, data binding, and value source precedence; custom controls are built on them. Commands, resources, dialogs, the *Live Visual Tree* tools, and XAML Hot Reload make WPF a convenient foundation for applications in which (Topic 13) the logic is then separated from the interface with data binding and the MVVM pattern.

## Self-check questions

1. How does WPF differ from Windows Forms? What does retained-mode rendering mean?
2. Which assemblies and components make up the WPF architecture? Which of them is unmanaged, and why?
3. Which files does the *WPF Application* template create? What roles do `x:Class`, `partial`, and `InitializeComponent` play?
4. How do XAML elements and attributes correspond to C# objects and properties? What is a type converter?
5. How does the logical tree differ from the visual tree?
6. What capabilities do *Live Visual Tree*, *Live Property Explorer*, and XAML Hot Reload provide?
7. How do the `Auto`, numeric, and `*` sizes differ in a `Grid`? How do you add a `GridSplitter`?
8. When do you use `StackPanel`, `WrapPanel`, `DockPanel`, `UniformGrid`, and `Canvas`?
9. What is the content model? How does `ContentControl` differ from `ItemsControl`?
10. What event routing strategies exist? How does `Source` differ from `OriginalSource`?
11. How do you register a dependency property? Why must the wrapper contain no logic?
12. In what order of precedence is the value of a dependency property determined? What does `ClearValue` do?
13. How do built-in commands, `CommandBinding`, and `CanExecute` work?
14. How do you show a modal window and get a result? What are `Owner`, `IsDefault`, and `IsCancel` for?
15. How do you enable the Fluent theme, and why does accessing `ThemeMode` in code give error WPF0001?

## Useful links

- WPF documentation: <https://learn.microsoft.com/dotnet/desktop/wpf/>
- WPF overview: <https://learn.microsoft.com/dotnet/desktop/wpf/overview/>
- Creating an application in Visual Studio: <https://learn.microsoft.com/dotnet/desktop/wpf/get-started/create-app-visual-studio>
- XAML in WPF: <https://learn.microsoft.com/dotnet/desktop/wpf/xaml/>
- Layout: <https://learn.microsoft.com/dotnet/desktop/wpf/advanced/layout>
- Routed events: <https://learn.microsoft.com/dotnet/desktop/wpf/events/routed-events-overview>
- Dependency properties: <https://learn.microsoft.com/dotnet/desktop/wpf/properties/dependency-properties-overview>
- What's new in WPF for .NET 10: <https://learn.microsoft.com/dotnet/desktop/wpf/whats-new/net100>
