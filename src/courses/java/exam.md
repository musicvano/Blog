---
title: "Review tasks"
description: "Java OOP: practical tasks by course topic"
sourceHash: "f3db2c5d33aef3e4dc2a3fe647bcfb0ebfa46afac1830b021f2930d7b06b60d6"
---

# Review tasks

Practical tasks by course topic to check your knowledge. Each task is a separate program.

## Topic 1. Java and your first program

1. Create a Java console program on JDK 27: distance d km 0..10000, consumption r l/100 km 0..50, price p UAH/l 0..1000; print the liters d\*r/100 and the cost d\*r\*p/100. Read the parameters from the keyboard with Scanner; check the format and bounds, and print labeled results and a description of any rejection. Submit a README with compile/run commands and three meaningful Git commits.
2. Create a Java console program on JDK 27: length a, width b, height h 1..100 m, opening area s from 0 to 2\*(a+b)\*h, can coverage c 0.1..100 m², price p 0..10000; print ceil((2\*(a+b)\*h-s)/c) cans and the price. Read the parameters from the keyboard with Scanner; check the format and bounds, and print labeled results and a description of any rejection. Submit a README with compile/run commands and three meaningful Git commits.
3. Create a Java console program on JDK 27: room sides a,b 1..100 m, tile side t 0.05..2 m, tile price p 0..10000; ignoring the shape of offcuts, print ceil(a\*b/(t\*t)\*1.1) tiles and their price. Read the parameters from the keyboard with Scanner; check the format and bounds, and print labeled results and a description of any rejection. Submit a README with compile/run commands and three meaningful Git commits.
4. Create a Java console program on JDK 27: two diameters d1,d2 1..100 cm and prices p1,p2 0..10000; print the areas pi\*d\*d/4 and the price per square centimeter of each pizza. Read the parameters from the keyboard with Scanner; check the format and bounds, and print labeled results and a description of any rejection. Submit a README with compile/run commands and three meaningful Git commits.
5. Create a Java console program on JDK 27: mass m 1..300 kg, height h 30..250 cm, age a 1..120 years, a given coefficient k from -200 to 200; print the nominal index 10\*m+6.25\*h-5\*a+k, without medical advice. Read the parameters from the keyboard with Scanner; check the format and bounds, and print labeled results and a description of any rejection. Submit a README with compile/run commands and three meaningful Git commits.
6. Create a Java console program on JDK 27: previous x and current y meter readings 0..1000000 with y&gt;=x, rate t 0..1000; print the consumption y-x and the payment (y-x)\*t. Read the parameters from the keyboard with Scanner; check the format and bounds, and print labeled results and a description of any rejection. Submit a README with compile/run commands and three meaningful Git commits.
7. Create a Java console program on JDK 27: size s 0..100000 MiB and speed v 0.1..10000 Mbit/s; print the seconds s\*1048576\*8/(v\*1000000), ignoring protocol overhead. Read the parameters from the keyboard with Scanner; check the format and bounds, and print labeled results and a description of any rejection. Submit a README with compile/run commands and three meaningful Git commits.
8. Create a Java console program on JDK 27: sides a,b 1..1000 m, maximum post spacing s 0.1..10 m, and price per meter p 0..10000; print the perimeter, ceil(2\*(a+b)/s) posts of a closed fence, and the price of the fencing. Read the parameters from the keyboard with Scanner; check the format and bounds, and print labeled results and a description of any rejection. Submit a README with compile/run commands and three meaningful Git commits.
9. Create a Java console program on JDK 27: hours h 0..168 and rate r 0..10000; print the training pay min(h,40)\*r+max(h-40,0)\*1.5\*r without taxes. Read the parameters from the keyboard with Scanner; check the format and bounds, and print labeled results and a description of any rejection. Submit a README with compile/run commands and three meaningful Git commits.
10. Create a Java console program on JDK 27: length a, width b, depth h 0.1..100 m, flow rate q 0.1..1000 m³/h, and water price p 0..1000; print a\*b\*h, the time volume/q, and the payment volume\*p. Read the parameters from the keyboard with Scanner; check the format and bounds, and print labeled results and a description of any rejection. Submit a README with compile/run commands and three meaningful Git commits.

## Topic 2. Types and control flow

