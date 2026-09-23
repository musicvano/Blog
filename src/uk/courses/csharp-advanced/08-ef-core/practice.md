---
title: "Практика"
description: "Тема 8. Entity Framework Core: розібрані приклади"
outline: [2, 3]
---

# Практика

Кожен приклад – окремий проєкт .NET 10 з пакетами `Npgsql.EntityFrameworkCore.PostgreSQL`, `Microsoft.EntityFrameworkCore.Design`, `Microsoft.Extensions.Configuration.UserSecrets` і `…EnvironmentVariables` та окремою базою даних, створеною в `psql` від імені `postgres` (`CREATE DATABASE cinema_ef OWNER library_app;`). Рядок з’єднання записують у секрети користувача з ключем `ConnectionStrings:<Назва>`, як у лекції, а таблиці створюють командами `dotnet ef migrations add InitialCreate` і `dotnet ef database update`.

## Приклад 1. Кінотеатр: модель, Fluent API і початкові дані

Створити модель бази даних кінотеатру: зали (назва, кількість рядів і місць у ряду), сеанси (фільм, час початку в UTC, ціна, зал) і квитки (ряд, місце, сеанс). Налаштування винести в класи `IEntityTypeConfiguration<T>`; зали додати як початкові дані міграції; заборонити видаляти зал, для якого є сеанси, і продавати одне місце на сеанс двічі. Консольна програма продає кілька квитків і повідомляє про неіснуючі та вже продані місця. База даних `cinema_ef`.

Сутності (файл `Model.cs`) не містять атрибутів: уся конфігурація – у Fluent API.

```cs
namespace Cinema;

public class Hall
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public int Rows { get; set; }
    public int SeatsPerRow { get; set; }
}

public class Session
{
    public int Id { get; set; }
    public string Movie { get; set; } = "";
    public DateTime StartsAt { get; set; }       // UTC
    public decimal Price { get; set; }
    public int HallId { get; set; }
    public Hall Hall { get; set; } = null!;
    public List<Ticket> Tickets { get; } = [];
}

public class Ticket
{
    public int Id { get; set; }
    public int Row { get; set; }
    public int Seat { get; set; }
    public int SessionId { get; set; }
    public Session Session { get; set; } = null!;
}
```

Файл `CinemaContext.cs`:

```cs
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.Configuration;

namespace Cinema;

class HallConfiguration : IEntityTypeConfiguration<Hall>
{
    public void Configure(EntityTypeBuilder<Hall> b)
    {
        b.Property(h => h.Name).HasMaxLength(50);
        b.HasIndex(h => h.Name).IsUnique();
        b.ToTable(t => t.HasCheckConstraint("CK_Halls_Size",
            "\"Rows\" > 0 AND \"SeatsPerRow\" > 0"));
        b.HasData(                                 // початкові дані
            new Hall { Id = 1, Name = "Red", Rows = 8,
                SeatsPerRow = 12 },
            new Hall { Id = 2, Name = "Blue", Rows = 5,
                SeatsPerRow = 10 });
    }
}

class SessionConfiguration : IEntityTypeConfiguration<Session>
{
    public void Configure(EntityTypeBuilder<Session> b)
    {
        b.Property(s => s.Movie).HasMaxLength(200);
        b.Property(s => s.Price).HasPrecision(8, 2);
        b.HasOne(s => s.Hall).WithMany()
            .OnDelete(DeleteBehavior.Restrict);   // зал не видаляти
    }
}

class TicketConfiguration : IEntityTypeConfiguration<Ticket>
{
    public void Configure(EntityTypeBuilder<Ticket> b) =>
        // одне місце на сеанс можна продати лише один раз
        b.HasIndex(t => new { t.SessionId, t.Row, t.Seat })
            .IsUnique();
}
```

