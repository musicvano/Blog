---
title: "Tasks"
description: "Topic 2. Types, variables, and operators: task variants"
outline: [2, 3]
sourceHash: "26716b5c3f0b40b6ac9be910f0de3e85eff7833a8948dcbfb7fa2eeae96d3e78"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Utility bills {#v1}

**1. Initial level.** Create a console program that uses previous and current meter readings for electricity (12 450 and 12 618 kWh), water (341 and 349 m³), and gas (2 105 and 2 163 m³), with respective rates of 4.32 UAH, 30.38 UAH, and 7.96 UAH per unit (values set in the program), to calculate using `decimal` and display consumption, the cost of each service, and the total due.

**2. Basic level.** Create a console program that asks for previous and current electricity, water, and gas meter readings and rates per unit (UAH), checks that readings are nonnegative and current readings are no lower than previous ones, and prints an aligned “service — consumption — rate — amount” table with a total rounded to kopiykas using `decimal`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives meter readings as arguments in `service:previous:current` format (for example, `power:12450:12618 water:341:349`) and rates through `--power`, `--water`, and `--gas`. For electricity, `--limit` specifies the consumption above which the `--power-high` rate applies. Print a table with a total, each service's percentage share, and the amount rounded using `MidpointRounding.AwayFromZero`. Report invalid records to the error stream; return 0, 1 (some records rejected), or 2 (invalid options); `--help` displays usage instructions.

### Variant 2. Installment purchase {#v2}

**1. Initial level.** Create a console program that uses `decimal` to calculate and display the fee, total amount, and monthly payment rounded to kopiykas for a laptop costing 38 999 UAH purchased in 10 installments with a one-time fee of 2.9% (values set in the program).

**2. Basic level.** Create a console program that asks for a product's price (UAH), number of months (2–24), and monthly fee as a percentage of the price, validates the input, and displays the monthly payment rounded to kopiykas, the last payment adjusted for rounding remainders, total additional cost, and that cost as a percentage of the price.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts `--price`, `--months`, and `--fee` (monthly fee, %) and optional `--credit` (annual loan rate, %). Print a comparison table for two payment methods: installments (equal payments with a fee, adjusting the last payment for remaining kopiykas) and a loan with fixed payment *P* · *i* / (1 − (1 + *i*)<sup>−*n*</sup>), where *i* is the monthly rate and *n* the number of months: monthly payment, total amount, and additional cost. Calculate money in `decimal` and the power in `double` with an explicit conversion. Reject invalid options with a message to the error stream and exit code 2; `--help` displays help.

### Variant 3. Splitting a bill {#v3}

**1. Initial level.** Create a console program that calculates using `decimal` and displays the tip, total, and each person's share rounded to kopiykas for a cafe bill of 1 847.50 UAH, a 10% tip, and 4 people (values set in the program).

**2. Basic level.** Create a console program that asks for a bill amount (UAH), tip percentage (0–30), and number of people, validates the input, and splits the total, converted to kopiykas (`long`), using integer division. Display each person's share and the remaining kopiykas paid by the first person so that the shares sum exactly to the bill.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives the bill amount as the first argument and participants' weights in `name:weight` format (for example, `Olena:1 Petro:2 Ira:1,5`), plus `--tip` (tip percentage) and `--round` (share rounding increment in UAH: 1, 5, or 10). Allocate the total in proportion to the weights, round shares upward to the increment (`Math.Ceiling`), and print a “participant — weight — share — amount due” table, the rounding overpayment, and a check that the total due is at least the bill amount. Send input errors to the error stream; exit codes: 0 — success, 2 — argument error; `--help` displays help.

### Variant 4. ARGB color and transparency {#v4}

**1. Initial level.** Create a console program that packs color components A = 128, R = 255, G = 99, B = 71 (values set in the program) into a `uint` in `0xAARRGGBB` format using shifts and bitwise OR, and displays it in hexadecimal, decimal, and binary.

**2. Basic level.** Create a console program that asks for a color in eight-digit hexadecimal `AARRGGBB` format, converts it to `uint`, extracts A, R, G, and B using shifts and the `0xFF` mask, and displays the components in decimal, transparency as a percentage, and the inverted color (RGB bits inverted while preserving alpha).

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that blends a foreground color with a background using alpha. Specify colors through `--fg AARRGGBB` and `--bg RRGGBB`; `--steps N` prints a table for transparency from 0 to 255 in N steps. Calculate each channel using integer arithmetic: (src · a + dst · (255 − a) + 127) / 255; display alpha, the resulting HEX code, and brightness 0.299R + 0.587G + 0.114B. Reject invalid HEX notation with a message to the error stream and exit code 2; `--help` displays help.

### Variant 5. File permissions {#v5}

**1. Initial level.** Create a console program that calculates the numeric value of `rwxr-x---` permissions (set in the program as bit masks for owner, group, and others) using bitwise operators, and displays it in octal (750), decimal, and binary.

**2. Basic level.** Create a console program that asks for three-digit octal permissions (for example, `644`), checks that every digit is between 0 and 7, converts the notation to a number (`Convert.ToInt32(s, 8)`), and uses masks to display the symbolic representation `rw-r--r--` and separately whether the owner, group, and others can read, write, and execute the file.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts initial permissions in octal or symbolic notation and a sequence of `chmod`-style changes: `u+x`, `g-w`, `o=r`, `a+r` (for example, `644 u+x g-r o=`). Apply each change with `|=` and `&= ~`, displaying the result after each step in a “change — octal — symbolic” table. `--umask 022` applies a mask to the initial permissions. Reject invalid entries with a message to the error stream and exit code 2; `--help` displays help.

### Variant 6. Training heart rate zones {#v6}

**1. Initial level.** Create a console program that, for a 20-year-old with a resting heart rate of 62 bpm (values set in the program), calculates maximum heart rate as 220 − age and uses the Karvonen formula “resting + (maximum − resting) · intensity” to display the 60–70% zone boundaries rounded to integers.

**2. Basic level.** Create a console program that asks for age (10–100 years) and resting heart rate (30–120 bpm), validates the input, and prints an aligned table of five training zones (50–60, 60–70, 70–80, 80–90, 90–100%), with heart rate boundaries rounded to whole beats using `Math.Round`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts `--age`, `--rest`, and `--formula tanaka|classic` (maximum heart rate 208 − 0.7 · age or 220 − age), plus training segments in `minutes@heart_rate` format (for example, `20@128 15@152 10@171`). Print the zone table, identify each segment's zone, and display total time in each zone and the session's weighted average heart rate. Reject segments with heart rates outside 30–230 with messages to the error stream; exit codes: 0 — success, 1 — some data rejected, 2 — option error.

### Variant 7. Fuel consumption {#v7}

**1. Initial level.** Create a console program that, for a car traveling 523 km and using 38.7 L of fuel priced at 57.99 UAH/L (values set in the program), calculates and displays consumption in L/100 km, trip cost using `decimal`, and cost per kilometer with two decimal places.

**2. Basic level.** Create a console program that asks for fuel consumption in L/100 km, checks that it is positive, and displays equivalent consumption in kilometers per liter, miles per US gallon (1 mile = 1.609344 km, 1 gallon = 3.785411784 L), and miles per imperial gallon (4.54609 L).

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives refueling records in `odometer:liters:price` format (for example, `10250:42,5:57,99 10830:40,1:58,49`) and `--units metric|us`. Print a table of intervals between refuelings with distance, consumption (L/100 km or miles per gallon), and cost using `decimal`, followed by total distance, average consumption, and total cost. Reject records with decreasing odometer readings or negative values with messages to the error stream; `--help` displays help.

### Variant 8. Download speed {#v8}

**1. Initial level.** Create a console program that, for a 4.7 GB file and a 100 Mbit/s connection (values set in the program), calculates speed in megabytes per second and download time in “X h Y min Z s” format using integer division and `%`.

**2. Basic level.** Create a console program that asks for a file size, size unit (`MB` or `GB`), and connection speed in Mbit/s, validates the input, and displays download time in seconds and `hh:mm:ss` format, as well as the number of such files that can be downloaded in a day.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts file sizes with units (`700MB 4.7GB 1.5GiB 350MiB`), plus `--speed` (Mbit/s) and `--overhead` (protocol overhead, %). Account for decimal (1000) versus binary (1024) units, and print a “file — bytes (`long`) — time” table, total size, and total time in `d hh:mm:ss` format. Reject unknown units with messages to the error stream; exit codes: 0, 1 (some records rejected), 2 (option error); `--help` displays help.

### Variant 9. Two-rate electricity tariff {#v9}

**1. Initial level.** Create a console program that uses `decimal` to calculate and display the cost for each period, total cost, and savings compared with a single-rate tariff for daytime consumption of 180 kWh and nighttime consumption of 95 kWh, a rate of 4.32 UAH/kWh, and a nighttime multiplier of 0.5 (values set in the program).

**2. Basic level.** Create a console program that asks for appliance power (W), daily daytime and nighttime operating hours, rate (UAH/kWh), and nighttime multiplier (0–1), validates the input, and displays monthly (30 days) consumption and costs under single-rate and two-rate tariffs, plus percentage savings.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives appliances in `name:watts:day_hours:night_hours` format (for example, `boiler:2000:1:3 washer:900:1,5:0`), plus `--tariff`, `--night-factor`, and `--days`. Print an appliance table showing consumption and cost under both tariffs, a totals row, the percentage of nighttime consumption, and a conclusion about which tariff costs less. Report invalid records to the error stream; exit codes: 0, 1 (some records rejected), 2 (option error); `--help` displays help.

### Variant 10. Projectile launched at an angle {#v10}

**1. Initial level.** Create a console program that calculates and displays flight time, maximum height, and range for a body launched at 20 m/s at 35° above the horizontal (g = 9.81 m/s²; values set in the program); convert the angle to radians.

**2. Basic level.** Create a console program that asks for initial speed (m/s) and launch angle in degrees, checks that speed is positive and the angle is 0–90, and displays flight time, maximum height, range, and speed at the highest point with two decimal places.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts `--speed`, `--height` (initial height, m), `--angles` (a list such as `15,30,45,60`), and `--planet earth|moon|mars` with the corresponding gravitational acceleration. Print an “angle — time — maximum height — range” table (for nonzero initial height, determine time as the positive root of a quadratic equation), and the supplied angle with the greatest range. Reject invalid values with a message to the error stream and exit code 2; `--help` displays help.

### Variant 11. Dew point {#v11}

**1. Initial level.** Create a console program that, for air temperature *T* = 24 °C and relative humidity *RH* = 65% (values set in the program), calculates dew point using the Magnus formula: γ = ln(*RH*/100) + *bT*/(*c* + *T*), *T*<sub>*d*</sub> = *c* · γ/(*b* − γ), where *b* = 17.62 and *c* = 243.12 °C, and displays the result with one decimal place.

**2. Basic level.** Create a console program that asks for temperature *T* (−40 to 50 °C) and relative humidity *RH* (1–100%), validates the input, and displays the Magnus dew point, the difference between temperature and dew point, and absolute humidity in g/m³: 6.112 · *e*<sup>17.67 · *T*/(*T* + 243.5)</sup> · *RH* · 2.1674 / (273.15 + *T*).

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives measurements in `hh:mm@temperature@humidity` format (for example, `06:00@12,5@88`) and `--units c|f` (input and output units). Print a “time — temperature — humidity — dew point” table, mark measurements with a fog risk (temperature minus dew point below 2 °C), and display minimum and maximum dew points and average relative humidity. Send input errors to the error stream with exit code 2; `--help` displays help.

### Variant 12. Unix timestamp {#v12}

**1. Initial level.** Create a console program that, for Unix timestamp 1 789 000 000 s (seconds since 00:00:00 UTC on January 1, 1970; value set in the program), uses `/` and `%` to calculate whole days since the epoch and time of day in `hh:mm:ss` format, and displays the date obtained with `DateTimeOffset.FromUnixTimeSeconds`.

**2. Basic level.** Create a console program that asks for a Unix timestamp (a `long` integer) and local UTC offset in hours, validates the input, and displays UTC and local date/time, whether the value fits in `int`, and the number of days, hours, and minutes until 03:14:08 UTC on January 19, 2038, when the timestamp no longer fits in `int`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that converts Unix timestamps to dates and vice versa: numeric arguments represent seconds (or milliseconds with `--ms`), while `yyyy-MM-ddThh:mm:ss` arguments represent UTC dates. Print an “input — seconds — milliseconds — UTC date” table, multiplying by 1000 in a `checked` context and reporting `long` overflow to the error stream; `--int32` additionally marks values that do not fit in `int`. Exit codes: 0 — success, 1 — errors occurred; `--help` displays help.

### Variant 13. Salary {#v13}

**1. Initial level.** Create a console program that, for a gross salary of 32 500 UAH (value set in the program), calculates using `decimal` and displays 18% personal income tax, a 5% military levy, net pay, and the employer-paid 22% unified social contribution, rounded to kopiykas.

**2. Basic level.** Create a console program that asks for base salary (UAH), days worked, working days in the month, and bonus percentage, validates the input, and prints an aligned table showing salary proportional to days worked, bonus, deductions (18% income tax and 5% military levy), net pay, and total employer cost including the 22% social contribution.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives employees in `surname:salary:days_worked` format (for example, `Koval:28000:21 Bondar:35500:18`), plus `--workdays`, `--bonus` (%), and `--pdfo`, `--military`, `--esv` (percentage rates, defaulting to 18, 5, and 22). Print a “surname — gross pay — income tax — military levy — net pay — social contribution” payroll table with totals; use `decimal` and `AwayFromZero` rounding for all amounts. Report invalid records to the error stream; exit codes: 0, 1 (some records rejected), 2 (option error); `--help` displays help.

### Variant 14. Discounted price {#v14}

**1. Initial level.** Create a console program that, for an item priced at 2 499 UAH (including 20% VAT) and successive discounts of 15% and 10% (values set in the program), calculates using `decimal` and displays the price after each discount, VAT included in the final price, and total discount percentage (less than 25%).

**2. Basic level.** Create a console program that asks for a product price and two discount percentages, validates them (discounts 0–90), and displays final prices with successive discounts and with their summed discount, the difference, and the final price rounded to kopiykas using `ToEven` and `AwayFromZero`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives products in `name:price:quantity` format and discount options: `--percent` (percentage for the whole receipt), `--coupon` (fixed UAH amount), `--third-free` (every third identical item is free), and `--order percent-first|coupon-first`. Apply discounts in the specified order and print a receipt showing products, amounts, each discount, included 20% VAT, and total due, which cannot be negative. Use `decimal` for all calculations; send input errors to the error stream with exit code 2; `--help` displays help.

### Variant 15. Calories in a dish {#v15}

**1. Initial level.** Create a console program that, for a 250 g serving of oatmeal containing 12.3 g protein, 6.1 g fat, and 59.5 g carbohydrates per 100 g (values set in the program), calculates calories in the serving (4 kcal per gram of protein and carbohydrates, 9 kcal per gram of fat) and the percentage of calories from protein, fat, and carbohydrates.

**2. Basic level.** Create a console program that asks for serving mass (g) and protein, fat, and carbohydrate content per 100 g, checks that values are nonnegative and their sum does not exceed 100 g, and displays serving calories, each nutrient's mass in the serving, and calorie shares as percentages (`P1` format).

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives ingredients in `name:mass:protein:fat:carbohydrates` format (content per 100 g), plus `--portions` and `--goal` (daily calorie target). Print an ingredient table with calories, totals for the whole dish and one serving, the serving's percentage of the daily target, and calorie distribution by nutrient. Report invalid ingredients to the error stream; exit codes: 0, 1 (some records rejected), 2 (option error); `--help` displays help.

### Variant 16. Room renovation {#v16}

**1. Initial level.** Create a console program that, for a 4.2 × 3.6 m room 2.7 m high, a 1.5 × 1.4 m window, and a 0.9 × 2.05 m door (values set in the program), calculates the wall area to wallpaper and the number of 10.05 × 0.53 m wallpaper rolls, rounded upward with `Math.Ceiling`.

**2. Basic level.** Create a console program that asks for room length, width, height, and total window and door area, validates the input, and displays ceiling and wall areas, paint cans needed for two ceiling coats (0.12 L/m², 2.5 L per can), wallpaper rolls with a 10% allowance, and material costs using `decimal`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts room dimension options, `--openings` (a list of `width×height` openings), `--roll` (roll dimensions), `--repeat` (pattern repeat, cm), `--price-roll`, and `--price-paint`. Calculate strips per roll allowing for pattern matching (integer division), rolls and paint cans needed, individual item costs, and the total, and print a cost estimate table. Reject invalid options with a message to the error stream and exit code 2; `--help` displays help.

### Variant 17. Power bank capacity {#v17}

**1. Initial level.** Create a console program that, for a 20 000 mAh power bank at 3.7 V with 85% conversion efficiency and a smartphone battery of 4 500 mAh at 3.85 V (values set in the program), calculates battery energies in Wh and the number of complete smartphone charges (integer part).

**2. Basic level.** Create a console program that asks for power bank capacity (mAh), cell voltage (V), efficiency (%), and device battery capacity and voltage, validates the input, and displays both battery energies, full charges available, remaining energy percentage after those charges, and whether power bank energy is no more than 100 Wh.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives devices in `name:capacity:volts:quantity` format, plus `--bank` (capacity and voltage, such as `20000@3,7`), `--efficiency`, and `--input-power` (power bank charging power, W). Allocate energy to devices in order, print a “device — energy — full charges — remainder” table, display the power bank's own charging time in `hh:mm` format, and warn if its energy exceeds 100 Wh. Send input errors to the error stream with exit code 2; `--help` displays help.

### Variant 18. IP address and subnet mask {#v18}

**1. Initial level.** Create a console program that converts IP address 192.168.10.37 (four bytes set in the program) to one `uint` using shifts and bitwise OR, and displays it in decimal, hexadecimal, and binary.

**2. Basic level.** Create a console program that asks for an IP address as four dot-separated numbers and a prefix length (0–32), validates the input, builds a `uint` mask using a shift, and displays the mask, network address (`address & mask`), broadcast address (`network | ~mask`), and number of host addresses in the network.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives networks in CIDR notation (`10.0.0.0/8 192.168.1.130/26`) and `--contains` with an IP address. Print a “CIDR — network — mask — first and last host addresses — host count (`long`)” table, marking networks containing the specified address and private ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16). Handle /31 and /32 separately. Report invalid records to the error stream; exit codes: 0, 1 (some records rejected), 2 (option error); `--help` displays help.

