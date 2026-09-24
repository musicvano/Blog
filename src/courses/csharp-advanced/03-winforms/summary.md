---
title: "Summary"
description: "Topic 3. Windows Forms fundamentals: conclusions and review questions"
sourceHash: "fadd9b4a73fb7afe9a98e0c41fdd907cb09ff76d9d0837bb164266b463bb406a"
---

# Summary

## Conclusions

Windows Forms is a technology for Windows desktop applications in which the interface consists of forms and controls—objects of classes derived from `Control`. A `net10.0-windows` project contains the `Program.cs` entry point with the `Application.Run` message loop and partial form classes: the programmer's code in `MainForm.cs` and the form designer's code in `MainForm.Designer.cs`. The application is event-driven: user actions are turned into events, and handlers with the `sender` and `e` parameters run on the UI thread. Layout panels, `Anchor`, and `Dock` make a form resilient to changes in size and scaling, `Validating` and `ErrorProvider` help validate input, and menus, standard dialogs, modal forms, `DataGridView` with `BindingList<T>`, and the timer make it possible to build full-featured data applications.

## Self-check questions

1. Which desktop application technologies exist in .NET? How does Windows Forms differ from WPF and .NET MAUI?
2. Why does the target framework of a Windows Forms project look like `net10.0-windows`? What is the `UseWindowsForms` property for?
3. What does the `Application.Run` method do? When do the lines after it execute?
4. Why is the form class split into the `MainForm.cs` and `MainForm.Designer.cs` files? Why must you not edit `Designer.cs` manually?
5. Which Visual Studio windows are used when creating a form in the designer?
6. Which properties do controls have in common? How does `Enabled = false` differ from `Visible = false`?
7. In what order are the `Load`, `Activated`, `Shown`, `FormClosing`, and `FormClosed` events raised?
8. How do you cancel closing a form?
9. What is an event-driven application? What path does a mouse click take to reach a handler?
10. What is passed in the `sender` and `e` parameters of an event handler?
11. How do you connect one handler to several controls?
12. How do the `Anchor` and `Dock` properties differ?
13. What are `TableLayoutPanel`, `FlowLayoutPanel`, and `SplitContainer` used for?
14. How do the `Validating` and `Validated` events work? What is the `CausesValidation` property for?
15. How do you show an input error with `ErrorProvider`?
16. How do you set shortcut keys for a menu item and a mnemonic for a button?
17. How does a modal form differ from a modeless one? How do you pass data between forms?
18. What are `BindingList<T>` and `BindingSource` for when working with `DataGridView`?
19. Why is the Windows Forms timer unsuitable for precise time measurement?

## Useful links

- Windows Forms documentation: <https://learn.microsoft.com/dotnet/desktop/winforms/>
- Windows Forms overview: <https://learn.microsoft.com/dotnet/desktop/winforms/overview/>
- Creating an app in Visual Studio: <https://learn.microsoft.com/dotnet/desktop/winforms/get-started/create-app-visual-studio>
- Controls: <https://learn.microsoft.com/dotnet/desktop/winforms/controls/>
- Events: <https://learn.microsoft.com/dotnet/desktop/winforms/forms/events>
- Order of events: <https://learn.microsoft.com/dotnet/desktop/winforms/order-of-events-in-windows-forms>
- Layout: <https://learn.microsoft.com/dotnet/desktop/winforms/controls/layout>
- Input validation: <https://learn.microsoft.com/dotnet/desktop/winforms/input-keyboard/validation>
- The `Form` class: <https://learn.microsoft.com/dotnet/api/system.windows.forms.form>
- What's new in Windows Forms for .NET 10: <https://learn.microsoft.com/dotnet/desktop/winforms/whats-new/net100>