```cs
public class CinemaContext : DbContext
{
    public DbSet<Hall> Halls => Set<Hall>();
    public DbSet<Session> Sessions => Set<Session>();
    public DbSet<Ticket> Tickets => Set<Ticket>();

    private static readonly string? ConnectionString =
        new ConfigurationBuilder()
            .AddUserSecrets<CinemaContext>()
            .AddEnvironmentVariables()
            .Build()
            .GetConnectionString("Cinema");

    protected override void OnConfiguring(
        DbContextOptionsBuilder options) =>
        options.UseNpgsql(ConnectionString);

    protected override void OnModelCreating(ModelBuilder model) =>
        model.ApplyConfigurationsFromAssembly(
            typeof(CinemaContext).Assembly);
}
```

`HasOne(s => s.Hall).WithMany()` описує зв’язок без колекції сеансів у класі `Hall`. Міграція `InitialCreate` містить зали у виклику `migrationBuilder.InsertData(table: "Halls", …)`, а скрипт `dotnet ef migrations script` показує, що після вставки залів з явними ключами постачальник Npgsql пересуває лічильник стовпця `IDENTITY` командою `SELECT setval(pg_get_serial_sequence('"Halls"', 'Id'), …)`: наступний зал, доданий програмою, отримає ключ 3, а не спричинить конфлікт ключа 1.

Програма (файл `Program.cs`) додає два сеанси, якщо їх ще немає, і продає квитки на перший:

```cs
using Cinema;
using Microsoft.EntityFrameworkCore;

await using var db = new CinemaContext();
if (!await db.Sessions.AnyAsync())
{
    var start = new DateTime(2026, 10, 3, 17, 0, 0, DateTimeKind.Utc);
    db.Sessions.AddRange(
        new Session { Movie = "Star Route", HallId = 1,
            StartsAt = start, Price = 180m },
        new Session { Movie = "Green Valley", HallId = 2,
            StartsAt = start.AddHours(1), Price = 150m });
    await db.SaveChangesAsync();
}

var session = await db.Sessions
    .Include(s => s.Hall)
    .OrderBy(s => s.StartsAt)
    .FirstAsync();
Console.WriteLine($"{session.Movie}, hall {session.Hall.Name}, " +
    $"{session.StartsAt:HH:mm} UTC");

foreach (var (row, seat) in new[] { (3, 5), (3, 6), (3, 5), (9, 1) })
    Console.WriteLine($"Row {row}, seat {seat}: " +
        await SellAsync(db, session, row, seat));

static async Task<string> SellAsync(
    CinemaContext db, Session session, int row, int seat)
{
    if (row < 1 || row > session.Hall.Rows ||
        seat < 1 || seat > session.Hall.SeatsPerRow)
        return "no such seat";
    var ticket = new Ticket
        { Session = session, Row = row, Seat = seat };
    db.Tickets.Add(ticket);
    try
    {
        await db.SaveChangesAsync();
        return $"sold, ticket {ticket.Id}";
    }
    catch (DbUpdateException)
    {
        // скасувати Add, щоб наступний SaveChanges не повторив його
        db.Entry(ticket).State = EntityState.Detached;
        return "already sold";
    }
}
```

Результат першого запуску:

```
Star Route, hall Red, 17:00 UTC
Row 3, seat 5: sold, ticket 1
Row 3, seat 6: sold, ticket 2
Row 3, seat 5: already sold
Row 9, seat 1: no such seat
```

Перевірку розмірів зали виконує програма, а повторний продаж місця відхиляє унікальний індекс бази даних: навіть якщо дві програми одночасно продають одне місце, другий `INSERT` завершиться помилкою, яку EF Core передає як `DbUpdateException`. Час сеансу створюється з `DateTimeKind.Utc`, бо стовпець `timestamp with time zone` не приймає локальний час.

## Приклад 2. Фітнес-клуб: звіти LINQ і згенерований SQL