### Variant 19. Barcode check digit {#v19}

**1. Initial level.** Create a console program that, for the first 12 digits of EAN-13 barcode 482012345678 (a `long` set in the program), extracts digits with `/` and `%`, calculates the check digit (sum of odd-position digits plus three times the sum of even-position digits, complemented to the next multiple of 10), and displays the complete code.

**2. Basic level.** Create a console program that asks for a 13-digit EAN-13 code, verifies that exactly 13 digits were entered, calculates the check digit from the first 12 digits, and displays whether the code is valid, the expected check digit, and the prefix (first three digits; 482 — Ukraine).

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that validates and completes EAN-8, EAN-13, and UPC-A (12-digit) codes passed as arguments. With `--complete`, append missing check digits; for a code with one incorrect digit, `--fix` finds positions where replacing a digit makes the code valid. Print a “code — type — check digit — result” table and the number of valid codes. Report invalid records to the error stream; exit codes: 0 — all codes valid, 1 — invalid codes present, 2 — argument error.

### Variant 20. Time zones {#v20}

**1. Initial level.** Create a console program that, for a meeting at 17:30 Kyiv summer time (UTC+3; values set in the program), converts the time to minutes since midnight and uses `/` and `%` to calculate the meeting time in New York (UTC−4) and Tokyo (UTC+9), marking any day change.

