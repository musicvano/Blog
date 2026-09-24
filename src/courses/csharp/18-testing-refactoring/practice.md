---
title: "Practice"
description: "Topic 18. Testing and refactoring: worked examples"
outline: [2, 3]
sourceHash: "c5d3f895120e2c8cc034ecbb698bb393bc690d76464250bc67aff82cb4d4b80a"
---

# Practice

The examples are placed in the same `Shop` solution as the lecture examples. For Example 2, the package is added to the test project with `dotnet add Shop.Tests package Microsoft.Extensions.TimeProvider.Testing`.

## Example 1. Password validator tests

Create a class that checks password strength and returns a list of violated rules, and test each rule with a separate data set.

```cs
namespace Shop.Core;

public static class PasswordValidator
{
    public const int MinLength = 8;

    // Returns a list of violated rules; an empty one means a strong password.
    public static List<string> Validate(string? password)
    {
        List<string> errors = [];
        if (string.IsNullOrEmpty(password))
        {
            errors.Add("empty password");
            return errors;
        }
        if (password.Length < MinLength)
            errors.Add($"fewer than {MinLength} characters");
        if (!password.Any(char.IsUpper))
            errors.Add("no uppercase letter");
        if (!password.Any(char.IsDigit))
            errors.Add("no digit");
        if (password.All(char.IsLetterOrDigit))
            errors.Add("no special character");
        if (password.Contains(' '))
            errors.Add("contains a space");
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
    [DataRow("Κωδικός_12")]                 // Greek letters are letters too
    [DataRow("Aa1!aaaa")]                   // exactly 8 characters
    public void Validate_StrongPassword_NoErrors(string password)
    {
        List<string> errors = PasswordValidator.Validate(password);
        Assert.IsEmpty(errors);
    }

    // Each row violates exactly one rule.
    [TestMethod]
    [DataRow("Aa1!aaa", "fewer than 8 characters")]
    [DataRow("kyiv#2026", "no uppercase letter")]
    [DataRow("Kyiv#Lviv", "no digit")]
    [DataRow("Kyiv2026", "no special character")]
    [DataRow("Kyiv 2026", "contains a space")]
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
        Assert.AreEqual("empty password", errors[0]);
    }

    [TestMethod]
    public void Validate_WeakPassword_ReportsAllRules()
    {
        List<string> errors = PasswordValidator.Validate("abc");
        Assert.HasCount(4, errors);
        CollectionAssert.Contains(errors, "no digit");
    }
}
```

For each rule, a password was chosen that violates only that rule: this way, the test points precisely to the broken rule. The password “Aa1!aaaa” contains exactly 8 characters (a boundary value), and “Aa1!aaa” contains 7. The test with a Greek password confirms that `char.IsUpper` and `char.IsLetterOrDigit` work not only with the Latin alphabet. `[DataRow(null)]` checks the handling of `null`. There are 11 tests in total, and all pass.

## Example 2. A booking service with controlled time

The booking service allows a room to be booked no later than 2 hours before the start, and an unpaid booking is canceled after 24 hours. Test these rules without waiting for real time.

```cs
namespace Shop.Core;

public record Booking(
    string Room, DateTimeOffset Start, DateTimeOffset Created)
{
    public bool IsPaid { get; set; }
}

// Time is obtained through TimeProvider, not DateTime.Now.
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
                "a booking must be made at least 2 hours in advance");
        }
        return new Booking(room, start, now);
    }

    // An unpaid booking is canceled after 24 hours.
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

    [TestInitialize]                         // before each test
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

        clock.Advance(TimeSpan.FromHours(24));     // exactly 24 h
        Assert.IsFalse(service.IsExpired(booking));

        clock.Advance(TimeSpan.FromMinutes(1));    // 24 h 1 min
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

The service receives a `TimeProvider` through its constructor; the program passes `TimeProvider.System`. `FakeTimeProvider` starts on Monday at 9:00, and `Advance` moves time forward instantly, so the test checks the boundaries “exactly 24 hours” and “24 hours and 1 minute” without delays. The method with the `[TestInitialize]` attribute creates a fresh clock and service before each test, so the tests are independent. All 4 tests pass.

## Example 3. Refactoring a sales report

A method that generates a sales report is given. Refactor it so that the report does not change.

```cs
namespace Shop.Core;

// The given code: everything in one method.
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
        r += "Total: " + t.ToString("F2") + " (" + n + " items)";
        return r;
    }
}
```

The code “smells”: one-letter names (`r`, `t`, `n`, `p`, `a`), the magic numbers 5000 and 0.03, mixing parsing, calculation, and formatting in one method, and string concatenation in a loop. First, a characterization test captures the result of the old method, and then the same test checks the new one:

```cs
using System.Globalization;
using Shop.Core;

namespace Shop.Tests;

[TestClass]
public sealed class SalesReportTests
{
    private static readonly string[] Input =
    [
        "Laptop;32999,00;1",    // over 5000 – 3% discount
        "Mouse;449,50;2",
        "invalid line",
        "Cable;199;30",         // 5970 – discount
    ];

    // The expected report was obtained from the old code.
    private const string Expected =
        "Laptop        32009,03\n" +
        "Mouse           899,00\n" +
        "Cable          5790,90\n" +
        "Total: 38698,93 (3 items)";

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
        Assert.AreEqual("Total: 0,00 (0 items)", SalesReport.Make([]));
}
```

The result of the refactoring (Rename, Introduce Constant, Extract Method, a `SaleLine` record):

```cs
using System.Text;

namespace Shop.Core;

public record SaleLine(string Product, decimal Amount);

// After refactoring: parsing, calculation, and formatting are separate.
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
        report.Append($"Total: {total:F2} ({sales.Count} items)");
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
                continue;                     // as before: skip
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

The `decimal.Parse` and `ToString("F2")` methods depend on the culture, so `[ClassInitialize]` explicitly sets `uk-UA`: without it, the test would give a different result on a computer with English settings. All 3 tests pass, so the behavior is preserved. The output of `dotnet test` for the whole solution:

```
Passed!  - Failed:     0, Passed:    54, Skipped:     0,
Total:    54, Duration: 42 ms - Shop.Tests.dll (net10.0)
```
