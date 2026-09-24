---
title: "Practice"
description: "Topic 16. Files, streams, JSON: worked examples"
outline: [2, 3]
sourceHash: "ab0ea4bcf807f938f25568934c704c643d0f5886c466b859e40d9fdb6cd30ed5"
---

# Practice

## Example 1. A directory contents report

Create a test project directory with files of known size, traverse it recursively, and print the number and total size of files by extension, the largest file, and the number of subdirectories.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// Preparing a test directory with files of known size.
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

Console.WriteLine($"Directory {directory.Name}: {files.Length} files");
var byExtension = files
    .GroupBy(f => f.Extension.ToLowerInvariant())
    .Select(g =>
        (Ext: g.Key, Count: g.Count(), Size: g.Sum(f => f.Length)))
    .OrderByDescending(x => x.Size);
foreach (var (ext, count, total) in byExtension)
{
    Console.WriteLine($"  {ext,-5}{count} pcs {FormatSize(total),9}");
}

FileInfo largest = files.MaxBy(f => f.Length)!;
string relative = Path.GetRelativePath(root, largest.FullName);
string size = FormatSize(largest.Length);
Console.WriteLine($"Largest: {relative} ({size})");
Console.WriteLine($"Subdirectories: {directory.GetDirectories("*",
    SearchOption.AllDirectories).Length}");

void CreateFile(string relativePath, int size)
{
    string full = Path.Combine(root, relativePath);
    Directory.CreateDirectory(Path.GetDirectoryName(full)!);
    File.WriteAllBytes(full, new byte[size]);
}

static string FormatSize(long bytes) => bytes switch
{
    < 1024 => $"{bytes} B",
    < 1024 * 1024 => $"{bytes / 1024.0:F1} KB",
    _ => $"{bytes / (1024.0 * 1024):F1} MB",
};
```

The local function `CreateFile` creates missing subdirectories with the `Directory.CreateDirectory` method and writes an array of zero bytes of the required size. `GetFiles` with `SearchOption.AllDirectories` returns files at all nesting levels as `FileInfo` objects, so the size and extension are available without additional disk access. `Path.GetRelativePath` prints the path relative to the root; the separator depends on the operating system. Output (Windows):

```
Directory project: 6 files
  .png 2 pcs  174,8 KB
  .md  2 pcs    6,6 KB
  .cs  2 pcs    4,2 KB
Largest: docs\images\scheme.png (127,9 KB)
Subdirectories: 4
```

## Example 2. A binary file of high scores

Save players’ high scores to a binary file with fixed-length records (identifier, score, name of up to 16 characters). Read and update a record by number without reading the whole file.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

const int NameLength = 16;                    // characters
const int RecordSize = 4 + 4 + NameLength * 2;  // Id, Score, Name
string path = Path.Combine("data", "scores.bin");
Directory.CreateDirectory("data");

// Writing three records.
using (FileStream stream = new(path, FileMode.Create))
using (BinaryWriter writer = new(stream))
{
    WriteRecord(writer, new(1, 12_500, "Olena"));
    WriteRecord(writer, new(2, 9_870, "Petro"));
    WriteRecord(writer, new(3, 15_020, "Iryna"));
}
long length = new FileInfo(path).Length;
Console.WriteLine($"File size: {length} B = 3 × {RecordSize}");

// Random access: reading and updating a record by number.
using (FileStream stream = new(path, FileMode.Open))
using (BinaryReader reader = new(stream))
using (BinaryWriter writer = new(stream))
{
    stream.Seek(1 * RecordSize, SeekOrigin.Begin);
    ScoreRecord second = ReadRecord(reader);
    Console.WriteLine($"Record 1: {second}");

    stream.Seek(1 * RecordSize, SeekOrigin.Begin);
    WriteRecord(writer, second with { Score = 16_300 });
    Console.WriteLine($"Position after the update: {stream.Position}");

    stream.Seek(0, SeekOrigin.Begin);
    Console.WriteLine("All records:");
    while (stream.Position < stream.Length)
    {
        Console.WriteLine($"  {ReadRecord(reader)}");
    }
}

static void WriteRecord(BinaryWriter writer, ScoreRecord record)
{
    writer.Write(record.Id);
    writer.Write(record.Score);
    // A fixed-length name: padded with '\0' characters.
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

The record size is 40 bytes: two 4-byte `int` values and 16 characters of 2 bytes each. The name is padded with `'\0'` characters to a fixed length. Record number 1 starts at offset 40, so `Seek(1 * RecordSize, …)` jumps to it immediately. After reading, the position moves, so a repeated `Seek` is needed for the update. `BinaryReader` and `BinaryWriter` work with the same stream opened in `FileMode.Open` mode (the default access is read and write). Output:

```
File size: 120 B = 3 × 40
Record 1: ScoreRecord { Id = 2, Score = 9870, Name = Petro }
Position after the update: 80
All records:
  ScoreRecord { Id = 1, Score = 12500, Name = Olena }
  ScoreRecord { Id = 2, Score = 16300, Name = Petro }
  ScoreRecord { Id = 3, Score = 15020, Name = Iryna }
```

## Example 3. Application settings in JSON

Load settings from the `settings.json` file, using default values for missing properties. If the file does not exist or the JSON is invalid, create a file with the default settings.

```cs
using System.Text.Json;
using System.Text.Json.Serialization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

string path = Path.Combine("data", "settings.json");
Directory.CreateDirectory("data");
JsonSerializerOptions options = new() { WriteIndented = true };

// 1. There is no file – default settings are created.
File.Delete(path);
AppSettings settings = LoadOrCreate(path, options);
Console.WriteLine($"Defaults: {settings}");

// 2. The user changed some of the values manually.
File.WriteAllText(path, """
    {
      "theme": "dark",
      "font_size": 18,
      "unknown_option": true
    }
    """);
settings = LoadOrCreate(path, options);
Console.WriteLine($"From the file: {settings}");

// 3. Invalid JSON – a warning and default values.
File.WriteAllText(path, """{ "font_size": "large" }""");
settings = LoadOrCreate(path, options);
Console.WriteLine($"After the error: {settings}");
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
            Console.WriteLine($"  JSON error at {e.Path}");
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

    [JsonIgnore]                         // not saved to the file
    public bool IsDark => Theme == "dark";

    public override string ToString() =>
        $"{Theme}, {FontSize} pt, dark: {IsDark}";
}
```

The `[JsonPropertyName]` attributes set names in *snake\_case*, and the property initializers set default values, which remain for properties missing from the file. The unknown property `unknown_option` is ignored, and the computed property `IsDark` with `[JsonIgnore]` is not saved. The string “large” cannot be converted to `int`, so the `JsonException` contains the path to the invalid property. After loading, the values are validated and the settings are immediately saved in corrected form. Output:

```
Defaults: light, 14 pt, dark: False
From the file: dark, 18 pt, dark: True
  JSON error at $.font_size
After the error: light, 14 pt, dark: False
{
  "theme": "light",
  "font_size": 14,
  "recent_files": []
}
```
