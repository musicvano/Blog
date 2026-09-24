---
title: "Tasks"
description: "Topic 9. Networking and sockets: task variants"
outline: [2, 3]
sourceHash: "2b1323740e1fc948bebf5b6e0e07a0e0a1582d3c9752aaa62f7552551980b85a"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

Run servers and clients on the same computer with the address `127.0.0.1` unless the task says otherwise.

## Variants

### Variant 1. Exchange rate server {#v1}

**1. Initial level.** Create a TCP server and a TCP client as console programs: the server stores the USD, EUR, and PLN to hryvnia rates in a dictionary, receives a line with a currency code from the client, and replies with the rate or the message "unknown currency"; the client asks the user for the code.

**2. Basic level.** Create an exchange rate TCP server that serves multiple clients simultaneously and executes the commands `RATE USD`, `CONVERT 100 EUR UAH`, and `LIST` with response codes `200`, `400`, `404`, and a console client that prints the responses and exits with the `QUIT` command.

**3. Advanced level.** Create a TCP server for exchange rates to the hryvnia with the `RATE` and `CONVERT` commands that loads rates from a CSV file (code, rate), accepts the `--port` and `--rates` arguments (with `--help`), serves multiple clients, appends each request (time, client address, command) to a log, and rereads the file on the administrator command `RELOAD`; the console client prints conversion results as a table with a total.

### Variant 2. Network quiz {#v2}

**1. Initial level.** Create a quiz TCP server that sends the client 5 multiple-choice questions one by one, accepts the answer number, and at the end reports the number of correct answers, and a console client for the player.

**2. Basic level.** Create a quiz TCP server for multiple players with questions and answer options defined in the program: once at least two players have connected, the server sends everyone the same questions, accepts answers for 20 s, and after each question sends a scoreboard sorted in descending order; the player's console client shows the question and sends the answer number.

**3. Advanced level.** Create a quiz server with questions from a JSON file, the arguments `--port`, `--time`, and `--questions`, more points for faster answers, handling of player disconnections, and saving of the final scoreboard to a file, as well as a Windows Forms client with answer option buttons and a timer.

### Variant 3. Remote thermometer {#v3}

**1. Initial level.** Create a sensor program that every second sends a UDP datagram with the sensor name and a random temperature from 18 to 25 °C to `127.0.0.1:6100`, and a receiver program that prints the received values with the time of receipt.

**2. Basic level.** Create a sensor program that every second sends a UDP datagram with the sensor name and a random temperature, and a UDP server that receives measurements from multiple sensors, stores the minimum, maximum, and average for each sensor, and prints a table every five seconds; a sensor with no data for 10 s is marked as "no connection".

**3. Advanced level.** Create a temperature monitoring system: sensors with the `--name` and `--interval` arguments send numbered datagrams, the server detects lost and duplicate datagrams by number, writes measurements to a CSV file, and on the TCP command `STATS` returns a statistics table with the loss percentage to the client.

### Variant 4. Dictionary server {#v4}

**1. Initial level.** Create a TCP server for a 20-word English-Ukrainian dictionary that replies to each received line with the translation or the message "word not found", and a console client.

**2. Basic level.** Create a TCP server for an English-Ukrainian dictionary with the commands `GET word`, `ADD word translation`, and `COUNT` that serves multiple clients simultaneously, protects the dictionary from concurrent changes, and replies with codes `200`, `400`, `404`, `409` (the word already exists), and a console client.

**3. Advanced level.** Create a TCP server for an English-Ukrainian dictionary with commands for searching, adding, and deleting words that loads and saves the dictionary to a JSON file, supports prefix search, allows deleting words only after the `LOGIN` command with a password from the configuration, accepts the `--port` and `--file` arguments, and saves data correctly when stopped with the **Enter** key; the console client sends commands and prints the responses.

### Variant 5. Networked tic-tac-toe {#v5}

**1. Initial level.** Create a TCP server and client for a two-player tic-tac-toe game on one computer: the server accepts two clients, receives a cell number 1–9 from each in turn, and after each move sends both of them the board as three lines.

**2. Basic level.** Create a tic-tac-toe TCP server for two players who take turns sending a cell number 1–9: the server checks that moves are valid and in turn, detects a win or a draw, reports the result to both players, and offers a new game; the console client shows the board and the server's messages.

