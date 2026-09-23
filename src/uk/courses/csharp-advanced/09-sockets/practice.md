---
title: "Практика"
description: "Тема 9. Мережні застосунки та сокети: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Сервер точного часу

Створити TCP-сервер, який одночасно обслуговує кількох клієнтів і виконує текстові команди `TIME` (поточний час), `DATE` (дата українською) і `QUIT` (завершення сесії), а також універсальний консольний клієнт, який підключається до сервера за адресою й портом з аргументів командного рядка.

Сервер (порт 6060) для кожного клієнта запускає задачу `ServeAsync` і не чекає її завершення. Команди не залежать від регістру, а дата форматується з культурою `uk-UA` незалежно від налаштувань комп’ютера:

```cs
using System.Globalization;
using System.Net;
using System.Net.Sockets;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;
var uk = CultureInfo.GetCultureInfo("uk-UA");

var listener = new TcpListener(IPAddress.Loopback, 6060);
listener.Start();
Console.WriteLine($"Сервер часу слухає {listener.LocalEndpoint}");

while (true)
{
    TcpClient client = await listener.AcceptTcpClientAsync();
    _ = ServeAsync(client);     // не чекати: приймати наступного
}

async Task ServeAsync(TcpClient client)
{
    using (client)
    {
        EndPoint? remote = client.Client.RemoteEndPoint;
        Console.WriteLine($"+ {remote}");
        NetworkStream stream = client.GetStream();
        var reader = new StreamReader(stream, Encoding.UTF8);
        var writer = new StreamWriter(stream, new UTF8Encoding(false))
        {
            AutoFlush = true,
            NewLine = "\n"
        };
        try
        {
            await writer.WriteLineAsync("Команди: TIME, DATE, QUIT");
            string? line;
            while ((line = await reader.ReadLineAsync()) != null)
            {
                string command = line.Trim().ToUpperInvariant();
                Console.WriteLine($"{remote}: {command}");
                DateTime now = DateTime.Now;
                string answer = command switch
                {
                    "TIME" => now.ToString("HH:mm:ss"),
                    "DATE" => now.ToString("dddd, d MMMM yyyy", uk),
                    "QUIT" => "До побачення",
                    _ => $"Невідома команда «{command}»"
                };
                await writer.WriteLineAsync(answer);
                if (command == "QUIT") break;
            }
        }
        catch (IOException)
        {
            // Клієнт розірвав з’єднання.
        }
        Console.WriteLine($"- {remote}");
    }
}
```

Виклик `_ = ServeAsync(client)` явно показує, що результат задачі не очікується. Тому всі винятки обробляються всередині `ServeAsync`: необроблений виняток у такій задачі ніхто б не побачив. Клієнт виводить повідомлення сервера в окремій задачі, а в основному циклі надсилає рядки, введені користувачем. Коли введення завершено (**Ctrl+Z**, **Enter** у Windows), клієнт викликає `Shutdown(SocketShutdown.Send)` і дочитує відповіді сервера:

```cs
using System.Net.Sockets;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;
string host = args.Length > 0 ? args[0] : "127.0.0.1";
int port = args.Length > 1 ? int.Parse(args[1]) : 6060;

using var client = new TcpClient();
try
{
    await client.ConnectAsync(host, port);
}
catch (SocketException ex)
{
    Console.Error.WriteLine($"Не вдалося: {ex.SocketErrorCode}");
    return 1;
}

NetworkStream stream = client.GetStream();
var reader = new StreamReader(stream, Encoding.UTF8);
var writer = new StreamWriter(stream, new UTF8Encoding(false))
{
    AutoFlush = true,
    NewLine = "\n"
};

// Окрема задача виводить усе, що надсилає сервер.
Task receiving = Task.Run(async () =>
{
    string? line;
    while ((line = await reader.ReadLineAsync()) != null)
    {
        Console.WriteLine(line);
    }
    Console.WriteLine("[сервер закрив з’єднання]");
});

string? input;
while ((input = Console.ReadLine()) != null && !receiving.IsCompleted)
{
    await writer.WriteLineAsync(input);
}
if (!receiving.IsCompleted)
{
    client.Client.Shutdown(SocketShutdown.Send); // кінець запитів
}
await receiving;
return 0;
```

Сесія клієнта (рядки `time`, `DATE`, `hello`, `QUIT` введено користувачем):

```
Команди: TIME, DATE, QUIT
time
14:27:45
DATE
четвер, 17 вересня 2026
hello
Невідома команда «HELLO»
QUIT
До побачення
[сервер закрив з’єднання]
```

Сервер виводить у журнал підключення (`+ 127.0.0.1:61916`), команди кожного клієнта і відключення (`- 127.0.0.1:61916`); команди двох одночасно підключених клієнтів чергуються.

