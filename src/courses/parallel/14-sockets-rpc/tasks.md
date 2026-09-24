---
title: "Tasks"
description: "Topic 14. Sockets, RPC, and gRPC: task variants"
outline: [2, 3]
sourceHash: "9d8f30a390a928af4fa5df79b4d8dc26a49debf8fc81f61290508664bde1cc1e"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. A network chat {#v1}

**1. Initial level.** Create a TCP server console program that accepts several clients at once (a task per connection) and broadcasts every received line to all other clients, and a client program that sends lines typed on the keyboard and prints the received ones.

**2. Basic level.** Create a TCP chat server and client with “length (4 bytes) + JSON” framing (`{"user", "text", "time"}`). The server checks that names are unique, prints a connection log, and correctly handles client disconnection and connection loss (`IOException`) without stopping other sessions.

**3. Advanced level.** Create a TCP chat application `chat` with the commands `server --port N` and `client --host H --port N --name name` and the `--help` option: the server broadcasts messages to the clients in the same room. The server supports rooms (`/join`, `/rooms`, `/quit`), keeps a `Channel<T>` queue for each client, and disconnects clients without a heartbeat for 15 s. The `client --bots 100` mode measures messages per second; errors go to the error stream, with exit codes 0/1/2.

### Variant 2. File transfer {#v2}

**1. Initial level.** Create a TCP server that receives a file (name, size, contents) and saves it to the `inbox` folder, and a client that sends a file whose path is typed on the keyboard and prints the number of bytes transferred.

**2. Basic level.** Create a file transfer client and server with a SHA-256 hash: the client prints progress in percent and the speed (MB/s), and the server checks the hash and replies “OK” or “ERROR,” deleting a corrupted file. An invalid path and an unreachable server are handled with messages.

**3. Advanced level.** Create a TCP file transfer application `ftx` with the commands `serve folder` (receive files into a folder) and `send file --host H` and the options `--resume`, `--chunk KB`, and `--help`. After a connection loss, the client asks the server for the size of the part already received and resumes the file, and the SHA-256 hash is checked for the whole file. The program measures the speed for 4, 64, and 1024 KB blocks and prints a table; exit codes: 0, 1 – arguments, 2 – network, 3 – hash mismatch.

### Variant 3. A time server {#v3}

**1. Initial level.** Create a UDP server that replies to each datagram with the current UTC time in ISO 8601 format, and a client that sends 5 requests and prints the received time and the latency in milliseconds.

**2. Basic level.** Create a UDP time client and server with numbered requests: the client sends 20 requests with a 500 ms timeout, repeats lost ones, discards stale responses, computes the delay with the formula $d = (t_{4} - t_{1}) - (t_{3} - t_{2})$ and the clock offset, and prints a table, the minimum, the median, and the number of losses.

**3. Advanced level.** Create a UDP time synchronization application `timesync` with the commands `server --port N --loss P` (the server replies with the current UTC time, simulating the loss of P % of datagrams) and `client --host H --count N --interval ms --help`. The client numbers the requests, repeats lost ones, computes the delay $d = (t_{4} - t_{1}) - (t_{3} - t_{2})$, estimates the clock offset from the samples with the smallest delay, prints a table and a summary, and writes a CSV file.

### Variant 4. An online quiz {#v4}

**1. Initial level.** Create a TCP quiz server that sends a client 5 questions from a file (one line each) and counts the correct answers, and a client that answers from the keyboard and receives the final score.

**2. Basic level.** Create a TCP quiz server for several players at once: questions are sent to everyone simultaneously, there are 10 s to answer (a `CancellationTokenSource` timeout), and points are awarded for speed. After each question, a results table is sent to everyone.

**3. Advanced level.** Create a TCP quiz application `quiz` with the commands `host file.json --port N --players K` (a server with questions from a file) and `join --host H --name name` (a player answers from the keyboard), and the `--help` option. The server waits for K players, runs rounds with a timer (points for correctness and speed), sends a results table after each question, handles reconnection with the same name, and saves the results to JSON.

### Variant 5. A remote matrix calculator {#v5}

**1. Initial level.** Create a gRPC service with a unary method `Multiply` that takes two matrices (`repeated double` and dimensions) and returns their product, and a console client that multiplies two 3×3 matrices entered from the keyboard.

**2. Basic level.** Create a gRPC matrix service with the methods `Multiply`, `Inverse`, and `Determinant`: the service returns `InvalidArgument` for incompatible dimensions and `FailedPrecondition` for a singular matrix; the client sets a 2 s deadline and prints the status code and message.

**3. Advanced level.** Create a gRPC service with a `Multiply` method that returns the product of two matrices, and a `matrix-client` application with the options `--server`, `--size n`, `--deadline ms`, `--parallel K`, and `--help`. The client generates $n \times n$ matrices with a fixed seed, sends K simultaneous calls through a single `GrpcChannel`, verifies the results by local multiplication, and prints a “K – calls/s – speedup” table for K = 1, 2, 4, 8, 16.

### Variant 6. A key–value store {#v6}

**1. Initial level.** Create a TCP store server with the text commands `SET key value`, `GET key`, and `DEL key` (one per line), and a client that sends commands from the keyboard and prints the responses.

**2. Basic level.** Create a key–value server with a custom binary protocol (`BinaryWriter`: command code, key, value) and a `ConcurrentDictionary`. Several clients work at the same time; the server replies with the codes OK, NOT\_FOUND, and ERROR and prints command statistics.

**3. Advanced level.** Create a TCP key–value store `kv` with the commands `server --port N --data file` and `bench --host H --clients K --ops N` and the `--help` option. The server serves several clients at once with the commands `SET`, `GET`, `DEL`, and an atomic `INCR`, saves the data to a file on shutdown, and restores it on startup. The `bench` mode measures operations per second for K = 1…32 and checks that after K·N increments the counter is correct.

### Variant 7. Stock quotes {#v7}

**1. Initial level.** Create a gRPC service with a server stream `Subscribe(ticker)` that sends a random price for the ticker every second, and a client that prints 10 quotes for a ticker entered from the keyboard.

**2. Basic level.** Create a gRPC quote service with a subscription to several tickers at once (`repeated string`): the server sends only changes above 0.5 %, and the client prints a table of the latest prices and cancels the subscription with the Esc key; an unknown ticker gives `NotFound`.

**3. Advanced level.** Create a gRPC quote service with a server stream for subscribing to tickers (the server sends random prices every second) and a `quotes` client with the options `--server`, `--tickers A,B,C`, `--duration s`, `--clients K`, and `--help`. The client prints the minimum, maximum, and average price of each ticker and, after the stream breaks, reconnects with exponential backoff (up to 5 attempts); the server’s ability to serve 100 simultaneous subscriptions is checked with the `--clients 100` mode.

### Variant 8. Vehicle telemetry {#v8}

**1. Initial level.** Create a gRPC service with a client stream `Upload(stream Reading)` (speed, coordinates, time) that returns the number of records received and the average speed, and a client that sends 100 simulated records.

**2. Basic level.** Create a gRPC telemetry service that, for each vehicle (the identifier is in the metadata), computes the mileage and the maximum and average speed; the client reads records from a CSV file and streams them, skipping invalid lines with a message.

**3. Advanced level.** Create a `telemetry` application with a gRPC vehicle telemetry service: a client stream of records (vehicle ID, speed, coordinates, time), the commands `server` and `simulate --cars K --points N`, and the `--help` option. K simulated vehicles stream at the same time; the server aggregates the mileage and the maximum and average speed in a thread-safe way and returns a table on a `Report` call; the client measures the transfer time for K = 1, 4, 16, 64 and checks the record totals.

### Variant 9. Distributed Monte Carlo workers {#v9}

**1. Initial level.** Create a gRPC worker service with a method `EstimatePi(points, seed)` that counts the points inside a circle, and a coordinator client that calls it 4 times with different seeds and prints an estimate of π.

**2. Basic level.** Create a gRPC worker service with a method `EstimatePi(points, seed)` (the number of random points inside a circle) and a coordinator that distributes 10^8 points among several workers (addresses from a file) with simultaneous calls with a deadline, retries a call on another worker on `Unavailable`, and prints the estimate of π, the error, and the time.

**3. Advanced level.** Create an `mc` application for estimating π with the Monte Carlo method on gRPC workers, with the commands `worker --port N` (the `EstimatePi(points, seed)` method counts the points inside a circle) and `coordinate --workers file --points N --chunks K --help`. The coordinator divides the points into K parts, balances them by the workers’ response speed, and prints the estimate of π, the error, and a speedup table for 1, 2, and 4 workers.

### Variant 10. Reserving library books {#v10}

**1. Initial level.** Create a gRPC library service with the unary methods `ListBooks` and `Reserve(bookId, reader)` and a client that prints the list of books and reserves a book whose number is entered from the keyboard.

**2. Basic level.** Create a gRPC reservation service in which each book has a limited number of copies: simultaneous reservations are synchronized, a repeated reservation returns `AlreadyExists`, and no available copies gives `ResourceExhausted`. The client starts 20 simultaneous reservations and prints a summary.

**3. Advanced level.** Create a gRPC service for reserving library books (a limited number of copies) and a `library` application with the commands `server --data books.json` and `client reserve|return|list` and the options `--reader`, `--request-id`, and `--help`. Operations are idempotent by request identifier (a repeat does not create a second reservation), and the state is saved to a file; a test mode sends each request twice and checks the remaining copies.

### Variant 11. Tic-tac-toe {#v11}

**1. Initial level.** Create a TCP server that plays tic-tac-toe with a client (the server moves to a random free cell), and a client that enters moves from the keyboard and prints the board after each move.

**2. Basic level.** Create a gRPC game service for two players with a bidirectional stream `Play`: the server pairs players up, checks the validity and order of moves, and sends both players the board state and the result of the game.

**3. Advanced level.** Create a networked tic-tac-toe game `ttt` (gRPC, a bidirectional stream of moves) with the commands `server` and `play --name name --bot` and the `--help` option. The server pairs players, checks moves, runs several games at once, handles a player’s disconnection (a loss after 30 s), and saves a rating to a file; the `--bot` mode runs 50 bot games and prints win statistics and the average move time.

### Variant 12. Server monitoring {#v12}

**1. Initial level.** Create an agent program that sends a UDP heartbeat with the node name every second, and a monitor program that prints the time of the last heartbeat of each node.

**2. Basic level.** Create a UDP monitor that marks a node as “unavailable” if there have been no heartbeats for more than 3 s, and as “available again” after it recovers; agents send the processor and memory load, and the monitor updates a table every 2 s.

**3. Advanced level.** Create a node monitoring application with UDP heartbeats `monitor` with the commands `agent --name --interval ms --loss P` (sends numbered heartbeats, simulating P % loss) and `watch --timeout ms --log file` and the `--help` option. The monitor detects failures after N missed heartbeats, counts packet losses by number, writes an event log in CSV, and prints the availability of each node in percent.

### Variant 13. A weather forecast {#v13}

**1. Initial level.** Create a gRPC service with a unary method `GetForecast(city)` that returns a simulated 3-day forecast, and a client that prints the forecast for a city entered from the keyboard.

**2. Basic level.** Create a gRPC forecast service with a 60 s cache: a slow “source” is simulated with a 2 s delay, the client passes `client-id` in the metadata, and the server counts each client’s requests; the client prints the call time with and without the cache.

**3. Advanced level.** Create a gRPC weather forecast service `GetForecast(city)` with a cache (a slow source is simulated with a delay) and a `weather` client with the options `--server`, `--cities file`, `--parallel K`, `--deadline ms`, and `--help`. The server avoids simultaneous repeated requests to the source for the same city (one task per city), and the client prints a “city – time – from cache” table, the number of `DeadlineExceeded` errors, and the throughput for K = 1…16.

### Variant 14. A school grade book {#v14}

**1. Initial level.** Create a gRPC grade book service with the methods `AddGrade(student, subject, grade)` and `GetGrades(student)` and a client that adds 3 grades and prints a student’s grades.

**2. Basic level.** Create a gRPC grade book service with a client stream `UploadGrades` that accepts grades from a CSV file, checks the range 1–12, and returns the number of accepted and rejected records with line numbers; the `GetAverage` method returns the average grade for a subject.

**3. Advanced level.** Create a gRPC school grade book service and a `journal` application with the commands `server --data file`, `upload file.csv` (a client stream of grades, checking 1–12), and `report --class 10-A` and the `--help` option. The server saves the data to a file and supports simultaneous uploads from several teachers, and the report is returned as a server stream; the client prints a table of average grades and saves it to CSV.

### Variant 15. Video surveillance (simulated frames) {#v15}

**1. Initial level.** Create a TCP “camera” client that sends 100 frames of 50 KB each (random bytes with a length prefix), and a server that receives the frames and prints their count and total size.

**2. Basic level.** Create a TCP server that receives frames from several cameras at once, computes frames per second and throughput (MB/s) for each camera, and prints a table every second; a camera sets its frame rate and frame size.

**3. Advanced level.** Create a `cams` application with the commands `server` and `camera --id --fps --size KB --count` and the `--help` option: simulated cameras send frames (random bytes with a length prefix) to a TCP server. The server keeps only the latest frames of each camera (a ring buffer), drops frames for slow consumers, measures the throughput for 1, 4, and 16 cameras, and prints a table with the percentage of dropped frames.

### Variant 16. Searching a product catalog {#v16}

**1. Initial level.** Create a gRPC service with a method `Search(query)` that returns the products from a JSON file whose name contains a string, and a client that prints the products found.

**2. Basic level.** Create a gRPC search service with pagination (`page_size`, `page_token`) and sorting by price; the client prints pages one at a time when Enter is pressed and checks an invalid page token (`InvalidArgument`).

**3. Advanced level.** Create a gRPC service for searching products by name in a catalog from a JSON file and a `catalog` client with the options `--server`, `--query`, `--min-price`, `--max-price`, `--stream`, and `--help`. The server returns large results as a server stream and stops working on cancellation (the call token); the client cancels the search with the Esc key and prints the number of products received and the time to the first result.

### Variant 17. A visitor counter {#v17}

**1. Initial level.** Create a gRPC service with the methods `Visit(page)` and `GetCount(page)` and a client that registers 10 visits and prints the counter.

**2. Basic level.** Create a gRPC counter service in which `Visit` takes a request identifier: repeats with the same identifier do not increase the counter. The client simulates lost responses by repeating each call up to 3 times and checks that the counter equals the number of visits.

**3. Advanced level.** Create a gRPC page visit counter service with an idempotent `Visit` (request identifier) and a `visits` client with the options `--server`, `--clients K`, `--visits N`, `--duplicate P` (the share of repeated calls), and `--help`. The server stores executed identifiers with an expiration time; the client performs K×N visits in parallel and checks the counter (exit code 3 on a mismatch).

### Variant 18. Multicast announcements {#v18}

**1. Initial level.** Create a program that sends a line typed on the keyboard to the multicast address `239.0.0.222` (port 5060), and a receiver program that joins the group and prints the announcements with the sender’s address.

**2. Basic level.** Create a multicast broadcast with numbered datagrams: the receiver detects missing and duplicate numbers and prints loss statistics, and the sender sends a given number of announcements at a given interval.

**3. Advanced level.** Create an `mcast` application with the commands `send --group --port --count --interval --size` and `listen --group --port --report s` and the `--help` option. The receiver prints a table every second “sender – received – lost – out of order,” checks the datagram size (an error above 65,507 bytes), and uses exit codes 0/1/2.

### Variant 19. Distributed sorting {#v19}

**1. Initial level.** Create a TCP sorter server that receives an array of integers (count and values) and returns it sorted, and a client that sends 1000 random numbers and checks the result.

**2. Basic level.** Create a TCP sorter server that receives an array of integers and returns it sorted, and a coordinator that divides an array of 10^6 random numbers into parts, sends them to several sorters at once (addresses from the arguments), merges the sorted parts, verifies the result by comparing it with `Array.Sort`, and prints the time of each stage.

**3. Advanced level.** Create a distributed sorting application `dsort` with the commands `worker --port` (a TCP server sorts the received part) and `sort --input file --workers H1,H2 --help` (the coordinator divides the numbers from a file among workers and merges the results). Data is transferred in binary frames, and if a worker fails, its part is handed to another; the coordinator prints a “workers – time, s – speedup” table for 1, 2, and 4 workers and saves the result to a file.

### Variant 20. Patient vital signs {#v20}

**1. Initial level.** Create a gRPC service with the methods `AddMeasurement(patient, pulse, pressure)` and `GetLast(patient)` and a client that adds measurements from the keyboard and prints the latest ones.

**2. Basic level.** Create a gRPC patient vital signs service (`AddMeasurement(patient, pulse, pressure)`, `GetLast(patient)`) with a server interceptor that logs the method, duration, and status code of each call and checks a token in the `authorization` metadata; calls without a token get `Unauthenticated`. The client adds measurements and prints the latest ones.

**3. Advanced level.** Create a gRPC patient vital signs service (pulse, blood pressure) and a `health` application with the commands `server --tokens file` and `client --token --patient` and the `--help` option. The server checks the token in the metadata, and a server stream `Watch` sends alerts when the pulse goes out of range; a client interceptor adds the token and retries calls with the `Unavailable` code. A call log is written to a file, and an invalid token gives exit code 4.

### Variant 21. A taxi dispatcher {#v21}

**1. Initial level.** Create a gRPC service with the methods `UpdatePosition(driver, x, y)` and `FindNearest(x, y)` and a client that registers three drivers and finds the one nearest to an entered point.

**2. Basic level.** Create a gRPC dispatcher service with a bidirectional stream: drivers send positions every second, and the server sends orders to a driver; a dispatcher client creates an order, which is received by the nearest free driver.

**3. Advanced level.** Create a gRPC taxi dispatcher service and a `taxi` application with the commands `server`, `drivers --count K` (simulating driver movement with position updates), and `orders --count N` and the `--help` option. The server stores positions in a thread-safe way, assigns orders to the nearest free driver, detects drivers with no updates for more than 5 s, and prints the average assignment time and the number of updates processed per second for K = 10, 100, 1000.

### Variant 22. An office access control system {#v22}

**1. Initial level.** Create a TCP “turnstile” client that sends a pass event (card number, direction, time), and a server that appends events to a log file and replies “allowed” or “denied” based on a list of cards.

**2. Basic level.** Create a TCP access control server for several turnstiles at once: the server checks the card and a repeated entry without an exit, writes the log in a thread-safe way, and returns the list of employees in the building on the `REPORT` command.

**3. Advanced level.** Create a TCP office access control system `access` with the commands `server --cards file --log file` (checks cards, writes a log of passes) and `gate --id --events file` (a turnstile sends “card, direction, time” events from a file) and the `--help` option. The turnstile buffers events while the server is unavailable and sends them after it recovers without duplicates; the server prints a report of employees’ working hours.

### Variant 23. Comparing protocols {#v23}

**1. Initial level.** Create a program that measures the time of 10,000 sequential “echo” requests to a TCP server in the same process and prints the average latency and the number of requests per second.

**2. Basic level.** Create a program that compares an “add two numbers” call through a TCP socket with JSON frames and through gRPC on `localhost`: warmup, 10,000 calls, the median, the 99th percentile, and the throughput; the results are printed as a table.

**3. Advanced level.** Create an `rpcbench` application that compares remote “echo” call protocols (server and client in one process on `localhost`) with the options `--protocols tcp,grpc,rest`, `--size bytes`, `--clients K`, `--duration s`, and `--help`. For each protocol and message size (10 B, 1 KB, 100 KB), the latency (median, 99th percentile) and the throughput are measured; the results are printed as a table and saved to CSV.

### Variant 24. A real-time auction {#v24}

**1. Initial level.** Create a gRPC auction service with a method `PlaceBid(lot, user, amount)` that accepts only a bid higher than the current one, and a client that places bids from the keyboard.

**2. Basic level.** Create a gRPC auction service with a server stream `WatchLot` that sends participants new bids and notifications that a lot has closed on a timer; simultaneous bids are synchronized, and rejected bids return `FailedPrecondition`.

**3. Advanced level.** Create a gRPC auction service (bids on lots, a server stream of new bids) and an `auction` application with the commands `server --lots file` and `bot --user --budget --strategy` and the `--help` option. The server accepts only higher bids and extends a lot by 10 s after a late bid; 50 bots bid at the same time, and after completion a “lot – winner – price – number of bids” table is printed and it is checked that no bid was lost.

### Variant 25. A cloud notepad {#v25}

**1. Initial level.** Create a gRPC notes service with the methods `Save(id, text)` and `Load(id)` and a client that saves and loads a note whose text is typed on the keyboard.

**2. Basic level.** Create a gRPC notes service with a version number: `Save` takes the expected version and returns `Aborted` if another client has modified the note; on a conflict, the client loads the new version and shows both texts.

**3. Advanced level.** Create a gRPC notes service with versions (saving with the expected version) and a `notes` application with the commands `server --data folder`, `edit id`, and `sync folder` and the `--help` option. Synchronization compares the versions of the local files and the server, conflicts are saved as separate files, and a server stream `Changes` notifies clients of changes; a table of synchronized, downloaded, and conflicting notes is printed.

### Variant 26. City parking {#v26}

**1. Initial level.** Create a sensor program that sends a UDP datagram “space occupied/free,” and a server that tracks the state of spaces and prints the number of free spaces after each change.

**2. Basic level.** Create a parking server that receives UDP events from sensors and at the same time serves drivers’ TCP requests “free spaces in a zone”; the state of spaces is stored in a thread-safe way, and repeated and stale events (by number) are ignored.

**3. Advanced level.** Create a city parking application `parking` with the commands `server --zones file` (receives “space occupied/free” UDP events from sensors and serves drivers’ TCP requests), `sensors --count N --rate events/s`, and `driver --zone` (a request for free spaces in a zone) and the `--help` option. The server detects sensors without events for more than 30 s and prints occupancy statistics every minute, and a load mode measures the number of events processed per second for N = 100, 1000, 10,000.

### Variant 27. Distributed hash computation {#v27}

**1. Initial level.** Create a gRPC worker service with a method `Hash(data)` that returns SHA-256, and a client that computes the hashes of three files through the service and compares them with a local computation.

**2. Basic level.** Create a gRPC worker service with a method `Hash(data)` that returns the SHA-256 of a block, and a coordinator that sends the blocks of a file to several workers at once (limiting the number of calls with `SemaphoreSlim`), collects the block hashes in order of their numbers, and prints the combined hash string and the time compared with a single worker.

**3. Advanced level.** Create a distributed file hashing application `hashpool` with the commands `worker --port --threads` (a gRPC worker computes the SHA-256 of blocks) and `run --workers file --block MB --help` (the coordinator divides a file into blocks). The coordinator balances blocks by the workers’ queue lengths, retries the blocks of a failed worker, verifies the result against a local computation, and prints a “workers – MB/s – speedup” table.

### Variant 28. Sports broadcasts {#v28}

**1. Initial level.** Create a gRPC service with a server stream `Follow(match)` that sends match events from a file with pauses, and a client that prints the events with the match minute.

**2. Basic level.** Create a gRPC broadcast service in which the client, after a connection loss, reconnects and passes the number of the last received event, and the server continues from the next one; the client prints the score after each goal.

**3. Advanced level.** Create a gRPC sports broadcast service (a server stream of match events from files) and a `live` application with the commands `server --matches folder` and `watch --match --reconnect N` and the `--help` option. The server serves hundreds of subscribers through `Channel<T>` queues and, after a reconnection, continues from the event following the last one received; the client simulates N disconnections and checks that there are no gaps and no duplicates.

### Variant 29. A proxy server {#v29}

**1. Initial level.** Create a TCP proxy that accepts connections on one port and forwards bytes to a given address and port in both directions (`CopyToAsync`), printing client connections.

**2. Basic level.** Create a TCP proxy for several clients at once that counts the bytes transferred in each direction, closes both connections when one side closes, and writes a “client – target – bytes – duration” log.

**3. Advanced level.** Create a `tcpproxy` application with the options `--listen port`, `--target host:port`, `--max-clients N`, `--idle-timeout s`, `--log file`, and `--help`. The proxy limits the number of connections, closes idle ones, prints the throughput every second, and is tested by transferring a file through the proxy and comparing hashes.

### Variant 30. A dictionary translation service {#v30}

**1. Initial level.** Create a gRPC service with a method `Translate(word, direction)` based on a dictionary from a file, and a client that translates a word typed on the keyboard.

**2. Basic level.** Create a gRPC translation service with gRPC reflection enabled and a `TranslateText` method (a bidirectional stream of words); prepare a file of `grpcurl` commands for listing services, describing methods, and calling the translation, and a report with their output.

**3. Advanced level.** Create a gRPC service for translating words using dictionaries from files and a `dict` application with the commands `server --dicts folder` and `translate --from --to --file` and the `--help` option. The server returns `NotFound` for an unknown language pair, and the client translates the text of a file in batches of words in parallel and prints the translation and the time for 1, 2, and 4 threads.

## Procedure

1. Study the theory and worked examples.
2. For your variant, draw up an interaction diagram: the participants, the transport (TCP, UDP, or gRPC), the message format or the `.proto` file, the call types, the timeouts and deadlines, and the error codes.
3. Create a .NET 10 solution in JetBrains Rider with separate server and client projects (for gRPC, a shared `.proto` file); run the server and clients on `localhost` with different ports.
4. Implement the task of the chosen level: asynchronous serving of several clients, graceful connection shutdown, handling of `SocketException` / `RpcException`, and synchronization of the server’s shared state.
5. Test the scenarios of success, connection loss, an unavailable server, and an exceeded timeout; make sure with `Get-NetTCPConnection` or `ss` that the server listens on the required port, and check a gRPC service with `grpcurl` or the Rider HTTP Client.
6. Demonstrate the program to the instructor, explain the code, and answer the review questions.
