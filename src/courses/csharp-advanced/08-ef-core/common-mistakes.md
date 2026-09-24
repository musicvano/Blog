---
title: "Common mistakes"
description: "Topic 8. Entity Framework Core: Common mistakes"
outline: [2, 3]
sourceHash: "93c82e16e35609feeb871bde427bf349eee9bc6f69dd88cf03b0e9818b630221"
---

# Common mistakes

## Common mistakes

Common mistakes when working with EF Core are listed in Table 8.3.

Table 8.3. Common mistakes when working with EF Core {.caption}

| **Problem** | **Cause** | **Fix** |
| --- | --- | --- |
| changes do not appear in the database | `SaveChangesAsync` was forgotten | save after changes; check the result |
| `Npgsql…: Failed to connect to 127.0.0.1:5432` | the server is not running, the wrong port or connection string | start the PostgreSQL service; check the secrets |
| `relation "Products" does not exist` | the migration has not been applied | `dotnet ef database update` |
| a slow program, hundreds of queries in the log | N+1 queries: accessing a relationship in a loop | `Include` or a `Select` projection |
| the whole table is read from the database | `ToList()`/`AsEnumerable()` before `Where` | filter in `IQueryable` before `ToListAsync` |
| `could not be translated` | a custom C# method in the query condition | rewrite the condition or evaluate it on the client after filtering |
| an exception for `DateTime` in `timestamp with time zone` | `DateTime.Now` has `Kind = Local` | `DateTime.UtcNow` |
| `A second operation was started on this context` | a shared context for parallel operations | a separate context or a factory |
| a cycle during JSON serialization | the `Author.Posts` and `Post.Author` navigations refer to each other | serialize a DTO projection |
| a migration drops a column with data | a property was renamed | review the migration and replace it with `RenameColumn` |
