---
title: "Tasks"
description: "Topic 3. Windows Forms fundamentals: task variants"
outline: [2, 3]
sourceHash: "8b91615a05608aa5c1a3d849068fa7ecf65d0b4df51c8298dce2ebabebf6c0f7"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Loan calculator {#v1}

**1. Initial level.** Create a Windows Forms application in which the user enters the loan amount, the annual rate (%), and the term in months in `NumericUpDown` fields, clicks the *Calculate* button, and sees the monthly annuity payment, the total amount paid, and the overpayment in a label.

**2. Basic level.** Create a Windows Forms loan calculation application in which the user selects the repayment scheme in a `ComboBox` (annuity or equal principal installments) and enters the amount (from 1,000 to 5,000,000 UAH), the rate, and the term in text fields. Invalid values are marked with `ErrorProvider`, and the payment schedule (month, payment, principal, interest, balance) is displayed in a `DataGridView` with a totals line in a `StatusStrip`.

**3. Advanced level.** Create a "Loan calculator" Windows Forms application with a main menu *File* (*Export CSV…*, *Exit*) and *Tools* (*Settings…*). From the amount, rate, term, and repayment scheme (annuity or equal installments), the main form builds a payment schedule in a `DataGridView` that takes into account monthly early repayments and the first payment date (`DateTimePicker`). A modal settings form sets the currency and the number of decimal places and saves them to a JSON file in the `%APPDATA%` folder. The export command writes the schedule to a CSV file via `SaveFileDialog`; write errors are shown in a `MessageBox`.

### Variant 2. Pizza order {#v2}

**1. Initial level.** Create a Windows Forms application in which the user selects the pizza size with `RadioButton` buttons (25, 30, or 40 cm) and extra toppings with `CheckBox` check boxes, and a label shows the order cost immediately after each change.

**2. Basic level.** Create a Windows Forms pizza ordering application with the kind selected in a `ComboBox`, the size in a `GroupBox`, toppings in a `CheckedListBox`, and the quantity in a `NumericUpDown`. The customer name and phone fields are validated with `ErrorProvider`; the *Order* button is available only when the data is valid and shows a receipt in a `MessageBox` with a 10% discount on orders over 1,000 UAH.

**3. Advanced level.** Create a "Pizzeria" Windows Forms application with a main order form (a cart of items in a `ListBox` with a *Remove* context menu), a modal confirmation form that shows the receipt and returns a `DialogResult`, and an order history form with a `DataGridView` and a date filter. The menu (pizza and topping prices) is loaded from a JSON file, and confirmed orders are appended to another JSON file. Buttons and menu items have access keys and shortcut keys.

### Variant 3. Currency converter {#v3}

**1. Initial level.** Create a Windows Forms application in which the user enters an amount in hryvnias, selects a currency (USD, EUR, PLN) in a `ComboBox` with rates defined in the program, and after clicking a button sees the amount in the selected currency with two decimal places.

**2. Basic level.** Create a Windows Forms currency exchange application with two `ComboBox` lists ("from" and "to" currency), a button to swap the direction, and an amount field validated with `ErrorProvider` (a positive number no greater than 1,000,000). The result is recalculated as the user types, and each completed conversion is added to a `ListBox` history in the format "100.00 USD → 4,150.00 UAH".

**3. Advanced level.** Create an "Exchange office" Windows Forms application that loads exchange rates from a JSON file, shows them in a `DataGridView`, and converts amounts between any two currencies. A modal *Edit Rates* form lets you add, change, and delete rates with validation of the currency code (three Latin letters) and the value; after confirmation, the rates are saved to the file. The *File* menu opens another rates file via `OpenFileDialog`.

### Variant 4. Applicant form {#v4}

**1. Initial level.** Create a Windows Forms application with surname, first name, and date of birth (`DateTimePicker`) fields and a *Submit* button that shows the entered data and the applicant's age in full years in a `MessageBox`.

**2. Basic level.** Create an "Applicant form" Windows Forms application with fields for the full name, email, phone, date of birth, major (`ComboBox`), and scores in three subjects (`NumericUpDown`, 100–200). All fields are validated in `Validating` events with `ErrorProvider`; the age must be from 16 to 60 years. After successful validation, the application shows the admission score with the weighting coefficients of the selected major.

**3. Advanced level.** Create an "Admissions office" Windows Forms application with an application list form (`DataGridView` sorted by admission score) and a modal form for creating and editing an application with validation of all fields. Applications are saved to a JSON file chosen through the *File* menu (*Open…*, *Save*, *Save As…*); when closing with unsaved changes, the application offers to save them. The status bar shows the number of applications and the average score.

### Variant 5. Quiz {#v5}

**1. Initial level.** Create a Windows Forms application that shows one question with four `RadioButton` answer options and a *Check* button; after checking, a label reports whether the answer is correct, and the correct option is highlighted in bold.

**2. Basic level.** Create a "Quiz" Windows Forms application with ten questions defined in the program. Questions are shown one at a time, the *Next* button is available only after an answer is chosen, a `ProgressBar` shows progress, and a `Timer` gives 20 seconds per answer and automatically moves to the next question. At the end, a `MessageBox` shows the result as a percentage.

**3. Advanced level.** Create a "Quiz" Windows Forms application that loads questions from a JSON file (text, options, number of the correct one, points) chosen via `OpenFileDialog`, shuffles them, and runs a test with a timer for each question. A modal summary form shows the result and a table of answers with mistakes marked. Results (name, date, points) are appended to a file, and a high-score form shows the ten best results.

### Variant 6. Patient records {#v6}

**1. Initial level.** Create a Windows Forms application with fields for the patient's surname, year of birth (`NumericUpDown`), and diagnosis and an *Add* button that adds a "surname, age, diagnosis" line to a `ListBox`.

**2. Basic level.** Create a "Patient records" Windows Forms application with a list of patients in a `DataGridView` (bound to a `BindingList<T>`) and a surname search field that filters the table as the user types. When adding a patient, the surname (letters, apostrophe, and hyphen only), the date of birth (not in the future), and the phone number are validated; errors are shown by `ErrorProvider`.

**3. Advanced level.** Create a "Reception desk" Windows Forms application with a main form listing patients (surname, date of birth, phone) and modal forms for adding a patient and booking an appointment (a doctor in a `ComboBox`, a date and time validated to be free and within working hours). The table's context menu contains commands for editing, deleting with confirmation, and viewing a patient's appointments. Data is saved to a JSON file on closing and loaded at startup.

### Variant 7. To-do list {#v7}

**1. Initial level.** Create a Windows Forms application with an input field, an *Add* button, and a `CheckedListBox` in which checked tasks can be deleted with a *Remove done* button.

**2. Basic level.** Create a "To-do list" Windows Forms application in which a task has a name, a priority (`ComboBox`: Low, Normal, High), and a due date (`DateTimePicker`). An empty name and a due date in the past are not allowed (`ErrorProvider`). A `ComboBox` filter shows all, active, or overdue tasks, and a label shows the number of tasks by priority.

**3. Advanced level.** Create a "Task planner" Windows Forms application with a table of tasks (name, priority, due date, done flag) in a `DataGridView`, a `ToolStrip` toolbar (add, edit, mark as done), a context menu, and a modal edit form. The application saves tasks to a JSON file and settings (window size and position, last filter) to a separate file, and restores them at startup. Overdue tasks are shown in bold, and the status bar shows the number of unfinished tasks.

### Variant 8. Fuel calculator {#v8}

**1. Initial level.** Create a Windows Forms application in which the user enters the distance (km), fuel consumption (l/100 km), and price per liter and after clicking a button sees the required fuel volume and the trip cost.

**2. Basic level.** Create a "Fuel calculator" Windows Forms application with a choice of fuel type (`RadioButton`: gasoline, diesel, LPG) with prices defined in the program, a "round trip" check box, and distance and consumption fields with range validation through `ErrorProvider`. The result shows the volume, the cost, and the share of each passenger (`NumericUpDown`).

**3. Advanced level.** Create a "Trip log" Windows Forms application with a table of trips (date, route, distance, fuel volume, cost) and a modal form for adding a trip with field validation. A separate statistics form shows the average consumption, the total costs for the selected month, and the most expensive trip. Fuel prices are edited in a settings form and saved together with the trips to JSON files; the *File* menu exports the log to CSV.

### Variant 9. Class timetable {#v9}

**1. Initial level.** Create a Windows Forms application in which a `TableLayoutPanel` with five columns (days of the week) and four rows (class periods) contains labels with course names defined in the program, and clicking a label shows the day, period number, and course in a `MessageBox`.

**2. Basic level.** Create a "Class timetable" Windows Forms application in which the weekly table is built from a `TableLayoutPanel` and buttons. Clicking a cell opens a modal form with course, room, and class type (`ComboBox`) fields; an empty course is not allowed, and a *Clear* button frees the cell. The table stretches together with the window.

**3. Advanced level.** Create a "Group timetable" Windows Forms application with a group selected in a `ComboBox`, a weekly table (days and periods) on a `TableLayoutPanel`, and a modal form for editing a class (course, room, class type). The application checks for conflicts (the same room at the same time in another group) and reports them. The timetables of all groups are saved to a single JSON file through the *File* menu, and the *Print to file* command writes the selected group's timetable to a text file as a table.

### Variant 10. Movie catalog {#v10}

**1. Initial level.** Create a Windows Forms application with a `ListBox` of five movies defined in the program; after a movie is selected, labels show the year, genre, and rating, and a `PictureBox` shows the poster from a file next to the program.

**2. Basic level.** Create a "Movie catalog" Windows Forms application (title, year, genre, rating, poster; movies defined in the program) with a filter by genre (`ComboBox`) and minimum rating (`TrackBar`), a list of movies matching the filter, and a details panel. A *Poster…* button selects an image via `OpenFileDialog` and checks that the file is an image; an error is shown in a `MessageBox`.

**3. Advanced level.** Create a "Film library" Windows Forms application with a table of movies, a modal add and edit form (title, year, genres in a `CheckedListBox`, rating, poster), a main form split by a `SplitContainer` (the table and a details panel with the poster), and search by title. The catalog is saved to a JSON file, and posters are copied to the application's data folder; the *View* menu switches sorting by title, year, or rating.

### Variant 11. Cash register {#v11}

**1. Initial level.** Create a Windows Forms application in which the user selects a product in a `ComboBox` with prices defined in the program, enters the quantity in a `NumericUpDown`, and clicks *Add*; the product is added to a `ListBox`, and a label shows the total amount.

**2. Basic level.** Create a "Checkout" Windows Forms application in which a product with prices defined in the program is selected in a `ComboBox` and added with a quantity to a `DataGridView` cart (product, price, quantity, amount); items can be removed, and a discount is set by a promo code in a text field (checked against a list of codes, with errors shown by `ErrorProvider`). The *Pay* button opens a `MessageBox` with the amount due and the change from the cash paid.

**3. Advanced level.** Create a "Cash register" Windows Forms application with a product directory in a JSON file, product search by code or name, a cart in a `DataGridView`, and a modal payment form (cash or card, validation of the amount paid). After payment, the receipt is saved to a text file with a number, date, and time, and the *Reports* menu shows the daily revenue.

### Variant 12. Athlete records {#v12}

**1. Initial level.** Create a Windows Forms application with fields for an athlete's name and result in seconds and an *Add* button that adds the athlete to a `ListBox`; the *Best* button shows the athlete with the best (lowest) time in a `MessageBox`.

**2. Basic level.** Create a "Running competition" Windows Forms application in which results (name, country, time in the `mm:ss.ss` format) are entered with format validation and shown in a `DataGridView` sorted by time. The status bar shows the number of participants and the best time.

**3. Advanced level.** Create a "Tournament" Windows Forms application with several events (`ComboBox`), a results table for each event (athlete, country, result, place), a modal form for adding a result, and a form with the overall ranking of countries by medals. Competition data is opened and saved to JSON files through the *File* menu; the *Export* command writes the results sheet of the selected event to CSV.

### Variant 13. Recipe notebook {#v13}

**1. Initial level.** Create a Windows Forms application with a list of recipe names (`ListBox`) and a multiline `TextBox` that shows the text of the selected recipe; the recipes are defined in the program.

**2. Basic level.** Create a "Recipe book" Windows Forms application with a main menu *File* (*New*, *Open…*, *Save*, *Exit*) in which a recipe has a name, a category, a list of ingredients, and cooking instructions. An empty name is not allowed, and when closing with unsaved changes, the application asks whether to save the recipe to a text file.

**3. Advanced level.** Create a "Cookbook" Windows Forms application (recipe: name, category, ingredients, cooking instructions) with a `TreeView` category tree, a list of recipes, a preview panel, and a modal recipe edit form. Search by ingredient shows the recipes that contain it, and a *Shopping list* form collects the ingredients of the selected recipes. The book is saved to a JSON file; the preview font size is chosen with `FontDialog` and saved in the settings.

### Variant 14. Typing speed test {#v14}

**1. Initial level.** Create a Windows Forms application that shows a sample sentence; the user types it into a field, and after clicking *Done*, a label shows the typing time in seconds and the number of characters per minute.

**2. Basic level.** Create a "Typing trainer" Windows Forms application in which timing starts with the first character typed, a `Timer` updates the time and speed label every second, and each error (a character that does not match the sample) is counted. After completion, the field is locked, and a `MessageBox` shows the speed and accuracy as a percentage.

**3. Advanced level.** Create a "Typing trainer" Windows Forms application with a choice of difficulty level, texts from a file, highlighting of the current position in the sample (`RichTextBox`), and a high-score table in a modal form. High scores (name, date, speed, accuracy) are saved to a JSON file, and the level and test duration (1–5 minutes) to a settings file.

### Variant 15. Hotel booking {#v15}

**1. Initial level.** Create a Windows Forms application with two `DateTimePicker` controls (check-in and check-out), a room type selection in a `ComboBox` with prices per night, and a button that shows the number of nights and the cost.

**2. Basic level.** Create a "Booking" Windows Forms application in which the user selects the room type (price per night and capacity defined in the program), check-in and check-out dates, the number of guests, and breakfast (a check box). The check-in date cannot be in the past, and check-out must be later than check-in (`ErrorProvider`); the number of guests is limited by the room's capacity. The cost, taking into account weekends (+20%) and a discount from 7 nights, is displayed in a label with the calculation.

**3. Advanced level.** Create a "Hotel" Windows Forms application with a list of bookings (guest, room, check-in and check-out dates, cost) in a `DataGridView`, a modal booking creation form that does not allow overlapping dates for the same room, and a room occupancy form for the selected month. Bookings are saved to a JSON file, and a booking is canceled from the context menu with confirmation.

### Variant 16. Grade records {#v16}

**1. Initial level.** Create a Windows Forms application in which the user enters five student grades (`NumericUpDown`, 0–100) and after clicking a button sees the average score and the ECTS grade.

**2. Basic level.** Create a "Grade book" Windows Forms application with a `DataGridView` table (student and grades in five courses) in which entered values are validated (integers 0–100), the average score is calculated in a separate column, and the rows of students with an average below 60 are shown in bold.

**3. Advanced level.** Create an "Electronic grade book" Windows Forms application with a choice of group and course, a grade table, a modal form for adding a student, and a statistics form (group average, distribution on the ECTS scale, list of students with failing grades). The grade book is opened and saved to JSON files through the *File* menu, and the grade sheet of the selected course is exported to CSV.

### Variant 17. Unit converter {#v17}

**1. Initial level.** Create a Windows Forms application that converts length: the user enters a value, selects the "from" and "to" units in two `ComboBox` lists (mm, cm, m, km, inch, foot), and sees the result after clicking a button.

**2. Basic level.** Create a "Unit converter" Windows Forms application with quantity categories (length, mass, temperature, speed) in a `ComboBox` that determine the list of units. The value is validated with `ErrorProvider` (for temperature, not below absolute zero), the result updates as the user types, and each conversion is added to a `ListBox` history.

**3. Advanced level.** Create a "Unit converter" Windows Forms application that loads categories and unit coefficients from a JSON file, lets you add custom units in a modal form with validation, and saves the conversion history to a file. The history's context menu copies the result to the clipboard or repeats the conversion.

### Variant 18. ATM {#v18}

**1. Initial level.** Create a Windows Forms application in which the user enters a PIN in a field with `UseSystemPasswordChar`, and after the correct code a label shows the account balance.

**2. Basic level.** Create an "ATM" Windows Forms application with a modal PIN entry form (three attempts, after which the program exits) and a main operations form: viewing the balance, withdrawing cash (an amount that is a multiple of 100, no more than the balance and 10,000 UAH at a time), and depositing. Each operation is added to a `ListBox` log with the time and amount.

**3. Advanced level.** Create an "ATM" Windows Forms application with several cards stored in a JSON file (number, PIN hash, balance, daily limit), a card selection form, a PIN form, an operations form, and a statement form with a `DataGridView` for the selected period. Operations and new balances are saved to the file; an on-screen keypad of `0`–`9` buttons uses one handler for all buttons.

### Variant 19. Tool rental {#v19}

**1. Initial level.** Create a Windows Forms application in which the user selects a tool in a `ComboBox` with a daily price, sets the rental and return dates (`DateTimePicker`), and sees the cost.

**2. Basic level.** Create a "Tool rental" Windows Forms application (tools with daily prices defined in the program) with a rental form (customer, phone, tool, return date with validation) and a list of rented tools. On return, the application calculates a penalty of 50% of the daily price for each day overdue and shows the calculation in a `MessageBox`.

**3. Advanced level.** Create a "Rental point" Windows Forms application with tool and customer directories (`DataGridView` on separate `TabControl` tabs), modal rental and return forms, overdue rentals shown in bold, and a monthly revenue report. All data is saved to JSON files, and the deposit and penalty percentage are set in a settings form.

### Variant 20. Tic-tac-toe game {#v20}

**1. Initial level.** Create a Windows Forms application with nine buttons forming a 3×3 board, on which "X" and "O" are placed in turn; all buttons are handled by a single `Click` event handler.

**2. Basic level.** Create a "Tic-tac-toe" Windows Forms application with a board on a `TableLayoutPanel` that stretches together with the window, win and draw detection, a `MessageBox` with the result, the players' score in a `StatusStrip`, and a *New game* button.

**3. Advanced level.** Create a "Tic-tac-toe" Windows Forms application with a game against the computer (a simple algorithm: win, block, center, corner), a choice of board size 3×3 or 5×5 (four in a row wins) in a modal settings form, player names, and a results table saved to a JSON file. The *Game* menu has the items *New*, *Undo* (undo the last move), and *Exit* with shortcut keys.

### Variant 21. Car service records {#v21}

**1. Initial level.** Create a Windows Forms application with fields for the car's plate number, work description, and cost and an *Add* button that adds a work order to a `ListBox` and updates the total amount.

**2. Basic level.** Create a "Car service" Windows Forms application with a table of work orders (plate number, customer, work, cost, status in a `ComboBox`: New, In progress, Done), plate number validation against the `AA1234BB` pattern, and a status filter. The status bar shows the number of unfinished orders and the total for completed ones.

**3. Advanced level.** Create a "Car service" Windows Forms application with a main orders form, a modal work order form with a list of jobs and parts (a `DataGridView` in the form), a directory of mechanics, and search by plate number. The status is changed from the context menu, and a completed work order is printed to a text file. All data is saved to JSON files.

### Variant 22. Pomodoro timer {#v22}

**1. Initial level.** Create a Windows Forms application with a 25:00 countdown label, *Start* and *Pause* buttons, and a `Timer` component that decreases the time every second and shows a `MessageBox` when it finishes.

**2. Basic level.** Create a "Pomodoro" Windows Forms application in which the durations of work, short breaks, and long breaks are set with `NumericUpDown` (1–60 min), cycles change automatically (a long break after four work intervals), a `ProgressBar` shows progress, and the window title shows the remaining time. The *Reset* button stops the cycle.

**3. Advanced level.** Create a "Pomodoro" Windows Forms application—a timer of work intervals and breaks—with a settings form (durations, a `SystemSounds` alert sound, automatic start of the next interval) saved to a JSON file, the name of the current task, and a session log. A statistics form shows the number of work intervals and the total time for each day in a `DataGridView`.

### Variant 23. Password generator {#v23}

**1. Initial level.** Create a Windows Forms application that, when a button is clicked, generates a password of the length set in a `NumericUpDown` (8–32) from uppercase and lowercase Latin letters and digits and shows it in a read-only field.

**2. Basic level.** Create a "Password generator" Windows Forms application with check boxes for character groups (uppercase letters, lowercase letters, digits, special characters); at least one group is required (`ErrorProvider`), and the password contains characters from each selected group. A label rates the strength (Weak, Medium, Strong), and the *Copy* button copies the password to the clipboard.

**3. Advanced level.** Create a "Password generator" Windows Forms application with "password" and "passphrase of English words from a file" modes, generation of several passwords in a `ListBox` with a *Copy* context menu, an entropy estimate in bits, and settings saved to a JSON file. Passwords are generated by the cryptographically secure `RandomNumberGenerator`, and saving passwords to a file requires confirmation.

### Variant 24. Library records {#v24}

**1. Initial level.** Create a Windows Forms application with a list of books defined in the program and an *Issue* button that marks the selected book as issued and prevents it from being issued again.

**2. Basic level.** Create a "Library" Windows Forms application with a table of books (author, title, year, status; books defined in the program) in a `DataGridView` with a `BindingList<T>` and a form for lending a book to a reader with a return date (no more than 30 days). Search filters books by author or title.

**3. Advanced level.** Create a "Library" Windows Forms application with two directory forms (books and readers), modal lending and return forms, a form of overdue loans, and a reader's loan history. Data is saved to JSON files; the *Reports* menu exports the list of overdue books to CSV.

### Variant 25. Calorie calculator {#v25}

**1. Initial level.** Create a Windows Forms application in which the user selects a food in a `ComboBox` with calories per 100 g defined in the program, enters the portion weight, and sees the number of kilocalories.

**2. Basic level.** Create a "Food diary" Windows Forms application with a food directory (protein, fat, carbohydrates, and calories per 100 g) defined in the program, adding foods to the day's diet (food, weight validated at 1–2000 g), a diet table with protein, fat, carbohydrates, and calories, and a daily total. The daily target is set with a `NumericUpDown`, and exceeding it is indicated by a label and a `MessageBox`.

**3. Advanced level.** Create a "Calorie calculator" Windows Forms application with a food directory in a JSON file and a form for editing it, the diet for the selected date (`DateTimePicker`), a form for calculating the daily requirement with the Mifflin–St Jeor formula, and weekly statistics. Diets are saved to a file, and the *File* menu exports the day's diet to CSV.

### Variant 26. Vehicle register {#v26}

**1. Initial level.** Create a Windows Forms application with fields for the make, model, year of manufacture, and license plate and a *Register* button that adds the car to a `ListBox`.

**2. Basic level.** Create a "Vehicle register" Windows Forms application with a table of vehicles and a registration form in which the license plate is validated against the `AA1234BB` pattern, the VIN is checked for 17 characters without the letters I, O, Q, and the year is within 1950 to the current year. Registering the same plate twice is not allowed; errors are shown by `ErrorProvider`.

**3. Advanced level.** Create a "Vehicle register" Windows Forms application with a main search form (by plate number, VIN, owner), modal forms for registering a car and changing its owner, the car's ownership history, and a filter by vehicle type. The register is saved to a JSON file, and the *File* menu imports records from CSV with a message about the number of rejected lines.

### Variant 27. Memory game {#v27}

**1. Initial level.** Create a Windows Forms application with eight buttons hiding four pairs of numbers; a click reveals the number on a button, and a revealed pair of identical numbers is disabled.

**2. Basic level.** Create a "Memory" Windows Forms application with a 4×4 board on a `TableLayoutPanel`, shuffled pairs, two different cards hidden again after one second using a `Timer`, and counters of attempts and game time. After all pairs are found, a `MessageBox` shows the result, and the *New game* button shuffles the cards.

**3. Advanced level.** Create a "Memory" Windows Forms application with a choice of board size (4×4, 6×6) in a settings form, images on the cards from the application folder, a two-player mode counting each player's pairs, and a high-score table in a modal form. High scores and settings are saved to JSON files.

### Variant 28. Workout records {#v28}

**1. Initial level.** Create a Windows Forms application in which the user selects an exercise in a `ComboBox`, enters the number of sets, reps, and weight, and sees the total workout volume (sets × reps × weight).

**2. Basic level.** Create a "Workout diary" Windows Forms application with adding exercises to the workout for the selected date, a table of sets with value validation (reps 1–100, weight 0–500 kg), and a workout summary: number of exercises, volume, duration.

**3. Advanced level.** Create a "Workout tracker" Windows Forms application with an exercise directory, a workout log, a modal workout form, and a weekly progress form (volume by day in a `DataGridView`, the best result for each exercise). Data is saved to JSON files, and the *File* menu exports the log for the selected period to CSV.

### Variant 29. Address book {#v29}

**1. Initial level.** Create a Windows Forms application with a list of contacts defined in the program and labels that show the phone and email of the selected contact.

**2. Basic level.** Create an "Address book" Windows Forms application with a `SplitContainer`: on the left, a list of contacts with groups (family, work, friends) in a `ComboBox` filter; on the right, contact fields with email and phone validation through `ErrorProvider` and *Save* and *Delete* (with confirmation) buttons.

**3. Advanced level.** Create an "Address book" Windows Forms application with a `TreeView` of groups, a list of contacts, a modal contact edit form with a photo (`PictureBox`, `OpenFileDialog`), and import of contacts from CSV through the *File* menu with validation of each line and an error report. The book is saved to a JSON file.

### Variant 30. Flower shop {#v30}

**1. Initial level.** Create a Windows Forms application in which the user sets the number of roses, tulips, and chrysanthemums in `NumericUpDown` controls with prices defined in the program and sees the cost of the bouquet.

**2. Basic level.** Create a "Flower shop" Windows Forms application for composing a bouquet from items (a flower in a `ComboBox`, quantity), with a table of items, packaging (`RadioButton`), and a greeting card (`CheckBox` with text up to 100 characters). The bouquet must contain an odd number of flowers, otherwise `ErrorProvider` shows an error; the cost updates after each change.

**3. Advanced level.** Create a "Flower store" Windows Forms application with a catalog of flowers and stock in a JSON file, a bouquet builder, a modal checkout form (customer, phone, address, delivery date and time with validation), and an order list form with a filter by delivery date. After checkout, stock decreases, and orders are saved to a file.

## Procedure

1. Study the theory and worked examples.
2. Sketch each form, determine the controls, their names, and events; create a *Windows Forms App* (.NET 10) project in Visual Studio 2026.
3. Place the controls in the form designer and configure the layout (`Anchor`, `Dock`, layout panels), the **Tab** order, access keys, `AcceptButton`, and `CancelButton`.
4. Implement event handlers, input validation (`ErrorProvider`, `MessageBox`), and file handling; move calculations into separate methods or classes.
5. Build the project without warnings and test the application on valid, invalid, and edge-case data, including resizing the window.
6. Demonstrate the application to your instructor, explain the code, and answer the review questions.
