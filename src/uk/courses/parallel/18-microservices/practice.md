---
title: "Практика"
description: "Тема 18. Архітектура мікросервісів: розібрані приклади"
outline: [2, 3]
---

# Практика

Усі приклади – рішення Aspire з проєктами AppHost і ServiceDefaults (шаблони `aspire-apphost` і `aspire-servicedefaults`, тема 17) та вебпроєктами або службами (`dotnet new web`, `dotnet new worker`). У файлах `launchSettings.json` залишено профіль `http` з фіксованим портом; запуск – `aspire start` у теці рішення, зупинка – `aspire stop`.

## Приклад 1. Хореографічна сага бронювання квитків

Створити застосунок бронювання місць на концерт із трьох сервісів, які координуються лише подіями RabbitMQ (хореографія, без оркестратора): `booking` приймає запит `POST /bookings` (місце, клієнт, сума) і відповідає `202 Accepted`; `seats` резервує одне з 10 місць або відхиляє бронювання; `payments` списує оплату (ліміт картки 1000 грн). Якщо оплата не пройшла, сервіс місць звільняє місце (компенсація). Стан бронювання клієнт отримує запитом `GET /bookings/{id}`. Перевірити успішне бронювання, зайняте місце, відмову оплати з компенсацією і трасування саги.

Рішення `Tickets`: `Tickets.AppHost`, `Tickets.ServiceDefaults`, бібліотека `Tickets.Messaging` (пакет `Aspire.RabbitMQ.Client` 13.5.4), вебпроєкт `Tickets.Booking` і служби `Tickets.Seats`, `Tickets.Payments` з посиланнями на `Tickets.Messaging` і `Tickets.ServiceDefaults`. Події саги (`Tickets.Messaging/Events.cs`):

```cs
namespace Tickets.Messaging;

// Події хореографічної саги бронювання квитка.
public record BookingCreated(Guid BookingId, int Seat,
    string Customer, decimal Amount);
public record SeatReserved(Guid BookingId, int Seat, decimal Amount);
public record SeatRejected(Guid BookingId, int Seat, string Reason);
public record PaymentSucceeded(Guid BookingId);
public record PaymentFailed(Guid BookingId, int Seat, string Reason);
public record SeatReleased(Guid BookingId, int Seat);
```

Невелика «шина подій» ховає подробиці RabbitMQ: ключ маршрутизації – ім’я типу події, кожен сервіс має власну кворумну чергу на кожен тип події (`seats.BookingCreated`, `booking.PaymentFailed` тощо), тому ту саму подію `PaymentFailed` незалежно отримують і `booking`, і `seats` (`Tickets.Messaging/EventBus.cs`):

```cs
using System.Text.Json;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace Tickets.Messaging;

// Мінімальна шина подій поверх RabbitMQ: обмінник topic, ключ
// маршрутизації – ім’я типу події, черга – «сервіс.подія».
public class EventBus(IConnection rabbit, ILogger<EventBus> log)
{
    const string Exchange = "tickets.events";
    readonly SemaphoreSlim gate = new(1, 1);
    IChannel? publisher;

    public async Task PublishAsync<T>(T message)
    {
        await gate.WaitAsync();
        try
        {
            publisher ??= await OpenAsync(confirms: true);
            await publisher.BasicPublishAsync(Exchange,
                typeof(T).Name, false,
                new BasicProperties { Persistent = true },
                JsonSerializer.SerializeToUtf8Bytes(message));
        }
        finally
        {
            gate.Release();
        }
        log.LogInformation("→ {Message}", message);
    }

    public async Task SubscribeAsync<T>(string service,
        Func<T, Task> handle, CancellationToken stop)
    {
        IChannel ch = await OpenAsync(confirms: false);
        string queue = $"{service}.{typeof(T).Name}";
        await ch.QueueDeclareAsync(queue, durable: true,
            exclusive: false, autoDelete: false,
            arguments: new Dictionary<string, object?>
                { ["x-queue-type"] = "quorum" },
            cancellationToken: stop);
        await ch.QueueBindAsync(queue, Exchange, typeof(T).Name,
            cancellationToken: stop);
        AsyncEventingBasicConsumer consumer = new(ch);
        consumer.ReceivedAsync += async (_, ea) =>
        {
            T message = JsonSerializer.Deserialize<T>(ea.Body.Span)!;
            log.LogInformation("← {Message}", message);
            try
            {
                await handle(message);
                await ch.BasicAckAsync(ea.DeliveryTag, false);
            }
            catch (Exception ex)
            {
                log.LogWarning("{Event}: {Error}", typeof(T).Name,
                    ex.Message);
                await ch.BasicNackAsync(ea.DeliveryTag, false, true);
            }
        };
        await ch.BasicConsumeAsync(queue, false, consumer, stop);
    }

    async Task<IChannel> OpenAsync(bool confirms)
    {
        IChannel ch = await rabbit.CreateChannelAsync(
            new CreateChannelOptions(confirms, confirms));
        await ch.ExchangeDeclareAsync(Exchange, ExchangeType.Topic,
            durable: true);
        return ch;
    }
}
```