11. Create a Java console program on JDK 27: read an amount 0..1000000 and a command add/remove/exit; a training rate of 20 percent, add=s\*1.2, remove=s/1.2; print the base, the tax, and the total. After an invalid line, repeat the input; handle EOF explicitly; keep a count of successful calculations, and test both bounds and an empty stream.
12. Create a Java console program on JDK 27: set a secret 1..100, read up to 7 guesses, and report higher/lower/correct; an invalid token does not use up a guess; EOF ends the game. After an invalid line, repeat the input; handle EOF explicitly; keep a count of successful calculations, and test both bounds and an empty stream.
13. Create a Java console program on JDK 27: read bounds a,b 1..9999 with a&lt;=b; print the leap years by the rule divisible by 400, or by 4 but not by 100, and their count. After an invalid line, repeat the input; handle EOF explicitly; keep a count of successful calculations, and test both bounds and an empty stream.
14. Create a Java console program on JDK 27: read an integer n 0..65535 and a base 2, 8, or 16; print n in the chosen base and the number of one bits. After an invalid line, repeat the input; handle EOF explicitly; keep a count of successful calculations, and test both bounds and an empty stream.
15. Create a Java console program on JDK 27: read an amount 0..100000 that is a multiple of 10; output the minimum number of 100, 50, 20, and 10 bills and verify that the amount is restored. After an invalid line, repeat the input; handle EOF explicitly; keep a count of successful calculations, and test both bounds and an empty stream.
16. Create a Java console program on JDK 27: read n 1..20; print an aligned multiplication table 1..n and the sum of each row. After an invalid line, repeat the input; handle EOF explicitly; keep a count of successful calculations, and test both bounds and an empty stream.
17. Create a Java console program on JDK 27: read a,b 2..100000 with a&lt;=b and b-a&lt;=10000; print the primes and the number of pairs with a difference of 2; check divisors while d&lt;=n/d. After an invalid line, repeat the input; handle EOF explicitly; keep a count of successful calculations, and test both bounds and an empty stream.
18. Create a Java console program on JDK 27: initial balance 10000 cents, training PIN 2468, three attempts; after logging in, the commands balance/withdraw/exit; the amount 1..10000 does not exceed the balance; print the unchanged balance after a rejection. After an invalid line, repeat the input; handle EOF explicitly; keep a count of successful calculations, and test both bounds and an empty stream.
19. Create a Java console program on JDK 27: read integer scores 0..100; local rule A90..100,B82..89,C74..81,D64..73,E60..63,F0..59; print the letter and the number of scores processed. After an invalid line, repeat the input; handle EOF explicitly; keep a count of successful calculations, and test both bounds and an empty stream.
20. Create a Java console program on JDK 27: read a month number 1..12 and a year 1..9999; print the number of days, checking for leap years, and the quarter number, without astrological claims. After an invalid line, repeat the input; handle EOF explicitly; keep a count of successful calculations, and test both bounds and an empty stream.

## Topic 3. Methods, arrays, and strings

21. Create a Java console program: enter 1..20 integers and print the minimum, maximum, and average through three static methods; accumulate the sum in a long and do not modify the array.
22. Create a Java console program: enter n in the range 0..20; a recursive method computes the factorial as a long; print the result and explain the base case for zero.
23. Create a Java console program: enter up to 20 integers; a varargs method returns the sum through Math.addExact; print the sum; return zero when there are no numbers.
24. Create a Java console program: enter a 2 by 3 matrix; a method returns a transposed copy; print both matrices with Arrays.deepToString and check that the rows are independent.
25. Create a Java console program: enter up to 20 grades 0..100 and a target, sort a copy with Arrays.sort, and find the target with binarySearch; print the index or none and the original array.
26. Create a Java console program: enter a string of up to 200 characters, strip leading and trailing Java whitespace, and replace internal runs of it with a single space; print the normalized text.
27. Create a Java console program: enter an ASCII string of up to 100 characters and build the reversed string with StringBuilder; print it and whether it is a palindrome, without changing case.
28. Create a Java console program: enter three lines in the format name;price, with a price of 0..100000 cents; the delimiter is prohibited in the name; split with limit -1 checks for two nonempty fields; print an aligned table and the total as a long.
29. Create a Java console program: enter a name and a score 0..100; a method escapes ampersands and angle brackets in a text cell; a text block with formatted builds an HTML table, which the program prints.
30. Create a Java console program: accept `--help` or `--text` with one string of up to 200 characters; with no arguments, prompt for the string; print length and the number of codePoints, check the number of arguments, and report an invalid format to stderr.

## Topic 4. Exceptions and debugging

