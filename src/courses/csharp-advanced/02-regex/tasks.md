---
title: "Tasks"
description: "Topic 2. Regular expressions: task variants"
outline: [2, 3]
sourceHash: "a039563e7754a64252bc68e8ad5d65c935e9793434bdfac0ddf8c1bf33b7f64c"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. Phone numbers {#v1}

**1. Initial level.** Create a console program that uses the `Regex.Matches` method to find Ukrainian phone numbers in the formats `+380XXXXXXXXX`, `0XX XXX XX XX`, and `0XX-XXX-XX-XX` in a text defined in the program and displays each number in the `+380XXXXXXXXX` format.

**2. Basic level.** Create a console program that asks the user for the path to a contacts file (lines `name; phone`), validates each phone number with a pattern with named groups for the operator code and the subscriber number, normalizes valid numbers with the `Replace` method to the `+38 (0XX) XXX-XX-XX` format, and displays a table of contacts and, separately, the numbers of lines with errors.

**3. Advanced level.** Use the dotnet CLI to create a console application that takes the path to a contacts file (lines `name; phone`) and the options `--output file`, `--format e164|national`, and `--help`, normalizes the phone numbers and writes the result to the output file, and writes an error report (line number, value, reason: too few digits, unknown country code, invalid characters) to the error stream. Exit codes: 0—success, 1—there are invalid lines, 2—argument error. Declare the patterns with the `[GeneratedRegex]` attribute and cover them with xUnit tests.

### Variant 2. License plates {#v2}

**1. Initial level.** Create a console program that checks an array of strings defined in the program against the format of a Ukrainian license plate, "two letters, four digits, two letters" (`АА1234ВВ`), where the letters can only be `А В Е І К М Н О Р С Т Х`, and displays the result of checking each string.

**2. Basic level.** Create a console program that asks for license plates until an empty line is entered, allows spaces and look-alike Latin letters (`AA 1234 BB`), converts the number to uppercase Cyrillic letters without spaces, extracts the region code, digits, and series with named groups, and displays a table of plates sorted by region code.

**3. Advanced level.** Use the dotnet CLI to create a console application that reads a parking entry log (lines `dd.mm.yyyy hh:mm; plate`, the `--log` option) and a directory of region codes (`code; oblast`, the `--regions` option), groups vehicles by oblast, and displays an "oblast – vehicles – share, %" table with a total. The `--region CODE` option leaves one oblast in the report; unrecognized records are written to the error stream; exit codes 0, 1 (there are unrecognized records), 2 (argument error); `--help` displays usage information.

### Variant 3. Web server log {#v3}

**1. Initial level.** Create a console program that finds the client IP address and response code in five web server log lines in Common Log Format defined in the program and displays them in pairs.

**2. Basic level.** Create a console program that asks for the path to a web server log file, parses each line with a pattern with named groups (IP address, date, method, path, code, size), and displays a table of the number of requests for each response code, the total amount of data transferred, and the number of unrecognized lines.

**3. Advanced level.** Use the dotnet CLI to create a console application `logstat` that analyzes a web server log file in Common Log Format with the options `--from` and `--to` (period bounds `dd.mm.yyyy hh:mm`), `--top N`, and `--status 4xx|5xx|code`. The application validates IP addresses (four numbers 0–255), displays tables of the N most active IP addresses and paths with the number of requests and share, and writes unrecognized lines to the error stream. The pattern has a timeout; argument errors return code 2; `--help` displays usage information.

### Variant 4. Shopping list from recipes {#v4}

**1. Initial level.** Create a console program that finds ingredient lines in the format `name – quantity unit` (for example, `flour – 250 g`, `eggs – 2 pcs.`) in a recipe text defined in the program and displays a "name – quantity – unit" table.

**2. Basic level.** Create a console program that reads a recipe from a file, asks the user for the number of servings in the recipe and the required number of servings, recognizes quantities with a decimal comma and fractions `1/2`, recalculates them with the `Replace` method and a `MatchEvaluator`, rounding to one decimal place, and displays the new recipe.

**3. Advanced level.** Use the dotnet CLI to create a console application that takes several recipe files with servings (`borscht.txt:6 salad.txt:2`), parses ingredient lines `name – quantity unit` with regular expressions, combines identical products (case-insensitively) into one shopping list, converts `kg`/`g` and `l`/`ml` to a common unit, and displays a table with a total. The `--output` option writes the list to a file; unrecognized lines are written to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests for the ingredient pattern.

### Variant 5. SRT subtitles {#v5}

**1. Initial level.** Create a console program that finds the time lines `00:01:02,500 --> 00:01:05,000` in a fragment of an SRT subtitle file defined in the program and displays the start time, end time, and duration of each subtitle in milliseconds.

**2. Basic level.** Create a console program that reads an SRT file, asks for an offset in milliseconds (which can be negative), shifts all timestamps with the `Replace` method and a `MatchEvaluator` (time cannot become negative), writes a new file, and displays the number of changed subtitles.

**3. Advanced level.** Use the dotnet CLI to create a console application `srtshift` with the options `--shift ms`, `--from number` (shift starting from the specified subtitle), `--fps 25:23.976` (recalculate time for a different frame rate), and `--check`. The check mode displays a table of problems: broken numbering, end before start, overlapping subtitles. Argument and format errors are written to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests for parsing and formatting time.

### Variant 6. Bank statement {#v6}

**1. Initial level.** Create a console program that finds the date, description, and amount in statement lines `17.09.2026 Café -125,40 UAH` defined in the program and displays the total expenses and income calculated with the `decimal` type.

**2. Basic level.** Create a console program that reads a statement from a file, recognizes signed amounts with spaces between digit groups (`-1 250,40`), determines the transaction category by keywords (patterns with `IgnoreCase`, for example `pharmacy|medicine` → "Health"), and displays a table of amounts by category with a total.

**3. Advanced level.** Use the dotnet CLI to create a console application that takes a bank statement file (lines `dd.mm.yyyy description amount UAH`), a category rules file (`pattern; category`), and the options `--month mm.yyyy` and `--csv file`. An invalid pattern in the rules is reported with its line number. The application displays a report by category with the share of expenses, writes a CSV with a period as the decimal separator, and writes unrecognized statement lines to the error stream; exit codes 0, 1, 2; `--help`.

### Variant 7. Hashtags and mentions {#v7}

**1. Initial level.** Create a console program that finds all hashtags (`#` followed by letters of any language, digits, or `_`) and mentions (`@` and a user name) in the text of a post defined in the program and displays them in two separate lists.

**2. Basic level.** Create a console program that reads a file of posts (one post per line), builds a case-insensitive frequency dictionary of hashtags, and displays the 10 most popular ones with their counts. The `#` and `@` characters inside URLs and email addresses are not counted (lookbehind).

**3. Advanced level.** Use the dotnet CLI to create a console application that reads a file of posts in the format `dd.mm.yyyy; author; text` and takes the options `--top N`, `--min-count K`, `--since dd.mm.yyyy`, and `--mentions`. The application displays a table of hashtags (or mentions) with counts and shares and the pair of hashtags that most often occur together. Lines in the wrong format are written to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests for the hashtag pattern.

### Variant 8. School timetable {#v8}

**1. Initial level.** Create a console program that finds the day, start and end times, subject, class, and room in timetable lines `Mon 08:30-09:15 Math 7-A room 21` defined in the program and displays them as a table.

**2. Basic level.** Create a console program that reads a timetable from a file, checks the format of each line with a pattern and the validity of the times (`TimeOnly.TryParse`, end later than start), asks for a class, and displays its timetable ordered by day and time, as well as a list of lines with errors.

**3. Advanced level.** Use the dotnet CLI to create a console application that reads a school timetable file (lines `Mon 08:30-09:15 Math 7-A room 21`) and looks for clashes: one room or one class at the same time. The `--class`, `--room`, and `--day` options narrow the report. The application displays a table of clashes and a table of room usage in hours per week; invalid lines are written to the error stream; exit codes 0 (no clashes), 1 (there are clashes), 2 (argument error); `--help`.

### Variant 9. Chemical formulas {#v9}

**1. Initial level.** Create a console program that, for formulas defined in the program (`H2O`, `CO2`, `NaCl`, `C6H12O6`), finds the elements and the number of atoms with the pattern `(?<el>[A-Z][a-z]?)(?<n>\d*)` and displays the composition of each formula.

**2. Basic level.** Create a console program that asks for a chemical formula, checks the allowed characters with an anchored pattern, counts the atoms of each element taking into account single-level parentheses (`Ca(OH)2`), and calculates the molar mass using a table of atomic masses defined in the program.

**3. Advanced level.** Use the dotnet CLI to create a console application that accepts formulas with water of crystallization (`CuSO4·5H2O`) and nested brackets (`K4[Fe(CN)6]`), reads atomic masses from a file (`--masses`), and with the `--percent` option displays the mass fractions of the elements. An unknown element or unbalanced brackets are reported to the error stream with the position; exit codes 0, 1, 2; `--help`; xUnit tests for formula parsing.

### Variant 10. Bibliography {#v10}

**1. Initial level.** Create a console program that finds the publication year (four digits from 1900 to the current year) and the number of pages (`320 с.` or `320 p.`) in bibliography entries defined in the program and displays them for each source.

**2. Basic level.** Create a console program that reads a list of sources from a file, checks each entry with patterns for the presence of an author (`Surname I. B.`), title, city, year, and number of pages, and displays the list of missing elements for each entry.

**3. Advanced level.** Use the dotnet CLI to create a console application that reads a bibliography file formatted according to DSTU 8302, sorts the sources by the surname of the first author, finds duplicates (the same author and title, ignoring case and extra spaces), and with the `--style apa` option converts the entries to APA style with the `Replace` method and groups. The error report is written to the error stream; the `--output` option writes the list to a file; exit codes 0, 1, 2; `--help`.

### Variant 11. IBAN {#v11}

**1. Initial level.** Create a console program that checks an array of strings defined in the program against the format of a Ukrainian IBAN: `UA`, two check digits, six digits of the bank code, and 19 account digits (29 characters), with optional spaces between groups of four characters, and displays the result for each string.

**2. Basic level.** Create a console program that asks for an IBAN, removes spaces, checks the format with a pattern and the checksum with the mod 97 algorithm (ISO 13616), and displays the bank code and account number from named groups and the masked form `UA21 **** **** 1234`.

**3. Advanced level.** Use the dotnet CLI to create a console application that finds all IBANs in a text file of payment orders, verifies their checksums, masks valid numbers in the output file (`--output`), and marks invalid ones. The `--bank code` option filters the "IBAN – bank code – status" report with totals. Errors are written to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests for IBAN validation.

### Variant 12. GPS coordinates {#v12}

**1. Initial level.** Create a console program that finds pairs of decimal coordinates `48.2082, 16.3738` in a text defined in the program and displays the latitude and longitude of each pair.

**2. Basic level.** Create a console program that asks for coordinates in the degrees, minutes, and seconds format `48°12'29.5"N 16°22'25.7"E`, parses them with a pattern with named groups, checks the ranges (minutes and seconds less than 60, latitude up to 90°, longitude up to 180°), and displays decimal coordinates with six decimal places.

**3. Advanced level.** Use the dotnet CLI to create a console application that reads a route file with points in different formats (decimal, DMS, and `N48 12.492 E16 22.428`), converts them to decimal coordinates, and calculates the distance between adjacent points with the haversine formula and the total route length. The `--units km|mi` option; a table of points and distances; unrecognized lines to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests for format parsing.

### Variant 13. INI files {#v13}

**1. Initial level.** Create a console program that finds section names `[name]` and `key=value` pairs in the text of an INI file defined in the program and displays the keys indented under the name of their section.

**2. Basic level.** Create a console program that reads an INI file, skips comments (lines starting with `;` or `#`) and empty lines, builds a `section.key → value` dictionary, reports lines in the wrong format and duplicate keys within a section, asks for a key, and displays its value.

**3. Advanced level.** Use the dotnet CLI to create a console application `ini` that works with an INI file specified as an argument and has the commands `get section.key`, `set section.key=value`, `list`, and the `--check` option. The `set` command changes only the required line of the file (`Replace` with `Multiline`), preserving comments and line order; values can contain `${section.key}` substitutions, and circular references are detected. Errors are written to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests.

### Variant 14. PGN chess games {#v14}

**1. Initial level.** Create a console program that finds the move numbers and White's and Black's moves in a chess move string `1. e4 e5 2. Nf3 Nc6 3. Bb5 a6` defined in the program and displays them as a table.

**2. Basic level.** Create a console program that reads a PGN file, collects the header tags `[Event "…"]` into a dictionary, parses moves in algebraic notation (piece, capture `x`, square, promotion `=Q`, castling `O-O`, check `+`, checkmate `#`), and displays the number of moves, captures, and checks for each player.

**3. Advanced level.** Use the dotnet CLI to create a console application that processes a PGN file with several games, removes `{…}` comments and variations in parentheses, takes the options `--player name` and `--result 1-0|0-1|1/2-1/2`, and displays a "game – White – Black – result – moves – captures" table and statistics of first moves. Invalid moves are reported to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests.

### Variant 15. Weather reports {#v15}

**1. Initial level.** Create a console program that finds temperatures (`+12 °C`, `-3°C`) and wind speeds (`5 m/s`) in a weather report text defined in the program and displays the minimum and maximum temperature.

**2. Basic level.** Create a console program that reads a file of reports (a line per day: date, day and night temperature, wind with direction `NW 7 m/s`, optional precipitation `2.5 mm`), parses the lines with a pattern with optional groups, and displays a table with the average temperature and total precipitation.

**3. Advanced level.** Use the dotnet CLI to create a console application that parses METAR aviation weather reports (`UKBB 171230Z 24005MPS 9999 SCT030 18/09 Q1016`): airfield, time, wind, visibility, cloud cover, temperature, dew point, and pressure. The `--file` and `--station` options; a table of reports; unrecognized groups are written to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests for each METAR group.

### Variant 16. Cooking units {#v16}

**1. Initial level.** Create a console program that finds quantities with the abbreviations "tbsp" and "tsp" (`2 tbsp`, `1.5 tsp`) in a recipe text defined in the program and displays each quantity with its unit.

**2. Basic level.** Create a console program that reads a recipe from a file and uses the `Replace` method with a `MatchEvaluator` to replace quantities in tablespoons, teaspoons, and cups with grams for the product named after the unit (a "product – grams per unit" table is defined in the program): "2 tbsp sugar" → "50 g sugar"; unknown products are left unchanged and listed.

**3. Advanced level.** Use the dotnet CLI to create a console application that replaces quantities in tablespoons, teaspoons, and cups with grams or vice versa (`--direction grams|spoons`) in a recipe text from a file, using a "product – grams per unit" table from a file (`--table`), recognizes fractions `1/2`, ranges `2–3`, and the word "half", and writes the result to a file (`--output`). The replacement report is displayed as a table, and unknown products are written to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests.

### Variant 17. Markdown links {#v17}

**1. Initial level.** Create a console program that finds `[text](address)` links in a Markdown text defined in the program and displays the text and address of each link.

**2. Basic level.** Create a console program that reads a Markdown file, finds links and images `![description](address)`, validates the addresses with the `Uri.TryCreate` method (http or https scheme), and displays a table of links and, separately, invalid addresses and duplicates.

**3. Advanced level.** Use the dotnet CLI to create a console application that checks all `.md` files in a folder (`--dir`): external addresses, relative links to files, and links to headings. Links inside code blocks are not counted. The `--fix` option replaces `http://` with `https://`. A "file – line – link – problem" report; errors to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests.

### Variant 18. Flight schedule {#v18}

**1. Initial level.** Create a console program that finds the airline code, flight number, departure and arrival airports, and time in schedule lines `PS101 KBP-AMS 07:35` defined in the program and displays them as a table.

**2. Basic level.** Create a console program that reads a schedule from a file, checks the IATA flight code (a two-character carrier code, 1–4 digits, an optional letter), the airport codes (three uppercase Latin letters), and the time, sorts flights by departure time, and displays a table.

**3. Advanced level.** Use the dotnet CLI to create a console application that reads a flight schedule with time zones (`07:35+02:00`) and an airport directory, takes the options `--airport CODE`, `--airline CODE`, `--from hh:mm`, and `--to hh:mm`, calculates flight durations, and finds flights with the same number on the same day. Format errors are written to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests.

### Variant 19. Letter templates {#v19}

**1. Initial level.** Create a console program that finds all <code v-pre>&#123;&#123;Name}}</code> fields in a letter template defined in the program and displays a list of unique field names.

**2. Basic level.** Create a console program that reads a letter template from a file, asks the user for the value of each field, substitutes them with the `Replace` method and a `MatchEvaluator` (fields without a value remain, and a warning is displayed for them), and displays the finished letter.

**3. Advanced level.** Use the dotnet CLI to create a console application that generates letters from a template (`--template`) and a CSV data file (`--data`, the first line contains field names), supports the formats <code v-pre>&#123;&#123;Sum:N2}}</code>, <code v-pre>&#123;&#123;Date:dd.MM.yyyy}}</code>, and default values <code v-pre>&#123;&#123;City|London}}</code>, and writes each letter to a separate file in the `--out` folder. Missing fields are reported to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests.

### Variant 20. Temperatures in text {#v20}

**1. Initial level.** Create a console program that finds Fahrenheit temperatures (`72°F`, `-4 °F`, `98.6 F`) in a text defined in the program and displays their Celsius values with one decimal place.

**2. Basic level.** Create a console program that reads text from a file and uses the `Replace` method with a `MatchEvaluator` to replace all Fahrenheit temperatures with Celsius temperatures, keeping the space between the number and the unit symbol as in the original; values below absolute zero are left unchanged and listed.

**3. Advanced level.** Use the dotnet CLI to create a console application that converts temperatures in the text of a file between scales (`--to C|F|K`) with a given precision (`--precision N`), recognizes ranges `50–60°F` and a comma or period as the separator, and writes the result to a file (`--output`). The application displays a table of replacements; errors go to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests.

### Variant 21. Medical prescriptions {#v21}

**1. Initial level.** Create a console program that finds the drug name, dose, unit, and frequency in prescription lines `Paracetamol 500 mg 3 times a day` defined in the program and displays them as a table.

**2. Basic level.** Create a console program that reads a prescriptions file, checks the units (only mg, g, mcg, ml, IU, tab.), recognizes the frequency in the forms "3 times a day", "every 8 h", and `1-0-1`, calculates the daily dose, and displays a table and a list of lines with invalid units.

**3. Advanced level.** Use the dotnet CLI to create a console application that reads a prescriptions file (lines `patient; Paracetamol 500 mg 3 times a day`) and a directory of maximum daily doses (`--limits`), converts doses between g, mg, and mcg, warns when the daily dose is exceeded, and with the `--patient` option builds a report for one patient. Unrecognized lines are written to the error stream; exit codes 0, 1 (there are overdoses), 2; `--help`; xUnit tests.

### Variant 22. ISBN numbers {#v22}

**1. Initial level.** Create a console program that finds ISBN-13 numbers with or without hyphens (`978-966-10-1234-5`) in a text defined in the program and displays them without hyphens.

**2. Basic level.** Create a console program that asks for an ISBN, uses a pattern to determine whether it is an ISBN-10 or ISBN-13 (hyphens and spaces are allowed, the last digit of an ISBN-10 can be `X`), verifies the check digit, and displays the result and the number without separators.

**3. Advanced level.** Use the dotnet CLI to create a console application that processes a book catalog file: finds the ISBN in each entry, verifies the check digits, converts valid ISBN-10s to ISBN-13s with a recalculated check digit, and with the `--fix` option writes the catalog with normalized numbers. Invalid numbers are written to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests.

### Variant 23. Times in text {#v23}

**1. Initial level.** Create a console program that finds `hh:mm` time values from 00:00 to 23:59 (the pattern itself checks the hour and minute bounds) in a text defined in the program and displays them.

**2. Basic level.** Create a console program that reads a work log from a file with intervals `09:15–12:40` or `13:30-17:05`, checks that the end is later than the start, and displays the duration of each interval and the total duration in hours and minutes.

**3. Advanced level.** Use the dotnet CLI to create a console application that reads a work log file, recognizes time intervals in various forms (`from 9:00 to 12:30`, `9.00–12.30`, `2 h 15 min`), groups them by date and project (`[project]` in the line), and with the `--week` and `--project` options displays a table with totals, and also reports overlapping intervals. Errors are written to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests.

### Variant 24. Sports results {#v24}

**1. Initial level.** Create a console program that finds the team names and the score in result lines `Sokil – Promin 2:1` defined in the program and displays the winner of each match or "draw".

**2. Basic level.** Create a console program that reads a results file, checks the format of the lines (names with spaces and hyphens, score `N:M`), builds a league table (games, wins, draws, losses, goals, points 3/1/0), and displays it sorted by points.

**3. Advanced level.** Use the dotnet CLI to create a console application that builds a league table from a file of match results (lines `Sokil – Promin 2:1`) with rounds (`Round 3`), technical defeats `+:-`, and postponed matches, takes the options `--round N` and `--team name`, sorts teams by points, goal difference, and goals scored, and writes the table to CSV (`--csv`). Invalid lines are written to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests.

### Variant 25. C# code analysis {#v25}

**1. Initial level.** Create a console program that finds class declarations (`class Name`) in a C# code fragment defined in the program and displays their names.

**2. Basic level.** Create a console program that reads a `.cs` file, removes single-line and multiline comments and string literals, counts classes, interfaces, and methods (using a pattern of modifiers, type, name, and parentheses), and displays a report together with the number of comment lines.

**3. Advanced level.** Use the dotnet CLI to create a console application that traverses a project folder (`--dir`, `--exclude obj,bin`) and for each `.cs` file displays a "file – classes – methods – lines of code – comments, %" table, and also checks names: classes and methods in PascalCase, private fields in `_camelCase`. Violations are displayed as a list; exit codes 0, 1 (there are violations), 2; `--help`; xUnit tests.

### Variant 26. Delivery addresses {#v26}

**1. Initial level.** Create a console program that finds the city, street, building, and apartment in address lines `Prague, Sadova St., 12, apt. 5` defined in the program and displays them as separate fields.

**2. Basic level.** Create a console program that reads addresses from a file, recognizes abbreviations (`St.`, `Ave.`, `Ln.`, `Blvd.`, `Sq.`), buildings with a letter or a fraction (`12-A`, `5/2`), and an optional apartment, converts the entries to a uniform form, and displays a table of addresses and unrecognized lines.

**3. Advanced level.** Use the dotnet CLI to create a console application that reads a file of orders with addresses and postal codes (five digits), groups orders by city and street, takes the options `--city` and `--sort street|house`, and displays a route sheet with the number of orders. Unrecognized addresses are written to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests for the address pattern.

### Variant 27. Meter readings {#v27}

**1. Initial level.** Create a console program that finds the reading, unit, and date in a message text `Meter reading: 12345 kWh on 01.09.2026` defined in the program and displays them.

**2. Basic level.** Create a console program that reads a file of readings (lines with a date and a value in various formats), orders them by date, checks that the readings do not decrease, asks for a rate, and displays the consumption and cost for each month.

**3. Advanced level.** Use the dotnet CLI to create a console application that reads a file of readings from several meters (lines with a date, a type `el`, `gas`, or `water`, and a value; for two-zone electricity metering, `day 1234 night 567`), takes the options `--tariffs file` and `--year yyyy`, displays a monthly table of consumption and cost with totals, and marks anomalies (consumption three times higher than the average). Errors are written to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests.

### Variant 28. Password audit {#v28}

**1. Initial level.** Create a console program that checks an array of passwords defined in the program with a single pattern with lookaheads ("at least 8 characters, contains a digit and a letter") and displays the result for each password.

**2. Basic level.** Create a console program that reads a `login;password` file, checks each password with five separate patterns (length, uppercase letter, lowercase letter, digit, special character), and displays a table of users with the rules they violate and the number of strong passwords.

**3. Advanced level.** Use the dotnet CLI to create a console application that checks an accounts file (lines `login;password`) against a policy from a file (`--policy`, each line is a pattern and a message), and additionally looks for the login in the password (with `Regex.Escape`), the sequences `123` and `qwerty`, and words from a dictionary of weak passwords (`--dictionary`). The report is written to CSV without the passwords themselves; invalid policy patterns are reported to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests.

### Variant 29. URLs {#v29}

**1. Initial level.** Create a console program that finds URLs starting with `http://` or `https://` in a text defined in the program and displays the scheme, domain, and path of each URL.

**2. Basic level.** Create a console program that asks for a URL, parses the scheme, domain, port, path, query parameters, and fragment with named groups, displays the parameters as a "name – value" table with decoding (`Uri.UnescapeDataString`), and compares the result with the properties of the `Uri` class.

**3. Advanced level.** Use the dotnet CLI to create a console application that reads a file of link clicks (each line is a date and a URL), normalizes the URLs (lowercase domain, no `www.` and no trailing `/`), with the `--strip-tracking` option removes `utm_*` parameters, groups clicks by domain, and finds duplicates. A table of domains with the number of clicks; unrecognized lines to the error stream; exit codes 0, 1, 2; `--help`; xUnit tests.

### Variant 30. .NET build log {#v30}

**1. Initial level.** Create a console program that finds the file, line, column, message type, code, and text in `dotnet build` output lines such as `Program.cs(12,5): error CS1002: ; expected` defined in the program and displays them as a table.

**2. Basic level.** Create a console program that reads `dotnet build` output saved to a file, removes repeated messages (MSBuild repeats them in the summary), counts errors and warnings by code and by file, and displays two tables sorted by count.

**3. Advanced level.** Use the dotnet CLI to create a console application `buildreport` that runs `dotnet build` for a project (`--project`) or reads saved output (`--log`), takes the options `--severity error|warning` and `--code CS8618`, and writes a report as a Markdown table (`--markdown file`) with the number of messages by code and file. Exit codes: 0—no errors, 1—there are build errors, 2—argument error; `--help`; xUnit tests for the message pattern.

## Procedure

1. Study the theory and worked examples.
2. For each data format in your variant, write a regular expression and make a table of 5–10 valid and invalid strings that it should accept or reject.
3. Create a solution for your variant; declare patterns known at compile time with the `[GeneratedRegex]` attribute, and set a timeout for data from files and the command line.
4. Implement the program for the chosen difficulty level; check values that a regular expression cannot verify (dates, numbers, checksums) with `TryParse` methods or separate functions.
5. For the basic and advanced levels, cover the patterns with xUnit v3 `[Theory]` tests using the data from the table in step 2; test the program on edge cases (an empty and a very long string, Windows line endings).
6. Demonstrate the program and tests to your instructor, explain each pattern, and answer the review questions.