Сервіс місць (`Tickets.Seats/Program.cs`):

```cs
using Tickets.Messaging;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.AddServiceDefaults();
builder.AddRabbitMQClient("rabbitmq");
builder.Services.AddSingleton<EventBus>();
builder.Services.AddHostedService<SeatsService>();
builder.Build().Run();

// Сервіс місць: резервує місце або відхиляє бронювання;
// на PaymentFailed знімає резерв (компенсувальна дія).
class SeatsService(EventBus bus, ILogger<SeatsService> log)
    : BackgroundService
{
    readonly Dictionary<int, Guid> taken = [];   // місце → бронювання
    readonly Lock sync = new();

    protected override async Task ExecuteAsync(CancellationToken stop)
    {
        await bus.SubscribeAsync<BookingCreated>("seats", async e =>
        {
            bool ok;
            lock (sync)
            {
                // Повторна доставка тієї самої події – не помилка.
                ok = e.Seat is >= 1 and <= 10 && (!taken.TryGetValue(
                    e.Seat, out Guid owner) || owner == e.BookingId);
                if (ok) taken[e.Seat] = e.BookingId;
            }
            if (ok)
                await bus.PublishAsync(new SeatReserved(e.BookingId,
                    e.Seat, e.Amount));
            else
                await bus.PublishAsync(new SeatRejected(e.BookingId,
                    e.Seat, "місце зайняте або не існує"));
        }, stop);

        await bus.SubscribeAsync<PaymentFailed>("seats", async e =>
        {
            bool released;
            lock (sync)
                released = taken.TryGetValue(e.Seat, out Guid owner)
                    && owner == e.BookingId && taken.Remove(e.Seat);
            if (released)
                await bus.PublishAsync(new SeatReleased(e.BookingId,
                    e.Seat));
            log.LogInformation("Вільних місць: {Free}",
                10 - taken.Count);
        }, stop);
    }
}
```

Платіжний сервіс (`Tickets.Payments/Program.cs`):

```cs
using Tickets.Messaging;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.AddServiceDefaults();
builder.AddRabbitMQClient("rabbitmq");
builder.Services.AddSingleton<EventBus>();
builder.Services.AddHostedService<PaymentsService>();
builder.Build().Run();

// Платіжний сервіс: реагує на SeatReserved, ліміт картки 1000 грн.
class PaymentsService(EventBus bus) : BackgroundService
{
    protected override Task ExecuteAsync(CancellationToken stop) =>
        bus.SubscribeAsync<SeatReserved>("payments", async e =>
        {
            await Task.Delay(200, stop);              // «банк»
            if (e.Amount <= 1000m)
                await bus.PublishAsync(
                    new PaymentSucceeded(e.BookingId));
            else
                await bus.PublishAsync(new PaymentFailed(e.BookingId,
                    e.Seat, "недостатньо коштів"));
        }, stop);
}
```

Сервіс бронювань (`Tickets.Booking/Program.cs`):

```cs
using System.Collections.Concurrent;
using Tickets.Messaging;

// Сервіс бронювань: приймає запит, публікує BookingCreated і
// відстежує результат саги за подіями інших сервісів.
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();
builder.AddRabbitMQClient("rabbitmq");
builder.Services.AddSingleton<EventBus>();
builder.Services.AddSingleton<ConcurrentDictionary<Guid, Booking>>();
builder.Services.AddHostedService<BookingEvents>();
WebApplication app = builder.Build();
app.MapDefaultEndpoints();

app.MapPost("/bookings", async (NewBooking req, EventBus bus,
    ConcurrentDictionary<Guid, Booking> bookings) =>
{
    Booking b = new(Guid.CreateVersion7(), req.Seat, req.Customer,
        req.Amount, "Pending", null);
    bookings[b.Id] = b;
    await bus.PublishAsync(new BookingCreated(b.Id, b.Seat,
        b.Customer, b.Amount));
    return Results.Accepted($"/bookings/{b.Id}", b); // сага триває
});

app.MapGet("/bookings/{id:guid}", (Guid id,
    ConcurrentDictionary<Guid, Booking> bookings) =>
    bookings.TryGetValue(id, out Booking? b)
        ? Results.Ok(b) : Results.NotFound());

app.Run();

record NewBooking(int Seat, string Customer, decimal Amount);
record Booking(Guid Id, int Seat, string Customer, decimal Amount,
    string Status, string? Reason);

// Кінцеві події саги змінюють стан бронювання.
class BookingEvents(EventBus bus,
    ConcurrentDictionary<Guid, Booking> bookings) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stop)
    {
        await bus.SubscribeAsync<SeatRejected>("booking",
            e => Set(e.BookingId, "Rejected", e.Reason), stop);
        await bus.SubscribeAsync<PaymentSucceeded>("booking",
            e => Set(e.BookingId, "Confirmed", null), stop);
        await bus.SubscribeAsync<PaymentFailed>("booking",
            e => Set(e.BookingId, "Cancelled", e.Reason), stop);
    }

    Task Set(Guid id, string status, string? reason)
    {
        if (bookings.TryGetValue(id, out Booking? b))
            bookings[id] = b with
                { Status = status, Reason = reason };
        return Task.CompletedTask;
    }
}
```

