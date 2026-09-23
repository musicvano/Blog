---
title: "Tasks"
description: "Topic 6. Strings and regular expressions: task variants"
outline: [2, 3]
sourceHash: "4ca035200825b15e57e2a3a9c06a20cd3819f057a6bba59ab0ed71de21850cc7"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

## Variants

### Variant 1. SMS messages {#v1}

**1. Initial level.** Create a console program. Read an SMS message and print all numbers consisting of `+380` and nine ASCII digits, bounded by the start, end, or a space.

**2. Basic level.** Create a console program. Read several SMS messages until an empty line; extract `+380` numbers with nine digits and amounts such as `12,50 UAH`. Print the number count and total in kopiykas, ignoring records with negative amounts.

**3. Advanced level.** Create a console program. Accept SMS messages as separate text arguments. For each, extract `+380` numbers with nine digits and nonnegative amounts with two kopiyka digits and the label `UAH`; group records by number, print a table of counts and totals, and list unparsed messages. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 2. SRT subtitles {#v2}

**1. Initial level.** Create a console program. Read a timestamp `HH:MM:SS,mmm`, validate hours 00–99, minutes and seconds 00–59, and milliseconds 000–999, and print the time in milliseconds.

**2. Basic level.** Create a console program. Read start and end timestamps `HH:MM:SS,mmm` and an integer shift in milliseconds. Check ranges, order, and a nonnegative result, and print the shifted pair.

**3. Advanced level.** Create a console program. Accept SRT blocks as text arguments and a shift through `--shift`. A block consists of a number, two `HH:MM:SS,mmm` timestamps separated by ` --> `, and text. Check sequential numbering, the time range 00:00:00,000–99:59:59,999, and absence of overlap; print the shifted blocks and a duration table. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 3. Sample password policy {#v3}

**1. Initial level.** Create a console program. Read a sample string and print its length and whether it contains uppercase ASCII letters, lowercase ASCII letters, and digits.

**2. Basic level.** Create a console program. Read a sample string; check length 8–32, only ASCII letters, digits, and `!@#$%`, and the presence of each class. Print all violations without printing the string again.

**3. Advanced level.** Create a console program. Accept only artificial test strings. Check length 8–32, allowed ASCII letters, digits, and `!@#$%`, and the presence of all four classes. Print a table of test numbers and violations, and compare a single regex with separate checks. Do not assess real strength or include strings in the report. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 4. Sample license plates {#v4}

**1. Initial level.** Create a console program. Read a plate consisting of two uppercase ASCII letters, four digits, and two uppercase ASCII letters, and print whether it matches the format.

**2. Basic level.** Create a console program. Read license plates until an empty line, remove ordinary spaces, convert Latin letters to uppercase, and check the format of two letters, four digits, and two letters. Print unique normalized values.

**3. Advanced level.** Create a console program. Accept sample plates in `AA1234BB` format and a code dictionary through the repeatable option `--region CODE:NAME`. Validate codes as two ASCII letters, detect duplicates, and print a plate table grouped by supplied regions and a separate group of unknown codes. Do not determine regions using an external directory. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 5. Access log {#v5}

**1. Initial level.** Create a console program. Read a record `HH:MM:SS GET /path 200` and print the time, method, path, and code using named groups; reject extra fields.

**2. Basic level.** Create a console program. Read log records until an empty line; allow methods `GET` and `POST`, times 00:00:00–23:59:59, and codes 100–599. Print code frequencies and invalid line numbers.

**3. Advanced level.** Create a console program. Accept records `HH:MM:SS METHOD /path CODE` as arguments and support `--status` to filter by a code from 100–599. Validate the time, a method of `GET` or `POST`, and a path without spaces; print path and code frequencies and the number of rejected records. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 6. Vigenère cipher {#v6}

**1. Initial level.** Create a console program. Read Ukrainian text and an integer shift, cyclically shift letters of the alphabet `абвгґдеєжзиіїйклмнопрстуфхцчшщьюя`, preserve case and punctuation, and print the result.

**2. Basic level.** Create a console program. Read Ukrainian text and a nonempty key of Ukrainian letters. Encrypt using Vigenère over the 33-letter alphabet, advancing the key only on letters, and print the ciphertext and reverse transformation result.

**3. Advanced level.** Create a console program. Accept text, a key of Ukrainian letters, and a mode `--mode encode` or `decode`. Apply NFC, preserve case and punctuation, and advance the key only on letters. Print the transformed text and a frequency table; describe the algorithm as a learning exercise unsuitable for protecting secrets. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 7. Table-based transliteration {#v7}

**1. Initial level.** Create a console program. Read a word and replace the Ukrainian letters `ж`, `ч`, `ш`, and `щ` with `zh`, `ch`, `sh`, and `shch`, respectively; preserve all other characters and print the text.

**2. Basic level.** Create a console program. Read a string and a table of `character=string` pairs until an empty line. Reject duplicate keys and keys that are not a single code point. Print the transliteration without successively retranslating fragments already produced.

**3. Advanced level.** Create a console program. Accept text and repeatable rules `--map character=string`, plus separate `--first` rules for the first letter of a word. Treat a word as a sequence of Ukrainian letters. Check duplicates and print the result and replacement statistics. Rules are user-defined, with no claim of compliance with the national standard. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 8. Email addresses {#v8}

**1. Initial level.** Create a console program. Read a sample address with ASCII letters, digits, dots, and underscores before a single `@`, a domain of ASCII letters, and a dot before a suffix of 2–10 letters. Print the local part and domain or an error.

**2. Basic level.** Create a console program. Read a semicolon-separated list of sample addresses. The local part contains ASCII letters, digits, dots, and underscores, and the domain has two nonempty letter segments. Reject empty parts, normalize only domain case, and print groups.

**3. Advanced level.** Create a console program. Accept sample addresses under a simplified contract: a local part of ASCII letters, digits, dots, and underscores, one `@`, and a domain of two letter segments. Normalize domain case and preserve local-part case. Filter records with `--domain` and print a frequency table without claiming that mailboxes exist. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 9. Message templates {#v9}

**1. Initial level.** Create a console program. Read a name and print a greeting using an f-string, including the input's code-point count.

**2. Basic level.** Create a console program. Read a name and course title, create a t-string for a trusted HTML paragraph, escape only text interpolations with `html.escape`, and print the result; reject conversion and format\_spec.

**3. Advanced level.** Create a console program. Accept records `name:course` and generate an HTML paragraph for each using a t-string processor. Allow interpolations only in text nodes, prohibit format specifications and conversions, and print paragraphs and a count table. Test ampersands, quotes, angle brackets, empty fields, and adjacent interpolations. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 10. Sales receipt {#v10}

**1. Initial level.** Create a console program. Read a product name, integer quantity, and integer price in kopiykas, and print an aligned receipt row and an amount with two decimal places.

**2. Basic level.** Create a console program. Read records `name;quantity;price_kop` until an empty line; reject negative values and names longer than 20 characters. Print an item table and total without calculations using float.

**3. Advanced level.** Create a console program. Accept records `name;quantity;price_kop` and a `--discount` option with an integer percentage 0–100. Validate the data, calculate the discount on the total with half-kopiykas rounded up, and print the receipt and totals before and after the discount. For amounts of 0–999 hryvnias, add text using your own explicitly described number-word table. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 11. Learning markup {#v11}

**1. Initial level.** Create a console program. Read a line with an optional `# ` prefix and print escaped HTML: `h1` for a heading or `p` for ordinary text.

**2. Basic level.** Create a console program. Read lines until an empty line. Convert only headings `# ` and `## ` and paragraphs; escape all user text and print HTML. Do not interpret arbitrary tags.

**3. Advanced level.** Create a console program. Accept text with simplified markup: headings `# ` and `## `, items `- `, and nonempty paragraphs. Produce balanced lists and escape all text; prohibit nested lists. Print HTML and a table of element counts; identify the format as a learning subset, not full Markdown. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 12. Readability statistics {#v12}

**1. Initial level.** Create a console program. Read text and print the number of nonempty words after split and the average word length excluding surrounding `.,!?`.

**2. Basic level.** Create a console program. Read text, split sentences on `.?!` and words on whitespace, count nonempty parts, and calculate the average number of words per sentence. Print zero values for empty text.

**3. Advanced level.** Create a console program. Accept text and `--long` with a word-length threshold. Split sentences on `.?!` and define words as sequences of Ukrainian letters. Print a length table, the proportion of long words, and the average sentence length; do not call these learning metrics a standardized readability index. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 13. Anagrams and palindromes {#v13}

**1. Initial level.** Create a console program. Read a string, apply NFC and casefold, retain only letters, and print whether the nonempty result is a palindrome.

**2. Basic level.** Create a console program. Read words until an empty line, normalize NFC and case, reject nonalphabetic characters, group anagrams by sorted letters, and print only groups containing two distinct words.

**3. Advanced level.** Create a console program. Accept words and a mode `--mode anagram` or `palindrome`. Apply NFC and casefold, validate that words contain letters, and preserve original spellings. Print anagram groups or a palindrome list, frequencies, and the number of rejected records. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 14. Dates in text {#v14}

**1. Initial level.** Create a console program. Read a date `DD.MM.YYYY`, check the pattern and calendar using datetime.date, and print the ISO date or the error reason.

**2. Basic level.** Create a console program. Read text, find dates in `DD.MM.YYYY` and `YYYY-MM-DD` formats, validate the calendar, and print only valid dates in a common ISO format with positions.

**3. Advanced level.** Create a console program. Accept text and `--format iso` or `ua`. Use a re.sub function to transform valid dates in `DD.MM.YYYY` and `YYYY-MM-DD` formats and preserve invalid ones. Print the text and a table of successful and rejected conversions with positions in the original text. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 15. Phone numbers {#v15}

**1. Initial level.** Create a console program. Read a number consisting of `+380` and nine ASCII digits and print the fullmatch validation result without allowing a final newline.

**2. Basic level.** Create a console program. Read numbers until an empty line; allow only `+380XXXXXXXXX` or `0XXXXXXXXX`, convert them to international format, print unique values, and report errors.

**3. Advanced level.** Create a console program. Accept numbers in `+380XXXXXXXXX` or `0XXXXXXXXX` format, normalize them, and group by the two digits after `+380`. Support `--prefix` and print frequencies and duplicates; do not determine the current operator from the prefix. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 16. Learning IBAN validation {#v16}

**1. Initial level.** Create a console program. Read a string, remove ordinary spaces, and check the form `UA` followed by 27 ASCII digits. Print the normalized form or an error without validating the account.

**2. Basic level.** Create a console program. Read a sample IBAN: `UA` and 27 digits. Move the first four characters to the end, replace letters with numbers A=10…Z=35, calculate the remainder modulo 97, and print whether it equals 1. Do not confirm that the account exists.

**3. Advanced level.** Create a console program. Accept only artificial IBANs in the form `UA` and 27 digits, supporting space removal. Validate the form and the mod97 algorithm with the first four characters moved and A=10…Z=35. Print a table of rejection reasons and masked numbers; do not use real bank details. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 17. Morse code {#v17}

**1. Initial level.** Create a console program. Read text containing letters A, B, C, E, and T; use codes `.-`, `-...`, `-.-.`, `.`, and `-`, and print space-separated codes, rejecting other characters.

**2. Basic level.** Create a console program. Read an encode or decode mode and text. Support A=`.-`, B=`-...`, C=`-.-.`, E=`.`, T=`-`, and `/` as a word boundary. Print the transformation or an error for an unknown character or code.

**3. Advanced level.** Create a console program. Accept text, `--mode`, and repeatable rules `--map letter:code`. Codes contain only dots and hyphens, letters are single ASCII letters, and rules are one-to-one. Print the result with spaces between codes and `/` between words, and a frequency table. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 18. SQL value templates {#v18}

**1. Initial level.** Create a console program. Read a name and minimum score, create a t-string for a trusted query with two interpolations, and print the static parts and values separately without executing SQL.

**2. Basic level.** Create a console program. Read a name and an integer score 0–100. Process a trusted query t-string, returning SQL with `?` placeholders and a value list. Prohibit conversion and format\_spec, and print both structures without joining values into SQL.

**3. Advanced level.** Create a console program. Accept records `name:score` and generate for each a pair consisting of SQL with `?` and a parameter list for one trusted SELECT. Validate scores 0–100, prohibit identifier interpolation and formatting, and print the pairs and totals. Test apostrophes, empty names, and adjacent interpolations; do not execute queries. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 19. Word masking {#v19}

**1. Initial level.** Create a console program. Read text and one nonempty prohibited word, replace case-sensitive literal occurrences with asterisks of the same length, and print the text.

**2. Basic level.** Create a console program. Read text and a comma-separated word list. Escape words using re.escape, replace whole words case-insensitively with asterisks using a re.sub function, and print the replacement count. Define a word as a sequence of `\w` characters.

**3. Advanced level.** Create a console program. Accept text and repeatable `--word` options. Validate nonempty words containing letters, build escaped alternatives, and replace whole words case-insensitively. Print the transformed text and replacement frequencies; explicitly describe the `\b` boundary and limitations for words with apostrophes. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 20. Hashtags and mentions {#v20}

**1. Initial level.** Create a console program. Read text and print hashtags found: `#` followed by 1–30 ASCII letters, digits, or underscores, separated by a space or a text edge.

**2. Basic level.** Create a console program. Read text, extract tokens starting with `#` or `@` followed by 1–30 ASCII letters, digits, or underscores, normalize case, and print separate frequencies for the two categories.

**3. Advanced level.** Create a console program. Accept message texts and a `--top` option with a positive number. Extract `#`/`@` tokens with 1–30 ASCII letters, digits, or underscores between spaces or text edges, count frequencies case-insensitively, and print two tables, ordering equal frequencies alphabetically. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 21. Scaling a recipe {#v21}

**1. Initial level.** Create a console program. Read a line `name:quantity:unit` with a nonnegative quantity and a unit of `g` or `ml`, and print the structured fields.

**2. Basic level.** Create a console program. Read ingredients `name:quantity:unit`, the original serving count, and the required serving count. Check positive serving counts and nonnegative quantities, scale, and print a table with two decimal places.

**3. Advanced level.** Create a console program. Accept ingredients `name:quantity:unit` and options `--from` and `--to` for positive serving counts. Allow units `g`, `ml`, and `pcs`, and sum only matching names and units. Print the scaled table and separate totals by unit. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 22. Verse line endings {#v22}

**1. Initial level.** Create a console program. Read a verse line, remove surrounding punctuation `.,!?;:` from its last word, and print that word's last two letters after casefold.

**2. Basic level.** Create a console program. Read four verse lines, normalize NFC, extract the last words, and group them by their last two letters. Print a learning scheme such as AABB or another code sequence without claiming phonetic rhyme validation.

**3. Advanced level.** Create a console program. Accept verse lines and a `--suffix` option from 1 to 5. Extract the last word of Ukrainian letters, normalize NFC and case, and group by the specified suffix. Print a table of lines, endings, and group numbers, rejecting lines without words. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 23. Section numbering {#v23}

**1. Initial level.** Create a console program. Read a heading `number. title`, validate a positive number and a nonempty title, and print the two parts.

**2. Basic level.** Create a console program. Read headings `number. title` until an empty line, check sequential numbers starting at 1, and print line numbers containing gaps or duplicates.

**3. Advanced level.** Create a console program. Accept headings `number. title` and a starting number through `--start`. Validate positive numbers and print renumbered headings with preserved titles and a table of old and new numbers. Reject invalid forms but allow repeated old numbers. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 24. Sample expense statement {#v24}

**1. Initial level.** Create a console program. Read a line `date;category;amount_kop` and print the three fields, validating an ISO date and a nonnegative integer number of kopiykas.

**2. Basic level.** Create a console program. Read expenses `YYYY-MM-DD;category;amount_kop`, validate the calendar and positive amounts, group by category, and print a table and total in hryvnias and kopiykas.

**3. Advanced level.** Create a console program. Accept artificial records `YYYY-MM-DD;category;amount_kop` and `--from` and `--to` options for a date range. Validate the calendar, bound order, and nonnegative amounts. Print expenses by category, proportions, and the grand total without binary monetary arithmetic. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 25. Learning INI configuration {#v25}

**1. Initial level.** Create a console program. Read a line `key=value`, split only at the first `=`, trim the edges, and print the fields; reject an empty key.

**2. Basic level.** Create a console program. Read lines until an empty line, allow ASCII keys `[A-Za-z_][A-Za-z0-9_]*`, ignore comments beginning with `;`, reject duplicates, and print a dictionary of keys and values.

**3. Advanced level.** Create a console program. Accept text with sections `[name]`, ASCII keys `[A-Za-z_][A-Za-z0-9_]*`, and lines `key=value`. A comment starts with `;` only at the beginning of a line. Prohibit repeated sections and duplicate keys within a section, print a field table and an error report with line numbers, and explicitly identify the format as an INI subset. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 26. Aligning assignments {#v26}

**1. Initial level.** Create a console program. Read a sample line `name = integer` with an ASCII identifier and print it with one space around `=`.

**2. Basic level.** Create a console program. Read only simple assignments of integers to ASCII identifiers without comments, validate each line, and align `=` signs to the longest name.

**3. Advanced level.** Create a console program. Accept text with simple integer assignments to `[A-Za-z_][A-Za-z0-9_]*`, without string literals or comments. Support `--width` as the minimum name width, reject other grammar, and print aligned text and a table of changed lines. Do not present the program as a formatter for arbitrary Python. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 27. Bibliographic template {#v27}

**1. Initial level.** Create a console program. Read fields `author;title;year`, check three nonempty fields and a year from 1900–2100, and print `Author. Title. Year.`.

**2. Basic level.** Create a console program. Read descriptions `author;title;year`, validate years 1900–2100 and nonempty fields, sort by author and title after casefold, and print a numbered list.

**3. Advanced level.** Create a console program. Accept records `author;title;year`, support `--sort author` or `year`, find duplicates after NFC and casefold, and print a numbered list and a duplicate table. Use the given learning template without claiming full compliance with a bibliographic standard. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 28. Sample URLs {#v28}

**1. Initial level.** Create a console program. Read a URL of the form `https://domain/path`, where the domain contains ASCII letters, digits, hyphens, and dots, and the path contains no spaces; print the domain and path.

**2. Basic level.** Create a console program. Read a URL using only `https`, an ASCII domain without a port, password, or fragment, and an optional query `key=value&...`. Print the domain, path, and pairs; reject duplicate keys. Do not support percent-encoding.

**3. Advanced level.** Create a console program. Accept sample `https` URLs with an ASCII domain without a port or fragment, a path without spaces, and a query of `key=value` pairs. Reject percent-encoding and duplicate keys, support `--host`, and print path groups and parameters; do not make network requests. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 29. Chemical formulas without parentheses {#v29}

**1. Initial level.** Create a console program. Read a formula containing symbols `H`, `O`, and `C` and optional positive subscripts. Extract elements with regex and print each element's atom count; check that the entire string is covered.

**2. Basic level.** Create a console program. Read a formula without parentheses containing elements H, O, C, N, Na, and Cl. A subscript is a positive integer, with omission meaning 1. Check complete parsing, sum repeated elements, and print the composition.

**3. Advanced level.** Create a console program. Accept formulas without parentheses containing H, O, C, N, Na, and Cl with subscripts 1–999. Reject characters not covered by regex and zero subscripts. Print a table of atom counts and learning masses using H=1, O=16, C=12, N=14, Na=23, Cl=35.5; allow `--element` for filtering. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

### Variant 30. Sample passphrases {#v30}

**1. Initial level.** Create a console program. Read at least two distinct space-separated words and print them joined by hyphens and the resulting phrase's total length.

**2. Basic level.** Create a console program. Read a dictionary of distinct nonempty words and a number k from 1 to 8. Use secrets.choice to select k words independently with replacement; print a sample phrase and `log2(N**k)` for N words, explaining the equal-probability assumption.

**3. Advanced level.** Create a console program. Accept a word dictionary, `--count` from 1 to 8, and a phrase count `--samples` from 1 to 20. Remove duplicates and prohibit hyphens inside words. Generate selections with secrets.choice with replacement and print phrases and the theoretical k·log2(N). Do not evaluate human passwords or use the phrases as real secrets. Add `--help`, keyboard input when arguments are absent, error messages to `stderr`, exit code 0 for success and 2 for invalid input. Test ordinary, empty, and boundary cases.

## Procedure

1. Create a separate Python 3.14 project in PyCharm. Record the variant number, input format, expected output, and allowed bounds.
2. Separate processing functions from input and printing. Add parameter and return annotations and short docstrings.
3. Implement the initial level. For regex, explain classes, groups, and quantifiers; for ordinary methods, explain your choice.
4. For the chosen level, test valid, empty, boundary, and invalid input. Separately test a final newline, Ukrainian letters, apostrophes, and decomposed Unicode where relevant to the task.
5. For the advanced level, test `--help`, arguments, `stderr`, and exit codes. Print totals in an aligned table without losing data.
6. Include the problem statement, code, actual run results, and a conclusion in the report. Make a commit in the project's local Git repository.
7. During the defense, explain the algorithm, the regular expression's limits, and the reason for each check; change one rule and demonstrate a new test.
