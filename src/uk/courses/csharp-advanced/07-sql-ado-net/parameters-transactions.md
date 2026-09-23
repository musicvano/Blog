---
title: "Параметри, транзакції та DataGridView"
description: "Тема 7. SQL та ADO.NET: Параметри, транзакції та DataGridView"
outline: [2, 3]
---

# Параметри, транзакції та DataGridView

## SQL-ін’єкції та параметризовані запити

Найнебезпечніша помилка під час роботи з базою даних – складати текст SQL з рядків, введених користувачем. **SQL-ін’єкція** (*SQL injection*) – атака, під час якої зловмисник вводить фрагмент SQL, і сервер виконує його як частину команди (<https://owasp.org/www-community/attacks/SQL_Injection>). Так можна прочитати чужі дані, обійти перевірку пароля або видалити таблиці.

### Приклад «SQL-ін’єкція»

Програма шукає читача за іменем двома способами: конкатенацією рядка і параметром. Директиви `using` і створення `dataSource` такі самі, як у `Program.cs` прикладу «Каталог книг».

```cs
Console.Write("Reader name: ");
string name = Console.ReadLine() ?? "";

// НЕБЕЗПЕЧНО: введений текст стає частиною команди SQL.
string sql = "SELECT id, name FROM readers "
    + $"WHERE name = '{name}' ORDER BY id";
Console.WriteLine(sql);
await using (NpgsqlCommand unsafeCmd = dataSource.CreateCommand(sql))
{
    await PrintReadersAsync("Concatenated query", unsafeCmd);
}
```

```cs
// Безпечно: значення передається окремо від тексту команди.
await using (NpgsqlCommand safeCmd = dataSource.CreateCommand(
    "SELECT id, name FROM readers WHERE name = $1 ORDER BY id"))
{
    safeCmd.Parameters.AddWithValue(name);
    await PrintReadersAsync("Parameterized query", safeCmd);
}

static async Task PrintReadersAsync(string title, NpgsqlCommand cmd)
{
    Console.WriteLine($"{title}:");
    await using NpgsqlDataReader reader =
        await cmd.ExecuteReaderAsync();
    int count = 0;
    while (await reader.ReadAsync())
    {
        Console.WriteLine(
            $"  {reader.GetInt32(0)} {reader.GetString(1)}");
        count++;
    }
    Console.WriteLine($"  rows: {count}");
}
```

Користувач вводить замість імені рядок `' OR '1'='1` (рис. 7.10). Перша лапка закриває рядковий літерал, і умова набуває вигляду `name = '' OR '1'='1'`, яка істинна для кожного рядка:

```
Reader name: ' OR '1'='1
SELECT id, name FROM readers WHERE name = '' OR '1'='1' ORDER BY id
Concatenated query:
  1 Olena Kovalenko
  2 Petro Shevchenko
  3 Iryna Bondar
  rows: 3
Parameterized query:
  rows: 0
```

::: info Знімок екрана
Windows Terminal running the Injection demo: input ' OR '1'='1, the concatenated query prints all 3 readers, the parameterized query prints rows: 0
:::

Рис. 7.10. SQL-ін’єкція та параметризований запит {.caption}

Ще небезпечніше введення `x'; DROP TABLE loans; --`: після лапки йде окрема команда видалення таблиці, а решту рядка `--` перетворює на коментар. Параметризований запит захищає від обох атак: текст команди і значення параметрів надсилаються серверу **окремо**, і значення ніколи не розбирається як SQL. Будь-які лапки та крапки з комою в імені залишаються просто символами імені, тому такого читача не знайдено.

Правила безпечної роботи:

- усі значення, що надходять ззовні (клавіатура, файл, мережа, поле форми), передавати лише параметрами: `$1` і `Parameters.AddWithValue(value)`. Npgsql підтримує й іменовані параметри `@name` з `AddWithValue("name", value)`, але документація рекомендує позиційні;
- параметр може замінити лише **значення**, а не назву таблиці, стовпця чи напрямок сортування. Такі частини вибирають зі списку дозволених варіантів у коді (`"title"`, `"pub_year"`), а не підставляють з введення;
- символи `%` і `_` у параметрі `LIKE` залишаються шаблонами: це не ін’єкція, але пошук `50%` знайде зайві рядки;
- підключатися від імені ролі з мінімальними правами, а не `postgres`: навіть успішна атака тоді не зможе видалити базу даних.

## Транзакції

**Транзакція** (*transaction*) – послідовність команд, яка виконується як одне ціле: або всі зміни зберігаються, або жодна. Видача книги складається з двох команд: зменшити кількість примірників і додати запис у `loans`. Якщо програма аварійно завершиться між ними, книга «зникне». Транзакції мають властивості **ACID**:

- **атомарність** (*atomicity*) – усі команди виконуються або скасовуються разом;
- **узгодженість** (*consistency*) – після транзакції виконуються всі обмеження цілісності;
- **ізольованість** (*isolation*) – паралельні транзакції не бачать незавершених змін одна одної;
- **довговічність** (*durability*) – зафіксовані зміни зберігаються навіть після збою живлення.

У SQL транзакцію починає `BEGIN`, фіксує `COMMIT`, а скасовує `ROLLBACK`. Кожна команда поза явною транзакцією виконується у власній транзакції.

```sql
BEGIN;
UPDATE books SET copies = copies - 1 WHERE id = 2 AND copies > 0;
INSERT INTO loans (book_id, reader_id, due)
VALUES (2, 3, CURRENT_DATE + 14);
COMMIT;   -- або ROLLBACK, щоб скасувати обидві зміни
```

У Npgsql транзакцію починає метод `BeginTransactionAsync()` відкритого з’єднання. Кожна команда транзакції створюється на **тому самому** з’єднанні з цим об’єктом транзакції. Метод `CommitAsync()` фіксує зміни, `RollbackAsync()` скасовує; якщо об’єкт транзакції звільнено без `CommitAsync` (наприклад, через виняток), зміни скасовуються автоматично. PostgreSQL не підтримує вкладених транзакцій: на одному з’єднанні одночасно може бути лише одна.

**Рівні ізоляції** визначають, наскільки паралельні транзакції впливають одна на одну (<https://www.postgresql.org/docs/current/transaction-iso.html>). У PostgreSQL за замовчуванням діє `Read Committed`: кожна команда бачить дані, зафіксовані до її початку. Рівень `Repeatable Read` бачить знімок даних на початок транзакції, а `Serializable` гарантує результат, як за послідовного виконання, але може завершити транзакцію помилкою серіалізації, і тоді її повторюють. Рівень передають параметром: `BeginTransactionAsync(IsolationLevel.Serializable)`.

### Приклад «Видача книги»

Клас `LoanService` видає книгу в транзакції (файл `LoanService.cs` проєкту «Каталог книг»). Перевірка наявності та зменшення кількості виконуються **однією** командою `UPDATE … WHERE copies > 0`: якщо дві програми одночасно видають останній примірник, друга команда змінить 0 рядків, бо PostgreSQL блокує змінюваний рядок до кінця першої транзакції.

```cs
using Npgsql;

namespace Library;

public class LoanService(NpgsqlDataSource dataSource)
{
    // Видача книги: зменшити copies і додати запис у loans
    // або не зробити нічого.
    public async Task<long> IssueAsync(int bookId, int readerId,
        int days)
    {
        await using NpgsqlConnection conn =
            await dataSource.OpenConnectionAsync();
        await using NpgsqlTransaction tx =
            await conn.BeginTransactionAsync();

        await using var take = new NpgsqlCommand("""
            UPDATE books SET copies = copies - 1
            WHERE id = $1 AND copies > 0
            """, conn, tx);
        take.Parameters.AddWithValue(bookId);
        if (await take.ExecuteNonQueryAsync() == 0)
        {
            await tx.RollbackAsync();
            throw new InvalidOperationException(
                $"Book {bookId} is not available.");
        }
```

```cs
        await using var insert = new NpgsqlCommand("""
            INSERT INTO loans (book_id, reader_id, due)
            VALUES ($1, $2, CURRENT_DATE + $3)
            RETURNING id
            """, conn, tx);
        insert.Parameters.AddWithValue(bookId);
        insert.Parameters.AddWithValue(readerId);
        insert.Parameters.AddWithValue(days);
        long loanId = (long)(await insert.ExecuteScalarAsync())!;

        await tx.CommitAsync();   // зафіксувати обидві зміни
        return loanId;
    }
}
```

Якщо читача з номером `readerId` немає, команда `INSERT` порушує зовнішній ключ і генерує `PostgresException` з кодом `23503` (`ForeignKeyViolation`). Виняток виходить з методу до `CommitAsync`, `await using` звільняє транзакцію, і зменшення `copies` скасовується: кількість примірників залишається правильною. Результат виклику показано в прикладі «Каталог книг»: видача 6 оформлена, а для книги 4 без примірників виводиться `Book 4 is not available.`

## Відокремлений режим і `DataGridView`

Клас **`DataTable`** (простір імен `System.Data`) зберігає таблицю в пам’яті: колекції стовпців `Columns` і рядків `Rows`, стан кожного рядка (`Added`, `Modified`, `Deleted`) (<https://learn.microsoft.com/dotnet/api/system.data.datatable>). Об’єкт **`NpgsqlDataAdapter`** виконує команду `SELECT`, сам відкриває та закриває з’єднання і заповнює таблицю методом `Fill`. Готову таблицю призначають властивості `DataSource` елемента `DataGridView` (тема 3), і таблиця сама створює стовпці за назвами та типами даних. Метод адаптера `Update` разом із `NpgsqlCommandBuilder` може зберегти змінені рядки назад, але в застосунках частіше використовують явні команди `INSERT`/`UPDATE` з параметрами або Entity Framework Core (тема 8). Для простого заповнення таблиці без адаптера є метод `table.Load(reader)`.

Застосунок *Windows Forms App* «Book Browser» показує книги в таблиці й шукає їх за частиною назви. У `Program.cs` створюється `NpgsqlDataSource` (рядок з’єднання з секретів користувача, метод `AddUserSecrets(typeof(Program).Assembly)`, бо клас `Program` статичний) і передається в конструктор форми. Форма створює в коді поле `searchBox`, кнопку *Search* (вона ж `AcceptButton`, тому пошук запускає й **Enter**), таблицю `grid` з `Dock = DockStyle.Fill`, `ReadOnly = true`, і рядок стану `StatusStrip` з міткою `status`. Обробники `Load` форми і `Click` кнопки викликають метод `LoadBooks`, який заповнює `DataTable` адаптером і призначає її таблиці.

Вигляд застосунку показано на рис. 7.11.

```cs
private void LoadBooks()
{
    using NpgsqlCommand cmd = dataSource.CreateCommand("""
        SELECT id, title, pub_year AS "Year", isbn, copies
        FROM books
        WHERE title ILIKE $1
        ORDER BY title
        """);
    cmd.Parameters.AddWithValue($"%{searchBox.Text.Trim()}%");
    using var adapter = new NpgsqlDataAdapter(cmd);
    var table = new DataTable();
    try
    {
        adapter.Fill(table);   // відкрити, прочитати, закрити
        grid.DataSource = table;
        status.Text = $"Books: {table.Rows.Count}";
    }
    catch (NpgsqlException ex)
    {
        MessageBox.Show(this, ex.Message, "Database error",
            MessageBoxButtons.OK, MessageBoxIcon.Error);
    }
}
```

Псевдонім `"Year"` у подвійних лапках зберігає велику літеру і стає заголовком стовпця таблиці. Порожнє поле пошуку дає шаблон `%%`, тобто всі книги. Метод `Fill` синхронний і для великих результатів блокує інтерфейс; тоді використовують `ExecuteReaderAsync` і `table.Load(reader)`, як у лабораторному прикладі «Довідник товарів».

::: info Знімок екрана
Running BookBrowser: search box with "clean", Search button, DataGridView with columns id, title, Year, isbn, copies (2 rows), status bar "Books: 2"
:::

Рис. 7.11. Застосунок «Book Browser» з даними PostgreSQL {.caption}
