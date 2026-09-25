import type { Course } from "../sidebar.mts";

// English translation of the Ukrainian course navigation.

export default {
  slug: "csharp",
  title: "Object-oriented programming in C# I",
  modules: [
    {
      title: "C# fundamentals",
      topics: [
        {
          slug: "01-dotnet-intro",
          short: ".NET and program structure",
          chapters: [
            ["dotnet-platform", "C# and the .NET platform"],
            ["dev-tools", "Installation and development environments"],
            ["cli-program-structure", "dotnet CLI and program structure"],
            ["console-io", "Console input and output"],
            ["debugging-problems", "Debugging and common problems"],
          ],
        },
        {
          slug: "02-types-operators",
          short: "Types, variables, operators",
          chapters: [
            ["type-system", "The type system and numeric types"],
            ["variables-null", "Characters, strings, variables, and null"],
            ["conversions-arithmetic", "Conversions and arithmetic"],
            ["logic-math", "Logical operators and the Math class"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "03-control-flow",
          short: "Branching and loops",
          chapters: [
            ["branching", "Blocks and the conditional statement"],
            ["switch-patterns", "switch and patterns"],
            ["loops", "Loops"],
            ["jumps-algorithms", "Jump statements and common algorithms"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "04-arrays-strings",
          short: "Arrays and strings",
          chapters: [
            ["arrays", "One-dimensional arrays"],
            ["array-class-multidim", "The Array class and multidimensional arrays"],
            ["strings", "Strings and formatting"],
            ["stringbuilder-unicode", "StringBuilder, Unicode, and regular expressions"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "05-methods",
          short: "Methods and recursion",
          chapters: [
            ["method-basics", "Declaring methods"],
            ["parameters", "Passing parameters"],
            ["overloading-recursion", "Overloading and recursion"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "06-debugging-exceptions",
          short: "Debugging and exceptions",
          chapters: [
            ["debugger", "Errors and the debugger"],
            ["assert-exceptions", "Debug.Assert and exception handling"],
            ["throwing-strategy", "Throwing exceptions and strategy"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
      ],
    },
    {
      title: "Object-oriented programming",
      topics: [
        {
          slug: "07-classes",
          short: "Classes and objects",
          chapters: [
            ["class-basics", "Classes, objects, and fields"],
            ["properties-constructors", "Properties and constructors"],
            ["initializers-conventions", "Initializers, ToString, and conventions"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "08-encapsulation-static",
          short: "Encapsulation, static members",
          chapters: [
            ["access-modifiers", "Encapsulation and access modifiers"],
            ["state-protection", "Protecting state and readonly fields"],
            ["static-namespaces", "Static members and namespaces"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "09-inheritance-polymorphism",
          short: "Inheritance and polymorphism",
          chapters: [
            ["inheritance", "Inheritance and constructors"],
            ["virtual-polymorphism", "Virtual methods and polymorphism"],
            ["casting-composition", "Casting, sealed, and composition"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "10-abstract-interfaces",
          short: "Abstract classes, interfaces",
          chapters: [
            ["abstract-classes", "Abstraction and abstract classes"],
            ["interfaces", "Interfaces"],
            ["standard-interfaces", "Standard interfaces and choosing an approach"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "11-structs-records",
          short: "Structures, records, tuples",
          chapters: [
            ["structs", "Structures"],
            ["records", "Records"],
            ["enums-tuples", "Enumerations and tuples"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "12-operators-indexers",
          short: "Operators and indexers",
          chapters: [
            ["operator-overloading", "Operator overloading"],
            ["indexers", "Indexers"],
            ["extension-methods", "Extension methods"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
      ],
    },
    {
      title: "Advanced C# and .NET features",
      topics: [
        {
          slug: "13-generics-collections",
          short: "Generics and collections",
          chapters: [
            ["generics", "Generic methods and classes"],
            ["collections", ".NET collections"],
            ["iterators", "Iterators"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "14-delegates-events",
          short: "Delegates, lambdas, events",
          chapters: [
            ["delegates", "Delegates"],
            ["lambdas-closures", "Lambda expressions and closures"],
            ["events", "Events"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "15-linq",
          short: "LINQ",
          chapters: [
            ["linq-basics", "LINQ fundamentals"],
            ["execution-aggregation", "Execution and aggregation"],
            ["grouping-joins", "Grouping, joins, and how LINQ works"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "16-files-json",
          short: "Files, streams, JSON",
          chapters: [
            ["filesystem-encoding", "The file system and encoding"],
            ["streams-csv", "Streams and CSV format"],
            ["json-async", "JSON and asynchronous operations"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "17-solid-patterns",
          short: "SOLID and design patterns",
          chapters: [
            ["solid-di", "SOLID and dependency injection"],
            ["design-patterns", "Design patterns"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
        {
          slug: "18-testing-refactoring",
          short: "Testing and refactoring",
          chapters: [
            ["testing-basics", "Tests and MSTest"],
            ["running-isolation", "Running tests, isolation, TDD, and coverage"],
            ["refactoring", "Refactoring"],
            ["case-studies", "Examples and common mistakes"],
          ],
        },
      ],
    },
  ],
} satisfies Course;
