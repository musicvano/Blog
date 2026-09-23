---
title: "Tasks"
description: "Topic 5. Built-in collections: task variants"
outline: [2, 3]
sourceHash: "4412b736882c25531e8ce902e8089f24df120a01f32254fa58d340a2f4afea07"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

Use Python 3.14, functions with parameter and return annotations, and the standard library. Custom classes and external packages are unnecessary; `NamedTuple` is allowed for describing a named record. For the advanced level, implement `sys.argv` arguments, `--help`, keyboard input when arguments are absent, messages to `sys.stderr`, and exit codes. Separate parsing from processing functions. Files and databases are unnecessary at this stage. Use integer kopiykas for monetary amounts and explicitly specified integer day numbers for dates. All accounting rules in these tasks are for learning purposes.

## Variants

### Variant 1. Soccer league {#v1}

**1. Initial level.** Create a console program. Read space-separated team names and use a set to print a sorted list of unique names and their count.

**2. Basic level.** Create a console program. Read matches `team1:team2:goals1:goals2` until an empty line. Award 3 points for a win, 1 for a draw, and 0 for a loss. Reject negative goals and a team playing itself; print a table in descending order of points and goal difference, then by name. Repeat meetings are allowed.

**3. Advanced level.** Create a console league tracker with match arguments `team1:team2:goals1:goals2`, keyboard input without arguments, and `--help`. Accumulate games, wins, draws, losses, goals, and 3/1/0 points in dictionaries. Print a ranking by points, goal difference, and name, and the total match count. Reject invalid records before changing the table; write errors to `stderr`, with exit code 2 and 0 for success. Test a draw and an empty tournament.

### Variant 2. Hotel {#v2}

**1. Initial level.** Create a console program. Read a room count from 1 to 100 and space-separated occupied room numbers. Use a set to find and print free rooms from 1 to the entered count; reject numbers outside these bounds.

**2. Basic level.** Create a console program. Read the hotel capacity and bookings `room:guest` until an empty line. Store bookings in a dictionary and reject an already occupied room or an out-of-range number. Print bookings by room number, free rooms, and the occupancy percentage.

**3. Advanced level.** Create a console program with a `capacity` argument, operations `book:room:guest` and `cancel:room`, keyboard input, and `--help`. Execute operations sequentially in a dictionary; reject double bookings, cancellation of a free room, and invalid room numbers. After each step, show the number of free rooms; finish with a booking table and occupancy. Write errors to `stderr`, exit with code 2, and use 0 for success.

### Variant 3. Music playlist {#v3}

**1. Initial level.** Create a console program. Read comma-separated track names, strip surrounding whitespace, and print a numbered list and its reverse order. Reject empty names; an empty line means an empty playlist.

**2. Basic level.** Create a console program. Read records `track:genre` until an empty line, store them in a `deque`, and request an integer rotation step. Print the queue after `rotate`, the next track or an empty-queue message, and genre frequencies using `Counter`. Reject incomplete records.

**3. Advanced level.** Create a console player with arguments `add:track:genre`, `next`, `rotate:step`, and `shuffle:seed`, input without arguments, and `--help`. Store the queue in a `deque`; for reproducible shuffling, use `random.Random(seed).shuffle` on a temporary list. Print played tracks, the remaining queue, and a genre `Counter`. Reject unknown commands and `next` on an empty queue: `stderr`, code 2; success 0.

### Variant 4. Elections {#v4}

**1. Initial level.** Create a console program. Read space-separated candidate surnames from ballots and print each candidate's vote count using `Counter`. An empty line means no votes.

**2. Basic level.** Create a console program. Read a candidate list and a vote list. Reject votes for unknown candidates. Show all candidates, including those with 0 votes, their counts, and their percentages of valid votes. For an empty vote, percentages are 0; rank by votes, then surname.

**3. Advanced level.** Create a console program with arguments `candidates:A,B,C` and `vote:A`, keyboard input, and `--help`. Count votes with `Counter`. A winner requires strictly more than 50 percent of votes; otherwise, show two leaders for a runoff. If there is a tie at the qualification cutoff, print all contenders and state that an additional rule is needed. Print the table and totals; invalid data: `stderr`, code 2; success 0.

### Variant 5. Bus routes {#v5}

**1. Initial level.** Create a console program. Read two comma-separated stop lists and use sets to print shared stops and stops on the first route only. Strip whitespace and sort the result.

