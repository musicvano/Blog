import type { Course } from "../sidebar.mts";

// English navigation mirrors the Ukrainian course reading order.

export default {
  slug: "python",
  title: "Object-oriented programming in Python",
  modules: [
    {
      title: "Python language fundamentals",
      topics: [
        {
          slug: "01-intro",
          short: "Python, PyCharm, and Git",
          chapters: [
            ["python-language", "Python and CPython"],
            ["installation-pycharm", "Installing Python and PyCharm"],
            ["environments-packages", "Virtual environments and packages"],
            ["git", "Git version control"],
          ],
        },
        {
          slug: "02-types-control-flow",
          short: "Types, operations, control flow",
          chapters: [
            ["objects-types", "Objects, names, and data types"],
            ["operations-io", "Operations, input, and output"],
            ["branching", "Branching and pattern matching"],
            ["loops", "Loops and common algorithms"],
          ],
        },
        {
          slug: "03-functions",
          short: "Functions",
          chapters: [
            ["functions-arguments", "Function definitions and arguments"],
            ["parameters", "Parameter kinds and passing objects"],
            ["scopes", "Functions as values and scope"],
            ["recursion", "Recursion and the call stack"],
            ["type-hints", "Type hints and PyCharm"],
          ],
        },
        {
          slug: "04-exceptions-debugging",
          short: "Exceptions and debugging",
          chapters: [
            ["errors-hierarchy", "Error types and the exception hierarchy"],
            ["try-raise", "Handling and raising exceptions"],
            ["custom-exceptions", "Custom exceptions and exception groups"],
            ["validation-logging", "Validation, resources, and logging"],
            ["debugging", "Debugging in PyCharm and pdb"],
          ],
        },
      ],
    },
    {
      title: "Data structures and functional programming",
      topics: [
        {
          slug: "05-collections",
          short: "Built-in collections",
          chapters: [
            ["sequences-lists", "Sequences and lists"],
            ["comprehensions-tuples", "Comprehensions and tuples"],
            ["sets-dicts", "Sets and dictionaries"],
            ["collections-module", "The collections module and choosing a structure"],
            ["examples", "Program examples and common mistakes"],
          ],
        },
        {
          slug: "06-strings-regex",
          short: "Strings and regular expressions",
          chapters: [
            ["strings-unicode", "Strings and Unicode"],
            ["formatting", "f-strings and template strings"],
            ["regex", "Regular expressions"],
            ["examples", "Program examples and common mistakes"],
          ],
        },
        {
          slug: "07-iterators-decorators",
          short: "Generators and decorators",
          chapters: [
            ["iterators-generators", "Iterators and generator functions"],
            ["lazy-itertools", "Lazy evaluation and itertools"],
            ["higher-order", "Lambda expressions and decorators"],
            ["decorator-factories", "Parameterized decorators"],
          ],
        },
      ],
    },
    {
      title: "Object-oriented programming",
      topics: [
        {
          slug: "08-classes",
          short: "Classes and objects",
          chapters: [
            ["class-attributes", "Classes, initialization, and attributes"],
            ["encapsulation-properties", "Encapsulation and properties"],
            ["methods-representation", "Class methods and string representation"],
            ["identity-design", "Identity and class design"],
          ],
        },
        {
          slug: "09-inheritance-protocols",
          short: "Inheritance and protocols",
          chapters: [
            ["inheritance-polymorphism", "Inheritance and polymorphism"],
            ["abstract-classes", "Abstract classes and methods"],
            ["super-protocols", "super, protocols, and collection abstractions"],
            ["multiple-inheritance", "Multiple inheritance and composition"],
          ],
        },
        {
          slug: "10-special-methods",
          short: "Special methods, dataclass",
          chapters: [
            ["data-model", "The data model and arithmetic operations"],
            ["comparison-containers", "Comparison, hashing, and containers"],
            ["context-managers", "Context managers"],
            ["dataclasses-enums", "Data classes and enumerations"],
          ],
        },
        {
          slug: "11-modules-files-pytest",
          short: "Modules, files, pytest",
          chapters: [
            ["modules-packages", "Modules, packages, and the entry point"],
            ["files-pathlib", "Paths and text files"],
            ["json-csv", "JSON and CSV"],
            ["pytest", "Unit testing with pytest"],
          ],
        },
      ],
    },
    {
      title: "Data processing and GUI applications",
      topics: [
        {
          slug: "12-databases",
          short: "Databases, SQL, SQLAlchemy",
          chapters: [
            ["sql-basics", "The relational model and SQL"],
            ["sqlite3", "The sqlite3 module and query parameters"],
            ["joins-transactions", "Reports and transactions"],
            ["sqlalchemy", "The SQLAlchemy ORM"],
            ["repository-testing", "Repositories, tests, and common mistakes"],
          ],
        },
        {
          slug: "13-numpy-pandas-matplotlib",
          short: "NumPy, pandas, Matplotlib",
          chapters: [
            ["numpy-arrays", "Tools and NumPy arrays"],
            ["vector-ops", "Vectorized operations and slices"],
            ["pandas-tables", "Pandas tables and missing data"],
            ["grouping-plots", "Grouping, time series, and plots"],
            ["examples", "Program examples and common mistakes"],
          ],
        },
        {
          slug: "14-pyside6-widgets",
          short: "GUI applications with PySide6",
          chapters: [
            ["app-event-loop", "The application and the event loop"],
            ["widgets-signals", "Widgets, layouts, and signals"],
            ["validation", "Validation and linked fields"],
            ["main-window", "The main window, actions, and timers"],
            ["designer-styling", "Designer, styling, and testing"],
          ],
        },
        {
          slug: "15-model-view",
          short: "Model/View and databases",
          chapters: [
            ["models", "Models, indexes, and roles"],
            ["proxy-delegates", "Proxies, sorting, and delegates"],
            ["dialogs", "Custom dialogs"],
            ["database", "Qt SQL, repositories, and settings"],
          ],
        },
        {
          slug: "16-packaging-typing",
          short: "Packaging and typing",
          chapters: [
            ["project-structure", "Packages, distributions, and pyproject.toml"],
            ["build-distribution", "Versions, builds, and distribution"],
            ["generics-protocols", "Generic types and protocols"],
            ["static-analysis", "Static analysis and releases"],
          ],
        },
      ],
    },
  ],
} satisfies Course;
