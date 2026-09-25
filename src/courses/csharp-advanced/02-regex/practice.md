---
title: "Practice"
description: "Topic 2. Regular expressions: worked examples"
outline: [2, 3]
sourceHash: "2a5b8e339418a5a4bce3e7e5c0b297061999f098da9101184e497bfdc714f468"
---

# Practice

## Example 1. Receipt total

Write a program that reads the text file of a fiscal receipt, finds the line items (name, quantity, price, amount), checks the amount of each item, takes discounts into account, and compares the calculated total with the "TOTAL" line. Amounts are written in the Ukrainian format: a comma as the decimal separator and a space between digit groups. The `receipt.txt` file:

```
Fiscal receipt No. 004512          17.09.2026 18:42
Rye bread             1 x 32,50          32,50 UAH
Milk 2,5 %            2 x 41,90          83,80 UAH
Hard cheese       0,356 x 489,00        174,80 UAH
Coffee beans      1 x 1 249,00        1 249,00 UAH
Apples            1,25 x 38,90          48,63 UAH
Loyalty card discount                  -50,00 UAH
TOTAL                                1 538,01 UAH
```

```cs
using System.Globalization;
using System.Text.RegularExpressions;

Console.OutputEncoding = System.Text.Encoding.UTF8;
var uk = CultureInfo.GetCultureInfo("uk-UA");

// An amount with kopecks: 32,50, 1 249,00, or -50,00.
const string Money = @"-?\d{1,3}(?:[ \xA0]\d{3})*,\d{2}";
var item = new Regex(
    @"^(?<name>\S.*?)\s+(?<qty>\d+(?:,\d+)?)\s*x\s*" +
    $@"(?<price>{Money})\s+(?<sum>{Money})\s*UAH\r?$",
    RegexOptions.Multiline);
var discount = new Regex($@"^Loyalty.*?(?<sum>{Money})\s*UAH",
    RegexOptions.Multiline | RegexOptions.IgnoreCase);
var total = new Regex($@"^TOTAL\s+(?<sum>{Money})\s*UAH",
    RegexOptions.Multiline);

decimal ToDecimal(Group g) =>
    decimal.Parse(Regex.Replace(g.Value, @"\s", ""), uk);

string text = File.ReadAllText("receipt.txt");
decimal itemsSum = 0;
Console.WriteLine($"{"Item",-14}{"Qty",6}{"Price",10}{"Amount",10}");
foreach (Match m in item.Matches(text))
{
    decimal qty = ToDecimal(m.Groups["qty"]);
    decimal price = ToDecimal(m.Groups["price"]);
    decimal sum = ToDecimal(m.Groups["sum"]);
    decimal expected = Math.Round(qty * price, 2,
        MidpointRounding.AwayFromZero);
    itemsSum += expected;
    string note = sum == expected ? "" : $"  should be {expected:N2}";
    Console.WriteLine($"{m.Groups["name"].Value,-14}{qty,6}" +
        $"{price,10:N2}{sum,10:N2}{note}");
}

decimal discounts = discount.Matches(text)
    .Sum(m => ToDecimal(m.Groups["sum"]));
decimal toPay = itemsSum + discounts;
Console.WriteLine($"Items total:  {itemsSum,10:N2} UAH");
Console.WriteLine($"Discounts:    {discounts,10:N2} UAH");
Console.WriteLine($"To pay:       {toPay,10:N2} UAH");

Match totalMatch = total.Match(text);
if (!totalMatch.Success)
    Console.WriteLine("TOTAL line not found.");
else if (ToDecimal(totalMatch.Groups["sum"]) == toPay)
    Console.WriteLine("The receipt total is correct.");
else
    Console.WriteLine($"The receipt total {totalMatch.Groups["sum"]} " +
        "does not match.");
```