**2. Basic level.** Create a console program. Read routes `number:stop,stop` until an empty line, then the trip's start and end. Reject duplicate route numbers and empty stops; print all direct routes containing both stops. Ignore travel direction in this task; show a message if none exist.

**3. Advanced level.** Create a console planner with arguments `from:stop`, `to:stop`, and `number:stop,stop`, input without arguments, and `--help`. Store route stops as sets. Find direct journeys and all one-transfer options; print route numbers and the shared stop without duplicates, ignoring direction. Summarize the option count. Invalid records and unknown endpoints: `stderr`, code 2; success 0.

### Variant 6. Warehouse {#v6}

**1. Initial level.** Create a console program. Read space-separated names of received product units and use `Counter` to print stock by name and the total quantity.

**2. Basic level.** Create a console program. Read deliveries `product:quantity` until an empty line and a nonnegative integer minimum. Accumulate stock using `defaultdict(int)`; reject nonpositive quantities and empty names. Print a table, the total quantity, and products with stock below the minimum.

**3. Advanced level.** Create a console program with arguments `min:number`, `in:product:quantity`, and `out:product:quantity`, keyboard input, and `--help`. Process movements sequentially; prohibit withdrawals exceeding stock and withdrawals of unknown products. Retain zero balances; print a table of receipts, withdrawals, balances, shortages relative to the minimum, and totals. Report errors before changing the affected record: `stderr`, code 2; success 0. Test complete withdrawal.

### Variant 7. Conference {#v7}

**1. Initial level.** Create a console program. Read comma-separated participants in two sessions, and use sets to print shared participants and the total number of distinct people.

**2. Basic level.** Create a console program. Read registrations `participant:session` until an empty line. Group people in `defaultdict(set)` and do not count repeat registrations twice. Reject empty fields; print sessions with their participants and people registered for at least two sessions.

**3. Advanced level.** Create a console registration program with arguments `participant:session:slot`, keyboard input, and `--help`; a slot is an integer from 1–8. Each session has one slot. Identify people registered for different sessions in the same slot, group registrations using dictionaries of sets, and remove exact duplicates. Print the session schedule, conflicts, and totals. Empty fields, invalid slots, and different slots for one session: `stderr`, code 2; success 0.

### Variant 8. School timetable {#v8}

**1. Initial level.** Create a console program. Read comma-separated lesson names for one day and print them numbered with `enumerate`, along with the number of lessons and distinct subjects.

**2. Basic level.** Create a console program. Read records `day:lesson:room:teacher` until an empty line. Days are 1–5, lessons 1–8, and other fields are nonempty. Use dictionaries to find room or teacher conflicts in the same time slot; print the sorted timetable and all conflicting record pairs.

**3. Advanced level.** Create a console program with arguments `day:lesson:room:teacher`, keyboard input, `--help`, and a `free:day:lesson` parameter. Build a slot dictionary, find room and teacher conflicts, and print the timetable and teachers available in the specified slot from the set of all entered teachers. Total lessons by day. Bounds are 1–5 and 1–8; invalid format: `stderr`, code 2; success 0, even if conflicts are found.

### Variant 9. Refrigerator and recipes {#v9}

**1. Initial level.** Create a console program. Read available products and the ingredients for one dish, separated by commas. Use sets to determine whether all ingredients are available and print missing products alphabetically.

**2. Basic level.** Create a console program. Read available products and recipes `dish:product,product` until an empty line. Store a dictionary of sets; reject duplicate dish names and empty ingredients. Print fully available dishes and missing products for the others; ignore quantities.

**3. Advanced level.** Create a console planner with arguments `stock:product,product` and `dish:product,product`, keyboard input, and `--help`. For each dish, compute the set of missing products and rank by the number of purchases and name; for the best two distinct dishes, print the combined shopping list and its size. Ignore quantities; explain if there are fewer than two dishes. Duplicate names and empty fields: `stderr`, code 2; success 0.

### Variant 10. Movie theater {#v10}

**1. Initial level.** Create a console program. Read positive row and seat counts up to 20, create independent rows of a zero matrix, and print a seating chart. The value 0 means a free seat.

**2. Basic level.** Create a console program. Read theater dimensions up to 20 by 20 and bookings `row:seat` until an empty line. Use nested lists and numbering starting at 1. Reject occupied seats and coordinates outside the theater; print the 0/1 chart and free-seat counts per row and overall.