**2. Basic level.** Create a console program that asks for a time in `hh:mm` format and source and target UTC offsets in hours (possibly fractional, such as 5.5), validates the input, and displays the target time and “previous day,” “same day,” or “next day”; correct a negative remainder with `((x % 1440) + 1440) % 1440`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts `--at hh:mm`, source zone `--from`, and cities with offsets in `city@offset` format (for example, `Kyiv@+3 London@+1 Delhi@+5:30`). Print a “city — offset — local time — day” table and, with `--work 09:00-18:00`, mark cities where the meeting falls within working hours and the nearest time when working hours overlap in all cities. Send input errors to the error stream with exit code 2; `--help` displays help.

### Variant 21. Paid parking {#v21}

**1. Initial level.** Create a console program that, for a car parked for 3 h 17 min at 25 UAH per started hour (values set in the program), calculates billable hours with `Math.Ceiling` and the cost using `decimal`.

**2. Basic level.** Create a console program that asks for entry and exit times in `hh:mm` format (exit may be the next day), validates the input, and calculates parking cost: the first 15 minutes are free, then 25 UAH per started hour, capped at 200 UAH per day; display duration and total due.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives parking records in `plate@entry@exit` format with dates and times (for example, `AA1234BB@2026-09-16T08:10@2026-09-17T09:05`), plus `--rate`, `--free-minutes`, `--daily-cap`, and `--night-rate` (22:00–07:00 rate). Split each stay into daytime and nighttime minutes, calculate costs with the daily cap, and print a “plate — duration — day minutes — night minutes — amount” table with a total. Reject exits preceding entries with messages to the error stream; `--help` displays help.

