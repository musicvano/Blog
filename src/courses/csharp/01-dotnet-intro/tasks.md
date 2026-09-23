---
title: "Tasks"
description: "Topic 1. .NET and program structure: task variants"
outline: [2, 3]
sourceHash: "dc384ab278acaf64717cca69f9ef20c8c69e02cf0244f076eb4f767b94e0d25f"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Right triangle {#v1}

**1. Initial level.** Create a console program that calculates and displays the hypotenuse, perimeter, and area of a right triangle with legs a = 3 cm and b = 4 cm (values set in the program), including explanations and units.

**2. Basic level.** Create a console program that asks the user for the lengths of the two legs of a right triangle in centimeters (real numbers), repeats the prompt for nonnumeric or nonpositive input, and displays the hypotenuse, perimeter, and area with two decimal places.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives pairs of leg lengths as command-line arguments in `a:b` format (for example, `3:4 5:12 6,5:7`). For each pair, calculate the hypotenuse, perimeter, area, and both acute angles in degrees, and print an aligned table with a totals row (total area). Skip invalid pairs with a message to the error stream; if there are no arguments, read pairs from the keyboard until an empty line is entered. `Main` returns 0 if at least one pair was processed, otherwise 1.

### Variant 2. Circle and disk {#v2}

**1. Initial level.** Create a console program that calculates and displays the diameter, circumference, and disk area of a circle with radius r = 5 cm (value set in the program).

**2. Basic level.** Create a console program that asks for a circle's radius in centimeters, repeats the prompt for nonnumeric or nonpositive input, and displays the diameter, circumference, and disk area with two decimal places.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that calculates circle properties for a range of radii specified by `--from`, `--to`, and `--step` (for example, `--from 1 --to 10 --step 0,5`), or for a list of radii passed as arguments. Print an aligned “radius — diameter — circumference — area” table, and separately the radius at which the area first exceeds 100 cm². Reject invalid or conflicting options (a nonpositive step or `--from` greater than `--to`) with an explanation; `--help` displays usage instructions.

### Variant 3. Cube {#v3}

**1. Initial level.** Create a console program that calculates and displays the face area, total surface area, volume, and space diagonal of a cube with edge a = 2.5 cm (value set in the program).

**2. Basic level.** Create a console program that asks for a cube's edge length in centimeters, checks that the input is positive, and displays the total surface area, volume, and diagonal length with two decimal places.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives cube edge lengths as command-line arguments and an optional `--units mm|cm|m` option specifying input units (default `cm`). Convert values to centimeters and print an aligned “edge — surface area — volume — diagonal” table, followed by the average volume and the number of the cube with the largest volume. Reject unknown units and invalid values with a message; with no arguments, read edge lengths from the keyboard until an empty line is entered.

### Variant 4. Metal sphere {#v4}

**1. Initial level.** Create a console program that calculates and displays the surface area and volume of a sphere with radius r = 3 cm (value set in the program).

**2. Basic level.** Create a console program that asks for a sphere's radius in centimeters and material density in kg/m³, checks that both values are positive, and displays the surface area, volume, and mass in grams.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives spheres as command-line arguments in `radius:material` format (for example, `3:steel 1,5:gold 10:aluminum`), with material densities (steel, gold, aluminum, copper) set in the program. For each sphere, calculate volume, surface area, and mass, and print an aligned table with the total mass in kilograms. An unknown material or invalid radius produces a message to the error stream; if no spheres are processed, `Main` returns 1.

### Variant 5. Isosceles trapezoid {#v5}

**1. Initial level.** Create a console program that calculates and displays the area and midline of a trapezoid with bases a = 6 cm, b = 10 cm, and height h = 4 cm (values set in the program).

**2. Basic level.** Create a console program that asks for a trapezoid's base lengths and height in centimeters, checks that all values are positive, and displays the area and midline with two decimal places.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts `--a`, `--b`, and `--h` (the bases and height of an isosceles trapezoid) in any order. Calculate the area, midline, leg length, perimeter, and angles at the longer base in degrees; if the bases are equal, report that the figure is a rectangle. Prompt for missing option values, reject unknown options, and display usage instructions for `--help`.

### Variant 6. Polyline in the plane {#v6}

**1. Initial level.** Create a console program that calculates and displays the distance between points A(1; 2) and B(4; 6), with coordinates set in the program, and the coordinates of the midpoint of segment AB.

**2. Basic level.** Create a console program that asks for the coordinates of two points (four real numbers, which may be negative), repeats the prompt for invalid number formats, and displays the distance and midpoint coordinates.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives at least two points as command-line arguments in `x;y` format (for example, `1;2 4;6 7;2`) and treats them as polyline vertices. Print a table of segments (start, end, length), the total polyline length, the perimeter of the closed polyline, the number of the longest segment, and the distance between the first and last points. Numbers may use a comma or period; invalid points or fewer than two points produce an error message and exit code 1.

### Variant 7. Triangle from three sides {#v7}

**1. Initial level.** Create a console program that calculates and displays the perimeter and area using Heron's formula for a triangle with sides of 5, 6, and 7 cm (values set in the program).

**2. Basic level.** Create a console program that asks for three triangle side lengths, checks that they are positive and satisfy the triangle inequality, and displays the perimeter and area using Heron's formula, or reports that the triangle does not exist.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives triples of sides as command-line arguments in `a/b/c` format (for example, `3/4/5 2/2/3 1/1/5`). For each triple, check whether a triangle exists, calculate its perimeter, area, and angles in degrees, and classify it by sides (equilateral, isosceles, scalene) and angles (acute, right, obtuse). Print an aligned results table, followed by the count of each triangle type and the count of rejected triples.

### Variant 8. Temperature scales {#v8}

**1. Initial level.** Create a console program that converts 36.6 °C (value set in the program) to Fahrenheit and Kelvin and displays the result.

**2. Basic level.** Create a console program that asks for a temperature and scale (C, F, or K), checks that the temperature is not below absolute zero, and displays it in the other two scales with one decimal place.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives temperatures with scale suffixes as command-line arguments (for example, `36,6C 98,6F 300K -40C`) and an optional `--digits N` option (0–4 decimal places). Print an aligned table of Celsius, Fahrenheit, and Kelvin values, followed by the lowest and highest temperatures in °C. Reject values below absolute zero and unknown scales with messages to the error stream.

### Variant 9. Body mass index {#v9}

**1. Initial level.** Create a console program that calculates and displays the body mass index of a person weighing 70 kg and measuring 1.75 m tall (values set in the program).

**2. Basic level.** Create a console program that asks for weight (20–300 kg) and height (100–250 cm), checks these limits, and displays the body mass index with one decimal place and its category: below 18.5 — underweight, 18.5–24.9 — normal, 25–29.9 — overweight, 30 and above — obesity.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives records as command-line arguments in `Name:weight:height` format (weight in kg, height in cm). For each record, calculate the body mass index and category (underweight, normal, overweight, obesity), the normal weight range for the height (index 18.5–24.9), and the weight change in kilograms needed to reach the nearest normal-range boundary. Print an aligned table and the average body mass index; skip invalid records with a message.

### Variant 10. Uniformly accelerated motion {#v10}

**1. Initial level.** Create a console program that calculates and displays the distance and speed after 10 s of motion for a body with an initial speed of 5 m/s and acceleration of 2 m/s² (values set in the program).

**2. Basic level.** Create a console program that asks for initial speed (m/s), acceleration (m/s²), and travel time (s, nonnegative), validates the input, and displays distance traveled and final speed with two decimal places.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts `--v0`, `--a`, `--t`, and `--step` and prints a “time — speed — distance” table from 0 to the specified time at the specified step. If acceleration is negative, the body stops when speed reaches zero: display the stopping time and distance, after which speed and distance remain unchanged. Prompt for missing options, reject invalid values (negative time or nonpositive step), and display usage instructions for `--help`.

### Variant 11. Energy of a moving vehicle {#v11}

**1. Initial level.** Create a console program that calculates and displays the kinetic energy in joules of a 2 kg body moving at 3 m/s (values set in the program).

**2. Basic level.** Create a console program that asks for a body's mass (kg) and speed (km/h), checks that both are positive, converts speed to m/s, and displays kinetic energy in joules and kilojoules.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives records as command-line arguments in `mass:speed` format, with speed in km/h or m/s (for example, `1500:90km/h 12000:20m/s`). For each record, calculate kinetic energy in kJ, the height from which the body would have to fall to gain that energy, and stopping distance at a deceleration of 7 m/s²; print an aligned results table with total energy. Reject invalid records and unknown units with messages to the error stream.

### Variant 12. Electric circuit {#v12}

**1. Initial level.** Create a console program that calculates and displays current and power for a 50 Ω resistor at 220 V (values set in the program).

**2. Basic level.** Create a console program that asks for voltage (V), resistance (Ω, greater than zero), and operating time (h), validates the input, and displays current, power, and energy consumed in kWh.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts `--voltage` and a list of resistor values as arguments (for example, `--voltage 12 100 220 470`). Print a table of current and power for each resistor connected individually, along with equivalent resistance, total current, and power when all resistors are connected in series and in parallel. For the series connection, display the voltage across each resistor; reject invalid resistances with a message.

### Variant 13. Averages {#v13}

**1. Initial level.** Create a console program that calculates and displays the arithmetic and geometric means of 4, 9, and 16 (values set in the program).

**2. Basic level.** Create a console program that asks for three positive numbers, repeats the prompt for invalid input, and displays their arithmetic, geometric, and harmonic means with three decimal places.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives any number of numeric command-line arguments, skipping invalid ones with a message. Display the count, minimum, maximum, sum, arithmetic mean, root mean square, geometric mean, and harmonic mean (the last two only if all numbers are positive; otherwise provide an explanation). With no arguments, read numbers from the keyboard until an empty line; if there are no valid numbers, `Main` returns 1.

### Variant 14. Bank deposit {#v14}

**1. Initial level.** Create a console program that calculates and displays the final balance and interest earned for a deposit of 10,000 UAH at 12% annually over 3 years with annual compounding (values set in the program).

**2. Basic level.** Create a console program that asks for the deposit amount (UAH), annual rate (%), term (whole years), and number of compounding periods per year (1, 4, or 12), validates the input, and displays the final amount and earnings in currency format.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts `--sum`, `--rate`, `--years`, and `--monthly` (monthly contribution, UAH) and simulates a deposit with monthly compounding. Print a yearly “opening balance — contributions — interest — closing balance” table, total earnings and earnings after 23% tax on interest, and compare the result with annual compounding. Reject invalid values; `--help` displays usage instructions.

### Variant 15. Loan {#v15}

**1. Initial level.** Create a console program that calculates and displays the fixed monthly payment, total payments, and total interest paid for a 100,000 UAH loan at 18% annually over 24 months (values set in the program).

**2. Basic level.** Create a console program that asks for the loan amount (UAH), annual rate (%), and term (months), validates the input, and displays the fixed monthly payment, total payments, and total interest paid in currency format.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts `--sum`, `--rate`, and `--months` and prints a repayment schedule: month number, payment, interest, principal repaid, and remaining balance. Below the table, compare the total interest paid under fixed-payment and equal-principal repayment schemes; handle a 0% rate separately. Reject invalid values with a message; `--help` displays usage instructions.

### Variant 16. Speed units {#v16}

**1. Initial level.** Create a console program that converts 90 km/h (value set in the program) to m/s, miles per hour, and knots, and displays the result.

**2. Basic level.** Create a console program that asks for a speed and units (km/h, m/s, or mph), checks that the speed is nonnegative, and displays it in the other two units with two decimal places.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives speeds with units as command-line arguments (for example, `90km/h 25m/s 60mph`) and an optional `--distance` (km). Print an aligned table of speeds in km/h, m/s, mph, and knots, the pace in minutes and seconds per kilometer, and, if distance is specified, the time to cover it in `hh:mm:ss` format. Reject unknown units and negative values with messages to the error stream.

### Variant 17. Cylindrical tank {#v17}

**1. Initial level.** Create a console program that calculates and displays volume, lateral surface area, and total surface area for a cylinder with radius 2 cm and height 5 cm (values set in the program).

**2. Basic level.** Create a console program that asks for the diameter and height of a cylindrical tank in centimeters, checks that both are positive, and displays its volume in liters and surface area to paint in m².

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts `--diameter` and `--height` (in meters) and `--flow` (pump flow rate, L/min). Display tank volume in liters, the time to fill it in “X h Y min” format, and a table of water level and volume at every 10% of filling time. If `--level` is specified (current level, m), start the calculation from that level. Reject invalid values; `--help` displays usage instructions.

### Variant 18. Truncated cone {#v18}

**1. Initial level.** Create a console program that calculates and displays slant height, lateral surface area, and volume for a cone with base radius 3 cm and height 4 cm (values set in the program).

**2. Basic level.** Create a console program that asks for a cone's base radius and height in centimeters, checks that both are positive, and displays the slant height, lateral and total surface areas, and volume.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts `--R`, `--r`, and `--h` (base radii and height of a truncated cone) and calculates the slant height, lateral and total surface areas, and volume. If `--r` is 0, report that the figure is a cone; if the radii are equal, report that it is a cylinder, and use the corresponding formulas. Compare the results in a table with the volumes of a cylinder and cone of the same height and radius `--R`; reject invalid values.

### Variant 19. Quadratic equation {#v19}

**1. Initial level.** Create a console program that solves x² − 5x + 6 = 0 (coefficients set in the program) and displays its roots.

**2. Basic level.** Create a console program that asks for quadratic equation coefficients a, b, and c (a must be nonzero), calculates the discriminant, and displays two roots, one root, or a message that there are no real roots.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives coefficients a, b, and c as command-line arguments (or prompts for them) and displays the equation in conventional notation (for example, `2x² − 3x + 1 = 0`). Handle every case: a linear equation when a = 0 (one, no, or infinitely many solutions), two real roots, one root, and complex roots in `p ± qi` form; for a quadratic equation, also display the parabola's vertex and factorization if the roots are real.

### Variant 20. Regular polygon {#v20}

**1. Initial level.** Create a console program that calculates and displays the perimeter and area of a regular hexagon with side length 4 cm (value set in the program).

**2. Basic level.** Create a console program that asks for a regular polygon's number of sides (an integer of at least 3) and side length (cm), validates the input, and displays its perimeter, area, and interior angle in degrees.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts `--side`, `--from`, and `--to` and prints an aligned table for regular polygons with side counts from `--from` to `--to`: figure name (triangle, square, pentagon, etc.; “n-gon” for larger ones), perimeter, area, incircle and circumcircle radii, and interior angle. Below the table, display the smallest side count for which the polygon's area is at least 95% of the circumcircle's area; reject invalid values.

### Variant 21. Free fall {#v21}

**1. Initial level.** Create a console program that calculates and displays the fall time and impact speed of a body falling freely from 45 m (g = 9.81 m/s²; values set in the program).

**2. Basic level.** Create a console program that asks for the fall height (m, greater than zero), validates it, and displays fall time in seconds and impact speed in m/s and km/h.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts `--height` and `--planet`, with `earth`, `moon`, `mars`, or `jupiter` (gravitational accelerations set in the program). Print a table of height above the surface and speed for each second of the fall, with the final row showing impact, and compare fall times from the same height on all four planets. An unknown planet or invalid height produces a message and exit code 1.

### Variant 22. Trip cost {#v22}

**1. Initial level.** Create a console program that calculates and displays fuel needed and trip cost for a 350 km trip with consumption of 7 L per 100 km and a fuel price of 55 UAH per liter (values set in the program).

**2. Basic level.** Create a console program that asks for distance (km), fuel consumption (L per 100 km), price per liter (UAH), and number of passengers, validates the input, and displays total trip cost and cost per passenger.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives route segments as command-line arguments in `distance:consumption` format (for example, `120:6,5 230:8`) and `--price`, `--passengers`, and `--round-trip` (outbound and return trip). Print an aligned table of segments with fuel quantity and cost, route totals, cost per passenger, and cost per kilometer. Invalid segments and a missing price produce an error message.

### Variant 23. Duration {#v23}

**1. Initial level.** Create a console program that converts 10,000 seconds (value set in the program) to hours, minutes, and seconds, and displays the result.

**2. Basic level.** Create a console program that asks for a number of seconds (a nonnegative integer) and displays the duration in days, hours, minutes, and seconds, omitting zero components and using correct singular and plural forms (1 day, 2 days, 5 days).

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives durations as command-line arguments in different formats: seconds (`3725`), `hh:mm:ss` (`1:02:05`), or abbreviated notation (`2h30m`, `45m10s`). Print a table with each duration in seconds and `d.hh:mm:ss` format, along with total and average duration. Reject invalid entries with messages to the error stream.

### Variant 24. Washers {#v24}

**1. Initial level.** Create a console program that calculates and displays the area of the ring between circles of radii 5 cm and 3 cm (values set in the program).

**2. Basic level.** Create a console program that asks for a ring's outer and inner radii (cm), checks that the outer radius is larger and both are positive, and displays the areas of both disks and the ring.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives washers as command-line arguments in `D:d:t` format (outer diameter, inner diameter, and thickness in mm), plus `--density` (kg/m³, default 7850) and `--count` (number of washers of each size). Print a table of area, volume, and mass for one washer and the batch, followed by total mass in kilograms. Reject invalid dimensions (inner diameter not smaller than outer diameter) with a message.

### Variant 25. Resistor connections {#v25}

**1. Initial level.** Create a console program that calculates and displays total resistance for 100 Ω and 220 Ω resistors (values set in the program) connected in series and in parallel.

**2. Basic level.** Create a console program that asks for three resistor values (Ω), checks that they are positive, and displays total resistance in series and in parallel.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives resistances with SI prefixes as command-line arguments (for example, `470 2,2k 1M`) and `--voltage`. Calculate equivalent resistance for series and parallel connections, display it with the appropriate prefix (Ω, kΩ, MΩ), and print a table of current and power for each resistor for both connection types. Reject invalid resistance entries with messages to the error stream.

### Variant 26. Packing boxes {#v26}

**1. Initial level.** Create a console program that calculates and displays the volume, total surface area, and diagonal length of a rectangular prism measuring 2 × 3 × 4 cm (values set in the program).

**2. Basic level.** Create a console program that asks for a box's length, width, and height (cm), checks that they are positive, and displays volume in liters, cardboard area including 10% for gluing, and diagonal length.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives box dimensions as command-line arguments in `LxWxH` format (for example, `20x30x15`) and `--item` with item dimensions in the same format. For each box, determine how many items fit when packed tightly in rows, considering all six item orientations, and print a table with the best orientation, item count, and percentage of volume filled. Reject invalid dimensions with a message.

### Variant 27. Progressions {#v27}

**1. Initial level.** Create a console program that calculates and displays the last term and sum of an arithmetic progression with first term 2, common difference 3, and 10 terms (values set in the program).

**2. Basic level.** Create a console program that asks for the first term and common difference of an arithmetic progression (real numbers) and the term count (an integer of at least 1), validates the input, and displays the nth term and the sum of the first n terms.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts `--first`, `--n`, and either `--d` (arithmetic common difference) or `--q` (geometric common ratio). Print the terms 10 per line, their sum, and, if `--limit` is specified, the smallest number of terms whose sum exceeds that value (or a message that it never will). Specifying both `--d` and `--q`, or neither, is an error.

### Variant 28. Currency exchange {#v28}

**1. Initial level.** Create a console program that converts 5,000 UAH to dollars and euros at exchange rates of 41.50 and 48.20 UAH (values set in the program), and displays the result.

**2. Basic level.** Create a console program that asks for an amount in hryvnias and the dollar and euro exchange rates, checks that all values are positive, and displays the dollar and euro amounts in currency format.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method and predefined buy and sell rates for USD, EUR, PLN, and GBP. Accept `--amount`, `--from`, and `--to` (currency codes, including UAH), and `--fee` (bank commission, %); exchange through the hryvnia using the appropriate buy or sell rate and fee, and display the fee and amount received. If `--to` is omitted, print a table of exchanges into all currencies; reject unknown currency codes with a message.

### Variant 29. Average speed {#v29}

**1. Initial level.** Create a console program that calculates and displays the average speed over a journey of 120 km in 1.5 h followed by 80 km in 1 h (values set in the program).

**2. Basic level.** Create a console program that asks for distances (km) and travel times (h) for two journey segments, checks that all values are positive, and displays the speed on each segment and the overall average speed.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives journey segments as command-line arguments in `distance@hh:mm` format (for example, `120@1:30 80@1:00`) and `--start` with the departure time (`08:15`). Print a segment table with speed and arrival time at each segment's end, total distance, total time, average speed, and the number of the fastest segment; mark arrivals after midnight as the next day. Reject invalid entries with a message.

### Variant 30. Clock hands {#v30}

**1. Initial level.** Create a console program that calculates and displays the smaller angle between the hour and minute hands at 3:30 (time set in the program).

**2. Basic level.** Create a console program that asks for hours (0–23) and minutes (0–59), validates the input, and displays the smaller angle between the hour and minute hands in degrees.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives times as command-line arguments in `hh:mm` format and displays the smaller angle between the hands for each value. If `--angle` (degrees) is specified, instead display every time, to the nearest minute within 12 hours, when the angle between the hands differs from the specified angle by no more than 1°. Reject invalid times or angles outside 0–180 with a message.

## Procedure

1. Study the theory and worked examples.
2. Install the .NET 10 SDK and one development environment: Visual Studio 2026, Visual Studio Code with C# Dev Kit, or JetBrains Rider; verify installation with `dotnet --info`.
3. Create a solution and project for your assigned task variant.
4. Implement the program for the chosen difficulty level.
5. Test the program with valid and invalid input.
6. Demonstrate the program to your instructor, explain the code, and answer the review questions.
