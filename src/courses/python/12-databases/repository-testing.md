---
title: "Repositories, tests, and common mistakes"
description: "Topic 12. Databases, SQL, SQLAlchemy: Repositories, tests, and common mistakes"
outline: [2, 3]
sourceHash: "b096be188e1ef0ec8ecd0815fe0b9852d9f287e7bbe52faef80623659d01a77a"
---

# Repositories, tests, and common mistakes

## Repositories, tests, and schema changes

A repository separates domain data-access operations from the CLI. It may have `add`, `get`, and `list`, but should not secretly commit after every small step if a service needs to combine them in one transaction. The transaction owner should be clear from the contract: the service or a top-level context.

Tests check more than successful insertion. Include a duplicate unique field, a missing parent key, a negative amount, rollback of a partial batch, and an empty result set. For SQLite `:memory:`, each independent connection usually has a separate database; do not create a schema on one connection and expect it on another. In a simple ORM fixture, create a separate engine for each test and close the session before `engine.dispose()`.

SQLAlchemy does not eliminate differences between DBMSs. Moving to PostgreSQL requires the appropriate driver and URL, and checks of types, SQL, and transaction behavior, rather than merely replacing a string. In this topic, we compare approaches on the same SQLite database so learning an ORM is not mixed with administering a server DBMS.

Alembic is a separate versioned-migration tool for SQLAlchemy. At the advanced level, you can explore it further: model metadata is compared with the schema, but the automatically generated script must be reviewed. It does not infallibly infer renames or transformations of existing data. Before changing a production database, make a backup and test the script on a copy; `create_all` does not replace a migration. Overview: <https://alembic.sqlalchemy.org/en/latest/tutorial.html>.

To view the learning database file, you can use DataGrip: create a SQLite data source, choose the file, and test the connection. Use the path of the database you created rather than accidentally creating a new empty file. The CLI and Python are sufficient for the tasks; a GUI helps you see the schema and query results. <https://www.jetbrains.com/help/datagrip/connecting-to-a-database.html>.

::: info Screenshot
Data Source → SQLite; a neutral path; Test Connection.
:::

Figure 12.10. Connecting DataGrip to the learning SQLite file. {.caption}

::: info Screenshot
The students/grades schema; show the row for a student without grades.
:::

Figure 12.11. LEFT JOIN and grade grouping in the query console. {.caption}

## Common mistakes

- The foreign-key PRAGMA runs inside an open transaction. Configure the connection before switching to `autocommit=False`.
- `with db` is treated as closing the resource. Add `closing` or an explicit `close` after all transactions finish.
- A value is inserted through an f-string. Pass parameters separately; choose field names only from an allowed set.
- Part of an import remains in the database after an error. Combine the entire batch in one transaction and catch the exception outside it.
- `create_all` is expected to update the schema. Use a controlled migration or a new disposable learning database.
- An object from a closed session needs lazy loading. Fetch the required data before closing; do not hide queries inside printing.
- A query without `ORDER BY` is used as a stable report. Specify a complete order, including a unique key.
