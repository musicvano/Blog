---
title: "Summary"
description: "Topic 5. Asynchrony with async/await: conclusions and review questions"
sourceHash: "d38448eb74b79a9ec9f45d45ebcbab69848a8c324cf1f5a8884f37a19211784f"
---

# Summary

## Conclusions

The Windows Forms UI thread processes all messages one at a time, so a long synchronous operation in a handler "freezes" the window. `Task` and `Task<T>` represent operations that will complete later, and the `await` operator releases the thread while waiting and, thanks to the synchronization context, returns the continuation to the UI thread. I/O operations are called through their `…Async` methods, and computations are moved to the thread pool with `Task.Run`. `IProgress<T>` safely passes progress to the form, `CancellationTokenSource` and `CancellationToken` implement cooperative cancellation and timeouts, `IAsyncEnumerable<T>` yields results gradually, and `Task.WhenAll`, `WhenAny`, `WhenEach`, and `SemaphoreSlim` manage several tasks. A task's result is obtained only through `await`, `async void` is used only for event handlers, and in .NET 10 the asynchronous `InvokeAsync`, `ShowDialogAsync`, and `TaskDialog.ShowDialogAsync` methods are available without any configuration.

## Self-check questions

1. Why does a long-running event handler make a Windows Forms window "Not Responding"?
2. How do I/O operations differ from computations? How do you run each of them in a GUI application?
3. What is a `Task`? What states can it have?
4. Why are `task.Result` and `task.Wait()` not used on the UI thread?
5. What happens when the `await` operator is applied to an incomplete task?
6. Which types can an `async` method return? When is `async void` acceptable?
7. What does CS4014 warn about?
8. What is a synchronization context? How does the behavior of `await` differ in a console program and in a Windows Forms application?
9. When does the "Cross-thread operation not valid" exception occur, and how do you avoid it?
10. How does a deadlock occur because of `Result`? What is `ConfigureAwait(false)` for?
11. How do `IProgress<T>` and `Progress<T>` work? On which thread does the `Progress<T>` handler run?
12. How do you implement canceling an operation with a button and a timeout?
13. What are the asynchronous streams `IAsyncEnumerable<T>` and the `await foreach` loop for?
14. How do `Task.WhenAll`, `Task.WhenAny`, and `Task.WhenEach` differ? How do you limit the number of concurrent operations?
15. How are exceptions from `await` and `Task.WhenAll` caught? What happens to an exception in `async void`?
16. What are `Control.InvokeAsync` and `Form.ShowDialogAsync` for? Is suppressing WFO5002 needed in .NET 10?

## Useful links

- Asynchronous programming in C#: <https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/>
- The Task-based Asynchronous Pattern (TAP): <https://learn.microsoft.com/dotnet/standard/asynchronous-programming-patterns/task-based-asynchronous-pattern-tap>
- Async return types: <https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/async-return-types>
- Cancellation in managed threads: <https://learn.microsoft.com/dotnet/standard/threading/cancellation-in-managed-threads>
- Asynchronous streams: <https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/generate-consume-asynchronous-stream>
- Making thread-safe calls to controls: <https://learn.microsoft.com/dotnet/desktop/winforms/controls/how-to-make-thread-safe-calls>
- What's new in Windows Forms for .NET 9: <https://learn.microsoft.com/dotnet/desktop/winforms/whats-new/net90>
- Error WFO5002: <https://learn.microsoft.com/dotnet/desktop/winforms/compiler-messages/wfo5002>
- The *Tasks* window: <https://learn.microsoft.com/visualstudio/debugger/using-the-tasks-window>
