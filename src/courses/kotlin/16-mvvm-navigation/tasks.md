---
title: "Tasks"
description: "Topic 16. MVVM and navigation: task variants"
outline: [2, 3]
sourceHash: "7910ac44edb7a62887013dd0c289931058e6b0e8f8fe78186f928180610efece"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Event diary {#v1}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Event diary": a list, details, editing, SQLite via Exposed. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Event diary": a list, details, editing, SQLite via Exposed. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Event diary": a list, details, editing, SQLite via Exposed. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 2. Home library {#v2}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Home library": a catalog, book details, and loans to friends. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Home library": a catalog, book details, and loans to friends. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Home library": a catalog, book details, and loans to friends. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 3. Expense tracker {#v3}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Expense tracker": categories, entries, and a monthly report. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Expense tracker": categories, entries, and a monthly report. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Expense tracker": categories, entries, and a monthly report. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 4. Cookbook {#v4}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Cookbook": recipes, search, and adding ingredients. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Cookbook": recipes, search, and adding ingredients. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Cookbook": recipes, search, and adding ingredients. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 5. Workout log {#v5}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Workout log": exercises, sets, and progress history. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Workout log": exercises, sets, and progress history. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Workout log": exercises, sets, and progress history. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 6. Contacts {#v6}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Contacts": CRUD, groups, and search by name. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Contacts": CRUD, groups, and search by name. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Contacts": CRUD, groups, and search by name. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 7. Team tasks {#v7}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Team tasks": projects, tasks, and status changes. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Team tasks": projects, tasks, and status changes. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Team tasks": projects, tasks, and status changes. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 8. Word learning {#v8}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Word learning": a dictionary, cards, and progress statistics. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Word learning": a dictionary, cards, and progress statistics. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Word learning": a dictionary, cards, and progress statistics. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 9. Film library {#v9}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Film library": watched films, ratings, and filters. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Film library": watched films, ratings, and filters. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Film library": watched films, ratings, and filters. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 10. Home inventory {#v10}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Home inventory": items by room and search. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Home inventory": items by room and search. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Home inventory": items by room and search. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 11. Mood diary {#v11}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Mood diary": entries and weekly statistics. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Mood diary": entries and weekly statistics. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Mood diary": entries and weekly statistics. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 12. Car log {#v12}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Car log": refueling, maintenance, and cost per mileage. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Car log": refueling, maintenance, and cost per mileage. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Car log": refueling, maintenance, and cost per mileage. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 13. School gradebook {#v13}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "School gradebook": classes, students, grades, and averages. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "School gradebook": classes, students, grades, and averages. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "School gradebook": classes, students, grades, and averages. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 14. Classroom booking {#v14}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Classroom booking": classrooms, slots, and conflict checking. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Classroom booking": classrooms, slots, and conflict checking. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Classroom booking": classrooms, slots, and conflict checking. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 15. Quiz editor {#v15}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Quiz editor": question sets, taking quizzes, and results. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Quiz editor": question sets, taking quizzes, and results. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Quiz editor": question sets, taking quizzes, and results. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 16. Medication schedule {#v16}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Medication schedule": an intake schedule and remaining medication. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Medication schedule": an intake schedule and remaining medication. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Medication schedule": an intake schedule and remaining medication. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 17. Game collection {#v17}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Game collection": platforms, completion status, and rating. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Game collection": platforms, completion status, and rating. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Game collection": platforms, completion status, and rating. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 18. Educational store {#v18}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Educational store": a catalog, a cart, and order history. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Educational store": a catalog, a cart, and order history. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Educational store": a catalog, a cart, and order history. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 19. Tournament {#v19}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Tournament": teams, matches, and an automatic table. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Tournament": teams, matches, and an automatic table. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Tournament": teams, matches, and an automatic table. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 20. Trip planner {#v20}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Trip planner": trips, route stops, and a budget. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Trip planner": trips, route stops, and a budget. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Trip planner": trips, route stops, and a budget. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 21. Family budget {#v21}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Family budget": accounts, income and expenses, and totals. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Family budget": accounts, income and expenses, and totals. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Family budget": accounts, income and expenses, and totals. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 22. Lab work tracker {#v22}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Lab work tracker": courses, assignments, and deadlines. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Lab work tracker": courses, assignments, and deadlines. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Lab work tracker": courses, assignments, and deadlines. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 23. Gardener {#v23}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Gardener": plants, a watering schedule, and reminders. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Gardener": plants, a watering schedule, and reminders. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Gardener": plants, a watering schedule, and reminders. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 24. Reading diary {#v24}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Reading diary": books, reading progress, and quotes. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Reading diary": books, reading progress, and quotes. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Reading diary": books, reading progress, and quotes. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 25. Habit tracker {#v25}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Habit tracker": habits, daily check marks, and streaks. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Habit tracker": habits, daily check marks, and streaks. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Habit tracker": habits, daily check marks, and streaks. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 26. Department equipment {#v26}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Department equipment": equipment, loans, and returns. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Department equipment": equipment, loans, and returns. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Department equipment": equipment, loans, and returns. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 27. Restaurant orders {#v27}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Restaurant orders": tables, dishes, and bills. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Restaurant orders": tables, dishes, and bills. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Restaurant orders": tables, dishes, and bills. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 28. Equipment rental {#v28}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Equipment rental": equipment, clients, and rentals. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Equipment rental": equipment, clients, and rentals. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Equipment rental": equipment, clients, and rentals. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 29. Volunteer hours {#v29}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Volunteer hours": events, participants, and an hours report. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Volunteer hours": events, participants, and an hours report. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Volunteer hours": events, participants, and an hours report. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

### Variant 30. Pets {#v30}

**1. Initial level.** Create a standalone Kotlin/Compose desktop application "Pets": animals, vaccinations, and vet visits. Implement a list and adding the main entity via a ViewModel with StateFlow, with the data provided by an in-memory repository. The user enters a name and a domain field and sees a new row or an error; the UI does not modify the MutableStateFlow directly.

**2. Basic level.** Create a standalone Kotlin/Compose desktop application "Pets": animals, vaccinations, and vet visits. Implement a list, details, and an edit form with a type-safe route id, manual passing of an Exposed/SQLite repository, and ViewModel validation. After a successful save, refresh the list; on an error, keep the draft; show an unknown id explicitly. Test Back, Cancel, and reopening the file.

**3. Advanced level.** Create a standalone Kotlin/Compose desktop application "Pets": animals, vaccinations, and vet visits. Build MVVM with a repository interface, an SQLite implementation, list/details/edit routes, and loading/data/error states. Implement a domain report, a transactional composite action, and protection against repeated clicks. Add `--db=path`, `--help`, and `--report=from:to` for a report without a GUI: an aligned table and totals, errors to stderr, codes 0/2/1. Write ViewModel tests with a fake and SQLite tests for rollback, keys, and migration; check that data persists after a restart.

## Procedure

1. Define the routes, the UiState, and the domain interface of the repository.
2. Pass dependencies through constructors; do not create the database in the UI.
3. Run JDBC off the Main dispatcher, and keep the draft on an error.
4. Test an unknown id, going back, repeated clicks, and a database failure.
5. Run the ViewModel tests with a fake and the SQLite integration tests.
6. Check that data persists after a restart and describe the path to the data.
