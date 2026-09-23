---
title: "Транзакції, сирий SQL і тестування"
description: "Тема 8. Entity Framework Core: Транзакції, сирий SQL і тестування"
outline: [2, 3]
---

# Транзакції, сирий SQL і тестування

## Транзакції та паралельний доступ

### Транзакції

Один виклик `SaveChangesAsync` уже виконується в транзакції: або зберігаються всі зміни, або жодна. Якщо кілька викликів `SaveChangesAsync`, `ExecuteUpdateAsync` чи сирого SQL мають утворити одну логічну операцію, транзакцію відкривають явно (<https://learn.microsoft.com/ef/core/saving/transactions>):

```cs
await using var tx = await db.Database.BeginTransactionAsync();
order.Status = OrderStatus.Paid;
await db.SaveChangesAsync();
await db.Products
    .Where(p => p.Id == order.ProductId)
    .ExecuteUpdateAsync(s =>
        s.SetProperty(p => p.Stock, p => p.Stock - order.Quantity));
await tx.CommitAsync();   // без Commit зміни відкочуються
```

Якщо між `BeginTransactionAsync` і `CommitAsync` виникне виняток (наприклад, порушення обмеження `CK_Products_Stock`), `await using` звільнить транзакцію без підтвердження і PostgreSQL відкотить усі її команди.

### Оптимістична паралельність

Два користувачі прочитали товар із залишком 12. Перший купив 2 і зберіг залишок 10, другий купив 11 і зберіг залишок 1, перезаписавши зміну першого: **втрачене оновлення** (*lost update*). EF Core розв’язує цю проблему **оптимістичною паралельністю** (*optimistic concurrency*): блокувань немає, але до `WHERE` команди `UPDATE` додається умова, що **токен паралельності** не змінився з моменту читання (<https://learn.microsoft.com/ef/core/saving/concurrency>). Якщо рядок уже змінив хтось інший, команда не змінює жодного рядка, і `SaveChangesAsync` кидає виняток `DbUpdateConcurrencyException`.

У PostgreSQL зручний токен – **системний стовпець `xmin`**, який є в кожній таблиці і містить номер транзакції, що востаннє змінила рядок (<https://www.postgresql.org/docs/current/ddl-system-columns.html>). Постачальник Npgsql відображає на нього властивість типу `uint` з атрибутом `[Timestamp]` або налаштуванням `IsRowVersion()` (<https://www.npgsql.org/efcore/modeling/concurrency.html>); міграція стовпця не створює, а після кожного збереження EF Core читає нове значення `xmin`.

### Приклад «Залишок товару»

Два контексти імітують двох користувачів, які одночасно купують гру «Chess» у базі `shop_ef` (властивість `Product.Version` з прикладу «Інтернет-магазин»). Під час конфлікту програма читає актуальні значення з бази, зменшує кількість до доступної і повторює збереження:

```cs
using Microsoft.EntityFrameworkCore;
using Shop;

// Два користувачі одночасно купують одну гру
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
        entry.OriginalValues.SetValues(current);   // новий xmin
        wanted = Math.Min(wanted, stock);
        forBob.Stock = stock - wanted;             // повторна спроба
    }
}
```

Результат (на базі після прикладу «Інтернет-магазин»):

```
Both read stock: 12
Alice bought 2, stock: 10
Conflict: stock is now 10
Bob bought 10
```

Команда `UPDATE` другого контексту містить умову `xmin = <прочитане значення>`, яке вже змінилося після збереження першого контексту, тому виняток виникає саме в `bob.SaveChangesAsync()`. `GetDatabaseValuesAsync` читає рядок заново, а `OriginalValues.SetValues` оновлює знімок разом із новим `xmin`, тож друга спроба проходить. Якщо конфлікти рідкісні, оптимістична паралельність ефективніша за блокування рядків (`SELECT … FOR UPDATE`).

## Сирий SQL, час життя контексту і тестування

### Сирий SQL

Коли LINQ не підходить (специфічна функція PostgreSQL, складний звіт), SQL пишуть самі (<https://learn.microsoft.com/ef/core/querying/sql-queries>):

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

Методи `FromSql`, `SqlQuery` і `Database.ExecuteSqlAsync` (команди без результату) приймають **інтерпольований рядок** `FormattableString`: вставки `{max}` стають параметрами SQL, тому ін’єкція неможлива. До результату `FromSql` можна дописувати LINQ-оператори, EF Core загорне SQL у підзапит. Методи з суфіксом `Raw` (`FromSqlRaw`) приймають звичайний рядок; склеювати їх з уведенням користувача не можна.

### Час життя контексту

`DbContext` **не потокобезпечний** і розрахований на **коротку** роботу: одна операція або один запит вебзастосунку. Дві одночасні асинхронні операції на одному контексті спричиняють виняток *A second operation was started on this context instance before a previous operation completed*. Контекст, що живе довго, накопичує тисячі відстежуваних об’єктів і застарілі дані. Тому:

- у консольній програмі контекст створюють `await using` на кожну операцію;
- у вебзастосунку `AddDbContext` реєструє контекст із часом життя *scoped* – один на запит;
- у настільних застосунках (Windows Forms, WPF) реєструють **фабрику** `services.AddDbContextFactory<ShopContext>(…)` і в кожному обробнику створюють новий контекст: `await using var db = await factory.CreateDbContextAsync();`.

### Тестування

Логіку, що працює з контекстом, перевіряють модульними тестами без сервера PostgreSQL: SQLite у режимі `Data Source=:memory:` (пакет `Microsoft.EntityFrameworkCore.Sqlite`) створює справжню реляційну базу в пам’яті на час тесту; з’єднання відкривають заздалегідь і передають у `UseSqlite(connection)`, а схему створюють `db.Database.EnsureCreated()` (<https://learn.microsoft.com/ef/core/testing/>). SQLite відрізняється від PostgreSQL (немає `ILIKE`, `xmin`, агрегатів `decimal`), тому запити, специфічні для PostgreSQL, перевіряють на тестовому сервері PostgreSQL. Постачальник InMemory для тестів не радять: він не є реляційною базою і не перевіряє обмеження.
