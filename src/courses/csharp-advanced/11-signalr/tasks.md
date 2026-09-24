---
title: "Tasks"
description: "Topic 11. Real time with SignalR: task variants"
outline: [2, 3]
sourceHash: "9c26e38737abc9a3f455f771bedf1a2e7c0c76c3365a47345ab3e893a452c8e5"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Live match score {#v1}

**1. Initial level.** Create an ASP.NET Core SignalR server with a hub through which an operator sends a match score (team names and number of goals), and a console client that connects to the hub, shows each score update with the time it was received, and in operator mode (the `--operator` argument) sends a typed line such as `2:1`.

**2. Basic level.** Create a SignalR server that runs several matches at once (a group for each match), and a console client: a spectator chooses a match from a list, receives the current score right after subscribing and all subsequent changes, and an operator enters a score that is validated (integers from 0 to 99, the score never decreases), with an error message from the hub.

**3. Advanced level.** Create a "Live Score" system: a SignalR server with a strongly typed hub, match groups, a hub method with which the operator updates the score (teams and goals), and a REST endpoint for creating a match; a Windows Forms client for spectators with a table of matches updated in real time and an event log (goals, match end), automatic reconnection with resubscription, and saving of the log to a file.

### Variant 2. Airport departures board {#v2}

**1. Initial level.** Create a SignalR server with a `BackgroundService` that every 3 s changes the status of a random flight (on time, boarding, delayed, departed) and sends it to all clients, and a console client that prints "flight number – status" lines.

**2. Basic level.** Create a SignalR server in which flights (number, terminal A, B, or C, status) are grouped by terminal and a background service changes the status of a random flight every 3 s, and a console client that takes a terminal as a command-line argument, subscribes only to its flights, and prints the board as an aligned table redrawn after each change.

**3. Advanced level.** Create an "Airport board" system: the SignalR server reads the schedule from a JSON file, a background service changes statuses over time, and a dispatcher changes a status through a REST endpoint; a Windows Forms client shows the board in a `DataGridView` with a terminal filter, marks delayed flights, and reports loss and restoration of the connection in the status bar.

### Variant 3. Group quiz {#v3}

**1. Initial level.** Create a SignalR server through which the host sends a question with four answer options to all participants, and a console client that shows the question and sends the answer number typed by the user; the server tells the participant whether the answer is correct.

**2. Basic level.** Create a SignalR server for a timed quiz through which the host sends participants questions with four answer options: answers are accepted for 15 s after the question is sent, a repeat answer from the same participant is rejected with a `HubException`, and when time runs out all participants receive the correct answer and the scoreboard; the console client works in host or participant mode.

**3. Advanced level.** Create a "Quiz" system: the SignalR server reads questions from a JSON file, the host runs rounds from a console client with command-line parameters (`--file`, `--time`, `--help`), and participants use a Windows Forms client with a timer and answer buttons; points depend on answer speed, and the final ranking is saved to a CSV file.

### Variant 4. Greenhouse sensor monitoring {#v4}

**1. Initial level.** Create a SignalR server with a streaming hub method that returns the measured temperature and humidity every second (`IAsyncEnumerable<T>`), and a console client that prints the number of measurements specified by the user.

**2. Basic level.** Create a SignalR server with a background service that generates temperature and humidity measurements of three greenhouse sensors, and a console client that takes temperature thresholds as command-line arguments, prints the measurements as a table, and marks rows that exceed the thresholds with the word ALARM.

**3. Advanced level.** Create a "Greenhouse" system: a SignalR server whose background service generates sensor temperature and humidity measurements, with sensor groups, a streaming hub method, and a REST endpoint for changing the thresholds; a Windows Forms client with a GDI+ chart of the last 60 measurements, a list of alarms, a button to cancel the stream, and recording of all measurements to a CSV file.

### Variant 5. Auction {#v5}

**1. Initial level.** Create a SignalR server that accepts bids on one lot and sends all participants the new highest bid with the bidder's name, and a console client in which the user enters a name and bid amounts.

**2. Basic level.** Create a SignalR server for a single-lot auction that sends everyone the new highest bid with the bidder's name, rejects bids that do not exceed the current one by at least the minimum increment with a `HubException` message, sends a new participant the current state of the lot on connection, and ends the auction after 60 s with a message to the winner (`Clients.Client`) and to everyone else, and a console client in which a participant enters a name and bid amounts.

**3. Advanced level.** Create an "Auction" system: a SignalR server with several lots (groups), a background service for lot timers, and a REST endpoint for adding a lot; a Windows Forms client with a list of lots, bid history, a countdown, disabling of the bid button during reconnection, and a report of sold lots in a file.

### Variant 6. Shared shopping list {#v6}

**1. Initial level.** Create a SignalR server that stores a shared shopping list, and a console client in which the user adds an item with the `add name` command and all connected clients receive the updated list.

**2. Basic level.** Create a SignalR server for a shared shopping list with commands for adding, marking as bought, and deleting an item by number, with number validation; a new client receives the whole list on connection, and every change is broadcast to everyone with the name of whoever made it; the console client sends commands and prints the list.

**3. Advanced level.** Create a "Shopping list" application: a SignalR server with separate lists for each family (groups by family code), saving of lists to a JSON file, and a Windows Forms client with a `CheckedListBox`, instant synchronization of changes between several windows, and rejoining the group after a reconnect.

### Variant 7. Doctor's queue {#v7}

**1. Initial level.** Create a SignalR server through which a doctor calls the next patient by ticket number, and a console "display board" client that prints the message "Ticket N – office M".

**2. Basic level.** Create a SignalR server for an electronic doctor's queue with office groups and console clients for the patient, the doctor, and the display board: a patient gets a ticket (the number is returned by a hub method), a doctor calls the next patient of their office, the patient receives a personal message through `Clients.Client`, and the board shows the last five calls.

**3. Advanced level.** Create an "Electronic queue" system: a SignalR server with ticket registration through a REST endpoint, a doctor's client (console, parameters `--room`, `--help`), and a Windows Forms display board with a large font, a sound signal on a call, waiting time statistics, and a call log in a CSV file.

### Variant 8. Support chat {#v8}

**1. Initial level.** Create a SignalR server where a customer sends a question and all operators receive it with the customer's name, and a console client that works in customer or operator mode depending on a command-line argument.

**2. Basic level.** Create a support chat SignalR server in which customer requests are queued, an operator takes the next request, after which the messages of the customer and the operator are passed only between them (`Clients.Client`), and other operators see that the request is taken; the console client works in customer or operator mode depending on a command-line argument.

**3. Advanced level.** Create a "Support chat" system: a SignalR server with a strongly typed hub, a request queue, handing a conversation over to another operator, and saving of conversation history to JSON files; a Windows Forms operator client with a list of conversations and conversation tabs.

### Variant 9. Courier tracker {#v9}

**1. Initial level.** Create a SignalR server to which a courier's console client sends its coordinates every second (shifting them randomly), and a dispatcher's console client that prints the courier's name and coordinates.

**2. Basic level.** Create a SignalR server to which a courier's console client sends its name and coordinates every second, while the server stores the latest coordinates of each courier, sends them to a new dispatcher (a console client) on connection, removes a courier after a disconnect (`OnDisconnectedAsync`), and checks that the coordinates lie within the city bounds 0–1000.

**3. Advanced level.** Create a "Courier tracker" system: courier clients send their coordinates to the SignalR server every second, and the server has a REST endpoint for orders and assigns the nearest courier; a Windows Forms dispatcher client draws a GDI+ city map with the positions and trails of the couriers, and a report of the distance traveled by each courier is saved to a file.

### Variant 10. Collaborative note editor {#v10}

**1. Initial level.** Create a SignalR server that stores the text of a note, and a console client that shows the text on connection and replaces it with a typed line for all participants.

**2. Basic level.** Create a SignalR server for a collaborative editor of a note made of paragraphs: a participant locks a paragraph for editing (others are refused with a `HubException`), changes its text, and unlocks it, and the lock is released automatically after the participant disconnects; the console client shows the note and sends commands.

**3. Advanced level.** Create a "Shared notes" application: a SignalR server with several notes (groups), saving to files, and a change log; a Windows Forms client with a list of paragraphs, locked paragraphs marked with the author's name, change history, and restoration of locks after a reconnect.

### Variant 11. Jury voting {#v11}

**1. Initial level.** Create a SignalR server through which jury members send a score from 1 to 10 for the current contestant, and a console client that prints each score and the current average.

**2. Basic level.** Create a jury voting SignalR server with console clients for the host and the jury members: the host announces a contestant, each jury member can score them only once with a score from 1 to 10 (a repeat score is rejected), an invalid score is reported with a hub error, and after all jury members have scored, everyone receives the average without the highest and lowest scores.

**3. Advanced level.** Create a "Jury" system: a SignalR server with a list of contestants from a JSON file, a host client (console with the `--file`, `--help` parameters), jury member clients that send scores from 1 to 10, and a Windows Forms client for spectators with a results table, a GDI+ chart of the averages, and saving of the record to a CSV file.

### Variant 12. Chess game {#v12}

**1. Initial level.** Create a SignalR server that forwards a move in the format `e2-e4` from one player to the other, and a console client that prints received moves and sends typed ones.

**2. Basic level.** Create a SignalR server with chess games as groups: the first two participants become the white and black players, the others are spectators; the server checks the `e2-e4` move format and the turn order and broadcasts moves to all members of the group with the move number; the console client sends typed moves and prints received ones.

**3. Advanced level.** Create an "Online chess" application: a SignalR server with a game lobby and saving of game records to files; a Windows Forms client that draws the board with GDI+, moves pieces with the mouse, shows the list of moves, and reports when the opponent disconnects.

### Variant 13. Grade notifications {#v13}

**1. Initial level.** Create a SignalR server with a REST endpoint `POST /api/grades` that accepts a student name, a course, and a grade and sends it to all hub clients, and a console client that prints the received grades.

**2. Basic level.** Create a grade notification SignalR server in which a student connects from a console client with their name in the query string and joins a group with that name, and a grade (course, 0–100 points with validation) sent by the teacher is received only by that student's clients.

**3. Advanced level.** Create an "Electronic gradebook" system: a SignalR server with REST endpoints for assigning and viewing grades, saving to a JSON file, and groups for student groups; a Windows Forms student client with a grades table, the average grade, and a notification in the status bar about a new grade.

### Variant 14. Exchange rate broadcast {#v14}

**1. Initial level.** Create a SignalR server with a background service that changes the USD, EUR, and PLN to hryvnia rates every second, and a console client that prints the received rates with two decimal places.

**2. Basic level.** Create a SignalR server with a background service that changes the rates of currency pairs (USD/UAH, EUR/UAH, PLN/UAH) every second, with groups for pairs, and a console client that takes pairs as command-line arguments, subscribes to them, reports an unknown pair, and prints rate changes with a sign and a direction arrow.

**3. Advanced level.** Create an "Exchange rates" system: a SignalR server with a background service that changes currency pair rates, a streaming method for rate history over the last N minutes, and a REST endpoint for the current rates; a Windows Forms client with a rates table, a GDI+ chart of the selected pair, subscribing and unsubscribing, and export of the history to a CSV file.

### Variant 15. Café kitchen display {#v15}

**1. Initial level.** Create a SignalR server through which a waiter sends an order (table and dishes), and a kitchen console client that prints new orders with the time they arrived.

**2. Basic level.** Create a café kitchen display SignalR server with console clients for the waiter and the cook: the waiter sends an order (table and dishes), the cook changes its status (accepted, cooking, ready) by order number with a check that the transition is allowed, and the waiter who created the order is notified of every change.

**3. Advanced level.** Create a "Kitchen display" system: a SignalR server with a REST endpoint for orders, kitchen and bar groups, and saving of orders to a JSON file; a Windows Forms client with order cards, a cooking timer, highlighting of overdue orders, and a report on the average cooking time.

### Variant 16. Online visitor counter {#v16}

**1. Initial level.** Create a SignalR server that counts connected clients in `OnConnectedAsync` and `OnDisconnectedAsync` and sends everyone their number, and a console client that prints the current number.

**2. Basic level.** Create a SignalR server for a hall with a capacity of N people (set in the configuration): a turnstile (a console client) sends entry and exit events, the server does not allow a negative count or exceeding the capacity, and a display board receives the count and the occupancy percentage.

**3. Advanced level.** Create a "Visitors" system: a SignalR server with several halls (groups) to which turnstile clients send entry and exit events, with a REST endpoint for hourly statistics and saving of events to a CSV file; a Windows Forms client with hall occupancy indicators and a GDI+ chart of attendance for the day.

### Variant 17. Multiplayer Snake {#v17}

**1. Initial level.** Create a SignalR server with a background service that moves a snake on a 20 × 20 field every second and sends the head coordinates to all clients, and a console client that changes the direction of movement with the W, A, S, D keys.

**2. Basic level.** Create a SignalR server for a Snake game on a 20 × 20 field in which each connected player controls their own snake with the W, A, S, D keys, the server handles collisions with walls and food and broadcasts the field state to all clients 5 times per second, and the console client draws the field with characters.

**3. Advanced level.** Create an "Online Snake" game: a SignalR server with game rooms (groups), a high score table in a JSON file, and collisions between snakes; a Windows Forms client that draws the field with GDI+ without flicker, controls the snake with the arrow keys, and shows the player ranking.

### Variant 18. Cinema seat booking {#v18}

**1. Initial level.** Create a SignalR server with a 5 × 10 hall map in which a client books a seat by row and number, and a console client that prints the hall map after each booking by anyone.

**2. Basic level.** Create a SignalR server for booking seats in a 5 × 10 cinema hall that temporarily holds a selected seat for 30 s, rejects bookings of taken or held seats with a `HubException` message, releases holds after the client disconnects, and broadcasts seat state changes to everyone, and a console client that prints the hall map.

**3. Advanced level.** Create a "Cinema hall" system: a SignalR server with showings (groups) and saving of bookings to a JSON file; a Windows Forms client with a GDI+ hall map where free, held, and taken seats are distinguished by hatching, booking confirmation, and printing a ticket to a file.

### Variant 19. Team task board {#v19}

**1. Initial level.** Create a SignalR server that stores tasks in the columns "To Do", "In Progress", "Done", and a console client in which the user moves a task with the `move number column` command and all clients receive the updated board.

**2. Basic level.** Create a SignalR server for a team task board with the columns "To Do", "In Progress", "Done": adding, moving, and deleting tasks, validation of numbers and column names, a limit on the number of tasks in the "In Progress" column, and notifying all clients who changed what; the console client sends commands and prints the board.

**3. Advanced level.** Create a "Kanban" application: a SignalR server with team boards (groups), saving to a JSON file, and a REST endpoint for a report; a Windows Forms client with three lists, dragging tasks with the mouse, instant synchronization, and marking of tasks being edited by another participant.

### Variant 20. Smart home alarm {#v20}

**1. Initial level.** Create a SignalR server to which a sensor's console client sends an event (door opened, motion, smoke), and an owner's console client that prints the event with the room name and time.

**2. Basic level.** Create a smart home alarm SignalR server to which a sensor's console client sends events (door opened, motion, smoke) with the room name: alarm events are sent to the owner's console client until the owner acknowledges them with a hub method, the armed mode is turned on and off with a code (a wrong code is rejected), and in disarmed mode motion events are only written to the log.

**3. Advanced level.** Create a "Smart home" system: a SignalR server with a REST endpoint for sensors, house groups, and a log in a CSV file; a Windows Forms client with a GDI+ room map, the room with an alarm highlighted by hatching, a list of unacknowledged alarms, and reconnection.

### Variant 21. Lab defense queue {#v21}

**1. Initial level.** Create a SignalR server where a student joins the queue to defend a lab assignment, and a console client that prints the updated queue to everyone after each change.

**2. Basic level.** Create a SignalR server for a lab defense queue with console clients for the student and the teacher: a student can join the queue only once and leave it, the teacher calls the next student, the called student receives a personal message, and a student who disconnected keeps their place in the queue for 2 minutes.

**3. Advanced level.** Create a "Defense queue" system: a SignalR server with lab defense queues for several teachers (groups), a student console client for joining the queue, a Windows Forms teacher client with buttons to call, accept, and reject work, defense statistics, and saving of results to a CSV file.

### Variant 22. File upload progress {#v22}

**1. Initial level.** Create a SignalR server with a streaming hub method that simulates processing a file of a given size and returns the completion percentage, and a console client that prints the progress up to 100 %.

**2. Basic level.** Create a SignalR server that accepts a stream of text fragments from the client (`IAsyncEnumerable<string>`) and counts lines and words, and a console client that reads the file given as a command-line argument, sends it in parts, and prints the processing result.

**3. Advanced level.** Create a "File processing" application: a Windows Forms client selects several text files, sends them to the SignalR server as streams, shows a separate `ProgressBar` for each file, and allows canceling the processing, while the server saves processing statistics to a JSON file.

### Variant 23. Tic-tac-toe game rooms {#v23}

**1. Initial level.** Create a SignalR server for one two-player tic-tac-toe game and a console client that prints the 3 × 3 board after each move and sends a move as a cell number 1–9.

**2. Basic level.** Create a SignalR server for a two-player tic-tac-toe game that checks the turn order and whether cells are taken, detects a win or a draw, reports the result to both players, and offers a new game, while a third player is refused; the console client prints the 3 × 3 board and sends a move as a cell number 1–9.

**3. Advanced level.** Create an "Online tic-tac-toe" game: a SignalR server with automatic opponent matching, rooms as groups, a player ranking in a JSON file, and a Windows Forms client that draws the board with GDI+, shows whose turn it is, and reports when the opponent disconnects.

### Variant 24. Live lecture text {#v24}

**1. Initial level.** Create a SignalR server to which the presenter sends lines of text, and a listener console client that prints each line as soon as it arrives.

**2. Basic level.** Create a SignalR server for live lecture text that stores the lines already sent by the presenter and passes them to a new listener on connection, allows only the presenter to send text (a presenter code check), and tells the presenter the number of listeners; the console client works in presenter or listener mode.

**3. Advanced level.** Create an "Online lecture" system: a SignalR server with several lectures (groups), saving of the text to files, and listeners' questions to the presenter; a Windows Forms listener client with auto-scrolling, text search, and saving of notes to a file.

### Variant 25. Server monitoring {#v25}

**1. Initial level.** Create a SignalR server to which a console agent sends the computer name and CPU load (a random number from 0 to 100) every second, and an administrator console client that prints the received values.

**2. Basic level.** Create a SignalR server to which console agents send the computer name and CPU load (a random number 0–100) every second, while the server stores the last 60 values for each agent, marks an agent as disconnected after `OnDisconnectedAsync`, sends a warning if the load exceeds 90 % for three measurements in a row, and shows a table of agents in the administrator console client.

**3. Advanced level.** Create a "Monitoring" system: console agents send the computer name and CPU load to the SignalR server every second, and the server has a streaming method for load history, a REST endpoint for thresholds, and a warning log in a file; a Windows Forms client shows GDI+ charts for each agent and a list of active warnings.

### Variant 26. Gym {#v26}

**1. Initial level.** Create a SignalR server with a list of exercise machines and a console client in which a visitor takes or releases a machine by number, and all clients receive the updated list of free machines.

**2. Basic level.** Create a gym SignalR server with a list of numbered machines that does not allow taking a machine that is in use or releasing someone else's (`HubException`), automatically releases a machine after 20 minutes or after the client disconnects, and sends everyone the list of machines with their occupancy time; the console client takes or releases a machine by number.

**3. Advanced level.** Create a "Gym" system: a SignalR server with several halls (groups), a queue for a busy machine, and usage statistics in a CSV file; a Windows Forms client with a GDI+ hall map and a notification when a queued machine becomes free.

### Variant 27. News feed {#v27}

**1. Initial level.** Create a SignalR server with a REST endpoint `POST /api/news` through which an editor publishes news, and a console client that prints the headline and time of each new item.

**2. Basic level.** Create a news feed SignalR server with sections (groups) and a REST endpoint `POST /api/news` (section, headline, text) that checks that the headline is not empty; the console client takes sections as command-line arguments, subscribes to them, and receives the last five news items of each section on subscription as well as new items.

**3. Advanced level.** Create a "News" system: a SignalR server with news saved to a JSON file and REST endpoints for publishing and searching; a Windows Forms client with a list of news, a section filter, subscribing and unsubscribing without a restart, and an unread news counter.

### Variant 28. Meeting vote counter {#v28}

**1. Initial level.** Create a SignalR server where the chair of a meeting announces a question and participants vote "for", "against", or "abstain", and a console client that prints the totals after each vote.

**2. Basic level.** Create a SignalR server for voting at a meeting with console clients for the chair and the participants: the chair announces a question, each registered participant votes only once ("for", "against", "abstain"), the chair ends the vote with a command, and the server determines the decision (adopted if "for" is more than half of those present) and reports the result to everyone.

**3. Advanced level.** Create a "Meeting" system: a SignalR server with an agenda from a JSON file, a quorum, and secret and open voting; a chair client (console, parameters `--agenda`, `--help`) and a Windows Forms participant client; the voting record is saved to a text file.

### Variant 29. Taxi dispatcher {#v29}

**1. Initial level.** Create a SignalR server through which a dispatcher sends an order (pickup address) to all drivers, and a driver console client that prints new orders.

**2. Basic level.** Create a taxi dispatcher SignalR server with console clients for the dispatcher and drivers: the dispatcher sends an order (pickup address) to all free drivers, the order goes to the first driver who accepts it (the others are refused), the dispatcher receives the driver's name, and a driver who is fulfilling an order receives no new ones until it is completed.

**3. Advanced level.** Create a "Taxi" system: a SignalR server with driver coordinates, sending an order to the three nearest drivers, a REST endpoint for customers, and a trip log in CSV; a Windows Forms dispatcher client with a GDI+ city map and a list of active orders.

### Variant 30. Drawing and guessing {#v30}

**1. Initial level.** Create a SignalR server where one player sends a hint for a secret word and the others send guesses, and a console client that prints the hints and a message about the correct answer.

**2. Basic level.** Create a SignalR server for a round-based "guess the word" game: the artist is chosen in turn, only the artist receives the word (`Clients.Client`) and sends hints, other players' guesses are compared case-insensitively, points are awarded to the artist and to the first player who guessed, and a round ends after 60 s; the console client sends hints or guesses and prints the messages.

**3. Advanced level.** Create a "Draw and guess" game: a SignalR server with rooms (groups), words from a text file, and a high score table in a JSON file; a Windows Forms client in which the artist draws with the mouse, the strokes instantly appear for the other players, and there is a chat for guesses next to the drawing.

## Procedure

1. Study the theory and the worked examples.
2. Design the message exchange: hub methods, client methods (the strongly typed hub interface), groups, and the state stored on the server.
3. In Visual Studio 2026, create a solution with a server project (*ASP.NET Core Empty*, .NET 10) and client projects; add the `Microsoft.AspNetCore.SignalR.Client` package to the clients.
4. Implement the hub, services, and server endpoints; implement the clients with `On` handlers, input validation, `HubException` handling, and reconnection.
5. Test with several clients running at the same time, with invalid data, and after stopping and restarting the server.
6. Demonstrate the work to the instructor, explain the code, and answer the review questions.
