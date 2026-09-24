---
title: "Practice"
description: "Topic 7. SQL and ADO.NET: worked examples"
outline: [2, 3]
sourceHash: "a3c1c708a2c7f9b56f77ee4f563bd46ae4db0e9973e234d7e002fa35834ad0db"
---

# Practice

For each example, a separate database and role are created as described in the lecture (`CREATE ROLE … LOGIN PASSWORD …`, `CREATE DATABASE … OWNER …`), and the connection string is stored in user secrets: `dotnet user-secrets set "ConnectionStrings:<name>" "Host=localhost;…"`. The C# projects use the `Npgsql` and `Microsoft.Extensions.Configuration.UserSecrets` packages.

## Example 1. A sports club

Design a sports club database: trainers, sections with a monthly fee, members, member enrollments in sections (an N:M relationship), and payments. Write a script that creates the tables with constraints, fill the tables, and run queries: sections with trainers, the number of members in each section, income by month, members with a monthly fee over 1,000 UAH, members without a payment for March, and a 10% fee increase for sections without a trainer.

A section may temporarily have no trainer, so `trainer_id` allows `NULL`, and deleting a trainer clears the reference (`ON DELETE SET NULL`). Money is stored in `numeric(8, 2)`: the `double precision` type introduces rounding errors.

```sql
CREATE TABLE trainers (
    id    integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name  varchar(100) NOT NULL,
    phone varchar(20) UNIQUE
);

CREATE TABLE sections (
    id         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name       varchar(50) NOT NULL UNIQUE,
    trainer_id integer REFERENCES trainers (id) ON DELETE SET NULL,
    fee        numeric(8, 2) NOT NULL CHECK (fee > 0)
);

CREATE TABLE members (
    id        integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name      varchar(100) NOT NULL,
    birth     date NOT NULL,
    joined_at date NOT NULL DEFAULT CURRENT_DATE
);
```

```sql
CREATE TABLE enrollments (
    member_id  integer REFERENCES members (id) ON DELETE CASCADE,
    section_id integer REFERENCES sections (id) ON DELETE CASCADE,
    PRIMARY KEY (member_id, section_id)
);

CREATE TABLE payments (
    id        bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    member_id integer NOT NULL REFERENCES members (id),
    amount    numeric(8, 2) NOT NULL CHECK (amount > 0),
    paid_on   date NOT NULL
);

INSERT INTO trainers (name, phone)
VALUES ('Andrii Melnyk', '+380501112233'),
       ('Oksana Tkachenko', '+380671234567'),
       ('Serhii Lysenko', NULL);

INSERT INTO sections (name, trainer_id, fee)
VALUES ('Swimming', 1, 900), ('Tennis', 2, 1200),
       ('Yoga', 2, 700), ('Boxing', NULL, 1000);
```

```sql
INSERT INTO members (name, birth, joined_at)
VALUES ('Denys Koval', '2004-03-15', '2026-01-10'),
       ('Mariia Savchuk', '2006-07-02', '2026-02-01'),
       ('Taras Oliinyk', '1999-11-20', '2026-02-15'),
       ('Yuliia Moroz', '2008-05-09', '2026-03-03');

INSERT INTO enrollments (member_id, section_id)
VALUES (1, 1), (1, 2), (2, 3), (3, 1), (3, 3), (4, 3);

INSERT INTO payments (member_id, amount, paid_on)
VALUES (1, 2100, '2026-01-10'), (2, 700, '2026-02-01'),
       (3, 1600, '2026-02-15'), (1, 2100, '2026-02-10'),
       (2, 700, '2026-03-01'), (3, 1600, '2026-03-15');
```

Queries 1 and 2 use `LEFT JOIN` so that the section without a trainer and the section without members get into the result. Query 3 groups payments by the "year-month" string returned by the `to_char` function; PostgreSQL allows referring to the `month` column alias in `GROUP BY`.

```sql
-- 1. Sections with trainers (including a section without a trainer).
SELECT s.name AS section, t.name AS trainer, s.fee
FROM sections AS s
LEFT JOIN trainers AS t ON t.id = s.trainer_id
ORDER BY s.name;

-- 2. The number of members in each section.
SELECT s.name AS section, count(e.member_id) AS members
FROM sections AS s
LEFT JOIN enrollments AS e ON e.section_id = s.id
GROUP BY s.id, s.name
ORDER BY members DESC, s.name;

-- 3. Income by month.
SELECT to_char(paid_on, 'YYYY-MM') AS month,
       count(*) AS payments, sum(amount) AS total
FROM payments
GROUP BY month
ORDER BY month;
```

