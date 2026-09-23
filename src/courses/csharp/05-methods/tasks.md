---
title: "Tasks"
description: "Topic 5. Methods, parameters, recursion: task variants"
outline: [2, 3]
sourceHash: "ac406c2a42ccae1b14511a88bd487fa2aadd6cbb9a0cf25f478e4c4c922e138c"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Prime factors {#v1}

**1. Initial level.** Create a console program with `static bool IsPrime(int n)` and recursive method `static void PrintFactors(int n, int divisor)` that displays the prime factorization of 3,960 (specified in the program) as `2 · 2 · 2 · 3 · 3 · 5 · 11`.

**2. Basic level.** Create a console program with overloaded `Factorize` methods for `int` and `long` that return the factorization as a string in power notation (`2^3 · 3^2 · 5 · 11`) and supply the number of distinct prime factors through an `out` parameter. Repeatedly ask for numbers, validate input, and display the factorization, divisor count, and whether the number is prime.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that factorizes numbers from arguments (`long`) using a recursive method with memoized smallest prime divisors up to 10,000,000 (a sieve in an array), and displays a table of “number — factorization — divisor count — divisor sum.” Options `--gcd` and `--lcm` compute the GCD and LCM of all numbers through their factorizations. Every method has an XML comment; report invalid numbers to standard error; exit codes: 0, 1, 2.

### Variant 2. Unit converter {#v2}

**1. Initial level.** Create a console program with `static double KmToMiles(double km)`, `static double KgToPounds(double kg)`, and `static double LitersToGallons(double liters)` that displays a conversion table for values 1, 5, 10, and 42.195 of each unit.

**2. Basic level.** Create a console program with a static `Units` class containing overloaded `Convert(double value, LengthUnit from, LengthUnit to)` methods for length (units specified as strings `m`, `km`, `mi`, `ft`), with an optional `decimals` parameter for rounding. Ask for a value and units, validate input, and display the result; use named arguments in method calls.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that converts length, mass, volume, and temperature values passed as arguments in `value unit to unit` format (for example `10 mi to km`, `98.6 F to C`). Implement each category in a separate method that supplies the result through `out` and returns a `bool` indicating whether the units are supported; a shared `TryConvert` method determines the category. The `--table category` option displays a conversion-factor table. Report errors to standard error with exit code 2.

### Variant 3. Permutations and combinations {#v3}

**1. Initial level.** Create a console program with recursive method `static long Factorial(int n)` and methods `Permutations(int n, int k)` and `Combinations(int n, int k)` that displays the numbers of ordered selections and combinations of 3 from 10, and a triangle of *C*(*n*, *k*) values for *n* from 0 to 8.

**2. Basic level.** Create a console program that asks for a string of distinct characters (up to 8), recursively generates and displays every permutation using a `Swap` method with `ref` parameters, and also generates every combination of *k* characters. Verify counts with formulas and compute the factorial in a `checked` context.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that generates permutations (`--perm`), ordered selections (`--arr k`), and combinations (`--comb k`) of argument elements, with `--unique` for multisets (no duplicate results) and `--next` (the next lexicographic permutation without generating all permutations). Compute result counts using `checked` arithmetic and report overflow; `--count` displays only the count. Report errors to standard error with exit code 2.

### Variant 4. Quicksort and merge sort {#v4}

**1. Initial level.** Create a console program with recursive method `static void QuickSort(int[] a, int left, int right)` (middle element as pivot) and a `Partition` method that sorts an array of 12 numbers specified in the program and displays it before and after sorting.

**2. Basic level.** Create a console program with `QuickSort` and `MergeSort` methods (the latter using an auxiliary array) that count comparisons through a `ref` parameter. Ask for the array size, fill it with random numbers, sort two copies, check ordering with a separate `IsSorted` method, and display the comparison counts for both algorithms.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that compares recursive quicksort (pivot `--pivot first|middle|random`), merge sort, and `Array.Sort` on arrays with sizes `--sizes` and types `--data random|sorted|reversed`. Measure time with `Stopwatch`, maximum recursion depth (`depth` parameter), and comparison count, and display a table; show how quicksort recursion depth grows for ordered data. Report invalid options to standard error with code 2.

### Variant 5. Sierpiński triangle {#v5}

**1. Initial level.** Create a console program with a recursive method that fills a 16×32 character matrix with a Sierpiński triangle of order 4 (an order-*n* triangle consists of three order-*n* − 1 triangles), and a `Print(char[,] canvas)` method that displays the matrix.

**2. Basic level.** Create a console program that asks for the fractal order (from 0 to 6) and fill character, recursively builds and displays the Sierpiński triangle and carpet, and displays the number of filled cells in each fractal, computed by a separate recursive method without building the image.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that draws `--fractal triangle|carpet|cantor|h-tree` fractals of order `--order` in a character matrix and writes the result to standard output. Compute matrix size in a separate method; if it exceeds `--max-width`, report this to standard error with exit code 1. The `--count` option displays a table of element counts for orders from 0 to the specified order and verifies it using a recursive formula.

### Variant 6. Making change with coins {#v6}

**1. Initial level.** Create a console program with recursive method `CountWays(int amount, int[] coins, int index)` that computes and displays the number of ways to make 50 kopiykas using 1, 2, 5, 10, 25, and 50 kopiyka coins.

**2. Basic level.** Create a console program that asks for an amount and coin denominations, computes the number of ways to make change recursively with memoization (a `long[,]` array), displays computation times with and without memoization for amounts up to 200, and computes the minimum coin count using a separate recursive method.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that, for `--amount` and `--coins`, computes the number of ways to make change and the minimum coin count. With `--list N`, display the first N ways as `25 × 1 + 10 × 2 + 5 × 1`. The `--limit` option specifies a limited supply of each denomination. Compute `long` results with overflow checking; report errors to standard error with exit code 2.

### Variant 7. Matrix determinant {#v7}

**1. Initial level.** Create a console program with recursive method `static double Determinant(double[,] m)` that computes a determinant by expansion along the first row, and a helper `Minor` method, to display the determinant of a 3×3 matrix specified in the program.

**2. Basic level.** Create a console program that asks for a matrix order (from 1 to 7) and elements, computes the determinant using recursive row expansion and Gaussian elimination (separate methods), compares results within a tolerance, and displays the recursive-call count passed through a `ref` counter.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that reads a square matrix from standard input and, with `--method laplace|gauss`, `--inverse`, and `--solve` (the constant-term column), computes the determinant, inverse using cofactors, and system solution using Cramer’s rule. Methods have XML comments; report a singular matrix to standard error with exit code 1 and invalid input with code 2.

### Variant 8. Race results {#v8}

**1. Initial level.** Create a console program with `static int ParseTime(string text)`, which converts a race time `hh:mm:ss` to seconds, and `FormatTime(int seconds)`. For five results specified in the program, display the time in seconds, best result, and average pace per kilometer over 10 km.

**2. Basic level.** Create a console program with `bool TryParseTime(string text, out int seconds)` and `Analyze(int[] times, out int best, out int worst)`, which returns the average time. Read runners’ results in `name hh:mm:ss` format until a blank line, reject invalid records, and display a table with each participant’s pace, gap to the leader, and place.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that processes race results from standard input (`number;name;sex;year;time`) with `--distance km`, `--category` (age groups), and `--top N`. Methods with `out` parameters parse lines, compute overall and category placings (equal times receive equal places) and pace, and display results in tables. Report invalid lines to standard error with line numbers; exit codes: 0, 1, 2.

### Variant 9. Array rotation {#v9}

**1. Initial level.** Create a console program with `static void Reverse(int[] a, int from, int to)` and `RotateLeft(int[] a, int k)`, which rotates left using three reversals of array sections, to display an array of 10 numbers specified in the program after rotation by 3 positions.

**2. Basic level.** Create a console program with `Rotate(int[] a, int k, bool left = true)` (rotate by *k* positions using three reversals) and `Swap(ref int x, ref int y)`. Read an array and a sequence of `L k` / `R k` commands until a blank line, display the array after each command, and display the total swap count accumulated through a `ref` counter.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that implements three array-rotation algorithms: repeated shifts by 1, three reversals, and replacement cycles (using the GCD of the length and *k*). Count assignments through a `ref` parameter and compare algorithms for `--sizes` and `--shifts`. The `--swap-blocks a,b,c` option swaps two adjacent array blocks. Display a results table; report invalid options to standard error with exit code 2.

### Variant 10. Catalan numbers {#v10}

**1. Initial level.** Create a console program with recursive method `static long Catalan(int n)` using *C*<sub>0</sub> = 1, *C*<sub>*n*+1</sub> = Σ *C*<sub>*i*</sub>·*C*<sub>*n*−*i*</sub>, and display the first 12 Catalan numbers.

**2. Basic level.** Create a console program that asks for *n* (up to 35) and computes the *n*th Catalan number using three methods: direct recursion, recursion with memoization, and a binomial coefficient (`checked`). Display the result, recursive-call count (`ref` counter), and time for each method.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that recursively generates all balanced sequences of *n* pairs of parentheses (`--brackets n`), all parenthesizations of a product (`--products n`), and all triangulations of a convex polygon (`--triangulations n`), verifying that the result count equals the Catalan number. The `--count-only` option displays only counts for *n* from 1 to the specified value. Report invalid options to standard error with exit code 2.

### Variant 11. Escaping a maze {#v11}

**1. Initial level.** Create a console program with recursive method `static bool FindPath(char[,] maze, int row, int col)` that searches for a path from the top-left to the bottom-right corner of a 6×8 maze specified in the program (`#` — wall), marks the path with `*`, and displays the maze.

**2. Basic level.** Create a console program that reads a maze line by line until a blank line, finds `S` and `F` using a separate method with `out` parameters, and finds a path using recursive depth-first search with backtracking. Display the maze with the path, the path length, and the number of visited cells.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that uses recursive backtracking to find all simple paths (`--all`, capped by `--limit`), the shortest path (prune paths longer than the best found), and the number of distinct paths in a maze from standard input. The option `--generate W×H --seed S` generates a maze using recursive depth-first search. Control recursion depth with a parameter; report exceeding `--max-depth` to standard error with code 1.

### Variant 12. Eight queens {#v12}

**1. Initial level.** Create a console program with a recursive backtracking method for placing queens on an 8×8 board and `IsSafe(int[] queens, int row, int col)`, and find and display the first arrangement as a chessboard.

**2. Basic level.** Create a console program that asks for board size *N* (from 4 to 12), counts every arrangement of *N* queens using recursive backtracking, and displays the first arrangement and recursive-call count accumulated through a `ref` parameter.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that, for boards `--sizes 4-14`, counts queens-problem solutions using an optimized search with arrays of occupied columns and diagonals (or bit masks with `--bits`), counts unique solutions ignoring rotations and reflections (`--unique`), and measures execution time. The `--show N` option displays N solutions. Report errors to standard error with exit code 2.

### Variant 13. Sudoku {#v13}

**1. Initial level.** Create a console program with `IsValidRow`, `IsValidColumn`, and `IsValidBox` methods (parameters are an `int[,]` array and a row, column, or box number) and an `IsValid` method that checks a completed 9×9 Sudoku grid specified in the program and displays the validation result.

**2. Basic level.** Create a console program that reads Sudoku as 9 rows (0 or `.` — empty cell), validates the initial values, and solves the puzzle using recursive backtracking. Display a bordered grid and attempt count; report if no solution exists.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that solves Sudoku puzzles from standard input (multiple puzzles separated by blank lines), choosing the cell with the fewest possible values at every step, checks solution uniqueness (`--unique`), and displays a table of “number — difficulty (backtrack count) — time.” Report invalid puzzles to standard error; exit codes: 0, 1 (some puzzles unsolvable), 2.

### Variant 14. Taxpayer ID validation {#v14}

**1. Initial level.** Create a console program with `static bool IsValidTaxId(string id)` that computes the check digit for a 10-digit Ukrainian taxpayer registration number specified in the program: take the sum of the first nine digits multiplied by weights −1, 5, 7, 9, 4, 6, 10, 5, 7 modulo 11, then modulo 10.

**2. Basic level.** Create a console program with `bool TryParseTaxId(string text, out DateTime birthDate, out bool isMale)`: the first five digits are the number of days since 31.12.1899; the ninth digit is odd for males and even for females. Repeatedly read numbers, validate their format and check digit, and display date of birth, sex, and age.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method and static validation methods sharing the signature `bool Check(string id, out string error)` that checks numbers from standard input (format, check digit, valid date, age from 14 to 120), and displays “number (masked) — result — reasons.” The `--generate date sex` option generates a valid number. Exit codes: 0, 1 (invalid numbers present), 2.

### Variant 15. Sole proprietor tax {#v15}

**1. Initial level.** Create a console program with `static decimal SingleTax(decimal income, decimal rate = 0.05m)` that computes the 5% single tax on quarterly income of a group-three Ukrainian sole proprietor (specified in the program), and displays quarterly and annual tax.

**2. Basic level.** Create a console program with overloaded `CalculateTax` methods: for group three (income and an optional rate of 3 or 5%) and groups one and two (a fixed monthly amount and number of months), plus a military levy method. Specify rates, fixed amounts, and income limits as constants. Ask for the group and data and display taxes, calling methods with named arguments.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that reads a sole proprietor’s annual income log (`date;amount;currency`) from standard input, converts currency using rates from `--rates`, computes quarterly income and taxes for `--group`, checks whether the annual limit is exceeded, and compares the tax burden across groups. Pass parameters (rates, limits) as optional method parameters that can be overridden by options. Report errors to standard error; exit codes: 0, 1, 2.

### Variant 16. Date parsing {#v16}

**1. Initial level.** Create a console program with `static bool IsLeapYear(int year)` and `static int DaysInMonth(int month, int year)` that, without `DateTime`, validates 29.02.2024, 29.02.2026, 31.04.2026, and 15.13.2026 (specified in the program), and displays the result for each.

**2. Basic level.** Create a console program with `bool TryParseDate(string text, out int day, out int month, out int year)`, accepting `dd.MM.yyyy`, `yyyy-MM-dd`, and `d/M/yyyy`, and `int DayOfYear(int day, int month, int year)`. Repeatedly read dates and display the day number within the year, days remaining until year-end, and weekday computed by a separate method without `DateTime`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method and `TryParseXxx` methods with `out` results for dates, times (`hh:mm[:ss]`), and durations (`1h 30m`, `90min`, `PT1H30M`), tested on arguments and standard input. The option `--add date duration` adds a duration to a date; `--diff date1 date2` displays the difference in days, hours, and minutes. Compare results with `DateTime` using `--verify`. Report errors to standard error; exit codes: 0, 1, 2.

### Variant 17. Ackermann function {#v17}

**1. Initial level.** Create a console program with recursive method `static long Ackermann(long m, long n)` (A(0, n) = n + 1, A(m, 0) = A(m − 1, 1), A(m, n) = A(m − 1, A(m, n − 1))) that displays a value table for *m* from 0 to 3 and *n* from 0 to 4.

**2. Basic level.** Create a console program that asks for *m* (0–3) and *n* (0–10), computes the Ackermann function recursively while counting calls and maximum recursion depth through `ref` parameters, and displays the value, call count, and depth. For dangerously large arguments, warn and do not start computation.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that computes the Ackermann function in three ways: recursively, with memoization for small values, and without recursion using an explicit array-based stack, and also computes the McCarthy 91 and Takeuchi functions. For each method, display the value, call or iteration count, and maximum depth; `--max-depth` limits recursion and reports an exceeded limit to standard error with exit code 1.

### Variant 18. Fast exponentiation {#v18}

**1. Initial level.** Create a console program with two exponentiation methods: repeated multiplication in a loop and a fast recursive algorithm (*x*<sup>*n*</sup> = (*x*<sup>*n*/2</sup>)<sup>2</sup>), each supplying the multiplication count through an `out` parameter. Display results for 3<sup>20</sup> using both methods.

**2. Basic level.** Create a console program with overloaded `Power` methods for `long` (with overflow checking) and `double` (including negative exponents), and `PowerMod(long x, long n, long mod)`. Ask for the base, exponent, and modulus, validate input, and display results and multiplication counts for recursive and iterative versions.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that implements fast modular exponentiation for `long` without overflow (modular multiplication using addition or `Math.BigMul`), the Miller–Rabin primality test for numbers from arguments, and computation of the *n*th Fibonacci number modulo a value by exponentiating a 2×2 matrix. The `--steps` option displays algorithm steps. Report errors to standard error with exit code 2.

### Variant 19. Geometric shapes {#v19}

**1. Initial level.** Create a console program with overloaded `Area` methods in a static `Geometry` class: `Area(double radius)` for a circle, `Area(double width, double height)` for a rectangle, and `Area(double a, double b, double c)` for a triangle (Heron’s formula). Display areas of shapes with dimensions specified in the program.

**2. Basic level.** Create a console program with a static `Geometry` class containing overloaded `Area` and `Perimeter` methods for circles, rectangles, and triangles, plus `bool TryTriangle(double a, double b, double c, out double area)`. Ask for the shape type and dimensions through a menu, check that the shape exists, and display results with an optional decimal-place parameter.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that processes shapes from arguments in `circle:r`, `rect:w:h`, `tri:a:b:c`, and `poly:x1,y1;x2,y2;…` formats (polygon area by the shoelace formula), computes area, perimeter, and incircle and circumcircle radii where possible using overloaded methods, and displays a table with total area. Pass `--units` and `--decimals` to methods as named arguments; report invalid shapes to standard error; exit codes: 0, 1, 2.

### Variant 20. Robot on a grid {#v20}

**1. Initial level.** Create a console program with recursive method `static long CountPaths(int rows, int cols)` that counts routes from the top-left to the bottom-right corner when a robot can move only right or down, and displays results for grids from 2×2 to 6×6.

**2. Basic level.** Create a console program that asks for grid dimensions (up to 18×18) and obstacle coordinates, computes the route count recursively with memoization (a `long[,]` array, −1 means not computed), compares with direct recursion for grids up to 12×12, and displays recursive-call counts for both.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that, for a grid from standard input (`.` — free, `#` — obstacle, digits — cell cost), computes the route count and minimum-cost route and displays that route on the grid. The `--moves right,down,diag` option specifies permitted moves, and `--max-length` limits route length. Implement memoization in a separate method with array parameters; report invalid grids to standard error with code 2.

### Variant 21. Integer partitions {#v21}

**1. Initial level.** Create a console program with recursive method `static int CountPartitions(int n, int max)` that counts ways to write a number as a sum of positive integers (order does not matter), and displays partition counts for numbers from 1 to 20.

**2. Basic level.** Create a console program that asks for *n* (up to 30) and recursively displays all partitions of *n* with terms in nonincreasing order (`5 = 3 + 1 + 1`), using an array of current terms and a depth parameter. Also display the partition count computed by a memoized method.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that generates partitions with constraints: `--distinct` (distinct terms), `--odd` (odd terms), `--parts k` (exactly k terms), `--max m` (terms no greater than m). Verify Euler’s theorem (the number of partitions into distinct terms equals the number into odd terms) for *n* up to the specified value and display a count table. Report invalid options to standard error with exit code 2.

### Variant 22. Recursive string reversal {#v22}

**1. Initial level.** Create a console program with recursive methods `static string Reverse(string s)` and `static int CountChar(string s, char c, int index)` that, for the string “recursion” specified in the program, displays the reversed string and the number of “r” letters.

**2. Basic level.** Create a console program that repeatedly reads sentences and, using recursive methods without loops, displays the sentence with word order reversed, each word reversed, the vowel count, and the string with repeated adjacent characters removed. A blank line ends the program.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that processes strings from standard input using recursive methods with index parameters (without creating substrings): check balanced brackets `()[]{}`, find the longest common prefix of arguments, recursively compress `aaabcc` → `a3bc2`, and decompress `a3bc2`. Compare timing against iterative implementations for strings of length `--length`. Report errors to standard error with exit code 2.

### Variant 23. Nim {#v23}

**1. Initial level.** Create a console program with `static bool IsWinning(int[] heaps)` (the XOR of heap sizes is nonzero) and `static void BestMove(int[] heaps, out int heap, out int take)` that displays a winning move for heaps of 3, 4, and 5 specified in the program.

**2. Basic level.** Create a console human-versus-computer Nim game: the user enters heap sizes, players take turns removing any number of objects from one heap, and whoever takes the last object wins. Choose the computer’s move with a method using `out` parameters; validate the human move with `TryReadMove`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method in which the computer chooses a move using recursive search with memoized positions (for `--variant subtract:1,3,4`, the permitted removal counts) or the XOR formula for the classic game. Verify that search and the formula produce the same result for every position up to `--max`. The `--misere` option changes the rule so the last player to take loses. Report errors to standard error with exit code 2.

### Variant 24. Binary strings {#v24}

**1. Initial level.** Create a console program with recursive method `static void Generate(string prefix, int length)` that displays all binary strings of length 5 without consecutive ones, and a method that counts them.

**2. Basic level.** Create a console program that asks for length *n* (up to 25) and recursively generates strings without consecutive ones, strings with equal numbers of zeros and ones, and Gray codes of length *n*. Display the first 20 strings of each kind and their counts (verified by formulas).

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that generates binary strings of length `--length` with constraints `--no "11,000"` (forbidden substrings), `--ones k` (exactly k ones), and `--palindrome`, using recursive generation with pruning. Also count them using recursion memoized by state (position, suffix). Compare results; report invalid options to standard error with code 2.

### Variant 25. Weather station {#v25}

**1. Initial level.** Create a console program with `Average(double[] values)`, `Max(double[] values, out int index)`, and `CountBelow(double[] values, double limit = 0)` that, for a week’s temperatures specified in the program, displays the average, maximum with its weekday, and number of freezing days.

**2. Basic level.** Create a console program with a static `Weather` class containing overloaded analysis methods for a weekly temperature array (`double[]`) and a matrix for several weeks (`double[,]`): average, range, and warmest day or week through `out` parameters. Read and validate data and display a report.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that processes hourly temperature, humidity, and pressure measurements from standard input, groups them by day and week using methods, computes statistics with overloaded methods (`params double[]` for arbitrary series), and displays a report with records and days with sharp pressure changes (`--pressure-drop`). Report invalid lines to standard error; exit codes: 0, 1, 2.

### Variant 26. Knapsack problem {#v26}

**1. Initial level.** Create a console program with recursive method `static int Best(int[] weights, int[] values, int index, int capacity)` that, for 5 items (weights and values specified in the program) and a knapsack capacity of 10 kg, displays the maximum total value.

**2. Basic level.** Create a console program that reads items in `name weight value` format until a blank line and the knapsack capacity, computes maximum value recursively with memoization (`int[,]`), reconstructs the chosen item set with a separate method, and displays an item table, total weight and value, and recursive-call count.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that solves the knapsack problem for items from standard input using three methods: exhaustive recursive search, recursion with memoization, and a greedy algorithm by value-to-weight ratio. Compare results and timing; `--unbounded` allows taking an item multiple times. The `--capacity` option is required; report errors to standard error with code 2.

### Variant 27. Department hierarchy {#v27}

**1. Initial level.** Create a console program in which a company structure is specified by parallel arrays of department names, parent department indices (−1 for the root), and employee counts, and display an indented tree using recursive method `PrintTree(int node, int level)`.

**2. Basic level.** Create a console program with recursive methods that, for a company structure read as `name;parent;employees;payroll` lines, compute each department’s total employee count and payroll including subdepartments, the tree depth, and the path from the root to a department whose name the user enters.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that reads a hierarchy from standard input, validates it recursively (one root, no cycles, existing parents), displays a tree with `├──` and `└──` branches, branch totals, and the deepest department. With `--move node new_parent`, move a branch while checking for cycles. Report errors to standard error; exit codes: 0, 1, 2.

### Variant 28. Knight’s move {#v28}

**1. Initial level.** Create a console program with `static bool IsValidMove(int row, int col, int[,] board)` and a method that displays every possible knight move from `b1` on an empty 8×8 board in chess notation.

**2. Basic level.** Create a console program that asks for board size (5–8) and a starting cell, finds a knight’s tour using recursive backtracking (visit every cell once), and displays the board with move numbers and the recursive-call count, or reports that no tour exists.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that finds knight’s tours on boards up to 30×30 using Warnsdorff’s heuristic (move to the cell with the fewest onward moves), with recursive backtracking at dead ends. Check for a closed tour (`--closed`) and compare the backtrack count against exhaustive search for small boards. Display the result as a board or move list (`--format board|moves`); report errors to standard error with code 2.

### Variant 29. Delivery cost {#v29}

**1. Initial level.** Create a console program with overloaded `Cost` methods in a static `Delivery` class: for a document (page count), parcel (weight in kg), and cargo (weight and volume). Display delivery costs for examples specified in the program.

**2. Basic level.** Create a console program with a static `Delivery` class containing overloaded `Cost` methods for parcels and cargo with optional parameters `express = false`, `insuranceValue = 0`, and `courier = false`, plus `TryReadWeight`. Ask for the shipment type and parameters, validate input, and display a cost breakdown; use named arguments in calls.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that computes shipment costs from standard input (`type;weight;dimensions;distance;options`) using a tariff table from `--tariffs`, volumetric weight (length × width × height / 4000), discounts for multiple shipments (a `params` totals method), and rounding to kopiykas with `decimal`. Display a table with totals; report invalid lines to standard error; exit codes: 0, 1, 2.

### Variant 30. Flood fill {#v30}

**1. Initial level.** Create a console program with recursive method `static void Fill(char[,] image, int row, int col, char oldChar, char newChar)` that fills a region of an 8×12 character image specified in the program, starting at a specified cell, and displays the image before and after.

**2. Basic level.** Create a console program that reads a character image line by line until a blank line, asks for coordinates and a fill character, performs recursive flood fill using 4-connectivity or 8-connectivity (an optional method parameter), and displays the result, number of changed cells (returned by the method), and number of separate regions in the image.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that fills a character image from standard input recursively and without recursion (an explicit stack in an array of coordinates), compares maximum recursion depth and stack size for large regions (`--generate W×H`), and finds all connected regions with their areas and boundaries (`--regions`). If recursion depth exceeds `--max-depth`, do not run the recursive version and report this to standard error.

## Procedure

1. Study the theory and worked examples.
2. Divide your variant’s problem into methods: define each method’s name, parameters, passing modes, and return type; the main program should only call methods.
3. Create a solution and project for your task variant.
4. Implement the methods for the chosen difficulty level; document public methods with `///` XML comments.
5. Test every method with normal and boundary values; for recursive methods, inspect the *Call Stack* window and ensure recursion terminates.
6. Demonstrate the program to your instructor, explain the code, and answer the review questions.