### Variant 22. Speed of sound {#v22}

**1. Initial level.** Create a console program that calculates the speed of sound in air at 18 °C using *v* = 331.3 + 0.606 · *T* m/s, and the distance to lightning if thunder is heard 4.5 s after the flash (values set in the program).

**2. Basic level.** Create a console program that asks for air temperature (−50 to 50 °C) and the delay between lightning and thunder in seconds, validates the input, and displays sound speed, lightning distance in meters and kilometers, and the error of the approximate “3 seconds — 1 kilometer” rule.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives storm observations in `hh:mm:ss@delay` format and `--temp`. Print a “time — delay — distance — change in distance — storm speed (km/h)” table, determine whether the storm is approaching or receding, and predict when its distance will fall below 10 km. `--medium air|water|steel` changes the medium (sound speed 1 480 m/s in water and 5 960 m/s in steel). Send input errors to the error stream with exit code 2; `--help` displays help.

### Variant 23. Memory units {#v23}

**1. Initial level.** Create a console program that, for a drive labeled 512 GB by the manufacturer (10<sup>9</sup> bytes per gigabyte; value set in the program), calculates its byte count using `long` and displays the size in gibibytes (2<sup>30</sup> bytes) shown by the operating system, plus the percentage difference.

**2. Basic level.** Create a console program that asks for a size and unit (`KB`, `MB`, `GB`, `TB`, `KiB`, `MiB`, `GiB`, `TiB`), validates the input, converts to bytes as `long` in a `checked` context (report overflow for excessively large values), and displays the size in all decimal and binary units.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts sizes with units (`1.5TB 750GiB 64GB`), plus `--to` (output unit or `auto`), `--block` (file system cluster size in bytes), and `--files` (file count). Print an “input — bytes — specified units — cluster count” table, estimate space lost to partially filled clusters (half a cluster per file on average), and display total size. Detect `long` overflow with `checked` and report it to the error stream; exit codes: 0, 1 (errors occurred), 2 (option error); `--help` displays help.