The `Money` amount pattern is declared once and inserted into three other patterns using interpolated strings. The digit group separator can be a space or a nonbreaking space `\xA0` (which .NET outputs for the `uk-UA` culture). Before conversion to `decimal`, the spaces are removed, and the string is parsed with the `uk-UA` culture regardless of the computer's settings. The lazy quantifier `.*?` ends the item name where the quantity with the `x` character begins, so the name "Milk 2,5 %" does not confuse the program. The expected item amount is rounded to kopecks away from zero (`MidpointRounding.AwayFromZero`), as at a cash register: 1,25 · 38,90 = 48,625 → 48,63. The result (the program runs with the `uk-UA` culture, so numbers are displayed in the Ukrainian format):

```
Item             Qty     Price    Amount
Rye bread          1     32,50     32,50
Milk 2,5 %         2     41,90     83,80
Hard cheese    0,356    489,00    174,80  should be 174,08
Coffee beans       1  1 249,00  1 249,00
Apples          1,25     38,90     48,63
Items total:    1 588,01 UAH
Discounts:        -50,00 UAH
To pay:         1 538,01 UAH
The receipt total is correct.
```

The program found an error in the third item: 0,356 · 489,00 = 174,084 ≈ 174,08, but the receipt shows 174,80. The total is calculated from the correct amounts, so it matches the "TOTAL" line.

## Example 2. Password strength

Write a program that asks for a login and password, checks the password against eight rules, and displays for each rule whether it is satisfied. A password is considered strong if all rules are satisfied, and medium if six or seven are.

```cs
using System.Text.RegularExpressions;

Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.InputEncoding = System.Text.Encoding.UTF8;

Console.Write("Login: ");
string login = (Console.ReadLine() ?? "").Trim();
if (login.Length == 0)
{
    Console.WriteLine("The login cannot be empty.");
    return;
}
Console.Write("Password: ");
string password = Console.ReadLine() ?? "";

// Each rule is a lookahead from the start of the string.
string loginPattern = Regex.Escape(login);
(string Pattern, string Message)[] rules =
{
    (@"^(?=.{12,})", "at least 12 characters"),
    (@"^(?=.*\p{Lu})", "an uppercase letter"),
    (@"^(?=.*\p{Ll})", "a lowercase letter"),
    (@"^(?=.*\d)", "a digit"),
    (@"^(?=.*[^\p{L}\d\s])", "a special character"),
    (@"^(?!.*\s)", "no spaces"),
    (@"^(?!.*(.)\1\1)", "no three identical characters in a row"),
    ($"^(?!.*(?i:{loginPattern}))", "no login (any case)"),
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
    8 => "strong",
    >= 6 => "medium",
    _ => "weak",
};
Console.WriteLine($"Rules satisfied: {passed} of {rules.Length}, " +
    $"password is {level}");
```

Each rule is a separate pattern with a lookahead (`(?=…)`) or a negative lookahead (`(?!…)`) from the start of the string. This way, the same rule can be used both on its own (for a message) and in a combined pattern with several conditions. The rule `(.)\1\1` with a backreference finds three identical characters in a row. The user's login enters the pattern only through `Regex.Escape`: without escaping, the login `ivan.k` would mean "ivan, any character, k". The inline option `(?i:…)` enables case insensitivity **only** for the login: if you passed `RegexOptions.IgnoreCase` for all rules, the `\p{Lu}` and `\p{Ll}` classes would start matching any letter. The output:

```
Login: olena
Password: OLENA_2026!!!
  [+] at least 12 characters
  [+] an uppercase letter
  [ ] a lowercase letter
  [+] a digit
  [+] a special character
  [+] no spaces
  [ ] no three identical characters in a row
  [ ] no login (any case)
Rules satisfied: 5 of 8, password is weak
```

For the login `ivan.k` and the password `Kvitka_2026#Rome`, all rules are satisfied, and the program displays `Rules satisfied: 8 of 8, password is strong`.

## Example 3. Masking card numbers in a file

Write an application that reads a text file (the first command-line argument), replaces payment card numbers in it with a mask that keeps only the last four digits, and writes the result to a second file. A card number is a sequence of 13–19 digits (with spaces or hyphens between them) that passes the Luhn algorithm check. Cover the masking logic with xUnit unit tests.

