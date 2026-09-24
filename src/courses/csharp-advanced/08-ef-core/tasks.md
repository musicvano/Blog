---
title: "Tasks"
description: "Topic 8. Entity Framework Core: task variants"
outline: [2, 3]
sourceHash: "13c82e40b83fe7600ddf0e09cefa52b7031cd760ab92cbc521062b078c7add12"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Electronic grade book {#v1}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL in which the "Student" and "Grade" (subject, score from 1 to 12, date) entities are related 1:N; the tables are created by a migration, and the program adds three students with grades and prints the grades of each student.

**2. Basic level.** Create a C# console program with EF Core that, for the "class – student – subject – grade" model, asks for a class name and prints a table of the students' average scores by subject (a projection with `GroupBy`, two decimal places); a nonexistent class is reported.

**3. Advanced level.** Create a C# "Grade book" console application with EF Core and PostgreSQL (the "class", "student", "subject", and "grade" with a date entities) with the commands `add-grade <student> <subject> <score>`, `report <class> [--from date] [--to date]`, and `import <file.csv>`: the import is performed in a transaction (a line with an error cancels the whole file), and the report prints the average scores with the class total; `--help`, errors to the error stream, exit codes.

### Variant 2. Equipment rental {#v2}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Equipment" (name, price per day) and "Rental" (customer, rental date, return date, optional) entities; the program adds a rental and prints the equipment that has not been returned yet.

**2. Basic level.** Create a C# console program with EF Core for equipment rental in which a "Deposit" property is added to the "Equipment" entity by a new migration with a default value of 0, and the program asks for a category and a percentage and changes the prices of all items in the category with a single `ExecuteUpdateAsync` call, printing the number of records changed.

**3. Advanced level.** Create a C# "Rental" console application with EF Core and PostgreSQL (the "Equipment": name, price per day; "Rental": customer, rental and return dates entities) with the commands `rent`, `return`, and `debtors`: renting checks that the item is free (a concurrency conflict detected through the `xmin` token is reported), returning calculates the cost by days with a penalty for being late, and `debtors` prints a table of debtors with amounts; `--help`, exit codes.

### Variant 3. Recipes and ingredients {#v3}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL in which recipes and ingredients are related N:M without a junction entity; the program adds three recipes and prints each recipe with a list of ingredients (`Include`).

**2. Basic level.** Create a C# console program with EF Core in which the "recipe – ingredient" relationship has a junction entity with a quantity and a unit of measure; the program asks for a recipe name and the number of servings and prints the recalculated list of ingredients.

**3. Advanced level.** Create a C# "Cookbook" console application with EF Core and PostgreSQL (recipes and ingredients, an N:M relationship) that takes a list of available products (arguments or a file) and prints the recipes that are missing no more than N ingredients (`--missing N`), with a list of the missing ones; the query filters the data in the database, and the SQL is checked through `LogTo`; `--help`, exit codes.

### Variant 4. Project tracking {#v4}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Project" and "Task" (name, status, estimate in hours) entities; the program adds a project with tasks and prints the project's tasks sorted by status.

**2. Basic level.** Create a C# console program with EF Core for the "project – task – assignee – time entry" model that asks for a month and year and prints a table of each assignee's hours by project (`GroupBy` in the database) with totals.

**3. Advanced level.** Create a "Projects" Windows Forms application with EF Core, PostgreSQL, and `IDbContextFactory<T>` (the "Project", "Task" with a status and assignee, and "Time entry" entities): a list of projects, a table of the selected project's tasks with a filter by status and assignee, adding a time entry with validation (from 0.25 to 12 h per day), and a report of hours for a period with export to CSV.

### Variant 5. Medical laboratory {#v5}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Patient", "Test" (name, normal range from and to), and "Result" (value, date) entities; the program adds results and prints a patient's results marked "out of range".

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL (the "Patient", "Test" with a normal range, and "Result" with a value and date entities) that asks for a patient number, a page number, and a page size (from 5 to 50) and prints the history of their tests in pages (`Skip`/`Take`, sorting by date), the page number, and the total number of pages.

**3. Advanced level.** Create a C# "Laboratory" console application with EF Core and PostgreSQL (the "Patient", "Test" with a normal range from and to, and "Result" with a value and date entities) with the commands `add-result`, `history <patient> [--page N]`, and `alerts [--days N]`: `alerts` prints the out-of-range results for the last N days with the deviation in percent, the data is read without tracking, and the model has indexes on the date and patient; `--help`, exit codes.

### Variant 6. Bookstore {#v6}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL in which books are related to publishers (1:N) and authors (N:M); the program adds data and prints the books with the publisher name and authors.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL for a bookstore (books with a price, related to authors N:M) that asks for part of an author's surname and a price range (the minimum is not greater than the maximum) and prints the books found with a DTO projection sorted by price; an empty result is reported.

**3. Advanced level.** Create a C# "Bookstore" console application with EF Core and PostgreSQL (books with a price and stock, orders with lines) in which an order of several books is placed in a transaction that decreases stock, a conflict between simultaneous orders is detected with the `xmin` token and retried up to three times, and the `report <year>` command prints sales by month; `--help`, exit codes.

### Variant 7. Sports competition {#v7}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Stage", "Participant", and "Result" (time in seconds) entities; the program adds results and prints the stage results sheet sorted by time.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL (the "Stage", "Participant", and "Result" with a time entities) that calculates the overall ranking of participants by the sum of points for the stages (points per place are defined in the program) with a grouping projection and prints a table with the place, surname, and total.

**3. Advanced level.** Create a C# "Competition" console application with EF Core and PostgreSQL (the "Stage", "Participant", and "Result" with a time and points entities) with the commands `import <file.csv>` (stage results in a transaction with a duplicate check), `stage <number>`, and `standings [--top N]`; participants with the same total get the same place; `--help`, errors to the error stream, exit codes.

### Variant 8. Rental apartments {#v8}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Owner", "Apartment" (address, area, price), and "Lease" (tenant, start and end dates) entities; the program adds data and prints the apartments with the number of leases.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL (the "Apartment" and "Lease" with a tenant and start and end dates entities) that asks for an apartment and a lease period (the end date is later than the start date), checks with a query whether it overlaps existing leases, and either creates a lease or prints the conflicting lease.

**3. Advanced level.** Create a "Rentals" Windows Forms application with EF Core, PostgreSQL, and `IDbContextFactory<T>` (the "Owner", "Apartment": address, area, price; and "Lease" with dates entities): searching for free apartments for a period by price and area, signing a lease in a transaction with a repeated date overlap check, a table of an owner's leases, and an annual income report.

### Variant 9. Café {#v9}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Menu item" (name, price) and "Order" with order lines (quantity) entities; the program places two orders and prints their totals.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL for a café (menu items with a price, orders with a date and lines with a quantity) that asks for a date and prints the 5 most popular items for the 7 days before it (quantity and revenue, grouping in the database) and the week's total revenue.

**3. Advanced level.** Create a C# "Café" console application with EF Core and PostgreSQL (menu items with a price, orders with lines) with the commands `order <item:quantity>…`, `menu --set-price <item> <price>`, and `report --week <date>`: price changes are performed with `ExecuteUpdateAsync`, old orders keep the sale price, and the report prints a table by day with totals; `--help`, exit codes.

### Variant 10. Habit tracker {#v10}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Habit" and "Check-in" (a date, unique per habit) entities; the program adds a habit, checks in several days, and prints the checked-in dates.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL (the "Habit" and "Check-in" with a date entities) that, for each habit, prints the number of check-ins in the current month and the longest streak of consecutive days (the dates are read with a no-tracking query, and the streak is calculated in the program).

**3. Advanced level.** Create a C# "Habits" console application with EF Core and PostgreSQL (the "Habit" and "Check-in" with a date entities) with the commands `add`, `check <habit> [date]`, and `stats [--month yyyy-mm]`: a repeated check-in for a day is rejected by a unique index with a message, and the statistics print the current and longest streaks and a text calendar of the month; `--help`, exit codes.

### Variant 11. Car service {#v11}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Car" (plate number, make), "Repair" (date), and "Job" (name, cost) entities; the program adds a repair with jobs and prints a car's repair history.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL for a car service (cars, repairs with jobs and their cost) in which spare parts with a price are related to repairs through a junction entity with a quantity; the program asks for a repair number and prints an invoice: jobs, parts, amounts, and the total.

**3. Advanced level.** Create a C# "Car service" console application with EF Core and PostgreSQL (cars, repairs with a status and mechanic, jobs, spare parts in stock) in which closing a repair in one transaction deducts the parts from stock (a shortage cancels the operation), creates an invoice, and changes the status, and the `report --month yyyy-mm` command prints the revenue by mechanic; `--help`, exit codes.

### Variant 12. School olympiad {#v12}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Student", "Problem" (maximum score), and "Solution" (score) entities; the program adds solutions and prints the total score of each student.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL (the "Student", "Problem" with a maximum score, and "Solution" with a score entities) that asks for a problem number and a new maximum score and proportionally recalculates the scores of all solutions to that problem with a single `ExecuteUpdateAsync` call, printing the number of records changed and the new ranking.

**3. Advanced level.** Create a C# "Olympiad" console application with EF Core and PostgreSQL (the "Student" with a grade level, "Problem" with a maximum score, and "Solution" with a score entities) that imports scores from CSV in a transaction (a score greater than the maximum cancels the import), prints a ranking by grade level with the winners and prize winners (the top 10% and 25%), and saves the results sheet to a file; `--help`, exit codes.

### Variant 13. Museum {#v13}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Hall" and "Exhibit" (name, era, year) entities; the program adds exhibits and prints the exhibits of each hall.

**2. Basic level.** Create a C# console program with EF Core in which exhibitions are related to exhibits by an N:M relationship; the program asks for an era and prints the exhibitions that contain exhibits of that era, with the number of such exhibits.

**3. Advanced level.** Create a "Museum" Windows Forms application with EF Core, PostgreSQL, and `IDbContextFactory<T>` (exhibits with an era, exhibitions with a period, an N:M relationship): searching for exhibits by name (`ILIKE`) and era with pagination, editing an exhibition (adding and removing exhibits through a list), and a check that an exhibit does not take part in two exhibitions in the same period.

### Variant 14. Taxi service {#v14}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Driver" and "Ride" (distance, cost, rating from 1 to 5) entities; the program adds rides and prints a driver's rides.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL (drivers, rides with a cost and a rating of 1–5) in which the pickup and drop-off addresses of a ride are modeled with an "Address" complex type (city, street, building); the program asks for a street and prints the rides from it and the drivers' average rating.

**3. Advanced level.** Create a C# "Taxi" console application with EF Core and PostgreSQL (drivers with an active flag, rides with a distance, cost, and rating) with the commands `ride`, `rate <ride> <rating>`, and `drivers [--min-rating X]`: the rating is calculated in the database, and drivers with a rating below the threshold are marked as inactive with a bulk update; `--help`, errors to the error stream, exit codes.

### Variant 15. Subscription tracking {#v15}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Service", "Plan" (monthly price), and "Subscription" (start and end dates) entities; the program adds subscriptions and prints the subscriptions active on the current date.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL (the "Service", "Plan" with a monthly price, and "Subscription" with start and end dates entities) that asks for a subscription number and a number of months (from 1 to 24), renews the subscription, saves the change, and prints the new end date and the cost of the renewal.

**3. Advanced level.** Create a C# "Subscriptions" console application with EF Core and PostgreSQL (the "Service", "Plan" with a monthly price, and "Subscription" with dates and an active flag entities) with the commands `renew`, `expiring --days N`, and `income <year>`: `income` prints the income by month and service (grouping in the database), and expired subscriptions are deactivated with `ExecuteUpdateAsync`; `--help`, exit codes.

### Variant 16. Gardening {#v16}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Plot" and "Plant" entities; plant species (name, watering interval in days) are specified as `HasData` seed data in the migration, and the program prints the plants of each plot.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL (plots, plants with a species, a species with a watering interval in days) in which a watering log is related to plants; the program asks for a date and prints the plants that need watering (the last watering date plus the interval is no later than the given date).

**3. Advanced level.** Create a C# "Garden" console application with EF Core and PostgreSQL (plots, plants, species with a watering interval, a watering log) with the commands `water <plant|plot>`, `due [date]`, and `history <plant> [--page N]`: watering a whole plot is recorded in one transaction, plant species are added by a migration with `HasData`, and `due` groups the plants that need watering by plot; `--help`, exit codes.

### Variant 17. Esports tournament {#v17}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Team", "Player", and "Match" (two teams, a score) entities; the program adds matches and prints the team rosters and match results.

**2. Basic level.** Create a C# console program with EF Core in which a match has two relationships with a team (home and away) configured through the Fluent API; the program prints the league table (wins, losses, points) calculated by a query.

**3. Advanced level.** Create a C# "Tournament" console application with EF Core and PostgreSQL (teams, matches with a round, two teams, and a score) that builds a single-elimination bracket for 8 teams, records a match result and creates the next-round match in one transaction, and prints the bracket as a text diagram; a draw and a repeated result entry are rejected; `--help`, exit codes.

### Variant 18. Translation agency {#v18}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL in which translators and languages are related N:M; the program adds translators and prints a list of translators for each language.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL for a translation agency (translators and languages N:M, orders with languages, pages, and a status) that asks for the source language, the target language, and the number of pages and assigns the order to the translator with these languages who has the fewest unfinished pages; if there is no such translator, a message is printed.

**3. Advanced level.** Create a "Translation agency" Windows Forms application with EF Core, PostgreSQL, and `IDbContextFactory<T>` (translators and languages N:M, orders with languages, pages, a status, and a translator): a list of orders with a filter by status and languages, changing the status with a check of allowed transitions, a monthly translator workload report, and handling a conflict of simultaneous order editing.

### Variant 19. Laboratory equipment {#v19}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Room" and "Equipment" (a unique inventory number) entities; the program adds equipment and prints it by room.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL (rooms, equipment with a unique inventory number, a movement log) that asks for an inventory number and a new room, moves the equipment and records the event in the movement log in one transaction, and prints the movement history of that equipment.

**3. Advanced level.** Create a C# "Inventory" console application with EF Core and PostgreSQL (rooms, equipment with an inventory number, a movement log) with the commands `move`, `history`, and `audit <file.csv>`: `audit` compares the actual list of a room's equipment with the database and prints what is missing and what is extra; before saving, the changes are printed from `ChangeTracker` for confirmation; `--help`, exit codes.

### Variant 20. Online courses {#v20}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Course", "Module", and "Lesson" entities with sequence numbers; the program adds a course and prints its structure (`Include` and `ThenInclude`).

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL (courses, modules, lessons, student enrollments in courses) in which a student's progress is stored as a "student – lesson – completion date" entity; the program asks for a student and prints the completion percentage of each course they are enrolled in.

**3. Advanced level.** Create a C# "Courses" console application with EF Core and PostgreSQL (courses, modules, lessons with sequence numbers, student enrollments, and completed lessons) with the commands `enroll`, `complete <lesson>`, and `report <course>`: a lesson can be completed only after the previous ones, the report prints the distribution of students by completion percentage, and the queries are checked for the absence of N+1 through `LogTo`; `--help`, exit codes.

### Variant 21. Charitable foundation {#v21}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Fundraiser" (goal, amount) and "Donation" (donor, amount, date) entities; the program adds donations and prints the amount raised and the completion percentage of each fundraiser.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL (the "Fundraiser" and "Donation": donor, amount, date entities) that asks for a year and prints the 10 largest donors (the amount and number of donations, grouping in the database) and the total amount of donations for the year.

**3. Advanced level.** Create a C# "Foundation" console application with EF Core and PostgreSQL (the "Fundraiser": goal, amount, state; "Donation": donor, amount, date entities) with the commands `donate`, `close <fundraiser>`, and `report --from date --to date`: closing a fundraiser transfers the surplus to another fundraiser in a transaction, and the report prints a table of fundraisers with totals and is saved to CSV; `--help`, exit codes.

### Variant 22. Apiary {#v22}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Hive" (number, bee breed) and "Inspection" (date, colony strength from 1 to 10, note) entities; the program adds inspections and prints the latest inspection of each hive.

**2. Basic level.** Create a C# console program with EF Core in which a honey harvest (date, kilograms) is related to a hive; the program prints the honey harvest by season (year) for each hive and the average harvest per hive.

**3. Advanced level.** Create a C# "Apiary" console application with EF Core and PostgreSQL (hives, inspections with a date and a colony strength of 1–10, honey harvests with a date and kilograms) with the commands `inspect`, `harvest`, and `report <year>`: hives with weak colony strength in the last two inspections are printed as problematic, and the report compares the harvest with the previous year in percent; `--help`, exit codes.

### Variant 23. Theater costume department {#v23}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Costume" (name, size) and "Performance" entities; an N:M relationship shows which performances a costume is used in; the program prints the costumes of a performance.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL for a theater costume department (costumes with a name and size, costume bookings for a period) that asks for a costume and a booking period and checks with a query whether it overlaps other bookings of that costume; the booking is created, or the conflicting one is printed.

**3. Advanced level.** Create a "Costume department" Windows Forms application with EF Core, PostgreSQL, and `IDbContextFactory<T>` (costumes with a name and size, performances, costume bookings for a period): searching for costumes by name and size, booking a set of costumes for a performance in one transaction (a conflict for any costume cancels everything), and a booking calendar of the selected costume.

### Variant 24. Bus routes {#v24}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL in which a route contains ordered stops through a junction entity with a sequence number; the program prints the route's stops in order.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL in which a route contains ordered stops through a junction entity with a sequence number; the program asks for two stops and prints the routes on which the second stop comes after the first, with the number of segments between them.

**3. Advanced level.** Create a C# "Routes" console application with EF Core and PostgreSQL (routes with ordered stops, a timetable) with the commands `route`, `timetable <route>`, and `find <from> <to> [--after HH:mm]`: the timetable stores the departure time from the terminus and the duration of the segments, and the search prints the nearest trips with no more than one transfer; `--help`, exit codes.

### Variant 25. Photo studio {#v25}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Client" and "Photo session" (date, start time, duration) entities; the program adds photo sessions and prints the schedule for a given date.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL for a photo studio (clients, photo sessions with a date, start time, and duration) in which photo sessions are related to equipment by an N:M relationship; the program asks for a date, time, and duration and checks that the studio and equipment are free before creating a photo session.

**3. Advanced level.** Create a "Photo studio" Windows Forms application with EF Core, PostgreSQL, and `IDbContextFactory<T>` (clients, photo sessions with a date, time, and duration, equipment N:M): a weekly schedule in a `DataGridView`, creating and rescheduling photo sessions with an overlap check in a transaction, and a monthly equipment utilization report.

### Variant 26. Loan tracking {#v26}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Borrower", "Loan" (amount, rate, term), and "Payment" entities; the program adds payments and prints the outstanding balance of each loan.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL (borrowers, loans with an amount, rate, term, and overdue flag, payments with a date) that marks as overdue all loans without a payment for more than 30 days with a single `ExecuteUpdateAsync` call and prints their list with the number of days overdue.

**3. Advanced level.** Create a C# "Loans" console application with EF Core and PostgreSQL (borrowers, loans with an amount, rate, and term, payments with a date and a split into interest and principal) with the commands `pay`, `schedule <loan>`, and `overdue --date date`: the annuity payment schedule is calculated in the program, a payment is allocated in a transaction, and the report prints overdue amounts with penalties; `--help`, exit codes.

### Variant 27. School cafeteria {#v27}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Dish" and "Allergen" entities related N:M; the program adds dishes and prints the dishes without a given allergen.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL for a school cafeteria (dishes with a price, a weekly menu with dishes by day, class orders) that asks for a class, a day, and the number of students and places the order for the day, printing the number of servings of each dish and the cost.

**3. Advanced level.** Create a C# "Cafeteria" console application with EF Core and PostgreSQL (dishes and allergens N:M, a weekly menu, classes with students' allergens, orders) with the commands `menu <week>`, `order <class> <day>`, and `report <week>`: an order excludes dishes with the allergens of the class's students, and the report prints servings by day and class with totals; `--help`, exit codes.

### Variant 28. Mobile operator {#v28}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Plan" (monthly fee, price per minute), "Subscriber", and "Call" (duration in seconds, date) entities; the program adds calls and prints a subscriber's calls.

**2. Basic level.** Create a C# console program with EF Core and PostgreSQL (plans with a monthly fee and price per minute, subscribers, calls with a duration in seconds and a date) that asks for a subscriber number, a month, and a year and prints a bill: the monthly fee, the number of calls, the minutes (rounded up), and the amount due.

**3. Advanced level.** Create a C# "Operator" console application with EF Core and PostgreSQL (plans, subscribers, calls with a duration and date) with the commands `import-calls <file.csv>`, `bill <number> <yyyy-mm>`, and `top --month yyyy-mm`: importing thousands of calls is performed in batches with tracking cleared after saving, and `top` prints the subscribers with the largest bills; `--help`, exit codes.

### Variant 29. Film festival {#v29}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Film", "Category", and "Jury member" entities; the program adds films to categories and prints the films of each category.

**2. Basic level.** Create a C# console program with EF Core in which a rating (from 1 to 10) links a jury member to a film, and a repeated rating is forbidden by a unique index; the program prints the average ratings of the films in a category.

**3. Advanced level.** Create a C# "Festival" console application with EF Core and PostgreSQL (films, categories, jury members, ratings of 1–10 with a unique "jury member – film" pair) with the commands `rate`, `results <category>`, and `winners`: the winner of a category is determined by the average score and, in case of a tie, by the number of 10 ratings; results are saved in a transaction, and rejected duplicates are reported; `--help`, exit codes.

### Variant 30. Animal shelter {#v30}

**1. Initial level.** Create a C# console program with EF Core and PostgreSQL with the "Animal" (name, species, arrival date) and "Guardian" entities; the program adds animals and prints the animals that do not have a guardian yet.

**2. Basic level.** Create a C# console program with EF Core for a shelter in which the schema is changed by migrations: the second migration adds a weight and a vaccination date to the animal, and the third adds an "Adoption" entity; the program prints the list of applied migrations (`GetAppliedMigrationsAsync`) and the unvaccinated animals.

**3. Advanced level.** Create a C# "Shelter" console application with EF Core and PostgreSQL (animals with a name, species, and status, guardians, adoptions with a date) with the commands `adopt <animal> <guardian>`, `return <animal>`, and `stats <year>`: an adoption in a transaction changes the animal's status and creates an adoption record, a repeated adoption is rejected, and the statistics print adoptions by month and species; `--help`, exit codes.

## Procedure

1. Study the theory and worked examples.
2. Create a separate PostgreSQL database for your variant, a .NET 10 project with the EF Core packages, and the connection string in user secrets.
3. Describe the entities, relationships, and constraints (conventions, annotations, the Fluent API), create a migration, review its code, and apply it with the `dotnet ef database update` command.
4. Implement data operations: adding, changing, deleting, and queries with filtering, projections, grouping, and pagination; enable `LogTo` and check the generated SQL (no N+1 queries).
5. Handle errors: an unavailable server, constraint violations (`DbUpdateException`), concurrency conflicts; use a transaction for changes to several tables.
6. Demonstrate the program to your instructor, show the migrations and tables in DataGrip, explain the code, and answer the review questions.
