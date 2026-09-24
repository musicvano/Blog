---
title: "Common mistakes"
description: "Topic 12. WPF fundamentals: Common mistakes"
outline: [2, 3]
sourceHash: "4c8faeb0f779675f7f5b3ab870eeaf0843e9d842eb04b25412a38fae578ce6f6"
---

# Common mistakes

## Common mistakes

Table 12.3 lists the mistakes most often made when moving from Windows Forms to WPF.

Table 12.3. Common mistakes in WPF applications {.caption}

| **Problem** | **Cause** | **Fix** |
| --- | --- | --- |
| elements overlap each other in a `Grid` | `Grid.Row`, `Grid.Column` are not set (all in cell 0,0) | set the attached properties or use a `StackPanel` |
| after resizing the window, part of the form is clipped or empty | fixed `Width`, `Height`, `Margin` from the designer, a `Canvas` for the form | a `Grid` with `Auto` and `*`, `MinWidth`, `SizeToContent` |
| a `MouseDown` handler on a panel does not fire after a button click | the button marked the event as handled | `Click`, `PreviewMouseDown`, or `AddHandler(…, true)` |
| `XamlParseException` at startup | an error in an attribute, a resource not found, the file does not have the *Resource* build action | read the `InnerException`, check the key and the *Build Action* |
| error WPF0001 during build | `ThemeMode` in code is an experimental API | `#pragma warning disable WPF0001` or `NoWarn` |
| the code-behind grows, elements are looked up by name | UI logic and data logic are mixed | data binding and the MVVM pattern (Topic 13) |
