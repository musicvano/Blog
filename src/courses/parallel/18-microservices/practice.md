---
title: "Practice"
description: "Topic 18. Microservice architecture: worked examples"
outline: [2, 3]
sourceHash: "822851a9f223ead7e2094cd2b182b87639872a4a7f27319acbc7811b92638f15"
---

# Practice

All examples are Aspire solutions with AppHost and ServiceDefaults projects (the `aspire-apphost` and `aspire-servicedefaults` templates, Topic 17) and web projects or services (`dotnet new web`, `dotnet new worker`). In the `launchSettings.json` files, the `http` profile with a fixed port is kept; run with `aspire start` in the solution folder, and stop with `aspire stop`.

## Example 1. A choreographed ticket booking saga

Create an application for booking concert seats with three services that coordinate only through RabbitMQ events (choreography, without an orchestrator): `booking` accepts a `POST /bookings` request (seat, customer, amount) and responds with `202 Accepted`; `seats` reserves one of 10 seats or rejects the booking; `payments` charges the payment (a card limit of 1000 UAH). If the payment fails, the seat service releases the seat (compensation). The client gets the booking state with a `GET /bookings/{id}` request. Check a successful booking, a taken seat, a declined payment with compensation, and the saga's trace.

The `Tickets` solution: `Tickets.AppHost`, `Tickets.ServiceDefaults`, a `Tickets.Messaging` library (the `Aspire.RabbitMQ.Client` 13.5.4 package), a `Tickets.Booking` web project, and the `Tickets.Seats` and `Tickets.Payments` services with references to `Tickets.Messaging` and `Tickets.ServiceDefaults`. The saga events (`Tickets.Messaging/Events.cs`):

```cs
namespace Tickets.Messaging;

// Events of the choreographed ticket booking saga.
public record BookingCreated(Guid BookingId, int Seat,
    string Customer, decimal Amount);
public record SeatReserved(Guid BookingId, int Seat, decimal Amount);
public record SeatRejected(Guid BookingId, int Seat, string Reason);
public record PaymentSucceeded(Guid BookingId);
public record PaymentFailed(Guid BookingId, int Seat, string Reason);
public record SeatReleased(Guid BookingId, int Seat);
```

A small “event bus” hides the details of RabbitMQ: the routing key is the name of the event type, and each service has its own quorum queue for each event type (`seats.BookingCreated`, `booking.PaymentFailed`, and so on), so the same `PaymentFailed` event is received independently by both `booking` and `seats` (`Tickets.Messaging/EventBus.cs`):

```cs
using System.Text.Json;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace Tickets.Messaging;

// A minimal event bus on top of RabbitMQ: a topic exchange, the
// routing key is the event type name, and the queue is "service.event".
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

The seat service (`Tickets.Seats/Program.cs`):

```cs
using Tickets.Messaging;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.AddServiceDefaults();
builder.AddRabbitMQClient("rabbitmq");
builder.Services.AddSingleton<EventBus>();
builder.Services.AddHostedService<SeatsService>();
builder.Build().Run();

// The seat service: reserves a seat or rejects the booking;
// on PaymentFailed, it releases the reservation (a compensating action).
class SeatsService(EventBus bus, ILogger<SeatsService> log)
    : BackgroundService
{
    readonly Dictionary<int, Guid> taken = [];   // seat → booking
    readonly Lock sync = new();

    protected override async Task ExecuteAsync(CancellationToken stop)
    {
        await bus.SubscribeAsync<BookingCreated>("seats", async e =>
        {
            bool ok;
            lock (sync)
            {
                // A redelivery of the same event is not an error.
                ok = e.Seat is >= 1 and <= 10 && (!taken.TryGetValue(
                    e.Seat, out Guid owner) || owner == e.BookingId);
                if (ok) taken[e.Seat] = e.BookingId;
            }
            if (ok)
                await bus.PublishAsync(new SeatReserved(e.BookingId,
                    e.Seat, e.Amount));
            else
                await bus.PublishAsync(new SeatRejected(e.BookingId,
                    e.Seat, "seat is taken or does not exist"));
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
            log.LogInformation("Free seats: {Free}",
                10 - taken.Count);
        }, stop);
    }
}
```

The payment service (`Tickets.Payments/Program.cs`):

```cs
using Tickets.Messaging;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.AddServiceDefaults();
builder.AddRabbitMQClient("rabbitmq");
builder.Services.AddSingleton<EventBus>();
builder.Services.AddHostedService<PaymentsService>();
builder.Build().Run();

