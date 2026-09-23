---
title: "Підсумки"
description: "Тема 8. Entity Framework Core: висновки та контрольні питання"
---

# Підсумки

## Висновки

Entity Framework Core відображає класи C# на таблиці реляційної бази даних: контекст `DbContext` з властивостями `DbSet<T>` виконує LINQ-запити, які постачальник Npgsql транслює в SQL PostgreSQL, і зберігає зміни об’єктів одним викликом `SaveChangesAsync`. Модель будується за угодами і уточнюється анотаціями або Fluent API; зв’язки 1:N, 1:1 і N:M описуються навігаційними властивостями і зовнішніми ключами. Схема бази даних змінюється міграціями, які генерує і застосовує інструмент `dotnet ef` і які потрібно переглядати. Запити читають лише потрібне: фільтрація, проєкції та пагінація виконуються в базі, пов’язані дані завантажуються через `Include`, а ліниве завантаження призводить до проблеми N+1. Трекер змін визначає, які команди виконати; для даних лише для читання використовують `AsNoTracking`, для масових змін – `ExecuteUpdateAsync` і `ExecuteDeleteAsync`. Кілька операцій об’єднують у транзакцію, а втрачені оновлення виявляють токеном паралельності `xmin`. Контекст створюють на коротку операцію, у настільних застосунках – через фабрику.

## Питання для самоперевірки

1. Що таке ORM і невідповідність об’єктної та реляційної моделей?
2. Чим EF Core відрізняється від ADO.NET і micro-ORM? Що таке code-first і database-first?
3. Які пакети та інструменти потрібні для роботи EF Core з PostgreSQL?
4. Яке призначення класів `DbContext` і `DbSet<T>`? Де задають рядок з’єднання?
5. Які угоди використовує EF Core для ключів, зв’язків і обов’язковості стовпців?
6. Чим анотації даних відрізняються від Fluent API? Для чого `IEntityTypeConfiguration<T>`?
7. Як описати зв’язки 1:N, 1:1 і N:M? Що таке зв’язок із корисним навантаженням?
8. Що таке міграція? Які файли створює `dotnet ef migrations add`? Для чого `__EFMigrationsHistory`?
9. Чим `IQueryable<T>` відрізняється від `IEnumerable<T>`? Що таке відкладене виконання?
10. Як переглянути SQL, який генерує EF Core?
11. Що таке обчислення на клієнті і коли EF Core кидає виняток трансляції?
12. Які способи завантаження пов’язаних даних існують? У чому полягає проблема N+1?
13. Які стани має сутність у `ChangeTracker`? Коли варто використовувати `AsNoTracking`?
14. Як працюють `ExecuteUpdateAsync` і явні транзакції?
15. Що таке оптимістична паралельність і як використати `xmin` у PostgreSQL?

## Корисні посилання

- Документація EF Core: <https://learn.microsoft.com/ef/core/>
- Нове в EF Core 10: <https://learn.microsoft.com/ef/core/what-is-new/ef-core-10.0/whatsnew>
- Постачальник Npgsql для EF Core: <https://www.npgsql.org/efcore/>
- Інструменти `dotnet ef`: <https://learn.microsoft.com/ef/core/cli/dotnet>
- Міграції: <https://learn.microsoft.com/ef/core/managing-schemas/migrations/>
- Зв’язки: <https://learn.microsoft.com/ef/core/modeling/relationships>
- Завантаження пов’язаних даних: <https://learn.microsoft.com/ef/core/querying/related-data/>
- Відстеження змін: <https://learn.microsoft.com/ef/core/change-tracking/>
- Паралельність: <https://learn.microsoft.com/ef/core/saving/concurrency>
- Токени паралельності в Npgsql: <https://www.npgsql.org/efcore/modeling/concurrency.html>
