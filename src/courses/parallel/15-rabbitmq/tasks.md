---
title: "Tasks"
description: "Topic 15. The RabbitMQ broker: task variants"
outline: [2, 3]
sourceHash: "1bd8300e3ed1ae69006f152d5eacef890a7ae2e654ccd8e0bb089bd3500f9823"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Store order processing {#v1}

**1. Initial level.** Create console programs for the RabbitMQ broker: a publisher publishes N orders (N is entered from the keyboard) in JSON format (number, product, amount) to the durable `orders` queue, and a worker with manual acknowledgments prints each received order and the total amount.

**2. Basic level.** Create an order publisher and worker with the `orders` quorum queue, prefetch 1, and manual acknowledgments. Orders with an amount above UAH 50,000 “fail validation”: the worker rejects them with `requeue: false` into the `orders.failed` queue through a dead letter exchange. Start three workers and print how many orders each processed.

**3. Advanced level.** Create a `shop` application for processing store orders through RabbitMQ with the commands `publish --count N --seed S` (publishes JSON orders to the `orders` queue), `work --name W --prefetch P` (a worker with manual acknowledgments), and `report`, and the `--help` option. Failed orders (a random 20 % failure) are retried through a delay queue with a TTL of 3 s and, after three attempts, go to `orders.parking-lot`. The worker is idempotent: the identifiers of processed orders are stored in a file. `report` prints a “processed – duplicates – in parking-lot” table; exit codes 0/1/2.

### Variant 2. Weather notifications {#v2}

**1. Initial level.** Create a publisher program that publishes forecasts to the `weather` topic exchange with keys of the form `<region>.<type>` (for example, `kyiv.rain`), and a subscriber program that takes a binding pattern from the keyboard and prints the matching forecasts.

**2. Basic level.** Create a weather notification system: the publisher publishes random events for 5 regions and 3 types (`rain`, `storm`, `heat`) every second, and each user has a durable queue with several patterns from a subscription file. The subscriber validates the patterns (only words, `*`, `#`) and prints a table of the number of events received by type.

**3. Advanced level.** Create a RabbitMQ weather notification application `weather` with the commands `publish --rate N --duration s` (random events to a topic exchange with keys `<region>.<type>`), `subscribe --user name --pattern pattern…`, and `unsubscribe --user name`, and the `--help` option. Subscriptions are stored as bindings of the user’s durable queue and change without losing accumulated messages; storm warnings have priority (a separate queue). At the end, statistics by region are printed; exit codes 0/1/2.

### Variant 3. Image thumbnails {#v3}

**1. Initial level.** Create a publisher that publishes a “create a thumbnail” job for each image file in a folder (the path is entered from the keyboard), and a worker that simulates processing (a pause proportional to the file size) and prints the file name and processing time.

**2. Basic level.** Create a thumbnail system with a work queue: a worker with prefetch 1 and manual acknowledgments downscales an image (or simulates processing with a 100–500 ms pause) and publishes the result to the `thumbs.done` queue; the publisher waits for all results and prints the total time. Compare the time for 1, 2, and 4 workers.

**3. Advanced level.** Create a `thumbs` application for creating image thumbnails through a RabbitMQ work queue with the commands `enqueue --dir folder --count N` (jobs for the folder’s files), `work --prefetch P` (a worker downscales an image or simulates processing with a pause), and `bench --workers 1,2,4,8`, and the `--help` option. The `bench` mode starts the worker processes itself, measures the throughput (jobs/s, median of 5 runs) for prefetch 1, 10, and 100, and writes a “workers – prefetch – jobs/s – speedup” table to CSV.

### Variant 4. Microservice logs {#v4}

**1. Initial level.** Create a program that publishes log messages with the levels `info`, `warning`, and `error` (the level and text are entered from the keyboard) to the `logs` direct exchange, and a collector program that receives only the levels passed as command-line arguments.

**2. Basic level.** Create a microservice logging system with a topic exchange and keys `<service>.<level>`: an error collector receives `*.error` and `*.critical` and writes them to a file, and a console monitor receives everything and prints a summary table by service and level every 10 s.

**3. Advanced level.** Create a `logctl` application for microservice logs through RabbitMQ (a topic exchange, keys `<service>.<level>`) with the commands `emit --service S --rate N` (publishes random log records), `collect --pattern pattern --file path` (writes what it receives to a file), and `stats`, and the `--help` option. The collector uses a quorum queue and manual acknowledgments, and the archive uses a RabbitMQ stream; `stats` reads the stream from the beginning and prints the number of events by service and level.

### Variant 5. Bank payments {#v5}

**1. Initial level.** Create a program that publishes payments (account, amount) to a durable queue with publisher confirms and prints “confirmed by the broker” or an error message for each payment.

**2. Basic level.** Create a payment publisher and processor: the publisher uses publisher confirms (`CreateChannelOptions`) and `mandatory: true` and republishes after a `PublishException` up to 3 times with the same `MessageId`; the processor eliminates duplicates by `MessageId` and prints the balance of each account.

**3. Advanced level.** Create a `payments` application for bank payments through RabbitMQ with the commands `send --file payments.csv`, `process`, and `audit`, and the `--help` option. The publisher publishes payments (account, amount, `MessageId`) in batches of 100, waiting for publisher confirms, and measures the speed; the processor credits payments idempotently (processed identifiers and balances are saved to a file atomically). Test: killing the processor while it runs does not change the final balances; `audit` compares them with the expected ones.

### Variant 6. IoT sensor telemetry {#v6}

**1. Initial level.** Create a sensor simulator program that publishes a temperature reading (sensor ID, value, time) to a queue every second, and a consumer that prints the readings and the average value.

**2. Basic level.** Create a telemetry system with a quorum queue: 10 simulated sensors publish readings, and a consumer with prefetch 50 aggregates them per minute (minimum, maximum, and average for each sensor) and acknowledges the messages as a batch (`multiple: true`) after writing the aggregates to a file.

**3. Advanced level.** Create a RabbitMQ IoT sensor telemetry application `iot` with the commands `simulate --sensors N --rate R` (simulated sensors publish temperatures), `aggregate --window s` (minimum, maximum, and average of each sensor per window), and `replay --from time`, and the `--help` option. Raw readings are also written to a RabbitMQ stream, from which `replay` recomputes the aggregates for any period. Verify that no data is lost after a broker restart (`docker restart`).

### Variant 7. Distributed Monte Carlo {#v7}

**1. Initial level.** Create a coordinator that publishes K jobs “throw N points” to a queue to estimate π with the Monte Carlo method, and a worker that performs a job and publishes the number of points inside the circle to a result queue; the coordinator prints the estimate of π.

**2. Basic level.** Create a Monte Carlo coordinator and workers with the job’s `ReplyTo` and `CorrelationId`, prefetch 1, and manual acknowledgments. Each job has its own generator seed, so the result does not depend on the number of workers. Print the estimate of π, the error, the time, and the number of jobs of each worker.

**3. Advanced level.** Create a `montecarlo` application for estimating π with the Monte Carlo method through RabbitMQ with the commands `run --points N --tasks K` (the coordinator publishes K jobs with their own seeds and collects the numbers of points in the circle) and `worker --name W`, and the `--help` option. Measure the time and speedup for 1, 2, 4, and 8 worker processes (median of 5 runs) and print a table; verify that the result stays correct after a worker is killed during the computation.

### Variant 8. A hospital triage queue {#v8}

**1. Initial level.** Create a patient registration program that publishes patients with a priority of 0–9 (the name and priority are entered from the keyboard) to a classic queue with `x-max-priority`, and a doctor program that sees patients one at a time and prints them in the order they are seen.

**2. Basic level.** Create a triage system: the registration desk publishes random patients with priorities (red 9, yellow 5, green 1) and arrival times, and two doctors with prefetch 1 see one patient at a time (1–3 s per visit). Print the waiting time of each patient and the average waiting time by category.

**3. Advanced level.** Create a RabbitMQ hospital triage application `triage` with the commands `arrive --rate N --duration s` (publishes red, yellow, and green patients to a priority queue) and `doctor --name D` (sees patients one at a time), and the `--help` option. Green patients who wait longer than 60 s get a higher priority (republishing). The report prints a “category – patients – average – maximum wait” table and is saved to CSV.

### Variant 9. An electronic train schedule {#v9}

**1. Initial level.** Create a dispatcher program that publishes schedule updates (train, time, track) to a fanout exchange, and a station board program that prints every received update.

**2. Basic level.** Create a schedule system: the dispatcher publishes updates from a file with pauses, each board (the station name is an argument) has its own durable queue bound to the fanout exchange, and after a restart it receives the missed updates. The board prints the current schedule as a table after each update.

**3. Advanced level.** Create a RabbitMQ train schedule application `trains` with the commands `dispatch --file schedule.csv` (publishes “train, time, track” updates to a fanout exchange) and `board --station name [--temporary]` (a board prints the current schedule), and the `--help` option. Updates have a TTL of 10 min (stale ones are not shown), a permanent board has a durable queue, and a temporary one an exclusive queue. Print the number of received and expired updates for each board.

### Variant 10. Grading homework {#v10}

**1. Initial level.** Create a grading server that receives a student’s answer (name, assignment number, number) from a queue and replies to the `ReplyTo` queue with a grade, and a client that sends an answer entered from the keyboard and prints the grade.

**2. Basic level.** Create RPC over queues for grading assignments: the client sends several answers at once with different `CorrelationId` values and waits no longer than 3 s for each; the server checks an answer against a file of reference answers. Print a table of grades and timeout messages.

**3. Advanced level.** Create a homework grading application using RPC over RabbitMQ queues `grader` with the commands `server --answers file --workers N` (grades answers against reference answers) and `submit --student name --file answers.json --timeout s`, and the `--help` option. Requests have an `Expiration`, the server returns errors with the `Type` property, the client retries a request after a timeout up to 2 times, and the server does not count duplicates (idempotency by `MessageId`). The client prints the grades; exit codes: 0, 1 – arguments, 2 – timeout.

### Variant 11. An auction {#v11}

**1. Initial level.** Create an auction participant program that publishes bids (name, amount) to the `bids` queue, and an auctioneer program that processes bids one at a time and prints the current highest bid.

**2. Basic level.** Create an auction with sequential processing of bids by a single consumer (prefetch 1): a bid not higher than the current one is rejected; the auctioneer notifies all participants of each accepted bid through a fanout exchange. Print the bid history and the winner.

**3. Advanced level.** Create a RabbitMQ auction application `auction` with the commands `host --lot name --duration s` (the auctioneer processes bids one at a time, accepting only those higher than the current one) and `bid --name name --strategy random|step` (a participant publishes bids), and the `--help` option. The bid queue is a quorum queue with a single active consumer (`x-single-active-consumer`), so a second auctioneer becomes a standby; verify the failover after the first one exits. The report is a table of bids and the winner.

### Variant 12. Food delivery {#v12}

**1. Initial level.** Create a program that publishes order events to a topic exchange with keys of the form `<city>.<status>` (for example, `lviv.delivered`), and a subscriber that takes a pattern from the keyboard and prints the matching events.

**2. Basic level.** Create a delivery event system: a city’s courier service receives `<city>.ready`, analytics receives `*.delivered`, and customer support receives `#.cancelled`. Each subscriber has a durable queue and prints the number of events by city after the event stream ends.

**3. Advanced level.** Create a RabbitMQ food delivery event application (a topic exchange, keys `<city>.<status>`) with the commands `simulate --cities A,B,C --orders N` and `service --role courier|analytics|support --city C`, and the `--help` option. The courier service receives `<city>.ready`, analytics `*.delivered`, and support `#.cancelled`. The statuses of each order must arrive in order; analytics computes the average delivery time by city, and support processes cancellations idempotently; the result is a table.

### Variant 13. Importing CSV files {#v13}

**1. Initial level.** Create a program that reads a CSV file (the path is entered from the keyboard) and publishes each line as a separate message to a queue, and a consumer that counts the lines and sums a numeric column.

**2. Basic level.** Create a CSV import through a broker: the publisher splits the file into batches of 100 lines (batch number, number of batches), several workers validate the lines and publish a report for each batch; the coordinator prints progress in percent and a summary: lines, errors, time.

**3. Advanced level.** Create a `csvimport` application for importing a CSV file through RabbitMQ with the commands `import file --batch N` (publishes batches of lines) and `worker` (validates a batch’s lines), and the `--help` option. Invalid lines go to an error queue with the line number and reason, and the import resumes after a worker crash without reprocessing batches (idempotency by batch number). Print a report (lines, errors, time) and write the errors to CSV.

### Variant 14. Monitoring competitors’ prices {#v14}

**1. Initial level.** Create a scheduler that publishes a “check the product price” job every second for a list of products from a file, and a worker that simulates a price request and prints the product and price.

**2. Basic level.** Create a price monitoring system through RabbitMQ: the scheduler publishes “check the product price” jobs for products from a file, and the worker simulates a price request with website errors (30 %) and rejects failed jobs into an error queue through a dead letter exchange; a separate consumer of the error queue prints the product, the reason (`x-death`), and the number of attempts.

**3. Advanced level.** Create a RabbitMQ application for monitoring competitors’ prices `prices` with the commands `schedule --file products.csv --interval s` (publishes price check jobs), `work` (simulates a price request with random errors), and `report`, and the `--help` option. Failed checks are retried with increasing delays (queues of 1, 5, and 25 s), and after four attempts go to a parking-lot; `report` prints a table of price changes and of jobs in the parking-lot.

### Variant 15. School announcements {#v15}

**1. Initial level.** Create a program that publishes announcements to a headers exchange with the headers `class` and `role`, and a receiver program that binds a queue with `x-match = all` to the class and role entered from the keyboard.

**2. Basic level.** Create a school announcement distribution through a headers exchange: teachers receive announcements for their role (`x-match = any`), and parents for their class and role (`x-match = all`). The publisher reads announcements from a file; each receiver prints the received announcements and their count.

**3. Advanced level.** Create a RabbitMQ school announcement application using a headers exchange, `school`, with the commands `announce --class C --role R --text …` and `inbox --class C --role R` (the receiver binds a queue by headers), and the `--help` option. Urgent announcements have priority, and regular ones a TTL of 7 days; a test checks the “class × role” matrix and prints a table of expected and actual deliveries.

### Variant 16. Report generation {#v16}

**1. Initial level.** Create an RPC server over queues that, for a request (report name), returns the string “report … generated” after a 1 s pause, and a client that sends a request and prints the response.

**2. Basic level.** Create a report server and client with request correlation: the client sends 5 requests with different parameters at once, the server processes them with prefetch 2, and the client prints the responses in order of arrival and the total time; a nonexistent report returns an error.

**3. Advanced level.** Create a report generation application using RPC over RabbitMQ queues `reports` with the commands `server --instances N` (generates a report by name with a pause) and `request --names a,b,c --parallel K --timeout s`, and the `--help` option. Compare the total time for 1, 2, and 4 servers, and using a dedicated reply queue versus direct reply-to (`amq.rabbitmq.reply-to`); print a table.

### Variant 17. Transport GPS tracks {#v17}

**1. Initial level.** Create a program that publishes the GPS track points of a bus (number, coordinates, time) to a RabbitMQ stream (`x-queue-type = stream`), and a program that reads the stream from the beginning and prints all points.

**2. Basic level.** Create a track system on a RabbitMQ stream: a simulator publishes the points of 5 buses, and a reader takes an offset (`first`, `last`, or a number) from the command line, computes the distance traveled by each bus, and prints a table.

**3. Advanced level.** Create a bus GPS track application on a RabbitMQ stream (`x-queue-type = stream`) `tracks` with the commands `simulate --buses N --duration s` (publishes points: number, coordinates, time) and `replay --offset first|last|N|time --bus number`, and the `--help` option. Several independent readers view the same history; print the distance and the average and maximum speed of a bus, and save the track to CSV.

### Variant 18. Conference registration {#v18}

**1. Initial level.** Create a registration program that publishes a participant’s application (name, email) to a queue, and a confirmation service that “sends an email” (prints the email text to the console).

**2. Basic level.** Create a registration confirmation service with a simulated mail server that fails 30 % of the time: failed emails are retried through a delay queue (TTL 2 s) up to 3 times, after which the application goes to a manual review queue. Print a summary.

**3. Advanced level.** Create a RabbitMQ conference registration application `conf` with the commands `register --file participants.csv` (publishes applications), `mailer` (simulates sending a confirmation email with random mail server failures and retries through a delay queue), and `status`, and the `--help` option. Each participant receives an email exactly once even after retries and restarts (idempotency by email), and `status` prints a “sent – retrying – under review” table.

### Variant 19. Warehouse stock {#v19}

**1. Initial level.** Create a warehouse program that publishes “receipt” and “shipment” events for a product (product, quantity) to a fanout exchange, and a consumer that tracks and prints the stock.

**2. Basic level.** Create a warehouse stock system: two independent consumers (accounting and analytics) have their own durable queues; after processing all events, they compare the final stock. Events have a version number, and a consumer ignores stale and repeated events.

**3. Advanced level.** Create a RabbitMQ warehouse stock application `stock` with the commands `events --count N --duplicates P` (publishes “receipt/shipment” events with version numbers to a fanout exchange), `ledger` (a consumer that tracks the stock), and `compare`, and the `--help` option. The publisher deliberately duplicates P % of events and changes their order; the two consumers reconcile their state by version, and `compare` prints a table of discrepancies in their stock (it must be empty).

### Variant 20. Video encoding {#v20}

**1. Initial level.** Create a publisher that publishes video encoding jobs (title, duration in seconds), and a worker that simulates encoding (a pause proportional to the duration) and prints the progress.

**2. Basic level.** Create a system for long encoding jobs: a worker with prefetch 1 publishes progress to a separate queue every 10 % and acknowledges a job only after it finishes. Show that after the worker is killed, the job returns to the queue and is completed by another worker.

**3. Advanced level.** Create a video encoding application using a RabbitMQ work queue, `encode`, with the commands `submit --file videos.csv` (jobs: title, duration), `work` (simulates encoding with a pause, publishes progress), and `progress`, and the `--help` option. The worker acknowledges a job after it finishes, saves checkpoints, and continues from them after a redelivery; `progress` prints a table of the state of all jobs; check the behavior after a broker restart.

### Variant 21. Sports results {#v21}

**1. Initial level.** Create a program that publishes match events (minute, event, score) to a fanout exchange, and a scoreboard program that prints the current score after each event.

**2. Basic level.** Create a distribution of sports events to three services: a scoreboard, statistics (the number of shots and cards by team), and an archive (writing to a file). Each service has a durable queue and manual acknowledgments; at the end of the match, statistics prints a table.

**3. Advanced level.** Create a RabbitMQ sports match event distribution application `match` with the commands `play --file match.csv --speed k` (publishes numbered events) and `service --role board|stats|archive` (a scoreboard, statistics of shots and cards, an archive), and the `--help` option. The archive uses a RabbitMQ stream and lets you replay the match from any minute; statistics is idempotent (by event number) and is checked by comparison with the archive.

### Variant 22. A search index {#v22}

**1. Initial level.** Create a program that publishes text documents from a folder (file name and text) to a queue, and an indexer that builds a “word → number of documents” dictionary and prints the 10 most frequent words.

**2. Basic level.** Create a batch document indexer through RabbitMQ: the publisher publishes text documents from a folder, and a consumer with prefetch 100 builds a “word → number of documents” dictionary and acknowledges the documents with a single `BasicAckAsync(multiple: true)` after indexing a batch of 50 documents. Print the indexing time and compare it with acknowledging each document.

**3. Advanced level.** Create a RabbitMQ search index application `indexer` with the commands `feed --dir folder` (publishes text documents), `index --batch N` (builds a “word → documents” dictionary with batch acknowledgment), and `search word`, and the `--help` option. The index is saved to a file atomically together with the list of processed documents, so a redelivery does not change the index; print a table of indexing times for batches of 1, 10, 50, and 100.

### Variant 23. Computing primes {#v23}

**1. Initial level.** Create a coordinator that divides the range [1; N] into K parts and publishes them to a queue, and a worker that counts the primes in a part and publishes the result; the coordinator prints the total number of primes.

**2. Basic level.** Create a distributed prime count with several workers, prefetch 1, manual acknowledgments, and the problem’s `CorrelationId`; the coordinator prints the count, the time, and the distribution of parts among workers, and the result is verified with a sequential computation.

**3. Advanced level.** Create a `primes` application for counting primes in a distributed way through RabbitMQ with the commands `run --max N --parts K` (the coordinator divides [1; N] into K parts and collects the results) and `worker` (counts the primes of a part), and the `--help` option. Measure the time for 1, 2, 4, 8, and 16 workers and 16, 64, and 256 parts, print a speedup table (median of 5 runs), verify the count with a sequential computation, and explain the effect of the part size.

### Variant 24. Handling customer complaints {#v24}

**1. Initial level.** Create a program that publishes complaints to a direct exchange with a category key (`delivery`, `quality`, `payment`), and a department program that receives the complaints of one category.

**2. Basic level.** Create routing of complaints by category to three departments with durable queues; the publisher gets complaints with an unknown category back (`mandatory: true`) and publishes them to an “unrouted” queue. Each department prints the complaints and the number processed.

**3. Advanced level.** Create a RabbitMQ customer complaint handling application `complaints` with the commands `submit --file complaints.csv` (publishes to a direct exchange with the category key), `department --category C`, and `sla`, and the `--help` option. Complaints have a TTL corresponding to the category’s SLA, and expired ones go through a DLX to an escalation queue; `sla` prints a “category – on time – overdue – average time” table.

### Variant 25. An online library {#v25}

**1. Initial level.** Create a library program that publishes “issued” and “returned” events (book, reader) to a queue, and a consumer that tracks and prints the list of issued books.

**2. Basic level.** Create a library event system that simulates the outbox pattern: events are first written to a file “table” together with the state change, and a separate process publishes unpublished events with publisher confirms and marks them. The consumer is idempotent.

**3. Advanced level.** Create a RabbitMQ online library event application using the outbox pattern, `library`, with the commands `issue` and `return` (write the state change and the event to a file “table”), `relay` (publishes unpublished events with publisher confirms), and `readers` (an idempotent consumer that tracks issued books), and the `--help` option. Verify that after `relay` is killed in the middle of publishing, no event is lost and duplicates do not change the consumer’s state; print a table of borrowers with overdue books.

### Variant 26. A smart home alarm system {#v26}

**1. Initial level.** Create a sensor program that publishes alarms (room, type, time) to a queue, and a control panel program that prints the received alarms.

**2. Basic level.** Create an alarm system with TTL: motion events have a TTL of 5 s, and fire alarms have no TTL and a higher priority. A panel started with a delay receives only current events; print the number of received and expired events (through a DLX).

**3. Advanced level.** Create a RabbitMQ smart home alarm application `smarthome` with the commands `sensors --rooms N --rate R` (publish alarms: motion with a TTL of 5 s, fire without a TTL and with a higher priority) and `panel --delay s` (a panel started with a delay), and the `--help` option. Expired events go through a DLX to a log, and the panel groups repeated alarms from the same room within 10 s; print a table by room and type.

### Variant 27. Ticket booking {#v27}

**1. Initial level.** Create a program that publishes ticket booking requests (flight, seat, customer) to a queue, and a booking service that confirms or rejects a request (the seat is taken).

**2. Basic level.** Create a simulated booking saga: the “seat,” “payment,” and “ticket” services exchange messages through queues; if the payment fails, a compensating “release the seat” message is published. Print a log of the steps for each booking.

**3. Advanced level.** Create a RabbitMQ ticket booking saga application `booking` with the commands `request --count N --fail-rate P` and `service --role seat|payment|ticket`, and the `--help` option. The “seat,” “payment,” and “ticket” services exchange messages through queues; on a failed payment, a “release the seat” compensation is published. Each step is idempotent, and the saga ends in success or full compensation; the report checks that the number of occupied seats equals the number of issued tickets.

### Variant 28. Weather stations {#v28}

**1. Initial level.** Create a weather station program that publishes readings to a queue with an `x-max-length` limit of 100, and a consumer that prints the readings and the number received.

**2. Basic level.** Create a weather station system with a slow consumer and study the overflow strategies: `drop-head` (old readings are lost) and `reject-publish` (the publisher gets a refusal via confirms). For each strategy, print the number of readings sent, received, and lost.

**3. Advanced level.** Create a RabbitMQ weather station application `meteo` with the commands `station --rate R --overflow drop-head|reject` (publishes readings to a queue with an `x-max-length` limit) and `consumer --delay ms` (a slow consumer), and the `--help` option. In `reject` mode, the publisher gets refusals through publisher confirms and reduces its publishing rate (backpressure); print a table of losses and delays for different rates.

### Variant 29. A click counter {#v29}

**1. Initial level.** Create a program that publishes N “click” events (page, time) to a queue, and a consumer that counts the clicks for each page and prints a table.

**2. Basic level.** Create a click counter and compare consumer performance: acknowledging every message, batch acknowledgment (`multiple: true`) every 100 messages, and `autoAck: true`. Print the number of messages per second for each mode.

**3. Advanced level.** Create a RabbitMQ click counter application `clicks` with the commands `emit --count N --pages P` (publishes “page, time” events) and `count --ack each|batch|auto --prefetch K` (counts page clicks), and the `--help` option. Measure the consumer’s throughput for prefetch 1, 10, 100, and 1000 and three acknowledgment modes (median of 5 runs), print a table, and write a CSV.

### Variant 30. Comparing delivery guarantees {#v30}

**1. Initial level.** Create a publisher that publishes 1000 numbered messages and a consumer with `autoAck: true` that exits after the 500th message; print how many messages remain in the queue and how many were lost.

**2. Basic level.** Create an experiment with a consumer crash: the modes at-most-once (`autoAck: true`) and at-least-once (manual acknowledgments after processing). The consumer crashes several times; a new consumer reads the rest of the queue. Print the number of lost and duplicated messages for each mode.

**3. Advanced level.** Create a `guarantees` application for comparing RabbitMQ delivery guarantees with the command `run --mode M --count N --crashes K`, where M is `at-most-once`, `at-least-once`, or `idempotent`, and the `--help` option. The application publishes N numbered messages, starts consumer processes itself and crashes them K times, restarts the broker (`docker restart`), and builds a “mode – lost – duplicates – time” report for persistent and transient messages.

## Procedure

1. Study the theory and worked examples.
2. Start the RabbitMQ broker in Docker Desktop (`rabbitmq:4-management`), open the web console at `http://localhost:15672`, and make sure the broker is running (`rabbitmq-diagnostics ping`).
3. For your variant, draw up a messaging diagram: publishers, exchanges (type, name), queues (type, durability, `x-…` arguments), bindings and routing keys, consumers, the message format, the acknowledgment mode, and prefetch.
4. Create a .NET 10 solution in JetBrains Rider with separate publisher and consumer projects (or a single program with command-line modes) and the `RabbitMQ.Client` 7.x package.
5. Implement the task of the chosen level: manual acknowledgments, handling of `PublishException` and `OperationInterruptedException`, and graceful closing of connections; for the basic and advanced levels, durability, publisher confirms, and idempotent processing.
6. Test the scenarios: several consumers, a consumer crash during processing, a broker restart (`docker restart`), and an unroutable or rejected message; show the state of the queues in the web console.
7. Demonstrate the program to the instructor, explain the code, and answer the review questions.