**3. Advanced level.** Create a console program with arguments `size:rows:seats`, `book:row:seat`, `cancel:row:seat`, and `find:count`, input, and `--help`. Store the theater in nested lists up to 20 by 20. Find all runs of the requested number of adjacent free seats within one row without booking them. Print the chart and totals; double booking, cancellation of a free seat, and invalid coordinates: `stderr`, code 2; success 0.

### Variant 11. Employment exchange {#v11}

**1. Initial level.** Create a console program. Read comma-separated candidate skills and job requirements. Use sets to print matching and missing skills.

**2. Basic level.** Create a console program. Read a nonempty set of requirements and candidates `name:skill,skill` until an empty line. Calculate the percentage of requirements covered, sort by descending coverage and name, and show missing skills. Reject duplicate names.

**3. Advanced level.** Create a console program with arguments `required:skills`, `optional:skills`, and `name:skills`, keyboard input, and `--help`. Skills are comma-separated. Required and preferred sets do not intersect. Rank by the number of required matches, preferred matches, and name; highlight candidates covering all required skills. Print the table and totals. Empty required skills, duplicate names, and invalid format: `stderr`, code 2; success 0.

### Variant 12. Olympics {#v12}

**1. Initial level.** Create a console program. Read space-separated countries of winners and use `Counter` to print each country's win count and the total.

**2. Basic level.** Create a console program. Read records `country:medal` until an empty line; a medal is `gold`, `silver`, or `bronze`. Accumulate a dictionary of counters and print standings in descending gold, silver, and bronze counts, then by name. Reject unknown medals and empty countries.

**3. Advanced level.** Create console standings with arguments `event:country:medal`, keyboard input, and `--help`. Allow only one medal of each color, `gold`, `silver`, and `bronze`, for each event; reject repeats. Accumulate countries' medals in nested dictionaries, print overall standings by gold, silver, bronze, and name, and totals by event. Errors: `stderr`, code 2; success 0. Test equal country results.

### Variant 13. Admissions department {#v13}

**1. Initial level.** Create a console program. Read comma-separated visitor names, place them in a `deque`, and print the service order using `popleft`. An empty queue must produce a message without an exception.

**2. Basic level.** Create a console program. Read `name:priority` until an empty line. Priorities are 1–5, with lower values served earlier. Build a `heapq` with an arrival sequence number; print the service order and priority frequencies. Preserve arrival order for equal priorities.

**3. Advanced level.** Create a console program with arguments `arrive:name:priority` and `serve`, keyboard input, and `--help`. In this learning model, priorities are 1–5, lower first; equal priorities are served in arrival order. Use `heapq` and a unique record number; print the service log, remaining queue, and statistics. `serve` on an empty queue and invalid data: `stderr`, code 2; success 0. Allow duplicate names.

### Variant 14. Bilingual dictionary {#v14}

**1. Initial level.** Create a console program. Read pairs `word:translation` until an empty line and a word to look up. Store a dictionary and reject duplicate keys; print the translation or a message using `get`.

**2. Basic level.** Create a console program. Read `word:translation` until an empty line and group multiple translations of a word in a set. Build a reverse dictionary of sets and print both directions alphabetically. Reject empty fields and ignore exact duplicates.

**3. Advanced level.** Create a console program with arguments `word:translation`, a `find:word` parameter, keyboard input, and `--help`. Build forward and reverse dictionaries of sets. Print the query's translations and other source words sharing a translation as a learning approximation of synonyms; exclude the query itself. Print the tables and pair count. Empty fields and invalid format: `stderr`, code 2; success 0.

### Variant 15. Subway {#v15}

**1. Initial level.** Create a console program. Read a comma-separated ordered list of unique stations and two stations. Use indices to calculate the number of segments between them; reject unknown stations and list duplicates.

**2. Basic level.** Create a console program. Read two subway lines as comma-separated station lists. Reject duplicates within a line and empty names. Print transfer stations using set intersection, numbered stations on each line, and the total number of distinct stations.

**3. Advanced level.** Create a console planner with arguments `line:station,station`, `from:station`, and `to:station`, input without arguments, and `--help`. Find direct journeys and journeys with one transfer at a shared station. Cost is the sum of absolute index differences; transfers are free. Print options by cost and the minimum. Duplicate stations within a line, duplicate line names, and unknown endpoints: `stderr`, code 2; success 0.

### Variant 16. School library {#v16}

**1. Initial level.** Create a console program. Read comma-separated titles of checked-out books and print their frequencies using `Counter` and the three most popular titles. Break frequency ties by title.

