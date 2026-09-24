---
title: "Tasks"
description: "Topic 7. Classes and objects: task variants"
outline: [2, 3]
sourceHash: "d97d5ca3d253d9678a8ce263669913e1b92071344d6603d03bee7e43fd067a6e"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Family budget {#v1}

**1. Initial level.** Create an `Expense` class with auto-properties `Category`, `Amount`, and `Date` and a constructor that checks that the amount is positive. In a console program, create an array of six expenses and print them as a table along with the total.

**2. Basic level.** Create a `FamilyBudget` class with a private array of expenses, a validated `MonthlyLimit` property, the methods `AddExpense` and `TotalByCategory(string category)`, and the computed properties `Total` and `Remaining`. The console program adds expenses through a menu, prints totals by category, and warns when the limit is exceeded.

**3. Advanced level.** Create a `Transaction` class (income or expense, date, category, comment) and a `Budget` class with overloaded constructors, methods for monthly and per-category reports, and a `ToString` method. A dotnet CLI console application reads transactions from standard input in CSV format, builds a monthly report with the balance and category percentages, and writes invalid lines to `Console.Error`; exit codes: 0, 1, 2.

### Variant 2. Library book {#v2}

**1. Initial level.** Create a `LibraryBook` class with the properties `Title`, `Author`, `InventoryNumber` (`init`), and `IsAvailable` and the methods `Lend()` and `Return()`, which throw `InvalidOperationException` when a book is lent or returned twice. Demonstrate working with two books.

**2. Basic level.** Create a `LibraryBook` class with a lending history (an array of reader surnames), a `DueDate` property, and the methods `Lend(string reader, int days = 14)` and `Return(DateTime date)`, which returns the late fee (5 UAH per day). The console program manages an array of books through a menu: search by author, lend, return, and list overdue books.

**3. Advanced level.** Create `LibraryBook` and `Reader` classes (the limit on books borrowed at the same time depends on the reader type set in the constructor) that validate all operations. A dotnet CLI console application processes an operation log from standard input (`lend`, `return`, `renew`) and prints the state of the collection, debtors with their fines, and invalid operations to `Console.Error`; exit codes: 0, 1, 2.

### Variant 3. Student {#v3}

**1. Initial level.** Create a `Student` class with the properties `FullName` (not empty), `Group`, and an array of grades, a constructor, and a computed `Average` property. Create three students and print their average grades.

**2. Basic level.** Create a `Student` class with an `AddGrade(int grade)` method (grade 0–100, up to 20 grades), the properties `Average` and `HasDebts` (there are grades below 50), and a `Scholarship()` method that returns the scholarship amount according to rules defined by constants. The console program reads a group, prints a table of students, and ranks them by average grade.

**3. Advanced level.** Create `Student`, `Subject`, and `Group` classes (an array of students, methods for searching, sorting by average grade, and per-subject statistics) with data validation in constructors and properties. A dotnet CLI application loads a grade sheet from standard input (`surname;subject;grade`) and prints a summary table of students × subjects, a ranking, and a list of students with debts; invalid lines go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 4. Car {#v4}

**1. Initial level.** Create a `Car` class with the properties `Model`, `FuelCapacity`, `FuelLevel` (validated: 0…`FuelCapacity`), and `Mileage` and a `Drive(double km, double consumption)` method that reduces fuel and increases mileage. Demonstrate several trips and refueling.

**2. Basic level.** Create a `Car` class with constructors (model; model and tank capacity), the methods `Refuel(double liters)` and `Drive(double km)` (consumption in L/100 km is stored in a property; if there is not enough fuel, the car covers the possible distance and the method returns it), and a computed `Range` property. The console program simulates a route with several legs and refueling stops.

**3. Advanced level.** Create `Car` and `Trip` classes (route legs with a distance and a road type that changes consumption) with value validation and a `ToString` method. A dotnet CLI application processes a trip log from standard input, plans refueling so that the fuel level never drops below `--reserve`, and prints a table of legs, refueling stops, fuel cost, and overall statistics; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 5. Thermostat {#v5}

**1. Initial level.** Create a `Thermostat` class with a `TargetTemperature` property (validated: 5–30 °C), a `CurrentTemperature` property, and an `Update()` method that returns the mode `"heating"`, `"cooling"`, or `"idle"`. Demonstrate changing the target and current temperatures.

**2. Basic level.** Create a `Thermostat` class with “comfort,” “eco,” and “night” modes (the target temperature for each is set in the constructor), a hysteresis of 0.5 °C, and a `Step(double outdoorTemperature)` method that changes the current temperature depending on the heater state. The console program simulates a day hour by hour and prints a table of states and the number of hours the heater was on.

**3. Advanced level.** Create `Thermostat`, `Schedule` (an hourly schedule of modes), and `Room` classes (heat loss depends on the area and insulation set in the constructor). A dotnet CLI application simulates a week in steps of `--step` minutes using outdoor temperatures from standard input and prints energy consumption, the average deviation from the target, and hours of discomfort; data errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 6. Coffee machine {#v6}

**1. Initial level.** Create a `CoffeeMachine` class with properties for the water (ml) and coffee (g) supply that validate capacity, and a `MakeEspresso()` method that uses 30 ml of water and 8 g of coffee or throws `InvalidOperationException` if there is not enough. Make several servings.

**2. Basic level.** Create a `CoffeeMachine` class with the methods `Refill(int water, int coffee)` and `Make(string drink)` for espresso, americano, and cappuccino (recipes are defined in the class), a counter of servings until cleaning (after 10 servings, brewing is not allowed until `Clean()` is called), and a `Status` property. The console program implements the coffee machine menu.

**3. Advanced level.** Create `CoffeeMachine`, `Recipe`, and `Order` classes (drink, size, quantity, extra sugar) with overloaded constructors. A dotnet CLI application processes an order queue from standard input, refills automatically with the `--auto-refill` option, and prints a log, revenue, and ingredient consumption, while unfulfilled orders go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 7. To-do list {#v7}

**1. Initial level.** Create a `TaskItem` class with the properties `Title` (not empty, `init`), `Priority` (1–3), and `IsDone` and a `Complete()` method. Create an array of five tasks, mark two as done, and print the list with `[x]` and `[ ]` marks.

**2. Basic level.** Create a `TaskItem` class with a creation date, a due date, a computed `IsOverdue` property, and a `ToString` method, and a `TaskList` class with methods for adding, removing by number, marking as done, and printing by priority. The console program implements a menu for managing the to-do list.

**3. Advanced level.** Create `TaskItem`, `TaskList`, and `Tag` (task labels) classes that validate all values. A dotnet CLI application executes commands from arguments (`add`, `done`, `list --tag work --overdue`, `stats`) on a list stored in a text file as delimited lines; command errors and corrupted file lines go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 8. Music playlist {#v8}

**1. Initial level.** Create a `Track` class with the properties `Artist`, `Title`, and `Duration` (seconds, positive) and a `ToString` method in the format `Artist – Title (m:ss)`. Create an array of tracks and print them and the total duration.

**2. Basic level.** Create a `Playlist` class with a name, a private array of tracks, the methods `Add`, `Remove`, `FindByArtist`, and `Shuffle(int seed)` (Fisher–Yates shuffle), and a computed `TotalDuration` property. The console program builds a playlist and prints it before and after shuffling.

**3. Advanced level.** Create `Track`, `Playlist`, and `Player` classes (current track, position, repeat and shuffle modes, the methods `Next`, `Previous`, and `Seek`). A dotnet CLI application loads a playlist from standard input, runs a script of commands from arguments, and prints a playback log and listening statistics; invalid commands go to `Console.Error`.

### Variant 9. Rational fraction {#v9}

**1. Initial level.** Create a `Fraction` class with a constructor that checks the denominator (not zero), reduces the fraction, and moves the sign to the numerator, the properties `Numerator` and `Denominator`, and a `ToString` method. Create several fractions and print them in reduced form.

**2. Basic level.** Create an immutable `Fraction` class with the methods `Add`, `Subtract`, `Multiply`, and `Divide`, which return new fractions, a `CompareTo(Fraction other)` method, and a `Value` property of type `double`. The console program calculates the sum and product of fractions entered on one line and prints them in ascending order.

**3. Advanced level.** Create a `Fraction` class with overloaded constructors (an integer, a numerator and denominator, an `a/b` string, or a decimal fraction `0.125`), a static `TryParse` method, and overflow checking in `checked`. A dotnet CLI application evaluates expressions with fractions from arguments, respecting operator precedence, and prints the result as a fraction, a mixed number, and a decimal; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 10. Smartphone {#v10}

**1. Initial level.** Create a `Smartphone` class with the properties `Model` and `BatteryLevel` (0–100, validated) and the methods `Call(int minutes)` (1% of charge per minute) and `Charge(int minutes)` (2% per minute). Demonstrate calls and charging.

**2. Basic level.** Create a `Smartphone` class with an event log (an array of strings), power consumption for calls, video, and standby, a power-saving mode that turns on automatically when the charge falls below 20%, and a `Report()` method. The console program simulates a day of use based on an entered scenario.

**3. Advanced level.** Create `Smartphone`, `Battery` (capacity, degradation after each charge cycle), and `App` (power consumption) classes. A dotnet CLI application simulates usage over `--days` days based on a scenario from standard input and prints a character-based charge chart, the number of cycles, and the remaining battery capacity; scenario errors go to `Console.Error`.

### Variant 11. Recipe {#v11}

**1. Initial level.** Create an `Ingredient` class with the properties `Name`, `Amount` (positive), and `Unit` and a `Recipe` class with a name, a number of servings, and an array of ingredients. Create a recipe and print its ingredient list.

**2. Basic level.** Create a `Recipe` class with a `Scale(int portions)` method that returns a new recipe with recalculated amounts, a computed `Calories` property (the calories per 100 g of each ingredient are stored in the `Ingredient` class), and a `ToString` method. The console program prints the recipe for the entered number of servings and the calories per serving.

**3. Advanced level.** Create `Ingredient`, `Recipe`, and `ShoppingList` classes (combining ingredients from several recipes with unit conversion `g`/`kg`, `ml`/`l`). A dotnet CLI application loads recipes from standard input, builds a shopping list for the menu from arguments (`borscht:6 varenyky:4`), and prints a summary table; unknown recipes and units go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 12. Sports team {#v12}

**1. Initial level.** Create a `Player` class with the properties `Name`, `Number` (1–99), and `Goals` and a `ScoreGoal()` method. Create an array of players, record several goals, and print the top scorer.

**2. Basic level.** Create a `Team` class with a name, an array of players, the methods `AddPlayer` (numbers are unique) and `RecordMatch(int scored, int conceded)`, and the properties `Points`, `GoalDifference`, and `MatchesPlayed`. The console program reads match results and prints the team statistics and the list of players.

**3. Advanced level.** Create `Player`, `Team`, `Match`, and `League` classes with data validation. A dotnet CLI application processes match reports from standard input (score, goal scorers with minutes), builds the league table, the list of top scorers, and player statistics, detects inconsistencies (a goal by a player from another team), and writes them to `Console.Error`; exit codes: 0, 1, 2.

### Variant 13. Fitness tracker {#v13}

**1. Initial level.** Create a `FitnessTracker` class with the properties `Steps` and `DailyGoal` (validated: 1000–50000), an `AddSteps(int steps)` method, and the computed properties `DistanceKm` (the step length is set in the constructor) and `GoalProgress` as a percentage.

**2. Basic level.** Create a `FitnessTracker` class with a user profile (height and weight passed to the constructor), the methods `AddWalk` and `AddRun`, a `Calories` property computed from the activity type and weight, and a `DailySummary()` method. The console program reads the day’s activities and prints a summary.

**3. Advanced level.** Create `UserProfile`, `Activity`, and `FitnessTracker` classes with a history of several days. A dotnet CLI application processes an activity log from standard input and calculates daily totals, streaks of days with the goal reached, a weekly report, and a character-based step chart; invalid records go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 14. Hotel room {#v14}

**1. Initial level.** Create a `HotelRoom` class with the properties `Number`, `Capacity`, `PricePerNight` (positive), and `IsOccupied` and the methods `CheckIn(int guests)` and `CheckOut()`, which check the capacity and room state.

**2. Basic level.** Create a `HotelRoom` class with an array of bookings (check-in date, number of nights), an `IsAvailable(DateTime from, int nights)` method, a `Book` method, and a computed stay cost with a 10% discount for 7 nights or more. The console program manages hotel rooms through a menu.

**3. Advanced level.** Create `HotelRoom`, `Booking`, and `Hotel` classes with a search for available rooms by dates and number of guests. A dotnet CLI application processes booking requests from standard input, suggests the cheapest suitable room, and prints occupancy by day and revenue; rejected requests go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 15. Car rental {#v15}

**1. Initial level.** Create a `RentalCar` class with the properties `Model`, `DailyRate`, and `IsRented` and the methods `Rent()` and `Return(int days, int km)`, which returns the rental cost (a limit of 200 km per day; extra distance costs 3 UAH/km).

**2. Basic level.** Create a `RentalAgreement` class with a car, start and end dates, the starting mileage, constructors that validate dates, a `Close(DateTime returnDate, int mileage)` method that calculates surcharges for late return and excess mileage, and a `ToString` method for the agreement. The console program draws up an agreement and calculates the payment.

**3. Advanced level.** Create `RentalCar`, `Customer`, and `RentalAgreement` classes that validate the driver’s age and experience. A dotnet CLI application processes a rental log from standard input, calculates the cost with seasonal coefficients from the `--seasons` option, and prints a fleet utilization report and revenue; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 16. Virtual pet {#v16}

**1. Initial level.** Create a `Pet` class with the properties `Name`, `Hunger`, `Happiness`, and `Energy` (0–100, values are clamped to the bounds) and the methods `Feed()`, `Play()`, and `Sleep()`. Demonstrate several actions and print the pet’s state.

**2. Basic level.** Create a `Pet` class with a `PassTime(int hours)` method that worsens the stats over time, a computed `Mood` property (a text description), and a check that an exhausted pet cannot play. The console program implements a game loop with an action menu while the pet is “happy.”

**3. Advanced level.** Create `Pet`, `Species` (rates at which stats change), and `Game` (several pets, a score, achievements) classes. A dotnet CLI application runs an action script from standard input or an interactive game (`--interactive`) and prints a log and the final score; invalid actions go to `Console.Error`.

### Variant 17. Robot vacuum {#v17}

**1. Initial level.** Create a `RobotVacuum` class with the properties `X`, `Y`, and `Battery` and a `Move(char direction)` method that changes the position within the room (the dimensions are set in the constructor) and uses 1% of the charge. Run the route `RRDDLU`.

**2. Basic level.** Create a `RobotVacuum` class with a room map (a `bool[,]` array of cleaned cells), obstacles, a `Clean(string route)` method that returns the number of cleaned cells, and a return to the base when the charge falls below 15%. The console program prints the map after cleaning.

**3. Advanced level.** Create `Room`, `RobotVacuum`, and `CleaningReport` classes. A dotnet CLI application loads a room plan from standard input, builds a “snake” route that avoids obstacles, simulates cleaning with returns for charging, and prints the map, the percentage of area cleaned, and the time; plan errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 18. Parcel {#v18}

**1. Initial level.** Create a `Parcel` class with the properties `TrackingNumber` (`init`), `Weight` (0.1–30 kg), `Length`, `Width`, and `Height` and a computed `VolumetricWeight` property (volume in cm³ / 4000). Create several parcels and print their characteristics.

**2. Basic level.** Create a `Parcel` class with a status history (an array of “date – status” records), a `ChangeStatus(string status)` method that checks the allowed order of statuses, and a `Cost(decimal ratePerKg)` method based on the greater of the actual and volumetric weight. The console program tracks a parcel through commands.

**3. Advanced level.** Create `Parcel`, `Address`, and `DeliveryService` classes with zone-based rates. A dotnet CLI application processes parcel tracking events from standard input, detects impossible status transitions, calculates the delivery cost and time, and prints a report on the parcels; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 19. Complex number {#v19}

**1. Initial level.** Create a `Complex` class with the properties `Re` and `Im`, the computed properties `Modulus` and `Argument` (in radians), and a `ToString` method in the format `a + bi`. Create several numbers and print their moduli.

**2. Basic level.** Create an immutable `Complex` class with the methods `Add`, `Multiply`, `Divide` (division by zero throws an exception), and `Conjugate` and a static `FromPolar(double r, double phi)` method. The console program solves a quadratic equation with a negative discriminant and checks the roots by substitution.

**3. Advanced level.** Create a `Complex` class with overloaded constructors, the methods `Pow(int n)` (de Moivre’s formula) and `Roots(int n)` (all nth roots), and a static `TryParse` for inputs such as `3-4i`, `2i`, and `-5`. A dotnet CLI application evaluates expressions with complex numbers from arguments and prints the results in algebraic and trigonometric form; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 20. GPS track {#v20}

**1. Initial level.** Create a `TrackPoint` class with the properties `Latitude` (−90…90), `Longitude` (−180…180), and `Time` and a `DistanceTo(TrackPoint other)` method based on the haversine formula. Calculate the distance between two points.

**2. Basic level.** Create a `GpsTrack` class with an array of points, an `AddPoint` method (time must increase), the computed properties `TotalDistance`, `Duration`, and `AverageSpeed`, and a `MaxSpeedSegment()` method. The console program reads points and prints the track characteristics.

**3. Advanced level.** Create `TrackPoint`, `GpsTrack`, and `Segment` classes. A dotnet CLI application reads a track from standard input, filters out outliers (speed between points greater than `--max-speed`), detects stops (speed below 1 km/h for longer than `--stop` minutes), and prints a table of movement segments and overall statistics; discarded points go to `Console.Error`.

### Variant 21. E-ticket {#v21}

**1. Initial level.** Create a `Ticket` class with the properties `Route`, `Seat`, `ValidFrom`, and `ValidTo` (validated: the end is after the start) and an `IsValid(DateTime moment)` method. Create a ticket and check it for several points in time.

**2. Basic level.** Create a `Ticket` class with a unique code (generated in the constructor), a number of rides, a `Validate(DateTime moment)` method that decreases the number of rides and throws exceptions for an expired or used-up ticket, and a validation log. The console program simulates a check by an inspector.

**3. Advanced level.** Create `Ticket`, `Passenger` (discounts), and `Validator` (vehicle, route) classes. A dotnet CLI application processes a validation log from standard input, detects attempts at reuse, rides on the wrong route, and expired tickets, and prints a violation report and ride statistics; data errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 22. Gym membership {#v22}

**1. Initial level.** Create a `Membership` class with the properties `Owner`, `StartDate`, and `DurationDays` and an `IsActive(DateTime date)` method. Create a membership and check whether it is active for several dates.

**2. Basic level.** Create a `Membership` class with a visit limit, a `Visit(DateTime date)` method, a `Freeze(int days)` method (no more than 30 days in total; extends the validity period), and a computed `EndDate` property. The console program records visits and prints the membership status.

**3. Advanced level.** Create `Membership`, `Plan` (a membership type with prices and visiting-hour restrictions), and `Gym` classes. A dotnet CLI application processes a visit log from standard input, rejects visits outside the allowed hours, and calculates hourly gym occupancy and revenue; rejections go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 23. Houseplant {#v23}

**1. Initial level.** Create a `Plant` class with the properties `Name`, `WaterIntervalDays`, and `LastWatered` and the methods `Water(DateTime date)` and `NeedsWater(DateTime today)`. Check the plant for several dates.

**2. Basic level.** Create a `Plant` class with soil moisture (0–100), a `PassDays(int days)` method (moisture decreases depending on the species), a `Water(int ml)` method that limits overwatering, and a `Health` property. The console program simulates caring for several plants over a month.

**3. Advanced level.** Create `Plant`, `Species`, and `CareSchedule` classes. A dotnet CLI application builds a care calendar (watering, fertilizing, repotting) for `--days` days for plants from standard input, simulates missed waterings from the `--skip` option, and prints the calendar and the state of the plants; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 24. Vector in space {#v24}

**1. Initial level.** Create a `Vector3` class with the properties `X`, `Y`, and `Z`, a computed `Length` property, and a `ToString` method. Create several vectors and print their lengths.

**2. Basic level.** Create an immutable `Vector3` class with the methods `Add`, `Scale`, `Dot` (dot product), `Cross` (cross product), `Normalize` (throws an exception for the zero vector), and `AngleTo`. The console program calculates the area of a triangle and the angle between its sides from the vertex coordinates.

**3. Advanced level.** Create `Vector3` and `Plane` (a plane through three points) classes with methods for the distance from a point to a plane, projection, and the intersection of a line with a plane. A dotnet CLI application runs geometric queries from arguments and prints the results with the specified number of decimal places; degenerate cases go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 25. Chess clock {#v25}

**1. Initial level.** Create a `ChessClock` class with each player’s time (minutes set in the constructor), an `ActivePlayer` property, and a `Switch(int secondsSpent)` method that subtracts time from the current player and passes the turn. Simulate several moves.

**2. Basic level.** Create a `ChessClock` class with an increment (extra seconds per move), an `IsFlagFallen()` method, a move counter, and `m:ss` time formatting. The console program reads the time of each move and ends the game when a player runs out of time.

**3. Advanced level.** Create `ChessClock`, `TimeControl` (a time control that adds time after the Nth move), and `GameRecord` classes. A dotnet CLI application processes a game record from standard input (moves with the time spent), detects time control violations, and prints a table of moves with the remaining time and statistics on the players’ time usage.

### Variant 26. Calendar event {#v26}

**1. Initial level.** Create a `CalendarEvent` class with the properties `Title`, `Start`, and `Duration` (positive) and a computed `End` property. Create two events and print their start and end.

**2. Basic level.** Create a `CalendarEvent` class with an `OverlapsWith(CalendarEvent other)` method, a `Move(TimeSpan delta)` method, and an `IsAllDay` property, and a `DaySchedule` class with an array of events and an `Add` method that rejects overlapping events. The console program builds a daily schedule and prints the free time slots.

**3. Advanced level.** Create `CalendarEvent`, `Recurrence` (daily, weekly on given days, monthly), and `Calendar` classes. A dotnet CLI application expands recurring events over the `--from`/`--to` period and finds conflicts and the nearest free slot of a given length for a meeting; data errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 27. Aquarium {#v27}

**1. Initial level.** Create an `Aquarium` class with the properties `Volume` (L), `Temperature` (validated: 18–32 °C), and `FishCount` and an `AddFish(int count)` method that does not allow more than one fish per 10 L. Demonstrate adding fish.

**2. Basic level.** Create `Fish` (species, length, temperature range) and `Aquarium` classes with an array of fish, a method that checks temperature compatibility, a `Feed()` method, and a water cleanliness indicator that worsens every day. The console program simulates a week of care with an action menu.

**3. Advanced level.** Create `Fish`, `Aquarium`, and `MaintenanceLog` classes. A dotnet CLI application simulates an aquarium using an event log from standard input (adding fish, feeding, water changes, temperature changes), warns about incompatibility and pollution, and prints the log and the final state; invalid events go to `Console.Error`.

### Variant 28. Player profile {#v28}

**1. Initial level.** Create a `PlayerProfile` class with the properties `Nickname` (3–16 characters), `Level`, and `Experience` and an `AddExperience(int xp)` method that raises the level every 1000 experience points. Demonstrate gaining experience.

**2. Basic level.** Create a `PlayerProfile` class with achievements (an array of strings without duplicates), an increasing experience threshold for each level, a `WinMatch()` method, and a `WinRate` property. The console program reads match results for several players and prints a leaderboard.

**3. Advanced level.** Create `PlayerProfile`, `Achievement` (an unlock condition), and `Leaderboard` classes with an Elo rating. A dotnet CLI application processes match results from standard input, updates ratings, awards achievements, and prints the leaderboard and a change log; invalid matches go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 29. Water heater {#v29}

**1. Initial level.** Create a `WaterHeater` class with the properties `VolumeLiters` and `PowerWatts` (positive) and `WaterTemperature` and a `HeatingMinutes(double targetTemperature)` method that calculates the heating time using the formula *Q* = *c* · *m* · Δ *T* (*c* = 4186 J/(kg·°C)).

**2. Basic level.** Create a `WaterHeater` class with the methods `Heat(int minutes)` and `DrawWater(double liters, double coldWaterTemperature)` (mixing in water changes the temperature), a thermostat with a target temperature, and a counter of energy used. The console program simulates a family’s morning (showers, dishes) and prints the temperature and energy.

**3. Advanced level.** Create `WaterHeater`, `Tariff` (a two-zone tariff), and `UsagePlan` classes. A dotnet CLI application simulates a day in 1-minute steps using a water consumption schedule from standard input, compares heating strategies (always on, only at night, before use) by cost and comfort, and prints a comparison table; errors go to `Console.Error`.

### Variant 30. Bike rental {#v30}

**1. Initial level.** Create a `Bike` class with the properties `Id`, `Type`, and `IsAvailable` and the methods `Rent()` and `Return(int minutes)`, which returns the cost (the first 30 minutes cost 40 UAH, then 2 UAH per minute).

**2. Basic level.** Create `Bike` and `RentalStation` classes (an array of bikes, the station capacity, methods for renting and returning that check for free docks) with rates by bike type. The console program simulates the station through commands and prints the revenue.

**3. Advanced level.** Create `Bike`, `RentalStation`, and `RentalNetwork` classes (several stations; a bike can be returned to any station). A dotnet CLI application processes a ride log from standard input, rejects returns to a full station, suggests redistributing bikes between stations, and prints a report; errors go to `Console.Error`; exit codes: 0, 1, 2.

## Procedure

1. Study the theory and worked examples.
2. Draw a UML class diagram of the class (or classes) for your variant: fields, properties with accessors, constructors, and methods; determine which values each property considers valid.
3. Create a solution and project; put each class in a separate file (*Project → Add Class…*).
4. Implement the classes for the chosen difficulty level: private fields, validating properties, overloaded constructors chained with `this(…)`, and a `ToString` method.
5. Test creating objects with valid and invalid data; inspect the objects’ state in the *Locals* window.
6. Demonstrate the program to the instructor, explain the code, and answer the review questions.
