---
title: "Summary"
description: "Topic 7. SQL and ADO.NET: conclusions and review questions"
sourceHash: "496f870d7c59869e8c4ca9b49e90fa5c4f41d937275f07c563d777db3f41161b"
---

# Summary

## Conclusions

A relational database stores data in tables linked by primary and foreign keys, and the DBMS enforces data integrity with constraints. A schema is designed from an ER diagram and normalized to the third normal form so that each fact is stored once. SQL has DDL commands for creating the structure, DML for changing data, and the `SELECT` query with conditions, sorting, grouping, and table joins. PostgreSQL 18 is installed with the EDB installer, and the database is worked with in `psql`, pgAdmin, or DataGrip. In .NET, data access is provided by ADO.NET: the Npgsql provider implements the connection, command, reader, and transaction classes, and `NpgsqlDataSource` manages the connection pool. The connection string is stored in user secrets, all values are passed as parameters, which protects against SQL injection, and related changes are combined into a transaction. Disconnected mode with a `DataTable` is convenient for displaying data in a `DataGridView`.

## Self-check questions

1. What are a database and a DBMS? Name the main concepts of the relational model.
2. What are primary and foreign keys? How does a surrogate key differ from a natural one?
3. How are 1:1, 1:N, and N:M relationships implemented?
4. What kinds of data integrity does a DBMS enforce?
5. State the requirements of 1NF, 2NF, and 3NF. Which anomalies does normalization eliminate?
6. How do you install PostgreSQL on Windows? What are `psql`, pgAdmin, and DataGrip for?
7. Which PostgreSQL data types are used for integers, money, strings, and dates? What is an identity column?
8. Which constraints can be specified in `CREATE TABLE`? What do `ON DELETE CASCADE` and `RESTRICT` mean?
9. What are indexes for? For which columns does PostgreSQL create them automatically?
10. How does `WHERE` differ from `HAVING`? How do aggregate functions work with `GROUP BY`?
11. How do `INNER JOIN`, `LEFT JOIN`, and `FULL JOIN` differ? Why can you not test `= NULL`?
12. Which ADO.NET classes does the Npgsql provider implement? What is `NpgsqlDataSource` for?
13. What is a connection pool, and how does it affect working with connections in a program?
14. How do the `ExecuteNonQueryAsync`, `ExecuteScalarAsync`, and `ExecuteReaderAsync` methods differ?
15. What is SQL injection? Why does a parameterized query protect against it?
16. What are a transaction and the ACID properties? How do you execute a transaction in Npgsql?

## Useful links

- PostgreSQL documentation: <https://www.postgresql.org/docs/current/>
- PostgreSQL tutorial (SQL for beginners): <https://www.postgresql.org/docs/current/tutorial.html>
- Installing PostgreSQL on Windows: <https://www.postgresql.org/download/windows/>
- DataGrip documentation: <https://www.jetbrains.com/help/datagrip/>
- Npgsql documentation: <https://www.npgsql.org/doc/>
- Npgsql connection string parameters: <https://www.npgsql.org/doc/connection-string-parameters.html>
- ADO.NET overview: <https://learn.microsoft.com/dotnet/framework/data/adonet/ado-net-overview>
- User secrets: <https://learn.microsoft.com/aspnet/core/security/app-secrets>
- SQL injection (OWASP): <https://owasp.org/www-community/attacks/SQL_Injection>