**3. Advanced level.** Create a tic-tac-toe server that runs several games at once (players are paired in the order they connect), counts a loss for a player who disconnects, and keeps a scoreboard by name, and a Windows Forms client with a 3×3 board of buttons.

### Variant 6. File server {#v6}

**1. Initial level.** Create a TCP server that on the `LIST` command sends the client the list of files in its `files` folder with their sizes, and a console client that prints the received list.

**2. Basic level.** Create a file server with the `GET name` command that transfers a file with a size prefix (8 bytes, big-endian), and a client that saves the file in the current folder and shows the download progress in percent; the server rejects names that contain a path.

**3. Advanced level.** Create a file server with the `LIST`, `GET`, and `PUT` commands, a file size limit, an SHA-256 hash integrity check after transfer, and parallel client service, and a client with the `get` and `put` arguments, transfer speed output, and exit codes.

### Variant 7. Station departure board {#v7}

**1. Initial level.** Create a TCP server that every five seconds sends all connected clients a line with a train number, destination, and arrival time, and a board client that prints the received lines.

**2. Basic level.** Create a station board server in whose console the operator enters the commands `ADD number destination time` and `DELAY number minutes`, and the server broadcasts the updated schedule to all board clients; after each update the client clears the console and prints a table.

**3. Advanced level.** Create a station board system: the schedule is loaded from a JSON file, clients specify a platform when connecting and receive only its trains, the server automatically sets the "arriving" status 5 min before arrival, and a Windows Forms client shows the schedule in a `DataGridView`.

### Variant 8. Network auction {#v8}

**1. Initial level.** Create a TCP auction server for one lot with a starting price of 1,000 UAH that accepts a bid from the client and replies "bid accepted" if it is higher than the current one, and a console client for a participant.

**2. Basic level.** Create a TCP auction server for one lot with a starting price for multiple participants that accepts bids (higher than the current one), broadcasts every new bid with the participant's name to everyone, ends the auction 30 s after the last bid, and announces the winner and the price, and a console client for a participant.

**3. Advanced level.** Create an auction server with several lots from a file, a minimum bid increment, protection against simultaneous bids, an auction log in a CSV file, the `--port` and `--lots` arguments, and a Windows Forms client with a list of lots, the current price, and a timer.

### Variant 9. Notes server {#v9}

**1. Initial level.** Create a TCP server that receives note lines from the client, numbers them, and returns all notes on the `LIST` command, and a console client.

**2. Basic level.** Create a notes server with the commands `ADD`, `GET id`, `DELETE id`, `LIST` in which every request and response is a single JSON line (`System.Text.Json`), and a client that builds requests from the commands you type and prints the responses as a table.

**3. Advanced level.** Create a notes server that exchanges length-prefixed JSON messages, keeps separate notes for each user after `LOGIN`, saves them to a file, and limits message size, and a client with command-line arguments (`add`, `list`, `delete`, `--help`) and exit codes.

### Variant 10. Computer monitoring {#v10}

**1. Initial level.** Create an agent program that connects to a TCP server and every three seconds sends the computer name and the process working set size, and a server that prints the received lines.

**2. Basic level.** Create an agent program that every three seconds sends the computer name and the process working set size to a TCP server, and a monitoring server for multiple agents that stores the latest data of each agent, prints a table every five seconds (name, address, memory, time of the last report), and marks an agent that disconnected without notice via a timeout.

**3. Advanced level.** Create a monitoring system in which agents send JSON messages with the name, the number of processors, memory, and free disk space, the server saves the history to a CSV file and warns when thresholds from the configuration are exceeded, and a Windows Forms client shows a table of agents updated in real time.

### Variant 11. Distributed voting {#v11}

**1. Initial level.** Create a voting TCP server with three options that accepts an option number from the client and replies with the current results, and a console client.

**2. Basic level.** Create a voting TCP server with three options that accepts votes (a name and an option number) from multiple clients, allows only one vote per name, broadcasts the results in percent to everyone after each vote, and ends voting on the operator command `CLOSE`, and a console client.

**3. Advanced level.** Create a voting system with a question and options from a file, one-time voter codes from a file, saving of results after each vote, the `--port`, `--poll`, `--codes` arguments, and a Windows Forms client with a bar chart of the results.

### Variant 12. Networked Battleship {#v12}

