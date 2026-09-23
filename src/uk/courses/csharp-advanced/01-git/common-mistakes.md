---
title: "Типові помилки"
description: "Тема 1. Керування версіями Git: Типові помилки"
outline: [2, 3]
---

# Типові помилки

## Типові помилки

У табл. 1.2 наведено ситуації, з якими найчастіше стикаються під час роботи з Git.

Таблиця 1.2. Типові помилки під час роботи з Git {.caption}

| **Проблема** | **Причина** | **Виправлення** |
| --- | --- | --- |
| у репозиторії папки `bin`, `obj`, `.vs` | коміт до створення `.gitignore` | `dotnet new gitignore`, `git rm -r --cached bin obj`, коміт |
| пароль або ключ API в історії | секрет у файлі, доданому `git add .` | змінити секрет; зберігати його поза репозиторієм, файл – у `.gitignore` |
| `! [rejected] … (fetch first)` | на сервері є чужі коміти | `git pull`, розв’язати конфлікти, `git push` |
| `fatal: Need to specify how to reconcile divergent branches` | не задано спосіб `pull` для розбіжних гілок | `git config --global pull.rebase false` або `git pull --rebase` |
| збірка: CS8300 *Merge conflict marker encountered* | залишилися маркери `<<<<<<<` | видалити маркери, зібрати, `git add`, `git commit` |
| втрачено коміти після `reset --hard` | гілку переміщено назад | хеш із `git reflog`, `git reset --hard <хеш>` |
