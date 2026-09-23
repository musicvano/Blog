---
title: "Підсумки"
description: "Тема 6. Налагодження та винятки: висновки та контрольні питання"
---

# Підсумки

## Висновки

Помилки бувають синтаксичними, помилками виконання та логічними. Логічні помилки знаходять налагоджувачем: точки зупинки (зокрема умовні), покрокове виконання та вікна Locals, Watch, Call Stack і Immediate дозволяють стежити за значеннями змінних. Помилки виконання в .NET є винятками – об’єктами класів, що походять від `Exception`. Їх перехоплюють блоками `catch` від конкретних типів до загальних, уточнюють фільтрами `when`, а ресурси звільняють у `finally`. Методи перевіряють аргументи й генерують винятки найточнішого типу, а програма повідомляє про помилки в `Console.Error` і кодом завершення. Очікувані ситуації, як-от некоректне введення, обробляють без винятків за допомогою `TryParse` і перевірок.

## Питання для самоперевірки

1. Чим відрізняються синтаксичні, логічні помилки та помилки виконання?
2. Що таке точка зупинки? Чим відрізняються команди Step Over, Step Into і Step Out?
3. Для чого призначені вікна Locals, Autos, Watch, Call Stack і Immediate?
4. Як налаштувати умовну точку зупинки? Що таке tracepoint?
5. Чим `Debug.WriteLine` відрізняється від `Console.WriteLine`? Що перевіряє `Debug.Assert`?
6. Що таке виняток? Які стандартні типи винятків ви знаєте?
7. Як працює оператор `try`/`catch`? Чому важливий порядок блоків `catch`?
8. Коли виконується блок `finally`?
9. Для чого використовують фільтри винятків `when`?
10. Як згенерувати виняток? Які методи-помічники перевірки аргументів ви знаєте?
11. Чим відрізняються `throw;` і `throw ex;`?
12. Що відбувається з необробленим винятком? Що таке код завершення програми?
13. Чому некоректне введення краще перевіряти `TryParse`, а не винятками?
14. Як створити власний клас винятку?
15. Для чого призначене вікно Exception Settings?

## Корисні посилання

- Огляд налагоджувача Visual Studio: <https://learn.microsoft.com/visualstudio/debugger/debugger-feature-tour>
- Точки зупинки: <https://learn.microsoft.com/visualstudio/debugger/using-breakpoints>
- Винятки в C#: <https://learn.microsoft.com/dotnet/csharp/fundamentals/exceptions/>
- Оператори обробки винятків: <https://learn.microsoft.com/dotnet/csharp/language-reference/statements/exception-handling-statements>
- Рекомендації щодо винятків: <https://learn.microsoft.com/dotnet/standard/exceptions/best-practices-for-exceptions>
- Керування винятками в налагоджувачі: <https://learn.microsoft.com/visualstudio/debugger/managing-exceptions-with-the-debugger>
