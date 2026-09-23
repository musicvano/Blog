---
title: "Приклади та типові помилки"
description: "Тема 16. Файли, потоки та JSON: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

### Статистика текстового файлу

Програма створює текстовий файл, підраховує в ньому рядки, слова й символи та записує звіт в інший файл.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

string folder = Path.Combine("data", "texts");
Directory.CreateDirectory(folder);        // якщо немає – створити
string source = Path.Combine(folder, "lecture.txt");
string report = Path.Combine(folder, "lecture-report.txt");

// Підготовка вхідного файлу (UTF-8 без BOM).
File.WriteAllLines(source,
[
    "Файл – іменована послідовність байтів на диску.",
    "",
    "Потік – абстракція послідовного читання й запису байтів.",
    "Серіалізація перетворює об’єкт на рядок або байти.",
]);

int lines = 0, emptyLines = 0, words = 0, chars = 0;
string longest = "";
// ReadLines читає файл поступово, рядок за рядком.
foreach (string line in File.ReadLines(source))
{
    lines++;
    chars += line.Length;
    if (string.IsNullOrWhiteSpace(line))
    {
        emptyLines++;
        continue;
    }
    words += line.Split(' ',
        StringSplitOptions.RemoveEmptyEntries).Length;
    if (line.Length > longest.Length)
    {
        longest = line;
    }
}

File.WriteAllLines(report,
[
    $"Файл: {Path.GetFileName(source)}",
    $"Розмір: {new FileInfo(source).Length} байтів",
    $"Рядків: {lines} (порожніх: {emptyLines})",
    $"Слів: {words}, символів: {chars}",
    $"Найдовший рядок: {longest.Length} символів",
]);

Console.WriteLine($"Звіт {Path.GetFileName(report)}:");
Console.WriteLine(File.ReadAllText(report));
```

`Directory.CreateDirectory` не генерує винятку, якщо каталог уже існує. `File.ReadLines` читає файл поступово, тому програма однаково працює з файлами будь-якого розміру. Розмір файлу (295 байтів) більший за кількість символів (153), бо кириличні символи в UTF-8 займають по два байти, а кожен рядок завершується символами кінця рядка. Файли створюються відносно робочого каталогу. Результат:

```
Звіт lecture-report.txt:
Файл: lecture.txt
Розмір: 295 байтів
Рядків: 4 (порожніх: 1)
Слів: 22, символів: 153
Найдовший рядок: 56 символів
```

### Журнал подій

Два сеанси роботи дописують події в журнал через `StreamWriter`, після чого програма виводить останні три записи.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

string logPath = Path.Combine("data", "events.log");
Directory.CreateDirectory("data");
File.Delete(logPath);                 // почати з порожнього журналу

DateTime start = new(2026, 9, 16, 9, 0, 0);
string[] messages =
[
    "INFO  застосунок запущено",
    "INFO  користувач olena увійшов",
    "WARN  повільна відповідь сервера",
    "ERROR не вдалося зберегти звіт",
    "INFO  звіт збережено повторно",
    "INFO  користувач olena вийшов",
];

// Два сеанси запису: другий дописує в кінець файлу.
for (int session = 0; session < 2; session++)
{
    using StreamWriter writer = new(logPath, append: true);
    for (int i = session * 3; i < (session + 1) * 3; i++)
    {
        DateTime time = start.AddMinutes(i * 7);
        writer.WriteLine($"{time:HH:mm} {messages[i]}");
    }
}   // тут writer закрито: дані записано на диск

int count = File.ReadLines(logPath).Count();
Console.WriteLine($"Рядків у журналі: {count}");
Console.WriteLine("Останні 3 записи:");
foreach (string line in ReadLast(logPath, 3))
{
    Console.WriteLine($"  {line}");
}

// Читання останніх рядків без завантаження всього файлу в пам’ять.
static IEnumerable<string> ReadLast(string path, int count)
{
    Queue<string> last = new(count);
    using StreamReader reader = new(path);
    while (reader.ReadLine() is string line)
    {
        if (last.Count == count)
        {
            last.Dequeue();
        }
        last.Enqueue(line);
    }
    return last;
}
```

