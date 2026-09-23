---
title: "Практика"
description: "Тема 16. Файли, потоки та JSON: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Звіт про вміст каталогу

Створити тестовий каталог проєкту з файлами відомого розміру, рекурсивно обійти його та вивести кількість і сумарний розмір файлів за розширеннями, найбільший файл і кількість підкаталогів.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// Підготовка тестового каталогу з файлами відомого розміру.
string root = Path.Combine("data", "project");
if (Directory.Exists(root))
{
    Directory.Delete(root, recursive: true);
}
CreateFile("README.md", 1_200);
CreateFile(Path.Combine("src", "Program.cs"), 3_400);
CreateFile(Path.Combine("src", "Models", "Book.cs"), 900);
CreateFile(Path.Combine("docs", "guide.md"), 5_600);
CreateFile(Path.Combine("docs", "images", "logo.png"), 48_000);
CreateFile(Path.Combine("docs", "images", "scheme.png"), 131_000);

DirectoryInfo directory = new(root);
FileInfo[] files =
    directory.GetFiles("*", SearchOption.AllDirectories);

Console.WriteLine($"Каталог {directory.Name}: {files.Length} файлів");
var byExtension = files
    .GroupBy(f => f.Extension.ToLowerInvariant())
    .Select(g =>
        (Ext: g.Key, Count: g.Count(), Size: g.Sum(f => f.Length)))
    .OrderByDescending(x => x.Size);
foreach (var (ext, count, total) in byExtension)
{
    Console.WriteLine($"  {ext,-5}{count} шт. {FormatSize(total),9}");
}

FileInfo largest = files.MaxBy(f => f.Length)!;
string relative = Path.GetRelativePath(root, largest.FullName);
string size = FormatSize(largest.Length);
Console.WriteLine($"Найбільший: {relative} ({size})");
Console.WriteLine($"Підкаталогів: {directory.GetDirectories("*",
    SearchOption.AllDirectories).Length}");

void CreateFile(string relativePath, int size)
{
    string full = Path.Combine(root, relativePath);
    Directory.CreateDirectory(Path.GetDirectoryName(full)!);
    File.WriteAllBytes(full, new byte[size]);
}

static string FormatSize(long bytes) => bytes switch
{
    < 1024 => $"{bytes} Б",
    < 1024 * 1024 => $"{bytes / 1024.0:F1} КБ",
    _ => $"{bytes / (1024.0 * 1024):F1} МБ",
};
```

Локальна функція `CreateFile` створює відсутні підкаталоги методом `Directory.CreateDirectory` і записує масив нульових байтів потрібного розміру. `GetFiles` з `SearchOption.AllDirectories` повертає файли всіх рівнів вкладеності як `FileInfo`, тож розмір і розширення доступні без додаткових звертань до диска. `Path.GetRelativePath` виводить шлях відносно кореня; роздільник залежить від операційної системи. Результат (Windows):

```
Каталог project: 6 файлів
  .png 2 шт.  174,8 КБ
  .md  2 шт.    6,6 КБ
  .cs  2 шт.    4,2 КБ
Найбільший: docs\images\scheme.png (127,9 КБ)
Підкаталогів: 4
```

## Приклад 2. Двійковий файл рекордів

Зберегти рекорди гравців у двійковий файл із записами фіксованої довжини (ідентифікатор, бали, ім’я до 16 символів). Прочитати й оновити запис за номером без читання всього файлу.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

const int NameLength = 16;                    // символів
const int RecordSize = 4 + 4 + NameLength * 2;  // Id, Score, Name
string path = Path.Combine("data", "scores.bin");
Directory.CreateDirectory("data");

// Запис трьох рекордів.
using (FileStream stream = new(path, FileMode.Create))
using (BinaryWriter writer = new(stream))
{
    WriteRecord(writer, new(1, 12_500, "Олена"));
    WriteRecord(writer, new(2, 9_870, "Петро"));
    WriteRecord(writer, new(3, 15_020, "Ірина"));
}
long length = new FileInfo(path).Length;
Console.WriteLine($"Розмір файлу: {length} Б = 3 × {RecordSize}");

// Прямий доступ: читання й оновлення запису за номером.
using (FileStream stream = new(path, FileMode.Open))
using (BinaryReader reader = new(stream))
using (BinaryWriter writer = new(stream))
{
    stream.Seek(1 * RecordSize, SeekOrigin.Begin);
    ScoreRecord second = ReadRecord(reader);
    Console.WriteLine($"Запис 1: {second}");

    stream.Seek(1 * RecordSize, SeekOrigin.Begin);
    WriteRecord(writer, second with { Score = 16_300 });
    Console.WriteLine($"Позиція після оновлення: {stream.Position}");

    stream.Seek(0, SeekOrigin.Begin);
    Console.WriteLine("Усі записи:");
    while (stream.Position < stream.Length)
    {
        Console.WriteLine($"  {ReadRecord(reader)}");
    }
}

static void WriteRecord(BinaryWriter writer, ScoreRecord record)
{
    writer.Write(record.Id);
    writer.Write(record.Score);
    // Ім’я фіксованої довжини: доповнення символами '\0'.
    string name =
        record.Name.PadRight(NameLength, '\0')[..NameLength];
    foreach (char c in name)
    {
        writer.Write((ushort)c);
    }
}

static ScoreRecord ReadRecord(BinaryReader reader)
{
    int id = reader.ReadInt32();
    int score = reader.ReadInt32();
    char[] name = new char[NameLength];
    for (int i = 0; i < NameLength; i++)
    {
        name[i] = (char)reader.ReadUInt16();
    }
    return new(id, score, new string(name).TrimEnd('\0'));
}

record ScoreRecord(int Id, int Score, string Name);
```