31. Create a Java console program on JDK 27: read an ISO date yyyy-MM-dd using the LocalDate calendar; print the day of the year; reject an invalid format or an impossible date, preserving the cause. Use your own domain exception type; preserve the cause when wrapping. Test normal, boundary, and invalid input, and verify that the state is unchanged after a rejection.
32. Create a Java console program on JDK 27: read two ints and one sign +,-,\*,/; use exact arithmetic, reject a zero divisor and MIN\_VALUE/-1, and print the result or the reason. Use your own domain exception type; preserve the cause when wrapping. Test normal, boundary, and invalid input, and verify that the state is unchanged after a rejection.
33. Create a Java console program on JDK 27: read a finite length 0..1000000 and a unit mm/cm/m; print meters; reject an unknown unit and out-of-range values. Use your own domain exception type; preserve the cause when wrapping. Test normal, boundary, and invalid input, and verify that the state is unchanged after a rejection.
34. Create a Java console program on JDK 27: read a login of 3..20 ASCII letters/digits, an age 1..120, and an email with one @ and nonempty parts; print all local errors or acceptance; do not check whether the address exists. Use your own domain exception type; preserve the cause when wrapping. Test normal, boundary, and invalid input, and verify that the state is unchanged after a rejection.
35. Create a Java console program on JDK 27: an array of 10 free seats; read numbers 1..10; reject an occupied or nonexistent seat without changing the array; print the occupied numbers. Use your own domain exception type; preserve the cause when wrapping. Test normal, boundary, and invalid input, and verify that the state is unchanged after a rejection.
36. Create a Java console program on JDK 27: an initial balance of 100 units; read withdrawals 1..100; on a shortage, throw your own exception and keep the balance; print the state after each attempt. Use your own domain exception type; preserve the cause when wrapping. Test normal, boundary, and invalid input, and verify that the state is unchanged after a rejection.
37. Create a Java console program on JDK 27: read lines of grades 0..100 until EOF; skip invalid lines, reporting the line number and the reason; print the average of the valid grades or that there is no data. Use your own domain exception type; preserve the cause when wrapping. Test normal, boundary, and invalid input, and verify that the state is unchanged after a rejection.
38. Create a Java console program on JDK 27: read two finite numbers latitude\[-90,90\], longitude\[-180,180\]; print a normalized representation with 6 decimal places; reject other data. Use your own domain exception type; preserve the cause when wrapping. Test normal, boundary, and invalid input, and verify that the state is unchanged after a rejection.
39. Create a Java console program: a static method computes the average of only the positive elements of an int array and returns null if there are none; for the array 10, −5, 20, print 15.0. First deliberately divide the sum by the length of the whole array, find and explain this bug with the debugger, fix the division to use the number of positive elements, and keep the test for an array with no positive elements.
40. Create a Java program with a training AutoCloseable resource that reports when it is closed. In try-with-resources, simulate an error in the body and an error in close; print the primary type and the suppressed one, and verify the reverse closing order of two resources.

## Topic 5. Classes and objects

41. Create a Java console program: enter a 16-digit number, a balance of 0..1000000 cents, and a withdrawal amount; the Card class hides the balance, withdraws only a positive available amount, and shows the masked number and the new balance. Submit a UML class diagram; use private fields, a validated constructor, access methods, and `toString()`.
42. Create a Java console program: enter a nonempty book title, a year 1450..2100, and a number of copies 0..1000; the Book class lends one copy only if one is available; print the title and the remaining copies. Submit a UML class diagram; use private fields, a validated constructor, access methods, and `toString()`.
43. Create a Java console program: enter a student's name and three grades 0..100; the Student class stores a copy of the array and computes the average; print the name, the average, and the lowest grade. Submit a UML class diagram; use private fields, a validated constructor, access methods, and `toString()`.
44. Create a Java console program: enter the current and desired temperatures −30..50 degrees; the Thermostat class with a validated setter shows the heating mode if the current temperature is below the desired one. Submit a UML class diagram; use private fields, a validated constructor, access methods, and `toString()`.
45. Create a Java console program: enter a model, a charge 0..100, and a consumption of 0..100 percentage points; the Phone class uses charge only if enough remains; print the model and the charge. Submit a UML class diagram; use private fields, a validated constructor, access methods, and `toString()`.
46. Create a Java console program: enter a numerator −10000..10000 and a nonzero denominator within the same bounds; the Fraction class reduces the fraction by the GCD and moves the sign to the numerator; print the normal form. Submit a UML class diagram; use private fields, a validated constructor, access methods, and `toString()`.
47. Create a Java console program: enter the real and imaginary parts −1000..1000; an immutable Complex returns the modulus through Math.hypot and the conjugate; print both results. Submit a UML class diagram; use private fields, a validated constructor, access methods, and `toString()`.
48. Create a Java console program: enter hours 0..23, minutes 0..59, and a shift of −10000..10000 minutes; TimeOfDay stores the minutes of the day and applies Math.floorMod with 1440; print the time after the shift. Submit a UML class diagram; use private fields, a validated constructor, access methods, and `toString()`.
49. Create a Java console program: enter a name, a price of 0..100000 cents, and a quantity 1..100; CartItem computes the cost as a long; print the name and the cost. Submit a UML class diagram; use private fields, a validated constructor, access methods, and `toString()`.
50. Create a Java console program: enter a capacity 1..1000, occupied spaces 0..capacity, and the number of arriving cars; Parking admits the cars only if there are spaces for all of them; print the free spaces. Submit a UML class diagram; use private fields, a validated constructor, access methods, and `toString()`.

