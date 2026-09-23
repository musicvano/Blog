---
title: "Практика"
description: "Тема 16. Штучний інтелект у .NET: розібрані приклади"
outline: [2, 3]
---

# Практика

Для прикладів потрібен запущений сервер Ollama з моделями `qwen3:4b-instruct` та `embeddinggemma` (команди `ollama pull`). Якщо моделі недоступні, програми повідомляють про помилку з’єднання.

## Приклад 1. Класифікатор відгуків

Написати консольну програму, яка читає відгуки покупців з текстового файлу (один відгук у рядку), для кожного визначає тональність, головну тему, ймовірну оцінку від 1 до 5 і коротке резюме, виводить таблицю й підсумки та зберігає звіт у JSON. Шляхи до файлів задаються аргументами командного рядка; помилки виводяться в потік помилок з кодами завершення 1–3.

```cs
using System.ComponentModel;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.AI;
using OllamaSharp;

Console.OutputEncoding = System.Text.Encoding.UTF8;

if (args.Length != 2)
{
    Console.Error.WriteLine(
        "Використання: Reviews <вхід.txt> <звіт.json>");
    return 1;
}
if (!File.Exists(args[0]))
{
    Console.Error.WriteLine($"Файл не знайдено: {args[0]}");
    return 2;
}

IChatClient client = new OllamaApiClient(
    new Uri("http://localhost:11434"), "qwen3:4b-instruct");
var options = new ChatOptions { Temperature = 0f };
const string Instructions =
    "Проаналізуй відгук покупця інтернет-магазину. Rating – оцінка " +
    "від 1 до 5, яку найімовірніше поставив покупець. Summary – " +
    "одне речення українською до 12 слів.";
```

Кожен рядок файлу – окремий запит зі структурованим виводом. Відповідь приймається, лише якщо JSON коректний і оцінка лежить у допустимому діапазоні:

```cs
List<ReviewResult> results = [];
int lineNumber = 0;
foreach (string line in File.ReadLines(args[0]))
{
    lineNumber++;
    if (string.IsNullOrWhiteSpace(line)) continue;
    try
    {
        ChatResponse<Analysis> response =
            await client.GetResponseAsync<Analysis>(
            [
                new(ChatRole.System, Instructions),
                new(ChatRole.User, line)
            ], options);
        if (response.TryGetResult(out Analysis? a)
            && a.Rating is >= 1 and <= 5)
        {
            results.Add(new ReviewResult(lineNumber, line, a));
            Console.WriteLine($"{lineNumber,3}. {a.Sentiment,-8} " +
                $"{a.Category,-8} {a.Rating}  {a.Summary}");
        }
        else
        {
            Console.Error.WriteLine(
                $"{lineNumber,3}. помилкова відповідь");
        }
    }
    catch (HttpRequestException ex)
    {
        Console.Error.WriteLine($"Модель недоступна: {ex.Message}");
        return 3;
    }
}

Console.WriteLine();
foreach (var group in results.GroupBy(r => r.Analysis.Sentiment))
    Console.WriteLine($"{group.Key,-8} {group.Count(),3}");
if (results.Count > 0)
    Console.WriteLine($"Середня оцінка: " +
        $"{results.Average(r => r.Analysis.Rating):F2}");

var json = new JsonSerializerOptions
{
    WriteIndented = true,
    Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
    Converters = { new JsonStringEnumConverter() }
};
await File.WriteAllTextAsync(args[1],
    JsonSerializer.Serialize(results, json));
return 0;

enum Sentiment { Positive, Neutral, Negative }
enum Category { Delivery, Quality, Price, Support, Other }

record Analysis(
    Sentiment Sentiment,
    [property: Description("Головна тема відгуку")] Category Category,
    int Rating,
    string Summary);

record ReviewResult(int Line, string Text, Analysis Analysis);
```

Перелічення обмежують відповідь моделі допустимими значеннями, а `JsonStringEnumConverter` записує їх у звіт назвами, а не числами. Кодування `UnsafeRelaxedJsonEscaping` залишає кирилицю читабельною (без `І…`). Для файлу `reviews.txt`

