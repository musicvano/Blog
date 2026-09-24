---
title: "Examples and common mistakes"
description: "Topic 13. Generics and collections: Examples and common mistakes"
outline: [2, 3]
sourceHash: "59c5933a1b13d1f08fa29996cfc08faeafee8b16b7fa7ffad25cfe965a5eacf3"
---

# Examples and common mistakes

## Example programs

### Generic maximum search

The generic method `FindMax<T>` with an `IComparable<T>` constraint finds the largest element of an array of numbers, strings, and dates, and `Swap<T>` swaps the values of two variables.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

int[] scores = [72, 95, 88, 61];
string[] cities = ["Lviv", "Zhytomyr", "Odesa", "Vinnytsia"];
DateOnly[] deadlines =
[
    new(2026, 10, 1), new(2026, 12, 20), new(2026, 11, 5),
];

// The compiler infers the type argument from the method arguments.
Console.WriteLine($"Highest score: {FindMax(scores)}");
Console.WriteLine($"Last city alphabetically: {FindMax(cities)}");
Console.WriteLine($"Latest deadline: {FindMax(deadlines)}");
Console.WriteLine($"Type specified explicitly: {FindMax<double>([2.5, 7])}");

string first = "left", second = "right";
Swap(ref first, ref second);
Console.WriteLine($"After swapping: {first}, {second}");

