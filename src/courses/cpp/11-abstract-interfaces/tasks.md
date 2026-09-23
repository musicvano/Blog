---
title: Tasks
description: "Topic 11. Abstract Classes, Interfaces: task variants"
outline: [2, 3]
sourceHash: "f2b0fce5da4b60b3f55a95981b7316b31412701e63b597a50e65de0278b05a77"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Payment gateways {#v1}

**1. Initial level.** Create a console program “Payment gateways”: implement a Payment interface and two local mock-ups. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Payment gateways”: implement a Payment interface and two local mock-ups, and add selecting the implementation by an entered name and checking the amount. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Payment gateways”: implement an abstract Payment interface with several local gateway mock-ups that compute a fee, selecting a gateway by name, training payments and a fee report without real transfers or network access. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 2. Logger {#v2}

**1. Initial level.** Create a console program “Logger”: implement a Sink interface and sinks to the console and to memory. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Logger”: implement a Sink interface and sinks to the console and to memory, and add info/error levels and a filter. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Logger”: implement a Sink interface with sinks to the console and to memory and info/error levels, a chain of sinks with lifetime checks and a report of message counts. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 3. Sorting strategies {#v3}

**1. Initial level.** Create a console program “Sorting strategies”: implement a sorting interface and insertion/bubble sort. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Sorting strategies”: implement a sorting interface and insertion/bubble sort, and add comparison counters for the same array. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Sorting strategies”: implement a sorting strategy interface with insertion and bubble implementations and operation counters, and a comparative report of time and operations on copies of the same data. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 4. Training ciphers {#v4}

**1. Initial level.** Create a console program “Training ciphers”: implement a transformation interface and Caesar/XOR. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Training ciphers”: implement a transformation interface and Caesar/XOR, and add the inverse transformation and key validation. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Training ciphers”: implement an interface of a reversible text transformation with Caesar and XOR implementations and key validation, and a chain of training transformations without any claims of cryptographic security. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 5. Text compression {#v5}

**1. Initial level.** Create a console program “Text compression”: implement a Codec interface with RLE and identity. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Text compression”: implement a Codec interface with RLE and identity, and add decoding and rejection of corrupted runs. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Text compression”: implement a Codec interface with RLE and identity implementations, encoding and decoding, and a comparison of sizes and the round trip of several texts. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 6. Amphibian {#v6}

**1. Initial level.** Create a console program “Amphibian”: implement Car and Boat roles with a shared Vehicle. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Amphibian”: implement Car and Boat roles with a shared Vehicle, and add a virtual base and a single name for the amphibian. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Amphibian”: implement an amphibian through multiple inheritance of the Car and Boat roles from a virtual base Vehicle with a single name, and a simulation of routes over land and water with a single fuel supply. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 7. Multifunction device {#v7}

**1. Initial level.** Create a console program “Multifunction device”: implement the Printer and Scanner interfaces. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Multifunction device”: implement the Printer and Scanner interfaces, and add separate client functions for each role. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Multifunction device”: implement a multifunction device that implements the Printer and Scanner interfaces, client functions for each role and a queue of training print/scan jobs without real hardware. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 8. Animal abilities {#v8}

**1. Initial level.** Create a console program “Animal abilities”: implement the CanFly and CanSwim interfaces. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Animal abilities”: implement the CanFly and CanSwim interfaces, and add three species with different sets of roles. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Animal abilities”: implement the CanFly and CanSwim interfaces, several animal species with different sets of these roles and text-based competitions using entered training speeds and distances. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 9. Form validators {#v9}

**1. Initial level.** Create a console program “Form validators”: implement a validation interface and length and digit rules. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Form validators”: implement a validation interface and length and digit rules, and add a list of errors for a single string. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Form validators”: implement a string validation rule interface with length, digit and other rules, and a chain of registration rules with a stable message order. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 10. Data sources {#v10}

**1. Initial level.** Create a console program “Data sources”: implement a Source interface and array and input sources. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Data sources”: implement a Source interface and array and input sources, and add a sequence generator with a finite limit. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Data sources”: implement a Source interface with array, input and sequence generator sources, and shared statistics for different sources with an explicit end marker. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 11. Report generators {#v11}

**1. Initial level.** Create a console program “Report generators”: implement an NVI generate and two body formats. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Report generators”: implement an NVI generate and two body formats, and add a shared check of the input rows. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Report generators”: implement an abstract report generator with a non-virtual generate (NVI) and table, list and CSV formats with escaping of quotes in the text output. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 12. Vending machine {#v12}

**1. Initial level.** Create a console program “Vending machine”: implement an abstract state with idle/paid. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Vending machine”: implement an abstract state with idle/paid, and add transitions for inserting money and cancelling. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Vending machine”: implement a vending machine with an abstract state and idle/paid states, transitions for inserting money, buying and cancelling, and a simulation of commands with products and the invariant of a non-negative balance. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 13. Numerical integration {#v13}

**1. Initial level.** Create a console program “Numerical integration”: implement rectangle and trapezoid strategies. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Numerical integration”: implement rectangle and trapezoid strategies, and add validation of the bounds and the number of steps. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Numerical integration”: implement a numerical integration strategy interface with the rectangle, trapezoid and Simpson methods, and a comparison for x² with the exact integral formula. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 14. Game opponents {#v14}

**1. Initial level.** Create a console program “Game opponents”: implement a move selection interface and first-free/random strategies. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Game opponents”: implement a move selection interface and first-free/random strategies, and add a deterministic seed and a move validity check. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Game opponents”: implement an opponent move selection interface with a “first free” strategy, a random one with a seed and a third one, and a tic-tac-toe game with a move log. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 15. Calibrated sensors {#v15}

**1. Initial level.** Create a console program “Calibrated sensors”: implement the Readable and Calibratable interfaces. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Calibrated sensors”: implement the Readable and Calibratable interfaces, and add two training sensors and a calibration offset. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Calibrated sensors”: implement the Readable and Calibratable interfaces, training sensors with a calibration offset and a station with polymorphic reading and a finiteness check. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 16. Cache policies {#v16}

**1. Initial level.** Create a console program “Cache policies”: implement an eviction interface and FIFO. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Cache policies”: implement an eviction interface and FIFO, and add LRU and access to an existing key. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Cache policies”: implement a cache eviction policy interface with FIFO, LRU and LFU implementations, and compare them on the same stream of requests. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 17. Taxi fares {#v17}

**1. Initial level.** Create a console program “Taxi fares”: implement a fare interface and two sets of coefficients. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Taxi fares”: implement a fare interface and two sets of coefficients, and add validation of the distance and duration. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Taxi fares”: implement a taxi fare interface with several sets of coefficients for distance and duration, and a comparison of training prices with an entered seasonal multiplier. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 18. Weather notifiers {#v18}

**1. Initial level.** Create a console program “Weather notifiers”: implement a Listener and an event source. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Weather notifiers”: implement a Listener and an event source, and add subscription without duplicates and unsubscription. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Weather notifiers”: implement a Listener interface and a source of weather events with subscription without duplicates and unsubscription, and several threshold listeners with a clear contract for lifetime and subscription changes. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 19. Routing {#v19}

**1. Initial level.** Create a console program “Routing”: implement a route selection interface by price and by length. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Routing”: implement a route selection interface by price and by length, and add a toll road filter. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Routing”: implement a route selection interface with strategies by price and by length and a toll road filter, and compare the strategies on a given list of ready-made routes without online maps. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 20. Forms of study {#v20}

**1. Initial level.** Create a console program “Forms of study”: implement the Schedule and Assessment interfaces. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Forms of study”: implement the Schedule and Assessment interfaces, and add online and in-person classes with different roles. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Forms of study”: implement the Schedule and Assessment interfaces, online and in-person classes with different roles, and a blended course that composes a schedule and a grading policy. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 21. Banking products {#v21}

**1. Initial level.** Create a console program “Banking products”: implement the InterestBearing and Withdrawable interfaces. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Banking products”: implement the InterestBearing and Withdrawable interfaces, and add products with one or two roles. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Banking products”: implement the InterestBearing and Withdrawable interfaces, banking products with one or two roles, a training portfolio and failure checks without real financial recommendations. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 22. Geometric solids {#v22}

**1. Initial level.** Create a console program “Geometric solids”: implement the HasVolume and HasSurface interfaces. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Geometric solids”: implement the HasVolume and HasSurface interfaces, and add a cube and a cylinder with dimension validation. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Geometric solids”: implement the HasVolume and HasSurface interfaces, a cube and a cylinder with dimension validation, and a warehouse of containers with total volumes and areas. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 23. Editor commands {#v23}

**1. Initial level.** Create a console program “Editor commands”: implement a Command and appending text. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Editor commands”: implement a Command and appending text, and add undo/redo with a clear lifetime of the text. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Editor commands”: implement a Command interface of a text editor with undo/redo, insert, delete and replace commands with snapshots, and clearing redo after a new action. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 24. Image filters {#v24}

**1. Initial level.** Create a console program “Image filters”: implement a Filter interface and inversion/threshold. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Image filters”: implement a Filter interface and inversion/threshold, and add validation of pixels 0–255. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Image filters”: implement a Filter interface for a text matrix of pixels 0–255 with inversion, threshold and blur, and a chain of filters with explicit edge rules. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 25. Student employee {#v25}

**1. Initial level.** Create a console program “Student employee”: implement the Person–Student/Employee diamond. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Student employee”: implement the Person–Student/Employee diamond, and add a virtual base with a single identifier. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Student employee”: implement the Person–Student/Employee diamond with a virtual base and a single identifier, and training accounting of a scholarship and a salary through independent roles. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 26. Calculator operations {#v26}

**1. Initial level.** Create a console program “Calculator operations”: implement an Operation interface and addition/multiplication. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Calculator operations”: implement an Operation interface and addition/multiplication, and add a registry of operations by name. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Calculator operations”: implement an Operation interface with addition, multiplication and division, a registry of operations by name and a command-driven calculator with validation and help, without dynamic libraries. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 27. Game of Life rules {#v27}

**1. Initial level.** Create a console program “Game of Life rules”: implement a Rule interface and the classic rule. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Game of Life rules”: implement a Rule interface and the classic rule, and add an alternative birth/survival set. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Game of Life rules”: implement a Rule interface of the Game of Life with the classic and an alternative birth/survival rule, and a step-by-step grid simulation with explicit boundaries and a comparison of the strategies. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 28. Training string generators {#v28}

**1. Initial level.** Create a console program “Training string generators”: implement a generation interface and alphabet policies. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Training string generators”: implement a generation interface and alphabet policies, and add a length, a seed and a requirements check. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Training string generators”: implement an interface for generating training strings with alphabet policies, a length and a seed, and a comparison of the policies on test strings, not to be used for real passwords. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 29. Grading systems {#v29}

**1. Initial level.** Create a console program “Grading systems”: implement a scale interface and numeric/letter implementations. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Grading systems”: implement a scale interface and numeric/letter implementations, and add explicitly specified training category boundaries. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Grading systems”: implement a grading scale interface with numeric and letter implementations and explicitly specified training boundaries, and a 0–100 conversion sheet without claims about official rules. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

### Variant 30. Tagged notes {#v30}

**1. Initial level.** Create a console program “Tagged notes”: implement the Taggable and Printable interfaces. Enter the initial data from the keyboard; call the operation through the interface and print the result. Ensure correct polymorphic destruction.

**2. Basic level.** Create a console program “Tagged notes”: implement the Taggable and Printable interfaces, and add Searchable and substring search. Enter the data and commands from the keyboard; print the state after the operations. Check that the concrete implementations follow the same contract, and check the empty and invalid cases.

**3. Advanced level.** Create a console project “Tagged notes”: implement the Taggable, Printable and Searchable interfaces for notes, and a notes catalog with substring search, a tag filter and a stable text report. Read data and commands until `end`; `--help` describes the format and the limits. Use narrow abstract interfaces and explicit ownership or documented non-owning references. Print a summary table; send errors to `std::cerr` and return exit code 1 on invalid input. Add tests for replacing the implementation, boundary values and preserving the invariant after a failure.

## Procedure

1. Write down the input data, the output format and the class invariants; prepare examples of ordinary, empty, boundary and invalid data.
1. Define the public interface and the responsibility of each class. Explain who owns each resource and when its lifetime ends.
1. Implement a separate console project. Validate the arguments before changing the state; send error messages to `std::cerr`.
1. Build with `/std:c++latest /EHsc /W4 /utf-8` and fix the warnings; run the prepared checks without disabling `assert`.
1. Compare the results with manual calculations. Make sure that an error does not leave an object in a state that breaks its contract.
1. Prepare a report with the code, the build command, the actual results, a table of tests and an explanation of the limitations. Commit the changes to Git.
1. At the defense, explain the chosen interface, run a new boundary case and show how a change in the requirements affects the implementation.
