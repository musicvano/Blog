---
title: "Practice"
description: "Topic 2. Types, operations, and control flow: worked examples"
outline: [2, 3]
sourceHash: "05b48eb63ec00393deff888550ad65d82d366604bb2813e5634ded47b45c6bf5"
---

# Practice

## Example 1. Season

Enter a month number from 1–12. An invalid token and an out-of-range number have explicit messages.

```java
import java.util.Scanner;

public class Season {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        if (!in.hasNextInt()) {
            System.out.println("A month number is required");
            return;
        }
        int month = in.nextInt();
        String season = switch (month) {
            case 12, 1, 2 -> "Winter";
            case 3, 4, 5 -> "Spring";
            case 6, 7, 8 -> "Summer";
            case 9, 10, 11 -> "Fall";
            default -> "Month out of range";
        };
        System.out.println(season);
    }
}
```

For 12, expect `Winter`; for 3, `Spring`; for 0, rejection. Every valid number belongs to exactly one branch, so the result is unambiguous.

## Example 2. Digits of a number

Enter a nonnegative integer no greater than one billion. Find the sum of its digits and the number with reversed digit order. Leading zeros in the reversed representation are not retained as part of a number.

```java
import java.util.Scanner;

public class Digits {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        if (!in.hasNextLong()) {
            System.out.println("An integer is required");
            return;
        }
        long value = in.nextLong();
        if (value < 0 || value > 1_000_000_000L) {
            System.out.println("Out of range");
            return;
        }
        long rest = value;
        long reversed = 0;
        int sum = 0;
        do {
            int digit = (int) (rest % 10);
            sum += digit;
            reversed = reversed * 10 + digit;
            rest /= 10;
        } while (rest != 0);
        System.out.println("Sum: " + sum);
        System.out.println("Reversed: " + reversed);
    }
}
```

For 12030, the digit sum is 6 and the reversed number is 3021. For 0, both results are zero; `do-while` processes it as a number with one digit. The `long` type provides room for the reversed representation.

## Example 3. Square root using Newton's method

Enter finite a in the range 0–1000000000000. For positive a, repeat `x = (x + a/x)/2` until relative convergence or 100 iterations. Handle zero separately to avoid division by zero.

```java
import java.util.Locale;
import java.util.Scanner;

public class NewtonRoot {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        in.useLocale(Locale.US);
        if (!in.hasNextDouble()) {
            System.out.println("A number is required");
            return;
        }
        double a = in.nextDouble();
        if (!Double.isFinite(a) || a < 0 || a > 1e12) {
            System.out.println("Out of range");
            return;
        }
        double x = Math.max(1, a);
        boolean converged = a == 0;
        int iterations = 0;
        if (a == 0) x = 0;
        while (!converged && iterations < 100) {
            double next = (x + a / x) / 2;
            converged = Math.abs(next - x)
                    <= 1e-12 * Math.max(1, Math.abs(next));
            x = next;
            iterations++;
        }
        if (!converged) {
            System.out.println("Iteration limit");
            return;
        }
        System.out.printf(Locale.US, "Root: %.6f%n", x);
        System.out.println("Iterations: " + iterations);
    }
}
```

For 9, the root is printed as `3.000000`; for 0, as `0.000000` with no iterations. This is an educational criterion with an absolute component for small values, not a guarantee of equal relative accuracy for every positive `double`. Compare it with `Math.sqrt` for 0, 1, 9, 0.25, and the upper bound.