Створити консольну програму для бази даних фітнес-клубу (клієнти та відвідування з датою і тривалістю), яка заповнює порожню базу тестовими даними і виводить звіти: кількість відвідувань і години за місяцями; рейтинг клієнтів за сумарним часом, включно з клієнтами без відвідувань. Показати SQL, який генерує EF Core, і спробу використати власний метод C# в умові. База даних `fitness_ef`.

Модель і контекст (файл `Model.cs`):

```cs
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Fitness;

public class Member
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public List<Visit> Visits { get; } = [];
}

public class Visit
{
    public int Id { get; set; }
    public DateOnly Date { get; set; }
    public int Minutes { get; set; }
    public int MemberId { get; set; }
    public Member Member { get; set; } = null!;
}

public class FitnessContext : DbContext
{
    public DbSet<Member> Members => Set<Member>();
    public DbSet<Visit> Visits => Set<Visit>();

    private static readonly string? ConnectionString =
        new ConfigurationBuilder()
            .AddUserSecrets<FitnessContext>()
            .AddEnvironmentVariables()
            .Build()
            .GetConnectionString("Fitness");

    protected override void OnConfiguring(
        DbContextOptionsBuilder options) =>
        options.UseNpgsql(ConnectionString);
}
```

Файл `Program.cs`:

```cs
using Fitness;
using Microsoft.EntityFrameworkCore;

await using var db = new FitnessContext();
if (!await db.Members.AnyAsync())
{
    Member[] members = [new() { Name = "Anna" },
        new() { Name = "Oleh" }, new() { Name = "Iryna" },
        new() { Name = "Taras" }];
    var day = new DateOnly(2026, 9, 1);
    for (int i = 0; i < 40; i++)     // 40 відвідувань за 2 місяці
        members[i % 3].Visits.Add(new Visit
        {
            Date = day.AddDays(i * 3 / 2),
            Minutes = 45 + i % 4 * 15
        });
    db.Members.AddRange(members);    // Taras без відвідувань
    await db.SaveChangesAsync();
}

// 1. Відвідування і години за місяцями
var byMonth = db.Visits
    .GroupBy(v => new { v.Date.Year, v.Date.Month })
    .Select(g => new { g.Key.Year, g.Key.Month,
        Count = g.Count(), Hours = g.Sum(v => v.Minutes) / 60.0 })
    .OrderBy(r => r.Year).ThenBy(r => r.Month);
foreach (var r in await byMonth.ToListAsync())
    Console.WriteLine($"{r.Month:00}.{r.Year}: {r.Count,3} visits, " +
        $"{r.Hours,5:F1} h");
```

```cs
// 2. Клієнти за сумарним часом, зокрема без відвідувань
var ranking = await db.Members
    .Select(m => new
    {
        m.Name,
        Visits = m.Visits.Count,
        Minutes = m.Visits.Sum(v => v.Minutes)
    })
    .OrderByDescending(m => m.Minutes).ThenBy(m => m.Name)
    .ToListAsync();
foreach (var m in ranking)
    Console.WriteLine($"{m.Name,-6} {m.Visits,3} visits " +
        $"{m.Minutes,5} min");

// 3. Метод C# в умові не транслюється в SQL
try
{
    await db.Visits.Where(v => Rules.IsLong(v.Minutes)).CountAsync();
}
catch (InvalidOperationException ex)
{
    string msg = ex.Message;
    Console.WriteLine(msg[..msg.IndexOf(" Additional")]);
}

static class Rules
{
    public static bool IsLong(int minutes) => minutes >= 90;
}
```

Результат:

```
09.2026:  20 visits,  22,5 h
10.2026:  20 visits,  22,5 h
Anna    14 visits   945 min
Iryna   13 visits   885 min
Oleh    13 visits   870 min
Taras    0 visits     0 min
The LINQ expression 'DbSet<Visit>()
    .Where(v => Rules.IsLong(v.Minutes))' could not be translated.
```

SQL першого звіту можна побачити викликом `Console.WriteLine(byMonth.ToQueryString())` або в журналі `LogTo` (довгі рядки перенесено):

