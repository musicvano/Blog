---
title: Tasks
description: "Topic 10. Inheritance and Polymorphism: task variants"
outline: [2, 3]
sourceHash: "dce6491c69f5afcc16621f23d722da1f7b0a86bea9593481a15dc275aec983b6"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Bank accounts {#v1}

**1. Initial level.** Create a console program “Bank Accounts”: implement checking and deposit accounts; virtual monthly. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Bank Accounts”: implement checking and deposit accounts; virtual monthly, and add a credit account with an explicitly specified debt limit. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Bank Accounts”: implement a hierarchy of accounts (checking, deposit, credit with a debt limit) with a virtual monthly accrual, monthly, and a portfolio, monthly practice accruals and final balances. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 2. Media library {#v2}

**1. Initial level.** Create a console program “Media Library”: implement a book and a film with a common description. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Media Library”: implement a book and a film with a common description, and add a podcast and a title search. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Media Library”: implement a hierarchy of media (book, film, podcast) with a common virtual description, and a catalog with search, sorting and a duration report for the relevant kinds. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 3. Game characters {#v3}

**1. Initial level.** Create a console program “Game Characters”: implement a warrior and a mage with a virtual action. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Game Characters”: implement a warrior and a mage with a virtual action, and add an archer, resource consumption and a refusal when the resource is insufficient. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Game Characters”: implement a hierarchy of characters (warrior, mage, archer) with a virtual action and resource consumption, and a turn-based battle with a log and deterministic damage rules. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 4. Store products {#v4}

**1. Initial level.** Create a console program “Store Products”: implement electronics and a food product with a common price. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Store Products”: implement electronics and a food product with a common price, and add a warranty and a practice shelf life in days. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Store Products”: implement a hierarchy of products (electronics with a warranty, a food product with a shelf life in days) with a common virtual price, and a cart with a total and rejection of expired items. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 5. Documents {#v5}

**1. Initial level.** Create a console program “Documents”: implement an invoice and a certificate of completion with a common description. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Documents”: implement an invoice and a certificate of completion with a common description, and add a contract and unique numbers. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Documents”: implement a hierarchy of documents (invoice, certificate of completion, contract) with unique numbers, an amount and a virtual description, and a register with search, printing via Base& and totals of the amounts. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 6. Sensors {#v6}

**1. Initial level.** Create a console program “Sensors”: implement temperature and humidity with a virtual reading. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Sensors”: implement temperature and humidity with a virtual reading, and add pressure and a finiteness check of the entered measurements. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Sensors”: implement a hierarchy of sensors (temperature, humidity, pressure) with a virtual reading of finite values, and a station with thresholds and an alarm log without physical devices. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 7. Notifications {#v7}

**1. Initial level.** Create a console program “Notifications”: implement practice email and SMS with a virtual text result. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Notifications”: implement practice email and SMS with a virtual text result, and add push and a message priority. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Notifications”: implement a hierarchy of practice notifications (email, SMS, push) with a priority and a virtual text result, and a local simulation of a mailing with filtering, without actually sending anything. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 8. Insurance policies {#v8}

**1. Initial level.** Create a console program “Insurance Policies”: implement car and home policies with entered arbitrary coefficients. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Insurance Policies”: implement car and home policies with entered arbitrary coefficients, and add a third policy type and rejection of a negative base. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Insurance Policies”: implement a hierarchy of policies (car, home, a third type) with a virtual premium calculation from an entered base and arbitrary coefficients, and a practice portfolio without real insurance or medical advice. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 9. Musical instruments {#v9}

**1. Initial level.** Create a console program “Musical Instruments”: implement a string and a wind instrument with a common play. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Musical Instruments”: implement a string and a wind instrument with a common play, and add a percussion instrument and a volume of 0–100. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Musical Instruments”: implement a hierarchy of instruments (string, wind, percussion) with a volume of 0–100 and a virtual play, and an orchestra with an order of parts and a polymorphic text performance. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 10. University staff {#v10}

**1. Initial level.** Create a console program “University Staff”: implement a lecturer and a lab assistant with a common workload. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “University Staff”: implement a lecturer and a lab assistant with a common workload, and add an administrator and a check of the hours. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “University Staff”: implement a hierarchy of staff (lecturer, lab assistant, administrator) with a virtual workload in hours, and a staff sheet with totals by explicitly specified practice formulas. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 11. Chess pieces {#v11}

**1. Initial level.** Create a console program “Chess Pieces”: implement a king and a knight with a check of the move geometry. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Chess Pieces”: implement a king and a knight with a check of the move geometry, and add a bishop and control of the board bounds. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Chess Pieces”: implement a hierarchy of pieces (king, knight, bishop) with a virtual check of the move geometry within the board, and a board with obstacles and a ban on moving onto your own piece, without the check rules. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 12. Delivery {#v12}

**1. Initial level.** Create a console program “Delivery”: implement a courier and pickup with a virtual price. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Delivery”: implement a courier and pickup with a virtual price, and add postal delivery and rejection of an invalid weight. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Delivery”: implement a hierarchy of delivery methods (courier, pickup, post) with a virtual price by weight, and a comparison of the available methods for a set of orders. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 13. Practice taxpayers {#v13}

**1. Initial level.** Create a console program “Practice Taxpayers”: implement two kinds with entered arbitrary rates. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Practice Taxpayers”: implement two kinds with entered arbitrary rates, and add a third kind and a common check for a non-negative base. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Practice Taxpayers”: implement a hierarchy of three kinds of practice taxpayers with a virtual charge on a non-negative base and entered arbitrary rates, and a table of charges that is explicitly not a real tax return. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 14. Sports team {#v14}

**1. Initial level.** Create a console program “Sports Team”: implement a player and a goalkeeper with common statistics. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Sports Team”: implement a player and a goalkeeper with common statistics, and add a coach with a different summary metric. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Sports Team”: implement a hierarchy of team members (player, goalkeeper, coach) with a virtual summary metric, and a team register without mixing incompatible metrics into an arbitrary ranking. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 15. Hotel rooms {#v15}

**1. Initial level.** Create a console program “Hotel Rooms”: implement standard and suite rooms with a nightly price. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Hotel Rooms”: implement standard and suite rooms with a nightly price, and add apartments and extra beds. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Hotel Rooms”: implement a hierarchy of rooms (standard, suite, apartments with extra beds) with a virtual nightly price, the cost of bookings and an occupancy report in whole days. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 16. Menu items {#v16}

**1. Initial level.** Create a console program “Menu Items”: implement a dish and a drink with a common cost. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Menu Items”: implement a dish and a drink with a common cost, and add a set meal with a fixed practice discount. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Menu Items”: implement a hierarchy of menu items (dish, drink, set meal with a discount) with a virtual cost, and a table order and a receipt using a collection of unique\_ptr. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 17. Robots {#v17}

**1. Initial level.** Create a console program “Robots”: implement a cleaner and a delivery robot with a common step. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Robots”: implement a cleaner and a delivery robot with a common step, and add a guard and a charge limit. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Robots”: implement a hierarchy of robots (cleaner, delivery robot, guard) with a virtual step and a charge limit, and a shift simulation with a log of actions and refusals when discharged. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 18. Plants {#v18}

**1. Initial level.** Create a console program “Plants”: implement two kinds with different watering intervals. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Plants”: implement two kinds with different watering intervals, and add a third kind and the date of the last watering as a day number. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Plants”: implement a hierarchy of three kinds of plants with different virtual watering intervals and the day of the last watering, and a practice watering calendar without agronomic advice. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 19. Game weapons {#v19}

**1. Initial level.** Create a console program “Game Weapons”: implement melee and ranged attacks with virtual damage. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Game Weapons”: implement melee and ranged attacks with virtual damage, and add a magic attack and resource consumption. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Game Weapons”: implement a hierarchy of weapons (melee, ranged, magic attack) with virtual damage and resource consumption, and a series of attacks with explicit formulas and a refusal when ammunition runs out. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 20. Test questions {#v20}

**1. Initial level.** Create a console program “Test Questions”: implement a yes/no question and a numeric question with a common grading. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Test Questions”: implement a yes/no question and a numeric question with a common grading, and add a multiple-choice question and answer validation. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Test Questions”: implement a hierarchy of questions (yes/no, numeric, multiple choice) with virtual grading and answer validation, and a test, a final score and a review of the answers using a polymorphic set. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 21. Expression tree {#v21}

**1. Initial level.** Create a console program “Expression Tree”: implement a number and an addition with virtual evaluate. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Expression Tree”: implement a number and an addition with virtual evaluate, and add multiplication and non-owning observers of subtrees. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Expression Tree”: implement a hierarchy of expression nodes (number, addition, multiplication) with virtual evaluate, a tree with unique\_ptr, evaluation and simplification of adding zero. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 22. Payment methods {#v22}

**1. Initial level.** Create a console program “Payment Methods”: implement a card and cash with an arbitrary fee. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Payment Methods”: implement a card and cash with an arbitrary fee, and add a third local mock and limits. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Payment Methods”: implement a hierarchy of payment methods (card, cash, a third local mock) with limits and a virtual arbitrary fee, and a comparison of fees without a network or real payments. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 23. Subscriptions {#v23}

**1. Initial level.** Create a console program “Subscriptions”: implement basic and family subscriptions with a monthly price. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Subscriptions”: implement basic and family subscriptions with a monthly price, and add premium and a user limit. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Subscriptions”: implement a hierarchy of subscriptions (basic, family, premium) with a monthly price and a user limit, a practice bill for a set of subscriptions and plan changes. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 24. Lab records {#v24}

**1. Initial level.** Create a console program “Lab Records”: implement two types of synthetic measurements with a description. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Lab Records”: implement two types of synthetic measurements with a description, and add a third type and a check of the units. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Lab Records”: implement a hierarchy of three types of synthetic lab measurements with units and a virtual description, and a catalog of practice records without medical norms, diagnoses or conclusions. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 25. Real estate {#v25}

**1. Initial level.** Create a console program “Real Estate”: implement an apartment and a land plot with an arbitrary valuation. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Real Estate”: implement an apartment and a land plot with an arbitrary valuation, and add a house and a check of the area. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Real Estate”: implement a hierarchy of real estate (apartment, land plot, house) with an area and a virtual arbitrary valuation, and a comparative practice catalog with entered prices, not a market valuation. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 26. Geometric solids {#v26}

**1. Initial level.** Create a console program “Geometric Solids”: implement a cube and a cylinder with a virtual volume. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Geometric Solids”: implement a cube and a cylinder with a virtual volume, and add a cone and the surface area. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Geometric Solids”: implement a hierarchy of solids (cube, cylinder, cone) with a virtual volume and surface area, a collection of solids, sums of volumes and rejection of invalid dimensions. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 27. Transit tickets {#v27}

**1. Initial level.** Create a console program “Transit Tickets”: implement single and multi-trip tickets. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Transit Tickets”: implement single and multi-trip tickets, and add a reduced-fare ticket and control of the used trips. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Transit Tickets”: implement a hierarchy of tickets (single, multi-trip, reduced-fare) with virtual validation and a trip counter, and a validation register that forbids reusing a single ticket. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 28. Electrical appliances {#v28}

**1. Initial level.** Create a console program “Electrical Appliances”: implement a lamp and a heater with a power rating. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Electrical Appliances”: implement a lamp and a heater with a power rating, and add operating modes and hours of use. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Electrical Appliances”: implement a hierarchy of appliances (lamp, heater) with a power rating, modes and hours of use, and a table of energy and cost under an entered arbitrary rate. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 29. Game levels {#v29}

**1. Initial level.** Create a console program “Game Levels”: implement two kinds of obstacles with virtual pass. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Game Levels”: implement two kinds of obstacles with virtual pass, and add a third obstacle and the hero’s resource. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Game Levels”: implement a hierarchy of level obstacles (three kinds) with virtual pass, which consumes the hero’s resource, and a sequential run-through with a log and deterministic refusals. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

### Variant 30. Exception hierarchy {#v30}

**1. Initial level.** Create a console program “Exception Hierarchy”: implement AppError and ValidationError. Enter the data from the keyboard; perform the common operation through a base reference and print the result. Add a virtual destructor and override.

**2. Basic level.** Create a console program “Exception Hierarchy”: implement AppError and ValidationError, and add NotFoundError and the correct order of catch. Enter the data from the keyboard, store the different kinds via `unique_ptr<Base>` and print the results of the common operation. Test valid and invalid arguments, and avoid slicing.

**3. Advanced level.** Create a console project “Exception Hierarchy”: implement an exception hierarchy of AppError, ValidationError and NotFoundError with the correct order of catch, and command processing with typed errors and failure statistics. Read the input records and commands until `end`; `--help` describes the formats. Use a polymorphic collection of unique owners, and check the contract of each kind through the base interface. Print a table of results and totals; send errors to `std::cerr`, with exit code 1 on invalid input. Test an empty collection, mixed types and the end of the lifetime of derived objects.

## Procedure

1. Write down the input data, the output format and the class invariants; prepare
  examples of ordinary, empty, boundary and invalid data.
1. Define the public interface and the responsibility of each class.
  Explain who owns each resource and when its lifetime ends.
1. Implement a separate console project. Check the arguments before changing
  the state; send error messages to `std::cerr`.
1. Build with `/std:c++latest /EHsc /W4 /utf-8` and eliminate the warnings;
  run the prepared checks without disabling `assert`.
1. Compare the results with manual calculations. Make sure that an error
  doesn’t leave an object in a state that breaks its contract.
1. Prepare a report with the code, the build command, the actual results,
  a table of tests and an explanation of the limitations. Commit the changes to Git.
1. At the defense, explain the chosen interface, run a new edge case
  and show how a change in the requirements affects the implementation.