```
Навушники чудові, звук чистий, доставили за день!
Чекав посилку три тижні, на дзвінки ніхто не відповідав.
Нормальний чайник за свої гроші, але кришка трохи хитається.
```

команда `dotnet run -- reviews.txt report.json` виводить приблизно таке:

```
  1. Positive Quality  5  Чистий звук і швидка доставка.
  2. Negative Delivery 1  Довга доставка, продавець не відповідає.
  3. Neutral  Quality  3  Чайник нормальний, але кришка хитається.

Positive   1
Negative   1
Neutral    1
Середня оцінка: 3,00
```

Фрагмент звіту `report.json`:

```json
{
  "Line": 1,
  "Text": "Навушники чудові, звук чистий, доставили за день!",
  "Analysis": {
    "Sentiment": "Positive",
    "Category": "Quality",
    "Rating": 5,
    "Summary": "Чистий звук і швидка доставка."
  }
}
```

## Приклад 2. Помічник у WPF

Створити застосунок WPF за патерном MVVM (тема 13) для діалогу з моделлю: вибір моделі у списку, потокове виведення відповіді, кнопка скасування генерації, рядок стану з кількістю токенів. Проєкт *WPF Application* (.NET 10) з пакетами `Microsoft.Extensions.AI`, `OllamaSharp` і `CommunityToolkit.Mvvm`.

ViewModel не залежить від Ollama: вона отримує `IChatClient` у конструкторі, тому її можна перевірити з фейковим клієнтом без вікна і без моделі. Атрибут `[RelayCommand]` з параметром `IncludeCancelCommand = true` створює команду `SendCommand` і команду скасування `SendCancelCommand`, яка скасовує `CancellationToken` методу:

```cs
using System.Collections.ObjectModel;
using System.Net.Http;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Microsoft.Extensions.AI;

namespace AiAssistant;

public partial class MessageItem(string author) : ObservableObject
{
    public string Author { get; } = author;

    [ObservableProperty]
    public partial string Text { get; set; } = "";
}

public partial class ChatViewModel(IChatClient client)
    : ObservableObject
{
    private readonly List<ChatMessage> history =
    [
        new(ChatRole.System,
            "Ти – помічник студента. Відповідай українською, стисло.")
    ];

    public ObservableCollection<MessageItem> Messages { get; } = [];
    public string[] Models { get; } =
        ["qwen3:4b-instruct", "llama3.2:3b"];

    [ObservableProperty]
    public partial string SelectedModel { get; set; } =
        "qwen3:4b-instruct";

    [ObservableProperty]
    [NotifyCanExecuteChangedFor(nameof(SendCommand))]
    public partial string Prompt { get; set; } = "";

    [ObservableProperty]
    public partial string Status { get; set; } = "Ready";

    private bool CanSend() => !string.IsNullOrWhiteSpace(Prompt);
```

Метод команди додає повідомлення в колекцію і дописує текст відповіді по мірі надходження оновлень. Цикл `await foreach` продовжується в UI-потоці, тому властивість `Text` можна змінювати без `Dispatcher`:

```cs
    [RelayCommand(CanExecute = nameof(CanSend),
        IncludeCancelCommand = true)]
    private async Task SendAsync(CancellationToken token)
    {
        string text = Prompt.Trim();
        Prompt = "";
        Messages.Add(new MessageItem("You") { Text = text });
        var answer = new MessageItem("Assistant");
        Messages.Add(answer);
        history.Add(new ChatMessage(ChatRole.User, text));

        var options = new ChatOptions { ModelId = SelectedModel };
        List<ChatResponseUpdate> updates = [];
        Status = "Generating...";
        try
        {
            var stream = client.GetStreamingResponseAsync(
                history, options, token);
            await foreach (ChatResponseUpdate update in stream)
            {
                answer.Text += update.Text;   // UI-потік: прив’язка
                updates.Add(update);
            }
            history.AddMessages(updates);
            UsageDetails? usage = updates.ToChatResponse().Usage;
            Status = $"Tokens: {usage?.TotalTokenCount ?? 0}";
        }
        catch (OperationCanceledException)
        {
            answer.Text += " [cancelled]";
            history.RemoveAt(history.Count - 1);
            Status = "Cancelled";
        }
        catch (HttpRequestException ex)
        {
            answer.Text = "Model is not available.";
            history.RemoveAt(history.Count - 1);
            Status = ex.Message;
        }
    }
}
```

