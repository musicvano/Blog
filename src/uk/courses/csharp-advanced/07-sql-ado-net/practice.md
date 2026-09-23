---
title: "Практика"
description: "Тема 7. SQL та ADO.NET: розібрані приклади"
outline: [2, 3]
---

# Практика

Для кожного прикладу створюють окрему базу даних і роль, як описано в лекції (`CREATE ROLE … LOGIN PASSWORD …`, `CREATE DATABASE … OWNER …`), а рядок з’єднання зберігають у секретах користувача: `dotnet user-secrets set "ConnectionStrings:<назва>" "Host=localhost;…"`. Проєкти C# використовують пакети `Npgsql` і `Microsoft.Extensions.Configuration.UserSecrets`.

## Приклад 1. Спортивний клуб

Спроєктувати базу даних спортивного клубу: тренери, секції з місячним тарифом, учасники, записи учасників у секції (зв’язок N:M) і платежі. Написати скрипт створення таблиць з обмеженнями, наповнити таблиці та виконати запити: секції з тренерами, кількість учасників у секціях, надходження за місяцями, учасники з місячною платою понад 1000 грн, учасники без платежу за березень і підвищення тарифу секцій без тренера на 10 %.

Секція може тимчасово не мати тренера, тому `trainer_id` допускає `NULL`, а видалення тренера очищає посилання (`ON DELETE SET NULL`). Гроші зберігаються в `numeric(8, 2)`: тип `double precision` дає похибки округлення.

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

Запити 1 і 2 використовують `LEFT JOIN`, щоб у результат потрапили секція без тренера і секція без учасників. Запит 3 групує платежі за рядком «рік-місяць», який повертає функція `to_char`; PostgreSQL дозволяє посилатися в `GROUP BY` на псевдонім стовпця `month`.

```sql
-- 1. Секції з тренерами (секція без тренера теж).
SELECT s.name AS section, t.name AS trainer, s.fee
FROM sections AS s
LEFT JOIN trainers AS t ON t.id = s.trainer_id
ORDER BY s.name;

-- 2. Кількість учасників у кожній секції.
SELECT s.name AS section, count(e.member_id) AS members
FROM sections AS s
LEFT JOIN enrollments AS e ON e.section_id = s.id
GROUP BY s.id, s.name
ORDER BY members DESC, s.name;

-- 3. Надходження за місяцями.
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

Запит 4 відбирає групи умовою `HAVING`, запит 5 знаходить учасників без платежу підзапитом `NOT EXISTS` (діапазон дат `>=`/`<` не залежить від кількості днів у місяці). Підвищення тарифу секцій без тренера на 10 % виконує команда `UPDATE sections SET fee = round(fee * 1.1, 2) WHERE trainer_id IS NULL RETURNING name, fee;`, яка повертає рядок `Boxing | 1100.00`.

```sql
-- 4. Щомісячна плата учасника понад 1000 грн.
SELECT m.name, sum(s.fee) AS monthly_fee
FROM members AS m
JOIN enrollments AS e ON e.member_id = m.id
JOIN sections AS s ON s.id = e.section_id
GROUP BY m.id, m.name
HAVING sum(s.fee) > 1000
ORDER BY monthly_fee DESC;

-- 5. Учасники, які не платили в березні 2026 року.
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

## Приклад 2. Успішність студентів

Написати консольну програму, яка отримує назву академічної групи аргументом командного рядка і виводить таблицю студентів групи: кількість оцінок, середній бал з одним знаком після коми та найменшу оцінку, відсортовану за середнім балом. Студенти без оцінок також показуються. Під таблицею виводиться кількість студентів і середній бал групи. Якщо аргумент не задано, програма виводить підказку і завершується з кодом 2, якщо групи немає – з кодом 1.

Схема бази даних `university` та тестові дані:

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

Функція `avg` для цілих чисел повертає `numeric`, а `round(…, 1)` залишає один знак після коми; у C# це `decimal`. Для студента без оцінок `avg` і `min` дають `NULL`, тому перед читанням значення перевіряються методом `IsDBNull`, а `NULLS LAST` ставить таких студентів у кінець.

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

Читач звільняється в кінці блоку `await using (…) { }`, до виконання другої команди. Середній бал групи повертає `ExecuteScalarAsync`: якщо в групі немає жодної оцінки, результат – `DBNull.Value`, і шаблон `value is decimal avg` не спрацьовує.

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

Результат команди `dotnet run -- CS-24`:

```
Group CS-24
Student            Grades  Average  Min
---------------------------------------
Anna Petrenko           3     91,7   88
Bohdan Hnatiuk          3     63,0   54
Viktor Zinchenko        0        -    -
---------------------------------------
Students: 3, group average: 77,3
```

## Приклад 3. Довідник товарів

Написати застосунок Windows Forms, який показує товари в `DataGridView` з пошуком за частиною назви або категорії та загальною вартістю запасів у рядку стану. Для вибраного товару кнопка *Move* оформлює надходження (додатна кількість) або відвантаження (від’ємна): запис у журнал руху `stock_moves` і зміна залишку виконуються в одній транзакції; залишок не може стати від’ємним.

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

Проєкт *Windows Forms App* (.NET 10): файли `Form1.cs` і `Form1.Designer.cs` видалено, `Program.cs` створює `NpgsqlDataSource` так само, як застосунок «Book Browser» у теоретичних відомостях (рядок з’єднання `ConnectionStrings:Shop`), і запускає `new MainForm(dataSource)`.

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

Дані читаються асинхронно, тому інтерфейс не блокується. Один параметр `$1` використовується в умові двічі. Метод `DataTable.Load` створює стовпці з типами .NET (`numeric` – `decimal`), тому вартість запасів обчислюється LINQ-запитом до рядків таблиці.

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
    // Запис у stock_moves і зміна stock – одна транзакція.
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

Перевірку `stock >= 0` виконує сама СКБД: якщо для товару *Wireless mouse* із залишком 12 ввести кількість −20, команда `UPDATE` порушує обмеження `CHECK` (код `23514`), транзакція не фіксується, і вже виконаний `INSERT` у `stock_moves` також скасовується. Після запуску рядок стану показує `Products: 4, stock value: 155976,00`; пошук `mouse` – `Products: 1, stock value: 5988,00`.