// The payment service: reacts to SeatReserved, card limit 1000 UAH.
class PaymentsService(EventBus bus) : BackgroundService
{
    protected override Task ExecuteAsync(CancellationToken stop) =>
        bus.SubscribeAsync<SeatReserved>("payments", async e =>
        {
            await Task.Delay(200, stop);              // the "bank"
            if (e.Amount <= 1000m)
                await bus.PublishAsync(
                    new PaymentSucceeded(e.BookingId));
            else
                await bus.PublishAsync(new PaymentFailed(e.BookingId,
                    e.Seat, "insufficient funds"));
        }, stop);
}
```

The booking service (`Tickets.Booking/Program.cs`):

```cs
using System.Collections.Concurrent;
using Tickets.Messaging;

// The booking service: accepts a request, publishes BookingCreated,
// and tracks the saga's result through the events of other services.
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
    return Results.Accepted($"/bookings/{b.Id}", b); // the saga continues
});

app.MapGet("/bookings/{id:guid}", (Guid id,
    ConcurrentDictionary<Guid, Booking> bookings) =>
    bookings.TryGetValue(id, out Booking? b)
        ? Results.Ok(b) : Results.NotFound());

app.Run();

record NewBooking(int Seat, string Customer, decimal Amount);
record Booking(Guid Id, int Seat, string Customer, decimal Amount,
    string Status, string? Reason);

// The final events of the saga change the booking state.
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

The AppHost:

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

The test script `book.ps1` sends four bookings and polls the state of each until the saga completes:

```powershell
# Four bookings: success, a taken seat, a declined payment, a retry.
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
    do {                                # polling the saga state
        Start-Sleep -Milliseconds 100
        $b = Invoke-RestMethod "$api/$($b.id)"
    } while ($b.status -eq "Pending")
    $ms = ((Get-Date) - $start).TotalMilliseconds
    "{0,-6} seat {1}: {2,-9} {3,5:F0} ms {4}" -f $b.customer,
        $b.seat, $b.status, $ms, $b.reason
}
```

```
olena  seat 5: Confirmed   352 ms
petro  seat 5: Rejected    107 ms seat is taken or does not exist
ivan   seat 7: Cancelled   239 ms insufficient funds
maria  seat 7: Confirmed   250 ms
```

The seat service log (`aspire logs seats`; the IDs are shortened to the last four characters, and some fields are omitted) shows the compensation for `ivan` and the reuse of seat 7:

```
← BookingCreated { BookingId = …2bbc, Seat = 5, … }
→ SeatReserved { BookingId = …2bbc, Seat = 5, Amount = 450 }
← BookingCreated { BookingId = …7add, Seat = 5, … }
→ SeatRejected { BookingId = …7add, Seat = 5, Reason = … }
← BookingCreated { BookingId = …5310, Seat = 7, … }
→ SeatReserved { BookingId = …5310, Seat = 7, Amount = 1500 }
← PaymentFailed { BookingId = …5310, Seat = 7, Reason = … }
→ SeatReleased { BookingId = …5310, Seat = 7 }
Free seats: 9
← BookingCreated { BookingId = …5201, Seat = 7, … }
→ SeatReserved { BookingId = …5201, Seat = 7, Amount = 600 }
```

The trace of `ivan`'s booking (`aspire otel spans --trace-id …`) contains 9 spans in three services: the HTTP request (8 ms, because the client receives `202` immediately), the publication of `BookingCreated`, its processing in `seats`, `SeatReserved` → `payments` (0.23 s including the simulated bank), `PaymentFailed` → `booking` and `seats`, and `SeatReleased`. The trace context passes from event to event in the message headers, so the whole “smeared” choreography process is visible as a single tree.