## Topic 6. Inheritance and polymorphism

51. Create a Java console program: enter a type car or bike, days 1..30, and a rate of 1..100000 cents; Rental and two subclasses compute the price: car adds 10000 for insurance, bike has no surcharge; print the type and the amount. Submit a UML class diagram; use `extends`, an explicit `super`, private fields, and overriding with `@Override`; process the result through the base type.
52. Create a Java console program: enter a type standard or savings and a balance of 0..1000000 cents; Account and SavingsAccount close a period: standard is unchanged, savings adds one percent, discarding the fractional cent; print the balance. Submit a UML class diagram; use `extends`, an explicit `super`, private fields, and overriding with `@Override`; process the result through the base type.
53. Create a Java console program: enter a name, a price 0..1000000, and a type normal or sale; Product and DiscountProduct return the price unchanged or with a 10 percent discount; print the price in cents. Submit a UML class diagram; use `extends`, an explicit `super`, private fields, and overriding with `@Override`; process the result through the base type.
54. Create a Java console program: enter a type audio or video, a title, and seconds 1..7200; Media and its subclasses show a description; for video, also enter a height of 480, 720, or 1080; print the polymorphic description. Submit a UML class diagram; use `extends`, an explicit `super`, private fields, and overriding with `@Override`; process the result through the base type.
55. Create a Java console program: enter a type warrior or mage, a name, and a strength 1..100; Character and its subclasses compute a nominal attack as double or triple the strength; print the attack. Submit a UML class diagram; use `extends`, an explicit `super`, private fields, and overriding with `@Override`; process the result through the base type.
56. Create a Java console program: enter a type flat or house, an area 1..1000, and a rate of 1..100000 per square meter; Property and its subclasses return the area multiplied by the rate; house adds 100000; print the nominal price. Submit a UML class diagram; use `extends`, an explicit `super`, private fields, and overriding with `@Override`; process the result through the base type.
57. Create a Java console program: enter a type standard or student, a route, and a base price of 1..100000 cents; Ticket and StudentTicket apply a 0 or 50 percent discount; print the description and the price. Submit a UML class diagram; use `extends`, an explicit `super`, private fields, and overriding with `@Override`; process the result through the base type.
58. Create a Java console program: enter a type prepaid or contract, a name, and minutes 0..10000; Subscriber and its subclasses compute a nominal bill as minutes times 100, or 5000 plus minutes times 50 cents; print the bill. Submit a UML class diagram; use `extends`, an explicit `super`, private fields, and overriding with `@Override`; process the result through the base type.
59. Create a Java console program: enter a type cat or bird and a name; Animal and its subclasses return meow or chirp through sound; print the name and the sound. Submit a UML class diagram; use `extends`, an explicit `super`, private fields, and overriding with `@Override`; process the result through the base type.
60. Create a Java console program: enter a type sms or email, a nonempty recipient, and text of up to 100 characters; Notification and its subclasses build a text description without actually sending anything; print the channel, the recipient, and the text. Submit a UML class diagram; use `extends`, an explicit `super`, private fields, and overriding with `@Override`; process the result through the base type.

## Topic 7. Abstraction and interfaces

