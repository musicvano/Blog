---
title: "Підсумки"
description: "Тема 1. Керування версіями Git: висновки та контрольні питання"
---

# Підсумки

## Висновки

Git – розподілена система керування версіями: кожна копія репозиторію містить усю історію, а більшість операцій виконується локально. Зміни проходять шлях від робочого каталогу через індекс до репозиторію, де зберігаються у вигляді комітів – знімків проєкту з автором і повідомленням. Файли `.gitignore` і `.gitattributes` визначають, які файли зберігати і як нормалізувати кінці рядків. Гілки ізолюють розробку функцій; їх об’єднують злиттям або перебазуванням, а конфлікти розв’язують вручну. Незакомічені зміни скасовують командою `git restore`, опубліковані коміти – `git revert`, а переписувати історію (`reset`, `amend`, `rebase`) можна лише до її публікації. Теги позначають версії, `log -S`, `blame` і `bisect` допомагають шукати зміни, а хуки автоматизують перевірки. Для спільної роботи використовують віддалені репозиторії: порожній репозиторій на диску або хостинг GitHub із запитами на злиття. Усі ці операції доступні як у терміналі, так і у вікнах Visual Studio 2026.

## Питання для самоперевірки

1. Чим розподілена система керування версіями відрізняється від централізованої?
2. Які параметри Git потрібно налаштувати перед першим комітом і для чого?
3. Що таке робочий каталог, індекс і репозиторій? Які команди переносять зміни між ними?
4. Що таке коміт і хеш коміту? Що означає `HEAD~1`?
5. Чим відрізняються `git diff` і `git diff --staged`?
6. Які файли проєкту .NET не додають у репозиторій? Як прибрати вже закомічену папку `bin`?
7. Чим `git revert` відрізняється від `git reset`? Коли не можна використовувати `reset`?
8. Що роблять `git restore`, `git restore --staged`, `git commit --amend` і `git stash`?
9. Що таке гілка? Чим злиття fast-forward відрізняється від тристороннього?
10. Чим перебазування відрізняється від злиття? Коли використовують `git cherry-pick`?
11. Як виникає конфлікт злиття і як його розв’язати в терміналі та у Visual Studio?
12. Як знайти коміт, що вніс помилку, за допомогою `git bisect`?
13. Що таке хук Git? Як зробити хуки спільними для всіх учасників?
14. Що таке порожній репозиторій? Чим `git fetch` відрізняється від `git pull`?
15. Чому сервер відхиляє `git push` і як це виправити?

## Корисні посилання

- Git для Windows: <https://git-scm.com/install/windows>
- Книга «Pro Git» українською: <https://git-scm.com/book/uk/v2>
- Довідник команд Git: <https://git-scm.com/docs>
- Хуки Git: <https://git-scm.com/docs/githooks>
- Атрибути файлів: <https://git-scm.com/docs/gitattributes>
- Шаблони .NET, зокрема `gitignore` і `gitattributes`: <https://learn.microsoft.com/dotnet/core/tools/dotnet-new-sdk-templates>
- Git у Visual Studio: <https://learn.microsoft.com/visualstudio/version-control/>
- Розв’язання конфліктів у Visual Studio: <https://learn.microsoft.com/visualstudio/version-control/git-resolve-conflicts>
- Робота з Git на GitHub: <https://docs.github.com/en/get-started/using-git>
- GitHub Flow: <https://docs.github.com/en/get-started/using-github/github-flow>
- Запити на злиття: <https://docs.github.com/en/pull-requests>
- Git Credential Manager: <https://github.com/git-ecosystem/git-credential-manager>
