---
title: "Tasks"
description: "Topic 7. SQL and ADO.NET: task variants"
outline: [2, 3]
sourceHash: "05ab89e48774c21c98e07c37bab0e11f54126e78b99304d0136f9a98b21a10aa"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Online store {#v1}

**1. Initial level.** Create an SQL script for PostgreSQL that creates the `customers`, `products`, `orders`, and `order_items` tables with primary and foreign keys and `CHECK` constraints (price and quantity are positive), fills them with test data, and outputs the orders with the customer's name and the total.

**2. Basic level.** Create a C# console program with Npgsql for the online store's PostgreSQL database (the `customers`, `products`, `orders`, `order_items` tables) that asks for a customer's email, validates its format, and prints a table of their orders (number, date, number of items, total) with a parameterized query; if the customer is not found, a message is printed.

**3. Advanced level.** Create a C# "Store" console application for a PostgreSQL database (the `customers`, `products` with stock, `orders`, `order_items` tables) with the commands `order <email> <productId:qty>…` and `report <year>`: an order is placed in a transaction that decreases stock (a shortage of any product cancels the whole order), and the report prints sales by month with a total; `--help`, error messages to the error stream, and exit codes.

### Variant 2. Outpatient clinic {#v2}

**1. Initial level.** Create an SQL script that creates the `doctors`, `patients`, and `appointments` tables (doctor, patient, appointment date and time, uniqueness of the "doctor – time" pair), fills them, and outputs a doctor's appointment schedule for a given date with the patients' names.

**2. Basic level.** Create a C# console program for the clinic's PostgreSQL database (the `doctors`, `patients`, `appointments` tables with the appointment date and time) that prints a list of doctors, asks for a doctor's number and a date (with format validation), and shows the free 30-minute slots from 9:00 to 15:00; the occupied slots are read from the `appointments` table.

**3. Advanced level.** Create a "Reception desk" Windows Forms application for the clinic's PostgreSQL database (the `doctors`, `patients`, `appointments` tables with a unique "doctor – time" pair), in which the doctor is selected in a `ComboBox`, the date in a `DateTimePicker`, and appointments are shown in a `DataGridView`; booking a patient checks whether the time is taken in a transaction (a uniqueness violation is shown in a message), and a report prints the number of appointments of each doctor for a month.

### Variant 3. Car dealership {#v3}

**1. Initial level.** Create an SQL script with the `brands`, `cars` (model, year, price, mileage), and `sales` tables, constraints on the year and price, test data, and queries: cars cheaper than 500,000 UAH, the number of cars of each brand, unsold cars.

**2. Basic level.** Create a C# console program for the car dealership's PostgreSQL database (the `brands`, `cars` tables: model, year, price, mileage) that searches for cars by brand (part of the name, case-insensitively), a range of years, and a maximum price, entered from the keyboard with validation, and prints the result as a sorted table using a parameterized query.

**3. Advanced level.** Create a C# "Car dealership" console application for a PostgreSQL database (the `brands`, `cars`, `sales` tables) with the commands `add`, `find`, `sell <carId> <client>`, and `stats`: a sale is made in a transaction (a car cannot be sold twice), and the statistics print the number and amount of sales by brand with a total; `--help` and exit codes.

### Variant 4. Movie theater {#v4}

**1. Initial level.** Create an SQL script with the `halls`, `movies`, `sessions`, and `tickets` tables (a unique "session – seat" pair), fill them, and output the sessions on a given date with the movie title and the number of tickets sold.

**2. Basic level.** Create a C# console program for the movie theater's PostgreSQL database (the `halls`, `movies`, `sessions`, `tickets` tables with seats) that prints the sessions of a movie whose title is entered from the keyboard and, for the selected session, shows the hall layout, in which occupied seats are marked with `X` and free ones with the seat number.

**3. Advanced level.** Create a "Movie theater box office" Windows Forms application for a PostgreSQL database (the `halls`, `movies`, `sessions`, `tickets` tables with a unique "session – seat" pair): session selection, a hall layout made of buttons, selling several seats in one transaction (if at least one seat is already sold, the sale is canceled with a message), and a revenue report by movie for a period.

### Variant 5. University timetable {#v5}

**1. Initial level.** Create an SQL script with the `teachers`, `rooms`, `groups`, and `lessons` tables (day of the week, class period number, room, group, teacher), fill them, and output a group's weekly timetable ordered by day and period.

**2. Basic level.** Create a C# console program for the timetable's PostgreSQL database (the `teachers`, `rooms`, `groups`, `lessons` tables: day of the week, period number, room, group, teacher) that prints the timetable of a teacher whose surname is entered from the keyboard, as well as a list of free rooms for a given day and period number (the values are validated).

**3. Advanced level.** Create a C# "Timetable" console application for a PostgreSQL database (the `teachers`, `rooms`, `groups`, `lessons` tables: day, period, room, group, teacher) with the commands `add`, `teacher <name>`, `group <name>`, and `conflicts`: before a class is added, clashes of the room, group, and teacher are checked, and the `conflicts` command finds all clashes with a single SQL query that self-joins the `lessons` table; `--help`, exit codes.

### Variant 6. Hotel {#v6}

**1. Initial level.** Create an SQL script with the `rooms` (number, type, price per night), `guests`, and `bookings` (check-in and check-out dates, a `CHECK` constraint) tables, fill them, and output bookings with the guest's name and the cost of the stay.

**2. Basic level.** Create a C# console program for the hotel's PostgreSQL database (the `rooms`: number, type, price per night; `guests`; `bookings` with check-in and check-out dates tables) that, for entered check-in and check-out dates (with validation), prints the free rooms, that is, rooms without bookings that overlap this period.

**3. Advanced level.** Create a "Hotel" Windows Forms application for a PostgreSQL database (the `rooms`: number, type, price; `guests`; `bookings` with check-in and check-out dates tables): searching for free rooms by dates and type, booking in a transaction with a repeated overlap check, canceling a booking, and a room occupancy report in percent for a selected month.

### Variant 7. Department library {#v7}

**1. Initial level.** Create an SQL script with the `books`, `readers`, and `loans` (loan date, due date, return date) tables, fill them, and output the books currently on loan with the reader's name and the number of days overdue.

**2. Basic level.** Create a C# console program for the library's PostgreSQL database (the `books`, `readers` with email, `loans` with loan and return dates tables) that asks for a reader's email and prints their loan history, as well as a ranking of the ten most active readers by the number of loans in the current year.

**3. Advanced level.** Create a C# "Library" console application for a PostgreSQL database (the `books` with the number of copies, `readers`, `loans` with loan, due, and return dates tables) with the commands `issue <bookId> <email>`, `return <loanId>`, `overdue`, and `top <n>`: issuing is performed in a transaction that decreases the number of copies, and returning increases it; errors to the error stream, exit codes.

### Variant 8. Flights {#v8}

**1. Initial level.** Create an SQL script with the `airports`, `flights` (from, to, departure, arrival, number of seats), and `tickets` tables, fill them, and output the flights between two airports on a given date with the number of free seats.

**2. Basic level.** Create a C# console program for the flights' PostgreSQL database (the `airports`, `flights`: from, to, departure, arrival, number of seats; `tickets` tables) that, for airport codes and a date entered from the keyboard with validation, prints direct flights, as well as flights with one connection (from 1 to 6 hours between the arrival and the next departure) using a single query with `JOIN`.

**3. Advanced level.** Create an "Air tickets" Windows Forms application for a PostgreSQL database (the `airports`, `flights` with the number of seats, `tickets` tables): flight search, selling a ticket to a passenger in a transaction with a free-seat check, returning a ticket, the flight's passenger list in a `DataGridView`, and saving the list to a CSV file.

### Variant 9. Sports league {#v9}

**1. Initial level.** Create an SQL script with the `teams` and `matches` (home team, away team, goals, date; a team does not play itself) tables, fill them, and output match results with team names.

**2. Basic level.** Create a C# console program for the sports league's PostgreSQL database (the `teams`, `matches` tables: home team, away team, goals, date) that prints the league table (games, wins, draws, losses, goals, points) calculated with a single SQL query and lets you add, rename, or delete a team with input validation.

**3. Advanced level.** Create a C# "League" console application for a PostgreSQL database (the `teams`, `matches` tables: round, home team, away team, goals, date) with the commands `teams`, `add-team`, `match <home> <away> <score>` (the score `2:1`), and `table [--round N]`: the league table as of a given round; deleting a team with matches is forbidden; `--help`, exit codes.

### Variant 10. Company motor pool {#v10}

**1. Initial level.** Create an SQL script with the `drivers`, `vehicles`, and `trips` (date, mileage, fuel used) tables, fill them, and output the total mileage and fuel consumption of each vehicle.

**2. Basic level.** Create a C# console program for the motor pool's PostgreSQL database (the `drivers`, `vehicles` with a consumption norm, `trips`: date, mileage, fuel used tables) that, for a vehicle number and a month entered from the keyboard, prints the trips and the average fuel consumption per 100 km, marking trips with consumption above the vehicle's norm.

**3. Advanced level.** Create a "Motor pool" Windows Forms application for a PostgreSQL database (the `drivers`, `vehicles`, `trips` tables: driver, vehicle, date, mileage, fuel): driver and vehicle directories in a `DataGridView`, registering a trip with a check that the driver and vehicle are free on that date, and a monthly report by driver with totals and saving to CSV.

### Variant 11. Restaurant {#v11}

**1. Initial level.** Create an SQL script with the `dishes`, `tables`, `orders`, and `order_items` tables, fill them, and output the five most popular dishes by the number of servings.

**2. Basic level.** Create a C# console program for the restaurant's PostgreSQL database (the `dishes` with category and price, `tables`, `orders`, `order_items` tables) that prints the menu by category, accepts a table number and order items in the `number×quantity` format with validation, and saves the order with its items in a transaction.

**3. Advanced level.** Create a "Restaurant" Windows Forms application for a PostgreSQL database (the `dishes`, `tables`, `orders`, `order_items` tables): open orders of tables, adding dishes, closing the bill with a discount in a transaction, and a report of revenue and popular dishes for a selected period.

### Variant 12. Veterinary clinic {#v12}

**1. Initial level.** Create an SQL script with the `owners`, `pets`, and `visits` (date, diagnosis, cost) tables, fill them, and output the visit history of an owner's pets with the total cost.

**2. Basic level.** Create a C# console program for the vet clinic's PostgreSQL database (the `owners`, `pets`, `visits` tables: date, diagnosis, cost) that searches for an owner by part of the surname or phone number, prints their pets, and lets you add a visit for a selected pet with date and cost validation.

**3. Advanced level.** Create a C# "Vet clinic" console application for a PostgreSQL database (the `owners`, `pets` with the animal species, `visits`: date, diagnosis, cost tables) with the commands `owner`, `pet`, `visit`, and `report <from> <to>`: the report shows the number of visits and revenue by animal species, and deleting an owner with pets is forbidden; `--help`, exit codes.

### Variant 13. Fitness center {#v13}

**1. Initial level.** Create an SQL script with the `clients`, `memberships` (type, start and end dates), and `attendances` tables, fill them, and output the clients whose membership expires within seven days.

**2. Basic level.** Create a C# console program for the fitness center's PostgreSQL database (the `clients` with a phone number, `memberships` with start and end dates, `attendances` tables) that, by a client's phone number, checks that the membership is valid and registers a visit (one per day), printing the number of visits this month.

**3. Advanced level.** Create a "Fitness center" Windows Forms application for a PostgreSQL database (the `clients`, `memberships` with dates, `attendances`, `payments` tables): a list of clients with search, renewing a membership in a transaction (a new membership record and a payment), visit statistics by day of the week, and saving a report to CSV.

### Variant 14. Warehouse {#v14}

**1. Initial level.** Create an SQL script with the `goods`, `receipts`, and `shipments` tables, fill them, and output the stock of each product as the difference between the sums of receipts and shipments.

**2. Basic level.** Create a C# console program for the warehouse's PostgreSQL database (the `goods`, `receipts`, `shipments` tables; the stock is the difference between receipts and shipments) that records a receipt or a shipment of a product (the product code and quantity are entered with validation) and does not allow shipping more than is in stock.

**3. Advanced level.** Create a C# "Warehouse" console application for a PostgreSQL database (the `goods` with a price, `receipts`, `shipments` tables) with the commands `in`, `out`, `stock`, and `deficit <min>`: product movements are performed in a transaction, and the deficit report prints the products whose stock is below the minimum with the total purchase cost; `--help`, exit codes.

### Variant 15. Travel agency {#v15}

**1. Initial level.** Create an SQL script with the `tours` (country, dates, number of places, price), `clients`, and `bookings` tables, fill them, and output the tours with the number of free places.

**2. Basic level.** Create a C# console program for the travel agency's PostgreSQL database (the `tours`: country, dates, number of places, price; `clients`; `bookings` tables) that searches for tours by country and maximum price and books a selected tour for a client for a given number of people with a free-place check.

**3. Advanced level.** Create a "Travel agency" Windows Forms application for a PostgreSQL database (the `tours` with places and price, `clients`, `bookings`, `payments` tables): a tour catalog with filters, selling a tour in a transaction (a repeated place check, recording the booking and the payment), cancellation, and a sales report by country.

### Variant 16. Music platform {#v16}

**1. Initial level.** Create an SQL script with the `artists`, `albums`, `tracks`, `playlists`, and `playlist_tracks` (an N:M relationship with a sequence number) tables, fill them, and output a playlist with track titles, artists, and the total duration.

**2. Basic level.** Create a C# console program for the music platform's PostgreSQL database (the `artists`, `albums`, `tracks`, `playlists`, `playlist_tracks` with a sequence number tables) that searches for tracks by part of the title or artist and adds the selected track to the end of a playlist (without duplicates), printing the updated playlist.

**3. Advanced level.** Create a C# "Playlists" console application for a PostgreSQL database (the `artists`, `tracks`, `playlists`, `playlist_tracks` with a sequence number tables) with the commands `create`, `add`, `move <from> <to>` (changing the order of tracks in a transaction), `show`, and `top`: `top` prints the artists whose tracks appear most often in playlists; `--help`, exit codes.

### Variant 17. Repair tracking {#v17}

**1. Initial level.** Create an SQL script with the `masters` and `requests` (device, description, a status from a `CHECK` list, creation and completion dates) tables, fill them, and output the requests of each status.

**2. Basic level.** Create a C# console program for the service center's PostgreSQL database (the `masters`, `requests` tables: device, description, status, technician, creation and completion dates) that changes a request's status by number (the allowed transitions are checked) and prints the average completion time of each technician's requests in hours.

**3. Advanced level.** Create a "Repairs" Windows Forms application for a PostgreSQL database (the `masters`, `requests` with a status, `request_history` tables): a list of requests with a status filter, assigning a technician, changing the status with a record in the history table in one transaction, and a technician workload report.

### Variant 18. Art school {#v18}

**1. Initial level.** Create an SQL script with the `studios`, `students`, `enrollments`, and `payments` tables, fill them, and output the studios with the number of students and free places.

**2. Basic level.** Create a C# console program for the art school's PostgreSQL database (the `studios` with age limits, number of places, and monthly fee, `students`, `enrollments` tables) that enrolls a student in a studio (age and the number of places are checked) and prints the list of the student's studios with the monthly fee.

**3. Advanced level.** Create a C# "Art school" console application for a PostgreSQL database (the `studios` with a monthly fee, `students`, `enrollments`, `payments` tables) with the commands `enroll`, `pay`, `debts <month>`, and `report`: enrollment and the first payment are performed in a transaction, and `debts` prints the students without a payment for the month; `--help`, exit codes.

### Variant 19. Courier service {#v19}

**1. Initial level.** Create an SQL script with the `parcels`, `couriers`, and `status_history` (status, time, city) tables, fill them, and output the current status of each parcel.

**2. Basic level.** Create a C# console program for the courier service's PostgreSQL database (the `parcels`, `couriers`, `status_history` tables: status, time, city) that, by a parcel number, prints its status history and lets you add a new status (the allowed transitions are checked).

**3. Advanced level.** Create a "Courier" Windows Forms application for a PostgreSQL database (the `parcels`, `couriers`, `status_history` tables: status, time, city): parcel search, assigning a courier, changing the status with a history record in a transaction, a courier's parcel list for the day, and a report of the average delivery time by city.

### Variant 20. Car rental {#v20}

**1. Initial level.** Create an SQL script with the `cars`, `customers`, and `rentals` (dates, planned and actual mileage, penalty) tables, fill them, and output the cars that are currently rented.

**2. Basic level.** Create a C# console program for the car rental's PostgreSQL database (the `cars` with a daily price, `customers`, `rentals` with rental dates tables) that books a car for entered dates (checking for overlaps with other rentals) and prints the rental cost.

**3. Advanced level.** Create a C# "Rental" console application for a PostgreSQL database (the `cars`, `customers`, `rentals`: dates, planned and actual mileage, penalty; `payments` tables) with the commands `rent`, `return <id> <km> <date>`, and `report`: a return in a transaction calculates the penalty for being late and for excess mileage, updates the car's status, and records a payment; `--help`, exit codes.

### Variant 21. Bank {#v21}

**1. Initial level.** Create an SQL script with the `clients`, `accounts` (a `numeric` balance, a `CHECK` for a nonnegative balance), and `transfers` tables, fill them, and output the total balance of each client.

**2. Basic level.** Create a C# console program for the bank's PostgreSQL database (the `clients`, `accounts` with a balance and a `CHECK` for a nonnegative balance, `transfers` tables) that transfers an entered amount between two accounts in one transaction (debit, credit, a record in `transfers`) and prints the new balances.

**3. Advanced level.** Create a C# "Bank" console application for a PostgreSQL database (the `clients`, `accounts` with a balance, `transfers` tables) with the commands `open`, `deposit`, `transfer`, and `statement <account> <from> <to>`: a transfer is performed in a transaction with the `Serializable` isolation level and retried on a serialization error, and the statement shows the movement of funds with totals; `--help`, exit codes.

### Variant 22. Scientific conference {#v22}

**1. Initial level.** Create an SQL script with the `sections`, `authors`, `papers`, `paper_authors` (N:M), and `reviews` (score 1–5) tables, fill them, and output the papers with their average score.

**2. Basic level.** Create a C# console program for the scientific conference's PostgreSQL database (the `sections`, `authors` with email, `papers`, `paper_authors`, `reviews` tables) that registers a paper with several authors (authors are looked up by email or created) in one transaction and prints the section program.

**3. Advanced level.** Create a "Conference" Windows Forms application for a PostgreSQL database (the `sections`, `authors`, `papers`, `paper_authors`, `reviews` with a score of 1–5 tables): papers in a `DataGridView` with a section filter, assigning a reviewer (not an author of the paper), entering reviews, and a list of accepted papers with an average score of at least 3.5.

### Variant 23. Residential complex {#v23}

**1. Initial level.** Create an SQL script with the `apartments` (number, area), `residents`, `tariffs`, and `charges` tables, fill them, and output the charges for a month for each apartment.

**2. Basic level.** Create a C# console program for the residential complex's PostgreSQL database (the `apartments` with an area, `residents`, `tariffs`, `charges` tables) that, for an entered month, charges all apartments by area and tariff with a single `INSERT … SELECT` query and prints the number of records created.

**3. Advanced level.** Create a C# "Residential complex" console application for a PostgreSQL database (the `apartments` with an area, `tariffs`, `charges`, `payments` tables) with the commands `charge <month>`, `pay`, `debts`, and `report <year>`: charging twice for a month is forbidden by a `UNIQUE` constraint, a payment reduces the debt in a transaction, and the report shows the charged and paid amounts by month.

### Variant 24. Pharmacy {#v24}

**1. Initial level.** Create an SQL script with the `drugs`, `batches` (quantity, expiration date), and `sales` tables, fill them, and output the batches that expire within 30 days.

**2. Basic level.** Create a C# console program for the pharmacy's PostgreSQL database (the `drugs`, `batches`: quantity, expiration date; `sales` tables) that searches for a drug by part of the name and prints its batches with the quantity and expiration date, marking expired ones.

**3. Advanced level.** Create a C# "Pharmacy" console application for a PostgreSQL database (the `drugs`, `batches`: quantity, expiration date; `sales` tables) with the commands `receive`, `sell <drug> <qty>`, and `expired`: a sale deducts the quantity from the batches with the nearest expiration date in one transaction (expired ones are not sold); `--help`, exit codes.

### Variant 25. Film studio {#v25}

**1. Initial level.** Create an SQL script with the `films`, `genres`, `actors`, and `roles` (actor, film, character) tables, fill them, and output the number of films and the average budget by genre.

**2. Basic level.** Create a C# console program for the film studio's PostgreSQL database (the `films`, `genres`, `actors`, `roles` tables: actor, film, character) that, by an actor's name, prints their filmography (year, film, role), as well as the actors who appeared with them in shared films.

**3. Advanced level.** Create a "Film studio" Windows Forms application for a PostgreSQL database (the `films` with a year and budget, `genres`, `actors`, `roles` tables): a film catalog with search by title, genre, and year, editing a film's cast (adding and removing roles in a transaction), and a report by genre with saving to CSV.

### Variant 26. School olympiad {#v26}

**1. Initial level.** Create an SQL script with the `regions`, `schools`, `participants`, and `scores` (a score for each problem) tables, fill them, and output the total score of each participant.

**2. Basic level.** Create a C# console program for the school olympiad's PostgreSQL database (the `regions`, `schools`, `participants`, `scores` with problem scores tables) that prints the ranking of the participants of a region whose name is entered from the keyboard, with places (equal scores—equal places) and the region's average score.

**3. Advanced level.** Create a C# "Olympiad" console application for a PostgreSQL database (the `regions`, `schools`, `participants`, `scores` with problem scores tables) with the commands `import <file.csv>` (loading scores in a transaction with validation of each line and a rollback on errors), `rating [--region R]`, and `regions`; `--help`, exit codes.

### Variant 27. Classifieds service {#v27}

**1. Initial level.** Create an SQL script with the `categories`, `users`, and `ads` (title, price, date, active flag) tables, fill them, and output the number of active ads in each category.

**2. Basic level.** Create a C# console program for the classifieds service's PostgreSQL database (the `categories`, `users`, `ads` tables: title, price, date, active flag) that searches for ads by word (`ILIKE`) and category and prints the result in pages of 5 records (`LIMIT`/`OFFSET`) with navigation by keys.

**3. Advanced level.** Create a "Classifieds" Windows Forms application for a PostgreSQL database (the `categories`, `users`, `ads` tables: title, price, date, active flag): search with filters by category and price, pagination with buttons, sorting by a column selected from a list of allowed ones, adding and deactivating ads.

### Variant 28. Farm {#v28}

**1. Initial level.** Create an SQL script with the `fields` (area), `crops`, and `harvests` (field, crop, year, yield in tonnes) tables, fill them, and output the yield (t/ha) of each crop by year.

**2. Basic level.** Create a C# console program for the farm's PostgreSQL database (the `fields` with an area, `crops`, `harvests`: field, crop, year, yield in tonnes tables) that, by a crop name, prints the field with the highest average yield and a table of the harvest by year with the change relative to the previous year.

**3. Advanced level.** Create a C# "Farm" console application for a PostgreSQL database (the `fields` with an area, `crops`, `harvests`: field, crop, year, yield tables) with the commands `field`, `harvest`, and `report <from> <to>`: a harvest cannot be recorded twice for a field and year, and the report shows crop yields by year with totals and is saved to CSV; `--help`, exit codes.

### Variant 29. IT projects {#v29}

**1. Initial level.** Create an SQL script with the `projects`, `employees`, `tasks`, and `time_entries` (date, hours) tables, fill them, and output the number of hours by project.

**2. Basic level.** Create a C# console program for the IT project tracking PostgreSQL database (the `projects`, `employees`, `tasks`, `time_entries` tables: date, hours) that records an employee's hours for a task (no more than 12 hours per day in total) and prints a report of the employee's hours for the week.

**3. Advanced level.** Create a "Time tracking" Windows Forms application for a PostgreSQL database (the `projects`, `employees` with an hourly rate, `tasks`, `time_entries` tables): projects and tasks in a `DataGridView`, assigning assignees, entering hours with validation, closing a task, and a report of hours and the cost of work by project for a month.

### Variant 30. Zoo {#v30}

**1. Initial level.** Create an SQL script with the `enclosures`, `animals`, `foods`, and `rations` (animal, food, quantity, feeding time) tables, fill them, and output the feeding schedule for the day.

**2. Basic level.** Create a C# console program for the zoo's PostgreSQL database (the `enclosures`, `animals`, `foods`, `rations` tables: animal, food, quantity, feeding time) that prints the animals of an enclosure whose number is entered from the keyboard and the daily requirement of each food for that enclosure.

**3. Advanced level.** Create a C# "Zoo" console application for a PostgreSQL database (the `enclosures` with a capacity, `animals`, `foods`, `rations`: animal, food, quantity, time tables) with the commands `animal`, `move <animal> <enclosure>` (relocation with an enclosure capacity check in a transaction), `feeding <time>`, and `foods` (the total food requirement for the week); `--help`, exit codes.

## Procedure

1. Study the theory and worked examples; install PostgreSQL 18 and DataGrip, and create a role and a database for your variant.
2. Design the database schema in 3NF, draw an ER diagram (a DataGrip diagram or by hand), and write a script that creates the tables with primary and foreign keys and constraints.
3. Fill the tables with test data (at least 5 rows in each main table) and test the SQL queries in the DataGrip console or `psql`.
4. Create a C# application with the Npgsql package; store the connection string in user secrets, pass all values as parameters, and dispose connections, commands, and readers with `await using`.
5. Perform related changes in a transaction; handle connection errors and constraint violations with messages to the user.
6. Demonstrate the application and the SQL script to your instructor, explain the code, and answer the review questions.