Розмітка `MainWindow.xaml` прив’язує список моделей, поле введення, кнопки та список повідомлень до властивостей ViewModel:

```xml
<Window x:Class="AiAssistant.MainWindow"
  xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
  xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
  Title="AI Assistant" Width="640" Height="480">
  <DockPanel Margin="8">
    <StackPanel DockPanel.Dock="Top" Orientation="Horizontal">
      <TextBlock Text="Model:" VerticalAlignment="Center"/>
      <ComboBox Width="180" Margin="6,0"
                ItemsSource="{Binding Models}"
                SelectedItem="{Binding SelectedModel}"/>
    </StackPanel>
    <TextBlock DockPanel.Dock="Bottom" Text="{Binding Status}"/>
    <DockPanel DockPanel.Dock="Bottom" Margin="0,6">
      <Button DockPanel.Dock="Right" Content="Cancel" Width="70"
              Command="{Binding SendCancelCommand}"/>
      <Button DockPanel.Dock="Right" Content="Send" Width="70"
              Margin="6,0" IsDefault="True"
              Command="{Binding SendCommand}"/>
      <TextBox Text="{Binding Prompt,
                              UpdateSourceTrigger=PropertyChanged}"/>
    </DockPanel>
    <ScrollViewer Margin="0,6,0,0">
      <ItemsControl ItemsSource="{Binding Messages}">
        <ItemsControl.ItemTemplate>
          <DataTemplate>
            <Border BorderBrush="Gray" BorderThickness="1"
                    Margin="0,3" Padding="6">
              <StackPanel>
                <TextBlock Text="{Binding Author}" FontWeight="Bold"/>
                <TextBlock Text="{Binding Text}" TextWrapping="Wrap"/>
              </StackPanel>
            </Border>
          </DataTemplate>
        </ItemsControl.ItemTemplate>
      </ItemsControl>
    </ScrollViewer>
  </DockPanel>
</Window>
```

У `MainWindow.xaml.cs` створюється клієнт Ollama без назви моделі (її задає `ChatOptions.ModelId`):

```cs
using System.Windows;
using OllamaSharp;

namespace AiAssistant;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        var ollama = new OllamaApiClient(
            new Uri("http://localhost:11434"));
        DataContext = new ChatViewModel(ollama);
    }
}
```

Кнопка *Send* недоступна, поки поле порожнє (`CanExecute`). Перевірка ViewModel з фейковим клієнтом, який повертає п’ять фрагментів із затримкою 100 мс і 42 токени, дала: після виконання команди відповідь «Асинхронний код не блокує потік.» і стан `Tokens: 42`; після виклику `SendCancelCommand` через 250 мс – відповідь «Асинхронний код [cancelled]» і стан `Cancelled`. Вигляд вікна під час генерації показано на рис. 16.10.

![Помічник у застосунку WPF](./images/05-app-wpf-ai-assistant.png)

Рис. 16.10. Помічник у застосунку WPF {.caption}

## Приклад 3. Довідник курсу

Написати консольну програму, яка відповідає на питання студентів за Markdown-файлами курсу (правила оцінювання, програмне забезпечення тощо) у папці, заданій аргументом. Кожен розділ файлу (від заголовка `## ` до наступного) стає фрагментом; відповідь формується лише за трьома найближчими фрагментами з подібністю не менше 0,35 і завершується списком джерел.

