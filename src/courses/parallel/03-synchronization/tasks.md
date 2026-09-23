---
title: "Tasks"
description: "Topic 3. Thread synchronization: task variants"
outline: [2, 3]
sourceHash: "9231ff01ce4d5a8d36dfc54a0559e6f1d5889a5b5da1238287938c9a5ac11d5a"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Cinema ticket sales {#v1}

**1. Initial level.** Create a console program in which 8 ticket-counter threads simultaneously sell tickets for a screening with 100 seats, each attempting to sell 20 tickets. Run the sales first without synchronization, then with `lock`, and print the number of tickets sold and whether seats were oversold for both versions.

**2. Basic level.** Create a console program that prompts for the number of seats (10–500) and ticket-counter threads (1–32), validates the input, and simulates sales: each counter repeatedly sells a random available seat until none remain. Print a “counter – tickets sold” table and check the invariants: every seat is sold exactly once, and total sales equal the seat count.

**3. Advanced level.** Create a console application for stress-testing ticket sales with `--seats`, `--cashiers`, `--runs`, `--mode unsafe|lock|interlocked`, and `--help` options. For each run, perform sales, check the invariants (no double sales, no unsold seats), measure the time, and print a “run – time, ms – violations” table; the final row contains the median time and total violations. Report invalid options to the error stream; exit with code 0 if there are no violations, 2 if there are, or 1 for an argument error.

### Variant 2. Bank accounts {#v2}

**1. Initial level.** Create a console program with two accounts containing UAH 1 000 each, in which two threads each perform 10 000 transfers of UAH 1 in opposite directions, locking both accounts in ascending account-number order. Print the balances and the total, which must remain UAH 2 000.

**2. Basic level.** Create a console program that prompts for the number of accounts (2–100), initial balance, and thread count, then has threads perform 100 000 transfers between random accounts without allowing negative balances. Order account locks by account number. Print the counts of completed and rejected transfers, the total before and after, and the result of checking that it is unchanged.

**3. Advanced level.** Create a console application that reads accounts in `number;owner;balance` format from a CSV file specified by the first argument and transfers in `from;to;amount` format from a second file, then performs the transfers in N threads (`--threads`). The `--naive` option enables locking in “from–to” order and detects hangs using a `Join` timeout. Print an account table with before and after balances, completed and rejected transfer counts, a total-balance check, and the time; report row-format errors with line numbers to the error stream.

### Variant 3. Online store inventory {#v3}

**1. Initial level.** Create a console program with 1 000 units of a product in stock, in which 10 threads simultaneously reserve one unit at a time until stock runs out. Decrement stock using an `Interlocked.CompareExchange` CAS loop so it never becomes negative; print each thread's reservation count and the total.

**2. Basic level.** Create a console program that prompts for initial stock and the number of buyer threads, each repeatedly reserving a random quantity (1–5 units). Implement reservations in two ways: `lock` and an `Interlocked.CompareExchange` CAS loop. For each method, print the time, successful and rejected reservation counts, and a check that the reserved quantity exactly equals initial stock.

**3. Advanced level.** Create a console application that reads a product list in `SKU;stock` format from a file and simulates reservations for multi-item orders in N threads (`--threads`, `--orders`, `--method lock|interlocked|both`, `--help`). An order is either reserved in full or not at all. Print a “method – threads – time, ms – completed – rejected” table for N = 1, 2, 4, 8, 16, write final stock levels for each product to a file, and report invariant violations.

### Variant 4. Three-bay car wash {#v4}

**1. Initial level.** Create a console program in which 10 car threads use a car wash with three bays limited by `SemaphoreSlim`. Washing takes 200 ms. Print an event log of “arrived – started washing – finished” with times relative to program startup.

**2. Basic level.** Create a console program that prompts for the number of bays, number of cars, and range of washing durations in milliseconds, validates the input, and simulates the car wash using `SemaphoreSlim`. Calculate each car's waiting time; print a “car – wait – wash” table and the average and maximum waiting times.

**3. Advanced level.** Create a console application for analyzing car wash fairness with `--boxes`, `--cars`, `--seed`, `--patience` (maximum wait before a car leaves), and `--help` options. Record arrival and washing-start order; calculate the number of “overtakes” (a car starts washing before one that arrived earlier), mean, median, and maximum waiting time, cars turned away, and each bay's utilization percentage; write the event log to a CSV file.

### Variant 5. Library catalog {#v5}

**1. Initial level.** Create a console program with a book catalog in a `Dictionary<string, string>` (ISBN – title) protected by `ReaderWriterLockSlim`. Four reader threads search for random ISBNs, while one writer thread adds 10 new books. Print the number of books found by each reader and the final catalog size.

**2. Basic level.** Create a console program with a book catalog (ISBN – title) in which reader threads search for random ISBNs and every kth request adds a new book. Prompt for the reader count, search count, and k, and compare protecting the catalog with `lock` and `ReaderWriterLockSlim`. For each version, print the time, books found, writes performed, and the ratio of the two execution times.

**3. Advanced level.** Create a console application that loads a book catalog (ISBN – title) from a CSV file; reader threads search for books by ISBN, and some requests add books. For write proportions of 0%, 1%, 10%, and 50% and 1, 2, 4, 8, and 16 readers (`--file`, `--ops`, `--runs`, `--help`), warm up and measure the median time for `lock` and `ReaderWriterLockSlim`, then print a table marking the faster tool. Write results to a CSV file and report read errors to the error stream.

### Variant 6. Dining philosophers {#v6}

**1. Initial level.** Create a console program in which five philosopher threads each eat 100 times, taking two fork locks. Eliminate deadlock through ordering: each philosopher takes the lower-numbered fork first. Print each philosopher's meal count and the total time.

**2. Basic level.** Create a console program that prompts for the number of philosophers (2–20) and meals and implements two strategies for avoiding deadlock: fork ordering and a waiter (`SemaphoreSlim` with N – 1 places). For each strategy, print the time, each philosopher's meal count, and the maximum time spent waiting for forks.

**3. Advanced level.** Create a console application that compares three strategies (`order`, `waiter`, and `timeout` using `Monitor.TryEnter` and a random delay) by throughput (meals per second) for a configuration specified by `--philosophers`, `--seconds`, and `--strategy all|order|waiter|timeout`. Print a “strategy – meals/s – minimum and maximum meals per philosopher – retries” table, check for starvation (every philosopher must eat at least once), and return code 2 if starvation is detected.

### Variant 7. Sleeping barber {#v7}

**1. Initial level.** Create a console program modeling a barbershop with one barber and three waiting chairs, using `Monitor.Wait` and `Monitor.Pulse`. Ten customers arrive at 100 ms intervals, and a haircut takes 250 ms; a customer who finds no free chair leaves. Print an event log.

**2. Basic level.** Create a console program that prompts for the waiting-chair count, customer count, arrival interval, and haircut duration, validates the input, and simulates a barbershop using a monitor. Print an event log, customers served, customers turned away, and the average waiting time.

**3. Advanced level.** Create a console application modeling a barbershop with several barbers (`--barbers`, `--chairs`, `--clients`, `--seed`, `--help`), in which arrival times and haircut durations are generated randomly using the specified seed. Write an event log to a file and print a “barber – customers – working time – idle time” table and rejection statistics; separately calculate how the rejection rate depends on the number of chairs from 0 to 10.

### Variant 8. Elevator in a high-rise building {#v8}

**1. Initial level.** Create a console program in which five resident threads call an elevator to random floors, while the elevator thread serves calls from a queue, waiting for new calls using `Monitor.Wait`. Print a “call – arrival” log with floor numbers.

**2. Basic level.** Create a console program that prompts for floor and resident counts and simulates an elevator using a condition variable: residents add calls to a shared queue, and the elevator moves in one direction, serving calls along the way. Print a movement log and the average and maximum call waiting times.

**3. Advanced level.** Create a console elevator simulation with `--floors`, `--residents`, `--duration`, and `--policy fifo|sweep` options that compares two service strategies by the average and maximum waiting times for each floor. Print a floor table, mark floors whose calls waited more than three times the average (a sign of starvation), and return code 2 if any such floors exist.

### Variant 9. Network printer {#v9}

**1. Initial level.** Create a console program that acquires the named `Mutex` `Local\PrinterDemo`, prints “Printing document…”, waits 3 s, and releases the mutex. Run two instances simultaneously and show that the second waits for the first to finish.

**2. Basic level.** Create a console program that prompts for a document name and page count, then “prints” it (200 ms per page) after acquiring a named `Mutex`. If the printer is busy for more than 5 s, report a timeout. Handle `AbandonedMutexException` and print the waiting and printing times.

**3. Advanced level.** Create a console print queue application in which several client processes (`print <file>`) submit documents through a shared folder, and a printer process (`printer`) processes them one at a time, acquiring a named `Mutex`. Options: `--pages-delay`, `--timeout`, `--help`. The printer records a “document – process – wait – print” log in a CSV file and prints a final table; a named mutex detects two printers starting simultaneously, resulting in exit code 3.

### Variant 10. Election voting {#v10}

**1. Initial level.** Create a console program in which 8 polling-station threads each add 100 000 votes for a random one of three candidates to a shared counter array using `Interlocked.Increment`. Print each candidate's votes and the total, which must equal 800 000.

**2. Basic level.** Create a console program that prompts for candidate and polling-station counts and voters per station, counts votes in threads, and determines the maximum station turnout using an `Interlocked.CompareExchange` CAS loop. Print a results table with percentages, the winner, and a vote-total check.

**3. Advanced level.** Create a console application that reads polling-station reports from a directory of CSV files (`station;candidate;votes`), processes files in N threads (`--threads`), atomically totals votes, and finds the station with the most votes using a CAS loop. Compare execution times for `lock`, `Interlocked`, and local counters followed by aggregation; print election results and a timing table, and write invalid rows to a separate error file.

### Variant 11. Airport parking {#v11}

**1. Initial level.** Create a console program with a 5-space airport parking lot (`SemaphoreSlim`) visited by 12 car threads. Each waits no longer than 300 ms for a space, parks for 400 ms, and leaves. Print an event log and the number turned away.

**2. Basic level.** Create a console program that prompts for the number of spaces for passenger cars, buses, and taxis and simulates parking with a separate semaphore for each category. Each vehicle has a category, arrival time, parking duration, and patience. Print a table by category: served, turned away, and average wait.

**3. Advanced level.** Create a console application that reads an arrival schedule from a CSV file (`time;plate;category;stay;patience`), simulates parking with category quotas (`--cars`, `--buses`, `--taxis`), and allows taxis to use free passenger-car spaces when more than half of those spaces are free. Print a utilization table by simulation minute and rejection statistics by category, and verify that quotas are never exceeded.

### Variant 12. Restaurant kitchen {#v12}

**1. Initial level.** Create a console program in which a cook thread prepares 10 dishes and a waiter thread picks up each completed dish. Implement the “dish ready” signal using `AutoResetEvent`. Print a “prepared – served” log.

**2. Basic level.** Create a console program that prompts for cook, waiter, and order counts and simulates a kitchen: cooks place dishes at the serving counter, while waiters wait for an `AutoResetEvent` signal and pick them up. Print each order's preparation time and delay between completion and serving, and the average delay.

**3. Advanced level.** Create a console kitchen simulation that reads orders from a file (`table;dish;preparation time`) and compares two serving-counter implementations — `AutoResetEvent` and `Monitor.Wait`/`PulseAll` — by average and maximum serving delay (`--cooks`, `--waiters`, `--mode`, `--help`). Print a report by table, a comparison table, and a warning if a dish waited at the counter longer than the time specified by `--limit`.

### Variant 13. Relay race {#v13}

**1. Initial level.** Create a console program in which four runner threads take different amounts of time to prepare, then start simultaneously after `Barrier.SignalAndWait`. Each “runs” for a random time (400–600 ms). Print the finishing order and each runner's time.

**2. Basic level.** Create a console program that prompts for team and relay-stage counts and simulates a race: at each stage, the first runners of all teams start simultaneously through `Barrier`, while `CountdownEvent` waits for all teams to finish the stage. Print a “team – stage times – total time” table and the winner.

**3. Advanced level.** Create a console relay application with `--teams`, `--stages`, `--seed`, and `--help` options, in which stages are synchronized using `Barrier`; simulate a false start with a thread starting before the `ManualResetEventSlim` signal and detect it using timestamps. Print each stage's report, false-start disqualifications, and the final team standings, and write the report to a CSV file.

### Variant 14. Ad click counter {#v14}

**1. Initial level.** Create a console program in which 4 threads each record 1 000 000 clicks in a shared counter, without synchronization and with `Interlocked.Increment`. Print the resulting values, expected value, and time for each version.

**2. Basic level.** Create a console program that prompts for the ad click count and maximum thread count and measures click registration time (incrementing a shared counter) using `lock (object)`, `lock (Lock)`, and `Interlocked` for 1, 2, 4… threads. Each measurement includes warm-up and the median of five runs; print a timing table and verify that the counter equals the click count.

**3. Advanced level.** Create a console application for investigating campaign click-counter scalability (an array of counters by campaign), with `--clicks`, `--campaigns`, `--max-threads`, `--runs`, `--csv`, and `--help` options. Compare locking the entire array, separate locks for each campaign, `Interlocked`, and local counters followed by merging. Print a table of time, speedup, and efficiency for 1…N threads, verify the totals, and write the results to a CSV file.

### Variant 15. Hotel reservations {#v15}

**1. Initial level.** Create a console program with a 10-room hotel in which two threads simultaneously reserve pairs of adjacent rooms (i and i + 1) in different orders. Eliminate deadlock by locking rooms in ascending order. Print the reserved pairs.

**2. Basic level.** Create a console program that prompts for room and thread counts and simulates group reservations of 2–4 random rooms simultaneously: a reservation succeeds only if all rooms in the group are free. Acquire room locks in ascending order. Print successful and rejected reservation counts and verify that no room is reserved twice.

**3. Advanced level.** Create a console application for stress-testing reservations with 16 threads (`--rooms`, `--threads`, `--seconds`, `--strategy ordered|trylock`, `--help`), where `trylock` acquires rooms using `Monitor.TryEnter` with a timeout and backs off. Print throughput (reservations per second), retries, a room utilization table, and invariant checks; if no reservation completes for 5 s, report a possible deadlock and return code 2.

### Variant 16. Border checkpoint {#v16}

**1. Initial level.** Create a console program in which 10 vehicle threads pass through one checkpoint protected by `lock`. Vehicles have “ordinary” or “official” priority. Print the passage order and each vehicle's waiting time.

**2. Basic level.** Create a console program that prompts for the numbers of ordinary and official vehicles and simulates a checkpoint where official vehicles pass first. Calculate the maximum waiting time for ordinary vehicles and report starvation if it exceeds a user-specified limit.

**3. Advanced level.** Create a console checkpoint application with a fair queue based on `Monitor.Wait`/`PulseAll` and request numbers (`--lanes`, `--cars`, `--priority-share`, `--mode priority|fair`, `--help`). In `fair` mode, let one ordinary vehicle pass after every three official vehicles. Print a “category – mean, median, maximum wait” table for both modes and conclude whether starvation occurs.

### Variant 17. Laboratory equipment {#v17}

**1. Initial level.** Create a console program in which 4 threads each add instrument readings to a shared sum protected by `SpinLock` 1 000 000 times. Print the sum, expected value, and execution time.

**2. Basic level.** Create a console program that prompts for thread and operation counts and compares `SpinLock` and `lock` for a very short critical section (adding to a sum) and a longer one (adding to a 50-element list with a search). Print a timing table for both sections and both tools.

**3. Advanced level.** Create a console benchmark application with `--threads`, `--work` (critical-section duration in `Thread.SpinWait` iterations), `--runs`, and `--help` options that builds a “section length – threads – `SpinLock` time – `lock` time – faster tool” table for lengths 1, 10, 100, 1 000, and 10 000. Use warm-up and the median, write a CSV file, and print the section-length threshold beyond which `lock` becomes preferable.

### Variant 18. Exchange rate caching {#v18}

**1. Initial level.** Create a console program in which an update thread replaces an immutable exchange-rate dictionary with a new one every 100 ms using `Interlocked.Exchange`, while three reader threads read the dollar rate without locks. Print 10 values read by each reader.

**2. Basic level.** Create a console program that prompts for reader count and duration and implements an exchange-rate cache as an immutable snapshot object (a `record` with an update time), replaced through `Interlocked.Exchange`. Readers check snapshot consistency (the buying rate is below the selling rate). Print read and update counts and the number of inconsistent snapshots detected (must be 0).

**3. Advanced level.** Create a console application that compares three rate-cache implementations: `lock`, `ReaderWriterLockSlim`, and replacing an immutable snapshot through `Interlocked.CompareExchange` (`--readers`, `--update-ms`, `--seconds`, `--help`). Read rates from a history CSV file and “update” them in sequence. Print an “implementation – reads per second – updates – maximum read delay” table and verify snapshot consistency.

### Variant 19. One-way bridge {#v19}

**1. Initial level.** Create a console program modeling a narrow bridge that can carry only vehicles traveling in one direction at a time. Six car threads (three from each bank) wait using `Monitor.Wait` until the bridge is clear of opposing traffic. Print an entry and exit log.

**2. Basic level.** Create a console program that prompts for vehicle counts from each bank and bridge capacity and simulates traffic using a monitor: no more than the specified number of vehicles traveling in one direction may be on the bridge. Verify that opposing vehicles were never on the bridge simultaneously and print waiting times for each bank.

**3. Advanced level.** Create a console application for a bridge with traffic in batches (`--north`, `--south`, `--capacity`, `--batch`, `--help`): after a batch of `--batch` vehicles crosses, reverse direction if anyone is waiting on the other bank, preventing starvation. Compare modes with and without batches by maximum waiting time for each bank, and print a table and a traffic safety check.

### Variant 20. Game server {#v20}

**1. Initial level.** Create a console program with two players, each with an inventory (an item list) and its own lock. Two threads each exchange items between the players 1 000 times in opposite directions, locking inventories by player ID. Print each player's item count and the total.

**2. Basic level.** Create a console program that prompts for player and thread counts and simulates random item exchanges between pairs of players without deadlocks. Verify that the total item count and the count of each item type remain unchanged, and print a player table.

**3. Advanced level.** Create a console game server application that loads players and their inventories from a JSON file and simulates trading (exchanging several items for gold) in N threads (`--threads`, `--trades`, `--help`), with ordered locking and a `Monitor.TryEnter` timeout. Save the final state to a file, print trade and timeout-rejection statistics, and verify conservation of gold and items.

### Variant 21. Gym {#v21}

**1. Initial level.** Create a console program modeling a gym with three treadmills (`SemaphoreSlim`) and eight visitor threads, each exercising for 300 ms. Print an event log and the maximum number of treadmills occupied simultaneously.

**2. Basic level.** Create a console program that prompts for the number of machines of each of three types and the visitor count. Each visitor follows a workout using three machines in sequence, acquiring a permit from the corresponding semaphore. Print each visitor's workout time and the average wait for each machine type.

**3. Advanced level.** Create a console gym simulation that reads machine counts by type and visitors' workout plans (sequences of machines and durations) from a file. Visitors are threads, and semaphores limit machine availability. Simulate operation for `--minutes` (1 simulated minute = 10 ms) and print each machine's utilization percentage, the average queue length, and a recommendation for which machine to buy. The `--seed` option controls reproducibility, and `--help` displays help.

### Variant 22. Event logger {#v22}

**1. Initial level.** Create a console program in which 5 threads each write 200 messages to a shared text file through a logger method protected by `lock`. After completion, verify that the file contains 1 000 intact lines and print the check result.

**2. Basic level.** Create a console program that prompts for thread and message counts and compares two loggers: one locks for each file write, while the other accumulates messages in a thread-local buffer and writes batches of 100 lines under a lock. Print both execution times and check the line count.

**3. Advanced level.** Create a console logger benchmark with `--threads`, `--messages`, `--granularity global|per-file|batched`, `--out`, and `--help` options. The `per-file` version writes messages of different levels (Info, Warning, Error) to different files with separate locks. Print a table of time and throughput (messages per second), verify that no lines were lost or interleaved, and return code 2 on violations.

### Variant 23. Fire alarm {#v23}

**1. Initial level.** Create a console program in which 6 employee threads perform work in a loop and check an “alarm” `ManualResetEventSlim`. After 1 s, the main thread triggers the alarm, and all employees stop working. Print the number of iterations each completed.

**2. Basic level.** Create a console program that prompts for the number of employees and time until the alarm. Employees wait for a `ManualResetEventSlim` signal between work steps with a 50 ms timeout. Measure each employee's reaction time from `Set` to exit, and print a table and the maximum reaction time.

**3. Advanced level.** Create a console building alert application with floors and rooms (`--floors`, `--rooms`, `--check-ms`, `--help`), where each room is a thread. Wait for a floor alarm (one `ManualResetEventSlim` per floor) and a general alarm (a separate signal) through `WaitHandle.WaitAny`. Print each floor's evacuation time and the overall reaction time, and compare it for different `--check-ms` values.

### Variant 24. Hospital wards {#v24}

**1. Initial level.** Create a console program with a 6-bed hospital receiving 10 patient threads. Acquire a bed through `Monitor.TryEnter` with a 200 ms timeout on a shared bed registry; direct a patient who does not obtain a bed to another hospital. Print bed assignments and the number rejected.

**2. Basic level.** Create a console program that prompts for ward count, beds per ward, and patient count, and assigns patients to wards with a separate lock for each ward. A patient tries wards in turn using `Monitor.TryEnter` with a timeout. Print a ward occupancy table, rejections, and the average admission time.

**3. Advanced level.** Create a console application that reads patient arrivals from a file (`time;full name;department;urgency`), simulates bed allocation in departments with timeouts (`--timeout`, `--speedup`, `--help`), and prioritizes urgent patients for admission. Print a log, a department utilization table, and rejection counts by urgency, and verify that no bed is occupied twice.

### Variant 25. Order ID generator {#v25}

**1. Initial level.** Create a console program in which 8 threads each obtain 10 000 order IDs from a generator based on `Interlocked.Increment`. Collect all IDs and print the total count, unique count, and minimum and maximum values.

**2. Basic level.** Create a console program that prompts for thread and ID counts and generates IDs in `ORD-yyyyMMdd-NNNNNN` format, resetting the counter at the start of each new day. Implement the generator with `lock` and without synchronization, and print duplicates and execution time for each.

**3. Advanced level.** Create a console application that generates IDs for multiple stores (`--shops`, `--threads`, `--count`, `--method lock|cas|blocks`, `--help`). The `blocks` method assigns each thread a block of 1 000 numbers using CAS, then operates without synchronization. Check ID uniqueness, print a table of method execution times and the number of numbering gaps, and write a sample of IDs to a file.

### Variant 26. River ferries {#v26}

**1. Initial level.** Create a console program in which a ferry with a capacity of 4 cars departs only when full. Eight car threads wait for space using `Monitor.Wait`, and the ferry wakes them with `Monitor.PulseAll`. Print a trip log.

**2. Basic level.** Create a console program that prompts for ferry capacity, car count, and maximum departure waiting time. The ferry departs when full or when the waiting time expires. Print a trip table (number, car count, departure reason) and the average car waiting time.

**3. Advanced level.** Create a console crossing simulation with two ferries on opposite banks (`--capacity`, `--cars`, `--wait`, `--seed`, `--help`), cars on both banks, and condition variables on bank monitors. Print a trip log, each ferry's trip statistics (occupancy, empty trips), and the average car wait on each bank; verify that every car crossed exactly once.

### Variant 27. Deadlock detection {#v27}

**1. Initial level.** Create a console program that reads “thread waits for resource” and “thread holds resource” pairs from the keyboard until an empty line, builds a thread wait-for graph, and reports whether it contains a cycle.

**2. Basic level.** Create a console program that reads a resource allocation graph from a text file (lines such as `T1 holds R1` and `T1 waits R2`), validates the lines, builds a “thread → thread” wait-for graph, and prints all deadlock cycles as `T1 → T2 → T1`, or reports that none exist.

**3. Advanced level.** Create a console application with a `TrackedLock` wrapper that records which thread is waiting and who holds the lock in a global wait-for graph during acquisition. A background detector thread searches for cycles every 200 ms and prints a report with thread and lock names. Include `--scenario transfer|philosophers|none` scenarios and a `--help` option, and return code 2 if deadlock is detected.

### Variant 28. Livelock in a hallway {#v28}

**1. Initial level.** Create a console program in which two “pedestrian” threads with two “hallway side” locks acquire one side, fail to obtain the other, release the first, and immediately retry. Limit the attempt count and print how many attempts each thread made before succeeding or reaching the limit.

**2. Basic level.** Create a console program that prompts for pedestrian count and maximum attempts and compares retrying without delay with *randomized backoff*. For each strategy, print successes, the average attempt count, and the total time.

**3. Advanced level.** Create a console application for studying livelock with `--walkers`, `--backoff none|fixed|random|exponential`, `--max-attempts`, `--runs`, and `--help` options. Run each strategy several times, print a “strategy – successful run percentage – average attempts – median time” table, and mark strategies that experienced livelock (the attempt limit was exhausted).

### Variant 29. Gas station pumps {#v29}

**1. Initial level.** Create a console program modeling a gas station with two pumps (`SemaphoreSlim`), visited by 6 passenger cars and 2 trucks that require both pumps simultaneously. Print a refueling log and show how long trucks waited.

**2. Basic level.** Create a console program that prompts for pump, passenger-car, and truck counts (trucks occupy two pumps) and simulates a gas station with a stream of passenger cars. Measure the maximum truck waiting time and report starvation if it exceeds the entered limit.

**3. Advanced level.** Create a console gas station application with a fair monitor-based algorithm: when a truck is waiting, new passenger cars cannot occupy pumps until the truck starts refueling (`--pumps`, `--cars`, `--trucks`, `--mode greedy|fair`, `--help`). Print a “mode – average and maximum waits for cars and trucks – throughput” table and conclude whether starvation was eliminated.

### Variant 30. Scientific instruments {#v30}

**1. Initial level.** Create a console program that acquires a permit from the named `Semaphore` `ScienceLab` with 2 permits (Windows) before “measuring,” prints the start time, waits 2 s, and releases the permit. Run 4 instances simultaneously and show that no more than two measure at once.

**2. Basic level.** Create a console program that accepts an instrument name and measurement duration as command-line arguments, waits for a named interprocess semaphore permit with a timeout, performs the measurement, and appends the result to a shared CSV file protected by a named `Mutex`. Print the waiting time and a timeout message.

**3. Advanced level.** Create a console coordinator application that starts `--processes` measurement processes (`Process.Start`, the same program in measurement mode). Each worker waits for a named semaphore permit limiting concurrent measurements to `--limit`, “measures” for `--duration` ms, and appends timestamps to a shared CSV log. After completion, the coordinator reads the log, builds a “process – wait – measurement” table, verifies that the limit was never exceeded, and returns code 2 on violation; support `--help`.

## Procedure

1. Study the theory and worked examples.
2. For your variant, identify shared data, critical sections, and the conditions threads wait for; choose synchronization tools and justify your choices.
3. Create a .NET 10 console solution in JetBrains Rider and implement the chosen difficulty level.
4. Check correctness with a stress test: run the program several times in the *Release* configuration with different thread counts and ensure that invariants (totals, counts, uniqueness) hold.
5. For tasks involving locks, check for deadlock: explain the lock acquisition order; if needed, investigate hangs in the Rider debugger's *Parallel Stacks* tab.
6. Measure execution time with different synchronization tools or thread counts and explain the results.
7. Demonstrate the program to your instructor, explain the code, and answer the review questions.