`using`-оголошення в тілі циклу закриває `StreamWriter` наприкінці кожної ітерації, тому другий сеанс відкриває файл заново й дописує в кінець (`append: true`). Метод `ReadLast` зберігає в черзі лише останні *N* рядків, не завантажуючи весь файл. Час подій задано явно, щоб результат не залежав від моменту запуску. Результат:

```
Рядків у журналі: 6
Останні 3 записи:
  09:21 ERROR не вдалося зберегти звіт
  09:28 INFO  звіт збережено повторно
  09:35 INFO  користувач olena вийшов
```

### Імпорт оцінок з CSV

Програма імпортує оцінки з CSV-файлу, пропускаючи рядки з порожнім балом, балом поза діапазоном і датою в неправильному форматі, та обчислює середній бал за дисциплінами.

```cs
using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

string csvPath = Path.Combine("data", "grades.csv");
Directory.CreateDirectory("data");
File.WriteAllText(csvPath, """
    Student,Course,Score,Date
    Коваль Олена,ООП,92.5,2026-06-10
    Бондар Петро,ООП,74,2026-06-10
    Мельник Ірина,Бази даних,88.0,2026-06-12
    Ткач Андрій,ООП,,2026-06-10
    Шевчук Марія,Бази даних,105,2026-06-12
    Олійник Дмитро,ООП,81.5,12.06.2026
    """);

List<Grade> grades = [];
int lineNumber = 0;
foreach (string line in File.ReadLines(csvPath).Skip(1)) // заголовок
{
    lineNumber++;
    string[] f = line.Split(',');
    if (f.Length != 4)
    {
        Console.WriteLine($"Рядок {lineNumber}: очікується 4 поля");
    }
    // Числа й дати у файлі записано незалежно від культури.
    else if (!double.TryParse(f[2], NumberStyles.Float,
        CultureInfo.InvariantCulture, out double score)
        || score is < 0 or > 100)
    {
        Console.WriteLine($"Рядок {lineNumber}: хибний бал «{f[2]}»");
    }
    else if (!DateOnly.TryParseExact(f[3], "yyyy-MM-dd",
        out DateOnly date))
    {
        Console.WriteLine($"Рядок {lineNumber}: хибна дата «{f[3]}»");
    }
    else
    {
        grades.Add(new Grade(f[0], f[1], score, date));
    }
}

Console.WriteLine($"Імпортовано: {grades.Count}");
foreach (var course in grades.GroupBy(g => g.Course))
{
    // Виведення – з культурою користувача (uk-UA): кома в числах.
    double average = course.Average(g => g.Score);
    Console.WriteLine($"  {course.Key}: середній бал {average:F1}");
}

record Grade(
    string Student, string Course, double Score, DateOnly Date);
```

Числа розбираються з `CultureInfo.InvariantCulture`, тому `92.5` читається правильно в будь-якій культурі. `TryParseExact` вимагає формату `yyyy-MM-dd` і відхиляє `12.06.2026`. Помилковий рядок не зупиняє імпорт, а номер рядка допомагає виправити файл. Результат виводиться з культурою користувача, тому дробова частина відокремлюється комою. Результат:

```
Рядок 4: хибний бал «»
Рядок 5: хибний бал «105»
Рядок 6: хибна дата «12.06.2026»
Імпортовано: 3
  ООП: середній бал 83,2
  Бази даних: середній бал 88,0
```

### Бібліотека книг у JSON

Програма завантажує список книг з JSON-файлу (або створює порожній, якщо файлу немає), додає книги та зберігає список з налаштуваннями серіалізації.

