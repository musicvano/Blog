---
title: Tasks
description: "Topic 8. Copy, Move, RAII: task variants"
outline: [2, 3]
sourceHash: "69e6b88dd837b2c9ebe3e196f5ea65e7687ae25eb3aec885cc85dc4dcf6fc308"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Dynamic array {#v1}

**1. Initial level.** Create a console program that implements an array of integers of a given length. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Dynamic array”: implement an array of integers of a given length, as well as changing a copy without affecting the original. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Dynamic array”: implement a dynamic integer array class with its own buffer, reserve with the strong guarantee, and a capacity log. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 2. Stack {#v2}

**1. Initial level.** Create a console program that implements a stack of integers on its own buffer. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Stack”: implement a stack of integers on its own buffer, as well as copying a non-empty and an empty stack. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Stack”: implement a class of a stack of integers on its own buffer, its move-only alternative, and a comparison of the push/pop operations. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 3. Audio buffer {#v3}

**1. Initial level.** Create a console program that implements a ring buffer of samples in -1..1. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Audio buffer”: implement a ring buffer of samples in -1..1, as well as a copy that preserves the read and write positions. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Audio buffer”: implement a class of a ring buffer of audio samples in -1..1 with its own memory, and passing buffers to channels via a noexcept move without losing the order. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 4. Video frame {#v4}

**1. Initial level.** Create a console program that implements a frame of a given width and height with pixel bytes. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Video frame”: implement a frame of a given width and height with pixel bytes, as well as independent editing of a copy of the frame. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Video frame”: implement a video frame class of a given width and height with its own buffer of pixel bytes, and a series of frame copies and moves with counters and time measurement. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 5. Polynomial {#v5}

**1. Initial level.** Create a console program that implements the coefficients of a polynomial in its own array. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Polynomial”: implement the coefficients of a polynomial in its own array, as well as copy-and-swap for assigning polynomials of different degrees. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Polynomial”: implement a polynomial class with coefficients in its own dynamic array, a controlled copy failure, and a proof that the target of the assignment is unchanged. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 6. Big integer {#v6}

**1. Initial level.** Create a console program that implements a non-negative number as an array of decimal digits. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Big integer”: implement a non-negative number as an array of decimal digits, as well as copying, adding one, and transferring the buffer. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Big integer”: implement a class of a big non-negative integer as its own array of decimal digits, and a sum factory that returns a value without return std::move. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 7. Bit set {#v7}

**1. Initial level.** Create a console program that implements an array of words for bits 0–255. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Bit set”: implement an array of words for bits 0–255, as well as independent copies and setting a bit. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Bit set”: implement a bit set class on its own array of words for bits 0–255, a union of sets that returns a value, and self-assignment tests. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 8. Game map {#v8}

**1. Initial level.** Create a console program that implements a rectangular buffer of 0/1 cells. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Game map”: implement a rectangular buffer of 0/1 cells, as well as cloning a level and editing the copy. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Game map”: implement a game map class with its own rectangular buffer of 0/1 cells, and a queue of loaded levels with moves and a check of the empty source. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 9. Document {#v9}

**1. Initial level.** Create a console program that implements a line of text with its own buffer. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Document”: implement a line of text with its own buffer, as well as a copy of the document and independent editing. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Document”: implement a document class with text in its own buffer, and an undo history that moves versions and keeps the last state. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 10. Network packet {#v10}

**1. Initial level.** Create a console program that implements a move-only buffer of training bytes. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Network packet”: implement a move-only buffer of training bytes, as well as transferring it between two owners without a copy. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Network packet”: implement a move-only network packet class with its own buffer of training bytes, a queue of packets in a vector, a counter of live buffers, and a report. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 11. Event log {#v11}

**1. Initial level.** Create a console program that implements an RAII object that reports the end of a scope. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Event log”: implement an RAII object that reports the end of a scope, as well as a single completion on return and on an exception. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Event log”: implement an RAII event log class that reports the end of a scope, and accumulation of events in an external log with non-throwing cleanup. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 12. Function timer {#v12}

**1. Initial level.** Create a console program that implements an RAII timer based on steady\_clock. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Function timer”: implement an RAII timer based on steady\_clock, as well as recording the duration on a normal exit and on exit by exception. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Function timer”: implement an RAII timer on steady\_clock that records the duration of a function on a normal exit and on exit by exception, and a report of several named measurements without requirements for specific milliseconds. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 13. Bank transaction {#v13}

**1. Initial level.** Create a console program that implements a guard for a single integer balance. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Bank transaction”: implement a guard for a single integer balance, as well as commit and rollback on an error. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Bank transaction”: implement an RAII transaction guard for an integer balance with commit and rollback on an error, and an atomic local transfer between two balances with a check of the total. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 14. Sparse vector {#v14}

**1. Initial level.** Create a console program that implements an array of index–value pairs. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Sparse vector”: implement an array of index–value pairs, as well as an independent copy and a check that the indices are unique. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Sparse vector”: implement a sparse vector class with its own array of index–value pairs with unique indices, and compare this buffer owner with an implementation on vector following the rule of zero. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 15. Histogram {#v15}

**1. Initial level.** Create a console program that implements an array of non-negative counters. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Histogram”: implement an array of non-negative counters, as well as copying and adding an observation only to the copy. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Histogram”: implement a histogram class with its own array of non-negative counters, and merging compatible histograms that returns a new object. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 16. Spreadsheet {#v16}

**1. Initial level.** Create a console program that implements a buffer of text cells of a rectangular sheet. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Spreadsheet”: implement a buffer of text cells of a rectangular sheet, as well as copying a sheet and editing a cell. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Spreadsheet”: implement a spreadsheet sheet class with its own buffer of text cells, workbooks of sheets, and moving sheets between workbooks while keeping the names without duplicates. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 17. Deck of cards {#v17}

**1. Initial level.** Create a console program that implements a move-only set of card numbers 0–51. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Deck of cards”: implement a move-only set of card numbers 0–51, as well as handing the deck over to a single owner. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Deck of cards”: implement a move-only deck class with a set of card numbers 0–51, and dealing disjoint sets to players with a check that the count is preserved. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 18. Image matrix {#v18}

**1. Initial level.** Create a console program that implements a matrix of integer pixels 0–255. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Image matrix”: implement a matrix of integer pixels 0–255, as well as an independent copy and changing a pixel. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Image matrix”: implement an image matrix class with its own buffer of integer pixels 0–255, and a 90-degree rotation that returns a value, with a comparison of the dimensions. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 19. Connection pool {#v19}

**1. Initial level.** Create a console program that implements an RAII token for a training resource from a pool. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Connection pool”: implement an RAII token for a training resource from a pool, as well as returning the token exactly once after a move. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Connection pool”: implement an RAII token for a training resource that is returned to the pool exactly once, a pool with a fixed capacity, and a log of checkouts without a real network. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 20. User session {#v20}

**1. Initial level.** Create a console program that implements a move-only training session token. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “User session”: implement a move-only training session token, as well as transferring the token and checking the invalidated source. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “User session”: implement a move-only training session token class with a check of the invalidated source, and passing a session between two services with a rejection that does not lose the owner. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 21. Print queue {#v21}

**1. Initial level.** Create a console program that implements a job with its own text buffer. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Print queue”: implement a job with its own text buffer, as well as copying and moving a job. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Print queue”: implement a print job class with its own text buffer, a queue of move-only jobs, and a report on completed jobs without real printing. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 22. Adjacency graph {#v22}

**1. Initial level.** Create a console program that implements a square buffer of a 0/1 matrix. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Adjacency graph”: implement a square buffer of a 0/1 matrix, as well as independent cloning of the graph. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Adjacency graph”: implement a graph class with its own square buffer of a 0/1 adjacency matrix, returning the transposed graph, and control over resource transfer. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 23. Photo archive {#v23}

**1. Initial level.** Create a console program that implements a buffer of a training image. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Photo archive”: implement a buffer of a training image, as well as copying and moving with counters. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Photo archive”: implement a photo class with its own training image buffer and counters of copies and moves, and batch addition of photos to a vector with an analysis of reallocation and noexcept. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 24. Lab resource {#v24}

**1. Initial level.** Create a console program that implements an RAII reservation of a single training device. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Lab resource”: implement an RAII reservation of a single training device, as well as releasing it on an exception and forbidding a repeated reservation. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Lab resource”: implement an RAII reservation of a single training device that forbids a repeated reservation, and moving the reservation right without a double release. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 25. Small string {#v25}

**1. Initial level.** Create a console program that implements a string with a fixed internal buffer of 15 characters. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Small string”: implement a string with a fixed internal buffer of 15 characters, as well as switching to a dynamic buffer for longer text. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Small string”: implement a small string class with an internal buffer of 15 characters and a dynamic buffer for longer text, and the rule of five between the short and long states with all four transitions. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 26. Sensor series {#v26}

**1. Initial level.** Create a console program that implements a buffer of finite measurements. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Sensor series”: implement a buffer of finite measurements, as well as a deep copy and a move via std::exchange. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Sensor series”: implement a sensor series class with its own buffer of finite measurements, and splitting a series into two new buffers that preserve the data, with tests of empty parts. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 27. Chess game {#v27}

**1. Initial level.** Create a console program that implements a buffer of 64 training square codes. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Chess game”: implement a buffer of 64 training square codes, as well as copies of positions for independent trial moves. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Chess game”: implement a chess position class with its own buffer of 64 training square codes, a position history with moves, and undo without implementing the rules of chess. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 28. Music track {#v28}

**1. Initial level.** Create a console program that implements a buffer of samples with a constant sample rate. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Music track”: implement a buffer of samples with a constant sample rate, as well as copying and trimming a range into a new track. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Music track”: implement a music track class with its own buffer of samples at a constant sample rate, and concatenation of compatible tracks with controlled copies and moves. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 29. Console state {#v29}

**1. Initial level.** Create a console program that implements an RAII wrapper for the flags/precision/fill of a stream. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Console state”: implement an RAII wrapper for the flags/precision/fill of a stream, as well as restoring them after an exception and with nested guards. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Console state”: implement an RAII wrapper that saves and restores the flags/precision/fill of a stream, and a report in different formats with a check of the exact text via ostringstream. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

### Variant 30. Chat message {#v30}

**1. Initial level.** Create a console program that implements a move-only message with a byte attachment. Enter the initial data from the keyboard, and print the contents or the state of the resource before and after leaving the scope. Identify the owner and the automatic cleanup.

**2. Basic level.** Create a console program for the object “Chat message”: implement a move-only message with a byte attachment, as well as passing the message into a vector. Enter the data from the keyboard; print the states of the original and the result. Test the empty case, the independence of the resources or single ownership, and the absence of a double release.

**3. Advanced level.** Create a console project “Chat message”: implement a move-only chat message class with a byte attachment, a queue of recipients, and removal of delivered messages while keeping a single owner. Read the input parameters and commands from the keyboard until `end`; `--help` describes the format. Print a table of states and the final counters. Justify the rule of zero or five and forbid invalid copies; test self-assignment, self-move, and exit by exception where the operations are available. Print errors to `std::cerr`, and exit with code 1 on invalid input.

## Procedure

1. Write down the input data, the output format, and the class invariants; prepare
  examples of ordinary, empty, edge-case, and invalid data.
1. Define the public interface and the responsibility of each class.
  Explain who owns each resource and when its lifetime ends.
1. Implement a separate console project. Check the arguments before changing
  the state; send error messages to `std::cerr`.
1. Build with `/std:c++latest /EHsc /W4 /utf-8` and fix the warnings;
  run the prepared checks without disabling `assert`.
1. Compare the results with manual calculations. Make sure that an error
  does not leave an object in a state that breaks its contract.
1. Prepare a report with the code, the build command, the actual results,
  a test table, and an explanation of the limitations. Commit the changes to Git.
1. At the defense, explain the chosen interface, run a new edge case,
  and show how a change in the requirements affects the implementation.