61. Create a Java console program: enter a type card or transfer and an amount of 1..1000000 cents; Payment has a fee method; the implementations return 2 percent or 100 cents; print the fee and the total without a real payment. Submit a UML class diagram; define an explicit interface or abstract class and at least two implementations; do not use lambdas.
62. Create a Java console program: enter a type rectangle or triangle and a size 1..20; an abstract Figure and Drawable build lines of asterisks: a square of size n or a triangle with rows 1..n; print the drawing. Submit a UML class diagram; define an explicit interface or abstract class and at least two implementations; do not use lambdas.
63. Create a Java console program: enter up to 20 nonempty names and scores 0..100; Student implements Comparable by name, and an anonymous Comparator sorts by score in descending order, then by name; print both orders. Submit a UML class diagram; define an explicit interface or abstract class and at least two implementations; do not use lambdas.
64. Create a Java console program: enter ISO start and end dates within 2020..2030 and a step of 1..30 days; DateRange implements Iterable with an inner Iterator and yields dates from the start inclusive to the end exclusive; print the dates. Submit a UML class diagram; define an explicit interface or abstract class and at least two implementations; do not use lambdas.
65. Create a Java console program: enter a string of up to 200 characters and a mode trim or upper; TextFilter and its implementations apply strip or toUpperCase with Locale.ROOT; print the result. Submit a UML class diagram; define an explicit interface or abstract class and at least two implementations; do not use lambdas.
66. Create a Java console program: enter a name, on or off, and a brightness 0..100; Device implements Switchable and Adjustable; a default toggle changes the state through the contract methods; print the state and the level. Submit a UML class diagram; define an explicit interface or abstract class and at least two implementations; do not use lambdas.
67. Create a Java console program: enter a title and three integers −1000..1000; an abstract Report has a final render and an abstract body; TextReport separates the numbers with spaces, CsvReport with semicolons; print both reports. Submit a UML class diagram; define an explicit interface or abstract class and at least two implementations; do not use lambdas.
68. Create a Java console program: enter an amount 0..1000000 and a type none or percent; DiscountPolicy returns the final price unchanged or minus 10 percent in whole cents; print the amount. Submit a UML class diagram; define an explicit interface or abstract class and at least two implementations; do not use lambdas.
69. Create a Java console program: enter up to 20 integers and a type stack or queue; IntContainer defines add, remove, and size; two implementations return the last or the first element; print the removal order. Submit a UML class diagram; define an explicit interface or abstract class and at least two implementations; do not use lambdas.
70. Create a Java console program: enter two die faces 1..6; an abstract DiceGame fixes the validation, and ScoreRule defines the sum or the maximum; print the score for each rule without randomness. Submit a UML class diagram; define an explicit interface or abstract class and at least two implementations; do not use lambdas.

## Topic 8. Records, enums, sealed classes

71. Create a Java console program: enter an operation add or mul and two integers −1000..1000; a sealed Expr with records Num, Add, and Mul is evaluated by an exhaustive switch; print the result using Math.addExact and multiplyExact. Submit a UML class diagram; use validated records, an enum, or a sealed hierarchy as appropriate for the model; use stable JDK 27 syntax without preview.
72. Create a Java console program: enter a suit CLUBS, DIAMONDS, HEARTS, or SPADES and a rank 2..14; enum Suit and Rank with an explicit strength, and record Card; print the card and its strength. Submit a UML class diagram; use validated records, an enum, or a sealed hierarchy as appropriate for the model; use stable JDK 27 syntax without preview.
73. Create a Java console program: enter a state RED, GREEN, or YELLOW and a number of steps 0..20; enum Light transitions RED→GREEN→YELLOW→RED through a switch; print the sequence. Submit a UML class diagram; use validated records, an enum, or a sealed hierarchy as appropriate for the model; use stable JDK 27 syntax without preview.
74. Create a Java console program: enter a type circle or rectangle and positive finite dimensions up to 10000; a sealed Shape and records Circle and Rectangle are evaluated with record patterns; print the area. Submit a UML class diagram; use validated records, an enum, or a sealed hierarchy as appropriate for the model; use stable JDK 27 syntax without preview.
75. Create a Java console program: enter a title, an ISO date 2020..2030, and start and end minutes 0..1440, with the start less than the end; Event validates its components; print the duration. Submit a UML class diagram; use validated records, an enum, or a sealed hierarchy as appropriate for the model; use stable JDK 27 syntax without preview.
76. Create a Java console program: enter an identifier, a state NEW, PAID, SENT, DONE, or CANCELLED, and a target; allow NEW→PAID/CANCELLED, PAID→SENT/CANCELLED, SENT→DONE; record Order returns the new state or a rejection. Submit a UML class diagram; use validated records, an enum, or a sealed hierarchy as appropriate for the model; use stable JDK 27 syntax without preview.
77. Create a Java console program: enter a type card or cash and an amount of 1..1000000 cents; a sealed Payment with records CardPayment and CashPayment, a fee of 2 percent or 0; print the nominal amount without a real transaction. Submit a UML class diagram; use validated records, an enum, or a sealed hierarchy as appropriate for the model; use stable JDK 27 syntax without preview.
78. Create a Java console program: enter a state IDLE, CLEANING, or CHARGING and a command start, dock, or stop; the enum transitions IDLE→CLEANING on start, any→CHARGING on dock, CLEANING/CHARGING→IDLE on stop; print the state or a rejection. Submit a UML class diagram; use validated records, an enum, or a sealed hierarchy as appropriate for the model; use stable JDK 27 syntax without preview.
79. Create a Java console program: enter a length 0..1000000 and a unit M or CM; enum Unit has a coefficient to meters; record Length checks finiteness; print meters. Submit a UML class diagram; use validated records, an enum, or a sealed hierarchy as appropriate for the model; use stable JDK 27 syntax without preview.
80. Create a Java console program: enter an integer string; a sealed ParseResult with records Success(int value) and Failure(String reason); a switch prints the doubled value as a long or the reason. Submit a UML class diagram; use validated records, an enum, or a sealed hierarchy as appropriate for the model; use stable JDK 27 syntax without preview.

