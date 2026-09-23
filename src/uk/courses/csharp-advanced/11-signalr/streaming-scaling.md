---
title: "Потоки, MessagePack і масштабування"
description: "Тема 11. Реальний час із SignalR: Потоки, MessagePack і масштабування"
outline: [2, 3]
---

# Потоки, MessagePack і масштабування

## Потокове передавання даних

Звичайний метод хабу повертає один результат після завершення. **Потоковий метод** (*streaming*) надсилає клієнту послідовність елементів у міру їх появи: прогрес тривалої операції, рядки журналу, результати пошуку (<https://learn.microsoft.com/aspnet/core/signalr/streaming>). Метод хабу стає потоковим, якщо повертає `IAsyncEnumerable<T>` або `ChannelReader<T>`. Найпростіше написати асинхронний ітератор з `yield return`. Параметр `CancellationToken` з атрибутом `[EnumeratorCancellation]` скасовується, коли клієнт припиняє читання потоку або відключається.

Передавання від клієнта до сервера теж можливе: метод хабу приймає параметр `IAsyncEnumerable<T>` або `ChannelReader<T>`.

### Приклад «Перебіг обробки»

Хаб `JobHub` (зареєстрований у сервері прикладу «Біржовий тікер») імітує тривале завдання і після кожного кроку повідомляє відсоток виконання:

```cs
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.SignalR;

public class JobHub(ILogger<JobHub> logger) : Hub
{
    // Потоковий метод: кожен yield return одразу йде клієнту.
    public async IAsyncEnumerable<int> RunJob(int steps,
        [EnumeratorCancellation] CancellationToken token)
    {
        logger.LogInformation("Job started: {Steps} steps", steps);
        for (int step = 1; step <= steps; step++)
        {
            await Task.Delay(500, token);   // імітація роботи
            yield return step * 100 / steps;
        }
        logger.LogInformation("Job finished");
    }
}
```

Клієнт читає потік методом `StreamAsync<T>` у циклі `await foreach`, а скасування маркера, переданого в `StreamAsync`, надсилає серверу повідомлення про скасування. Завдання скасовується, якщо користувач натиснув **Enter**:

```cs
using Microsoft.AspNetCore.SignalR.Client;

await using HubConnection connection = new HubConnectionBuilder()
    .WithUrl("http://localhost:5111/hubs/jobs")
    .Build();
await connection.StartAsync();

using var cts = new CancellationTokenSource();
// Enter під час виконання скасовує завдання.
_ = Task.Run(() => { Console.ReadLine(); cts.Cancel(); });

try
{
    IAsyncEnumerable<int> progress =
        connection.StreamAsync<int>("RunJob", 10, cts.Token);
    await foreach (int percent in progress)
    {
        Console.WriteLine($"Progress: {percent,3}%");
    }
    Console.WriteLine("Done");
}
catch (OperationCanceledException)
{
    Console.WriteLine("Cancelled");
}
```

Без втручання клієнт виводить десять рядків від `Progress: 10%` до `Progress: 100%` і `Done`, а сервер – `Job started: 10 steps` і `Job finished`. Якщо натиснути **Enter** приблизно через три секунди, клієнт виводить рядки від `Progress: 10%` до `Progress: 50%` і `Cancelled`. Цикл на сервері перервано винятком скасування в `Task.Delay`, тому рядок `Job finished` у журналі сервера не з’являється.

## MessagePack, JavaScript-клієнт, масштабування та діагностика

**MessagePack** – компактний двійковий формат серіалізації (<https://learn.microsoft.com/aspnet/core/signalr/messagepackhubprotocol>). Його підключають пакетом `Microsoft.AspNetCore.SignalR.Protocols.MessagePack` (10.0.12) на сервері й на клієнті. На сервері викликають `builder.Services.AddSignalR().AddMessagePackProtocol()`: JSON при цьому залишається доступним для інших клієнтів. У клієнті до будівника додають `.AddMessagePackProtocol()` (простір імен `Microsoft.Extensions.DependencyInjection`), і клієнт використовує лише цей протокол.

MessagePack чутливий до регістру імен властивостей, не зберігає `DateTime.Kind` (дати передають в UTC), суворіше перевіряє типи аргументів і серіалізує лише **відкриті** (`public`) типи. Клієнт тікера з MessagePack не виводив цін, доки запис `Quote` не оголосили як `public record`: помилка `Building dynamic formatter only allows public type` видна лише в журналі клієнта.

**JavaScript-клієнт** дає змогу підключити до того самого хабу вебсторінку. Бібліотеку `@microsoft/signalr` встановлюють через npm або CDN, а API подібний до .NET: `HubConnectionBuilder`, `withUrl`, `withAutomaticReconnect`, `on`, `invoke`, `start`. Сторінку можна роздати з папки `wwwroot` того самого сервера (`app.UseStaticFiles()`), а для сторінки з іншого домену потрібно налаштувати CORS (<https://learn.microsoft.com/aspnet/core/signalr/javascript-client>).

**Масштабування.** Підключення прив’язане до одного екземпляра сервера, тому кілька серверів за балансувальником навантаження обмінюються повідомленням через **об’єднувальну шину** (*backplane*) Redis або використовують керовану службу Azure SignalR Service (<https://learn.microsoft.com/aspnet/core/signalr/scale>).

**Діагностика.** Журнал сервера детальніше показує роботу SignalR, якщо в `appsettings.json` задати рівень `Debug` для категорій `Microsoft.AspNetCore.SignalR` і `Microsoft.AspNetCore.Http.Connections`. Параметр `AddSignalR(o => o.EnableDetailedErrors = true)` передає клієнтам текст звичайних винятків (лише для розробки). Клієнт .NET виводить журнал методом `ConfigureLogging(logging => logging.AddConsole())` (пакет `Microsoft.Extensions.Logging.Console`): у ньому видно узгодження, обраний транспорт і помилки десеріалізації. У браузері кадри WebSocket показує вкладка *Network* → фільтр *WS* → *Messages* засобів розробника (<https://learn.microsoft.com/aspnet/core/signalr/diagnostics>).
