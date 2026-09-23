---
title: Tasks
description: "Topic 4. Arrays, Strings, vector: task variants"
outline: [2, 3]
sourceHash: "30e1478f1ae85652049e28e918763a798f168ead1ad0e48e86de02cea2faa9be"
---

# Tasks

Complete the task of the chosen difficulty level for your variant number.

Character-by-character tasks are done for ASCII unless stated otherwise. Do not call the UTF-8 length the number of letters.

## Variants

### Variant 1. Sieve of Eratosthenes {#v1}

**1. Initial level.** Create a console program that reads N in 2–100000 from the keyboard; it must build a sieve in a vector, output the primes and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads N in 2–100000 from the keyboard; it must output the number of primes and the largest gap between neighboring primes and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads N in 2–100000 from the keyboard; it must compare the sieve with trial division for N up to 10000, report discrepancies and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 2. Game of Life {#v2}

**1. Initial level.** Create a console program that reads a rectangular field up to 30×30 of . and X from the keyboard; it must compute one generation by the B3/S23 rules without wrapping the edges and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads a rectangular field up to 30×30 of . and X and a number of generations N up to 100 from the keyboard; it must compute N generations of the Game of Life by the B3/S23 rules without wrapping the edges and output each generation and the number of live cells. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads a rectangular field up to 30×30 of . and X from the keyboard; it must compute generations of the Game of Life by the B3/S23 rules without wrapping the edges, stop on stabilization or on a repeat of the previous generation, and output the stop number and the last field. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 3. Tic-tac-toe {#v3}

**1. Initial level.** Create a console program that reads a sequence of coordinates 1–3 for two players from the keyboard; it must store the moves in a 3×3 array, reject an occupied cell and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads a sequence of coordinates 1–3 for two players from the keyboard; it must determine the winner by rows, columns, diagonals, or a draw, and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads a sequence of coordinates 1–3 for two players from the keyboard; it must keep a log of moves and a command to undo the last move, not allow play after a win, and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 4. Battleship {#v4}

**1. Initial level.** Create a console program that reads a 10×10 field with single-cell ships and the coordinates of shots from the keyboard; it must mark a hit or a miss and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads a 10×10 field with single-cell ships and the coordinates of shots from the keyboard; it must reject repeated shots, count the remaining ships and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads a 10×10 field with single-cell ships and the coordinates of shots from the keyboard; it must check that no ships are adjacent in the eight directions, finish after the last hit and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 5. Spiral matrix {#v5}

**1. Initial level.** Create a console program that reads N, M in 1–30 from the keyboard; it must fill a matrix with consecutive numbers row by row in a snake pattern and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads N, M in 1–30 from the keyboard; it must fill an N×M matrix with consecutive numbers in a clockwise spiral and print it. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads N, M in 1–30 from the keyboard; it must fill an N×M matrix with consecutive numbers in a clockwise spiral, output it, and then for each value entered by the user output its coordinates; check narrow matrices. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 6. Magic square {#v6}

**1. Initial level.** Create a console program that reads a square up to 9×9 from the keyboard; it must compare the sums of the rows and the columns and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads a square up to 9×9 from the keyboard; it must check whether it is magic: equal sums of rows, columns and both diagonals and the presence of the numbers 1..N² without repeats, and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program: read an odd size N in 1–9; build a square with the Siamese method with the numbers 1..N² and check with an independent function the uniqueness of the numbers and the equality of the sums of all rows, columns and both diagonals. Output the square, the common sum and the result of the check. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 7. RLE {#v7}

**1. Initial level.** Create a console program that reads an ASCII string of up to 1000 letters A–Z from the keyboard; it must compress runs in the format letter:count separated by commas and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program: read from the keyboard an encoded string of up to 10000 characters in the format `A:3,B:2`: a letter A–Z, a colon, a positive decimal count, runs separated by commas; decode it, rejecting an incomplete format and a result longer than 10000 characters, and output the restored string. An empty string decodes to an empty one. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program with a menu for compression, decompression and exit. For compression, read a string of up to 1000 letters A–Z, output the runs in the format `A:3,B:2` and check that the original string is restored. For decompression, read an encoded string of up to 10000 characters in the format `A:3,B:2`: a letter A–Z, a colon, a positive decimal count, runs separated by commas; decode it, rejecting an incomplete format and a result longer than 10000 characters, and output the restored string. An empty string gives an empty result in both modes. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 8. Morse {#v8}

**1. Initial level.** Create a console program that reads an ASCII string of A–Z and spaces from the keyboard; it must translate the letters into Morse code with an array table, encode spaces as / and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program: read a string of Morse codes of up to 1000 characters; the codes of letters A–Z are separated by one space, and a separate token `/` denotes a space between words. Decode with a table, output the text or the position of an unknown code. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program: read the mode encode/decode. For encode, read up to 1000 letters A–Z and spaces, output the Morse codes separated by spaces, and encode a space in the text as a separate token `/`. For decode, read up to 5000 characters in this format, output the text or the position of an unknown token. For valid input, check the round-trip conversion. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 9. Roman numerals {#v9}

**1. Initial level.** Create a console program that reads an integer 1–3999 from the keyboard; it must convert it into canonical Roman notation and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program: read a string of up to 15 characters I,V,X,L,C,D,M; parse a Roman numeral in the range 1–3999 and check that it is canonical by the reverse conversion. Output the decimal value or an explanation of the error. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program: read a number of records 1–100; for each one read the mode decimal/roman and, respectively, an integer 1–3999 or a Roman string of up to 15 characters I,V,X,L,C,D,M. Convert a decimal number into canonical Roman notation; check a Roman one by the reverse conversion and convert it to decimal. Output a table of results and errors. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 10. Password {#v10}

**1. Initial level.** Create a console program that reads an ASCII string of length up to 100 from the keyboard; it must check for at least 8 characters and the presence of a digit and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads an ASCII string of length up to 100 from the keyboard; it must check for uppercase and lowercase letters, a digit and a sign !?; output all violations and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads a generator seed from the keyboard; it must generate 10 passwords of length 12 and check the rules with an independent function: uppercase and lowercase letters, a digit and the sign ! or ?, and print the passwords and the check results. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 11. Big-number arithmetic {#v11}

**1. Initial level.** Create a console program that reads two non-negative decimal strings of up to 100 digits from the keyboard; it must add the numbers from right to left without a built-in big type and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads two non-negative decimal strings of up to 100 digits from the keyboard; it must multiply the numbers using long multiplication, normalize leading zeros and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads two non-negative decimal strings of up to 100 digits from the keyboard; it must implement a menu of + and multiplication with token validation, output the length of the result and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 12. Anagrams {#v12}

**1. Initial level.** Create a console program that reads two ASCII strings of up to 1000 characters from the keyboard; it must check whether the first one is a palindrome ignoring spaces and case, and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads two ASCII strings of up to 1000 characters from the keyboard; it must determine whether they are anagrams by the frequencies of A–Z, reject other non-space characters and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads up to 100 ASCII words from the keyboard; it must group them into anagram groups without map, using a vector of structures, and print the groups. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 13. Phone numbers {#v13}

**1. Initial level.** Create a console program that reads a phone number string with digits, spaces, hyphens and a leading + from the keyboard; it must remove the formatting, check for 12 digits with the prefix 380 and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads up to 100 lines of phone numbers with digits, spaces, hyphens and a leading + from the keyboard; it must normalize each one to +380XXXXXXXXX, reject invalid ones, find duplicates and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads up to 100 lines of phone numbers with digits, spaces, hyphens and a leading + from the keyboard; it must normalize them to +380XXXXXXXXX, group them by the two code digits after 380 without claiming that the carrier assignment is current, and print the groups. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 14. CSV {#v14}

**1. Initial level.** Create a console program that reads one ASCII CSV line of up to 1000 characters from the keyboard; it must split unquoted fields by commas, keeping empty ones, and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads one ASCII CSV line of up to 1000 characters from the keyboard; it must split it into fields by commas, keeping empty ones, with support for quoted fields in double quotes and doubled quotes inside them, and print the fields. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads up to 100 ASCII CSV lines of up to 1000 characters from the keyboard; it must split each one into fields with support for quotes, check that the number of fields is the same, and output a table or the number of the line with a syntax error. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 15. Weather station {#v15}

**1. Initial level.** Create a console program that reads up to 31 finite readings -100..100 from the keyboard; it must find the minimum, the maximum and the mean and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads up to 31 finite readings -100..100 from the keyboard; it must compute a moving average with an odd window of 3 or 5 only for complete windows and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads up to 31 finite readings -100..100 from the keyboard; it must mark the days that deviate from the overall mean by more than an entered threshold, output their indices and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 16. Histogram {#v16}

**1. Initial level.** Create a console program that reads up to 1000 integer scores 0–100 from the keyboard; it must count them by the ranges 0–9, ..., 90–100 and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads up to 1000 integer scores 0–100 from the keyboard; it must group them by the ranges 0–9, ..., 90–100 and output a histogram with one asterisk for each score in the group. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads up to 1000 integer scores 0–100 from the keyboard; it must group them by the ranges 0–9, ..., 90–100, output a histogram with bars scaled to 50 asterisks, and print the exact frequencies and percentages. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 17. Directory {#v17}

**1. Initial level.** Create a console program that reads up to 100 records of an ASCII name and a number from the keyboard; it must find a name by linear search and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads up to 100 records of an ASCII name and a number from the keyboard; it must sort the structures by name by hand, perform a binary search and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads up to 100 records of an ASCII name and a number and a name to search for from the keyboard; it must find all records with this name by linear search and by binary search after sorting, and compare the number of comparisons of both searches. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 18. Text alignment {#v18}

**1. Initial level.** Create a console program that reads an ASCII paragraph and a width 10–80 from the keyboard; it must split the text into lines without breaking words and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads an ASCII paragraph and a width 10–80 from the keyboard; it must justify all full lines with additional spaces, align the last one to the left and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads an ASCII paragraph and a width 10–80 from the keyboard; it must support the modes left/right/justify, reject a word longer than the width and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 19. Tournament {#v19}

**1. Initial level.** Create a console program that reads up to 20 team names and match results from the keyboard; it must count the points: a win is 3, a draw is 1, and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads up to 20 team names and match results from the keyboard; it must output a table of points, goals scored and goals conceded and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads up to 20 team names and match results from the keyboard; it must sort by points, goal difference, name; reject a match of a team against itself and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 20. Polynomial {#v20}

**1. Initial level.** Create a console program: read a degree N in 0–20, N+1 finite coefficients from the constant term to the leading one, and a finite value x. Evaluate the polynomial at x with Horner’s scheme and output the result; report an overflow if the result is infinite. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads coefficients from the constant term to degree N up to 20 from the keyboard; it must build a vector of the coefficients of the derivative and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program: read the degrees of two polynomials in 0–20 and, for each one, all finite coefficients from the constant term to the leading one. Add the polynomials and remove extra leading zeros (store the zero polynomial as a single zero). Then read a number of points 1–100 and their finite values x; output the coefficients of the sum and a table of the values of both polynomials and of the sum at these points. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 21. Breakfast {#v21}

**1. Initial level.** Create a console program that reads up to 100 orders with a dish name, a quantity and a price from the keyboard; it must compute the total of all orders and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads up to 100 orders with a dish name, a quantity and a price from the keyboard; it must merge identical dishes in a vector of totals and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads up to 100 orders with a dish name, a quantity and a price from the keyboard; it must output the number of portions needed and the revenue by dish, reject a conflicting price for the same name and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 22. Transactions {#v22}

**1. Initial level.** Create a console program that reads up to 1000 amounts, with positive income and negative expenses, from the keyboard; it must find the final balance starting from zero and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads up to 1000 amounts, with positive income and negative expenses, from the keyboard; it must output the largest expense and the intermediate balances and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads up to 1000 amounts, with positive income and negative expenses, from the keyboard; it must find the first negative balance and the totals of income/expenses, preserve the order of the records and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 23. Word frequency {#v23}

**1. Initial level.** Create a console program that reads an ASCII string of up to 10000 letters and spaces from the keyboard; it must count the words after converting to lowercase and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads an ASCII string of up to 10000 letters and spaces from the keyboard; it must store the frequencies in a vector of word/count pairs and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads an ASCII string of up to 10000 letters and spaces from the keyboard; it must output the top 10 by frequency, with alphabetical order for ties, use its own sorting and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 24. Sudoku {#v24}

**1. Initial level.** Create a console program that reads a 9×9 matrix of numbers 1–9 from the keyboard; it must check the uniqueness of each row and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads a 9×9 matrix of numbers 1–9 from the keyboard; it must check the rows, the columns and the 3×3 blocks and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads a 9×9 matrix of numbers 1–9 from the keyboard; it must output all violated rows, columns and blocks without stopping after the first error and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 25. License plates {#v25}

**1. Initial level.** Create a console program that reads up to 100 ASCII codes of the format AA1234BB from the keyboard; it must check for two letters, four digits, two letters and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads up to 100 ASCII codes of the format AA1234BB from the keyboard; it must normalize the case, find duplicates and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads up to 100 ASCII codes of the format AA1234BB from the keyboard; it must group them by the first two letters, output the counts and a list of invalid codes, and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 26. File name pattern {#v26}

**1. Initial level.** Create a console program that reads an ASCII pattern with ? and a list of names from the keyboard; it must check a match where ? stands for one character with equal lengths and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads an ASCII pattern and a list of names from the keyboard; it must output the names that match the pattern, where ? means one character and \* means any number of characters. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads an ASCII pattern with ? (one character) and \* (any number of characters) and up to 1000 names of length up to 100 from the keyboard; it must filter the names by the pattern, sort them, remove duplicates and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 27. Minefield {#v27}

**1. Initial level.** Create a console program that reads a field up to 30×30 of . and \* from the keyboard; it must count the adjacent mines for each free cell and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads a field up to 30×30 of . and \* from the keyboard; it must open the entered cell, report a mine or the count, and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads a field up to 30×30 of . and \* from the keyboard; it must implement opening a connected zero region and its border without going outside the coordinates, and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 28. Buses {#v28}

**1. Initial level.** Create a console program that reads up to 100 times hh:mm and the current time from the keyboard; it must find the nearest departure of the same day by linear search and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads up to 100 times hh:mm and the current time from the keyboard; it must sort the minutes, find a departure by binary search and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads up to 100 bus departure times hh:mm and the current time from the keyboard; it must find the nearest departure, and if there are no more departures today, take the first one tomorrow, and output the departure and the waiting time. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 29. Image {#v29}

**1. Initial level.** Create a console program that reads a matrix up to 30×30 of brightness values 0–255 from the keyboard; it must mirror it horizontally and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads a matrix up to 30×30 of brightness values 0–255 from the keyboard; it must blur it with the mean of the existing 3×3 neighbors, reading an unchanged copy, and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads a matrix up to 30×30 of brightness values 0–255 from the keyboard; it must apply contrast around 128 with saturation to 0–255, output an ASCII visualization and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

### Variant 30. Timetable {#v30}

**1. Initial level.** Create a console program that reads a table of 5 days with 6 slots each, containing ASCII names or -, from the keyboard; it must count the classes by day and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**2. Basic level.** Create a console program that reads a table of 5 days with 6 slots each, containing ASCII names or -, from the keyboard; it must find the gaps between the first and the last classes and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

**3. Advanced level.** Create a console program that reads a table of 5 days with 6 slots each, containing ASCII names or -, from the keyboard; it must find the days with more than 4 classes and duplicates of a subject in adjacent slots, and print the result. Use arrays or vectors; validate the input and the bounds. Explain invalid data with a message.

## Procedure

1. Choose array or vector depending on whether the size changes.
1. Write down the valid indices and the maximum input size.
1. Determine the owners of the strings and the lifetime of the views.
1. Implement searching and sorting, and explain their invariants.
1. Check an empty collection, a single element and duplicates.
1. Inspect size/capacity and the elements in the Watch window.
1. Save the test results and the code in Git.
