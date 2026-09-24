---
title: "Tasks"
description: "Topic 15. Model/View and databases: task variants"
outline: [2, 3]
sourceHash: "6babffc1183e1a12a1ce2f0830348e84a86f13a6484bcc89c452a8616dd51cb2"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

Use Python 3.14 and PySide6. For SQLite, choose Qt SQL or a custom model over an SQLAlchemy repository unless the task specifies a particular approach. Do not maintain two independent editing buffers for the same records. Store prices and amounts as integer kopiykas and dates in ISO `YYYY-MM-DD` format.

## Variants

### Variant 1. Expense tracking {#v1}

**1. Initial level.** Create the PySide6 GUI application “Expense tracking” for sample records (id, date, category, `amount_kop`). Define the data in code; implement a QTableView over a QStandardItemModel, showing the total expenses. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Expense tracking” with records (id, date, category, `amount_kop`) and a QTableView over a QStandardItemModel, showing the total expenses; add an add dialog with a positive amount, a date delegate, and a category filter via a proxy. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Expense tracking” with records (id, date, category, `amount_kop`), a QTableView over a QStandardItemModel, showing the total expenses, and an add dialog with a positive amount, a date delegate, and a category filter via a proxy; implement SQLite with manual batch saving, cancellation, and CSV export of the visible filter; check the rollback for an invalid amount. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 2. Phone book {#v2}

**1. Initial level.** Create the PySide6 GUI application “Phone book” for sample records (id, name, phone). Define the data in code; implement a QTableView and a literal name search via QSortFilterProxyModel. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Phone book” with records (id, name, phone) and a QTableView and a literal name search via QSortFilterProxyModel; add a QSqlTableModel with SQLite, a unique phone number of 10 ASCII digits, and an edit dialog. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Phone book” with records (id, name, phone), a QTableView and a literal name search via QSortFilterProxyModel, and a QSqlTableModel with SQLite, a unique phone number of 10 ASCII digits, and an edit dialog; implement OnManualSubmit, CSV import with validation of all rows before the transaction, file selection, and confirmation before discarding unsaved changes. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 3. Library {#v3}

**1. Initial level.** Create the PySide6 GUI application “Library” for sample records (`book_id`, title, author, available). Define the data in code; implement a catalog QTableView with numeric sorting of available copies. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Library” with records (`book_id`, title, author, available) and a catalog QTableView with numeric sorting of available copies; add separate tables of books and readers, and a loan dialog that checks whether a copy is available. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Library” with records (`book_id`, title, author, available), a catalog QTableView with numeric sorting of available copies, and separate tables of books and readers, and a loan dialog that checks whether a copy is available; implement a QSqlRelationalTableModel with a delegate for the reader foreign key, book returns, and an atomic change of the loan and the stock level in SQLite. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 4. Warehouse inventory {#v4}

**1. Initial level.** Create the PySide6 GUI application “Warehouse inventory” for sample records (id, product, quantity, minimum). Define the data in code; implement a custom QAbstractTableModel and a background role for quantities below the minimum. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Warehouse inventory” with records (id, product, quantity, minimum) and a custom QAbstractTableModel and a background role for quantities below the minimum; add editing of a nonnegative quantity via setData, dataChanged, and a shortage filter. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Warehouse inventory” with records (id, product, quantity, minimum), a custom QAbstractTableModel and a background role for quantities below the minimum, and editing of a nonnegative quantity via setData, dataChanged, and a shortage filter; implement an SQLite repository, a receipt/write-off dialog, a ban on negative stock, and a movement log in a single transaction. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 5. Class schedule {#v5}

**1. Initial level.** Create the PySide6 GUI application “Class schedule” for sample records (id, `day_1_5`, `lesson_1_8`, room, teacher). Define the data in code; implement a QTableView of records sorted by day and lesson. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Class schedule” with records (id, `day_1_5`, `lesson_1_8`, room, teacher) and a QTableView of records sorted by day and lesson; add an add dialog that rejects a room or teacher conflict in the same slot. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Class schedule” with records (id, `day_1_5`, `lesson_1_8`, room, teacher), a QTableView of records sorted by day and lesson, and an add dialog that rejects a room or teacher conflict in the same slot; implement SQLite persistence, a search for a free room from an entered list, moving a class as an atomic operation, and CSV export. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 6. Film library {#v6}

**1. Initial level.** Create the PySide6 GUI application “Film library” for sample records (id, title, year, genre). Define the data in code; implement a QTableView and a case-insensitive title filter. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Film library” with records (id, title, year, genre) and a QTableView and a case-insensitive title filter; add a QStyledItemDelegate with a QComboBox of genres and a year check of 1888–2100 in the model. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Film library” with records (id, title, year, genre), a QTableView and a case-insensitive title filter, and a QStyledItemDelegate with a QComboBox of genres and a year check of 1888–2100 in the model; implement an SQLite catalog, an edit dialog, a genre and year-range filter, manual submit/revert, and saving the geometry with QSettings. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 7. Student records {#v7}

**1. Initial level.** Create the PySide6 GUI application “Student records” for sample records (id, name, group, `grade_0_100`). Define the data in code; implement a QTableView of students with a separate numeric EditRole for the grade. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Student records” with records (id, name, group, `grade_0_100`) and a QTableView of students with a separate numeric EditRole for the grade; add a QTreeView of groups and a table of students in the selected group, with editing via setData with validation. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Student records” with records (id, name, group, `grade_0_100`), a QTableView of students with a separate numeric EditRole for the grade, and a QTreeView of groups and a table of students in the selected group, with editing via setData with validation; implement SQLite with stable ids, a dialog for transferring between groups, a ranking, and a CSV report; preserve the selection by id after a refresh. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 8. Tailor shop {#v8}

**1. Initial level.** Create the PySide6 GUI application “Tailor shop” for sample records (`order_id`, client, description, status, `price_kop`). Define the data in code; implement a QTableView of orders and a total cost. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Tailor shop” with records (`order_id`, client, description, status, `price_kop`) and a QTableView of orders and a total cost; add a status delegate for new/`in_progress`/done and a dialog with a nonempty description and a nonnegative price. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Tailor shop” with records (`order_id`, client, description, status, `price_kop`), a QTableView of orders and a total cost, and a status delegate for new/`in_progress`/done and a dialog with a nonempty description and a nonnegative price; implement an SQLAlchemy repository for clients and orders, master-detail, an atomic change of status and log, and a filter for unfinished orders. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 9. Auto repair shop {#v9}

**1. Initial level.** Create the PySide6 GUI application “Auto repair shop” for sample records (`car_id`, plate, owner; `repair_id`, date, `amount_kop`). Define the data in code; implement two QTableView widgets with sample cars and the repairs of the selected car. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Auto repair shop” with records (`car_id`, plate, owner; `repair_id`, date, `amount_kop`) and two QTableView widgets with sample cars and the repairs of the selected car; add a repair dialog, a positive amount, and rejection of a repair with no car selected. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Auto repair shop” with records (`car_id`, plate, owner; `repair_id`, date, `amount_kop`), two QTableView widgets with sample cars and the repairs of the selected car, and a repair dialog, a positive amount, and rejection of a repair with no car selected; implement SQLite with foreign keys, master-detail, a ban on deleting a car with repairs without an explicit decision, a report of totals, and rollback of a failed operation. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 10. Sports diary {#v10}

**1. Initial level.** Create the PySide6 GUI application “Sports diary” for sample records (id, date, activity, minutes). Define the data in code; implement a QTableView of workouts and the total duration. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Sports diary” with records (id, date, activity, minutes) and a QTableView of workouts and the total duration; add a dialog with minutes of 1–1440 and a proxy filter by activity and an inclusive date range. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Sports diary” with records (id, date, activity, minutes), a QTableView of workouts and the total duration, and a dialog with minutes of 1–1440 and a proxy filter by activity and an inclusive date range; implement SQLite, weekly totals, CSV import with full validation, and saving the filter in QSettings. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 11. Outpatient record {#v11}

**1. Initial level.** Create the PySide6 GUI application “Outpatient record” for sample records (`patient_id`, name; `visit_id`, date, note). Define the data in code; implement master-detail with fictional patients and visits. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Outpatient record” with records (`patient_id`, name; `visit_id`, date, note) and master-detail with fictional patients and visits; add a visit dialog with a nonempty note and patient selection, without real personal data. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Outpatient record” with records (`patient_id`, name; `visit_id`, date, note), master-detail with fictional patients and visits, and a visit dialog with a nonempty note and patient selection, without real personal data; implement an SQLite repository, a period filter, transactional adding, and export of a training report; do not implement medical conclusions. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 12. Recipes {#v12}

**1. Initial level.** Create the PySide6 GUI application “Recipes” for sample records (id, dish, ingredient, `quantity_g`). Define the data in code; implement a QListView of dishes and a table of ingredients for the selected dish. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Recipes” with records (id, dish, ingredient, `quantity_g`) and a QListView of dishes and a table of ingredients for the selected dish; add an ingredient dialog with a positive quantity, a total mass, and selection of a local photo via QFileDialog. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Recipes” with records (id, dish, ingredient, `quantity_g`), a QListView of dishes and a table of ingredients for the selected dish, and an ingredient dialog with a positive quantity, a total mass, and selection of a local photo via QFileDialog; implement SQLite for dishes and ingredients, portion scaling in the report without changing the base data, a check for a missing photo file, and transactional editing. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 13. Stocktaking {#v13}

**1. Initial level.** Create the PySide6 GUI application “Stocktaking” for sample records (id, code, name, `book_quantity`, `actual_quantity`). Define the data in code; implement a QTableView with the computed difference between the actual and book quantities. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Stocktaking” with records (id, code, name, `book_quantity`, `actual_quantity`) and a QTableView with the computed difference between the actual and book quantities; add editing of nonnegative quantities, a color role for discrepancies, and a discrepancies-only filter. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Stocktaking” with records (id, code, name, `book_quantity`, `actual_quantity`), a QTableView with the computed difference between the actual and book quantities, and editing of nonnegative quantities, a color role for discrepancies, and a discrepancies-only filter; implement SQLite, a dialog with a unique code, import of actual quantities from CSV as a single batch, and export of the filtered report. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 14. Music collection {#v14}

**1. Initial level.** Create the PySide6 GUI application “Music collection” for sample records (id, artist, album, track, `duration_s`). Define the data in code; implement an artist–album–track QTreeView on a QStandardItemModel. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Music collection” with records (id, artist, album, track, `duration_s`) and an artist–album–track QTreeView on a QStandardItemModel; add a context menu for adding and removing, a dialog with a positive duration, and album totals. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Music collection” with records (id, artist, album, track, `duration_s`), an artist–album–track QTreeView on a QStandardItemModel, and a context menu for adding and removing, a dialog with a positive duration, and album totals; implement an SQLite repository with stable node ids, track search and tree restoration, and transactionally moving a track between albums. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 15. Mini hotel {#v15}

**1. Initial level.** Create the PySide6 GUI application “Mini hotel” for sample records (id, room, guest, check-in, check-out). Define the data in code; implement a QTableView of bookings with dates and durations. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Mini hotel” with records (id, room, guest, check-in, check-out) and a QTableView of bookings with dates and durations; add a QDateEdit dialog with check-out strictly after check-in; detect a conflict as an overlap of the half-open intervals `[check_in,check_out)` for the same room. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Mini hotel” with records (id, room, guest, check-in, check-out), a QTableView of bookings with dates and durations, and a QDateEdit dialog with check-out strictly after check-in; detect a conflict as an overlap of the half-open intervals `[check_in,check_out)` for the same room; implement SQLite, a filter of rooms available for a period, atomically moving a booking, and tests showing that adjacent dates do not conflict. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 16. HR records {#v16}

**1. Initial level.** Create the PySide6 GUI application “HR records” for sample records (id, name, `department_id`, `salary_kop`). Define the data in code; implement a QTableView of employees with a salary total. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “HR records” with records (id, name, `department_id`, `salary_kop`) and a QTableView of employees with a salary total; add a QSqlRelationalTableModel for departments and employees, a department selection delegate, and a nonnegative salary. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “HR records” with records (id, name, `department_id`, `salary_kop`), a QTableView of employees with a salary total, and a QSqlRelationalTableModel for departments and employees, a department selection delegate, and a nonnegative salary; implement SQLite, OnManualSubmit, a department filter, an add dialog, and rollback on a foreign key violation; save the geometry settings with QSettings. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 17. Team tasks {#v17}

**1. Initial level.** Create the PySide6 GUI application “Team tasks” for sample records (id, title, assignee, status, priority). Define the data in code; implement a QTableView of tasks and a title search. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Team tasks” with records (id, title, assignee, status, priority) and a QTableView of tasks and a title search; add delegates for the status new/`in_progress`/done and a priority of 1–5, and a dialog with a nonempty title. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Team tasks” with records (id, title, assignee, status, priority), a QTableView of tasks and a title search, and delegates for the status new/`in_progress`/done and a priority of 1–5, and a dialog with a nonempty title; implement SQLite, several simultaneous filters, QSettings for the window state, export of visible rows, and saving changes in a single transaction. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 18. Attendance log {#v18}

**1. Initial level.** Create the PySide6 GUI application “Attendance log” for sample records (`student_id`, name, date, present). Define the data in code; implement a QTableView with CheckStateRole for attendance. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Attendance log” with records (`student_id`, name, date, present) and a QTableView with CheckStateRole for attendance; add a custom setData for CheckStateRole, ItemIsUserCheckable, the dataChanged signal, and a total of students present. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Attendance log” with records (`student_id`, name, date, present), a QTableView with CheckStateRole for attendance, and a custom setData for CheckStateRole, ItemIsUserCheckable, the dataChanged signal, and a total of students present; implement SQLite with a unique student–date pair, day selection, marking everyone at once with the option to cancel before the commit, and a CSV report. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 19. Product catalog {#v19}

**1. Initial level.** Create the PySide6 GUI application “Product catalog” for sample records (id, name, category, `price_kop`). Define the data in code; implement a custom QAbstractTableModel with numeric sorting by price. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Product catalog” with records (id, name, category, `price_kop`) and a custom QAbstractTableModel with numeric sorting by price; add a dialog with validation of a nonempty name and a nonnegative price, and a category proxy filter. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Product catalog” with records (id, name, category, `price_kop`), a custom QAbstractTableModel with numeric sorting by price, and a dialog with validation of a nonempty name and a nonnegative price, and a category proxy filter; implement an SQLAlchemy repository with pagination of 50 records and a stable id order; perform the filtering in the query, show the total count, and handle an empty last page. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 20. Ticket office {#v20}

**1. Initial level.** Create the PySide6 GUI application “Ticket office” for sample records (`show_id`, title, time, capacity; seat, buyer). Define the data in code; implement master-detail of shows and occupied seats. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Ticket office” with records (`show_id`, title, time, capacity; seat, buyer) and master-detail of shows and occupied seats; add a sales dialog with a seat of 1–capacity, uniqueness of the show–seat pair, and confirmation of cancellation. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Ticket office” with records (`show_id`, title, time, capacity; seat, buyer), master-detail of shows and occupied seats, and a sales dialog with a seat of 1–capacity, uniqueness of the show–seat pair, and confirmation of cancellation; implement SQLite, a UNIQUE constraint and a sales transaction, handling a simultaneous attempt to take the same seat, and a report of sold and free seats. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 21. Equipment tracking {#v21}

**1. Initial level.** Create the PySide6 GUI application “Equipment tracking” for sample records (id, `inventory_code`, name, recipient, due date). Define the data in code; implement a QTableView of devices with a role for overdue loans. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Equipment tracking” with records (id, `inventory_code`, name, recipient, due date) and a QTableView of devices with a role for overdue loans; add a loan dialog, a ban on lending a device that is already out, and returns. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Equipment tracking” with records (id, `inventory_code`, name, recipient, due date), a QTableView of devices with a role for overdue loans, and a loan dialog, a ban on lending a device that is already out, and returns; implement SQLite with a log, atomic lending/returning, an overdue filter relative to a selected date, and a CSV report without real personal data. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 22. Coin collection {#v22}

**1. Initial level.** Create the PySide6 GUI application “Coin collection” for sample records (id, country, year, denomination, `photo_path`). Define the data in code; implement a QTableView of coins and a details form for the selected coin. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Coin collection” with records (id, country, year, denomination, `photo_path`) and a QTableView of coins and a details form for the selected coin; add a dialog with a year of 1–2100, a nonempty denomination, and photo selection via QFileDialog. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Coin collection” with records (id, country, year, denomination, `photo_path`), a QTableView of coins and a details form for the selected coin, and a dialog with a year of 1–2100, a nonempty denomination, and photo selection via QFileDialog; implement SQLite, country and year filters, a check for an inaccessible image, CSV export, and safe cancellation of editing. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 23. Coach's log {#v23}

**1. Initial level.** Create the PySide6 GUI application “Coach's log” for sample records (id, athlete, age, result). Define the data in code; implement a QTableView of sample results with numeric sorting. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Coach's log” with records (id, athlete, age, result) and a QTableView of sample results with numeric sorting; add a dialog with an age of 6–100 and a nonnegative result, and a filter for an inclusive age range. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Coach's log” with records (id, athlete, age, result), a QTableView of sample results with numeric sorting, and a dialog with an age of 6–100 and a nonnegative result, and a filter for an inclusive age range; implement SQLite, a table of training standards for age groups, a computed role showing whether the standard is met, and export; show the rules for the standards explicitly. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 24. Bookstore {#v24}

**1. Initial level.** Create the PySide6 GUI application “Bookstore” for sample records (`sale_id`, date, book, quantity, `price_kop`). Define the data in code; implement a QTableView of sales and a computed amount of quantity×price. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Bookstore” with records (`sale_id`, date, book, quantity, `price_kop`) and a QTableView of sales and a computed amount of quantity×price; add a dialog with a positive quantity and a nonnegative price, and a period filter. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Bookstore” with records (`sale_id`, date, book, quantity, `price_kop`), a QTableView of sales and a computed amount of quantity×price, and a dialog with a positive quantity and a nonnegative price, and a period filter; implement SQLite for books and sales, an atomic stock decrease without negative values, a report for a period, and QFileDialog for CSV. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 25. Contract register {#v25}

**1. Initial level.** Create the PySide6 GUI application “Contract register” for sample records (id, number, party, start, end). Define the data in code; implement a QTableView of sample contracts sorted by end date. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Contract register” with records (id, number, party, start, end) and a QTableView of sample contracts sorted by end date; add a dialog with an end date no earlier than the start date and a unique number, and a filter of contracts expired as of a selected date. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Contract register” with records (id, number, party, start, end), a QTableView of sample contracts sorted by end date, and a dialog with an end date no earlier than the start date and a unique number, and a filter of contracts expired as of a selected date; implement SQLite, a QMessageBox before deletion, a transactional term extension with history, and QSettings for the filter. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 26. Terminology dictionary {#v26}

**1. Initial level.** Create the PySide6 GUI application “Terminology dictionary” for sample records (id, term, translation, note). Define the data in code; implement a QListView of terms and a details panel. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Terminology dictionary” with records (id, term, translation, note) and a QListView of terms and a details panel; add a QSortFilterProxyModel with literal search and a dialog with a nonempty term and translation. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Terminology dictionary” with records (id, term, translation, note), a QListView of terms and a details panel, and a QSortFilterProxyModel with literal search and a dialog with a nonempty term and translation; implement SQLite, case-insensitive term uniqueness through explicit normalization, atomic CSV import that reports conflicts, and export. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 27. Charitable donations {#v27}

**1. Initial level.** Create the PySide6 GUI application “Charitable donations” for sample records (id, donor, date, `amount_kop`). Define the data in code; implement a QTableView of fictional donations only and the grand total. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Charitable donations” with records (id, donor, date, `amount_kop`) and a QTableView of fictional donations only and the grand total; add a dialog with a positive amount, a period filter, and totals grouped by donor. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Charitable donations” with records (id, donor, date, `amount_kop`), a QTableView of fictional donations only and the grand total, and a dialog with a positive amount, a period filter, and totals grouped by donor; implement SQLite with transactions, deletion confirmation, and CSV export of the visible records and the grand total; do not use real payment data. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 28. Restaurant menu {#v28}

**1. Initial level.** Create the PySide6 GUI application “Restaurant menu” for sample records (id, category, dish, `price_kop`). Define the data in code; implement a QTreeView of categories and a table of dishes in the selected category. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Restaurant menu” with records (id, category, dish, `price_kop`) and a QTreeView of categories and a table of dishes in the selected category; add a price delegate, rejection of a negative value, and a dialog with a nonempty name. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Restaurant menu” with records (id, category, dish, `price_kop`), a QTreeView of categories and a table of dishes in the selected category, and a price delegate, rejection of a negative value, and a dialog with a nonempty name; implement SQLite with categories and dishes, relational category selection, atomically moving a dish, and CSV export of the menu. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 29. League table {#v29}

**1. Initial level.** Create the PySide6 GUI application “League table” for sample records (`match_id`, `team_a`, `team_b`, `goals_a`, `goals_b`). Define the data in code; implement a QTableView of matches and a computed ranking with 3/1/0 points. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “League table” with records (`match_id`, `team_a`, `team_b`, `goals_a`, `goals_b`) and a QTableView of matches and a computed ranking with 3/1/0 points; add a dialog with nonnegative goals, a ban on a team playing itself, and an automatic ranking update after a change. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “League table” with records (`match_id`, `team_a`, `team_b`, `goals_a`, `goals_b`), a QTableView of matches and a computed ranking with 3/1/0 points, and a dialog with nonnegative goals, a ban on a team playing itself, and an automatic ranking update after a change; implement SQLite for matches, a custom ranking model with precise signals or a reset, atomic editing of a result, and sorting by points, goal difference, and name. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

### Variant 30. Fuel log {#v30}

**1. Initial level.** Create the PySide6 GUI application “Fuel log” for sample records (id, car, date, `odometer_km`, liters). Define the data in code; implement a QTableView of refuelings and a total of liters. Show an empty dataset without errors.

**2. Basic level.** Create the PySide6 GUI application “Fuel log” with records (id, car, date, `odometer_km`, liters) and a QTableView of refuelings and a total of liters; add a dialog with positive liters and a nonnegative odometer reading, a car filter, and increasing odometer readings for the car's consecutive records. Explain errors in the window; Cancel leaves the previous data unchanged.

**3. Advanced level.** Create the PySide6 GUI application “Fuel log” with records (id, car, date, `odometer_km`, liters), a QTableView of refuelings and a total of liters, and a dialog with positive liters and a nonnegative odometer reading, a car filter, and increasing odometer readings for the car's consecutive records; implement SQLite and calculation of consumption between full refuelings: liters of the next refueling / odometer difference ×100; reject a zero difference, the first record has no consumption, and add a CSV report. Add pytest checks of the model and a temporary database, including an invalid record, Cancel, and rollback; persist the data across restarts and never silently lose unsaved changes.

## Procedure

1. Define the entities, stable ids, columns, roles, editing rules, and table relationships. Prepare sample data only.
2. Implement the model and test reading, valid editing, rejection without a state change, and the insert/remove signals.
3. Add views, search, and sorting. Separately test `mapToSource` after the order and filter change.
4. Implement dialogs with validation and Cancel. Before changing the state, validate the entire record or import batch.
5. For the database, test commit, rollback, a repeated run, foreign keys, and unsaved changes. For CSV, test the header, encoding, an invalid row, and an inaccessible path.
6. For the advanced level, add pytest tests of the model and the repository with a temporary database; supplement offscreen tests with a visual review of the window. Save the code, the schema, a README, the results, and a screenshot of the form.
7. During the defense, explain who owns the data, the model, the dialog, and the transaction, and demonstrate a rejection without a partial change.
