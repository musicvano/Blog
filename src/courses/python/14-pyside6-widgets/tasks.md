---
title: "Tasks"
description: "Topic 14. GUI applications with PySide6: task variants"
outline: [2, 3]
sourceHash: "66741a83309f852547651dd07ec1abd1621711d54c23a2c0029fe2139608adb5"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

All tasks are Python 3.14/PySide6 GUI applications. Keep domain calculations in separate typed functions, show errors in the form, and use layouts. Invalid input must not close the program or leave a wrong result without an explanation. No external APIs are needed.

## Variants

### Variant 1. BMI calculator {#v1}

**1. Initial level.** Create a PySide6 GUI application with QDoubleSpinBox fields for mass 1–300 kg and height 0.5–2.5 m; show the index `m / h ** 2` with two decimal places. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “BMI calculator” with QDoubleSpinBox fields for mass 1–300 kg and height 0.5–2.5 m; show the index `m / h ** 2` with two decimal places; add instant recalculation and a text range for the index: below 18.5, 18.5–25, 25–30, 30 and above; the lower bound is inclusive. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “BMI calculator” with QDoubleSpinBox fields for mass 1–300 kg and height 0.5–2.5 m; show the index `m / h ** 2` with two decimal places; implement instant recalculation and a text range for the index: below 18.5, 18.5–25, 25–30, 30 and above; the lower bound is inclusive; also implement a history of inputs in a QListWidget, removal of the selected entry, and clearing; save the history as JSON. Mark the result as educational, not medical advice. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 2. Currency converter {#v2}

**1. Initial level.** Create a PySide6 GUI application with a QComboBox for UAH and EUR and an amount field; use a training exchange rate of 45 UAH per EUR. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Currency converter” with a QComboBox for UAH and EUR and an amount field; use a training exchange rate of 45 UAH per EUR; add two-way selection of UAH/EUR/USD currencies at fixed rates of 1/45/40 UAH, a button to swap the direction, and a check for a nonnegative amount. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Currency converter” with a QComboBox for UAH and EUR and an amount field; use a training exchange rate of 45 UAH per EUR; implement two-way selection of UAH/EUR/USD currencies at fixed rates of 1/45/40 UAH, a button to swap the direction, and a check for a nonnegative amount; also implement editing of the training rates, a conversion history, and JSON saving; perform calculations with Decimal, rounding to the kopiyka; do not connect to online exchange rates. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 3. Stopwatch {#v3}

**1. Initial level.** Create a PySide6 GUI application with start and pause buttons and a QLabel with the actual `perf_counter` time, refreshed by a QTimer. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Stopwatch” with start and pause buttons and a QLabel with the actual `perf_counter` time, refreshed by a QTimer; add a reset and a QListWidget of laps; do not add paused time to the total, and forbid laps while paused. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Stopwatch” with start and pause buttons and a QLabel with the actual `perf_counter` time, refreshed by a QTimer; implement a reset and a QListWidget of laps; do not add paused time to the total, and forbid laps while paused; also implement keyboard shortcuts, the best lap, and exporting laps to CSV; show the lap duration and the total time separately. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 4. Pomodoro timer {#v4}

**1. Initial level.** Create a PySide6 GUI application with a QSpinBox for a duration of 1–120 minutes, a start button, and a display of the remaining time via a QTimer. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Pomodoro timer” with a QSpinBox for a duration of 1–120 minutes, a start button, and a display of the remaining time via a QTimer; add pause, reset, separate work and break intervals, and automatic switching between states. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Pomodoro timer” with a QSpinBox for a duration of 1–120 minutes, a start button, and a display of the remaining time via a QTimer; implement pause, reset, separate work and break intervals, and automatic switching between states; also implement a QMainWindow with a settings menu, a counter of completed work cycles, and a JSON history; compute time from monotonic timestamps, not from the number of timeouts. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 5. Calculator {#v5}

**1. Initial level.** Create a PySide6 GUI application with two numeric fields and buttons for the four arithmetic operations in a QGridLayout. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Calculator” with two numeric fields and buttons for the four arithmetic operations in a QGridLayout; add a history of results, clearing, and a message about division by zero; do not evaluate expressions with eval. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Calculator” with two numeric fields and buttons for the four arithmetic operations in a QGridLayout; implement a history of results, clearing, and a message about division by zero; do not evaluate expressions with eval; also implement keyboard control, reuse of a previous result, and history export; keep separate state for operands, the operation, and waiting for input. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 6. To-do list {#v6}

**1. Initial level.** Create a PySide6 GUI application with a QLineEdit, a QListWidget, and a button that adds nonempty text. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “To-do list” with a QLineEdit, a QListWidget, and a button that adds nonempty text; add marking tasks as done, removing the selected task, and an all/active/done filter; store the data independently of the filter. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “To-do list” with a QLineEdit, a QListWidget, and a button that adds nonempty text; implement marking tasks as done, removing the selected task, and an all/active/done filter; store the data independently of the filter; also implement a Designer form with pyside6-uic, JSON saving, and state restoration; reject an invalid file structure without losing the current list. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 7. Unit converter {#v7}

**1. Initial level.** Create a PySide6 GUI application with a length field in meters and a QLabel in centimeters updated by a signal. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Unit converter” with a length field in meters and a QLabel in centimeters updated by a signal; add length/mass categories, the units m/cm/km and kg/g, and changing direction without recursive signals. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Unit converter” with a length field in meters and a QLabel in centimeters updated by a signal; implement length/mass categories, the units m/cm/km and kg/g, and changing direction without recursive signals; also implement a history and custom positive unit factors in JSON; block incompatible categories and explain the units in each field. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 8. Password generator {#v8}

**1. Initial level.** Create a PySide6 GUI application with a QSlider for a length of 8–64 and a button that generates a password with secrets from Latin letters and digits. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Password generator” with a QSlider for a length of 8–64 and a button that generates a password with secrets from Latin letters and digits; add QCheckBox options for letter/digit/symbol sets, a ban on an empty set, and copying to the clipboard. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Password generator” with a QSlider for a length of 8–64 and a button that generates a password with secrets from Latin letters and digits; implement QCheckBox options for letter/digit/symbol sets, a ban on an empty set, and copying to the clipboard; also implement a guarantee of at least one character from each selected set, a check for sufficient length, and a hide button; do not save generated passwords to files. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 9. Loan calculator {#v9}

**1. Initial level.** Create a PySide6 GUI application with fields for the amount, the monthly rate, and the number of months; compute an equal annuity payment, and for a rate of 0, divide the amount by the number of months. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Loan calculator” with fields for the amount, the monthly rate, and the number of months; compute an equal annuity payment, and for a rate of 0, divide the amount by the number of months; add a QTableWidget payment schedule with interest and principal repayment, and a check for a positive amount and term. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Loan calculator” with fields for the amount, the monthly rate, and the number of months; compute an equal annuity payment, and for a rate of 0, divide the amount by the number of months; implement a QTableWidget payment schedule with interest and principal repayment, and a check for a positive amount and term; also implement CSV export, a final payment with rounding correction, and a comparison of two training scenarios; explain the rate units and do not present the model as a bank offer. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 10. Quiz {#v10}

**1. Initial level.** Create a PySide6 GUI application with a single question with QRadioButton options and a button to check the answer. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Quiz” with a single question with QRadioButton options and a button to check the answer; add at least five questions, a QProgressBar, a score, and protection against counting an answer twice. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Quiz” with a single question with QRadioButton options and a button to check the answer; implement at least five questions, a QProgressBar, a score, and protection against counting an answer twice; also implement loading a validated JSON question set, shuffling questions while preserving the correct answers, and retaking the quiz; after finishing, show the mistakes. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 11. Pizza order {#v11}

**1. Initial level.** Create a PySide6 GUI application with a QComboBox for the size S/M/L priced at 100/150/200 UAH and a total. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Pizza order” with a QComboBox for the size S/M/L priced at 100/150/200 UAH and a total; add toppings via QCheckBox, a quantity of 1–20, and an instant total in integer kopiykas. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Pizza order” with a QComboBox for the size S/M/L priced at 100/150/200 UAH and a total; implement toppings via QCheckBox, a quantity of 1–20, and an instant total in integer kopiykas; also implement a cart with several items in a QListWidget, editing and removing an item, and saving the receipt as JSON; show all training prices in the interface. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 12. Notepad {#v12}

**1. Initial level.** Create a PySide6 GUI application with a QPlainTextEdit and buttons for clearing and saving to the UTF-8 file note.txt. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Notepad” with a QPlainTextEdit and buttons for clearing and saving to the UTF-8 file note.txt; add a QMainWindow with a menu, QAction objects, and keyboard shortcuts; ask before discarding unsaved text. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Notepad” with a QPlainTextEdit and buttons for clearing and saving to the UTF-8 file note.txt; implement a QMainWindow with a menu, QAction objects, and keyboard shortcuts; ask before discarding unsaved text; also implement forward and backward search, a count of matches, and opening and saving via a path field; a file error must not destroy the text, and ask for confirmation before overwriting another file. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 13. World clock {#v13}

**1. Initial level.** Create a PySide6 GUI application with a QComboBox of the time zones UTC, Europe/Kyiv, and Europe/London and a QLabel with the time refreshed by a QTimer. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “World clock” with a QComboBox of the time zones UTC, Europe/Kyiv, and Europe/London and a QLabel with the time refreshed by a QTimer; add a list of several selected time zones with the date for each; use zoneinfo rather than constant offsets. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “World clock” with a QComboBox of the time zones UTC, Europe/Kyiv, and Europe/London and a QLabel with the time refreshed by a QTimer; implement a list of several selected time zones with the date for each; use zoneinfo rather than constant offsets; also implement editing the list of time zones, JSON saving, and comparing times at a selected UTC moment; if the system time zone database is missing, use the tzdata dependency. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 14. Color mixer {#v14}

**1. Initial level.** Create a PySide6 GUI application with three RGB QSlider controls 0–255 and a rectangular color preview. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Color mixer” with three RGB QSlider controls 0–255 and a rectangular color preview; add numeric fields, two-way synchronization without a signal loop, and a HEX code with copying. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Color mixer” with three RGB QSlider controls 0–255 and a rectangular color preview; implement numeric fields, two-way synchronization without a signal loop, and a HEX code with copying; also implement a palette of named colors, removal, and JSON saving; validate the HEX format and show the color together with text channel values. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 15. Participant form {#v15}

**1. Initial level.** Create a PySide6 GUI application with a QFormLayout with a name and an age of 16–100 and a button that submits a nonempty form. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Participant form” with a QFormLayout with a name and an age of 16–100 and a button that submits a nonempty form; add a consent checkbox, a section selected in a QComboBox, and a custom Signal(str,int) emitted only for valid data. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Participant form” with a QFormLayout with a name and an age of 16–100 and a button that submits a nonempty form; implement a consent checkbox, a section selected in a QComboBox, and a custom Signal(str,int) emitted only for valid data; also implement several forms in tabs or groups, a summary view, and JSON saving; report every readiness change through a custom signal, without repeated connections. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 16. Tic-tac-toe {#v16}

**1. Initial level.** Create a PySide6 GUI application with a 3×3 grid of QPushButton widgets for alternating X and O, with occupied cells blocked. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Tic-tac-toe” with a 3×3 grid of QPushButton widgets for alternating X and O, with occupied cells blocked; add detection of a win in rows, columns, and diagonals, a draw, and a new game. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Tic-tac-toe” with a 3×3 grid of QPushButton widgets for alternating X and O, with occupied cells blocked; implement detection of a win in rows, columns, and diagonals, a draw, and a new game; also implement a series score, undoing the last move, and saving the history as JSON; check the end of the game and the restoration of the correct player after an undo. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 17. Daily calories {#v17}

**1. Initial level.** Create a PySide6 GUI application with fields for training energy values per 100 g and the portion mass, with a result label. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Daily calories” with fields for training energy values per 100 g and the portion mass, with a result label; add a list of portions, removal, a total, and a QProgressBar against a user-defined goal; do not clip the numeric total when it is exceeded. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Daily calories” with fields for training energy values per 100 g and the portion mass, with a result label; implement a list of portions, removal, a total, and a QProgressBar against a user-defined goal; do not clip the numeric total when it is exceeded; also implement a JSON product catalog, date selection, and a history; validate field limits on loading as well, and mark totals as training calculations. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 18. Typing trainer {#v18}

**1. Initial level.** Create a PySide6 GUI application with a QLabel with a reference text and a QLineEdit, with a label showing the number of positional mismatches. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Typing trainer” with a QLabel with a reference text and a QLineEdit, with a label showing the number of positional mismatches; add starting the measurement at the first character, the actual time, and the speed in characters per minute; empty text gives zero. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Typing trainer” with a QLabel with a reference text and a QLineEdit, with a label showing the number of positional mismatches; implement starting the measurement at the first character, the actual time, and the speed in characters per minute; empty text gives zero; also implement a set of exercises in JSON, a list of completed attempts, and a ranking; a restart resets the state, and correcting characters recalculates errors without double counting. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 19. Number systems {#v19}

**1. Initial level.** Create a PySide6 GUI application with a field for a decimal integer and labels with its binary and hexadecimal representations. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Number systems” with a field for a decimal integer and labels with its binary and hexadecimal representations; add three editable fields, validation of allowed digits, and synchronization without a signal loop. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Number systems” with a field for a decimal integer and labels with its binary and hexadecimal representations; implement three editable fields, validation of allowed digits, and synchronization without a signal loop; also implement choosing a base of 2–36, a conversion history, and JSON export; handle the sign and unfinished input separately, and do not call eval. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 20. Game dice {#v20}

**1. Initial level.** Create a PySide6 GUI application with a QSpinBox for the number of dice 1–10, a roll button, and a display of values 1–6. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Game dice” with a QSpinBox for the number of dice 1–10, a roll button, and a display of values 1–6; add a history of sums, a Counter of frequencies, and resetting the statistics when the number of dice changes. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Game dice” with a QSpinBox for the number of dice 1–10, a roll button, and a display of values 1–6; implement a history of sums, a Counter of frequencies, and resetting the statistics when the number of dice changes; also implement a series of up to 10000 rolls in short QTimer steps, progress, and cancellation; test the calculations with an injected random number generator and a fixed seed. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 21. Bill and tip {#v21}

**1. Initial level.** Create a PySide6 GUI application with fields for the bill in kopiykas and a QSlider for a tip percentage of 0–30, with a label showing the full amount. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Bill and tip” with fields for the bill in kopiykas and a QSlider for a tip percentage of 0–30, with a label showing the full amount; add a number of people of 1–100 and an equal split in integer kopiykas with an explanation of the remainder. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Bill and tip” with fields for the bill in kopiykas and a QSlider for a tip percentage of 0–30, with a label showing the full amount; implement a number of people of 1–100 and an equal split in integer kopiykas with an explanation of the remainder; also implement a bill history, assignment of the remaining kopiykas to the first participants, and CSV export; the sum of the shares must equal the amount due. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 22. Alarm clock {#v22}

**1. Initial level.** Create a PySide6 GUI application with a QTimeEdit for the time and an enable button, checking the time once per second with a QTimer. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Alarm clock” with a QTimeEdit for the time and an enable button, checking the time once per second with a QTimer; add several alarms in a QListWidget, removal, and active checkboxes; each alarm fires at most once per date. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Alarm clock” with a QTimeEdit for the time and an enable button, checking the time once per second with a QTimer; implement several alarms in a QListWidget, removal, and active checkboxes; each alarm fires at most once per date; also implement snoozing for 1–30 minutes, JSON saving, and a missed-time policy: do not replay past notifications after startup; show notifications in the interface. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 23. Applicant competition score {#v23}

**1. Initial level.** Create a PySide6 GUI application with three QSpinBox grades of 100–200 and a training average score. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Applicant competition score” with three QSpinBox grades of 100–200 and a training average score; add QDoubleSpinBox weights with nonnegative values summing to 1 within a tolerance of 1e-6; otherwise, disable the calculation. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Applicant competition score” with three QSpinBox grades of 100–200 and a training average score; implement QDoubleSpinBox weights with nonnegative values summing to 1 within a tolerance of 1e-6; otherwise, disable the calculation; also implement editable training weighting schemes, a comparison of scenarios, and a JSON history; do not call these rules official admission rules. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 24. Morse code {#v24}

**1. Initial level.** Create a PySide6 GUI application with a field for Latin letters A–Z and a translation using a Morse dictionary defined in the code. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Morse code” with a field for Latin letters A–Z and a translation using a Morse dictionary defined in the code; add two-way translation of letters and digits, a space between codes, and / between words; report the position of an unknown code. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Morse code” with a field for Latin letters A–Z and a translation using a Morse dictionary defined in the code; implement two-way translation of letters and digits, a space between codes, and / between words; report the position of an unknown code; also implement a history, copying, and a JSON dictionary with a check that codes are unique; do not silently drop unknown characters, and test both directions. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 25. Fuel consumption {#v25}

**1. Initial level.** Create a PySide6 GUI application with fields for the distance in km, consumption in L/100 km, and the price per liter, with labels for liters and cost. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Fuel consumption” with fields for the distance in km, consumption in L/100 km, and the price per liter, with labels for liters and cost; add a fuel type chosen via QRadioButton with training prices and a custom price, and a check for nonnegative values. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Fuel consumption” with fields for the distance in km, consumption in L/100 km, and the price per liter, with labels for liters and cost; implement a fuel type chosen via QRadioButton with training prices and a custom price, and a check for nonnegative values; also implement a route of several legs, a QListWidget, totals in liters and money, and CSV export; do not average consumption rates without weighting by distance. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 26. Guess the number {#v26}

**1. Initial level.** Create a PySide6 GUI application with a range of 1–100, a QSpinBox for the guess, and a higher/lower/correct hint. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Guess the number” with a range of 1–100, a QSpinBox for the guess, and a higher/lower/correct hint; add choosing the bounds, a history of attempts, a counter, and a new game; block further attempts after a win. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Guess the number” with a range of 1–100, a QSpinBox for the guess, and a higher/lower/correct hint; implement choosing the bounds, a history of attempts, a counter, and a new game; block further attempts after a win; also implement difficulty levels, an attempt limit, and JSON statistics; pass the secret number explicitly for tests, and check the range boundaries. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 27. Flight ticket {#v27}

**1. Initial level.** Create a PySide6 GUI application with a QDateEdit for a date no earlier than today, a QComboBox for the class, and a button that shows the selection. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Flight ticket” with a QDateEdit for a date no earlier than today, a QComboBox for the class, and a button that shows the selection; add a passenger name, a quantity of 1–9, economy/business training fares, and order confirmation. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Flight ticket” with a QDateEdit for a date no earlier than today, a QComboBox for the class, and a button that shows the selection; implement a passenger name, a quantity of 1–9, economy/business training fares, and order confirmation; also implement a ticket cart, editing, and JSON saving; reject empty names and past dates on import as well, and calculate money in kopiykas. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 28. Water tracker {#v28}

**1. Initial level.** Create a PySide6 GUI application with buttons for portions of 100, 200, and 300 ml, the total volume, and a QProgressBar against an entered goal. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Water tracker” with buttons for portions of 100, 200, and 300 ml, the total volume, and a QProgressBar against an entered goal; add undoing the last portion, resetting the day, and an intake history; show exceeding the goal as a number. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Water tracker” with buttons for portions of 100, 200, and 300 ml, the total volume, and a QProgressBar against an entered goal; implement undoing the last portion, resetting the day, and an intake history; show exceeding the goal as a number; also implement a history by date in JSON, manual entry of a portion, and confirmation before clearing; the user sets the goal, and the application does not determine a medical norm. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 29. Image gallery {#v29}

**1. Initial level.** Create a PySide6 GUI application with a field for the path to a local image, a QLabel for displaying it, and a message if the QPixmap is empty. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Image gallery” with a field for the path to a local image, a QLabel for displaying it, and a message if the QPixmap is empty; add a list of PNG/JPEG files from a directory, previous/next buttons, and a zoom slider; preserve the aspect ratio. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Image gallery” with a field for the path to a local image, a QLabel for displaying it, and a message if the QPixmap is empty; implement a list of PNG/JPEG files from a directory, previous/next buttons, and a zoom slider; preserve the aspect ratio; also implement search by name, a JSON list of favorites, and correct behavior after a file disappears; do not needlessly duplicate large images in the history. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

### Variant 30. Mixing console {#v30}

**1. Initial level.** Create a PySide6 GUI application with three QSlider channels of 0–100 and a label with the average level; this is a model without audio playback. Use layouts and clear unit labels.

**2. Basic level.** Create the PySide6 GUI application “Mixing console” with three QSlider channels of 0–100 and a label with the average level; this is a model without audio playback; add mute checkboxes, a custom Signal(int) for the overall level, and an indicator; the overall level is the average of the unmuted channels, or 0 if there are none. Show errors in the form and check boundary values.

**3. Advanced level.** Create the PySide6 GUI application “Mixing console” with three QSlider channels of 0–100 and a label with the average level; this is a model without audio playback; implement mute checkboxes, a custom Signal(int) for the overall level, and an indicator; the overall level is the average of the unmuted channels, or 0 if there are none; also implement JSON channel presets, a master multiplier of 0–100 percent, and a reset; block unnecessary signals during batch restoration and emit a single final signal. Separate typed logic from widgets, and add pytest checks of the calculations and a signal-testing scenario; errors must not terminate the application.

## Procedure

1. Prepare a `.venv`, pin the PySide6 version, and check the interpreter selected in PyCharm.
2. Sketch the form; define the field types, units, limits, and button states for empty input.
3. Implement and test pure calculation functions before connecting the interface. Add annotations to methods and slots.
4. Build the form, connect each signal once, and add clear validation messages and keyboard access.
5. Check the normal case, boundaries, invalid input, repeated clicks, reset, and window resizing. For timers, check pausing and restarting.
6. Save the code, the `.ui` file, resources, and a README with launch instructions and actual results. For the advanced level, add pytest checks of the calculations and a real Windows screenshot with the light theme.
7. During the defense, explain the ownership tree, the event loop, signal signatures, validation, and how you avoid blocking the window.
