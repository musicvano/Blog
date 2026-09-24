---
title: "Practice"
description: "Topic 8. Entity Framework Core: worked examples"
outline: [2, 3]
sourceHash: "38af7ca7375268c3a1ebf9f0902ca8e1d9030610492a752c2cc67c1b08febcb0"
---

# Practice

Each example is a separate .NET 10 project with the `Npgsql.EntityFrameworkCore.PostgreSQL`, `Microsoft.EntityFrameworkCore.Design`, `Microsoft.Extensions.Configuration.UserSecrets`, and `…EnvironmentVariables` packages and a separate database created in `psql` as `postgres` (`CREATE DATABASE cinema_ef OWNER library_app;`). The connection string is written to user secrets with the key `ConnectionStrings:<Name>`, as in the lecture, and the tables are created with the `dotnet ef migrations add InitialCreate` and `dotnet ef database update` commands.

## Example 1. A movie theater: the model, the Fluent API, and seed data

Create a movie theater database model: halls (name, number of rows and seats per row), sessions (movie, start time in UTC, price, hall), and tickets (row, seat, session). Move the configuration into `IEntityTypeConfiguration<T>` classes; add the halls as the migration's seed data; forbid deleting a hall that has sessions and selling the same seat for a session twice. A console program sells several tickets and reports nonexistent and already sold seats. The database is `cinema_ef`.

The entities (the `Model.cs` file) contain no attributes: all the configuration is in the Fluent API.

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

The `CinemaContext.cs` file:

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
        b.HasData(                                 // seed data
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
            .OnDelete(DeleteBehavior.Restrict);   // do not delete the hall
    }
}

class TicketConfiguration : IEntityTypeConfiguration<Ticket>
{
    public void Configure(EntityTypeBuilder<Ticket> b) =>
        // a seat can be sold only once per session
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

`HasOne(s => s.Hall).WithMany()` describes a relationship without a collection of sessions in the `Hall` class. The `InitialCreate` migration contains the halls in a `migrationBuilder.InsertData(table: "Halls", …)` call, and the `dotnet ef migrations script` script shows that, after inserting halls with explicit keys, the Npgsql provider advances the `IDENTITY` column counter with the command `SELECT setval(pg_get_serial_sequence('"Halls"', 'Id'), …)`: the next hall added by the program gets key 3 instead of causing a conflict on key 1.

The program (the `Program.cs` file) adds two sessions if there are none yet and sells tickets for the first one:

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
        // undo the Add so that the next SaveChanges does not repeat it
        db.Entry(ticket).State = EntityState.Detached;
        return "already sold";
    }
}
```

The result of the first run:

```
Star Route, hall Red, 17:00 UTC
Row 3, seat 5: sold, ticket 1
Row 3, seat 6: sold, ticket 2
Row 3, seat 5: already sold
Row 9, seat 1: no such seat
```

The hall size check is performed by the program, and a repeated sale of a seat is rejected by the database's unique index: even if two programs sell the same seat at the same time, the second `INSERT` fails with an error that EF Core passes on as a `DbUpdateException`. The session time is created with `DateTimeKind.Utc`, because a `timestamp with time zone` column does not accept local time.

## Example 2. A fitness club: LINQ reports and the generated SQL

Create a console program for a fitness club database (members and visits with a date and duration) that fills an empty database with test data and prints reports: the number of visits and hours by month; a ranking of members by total time, including members without visits. Show the SQL that EF Core generates and an attempt to use a custom C# method in a condition. The database is `fitness_ef`.

The model and the context (the `Model.cs` file):

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

The `Program.cs` file:

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
    for (int i = 0; i < 40; i++)     // 40 visits over 2 months
        members[i % 3].Visits.Add(new Visit
        {
            Date = day.AddDays(i * 3 / 2),
            Minutes = 45 + i % 4 * 15
        });
    db.Members.AddRange(members);    // Taras has no visits
    await db.SaveChangesAsync();
}

// 1. Visits and hours by month
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
// 2. Members by total time, including those without visits
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

// 3. A C# method in a condition is not translated to SQL
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

The result:

```
09.2026:  20 visits,  22.5 h
10.2026:  20 visits,  22.5 h
Anna    14 visits   945 min
Iryna   13 visits   885 min
Oleh    13 visits   870 min
Taras    0 visits     0 min
The LINQ expression 'DbSet<Visit>()
    .Where(v => Rules.IsLong(v.Minutes))' could not be translated.
```

The SQL of the first report can be seen by calling `Console.WriteLine(byMonth.ToQueryString())` or in the `LogTo` log (long lines are wrapped):

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

The `Year` and `Month` properties of the `DateOnly` type are translated into the PostgreSQL `date_part` function, and division by `60.0` into division with a cast to `double precision`. For the second report, EF Core generates correlated `SELECT count(*)` and `SELECT COALESCE(sum(…), 0)` subqueries for each member; `COALESCE` returns 0 for a member without visits, so Taras also appears in the report. The third query fails with an exception even before the database is accessed: EF Core does not know how to convert the `Rules.IsLong` method into SQL. The condition must be written as the expression `v.Minutes >= 90`.

## Example 3. Travel tours in Windows Forms

Create a Windows Forms application for browsing tours (title, country, start date, price, number of places) with the `tours_ef` database: a `DataGridView` shows 10 tours per page sorted by date, the `<` and `>` buttons flip pages, and a search field filters tours by part of the title or country case-insensitively. Create the context through `IDbContextFactory<T>`, and fill an empty database with 25 tours using the `UseSeeding` method.

A *Windows Forms App* (.NET 10) project: `Form1.cs` and `Form1.Designer.cs` are deleted. The context receives its options through the constructor, and the shared static `Configure` method is used both by the application and by a factory for the `dotnet ef` tool, which is needed because the context has no parameterless constructor (the `ToursContext.cs` file):

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

    // Shared options for the application and the dotnet ef tool
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

// Creating the context for dotnet ef migrations / database update
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

`UseSeeding` is called during `dotnet ef database update`, so the tours appear in the database together with the table. The `Program.cs` file registers the context factory in the dependency injection container (Topic 6) and passes it to the form:

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

The form (the `MainForm.cs` file) creates a new context for each page load, composes the query step by step, and reads only the needed columns of one page:

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
            // A new short-lived context for each operation
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

After startup, the grid shows tours 01–10 and the label "Page 1 of 3, tours: 25"; entering `sp` leaves 5 tours to Spain (one page), and the page buttons become unavailable. The page query contains `WHERE … ILIKE … ORDER BY "Start", "Id" LIMIT … OFFSET …`, so no more than 10 rows are read from the database. The sorting is supplemented with the `Id` key so that the order of tours with the same date is stable across pages. If the PostgreSQL server is not running, an `InvalidOperationException` with an inner `NpgsqlException` is shown in a message box, and the application keeps working.
