---
title: "Практика"
description: "Тема 18. Тестування та рефакторинг: розібрані приклади"
outline: [2, 3]
---

# Практика

Приклади розміщено в тому самому рішенні `Shop`, що й приклади лекції. Для прикладу 2 до тестового проєкту додано пакет `dotnet add Shop.Tests package Microsoft.Extensions.TimeProvider.Testing`.

## Приклад 1. Тести валідатора паролів

Створити клас перевірки надійності пароля, що повертає список порушених правил, і протестувати кожне правило окремим набором даних.

```cs
namespace Shop.Core;

public static class PasswordValidator
{
    public const int MinLength = 8;

    // Повертає список порушених правил; порожній – пароль надійний.
    public static List<string> Validate(string? password)
    {
        List<string> errors = [];
        if (string.IsNullOrEmpty(password))
        {
            errors.Add("порожній пароль");
            return errors;
        }
        if (password.Length < MinLength)
            errors.Add($"менше {MinLength} символів");
        if (!password.Any(char.IsUpper))
            errors.Add("немає великої літери");
        if (!password.Any(char.IsDigit))
            errors.Add("немає цифри");
        if (password.All(char.IsLetterOrDigit))
            errors.Add("немає спеціального символу");
        if (password.Contains(' '))
            errors.Add("містить пробіл");
        return errors;
    }
}
```

```cs
using Shop.Core;

namespace Shop.Tests;

[TestClass]
public sealed class PasswordValidatorTests
{
    [TestMethod]
    [DataRow("Kyiv#2026")]
    [DataRow("Пароль_12")]                  // кирилиця теж літери
    [DataRow("Aa1!aaaa")]                   // рівно 8 символів
    public void Validate_StrongPassword_NoErrors(string password)
    {
        List<string> errors = PasswordValidator.Validate(password);
        Assert.IsEmpty(errors);
    }

    // Кожен рядок порушує рівно одне правило.
    [TestMethod]
    [DataRow("Aa1!aaa", "менше 8 символів")]
    [DataRow("kyiv#2026", "немає великої літери")]
    [DataRow("Kyiv#Lviv", "немає цифри")]
    [DataRow("Kyiv2026", "немає спеціального символу")]
    [DataRow("Kyiv 2026", "містить пробіл")]
    public void Validate_OneRuleBroken_OneError(
        string password, string expected)
    {
        List<string> errors = PasswordValidator.Validate(password);
        CollectionAssert.AreEqual(new[] { expected }, errors);
    }

    [TestMethod]
    [DataRow(null)]
    [DataRow("")]
    public void Validate_NullOrEmpty_SingleError(string? password)
    {
        List<string> errors = PasswordValidator.Validate(password);
        Assert.HasCount(1, errors);
        Assert.AreEqual("порожній пароль", errors[0]);
    }

    [TestMethod]
    public void Validate_WeakPassword_ReportsAllRules()
    {
        List<string> errors = PasswordValidator.Validate("abc");
        Assert.HasCount(4, errors);
        CollectionAssert.Contains(errors, "немає цифри");
    }
}
```

Для кожного правила підібрано пароль, що порушує лише його: так тест точно вказує на зламане правило. Пароль «Aa1!aaaa» містить рівно 8 символів (граничне значення), а «Aa1!aaa» – 7. Тест з кириличним паролем підтверджує, що `char.IsUpper` і `char.IsLetterOrDigit` працюють не лише з латиницею. `[DataRow(null)]` перевіряє обробку `null`. Усього 11 тестів, усі проходять.

## Приклад 2. Сервіс бронювання з керованим часом

Сервіс бронювання дозволяє бронювати кімнату не пізніше ніж за 2 години до початку, а неоплачене бронювання скасовується через 24 години. Протестувати ці правила без очікування реального часу.

