---
title: "Tasks"
description: "Topic 11. Structures, records, tuples: task variants"
outline: [2, 3]
sourceHash: "9cb75fcf5cbae69b1401e7ddfcfe6f1227d03c98c4be6609401736eca4c156af"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Windows on the screen {#v1}

**1. Initial level.** Create a `readonly struct Rect` with the coordinates of the top-left corner, a width, and a height, and the methods `Area()` and `Contains(int x, int y)`. Check whether several points fall inside the rectangle and print the result.

**2. Basic level.** Create a `readonly struct Rect` (corner coordinates, width, height) with a `Contains` method and an intersection method that returns `Rect?`, and a record `Window(string Title, Rect Bounds, int Z)`. For an array of windows, the console program determines which window receives a click at the entered point (the largest `Z` among those that contain the point) and prints the window overlaps.

**3. Advanced level.** Create a window manager library with the structures `Rect` (position, size, intersection) and `Size`, window records (title, bounds, `Z`), `with` expressions for moving and resizing, and tiling of windows. A dotnet CLI application executes commands (`open`, `move`, `resize`, `tile`) from standard input and prints a character-based layout of the screen; errors go to `Console.Error`.

### Variant 2. Medical readings {#v2}

**1. Initial level.** Create a `readonly struct BloodPressure` with systolic and diastolic pressure and a `PressureCategory` enumeration (optimal, normal, elevated, hypertension). Determine the category for several measurements with a `switch` expression and print it.

**2. Basic level.** Create a `readonly struct BloodPressure` (systolic and diastolic pressure) with a category enumeration, a record `Measurement(DateTime Time, BloodPressure Pressure, int Pulse)`, and a method that returns a tuple `(BloodPressure Min, BloodPressure Max, double AvgPulse)`. The console program reads the entered measurements for a week and prints a report by category.

**3. Advanced level.** Create a health diary library with a `BloodPressure` structure, an enumeration of pressure categories, measurement records (time, pressure, pulse), and positional patterns for warnings (high pressure together with a high pulse). A dotnet CLI application processes a CSV of measurements from standard input and prints trends by day and warnings; format errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 3. Car trim levels {#v3}

**1. Initial level.** Create a `CarOptions` flag enumeration (air conditioning, navigation, heated seats, camera, cruise control, and so on). Print the options of the base and top trim levels and check for an option with the `HasFlag` method.

**2. Basic level.** Create a `CarOptions` flag enumeration (air conditioning, navigation, camera, and so on), a trim level record with a name, a base price, and options, and a table of option prices. The console program calculates the cost of trim levels and shows the options shared by two trim levels and the options missing from the desired set entered by the user.

**3. Advanced level.** Create a car configurator library with a `CarOptions` flag enumeration, trim level records (name, base price, options), option prices, and rules for dependencies (the camera requires navigation) and incompatibilities. A dotnet CLI application parses the desired options from arguments (`--options Navigation,Camera`) with `Enum.TryParse`, checks the rules, and selects the cheapest trim level; errors go to `Console.Error`.

### Variant 4. Playing cards {#v4}

**1. Initial level.** Create the enumerations `Suit` and `Rank` and a `readonly record struct Card` with a suit and a rank. Build a 52-card deck and print it.

**2. Basic level.** Create the enumerations `Suit` and `Rank`, a `readonly record struct Card`, and a 52-card deck with shuffling using a fixed seed, dealing five cards, and determining the highest card and whether there is a pair. The console program deals cards to four players and prints their hands.

**3. Advanced level.** Create a poker library with the enumerations `Suit`, `Rank`, and `HandRank`, a `Card` structure, and detection of hands (pair, two pair, three of a kind, straight, flush, full house, four of a kind, straight flush) using positional patterns. A dotnet CLI application compares five-card hands from standard input (`AS KD 10H …`) and prints the winner; errors go to `Console.Error`.

### Variant 5. Support tickets {#v5}

**1. Initial level.** Create the enumerations `TicketStatus` and `Priority` and a `Ticket` record (number, subject, status, priority). Print several tickets with the names of their statuses and priorities, sorted by priority.

**2. Basic level.** Create a `Ticket` record with status and priority enumerations and a status transition machine (open, in progress, waiting for customer, resolved, closed) using a `switch` expression on a `(status, action)` tuple. The console program applies the entered actions to tickets and prints the change history.

**3. Advanced level.** Create a support desk library with status and priority enumerations, immutable ticket records (changed through `with`), status transitions, response time tracking by priority, and reopening. A dotnet CLI application processes an event log from standard input and prints overdue tickets and statistics; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 6. Color models {#v6}

**1. Initial level.** Create a `readonly struct Rgb` with components 0–255 and a `ToHex()` method. Print several colors in hexadecimal notation.

**2. Basic level.** Create a `readonly struct Rgb` (components 0–255) and a `readonly struct Hsv`, RGB ↔ HSV conversion, and parsing of a `#RRGGBB` string. The console program builds a palette of shades of the entered color, prints it, and checks that the conversion is reversible.

**3. Advanced level.** Create a color library with RGB, HSV, and CMYK structures, a palette record, and a WCAG contrast calculation. A dotnet CLI application generates harmonious palettes (complementary, triad) for a color from arguments and prints pairs with insufficient contrast; errors go to `Console.Error`.

### Variant 7. Date ranges {#v7}

**1. Initial level.** Create a `readonly record struct DateRange` with a start and an end of type `DateOnly` and the members `Days` and `Contains`. Check whether several dates fall within a vacation period and print the result.

**2. Basic level.** Create a `readonly record struct DateRange` with a start and an end of type `DateOnly`, the members `Days` and `Contains`, an intersection method (returns `DateRange?`), and merging of adjacent periods. The console program checks whether employees’ vacations overlap and prints the shared days.

**3. Advanced level.** Create a calendar library with a `readonly record struct DateRange` (start and end of type `DateOnly`), merging of an array of periods, exclusion of weekends and holidays, and statistics tuples. A dotnet CLI application calculates the number of working days in periods from standard input; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 8. ECTS grades {#v8}

**1. Initial level.** Create an `EctsGrade` enumeration (A–F) and a method that converts a score of 0–100 to a grade with a `switch` expression using relational patterns. Print the grades for several scores.

**2. Basic level.** Create an `EctsGrade` enumeration (A–F) with conversion of a score of 0–100 using a `switch` expression, a record `Result(string Student, string Subject, int Score)`, and a method that returns a tuple `(double Average, EctsGrade Best, int Failed)`. The console program prints a group grade sheet with grades and totals.

**3. Advanced level.** Create a grade tracking library with enumerations of ECTS grades and the national scale, result records (student, subject, score), conversion tables, and grade distribution. A dotnet CLI application processes a CSV of results from standard input and prints a grade sheet, a grade histogram, and students with failing grades; errors go to `Console.Error`.

### Variant 9. Tetromino pieces {#v9}

**1. Initial level.** Create the enumerations `TetrominoKind` (I, O, T, S, Z, J, L) and `Rotation` (0, 90, 180, 270). Print each piece with characters.

**2. Basic level.** Create the enumerations `TetrominoKind` and `Rotation`, a `readonly record struct Cell`, and a piece record with a kind, a rotation, and a position; implement rotation with a `with` expression. The console program rotates the piece according to the entered commands and prints it with characters.

**3. Advanced level.** Create a Tetris game library with enumerations of piece kinds and commands, piece and cell records, a board, collision detection, and clearing of full rows. A dotnet CLI application replays a sequence of commands from standard input with a fixed seed and prints the board and the score; errors go to `Console.Error`.

### Variant 10. Match results {#v10}

**1. Initial level.** Create a record `Match(string Home, string Away, int HomeGoals, int AwayGoals)` and an `Outcome` enumeration (home win, draw, away win). Determine and print the result of several matches.

**2. Basic level.** Create a record `Match(string Home, string Away, int HomeGoals, int AwayGoals)`, an `Outcome` enumeration, correction of an incorrectly entered score with a `with` expression, and a method that returns a tuple `(int Wins, int Draws, int Losses, int Points)` for a team. The console program prints the league table.

**3. Advanced level.** Create a championship library with immutable match records (teams, score), an outcome enumeration, a correction history using `with`, and additional statistics (goal difference, head-to-head results). A dotnet CLI application processes match results from standard input and prints the league table; errors go to `Console.Error`.

### Variant 11. Physical quantities {#v11}

**1. Initial level.** Create a `LengthUnit` enumeration (meter, kilometer, inch, foot, mile) and a `readonly struct Length` with a value and a unit. Convert a given length to all units and print the results.

**2. Basic level.** Create enumerations of length, mass, and temperature units and the structures `Length`, `Mass`, and `Temperature` (value and unit) with the methods `ConvertTo` and `Add` and comparison. The console program converts the entered quantities to the selected unit.

**3. Advanced level.** Create a library of physical quantities with structures (value, unit enumeration), string parsing (`12.5 km`, `3 lb`), and coefficient tables. A dotnet CLI application converts quantities from arguments to the `--to` unit and sums mixed units; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 12. User roles {#v12}

**1. Initial level.** Create a `Permission` flag enumeration (read, create, edit, delete, administer). Print the permissions of three roles and check access to operations.

**2. Basic level.** Create a `Permission` flag enumeration (read, create, edit, delete, administer), a record `User(string Login, Permission Granted, Permission Denied)`, and a calculation of effective permissions (granted by roles minus denied). The console program checks the users’ entered access requests.

**3. Advanced level.** Create an access control library with a `Permission` flag enumeration, user and role records, role inheritance, and a check log. A dotnet CLI application processes requests from standard input, parses permissions with `Enum.TryParse`, and prints denials with reasons; errors go to `Console.Error`.

### Variant 13. Software versions {#v13}

**1. Initial level.** Create a `readonly record struct SemVersion(int Major, int Minor, int Patch)` and print several versions and the result of comparing them for equality.

**2. Basic level.** Create a `readonly record struct SemVersion(int Major, int Minor, int Patch)` with parsing of a `1.4.2` string, an implementation of `IComparable<SemVersion>`, and methods for bumping the version. The console program sorts the entered versions and determines the newest.

**3. Advanced level.** Create a semantic versioning library (a `readonly record struct` with `Major`, `Minor`, and `Patch`, parsing, and comparison) with support for suffixes (`2.0.0-beta.1`) and ranges (`>=1.2.0`, `^1.4`). A dotnet CLI application selects, from package versions on standard input, the newest one that satisfies the range from the arguments; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 14. Bird watching {#v14}

**1. Initial level.** Create a record `Sighting(string Species, int Count, DateOnly Date)` and print several sightings using deconstruction.

**2. Basic level.** Create a record `Sighting(string Species, int Count, DateOnly Date)`, an enumeration of species conservation status, and a method that returns a tuple `(int Total, DateOnly First, DateOnly Last)` for a species. The console program prints a report by species with their status.

**3. Advanced level.** Create a bird census library with route and sighting records (species, count, date), a species status enumeration, duplicate detection using value equality, and positional patterns for rare species. A dotnet CLI application processes a CSV from standard input and prints a report by season; errors go to `Console.Error`.

### Variant 15. School olympiad {#v15}

**1. Initial level.** Create a `Medal` enumeration (none, bronze, silver, gold) and a participant record with a name, a school, and a score. Determine and print each participant’s medal according to thresholds.

**2. Basic level.** Create enumerations of medals and subjects, a participant record (name, school, subject, score) that determines the medal according to thresholds, and a method that returns a tuple `(int Gold, int Silver, int Bronze)` for a school. The console program prints the medal standings of the schools.

**3. Advanced level.** Create an olympiad library with enumerations of medals and subjects, participant records (school, subject, score), appeals (a new record through `with`), a cap on the share of winners, and distribution of medals by quotas. A dotnet CLI application processes results from standard input and prints the official results; errors go to `Console.Error`.

### Variant 16. Contact book {#v16}

**1. Initial level.** Create a record `Contact(string Name, string Phone, string Email)`. Create several contacts and print the result of comparing two identical ones for equality.

**2. Basic level.** Create a `Contact` record (name, phone, email) that normalizes the phone number in the constructor, and a contact group enumeration. The console program finds duplicates among the entered contacts using value equality and prints the contacts by group.

**3. Advanced level.** Create a contacts library with immutable `Contact` records (name, phone, email, group), a change history using `with`, and merging of duplicates. A dotnet CLI application imports contacts from a CSV on standard input, merges duplicates, and prints a change report; errors go to `Console.Error`.

### Variant 17. Washing machine {#v17}

**1. Initial level.** Create a `WashProgram` enumeration (cotton, synthetics, delicates, quick) and print the temperature and duration for each program using a `switch` expression.

**2. Basic level.** Create enumerations of wash programs and stages (soaking, washing, rinsing, spinning, finished) and a transition machine with the duration of each stage. The console program simulates the wash cycle of the selected program stage by stage.

**3. Advanced level.** Create a washing machine library with enumerations of programs and stages, a transition machine, a flag enumeration of additional options (prewash, extra rinse), a pause, and fault states. A dotnet CLI application runs a scenario of events from standard input and prints a timeline of states; errors go to `Console.Error`.

### Variant 18. Time of day {#v18}

**1. Initial level.** Create a `readonly struct TimeOfDay` with hours and minutes, validation in the constructor, and a `ToString` method. Print several points in time.

**2. Basic level.** Create a `readonly struct TimeOfDay` (hours and minutes with validation) with methods for adding minutes with wraparound past midnight, calculating the difference between points in time, and comparing. The console program calculates shift durations from the entered start and end times.

**3. Advanced level.** Create a scheduling library with a `TimeOfDay` structure (hours, minutes), interval records, and a search for free slots across several schedules. A dotnet CLI application finds a common free time for a meeting from schedules on standard input; errors go to `Console.Error`.

### Variant 19. Print profiles {#v19}

**1. Initial level.** Create the enumerations `PaperSize` and `Orientation` and a `PrintProfile` record (paper size, orientation, number of copies, duplex printing). Print several print profiles.

**2. Basic level.** Create the enumerations `PaperSize` and `Orientation`, a `PrintProfile` record (paper, orientation, duplex printing, pages per sheet), and profiles based on the standard one using `with` expressions (draft, photo, booklet); check the profiles for equality. The console program calculates the number of sheets for a document according to a profile.

**3. Advanced level.** Create a printing library with enumerations of paper size and orientation, a hierarchy of records (profile, photo profile), a flag enumeration of options, and a printer compatibility check. A dotnet CLI application selects a profile and its modifications from arguments and prints the parameters of the print job; errors go to `Console.Error`.

### Variant 20. Blood types {#v20}

**1. Initial level.** Create the enumerations `BloodGroup` (O, A, B, AB) and `RhFactor` and a `readonly record struct BloodType`. Print all eight blood types.

**2. Basic level.** Create the enumerations `BloodGroup` and `RhFactor`, a `readonly record struct BloodType`, and a donor–recipient compatibility check using a `switch` expression on a tuple. The console program prints a compatibility table and the list of possible donors for the patient’s entered blood type.

**3. Advanced level.** Create a blood bank library with a blood type (`BloodGroup`, `RhFactor`), compatibility rules, donor and stock records, and selection of compatible units that prioritizes an identical group. A dotnet CLI application processes requests from standard input and prints the dispensed units and remaining stock; errors go to `Console.Error`.

### Variant 21. Clothing sizes {#v21}

**1. Initial level.** Create a `ClothingSize` enumeration (XS–XXL) and a `readonly struct BodyMeasurements` with body measurements. Determine and print the size for several sets of measurements.

**2. Basic level.** Create enumerations of clothing sizes `ClothingSize` (XS–XXL) and size charts (international, European, American), a `readonly struct BodyMeasurements` with body measurements, and conversion of sizes between charts. The console program selects a size for the entered measurements in all charts.

**3. Advanced level.** Create a clothing fitting library with a size enumeration, a `BodyMeasurements` structure, manufacturers’ size tables, and product records. A dotnet CLI application selects products by measurements from standard input and compares the time needed to process an array of 1,000,000 measurements declared as a structure and as a class; errors go to `Console.Error`.

### Variant 22. Log levels {#v22}

**1. Initial level.** Create a `LogLevel` enumeration (Trace–Critical) and a `LogEntry` record (time, level, message). Print the entries with a level not lower than a given one.

**2. Basic level.** Create a `LogLevel` enumeration (Trace–Critical), a `LogEntry` record (time, level, message), parsing of log lines into records, and a method that returns a tuple of counters by level. The console program filters the log by the level entered by the user (`Enum.TryParse`).

**3. Advanced level.** Create a log analysis library with a `LogLevel` enumeration, `LogEntry` records (time, level, category, message), a flag enumeration of categories, grouping of repeated messages, and property patterns for alert rules. A dotnet CLI application processes a log from standard input according to the `--min-level` and `--category` options; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 23. Climate zones {#v23}

**1. Initial level.** Create a `ClimateZone` enumeration and a record `Station(string Name, double AvgTemp, int Rainfall)`. Determine and print the zone of each station with a `switch` expression.

**2. Basic level.** Create a `ClimateZone` enumeration, records for a station and monthly measurements (temperature, precipitation), and a method that returns a tuple `(double Min, double Max, int TotalRain)`. The console program classifies stations by annual data with a `switch` expression.

**3. Advanced level.** Create a climate classification library (a simplified Köppen scheme) with a zone enumeration, station and monthly measurement records, and positional patterns. A dotnet CLI application processes station data from standard input and prints the classification and a comparison; errors go to `Console.Error`.

### Variant 24. Airline tickets {#v24}

**1. Initial level.** Create a `ServiceClass` enumeration and a `Ticket` record with a passenger, a flight, a class, and a price. Print the tickets with the class names.

**2. Basic level.** Create a `ServiceClass` enumeration, a flag enumeration of services (baggage, seat selection, meals), and a `Ticket` record (passenger, flight, class, services, price) with a price calculation that includes surcharges. The console program issues tickets and changes the class with a `with` expression.

**3. Advanced level.** Create a booking library with a service class enumeration, flight and ticket records, seats by class, and ticket exchange rules. A dotnet CLI application processes bookings and exchanges from standard input and prints flight occupancy; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 25. Pixel graphics {#v25}

**1. Initial level.** Create a `readonly struct Pixel` with RGB components and an image as a two-dimensional array of structures. Print the image with characters according to brightness.

**2. Basic level.** Create a `readonly struct Pixel` (RGB components) and an image as a two-dimensional array of pixels with conversion to grayscale, inversion, and mirroring. The console program applies the operations, prints the image with characters according to brightness, and shows that changing a copy of a pixel does not change the array.

**3. Advanced level.** Create an image library with a `Pixel` structure (RGB), a two-dimensional array of pixels, parsing of the PPM (P3) format, filters, and a histogram. A dotnet CLI application reads a PPM image from standard input, applies filters from arguments, and outputs a PPM image; errors go to `Console.Error`.

### Variant 26. Zodiac signs {#v26}

**1. Initial level.** Create a `Zodiac` enumeration and a method that determines the sign from a date of birth. Print the signs for several dates.

**2. Basic level.** Create enumerations of zodiac signs and elements, sign boundaries in an array of tuples `(Zodiac Sign, int FromMonth, int FromDay)`, and determination of the sign by searching the array. The console program prints the sign and element for the entered date of birth.

**3. Advanced level.** Create a calendar library with enumerations of zodiac signs, elements, and Chinese calendar animals, and determination of each from a date of birth. A dotnet CLI application processes dates from standard input and prints the distribution by sign; errors go to `Console.Error`.

### Variant 27. Financial transactions {#v27}

**1. Initial level.** Create a `Category` enumeration and a `readonly record struct Transaction` with a date, an amount, and a category. Print the transactions for a day.

**2. Basic level.** Create a `Category` enumeration, a `readonly record struct Transaction` (date, amount, category), and a method that returns a tuple `(decimal Income, decimal Expenses, decimal Balance)` for a period. The console program prints the balance by month and expenses by category.

**3. Advanced level.** Create a personal finance library with transactions (a `readonly record struct`: date, amount, category enumeration), category budgets, recurring payments, and overspending warnings. A dotnet CLI application processes a CSV bank statement from standard input and prints a report; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 28. VAT rates on a receipt {#v28}

**1. Initial level.** Create a `VatRate` enumeration (20%, 7%, 0%) and a receipt line record (product, quantity, price, rate). Calculate and print the VAT for each line.

**2. Basic level.** Create a `VatRate` enumeration (20%, 7%, 0%), a receipt line record (product, quantity, price, rate), and a method that returns a tuple of amounts excluding VAT and the tax for each rate. The console program builds a receipt from the entered lines with totals by rate.

**3. Advanced level.** Create a cash register library with a VAT rate enumeration, line and receipt records, returns (a new record through `with`), and a daily report. A dotnet CLI application processes sales and returns from standard input and prints a Z-report; errors go to `Console.Error`.

### Variant 29. Phone numbers {#v29}

**1. Initial level.** Create a `readonly struct PhoneNumber` with a country code, a number, and a formatted output method. Print several numbers.

**2. Basic level.** Create a `readonly struct PhoneNumber` (country code, number) with formatted output, parsing of numbers in different formats (`+380 67 123 45 67`, `067-123-45-67`), and an enumeration of carriers by code. The console program normalizes the entered numbers and determines the carrier.

**3. Advanced level.** Create a phone number library with a `PhoneNumber` structure, a carrier enumeration, format validation for several countries, value equality, and duplicate search. A dotnet CLI application normalizes a list of numbers from standard input and prints statistics by carrier; errors go to `Console.Error`.

### Variant 30. Lottery {#v30}

**1. Initial level.** Create a lottery ticket record with a number and an array of six numbers. Create several tickets and print them.

**2. Basic level.** Create a lottery ticket record (number, six numbers), an enumeration of prize categories, and a ticket-checking method that returns a tuple `(int Matches, decimal Prize)`. The console program runs a draw with a fixed seed and prints the winning tickets.

**3. Advanced level.** Create a lottery library with ticket records (number, six numbers), an enumeration of prize categories, ticket validation, distribution of the prize fund among the categories, and draw statistics. A dotnet CLI application processes tickets from standard input and results from arguments and prints a report; errors go to `Console.Error`.

## Procedure

1. Study the theory and worked examples.
2. For your variant, determine which data to describe with structures, records, enumerations, and tuples; justify your choice.
3. Create a solution and project; put each type in a separate file.
4. Implement the types for the chosen difficulty level; for enumerations, provide validation of entered values.
5. Test structure copying, record equality, and `with` expressions; inspect the values of variables in the debugger.
6. Demonstrate the program to the instructor, explain the code, and answer the review questions.
