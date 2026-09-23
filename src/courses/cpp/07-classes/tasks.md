---
title: Tasks
description: "Topic 7. Classes and Objects: task variants"
outline: [2, 3]
sourceHash: "5082f117c877816a9b653e0795bb396293000fe57ad2b6c2d6604ef5c95cc5af"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Student {#v1}

**1. Initial level.** Create a console program with an encapsulated class “Student”: implement a name and three scores of 0–100, and the average score. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Student” that implements a name and three scores of 0–100 and the average score, as well as adding a grade and rejecting scores outside the limits. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Student”: implement a student class with a name and three scores of 0–100, and a group of students with a ranking by average score and a stable order for equal scores. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 2. Book {#v2}

**1. Initial level.** Create a console program with an encapsulated class “Book”: implement a title, an inventory number, and a checkout status. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Book” that implements a title, an inventory number, and a checkout status, as well as checking out and returning the book by integer day numbers without double checkout. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Book”: implement a book class with a title, an inventory number, and a checkout status, a book catalog, checking out and returning by day numbers, due dates, and a training fine of 2 units per overdue day. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 3. Date {#v3}

**1. Initial level.** Create a console program with an encapsulated class “Date”: implement a year of 2000–2099, a month, and a day, and a check of the calendar date. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Date” that implements a year of 2000–2099, a month, and a day, and a check of the calendar date, as well as adding a non-negative number of days and handling February in leap years. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Date”: implement a date class with a year of 2000–2099, a month, and a day and a check of the calendar date, an event log, the difference between dates in days, and chronological sorting. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 4. Rectangle {#v4}

**1. Initial level.** Create a console program with an encapsulated class “Rectangle”: implement the coordinates of the lower-left corner and positive sides, and the area. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Rectangle” that implements the coordinates of the lower-left corner and positive sides and the area, as well as moving and scaling by a positive factor. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Rectangle”: implement a rectangle class with the coordinates of the lower-left corner and positive sides, a set of rectangles, and pairwise intersections, where touching has zero area. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 5. Car {#v5}

**1. Initial level.** Create a console program with an encapsulated class “Car”: implement the tank capacity, the fuel, and the mileage, and refueling. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Car” that implements the tank capacity, the fuel, and the mileage and refueling, as well as a trip with a consumption of 8 liters per 100 km without a negative fuel reserve. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Car”: implement a car class with the tank capacity, the fuel, and the mileage, refueling and trips, a trip log, the total distance, and the average consumption based on actual data. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 6. Product and cart {#v6}

**1. Initial level.** Create a console program with an encapsulated class “Product and cart”: implement a product with a name and a price in kopiykas, and the cost of a quantity. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Product and cart” that implements a product with a name and a price in kopiykas and the cost of a quantity, as well as a cart with line items and a discount of 0–50 percent. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Product and cart”: implement a product class with a name and a price in kopiykas, a cart with quantities, and an order with a total, a training tax of 20 percent, and rounding to a kopiyka. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 7. Water meter {#v7}

**1. Initial level.** Create a console program with an encapsulated class “Water meter”: implement the previous and new non-negative readings, and the consumption. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Water meter” that implements the previous and new non-negative readings and the consumption, as well as monotonic readings and a rate in kopiykas per unit. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Water meter”: implement a water meter class with monotonic non-negative readings and a rate in kopiykas, a monthly history, a rate change starting from the next record, and a billing report. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 8. Elevator {#v8}

**1. Initial level.** Create a console program with an encapsulated class “Elevator”: implement the current floor in a building with floors 1–9, and moving to a floor. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Elevator” that implements the current floor in a building with floors 1–9 and moving to a floor, as well as a queue of calls without duplicates and a single movement step. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Elevator”: implement an elevator class with the current floor in a building with floors 1–9 and a queue of calls, and a step-by-step simulation of several elevators that assigns the nearest free one. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 9. Traffic light {#v9}

**1. Initial level.** Create a console program with an encapsulated class “Traffic light”: implement the state red/green/yellow and the next state. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Traffic light” that implements the state red/green/yellow and the next state, as well as phase durations and state changes based on integer time. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Traffic light”: implement a traffic light class with the states red/green/yellow and phase durations, and two traffic lights at an intersection with the invariant that both are never green at the same time. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 10. Hotel room {#v10}

**1. Initial level.** Create a console program with an encapsulated class “Hotel room”: implement a room number, a capacity, and a nightly price, and the cost of a stay. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Hotel room” that implements a room number, a capacity, and a nightly price and the cost of a stay, as well as bookings of non-overlapping half-open intervals of whole days. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Hotel room”: implement a hotel room class with a capacity, a nightly price, and bookings of non-overlapping half-open day intervals, a hotel with rooms, and an occupancy report for a given interval. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 11. Playlist {#v11}

**1. Initial level.** Create a console program with an encapsulated class “Playlist”: implement a track with a title and a positive duration, and a list. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Playlist” that implements a track with a title and a positive duration and a list, as well as adding, removing by number, and the total duration. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Playlist”: implement a track class with a title and a positive duration, a playlist with adding and removing, searching by title, shuffling with an explicit seed, and preserving the original order. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 12. Fitness tracker {#v12}

**1. Initial level.** Create a console program with an encapsulated class “Fitness tracker”: implement daily steps and a goal, and the completion percentage. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Fitness tracker” that implements daily steps and a goal and the completion percentage, as well as seven daily records without duplicate dates and the average. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Fitness tracker”: implement a fitness tracker class with daily step records by date and a goal, a weekly report, a streak of days meeting the goal, and a training estimate of 0.04 kcal per step. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 13. Employee {#v13}

**1. Initial level.** Create a console program with an encapsulated class “Employee”: implement a name, a position, and a salary in kopiykas, and a profile card. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Employee” that implements a name, a position, and a salary in kopiykas and a profile card, as well as a bonus of 0–100 percent and the total training payout. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Employee”: implement an employee class with a name, a position, a salary in kopiykas, and a bonus of 0–100 percent, a department, a payroll sheet, and a total without real tax rules. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 14. Recipe {#v14}

**1. Initial level.** Create a console program with an encapsulated class “Recipe”: implement a name, a number of servings, and ingredient weights, and a list. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Recipe” that implements a name, a number of servings, and ingredient weights and a list, as well as scaling to a positive number of servings. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Recipe”: implement a recipe class with a name, a number of servings, and ingredient weights, a set of recipes, a shopping list, and the calorie content from entered coefficients. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 15. Weather station {#v15}

**1. Initial level.** Create a console program with an encapsulated class “Weather station”: implement finite temperature measurements, and the average. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Weather station” that implements finite temperature measurements and the average, as well as the minimum, the maximum, and rejecting an empty series. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Weather station”: implement a weather station class with finite timestamped temperature measurements, the average, minimum, and maximum, the trend between the first and last points, and a report. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 16. Vector in the plane {#v16}

**1. Initial level.** Create a console program with an encapsulated class “Vector in the plane”: implement finite x and y, and the length. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Vector in the plane” that implements finite x and y and the length, as well as the sum, scaling, and projection onto a nonzero vector as member functions. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Vector in the plane”: implement a plane vector class with finite x and y, a trajectory made of vectors, the total displacement, and the angles between nonzero segments. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 17. Circle {#v17}

**1. Initial level.** Create a console program with an encapsulated class “Circle”: implement a center and a positive radius, and the area. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Circle” that implements a center and a positive radius and the area, as well as checking whether a point belongs to the circle, with the boundary included. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Circle”: implement a circle class with a center and a positive radius, a set of circles, and a classification of pairs: separate, tangent, intersecting, or nested. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 18. Training course {#v18}

**1. Initial level.** Create a console program with an encapsulated class “Training course”: implement a course name and a positive limit, and the number of seats. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Training course” that implements a course name and a positive limit and the number of seats, as well as enrollment by a unique student ID and withdrawal. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Training course”: implement a course class with a name and a positive seat limit, enrollment by a unique student ID, withdrawal, and a FIFO waiting list that automatically fills a freed seat. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 19. Coffee machine {#v19}

**1. Initial level.** Create a console program with an encapsulated class “Coffee machine”: implement supplies of water and beans, and brewing a 100 ml, 10 g serving. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Coffee machine” that implements supplies of water and beans and brewing a 100 ml, 10 g serving, as well as two recipes, refilling, and rejection without partial deduction. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Coffee machine”: implement a coffee machine class with supplies of water and beans, a recipe menu, sales accounting, and remaining resources after commands without partial deduction. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 20. Dice {#v20}

**1. Initial level.** Create a console program with an encapsulated class “Dice”: implement a six-sided die with a generator seeded from input, and a roll. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Dice” that implements a six-sided die with a generator seeded from input and a roll, as well as a set of five dice and the frequencies of values over a series. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Dice”: implement a class of a six-sided die with a generator seeded from input, a set of five dice, and a game with two rerolls of selected dice and scoring of matching faces. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 21. Library card {#v21}

**1. Initial level.** Create a console program with an encapsulated class “Library card”: implement a reader number and a limit of 3 books, and the number of borrowed books. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Library card” that implements a reader number and a limit of 3 books and the number of borrowed books, as well as lending and returning unique book numbers. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Library card”: implement a library card class with a reader number and a limit of 3 books, lending and returning unique book numbers, and a history with operation days, active loans, and rejected requests. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 22. Kitchen timer {#v22}

**1. Initial level.** Create a console program with an encapsulated class “Kitchen timer”: implement an integer duration in seconds, and the remaining time after a step. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Kitchen timer” that implements an integer duration in seconds and the remaining time after a step, as well as the states ready/running/done and restarting. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Kitchen timer”: implement a timer class with an integer duration in seconds and the states ready/running/done, and several named timers with discrete time steps and one-time alerts. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 23. Phone battery {#v23}

**1. Initial level.** Create a console program with an encapsulated class “Phone battery”: implement a capacity and the current charge, and the percentage. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Phone battery” that implements a capacity and the current charge and the percentage, as well as charging and discharging with limit checks. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Phone battery”: implement a battery class with a capacity and the current charge, charging and discharging within limits, a load log, and a time forecast at a constant entered power, with zero handled separately. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 24. Garage {#v24}

**1. Initial level.** Create a console program with an encapsulated class “Garage”: implement a capacity and a list of license plates, and the free spaces. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Garage” that implements a capacity and a list of license plates and the free spaces, as well as entry and exit in whole minutes without negative time. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Garage”: implement a garage class with a capacity and car license plates, entry and exit in whole minutes, a fee of 2 units for each started hour, and a shift summary. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 25. Pizza {#v25}

**1. Initial level.** Create a console program with an encapsulated class “Pizza”: implement a size small/large and a base price, and a description. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Pizza” that implements a size small/large and a base price and a description, as well as toppings with prices and without duplicate names. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Pizza”: implement a pizza class with a size small/large, a base price, and toppings without duplicate names, an order of several pizzas, removing a topping, and a final receipt. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 26. Student group {#v26}

**1. Initial level.** Create a console program with an encapsulated class “Student group”: implement a group code and unique student IDs, and a list. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Student group” that implements a group code and unique student IDs and a list, as well as appointing a group leader only from among the members. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Student group”: implement a student group class with a code, unique student IDs, and a group leader, attendance by day, statistics, and a correct change of the group leader after a withdrawal. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 27. ATM {#v27}

**1. Initial level.** Create a console program with an encapsulated class “ATM”: implement cassettes of 100 and 50 units with non-negative counts, and the cash supply. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “ATM” that implements cassettes of 100 and 50 units with non-negative counts and the cash supply, as well as dispensing an amount that is a multiple of 50 without partially changing the cassettes on a rejection. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “ATM”: implement an ATM class with cassettes of 100, 50, and 20 with non-negative counts, dispensing an amount with the fewest banknotes among the allowed combinations without partially changing the cassettes, and a log. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 28. Chess piece {#v28}

**1. Initial level.** Create a console program with an encapsulated class “Chess piece”: implement a type king/knight and a square 0–7, and the position. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Chess piece” that implements a type king/knight and a square 0–7 and the position, as well as checking a geometrically valid move without other pieces. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Chess piece”: implement a king/knight chess piece class with a color, a square 0–7, and a check of a geometrically valid move, and a board with pieces of two colors that forbids moving onto a piece of the same color, without the rules of check. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 29. E-ticket {#v29}

**1. Initial level.** Create a console program with an encapsulated class “E-ticket”: implement a route and a number issued by a static counter, and a description. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “E-ticket” that implements a route and a number issued by a static counter and a description, as well as the states valid/used and one-time validation. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “E-ticket”: implement an e-ticket class with a route, a unique number issued by a static counter, and the states valid/used, a ticket registry, a search by number, and a log of repeated attempts; forbid copying the number. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

### Variant 30. Aquarium {#v30}

**1. Initial level.** Create a console program with an encapsulated class “Aquarium”: implement a volume and fish with a required number of liters per fish, and the fill level. Enter the data from the keyboard; print the state of the object after construction. Reject invalid arguments in the constructor.

**2. Basic level.** Create a console program for the concept “Aquarium” that implements a volume and fish with a required number of liters per fish and the fill level, as well as adding a species without exceeding the volume. Read the initial data and commands from the keyboard; print the result of each operation. Preserve the invariant after an error; test an ordinary case and an edge case.

**3. Advanced level.** Create a console project “Aquarium”: implement an aquarium class with a volume and fish species with a required number of liters per fish without exceeding the volume, a compatibility table of the entered species, and tracking of fish counts and feed according to entered norms. Read the data and the sequence of operations from the keyboard until the `end` command; `--help` must describe the format. Use composition, constructors with validation, and `const` report member functions. Print a final table, report rejections to `std::cerr`, and exit with code 1 on an input error. Split the classes into `.h` and `.cpp` files, and check that the state is unchanged after a rejection.

## Procedure

1. Write down the input data, the output format, and the class invariants; prepare
  examples of ordinary, empty, edge-case, and invalid data.
1. Define the public interface and the responsibility of each class.
  Explain who owns each resource and when its lifetime ends.
1. Implement a separate console project. Check the arguments before changing
  the state; send error messages to `std::cerr`.
1. Build with `/std:c++latest /EHsc /W4 /utf-8` and fix the warnings;
  run the prepared checks without disabling `assert`.
1. Compare the results with manual calculations. Make sure that an error
  does not leave an object in a state that breaks its contract.
1. Prepare a report with the code, the build command, the actual results,
  a test table, and an explanation of the limitations. Commit the changes to Git.
1. At the defense, explain the chosen interface, run a new edge case,
  and show how a change in the requirements affects the implementation.
