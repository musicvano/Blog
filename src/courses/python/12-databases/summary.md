---
title: "Summary"
description: "Topic 12. Databases, SQL, SQLAlchemy: conclusions and review questions"
sourceHash: "c3881f25e06f06e813af4dd40c0ec56dd8ce959fa94afec05f49dbec4a2bde0e"
---

# Summary

## Conclusions

Keys and constraints protect data structure; parameters separate values from SQL; a transaction groups related changes. SQLAlchemy provides typed models and a unit of work but requires explicit session management and knowledge of the queries being executed.

## Self-check questions

1. How do primary and foreign keys differ?
2. How do you implement M:N with an additional grade?
3. What guarantees does a STRICT table add?
4. When must foreign\_keys be enabled in SQLite?
5. Why can a parameter not replace a column name?
6. How does LEFT JOIN differ from INNER JOIN?
7. What is the difference between WHERE and HAVING?
8. What does COUNT return for missing right-hand rows?
9. Why does with connection not replace close?
10. What state remains after rolling back an import?
11. How does Core differ from ORM?
12. What do flush and commit do in a Session?
13. What does a detached object mean?
14. How does selectinload affect the N+1 problem?
15. Why is create\_all not a migration?

## Useful links

- <https://docs.python.org/3.14/library/sqlite3.html>.
- <https://sqlite.org/lang.html>.
- <https://sqlite.org/foreignkeys.html>.
- <https://docs.sqlalchemy.org/en/20/orm/quickstart.html>.
- <https://docs.sqlalchemy.org/en/20/orm/session_basics.html>.
- <https://docs.sqlalchemy.org/en/20/dialects/sqlite.html>.
