---
title: "Tasks"
description: "Topic 16. Packaging and typing: task variants"
outline: [2, 3]
sourceHash: "52dd7f7709d178a8a8dd2820a322894ba4ed9b367ca0887b96904989726622e3"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

All levels use Python 3.14 and annotations. Publishing to PyPI/TestPyPI is not a mandatory requirement.

## Variants

### Variant 1. Generic stack {#v1}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a generic `Stack[T]` class with the methods `push`, `pop`, and `len`; `pop` on an empty stack raises `IndexError`. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a generic `Stack[T]` class with the methods `push`, `pop`, and `len`; `pop` on an empty stack raises `IndexError`. Add iteration from the top without modifying the stack. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a generic `Stack[T]` class with the methods `push`, `pop`, and `len`; `pop` on an empty stack raises `IndexError`. Add iteration from the top without modifying the stack. A console command reads a JSON array of integers, builds a `Stack[int]`, and writes the stack to a JSON file, checking the element types. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 2. LRU cache {#v2}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a generic `LRU[K, V]` cache with a capacity of 1–1000 and the methods `put` and `get`; `get` refreshes recency, and a missing key raises `KeyError`. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a generic `LRU[K, V]` cache with a capacity of 1–1000 and the methods `put` and `get`; `get` refreshes recency, and a missing key raises `KeyError`. Add hit and miss counters and an eviction test. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a generic `LRU[K, V]` cache with a capacity of 1–1000 and the methods `put` and `get`; `get` refreshes recency, and a missing key raises `KeyError`. Add hit and miss counters and an eviction test. A console command reads the capacity and a sequence of `put`/`get` operations from a JSON file and prints the `get` results and hit statistics. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 3. Unit converter {#v3}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing typed functions for converting meters, centimeters, and kilometers for finite values of 0–1e6. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing typed functions for converting meters, centimeters, and kilometers for finite values of 0–1e6. Add a console command that accepts a value, a source unit, and a target unit and prints the converted value. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing typed functions for converting meters, centimeters, and kilometers for finite values of 0–1e6. Add a console command that accepts a value, a source unit, and a target unit and prints the converted value. The command also converts a CSV file of values with units into a new CSV file and prints a report of invalid rows. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 4. Priority queue {#v4}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a generic `PriorityQueue[T]` with an integer priority of 0–100: a lower priority is served first, and equal priorities are served in FIFO order. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a generic `PriorityQueue[T]` with an integer priority of 0–100: a lower priority is served first, and equal priorities are served in FIFO order. Add cancellation of an element by a unique positive identifier. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a generic `PriorityQueue[T]` with an integer priority of 0–100: a lower priority is served first, and equal priorities are served in FIFO order. Add cancellation of an element by a unique positive identifier. A console command performs queue operations from a JSON file, prints the service order, and saves the queue to JSON without changing the order. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 5. Route graph {#v5}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a generic `Graph[N]` class for an undirected graph over hashable vertices without duplicate edges. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a generic `Graph[N]` class for an undirected graph over hashable vertices without duplicate edges. Add a BFS path search between two vertices that returns a list of vertices or `None` if there is no path. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a generic `Graph[N]` class for an undirected graph over hashable vertices without duplicate edges. Add a BFS path search between two vertices that returns a list of vertices or `None` if there is no path. A console command reads vertices and edges from a JSON file, accepts two vertices, and prints a report on the path found. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 6. Entity repository {#v6}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a generic protocol `Repository[T]` (`Protocol`) with the methods `get` and `add`: keys are unique integers, and `get` returns `T` or `None`. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a generic protocol `Repository[T]` (`Protocol`) with the methods `get` and `add`: keys are unique integers, and `get` returns `T` or `None`. Add an in-memory implementation and tests that work through the protocol. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a generic protocol `Repository[T]` (`Protocol`) with the methods `get` and `add`: keys are unique integers, and `get` returns `T` or `None`. Add an in-memory implementation and tests that work through the protocol. Add an SQLite implementation for books (integer key, title) and a test of transaction rollback on a key conflict; a console command adds books and looks them up by key. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 7. Configuration validator {#v7}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing an `Options` type (`TypedDict`) with the fields `mode` (`short` or `full`) and `limit` (1–100) and a JSON validation function without `cast`. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing an `Options` type (`TypedDict`) with the fields `mode` (`short` or `full`) and `limit` (1–100) and a JSON validation function without `cast`. Add a console command that reads a JSON file and prints the accepted options or a precise message about unknown and missing keys. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing an `Options` type (`TypedDict`) with the fields `mode` (`short` or `full`) and `limit` (1–100) and a JSON validation function without `cast`. Add a console command that reads a JSON file and prints the accepted options or a precise message about unknown and missing keys. The command also checks all JSON files in a directory in batch mode without modifying them and prints a report for each file. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 8. Numeric matrix {#v8}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a generic `Matrix[T: (int, float)]` class for nonempty rectangular data with a method for row sums. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a generic `Matrix[T: (int, float)]` class for nonempty rectangular data with a method for row sums. Add addition of matrices of the same shape and transposition. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a generic `Matrix[T: (int, float)]` class for nonempty rectangular data with a method for row sums. Add addition of matrices of the same shape and transposition. A console command reads two matrices from a JSON file, rejects NaN and incompatible shapes, and prints the sum, the transposed matrices, and the row sums. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 9. Event bus {#v9}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a generic `EventBus[T]` class: subscribing `Callable[[T], None]` handlers, unsubscribing, and calling them in subscription order. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a generic `EventBus[T]` class: subscribing `Callable[[T], None]` handlers, unsubscribing, and calling them in subscription order. Add publishing through a copy of the handler list so that subscription changes take effect from the next event. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a generic `EventBus[T]` class: subscribing `Callable[[T], None]` handlers, unsubscribing, and calling them in subscription order. Add publishing through a copy of the handler list so that subscription changes take effect from the next event. A console command publishes events from a JSON file and writes a log of the call sequence to JSON; add a test for repeated subscription. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 10. Binary tree {#v10}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a generic binary search tree with finite `int` keys and values of any type; a repeated key updates the value. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a generic binary search tree with finite `int` keys and values of any type; a repeated key updates the value. Add lookup by key and iteration in ascending key order. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a generic binary search tree with finite `int` keys and values of any type; a repeated key updates the value. Add lookup by key and iteration in ascending key order. A console command imports “key, value” pairs from a JSON file and prints the records in ascending key order and the value found; add a test of a degenerate tree with 100 records. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 11. CSV reports {#v11}

