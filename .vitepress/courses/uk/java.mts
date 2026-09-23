import type { Course } from "../sidebar.mts";

export default {
  slug: "java",
  title: "ООП мовою Java",
  modules: [
    {
      title: "Основи мови Java",
      topics: [
        {
          slug: "01-intro",
          short: "Java і перша програма",
          chapters: [
            ["java-platform", "Платформа Java і JDK"],
            ["compile-run", "Компіляція, запуск і структура програми"],
            ["ide-and-errors", "IntelliJ IDEA, JShell і помилки"],
            ["git", "Git і передавання роботи"],
          ],
        },
        {
          slug: "02-types-control-flow",
          short: "Типи, операції, керування",
          chapters: [
            ["types-variables", "Типи, змінні та перетворення"],
            ["operations-io", "Операції та консольне введення"],
            ["branching", "Розгалуження: if і switch"],
            ["loops", "Цикли та інваріанти"],
          ],
        },
        {
          slug: "03-methods-arrays-strings",
          short: "Методи, масиви, рядки",
          chapters: [
            ["methods", "Методи та параметри"],
            ["recursion-arrays", "Рекурсія та масиви"],
            ["matrices-args", "Двовимірні масиви та аргументи"],
            ["strings-unicode", "Рядки String і Unicode"],
            ["text-building", "Складання тексту та регулярні вирази"],
          ],
        },
        {
          slug: "04-exceptions-debugging",
          short: "Винятки та налагодження",
          chapters: [
            ["exception-basics", "Винятки та ієрархія Throwable"],
            ["finally-throw", "finally, throw і throws"],
            ["custom-resources", "Власні винятки та ресурси"],
            ["debugging", "Перевірки та налагодження"],
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
            ["class-constructor", "Клас, поля та конструктор"],
            ["init-access-static", "Ініціалізація, доступ і статичні члени"],
            ["packages-jar", "Пакети, classpath і JAR"],
            ["utility-quality", "Утилітні класи та якість коду"],
          ],
        },
        {
          slug: "06-inheritance-polymorphism",
          short: "Наслідування та поліморфізм",
          chapters: [
            ["subclasses", "Підкласи та їхні конструктори"],
            ["overriding", "Перевизначення та приведення типів"],
            ["object-equality", "Object, рівність і копіювання"],
            ["composition", "Композиція та принцип підстановки"],
          ],
        },
        {
          slug: "07-abstract-interfaces",
          short: "Абстрактні класи, інтерфейси",
          chapters: [
            ["abstract-classes", "Абстрактні класи та шаблонний метод"],
            ["interfaces", "Інтерфейси та їхні методи"],
            ["ordering-iteration", "Порівняння та ітерація"],
            ["nested-classes", "Вкладені класи та стандартні контракти"],
          ],
        },
        {
          slug: "08-records-enums-sealed",
          short: "Записи, enum і sealed-класи",
          chapters: [
            ["records", "Записи та незмінність"],
            ["enums", "Переліки enum"],
            ["sealed-patterns", "Запечатані типи та зразки"],
            ["record-patterns", "Зразки записів і деконструкція"],
          ],
        },
        {
          slug: "09-generics",
          short: "Узагальнення (generics)",
          chapters: [
            ["generic-types", "Параметри типів, класи та методи"],
            ["bounds-invariance", "Обмеження та інваріантність"],
            ["wildcards", "Шаблони та принцип PECS"],
            ["erasure", "Стирання типів і його наслідки"],
            ["raw-types-contracts", "Сирі типи та стандартні контракти"],
          ],
        },
      ],
    },
    {
      title: "Стандартна бібліотека та інструменти",
      topics: [
        {
          slug: "10-collections",
          short: "Колекції",
          chapters: [
            ["interfaces-lists", "Інтерфейси колекцій і списки"],
            ["iterators-sets-queues", "Ітератори, множини та черги"],
            ["maps", "Словники та хешування"],
            ["choosing-collections", "Копії, обгортки та вибір колекції"],
          ],
        },
        {
          slug: "11-lambdas-streams",
          short: "Лямбди та Stream API",
          chapters: [
            ["functional-interfaces", "Функціональні інтерфейси"],
            ["method-refs-optional", "Посилання на методи та Optional"],
            ["stream-pipeline", "Конвеєр Stream API"],
            ["collectors", "Колектори та Gatherers"],
            ["parallel-testing", "Паралельність і перевірка конвеєра"],
          ],
        },
        {
          slug: "12-io-files",
          short: "Файли, NIO.2, серіалізація",
          chapters: [
            ["paths-streams", "Шляхи, потоки та кодування"],
            ["text-binary", "Текстові та двійкові дані"],
            ["nio-files", "Files і каталоги NIO.2"],
            ["serialization", "Серіалізація об’єктів"],
          ],
        },
        {
          slug: "13-modules-build-testing",
          short: "Модулі, Maven, Gradle, JUnit",
          chapters: [
            ["jpms", "Classpath і модулі JPMS"],
            ["maven", "Збирання з Maven"],
            ["gradle", "Той самий проєкт у Gradle"],
            ["junit", "Тестування з JUnit"],
          ],
        },
      ],
    },
    {
      title: "Бази даних і графічні застосунки",
      topics: [
        {
          slug: "14-jdbc",
          short: "Бази даних і JDBC",
          chapters: [
            ["postgresql", "Реляційна модель і PostgreSQL"],
            ["jdbc-queries", "JDBC і запити"],
            ["transactions", "Транзакції та конкурентність"],
            ["dao", "DAO, DataSource і перевірка"],
          ],
        },
        {
          slug: "15-javafx",
          short: "Графічні застосунки JavaFX",
          chapters: [
            ["first-app", "Перший застосунок JavaFX"],
            ["layout-controls", "Компонування та елементи керування"],
            ["events", "Події та потік інтерфейсу"],
            ["css-fxml", "CSS, FXML і розповсюдження"],
          ],
        },
        {
          slug: "16-mvc-data-binding",
          short: "MVC і прив’язка даних",
          chapters: [
            ["mvc-patterns", "Архітектурні шаблони та проєкт"],
            ["properties-bindings", "Властивості та прив’язки"],
            ["controllers-tables", "Контролери, таблиці та фонові задачі"],
            ["book-catalog", "Облік книг у PostgreSQL"],
          ],
        },
      ],
    },
  ],
} satisfies Course;