```cs
using CommunityToolkit.VectorData.InMemory;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.VectorData;
using OllamaSharp;

Console.InputEncoding = System.Text.Encoding.UTF8;
Console.OutputEncoding = System.Text.Encoding.UTF8;

string folder = args.Length > 0 ? args[0] : "docs";
if (!Directory.Exists(folder))
{
    Console.Error.WriteLine($"Папку не знайдено: {folder}");
    return 1;
}

var ollama = new Uri("http://localhost:11434");
var store = new InMemoryVectorStore(new()
{
    EmbeddingGenerator = new OllamaApiClient(ollama, "embeddinggemma")
});
IChatClient chat = new OllamaApiClient(ollama, "qwen3:4b-instruct");

var chunks = store.GetCollection<string, Chunk>("course");
await chunks.EnsureCollectionExistsAsync();
List<Chunk> all = Directory.GetFiles(folder, "*.md")
    .SelectMany(Splitter.Split).ToList();
await chunks.UpsertAsync(all);
Console.WriteLine($"Проіндексовано {all.Count} фрагментів.");
```

Якщо жоден фрагмент не досяг порогу, модель не викликається зовсім: так програма не відповідає на питання поза темою курсу і не витрачає час на генерацію. Номери фрагментів у промпті збігаються з номерами у списку джерел:

```cs
while (true)
{
    Console.Write("\nПитання: ");
    string? question = Console.ReadLine();
    if (string.IsNullOrWhiteSpace(question)) return 0;

    List<Chunk> found = [];
    await foreach (var hit in chunks.SearchAsync(question, top: 3))
        if (hit.Score >= 0.35) found.Add(hit.Record);
    if (found.Count == 0)
    {
        Console.WriteLine("У матеріалах курсу відповіді немає.");
        continue;
    }

    string context = string.Join("\n\n", found.Select((c, i) =>
        $"[{i + 1}] {c.Source}\n{c.Text}"));
    var response = await chat.GetResponseAsync(
    [
        new(ChatRole.System,
            "Відповідай українською лише за фрагментами. Посилайся " +
            "на них номерами [1], [2]. Не вигадуй того, чого немає."),
        new(ChatRole.User, $"{context}\n\nПитання: {question}")
    ], new ChatOptions { Temperature = 0f });

    Console.WriteLine(response.Text);
    Console.WriteLine("Джерела:");
    for (int i = 0; i < found.Count; i++)
        Console.WriteLine($"  [{i + 1}] {found[i].Source}");
}
```

Клас запису сховища і розбиття файлу на розділи. Ключ фрагмента складається з назви файлу та номера розділу, а текст фрагмента починається із заголовка, щоб вектор враховував і його:

```cs
public class Chunk
{
    [VectorStoreKey]
    public string Key { get; set; } = "";

    [VectorStoreData]
    public string Source { get; set; } = "";

    [VectorStoreVector(768)]
    public string Text { get; set; } = "";
}

public static class Splitter
{
    // Фрагмент – розділ Markdown від заголовка «## » до наступного.
    public static IEnumerable<Chunk> Split(string path)
    {
        string file = Path.GetFileName(path);
        string heading = file;
        var text = new System.Text.StringBuilder();
        int n = 0;
        foreach (string line in File.ReadLines(path).Append("## "))
        {
            if (!line.StartsWith("## "))
            {
                text.AppendLine(line);
                continue;
            }
            if (text.ToString().Trim().Length > 0)
                yield return new Chunk
                {
                    Key = $"{file}#{++n}",
                    Source = $"{file} › {heading}",
                    Text = $"{heading}\n{text}".Trim()
                };
            heading = line[3..].Trim();
            text.Clear();
        }
    }
}
```

Рядок `"## "`, доданий у кінець файлу методом `Append`, завершує останній розділ. Для папки `docs` з файлами `grading.md` (розділи «Лабораторні роботи», «Екзамен») і `tools.md` («Середовище розробки», «Локальна модель») результат:

```
Проіндексовано 6 фрагментів.

Питання: Скільки балів за лабораторну роботу, якщо здати пізно?
Лабораторну роботу оцінюють до 5 балів, а якщо її здано пізніше
ніж через два тижні – не більше ніж у 3 бали [1].
Джерела:
  [1] grading.md › Лабораторні роботи

Питання: Яка погода завтра?
У матеріалах курсу відповіді немає.
```

Фрагментів шість, бо текст перед першим заголовком `## ` (заголовок файлу `# …`) також стає фрагментом.