AppHost:

```cs
IDistributedApplicationBuilder builder =
    DistributedApplication.CreateBuilder(args);

var rabbitmq = builder.AddRabbitMQ("rabbitmq")
    .WithManagementPlugin()
    .WithContainerName("pro18-tickets-rabbitmq");

builder.AddProject<Projects.Tickets_Booking>("booking")
    .WithReference(rabbitmq).WaitFor(rabbitmq)
    .WithExternalHttpEndpoints();
builder.AddProject<Projects.Tickets_Seats>("seats")
    .WithReference(rabbitmq).WaitFor(rabbitmq);
builder.AddProject<Projects.Tickets_Payments>("payments")
    .WithReference(rabbitmq).WaitFor(rabbitmq);

builder.Build().Run();
```

Сценарій перевірки `book.ps1` надсилає чотири бронювання й для кожного опитує стан, доки сага не завершиться:

```powershell
# Чотири бронювання: успіх, зайняте місце, відмова оплати, повтор.
$api = "http://localhost:5200/bookings"
$requests = @(
    @{ seat = 5; customer = "olena"; amount = 450 },
    @{ seat = 5; customer = "petro"; amount = 450 },
    @{ seat = 7; customer = "ivan"; amount = 1500 },
    @{ seat = 7; customer = "maria"; amount = 600 }
)
foreach ($r in $requests) {
    $b = Invoke-RestMethod -Method Post $api `
        -ContentType "application/json" -Body ($r | ConvertTo-Json)
    $start = Get-Date
    do {                                # опитування стану саги
        Start-Sleep -Milliseconds 100
        $b = Invoke-RestMethod "$api/$($b.id)"
    } while ($b.status -eq "Pending")
    $ms = ((Get-Date) - $start).TotalMilliseconds
    "{0,-6} місце {1}: {2,-9} {3,5:F0} мс {4}" -f $b.customer,
        $b.seat, $b.status, $ms, $b.reason
}
```

```
olena  місце 5: Confirmed   352 мс
petro  місце 5: Rejected    107 мс місце зайняте або не існує
ivan   місце 7: Cancelled   239 мс недостатньо коштів
maria  місце 7: Confirmed   250 мс
```

Журнал сервісу місць (`aspire logs seats`; ідентифікатори скорочено до останніх чотирьох символів, частину полів пропущено) показує компенсацію для `ivan` і повторне використання місця 7:

```
← BookingCreated { BookingId = …2bbc, Seat = 5, … }
→ SeatReserved { BookingId = …2bbc, Seat = 5, Amount = 450 }
← BookingCreated { BookingId = …7add, Seat = 5, … }
→ SeatRejected { BookingId = …7add, Seat = 5, Reason = … }
← BookingCreated { BookingId = …5310, Seat = 7, … }
→ SeatReserved { BookingId = …5310, Seat = 7, Amount = 1500 }
← PaymentFailed { BookingId = …5310, Seat = 7, Reason = … }
→ SeatReleased { BookingId = …5310, Seat = 7 }
Вільних місць: 9
← BookingCreated { BookingId = …5201, Seat = 7, … }
→ SeatReserved { BookingId = …5201, Seat = 7, Amount = 600 }
```

Трасування бронювання `ivan` (`aspire otel spans --trace-id …`) містить 9 спанів у трьох сервісах: HTTP-запит (8 мс, бо клієнт отримує `202` одразу), публікацію `BookingCreated`, її обробку в `seats`, `SeatReserved` → `payments` (0,23 с разом з імітацією банку), `PaymentFailed` → `booking` і `seats`, `SeatReleased`. Контекст трасування переходить від події до події в заголовках повідомлень, тому весь «розмазаний» процес хореографії видно одним деревом.

Порівняння з оркестрованою сагою з лекції: тут немає центрального компонента, і новий учасник (наприклад, сервіс сповіщень) лише підписується на події. Зате логіку саги доводиться збирати з трьох сервісів, а стан зберігається лише в пам’яті: після перезапуску `booking` незавершені бронювання втрачаються, а публікація після зміни стану без Outbox може загубити подію. У виробничому коді стан зберігають у базі, а події публікують через Outbox.

## Приклад 2. API-шлюз з автентифікацією JWT, обмеженням частоти й агрегацією

Створити застосунок з двох сервісів (`students` – дані студента, `grades` – оцінки) і шлюзу YARP, який: пропускає до сервісів лише викладачів (роль `teacher` у токені JWT); надає ендпоінт агрегації `GET /api/students/{id}/card` (BFF), що паралельно викликає обидва сервіси й повертає картку студента; дозволяє студентові бачити лише власну картку (твердження `student_id`); обмежує кожного користувача 5 запитами за 10 с; повертає картку без оцінок (`degraded: true`), якщо сервіс оцінок недоступний або не відповів за 1 с. Токени для перевірки видати утилітою `dotnet user-jwts`.

Рішення `Uni`: `Uni.AppHost`, `Uni.ServiceDefaults`, вебпроєкти `Uni.Students`, `Uni.Grades`, `Uni.Gateway` (пакети `Yarp.ReverseProxy` 2.3.0, `Microsoft.Extensions.ServiceDiscovery.Yarp` 10.10.0, `Microsoft.AspNetCore.Authentication.JwtBearer` 10.0.12). Сервіси мають штучні затримки 150 і 250 мс, щоб було видно паралельність агрегації. `Uni.Students/Program.cs`:

```cs
// Сервіс студентів: дані з пам’яті, затримка імітує базу даних.
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();
WebApplication app = builder.Build();
app.MapDefaultEndpoints();