## Topic 9. Generics

81. Create a Java console program: implement `Pair<A,B>` with a swap method; for the pair ("Ada", 7), print (7, "Ada") and check that a double swap returns the original pair.
82. Create a Java console program: implement `Box<T>` with put and get methods; store 5, replace it with 8, and print 8; reading from an empty box must throw NoSuchElementException.
83. Create a Java console program: implement a generic method first that returns the first element of a nonempty T[] array; for {"a", "b"}, print "a"; reject an empty array with IllegalArgumentException.
84. Create a Java console program: implement a generic method max for a T[] array with the bound `T extends Comparable<? super T>`; for {2, 9, 4}, print 9; test a single-element array and reject an empty array.
85. Create a Java console program: implement a generic method contains for a T[] array using Objects.equals; for {"a", null} and a search for null, print true.
86. Create a Java console program: implement a generic method swap that exchanges two elements of a T[] array by index; for {1, 2, 3} and indices 0 and 2, print {3, 2, 1}; reject invalid indices.
87. Create a Java console program: implement a sum method for `List<? extends Number>` that returns a double; for {2, 3.5}, print 5.5; for an empty list, 0.0; prohibit a null list.
88. Create a Java console program: implement an append method that adds an integer to a `List<? super Integer>`; add 7 to an empty `ArrayList<Number>` and print [7].
89. Create a Java console program: implement `Range<T extends Comparable<? super T>>` with closed bounds and a contains method; for bounds 2 and 5, test 2, 5, and 6 with the results true, true, false; reject reversed bounds.
90. Create a Java console program: implement `Stack<T>` on top of `ArrayList<T>` with push and pop methods; push "a", "b" and print "b", "a"; pop on an empty stack must throw NoSuchElementException.

## Topic 10. Collections

91. Create a Java console program: for the `List<Integer>` [1,2,1,3], remove only the first occurrence of the value 1, not the element at index 1; print [2,1,3].
92. Create a Java console program: from the list ["b","a","b"], build a LinkedHashSet and print [b,a]; explain why the order of first appearance is preserved.
93. Create a Java console program: find the intersection of the sets {1,2,3} and {2,4} without modifying either of them; print {2}.
94. Create a Java console program: add A,B,C to an ArrayDeque used as a FIFO queue and remove A,B,C in turn; show that poll on an empty queue returns null.
95. Create a Java console program: add A,B to an ArrayDeque used as a stack and remove B,A; catch and report the exception from pop on an empty stack.
96. Create a Java console program: count the frequencies of the elements of the list ["a","b","a"] with a HashMap; print the report through a TreeMap as a=2,b=1.
97. Create a Java console program: for the TreeSet {10,20,30}, print floor(25)=20 and ceiling(25)=30; test the case of a missing neighbor, for example floor(5), which returns null.
98. Create a Java console program: insert the keys B,A,C into a LinkedHashMap and print them in reverse order C,A,B through reversed.
99. Create a Java console program: add the numbers 5,1,3 to a PriorityQueue and remove them with poll in the order 1,3,5; do not use the iteration order as the result.
100. Create a Java console program: build an ArrayList [1,2], take an immutable snapshot with List.copyOf, and add 3 to the original list; print the snapshot [1,2].

## Topic 11. Lambdas and the Stream API

