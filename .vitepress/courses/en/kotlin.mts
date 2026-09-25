import type { Course } from "../sidebar.mts";

// English navigation mirrors the Ukrainian course reading order.

export default {
  slug: "kotlin",
  title: "Object-oriented programming in Kotlin",
  modules: [
    {
      title: "Kotlin language fundamentals",
      topics: [
        {
          slug: "01-intro",
          short: "Kotlin and your first program",
          chapters: [
            ["kotlin-jvm", "Kotlin, JVM, and JDK"],
            ["intellij-gradle", "IntelliJ IDEA and a Gradle project"],
            ["first-programs", "Your first programs"],
            ["build-git", "Building, sharing, and Git"],
            ["troubleshooting", "Common problems and checks"],
          ],
        },
        {
          slug: "02-types-null-safety",
          short: "Types and null safety",
          chapters: [
            ["values-types", "Values, types, and conversions"],
            ["null-safety", "Null safety and special types"],
            ["operations-branching", "Operations and branching"],
            ["loops", "Ranges and loops"],
            ["boundary-checks", "Contracts and boundary checks"],
          ],
        },
        {
          slug: "03-functions-strings",
          short: "Functions and strings",
          chapters: [
            ["declaration", "Function declarations and kinds"],
            ["parameters", "Parameters and arguments"],
            ["recursion-extensions", "Recursion, infix functions, and extensions"],
            ["strings", "Strings and string templates"],
            ["regex-testing", "Regular expressions and testing"],
          ],
        },
        {
          slug: "04-exceptions-debugging",
          short: "Exceptions and debugging",
          chapters: [
            ["exceptions", "Exceptions and try–catch"],
            ["expressions-preconditions", "try/throw expressions and preconditions"],
            ["result-resources", "Result and resources"],
            ["debugging", "Stack traces and the debugger"],
            ["logic-errors-exit", "Logic errors and exit codes"],
          ],
        },
      ],
    },
    {
      title: "Object-oriented programming",
      topics: [
        {
          slug: "05-classes",
          short: "Classes and objects",
          chapters: [
            ["class-constructors", "Classes, constructors, and initialization"],
            ["properties", "Properties, accessors, and lateinit"],
            ["visibility-packages", "Visibility, packages, and nested classes"],
            ["uml-contract", "UML and class contracts"],
            ["case-studies", "Case studies and common mistakes"],
          ],
        },
        {
          slug: "06-inheritance-interfaces",
          short: "Inheritance and polymorphism",
          chapters: [
            ["inheritance", "A common type and open classes"],
            ["abstract-classes", "Abstract classes"],
            ["interfaces", "Interfaces and implementation conflicts"],
            ["type-checks-any", "Type casts, Any, and initialization"],
            ["design-testing", "The template method and hierarchy testing"],
          ],
        },
        {
          slug: "07-data-enum-sealed",
          short: "Data, enums, and sealed classes",
          chapters: [
            ["data-classes", "Data classes and copying"],
            ["enums-sealed", "Enums and sealed hierarchies"],
            ["objects", "Singleton objects and companions"],
            ["case-studies", "Choosing a model and common mistakes"],
          ],
        },
        {
          slug: "08-operators-delegation",
          short: "Operations and delegation",
          chapters: [
            ["operator-basics", "Comparison and compound assignment"],
            ["indexing-ranges", "Indexing, ranges, and iteration"],
            ["delegated-properties", "Delegated properties"],
            ["class-delegation", "provideDelegate and class delegation"],
          ],
        },
        {
          slug: "09-generics",
          short: "Generic programming",
          chapters: [
            ["type-parameters", "Type parameters and generic classes"],
            ["generic-functions", "Generic functions and bounds"],
            ["variance", "Variance and projections"],
            ["reified", "Type erasure and reified"],
            ["api-design", "API design and testing"],
          ],
        },
      ],
    },
    {
      title: "Collections, functional programming, and data",
      topics: [
        {
          slug: "10-collections",
          short: "Arrays and collections",
          chapters: [
            ["arrays", "Arrays"],
            ["lists", "The collection hierarchy and lists"],
            ["sets-maps", "Sets and maps"],
            ["traversal-sorting", "Traversal, queues, and sorting"],
            ["case-studies", "Case studies and design mistakes"],
          ],
        },
        {
          slug: "11-lambdas-sequences",
          short: "Lambdas and sequences",
          chapters: [
            ["lambdas", "Function types and lambdas"],
            ["closures-inline", "Closures and inline functions"],
            ["scope-functions", "Scope functions"],
            ["collection-operations", "Collection operations"],
            ["sequences", "Sequences and SAM interfaces"],
          ],
        },
        {
          slug: "12-files-serialization-testing",
          short: "Files, serialization, and tests",
          chapters: [
            ["files", "Files, text, and bytes"],
            ["io-errors-csv", "Safe writing and CSV format"],
            ["serialization", "JSON serialization"],
            ["unit-testing", "Unit testing"],
          ],
        },
      ],
    },
    {
      title: "Asynchrony, databases, and graphical applications",
      topics: [
        {
          slug: "13-coroutines-flow",
          short: "Coroutines and Flow",
          chapters: [
            ["coroutines-basics", "Coroutines and suspend functions"],
            ["structured-concurrency", "Structured concurrency"],
            ["dispatchers-state", "Dispatchers and shared state"],
            ["flow", "Asynchronous Flow streams"],
            ["debugging-testing", "Debugging and tests"],
          ],
        },
        {
          slug: "14-exposed-databases",
          short: "Databases with Exposed",
          chapters: [
            ["setup", "The database and connection"],
            ["tables-dsl", "Tables and DSL queries"],
            ["relations", "Relationships and joins"],
            ["dao-transactions", "DAO and transactions"],
            ["repository-migrations", "Repository, migrations, and tests"],
          ],
        },
        {
          slug: "15-compose",
          short: "Compose Multiplatform",
          chapters: [
            ["declarative-ui", "Declarative UI and the project"],
            ["composables-layout", "Composable functions and layout"],
            ["state-lists", "State hoisting and lists"],
            ["material-effects", "Material 3 and side effects"],
            ["resources-distribution", "Resources, theme, and distribution"],
          ],
        },
        {
          slug: "16-mvvm-navigation",
          short: "MVVM and navigation",
          chapters: [
            ["mvvm-udf", "MVVM and unidirectional data flow"],
            ["navigation", "Navigation as history state"],
            ["repository", "Repository and loading data"],
            ["events-testing", "Events, tests, and packaging"],
          ],
        },
      ],
    },
  ],
} satisfies Course;
