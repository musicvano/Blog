---
title: "Приклади та типові помилки"
description: "Тема 2. Типи, змінні, операції: Приклади та типові помилки"
outline: [2, 3]
---

# Приклади та типові помилки

## Приклади програм

### Діапазони числових типів

Програма виводить розмір і діапазон кожного числового типу. Метод `Print` має параметри типу `object`, тому приймає значення будь-якого типу (з упакуванням).

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine($"{"Тип",-7}{"Байти",6}  {"Мінімум",-21}Максимум");
Print("sbyte", sizeof(sbyte), sbyte.MinValue, sbyte.MaxValue);
Print("byte", sizeof(byte), byte.MinValue, byte.MaxValue);
Print("short", sizeof(short), short.MinValue, short.MaxValue);
Print("ushort", sizeof(ushort), ushort.MinValue, ushort.MaxValue);
Print("int", sizeof(int), int.MinValue, int.MaxValue);
Print("uint", sizeof(uint), uint.MinValue, uint.MaxValue);
Print("long", sizeof(long), long.MinValue, long.MaxValue);
Print("ulong", sizeof(ulong), ulong.MinValue, ulong.MaxValue);
Print("nint", nint.Size, nint.MinValue, nint.MaxValue);

Console.WriteLine();
Console.WriteLine($"{"Тип",-7}{"Байти",6}  Діапазон");
PrintReal("float", sizeof(float), float.MaxValue);
PrintReal("double", sizeof(double), double.MaxValue);
PrintReal("decimal", sizeof(decimal), decimal.MaxValue);

// Параметр типу object приймає значення будь-якого типу.
static void Print(string name, int size, object min, object max)
{
    Console.WriteLine($"{name,-7}{size,6}  {min,-21}{max}");
}

static void PrintReal(string name, int size, object max)
{
    Console.WriteLine($"{name,-7}{size,6}  ±{max}");
}
```

Операція `sizeof` повертає розмір типу в байтах, а `nint.Size` – розмір `nint` у поточному процесі. Результат у 64-розрядному процесі:

```
Тип     Байти  Мінімум              Максимум
sbyte       1  -128                 127
byte        1  0                    255
short       2  -32768               32767
ushort      2  0                    65535
int         4  -2147483648          2147483647
uint        4  0                    4294967295
long        8  -9223372036854775808 9223372036854775807
ulong       8  0                    18446744073709551615
nint        8  -9223372036854775808 9223372036854775807

Тип     Байти  Діапазон
float       4  ±3,4028235E+38
double      8  ±1,7976931348623157E+308
decimal    16  ±79228162514264337593543950335
```

### Грошовий калькулятор

Програма обчислює вартість товару з ПДВ. Суми обчислюються в `decimal` і округлюються двома способами, а для порівняння той самий розрахунок виконується в `double`.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Ціна без ПДВ, грн: ");
decimal price = decimal.Parse(Console.ReadLine() ?? "0");
Console.Write("Кількість: ");
int count = int.Parse(Console.ReadLine() ?? "0");
Console.Write("Ставка ПДВ, %: ");
decimal rate = decimal.Parse(Console.ReadLine() ?? "20") / 100;

decimal net = price * count;
decimal vatExact = net * rate;
decimal vatEven = Math.Round(vatExact, 2);
decimal vat = Math.Round(vatExact, 2,
    MidpointRounding.AwayFromZero);
decimal total = net + vat;

Console.WriteLine($"Сума без ПДВ:     {net,10:N2} грн");
Console.WriteLine($"ПДВ без округл.:  {vatExact,10} грн");
Console.WriteLine($"ПДВ (ToEven):     {vatEven,10:N2} грн");
Console.WriteLine($"ПДВ (AwayFromZero): {vat,8:N2} грн");
Console.WriteLine($"До сплати:        {total,10:N2} грн");

// Той самий розрахунок у типі double.
double netD = (double)price * count;
double totalD = netD + netD * (double)rate;
Console.WriteLine($"double без округл.: {totalD} грн");
```

Ставка 7 % (пільгова ставка ПДВ) дає податок 1,365 грн, який лежить точно посередині між копійками: банківське округлення дає 1,36, а округлення від нуля – 1,37. Сума в `double` містить похибку в останніх розрядах:

```
Ціна без ПДВ, грн: 9,75
Кількість: 2
Ставка ПДВ, %: 7
Сума без ПДВ:          19,50 грн
ПДВ без округл.:      1,3650 грн
ПДВ (ToEven):           1,36 грн
ПДВ (AwayFromZero):     1,37 грн
До сплати:             20,87 грн
double без округл.: 20,865000000000002 грн
```

Тип `decimal` зберігає кількість знаків після коми: `1,3650` має чотири знаки, бо ціна мала два знаки, а ставка – два.

### Тривалість у днях, годинах і хвилинах

Програма переводить кількість секунд у дні, години, хвилини та секунди, а також показує переповнення `int` під час обчислення мілісекунд.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

const int SecondsPerMinute = 60;
const int SecondsPerHour = 60 * SecondsPerMinute;
const int SecondsPerDay = 24 * SecondsPerHour;

