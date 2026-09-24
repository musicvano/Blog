---
title: "Tasks"
description: "Topic 14. Delegates, lambdas, events: task variants"
outline: [2, 3]
sourceHash: "4be8ec58867e4d7e3666df61b5634bb907de57bacfc9304a020309356dc3e081"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Stock ticker {#v1}

**1. Initial level.** Create a `StockTicker` class (stock symbol, current price) with a `PriceChanged` event of type `EventHandler<PriceChangedEventArgs>` (old and new price). The console program changes the price several times, and a subscribed handler prints the price change as a percentage.

**2. Basic level.** Create a stock ticker with a `PriceChanged` event (old and new price), price generation with a fixed seed, and strategy subscribers “buy on a 5% drop” and “sell on a 10% rise” that unsubscribe after a trade. The console program simulates a trading day and prints a trade log.

**3. Advanced level.** Create a stock exchange library: stock tickers with a price change event, a portfolio that subscribes to all stocks, and strategies as `Func<PriceHistory, TradeSignal>` (buy, sell, wait). A dotnet CLI application processes lines of the form “symbol price” from standard input and prints the profit of each strategy; errors go to `Console.Error`.

### Variant 2. Kitchen timer {#v2}

**1. Initial level.** Create a `KitchenTimer` class with a duration in seconds and the events `Tick` (remaining time) and `Finished`. The console program simulates a 5-second countdown with a loop of steps without real waiting, and the subscribers print the remaining time and a completion message.

**2. Basic level.** Create a kitchen timer class with a name, a duration, a pause, and the events `Tick`, `Paused`, and `Finished`, several independent timers, and a subscriber that, after each step, prints the timer that will finish soonest. The console program simulates cooking a lunch with a loop of steps without real waiting.

**3. Advanced level.** Create a library of kitchen timers with real time (`PeriodicTimer` or `System.Timers.Timer`), the events `Tick` and `Finished`, unsubscribing finished timers, and notifications through an `Action<string>`. A dotnet CLI application starts timers from arguments (`name=seconds`) and prints the events; errors go to `Console.Error`.

### Variant 3. Unit converter {#v3}

**1. Initial level.** Create a `Dictionary<string, Func<double, double>>` of unit conversions (km → miles, °C → °F, and so on), where the key is the name of the conversion and the value is a lambda. The console program converts several given values and prints the results.

**2. Basic level.** Create a unit converter based on a dictionary of `Func<double, double>` delegates with forward and inverse conversions, chains (m → km → miles) through delegate composition, and adding new units with lambdas. The console program executes commands such as `convert 5 km mi` and prints the result.

**3. Advanced level.** Create a unit library with a conversion graph whose edges are `Func<double, double>` delegates and a breadth-first search for a chain of conversions. A dotnet CLI application reads a value, a source unit, and a target unit from standard input and converts between any connected units; errors go to `Console.Error`.

### Variant 4. Apartment search {#v4}

**1. Initial level.** Create an `Apartment` record (address, price, number of rooms, area) and a list of apartments. The console program selects apartments with the `FindAll` method using a `Predicate<Apartment>` condition (price not higher than a given one, the required number of rooms) and prints them.

**2. Basic level.** Create an `Apartment` record (address, price, rooms, area), the higher-order functions `And`, `Or`, and `Not` over `Predicate<Apartment>` conditions, and a menu in which the user adds conditions. The console program prints the apartments that satisfy all the selected conditions, sorted with a lambda.

**3. Advanced level.** Create an apartment search library (`Apartment`: address, price, rooms, area) with named saved filters `Dictionary<string, Predicate<Apartment>>` and a `NewMatch` event that fires when a new listing satisfies a filter. A dotnet CLI application reads listings from standard input and prints the matches with the filter name; errors go to `Console.Error`.

### Variant 5. Sorting by keys {#v5}

**1. Initial level.** Create a `Student` class (surname, average grade) and a list of students. The console program sorts it with the `Sort` method and a `Comparison<Student>` lambda by surname and, for equal surnames, by average grade in descending order, and prints the result.

**2. Basic level.** Create the higher-order functions `By<T, TKey>(Func<T, TKey> key)` and `ThenBy` that build a `Comparison<T>` for sorting by several keys. The console program sorts a list of students (surname, first name, group, grade) by the fields chosen by the user and prints the result.

**3. Advanced level.** Create a library of `Comparison<T>` comparers with a sort direction, `null` handling, and a registry of key delegates by field name. A dotnet CLI application sorts a CSV from standard input (the first line contains the field names) according to the `--sort name,score:desc` option; errors go to `Console.Error`.

### Variant 6. Water level in a tank {#v6}

**1. Initial level.** Create a `WaterTank` class (capacity, current level) with filling and draining methods and a `LevelChanged` event. The console program simulates several steps of filling and draining water, and a subscriber prints the new level.

**2. Basic level.** Create a tank class (capacity, level) with the events `LevelChanged`, `Overflow`, and `LowLevel` with custom `EventArgs`, and the subscribers “pump” (turns on at a low level) and “valve” (closes on overflow). The console program simulates a day of operation hour by hour and prints a log.

**3. Advanced level.** Create a water supply library with several tanks that raise level change events, pump subscribers with protection against frequent switching, and an event log. A dotnet CLI application simulates the system using a scenario from standard input (inflow and outflow by step) and prints the log; errors go to `Console.Error`.

### Variant 7. Auction {#v7}

**1. Initial level.** Create an `Auction` class (lot, current bid, leader) with a `BidPlaced` event that passes the bidder and the amount. The console program accepts several bids, and a subscriber prints each new bid.

**2. Basic level.** Create an auction class with the events `BidPlaced` and `AuctionClosed` (winner and price), a check of the minimum bid increment, and bidder subscribers that automatically outbid up to their limit. The console program runs the auction and prints its progress.

**3. Advanced level.** Create an auction library with several lots, bid and closing events, automatic closing of a lot after a given number of steps without bids, and unsubscribing bidders who have dropped out. A dotnet CLI application processes bids of the form “lot bidder amount” from standard input and prints the auction record; errors go to `Console.Error`.

### Variant 8. Statistical aggregators {#v8}

**1. Initial level.** Create a `Dictionary<string, Func<double[], double>>` of aggregators “sum,” “average,” and “maximum” defined by lambdas. The console program applies each aggregator to an array of numbers and prints the name and the result.

**2. Basic level.** Create a dictionary of `Func<double[], double>` aggregators (sum, average, median, mode, range) and a higher-order function `Normalize(Func<double[], double> center)` that returns a function that centers the data. The console program calculates the aggregators chosen by the user for the entered numbers.

**3. Advanced level.** Create a library for aggregating records with grouping by a `Func<T, string>` key and a `Func<double[], double>` aggregator (sum, average, median, and so on). A dotnet CLI application processes a CSV from standard input according to the options `--group` (the grouping field) and `--agg` (the aggregator and field) and prints a table of groups; errors go to `Console.Error`.

### Variant 9. Console command handler {#v9}

**1. Initial level.** Create a `Dictionary<string, Action>` of the commands `help`, `date`, and `clear` defined by lambdas. The console program reads a command name in a loop and executes it or reports an unknown command; `exit` ends the program.

**2. Basic level.** Create a command handler based on a `Dictionary<string, Action<string[]>>`, where a command receives the arguments of the line (`add 2 3`, `echo text`), with a command history and a repeat of the last command. The console program reads and executes commands with parameters.

**3. Advanced level.** Create a command interpreter library with registration of commands by lambdas, help, undo (a command returns a `Func` for the reverse action), and a `CommandExecuted` event. A dotnet CLI application runs a script of commands from standard input and prints the results; errors go to `Console.Error`.

### Variant 10. Parking meter {#v10}

**1. Initial level.** Create a `ParkingMeter` class (hourly rate, paid time) with a `PaymentAccepted` event that passes the amount and the purchased time. The console program accepts several payments, and a subscriber prints a receipt.

**2. Basic level.** Create a parking meter class with payment for time and the events `PaymentAccepted`, `TimeExpiring` (10 minutes before the end), and `TimeExpired`, and the subscribers “SMS to the driver” and “inspector.” The console program simulates a day of operation in one-minute steps and prints the messages.

**3. Advanced level.** Create a parking library with several parking meters, payment expiration events, rates as `Func<TimeSpan, decimal>`, and payment extensions. A dotnet CLI application processes events (payment, extension, inspector check) from standard input and prints fines; errors go to `Console.Error`.

### Variant 11. Game clock {#v11}

**1. Initial level.** Create a `GameClock` class with a `Tick` event that passes the step number. The console program simulates 10 game steps, and a subscriber prints the step number and the game time.

**2. Basic level.** Create a game clock with a `Tick` event, time acceleration, and pause, and game objects (name, position, speed) that subscribe to `Tick`, move, and unsubscribe after being destroyed. The console program simulates the movement of objects and prints their positions.

**3. Advanced level.** Create a game loop library with a `Tick` event, handler priorities, the events `Collision` and `GameOver`, and a check for leaked subscriptions of destroyed objects. A dotnet CLI application simulates a game with a fixed seed and prints the events and the number of active subscribers; errors go to `Console.Error`.

### Variant 12. Text processing pipeline {#v12}

**1. Initial level.** Create an array of `Func<string, string>` transformations (trimming spaces, lowercase, replacing characters). The console program applies them one after another to an entered string and prints the result after each step.

**2. Basic level.** Create string transformations `Func<string, string>` (trimming spaces, lowercase, replacing characters), a higher-order function `Pipeline(params Func<string, string>[] steps)` that returns a single composed function, and a menu for configuring the steps. The console program processes the entered text.

**3. Advanced level.** Create a text processing pipeline library with `Func<string, string>` steps, conditional steps (`Predicate<string>`), a `StepCompleted` event, and measurement of step timing. A dotnet CLI application processes lines from standard input with the steps given in the arguments and prints the result; errors go to `Console.Error`.

### Variant 13. Form validator {#v13}

**1. Initial level.** Create a registration form (login, email, password) and, for each field, a list of `Func<string, bool>` rules with descriptions. The console program checks the entered values and prints which rules are violated.

**2. Basic level.** Create a rule class with a message and a `Func<string, bool>` delegate, the higher-order functions `MinLength(n)`, `Matches(pattern)`, and `Required()` that create rules, and collection of all errors. The console program validates a registration form (login, email, password) and prints the errors.

**3. Advanced level.** Create a validation library with delegate rules for individual fields and across fields (password confirmation), a `ValidationFailed` event, and a generic validator `Validator<T>`. A dotnet CLI application validates questionnaires from standard input and prints the validation result for each; errors go to `Console.Error`.

### Variant 14. Warehouse stock {#v14}

**1. Initial level.** Create a `StockItem` class (name, quantity on hand, minimum stock) with a sale method and a `LowStock` event that fires when the quantity falls below the minimum. The console program sells the product in several batches, and a subscriber prints a warning.

**2. Basic level.** Create a warehouse product class (name, quantity, minimum) with the events `LowStock` and `Restocked` and a “purchasing department” subscriber that places an order and replenishes stock when there is a shortage. The console program simulates a week of sales and prints a log.

**3. Advanced level.** Create a warehouse library with several products with a `LowStock` event, suppliers with a delivery delay, and reorder rules as `Func<StockItem, int>` (how much to order). A dotnet CLI application simulates the movement of goods (sales, receipts) from standard input and prints the stock levels; errors go to `Console.Error`.

### Variant 15. File downloads {#v15}

**1. Initial level.** Create a `Downloader` class (file name, size) with the events `ProgressChanged` (percentage) and `Completed`. The console program simulates downloading in chunks without a real network, and the subscribers print the progress and a completion message.

**2. Basic level.** Create a file download class that simulates downloading in chunks, with the events `ProgressChanged`, `Completed`, and `Cancelled`, the ability to cancel, and a console progress bar subscriber. The console program simulates downloading three files.

**3. Advanced level.** Create a download queue library with progress and completion events, a limit on simultaneous downloads, retries (`Func<bool>` is an attempt to download a chunk), and overall progress. A dotnet CLI application simulates downloading a list of files from standard input with a fixed seed; errors go to `Console.Error`.

### Variant 16. Smart lamp {#v16}

**1. Initial level.** Create a `MotionSensor` class with a `MotionDetected` event and a `Lamp` class that subscribes to it and turns on when motion is detected. The console program simulates several sensor triggers and prints the state of the lamp.

**2. Basic level.** Create motion and light sensors with the events `MotionDetected` and `DarknessChanged` and a lamp subscriber that turns on when there is motion in the dark, turns off after 5 minutes without motion, and unsubscribes from the sensors in manual mode. The console program simulates an evening in one-minute steps.

**3. Advanced level.** Create a smart lighting library with rooms, sensors with events, scenes as `Action<Room>`, and `Predicate<SensorState>` rules that determine when to run a scene. A dotnet CLI application processes sensor events from standard input and prints the state of the lamps; errors go to `Console.Error`.

### Variant 17. Pedometer {#v17}

**1. Initial level.** Create a `Pedometer` class (number of steps, daily goal) with a `GoalReached` event. The console program simulates a day of steps in portions, and a subscriber prints a message when the goal is reached.

**2. Basic level.** Create a pedometer class with a daily goal and the events `GoalReached`, `NewRecord`, and intermediate goals (25%, 50%, 75%), and the subscribers “notifications” and “statistics.” The console program simulates a week of steps and prints the messages and totals.

**3. Advanced level.** Create a fitness goals library with daily statistics `DayStats` (steps, distance, active minutes), configurable achievement conditions `Func<DayStats, bool>`, and streaks of consecutive days. A dotnet CLI application processes daily data from standard input and prints the achievements; errors go to `Console.Error`.

### Variant 18. Football match {#v18}

**1. Initial level.** Create a `Match` class (teams, score) with a `GoalScored` event that passes the team, the scorer, and the minute, and a scoreboard subscriber. The console program simulates several goals, and the scoreboard prints the score.

**2. Basic level.** Create a football match class with the events `GoalScored`, `CardShown`, and `MatchEnded`, the subscribers “scoreboard,” “commentator,” and “statistics,” and sending a player off after a second yellow card. The console program replays a match from a scenario.

**3. Advanced level.** Create a library for broadcasting the matches of a round with goal, card, and end events, a bookmaker subscriber that changes odds after events, and a league table. A dotnet CLI application processes match events from standard input and prints the table; errors go to `Console.Error`.

### Variant 19. Measuring execution time {#v19}

**1. Initial level.** Create a higher-order function `Measure(Action action)` that returns the execution time (`Stopwatch`). The console program measures several actions defined by lambdas (a calculation loop, sorting an array) and prints the times.

**2. Basic level.** Create a generic function `Measure<T>(Func<T> func, out T result)`, repeated measurements with the minimum and average, and a comparison of two sorting algorithms. The console program prints a table.

**3. Advanced level.** Create a mini-benchmark library with registration of cases by lambdas, warm-up, and a `CaseCompleted` event. A dotnet CLI application runs a set of cases from arguments and prints a report; errors go to `Console.Error`.

### Variant 20. Password generator {#v20}

**1. Initial level.** Write a console program that generates a password of a given length from random characters that satisfy a `Predicate<char>` condition (letters, digits), with a fixed `Random` seed, and prints it.

**2. Basic level.** Create a password generator with a fixed seed and a list of `Predicate<string>` rules (length, digit, uppercase letter, special character); the password is generated until it satisfies all the rules. The console program prints the password and the number of attempts.

**3. Advanced level.** Create a password policy library with `Predicate<string>` rules, a strength score as a sum of `Func<string, int>` values, and a `WeakPasswordRejected` event. A dotnet CLI application generates passwords (`--generate`) or checks passwords from standard input (`--check`) and prints the scores; errors go to `Console.Error`.

### Variant 21. Sequence generator {#v21}

**1. Initial level.** Create a `Generate(int count, Func<int, long> term)` method that returns the first `count` terms of a sequence given by a formula for the nth term. The console program prints squares and powers of two defined by lambdas.

**2. Basic level.** Create functions that return closure generators `Func<long>`: arithmetic and geometric progressions and Fibonacci numbers (each call returns the next term). The console program prints the first terms of the sequences with parameters entered by the user.

**3. Advanced level.** Create a sequence library with recurrence rules `Func<long, long, long>` (the next term from the two previous ones), `Predicate<long>` filters, and a search for a known sequence by its first terms. A dotnet CLI application reads the first terms from standard input and continues the sequence; errors go to `Console.Error`.

### Variant 22. Console menu {#v22}

**1. Initial level.** Create a console menu as an array of “name – `Action`” pairs (greeting, current date, exit). The program prints numbered items in a loop, reads a number, and executes the selected item.

**2. Basic level.** Create a `Menu` class with `Action` delegate items, nested submenus, a “Back” item, conditional availability of items `Func<bool>`, and an `ItemSelected` event. The console program manages a library of books (add, find, lend).

**3. Advanced level.** Create a menu library with delegate items, hotkeys, navigation history, and building a menu from a text description. A dotnet CLI application builds a menu from a description on standard input and runs a script of item selections; errors go to `Console.Error`.

### Variant 23. Chat room {#v23}

**1. Initial level.** Create a `ChatRoom` class with a `MessagePosted` event (author, text) and a participant class that subscribes to it. The console program adds two participants and posts several messages, and each participant prints the messages received.

**2. Basic level.** Create a chat room with the events `MessagePosted`, `UserJoined`, and `UserLeft`, a banned-words filter as a chain of `Func<string, string>`, and participants that unsubscribe when leaving. The console program simulates a conversation and prints the messages received by each participant.

**3. Advanced level.** Create a chat library with rooms, message events, private messages, bot subscribers with `Predicate<Message>` rules, and a check that participants who left have unsubscribed. A dotnet CLI application processes a scenario from standard input; errors go to `Console.Error`.

### Variant 24. Online store {#v24}

**1. Initial level.** Create an `Order` class (number, customer, amount) and an `OrderService` class with an `OrderPlaced` event. The console program places an order, and a subscriber prints a confirmation.

**2. Basic level.** Create an order service with an `OrderPlaced` event, the subscribers “warehouse” (reserves the goods), “mailing,” and “bonuses,” and discount rules as a list of `Func<Order, decimal>`. The console program places several orders (customer, products) and prints the subscribers’ actions.

**3. Advanced level.** Create a store library with order lifecycle events (placed, paid, shipped, canceled), cancellation of an order when the “warehouse” subscriber reports a shortage, and an event log. A dotnet CLI application processes orders from standard input; errors go to `Console.Error`.

### Variant 25. Patient monitoring {#v25}

**1. Initial level.** Create a `VitalSignsMonitor` class with a `CriticalValue` event that fires when the pulse goes outside 50–120 bpm. The console program feeds in a sequence of pulse measurements, and a subscriber prints an alarm.

**2. Basic level.** Create a patient monitor with `VitalSigns` readings (pulse, blood pressure, oxygen saturation), thresholds as `Predicate<VitalSigns>`, an alarm event with a level in its `EventArgs`, and the subscribers “nurse” and “doctor” (critical only). The console program simulates measurements.

**3. Advanced level.** Create a ward monitoring library with several patients, alarm events by reading thresholds, escalation of unacknowledged alarms, and a log of staff responses. A dotnet CLI application processes readings and acknowledgments from standard input; errors go to `Console.Error`.

### Variant 26. Car dashboard {#v26}

**1. Initial level.** Create a `FuelSensor` class (fuel level) with a `LowFuel` event and a dashboard class that subscribes to it and prints a warning. The console program simulates fuel consumption during a trip.

**2. Basic level.** Create fuel, tire pressure, and engine temperature sensors with warning events, a shared dashboard subscriber, and warning priorities (the dashboard shows the most important one). The console program simulates a trip in one-minute steps.

**3. Advanced level.** Create an onboard system library with a `CarState` (fuel, tire pressure, engine temperature), warning rules `Func<CarState, Warning?>`, dismissal of warnings by the driver, and a log. A dotnet CLI application processes telemetry from standard input and prints warnings; errors go to `Console.Error`.

### Variant 27. Airport departure board {#v27}

**1. Initial level.** Create a `Flight` class (number, destination, status) with a `StatusChanged` event and a board class that subscribes to flights. The console program changes the statuses of several flights, and the board prints the changes.

**2. Basic level.** Create a flight class with the events `StatusChanged` and `GateChanged`, the subscribers “board” and “SMS to passengers” (only for their own flight), and unsubscribing a passenger after boarding. The console program simulates a day at the airport.

**3. Advanced level.** Create an airport information system library with many flights with change events, board filters `Predicate<Flight>`, and delays that propagate to connected flights. A dotnet CLI application processes events from standard input and prints the board; errors go to `Console.Error`.

### Variant 28. Achievement system {#v28}

**1. Initial level.** Create a `Player` class (name, points) with a `ScoreChanged` event and a “100 points” achievement that subscribes to it. The console program awards points, and the achievement prints a message when the player reaches 100 points.

**2. Basic level.** Create a player with `PlayerStats` (points, level, wins), achievements with `Predicate<PlayerStats>` conditions, an `AchievementUnlocked` event, and unsubscribing an achievement after it is unlocked. The console program simulates a game and prints the unlocked achievements.

**3. Advanced level.** Create an achievement library whose achievements subscribe to game events, with completion progress, hidden achievements, and conditions composed of predicates. A dotnet CLI application processes game events from standard input and prints the unlocked achievements; errors go to `Console.Error`.

### Variant 29. Medication reminders {#v29}

**1. Initial level.** Create a schedule of medication reminders as a list of “time – `Action`” pairs. The console program simulates a day in one-hour steps and executes the reminders whose time has come (prints the name of the medication).

**2. Basic level.** Create a `MedicationScheduler` class with a medication schedule, the events `ReminderDue` and `DoseMissed`, confirmation of a dose, and repetition of an unconfirmed reminder. The console program simulates a day in 15-minute steps.

**3. Advanced level.** Create a reminder library with medication courses, reminder events, `Func<DateTime, bool>` rules (every other day, every Monday), and an adherence report. A dotnet CLI application simulates a week according to a schedule from standard input; errors go to `Console.Error`.

### Variant 30. Real-time poll {#v30}

**1. Initial level.** Create a `Poll` class (question, options, vote counters) with a `VoteCast` event. The console program accepts several votes, and after each one, a subscriber prints the current results.

**2. Basic level.** Create a poll class with options and the events `VoteCast` and `PollClosed`, a ban on voting twice, and the subscribers “chart” (text bars) and “leader changed.” The console program simulates voting.

**3. Advanced level.** Create a poll library with several questions, voting events, closing rules `Func<Poll, bool>` (number of votes, the leader’s margin), and export of the results to CSV. A dotnet CLI application processes votes from standard input; errors go to `Console.Error`.

## Procedure

1. Study the theory and worked examples.
2. For your variant, determine which behavior to pass as delegates, which events to raise, and who subscribes to them; draw a “publisher – subscribers” diagram.
3. Create a solution and project; put the publisher, subscriber, and event argument classes in separate files.
4. Implement the task of the chosen difficulty level using built-in delegates, lambda expressions, and the standard event pattern.
5. Test subscribing and unsubscribing, behavior when there are no subscribers, and the values of captured variables in the debugger.
6. Demonstrate the program to the instructor, explain the code, and answer the review questions.