**1. Initial level.** Create an src package with `pyproject.toml`, a README, and a console command that reads a CSV file with `name,amount` rows (a nonempty name and an integer amount of 0–1e6) and prints totals by name. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml`, a README, and a console command that reads a CSV file with `name,amount` rows (a nonempty name and an integer amount of 0–1e6) and prints totals by name. Add sorting of the totals and a separate report of rows with errors. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml`, a README, and a console command that reads a CSV file with `name,amount` rows (a nonempty name and an integer amount of 0–1e6) and prints totals by name. Add sorting of the totals and a separate report of rows with errors. The command also exports the totals to CSV and does not overwrite an existing file without the `--overwrite` flag. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 12. Result type {#v12}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a `Result[T, E]` type as a union of the `Ok` and `Err` dataclasses and a `parse_int` function that returns the result of parsing a string without raising an exception. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a `Result[T, E]` type as a union of the `Ok` and `Err` dataclasses and a `parse_int` function that returns the result of parsing a string without raising an exception. Add a `map` method that transforms a successful result and preserves an error. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a `Result[T, E]` type as a union of the `Ok` and `Err` dataclasses and a `parse_int` function that returns the result of parsing a string without raising an exception. Add a `map` method that transforms a successful result and preserves an error. A console command parses lines from a file in batch mode and prints a JSON report of successful values and errors. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 13. Paginator {#v13}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a generic `Page[T]` class and a `paginate` function for a list: a page size of 1–100, page numbers starting from 1, and an empty page when out of range. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a generic `Page[T]` class and a `paginate` function for a list: a page size of 1–100, page numbers starting from 1, and an empty page when out of range. Add the `total` and `pages` fields and tests of the last incomplete page. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a generic `Page[T]` class and a `paginate` function for a list: a page size of 1–100, page numbers starting from 1, and an empty page when out of range. Add the `total` and `pages` fields and tests of the last incomplete page. A console command reads a JSON array, a page size, and a page number and prints the page as JSON or a message about invalid parameters. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 14. Budget tracker {#v14}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a class for tracking income and expenses in integer kopiykas of 1–1e8; an expense cannot exceed the balance. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a class for tracking income and expenses in integer kopiykas of 1–1e8; an expense cannot exceed the balance. Add a console command and a history of operations with unique identifiers. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a class for tracking income and expenses in integer kopiykas of 1–1e8; an expense cannot exceed the balance. Add a console command and a history of operations with unique identifiers. Also create a PySide6 GUI for entering operations and viewing the balance, a resource with initial settings, and a PyInstaller build. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr; the GUI shows errors without terminating. Verify the wheel in a clean environment, the resources, and running from another directory; publishing to a registry is not required.

### Variant 15. Ring buffer {#v15}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a generic `RingBuffer[T]` class with a capacity of 1–1000: in a full buffer, a new element evicts the oldest one. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a generic `RingBuffer[T]` class with a capacity of 1–1000: in a full buffer, a new element evicts the oldest one. Add iteration from the oldest element and `overload` access by index and by slice. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a generic `RingBuffer[T]` class with a capacity of 1–1000: in a full buffer, a new element evicts the oldest one. Add iteration from the oldest element and `overload` access by index and by slice. A console command loads the capacity and elements from a JSON file and exports the final contents of the buffer to JSON. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 16. Dictionary with history {#v16}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a generic `VersionedDict[K, V]` dictionary with the methods `set`, `delete`, and `undo`; `undo` without history returns `False`. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a generic `VersionedDict[K, V]` dictionary with the methods `set`, `delete`, and `undo`; `undo` without history returns `False`. Add restoration of the previous value and of a deleted key during `undo`. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a generic `VersionedDict[K, V]` dictionary with the methods `set`, `delete`, and `undo`; `undo` without history returns `False`. Add restoration of the previous value and of a deleted key during `undo`. A console command executes `set`/`delete`/`undo` commands from a file and prints the contents of the dictionary; add a test of an `undo` sequence back to the initial state. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 17. Report formatters {#v17}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a `Formatter[T]` protocol and two formatters, a tabular one and a line-based one, for a list of `Book(title, year)`. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a `Formatter[T]` protocol and two formatters, a tabular one and a line-based one, for a list of `Book(title, year)`. Add a console command that reads books from a JSON file, checks that the year is 1500–2100, and prints them with the selected formatter. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a `Formatter[T]` protocol and two formatters, a tabular one and a line-based one, for a list of `Book(title, year)`. Add a console command that reads books from a JSON file, checks that the year is 1500–2100, and prints them with the selected formatter. Add a registry of formatters by name without executing external code; the command accepts a formatter name from the registry. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 18. Workout timer {#v18}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a model of a timer with a duration of 1–3600 s: the operations `start`, `pause`, and `reset` and an injected time source. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a model of a timer with a duration of 1–3600 s: the operations `start`, `pause`, and `reset` and an injected time source. Add a console command that simulates the passage of time without real waiting and prints the remaining time. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a model of a timer with a duration of 1–3600 s: the operations `start`, `pause`, and `reset` and an injected time source. Add a console command that simulates the passage of time without real waiting and prints the remaining time. Also create a PySide6 GUI with a `QTimer` that shows the remaining time, a JSON settings resource, and a PyInstaller build. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr; the GUI shows errors without terminating. Verify the wheel in a clean environment, the resources, and running from another directory; publishing to a registry is not required.

### Variant 19. Intervals {#v19}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a generic `Interval[T]` class for `int` or `float` with the condition `left <= right` and the intersection of closed intervals. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a generic `Interval[T]` class for `int` or `float` with the condition `left <= right` and the intersection of closed intervals. Add a collection of intervals with a search for all intervals containing a given point. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a generic `Interval[T]` class for `int` or `float` with the condition `left <= right` and the intersection of closed intervals. Add a collection of intervals with a search for all intervals containing a given point. A console command reads intervals from a JSON file, accepts a point, and prints the intervals containing it; add a test for touching boundaries. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 20. Sample statistics {#v20}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing typed `min`, `max`, and `mean` functions for 1–1000 finite numbers within ±1e6. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing typed `min`, `max`, and `mean` functions for 1–1000 finite numbers within ±1e6. Add the population variance and tests for a single-element sample. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing typed `min`, `max`, and `mean` functions for 1–1000 finite numbers within ±1e6. Add the population variance and tests for a single-element sample. A console command reads numbers from a CSV file and prints a JSON report of the statistics with an explicit `ddof=0`. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 21. Processing pipeline {#v21}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a generic `Pipeline[In, Out]` class over `Callable` with a `run` method that applies the pipeline steps to an input value. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a generic `Pipeline[In, Out]` class over `Callable` with a `run` method that applies the pipeline steps to an input value. Add typed composition via `then` and an example `str → int → float` pipeline. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a generic `Pipeline[In, Out]` class over `Callable` with a `run` method that applies the pipeline steps to an input value. Add typed composition via `then` and an example `str → int → float` pipeline. A console command passes lines from a file through the pipeline and prints the results and the index of a failed conversion. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 22. Multiset {#v22}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a generic multiset `Bag[T]` over hashable elements: the methods `add`, `count`, and `remove`; removing a missing element raises `KeyError`. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a generic multiset `Bag[T]` over hashable elements: the methods `add`, `count`, and `remove`; removing a missing element raises `KeyError`. Add iteration with repetitions and `len` as the sum of multiplicities. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a generic multiset `Bag[T]` over hashable elements: the methods `add`, `count`, and `remove`; removing a missing element raises `KeyError`. Add iteration with repetitions and `len` as the sum of multiplicities. A console command reads two text files and prints a comparison of their word frequencies. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 23. Task scheduler {#v23}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a generic task queue `TaskQueue[T]` with integer time points of 0–86400 and FIFO order for equal time points. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a generic task queue `TaskQueue[T]` with integer time points of 0–86400 and FIFO order for equal time points. Add selection of all tasks ready at a given time point without real waiting. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a generic task queue `TaskQueue[T]` with integer time points of 0–86400 and FIFO order for equal time points. Add selection of all tasks ready at a given time point without real waiting. A console command imports a schedule from a JSON file, simulates time, and prints a task execution log. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 24. TOML settings {#v24}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a typed configuration with the fields `host` (a nonempty string) and `port` (1–65535) read from a TOML file via `tomllib`. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a typed configuration with the fields `host` (a nonempty string) and `port` (1–65535) read from a TOML file via `tomllib`. Add a console command for checking the file that reports unknown keys and invalid types. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a typed configuration with the fields `host` (a nonempty string) and `port` (1–65535) read from a TOML file via `tomllib`. Add a console command for checking the file that reports unknown keys and invalid types. The command also produces a batch report for several configurations without network access. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 25. Expenses CLI {#v25}

**1. Initial level.** Create an src package with `pyproject.toml`, a README, and a console command for adding an expense that accepts a category of 1–30 characters and an amount in positive integer kopiykas and prints the accepted record. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml`, a README, and a console command for adding an expense that accepts a category of 1–30 characters and an amount in positive integer kopiykas and prints the accepted record. Add storage in SQLite and a total by category; test with a temporary database. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml`, a README, and a console command for adding an expense that accepts a category of 1–30 characters and an amount in positive integer kopiykas and prints the accepted record. Add storage in SQLite and a total by category; test with a temporary database. The command also exports expenses to CSV; add a test of transaction rollback after an error. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 26. Category tree {#v26}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a generic `Tree[T]` tree without cycles and a depth-first traversal generator. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a generic `Tree[T]` tree without cycles and a depth-first traversal generator. Add a search for the first node matching a predicate and breadth-first traversal. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a generic `Tree[T]` tree without cycles and a depth-first traversal generator. Add a search for the first node matching a predicate and breadth-first traversal. A console command reads a tree from a JSON file, checks that the depth is at most 100, and prints the nodes in the selected traversal order. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 27. Bidirectional dictionary {#v27}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a generic bidirectional dictionary `BiMap[K, V]` with unique hashable keys and values; a conflict raises `ValueError`. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a generic bidirectional dictionary `BiMap[K, V]` with unique hashable keys and values; a conflict raises `ValueError`. Add an atomic update and lookup in both directions. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a generic bidirectional dictionary `BiMap[K, V]` with unique hashable keys and values; a conflict raises `ValueError`. Add an atomic update and lookup in both directions. A console command executes add, update, and lookup commands from a file; add a check that the dictionary is unchanged after a conflict. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 28. Product inventory {#v28}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a `Product` class (a unique code, a name, and a quantity of 0–1e6) and a typed product repository. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a `Product` class (a unique code, a name, and a quantity of 0–1e6) and a typed product repository. Add an SQLite CRUD implementation with key conflict checks. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a `Product` class (a unique code, a name, and a quantity of 0–1e6) and a typed product repository. Add an SQLite CRUD implementation with key conflict checks. Also create a PySide6 GUI for viewing and editing products and a PyInstaller build; store the database outside the resources. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr; the GUI shows errors without terminating. Verify the wheel in a clean environment, the resources, and running from another directory; publishing to a registry is not required.

### Variant 29. Typed decorator {#v29}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a `logged[**P, T]` decorator that prints function calls and preserves the function's signature and result type `Callable[P, T]`. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a `logged[**P, T]` decorator that prints function calls and preserves the function's signature and result type `Callable[P, T]`. Add a retry decorator only for an explicitly specified exception, with 1–5 attempts and no delay in tests. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a `logged[**P, T]` decorator that prints function calls and preserves the function's signature and result type `Callable[P, T]`. Add a retry decorator only for an explicitly specified exception, with 1–5 attempts and no delay in tests. A console command demonstrates both decorators on a sample function; add a negative mypy test for an invalid argument. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

### Variant 30. Geometry library {#v30}

**1. Initial level.** Create an src package with `pyproject.toml` and a README containing a `Shape` protocol (the methods `area` and `perimeter`) and the `Circle` and `Rectangle` classes with positive finite dimensions. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a local wheel, and demonstrate importing the package after installing it outside the source directory.

**2. Basic level.** Create an src package with `pyproject.toml` and a README containing a `Shape` protocol (the methods `area` and `perimeter`) and the `Circle` and `Rectangle` classes with positive finite dimensions. Add a console command that reads shapes from a JSON file and prints their areas and perimeters; test the formulas with `pytest.approx`. Annotate the API, add pytest tests for normal, boundary, and invalid cases, build a wheel, and verify a clean installation. Make sure `mypy --strict` and Ruff report no errors; demonstrate a negative type check in a separate file.

**3. Advanced level.** Create an src package with `pyproject.toml` and a README containing a `Shape` protocol (the methods `area` and `perimeter`) and the `Circle` and `Rectangle` classes with positive finite dimensions. Add a console command that reads shapes from a JSON file and prints their areas and perimeters; test the formulas with `pytest.approx`. Add a registry of shape types and a report of total areas and perimeters without `eval`. Add at least five pytest scenarios, `mypy --strict`, Ruff, and local CI commands. The CLI has `--help`, exit codes 0/2, and errors in stderr. Verify the wheel in a clean environment and running from another directory; publishing to a registry is not required.

## Procedure

1. Describe the API, units, constraints, and error behavior.
2. Create an src project with pyproject.toml and a README.
3. Implement the domain code separately from input and the interface.
4. Test normal, boundary, and invalid input with pytest.
5. Run mypy and Ruff; explain the fixes rather than hiding them.
6. Build a wheel and verify it in a clean environment outside the sources.
7. For the advanced level, complete the variant's additional requirement and CI; test the GUI build with its resources from another directory.
8. In the report, include the structure, code, commands, versions, results, a negative type check, and the known limitations of the learning model.
