---
title: "Практика"
description: "Тема 2. Регулярні вирази: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Сума чека

Написати програму, яка читає текстовий файл фіскального чека, знаходить позиції товарів (назва, кількість, ціна, сума), перевіряє суму кожної позиції, враховує знижки та порівнює обчислений підсумок із рядком «РАЗОМ». Суми записано в українському форматі: кома як десятковий роздільник і пробіл між групами розрядів. Файл `receipt.txt`:

```
Фіскальний чек № 004512            17.09.2026 18:42
Хліб житній           1 x 32,50          32,50 грн
Молоко 2,5 %          2 x 41,90          83,80 грн
Сир твердий       0,356 x 489,00        174,80 грн
Кава зернова      1 x 1 249,00        1 249,00 грн
Яблука            1,25 x 38,90          48,63 грн
Знижка за карткою                      -50,00 грн
РАЗОМ                                1 538,01 грн
```

```cs
using System.Globalization;
using System.Text.RegularExpressions;

Console.OutputEncoding = System.Text.Encoding.UTF8;
var uk = CultureInfo.GetCultureInfo("uk-UA");

// Сума з копійками: 32,50, 1 249,00 або -50,00.
const string Money = @"-?\d{1,3}(?:[ \xA0]\d{3})*,\d{2}";
var item = new Regex(
    @"^(?<name>\S.*?)\s+(?<qty>\d+(?:,\d+)?)\s*x\s*" +
    $@"(?<price>{Money})\s+(?<sum>{Money})\s*грн\r?$",
    RegexOptions.Multiline);
var discount = new Regex($@"^Знижка.*?(?<sum>{Money})\s*грн",
    RegexOptions.Multiline | RegexOptions.IgnoreCase);
var total = new Regex($@"^РАЗОМ\s+(?<sum>{Money})\s*грн",
    RegexOptions.Multiline);

decimal ToDecimal(Group g) =>
    decimal.Parse(Regex.Replace(g.Value, @"\s", ""), uk);

string text = File.ReadAllText("receipt.txt");
decimal itemsSum = 0;
Console.WriteLine($"{"Товар",-14}{"К-сть",6}{"Ціна",10}{"Сума",10}");
foreach (Match m in item.Matches(text))
{
    decimal qty = ToDecimal(m.Groups["qty"]);
    decimal price = ToDecimal(m.Groups["price"]);
    decimal sum = ToDecimal(m.Groups["sum"]);
    decimal expected = Math.Round(qty * price, 2,
        MidpointRounding.AwayFromZero);
    itemsSum += expected;
    string note = sum == expected ? "" : $"  має бути {expected:N2}";
    Console.WriteLine($"{m.Groups["name"].Value,-14}{qty,6}" +
        $"{price,10:N2}{sum,10:N2}{note}");
}

decimal discounts = discount.Matches(text)
    .Sum(m => ToDecimal(m.Groups["sum"]));
decimal toPay = itemsSum + discounts;
Console.WriteLine($"Сума позицій: {itemsSum,10:N2} грн");
Console.WriteLine($"Знижки:       {discounts,10:N2} грн");
Console.WriteLine($"До сплати:    {toPay,10:N2} грн");

Match totalMatch = total.Match(text);
if (!totalMatch.Success)
    Console.WriteLine("Рядок РАЗОМ не знайдено.");
else if (ToDecimal(totalMatch.Groups["sum"]) == toPay)
    Console.WriteLine("Підсумок чека правильний.");
else
    Console.WriteLine($"Підсумок у чеку {totalMatch.Groups["sum"]} " +
        "не збігається.");
```

Шаблон грошової суми `Money` оголошено один раз і вставлено в три інші шаблони за допомогою інтерпольованих рядків. Роздільником розрядів може бути пробіл або нерозривний пробіл `\xA0` (його .NET виводить для культури `uk-UA`). Перед перетворенням у `decimal` пробіли видаляються, а рядок розбирається з культурою `uk-UA` незалежно від налаштувань комп’ютера. Лінивий квантифікатор `.*?` завершує назву товару там, де починається кількість із символом `x`, тому назва «Молоко 2,5 %» не плутає програму. Очікувана сума позиції округлюється до копійок від нуля (`MidpointRounding.AwayFromZero`), як на касі: 1,25 · 38,90 = 48,625 → 48,63. Результат:

```
Товар          К-сть      Ціна      Сума
Хліб житній        1     32,50     32,50
Молоко 2,5 %       2     41,90     83,80
Сир твердий    0,356    489,00    174,80  має бути 174,08
Кава зернова       1  1 249,00  1 249,00
Яблука          1,25     38,90     48,63
Сума позицій:   1 588,01 грн
Знижки:           -50,00 грн
До сплати:      1 538,01 грн
Підсумок чека правильний.
```

Програма виявила помилку в третій позиції: 0,356 · 489,00 = 174,084 ≈ 174,08, а в чеку надруковано 174,80. Підсумок обчислюється з правильних сум, тому він збігається з рядком «РАЗОМ».

## Приклад 2. Надійність пароля

