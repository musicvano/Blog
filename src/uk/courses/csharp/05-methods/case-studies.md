---
title: "Приклади та типові помилки"
description: "Тема 5. Методи, параметри, рекурсія: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

### Бібліотека перевірок введення

Методи `ReadInt` і `ReadDouble` повторюють запит, доки користувач не введе число з допустимого діапазону. Необов’язкові параметри та іменовані аргументи дозволяють задавати лише потрібні обмеження й власне повідомлення про помилку.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

int age = ReadInt("Вік: ", min: 0, max: 120);
double height = ReadDouble("Зріст, м: ", 0.5, 2.5);
int children = ReadInt("Кількість дітей: ", min: 0,
    error: "Кількість не може бути від’ємною.");

Console.WriteLine($"Вік {age}, зріст {height:F2}, дітей {children}");

// Зчитує ціле число з діапазону [min; max], повторюючи запит.
static int ReadInt(string prompt, int min = int.MinValue,
    int max = int.MaxValue, string? error = null)
{
    while (true)
    {
        Console.Write(prompt);
        if (int.TryParse(Console.ReadLine(), out int value)
            && value >= min && value <= max)
        {
            return value;
        }
        Console.WriteLine(error
            ?? $"Введіть ціле число від {min} до {max}.");
    }
}

// Зчитує дійсне число з діапазону [min; max].
static double ReadDouble(string prompt, double min, double max)
{
    while (true)
    {
        Console.Write(prompt);
        string text = (Console.ReadLine() ?? "").Replace('.', ',');
        if (double.TryParse(text, out double value)
            && value >= min && value <= max)
        {
            return value;
        }
        Console.WriteLine($"Введіть число від {min} до {max}.");
    }
}
```

Метод `ReadDouble` приймає і кому, і крапку, замінюючи крапку комою перед розбором з українськими налаштуваннями. Третій виклик `ReadInt` задає лише мінімум і повідомлення: максимум береться за замовчуванням. Результат роботи:

```
Вік: 150
Введіть ціле число від 0 до 120.
Вік: 35
Зріст, м: 1.82
Кількість дітей: -1
Кількість не може бути від’ємною.
Кількість дітей: 2
Вік 35, зріст 1,82, дітей 2
```

### Статистика масиву

Статичний клас `Stats` містить перевантажені методи `Summary` для масивів `int[]` і `double[]`, які повертають середнє значення, а мінімум і максимум – через параметри `out`, та метод `TryAverage` у стилі `TryParse`.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

int[] scores = [78, 92, 65, 88, 54];
double[] temps = [-2.5, 0.8, 3.1, -0.4];

double avg = Stats.Summary(scores, out int low, out int high);
Console.WriteLine($"Бали: середнє {avg:F1}, від {low} до {high}");

double avgT = Stats.Summary(temps, out double minT, out double maxT);
Console.WriteLine($"Температури: {avgT:F2}, від {minT} до {maxT}");

int[] empty = [];
if (!Stats.TryAverage(empty, out double average))
{
    Console.WriteLine("Порожній масив: середнє не визначене.");
}
if (Stats.TryAverage(scores, out average))
{
    Console.WriteLine($"TryAverage: {average}");
}

static class Stats
{
    // Середнє, мінімум і максимум масиву цілих чисел.
    public static double Summary(int[] values,
        out int min, out int max)
    {
        min = values[0];
        max = values[0];
        long sum = 0;
        foreach (int v in values)
        {
            min = Math.Min(min, v);
            max = Math.Max(max, v);
            sum += v;
        }
        return (double)sum / values.Length;
    }

    // Перевантаження для масиву дійсних чисел.
    public static double Summary(double[] values,
        out double min, out double max)
    {
        min = values[0];
        max = values[0];
        double sum = 0;
        foreach (double v in values)
        {
            min = Math.Min(min, v);
            max = Math.Max(max, v);
            sum += v;
        }
        return sum / values.Length;
    }

    // Шаблон TryXxx: false замість винятку для порожнього масиву.
    public static bool TryAverage(int[] values, out double average)
    {
        if (values.Length == 0)
        {
            average = 0;
            return false;
        }
        average = Summary(values, out _, out _);
        return true;
    }
}
```

Компілятор обирає варіант `Summary` за типом масиву. Метод `TryAverage` повторно використовує `Summary`, відкидаючи непотрібні мінімум і максимум (`out _`). Для порожнього масиву він повертає `false` замість винятку `IndexOutOfRangeException`, який виник би в `Summary` під час звернення до `values[0]`. Результат:

```
Бали: середнє 75,4, від 54 до 92
Температури: 0,25, від -2,5 до 3,1
Порожній масив: середнє не визначене.
TryAverage: 75,4
```

### Ханойські вежі

Потрібно перенести вежу з *n* дисків зі стрижня A на стрижень C, використовуючи допоміжний стрижень B; за один хід переноситься один диск, і більший диск не можна класти на менший. Рекурсивне розв’язання: перенести *n* − 1 дисків на допоміжний стрижень, перенести найбільший диск на цільовий і знову перенести *n* − 1 дисків на цільовий.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Кількість дисків (1–10): ");
if (!int.TryParse(Console.ReadLine(), out int disks)
    || disks is < 1 or > 10)
{
    Console.WriteLine("Потрібне ціле число від 1 до 10.");
    return;
}

