---
title: "Приклади та типові помилки"
description: "Тема 4. Масиви та рядки: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

### Оцінки групи

Програма обробляє масив балів студентів: обчислює середнє, максимум і його позицію, кількість оцінок вище середнього, а також виводить бали за спаданням, не змінюючи вихідний масив.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

int[] scores = [78, 92, 65, 88, 54, 97, 71, 83];

int sum = 0;
int max = scores[0];
foreach (int s in scores)
{
    sum += s;
    max = Math.Max(max, s);
}
double average = (double)sum / scores.Length;

int aboveAverage = 0;
for (int i = 0; i < scores.Length; i++)
{
    if (scores[i] > average)
    {
        aboveAverage++;
    }
}

int[] sorted = (int[])scores.Clone();   // оригінал не змінюється
Array.Sort(sorted);
Array.Reverse(sorted);                  // за спаданням

Console.WriteLine($"Студентів: {scores.Length}");
Console.WriteLine($"Середній бал: {average:F2}");
int position = Array.IndexOf(scores, max) + 1;
Console.WriteLine($"Максимум: {max}, студент № {position}");
Console.WriteLine($"Вище середнього: {aboveAverage}");
Console.WriteLine($"За спаданням: {string.Join(", ", sorted)}");
Console.WriteLine($"Три найкращі: {string.Join(", ", sorted[..3])}");
Console.WriteLine($"Найнижчий: {sorted[^1]}");
```

Сума ділиться після приведення до `double`, інакше середнє було б цілим. Копія `Clone` потрібна, бо `Array.Sort` змінює масив, а позицію максимуму шукаємо у вихідному порядку. Результат:

```
Студентів: 8
Середній бал: 78,50
Максимум: 97, студент № 6
Вище середнього: 4
За спаданням: 97, 92, 88, 83, 78, 71, 65, 54
Три найкращі: 97, 92, 88
Найнижчий: 54
```

### Матриця продажів

Програма зберігає продажі трьох магазинів за чотири місяці в прямокутному масиві `double[,]` і виводить таблицю з підсумками за кожним магазином, кожним місяцем і загальним підсумком.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

string[] shops = ["Центр", "Лондон", "Брюссель"];
string[] months = ["Січ", "Лют", "Бер", "Кві"];

// Рядки – магазини, стовпці – місяці (тис. грн).
double[,] sales =
{
    { 120.5, 98.0, 134.2, 141.7 },
    { 87.3, 91.6, 102.4, 99.8 },
    { 64.0, 70.5, 68.9, 81.2 },
};

int rows = sales.GetLength(0);
int cols = sales.GetLength(1);

Console.Write($"{"Магазин",-14}");
for (int j = 0; j < cols; j++)
{
    Console.Write($"{months[j],8}");
}
Console.WriteLine($"{"Разом",9}");

double[] monthTotals = new double[cols];
for (int i = 0; i < rows; i++)
{
    double shopTotal = 0;
    Console.Write($"{shops[i],-14}");
    for (int j = 0; j < cols; j++)
    {
        Console.Write($"{sales[i, j],8:F1}");
        shopTotal += sales[i, j];
        monthTotals[j] += sales[i, j];
    }
    Console.WriteLine($"{shopTotal,9:F1}");
}

Console.Write($"{"Разом",-14}");
double grandTotal = 0;
foreach (double total in monthTotals)
{
    Console.Write($"{total,8:F1}");
    grandTotal += total;
}
Console.WriteLine($"{grandTotal,9:F1}");
```

Сума за рядком (магазином) накопичується у змінній `shopTotal`, яка обнуляється для кожного рядка, а суми за стовпцями (місяцями) – в окремому масиві `monthTotals`. Прямокутний масив ініціалізовано вкладеними фігурними дужками: вираз колекції `[…]` для багатовимірних масивів не підтримується. Результат:

```
Магазин            Січ     Лют     Бер     Кві    Разом
Центр            120,5    98,0   134,2   141,7    494,4
Лондон            87,3    91,6   102,4    99,8    381,1
Брюссель          64,0    70,5    68,9    81,2    284,6
Разом            271,8   260,1   305,5   322,7   1160,1
```

### Аналіз речення

Програма розбиває речення на слова, знаходить найдовше слово, рахує голосні та записує кожне слово з великої літери.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine("Введіть речення:");
string sentence = Console.ReadLine() ?? "";

char[] separators = [' ', ',', '.', '!', '?', ';', ':', '–'];
string[] words = sentence.Split(separators,
    StringSplitOptions.RemoveEmptyEntries);

if (words.Length == 0)
{
    Console.WriteLine("Слів не знайдено.");
    return;
}

string longest = words[0];
int vowels = 0;
string[] titled = new string[words.Length];

for (int i = 0; i < words.Length; i++)
{
    string word = words[i];
    if (word.Length > longest.Length)
    {
        longest = word;
    }
    foreach (char c in word)
    {
        if ("аеєиіїоуюя".Contains(char.ToLower(c)))
        {
            vowels++;
        }
    }
    titled[i] = char.ToUpper(word[0]) + word[1..].ToLower();
}

