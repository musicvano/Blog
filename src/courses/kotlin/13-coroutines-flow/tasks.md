---
title: "Tasks"
description: "Topic 13. Coroutines and Flow: task variants"
outline: [2, 3]
sourceHash: "66c9b8066b39047dbbe49d25baa4925ad72e2db60117589013dbb20ef6e1f184"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Parallel download {#v1}

**1. Initial level.** Create a Kotlin console program "Parallel download": a simulation of downloading files with progress. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Parallel download": a simulation of downloading files with progress. Read, for two source servers, lists of files (name and size in MB) and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Parallel download": a simulation of downloading files with progress. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 2. Temperature sensors {#v2}

**1. Initial level.** Create a Kotlin console program "Temperature sensors": a `Flow` of readings and a moving average. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Temperature sensors": a `Flow` of readings and a moving average. Read, for two sensors, the initial temperature and its step of change, and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Temperature sensors": a `Flow` of readings and a moving average. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 3. Restaurant kitchen {#v3}

**1. Initial level.** Create a Kotlin console program "Restaurant kitchen": coroutine cooks process a queue of orders. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Restaurant kitchen": coroutine cooks process a queue of orders. Read, for two cooks, lists of orders (dish and cooking time) and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Restaurant kitchen": coroutine cooks process a queue of orders. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 4. Airport display board {#v4}

**1. Initial level.** Create a Kotlin console program "Airport display board": flight status updates via `Flow`. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Airport display board": flight status updates via `Flow`. Read, for two update sources, lists of flights (number and status) and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Airport display board": flight status updates via `Flow`. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 5. Crawler simulator {#v5}

**1. Initial level.** Create a Kotlin console program "Crawler simulator": limiting parallelism with a `Semaphore`. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Crawler simulator": limiting parallelism with a `Semaphore`. Read, for two crawlers, lists of fictitious page addresses and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Crawler simulator": limiting parallelism with a `Semaphore`. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 6. Pomodoro timer {#v6}

**1. Initial level.** Create a Kotlin console program "Pomodoro timer": a countdown with pause and cancellation. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Pomodoro timer": a countdown with pause and cancellation. Read, for two timers, the durations of the work interval and the break, and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Pomodoro timer": a countdown with pause and cancellation. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 7. Prime number search {#v7}

**1. Initial level.** Create a Kotlin console program "Prime number search": parallel search in ranges. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Prime number search": parallel search in ranges. Read two ranges of numbers to search for primes and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Prime number search": parallel search in ranges. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 8. Car wash {#v8}

**1. Initial level.** Create a Kotlin console program "Car wash": serving cars with several bays. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Car wash": serving cars with several bays. Read, for two bays, lists of cars (plate number and wash duration) and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Car wash": serving cars with several bays. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 9. Chat room {#v9}

**1. Initial level.** Create a Kotlin console program "Chat room": a `SharedFlow` of messages for subscribers. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Chat room": a `SharedFlow` of messages for subscribers. Read, for two chat participants, lists of messages and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Chat room": a `SharedFlow` of messages for subscribers. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 10. Weather aggregator {#v10}

**1. Initial level.** Create a Kotlin console program "Weather aggregator": `async` requests to sources with timeouts. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Weather aggregator": `async` requests to sources with timeouts. Read, for two weather sources, nominal temperatures and response delays, and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Weather aggregator": `async` requests to sources with timeouts. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 11. Match broadcast {#v11}

**1. Initial level.** Create a Kotlin console program "Match broadcast": a stream of events, filtering, and `combine` for the score. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Match broadcast": a stream of events, filtering, and `combine` for the score. Read, for two teams, lists of match events (minute and event type) and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Match broadcast": a stream of events, filtering, and `combine` for the score. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 12. File compression {#v12}

**1. Initial level.** Create a Kotlin console program "File compression": parallel processing on `Dispatchers.IO`. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "File compression": parallel processing on `Dispatchers.IO`. Read, for two processors, lists of fictitious files (name and size) and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "File compression": parallel processing on `Dispatchers.IO`. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 13. ATM network {#v13}

**1. Initial level.** Create a Kotlin console program "ATM network": a shared account and a `Mutex`. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "ATM network": a shared account and a `Mutex`. Read the initial balance of the shared account, lists of withdrawal and deposit amounts for two ATMs, and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "ATM network": a shared account and a `Mutex`. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 14. Intersection {#v14}

**1. Initial level.** Create a Kotlin console program "Intersection": coordinating traffic lights with coroutines. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Intersection": coordinating traffic lights with coroutines. Read, for two traffic lights, the phase durations and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Intersection": coordinating traffic lights with coroutines. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 15. Courier tracker {#v15}

**1. Initial level.** Create a Kotlin console program "Courier tracker": a `StateFlow` of position and arrival time. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Courier tracker": a `StateFlow` of position and arrival time. Read, for two couriers, routes as lists of points and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Courier tracker": a `StateFlow` of position and arrival time. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 16. Word counter {#v16}

**1. Initial level.** Create a Kotlin console program "Word counter": parallel processing of text files. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Word counter": parallel processing of text files. Read two sets of text lines as fictitious files and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Word counter": parallel processing of text files. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 17. Snail race {#v17}

**1. Initial level.** Create a Kotlin console program "Snail race": a simulation with random delays. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Snail race": a simulation with random delays. Read, for two snails, names and base speeds, a seed for the random delays, and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Snail race": a simulation with random delays. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 18. Ticket sales {#v18}

**1. Initial level.** Create a Kotlin console program "Ticket sales": concurrent bookings and state protection. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Ticket sales": concurrent bookings and state protection. Read the number of seats, lists of booking requests for two ticket offices, and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Ticket sales": concurrent bookings and state protection. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 19. Server monitoring {#v19}

**1. Initial level.** Create a Kotlin console program "Server monitoring": periodic checks in a `supervisorScope`. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Server monitoring": periodic checks in a `supervisorScope`. Read, for two groups, lists of fictitious servers with response times and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Server monitoring": periodic checks in a `supervisorScope`. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 20. Fitness band {#v20}

**1. Initial level.** Create a Kotlin console program "Fitness band": a heart rate stream, `conflate`, and warnings. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Fitness band": a heart rate stream, `conflate`, and warnings. Read, for two bands, sequences of heart rate values and a warning threshold, and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Fitness band": a heart rate stream, `conflate`, and warnings. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 21. Autocomplete {#v21}

**1. Initial level.** Create a Kotlin console program "Autocomplete": `debounce` and cancellation of stale requests. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Autocomplete": `debounce` and cancellation of stale requests. Read a dictionary of words for suggestions, sequences of typed prefixes for two users, and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Autocomplete": `debounce` and cancellation of stale requests. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 22. Production line {#v22}

**1. Initial level.** Create a Kotlin console program "Production line": a pipeline of stages via a `Channel`. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Production line": a pipeline of stages via a `Channel`. Read, for two lines, lists of products with stage durations and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Production line": a pipeline of stages via a `Channel`. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 23. Online auction {#v23}

**1. Initial level.** Create a Kotlin console program "Online auction": participants' bids and a `StateFlow` of the leader. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Online auction": participants' bids and a `StateFlow` of the leader. Read the lot's starting price, lists of bids for two participants, and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Online auction": participants' bids and a `StateFlow` of the leader. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 24. Weather station network {#v24}

**1. Initial level.** Create a Kotlin console program "Weather station network": `combine` of the flows of several stations. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Weather station network": `combine` of the flows of several stations. Read, for two weather stations, sequences of readings (temperature and humidity) and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Weather station network": `combine` of the flows of several stations. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 25. Reliable download {#v25}

**1. Initial level.** Create a Kotlin console program "Reliable download": `retry` with exponential backoff. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Reliable download": `retry` with exponential backoff. Read, for two sources, lists of fictitious files with the number of failed attempts before success, and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Reliable download": `retry` with exponential backoff. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 26. Museum visitors {#v26}

**1. Initial level.** Create a Kotlin console program "Museum visitors": entries and exits, and a `StateFlow` of occupancy. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Museum visitors": entries and exits, and a `StateFlow` of occupancy. Read the museum's capacity, sequences of visitor entries and exits for two entrances, and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Museum visitors": entries and exits, and a `StateFlow` of occupancy. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 27. Smart greenhouse {#v27}

**1. Initial level.** Create a Kotlin console program "Smart greenhouse": sensors, watering rules, and `Flow`. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Smart greenhouse": sensors, watering rules, and `Flow`. Read, for two sensors, soil moisture readings, a watering threshold, and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Smart greenhouse": sensors, watering rules, and `Flow`. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 28. Monte Carlo π {#v28}

**1. Initial level.** Create a Kotlin console program "Monte Carlo π": parallel `async` and a timing comparison. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Monte Carlo π": parallel `async` and a timing comparison. Read, for two calculators, the number of random points and a seed, and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Monte Carlo π": parallel `async` and a timing comparison. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 29. Administrative services center queue {#v29}

**1. Initial level.** Create a Kotlin console program "Administrative services center queue": tickets and operator windows. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Administrative services center queue": tickets and operator windows. Read, for two windows, lists of tickets (number and service duration) and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Administrative services center queue": tickets and operator windows. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

### Variant 30. Reminders {#v30}

**1. Initial level.** Create a Kotlin console program "Reminders": an event scheduler with cancellation. The user enters a number of events from 1 to 100 and a delay from 1 to 1000 ms. Generate labeled events with sequential numbers in a suspend function, and print the result of each and the number of completed ones; reject invalid numbers.

**2. Basic level.** Create a Kotlin console program "Reminders": an event scheduler with cancellation. Read, for two sources, lists of reminders (text and delay) and the number of simulation steps. Launch two producers in a structured scope, collect the results into a Flow, and print separate totals per source. Provide for a timeout, cancellation of children, and a check for an empty set; no result may be lost due to a race.

**3. Advanced level.** Create a standalone Kotlin program "Reminders": an event scheduler with cancellation. Accept `--sources=name:steps,...`, `--workers`, `--timeout-ms`, and `--help`; with no arguments, ask for the data from the keyboard. Limit concurrent work, protect shared state, and cancel all child tasks after a timeout. Print an aligned table of sources, completed and canceled steps, and totals; errors go to stderr, with codes 0/2/1 for success, input errors, and failure. Add runTest tests for success, cancellation, and the failure of one source, and document the supervision policy.

## Procedure

1. Explain where the task waits and where it performs computations.
2. Define the owner of the coroutines, the cancellation boundary, and the error policy.
3. Implement the domain functions separately from reading and output.
4. Test success, invalid data, a timeout, and cancellation.
5. For shared state, check the invariant after concurrent actions.
6. Demonstrate the tests and explain real and virtual time.
