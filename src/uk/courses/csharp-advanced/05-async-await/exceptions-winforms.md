---
title: "Винятки та асинхронні методи форм"
description: "Тема 5. Асинхронність async/await: Винятки та асинхронні методи форм"
outline: [2, 3]
---

# Винятки та асинхронні методи форм

## Винятки в асинхронному коді

Виняток усередині `async`-методу не «вилітає» одразу: він зберігається в задачі (стан `Faulted`) і повторно кидається там, де задачу чекають через `await`. Тому звичайний `try`/`catch` навколо `await` перехоплює винятки асинхронних операцій так само, як синхронних. На відміну від `Wait()` і `Result`, оператор `await` кидає сам виняток, а не `AggregateException`.

`Task.WhenAll` може завершитися кількома винятками. `await` кидає лише перший, а всі винятки містить властивість `Exception` (типу `AggregateException`) задачі, що повернув `WhenAll`:

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

Якщо задачі `first` і `second` кидають `IOException` з повідомленнями «disk is full» і «access denied», програма виводить:

```
await: disk is full
  all.Exception: disk is full
  all.Exception: access denied
```

Виняток в `async void`-обробнику нікуди зберегти, тому Windows Forms передає його в контекст синхронізації потоку інтерфейсу. Застосунок показує стандартне вікно необробленого винятку або завершується; перехопити такі винятки централізовано можна подією `Application.ThreadException`, підписаною в `Main` до `Application.Run` (<https://learn.microsoft.com/dotnet/api/system.windows.forms.application.threadexception>):

```cs
Application.ThreadException += (sender, e) =>
    MessageBox.Show(e.Exception.Message, "Unexpected error");
```

Перевірка показала: `try`/`catch` навколо **виклику** `async void`-методу не перехоплює виняток, кинутий після `await`, а обробник `ThreadException` отримує `InvalidOperationException: Something went wrong`. Тому кожен асинхронний обробник має власний `try`/`catch` навколо коду, що може кинути виняток, а `ThreadException` залишається останньою лінією захисту: записати помилку в журнал і повідомити користувача.

## Асинхронні методи Windows Forms у .NET 9–10

### `Control.InvokeAsync`

Метод `InvokeAsync` (.NET 9+) ставить делегат у чергу потоку інтерфейсу й повертає задачу, яка завершиться після виконання делегата. На відміну від `Invoke`, фоновий потік не блокується, а виняток делегата передається в задачу. Метод має чотири перевантаження: для синхронного делегата без результату (`Action`) і з результатом (`Func<T>`), а також для асинхронного делегата `Func<CancellationToken, ValueTask>` і `Func<CancellationToken, ValueTask<T>>` (<https://learn.microsoft.com/dotnet/api/system.windows.forms.control.invokeasync>). `InvokeAsync` ніколи не був експериментальним, додаткові налаштування проєкту не потрібні.

Асинхронний делегат обов’язково приймає токен скасування:

```cs
await label.InvokeAsync(async token =>
{
    await Task.Delay(100, token);
    label.Text = "Done";
});
```

Якщо написати `label.InvokeAsync(async () => { … })` без параметра, компілятор обере перевантаження `Func<T>` з `T = Task`: `InvokeAsync` дочекається лише **створення** внутрішньої задачі, а не її завершення, і виняток загубиться. Компілятор попереджає про це попередженням WFO2001 *Task is being passed to InvokeAsync without a cancellation token* (<https://learn.microsoft.com/dotnet/desktop/winforms/compiler-messages/wfo2001>).

### `ShowAsync`, `ShowDialogAsync` і `TaskDialog.ShowDialogAsync`

Методи `Form.ShowDialogAsync()` і `Form.ShowDialogAsync(owner)` показують форму модально, але повертають `Task<DialogResult>`, яка завершиться після закриття форми; `Form.ShowAsync(owner)` показує форму немодально й повертає `Task`, що завершиться після її закриття. Статичний метод `TaskDialog.ShowDialogAsync(owner, page)` показує діалог `TaskDialog` і повертає натиснуту кнопку `TaskDialogButton`. Методи можна викликати й з фонового потоку: перехід у потік інтерфейсу виконується автоматично (<https://learn.microsoft.com/dotnet/api/system.windows.forms.form.showdialogasync>).

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

У .NET 9 ці три методи були експериментальними: виклик давав помилку компіляції WFO5002, і щоб їх використати, у файл проєкту додавали `<NoWarn>$(NoWarn);WFO5002</NoWarn>` у `PropertyGroup`. У .NET 10 вони вже не є експериментальними, і проєкт `net10.0-windows` компілюється без жодних налаштувань (<https://learn.microsoft.com/dotnet/desktop/winforms/whats-new/net100>). Якщо ж проєкт досі націлено на `net9.0-windows`, придушення WFO5002 потрібне.

### Таймери: `System.Windows.Forms.Timer` і `PeriodicTimer`

Таймер Windows Forms генерує подію `Tick` у потоці інтерфейсу. Якщо обробник `Tick` асинхронний і триває довше за інтервал, наступний `Tick` почнеться до завершення попереднього. Клас `PeriodicTimer` (`System.Threading`) пропонує інший стиль: цикл `await timer.WaitForNextTickAsync (token)` чекає наступного інтервалу, тому ітерації ніколи не перекриваються, а продовження після `await` виконується в потоці інтерфейсу (<https://learn.microsoft.com/dotnet/api/system.threading.periodictimer>):

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
