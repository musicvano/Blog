---
title: Tasks
description: "Topic 1. The C++ Language and Your First Program: task variants"
outline: [2, 3]
sourceHash: "59384d0fe44de5638cc5bf0b8783f1ffb6a1ce4d00a50dfcc0bf436ee1bad17b"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

For this introductory topic, the data is set in the code. The difficulty grows through the presentation of the output, checking the calculations, reproducible builds, and the Git history. You don’t need to introduce classes or parse command-line arguments unless the task requires it.

## Variants

### Variant 1. Student business card {#v1}

**1. Initial level.** Create a console program that, without keyboard input, prints a sample name, group, and major set in the code on separate labeled lines.

**2. Basic level.** Create a console program that prints two fictional business cards with a name, a group, and a sample school email address. Set the data in the code, frame the cards with borders of the same width, and check the alignment for a short and a long name.

**3. Advanced level.** Create a console project that prints three fictional student cards from data set in the code, without keyboard input. Format the borders and a header, and add a README with the build command and the expected output. In the local Git repository, save three meaningful commits: the initial card, formatting, the third card; exclude build outputs with `.gitignore`.

### Variant 2. Café menu {#v2}

**1. Initial level.** Create a console program that prints the names and prices of three drinks set in the code; no user input is needed.

**2. Basic level.** Create a console program that, for three drinks and two desserts set in the code, prints a menu with categories and prices with two decimal places. Check the alignment of names of different lengths; don’t use input.

**3. Advanced level.** Create a console project for a menu of five items set in the code that, without input, prints categories, prices, and the cost of a “coffee and dessert” combo. In the local Git repository, create a `new-drink` branch, add a sixth item, check the output, and merge the branch into `main`. Add a README with the build commands and a comparison of the menu before and after the change; ignore build outputs.

### Variant 3. Class timetable {#v3}

**1. Initial level.** Create a console program that prints a timetable of three classes for one day set in the code: the number, the start time, and the course name. No input is needed.

**2. Basic level.** Create a console program that, without input, prints a timetable of two days with three classes each from data in the code in the columns “day”, “time”, “course”, “room”. For one class, indicate the online format instead of a room number.

**3. Advanced level.** Create a console project for a timetable of two days with three classes each, with the time, courses, and rooms set in the code. Print the table without input, build it in Visual Studio and in Developer PowerShell, and compare the results. Save the initial timetable and the rescheduling of one class as separate commits; in the README, record the build command and the reason for rescheduling.

### Variant 4. Train ticket {#v4}

**1. Initial level.** Create a console program that prints a fictional ticket: the departure and arrival stations, the train number, and the seat. Set the data in the code.

**2. Basic level.** Create a console program that prints two fictional tickets with a route, date, time, car, seat, and price set in the code. Use identical borders and prices with two decimal places; there is no keyboard input.

**3. Advanced level.** Create a console project that, without input, prints two fictional tickets from data in the code and the total cost. Save the initial version, the addition of the second ticket, and a time change in Git as three commits. Add `.gitignore` and a README with the build command; show the diff of the commit with the time change.

### Variant 5. Rectangular room {#v5}

**1. Initial level.** Create a console program that, for a room of 4 m by 5 m set in the code, calculates the floor area and the perimeter and prints the values with units, without input.

**2. Basic level.** Create a console program that, for a room of 4 m by 5 m with a height of 2.8 m, calculates the area of the four walls without openings and the cost of painting at 85 UAH/m². Set the data in the code; print the input data and the results with two decimal places, without keyboard input.

**3. Advanced level.** Create a console project for a cost estimate of two rooms, 4 m by 5 m and 3 m by 4 m, both 2.8 m high; painting the walls without openings costs 85 UAH/m². Set the data in the code, and print the areas, the costs, and the total without input. Build Debug and Release, compare the output, and record the results in the README; save the code, the README, and `.gitignore` in the local Git repository.

### Variant 6. Store receipt {#v6}

**1. Initial level.** Create a console program that, for two products set in the code, prints the names, prices, and the purchase total. The quantity of each product is one unit; there is no input.

**2. Basic level.** Create a console program that, for three products with prices and quantities set in the code, prints a receipt as a table, the total before discount, a 10% discount, and the amount due. Use two decimal places; no input is needed.

**3. Advanced level.** Create a console project for a receipt of three products set in the code with prices, quantities, and a 10% discount. Without input, print the items and the totals. In Git, commit the receipt, the discount, and a README with the calculation of the check total and the build command separately. Prepare the repository for handing in to the instructor: add `.gitignore` and check that `.exe` and `.obj` files are not tracked.

