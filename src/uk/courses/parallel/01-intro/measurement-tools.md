---
title: "Вимірювання, .NET 10 і Rider"
description: "Тема 1. Основи паралельних обчислень: Вимірювання, .NET 10 і Rider"
outline: [2, 3]
---

# Вимірювання, .NET 10 і Rider

## Методика вимірювань

Час виконання – основна величина для всіх метрик, тому вимірювати його потрібно правильно.

**Таймер.** У .NET для вимірювання інтервалів використовують клас `Stopwatch` (<https://learn.microsoft.com/dotnet/api/system.diagnostics.stopwatch>), а не `DateTime.Now`: системний годинник може коригуватися під час синхронізації часу, а на деяких системах має точність лише кілька мілісекунд. Властивість `Stopwatch.IsHighResolution` показує, чи використовується апаратний таймер високої точності. Щоб не створювати об’єкт, використовують статичні методи:

```cs
long start = Stopwatch.GetTimestamp();
DoWork();
TimeSpan elapsed = Stopwatch.GetElapsedTime(start);
Console.WriteLine($"{elapsed.TotalMilliseconds:F1} мс");
```

**Конфігурація Release.** У конфігурації *Debug* компілятор не оптимізує код, і програма може працювати в кілька разів повільніше. Усі вимірювання виконують у конфігурації *Release* (`dotnet run -c Release`).

**Прогрівання.** Під час першого виклику методу JIT-компілятор перетворює проміжний код IL на машинний, а багаторівнева компіляція (*tiered compilation*) згодом повторно оптимізує «гарячі» методи. Тому перший запуск вимірюваного фрагмента виконують без врахування часу.

**Кілька запусків.** Час коливається через інші процеси, збирач сміття, зміну частоти процесора й температуру. Фрагмент запускають 5–10 разів і беруть **медіану** – вона стійкіша до окремих викидів, ніж середнє; додатково вказують мінімум, максимум або відносне стандартне відхилення.

**Середовище.** Під час вимірювань закривають важкі програми, підключають ноутбук до мережі живлення й обирають режим живлення *Best performance*. Кількість логічних процесорів повертає `Environment.ProcessorCount`; таблицю прискорення будують для $p = 1 , 2 , 4 , \dots$ до цього значення, пам’ятаючи, що логічні процесори SMT не дорівнюють фізичним ядрам.

### Бібліотека BenchmarkDotNet

Для точних порівнянь невеликих фрагментів коду використовують бібліотеку **BenchmarkDotNet** (<https://benchmarkdotnet.org/>). Вона сама виконує прогрівання, визначає кількість повторень, запускає тести в окремому процесі й виводить статистику. Пакет додають командою `dotnet add package BenchmarkDotNet`, методи позначають атрибутом `[Benchmark]`, а запускають у конфігурації Release:

```cs
using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Running;

BenchmarkRunner.Run<HarmonicBenchmarks>();

public class HarmonicBenchmarks
{
    [Params(1_000_000, 10_000_000)]
    public int N;

    [Benchmark(Baseline = true)]
    public double Forward()
    {
        double sum = 0;
        for (int k = 1; k <= N; k++) sum += 1.0 / k;
        return sum;
    }

    [Benchmark]
    public double Backward()
    {
        double sum = 0;
        for (int k = N; k >= 1; k--) sum += 1.0 / k;
        return sum;
    }
}
```

Результатом є таблиця зі стовпцями `Mean` (середній час), `Error`, `StdDev` і `Ratio` (відношення до базового методу). У цьому курсі BenchmarkDotNet систематично використовується з теми 4, а для вимірювання цілих паралельних програм достатньо `Stopwatch` з прогріванням і медіаною.

## Платформа .NET 10

Практичні роботи модуля 1 виконуються мовою C# 14 на платформі **.NET 10** (<https://dotnet.microsoft.com/download/dotnet/10.0>). Це версія з довготривалою підтримкою (*LTS*): вийшла 11 листопада 2025 року й підтримується до 14 листопада 2028 року. Станом на вересень 2026 року актуальні середовище виконання .NET 10.0.12 і SDK 10.0.401.

- **SDK** (*software development kit*) містить компілятори, бібліотеки та утиліту `dotnet` для створення, збирання й запуску програм; потрібен розробникові.
- **Середовище виконання** (*runtime*) лише запускає готові програми; воно входить до складу SDK.

У Windows SDK встановлюють інсталятором із сайту або командою `winget install Microsoft.DotNet.SDK.10`. Модуль 2 курсу використовує Linux, тому зручно одразу встановити **Ubuntu 26.04 LTS** у підсистемі **WSL2** (*Windows Subsystem for Linux*) командою `wsl --install -d Ubuntu-26.04` (<https://learn.microsoft.com/windows/wsl/install>). В Ubuntu 26.04 .NET 10 доступний у стандартних пакетах Ubuntu (<https://learn.microsoft.com/dotnet/core/install/linux-ubuntu>):

```bash
sudo apt-get update && sudo apt-get install -y dotnet-sdk-10.0
dotnet --info
```

Команда `dotnet --info` виводить версію SDK, операційну систему, ідентифікатор платформи (*RID*, наприклад `win-x64` або `linux-x64`) і встановлені середовища виконання (рис. 1.8). Одна й та сама програма .NET запускається в Windows і Linux без змін.

::: info Знімок екрана
Windows Terminal: `dotnet --info`; top part with SDK 10.0.x, OS, RID, installed runtimes
:::

Рис. 1.8. Інформація про встановлений .NET 10 SDK {.caption}

## Середовище JetBrains Rider

Програми мовою C# у курсі створюються в інтегрованому середовищі **JetBrains Rider** (<https://www.jetbrains.com/rider/>), яке працює у Windows, Linux і macOS. Для некомерційного використання й навчання Rider доступний безплатно.

**Створення рішення.** Команда *File → New Solution…* відкриває діалог нового рішення (рис. 1.9). У списку шаблонів обирають *Console*, задають назву рішення й проєкту, теку, мову C# і цільову платформу `net10.0`, потім натискають *Create*.

::: info Знімок екрана
Rider: File → New Solution… → Console; Solution name `Speedup`, Framework `net10.0`, the Create button
:::

Рис. 1.9. Створення консольного рішення в Rider {.caption}

**Конфігурації Debug і Release.** Нове рішення має дві **конфігурації збирання** (*build configurations*): *Debug* для налагодження й *Release* з оптимізацією коду. Поточну конфігурацію обирають у списку на панелі інструментів праворуч. Програму запускають кнопкою *Run* (**Shift+F10**) або з налагоджувачем *Debug* (**Shift+F9**); виведення з’являється у вікні *Run* (рис. 1.10).

::: info Знімок екрана
Rider toolbar: configuration drop-down set to Release, `Program.cs` open, Run tool window with the timing table
:::

Рис. 1.10. Запуск у конфігурації Release {.caption}

**Моніторинг.** Під час запуску Rider автоматично відкриває вікно *Monitoring* (<https://www.jetbrains.com/help/rider/Program-Monitoring.html>) з графіками завантаження процесора, пам’яті та збирання сміття (рис. 1.11). Воно допомагає побачити, чи справді паралельна програма завантажує всі ядра. У Windows це вікно також виявляє проблеми продуктивності та дозволяє перейти до профілювальника dotTrace.

::: info Знімок екрана
Rider: run the program → Monitoring tool window; CPU and memory charts during the calculation
:::

Рис. 1.11. Моніторинг процесора та пам’яті під час запуску {.caption}

Програмне забезпечення всього курсу наведено в табл. 1.2.

Таблиця 1.2. Програмне забезпечення курсу {.caption}

| **Модуль** | **Мови, технології та інструменти** |
| --- | --- |
| 1. Спільна пам’ять, C# | .NET 10, C# 14, JetBrains Rider; потоки, синхронізація, TPL, PLINQ, канали, SIMD |
| 2. HPC, C++ | GCC, CMake, Ninja, JetBrains CLion; std::thread, OpenMP, CUDA, ILGPU, Open MPI; Ubuntu 26.04, Slurm |
| 3. Розподілені системи | сокети, gRPC, CoreWCF, RabbitMQ, Microsoft Orleans, Docker, Kubernetes, Aspire, OpenTelemetry |
