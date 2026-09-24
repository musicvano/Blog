---
title: "Tasks"
description: "Topic 10. Abstract classes, interfaces: task variants"
outline: [2, 3]
sourceHash: "1aa17acba58bea124f25aab817c05bcf8322e8190df52557ddb79570a2b6503f"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Payment providers {#v1}

**1. Initial level.** Create an `IPaymentProvider` interface with a `Pay(decimal amount)` method that returns the fee, and the classes `CardProvider`, `BankTransferProvider`, and `WalletProvider`. Make a payment through each provider using a variable of the interface type and print the fees.

**2. Basic level.** Create an `IPaymentProvider` interface with the properties `Name` and `MaxAmount` and a `TryPay` method with an `out` message, an abstract `PaymentProviderBase` class with a shared transaction log, and three providers (card, bank transfer, wallet) with different fees. For each entered amount, the console program selects the provider with the lowest fee and prints a report.

**3. Advanced level.** Create a class library with the `IPaymentProvider` and `IRefundable` interfaces, an abstract base class, and three providers (one without refunds). A dotnet CLI application processes payments and refunds from standard input, checks refund support with `is`, and prints a transaction report; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 2. Book catalog {#v2}

**1. Initial level.** Create a `Book` class (title, author, year) that implements `IComparable<Book>` by title, and sort an array of books with `Array.Sort`. Print the books before and after sorting.

**2. Basic level.** Create a `Book` class (title, author, year, pages) with `IComparable<Book>` (by author, then title) and `IComparer<Book>` comparer classes by publication year and by page count. The console program sorts the catalog by a field chosen by the user and prints a table.

**3. Advanced level.** Create a class library with a `Book` class (title, author, year, pages) that implements `IComparable<Book>` and `IEquatable<Book>` with overridden `Equals`/`GetHashCode`, and a multi-criteria comparer (`CompositeComparer` with an array of `IComparer<Book>`). A dotnet CLI application sorts a catalog from standard input according to the `--sort author,year:desc,title` option, removes duplicates, and prints a table; errors go to `Console.Error`.

### Variant 3. Security system {#v3}

**1. Initial level.** Create an `ISensor` interface with an `IsTriggered` property and a `Check()` method, and the classes `DoorSensor`, `MotionSensor`, and `SmokeSensor`. Check an array of sensors and print the ones that are triggered.

**2. Basic level.** Create the interfaces `ISensor` (triggering, checking) and `IArmable` (arming and disarming), an abstract `SensorBase` class with a zone and an event log, and door, motion, and smoke sensors (the smoke sensor cannot be disarmed). The console program simulates a day of security monitoring using a scenario of events from input and prints the log.

**3. Advanced level.** Create a security system library with door, motion, and smoke sensors, the interfaces `ISensor` (triggering), `IArmable` (arming), and `IBatteryPowered` (some of the sensors), and a `SecurityPanel` class that accepts any `ISensor`. A dotnet CLI application processes events from standard input and generates alarms with a delay for the entrance door and low-battery warnings; errors go to `Console.Error`.

### Variant 4. Report export {#v4}

**1. Initial level.** Create an `IReportFormatter` interface with a `Format(string[] headers, string[][] rows)` method and the classes `TextFormatter` and `CsvFormatter`. Print one table in both formats.

**2. Basic level.** Create an `IReportFormatter` interface with a `Format(string[] headers, string[][] rows)` method, an abstract `FormatterBase` class with a shared column width calculation, and text, CSV, and Markdown formatters. The report method accepts an `IReportFormatter`. The console program generates a group performance report in the format chosen by the user.

**3. Advanced level.** Create a library of formatters (framed text, CSV with escaping, Markdown, HTML) and a registry of formatters by name. A dotnet CLI application converts CSV from standard input to the `--to` format and checks that the CSV formatter reproduces the input data; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 5. Cooking recipes {#v5}

**1. Initial level.** Create an abstract `Recipe` class with a `Cook()` template method (preparation, cooking, serving) in which cooking is abstract, and the classes `Soup` and `Salad`. Cook both dishes.

**2. Basic level.** Create an abstract `Recipe` class with a `Cook()` template method, an abstract cooking step and `Minutes` property, a virtual `Serve` step, and an optional `Marinate` step (only if the virtual `NeedsMarinade` property is true), plus several dishes. The console program builds a menu from the selected dishes and prints a cooking plan with times.

**3. Advanced level.** Create a recipe library with a template method, an `IVegetarian` interface, and a calculation of a parallel kitchen plan (steps of different dishes taking time into account). A dotnet CLI application builds a lunch plan from the recipes given as arguments and prints a timeline of steps; errors go to `Console.Error`.

### Variant 6. Game objects {#v6}

**1. Initial level.** Create the interfaces `IMovable` and `IDamageable` and the classes `Player` (both), `Wall` (`IDamageable`), and `Cloud` (`IMovable`). For an array of objects of type `object`, move the movable ones and damage the destructible ones using `is`.

**2. Basic level.** Create an abstract `GameObject` class with a position and an abstract `Update()` method, the interfaces `IMovable`, `IAttackable`, and `IDamageable`, and the classes `Player`, `Enemy`, `Wall`, and `Cloud`, which implement different sets of interfaces. The console program runs 10 steps of the game loop and prints the actions of each object.

**3. Advanced level.** Create a game object library with an abstract `GameObject` (position, `Update()`), the interfaces `IMovable`, `IDamageable`, and `ICollidable` (collisions), object destruction, and an event log. A dotnet CLI application simulates a grid-based game from a configuration from standard input with a fixed seed and prints the state of the board after each step; errors go to `Console.Error`.

### Variant 7. Library publications {#v7}

**1. Initial level.** Create an abstract `Publication` class with a title and an abstract `LoanDays()` method, and the classes `Book`, `Magazine`, and `Reference` (not lent; `LoanDays` = 0). Print the loan periods.

**2. Basic level.** Create an abstract `Publication` class with a title and abstract methods `LoanDays()` and one that calculates the late fee, the classes `Book`, `Magazine`, and `Reference`, and an `IBorrowable` interface with the methods `Borrow` and `Return`, which only books and magazines implement. The console program lends and returns publications through commands and prints the fees.

**3. Advanced level.** Create a library with an abstract `Publication` and the interfaces `IBorrowable`, `IReservable`, and `IDigital` (digital publications are never overdue). A dotnet CLI application processes an operation log from standard input and prints a report of debtors and reservation queues; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 8. Food diary {#v8}

**1. Initial level.** Create an abstract `FoodEntry` class with a mass and an abstract `CaloriesPer100g` property, and the classes `Fruit`, `Dish`, and `Drink`. Print the calories of the day’s entries.

**2. Basic level.** Create an abstract `FoodEntry` class (mass, calories per 100 g), the classes `Fruit`, `Dish`, and `Drink`, an `INutritionInfo` interface (protein, fat, carbohydrates) that drinks do not implement, and a `DailyLog` class that accepts `FoodEntry` objects. The console program prints a daily report with calories and macronutrient shares for the entries that support them.

**3. Advanced level.** Create a food diary library with `FoodEntry` records (name, time, mass, calories) that implement `IComparable<FoodEntry>` by calories, and `IComparer<FoodEntry>` comparers by time and name. A dotnet CLI application processes a week’s diary from standard input, compares the days with the calorie target, and prints the top foods; errors go to `Console.Error`.

### Variant 9. Data storage {#v9}

**1. Initial level.** Create an `IRepository` interface with the methods `Add(string item)` and `GetAll()` and a `Count` member, and a `MemoryRepository` class. Add several items and print them through the interface variable.

**2. Basic level.** Create an `IStudentRepository` interface with methods for adding, searching by surname, and removing, and an in-memory implementation with an array. The `StudentService` class accepts the repository in its constructor. The console program manages students through the service.

**3. Advanced level.** Create a library with an `IStudentRepository` interface (adding, searching by surname, removing), two implementations—in memory and in a text file (with `IDisposable` to finish writing)—and a student service that does not depend on the implementation. A dotnet CLI application selects the storage with the `--storage memory|file` option and executes commands from arguments; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 10. Country tax rules {#v10}

**1. Initial level.** Create an `ITaxRule` interface with a `Calculate(decimal income)` method and classes with flat and progressive rates. Calculate the tax on one income under each rule.

**2. Basic level.** Create an abstract `TaxRuleBase` class with a country name and social contributions and an `ITaxRule` interface; the `TaxComparer` class compares the tax burden under several rules. The console program prints a comparison table for the entered incomes.

**3. Advanced level.** Create a library of tax rules that loads brackets from a text description, with `ITaxRule` and `IDeductible` (tax deductions). A dotnet CLI application calculates and compares taxes for incomes from standard input using the rules from the `--rules` option; errors go to `Console.Error`.

### Variant 11. Delivery routes {#v11}

**1. Initial level.** Create an `IRoute` interface with the methods `Cost()` and `Hours()` and the classes `RoadRoute`, `RailRoute`, and `AirRoute`. Print the cost and time for an array of routes.

**2. Basic level.** Create an `IRoute` interface with the methods `Cost()` and `Hours()`, an abstract `RouteBase` class with a distance and a cargo weight, road, rail, and air route classes, and an `IComparer<IRoute>` by cost and by time. For an entered distance, weight, and deadline, the console program selects the cheapest route that meets the deadline.

**3. Advanced level.** Create a delivery route library with an `IRoute` interface (cost, time), road, rail, and air routes, combined routes (a composition of several `IRoute` objects with transshipment), and weight and day-off restrictions. A dotnet CLI application selects a route for orders from standard input according to the `--optimize cost|time` criterion; errors go to `Console.Error`.

### Variant 12. Music player {#v12}

**1. Initial level.** Create an `IPlayable` interface with the methods `Play()` and `Pause()` and a `Title` property, and the classes `Song` and `Podcast`. Play the elements of an array through an interface variable.

**2. Basic level.** Create an abstract `MediaTrack` class with a playback state (stopped, playing, paused) and a check of allowed transitions, the classes `Song` and `Podcast` (which remembers the position), and a playlist. The console program executes player commands.

**3. Advanced level.** Create a player library with `IPlayable`, `ISeekable` (not all tracks support seeking), and `IDisposable` to end a session. A dotnet CLI application runs a script of commands from standard input and prints a state log and listening statistics; errors go to `Console.Error`.

### Variant 13. Smartwatch apps {#v13}

**1. Initial level.** Create an abstract `WatchApp` class with a name and an abstract `Render()` method, and the classes `ClockApp`, `StepsApp`, and `WeatherApp`. Print the app screens.

**2. Basic level.** Create an abstract `WatchApp` class with a name and a `Render()` method, clock, step counter, and weather apps, the interfaces `INotifier` (sending notifications) and `IBatteryHungry` (battery drain), and a `SmartWatch` class that switches apps and tracks the battery. The console program simulates a day of using the watch through user commands.

**3. Advanced level.** Create a smartwatch library with an abstract `WatchApp` (name, `Render()`), a template method for updating an app, prioritized notifications (`IComparable<Notification>`), a “Do Not Disturb” mode, and battery tracking. A dotnet CLI application processes events from standard input and prints the notification feed and the battery usage.

### Variant 14. Checkers {#v14}

**1. Initial level.** Create an abstract `Checker` class with a color, a position, and an abstract `CanMoveTo(int row, int col)` method, and the classes `Man` and `King`. Check several moves.

**2. Basic level.** Create an abstract `Checker` class with a color, a position, and a `CanMoveTo(int row, int col)` method, the classes `Man` and `King`, and a `Board` class with a polymorphic array of checkers, capture checking, and promotion of a man to a king on the last row. The console program executes moves from input and prints the board.

**3. Advanced level.** Create a checkers library with an `IMoveValidator` interface (the rules can be switched between “Ukrainian” and “international”) and mandatory capture. A dotnet CLI application replays a game from standard input, prints the board, and reports impossible moves to `Console.Error`.

### Variant 15. Vehicle fleet {#v15}

**1. Initial level.** Create an `IMaintainable` interface with the methods `NeedsService(int mileage)` and `Service()` and the classes `Car` and `Truck` with different service intervals. Check the fleet.

**2. Basic level.** Create an abstract `FleetVehicle` class with a mileage and a service log and the interfaces `IMaintainable` and `IInspectable` (technical inspection for trucks). The console program simulates a year of operation and prints a service schedule.

**3. Advanced level.** Create a fleet library with an abstract `FleetVehicle` (mileage, service interval), cars and trucks, an `IComparer<FleetVehicle>` by service urgency, and scheduling with a limit on the number of service slots per day. A dotnet CLI application processes mileage from standard input and prints a service schedule; errors go to `Console.Error`.

### Variant 16. Calculator plugins {#v16}

**1. Initial level.** Create an `IOperation` interface with a `Symbol` property and an `Apply(double a, double b)` method, and classes for addition, subtraction, multiplication, and division. Evaluate an expression by the operation symbol.

**2. Basic level.** Create an `IOperation` interface (`Symbol`, `Apply`), addition, subtraction, multiplication, and division operations, an abstract `UnaryOperation` class for single-argument operations (square root, absolute value), and an operation registry (an `IOperation` array) with lookup by symbol and handling of unknown symbols. The console program evaluates commands from input and prints the results.

**3. Advanced level.** Create a calculator plugin library with `IOperation`, `IDescribed` (help), and an operator precedence used in expressions. A dotnet CLI application evaluates expressions from arguments with any registered operations and prints help with `--help`; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 17. Quiz {#v17}

**1. Initial level.** Create an abstract `Question` class with a text and an abstract `IsCorrect(string answer)` method, and the classes `ChoiceQuestion`, `NumberQuestion`, and `TextQuestion`. Check the answers to three questions.

**2. Basic level.** Create an abstract `Question` class with a text and an abstract `IsCorrect(string answer)` method and `MaxScore` property, multiple-choice, numeric, and text questions, an `IPartialScore` interface for questions with partial credit (several correct options), and a `Quiz` class that runs the quiz. The console program runs a test and prints the score for each question.

**3. Advanced level.** Create a testing library that loads questions of different types from a text description, with `IShuffleable` for shuffling options and a time limit per answer. A dotnet CLI application checks students’ answers from standard input and prints a grade sheet; errors go to `Console.Error`.

### Variant 18. Product card {#v18}

**1. Initial level.** Create the interfaces `IPrintable` and `IExportable`, each with a `Print()` method, and a `Product` class that implements both explicitly: printing produces a formatted card, and exporting produces a CSV line. Call both implementations.

**2. Basic level.** Create the classes `Product` and `Service` with explicit implementations of `IPrintable.Print` and `IExportable.Print` and a regular `ToString` method, as well as print and export functions that accept the interfaces. The console program prints the catalog in two modes.

**3. Advanced level.** Create a catalog library with an explicit implementation of `IExportable` for several formats through separate interfaces (`ICsvExportable`, `IJsonExportable`) with the same `Export` method. A dotnet CLI application exports a catalog from standard input in the `--format` format; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 19. Ciphers {#v19}

**1. Initial level.** Create an `ICipher` interface with the methods `Encrypt` and `Decrypt` and the classes `CaesarCipher` and `AtbashCipher`. Encrypt and decrypt a string with each cipher.

**2. Basic level.** Create an `ICipher` interface with the methods `Encrypt` and `Decrypt`, an abstract `AlphabetCipher` class with shared alphabet handling (the Ukrainian and English alphabets, preserving case), and the Caesar, Atbash, and Vigenère ciphers. The console program checks that each cipher is reversible for the entered text.

**3. Advanced level.** Create a cipher library with `ICipher`, `IKeyed` (keyed ciphers with key validation), and a cipher chain (`CipherChain`, also an `ICipher`). A dotnet CLI application encrypts standard input with the chain from the `--chain caesar:3,vigenere:KEY` option and checks reversibility; errors go to `Console.Error`.

### Variant 20. Storage units {#v20}

**1. Initial level.** Create an `IStorable` interface with the properties `Volume` and `Weight` and the classes `Box`, `Barrel`, and `Pallet`. Calculate the total volume of an array of units.

**2. Basic level.** Create an abstract `StorageUnit` class with a label and `IStorable`, and a `Shelf` class with volume and weight limits and a placement method. The console program places units on shelves and reports what did not fit.

**3. Advanced level.** Create a warehouse library with an `IStorable` interface (volume, weight), boxes, barrels, and pallets, `IStackable` (what can be stacked on top of each other), and an `IComparer<IStorable>` for the placement order (heavier first). A dotnet CLI application places cargo from standard input on racks with volume and weight limits and prints a loading plan; errors go to `Console.Error`.

### Variant 21. Utility tariffs {#v21}

**1. Initial level.** Create an abstract `Tariff` class with a name and an abstract `Cost(double usage)` method, and the classes `FlatTariff` and `TieredTariff`. Calculate the cost for several usage amounts.

**2. Basic level.** Create an abstract `Tariff` class with a name and a `Cost(double usage)` method, flat and tiered tariffs, an `ISeasonal` interface (the tariff depends on the month), and a `Bill` class that totals services with different tariffs. The console program generates a bill for the entered meter readings.

**3. Advanced level.** Create a utility tariff library (flat, tiered) with an abstract `Tariff`, a template method for the calculation (usage, discounts, rounding), and `IComparable<Tariff>` by cost for typical consumption. A dotnet CLI application selects the most economical tariff for a consumption profile from standard input; errors go to `Console.Error`.

### Variant 22. Learning platform {#v22}

**1. Initial level.** Create an `IGradable` interface with a `Grade()` method, an abstract `Assignment` class with a title, and the classes `Test` and `Essay`. Grade an array of assignments.

**2. Basic level.** Create an `IGradable` interface with a `Grade()` method, an abstract `Assignment` class with a title, a deadline, and an abstract late penalty method, the classes `Test` and `Essay`, an `IPeerReviewed` interface for essays, and a `Course` class with a final grade. The console program prints a student’s grade sheet.

**3. Advanced level.** Create a learning platform library with an abstract `Assignment` (title, deadline), tests and essays, the interfaces `IGradable` and `IAutoChecked` (tests are checked automatically), and a template method for checking a submission. A dotnet CLI application processes submissions from standard input and prints grades and a ranking; errors go to `Console.Error`.

### Variant 23. Beauty salon {#v23}

**1. Initial level.** Create an abstract `Master` class with a name and an abstract `ServiceMinutes(string service)` method, and the classes `Barber` and `Manicurist`. Print the duration of the services.

**2. Basic level.** Create an abstract `Master` class with a name and a `ServiceMinutes(string service)` method, the classes `Barber` and `Manicurist`, an `ISchedulable` interface with methods for checking free time and making an appointment, and a `Salon` class that selects a specialist for a service. The console program books the entered clients for a day and prints the schedule.

**3. Advanced level.** Create a beauty salon library with an abstract `Master` (name, rating, service durations), barbers and manicurists, an `IComparer<Master>` by rating and workload, a template method for making an appointment, and specialists’ breaks. A dotnet CLI application processes requests from standard input and prints the specialists’ schedules; errors go to `Console.Error`.

### Variant 24. Transit card {#v24}

**1. Initial level.** Create an abstract `Trip` class with an abstract `Fare()` method and the classes `BusTrip`, `MetroTrip`, and `TramTrip`. Calculate the cost of a day’s trips.

**2. Basic level.** Create an abstract `Trip` class (time, `Fare()`), the classes `BusTrip`, `MetroTrip`, and `TramTrip`, and an `IChargeable` interface with a `Charge(Trip trip)` method for a transit card with a balance and free transfers within 60 minutes. The console program simulates a day of trips and prints the charges.

**3. Advanced level.** Create a transit card library with bus, metro, and tram trips, several card types (`IChargeable` with different discounts), and a daily charge cap. A dotnet CLI application processes validations from standard input and prints a report by card; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 25. Restaurant menu {#v25}

**1. Initial level.** Create an `IPriced` interface with a `Price` property and the classes `Dish` and `Drink`. Calculate the order total for an array of `IPriced` items.

**2. Basic level.** Create the interfaces `IPriced` (`Price`) and `IDiscountable` (a discount at certain hours), the classes `Dish` and `Drink`, and a `Combo` class that implements `IPriced` and consists of several items. The console program builds an order from the menu and prints a receipt with discounts.

**3. Advanced level.** Create a menu library with `IPriced`, `IDiscountable`, and `IAllergenInfo` and comparers by price and calories. A dotnet CLI application processes orders from standard input, checks the guest’s allergens from the `--allergies` option, and prints a receipt; errors go to `Console.Error`.

### Variant 26. Cloning documents {#v26}

**1. Initial level.** Create a `Document` class with a title and an array of sections that implements `ICloneable` with a shallow copy. Show that changing a section in the copy changes the original.

**2. Basic level.** Create a `Document` class with a title and an array of sections that implements `ICloneable` with a shallow copy (`Clone()`) and has a `DeepClone()` deep copy method that creates new sections. The console program creates a document template and several copies, changes them, and prints the results that show the difference.

**3. Advanced level.** Create a document library with an `IDeepCloneable<T>` interface for the document, sections, and attachments and a check that the copies are independent. A dotnet CLI application creates documents from a template from standard input, fills in fields from arguments, and prints the results; errors go to `Console.Error`.

### Variant 27. Solids {#v27}

**1. Initial level.** Create an `IVolume` interface with a `Volume()` method and the classes `Cube`, `Sphere`, and `Cylinder`. Print the volumes of the solids in an array.

**2. Basic level.** Create an `IVolume` interface, an abstract `Solid` class that implements `IVolume` and `IComparable<Solid>` by volume and has an abstract surface area, and the classes `Cube`, `Sphere`, and `Cylinder`. The console program sorts the solids and prints a table of volumes and areas.

**3. Advanced level.** Create a library of solids (cube, sphere, cylinder) with volume and surface area, comparers by volume, area, and surface-area-to-volume ratio, and a check of whether one solid fits inside another. A dotnet CLI application processes solids from standard input and prints sorted reports; errors go to `Console.Error`.

### Variant 28. Rating systems {#v28}

**1. Initial level.** Create an `IRatingSystem` interface with an `Update(ref double winner, ref double loser)` method and the classes `PointsRating` (+3/−1) and `EloRating`. Update the ratings after one match.

**2. Basic level.** Create an `IRatingSystem` interface with a method for updating ratings after a match, an abstract `RatingSystemBase` class with a name and a change log, and points and Elo systems that handle draws. The console program runs a tournament with entered results and compares the final standings under both systems.

**3. Advanced level.** Create a library of rating systems (points, Elo, simplified Glicko) with `IRatingSystem` and `IComparer<Player>`. A dotnet CLI application processes match results from standard input and prints standings for the `--system` system; errors go to `Console.Error`.

### Variant 29. ASCII image filters {#v29}

**1. Initial level.** Create an `IImageFilter` interface with an `Apply(char[,] image)` method that returns a new image, and the classes `InvertFilter` and `MirrorFilter`. Apply the filters to an image.

**2. Basic level.** Create an `IImageFilter` interface with an `Apply(char[,] image)` method that returns a new image, an abstract `PixelFilter` class with a template method that traverses the pixels and an abstract transformation of a single character, and the filters `RotateFilter` and `OutlineFilter`, which implement `IImageFilter` directly. The console program applies a chain of filters to an ASCII image and prints the result.

**3. Advanced level.** Create a library of ASCII image filters (`char[,]`) with `IImageFilter`, `IParameterized` (filters with parameters, such as rotation or threshold), and a composite filter. A dotnet CLI application applies a chain of filters from arguments to an image from standard input and prints the result; errors go to `Console.Error`.

### Variant 30. Execution timer {#v30}

**1. Initial level.** Create an `ExecutionTimer` class that implements `IDisposable`: it remembers the start time in the constructor and prints the duration of the block in `Dispose`. Measure two code fragments in `using` blocks.

**2. Basic level.** Create an `ExecutionTimer` with a name, nested timers (indentation for inner blocks), and protection against repeated `Dispose`. The console program measures the stages of sorting with different methods in nested `using` blocks.

**3. Advanced level.** Create a profiling library with an `IDisposable` timer, an `IProfileSink` interface (console, CSV), and a report with the minimum, average, and maximum times of repeated blocks. A dotnet CLI application runs a set of algorithms from arguments and prints the profile; errors go to `Console.Error`.

## Procedure

1. Study the theory and worked examples.
2. For your variant, determine which abstractions to describe with an abstract class and which with interfaces; justify your choice; draw a UML diagram of the classes and interfaces.
3. Create a solution and project; put each type in a separate file.
4. Implement the types for the chosen difficulty level, using automatic generation of implementations (*Implement abstract class*, *Implement interface*).
5. Verify polymorphic behavior through variables of abstract and interface types; for types with `IDisposable`, make sure resources are released even when an exception occurs.
6. Demonstrate the program to the instructor, explain the code, and answer the review questions.