Dictionary<int, Student> students = new()
{
    [1] = new(1, "Олена Коваль", "КН-23"),
    [2] = new(2, "Петро Шевчук", "КН-23"),
};

app.MapGet("/students/{id:int}", async (int id) =>
{
    await Task.Delay(150);
    return students.TryGetValue(id, out Student? s)
        ? Results.Ok(s) : Results.NotFound();
});
app.Run();

record Student(int Id, string Name, string Group);
```

`Uni.Grades/Program.cs`:

```cs
// Сервіс оцінок: дані з пам’яті, затримка імітує базу даних.
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();
WebApplication app = builder.Build();
app.MapDefaultEndpoints();

Grade[] grades =
[
    new(1, "Паралельні обчислення", 92), new(1, "Бази даних", 85),
    new(2, "Паралельні обчислення", 74),
];

app.MapGet("/grades/{studentId:int}", async (int studentId) =>
{
    await Task.Delay(250);
    return grades.Where(g => g.StudentId == studentId);
});
app.Run();

record Grade(int StudentId, string Course, int Score);
```

Шлюз (`Uni.Gateway/Program.cs`):

```cs
using System.Diagnostics;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.RateLimiting;

// API-шлюз: JWT, обмеження частоти за користувачем, маршрутизація
// YARP і агрегація відповідей двох сервісів (BFF).
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();
builder.Services.AddAuthentication().AddJwtBearer(); // з конфігурації
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("student", p => p.RequireRole("student", "teacher"))
    .AddPolicy("teacher", p => p.RequireRole("teacher"));
builder.Services.AddRateLimiter(o =>
{
    o.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    // 5 запитів за 10 с на користувача (ім’я з токена).
    o.AddPolicy("per-user", ctx => RateLimitPartition
        .GetFixedWindowLimiter(ctx.User.Identity?.Name ?? "anonymous",
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 5, Window = TimeSpan.FromSeconds(10),
            }));
});
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"))
    .AddServiceDiscoveryDestinationResolver();
builder.Services.AddHttpClient("students",
    c => c.BaseAddress = new Uri("http://students"));
builder.Services.AddHttpClient("grades",
    c => c.BaseAddress = new Uri("http://grades"));

WebApplication app = builder.Build();
app.MapDefaultEndpoints();
app.UseAuthentication();
app.UseAuthorization();
app.UseRateLimiter();
app.MapReverseProxy();

// Агрегація: картка студента з двох сервісів, виклики паралельні.
app.MapGet("/api/students/{id:int}/card", async (int id,
    ClaimsPrincipal user, IHttpClientFactory http) =>
{
    // Студент бачить лише власну картку, викладач – будь-яку.
    if (!user.IsInRole("teacher")
        && user.FindFirstValue("student_id") != id.ToString())
        return Results.Forbid();
    Stopwatch clock = Stopwatch.StartNew();
    // Бюджет часу агрегації: 1 с на обидва виклики разом.
    using CancellationTokenSource budget =
        new(TimeSpan.FromSeconds(1));
    Task<JsonElement> student = http.CreateClient("students")
        .GetFromJsonAsync<JsonElement>($"/students/{id}",
            budget.Token);
    Task<JsonElement> grades = http.CreateClient("grades")
        .GetFromJsonAsync<JsonElement>($"/grades/{id}",
            budget.Token);
    try { await Task.WhenAll(student, grades); } catch { }
    if (!student.IsCompletedSuccessfully)
        return Results.Problem("сервіс студентів недоступний",
            statusCode: 502);
    return Results.Ok(new
    {
        student = student.Result,
        // Деградація: без оцінок, якщо їхній сервіс недоступний.
        grades = grades.IsCompletedSuccessfully
            ? grades.Result : (JsonElement?)null,
        degraded = !grades.IsCompletedSuccessfully,
        ms = clock.ElapsedMilliseconds,
    });
}).RequireAuthorization("student").RequireRateLimiting("per-user");

