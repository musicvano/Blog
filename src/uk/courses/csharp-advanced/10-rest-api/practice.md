---
title: "Практика"
description: "Тема 10. Вебсервіси REST: розібрані приклади"
outline: [2, 3]
---

# Практика

Сервіси створено шаблоном *ASP.NET Core Web API* (.NET 10, без контролерів) або командою `dotnet new web`; у `launchSettings.json` задано постійні порти.

## Приклад 1. Нотатки з пошуком

Створити вебсервіс нотаток. Список підтримує пошук слова в назві й тексті, фільтр за тегом і сортування за назвою або датою (закріплені нотатки першими). Створювати нотатки й закріплювати їх (`PATCH`) можна лише з ключем у заголовку `X-Api-Key`, який зберігається в конфігурації. Кінцеві точки мають описи в документі OpenAPI.

Модель і DTO (файл `Note.cs`):

```cs
using System.ComponentModel.DataAnnotations;

namespace NotesApi;

public class Note
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Text { get; set; } = "";
    public string[] Tags { get; set; } = [];
    public bool IsPinned { get; set; }
    public DateTime CreatedAt { get; set; }

    public bool Contains(string word) =>
        Title.Contains(word, StringComparison.OrdinalIgnoreCase)
        || Text.Contains(word, StringComparison.OrdinalIgnoreCase);
}

public record NoteDto(
    [Required, MaxLength(80)] string Title,
    [MaxLength(2000)] string Text,
    string[] Tags);

public record PinDto(bool IsPinned);
```

Файл `Program.cs`. Спільний список захищено блокуванням `lock`, бо запити виконуються паралельно:

```cs
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http.HttpResults;
using NotesApi;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();
builder.Services.AddProblemDetails();
builder.Services.AddValidation();
var app = builder.Build();
app.UseStatusCodePages();
app.MapOpenApi();

List<Note> notes = [];          // спільний список: доступ під lock
int nextId = 1;
var api = app.MapGroup("/api/notes").WithTags("Notes");

// GET /api/notes?search=іспит&tag=study&sort=title
api.MapGet("/", (string? search, string? tag,
    [RegularExpression("^(title|date)$",
        ErrorMessage = "Сортування: title або date.")]
    string sort = "date") =>
{
    lock (notes)
    {
        IEnumerable<Note> query = notes;
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(n => n.Contains(search));
        if (!string.IsNullOrWhiteSpace(tag))
            query = query.Where(n => n.Tags.Contains(tag));
        query = sort == "title"
            ? query.OrderBy(n => n.Title)
            : query.OrderByDescending(n => n.IsPinned)
                .ThenByDescending(n => n.Id);
        return TypedResults.Ok(query.ToList());
    }
})
.WithSummary("Пошук, фільтрація та сортування нотаток");

api.MapGet("/{id:int:min(1)}", Results<Ok<Note>, NotFound> (int id) =>
{
    lock (notes)
        return notes.Find(n => n.Id == id) is { } note
            ? TypedResults.Ok(note) : TypedResults.NotFound();
})
.WithSummary("Нотатка за ідентифікатором");
```