### Variant 7. Weather forecast {#v7}

**1. Initial level.** Create a console program that prints a sample three-day forecast: the date, the temperature, and a description of the weather from data in the code, without input or network requests.

**2. Basic level.** Create a console program that prints a table of a sample five-day forecast with day and night temperatures set in the code. Use negative, zero, and positive values, and label the units; there is no input.

**3. Advanced level.** Create a console project for a sample five-day forecast with day and night temperatures set in the code; print the table without input. In Git, save the initial forecast and its update as separate commits, and put the `v1.0` tag on the initial version. In the README, explain the difference in the data and record the command for viewing the tagged version; ignore build outputs.

### Variant 8. Football match scoreboard {#v8}

**1. Initial level.** Create a console program that prints the names of two fictional teams, the score, and the minute of the match from data set in the code. Don’t use input.

**2. Basic level.** Create a console program that, for a fictional match set in the code, prints the score and a table of shots, corners, and cautions for both teams. Include a zero value in one statistic; no input is needed.

**3. Advanced level.** Create a console project for the scoreboard of a fictional match with data in the code: teams, score, shots, corners, and cautions. Print the table without input. Commit the initial code to Git, fix a deliberately wrong score in the `fix-score` branch, check the output, and merge the branch. In the README, explain the fix and give the correct result; add `.gitignore`.

### Variant 9. Car data sheet {#v9}

**1. Initial level.** Create a console program that prints the make of a fictional car, the model year, and the fuel tank capacity from data set in the code, without input.

**2. Basic level.** Create a console program that, for a car that drove 240 km on a trip and used 18 L of fuel, calculates the consumption in L/100 km. Set the data in the code; print the data sheet, the input data, and the result with two decimal places.

**3. Advanced level.** Create a console project that, without input, prints the data of two sample trips: 240 km and 18 L, 360 km and 25.2 L; it calculates the consumption of each and the combined consumption per 100 km from the total data. Save the implementation in Git as three commits, and add `.gitignore` and a README with a manual check of the combined consumption.

### Variant 10. Library record card {#v10}

**1. Initial level.** Create a console program that prints the author, the book title, and a sample inventory number set in the code. Don’t read data from the keyboard.

**2. Basic level.** Create a console program that prints a record card for two fictional books: the author, the title, the checkout date, and the due date. Set the dates and the rest of the data as text in the code; align the fields and don’t calculate calendar intervals.

**3. Advanced level.** Create a console project for a record card of three fictional books with titles, authors, and text checkout and due dates set in the code. Print the table without input. In the local Git repository, commit the initial record card and a change of the due date as separate commits through Git Changes; add a README explaining the change and `.gitignore` for service files.

### Variant 11. Sample label {#v11}

**1. Initial level.** Create a console program that prints the label of a fictional sample product: the name “Sample A”, a mass of 50 g, and the text “Not for consumption”. Set the data in the code; no input is needed.

**2. Basic level.** Create a console program that, for two sample products with masses of 50 g and 80 g, prints the name, the mass, and the mass of a notional ingredient with a 5% share. The data is set in the code, and there is no input; add the text “Not for consumption”, and format identical borders and results with two decimal places.

**3. Advanced level.** Create a console project for two labels of sample products with masses of 50 g and 80 g and a notional 5% ingredient. Print the ingredient masses and the text “Not for consumption” without input. Build with `cl` and `/W4`, eliminate the warnings, and save the command and the check results in the README. In Git, commit the code, the documentation, and `.gitignore`; don’t give medical advice.

### Variant 12. Boarding pass {#v12}

**1. Initial level.** Create a console program that prints a fictional flight number, seat, and boarding time from data set in the code, without keyboard input.

**2. Basic level.** Create a console program that prints two fictional boarding passes with a route, flight, time, seat, and gate. Set the data in the code; use identical borders and city names of different lengths, without input.

**3. Advanced level.** Create a console project for two fictional boarding passes with route, flight, time, seat, and gate data in the code; print the borders without input. Build Debug and Release and check that the text matches. Save the project in Git, and add `.gitignore` and a README with the paths to the builds and the result of the comparison.

### Variant 13. Pancake recipe {#v13}

**1. Initial level.** Create a console program that prints a sample recipe for four servings: 200 g of flour, 500 mL of milk, 2 eggs. Set the data in the code, without input.

**2. Basic level.** Create a console program that, from a recipe for four servings (200 g of flour, 500 mL of milk, and 2 eggs), calculates the amounts for two and eight servings. Set the data in the code and print a table with units, without keyboard input.

