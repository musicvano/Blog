---
title: "Практика"
description: "Тема 5. Методи, параметри, рекурсія: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Обмін значень і впорядкування трьох чисел

Написати програму, яка зчитує три цілі числа та впорядковує їх за зростанням за допомогою методу `Swap`, що міняє місцями значення двох змінних, і виводить кількість виконаних обмінів.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine("Введіть три цілі числа через пробіл:");
string[] parts = (Console.ReadLine() ?? "").Split(' ',
    StringSplitOptions.RemoveEmptyEntries);

if (parts.Length != 3
    || !int.TryParse(parts[0], out int a)
    || !int.TryParse(parts[1], out int b)
    || !int.TryParse(parts[2], out int c))
{
    Console.WriteLine("Потрібно рівно три цілі числа.");
    return;
}

int swaps = SortThree(ref a, ref b, ref c);
Console.WriteLine($"За зростанням: {a} {b} {c}");
Console.WriteLine($"Обмінів: {swaps}");

// Упорядковує три змінні викликача; повертає кількість обмінів.
static int SortThree(ref int x, ref int y, ref int z)
{
    int count = 0;
    if (x > y) { Swap(ref x, ref y); count++; }
    if (y > z) { Swap(ref y, ref z); count++; }
    if (x > y) { Swap(ref x, ref y); count++; }
    return count;
}

// Міняє місцями значення двох змінних викликача.
static void Swap(ref int first, ref int second)
{
    int temp = first;
    first = second;
    second = temp;
}
```

Метод `Swap` має працювати зі змінними викликача, тому обидва параметри передаються за посиланням (`ref`). Метод `SortThree` також отримує змінні за посиланням і передає їх далі в `Swap`. Три порівняння сусідніх пар гарантують правильний порядок: після перших двох найбільше число опиняється в `z`, а третє порівняння впорядковує `x` і `y`. Для стислості тіла умов записано в одному рядку. Результати для різних наборів чисел:

```
Введіть три цілі числа через пробіл:
9 -4 7
За зростанням: -4 7 9
Обмінів: 2
```

```
Введіть три цілі числа через пробіл:
3 2 1
За зростанням: 1 2 3
Обмінів: 3
```

## Приклад 2. Перевантажені методи форматування

Створити статичний клас `Formatter` з перевантаженими методами `Format` для дати, грошової суми та частки у відсотках з необов’язковими параметрами та продемонструвати виклики з іменованими аргументами.

```cs
using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

var date = new DateTime(2026, 9, 1);
Console.WriteLine(Formatter.Format(date));
Console.WriteLine(Formatter.Format(date, withWeekday: true));
Console.WriteLine(Formatter.Format(1299.5m));
Console.WriteLine(Formatter.Format(49.99m, currency: "$"));
Console.WriteLine(Formatter.Format(0.157));
Console.WriteLine(Formatter.Format(-0.0345, decimals: 2,
    showSign: true));
Console.WriteLine(Formatter.Format(fraction: 0.5, showSign: true));

static class Formatter
{
    static readonly CultureInfo Ukrainian = new("uk-UA");

    // Дата: «01.09.2026» або «вівторок, 01.09.2026».
    public static string Format(DateTime value,
        bool withWeekday = false)
    {
        string text = value.ToString("dd.MM.yyyy");
        return withWeekday
            ? $"{value.ToString("dddd", Ukrainian)}, {text}"
            : text;
    }

    // Гроші: групи розрядів, два знаки після коми, валюта.
    public static string Format(decimal amount,
        string currency = "грн") =>
        $"{amount.ToString("N2", Ukrainian)} {currency}";

    // Частка як відсоток: 0.157 → «15,7 %».
    public static string Format(double fraction, int decimals = 1,
        bool showSign = false)
    {
        string number = (fraction * 100).ToString("F" + decimals,
            Ukrainian);
        string sign = showSign && fraction > 0 ? "+" : "";
        return $"{sign}{number} %";
    }
}
```

Компілятор обирає перевантаження за типом першого аргументу: `DateTime`, `decimal` (суфікс `m`) або `double`. Якби викликати `Formatter.Format(5)`, виникла б помилка CS0121: ціле число однаково добре перетворюється на `decimal` і `double`. Іменовані аргументи `withWeekday: true` і `showSign: true` пояснюють зміст логічних значень, а останній виклик змінює порядок аргументів. Поле `Ukrainian` задає українську культуру, тому назва дня тижня та роздільники не залежать від налаштувань комп’ютера. Результат:

```
01.09.2026
вівторок, 01.09.2026
1 299,50 грн
49,99 $
15,7 %
-3,45 %
+50,0 %
```

## Приклад 3. Рекурсивна сума цифр і перевірка паліндрома

Написати програму з рекурсивними методами, яка для введеного числа обчислює суму цифр і цифровий корінь (сума цифр повторюється, доки не залишиться одна цифра), а для введеної фрази перевіряє, чи є вона паліндромом без урахування регістру, пробілів і розділових знаків.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

Console.Write("Натуральне число: ");
if (long.TryParse(Console.ReadLine(), out long number)
    && number >= 0)
{
    int sum = DigitSum(number);
    Console.WriteLine($"Сума цифр: {sum}");
    Console.WriteLine($"Цифровий корінь: {DigitalRoot(number)}");
}
else
{
    Console.WriteLine("Потрібне невід’ємне ціле число.");
}

Console.Write("Фраза: ");
string phrase = Console.ReadLine() ?? "";
string letters = OnlyLetters(phrase);
string verdict = IsPalindrome(letters, 0, letters.Length - 1)
    ? "паліндром"
    : "не паліндром";
Console.WriteLine($"«{phrase}» – {verdict}");

// Сума цифр: остання цифра + сума цифр решти числа.
static int DigitSum(long n) =>
    n < 10 ? (int)n : (int)(n % 10) + DigitSum(n / 10);

// Сума цифр, доки не залишиться одна цифра.
static int DigitalRoot(long n)
{
    int sum = DigitSum(n);
    return sum < 10 ? sum : DigitalRoot(sum);
}

// Порівнює крайні символи і переходить до внутрішньої частини.
static bool IsPalindrome(string s, int left, int right)
{
    if (left >= right)
    {
        return true;                      // 0 або 1 символ
    }
    if (s[left] != s[right])
    {
        return false;
    }
    return IsPalindrome(s, left + 1, right - 1);
}

// Малі літери без пробілів, розділових знаків і апострофів.
static string OnlyLetters(string text)
{
    var sb = new System.Text.StringBuilder();
    foreach (char c in text)
    {
        if (char.IsLetter(c))
        {
            sb.Append(char.ToLower(c));
        }
    }
    return sb.ToString();
}
```

Метод `DigitSum` зводить задачу до меншого числа `n / 10`; базовий випадок – одноцифрове число. `DigitalRoot` викликає сам себе, доки сума не стане одноцифровою. Метод `IsPalindrome` порівнює крайні символи й рекурсивно перевіряє внутрішню частину рядка, передаючи межі `left` і `right` замість створення нових рядків; базовий випадок – фрагмент з одного символу або порожній. Результати:

```
Натуральне число: 9876543210
Сума цифр: 45
Цифровий корінь: 9
Фраза: А результатів? Вітать лузера!
«А результатів? Вітать лузера!» – паліндром
```

```
Натуральне число: 2026
Сума цифр: 10
Цифровий корінь: 1
Фраза: Привіт
«Привіт» – не паліндром
```