### Variant 24. Road grade {#v24}

**1. Initial level.** Create a console program that, for a road rising 45 m over a horizontal distance of 600 m (values set in the program), calculates and displays grade as a percentage, the incline angle in degrees (`Math.Atan` and conversion from radians), and grade in “1 : *n*” form.

**2. Basic level.** Create a console program that asks for a grade and its notation (`%`, `deg`, or `ratio` for “1 : *n*”), validates the input, and displays all three forms, elevation gain per kilometer of road, and whether the grade is within a limit set as a program constant (such as 8%).

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives a route profile in `distance@elevation` format (checkpoints in meters), plus `--max-grade` and `--mass` (cyclist and bicycle mass, kg). Print a segment table “length — elevation change — grade, % — angle — work against gravity, kJ,” total ascent and descent, and the steepest segment; mark segments exceeding the grade limit. Send input errors (distance not increasing) to the error stream with exit code 2; `--help` displays help.

### Variant 25. Scaling a recipe {#v25}

**1. Initial level.** Create a console program that scales a pancake recipe for 4 servings (250 g flour, 500 mL milk, 2 eggs, 30 g sugar, 2 g salt) to 7 servings (values set in the program), displaying each ingredient's quantity, rounding grams and milliliters to integers and eggs upward to whole eggs.