101. Create a Java console program: using a `Predicate<Integer>`, select the positive numbers from the list [-1,0,2,3] and print [2,3].
102. Create a Java console program: using a `Function<String,Integer>`, convert the list ["a","bbb"] into string lengths and print [1,3].
103. Create a Java console program: by composing two Predicates with and, check that a number is greater than 0 and less than 10; for 0, 5, 10, print false, true, false.
104. Create a Java console program: sort the list ["bbb","a","cc"] with Comparator.comparingInt(String::length) and print [a,cc,bbb].
105. Create a Java console program: for Optional.empty(), get the label absent through orElseGet; for Optional.of("ok"), print ok.
106. Create a Java console program: from the list [1,2,3,4], use Stream API filter and map to get the squares of the even numbers and print [4,16].
107. Create a Java console program: use flatMap to flatten the list of lists [[1,2],[],[3]] and print [1,2,3].
108. Create a Java console program: use groupingBy and counting to count the occurrences of the elements of the list ["a","b","a"] and print a=2,b=1 in a stable key order.
109. Create a Java console program: using IntStream.rangeClosed(1,5), compute and print the sum 15; explain why both bounds are inclusive.
110. Create a Java console program: using Gatherers.windowSliding(2) on the list [1,2,3], get and print [[1,2],[2,3]]; also test an empty source.

## Topic 12. Files, NIO.2, and serialization

111. Create a Java console program: write the lines "Café" and "Naïve" to a UTF-8 file, read the file, and print both lines; close all resources with try-with-resources.
112. Create a Java console program: write a UTF-8 file of three lines – "a", an empty line, and "b" – without a final line break, read it, and print the line count 3; for an empty file, print 0.
113. Create a Java console program: write the bytes {0,1,255} to a file, copy it to a new file without overwriting an existing one, and check that Files.mismatch returns -1.
114. Create a Java console program: for Path.of("data","input.txt"), print fileName and the absolute path; do not assume that the working directory matches the project directory in the IDE.
115. Create a Java console program: write an int 42 and a double 2.5 to a file with DataOutputStream, read them with DataInputStream in the same order, and print them.
116. Create a Java console program: read a Properties file with the line limit=7 through a UTF-8 Reader and print 7; if the limit key is missing, return 20; reject non-integer text.
117. Create a Java console program: create a test directory with several files and a subdirectory; using Files.list, print the names of regular files only in alphabetical order, closing the Stream.
118. Create a Java console program: write a restricted CSV of two lines – the header "name,count" and the record "Tea,3" – without a final line break; read the file, check the header, and print Tea:3.
119. Create a Java console program: serialize to your own file an object of a Serializable class with the name Ada and a transient field note; after restoring it from the file, check that note == null.
120. Create a Java console program: create a temporary file, write three bytes, print Files.size == 3, and delete only this file in a finally block.

## Topic 13. Modules, builds, and testing

121. Create a standalone Java program. Write a square class and three JUnit tests of the area: a normal side, zero, and a negative side with an exception.
122. Create a standalone Java program. Write module-info for a converter library and a client; open only the API package and run the conversion of 20 °C to 68 °F using the formula `F=C*1.8+32`.
123. Create a standalone Java program. Create a Maven POM with release 27 and JUnit; write and run a test that adds two numbers.
124. Create a standalone Java program. Create a Gradle Java project with toolchain 27 and useJUnitPlatform; test finding the maximum of three numbers.
125. Create a standalone Java program. Write a parameterized parity test for six integers, including zero and a negative number.
126. Create a standalone Java program. Write an assertThrows test for division by zero and check correct integer division.
127. Create a standalone Java program. Create a test class with BeforeEach for a new list; test adding and clearing with independent tests.
128. Create a standalone Java program: a library class computes the cost of a product as the price in cents multiplied by the quantity using Math.multiplyExact; use JUnit tests to check a normal price, a zero quantity, and overflow of the product.
129. Create a standalone Java program. Create two packages in a module, export the API, and explain the error when a client tries to import an internal class.
130. Create a standalone Java program. Build an executable JAR of a greeting program, run it outside the IDE, and show the report of one JUnit test.

## Topic 14. Databases and JDBC

