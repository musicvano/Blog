---
title: "Examples and common mistakes"
description: "Topic 18. Testing and refactoring: Examples and common mistakes"
outline: [2, 3]
sourceHash: "06d9a9ce4d32e6a507950f0a294c97720dd046b54044dfe5fa1acf83e947b6e0"
---

# Examples and common mistakes

## Example programs

All the examples are placed in the `Shop` solution: the classes in the `Shop.Core` library and the tests in the `Shop.Tests` project.

### Calculator tests

The `Calculator` class adds integers with overflow checking and divides floating-point numbers with a check of the divisor.

```cs
namespace Shop.Core;

public class Calculator
{
    public int Add(int a, int b) => checked(a + b);

    public double Divide(double a, double b)
    {
        if (b == 0)
        {
            throw new DivideByZeroException("the divisor is 0");
        }
        return a / b;
    }
}
```

```cs
using Shop.Core;

namespace Shop.Tests;

[TestClass]
public sealed class CalculatorTests
{
    private readonly Calculator calculator = new();

    [TestMethod]
    public void Add_TwoPositiveNumbers_ReturnsSum()
    {
        // Arrange
        int a = 2, b = 3;

        // Act
        int result = calculator.Add(a, b);

        // Assert
        Assert.AreEqual(5, result);
    }

    [TestMethod]
    [DataRow(0, 0, 0)]
    [DataRow(-5, 5, 0)]
    [DataRow(int.MaxValue - 1, 1, int.MaxValue)]
    public void Add_BoundaryValues_ReturnsSum(
        int a, int b, int expected) =>
        Assert.AreEqual(expected, calculator.Add(a, b));

    [TestMethod]
    public void Add_Overflow_Throws() =>
        Assert.ThrowsExactly<OverflowException>(
            () => calculator.Add(int.MaxValue, 1));

    [TestMethod]
    public void Divide_OneByThree_ReturnsApproximately()
    {
        double result = calculator.Divide(1, 3);
        Assert.AreEqual(0.3333, result, delta: 0.0001);
    }

    [TestMethod]
    public void Divide_ByZero_ThrowsWithMessage()
    {
        var e = Assert.ThrowsExactly<DivideByZeroException>(
            () => calculator.Divide(1, 0));
        StringAssert.Contains(e.Message, "0");
    }
}
```

The `calculator` field is created anew for each test because MSTest creates a new object of the test class before each test. The parameterized test checks zero, opposite numbers, and the boundary value `int.MaxValue`, and a separate test checks overflow. A tolerance is used for the division 1/3, and for division by zero, the type and message of the exception are checked. Test Explorer shows the `[DataRow]` test as three separate tests, so there are 7 in total. The output of `dotnet test` (the summary line is split in two):

```
Passed!  - Failed:     0, Passed:     7, Skipped:     0,
Total:     7, Duration: 22 ms - Shop.Tests.dll (net10.0)
```

### A shopping cart with a fake price provider

The `Cart` class gets prices through the `IPriceProvider` interface. In the tests, a fake with a dictionary is used instead of a real source of prices.

```cs
namespace Shop.Core;

// A dependency that a fake replaces in tests.
public interface IPriceProvider
{
    decimal GetPrice(string sku);
}

public class Cart(IPriceProvider prices)
{
    private readonly Dictionary<string, int> items = [];

    public void Add(string sku, int quantity)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(quantity);
        items[sku] = items.GetValueOrDefault(sku) + quantity;
    }

    // A 10% discount on a total of 1000 UAH or more.
    public decimal Total
    {
        get
        {
            decimal sum = 0;
            foreach (var (sku, quantity) in items)
            {
                sum += prices.GetPrice(sku) * quantity;
            }
            return sum >= 1000m ? sum * 0.9m : sum;
        }
    }
}
```

