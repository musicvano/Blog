---
title: "Tasks"
description: "Topic 3. Functions and strings: task variants"
outline: [2, 3]
sourceHash: "16bd80371c5fc396ebce1ccc8a24327757e44f803ae590d11d9a6ba2ab8f13fc"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

Use Kotlin/JVM on JDK 27. Separate reading, calculation, and formatting; define the alphabet, numeric bounds, and behavior for empty text and invalid formats. Do not use real private numbers or credentials in examples.

## Variants

### Variant 1. Caesar cipher {#v1}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that encrypts text using a Caesar cipher. Input: text with ASCII letters A..Z and a..z and an integer key; shift letters cyclically within 26 letters, leaving other characters unchanged. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that encrypts text using a Caesar cipher. Input: text with ASCII letters A..Z and a..z and an integer key; shift letters cyclically within 26 letters, leaving other characters unchanged. Add a decrypt function using the opposite key. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that encrypts text using a Caesar cipher. Input: text with ASCII letters A..Z and a..z and an integer key; shift letters cyclically within 26 letters, leaving other characters unchanged. Add a decrypt function using the opposite key; perform a round-trip for all keys in -52..52. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 2. Palindromes {#v2}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that checks whether an entered sentence is a palindrome. Input: a sentence with words consisting only of letters; ignore case and whitespace; an empty string is a palindrome. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that checks whether an entered sentence is a palindrome. Input: a sentence with words consisting only of letters; ignore case and whitespace; an empty string is a palindrome. Add String.isPalindrome and a list of palindromic words of length at least 2. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that checks whether an entered sentence is a palindrome. Input: a sentence with words consisting only of letters; ignore case and whitespace; an empty string is a palindrome. Add String.isPalindrome and a list of palindromic words of length at least 2; define normalization boundaries and check punctuation according to an explicit rule. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 3. Sales receipt {#v3}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that creates a sales receipt for an item. Input: product name, quantity in 1..1000, and price in kopiykas in 0..1000000; calculate the amount in Long. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that creates a sales receipt for an item. Input: product name, quantity in 1..1000, and price in kopiykas in 0..1000000; calculate the amount in Long. Add formatReceipt with default currency UAH and width 20. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that creates a sales receipt for an item. Input: product name, quantity in 1..1000, and price in kopiykas in 0..1000000; calculate the amount in Long. Add formatReceipt with default currency UAH and width 20; support multiple items through vararg and check total overflow. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 4. Phone number {#v4}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that normalizes a Ukrainian phone number to +380XXXXXXXXX format. Input: a string containing a plus sign, digits, spaces, parentheses, and hyphens; convert a number consisting of 0 and 9 digits to +380 and 9 digits. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that normalizes a Ukrainian phone number to +380XXXXXXXXX format. Input: a string containing a plus sign, digits, spaces, parentheses, and hyphens; convert a number consisting of 0 and 9 digits to +380 and 9 digits. Add a Regex for the full format `\+380[0-9]{9}`; reject other formats. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that normalizes a Ukrainian phone number to +380XXXXXXXXX format. Input: a string containing a plus sign, digits, spaces, parentheses, and hyphens; convert a number consisting of 0 and 9 digits to +380 and 9 digits. Add a Regex for the full format `\+380[0-9]{9}`; reject other formats; report failure causes and mask the middle 5 digits; do not determine whether the number exists. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 5. Transliteration {#v5}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that transliterates a Ukrainian word into Latin letters. Input: a Ukrainian word; use the sample table аa бb вv гh ґg дd еe жzh зz иy іi кk лl мm нn оo пp рr сs тt уu фf хkh цts чch шsh щshch. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that transliterates a Ukrainian word into Latin letters. Input: a Ukrainian word; use the sample table аa бb вv гh ґg дd еe жzh зz иy іi кk лl мm нn оo пp рr сs тt уu фf хkh цts чch шsh щshch. Add the rules єYe/ie, їYi/i, йY/i, юYu/iu, яYa/ia at the start/inside a word; remove ь and apostrophes. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that transliterates a Ukrainian word into Latin letters. Input: a Ukrainian word; use the sample table аa бb вv гh ґg дd еe жzh зz иy іi кk лl мm нn оo пp рr сs тt уu фf хkh цts чch шsh щshch. Add the rules єYe/ie, їYi/i, йY/i, юYu/iu, яYa/ia at the start/inside a word; remove ь and apostrophes; add the rule зг=zgh, preserve initial case, and process multiple words using the table in Resolution 55 of 27.01.2010. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 6. Text statistics {#v6}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that calculates statistics for entered text. Input: a string; a word is a nonempty fragment between spaces; count words and letters. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that calculates statistics for entered text. Input: a string; a word is a nonempty fragment between spaces; count words and letters. Add sentences as nonempty fragments between .!? and the frequency of vowels аеиіоуяюєї. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that calculates statistics for entered text. Input: a string; a word is a nonempty fragment between spaces; count words and letters. Add sentences as nonempty fragments between .!? and the frequency of vowels аеиіоуяюєї; find the most frequent letter ignoring case, breaking ties alphabetically. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 7. Email address {#v7}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that validates an email address using a sample scheme. Input: a string; the sample scheme is local@domain with one @, local containing ASCII letters/digits/.\_-, domain containing letters/digits/.- and at least one period. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that validates an email address using a sample scheme. Input: a string; the sample scheme is local@domain with one @, local containing ASCII letters/digits/.\_-, domain containing letters/digits/.- and at least one period. Add String.isValidEmail and separate causes for an empty field, spaces, and invalid characters. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that validates an email address using a sample scheme. Input: a string; the sample scheme is local@domain with one @, local containing ASCII letters/digits/.\_-, domain containing letters/digits/.- and at least one period. Add String.isValidEmail and separate causes for an empty field, spaces, and invalid characters; reject leading/trailing or double periods; do not claim to verify that the address exists. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 8. Ukrainian IBAN {#v8}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that validates a fictional Ukrainian IBAN. Input: a fictional string consisting of UA and 27 ASCII digits; remove only spaces, and check for length 29. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that validates a fictional Ukrainian IBAN. Input: a fictional string consisting of UA and 27 ASCII digits; remove only spaces, and check for length 29. Add checksum validation: move the first 4 characters to the end, replace letters with A=10..Z=35, and check that digit-by-digit MOD97 equals 1. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that validates a fictional Ukrainian IBAN. Input: a fictional string consisting of UA and 27 ASCII digits; remove only spaces, and check for length 29. Add checksum validation: move the first 4 characters to the end, replace letters with A=10..Z=35, and check that digit-by-digit MOD97 equals 1; add a String validation function and mask everything except UA and the last 4 digits; do not print real account details. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 9. Password generator {#v9}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that generates a reproducible sample password. Input: a length in 4..64 and a seed; take password characters from ASCII letters and digits. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that generates a reproducible sample password. Input: a length in 4..64 and a seed; take password characters from ASCII letters and digits. Add named digits/upper/lower flags and require at least one enabled group. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that generates a reproducible sample password. Input: a length in 4..64 and a seed; take password characters from ASCII letters and digits. Add named digits/upper/lower flags and require at least one enabled group; guarantee a character from each group; this is a reproducible teaching generator, not protection for a real account. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 10. Morse code {#v10}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that encodes text in Morse code. Input: words containing only A, B, C, S, O and spaces; `A=.-` `B=-...` `C=-.-.` `S=...` `O=---`, with a space between letters and / between words. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that encodes text in Morse code. Input: words containing only A, B, C, S, O and spaces; `A=.-` `B=-...` `C=-.-.` `S=...` `O=---`, with a space between letters and / between words. Add encoding and decoding functions that reject unknown codes. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that encodes text in Morse code. Input: words containing only A, B, C, S, O and spaces; `A=.-` `B=-...` `C=-.-.` `S=...` `O=---`, with a space between letters and / between words. Add encoding and decoding functions that reject unknown codes; perform string round-trips and add a word delimiter parameter defaulting to /. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 11. Anagrams {#v11}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that checks whether two words are anagrams. Input: two ASCII a..z words, ignoring case; check for equal counts of each letter. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that checks whether two words are anagrams. Input: two ASCII a..z words, ignoring case; check for equal counts of each letter. Add String.isAnagramOf and exclude spaces. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that checks whether two words are anagrams. Input: two ASCII a..z words, ignoring case; check for equal counts of each letter. Add String.isAnagramOf and exclude spaces; find anagrams of a given word among entered strings. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 12. Amount in words {#v12}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that writes a monetary amount in Ukrainian words. Input: an integer amount in 0..99 hryvnias; use a dictionary of numbers 0..19 and tens 20..90, with the correct form гривня/гривні/гривень. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that writes a monetary amount in Ukrainian words. Input: an integer amount in 0..99 hryvnias; use a dictionary of numbers 0..19 and tens 20..90, with the correct form гривня/гривні/гривень. Add kopiykas in 0..99 as two digits and the rules for 1/2..4/other values, with an exception for 11..14. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that writes a monetary amount in Ukrainian words. Input: an integer amount in 0..99 hryvnias; use a dictionary of numbers 0..19 and tens 20..90, with the correct form гривня/гривні/гривень. Add kopiykas in 0..99 as two digits and the rules for 1/2..4/other values, with an exception for 11..14; add a function with default currency UAH and cases 0, 1, 2, 5, 11, 21, 99. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 13. Text alignment {#v13}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that wraps text into lines of a given width and aligns them. Input: text and a width in 1..60; wrap whole words, and reject any word longer than the width. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that wraps text into lines of a given width and aligns them. Input: text and a width in 1..60; wrap whole words, and reject any word longer than the width. Add left/right/center modes, defaulting to left. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that wraps text into lines of a given width and aligns them. Input: text and a width in 1..60; wrap whole words, and reject any word longer than the width. Add left/right/center modes, defaulting to left; add full justification between words, with the last line aligned left. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 14. HEX colors {#v14}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that parses a color in HEX format. Input: a `#`RRGGBB string containing ASCII hex; return r,g,b in 0..255. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that parses a color in HEX format. Input: a `#`RRGGBB string containing ASCII hex; return r,g,b in 0..255. Add reverse formatting in uppercase with two digits per channel. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that parses a color in HEX format. Input: a `#`RRGGBB string containing ASCII hex; return r,g,b in 0..255. Add reverse formatting in uppercase with two digits per channel; add a String extension and round-trip checks for black/white/channel boundaries. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 15. License plates {#v15}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that validates a license plate in a sample format. Input: a string in the sample format of two letters, 4 digits, and two letters; allowed letters are ABCEHIKMOPTX. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that validates a license plate in a sample format. Input: a string in the sample format of two letters, 4 digits, and two letters; allowed letters are ABCEHIKMOPTX. Add a full-match Regex and parse the three parts. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that validates a license plate in a sample format. Input: a string in the sample format of two letters, 4 digits, and two letters; allowed letters are ABCEHIKMOPTX. Add a full-match Regex and parse the three parts; normalize spaces/hyphens; do not determine registration or the current region. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 16. CSV line {#v16}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that parses one CSV line into fields. Input: one comma-separated line; fields are unquoted, and empty fields must be preserved. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that parses one CSV line into fields. Input: one comma-separated line; fields are unquoted, and empty fields must be preserved. Add support for quoted fields, commas inside quotes, and doubled quotes. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that parses one CSV line into fields. Input: one comma-separated line; fields are unquoted, and empty fields must be preserved. Add support for quoted fields, commas inside quotes, and doubled quotes; use a state machine that rejects unclosed quotes; perform encode/decode round-trips without line breaks inside a field. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 17. Letter template {#v17}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that creates a letter using a multiline template. Input: name, subject, and text; use a multiline template with a default signature. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that creates a letter using a multiline template. Input: name, subject, and text; use a multiline template with a default signature. Add named parameters and trimMargin. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that creates a letter using a multiline template. Input: name, subject, and text; use a multiline template with a default signature. Add named parameters and trimMargin; use literal dollars through multi-dollar interpolation; test an empty subject. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 18. Vowels and consonants {#v18}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that counts vowels and consonants in Ukrainian text. Input: Ukrainian text; vowels are аеиіоуяюєї, and ь is not a consonant. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that counts vowels and consonants in Ukrainian text. Input: Ukrainian text; vowels are аеиіоуяюєї, and ь is not a consonant. Add a Char extension with a case-insensitive check. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that counts vowels and consonants in Ukrainian text. Input: Ukrainian text; vowels are аеиіоуяюєї, and ь is not a consonant. Add a Char extension with a case-insensitive check; separately count vowels, consonants, digits, and other characters. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 19. Durations {#v19}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that converts a duration from Nh Nm Ns notation to seconds. Input: an Nh Nm Ns string with nonnegative integers and h/m/s suffixes without repetitions; convert to Long seconds. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that converts a duration from Nh Nm Ns notation to seconds. Input: an Nh Nm Ns string with nonnegative integers and h/m/s suffixes without repetitions; convert to Long seconds. Add reverse formatting as hours:minutes:seconds with padStart. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that converts a duration from Nh Nm Ns notation to seconds. Input: an Nh Nm Ns string with nonnegative integers and h/m/s suffixes without repetitions; convert to Long seconds. Add reverse formatting as hours:minutes:seconds with padStart; add full Regex parsing and overflow protection; reject empty input. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 20. Full name {#v20}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that creates initials from a last name, first name, and patronymic. Input: two or three words: last name, first name, and patronymic. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that creates initials from a last name, first name, and patronymic. Input: two or three words: last name, first name, and patronymic. Add String.toInitials with a default period delimiter. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that creates initials from a last name, first name, and patronymic. Input: two or three words: last name, first name, and patronymic. Add String.toInitials with a default period delimiter; look up the full name by initials only in a separately entered directory; show ties. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 21. ISBN codes {#v21}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that validates an ISBN check digit. Input: an ISBN-13 string of 13 digits; the weights of the first 12 digits alternate between 1 and 3, and the last digit equals (10-sum%10)%10. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that validates an ISBN check digit. Input: an ISBN-13 string of 13 digits; the weights of the first 12 digits alternate between 1 and 3, and the last digit equals (10-sum%10)%10. Add ISBN-10: 9 digits and a check digit or X, weights 10..1, and a sum divisible by 11. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that validates an ISBN check digit. Input: an ISBN-13 string of 13 digits; the weights of the first 12 digits alternate between 1 and 3, and the last digit equals (10-sum%10)%10. Add ISBN-10: 9 digits and a check digit or X, weights 10..1, and a sum divisible by 11; convert ISBN10 to 978+the first 9 digits+a new check digit; convert back only for 978. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 22. RLE compression {#v22}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that compresses a string using run-length encoding (RLE). Input: a string of ASCII letters A..Z; encode runs as letter:count, separated by ;. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that compresses a string using run-length encoding (RLE). Input: a string of ASCII letters A..Z; encode runs as letter:count, separated by ;. Add decoding with counts in 1..1000 and full format validation. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that compresses a string using run-length encoding (RLE). Input: a string of ASCII letters A..Z; encode runs as letter:count, separated by ;. Add decoding with counts in 1..1000 and full format validation; limit output to 100000 characters and perform a round-trip. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 23. Towers of Hanoi {#v23}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that solves the Towers of Hanoi problem and prints the sequence of moves. Input: a disk count in 0..15; recursively move the tower from rod A to rod C using B. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that solves the Towers of Hanoi problem and prints the sequence of moves. Input: a disk count in 0..15; recursively move the tower from rod A to rod C using B. Add default rod name parameters and a move counter. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that solves the Towers of Hanoi problem and prints the sequence of moves. Input: a disk count in 0..15; recursively move the tower from rod A to rod C using B. Add default rod name parameters and a move counter; check the count 2^n-1 and the validity of every move using your own model. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 24. Luhn algorithm {#v24}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that validates a fictional card number using the Luhn algorithm. Input: a fictional string of 12..19 digits; starting from the right, double every second digit, subtract 9 for values above 9, and require the sum to be divisible by 10. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that validates a fictional card number using the Luhn algorithm. Input: a fictional string of 12..19 digits; starting from the right, double every second digit, subtract 9 for values above 9, and require the sum to be divisible by 10. Add a validation function and mask all but the last 4 digits. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that validates a fictional card number using the Luhn algorithm. Input: a fictional string of 12..19 digits; starting from the right, double every second digit, subtract 9 for values above 9, and require the sum to be divisible by 10. Add a validation function and mask all but the last 4 digits; generate a check digit for a fictional prefix; a valid checksum does not imply a real account. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 25. URL slug {#v25}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that creates a URL slug from a heading. Input: an ASCII heading; convert to lowercase, replace groups of spaces with -, and remove everything except letters/digits/-. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that creates a URL slug from a heading. Input: an ASCII heading; convert to lowercase, replace groups of spaces with -, and remove everything except letters/digits/-. Add trimming of leading/trailing and repeated hyphens, and reject an empty result. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that creates a URL slug from a heading. Input: an ASCII heading; convert to lowercase, replace groups of spaces with -, and remove everything except letters/digits/-. Add trimming of leading/trailing and repeated hyphens, and reject an empty result; add a default `maxLength = 60` without a trailing hyphen and idempotence tests. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 26. Temperature with units {#v26}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that converts temperature between Celsius and Fahrenheit. Input: a finite number and scale C or F; F=C\*9/5+32, C=(F-32)\*5/9. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that converts temperature between Celsius and Fahrenheit. Input: a finite number and scale C or F; F=C\*9/5+32, C=(F-32)\*5/9. Add extension functions and formatting with 2 digits by default. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that converts temperature between Celsius and Fahrenheit. Input: a finite number and scale C or F; F=C\*9/5+32, C=(F-32)\*5/9. Add extension functions and formatting with 2 digits by default; add a Regex for the entire input, support signs/decimal points, and reject NaN/Infinity. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 27. Crossword {#v27}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that checks whether a word matches a crossword pattern. Input: an ASCII word and a pattern where ? means one letter and \* means zero or more letters. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that checks whether a word matches a crossword pattern. Input: an ASCII word and a pattern where ? means one letter and \* means zero or more letters. Add conversion of the pattern to Regex with escaping of literal parts. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that checks whether a word matches a crossword pattern. Input: an ASCII word and a pattern where ? means one letter and \* means zero or more letters. Add conversion of the pattern to Regex with escaping of literal parts; find all matches among entered words in stable order. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 28. Dates in text {#v28}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that finds dates in text and converts them to ISO format. Input: text with dd.mm.yyyy dates; find Regex groups and print yyyy-mm-dd. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that finds dates in text and converts them to ISO format. Input: text with dd.mm.yyyy dates; find Regex groups and print yyyy-mm-dd. Add calendar validation through java.time.LocalDate. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that finds dates in text and converts them to ISO format. Input: text with dd.mm.yyyy dates; find Regex groups and print yyyy-mm-dd. Add calendar validation through java.time.LocalDate; preserve invalid dates in a failure report with their starting positions. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 29. Text graphics {#v29}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that builds a text histogram using text graphics. Input: names and nonnegative values in 0..100; build histogram bars with `#`. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that builds a text histogram using text graphics. Input: names and nonnegative values in 0..100; build histogram bars with `#`. Add default character/scale parameters and format names with padEnd. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that builds a text histogram using text graphics. Input: names and nonnegative values in 0..100; build histogram bars with `#`. Add default character/scale parameters and format names with padEnd; add a vararg table of values and a rounding rule for incomplete scale units. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