Кінцеві точки зміни даних винесено у вкладену групу з фільтром `ApiKeyFilter`. **Фільтр кінцевої точки** (`IEndpointFilter`) виконується до обробника і може повернути відповідь, не викликаючи його (<https://learn.microsoft.com/aspnet/core/fundamentals/minimal-apis/min-api-filters>):

```cs
// Змінювати дані можна лише з ключем у заголовку X-Api-Key.
var edit = api.MapGroup("").AddEndpointFilter<ApiKeyFilter>();

edit.MapPost("/", (NoteDto dto) =>
{
    var note = new Note
    {
        Title = dto.Title, Text = dto.Text,
        Tags = dto.Tags, CreatedAt = DateTime.UtcNow
    };
    lock (notes)
    {
        note.Id = nextId++;
        notes.Add(note);
    }
    return TypedResults.Created($"/api/notes/{note.Id}", note);
});

// PATCH змінює лише одну властивість ресурсу.
edit.MapPatch("/{id:int}/pin",
    Results<NoContent, NotFound> (int id, PinDto dto) =>
{
    lock (notes)
    {
        Note? note = notes.Find(n => n.Id == id);
        if (note is null) return TypedResults.NotFound();
        note.IsPinned = dto.IsPinned;
        return TypedResults.NoContent();
    }
});

app.Run();

public class ApiKeyFilter(IConfiguration config) : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context,
        EndpointFilterDelegate next)
    {
        string? key = context.HttpContext.Request
            .Headers["X-Api-Key"];
        if (key != config["Notes:ApiKey"])
            return TypedResults.Problem("Невірний ключ API.",
                statusCode: StatusCodes.Status401Unauthorized);
        return await next(context);   // далі – обробник
    }
}
```

Ключ для розробки записано у файл `appsettings.Development.json`: `"Notes": { "ApiKey": "dev-secret-123" }`. Змінна `@key` файлу `NotesApi.http` підставляється в заголовок:

```
@host = http://localhost:5090
@key = dev-secret-123

### Без ключа – 401
POST {{host}}/api/notes
Content-Type: application/json

{ "title": "Без ключа", "text": "", "tags": [] }

### Три нотатки
POST {{host}}/api/notes
Content-Type: application/json
X-Api-Key: {{key}}

{ "title": "Іспит з ООП", "text": "REST і JSON", "tags": ["study"] }

###
POST {{host}}/api/notes
Content-Type: application/json
X-Api-Key: {{key}}

{ "title": "Покупки", "text": "Хліб, сир", "tags": ["home"] }

###
POST {{host}}/api/notes
Content-Type: application/json
X-Api-Key: {{key}}

{ "title": "Курсова", "text": "Розділ про іспит", "tags": ["study"] }

### Закріпити першу
PATCH {{host}}/api/notes/1/pin
Content-Type: application/json
X-Api-Key: {{key}}

{ "isPinned": true }

### Пошук
GET {{host}}/api/notes?search=іспит&tag=study

### Сортування: помилка
GET {{host}}/api/notes?sort=size

### Неправильний id
GET {{host}}/api/notes/0
```

Запит без ключа отримує 401 з `"detail": "Невірний ключ API."`, три нотатки створюються з кодом 201, а `PATCH` повертає 204. Пошук слова «іспит» з тегом `study` знаходить нотатки без урахування регістру, закріплену – першою:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
  {
    "id": 1,
    "title": "Іспит з ООП",
    "text": "REST і JSON",
    "tags": [
      "study"
    ],
    "isPinned": true,
    "createdAt": "2026-09-17T11:42:06.704585Z"
  },
  {
    "id": 3,
    "title": "Курсова",
    "text": "Розділ про іспит",
    "tags": [
      "study"
    ],
    "isPinned": false,
    "createdAt": "2026-09-17T11:42:06.7175283Z"
  }
]
```

Запит `?sort=size` відхиляє вбудована валідація: 400 з тілом `ProblemDetails`, у якому `"errors": { "sort": [ "Сортування: title або date." ] }`. Маршрут `{id:int:min(1)}` не збігається з адресою `/api/notes/0`, тому останній запит отримує 404. У документі `/openapi/v1.json` параметр `sort` описано як `"pattern": "^(title|date)$"`, `"default": "date"`.

## Приклад 2. Курси валют і консольний конвертер

Створити вебсервіс курсів валют з кінцевими точками `GET /api/rates` (усі курси) і `GET /api/convert?from=USD&to=EUR&amount=100` (перерахунок) та консольний застосунок `Converter`, який отримує суму і коди валют аргументами командного рядка. Помилки у вхідних даних сервіс повертає як `ValidationProblem`, а клієнт виводить їх у потік помилок і повертає код завершення 1 (2 – неправильні аргументи).

Сервіс (проєкт `dotnet new web`, файл `Program.cs`):

```cs
using Microsoft.AspNetCore.Http.HttpResults;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddProblemDetails();
var app = builder.Build();

app.UseExceptionHandler(new ExceptionHandlerOptions
{
    StatusCodeSelector = ex => ex is BadHttpRequestException bad
        ? bad.StatusCode : StatusCodes.Status500InternalServerError
});

app.UseStatusCodePages();

// Умовні курси: скільки гривень коштує одиниця валюти.
var rates = new Dictionary<string, decimal>(
    StringComparer.OrdinalIgnoreCase)
{
    ["UAH"] = 1m, ["USD"] = 41.25m, ["EUR"] = 48.10m, ["PLN"] = 11.30m
};

app.MapGet("/api/rates", () => TypedResults.Ok(rates));