Написати програму, яка запитує логін і пароль, перевіряє пароль за вісьмома правилами та для кожного правила виводить, виконано його чи ні. Пароль вважається надійним, якщо виконано всі правила, і середнім – якщо шість або сім.

```cs
using System.Text.RegularExpressions;

Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

Console.Write("Логін: ");
string login = (Console.ReadLine() ?? "").Trim();
if (login.Length == 0)
{
    Console.WriteLine("Логін не може бути порожнім.");
    return;
}
Console.Write("Пароль: ");
string password = Console.ReadLine() ?? "";

// Кожне правило – перегляд уперед від початку рядка.
string loginPattern = Regex.Escape(login);
(string Pattern, string Message)[] rules =
{
    (@"^(?=.{12,})", "щонайменше 12 символів"),
    (@"^(?=.*\p{Lu})", "велика літера"),
    (@"^(?=.*\p{Ll})", "мала літера"),
    (@"^(?=.*\d)", "цифра"),
    (@"^(?=.*[^\p{L}\d\s])", "спеціальний символ"),
    (@"^(?!.*\s)", "без пробілів"),
    (@"^(?!.*(.)\1\1)", "без трьох однакових символів поспіль"),
    ($"^(?!.*(?i:{loginPattern}))", "без логіна (будь-який регістр)"),
};

int passed = 0;
foreach (var (pattern, message) in rules)
{
    bool ok = Regex.IsMatch(password, pattern);
    Console.WriteLine($"  [{(ok ? "+" : " ")}] {message}");
    if (ok)
        passed++;
}

string level = passed switch
{
    8 => "надійний",
    >= 6 => "середній",
    _ => "слабкий",
};
Console.WriteLine($"Виконано правил: {passed} з {rules.Length}, " +
    $"пароль {level}");
```

Кожне правило – окремий шаблон із переглядом уперед (`(?=…)`) або негативним переглядом (`(?!…)`) від початку рядка. Завдяки цьому одне й те саме правило можна використати і окремо (для повідомлення), і в складеному шаблоні з кількома умовами. Правило `(.)\1\1` зі зворотним посиланням знаходить три однакові символи поспіль. Логін користувача потрапляє в шаблон лише через `Regex.Escape`: логін `ivan.k` без екранування означав би «ivan, будь-який символ, k». Вбудована опція `(?i:…)` вмикає нечутливість до регістру **лише** для логіна: якщо передати `RegexOptions.IgnoreCase` для всіх правил, класи `\p{Lu}` і `\p{Ll}` почали б відповідати будь-якій літері. Результат запуску:

```
Логін: olena
Пароль: OLENA_2026!!!
  [+] щонайменше 12 символів
  [+] велика літера
  [ ] мала літера
  [+] цифра
  [+] спеціальний символ
  [+] без пробілів
  [ ] без трьох однакових символів поспіль
  [ ] без логіна (будь-який регістр)
Виконано правил: 5 з 8, пароль слабкий
```

Для логіна `ivan.k` і пароля `Kvitka_2026#Lviv` виконуються всі правила, і програма виводить `Виконано правил: 8 з 8, пароль надійний`.

## Приклад 3. Маскування номерів карток у файлі

Написати застосунок, який читає текстовий файл (перший аргумент командного рядка), замінює в ньому номери платіжних карток на маску, що залишає лише чотири останні цифри, і записує результат у другий файл. Номером картки вважається послідовність із 13–19 цифр (з пробілами або дефісами між ними), яка проходить перевірку алгоритмом Луна. Логіку маскування покрити модульними тестами xUnit.

Рішення `CardMasking` створюється командами dotnet CLI так само, як рішення `Contacts` у теоретичних відомостях, і складається з трьох проєктів: бібліотеки `CardMasking.Core` (`classlib`), консольного застосунку `CardMasker` (`console`, посилається на бібліотеку) і тестового проєкту `CardMasking.Tests` (`xunit3 -f net10.0`, посилається на бібліотеку). Файл `CardMasking.Core/CardMasker.cs`:

```cs
using System.Text.RegularExpressions;

namespace CardMasking.Core;

public static partial class CardMasker
{
    // 13–19 цифр, між цифрами – не більше одного пробілу чи дефіса.
    // Тайм-аут 500 мс захищає від дуже довгих рядків.
    [GeneratedRegex(@"(?<!\d)\d(?:[ -]?\d){12,18}(?!\d)",
        RegexOptions.None, matchTimeoutMilliseconds: 500)]
    private static partial Regex CardNumber { get; }

    public static string Mask(string text, out int masked)
    {
        int count = 0;
        string result = CardNumber.Replace(text, match =>
        {
            string digits = Regex.Replace(match.Value, @"\D", "");
            if (!IsLuhnValid(digits))
                return match.Value;        // не номер картки
            count++;
            return MaskDigits(match.Value, keep: 4);
        });
        masked = count;
        return result;
    }

    // Цифри, крім останніх keep, замінює на *; роздільники лишає.
    private static string MaskDigits(string value, int keep)
    {
        int toMask = value.Count(char.IsAsciiDigit) - keep;
        return Regex.Replace(value, @"\d",
            d => toMask-- > 0 ? "*" : d.Value);
    }

    // Алгоритм Луна: контрольна сума номерів платіжних карток.
    public static bool IsLuhnValid(string digits)
    {
        int sum = 0;
        for (int i = 0; i < digits.Length; i++)
        {
            int d = digits[digits.Length - 1 - i] - '0';
            if (i % 2 == 1)
            {
                d *= 2;
                if (d > 9)
                    d -= 9;
            }
            sum += d;
        }
        return sum % 10 == 0;
    }
}
```