Console.Write("Тривалість у секундах: ");
int total = int.Parse(Console.ReadLine() ?? "0");

int days = total / SecondsPerDay;
int rest = total % SecondsPerDay;     // секунди без повних діб
int hours = rest / SecondsPerHour;
rest %= SecondsPerHour;               // секунди без повних годин
int minutes = rest / SecondsPerMinute;
int seconds = rest % SecondsPerMinute;

Console.WriteLine($"{days} д {hours:D2}:{minutes:D2}:{seconds:D2}");

int millisInt = total * 1000;         // переповнення int
long millisLong = total * 1000L;      // множення в типі long
Console.WriteLine($"Мілісекунд (int):  {millisInt}");
Console.WriteLine($"Мілісекунд (long): {millisLong}");
```

Формат `D2` доповнює ціле число нулями до двох цифр. Добуток 3 000 000 · 1000 не вміщується в `int`, тому перший результат від’ємний. Суфікс `L` робить літерал `1000L` типом `long`, і множення виконується в `long`:

```
Тривалість у секундах: 3000000
34 д 17:20:00
Мілісекунд (int):  -1294967296
Мілісекунд (long): 3000000000
```

Запис `(long)(total * 1000)` помилку не виправить: множення вже відбулося в `int`, і приводиться неправильний результат.

### Кольоровий код RGB

Програма упаковує три компоненти кольору (0–255) в одне ціле число `0xRRGGBB` за допомогою зсувів і побітового АБО, а потім розпаковує їх назад.

```cs
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.Write("Червоний (0–255): ");
byte r = byte.Parse(Console.ReadLine() ?? "0");
Console.Write("Зелений (0–255): ");
byte g = byte.Parse(Console.ReadLine() ?? "0");
Console.Write("Синій (0–255): ");
byte b = byte.Parse(Console.ReadLine() ?? "0");

// Упакування: 0x00RRGGBB.
int color = (r << 16) | (g << 8) | b;
Console.WriteLine($"HEX: #{color:X6}");
Console.WriteLine($"Двійковий: {color:B24}");
Console.WriteLine($"Десятковий: {color}");

// Розпакування: зсув праворуч і маска 0xFF.
int red = (color >> 16) & 0xFF;
int green = (color >> 8) & 0xFF;
int blue = color & 0xFF;
Console.WriteLine($"R = {red}, G = {green}, B = {blue}");

// Протилежний колір: інвертувати 24 молодші біти.
int inverted = ~color & 0xFFFFFF;
Console.WriteLine($"Протилежний: #{inverted:X6}");

// Відтінок сірого: середнє зважене компонентів.
int gray = (int)Math.Round(0.299 * r + 0.587 * g + 0.114 * b);
Console.WriteLine($"Сірий: #{gray:X2}{gray:X2}{gray:X2}");
```

Формат `X6` виводить число шістнадцятковими цифрами (не менше шести), `B24` – двійковими. Метод `byte.Parse` сам перевіряє діапазон: для значення 256 він спричиняє `OverflowException`. Результат для помаранчевого кольору:

```
Червоний (0–255): 255
Зелений (0–255): 165
Синій (0–255): 0
HEX: #FFA500
Двійковий: 111111111010010100000000
Десятковий: 16753920
R = 255, G = 165, B = 0
Протилежний: #005AFF
Сірий: #ADADAD
```

## Типові помилки

У табл. 2.9 наведено помилки, яких найчастіше припускаються під час роботи з типами та виразами.

Таблиця 2.9. Типові помилки під час роботи з типами та операціями {.caption}

| **Проблема** | **Причина** | **Виправлення** |
| --- | --- | --- |
| `5 / 2` дає 2, а не 2,5 | ділення цілих чисел відкидає дробову частину | `5.0 / 2` або `(double)a / b` |
| `0.1 + 0.2 == 0.3` дає `False` | похибка двійкових дробів | порівняння з допуском `Math.Abs(a - b) < 1e-9` або `decimal` |
| CS0266: *Cannot implicitly convert type 'double' to 'int'* | перетворення з можливою втратою даних | явне приведення `(int)x`, `Math.Round` або зміна типу змінної |
| CS0664 для `decimal price = 12.5;` | літерал без суфікса має тип `double` | `12.5m` для `decimal`, `12.5f` для `float` |
| від’ємний результат добутку додатних чисел | переповнення `int` | тип `long`, суфікс `L`, блок `checked` |
| `FormatException` під час `Parse` | некоректне введення або інший десятковий роздільник | `TryParse`, інваріантна культура |
| `(int)((0.1 + 0.7) * 10)` дає 7, а не 8 | добуток дорівнює 7,999…, а приведення відкидає дробову частину | `(int)Math.Round(x)` замість `(int)x` |
| попередження CS8602 | змінна `string?` може бути `null` | `?? ""` або перевірка на `null` |
| `flags & mask != 0` – помилка CS0019 | `!=` має вищий пріоритет, ніж `&` | дужки: `(flags & mask) != 0` |
