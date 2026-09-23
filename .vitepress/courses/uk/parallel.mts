import type { Course } from "../sidebar.mts";

export default {
  slug: "parallel",
  title: "Паралельні та розподілені обчислення",
  modules: [
    {
      title: "Паралельне програмування мовою C#",
      topics: [
        {
          slug: "01-intro",
          short: "Основи паралельних обчислень",
          chapters: [
            ["why-parallel", "Навіщо паралельні обчислення"],
            ["architectures", "Архітектури паралельних систем"],
            ["models-laws", "Моделі, метрики та закони масштабування"],
            ["measurement-tools", "Вимірювання, .NET 10 і Rider"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "02-processes-threads",
          short: "Процеси та потоки",
          chapters: [
            ["processes", "Процеси та потоки ОС"],
            ["scheduling-affinity", "Планування та спорідненість"],
            ["dotnet-threads", "Процеси та клас Thread у .NET"],
            ["thread-pool", "Пул потоків і моніторинг"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "03-synchronization",
          short: "Синхронізація потоків",
          chapters: [
            ["race-conditions", "Стан гонитви та взаємне виключення"],
            ["locks-monitor", "Блокування та умовні змінні"],
            ["spinlocks-signals", "Спін-блокування та сигнальні засоби"],
            ["deadlock", "Взаємоблокування та ціна синхронізації"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "04-concurrent-collections",
          short: "Потокобезпечні колекції",
          chapters: [
            ["lock-free", "Колекції та неблокуючі алгоритми"],
            ["concurrent-collections", "Конкурентні та незмінні колекції"],
            ["producer-consumer", "Патерн «виробник–споживач» і канали"],
            ["false-sharing", "Кеш, хибне розділення та профілювання"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "05-tpl",
          short: "Задачі TPL і async/await",
          chapters: [
            ["task-basics", "Задачі, стани та продовження"],
            ["exceptions-cancellation", "Винятки, скасування та таймаути"],
            ["async-await", "Модель async/await"],
            ["async-practices", "Обмеження, антипатерни й налагодження"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "06-data-parallelism",
          short: "Паралелізм даних і PLINQ",
          chapters: [
            ["parallel-loops", "Паралельні цикли класу Parallel"],
            ["invoke-partitioning", "Parallel.Invoke і розбиття даних"],
            ["plinq-aggregation", "PLINQ та агрегація"],
            ["reduction-sorting", "Редукція, сортування та продуктивність"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "07-simd",
          short: "Векторизація SIMD",
          chapters: [
            ["simd-basics", "SIMD і типи System.Numerics"],
            ["fixed-width-intrinsics", "Вектори фіксованої ширини та інтринсики"],
            ["memory-tensor", "Пам’ять, хвіст і TensorPrimitives"],
            ["linear-algebra", "Лінійна алгебра та продуктивність"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "08-parallel-algorithms",
          short: "Паралельні алгоритми",
          chapters: [
            ["levels-models", "Рівні та моделі паралелізму"],
            ["grid-pcam", "Грід-системи та методологія Фостера"],
            ["decomposition", "Декомпозиція даних та інтегрування"],
            ["numerical-methods", "Чисельні методи та прогноз продуктивності"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
      ],
    },
    {
      title: "Високопродуктивні обчислення та кластери",
      topics: [
        {
          slug: "09-cpp-threads",
          short: "Багатопотоковість у C++",
          chapters: [
            ["toolchain", "GCC, CMake, Ninja і CLion"],
            ["threads-sync", "Потоки та синхронізація в C++"],
            ["atomics-async", "Атомарні операції та асинхронні результати"],
            ["std-algorithms", "Паралельні алгоритми та діагностика"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "10-openmp",
          short: "OpenMP",
          chapters: [
            ["fork-join", "Модель fork–join і паралельна область"],
            ["scope-loops", "Змінні, цикли та редукції"],
            ["sync-tasks", "Синхронізація, задачі та simd"],
            ["numa-affinity", "Продуктивність, NUMA і прив’язка потоків"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "11-gpu",
          short: "Обчислення на GPU",
          chapters: [
            ["gpu-architecture", "Архітектура GPU та екосистема CUDA"],
            ["cuda-model", "Модель програмування CUDA C++"],
            ["basic-patterns", "Збирання та базові паралельні шаблони"],
            ["shared-memory-streams", "Спільна пам’ять, потоки CUDA і бібліотеки"],
            ["ilgpu", "ILGPU, порівняння та типові помилки"],
          ],
        },
        {
          slug: "12-mpi",
          short: "Передавання повідомлень MPI",
          chapters: [
            ["mpi-setup", "Стандарт MPI і запуск програм"],
            ["point-to-point", "Двоточкові та неблокуючі обміни"],
            ["collectives", "Колективні операції та комунікатори"],
            ["hybrid-performance", "Гібридні програми й продуктивність"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "13-slurm-cluster",
          short: "Кластер і планувальник Slurm",
          chapters: [
            ["cluster-nodes", "Архітектура кластера та вузли"],
            ["ssh-nfs", "SSH і спільна файлова система"],
            ["slurm", "Планувальник Slurm і команди"],
            ["job-scripts", "Скрипти завдань і облік"],
            ["hpc-tuning", "Налаштування, моніторинг і типові помилки"],
          ],
        },
      ],
    },
    {
      title: "Розподілені системи та хмарні технології",
      topics: [
        {
          slug: "14-sockets-rpc",
          short: "Сокети, RPC і gRPC",
          chapters: [
            ["sockets", "Мережна взаємодія та сокети"],
            ["protocols", "Протоколи та надійність"],
            ["rpc-wcf", "Віддалений виклик процедур і WCF"],
            ["grpc", "gRPC і порівняння технологій"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "15-rabbitmq",
          short: "Брокер RabbitMQ",
          chapters: [
            ["messaging-rabbitmq", "Обмін повідомленнями та RabbitMQ"],
            ["client-work-queues", "Клієнт .NET і черги завдань"],
            ["exchanges-delivery", "Маршрутизація та гарантії доставки"],
            ["queues-rpc", "Типи черг, RPC та експлуатація"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "16-orleans",
          short: "Актори та Microsoft Orleans",
          chapters: [
            ["actors-orleans", "Модель акторів і проєкт Orleans"],
            ["grain-execution", "Виконання та стан зерен"],
            ["timers-cluster", "Таймери, потоки та кластер Orleans"],
            ["cap-consensus", "CAP, узгодженість і відмовостійкість"],
            ["case-studies", "Розбори та типові помилки"],
          ],
        },
        {
          slug: "17-containers",
          short: "Docker, Kubernetes, Aspire",
          chapters: [
            ["docker", "Контейнеризація та Docker"],
            ["images-compose", "Образи .NET і Docker Compose"],
            ["kubernetes", "Kubernetes: кластер і об’єкти"],
            ["scaling-aspire", "Масштабування та .NET Aspire"],
            ["observability", "Спостережуваність, розгортання та практики"],
          ],
        },
        {
          slug: "18-microservices",
          short: "Архітектура мікросервісів",
          chapters: [
            ["decomposition", "Моноліт і декомпозиція на сервіси"],
            ["gateway", "Взаємодія сервісів і API-шлюз"],
            ["data-saga", "Дані та патерн Saga"],
            ["outbox-resilience", "Outbox, Inbox і стійкість"],
            ["operations", "Спостережуваність, версіонування та розгортання"],
          ],
        },
      ],
    },
  ],
} satisfies Course;