A comparison with the orchestrated saga from the lecture: here there is no central component, and a new participant (for example, a notification service) simply subscribes to the events. On the other hand, the saga's logic has to be pieced together from three services, and the state is stored only in memory: after `booking` restarts, unfinished bookings are lost, and publishing after a state change without an Outbox can lose an event. Production code stores the state in a database and publishes events through an Outbox.

## Example 2. An API gateway with JWT authentication, rate limiting, and aggregation

Create an application of two services (`students` for student data and `grades` for grades) and a YARP gateway that: lets only teachers (the `teacher` role in the JWT token) through to the services; provides an aggregation endpoint `GET /api/students/{id}/card` (BFF) that calls both services in parallel and returns a student card; lets a student see only their own card (the `student_id` claim); limits each user to 5 requests per 10 s; and returns the card without grades (`degraded: true`) if the grades service is unavailable or does not respond within 1 s. Issue test tokens with the `dotnet user-jwts` utility.

The `Uni` solution: `Uni.AppHost`, `Uni.ServiceDefaults`, and the web projects `Uni.Students`, `Uni.Grades`, and `Uni.Gateway` (the packages `Yarp.ReverseProxy` 2.3.0, `Microsoft.Extensions.ServiceDiscovery.Yarp` 10.10.0, and `Microsoft.AspNetCore.Authentication.JwtBearer` 10.0.12). The services have artificial delays of 150 and 250 ms so that the parallelism of the aggregation is visible. `Uni.Students/Program.cs`:

```cs
// The student service: data from memory, the delay simulates a database.
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();
WebApplication app = builder.Build();
app.MapDefaultEndpoints();

Dictionary<int, Student> students = new()
{
    [1] = new(1, "Olena Koval", "CS-23"),
    [2] = new(2, "Petro Shevchuk", "CS-23"),
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
// The grades service: data from memory, the delay simulates a database.
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();
WebApplication app = builder.Build();
app.MapDefaultEndpoints();

Grade[] grades =
[
    new(1, "Parallel Computing", 92), new(1, "Databases", 85),
    new(2, "Parallel Computing", 74),
];

app.MapGet("/grades/{studentId:int}", async (int studentId) =>
{
    await Task.Delay(250);
    return grades.Where(g => g.StudentId == studentId);
});
app.Run();

record Grade(int StudentId, string Course, int Score);
```

The gateway (`Uni.Gateway/Program.cs`):

```cs
using System.Diagnostics;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.RateLimiting;

// API gateway: JWT, per-user rate limiting, YARP routing,
// and aggregation of the responses of two services (BFF).
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();
builder.Services.AddAuthentication().AddJwtBearer(); // from configuration
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("student", p => p.RequireRole("student", "teacher"))
    .AddPolicy("teacher", p => p.RequireRole("teacher"));
builder.Services.AddRateLimiter(o =>
{
    o.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    // 5 requests per 10 s per user (the name from the token).
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

// Aggregation: a student card from two services, parallel calls.
app.MapGet("/api/students/{id:int}/card", async (int id,
    ClaimsPrincipal user, IHttpClientFactory http) =>
{
    // A student sees only their own card, a teacher sees any card.
    if (!user.IsInRole("teacher")
        && user.FindFirstValue("student_id") != id.ToString())
        return Results.Forbid();
    Stopwatch clock = Stopwatch.StartNew();
    // Aggregation time budget: 1 s for both calls together.
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
        return Results.Problem("student service unavailable",
            statusCode: 502);
    return Results.Ok(new
    {
        student = student.Result,
        // Degradation: no grades if their service is unavailable.
        grades = grades.IsCompletedSuccessfully
            ? grades.Result : (JsonElement?)null,
        degraded = !grades.IsCompletedSuccessfully,
        ms = clock.ElapsedMilliseconds,
    });
}).RequireAuthorization("student").RequireRateLimiting("per-user");

app.Run();
```

The YARP routes to the services are available only to teachers (the `teacher` policy) and are also limited per user (`Uni.Gateway/appsettings.json`, a fragment):

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