```
 section  |     trainer      |   fee
----------+------------------+---------
 Boxing   |                  | 1000.00
 Swimming | Andrii Melnyk    |  900.00
 Tennis   | Oksana Tkachenko | 1200.00
 Yoga     | Oksana Tkachenko |  700.00
(4 rows)

 section  | members
----------+---------
 Yoga     |       3
 Swimming |       2
 Tennis   |       1
 Boxing   |       0
(4 rows)

  month  | payments |  total
---------+----------+---------
 2026-01 |        1 | 2100.00
 2026-02 |        3 | 4400.00
 2026-03 |        2 | 2300.00
(3 rows)
```

Query 4 filters groups with a `HAVING` condition, and query 5 finds members without a payment with a `NOT EXISTS` subquery (the `>=`/`<` date range does not depend on the number of days in the month). The 10% fee increase for sections without a trainer is performed by the command `UPDATE sections SET fee = round(fee * 1.1, 2) WHERE trainer_id IS NULL RETURNING name, fee;`, which returns the row `Boxing | 1100.00`.

```sql
-- 4. A member's monthly fee over 1,000 UAH.
SELECT m.name, sum(s.fee) AS monthly_fee
FROM members AS m
JOIN enrollments AS e ON e.member_id = m.id
JOIN sections AS s ON s.id = e.section_id
GROUP BY m.id, m.name
HAVING sum(s.fee) > 1000
ORDER BY monthly_fee DESC;

-- 5. Members who did not pay in March 2026.
SELECT name
FROM members AS m
WHERE NOT EXISTS (
    SELECT 1 FROM payments AS p
    WHERE p.member_id = m.id
      AND p.paid_on >= DATE '2026-03-01'
      AND p.paid_on < DATE '2026-04-01')
ORDER BY name;
```

```
     name      | monthly_fee
---------------+-------------
 Denys Koval   |     2100.00
 Taras Oliinyk |     1600.00
(2 rows)

     name
--------------
 Denys Koval
 Yuliia Moroz
(2 rows)
```

## Example 2. Student performance

Write a console program that receives the name of an academic group as a command-line argument and prints a table of the group's students: the number of grades, the average score with one decimal place, and the lowest grade, sorted by the average score. Students without grades are also shown. Below the table, the number of students and the group's average score are printed. If the argument is not given, the program prints a hint and exits with code 2; if the group does not exist, it exits with code 1.

The schema of the `university` database and test data:

```sql
CREATE TABLE students (
    id         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name       varchar(100) NOT NULL,
    group_name varchar(10) NOT NULL
);

CREATE TABLE grades (
    id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_id integer NOT NULL
               REFERENCES students (id) ON DELETE CASCADE,
    subject    varchar(50) NOT NULL,
    score      integer NOT NULL CHECK (score BETWEEN 0 AND 100),
    UNIQUE (student_id, subject)
);

INSERT INTO students (name, group_name)
VALUES ('Anna Petrenko', 'CS-24'), ('Bohdan Hnatiuk', 'CS-24'),
       ('Viktor Zinchenko', 'CS-24'), ('Halyna Rudenko', 'CS-25');

INSERT INTO grades (student_id, subject, score)
VALUES (1, 'Math', 92), (1, 'Programming', 88), (1, 'Physics', 95),
       (2, 'Math', 60), (2, 'Programming', 75), (2, 'Physics', 54),
       (4, 'Math', 81);
```

For integers, the `avg` function returns `numeric`, and `round(…, 1)` keeps one decimal place; in C#, this is `decimal`. For a student without grades, `avg` and `min` give `NULL`, so the values are checked with the `IsDBNull` method before reading, and `NULLS LAST` puts such students at the end.

```cs
using Microsoft.Extensions.Configuration;
using Npgsql;

if (args.Length != 1)
{
    Console.Error.WriteLine("Usage: Grades <group>");
    return 2;
}
string group = args[0];

IConfiguration config = new ConfigurationBuilder()
    .AddUserSecrets<Program>()
    .Build();
await using var dataSource = NpgsqlDataSource.Create(
    config.GetConnectionString("University")!);
```