Console.WriteLine($"Слів: {words.Length}");
Console.WriteLine($"Найдовше слово: {longest} ({longest.Length})");
Console.WriteLine($"Голосних: {vowels}");
Console.WriteLine($"З великої: {string.Join(" ", titled)}");
```

Дефіс і апостроф не входять до роздільників, тому «об’єктно-орієнтована» залишається одним словом. Вираз `char.ToUpper(word[0]) + word[1..]` поєднує символ і рядок: результат має тип `string`. Результат:

```
Введіть речення:
мова C# – сучасна, об’єктно-орієнтована й ДУЖЕ популярна!
Слів: 7
Найдовше слово: об’єктно-орієнтована (20)
Голосних: 20
З великої: Мова C# Сучасна Об’єктно-орієнтована Й Дуже Популярна
```

### Звіт через `StringBuilder`

Програма будує таблицю товарів із рамкою в `StringBuilder` і порівнює час побудови рядка з 20 000 символів конкатенацією та методом `Append`.

```cs
using System.Diagnostics;
using System.Text;

Console.OutputEncoding = Encoding.UTF8;

string[] items = ["Клавіатура", "Миша", "Монітор 27\"", "Навушники"];
int[] counts = [3, 5, 2, 4];
decimal[] prices = [1250m, 480m, 9999m, 1299.5m];

var report = new StringBuilder();
report.AppendLine("┌────────────────────┬──────┬───────────┐");
report.AppendLine($"│{"Товар",-20}│{"К-сть",6}│{"Сума",11}│");
report.AppendLine("├────────────────────┼──────┼───────────┤");

decimal total = 0;
for (int i = 0; i < items.Length; i++)
{
    decimal sum = counts[i] * prices[i];
    total += sum;
    report.AppendLine($"│{items[i],-20}│{counts[i],6}│{sum,11:N2}│");
}

report.AppendLine("├────────────────────┴──────┼───────────┤");
report.AppendLine($"│{"Разом",-27}│{total,11:N2}│");
report.Append("└───────────────────────────┴───────────┘");
Console.WriteLine(report);

// Порівняння швидкості: 20 000 додавань рядка.
const int N = 20_000;
var watch = Stopwatch.StartNew();
string text = "";
for (int i = 0; i < N; i++)
{
    text += "x";
}
watch.Stop();
long concatMs = watch.ElapsedMilliseconds;

watch.Restart();
var builder = new StringBuilder();
for (int i = 0; i < N; i++)
{
    builder.Append('x');
}
string built = builder.ToString();
watch.Stop();

Console.WriteLine($"Конкатенація:  {concatMs} мс");
Console.WriteLine($"StringBuilder: {watch.ElapsedMilliseconds} мс");
Console.WriteLine($"Однакові рядки: {text == built}");
```

Три паралельні масиви `items`, `counts`, `prices` описують товари: елементи з однаковим індексом належать одному товару (у темі 7 такі дані об’єднують у клас). Клас `Stopwatch` вимірює час. Результат (час залежить від комп’ютера):

```
┌────────────────────┬──────┬───────────┐
│Товар               │ К-сть│       Сума│
├────────────────────┼──────┼───────────┤
│Клавіатура          │     3│   3 750,00│
│Миша                │     5│   2 400,00│
│Монітор 27"         │     2│  19 998,00│
│Навушники           │     4│   5 198,00│
├────────────────────┴──────┼───────────┤
│Разом                      │  31 346,00│
└───────────────────────────┴───────────┘
Конкатенація:  29 мс
StringBuilder: 0 мс
Однакові рядки: True
```

## Типові помилки

У табл. 4.3 наведено помилки, яких найчастіше припускаються під час роботи з масивами та рядками.

Таблиця 4.3. Типові помилки під час роботи з масивами та рядками {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| `IndexOutOfRangeException` | умова `i <= a.Length` або індекс −1; цикл до `i < a.Length`, останній елемент – `a[^1]` |
| зміна «копії» змінює оригінал | `b = a` копіює посилання; копію створюють `Clone`, `a[..]` або `Array.Copy` |
| `NullReferenceException` для `j[i][k]` | рядок зубчастого масиву не створено; спочатку `j[i] = new int[n]` |
| рядок не змінився після `s.Replace(…)` | методи рядків повертають новий рядок; `s = s.Replace(…)` |
| виведено `System.Int32[]` | `Console.WriteLine(a)` не виводить елементи; `string.Join(", ", a)` |
| порожні елементи після `Split` | кілька роздільників поспіль; опція `RemoveEmptyEntries` |
| `"Лондон" == "лондон"` дає `False` | порівняння враховує регістр; `StringComparison.OrdinalIgnoreCase` |
| програма повільно збирає великий рядок | `+=` у циклі щоразу копіює весь рядок; `StringBuilder` |
| `BinarySearch` дає неправильний результат | масив не відсортовано; спочатку `Array.Sort` |