**2. Basic level.** Create a console program. Read the current day and loans `reader:book:return_day` until an empty line. Days are nonnegative integers. Group books by reader and print overdue borrowers whose due day is less than the current day; equality is not overdue. Reject empty fields.

**3. Advanced level.** Create a console tracker with arguments `today:day` and `reader:copy_code:title:due_day`, keyboard input, and `--help`. Reject duplicate copy codes, empty fields, and negative days. Build a loan dictionary, overdue borrower groups, and a title `Counter`; print days overdue, loan counts per reader, and totals. A due date of today is not overdue. Errors: `stderr`, code 2; success 0.

### Variant 17. Social network {#v17}

**1. Initial level.** Create a console program. Read comma-separated friends of two users and use sets to print shared friends and friends of the first user only.

**2. Basic level.** Create a console program. Read friend pairs `name1:name2` until an empty line and a query name. Build a symmetric dictionary of sets; reject self-friendship and empty names, and ignore duplicates. Print friends and the number of mutual friends with every other user.

**3. Advanced level.** Create a console program with friend-pair arguments `A:B`, `user:name`, keyboard input, and `--help`. Build a symmetric dictionary of sets. Recommend friends of friends, excluding the user and existing friends; rank by the number of mutual friends, then name. Print a recommendation table and network totals. Unknown user, self-friendship, and invalid pairs: `stderr`, code 2; success 0.

### Variant 18. Clothing store {#v18}

**1. Initial level.** Create a console program. Read `name:size:price_kop` until an empty line, create `namedtuple` records, and print names and prices. Allowed sizes are S, M, L, XL; the price is a nonnegative integer.

**2. Basic level.** Create a console program. Read `name:size:color:price_kop` until an empty line and the desired size and maximum price. Store `NamedTuple` records, filter products, and sort by price, name, and color. Reject empty fields, unknown sizes, and negative prices.

**3. Advanced level.** Create a console catalog with arguments `name:size:color:price_kop`, `size:size`, and `max:price_kop`, input, and `--help`. Store `NamedTuple` records; reject identical name–size–color triples. Print filtered products by price and name, available colors using a set, and item counts by size. Sizes are S, M, L, XL; prices are nonnegative integers. Errors: `stderr`, code 2; success 0.

### Variant 19. Vehicle fleet {#v19}

**1. Initial level.** Create a console program. Read space-separated vehicle mileages and a service threshold. Use a comprehension to select mileages at least equal to the threshold and print their count; all values are nonnegative integer kilometers.

**2. Basic level.** Create a console program. Read `plate:make:mileage` until an empty line and a threshold. Reject duplicate plates, empty fields, and negative mileages. Group vehicles by make using `defaultdict`; print the average mileage and plates of vehicles that reached the threshold.

**3. Advanced level.** Create a console program with arguments `plate:make:mileage:last_service` and `interval:kilometers`, keyboard input, and `--help`. The interval is positive, and the last service mileage does not exceed the current mileage. Calculate the distance remaining until service; overdue vehicles have a negative remainder. Print a ranking by remaining distance and plate, and grouped totals by make. Duplicate plate and invalid mileages: `stderr`, code 2; success 0. Test the exact service boundary.

### Variant 20. Matrices {#v20}

**1. Initial level.** Create a console program. Read two rows of three integers, store a 2 by 3 matrix, and print row and column sums. Reject an incorrect element count.

**2. Basic level.** Create a console program. Read two matrices as rows of space-separated numbers separated by semicolons. Check that they are nonempty, rectangular, and equal in size. Print the matrix sum and the transpose of the first; do not change the source lists, and show a verification result.

**3. Advanced level.** Create a console program with arguments `A:1,2;3,4`, `B:5,6;7,8`, `op:add`, `op:mul`, `op:transpose`, or `op:det`, keyboard input, and `--help`. Perform one operation per run; transpose and determinant need only A, and determinant is only for 3 by 3 matrices. Check rectangularity and dimension compatibility, calculate using lists, and print the result and dimensions. Errors: `stderr`, code 2; success 0.

### Variant 21. Sports club {#v21}

**1. Initial level.** Create a console program. Read space-separated participant ages from 6–18 and group them with `defaultdict(list)` into categories 6–10, 11–14, and 15–18; print the contents and size of each group.

