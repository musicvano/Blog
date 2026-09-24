---
title: "Tasks"
description: "Topic 4. Arrays and strings: task variants"
outline: [2, 3]
sourceHash: "39b28866784bbd784d931e97c6d9976ffb4461af9bde7e795ade0ceb855e6c3e"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Gradebook {#v1}

**1. Initial level.** Create a console program that, for a rectangular array of grades for 4 students in 5 subjects (values supplied by an initializer in the program), computes and displays each student’s average, each subject’s average, and the overall group average.

**2. Basic level.** Create a console program that asks for the number of students and subjects, student surnames, subject names, and grades (0–100), validates the input, stores grades in an `int[,]` array, and displays an aligned table with each student’s average, a ranking in descending order of average grade, and the subject with the highest average.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that reads a gradebook from standard input in CSV format (first line `Surname;Subject1;…`, followed by grade rows; empty cells mean missing grades). With `--sort name|avg`, `--min-avg`, and `--subject name`, display a bordered table with row and column averages (excluding missing grades), the number of grades below 50, and students with no such grades. Report invalid lines to standard error with line numbers; exit codes: 0, 1 (some lines rejected), 2 (invalid options).

### Variant 2. Caesar cipher {#v2}

**1. Initial level.** Create a console program that encrypts the string “Привіт, Україно!” (specified in the program) using a Caesar cipher with a shift of 3 over the 33-letter Ukrainian alphabet (the alphabet string is specified in the program), preserving case and leaving other characters unchanged. Display the encrypted and decrypted strings.

**2. Basic level.** Create a console program that asks for a mode (`e` — encrypt, `d` — decrypt), a key (an integer, including negative values or values greater than 33), and text, validates the input, and encrypts or decrypts using a Caesar cipher separately for the Ukrainian and English alphabets, preserving case. Build the result in `StringBuilder`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that encrypts (`--encrypt`), decrypts (`--decrypt`), and cracks (`--crack`) text from standard input using a Caesar cipher. To crack it, compute letter frequencies in an array of 33 counters and, for each of the 33 keys, compare them with Ukrainian letter frequencies (specified in an array) using the sum of squared deviations. Display the three most likely keys with scores and the text for the best key. Report invalid options to standard error with exit code 2; `--help` displays help.

### Variant 3. Battleship {#v3}

**1. Initial level.** Create a console program that places four ships at coordinates specified in the program in a 10×10 `char[,]` array and displays the board with column headings “A”–“J” and row headings 1–10, marking ships with `#` and empty cells with `.`.

**2. Basic level.** Create a console program that places ships on a 10×10 board according to the rules (ships must not touch, even diagonally), using coordinates entered by the user in the format `B7 horizontal 3`. Validate each placement and display the board after each successful placement or the reason for rejection.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method for playing against the computer: randomly place ships (1 four-cell, 2 three-cell, 3 two-cell, 4 one-cell), checking the rules (`--seed` for reproducibility). The user fires at coordinates such as `B7`; the computer fires randomly and, after a hit, attacks neighboring cells to finish the ship. Display the player’s board and shot board side by side, automatically marking cells around sunk ships. Display hit statistics at the end. Invalid coordinates do not count as a turn.

### Variant 4. Monthly sales {#v4}

**1. Initial level.** Create a console program that, for an array of sales over 12 months (specified in the program), displays the months with the highest and lowest sales, the total, and the number of months with above-average sales.

**2. Basic level.** Create a console program that asks for sales over 12 months with input validation and displays quarterly totals, the best quarter, each month’s percentage change from the previous month, and a horizontal chart: each month has a string of `█` characters proportional to its sales (40 characters for the highest value).

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that accepts sales for several years in `year:12 comma-separated values` format and options `--chart bar|column`, `--moving-average N`. Display a table of “month — values by year — year-over-year change, %,” the N-month moving average, a linear trend (least-squares coefficients), and a vertical character bar chart built in an array of strings. Report invalid records to standard error; exit codes: 0, 1, 2.

### Variant 5. Text analysis {#v5}

**1. Initial level.** Create a console program that, for a three-sentence text specified in the program, counts sentences, words, and non-space characters, finds the longest word, and displays the words in reverse order.

**2. Basic level.** Create a console program that reads text line by line until a blank line, splits it into words ignoring punctuation and case, normalizes apostrophes, and displays the sentence count, number of distinct words, the 10 most frequent words with occurrence counts (using word and counter arrays), and average word length.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that analyzes text from standard input with `--top N`, `--min-length`, `--stop-words file_or_list`, and `--report text|table`. Display word frequencies (excluding stop words), a word-length histogram, the longest sentence, average words per sentence, and a readability index (average sentence length + average syllables per word, counting vowels as syllables). Report invalid options to standard error with exit code 2; `--help` displays help.

### Variant 6. Password strength {#v6}

**1. Initial level.** Create a console program that checks the password “Kyiv2026!” (specified in the program) for length (at least 8 characters) and the presence of uppercase and lowercase letters, digits, and special characters using `char.IsUpper`, `char.IsLower`, and `char.IsDigit`, and displays the result of each check.

**2. Basic level.** Create a console program that repeatedly asks for passwords until a blank line, computes a strength score from 0 to 5 for each (length, character types, no three identical consecutive characters, and no sequences `123`, `abc`, `qwerty`), and displays the score, its verbal label using a `switch` expression, and unmet requirements.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that generates passwords (`--generate --length N --count K --no-similar`, where `--no-similar` excludes similar characters `0O1lI`), guaranteeing every character type and shuffling the character array with the Fisher–Yates algorithm, or evaluates passwords from standard input (`--check`): entropy in bits (length · log<sub>2</sub> alphabet size), estimated cracking time, and a check against a built-in array of common passwords. Report invalid options to standard error with exit code 2; `--help` displays help.

### Variant 7. Movie theater {#v7}

**1. Initial level.** Create a console program that creates a jagged seating array for a theater with 5 rows of 8, 9, 10, 10, and 12 seats, marks several reserved seats (specified in the program), and displays a seating chart (`O` — free, `X` — occupied) with row numbers and free-seat counts for each row.

**2. Basic level.** Create a console theater reservation program using a jagged array of rows of different lengths: repeatedly display the seating chart, ask for a row and seat (or `q` to quit), check that the seat exists and is free, and reserve it. At the end, display the number of reserved seats and revenue (price depends on the row: first 3 rows — 120 UAH, others — 160 UAH).

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that models a theater configured by `--rows 8,9,10,10,12` and commands from standard input: `book row seat`, `book-group row N` (N consecutive seats closest to the row’s center), `best N` (N adjacent seats in the best available row by distance from the theater’s center), `cancel row seat`, `show`, `stats`. Report invalid commands to standard error; at the end display occupancy percentages by row.

### Variant 8. Maze {#v8}

**1. Initial level.** Create a console program that stores a 7×9 maze in an array of strings (`#` — wall, `.` — passage, `S` — start, `F` — finish, specified in the program), finds the start and finish coordinates, and displays the number of traversable cells.

**2. Basic level.** Create a console program that reads a maze line by line until a blank line (equal-length rows, exactly one `S` and one `F`), converts it to a `char[,]` array, validates it, and uses a wavefront algorithm (an `int[,]` distance array, repeated passes until stable) to determine the shortest path length from `S` to `F`, or reports that no path exists.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that reads a maze from standard input, finds the shortest path using a wavefront algorithm with a queue stored in an array of coordinates, reconstructs the path from finish to start, and displays the maze with the path marked `*`. Support `--diagonal` (allow diagonal moves), `--keys` (cells `a`–`z` open doors `A`–`Z`; the search state includes collected keys), and `--stats`. Report invalid mazes to standard error; exit codes: 0 — path found, 1 — no path, 2 — input error.

### Variant 9. Game of Life {#v9}

**1. Initial level.** Create a console program that, for a 10×10 `bool[,]` board containing a glider (specified in the program), computes each cell’s live-neighbor count and displays the board and the neighbor-count matrix.

**2. Basic level.** Create a console program that models Conway’s Game of Life on a wrapping (toroidal) board whose dimensions and initial live cells are entered by the user, and displays a specified number of generations. Compute each new generation in a separate array and stop if the board becomes empty or does not change.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that loads the initial state from standard input as rows of `.` and `O`, runs the game with `--generations`, `--rule B3/S23` (arbitrary birth and survival rules), `--wrap`, and `--delay` (display delay in ms), and detects cycles: store string representations of the last 50 generations and report the period if a state repeats. At the end, display the number of generations, maximum live-cell count, and period. Report input errors to standard error with exit code 2.

### Variant 10. Tic-tac-toe {#v10}

**1. Initial level.** Create a console program that, for a filled 3×3 `char[,]` board specified in the program, checks all rows, columns, and both diagonals and displays the winner (`X` or `O`) or a draw message.

**2. Basic level.** Create a console program for two-player tic-tac-toe on a 3×3 board: repeatedly display the board, ask for the current player’s move in `row column` format, check that the cell exists and is empty, and check for a win or draw after every move.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method for a game on an N×N board (`--size` from 3 to 15), requiring K in a row to win (`--win`), with an optional computer opponent (`--ai`). The computer first takes a winning move if possible, otherwise blocks an opponent’s win, and otherwise chooses the cell with the most potential lines. Check for a win only around the last move in four directions. Report invalid options to standard error with exit code 2; `--help` displays help.

### Variant 11. City temperatures {#v11}

**1. Initial level.** Create a console program that, for a matrix of temperatures in 4 cities over 7 days (values specified in the program, city names in a separate array), displays a table with each city’s average temperature and the warmest day of the week across all cities.

**2. Basic level.** Create a console program that asks for the number of cities and days, city names, and temperatures with input validation, stores them in a `double[,]` array, and displays a table of each city’s minimum, maximum, and average temperature, plus “anomalous” days when the temperature differs from the city’s average by more than 5 degrees.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that reads CSV data (`city;date;temperature`) in any order, builds a cities × dates matrix (missing values are `NaN`, filled with the average of neighboring days with `--fill`), and displays the table, each city’s standard deviation, the longest freezing-day period, and the pair of cities with the most similar temperatures (smallest mean absolute difference). Report invalid lines to standard error; exit codes: 0, 1, 2.

### Variant 12. Vehicle license plates {#v12}

**1. Initial level.** Create a console program that validates the license plate “АЕ 1234 КМ” (specified in the program): two letters, four digits, two letters. Display the region code (first two letters), number, and series separately.

**2. Basic level.** Create a console program that repeatedly reads license plates in any notation (spaces or hyphens, lowercase letters, Latin letters resembling Cyrillic), normalizes them to `АА 1234 АА` by replacing Latin A, B, C, E, H, I, K, M, O, P, T, X with the corresponding Cyrillic letters, and determines the region using arrays of region codes and names specified in the program.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that processes a vehicle passage log from standard input in `hh:mm plate` format, normalizes plates, rejects invalid records with messages to standard error, and displays a table of regions by passage count, plates seen more than `--repeat` times, and intervals between passages of the same vehicle. The `--mask` option hides middle digits in the report (`АЕ 12** КМ`). Exit codes: 0, 1 (records rejected), 2 (invalid options).

### Variant 13. Anagrams and palindromes {#v13}

**1. Initial level.** Create a console program that checks whether the phrase “А результатів? Вітать лузера!” (specified in the program) is a palindrome, ignoring case, spaces, and punctuation, by building a letters-only string and comparing characters from opposite ends.

**2. Basic level.** Create a console program that asks for two words or phrases and checks whether they are anagrams (ignoring case, spaces, punctuation, and apostrophe variants) by comparing sorted character arrays. If they are not anagrams, also display the missing or extra letters.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that reads a word dictionary from standard input and supports `--anagrams` (anagram groups keyed by sorted letters), `--palindromes` (palindromic words), and `--longest-palindrome text` (the longest palindromic substring using expansion from the center). Display results in tables with element counts. Report invalid options to standard error with exit code 2; `--help` displays help.

### Variant 14. Magic square {#v14}

**1. Initial level.** Create a console program that checks whether a 3×3 matrix specified in the program is a magic square: every row, column, and both diagonals have equal sums, and numbers 1 through 9 each occur once. Display all sums and the result.

**2. Basic level.** Create a console program that asks for an odd number *n* (from 3 to 15), builds an *n* × *n* magic square using the Siamese method (start in the middle of the top row, move diagonally up-right with wrapping, and move down if the cell is occupied), and displays the square, magic constant, and verification of all sums.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that builds magic squares of any order *n* ≥ 3 (`--size`): use the Siamese method for odd orders, replacement of diagonal cells for orders divisible by 4, and the LUX method for even orders not divisible by 4. With `--check`, read and validate a square from standard input. Display the square, magic constant, validation result, and, for validation, a list of rows/columns with incorrect sums. Report errors to standard error with exit code 2.

### Variant 15. Transliteration {#v15}

**1. Initial level.** Create a console program that transliterates the surname “Шевченко” (specified in the program) into Latin letters using the transliteration table approved by Ukrainian Cabinet of Ministers Resolution No. 55 of January 27, 2010 (arrays of Ukrainian letters and Latin equivalents are specified in the program), and displays the result.

**2. Basic level.** Create a console program that repeatedly transliterates entered first and last names using the official 2010 table, including special rules: “є”, “ї”, “й”, “ю”, “я” at the beginning of a word become Ye, Yi, Y, Yu, Ya, and elsewhere become ie, i, i, iu, ia; the combination “зг” becomes zgh; the soft sign and apostrophe are omitted; preserve case.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that transliterates text from standard input using the official 2010 table (`--standard kmu2010`) or a simplified URL table (`--slug`: only lowercase Latin letters, digits, and hyphens, without repeated hyphens). Build the result in `StringBuilder`; `--check-reverse` reports words that cannot be unambiguously reconstructed. Report invalid options to standard error with exit code 2; `--help` displays help.

### Variant 16. Comparing sorting algorithms {#v16}

**1. Initial level.** Create a console program that bubble-sorts an array of 10 integers specified in the program, displays the array after every pass, and compares the result with `Array.Sort`.

**2. Basic level.** Create a console program that asks for an array size, fills it with random numbers, and sorts three copies using bubble sort (stop when no swaps occur), insertion sort, and selection sort. Count comparisons and swaps for each method, and display a results table and a check that all copies are sorted identically.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that compares bubble, insertion, selection, and Shell sorts and `Array.Sort` for sizes from `--sizes 1000,5000,20000` and data types `--data random|sorted|reversed|few-unique`. For each combination, display a table of comparisons, swaps, and time (`Stopwatch`), plus checks for correctness and stability (using an array of key–original-position pairs). Report invalid options to standard error with exit code 2.

### Variant 17. Binary search {#v17}

**1. Initial level.** Create a console program that performs a binary search for a user-entered number in an array of 15 sorted numbers specified in the program, displays the search bounds at each step, and reports the found index or that the number is absent.

**2. Basic level.** Create a console program that fills an array with *n* sorted random numbers (duplicates allowed) and, for user-entered numbers, uses binary search to find their first and last positions and occurrence count, or the insertion position if absent. Compare results with `Array.BinarySearch`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that reads a sorted word dictionary from standard input (checking order with `StringComparer.Ordinal`) and answers queries supplied as arguments: exact search, prefix search (find the range of words starting with the prefix using two binary searches), and nearest word. For each query, display the result and comparison count versus linear search. Report an unsorted dictionary to standard error with exit code 2.

### Variant 18. Class schedule {#v18}

**1. Initial level.** Create a console program that stores a group’s weekly schedule in a `string[,]` array of 5 days × 6 class periods (an empty string means no class; values specified in the program), and displays the class count each day and the day with the heaviest workload.

**2. Basic level.** Create a console program that displays the schedule as a bordered table, finds gaps (empty periods between classes on the same day), counts weekly classes for each subject, and, on user request (case-insensitive subject name), displays the days and period numbers for that subject.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that reads several groups’ schedules from standard input in `group;day;period;subject; instructor;room` format, builds a three-dimensional group × day × period array, and detects conflicts: the same instructor or room assigned to different groups in the same period. Options `--group`, `--teacher`, and `--room` display a schedule for the selected entity; report conflicts to standard error with exit code 1.

### Variant 19. ASCII image {#v19}

**1. Initial level.** Create a console program that stores a 6×10 character image in a `char[,]` array specified in the program, displays it, and then displays a horizontally mirrored image created in a new array.

**2. Basic level.** Create a console program that reads an image line by line until a blank line (pad rows to equal length with spaces using `PadRight`) and, at the user’s choice, rotates it 90° clockwise, mirrors it vertically or horizontally, or inverts it (`#` ↔ space), displaying the result after every operation.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that reads a character image from standard input and applies a sequence of operations supplied as arguments: `rotate:90|180|270`, `flip:h|v`, `scale:N` (enlarge N times), `shrink:N` (reduce using the most frequent character in each block), `crop` (trim empty edges), `border:character`. Write the result to standard output and, with `--verbose`, dimensions after every operation to standard error. Unknown operations produce exit code 2.

### Variant 20. IBAN {#v20}

**1. Initial level.** Create a console program that checks the length (29 characters) and country code of the Ukrainian IBAN “UA213223130000026007233566001” specified in the program, and displays it in groups of 4 characters.

**2. Basic level.** Create a console program that asks for an IBAN (spaces allowed), removes spaces, converts it to uppercase, and verifies the checksum using the ISO 13616 algorithm: move the first 4 characters to the end, replace letters with numbers (A = 10 … Z = 35), and compute the resulting number’s remainder modulo 97 incrementally digit by digit; it must equal 1. Display the result and the IBAN in groups of 4 characters.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that validates IBANs from standard input for countries in a length table (country-code and length arrays specified in the program), computes check digits for an account number without them (`--generate UA MFO account`), and extracts the bank’s MFO code (6 digits after the check digits) and account number from Ukrainian IBANs. Display a table of “IBAN — country — status — MFO”; report invalid records to standard error; exit codes: 0, 1, 2.

### Variant 21. Arithmetic expression {#v21}

**1. Initial level.** Create a console program that uses `Split` to separate the string “12 + 7 - 3 + 40” (specified in the program) into numbers and operators, and evaluates the expression from left to right.

**2. Basic level.** Create a console program that repeatedly reads expressions containing integers and `+`, `-`, `*`, `/` without spaces (for example `12+7*3-40/5`), parses the string character by character into arrays of numbers and operators, evaluates it with precedence (multiplication and division first), and reports the position of the first invalid character or division by zero.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that evaluates expressions from arguments or standard input containing real numbers, parentheses, unary minus, and `^`, converting the expression to reverse Polish notation using the shunting-yard algorithm with array-based stacks. With `--rpn`, display the intermediate notation; with `--steps`, display the stack states at each step. Report errors (unbalanced parentheses, unknown characters) to standard error with the character position; exit codes: 0, 1, 2.

### Variant 22. Tournament standings {#v22}

**1. Initial level.** Create a console program that, for a matrix of results from a 4-team round-robin tournament (`int[,]` goals, team names in an array, values specified in the program), computes each team’s points (win — 3, draw — 1) and displays a points table.

**2. Basic level.** Create a console program that reads match results in `Team1 2:1 Team2` format until a blank line, finds team indices in the name array (add new teams using `Array.Resize`), accumulates games, wins, draws, losses, goals scored and conceded, and points, and displays standings sorted by points and goal difference.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that builds standings from results supplied through standard input with `--points 3,1,0`, `--tiebreak points,h2h,diff,goals` (criterion order; `h2h` means head-to-head points), and `--matrix` (display a team × team results cross-table). Report repeated matches between the same teams and invalid lines to standard error; exit codes: 0, 1 (some lines rejected), 2 (invalid options).

### Variant 23. Warehouse inventory {#v23}

**1. Initial level.** Create a console program that, for parallel arrays of product names, stock levels, and minimum stocks specified in the program, displays a product table marking “shortage” for products below their minimum stock, and the number of such products.

**2. Basic level.** Create a console warehouse-management program using parallel arrays: repeatedly execute `in name quantity`, `out name quantity` (no more than available stock), `list`, and `find substring` (case-insensitive search). Add new products by growing the arrays with `Array.Resize`; at the end display a report with the total number of units.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that reads inventory from a file through standard input in CSV format (`sku;name;quantity;price; minimum`) and an operation log from arguments. Check SKU uniqueness, execute operations while preventing negative stock, and display a `--report stock|deficit|value` report sorted by the selected field (`--sort`) in a bordered table. Report operation errors to standard error; exit codes: 0, 1, 2.

### Variant 24. Morse code {#v24}

**1. Initial level.** Create a console program that encodes “SOS” in Morse code using arrays of Latin letters and corresponding codes specified in the program, and displays letter codes separated by spaces.

**2. Basic level.** Create a console program that, at the user’s choice, encodes text in Morse code (Latin letters and digits; separate words with ` / `) or decodes a string of dots, dashes, spaces, and `/`, reporting characters absent from the table. Build the result in `StringBuilder`.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that encodes and decodes text from standard input in Morse code with `--alphabet latin|uk` tables (Ukrainian Morse code) and `--timing WPM`, which displays a signal timing diagram (`=` — dot, `===` — dash, pauses of 1, 3, and 7 units) and the message duration in seconds. With `--fuzzy`, decoding skips invalid codes, marking them `?`. Report invalid options to standard error with exit code 2.

### Variant 25. Minesweeper {#v25}

**1. Initial level.** Create a console program that, for a 6×8 board with mines specified in a `bool[,]` array, computes each cell’s mine count among its eight neighbors and displays the board (`*` — mine, a digit or `.` — neighboring mine count).

**2. Basic level.** Create a console Minesweeper game on an 8×8 board with 10 random mines: repeatedly display the board (unopened cells — `#`), ask for cell coordinates, and open the cell. For a cell with no neighboring mines, open its neighbors by repeatedly scanning the array while new cells are being opened. The game ends on an explosion or when all safe cells are open.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method for Minesweeper with `--rows`, `--cols`, `--mines`, and `--seed`, where the first move is always safe (place mines after the first move). Support `open`, `flag`, and `chord` (open a numbered cell’s neighbors if the required number of flags surrounds it); open empty regions using a queue stored in an array of coordinates. At the end, display game duration and move count. Invalid commands do not change the game state.

### Variant 26. CSV alignment {#v26}

**1. Initial level.** Create a console program that converts three CSV rows with separator `;` specified in the program into a table: split rows using `Split`, compute each column’s width as the greatest value length, and display aligned columns.

**2. Basic level.** Create a console program that reads CSV rows until a blank line (the user enters the delimiter), fills rows with fewer fields with empty values, and displays a bordered table using `┌─┬┐│├┼┤└┴┘`, aligning numbers right and text left.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that formats CSV from standard input, supporting quoted fields (delimiters and quotes inside fields, doubled quotes), `--delimiter`, `--header`, `--max-width N` (truncate longer values with `…`), `--align auto|left|right`, and `--style box|markdown|plain`. Report rows with an incorrect field count to standard error with line numbers; exit codes: 0, 1, 2.

### Variant 27. Polynomials {#v27}

**1. Initial level.** Create a console program that, for a polynomial with coefficients `[2, -3, 0, 5]` (the coefficient of *x*<sup>*i*</sup> has index *i*, specified in the program), displays the polynomial in conventional notation and evaluates it at *x* = 2 using Horner’s method.

**2. Basic level.** Create a console program that asks for coefficients of two polynomials (space-separated from highest to lowest degree) and displays their sum, product (an array of length *n* + *m* − 1), each polynomial’s derivative, and their values at an entered point. Write polynomials without zero terms or unnecessary signs.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that parses polynomials from argument strings in conventional notation (`3x^2 - x + 5`), performs `add`, `mul`, `div` (division with remainder), and `roots` (integer roots among divisors of the constant term and rational roots), and displays results in conventional notation. Report invalid expressions to standard error with the character position; exit codes: 0, 1, 2.

### Variant 28. Sample statistics {#v28}

**1. Initial level.** Create a console program that, for an array of 11 measurements specified in the program, computes the arithmetic mean, median (after sorting a copy), minimum, maximum, and sample range.

**2. Basic level.** Create a console program that reads numbers from one line separated by spaces or commas, skips invalid values with a message, and displays the mean, median, mode (all values with the highest frequency), variance, standard deviation, and quartiles Q1 and Q3.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that reads numeric data from standard input (one or more values per line) and, with `--bins N`, `--outliers` (values outside Q1 − 1.5·IQR and Q3 + 1.5·IQR), and `--percentiles 10,50,90`, displays descriptive statistics, a frequency table by interval with a character histogram, and a list of outliers. Report invalid values to standard error; exit codes: 0, 1, 2.

### Variant 29. Crossword {#v29}

**1. Initial level.** Create a console program that places two words, one horizontal and one vertical, specified in the program, in a 10×10 `char[,]` grid, intersecting at a shared letter, and displays the grid (empty cells — `.`).

**2. Basic level.** Create a console program that asks for words and placements in `word row column h|v` format, checks that each word stays within a 12×12 grid and intersects existing words at matching letters, and displays the grid after each successful placement or the reason for rejection.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that automatically builds a crossword from words supplied through standard input: place the longest word in the center, then each subsequent word at the position with the most intersections that creates no adjacent letters outside intersections. Display the grid, numbered “across” and “down” clues with coordinates, and a list of words that could not be placed (to standard error). The `--size` option specifies the grid size; exit codes: 0, 1, 2.

### Variant 30. Letter template {#v30}

**1. Initial level.** Create a console program that replaces fields in the letter template “Dear {Name}, your order no. {Order} totaling {Sum} UAH has shipped.” (specified in the program) with values from parallel arrays of field names and values using `StringBuilder.Replace`, and displays the letter.

**2. Basic level.** Create a console program that asks for a template (multiple lines, ending with a blank line) and a value for every `{Name}` field found in it (find fields character by character using braces; do not ask again for repeated fields), and displays the completed letter, reporting unclosed braces.

**3. Advanced level.** Use the dotnet CLI to create a console application with a `Main` method that fills a template from a file supplied through standard input for every CSV row from `--data` (the first row contains field names), supporting formats `{Sum:N2}`, default values `{Title|Customer}`, and escaping <code v-pre>&#123;&#123;</code>. Display one letter per record, separated by a `---` line; report missing fields without default values to standard error with the record number; exit codes: 0, 1, 2.

## Procedure

1. Study the theory and worked examples.
2. Determine which data in your variant should be stored in arrays (one-dimensional, rectangular, or jagged) and strings; specify each array’s element type and dimensions.
3. Create a solution and project for your task variant.
4. Implement the program for the chosen difficulty level; display arrays with `string.Join` or aligned tables and build long strings with `StringBuilder`.
5. Test with valid and invalid data and boundary cases: an empty array or string, a single element, identical elements, and extra spaces; inspect arrays in the debugger’s *Locals* window.
6. Demonstrate the program to your instructor, explain the code, and answer the review questions.
