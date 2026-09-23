import type { Course } from "../sidebar.mts";

export default {
  slug: "cpp",
  title: "ООП мовою C++",
  modules: [
    {
      title: "Основи мови C++",
      topics: [
        {
          slug: "01-intro",
          short: "Мова C++ і перша програма",
          chapters: [
            ["cpp-language", "Мова C++ і стандарти"],
            ["visual-studio", "Visual Studio і перший проєкт"],
            ["build-and-debug", "Збирання та налагодження"],
            ["git", "Керування версіями Git"],
          ],
        },
        {
          slug: "02-types-control-flow",
          short: "Типи, операції, керування",
          chapters: [
            ["types-variables", "Типи, змінні та константи"],
            ["operations-io", "Операції, виведення та введення"],
            ["control-flow", "Розгалуження та цикли"],
            ["algorithms", "Від вимог до алгоритму"],
          ],
        },
        {
          slug: "03-functions",
          short: "Функції",
          chapters: [
            ["functions-parameters", "Функції та передавання параметрів"],
            ["overloading-results", "Перевантаження та результати"],
            ["recursion-organization", "Рекурсія та організація програми"],
            ["interface-design", "Проєктування інтерфейсу функцій"],
          ],
        },
        {
          slug: "04-arrays-strings",
          short: "Масиви, рядки, vector",
          chapters: [
            ["array-vector", "std::array і std::vector"],
            ["search-sort-matrix", "Пошук, сортування та матриці"],
            ["strings", "Рядки та string_view"],
            ["bounds-algorithms", "Межі, зміни та розбір алгоритмів"],
            ["text-format-memory", "Текстовий формат і пам’ять"],
          ],
        },
        {
          slug: "05-pointers-memory",
          short: "Вказівники та пам’ять",
          chapters: [
            ["pointers", "Пам’ять і вказівники"],
            ["dynamic-memory", "Динамічна пам’ять і її помилки"],
            ["smart-pointers", "Розумні вказівники"],
            ["ownership", "Моделі володіння та span"],
            ["experiments", "Діагностичні досліди"],
          ],
        },
        {
          slug: "06-errors-debugging",
          short: "Налагодження та помилки",
          chapters: [
            ["errors-debugger", "Помилки та налагоджувач"],
            ["assert-exceptions", "assert і винятки"],
            ["noexcept-expected", "noexcept, optional та expected"],
            ["error-strategy", "Стратегія обробки помилок"],
            ["exception-guarantees", "Перевірка гарантій після відмови"],
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
            ["class-invariant", "Клас, інваріант і конструктори"],
            ["composition-lifetime", "Композиція та життя об’єктів"],
            ["class-members", "const, static та агрегати"],
            ["interface-design", "Проєктування та перевірка класу"],
            ["case-studies", "Розбори та типові помилки"],
          ],
        },
        {
          slug: "08-copy-move-raii",
          short: "Копіювання, переміщення, RAII",
          chapters: [
            ["copy-move", "Копіювання та переміщення"],
            ["raii-rules", "RAII і правило нуля, трьох і п’яти"],
            ["value-categories", "Категорії значень і copy-and-swap"],
            ["case-studies", "Розбори та типові помилки"],
          ],
        },
        {
          slug: "09-operators",
          short: "Перевантаження операцій",
          chapters: [
            ["operator-basics", "Операції як інтерфейс"],
            ["indexing-call", "Індексування, виклик та інкремент"],
            ["comparison-friends-io", "Порівняння, друзі та потоки"],
            ["case-studies", "Розбори та типові помилки"],
          ],
        },
        {
          slug: "10-inheritance-polymorphism",
          short: "Наслідування та поліморфізм",
          chapters: [
            ["is-a-construction", "Відношення «є» та ієрархія"],
            ["access-exceptions", "protected та ієрархія винятків"],
            ["virtual-functions", "Віртуальні функції"],
            ["case-studies", "Розбори та типові помилки"],
          ],
        },
        {
          slug: "11-abstract-interfaces",
          short: "Абстрактні класи, інтерфейси",
          chapters: [
            ["abstract-nvi", "Абстрактні класи та NVI"],
            ["diamond-strategy", "Віртуальна база та стратегія"],
            ["interfaces-patterns", "Інтерфейси та шаблони взаємодії"],
            ["case-studies", "Розбори та типові помилки"],
          ],
        },
      ],
    },
    {
      title: "Узагальнене програмування та бібліотека",
      topics: [
        {
          slug: "12-templates-concepts",
          short: "Шаблони та концепти",
          chapters: [
            ["function-templates", "Шаблони функцій і концепти"],
            ["class-templates", "Шаблони класів"],
            ["variadic-requires", "Пакети параметрів і requires"],
          ],
        },
        {
          slug: "13-containers",
          short: "Контейнери",
          chapters: [
            ["sequence-containers", "Послідовні контейнери"],
            ["associative", "Асоціативні та хеш-контейнери"],
            ["adapters", "Адаптери та нові інтерфейси"],
            ["case-studies", "Розбори та типові помилки"],
          ],
        },
        {
          slug: "14-iterators-algorithms-ranges",
          short: "Ітератори, алгоритми, ranges",
          chapters: [
            ["iterators", "Ітератори та недійсність"],
            ["lambdas", "Лямбда-вирази та функтори"],
            ["algorithms", "Алгоритми стандартної бібліотеки"],
            ["ranges", "Ranges та подання"],
            ["case-studies", "Розбори та типові помилки"],
          ],
        },
        {
          slug: "15-io-files",
          short: "Потоки та файли",
          chapters: [
            ["streams-states", "Потоки та їхні стани"],
            ["text-binary", "Текстові та двійкові файли"],
            ["filesystem", "std::filesystem"],
          ],
        },
        {
          slug: "16-modules-cpp26",
          short: "Модулі та C++26",
          chapters: [
            ["multi-file", "Багатофайлові проєкти та ODR"],
            ["libraries-modules", "Бібліотеки та модулі"],
            ["cmake-cpp26", "CMake та C++26"],
          ],
        },
      ],
    },
  ],
} satisfies Course;
