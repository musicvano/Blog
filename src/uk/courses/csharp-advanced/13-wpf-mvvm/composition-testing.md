---
title: "Композиція застосунку й тестування"
description: "Тема 13. Прив’язка даних і MVVM: Композиція застосунку й тестування"
outline: [2, 3]
---

# Композиція застосунку й тестування

## Композиція застосунку й тестування

### Впровадження залежностей

ViewModel отримує сервіси через конструктор (тема 6), тому створити його в XAML уже не можна: об’єкти створює контейнер `ServiceCollection` у методі `OnStartup` класу `App`, а атрибут `StartupUri` з `App.xaml` видаляють.

**Навігацію** між сторінками також виконує ViewModel: властивість `CurrentPage` зберігає ViewModel поточної сторінки, `<ContentControl Content="{Binding CurrentPage}"/>` показує її, а неявні шаблони даних у ресурсах вікна (`<DataTemplate DataType="{x:Type vm:SettingsPageViewModel}">` з `UserControl` сторінки всередині) обирають View за типом. Команда лише присвоює `CurrentPage = new SettingsPageViewModel()`, і вміст вікна змінюється.

### Приклад «Список справ»

Рішення складається з трьох проєктів. Бібліотека `TodoApp.Core` (`net10.0`) містить модель, ViewModel і сховище й **не посилається на WPF**, тому тестовий проєкт не потребує `net10.0-windows`. Проєкти створено командами `dotnet new classlib`, `dotnet new wpf` і `dotnet new xunit3 -f net10.0` (шаблони xUnit.net v3 – тема 2); до бібліотеки додано пакет `CommunityToolkit.Mvvm`, до застосунку – `Microsoft.Extensions.DependencyInjection`.

Модель і ViewModel з атрибутами бібліотеки:

```cs
using CommunityToolkit.Mvvm.ComponentModel;

namespace TodoApp.Core;

public partial class TodoItem : ObservableObject
{
    [ObservableProperty]
    public partial string Title { get; set; } = "";

    [ObservableProperty]
    public partial bool IsDone { get; set; }
}

// Файл TodoViewModel.cs
using System.Collections.ObjectModel;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

namespace TodoApp.Core;

public partial class TodoViewModel(ITodoStore store)
    : ObservableObject
{
    public ObservableCollection<TodoItem> Items { get; } = [];

    [ObservableProperty]
    [NotifyCanExecuteChangedFor(nameof(AddCommand))]
    public partial string NewTitle { get; set; } = "";

    [RelayCommand(CanExecute = nameof(CanAdd))]
    private void Add()
    {
        Items.Add(new TodoItem { Title = NewTitle.Trim() });
        NewTitle = "";
    }

    private bool CanAdd() => !string.IsNullOrWhiteSpace(NewTitle);

    [RelayCommand]
    private void Remove(TodoItem item) => Items.Remove(item);

    [RelayCommand]
    private async Task LoadAsync(CancellationToken token)
    {
        Items.Clear();
        foreach (TodoItem item in await store.LoadAsync(token))
        {
            Items.Add(item);
        }
    }

    [RelayCommand]
    private Task SaveAsync(CancellationToken token) =>
        store.SaveAsync(Items, token);
}
```

Порівняно з ручною версією зникли базовий клас, поля команд, конструктор і виклик `RaiseCanExecuteChanged`. Сховище описано інтерфейсом `ITodoStore`; клас `JsonTodoStore(string path)` реалізує його методами `JsonSerializer.DeserializeAsync` і `SerializeAsync` над `FileStream` (якщо файлу ще немає, `LoadAsync` повертає порожній список). У застосунку `App.xaml` не має `StartupUri`, а `App.xaml.cs` реєструє сервіси, ViewModel і вікно:

```cs
// Файл ITodoStore.cs (бібліотека TodoApp.Core)
namespace TodoApp.Core;

public interface ITodoStore
{
    Task<List<TodoItem>> LoadAsync(CancellationToken token);
    Task SaveAsync(IEnumerable<TodoItem> items,
        CancellationToken token);
}

// Файл App.xaml.cs (застосунок TodoApp)
using System.IO;
using System.Windows;
using Microsoft.Extensions.DependencyInjection;
using TodoApp.Core;

namespace TodoApp;

public partial class App : Application
{
    private ServiceProvider? services;

    protected override void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);
        string file = Path.Combine(Environment.GetFolderPath(
            Environment.SpecialFolder.ApplicationData),
            "TodoApp", "todos.json");

        var collection = new ServiceCollection();
        collection.AddSingleton<ITodoStore>(new JsonTodoStore(file));
        collection.AddTransient<TodoViewModel>();
        collection.AddTransient<MainWindow>();
        services = collection.BuildServiceProvider();

        services.GetRequiredService<MainWindow>().Show();
    }
}
```