**2. Basic level.** Create a console program. Read a participant list and a list of those attending practice. Use sets to find absentees and reject unknown names; duplicate attendance does not increase the count. Print attendance as a percentage; for an empty club, print 0 percent.

**3. Advanced level.** Create a console program with arguments `roster:name,name` and `session:number:name,name`, keyboard input, and `--help`. An empty list after the number means a session with no attendees. Store a dictionary of sets, use `Counter` to count attendance and calculate each participant's absences, and print a ranking and totals. Unknown participants, duplicate session numbers, and invalid format: `stderr`, code 2; success 0.

### Variant 22. Monthly weather {#v22}

**1. Initial level.** Create a console program. Read from 1 to 31 space-separated integer temperatures; print the minimum, maximum, average, and numbers of days below zero.

**2. Basic level.** Create a console program. Read from 1 to 31 integer temperatures and a window size from 1 to the list length. Use slices to calculate all moving averages; print each window's starting and ending day and its value to two decimal places. Reject invalid windows.

**3. Advanced level.** Create a console program with integer temperature arguments and `window:size`, keyboard input, and `--help`. For 1–31 days, maintain a sliding sum using `deque`; print averages of full windows and averages of consecutive 7-day blocks, including an incomplete last block. Print the warmest window, choosing the first in a tie. Invalid numbers and window: `stderr`, code 2; success 0.

### Variant 23. Game inventory {#v23}

**1. Initial level.** Create a console program. Read space-separated item names and use `Counter` to print quantities and the total item count.

**2. Basic level.** Create a console program. Read `name:weight:value` until an empty line and a positive backpack capacity. Weight is a positive integer and value a nonnegative integer; reject duplicate names. Print items by descending value and name, total weight, and excess over capacity.

**3. Advanced level.** Create a console program with arguments `name:weight:value` and `capacity:capacity`, keyboard input, and `--help`. Order items by descending value-to-weight ratio, then name; take only items that fit, in sequence. Print selected and skipped items, weight, and value; explain that greedy selection does not guarantee an optimum. Duplicates and invalid bounds: `stderr`, code 2; success 0. Each item can be taken once.

### Variant 24. Courier service {#v24}

**1. Initial level.** Create a console program. Read space-separated parcel codes, create a `deque`, and print delivery order from first to last. Reject duplicate codes.

**2. Basic level.** Create a console program. Read `code:district:weight` until an empty line. Group parcels by district using `defaultdict`, preserving arrival order. Reject duplicate codes and nonpositive weights; print district queues, counts, and total weights per district.

**3. Advanced level.** Create a console program with arguments `add:code:district:weight` and `deliver:district`, keyboard input, and `--help`. Store a `dict[str, deque]` of delivery queues; codes are unique throughout the run. `deliver` removes the first parcel in the district. Print the log, remaining parcels, and total delivered weight. Empty queue, duplicate code, unknown district, and nonpositive weight: `stderr`, code 2; success 0.

### Variant 25. Student exams {#v25}

**1. Initial level.** Create a console program. Read one student's space-separated integer grades from 0–100 and print the average and number of grades below 50. For an empty list, report that there are no grades.

**2. Basic level.** Create a console program. Read `student:subject:grade` until an empty line. Build a nested dictionary; reject duplicate student–subject pairs and grades outside 0–100. Print a ranking by descending average and name, and subjects with grades below 50.

**3. Advanced level.** Create a console program with arguments `subjects:subject,subject` and `student:subject:grade`, keyboard input, and `--help`. Use a nested dictionary to find each student's missing subjects and grades below 50. Rank only complete results by average and name; print totals of outstanding requirements. Subjects in the list are unique; unknown subjects, duplicate grades, and grades outside 0–100: `stderr`, code 2; success 0.

### Variant 26. Flights {#v26}

**1. Initial level.** Create a console program. Read space-separated nonnegative flight delays in minutes; print the number of delayed flights and the maximum delay. For empty data, mark the maximum as unavailable.

**2. Basic level.** Create a console program. Read `flight:airport:delay` until an empty line. Reject duplicate flight numbers and negative delays. Group flights by airport using `defaultdict`; print average delays and a list of flights by descending delay.

**3. Advanced level.** Create a console program with arguments `flight:airport:delay` and `find:airport`, keyboard input, and `--help`. Build a flight dictionary and an airport index containing lists of codes. Print matching flights by delay and code, and each airport's count, average, and maximum; an empty search result is allowed. Duplicate codes, empty fields, and negative minutes: `stderr`, code 2; success 0.