```cs
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Serialization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

JsonSerializerOptions options = new(JsonSerializerDefaults.Web)
{
    WriteIndented = true,
    Converters = { new JsonStringEnumConverter() },
    // Кирилиця без екранування \uXXXX.
    Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
};
string path = Path.Combine("data", "books.json");
Directory.CreateDirectory("data");
File.Delete(path);

List<Book> books = Load(path, options);
Console.WriteLine($"Завантажено книг: {books.Count}");

books.Add(new("Тигролови", 1944, ["Іван Багряний"], Genre.Novel));
books.Add(new("Лісова пісня", 1911, ["Леся Українка"], Genre.Drama));
Save(path, books, options);

Console.WriteLine(File.ReadAllText(path));
List<Book> loaded = Load(path, options);
Console.WriteLine($"Завантажено книг: {loaded.Count}, " +
    $"однакові: {loaded.SequenceEqual(books, new BookComparer())}");

static List<Book> Load(string path, JsonSerializerOptions options)
{
    if (!File.Exists(path))
    {
        return [];            // перший запуск
    }
    string json = File.ReadAllText(path);
    return JsonSerializer.Deserialize<List<Book>>(json, options)
        ?? [];
}

static void Save(
    string path, List<Book> books, JsonSerializerOptions options)
{
    // Запис у тимчасовий файл і заміна: старі дані не зіпсуються.
    string temp = path + ".tmp";
    File.WriteAllText(temp, JsonSerializer.Serialize(books, options));
    File.Move(temp, path, overwrite: true);
}

enum Genre { Novel, Poetry, Drama }

record Book(string Title, int Year, string[] Authors, Genre Genre);

// Масиви в записах порівнюються за посиланням – власний порівнювач.
class BookComparer : IEqualityComparer<Book>
{
    public bool Equals(Book? x, Book? y) =>
        x is not null && y is not null && x.Title == y.Title
        && x.Year == y.Year && x.Genre == y.Genre
        && x.Authors.SequenceEqual(y.Authors);

    public int GetHashCode(Book b) =>
        HashCode.Combine(b.Title, b.Year);
}
```

Метод `Save` спочатку записує тимчасовий файл і лише потім замінює ним основний: якщо запис перерветься, попередні дані не зіпсуються. Перелічення записано назвами, назви властивостей – у *camelCase*, кирилицю не екрановано. Записи з масивом `Authors` порівнюються власним порівнювачем, бо згенерований `Equals` порівнює масиви за посиланнями. Результат:

```
Завантажено книг: 0
[
  {
    "title": "Тигролови",
    "year": 1944,
    "authors": [
      "Іван Багряний"
    ],
    "genre": "Novel"
  },
  {
    "title": "Лісова пісня",
    "year": 1911,
    "authors": [
      "Леся Українка"
    ],
    "genre": "Drama"
  }
]
Завантажено книг: 2, однакові: True
```

Створені програмою файли видно у вихідному каталозі проєкту (рис. 16.8).

![Файли, створені програмою](./images/04-explorer-output-folder.png)

Рис. 16.8. Файли, створені програмою {.caption}

## Типові помилки

Таблиця 16.3. Типові помилки під час роботи з файлами та JSON {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| `FileNotFoundException` для файлу з проєкту | відносний шлях від іншого робочого каталогу; встановити *Copy to Output Directory*, використовувати `AppContext.BaseDirectory` |
| «used by another process» | потік не закрито; створювати потоки в `using` |
| файл порожній або обрізаний | `StreamWriter` не закрито й буфер не записано; `using` або `Flush` |
| дані втрачено під час збереження | `WriteAllText` перезаписує файл одразу; писати в тимчасовий файл і замінювати |
| кирилиця «�» або `\u041A…` | інше кодування файлу; вказати `Encoding` або `JavaScriptEncoder` |
| `92.5` читається як 925 | розбір у культурі uk-UA; використовувати `CultureInfo.InvariantCulture` |
| склеювання шляхів через `+` і `\` | програма не працює на інших ОС; використовувати `Path.Combine` |
| `JsonException` під час читання | некоректний JSON або невідповідність типів; обробляти виняток і повідомляти користувача |