app.Run();
```

Маршрути YARP до сервісів доступні лише викладачам (політика `teacher`) і теж обмежені за користувачем (`Uni.Gateway/appsettings.json`, фрагмент):

```json
"ReverseProxy": {
  "Routes": {
    "students": {
      "ClusterId": "students",
      "AuthorizationPolicy": "teacher",
      "RateLimiterPolicy": "per-user",
      "Match": { "Path": "/api/students/{**rest}" },
      "Transforms": [ { "PathPattern": "/students/{**rest}" } ]
    },
    "grades": {
      "ClusterId": "grades",
      "AuthorizationPolicy": "teacher",
      "RateLimiterPolicy": "per-user",
      "Match": { "Path": "/api/grades/{**rest}" },
      "Transforms": [ { "PathPattern": "/grades/{**rest}" } ]
    }
  },
  "Clusters": {
    "students": {
      "Destinations": { "d1": { "Address": "http://students" } }
    },
    "grades": {
      "Destinations": { "d1": { "Address": "http://grades" } }
    }
  }
}
```

Маршрут агрегації `/api/students/{id:int}/card` конкретніший за маршрут YARP `/api/students/{**rest}`, тому маршрутизація ASP.NET Core вибирає власний обробник, а решту запитів `/api/students/…` передає проксі.

AppHost:

```cs
IDistributedApplicationBuilder builder =
    DistributedApplication.CreateBuilder(args);

var students = builder.AddProject<Projects.Uni_Students>("students");
var grades = builder.AddProject<Projects.Uni_Grades>("grades");
builder.AddProject<Projects.Uni_Gateway>("gateway")
    .WithReference(students).WithReference(grades)
    .WithExternalHttpEndpoints();

builder.Build().Run();
```

**Тестові токени.** Утиліта `dotnet user-jwts` з .NET SDK (<https://learn.microsoft.com/aspnet/core/security/authentication/jwt-authn>) створює ключ підпису в секретах користувача проєкту шлюзу, записує у `appsettings.Development.json` видавця й аудиторію та видає токен:

```powershell
cd Uni.Gateway
dotnet user-jwts create --name olena --role student `
    --claim student_id=1 -o token > ../olena.jwt
dotnet user-jwts create --name kovalenko --role teacher `
    -o token > ../teacher.jwt
```

Додана конфігурація (її читає `AddJwtBearer()` без параметрів):

```json
"Authentication": {
  "Schemes": {
    "Bearer": {
      "ValidAudiences": [ "http://localhost:5300" ],
      "ValidIssuer": "dotnet-user-jwts"
    }
  }
}
```

Такі токени підписано ключем розробника і придатні лише для середовища `Development`; у виробничій системі токени видає сервер ідентифікації (Microsoft Entra ID, Keycloak тощо), а шлюз лише перевіряє їх.

Сценарій перевірки `check.ps1`:

```powershell
# Перевірка шлюзу: автентифікація, авторизація, агрегація, ліміт.
$gw = "http://localhost:5300"
$olena = @{ Authorization = "Bearer $(Get-Content olena.jwt)" }
$teacher = @{ Authorization = "Bearer $(Get-Content teacher.jwt)" }
function Check($title, $url, $headers) {
    try {
        $r = Invoke-WebRequest $url -Headers $headers
        $j = $r.Content | ConvertFrom-Json
        $info = if ($j.student) {
            "{0}, оцінок: {1}, {2} мс" -f $j.student.name,
                @($j.grades).Count, $j.ms
        } else { "записів: $(@($j).Count)" }
        "{0,-20} {1} {2}" -f $title, $r.StatusCode, $info
    } catch {
        "{0,-20} {1}" -f $title,
            [int]$_.Exception.Response.StatusCode
    }
}
Check "без токена" "$gw/api/students/1/card" @{}
Check "olena, своя картка" "$gw/api/students/1/card" $olena
Check "olena, чужа картка" "$gw/api/students/2/card" $olena
Check "olena, /grades/2" "$gw/api/grades/2" $olena
Check "викладач, /grades/2" "$gw/api/grades/2" $teacher
1..4 | ForEach-Object {
    Check "olena, повтор $_" "$gw/api/students/1/card" $olena
}
```

```
без токена           401
olena, своя картка   200 Олена Коваль, оцінок: 2, 434 мс
olena, чужа картка   403
olena, /grades/2     403
викладач, /grades/2  200 записів: 1
olena, повтор 1      200 Олена Коваль, оцінок: 2, 257 мс
olena, повтор 2      200 Олена Коваль, оцінок: 2, 261 мс
olena, повтор 3      200 Олена Коваль, оцінок: 2, 259 мс
olena, повтор 4      429
```

- без токена шлюз відповів `401 Unauthorized`, не звертаючись до сервісів;
- студентка отримала власну картку і `403 Forbidden` для чужої картки та для маршруту `/api/grades/2` (лише для викладачів); викладач отримав оцінки через проксі;
- п’ятий запит до картки від `olena` за 10 с отримав `429`: запит до чужої картки теж врахувався, бо заборону повертає вже обробник після обмежувача, а запит до `/api/grades/2` – ні, бо його відхилила авторизація маршруту раніше;
- агрегація тривала ≈ 260 мс, тобто стільки, скільки довший із двох паралельних викликів (250 мс), а не їхня сума (400 мс); перший запит (434 мс) включав «прогрівання» з’єднань.

**Деградація.** Сценарій `card.ps1` запитує картку від імені викладача; сервіс оцінок зупинено командою `aspire resource grades stop`:

```powershell
# Час отримання картки студента викладачем (N запитів).
param([int]$Count = 3)
$h = @{ Authorization = "Bearer $(Get-Content teacher.jwt)" }
1..$Count | ForEach-Object {
    $clock = [Diagnostics.Stopwatch]::StartNew()
    try {
        $r = Invoke-RestMethod `
            http://localhost:5300/api/students/2/card -Headers $h
        "{0,5} мс (у шлюзі {1} мс), degraded = {2}" -f `
            $clock.ElapsedMilliseconds, $r.ms, $r.degraded
    } catch {
        "{0,5} мс, код {1}" -f $clock.ElapsedMilliseconds,
            [int]$_.Exception.Response.StatusCode
    }
}
```

```
  300 мс (у шлюзі 258 мс), degraded = False
  259 мс (у шлюзі 254 мс), degraded = False
