---
title: "Приклади та типові помилки"
description: "Тема 13. Узагальнення та колекції: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

### Узагальнений пошук максимуму

Узагальнений метод `FindMax<T>` з обмеженням `IComparable<T>` знаходить найбільший елемент масиву чисел, рядків і дат, а `Swap<T>` обмінює значення двох змінних.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

int[] scores = [72, 95, 88, 61];
string[] cities = ["Львів", "Житомир", "Одеса", "Вінниця"];
DateOnly[] deadlines =
[
    new(2026, 10, 1), new(2026, 12, 20), new(2026, 11, 5),
];

// Аргумент типу компілятор виводить з аргументів методу.
Console.WriteLine($"Найбільший бал: {FindMax(scores)}");
Console.WriteLine($"Останнє місто за абеткою: {FindMax(cities)}");
Console.WriteLine($"Найпізніший дедлайн: {FindMax(deadlines)}");
Console.WriteLine($"Тип указано явно: {FindMax<double>([2.5, 7])}");

string first = "ліво", second = "право";
Swap(ref first, ref second);
Console.WriteLine($"Після обміну: {first}, {second}");

static T FindMax<T>(T[] items) where T : IComparable<T>
{
    if (items.Length == 0)
    {
        throw new ArgumentException("масив порожній", nameof(items));
    }

    T max = items[0];
    foreach (T item in items)
    {
        if (item.CompareTo(max) > 0)
        {
            max = item;
        }
    }
    return max;
}

static void Swap<T>(ref T a, ref T b) => (a, b) = (b, a);
```

Для кожного виклику компілятор виводить аргумент типу з типу масиву: `int`, `string`, `DateOnly`. У виклику `FindMax<double>([2.5, 7])` тип указано явно, тому ціле 7 перетворюється на `double`. Рядки порівнюються з урахуванням культури, тому «Одеса» стоїть після «Львова» за українською абеткою. Результат:

```
Найбільший бал: 95
Останнє місто за абеткою: Одеса
Найпізніший дедлайн: 20.12.2026
Тип указано явно: 7
Після обміну: право, ліво
```

### Узагальнений репозиторій

Клас `Repository<T>` зберігає сутності у `List<T>` і шукає їх за ідентифікатором. Обмеження `class, IEntity` дозволяє повертати `null` і звертатися до властивості `Id`.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Repository<Student> students = new();
students.Add(new Student(1, "Олена Коваль"));
students.Add(new Student(2, "Петро Бондар"));

Repository<Course> courses = new();
courses.Add(new Course(10, "ООП", 5));

Console.WriteLine($"Студентів: {students.Count}");
Console.WriteLine($"Знайдено: {students.Find(2)?.Name ?? "немає"}");
Console.WriteLine($"Знайдено: {students.Find(7)?.Name ?? "немає"}");
Console.WriteLine($"Курс 10: {courses.Find(10)}");

try
{
    students.Add(new Student(1, "Ірина Мельник"));
}
catch (InvalidOperationException e)
{
    Console.WriteLine($"Помилка: {e.Message}");
}

students.Remove(1);
foreach (Student s in students.GetAll())
{
    Console.WriteLine($"  {s}");
}

interface IEntity
{
    int Id { get; }
}

record Student(int Id, string Name) : IEntity;

record Course(int Id, string Title, int Credits) : IEntity;

// Узагальнений клас з обмеженнями: посилальний тип з Id.
class Repository<T> where T : class, IEntity
{
    private readonly List<T> items = [];

    public int Count => items.Count;

    public void Add(T item)
    {
        if (Find(item.Id) is not null)
        {
            throw new InvalidOperationException(
                $"{typeof(T).Name} з Id {item.Id} уже існує");
        }
        items.Add(item);
    }

    public T? Find(int id)
    {
        foreach (T item in items)
        {
            if (item.Id == id)
            {
                return item;
            }
        }
        return null;
    }

    public bool Remove(int id) =>
        Find(id) is T item && items.Remove(item);

    // Назовні – лише читання.
    public IReadOnlyList<T> GetAll() => items;
}
```

