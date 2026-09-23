---
title: "Підсумки"
description: "Тема 16. Штучний інтелект у .NET: висновки та контрольні питання"
---

# Підсумки

## Висновки

Великі мовні моделі генерують текст за токенами в межах контекстного вікна, не пам’ятають попередніх запитів і можуть впевнено помилятися. Бібліотеки Microsoft.Extensions.AI дають спільний інтерфейс `IChatClient` для локальних (Ollama) і хмарних моделей: застосунок надсилає список повідомлень з ролями, отримує відповідь цілком або потоком, а через `GetResponseAsync<T>` – типізований результат, який перевіряє кодом. Виклик функцій дозволяє моделі користуватися даними застосунку, а `ChatClientBuilder` додає до клієнта журналювання, кешування, обмеження та інші проміжні шари і реєструє його в DI, тож постачальника змінюють лише в одному місці. Векторні подання та косинусна подібність лежать в основі семантичного пошуку й RAG, який відповідає за власними документами з посиланнями на джерела. Ключі API зберігають поза кодом, персональні дані не надсилають моделі без потреби, витрати обмежують, а код із моделлю тестують фейковим клієнтом.

## Питання для самоперевірки

1. Що таке велика мовна модель і промпт?
2. Що таке токен і контекстне вікно? Чому довгий діалог стає дорожчим?
3. Як температура впливає на відповідь? Які значення обрати для витягу даних?
4. Що таке галюцинації моделі та як їх зменшити?
5. Чим відрізняються хмарні й локальні моделі? Що таке обмеження частоти запитів?
6. Яке призначення пакетів `Microsoft.Extensions.AI.Abstractions`, `Microsoft.Extensions.AI` і `OllamaSharp`?
7. Які ролі мають повідомлення `ChatMessage`? Навіщо системна інструкція?
8. Як зберігати історію діалогу і чому її потрібно обрізати?
9. Чим `GetStreamingResponseAsync` відрізняється від `GetResponseAsync`? Як скасувати генерацію?
10. Як працює `GetResponseAsync<T>`? Чому результат потрібно перевіряти?
11. Як описати метод C# як інструмент для моделі? Хто насправді виконує метод?
12. Які правила безпеки застосовують до функцій, що викликає модель?
13. Як `ChatClientBuilder` визначає порядок проміжних клієнтів? Як створити власний?
14. Як змінити постачальника моделі, не змінюючи решту коду? Де зберігати ключ API?
15. Що таке векторне подання і косинусна подібність?
16. З яких етапів складається RAG? Навіщо у відповіді посилання на джерела?
17. Як тестувати код, що використовує `IChatClient`, без справжньої моделі?

## Корисні посилання

- Microsoft.Extensions.AI: <https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai>
- Інтерфейс `IChatClient`: <https://learn.microsoft.com/dotnet/ai/ichatclient>
- Інтерфейс `IEmbeddingGenerator`: <https://learn.microsoft.com/dotnet/ai/iembeddinggenerator>
- Токени: <https://learn.microsoft.com/dotnet/ai/conceptual/understanding-tokens>
- Векторні подання: <https://learn.microsoft.com/dotnet/ai/conceptual/embeddings>
- RAG: <https://learn.microsoft.com/dotnet/ai/conceptual/rag>
- Векторні сховища: <https://learn.microsoft.com/dotnet/ai/vector-stores/overview>
- Локальна модель у .NET: <https://learn.microsoft.com/dotnet/ai/quickstarts/chat-local-model>
- Ollama: <https://docs.ollama.com>, моделі: <https://ollama.com/library>
- Секрети користувача: <https://learn.microsoft.com/aspnet/core/security/app-secrets>
- Microsoft Agent Framework: <https://learn.microsoft.com/agent-framework/overview/>
- Model Context Protocol: <https://modelcontextprotocol.io>