**2. Basic level.** Create a console program that asks for the original and desired serving counts, validates the input, and displays the scale factor and an ingredient table for a recipe set in the program with new quantities: dry ingredients rounded to 5 g, liquids to 10 mL, and counted items upward to integers.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives ingredients in `name:quantity:unit` format (`g`, `kg`, `mL`, `L`, `pcs`, `tsp`, `tbsp`), plus `--from`, `--to` (servings), and `--system metric|us` (conversion to ounces and cups). Normalize units, scale quantities, choose convenient output units (for example, 1 250 g → 1.25 kg), and print a table with rounding appropriate to each unit type. Report unknown units to the error stream; exit codes: 0, 1 (some records rejected), 2 (option error); `--help` displays help.

### Variant 26. Student rating {#v26}

**1. Initial level.** Create a console program that, for three courses with scores of 92, 78, and 85 and weights of 5, 4, and 3 ECTS credits (values set in the program), calculates and displays the weighted average score with two decimal places and the unweighted average.

**2. Basic level.** Create a console program that asks for scores (0–100) and credit counts for four courses, validates the input, and displays the weighted average, its national-scale grade (90–100 — “excellent,” 71–89 — “good,” 50–70 — “satisfactory,” below 50 — “unsatisfactory”), and the total credits earned with passing grades.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives results in `course:score:credits` format, plus `--scale national|ects|all` and `--round ToEven|AwayFromZero`. Print a “course — score — credits — ECTS grade (A–F) — national grade” table, the weighted average with the chosen rounding mode, the share of credits with A and B grades, and the number of failed courses. Report invalid records to the error stream; exit codes: 0 — no failed courses, 1 — failed courses present, 2 — argument error.