**1. Initial level.** Create a TCP server that places three single-cell ships on a 5×5 board, accepts a shot in the format `B3` from the client, and replies "hit" or "miss", and a console client.

**2. Basic level.** Create a Battleship TCP server for two players with 10×10 boards in which each player places ships with the `PLACE` command, the players take turns shooting (a shot in the format `B3`), the server reports the results to both and determines the winner, and a console client for a player.

**3. Advanced level.** Create a Battleship server with ship placement rule checks, handling of player disconnections, rematches, and a protocol with response codes, and a Windows Forms client with two boards (your own ships and your shots at the opponent).

### Variant 13. Weather server {#v13}

**1. Initial level.** Create a TCP server that stores temperatures for five cities in a dictionary and replies to a city name from the client with its temperature, and a console client.

**2. Basic level.** Create a weather TCP server that loads city data (temperature, humidity, wind) from a CSV file, executes the `GET city` and `SUBSCRIBE city` commands, and sends new data to subscribed clients when the operator changes it with a command in the server console, and a console client.

**3. Advanced level.** Create a weather server with subscriptions of multiple clients to multiple cities, a three-day forecast, JSON responses, and saving of changes to a file, and a Windows Forms client that shows a table of subscribed cities and updates it without blocking the UI.

### Variant 14. Chat with rooms {#v14}

**1. Initial level.** Create a chat TCP server that forwards each client's messages to all other clients with the sender's address, and a console client with a separate task for receiving messages.

**2. Basic level.** Create a chat TCP server with the commands `/join room`, `/rooms`, and `/w name text` (a private message) that sends messages only to members of the same room and announces users joining and leaving, and a console client with a separate task for receiving messages.

**3. Advanced level.** Create a chat server with rooms, unique names, a history of the last 20 messages of each room for new members, a message rate limit, and a log file, and a Windows Forms client with lists of rooms and users.

### Variant 15. Seat booking {#v15}

**1. Initial level.** Create a TCP server for a cinema hall with 5 rows of 10 seats that on the `MAP` command sends a map of taken seats, and on `BOOK row seat` books a free seat, and a console client.

**2. Basic level.** Create a TCP seat booking server for a cinema hall with 5 rows of 10 seats (the commands `MAP`, `BOOK row seat`, `CANCEL row seat`) that serves multiple clients simultaneously, guarantees that a seat is never booked twice, allows canceling only your own booking, and broadcasts the updated hall map to all clients, and a console client.

**3. Advanced level.** Create a booking server for several showings with a temporary 2-minute hold on a seat until confirmation, saving of bookings to a JSON file, and an occupancy report, and a Windows Forms client with a hall map made of buttons.

### Variant 16. Chess clock server {#v16}

**1. Initial level.** Create a TCP server that accepts two players, gives each 60 s, and after the `MOVE` command from the player whose turn it is switches the clock and sends both the remaining time, and a console client.

**2. Basic level.** Create a chess clock TCP server for two players that switches the clock after the `MOVE` command from the player whose turn it is; the time control is set by an argument (minutes and an increment in seconds per move), the server broadcasts the time to both players every second, records a loss on time, and executes the `PAUSE` and `RESUME` commands; a console client for a player.

**3. Advanced level.** Create a chess clock server for several games at once with game codes, a log of moves and times in a CSV file, and handling of player disconnections, and a Windows Forms client with two clock faces and a move button.

### Variant 17. Network bulletin board {#v17}

**1. Initial level.** Create a bulletin board TCP server that stores ads received from clients and on the `LIST` command returns them with numbers, and a console client.

**2. Basic level.** Create a bulletin board TCP server with categories, the commands `POST category text`, `LIST category`, and `SUBSCRIBE category`, and delivery of new ads to subscribed clients, and a console client.

**3. Advanced level.** Create a bulletin board server with ad expiration, deletion by the author only, saving to a JSON file, and limits on the length and number of ads per user, and a Windows Forms client with a category filter.

### Variant 18. Remote matrix calculator {#v18}

**1. Initial level.** Create a TCP server that receives two 2×2 matrices from the client as a line of numbers and returns their sum, and a console client that asks for the matrix elements.

**2. Basic level.** Create a TCP server for matrix operations that receives a JSON request with an operation (`add`, `mul`, `transpose`) and matrices of arbitrary size, checks the dimensions, and returns the result or an error message in JSON format, and a console client that builds the request from the matrices you enter.