// GET /api/convert?from=USD&to=EUR&amount=100
app.MapGet("/api/convert", Results<Ok<Conversion>, ValidationProblem>
    (string from, string to, decimal amount) =>
{
    var errors = new Dictionary<string, string[]>();
    if (!rates.ContainsKey(from))
        errors["from"] = [$"Невідома валюта «{from}»."];
    if (!rates.ContainsKey(to))
        errors["to"] = [$"Невідома валюта «{to}»."];
    if (amount <= 0)
        errors["amount"] = ["Сума має бути більшою за нуль."];
    if (errors.Count > 0)
        return TypedResults.ValidationProblem(errors);

    decimal rate = rates[from] / rates[to];
    return TypedResults.Ok(new Conversion(from.ToUpperInvariant(),
        to.ToUpperInvariant(), amount, Math.Round(rate, 4),
        Math.Round(amount * rate, 2)));
});

app.Run();

record Conversion(string From, string To, decimal Amount,
    decimal Rate, decimal Result);
```

Метод `TypedResults.ValidationProblem` формує відповідь 400 зі словником помилок, тому кілька помилок повертаються разом. Курс – ціна однієї одиниці валюти в гривнях, тож курс USD→EUR дорівнює 41,25 / 48,10. Консольний клієнт використовує один `HttpClient` на всю програму з тайм-аутом 5 секунд і скасуванням за **Ctrl+C**:

```cs
using System.Globalization;
using System.Net.Http.Json;

Console.OutputEncoding = System.Text.Encoding.UTF8;

if (args.Length != 3 || !decimal.TryParse(args[0],
        CultureInfo.InvariantCulture, out decimal amount))
{
    Console.Error.WriteLine("Використання: Converter <сума> <з> <в>");
    Console.Error.WriteLine("Приклад:      Converter 100 USD UAH");
    return 2;
}

// Один HttpClient на всю програму.
using var http = new HttpClient
{
    BaseAddress = new Uri("http://localhost:5100/"),
    Timeout = TimeSpan.FromSeconds(5)
};

using var cts = new CancellationTokenSource();
Console.CancelKeyPress += (s, e) =>
{
    e.Cancel = true;              // не завершувати процес одразу
    cts.Cancel();
};

string url = $"api/convert?from={Uri.EscapeDataString(args[1])}" +
    $"&to={Uri.EscapeDataString(args[2])}" +
    $"&amount={amount.ToString(CultureInfo.InvariantCulture)}";

try
{
    using HttpResponseMessage response =
        await http.GetAsync(url, cts.Token);
    if (response.IsSuccessStatusCode)
    {
        var c = await response.Content
            .ReadFromJsonAsync<Conversion>(cts.Token);
        Console.WriteLine($"{c!.Amount:N2} {c.From} = " +
            $"{c.Result:N2} {c.To} (курс {c.Rate})");
        return 0;
    }
    var problem = await response.Content
        .ReadFromJsonAsync<Problem>(cts.Token);
    Console.Error.WriteLine($"Помилка {(int)response.StatusCode}:");
    foreach (var message in problem?.Errors?.Values.SelectMany(m => m)
             ?? [problem?.Title ?? "невідома помилка"])
        Console.Error.WriteLine($"  {message}");
    return 1;
}
catch (HttpRequestException ex)
{
    Console.Error.WriteLine($"Сервіс недоступний: {ex.Message}");
}
catch (TaskCanceledException) when (!cts.IsCancellationRequested)
{
    Console.Error.WriteLine("Сервіс не відповів за 5 секунд.");
}
catch (OperationCanceledException)
{
    Console.Error.WriteLine("Скасовано користувачем.");
}
return 1;

record Conversion(string From, string To, decimal Amount,
    decimal Rate, decimal Result);

record Problem(string? Title,
    Dictionary<string, string[]>? Errors);
```

Порядок блоків `catch` важливий: тайм-аут `HttpClient` генерує `TaskCanceledException` (нащадок `OperationCanceledException`), тому його відрізняють за станом маркера скасування. Суму з аргументу читають в інваріантній культурі, щоб «250.5» означало 250,5 незалежно від регіональних налаштувань. Результати запуску:

```
> Converter 100 USD UAH
100,00 USD = 4 125,00 UAH (курс 41,25)
> Converter 250.5 eur pln
250,50 EUR = 1 066,29 PLN (курс 4,2566)
> Converter -5 USD GBP
Помилка 400:
  Невідома валюта «GBP».
  Сума має бути більшою за нуль.