```cs
try
{
    await using NpgsqlCommand cmd = dataSource.CreateCommand("""
        SELECT s.name, count(g.score) AS grades,
               round(avg(g.score), 1) AS average,
               min(g.score) AS worst
        FROM students AS s
        LEFT JOIN grades AS g ON g.student_id = s.id
        WHERE s.group_name = $1
        GROUP BY s.id, s.name
        ORDER BY average DESC NULLS LAST, s.name
        """);
    cmd.Parameters.AddWithValue(group);

    Console.WriteLine($"Group {group}");
    Console.WriteLine(
        $"{"Student",-18}{"Grades",7}{"Average",9}{"Min",5}");
    Console.WriteLine(new string('-', 39));
    int students = 0;
    await using (NpgsqlDataReader r = await cmd.ExecuteReaderAsync())
    {
        while (await r.ReadAsync())
        {
            string average = r.IsDBNull(2)
                ? "-" : r.GetDecimal(2).ToString("F1");
            string worst = r.IsDBNull(3)
                ? "-" : r.GetInt32(3).ToString();
            Console.WriteLine($"{r.GetString(0),-18}"
                + $"{r.GetInt64(1),7}{average,9}{worst,5}");
            students++;
        }
    }
```

The reader is disposed at the end of the `await using (…) { }` block, before the second command runs. The group's average score is returned by `ExecuteScalarAsync`: if the group has no grades at all, the result is `DBNull.Value`, and the `value is decimal avg` pattern does not match.

```cs
    if (students == 0)
    {
        Console.Error.WriteLine($"Group '{group}' not found.");
        return 1;
    }

    await using NpgsqlCommand total = dataSource.CreateCommand("""
        SELECT round(avg(g.score), 1)
        FROM grades AS g
        JOIN students AS s ON s.id = g.student_id
        WHERE s.group_name = $1
        """);
    total.Parameters.AddWithValue(group);
    object? value = await total.ExecuteScalarAsync();
    Console.WriteLine(new string('-', 39));
    Console.WriteLine(value is decimal avg
        ? $"Students: {students}, group average: {avg:F1}"
        : $"Students: {students}, no grades yet");
    return 0;
}
catch (NpgsqlException ex)
{
    Console.Error.WriteLine($"Database error: {ex.Message}");
    return 1;
}
```

The result of the command `dotnet run -- CS-24`:

```
Group CS-24
Student            Grades  Average  Min
---------------------------------------
Anna Petrenko           3     91.7   88
Bohdan Hnatiuk          3     63.0   54
Viktor Zinchenko        0        -    -
---------------------------------------
Students: 3, group average: 77.3
```

## Example 3. Product catalog

Write a Windows Forms application that shows products in a `DataGridView` with a search by part of the name or category and the total stock value in the status bar. For the selected product, the *Move* button records a receipt (a positive quantity) or a shipment (a negative one): a record in the `stock_moves` movement log and the change in stock are performed in one transaction; the stock cannot become negative.

```sql
CREATE TABLE products (
    id       integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name     varchar(100) NOT NULL,
    category varchar(50) NOT NULL,
    price    numeric(10, 2) NOT NULL CHECK (price >= 0),
    stock    integer NOT NULL DEFAULT 0 CHECK (stock >= 0)
);

CREATE TABLE stock_moves (
    id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id integer NOT NULL REFERENCES products (id),
    quantity   integer NOT NULL CHECK (quantity <> 0),
    moved_at   timestamptz NOT NULL DEFAULT now()
);

INSERT INTO products (name, category, price, stock)
VALUES ('USB cable', 'Accessories', 149.90, 40),
       ('Wireless mouse', 'Accessories', 499.00, 12),
       ('Laptop 15 inch', 'Computers', 32999.00, 3),
       ('Monitor 27 inch', 'Computers', 8999.00, 5);
```

A *Windows Forms App* (.NET 10) project: the `Form1.cs` and `Form1.Designer.cs` files are deleted, and `Program.cs` creates an `NpgsqlDataSource` in the same way as the "Book Browser" application in the theory section (the connection string `ConnectionStrings:Shop`) and runs `new MainForm(dataSource)`.