**3. Advanced level.** Create a matrix operations server that exchanges length-prefixed JSON, limits the matrix size, and computes the determinant and the inverse matrix, and a client that reads matrices from files given as arguments and prints the result as an aligned table.

### Variant 19. Quote of the day server {#v19}

**1. Initial level.** Create a UDP server that replies to any received datagram with a random quote from a list, and a UDP client that sends a request and prints the reply.

**2. Basic level.** Create a quote UDP server that loads quotes from a file and executes the requests `RANDOM`, `AUTHOR name`, and `COUNT`, while the client repeats the request up to three times if no reply arrives within 2 s.

**3. Advanced level.** Create a quote UDP server with request statistics by client address, a limit on the number of requests from one address per minute, and a TCP command `STATS` for the administrator, and a client with the `--server`, `--author`, `--help` arguments.

### Variant 20. Shared shopping list {#v20}

**1. Initial level.** Create a shopping list TCP server with the `ADD item` and `LIST` commands that keeps the items in memory, and a console client.

**2. Basic level.** Create a TCP server for a shared shopping list that serves multiple clients, executes the commands `ADD item`, `LIST`, `BUY number`, `REMOVE number`, and broadcasts every change to all clients together with the name of the user who made it, and a console client.

**3. Advanced level.** Create a server for several shared shopping lists with an access code per list, saving to a JSON file, item quantities and prices, and a grand total, and a Windows Forms client with a `CheckedListBox` that updates without blocking the UI.

### Variant 21. Password verification server {#v21}

**1. Initial level.** Create a TCP server that receives a name and a password from the client, compares them with a dictionary of users, and replies `OK` or `DENIED`, and a console client.

**2. Basic level.** Create an authentication TCP server that receives a name and a password from the client, stores salted SHA-256 password hashes, locks a user out for 1 min after three failed attempts, and replies with codes `200`, `401`, `423`, and a console client.

**3. Advanced level.** Create an authentication server with user registration, password complexity requirements, saving of accounts to a file, a log of login attempts, and an idle timeout, and a client with the `register` and `login` arguments.

### Variant 22. Network ping monitor {#v22}

**1. Initial level.** Create a UDP echo server that returns every received datagram to the sender, and a client that sends 5 datagrams and prints the response time for each in milliseconds.

**2. Basic level.** Create a UDP echo server and a UDP connectivity check client that sends numbered datagrams at a given interval, waits no longer than 1 s for a reply, and prints the minimum, average, and maximum latency and the loss percentage.

**3. Advanced level.** Create a ping monitor with the `--host`, `--port`, `--count`, `--interval` arguments, a server with a loss simulation parameter (the percentage of datagrams it ignores), writing of results to a CSV file, and a summary table for several servers.

### Variant 23. Restaurant kitchen {#v23}

**1. Initial level.** Create a kitchen TCP server that accepts an order as a line from a waiter client, assigns it a number, and replies with the order number, and a console client.

**2. Basic level.** Create a restaurant kitchen TCP server to which console clients of waiters and a cook connect: a waiter sends an order as a line and receives its number, the cook changes the order status with the command `STATUS number cooking|ready`, and the server notifies the waiter who created the order.

**3. Advanced level.** Create a restaurant ordering system with a menu from a JSON file, calculation of the order total, an order queue for the cook, and a shift report in a CSV file, and a Windows Forms waiter client with a list of orders and their statuses.

### Variant 24. Networked word chain game {#v24}

**1. Initial level.** Create a TCP server that sends the client a word and accepts a word that starts with the last letter of the previous one, checking this condition, and a console client.

**2. Basic level.** Create a TCP server for a multiplayer word chain game (each word starts with the last letter of the previous one) with turn order, word checks against a dictionary from a file, a ban on repeats, and elimination of a player who does not reply within 30 s, and a console client.

**3. Advanced level.** Create a word chain game server with several game rooms, scoring by word length, a high score table in a JSON file, and handling of disconnections, and a Windows Forms client with a word history and a turn timer.

### Variant 25. Photo sharing server {#v25}

**1. Initial level.** Create a TCP client that sends an image file with a size prefix (8 bytes), and a server that saves the received image to the `photos` folder and replies with the number of bytes saved.

**2. Basic level.** Create a photo sharing TCP server that accepts images with a name and size in the header, checks the extension (`.png`, `.jpg`) and a size of up to 10 MB, returns the list of photos on the `LIST` command and the file on `GET name`, and a console client with commands for sending, listing, and downloading.

