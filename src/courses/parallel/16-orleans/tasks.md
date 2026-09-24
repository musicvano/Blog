---
title: "Tasks"
description: "Topic 16. Actors and Microsoft Orleans: task variants"
outline: [2, 3]
sourceHash: "b9749655bdbfcf2f6b22f339b980dc669f0e0346904f98673c7dc5bc0e2407f9"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Bank accounts {#v1}

**1. Initial level.** Create an Orleans application (the silo and the client in one process) with an account grain `IAccountGrain` (the key is the account number) with the methods `Deposit`, `Withdraw`, and `GetBalance`; the client performs operations entered from the keyboard in the format “account operation amount” and prints the balance.

**2. Basic level.** Create an Orleans silo and a separate client for a bank: the account grain stores the balance and the history of operations through `IPersistentState` in Redis, and a transfer between accounts rejects negative amounts and overdrafts with a message to the client; after the silo restarts, the client prints the same balances.

**3. Advanced level.** Create an Orleans application `bank` with bank account grains (balance, deposit, withdrawal, transfer) with the commands `silo [--redis]`, `transfer from to amount`, and `stress --accounts N --transfers M` and the `--help` option. The `stress` mode performs M random simultaneous transfers among N accounts, checks that the total amount stays unchanged, and prints an “accounts – transfers/s – total before/after” table for N = 1, 10, 100; errors go to the error stream, exit codes 0/1/2.

### Variant 2. An online store cart {#v2}

**1. Initial level.** Create an Orleans application with a cart grain (the key is the user name) with the methods “add a product,” “remove a product,” and “contents”; the client runs commands from the keyboard and prints the cart contents and total.

**2. Basic level.** Create an Orleans application in which the cart grain reserves products in product grains (the key is the SKU, the state is the stock) and registers a reminder: if the cart has not changed for a given time, the reservations are released, and a message appears in the silo log.

**3. Advanced level.** Create an Orleans application `shop` with cart grains (the key is the user) and product grains (stock, reservations) with two silos in a Redis-based cluster and a client with the commands `add`, `remove`, `checkout`, and `--help`. The cart reserves products, and the state of carts and products and the reminders are stored in Redis; verify that after one silo crashes no carts or reservations are lost, and print a “cart – products – total – silo” report.

### Variant 3. A game lobby {#v3}

**1. Initial level.** Create an Orleans application with a room grain that players join by name; when there are 4 players in the room, the grain prints the message “game started” and the list of players.

**2. Basic level.** Create an Orleans application with a `[StatelessWorker]` grain for matching opponents by rating and room grains: after the third player, a room starts a 5 s countdown timer and publishes room events to an Orleans stream that the client subscribes to.

**3. Advanced level.** Create an Orleans application `lobby` for a game lobby (grains for rooms that players join and grains for players) with the commands `silo` and `bots --count N --games M` and the `--help` option. Bots enter rooms at the same time and play games with a random winner, and the player grains store statistics and an Elo rating; print a table of the top 10 players, the number of games, and the average waiting time in the lobby.

### Variant 4. IoT digital twins {#v4}

**1. Initial level.** Create an Orleans application with a sensor grain (the key is the identifier) that accepts temperature readings and returns the minimum, maximum, and average; the client sends 20 random readings for three sensors.

**2. Basic level.** Create an Orleans application in which sensor grains pass aggregated readings to a house grain, and the house grain prints a table of rooms with the average temperature and a threshold-exceeded mark every 5 s with a timer.

**3. Advanced level.** Create an Orleans application `twins` with digital twin grains for temperature sensors (which aggregate readings) and houses, with the commands `silo --redis` and `simulate --houses H --sensors S --seconds T` and the `--help` option. Simulated sensors send readings, a reminder marks sensors that have been silent for more than 1 min, and the state is stored in Redis; print the number of readings/s, the list of faulty sensors, and the activation metrics in the Aspire dashboard.

### Variant 5. Chat rooms {#v5}

**1. Initial level.** Create an Orleans application with a chat room grain that stores the last 20 messages; the client sends messages typed on the keyboard and prints the room history.

**2. Basic level.** Create an Orleans application in which the room grain publishes new messages to an Orleans stream (an in-memory provider), and several subscribed participant clients in one process print them; a participant who joined later receives the history first.

**3. Advanced level.** Create an Orleans chat `chat` with room grains (message history) and user grains, with the silo and the client in separate processes, the commands `join room name`, `/rooms`, and `/leave`, and the `--help` option. Room history is stored in Redis, the user grain remembers the rooms, and messages are delivered to participants through Orleans streams; print message statistics by room at the end.

### Variant 6. Warehouse accounting {#v6}

**1. Initial level.** Create an Orleans application with a product grain (the key is the SKU) with the methods “receipt,” “reservation,” and “stock”; a reservation exceeding the stock is rejected with a message.

**2. Basic level.** Create an Orleans application in which 50 simultaneous client tasks reserve the same product, and the grain guarantees no overselling; the state is stored in Redis, and the program prints the number of successful and rejected reservations.

**3. Advanced level.** Create a `stock` application in which the same product state is modified by an Orleans grain and by a separate program that writes directly to Redis, and demonstrate an `InconsistentStateException` (an ETag conflict). Implement a retry of the operation with re-reading of the state, the `--help` option, and an “attempts – conflicts – successful” report.

### Variant 7. An online auction {#v7}

**1. Initial level.** Create an Orleans application with a lot grain that accepts bids (name, amount) only if they are higher than the current one and returns the leader; the client enters bids from the keyboard.

**2. Basic level.** Create an Orleans application in which the lot grain starts a closing timer after the first bid (30 s, extended by 10 s after each bid) and, on closing, publishes the winner to a stream; participant clients simulate bids and print the events.

**3. Advanced level.** Create an Orleans application `auction` with lot grains (accepting only bids higher than the current one), a silo on Redis, and a client with the commands `create lot price min`, `bid lot amount`, and `watch` and the `--help` option. Lots are closed by reminders (which survive a silo restart), and the lot state is persisted; print a report on the sold lots (winner, price) and the number of bids.

### Variant 8. Electronic voting {#v8}

**1. Initial level.** Create an Orleans application with a voting grain that accepts a vote (voter, option) only once from each voter and returns the current results.

**2. Basic level.** Create an Orleans application in which a `[StatelessWorker]` grain accepts votes, validates their format, and passes them to a tally grain; 10,000 simultaneous votes from the client are counted without losses, and the program prints the results and the time.

**3. Advanced level.** Create an Orleans application `vote` for electronic voting (each voter votes once) with the commands `silo`, `load --voters N`, and `results` and the `--help` option. Polling station grains aggregate votes and pass them to the tally grain once a second; compare the throughput with a single tally grain and with aggregation (a “scheme – votes/s” table), and verify that there are no repeated votes.

### Variant 9. A game leaderboard {#v9}

**1. Initial level.** Create an Orleans application with a leaderboard grain that accepts a player’s score and returns the top 10; the client adds 100 random scores and prints the table.

**2. Basic level.** Create an Orleans application with regional leaderboard grains (the key is the region) and a global leaderboard grain that collects the top 100 from the regions every 2 s with a timer; print both tables.

**3. Advanced level.** Create an Orleans application `leaderboard` with regional leaderboard grains and a global leaderboard grain (the top players by score) with the commands `silo --redis`, `load --players N --regions R`, and `top region` and the `--help` option. Measure the number of scores/s for 1, 4, and 16 regional grains, save the tables in Redis, and print a table of measurements.

### Variant 10. Hotel booking {#v10}

**1. Initial level.** Create an Orleans application with a hotel room grain (the key is the room number) that books the room for a given date if it is free; the client enters bookings from the keyboard.

**2. Basic level.** Create an Orleans application in which 100 simultaneous requests book 10 rooms for the same date; the room grains guarantee no double booking, and the program prints a report of refusals and the list of guests.

**3. Advanced level.** Create an Orleans application `hotel` for booking rooms (room grains prevent double booking for a date, and a hotel grain searches for a free room) with a silo on Redis and a client with the commands `book`, `cancel`, and `list date` and the `--help` option. Unpaid bookings are cancelled by a reminder; print the hotel occupancy by date.

### Variant 11. Library loans {#v11}

**1. Initial level.** Create an Orleans application with book and reader grains: a book can be lent if it is available and the reader has fewer than 5 books; the client runs lend and return commands.

**2. Basic level.** Create an Orleans application in which the book grain keeps a waiting queue: when the book is returned, it is reserved for the first person in the queue, and the reader grain receives a notification that is printed to the log.

**3. Advanced level.** Create an Orleans application `library` with book grains (available or lent, a waiting queue) and reader grains (at most 5 books) with a silo on Redis and a client with the commands `take`, `return`, `queue`, and `overdue` and the `--help` option. Reminders mark overdue loans, and the state survives a silo restart; print a report of borrowers with overdue books.

### Variant 12. Car sharing {#v12}

**1. Initial level.** Create an Orleans application with a car grain with the states “available,” “rented,” and “maintenance”; the client rents and returns cars with keyboard commands.

**2. Basic level.** Create an Orleans application in which a rental grain charges a per-minute cost with a timer and uses a reminder to warn when the planned return time is exceeded; the state of the cars is stored in Redis.

**3. Advanced level.** Create an Orleans application `carsharing` with car grains (available, rented, maintenance) and rental grains (per-minute cost) with a cluster of two silos on Redis and a simulator client `--cars N --users U` and the `--help` option. Verify that no rental is lost after a silo crash, and print a “car – trips – revenue” report.

### Variant 13. Website visit counters {#v13}

**1. Initial level.** Create an Orleans application with a page counter grain (the key is the URL) that increments the counter and returns its value; the client simulates 1000 visits to five pages.

**2. Basic level.** Create an Orleans application in which a “hot” page receives 100,000 simultaneous visits: compare a single counter grain with a scheme using a `[StatelessWorker]` that accumulates local sums and passes them on every 100 ms, and print the time of both schemes.

**3. Advanced level.** Create an Orleans application `hits` with page visit counter grains (the key is the URL) with the commands `silo --redis` and `load --pages P --rate R` (simulating visits) and the `--help` option. The counters are stored in Redis in batches (once a second); print a “page – visits” table and the throughput, and explain how many visits can be lost in a silo crash.

### Variant 14. A tournament bracket {#v14}

**1. Initial level.** Create an Orleans application with match grains (the key is “round-number”) that accept a result and return the winner; the client enters the quarterfinal results.

**2. Basic level.** Create an Orleans application in which, after a result is entered, the match grain passes the winner to the next round’s grain, and the tournament grain prints the updated bracket for 8 participants.

**3. Advanced level.** Create an Orleans application `tournament` for a 16-participant bracket (match grains accept a result and pass the winner to the next round) with a silo on Redis and the commands `create participants.txt`, `result match score`, and `bracket` and the `--help` option. The bracket is restored after a silo restart, and invalid results are rejected; print the bracket and the champion’s path.

### Variant 15. Greenhouse monitoring {#v15}

**1. Initial level.** Create an Orleans application with a greenhouse grain that generates temperature and humidity readings once a second with a timer and keeps the last 10; the client prints them.

**2. Basic level.** Create an Orleans application in which greenhouse grains compare readings with thresholds entered by the client and publish alarms to an Orleans stream; the client prints the alarms with their time and value.

**3. Advanced level.** Create an Orleans application `greenhouse` for greenhouse monitoring (greenhouse grains generate temperature and humidity with a timer and compare them with thresholds) with the commands `silo --redis --otel` and `monitor` and the `--help` option. The thresholds are stored in Redis, and alarms are counted by an OpenTelemetry metric and displayed in the Aspire dashboard; print a summary of alarms by greenhouse.

### Variant 16. Rate limiting {#v16}

**1. Initial level.** Create an Orleans application with a limiter grain (the key is the client) that allows at most 10 requests per second; the client sends 30 requests and prints the allowed and rejected ones.

**2. Basic level.** Create an Orleans application with a sliding window limiter for each client and three clients with different request rates; print a “client – allowed – rejected” table.

**3. Advanced level.** Create an Orleans application `ratelimit` with a rate limiter grain for each client with the commands `silo` and `load --clients N --rps R --limit L` (L requests per second) and the `--help` option. Compare the fixed window, sliding window, and token bucket algorithms, and print the limiting accuracy and the check latency for each.

### Variant 17. An elevator dispatcher {#v17}

**1. Initial level.** Create an Orleans application with an elevator grain that accepts calls to floors and moves one floor per second with a timer, printing the current floor.

**2. Basic level.** Create an Orleans application in which a building grain distributes calls among three elevator grains by the shortest distance; print a movement log and the average waiting time.

**3. Advanced level.** Create an Orleans application `elevators`, in which elevator grains move one floor per second with a timer and a building grain distributes calls, with the command `simulate --floors F --lifts L --calls N` and the `--help` option. Compare two call distribution strategies (the nearest elevator and the least loaded one), print a “strategy – average wait – maximum wait” table, and verify that no call was lost.

### Variant 18. A request workflow {#v18}

**1. Initial level.** Create an Orleans application with a request grain with the states “created,” “approved,” “completed,” and “rejected”; invalid transitions are rejected with a message.

**2. Basic level.** Create an Orleans application in which the request grain executes a three-step saga in service grains (budget reservation, equipment reservation, assignment of an executor), and when a step fails, calls compensations for the previous ones; print a log of the steps.

**3. Advanced level.** Create an Orleans application `workflow`, in which the request grain executes a three-step saga in service grains (budget reservation, equipment reservation, assignment of an executor) with compensations on failure, with a silo on Redis and the commands `submit`, `status`, and `inject-fault step` and the `--help` option. The saga state is saved after every step, and after a silo restart unfinished sagas continue; print a “request – state – compensations” report.

### Variant 19. A CAP simulator {#v19}

**1. Initial level.** Create a console program that models three key–value replicas: a write updates all available replicas, and a read returns the value from a random one; the user turns a “network partition” on and off for one replica and sees stale reads.

**2. Basic level.** Create a simulator console program with the modes CP (a write requires a majority of replicas) and AP (writes go to the available replicas, with “last write wins” merging after recovery); print the share of failures and stale reads during a partition for both modes.

**3. Advanced level.** Create a `capsim` application that models a replicated key–value store in the modes CP (a write requires a majority of replicas) and AP (writes go to the available replicas, with “last write wins” merging), with the options `--replicas N`, `--mode cp|ap`, `--partition start:duration`, `--ops K`, and `--help`. The program models a network partition into two parts, counts failures, stale reads, and writes lost during merging, builds a CSV for a chart, and prints a table comparing the modes.

### Variant 20. Quorum replication {#v20}

**1. Initial level.** Create a console program that, for N = 5 replicas and entered W and R, checks the condition R + W &gt; N and models 1000 operations, printing the number of stale reads.

**2. Basic level.** Create a console program that, for N from 3 to 7, iterates over all pairs of W and R and prints an “N – W – R – stale reads – failures with f replicas cut off” table.

**3. Advanced level.** Create a `quorum` application that models quorum replication of a key–value store with N replicas, with the options `--n`, `--w`, `--r`, `--latency min:max`, `--down f` (replicas cut off), and `--help`. Each replica has a random latency, and the coordinator waits for the W or R fastest responses; print the median and 99th percentile latency and the share of stale reads for different configurations, and a CSV file.

### Variant 21. Leader election {#v21}

**1. Initial level.** Create a console program in which 5 node tasks exchange heartbeats through channels, and when the leader stops, the node with the highest number declares itself the new leader (the bully algorithm).

**2. Basic level.** Create a console program with a simplified Raft leader election: terms, random timeouts of 150–300 ms, majority voting; print an election log after the leader stops.

**3. Advanced level.** Create a `raftsim` application that models Raft leader election (terms, random timeouts, majority voting) for node tasks exchanging messages through channels, with the options `--nodes N`, `--kill`, `--partition nodes`, `--seconds T`, and `--help`. Model a network partition into a majority and a minority, show that a leader can exist only in the majority, and print the number of elections and the time without a leader.

### Variant 22. A failure detector {#v22}

**1. Initial level.** Create a console program in which nodes send heartbeats every 200 ms, and a monitor considers a node dead after 1 s of silence and prints a failure event.

**2. Basic level.** Create a console program with nodes that have random heartbeat delays and losses, and compare detectors with timeouts of 0.5, 1, and 2 s: the number of false positives and the time to detect a real failure.

**3. Advanced level.** Create a `detector` application that models nodes with heartbeats (random delay and packet loss) and a failure monitor, with the options `--nodes`, `--loss P`, `--jitter ms`, `--detector timeout|phi`, and `--help`. Implement a timeout detector and a phi accrual detector, and print a “detector – threshold – false positives – detection time” table and a CSV.

### Variant 23. A circuit breaker for a weather service {#v23}

**1. Initial level.** Create a console program that calls a simulated weather service (which sometimes throws an exception) with three retries and exponential backoff and prints each attempt.

**2. Basic level.** Create a program with a `Microsoft.Extensions.Resilience` pipeline (retry, circuit breaker, timeout) for a simulated weather service with the modes “normal,” “slow,” and “failing,” and print the changes of the circuit breaker state.

**3. Advanced level.** Create a `weather` application that calls a simulated unreliable weather service (the share of failures `--failure-rate`, of slow responses `--slow-rate`) N times (`--requests N`), with the `--help` option. The application compares three configurations (no protection, retries only, and retries with a circuit breaker) and prints a “configuration – successful – average latency – calls to the service” table.

### Variant 24. Vector clocks {#v24}

**1. Initial level.** Create a console program with three process tasks that exchange messages through channels and keep vector clocks; print the clock of each event.

**2. Basic level.** Create a chat console program with three participants in which messages are delivered with a random delay, and the receiver shows them only in causal order, using vector clocks.

**3. Advanced level.** Create a `vclock` application in which process tasks exchange messages through channels with a random delay and keep vector clocks, with the options `--processes N`, `--messages M`, `--delay min:max`, and `--help`. The program delivers messages in causal order, identifies pairs of parallel (concurrent) events, and prints the number of delayed messages and a table of events with their clocks.

### Variant 25. A replicated CRDT counter {#v25}

**1. Initial level.** Create a console program with a G-Counter (a grow-only counter) on three replicas: each increments its own share, and after merging all show the same total.

**2. Basic level.** Create a console program with a PN-Counter on three replicas that independently increment and decrement the value and exchange state in random order; verify that merging is commutative, associative, and idempotent.

**3. Advanced level.** Create a `crdt` application with the options `--replicas N`, `--ops K`, `--partition`, and `--help` that implements a G-Counter, a PN-Counter, and an OR-Set, models a network partition, and after recovery prints the state of the replicas and the convergence time.

### Variant 26. Idempotent payments {#v26}

**1. Initial level.** Create an Orleans application with an account grain in which a payment has an identifier, and a repeated payment with the same identifier does not debit the money twice.

**2. Basic level.** Create an Orleans application in which the client sends payments with retries under simulated response loss (30 %), and the account grain stores the processed identifiers in its state; print the number of attempts and the final balance.

**3. Advanced level.** Create an Orleans application `payments` with an account grain that credits payments idempotently by identifier, with a silo on Redis and a client `--payments N --loss P` (retries under simulated response loss) and the `--help` option. Identifiers are stored with an expiration time, and duplicates are detected even after a silo restart; print a “sent – attempts – duplicates – balance” report.

### Variant 27. A doctors’ schedule {#v27}

**1. Initial level.** Create an Orleans application with a doctor grain (the key is the surname) that books a patient into a free 20-minute slot of the day and returns the schedule.

**2. Basic level.** Create an Orleans application in which 50 patients book appointments with three doctors at the same time; no slot is taken twice, and rejected patients get the nearest free slot.

**3. Advanced level.** Create an Orleans application `clinic` with doctor grains (booking patients into free 20-minute slots without double booking) with a silo on Redis and the commands `book`, `cancel`, and `schedule doctor date` and the `--help` option. Reminders write a notification to the log an hour before an appointment, and the schedule survives a restart; print the doctors’ workload.

### Variant 28. Parcel tracking {#v28}

**1. Initial level.** Create an Orleans application with a parcel grain (the key is the waybill number) that stores a history of statuses with times; the client adds statuses and prints the history.

**2. Basic level.** Create an Orleans application in which branch grains pass parcels to each other, and the parcel grain publishes status changes to a stream that the recipient client subscribes to.

**3. Advanced level.** Create an Orleans application `parcels` for parcel tracking (the parcel grain stores the status history, and branch grains pass parcels) with a cluster of two silos on Redis and a simulator `--parcels N` and the `--help` option. The history is stored in Redis, and the client requests the status with retries while a silo crashes; print the average delivery time between branches.

### Variant 29. The actor model on channels {#v29}

**1. Initial level.** Create a console program with a bank account actor on `Channel<T>` without Orleans: the messages “deposit,” “withdraw,” and “balance” (ask via `TaskCompletionSource`).

**2. Basic level.** Create a console program with an actor system on channels: a registry of actors by name, sending messages by address, and a transfer between two accounts without locks; test 10,000 simultaneous transfers.

**3. Advanced level.** Create an `actors` application with an actor system on `Channel<T>` without Orleans (bank account actors, transfers by messages) and a supervisor actor that restarts child actors after an exception (the “let it crash” strategy), with the options `--actors N`, `--messages M`, and `--help`. Compare the throughput with a version of the accounts using `lock` and print a table.

### Variant 30. A cluster load test {#v30}

**1. Initial level.** Create an Orleans application with a simple echo grain and a client that performs 10,000 sequential calls and prints the average latency.

**2. Basic level.** Create an Orleans application with echo grains (they return the received value) and a client that calls 1, 10, and 1000 different grains from 1, 16, and 64 simultaneous tasks and prints a “grains – tasks – calls/s – median latency” table.

**3. Advanced level.** Create an Orleans application `loadtest` with an echo grain with the commands `silo N` and `run --grains G --tasks T --seconds S` (T tasks call G grains for S seconds) and the `--help` option. Compare a cluster of one and of two silos on Redis, and print the throughput, the median and 99th percentile latency, and a CSV for a chart.

## Procedure

1. Study the theory and worked examples.
2. For your variant, draw up a list of grains (interface, key, state, persistence provider), a diagram of calls between the grains and the client, and the timers and reminders; for tasks about CAP and fault tolerance, a model of the nodes, replicas, and failures.
3. If the task requires durable state or a cluster, start Redis in Docker Desktop: `docker run -d --name redis -p 6379:6379 redis:8.8 redis-server --appendonly yes`.
4. Create a .NET 10 solution in JetBrains Rider with projects for the interfaces, grains, silo, and client (or a single project in which the silo and the client run in one process), and implement the task of the chosen level.
5. Test the scenarios: simultaneous calls to one grain, a silo restart, and, for a cluster, a crash and a graceful shutdown of a silo; view the metrics in the Aspire dashboard.
6. Demonstrate the program to the instructor, explain the code, and answer the review questions.