The aggregation route `/api/students/{id:int}/card` is more specific than the YARP route `/api/students/{**rest}`, so ASP.NET Core routing chooses our own handler and passes the rest of the `/api/students/…` requests to the proxy.

The AppHost:

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

**Test tokens.** The `dotnet user-jwts` utility from the .NET SDK (<https://learn.microsoft.com/aspnet/core/security/authentication/jwt-authn>) creates a signing key in the user secrets of the gateway project, writes the issuer and audience to `appsettings.Development.json`, and issues a token:

```powershell
cd Uni.Gateway
dotnet user-jwts create --name olena --role student `
    --claim student_id=1 -o token > ../olena.jwt
dotnet user-jwts create --name kovalenko --role teacher `
    -o token > ../teacher.jwt
```

The added configuration (read by `AddJwtBearer()` without parameters):

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

Such tokens are signed with the developer key and are suitable only for the `Development` environment; in a production system, tokens are issued by an identity server (Microsoft Entra ID, Keycloak, and others), and the gateway only validates them.

The test script `check.ps1`:

```powershell
# Gateway check: authentication, authorization, aggregation, limit.
$gw = "http://localhost:5300"
$olena = @{ Authorization = "Bearer $(Get-Content olena.jwt)" }
$teacher = @{ Authorization = "Bearer $(Get-Content teacher.jwt)" }
function Check($title, $url, $headers) {
    try {
        $r = Invoke-WebRequest $url -Headers $headers
        $j = $r.Content | ConvertFrom-Json
        $info = if ($j.student) {
            "{0}, grades: {1}, {2} ms" -f $j.student.name,
                @($j.grades).Count, $j.ms
        } else { "records: $(@($j).Count)" }
        "{0,-20} {1} {2}" -f $title, $r.StatusCode, $info
    } catch {
        "{0,-20} {1}" -f $title,
            [int]$_.Exception.Response.StatusCode
    }
}
Check "no token" "$gw/api/students/1/card" @{}
Check "olena, own card" "$gw/api/students/1/card" $olena
Check "olena, other card" "$gw/api/students/2/card" $olena
Check "olena, /grades/2" "$gw/api/grades/2" $olena
Check "teacher, /grades/2" "$gw/api/grades/2" $teacher
1..4 | ForEach-Object {
    Check "olena, repeat $_" "$gw/api/students/1/card" $olena
}
```

```
no token             401
olena, own card      200 Olena Koval, grades: 2, 434 ms
olena, other card    403
olena, /grades/2     403
teacher, /grades/2   200 records: 1
olena, repeat 1      200 Olena Koval, grades: 2, 257 ms
olena, repeat 2      200 Olena Koval, grades: 2, 261 ms
olena, repeat 3      200 Olena Koval, grades: 2, 259 ms
olena, repeat 4      429
```

- without a token, the gateway responded with `401 Unauthorized` without calling the services;
- the student received her own card and `403 Forbidden` for another student's card and for the `/api/grades/2` route (teachers only); the teacher received the grades through the proxy;
- the fifth card request from `olena` within 10 s got `429`: the request for another student's card was also counted, because the refusal is returned by the handler after the limiter, but the request to `/api/grades/2` was not, because the route authorization rejected it earlier;
- the aggregation took ≈ 260 ms, that is, as long as the longer of the two parallel calls (250 ms) rather than their sum (400 ms); the first request (434 ms) included the “warm-up” of connections.

**Degradation.** The `card.ps1` script requests a card on behalf of the teacher; the grades service is stopped with the command `aspire resource grades stop`:

```powershell
# Time to get a student card as a teacher (N requests).
param([int]$Count = 3)
$h = @{ Authorization = "Bearer $(Get-Content teacher.jwt)" }
1..$Count | ForEach-Object {
    $clock = [Diagnostics.Stopwatch]::StartNew()
    try {
        $r = Invoke-RestMethod `
            http://localhost:5300/api/students/2/card -Headers $h
        "{0,5} ms (in the gateway {1} ms), degraded = {2}" -f `
            $clock.ElapsedMilliseconds, $r.ms, $r.degraded
    } catch {
        "{0,5} ms, code {1}" -f $clock.ElapsedMilliseconds,
            [int]$_.Exception.Response.StatusCode
    }
}
```

```
  300 ms (in the gateway 258 ms), degraded = False
  259 ms (in the gateway 254 ms), degraded = False
(after aspire resource grades stop)
 1080 ms (in the gateway 1012 ms), degraded = True
 1014 ms (in the gateway 1010 ms), degraded = True
(after aspire resource students stop)
 1123 ms, code 502
```

Without the grades service, the card is returned without grades after 1 s (the aggregation time budget), and without the student service, without which the card makes no sense, the error `502 Bad Gateway` is returned. The first version of the gateway had no `budget`, and the same outage produced a response after **30 s**: a connection to a stopped project through the Aspire proxy is not refused but “hangs”, and only the total request timeout of the standard resilience handler (30 s) kicked in. The aggregator has its own, much smaller time budget.

## Example 3. Resilience: a circuit breaker, retries, and degradation to a Redis cache

Create an exchange rate service `rates` with controlled failures (`POST /chaos?failure=…&delayMs=…` sets the share of 500 responses and the delay) and a converter frontend `front` (`GET /convert?from=USD&amount=100`) that calls `rates` through its own resilience pipeline (a total request timeout of 1 s, 2 retries, a circuit breaker, an attempt timeout of 300 ms), stores the last successful rate in Redis, and on failure returns it marked `stale` with its age. For comparison, provide a client without resilience (`raw=true`). Create a load-generating client and compare both clients under different failures and after `rates` is stopped.

The `Rates` solution: `Rates.AppHost` (the `Aspire.Hosting.Redis` package), `Rates.ServiceDefaults`, the web projects `Rates.Api` and `Rates.Front` (the `Aspire.StackExchange.Redis` 13.5.4 package), and the console project `Rates.Load`. The rate service (`Rates.Api/Program.cs`):

```cs
// An exchange rate service with controlled failures (for experiments).
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
    // A small "fluctuation" of the rate.
    decimal noise = (decimal)(Random.Shared.NextDouble() - 0.5) / 10;
    decimal rate = r + noise;
    return Results.Ok(new Rate(code, Math.Round(rate, 4),
        DateTime.UtcNow));
});

// Failure control: the share of 500 errors and the response delay.
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

The frontend (`Rates.Front/Program.cs`):

```cs
using System.Net;
using System.Text.Json;
using Microsoft.Extensions.Http.Resilience;
using Polly;
using Polly.CircuitBreaker;
using Polly.Timeout;
using StackExchange.Redis;

// The currency converter frontend: calls the rates service through its
// own resilience pipeline, degrading to the last rate from Redis.
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();
builder.AddRedisClient("redis");            // IConnectionMultiplexer

#pragma warning disable EXTEXP0001
// A client without resilience, for comparison. After removing the
// standard handler, the HttpClient timeout is infinite!
builder.Services.AddHttpClient("raw", c =>
    {
        c.BaseAddress = new Uri("http://rates");
        c.Timeout = TimeSpan.FromSeconds(10);
    })
    .RemoveAllResilienceHandlers();
// A client with its own Polly pipeline.
builder.Services.AddHttpClient("rates",
        c => c.BaseAddress = new Uri("http://rates"))
    .RemoveAllResilienceHandlers()
    .AddResilienceHandler("rates", p => p
        .AddTimeout(TimeSpan.FromSeconds(1))       // the whole call
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
        .AddTimeout(TimeSpan.FromMilliseconds(300))); // one attempt
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
        // The last successful rate is a fallback response for the future.
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
            return Results.Problem("rate unavailable",
                statusCode: 503);
        Rate rate =
            JsonSerializer.Deserialize<Rate>(cached.ToString())!;
        double age = (DateTime.UtcNow - rate.At).TotalSeconds;
        log.LogWarning("Rate {Key} from cache ({Age:F0} s): {Error}", key,
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

- `AddResilienceHandler("rates", …)` builds a custom Polly pipeline with the strategies in the order they are added (from the outside in): the total request timeout, retries, the circuit breaker, and the attempt timeout. `HttpRetryStrategyOptions` and `HttpCircuitBreakerStrategyOptions` already know which HTTP responses to treat as transient (5xx, 408, 429, network exceptions, and timeouts);
- the default handler from ServiceDefaults is first removed with `RemoveAllResilienceHandlers()`;
- **a finding from testing**: after `RemoveAllResilienceHandlers()`, the `HttpClient.Timeout` property remains infinite, because the standard handler disables it, relying on its own timeout (verified with a separate program: a client without the handler has a `Timeout` of 100 s, and a client after the handler is removed has `-00:00:00.001`, that is, infinity). The first version of the `raw` client without an explicit `Timeout` waited for a response from the stopped service for 504 s. That is why `raw` got an explicit 10 s timeout.

The AppHost:

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

The load-generating client (`Rates.Load/Program.cs`):

```cs
using System.Diagnostics;
using System.Net.Http.Json;

Console.OutputEncoding = System.Text.Encoding.UTF8;
// Load on /convert: N requests in T tasks; a summary by response
// source (fresh, stale, error) and latency.
if (args.Length < 1 || args.Contains("--help"))
{
    Console.Error.WriteLine("Usage: Rates.Load <url> " +
        "[requests] [tasks]");
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
    $"  error {Count("error"),4}  avg {sorted.Average(),6:F0} ms" +
    $"  p95 {sorted[(int)(sorted.Length * 0.95)],6:F0} ms" +
    $"  {total / clock.Elapsed.TotalSeconds,6:F0} req/s");
return 0;

record Reply(string Source);
```

The experiment: for each failure mode (`POST http://localhost:5401/chaos`), after a warm-up run, `Rates.Load … 200 4` was run 5 times for the client with resilience and without it (`&raw=true`); Table 18.4 shows the medians.

Table 18.4. Converter responses (200 requests, 4 tasks), median of 5 runs {.caption}

| **`rates` failures** | **Client** | **Fresh** | **From cache** | **Avg, ms** | **Req/s** |
| --- | --- | --- | --- | --- | --- |
| none | resilient | 200 | 0 | 3 | 1109 |
|  | raw | 200 | 0 | 3 | 1129 |
| 30% of responses are 500 | resilient | 193 | 7 | 24 | 161 |
|  | raw | 134 | 66 | 3 | 1163 |
| 70% of responses are 500 | resilient | 0 | 200 | 3 | 1193 |
|  | raw | 68 | 132 | 3 | 1150 |
| 500 ms delay | resilient | 0 | 200 | 5 | 452 |
|  | raw | 200 | 0 | 513 | 8 |
| service stopped | resilient | 0 | 200 | 3 | 1131 |
|  | raw<sup>\*</sup> | 0 | 8 | 10,053 | 0.4 |

<sup>\*</sup> A single run of 8 requests: each one waited for the 10 s timeout.

- **30% failures**: retries turned 67% fresh responses into 96.5%; the cost is an average latency of 24 ms instead of 3 ms (the delays before retries) and lower throughput;
- **70% failures**: the share of failed attempts exceeded 50%, the circuit breaker opened, and all responses came from the cache within 3 ms. The `raw` client got a third of the responses fresh, but it still sent the remaining requests (two thirds) to the unhealthy service, adding load to it;
- **a slow service** (500 ms): the 300 ms attempt timeout and the circuit breaker produced fast responses from the cache (5 ms, 452 requests per second), while `raw` waited 513 ms for each response (8 requests per second). This is a deliberate policy choice: a slightly stale rate now is better than a fresh one half a second later;
- **a stopped service**: after the first run (the first call waited for the 1 s timeout, and then the circuit breaker opened), the resilient client responded from the cache within 3 ms; `raw` waited 10 s for each request.

After the failures were turned off (`failure=0`), the circuit breaker closed after the first successful trial call: the first run produced 97 fresh responses and 3 from the cache, and the subsequent ones only fresh responses. After `aspire resource rates start`, the first run still got 99 responses from the cache, and the second (2 s later) got 100 fresh ones.