(після aspire resource grades stop)
 1080 мс (у шлюзі 1012 мс), degraded = True
 1014 мс (у шлюзі 1010 мс), degraded = True
(після aspire resource students stop)
 1123 мс, код 502
```

Без сервісу оцінок картка повертається без оцінок через 1 с (бюджет часу агрегації), а без сервісу студентів, без якого картка не має сенсу, – помилка `502 Bad Gateway`. Перша версія шлюзу не мала бюджету `budget`, і та сама зупинка давала відповідь через **30 с**: з’єднання з зупиненим проєктом через проксі Aspire не відхиляється, а «висить», і спрацьовував лише тайм-аут усього виклику стандартного обробника стійкості (30 с). Агрегатор має власний, значно менший бюджет часу.

## Приклад 3. Стійкість: запобіжник, повтори й деградація до кешу Redis

Створити сервіс курсів валют `rates` з керованими збоями (`POST /chaos?failure=…&delayMs=…` задає частку відповідей 500 і затримку) і фронтенд-конвертер `front` (`GET /convert?from=USD&amount=100`), який викликає `rates` через власний конвеєр стійкості (тайм-аут усього виклику 1 с, 2 повтори, запобіжник, тайм-аут спроби 300 мс), зберігає останній успішний курс у Redis і в разі збою повертає його з позначкою `stale` та віком. Для порівняння передбачити клієнт без стійкості (`raw=true`). Створити навантажувальний клієнт і порівняти обидва клієнти за різних збоїв і після зупинки `rates`.

Рішення `Rates`: `Rates.AppHost` (пакет `Aspire.Hosting.Redis`), `Rates.ServiceDefaults`, вебпроєкти `Rates.Api` і `Rates.Front` (пакет `Aspire.StackExchange.Redis` 13.5.4), консольний `Rates.Load`. Сервіс курсів (`Rates.Api/Program.cs`):

```cs
// Сервіс курсів валют з керованими збоями (для експериментів).
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();
WebApplication app = builder.Build();
app.MapDefaultEndpoints();

Chaos chaos = new();
Dictionary<string, decimal> baseRates = new()
{
    ["USD"] = 41.2m, ["EUR"] = 47.9m, ["PLN"] = 11.2m,
};

app.MapGet("/rates/{code}", async (string code) =>
{
    if (chaos.DelayMs > 0) await Task.Delay(chaos.DelayMs);
    if (Random.Shared.NextDouble() < chaos.FailureRate)
        return Results.StatusCode(500);
    code = code.ToUpperInvariant();
    if (!baseRates.TryGetValue(code, out decimal r))
        return Results.NotFound();
    // Невелике «коливання» курсу.
    decimal noise = (decimal)(Random.Shared.NextDouble() - 0.5) / 10;
    decimal rate = r + noise;
    return Results.Ok(new Rate(code, Math.Round(rate, 4),
        DateTime.UtcNow));
});

// Керування збоями: частка помилок 500 і затримка відповіді.
app.MapPost("/chaos", (double failure, int delayMs) =>
{
    chaos.FailureRate = failure;
    chaos.DelayMs = delayMs;
    return Results.Ok(chaos);
});

app.Run();

record Rate(string Code, decimal Value, DateTime At);

class Chaos
{
    public double FailureRate { get; set; }
    public int DelayMs { get; set; }
}
```

Фронтенд (`Rates.Front/Program.cs`):

```cs
using System.Net;
using System.Text.Json;
using Microsoft.Extensions.Http.Resilience;
using Polly;
using Polly.CircuitBreaker;
using Polly.Timeout;
using StackExchange.Redis;