```cs
using System.Data;
using Npgsql;

namespace Products;

public class MainForm : Form
{
    private readonly NpgsqlDataSource dataSource;
    private readonly TextBox searchBox = new() { Width = 180 };
    private readonly NumericUpDown quantity = new()
    {
        Minimum = -1000, Maximum = 1000, Value = 10
    };
    private readonly DataGridView grid = new()
    {
        Dock = DockStyle.Fill,
        ReadOnly = true,
        AllowUserToAddRows = false,
        SelectionMode = DataGridViewSelectionMode.FullRowSelect,
        MultiSelect = false
    };
    private readonly ToolStripStatusLabel status = new();
```

```cs
public MainForm(NpgsqlDataSource dataSource)
{
    this.dataSource = dataSource;
    Text = "Products";
    ClientSize = new Size(680, 400);
    var search = new Button { Text = "Search", AutoSize = true };
    var move = new Button { Text = "Move", AutoSize = true };
    search.Click += async (s, e) => await LoadAsync();
    move.Click += async (s, e) => await MoveStockAsync();
    var top = new FlowLayoutPanel
    {
        Dock = DockStyle.Top, Height = 36
    };
    top.Controls.AddRange([searchBox, search, quantity, move]);
    var bar = new StatusStrip();
    bar.Items.Add(status);
    Controls.AddRange([grid, top, bar]);
    AcceptButton = search;
    Shown += async (s, e) => await LoadAsync();
}
```

The data is read asynchronously, so the interface is not blocked. The single `$1` parameter is used twice in the condition. The `DataTable.Load` method creates columns with .NET types (`numeric` becomes `decimal`), so the stock value is calculated with a LINQ query over the table rows.

```cs
private async Task LoadAsync()
{
    await using NpgsqlCommand cmd = dataSource.CreateCommand("""
        SELECT id, name, category, price, stock
        FROM products
        WHERE name ILIKE $1 OR category ILIKE $1
        ORDER BY category, name
        """);
    cmd.Parameters.AddWithValue($"%{searchBox.Text.Trim()}%");
    try
    {
        var table = new DataTable();
        await using (NpgsqlDataReader reader =
            await cmd.ExecuteReaderAsync())
        {
            table.Load(reader);
        }
        grid.DataSource = table;
        decimal total = table.AsEnumerable().Sum(r =>
            r.Field<decimal>("price") * r.Field<int>("stock"));
        status.Text = $"Products: {table.Rows.Count}, "
            + $"stock value: {total:F2}";
    }
    catch (NpgsqlException ex)
    {
        ShowError(ex.Message);
    }
}

private void ShowError(string message) =>
    MessageBox.Show(this, message, Text,
        MessageBoxButtons.OK, MessageBoxIcon.Error);
```

```cs
    // A record in stock_moves and the change of stock – one transaction.
    private async Task MoveStockAsync()
    {
        if (grid.CurrentRow?.DataBoundItem is not DataRowView row)
            return;
        int id = (int)row["id"];
        int delta = (int)quantity.Value;
        if (delta == 0) return;
        try
        {
            await using NpgsqlConnection conn =
                await dataSource.OpenConnectionAsync();
            await using NpgsqlTransaction tx =
                await conn.BeginTransactionAsync();
            await using var insert = new NpgsqlCommand(
                "INSERT INTO stock_moves (product_id, quantity) "
                + "VALUES ($1, $2)", conn, tx);
            insert.Parameters.AddWithValue(id);
            insert.Parameters.AddWithValue(delta);
            await insert.ExecuteNonQueryAsync();

            await using var update = new NpgsqlCommand(
                "UPDATE products SET stock = stock + $1 "
                + "WHERE id = $2", conn, tx);
            update.Parameters.AddWithValue(delta);
            update.Parameters.AddWithValue(id);
            await update.ExecuteNonQueryAsync();

            await tx.CommitAsync();
            await LoadAsync();
        }
        catch (PostgresException ex)
            when (ex.SqlState == PostgresErrorCodes.CheckViolation)
        {
            ShowError("Not enough stock for this move.");
        }
        catch (NpgsqlException ex)
        {
            ShowError(ex.Message);
        }
    }
}
```

The `stock >= 0` check is performed by the DBMS itself: if you enter a quantity of −20 for the *Wireless mouse* product with a stock of 12, the `UPDATE` command violates the `CHECK` constraint (code `23514`), the transaction is not committed, and the already executed `INSERT` into `stock_moves` is also rolled back. After startup, the status bar shows `Products: 4, stock value: 155976.00`; a search for `mouse` shows `Products: 1, stock value: 5988.00`.
