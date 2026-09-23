---
title: "Підсумки"
description: "Тема 16. Файли, потоки та JSON: висновки та контрольні питання"
---

# Підсумки

## Висновки

Простір імен `System.IO` містить класи файлової системи (`File`, `Directory`, `Path`, `FileInfo`, `DirectoryInfo`), потоки байтів (`Stream`, `FileStream`) і класи читання та запису поверх потоків (`StreamReader`, `StreamWriter`, `BinaryReader`, `BinaryWriter`). Шляхи формують методами `Path` і відраховують від робочого каталогу або каталогу застосунку. Текстові файли за замовчуванням використовують UTF-8, інші кодування задають явно. Потоки реалізують `IDisposable`, тому їх створюють в `using`, інакше дані можуть не записатися, а файл залишиться зайнятим. Двійкові файли із записами фіксованої довжини дозволяють прямий доступ методом `Seek`. Файлові операції супроводжують обробкою винятків вводу-виводу, а CSV розбирають з інваріантною культурою. `System.Text.Json` серіалізує об’єкти в JSON і назад; `JsonSerializerOptions` і атрибути керують назвами, форматуванням, переліченнями, кодуванням і поліморфними типами.

## Питання для самоперевірки

1. Чим абсолютний шлях відрізняється від відносного? Що таке робочий каталог?
2. Для чого використовують `Path.Combine`?
3. Чим `File.ReadAllLines` відрізняється від `File.ReadLines`?
4. Для чого призначені `FileInfo` і `DirectoryInfo`?
5. Що таке кодування тексту? Яке кодування використовується за замовчуванням?
6. Що таке потік? Які класи потоків ви знаєте?
7. Які режими `FileMode` і види доступу `FileAccess` існують?
8. Чому потоки потрібно закривати? Як це зробити надійно?
9. Як отримати прямий доступ до запису в двійковому файлі?
10. Які винятки можуть виникнути під час роботи з файлами?
11. Які труднощі виникають під час обробки CSV?
12. Що таке серіалізація та десеріалізація?
13. Які налаштування надає `JsonSerializerOptions`?
14. Для чого використовують атрибути `[JsonPropertyName]`, `[JsonIgnore]`, `[JsonRequired]`?
15. Як серіалізувати колекцію об’єктів похідних типів?

## Корисні посилання

- Файловий і потоковий ввід-вивід: <https://learn.microsoft.com/dotnet/standard/io/>
- Типові завдання вводу-виводу: <https://learn.microsoft.com/dotnet/standard/io/common-i-o-tasks>
- Клас `File`: <https://learn.microsoft.com/dotnet/api/system.io.file>
- `System.Text.Json`: <https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/overview>
- Серіалізація та десеріалізація JSON: <https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/how-to>
- Поліморфна серіалізація: <https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/polymorphism>
