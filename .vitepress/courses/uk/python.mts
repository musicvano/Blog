import type { Course } from "../sidebar.mts";

export default {
  slug: "python",
  title: "Об’єктно-орієнтоване програмування Python",
  modules: [
    {
      title: "Основи мови Python",
      topics: [
        {
          slug: "01-intro",
          short: "Python, PyCharm і Git",
          chapters: [
            ["python-language", "Мова Python і CPython"],
            ["installation-pycharm", "Встановлення Python і PyCharm"],
            ["environments-packages", "Віртуальні середовища та пакети"],
            ["git", "Контроль версій Git"],
          ],
        },
        {
          slug: "02-types-control-flow",
          short: "Типи, операції, керування",
          chapters: [
            ["objects-types", "Об’єкти, імена та типи даних"],
            ["operations-io", "Операції, введення та виведення"],
            ["branching", "Розгалуження та зіставлення"],
            ["loops", "Цикли та типові алгоритми"],
          ],
        },
        {
          slug: "03-functions",
          short: "Функції",
          chapters: [
            ["functions-arguments", "Оголошення функцій та аргументи"],
            ["parameters", "Види параметрів і передавання об’єктів"],
            ["scopes", "Функції як значення та області видимості"],
            ["recursion", "Рекурсія та стек викликів"],
            ["type-hints", "Анотації типів і PyCharm"],
          ],
        },
        {
          slug: "04-exceptions-debugging",
          short: "Винятки та налагодження",
          chapters: [
            ["errors-hierarchy", "Види помилок та ієрархія винятків"],
            ["try-raise", "Обробка та генерування винятків"],
            ["custom-exceptions", "Власні винятки та їхні групи"],
            ["validation-logging", "Валідація, ресурси та журналювання"],
            ["debugging", "Налагодження в PyCharm і pdb"],
          ],
        },
      ],
    },
    {
      title: "Структури даних і функціональне програмування",
      topics: [
        {
          slug: "05-collections",
          short: "Вбудовані колекції",
          chapters: [
            ["sequences-lists", "Послідовності та списки"],
            ["comprehensions-tuples", "Включення та кортежі"],
            ["sets-dicts", "Множини та словники"],
            ["collections-module", "Модуль collections і вибір структури"],
            ["examples", "Приклади програм і типові помилки"],
          ],
        },
        {
          slug: "06-strings-regex",
          short: "Рядки та регулярні вирази",
          chapters: [
            ["strings-unicode", "Рядки та Unicode"],
            ["formatting", "f-рядки та шаблонні рядки"],
            ["regex", "Регулярні вирази"],
            ["examples", "Приклади програм і типові помилки"],
          ],
        },
        {
          slug: "07-iterators-decorators",
          short: "Генератори та декоратори",
          chapters: [
            ["iterators-generators", "Ітератори та генераторні функції"],
            ["lazy-itertools", "Ліниві обчислення та itertools"],
            ["higher-order", "Лямбда-вирази та декоратори"],
            ["decorator-factories", "Параметризовані декоратори"],
          ],
        },
      ],
    },
    {
      title: "Об’єктно-орієнтоване програмування",
      topics: [
        {
          slug: "08-classes",
          short: "Класи та об’єкти",
          chapters: [
            ["class-attributes", "Клас, ініціалізація та атрибути"],
            ["encapsulation-properties", "Інкапсуляція та властивості"],
            ["methods-representation", "Методи класу та рядкове подання"],
            ["identity-design", "Ідентичність і проєктування класу"],
          ],
        },
        {
          slug: "09-inheritance-protocols",
          short: "Наслідування та протоколи",
          chapters: [
            ["inheritance-polymorphism", "Наслідування та поліморфізм"],
            ["abstract-classes", "Абстрактні класи та методи"],
            ["super-protocols", "super, протоколи та абстракції колекцій"],
            ["multiple-inheritance", "Множинне наслідування та композиція"],
          ],
        },
        {
          slug: "10-special-methods",
          short: "Спеціальні методи, dataclass",
          chapters: [
            ["data-model", "Модель даних і арифметичні операції"],
            ["comparison-containers", "Порівняння, хешування та контейнери"],
            ["context-managers", "Менеджери контексту"],
            ["dataclasses-enums", "Класи даних і переліки"],
          ],
        },
        {
          slug: "11-modules-files-pytest",
          short: "Модулі, файли, pytest",
          chapters: [
            ["modules-packages", "Модулі, пакети й точка входу"],
            ["files-pathlib", "Шляхи та текстові файли"],
            ["json-csv", "JSON і CSV"],
            ["pytest", "Модульне тестування з pytest"],
          ],
        },
      ],
    },
    {
      title: "Опрацювання даних і графічні застосунки",
      topics: [
        {
          slug: "12-databases",
          short: "Бази даних, SQL, SQLAlchemy",
          chapters: [
            ["sql-basics", "Реляційна модель і SQL"],
            ["sqlite3", "Модуль sqlite3 і параметри запитів"],
            ["joins-transactions", "Звіти та транзакції"],
            ["sqlalchemy", "ORM SQLAlchemy"],
            ["repository-testing", "Репозиторій, тести та типові помилки"],
          ],
        },
        {
          slug: "13-numpy-pandas-matplotlib",
          short: "NumPy, pandas, Matplotlib",
          chapters: [
            ["numpy-arrays", "Інструменти та масиви NumPy"],
            ["vector-ops", "Векторні операції та зрізи"],
            ["pandas-tables", "Таблиці pandas і пропуски"],
            ["grouping-plots", "Групування, часові ряди та графіки"],
            ["examples", "Приклади програм і типові помилки"],
          ],
        },
        {
          slug: "14-pyside6-widgets",
          short: "Графічні застосунки PySide6",
          chapters: [
            ["app-event-loop", "Застосунок і цикл подій"],
            ["widgets-signals", "Віджети, компонування та сигнали"],
            ["validation", "Валідація і зв’язані поля"],
            ["main-window", "Головне вікно, дії та таймери"],
            ["designer-styling", "Designer, оформлення та перевірка"],
          ],
        },
        {
          slug: "15-model-view",
          short: "Model/View і бази даних",
          chapters: [
            ["models", "Моделі, індекси та ролі"],
            ["proxy-delegates", "Проксі, сортування та делегати"],
            ["dialogs", "Власні діалоги"],
            ["database", "Qt SQL, репозиторій і налаштування"],
          ],
        },
        {
          slug: "16-packaging-typing",
          short: "Пакування та типізація",
          chapters: [
            ["project-structure", "Пакет, дистрибутив і pyproject.toml"],
            ["build-distribution", "Версії, збирання та розповсюдження"],
            ["generics-protocols", "Узагальнені типи та протоколи"],
            ["static-analysis", "Статичний аналіз і реліз"],
          ],
        },
      ],
    },
  ],
} satisfies Course;
