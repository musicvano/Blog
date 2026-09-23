---
title: "Вектори фіксованої ширини та інтринсики"
description: "Тема 7. Векторизація SIMD: Вектори фіксованої ширини та інтринсики"
outline: [2, 3]
---

# Вектори фіксованої ширини та інтринсики

## Вектори фіксованої ширини

Простір імен `System.Runtime.Intrinsics` <https://learn.microsoft.com/dotnet/api/system.runtime.intrinsics> містить **апаратно-незалежні** (*cross-platform*) вектори фіксованої ширини: `Vector64<T>`, `Vector128<T>`, `Vector256<T>` і `Vector512<T>`. Кожна ширина має узагальнену структуру для даних і статичний клас (`Vector256`) з операціями. JIT перетворює ці операції на інструкції процесора: `Vector128` – на SSE або NEON, `Vector256` – на AVX/AVX2, `Vector512` – на AVX-512. Ширина відома наперед, тому кількість елементів стала: `Vector256<float>.Count` завжди 8.

Перш ніж використати ширину, перевіряють `Vector256.IsHardwareAccelerated`. JIT перетворює цю властивість на константу, тому непотрібна гілка `if` просто зникає з машинного коду. Документація радить починати з `Vector128`, бо його прискорюють найбільше платформ, а ширші вектори додавати для виміряних «гарячих» ділянок.

Операції поділяються на групи: створення (`Create(value)`, `Create(span)`, `Zero`, `Indices`), завантаження і запис (`LoadUnsafe`, `StoreUnsafe`, `LoadAligned`, `CopyTo`), арифметика (`+`, `*`, `Sqrt`, `Min`, `Max`, `Sum`, `Dot`, `FusedMultiplyAdd`, `AddSaturate`), порівняння (`Equals`, `GreaterThan` – маски; `EqualsAll`, `EqualsAny` – `bool`), маски (`ConditionalSelect`, `ExtractMostSignificantBits`), зсуви й перетворення (`ShiftRightLogical`, `ConvertToInt32`, `Widen`, `Narrow`, `As<TFrom, TTo>()`) та доступ до елементів (`GetElement`, `ToScalar`, `GetLower`, `GetUpper`).

### Порівняння та маски

Векторне порівняння не повертає `bool`. Воно повертає **маску** (*mask*) – вектор того самого типу, у якому елемент з усіма одиничними бітами (`0xFF` для `byte`, `NaN` для `float`) означає «так», а нульовий – «ні». Маску використовують двома способами:

- **умовний вибір без переходів**: `ConditionalSelect(mask, x, y)` бере елемент з `x`, де маска одинична, і з `y`, де нульова; це векторний аналог `c ? x : y` для всіх елементів одночасно;
- **перетворення на число**: `ExtractMostSignificantBits()` збирає старші біти елементів маски в `uint` або `ulong` (біт $i$ – результат для елемента $i$). Далі `BitOperations.PopCount` рахує кількість збігів, а `BitOperations.TrailingZeroCount` – індекс першого збігу.

```cs
Vector128<float> a = Vector128.Create(1f, 2f, 3f, 4f);
Vector128<float> limit = Vector128.Create(2.5f);
Vector128<float> mask = Vector128.GreaterThan(a, limit);
// mask = (0, 0, NaN, NaN): усі біти одиничні для 3 і 4
uint bits = mask.ExtractMostSignificantBits();          // 0b1100 = 12
Vector128<float> r = Vector128.ConditionalSelect(mask, a, limit);
// r = (2,5; 2,5; 3; 4) – те саме, що Vector128.Max(a, limit)
```

Умовний вибір замінює оператор `if` у тілі циклу. Скалярний `if` з непередбачуваною умовою спричиняє **помилки передбачення переходів** (*branch mispredictions*), кожна з яких коштує кільканадцять тактів процесора. Векторний код обчислює обидва варіанти й вибирає результат бітовими операціями, тому переходів у ньому немає (приклад «Порогова обробка зображення»).

Для `byte` метод `GreaterThan` порівнює **без знака**, хоча інструкції SSE/AVX порівнюють байти зі знаком: .NET сам додає перетворення.

## Платформні інтринсики

**Апаратні інтринсики** (*hardware intrinsics*) – методи, кожен з яких JIT замінює однією конкретною інструкцією процесора. Вони згруповані в класи за наборами інструкцій: `System.Runtime.Intrinsics.X86.Sse2`, `Avx`, `Avx2`, `Fma`, `Avx512F`, `Avx512BW`, `Avx10v1` <https://learn.microsoft.com/dotnet/api/system.runtime.intrinsics.x86>, а для Arm – `System.Runtime.Intrinsics.Arm.AdvSimd` (NEON), `AdvSimd.Arm64`, `Sve`. Кожен клас має властивість `IsSupported`; вкладені класи `X64`, `VL`, `V512` містять інструкції, які доступні лише в 64-бітному режимі або з додатковим розширенням.

Інтринсики потрібні, коли потрібна інструкція, якої немає серед апаратно-незалежних операцій, або коли вимірювання показує виграш від конкретної інструкції. Виклик інтринсика на процесорі без підтримки набору спричиняє `PlatformNotSupportedException`, тому код завжди має **запасний шлях** (*fallback*): `if (Fma.IsSupported) r = Fma.MultiplyAdd(a, b, c); else r = a * b + c;`.

Для Arm перевіряють `AdvSimd.IsSupported`; на лабораторних ПК (x86-64) цей шлях можна перевірити лише на ПК з Arm або в CI. Класи `Sve` у .NET 10 експериментальні (помилка компіляції `SYSLIB5003`). FMA не округлює проміжний добуток, тому `Fma.MultiplyAdd` може відрізнятися від `a * b + c` в останньому розряді.

### Перевірка всіх шляхів коду

На одному ПК можна перевірити запасні шляхи, вимкнувши набори інструкцій змінними середовища перед запуском процесу (табл. 7.2). Це діагностичні налаштування для тестів, а не для робочих програм.

Таблиця 7.2. Змінні середовища для перевірки шляхів коду {.caption}

| **Змінна** | **Результат на i9-11900KF** |
| --- | --- |
| `DOTNET_EnableAVX512=0` | `Vector512.IsHardwareAccelerated` і `Avx512F.IsSupported` – `false` |
| `DOTNET_EnableAVX2=0` | `Vector256` не прискорюється, `Vector<float>.Count` = 4, `Avx2` і `Fma` вимкнено |
| `DOTNET_EnableHWIntrinsic=0` | жоден вектор не прискорюється, усі `IsSupported` = `false` |
| `DOTNET_MaxVectorTBitWidth=512` | `Vector<float>.Count` = 16 |
| `DOTNET_PreferredVectorBitWidth=256` | `Vector512.IsHardwareAccelerated` = `false` |

У PowerShell змінну задають так: `$env:DOTNET_EnableAVX2 = "0"; dotnet run -c Release`, у bash – `DOTNET_EnableAVX2=0 dotnet run -c Release`. У Rider змінні середовища задають у конфігурації запуску (*Run → Edit Configurations… → Environment variables*).
