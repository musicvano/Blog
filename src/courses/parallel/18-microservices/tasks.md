---
title: "Tasks"
description: "Topic 18. Microservice architecture: task variants"
outline: [2, 3]
sourceHash: "bdf485dbe688de6d25124c1c3d7d041cba43bbff7ab09ae8a1e1c4e93e9e1478"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. A book marketplace {#v1}

**1. Initial level.** Create an Aspire solution with two web services of a book marketplace, sellers (`GET /sellers/{id}/offers` returns a seller's offers with prices) and a cart (`POST /cart/{user}/items` with an offer, `GET /cart/{user}`), and a YARP gateway that routes `/api/sellers/**` and `/api/cart/**` through service discovery; check requests to the gateway with the `curl` command and show the resources in the Aspire dashboard.

**2. Basic level.** Create an Aspire solution for a book marketplace with a seller service (offers with prices and stock in its own PostgreSQL database) and a cart service (Redis, a lifetime of 7 days). When adding an item, the cart checks the offer and the stock in the seller service, and `GET /cart/{user}` groups the items by seller into a “seller – book – quantity – price – amount” table with a total; input errors produce code 400 with `ProblemDetails`, and a price change by the seller is marked as “price changed”.

**3. Advanced level.** Create a marketplace with cart, seller, order, and payout services: checking out the cart splits the order into suborders by seller, each seller confirms or rejects its suborder with an event via RabbitMQ (Outbox and Inbox), and a rejected suborder is cancelled without cancelling the others and reduces the amount to be paid; payouts to sellers are accrued only for confirmed suborders. `Aspire.Hosting.Testing` integration tests check partial confirmation, and a program `market-load` with the options `--orders`, `--sellers`, `--reject-rate`, and `--help` prints a “seller – suborders – confirmed – payout” table; a mismatch between order and payout totals is printed to the error stream, with exit codes 0/1/2.

### Variant 2. Hotel booking {#v2}

**1. Initial level.** Create an Aspire solution with room and booking services: `POST /bookings` with a room number and dates calls the room service through service discovery, reserves the room, and returns a booking number, or code 409 if the room is taken for those dates; show the trace of the request through both services in the dashboard.

**2. Basic level.** Create room, payment, and booking services with an orchestrated saga in the booking service: reserve the room → payment → confirmation; if the payment is declined (an amount above the limit or the test card “0000”), the saga releases the room reservation (compensation). The saga state is stored in PostgreSQL, and `GET /bookings/{id}` returns the state and a log of the steps as a “step – result – time” table.

**3. Advanced level.** Create a booking system with booking (the saga orchestrator), room, payment, and notification services that exchange commands and replies via RabbitMQ with an Outbox and an Inbox in each service; a step without a reply within 10 s ends with a timeout and compensation, and unfinished sagas continue after the orchestrator restarts. `Aspire.Hosting.Testing` integration tests check success, a declined payment, and a timeout; a program `hotel-chaos` with the options `--bookings`, `--fail-rate`, and `--help` prints a “result – count – average time” table and checks that no room remains reserved without payment (exit codes 0/1/2).

### Variant 3. Food delivery {#v3}

**1. Initial level.** Create an Aspire solution with RabbitMQ and order and restaurant services: `POST /orders` publishes an `OrderCreated` event, and the restaurant receives it and writes the dishes and the time of receipt to the log; show the trace from the HTTP request to the processing of the event in the dashboard.

**2. Basic level.** Create a food delivery system with choreography and no central coordinator (RabbitMQ): the order service publishes `OrderCreated`, the restaurant publishes `OrderAccepted` or `OrderRejected` (the dish is not on the menu), the courier service assigns a free courier and publishes `CourierAssigned`, and the order service updates the state based on the events. `GET /orders/{id}` returns the order's event history, and a rejection by the restaurant moves the order to the “cancelled” state.

**3. Advanced level.** Create a delivery system of four services (orders, restaurant, couriers, payments) with a choreographed saga: if no free courier is found within 30 s, payments refunds the money, and the restaurant cancels the preparation; all services have an Outbox and an Inbox, and the whole saga is visible in the dashboard as a single trace. `Aspire.Hosting.Testing` integration tests check delivery and cancellation; a program `food-load` with the options `--orders`, `--couriers`, and `--help` prints a “couriers – delivered – cancelled – average delivery time” table.

### Variant 4. A movie theater {#v4}

**1. Initial level.** Create showtime and seat services for a movie theater behind a YARP gateway in an Aspire solution: `GET /api/sessions` returns showtimes, `POST /api/seats/{session}/{seat}/hold` holds a seat, and holding the same seat again returns code 409.

**2. Basic level.** Create showtime, seat, and payment services for a movie theater behind a YARP gateway, in which temporary seat holds are stored in Redis with a lifetime (5 min, 30 s for testing): a payment turns a hold into a sale, and a background service removes expired holds and publishes `SeatReleased`. A nonexistent row or seat produces code 400, and `GET /api/sessions/{id}/map` returns a text map of the hall (“.” free, “x” sold, “o” held).

**3. Advanced level.** Create a ticket sales system with showtime, seat, payment, and ticket services and a “hold → payment → ticket” saga with compensation on a payment timeout and an Outbox for events; concurrent attempts to buy the same seat must have exactly one winner. Integration tests check contention and the timeout, and a program `cinema-rush` with the options `--buyers`, `--seats`, and `--help` prints a “buyers – sold – conflicts – double sales” table (the last value must be 0; otherwise, exit code 1).

### Variant 5. Bank transfers {#v5}

**1. Initial level.** Create an Aspire solution with an account service (PostgreSQL, EF Core) and a transfer service: `POST /transfers` with accounts and an amount calls the debit and credit operations in the account service and returns the new balance of both accounts.

**2. Basic level.** Create an Aspire solution with an account service (PostgreSQL) and an idempotent transfer service: the client passes an `Idempotency-Key` header, processed keys are stored in a table, and a repeated request returns the same result without debiting again. The transfer orchestrator returns the debited funds if the credit is impossible (the account is blocked); an invalid amount, identical accounts, and an insufficient balance produce code 400 or 409 with an explanation.

**3. Advanced level.** Create a system of four services (a transfer orchestrator, the accounts of bank A, the accounts of bank B, and an audit service): commands and replies are passed through RabbitMQ with an Outbox and an Inbox, HTTP calls have retries and timeouts from `Microsoft.Extensions.Http.Resilience`, and the audit service records every step of the saga. Integration tests check idempotency and compensation, and a program `bank-chaos` with the options `--transfers`, `--kill-every`, and `--help` performs transfers while periodically restarting services and prints a “transfers – successful – compensated – total before/after” table; a change in the total amount means exit code 1.

### Variant 6. A library {#v6}

**1. Initial level.** Create book collection and reader services for a library behind a YARP gateway: `GET /api/books` returns books with the number of copies, and `POST /api/readers` registers a reader; each service has its own PostgreSQL database.

**2. Basic level.** Create library services (the copy collection, readers, lending) with their own databases, in which the lending service has its own book model (an ID and a title copied from the collection). Lending checks the reader and the availability of a copy, rejects more than 5 books per reader, and publishes `BookIssued`, upon which the collection reduces the number of available copies; `GET /api/loans/overdue` returns a table of debtors.

**3. Advanced level.** Create a library system with collection, reader, lending, and reminder services: a background service finds overdue loans and publishes events, the reminder service “sends” emails to the log, and a “reader – books – due date” projection is stored in Redis; all events go through an Outbox and an Inbox. A program `library-sim` with the options `--days`, `--readers`, and `--help` simulates accelerated time and prints a “day – issued – returned – reminders” table; integration tests check the lending limit and the reminders.

### Variant 7. A university timetable {#v7}

**1. Initial level.** Create classroom and teacher services behind a YARP gateway: `GET /api/rooms?capacity=N` returns classrooms with a capacity of at least N, and `GET /api/teachers/{id}/busy` returns a teacher's busy class periods.

**2. Basic level.** Create a timetable service that, when adding a class, simultaneously (`Task.WhenAll`) checks with the classroom, teacher, and group services that the period is free; a conflict returns code 409 with a list of reasons, and `GET /api/schedule/group/{id}` returns a group's weekly timetable as a “day – period – subject – classroom – teacher” table.

**3. Advanced level.** Create classroom, teacher, group, and timetable services with a class placement saga: reserving the classroom, the teacher, and the group, with compensation of the reservations already made if any step fails, and an Outbox for events. A program `schedule-gen` with the options `--csv` and `--help` imports the teaching load from CSV, places the classes, and prints a table of placed and unplaced classes with reasons; integration tests check that concurrent requests for the same classroom do not create overlaps.

### Variant 8. Car rental {#v8}

**1. Initial level.** Create an Aspire solution with fleet and rental services: `POST /rentals` checks the availability of a car by calling the fleet service and creates a rental or returns code 409.

**2. Basic level.** Create fleet and car rental services with a Transactional Outbox in the rental service: the rental and the `CarRented` message are written in one EF Core transaction, a background relay publishes the message to RabbitMQ, and the fleet changes the status of the car. Show that when the broker is stopped, events are not lost and arrive after it starts; `GET /outbox/stats` returns the number of unpublished messages.

**3. Advanced level.** Create a rental system with fleet, rental, payment, and return services: a “reserve → payment → handover” saga with compensation, the return service calculates a fine for lateness and mileage, and consumers have an Inbox. Integration tests stop the broker while the system is running, and a program `rental-chaos` with the options `--rentals`, `--broker-downtime`, and `--help` prints a “sent – delivered – duplicates discarded – maximum delay” table.

### Variant 9. Online courses {#v9}

**1. Initial level.** Create course and enrollment services in an Aspire solution: `POST /enrollments` checks that the course exists and has free places by calling the course service, and enrolls the student.

**2. Basic level.** Create online course services (courses, enrollments, payments) and a “student dashboard” service as a CQRS projection: the dashboard receives the `StudentEnrolled` and `PaymentCompleted` events and builds a “course – status – access” view in Redis; access opens only after payment, and the response shows how many milliseconds the projection lagged behind the event.

**3. Advanced level.** Create a platform of four services (courses, enrollments, payments, dashboard): events are stored in a log, the dashboard projection can be rebuilt from scratch with the `POST /admin/rebuild` command, and events have a version and are read tolerantly. A program `courses-load` with the options `--students` and `--help` prints an “enrollments – projection lag median and 95th percentile” table; integration tests check rebuilding the projection.

### Variant 10. An outpatient clinic {#v10}

**1. Initial level.** Create doctor and appointment services behind a YARP gateway: `GET /api/doctors/{id}/slots` returns free slots, and `POST /api/appointments` books a patient into a slot.

**2. Basic level.** Create doctor, appointment, and notification services for a clinic, in which double booking of a slot is prevented by optimistic locking (an EF Core concurrency token for PostgreSQL): a conflict returns code 409, and an appointment outside working hours or in the past returns code 400; a successful appointment publishes an event, and the notification service writes a message to the patient to the log.

**3. Advanced level.** Create a clinic system with doctor, appointment, notification, and reminder services: a cancellation frees the slot with an event, reminders are sent a day in advance (a minute in the test), and all events go through an Outbox and an Inbox. A program `clinic-rush` with the options `--patients`, `--slots`, and `--help` performs concurrent bookings and prints an “attempts – booked – conflicts – double bookings” table; integration tests check cancellations and conflicts.

### Variant 11. Warehouse and logistics {#v11}

**1. Initial level.** Create order and stock services with RabbitMQ in an Aspire solution: an `OrderPlaced` event reduces the stock of a product, and `GET /stock/{sku}` returns the current stock.

**2. Basic level.** Create order, warehouse, and reporting services with RabbitMQ: the warehouse implements reserving, releasing a reservation, and shipping goods, and reporting keeps its own copy of the stock levels updated by events. Show the temporary data discrepancy and measure the time to consistency; discard redelivered events by message ID.

**3. Advanced level.** Create a logistics system with several warehouses: a saga distributes an order among warehouses with compensation of reservations on a shortage, the services have an Outbox and an Inbox, and reporting builds a projection. A program `stock-audit` with the options `--url` and `--help` reconciles the stock levels of the warehouse and reporting services, prints a table of discrepancies, and returns code 1 if there are any; a load mode `--orders N` measures the time to consistency.

### Variant 12. Train tickets {#v12}

**1. Initial level.** Create a train timetable service behind a YARP gateway in an Aspire solution: `GET /api/trains?from=London&to=Paris` returns trains with departure times and free seats.

**2. Basic level.** Create a train timetable service (`GET /api/trains?from=…&to=…`) behind a YARP gateway with global rate limiting in the gateway: a sliding window of 100 requests per second for the `/api/trains/**` route and a separate fixed window for each IP address; exceeding the limit returns code 429 with a `Retry-After` header. The timetable is cached in Redis for 60 s, and a `ScheduleChanged` event from RabbitMQ clears the cache for the relevant route.

**3. Advanced level.** Create a system with timetable, seat, and ticket services, in which the timetable cache is built on `HybridCache` (process memory and Redis) with protection against a request stampede: when a cache entry expires, only one request goes to the database, and the rest wait. A program `train-load` with the options `--rps`, `--seconds`, and `--help` prints a “requests – 200 – 429 – cache hits – database calls – 95th-percentile latency” table for the cache disabled, Redis only, and hybrid; integration tests check cache invalidation by an event.

### Variant 13. A social network {#v13}

**1. Initial level.** Create user and post services behind a YARP gateway: `POST /api/posts` creates an author's post, and `GET /api/users/{id}/posts` returns their posts.

**2. Basic level.** Create social network services (users, posts, feed), in which the feed service subscribes to the `PostPublished` and `UserFollowed` events and builds each user's feed in Redis at publication time (fan-out on write); likes are tracked with a counter, and `GET /api/feed/{user}?page=N` returns a page of the feed with the number of likes.

**3. Advanced level.** Create a social network with user, post, feed, and like services with an Outbox for events: deleting a post removes it from feeds, and the feed can be built on write or on read (a configuration parameter). A program `feed-load` with the options `--users`, `--followers`, and `--help` prints a table comparing the two approaches in terms of publication time, read time, and Redis size; integration tests check deletion.

### Variant 14. Tourist packages {#v14}

**1. Initial level.** Create flight and hotel services and a tour service in an Aspire solution: `POST /tours` books a flight and a hotel in sequence through service discovery and returns the total cost of the tour.

**2. Basic level.** Create flight, hotel, and excursion services and a tour service with an orchestrated saga: flight → hotel → excursions; if any step fails, compensations are performed in reverse order. The saga state is stored in PostgreSQL, and `GET /tours/{id}` returns a “step – action – compensation – state” table.

**3. Advanced level.** Create a tour system with a saga orchestrator implemented as a finite state machine and flight, hotel, excursion, and payment services: step timeouts, retryable and non-retryable errors, and the payment step as the point of no return, after which compensations are not performed and steps are only retried. Integration tests simulate the failure of each step, and a program `tour-chaos` with the options `--tours`, `--fail-step`, and `--help` prints a table of results and checks that there are no “half-booked” tours.

### Variant 15. A gym {#v15}

**1. Initial level.** Create membership and visit services behind a YARP gateway: a visit `POST /api/visits` checks with the membership service that the membership is valid.

**2. Basic level.** Create membership and visit services for a gym behind a YARP gateway with API versioning for memberships: `/v1/memberships` returns the expiration date, and `/v2/memberships` also returns the freeze days and the remaining visits; the gateway routes both versions, the old client continues to work, and the v1 response has a deprecation header.

**3. Advanced level.** Create a gym system with membership, visit, and payment services, where the `MembershipCreated` event has versions 1 and 2, and consumers read both (a tolerant reader, conversion of old events). A program `gym-compat` with the options `--old`, `--new`, and `--help` checks the compatibility of two versions of the contracts and prints a table of changes marked “compatible/incompatible”; integration tests check that the old client works.

### Variant 16. A repair service {#v16}

**1. Initial level.** Create request and technician services in an Aspire solution: `POST /requests` with a repair type assigns a free technician with the matching specialization or returns code 409.

**2. Basic level.** Create repair service components (technicians, spare parts) and a request orchestrator: assign a free technician with the matching specialization → reserve spare parts → confirm to the client; missing spare parts cancel the technician's assignment (compensation); `GET /requests/{id}` returns a log of the steps as a table.

**3. Advanced level.** Create a repair service with request (the orchestrator), technician, spare part, and billing services that exchange commands via RabbitMQ with an Outbox and an Inbox, with the trace of the whole request visible in the dashboard. A program `repair-sim` with the options `--requests`, `--masters`, and `--help` prints a “completed – cancelled – average time – technician utilization” table; integration tests check compensation.

### Variant 17. City transport {#v17}

**1. Initial level.** Create transport card and top-up services: `POST /topups` with a card number and an amount calls the card service and returns the new balance.

**2. Basic level.** Create a transport card service (balance, top-ups) and console validators that send rides as events via RabbitMQ; a charge is idempotent by ride ID, an insufficient balance publishes a rejection event, and a validator without a connection to the broker accumulates rides in a local buffer and sends them later.

**3. Advanced level.** Create a system with card, top-up, ride, and report services (a projection in PostgreSQL); a program `validator-sim` with the options `--validators`, `--minutes`, `--offline`, and `--help` simulates validators with periods without a connection, then reconciles the balances and prints a “rides – charged – rejections – duplicates discarded” table.

### Variant 18. An auction {#v18}

**1. Initial level.** Create lot and bid services behind a YARP gateway: a bid `POST /api/bids` checks with the lot service that the lot is open and returns the current highest bid.

**2. Basic level.** Create lot and bid services for an auction behind a YARP gateway with a background service that closes lots on schedule (an `AuctionClosed` event); a bid not higher than the current one or a bid on a closed lot is rejected with code 409, and concurrent bids are not lost (optimistic locking); `GET /api/lots/{id}` returns the bid history as a table.

**3. Advanced level.** Create an auction with lot, bid, payment, and notification services: a winner payment saga passes the lot to the next participant if the winner has not paid within the allotted time; events go through an Outbox and an Inbox. A program `auction-bots` with the options `--bots`, `--seconds`, and `--help` prints a table of lots with winners and checks that the winning bid is the highest; integration tests check nonpayment.

### Variant 19. A voting system {#v19}

**1. Initial level.** Create voter and voting services: `POST /votes` checks a voter's eligibility by calling the voter service and counts the vote for a candidate.

**2. Basic level.** Create voter, voting, counting, and audit services with idempotent votes: a repeated vote by the same voter and a redelivery of an event do not change the result; counting receives events via RabbitMQ, the audit service records every vote, and `GET /results` returns a “candidate – votes – percentage” table.

**3. Advanced level.** Create a voting system with voter, voting, counting, and audit services: the audit service stores records as a chain of SHA-256 hashes, and `GET /audit/verify` checks their integrity. A program `vote-chaos` with the options `--voters`, `--duplicates`, and `--help` sends votes with duplicates and restarts counting, and then compares the results of counting and the audit (a mismatch means exit code 1).

### Variant 20. An internet service provider {#v20}

**1. Initial level.** Create plan and subscriber services behind a YARP gateway: `GET /api/subscribers/{id}` returns a subscriber together with the plan's name and price obtained from the plan service.

**2. Basic level.** Create subscriber, billing, and access services for an internet service provider: the billing service charges a fee monthly (every minute in the test) and publishes `InvoiceOverdue` for unpaid invoices, the access service blocks such a subscriber, and a payment publishes `InvoicePaid` and unblocks them.

**3. Advanced level.** Create a provider system with plan, subscriber, billing, and access services, a plan change saga with recalculation and compensation, and an Outbox and an Inbox. A program `isp-sim` with the options `--months`, `--subscribers`, and `--help` simulates payments and prints a “month – charged – paid – blocked” table; integration tests check blocking and unblocking.

### Variant 21. A charity fund {#v21}

**1. Initial level.** Create fundraiser and donation services with RabbitMQ: a donation `POST /donations` publishes an event, upon which the fundraiser service increases the amount raised.

**2. Basic level.** Create donation and fundraiser services for a charity fund with RabbitMQ: a donation increases the fundraiser's amount raised; implement a Transactional Outbox in the donation service and an Inbox in the fundraiser service, and show that an event is delivered at least once and that a duplicate does not increase the amount; `GET /campaigns/{id}` returns the goal, the amount raised, and the completion percentage.

**3. Advanced level.** Create a fund with fundraiser, donation, report, and refund services: a fundraiser closes when the goal is reached, and any excess is returned to the donor (compensation). A program `charity-chaos` with the options `--donations`, `--restarts`, and `--help` restarts the consumer during processing and prints a “donations – events – duplicates discarded – amount matches” table; integration tests check closing a fundraiser.

### Variant 22. A coffee shop chain {#v22}

**1. Initial level.** Create menu and order services for a coffee shop chain in an Aspire solution: `POST /orders` gets drink prices from the menu service and returns the order total.

**2. Basic level.** Create menu, order, and bonus services for a coffee shop chain, where the call to the bonus service has a 500 ms timeout and two retries (`Microsoft.Extensions.Http.Resilience`); when bonuses are unavailable, the order is accepted without a discount and marked “bonuses will be credited later”, and a crediting command is put into a RabbitMQ queue and executed after the service recovers (graceful degradation instead of failure).

**3. Advanced level.** Create a coffee shop system with menu, order, bonus, stock, and recommendation services, where each optional feature (bonuses, recommendations, the stock check) is disabled by a feature flag in the configuration or automatically on failure, and the order response contains a list of the disabled features. A program `coffee-chaos` with the options `--scenario`, `--seconds`, and `--help` stops the services one by one and prints a “scenario – successful – degraded – errors – 95th-percentile latency” table; integration tests check that after recovery all postponed bonuses have been credited.

### Variant 23. A taxi service {#v23}

**1. Initial level.** Create ride and driver services: `POST /rides` with the passenger's coordinates calls the driver service and assigns the nearest free driver.

**2. Basic level.** Create taxi services: rides, drivers (assigning the nearest free driver), fare calculation with a gRPC interface, and a `RideCompleted` event via RabbitMQ; configure OpenTelemetry so that one ride is a single trace across HTTP, gRPC, and RabbitMQ, and add custom spans (`ActivitySource`) with driver and distance attributes.

**3. Advanced level.** Create a taxi service with ride, driver, fare, and billing services, custom metrics (a ride counter, a histogram of assignment time), and a deliberate delay in one of the services. A program `taxi-load` with the options `--rides`, `--tasks`, and `--help` generates load, and a report based on Aspire dashboard data identifies the slowest stage and contains a “stage – average time – share of the total” table.

### Variant 24. An electronic queue {#v24}

**1. Initial level.** Create ticket and service window services behind a YARP gateway: `POST /api/tickets` issues a numbered ticket, and `POST /api/windows/{id}/next` calls the next ticket.

**2. Basic level.** Create ticket and window services for an electronic queue with atomic calling of the next ticket (`FOR UPDATE SKIP LOCKED` in PostgreSQL) so that two windows do not get the same ticket; a call publishes an event for the display board, and `GET /api/stats` returns a “service – in queue – served – average wait” table.

**3. Advanced level.** Create a queue system with ticket, window, display board, and statistics services (a projection of events in Redis). A program `queue-sim` with the options `--clients`, `--windows`, and `--help` simulates visitors and windows and prints a table of waiting times for different numbers of windows; integration tests check that no ticket is called twice.

### Variant 25. An online pharmacy {#v25}

**1. Initial level.** Create drug catalog and prescription services behind a YARP gateway: `GET /api/drugs?name=` searches for drugs, and `GET /api/prescriptions/{id}` returns a prescription.

**2. Basic level.** Create an order service that validates the input data (quantity, address) and allows prescription drugs only with a valid prescription from the prescription service; errors are returned as `ValidationProblemDetails`, and each service publishes an OpenAPI document.

**3. Advanced level.** Create a pharmacy with catalog, prescription, order, and delivery services and a “reserve → payment → delivery” saga. A program `contract-check` with the options `--old`, `--new`, and `--help` compares two OpenAPI documents, prints a table of changes marked “compatible/incompatible”, and returns code 1 for incompatible changes; contract tests check the event schemas.

### Variant 26. Sporting events {#v26}

**1. Initial level.** Create event and ticket services behind a YARP gateway: `POST /api/tickets` checks with the event service that seats are available and sells a ticket.

**2. Basic level.** Create event and ticket sales services behind a YARP gateway and a payment service with a configurable delay and failure rate, calls to which have retries and a circuit breaker; changes in the circuit breaker state (open, half-open, closed) are written to the log, and when the circuit breaker is open, a sale immediately returns code 503.

**3. Advanced level.** Create a ticket sales system with rate limiting in the gateway, isolation (bulkhead) of payment calls, and a waiting queue for buyers. A program `ticket-storm` with the options `--buyers`, `--seconds`, and `--help` simulates the start of sales and prints a “second – requests – sold – 429 – 503 – 95th-percentile latency” table; integration tests check that no more tickets are sold than there are seats.

### Variant 27. A veterinary clinic {#v27}

**1. Initial level.** Create owner-and-pet and appointment services in an Aspire solution: an appointment checks that the pet exists and returns an appointment number.

**2. Basic level.** Create veterinary clinic services (pets, appointments, vaccinations, reminders): after a visit, a `VaccinationDone` event records the vaccination and calculates the date of the next one, and the reminder service writes reminders to the log; `GET /pets/{id}/card` returns the pet's card with vaccinations as a table.

**3. Advanced level.** Create a clinic with owner, appointment, vaccination, and reminder services with an Outbox and an Inbox and `/health` and `/alive` health checks for each service. A program `vet-sim` with the options `--pets`, `--days`, and `--help` simulates visits and prints a table of reminders by day; integration tests check the reminders.

### Variant 28. A coworking space {#v28}

**1. Initial level.** Create meeting room and member services for a coworking space: `POST /meetings` for a room and an hour checks that the member has a valid membership and that the room is free, and returns a meeting number.

**2. Basic level.** Create room, member (a package of hours), and meeting services for a coworking space with event choreography: `MeetingRequested` → `RoomHeld` → `HoursDebited` → `MeetingConfirmed`; an insufficient balance of hours publishes `HoursRejected`, after which the room is released; `GET /meetings/{id}` returns the chain of received events with their times.

**3. Advanced level.** Create a coworking space with room, member, meeting, and access services (issuing a six-digit door code for the time of the meeting and revoking it after cancellation) with an Outbox and an Inbox; cancelling a meeting an hour before it starts returns the hours, later cancellation does not. A program `cowork-load` with the options `--members`, `--meetings`, and `--help` prints a “meetings – confirmed – rejected – stuck” table (the number stuck must be 0); integration tests check the return of hours and the revocation of the code.

### Variant 29. Migrating a monolith {#v29}

**1. Initial level.** Create an ASP.NET Core monolith with order and report modules and a YARP gateway in front of it that passes all requests to the monolith; check that the client works through the gateway without changes.

**2. Basic level.** Create an ASP.NET Core monolith with order and report modules behind a YARP gateway and extract the report module into a separate service with its own PostgreSQL database: the monolith publishes order changes through an Outbox, the report service builds its data from events, and the gateway routes `/reports` to the new service (the strangler fig pattern); compare the responses of the old and new reports.

**3. Advanced level.** Create an ASP.NET Core monolith with orders and reports, a separate report service (data from the monolith's events), and a YARP gateway that routes 10, 50, and 100% of report requests to the new service and, in shadow mode, sends a copy of the request to both systems. A program `strangler-check` with the options `--url`, `--requests`, and `--help` compares the responses and prints a “share – requests – discrepancies – latency” table; show a rollback to the monolith by changing the gateway configuration.

### Variant 30. Chaos testing {#v30}

**1. Initial level.** Create two services behind a YARP gateway in an Aspire solution with `/health` and `/alive` health checks; stop one service in the dashboard and show the change in its state and in the gateway's responses.

**2. Basic level.** Create two services behind a YARP gateway in an Aspire solution with retries, timeouts, and a circuit breaker between them, and a console program that calls the gateway every second and, while a service container is stopped (`docker stop`), prints the number of successful and failed requests and the recovery time after it starts.

**3. Advanced level.** Create a program `chaos-runner` with the options `--scenario kill|latency|broker-down`, `--seconds`, and `--help` that injects failures into a system of three services and RabbitMQ (stopping a container, a delay through middleware, stopping the broker) and prints a “scenario – availability, % – recovery time – errors – 95th-percentile latency” table; violating the 99% availability target produces exit code 1.

## Procedure

1. Study the theory and worked examples.
2. Check the tools: `dotnet --version` (.NET SDK 10), `aspire --version`, and `docker version`; start Docker Desktop.
3. For your variant, perform the decomposition: identify the bounded contexts and services, the data of each service, the synchronous calls and events, and the saga steps and compensating actions; draw a diagram (services, databases, broker, gateway).
4. Create an Aspire solution in JetBrains Rider (AppHost, ServiceDefaults, and the services), and implement the services, the YARP gateway, and event exchange via RabbitMQ; each service has its own database or store.
5. Check the main scenario and failure scenarios: a business rule rejection (compensation), stopping a service or the broker (`aspire resource … stop`, `docker stop`), repeated requests, and duplicate messages; in the Aspire dashboard, find the trace of the scenario and count the spans.
6. Measure the indicators (latency, the share of successful responses, recovery time) and summarize them in a table; for the advanced level, write an integration test with `Aspire.Hosting.Testing`.
7. After the work, stop the application (`aspire stop`) and make sure the containers have been removed (`docker ps -a`).
8. Demonstrate the work to the instructor, explain the architecture, code, and results, and answer the review questions.
