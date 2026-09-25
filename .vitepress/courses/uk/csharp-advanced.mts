import type { Course } from "../sidebar.mts";

export default {
  slug: "csharp-advanced",
  title: "Об’єктно-орієнтоване програмування C# II",
  modules: [
    {
      title: "Інструменти розробника та Windows Forms",
      topics: [
        {
          slug: "01-git",
          short: "Керування версіями Git",
          chapters: [
            ["version-control", "Git і його налаштування"],
            ["basic-workflow", "Коміти та скасування змін"],
            ["branches", "Гілки, злиття та конфлікти"],
            ["history-remotes", "Історія та робота в команді"],
            ["common-mistakes", "Типові помилки"],
          ],
        },
        {
          slug: "02-regex",
          short: "Регулярні вирази",
          chapters: [
            ["syntax", "Синтаксис регулярних виразів"],
            ["regex-class", "Клас Regex і групи"],
            ["replace-options", "Заміна, параметри та перегляд"],
            ["performance-testing", "Продуктивність, генерація та тести"],
            ["common-mistakes", "Типові помилки"],
          ],
        },
        {
          slug: "03-winforms",
          short: "Основи Windows Forms",
          chapters: [
            ["winforms-project", "Проєкт Windows Forms"],
            ["controls-events", "Форми, елементи та події"],
            ["layout-validation", "Компонування та перевірка введення"],
            ["menus-dialogs", "Меню, діалоги й таблиці"],
            ["common-mistakes", "Типові помилки"],
          ],
        },
        {
          slug: "04-gdi-plus",
          short: "Графіка GDI+",
          chapters: [
            ["paint-basics", "Подія Paint, кольори та пера"],
            ["shapes-transforms", "Фігури, текст і перетворення"],
            ["animation-mouse", "Анімація та малювання мишею"],
            ["images-controls", "Зображення, друк і власні елементи"],
            ["common-mistakes", "Типові помилки"],
          ],
        },
        {
          slug: "05-async-await",
          short: "Асинхронність async/await",
          chapters: [
            ["tasks-await", "Задачі, async і await"],
            ["context-cancellation", "Контекст, обчислення та скасування"],
            ["streams-combinators", "Асинхронні потоки та кілька задач"],
            ["exceptions-winforms", "Винятки та асинхронні методи форм"],
            ["debugging-mistakes", "Налагодження та типові помилки"],
          ],
        },
        {
          slug: "06-dependency-injection",
          short: "DI, конфігурація, журналювання",
          chapters: [
            ["dependency-injection", "Впровадження залежностей і контейнер"],
            ["host-configuration", "Хост, конфігурація та параметри"],
            ["logging", "Журналювання"],
            ["winforms-di", "DI у Windows Forms і тестованість"],
            ["common-mistakes", "Типові помилки"],
          ],
        },
      ],
    },
    {
      title: "Бази даних, мережні застосунки та вебсервіси",
      topics: [
        {
          slug: "07-sql-ado-net",
          short: "SQL та ADO.NET",
          chapters: [
            ["relational-model", "Реляційна модель і PostgreSQL"],
            ["sql", "Мова SQL: таблиці та запити"],
            ["ado-net", "Архітектура ADO.NET і команди"],
            ["parameters-transactions", "Параметри, транзакції та DataGridView"],
            ["common-mistakes", "Типові помилки"],
          ],
        },
        {
          slug: "08-ef-core",
          short: "Entity Framework Core",
          chapters: [
            ["context-model", "Контекст даних і модель"],
            ["migrations-queries", "Міграції та запити LINQ"],
            ["related-data", "Пов’язані дані та відстеження змін"],
            ["transactions-sql", "Транзакції, сирий SQL і тестування"],
            ["common-mistakes", "Типові помилки"],
          ],
        },
        {
          slug: "09-sockets",
          short: "Мережні застосунки та сокети",
          chapters: [
            ["network-basics", "Мережі, TCP, UDP і Socket"],
            ["tcp", "TCP: клієнт, сервер і протокол"],
            ["multiple-clients", "Обслуговування кількох клієнтів"],
            ["udp-diagnostics", "UDP, помилки та діагностика"],
            ["common-mistakes", "Типові помилки"],
          ],
        },
        {
          slug: "10-rest-api",
          short: "Вебсервіси REST",
          chapters: [
            ["http-rest-api", "HTTP, REST, JSON і Minimal API"],
            ["endpoints-results", "Маршрути, результати та валідація"],
            ["docs-database", "Документування та база даних"],
            ["http-client", "Клієнт HttpClient і безпека"],
            ["common-mistakes", "Типові помилки"],
          ],
        },
        {
          slug: "11-signalr",
          short: "Реальний час із SignalR",
          chapters: [
            ["hubs-clients", "Архітектура, хаб і клієнт .NET"],
            ["groups-winforms", "Групи, типізовані хаби та форми"],
            ["connection-messaging", "Перепідключення та надсилання"],
            ["streaming-scaling", "Потоки, MessagePack і масштабування"],
            ["common-mistakes", "Типові помилки"],
          ],
        },
      ],
    },
    {
      title: "Технології інтерфейсу та штучний інтелект",
      topics: [
        {
          slug: "12-wpf",
          short: "Основи WPF",
          chapters: [
            ["wpf-xaml", "WPF, XAML і дерева елементів"],
            ["layout-controls", "Компонування та елементи керування"],
            ["events-properties", "Події та властивості залежностей"],
            ["commands-windows", "Команди, вікна та тема Fluent"],
            ["common-mistakes", "Типові помилки"],
          ],
        },
        {
          slug: "13-wpf-mvvm",
          short: "Прив’язка даних і MVVM",
          chapters: [
            ["data-binding", "Прив’язка та перетворення значень"],
            ["collections-styles", "Колекції, стилі й шаблони"],
            ["validation-mvvm", "Валідація, MVVM і CommunityToolkit"],
            ["composition-testing", "Композиція застосунку й тестування"],
            ["common-mistakes", "Типові помилки"],
          ],
        },
        {
          slug: "14-wpf-animation",
          short: "Анімація та мультимедіа WPF",
          chapters: [
            ["graphics-animation", "Графіка та анімація властивостей"],
            ["storyboard", "Розкадрування та ключові кадри"],
            ["frame-animation", "Покадрова анімація та швидкодія"],
            ["media", "Зображення, звук і відео"],
            ["common-mistakes", "Типові помилки"],
          ],
        },
        {
          slug: "15-maui",
          short: "Кросплатформний .NET MAUI",
          chapters: [
            ["maui-project", "Платформа та єдиний проєкт"],
            ["pages-mvvm", "Сторінки, стилі та MVVM"],
            ["shell-navigation", "Навігація Shell"],
            ["device-data", "Сервіси пристрою, дані й публікація"],
            ["common-mistakes", "Типові помилки"],
          ],
        },
        {
          slug: "16-ai",
          short: "Штучний інтелект у .NET",
          chapters: [
            ["llm-chat-client", "Мовні моделі та IChatClient"],
            ["streaming-structured", "Потокові та структуровані відповіді"],
            ["tools-middleware", "Виклик функцій і конвеєр клієнтів"],
            ["embeddings-rag", "Вектори, RAG і безпека"],
            ["common-mistakes", "Типові помилки"],
          ],
        },
      ],
    },
  ],
} satisfies Course;
