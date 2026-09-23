---
title: "Практика"
description: "Тема 2. Типи, змінні, операції: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Перетворення одиниць швидкості

Написати програму, яка запитує швидкість у кілометрах за годину, перевіряє коректність введення та виводить таблицю зі швидкістю в милях за годину, вузлах і метрах за секунду.

```cs
using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

const double KmPerMile = 1.609344;         // міжнародна миля
const double KmPerNauticalMile = 1.852;    // морська миля

Console.Write("Швидкість, км/год: ");
string input = (Console.ReadLine() ?? "").Replace(',', '.');

if (!double.TryParse(input, NumberStyles.Float,
        CultureInfo.InvariantCulture, out double kmh)
    || kmh < 0 || double.IsInfinity(kmh))
{
    Console.WriteLine("Помилка: введіть невід’ємне число.");
    return;
}

double mph = kmh / KmPerMile;
double knots = kmh / KmPerNauticalMile;
double ms = kmh * 1000 / 3600;

Console.WriteLine($"{"Одиниця",-12}{"Значення",12}");
Console.WriteLine(new string('-', 24));
Console.WriteLine($"{"км/год",-12}{kmh,12:F2}");
Console.WriteLine($"{"миль/год",-12}{mph,12:F2}");
Console.WriteLine($"{"вузли",-12}{knots,12:F2}");
Console.WriteLine($"{"м/с",-12}{ms,12:F2}");
```

Коефіцієнти перетворення записано константами `const`, тому в обчисленнях немає «магічних чисел». Кома у введенні замінюється крапкою, і рядок розбирається з `CultureInfo.InvariantCulture`, тож програма приймає обидва роздільники. Умова використовує логічні операції `!` і `||`: якщо `TryParse` повернув `false`, решта умови не перевіряється (скорочене обчислення). Значення `1e400` не вміщується в `double` і розбирається як нескінченність, тому його відхиляє перевірка `double.IsInfinity`. Оператор `return` завершує програму. Результат:

```
Швидкість, км/год: 90
Одиниця         Значення
------------------------
км/год             90,00
миль/год           55,92
вузли              48,60
м/с                25,00
```

Для некоректного введення (`abc`, `-5` або `1e400`) програма виводить `Помилка: введіть невід’ємне число.`

## Приклад 2. Вартість поїздки на таксі

Написати програму, яка обчислює вартість поїздки на таксі: посадка 60 грн, 18,50 грн за кілометр і 3 грн за кожну розпочату хвилину в дорозі. Користувач вводить відстань, тривалість у секундах і, за бажанням, відсоток знижки за промокодом (не більше 50 %).

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

const decimal BaseFare = 60m;        // посадка, грн
const decimal PricePerKm = 18.50m;   // грн за кілометр
const decimal PricePerMinute = 3m;   // грн за хвилину в дорозі

Console.Write("Відстань, км: ");
decimal distance = decimal.Parse(Console.ReadLine() ?? "0");
Console.Write("Тривалість поїздки, с: ");
int durationSeconds = int.Parse(Console.ReadLine() ?? "0");
Console.Write("Промокод, % знижки (Enter – без знижки): ");
string? promo = Console.ReadLine();

// Неповна хвилина оплачується як повна.
int minutes = (int)Math.Ceiling(durationSeconds / 60.0);

// int? – ціле число або null, якщо знижку не введено.
int? discount = int.TryParse(promo, out int percent)
    ? percent
    : null;
int discountPercent = Math.Clamp(discount ?? 0, 0, 50);

decimal cost = BaseFare + distance * PricePerKm
    + minutes * PricePerMinute;
decimal discountSum = Math.Round(cost * discountPercent / 100, 2);
decimal toPay = cost - discountSum;