// Фронтенд конвертера валют: виклик сервісу rates через власний
// конвеєр стійкості, деградація до останнього курсу з Redis.
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();
builder.AddRedisClient("redis");            // IConnectionMultiplexer

#pragma warning disable EXTEXP0001
// Клієнт без стійкості – для порівняння. Після видалення
// стандартного обробника тайм-аут HttpClient нескінченний!
builder.Services.AddHttpClient("raw", c =>
    {
        c.BaseAddress = new Uri("http://rates");
        c.Timeout = TimeSpan.FromSeconds(10);
    })
    .RemoveAllResilienceHandlers();
// Клієнт із власним конвеєром Polly.
builder.Services.AddHttpClient("rates",
        c => c.BaseAddress = new Uri("http://rates"))
    .RemoveAllResilienceHandlers()
    .AddResilienceHandler("rates", p => p
        .AddTimeout(TimeSpan.FromSeconds(1))       // увесь виклик
        .AddRetry(new HttpRetryStrategyOptions
        {
            MaxRetryAttempts = 2,
            Delay = TimeSpan.FromMilliseconds(50),
            BackoffType = DelayBackoffType.Exponential,
            UseJitter = true,
        })
        .AddCircuitBreaker(new HttpCircuitBreakerStrategyOptions
        {
            FailureRatio = 0.5,
            MinimumThroughput = 10,
            SamplingDuration = TimeSpan.FromSeconds(5),
            BreakDuration = TimeSpan.FromSeconds(5),
        })
        .AddTimeout(TimeSpan.FromMilliseconds(300))); // одна спроба
#pragma warning restore EXTEXP0001

WebApplication app = builder.Build();
app.MapDefaultEndpoints();

app.MapGet("/convert", async (string from, decimal amount,
    bool? raw, IHttpClientFactory http, IConnectionMultiplexer redis,
    ILogger<Program> log) =>
{
    IDatabase cache = redis.GetDatabase();
    string key = $"rate:{from.ToUpperInvariant()}";
    try
    {
        HttpClient client =
            http.CreateClient(raw == true ? "raw" : "rates");
        Rate rate = (await client.GetFromJsonAsync<Rate>(
            $"/rates/{from}"))!;
        // Останній успішний курс – запасна відповідь на майбутнє.
        await cache.StringSetAsync(key,
            JsonSerializer.Serialize(rate));
        return Results.Ok(new Reply(amount * rate.Value, rate.Value,
            "fresh", 0));
    }
    catch (Exception ex) when (ex is HttpRequestException
        or TimeoutRejectedException or BrokenCircuitException
        or TaskCanceledException)
    {
        RedisValue cached = await cache.StringGetAsync(key);
        if (cached.IsNullOrEmpty)
            return Results.Problem("курс недоступний",
                statusCode: 503);
        Rate rate =
            JsonSerializer.Deserialize<Rate>(cached.ToString())!;
        double age = (DateTime.UtcNow - rate.At).TotalSeconds;
        log.LogWarning("Курс {Key} з кешу ({Age:F0} с): {Error}", key,
            age, ex.GetType().Name);
        return Results.Ok(new Reply(amount * rate.Value, rate.Value,
            "stale", Math.Round(age)));
    }
});

app.Run();

record Rate(string Code, decimal Value, DateTime At);
record Reply(decimal Result, decimal Rate, string Source,
    double AgeSec);
```

- `AddResilienceHandler("rates", …)` будує власний конвеєр Polly зі стратегіями в порядку додавання (ззовні всередину): тайм-аут усього виклику, повтори, запобіжник, тайм-аут однієї спроби. `HttpRetryStrategyOptions` і `HttpCircuitBreakerStrategyOptions` вже знають, які відповіді HTTP вважати тимчасовими (5xx, 408, 429, винятки мережі й тайм-аути);
- типовий обробник з ServiceDefaults спочатку видалено `RemoveAllResilienceHandlers()`;
- **знахідка перевірки**: після `RemoveAllResilienceHandlers()` властивість `HttpClient.Timeout` лишається нескінченною, бо стандартний обробник вимикає її, покладаючись на власний тайм-аут (перевірено окремою програмою: клієнт без обробника має `Timeout` 100 с, клієнт після видалення обробника – `-00:00:00.001`, тобто нескінченність). Перша версія клієнта `raw` без явного `Timeout` чекала відповіді від зупиненого сервісу 504 с. Тому `raw` отримав явний тайм-аут 10 с.

AppHost:

```cs
IDistributedApplicationBuilder builder =
    DistributedApplication.CreateBuilder(args);

var redis = builder.AddRedis("redis")
    .WithContainerName("pro18-rates-redis");
var rates = builder.AddProject<Projects.Rates_Api>("rates");
builder.AddProject<Projects.Rates_Front>("front")
    .WithReference(rates)
    .WithReference(redis).WaitFor(redis)
    .WithExternalHttpEndpoints();