```cs
namespace Shop.Core;

public record Booking(
    string Room, DateTimeOffset Start, DateTimeOffset Created)
{
    public bool IsPaid { get; set; }
}

// Час отримується через TimeProvider, а не DateTime.Now.
public class BookingService(TimeProvider time)
{
    public static readonly TimeSpan PaymentWindow =
        TimeSpan.FromHours(24);
    public static readonly TimeSpan MinAdvance =
        TimeSpan.FromHours(2);

    public Booking Create(string room, DateTimeOffset start)
    {
        DateTimeOffset now = time.GetUtcNow();
        if (start - now < MinAdvance)
        {
            throw new InvalidOperationException(
                "бронювати можна щонайменше за 2 години");
        }
        return new Booking(room, start, now);
    }

    // Неоплачене бронювання скасовується через 24 години.
    public bool IsExpired(Booking booking) =>
        !booking.IsPaid
        && time.GetUtcNow() - booking.Created > PaymentWindow;
}
```

```cs
using Microsoft.Extensions.Time.Testing;
using Shop.Core;

namespace Shop.Tests;

[TestClass]
public sealed class BookingServiceTests
{
    private static readonly DateTimeOffset Monday9 =
        new(2026, 9, 14, 9, 0, 0, TimeSpan.Zero);

    private FakeTimeProvider clock = null!;
    private BookingService service = null!;

    [TestInitialize]                         // перед кожним тестом
    public void SetUp()
    {
        clock = new FakeTimeProvider(Monday9);
        service = new BookingService(clock);
    }

    [TestMethod]
    public void Create_TooLate_Throws()
    {
        DateTimeOffset start = Monday9.AddMinutes(90);
        Assert.ThrowsExactly<InvalidOperationException>(
            () => service.Create("A-101", start));
    }

    [TestMethod]
    public void Create_ExactlyTwoHoursAhead_Succeeds()
    {
        Booking booking =
            service.Create("A-101", Monday9.AddHours(2));
        Assert.AreEqual(Monday9, booking.Created);
    }

    [TestMethod]
    public void IsExpired_Unpaid_AfterWindow_True()
    {
        Booking booking = service.Create("A-101", Monday9.AddDays(3));

        clock.Advance(TimeSpan.FromHours(24));     // рівно 24 год
        Assert.IsFalse(service.IsExpired(booking));

        clock.Advance(TimeSpan.FromMinutes(1));    // 24 год 1 хв
        Assert.IsTrue(service.IsExpired(booking));
    }

    [TestMethod]
    public void IsExpired_Paid_NeverExpires()
    {
        Booking booking = service.Create("A-101", Monday9.AddDays(3));
        booking.IsPaid = true;

        clock.Advance(TimeSpan.FromDays(10));
        Assert.IsFalse(service.IsExpired(booking));
    }
}
```

Сервіс отримує `TimeProvider` через конструктор; у програмі передають `TimeProvider.System`. `FakeTimeProvider` починає з понеділка 9:00, а `Advance` переводить час уперед миттєво, тому тест перевіряє межу «рівно 24 години» й «24 години 1 хвилина» без затримок. Метод з атрибутом `[TestInitialize]` створює свіжий годинник і сервіс перед кожним тестом, тому тести незалежні. Усі 4 тести проходять.

## Приклад 3. Рефакторинг звіту продажів

Надано метод формування звіту продажів. Виконати рефакторинг так, щоб звіт не змінився.

```cs
namespace Shop.Core;

// Наданий код: усе в одному методі.
public static class SalesReportOld
{
    public static string Make(string[] lines)
    {
        string r = "";
        decimal t = 0;
        int n = 0;
        for (int i = 0; i < lines.Length; i++)
        {
            string[] p = lines[i].Split(';');
            if (p.Length == 3)
            {
                decimal a = decimal.Parse(p[1]) * int.Parse(p[2]);
                if (a > 5000) a = a - a * 0.03m;
                r += p[0].PadRight(12) + a.ToString("F2").PadLeft(10)
                    + "\n";
                t = t + a;
                n++;
            }
        }
        r += "Разом: " + t.ToString("F2") + " (" + n + " поз.)";
        return r;
    }
}
```

