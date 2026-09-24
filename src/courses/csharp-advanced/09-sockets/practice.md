---
title: "Practice"
description: "Topic 9. Networking and sockets: worked examples"
outline: [2, 3]
sourceHash: "4413290b46bab0534da25aeda5d8c7b2cb81a25d5d14ba57218f7a7522c77189"
---

# Practice

## Example 1. A time server

Create a TCP server that serves multiple clients simultaneously and executes the text commands `TIME` (current time), `DATE` (the date in English), and `QUIT` (end the session), as well as a general-purpose console client that connects to the server at the address and port given in command-line arguments.

The server (port 6060) starts a `ServeAsync` task for each client and does not wait for it to finish. Commands are case-insensitive, and the date is formatted with the `en-US` culture regardless of the computer's settings:

```cs
using System.Globalization;
using System.Net;
using System.Net.Sockets;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;
var en = CultureInfo.GetCultureInfo("en-US");

var listener = new TcpListener(IPAddress.Loopback, 6060);
listener.Start();
Console.WriteLine($"Time server is listening on {listener.LocalEndpoint}");

while (true)
{
    TcpClient client = await listener.AcceptTcpClientAsync();
    _ = ServeAsync(client);     // do not wait: accept the next one
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
            await writer.WriteLineAsync("Commands: TIME, DATE, QUIT");
            string? line;
            while ((line = await reader.ReadLineAsync()) != null)
            {
                string command = line.Trim().ToUpperInvariant();
                Console.WriteLine($"{remote}: {command}");
                DateTime now = DateTime.Now;
                string answer = command switch
                {
                    "TIME" => now.ToString("HH:mm:ss"),
                    "DATE" => now.ToString("dddd, MMMM d, yyyy", en),
                    "QUIT" => "Goodbye",
                    _ => $"Unknown command \"{command}\""
                };
                await writer.WriteLineAsync(answer);
                if (command == "QUIT") break;
            }
        }
        catch (IOException)
        {
            // The client broke the connection.
        }
        Console.WriteLine($"- {remote}");
    }
}
```

The call `_ = ServeAsync(client)` makes it explicit that the task result is not awaited. That is why all exceptions are handled inside `ServeAsync`: nobody would ever see an unhandled exception in such a task. The client prints the server's messages in a separate task, and in the main loop it sends the lines the user types. When input ends (**Ctrl+Z**, **Enter** on Windows), the client calls `Shutdown(SocketShutdown.Send)` and reads the remaining server responses:

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
    Console.Error.WriteLine($"Failed: {ex.SocketErrorCode}");
    return 1;
}

NetworkStream stream = client.GetStream();
var reader = new StreamReader(stream, Encoding.UTF8);
var writer = new StreamWriter(stream, new UTF8Encoding(false))
{
    AutoFlush = true,
    NewLine = "\n"
};

// A separate task prints everything the server sends.
Task receiving = Task.Run(async () =>
{
    string? line;
    while ((line = await reader.ReadLineAsync()) != null)
    {
        Console.WriteLine(line);
    }
    Console.WriteLine("[server closed the connection]");
});

string? input;
while ((input = Console.ReadLine()) != null && !receiving.IsCompleted)
{
    await writer.WriteLineAsync(input);
}
if (!receiving.IsCompleted)
{
    client.Client.Shutdown(SocketShutdown.Send); // no more requests
}
await receiving;
return 0;
```

A client session (the lines `time`, `DATE`, `hello`, `QUIT` were typed by the user):

```
Commands: TIME, DATE, QUIT
time
14:27:45
DATE
Thursday, September 17, 2026
hello
Unknown command "HELLO"
QUIT
Goodbye
[server closed the connection]
```

The server logs connections (`+ 127.0.0.1:61916`), each client's commands, and disconnections (`- 127.0.0.1:61916`); the commands of two simultaneously connected clients are interleaved.

If the server is not running, the client writes `Failed: ConnectionRefused` to the error stream and returns exit code 1.

## Example 2. A calculator server

Create a server that implements the CALC/1.0 protocol: after the greeting `100 CALC/1.0 ready`, the client must send `HELLO CALC/1.0`, after which the commands `ADD`, `SUB`, `MUL`, `DIV` with two numbers are executed. Every response starts with a status code (Table 9.2); a line longer than 100 characters closes the session. The client is the program from Example 1 with the arguments `127.0.0.1 6070`.

```cs
using System.Globalization;
using System.Net;
using System.Net.Sockets;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;

var listener = new TcpListener(IPAddress.Loopback, 6070);
listener.Start();
Console.WriteLine($"Calculator is listening on {listener.LocalEndpoint}");
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
            await writer.WriteLineAsync("100 CALC/1.0 ready");
            string? line;
            while ((line = await reader.ReadLineAsync()) != null)
            {
                string answer = session.Handle(line);
                await writer.WriteLineAsync(answer);
                // 221 and 413 end the session.
                if (answer[..3] is "221" or "413") break;
            }
        }
        catch (IOException)
        {
        }
        Console.WriteLine($"End of session, calculations: {session.Count}");
    }
}

class Session
{
    private bool greeted;               // state: whether HELLO was sent
    public int Count { get; private set; }

