---
title: "Підсумки"
description: "Тема 11. Реальний час із SignalR: висновки та контрольні питання"
---

# Підсумки

## Висновки

ASP.NET Core SignalR спрощує створення застосунків реального часу: сервер викликає методи клієнтів так само просто, як клієнти – методи сервера. Бібліотека сама узгоджує транспорт (WebSockets, Server-Sent Events або довге опитування) і протокол (JSON або MessagePack). На сервері логіку описує короткоживучий хаб: `Clients` визначає отримувачів, `Groups` керує групами, `OnConnectedAsync` і `OnDisconnectedAsync` відстежують підключення, а стан зберігається в окремих службах. Строго типізований хаб `Hub<T>` перевіряє виклики клієнтських методів під час компіляції, а `HubException` передає клієнту зрозумілі помилки. Клієнт .NET створює `HubConnection` будівником, реєструє обробники `On` і викликає методи хабу `InvokeAsync`; у Windows Forms обробники оновлюють форму через `InvokeAsync`. Автоматичне перепідключення відновлює зв’язок, але не групи. `IHubContext` надсилає повідомлення з фонових служб і кінцевих точок REST, а потокові методи з `IAsyncEnumerable<T>` передають дані частинами.

## Питання для самоперевірки

1. Чим застосунки реального часу відрізняються від обміну «запит – відповідь» у REST?
2. Як працюють опитування та довге опитування? Які їхні недоліки?
3. Чим Server-Sent Events відрізняється від WebSocket?
4. Які транспорти підтримує SignalR і як відбувається їх узгодження?
5. Що таке хаб? Як зареєструвати хаб на сервері?
6. Чому не можна зберігати стан у полях хабу? Де його зберігати?
7. Кому надсилають повідомлення `Clients.All`, `Clients.Caller`, `Clients.Others` і `Clients.OthersInGroup`?
8. Чим `InvokeAsync` відрізняється від `SendAsync` у клієнті .NET?
9. Для чого перевизначають `OnConnectedAsync` і `OnDisconnectedAsync`?
10. Як працюють групи? Що відбувається з членством у групі після відключення?
11. Які переваги дає строго типізований хаб `Hub<T>`?
12. Для чого використовують `HubException`?
13. Чому обробники `On` у Windows Forms не можуть напряму змінювати елементи керування?
14. Як працює `WithAutomaticReconnect`? Які події генерує підключення?
15. Як надіслати повідомлення клієнтам із фонової служби або кінцевої точки REST?
16. Як створити потоковий метод хабу та прочитати потік у клієнті? Як скасувати потік?
17. Коли доцільно використовувати MessagePack? Які його обмеження?

## Корисні посилання

- Огляд ASP.NET Core SignalR: <https://learn.microsoft.com/aspnet/core/signalr/introduction>
- Хаби: <https://learn.microsoft.com/aspnet/core/signalr/hubs>
- Клієнт .NET: <https://learn.microsoft.com/aspnet/core/signalr/dotnet-client>
- Групи та користувачі: <https://learn.microsoft.com/aspnet/core/signalr/groups>
- `IHubContext`: <https://learn.microsoft.com/aspnet/core/signalr/hubcontext>
- SignalR у фонових службах: <https://learn.microsoft.com/aspnet/core/signalr/background-services>
- Потокове передавання: <https://learn.microsoft.com/aspnet/core/signalr/streaming>
- Конфігурація: <https://learn.microsoft.com/aspnet/core/signalr/configuration>
- Протокол MessagePack: <https://learn.microsoft.com/aspnet/core/signalr/messagepackhubprotocol>
- Клієнт JavaScript: <https://learn.microsoft.com/aspnet/core/signalr/javascript-client>
- Автентифікація та авторизація: <https://learn.microsoft.com/aspnet/core/signalr/authn-and-authz>
- Масштабування: <https://learn.microsoft.com/aspnet/core/signalr/scale>
- Діагностика: <https://learn.microsoft.com/aspnet/core/signalr/diagnostics>