**3. Advanced level.** Create a console project for a recipe: 200 g of flour, 500 mL of milk, and 2 eggs for four servings. Without input, print the amounts for 2, 4, and 8 servings. In Git, save three versions: four servings, two added, eight added; in the README, give the check calculations and the build command, and add `.gitignore`.

### Variant 14. Rental calculator {#v14}

**1. Initial level.** Create a console program that, for three days of rental at 450 UAH per day set in the code, calculates and prints the cost with labels, without input.

**2. Basic level.** Create a console program that, for 3 and 7 days of rental at a rate of 450 UAH/day, calculates the fee and the total amount with a refundable deposit of 1000 UAH. Set the data in the code, print a table, and mark the deposit separately; there is no input.

**3. Advanced level.** Create a console project for a rental of 3 and 7 days at 450 UAH with a 1000 UAH deposit; without input, print the fee, the deposit, and the total amount for each case. Save the code in Git, deliberately change the rate in the working file, review the difference, and restore only this change that was saved in the file but not committed. Add a README with the check output, a description of the restore, and `.gitignore`.

### Variant 15. Workout schedule {#v15}

**1. Initial level.** Create a console program that prints three days of a sample plan with workout names and durations. Set all the data in the code, without input.

**2. Basic level.** Create a console program that, for three workouts set in the code lasting 30, 40, and 50 min, prints a table and the total time per week. Add headers and units; don’t use keyboard input.

**3. Advanced level.** Create a console project for a plan of three workouts of 30, 40, and 50 min; print the table and the total without input. Save it in Git, change the names and durations of the workouts in the `winter-plan` branch, check the new total, and merge the branch. Add `.gitignore` and a README with both check totals.

### Variant 16. Renovation estimate {#v16}

**1. Initial level.** Create a console program that, for 3 cans of paint at 420 UAH set in the code, calculates and prints the cost of the material, without input.

**2. Basic level.** Create a console program that calculates an estimate: 3 cans of paint at 420 UAH, 2 brushes at 85 UAH, and 6 hours of work at 200 UAH. Set the data in the code, and print the items, the materials, the labor, and the total.

**3. Advanced level.** Create a console project for an estimate: 3 cans of paint at 420 UAH, 2 brushes at 85 UAH, and 6 hours of work at 200 UAH. Without input, print a table and the totals. Prepare the local repository for handing in: the code, `.gitignore`, and a README with the build command and a manual check of the total; the history must show the addition of materials, labor, and documentation separately.

### Variant 17. Grade report {#v17}

**1. Initial level.** Create a console program that prints the names of three courses and the sample grades 80, 90, and 100 from values in the code, without input.

**2. Basic level.** Create a console program that, for the sample grades 80, 90, and 100 set in the code, prints the courses, the grades, and the arithmetic mean with two decimal places. Don’t use input.

**3. Advanced level.** Create a console project for a report of three sample grades, 80, 90, and 100, that prints a table and the mean without input. In Git, commit the initial data, a change of the grade 80 to 85, and a README as separate commits. In the README, compare both means and give the build command; add `.gitignore`.

### Variant 18. Hiking route map {#v18}

**1. Initial level.** Create a console program that, for three segments of 2.5 km, 3 km, and 1.5 km, prints their names and the total distance. Set the data in the code, without input.

**2. Basic level.** Create a console program that, for segments of 2.5 km, 3 km, and 1.5 km and a constant speed of 4 km/h, calculates the time for each segment and for the whole route without stops. The data is set in the code; print a table of distances and times in minutes, without input.

**3. Advanced level.** Create a console project for a route of segments of 2.5 km, 3 km, and 1.5 km, a speed of 4 km/h, and two stops of 15 min each. Without input, print the distances, the travel time, and the total time. Build the project in the terminal and in Visual Studio and check that the results match; in Git, save the code, `.gitignore`, and a README with the commands and the check total.

### Variant 19. Course certificate {#v19}

**1. Initial level.** Create a console program that prints a sample certificate with a fictional name, the course title, and a text date from the code, without input.

**2. Basic level.** Create a console program that prints two sample certificates with fictional names, the course title, a date, and the number of hours. Set the data in the code and use borders of the same width; there is no input.

**3. Advanced level.** Create a console project for two sample certificates with fictional names, a text date, and hours from the code; print the borders without input. Save the finished version in Git with the `v1.0` tag, then change the date in a separate commit. In the README, explain which version the tag marks and give its output; add the build command and `.gitignore`.

### Variant 20. Bank statement {#v20}

