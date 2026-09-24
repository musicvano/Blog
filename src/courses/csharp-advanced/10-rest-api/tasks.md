---
title: "Tasks"
description: "Topic 10. REST web services: task variants"
outline: [2, 3]
sourceHash: "c7292ad7822e991d1407e62c2c16bfdb1e0d8ba1558e243bc23b08dbb3375f40"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Table reservations {#v1}

**1. Initial level.** Create an ASP.NET Core Minimal API web service that stores table reservations in memory (guest name, table number, date and time) and provides the endpoints `GET /api/bookings`, `GET /api/bookings/{id}`, and `POST /api/bookings`; test them with requests from an `.http` file.

**2. Basic level.** Create a table reservation web service with a full CRUD set in which the table number must be from 1 to 20, the number of guests from 1 to 8, and the time within 10:00–22:00; errors are returned as `ProblemDetails` (400), a table already taken at the same time gives 409, and a nonexistent reservation gives 404.

**3. Advanced level.** Create an ASP.NET Core Minimal API table reservation web service (guest name, table number, number of guests, date and time) with EF Core, CRUD, and a `GET /api/bookings?date=…` filter, and a Windows Forms application with an `IHttpClientFactory` typed client that shows the reservations for the selected date in a `DataGridView`, creates and cancels them, and displays messages about validation errors and service unavailability.

### Variant 2. School gradebook {#v2}

**1. Initial level.** Create a Minimal API web service that stores students (name, class) in memory and provides endpoints for getting the list, getting one student, and adding and deleting a student.

**2. Basic level.** Create a Minimal API school gradebook web service with the resources `/api/students` (name, class) and a nested collection `/api/students/{id}/grades` (subject, grade) in which the grade must be from 1 to 12 and the subject must not be empty; the `GET /api/students/{id}/average` endpoint returns the average grade with two decimal places.

**3. Advanced level.** Create a Minimal API school gradebook web service (students with a class, grades with a subject 1–12) with a `GET /api/reports/class/{name}` report (students, average grades, the best student) and a `WebApplicationFactory<Program>` integration test project that checks at least 8 scenarios: successful creation, 400 for a grade of 13, 404 for a nonexistent student, calculation of the average grade.

### Variant 3. Scooter rental {#v3}

**1. Initial level.** Create a Minimal API web service with a list of scooters (code, model, charge in percent, availability) and the endpoints `GET /api/scooters` and `GET /api/scooters/{code}`.

**2. Basic level.** Create a Minimal API scooter rental web service (code, model, charge in percent, availability) with the endpoints `GET /api/scooters`, `POST /api/rentals` (start a rental), and `POST /api/rentals/{id}/finish` (end it) that does not allow renting a scooter that is in use or has less than 20 % charge, and calculates the cost at a rate of 5 UAH per minute.

**3. Advanced level.** Create a Minimal API scooter rental web service (code, model, charge, availability; rentals with a per-minute cost) and a `ScooterCli` console client with the commands `list`, `rent <code>`, `finish <id>`, and `--help` that uses `HttpClient`, prints a table of scooters, writes `ProblemDetails` messages to the error stream, and returns exit codes 0, 1 (service error), and 2 (service unavailable).

### Variant 4. Recipe catalog {#v4}

**1. Initial level.** Create a Minimal API web service that stores recipes (name, ingredients, cooking time) and returns the list of recipes and a single recipe by ID.

**2. Basic level.** Create a recipe web service with search by ingredient `GET /api/recipes?ingredient=…`, sorting by cooking time, and pagination with `page`, `pageSize` (at most 20); the response contains the page items and the total count.

**3. Advanced level.** Create a Minimal API recipe web service (name, ingredients, cooking time) with EF Core, search by ingredients and pagination, route groups, endpoint descriptions (`WithSummary`), and an OpenAPI document, as well as an `.http` file with all requests and integration tests for pagination and for searching by several ingredients at once.

### Variant 5. Workout log {#v5}

**1. Initial level.** Create a Minimal API web service for logging workouts (date, exercise, number of sets and reps) with endpoints for adding a workout and getting the list.

**2. Basic level.** Create a Minimal API workout log web service (date, exercise, number of sets and reps) with CRUD, validation (sets 1–10, reps 1–100, the date not in the future), and the `GET /api/stats?from=…&to=…` endpoint that returns the number of workouts and the total number of reps per exercise.

**3. Advanced level.** Create a Minimal API workout log web service (date, exercise, sets, reps) with statistics for a period, and a console client based on an `IHttpClientFactory` typed client with `AddStandardResilienceHandler` resilience that imports workouts from a CSV file passed as an argument, skips invalid lines with a message, and prints a monthly statistics table.

### Variant 6. Delivery service {#v6}

**1. Initial level.** Create a Minimal API web service that stores delivery orders (address, weight, status) and allows creating an order and getting it by number.

**2. Basic level.** Create a Minimal API delivery web service with orders (address, weight, status) in which the status is changed with `PATCH /api/orders/{id}/status` only in the order "new → shipped → delivered"; an invalid transition returns 409 with an explanation in `ProblemDetails`, and the list can be filtered by status.

**3. Advanced level.** Create a Minimal API delivery web service with orders (address, weight, status "new → shipped → delivered") with EF Core and a status change history `GET /api/orders/{id}/history`, and a console client for the courier with the `--order`, `--status`, and `--help` arguments that changes the status, checks the service response, and prints the history as a table.

### Variant 7. Music library {#v7}

**1. Initial level.** Create a Minimal API web service with a collection of albums (title, artist, year) and endpoints for getting the list, getting one album, and adding an album.

**2. Basic level.** Create a music library web service with a nested resource `/api/albums/{albumId}/tracks` in which the track duration is given in seconds (1–3600), the track number is unique within the album, and the album is returned with its total duration.

**3. Advanced level.** Create a Minimal API music library web service with albums (title, artist, year), nested tracks (number, title, duration), and search `GET /api/tracks?search=…`, and a Windows Forms application that shows albums and tracks in two tables, adds and deletes tracks asynchronously through `HttpClient`, and disables the buttons during a request.

### Variant 8. Car fleet records {#v8}

**1. Initial level.** Create a Minimal API web service for car records (license plate, make, mileage) with CRUD endpoints and in-memory data.

**2. Basic level.** Create a Minimal API car records web service (license plate, make, mileage, mileage at the last service) with CRUD, license plate validation with a regular expression (`[RegularExpression]`), a ban on decreasing the mileage (400), and the `GET /api/cars/due-service` endpoint that returns cars with more than 15,000 km since the last service.

**3. Advanced level.** Create a Minimal API car records web service (license plate, make, mileage) with EF Core and service records `/api/cars/{id}/services` (date, mileage, next service), and a console utility that with the `--days N` argument prints service reminders as a table and with `--export file.json` saves them to a JSON file.

### Variant 9. Team task tracker {#v9}

**1. Initial level.** Create a Minimal API web service with projects and tasks (title, assignee, status) that returns a project's tasks and allows adding a task.

**2. Basic level.** Create a Minimal API task tracker web service with projects and tasks (title, assignee, status, due date), the `status`, `assignee`, and `overdue=true` filters in the query string, a route group `/api/projects/{projectId}/tasks`, and `ProblemDetails` responses for all errors, including 404 for a nonexistent project.

**3. Advanced level.** Create a Minimal API task tracker web service with projects and tasks (title, assignee, status) with CRUD, an endpoint filter that checks the key in the `X-Api-Key` header for modifying requests, an OpenAPI document, and integration tests for the filters, 401 without a key, and the full cycle of creating, changing, and deleting a task.

### Variant 10. Movie library {#v10}

**1. Initial level.** Create a Minimal API web service with movies (title, year, genre) and endpoints for getting the list and adding a movie; the genre is written as a string in JSON.

**2. Basic level.** Create a Minimal API movie web service (title, year, genre) with user ratings `POST /api/movies/{id}/ratings` (a rating of 1–10), the average rating in the movie representation, and list sorting `sort=title|year|rating`.

**3. Advanced level.** Create a Minimal API movie web service (title, year, genre, ratings 1–10) with EF Core and a console client with the `--genre`, `--min-rating`, `--top N`, and `--help` arguments that gets movies with `GetFromJsonAsync`, prints the ranking as a table, and handles a 5-second request timeout.

### Variant 11. Hair salon appointments {#v11}

**1. Initial level.** Create a Minimal API web service with salon stylists and client appointments (name, stylist, time) with endpoints for getting and creating appointments.

**2. Basic level.** Create a Minimal API hair salon appointment web service with stylists and appointments (client name, stylist, time) in which an appointment lasts 30 minutes, cannot overlap another appointment of the same stylist (409), and must be within working hours 9:00–19:00; the `GET /api/masters/{id}/slots?date=…` endpoint returns the free slots.

**3. Advanced level.** Create a Minimal API hair salon appointment web service (stylists, 30-minute appointments within working hours without overlaps, a stylist's free slots for a date) and a Windows Forms application with a typed client in which the user selects a stylist and a date, sees the free slots, creates an appointment, and gets a message with the `ProblemDetails` text in case of a conflict.

### Variant 12. Weather data {#v12}

**1. Initial level.** Create a Minimal API web service with weather stations and temperature measurements that allows adding a measurement and getting a station's measurements.

**2. Basic level.** Create a Minimal API weather data web service with stations and measurements (time, temperature), temperature validation (−60…60 °C), and the `GET /api/stations/{id}/summary?from=…&to=…` endpoint that returns the minimum, maximum, and average for the period, or 404 if the station does not exist.

**3. Advanced level.** Create a Minimal API weather data web service (stations, temperature measurements with time) with EF Core and a Windows Forms application that loads the measurements of the selected station through `HttpClient` and draws a temperature chart with GDI+ with axis labels.

### Variant 13. Book swap {#v13}

**1. Initial level.** Create a Minimal API web service with books offered for swapping (title, author, owner) and CRUD endpoints.

**2. Basic level.** Create a Minimal API book swap web service with books (title, author, owner) and swap offers `POST /api/exchanges` with the statuses "pending", "accepted", "rejected" and checks: you cannot offer a swap for your own book, and only a pending offer can be accepted.

**3. Advanced level.** Create a Minimal API book swap web service (books with an owner, swap offers with the statuses "pending", "accepted", "rejected") and a `WebApplicationFactory<Program>` integration test project that checks the full swap scenario, all forbidden status transitions (409), validation (400), and responses for nonexistent books.

### Variant 14. Office inventory {#v14}

**1. Initial level.** Create a Minimal API web service with inventory items (inventory number, name, room) and endpoints for getting and adding items.

**2. Basic level.** Create a Minimal API office inventory web service (inventory number, name, room) in which the inventory number has the format `INV-0000` and is unique (409 for a duplicate), and a move `POST /api/items/{id}/moves` changes the room and records the move history.

**3. Advanced level.** Create a Minimal API office inventory web service (inventory number, name, room) with EF Core and a console stocktaking utility that reads from a file the list of numbers found in a room (the `--room`, `--file` arguments), compares it with the service data, and prints tables of missing and extra items.

### Variant 15. Sports tournament {#v15}

**1. Initial level.** Create a Minimal API web service with tournament teams (name, city) and endpoints for getting the list and adding a team.

**2. Basic level.** Create a Minimal API tournament web service with teams (name, city), matches `POST /api/matches` (teams, score), and the `GET /api/standings` endpoint that returns the standings table (played, won, drawn, lost, goal difference, points) sorted by points.

**3. Advanced level.** Create a Minimal API tournament web service (teams, matches with a score, standings) with EF Core and a console client that enters a round's results from a CSV file (home, away, score) with `PostAsJsonAsync`, reports rejected matches with the `ProblemDetails` text, and prints the updated standings.

### Variant 16. Expense tracking {#v16}

**1. Initial level.** Create a Minimal API web service for tracking expenses (date, category, amount) with endpoints for adding an expense and getting the list.

**2. Basic level.** Create a Minimal API expense tracking web service (date, category, amount) with categories and monthly limits, amount validation (0.01–1,000,000 UAH), and the `GET /api/reports/{year}/{month}` endpoint that returns totals by category and a flag for exceeding the limit.

**3. Advanced level.** Create a Minimal API expense tracking web service (date, category, amount; monthly category limits) and a console client with an `IHttpClientFactory` typed client that, with the arguments `add`, `report <year> <month>`, and `--help`, adds expenses and prints a monthly report as a table with a total and marks for exceeded limits.

### Variant 17. Flower catalog {#v17}

**1. Initial level.** Create a Minimal API web service with a flower catalog (name, price, stock) and endpoints for getting the catalog and a single flower.

**2. Basic level.** Create a Minimal API flower shop web service with a flower catalog (name, price, stock) and an order `POST /api/orders` (items and quantities) that decreases the stock and is rejected with code 409 and a list of items if there are not enough of some flower.

**3. Advanced level.** Create a Minimal API flower shop web service (flowers with a price and stock, orders with items) with EF Core in which an order is placed in a database transaction, and integration tests that check the stock decrease, the rejection of an order without changing the stock, and the calculation of the order total.

### Variant 18. Electronic queue {#v18}

**1. Initial level.** Create a Minimal API electronic queue web service that issues a ticket with a sequence number via `POST /api/tickets` and returns the list of tickets.

**2. Basic level.** Create a Minimal API electronic queue web service that issues tickets with a sequence number and issue time via `POST /api/tickets`, calls the next ticket via `POST /api/queue/next` (204 if the queue is empty), and returns statistics `GET /api/queue/stats` with the number of served tickets and the average waiting time.

**3. Advanced level.** Create a Minimal API electronic queue web service (issuing tickets, calling the next one, the current ticket, and statistics) and a Windows Forms "Display board" application that asynchronously gets the current ticket and statistics every 5 seconds, shows them in a large font, and reports a lost connection to the service without stopping the updates.

### Variant 19. Medication tracking {#v19}

**1. Initial level.** Create a Minimal API web service with medications (name, dosage) and CRUD endpoints with in-memory data.

**2. Basic level.** Create a Minimal API medication tracking web service with medications (name, dosage), an intake schedule `/api/medicines/{id}/schedule` (time, number of pills 1–4), and the `GET /api/intakes?date=…` endpoint that returns the intakes for the day sorted by time.

**3. Advanced level.** Create a Minimal API medication tracking web service (medications, intake schedule, intake marks) with EF Core and a console client that with the `--date` argument prints the intake schedule as a table, marks medications as taken with the `take <id>` command, and returns code 1 with a message to the error stream in case of a service error.

### Variant 20. Hiking routes {#v20}

**1. Initial level.** Create a Minimal API web service with hiking routes (name, difficulty) and endpoints for getting the list and adding a route.

**2. Basic level.** Create a Minimal API hiking routes web service (name, difficulty) with points `/api/routes/{id}/points` (latitude −90…90, longitude −180…180) and the route length in kilometers, computed with the haversine formula to one decimal place.

**3. Advanced level.** Create a Minimal API hiking routes web service (name, difficulty, points with coordinates) with a nearby search `GET /api/routes/near?lat=…&lon=…&km=…`, an OpenAPI document, and a console client that imports route points from a JSON file and prints the routes within the radius as a table with distances.

### Variant 21. Glossary {#v21}

**1. Initial level.** Create a Minimal API web service with a glossary (term, definition, category) and endpoints for getting terms and adding a term.

**2. Basic level.** Create a Minimal API glossary web service (term, definition, category) with case-insensitive search `GET /api/terms?search=…&category=…`, term uniqueness (409), and pagination with the number of found terms in the response.

**3. Advanced level.** Create a Minimal API glossary web service (term, definition, category) with an import endpoint `POST /api/terms/import` that accepts a JSON array, adds the valid terms, and returns a report (added, skipped, errors with item numbers), and integration tests for the import.

### Variant 22. Volunteer management {#v22}

**1. Initial level.** Create a Minimal API web service with volunteer events (name, date, number of spots) and endpoints for getting and creating events.

**2. Basic level.** Create a Minimal API volunteer events web service (name, date, number of spots) with registration `POST /api/events/{id}/registrations`, email validation (`[EmailAddress]`), a ban on repeat registration (409), and a refusal when no spots are left.

**3. Advanced level.** Create a Minimal API volunteer events web service (name, date, number of spots, volunteer registrations by email) with EF Core and a Windows Forms application in which the coordinator sees events with the number of free spots and the list of registered volunteers, and cancels registrations through a typed client.

### Variant 23. Laptop catalog {#v23}

**1. Initial level.** Create a Minimal API web service with laptops (model, processor, RAM, price) and endpoints for getting the list and a single laptop.

**2. Basic level.** Create a Minimal API laptop catalog web service (model, processor, RAM, price) with the `minRam`, `maxPrice`, `cpu` filters, `sort=price|ram` sorting, and pagination; invalid parameter values return 400 with a list of errors.

**3. Advanced level.** Create a Minimal API laptop catalog web service (model, processor, RAM, price) with EF Core and a console comparison client that takes IDs as arguments (`compare 3 7 12`), loads the laptops in parallel with `Task.WhenAll`, and prints a specifications table with the best values highlighted.

### Variant 24. Dormitory management {#v24}

**1. Initial level.** Create a Minimal API web service with dormitory rooms (number, number of beds) and endpoints for getting and adding rooms.

**2. Basic level.** Create a Minimal API dormitory web service with rooms (number, number of beds), check-in `POST /api/rooms/{id}/residents` and check-out `DELETE /api/rooms/{id}/residents/{studentId}`, a ban on exceeding the number of beds (409), and a list of rooms with free beds.

**3. Advanced level.** Create a Minimal API dormitory web service (rooms with a number of beds, student check-in and check-out, an occupancy report) with EF Core and integration tests that replace the database in `WebApplicationFactory` and check check-in, room overflow, repeated check-in of a student, and the occupancy report.

### Variant 25. Conference {#v25}

**1. Initial level.** Create a Minimal API web service with conference talks (topic, speaker, time) and endpoints for getting the program and adding a talk.

**2. Basic level.** Create a Minimal API conference web service with talks (topic, speaker, hall, day, start and end time), a check for overlapping talks in one hall (409), and a schedule `GET /api/schedule?day=…` grouped by hall.

**3. Advanced level.** Create a Minimal API conference web service with talks (topic, speaker, hall, time) and attendee registration by email, and a console client that with the arguments `schedule`, `register <talk> <email>`, and `--help` shows the schedule as a table and registers an attendee, writing `ProblemDetails` errors to the error stream.

### Variant 26. URL shortener {#v26}

**1. Initial level.** Create a Minimal API web service that, on a `POST /api/links` request with a long address, creates a 6-character short code and returns it.

**2. Basic level.** Create a Minimal API URL shortener web service that on a `POST /api/links` request checks that the URL is valid and creates a 6-character short code, redirects a `GET /{code}` request to the long address (`TypedResults.Redirect`), returns 404 for an unknown code, and counts clicks.

**3. Advanced level.** Create a Minimal API URL shortener web service with EF Core that creates short codes for long addresses and redirects by them, with custom codes (4–20 Latin letters and digits, 409 for a taken one), click statistics by day, and integration tests for redirection and statistics.

### Variant 27. Equipment rental {#v27}

**1. Initial level.** Create a Minimal API web service with rental equipment (name, price per day, availability) and endpoints for getting and adding equipment.

**2. Basic level.** Create a Minimal API equipment rental web service (name, price per day) with booking a rental for a period, an availability check for all days (409), cost calculation, and equipment return.

**3. Advanced level.** Create a Minimal API equipment rental web service (name, price per day, rentals for a period) and a console client with a typed client and `AddStandardResilienceHandler` that survives temporary unavailability of the service (test it by stopping and starting the service), retries only safe requests, and prints a log of attempts.

### Variant 28. Guest book {#v28}

**1. Initial level.** Create a Minimal API web service with reviews (author, text, rating) and endpoints for getting the list and adding a review.

**2. Basic level.** Create a Minimal API guest book web service (author, text, rating) with moderation: new reviews have the status "pending", the public list shows only approved ones, and `PATCH /api/reviews/{id}/approve` approves a review; the rating is 1–5, the text 10–1000 characters, with a `minRating` filter.

**3. Advanced level.** Create a Minimal API guest book web service (author, text, rating, status) in which moderation is allowed only with a key in a header (an endpoint filter), and a Windows Forms application for the moderator with a list of reviews awaiting moderation, approve and delete buttons, and the average rating.

### Variant 29. Taxi fleet {#v29}

**1. Initial level.** Create a Minimal API web service with taxi drivers (name, car, license plate) and CRUD endpoints.

**2. Basic level.** Create a Minimal API taxi fleet web service with drivers (name, car, license plate) and shifts `/api/drivers/{id}/shifts` (start, end, revenue), a check that a shift does not overlap another one and lasts no more than 12 hours, and a report of a driver's revenue for a period.

**3. Advanced level.** Create a Minimal API taxi fleet web service (drivers, shifts with revenue) with EF Core and a console report client that with the `--from`, `--to`, and `--csv` arguments gets the revenue of all drivers, prints a table with a total, and optionally saves it to a CSV file.

### Variant 30. Pet records {#v30}

**1. Initial level.** Create a Minimal API web service with pets (name, species, date of birth) and endpoints for getting and adding pets.

**2. Basic level.** Create a Minimal API pet records web service (name, species, date of birth) with vaccinations `/api/pets/{id}/vaccinations` (name, date, next date) and the `GET /api/reminders?days=30` endpoint that returns the vaccinations due within the given number of days.

**3. Advanced level.** Create a Minimal API pet records web service (name, species, date of birth; vaccinations with a date and next date) with EF Core and a Windows Forms application with a typed client that shows pets and vaccinations, adds records with date validation, and highlights overdue vaccinations in bold.

## Procedure

1. Study the theory and the worked examples.
2. Design the resources of your variant: addresses, HTTP methods, DTOs, status codes of successful responses and errors.
3. Create an *ASP.NET Core Web API* project (.NET 10, without controllers) and implement the endpoints with route groups, `TypedResults`, validation, and `ProblemDetails`.
4. Test all endpoints with requests from an `.http` file, including invalid requests (400, 404), and view the `/openapi/v1.json` document.
5. For tasks with a client, create a console or desktop application using `HttpClient` (`IHttpClientFactory`) that handles service unavailability and validation errors.
6. Demonstrate the service and client to the instructor, explain the code, and answer the review questions.