Якщо сервер не запущено, клієнт виводить у потік помилок `Не вдалося: ConnectionRefused` і повертає код завершення 1.

## Приклад 2. Сервер-калькулятор

Створити сервер, що реалізує протокол CALC/1.0: після привітання `100 CALC/1.0 готовий` клієнт має надіслати `HELLO CALC/1.0`, після чого виконуються команди `ADD`, `SUB`, `MUL`, `DIV` з двома числами. Кожна відповідь починається з коду стану (табл. 9.2); рядок, довший за 100 символів, закриває сесію. Клієнт – програма з прикладу 1 з аргументами `127.0.0.1 6070`.

```cs
using System.Globalization;
using System.Net;
using System.Net.Sockets;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;

var listener = new TcpListener(IPAddress.Loopback, 6070);
listener.Start();
Console.WriteLine($"Калькулятор слухає {listener.LocalEndpoint}");
while (true)
{
    TcpClient client = await listener.AcceptTcpClientAsync();
    _ = ServeAsync(client);
}

static async Task ServeAsync(TcpClient client)
{
    using (client)
    {
        NetworkStream stream = client.GetStream();
        var reader = new StreamReader(stream, Encoding.UTF8);
        var writer = new StreamWriter(stream, new UTF8Encoding(false))
        {
            AutoFlush = true,
            NewLine = "\n"
        };
        var session = new Session();
        try
        {
            await writer.WriteLineAsync("100 CALC/1.0 готовий");
            string? line;
            while ((line = await reader.ReadLineAsync()) != null)
            {
                string answer = session.Handle(line);
                await writer.WriteLineAsync(answer);
                // 221 і 413 завершують сесію.
                if (answer[..3] is "221" or "413") break;
            }
        }
        catch (IOException)
        {
        }
        Console.WriteLine($"Кінець сесії, обчислень {session.Count}");
    }
}

class Session
{
    private bool greeted;               // стан: чи було HELLO
    public int Count { get; private set; }

    public string Handle(string line)
    {
        if (line.Length > 100) return "413 рядок довший за 100";
        string[] p = line.Split(' ',
            StringSplitOptions.RemoveEmptyEntries);
        string command = p.Length > 0 ? p[0].ToUpperInvariant() : "";
        switch (command)
        {
            case "QUIT":
                return "221 до побачення";
            case "HELLO":
                if (p.Length != 2 || p[1] != "CALC/1.0")
                    return "505 підтримується лише CALC/1.0";
                greeted = true;
                return "200 вітаю";
            case "ADD" or "SUB" or "MUL" or "DIV":
                if (!greeted) return "403 спочатку HELLO CALC/1.0";
                return Calculate(command, p);
            default:
                return $"404 невідома команда «{command}»";
        }
    }

    private string Calculate(string command, string[] p)
    {
        var inv = CultureInfo.InvariantCulture;
        if (p.Length != 3)
            return $"400 формат: {command} число число";
        var style = NumberStyles.Float;
        if (!double.TryParse(p[1], style, inv, out double a)
            || !double.TryParse(p[2], style, inv, out double b))
            return "401 числа записуються з крапкою: 2.5";
        if (command == "DIV" && b == 0)
            return "402 ділення на нуль";
        Count++;
        double result = command switch
        {
            "ADD" => a + b,
            "SUB" => a - b,
            "MUL" => a * b,
            _ => a / b
        };
        return "200 " + result.ToString(inv);
    }
}
```

Стан сесії (чи було привітання) і лічильник обчислень зберігає об’єкт `Session`, окремий для кожного клієнта, тому синхронізація не потрібна. Метод `Handle` не працює з мережею, отже його легко перевірити модульними тестами. Числа розбираються з інваріантною культурою: `3,5` відхиляється з кодом 401 навіть на комп’ютері з українськими налаштуваннями, а результат записується з крапкою. Сесія:

```
100 CALC/1.0 готовий
ADD 2 3
403 спочатку HELLO CALC/1.0
HELLO CALC/2.0
505 підтримується лише CALC/1.0
HELLO CALC/1.0
200 вітаю
add 2.5 4
200 6.5
DIV 1 0
402 ділення на нуль
MUL 3,5 2
401 числа записуються з крапкою: 2.5
SQRT 9
404 невідома команда «SQRT»
SUB 10
400 формат: SUB число число
DIV 22 7
200 3.142857142857143
QUIT
221 до побачення
[сервер закрив з’єднання]
```

Після `QUIT` сервер виводить у журнал `Кінець сесії, обчислень 2`.

## Приклад 3. Гра «Вгадай число»

Створити сервер гри для кількох гравців: сервер загадує число від 1 до 100, гравці надсилають спроби й отримують підказки «Більше» або «Менше». Перший, хто вгадав, отримує очко, усі гравці отримують повідомлення про переможця, і починається новий раунд. Команда `TOP` виводить таблицю результатів. Клієнт – програма з прикладу 1 з аргументами `127.0.0.1 6080`.

