---
title: "Exceptions and asynchronous form methods"
description: "Topic 5. Asynchrony with async/await: Exceptions and asynchronous form methods"
outline: [2, 3]
sourceHash: "e5b4ff3416ebd68487209ce7320d5f175a793a94e6f2d026db41cd803b1d4f39"
---

# Exceptions and asynchronous form methods

## Exceptions in asynchronous code

An exception inside an `async` method does not "fly out" immediately: it is stored in the task (the `Faulted` state) and rethrown where the task is awaited with `await`. So an ordinary `try`/`catch` around `await` catches the exceptions of asynchronous operations the same way as synchronous ones. Unlike `Wait()` and `Result`, the `await` operator throws the exception itself, not an `AggregateException`.

`Task.WhenAll` can complete with several exceptions. `await` throws only the first one, and all the exceptions are contained in the `Exception` property (of type `AggregateException`) of the task returned by `WhenAll`:

```cs
Task all = Task.WhenAll(first, second);
try
{
    await all;
}
catch (Exception ex)
{
    Console.WriteLine($"await: {ex.Message}");
    foreach (Exception inner in all.Exception!.InnerExceptions)
    {
        Console.WriteLine($"  all.Exception: {inner.Message}");
    }
}
```

If the `first` and `second` tasks throw an `IOException` with the messages "disk is full" and "access denied", the program outputs:

```
await: disk is full
  all.Exception: disk is full
  all.Exception: access denied
```

An exception in an `async void` handler has nowhere to be stored, so Windows Forms passes it to the UI thread's synchronization context. The application shows the standard unhandled exception window or exits; such exceptions can be caught centrally with the `Application.ThreadException` event, subscribed in `Main` before `Application.Run` (<https://learn.microsoft.com/dotnet/api/system.windows.forms.application.threadexception>):

```cs
Application.ThreadException += (sender, e) =>
    MessageBox.Show(e.Exception.Message, "Unexpected error");
```

A test showed that a `try`/`catch` around the **call** of an `async void` method does not catch an exception thrown after `await`, while the `ThreadException` handler receives `InvalidOperationException: Something went wrong`. So each asynchronous handler has its own `try`/`catch` around the code that can throw, and `ThreadException` remains the last line of defense: log the error and inform the user.

## Asynchronous Windows Forms methods in .NET 9–10

### `Control.InvokeAsync`

The `InvokeAsync` method (.NET 9+) queues a delegate on the UI thread and returns a task that completes after the delegate is executed. Unlike `Invoke`, the background thread is not blocked, and the delegate's exception is passed to the task. The method has four overloads: for a synchronous delegate without a result (`Action`) and with a result (`Func<T>`), and for the asynchronous delegates `Func<CancellationToken, ValueTask>` and `Func<CancellationToken, ValueTask<T>>` (<https://learn.microsoft.com/dotnet/api/system.windows.forms.control.invokeasync>). `InvokeAsync` has never been experimental, and no additional project configuration is needed.

An asynchronous delegate must take a cancellation token:

```cs
await label.InvokeAsync(async token =>
{
    await Task.Delay(100, token);
    label.Text = "Done";
});
```

If you write `label.InvokeAsync(async () => { … })` without a parameter, the compiler chooses the `Func<T>` overload with `T = Task`: `InvokeAsync` waits only for the **creation** of the inner task, not its completion, and the exception is lost. The compiler warns about this with warning WFO2001 *Task is being passed to InvokeAsync without a cancellation token* (<https://learn.microsoft.com/dotnet/desktop/winforms/compiler-messages/wfo2001>).

### `ShowAsync`, `ShowDialogAsync`, and `TaskDialog.ShowDialogAsync`

The `Form.ShowDialogAsync()` and `Form.ShowDialogAsync(owner)` methods show a form modally but return a `Task<DialogResult>` that completes after the form is closed; `Form.ShowAsync(owner)` shows a form modelessly and returns a `Task` that completes after it is closed. The static `TaskDialog.ShowDialogAsync(owner, page)` method shows a `TaskDialog` and returns the `TaskDialogButton` that was clicked. The methods can also be called from a background thread: the switch to the UI thread is performed automatically (<https://learn.microsoft.com/dotnet/api/system.windows.forms.form.showdialogasync>).

```cs
private async void settingsButton_Click(object sender, EventArgs e)
{
    using var dialog = new SettingsForm();
    if (await dialog.ShowDialogAsync(this) == DialogResult.OK)
    {
        ApplySettings(dialog.Settings);
    }
}

private async Task<bool> ConfirmStopAsync()
{
    var page = new TaskDialogPage
    {
        Caption = "File Search",
        Heading = "Stop the search?",
        Text = "Files found so far will be kept.",
        Icon = TaskDialogIcon.Warning,
        Buttons = { TaskDialogButton.Yes, TaskDialogButton.No }
    };
    TaskDialogButton button =
        await TaskDialog.ShowDialogAsync(this, page);
    return button == TaskDialogButton.Yes;
}
```

In .NET 9, these three methods were experimental: calling them produced compilation error WFO5002, and to use them, `<NoWarn>$(NoWarn);WFO5002</NoWarn>` was added to a `PropertyGroup` in the project file. In .NET 10 they are no longer experimental, and a `net10.0-windows` project compiles without any configuration (<https://learn.microsoft.com/dotnet/desktop/winforms/whats-new/net100>). If a project still targets `net9.0-windows`, suppressing WFO5002 is required.

### Timers: `System.Windows.Forms.Timer` and `PeriodicTimer`

The Windows Forms timer raises the `Tick` event on the UI thread. If a `Tick` handler is asynchronous and takes longer than the interval, the next `Tick` starts before the previous one finishes. The `PeriodicTimer` class (`System.Threading`) offers a different style: the loop `await timer.WaitForNextTickAsync (token)` waits for the next interval, so iterations never overlap, and the continuation after `await` runs on the UI thread (<https://learn.microsoft.com/dotnet/api/system.threading.periodictimer>):

```cs
private async Task RunClockAsync(CancellationToken token)
{
    using var timer = new PeriodicTimer(TimeSpan.FromSeconds(1));
    try
    {
        while (await timer.WaitForNextTickAsync(token))
        {
            clockLabel.Text = DateTime.Now.ToString("HH:mm:ss");
        }
    }
    catch (OperationCanceledException)
    {
        clockLabel.Text = "Stopped";
    }
}
```
