---
title: "Tasks"
description: "Topic 14. Databases with Exposed: task variants"
outline: [2, 3]
sourceHash: "d0dd43948ea111612a646975d407813bbbed1d966f49d20c98bafcf3db7aa207"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. School library {#v1}

**1. Initial level.** Create a Kotlin console program "School library" on SQLite and Exposed DSL: books, readers, loans, and overdue items. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "School library": books, readers, loans, and overdue items. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "School library": books, readers, loans, and overdue items. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 2. Online store {#v2}

**1. Initial level.** Create a Kotlin console program "Online store" on SQLite and Exposed DSL: products, orders, line items, and sales reports. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Online store": products, orders, line items, and sales reports. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Online store": products, orders, line items, and sales reports. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 3. Dean's office {#v3}

**1. Initial level.** Create a Kotlin console program "Dean's office" on SQLite and Exposed DSL: students, groups, grades, and rankings. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Dean's office": students, groups, grades, and rankings. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Dean's office": students, groups, grades, and rankings. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 4. Clinic {#v4}

**1. Initial level.** Create a Kotlin console program "Clinic" on SQLite and Exposed DSL: doctors, patients, and appointments. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Clinic": doctors, patients, and appointments. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Clinic": doctors, patients, and appointments. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 5. Vehicle fleet {#v5}

**1. Initial level.** Create a Kotlin console program "Vehicle fleet" on SQLite and Exposed DSL: cars, drivers, trips, and mileage. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Vehicle fleet": cars, drivers, trips, and mileage. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Vehicle fleet": cars, drivers, trips, and mileage. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 6. Movie theater {#v6}

**1. Initial level.** Create a Kotlin console program "Movie theater" on SQLite and Exposed DSL: films, showings, tickets, and hall occupancy. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Movie theater": films, showings, tickets, and hall occupancy. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Movie theater": films, showings, tickets, and hall occupancy. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 7. Sports club {#v7}

**1. Initial level.** Create a Kotlin console program "Sports club" on SQLite and Exposed DSL: members, memberships, and visits. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Sports club": members, memberships, and visits. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Sports club": members, memberships, and visits. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 8. Hotel {#v8}

**1. Initial level.** Create a Kotlin console program "Hotel" on SQLite and Exposed DSL: rooms, guests, and bookings without overlapping dates. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Hotel": rooms, guests, and bookings without overlapping dates. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Hotel": rooms, guests, and bookings without overlapping dates. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 9. Veterinary clinic {#v9}

**1. Initial level.** Create a Kotlin console program "Veterinary clinic" on SQLite and Exposed DSL: animals, owners, and visits. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Veterinary clinic": animals, owners, and visits. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Veterinary clinic": animals, owners, and visits. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 10. Warehouse {#v10}

**1. Initial level.** Create a Kotlin console program "Warehouse" on SQLite and Exposed DSL: products, suppliers, and stock movements. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Warehouse": products, suppliers, and stock movements. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Warehouse": products, suppliers, and stock movements. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 11. Football league {#v11}

**1. Initial level.** Create a Kotlin console program "Football league" on SQLite and Exposed DSL: teams, matches, and a league table built with an SQL query. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Football league": teams, matches, and a league table built with an SQL query. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Football league": teams, matches, and a league table built with an SQL query. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 12. Music collection {#v12}

**1. Initial level.** Create a Kotlin console program "Music collection" on SQLite and Exposed DSL: artists, albums, tracks, and durations. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Music collection": artists, albums, tracks, and durations. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Music collection": artists, albums, tracks, and durations. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 13. Restaurant {#v13}

**1. Initial level.** Create a Kotlin console program "Restaurant" on SQLite and Exposed DSL: menu, tables, orders, and revenue. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Restaurant": menu, tables, orders, and revenue. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Restaurant": menu, tables, orders, and revenue. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 14. Car repair shop {#v14}

**1. Initial level.** Create a Kotlin console program "Car repair shop" on SQLite and Exposed DSL: clients, cars, repairs, and spare parts. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Car repair shop": clients, cars, repairs, and spare parts. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Car repair shop": clients, cars, repairs, and spare parts. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 15. Travel agency {#v15}

**1. Initial level.** Create a Kotlin console program "Travel agency" on SQLite and Exposed DSL: tours, clients, and sales by season. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Travel agency": tours, clients, and sales by season. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Travel agency": tours, clients, and sales by season. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 16. Professional development courses {#v16}

**1. Initial level.** Create a Kotlin console program "Professional development courses" on SQLite and Exposed DSL: students, courses, and certificates. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Professional development courses": students, courses, and certificates. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Professional development courses": students, courses, and certificates. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 17. Bike rental {#v17}

**1. Initial level.** Create a Kotlin console program "Bike rental" on SQLite and Exposed DSL: stations, bikes, and rentals. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Bike rental": stations, bikes, and rentals. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Bike rental": stations, bikes, and rentals. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 18. Project tracking {#v18}

**1. Initial level.** Create a Kotlin console program "Project tracking" on SQLite and Exposed DSL: projects, tasks, employees, and hours. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Project tracking": projects, tasks, employees, and hours. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Project tracking": projects, tasks, employees, and hours. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 19. University department {#v19}

**1. Initial level.** Create a Kotlin console program "University department" on SQLite and Exposed DSL: teachers, courses, and workload. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "University department": teachers, courses, and workload. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "University department": teachers, courses, and workload. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 20. Pharmacy {#v20}

**1. Initial level.** Create a Kotlin console program "Pharmacy" on SQLite and Exposed DSL: medicines, prescriptions, sales, and expiration dates. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Pharmacy": medicines, prescriptions, sales, and expiration dates. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Pharmacy": medicines, prescriptions, sales, and expiration dates. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 21. Airline {#v21}

**1. Initial level.** Create a Kotlin console program "Airline" on SQLite and Exposed DSL: flights, aircraft, passengers, and seats. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Airline": flights, aircraft, passengers, and seats. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Airline": flights, aircraft, passengers, and seats. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 22. Real estate agency {#v22}

**1. Initial level.** Create a Kotlin console program "Real estate agency" on SQLite and Exposed DSL: properties, agents, and deals. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Real estate agency": properties, agents, and deals. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Real estate agency": properties, agents, and deals. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 23. School cafeteria {#v23}

**1. Initial level.** Create a Kotlin console program "School cafeteria" on SQLite and Exposed DSL: menu, students, and meal records. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "School cafeteria": menu, students, and meal records. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "School cafeteria": menu, students, and meal records. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 24. Equipment tracking {#v24}

**1. Initial level.** Create a Kotlin console program "Equipment tracking" on SQLite and Exposed DSL: inventory, responsible persons, and transfers. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Equipment tracking": inventory, responsible persons, and transfers. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Equipment tracking": inventory, responsible persons, and transfers. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 25. Volunteer center {#v25}

**1. Initial level.** Create a Kotlin console program "Volunteer center" on SQLite and Exposed DSL: volunteers, events, and hours worked. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Volunteer center": volunteers, events, and hours worked. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Volunteer center": volunteers, events, and hours worked. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 26. Gaming platform {#v26}

**1. Initial level.** Create a Kotlin console program "Gaming platform" on SQLite and Exposed DSL: games, players, and achievements. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Gaming platform": games, players, and achievements. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Gaming platform": games, players, and achievements. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 27. Charity fund {#v27}

**1. Initial level.** Create a Kotlin console program "Charity fund" on SQLite and Exposed DSL: fundraisers, donors, donations, and reports. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Charity fund": fundraisers, donors, donations, and reports. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Charity fund": fundraisers, donors, donations, and reports. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 28. Driving school {#v28}

**1. Initial level.** Create a Kotlin console program "Driving school" on SQLite and Exposed DSL: students, instructors, lessons, and exams. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Driving school": students, instructors, lessons, and exams. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Driving school": students, instructors, lessons, and exams. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 29. Farm {#v29}

**1. Initial level.** Create a Kotlin console program "Farm" on SQLite and Exposed DSL: fields, crops, and yields. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Farm": fields, crops, and yields. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Farm": fields, crops, and yields. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

### Variant 30. Delivery service {#v30}

**1. Initial level.** Create a Kotlin console program "Delivery service" on SQLite and Exposed DSL: parcels, branches, and status history. For the main entity, define an id, a name, and one numeric attribute. Using the keyboard, add records, view them by id, edit the attribute, and delete by id. Reject empty names and unknown keys, and show the saved records after a restart.

**2. Basic level.** Create a Kotlin console program "Delivery service": parcels, branches, and status history. Describe at least three related SQLite tables with primary and foreign keys. Through a menu, enter objects and operations, and modify and delete records according to the relationship rules. Build a DSL report with a join and an aggregate of the count or an exact total per main entity; include groups with no operations. Show an ordered table and test unknown foreign keys.

**3. Advanced level.** Create a standalone Kotlin program "Delivery service": parcels, branches, and status history. Extract an Exposed/SQLite repository, and implement CRUD and a composite domain operation that changes two tables in one transaction. Accept `--db`, `--action=add|list|report`, `--record=field:value,...`, `--help`; with no arguments, provide a menu. Print an aligned report with totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Test the rollback after the first change, duplicates, foreign keys, reopening the file, and an empty database; add a versioned migration of a new field without data loss.

## Procedure

1. Design the schema of tables, keys, and domain constraints.
2. Create an SQLite database with foreign keys enabled.
3. Implement the repository, CRUD, and the report specified by the variant.
4. Confirm that data persists after reopening the file.
5. Test duplicates, unknown keys, empty results, and rollback.
6. Explain the SQL of two queries and the boundary of each transaction.