> Converter abc
Використання: Converter <сума> <з> <в>
Приклад:      Converter 100 USD UAH
```

## Приклад 3. Інтеграційні тести вебсервісу

Написати інтеграційні тести сервісу нотаток з прикладу 1: 404 для неіснуючої нотатки, 401 без ключа, 400 для порожньої назви, створення і читання нотатки та перевірку параметра `sort`.

**Інтеграційний тест** запускає весь сервіс (конвеєр, маршрути, валідацію) у пам’яті тестового процесу. Клас `WebApplicationFactory<TEntryPoint>` з пакета `Microsoft.AspNetCore.Mvc.Testing` створює такий сервер і `HttpClient`, який надсилає запити без мережі й портів (<https://learn.microsoft.com/aspnet/core/test/integration-tests>). Проєкт тестів створюють командою `dotnet new xunit -n NotesApi.Tests`, потім додають посилання на проєкт сервісу (`dotnet add reference ../NotesApi/NotesApi.csproj`) і пакет `Microsoft.AspNetCore.Mvc.Testing`.

Параметр типу `Program` – клас точки входу сервісу. У .NET 10 для `Program.cs` з інструкціями верхнього рівня цей клас генерується відкритим, тому оголошення `public partial class Program` більше не потрібне. Метод `WithWebHostBuilder` підміняє налаштування: тести використовують власний ключ API.

```cs
using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;

namespace NotesApi.Tests;

public class NotesApiTests(WebApplicationFactory<Program> factory)
    : IClassFixture<WebApplicationFactory<Program>>
{
    // Сервіс працює в пам’яті тесту: без Kestrel і портів.
    private HttpClient CreateClient(string? apiKey = "test")
    {
        HttpClient client = factory
            .WithWebHostBuilder(host =>
                host.UseSetting("Notes:ApiKey", "test"))
            .CreateClient();
        if (apiKey != null)
            client.DefaultRequestHeaders.Add("X-Api-Key", apiKey);
        return client;
    }

    [Fact]
    public async Task GetMissingNote_Returns404()
    {
        var response =
            await CreateClient().GetAsync("/api/notes/999");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task PostWithoutKey_Returns401()
    {
        var response = await CreateClient(apiKey: null)
            .PostAsJsonAsync("/api/notes", new NoteDto("A", "", []));
        Assert.Equal(HttpStatusCode.Unauthorized,
            response.StatusCode);
    }

    [Fact]
    public async Task PostEmptyTitle_Returns400WithErrors()
    {
        var response = await CreateClient().PostAsJsonAsync(
            "/api/notes", new NoteDto("", "", []));
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        string body = await response.Content.ReadAsStringAsync();
        Assert.Contains("\"errors\"", body);
    }

    [Fact]
    public async Task PostThenGet_ReturnsSameNote()
    {
        HttpClient client = CreateClient();
        var dto = new NoteDto("Звіт", "Здати в п’ятницю", ["study"]);

        var post = await client.PostAsJsonAsync("/api/notes", dto);
        Assert.Equal(HttpStatusCode.Created, post.StatusCode);
        Note? created = await post.Content.ReadFromJsonAsync<Note>();
        Assert.NotNull(created);
        Assert.Equal($"/api/notes/{created.Id}",
            post.Headers.Location?.ToString());

        Note? loaded = await client.GetFromJsonAsync<Note>(
            post.Headers.Location);
        Assert.Equal("Звіт", loaded?.Title);
    }

    [Theory]
    [InlineData("title", HttpStatusCode.OK)]
    [InlineData("date", HttpStatusCode.OK)]
    [InlineData("size", HttpStatusCode.BadRequest)]
    public async Task Sort_IsValidated(string sort,
        HttpStatusCode expected)
    {
        var response = await CreateClient()
            .GetAsync($"/api/notes?sort={sort}");
        Assert.Equal(expected, response.StatusCode);
    }
}
```

`IClassFixture` створює одну фабрику на всі тести класу, а `[Theory]` з атрибутами `[InlineData]` виконує один тест для кількох наборів даних. Запуск командою `dotnet test` (або у вікні *Test Explorer* Visual Studio) завершується так:

```
Test Run Successful.
Total tests: 7
     Passed: 7
```