```cs
using Shop.Core;

namespace Shop.Tests;

[TestClass]
public sealed class CartTests
{
    // A fake: fixed prices without a database or network.
    private sealed class FakePriceProvider : IPriceProvider
    {
        private readonly Dictionary<string, decimal> prices = new()
        {
            ["pen"] = 25m,
            ["book"] = 450m,
        };

        public int Calls { get; private set; }

        public decimal GetPrice(string sku)
        {
            Calls++;
            return prices[sku];
        }
    }

    [TestMethod]
    public void Total_EmptyCart_IsZero()
    {
        Cart cart = new(new FakePriceProvider());
        Assert.AreEqual(0m, cart.Total);
    }

    [TestMethod]
    public void Total_BelowThreshold_NoDiscount()
    {
        Cart cart = new(new FakePriceProvider());
        cart.Add("book", 2);
        cart.Add("pen", 2);

        Assert.AreEqual(950m, cart.Total);
    }

    [TestMethod]
    public void Total_AtThreshold_TenPercentDiscount()
    {
        Cart cart = new(new FakePriceProvider());
        cart.Add("book", 2);
        cart.Add("pen", 4);                 // exactly 1000

        Assert.AreEqual(900m, cart.Total);
    }

    [TestMethod]
    public void Add_SameSkuTwice_AsksPriceOnce()
    {
        FakePriceProvider fake = new();
        Cart cart = new(fake);
        cart.Add("pen", 1);
        cart.Add("pen", 3);

        Assert.AreEqual(100m, cart.Total);
        Assert.AreEqual(1, fake.Calls);
    }

    [TestMethod]
    [DataRow(0)]
    [DataRow(-1)]
    public void Add_NonPositiveQuantity_Throws(int quantity)
    {
        Cart cart = new(new FakePriceProvider());
        Assert.ThrowsExactly<ArgumentOutOfRangeException>(
            () => cart.Add("pen", quantity));
    }
}
```

The fake is declared as a nested private class of the tests: it is needed only here. The tests check an empty cart, a total below the discount threshold, exactly at the threshold (a boundary value), and an invalid quantity. The `Add_SameSkuTwice_AsksPriceOnce` test uses the fake’s call counter, as a mock would: the same product is stored as a single line item, so the price is requested once. All 6 tests pass.

### TDD: converting to Roman numerals

The tests were added gradually; each new `[DataRow]` line required a new implementation step.

```cs
using Shop.Core;

namespace Shop.Tests;

[TestClass]
public sealed class RomanNumeralsTests
{
    // The order in which the tests were added during TDD.
    [TestMethod]
    [DataRow(1, "I")]          // 1: the simplest case
    [DataRow(3, "III")]        // 2: repeating a symbol
    [DataRow(5, "V")]          // 3: a new symbol
    [DataRow(4, "IV")]         // 4: subtraction
    [DataRow(9, "IX")]
    [DataRow(14, "XIV")]       // 5: combinations
    [DataRow(40, "XL")]
    [DataRow(1994, "MCMXCIV")] // 6: all the rules together
    [DataRow(3999, "MMMCMXCIX")]
    public void ToRoman_ValidNumber_ReturnsRoman(
        int number, string expected)
    {
        Assert.AreEqual(expected, RomanNumerals.ToRoman(number));
    }

    [TestMethod]
    [DataRow(0)]
    [DataRow(-7)]
    [DataRow(4000)]
    public void ToRoman_OutOfRange_Throws(int number)
    {
        Assert.ThrowsExactly<ArgumentOutOfRangeException>(
            () => RomanNumerals.ToRoman(number));
    }
}
```

The TDD steps: the test for 1 passes with `return "I"`; the test for 3 requires a loop; the test for 5 requires a table of symbols; the test for 4 requires pairs such as `IV`, which reduces everything to a single table of values. After each “green” step, the code was simplified. The final implementation:

```cs
using System.Text;

namespace Shop.Core;

public static class RomanNumerals
{
    private static readonly (int Value, string Symbol)[] Table =
    [
        (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
        (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),
        (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I"),
    ];

    public static string ToRoman(int number)
    {
        ArgumentOutOfRangeException.ThrowIfLessThan(number, 1);
        ArgumentOutOfRangeException.ThrowIfGreaterThan(number, 3999);

        StringBuilder result = new();
        foreach (var (value, symbol) in Table)
        {
            while (number >= value)
            {
                result.Append(symbol);
                number -= value;
            }
        }
        return result.ToString();
    }
}
```

The table from larger values to smaller ones handles all the rules in the same way, and the range check appeared after the `ToRoman_OutOfRange_Throws` tests. All 12 tests pass.

### Refactoring a payroll calculation

The given method calculates the net pay of an hourly or salaried employee, taking into account overtime, a seniority bonus, and taxes.

```cs
namespace Shop.Core;

// Before refactoring: a long method, magic numbers, duplication.
public static class PayrollOld
{
    public static decimal Calc(
        string type, decimal rate, int hours, int years)
    {
        decimal pay = 0;
        if (type == "hourly")
        {
            if (hours > 160)
            {
                pay = 160 * rate + (hours - 160) * rate * 1.5m;
            }
            else
            {
                pay = hours * rate;
            }
            if (years >= 5) pay = pay + pay * 0.1m;
        }
        else if (type == "salary")
        {
            pay = rate;
            if (years >= 5) pay = pay + pay * 0.1m;
        }
        pay = pay - pay * 0.195m;
        return Math.Round(pay, 2);
    }
}
```

