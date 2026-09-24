---
title: "Tasks"
description: "Topic 15. LINQ: task variants"
outline: [2, 3]
sourceHash: "ccda6efd1e52730b301159271bf03204cf49093e309fb8e98bc91dfc10281deb"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Pharmacy sales {#v1}

**1. Initial level.** Create a console program with a list of sales (record `Sale`: drug, pharmacy, quantity, price) filled in the code. Select the sales worth more than 500 UAH (`Where`) and print them by amount in descending order (`OrderByDescending`).

**2. Basic level.** Create a console program for analyzing the sales of a pharmacy chain (record `Sale`: drug, pharmacy, quantity, price; data from a CSV file). Group the sales by pharmacy and drug, print the most popular drug of each pharmacy (`MaxBy`) and each pharmacy’s share of revenue. Write the grouping query in both method syntax and query syntax.

**3. Advanced level.** Create a class library for pharmacy chain analytics (sale: date, drug, pharmacy, quantity, price) and a dotnet CLI application. The library builds a revenue report by month and drug with totals using `AggregateBy` and finds drugs whose sales fall from month to month. The application processes a CSV of sales from standard input, and the `--month` option limits the report to one month; errors go to `Console.Error`.

### Variant 2. Admissions office {#v2}

**1. Initial level.** Create a console program with a list of applicants (record `Applicant`: full name, program, admission score). The user enters a program; the program prints its applicants in descending order of score (`Where`, `OrderByDescending`).

**2. Basic level.** Create an admissions office console program with lists of applicants (full name, program, score) and programs (name, number of places). For each program, print the number of applications, the average score, and the cutoff score (the score of the last applicant admitted within the places). Use `GroupBy`, `OrderByDescending`, `Take`, and `Last`.

**3. Advanced level.** Create a class library for admitting applicants and a dotnet CLI application. An applicant (full name, score) submits up to 5 applications with priorities, and a program has a number of places. Admission joins applications with programs (`Join`) and distributes applicants by score and application priority. The application processes applications from standard input and prints the lists of recommended applicants by program; errors go to `Console.Error`.

### Variant 3. Film library {#v3}

**1. Initial level.** Create a console program with a list of films (record `Movie`: title, genre, year, rating). The user enters a genre; the program selects films of this genre released after 2010 with a rating of at least 7 and prints their titles alphabetically.

**2. Basic level.** Create a console program for analyzing a film library (film: title, year, rating, list of genres). Print the number of films and the average rating by genre (a film can have several genres – `SelectMany`), the best film of each decade, and the whole catalog page by page (`Skip`, `Take`).

**3. Advanced level.** Create a film recommendation class library (film: title, director, genres; viewing: user, film) and a dotnet CLI application. The library finds films similar to a given one by shared genres and director (`Intersect`) and the top films by users’ viewings. The application processes the catalog and viewings from standard input and prints recommendations; errors go to `Console.Error`.

### Variant 4. Flights {#v4}

**1. Initial level.** Create a console program with a list of flights (record `Flight`: airline, from, to, delay in minutes). Print the flights delayed by more than 30 minutes, sorted by delay (`Where`, `OrderByDescending`).

**2. Basic level.** Create a console program for analyzing flights (airline, from, to, delay in minutes; data from a CSV file). For each airline, calculate the average delay and the share of on-time flights (`GroupBy`), and print the 5 busiest routes (`CountBy` by city pair).

**3. Advanced level.** Create a punctuality analysis class library (flight: number, from, to, departure and arrival times, delay) and a dotnet CLI application. The library distributes delays by hour of the day and day of the week and finds connections between flights (a join by arrival city and time). The application processes a schedule from standard input and prints a report; errors go to `Console.Error`.

### Variant 5. Employees {#v5}

**1. Initial level.** Create a console program with a list of employees (record `Employee`: full name, department, salary). The user enters a department; the program prints its employees whose salary is higher than the company average (`Average`, `Where`).

**2. Basic level.** Create a console program with lists of departments (identifier, name) and employees (full name, department identifier, salary). Join them (`Join`), print the payroll and average salary of each department, as well as departments without employees (`GroupJoin` or `LeftJoin`).

**3. Advanced level.** Create a staff analysis class library (employee: `Id`, full name, department, salary, `ManagerId`) and a dotnet CLI application. The library builds the reporting hierarchy (a self-join by `ManagerId`), counts each manager’s subordinates at all levels, and finds the largest salary gap within departments. The application processes a CSV from standard input; errors go to `Console.Error`.

### Variant 6. Weather data {#v6}

**1. Initial level.** Create a console program with a list of daily measurements for a year (record `Measurement`: date, temperature, precipitation) generated in the code. Find and print the warmest and coldest days (`MaxBy`, `MinBy`).

**2. Basic level.** Create a weather analysis console program based on daily measurements (date, temperature, precipitation) from a CSV file. Calculate the average temperature and total precipitation by month, the longest period without precipitation, and the days whose temperature deviates from the monthly average by more than 8 °C.

**3. Advanced level.** Create a climate analysis class library (measurement: station, date, temperature, precipitation) and a dotnet CLI application. The library compares years for each station (`Zip`), calculates moving average temperatures, and finds anomalous days. The application processes data from several stations from standard input and prints an anomaly report; errors go to `Console.Error`.

### Variant 7. Tool rental {#v7}

**1. Initial level.** Create a console program with lists of tools (identifier, name) and rentals (tool, checkout date, term, return date). Print the rentals not returned on time with the tool name (`Join`) and the number of days overdue.

**2. Basic level.** Create a rental console program with lists of customers, tools (name, category, price per day), and rentals (customer, tool, number of days). Join them (`Join`) and print the income by tool category, customers without rentals (`LeftJoin`), and the most popular tools.

**3. Advanced level.** Create a rental class library (tool: name, category; rental: tool, checkout and return dates) and a dotnet CLI application. The library calculates tool utilization by period (the overlap of rental intervals) and recommends buying more of the tools with the highest utilization. The application processes a rental log from standard input; errors go to `Console.Error`.

### Variant 8. Chess tournament {#v8}

**1. Initial level.** Create a console program with a list of the games of a chess tournament (record `Game`: White, Black, result – a win for White, a draw, or a win for Black). Calculate each participant’s points (`GroupBy`, `Sum`) and print them in descending order.

**2. Basic level.** Create a console program for a tournament table based on the results of chess games (White, Black, result). Print the participants with their points, number of wins, and Buchholz score (the sum of the opponents’ points), sorted by several keys (`OrderByDescending`, `ThenByDescending`).

**3. Advanced level.** Create a class library for a Swiss-system chess tournament (game: round, White, Black, result) and a dotnet CLI application. The library calculates the participants’ points and pairs the next round: opponents with the same points, without repeat pairings. The application processes the results of rounds from standard input and prints the pairings; errors go to `Console.Error`.

### Variant 9. Online store {#v9}

**1. Initial level.** Create a console program with a list of orders (record `Order`: customer, date, amount). The user enters a date; the program prints the orders for the last week before it, sorted by date.

**2. Basic level.** Create a console program for analyzing the orders of an online store (customer, date, amount; data from a CSV file). Calculate the average order value, the number of orders of each customer (`CountBy`), the customers who ordered every month, and the largest order of each month (`MaxBy`).

**3. Advanced level.** Create a class library for RFM analysis of customers (order: customer, date, amount) and a dotnet CLI application. For each customer, the library calculates the recency of the last order, the frequency, and the monetary value, divides customers into segments, and builds a report by segment. The application processes orders from standard input; errors go to `Console.Error`.

### Variant 10. Baby names {#v10}

**1. Initial level.** Create a console program with a list of baby name records (record `NameRecord`: year, name, sex, count). The user enters a year; the program prints the 10 most popular names of that year.

**2. Basic level.** Create a console program for analyzing baby names (year, name, sex, count; data from a CSV file). For each year, print the most popular boys’ and girls’ names, the names that appeared for the first time (`Except` with previous years), and the distribution of names by first letter.

**3. Advanced level.** Create a class library for analyzing name trends (record: year, name, sex, count) and a dotnet CLI application. The library calculates the rank of names in each decade, the change in rank between decades, and the “fastest-rising names.” The application processes a CSV from standard input and prints a report; errors go to `Console.Error`.

### Variant 11. Olympic medals {#v11}

**1. Initial level.** Create a console program with a list of Olympic awards (record `Award`: country, sport, medal). Count the number of medals of each country (`CountBy`) and print the countries in descending order.

**2. Basic level.** Create a console program for the medal standings based on a list of awards (country, sport, medal). Print the countries sorted by gold, silver, and bronze (`ThenByDescending`), the most successful country in each sport, and the countries without gold.

**3. Advanced level.** Create an Olympic statistics class library (award: games, country, sport, medal; country: name, population) and a dotnet CLI application. The library compares a country’s results across games (`Zip`, `Join`) and calculates medals per capita. The application processes data from several games from standard input and prints a report; errors go to `Console.Error`.

### Variant 12. Real estate {#v12}

**1. Initial level.** Create a console program with a list of apartments (record `Flat`: district, area, rooms, price). The user enters a district and a budget; the program prints the apartments within these limits, sorted by price per square meter.

**2. Basic level.** Create a console program for analyzing apartment listings (district, area, rooms, price; data from a CSV file). Calculate the median and average price per square meter by district, the number of offers by number of rooms (`CountBy`), and the best offers in each district.

**3. Advanced level.** Create a real estate valuation class library (listing: district, area, floor, rooms, price) and a dotnet CLI application. The library finds comparable apartments (the same district, area ±10%, floor) and detects listings with an inflated price per square meter compared with the comparables. The application processes listings from standard input; errors go to `Console.Error`.

### Variant 13. Hospital {#v13}

**1. Initial level.** Create a console program with a list of appointments (record `Visit`: patient, doctor, date). The user enters a doctor; the program prints the doctor’s patients sorted by appointment date.

**2. Basic level.** Create a hospital console program with lists of doctors (identifier, full name, specialty), diagnoses, and appointments (date, doctor, patient, diagnosis). Join the appointments with doctors and diagnoses (`Join`) and print the doctors’ workload by day of the week and the most common diagnoses by specialty.

**3. Advanced level.** Create a hospital performance analysis class library (appointment: patient, doctor, diagnosis, date) and a dotnet CLI application. The library finds repeat visits with the same diagnosis within 30 days and the average duration of treatment (from the first to the last appointment) by diagnosis. The application processes an appointment log from standard input; errors go to `Console.Error`.

### Variant 14. Taxi fleet {#v14}

**1. Initial level.** Create a console program with a list of taxi rides (record `Ride`: driver, date and time, distance, fare). The user enters a driver and a day; the program prints the driver’s rides for that day.

**2. Basic level.** Create a console program for analyzing the rides of a taxi fleet (driver, date and time, distance, fare; data from a CSV file). Calculate the revenue and average cost per kilometer for each driver (`AggregateBy`), the best driver of each day, and the peak hours.

**3. Advanced level.** Create a taxi fleet analytics class library (ride: car, driver, distance, fare; refueling: car, liters, amount) and a dotnet CLI application. The library joins rides with refuelings (`Join`) and calculates fuel costs and the profitability of each car. The application processes ride and refueling logs from standard input; errors go to `Console.Error`.

### Variant 15. Music charts {#v15}

**1. Initial level.** Create a console program with a list of plays (record `Play`: artist, track, genre, count). Print the top 10 tracks by the number of plays (`OrderByDescending`, `Take`).

**2. Basic level.** Create a music chart console program based on plays (artist, track, genre, count; data from a CSV file). Print the top artists by total plays, the share of each genre, and the artists with several tracks in the top 50.

**3. Advanced level.** Create a class library for weekly charts (entry: week, position, artist, track) and a dotnet CLI application. The library calculates position changes between weeks (`Join` by track), the new tracks of the week, and the number of weeks each track has been in the chart. The application processes charts from standard input; errors go to `Console.Error`.

### Variant 16. Household energy consumption {#v16}

**1. Initial level.** Create a console program with a list of meter readings (record `Reading`: year, month, kWh). Find and print the month with the highest electricity consumption (`MaxBy`).

**2. Basic level.** Create a console program for analyzing energy consumption based on monthly meter readings (year, month, kWh) over two years. Calculate consumption by season, compare months with the previous year (`Zip`), and find the months with an anomalous increase of more than 30%.

**3. Advanced level.** Create a class library for analyzing the energy consumption of several apartments (reading: apartment, month, kWh; tariff: validity period, price) and a dotnet CLI application. The library calculates the cost of consumption according to the tariffs and a forecast for the next month. The application processes readings from standard input and prints a report; errors go to `Console.Error`.

### Variant 17. Game store {#v17}

**1. Initial level.** Create a console program with a list of games (record `Game`: title, platform, rating, price). The user enters a platform; the program prints its games with a rating above 8, sorted by price.

**2. Basic level.** Create a game catalog console program (game: title, rating, lists of genres and platforms). Print all unique genres (`SelectMany`, `Distinct`), the number of games by genre, and the games available on all platforms (`Intersect`).

**3. Advanced level.** Create a game catalog class library (game: title, publisher, year, genres, platforms, price, discount) with filters, a discounted price, and grouping by publisher and year. A dotnet CLI application reads the catalog from a CSV file and performs a search with the options `--platform`, `--genre`, and `--sort`; errors go to `Console.Error`.

### Variant 18. Public transportation {#v18}

**1. Initial level.** Create a console program with a list of public transportation routes (record `Route`: number, list of stops). The user enters a stop; the program prints the routes that pass through it.

**2. Basic level.** Create a console program for analyzing a transportation network (route: number, ordered list of stops). Find the transfer stops (shared by several routes, `SelectMany`), the longest route, and the routes that connect two entered stops without a transfer.

**3. Advanced level.** Create a trip planning class library (route: number, ordered list of stops) and a dotnet CLI application. The library finds a trip between two stops without a transfer or with one transfer (joining routes by a shared stop). The application processes the network from standard input, and the stops are given as arguments; errors go to `Console.Error`.

### Variant 19. Bakery {#v19}

**1. Initial level.** Create a console program with a list of a bakery’s daily data (record `BakeryDay`: date, product, baked, sold). Print the products and the days when they sold out completely.

**2. Basic level.** Create a console program for analyzing a bakery based on daily data (date, product, price, baked, sold). Calculate the revenue and write-offs by product and day of the week, the most profitable products, and the recommended quantity to bake (average sales by day of the week).

**3. Advanced level.** Create a bakery production planning class library (plan: product, quantity per day; recipe: product, ingredient, quantity per unit) and a dotnet CLI application. The library joins products with ingredients (`Join`) and calculates the weekly ingredient requirements. The application processes the plan and recipes from standard input; errors go to `Console.Error`.

### Variant 20. Parcel logistics {#v20}

**1. Initial level.** Create a console program with a list of parcels (record `Parcel`: number, from, to, shipping date, delivery date). Print the parcels whose delivery took longer than 3 days.

**2. Basic level.** Create a console program for analyzing parcel delivery (sending and receiving branches, cities, weight, shipping and delivery dates). Calculate the average delivery time between cities, the branches with the longest delays, and the distribution of parcels by weight category.

**3. Advanced level.** Create a delivery monitoring class library (tracking event: parcel, time, branch, stage) and a dotnet CLI application. The library reconstructs the stages of each parcel’s journey, detects “lost” parcels (no new events for more than 5 days), and builds a punctuality report. The application processes tracking events from standard input; errors go to `Console.Error`.

### Variant 21. Air quality {#v21}

**1. Initial level.** Create a console program with a list of air quality measurements (record `AirSample`: station, date, PM2.5). The user enters a station; the program prints the days when PM2.5 at that station exceeded the limit.

**2. Basic level.** Create a console program for analyzing air quality based on measurements (station, date, PM2.5; data from a CSV file). Calculate the average values by station and month, the most polluted day of each station (`MaxBy`), and the share of days exceeding the limit.

**3. Advanced level.** Create a class library for calculating the air quality index (measurement: station, district, date, PM2.5, PM10, ozone) and a dotnet CLI application. The library calculates the index from several pollutants, assigns days to categories, and compares districts. The application processes measurements from standard input; errors go to `Console.Error`.

### Variant 22. Cycling race {#v22}

**1. Initial level.** Create a console program with a list of the results of a cycling race stage (record `StageResult`: rider, team, time). Print the ten fastest riders (`OrderBy`, `Take`).

**2. Basic level.** Create a console program for the overall results of a cycling race based on stage results (stage, rider, team, time). Calculate the general classification by total time (only riders who finished all stages), the gap to the leader, and the team classification.

**3. Advanced level.** Create a cycling race class library (result: stage, rider, team, time, places at intermediate sprints) and a dotnet CLI application. The library takes bonus seconds for top places into account and maintains the points classification and the history of leaders after each stage. The application processes results from standard input; errors go to `Console.Error`.

### Variant 23. Elections {#v23}

**1. Initial level.** Create a console program with a list of polling station reports (record `Protocol`: polling station, candidate, votes). Calculate the total number of votes for each candidate and print them in descending order.

**2. Basic level.** Create a console program for the election results based on reports (polling station, district, number of voters, votes for each candidate). Calculate the turnout at polling stations, the candidates’ percentages, the winner in each district, and the polling stations with anomalous turnout.

**3. Advanced level.** Create a vote counting class library (report: polling station, district, candidate, votes) and a dotnet CLI application. The library determines the winner or the participants of a runoff (the two leaders if nobody received 50%) and builds a map of winners by district. The application processes reports from standard input; errors go to `Console.Error`.

### Variant 24. Scientific publications {#v24}

**1. Initial level.** Create a console program with a list of publications (record `Paper`: title, year, authors, citations). The user enters an author; the program prints the author’s publications sorted by number of citations.

**2. Basic level.** Create a console program for analyzing scientific publications (title, year, list of authors, citations). Calculate each author’s h-index (`SelectMany`), the number of publications by year, and the joint publications of two entered authors.

**3. Advanced level.** Create a scientometrics class library (publication: title, year, authors, citations by year) and a dotnet CLI application. The library builds a co-authorship network and finds the most active pairs of co-authors and each author’s citation trends. The application processes data from standard input; errors go to `Console.Error`.

### Variant 25. Car sharing {#v25}

**1. Initial level.** Create a console program with a list of car sharing trips (record `Trip`: car, start zone, end zone, minutes). Print the trips longer than an hour in descending order of duration.

**2. Basic level.** Create a console program for analyzing car sharing based on trips (car, start and end zones, start time, minutes, cost). Calculate the average duration and revenue by zone, the most popular zone pairs, and the cars that sat idle the longest between trips.

**3. Advanced level.** Create a class library for rebalancing car sharing vehicles (trip: car, start and end zones, time) and a dotnet CLI application. The library calculates the balance of arrivals and departures by zone and hour. The application processes trips from standard input and recommends moving cars from surplus zones to deficit zones; errors go to `Console.Error`.

### Variant 26. University timetable {#v26}

**1. Initial level.** Create a console program with a list of classes (record `Lesson`: day of the week, period number, instructor, group, classroom). The user enters an instructor; the program prints the instructor’s classes sorted by day of the week and period number.

**2. Basic level.** Create a console program for analyzing a university timetable (class: day, period, instructor, group, classroom; a list of classrooms). Find the classrooms free in a given period (`Except`), the instructors’ workload in hours, and the groups with gaps between classes.

**3. Advanced level.** Create a timetable validation class library (class: day, period, instructor, group, classroom) and a dotnet CLI application. Using grouping, the library detects conflicts: an instructor, group, or classroom booked twice in the same period. The application processes the timetable from standard input and prints the conflicts; errors go to `Console.Error`.

### Variant 27. Travel tours {#v27}

**1. Initial level.** Create a console program with a list of tours (record `Tour`: country, duration in days, price, start date). The user enters a country and a budget; the program prints the matching tours sorted by duration.

**2. Basic level.** Create a console program for analyzing travel tours (country, duration, price, start date, number of places sold). Calculate the average price per tour day by country, the seasonality of demand by month, and the most popular countries.

**3. Advanced level.** Create a tour operator class library (tour: country, date, number of places; booking: tour, customer, places) and a dotnet CLI application. The library calculates tour occupancy and a demand forecast for countries based on past seasons. The application processes tours and bookings from standard input; errors go to `Console.Error`.

### Variant 28. Mobile operator {#v28}

**1. Initial level.** Create a console program with a list of calls (record `Call`: subscriber, date, minutes). The user enters a subscriber and a month; the program prints the total duration of the subscriber’s calls in that month.

**2. Basic level.** Create a mobile operator console program with lists of plans (name, minute limit), subscribers (number, plan), and calls (subscriber, date, minutes). Join subscribers with plans (`Join`) and find minute limit overruns, the average call duration, and the most active subscribers.

**3. Advanced level.** Create a billing class library (plan: monthly fee, minute limit, price per minute over the limit; call: subscriber, date, minutes) and a dotnet CLI application. The library calculates the cost of each subscriber’s call history under each plan and chooses the optimal one. The application processes the call log and plans from standard input; errors go to `Console.Error`.

### Variant 29. Restaurant reviews {#v29}

**1. Initial level.** Create a console program with a list of reviews (record `Review`: restaurant, author, rating 1–5, text). The user enters a restaurant; the program prints its reviews with a rating of 1–2.

**2. Basic level.** Create a console program for analyzing restaurant reviews (restaurant, author, rating, text). Calculate the average rating and the number of reviews for each restaurant, the most frequent words in negative reviews (`SelectMany`, `CountBy`), and a ranking of restaurants with a minimum number of reviews.

**3. Advanced level.** Create a restaurant reputation class library (review: restaurant, author, date, rating) and a dotnet CLI application. The library calculates a rating that gives more weight to recent reviews and detects suspicious authors (many 5-star ratings on the same day). The application processes reviews from standard input; errors go to `Console.Error`.

### Variant 30. School cafeteria {#v30}

**1. Initial level.** Create a console program with a list of menu dishes (record `Dish`: name, calories, list of allergens). The user enters an allergen; the program prints the dishes without it.

**2. Basic level.** Create a console program for analyzing a school cafeteria menu (day, dish, calories). Calculate the menu’s calories by day, the most frequently repeated dishes, and the days exceeding a given calorie limit.

**3. Advanced level.** Create a menu planning class library (dish: name, protein, fat, carbohydrates; menu: day, dishes) and a dotnet CLI application. The library checks the balance of protein, fat, and carbohydrates by day and the variety of dishes over a week. The application processes the menu from standard input and prints the violations; errors go to `Console.Error`.

## Procedure

1. Study the theory and worked examples.
2. Prepare test data for your variant (at least 15 records of each kind) that include edge cases: empty groups, records without a match for a join, and identical key values.
3. Create a solution and project; declare the data models as records in separate files.
4. Implement the queries for the chosen difficulty level; write at least one query in both syntaxes.
5. Check the query results in the debugger (*Results View*) and explain where each query is executed.
6. Demonstrate the program to the instructor, explain the code, and answer the review questions.
