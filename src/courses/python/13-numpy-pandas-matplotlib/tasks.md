---
title: "Tasks"
description: "Topic 13. NumPy, pandas, Matplotlib: task variants"
outline: [2, 3]
sourceHash: "8c32f3e5e6bf142818c36453af558d8afc626c0db10d6079ba3a1be87e00f32b"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

All data is synthetic; each CSV file follows the contract given in the task, and all metrics have explicit units.

## Variants

### Variant 1. Classroom temperatures {#v1}

**1. Initial level.** Create a NumPy console program that reads temperatures from -40 to 60 °C from the keyboard; for 1–1000 records, it computes the mean, minimum, and maximum and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `room,date,value; ISO date, value in °C from -40 to 60`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints mean temperatures by room. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `room,date,value; ISO date, value in °C from -40 to 60`. Validate the contract and implement a daily profile for each room, days beyond the threshold given by `--limit`, and a line chart. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 2. Daily precipitation {#v2}

**1. Initial level.** Create a NumPy console program that reads nonnegative daily precipitation up to 500 mm from the keyboard; for 1–1000 records, it computes the total precipitation and the number of dry days and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `station,date,value; ISO date, precipitation 0–500 mm`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints totals and numbers of dry days by station. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `station,date,value; ISO date, precipitation 0–500 mm`. Validate the contract and implement monthly totals with missing days explicitly marked, the largest three-day total over complete windows only, and a bar chart. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 3. Room energy use {#v3}

**1. Initial level.** Create a NumPy console program that reads energy for independent intervals from 0 to 1000 kWh from the keyboard; for 1–1000 records, it computes the total and the share of each interval (with zero shares for a zero total) and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `room,date,value; ISO date, interval energy 0–1000 kWh`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints total consumption by room. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `room,date,value; ISO date, interval energy 0–1000 kWh`. Validate the contract and implement a join with a room,area lookup table with positive area, a `many_to_one` check, kWh per square meter, and a chart. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 4. Library loans {#v4}

**1. Initial level.** Create a NumPy console program that reads integer loan durations from 0 to 365 days from the keyboard; for 1–1000 records, it computes the median and the number of loans longer than 14 days and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `category,date,value; ISO date, integer durations 0–365 days`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints medians and shares of loans longer than 14 days by category. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `category,date,value; ISO date, integer durations 0–365 days`. Validate the contract and implement a `--days` threshold from 1 to 365, a table of shares, and a duration histogram with explicitly labeled bins. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 5. Training sales {#v5}

**1. Initial level.** Create a NumPy console program that reads nonnegative integer line amounts up to 1000000 kopiykas from the keyboard; for 1–1000 records, it computes the grand total and the largest line item in hryvnias and kopiykas and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `category,date,qty,price; ISO date, qty integer 1–1000, price integer 0–100000 kopiykas`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints revenue by category without floating-point money arithmetic. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `category,date,qty,price; ISO date, qty integer 1–1000, price integer 0–100000 kopiykas`. Validate the contract and implement daily revenue, category shares, and a chart; check that the grand total is equal before and after grouping. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 6. Class attendance {#v6}

**1. Initial level.** Create a NumPy console program that reads numbers of students present and total numbers, integers 0≤present≤total≤100 with total&gt;0 from the keyboard; for 1–1000 records, it computes the weighted attendance share and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `group,date,present,total; ISO date, integers 0≤present≤total≤100, total>0`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints sum(present)/sum(total) shares by group. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `group,date,present,total; ISO date, integers 0≤present≤total≤100, total>0`. Validate the contract and implement a comparison of groups and weeks, a check for duplicate group,date pairs, and a bar chart of shares from 0 to 100 percent. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 7. Bike rental {#v7}

**1. Initial level.** Create a NumPy console program that reads trip durations from 1 to 1440 minutes from the keyboard; for 1–1000 records, it computes the mean duration and the 90th percentile and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `station,date,value; ISO date, durations 1–1440 minutes`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints the number of trips and the mean duration by station. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `station,date,value; ISO date, durations 1–1440 minutes`. Validate the contract and implement a comparison of weekdays and weekends, percentiles with the explicitly specified linear method, and a histogram. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 8. Greenhouse humidity {#v8}

**1. Initial level.** Create a NumPy console program that reads humidity readings from 0 to 100 percent from the keyboard; for 1–1000 records, it computes the mean and the number of values outside 40–70 and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `zone,date,value; ISO date, humidity 0–100 percent`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints shares of readings outside 40–70 by zone. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `zone,date,value; ISO date, humidity 0–100 percent`. Validate the contract and implement configurable `--low` and `--high` within 0–100, daily minimum/maximum, and a chart with threshold lines. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 9. Bus delays {#v9}

**1. Initial level.** Create a NumPy console program that reads delays from -30 to 180 minutes, where negative values mean early arrival from the keyboard; for 1–1000 records, it computes the median and the share of arrivals within ±5 minutes and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `route,date,value; ISO date, delays -30–180 minutes`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints medians and shares of arrivals within ±5 minutes by route. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `route,date,value; ISO date, delays -30–180 minutes`. Validate the contract and implement a day-of-week comparison, the number of early arrivals separately from late ones, and a histogram. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 10. Cafeteria orders {#v10}

**1. Initial level.** Create a NumPy console program that reads integer dish quantities from 0 to 500 from the keyboard; for 1–1000 records, it computes the total and the share of nonzero orders and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `dish,date,value; ISO date, integer quantities 0–500`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints totals and a dish ranking with alphabetical order for equal totals. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `dish,date,value; ISO date, integer quantities 0–500`. Validate the contract and implement a dish×date matrix via `pivot_table`, missing days treated as unknown, a `--top` ranking, and a bar chart. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 11. Warehouse stock {#v11}

**1. Initial level.** Create a NumPy console program that reads integer stock levels from 0 to 100000 units from the keyboard; for 1–1000 records, it computes the minimum and the number of stock levels below 10 and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `item,date,value; ISO date, integer stock levels 0–100000`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints the latest stock level of each item by date, not the sum of stock levels. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `item,date,value; ISO date, integer stock levels 0–100000`. Validate the contract and implement an `item,min_stock` lookup table, a key uniqueness check, a comparison of the latest stock level with the minimum, and a chart. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 12. Typing practice {#v12}

**1. Initial level.** Create a NumPy console program that reads speeds from 0 to 500 characters per minute from the keyboard; for 1–1000 records, it computes the mean and the standard deviation with ddof=0 and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `student,date,speed,errors; ISO date, speed 0–500, errors integer 0–100`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints the mean speed and the total number of errors per participant. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `student,date,speed,errors; ISO date, speed 0–500, errors integer 0–100`. Validate the contract and implement the change between the first and last sessions (explicitly handling the single-measurement case) and a speed/errors scatter plot. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 13. Water consumption {#v13}

**1. Initial level.** Create a NumPy console program that reads nonnegative interval volumes up to 10000 liters from the keyboard; for 1–1000 records, it computes the total and the mean without treating them as cumulative readings and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `meter,date,value; ISO date, cumulative readings 0–1000000 liters`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints differences between adjacent ordered readings, rejecting decreases. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `meter,date,value; ISO date, cumulative readings 0–1000000 liters`. Validate the contract and implement a check for duplicate meter,date pairs, a report of rejected meter resets, and a chart of interval consumption. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 14. Network speed {#v14}

**1. Initial level.** Create a NumPy console program that reads nonnegative speeds up to 10000 Mbit/s from the keyboard; for 1–1000 records, it computes the median, minimum, and maximum and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `provider,date,download,upload; ISO date, speeds 0–10000 Mbit/s`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints medians of both speeds by provider. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `provider,date,download,upload; ISO date, speeds 0–10000 Mbit/s`. Validate the contract and implement a lookup table of plan download limits, a `many_to_one` check, the share of measurements reaching 80 percent of the advertised speed, and a chart. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 15. CPU utilization {#v15}

**1. Initial level.** Create a NumPy console program that reads utilization percentages from 0 to 100 from the keyboard; for 1–1000 records, it computes the mean and the share of readings above 80 and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `host,time,value; ISO time YYYY-MM-DD HH:MM, CPU 0–100 percent`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints hourly means by host. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `host,time,value; ISO time YYYY-MM-DD HH:MM, CPU 0–100 percent`. Validate the contract and implement a check for duplicate host,time pairs, the hourly number of readings alongside the mean, and a line chart without filling gaps with zeros. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 16. Solar panels {#v16}

**1. Initial level.** Create a NumPy console program that reads energy of individual intervals from 0 to 100 kWh from the keyboard; for 1–1000 records, it computes the total and the index of the most productive interval and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `panel,date,value; ISO date, interval energy 0–100 kWh`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints daily totals by panel. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `panel,date,value; ISO date, interval energy 0–100 kWh`. Validate the contract and implement a join with a panel,power lookup table with positive kW values, normalized output in kWh/kW, and a chart. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 17. Training quality control {#v17}

**1. Initial level.** Create a NumPy console program that reads integer numbers of items and defects, 0≤defects≤total≤100000 with total&gt;0 from the keyboard; for 1–1000 records, it computes the overall defect rate as a ratio of sums and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `line,date,defects,total; ISO date, integers 0≤defects≤total≤100000, total>0`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints weighted defect rates by production line. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `line,date,defects,total; ISO date, integers 0≤defects≤total≤100000, total>0`. Validate the contract and implement weekly rates, the number of inspected items, and a chart; do not replace weighting with the mean of daily percentages. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 18. Waiting time {#v18}

**1. Initial level.** Create a NumPy console program that reads nonnegative durations up to 240 minutes from the keyboard; for 1–1000 records, it computes the median, the 90th percentile, and the number of zero waits and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `service,date,value; ISO date, waiting time 0–240 minutes`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints medians and 90th percentiles by service. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `service,date,value; ISO date, waiting time 0–240 minutes`. Validate the contract and implement a day-of-week comparison and a histogram with identical bin edges for all services. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 19. Training workouts {#v19}

**1. Initial level.** Create a NumPy console program that reads durations from 1 to 300 minutes from the keyboard; for 1–1000 records, it computes the total and the mean duration and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `activity,date,minutes; ISO date, duration 1–300 minutes`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints weekly totals by activity without medical conclusions. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `activity,date,minutes; ISO date, duration 1–300 minutes`. Validate the contract and implement a calendar table by ISO week and year, a year-boundary check, and a bar chart. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 20. Battery charge {#v20}

**1. Initial level.** Create a NumPy console program that reads charge levels from 0 to 100 percent from the keyboard; for 1–1000 records, it computes the differences between adjacent levels and the number of increases and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `device,time,value; ISO time YYYY-MM-DD HH:MM, charge 0–100 percent`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints level differences in chronological order by device. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `device,time,value; ISO time YYYY-MM-DD HH:MM, charge 0–100 percent`. Validate the contract and implement the rate of change in percent per hour for positive time intervals only, rejection of duplicate timestamps, and a line chart. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 21. Printing services {#v21}

**1. Initial level.** Create a NumPy console program that reads integer volumes from 1 to 10000 pages from the keyboard; for 1–1000 records, it computes the total number of pages and the average order size and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `mode,date,pages,price; ISO date, pages integer 1–10000, price integer 0–10000 kopiykas per page`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints pages and revenue by mode without floating-point money. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `mode,date,pages,price; ISO date, pages integer 1–10000, price integer 0–10000 kopiykas per page`. Validate the contract and implement the share of each mode in pages and in revenue, two consistent bar charts, and a check of the totals. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 22. Classroom occupancy {#v22}

**1. Initial level.** Create a NumPy console program that reads numbers of occupied seats and capacities, integers 0≤used≤capacity≤1000, capacity&gt;0 from the keyboard; for 1–1000 records, it computes the ratio of the total occupied seats to the total capacity and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `room,date,used,capacity; ISO date, integers 0≤used≤capacity≤1000, capacity>0`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints the mean occupancy share by room for constant capacities. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `room,date,used,capacity; ISO date, integers 0≤used≤capacity≤1000, capacity>0`. Validate the contract and implement detection of conflicting capacities for the same room, an occupancy ranking, and a chart of shares. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 23. Parcel delivery {#v23}

**1. Initial level.** Create a NumPy console program that reads integer durations from 0 to 60 days from the keyboard; for 1–1000 records, it computes the median and the share of deliveries taking no more than three days and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `region,sent,delivered; both dates ISO, delivered not earlier than sent, duration up to 60 days`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints the median duration and the number of deliveries by region. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `region,sent,delivered; both dates ISO, delivered not earlier than sent, duration up to 60 days`. Validate the contract and implement a `--days` threshold of 0–60, the share of on-time deliveries, and a chart; show records without delivered separately as incomplete. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 24. Board games {#v24}

**1. Initial level.** Create a NumPy console program that reads integer scores from 0 to 1000 points from the keyboard; for 1–1000 records, it computes the mean and the ranks in descending order, with equal scores sharing a rank and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `player,date,score; ISO date, integer scores 0–1000`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints mean scores and the number of games per player. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `player,date,score; ISO date, integer scores 0–1000`. Validate the contract and implement a ranking with a minimum number of games set by `--min-games`, a separate list of excluded players, and a bar chart. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 25. Training fundraising {#v25}

**1. Initial level.** Create a NumPy console program that reads nonnegative integer amounts up to 1000000 kopiykas from the keyboard; for 1–1000 records, it computes the total, the median, and the number of zero contributions and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `campaign,date,cents; ISO date, integer amounts 0–1000000 kopiykas, synthetic records only`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints contribution totals by campaign. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `campaign,date,cents; ISO date, integer amounts 0–1000000 kopiykas, synthetic records only`. Validate the contract and implement cumulative daily totals, the absence of personal data, a chart of the total over time, and a monotonicity check. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 26. Tree growth {#v26}

**1. Initial level.** Create a NumPy console program that reads heights from 0 to 10000 cm from the keyboard; for 1–1000 records, it computes the mean height and the range and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `tree,date,height; ISO date, height 0–10000 cm`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints the growth between the first and last measurements of each tree. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `tree,date,height; ISO date, height 0–10000 cm`. Validate the contract and implement a check for duplicate tree,date pairs, the growth rate per day for positive intervals only, single measurements listed separately, and a chart. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 27. Illuminance {#v27}

**1. Initial level.** Create a NumPy console program that reads values from 0 to 200000 lux from the keyboard; for 1–1000 records, it computes the minimum, the maximum, and the share below 300 and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `room,time,value; ISO time YYYY-MM-DD HH:MM, illuminance 0–200000 lux`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints hourly medians by room. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `room,time,value; ISO time YYYY-MM-DD HH:MM, illuminance 0–200000 lux`. Validate the contract and implement a `--limit` threshold within the range, the number of readings below the threshold, and a chart with a threshold line without regulatory conclusions. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 28. Training air sensors {#v28}

**1. Initial level.** Create a NumPy console program that reads arbitrary-unit readings from 0 to 1000 from the keyboard; for 1–1000 records, it computes the median, the number of missing values passed as NaN, and the mean of finite values only (without finite values, it reports that no data is available) and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `sensor,date,value; ISO date, arbitrary quantity 0–1000; missing values allowed and counted`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints means and the numbers of present and missing readings by sensor. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `sensor,date,value; ISO date, arbitrary quantity 0–1000; missing values allowed and counted`. Validate the contract and implement the share of missing values, a `--max-missing` filter from 0 to 1, a chart, and an explicit report of excluded sensors without health conclusions. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 29. Synthetic website visits {#v29}

**1. Initial level.** Create a NumPy console program that reads integer visit counts from 0 to 1000000 from the keyboard; for 1–1000 records, it computes the total and the largest daily value and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `page,date,visits; ISO date, visits integer 0–1000000, synthetic counters only`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints totals by page and by day. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `page,date,visits; ISO date, visits integer 0–1000000, synthetic counters only`. Validate the contract and implement a check for duplicate page,date pairs, a seven-day moving average over complete calendar windows only, and a line chart. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

### Variant 30. Repeated lab experiments {#v30}

**1. Initial level.** Create a NumPy console program that reads finite measurements within ±1000000 arbitrary units from the keyboard; for 1–1000 records, it computes the mean, std with ddof=0, and deviations from the mean and prints the result. Validate the sizes and admissibility of the input.

**2. Basic level.** Create a pandas program that accepts the path to a UTF-8 CSV file with the schema `series,repeat,value; repeat positive integer, value finite within ±1000000, key series,repeat unique`; it validates the columns, ranges, and nonempty text keys, reports rejection reasons, and prints means, std with ddof=0, and numbers of repeats by series. For an empty valid dataset, print a message instead of a misleading summary.

**3. Advanced level.** Create a NumPy/pandas/Matplotlib application for a local CSV file with the schema `series,repeat,value; repeat positive integer, value finite within ±1000000, key series,repeat unique`. Validate the contract and implement a `--tolerance` ≥ 0, the share of deviations from the mean exceeding the tolerance, a histogram, and a table; do not treat std as the standard error of the mean. Add `--help`, pass the CSV path and the output directory as arguments, and provide an explicit missing-value policy, a report of invalid rows, a CSV summary, and a PNG with labels and units. Do not overwrite existing files without the `--overwrite` option. Print errors to `stderr`; exit codes: 0 for success, 2 for invalid input. Add at least five pytest tests for normal, empty, boundary, missing, and invalid cases; annotate the functions.

## Procedure

1. Create a Python 3.14 project with NumPy, pandas, Matplotlib, and pytest; pin the versions and save a small synthetic dataset.
2. Write down the CSV schema, units, allowed ranges, and rules for missing values, duplicates, and empty results; separate validation from analysis.
3. Implement annotated functions; explain the array shapes and the choice of axis, the grouping keys, and how lookup tables are joined.
4. Compare the summary with a manual calculation. Check the balance of accepted and rejected records, and test boundary and invalid input.
5. Build a chart with labels and units that is suitable for monochrome printing. Make sure all labels are visible in the saved PNG.
6. For the advanced level, add pytest tests, `--help`, protection against overwriting output files, `stderr`, and exit codes; demonstrate the CLI.
7. In the report, include the code, data, a table of tests, the chart, and a conclusion about the limits of the learning model. Make a commit with reproducible materials.