```sql
SELECT v0."Year", v0."Month", count(*)::int AS "Count",
    COALESCE(sum(v0."Minutes"), 0)::int::double precision / 60.0
    AS "Hours"
FROM (
    SELECT v."Minutes", date_part('year', v."Date")::int AS "Year",
        date_part('month', v."Date")::int AS "Month"
    FROM "Visits" AS v
) AS v0
GROUP BY v0."Year", v0."Month"
ORDER BY v0."Year", v0."Month"
```

Властивості `Year` і `Month` типу `DateOnly` транслюються у функцію PostgreSQL `date_part`, а ділення на `60.0` – у ділення з приведенням до `double precision`. Для другого звіту EF Core генерує корельовані підзапити `SELECT count(*)` і `SELECT COALESCE(sum(…), 0)` для кожного клієнта; `COALESCE` повертає 0 клієнтові без відвідувань, тому Taras теж є у звіті. Третій запит завершується винятком ще до звернення до бази даних: EF Core не знає, як перетворити метод `Rules.IsLong` на SQL. Умову потрібно записати виразом `v.Minutes >= 90`.

## Приклад 3. Туристичні тури у Windows Forms

Створити застосунок Windows Forms для перегляду турів (назва, країна, дата початку, ціна, кількість місць) з базою даних `tours_ef`: таблиця `DataGridView` показує по 10 турів, відсортованих за датою, кнопки `<` і `>` гортають сторінки, поле пошуку фільтрує тури за частиною назви або країни без урахування регістру. Контекст створювати через `IDbContextFactory<T>`, заповнити порожню базу 25 турами методом `UseSeeding`.

Проєкт *Windows Forms App* (.NET 10): `Form1.cs` і `Form1.Designer.cs` видаляють. Контекст отримує параметри через конструктор, а спільний статичний метод `Configure` використовують і застосунок, і фабрика для інструмента `dotnet ef`, яка потрібна, бо контекст не має конструктора без параметрів (файл `ToursContext.cs`):

```cs
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Tours;

public class Tour
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Country { get; set; } = "";
    public DateOnly Start { get; set; }
    public decimal Price { get; set; }
    public int Places { get; set; }
}

public class ToursContext(DbContextOptions<ToursContext> options)
    : DbContext(options)
{
    public DbSet<Tour> Tours => Set<Tour>();

    // Спільні налаштування для застосунку та інструмента dotnet ef
    public static void Configure(DbContextOptionsBuilder options) =>
        options
            .UseNpgsql(new ConfigurationBuilder()
                .AddUserSecrets<ToursContext>()
                .AddEnvironmentVariables()
                .Build()
                .GetConnectionString("Tours"))
            .UseSeeding((db, _) =>
            {
                var tours = db.Set<Tour>();
                if (tours.Any()) return;
                string[] countries = ["Italy", "Spain", "Greece",
                    "Egypt", "Turkey"];
                for (int i = 0; i < 25; i++)
                    tours.Add(new Tour
                    {
                        Title = $"Tour {i + 1:00}",
                        Country = countries[i % countries.Length],
                        Start = new DateOnly(2027, 5, 1)
                            .AddDays(i * 4),
                        Price = 18000 + i * 750,
                        Places = 10 + i % 6
                    });
                db.SaveChanges();
            });
}

// Створення контексту для dotnet ef migrations / database update
public class DesignTimeFactory
    : IDesignTimeDbContextFactory<ToursContext>
{
    public ToursContext CreateDbContext(string[] args)
    {
        var builder = new DbContextOptionsBuilder<ToursContext>();
        ToursContext.Configure(builder);
        return new ToursContext(builder.Options);
    }
}
```

`UseSeeding` викликається під час `dotnet ef database update`, тому тури з’являються в базі разом із таблицею. Файл `Program.cs` реєструє фабрику контекстів у контейнері залежностей (тема 6) і передає її формі:

