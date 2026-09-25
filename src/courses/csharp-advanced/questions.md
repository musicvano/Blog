---
title: "Review questions"
description: "Object-oriented programming in C# II: review questions on the course topics"
sourceHash: "0d56c41e6f81d9ec5945bc28029336a0c3edfad17c23267c86960fe74e6fdf5d"
---

# Review questions

Questions for self-check and exam preparation, grouped by course topic.

## Topic 1. Git version control

1. What is a version control system? Explain the concepts of a repository, a commit, and the index (staging area) in Git.
2. Describe the main Git commands for creating a repository, committing changes, and viewing history (init, add, commit, status, log, diff).
3. What are branches in Git? Compare merging (merge) and rebasing (rebase) branches.
4. How do merge conflicts arise, and how are they resolved, including with Visual Studio 2026?
5. Explain working with remote repositories: clone, fetch, pull, push. What is a pull request on GitHub?
6. What is the .gitignore file for? Which files of a .NET project should not be added to the repository?

## Topic 2. Regular expressions

7. What are regular expressions? Explain character classes, quantifiers, and anchors.
8. Explain the methods of the Regex class: IsMatch, Match, Matches, Replace, and Split. Give examples of their use.
9. What are capturing groups, named groups, and backreferences in regular expressions?
10. Explain the difference between greedy and lazy quantifiers. What are RegexOptions used for?
11. What are regular expressions generated at compile time (the [GeneratedRegex] attribute)? What advantages do they give?
12. How do you validate input data (an email address, a phone number, a date) with regular expressions?

## Topic 3. Windows Forms fundamentals

13. Describe the structure of a Windows Forms application: the Form class, the Application.Run method, the form designer files (Designer).
14. What main Windows Forms controls do you know? Explain their common properties.
15. Explain the event model in Windows Forms. How do you create and attach an event handler?
16. How do you position controls on a form with the Anchor and Dock properties and the TableLayoutPanel and FlowLayoutPanel containers?
17. How do you use the standard Windows Forms dialog boxes (MessageBox, OpenFileDialog, SaveFileDialog, ColorDialog)?
18. How do you create a main menu and a context menu, a toolbar, and a status bar in a Windows Forms application?

## Topic 4. GDI+ graphics

19. What is GDI+? Explain the role of the Graphics class, the Paint event, and the Invalidate method.
20. What are the Pen, Brush, and Font classes for? What kinds of brushes does GDI+ provide?
21. How do you draw lines, shapes, text, and images with the Graphics class?
22. Explain the GDI+ coordinate system and coordinate transformations (translation, scaling, rotation).
23. Why does flicker occur during drawing, and how do you eliminate it with double buffering?
24. How do you create an image in memory with the Bitmap class, draw on it, and save it to a file?

## Topic 5. Asynchrony with async/await

25. What is asynchronous programming? Explain the Task and Task&lt;T&gt; classes and the async and await keywords.
26. Why do long-running operations block the graphical interface? Explain the role of the synchronization context and the UI thread.
27. What is the difference between asynchronous I/O operations and computations in Task.Run?
28. How do you cancel an asynchronous operation with CancellationTokenSource and CancellationToken?
29. How do you display the progress of a long-running operation in the interface with IProgress&lt;T&gt;?
30. How do you handle exceptions in asynchronous methods? Why should async void methods be avoided, except for event handlers?

## Topic 6. DI, configuration, logging

31. What is dependency injection? Explain the role of the IServiceCollection and IServiceProvider interfaces.
32. Explain the Singleton, Scoped, and Transient service lifetimes. Give examples of their use.
33. What is the .NET Generic Host? How is it used in desktop and web applications?
34. How does .NET application configuration work: the appsettings.json file, environment variables, user secrets, the IConfiguration interface?
35. What is the options pattern? How do you bind a configuration section to a class through IOptions&lt;T&gt;?
36. How do you log events with ILogger&lt;T&gt;? Explain log levels and logging providers.

## Topic 7. SQL and ADO.NET

37. Explain the basic concepts of the relational data model: a table, primary and foreign keys, relationships between tables, normalization.
38. Explain the SQL statements for creating tables and changing data (CREATE TABLE, INSERT, UPDATE, DELETE).
39. How do you build SQL queries with SELECT, WHERE, JOIN, GROUP BY, and ORDER BY?
40. How do you create a PostgreSQL database and work with it in JetBrains DataGrip?
41. Describe the ADO.NET architecture and the classes of the Npgsql provider: NpgsqlConnection, NpgsqlCommand, NpgsqlDataReader.
42. What are parameterized queries? How do they protect against SQL injection attacks?
43. What are transactions? How do you execute several ADO.NET commands in one transaction? What is a connection pool for?

## Topic 8. Entity Framework Core

44. What is object-relational mapping (ORM)? Compare Entity Framework Core and ADO.NET.
45. Explain the role of the DbContext and DbSet&lt;T&gt; classes. How do you add the Npgsql.EntityFrameworkCore.PostgreSQL provider?
46. How is the data model configured in EF Core: conventions, data annotation attributes, and the Fluent API?
47. How do you describe one-to-many and many-to-many relationships between entities in EF Core?
48. What are database migrations? Explain the dotnet ef migrations add and dotnet ef database update commands.
49. How do you build LINQ to Entities queries? Explain loading related data (Include) and deferred query execution.
50. How does change tracking work in EF Core? Explain adding, modifying, and deleting entities and the SaveChanges method.

