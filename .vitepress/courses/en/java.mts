import type { Course } from "../sidebar.mts";

// English navigation mirrors the Ukrainian course reading order.

export default {
  slug: "java",
  title: "Object-oriented programming in Java",
  modules: [
    {
      title: "Java language fundamentals",
      topics: [
        {
          slug: "01-intro",
          short: "Java and your first program",
          chapters: [
            ["java-platform", "The Java platform and JDK"],
            ["compile-run", "Compilation, execution, and program structure"],
            ["ide-and-errors", "IntelliJ IDEA, JShell, and errors"],
            ["git", "Git and submitting your work"],
          ],
        },
        {
          slug: "02-types-control-flow",
          short: "Types and control flow",
          chapters: [
            ["types-variables", "Types, variables, and conversions"],
            ["operations-io", "Operations and console input"],
            ["branching", "Branching: if and switch"],
            ["loops", "Loops and invariants"],
          ],
        },
        {
          slug: "03-methods-arrays-strings",
          short: "Methods, arrays, and strings",
          chapters: [
            ["methods", "Methods and parameters"],
            ["recursion-arrays", "Recursion and arrays"],
            ["matrices-args", "Two-dimensional arrays and arguments"],
            ["strings-unicode", "String and Unicode"],
            ["text-building", "Building text and regular expressions"],
          ],
        },
        {
          slug: "04-exceptions-debugging",
          short: "Exceptions and debugging",
          chapters: [
            ["exception-basics", "Exceptions and the Throwable hierarchy"],
            ["finally-throw", "finally, throw, and throws"],
            ["custom-resources", "Custom exceptions and resources"],
            ["debugging", "Checks and debugging"],
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
            ["class-constructor", "Classes, fields, and constructors"],
            ["init-access-static", "Initialization, access, and static members"],
            ["packages-jar", "Packages, classpath, and JAR"],
            ["utility-quality", "Utility classes and code quality"],
          ],
        },
        {
          slug: "06-inheritance-polymorphism",
          short: "Inheritance and polymorphism",
          chapters: [
            ["subclasses", "Subclasses and their constructors"],
            ["overriding", "Overriding and type casts"],
            ["object-equality", "Object, equality, and copying"],
            ["composition", "Composition and the substitution principle"],
          ],
        },
        {
          slug: "07-abstract-interfaces",
          short: "Abstraction and interfaces",
          chapters: [
            ["abstract-classes", "Abstract classes and the template method"],
            ["interfaces", "Interfaces and their methods"],
            ["ordering-iteration", "Comparison and iteration"],
            ["nested-classes", "Nested classes and standard contracts"],
          ],
        },
        {
          slug: "08-records-enums-sealed",
          short: "Records, enums, sealed classes",
          chapters: [
            ["records", "Records and immutability"],
            ["enums", "Enums"],
            ["sealed-patterns", "Sealed types and patterns"],
            ["record-patterns", "Record patterns and deconstruction"],
          ],
        },
        {
          slug: "09-generics",
          short: "Generics",
          chapters: [
            ["generic-types", "Type parameters, classes, and methods"],
            ["bounds-invariance", "Bounds and invariance"],
            ["wildcards", "Wildcards and the PECS principle"],
            ["erasure", "Type erasure and its consequences"],
            ["raw-types-contracts", "Raw types and standard contracts"],
          ],
        },
      ],
    },
    {
      title: "Standard library and tools",
      topics: [
        {
          slug: "10-collections",
          short: "Collections",
          chapters: [
            ["interfaces-lists", "Collection interfaces and lists"],
            ["iterators-sets-queues", "Iterators, sets, and queues"],
            ["maps", "Maps and hashing"],
            ["choosing-collections", "Copies, wrappers, and choosing a collection"],
          ],
        },
        {
          slug: "11-lambdas-streams",
          short: "Lambdas and the Stream API",
          chapters: [
            ["functional-interfaces", "Functional interfaces"],
            ["method-refs-optional", "Method references and Optional"],
            ["stream-pipeline", "The Stream API pipeline"],
            ["collectors", "Collectors and Gatherers"],
            ["parallel-testing", "Parallelism and testing a pipeline"],
          ],
        },
        {
          slug: "12-io-files",
          short: "Files, NIO.2, and serialization",
          chapters: [
            ["paths-streams", "Paths, streams, and encoding"],
            ["text-binary", "Text and binary data"],
            ["nio-files", "Files and NIO.2 directories"],
            ["serialization", "Object serialization"],
          ],
        },
        {
          slug: "13-modules-build-testing",
          short: "Modules, builds, and testing",
          chapters: [
            ["jpms", "Classpath and JPMS modules"],
            ["maven", "Building with Maven"],
            ["gradle", "The same project in Gradle"],
            ["junit", "Testing with JUnit"],
          ],
        },
      ],
    },
    {
      title: "Databases and graphical applications",
      topics: [
        {
          slug: "14-jdbc",
          short: "Databases and JDBC",
          chapters: [
            ["postgresql", "The relational model and PostgreSQL"],
            ["jdbc-queries", "JDBC and queries"],
            ["transactions", "Transactions and concurrency"],
            ["dao", "DAO, DataSource, and testing"],
          ],
        },
        {
          slug: "15-javafx",
          short: "JavaFX graphical applications",
          chapters: [
            ["first-app", "Your first JavaFX application"],
            ["layout-controls", "Layout and controls"],
            ["events", "Events and the UI thread"],
            ["css-fxml", "CSS, FXML, and distribution"],
          ],
        },
        {
          slug: "16-mvc-data-binding",
          short: "MVC and data binding",
          chapters: [
            ["mvc-patterns", "Architectural patterns and the project"],
            ["properties-bindings", "Properties and bindings"],
            ["controllers-tables", "Controllers, tables, and background tasks"],
            ["book-catalog", "Managing books in PostgreSQL"],
          ],
        },
      ],
    },
  ],
} satisfies Course;
