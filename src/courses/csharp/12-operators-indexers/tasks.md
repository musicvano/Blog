---
title: "Tasks"
description: "Topic 12. Operators and indexers: task variants"
outline: [2, 3]
sourceHash: "d8e4858cf03f8edd7c17d01dea0ee7d817cc6016a9c052c57d42f597a4cdac3a"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Angles {#v1}

**1. Initial level.** Create an `Angle` structure with an angle in degrees, normalization to the range [0; 360), and the `+` and `-` operators. The console program calculates and prints the sum and difference of several angles.

**2. Basic level.** Create an `Angle` structure (degrees normalized to [0; 360)) with the operators `+` and `-`, multiplication by a number, the comparisons `==`, `!=`, `<`, and `>` (consistent with `Equals` and `IComparable<Angle>`), and an explicit conversion to `double` radians. The console program calculates the heading after a series of entered turns and prints the sorted angles.

**3. Advanced level.** Create an angle library with degrees, minutes, and seconds, parsing of a `47°30'15"` string, an implicit conversion from `double`, and operators. A dotnet CLI application calculates the azimuths of a route from standard input and prints the turn at each point; errors go to `Console.Error`.

### Variant 2. 3D vectors {#v2}

**1. Initial level.** Create a `Vector3` structure (x, y, z) with the operators `+` and `-` and multiplication by a number on either side. The console program calculates and prints the sum of several forces acting on a body.

**2. Basic level.** Create a `Vector3` structure (x, y, z) with the operators `+`, `-`, and `==`/`!=`, multiplication by a number, dot and cross products, length, normalization, and an `[int axis]` indexer (0 is x, 1 is y, 2 is z) with bounds checking. From three entered points, the console program prints the area of the triangle and the normal to the plane.

**3. Advanced level.** Create a 3D geometry library with vectors, points, and operators between them (the difference of points is a vector; a point + a vector is a point). A dotnet CLI application calculates the volume of a tetrahedron and the distance from a point to a plane for data from standard input; errors go to `Console.Error`.

### Variant 3. Ring buffer {#v3}

**1. Initial level.** Create a `RingBuffer` class of integers with a fixed capacity, an `Add` method that evicts the oldest element, and a read-only indexer where index 0 is the oldest element. The console program adds more elements than the capacity and prints the buffer.

**2. Basic level.** Create a `RingBuffer` class with a fixed capacity (the `Add` method evicts the oldest element), a `Count` property, an indexer with bounds checking, indexes from the end (`buffer[^1]`), and a `Slice` method for ranges. The console program stores the last 10 entered measurements and prints the moving average of the last three.

**3. Advanced level.** Create a ring buffer library with extension methods for statistics (minimum, maximum, median) and an `extension` block with an `IsFull` property. A dotnet CLI application processes a stream of numbers from standard input and prints anomalies that deviate from the moving average; errors go to `Console.Error`.

### Variant 4. Exchange rate time series {#v4}

**1. Initial level.** Create a `RateSeries` class for a currency exchange rate with an indexer by `DateOnly` date that returns and sets the rate. The console program fills in the rates for a week and prints the rate for the entered date.

**2. Basic level.** Create a `RateSeries` class of daily exchange rates with indexers by `DateOnly` date and by day number, a `-` operator on two series (the daily difference in rates), and multiplication of a series by a number. The console program prints the change in the rate over a period and the difference between two currencies.

**3. Advanced level.** Create a time series library with gap filling and extension methods for the moving average and maximum drawdown. A dotnet CLI application processes a CSV of rates from standard input and prints a report for the period from the arguments; errors go to `Console.Error`.

### Variant 5. Rating points {#v5}

**1. Initial level.** Create a `Score` structure with a value of 0–100 and a `+` operator that does not exceed 100 (saturation). The console program adds several bonuses to a score and prints the result.

**2. Basic level.** Create a `Score` structure with a value of 0–100, the `+` and `-` operators saturating at the bounds, comparison, an implicit conversion from `int` with range checking, and an explicit conversion to `double`. The console program awards points to students for the entered activities and prints a ranking.

**3. Advanced level.** Create a rating library with `checked` operators (overflow throws an exception) and regular ones (saturation) and a custom `+=` compound assignment. A dotnet CLI application processes a log of awards from standard input in `--strict` or regular mode; errors go to `Console.Error`; exit codes: 0, 1, 2.

### Variant 6. Big integer {#v6}

**1. Initial level.** Create a `BigNumber` class that stores the digits of a nonnegative number in an array, with a constructor from a string, a `+` operator, and `ToString`. The console program adds two entered 30-digit numbers and prints the sum.

**2. Basic level.** Create a `BigNumber` class for a nonnegative big integer (digits in an array, a constructor from a string) with the operators `+` and `*`, comparison, an indexer for a digit by position, and an implicit conversion from `long`. The console program calculates and prints the factorial of 50 and the Fibonacci numbers up to the 200th.

**3. Advanced level.** Create a library of signed big integers `BigNumber` (digits in an array, string parsing) with the operators `+`, `-`, and `*`, division with remainder (`/`, `%`), comparison, and `IComparable<BigNumber>`. A dotnet CLI application evaluates an expression with two operands and an operator from arguments and checks the result with `System.Numerics.BigInteger`; errors go to `Console.Error`.

### Variant 7. Track durations {#v7}

**1. Initial level.** Create a `Duration` structure with minutes and seconds and a `+` operator that carries seconds over into minutes. The console program calculates and prints the total duration of an album’s tracks.

**2. Basic level.** Create a `Duration` structure (minutes, seconds) with the operators `+` and `-`, multiplication by an integer, comparison, the `true`/`false` operators (a nonzero duration), and parsing of a `3:45` string. From the entered tracks, the console program builds and prints a playlist of a given duration.

**3. Advanced level.** Create a media library with a duration, track records, and extension methods for arrays of tracks (total duration, longest track). A dotnet CLI application splits tracks from standard input between the two sides of a vinyl record with the minimum difference in duration; errors go to `Console.Error`.

### Variant 8. Temperature {#v8}

**1. Initial level.** Create a `Celsius` structure with the `+` and `-` operators for temperature differences and comparison. The console program calculates and prints the average and maximum temperatures for a week.

**2. Basic level.** Create the structures `Celsius`, `Fahrenheit`, and `Kelvin` with explicit and implicit conversions between the scales and an absolute zero check (an exception). The console program converts the entered temperatures from the given scale to the other two and prints the result.

**3. Advanced level.** Create a temperature library in which operators between different scales work through conversions, plus extension methods for `double` (`25.0.Celsius`). A dotnet CLI application processes measurements in different scales from standard input and prints statistics; errors go to `Console.Error`.

### Variant 9. Character set {#v9}

**1. Initial level.** Create a `CharSet` class with a `bool this[char c]` indexer for checking and changing whether a character belongs to the set. The console program builds a set of vowels and prints the vowels of an entered word.

**2. Basic level.** Create a `CharSet` character set class with a `bool this[char c]` indexer, the operators `|` (union), `&` (intersection), `-` (difference), and `==`/`!=`, and an implicit conversion from a string. The console program compares the sets of letters of two entered words and prints the common and differing letters.

**3. Advanced level.** Create a character set library for the entire Unicode BMP based on a bit array, with a `^` operator and extension methods for strings. A dotnet CLI application finds words from standard input that consist only of letters from a given set; errors go to `Console.Error`.

### Variant 10. Luggage lockers {#v10}

**1. Initial level.** Create a `LockerBank` class with a string indexer `["B3"]` (the row is a letter, the number is a number) that returns and sets the contents of a locker. The console program puts in and takes out several items and prints the state of the lockers.

**2. Basic level.** Create a `LockerBank` luggage locker class with indexers by label `["B3"]` and by row and number, label validation with an exception, and a search for a free locker. The console program serves customers through the entered commands: put in, take out, show free lockers.

**3. Advanced level.** Create a luggage locker library with lockers of different sizes, rates, and storage times, and extension methods for reports. A dotnet CLI application processes an event log from standard input and prints the revenue and occupancy; errors go to `Console.Error`.

### Variant 11. Weekly timetable {#v11}

**1. Initial level.** Create a `Timetable` class with a `[DayOfWeek day, int pair]` indexer that returns and sets the name of a course. The console program fills in the timetable for a week and prints it.

**2. Basic level.** Create a `Timetable` class with the indexers `[DayOfWeek day, int pair]` and `["Mon", 2]`, which return the name of a course, validation of class period numbers, and a `ToUkrainianShort` extension method for `DayOfWeek` (Ukrainian short day names). The console program prints the timetable for the week as a table and the free periods.

**3. Advanced level.** Create a timetable library with even and odd weeks, an indexer by date and period number, and a check for classroom conflicts. A dotnet CLI application prints the timetable for the date from the arguments; errors go to `Console.Error`.

### Variant 12. Phone book {#v12}

**1. Initial level.** Create a `PhoneBook` class with a string indexer by name that returns and sets a phone number. The console program adds several contacts and prints the number for the entered name.

**2. Basic level.** Create a `PhoneBook` class with indexers by name (with handling of a missing name) and by entry number, and extension methods for `string`: normalizing and formatting a phone number. The console program adds contacts and looks up a number by name through a menu.

**3. Advanced level.** Create a contacts library with several numbers per contact, a `[name, kind]` indexer, and an `extension` block with an `IsMobile` property for a number string. A dotnet CLI application imports contacts from standard input and prints a normalized directory; errors go to `Console.Error`.

### Variant 13. Array extensions {#v13}

**1. Initial level.** Create a static class with extension methods for `int[]`: `Sum`, `Average`, and `Print`. The console program applies them to several arrays and prints the results.

**2. Basic level.** Create extension methods for `double[]`: `Shuffle(Random random)`, `ChunkBy(int size)`, and `IsSorted`. The console program shuffles an entered array with a fixed seed, splits it into groups of a given size, checks whether it is sorted, and prints the results.

**3. Advanced level.** Create a library of array extensions with an `extension` block (the properties `IsEmpty` and `Middle` and a static `Range` method) and classic methods. A dotnet CLI application applies operations from arguments to numbers from standard input; errors go to `Console.Error`.

### Variant 14. Duration extensions {#v14}

**1. Initial level.** Create the extension methods `Minutes()` and `Hours()` for `int`, which return a `TimeSpan`, and a `ToUkrainian()` method for `TimeSpan` that formats a duration with Ukrainian unit abbreviations (like `1 h 30 min`). The console program prints several durations.

**2. Basic level.** Create the extension methods `int.Minutes()`, `int.Hours()`, and `double.Seconds()`, which return a `TimeSpan`, as well as `TimeSpan.RoundTo(TimeSpan step)`, `TimeSpan.ToUkrainian()`, and parsing of strings like `1 h 30 min`. The console program totals durations entered in different formats and prints the rounded sum.

**3. Advanced level.** Create a library of extensions in `extension` blocks with a `TimeSpan.IsWorkingDay` property (no more than 8 h) and a static `TimeSpan.ParseUkrainian` method. A dotnet CLI application processes a timesheet from standard input and prints overtime; errors go to `Console.Error`.

### Variant 15. Colors {#v15}

**1. Initial level.** Create a `Color` structure with RGB channels (0–255) and a `+` operator that saturates at 255. The console program mixes several colors and prints the result.

**2. Basic level.** Create a `Color` structure with RGB channels, a `+` operator that saturates at 255, multiplication by a brightness factor, channel indexers `[0..2]` and `["R"]`, the `==`/`!=` operators, and an implicit conversion from `uint` (`0xRRGGBB`). The console program builds and prints a gradient between two entered colors.

**3. Advanced level.** Create a color library with an alpha channel, compositing with the `*` operator according to the “source over” rule, and an explicit conversion to grayscale. A dotnet CLI application composites color layers from standard input and prints the result; errors go to `Console.Error`.

### Variant 16. Quaternions {#v16}

**1. Initial level.** Create a `Quaternion` structure with four components, the `+` and `*` operators, and `ToString`. The console program shows that multiplication is not commutative by printing `a * b` and `b * a`.

**2. Basic level.** Create a `Quaternion` structure (w, x, y, z) with the operators `+`, `*`, `/`, and `==`/`!=`, conjugation, the norm, and the inverse quaternion. The console program checks and prints the identities i² = j² = k² = ijk = −1.

**3. Advanced level.** Create a rotation library: a quaternion from an axis and an angle, rotation of a 3D point, and composition of rotations with the `*` operator. A dotnet CLI application rotates points from standard input by a sequence of rotations from arguments; errors go to `Console.Error`.

### Variant 17. Electrical quantities {#v17}

**1. Initial level.** Create the structures `Voltage`, `Current`, and `Resistance` with a `/` operator that returns a `Current` according to Ohm’s law (`Voltage / Resistance`). The console program calculates and prints the current in a circuit from the entered voltage and resistance.

**2. Basic level.** Create the structures `Voltage`, `Current`, `Resistance`, and `Power` with Ohm’s law operators (`Voltage / Resistance`, `Current * Resistance`, `Voltage * Current` → `Power`), addition of like quantities, and explicit conversions to `double`. The console program calculates a simple circuit from the entered data and prints the current, voltage, and power.

**3. Advanced level.** Create a library of electrical quantities with prefixes (mA, kΩ), string parsing, and calculation of series and parallel connections. A dotnet CLI application calculates a circuit described on standard input; errors go to `Console.Error`.

### Variant 18. Shopping cart {#v18}

**1. Initial level.** Create a `Cart` class with a string indexer by SKU that returns and sets the quantity of a product. The console program fills the cart and prints its contents.

**2. Basic level.** Create a `Cart` class with a string indexer for the quantity by SKU (a quantity of 0 removes the product; a negative one throws an exception) and extension methods for the cart, `Total` and `MostExpensive`, based on a price list. The console program executes the customer’s entered commands and prints the cart and the total.

**3. Advanced level.** Create a shopping cart library with prices in a money structure with operators, discounts, and an `extension` block with an `IsFreeDelivery` property. A dotnet CLI application processes orders from standard input and prints a receipt; errors go to `Console.Error`.

### Variant 19. Bit array {#v19}

**1. Initial level.** Create a fixed-length `Bits` class with a `bool this[int i]` indexer based on a `ulong` array. The console program sets several bits and prints the values of the bits being checked.

**2. Basic level.** Create a fixed-length `Bits` class based on a `ulong` array with a `bool this[int i]` indexer, the operators `&`, `|`, `^`, `~`, and `==`/`!=`, a property for the number of set bits, and `ToString` as a string of 0s and 1s. The console program implements the sieve of Eratosthenes and prints the primes up to the entered limit.

**3. Advanced level.** Create a library of variable-length bit arrays with support for `^1` and ranges and an implicit conversion from a string. A dotnet CLI application evaluates bitwise expressions from arguments; errors go to `Console.Error`.

### Variant 20. Sparse vector {#v20}

**1. Initial level.** Create a `SparseVector` class that stores only nonzero elements in arrays of indexes and values, with an indexer for reading and writing. The console program fills in several elements of a vector of length 1,000,000 and prints them.

**2. Basic level.** Create a `SparseVector` class (nonzero elements in arrays of indexes and values, an indexer) with a `+` operator, multiplication by a number, a dot product, and the number of nonzero elements. The console program compares memory use and results with a dense `double[]` array and prints them.

**3. Advanced level.** Create a library of sparse vectors and matrices with an `[i, j]` indexer and matrix-vector multiplication. A dotnet CLI application solves the PageRank problem for a graph from standard input; errors go to `Console.Error`.

### Variant 21. Numeric intervals {#v21}

**1. Initial level.** Create an `Interval` structure with lower and upper bounds and an `&` operator (intersection). The console program finds and prints the intersection of several entered intervals.

**2. Basic level.** Create an `Interval` structure with bounds and the operators `&` (intersection), `|` (union of overlapping intervals), and `+` (shift by a number), comparison, and a `Contains` method. The console program merges the entered busy intervals and prints the result.

**3. Advanced level.** Create an interval arithmetic library (`+`, `-`, `*`, `/` on intervals) that takes open and closed bounds into account. A dotnet CLI application calculates the interval of values of an expression for input data with errors from standard input; errors go to `Console.Error`.

### Variant 22. Histogram {#v22}

**1. Initial level.** Create a `Histogram` class with a given number of bins on the interval [a; b] and an indexer by bin number. The console program fills the histogram with random numbers using a fixed seed and prints the counts in the bins.

**2. Basic level.** Create a `Histogram` class with a given number of bins on an interval, indexers by bin number and by a `double` value, a `+` operator for merging histograms with the same bounds, and output with asterisks. The console program compares and prints the histograms of two samples.

**3. Advanced level.** Create a histogram library with extension methods for `double` arrays (`ToHistogram`) and normalization. A dotnet CLI application builds a histogram of numbers from standard input with the number of bins from the arguments; errors go to `Console.Error`.

### Variant 23. Spreadsheet {#v23}

**1. Initial level.** Create a `Sheet` class with a string indexer `["B3"]` that stores cell numbers. The console program fills in several cells and prints the table.

**2. Basic level.** Create a `Sheet` class of numeric cells with the indexers `["B3"]` and `[row, col]`, address validation, and a range sum method `Sum("A1:B3")`. The console program executes the entered assignment and sum commands and prints the table.

**3. Advanced level.** Create a spreadsheet library with formulas such as `=A1+B2*2`, recalculation of dependent cells, and detection of circular references. A dotnet CLI application processes commands from standard input and prints the table; errors go to `Console.Error`.

### Variant 24. Dual numbers {#v24}

**1. Initial level.** Create a `Dual` structure (a + bε, ε² = 0) with the operators `+`, `-`, and `*`. The console program calculates and prints the product of two dual numbers.

**2. Basic level.** Create a `Dual` structure for dual numbers (a + bε, ε² = 0) with the operators `+`, `-`, `*`, and `/`, an implicit conversion from `double`, and the functions `Sin` and `Exp`. The console program calculates the value and derivative of the function f(x) = x³ + sin x at the entered point.

**3. Advanced level.** Create an automatic differentiation library based on dual numbers and Newton’s method for solving equations. A dotnet CLI application finds the roots of several functions, with the function chosen in the arguments, and compares the derivatives with numerical ones; errors go to `Console.Error`.

### Variant 25. Modular arithmetic {#v25}

**1. Initial level.** Create a `ModInt` structure with modulus 7 and the operators `+`, `-`, and `*`. The console program prints the multiplication table modulo 7.

**2. Basic level.** Create a `ModInt` structure with an arbitrary prime modulus, the operators `+`, `-`, `*`, and `/` (through the inverse element), exponentiation, and a check that the moduli match. The console program solves the entered linear congruence ax ≡ b (mod p) and prints x.

**3. Advanced level.** Create a modular arithmetic library with an implicit conversion from `long`, `checked` operators, and simple RSA on small numbers. A dotnet CLI application encrypts and decrypts numbers from standard input; errors go to `Console.Error`.

### Variant 26. Grading scales {#v26}

**1. Initial level.** Create the structures `Points100` (0–100) and `Grade5` (2–5) with an explicit conversion `Points100` → `Grade5`. The console program converts several scores into grades and prints them.

**2. Basic level.** Create the structures `Points100` (0–100) and `Grade5` (2–5) with an explicit conversion `Points100` → `Grade5`, an implicit conversion `Grade5` → `Points100` (the lower bound), comparison operators, and conversion to an ECTS grade. The console program prints a students’ grade sheet on three scales.

**3. Advanced level.** Create a grading scale library with configurable boundaries and extension methods for arrays of scores. A dotnet CLI application converts a grade sheet from standard input between the scales from the arguments; errors go to `Console.Error`.

### Variant 27. Percentages {#v27}

**1. Initial level.** Create a `Percent` structure with a multiplication operator `decimal * Percent` that returns a share of an amount. The console program calculates the discount for several prices and prints the discounted prices.

**2. Basic level.** Create a `Percent` structure with the operators `decimal * Percent` and `+`, an implicit conversion from `decimal`, an explicit conversion to `double`, parsing of a `12,5 %` string, and comparison. The console program calculates and prints the price after several entered discounts.

**3. Advanced level.** Create a financial calculation library with `Percent`, extension methods for `decimal` (`AddPercent`, `PercentOf`), and compound interest. A dotnet CLI application calculates a savings schedule using parameters from the arguments; errors go to `Console.Error`.

### Variant 28. Game board {#v28}

**1. Initial level.** Create a `Grid` class with a two-dimensional `[x, y]` indexer of characters. The console program fills a 10×10 board with walls and empty cells and prints it.

**2. Basic level.** Create a `Grid` character board class with the indexers `[x, y]` and by a `Point` structure with bounds checking, a `Print` extension method, and a search for neighboring cells. The console program implements a flood fill from the entered point and prints the board.

**3. Advanced level.** Create a game board library with toroidal indexes (going past an edge wraps to the opposite side) and an `extension` block for `char` (`IsWall`, `IsFree`). A dotnet CLI application finds the shortest path in a maze from standard input; errors go to `Console.Error`.

### Variant 29. Money in kopecks {#v29}

**1. Initial level.** Create a `Kopecks` structure with a `long` value (the amount in kopecks) and the `+` and `-` operators. The console program calculates the total of purchases and prints it in hryvnias and kopecks.

**2. Basic level.** Create a `Kopecks` structure with a `long` value (the amount in kopecks) with the operators `+` and `-` and their `checked` versions, multiplication by an integer, comparison, and parsing of a `12,50` string. The console program shows the difference in the operators’ behavior in `checked` and `unchecked` contexts.

**3. Advanced level.** Create a wallet class with custom compound operators `+=` and `-=` (C# 14) that do not create a new object and check for an insufficient balance. A dotnet CLI application processes a million operations from standard input and compares the running time with regular operators; errors go to `Console.Error`.

### Variant 30. Audio samples {#v30}

**1. Initial level.** Create a `Signal` class with an array of `double` samples, an indexer, and a multiplication operator by a number (volume). The console program prints the samples of a sine wave before and after changing the volume.

**2. Basic level.** Create a `Signal` class with an array of samples, an indexer that supports `^1` and ranges, the operators for multiplication by a number and `+` (mixing signals of different lengths), and the methods `Peak` and `Rms`. The console program mixes two tones, normalizes the result, and prints the peak and RMS.

**3. Advanced level.** Create a signal processing library with effects (echo, fade) as extension methods and saving in WAV format. A dotnet CLI application generates a melody from notes on standard input into a WAV file; errors go to `Console.Error`.

## Procedure

1. Study the theory and worked examples.
2. For your variant, determine which operators have an obvious meaning and which conversions can be implicit; justify your choice.
3. Create a solution and project; put each type and each static extension class in a separate file.
4. Implement the types for the chosen difficulty level; keep `==` consistent with `Equals` and `GetHashCode`, and check bounds in indexers.
5. Test the operators on boundary values (zero, negative numbers, mismatched sizes) and the indexer values in the *Watch* window.
6. Demonstrate the program to the instructor, explain the code, and answer the review questions.
