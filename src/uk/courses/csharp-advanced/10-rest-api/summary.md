---
title: "Підсумки"
description: "Тема 10. Вебсервіси REST: висновки та контрольні питання"
---

# Підсумки

## Висновки

Вебсервіс REST надає ресурси за адресами URI, а дії над ними визначають методи HTTP і коди стану. ASP.NET Core Minimal API описує кінцеві точки методами `Map…`, групує їх `MapGroup` і прив’язує параметри з маршруту, рядка запиту, тіла JSON і контейнера залежностей. `TypedResults` роблять коди відповідей явними, вбудована валідація .NET 10 перевіряє DTO, а `ProblemDetails` задає єдиний формат помилок; для перевірки сервісу використовують OpenAPI і файли `.http`. Сховище за інтерфейсом дозволяє перейти від даних у пам’яті до EF Core без зміни кінцевих точок. Клієнти використовують `HttpClient` від `IHttpClientFactory` і обробляють недоступність сервера та тіла `ProblemDetails`.

## Питання для самоперевірки

1. З яких частин складаються HTTP-запит і відповідь? Для чого заголовки `Content-Type` і `Location`?
2. Які методи HTTP безпечні, а які ідемпотентні? Чому це важливо для повтору запиту?
3. Які коди стану повертає сервіс після успішних `GET`, `POST`, `PUT`, `DELETE`?
4. Що таке ресурс і представлення в REST? Як правильно будувати URI колекцій і елементів?
5. Що вмикає `JsonSerializerOptions.Web`? Як записати перелічення назвами?
6. Чим Minimal API відрізняється від контролерів? З яких етапів складається `Program.cs`?
7. Що таке конвеєр проміжного ПЗ? Чому важливий порядок викликів `app.Use…`?
8. Як задати параметр маршруту з обмеженням? Для чого `MapGroup`?
9. З яких джерел ASP.NET Core бере значення параметрів обробника?
10. Чим `TypedResults` відрізняється від `Results`? Для чого тип `Results<Ok<T>, NotFound>`?
11. Як увімкнути вбудовану валідацію в .NET 10? Що отримує клієнт у разі помилки?
12. Що таке `ProblemDetails`? Які виклики потрібні, щоб усі помилки мали цей формат?
13. Як отримати документ OpenAPI сервісу? Як надіслати запит із файлу `.http`?
14. Чому `DbContext` реєструється як Scoped? Як реалізувати пагінацію в базі даних?
15. Чому не можна створювати `HttpClient` на кожен запит? Що таке типізований клієнт?

## Корисні посилання

- Minimal API: <https://learn.microsoft.com/aspnet/core/fundamentals/minimal-apis>
- Прив’язка параметрів: <https://learn.microsoft.com/aspnet/core/fundamentals/minimal-apis/parameter-binding>
- Обробка помилок в API: <https://learn.microsoft.com/aspnet/core/fundamentals/error-handling-api>
- Нове в ASP.NET Core 10 (валідація): <https://learn.microsoft.com/aspnet/core/release-notes/aspnetcore-10.0>
- OpenAPI в ASP.NET Core: <https://learn.microsoft.com/aspnet/core/fundamentals/openapi/overview>
- Файли `.http` у Visual Studio: <https://learn.microsoft.com/aspnet/core/test/http-files>
- `System.Text.Json`: <https://learn.microsoft.com/dotnet/standard/serialization/system-text-json/overview>
- `HttpClient`: <https://learn.microsoft.com/dotnet/fundamentals/networking/http/httpclient>
- `IHttpClientFactory`: <https://learn.microsoft.com/dotnet/core/extensions/httpclient-factory>
- HTTP Semantics, RFC 9110: <https://www.rfc-editor.org/rfc/rfc9110>