Шаблон картки оголошено `partial`-властивістю з атрибутом `[GeneratedRegex]` і тайм-аутом 500 мс. Перегляди `(?<!\d)` і `(?!\d)` не дозволяють «вирізати» 16 цифр із довшого числа, наприклад номера рахунку. Регулярний вираз перевіряє лише форму, тому кожен збіг додатково перевіряється за алгоритмом Луна в `MatchEvaluator`: якщо контрольна сума неправильна, метод повертає збіг без змін. Маска створюється ще однією заміною `\d` з лямбда-виразом, який лічить цифри, тому пробіли й дефіси залишаються на своїх місцях.

Файл `CardMasker/Program.cs`:

```cs
using System.Text.RegularExpressions;
using CardMasking.Core;

Console.OutputEncoding = System.Text.Encoding.UTF8;

if (args.Length != 2)
{
    Console.Error.WriteLine(
        "Використання: CardMasker <вхідний файл> <вихідний файл>");
    return 2;
}

try
{
    int total = 0, lineNumber = 0;
    using var writer = new StreamWriter(args[1]);
    foreach (string line in File.ReadLines(args[0]))
    {
        lineNumber++;
        string masked = CardMasker.Mask(line, out int count);
        writer.WriteLine(masked);
        if (count > 0)
            Console.WriteLine($"Рядок {lineNumber}: номерів {count}");
        total += count;
    }
    Console.WriteLine($"Усього замасковано номерів: {total}");
    return 0;
}
catch (RegexMatchTimeoutException ex)
{
    Console.Error.WriteLine($"Тайм-аут пошуку: {ex.MatchTimeout}");
    return 1;
}
catch (IOException ex)
{
    Console.Error.WriteLine($"Помилка файлу: {ex.Message}");
    return 1;
}
```

Застосунок повертає код 0 у разі успіху, 1 – у разі помилки файлу або тайм-ауту, 2 – якщо аргументи неправильні; повідомлення про помилки виводяться в потік помилок `Console.Error`. Вхідний файл `payments.txt`:

```
17.09 Оплата 4111 1111 1111 1111 – 1 250,00 грн
17.09 Повернення на картку 5500-0000-0000-0004
18.09 Договір 4111 1111 1111 1112, тел. +380671234567
```

Запуск `dotnet run -- payments.txt masked.txt` у папці `CardMasker` виводить рядки `Рядок 1: номерів 1`, `Рядок 2: номерів 1`, `Усього замасковано номерів: 2` і створює файл `masked.txt`, у якому третій рядок не змінився: номер `4111 1111 1111 1112` не проходить перевірку Луна, а телефон має лише 12 цифр:

```
17.09 Оплата **** **** **** 1111 – 1 250,00 грн
17.09 Повернення на картку ****-****-****-0004
18.09 Договір 4111 1111 1111 1112, тел. +380671234567
```

Файл `CardMasking.Tests/CardMaskerTests.cs`:

```cs
using CardMasking.Core;

namespace CardMasking.Tests;

public class CardMaskerTests
{
    [Theory]
    [InlineData("4111111111111111", "************1111")]
    [InlineData("4111 1111 1111 1111", "**** **** **** 1111")]
    [InlineData("5500-0000-0000-0004.", "****-****-****-0004.")]
    public void Mask_ValidCard_KeepsLastFourDigits(
        string input, string expected)
    {
        string actual = CardMasker.Mask(input, out int count);

        Assert.Equal(expected, actual);
        Assert.Equal(1, count);
    }

    [Theory]
    [InlineData("4111 1111 1111 1112")]    // неправильна сума Луна
    [InlineData("тел. +380671234567")]     // лише 12 цифр
    [InlineData("12345678901234567890")]   // 20 цифр
    public void Mask_NotCard_TextUnchanged(string input)
    {
        string actual = CardMasker.Mask(input, out int count);

        Assert.Equal(input, actual);
        Assert.Equal(0, count);
    }

    [Theory]
    [InlineData("79927398713", true)]
    [InlineData("79927398710", false)]
    public void IsLuhnValid_ReturnsExpected(
        string digits, bool expected)
    {
        Assert.Equal(expected, CardMasker.IsLuhnValid(digits));
    }
}
```

Тести перевіряють три правильні номери різного запису, три рядки, які не можна маскувати, і сам алгоритм Луна на відомому прикладі 79927398713. Команда `dotnet test` у папці рішення виводить підсумок `Test run summary: Passed!` з рядками `total: 8`, `failed: 0` і `succeeded: 8`.
