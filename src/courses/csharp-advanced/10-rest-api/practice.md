---
title: "Practice"
description: "Topic 10. REST web services: worked examples"
outline: [2, 3]
sourceHash: "1c46f425050a5a93eda26d7cd14ac916a632f15f6158b2cd54ba1ceba44585a2"
---

# Practice

The services were created from the *ASP.NET Core Web API* template (.NET 10, without controllers) or with the `dotnet new web` command; fixed ports are set in `launchSettings.json`.

## Example 1. Notes with search

Create a notes web service. The list supports searching for a word in the title and text, filtering by tag, and sorting by title or date (pinned notes first). Creating notes and pinning them (`PATCH`) is allowed only with a key in the `X-Api-Key` header, which is stored in the configuration. The endpoints have descriptions in the OpenAPI document.

The model and DTOs (the `Note.cs` file):

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

The `Program.cs` file. The shared list is protected with a `lock` because requests run in parallel:

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

List<Note> notes = [];          // shared list: access under lock
int nextId = 1;
var api = app.MapGroup("/api/notes").WithTags("Notes");

// GET /api/notes?search=exam&tag=study&sort=title
api.MapGet("/", (string? search, string? tag,
    [RegularExpression("^(title|date)$",
        ErrorMessage = "Sort: title or date.")]
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
.WithSummary("Search, filter, and sort notes");

api.MapGet("/{id:int:min(1)}", Results<Ok<Note>, NotFound> (int id) =>
{
    lock (notes)
        return notes.Find(n => n.Id == id) is { } note
            ? TypedResults.Ok(note) : TypedResults.NotFound();
})
.WithSummary("A note by ID");
```

The endpoints that change data are moved into a nested group with the `ApiKeyFilter` filter. An **endpoint filter** (`IEndpointFilter`) runs before the handler and can return a response without calling it (<https://learn.microsoft.com/aspnet/core/fundamentals/minimal-apis/min-api-filters>):

```cs
// Data can be changed only with a key in the X-Api-Key header.
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

// PATCH changes only one property of the resource.
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
            return TypedResults.Problem("Invalid API key.",
                statusCode: StatusCodes.Status401Unauthorized);
        return await next(context);   // then the handler
    }
}
```

The development key is written in the `appsettings.Development.json` file: `"Notes": { "ApiKey": "dev-secret-123" }`. The `@key` variable of the `NotesApi.http` file is substituted into the header:

```
@host = http://localhost:5090
@key = dev-secret-123

### Without a key – 401
POST {{host}}/api/notes
Content-Type: application/json

{ "title": "No key", "text": "", "tags": [] }

### Three notes
POST {{host}}/api/notes
Content-Type: application/json
X-Api-Key: {{key}}

{ "title": "Exam in OOP", "text": "REST and JSON", "tags": ["study"] }

###
POST {{host}}/api/notes
Content-Type: application/json
X-Api-Key: {{key}}

{ "title": "Shopping", "text": "Bread, cheese", "tags": ["home"] }

###
POST {{host}}/api/notes
Content-Type: application/json
X-Api-Key: {{key}}

{ "title": "Term paper", "text": "Section about the exam", "tags": ["study"] }

### Pin the first one
PATCH {{host}}/api/notes/1/pin
Content-Type: application/json
X-Api-Key: {{key}}

{ "isPinned": true }

### Search
GET {{host}}/api/notes?search=exam&tag=study

### Sorting: error
GET {{host}}/api/notes?sort=size

### Invalid id
GET {{host}}/api/notes/0
```

The request without a key gets 401 with `"detail": "Invalid API key."`, the three notes are created with code 201, and the `PATCH` returns 204. Searching for the word "exam" with the `study` tag finds the notes case-insensitively, with the pinned one first:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
  {
    "id": 1,
    "title": "Exam in OOP",
    "text": "REST and JSON",
    "tags": [
      "study"
    ],
    "isPinned": true,
    "createdAt": "2026-09-17T11:42:06.704585Z"
  },
  {
    "id": 3,
    "title": "Term paper",
    "text": "Section about the exam",
    "tags": [
      "study"
    ],
    "isPinned": false,
    "createdAt": "2026-09-17T11:42:06.7175283Z"
  }
]
```

The `?sort=size` request is rejected by the built-in validation: 400 with a `ProblemDetails` body containing `"errors": { "sort": [ "Sort: title or date." ] }`. The `{id:int:min(1)}` route does not match the address `/api/notes/0`, so the last request gets 404. In the `/openapi/v1.json` document the `sort` parameter is described as `"pattern": "^(title|date)$"`, `"default": "date"`.

## Example 2. Exchange rates and a console converter

Create an exchange rate web service with the endpoints `GET /api/rates` (all rates) and `GET /api/convert?from=USD&to=EUR&amount=100` (conversion), and a `Converter` console application that receives the amount and currency codes as command-line arguments. The service returns input errors as a `ValidationProblem`, and the client writes them to the error stream and returns exit code 1 (2 for invalid arguments).

The service (a `dotnet new web` project, the `Program.cs` file):

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

