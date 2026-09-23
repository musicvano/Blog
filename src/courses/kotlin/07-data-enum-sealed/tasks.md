---
title: "Tasks"
description: "Topic 7. Data classes, enums, sealed: task variants"
outline: [2, 3]
sourceHash: "d735cd05f5d88c8f2b9fe8b67ec5a5f460075b9d1c8afb1988178e37c3061a6f"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

Provide a class UML diagram; for states, also show the allowed transitions. Use entries and an exhaustive when when processing an entire enum or sealed type. All educational rates and compatibility rules are specified in the problem. For the advanced level, support `--help`, named arguments, repeatable `--item` with a format description, keyboard input with no arguments, stderr and code 2 for errors, and code 0 for success. The report has aligned rows and totals. Do not call external payment, medical, postal, or other services for local models.

## Variants

### Variant 1. Pizza orders {#v1}

**1. Initial level.** Create a Kotlin/JVM console program: enter a pizza name, the size SMALL/MEDIUM/LARGE, and a quantity of 1..20; enum Size defines 10000/15000/20000 kopiykas, and data PizzaOrder stores the data; print the total. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter a pizza name, the size SMALL/MEDIUM/LARGE, and a quantity of 1..20; enum Size defines 10000/15000/20000 kopiykas, and data PizzaOrder stores the data; print the total. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter a pizza name, the size SMALL/MEDIUM/LARGE, and a quantity of 1..20; enum Size defines 10000/15000/20000 kopiykas, and data PizzaOrder stores the data; print the total. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: sealed states Created, Paid(amount), and Ready, with validated transitions. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 2. An intersection {#v2}

**1. Initial level.** Create a Kotlin/JVM console program: enter RED/YELLOW/GREEN and a step count of 0..20; enum Signal transitions RED→GREEN→YELLOW→RED; print the sequence. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter RED/YELLOW/GREEN and a step count of 0..20; enum Signal transitions RED→GREEN→YELLOW→RED; print the sequence. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter RED/YELLOW/GREEN and a step count of 0..20; enum Signal transitions RED→GREEN→YELLOW→RED; print the sequence. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: data Intersection with an identifier and sealed events Tick/Disable/Enable. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 3. A deck of cards {#v3}

**1. Initial level.** Create a Kotlin/JVM console program: enter a player count of 1..4; use enum Suit with four suits, Rank with 13 ranks, and data Card; deal 5 cards to each player from an ordered deck without randomness. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter a player count of 1..4; use enum Suit with four suits, Rank with 13 ranks, and data Card; deal 5 cards to each player from an ordered deck without randomness. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter a player count of 1..4; use enum Suit with four suits, Rank with 13 ranks, and data Card; deal 5 cards to each player from an ordered deck without randomness. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: value PlayerId and a report of the remaining deck, with no duplicate cards. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 4. Parcel tracking {#v4}

**1. Initial level.** Create a Kotlin/JVM console program: enter the event code created, accepted, or delivered and, respectively, a number, location, or recipient; use sealed ParcelEvent and an exhaustive description. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter the event code created, accepted, or delivered and, respectively, a number, location, or recipient; use sealed ParcelEvent and an exhaustive description. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter the event code created, accepted, or delivered and, respectively, a number, location, or recipient; use sealed ParcelEvent and an exhaustive description. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: a validated created→accepted→delivered sequence. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 5. Form validation {#v5}

**1. Initial level.** Create a Kotlin/JVM console program: enter a name and age in 0..120; sealed ValidationOutcome is Valid with a data Profile or Invalid with text; the name is nonempty and the age is at least 16. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter a name and age in 0..120; sealed ValidationOutcome is Valid with a data Profile or Invalid with text; the name is nonempty and the age is at least 16. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter a name and age in 0..120; sealed ValidationOutcome is Valid with a data Profile or Invalid with text; the name is nonempty and the age is at least 16. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: accumulation of all messages about invalid fields. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 6. The solar system {#v6}

**1. Initial level.** Create a Kotlin/JVM console program: enter MERCURY/EARTH/JUPITER and a mass of 0..10000 kg; use enum Planet with g=3.70/9.81/24.79 and print the force m×g. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter MERCURY/EARTH/JUPITER and a mass of 0..10000 kg; use enum Planet with g=3.70/9.81/24.79 and print the force m×g. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter MERCURY/EARTH/JUPITER and a mass of 0..10000 kg; use enum Planet with g=3.70/9.81/24.79 and print the force m×g. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: print all entries and the educational period sqrt(a³) years for a=0.39/1/5.20 AU. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 7. Patient cards {#v7}

**1. Initial level.** Create a Kotlin/JVM console program: enter a fictional name, a birth year in 1900..2026, and a number; use data PatientCard and a factory with validation; print the masked number. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter a fictional name, a birth year in 1900..2026, and a number; use data PatientCard and a factory with validation; print the masked number. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter a fictional name, a birth year in 1900..2026, and a number; use data PatientCard and a factory with validation; print the masked number. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: copy to change a contact label, with no actual medical data. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 8. A coffee machine {#v8}

**1. Initial level.** Create a Kotlin/JVM console program: enter the state Idle, Paid, or Brewing and the command pay, brew, or finish; sealed MachineState includes an amount for Paid; allowed transitions are Idle→Paid→Brewing→Idle. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter the state Idle, Paid, or Brewing and the command pay, brew, or finish; sealed MachineState includes an amount for Paid; allowed transitions are Idle→Paid→Brewing→Idle. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter the state Idle, Paid, or Brewing and the command pay, brew, or finish; sealed MachineState includes an amount for Paid; allowed transitions are Idle→Paid→Brewing→Idle. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: a cancel event that refunds the educational amount only from Paid. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 9. Work shifts {#v9}

**1. Initial level.** Create a Kotlin/JVM console program: enter a day MON..SUN and start and end times in 0..24; use enum Day and data Shift, with end greater than start; print the duration. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter a day MON..SUN and start and end times in 0..24; use enum Day and data Shift, with end greater than start; print the duration. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter a day MON..SUN and start and end times in 0..24; use enum Day and data Shift, with end greater than start; print the duration. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: checks for overlapping shifts on the same day and a weekly total. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 10. A text editor {#v10}

**1. Initial level.** Create a Kotlin/JVM console program: enter initial text and the command Append(text) or Delete(count); use sealed EditCommand, allowing deletion of no more than the text length; print the new text. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter initial text and the command Append(text) or Delete(count); use sealed EditCommand, allowing deletion of no more than the text length; print the new text. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter initial text and the command Append(text) or Delete(count); use sealed EditCommand, allowing deletion of no more than the text length; print the new text. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: Undo with a history of previous immutable states for up to 20 commands. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 11. Currencies {#v11}

**1. Initial level.** Create a Kotlin/JVM console program: enter UAH/USD/EUR and an amount of 0..1000000 kopiykas; use enum Currency and value Amount, with data Money combining amount and currency; print the formatted value. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter UAH/USD/EUR and an amount of 0..1000000 kopiykas; use enum Currency and value Amount, with data Money combining amount and currency; print the formatted value. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter UAH/USD/EUR and an amount of 0..1000000 kopiykas; use enum Currency and value Amount, with data Money combining amount and currency; print the formatted value. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: conversion using explicitly educational rates UAH=1, USD=40, EUR=44, rounded down to a kopiyka. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 12. The ECTS scale {#v12}

**1. Initial level.** Create a Kotlin/JVM console program: enter a score of 0..100; use enum Grade with lower bounds A90/B82/C74/D64/E60/FX35/F0; print the grade and bounds. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter a score of 0..100; use enum Grade with lower bounds A90/B82/C74/D64/E60/FX35/F0; print the grade and bounds. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter a score of 0..100; use enum Grade with lower bounds A90/B82/C74/D64/E60/FX35/F0; print the grade and bounds. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: a student table using data classes and frequencies for all entries. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 13. Application settings {#v13}

**1. Initial level.** Create a Kotlin/JVM console program: enter the theme LIGHT/DARK and a font size of 8..32; use object AppConfig with validation and enum Theme; print the configuration. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter the theme LIGHT/DARK and a font size of 8..32; use object AppConfig with validation and enum Theme; print the configuration. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter the theme LIGHT/DARK and a font size of 8..32; use object AppConfig with validation and enum Theme; print the configuration. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: data ConfigSnapshot and restoration of the previous configuration. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 14. Payment processing {#v14}

**1. Initial level.** Create a Kotlin/JVM console program: enter a balance and a positive amount in kopiykas; sealed PaymentOutcome has Approved(remaining), Declined(missing), and Failed(reason); calculate the result locally. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter a balance and a positive amount in kopiykas; sealed PaymentOutcome has Approved(remaining), Declined(missing), and Failed(reason); calculate the result locally. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter a balance and a positive amount in kopiykas; sealed PaymentOutcome has Approved(remaining), Declined(missing), and Failed(reason); calculate the result locally. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: a log of data PaymentRecord values and a summary without actual payments. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 15. Road signs {#v15}

**1. Initial level.** Create a Kotlin/JVM console program: enter WARNING/PROHIBITION/INFORMATION and a sign number; enum Category has fictional points of 0/10/0, and data Sign stores the sign; print a description; these are not traffic rules. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter WARNING/PROHIBITION/INFORMATION and a sign number; enum Category has fictional points of 0/10/0, and data Sign stores the sign; print a description; these are not traffic rules. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter WARNING/PROHIBITION/INFORMATION and a sign number; enum Category has fictional points of 0/10/0, and data Sign stores the sign; print a description; these are not traffic rules. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: sealed Found/Unknown results for searching an educational catalog. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 16. Game elements {#v16}

**1. Initial level.** Create a Kotlin/JVM console program: enter FIRE/WATER/GRASS for the attacking and defending types; use enum Element and a base strength of 10; WATER against FIRE, FIRE against GRASS, and GRASS against WATER give ×2, while other pairs give ×1. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter FIRE/WATER/GRASS for the attacking and defending types; use enum Element and a base strength of 10; WATER against FIRE, FIRE against GRASS, and GRASS against WATER give ×2, while other pairs give ×1. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter FIRE/WATER/GRASS for the attacking and defending types; use enum Element and a base strength of 10; WATER against FIRE, FIRE against GRASS, and GRASS against WATER give ×2, while other pairs give ×1. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: data Fighter and sealed CombatResult after one deterministic round. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 17. A vehicle fleet {#v17}

**1. Initial level.** Create a Kotlin/JVM console program: enter a brand and a year in 1990..2026; use data Car with value CarId and a companion factory with a single-threaded counter; print the record. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter a brand and a year in 1990..2026; use data Car with value CarId and a companion factory with a single-threaded counter; print the record. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter a brand and a year in 1990..2026; use data Car with value CarId and a companion factory with a single-threaded counter; print the record. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: copy with a changed status label and a report of unique IDs within one process. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 18. Weather conditions {#v18}

**1. Initial level.** Create a Kotlin/JVM console program: enter sunny, rainy, or snowy and a temperature in −50..50; sealed Weather has separate data classes with a temperature; advice is cap, umbrella, or coat. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter sunny, rainy, or snowy and a temperature in −50..50; sealed Weather has separate data classes with a temperature; advice is cap, umbrella, or coat. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter sunny, rainy, or snowy and a temperature in −50..50; sealed Weather has separate data classes with a temperature; advice is cap, umbrella, or coat. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: data Forecast for a day MON..SUN and an exhaustive report. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 19. Access roles {#v19}

**1. Initial level.** Create a Kotlin/JVM console program: enter GUEST/USER/ADMIN and the action read/write/manage; enum Role allows read for GUEST, read/write for USER, and everything for ADMIN; print the decision. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter GUEST/USER/ADMIN and the action read/write/manage; enum Role allows read for GUEST, read/write for USER, and everything for ADMIN; print the decision. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter GUEST/USER/ADMIN and the action read/write/manage; enum Role allows read for GUEST, read/write for USER, and everything for ADMIN; print the decision. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: data User with value UserId and sealed Allowed/Denied(reason). Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 20. Expression tokens {#v20}

**1. Initial level.** Create a Kotlin/JVM console program: enter two numbers in −1000..1000 and the sign + or −; sealed Token has Number(value), Plus, and Minus; print the value of the three-token expression. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter two numbers in −1000..1000 and the sign + or −; sealed Token has Number(value), Plus, and Minus; print the value of the three-token expression. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter two numbers in −1000..1000 and the sign + or −; sealed Token has Number(value), Plus, and Minus; print the value of the three-token expression. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: a sequence of up to 20 numbers without precedence, evaluated left to right. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 21. A movie theater {#v21}

**1. Initial level.** Create a Kotlin/JVM console program: enter SMALL/LARGE, a time in 0..23, and a seat count; enum Hall has 30/100 seats, and data Session validates the bounds; print the remaining seats. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter SMALL/LARGE, a time in 0..23, and a seat count; enum Hall has 30/100 seats, and data Session validates the bounds; print the remaining seats. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter SMALL/LARGE, a time in 0..23, and a seat count; enum Hall has 30/100 seats, and data Session validates the bounds; print the remaining seats. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: sealed BookingResult with success and failure due to insufficient seats. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 22. Measurement units {#v22}

**1. Initial level.** Create a Kotlin/JVM console program: enter METER/CENTIMETER/KILOMETER and a nonnegative value up to 10000; enum Unit defines factors of 1/0.01/1000; print meters. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter METER/CENTIMETER/KILOMETER and a nonnegative value up to 10000; enum Unit defines factors of 1/0.01/1000; print meters. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter METER/CENTIMETER/KILOMETER and a nonnegative value up to 10000; enum Unit defines factors of 1/0.01/1000; print meters. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: value Meters and a table of conversions to all entries. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 23. HTTP responses {#v23}

**1. Initial level.** Create a Kotlin/JVM console program: enter the code 200/404/500 and text; sealed HttpOutcome has Success(body), NotFound, and ServerError(message); print a description without a network request. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter the code 200/404/500 and text; sealed HttpOutcome has Success(body), NotFound, and ServerError(message); print a description without a network request. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter the code 200/404/500 and text; sealed HttpOutcome has Success(body), NotFound, and ServerError(message); print a description without a network request. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: data RequestRecord with a local ID and counts of outcomes. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 24. A habit tracker {#v24}

**1. Initial level.** Create a Kotlin/JVM console program: enter a habit name, DAILY/WEEKLY, and a completion count of 0..100; use enum Frequency and data Habit; print the record and a copy with an incremented counter. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter a habit name, DAILY/WEEKLY, and a completion count of 0..100; use enum Frequency and data Habit; print the record and a copy with an incremented counter. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter a habit name, DAILY/WEEKLY, and a completion count of 0..100; use enum Frequency and data Habit; print the record and a copy with an incremented counter. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: sealed CheckOutcome and a prohibition on recording the same day twice. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 25. An elevator {#v25}

**1. Initial level.** Create a Kotlin/JVM console program: enter a floor in 1..10 and the event Call(target), Open, or Close; use sealed ElevatorEvent and data Cabin with enum Door; movement is allowed only with closed doors. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter a floor in 1..10 and the event Call(target), Open, or Close; use sealed ElevatorEvent and data Cabin with enum Door; movement is allowed only with closed doors. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter a floor in 1..10 and the event Call(target), Open, or Close; use sealed ElevatorEvent and data Cabin with enum Door; movement is allowed only with closed doors. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: a sequence of up to 20 events, with failure leaving the old state unchanged. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 26. Identifiers {#v26}

**1. Initial level.** Create a Kotlin/JVM console program: enter two positive numbers; use value UserId and OrderId and data Order with these fields; factories validate positivity; print the typed record. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter two positive numbers; use value UserId and OrderId and data Order with these fields; factories validate positivity; print the typed record. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter two positive numbers; use value UserId and OrderId and data Order with these fields; factories validate positivity; print the typed record. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: a factory from a string and sealed ParseOutcome for an invalid number. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 27. A school schedule {#v27}

**1. Initial level.** Create a Kotlin/JVM console program: enter a day MON..FRI, a lesson number in 1..8, and the subject MATH/LANGUAGE/IT; use enum types and data Slot; print a description. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter a day MON..FRI, a lesson number in 1..8, and the subject MATH/LANGUAGE/IT; use enum types and data Slot; print a description. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter a day MON..FRI, a lesson number in 1..8, and the subject MATH/LANGUAGE/IT; use enum types and data Slot; print a description. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: detection of conflicts with the same day and lesson number. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 28. A vending machine {#v28}

**1. Initial level.** Create a Kotlin/JVM console program: enter coins ONE/TWO/FIVE and a product priced at 700 kopiykas; enum Coin defines 100/200/500, with sealed states Idle/Credit(cents)/Dispensed(change). Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter coins ONE/TWO/FIVE and a product priced at 700 kopiykas; enum Coin defines 100/200/500, with sealed states Idle/Credit(cents)/Dispensed(change). Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter coins ONE/TWO/FIVE and a product priced at 700 kopiykas; enum Coin defines 100/200/500, with sealed states Idle/Credit(cents)/Dispensed(change). Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: a coin sequence, cancel, and refund of the inserted amount. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 29. Geometric shapes {#v29}

**1. Initial level.** Create a Kotlin/JVM console program: enter circle or rectangle and positive dimensions up to 1000; sealed Figure has data Circle/Rectangle, and an exhaustive when returns the area. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter circle or rectangle and positive dimensions up to 1000; sealed Figure has data Circle/Rectangle, and an exhaustive when returns the area. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter circle or rectangle and positive dimensions up to 1000; sealed Figure has data Circle/Rectangle, and an exhaustive when returns the area. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: add Triangle with three validated sides and Heron's formula. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

### Variant 30. Blood groups {#v30}

**1. Initial level.** Create a Kotlin/JVM console program: enter the educational ABO groups O/A/B/AB for a donor and recipient; enum Group defines O as compatible with all, A with A/AB, B with B/AB, and AB only with AB; print a Boolean result; the model ignores Rh and is not medical advice. Provide UML of the types; for states, show allowed transitions.

**2. Basic level.** Create a Kotlin/JVM console program: enter the educational ABO groups O/A/B/AB for a donor and recipient; enum Group defines O as compatible with all, A with A/AB, B with B/AB, and AB only with AB; print a Boolean result; the model ignores Rh and is not medical advice. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Provide UML of the types; for states, show allowed transitions.

**3. Advanced level.** Create a Kotlin/JVM console program: enter the educational ABO groups O/A/B/AB for a donor and recipient; enum Group defines O as compatible with all, A with A/AB, B with B/AB, and AB only with AB; print a Boolean result; the model ignores Rh and is not medical advice. Process up to 20 records, checking fields, unknown names, and bounds; use an exhaustive when for closed alternatives and print a table. Extension: data PairRequest and a table of all 16 educational pairs. Add `--help`, named parameters, repeatable `--item` with field descriptions, and keyboard input with no arguments. Errors: stderr/code 2; success: code 0. Print totals and provide five checks. Provide UML of the types; for states, show allowed transitions.

## Procedure

1. Determine where values, constants, and alternative states are needed.
2. Draw UML and, for a sealed model, state transitions and data.
3. Implement validation in every constructor or factory.
4. Test equals, copy, and destructuring for data classes.
5. Go through all enum constants and all sealed variants.
6. Test an invalid transition, an unknown name, and numeric boundaries.
7. Provide code, UML, a README, and at least five checks.
8. During the presentation, add a new sealed type variant and show which places the compiler asks you to extend.

