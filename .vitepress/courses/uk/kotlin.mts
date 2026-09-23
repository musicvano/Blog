import type { Course } from "../sidebar.mts";

export default {
  slug: "kotlin",
  title: "ООП мовою Kotlin",
  modules: [
    {
      title: "Основи мови Kotlin",
      topics: [
        {
          slug: "01-intro",
          short: "Мова Kotlin і перша програма",
          chapters: [
            ["kotlin-jvm", "Kotlin, JVM і JDK"],
            ["intellij-gradle", "IntelliJ IDEA і Gradle-проєкт"],
            ["first-programs", "Перші програми"],
            ["build-git", "Збирання, передавання та Git"],
            ["troubleshooting", "Типові проблеми та перевірка"],
          ],
        },
        {
          slug: "02-types-null-safety",
          short: "Типи, null-безпека, керування",
          chapters: [
            ["values-types", "Значення, типи та перетворення"],
            ["null-safety", "Null-безпека та особливі типи"],
            ["operations-branching", "Операції та розгалуження"],
            ["loops", "Діапазони та цикли"],
            ["boundary-checks", "Контракти та граничні перевірки"],
          ],
        },
        {
          slug: "03-functions-strings",
          short: "Функції та рядки",
          chapters: [
            ["declaration", "Оголошення та види функцій"],
            ["parameters", "Параметри та аргументи"],
            ["recursion-extensions", "Рекурсія, інфіксні функції, розширення"],
            ["strings", "Рядки та шаблони рядків"],
            ["regex-testing", "Регулярні вирази та перевірка"],
          ],
        },
        {
          slug: "04-exceptions-debugging",
          short: "Винятки, Result, налагодження",
          chapters: [
            ["exceptions", "Винятки та try–catch"],
            ["expressions-preconditions", "Вирази try/throw і передумови"],
            ["result-resources", "Result і ресурси"],
            ["debugging", "Трасування стека та налагоджувач"],
            ["logic-errors-exit", "Логічні помилки та коди завершення"],
          ],
        },
      ],
    },
    {
      title: "Об’єктно-орієнтоване програмування",
      topics: [
        {
          slug: "05-classes",
          short: "Класи та об’єкти",
          chapters: [
            ["class-constructors", "Клас, конструктори та ініціалізація"],
            ["properties", "Властивості, аксесори та lateinit"],
            ["visibility-packages", "Видимість, пакети та вкладені класи"],
            ["uml-contract", "UML і контракт класу"],
            ["case-studies", "Розбори та типові помилки"],
          ],
        },
        {
          slug: "06-inheritance-interfaces",
          short: "Наслідування та поліморфізм",
          chapters: [
            ["inheritance", "Спільний тип і відкриті класи"],
            ["abstract-classes", "Абстрактні класи"],
            ["interfaces", "Інтерфейси та конфлікти реалізацій"],
            ["type-checks-any", "Приведення типів, Any та ініціалізація"],
            ["design-testing", "Шаблонний метод і перевірка ієрархії"],
          ],
        },
        {
          slug: "07-data-enum-sealed",
          short: "Класи даних, переліки, sealed",
          chapters: [
            ["data-classes", "Класи даних і копіювання"],
            ["enums-sealed", "Переліки та sealed-ієрархії"],
            ["objects", "Об’єкти-одинаки та компаньйони"],
            ["case-studies", "Вибір моделі та типові помилки"],
          ],
        },
        {
          slug: "08-operators-delegation",
          short: "Операції та делегування",
          chapters: [
            ["operator-basics", "Порівняння та складене присвоювання"],
            ["indexing-ranges", "Індексація, діапазони та ітерація"],
            ["delegated-properties", "Делеговані властивості"],
            ["class-delegation", "provideDelegate і делегування класів"],
          ],
        },
        {
          slug: "09-generics",
          short: "Узагальнене програмування",
          chapters: [
            ["type-parameters", "Параметри типу та узагальнені класи"],
            ["generic-functions", "Узагальнені функції та межі"],
            ["variance", "Варіантність і проєкції"],
            ["reified", "Стирання типів і reified"],
            ["api-design", "Проєктування та перевірка API"],
          ],
        },
      ],
    },
    {
      title: "Колекції, функціональне програмування та дані",
      topics: [
        {
          slug: "10-collections",
          short: "Масиви та колекції",
          chapters: [
            ["arrays", "Масиви"],
            ["lists", "Ієрархія колекцій і списки"],
            ["sets-maps", "Множини та словники"],
            ["traversal-sorting", "Обхід, черги та сортування"],
            ["case-studies", "Розбори та помилки проєктування"],
          ],
        },
        {
          slug: "11-lambdas-sequences",
          short: "Лямбди та послідовності",
          chapters: [
            ["lambdas", "Функціональні типи та лямбди"],
            ["closures-inline", "Замикання та inline-функції"],
            ["scope-functions", "Функції області видимості"],
            ["collection-operations", "Операції над колекціями"],
            ["sequences", "Послідовності та SAM-інтерфейси"],
          ],
        },
        {
          slug: "12-files-serialization-testing",
          short: "Файли, серіалізація, тести",
          chapters: [
            ["files", "Файли, текст і байти"],
            ["io-errors-csv", "Безпечний запис і формат CSV"],
            ["serialization", "Серіалізація JSON"],
            ["unit-testing", "Модульне тестування"],
          ],
        },
      ],
    },
    {
      title: "Асинхронність, бази даних і графічні застосунки",
      topics: [
        {
          slug: "13-coroutines-flow",
          short: "Корутини та Flow",
          chapters: [
            ["coroutines-basics", "Корутини та suspend-функції"],
            ["structured-concurrency", "Структурована паралельність"],
            ["dispatchers-state", "Диспетчери та спільний стан"],
            ["flow", "Асинхронні потоки Flow"],
            ["debugging-testing", "Налагодження та тести"],
          ],
        },
        {
          slug: "14-exposed-databases",
          short: "Бази даних з Exposed",
          chapters: [
            ["setup", "База даних і підключення"],
            ["tables-dsl", "Таблиці та DSL-запити"],
            ["relations", "Зв’язки та з’єднання"],
            ["dao-transactions", "DAO і транзакції"],
            ["repository-migrations", "Репозиторій, міграції та тести"],
          ],
        },
        {
          slug: "15-compose",
          short: "Compose Multiplatform",
          chapters: [
            ["declarative-ui", "Декларативний інтерфейс і проєкт"],
            ["composables-layout", "Composable-функції та компонування"],
            ["state-lists", "Підняття стану та списки"],
            ["material-effects", "Material 3 і побічні ефекти"],
            ["resources-distribution", "Ресурси, тема та розповсюдження"],
          ],
        },
        {
          slug: "16-mvvm-navigation",
          short: "MVVM і навігація",
          chapters: [
            ["mvvm-udf", "MVVM і односпрямований потік"],
            ["navigation", "Навігація як стан історії"],
            ["repository", "Репозиторій і завантаження даних"],
            ["events-testing", "Події, тести та пакування"],
          ],
        },
      ],
    },
  ],
} satisfies Course;
