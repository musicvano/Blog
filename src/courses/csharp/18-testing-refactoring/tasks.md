---
title: "Tasks"
description: "Topic 18. Testing and refactoring: task variants"
outline: [2, 3]
sourceHash: "bcccdeac0300f3486cf06e9d06ee89d33d43e6d3cecad20471b45f531953c357"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Discount calculator {#v1}

**1. Initial level.** Create a library with a method that calculates a discount based on the purchase amount (0%, 5%, 10%) and an MSTest test project with tests for each range.

**2. Basic level.** Create a library with a method that calculates a discount based on the purchase amount (0%, 5%, 10% by thresholds) and an MSTest test project: boundary value tests with `[DataRow]` (the range boundaries and values next to them) and a check for a negative amount (`ThrowsExactly`). Refactor the nested `if` statements into a table of thresholds while keeping the tests green.

**3. Advanced level.** Use TDD to develop a library that calculates a discount based on the purchase amount (0, 5, or 10%), a loyalty card, and a promo code with the rule “no more than 20% in total,” and obtain a code coverage report for the library of at least 90%. A dotnet CLI application takes the amount, card, and promo code from arguments and prints the discount and the amount to pay; errors go to `Console.Error`.

### Variant 2. Email address validator {#v2}

**1. Initial level.** Create a library with an email validation method (one `@`, non-empty parts, a period in the domain) and an MSTest test project with tests for valid and invalid addresses.

**2. Basic level.** Use TDD to develop a library with an email validator that, for each rule (one `@`, non-empty parts, a period in the domain), returns a message about the specific error; in the MSTest test project, use `[DataRow]` for each equivalence class.

**3. Advanced level.** Create a library with an email validator: one `@`, non-empty parts, a period in the domain, length limits for the parts, allowed characters, and blocked domains from an `IDomainBlacklist` interface (a fake in the MSTest tests). A dotnet CLI application checks addresses from standard input and prints the result for each; errors go to `Console.Error`.

### Variant 3. Amount in words {#v3}

**1. Initial level.** Use TDD (a library and an MSTest test project) to develop a method that writes an integer from 0 to 99 in words in Ukrainian, for example, 42 → “сорок два.”

**2. Basic level.** Use TDD to develop a library with a method that writes an integer from 0 to 999,999 in words in Ukrainian with correct grammatical agreement (“одна тисяча,” “дві тисячі,” “п’ять тисяч”) and an MSTest test project with boundary tests (0, 999, 1000, 999,999).

**3. Advanced level.** Create a library that writes a monetary amount up to 999,999.99 in words as hryvnias and kopiykas with grammatical agreement (“одна гривня,” “дві гривні,” “п’ять гривень”) for banking documents, with MSTest tests; refactor it to use tables of word forms. A dotnet CLI application converts the amounts from the arguments; errors go to `Console.Error`.

### Variant 4. Bank account {#v4}

**1. Initial level.** Create a bank account class (balance, deposit, withdrawal) and an MSTest test project with tests for deposits, withdrawals, and the ban on negative amounts.

**2. Basic level.** Create a bank account class with a credit limit, deposits, withdrawals, and a transaction history, and an MSTest test project: the invariant “the balance is not less than the credit limit” in all operations, exceptions with messages for invalid amounts, and the transaction history (`CollectionAssert`).

**3. Advanced level.** Create a bank accounts library (balance, deposit, withdrawal) with transfers between accounts with a fee through an `IFeePolicy` interface (a stub in the tests) and interest accrual with `TimeProvider`; an MSTest test project with library coverage of at least 90%.

### Variant 5. Food delivery {#v5}

**1. Initial level.** Create a delivery order class that calculates the total of the dishes using a restaurant menu `IMenu`, and an MSTest test project with a fake menu (fixed prices) for tests of adding dishes and the order total.

**2. Basic level.** Create a delivery order class with a restaurant menu through an `IMenu` interface and an MSTest test project with a fake menu: tests of the delivery cost by distance, the minimum order amount, and unavailable dishes; check the number of calls to the fake.

**3. Advanced level.** Create a delivery orders library with an `IMenu` menu and an `ICourierService` courier service, and an MSTest test project with a fake menu and a mock test that checks that a courier is assigned only for a paid order. A dotnet CLI application simulates orders (dishes, payment, courier); errors go to `Console.Error`.

### Variant 6. CSV parsing {#v6}

**1. Initial level.** Create a method that parses a CSV line into an array of fields and an MSTest test project with tests for simple and empty fields.

**2. Basic level.** Use TDD to develop a method that parses CSV text into records (arrays of fields) with support for quoted fields containing commas and doubled quotes, skipping empty lines, and an exception with the line number for invalid data; MSTest tests.

**3. Advanced level.** Create a CSV parsing library (quoted fields, errors with the line number) with MSTest tests, and refactor the parser into a class with separator and culture strategies while keeping the tests green; the tests also cover files in the Windows-1251 encoding. A dotnet CLI application checks the CSV file from the arguments; errors go to `Console.Error`.

### Variant 7. Bowling {#v7}

**1. Initial level.** Use TDD to develop a bowling game class with the methods `Roll(pins)` and `Score()` and MSTest tests for a game without strikes and spares (20 rolls).

**2. Basic level.** Use TDD to develop a bowling game class (`Roll(pins)`, `Score()`) that scores spares and strikes with bonuses, and MSTest tests for all cases, including a perfect game (300 points).

**3. Advanced level.** Create a bowling scoring library with spares, strikes, a tenth frame with bonus rolls, and a check of invalid sequences, and refactor it into a frame class while keeping the MSTest tests. A dotnet CLI application calculates the score from the rolls in the arguments; errors go to `Console.Error`.

### Variant 8. Loan schedule {#v8}

**1. Initial level.** Create a method that calculates the monthly annuity payment from the loan amount, the annual rate, and the number of months, and an MSTest test project with a check using a rounding tolerance.

**2. Basic level.** Create a library that builds an annuity loan schedule (`decimal`: payment, interest, principal, balance each month) and MSTest tests: the sum of the payments equals the principal plus interest, and the last payment closes the balance to the kopiyka.

**3. Advanced level.** Create a loan schedule library (annuity and differentiated as strategies after refactoring, early repayment) with MSTest tests, including comparison tests of the two schemes. A dotnet CLI application prints a schedule for the amount, rate, term, and scheme from the arguments; errors go to `Console.Error`.

### Variant 9. Working calendar {#v9}

**1. Initial level.** Create a method that determines a leap year and an MSTest test project with tests for boundary years (1900, 2000, 2024, 2100).

**2. Basic level.** Use TDD to develop a method that counts the working days between two dates (`DateOnly`) excluding Saturdays and Sundays, and MSTest tests, including for periods across the end of a month and a year.

**3. Advanced level.** Create a library that counts the working days between dates taking into account weekends, holidays from an `IHolidayCalendar` interface (a fake in the MSTest tests), and moved days off. A dotnet CLI application counts the working days between the dates from the arguments; errors go to `Console.Error`.

### Variant 10. Custom collections {#v10}

**1. Initial level.** Create an array-based generic stack `MyStack<T>` and an MSTest test project with tests of `Push`, `Pop`, `Peek`, `Count`, and an empty stack.

**2. Basic level.** Create a generic queue `MyQueue<T>` on a circular array (`Enqueue`, `Dequeue`, `Count`, `IEnumerable<T>`) and MSTest tests, including capacity growth and iteration with `foreach`; pass the sets of sequences through `[DynamicData]`.

**3. Advanced level.** Use TDD to develop a generic priority queue on a binary heap (`Enqueue`, `Dequeue`, `Peek`, `Count`) with MSTest tests and compare the results with `PriorityQueue` on random data with a fixed seed. Coverage must be at least 95%.

### Variant 11. Vigenère cipher {#v11}

**1. Initial level.** Create a Vigenère cipher class with methods for encrypting and decrypting with a key and an MSTest test project with known “plaintext – ciphertext” pairs.

**2. Basic level.** Create a Vigenère cipher class (encryption and decryption with a key) and MSTest tests: reversibility for a set of texts, preservation of case and non-letter characters, and an exception for an invalid key.

**3. Advanced level.** Create a Vigenère cipher library for the Ukrainian and English alphabets with MSTest tests, analyze the code coverage report, add tests for uncovered branches, and refactor it into a shared alphabet class.

### Variant 12. Warehouse accounting {#v12}

**1. Initial level.** Create a warehouse accounting service with a stock repository interface and an MSTest test project that checks the receipt of goods with a fake in-memory repository.

**2. Basic level.** Create a warehouse accounting service (several warehouses, a stock repository through an interface) and MSTest tests with a fake in-memory repository: write-offs with a check for insufficient stock, transfers between warehouses, and an operation log.

**3. Advanced level.** Create a warehouse accounting library (receipts, write-offs, transfers) split according to SRP, with a notification interface for minimum stock and MSTest tests with mocks of the notification calls. A dotnet CLI application processes operations from standard input; errors go to `Console.Error`.

### Variant 13. Scholarship calculation {#v13}

**1. Initial level.** Write your own “bad” method that calculates a scholarship from the average grade (magic numbers, nested `if` statements) and MSTest characterization tests that capture its current behavior.

**2. Basic level.** Create a method that calculates a scholarship from the average grade with magic numbers and nested `if` statements, cover it with MSTest characterization tests, and refactor it: constants, Extract Method, an enumeration of student categories; the tests must stay green.

**3. Advanced level.** Create a library that calculates a scholarship from the average grade with bonuses for participating in olympiads and for social categories through strategies, cover the code with MSTest tests, and write a “before/after” refactoring report starting from the original method with nested `if` statements.

### Variant 14. Text statistics {#v14}

**1. Initial level.** Create a text statistics class with methods for counting words and sentences and an MSTest test project with tests of these methods.

**2. Basic level.** Create a text analyzer with a long method that counts word frequencies and finds the longest word, and MSTest tests, including edge cases (empty text, punctuation only); perform Extract Method while keeping the tests green.

**3. Advanced level.** Create a text analysis library by refactoring a single analyzer into a pipeline of separate analyzers with a common interface (words and sentences, word frequencies, the longest word), with MSTest tests for each. A dotnet CLI application analyzes the file from the arguments; errors go to `Console.Error`.

### Variant 15. Car rental {#v15}

**1. Initial level.** Create a method that calculates the cost of a car rental from the number of hours and the hourly rate, and an MSTest test project with tests of the calculation.

**2. Basic level.** Create a car rental class that, based on the return time from `TimeProvider`, calculates the cost and a late fee with “30 free minutes,” and MSTest tests with `FakeTimeProvider`, including at the 30-minute boundary.

**3. Advanced level.** Use TDD with `FakeTimeProvider` to develop a car rental library with hourly, night, and weekend rates as strategies after refactoring, with MSTest tests. A dotnet CLI application calculates the rental from the start and end times in the arguments; errors go to `Console.Error`.

### Variant 16. League table {#v16}

**1. Initial level.** Create a method that awards a team points for a match result (win – 3, draw – 1, loss – 0) and an MSTest test project with tests.

**2. Basic level.** Create a league table class that, based on match results, sorts teams by points, goal difference, and goals scored, and MSTest tests, including for teams with identical records.

**3. Advanced level.** Use TDD to develop a league table library (points, goal difference, and goals scored) with a head-to-head rule for equal points and MSTest tests on data sets with `[DynamicData]`. A dotnet CLI application builds the table from a file of match results; errors go to `Console.Error`.

### Variant 17. Unit converter {#v17}

**1. Initial level.** Create a length converter between units (m, km, foot, inch, mile) and parameterized MSTest tests of the conversions with an error tolerance.

**2. Basic level.** Create a converter of length and temperature units (°C, °F, K) and MSTest tests: reversibility (m → foot → m), conversion between temperature scales, and an exception for an unknown unit.

**3. Advanced level.** Create a length unit converter based on a table of coefficients to a base unit (refactoring the pairwise formulas) and check all pairs of units with MSTest tests on automatically generated test data.

### Variant 18. Game of Life {#v18}

**1. Initial level.** Create a method implementing the rules of the Game of Life that returns a cell’s new state from its state and the number of live neighbors, and MSTest tests of survival and birth.

**2. Basic level.** Create a Game of Life board class with a method that calculates the next generation, and MSTest tests of known patterns: a “block” does not change, a “blinker” returns after 2 steps, and a “glider” shifts after 4 steps.

**3. Advanced level.** Create a Game of Life library with a toroidal board by refactoring a procedural implementation into board and rule classes while keeping the MSTest tests. A dotnet CLI application simulates the game from an initial board file and prints a given number of generations; errors go to `Console.Error`.

### Variant 19. Thermostat {#v19}

**1. Initial level.** Create a thermostat class that turns heating on below a set temperature and off above it according to the readings of an `ITemperatureSensor`, and MSTest tests with a fake sensor.

**2. Basic level.** Create a thermostat class with an `ITemperatureSensor` and hysteresis (±0.5 °C around the set temperature) and MSTest tests with a fake sensor for sequences of readings that do not cause frequent switching.

**3. Advanced level.** Create a thermostat library with hysteresis and a temperature schedule by time of day through `TimeProvider`, and MSTest tests with `FakeTimeProvider` and a fake sensor for transitions between periods. A dotnet CLI application simulates a day and prints the heating switches; errors go to `Console.Error`.

### Variant 20. Expression evaluator {#v20}

**1. Initial level.** Create a method that evaluates a string expression with integers, `+`, and `-` without parentheses, and an MSTest test project with tests.

**2. Basic level.** Use TDD to develop a method that evaluates a string expression with numbers, `+`, `-`, `*`, and `/`, operator precedence, and parentheses and that throws an exception with the position for errors; MSTest tests.

**3. Advanced level.** Create an expression evaluation library (four operations, parentheses, unary minus, variables) by refactoring it into a tokenizer and a parser with separate MSTest tests. A dotnet CLI application evaluates the expressions from the arguments; errors go to `Console.Error`.

### Variant 21. Credit scoring {#v21}

**1. Initial level.** Create a method that evaluates a loan application by age, income, and work experience with an “approved/rejected” decision, and an MSTest test project with tests.

**2. Basic level.** Create a credit scoring method for an application (age, income, work experience) as a long `switch`, write MSTest characterization tests, and refactor it into a set of rules with a common interface.

**3. Advanced level.** Create a credit scoring library with a set of rules with a common interface (age, income, work experience, external credit history through an interface, a fake in the tests) and an explanation of the decision (a list of the rules that fired); MSTest tests with 100% branch coverage of the rules.

### Variant 22. URL parsing {#v22}

**1. Initial level.** Create a URL parsing method that returns the scheme and the host, and an MSTest test project with tests.

**2. Basic level.** Create a URL parsing class (scheme, host, default port, path, query parameters, fragment) and MSTest tests that compare the results with the `Uri` class.

**3. Advanced level.** Use TDD to develop a library for parsing a URL into parts and a builder of a URL from parts with parameter encoding (refactoring into a builder), with MSTest tests. A dotnet CLI application parses the URL from the arguments and prints the parts; errors go to `Console.Error`.

### Variant 23. Patient queue {#v23}

**1. Initial level.** Create a class for a queue of patients in order of arrival (add, call the next, count) and an MSTest test project with tests.

**2. Basic level.** Create a class for a queue of patients with priorities (urgent, priority, regular) and MSTest tests that check the order of calling and the preservation of the order of arrival within a priority.

**3. Advanced level.** Create a class for a queue of patients with priorities (urgent, priority, regular), waiting time from `TimeProvider`, and a priority increase after 2 hours of waiting, and MSTest tests with `FakeTimeProvider` for boundary points in time.

### Variant 24. Physical fitness standards {#v24}

**1. Initial level.** Create a method that determines the grade for a 100 m run result for boys from a table of standards and table-driven MSTest tests with `[DataRow]`.

**2. Basic level.** Create a standards class that determines the grade from an exercise result, sex (boys, girls), and several exercises, and MSTest tests with `[DynamicData]`, including boundary results.

**3. Advanced level.** Create a library for grading physical fitness standards (exercises, sex, grade thresholds) that loads the table from a JSON file, with MSTest tests of loading and 100% branch coverage of the standards table according to the coverage report.

### Variant 25. Mobile plans {#v25}

**1. Initial level.** Create a method that calculates the cost of calls from the duration and the per-minute price of a plan, and an MSTest test project with tests.

**2. Basic level.** Create a calculation of call costs for three plans with duplicated code, write MSTest characterization tests, and eliminate the duplication by refactoring.

**3. Advanced level.** Use TDD to develop a mobile plans library with minute bundles, overage charges, and a comparison of plans for a subscriber profile (minutes, SMS, and data per month), with MSTest tests. A dotnet CLI application selects a plan for the profile from the arguments; errors go to `Console.Error`.

### Variant 26. LINQ reports {#v26}

**1. Initial level.** Create a method with a LINQ query that filters products (name, category, price) by category and sorts them by price, and MSTest tests on a small data set.

**2. Basic level.** Create a LINQ method that groups sales (date, category, amount) by category and month, and MSTest tests, including empty groups and boundary dates.

**3. Advanced level.** Create a sales reports library with LINQ by splitting a long report method into small query methods (filtering, grouping, totals) with separate MSTest tests, and check that the old and new methods give the same results on large generated data.

### Variant 27. Saving to JSON {#v27}

**1. Initial level.** Create a record with simple properties, methods for saving and loading JSON (`System.Text.Json`), and an MSTest test of the “serialization – deserialization” round trip.

**2. Basic level.** Create a class that saves a model with collections, enumerations, and dates to a JSON file, and MSTest tests with a temporary directory, including missing properties (default values).

**3. Advanced level.** Create a notes service with storage through an interface and two storage implementations: a fake in-memory one for the MSTest unit tests of the service and a JSON file one for separate integration tests.

### Variant 28. Event notifications {#v28}

**1. Initial level.** Create a class with an event (for example, `PriceChanged` with the old and new price) and MSTest tests that check that a subscriber receives the event with the correct data.

**2. Basic level.** Create a class with a price change event and MSTest tests of the order in which several subscribers are called, unsubscribing, and a price change without subscribers.

**3. Advanced level.** Create a publisher of price change events by refactoring from `event` to an observer interface while keeping the MSTest tests, and tests of handling an exception in one of the subscribers.

### Variant 29. Chess pieces {#v29}

**1. Initial level.** Create a method that returns the valid moves of a rook from a given square of an empty 8×8 chessboard, and an MSTest test project with tests.

**2. Basic level.** Create chess piece classes (knight, bishop, queen) with a method for valid moves that takes the board edges and obstacles into account, and MSTest tests.

**3. Advanced level.** Use TDD to develop the moves of chess pieces, including the pawn (first move, capture, promotion), with refactoring into a common base class for pieces and MSTest tests. A dotnet CLI application prints the valid moves of a piece from the square in the arguments; errors go to `Console.Error`.

### Variant 30. Parking {#v30}

**1. Initial level.** Create a method that calculates the cost of parking from the duration and the hourly rate, and an MSTest test project with tests.

**2. Basic level.** Create a parking lot class that records entry and exit through `TimeProvider` and calculates the cost with 15 free minutes and rounding up to the hour, and MSTest tests with `FakeTimeProvider`.

**3. Advanced level.** Create a parking rates library (hourly with rounding, night, daily maximum) as strategies after refactoring, with MSTest tests, including crossing midnight. A dotnet CLI application processes a log of entries and exits from a file; errors go to `Console.Error`.

## Procedure

1. Study the theory and worked examples.
2. Create a solution with a class library, a console application, and an MSTest test project.
3. Identify the equivalence classes and boundary values for the methods of your variant; make a table of test cases.
4. Implement the task of the chosen difficulty level; for TDD tasks, record the sequence of “red – green – refactor” steps in version control or in a report.
5. Run the tests in Test Explorer and with the `dotnet test` command, obtain a code coverage report, and explain the uncovered parts.
6. Demonstrate the tests to the instructor, show a failing test, and answer the review questions.