**1. Initial level.** Create a console program that calculates the final balance from a sample opening balance of 1000 UAH and an expense of 250 UAH. The data is set in the code; print both balances and the transaction without input.

**2. Basic level.** Create a console program that, for a fictional account with an opening balance of 1000 UAH, a deposit of 500 UAH, and expenses of 250 UAH and 125 UAH, prints a table of transactions and the final balance. Set the data in the code, without input.

**3. Advanced level.** Create a console project for a sample statement: an opening balance of 1000 UAH, a deposit of 500 UAH, and expenses of 250 UAH and 125 UAH. Without input, print the transactions and the running balances. In Git, commit the addition of transactions separately, reviewing the changes with `git diff` before committing. Add `.gitignore` and a README with the check balances and the build command.

### Variant 21. Planet parameters {#v21}

**1. Initial level.** Create a console program that prints the sample rounded diameters of Earth, 12,742 km, and Mars, 6,779 km. Set the data in the code; don’t use input.

**2. Basic level.** Create a console program that, for the sample diameters of Earth (12,742 km), Mars (6,779 km), and Venus (12,104 km) set in the code, prints a table and the ratio of each diameter to Earth’s with three decimal places.

**3. Advanced level.** Create a console project for a table of the sample diameters of Earth (12,742 km), Mars (6,779 km), and Venus (12,104 km). Without input, print the diameters and the ratios to Earth’s diameter. In Git, save the data, the ratios, and a README with the build command and a manual check of one ratio separately; add `.gitignore`.

### Variant 22. Swimming pool pass {#v22}

**1. Initial level.** Create a console program that prints sample prices for a single visit: adult 180 UAH, student 140 UAH, child 100 UAH. Set the values in the code, without keyboard input.

**2. Basic level.** Create a console program that, for prices of 180, 140, and 100 UAH, calculates the cost of 8 visits for an adult, a student, and a child with a 10% discount. Set the data in the code; without input, print a table of prices before and after the discount.

**3. Advanced level.** Create a console project for 8-visit passes at prices of 180, 140, and 100 UAH for three categories. Print the table without input. In the Git branch `discount`, add a 10% discount, check all three results, and merge the branch. The README must contain the check totals and the build command; exclude build outputs with `.gitignore`.

### Variant 23. Utility bill {#v23}

**1. Initial level.** Create a console program that calculates the amount for a notional rate of 5 UAH/kWh and a consumption of 120 kWh. Set the data in the code and print the rate, the consumption, and the charge; no input is needed.

**2. Basic level.** Create a console program that, for notional data (electricity 120 kWh at 5 UAH and water 6 m³ at 40 UAH), prints a table and the total amount with two decimal places. Set the data in the code, without input.

**3. Advanced level.** Create a console project for a bill with notional data: electricity 120 kWh at 5 UAH and water 6 m³ at 40 UAH. Without input, print the names in Ukrainian, the units, and the amounts. Build with `/utf-8` and check how the text is displayed; in Git, save the code, `.gitignore`, and a README with the command and the expected total.

### Variant 24. Laptop specifications {#v24}

**1. Initial level.** Create a console program that prints a fictional laptop model, the amount of RAM, and the storage capacity set in the code, without input.

**2. Basic level.** Create a console program that compares two fictional laptop models in a table: memory, storage, weight, and price. Set all the values in the code; print the price difference and label the units, without input.

**3. Advanced level.** Create a console project that compares two fictional laptops by memory, storage, weight, and price; without input, print the table and the price difference. In Git, commit the initial comparison, an update of one price, and a README with a check of the difference separately. Add the build command and `.gitignore`.

### Variant 25. Concert program {#v25}

**1. Initial level.** Create a console program that prints the names of three fictional concert acts and their durations of 5, 7, and 4 min. Set the data in the code, without input.

**2. Basic level.** Create a console program that, for three concert acts lasting 5, 7, and 4 min and two breaks of 2 min each, prints a table and the total duration. Set all the data in the code; no keyboard input is needed.

**3. Advanced level.** Create a console project for a concert program with three acts of 5, 7, and 4 min and two breaks of 2 min each. Print the table and the total time without input. Prepare the local Git repository for handing in: the code, `.gitignore`, and a README with the build command and the check total; show the addition of the acts, the breaks, and the documentation as separate commits.

### Variant 26. Fuel card {#v26}

**1. Initial level.** Create a console program that calculates the cost of 25 L of fuel at 60 UAH/L and prints the volume, the price, and the amount. The data is set in the code; there is no input.

**2. Basic level.** Create a console program that, for two sample trips (300 km and 21 L, 200 km and 16 L), prints a table and the combined fuel consumption per 100 km from the total data. Set the data in the code, without input.