```cs
using System.Net;
using System.Net.Sockets;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;
// Зерно з аргументу робить загадані числа відтворюваними.
Random random = args.Length > 0
    ? new Random(int.Parse(args[0])) : new Random();
var players = new List<Player>();
var gate = new object();              // захищає players і secret
int secret = random.Next(1, 101);
Console.WriteLine($"Загадано {secret}");

var listener = new TcpListener(IPAddress.Loopback, 6080);
listener.Start();
while (true)
{
    TcpClient client = await listener.AcceptTcpClientAsync();
    _ = PlayAsync(client);
}

async Task PlayAsync(TcpClient client)
{
    using (client)
    {
        NetworkStream stream = client.GetStream();
        var reader = new StreamReader(stream, Encoding.UTF8);
        var writer = new StreamWriter(stream, new UTF8Encoding(false))
        {
            AutoFlush = true,
            NewLine = "\n"
        };
        Player? player = null;
        try
        {
            await writer.WriteLineAsync("Ваше ім’я:");
            string? name = (await reader.ReadLineAsync())?.Trim();
            if (name is null || name.Length is 0 or > 12) return;
            player = new Player(name, writer);
            lock (gate)
            {
                players.Add(player);
                Send(player, "Вгадайте число 1–100 (TOP – таблиця)");
            }
            string? line;
            while ((line = await reader.ReadLineAsync()) != null)
            {
                lock (gate)
                {
                    Handle(player, line.Trim());
                }
            }
        }
        catch (IOException)
        {
        }
        finally
        {
            lock (gate)
            {
                if (player != null) players.Remove(player);
            }
        }
    }
}

// Викликається лише всередині lock (gate).
void Handle(Player player, string line)
{
    if (line.Equals("TOP", StringComparison.OrdinalIgnoreCase))
    {
        foreach (Player p in players.OrderByDescending(p => p.Wins))
        {
            Send(player, $"{p.Name,-12}{p.Wins,3}");
        }
        return;
    }
    if (!int.TryParse(line, out int guess) || guess is < 1 or > 100)
    {
        Send(player, "Потрібне ціле число від 1 до 100");
        return;
    }
    player.Attempts++;
    if (guess != secret)
    {
        Send(player, guess < secret ? "Більше" : "Менше");
        return;
    }
    player.Wins++;
    string message = $"{player.Name} вгадує {secret} " +
        $"зі спроби {player.Attempts}. Новий раунд!";
    secret = random.Next(1, 101);
    Console.WriteLine($"{message} Загадано {secret}");
    foreach (Player p in players)
    {
        p.Attempts = 0;
        Send(p, message);
    }
}

// Синхронний запис під lock: повідомлення не перемішуються.
static void Send(Player player, string text)
{
    try
    {
        player.Writer.WriteLine(text);
    }
    catch (Exception ex)
        when (ex is IOException or ObjectDisposedException)
    {
    }
}

class Player(string name, StreamWriter writer)
{
    public string Name { get; } = name;
    public StreamWriter Writer { get; } = writer;
    public int Wins { get; set; }
    public int Attempts { get; set; }
}
```

Список гравців і загадане число спільні для всіх задач, тому кожне звернення до них виконується всередині `lock (gate)`. Повідомлення надсилаються синхронним `WriteLine` під тим самим блокуванням: відповідь гравцю і розсилка про перемогу не перемішуються. Для навчального прикладу це прийнятно, але повільний клієнт затримує всіх; у справжньому сервері кожен гравець має власну чергу повідомлень. Аргумент командного рядка задає **зерно** (*seed*) генератора `Random`: із зерном 2026 сервер загадує 16, 29, 92…, що дозволяє повторювати перевірку.

Сесії двох гравців, які грали одночасно (сервер запущено командою `dotnet run -- 2026`). Олена:

```
Ваше ім’я:
Олена
Вгадайте число 1–100 (TOP – таблиця)
50
Менше
20
Менше
Тарас вгадує 16 зі спроби 2. Новий раунд!
abc
Потрібне ціле число від 1 до 100
50
Менше
29
Олена вгадує 29 зі спроби 2. Новий раунд!
[сервер закрив з’єднання]
```

Тарас:

```
Ваше ім’я:
Тарас
Вгадайте число 1–100 (TOP – таблиця)
10
Більше
16
Тарас вгадує 16 зі спроби 2. Новий раунд!
30
Менше
Олена вгадує 29 зі спроби 2. Новий раунд!
TOP
Олена         1
Тарас         1
[сервер закрив з’єднання]
```

Рядок про перемогу Тараса Олена отримала між своїми спробами: його надіслала задача іншого гравця.