### Variant 27. Tire pressure {#v27}

**1. Initial level.** Create a console program that converts the recommended tire pressure of 2.3 bar (value set in the program) to kilopascals (1 bar = 100 kPa) and pounds per square inch (1 psi = 6.894757 kPa), displaying results with one decimal place.

**2. Basic level.** Create a console program that asks for recommended pressure, its unit (`bar`, `kPa`, `psi`), and measured pressures for four tires in that unit, validates the input, and displays each tire's percentage deviation and “normal” if the deviation is no more than 5%, otherwise “inflate” or “deflate.”

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives measurements in `wheel@pressure@temperature` format (for example, `FL@32,5psi@5`), plus `--target` (recommended pressure with unit at 20 °C) and `--units`. Normalize pressures to 20 °C using Gay-Lussac's law (temperature in kelvins, absolute pressure equals gauge pressure plus 101.325 kPa), print a “wheel — measured — normalized to 20 °C — deviation” table, and display pressure differences between left and right tires. Send input errors to the error stream with exit code 2; `--help` displays help.

### Variant 28. Age in days {#v28}

**1. Initial level.** Create a console program that, for a birth date of February 29, 2008 (value set in the program), uses `DateTime` and `TimeSpan` to calculate age in whole days, weeks, and hours as of today, and displays the day of the week of birth.