    public string Handle(string line)
    {
        if (line.Length > 100) return "413 line longer than 100";
        string[] p = line.Split(' ',
            StringSplitOptions.RemoveEmptyEntries);
        string command = p.Length > 0 ? p[0].ToUpperInvariant() : "";
        switch (command)
        {
            case "QUIT":
                return "221 goodbye";
            case "HELLO":
                if (p.Length != 2 || p[1] != "CALC/1.0")
                    return "505 only CALC/1.0 is supported";
                greeted = true;
                return "200 welcome";
            case "ADD" or "SUB" or "MUL" or "DIV":
                if (!greeted) return "403 send HELLO CALC/1.0 first";
                return Calculate(command, p);
            default:
                return $"404 unknown command \"{command}\"";
        }
    }

    private string Calculate(string command, string[] p)
    {
        var inv = CultureInfo.InvariantCulture;
        if (p.Length != 3)
            return $"400 format: {command} number number";
        var style = NumberStyles.Float;
        if (!double.TryParse(p[1], style, inv, out double a)
            || !double.TryParse(p[2], style, inv, out double b))
            return "401 numbers use a decimal point: 2.5";
        if (command == "DIV" && b == 0)
            return "402 division by zero";
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

The session state (whether the greeting was sent) and the calculation counter are stored in a `Session` object, separate for each client, so no synchronization is needed. The `Handle` method does not work with the network, so it is easy to cover with unit tests. Numbers are parsed with the invariant culture: `3,5` is rejected with code 401 even on a computer with Ukrainian settings, and the result is written with a decimal point. A session:

```
100 CALC/1.0 ready
ADD 2 3
403 send HELLO CALC/1.0 first
HELLO CALC/2.0
505 only CALC/1.0 is supported
HELLO CALC/1.0
200 welcome
add 2.5 4
200 6.5
DIV 1 0
402 division by zero
MUL 3,5 2
401 numbers use a decimal point: 2.5
SQRT 9
404 unknown command "SQRT"
SUB 10
400 format: SUB number number
DIV 22 7
200 3.142857142857143
QUIT
221 goodbye
[server closed the connection]
```

After `QUIT` the server logs `End of session, calculations: 2`.

## Example 3. A "Guess the number" game

Create a multiplayer game server: the server picks a number from 1 to 100, players send guesses and get the hints "Higher" or "Lower". The first player to guess scores a point, all players receive a message about the winner, and a new round begins. The `TOP` command prints the scoreboard. The client is the program from Example 1 with the arguments `127.0.0.1 6080`.

```cs
using System.Net;
using System.Net.Sockets;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;
// A seed from the argument makes the secret numbers reproducible.
Random random = args.Length > 0
    ? new Random(int.Parse(args[0])) : new Random();
var players = new List<Player>();
var gate = new object();              // protects players and secret
int secret = random.Next(1, 101);
Console.WriteLine($"Secret number: {secret}");

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
            await writer.WriteLineAsync("Your name:");
            string? name = (await reader.ReadLineAsync())?.Trim();
            if (name is null || name.Length is 0 or > 12) return;
            player = new Player(name, writer);
            lock (gate)
            {
                players.Add(player);
                Send(player, "Guess a number 1–100 (TOP – scoreboard)");
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

// Called only inside lock (gate).
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
        Send(player, "An integer from 1 to 100 is required");
        return;
    }
    player.Attempts++;
    if (guess != secret)
    {
        Send(player, guess < secret ? "Higher" : "Lower");
        return;
    }
    player.Wins++;
    string message = $"{player.Name} guesses {secret} " +
        $"on attempt {player.Attempts}. New round!";
    secret = random.Next(1, 101);
    Console.WriteLine($"{message} Secret number: {secret}");
    foreach (Player p in players)
    {
        p.Attempts = 0;
        Send(p, message);
    }
}

// Synchronous write under the lock: messages do not get interleaved.
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

The player list and the secret number are shared by all tasks, so every access to them happens inside `lock (gate)`. Messages are sent with a synchronous `WriteLine` under the same lock: a reply to a player and the victory broadcast do not get interleaved. This is acceptable for a teaching example, but a slow client delays everyone; in a real server each player has its own message queue. The command-line argument sets the **seed** of the `Random` generator: with seed 2026 the server picks 16, 29, 92…, which makes the check repeatable.

Sessions of two players who played at the same time (the server was started with `dotnet run -- 2026`). Olena:

```
Your name:
Olena
Guess a number 1–100 (TOP – scoreboard)
50
Lower
20
Lower
Taras guesses 16 on attempt 2. New round!
abc
An integer from 1 to 100 is required
50
Lower
29
Olena guesses 29 on attempt 2. New round!
[server closed the connection]
```

Taras:

```
Your name:
Taras
Guess a number 1–100 (TOP – scoreboard)
10
Higher
16
Taras guesses 16 on attempt 2. New round!
30
Lower
Olena guesses 29 on attempt 2. New round!
TOP
Olena         1
Taras         1
[server closed the connection]
```

Olena received the line about Taras's victory between her own guesses: it was sent by the other player's task.