Розмір запису – 40 байтів: два `int` по 4 байти й 16 символів по 2 байти. Ім’я доповнюється символами `'\0'` до фіксованої довжини. Запис з номером 1 починається зі зміщення 40, тому `Seek(1 * RecordSize, …)` переходить до нього одразу. Після читання позиція зсувається, тож для оновлення потрібен повторний `Seek`. `BinaryReader` і `BinaryWriter` працюють з одним потоком, відкритим у режимі `FileMode.Open` (доступ за замовчуванням – читання й запис). Результат:

```
Розмір файлу: 120 Б = 3 × 40
Запис 1: ScoreRecord { Id = 2, Score = 9870, Name = Петро }
Позиція після оновлення: 80
Усі записи:
  ScoreRecord { Id = 1, Score = 12500, Name = Олена }
  ScoreRecord { Id = 2, Score = 16300, Name = Петро }
  ScoreRecord { Id = 3, Score = 15020, Name = Ірина }
```

## Приклад 3. Налаштування застосунку в JSON

Завантажувати налаштування з файлу `settings.json`, використовуючи значення за замовчуванням для відсутніх властивостей. Якщо файлу немає або JSON некоректний, створити файл з типовими налаштуваннями.

```cs
using System.Text.Json;
using System.Text.Json.Serialization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

string path = Path.Combine("data", "settings.json");
Directory.CreateDirectory("data");
JsonSerializerOptions options = new() { WriteIndented = true };

// 1. Файлу немає – створюються налаштування за замовчуванням.
File.Delete(path);
AppSettings settings = LoadOrCreate(path, options);
Console.WriteLine($"Типові: {settings}");

// 2. Користувач змінив частину значень вручну.
File.WriteAllText(path, """
    {
      "theme": "dark",
      "font_size": 18,
      "unknown_option": true
    }
    """);
settings = LoadOrCreate(path, options);
Console.WriteLine($"З файлу: {settings}");

// 3. Некоректний JSON – попередження й типові значення.
File.WriteAllText(path, """{ "font_size": "великий" }""");
settings = LoadOrCreate(path, options);
Console.WriteLine($"Після помилки: {settings}");
Console.WriteLine(File.ReadAllText(path));

static AppSettings LoadOrCreate(
    string path, JsonSerializerOptions options)
{
    AppSettings? settings = null;
    if (File.Exists(path))
    {
        try
        {
            settings = JsonSerializer.Deserialize<AppSettings>(
                File.ReadAllText(path), options);
        }
        catch (JsonException e)
        {
            Console.WriteLine($"  Помилка JSON у {e.Path}");
        }
    }
    settings ??= new AppSettings();
    settings.FontSize = Math.Clamp(settings.FontSize, 8, 32);
    string json = JsonSerializer.Serialize(settings, options);
    File.WriteAllText(path, json);
    return settings;
}

class AppSettings
{
    [JsonPropertyName("theme")]
    public string Theme { get; set; } = "light";

    [JsonPropertyName("font_size")]
    public int FontSize { get; set; } = 14;

    [JsonPropertyName("recent_files")]
    public List<string> RecentFiles { get; set; } = [];

    [JsonIgnore]                         // не зберігається у файлі
    public bool IsDark => Theme == "dark";

    public override string ToString() =>
        $"{Theme}, {FontSize} пт, темна: {IsDark}";
}
```

Атрибути `[JsonPropertyName]` задають назви у стилі *snake\_case*, а ініціалізатори властивостей – типові значення, які залишаються для властивостей, відсутніх у файлі. Невідома властивість `unknown_option` ігнорується, а обчислювана властивість `IsDark` з `[JsonIgnore]` не зберігається. Рядок «великий» не перетворюється на `int`, тому `JsonException` містить шлях до помилкової властивості. Після завантаження значення перевіряються й налаштування одразу зберігаються у виправленому вигляді. Результат:

```
Типові: light, 14 пт, темна: False
З файлу: dark, 18 пт, темна: True
  Помилка JSON у $.font_size
Після помилки: light, 14 пт, темна: False
{
  "theme": "light",
  "font_size": 14,
  "recent_files": []
}
```
