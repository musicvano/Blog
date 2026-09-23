---
title: "Підсумки"
description: "Тема 6. DI, конфігурація, журналювання: висновки та контрольні питання"
---

# Підсумки

## Висновки

Впровадження залежностей робить класи незалежними від конкретних реалізацій: клас оголошує потрібні інтерфейси в конструкторі, а об’єкти з’єднуються в корені композиції. Контейнер `Microsoft.Extensions.DependencyInjection` створює сервіси за реєстраціями, підтримує кілька реалізацій, фабрики й ключові сервіси та керує часами життя Singleton, Scoped і Transient; перевірки `ValidateScopes` і `ValidateOnBuild` виявляють захоплені та відсутні залежності. Універсальний хост поєднує DI, конфігурацію, журнал і фонові служби та коректно зупиняється за **Ctrl+C**. Конфігурація збирається з файлів JSON, секретів користувача, змінних середовища та командного рядка, причому пізніші джерела перекривають попередні. Шаблон параметрів дає типізований і перевірений під час запуску доступ до налаштувань. Журнал `ILogger<T>` з рівнями, категоріями й шаблонами повідомлень записує структуровані дані в кілька постачальників, а генератор `[LoggerMessage]` робить його швидким. Ті самі прийоми працюють у Windows Forms і спрощують модульне тестування.

## Питання для самоперевірки

1. Що таке залежність і сильна зв’язаність? Які проблеми створює `new` конкретного класу в сервісі?
2. Сформулюйте принцип інверсії залежностей. Що таке впровадження через конструктор?
3. Що таке корінь композиції? Чому локатор служб вважають антипатерном?
4. Яке призначення `IServiceCollection` і `IServiceProvider`? Чим `GetService` відрізняється від `GetRequiredService`?
5. Що поверне контейнер, якщо один інтерфейс зареєстровано двічі? Як отримати всі реалізації?
6. Для чого потрібні ключові сервіси та атрибут `[FromKeyedServices]`?
7. Чим відрізняються часи життя Singleton, Scoped і Transient? Коли контейнер звільняє об’єкти?
8. Що таке захоплена залежність? Як її виявити?
9. Що налаштовує `Host.CreateApplicationBuilder`? Як працює `BackgroundService`?
10. Які постачальники конфігурації підключає хост і в якому порядку пріоритету?
11. Як задати середовище виконання? Для чого файл `launchSettings.json`?
12. Як записати ієрархічний ключ у змінній середовища та в аргументі командного рядка?
13. Навіщо потрібні секрети користувача? Де вони зберігаються?
14. Чим відрізняються `IOptions<T>`, `IOptionsSnapshot<T>` і `IOptionsMonitor<T>`? Як перевірити параметри під час запуску?
15. Які рівні журналювання існують? Що таке категорія журналу?
16. Чому в методи `Log…` передають шаблон повідомлення, а не інтерпольований рядок?
17. Які вбудовані постачальники журналу є в .NET? Як налаштувати фільтри в `appsettings.json`?
18. Як підключити хост і впровадження залежностей у застосунку Windows Forms?

## Корисні посилання

- Впровадження залежностей у .NET: <https://learn.microsoft.com/dotnet/core/extensions/dependency-injection/overview>
- Часи життя сервісів: <https://learn.microsoft.com/dotnet/core/extensions/dependency-injection/service-lifetimes>
- Універсальний хост .NET: <https://learn.microsoft.com/dotnet/core/extensions/generic-host>
- Конфігурація в .NET: <https://learn.microsoft.com/dotnet/core/extensions/configuration>
- Постачальники конфігурації: <https://learn.microsoft.com/dotnet/core/extensions/configuration-providers>
- Шаблон параметрів: <https://learn.microsoft.com/dotnet/core/extensions/options>
- Журналювання в .NET: <https://learn.microsoft.com/dotnet/core/extensions/logging/overview>
- Генератор джерел для журналювання: <https://learn.microsoft.com/dotnet/core/extensions/logging/source-generation>
- Секрети користувача: <https://learn.microsoft.com/aspnet/core/security/app-secrets>
- Хост у Windows Forms: <https://learn.microsoft.com/dotnet/desktop/winforms/advanced/how-to-use-host-builder>
- Абстракція часу `TimeProvider`: <https://learn.microsoft.com/dotnet/standard/datetime/timeprovider-overview>
