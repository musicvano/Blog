---
title: "Summary"
description: "Topic 8. Entity Framework Core: conclusions and review questions"
sourceHash: "6719fc090b0f55e8e164dbcb71fdc22ce8d928e217df654dbfdcd60e16caefff"
---

# Summary

## Conclusions

Entity Framework Core maps C# classes to the tables of a relational database: a `DbContext` with `DbSet<T>` properties executes LINQ queries, which the Npgsql provider translates into PostgreSQL SQL, and saves object changes with a single `SaveChangesAsync` call. The model is built by conventions and refined with annotations or the Fluent API; 1:N, 1:1, and N:M relationships are described with navigation properties and foreign keys. The database schema is changed with migrations, which are generated and applied by the `dotnet ef` tool and must be reviewed. Queries read only what is needed: filtering, projections, and pagination are performed in the database, related data is loaded through `Include`, and lazy loading leads to the N+1 problem. The change tracker determines which commands to execute; `AsNoTracking` is used for read-only data, and `ExecuteUpdateAsync` and `ExecuteDeleteAsync` for bulk changes. Several operations are combined into a transaction, and lost updates are detected with the `xmin` concurrency token. A context is created for a short operation, and in desktop applications through a factory.

## Self-check questions

1. What are ORM and the object-relational impedance mismatch?
2. How does EF Core differ from ADO.NET and micro-ORMs? What are code-first and database-first?
3. Which packages and tools are needed to use EF Core with PostgreSQL?
4. What are the `DbContext` and `DbSet<T>` classes for? Where is the connection string set?
5. Which conventions does EF Core use for keys, relationships, and whether columns are required?
6. How do data annotations differ from the Fluent API? What is `IEntityTypeConfiguration<T>` for?
7. How do you describe 1:N, 1:1, and N:M relationships? What is a relationship with a payload?
8. What is a migration? Which files does `dotnet ef migrations add` create? What is `__EFMigrationsHistory` for?
9. How does `IQueryable<T>` differ from `IEnumerable<T>`? What is deferred execution?
10. How do you view the SQL that EF Core generates?
11. What is client evaluation, and when does EF Core throw a translation exception?
12. What ways of loading related data exist? What is the N+1 problem?
13. What states does an entity have in `ChangeTracker`? When should you use `AsNoTracking`?
14. How do `ExecuteUpdateAsync` and explicit transactions work?
15. What is optimistic concurrency, and how do you use `xmin` in PostgreSQL?

## Useful links

- EF Core documentation: <https://learn.microsoft.com/ef/core/>
- What's new in EF Core 10: <https://learn.microsoft.com/ef/core/what-is-new/ef-core-10.0/whatsnew>
- The Npgsql provider for EF Core: <https://www.npgsql.org/efcore/>
- The `dotnet ef` tools: <https://learn.microsoft.com/ef/core/cli/dotnet>
- Migrations: <https://learn.microsoft.com/ef/core/managing-schemas/migrations/>
- Relationships: <https://learn.microsoft.com/ef/core/modeling/relationships>
- Loading related data: <https://learn.microsoft.com/ef/core/querying/related-data/>
- Change tracking: <https://learn.microsoft.com/ef/core/change-tracking/>
- Concurrency: <https://learn.microsoft.com/ef/core/saving/concurrency>
- Concurrency tokens in Npgsql: <https://www.npgsql.org/efcore/modeling/concurrency.html>