// Sample rates: how many hryvnias one unit of the currency costs.
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
        errors["from"] = [$"Unknown currency \"{from}\"."];
    if (!rates.ContainsKey(to))
        errors["to"] = [$"Unknown currency \"{to}\"."];
    if (amount <= 0)
        errors["amount"] = ["The amount must be greater than zero."];
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

The `TypedResults.ValidationProblem` method builds a 400 response with a dictionary of errors, so several errors are returned together. A rate is the price of one unit of the currency in hryvnias, so the USD→EUR rate equals 41.25 / 48.10. The console client uses one `HttpClient` for the whole program with a 5-second timeout and cancellation with **Ctrl+C**:

```cs
using System.Globalization;
using System.Net.Http.Json;

Console.OutputEncoding = System.Text.Encoding.UTF8;

if (args.Length != 3 || !decimal.TryParse(args[0],
        CultureInfo.InvariantCulture, out decimal amount))
{
    Console.Error.WriteLine("Usage:   Converter <amount> <from> <to>");
    Console.Error.WriteLine("Example: Converter 100 USD UAH");
    return 2;
}

// One HttpClient for the whole program.
using var http = new HttpClient
{
    BaseAddress = new Uri("http://localhost:5100/"),
    Timeout = TimeSpan.FromSeconds(5)
};

using var cts = new CancellationTokenSource();
Console.CancelKeyPress += (s, e) =>
{
    e.Cancel = true;              // do not end the process immediately
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
            $"{c.Result:N2} {c.To} (rate {c.Rate})");
        return 0;
    }
    var problem = await response.Content
        .ReadFromJsonAsync<Problem>(cts.Token);
    Console.Error.WriteLine($"Error {(int)response.StatusCode}:");
    foreach (var message in problem?.Errors?.Values.SelectMany(m => m)
             ?? [problem?.Title ?? "unknown error"])
        Console.Error.WriteLine($"  {message}");
    return 1;
}
catch (HttpRequestException ex)
{
    Console.Error.WriteLine($"The service is unavailable: {ex.Message}");
}
catch (TaskCanceledException) when (!cts.IsCancellationRequested)
{
    Console.Error.WriteLine("The service did not respond within 5 seconds.");
}
catch (OperationCanceledException)
{
    Console.Error.WriteLine("Canceled by the user.");
}
return 1;

record Conversion(string From, string To, decimal Amount,
    decimal Rate, decimal Result);

record Problem(string? Title,
    Dictionary<string, string[]>? Errors);
```

The order of the `catch` blocks matters: an `HttpClient` timeout throws `TaskCanceledException` (a descendant of `OperationCanceledException`), so it is distinguished by the state of the cancellation token. The amount from the argument is parsed with the invariant culture so that "250.5" means 250.5 regardless of regional settings. Sample runs (with US regional settings):

```
> Converter 100 USD UAH
100.00 USD = 4,125.00 UAH (rate 41.25)
> Converter 250.5 eur pln
250.50 EUR = 1,066.29 PLN (rate 4.2566)
> Converter -5 USD GBP
Error 400:
  Unknown currency "GBP".
  The amount must be greater than zero.
> Converter abc
Usage:   Converter <amount> <from> <to>
Example: Converter 100 USD UAH
```

## Example 3. Integration tests for a web service

Write integration tests for the notes service from Example 1: 404 for a nonexistent note, 401 without a key, 400 for an empty title, creating and reading a note, and validation of the `sort` parameter.

An **integration test** runs the whole service (the pipeline, routes, validation) in the memory of the test process. The `WebApplicationFactory<TEntryPoint>` class from the `Microsoft.AspNetCore.Mvc.Testing` package creates such a server and an `HttpClient` that sends requests without a network or ports (<https://learn.microsoft.com/aspnet/core/test/integration-tests>). The test project is created with `dotnet new xunit -n NotesApi.Tests`, then a reference to the service project is added (`dotnet add reference ../NotesApi/NotesApi.csproj`) along with the `Microsoft.AspNetCore.Mvc.Testing` package.

The `Program` type parameter is the service's entry point class. In .NET 10 this class is generated as public for a `Program.cs` with top-level statements, so the `public partial class Program` declaration is no longer needed. The `WithWebHostBuilder` method overrides settings: the tests use their own API key.

```cs
using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;

namespace NotesApi.Tests;

public class NotesApiTests(WebApplicationFactory<Program> factory)
    : IClassFixture<WebApplicationFactory<Program>>
{
    // The service runs in the test's memory: no Kestrel and no ports.
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
        var dto = new NoteDto("Report", "Submit on Friday", ["study"]);

        var post = await client.PostAsJsonAsync("/api/notes", dto);
        Assert.Equal(HttpStatusCode.Created, post.StatusCode);
        Note? created = await post.Content.ReadFromJsonAsync<Note>();
        Assert.NotNull(created);
        Assert.Equal($"/api/notes/{created.Id}",
            post.Headers.Location?.ToString());

        Note? loaded = await client.GetFromJsonAsync<Note>(
            post.Headers.Location);
        Assert.Equal("Report", loaded?.Title);
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

`IClassFixture` creates one factory for all tests in the class, and `[Theory]` with `[InlineData]` attributes runs one test for several data sets. Running `dotnet test` (or the Visual Studio *Test Explorer* window) ends like this:

```
Test Run Successful.
Total tests: 7
     Passed: 7
```
