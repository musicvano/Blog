---
title: "Спостережуваність, розгортання та практики"
description: "Тема 17. Docker, Kubernetes, Aspire: Спостережуваність, розгортання та практики"
outline: [2, 3]
---

# Спостережуваність, розгортання та практики

## Спостережуваність: OpenTelemetry

У розподіленій системі один запит проходить через кілька процесів, і журналу одного процесу замало. **OpenTelemetry** (<https://opentelemetry.io/docs/concepts/signals/>) – відкритий стандарт і набір бібліотек для трьох **сигналів**:

- **журнали** (*logs*) – структуровані записи `ILogger` з рівнем, шаблоном і параметрами;
- **метрики** (*metrics*) – числові ряди: лічильники, гістограми (кількість запитів, затримка, активації зерен Orleans з теми 16);
- **трасування** (*traces*) – дерево **спанів** (*spans*) одного запиту через усі сервіси; кожен спан має ідентифікатор трасування, батьківський спан, час початку й тривалість.

У .NET трасування будується на `System.Diagnostics.Activity` (`ActivitySource`), метрики – на `System.Diagnostics.Metrics` (`Meter`). Контекст трасування передається між процесами заголовками: HTTP-заголовком `traceparent` (стандарт W3C Trace Context) і заголовками повідомлень RabbitMQ (`RabbitMQ.Client` 7 додає їх сам). Дані надсилаються за протоколом **OTLP**: Aspire задає кожному проєкту змінні `OTEL_EXPORTER_OTLP_ENDPOINT`, `OTEL_SERVICE_NAME` тощо, і `AddServiceDefaults` вмикає експортер лише тоді, коли адреса задана (<https://aspire.dev/fundamentals/telemetry/>).

Після одного завдання на 40 частин команда `aspire otel traces api` показала трасування `POST /jobs` з 81 спаном, а `aspire otel spans --trace-id …` – його структуру:

```
00:11:47.519 OK  29.57ms api: POST /jobs
00:11:47.539 OK   3.11ms api: publish primes
00:11:47.543 OK   0.06ms api: publish primes
…                                         (усього 40 publish)
00:11:47.550 OK    0.11s worker-nqzwxwga: deliver primes
00:11:47.550 OK  93.36ms worker-euvtpmpg: deliver primes
00:11:47.550 OK  63.39ms worker-ugmdxbyv: deliver primes
…                                         (усього 40 deliver)
00:11:49.711 OK    0.21s worker-ugmdxbyv: deliver primes
```

Одне трасування охопило HTTP-запит до API, 40 публікацій у RabbitMQ і 40 обробок у трьох процесах-робітниках: видно, яка частина скільки рахувалася і яким робітником. На сторінці *Traces* дашборду те саме подано діаграмою Ганта (рис. 17.15), на сторінці *Metrics* – метрики ASP.NET Core, HTTP-клієнта й середовища виконання, на сторінці *Structured logs* – журнали всіх процесів з фільтрами.

::: info Знімок екрана
Aspire dashboard → Traces → trace «api: POST /jobs» opened: waterfall with the POST /jobs span, the publish primes spans and deliver primes spans of three worker resources
:::

Рис. 17.15. Розподілене трасування API → RabbitMQ → робітник {.caption}

## Розгортання з Aspire

AppHost описує не лише локальний запуск, а й розгортання (<https://aspire.dev/deployment/docker-compose/>):

- `aspire publish` – згенерувати артефакти для цільового середовища (файли Compose, діаграму Helm) з незаповненими параметрами;
- `aspire deploy` – зібрати образи, заповнити параметри й застосувати розгортання;
- `aspire destroy` – видалити розгорнуте.

Ціль задає **обчислювальне середовище** в AppHost. Для Docker Compose – пакет `Aspire.Hosting.Docker` (13.5.4) і рядок `builder.AddDockerComposeEnvironment("compose");`. Команда `aspire publish -o out-compose` за 4 с створила `docker-compose.yaml` і `.env` з параметрами `API_IMAGE`, `RABBITMQ_PASSWORD`, `REDIS_PASSWORD` тощо; сервіси отримали ті самі змінні `ConnectionStrings__…`, а також контейнер дашборду для телеметрії. `aspire deploy -o out-compose` за 41 с зібрав образи проєктів (`dotnet publish /t:PublishContainer`), запустив `docker compose up` і вивів адреси `api: http://localhost:56660` і дашборду. Завдання на $2 \cdot 10^{7}$ виконалося, але за 5,0 с, бо у згенерованому файлі Compose робітник **один**: `WithReplicas(3)` не перенесено.

Для Kubernetes – пакет `Aspire.Hosting.Kubernetes` (станом на вересень 2026 р. – лише попередня версія `13.5.4-preview.1.26464.4`) і реєстр образів, доступний і з ПК, і з вузлів:

```cs
// Ціль розгортання: кластер Kubernetes (Helm) і реєстр образів.
#pragma warning disable ASPIRECOMPUTE003
var registry = builder.AddContainerRegistry("registry",
    "localhost:5001");
builder.AddKubernetesEnvironment("k8s")
    .WithContainerRegistry(registry);
```

`aspire publish -o out-k8s` створює діаграму Helm (<https://helm.sh/docs/>): `Chart.yaml`, `values.yaml` і шаблони Deployment, StatefulSet (для RabbitMQ і Redis), Service, ConfigMap і Secret для кожного ресурсу; робітник отримав `replicas: 3`. `aspire deploy` потребує Helm 4.2 або новішого (<https://aspire.dev/deployment/kubernetes/clusters/>): з Helm 4.3.0 він за 46 с зібрав образи, надіслав їх у `localhost:5001` і встановив реліз `production` у простір імен `default` поточного контексту `kind-pro16`. Через `kubectl port-forward svc/api-service 18080:8080` завдання на $2 \cdot 10^{7}$ виконалося за 1,9 с трьома подами робітника. `aspire destroy` видалив реліз.

Висновок: Aspire зручний для розробки й швидкого розгортання, але згенеровані маніфести варто переглядати: вони не містять проб, ресурсів і стратегії оновлення, які в ручних маніфестах задано явно, а ціль Kubernetes поки має статус попередньої версії.

## Практики побудови контейнерних застосунків

Правила **застосунку дванадцяти факторів** (<https://12factor.net/>) і досвід цієї лекції:

- **конфігурація в середовищі**: рядки підключення, паролі, адреси передаються змінними середовища (`ConnectionStrings__…`), ConfigMap і Secret, а не вбудовуються в образ;
- **один образ для всіх середовищ**: той самий `primes-api:1.1` працює в розробці, тестуванні й експлуатації, змінюється лише конфігурація; образи мають незмінні теги;
- **процеси без стану**: стан завдань лежить у Redis, повідомлення – у RabbitMQ, тому будь-який екземпляр API чи робітника можна зупинити або додати;
- **швидкий старт і коректне завершення**: обробка `SIGTERM`, завершення поточної роботи, ідемпотентні операції для повторних доставок;
- **журнали в stdout**: контейнер пише журнал у стандартний вивід, а збирають його `docker logs`, `kubectl logs` чи OpenTelemetry;
- **перевірки стану**: окремі ендпоінти «живий» і «готовий»;
- **мінімальні образи й непривілейований користувач**: багатоетапне збирання, chiseled-образи, `USER $APP_UID`, регулярне оновлення базових образів.

табл. 17.4 порівнює три інструменти лекції.

Таблиця 17.4. Docker Compose, Kubernetes і Aspire {.caption}

| **Властивість** | **Docker Compose** | **Kubernetes** | **Aspire** |
| --- | --- | --- | --- |
| опис | `compose.yaml` | маніфести YAML, Helm | код C# (AppHost) |
| вузли | один комп’ютер | кластер | ПК розробника; розгортання в Compose чи K8s |
| масштабування | `--scale` | `replicas`, HPA | `WithReplicas` |
| самовідновлення | `restart`-політика | контролери, проби | перезапуск ресурсів з дашборду |
| оновлення | перестворення контейнерів | поступове, відкат | через ціль розгортання |
| телеметрія | окремо | окремо | дашборд і OpenTelemetry з коробки |

## Типові помилки

#[

Таблиця 17.5. Типові помилки контейнеризації та оркестрації {.caption}

| **Проблема** | **Причина та виправлення** |
| --- | --- |
| `dotnet publish` у `Dockerfile` падає з помилками про `obj/project.assets.json` | у контекст збирання потрапили теки `bin/` і `obj/` з Windows; додати `.dockerignore` |
| контейнер API не приймає з’єднань на порту 80 | ASP.NET Core у контейнері з .NET 8 слухає 8080; публікувати `-p 8080:8080` |
| `ACCESS_REFUSED` від RabbitMQ з іншого контейнера | користувач `guest` працює лише з `localhost`; створити користувача змінними `RABBITMQ_DEFAULT_USER`/`PASS` |
| API стартує раніше за брокер і завершується з винятком | `depends_on` з `condition: service_healthy` і `healthcheck`; повтори підключення в коді (`Backend`) |
| `exec: "sh": executable file not found` | chiseled-образ без оболонки; налагоджувати журналами або тимчасово зібрати на `aspnet:10.0` |
| под у стані `ImagePullBackOff`/`ErrImagePull` | неправильний тег або реєстр недоступний з вузлів; для kind – `hosts.toml` і `docker network connect kind pro16-registry` |
| після `docker push` з тим самим тегом поди запускають стару версію | `IfNotPresent` бере образ з кешу вузла; новий тег для кожної збірки |
| RabbitMQ у `CrashLoopBackOff`: `.erlang.cookie: eacces` | проба `exec` від root створила файл раніше за сервер; проба `tcpSocket` |
| помилки запитів під час `rolling update` | под закриває порт раніше, ніж його прибрано зі служби; `preStop` з паузою, обробка `SIGTERM` |
| повторна обробка повідомлень після зупинки робітника | канал закрито до підтвердження; дочекатися поточного повідомлення, ідемпотентний запис |
| HPA показує `cpu: <unknown>` | не встановлено metrics-server або в kind немає `--kubelet-insecure-tls`; у поді не задано `requests.cpu` |
| Aspire: `Conflict. The container name "/pro16-redis" is already in use` | `WithContainerName` і швидкий перезапуск: попередній контейнер ще видаляється; зачекати кілька секунд або не задавати ім’я |
| Aspire: ресурс `Unhealthy`, `aspire otel` – помилка SSL | не довірено сертифікат розробника; `aspire certs trust` або профіль `http` |

]