### Variant 30. Semantic versions {#v30}

**1. Initial level.** Create a Kotlin/JVM console program on JDK 27 that parses and compares semantic versions. Input: two versions in major.minor.patch format, consisting of three nonnegative Int values without leading zeros or prerelease/build components. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**2. Basic level.** Create a Kotlin/JVM console program on JDK 27 that parses and compares semantic versions. Input: two versions in major.minor.patch format, consisting of three nonnegative Int values without leading zeros or prerelease/build components. Add numeric component comparison; 1.10.2 is greater than 1.9.9. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases.

**3. Advanced level.** Create a Kotlin/JVM console program on JDK 27 that parses and compares semantic versions. Input: two versions in major.minor.patch format, consisting of three nonnegative Int values without leading zeros or prerelease/build components. Add numeric component comparison; 1.10.2 is greater than 1.9.9; select the newest using vararg, and reject an empty set. Extract functions with parameter and return types, and separate printing. Print the result or failure cause; test normal, empty, boundary, and invalid cases. Add CLI arguments in key=value format and `--help`; with no arguments, read the same fields from the keyboard. Print a labeled tabular report with a summary; send errors to stderr. Exit codes: 0 – success or help, 2 – invalid input, 1 – operational failure.

## Procedure

1. Describe function signatures, preconditions, and results.
2. Implement the functions and a console scenario with validated input.
3. Use default and named arguments where they make sense.
4. Test empty, normal, boundary, and invalid cases.
5. For recursion, explain the base case and how the problem shrinks.
6. Submit five actual checks, code, and a README.
7. Show an extension in IntelliJ IDEA and explain its receiver.