Console.WriteLine($"Оплачуваних хвилин: {minutes}");
Console.WriteLine($"Вартість:  {cost,10:N2} грн");
Console.WriteLine($"Знижка {discountPercent,2} %: {discountSum,7:N2} грн");
Console.WriteLine($"До сплати: {toPay,10:N2} грн");
```

Грошові величини мають тип `decimal`. Ділення `durationSeconds / 60.0` виконується в `double` (другий операнд дійсний), а `Math.Ceiling` округлює вгору: 1275 с – це 21,25 хв, тобто 22 оплачувані хвилини. Змінна `discount` має тип `int?`: умовна операція `?:` повертає число, якщо рядок вдалося розібрати, інакше `null`. Операція `??` замінює `null` нулем, а `Math.Clamp` обмежує знижку діапазоном 0–50. Результати для знижки 15 % і без знижки:

```
Відстань, км: 12,4
Тривалість поїздки, с: 1275
Промокод, % знижки (Enter – без знижки): 15
Оплачуваних хвилин: 22
Вартість:      355,40 грн
Знижка 15 %:   53,31 грн
До сплати:     302,09 грн
```

```
Відстань, км: 3
Тривалість поїздки, с: 200
Промокод, % знижки (Enter – без знижки):
Оплачуваних хвилин: 4
Вартість:      127,50 грн
Знижка  0 %:    0,00 грн
До сплати:     127,50 грн
```

## Приклад 3. Бітовий аналіз цілого числа

Написати програму, яка зчитує ціле число типу `int` і виводить його двійковий та шістнадцятковий запис, значення тих самих бітів як `uint`, парність, ознаку степеня двійки, кількість одиничних бітів, молодший байт і результати зсувів на один біт.

```cs
using System.Numerics;

Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Ціле число: ");
if (!int.TryParse(Console.ReadLine(), out int n))
{
    Console.WriteLine("Помилка: потрібне ціле число типу int.");
    return;
}

uint bits = (uint)n;              // ті самі 32 біти без знака
bool isEven = (n & 1) == 0;
bool isPowerOfTwo = n > 0 && (n & (n - 1)) == 0;
int ones = BitOperations.PopCount(bits);

Console.WriteLine($"Двійковий:        {n:B32}");
Console.WriteLine($"Шістнадцятковий:  0x{n:X8}");
Console.WriteLine($"Як uint:          {bits}");
Console.WriteLine($"Парне:            {isEven}");
Console.WriteLine($"Степінь двійки:   {isPowerOfTwo}");
Console.WriteLine($"Одиничних бітів:  {ones}");
Console.WriteLine($"Молодший байт:    {n & 0xFF}");
Console.WriteLine($"n << 1 = {n << 1}, n >> 1 = {n >> 1}");
```

Число парне, якщо його молодший біт дорівнює нулю: `(n & 1) == 0`. У степені двійки лише один одиничний біт, тому вираз `n & (n - 1)` для нього дорівнює нулю. Дужки потрібні, бо `==` має вищий пріоритет, ніж `&`. Метод `BitOperations.PopCount` із простору імен `System.Numerics` рахує одиничні біти (<https://learn.microsoft.com/dotnet/api/system.numerics.bitoperations>). Від’ємні числа зберігаються в **додатковому коді** (*two’s complement*), тому для −8 старші біти заповнені одиницями, а приведення до `uint` дає 4 294 967 288. Результати для 2026 і −8:

```
Ціле число: 2026
Двійковий:        00000000000000000000011111101010
Шістнадцятковий:  0x000007EA
Як uint:          2026
Парне:            True
Степінь двійки:   False
Одиничних бітів:  8
Молодший байт:    234
n << 1 = 4052, n >> 1 = 1013
```

```
Ціле число: -8
Двійковий:        11111111111111111111111111111000
Шістнадцятковий:  0xFFFFFFF8
Як uint:          4294967288
Парне:            True
Степінь двійки:   False
Одиничних бітів:  29
Молодший байт:    248
n << 1 = -16, n >> 1 = -4
```

Число 3000000000 не вміщується в `int`, тому `TryParse` повертає `false`, і програма виводить повідомлення про помилку.