**3. Advanced level.** Create a photo sharing server with thumbnails generated on upload, and a Windows Forms client that sends an image chosen in an `OpenFileDialog` with a progress indicator, shows the thumbnails in a `ListView`, and opens the full photo in a `PictureBox`.

### Variant 26. Bus schedule {#v26}

**1. Initial level.** Create a TCP server that, for a stop name from the client, returns a list of the next departures from a schedule defined in the program, and a console client.

**2. Basic level.** Create a bus schedule TCP server with data from a CSV file, the commands `STOP name`, `ROUTE number`, and `DELAY route minutes` (operator), and delay notifications sent to clients that asked about that stop, and a console client.

**3. Advanced level.** Create a schedule server with UDP server discovery on the local network, JSON responses, stop subscriptions, and a record of delays in a file, and a Windows Forms client that finds the server without entering an address.

### Variant 27. Log server {#v27}

**1. Initial level.** Create a TCP server that appends each line received from a client to the `log.txt` file with the time and the client address, and a client that sends 10 test entries.

**2. Basic level.** Create a log TCP server that accepts entries in the format `level|source|text` from multiple clients, writes them to separate files by source, and on the `TAIL source 5` command returns the latest entries, and a console client.

**3. Advanced level.** Create a log server that receives entries over UDP, has TCP commands for filtering by level and time, and rotates files after 1 MB, and a viewer client with the `--level` and `--follow` arguments that prints new entries in real time.

### Variant 28. Museum visitor counter {#v28}

**1. Initial level.** Create a turnstile program that sends `IN` or `OUT` to a TCP server at the press of a key, and a server that prints the current number of visitors.

**2. Basic level.** Create a turnstile program that sends `IN` or `OUT` to a TCP server at the press of a key, and a museum visitor counter server for several turnstiles at once with atomic counter updates, a capacity limit (the turnstile receives `FULL`), and broadcasting of the visitor count to all display clients.

**3. Advanced level.** Create a visitor tracking system for several museum halls: turnstile programs send `IN` or `OUT` with the hall name to a TCP server, the server keeps hourly statistics in a CSV file and restores the counters after a restart, and a Windows Forms client shows hall occupancy with `ProgressBar` indicators.

### Variant 29. Network dictation {#v29}

**1. Initial level.** Create a TCP server that sends the client a sentence, receives the typed text, and replies whether it matches the original, and a console client.

**2. Basic level.** Create a dictation TCP server for multiple students that sends everyone 5 sentences from a file one by one, accepts the students' answers within a given time, counts mistakes by word, and at the end sends each student their grade, and a console client for a student.

**3. Advanced level.** Create a dictation server with a choice of text from several files, saving of students' answers to a JSON file, and a report for the teacher with the number of mistakes of each student, and a Windows Forms client with a timer and an input field.

### Variant 30. Lottery server {#v30}

**1. Initial level.** Create a lottery TCP server that, on a client request, issues a ticket of six random numbers from 1 to 49, and a console client that prints the ticket number and numbers.

**2. Basic level.** Create a lottery TCP server in which clients buy tickets with their own six numbers from 1 to 49, and the operator runs the draw with the `DRAW` command; the server broadcasts the winning numbers and tells each client the number of matches on their tickets; the console client buys tickets and prints the result.

**3. Advanced level.** Create a lottery server with several draws, a ticket uniqueness check, a payout table by the number of matches, saving of draws to a JSON file, and a reproducible draw with a seed from the `--seed` argument, and a client with the `buy`, `check`, `--help` commands.

## Procedure

1. Study the theory and the worked examples; run the server and client of Example 1 in two terminal windows.
2. Describe the application protocol of your variant: how messages are delimited, the commands, the responses and error codes, the size limits; choose a free port (check it with `Get-NetTCPConnection`).
3. Create a solution with the server and client projects and configure them to start together (*Configure Startup Projects…*).
4. Implement the server and client according to the chosen difficulty level with asynchronous methods, handling of `SocketException` and `IOException`, and graceful shutdown.
5. Test with multiple clients, invalid commands, a broken connection (close the client window), and a server stop; view the connections with `Get-NetTCPConnection`.
6. Demonstrate the programs to the instructor, explain the protocol and the code, and answer the review questions.
