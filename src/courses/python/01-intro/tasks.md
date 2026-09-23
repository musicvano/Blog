---
title: "Tasks"
description: "Topic 1. Python, PyCharm, and Git: task variants"
outline: [2, 3]
sourceHash: "c75999f43cd2d41936ca744fa9a7e0fd8fbfdba4d24de26543c77f0b5a2b5a76"
---

# Tasks

**Goal:** learn to create and run Python 3.14 projects in PyCharm and the terminal; verify the interpreter, isolate and reproduce dependencies; keep a meaningful change history in a local Git repository.

Complete the task at your chosen difficulty level for your assigned variant. Each variant contains three independent tasks: 1 – initial level, 2 – basic level, 3 – advanced level. You do not need to complete all three unless your instructor requires it.

The main learning path is PyCharm, a `.venv` environment, `venv`, and pip. The advanced level provides practice with uv and command-line arguments. Formulas provide simple reference calculations; this assignment focuses on project organization, execution, dependencies, and change history. You may use the argument validation constructs from Example 3. Use a decimal point for command-line numbers.

## Variants

### Variant 1. Right triangle {#v1}

**1. Initial level.** Create a Python 3.14 program in PyCharm with legs of 3 and 4 cm specified in the code. Calculate and print the hypotenuse `sqrt(a*a+b*b)`, perimeter, and area `a*b/2`. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts two legs in centimeters from command-line arguments and calculates and prints the hypotenuse `sqrt(a*a+b*b)`, perimeter, and area `a*b/2`. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `3:4 5:12`. For each data set, calculate the hypotenuse `sqrt(a*a+b*b)`, perimeter, and area `a*b/2`; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 2. Circle and disk {#v2}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a radius of 5 cm specified in the code. Calculate and print the diameter `2*r`, circumference `2*pi*r`, and area `pi*r*r`. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts a radius in centimeters from command-line arguments and calculates and prints the diameter `2*r`, circumference `2*pi*r`, and area `pi*r*r`. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `5 10 12.5`. For each data set, calculate the diameter `2*r`, circumference `2*pi*r`, and area `pi*r*r`; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 3. Rectangular prism {#v3}

**1. Initial level.** Create a Python 3.14 program in PyCharm with edges of 2, 3, and 4 cm specified in the code. Calculate and print the volume `a*b*c`, surface area `2*(a*b+a*c+b*c)`, and diagonal. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts three edges in centimeters from command-line arguments and calculates and prints the volume `a*b*c`, surface area `2*(a*b+a*c+b*c)`, and diagonal. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `2:3:4 3:4:5`. For each data set, calculate the volume `a*b*c`, surface area `2*(a*b+a*c+b*c)`, and diagonal; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 4. Metal sphere {#v4}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a radius of 3 cm and a density of 7800 kg/m³ specified in the code. Calculate and print the volume `4*pi*r**3/3` in m³ and mass in kilograms; first convert the radius to meters. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts a radius in centimeters and a density in kg/m³ from command-line arguments and calculates and prints the volume `4*pi*r**3/3` in m³ and mass in kilograms; first convert the radius to meters. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `tabulate` package that processes several data sets from arguments, for example `3:7800 2:2700`. For each data set, calculate the volume `4*pi*r**3/3` in m³ and mass in kilograms; first convert the radius to meters; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 5. Isosceles trapezoid {#v5}

**1. Initial level.** Create a Python 3.14 program in PyCharm with bases of 8 and 4 cm and a height of 3 cm specified in the code. Calculate and print the area `(a+b)*h/2` and leg length `sqrt(h*h+((a-b)/2)**2)`. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts two bases and a height in centimeters from command-line arguments and calculates and prints the area `(a+b)*h/2` and leg length `sqrt(h*h+((a-b)/2)**2)`. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `8:4:3 10:6:4`. For each data set, calculate the area `(a+b)*h/2` and leg length `sqrt(h*h+((a-b)/2)**2)`; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 6. Cylindrical tank {#v6}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a radius of 0.5 m and a height of 1.2 m specified in the code. Calculate and print the volume `pi*r*r*h` in m³ and liters; 1 m³ equals 1000 L. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts the tank's radius and height in meters from command-line arguments and calculates and prints the volume `pi*r*r*h` in m³ and liters; 1 m³ equals 1000 L. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `0.5:1.2 0.3:2`. For each data set, calculate the volume `pi*r*r*h` in m³ and liters; 1 m³ equals 1000 L; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 7. Temperature converter {#v7}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a temperature of 20 °C specified in the code. Calculate and print the temperature in Fahrenheit `C*9/5+32` and kelvins `C+273.15`; C must be at least -273.15. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts a temperature in degrees Celsius from command-line arguments and calculates and prints the temperature in Fahrenheit `C*9/5+32` and kelvins `C+273.15`; C must be at least -273.15. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `colorama` package that processes several data sets from arguments, for example `20 0 -40`. For each data set, calculate the temperature in Fahrenheit `C*9/5+32` and kelvins `C+273.15`; C must be at least -273.15; print results with text labels and `colorama` formatting that remains understandable without color, along with the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 8. Uniformly accelerated motion {#v8}

**1. Initial level.** Create a Python 3.14 program in PyCharm with an initial velocity of 2 m/s, acceleration of 3 m/s², and time of 4 s specified in the code. Calculate and print the final velocity `v0+a*t` and displacement `v0*t+a*t*t/2`; time is positive, while the other quantities may be signed. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts initial velocity, acceleration, and time in SI units from command-line arguments and calculates and prints the final velocity `v0+a*t` and displacement `v0*t+a*t*t/2`; time is positive, while the other quantities may be signed. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `2:3:4 0:1:5`. For each data set, calculate the final velocity `v0+a*t` and displacement `v0*t+a*t*t/2`; time is positive, while the other quantities may be signed; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 9. Free fall {#v9}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a height of 20 m specified in the code. Calculate and print the time `sqrt(2*h/g)` and speed `sqrt(2*g*h)` with g = 9.81 m/s², ignoring air resistance. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts a fall height in meters from command-line arguments and calculates and prints the time `sqrt(2*h/g)` and speed `sqrt(2*g*h)` with g = 9.81 m/s², ignoring air resistance. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `20 45 80`. For each data set, calculate the time `sqrt(2*h/g)` and speed `sqrt(2*g*h)` with g = 9.81 m/s², ignoring air resistance; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 10. Ohm's law {#v10}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a voltage of 12 V and resistance of 6 ohms specified in the code. Calculate and print the current `U/R` and power `U*U/R`. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts voltage in volts and resistance in ohms from command-line arguments and calculates and prints the current `U/R` and power `U*U/R`. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `12:6 24:12`. For each data set, calculate the current `U/R` and power `U*U/R`; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 11. Kinetic energy {#v11}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a mass of 2 kg and speed of 3 m/s specified in the code. Calculate and print the kinetic energy `m*v*v/2` in joules. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts mass in kilograms and speed in m/s from command-line arguments and calculates and prints the kinetic energy `m*v*v/2` in joules. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `tabulate` package that processes several data sets from arguments, for example `2:3 5:10`. For each data set, calculate the kinetic energy `m*v*v/2` in joules; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 12. Fluid pressure {#v12}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a depth of 2 m and density of 1000 kg/m³ specified in the code. Calculate and print the gauge hydrostatic pressure `rho*9.81*h` in pascals and kilopascals. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts depth and density in SI units from command-line arguments and calculates and prints the gauge hydrostatic pressure `rho*9.81*h` in pascals and kilopascals. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `2:1000 5:1030`. For each data set, calculate the gauge hydrostatic pressure `rho*9.81*h` in pascals and kilopascals; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 13. Cone {#v13}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a radius of 3 cm and height of 4 cm specified in the code. Calculate and print the volume `pi*r*r*h/3`, slant height `sqrt(r*r+h*h)`, and lateral surface area. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts radius and height in centimeters from command-line arguments and calculates and prints the volume `pi*r*r*h/3`, slant height `sqrt(r*r+h*h)`, and lateral surface area. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `3:4 5:12`. For each data set, calculate the volume `pi*r*r*h/3`, slant height `sqrt(r*r+h*h)`, and lateral surface area; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 14. Hexagonal tile {#v14}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a tile side of 0.2 m and floor area of 12 m² specified in the code. Calculate and print the tile area `3*sqrt(3)*a*a/2`, perimeter, and tile count rounded up; ignore waste. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts the side of a regular hexagon and area to cover in SI units from command-line arguments and calculates and prints the tile area `3*sqrt(3)*a*a/2`, perimeter, and tile count rounded up; ignore waste. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `0.2:12 0.3:20`. For each data set, calculate the tile area `3*sqrt(3)*a*a/2`, perimeter, and tile count rounded up; ignore waste; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 15. Fuel for a trip {#v15}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a distance of 250 km, consumption of 7 L/100 km, and price of 60 UAH/L specified in the code. Calculate and print the required fuel `distance*rate/100` and its cost. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts distance, consumption, and fuel price in the specified units from command-line arguments and calculates and prints the required fuel `distance*rate/100` and its cost. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `250:7:60 100:8:58`. For each data set, calculate the required fuel `distance*rate/100` and its cost; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 16. Download speed {#v16}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a file size of 500 MB and speed of 100 Mbit/s specified in the code. Calculate and print the ideal time `size*8/speed` in seconds, ignoring protocol overhead; 1 MB = 1000000 bytes. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts size in decimal MB and speed in Mbit/s from command-line arguments and calculates and prints the ideal time `size*8/speed` in seconds, ignoring protocol overhead; 1 MB = 1000000 bytes. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `humanize` package that processes several data sets from arguments, for example `500:100 1000:50`. For each data set, calculate the ideal time `size*8/speed` in seconds, ignoring protocol overhead; 1 MB = 1000000 bytes; print a readable duration using `humanize` alongside the exact seconds and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 17. Painting a room {#v17}

**1. Initial level.** Create a Python 3.14 program in PyCharm with room dimensions of 4 by 3 m, a height of 2.5 m, and coverage of 8 m²/L specified in the code. Calculate and print the area of the four walls `2*(a+b)*h` and liters of paint; ignore openings, the ceiling, and the floor. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts length, width, height, and paint coverage in m²/L from command-line arguments and calculates and prints the area of the four walls `2*(a+b)*h` and liters of paint; ignore openings, the ceiling, and the floor. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `4:3:2.5:8 5:4:3:10`. For each data set, calculate the area of the four walls `2*(a+b)*h` and liters of paint; ignore openings, the ceiling, and the floor; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 18. Deposit interest {#v18}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a deposit of 10000 UAH, an annual rate of 8 percent, and a term of 3 years specified in the code. Calculate and print the amounts with simple `P*(1+r*n)` and compound `P*(1+r)**n` interest; r = rate/100, with annual compounding. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts the principal, annual percentage rate, and an integer number of years from command-line arguments and calculates and prints the amounts with simple `P*(1+r*n)` and compound `P*(1+r)**n` interest; r = rate/100, with annual compounding. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `tabulate` package that processes several data sets from arguments, for example `10000:8:3 20000:6:2`. For each data set, calculate the amounts with simple `P*(1+r*n)` and compound `P*(1+r)**n` interest; r = rate/100, with annual compounding; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 19. Food energy {#v19}

**1. Initial level.** Create a Python 3.14 program in PyCharm with 10 g of protein, 5 g of fat, and 20 g of carbohydrates specified in the code. Calculate and print the energy `4*p+9*f+4*c` in kilocalories; components are nonnegative and their sum is positive. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts the masses of protein, fat, and carbohydrates in grams from command-line arguments and calculates and prints the energy `4*p+9*f+4*c` in kilocalories; components are nonnegative and their sum is positive. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `10:5:20 15:3:30`. For each data set, calculate the energy `4*p+9*f+4*c` in kilocalories; components are nonnegative and their sum is positive; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 20. Resizing a photo {#v20}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a width of 1920 px, height of 1080 px, and new width of 1280 px specified in the code. Calculate and print the new height preserving the aspect ratio and rounding to the nearest integer; do not modify image files. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts the original dimensions and new width in pixels from command-line arguments and calculates and prints the new height preserving the aspect ratio and rounding to the nearest integer; do not modify image files. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `1920:1080:1280 1200:800:600`. For each data set, calculate the new height preserving the aspect ratio and rounding to the nearest integer; do not modify image files; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 21. Map scale {#v21}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a distance of 4 cm and scale denominator of 50000 specified in the code. Calculate and print the ground distance `cm*N/100000` in kilometers. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts distance on the map in centimeters and the denominator of a 1:N scale from command-line arguments and calculates and prints the ground distance `cm*N/100000` in kilometers. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `4:50000 2.5:100000`. For each data set, calculate the ground distance `cm*N/100000` in kilometers; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 22. Time zones {#v22}

**1. Initial level.** Create a Python 3.14 program in PyCharm with the instant 2026-09-16T12:00:00+00:00 and zone Europe/Kyiv specified in the code. Calculate and print the local time using `datetime.fromisoformat` and `ZoneInfo`; install tzdata on Windows. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts an ISO instant with a UTC offset and an IANA time zone name from command-line arguments and calculates and prints the local time using `datetime.fromisoformat` and `ZoneInfo`; install tzdata on Windows. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `tzdata` package that accepts an ISO instant with a UTC offset as the first argument, followed by several IANA zones, for example `Europe/Kyiv Europe/London Asia/Tokyo`. For each zone, print the local date, time, and UTC offset. Reject an instant without an offset and unknown zones with an explanation. Add `--help`, test crossing into another date; commit `pyproject.toml`, `uv.lock`, and the README in three meaningful commits. Confirm reproducibility with `uv sync --locked`.

### Variant 23. Buoyant force {#v23}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a volume of 0.01 m³ and fluid density of 1000 kg/m³ specified in the code. Calculate and print the force `rho*9.81*V` in newtons. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts the submerged volume in m³ and fluid density from command-line arguments and calculates and prints the force `rho*9.81*V` in newtons. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `tabulate` package that processes several data sets from arguments, for example `0.01:1000 0.02:800`. For each data set, calculate the force `rho*9.81*V` in newtons; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 24. Heating water {#v24}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a mass of 2 kg, temperatures of 20 and 80 °C, and power of 2000 W specified in the code. Calculate and print the energy `4200*m*(t2-t1)` and time `Q/P`; `0 <= t1 < t2 <= 100`, ignoring heat loss. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts mass, initial and final temperatures, and heater power from command-line arguments and calculates and prints the energy `4200*m*(t2-t1)` and time `Q/P`; `0 <= t1 < t2 <= 100`, ignoring heat loss. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `2:20:80:2000 1:15:95:1500`. For each data set, calculate the energy `4200*m*(t2-t1)` and time `Q/P`; `0 <= t1 < t2 <= 100`, ignoring heat loss; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 25. Thunderstorm {#v25}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a thunder delay of 3 s specified in the code. Calculate and print the distance `343*t` in meters and kilometers; ignore the travel time of light. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts the delay between lightning and thunder in seconds from command-line arguments and calculates and prints the distance `343*t` in meters and kilometers; ignore the travel time of light. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `3 5 8`. For each data set, calculate the distance `343*t` in meters and kilometers; ignore the travel time of light; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 26. Pizza value {#v26}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a diameter of 30 cm and price of 180 UAH specified in the code. Calculate and print the area `pi*d*d/4` and price per cm². Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts the pizza diameter in centimeters and its price from command-line arguments and calculates and prints the area `pi*d*d/4` and price per cm². Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `30:180 40:260`. For each data set, calculate the area `pi*d*d/4` and price per cm²; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 27. Installment plan {#v27}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a price of 12000 UAH and term of 6 months specified in the code. Calculate and print the monthly payment `price/months` without interest or fees; display two decimal places. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts the price and a positive integer number of months from command-line arguments and calculates and prints the monthly payment `price/months` without interest or fees; display two decimal places. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `tabulate` package that processes several data sets from arguments, for example `12000:6 18000:12`. For each data set, calculate the monthly payment `price/months` without interest or fees; display two decimal places; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 28. Electrical appliances {#v28}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a power of 1000 W, duration of 3 h, and rate of 4 UAH/kWh specified in the code. Calculate and print the energy `power*hours/1000` in kWh and its cost. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts power in watts, time in hours, and the rate from command-line arguments and calculates and prints the energy `power*hours/1000` in kWh and its cost. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `1000:3:4 2000:1.5:4`. For each data set, calculate the energy `power*hours/1000` in kWh and its cost; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 29. Heron's formula {#v29}

**1. Initial level.** Create a Python 3.14 program in PyCharm with sides of 3, 4, and 5 cm specified in the code. Calculate and print the semiperimeter p and area `sqrt(p*(p-a)*(p-b)*(p-c))`; the sum of any two sides must exceed the third. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts three triangle sides in centimeters from command-line arguments and calculates and prints the semiperimeter p and area `sqrt(p*(p-a)*(p-b)*(p-c))`; the sum of any two sides must exceed the third. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `3:4:5 5:5:6`. For each data set, calculate the semiperimeter p and area `sqrt(p*(p-a)*(p-b)*(p-c))`; the sum of any two sides must exceed the third; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

### Variant 30. Simple pendulum {#v30}

**1. Initial level.** Create a Python 3.14 program in PyCharm with a length of 1 m specified in the code. Calculate and print the period `2*pi*sqrt(L/9.81)` for small oscillations and the number of complete oscillations in 60 s. Run the file in the project environment, show the result units, and save the code and `.gitignore` in one local commit.

**2. Basic level.** Create a separate project with `.venv` that accepts the pendulum length in meters from command-line arguments and calculates and prints the period `2*pi*sqrt(L/9.81)` for small oscillations and the number of complete oscillations in 60 s. Check the argument count, numeric format, and validity of the values. Describe how to run the program and the reference result in the README, show the interpreter path, and make two meaningful commits. Record external dependencies, if needed, in `requirements.txt`.

**3. Advanced level.** Create a uv project with the `rich` package that processes several data sets from arguments, for example `1 0.5 2`. For each data set, calculate the period `2*pi*sqrt(L/9.81)` for small oscillations and the number of complete oscillations in 60 s; print an aligned table and the number of successfully processed data sets. Add `--help`; reject nonnumeric, nonfinite, and invalid data with an explanation on the error stream. Exit with code 1 if any data sets are rejected, otherwise 0. Save the dependency specification, lock file, and README, make three meaningful commits, and test `uv sync --locked` in a clean copy.

## Procedure

1. Check Python 3.14 and PyCharm. Create a separate directory for your variant and ensure the IDE uses this project's interpreter.
2. Implement your chosen level and explain the formulas and units. Compare the result with at least one manual calculation and one boundary case.
3. Run the program from PyCharm and from the terminal. Save the commands, parameters, and results; show `sys.executable` to verify the environment.
4. Specify the dependencies, create a clean environment, and repeat the run using the README. Do not transfer `.venv` between computers as an installation method.
5. Check `.gitignore`, file diffs, and history. Submit the local repository directory with the hidden `.git`, but without environments or caches. A GitHub link may supplement the submission but is optional.
6. In the report, state the topic, goal, variant and level, tool versions, code, reference runs, and a brief conclusion. During the defense, reproduce a run, explain the interpreter path, and show one meaningful commit.
