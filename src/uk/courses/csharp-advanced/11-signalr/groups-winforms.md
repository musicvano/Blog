---
title: "Групи, типізовані хаби та форми"
description: "Тема 11. Реальний час із SignalR: Групи, типізовані хаби та форми"
outline: [2, 3]
---

# Групи, типізовані хаби та форми

## Підключення, групи та строго типізовані хаби

### Контекст підключення

Властивість хабу `Context` описує підключення, яке викликало метод: `ConnectionId` – унікальний ідентифікатор, `User` – автентифікований користувач, `Items` – словник для даних підключення. Метод `Context.GetHttpContext()` повертає HTTP-контекст із рядком запиту та заголовками.

Методи `OnConnectedAsync` і `OnDisconnectedAsync(Exception? exception)` хабу викликаються після підключення клієнта та після його відключення (параметр містить виняток, якщо з’єднання розірвано через помилку). Їх перевизначають, щоб вести список учасників, надсилати привітання чи повідомляти інших про вихід.

У прикладах лекції ім’я користувача передається в **рядку запиту** (*query string*) адреси хабу: `/hubs/rooms?user=Olena`. Так ім’я не перевіряється: будь-хто може назватися будь-ким. Реальні застосунки використовують **автентифікацію** (файли cookie або токени JWT), атрибут `[Authorize]` на хабі та властивість `Context.User`, а `Clients.User(id)` надсилає повідомлення всім підключенням користувача (<https://learn.microsoft.com/aspnet/core/signalr/authn-and-authz>).

### Групи

**Група** (*group*) – іменований набір підключень: кімната чату, підписка на тему, столик у ресторані (<https://learn.microsoft.com/aspnet/core/signalr/groups>). Методи `Groups.AddToGroupAsync(connectionId, name)` і `Groups.RemoveFromGroupAsync(connectionId, name)` додають і вилучають підключення, а `Clients.Group(name)` надсилає повідомлення всім учасникам. Групи не потрібно створювати заздалегідь: група з’являється з першим учасником. Сервер не зберігає членство після відключення й не надає переліку груп чи їхніх учасників, тому такі дані, якщо вони потрібні, зберігають окремо.

### Строго типізований хаб

Ім’я методу клієнта в `SendAsync("ReceiveMessage", …)` – рядок, і помилку в ньому компілятор не виявить. **Строго типізований хаб** (*strongly typed hub*) `Hub<T>` замість рядків використовує інтерфейс `T` з методами клієнта: `Clients.All.ReceiveMessage(user, text)`. Кожен метод інтерфейсу повертає `Task`, а ім’я методу стає іменем повідомлення (суфікс `Async` не відкидається). Метод `SendAsync` у такому хабі недоступний.

Виняток, що виник у методі хабу, клієнт отримує з узагальненим повідомленням без подробиць, щоб не розкривати внутрішню інформацію сервера. Якщо текст помилки призначений клієнту, генерують `HubException`: його повідомлення передається клієнту без змін.

### Приклад «Чат із кімнатами»

Хаб `RoomHub` обслуговує кімнати: користувач підключається з іменем у рядку запиту, приєднується до кімнати (групи) та пише повідомлення лише її учасникам. Хаб строго типізований інтерфейсом `IRoomClient`. Відомості про користувачів зберігає служба-одинак `UserRegistry` на основі потокобезпечного словника `ConcurrentDictionary`, бо методи хабу для різних клієнтів виконуються паралельно:

```cs
using System.Collections.Concurrent;

public class ChatUser(string name)
{
    public string Name { get; } = name;
    public string? Room { get; set; }
}

// Singleton: живе весь час роботи сервера, на відміну від хабу.
public class UserRegistry
{
    private readonly ConcurrentDictionary<string, ChatUser> users =
        new();

    public int Count => users.Count;

    public void Add(string connectionId, string name) =>
        users[connectionId] = new ChatUser(name);

    public ChatUser Get(string connectionId) => users[connectionId];

    public ChatUser? Remove(string connectionId) =>
        users.TryRemove(connectionId, out ChatUser? user)
            ? user : null;
}
```

Хаб отримує реєстр і журнал (`ILogger`, тема 6) через первинний конструктор:

```cs
using Microsoft.AspNetCore.SignalR;

// Методи, які сервер викликає на клієнтах.
public interface IRoomClient
{
    Task ReceiveMessage(string user, string text);
    Task Notify(string text);
}

public class RoomHub(UserRegistry users, ILogger<RoomHub> logger)
    : Hub<IRoomClient>
{
    public override async Task OnConnectedAsync()
    {
        // Ім’я передано в рядку запиту: /hubs/rooms?user=Olena
        string? name =
            Context.GetHttpContext()?.Request.Query["user"];
        name = string.IsNullOrWhiteSpace(name)
            ? "Guest" : name.Trim();
        users.Add(Context.ConnectionId, name);
        logger.LogInformation("Connected: {User}", name);
        await Clients.Caller.Notify(
            $"Welcome, {name}! Users online: {users.Count}");
    }

    public override async Task OnDisconnectedAsync(
        Exception? exception)
    {
        ChatUser? user = users.Remove(Context.ConnectionId);
        if (user?.Room is not null)
        {
            await Clients.Group(user.Room)
                .Notify($"{user.Name} left {user.Room}");
        }
        logger.LogInformation("Disconnected: {User}", user?.Name);
    }

    public async Task JoinRoom(string room)
    {
        ChatUser user = users.Get(Context.ConnectionId);
        if (user.Room == room)
        {
            return;
        }
        if (user.Room is not null)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId,
                user.Room);
            await Clients.Group(user.Room)
                .Notify($"{user.Name} left {user.Room}");
        }
        await Groups.AddToGroupAsync(Context.ConnectionId, room);
        user.Room = room;
        logger.LogInformation("{User} joined group {Room}",
            user.Name, room);
        await Clients.OthersInGroup(room)
            .Notify($"{user.Name} joined {room}");
    }

    public async Task SendToRoom(string text)
    {
        ChatUser user = users.Get(Context.ConnectionId);
        if (user.Room is null)
        {
            // Текст HubException передається клієнту.
            throw new HubException("Join a room first");
        }
        await Clients.Group(user.Room)
            .ReceiveMessage(user.Name, text);
    }
}
```

Хаб розміщено в тому самому сервері `ChatServer`: у `Program.cs` після `AddSignalR()` додано `builder.Services.AddSingleton<UserRegistry>();`, а після першого `MapHub` – `app.MapHub<RoomHub>("/hubs/rooms");`. Для повідомлення про новачка використано `Clients.OthersInGroup`: сам новачок його не отримує.

## Клієнт Windows Forms

У застосунку з графічним інтерфейсом є важлива особливість: обробники `On` і події підключення (`Reconnecting`, `Reconnected`, `Closed`) SignalR викликає в **потоках пулу потоків**, а не в потоці інтерфейсу. Змінювати елементи керування з іншого потоку не можна (тема 5), тому код, що оновлює форму, передають у потік інтерфейсу методом `Control.InvokeAsync` (.NET 9+) або `BeginInvoke` (<https://learn.microsoft.com/dotnet/api/system.windows.forms.control.invokeasync>). Натомість код обробника кнопки після `await connection.StartAsync()` продовжується в потоці інтерфейсу, бо `await` повертається в контекст синхронізації форми.

### Приклад «Клієнт чату з кімнатами»

Форма `MainForm` (*SignalR Rooms*) містить угорі панель `FlowLayoutPanel` з написом *Name:*, полем `nameTextBox`, кнопкою `connectButton` (*Connect*), списком кімнат `roomComboBox` (`DropDownStyle = DropDownList`) і кнопкою `joinButton` (*Join*); у центрі – список `messagesListBox` (`Dock = Fill`); унизу – поле `messageTextBox` і кнопку `sendButton` (*Send*, `AcceptButton` форми); рядок стану `statusStrip` з написом `statusLabel`. Подію `FormClosing` форми підписано в конструкторі форм. Код форми:

```cs
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;

namespace RoomsClient;

public partial class MainForm : Form
{
    private const string HubUrl = "http://localhost:5110/hubs/rooms";
    private HubConnection? connection;
    private string? room;             // кімната, до якої приєдналися

    public MainForm()
    {
        InitializeComponent();
        roomComboBox.Items.AddRange("General", "Games", "Music");
        roomComboBox.SelectedIndex = 0;
        SetOnline(false, "Offline");
    }

    private async void connectButton_Click(object sender, EventArgs e)
    {
        string name = nameTextBox.Text.Trim();
        if (name.Length == 0)
        {
            MessageBox.Show("Enter your name", Text);
            return;
        }
        connection = new HubConnectionBuilder()
            .WithUrl($"{HubUrl}?user={Uri.EscapeDataString(name)}")
            .WithAutomaticReconnect()
            .Build();
        // Обробники On і події підключення викликаються в потоках
        // пулу, тому елементи форми змінюються через InvokeAsync.
        connection.On<string, string>("ReceiveMessage",
            (user, text) => AddLine($"{user}: {text}"));
        connection.On<string>("Notify", text => AddLine($"* {text}"));
        connection.Reconnecting += error =>
            InvokeAsync(() => SetOnline(false, "Reconnecting..."));
        connection.Reconnected += async connectionId =>
        {
            await InvokeAsync(() => SetOnline(true, "Online"));
            await JoinRoomAsync();    // нове підключення – без груп
        };
        connection.Closed += error =>
            InvokeAsync(() => SetOnline(false, "Offline"));
        try
        {
            connectButton.Enabled = nameTextBox.Enabled = false;
            await connection.StartAsync();
            SetOnline(true, "Online");   // після await – потік UI
        }
        catch (HttpRequestException ex)
        {
            connection = null;
            connectButton.Enabled = nameTextBox.Enabled = true;
            MessageBox.Show(ex.Message, Text);
        }
    }

    private async void joinButton_Click(object sender, EventArgs e)
    {
        room = (string)roomComboBox.SelectedItem!;
        await JoinRoomAsync();
        await AddLine($"* You are in {room}");
    }

    private async void sendButton_Click(object sender, EventArgs e)
    {
        if (connection is null || messageTextBox.Text.Length == 0)
        {
            return;
        }
        try
        {
            await connection.InvokeAsync("SendToRoom",
                messageTextBox.Text);
            messageTextBox.Clear();
        }
        catch (HubException ex)   // помилка, передана хабом
        {
            MessageBox.Show(ex.Message, Text);
        }
    }

    private async void MainForm_FormClosing(object sender,
        FormClosingEventArgs e)
    {
        if (connection is null)
        {
            return;
        }
        e.Cancel = true;             // спочатку закрити підключення
        HubConnection current = connection;
        connection = null;
        await current.DisposeAsync();
        Close();
    }

    private async Task JoinRoomAsync()
    {
        if (connection is not null && room is not null)
        {
            await connection.InvokeAsync("JoinRoom", room);
        }
    }

    private Task AddLine(string line) => InvokeAsync(() =>
    {
        messagesListBox.Items.Add(line);
        messagesListBox.TopIndex = messagesListBox.Items.Count - 1;
    });

    private void SetOnline(bool online, string status)
    {
        joinButton.Enabled = sendButton.Enabled = online;
        statusLabel.Text = status;
    }
}
```

Обробники `On` повертають `Task` від `InvokeAsync`: код, що змінює список, виконується в потоці інтерфейсу, а обробник завершується після оновлення форми. Під час закриття форми обробник `FormClosing` спочатку скасовує закриття, закриває підключення і лише потім закриває форму повторно: інакше подія `Closed` намагалася б оновити вже знищену форму.

Після запуску сервера та двох клієнтів Olena і Taras приєднуються до кімнати *General* і обмінюються повідомленнями (рис. 11.5). Список першого клієнта:

```
* Welcome, Olena! Users online: 1
* You are in General
* Taras joined General
Olena: Hi, Taras! Ready for the lab?
Taras: Almost, 5 minutes
```

Після закриття вікна Taras в Olena з’являється рядок `* Taras left General`. Спроба надіслати повідомлення до вибору кімнати показує `MessageBox` з текстом *Join a room first*, перед яким клієнт додає стандартний префікс з іменем методу `SendToRoom`. Журнал сервера містить записи категорії `RoomHub[0]` з текстом `Connected: Olena`, `Connected: Taras`, `Olena joined group General`, `Taras joined group General` і `Disconnected: Taras`.

![Два клієнти Windows Forms у кімнаті General і журнал сервера](./images/02-app-winforms-rooms.png)

Рис. 11.5. Два клієнти Windows Forms у кімнаті *General* і журнал сервера {.caption}
