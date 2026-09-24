---
title: "Transactions, raw SQL, and testing"
description: "Topic 8. Entity Framework Core: Transactions, raw SQL, and testing"
outline: [2, 3]
sourceHash: "55333b42a06d5d6bc846626c56f6ab0751901d04c2a3b845a0420b0450cf4ff2"
---

# Transactions, raw SQL, and testing

## Transactions and concurrency

### Transactions

A single `SaveChangesAsync` call already runs in a transaction: either all changes are saved, or none. If several `SaveChangesAsync`, `ExecuteUpdateAsync`, or raw SQL calls must form one logical operation, a transaction is opened explicitly (<https://learn.microsoft.com/ef/core/saving/transactions>):

```cs
await using var tx = await db.Database.BeginTransactionAsync();
order.Status = OrderStatus.Paid;
await db.SaveChangesAsync();
await db.Products
    .Where(p => p.Id == order.ProductId)
    .ExecuteUpdateAsync(s =>
        s.SetProperty(p => p.Stock, p => p.Stock - order.Quantity));
await tx.CommitAsync();   // without Commit, the changes are rolled back
```

If an exception occurs between `BeginTransactionAsync` and `CommitAsync` (for example, a violation of the `CK_Products_Stock` constraint), `await using` disposes the transaction without committing it, and PostgreSQL rolls back all its commands.

### Optimistic concurrency

Two users read a product with a stock of 12. The first bought 2 and saved a stock of 10, and the second bought 11 and saved a stock of 1, overwriting the first user's change: a **lost update**. EF Core solves this problem with **optimistic concurrency**: there are no locks, but the `WHERE` of the `UPDATE` command gets a condition that the **concurrency token** has not changed since it was read (<https://learn.microsoft.com/ef/core/saving/concurrency>). If someone else has already changed the row, the command changes no rows, and `SaveChangesAsync` throws a `DbUpdateConcurrencyException`.

In PostgreSQL, a convenient token is the **`xmin` system column**, which exists in every table and contains the number of the transaction that last changed the row (<https://www.postgresql.org/docs/current/ddl-system-columns.html>). The Npgsql provider maps a property of type `uint` with the `[Timestamp]` attribute or the `IsRowVersion()` configuration to it (<https://www.npgsql.org/efcore/modeling/concurrency.html>); the migration does not create a column, and after each save EF Core reads the new `xmin` value.

### The "Product stock" example

Two contexts simulate two users who simultaneously buy the "Chess" game in the `shop_ef` database (the `Product.Version` property from the "Online store" example). On a conflict, the program reads the current values from the database, reduces the quantity to what is available, and retries the save:

```cs
using Microsoft.EntityFrameworkCore;
using Shop;

// Two users buy the same game at the same time
await using var alice = new ShopContext();
await using var bob = new ShopContext();
var forAlice = await alice.Products
    .SingleAsync(p => p.Name == "Chess");
var forBob = await bob.Products
    .SingleAsync(p => p.Name == "Chess");
Console.WriteLine($"Both read stock: {forBob.Stock}");

forAlice.Stock -= 2;
await alice.SaveChangesAsync();
Console.WriteLine($"Alice bought 2, stock: {forAlice.Stock}");

int wanted = 11;
forBob.Stock -= wanted;
while (true)
{
    try
    {
        await bob.SaveChangesAsync();
        Console.WriteLine($"Bob bought {wanted}");
        break;
    }
    catch (DbUpdateConcurrencyException ex)
    {
        var entry = ex.Entries.Single();
        var current = await entry.GetDatabaseValuesAsync();
        if (current is null)
        {
            Console.WriteLine("Product was deleted");
            break;
        }
        int stock = current.GetValue<int>(nameof(Product.Stock));
        Console.WriteLine($"Conflict: stock is now {stock}");
        entry.OriginalValues.SetValues(current);   // the new xmin
        wanted = Math.Min(wanted, stock);
        forBob.Stock = stock - wanted;             // retry
    }
}
```

The result (on the database after the "Online store" example):

```
Both read stock: 12
Alice bought 2, stock: 10
Conflict: stock is now 10
Bob bought 10
```

The second context's `UPDATE` command contains the condition `xmin = <the value read>`, which has already changed after the first context saved, so the exception occurs exactly in `bob.SaveChangesAsync()`. `GetDatabaseValuesAsync` rereads the row, and `OriginalValues.SetValues` updates the snapshot together with the new `xmin`, so the second attempt succeeds. If conflicts are rare, optimistic concurrency is more efficient than row locking (`SELECT … FOR UPDATE`).

## Raw SQL, context lifetime, and testing

### Raw SQL

When LINQ does not fit (a specific PostgreSQL function, a complex report), you write the SQL yourself (<https://learn.microsoft.com/ef/core/querying/sql-queries>):

```cs
decimal max = 1000m;
var cheap = await db.Products
    .FromSql($"SELECT * FROM \"Products\" WHERE \"Price\" < {max}")
    .OrderBy(p => p.Name)
    .ToListAsync();

var totals = await db.Database
    .SqlQuery<CategoryTotal>($"""
        SELECT c."Name", sum(p."Stock")::int AS "Stock"
        FROM "Products" p
        JOIN "Categories" c ON c."Id" = p."CategoryId"
        GROUP BY c."Name"
        """)
    .ToListAsync();

record CategoryTotal(string Name, int Stock);
```

The `FromSql`, `SqlQuery`, and `Database.ExecuteSqlAsync` (commands without a result) methods take an **interpolated string**, `FormattableString`: the `{max}` insertions become SQL parameters, so injection is impossible. LINQ operators can be appended to the result of `FromSql`, and EF Core wraps the SQL in a subquery. The methods with the `Raw` suffix (`FromSqlRaw`) take an ordinary string; they must not be concatenated with user input.

### Context lifetime

`DbContext` is **not thread-safe** and is designed for **short** work: one operation or one request of a web application. Two simultaneous asynchronous operations on one context cause the exception *A second operation was started on this context instance before a previous operation completed*. A long-lived context accumulates thousands of tracked objects and stale data. Therefore:

- in a console program, a context is created with `await using` for each operation;
- in a web application, `AddDbContext` registers the context with the *scoped* lifetime—one per request;
- in desktop applications (Windows Forms, WPF), a **factory** is registered, `services.AddDbContextFactory<ShopContext>(…)`, and each handler creates a new context: `await using var db = await factory.CreateDbContextAsync();`.

### Testing

Logic that works with a context is tested with unit tests without a PostgreSQL server: SQLite in `Data Source=:memory:` mode (the `Microsoft.EntityFrameworkCore.Sqlite` package) creates a real relational database in memory for the duration of the test; the connection is opened in advance and passed to `UseSqlite(connection)`, and the schema is created with `db.Database.EnsureCreated()` (<https://learn.microsoft.com/ef/core/testing/>). SQLite differs from PostgreSQL (there is no `ILIKE`, `xmin`, or `decimal` aggregates), so PostgreSQL-specific queries are tested on a test PostgreSQL server. The InMemory provider is not recommended for tests: it is not a relational database and does not check constraints.