### Variant 27. Grocery baskets {#v27}

**1. Initial level.** Create a console program. Read two baskets as space-separated name lists, combine them by adding `Counter` objects, and print product quantities and the total number of units.

**2. Basic level.** Create a console program. Read prices `product:kopiykas` until an empty line and a basket as space-separated names. Prices are nonnegative integers, and price-list names are unique. Count using `Counter`; print a quantity–price–amount receipt and a total. Reject unknown products.

**3. Advanced level.** Create a console program with arguments `price:product:kopiykas`, `basket:product,product`, and `discount:percent`, input, and `--help`. Combine all baskets using `Counter` and build a receipt with amounts in integer kopiykas. The discount is 0–100; calculate the final amount as `(total * (100 - percent) + 50) // 100` to round to a kopiyka. Print the original amount, discount, and amount due. Unknown products, duplicate prices, and invalid numbers: `stderr`, code 2; success 0.

### Variant 28. Family tree {#v28}

**1. Initial level.** Create a console program. Read pairs `child:parent` until an empty line and a child's name to look up. Store a dictionary recording one parent; reject a repeated child and identical names in a pair. Print the found name or a not-found message.

**2. Basic level.** Create a console program. Read pairs `child:parent` until an empty line and a name to look up. In this model, each child has at most one recorded parent. Use a dictionary and a visited set to build the ancestor chain; a repeated child or a cycle is an error. Print ancestors with their distances in generations.

**3. Advanced level.** Create a console program with arguments `child:parent`, `from:name`, and `to:name`, keyboard input, and `--help`. The model records one parent per child. Check for cycles throughout the dictionary; find the nearest common ancestor of two people, including the people themselves, and the sum of distances to that ancestor. Print both chains and the result or lack of a connection. Duplicates, cycles, and unknown people: `stderr`, code 2; success 0.

### Variant 29. Chess tournament {#v29}

**1. Initial level.** Create a console program. Read unique space-separated player names and use nested loops to print all distinct unordered pairs for a round-robin tournament and their count.

**2. Basic level.** Create a console program. Read matches `A:B:result` until an empty line; the result `1`, `0.5`, or `0` is A's score, and B receives the complement to 1. Reject self-play and repeated unordered pairs using `frozenset`. Print scores in descending order, then by name.

**3. Advanced level.** Create a console round-robin tournament program with arguments `players:A,B,C` and matches `A:B:result`, input, and `--help`. Results are 1, 0.5, and 0; store doubled scores as integers. Calculate the Buchholz score as the sum of opponents' current scores from played matches. Print a ranking by score, Buchholz score, and name, and unplayed pairs. Repeated pairs, unknown players, and invalid results: `stderr`, code 2; success 0.

### Variant 30. Volunteer center {#v30}

**1. Initial level.** Create a console program. Read comma-separated volunteer skills and shift needs. Use sets to print covered and uncovered needs.

**2. Basic level.** Create a console program. Read `name:skill,skill` until an empty line and a nonempty needs list. Store a dictionary of sets; reject duplicate names and empty skills. For each volunteer, print covered needs and the combined coverage of the entire team.

**3. Advanced level.** Create a console program with arguments `needs:skills` and `name:skills`, keyboard input, and `--help`. Greedily select the volunteer covering the most still-uncovered needs, breaking ties by choosing the first name. Stop when everything is covered or no progress is possible. Print the team, coverage steps, and unmet needs; state that minimum team size is not guaranteed. Duplicate names, empty needs, and invalid records: `stderr`, code 2; success 0.

## Procedure

1. Record the input record format, chosen level, and rules for empty data, duplicates, and unknown keys.
2. Choose collections and explain the operation that makes each one necessary. Declare annotations for nested structures.
3. Separate input and formatting from processing functions. Validate a record before changing state so that an error does not leave a partially completed operation.
4. Test an ordinary case, an empty data set, one element, a repeated key, a missing key, and a boundary case for the problem. Add a tie or copy-independence check where appropriate.
5. Calculate one result manually. Demonstrate an invariant: the sum of quantities, the number of processed records, or preservation of dimensions.
6. Run in PyCharm and the terminal. For the advanced level, also test `--help`, an invalid argument, and the exit code. Save the code, README, and actual test results in a local Git repository; do not add `.venv` or `__pycache__`.
7. During the defense, explain mutability, order, copying, and the cost of the main operations. Show the collection's state in the debugger.