Один клас обслуговує і студентів, і курси: записи `Student` і `Course` реалізують `IEntity`. Метод `Find` повертає `T?`, а `typeof(T).Name` у повідомленні містить назву закритого типу. Метод `GetAll` повертає список як `IReadOnlyList<T>`, тому викликач не може додати елемент в обхід перевірки унікальності. Результат:

```
Студентів: 2
Знайдено: Петро Бондар
Знайдено: немає
Курс 10: Course { Id = 10, Title = ООП, Credits = 5 }
Помилка: Student з Id 1 уже існує
  Student { Id = 2, Name = Петро Бондар }
```

### Частотний словник

Програма підраховує, скільки разів трапляється кожне слово тексту без урахування регістру, і виводить п’ять найчастіших.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

string text = """
    Код пишуть для людей. Код читають частіше, ніж пишуть.
    Добрий код легко читати, а поганий код легко змінити
    лише на гірший. Пишіть код для людей!
    """;

char[] separators = [' ', '.', ',', '!', '?', '\n', '\r'];
string[] words =
    text.Split(separators, StringSplitOptions.RemoveEmptyEntries);

// Ключі порівнюються без урахування регістру.
Dictionary<string, int> frequency =
    new(StringComparer.OrdinalIgnoreCase);
foreach (string word in words)
{
    frequency.TryGetValue(word, out int count);   // 0, якщо немає
    frequency[word] = count + 1;
}

Console.WriteLine($"Слів: {words.Length}, різних: {frequency.Count}");
Console.WriteLine($"«людей»: {frequency.GetValueOrDefault("людей")}");
Console.WriteLine($"«тест»: {frequency.GetValueOrDefault("тест")}");

List<KeyValuePair<string, int>> top = [.. frequency];
top.Sort(new ByCountThenWord());

Console.WriteLine("Топ-5:");
for (int i = 0; i < Math.Min(5, top.Count); i++)
{
    Console.WriteLine($"  {top[i].Key,-8} {top[i].Value}");
}

// Спадання частоти, за рівної частоти – за абеткою.
class ByCountThenWord : IComparer<KeyValuePair<string, int>>
{
    public int Compare(
        KeyValuePair<string, int> x, KeyValuePair<string, int> y)
    {
        int byCount = y.Value.CompareTo(x.Value);
        return byCount != 0
            ? byCount
            : string.Compare(x.Key, y.Key,
                StringComparison.CurrentCulture);
    }
}
```

Метод `TryGetValue` записує 0 у `count`, якщо слова ще немає, тому одна інструкція обробляє і нове, і наявне слово. Завдяки `StringComparer.OrdinalIgnoreCase` «Код» і «код» є одним ключем. Для сортування пари копіюються у список, бо словник не має порядку, а порівнювач `ByCountThenWord` упорядковує їх за спаданням частоти. Результат:

```
Слів: 25, різних: 17
«людей»: 2
«тест»: 0
Топ-5:
  Код      5
  для      2
  легко    2
  людей    2
  пишуть   2