```cs
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Tours;

static class Program
{
    [STAThread]
    static void Main()
    {
        ApplicationConfiguration.Initialize();
        using var services = new ServiceCollection()
            .AddDbContextFactory<ToursContext>(ToursContext.Configure)
            .BuildServiceProvider();
        var factory = services
            .GetRequiredService<IDbContextFactory<ToursContext>>();
        Application.Run(new MainForm(factory));
    }
}
```

Форма (файл `MainForm.cs`) на кожне завантаження сторінки створює новий контекст, складає запит поступово і читає лише потрібні стовпці однієї сторінки:

```cs
using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace Tours;

public record TourRow(string Title, string Country, DateOnly Start,
    decimal Price, int Places);

public class MainForm : Form
{
    private const int PageSize = 10;
    private readonly IDbContextFactory<ToursContext> factory;
    private readonly TextBox search = new()
        { Width = 220, PlaceholderText = "Country or title" };
    private readonly Button prev = new() { Text = "<", Width = 40 };
    private readonly Button next = new() { Text = ">", Width = 40 };
    private readonly Label info = new()
        { AutoSize = true, Padding = new Padding(0, 6, 0, 0) };
    private readonly DataGridView grid = new()
    {
        Dock = DockStyle.Fill, ReadOnly = true,
        AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill
    };
    private int page = 1;

    public MainForm(IDbContextFactory<ToursContext> factory)
    {
        this.factory = factory;
        Text = "Tours";
        ClientSize = new Size(640, 360);
        var bar = new FlowLayoutPanel
            { Dock = DockStyle.Top, Height = 34 };
        bar.Controls.AddRange([search, prev, next, info]);
        Controls.AddRange([grid, bar]);
        Load += async (s, e) => await LoadPageAsync();
        search.TextChanged += async (s, e) =>
            { page = 1; await LoadPageAsync(); };
        prev.Click += async (s, e) =>
            { page--; await LoadPageAsync(); };
        next.Click += async (s, e) =>
            { page++; await LoadPageAsync(); };
    }
```

```cs
    private async Task LoadPageAsync()
    {
        try
        {
            // Новий короткоживучий контекст на кожну операцію
            await using var db = await factory.CreateDbContextAsync();
            IQueryable<Tour> query = db.Tours.AsNoTracking();
            string text = search.Text.Trim();
            if (text.Length > 0)
                query = query.Where(t =>
                    EF.Functions.ILike(t.Country, $"%{text}%") ||
                    EF.Functions.ILike(t.Title, $"%{text}%"));
            int total = await query.CountAsync();
            int pages = (total + PageSize - 1) / PageSize;
            pages = Math.Max(pages, 1);
            page = Math.Clamp(page, 1, pages);
            grid.DataSource = await query
                .OrderBy(t => t.Start).ThenBy(t => t.Id)
                .Skip((page - 1) * PageSize).Take(PageSize)
                .Select(t => new TourRow(t.Title, t.Country, t.Start,
                    t.Price, t.Places))
                .ToListAsync();
            info.Text = $"Page {page} of {pages}, tours: {total}";
            prev.Enabled = page > 1;
            next.Enabled = page < pages;
        }
        catch (Exception ex) when (ex is DbException
            or InvalidOperationException)
        {
            MessageBox.Show(this, ex.Message, "Database error",
                MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }
}
```

Після запуску таблиця показує тури 01–10 і напис «Page 1 of 3, tours: 25»; введення `sp` залишає 5 турів до Іспанії (одна сторінка), а кнопки гортання стають недоступними. Запит сторінки містить `WHERE … ILIKE … ORDER BY "Start", "Id" LIMIT … OFFSET …`, тому з бази читається не більше 10 рядків. Сортування доповнено ключем `Id`, щоб порядок турів з однаковою датою був стабільним між сторінками. Якщо сервер PostgreSQL не запущено, виняток `InvalidOperationException` з внутрішнім `NpgsqlException` показується у вікні повідомлення, а застосунок продовжує роботу.
