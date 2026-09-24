---
title: "Tasks"
description: "Topic 9. Inheritance and polymorphism: task variants"
outline: [2, 3]
sourceHash: "d700e8862bf29a7a85b55f33e977430ebb38f00a96313240354d7a2cfbd0f6b8"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Vehicles {#v1}

**1. Initial level.** Create a `Vehicle` base class with the properties `Model` and `EngineVolume` and a virtual `AnnualTax()` method, and the derived classes `Car`, `Truck` (the tax depends on the load capacity), and `Motorcycle`, which override the method. Print the tax for an array of vehicles.

**2. Basic level.** Create a `Vehicle` → `Car`, `Truck`, `Motorcycle` hierarchy with constructors that call `base(…)` and validate their own data, and overridden `AnnualTax()` and `ToString()` methods. The console program reads a fleet and prints a tax table, totals by type (`is`), and the vehicle with the highest tax.

**3. Advanced level.** Create a vehicle hierarchy with an intermediate `MotorVehicle` class (engine) and a `Bicycle` without an engine, sealed leaf classes, and a custom `VehicleRegistrationException`. A dotnet CLI application loads a fleet from standard input, calculates taxes using rates from options, and prints a report grouped by type using a `switch` on types, with invalid records going to `Console.Error`; exit codes: 0, 1, 2.

### Variant 2. Sports workouts {#v2}

**1. Initial level.** Create a `Workout` base class with a duration and a virtual `Calories(double weight)` method, and the derived classes `Running`, `Swimming`, and `Yoga` with different coefficients. Print the calories for a weekly workout plan.

**2. Basic level.** Create a workout hierarchy with intensity properties (validated in constructors through `base`), overridden `Calories` and `Describe` methods, and a `TrainingPlan` class with a polymorphic array. The console program builds a weekly plan and prints calories by day and type.

**3. Advanced level.** Create a workout hierarchy with the intermediate classes `CardioWorkout` (heart rate zones) and `StrengthWorkout` (sets, reps) and override `Equals`/`GetHashCode` to detect duplicates. A dotnet CLI application processes a workout diary from standard input and prints a weekly report and duplicates; errors go to `Console.Error`.

### Variant 3. Service subscriptions {#v3}

**1. Initial level.** Create a `Subscription` base class with a monthly price and a virtual `MonthlyCharge()` method, and the derived classes `FamilySubscription` (number of members) and `StudentSubscription` (50% discount). Print the total charges for an array of subscriptions.

**2. Basic level.** Create a subscription hierarchy with a start date and a trial period in the base class (a `protected` property) and overridden `MonthlyCharge(DateTime month)` and `ToString` methods. The console program calculates the charges for a year for several subscriptions and prints a table by month.

**3. Advanced level.** Create a subscription hierarchy with plan upgrades (`Upgrade` returns a new object of another derived type with prorated recalculation), sealed plans, and a custom `SubscriptionException`. A dotnet CLI application processes a log of subscription events from standard input and prints customer bills; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 4. Game characters {#v4}

**1. Initial level.** Create a `Character` base class with a name, health, and a virtual `Attack()` method that returns damage, and the derived classes `Warrior`, `Mage`, and `Archer`. Each character attacks once; print the damage.

**2. Basic level.** Create a character hierarchy with a `TakeDamage(int damage)` method in the base class (health is nonnegative), a virtual `Defend` method (a warrior blocks part of the damage), and an `Attack(Character target)` method. The console program simulates a battle between two teams in rounds until one wins.

**3. Advanced level.** Create a character hierarchy with levels, special abilities (a virtual `UseAbility` method that checks mana or energy), and sealed classes. A dotnet CLI application simulates a tournament of characters from standard input with a fixed seed `--seed` and prints a battle log and a table of wins; errors go to `Console.Error`.

### Variant 5. Media library {#v5}

**1. Initial level.** Create a `MediaItem` base class with a title, a year, and a virtual `Describe()` method, and the derived classes `Book` (author, pages), `Movie` (duration), and `Album` (artist, tracks). Print descriptions of the media library items.

**2. Basic level.** Create a media hierarchy with overridden `ToString`, `Equals`, and `GetHashCode` (the same title and year mean the same item), a case-insensitive search by title, and a report of the number of items of each type (`is`). The console program manages the media library through a menu.

**3. Advanced level.** Create a media hierarchy with a virtual `Duration` property (for a book, an estimated reading time) and a `Library` class with methods for filtering by type and year. A dotnet CLI application imports a catalog from standard input, discards duplicates, and prints a report and the total duration by type; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 6. Delivery service {#v6}

**1. Initial level.** Create a `Delivery` base class with a weight, a distance, and a virtual `Cost()` method, and the derived classes `StandardDelivery`, `ExpressDelivery` (+50%), and `InternationalDelivery` (customs duty). Print the cost of several shipments.

**2. Basic level.** Create a delivery hierarchy with weight validation in constructors (different limits for different types), a virtual `EstimatedDays()` method, and a custom `DeliveryLimitException` with the allowed and actual values. The console program creates shipments from input and catches exceptions.

**3. Advanced level.** Create a delivery hierarchy with zone rates, sealed classes, and a `Create` method in the base class that returns the appropriate object for a type string. A dotnet CLI application processes orders from standard input, groups them by type, and generates customer invoices; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 7. Tickets {#v7}

**1. Initial level.** Create a `Ticket` base class with a base price and a virtual `Price()` method, and the derived classes `StudentTicket` (−50%) and `SeniorTicket` (−30%). Print the prices of the tickets in an array.

**2. Basic level.** Create a ticket hierarchy with document validation in the constructors of discounted tickets (student ID number, pensioner’s age), overridden `Price` and `ToString` methods, and an `IsValidFor(DateTime date)` method. The console program sells tickets and prints revenue by type.

**3. Advanced level.** Create a ticket hierarchy with multi-ride tickets (number of rides) and passes (validity period), sealed classes, and a custom `TicketValidationException`. A dotnet CLI application processes a log of sales and inspections from standard input and prints a violation report; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 8. Warehouse cargo {#v8}

**1. Initial level.** Create a `Cargo` base class with a weight and a virtual `StorageCost(int days)` method, and the derived classes `FragileCargo` (double price) and `HazardousCargo` (fixed surcharge). Print the storage cost for an array of cargo items.

**2. Basic level.** Create a cargo hierarchy with a virtual `RequiresSpecialZone` property, a `CanStackOn(Cargo other)` method (fragile cargo cannot be placed at the bottom), and an overridden `ToString`. The console program places cargo on racks and reports violations.

**3. Advanced level.** Create a cargo hierarchy with temperature requirements (`RefrigeratedCargo`) and a `Warehouse` class with zones and a placement method that uses a `switch` on cargo types. A dotnet CLI application processes arrivals and shipments from standard input and prints zone occupancy; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 9. Café drinks {#v9}

**1. Initial level.** Create a `Drink` base class with a name and a virtual `Price()` method, and the derived classes `Coffee` (size), `Tea` (variety), and `Smoothie` (number of fruits). Print an order from an array of drinks and the total.

**2. Basic level.** Create a drink hierarchy with add-ons (milk, syrup) in the base class, a virtual `Prepare()` method that returns the preparation steps, and an overridden `Equals` for identical drinks. The console program builds an order from a menu and merges identical items on the receipt.

**3. Advanced level.** Create a drink hierarchy with seasonal specials (sealed classes with a limited sales period) and a custom `OutOfStockException` for missing ingredients. A dotnet CLI application processes a day’s orders from standard input and prints a receipt and a sales report by type; errors go to `Console.Error`.

### Variant 10. Insurance policies {#v10}

**1. Initial level.** Create an `InsurancePolicy` base class with a sum insured and a virtual `Premium()` method, and the derived classes `CarPolicy`, `HomePolicy`, and `TravelPolicy` with different rates. Print the premiums for an array of policies.

**2. Basic level.** Create a policy hierarchy with risk factors (driver’s age, home area, travel country) in validating constructors, overridden `Premium()` and `ToString()` methods, and an `IsActive(DateTime date)` method. The console program issues policies and prints the total premiums.

**3. Advanced level.** Create a policy hierarchy with a `ProcessClaim(decimal loss)` method (deductible, payout limit, a custom `ClaimRejectedException` with a reason). A dotnet CLI application processes policies and insurance claims from standard input and prints a report of payouts and rejections; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 11. Documents {#v11}

**1. Initial level.** Create a `Document` base class with a number, a date, and a virtual `Print()` method, and the derived classes `Invoice` (amount), `Act` (list of work performed), and `Contract` (parties). Print the documents from an array.

**2. Basic level.** Create a document hierarchy with automatic numbering in the base class (the prefix is defined by a virtual property of the derived class), an overridden `Print()` that extends the base header, and a `Validate()` method. The console program builds a package of documents and prints their printable forms.

**3. Advanced level.** Create a document hierarchy with statuses (draft, signed, canceled) in the base class, a ban on changing signed documents (an exception), and a tax invoice as a `sealed` descendant of `Invoice`. A dotnet CLI application processes document operations from standard input and prints a register; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 12. Electrical appliances {#v12}

**1. Initial level.** Create an `Appliance` base class with a power rating and a virtual `DailyConsumption()` method, and the derived classes `Fridge` (compressor cycles), `WashingMachine` (loads per day), and `Heater` (operating hours). Print the daily consumption.

**2. Basic level.** Create an appliance hierarchy with a standby mode in the base class (a `protected` property), an overridden calculation, and a `Describe()` method, and a `House` class with a polymorphic array and a monthly cost method. The console program prints a consumption report.

**3. Advanced level.** Create an appliance hierarchy with smart appliances (scheduling operation according to a two-zone tariff, sealed classes) and an `Optimize()` method. A dotnet CLI application simulates a day for a list of appliances from standard input and compares the cost before and after optimization; errors go to `Console.Error`.

### Variant 13. Real estate {#v13}

**1. Initial level.** Create a `Property` base class with an area, a price per m², and a virtual `Value()` method, and the derived classes `Apartment` (floor), `House` (plot), and `Land`. Print the valuation of the properties.

**2. Basic level.** Create a real estate hierarchy with district coefficients in the base class, overridden `Value()` and `ToString()` methods, and `Equals` based on the cadastral number. The console program manages a catalog and filters properties by type (`is`) and price range.

**3. Advanced level.** Create a hierarchy with commercial real estate (rent, yield) and a `Compare(Property other)` method. A dotnet CLI application imports listings from standard input, discards duplicates by cadastral number, calculates valuations, and prints the best offers; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 14. Training courses {#v14}

**1. Initial level.** Create a `Course` base class with a title, a number of hours, and a virtual `Price()` method, and the derived classes `OnlineCourse`, `OfflineCourse` (classroom rental), and `BlendedCourse`. Print the course prices.

**2. Basic level.** Create a course hierarchy with a class schedule (a virtual `Schedule()` method), a limit on the number of participants for in-person courses, and an `Enroll(string student)` method that throws an exception when a course is full. The console program enrolls participants and prints the schedule.

**3. Advanced level.** Create a course hierarchy with certification (a sealed `CertifiedCourse` class), group discounts, and a custom `EnrollmentException`. A dotnet CLI application processes applications from standard input and prints group lists, course revenue, and rejections; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 15. Chess pieces {#v15}

**1. Initial level.** Create a `Piece` base class with a position on the board and a virtual `CanMoveTo(int row, int col)` method, and the derived classes `Rook`, `Bishop`, and `Knight`. Check several moves for each piece.

**2. Basic level.** Create a hierarchy of all chess pieces (without castling or en passant), a `Board` class that checks that the path is clear for rooks, bishops, and queens, and a `MoveTo` method that throws an exception for an impossible move. The console program executes moves from input in chess notation `e2 e4`.

**3. Advanced level.** Create a piece hierarchy with colors, capturing the opponent’s pieces, and checking for check after a move (a virtual `AttackedSquares` method). A dotnet CLI application replays a game from standard input, prints the board after each move, and reports impossible moves to `Console.Error`; exit codes: 0, 1, 2.

### Variant 16. Taxpayers {#v16}

**1. Initial level.** Create a `Taxpayer` base class with an income and a virtual `Tax()` method, and the derived classes `Individual` (18% + 5%), `Entrepreneur` (5% single tax), and `Company` (18% of profit). Print the taxes (the rates are defined as constants).

**2. Basic level.** Create a taxpayer hierarchy that validates identification codes in constructors (10 or 8 digits), with overridden `Tax()` and `ToString()` methods and a quarterly declaration method. The console program calculates taxes for a list of taxpayers and prints totals by type.

**3. Advanced level.** Create a taxpayer hierarchy with tax benefits (sealed derived classes), a custom `DeclarationException`, and a method that reconciles the declared and calculated tax. A dotnet CLI application processes declarations from standard input and prints a discrepancy report; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 17. Greenhouse plants {#v17}

**1. Initial level.** Create a `Plant` base class with a name and a virtual `WaterNeed()` method (ml per day), and the derived classes `Tomato`, `Cucumber`, and `Cactus`. Print the daily water requirement for the greenhouse.

**2. Basic level.** Create a plant hierarchy with the virtual methods `IsComfortable(double temperature, double humidity)` and `Grow(int days)`, a health state in the base class, and an overridden `ToString`. The console program simulates a week with entered conditions.

**3. Advanced level.** Create a plant hierarchy with growth stages (a virtual property that changes the requirements), a `Greenhouse` class, and a care plan. A dotnet CLI application simulates a season based on weather from standard input and prints the harvest and problem days; errors go to `Console.Error`.

### Variant 18. Athletes {#v18}

**1. Initial level.** Create an `Athlete` base class with a name, a result, and a virtual `MeetsStandard()` method, and the derived classes `Runner`, `Swimmer`, and `Cyclist` with qualifying standards. Print the athletes who met the standard.

**2. Basic level.** Create an athlete hierarchy with a virtual `Points()` method (points for a result; for runners and swimmers, a shorter time gives more points) and overridden `ToString` and `Equals`. The console program builds a ranking by points and prints the best athlete in each discipline.

**3. Advanced level.** Create an athlete hierarchy with age categories and tables of standards in sealed classes. A dotnet CLI application imports competition reports from standard input, assigns ranks, builds a ranking, and prints invalid results to `Console.Error`; exit codes: 0, 1, 2.

### Variant 19. Hotel rooms {#v19}

**1. Initial level.** Create a `Room` base class with a price per night and a virtual `Cost(int nights)` method, and the derived classes `StandardRoom`, `SuiteRoom` (breakfast), and `Apartment` (cleaning). Print the cost of a stay.

**2. Basic level.** Create a room hierarchy with a capacity (validated in constructors), seasonal coefficients in the base class, and overridden `Cost` and `Describe` methods. The console program selects a room by number of guests and budget and prints the options sorted by price.

**3. Advanced level.** Create a room hierarchy with additional services (a virtual `AvailableServices` method), bookings, and a custom `BookingException`. A dotnet CLI application processes bookings from standard input and prints guest bills and occupancy by room type; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 20. Musical instruments {#v20}

**1. Initial level.** Create an `Instrument` base class with a name and a virtual `Play(string note)` method, and the derived classes `Guitar`, `Flute`, and `Drum` (the drum ignores pitch). Play a short melody on an array of instruments.

**2. Basic level.** Create an instrument hierarchy with a note range in the base class (an out-of-range note throws an exception), a virtual `Family` property, and a `Tune()` method. The console program distributes a part among the instruments of an orchestra and reports notes out of range.

**3. Advanced level.** Create an instrument hierarchy with transposing instruments (sealed classes with a key offset) and an `Orchestra` class. A dotnet CLI application reads a score from standard input, writes out parts for the instruments, and prints a table, with range errors going to `Console.Error`; exit codes: 0, 1, 2.

### Variant 21. Food orders {#v21}

**1. Initial level.** Create a `Dish` base class with a price and a virtual `Price()` method, and the derived classes `Pizza` (size), `Sushi` (number of pieces), and `Burger` (double patty). Print a receipt for an array of dishes.

**2. Basic level.** Create a dish hierarchy with modifiers (extra ingredients in the base class), overridden `Price` and `ToString` methods, and a `CookingMinutes()` method. The console program builds an order and prints a receipt and the estimated ready time (the longest dish).

**3. Advanced level.** Create a dish hierarchy with combo meals (a composition of dishes in a `Combo` class derived from `Dish`) and a custom `InvalidOrderException`. A dotnet CLI application processes orders from standard input, applies discounts for combos, and prints receipts; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 22. Game power-ups {#v22}

**1. Initial level.** Create a `PowerUp` base class with a duration and a virtual `Apply(Player player)` method, and the derived classes `Shield`, `SpeedBoost`, and `Heal`. Apply the power-ups to a player and print the player’s state.

**2. Basic level.** Create a power-up hierarchy with a `Tick()` method (reduces the duration) and a virtual `Expire(Player player)` method that cancels the effect, and a `Player` class with an array of active power-ups. The console program simulates 10 game steps.

**3. Advanced level.** Create a power-up hierarchy with combined effects and incompatibility rules (a virtual `ConflictsWith` method) and sealed classes for rare power-ups. A dotnet CLI application simulates a game using a scenario from standard input and prints an effect log; errors go to `Console.Error`.

### Variant 23. IoT sensors {#v23}

**1. Initial level.** Create a `Sensor` base class with an identifier and a virtual `IsAlarm(double value)` method, and the derived classes `TemperatureSensor`, `HumiditySensor`, and `MotionSensor`. Check several measurements.

**2. Basic level.** Create a sensor hierarchy with thresholds in constructors, a virtual `Format(double value)` method (units of measurement), and an alarm log in the base class. The console program processes readings from input and prints alarms by sensor.

**3. Advanced level.** Create a sensor hierarchy with calibration, noise filtering (a virtual method), and a custom `SensorFaultException` for faulty readings. A dotnet CLI application processes a stream of readings from standard input (`id;time;value`) and prints alarms and faults; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 24. Payment methods {#v24}

**1. Initial level.** Create a `Payment` base class with an amount and a virtual `Fee()` method, and the derived classes `CardPayment` (1.5%), `CashPayment` (0), and `CryptoPayment` (fixed fee). Print the fees for an array of payments.

**2. Basic level.** Create a payment hierarchy with a virtual `Process(decimal balance)` method that returns a result or throws a custom `PaymentDeclinedException` with a reason (card limit, not enough cash), and an overridden `ToString`. The console program processes payments and prints a report.

**3. Advanced level.** Create a payment hierarchy with refunds (a virtual `Refund` method), sealed types, and a `PaymentProcessor` class with retries. A dotnet CLI application processes a transaction log from standard input and prints a report of successful, declined, and refunded payments; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 25. Laboratory instruments {#v25}

**1. Initial level.** Create an `Instrument` base class with a name, an error margin, and a virtual `Measure(double trueValue)` method, and the derived classes `Thermometer`, `Manometer`, and `Scales`. Print the measured values.

**2. Basic level.** Create an instrument hierarchy with a measurement range (an exception outside the range), a virtual `Unit` method, and a calibration date in the base class; an instrument with an expired calibration does not measure. The console program performs a series of measurements and prints the results with their errors.

**3. Advanced level.** Create an instrument hierarchy with digital descendants (sealed classes with a resolution) and a `Laboratory` class. A dotnet CLI application processes a measurement log from standard input, calculates the mean and uncertainty for each instrument, and prints rejected measurements to `Console.Error`; exit codes: 0, 1, 2.

### Variant 26. Vehicle rental {#v26}

**1. Initial level.** Create a `RentalVehicle` base class with a per-minute rate and a virtual `Cost(int minutes)` method, and the derived classes `Scooter` (unlock fee), `Bike`, and `Car` (minimum 30 minutes). Print the cost of rides.

**2. Basic level.** Create a rental vehicle hierarchy with a charge or fuel level in the base class (`protected`), a virtual `CanStart()` method, and an `EndRide(int minutes, double km)` method. The console program simulates rentals and prints bills.

**3. Advanced level.** Create a rental vehicle hierarchy with rate packages (sealed wrapper classes using composition) and a custom `RentalException`. A dotnet CLI application processes rides from standard input and prints revenue by type; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 27. Tournament systems {#v27}

**1. Initial level.** Create a `Tournament` base class with an array of teams and a virtual `Pairs()` method that returns the first-round pairings, and the derived classes `RoundRobin` and `Knockout`. Print the pairings for 8 teams.

**2. Basic level.** Create a tournament hierarchy with a virtual method that generates all rounds (round robin uses the “circle” algorithm; knockout checks that the number of teams is a power of two) and a `RecordResult` method. The console program runs a tournament with entered results.

**3. Advanced level.** Create a tournament hierarchy with a Swiss system (a sealed class) and a custom `TournamentException`. A dotnet CLI application runs a tournament using results from standard input and prints standings after each round and the winner; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 28. Custom furniture {#v28}

**1. Initial level.** Create a `Furniture` base class with dimensions and a virtual `MaterialArea()` method, and the derived classes `Wardrobe`, `Table`, and `Chair`. Print the material area for an order.

**2. Basic level.** Create a furniture hierarchy with a material and a price per m² in the base class, overridden `MaterialArea` and `Estimate()` methods (an estimate including hardware), and dimension validation in constructors. The console program builds an order and prints the estimate.

**3. Advanced level.** Create a furniture hierarchy with modular furniture (a composition of modules in a `ModularWardrobe` class), cutting of material sheets, and a custom `DesignException`. A dotnet CLI application processes orders from standard input and prints the estimate and the number of sheets; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 29. Spacecraft {#v29}

**1. Initial level.** Create a `Spacecraft` base class with a mass, fuel, and a virtual `DeltaV()` method, and the derived classes `Satellite`, `Probe`, and `Rocket` with different engines. Print the available delta-v.

**2. Basic level.** Create a spacecraft hierarchy with a virtual `ExecuteManeuver(double deltaV)` method that consumes fuel or throws an exception if there is not enough, and an overridden `ToString`. The console program executes a maneuver plan for several spacecraft.

**3. Advanced level.** Create a spacecraft hierarchy with a multistage rocket (a composition of stages), sealed classes, and a custom `MissionFailedException`. A dotnet CLI application simulates missions from standard input and prints a maneuver log and the remaining fuel; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 30. Job openings {#v30}

**1. Initial level.** Create a `Vacancy` base class with a title, a salary, and a virtual `Describe()` method, and the derived classes `FullTimeVacancy`, `PartTimeVacancy` (hours per week), and `Internship` (duration). Print the job openings.

**2. Basic level.** Create a job opening hierarchy with requirements (experience, skills) in the base class and a virtual `Matches(Candidate candidate)` method with different rules for internships. The console program finds job openings for an entered candidate.

**3. Advanced level.** Create a job opening hierarchy with a match score (a virtual `Score` method) and overridden `Equals`/`GetHashCode` for duplicates. A dotnet CLI application processes job openings and candidates from standard input and prints the best matches and duplicates; errors go to `Console.Error`; exit codes: 0, 1, 2.

## Procedure

1. Study the theory and worked examples.
2. Draw a UML diagram of the class hierarchy for your variant: the base class, derived classes, and virtual and overridden members; test each inheritance relationship with the sentence “X is a Y.”
3. Create a solution and project; put each class in a separate file.
4. Implement the hierarchy for the chosen difficulty level: constructors with `base(…)`, virtual methods, an overridden `ToString` (and `Equals`/`GetHashCode` if the task requires it), and a polymorphic array of objects.
5. Test the program; in the debugger, inspect the actual types of the elements of the polymorphic array and step into a virtual method call (**F11**).
6. Demonstrate the program to the instructor, explain the code, and answer the review questions.