```

### Черга в банку

Модель однієї каси: кожне обслуговування триває 4 хвилини. Програма порівнює звичайну чергу `Queue<T>` і чергу з пріоритетом, у якій пільгові клієнти обслуговуються першими.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// Клієнти в порядку приходу: прізвище, хвилина приходу, пільга.
Client[] arrivals =
[
    new("Коваль", 0, false), new("Бондар", 1, false),
    new("Мельник", 2, true), new("Ткач", 3, false),
    new("Шевчук", 4, true), new("Олійник", 12, false),
];

Console.WriteLine("Звичайна черга Queue<T>:");
Simulate(arrivals, usePriority: false);
Console.WriteLine("Черга з пріоритетом PriorityQueue:");
Simulate(arrivals, usePriority: true);

static void Simulate(Client[] arrivals, bool usePriority)
{
    const int ServiceMinutes = 4;
    Queue<Client> queue = new();
    // Пріоритет – кортеж (0 для пільговиків, номер приходу):
    // за рівного пріоритету зберігається порядок приходу.
    PriorityQueue<Client, (int, int)> priority = new();

    int next = 0, clock = 0, served = 0;
    int totalWait = 0, privilegedWait = 0, privileged = 0;
    List<string> log = [];
    while (served < arrivals.Length)
    {
        // Усі, хто вже прийшов, стають у чергу.
        while (next < arrivals.Length
            && arrivals[next].Arrival <= clock)
        {
            Client c = arrivals[next];
            if (usePriority)
                priority.Enqueue(c, (c.IsPrivileged ? 0 : 1, next));
            else
                queue.Enqueue(c);
            next++;
        }

        Client? client;
        bool found = usePriority
            ? priority.TryDequeue(out client, out _)
            : queue.TryDequeue(out client);
        if (!found)
        {
            clock = arrivals[next].Arrival;   // каса простоює
            continue;
        }

        int wait = clock - client!.Arrival;
        totalWait += wait;
        if (client.IsPrivileged)
        {
            privilegedWait += wait;
            privileged++;
        }
        log.Add($"{client.Name}:{wait}");
        clock += ServiceMinutes;
        served++;
    }

    Console.WriteLine($"  {string.Join(", ", log)}");
    double average = (double)totalWait / arrivals.Length;
    double vip = (double)privilegedWait / privileged;
    Console.WriteLine(
        $"  середнє: {average:F1} хв, для пільговиків: {vip:F1} хв");
}

record Client(string Name, int Arrival, bool IsPrivileged);
```

Змінна `clock` моделює час: перед кожним обслуговуванням у чергу стають усі клієнти, що вже прийшли, а якщо черга порожня, час переходить до приходу наступного клієнта. Пріоритет `(0 або 1, номер приходу)` гарантує порядок приходу серед клієнтів з однаковою пільгою. Загальне середнє очікування однакове, але пільговики чекають утричі менше. Результат (після двокрапки – хвилини очікування):

```
Звичайна черга Queue<T>:
  Коваль:0, Бондар:3, Мельник:6, Ткач:9, Шевчук:12, Олійник:8
  середнє: 6,3 хв, для пільговиків: 9,0 хв
Черга з пріоритетом PriorityQueue:
  Коваль:0, Мельник:2, Шевчук:4, Бондар:11, Ткач:13, Олійник:8
  середнє: 6,3 хв, для пільговиків: 3,0 хв
```

## Типові помилки

Таблиця 13.3. Типові помилки під час роботи з узагальненнями та колекціями {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| `KeyNotFoundException` | читання `dict[key]` для відсутнього ключа; використовувати `TryGetValue` або `GetValueOrDefault` |
| `ArgumentException` у `Add` | ключ уже є; використовувати індексатор для заміни або `TryAdd` |
| `InvalidOperationException` під час `foreach` | колекцію змінено під час перебору; перебирати копію або цикл `for` від кінця |
| елемент «загубився» у словнику чи множині | ключ змінено після додавання або `GetHashCode` не узгоджено з `Equals`; використовувати незмінні ключі |
| повільний пошук у великому списку | `List<T>.Contains` виконує лінійний пошук; для частих перевірок – `HashSet<T>` або словник |
| порядок `PriorityQueue` для рівних пріоритетів | порядок не гарантовано; додати до пріоритету номер надходження |
| зовнішній код змінює внутрішній список | властивість повертає `List<T>`; повертати `IReadOnlyList<T>` |
| `ArrayList`, `Hashtable` у новому коді | упакування й приведення типів; використовувати узагальнені колекції |
