---
title: "Tasks"
description: "Topic 6. DI, configuration, logging: task variants"
outline: [2, 3]
sourceHash: "e5b26f54ac717ef614b12f12c20b912f477c2d8bea83a28fddff07d85645fe8d"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Grade notifications {#v1}

**1. Initial level.** Create a console program in which the `GradeService` service receives through its constructor the `INotifier` interface with the `EmailNotifier` and `SmsNotifier` implementations, which print messages to the console. The user enters a student's surname and grade, and the implementation is chosen by the registration in `ServiceCollection`.

**2. Basic level.** Create a console program in which the email, SMS, and Telegram grade notification channels (which print messages to the console) are registered as keyed `INotifier` services. The user enters a student's surname, a grade (1–100, validated), and a channel; for a grade below 60, the curator is also notified, and an unknown channel causes an error message.

**3. Advanced level.** Create a "Grade notifications" application with a host that reads a CSV file of grades (surname, grade; the path and default channel are given by the `--file`, `--channel`, `--help` arguments) and, with the `GradeService` service, sends notifications through keyed `INotifier` services (email, SMS, Telegram printing to the console), logs each sending with the `Student` and `Grade` fields, reports errors to the error stream with exit code 1, and has unit tests for `GradeService` with a fake `INotifier`.

### Variant 2. Exchange rates {#v2}

**1. Initial level.** Create a console program that obtains the `IRateProvider` service (USD, EUR, PLN rates defined in the class) from the container and converts an amount in hryvnias entered by the user into the selected currency.

**2. Basic level.** Create a console program with a host that converts an entered amount in hryvnias into the selected currency; the exchange rates and the cache lifetime in seconds are read from `appsettings.json` through the options pattern, and a Singleton cache service returns the stored rates and logs when the rates are refreshed. Invalid amounts and currency codes are rejected with a message.

**3. Advanced level.** Create an "Exchange office" application with a host in which two rate providers (a JSON file and a fake one with random rates) are chosen by a configuration option, a background service refreshes the cache at an interval, and the command `convert --from USD --to EUR --amount 100` prints the result; the options are validated at startup, errors are logged, and there are unit tests of the cache with `FakeTimeProvider`.

### Variant 3. Warehouse temperature control {#v3}

**1. Initial level.** Create a console program in which the `ITemperatureSensor` service (a fake sensor with random values) and the `Thermostat` service are registered in the container; the program performs ten measurements and prints the values marked "normal" or "exceeded" for a threshold of 8 °C.

**2. Basic level.** Create a console host for warehouse temperature control with a `BackgroundService` that reads the temperature of a fake sensor (random values) every N seconds; the minimum and maximum thresholds and the interval are set in `IOptions<T>` with `[Range]` validation, and going out of range is logged at the `Warning` level.

**3. Advanced level.** Create a "Warehouse" application with a host that controls the temperature of several chambers (name and thresholds in a configuration array), periodically measures each one with a fake sensor, logs alarms with the `[LoggerMessage]` generator, writes a CSV report of the number of alarms on stopping with **Ctrl+C**, and has unit tests for the threshold logic.

### Variant 4. Discount calculation {#v4}

**1. Initial level.** Create a console program in which the `IDiscountStrategy` discount strategies (no discount, 5%, 10%) are registered in the container, and the user enters the purchase amount and sees the price with each discount.

**2. Basic level.** Create a console program with a host that receives all discount strategies as `IEnumerable<IDiscountStrategy>` (seasonal, loyal customer, for amounts over 5,000 UAH), reads their percentages from `appsettings.json`, and applies the largest discount to the entered amount.

**3. Advanced level.** Create a "Discounts" application with a host that reads a cart (name, price, quantity) from a JSON file (the `--cart` argument), applies `IDiscountStrategy` discount strategies (seasonal, loyal customer, by amount) that are enabled and disabled through configuration, validates the percentages (0–50) at startup, prints a table of items with a total, and has unit tests for each strategy.

### Variant 5. Meeting room booking {#v5}

**1. Initial level.** Create a console program in which the `BookingService` booking service receives the `IBookingRepository` repository (Singleton, in memory) through its constructor and lets you book a room for an entered date and hour, rejecting an occupied time.

**2. Basic level.** Create a console program for booking meeting rooms (room, date, hour) in which each booking operation runs in a separate `CreateScope` scope with a Scoped `BookingContext` service that accumulates changes and saves them at the end. Booking conflicts are logged at the `Warning` level, and the program prints instance identifiers to show the lifetime.

**3. Advanced level.** Create a "Meeting rooms" application with a host in which the list of rooms and working hours are set in the configuration, bookings are stored in a JSON file, the `book`, `cancel`, `list` commands are passed as arguments, conflicts and errors are logged, `ValidateScopes` is enabled, and there are unit tests for conflict checking.

### Variant 6. Report generator {#v6}

**1. Initial level.** Create a console program in which the `IReportFormatter` report formatters (CSV and a text table) are registered in the container; the program prints a list of students with the average score using each formatter.

**2. Basic level.** Create a console program that generates a report with a list of students and their average scores: it receives all report formatters as `IEnumerable<IReportFormatter>` (CSV, JSON, HTML), chooses the right one by the extension of the file entered by the user, and saves the report; for an unknown extension, a list of supported formats is printed.

**3. Advanced level.** Create a "Reports" application with a host that reads a list of students with average scores from CSV, generates reports in CSV, JSON, and HTML formats (the formatters are keyed services; the `--in`, `--format`, `--out`, `--help` arguments), logs the generation time, returns a nonzero exit code on error, and has unit tests for the formatters.

### Variant 7. Medication reminders {#v7}

**1. Initial level.** Create a console program in which the `ReminderService` service receives `TimeProvider` through its constructor and, from a list of dosing hours defined in the program, prints how many minutes remain until the next dose.

**2. Basic level.** Create a console program with a host that reads a medication schedule (name, hours) from `appsettings.json` through the options pattern, validates the hours (0–23), and every minute logs a reminder if it is time for a dose.

**3. Advanced level.** Create a "Medications" application with a host that reads a medication schedule (name, hours) from the configuration, prints reminders in a background service with `PeriodicTimer`, picks up schedule changes without restarting through `IOptionsMonitor<T>`, logs missed doses at the `Warning` level, and has unit tests with `FakeTimeProvider` that check how the next dose is determined.

### Variant 8. Disk space monitoring {#v8}

**1. Initial level.** Create a console program in which the `IDiskInfo` service (an implementation based on `DriveInfo`) is injected into `DiskReporter`, which prints the free space in gigabytes and percent for each ready drive.

**2. Basic level.** Create a console host with a `BackgroundService` that checks the free space on drives (`DriveInfo`) every N seconds and logs the state at the `Information` level, at `Warning` if the free space is below a threshold, and at `Critical` if it is below a critical threshold; the thresholds and interval are read from the configuration with validation.

**3. Advanced level.** Create a "Drives" application with a host that periodically checks the free space on drives through the `IDiskInfo` service (an implementation based on `DriveInfo`); the list of drives and the thresholds are set in the configuration, the log format (simple or json) is chosen in `appsettings.json`, a table of the minimum free space during the session is printed on stopping, and unit tests with a fake `IDiskInfo` check the alarm levels.

### Variant 9. Payroll {#v9}

**1. Initial level.** Create a console program that reads the hourly rate and the tax percentage from `appsettings.json` using `IConfiguration` and, for an entered number of hours, prints the gross pay, the tax, and the net pay.

**2. Basic level.** Create a console program with a host that prints the gross pay, the tax, and the net pay for an entered position and number of hours; the rates for positions (engineer, technician, operator) and the tax are bound to an options class, and `ValidateDataAnnotations` and `ValidateOnStart` validation prevent the program from starting with a rate outside 50–2,000 UAH or a tax over 50%.

**3. Advanced level.** Create a "Payroll" application with a host that reads a timesheet from CSV (employee, position, hours; the `--file` argument), calculates pay at the position rates from the configuration with overtime hours (a coefficient from the configuration), prints a table with totals, logs lines with errors, and has unit tests for the calculation service.

### Variant 10. School bell {#v10}

**1. Initial level.** Create a console program that reads the bell schedule (start and end of lessons) from `appsettings.json` into an options class and, for an entered time, prints the number of the current lesson or "break".

**2. Basic level.** Create a console host with a background service that reads the bell schedule (start and end of lessons) from `appsettings.json`, checks the time every second, and logs "Bell for lesson N" or "Bell after lesson N"; the schedule is validated at startup (lessons do not overlap, the end is later than the start).

**3. Advanced level.** Create a "Bell" application with a host whose background service logs the bells for and after lessons according to a weekday and Saturday schedule from a JSON file; file changes are picked up through `IOptionsMonitor<T>` and logged, and unit tests with `FakeTimeProvider` check how the lesson is determined at boundary moments.

### Variant 11. Parking records {#v11}

**1. Initial level.** Create a console program that reads the hourly parking price from `appsettings.json` and, for entered entry and exit times, prints the cost, rounding a partial hour up.

**2. Basic level.** Create a console program with a host that prints the parking cost for entered entry and exit times (a partial hour is rounded up) with time format validation; the rate is set in `appsettings.json`, and for the `Development` environment the `appsettings.Development.json` file sets a zero cost; the program prints the environment name.

**3. Advanced level.** Create a "Parking" application with a host with day and night rates, free first minutes, and a daily maximum from the configuration, the `enter`, `exit`, `report` commands passed as arguments, sessions saved in JSON, an operations log, and unit tests of the calculation with `FakeTimeProvider`.

### Variant 12. Password validation {#v12}

**1. Initial level.** Create a console program in which the `PasswordValidator` service receives the minimum length from `IOptions<PasswordOptions>` through its constructor and validates an entered password.

**2. Basic level.** Create a console program with a host that validates entered passwords against a policy (length, digits, uppercase letters, special characters) from the configuration, logs the result of each check without the password itself, and prints the violated rules as a list.

**3. Advanced level.** Create a "Password policy" application with a host that validates passwords from a file (lines `login;password`, the `--file` argument) against a policy from the configuration, uses different policies for the Development and Production environments, locks a user after N failed attempts, logs events with the `[LoggerMessage]` generator, and has unit tests for the rules.

### Variant 13. Order import {#v13}

**1. Initial level.** Create a console program in which the `OrderImporter` service receives `ILogger<T>` and reads orders from a CSV file, logging the number of lines read and the lines with errors.

**2. Basic level.** Create a console host whose background service checks an inbox folder (path in the configuration), imports new CSV files with orders (number, product, quantity, price), moves them to a processed folder, and writes the log in JSON format (`AddJsonConsole`).

**3. Advanced level.** Create an "Import" application with a host that imports CSV files with orders (number, product, quantity, price) from an inbox folder with retries (the count and delay in validated options), moves failed files to an errors folder, uses `BeginScope` with the file name, shuts down gracefully on **Ctrl+C**, and has unit tests for line parsing.

### Variant 14. Weather forecast {#v14}

**1. Initial level.** Create a console program in which the `IWeatherProvider` service (a fake one with a three-day forecast) is injected into `ForecastPrinter`, which prints the forecast for an entered city.

**2. Basic level.** Create a console program with a host that prints a three-day weather forecast for an entered city; fake and file-based (JSON) weather providers are registered as keyed services, and the right one is chosen by the `Weather:Provider` option in the configuration; for an unknown value, the program reports an error.

**3. Advanced level.** Create a "Forecast" application with a host that, through the fake `IWeatherProvider` weather provider, prints an N-day forecast table (the `--city`, `--days`, `--help` arguments), caches the forecast for a time from the configuration, logs calls to the provider, and has unit tests of the cache with a fake provider and `FakeTimeProvider`.

### Variant 15. Product price caching {#v15}

**1. Initial level.** Create a console program in which the `IPriceService` service returns a product price by code (data in a dictionary), and a registered Singleton service counts the number of calls and prints it after a series of requests.

**2. Basic level.** Create a console program in which the `IPriceService` service returns a product price by an entered code (data in a dictionary), and the `CachedPriceService` decorator wraps it, stores prices for a time from `IOptions<T>`, and logs cache hits and misses; the registration is done with a factory in the container.

**3. Advanced level.** Create a "Prices" application with a host in which a slow provider returns a product price by code with a simulated delay, the cache decorator has size and lifetime limits from the configuration, cache statistics are printed at the end of a series of requests, and unit tests with `FakeTimeProvider` check the expiration of entries.

### Variant 16. Print queue {#v16}

**1. Initial level.** Create a console program in which the Singleton `PrintQueue` service stores print jobs (document name, number of pages), and `PrintService` adds jobs entered by the user and prints the queue.

**2. Basic level.** Create a console host in which a Singleton queue stores print jobs (document name, number of pages), and a `BackgroundService` processes the jobs with a per-page delay from the configuration, logs the start and end of printing, and on **Ctrl+C** waits for the current job to finish.

**3. Advanced level.** Create a "Printer" application with a host that processes a queue of print jobs (document, pages, priority) with several printers (names and speeds in the configuration), job priorities, reading jobs from a file, graceful shutdown writing unprocessed jobs to JSON, and unit tests of the priority queue.

### Variant 17. Movie tickets {#v17}

**1. Initial level.** Create a console program in which the `SeatService` service (a 5 × 10 hall layout in memory) receives `ILogger<T>` through its constructor and books a seat entered by the user, logging the result.

**2. Basic level.** Create a console program for selling movie tickets in which the seat booking and payment services have the Scoped lifetime and share a Scoped `Order` object (showtime, seats, amount) within one purchase scope; the program makes two purchases in different scopes and shows that the orders do not mix.

**3. Advanced level.** Create a "Cinema" application with a host with showtimes and prices in the configuration, purchasing several seats in one scope, a fake payment service that rejects some payments, canceling the booking on rejection, an event log, and unit tests for the purchase service.

### Variant 18. Visit counter {#v18}

**1. Initial level.** Create a console program in which the Singleton `VisitCounter` service and the Transient `PageHandler` service are registered in the container; the program processes entered page names and prints the total number of visits.

**2. Basic level.** Create a console host whose background service simulates page visits, and Singleton statistics count the visits to each page; when the host stops (`IHostApplicationLifetime.ApplicationStopping`), a report is written to the log.

**3. Advanced level.** Create a "Statistics" application with a host that reads a page visit log from a file (lines: time, page), builds a report by pages and hours, saves it to JSON on stopping, lets you set the period with the `--from`, `--to` arguments, and has unit tests for the aggregation.

### Variant 19. Unit converter {#v19}

**1. Initial level.** Create a console program in which length, mass, and temperature converters implement `IUnitConverter` and are registered in the container; the user enters a value and the kind of conversion.

**2. Basic level.** Create a console program that finds all unit converter classes (length, mass, temperature) implementing `IUnitConverter` by scanning the assembly (`Assembly.GetTypes`), registers them in the container, and prints a menu of available conversions with validation of the entered values.

**3. Advanced level.** Create a "Converter" application with a host for length, mass, and temperature units that supports the `--from`, `--to`, `--value`, `--list`, `--help` arguments, enables individual converters with configuration options, reports unknown units to the error stream with an exit code, and has unit tests for all converters.

### Variant 20. Access control {#v20}

**1. Initial level.** Create a console program that reads a list of roles and allowed actions from `appsettings.json` through `IConfiguration` and, for an entered role and action, prints "allowed" or "denied".

**2. Basic level.** Create a console program with a host in which the `AccessService` service receives roles with allowed actions through the options pattern and, for an entered user, role, and action, prints "allowed" or "denied", logging each access attempt (successful ones at `Information`, denials at `Warning`) with the `User` and `Action` fields.

**3. Advanced level.** Create an "Access" application with a host in which roles inherit the permissions of other roles, users and passwords of test accounts are stored in user secrets, an account is locked for a time from the configuration after three failed logins, and unit tests check permission inheritance.

### Variant 21. Automatic plant watering {#v21}

**1. Initial level.** Create a console program in which the fake `IMoistureSensor` moisture sensor is injected into `WateringController`, which decides for an entered moisture value whether to turn on watering (threshold 30%).

**2. Basic level.** Create a console host with a background service that, on a schedule from the configuration, checks the moisture of several plants with fake sensors and turns on watering for a given duration, logging each decision.

**3. Advanced level.** Create an "Auto watering" application with a host whose controller decides from the readings of fake moisture sensors of several plants whether to turn on watering; the schedule, thresholds, and maximum daily water volume are set in validated options, watering is not performed at night, and unit tests with `FakeTimeProvider` and fake sensors check the controller's decisions.

### Variant 22. Document backups {#v22}

**1. Initial level.** Create a console program that reads the path to the documents folder and the backup folder from `appsettings.json` and copies all `.docx` files to the backup folder, printing the number of files copied.

**2. Basic level.** Create a console host that copies documents from the documents folder to the backup folder; the paths and file mask are set in options with a check at startup that the folder exists, only changed files are copied, and the result for each file is logged.

**3. Advanced level.** Create a "Backup" application with a host that archives documents from a folder set in the configuration into a ZIP file, uploads the archive to a fake cloud storage with an access key in user secrets, keeps a given number of copies, logs the results, and has unit tests for selecting changed files.

### Variant 23. Work time tracking {#v23}

**1. Initial level.** Create a Windows Forms application in which the main form is obtained from the host's container, and the `ITimeTracker` service is injected through the form's constructor; the *Start* and *Stop* buttons record a work interval and show its duration.

**2. Basic level.** Create a Windows Forms application with a host for tracking work time, in which the *Start* and *Stop* buttons record intervals of work on a project; project names and the daily hour quota are read from `appsettings.json` through `IOptions<T>`, the intervals are shown in a `DataGridView`, and exceeding the quota is logged and shown in the status bar.

**3. Advanced level.** Create a "Work time" Windows Forms application with a host for tracking work intervals (project, start, end), in which modal forms for adding a record and for a report are created by the container, records are saved to a JSON file, a weekly report is exported to CSV, actions are logged, and the calculation service has unit tests with `FakeTimeProvider`.

### Variant 24. Request rate limiting {#v24}

**1. Initial level.** Create a console program in which the Singleton `RateLimiter` service allows no more than N requests per minute (N in the configuration); the user presses **Enter**, and the program prints "allowed" or "rejected".

**2. Basic level.** Create a console program with a host in which the `RateLimiter` service limits the number of a client's requests in a sliding time window: it receives `TimeProvider` and validated window options, counts requests separately for each entered client identifier, prints "allowed" or "rejected", and logs rejections.

**3. Advanced level.** Create a "Limits" application with a host that limits the rate of client requests in a sliding time window with different limits for client groups in the configuration, a simulated stream of requests from a background service, a report on rejected requests on stopping, and unit tests with `FakeTimeProvider` for the window boundaries.

### Variant 25. Newsletter {#v25}

**1. Initial level.** Create a console program in which the `Newsletter` service receives `IMailSender` through its constructor and sends the entered text to a list of addresses; the program uses a fake sender that prints the emails to the console.

**2. Basic level.** Create a console program with a host that sends the entered news text to a list of addresses through a fake sender (which prints the emails to the console); the email template and sender address are read from the configuration, and sending each email is logged in a `BeginScope` scope with the mailing identifier; invalid addresses are skipped with a warning.

**3. Advanced level.** Create a "Mailing" application with a host that reads subscribers from CSV, substitutes the name into a template, stores the SMTP password in user secrets, limits the number of emails per minute, logs the results, and has unit tests with a fake sender.

### Variant 26. Parcel tracker {#v26}

**1. Initial level.** Create a console program in which the fake `ICarrier` carrier service returns a parcel's status by number, and `TrackingService` prints the status for an entered number.

**2. Basic level.** Create a console program that receives all fake carriers as `IEnumerable<ICarrier>` (they return a parcel's status history by number), determines the carrier by the format of the entered parcel number (a prefix in the configuration), and prints the status history; an unknown format causes an error message.

**3. Advanced level.** Create a "Parcel tracker" application with a host whose background service periodically polls fake `ICarrier` carriers for a list of parcels from JSON, logs status changes, saves the latest statuses to a file, and has unit tests for determining the carrier by number format.

### Variant 27. Household energy consumption {#v27}

**1. Initial level.** Create a console program in which the `IMeter` service (a fake meter) is injected into `EnergyReport`, which prints the consumption in kWh between adjacent readings for ten readings.

**2. Basic level.** Create a console host with a background service that accumulates the readings of fake meters of several appliances and logs the total consumption every minute; the price per kWh is read from the configuration with validation.

**3. Advanced level.** Create an "Energy" application with a host that accumulates the readings of fake meters of several appliances and aggregates them by hour, reports exceeding the daily limit from the configuration with the `[LoggerMessage]` generator, saves a CSV report with the cost under a two-zone tariff on stopping, and has unit tests for the aggregation.

### Variant 28. Tax calculation {#v28}

**1. Initial level.** Create a console program that reads the personal income tax and military levy rates from `appsettings.json` and, for an entered income, prints the amount of taxes and the net income.

**2. Basic level.** Create a console program with a host that prints the amount of taxes and the net income for an entered year and income; the taxation rules (personal income tax and military levy rates) for several years are set in the configuration (an array of sections), and options validation at startup does not allow negative rates or repeated years.

**3. Advanced level.** Create a "Taxes" application with a host that calculates taxes for a list of incomes from CSV (the `--file`, `--year` arguments), prints a table with totals, logs lines with errors, returns exit code 2 for an unknown year, and has unit tests for the rules.

### Variant 29. Game rooms {#v29}

**1. Initial level.** Create a console program that reads the names of game rooms and the maximum number of players from `appsettings.json` into an options class and prints a list of rooms.

**2. Basic level.** Create a console program with a host in which a Singleton game room service (names and player limits in the configuration) adds entered players to rooms, respecting the limit, and each event (join, leave, rejection) is logged with the `Player` and `Room` fields.

**3. Advanced level.** Create a "Game rooms" application with a host (names and player limits in the configuration) with the `join`, `leave`, `list` commands passed as arguments, a background service that removes inactive players after a timeout from the configuration, saving the state to JSON on stopping, and unit tests with `FakeTimeProvider`.

### Variant 30. Interface localization {#v30}

**1. Initial level.** Create a console program that reads a culture code (`uk-UA` or `en-US`) from `appsettings.json` and prints a greeting, a date, and a number in that culture's format.

**2. Basic level.** Create a console program with a host that prints a greeting and program messages in the selected language: the `ITextProvider` service returns texts by keys from language JSON files, the language is chosen by a configuration option or a command-line argument, and a missing key is logged at the `Warning` level.

**3. Advanced level.** Create a "Localization" Windows Forms application with a host in which the interface language is taken from `IOptionsMonitor<T>` and changes without restarting after `appsettings.json` changes, the form texts are updated, and unit tests check text lookup with a fallback language.

## Procedure

1. Study the theory and worked examples.
2. Design the service interfaces for your variant, determine the lifetime of each service and the configuration sections; record them in the report.
3. Create a project (*Console App*, *Worker Service*, or *Windows Forms App* with a host), register the services in `Program.cs`, and obtain dependencies only through constructors.
4. Move the settings into `appsettings.json` and options classes validated at startup; store secrets in user secrets, not in project files.
5. Add logging with message templates and test the application in the *Development* and *Production* environments, with environment variables and command-line arguments.
6. For levels 2 and 3, write unit tests with fake dependencies.
7. Demonstrate the application to your instructor, explain the code, and answer the review questions.
