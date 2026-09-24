---
title: "Tasks"
description: "Topic 15. Cross-platform .NET MAUI: task variants"
outline: [2, 3]
sourceHash: "81959860e82ea00baec91848174b91fedcd0013d223762d0943fbde26512c4a3"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Shopping list {#v1}

**1. Initial level.** Create a .NET MAUI "Shopping list" application in which the user enters an item name and quantity in an `Entry` and clicks the *Add* button, and the item appears in a `CollectionView` in the format "Milk × 2". An empty name is not added.

**2. Basic level.** Create a .NET MAUI "Shopping list" application with MVVM (CommunityToolkit.Mvvm) in which items have a name, a quantity (1–99), and a "bought" flag (`CheckBox`), are deleted with a `SwipeView` swipe, and a label shows "Bought 3 of 7". The *Add* button is unavailable for invalid data, and the list is saved to a JSON file in `AppDataDirectory`.

**3. Advanced level.** Create a .NET MAUI "Shopping" application with *Lists* and *Settings* Shell tabs. The user creates several shopping lists, opens a list on a separate page (a route with an ID parameter), adds items with a price and category, groups them by category (`IsGrouped`), and sees the total cost. The data is stored in SQLite (sqlite-net-pcl), the data service and the ViewModel are registered in `MauiProgram`, and unit tests with a substituted service are written for the ViewModel.

### Variant 2. Run log {#v2}

**1. Initial level.** Create a .NET MAUI application in which the user enters a run's distance (km) and time (minutes) and clicks *Calculate*, and a label shows the pace in the format "5:30 min/km" and the average speed in km/h. For invalid values a `DisplayAlertAsync` message is shown.

**2. Basic level.** Create a .NET MAUI "Run" application that, after *Start* is clicked, requests the location permission, gets coordinates every 5 seconds (`Geolocation`), accumulates the distance with the `Location.CalculateDistance` method, and shows the time, distance, and pace; *Stop* ends the workout. On a device without location or without permission, an explanation is shown.

**3. Advanced level.** Create a .NET MAUI "Run log" application with pages for the current workout, the history, and workout details (Shell navigation with parameters). Route points are recorded with `Geolocation`, workouts (date, distance, duration, pace) are stored in SQLite, the history shows the best workout of the week and the total distance, and the details can be shared as text through `Share`. The calculations are moved into a separate class with unit tests.

### Variant 3. Pocket dictionary {#v3}

**1. Initial level.** Create a .NET MAUI application that contains 20 English words with translations in code and shows them in a `CollectionView`, and a `SearchBar` search field filters the words while typing.

**2. Basic level.** Create a .NET MAUI "Dictionary" application with MVVM in which the user adds "word – translation" pairs, searches by any part of a word, opens a word card on a separate Shell page, and marks words as learned. The translation direction and font size settings are stored in `Preferences`.

**3. Advanced level.** Create a .NET MAUI "Pocket dictionary" application with *Words*, *Quiz*, and *Settings* tabs. Words with topics are stored in SQLite, the initial dictionary is imported from a JSON file in `Resources/Raw`, the *Quiz* mode offers four translation options and keeps statistics of correct answers, and the settings in `Preferences` set the visual theme (`UserAppTheme`) and the number of questions. The quiz ViewModel has unit tests.

### Variant 4. Water tracker {#v4}

**1. Initial level.** Create a .NET MAUI application in which the *+200 ml*, *+300 ml*, and *+500 ml* buttons increase the amount of water drunk, a `ProgressBar` shows the progress toward a 2000 ml goal, and a label changes color when the goal is reached.

**2. Basic level.** Create a .NET MAUI "Water tracker" application in which the *+200 ml*, *+300 ml*, and *+500 ml* buttons add water intakes, a `ProgressBar` shows the progress toward a daily goal the user sets with a `Slider` (1000–4000 ml), a log of intakes with times is shown in a `CollectionView`, and a button undoes the last entry. The current day's data is stored in `Preferences`, and colors are set through `AppThemeBinding` for the light and dark themes.

**3. Advanced level.** Create a .NET MAUI "Water tracker" application with *Today*, *Week*, and *Settings* tabs: on *Today* buttons add water intakes (200, 300, 500 ml) with progress toward the goal. Entries are stored in SQLite, the *Week* page shows the total and a progress bar for each day of the week and the average, the goal is calculated from body weight (30 ml per 1 kg), and "reminders" are displayed as a label with the time of the next intake (a stub without notifications). The layout of the *Today* page changes for a phone and a computer (`OnIdiom`).

### Variant 5. Recipe gallery {#v5}

**1. Initial level.** Create a .NET MAUI application that shows six recipes defined in code (name, cooking time, difficulty) in a `CollectionView`, and selecting a recipe shows its description in a label below the list.

**2. Basic level.** Create a .NET MAUI "Recipes" application (name, category, cooking time, ingredients, steps; defined in code) with a list page grouped by category (`IsGrouped`) and a details page to which the recipe object is passed through `ShellNavigationQueryParameters`. The details page shows the ingredients and steps and has a *Share* button that shares the recipe text.

**3. Advanced level.** Create a .NET MAUI "Recipe gallery" application (name, cooking time, difficulty, ingredients, steps, photo) with search, a cooking time filter, favorite recipes (a separate tab), and a page for adding a recipe with a photo from `MediaPicker`. Recipes are stored in SQLite, photos in `AppDataDirectory`, and the list uses a `GridItemsLayout` with two columns on a phone and four on a computer.

### Variant 6. Trip expenses {#v6}

**1. Initial level.** Create a .NET MAUI application in which the user enters an amount, chooses a currency in a `Picker` (UAH, EUR, PLN with rates in code) and a category, clicks *Add*, and sees the expense in the list and the total in hryvnias.

**2. Basic level.** Create a .NET MAUI "Trip expenses" application with MVVM in which expenses (date `DatePicker`, amount, currency, category) are validated before adding, deleted with a swipe, and stored in a JSON file. A summary page shows the totals by category in hryvnias.

**3. Advanced level.** Create a .NET MAUI "Trip budget" application with several trips and expenses (date, amount, currency, category), a trip expenses page (a route with an ID) with the total in hryvnias, exchange rates that the user edits on the settings page, and export of expenses to a CSV file in `CacheDirectory` with the file passed through `Share` (`ShareFileRequest`). The data is stored in SQLite, and the currency conversion has unit tests.

### Variant 7. City museum catalog {#v7}

**1. Initial level.** Create a .NET MAUI application that shows a list of eight museums defined in code (name, address, opening hours) in a `CollectionView` and the label "Open now" for museums that are open at the current time.

**2. Basic level.** Create a simple ASP.NET Core Minimal API web service `GET /api/museums` (name, address, opening hours) and a .NET MAUI "Museums" application that loads the list of museums through `HttpClient` (the address `10.0.2.2` for the Android emulator), shows it in a `CollectionView`, shows an `ActivityIndicator` while loading, refreshes with a `RefreshView` gesture, and reports when the server is unavailable.

**3. Advanced level.** Create a .NET MAUI "Museum catalog" application (name, address, opening hours, coordinates) with *All*, *Favorites*, and *Nearby* tabs. The data is obtained from a local ASP.NET Core Minimal API web service (to be created) and cached in a JSON file for offline work (the network state is tracked by `Connectivity`), favorite museums are stored in `Preferences`, the *Nearby* tab sorts museums by distance from the current location (`Geolocation`), and a button on the details page opens the address on a map through `Launcher`.

### Variant 8. Mood diary {#v8}

**1. Initial level.** Create a .NET MAUI application in which the user chooses a mood with one of five buttons (from "very bad" to "great"), enters a comment, and sees the entry with the date in a list.

**2. Basic level.** Create a .NET MAUI "Mood diary" application with MVVM in which a day's entry (a score of 1–5, a comment) can be created once per date and changed on an edit page, the list shows the last 30 days, and a label shows the week's average score. Entries are stored in a JSON file.

**3. Advanced level.** Create a .NET MAUI "Mood diary" application with daily entries (date, a score of 1–5, a comment), access to which is protected by a four-digit PIN stored in `SecureStorage` (as a hash). Entries are stored in SQLite, the statistics page builds a bar chart of the week's mood from `BoxView` elements, and three failed PIN attempts block access for 30 seconds.

### Variant 9. Student planner {#v9}

**1. Initial level.** Create a .NET MAUI application with a daily timetable page: the user adds a class (time `TimePicker`, course name, room), and the list is sorted by time.

**2. Basic level.** Create a .NET MAUI "Student planner" application with *Schedule* and *Tasks* Shell tabs. The schedule tab shows the classes (day of the week, time, course, room) of the selected day, and the tasks tab shows tasks (title, course, deadline); tapping a task opens a details page with a string `id` parameter. The data is entered by the user and stored in JSON files.

**3. Advanced level.** Create a .NET MAUI "Student planner" application with a two-week timetable (odd and even weeks), tasks linked to courses, and a course page with a list of its classes and tasks. The data is stored in SQLite, the ViewModels and services are registered in DI, the current class is highlighted, and unit tests are written for determining the week and the next class.

### Variant 10. Receipt scanner {#v10}

**1. Initial level.** Create a .NET MAUI application in which the user enters the store name, the amount, and the purchase date, and the list of receipts shows the total for the current month.

**2. Basic level.** Create a .NET MAUI "Receipts" application (store, amount, date) in which a photo picked or taken through `MediaPicker` is attached to a receipt (with an `IsCaptureSupported` check), the photo is copied to `AppDataDirectory`, the list shows the receipts and the monthly total, and a details page shows the image, the amount, and the store.

**3. Advanced level.** Create a .NET MAUI "Receipt scanner" application (store, amount, date, category, a photo from `MediaPicker`) with expense categories, a report page for a selected period (totals by category and store), and deletion of a receipt together with its photo. Receipts are stored in SQLite, the report is exported to a text file and passed through `Share`, and photo compression is set with the `MaximumWidth` and `MaximumHeight` parameters.

### Variant 11. HIIT workout timer {#v11}

**1. Initial level.** Create a .NET MAUI application with an interval timer: the user sets the work and rest time in seconds and the number of rounds, and a label shows the phase and the remaining time.

**2. Basic level.** Create a .NET MAUI "HIIT timer" application in which the user sets the work and rest time in seconds and the number of rounds, with *Start*, *Pause*, and *Reset* buttons, a label with the phase and remaining time, a round progress bar, and a phase color change; at the end of each phase `HapticFeedback` is triggered (if `IsSupported`). The last settings are stored in `Preferences`.

**3. Advanced level.** Create a .NET MAUI "HIIT workouts" application with saved workout programs (warm-up, named exercise sets, cool-down) in SQLite, a program edit page, and a workout page that guides through the exercises and does not lose track when switching tabs. The timer logic is moved into a class with a time interface, for which unit tests are written.

### Variant 12. Plant tracker {#v12}

**1. Initial level.** Create a .NET MAUI application in which the user adds a plant (name, watering interval in days, date of the last watering), and the list shows the date of the next watering.

**2. Basic level.** Create a .NET MAUI "Plants" application with MVVM in which a plant has a name, a watering interval in days, and the date of the last watering, the list shows the date of the next watering, the *Watered* button updates the watering date, overdue plants are highlighted with a style with a `DataTrigger`, and a photo from `MediaPicker` can be attached to a plant. The data is stored in a JSON file.

**3. Advanced level.** Create a .NET MAUI "Plant tracker" application (name, watering interval, date of the last watering) with *Today* (plants that need watering), *All*, and *Settings* tabs, the watering history of each plant on the details page, and settings in `Preferences` (units, theme). The data is stored in SQLite, and the calculation of the watering schedule taking the season into account has unit tests.

### Variant 13. Unit converter {#v13}

**1. Initial level.** Create a .NET MAUI application that converts length between meters, feet, and inches: the user enters a number and chooses units in two `Picker` controls, and the result is updated immediately.

**2. Basic level.** Create a .NET MAUI "Converter" application for length, mass, and temperature with a choice of category, input validation, a unit swap button, and a history of the last ten conversions in a `CollectionView`, which is stored in `Preferences`.

**3. Advanced level.** Create a .NET MAUI "Unit converter" application with an adaptive layout: on a phone the categories open as a separate Shell page, and on a computer and a tablet they are shown next to the converter page (`OnIdiom`). The units and factors are loaded from a JSON file in `Resources/Raw`, the history is stored in SQLite, and the conversions have unit tests.

### Variant 14. Books to read {#v14}

**1. Initial level.** Create a .NET MAUI application in which the user adds a book (title, author, status "planned", "reading", "read" in a `Picker`), and the list shows the books with their status.

**2. Basic level.** Create a .NET MAUI "My library" application with MVVM for books (title, author, status "planned", "reading", "read") with a status filter, a rating of read books (1–5, `Stepper`), and a book edit page to which the object is passed through Shell navigation. Books are stored in SQLite.

**3. Advanced level.** Create a .NET MAUI "Reading list tracker" application (title, author, status, pages, rating) with *Library*, *Stats*, and *Settings* tabs, sorting and search, reading progress in pages, statistics of books by year, and a cover photo from `MediaPicker`. The data is stored in SQLite, the services are registered in DI, and the library ViewModel has unit tests.

### Variant 15. Bell schedule {#v15}

**1. Initial level.** Create a .NET MAUI application that shows a bell schedule (8 classes, defined in code) and highlights the current class based on the system time.

**2. Basic level.** Create a .NET MAUI "Bells" application with a bell schedule (8 classes, defined in code) that every second updates the label "Until the end of class: 23:15" or "Break: 07:40" (an `IDispatcherTimer`), shows a class progress bar, and supports the light and dark themes through `AppThemeBinding`.

**3. Advanced level.** Create a .NET MAUI "School bell schedule" application with several schedules (regular, shortened) that the user edits on a separate page with a check for overlapping intervals. The schedules are stored in a JSON file, the active schedule in `Preferences`, and the calculation of the current state has unit tests.

### Variant 16. Health metrics {#v16}

**1. Initial level.** Create a .NET MAUI application in which the user enters blood pressure (systolic and diastolic) and pulse, and the application adds the measurement with the time to a list and shows the blood pressure category.

**2. Basic level.** Create a .NET MAUI "Health" application with MVVM for measurements (time, systolic and diastolic pressure, pulse) with value range validation, a list of measurements for 30 days, the week's averages, and highlighting of out-of-range values. Measurements are stored in a JSON file.

**3. Advanced level.** Create a .NET MAUI "Health metrics tracker" application with blood pressure, pulse, and weight measurements, a weekly chart made of `BoxView` elements, export to CSV, and passing the file through `Share`. The data is stored in SQLite, and the statistics calculation has unit tests.

### Variant 17. Campus guide {#v17}

**1. Initial level.** Create a .NET MAUI application that shows university buildings defined in code (name, address, description) in a `CollectionView`, and tapping a building opens a details page.

**2. Basic level.** Create a .NET MAUI "Campus" application with a list of buildings (name, address, coordinates; defined in code) that requests the location permission, determines the current location, and shows the distance to each building (`Location.CalculateDistance`), sorting the list from the nearest. A denied permission is explained to the user.

**3. Advanced level.** Create a .NET MAUI "Campus guide" application with buildings (name, address, description, coordinates) on *Buildings*, *Nearby*, and *Favorites* tabs, a search for a room by number (the mapping of rooms to buildings is in a JSON file from `Resources/Raw`), and opening a building on a map through `Launcher`. Favorite buildings are stored in `Preferences`, and the nearest building calculation has unit tests.

### Variant 18. Network monitor {#v18}

**1. Initial level.** Create a .NET MAUI application that shows the current network state (`NetworkAccess`) and the connection types (`ConnectionProfiles`) and updates the label after *Refresh* is clicked.

**2. Basic level.** Create a .NET MAUI "Network" application that subscribes to the `ConnectivityChanged` event, updates the interface on the main thread, and adds each state change with the time to a `CollectionView` log. The subscription is removed when the page disappears.

**3. Advanced level.** Create a .NET MAUI "Network monitor" application that keeps a log of connection changes in SQLite, shows the duration of offline sessions during the day, periodically checks the availability of a given address through `HttpClient`, and exports the log to a file through `Share`. The network service is described by an interface and replaced in unit tests.

### Variant 19. Parking tracker {#v19}

**1. Initial level.** Create a .NET MAUI application in which the *Park here* button saves the current time and a text note (floor, spot) to `Preferences`, and after a restart the application shows the saved data.

**2. Basic level.** Create a .NET MAUI "Parking" application that saves the coordinates of the parking spot (`Geolocation`) with permission and a photo of the spot from `MediaPicker`, and shows the distance from the current location to the car and the elapsed time.

**3. Advanced level.** Create a .NET MAUI "Parking tracker" application that saves parking sessions (time, coordinates, note) with a history in SQLite, the parking cost at an hourly rate, a stub reminder about the end of the paid time, and opening the spot on a map through `Launcher`. The cost calculation has unit tests.

### Variant 20. Exam flash cards {#v20}

**1. Initial level.** Create a .NET MAUI application that shows ten "question – answer" cards (defined in code) in a `CarouselView`, and tapping a card flips it.

**2. Basic level.** Create a .NET MAUI "Flash cards" application (question – answer) with a `CarouselView` and an `IndicatorView`, flipping a card with a tap, *Know* and *Don't know* buttons, and a session summary. The user adds their own cards on a separate page, and the cards are stored in a JSON file.

**3. Advanced level.** Create a .NET MAUI "Exam cards" application with decks by course, showing difficult cards more often (spaced repetition), statistics of correct answers, and importing a deck from a file through `FilePicker`. The data is stored in SQLite, and the algorithm for choosing the next card has unit tests.

### Variant 21. Homework {#v21}

**1. Initial level.** Create a .NET MAUI application in which the user adds a task with a deadline (`DatePicker`), and the list is sorted by deadline and shows the number of days until it.

**2. Basic level.** Create a .NET MAUI "Homework" application with MVVM for tasks (title, deadline `DatePicker`) with a list sorted by deadline, a completion mark, deletion with a swipe, an "all / active / overdue" filter, and saving to a JSON file. Overdue tasks are highlighted with a style.

**3. Advanced level.** Create a .NET MAUI "Homework tracker" application with courses, priorities, a details page with nested subtasks and progress, stub "notifications" in the form of a list of the nearest deadlines on the main page, and saving to SQLite. The list ViewModel has unit tests.

### Variant 22. Tip calculator {#v22}

**1. Initial level.** Create a .NET MAUI application in which the user enters the bill amount and the tip percentage (`Slider` 0–25 %), and labels immediately show the tip and the total to pay.

**2. Basic level.** Create a .NET MAUI "Tips" application with MVVM in which the user enters the bill amount, the tip percentage (`Slider` 0–25 %), and the number of people (`Stepper`), and the application shows the tip, the total, and the amount per person rounded up to the nearest hryvnia, with input validation. The last percentage is stored in `Preferences`, and the layout uses a `Grid` and works in the light and dark themes.

**3. Advanced level.** Create a .NET MAUI "Bill split" application in which the bill's dishes are split among participants (each dish to one or several), the tip and discount are divided proportionally, and the total for each participant is passed through `Share`. The bill history is stored in SQLite, and the calculations have unit tests.

### Variant 23. Weather service client {#v23}

**1. Initial level.** Create a .NET MAUI application that, after *Load* is clicked, gets JSON with a forecast from a local ASP.NET Core web service through `HttpClient` and shows the temperature and weather description for a given city.

**2. Basic level.** Create a simple ASP.NET Core Minimal API web service with a five-day city weather forecast (date, temperature, description) and a .NET MAUI "Weather" application with MVVM that gets the forecast through `HttpClient` (the address `10.0.2.2` for the Android emulator), shows it in a `CollectionView`, refreshes through a `RefreshView`, and reports network errors.

**3. Advanced level.** Create a .NET MAUI "Weather service client" application that gets a forecast from a local ASP.NET Core Minimal API web service (to be created) through `HttpClient`, with several cities (the *Cities* tab), a cache of the last forecast in a JSON file for offline work (`Connectivity`), determination of the nearest city by location, and a temperature unit setting in `Preferences`. The HTTP service is described by an interface and replaced in unit tests.

### Variant 24. Volunteer contacts {#v24}

**1. Initial level.** Create a .NET MAUI application that shows a list of volunteers (name, phone, area) defined in code, and a `SearchBar` field filters the list by name.

**2. Basic level.** Create a .NET MAUI "Volunteers" application with a list of volunteers (name, phone, email, area), a volunteer details page, *Call* (`PhoneDialer`) and *Email* (`Email.ComposeAsync`) buttons with `FeatureNotSupportedException` handling, and adding a volunteer with phone and email validation.

**3. Advanced level.** Create a .NET MAUI "Volunteer contacts" application (name, phone, email, area, availability) with grouping by area, an availability mark, sending an email to several selected volunteers (`SelectionMode` `Multiple`), and importing contacts from a CSV file through `FilePicker`. The data is stored in SQLite, and the CSV parsing has unit tests.

### Variant 25. Builder's level {#v25}

**1. Initial level.** Create a .NET MAUI application that starts the `Accelerometer` and shows the *X*, *Y*, *Z* acceleration components with two decimal places, and on a device without the sensor shows the message "Accelerometer is not supported".

**2. Basic level.** Create a .NET MAUI "Level" application that calculates the device tilt angles from `Accelerometer` data, moves a "bubble" in a round frame, and shows "Level" when both angles are less than 1°. The sensor is started when the page appears and stopped when it disappears, and on a device without the sensor a message is shown.

**3. Advanced level.** Create a .NET MAUI "Builder's level" application that shows the device tilt angles and a "bubble" from `Accelerometer` data, with zero calibration (the offset is stored in `Preferences`), smoothing of readings with a moving average, saving of measurements with notes to SQLite, and a haptic signal (`HapticFeedback`) when level. The angle calculation and the filter have unit tests.

### Variant 26. Sleep tracker {#v26}

**1. Initial level.** Create a .NET MAUI application in which the user enters the time of falling asleep and waking up (`TimePicker`), and the application shows the sleep duration, taking crossing midnight into account.

**2. Basic level.** Create a .NET MAUI "Sleep" application with MVVM and a log of nights for two weeks (date, time of falling asleep and waking up `TimePicker`, duration taking crossing midnight into account, a quality score of 1–5), the week's average duration, and saving to a JSON file; the interface colors support the light and dark themes.

**3. Advanced level.** Create a .NET MAUI "Sleep tracker" application with *Go to bed* and *Wake up* buttons that record the current time, weekly and monthly statistics (shortest, longest, average night), a sleep goal in the settings, and saving to SQLite. The statistics calculation has unit tests.

### Variant 27. Vinyl collection {#v27}

**1. Initial level.** Create a .NET MAUI application in which the user adds a record (artist, album, year), and the list is sorted by artist.

**2. Basic level.** Create a .NET MAUI "Vinyl" application for a record collection (artist, album, year, a cover photo from `MediaPicker`) with a list, a details page, search by artist and album, and saving of records to SQLite.

**3. Advanced level.** Create a .NET MAUI "Vinyl collection tracker" application (artist, album, year, genre, condition, value, cover) with a grid of covers (`GridItemsLayout`), the collection value, a wish list on a separate tab, and export of the collection to CSV through `Share`. The data is stored in SQLite, the services are registered in DI, and the ViewModel has unit tests.

### Variant 28. Quest tour {#v28}

**1. Initial level.** Create a .NET MAUI application that shows a list of five quest points (name, hint, coordinates) defined in code and marks points as passed after a button is clicked.

**2. Basic level.** Create a .NET MAUI "Quest" application with a list of quest points (name, hint, coordinates; defined in code) that, on the *Check in* button, gets the current location (`Geolocation`) and counts the point if it is no more than 50 m away, and otherwise shows the distance to the point. Progress is stored in `Preferences`.

**3. Advanced level.** Create a .NET MAUI "Quest tour" application with several quests loaded from a JSON file, sequential unlocking of points, questions at each point, a results table with completion times in SQLite, and an arrival check that takes `Location.Accuracy` into account. The arrival check logic has unit tests.

### Variant 29. Fishing log {#v29}

**1. Initial level.** Create a .NET MAUI application in which the user records a catch (fish species, weight, date), and the list shows the total weight of the catch for the season.

**2. Basic level.** Create a .NET MAUI "Fishing" application with a list of catch entries (fish species, weight, date), an entry page that also saves the location coordinates (`Geolocation`), a photo of the catch from `MediaPicker`, and weather notes, and an entry details page. Entries are stored in a JSON file.

**3. Advanced level.** Create a .NET MAUI "Fishing log" application with catch entries (fish species, weight, date, place), favorite places, catch statistics by place and fish species, a period filter, saving to SQLite, and sharing an entry with a map link through `Share`. The statistics have unit tests.

### Variant 30. Blood donation tracker {#v30}

**1. Initial level.** Create a .NET MAUI application in which the user enters the date of the last donation, and the application shows the date of the next possible donation 60 days later and the number of days until it.

**2. Basic level.** Create a .NET MAUI "Donation" application with MVVM, a donation log (date, type: whole blood or plasma; minimum intervals between donations defined in code), date validation, and saving to a JSON file. A label shows the nearest possible date for each type.

**3. Advanced level.** Create a .NET MAUI "Blood donation tracker" application with a donor profile (blood type, sex) in `SecureStorage`, a donation log in SQLite, a limit on the number of donations per year, a stub reminder on the main page, and a statistics page. The date calculation rules are moved into a class with unit tests.

## Procedure

1. Study the theory and the worked examples; make sure the *.NET Multi-platform App UI development* workload is installed.
2. Create a *.NET MAUI App* project (.NET 10), plan the pages, Shell routes, models, ViewModels, and services; register them in `MauiProgram`.
3. Create XAML pages with layout, styles, and compiled bindings (`x:DataType`), and implement the ViewModels with CommunityToolkit.Mvvm and data storage.
4. Build the project without warnings and test the application on *Windows Machine* with valid, invalid, and boundary data and with window resizing.
5. Run the application in the Android emulator or on your own phone, and check the permissions and device services (for sensors and a camera missing on Windows, a message about the unsupported feature).
6. Demonstrate the application to the instructor, explain the code, and answer the review questions.
