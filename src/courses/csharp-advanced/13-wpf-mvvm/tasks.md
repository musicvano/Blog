---
title: "Tasks"
description: "Topic 13. Data binding and MVVM: task variants"
outline: [2, 3]
sourceHash: "d0c8d3d4b606b19720a03334a361dd78b3247cc9c99a1fa417a23199933eaa1a"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Family budget {#v1}

**1. Initial level.** Create a WPF application in which expenses (item, amount) are added from fields to an `ObservableCollection<T>` and shown in a `DataGrid`, and a label bound to the ViewModel shows the total in the `N2` format.

**2. Basic level.** Create a WPF application following the MVVM pattern for tracking family expenses (item, category, amount) with category selection in a `ComboBox`, amount validation (0.01–1,000,000 UAH) through `INotifyDataErrorInfo`, a category filter (`ICollectionView`), and bars for the share of each category (a `ProgressBar` bound to a percentage).

**3. Advanced level.** Create a WPF "Family budget" application on CommunityToolkit.Mvvm for tracking expenses (date, item, category, amount) with the ViewModel in a separate library, a service for saving expenses to a JSON file registered in a `ServiceCollection`, commands for adding, deleting, and a monthly report, and unit tests of the ViewModel (totals, filter, command unavailability).

### Variant 2. Board game catalog {#v2}

**1. Initial level.** Create a WPF application that shows a list of board games (name, genre, number of players, price) in a `ListBox` with a card-style `DataTemplate` and the details of the selected game next to it, bound to `SelectedItem`.

**2. Basic level.** Create a WPF "Game catalog" application following the MVVM pattern with a list of board games (name, genre, number of players, price), search by name while typing (`UpdateSourceTrigger=PropertyChanged`, `Delay`), grouping by genre through `ICollectionView`, sorting by price or name (`ComboBox`), and a counter of the games shown.

**3. Advanced level.** Create a WPF "Board game catalog" application on CommunityToolkit.Mvvm that loads games (name, genre, number of players, price) from a JSON file, places the cards in a `WrapPanel` (`ItemsPanelTemplate`), filters and sorts them, adds and edits games in a modal window with validation, saves changes with a command, and has ViewModel tests for filtering and sorting.

### Variant 3. Marathon registration {#v3}

**1. Initial level.** Create a WPF application with a registration form (name, year of birth, distance 5, 10, or 42 km) bound to a ViewModel with `INotifyPropertyChanged`, and a summary label that is updated while typing.

**2. Basic level.** Create a WPF application following the MVVM pattern for registering marathon participants with `INotifyDataErrorInfo` validation (a name of at least 2 characters, age 16–80 on the start date, a phone matching a pattern), a custom `Validation.ErrorTemplate`, and a *Register* command that is unavailable while there are errors.

**3. Advanced level.** Create a WPF "Marathon" application on CommunityToolkit.Mvvm (`ObservableValidator`) for registering participants (name, date of birth, phone, distance 5, 10, or 42 km) with field validation that saves the list of participants to a JSON file, does not allow a repeat registration with the same phone, shows statistics by distance and age group, and has unit tests of the validation rules.

### Variant 4. Reading tracker {#v4}

**1. Initial level.** Create a WPF application in which the number of pages and the pages read (`Slider`) are set for a book, and a `ProgressBar` and a percentage label are bound to the ViewModel.

**2. Basic level.** Create a WPF application following the MVVM pattern with a list of books (title, author, number of pages, pages read), whose data template shows the title, the author, a progress `ProgressBar`, and the percentage through a custom `IValueConverter`; finished books are highlighted with a `DataTrigger`.

**3. Advanced level.** Create a WPF "Reading tracker" application on CommunityToolkit.Mvvm with a list of books (title, author, number of pages) and a log of reading sessions (date, pages), calculation of progress, pace, and a forecast completion date, saving to a JSON file through a service injected into the ViewModel, and tests of the calculations.

### Variant 5. Password manager {#v5}

**1. Initial level.** Create a WPF application that shows a list of accounts (site, login, password) with the password hidden by a converter (`••••••`), and a *Show* button that reveals the password of the selected entry.

**2. Basic level.** Create a WPF application following the MVVM pattern for storing accounts (site, login, password) with a list with hidden passwords, an add form based on `ObservableValidator` (the site is required, the password is at least 8 characters), a password strength indicator, and a command that copies the password to the clipboard.

**3. Advanced level.** Create a WPF "Password manager" application on CommunityToolkit.Mvvm for accounts (site, login, password) with a password generator with parameters, search, saving of data to a file encrypted with `ProtectedData` (a service behind an interface), and ViewModel tests with a fake service.

### Variant 6. Gym timetable {#v6}

**1. Initial level.** Create a WPF application that shows the week's workouts (day, time, kind, trainer) in a `ListBox` with a data template and an implicit style for text blocks.

**2. Basic level.** Create a WPF "Gym timetable" application following the MVVM pattern with a list of the week's workouts (day, time, kind, trainer, type), in which a `DataTemplateSelector` chooses a separate template for group, personal, and cardio workouts, and a day-of-week filter uses `ICollectionView`.

**3. Advanced level.** Create a WPF "Gym" application on CommunityToolkit.Mvvm with a workout timetable (day, time, kind, trainer, number of spots) and sign-up for workouts (a limit on the number of spots, the command is unavailable for full groups), navigation between the timetable and sign-up pages through `DataTemplate`, and tests of the sign-up rules.

### Variant 7. Support tickets {#v7}

**1. Initial level.** Create a WPF application with a list of requests (number, subject, status) in which rows with the *Open* status are shown in bold with a `DataTrigger`.

**2. Basic level.** Create a WPF application following the MVVM pattern for tracking support requests (number, subject, priority, status, date) with a `DataGrid`, filters by status and priority, sorting by date, and status change commands whose availability depends on the current status.

**3. Advanced level.** Create a WPF "Help desk" application on CommunityToolkit.Mvvm for requests (number, subject, priority, status, date) with a list and a request details card, a history of status changes, saving to a JSON file, a `WeakReferenceMessenger` message about a status change for a statistics panel, and ViewModel tests.

### Variant 8. Tagged notes {#v8}

**1. Initial level.** Create a WPF application in which notes (title, text, comma-separated tags) are shown in a `ListBox`, and the selected note is edited in fields with a `TwoWay` binding.

**2. Basic level.** Create a WPF application following the MVVM pattern for notes (title, text, tags, date) with editing of the selected note, search by tag, a note heading in the list built with a `MultiBinding` from the title and date, and switching between light and dark themes by replacing a `ResourceDictionary`.

**3. Advanced level.** Create a WPF "Notes" application on CommunityToolkit.Mvvm for notes (title, text, tags) with editing, a tag cloud (a `WrapPanel` of tag buttons with a custom `ControlTemplate`) for filtering, saving notes to files, autosave after changes, and tests of tag search.

### Variant 9. Loan calculator {#v9}

**1. Initial level.** Create a WPF application in which the loan amount, rate, and term are bound to a ViewModel, and the monthly annuity payment is recalculated immediately after any value changes.

**2. Basic level.** Create a WPF application following the MVVM pattern for calculating a loan by amount, annual rate, and term in months with field validation, an annuity payment schedule (month, payment, principal, interest, balance) in a `DataGrid`, and formatting of amounts according to the regional settings (overriding `FrameworkElement.Language`).

**3. Advanced level.** Create a WPF "Loan calculator" application on CommunityToolkit.Mvvm that builds payment schedules from the amount, rate, and term and compares two repayment schemes (annuity and equal principal payments), with export of the schedule to CSV through a service injected into the ViewModel, and unit tests of the calculations on known examples.

### Variant 10. Store inventory {#v10}

**1. Initial level.** Create a WPF application with a list of products (name, quantity, minimum stock) in which products with a quantity below the minimum stock are highlighted by a style through a `DataTrigger` and a converter.

**2. Basic level.** Create a WPF application following the MVVM pattern for store inventory (products: name, category, quantity, minimum stock) with search, grouping by category (`ICollectionView`), receipt and write-off commands with quantity checks, and a label with the number of products in short supply.

**3. Advanced level.** Create a WPF "Warehouse" application on CommunityToolkit.Mvvm for products (name, category, quantity, minimum stock) with receipt and write-off commands, an operations log, a shortage report, saving of data to a JSON file through a service registered in a `ServiceCollection`, and tests of the receipt and write-off commands.

### Variant 11. Café menu {#v11}

**1. Initial level.** Create a WPF application that shows a café menu as buttons with a custom `ControlTemplate` (name and price), where clicking a button adds the item to the cart.

**2. Basic level.** Create a WPF "Café" application following the MVVM pattern with a menu (name, price; defined in code) as buttons with a custom template, a cart (the quantity of items is changed with `+` and `−` commands with a parameter), an order total, a discount by code, and hover and press triggers in the button template.

**3. Advanced level.** Create a WPF "Café" application on CommunityToolkit.Mvvm with a menu loaded from a JSON file, order checkout, a history of the day's orders, switching of visual themes, and unit tests of the price and discount calculations.

### Variant 12. Attendance register {#v12}

**1. Initial level.** Create a WPF application with a `DataGrid` of the students in a group, in which a `DataGridCheckBoxColumn` marks attendance and a label shows the number of students present.

**2. Basic level.** Create a WPF application following the MVVM pattern for an attendance register of several classes: selecting a group and a class date, a `DataGrid` of students with an attendance mark, the attendance percentage of each student, and highlighting of students with attendance below 60 % through a `DataTrigger`.

**3. Advanced level.** Create a WPF "Attendance register" application on CommunityToolkit.Mvvm (groups, students, classes with a date, attendance marks) with saving of data to a JSON file, student attendance percentages, statistics by group, export to CSV through a service, and tests of the percentage calculations.

### Variant 13. Mood tracker {#v13}

**1. Initial level.** Create a WPF application in which the mood of the day is chosen with one of five emotion buttons with the same style, and the selected mood and a comment are shown in a history list.

**2. Basic level.** Create a WPF "Mood tracker" application following the MVVM pattern with emotion buttons (five mood levels) based on `ToggleButton` with a custom template, a comment field, a history by date in a `ListBox` with a data template, and the average mood for the week.

**3. Advanced level.** Create a WPF "Mood tracker" application on CommunityToolkit.Mvvm in which a mood (1–5) with a comment is chosen every day, with a bar chart of the month's mood (an `ItemsControl` with bound heights), saving of the history to a file, and tests of the statistics.

### Variant 14. Movie catalog {#v14}

**1. Initial level.** Create a WPF application with a master-detail view of movies: a list of titles on the left and the details of the selected movie (year, genre, rating) on the right.

**2. Basic level.** Create a WPF "Movie catalog" application following the MVVM pattern (title, year, genre, rating) with a master-detail view, search, sorting by rating and year, editing of details with rating validation (1–10), and a delete command with confirmation.

**3. Advanced level.** Create a WPF "Movie library" application on CommunityToolkit.Mvvm with a list and details of movies (title, year, genre, rating) that asynchronously loads movies from a JSON file with a cancelable command, shows an `IsRunning` indicator, saves changes, and has ViewModel tests with a fake loading service.

### Variant 15. Meter readings {#v15}

**1. Initial level.** Create a WPF application in which the previous and current readings of a water meter are entered, and the consumption and the cost at the tariff are calculated in the ViewModel.

**2. Basic level.** Create a WPF application following the MVVM pattern for water, gas, and electricity meter readings (date, reading, consumption, cost at the tariff) with a check that the new reading is not less than the previous one (`INotifyDataErrorInfo`), and a history table in a `DataGrid`.

**3. Advanced level.** Create a WPF "Utility meters" application on CommunityToolkit.Mvvm for water, gas, and electricity readings with a check that the new reading is not less than the previous one, calculation of consumption and cost by tariff, a yearly report, saving of readings and tariffs to a JSON file through a service, and tests of the validation rules and the cost calculation.

### Variant 16. Kanban board {#v16}

**1. Initial level.** Create a WPF application with three columns *To Do*, *In Progress*, *Done*, each of which is an `ItemsControl` bound to a separate `ObservableCollection<T>` of tasks.

**2. Basic level.** Create a WPF "Kanban" application following the MVVM pattern with the columns *To Do*, *In Progress*, *Done* (`ItemsControl` elements with task collections), commands for moving the selected task between columns (the command parameter is the task), a limit on the number of tasks in the *In Progress* column, and counters in the column headers.

**3. Advanced level.** Create a WPF "Kanban board" application on CommunityToolkit.Mvvm with the columns *To Do*, *In Progress*, *Done*, task cards (title, priority, assignee, due date), move commands, highlighting of overdue tasks with a trigger, saving of the board to a JSON file, and tests of the move commands.

### Variant 17. Cookbook {#v17}

**1. Initial level.** Create a WPF application with a list of recipes and the details of the selected recipe (ingredients and steps) shown through data templates.

**2. Basic level.** Create a WPF "Cookbook" application following the MVVM pattern (recipes with ingredients and steps) in which the recipe list and the details panel have separate ViewModels, and the recipe selection is passed with a `WeakReferenceMessenger` message.

**3. Advanced level.** Create a WPF "Cookbook" application on CommunityToolkit.Mvvm (recipes with a number of servings, ingredients with a quantity and unit, and steps) with recalculation of ingredients for a given number of servings, search by ingredient, saving to a JSON file, and tests of the recalculation.

### Variant 18. Currency converter {#v18}

**1. Initial level.** Create a WPF application in which the amount and the "from" and "to" currencies are bound to a ViewModel, and the result at rates defined in the program is updated while typing.

**2. Basic level.** Create a WPF "Currency converter" application following the MVVM pattern in which the amount and the "from" and "to" currencies are bound to the ViewModel and the result is recalculated while typing, with an asynchronous command for updating the rates from a service (a simulated `Task.Delay` delay), a progress indicator, and a cancel button.

**3. Advanced level.** Create a WPF "Exchange office" application on CommunityToolkit.Mvvm that converts the entered amount between two currencies at rates from a web service through an `HttpClient` registered in a `ServiceCollection`, handles network errors, saves the latest rates to a file, and has ViewModel tests with a fake rate service.

### Variant 19. Family cars {#v19}

**1. Initial level.** Create a WPF application with a list of cars (make, license plate, mileage, service date) and the details of the selected car bound to `SelectedItem`.

**2. Basic level.** Create a WPF application following the MVVM pattern for tracking family cars (make, license plate, mileage, service date), in which a `DataTrigger` highlights cars whose service is due within 14 days or overdue, and the mileage and date are validated with `INotifyDataErrorInfo`.

**3. Advanced level.** Create a WPF "Garage" application on CommunityToolkit.Mvvm for cars (make, license plate, mileage) with a maintenance log for each car (date, mileage, work done), reminders by mileage and date, saving to a JSON file, and tests of the reminder rules.

### Variant 20. Vocabulary trainer {#v20}

**1. Initial level.** Create a WPF application that shows a word in English, accepts a translation, and after a button with a command is clicked reports whether the answer is correct.

**2. Basic level.** Create a WPF "Vocabulary trainer" application following the MVVM pattern with a list of words and translations defined in code, word cards for translation, statistics of correct and incorrect answers, a *Next* command that is unavailable until the answer is checked, and a message style that changes with a trigger.

**3. Advanced level.** Create a WPF "Word trainer" application on CommunityToolkit.Mvvm that shows words to translate and checks the answers, repeats words with mistakes more often, loads the dictionary (word, translation) from a file through a service, and has unit tests of the ViewModel with a fixed random number generator.

### Variant 21. Print shop orders {#v21}

**1. Initial level.** Create a WPF application with a `DataGrid` of print shop orders (customer, product, run size, status) in which the row style depends on the status.

**2. Basic level.** Create a WPF application following the MVVM pattern for print shop orders (customer, product, run size, ready date, status) with an add form (run size 1–100,000, a ready date no earlier than tomorrow), filters by status and customer, and a cost calculation by tariff.

**3. Advanced level.** Create a WPF "Print shop" application on CommunityToolkit.Mvvm for orders (customer, product, run size, date, status, cost by tariff) with switching of statuses by commands, a report for a period, saving to a JSON file through a service, and tests of the cost calculation and status transitions.

### Variant 22. Weather log {#v22}

**1. Initial level.** Create a WPF application in which observations (date, temperature, precipitation) are added from fields to a list, and a label shows the average temperature.

**2. Basic level.** Create a WPF "Weather log" application following the MVVM pattern for observations (date, temperature, precipitation) with range checks (temperature −60…+60 °C, precipitation 0–500 mm), grouping of observations by month through `ICollectionView`, and totals for each month.

**3. Advanced level.** Create a WPF "Weather journal" application on CommunityToolkit.Mvvm for observations (date, temperature, precipitation) with import from a CSV file (lines with errors are skipped with a report), a bar chart of temperatures, and tests of the statistics.

### Variant 23. Dormitory room allocation {#v23}

**1. Initial level.** Create a WPF application with a list of rooms (number, beds, free beds) in which rooms without free beds are shown in gray through a `DataTrigger`.

**2. Basic level.** Create a WPF application following the MVVM pattern for dormitory check-in (master-detail: rooms with a number and number of beds, and their residents), in which the check-in command is unavailable for a full room, and the check-out command without a selected resident.

**3. Advanced level.** Create a WPF "Dormitory" application on CommunityToolkit.Mvvm (rooms with a number of beds and a sex, residents with a year of study) with check-in and check-out commands, check-in rules (the room's sex, the year of study), a history of room moves, saving to a JSON file, and tests of the commands' `CanExecute`.

### Variant 24. Volunteer shifts {#v24}

**1. Initial level.** Create a WPF application with a list of volunteer shifts (date, place, people needed) and a volunteer name field, where the *Join* command adds the volunteer to the selected shift.

**2. Basic level.** Create a WPF application following the MVVM pattern for signing up for volunteer shifts (date, time, place, people needed) with a limit on the number of people, a check for overlapping shifts of one volunteer, and "Shifts" and "My sign-ups" pages switched by a `ContentControl`.

**3. Advanced level.** Create a WPF "Volunteers" application on CommunityToolkit.Mvvm for signing volunteers up for shifts (date, time, place, number of people) with DI of the storage and report services in `App.OnStartup`, navigation between ViewModels through `DataTemplate`, and unit tests of the sign-up rules (the people limit, overlapping shifts).

### Variant 25. Playlist {#v25}

**1. Initial level.** Create a WPF application with a list of tracks (title, artist, duration) and a label with the total playlist duration in the `hh:mm:ss` format.

**2. Basic level.** Create a WPF "Playlist" application following the MVVM pattern with a list of tracks (title, artist, duration in seconds), *Up*, *Down*, *Remove* commands for the selected track, sorting by title or duration, and a converter from seconds to the `mm:ss` format (without audio playback).

**3. Advanced level.** Create a WPF "Playlists" application on CommunityToolkit.Mvvm with several track playlists (title, artist, duration), reordering commands, moving tracks between playlists, saving to a JSON file, switching of themes, and tests of the reordering commands.

### Variant 26. Survey form {#v26}

**1. Initial level.** Create a WPF application that shows a survey question with answer options (`RadioButton`) through a data template and a *Next* button for moving to the next question.

**2. Basic level.** Create a WPF "Survey" application following the MVVM pattern with questions defined in code, in which a `DataTemplateSelector` chooses the template for single-choice, multiple-choice, and free-answer questions, and *Finish* is available after all questions are answered.

**3. Advanced level.** Create a WPF "Survey builder" application on CommunityToolkit.Mvvm that loads a survey from a JSON file, saves the answers, shows the results for each question, and has tests of the completeness check.

### Variant 27. Fuel consumption {#v27}

**1. Initial level.** Create a WPF application in which the distance traveled and the fuel used are bound to a ViewModel, and the consumption per 100 km is calculated while typing.

**2. Basic level.** Create a WPF application following the MVVM pattern for tracking refuelings (date, distance, liters) with consumption calculation, a choice of units (L/100 km, km/L, MPG), conversion through an `IValueConverter` with a parameter, and value validation.

**3. Advanced level.** Create a WPF "Fuel" application on CommunityToolkit.Mvvm with a refueling log (date, distance, liters, price) for several cars, consumption in different units, monthly cost statistics, saving to a JSON file, and tests of the calculations and converters.

### Variant 28. Friends' birthdays {#v28}

**1. Initial level.** Create a WPF application with a list of friends (name, date of birth) in which a data template shows the number of days until the next birthday.

**2. Basic level.** Create a WPF "Birthdays" application following the MVVM pattern with a list of friends (name, date of birth) and the number of days until the celebration, sorting by the nearest date through `ICollectionView`, highlighting of those with a birthday today and within the week with triggers, and an add form with validation.

**3. Advanced level.** Create a WPF "Friends calendar" application on CommunityToolkit.Mvvm with a list of friends (name, date of birth) and the number of days until the next birthday, grouping by month, a `TimeProvider` abstraction of the current date, saving to a JSON file, and tests of the days-until-birthday calculation, including for February 29.

### Variant 29. Computer components {#v29}

**1. Initial level.** Create a WPF application in which a processor and a motherboard are chosen from a `ComboBox`, and the total cost of the build is calculated in the ViewModel.

**2. Basic level.** Create a WPF "PC configurator" application following the MVVM pattern with a component catalog defined in code (processors with a socket, motherboards with a socket and memory type, memory modules; prices), selection in a `ComboBox`, the build cost, a compatibility check of the socket and memory type, a warning shown by a `DataTrigger`, and an *Order* command that is unavailable for an incompatible build.

**3. Advanced level.** Create a WPF "PC configurator" application on CommunityToolkit.Mvvm with a component catalog (type, name, socket, memory type, power, price) from a JSON file, build selection with the cost, a check of compatibility and power supply capacity, saving of builds, and tests of the compatibility rules.

### Variant 30. School olympiad {#v30}

**1. Initial level.** Create a WPF application with a list of olympiad participants (name, grade, points) and a label with the average score bound to the ViewModel.

**2. Basic level.** Create a WPF "Olympiad" application following the MVVM pattern for participants (name, grade) and their points per problem with "Participants", "Points", and "Results" pages switched by a `ContentControl` with implicit data templates, and a ranking of winners by grade.

**3. Advanced level.** Create a WPF "School olympiad" application on CommunityToolkit.Mvvm (participants with a grade, points per problem, a ranking) with DI of services, navigation between ViewModels, validation of points per problem, saving to a JSON file, and tests of determining winners with equal points.

## Procedure

1. Study the theory and the worked examples.
2. Design the ViewModel: properties with notification, collections, commands with `CanExecute` conditions, validation rules; sketch the window.
3. In Visual Studio 2026, create a *WPF Application* project (.NET 10), and for the basic and advanced levels a class library for the Model and ViewModel; add CommunityToolkit.Mvvm.
4. Describe the window with XAML markup with bindings, data templates, styles, and resources; keep the code-behind minimal.
5. For the advanced level, register the services and ViewModels in a `ServiceCollection` and cover the ViewModel with xUnit.net v3 unit tests.
6. Build the solution without warnings, make sure there are no errors in the *XAML Binding Failures* window, and test the application with valid and invalid data.
7. Demonstrate the application and the tests to the instructor, explain the code, and answer the review questions.