Конструктор вікна отримує ViewModel від контейнера, присвоює його `DataContext` і в обробнику `Loaded` виконує `viewModel.LoadCommand.Execute(null)`.

Заголовок вікна з `d:DataContext` наведено вище. Угорі вікна розміщено поле `{Binding NewTitle, UpdateSourceTrigger=PropertyChanged}` і кнопку *Add* (`IsDefault="True"`, `Command="{Binding AddCommand}"`), унизу – напис `{Binding Items.Count, StringFormat=Tasks: {0}}` і кнопку *Save* (`SaveCommand`), а посередині – список:

```xml
<ListBox ItemsSource="{Binding Items}"
         HorizontalContentAlignment="Stretch">
    <ListBox.ItemTemplate>
        <DataTemplate DataType="{x:Type core:TodoItem}">
            <DockPanel>
                <Button DockPanel.Dock="Right"
                    Content="Remove"
                    CommandParameter="{Binding}"
                    Command="{Binding
                        DataContext.RemoveCommand,
                        RelativeSource={RelativeSource
                        AncestorType=ListBox}}"/>
                <CheckBox IsChecked="{Binding IsDone}"
                          Content="{Binding Title}"
                          VerticalAlignment="Center"/>
            </DockPanel>
        </DataTemplate>
    </ListBox.ItemTemplate>
</ListBox>
```

Усередині шаблону контекстом даних є `TodoItem`, у якого немає `RemoveCommand`, тому кнопка шукає команду в `DataContext` предка `ListBox` через `RelativeSource`, а сам елемент передає в `CommandParameter="{Binding}"`. Після додавання двох справ напис показує `Tasks: 2`, а *Save* записує у файл `[{"Title":"Buy milk","IsDone":false},{"Title":"Read lecture 13","IsDone":true}]`; наступний запуск завантажує їх командою `LoadCommand`.

### Модульні тести ViewModel

ViewModel не створює вікон, тому тести викликають команди й перевіряють властивості. Замість файлу використовується фейкове сховище в пам’яті:

```cs
using TodoApp.Core;

namespace TodoApp.Tests;

public class TodoViewModelTests
{
    // Фейкове сховище: без файлів, дані в пам’яті.
    private class FakeStore : ITodoStore
    {
        public List<TodoItem> Saved { get; } = [];

        public Task<List<TodoItem>> LoadAsync(CancellationToken t) =>
            Task.FromResult(new List<TodoItem>
            {
                new() { Title = "Buy milk" },
                new() { Title = "Read lecture 13", IsDone = true }
            });

        public Task SaveAsync(IEnumerable<TodoItem> items,
            CancellationToken t)
        {
            Saved.AddRange(items);
            return Task.CompletedTask;
        }
    }

    private readonly FakeStore store = new();

    [Fact]
    public void AddCommand_AddsItemAndClearsTitle()
    {
        var vm = new TodoViewModel(store) { NewTitle = " Walk " };
        var changed = new List<string?>();
        vm.PropertyChanged += (s, e) => changed.Add(e.PropertyName);

        vm.AddCommand.Execute(null);

        TodoItem item = Assert.Single(vm.Items);
        Assert.Equal("Walk", item.Title);
        Assert.Equal("", vm.NewTitle);
        Assert.Contains(nameof(TodoViewModel.NewTitle), changed);
        Assert.False(vm.AddCommand.CanExecute(null));
    }
}
```

Асинхронну команду в тесті очікують методом `ExecuteAsync`. Клас містить ще три тести: `AddCommand_EmptyTitle_CannotExecute` (назва з пробілів), `LoadAndRemove_UpdateItems` (після `await vm.LoadCommand.ExecuteAsync(null)` і видалення першої справи залишається одна) і `SaveCommand_PassesItemsToStore` (перевіряє `store.Saved`). Команда `dotnet test` у папці рішення виводить (шлях скорочено):

```
…\TodoApp.Tests.dll (net10.0|x64) passed (4s 751ms)

Test run summary: Passed!
  total: 4
  failed: 0
  succeeded: 4
  skipped: 0
  duration: 6s 820ms
```

У Visual Studio ті самі тести запускає вікно *Test → Test Explorer* (рис. 13.12).

![Модульні тести ViewModel у Test Explorer](./images/12-vs-test-explorer-viewmodel.png)

Рис. 13.12. Модульні тести ViewModel у *Test Explorer* {.caption}