builder.Build().Run();
```

Навантажувальний клієнт (`Rates.Load/Program.cs`):

```cs
using System.Diagnostics;
using System.Net.Http.Json;

Console.OutputEncoding = System.Text.Encoding.UTF8;
// Навантаження на /convert: N запитів у T задач; підсумок за
// джерелом відповіді (fresh, stale, помилка) і затримка.
if (args.Length < 1 || args.Contains("--help"))
{
    Console.Error.WriteLine("Використання: Rates.Load <url> " +
        "[запитів] [задач]");
    return 1;
}
string url = args[0];
int total = args.Length > 1 ? int.Parse(args[1]) : 200;
int tasks = args.Length > 2 ? int.Parse(args[2]) : 4;

using HttpClient http = new() { Timeout = TimeSpan.FromSeconds(150) };
List<(string Kind, double Ms)> results = [];
int next = 0;
Stopwatch clock = Stopwatch.StartNew();
await Task.WhenAll(Enumerable.Range(0, tasks).Select(async _ =>
{
    while (Interlocked.Increment(ref next) <= total)
    {
        long start = Stopwatch.GetTimestamp();
        string kind;
        try
        {
            using var resp = await http.GetAsync(url);
            kind = resp.IsSuccessStatusCode
                ? (await resp.Content
                    .ReadFromJsonAsync<Reply>())!.Source
                : "error";
        }
        catch (Exception ex) when (ex is HttpRequestException
            or TaskCanceledException) { kind = "error"; }
        double ms = Stopwatch.GetElapsedTime(start).TotalMilliseconds;
        lock (results) results.Add((kind, ms));
    }
}));

double[] sorted = [.. results.Select(r => r.Ms).Order()];
int Count(string k) => results.Count(r => r.Kind == k);
Console.WriteLine($"fresh {Count("fresh"),4}" +
    $"  stale {Count("stale"),4}" +
    $"  error {Count("error"),4}  сер. {sorted.Average(),6:F0} мс" +
    $"  p95 {sorted[(int)(sorted.Length * 0.95)],6:F0} мс" +
    $"  {total / clock.Elapsed.TotalSeconds,6:F0} зап./с");
return 0;

record Reply(string Source);
```

Експеримент: для кожного режиму збоїв (`POST http://localhost:5401/chaos`) після прогрівального запуску по 5 разів виконано `Rates.Load … 200 4` для клієнта зі стійкістю і без неї (`&raw=true`); у табл. 18.4 – медіани.

Таблиця 18.4. Відповіді конвертера (200 запитів, 4 задачі), медіана 5 запусків {.caption}

| **Збої `rates`** | **Клієнт** | **Свіжі** | **З кешу** | **Сер., мс** | **Зап./с** |
| --- | --- | --- | --- | --- | --- |
| немає | стійкий | 200 | 0 | 3 | 1109 |
|  | raw | 200 | 0 | 3 | 1129 |
| 30 % відповідей 500 | стійкий | 193 | 7 | 24 | 161 |
|  | raw | 134 | 66 | 3 | 1163 |
| 70 % відповідей 500 | стійкий | 0 | 200 | 3 | 1193 |
|  | raw | 68 | 132 | 3 | 1150 |
| затримка 500 мс | стійкий | 0 | 200 | 5 | 452 |
|  | raw | 200 | 0 | 513 | 8 |
| сервіс зупинено | стійкий | 0 | 200 | 3 | 1131 |
|  | raw<sup>\*</sup> | 0 | 8 | 10 053 | 0,4 |

<sup>\*</sup> Один запуск з 8 запитів: кожен чекав тайм-ауту 10 с.

- **30 % збоїв**: повтори перетворили 67 % свіжих відповідей на 96,5 %; ціна – середня затримка 24 мс замість 3 мс (затримки перед повторами) і менша пропускна здатність;
- **70 % збоїв**: частка невдалих спроб перевищила 50 %, запобіжник розімкнувся, і всі відповіді надходили з кешу за 3 мс. Клієнт `raw` отримував третину свіжих відповідей, але решту запитів (дві третини) все одно надсилав хворому сервісу, додаючи йому навантаження;
- **повільний сервіс** (500 мс): тайм-аут спроби 300 мс і запобіжник дали швидкі відповіді з кешу (5 мс, 452 запити за секунду), а `raw` чекав кожну відповідь 513 мс (8 запитів за секунду). Це свідомий вибір політики: краще трохи застарілий курс зараз, ніж свіжий через пів секунди;
- **зупинений сервіс**: стійкий клієнт після першого запуску (перший виклик чекав тайм-ауту 1 с, далі розімкнувся запобіжник) відповідав за 3 мс з кешу; `raw` чекав 10 с на кожен запит.

Після вимкнення збоїв (`failure=0`) запобіжник закривався після першого успішного пробного виклику: перший запуск дав 97 свіжих відповідей і 3 з кешу, наступні – лише свіжі. Після `aspire resource rates start` перший запуск ще отримав 99 відповідей з кешу, другий (через 2 с) – 100 свіжих.
