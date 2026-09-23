---
title: "Підсумки"
description: "Тема 17. Docker, Kubernetes, Aspire: висновки та контрольні питання"
---

# Підсумки

## Висновки

Контейнери ізолюють процеси засобами ядра Linux (простори імен і cgroups) і запускаються значно швидше за віртуальні машини, а образ OCI з шарами однаково працює в Docker, containerd і Kubernetes. Образи .NET збирають багатоетапним `Dockerfile` або командою `dotnet publish /t:PublishContainer`; фінальний образ на `aspnet` чи chiseled-образі в чотири–сім разів менший за образ із SDK і запускається від непривілейованого користувача. Docker Compose описує стенд із кількох сервісів з мережами, томами, перевірками стану й масштабуванням; для застосунку з брокером RabbitMQ вісім робітників прискорили обчислення в 5,1 раза. Kubernetes керує кластером через бажаний стан: Deployment і ReplicaSet підтримують кількість подів і оновлюють їх без простою, Service балансує запити між готовими подами, проби відокремлюють «живий» від «готового», HPA масштабує за навантаженням, а Job розподіляє пакетні обчислення. Aspire описує модель застосунку кодом C#, запускає контейнери й проєкти з правильними рядками підключення, збирає журнали, метрики й розподілені трасування OpenTelemetry в дашборді та вміє генерувати артефакти для Docker Compose і Kubernetes. Спільні правила: конфігурація в середовищі, процеси без стану, коректна обробка `SIGTERM` та ідемпотентні операції.

## Питання для самоперевірки

1. Чим контейнер відрізняється від віртуальної машини? Які механізми ядра Linux його ізолюють?
2. Що таке образ, шар і реєстр? Навіщо стандарт OCI?
3. Які параметри `docker run` публікують порт, підключають том і передають змінну середовища?
4. Навіщо багатоетапне збирання? Чому `COPY *.csproj` і `dotnet restore` виконують до копіювання решти коду?
5. Чим відрізняються образи `sdk`, `aspnet`, `runtime`, chiseled і alpine?
6. Як зібрати образ .NET без `Dockerfile`? Які властивості MSBuild для цього використовують?
7. Як сервіси Compose знаходять один одного? Навіщо `healthcheck` і `depends_on` з `service_healthy`?
8. Що відбувається з контейнером під час `docker stop`? Як робітник має обробляти `SIGTERM`?
9. З яких компонентів складаються площина керування й робочий вузол Kubernetes?
10. Чим відрізняються Pod, ReplicaSet і Deployment? Як Service вибирає поди?
11. Які типи Service існують? Для чого ConfigMap і Secret?
12. Як працює поступове оновлення з `maxSurge` і `maxUnavailable`? Як виконати відкат?
13. Чим відрізняються `livenessProbe`, `readinessProbe` і `startupProbe`?
14. Що означають `requests` і `limits`? Що таке `OOMKilled`?
15. Як працює HorizontalPodAutoscaler? Що йому потрібно?
16. Чим Job відрізняється від Deployment? Що дають `parallelism` і `completionMode: Indexed`?
17. З яких частин складається рішення Aspire? Що роблять `WithReference`, `WaitFor` і `WithReplicas`?
18. Які сигнали OpenTelemetry існують? Як контекст трасування передається через RabbitMQ?
19. Чим `aspire publish` відрізняється від `aspire deploy`?

## Корисні посилання

- Документація Docker: <https://docs.docker.com/>
- Багатоетапне збирання: <https://docs.docker.com/build/building/multi-stage/>
- Довідник Compose: <https://docs.docker.com/reference/compose-file/services/>
- Образи .NET у контейнерах: <https://learn.microsoft.com/dotnet/core/docker/container-images>
- Публікація контейнера з .NET SDK: <https://learn.microsoft.com/dotnet/core/containers/sdk-publish>
- Компоненти Kubernetes: <https://kubernetes.io/docs/concepts/overview/components/>
- Deployment: <https://kubernetes.io/docs/concepts/workloads/controllers/deployment/>
- Service: <https://kubernetes.io/docs/concepts/services-networking/service/>
- Проби: <https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/>
- Job: <https://kubernetes.io/docs/concepts/workloads/controllers/job/>
- kind і локальний реєстр: <https://kind.sigs.k8s.io/docs/user/local-registry/>
- Aspire: <https://aspire.dev/>
- Розгортання Aspire в Kubernetes: <https://aspire.dev/deployment/kubernetes/clusters/>
- Сигнали OpenTelemetry: <https://opentelemetry.io/docs/concepts/signals/>
- Застосунок дванадцяти факторів: <https://12factor.net/>
