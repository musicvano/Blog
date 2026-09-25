---
title: "Tasks"
description: "Topic 12. WPF fundamentals: task variants"
outline: [2, 3]
sourceHash: "3095b47833a7a6061a74e7de95306f4b440113421e7b27e0fe173a2ee2cba1ac"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Mortgage calculator {#v1}

**1. Initial level.** Create a WPF application in which the user enters the home price, the down payment, the annual rate, and the term in years into fields laid out on a `Grid` panel, and after clicking the *Calculate* button sees the monthly annuity payment and the total interest paid.

**2. Basic level.** Create a WPF "Mortgage" application with fields for the price (up to 50,000,000 UAH), the down payment (at least 15 %), the rate, and the term, and a `Slider` for the term. Invalid fields are marked with error text below the field, and a `ListView` table shows the monthly payment schedule (month, payment, principal, interest, balance) with a total in the `StatusBar`.

**3. Advanced level.** Create a WPF "Mortgage calculator" application that builds a payment schedule from the home price, down payment, rate, and term, with a *File* menu (*Open…*, *Save…*, *Exit*), `TabControl` tabs for the annuity and classic schemes, and a modal window comparing two calculations. A calculation is saved to a JSON file and opened from it through `SaveFileDialog` and `OpenFileDialog`; read errors are shown in a `MessageBox`, and the *Open* and *Save* commands have the **Ctrl+O** and **Ctrl+S** keys.

### Variant 2. Bank customer form {#v2}

**1. Initial level.** Create a WPF application with a customer form (last name, first name, date of birth `DatePicker`, phone) laid out with a `Grid` panel and a *Submit* button that shows the entered data in a `MessageBox`.

**2. Basic level.** Create a WPF "Bank customer form" application with three `TabControl` tabs (personal data, contacts, income) and *Back* and *Next* buttons. Moving to the next tab is possible only after the fields of the current one are validated (age 18 or older, phone, positive income), and errors are shown in a red `TextBlock` below the field.

**3. Advanced level.** Create a WPF "Loan application" application with step-by-step filling on tabs (personal data, contacts, income, loan amount) with field validation, a summary page for reviewing all data, and a modal confirmation window with `DialogResult`. Confirmed applications are appended to a JSON file, and the main menu opens a window with the list of submitted applications with search by last name. The fields have access keys, and the buttons have `IsDefault` and `IsCancel`.

### Variant 3. Restaurant menu {#v3}

**1. Initial level.** Create a WPF application that shows a restaurant menu of eight dishes as cards (name, price) on a `WrapPanel`; clicking a card adds the dish to the order list and updates the total.

**2. Basic level.** Create a WPF "Restaurant menu" application with dish cards (name, category, price; defined in code) on a `WrapPanel` in a `ScrollViewer`, a `ComboBox` category filter, and a `ListBox` cart with the quantity of each dish and the total. One handler of the bubbling `Click` event attached to the panel serves all *Add* buttons, and the *Order* button is available only for a non-empty cart.

**3. Advanced level.** Create a WPF "Restaurant" application that loads the menu (category, name, price, image file) from a JSON file and builds the cards with a `DishCard` user control with the `Title` and `Price` dependency properties. The cart lets you change quantities and remove items, a modal confirmation window shows a receipt with a 10 % discount on orders over 1,000 UAH, and orders are saved to a file.

### Variant 4. World clock {#v4}

**1. Initial level.** Create a WPF application that shows the current time in Madrid, London, and New York in three `Grid` rows and updates it every second with a `DispatcherTimer`.

**2. Basic level.** Create a WPF `CityClock` user control with a `TimeZoneId` dependency property that shows the city name and the time and date in that time zone. The main window contains six such elements on a `UniformGrid` and a `ComboBox` list for adding a city; an invalid time zone ID shows the label *Unknown time zone*.

**3. Advanced level.** Create a WPF "World clock" application with a user control for an analog clock face on a `Canvas` (the hands are `Line` elements, a `Time` dependency property) and a digital caption. The list of cities is saved to a JSON file, the *Clocks* menu adds a city through a modal search window and removes the selected one, and a *12h/24h* toggle changes the format of all clocks.

### Variant 5. Notepad {#v5}

**1. Initial level.** Create a WPF "Notepad" application with a multiline `TextBox` filling the whole window and *Open* and *Save* buttons that open and save a text file through `OpenFileDialog` and `SaveFileDialog`.

**2. Basic level.** Create a WPF "Notepad" application with a `Menu` (*File*: *New*, *Open…*, *Save*, *Exit*; *Edit*: *Cut*, *Copy*, *Paste*), a `ToolBar`, and a status bar with the number of lines and characters. The menu and the buttons use the built-in `ApplicationCommands` commands, and *Save* is available only when there are unsaved changes.

**3. Advanced level.** Create a WPF "Notepad" application with several documents on `TabControl` tabs, an unsaved-changes mark in the tab header, a prompt to save when a tab or the window is closed, a find-and-replace dialog (a modal window), and a list of the last five files in the menu that persists between runs. File operation errors are shown in a `MessageBox`.

### Variant 6. Plant catalog {#v6}

**1. Initial level.** Create a WPF application in which a `TreeView` contains plant families and plants, and after a plant is selected its name and a short description are shown on the right.

**2. Basic level.** Create a WPF "Plant catalog" application (the data is defined in code) with a `TreeView` by family, a `GridSplitter`, and a card of the selected plant (name, Latin name, care conditions, an `Image` photo from the project resources). A search field expands and selects the first plant whose name contains the entered text, or reports that nothing was found.

**3. Advanced level.** Create a WPF "Gardener's handbook" application that loads plants from a JSON file (family, name, description, photo path), builds a tree with lazy loading of nodes, and lets you add and edit plants in a modal window with field validation and photo selection through `OpenFileDialog`. Changes are saved to the file with the *Save* command (**Ctrl+S**).

### Variant 7. Area calculator {#v7}

**1. Initial level.** Create a WPF application with `TabControl` tabs for a rectangle, a circle, and a triangle, on each of which the user enters dimensions and gets the area and perimeter of the shape.

**2. Basic level.** Create a WPF "Area calculator" application with tabs for a rectangle, a circle, and a triangle, on which the user enters dimensions and sees the area and perimeter, with dimension validation (positive numbers, the triangle inequality) and a sketch of the shape on a `Canvas` (`Rectangle`, `Ellipse`, `Polygon`) scaled so that the shape fills the canvas.

**3. Advanced level.** Create a WPF "Plot area" application in which the user sets the vertices of a polygon by clicking a `Canvas`, and the program shows the area by the shoelace formula, the perimeter, and the side lengths in a table at a scale of 1 pixel = 0.1 m. Vertices can be dragged with the mouse and deleted with the right button, and the outline is saved to a file and opened from it.

### Variant 8. Class timetable {#v8}

**1. Initial level.** Create a WPF application that shows a weekly timetable in a `Grid` (columns are days, rows are lesson numbers) with subject names defined in code.

**2. Basic level.** Create a WPF "Class timetable" application with a table on a `Grid` in which double-clicking a cell opens a modal edit window (subject `ComboBox`, room, teacher), and *OK* updates the cell. Empty cells are highlighted in gray, and the status bar shows the number of lessons per week.

**3. Advanced level.** Create a WPF "School class timetable" application that shows the weekly timetable (subject, room, teacher) in a table on a `Grid`, saves the timetables of several classes to a JSON file, switches the class in a `ComboBox`, checks for conflicts (the same teacher or room at the same time in different classes) and shows them in a list, and exports the timetable of the selected class to a CSV file through `SaveFileDialog`.

### Variant 9. Color converter {#v9}

**1. Initial level.** Create a WPF application with three `Slider` controls (R, G, B from 0 to 255), a color preview rectangle, and a label with the color code in the `#RRGGBB` format.

**2. Basic level.** Create a WPF "Color converter" application with RGB and HSV sliders that update each other, a field for entering a `#RRGGBB` code with validation, a preview rectangle, and a *Copy* button that copies the code to the clipboard (`Clipboard.SetText`).

**3. Advanced level.** Create a WPF "Palette" application that contains a `ColorPicker` user control with a `SelectedColor` dependency property, a palette of saved colors on a `WrapPanel`, generation of harmonious colors (complementary, triad), and saving of the palette to a JSON file. Clicking a swatch in the palette selects the color, and a context menu deletes it.

### Variant 10. Travel planner {#v10}

**1. Initial level.** Create a WPF application that shows a three-day travel plan: each day is an `Expander` with a date header and a list of places to visit.

**2. Basic level.** Create a WPF "Travel planner" application in which the user sets the start and end dates (`DatePicker`), after which an `Expander` with a field for adding a place and a list is created for each day. An invalid period (the end before the start, more than 30 days) shows a message, and the summary contains the number of places.

**3. Advanced level.** Create a WPF "Trip" application with several trips saved to a JSON file: for each place, the time, address, and estimated expenses are set, the days are shown in `Expander` elements, and the status bar contains the total budget. Places can be moved between days through a context menu, and the plan is exported to a text file.

### Variant 11. The 15 puzzle {#v11}

**1. Initial level.** Create a WPF application with the 15 puzzle game on a 4 × 4 `UniformGrid` panel: clicking a tile next to the empty cell moves it.

**2. Basic level.** Create a WPF "15 puzzle" application with shuffling only by valid moves (so the game is solvable), a move counter, a timer, and a victory message. One `Click` handler is attached to the `UniformGrid`, and the arrow keys move the tiles.

**3. Advanced level.** Create a WPF "15 puzzle" application with a choice of board size 3 × 3, 4 × 4, or 5 × 5, a picture mode (the tiles are parts of an image from a file), an undo button, and a high score table for each size that is saved to a JSON file and shown in a separate window.

### Variant 12. Library card catalog {#v12}

**1. Initial level.** Create a WPF application that shows a list of books (title, author, year) in a `ListView` with a `GridView` view and lets you add a book from fields below the table.

**2. Basic level.** Create a WPF "Library card catalog" application with a book table (title, author, year), a filter field by title or author, and a modal add and edit window with year validation (from 1450 to the current year) and *OK* and *Cancel* buttons. Double-clicking a row opens editing.

**3. Advanced level.** Create a WPF "Library" application with tabs for books (title, author, year) and readers (last name, phone), lending a book to a reader for a set period in a modal window, marking of overdue loans, and saving of all data to a JSON file. The *Reports* menu opens a window of debtors with a fine of 5 UAH for each day overdue.

### Variant 13. Athlete's stopwatch {#v13}

**1. Initial level.** Create a WPF "Stopwatch" application with a large time label in the `mm:ss.ss` format and *Start/Stop* and *Reset* buttons; the time is measured by a `Stopwatch`, and the label is updated by a `DispatcherTimer`.

**2. Basic level.** Create a WPF "Athlete's stopwatch" application with a time label, *Start/Stop*, *Reset*, and *Lap* buttons, a list of laps (number, lap time, total time), highlighting of the best and worst laps, and control with the **Space** and **L** keys through `KeyBinding` or a `PreviewKeyDown` handler.

**3. Advanced level.** Create a WPF "Running workout" application with a stopwatch and lap recording that stores the results of several athletes (the name is chosen in a `ComboBox`), shows the laps in a `ListView`, calculates the average pace per kilometer for a given lap length, and exports the workout to a CSV file. A history window shows the best time of each athlete.

### Variant 14. Patient register {#v14}

**1. Initial level.** Create a WPF application with a patient form (full name, date of birth `DatePicker`, sex `RadioButton`, phone) on a `Grid` panel and a *Save* button that adds the patient to a list.

**2. Basic level.** Create a WPF "Patient register" application with a patient form (full name, date of birth, sex, phone) and a table in which the fields are validated before saving (required fields, a date no later than today, a phone in the `+380XXXXXXXXX` format), errors are shown next to the fields, and a search field filters the table by last name.

**3. Advanced level.** Create a WPF "Reception desk" application that stores patients (full name, date of birth, phone) and appointments (doctor, date, time) in a JSON file, shows an appointment calendar for the selected date, does not allow booking two patients with the same doctor at the same time, and opens a patient card with the visit history in a modeless window.

### Variant 15. Electronic grading scale {#v15}

**1. Initial level.** Create a WPF application in which the user enters a number of points (0–100) and sees the grade on the ECTS scale and the national scale.

**2. Basic level.** Create a WPF `GradeControl` user control with a `Score` dependency property (0–100, with coercion through `CoerceValueCallback`) that shows the points, a fill bar, and the ECTS letter. The main window contains a list of students with such an element and a slider for each.

**3. Advanced level.** Create a WPF "Electronic gradebook" application for a group from a CSV file (last name, module points), in which the `GradeControl` user control (a `Score` dependency property, a fill bar, and the ECTS letter) shows each student's total, the table is sorted by last name or points, and a statistics window shows the distribution of ECTS grades as bars on a `Canvas`. Changed points are saved back to the file.

### Variant 16. Pizza builder {#v16}

**1. Initial level.** Create a WPF application in which the user chooses the pizza size (`RadioButton`) and toppings (`CheckBox`), and a label immediately shows the price.

**2. Basic level.** Create a WPF "Pizza builder" application with a choice of size (`RadioButton`) and toppings (`CheckBox`) with prices defined in code, in which the selected toppings are shown as layers of `Image` elements with a transparent background overlaid in one cell of a `Grid` panel, the price is recalculated by one handler of the bubbling `Checked`/`Unchecked` event, and ordering more than five toppings is forbidden with a message.

**3. Advanced level.** Create a WPF "Pizzeria" application that loads toppings and prices from a JSON file, lets you put several pizzas in a cart, save a favorite pizza under a name, and place an order in a modal window with the delivery address and time. The order history is saved to a file and shown in a separate window.

### Variant 17. Fuel log {#v17}

**1. Initial level.** Create a WPF application in which the user enters the odometer readings and the number of liters of two refuelings, and the program calculates the fuel consumption per 100 km.

**2. Basic level.** Create a WPF "Fuel log" application with a table of refuelings (date, odometer, liters, price per liter), an add form with validation (the odometer increases, positive values), and a `StatusBar` with the average consumption and total expenses in hryvnias.

**3. Advanced level.** Create a WPF "Car logbook" application for several cars from a JSON file with refuelings (date, odometer, liters, price), with adding, editing, and deleting refuelings, a chart of consumption per 100 km by refueling (a `Polyline` on a `Canvas`), and a report for the selected month in a modal window with export to CSV.

### Variant 18. Photo album {#v18}

**1. Initial level.** Create a WPF application that shows the images from a folder chosen with `OpenFolderDialog` as thumbnails on a `WrapPanel` in a `ScrollViewer`.

**2. Basic level.** Create a WPF "Photo album" application that shows the images from a folder chosen with `OpenFolderDialog` as thumbnails on a `WrapPanel` and the selected photo in a `Viewbox`, has buttons and the **←** and **→** keys for moving between photos, and a status bar with the file name, the image size in pixels, and the file size.

**3. Advanced level.** Create a WPF "Photo album" application for images from a selected folder with thumbnails, a slide show (`DispatcherTimer`, the interval in the settings), a full-screen mode (**F11**), photo rotation (`RotateTransform`), albums – lists of selected photos saved to a JSON file – and handling of errors for corrupted files.

### Variant 19. Calorie calculator {#v19}

**1. Initial level.** Create a WPF application in which the user chooses a food in a `ComboBox`, enters the weight in grams, and sees the calories of the portion.

**2. Basic level.** Create a WPF "Calorie calculator" application with a food reference (calories, protein, fat, carbohydrates per 100 g) defined in code, a list of what was eaten during the day (food, weight, calories, protein, fat, carbohydrates), a daily target entered by the user, a `ProgressBar` indicator of target completion, and validation of the entered weight.

**3. Advanced level.** Create a WPF "Food diary" application that loads the food reference from a CSV file, saves entries by day to a JSON file, lets you move between days (`DatePicker`), and shows a weekly report as bars on a `Canvas`. New foods are added in a modal window with field validation.

### Variant 20. Vocabulary trainer {#v20}

**1. Initial level.** Create a WPF application that shows an English word from a list defined in code, accepts a translation in a `TextBox`, and reports whether the answer is correct.

**2. Basic level.** Create a WPF "Vocabulary trainer" application with a list of English words and translations defined in code, a word card, "English → Ukrainian" and "Ukrainian → English" modes (`RadioButton`), checking of the entered translation ignoring case and extra spaces, counters of correct and incorrect answers, and the **Enter** key for checking.

**3. Advanced level.** Create a WPF "Word learning" application that loads word sets from CSV files (word, translation), shows words to translate, shows words with mistakes more often, saves the statistics of each word to a JSON file, and has a set editing window (adding, deleting, searching) and a session results window with the percentage of correct answers.

### Variant 21. Minesweeper {#v21}

**1. Initial level.** Create a WPF application with an 8 × 8 Minesweeper field on a `UniformGrid`, where clicking a cell shows a mine or the number of mines around it.

**2. Basic level.** Create a WPF "Minesweeper" application with an 8 × 8 field on a `UniformGrid` and randomly placed mines, recursive opening of empty areas, flags on the right mouse button, a mine counter, and a win or loss message. Clicks are handled by one tunneling `PreviewMouseDown` event attached to the field.

**3. Advanced level.** Create a WPF "Minesweeper" application with difficulty levels (8 × 8, 16 × 16, 30 × 16), a custom field size in a modal window, a timer, a guaranteed safe first move, and a high score table in a JSON file for each level.

### Variant 22. Coin collection {#v22}

**1. Initial level.** Create a WPF application with a `TreeView` of countries and coins in which selecting a coin shows its denomination, year, and material.

**2. Basic level.** Create a WPF "Coin collection" application (country, name, denomination, year, material, photo) with a tree by country, search by name or year, a coin card with a photo, and a form for adding a coin with validation of the year and denomination; after adding, the tree expands the corresponding country.

**3. Advanced level.** Create a WPF "Numismatist" application that stores a coin collection (country, denomination, year, material) in a JSON file, groups coins in the tree by country or century (a toggle), lets you edit and delete coins and mark duplicates for exchange, and exports the list of duplicates to a text file.

### Variant 23. Password generator {#v23}

**1. Initial level.** Create a WPF application that generates a password of a length set by a `Slider` (8–32) from Latin letters and digits and shows it in a `TextBox`.

**2. Basic level.** Create a WPF "Password generator" application with check boxes for character sets (lowercase, uppercase, digits, special characters), a guarantee of at least one character from each selected set, a `ProgressBar` strength indicator with a caption, and a button for copying to the clipboard.

**3. Advanced level.** Create a WPF "Passwords" application that generates passwords and passphrases of several words from a dictionary (a file), estimates the entropy in bits, saves the generation history with a purpose to a file, and has a `StrengthMeter` user control with an `Entropy` dependency property.

### Variant 24. Cinema kiosk {#v24}

**1. Initial level.** Create a WPF application with a 6 × 10 hall map on a `Grid` panel, where clicking a seat toggles its state "free/selected" and updates the number of selected seats.

**2. Basic level.** Create a WPF "Cinema kiosk" application with a choice of movie and showing (`ComboBox`, the data is defined in code), a 6 × 10 hall map with taken, free, and selected seats, different prices per row, and a *Buy* button that shows the ticket in a modal window.

**3. Advanced level.** Create a WPF "Cinema" application that loads the showing schedule from a JSON file, stores the sold seats for each showing, does not allow choosing seats so that a single free seat is left between them, and prints (saves to a text file) tickets with an order number.

### Variant 25. Car rental calculator {#v25}

**1. Initial level.** Create a WPF application in which the user chooses a car class (`ComboBox`) and rental dates (`DatePicker`), and the program shows the number of days and the cost.

**2. Basic level.** Create a WPF "Car rental" application with a choice of car class with a daily price (`ComboBox`) and rental dates (`DatePicker`), period validation (not in the past, from 1 to 30 days), extra options (`CheckBox`: child seat, insurance, GPS), a 10 % discount from seven days, and a final calculation table.

**3. Advanced level.** Create a WPF "Car rental service" application with a catalog of cars on a `WrapPanel` from a JSON file, a check of car availability for the selected period taking existing bookings into account, drawing up an agreement in a modal window, and saving of bookings to a file.

### Variant 26. Smart home panel {#v26}

**1. Initial level.** Create a WPF application with `ToggleButton` switches for the lights in four rooms, where each button shows the "On/Off" state and a label shows the number of lights that are on.

**2. Basic level.** Create a WPF "Smart home" application with groups of devices by room (`GroupBox`), brightness and temperature sliders, an *All off* button, and one handler of the bubbling `Checked`/`Unchecked` event at the window level that updates the estimated power consumption.

**3. Advanced level.** Create a WPF "Smart home" application that loads the configuration of rooms and devices from a JSON file, builds the interface with a `DeviceTile` user control, supports scenes ("Night", "Leaving home") in a modal edit window, and keeps a log of state changes in a file.

### Variant 27. Time zone converter {#v27}

**1. Initial level.** Create a WPF application in which the user chooses a city in a `ComboBox` and enters a time, and the program shows the corresponding time in London.

**2. Basic level.** Create a WPF "Time zone converter" application with a choice of meeting date and time and several cities, a table of local time for each city with a working-hours mark (9:00–18:00), and daylight saving time handled through `TimeZoneInfo`.

**3. Advanced level.** Create a WPF "Meeting planner" application that finds hours that are working hours for all participants from different cities, shows them as a band on a `Canvas`, saves meetings to a JSON file, and exports an invitation to a text file with the time for each participant.

### Variant 28. Workout log {#v28}

**1. Initial level.** Create a WPF application with a list of exercises and fields (exercise, sets, reps, weight) at the bottom of a window laid out with a `DockPanel` panel, and an add button.

**2. Basic level.** Create a WPF "Workout log" application with a main window on a `DockPanel` (a menu, a list of workouts by date, a status bar) and a modal window for adding an exercise with field validation. The status bar shows the total tonnage (sets × reps × weight) of the selected workout.

**3. Advanced level.** Create a WPF "Workout diary" application that saves workouts to a JSON file, contains an exercise reference by muscle group (`TreeView`), shows the weight progress of the selected exercise as a chart on a `Canvas`, and builds a monthly report with export to CSV.

### Variant 29. Traffic rules test {#v29}

**1. Initial level.** Create a WPF application that shows one traffic rules question with three answer options (`RadioButton`) and after *Check* is clicked reports whether the answer is correct.

**2. Basic level.** Create a WPF "Traffic rules test" application with ten questions defined in code, an image of the road situation from the project resources, navigation between questions, and a summary window with the number of correct answers and a list of mistakes.

**3. Advanced level.** Create a WPF "Traffic rules exam" application that loads questions, options, and image files from a JSON file, picks 20 random questions, limits the time to 20 minutes, ends the exam after three mistakes, and saves attempt results to a file with a history window.

### Variant 30. Advanced calculator {#v30}

**1. Initial level.** Create a WPF "Calculator" application with digit buttons and the four operations on a `UniformGrid`, where one handler of the bubbling `Click` event serves all buttons.

**2. Basic level.** Create a WPF "Calculator" application with a decimal separator, sign change, percent, a calculation history in a `ListBox`, and keyboard input through the tunneling `PreviewTextInput` event; division by zero shows *Error*.

**3. Advanced level.** Create a WPF "Scientific calculator" application with switching between standard and scientific modes (the functions `sin`, `cos`, `log`, exponentiation, parentheses, and operator precedence), a history that can be saved to a file and reused with a click, and commands for copying the result (**Ctrl+C**).

## Procedure

1. Study the theory and the worked examples.
2. Sketch each window, decide on the layout panels, controls, their names, and events; create a *WPF Application* project (.NET 10) in Visual Studio 2026.
3. Describe the interface with XAML markup: a `Grid` with `Auto` and `*` sizes, nested panels, access keys, `IsDefault` and `IsCancel`; check the layout when the window is resized (*Live Visual Tree*, *Display Layout Adorners*).
4. Implement event handlers, commands, input validation, and file operations; handle a group of elements together through routed events, and move repeated parts into user controls.
5. Build the project without warnings and test the application with valid, invalid, and boundary data.
6. Demonstrate the application to the instructor, explain the XAML markup and the code, and answer the review questions.
