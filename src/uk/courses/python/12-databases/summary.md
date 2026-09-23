---
title: "Підсумки"
description: "Тема 12. Бази даних, SQL, SQLAlchemy: висновки та контрольні питання"
---

# Підсумки

## Висновки

Ключі та обмеження захищають структуру даних; параметри відокремлюють значення від SQL; транзакція об’єднує взаємопов’язані зміни. SQLAlchemy надає типізовані моделі й одиницю роботи, але вимагає явного керування сесією та знання виконуваних запитів.

## Питання для самоперевірки

1. Чим відрізняються первинний і зовнішній ключі?
2. Як реалізувати M:N із додатковою оцінкою?
3. Які гарантії додає STRICT-таблиця?
4. Коли треба вмикати foreign\_keys у SQLite?
5. Чому параметр не може замінити ім’я стовпця?
6. Чим LEFT JOIN відрізняється від INNER JOIN?
7. Яка різниця між WHERE і HAVING?
8. Що повертає COUNT для відсутніх правих рядків?
9. Чому with connection не замінює close?
10. Який стан лишається після rollback імпорту?
11. Чим Core відрізняється від ORM?
12. Що роблять flush і commit у Session?
13. Що означає detached-об’єкт?
14. Як selectinload змінює проблему N+1?
15. Чому create\_all не є міграцією?

## Корисні посилання

- <https://docs.python.org/3.14/library/sqlite3.html>.
- <https://sqlite.org/lang.html>.
- <https://sqlite.org/foreignkeys.html>.
- <https://docs.sqlalchemy.org/en/20/orm/quickstart.html>.
- <https://docs.sqlalchemy.org/en/20/orm/session_basics.html>.
- <https://docs.sqlalchemy.org/en/20/dialects/sqlite.html>.