## Topic 9. Networking and sockets

51. Explain the basics of network communication: the TCP/IP protocol stack, IP addresses, ports, the TCP and UDP protocols.
52. Describe the .NET classes for networking: Socket, TcpListener, TcpClient, NetworkStream.
53. Describe the structure of a client-server application based on TCP sockets.
54. How can a server serve several clients at the same time using asynchronous methods?
55. How do you transfer data over UDP with the UdpClient class? Compare it with TCP.
56. How do you define message boundaries in a TCP stream and design your own application data exchange protocol?

## Topic 10. REST web services

57. What is the REST architectural style? Explain the HTTP methods (GET, POST, PUT, DELETE) and response status codes.
58. How do you create a web service with ASP.NET Core Minimal API? Explain the MapGet, MapPost, MapPut, and MapDelete methods.
59. How does Minimal API get data from the route, the query string, and the request body? What are Results and TypedResults used for?
60. How do you group endpoints (MapGroup) and validate input data in Minimal API?
61. How do you document a web service with OpenAPI and test it with requests from .http files in Visual Studio 2026?
62. How do you use EF Core in a Minimal API web service through dependency injection?
63. How do you call a web service from a client application with HttpClient, IHttpClientFactory, and the GetFromJsonAsync and PostAsJsonAsync methods?

## Topic 11. Real time with SignalR

64. What is real-time messaging? Compare server polling and WebSocket.
65. What is ASP.NET Core SignalR? Explain the SignalR transports and transport selection.
66. What is a hub? How does the server call client methods through Clients.All, Clients.Caller, and Clients.Others?
67. How do you combine connections into SignalR groups and send messages to a group?
68. How do you connect to a hub from a .NET client application with the HubConnection class?
69. What are strongly typed hubs? How do you handle client connections and disconnections?

## Topic 12. WPF fundamentals

70. Describe the WPF architecture. Compare the WPF and Windows Forms technologies.
71. Explain the XAML syntax: elements, attributes, property elements, and markup extensions.
72. Describe the WPF layout panels: Grid, StackPanel, WrapPanel, DockPanel, and Canvas.
73. Explain the content model of WPF controls (ContentControl, ItemsControl).
74. What are routed events? Explain bubbling and tunneling events.
75. What are dependency properties, and why are they needed?

## Topic 13. Data binding and MVVM

76. How does data binding work in WPF? Explain the binding modes and the INotifyPropertyChanged interface.
77. How do you display data collections in WPF with ObservableCollection&lt;T&gt; and ItemsSource?
78. What are value converters (IValueConverter), and when are they used?
79. What are resources and styles in WPF? Explain property and data triggers.
80. Compare data templates (DataTemplate) and control templates (ControlTemplate).
81. Describe the MVVM pattern: the purpose of the Model, View, and ViewModel. How do you implement commands through the ICommand interface?
82. How does the CommunityToolkit.Mvvm library simplify implementing MVVM (ObservableObject, the [ObservableProperty] and [RelayCommand] attributes)?

## Topic 14. WPF animation and multimedia

83. How does animation work in WPF? Explain the DoubleAnimation and ColorAnimation classes.
84. What is a storyboard (Storyboard)? How do you start an animation with event triggers?
85. What are key-frame animation and easing functions?
86. How do you apply the RotateTransform, ScaleTransform, and TranslateTransform transforms to WPF elements and animate them?
87. How do you play audio and video in a WPF application with MediaElement?
88. Describe the WPF 2D graphics tools: shapes (Shape), geometries, and brushes.

## Topic 15. Cross-platform .NET MAUI

89. What is .NET MAUI? Describe the application architecture, the structure of the single project, and the target platforms.
90. Compare .NET MAUI pages, layouts, and controls with WPF.
91. How do you organize navigation between pages in .NET MAUI with Shell and pass parameters?
92. How do you implement data binding and the MVVM pattern in .NET MAUI with CommunityToolkit.Mvvm?
93. How do you use device services in .NET MAUI (geolocation, Preferences, the file system) and request permissions?
94. How do you run and debug a .NET MAUI application on Windows and in the Android emulator?

## Topic 16. AI in .NET

95. What are large language models (LLMs)? Explain the concepts of a prompt, a token, and a context window.
96. What is the Microsoft.Extensions.AI library? Explain the IChatClient abstraction and connecting different model providers (OpenAI, Azure OpenAI, Ollama).
97. How do you build a conversation with a model using ChatMessage and roles (system, user, assistant), and how do you store the conversation history?
98. How do you receive a model's response as a stream (GetStreamingResponseAsync) and display it in the interface?
99. What is function calling? How can a model call methods of a .NET application?
100. What are embeddings and IEmbeddingGenerator? How do you store API keys securely and control the cost of requests to models?