**3. Advanced level.** Create a console project for a fuel card of two trips: 300 km and 21 L, 200 km and 16 L; without input, print the table and the combined consumption per 100 km. Save the initial version and the README in Git as two commits, then deliberately change one number without staging it and restore only this file. In the README, give the check consumption, and add `.gitignore`.

### Variant 27. Attendance register {#v27}

**1. Initial level.** Create a console program that prints sample group data: 25 students, 20 present, and 5 absent. Set the data in the code, without input.

**2. Basic level.** Create a console program that, for a group of 25 students with attendance of 20, 25, and 15 people over three days, calculates the attendance percentages and the number of absentees. The data is set in the code; print a table with two decimal places.

**3. Advanced level.** Create a console project for the register of a group of 25 students with attendance of 20, 25, and 15 people over three days. Without input, print the number of absentees, the daily percentages, and the overall share of attended classes out of 75 possible. Build with `cl` and check the total by hand; save the code, `.gitignore`, and a README with the command and the check in Git as separate meaningful commits.

### Variant 28. Free-fall physics {#v28}

**1. Initial level.** Create a console program that, for a time t = 2 s and an acceleration g = 9.81 m/s², calculates the fall distance with zero initial velocity using the formula `g * t * t / 2`. Set the data in the code and print the result without input.

**2. Basic level.** Create a console program that, for times of 1, 2, and 3 s and g = 9.81 m/s², prints a table of the distance `g * t * t / 2` and the velocity `g * t` of free fall without air resistance. The data is set in the code, and the initial velocity is zero; present the results with two decimal places, without input.

**3. Advanced level.** Create a console project for a table of the distance `g * t * t / 2` and the velocity `g * t` for times of 1, 2, and 3 s with g = 9.81 m/s², without input. In the Git branch `moon`, change the acceleration to the sample value 1.62 m/s² and the model label; check the results and merge the branch. In the README, save both check results for 2 s and the build command; add `.gitignore`.

### Variant 29. Build system information {#v29}

**1. Initial level.** Create an MSVC console program that, without input, prints the values of the macros `__cplusplus`, `_MSVC_LANG`, and `_MSC_VER` with explanatory labels.

**2. Basic level.** Create an MSVC console program that, without input, prints `__cplusplus`, `_MSVC_LANG`, and `_MSC_VER` in a table. Build it with `/Zc:__cplusplus` and without this option in the same standard mode; record both results and explain why the macro values don’t prove complete support for the standard.

**3. Advanced level.** Create an MSVC console project that, without input, prints `__cplusplus`, `_MSVC_LANG`, and `_MSC_VER`. Build it in Debug and Release with the same `/std:c++latest` and `/Zc:__cplusplus`; compare the output and the sizes of the executables without generalizing about performance. Save the code, `.gitignore`, and a README with the options, the compiler version, and the results in Git.

### Variant 30. Crossword template {#v30}

**1. Initial level.** Create a console program that, without input, prints a rectangular 5-by-5 grid set in the code: a period means an empty cell, and `X` means a blocked one.

**2. Basic level.** Create a console program that prints a 5-by-5 grid set in the code with periods and `X`, row numbers, column letters, and a legend of the symbols. Check that the labels don’t break the width of the grid; don’t use input.

**3. Advanced level.** Create a console project for a 5-by-5 grid with periods, `X`, row numbers, column letters, and a legend; set the data in the code and print it without input. In Git, through Visual Studio, commit the grid, the labels, and a change of two cells separately. Review the diff of the last commit; add `.gitignore` and a README with the expected grid and the build command.

## Procedure

1. Study the theory, check that the C++ components are installed,
  and create a separate console project for the chosen task.
1. Write down the task, the input data, and the expected result. For a numeric
  problem, calculate a check result by hand before running the program.
1. Implement the program with a single `main`, and set the options for the standard,
  warnings, and encoding. Fix build errors and check
  the warnings; run the current build.
1. Check the units of measurement, the precision of numbers, Ukrainian characters,
  borders, and alignment. Change one input value, predict
  the new result, and compare it with the actual one.
1. Perform the Git actions or build comparisons required by the task.
  Before committing, review the changes and exclude service files;
  don’t pass off fictional sample data as real personal information.
1. Prepare a report: the task, the code, the build options and command, the actual
  output, the check calculations, and, if needed, the commit history.
  Hand in the source files in the way agreed with the instructor.
1. At the defense, explain every line of the program, the build stages, and
  the contents of the commits; make a small change and rebuild the project.
