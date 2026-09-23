---
title: "Practice"
description: "Topic 4. Exceptions and debugging: worked examples"
outline: [2, 3]
sourceHash: "f1a476070bf643444f7560d2b523e644596324c9187bbccbbd727adbcb342ede"
---

# Practice

## Example 1. Parsing time

The format is strictly `HH:mm`: two digits each for the hour and minute, with hours in 0–23 and minutes in 0–59. The result is the number of minutes since the start of the day. This does not parse time zones or daylight saving time transitions.

```java
import java.util.Objects;

public class ParseTime {
    static int minutes(String text) {
        Objects.requireNonNull(text, "text");
        if (!text.matches("[0-9]{2}:[0-9]{2}")) {
            throw new IllegalArgumentException("HH:mm required");
        }
        int hour = Integer.parseInt(text.substring(0, 2));
        int minute = Integer.parseInt(text.substring(3, 5));
        if (hour > 23 || minute > 59) {
            throw new IllegalArgumentException("Time out of range");
        }
        return hour * 60 + minute;
    }

    static int run(String[] args) {
        if (args.length != 1) {
            System.err.println("Usage: ParseTime HH:mm");
            return 2;
        }
        try {
            System.out.println(minutes(args[0]));
            return 0;
        } catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
            return 2;
        }
    }

    public static void main(String[] args) {
        System.exit(run(args));
    }
}
```

For `09:30`, the result is 570; for `23:59`, it is 1439. `9:30` violates the format, and `24:00` violates the bounds. Both failures produce stderr output and code 2. Null is an error in calling the domain method; a Java CLI argument does not become null on its own.

## Example 2. Retrying input

Accept one line containing an integer in 1–100. Repeat the prompt after an invalid line. EOF terminates the program; every actual attempt has a diagnostic entry through `finally`.

```java
import java.util.Scanner;

public class RetryNumber {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in, "UTF-8");
        int attempts = 0;
        while (in.hasNextLine()) {
            String line = in.nextLine();
            attempts++;
            try {
                int value = Integer.parseInt(line.strip());
                if (value < 1 || value > 100) {
                    throw new IllegalArgumentException("Bounds 1..100");
                }
                System.out.println("Accepted: " + value);
                return;
            } catch (IllegalArgumentException e) {
                System.err.println("Rejected: " + e.getMessage());
            } finally {
                System.err.println("Attempt: " + attempts);
            }
        }
        System.out.println("End of input without a result");
    }
}
```

For the lines `abc`, `101`, and `42`, there are three attempts, and 42 is accepted. `NumberFormatException` is a subtype of `IllegalArgumentException`, so the handler covers both cases. In a finished interface, you can separate them into two messages.

Test an empty stream and a stream containing only invalid lines. The loop must not hang after EOF. Note that `finally` also runs after a valid number, before `return`.

## Example 3. Bubble sort boundary

Sort a copy of the array, leaving the original unchanged. The incorrect condition `i < end` goes out of bounds when accessing `copy[i + 1]`. The correct condition is `i + 1 < end`.

```java
import java.util.Arrays;

public class BubbleSort {
    static int[] sorted(int[] values) {
        int[] copy = values.clone();
        for (int end = copy.length; end > 1; end--) {
            boolean changed = false;
            for (int i = 0; i + 1 < end; i++) {
                if (copy[i] > copy[i + 1]) {
                    int temp = copy[i];
                    copy[i] = copy[i + 1];
                    copy[i + 1] = temp;
                    changed = true;
                }
            }
            if (!changed) break;
        }
        return copy;
    }

    static void check(int[] input, int[] expected) {
        int[] before = input.clone();
        if (!Arrays.equals(sorted(input), expected)) {
            throw new AssertionError("Incorrect sorting");
        }
        if (!Arrays.equals(input, before)) {
            throw new AssertionError("Original modified");
        }
    }

    public static void main(String[] args) {
        check(new int[]{}, new int[]{});
        check(new int[]{7}, new int[]{7});
        check(new int[]{3, 1, 2}, new int[]{1, 2, 3});
        check(new int[]{2, 2, -1}, new int[]{-1, 2, 2});
        check(new int[]{1, 2, 3}, new int[]{1, 2, 3});
        System.out.println("Five checks passed");
    }
}
```

An explicit `throw new AssertionError` runs regardless of `-ea`; it differs from an `assert` statement. The check does not copy the sorting algorithm: it compares the domain result and verifies that the input array remains unchanged.

In a temporary copy, restore the incorrect condition `i < end`, set a conditional breakpoint `i == end - 1`, and explain the value of `i + 1`. After the demonstration, restore the correct condition and repeat all five checks.