131. Create a standalone Java program. Connect to a training PostgreSQL database and print the DBMS name and the driver version; close the Connection.
132. Create a Java/JDBC console program with PostgreSQL: create a temporary contacts table (id, name, phone), insert two records, and print them in ascending id order.
133. Create a Java/JDBC console program with PostgreSQL: a products table (id, name, price in cents); find a product by the entered name with a parameterized PreparedStatement query, and print the matching rows or report that there is no match.
134. Create a Java/JDBC console program with PostgreSQL: a products table (id, name, price in cents); using the entered id and new price, change the price with a parameterized UPDATE and print the number of changed rows; reject a negative price before the query.
135. Create a Java/JDBC console program with PostgreSQL: a readers table with an automatic id and a name; insert the entered reader through a PreparedStatement and print the generated id from getGeneratedKeys.
136. Create a Java/JDBC console program with PostgreSQL: tables of authors (id, name) and books (id, title, `author_id`); read books with their authors through a JOIN into a list of record objects and print a title – author table.
137. Create a Java/JDBC console program with PostgreSQL: tables of categories (id, name) and products (id, name, `category_id`); count the products in each category with LEFT JOIN and GROUP BY, including an empty category, and order the report by category name.
138. Create a Java/JDBC console program with PostgreSQL: an accounts table (id, balance in cents); perform a transfer as two balance changes in one transaction, simulate an error between them, and confirm by rereading that rollback left both balances unchanged.
139. Create a Java/JDBC console program with PostgreSQL: a contacts table (id, name, phone); add three records through addBatch/executeBatch and print the number of saved rows.
140. Create a Java/JDBC console program with PostgreSQL: a book loans table (id, book title, loan date, return date that may be NULL); read the return date with getObject(LocalDate.class) and show the date or “not returned”.

## Topic 15. JavaFX graphical applications

141. Create a JavaFX application: a window with a Label and a Button; each click increases a counter in the Label up to a maximum of 100; a separate reset button returns it to 0.
142. Create a JavaFX application: a rectangle area form on a GridPane with width and height fields and a calculate button; check that positive finite numbers were entered, and show the area or an error message.
143. Create a JavaFX application “Shopping list”: a TextField and a ListView; Enter adds a nonempty line to the list; a button removes the selected line.
144. Create a JavaFX application: a form with several RadioButtons in one ToggleGroup and a CheckBox; after the confirm button is clicked, show the selected values in a Label.
145. Create a JavaFX application “Temperature converter”: a Celsius field and a convert button show degrees Fahrenheit using the formula `F=C*1.8+32`; reject empty text, a non-numeric value, and a temperature below absolute zero −273.15 °C with a message.
146. Create a JavaFX application: a window on a BorderPane with a TextArea in the center and a menu with an item that clears the text; clearing asks for confirmation in a dialog; canceling the dialog does not change the TextArea.
147. Create a JavaFX application: a Slider sets the scale of a shape in the window, and a Label shows the current numeric scale value.
148. Create a JavaFX application: load a simple FXML form with a button and a Label; a button handler annotated with `@FXML` in the controller shows the result of the click in the Label.
149. Create a JavaFX application: a Canvas on which dragging the mouse draws a line, and a button that clears the canvas.
150. Create a JavaFX application “Text viewer”: a button opens a UTF-8 file through a FileChooser and shows its contents in a TextArea; report an IOException in a dialog without losing the previous text.

## Topic 16. MVC and data binding

151. Create a JavaFX application: bind a profile model with name and email fields as StringProperty bidirectionally to two TextFields of a form; the Cancel button restores the snapshot of values saved before editing.
152. Create a JavaFX application “Order”: product name and quantity fields; bind the availability of the confirm button to a nonempty name and a positive integer quantity; after the click, show an order summary.
153. Create a JavaFX application: an ObservableList of city names in a ListView; a FilteredList selects cities by the search field text, and a Label shows the number of items found.
154. Create a JavaFX application: a TableView of books with id and title columns, filled with several records; set the cellValueFactory with lambdas, and show the id of the selected book in a Label.
155. Create a JavaFX application in FXML: a main window with a list of contacts (name, phone, email); pass the selected contact to the controller of a second FXML window through FXMLLoader.getController and show the details there.
156. Create a JavaFX application: a list of titles is loaded from a DAO in a Task; show a busy indicator during loading, and handle a DAO error in onFailed without blocking the FX thread; for testing, the DAO has a delay mode and an error mode.
157. Create a JavaFX/JDBC application with PostgreSQL: a form with book title and author fields; a button calls the DAO through a Task to add the book to the books table; after an error, the entered text stays in the fields.
158. Create a standalone Java program: a book-adding service validates the title and passes the book to a DAO interface; a JUnit test with a fake DAO checks that an empty title is not saved and a valid one is passed to the DAO exactly once.
159. Create a JavaFX application: a TableView of products (name, price) with a search field using a FilteredList; wrap the FilteredList in a SortedList, bind its comparatorProperty to the table's comparatorProperty, and test sorting by column after filtering.
160. Create a JavaFX application: a TableView of records loaded through a DAO, and a button that deletes the selected record with a confirmation dialog; Cancel does not call the DAO, and a successful deletion refreshes the table.
