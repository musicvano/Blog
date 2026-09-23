import type { Course } from "../sidebar.mts";

export default {
  slug: "csharp",
  title: "ООП мовою C#",
  modules: [
    {
      title: "Основи мови C#",
      topics: [
        {
          slug: "01-dotnet-intro",
          short: ".NET і структура програми",
          chapters: [
            ["dotnet-platform", "Мова C# і платформа .NET"],
            ["dev-tools", "Встановлення та середовища розробки"],
            ["cli-program-structure", "dotnet CLI і структура програми"],
            ["console-io", "Консольне введення та виведення"],
            ["debugging-problems", "Налагодження та типові проблеми"],
          ],
        },
        {
          slug: "02-types-operators",
          short: "Типи, змінні, операції",
          chapters: [
            ["type-system", "Система типів і числові типи"],
            ["variables-null", "Символи, рядки, змінні та null"],
            ["conversions-arithmetic", "Перетворення та арифметика"],
            ["logic-math", "Логічні операції та клас Math"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "03-control-flow",
          short: "Розгалуження та цикли",
          chapters: [
            ["branching", "Блоки та умовний оператор"],
            ["switch-patterns", "switch і шаблони"],
            ["loops", "Цикли"],
            ["jumps-algorithms", "Переходи та типові алгоритми"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "04-arrays-strings",
          short: "Масиви та рядки",
          chapters: [
            ["arrays", "Одновимірні масиви"],
            ["array-class-multidim", "Клас Array і багатовимірні масиви"],
            ["strings", "Рядки та форматування"],
            ["stringbuilder-unicode", "StringBuilder, Unicode і регулярні вирази"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "05-methods",
          short: "Методи, параметри, рекурсія",
          chapters: [
            ["method-basics", "Оголошення методів"],
            ["parameters", "Передавання параметрів"],
            ["overloading-recursion", "Перевантаження та рекурсія"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "06-debugging-exceptions",
          short: "Налагодження та винятки",
          chapters: [
            ["debugger", "Помилки та налагоджувач"],
            ["assert-exceptions", "Debug.Assert і обробка винятків"],
            ["throwing-strategy", "Генерування винятків і стратегія"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
      ],
    },
    {
      title: "Об’єктно-орієнтоване програмування",
      topics: [
        {
          slug: "07-classes",
          short: "Класи та об’єкти",
          chapters: [
            ["class-basics", "Класи, об’єкти та поля"],
            ["properties-constructors", "Властивості та конструктори"],
            ["initializers-conventions", "Ініціалізатори, ToString і угоди"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "08-encapsulation-static",
          short: "Інкапсуляція та статичні члени",
          chapters: [
            ["access-modifiers", "Інкапсуляція та модифікатори доступу"],
            ["state-protection", "Захист стану та поля readonly"],
            ["static-namespaces", "Статичні члени та простори імен"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "09-inheritance-polymorphism",
          short: "Наслідування та поліморфізм",
          chapters: [
            ["inheritance", "Наслідування та конструктори"],
            ["virtual-polymorphism", "Віртуальні методи та поліморфізм"],
            ["casting-composition", "Приведення, sealed і композиція"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "10-abstract-interfaces",
          short: "Абстрактні класи, інтерфейси",
          chapters: [
            ["abstract-classes", "Абстракція та абстрактні класи"],
            ["interfaces", "Інтерфейси"],
            ["standard-interfaces", "Стандартні інтерфейси та вибір"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "11-structs-records",
          short: "Структури, записи, кортежі",
          chapters: [
            ["structs", "Структури"],
            ["records", "Записи"],
            ["enums-tuples", "Перелічення та кортежі"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "12-operators-indexers",
          short: "Операції та індексатори",
          chapters: [
            ["operator-overloading", "Перевантаження операцій"],
            ["indexers", "Індексатори"],
            ["extension-methods", "Методи розширення"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
      ],
    },
    {
      title: "Розширені можливості C# і .NET",
      topics: [
        {
          slug: "13-generics-collections",
          short: "Узагальнення та колекції",
          chapters: [
            ["generics", "Узагальнені методи й класи"],
            ["collections", "Колекції .NET"],
            ["iterators", "Ітератори"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "14-delegates-events",
          short: "Делегати, лямбди, події",
          chapters: [
            ["delegates", "Делегати"],
            ["lambdas-closures", "Лямбда-вирази та замикання"],
            ["events", "Події"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "15-linq",
          short: "LINQ",
          chapters: [
            ["linq-basics", "Основи LINQ"],
            ["execution-aggregation", "Виконання та агрегування"],
            ["grouping-joins", "Групування, з’єднання та устрій LINQ"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "16-files-json",
          short: "Файли, потоки та JSON",
          chapters: [
            ["filesystem-encoding", "Файлова система та кодування"],
            ["streams-csv", "Потоки та формат CSV"],
            ["json-async", "JSON та асинхронні операції"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "17-solid-patterns",
          short: "SOLID і шаблони проєктування",
          chapters: [
            ["solid-di", "SOLID і впровадження залежностей"],
            ["design-patterns", "Шаблони проєктування"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
        {
          slug: "18-testing-refactoring",
          short: "Тестування та рефакторинг",
          chapters: [
            ["testing-basics", "Тести та MSTest"],
            ["running-isolation", "Запуск, ізоляція, TDD і покриття"],
            ["refactoring", "Рефакторинг"],
            ["case-studies", "Приклади та типові помилки"],
          ],
        },
      ],
    },
  ],
} satisfies Course;