**2. Basic level.** Create a console program that asks for a birth date in `dd.MM.yyyy` format, checks that it is valid and no later than today, and displays age in whole years, days, and hours, days until the next birthday (March 1 for February 29 in a non-leap year), and the date when the person reaches 10 000 days old.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives people in `name@dd.MM.yyyy` format and `--on dd.MM.yyyy` (calculation date, default today). Print a “name — age (years, months, days) — days lived — next birthday — days until birthday” table, the age difference between the oldest and youngest in days, and each person's next age milestone divisible by 1000 days. Report invalid dates to the error stream; exit codes: 0, 1 (some records rejected), 2 (option error).

### Variant 29. GPS coordinates {#v29}

**1. Initial level.** Create a console program that converts coordinates 47°54′36″ N and 33°23′28″ E (values set in the program) to decimal degrees and calculates the distance to 50.4501° N, 30.5234° E using the haversine formula (Earth radius 6 371 km).

**2. Basic level.** Create a console program that asks for a coordinate in decimal degrees and its type (`lat` or `lon`), validates its range (±90 or ±180), and displays degrees, minutes, and seconds with one decimal place and a hemisphere letter (N/S or E/W), extracting integer parts with explicit `(int)` casts.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives a route as points in decimal-degree `latitude,longitude` format or `47°54'36"N/33°23'28"E` format, plus `--units km|mi|nmi`. Print a “point — coordinates — distance from previous — bearing — cumulative distance” table, total route length, and distance between the first and last points. Report invalid coordinates to the error stream; exit codes: 0, 1 (some points rejected), 2 (option error); `--help` displays help.

### Variant 30. Travel budget {#v30}

**1. Initial level.** Create a console program that, for a 6-day trip with daily spending of 85 euros on accommodation, 40 euros on food, and 15 euros on transportation at 45.20 UAH per euro (values set in the program), calculates using `decimal` total spending in euros and UAH and each category's percentage share.

**2. Basic level.** Create a console program that asks for the number of days, daily accommodation, food, and transportation costs in the destination currency, its UAH exchange rate, and available budget in UAH, validates the input, and displays total spending, the budget surplus or shortfall, and the maximum affordable number of days (integer division).

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that receives expense items in `name:amount:currency:frequency` format (`once` or `daily`, for example, `tickets:7400:UAH:once hotel:85:EUR:daily`), plus `--days`, `--budget`, and `--rates EUR=45,20;PLN=10,60`. Convert all amounts to UAH using `decimal`, print an expense table with shares, total, a 10% reserve, and remaining budget; if there is a shortfall, display the percentage reduction required in daily spending. Report unknown currencies to the error stream with exit code 2; `--help` displays help.

## Procedure

1. Study the theory and worked examples.
2. Choose a data type (`int`, `long`, `double`, `decimal`, `bool`, `char`, `string`) for every quantity in your variant and explain your choices; declare fixed values as `const` constants.
3. Create a solution and project for your variant; ensure `<Nullable>enable</Nullable>` is enabled in `.csproj`.
4. Implement the program for your chosen difficulty level, validating input with `TryParse` methods.
5. Build without compiler warnings and test valid, invalid, and boundary inputs (zero, negative values, very large numbers).
6. Demonstrate the program to your instructor, explain the code, and answer the review questions.