static T FindMax<T>(T[] items) where T : IComparable<T>
{
    if (items.Length == 0)
    {
        throw new ArgumentException("the array is empty", nameof(items));
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

For each call, the compiler infers the type argument from the array type: `int`, `string`, or `DateOnly`. In the call `FindMax<double>([2.5, 7])`, the type is specified explicitly, so the integer 7 is converted to `double`. Strings are compared using the culture, so “Zhytomyr” comes last in alphabetical order. Output:

```
Highest score: 95
Last city alphabetically: Zhytomyr
Latest deadline: 20.12.2026
Type specified explicitly: 7
After swapping: right, left
```

### A generic repository

The `Repository<T>` class stores entities in a `List<T>` and looks them up by identifier. The `class, IEntity` constraint lets it return `null` and access the `Id` property.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Repository<Student> students = new();
students.Add(new Student(1, "Olena Koval"));
students.Add(new Student(2, "Petro Bondar"));

Repository<Course> courses = new();
courses.Add(new Course(10, "OOP", 5));

Console.WriteLine($"Students: {students.Count}");
Console.WriteLine($"Found: {students.Find(2)?.Name ?? "none"}");
Console.WriteLine($"Found: {students.Find(7)?.Name ?? "none"}");
Console.WriteLine($"Course 10: {courses.Find(10)}");

try
{
    students.Add(new Student(1, "Iryna Melnyk"));
}
catch (InvalidOperationException e)
{
    Console.WriteLine($"Error: {e.Message}");
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

// A generic class with constraints: a reference type with an Id.
class Repository<T> where T : class, IEntity
{
    private readonly List<T> items = [];

    public int Count => items.Count;

    public void Add(T item)
    {
        if (Find(item.Id) is not null)
        {
            throw new InvalidOperationException(
                $"{typeof(T).Name} with Id {item.Id} already exists");
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

    // Read-only access from outside.
    public IReadOnlyList<T> GetAll() => items;
}
```

One class serves both students and courses: the `Student` and `Course` records implement `IEntity`. The `Find` method returns `T?`, and `typeof(T).Name` in the message contains the name of the closed type. The `GetAll` method returns the list as `IReadOnlyList<T>`, so the caller cannot add an element bypassing the uniqueness check. Output:

```
Students: 2
Found: Petro Bondar
Found: none
Course 10: Course { Id = 10, Title = OOP, Credits = 5 }
Error: Student with Id 1 already exists
  Student { Id = 2, Name = Petro Bondar }
```

### A word frequency dictionary

The program counts how many times each word of a text occurs, ignoring case, and prints the five most frequent ones.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

string text = """
    Code is written for people. Code is read more often than it is written.
    Good code is easy to read, and bad code is easy to change
    only for the worse. Write code for people!
    """;

char[] separators = [' ', '.', ',', '!', '?', '\n', '\r'];
string[] words =
    text.Split(separators, StringSplitOptions.RemoveEmptyEntries);

// Keys are compared case-insensitively.
Dictionary<string, int> frequency =
    new(StringComparer.OrdinalIgnoreCase);
foreach (string word in words)
{
    frequency.TryGetValue(word, out int count);   // 0 if missing
    frequency[word] = count + 1;
}

Console.WriteLine($"Words: {words.Length}, distinct: {frequency.Count}");
Console.WriteLine($"“people”: {frequency.GetValueOrDefault("people")}");
Console.WriteLine($"“test”: {frequency.GetValueOrDefault("test")}");

List<KeyValuePair<string, int>> top = [.. frequency];
top.Sort(new ByCountThenWord());

Console.WriteLine("Top 5:");
for (int i = 0; i < Math.Min(5, top.Count); i++)
{
    Console.WriteLine($"  {top[i].Key,-8} {top[i].Value}");
}

// Descending frequency; with equal frequency, alphabetical.
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

The `TryGetValue` method writes 0 to `count` if the word is not there yet, so a single statement handles both a new and an existing word. Thanks to `StringComparer.OrdinalIgnoreCase`, “Code” and “code” are the same key. For sorting, the pairs are copied into a list because a dictionary has no order, and the `ByCountThenWord` comparer sorts them by descending frequency. Output:

```
Words: 35, distinct: 20
“people”: 2
“test”: 0
Top 5:
  Code     5
  is       5
  for      3
  easy     2
  people   2
```

### A bank queue

A model of a single teller window: each service takes 4 minutes. The program compares a regular `Queue<T>` with a priority queue in which customers with priority status are served first.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

// Customers in order of arrival: surname, arrival minute, priority status.
Client[] arrivals =
[
    new("Koval", 0, false), new("Bondar", 1, false),
    new("Melnyk", 2, true), new("Tkach", 3, false),
    new("Shevchuk", 4, true), new("Oliinyk", 12, false),
];

Console.WriteLine("Regular Queue<T>:");
Simulate(arrivals, usePriority: false);
Console.WriteLine("PriorityQueue:");
Simulate(arrivals, usePriority: true);

static void Simulate(Client[] arrivals, bool usePriority)
{
    const int ServiceMinutes = 4;
    Queue<Client> queue = new();
    // The priority is a tuple (0 for priority customers, arrival number):
    // with equal priority, the order of arrival is preserved.
    PriorityQueue<Client, (int, int)> priority = new();

    int next = 0, clock = 0, served = 0;
    int totalWait = 0, privilegedWait = 0, privileged = 0;
    List<string> log = [];
    while (served < arrivals.Length)
    {
        // Everyone who has already arrived joins the queue.
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
            clock = arrivals[next].Arrival;   // the window is idle
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
        $"  average: {average:F1} min, priority customers: {vip:F1} min");
}

record Client(string Name, int Arrival, bool IsPrivileged);
```

The `clock` variable models time: before each service, all customers who have already arrived join the queue, and if the queue is empty, the time jumps to the arrival of the next customer. The priority `(0 or 1, arrival number)` guarantees the order of arrival among customers with the same status. The overall average wait is the same, but priority customers wait three times less. Output (the minutes of waiting follow the colon):

```
Regular Queue<T>:
  Koval:0, Bondar:3, Melnyk:6, Tkach:9, Shevchuk:12, Oliinyk:8
  average: 6,3 min, priority customers: 9,0 min
PriorityQueue:
  Koval:0, Melnyk:2, Shevchuk:4, Bondar:11, Tkach:13, Oliinyk:8
  average: 6,3 min, priority customers: 3,0 min
```

## Common mistakes

Table 13.3. Common mistakes when working with generics and collections {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| `KeyNotFoundException` | reading `dict[key]` for a missing key; use `TryGetValue` or `GetValueOrDefault` |
| `ArgumentException` in `Add` | the key already exists; use the indexer to replace or `TryAdd` |
| `InvalidOperationException` during `foreach` | the collection was modified during iteration; iterate over a copy or use a `for` loop from the end |
| an element “got lost” in a dictionary or set | the key was changed after adding, or `GetHashCode` is inconsistent with `Equals`; use immutable keys |
| slow search in a large list | `List<T>.Contains` performs a linear search; for frequent checks, use `HashSet<T>` or a dictionary |
| `PriorityQueue` order for equal priorities | the order is not guaranteed; add an arrival number to the priority |
| outside code modifies an internal list | a property returns `List<T>`; return `IReadOnlyList<T>` |
| `ArrayList` or `Hashtable` in new code | boxing and type casts; use generic collections |
