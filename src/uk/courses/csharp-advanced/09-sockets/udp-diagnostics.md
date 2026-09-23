---
title: "UDP, помилки та діагностика"
description: "Тема 9. Мережні застосунки та сокети: UDP, помилки та діагностика"
outline: [2, 3]
---

# UDP, помилки та діагностика

## UDP і широкомовні повідомлення

Для UDP використовують клас `UdpClient` (<https://learn.microsoft.com/dotnet/api/system.net.sockets.udpclient>). Конструктор `new UdpClient(endPoint)` прив’язує сокет до адреси й порту; `SendAsync(bytes, endPoint)` надсилає дейтаграму; `ReceiveAsync(token)` чекає наступну дейтаграму й повертає `UdpReceiveResult` з байтами `Buffer` і адресою відправника `RemoteEndPoint`, на яку зручно відповідати. Одна операція надсилання – одна дейтаграма, тому межі повідомлень визначати не потрібно, але:

- дейтаграма може загубитися, отже важливі запити повторюють або чекають відповіді з тайм-аутом;
- розмір дейтаграми обмежений; повідомлення понад  1400 байтів можуть фрагментуватися й губитися частіше;
- у Windows надсилання на порт, який ніхто не слухає, може спричинити в наступному `ReceiveAsync` виняток `SocketException` з кодом `ConnectionReset`, тому його обробляють і продовжують цикл.

**Широкомовне повідомлення** (*broadcast*) на адресу `255.255.255.255` отримують усі комп’ютери локальної мережі, що слухають цей порт. Для надсилання потрібно встановити `EnableBroadcast = true`. Маршрутизатори такі повідомлення далі локальної мережі не передають. Типове застосування – **виявлення сервера** (*discovery*): клієнт не знає адреси сервера, надсилає запит усім, а сервер відповідає своєю адресою та портом.

### Приклад «Пошук сервера»

Сервер виявлення слухає UDP-порт 5070 і на запит `DISCOVER CHAT/1` відповідає рядком `CHAT/1 5055 <назва>`, тобто портом чату та його назвою. Необов’язковий аргумент задає локальну адресу, як у сервері чату.

```cs
using System.Net;
using System.Net.Sockets;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;
IPAddress local = args.Length > 0
    ? IPAddress.Parse(args[0]) : IPAddress.Any;

using var udp = new UdpClient(new IPEndPoint(local, 5070));
Console.WriteLine($"Очікування запитів: {udp.Client.LocalEndPoint}");

byte[] reply = Encoding.UTF8.GetBytes("CHAT/1 5055 Чат групи КН-25");
while (true)
{
    UdpReceiveResult request = await udp.ReceiveAsync();
    string text = Encoding.UTF8.GetString(request.Buffer);
    Console.WriteLine($"{request.RemoteEndPoint}: {text}");
    if (text == "DISCOVER CHAT/1")
    {
        await udp.SendAsync(reply, request.RemoteEndPoint);
    }
}
```

Клієнт тричі надсилає широкомовний запит і 2 с збирає відповіді. Тайм-аут задає `CancellationTokenSource(2000)`: коли час минає, `ReceiveAsync` спричиняє `OperationCanceledException`. Множина `HashSet` відкидає повторні відповіді на повторні запити.

```cs
using System.Net;
using System.Net.Sockets;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;
IPAddress local = args.Length > 0
    ? IPAddress.Parse(args[0]) : IPAddress.Any;

using var udp = new UdpClient(new IPEndPoint(local, 0));
udp.EnableBroadcast = true;       // дозволити широкомовне надсилання
byte[] request = Encoding.UTF8.GetBytes("DISCOVER CHAT/1");
var everyone = new IPEndPoint(IPAddress.Broadcast, 5070);

// Дейтаграма може загубитися, тому запит надсилається тричі.
for (int i = 0; i < 3; i++)
{
    await udp.SendAsync(request, everyone);
}
Console.WriteLine($"Запит надіслано на {everyone}");

var found = new HashSet<string>();
using var timeout = new CancellationTokenSource(2000);
try
{
    while (true)
    {
        UdpReceiveResult result =
            await udp.ReceiveAsync(timeout.Token);
        string[] parts = Encoding.UTF8.GetString(result.Buffer)
            .Split(' ', 3);
        if (parts.Length != 3 || parts[0] != "CHAT/1") continue;

        string server = $"{result.RemoteEndPoint.Address}:{parts[1]}";
        if (found.Add(server))
        {
            Console.WriteLine($"Знайдено «{parts[2]}» – {server}");
        }
    }
}
catch (OperationCanceledException)
{
    Console.WriteLine($"Пошук завершено, серверів: {found.Count}");
}
```

Результат, коли сервер і клієнт запущено з аргументом `127.0.0.1` (у локальній мережі без аргументу клієнт знайде сервери на інших комп’ютерах):

```
Запит надіслано на 255.255.255.255:5070
Знайдено «Чат групи КН-25» – 127.0.0.1:5055
Пошук завершено, серверів: 1
```

Журнал сервера містить три однакові рядки `127.0.0.1:63836: DISCOVER CHAT/1`; якщо сервер не запущено, клієнт виводить `Пошук завершено, серверів: 0`.

## Помилки, тайм-аути та безпека

### Винятки мережних операцій

Помилки сокетів повідомляються винятком `SocketException`; його властивість `SocketErrorCode` містить значення переліку `SocketError` (<https://learn.microsoft.com/dotnet/api/system.net.sockets.socketerror>) (табл. 9.3). Операції з `NetworkStream` загортають `SocketException` у `IOException`, а операції із закритим потоком спричиняють `ObjectDisposedException`.

Таблиця 9.3. Поширені коди помилок сокетів {.caption}

| **`SocketError`** | **Код** | **Типова причина** |
| --- | --- | --- |
| `ConnectionRefused` | 10061 | на адресі й порту ніхто не слухає: сервер не запущено, інший порт |
| `AddressAlreadyInUse` | 10048 | порт уже зайнятий іншою програмою або іншим екземпляром сервера |
| `TimedOut` | 10060 | комп’ютер недоступний або пакети блокує брандмауер |
| `ConnectionReset` | 10054 | співрозмовник аварійно закрив з’єднання; для UDP – порт отримувача закритий |
| `HostNotFound` | 11001 | DNS не знайшов ім’я комп’ютера |

Розрив з’єднання проявляється по-різному: коректне закриття – як кінець потоку (`ReadAsync` повертає 0, `ReadLineAsync` – `null`), аварійне – як `IOException`. Якщо ж кабель витягнуто або комп’ютер вимкнено, TCP може довго нічого не повідомляти: читання просто чекає.

### Тайм-аути та перевірка зв’язку

Щоб програма не чекала вічно, операції обмежують у часі токеном скасування:

```cs
using var timeout = new CancellationTokenSource(
    TimeSpan.FromSeconds(5));
await client.ConnectAsync("127.0.0.1", 5055, timeout.Token);
string? line = await reader.ReadLineAsync(timeout.Token);
```

Після скасування стан потоку невизначений (частину рядка могло бути прочитано), тому з’єднання закривають. Для довгих з’єднань без активності використовують **heartbeat**: клієнт періодично надсилає службове повідомлення (`PING`), а сервер відповідає `PONG` і закриває з’єднання, від якого давно нічого не надходило.

### Безпека

Сервер у мережі отримує дані від будь-кого, тому:

- **перевіряйте всі вхідні дані**: довжини, розміри, діапазони чисел, імена файлів (приклад «Передавання файлу»); не довіряйте значенням, які надіслав клієнт;
- **обмежуйте ресурси**: довжину рядка, кількість з’єднань, час бездіяльності. Метод `ReadLineAsync` читає рядок будь-якої довжини, тому в публічних серверах рядки читають із власним обмеженням;
- **шифруйте дані**: TCP передає байти відкритим текстом, і їх бачить кожен, хто має доступ до мережі. Для захищеного з’єднання потік обгортають класом `SslStream`, який реалізує протокол TLS: сервер викликає `AuthenticateAsServerAsync` із сертифікатом, клієнт – `AuthenticateAsClientAsync` з іменем сервера, а далі обмін іде через `SslStream`, як через звичайний потік (<https://learn.microsoft.com/dotnet/api/system.net.security.sslstream>);
- **не вигадуйте власного шифрування**: саморобні алгоритми майже завжди мають уразливості, тоді як TLS перевірено роками використання. Паролі не передають без TLS.

## Діагностика мережних застосунків

Коли клієнт не може підключитися, спочатку перевірте, чи слухає сервер потрібний порт. Командлет PowerShell `Get-NetTCPConnection` (<https://learn.microsoft.com/powershell/module/nettcpip/get-nettcpconnection>) показує з’єднання TCP, їх стан і ідентифікатор процесу (рис. 9.10). Для сервера чату з двома клієнтами:

```powershell
Get-NetTCPConnection -LocalPort 5055 |
    Format-Table LocalAddress, LocalPort, RemoteAddress,
        RemotePort, State, OwningProcess
```

Для сервера з двома клієнтами командлет виводить три рядки: один у стані `Listen` (сервер слухає, віддалена адреса `0.0.0.0:0`) і два в стані `Established` (встановлені з’єднання з портами клієнтів, наприклад 59 438 і 59 439), усі з тим самим `OwningProcess`. Інші інструменти:

- `netstat -ano | findstr :5055` – класична команда з тими самими даними (<https://learn.microsoft.com/windows-server/administration/windows-commands/netstat>);
- `Test-NetConnection 127.0.0.1 -Port 5055` – перевіряє, чи вдається підключитися до порту (властивість `TcpTestSucceeded`);
- *Resource Monitor* (`resmon`), вкладка *Network → Listening Ports* – порти, які слухають програми, і стан брандмауера для кожної з них;
- тимчасовий вивід у консоль сервера (як у прикладах) і точки зупинки у Visual Studio: під час зупинки на точці зупинки співрозмовник може отримати тайм-аут.

![Перегляд TCP-з’єднань сервера чату](./images/05-terminal-get-nettcpconnection.png)

Рис. 9.10. Перегляд TCP-з’єднань сервера чату {.caption}
