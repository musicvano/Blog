import type { Course } from "../sidebar.mts";

// English translation of the Ukrainian course navigation.

export default {
  slug: "csharp-advanced",
  title: "Object-oriented programming in C# II",
  modules: [
    {
      title: "Developer tools and Windows Forms",
      topics: [
        {
          slug: "01-git",
          short: "Git version control",
          chapters: [
            ["version-control", "Git and its configuration"],
            ["basic-workflow", "Commits and undoing changes"],
            ["branches", "Branches, merges, and conflicts"],
            ["history-remotes", "History and teamwork"],
            ["common-mistakes", "Common mistakes"],
          ],
        },
        {
          slug: "02-regex",
          short: "Regular expressions",
          chapters: [
            ["syntax", "Regular expression syntax"],
            ["regex-class", "The Regex class and groups"],
            ["replace-options", "Replacement, options, and lookarounds"],
            ["performance-testing", "Performance, generation, and testing"],
            ["common-mistakes", "Common mistakes"],
          ],
        },
        {
          slug: "03-winforms",
          short: "Windows Forms fundamentals",
          chapters: [
            ["winforms-project", "A Windows Forms project"],
            ["controls-events", "Forms, controls, and events"],
            ["layout-validation", "Layout and input validation"],
            ["menus-dialogs", "Menus, dialogs, and tables"],
            ["common-mistakes", "Common mistakes"],
          ],
        },
        {
          slug: "04-gdi-plus",
          short: "GDI+ graphics",
          chapters: [
            ["paint-basics", "The Paint event, colors, and pens"],
            ["shapes-transforms", "Shapes, text, and transformations"],
            ["animation-mouse", "Animation and drawing with the mouse"],
            ["images-controls", "Images, printing, and custom controls"],
            ["common-mistakes", "Common mistakes"],
          ],
        },
        {
          slug: "05-async-await",
          short: "Asynchrony with async/await",
          chapters: [
            ["tasks-await", "Tasks, async, and await"],
            ["context-cancellation", "Context, computation, and cancellation"],
            ["streams-combinators", "Asynchronous streams and multiple tasks"],
            ["exceptions-winforms", "Exceptions and asynchronous form methods"],
            ["debugging-mistakes", "Debugging and common mistakes"],
          ],
        },
        {
          slug: "06-dependency-injection",
          short: "DI, configuration, logging",
          chapters: [
            ["dependency-injection", "Dependency injection and the container"],
            ["host-configuration", "The host, configuration, and options"],
            ["logging", "Logging"],
            ["winforms-di", "DI in Windows Forms and testability"],
            ["common-mistakes", "Common mistakes"],
          ],
        },
      ],
    },
    {
      title: "Databases, network applications, and web services",
      topics: [
        {
          slug: "07-sql-ado-net",
          short: "SQL and ADO.NET",
          chapters: [
            ["relational-model", "The relational model and PostgreSQL"],
            ["sql", "SQL: tables and queries"],
            ["ado-net", "ADO.NET architecture and commands"],
            ["parameters-transactions", "Parameters, transactions, and DataGridView"],
            ["common-mistakes", "Common mistakes"],
          ],
        },
        {
          slug: "08-ef-core",
          short: "Entity Framework Core",
          chapters: [
            ["context-model", "The data context and model"],
            ["migrations-queries", "Migrations and LINQ queries"],
            ["related-data", "Related data and change tracking"],
            ["transactions-sql", "Transactions, raw SQL, and testing"],
            ["common-mistakes", "Common mistakes"],
          ],
        },
        {
          slug: "09-sockets",
          short: "Networking and sockets",
          chapters: [
            ["network-basics", "Networking, TCP, UDP, and Socket"],
            ["tcp", "TCP: client, server, and protocol"],
            ["multiple-clients", "Serving multiple clients"],
            ["udp-diagnostics", "UDP, errors, and diagnostics"],
            ["common-mistakes", "Common mistakes"],
          ],
        },
        {
          slug: "10-rest-api",
          short: "REST web services",
          chapters: [
            ["http-rest-api", "HTTP, REST, JSON, and Minimal API"],
            ["endpoints-results", "Routes, results, and validation"],
            ["docs-database", "Documentation and the database"],
            ["http-client", "The HttpClient client and security"],
            ["common-mistakes", "Common mistakes"],
          ],
        },
        {
          slug: "11-signalr",
          short: "Real time with SignalR",
          chapters: [
            ["hubs-clients", "Architecture, the hub, and the .NET client"],
            ["groups-winforms", "Groups, typed hubs, and forms"],
            ["connection-messaging", "Reconnection and sending messages"],
            ["streaming-scaling", "Streaming, MessagePack, and scaling"],
            ["common-mistakes", "Common mistakes"],
          ],
        },
      ],
    },
    {
      title: "User interface technologies and artificial intelligence",
      topics: [
        {
          slug: "12-wpf",
          short: "WPF fundamentals",
          chapters: [
            ["wpf-xaml", "WPF, XAML, and element trees"],
            ["layout-controls", "Layout and controls"],
            ["events-properties", "Events and dependency properties"],
            ["commands-windows", "Commands, windows, and the Fluent theme"],
            ["common-mistakes", "Common mistakes"],
          ],
        },
        {
          slug: "13-wpf-mvvm",
          short: "Data binding and MVVM",
          chapters: [
            ["data-binding", "Binding and value conversion"],
            ["collections-styles", "Collections, styles, and templates"],
            ["validation-mvvm", "Validation, MVVM, and CommunityToolkit"],
            ["composition-testing", "Application composition and testing"],
            ["common-mistakes", "Common mistakes"],
          ],
        },
        {
          slug: "14-wpf-animation",
          short: "WPF animation and multimedia",
          chapters: [
            ["graphics-animation", "Graphics and property animation"],
            ["storyboard", "Storyboards and keyframes"],
            ["frame-animation", "Frame-by-frame animation and performance"],
            ["media", "Images, sound, and video"],
            ["common-mistakes", "Common mistakes"],
          ],
        },
        {
          slug: "15-maui",
          short: "Cross-platform .NET MAUI",
          chapters: [
            ["maui-project", "The platform and single project"],
            ["pages-mvvm", "Pages, styles, and MVVM"],
            ["shell-navigation", "Shell navigation"],
            ["device-data", "Device services, data, and publishing"],
            ["common-mistakes", "Common mistakes"],
          ],
        },
        {
          slug: "16-ai",
          short: "AI in .NET",
          chapters: [
            ["llm-chat-client", "Language models and IChatClient"],
            ["streaming-structured", "Streaming and structured responses"],
            ["tools-middleware", "Function calling and the client pipeline"],
            ["embeddings-rag", "Embeddings, RAG, and security"],
            ["common-mistakes", "Common mistakes"],
          ],
        },
      ],
    },
  ],
} satisfies Course;