The `CardMasking` solution is created with dotnet CLI commands in the same way as the `Contacts` solution in the theory section and consists of three projects: the `CardMasking.Core` library (`classlib`), the `CardMasker` console application (`console`, references the library), and the `CardMasking.Tests` test project (`xunit3 -f net10.0`, references the library). The `CardMasking.Core/CardMasker.cs` file:

```cs
using System.Text.RegularExpressions;

namespace CardMasking.Core;

public static partial class CardMasker
{
    // 13–19 digits, with at most one space or hyphen between digits.
    // A 500 ms timeout protects against very long strings.
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
                return match.Value;        // not a card number
            count++;
            return MaskDigits(match.Value, keep: 4);
        });
        masked = count;
        return result;
    }

    // Replaces all digits except the last keep with *; keeps separators.
    private static string MaskDigits(string value, int keep)
    {
        int toMask = value.Count(char.IsAsciiDigit) - keep;
        return Regex.Replace(value, @"\d",
            d => toMask-- > 0 ? "*" : d.Value);
    }

    // The Luhn algorithm: the checksum of payment card numbers.
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

The card pattern is declared as a `partial` property with the `[GeneratedRegex]` attribute and a 500 ms timeout. The lookarounds `(?<!\d)` and `(?!\d)` prevent "cutting" 16 digits out of a longer number, such as an account number. A regular expression checks only the shape, so each match is additionally checked with the Luhn algorithm in the `MatchEvaluator`: if the checksum is wrong, the method returns the match unchanged. The mask is created by another replacement of `\d` with a lambda expression that counts digits, so spaces and hyphens stay in place.

The `CardMasker/Program.cs` file:

```cs
using System.Text.RegularExpressions;
using CardMasking.Core;

Console.OutputEncoding = System.Text.Encoding.UTF8;

if (args.Length != 2)
{
    Console.Error.WriteLine(
        "Usage: CardMasker <input file> <output file>");
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
            Console.WriteLine($"Line {lineNumber}: numbers {count}");
        total += count;
    }
    Console.WriteLine($"Total numbers masked: {total}");
    return 0;
}
catch (RegexMatchTimeoutException ex)
{
    Console.Error.WriteLine($"Search timeout: {ex.MatchTimeout}");
    return 1;
}
catch (IOException ex)
{
    Console.Error.WriteLine($"File error: {ex.Message}");
    return 1;
}
```

The application returns code 0 on success, 1 on a file error or timeout, and 2 if the arguments are wrong; error messages are written to the `Console.Error` error stream. The input file `payments.txt`:

```
17.09 Payment 4111 1111 1111 1111 – 1,250.00 UAH
17.09 Refund to card 5500-0000-0000-0004
18.09 Contract 4111 1111 1111 1112, tel. +380671234567
```

Running `dotnet run -- payments.txt masked.txt` in the `CardMasker` folder displays the lines `Line 1: numbers 1`, `Line 2: numbers 1`, `Total numbers masked: 2` and creates the `masked.txt` file, in which the third line is unchanged: the number `4111 1111 1111 1112` fails the Luhn check, and the phone number has only 12 digits:

```
17.09 Payment **** **** **** 1111 – 1,250.00 UAH
17.09 Refund to card ****-****-****-0004
18.09 Contract 4111 1111 1111 1112, tel. +380671234567
```

The `CardMasking.Tests/CardMaskerTests.cs` file:

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
    [InlineData("4111 1111 1111 1112")]    // wrong Luhn checksum
    [InlineData("tel. +380671234567")]     // only 12 digits
    [InlineData("12345678901234567890")]   // 20 digits
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

The tests check three valid numbers written in different ways, three strings that must not be masked, and the Luhn algorithm itself on the well-known example 79927398713. The `dotnet test` command in the solution folder displays the summary `Test run summary: Passed!` with the lines `total: 8`, `failed: 0`, and `succeeded: 8`.
