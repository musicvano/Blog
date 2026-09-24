---
title: "Tasks"
description: "Topic 17. SOLID and design patterns: task variants"
outline: [2, 3]
sourceHash: "e87f9787339d5cda435679b778d29129b4ee1e4c5ccdc780bbd4226bf10878ec"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Payroll {#v1}

**1. Initial level.** Create a payroll console program in which a `switch` on the pay type (salary, hourly, piece rate) is replaced by an `IPayStrategy` interface and three strategies. An employee has a name, a pay type, and parameters (salary, hours and rate, number of items and piece rate). Print the pay of several employees.

**2. Basic level.** Create a payroll console program with `IPayStrategy` strategies (salary, hourly, piece rate), a factory method that chooses a strategy by name, a bonus as a wrapper strategy (decorator), and a `PayrollService` class that receives its dependencies through the constructor. The user enters employees (name, pay type, parameters, bonus), and the program prints the payroll.

**3. Advanced level.** Create a payroll class library with pay type strategies (`IPayStrategy`), a registry of strategies that can be extended without changing code (OCP), taxes and deductions as decorators, and a data source interface with a test implementation. A dotnet CLI application processes a timesheet from standard input (name, pay type, parameters) and prints the payroll; errors go to `Console.Error`.

### Variant 2. Pizzeria {#v2}

**1. Initial level.** Create a pizzeria console program with the Decorator pattern: a base pizza has a description and a price, and ingredient decorators (cheese, mushrooms, ham) extend the description and increase the price. Put together several pizzas and print their descriptions and prices.

**2. Basic level.** Create a pizzeria console program with a Builder for a pizza order (size, crust, ingredients with prices): the `Build` method checks the constraints (no more than 6 ingredients) and calculates the price. The user chooses the parameters in a menu, and the program prints the composition and price or a message about the violation.

**3. Advanced level.** Create a pizzeria class library: a pizza with a size, crust, and ingredients, a menu of standard pizzas created by a factory method, and discounts as order decorators (percentage, “second pizza cheaper”). A dotnet CLI application places orders from standard input (pizza name, quantity, discount code) and prints a receipt; errors go to `Console.Error`.

### Variant 3. Drawing shapes {#v3}

**1. Initial level.** Create a console program with a canvas that stores shapes (name, coordinates), a command interface with an `Execute` method, and the commands `AddShape` and `MoveShape`. Execute several commands and print the state of the canvas.

**2. Basic level.** Create a graphics editor console program: a canvas with shapes (name, coordinates), the commands `AddShape` and `MoveShape` with the methods `Execute` and `Undo`, a command history with `Undo`/`Redo`, and a group move as a composite command made of several commands. The user enters actions in a menu, and the program prints the canvas after each one.

**3. Advanced level.** Create a graphics editor class library: a canvas with shapes (type, coordinates, size), add, move, and delete commands with `Undo`, saving the command history to JSON, and restoring the drawing from the history. A dotnet CLI application runs a script of commands from standard input and prints the canvas with characters; errors go to `Console.Error`.

### Variant 4. Vending machine {#v4}

**1. Initial level.** Create a vending machine console program with the state in an enumeration (waiting, money inserted, dispensing), products with prices, and the methods `InsertCoin` and `SelectProduct`, which check the current state with a `switch`. Run several purchase scenarios and print the machine’s messages.

**2. Basic level.** Create a vending machine console program based on the State pattern: the waiting, money inserted, and dispensing states are classes with an `IVendingState` interface with the methods `InsertCoin` and `SelectProduct`; invalid actions are rejected by the current state. The user inserts coins and chooses a product in a menu, and the program prints the state and messages.

**3. Advanced level.** Create a vending machine class library based on the State pattern (waiting, money inserted, dispensing, “Out of stock”) with products and stock levels, returning change, and a sale event to which a report subscribes (Observer). A dotnet CLI application runs a scenario from standard input (`coin`, `select`, `refill`) and prints a sales report; errors go to `Console.Error`.

### Variant 5. Customer notifications {#v5}

**1. Initial level.** Create a console program with an `INotificationChannel` interface (a `Send` method) and the classes `EmailChannel` and `SmsChannel`, which print messages; an order service receives a channel through its constructor and notifies the customer when an order is placed. Place several orders with different channels.

**2. Basic level.** Create a notifications console program based on the Observer pattern: customers with `INotificationChannel` channels (email, SMS) subscribe to store events (product arrival, discount) and unsubscribe, and the event service depends only on abstractions (DIP). The user manages subscriptions and generates events in a menu, and the program prints the messages sent.

**3. Advanced level.** Create a notifications library with `INotificationChannel` channels (email, SMS), channel settings for each customer, subscriptions to store events, retries as a channel decorator, and a test channel that stores messages. A dotnet CLI application simulates events from standard input (customers, subscriptions, events) and prints the messages sent; errors go to `Console.Error`.

### Variant 6. Payment system {#v6}

**1. Initial level.** Create a console program with an `IPaymentGateway` interface (a `Pay(decimal amount, string account)` method) and an adapter for a third-party class that has only a `MakeTransfer(string json)` method. Make several payments through the interface and print the results.

**2. Basic level.** Create a payment console program with an `IPaymentGateway` interface, adapters for two “third-party” providers with different methods and response formats (JSON, a string with a code), handling of their errors, and a factory method that chooses a provider by name. The user enters the provider, amount, and account, and the program prints the payment result.

**3. Advanced level.** Create a payments library with an `IPaymentGateway` interface, adapters for third-party providers, a logging decorator, and a `CheckoutFacade` (data validation, payment, receipt generation). A dotnet CLI application processes payments from standard input (provider, amount, account) and prints receipts; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 7. Report generator {#v7}

**1. Initial level.** Create a console program with an `IReportFormatter` interface and strategies for text and CSV formatting of a sales report (product, quantity, amount). Print the same report in both formats.

**2. Basic level.** Create a sales report console program (product, quantity, amount) with `IReportFormatter` strategies (text, CSV, Markdown), a factory method that chooses the format by file extension, and a `ReportService` class that does not change when formats are added (OCP). The user enters a file name, and the program writes the report to it.

**3. Advanced level.** Create a reports library with a Builder for the report structure (title, tables, totals) and `IReportFormatter` formatters (text, CSV, Markdown) as strategies. A dotnet CLI application reads sales data from a JSON file and creates a report in the format from the `--format` option; errors go to `Console.Error`.

### Variant 8. Logging {#v8}

**1. Initial level.** Create a console program with an `ILogger` interface (a `Log(level, message)` method) and a `ConsoleLogger` implementation; an order service receives the logger through its constructor and records its actions in it. Perform several service operations.

**2. Basic level.** Create a console program with an `ILogger` interface, a `ConsoleLogger` implementation, and decorators for a timestamp, a level filter, and duplication to a file; in the composition root, combine the decorators and pass the logger to a service through its constructor. The user chooses a combination in a menu, and the program prints the log entries.

**3. Advanced level.** Create a logging library with an `ILogger` interface, console and file implementations, decorators (timestamp, level filter, duplication), and a factory method that builds a chain of decorators from a configuration in a JSON file; the logger is wired up through a DI container. A dotnet CLI application demonstrates the configurations from the files given as arguments; errors go to `Console.Error`.

### Variant 9. Smart home {#v9}

**1. Initial level.** Create a console program with smart home devices (name, on/off state), the commands `TurnOn` and `TurnOff`, and a remote control that executes the commands assigned to it. Print the state of the devices after the buttons are pressed.

**2. Basic level.** Create a smart home console program with `TurnOn`/`TurnOff` commands for devices, a Composite of groups (room, floor) to which the same commands are applied, and scenes as composite commands with `Undo`. The user executes commands and scenes in a menu, and the program prints the state of the devices.

**3. Advanced level.** Create a smart home library with devices and groups, commands and scenes with `Undo`, a time-based schedule of scenes, sensor events (Observer) that trigger scenes, and a control facade. A dotnet CLI application runs scenes and events from standard input and prints the state of the home; errors go to `Console.Error`.

### Variant 10. PC configurator {#v10}

**1. Initial level.** Create a console program with a computer class and a Builder that sets the processor, memory, storage, and graphics card in sequence. Assemble two configurations and print their components.

**2. Basic level.** Create a PC configurator console program with a Builder for a computer (a processor with a socket, motherboard, memory, storage, graphics card, power supply): the `Build` method checks socket compatibility and power supply capacity, and ready-made configurations (office, gaming) are defined by director methods. The program prints the configurations or compatibility errors.

**3. Advanced level.** Create a PC configurator library with a component catalog in JSON (type, price, socket, power), a Builder with a compatibility check, selection strategies (“cheapest,” “gaming”), and a configuration report. A dotnet CLI application selects a configuration by budget and strategy from the arguments; errors go to `Console.Error`.

### Variant 11. Refactoring a library system {#v11}

**1. Initial level.** Create a console program with a `LibraryManager` class that lends books, charges late fees, writes data to a file, and notifies readers; identify its responsibilities and move the fee calculation into a separate class. Print the fees for several loans.

**2. Basic level.** Create a library console program in which the `LibraryManager` class (lending books, fees, writing to a file, notifications) is split according to SRP into a lending service, a fee calculator, a repository, and a notifier with interfaces; the objects are assembled in the composition root. The user lends and returns books in a menu, and the program prints the fees.

**3. Advanced level.** Create a class library for tracking book loans with a lending service, a fee calculator, a notifier, and a repository interface with two implementations (memory, JSON file), test implementations of the dependencies, and verification of the service’s behavior without files. A dotnet CLI application selects the storage with the `--storage` option and executes lending commands; errors go to `Console.Error`.

### Variant 12. Discount system {#v12}

**1. Initial level.** Create a console program with a shopping cart (name, price, quantity) and discount strategies (percentage, fixed, no discount). Apply each strategy to the cart and print the resulting totals.

**2. Basic level.** Create a discount console program for a shopping cart (name, price, quantity) in which compound discounts (seasonal + loyalty card) are implemented as decorators over a base strategy with a cap on the maximum discount. The user enters products and chooses discounts, and the program prints the total before and after the discount.

**3. Advanced level.** Create a discount library for a shopping cart with rules in JSON (type, value, condition), a factory method for creating rule strategies, decorators for compound discounts, and selection of the most advantageous combination. A dotnet CLI application processes carts from standard input and prints the chosen discount and the total; errors go to `Console.Error`.

### Variant 13. Virtual file system {#v13}

**1. Initial level.** Create a console program with a Composite for a virtual file system: files (name, size) and folders share an interface with a `Size` property, and the size of a folder is the sum of its contents. Build a tree and print the sizes.

**2. Basic level.** Create a virtual file system console program with a Composite of files (name, size) and folders, a search by mask in the tree, output of the tree with indentation, and moving elements between folders with a check for cycles. The user performs actions in a menu.

**3. Advanced level.** Create a virtual file system library with a Composite of files and folders, the commands `mkdir`, `mv`, and `rm` with `Undo`, and saving the tree to JSON. A dotnet CLI application executes commands from standard input and prints the tree; errors go to `Console.Error`.

### Variant 14. Strategy game {#v14}

**1. Initial level.** Create a console program with units (name, health, strength) and behavior strategies (attack, defense, retreat) that change during the game. Simulate several turns and print the units’ actions.

**2. Basic level.** Create a strategy game console program with units (name, health, strength), a factory method for creating units of different races (derived factory classes), and an Observer that reports a unit’s death. The user chooses a race and attacks units in a menu, and the program prints the events.

**3. Advanced level.** Create a strategy game library with units and behavior strategies, an army Builder, order commands with a queue, and a battle simulation with a fixed random number generator seed. A dotnet CLI application simulates a battle between two armies from JSON descriptions and prints the course of the battle and the winner; errors go to `Console.Error`.

### Variant 15. Multimedia converter {#v15}

**1. Initial level.** Create a `MediaConverter` facade with a `Convert(file, format)` method that calls the reading, transcoding, and writing classes in sequence (stubs that print the steps).

**2. Basic level.** Create a multimedia converter console program with a codec interface, adapters for two “third-party” codecs with different interfaces, and a factory method that chooses a codec by format. The user enters a file and a format, and the program prints the conversion steps.

**3. Advanced level.** Create a library for a media file processing pipeline with steps (reading, transcoding, writing), step decorators (volume normalization, trimming), and progress events. A dotnet CLI application performs the conversion with the parameters from the arguments (file, format, processing) and prints the progress; errors go to `Console.Error`.

### Variant 16. Order validation {#v16}

**1. Initial level.** Create a console program with an order (amount, address, products with availability), a validation rule interface, and several rules (amount, address, availability). Validate several orders and print the error messages.

**2. Basic level.** Create an order validation console program (amount, address, products) with a rule interface and a Composite of rules: the compound rules “all of” and “any of,” collecting all error messages. The user enters an order, and the program prints the validation result.

**3. Advanced level.** Create an order validation library with rules configured in JSON, a factory method for creating rules, the compound rules “all of” and “any of,” and a decorator that disables a rule by a condition. A dotnet CLI application validates orders from standard input and prints the validation results; errors go to `Console.Error`.

### Variant 17. Restaurant menu {#v17}

**1. Initial level.** Create a console program with a Composite for a restaurant menu: sections and dishes (name, price) share an interface, and sections contain dishes and subsections. Print the menu with indentation.

**2. Basic level.** Create a restaurant menu console program with a Composite of sections and dishes (name, price, vegetarian flag), an iterator (`yield return`) over all dishes, a search for vegetarian dishes, and a calculation of section prices. The program prints the menu, the vegetarian dishes, and the section totals.

**3. Advanced level.** Create a restaurant menu library with sections and dishes (Composite), a Builder for the menu of the day, dish decorators (portion, add-ons) that change the description and price, and export to JSON. A dotnet CLI application builds a menu from the file given as an argument; errors go to `Console.Error`.

### Variant 18. Library {#v18}

**1. Initial level.** Create a console program with a book repository interface (title, author, availability) and an in-memory implementation; a lending service receives the repository through its constructor. Lend and return several books and print their state.

**2. Basic level.** Create a library console program in which a “fat” book repository interface is split into read and write interfaces (ISP): the lending service uses both, and the reporting service uses only reading. The user lends books and views reports in a menu.

**3. Advanced level.** Create a class library for tracking books with read and write repository interfaces, in-memory and JSON file implementations, and lending and reporting services registered in the `Microsoft.Extensions.DependencyInjection` DI container with different lifetimes; the storage implementation is replaced through configuration. A dotnet CLI application executes commands from arguments; errors go to `Console.Error`.

### Variant 19. Document workflow {#v19}

**1. Initial level.** Create a console program with a document (title, author) whose state (“draft,” “under review,” “approved,” “rejected”) is defined by an enumeration, and transition methods. Perform several transitions and print the state.

**2. Basic level.** Create a document workflow console program based on the State pattern: the states “draft,” “under review,” “approved,” and “rejected” are classes with a common interface, there is a transition log, and invalid transitions throw an exception. The user performs actions in a menu, and the program prints the state and the log.

**3. Advanced level.** Create a document workflow library with documents based on the State pattern, approval routes (several approvers), notifications of participants (Observer), and action commands with a history. A dotnet CLI application processes actions from standard input (document, user, action) and prints the state and history; errors go to `Console.Error`.

### Variant 20. Data format converter {#v20}

**1. Initial level.** Create a console program with an `IDataReader` interface that returns records with fields and an adapter for a third-party CSV reader with an incompatible interface. Read a CSV file through the interface and print the records.

**2. Basic level.** Create a data conversion console program with an `IDataReader` interface and CSV, JSON, and XML readers, a factory method that chooses a reader by file extension, and format writers as strategies. The user enters an input file and an output format, and the program writes the result.

**3. Advanced level.** Create a data conversion library with format readers and writers (CSV, JSON, XML), a registry of formats that can be extended without changing code (OCP), a `Convert(input, output)` facade, and data validation. A dotnet CLI application converts the files from the arguments; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 21. Server monitoring {#v21}

**1. Initial level.** Create a console program with a server metric class (name, threshold, current value), a load-exceeded event, and two subscribers (console, log). Enter several values and print the notifications.

**2. Basic level.** Create a server monitoring console program based on the Observer pattern for CPU, memory, and disk metrics with thresholds and notification strategies (immediately, after three consecutive breaches). The user enters metric values, and the program prints notifications.

**3. Advanced level.** Create a server monitoring library with metrics and thresholds in JSON rules, notifier subscribers, notifier decorators (delay, grouping), and an incident log. A dotnet CLI application processes metric values from standard input and prints incidents; errors go to `Console.Error`.

### Variant 22. Document templates {#v22}

**1. Initial level.** Create a console program with a Builder for a business letter (recipient, subject, paragraphs, signature) that composes the letter and prints its text.

**2. Basic level.** Create a documents console program with a Builder (recipient, subject, paragraphs, signature) and a factory method for document types (letter, order, certificate) with different required parts that are checked in `Build`. The user chooses a type and enters the parts, and the program prints the document or the errors.

**3. Advanced level.** Create a documents library (letter, order, certificate) with a Builder, templates in JSON (required parts, text with placeholder fields), and formatters (text, HTML) as strategies. A dotnet CLI application creates a document from a template and a data file given in the arguments; errors go to `Console.Error`.

### Variant 23. Navigator {#v23}

**1. Initial level.** Create a console program with strategies for calculating route time (distance, number of intersections) for car, walking, and bicycle. Print the time of one route for each strategy.

**2. Basic level.** Create a navigator console program with route time strategies (car, walking, bicycle), a factory method by name, changing the strategy at run time, and a traffic jam decorator for the car strategy. The user enters a distance and a mode of travel, and the program prints the time.

**3. Advanced level.** Create a navigator library with a road graph (nodes, edges with a length and a type), edge cost strategies (car, walking, bicycle), and a search for the best route. A dotnet CLI application builds a route between the nodes from the arguments using a map in JSON and prints the path and the time; errors go to `Console.Error`.

### Variant 24. Smart home theater {#v24}

**1. Initial level.** Create a console program with projector, sound system, and lighting classes and a `HomeTheater` facade with a `WatchMovie` method that turns on the projector and sound and dims the lights. Print the steps of starting a movie.

**2. Basic level.** Create a home theater console program with a `HomeTheater` facade (the methods `WatchMovie` and `EndMovie`), devices passed through the facade’s constructor, and an adapter for a “third-party” audio receiver with an incompatible interface. The user controls the theater in a menu, and the program prints the devices’ actions.

**3. Advanced level.** Create a home theater library with devices (projector, sound, lighting), remote control commands with `Undo` of the last action, and scene profiles (movie, music). A dotnet CLI application runs a scenario from standard input and prints the state of the devices; errors go to `Console.Error`.

### Variant 25. Chess game {#v25}

**1. Initial level.** Create a console program with a chessboard (pieces on squares) and a piece move command with the methods `Execute` and `Undo`. Make and undo several moves, printing the board.

**2. Basic level.** Create a chess game console program with a board, move commands (`Execute`, `Undo`), a move history with undo and redo, recording the game in notation, and a ban on moves off the board. The user enters moves in a menu, and the program prints the board.

**3. Advanced level.** Create a chess game library with move commands, move validation strategies for each piece type created by a factory method, and saving the game to JSON. A dotnet CLI application replays a game from a file and prints the board after each move; errors go to `Console.Error`.

### Variant 26. Console commands {#v26}

**1. Initial level.** Create a console program with a command interface (a name and an `Execute(string[] args)` method) and three commands (`echo`, `sum`, `time`). Execute the commands entered by the user and print the result.

**2. Basic level.** Create a console shell with a command interface (name, description, `Execute(string[] args)`), a command registry to which a new command is added without changing the handler code (OCP), and a `help` command that takes the descriptions from the commands. The user enters commands with arguments.

**3. Advanced level.** Create a console shell library with a command interface, a command registry, command decorators (timing, argument validation), and dependency injection into commands. A dotnet CLI application executes commands from standard input; errors go to `Console.Error`.

### Variant 27. Employee hierarchy {#v27}

**1. Initial level.** Create a console program that demonstrates an LSP violation: `Intern` inherits from `Employee` with a `CalculateBonus` method and throws an exception in it. Calculate the bonuses of a list of employees and print the result.

**2. Basic level.** Create a console program with an employee hierarchy (`Employee`, `Manager`, `Developer`, `Intern`) in which the LSP violation (an intern has no bonus) is fixed by segregating the interfaces `IBonusEligible` and `IOvertimeEligible`. Polymorphic code calculates bonuses and overtime for all types and prints the result.

**3. Advanced level.** Create an HR library with an employee hierarchy, segregated interfaces (`IBonusEligible`, `IOvertimeEligible`), bonus strategies, and a report that uses only the interfaces it needs. A dotnet CLI application processes employees from a JSON file and prints a report; errors go to `Console.Error`.

### Variant 28. Weather service {#v28}

**1. Initial level.** Create a console program with an `IWeatherService` interface (temperature and weather description for a city) and a stub implementation with fixed data. Print the weather for several cities.

**2. Basic level.** Create a console program with an `IWeatherService` interface, a stub implementation, and decorators for caching (a repeated request for the same city does not call the service) and retries on error, with a call counter. The user enters cities, and the program prints the weather and the number of calls.

**3. Advanced level.** Create a weather library with an `IWeatherService` interface, an adapter for the format of a “third-party” service, caching and retry decorators, and registration in a DI container. A dotnet CLI application requests the weather for the cities in the arguments and shows cache statistics; errors go to `Console.Error`.

### Variant 29. Game level {#v29}

**1. Initial level.** Create a console program with a factory method that creates level objects from a map symbol (`#` is a wall, `.` is a floor, `E` is an enemy). Convert the lines of a map into objects and print them.

**2. Basic level.** Create a game level console program with cells (wall, floor, enemy), a Composite of rooms and the level, a count of enemies in all rooms, and output of the map with characters. The program builds a level from several rooms and prints the map and the number of enemies.

**3. Advanced level.** Create a game level library that loads a map from a text file (symbols for a wall, a floor, an enemy, an entrance, and an exit), a level Builder, and a check that the exit is reachable from the entrance. A dotnet CLI application checks all levels from the directory given as an argument; errors go to `Console.Error`.

### Variant 30. Banking operations {#v30}

**1. Initial level.** Create a console program for transfers between accounts with fee strategies (no fee, fixed, percentage). Make several transfers and print the amounts with the fee.

**2. Basic level.** Create a console program for transfers between accounts with a transfer service that receives a fee strategy (no fee, fixed, percentage) and a logger through its constructor, and a decorator for logging operations. The user enters the accounts and the amount, and the program prints the result and the log.

**3. Advanced level.** Create a banking operations library with accounts, the commands `Deposit`, `Withdraw`, and `Transfer` with undo, notifications about operations (Observer), and a bank facade. A dotnet CLI application processes operations from standard input and prints balances; errors go to `Console.Error`.

## Procedure

1. Study the theory and worked examples.
2. For your variant, identify the classes and their responsibilities and draw a UML class diagram indicating the patterns and SOLID principles applied.
3. Create a solution and project; put each type in a separate file, and choose the concrete implementations in the composition root (`Program.cs`).
4. Implement the task of the chosen difficulty level; inject dependencies through the constructor.
5. Show how to add a new variant of behavior (a new strategy, decorator, or command) without changing the existing classes.
6. Demonstrate the program to the instructor, explain the design decisions, and answer the review questions.
