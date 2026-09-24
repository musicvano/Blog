---
title: "Common mistakes"
description: "Topic 7. SQL and ADO.NET: Common mistakes"
outline: [2, 3]
sourceHash: "14746cedf7c1699bfd2a9eeb6f45fb1fa6b75c1769082c2c3990087d6935913a"
---

# Common mistakes

## Common mistakes

Table 7.4 lists the mistakes made most often when working with databases.

Table 7.4. Common mistakes when working with databases {.caption}

| **Problem** | **Cause** | **Fix** |
| --- | --- | --- |
| SQL injection, a syntax error because of an apostrophe in a name (O’Brien) | SQL is built by string concatenation or interpolation | `$1` parameters and `Parameters.AddWithValue` |
| `Failed to connect to 127.0.0.1:5432` | the PostgreSQL service is not running, wrong port or host | start the service, check the connection string in DataGrip |
| a password ended up in Git | the connection string is written in code or `appsettings.json` | `dotnet user-secrets`, environment variables; change the password |
| `The connection pool has been exhausted` | connections and readers are not released | `await using` for connections, commands, readers |
| a `= NULL` condition finds no rows | comparison with `NULL` yields `NULL` | `IS NULL`, `IS NOT NULL` |
| half of the changes were saved after an error | related commands were executed without a transaction | `BeginTransactionAsync`, `CommitAsync` |
| queries get slower as the table grows | no index for the condition or join | `CREATE INDEX` for foreign keys and search fields |
