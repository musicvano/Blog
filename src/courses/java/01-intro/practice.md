---
title: "Practice"
description: "Topic 1. Java and your first program: worked examples"
outline: [2, 3]
sourceHash: "5cb6fc2c03cfcb6ca373f6426474cd9280e71f9a32115a81b647bcdaf5697c85"
---

# Practice

## Example 1. Student card

Create `StudentCard.java`. The data is for learning purposes and is defined in the code; the program does not request personal information.

```java
public class StudentCard {
    public static void main(String[] args) {
        String name = "Olena Koval";
        String group = "KI-26";
        int year = 2;
        System.out.println("Name: " + name);
        System.out.println("Group: " + group);
        System.out.println("Year: " + year);
    }
}
```

```powershell
javac -encoding UTF-8 StudentCard.java
java '-Dstdout.encoding=UTF-8' StudentCard
```

Three lines are expected: `Name: Olena Koval`, `Group: KI-26`, and `Year: 2`. Compare the result in the *Run* window and in the terminal. Replacing Ukrainian letters with Latin ones is not a fix for incorrect encoding.

## Example 2. Kilometers and miles

The first version's contract: one argument using a decimal point, a finite number from 0 to 1,000,000 km. This example specifically demonstrates valid input; error handling is a separate topic. Conversion factor: one international mile equals 1.609344 km.

```java
import java.util.Locale;

public class Miles {
    public static void main(String[] args) {
        if (args.length != 1) {
            System.err.println("Usage: java Miles kilometers");
            System.exit(2);
        }
        double kilometers = Double.parseDouble(args[0]);
        if (!Double.isFinite(kilometers)
                || kilometers < 0 || kilometers > 1_000_000) {
            System.err.println("Distance outside 0..1000000");
            System.exit(2);
        }
        double miles = kilometers / 1.609344;
        System.out.printf(Locale.US, "Miles: %.3f%n", miles);
    }
}
```

`java Miles 10` prints `Miles: 6.214`. An incorrect number of arguments or an out-of-range number produces exit code 2. The text `abc` still causes a `NumberFormatException`: this is a known limitation of the first version that you should record in the README. Do not claim the program already validates every possible format.

## Example 3. A program and three commits

The program calculates the number of sheets needed for copies of a document. One sheet holds two pages; each copy starts on a new sheet. Five pages and three copies require nine sheets.

```java
public class PrintSheets {
    public static void main(String[] args) {
        int pages = 5;
        int copies = 3;
        int sheetsPerCopy = (pages + 1) / 2;
        int sheets = sheetsPerCopy * copies;
        System.out.println("Sheets per copy: " + sheetsPerCopy);
        System.out.println("Total sheets: " + sheets);
    }
}
```

The first commit contains a working calculation for one copy. The second adds the number of copies and the correct rounding formula. The third adds a README with commands, the JDK version, and the manual check `3 * 3 = 9`. Review `git diff --staged` before each commit.

Compare this with the incorrect formula `(pages * copies + 1) / 2`: it allows a new copy to start on the back of the previous one, which the contract forbids. The history should explain the correction to this specific behavior.
