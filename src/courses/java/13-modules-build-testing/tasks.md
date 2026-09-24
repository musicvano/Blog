---
title: "Tasks"
description: "Topic 13. Modules, builds, and testing: task variants"
outline: [2, 3]
sourceHash: "d73fc3f379892cfdce581c3c522edc5d609f88e16aabcdab33b3c60ac08eb8d4"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. A geometry library {#v1}

**1. Initial level.** Create a standalone Java console program “Geometry library”. For a circle with radius r≥0, compute the area `π*r*r` and the circumference `2*π*r`; reject a non-numeric radius. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Geometry library”: API and application modules, JUnit computation tests. Separate the domain logic library from the console client, and describe their dependencies and public API. For a circle with radius r≥0, compute the area `π*r*r` and the circumference `2*π*r`; reject a non-numeric radius. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Geometry library”: API and application modules, JUnit computation tests. For a circle with radius r≥0, compute the area `π*r*r` and the circumference `2*π*r`; reject a non-numeric radius. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 2. A currency converter {#v2}

**1. Initial level.** Create a standalone Java console program “Currency converter”. Enter an amount UAH≥0 and an exchange rate in UAH per 1 EUR&gt;0; output EUR rounded HALF\_UP to 2 decimal places. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Currency converter”: a multi-module Maven project and parameterized tests. Separate the domain logic library from the console client, and describe their dependencies and public API. Enter an amount UAH≥0 and an exchange rate in UAH per 1 EUR&gt;0; output EUR rounded HALF\_UP to 2 decimal places. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Currency converter”: a multi-module Maven project and parameterized tests. Enter an amount UAH≥0 and an exchange rate in UAH per 1 EUR&gt;0; output EUR rounded HALF\_UP to 2 decimal places. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 3. A tax calculator {#v3}

**1. Initial level.** Create a standalone Java console program “Tax calculator”. For a monthly income≥0, apply a training rate of 10 % up to UAH 10000 and 20 % only to the excess; output the tax and the net income. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Tax calculator”: a Gradle build, tests of rate boundary values. Separate the domain logic library from the console client, and describe their dependencies and public API. For a monthly income≥0, apply a training rate of 10 % up to UAH 10000 and 20 % only to the excess; output the tax and the net income. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Tax calculator”: a Gradle build, tests of rate boundary values. For a monthly income≥0, apply a training rate of 10 % up to UAH 10000 and 20 % only to the excess; output the tax and the net income. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 4. A password validator {#v4}

**1. Initial level.** Create a standalone Java console program “Password validator”. For a password string, check 8–64 characters, at least one digit, and one uppercase letter; output the list of violations without the password itself. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Password validator”: a library module with test coverage above 90 %. Separate the domain logic library from the console client, and describe their dependencies and public API. For a password string, check 8–64 characters, at least one digit, and one uppercase letter; output the list of violations without the password itself. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Password validator”: a library module with test coverage above 90 %. For a password string, check 8–64 characters, at least one digit, and one uppercase letter; output the list of violations without the password itself. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 5. Command-line argument parsing {#v5}

**1. Initial level.** Create a standalone Java console program “Command-line argument parsing”. Parse `--name=text` and `--count=1..100`; output count greetings; reject an unknown key or a duplicate. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Command-line argument parsing”: a library with exception tests. Separate the domain logic library from the console client, and describe their dependencies and public API. Parse `--name=text` and `--count=1..100`; output count greetings; reject an unknown key or a duplicate. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Command-line argument parsing”: a library with exception tests. Parse `--name=text` and `--count=1..100`; output count greetings; reject an unknown key or a duplicate. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 6. Bank operations {#v6}

**1. Initial level.** Create a standalone Java console program “Bank operations”. For an account with a balance in cents, perform deposits and withdrawals of a positive amount; prohibit overdrafts and show the balance. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Bank operations”: domain and app modules, transfer tests. Separate the domain logic library from the console client, and describe their dependencies and public API. For an account with a balance in cents, perform deposits and withdrawals of a positive amount; prohibit overdrafts and show the balance. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Bank operations”: domain and app modules, transfer tests. For an account with a balance in cents, perform deposits and withdrawals of a positive amount; prohibit overdrafts and show the balance. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 7. A matrix library {#v7}

**1. Initial level.** Create a standalone Java console program “Matrix library”. Enter two rectangular integer matrices; output the sum if the dimensions match; otherwise report the incompatibility. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Matrix library”: a Maven module, tests with `@CsvSource`. Separate the domain logic library from the console client, and describe their dependencies and public API. Enter two rectangular integer matrices; output the sum if the dimensions match; otherwise report the incompatibility. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Matrix library”: a Maven module, tests with `@CsvSource`. Enter two rectangular integer matrices; output the sum if the dimensions match; otherwise report the incompatibility. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 8. Date parsing {#v8}

**1. Initial level.** Create a standalone Java console program “Date parsing”. Parse an ISO date yyyy-MM-dd and a number of days; output the new date and the day of the week; reject an impossible date. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Date parsing”: test-driven development in a Gradle project. Separate the domain logic library from the console client, and describe their dependencies and public API. Parse an ISO date yyyy-MM-dd and a number of days; output the new date and the day of the week; reject an impossible date. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Date parsing”: test-driven development in a Gradle project. Parse an ISO date yyyy-MM-dd and a number of days; output the new date and the day of the week; reject an impossible date. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 9. A shopping cart {#v9}

**1. Initial level.** Create a standalone Java console program “Shopping cart”. For products with a name, a price in cents, and a quantity≥0, output the line totals and the cart total; reject a negative price. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Shopping cart”: a multi-module Maven project, tests of discount rules. Separate the domain logic library from the console client, and describe their dependencies and public API. For products with a name, a price in cents, and a quantity≥0, output the line totals and the cart total; reject a negative price. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Shopping cart”: a multi-module Maven project, tests of discount rules. For products with a name, a price in cents, and a quantity≥0, output the line totals and the cart total; reject a negative price. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 10. Text statistics {#v10}

**1. Initial level.** Create a standalone Java console program “Text statistics”. For a line of text, output the number of words and letters and the longest word; words are separated by spaces; on a tie, take the first one. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Text statistics”: a service through `uses`/`provides` and tests. Separate the domain logic library from the console client, and describe their dependencies and public API. For a line of text, output the number of words and letters and the longest word; words are separated by spaces; on a tie, take the first one. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Text statistics”: a service through `uses`/`provides` and tests. For a line of text, output the number of words and letters and the longest word; words are separated by spaces; on a tie, take the first one. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 11. A train schedule {#v11}

**1. Initial level.** Create a standalone Java console program “Train schedule”. For trains with a number and a LocalTime departure, output the nearest train after a given time; if there is none, report it. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Train schedule”: a multi-project Gradle build, `@Nested` tests. Separate the domain logic library from the console client, and describe their dependencies and public API. For trains with a number and a LocalTime departure, output the nearest train after a given time; if there is none, report it. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Train schedule”: a multi-project Gradle build, `@Nested` tests. For trains with a number and a LocalTime departure, output the nearest train after a given time; if there is none, report it. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 12. Ciphers {#v12}

**1. Initial level.** Create a standalone Java console program “Ciphers”. Enter Latin text and a shift of 0..25; apply a Caesar cipher preserving case, leaving other characters unchanged. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Ciphers”: cipher providers through `ServiceLoader` and tests. Separate the domain logic library from the console client, and describe their dependencies and public API. Enter Latin text and a shift of 0..25; apply a Caesar cipher preserving case, leaving other characters unchanged. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Ciphers”: cipher providers through `ServiceLoader` and tests. Enter Latin text and a shift of 0..25; apply a Caesar cipher preserving case, leaving other characters unchanged. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 13. Grade statistics {#v13}

**1. Initial level.** Create a standalone Java console program “Grade statistics”. For grades 0..100, output the minimum, maximum, and average to 2 decimal places; leave the average undefined for an empty set. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Grade statistics”: a library and a console application, a test report. Separate the domain logic library from the console client, and describe their dependencies and public API. For grades 0..100, output the minimum, maximum, and average to 2 decimal places; leave the average undefined for an empty set. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Grade statistics”: a library and a console application, a test report. For grades 0..100, output the minimum, maximum, and average to 2 decimal places; leave the average undefined for an empty set. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 14. A unit converter {#v14}

**1. Initial level.** Create a standalone Java console program “Unit converter”. Convert a nonnegative length between m, km, and cm through meters; reject an unknown unit; present the result to 3 decimal places. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Unit converter”: a `jlink` application image and tests. Separate the domain logic library from the console client, and describe their dependencies and public API. Convert a nonnegative length between m, km, and cm through meters; reject an unknown unit; present the result to 3 decimal places. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Unit converter”: a `jlink` application image and tests. Convert a nonnegative length between m, km, and cm through meters; reject an unknown unit; present the result to 3 decimal places. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 15. A fraction library {#v15}

**1. Initial level.** Create a standalone Java console program “Fraction library”. For two fractions with integer numerators and nonzero denominators, output the reduced sum with a positive denominator. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Fraction library”: installation into the local Maven repository, reuse. Separate the domain logic library from the console client, and describe their dependencies and public API. For two fractions with integer numerators and nonzero denominators, output the reduced sum with a positive denominator. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Fraction library”: installation into the local Maven repository, reuse. For two fractions with integer numerators and nonzero denominators, output the reduced sum with a positive denominator. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 16. A password generator {#v16}

**1. Initial level.** Create a standalone Java console program “Password generator”. Enter a length of 8..64 and a seed; the training string generator uses A–Z and 0–9, and the result is reproducible for the seed; do not use it as a secret. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Password generator”: a dependency on a third-party library, tests. Separate the domain logic library from the console client, and describe their dependencies and public API. Enter a length of 8..64 and a seed; the training string generator uses A–Z and 0–9, and the result is reproducible for the seed; do not use it as a secret. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Password generator”: a dependency on a third-party library, tests. Enter a length of 8..64 and a seed; the training string generator uses A–Z and 0–9, and the result is reproducible for the seed; do not use it as a secret. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 17. A task queue {#v17}

**1. Initial level.** Create a standalone Java console program “Task queue”. For tasks with a name and a priority of 1..5, output the execution order from 5 to 1, preserving insertion order on ties. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Task queue”: a module with an API, tests of processing order. Separate the domain logic library from the console client, and describe their dependencies and public API. For tasks with a name and a priority of 1..5, output the execution order from 5 to 1, preserving insertion order on ties. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Task queue”: a module with an API, tests of processing order. For tasks with a name and a priority of 1..5, output the execution order from 5 to 1, preserving insertion order on ties. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 18. Room booking {#v18}

**1. Initial level.** Create a standalone Java console program “Room booking”. For a room and a LocalDateTime interval (start earlier than end), check for overlapping bookings; touching endpoints are allowed; output the decision. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Room booking”: tests of date interval overlaps. Separate the domain logic library from the console client, and describe their dependencies and public API. For a room and a LocalDateTime interval (start earlier than end), check for overlapping bookings; touching endpoints are allowed; output the decision. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Room booking”: tests of date interval overlaps. For a room and a LocalDateTime interval (start earlier than end), check for overlapping bookings; touching endpoints are allowed; output the decision. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 19. A holiday calendar {#v19}

**1. Initial level.** Create a standalone Java console program “Holiday calendar”. For a year and a list of MonthDay holidays, output the holiday dates by month; skip February 29 in a non-leap year. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Holiday calendar”: a Gradle project, tests of computing movable holidays. Separate the domain logic library from the console client, and describe their dependencies and public API. For a year and a list of MonthDay holidays, output the holiday dates by month; skip February 29 in a non-leap year. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Holiday calendar”: a Gradle project, tests of computing movable holidays. For a year and a list of MonthDay holidays, output the holiday dates by month; skip February 29 in a non-leap year. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 20. A loan calculator {#v20}

**1. Initial level.** Create a standalone Java console program “Loan calculator”. For an amount P&gt;0, an annual rate r≥0, and months n&gt;0, compute the annuity `P*i/(1-(1+i)^(-n))`, `i=r/1200`; for r=0, output P/n. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Loan calculator”: a payment schedule, `BigDecimal` precision tests. Separate the domain logic library from the console client, and describe their dependencies and public API. For an amount P&gt;0, an annual rate r≥0, and months n&gt;0, compute the annuity `P*i/(1-(1+i)^(-n))`, `i=r/1200`; for r=0, output P/n. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Loan calculator”: a payment schedule, `BigDecimal` precision tests. For an amount P&gt;0, an annual rate r≥0, and months n&gt;0, compute the annuity `P*i/(1-(1+i)^(-n))`, `i=r/1200`; for r=0, output P/n. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 21. CSV parsing {#v21}

**1. Initial level.** Create a standalone Java console program “CSV parsing”. Parse a CSV with name,age columns and a comma delimiter without quotes; age=0..120; report an invalid line with its number. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “CSV parsing”: a library with tests of format edge cases. Separate the domain logic library from the console client, and describe their dependencies and public API. Parse a CSV with name,age columns and a comma delimiter without quotes; age=0..120; report an invalid line with its number. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “CSV parsing”: a library with tests of format edge cases. Parse a CSV with name,age columns and a comma delimiter without quotes; age=0..120; report an invalid line with its number. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 22. The Game of Life {#v22}

**1. Initial level.** Create a standalone Java console program “Game of Life”. For a rectangular 0/1 grid, perform a Life step: birth with 3 neighbors, survival with 2–3; cells outside the grid are dead. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Game of Life”: logic and console modules, generation tests. Separate the domain logic library from the console client, and describe their dependencies and public API. For a rectangular 0/1 grid, perform a Life step: birth with 3 neighbors, survival with 2–3; cells outside the grid are dead. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Game of Life”: logic and console modules, generation tests. For a rectangular 0/1 grid, perform a Life step: birth with 3 neighbors, survival with 2–3; cells outside the grid are dead. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 23. Grading rules {#v23}

**1. Initial level.** Create a standalone Java console program “Grading rules”. For scores 0..100, output A from 90, B from 82, C from 74, D from 64, E from 60, F below; reject other values. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Grading rules”: `@ParameterizedTest` for grading scales. Separate the domain logic library from the console client, and describe their dependencies and public API. For scores 0..100, output A from 90, B from 82, C from 74, D from 64, E from 60, F below; reject other values. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Grading rules”: `@ParameterizedTest` for grading scales. For scores 0..100, output A from 90, B from 82, C from 74, D from 64, E from 60, F below; reject other values. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 24. An elevator scheduler {#v24}

**1. Initial level.** Create a standalone Java console program “Elevator scheduler”. For a current floor 1..20 and requests, output the route to the nearest request, choosing the lower floor on ties; remove completed requests. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Elevator scheduler”: a call-servicing algorithm with tests. Separate the domain logic library from the console client, and describe their dependencies and public API. For a current floor 1..20 and requests, output the route to the nearest request, choosing the lower floor on ties; remove completed requests. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Elevator scheduler”: a call-servicing algorithm with tests. For a current floor 1..20 and requests, output the route to the nearest request, choosing the lower floor on ties; remove completed requests. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 25. A string template engine {#v25}

**1. Initial level.** Create a standalone Java console program “String template engine”. Replace the `{name}` and `{count}` markers in a template with the given values; leave an unknown marker as is; output the resulting string. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “String template engine”: a simple template engine with substitution tests. Separate the domain logic library from the console client, and describe their dependencies and public API. Replace the `{name}` and `{count}` markers in a template with the given values; leave an unknown marker as is; output the resulting string. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “String template engine”: a simple template engine with substitution tests. Replace the `{name}` and `{count}` markers in a template with the given values; leave an unknown marker as is; output the resulting string. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 26. Athlete statistics {#v26}

**1. Initial level.** Create a standalone Java console program “Athlete statistics”. For athletes with a name and a race time&gt;0, output a ranking in ascending order of time; equal times get the same place. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Athlete statistics”: Gradle with a version catalog, tests. Separate the domain logic library from the console client, and describe their dependencies and public API. For athletes with a name and a race time&gt;0, output a ranking in ascending order of time; equal times get the same place. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Athlete statistics”: Gradle with a version catalog, tests. For athletes with a name and a race time&gt;0, output a ranking in ascending order of time; equal times get the same place. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 27. Inventory tracking {#v27}

**1. Initial level.** Create a standalone Java console program “Inventory tracking”. For inventory with a code and a quantity≥0, record receipts or issues; reject shortages; output the remaining stock by code. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Inventory tracking”: Maven profiles, in-memory storage tests. Separate the domain logic library from the console client, and describe their dependencies and public API. For inventory with a code and a quantity≥0, record receipts or issues; reject shortages; output the remaining stock by code. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Inventory tracking”: Maven profiles, in-memory storage tests. For inventory with a code and a quantity≥0, record receipts or issues; reject shortages; output the remaining stock by code. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 28. Sorting algorithms {#v28}

**1. Initial level.** Create a standalone Java console program “Sorting algorithms”. Sort an integer array with bubble sort and insertion sort; output both results and the number of comparisons; an empty array is allowed. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Sorting algorithms”: comparative sorting tests, `@RepeatedTest`. Separate the domain logic library from the console client, and describe their dependencies and public API. Sort an integer array with bubble sort and insertion sort; output both results and the number of comparisons; an empty array is allowed. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Sorting algorithms”: comparative sorting tests, `@RepeatedTest`. Sort an integer array with bubble sort and insertion sort; output both results and the number of comparisons; an empty array is allowed. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 29. A color converter {#v29}

**1. Initial level.** Create a standalone Java console program “Color converter”. Convert RGB of three integers 0..255 to HEX `#RRGGBB` and back; reject an invalid length or character. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Color converter”: tests of RGB, HSL, and HEX conversions. Separate the domain logic library from the console client, and describe their dependencies and public API. Convert RGB of three integers 0..255 to HEX `#RRGGBB` and back; reject an invalid length or character. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Color converter”: tests of RGB, HSL, and HEX conversions. Convert RGB of three integers 0..255 to HEX `#RRGGBB` and back; reject an invalid length or character. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

### Variant 30. An expense tracker {#v30}

**1. Initial level.** Create a standalone Java console program “Expense tracker”. For expenses with a date, a category, and an amount&gt;0, output category totals for a given month; store amounts in cents. Move the computation into a separate class. Create a Maven project and at least four JUnit tests: a typical case, a boundary, empty or zero data, and invalid input.

**2. Basic level.** Create a standalone Java project “Expense tracker”: a modular application with a `jlink` image and tests. Separate the domain logic library from the console client, and describe their dependencies and public API. For expenses with a date, a category, and an amount&gt;0, output category totals for a given month; store amounts in cents. The client prints a table of results. Add parameterized tests for at least six data sets and exception tests; build and run through the Wrapper, and explain the dependency tree.

**3. Advanced level.** Create a standalone modular Java project “Expense tracker”: a modular application with a `jlink` image and tests. For expenses with a date, a category, and an amount&gt;0, output category totals for a given month; store amounts in cents. Split out an API library and a CLI, and define JPMS descriptors and a reproducible Maven or Gradle build. Accept `--input=path`, `--options=name:value,...`, and `--help`; with no arguments, prompt for data from the keyboard; print an aligned table and totals. Errors go to stderr; exit codes 0/2/1 for success, input errors, and failures. Add tests of domain invariants, boundary values, and errors, create a jlink image, and test running from a clean working directory.

## Procedure

1. Define the API, internal packages, and the build tool.
2. Create the Wrapper and check the JDK version in the terminal.
3. Implement the domain code separately from the CLI.
4. Write tests for normal, boundary, and invalid data.
5. Build a clean project through the Wrapper and show the test report.
6. Explain one JPMS descriptor and the dependency tree.
