---
title: "Приклади та типові помилки"
description: "Тема 18. Тестування та рефакторинг: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

Усі приклади розміщено в рішенні `Shop`: класи – у бібліотеці `Shop.Core`, тести – у проєкті `Shop.Tests`.

### Тести калькулятора

Клас `Calculator` додає цілі числа з контролем переповнення й ділить дійсні числа з перевіркою дільника.

```cs
namespace Shop.Core;

public class Calculator
{
    public int Add(int a, int b) => checked(a + b);

    public double Divide(double a, double b)
    {
        if (b == 0)
        {
            throw new DivideByZeroException("дільник дорівнює 0");
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

Поле `calculator` створюється для кожного тесту заново, бо MSTest створює новий об’єкт тестового класу перед кожним тестом. Параметризований тест перевіряє нуль, протилежні числа та граничне значення `int.MaxValue`, а окремий тест – переповнення. Для ділення 1/3 використано допуск, а для ділення на нуль перевірено тип і повідомлення винятку. Test Explorer показує `[DataRow]` як три окремі тести, тому всього їх 7. Результат `dotnet test` (підсумковий рядок розбито на два):

```
Passed!  - Failed:     0, Passed:     7, Skipped:     0,
Total:     7, Duration: 22 ms - Shop.Tests.dll (net10.0)
```

### Кошик із фейковим провайдером цін

Клас `Cart` отримує ціни через інтерфейс `IPriceProvider`. У тестах замість реального джерела цін використовується фейк зі словником.

```cs
namespace Shop.Core;

// Залежність, яку в тестах замінює фейк.
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

    // Знижка 10 % на суму від 1000 грн.
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
    // Фейк: фіксовані ціни без бази даних і мережі.
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
        cart.Add("pen", 4);                 // рівно 1000

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

Фейк оголошено як вкладений закритий клас тестів: він потрібен лише тут. Тести перевіряють порожній кошик, суму нижче порогу знижки, рівно на порозі (граничне значення) і некоректну кількість. Тест `Add_SameSkuTwice_AsksPriceOnce` використовує лічильник викликів фейку, як це робить мок: однаковий товар зберігається однією позицією, тому ціна запитується один раз. Усі 6 тестів проходять.

### TDD: перетворення в римські числа

Тести задавалися поступово, кожен наступний рядок `[DataRow]` вимагав нового кроку реалізації.

```cs
using Shop.Core;

namespace Shop.Tests;

[TestClass]
public sealed class RomanNumeralsTests
{
    // Порядок, у якому тести додавалися під час TDD.
    [TestMethod]
    [DataRow(1, "I")]          // 1: найпростіший випадок
    [DataRow(3, "III")]        // 2: повторення символу
    [DataRow(5, "V")]          // 3: новий символ
    [DataRow(4, "IV")]         // 4: віднімання
    [DataRow(9, "IX")]
    [DataRow(14, "XIV")]       // 5: комбінації
    [DataRow(40, "XL")]
    [DataRow(1994, "MCMXCIV")] // 6: усі правила разом
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

Кроки TDD: тест для 1 проходить з `return "I"`; тест для 3 вимагає циклу; тест для 5 – таблиці символів; тест для 4 – пар на кшталт `IV`, що зводить усе до однієї таблиці значень. Після кожного «зеленого» кроку код спрощувався. Остаточна реалізація:

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

Таблиця від більших значень до менших обробляє всі правила однаково, а перевірка діапазону з’явилася після тестів `ToRoman_OutOfRange_Throws`. Усі 12 тестів проходять.

### Рефакторинг розрахунку зарплати

Наданий метод розраховує чисту зарплату погодинного працівника чи працівника з окладом з урахуванням понаднормових, надбавки за стаж і податків.

```cs
namespace Shop.Core;

// До рефакторингу: довгий метод, магічні числа, дублювання.
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

Метод має «запахи»: магічні числа 160, 1.5, 0.1, 0.195, дублювання надбавки за стаж, рядковий тип працівника, незрозумілу назву `Calc`. Спочатку характеризаційні тести фіксують поточні результати, зокрема для невідомого типу, що повертає 0:

```cs
using Shop.Core;

namespace Shop.Tests;

[TestClass]
public sealed class PayrollTests
{
    // Характеризаційні тести фіксують поведінку старого коду.
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

    // Той самий набір для нового коду: поведінка не змінилася.
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

Після кроків Rename, Introduce Constant, Extract Method і заміни рядка переліченням отримано:

```cs
namespace Shop.Core;

public enum PayType { Hourly, Salary }

// Після рефакторингу: константи, окремі методи, одна формула.
public static class Payroll
{
    private const int NormHours = 160;
    private const decimal OvertimeFactor = 1.5m;
    private const int LoyaltyYears = 5;
    private const decimal LoyaltyBonus = 0.10m;
    private const decimal TaxRate = 0.195m;   // ПДФО 18 % + ВЗ 1,5 %

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

Обидва набори тестів проходять, тож поведінка для відомих типів не змінилася. Невідомий тип тепер неможливо передати: перелічення робить таку помилку помилкою компіляції. Усі 11 тестів проходять.

## Типові помилки

Таблиця 18.4. Типові помилки тестування та рефакторингу {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| повідомлення «Expected:&lt;5&gt;. Actual:&lt;6&gt;» переплутано | у `AreEqual` першим передають очікуване значення |
| тест проходить або падає залежно від порядку запуску | тести мають спільний змінний стан; створювати дані в кожному тесті або в `[TestInitialize]` |
| тест падає в інший день чи на іншому комп’ютері | залежність від часу, культури чи файлів; `TimeProvider`, явна культура, двійники |
| `AreEqual` для `double` не проходить | похибка обчислень; використовувати параметр `delta` |
| тест перевіряє кілька речей одразу | незрозуміло, що зламалося; розділити на окремі тести |
| тест без тверджень | завжди проходить; кожен тест має перевіряти результат |
| рефакторинг змінив поведінку | великі кроки без тестів; спочатку характеризаційні тести, потім малі кроки |
