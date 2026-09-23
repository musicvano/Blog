---
title: "Таймери, потоки та кластер Orleans"
description: "Тема 16. Актори та Microsoft Orleans: Таймери, потоки та кластер Orleans"
outline: [2, 3]
---

# Таймери, потоки та кластер Orleans

## Таймери, нагадування, потоки та моніторинг

### Таймери

**Таймер зерна** реєструють методом `this.RegisterGrainTimer(callback, options)` (<https://learn.microsoft.com/dotnet/orleans/grains/timers-and-reminders>); старий `RegisterTimer` застарів. Параметри `GrainTimerCreationOptions`: `DueTime` (перше спрацювання), `Period`, `Interleave` (типово `false`: колбек – окремий хід, як виклик методу) і `KeepAlive` (типово `false`: таймер не заважає деактивації). Період відлічується від **завершення** попереднього колбеку. Таймер живе лише в активації: зупиняється після деактивації й відмови силосу. Зупиняють його `Dispose()` об’єкта `IGrainTimer`.

### Нагадування

**Нагадування** (*reminder*) – стійкий таймер: його опис зберігається у сховищі, тож нагадування спрацює навіть після деактивації зерна чи перезапуску кластера, активувавши зерно. Зерно реалізує `IRemindable.ReceiveReminder(name, status)` і реєструє нагадування `this.RegisterOrUpdateReminder(name, dueTime, period)`, скасовує – `this.UnregisterReminder`. Провайдери: `UseInMemoryReminderService()` (лише розробка, втрачається з силосом), `UseRedisReminderService` (пакет `Microsoft.Orleans.Reminders.Redis`), ADO.NET, Azure Table, Cosmos DB. Мінімальний період типово 1 хв (`ReminderOptions.MinimumReminderPeriod`): нагадування призначені для рідкісних подій (хвилини, години, дні), а не для частих тиків.

Обидва механізми порівнює табл. 16.2; перевірку обох провайдерів нагадувань з перезапуском процесу наведено в лабораторній роботі 16, приклад 1.

Таблиця 16.2. Таймери й нагадування Orleans {.caption}

| **Властивість** | **Таймер** | **Нагадування** |
| --- | --- | --- |
| прив’язка | до активації | до зерна (ідентичності) |
| після деактивації чи відмови | зникає | спрацьовує й активує зерно |
| сховище | не потрібне | потрібне (пам’ять, Redis, SQL…) |
| період | мілісекунди й секунди | хвилини й більше |
| приклади | відлік до старту гри, пакетний запис | покинутий кошик, щоденний звіт |

### Потоки Orleans

**Потоки Orleans** (*Orleans Streams*) доставляють послідовність подій від виробників до підписників за ідентифікатором `StreamId.Create("простір", "ключ")` (<https://learn.microsoft.com/dotnet/orleans/streaming/>). Потік не треба створювати: досить знати його ідентифікатор. Провайдер `AddMemoryStreams("events")` працює в пам’яті (для розробки), для промислових систем є провайдери черг Azure Event Hubs, Azure Queue, Amazon SQS. Підписки зберігаються у сховищі з назвою `PubSubStore`. Виробник отримує потік через `this.GetStreamProvider("events").GetStream<T>(id)` і викликає `OnNextAsync`, споживач – `SubscribeAsync`. Потоки, таймер і `[StatelessWorker]` разом використано в прикладі «Ігрове лобі».

### Моніторинг: OpenTelemetry і дашборд Aspire

Orleans публікує метрики в лічильнику (*meter*) `Microsoft.Orleans` і трасування в джерелах активностей `Microsoft.Orleans.Application` (виклики зерен), `Microsoft.Orleans.Lifecycle`, `Microsoft.Orleans.Storage`, `Microsoft.Orleans.Runtime` (<https://learn.microsoft.com/dotnet/orleans/host/monitoring/>). Їх передають за протоколом OTLP у будь-яку систему спостереження. Для розробки зручний окремий **дашборд Aspire** (<https://aspire.dev/dashboard/standalone/>) у контейнері (детально Aspire – тема 17):

```powershell
docker run -d --name pro15-dashboard -p 18888:18888 `
    -p 4317:18889 -e ASPIRE_DASHBOARD_UNSECURED_ALLOW_ANONYMOUS=true `
    mcr.microsoft.com/dotnet/aspire-dashboard:13.5
```

Щоб силос `Bank.Silo` надсилав телеметрію (перевірено):

- додати пакети OpenTelemetry 1.19.0: `OpenTelemetry.Extensions.Hosting` і `OpenTelemetry.Exporter.OpenTelemetryProtocol`;
- у `UseOrleans` викликати `silo.AddActivityPropagation()`;
- перед `builder.Build()` додати такий код:

```cs
builder.Services.AddOpenTelemetry()
    .ConfigureResource(r => r.AddService("bank-silo"))
    .WithMetrics(m => m.AddMeter("Microsoft.Orleans"))
    .WithTracing(t => t
        .AddSource("Microsoft.Orleans.Application")
        .AddSource("Microsoft.Orleans.Lifecycle"))
    .UseOtlpExporter();            // http://localhost:4317 (gRPC)
builder.Logging.AddOpenTelemetry(o => o.IncludeScopes = true);
```

Дашборд відкривають за адресою `http://localhost:18888` (рис. 16.7). На сторінці *Metrics* для ресурсу `bank-silo` з’являються, зокрема, `orleans-catalog-activations` (кількість активацій), `orleans-app-requests-latency` (затримка викликів), `orleans-storage-write-latency`, `orleans-gateway-connected-clients`; на сторінці *Traces* – спани викликів зерен. Метрики надсилаються раз на хвилину (типовий інтервал експорту), тому графіки з’являються не одразу. Змінна `ASPIRE_DASHBOARD_UNSECURED_ALLOW_ANONYMOUS` вимикає вхід за токеном лише для локальної розробки.

::: info Знімок екрана
Browser `http://localhost:18888` → Metrics, resource bank-silo, instrument orleans-catalog-activations (or orleans-app-requests-latency) as a chart while Bank.Client runs in a loop; left tree with Microsoft.Orleans instruments visible
:::

Рис. 16.7. Метрики Orleans у дашборді Aspire {.caption}

В Orleans 10 з’явився й власний **Orleans Dashboard** (пакет `Microsoft.Orleans.Dashboard`, поки у статусі preview): `siloBuilder.AddDashboard()` і `app.MapOrleansDashboard()` у вебзастосунку показують силоси, типи зерен, виклики й нагадування (<https://learn.microsoft.com/dotnet/orleans/dashboard/>).

## Кластер Orleans і відмови силосів

У промисловому кластері силоси знаходять одне одного через **таблицю членства** (`IMembershipTable`) у надійному сховищі: Redis (`UseRedisClustering`), ADO.NET, Azure Table, Cosmos DB, Consul, ZooKeeper, Cassandra, DynamoDB. Кожен силос записує туди свій рядок `ip:port:епоха`, а клієнти беруть звідти список шлюзів. Параметри `ClusterOptions`: `ClusterId` (кластер) і `ServiceId` (застосунок, ключ стану в сховищі, спільний для всіх розгортань). Силосам на одному ПК задають різні порти `ConfigureEndpoints(siloPort, gatewayPort)`.

**Виявлення відмов**: силоси надсилають одне одному **проби** (*probes*, хартбіти) тими самими TCP-з’єднаннями, що й повідомлення. Типові значення Orleans 10.3.1: кожен силос перевіряє до 10 інших (`NumProbedSilos`), таймаут проби 5 с, після 3 пропущених проб силос **підозрює** сусіда й записує підозру в таблицю; 2 підозри протягом 2 хв оголошують силос **мертвим**. Таблиця з оптимістичним блокуванням (ETag) гарантує, що всі силоси погоджуються з рішенням. Силос, якого оголосили мертвим, завершує роботу, навіть якщо насправді живий (ізоляція після розділення мережі). Опис протоколу: <https://learn.microsoft.com/dotnet/orleans/implementation/cluster-management>.

Після оголошення смерті силосу каталог зерен відновлюється, а наступний виклик зерна, що жило на мертвому силосі, активує його на іншому. **Стан у пам’яті втрачається**: уціліє лише те, що записано `WriteStateAsync`. Вимірювання на двох силосах з кластеризацією й станом у Redis (лабораторна робота 16, приклад 2): після аварійного завершення силосу виклики його зерен відмовляли (`ConnectionFailedException`, `OrleansMessageRejectionException`) приблизно 11 с, потім зерна продовжили роботу на другому силосі без втрати збережених лічильників. Коректна зупинка силосу (`StopAsync`) тривала 0,1 с і не дала жодної помилки.

::: info Знімок екрана
Windows Terminal with three panes (Sensors from Lab 16, example 2): silo 1 and silo 2 (`dotnet run -c Release -- silo 1|2`), client (`-- client`); silo 1 window closed; silo 2 shows «активація s1…s6, показників у сховищі: 10»; client lines «s1:1/10 …», one line «s1:збій …», then «s1:2/11 …» with continued counters
:::

Рис. 16.8. Відновлення після відмови силосу {.caption}
