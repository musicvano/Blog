---
title: "Tasks"
description: "Topic 8. Encapsulation, static members: task variants"
outline: [2, 3]
sourceHash: "b87b14ffd161601913bbfade7fe17b924c3b33c0bcda409583d620f834dd606e"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Promo code generator {#v1}

**1. Initial level.** Create a `PromoCode` class with a private constructor, a static counter, and a static `Create(int discountPercent)` method that generates the codes `PROMO-0001`, `PROMO-0002`… and checks that the discount is 1–50%. Create several codes and print them and the total count.

**2. Basic level.** Create a `PromoCode` class with the immutable properties `Code`, `DiscountPercent`, and `ExpiresOn`, a `Redeem(DateTime date)` method (a code can be used once; an expired code is rejected), and a static generator of random 8-character codes without repeats (a static array of issued codes). The console program generates codes and checks their redemption.

**3. Advanced level.** Create a solution with a `Promo.Core` class library (public `PromoCode` and `PromoService`, an internal code generation class) and a dotnet CLI console application that executes the commands `generate N --discount --days`, `redeem code`, and `report`. The invariants (a code is used at most once, the discount is within bounds) cannot be violated from the application; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 2. Fuel accounting at a gas station {#v2}

**1. Initial level.** Create a `FuelTank` class with a private fuel level, a `Capacity` property (`init`), and the methods `Fill(double liters)` and `Dispense(double liters)`, which do not allow a negative level or exceeding the capacity. Demonstrate the operations.

**2. Basic level.** Create a `GasStation` class with an array of tanks (by fuel type), a `Sell` method with prices from a static price list (`static readonly`), and a defensive copy of the sales log returned by the `GetSales()` method. The console program simulates a shift of sales.

**3. Advanced level.** Create a solution with a `Fuel.Core` class library (public station and report classes, an `internal` operation validation class) and a dotnet CLI application that processes a log of deliveries and sales from standard input, guarantees nonnegative fuel levels, and prints a shift report; rejected operations go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 3. Application settings {#v3}

**1. Initial level.** Create a static `AppSettings` class with constants for default values (`MaxUsers`, `Language`) and static properties with a private setter that are initialized in a static constructor. Print the settings.

**2. Basic level.** Create a static `AppSettings` class with a `Set(string key, string value)` method that checks allowed keys and values (numbers within bounds, a language from a list), a `Reset()` method, and a `Describe()` method. The console program reads `key=value` lines and prints the resulting settings and the rejected lines.

**3. Advanced level.** Create a solution with a `Settings.Core` library in which a `Settings` class (not static, with a `Load(string text)` factory method and a private constructor) loads settings from INI-format text with sections, checks value types, and provides read-only access. A dotnet CLI application reads the file from standard input, applies overrides from `--set key=value` arguments, and prints the result; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 4. Attendance tracking {#v4}

**1. Initial level.** Create a `Visit` class with the immutable properties `StudentName`, `Date`, and `Present` (set in the constructor) and an array of visits for a week; print the number of students present for each day.

**2. Basic level.** Create an `AttendanceJournal` class with a private array of records, a `Mark` method (a student cannot be marked twice on the same date), a `GetVisits(string student)` method that returns a copy, and a static `Percent(int attended, int total)` method. The console program prints the attendance percentage for each student.

**3. Advanced level.** Create a solution with an `Attendance.Core` library and a dotnet CLI application that imports a journal from standard input, prohibits changes to already closed days (`CloseDay`), and prints a students × dates table and the students whose attendance is below `--min`; internal parsing classes are `internal`; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 5. Humidity sensor {#v5}

**1. Initial level.** Create a `HumiditySensor` class with a private field for the last measurement, the constants `MinValue = 0` and `MaxValue = 100`, and a `Record(double value)` method that rejects out-of-range values. Print the last valid value.

**2. Basic level.** Create a `HumiditySensor` class with a calibration offset (`private set`, changed by a `Calibrate` method with validation), a private measurement history, a static counter of created sensors, and an `Average()` method. The console program reads measurements for two sensors and prints statistics.

**3. Advanced level.** Create a solution with a `Sensors.Core` library (public `HumiditySensor`, an `internal` outlier filter) and a dotnet CLI application that processes measurements from several sensors from standard input, applies calibration from arguments, discards outliers, and prints warnings when values go beyond `--min`/`--max`; errors go to `Console.Error`.

### Variant 6. Grading scales {#v6}

**1. Initial level.** Create a static `GradeScale` class with constants for ECTS score boundaries and a static `ToEcts(int points)` method that throws `ArgumentOutOfRangeException` for scores outside 0–100. Print grades for several values.

**2. Basic level.** Create a static `GradeScale` class with the methods `ToEcts`, `ToNational`, and `ToFivePoint` and a static property that returns a copy of the scale boundary array, and use `using static` in a console program that converts scores entered on one line into a table of grades.

**3. Advanced level.** Create a solution with a `Grading.Core` library: a `GradingScheme` class with a private constructor, the factory methods `Standard()` and `Custom(string definition)` (boundaries from a string, checked for correct ordering), and a static cache of the standard scheme. A dotnet CLI application converts scores from standard input using the scheme from the `--scheme` option; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 7. School gradebook {#v7}

**1. Initial level.** Create a `GradeBook` class with a private array of grades and the methods `AddGrade(int grade)` and `GetGrades()`, which returns a defensive copy; show that changing the returned array does not change the gradebook.

**2. Basic level.** Create a `GradeBook` class with grades by subject (a private matrix), the methods `SetGrade`, `GetSubjectGrades(int subject)` (a copy), and `Average`, and a lock on changes after `Close()` is called (`InvalidOperationException`). The console program demonstrates attempts to change a closed gradebook.

**3. Advanced level.** Create a solution with a `School.Core` library (public `ClassJournal` and `Student`, `internal` checks of teacher permissions) and a dotnet CLI application that processes teacher actions from standard input (entering grades, changing them with an explanation, closing the semester) and prints the gradebook and a change log; unauthorized change attempts go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 8. E-wallet {#v8}

**1. Initial level.** Create a `Wallet` class with a private balance and a PIN set in the constructor, and a `Pay(decimal amount, string pin)` method that checks the PIN and whether there are enough funds. Demonstrate successful and failed payments.

**2. Basic level.** Create a `Wallet` class with a counter of failed PIN attempts (the wallet locks after three), a `ChangePin(string oldPin, string newPin)` method that checks the format (4 digits), a read-only `IsBlocked` property, and a private transaction history. The console program implements the wallet menu.

**3. Advanced level.** Create a solution with a `Wallet.Core` library in which only the `internal` class `SupportService` of that assembly can unlock a wallet, and the PIN is stored as a hash. A dotnet CLI application processes a scenario of operations from standard input and prints the log and lockouts; unlocking a wallet from the application is impossible; exit codes: 0, 1, 2.

### Variant 9. Vehicle registry {#v9}

**1. Initial level.** Create a `Car` class with an immutable license plate (the `AA1234AA` format is checked in the constructor), a model, and a year of manufacture, and a static `IsValidPlate(string plate)` method. Create several cars and test invalid plates.

**2. Basic level.** Create a `Car` class with a static registry of registered plates (a static array) that does not allow creating two cars with the same plate, a static `IsRegistered` method, and a `Deregister()` method. The console program registers cars from input.

**3. Advanced level.** Create a solution with a `Registry.Core` library (a public `VehicleRegistry` with a registration factory method, an `internal` class that validates plates by region codes) and a dotnet CLI application that processes registration, re-registration, and deregistration from standard input; the uniqueness invariant cannot be violated; errors go to `Console.Error`.

### Variant 10. Bike computer {#v10}

**1. Initial level.** Create a `BikeComputer` class with a private total distance (it only increases), a trip distance, and the methods `Ride(double km)` and `ResetTrip()`. Demonstrate several rides.

**2. Basic level.** Create a `BikeComputer` class with a wheel circumference (a default constant and validation in the constructor), an `AddRotations(int count, double seconds)` method, the properties `CurrentSpeed`, `MaxSpeed`, and `TripDistance` with `private set`, and a static method that converts m/s to km/h. The console program simulates a ride.

**3. Advanced level.** Create a solution with a `Cycling.Core` library and a dotnet CLI application that processes rotation sensor data from standard input (`time;rotations`), detects impossible values, splits the ride into segments, and prints a report; the total distance changes only through an internal library method; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 11. Snack vending machine {#v11}

**1. Initial level.** Create a `SnackMachine` class with a private array of product quantities, a static price menu (`static readonly`), and a `Buy(int slot, decimal paid)` method that returns change or throws an exception. Demonstrate purchases.

**2. Basic level.** Create a `SnackMachine` class with the command methods `InsertCoin`, `Select`, and `Cancel`, a `Balance` property with `private set`, a password-protected `Restock` service method, and protected revenue. The console program implements customer and service mode menus.

**3. Advanced level.** Create a solution with a `Vending.Core` library (service operations are `internal` and available only to the library’s `ServiceTerminal` class) and a dotnet CLI application that processes a scenario of customer actions from standard input and prints a log and a financial report; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 12. Product catalog {#v12}

**1. Initial level.** Create a `CatalogItem` class with an immutable SKU, a private constructor, and a static `Create(string name, decimal price)` factory method that generates the SKUs `ART-00001`… Create several items and print them.

**2. Basic level.** Create a `Catalog` class with a private array of items, methods for searching by name (case-insensitive) and by price range, a `ChangePrice` method with validation (no more than 50% at a time), and a static `TryCreate` method with an `out` result. The console program manages the catalog through a menu.

**3. Advanced level.** Create a solution with a `Catalog.Core` library and a dotnet CLI application that imports a catalog from standard input, checks SKU uniqueness, runs searches from arguments, and changes prices according to the rules; the price history is read-only (copies); errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 13. Bonus card {#v13}

**1. Initial level.** Create a `BonusCard` class with a private points balance and an `AddPurchase(decimal amount)` method that awards 1 point for every 10 UAH. Print the balance after several purchases.

**2. Basic level.** Create a `BonusCard` class with loyalty levels (silver, gold, platinum depending on the total purchases), accrual rules hidden in a private method, a `Redeem(int points)` method, and a read-only `Level` property. The console program simulates purchases and point redemptions.

**3. Advanced level.** Create a solution with a `Loyalty.Core` library in which level rules are defined by the `internal` class `LoyaltyRules` with a `static readonly` threshold table, and cards are created by a factory method. A dotnet CLI application processes transactions from standard input and prints point movements and level changes; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 14. Event log {#v14}

**1. Initial level.** Create a static `Logger` class with the methods `Info`, `Warning`, and `Error`, which print messages with a time and level, and static counters of messages of each level. Print a summary.

**2. Basic level.** Create a static `Logger` class with a minimum output level (a validated `static` property), a private buffer of the last 100 messages, and a `GetRecent(int count)` method that returns a copy. The console program generates messages of different levels and prints the latest ones.

**3. Advanced level.** Create a solution with a `Logging.Core` library in which, instead of a static class, a `Logger` class is used with a `ForCategory(string name)` factory method and a shared static level setting. A dotnet CLI application processes a log from standard input, filters by level and category, and prints statistics; errors go to `Console.Error`.

### Variant 15. Math utilities {#v15}

**1. Initial level.** Create a static `MathUtils` class with the methods `Gcd`, `Lcm`, `IsPrime`, and `Factorial` (with argument validation) and demonstrate calling them through `using static`.

**2. Basic level.** Create a static `MathUtils` class with the methods `PrimesUpTo(int n)` (the sieve of Eratosthenes; the result is cached in a private static array and returned as a copy), `Binomial`, and `DigitSum`. The console program performs calculations from a menu and shows that a repeated call uses the cache.

**3. Advanced level.** Create a solution with a `MathKit` library (the public static classes `NumberTheory` and `Combinatorics`, `internal` cache classes) and a dotnet CLI application that performs calculations from arguments (`gcd 84 36`, `primes 1000`, `binom 30 12`) and checks arguments and overflow; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 16. Test data generator {#v16}

**1. Initial level.** Create a static `FakeData` class with static arrays of first and last names and a `FullName()` method that returns a random full name (a `Random` with a fixed seed in a static field). Print 5 names.

**2. Basic level.** Create a static `FakeData` class with the methods `Phone()` (`+380XXXXXXXXX`), `BirthDate(int minAge, int maxAge)`, and `Email(string name)` and a static `SetSeed(int seed)` method for reproducibility. The console program generates a table of N test users.

**3. Advanced level.** Create a solution with a `FakeData.Core` library (a public generator class with a private constructor and a `WithSeed` factory method, `internal` dictionaries) and a dotnet CLI application that generates a CSV file with N records containing the fields from the `--fields` option and guarantees unique e-mail addresses and phone numbers; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 17. Meeting rooms {#v17}

**1. Initial level.** Create a `MeetingRoom` class with a name, a capacity (`init`), a private array of booked hours (8:00–18:00), and a `Book(int hour)` method that does not allow double booking.

**2. Basic level.** Create a `MeetingRoom` class with interval bookings (start and end in 30-minute steps), a `TryBook` method with an `out` message, a `GetBookings()` method (a copy), and a static method that checks whether intervals overlap. The console program books rooms from input.

**3. Advanced level.** Create a solution with a `Rooms.Core` library and a dotnet CLI application that processes booking requests for several rooms from standard input, picks the smallest suitable free room, allows only the author to cancel a booking, and prints the schedule; the internal selection logic is `internal`; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 18. Dice {#v18}

**1. Initial level.** Create a `Dice` class with a number of faces (validated: 4–20), a shared static `Random` generator, and a `Roll()` method. Roll the die 20 times and print the results.

**2. Basic level.** Create a `Dice` class with a static counter of all rolls, a private array of frequencies, and a `GetFrequencies()` method (a copy). The console program rolls N times, prints the frequencies, and checks whether the die is fair with the chi-squared test (a static method).

**3. Advanced level.** Create a solution with a `Dice.Core` library (the factory method `Dice.Parse("3d6+2")`, `internal` expression parsing) and a dotnet CLI application that rolls dice according to expressions from arguments, simulates the distribution of sums for `--trials`, and prints a histogram and probabilities; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 19. User accounts {#v19}

**1. Initial level.** Create a `UserAccount` class with an immutable login, a private SHA-256 password hash (`SHA256.HashData`), and a `CheckPassword(string password)` method that works without storing the password itself. Demonstrate checking a correct and an incorrect password.

**2. Basic level.** Create a `UserAccount` class with a salt (random bytes), a `ChangePassword` method that checks the old password and the requirements for the new one, a counter of failed logins, and lockout. The console program implements registration and login for several users.

**3. Advanced level.** Create a solution with an `Auth.Core` library (a public `AuthService`, `internal` hashing and storage classes) and a dotnet CLI application with the commands `register`, `login`, and `passwd` that stores users in a text file without plaintext passwords; errors go to `Console.Error`; exit codes: 0, 1 (failed login), 2.

### Variant 20. Employee record {#v20}

**1. Initial level.** Create an `Employee` class with a private salary, a `MaskedSalary` property (`*****`), and a `GetSalary(string role)` method that returns the amount only for the `hr` role. Print the employee data for different roles.

**2. Basic level.** Create an `Employee` class with personal data (phone, address, date of birth), a `ToString(string role)` method that masks fields depending on the role, an immutable employee number from a static counter, and a log of salary access. The console program demonstrates viewing data in different roles.

**3. Advanced level.** Create a solution with an `Hr.Core` library in which the permission check (the `internal` class `AccessPolicy`) is not accessible to the application, and data is provided only through a public service. A dotnet CLI application processes requests from standard input (`role;employee number;field`) and prints the responses, with a log of denials in `Console.Error`; exit codes: 0, 1, 2.

### Variant 21. Exchange rates {#v21}

**1. Initial level.** Create a static `CurrencyRates` class with a static rate table (`static readonly` arrays of codes and rates), a static update date, and a `Convert(decimal amount, string from, string to)` method. Perform several conversions.

**2. Basic level.** Create a static `CurrencyRates` class with an `Update(string code, decimal rate)` method (checks the code and that the rate is positive), a `TryConvert` method with an `out` result, and a method that returns a copy of the rate table. The console program updates rates from input and converts amounts.

**3. Advanced level.** Create a solution with an `Fx.Core` library (a `RateTable` class with a private constructor and a `Parse` factory method, immutable after creation; `internal` validation of ISO codes) and a dotnet CLI application that loads rates from standard input and converts amounts from arguments using a cross rate; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 22. Electronic queue {#v22}

**1. Initial level.** Create a `Ticket` class with a static counter of ticket numbers, an immutable number, and an issue time. Issue 5 tickets and print them.

**2. Basic level.** Create a `Queue` class with a private array of tickets, the methods `IssueTicket(string service)` (a number prefix by service, with a separate static counter for each) and `CallNext(int window)`, and a `Waiting` property. The console program simulates the work of three service windows.

**3. Advanced level.** Create a solution with a `Queue.Core` library and a dotnet CLI application that simulates an electronic queue using events from standard input (issuing, calling, finishing service), resets counters at the start of the day (an `internal` method), and prints the average waiting time by service; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 23. Elevator {#v23}

**1. Initial level.** Create an `Elevator` class with private fields for the current floor and the door state and the methods `OpenDoors()`, `CloseDoors()`, and `MoveTo(int floor)`, which does not allow moving with open doors. Demonstrate valid and invalid commands.

**2. Basic level.** Create an `Elevator` class with a number of floors and a load capacity (set in the constructor), the methods `Enter(double weight)` and `Exit(double weight)`, an overload check before moving, and a trip log (a copy). The console program executes elevator commands.

**3. Advanced level.** Create a solution with an `Elevator.Core` library (a public controller, `internal` motor and door classes) and a dotnet CLI application that processes calls from standard input, guarantees safe states (moving only with closed doors, no overload), and prints a state log; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 24. Holiday calendar {#v24}

**1. Initial level.** Create a static `Holidays` class with a static array of public holiday dates (day and month) and an `IsHoliday(DateTime date)` method. Check several dates.

**2. Basic level.** Create a static `WorkCalendar` class with the methods `IsWorkingDay`, `WorkingDaysBetween`, and `AddWorkingDays(DateTime start, int days)` and static lists of holidays and moved days (copies through methods). The console program calculates deadlines for work.

**3. Advanced level.** Create a solution with a `Calendar.Core` library in which a calendar is created by a `FromDefinition(string text)` factory method from holidays and moved days, and the standard calendar is cached in a `static readonly` field. A dotnet CLI application calculates working days from arguments and prints a monthly calendar; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 25. Race timing {#v25}

**1. Initial level.** Create a `RaceResult` class with the immutable properties `Athlete`, `Bib`, and `Time`, set in a validating constructor, and a static `BestTime` property that is updated when a better result is created.

**2. Basic level.** Create a `RaceResult` class and a static `Records` class with records by discipline (a private array, a `TryUpdate` method with the previous record as an `out` value, a `GetAll()` method returning a copy). The console program reads results and reports new records.

**3. Advanced level.** Create a solution with a `Timing.Core` library and a dotnet CLI application that processes start and finish marks from standard input and calculates immutable results, places, and records; results can be corrected only through the library’s `internal` judge method; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 26. Safe {#v26}

**1. Initial level.** Create a `Safe` class with a private code (4 digits), a read-only `IsOpen` property, and the methods `Open(string code)` and `Close()`. Demonstrate attempts to open it.

**2. Basic level.** Create a `Safe` class with the states “closed,” “open,” and “locked” (after three failed attempts, for 5 minutes of simulated time), a method for changing the code only in the open state, and a private event log. The console program simulates a usage scenario.

**3. Advanced level.** Create a solution with a `Safe.Core` library (a public `Safe`, `internal` alarm and master code classes) and a dotnet CLI application that runs a scenario from standard input, guaranteeing that the state cannot be changed bypassing the methods, and prints the event log; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 27. Transit pass {#v27}

**1. Initial level.** Create a `TransitCard` class with a private balance of rides, a static ride cost (`const`), and the methods `TopUp(int trips)` and `Ride()`. Demonstrate rides until the balance runs out.

**2. Basic level.** Create a `TransitCard` class with card types (regular, student), a static fare table (`static readonly`), free transfers within 60 minutes, and a protected ride history. The console program simulates a day of rides.

**3. Advanced level.** Create a solution with a `Transit.Core` library (factory methods for creating cards, `internal` fare calculation) and a dotnet CLI application that processes validations from standard input and generates a report of rides and charges by card; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 28. Greenhouse {#v28}

**1. Initial level.** Create a `Greenhouse` class with private temperature and humidity, constants for the allowed bounds, and an `Update(double temp, double humidity)` method that returns a warning when values go out of bounds.

**2. Basic level.** Create a `Greenhouse` class with private parameter checks, the methods `OpenVents()` and `StartWatering()` (allowed only under certain conditions), a private measurement history, and a static method that converts °F to °C. The console program simulates a day.

**3. Advanced level.** Create a solution with a `Greenhouse.Core` library (a public controller, `internal` automation rules) and a dotnet CLI application that processes sensor readings from standard input, applies the rules, and prints a log of actions and warnings; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 29. Renovation estimate {#v29}

**1. Initial level.** Create a static `MaterialPrices` class with static material prices (`static readonly`) and an `EstimateItem` class with an immutable name and quantity and a computed cost. Print an estimate with three items.

**2. Basic level.** Create an `Estimate` class with a private array of items, the methods `Add` and `Remove`, a `Total` property, and a `GetItems()` method (a copy), as well as a static contingency markup. The console program builds a room estimate from input.

**3. Advanced level.** Create a solution with an `Estimate.Core` library (an estimate is created by a factory method from a price list and becomes immutable after approval; `internal` classes calculate materials by area) and a dotnet CLI application that builds an estimate from a description of rooms from standard input; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 30. Mobile data {#v30}

**1. Initial level.** Create a `DataPlan` class with a private amount of data used, a plan limit (`init`), and constants for unit conversion (KB, MB, GB). Add several sessions and print the remaining data.

**2. Basic level.** Create a `DataPlan` class with a private array of sessions (start, amount), an `AddSession` method that checks the limit, a static method for formatting an amount (`1.5 GB`), and a `RemainingPercent` property. The console program simulates a month of use.

**3. Advanced level.** Create a solution with a `Traffic.Core` library and a dotnet CLI application that processes a session log for several subscribers from standard input, applies plans with overage charges (`internal` calculation), and prints a report by subscriber and day; errors go to `Console.Error`; exit codes: 0, 1, 2.

## Procedure

1. Study the theory and worked examples.
2. For the classes in your variant, formulate the invariants and define the public contract: which members are public, which are private or `internal`, and which are static.
3. Create a solution; for the basic and advanced levels, move the domain classes into a separate class library project and add a reference to it from the console application.
4. Implement the classes for the chosen difficulty level: no public fields, and internal arrays only through defensive copies.
5. Verify that the invariants cannot be violated from outside (attempts must cause compilation errors or exceptions); inspect static fields in the debugger.
6. Demonstrate the program to the instructor, explain the code, and answer the review questions.