int moves = 0;
Hanoi(disks, 'A', 'C', 'B', ref moves);
int expected = (1 << disks) - 1;     // 2^n - 1
Console.WriteLine($"Ходів: {moves}, за формулою: {expected}");

// Переносить n дисків зі стрижня from на стрижень to через via.
static void Hanoi(int n, char from, char to, char via,
    ref int moves)
{
    if (n == 0)
    {
        return;                              // базовий випадок
    }
    Hanoi(n - 1, from, via, to, ref moves);  // n-1 – на допоміжний
    moves++;
    Console.WriteLine($"{moves,3}. Диск {n}: {from} → {to}");
    Hanoi(n - 1, via, to, from, ref moves);  // n-1 – на цільовий
}
```

Лічильник ходів передається параметром `ref`, тому всі рекурсивні виклики збільшують ту саму змінну `moves`. Кількість ходів дорівнює 2<sup>*n*</sup> − 1 (`1 << disks` – це 2<sup>*n*</sup>). Результат для трьох дисків:

```
Кількість дисків (1–10): 3
  1. Диск 1: A → C
  2. Диск 2: A → B
  3. Диск 1: C → B
  4. Диск 3: A → C
  5. Диск 1: B → A
  6. Диск 2: B → C
  7. Диск 1: A → C
Ходів: 7, за формулою: 7
```

### Числа Фібоначчі

Програма обчислює 40-ве число Фібоначчі трьома способами: прямою рекурсією, рекурсією з мемоізацією та циклом, і вимірює час кожного способу.

```cs
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const int N = 40;
var watch = Stopwatch.StartNew();

long recursive = FibRecursive(N);
long recursiveMs = watch.ElapsedMilliseconds;

watch.Restart();
long[] memo = new long[N + 1];
long memoized = FibMemo(N, memo);
double memoMs = watch.Elapsed.TotalMilliseconds;

watch.Restart();
long iterative = FibIterative(N);
double iterMs = watch.Elapsed.TotalMilliseconds;

Console.WriteLine($"Рекурсія:   {recursive}, {recursiveMs} мс");
Console.WriteLine($"Мемоізація: {memoized}, {memoMs:F3} мс");
Console.WriteLine($"Ітерація:   {iterative}, {iterMs:F3} мс");

// Пряма рекурсія: кожен виклик породжує ще два.
static long FibRecursive(int n) =>
    n < 2 ? n : FibRecursive(n - 1) + FibRecursive(n - 2);

// Рекурсія із запам’ятовуванням обчислених значень.
static long FibMemo(int n, long[] memo)
{
    if (n < 2)
    {
        return n;
    }
    if (memo[n] == 0)
    {
        memo[n] = FibMemo(n - 1, memo) + FibMemo(n - 2, memo);
    }
    return memo[n];
}

// Цикл: два попередні значення.
static long FibIterative(int n)
{
    long previous = 0, current = 1;
    for (int i = 0; i < n; i++)
    {
        (previous, current) = (current, previous + current);
    }
    return previous;
}
```

Масив `memo` передається в усі рекурсивні виклики: нуль означає, що значення ще не обчислене (для *n* ≥ 2 числа Фібоначчі додатні). Цикл зберігає лише два останні значення, а запис `(previous, current) = (current, previous + current)` присвоює обидві змінні одночасно. Результат (час залежить від комп’ютера):

```
Рекурсія:   102334155, 566 мс
Мемоізація: 102334155, 0,123 мс
Ітерація:   102334155, 0,065 мс
```

Пряма рекурсія виконує 331 160 281 виклик і працює в тисячі разів повільніше; мемоізація зводить кількість обчислень до 41, як і цикл.

## Типові помилки

У табл. 5.1 наведено помилки, яких найчастіше припускаються під час роботи з методами.

Таблиця 5.1. Типові помилки під час роботи з методами {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| змінна не змінилася після виклику методу | аргумент передано за значенням; повернути результат (`x = Increment(x)`) або використати `ref` |
| CS0161: *not all code paths return a value* | не на всіх шляхах є `return`; додати `return` після `if` або гілку `else` |
| CS0177: вихідний параметр не присвоєно | метод із `out` мусить присвоїти значення на кожному шляху, навіть у разі невдачі |
| CS0165 для аргументу `ref` | змінну не ініціалізовано до виклику; для вихідного значення використати `out` |
| CS0128: локальну функцію вже визначено | локальні функції не перевантажуються; оголосити методи в класі |
| CS0121: виклик неоднозначний | два перевантаження однаково придатні; явно привести аргумент (`F(5.0)`, `F(5m)`) |
| CS1737: необов’язкові параметри перед обов’язковими | перенести параметри зі значеннями за замовчуванням у кінець списку |
| програма аварійно завершується з `Stack overflow.` | немає базового випадку або рекурсія не наближається до нього; перевірити умову виходу |
| рекурсивний метод працює дуже довго | повторні обчислення тих самих значень; мемоізація або цикл |