The method has “smells”: the magic numbers 160, 1.5, 0.1, and 0.195, a duplicated seniority bonus, a string employee type, and the unclear name `Calc`. First, characterization tests capture the current results, including for an unknown type, which returns 0:

```cs
using Shop.Core;

namespace Shop.Tests;

[TestClass]
public sealed class PayrollTests
{
    // Characterization tests capture the behavior of the old code.
    [TestMethod]
    [DataRow("hourly", 200, 120, 1, 19320.00)]
    [DataRow("hourly", 200, 160, 5, 28336.00)]
    [DataRow("hourly", 200, 180, 2, 30590.00)]
    [DataRow("salary", 30000, 0, 7, 26565.00)]
    [DataRow("salary", 30000, 0, 4, 24150.00)]
    [DataRow("unknown", 30000, 100, 1, 0.00)]
    public void Old_KnownCases(
        string type, double rate, int hours, int years,
        double expected)
    {
        decimal pay =
            PayrollOld.Calc(type, (decimal)rate, hours, years);
        Assert.AreEqual((decimal)expected, pay);
    }

    // The same set for the new code: the behavior has not changed.
    [TestMethod]
    [DataRow(PayType.Hourly, 200, 120, 1, 19320.00)]
    [DataRow(PayType.Hourly, 200, 160, 5, 28336.00)]
    [DataRow(PayType.Hourly, 200, 180, 2, 30590.00)]
    [DataRow(PayType.Salary, 30000, 0, 7, 26565.00)]
    [DataRow(PayType.Salary, 30000, 0, 4, 24150.00)]
    public void New_SameResults(
        PayType type, double rate, int hours, int years,
        double expected)
    {
        decimal pay =
            Payroll.NetPay(type, (decimal)rate, hours, years);
        Assert.AreEqual((decimal)expected, pay);
    }
}
```

After the Rename, Introduce Constant, and Extract Method steps and replacing the string with an enumeration, we get:

```cs
namespace Shop.Core;

public enum PayType { Hourly, Salary }

// After refactoring: constants, separate methods, a single formula.
public static class Payroll
{
    private const int NormHours = 160;
    private const decimal OvertimeFactor = 1.5m;
    private const int LoyaltyYears = 5;
    private const decimal LoyaltyBonus = 0.10m;
    private const decimal TaxRate = 0.195m;   // income tax 18% + military levy 1.5%

    public static decimal NetPay(
        PayType type, decimal rate, int hours, int years)
    {
        decimal gross = type switch
        {
            PayType.Hourly => HourlyPay(rate, hours),
            PayType.Salary => rate,
            _ => throw new ArgumentOutOfRangeException(nameof(type)),
        };
        return Math.Round(AfterTax(WithLoyalty(gross, years)), 2);
    }

    private static decimal HourlyPay(decimal rate, int hours)
    {
        int overtime = Math.Max(0, hours - NormHours);
        return (hours - overtime) * rate
            + overtime * rate * OvertimeFactor;
    }

    private static decimal WithLoyalty(decimal pay, int years) =>
        years >= LoyaltyYears ? pay * (1 + LoyaltyBonus) : pay;

    private static decimal AfterTax(decimal pay) =>
        pay * (1 - TaxRate);
}
```

Both sets of tests pass, so the behavior for known types has not changed. An unknown type can no longer be passed: the enumeration turns such a mistake into a compilation error. All 11 tests pass.

## Common mistakes

Table 18.4. Common testing and refactoring mistakes {.caption}

| **Problem** | **Cause and fix** |
| --- | --- |
| the message “Expected:&lt;5&gt;. Actual:&lt;6&gt;” is reversed | in `AreEqual`, the expected value is passed first |
| a test passes or fails depending on the run order | the tests share mutable state; create the data in each test or in `[TestInitialize]` |
| a test fails on another day or on another computer | a dependency on time, culture, or files; use `TimeProvider`, an explicit culture, and doubles |
| `AreEqual` for `double` fails | calculation error; use the `delta` parameter |
| a test checks several things at once | it is unclear what broke; split it into separate tests |
| a test without assertions | it always passes; every test must check a result |
| refactoring changed the behavior | large steps without tests; write characterization tests first, then take small steps |