«Запахи» коду: однолітерні назви (`r`, `t`, `n`, `p`, `a`), магічні числа 5000 і 0.03, змішування розбору, розрахунку й форматування в одному методі, склеювання рядків у циклі. Спочатку характеризаційний тест фіксує результат старого методу, потім той самий тест перевіряє новий:

```cs
using System.Globalization;
using Shop.Core;

namespace Shop.Tests;

[TestClass]
public sealed class SalesReportTests
{
    private static readonly string[] Input =
    [
        "Ноутбук;32999,00;1",   // понад 5000 – знижка 3 %
        "Миша;449,50;2",
        "некоректний рядок",
        "Кабель;199;30",        // 5970 – знижка
    ];

    // Очікуваний звіт отримано зі старого коду.
    private const string Expected =
        "Ноутбук       32009,03\n" +
        "Миша            899,00\n" +
        "Кабель         5790,90\n" +
        "Разом: 38698,93 (3 поз.)";

    [ClassInitialize]
    public static void UseUkrainianCulture(TestContext _) =>
        CultureInfo.CurrentCulture = new CultureInfo("uk-UA");

    [TestMethod]
    public void Old_Report_MatchesSnapshot() =>
        Assert.AreEqual(Expected, SalesReportOld.Make(Input));

    [TestMethod]
    public void New_Report_SameAsOld() =>
        Assert.AreEqual(
            SalesReportOld.Make(Input), SalesReport.Make(Input));

    [TestMethod]
    public void New_EmptyInput_OnlyTotal() =>
        Assert.AreEqual("Разом: 0,00 (0 поз.)", SalesReport.Make([]));
}
```

Результат рефакторингу (Rename, Introduce Constant, Extract Method, запис `SaleLine`):

```cs
using System.Text;

namespace Shop.Core;

public record SaleLine(string Product, decimal Amount);

// Після рефакторингу: розбір, розрахунок і форматування окремо.
public static class SalesReport
{
    private const decimal BulkThreshold = 5000m;
    private const decimal BulkDiscount = 0.03m;

    public static string Make(string[] lines)
    {
        List<SaleLine> sales = Parse(lines);
        StringBuilder report = new();
        foreach (SaleLine sale in sales)
        {
            report.Append(FormatLine(sale)).Append('\n');
        }
        decimal total = sales.Sum(s => s.Amount);
        report.Append($"Разом: {total:F2} ({sales.Count} поз.)");
        return report.ToString();
    }

    private static List<SaleLine> Parse(string[] lines)
    {
        List<SaleLine> sales = [];
        foreach (string line in lines)
        {
            string[] fields = line.Split(';');
            if (fields.Length != 3)
            {
                continue;                     // як і раніше: пропуск
            }
            decimal price = decimal.Parse(fields[1]);
            int quantity = int.Parse(fields[2]);
            decimal amount = ApplyDiscount(price * quantity);
            sales.Add(new SaleLine(fields[0], amount));
        }
        return sales;
    }

    private static decimal ApplyDiscount(decimal amount) =>
        amount > BulkThreshold ? amount * (1 - BulkDiscount) : amount;

    private static string FormatLine(SaleLine sale) =>
        $"{sale.Product,-12}{sale.Amount,10:F2}";
}
```

Методи `decimal.Parse` і `ToString("F2")` залежать від культури, тому `[ClassInitialize]` явно встановлює `uk-UA`: без цього тест дав би інший результат на комп’ютері з англійськими налаштуваннями. Усі 3 тести проходять, отже поведінку збережено. Результат `dotnet test` для всього рішення:

```
Passed!  - Failed:     0, Passed:    54, Skipped:     0,
Total:    54, Duration: 42 ms - Shop.Tests.dll (net10.0)
```
