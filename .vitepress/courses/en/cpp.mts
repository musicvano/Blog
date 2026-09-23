import type { Course } from "../sidebar.mts";

export default {
  slug: "cpp",
  title: "C++ OOP",
  modules: [
    {
      title: "C++ language basics",
      topics: [
        {
          slug: "01-intro",
          short: "C++ and your first program",
          chapters: [
            ["cpp-language", "The C++ language and its standards"],
            ["visual-studio", "Visual Studio and your first project"],
            ["build-and-debug", "Building and debugging"],
            ["git", "Git version control"],
          ],
        },
        {
          slug: "02-types-control-flow",
          short: "Types, operators, control flow",
          chapters: [
            ["types-variables", "Types, variables, and constants"],
            ["operations-io", "Operators, output, and input"],
            ["control-flow", "Branches and loops"],
            ["algorithms", "From requirements to an algorithm"],
          ],
        },
        {
          slug: "03-functions",
          short: "Functions",
          chapters: [
            ["functions-parameters", "Functions and parameter passing"],
            ["overloading-results", "Overloading and results"],
            ["recursion-organization", "Recursion and program organization"],
            ["interface-design", "Designing function interfaces"],
          ],
        },
        {
          slug: "04-arrays-strings",
          short: "Arrays, strings, vector",
          chapters: [
            ["array-vector", "std::array and std::vector"],
            ["search-sort-matrix", "Searching, sorting and matrices"],
            ["strings", "Strings and string_view"],
            ["bounds-algorithms", "Bounds, modifications and algorithm walkthroughs"],
            ["text-format-memory", "Text format and memory"],
          ],
        },
        {
          slug: "05-pointers-memory",
          short: "Pointers and memory",
          chapters: [
            ["pointers", "Memory and pointers"],
            ["dynamic-memory", "Dynamic memory and its errors"],
            ["smart-pointers", "Smart pointers"],
            ["ownership", "Ownership models and span"],
            ["experiments", "Diagnostic experiments"],
          ],
        },
        {
          slug: "06-errors-debugging",
          short: "Debugging and errors",
          chapters: [
            ["errors-debugger", "Errors and the debugger"],
            ["assert-exceptions", "assert and exceptions"],
            ["noexcept-expected", "noexcept, optional and expected"],
            ["error-strategy", "An error-handling strategy"],
            ["exception-guarantees", "Checking guarantees after a failure"],
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
            ["class-invariant", "Class, invariant, and constructors"],
            ["composition-lifetime", "Composition and object lifetime"],
            ["class-members", "const, static, and aggregates"],
            ["interface-design", "Designing and testing a class"],
            ["case-studies", "Case studies and common mistakes"],
          ],
        },
        {
          slug: "08-copy-move-raii",
          short: "Copy, move, RAII",
          chapters: [
            ["copy-move", "Copy and move"],
            ["raii-rules", "RAII and the rules of zero, three, and five"],
            ["value-categories", "Value categories and copy-and-swap"],
            ["case-studies", "Case studies and common mistakes"],
          ],
        },
        {
          slug: "09-operators",
          short: "Operator overloading",
          chapters: [
            ["operator-basics", "Operators as an interface"],
            ["indexing-call", "Indexing, calls and increment"],
            ["comparison-friends-io", "Comparison, friends and streams"],
            ["case-studies", "Case studies and common mistakes"],
          ],
        },
        {
          slug: "10-inheritance-polymorphism",
          short: "Inheritance and polymorphism",
          chapters: [
            ["is-a-construction", "The “is-a” relationship and a hierarchy"],
            ["access-exceptions", "protected and the exception hierarchy"],
            ["virtual-functions", "Virtual functions"],
            ["case-studies", "Case studies and common mistakes"],
          ],
        },
        {
          slug: "11-abstract-interfaces",
          short: "Abstract classes, interfaces",
          chapters: [
            ["abstract-nvi", "Abstract classes and NVI"],
            ["diamond-strategy", "Virtual base and Strategy"],
            ["interfaces-patterns", "Interfaces and interaction patterns"],
            ["case-studies", "Case studies and common mistakes"],
          ],
        },
      ],
    },
    {
      title: "Generic programming and the standard library",
      topics: [
        {
          slug: "12-templates-concepts",
          short: "Templates and concepts",
          chapters: [
            ["function-templates", "Function templates and concepts"],
            ["class-templates", "Class templates"],
            ["variadic-requires", "Parameter packs and requires"],
          ],
        },
        {
          slug: "13-containers",
          short: "Containers",
          chapters: [
            ["sequence-containers", "Sequence containers"],
            ["associative", "Associative and hash containers"],
            ["adapters", "Adapters and new interfaces"],
            ["case-studies", "Case studies and common mistakes"],
          ],
        },
        {
          slug: "14-iterators-algorithms-ranges",
          short: "Iterators, algorithms, ranges",
          chapters: [
            ["iterators", "Iterators and invalidation"],
            ["lambdas", "Lambda expressions and functors"],
            ["algorithms", "Standard library algorithms"],
            ["ranges", "Ranges and views"],
            ["case-studies", "Case studies and common mistakes"],
          ],
        },
        {
          slug: "15-io-files",
          short: "Streams and files",
          chapters: [
            ["streams-states", "Streams and their states"],
            ["text-binary", "Text and binary files"],
            ["filesystem", "std::filesystem"],
          ],
        },
        {
          slug: "16-modules-cpp26",
          short: "Modules and C++26",
          chapters: [
            ["multi-file", "Multi-file projects and the ODR"],
            ["libraries-modules", "Libraries and modules"],
            ["cmake-cpp26", "CMake and C++26"],
          ],
        },
      ],
    },
  ],
} satisfies Course;
