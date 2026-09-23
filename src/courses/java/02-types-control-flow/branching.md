---
title: "Branching: if and switch"
description: "Topic 2. Types, operations, and control flow: Branching: if and switch"
outline: [2, 3]
sourceHash: "37fe28b84ac9f5465351148c4fdff097be97b861e6f770370f2e9d6d71a9b804"
---

# Branching: if and switch

## if and the switch expression

`if` selects a branch using a boolean condition. Use braces even for a short body when this reduces the risk of errors as statements are added. A nested `else` belongs to the nearest unmatched `if`.

A modern `switch` can be an expression. An arrow branch does not fall through to the next one. Use `yield` for a block that must produce a switch expression's value. Exhaustiveness matters: the compiler must know the value for every case.

```java
public class Delivery {
    public static void main(String[] args) {
        int zone = 2;
        int price = switch (zone) {
            case 1 -> 40;
            case 2, 3 -> 60;
            default -> {
                System.out.println("Remote zone");
                yield 100;
            }
        };
        System.out.println("Delivery: " + price);
    }
}
```

Output: `Delivery: 60`. The older switch with colons and `break` remains part of the language, so you need to be able to read it. For new, simple choices, arrows reduce the risk of accidental fall-through. Description of switch expressions: <https://openjdk.org/jeps/361>.

Types and patterns in `switch` are covered in Topic 8. Do not move a preview example with a `double` selector into a basic program without checking the feature's status. The main examples in this course do not require preview features.

### Example 2. Menu-based calculator

Contract: an operation `+`, `-`, `*`, `/`, or `exit`, followed by two finite numbers with a decimal point. Invalid input does not change the success counter.

```java
import java.util.Locale;
import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in, "UTF-8");
        in.useLocale(Locale.US);
        int completed = 0;
        while (in.hasNext()) {
            String operation = in.next();
            if (operation.equals("exit")) break;
            if (!operation.matches("[+*/-]")) {
                System.out.println("Unknown operation");
                if (in.hasNextLine()) in.nextLine();
                continue;
            }
            if (!in.hasNextDouble()) {
                System.out.println("First number required");
                if (in.hasNextLine()) in.nextLine();
                continue;
            }
            double a = in.nextDouble();
            if (!in.hasNextDouble()) {
                System.out.println("Second number required");
                if (in.hasNextLine()) in.nextLine();
                continue;
            }
            double b = in.nextDouble();
            if (!Double.isFinite(a) || !Double.isFinite(b)
                    || (operation.equals("/") && b == 0)) {
                System.out.println("Invalid operands");
                continue;
            }
            double result = switch (operation) {
                case "+" -> a + b;
                case "-" -> a - b;
                case "*" -> a * b;
                default -> a / b;
            };
            if (!Double.isFinite(result)) {
                System.out.println("Nonfinite result");
                continue;
            }
            completed++;
            System.out.printf(Locale.US, "%.3f%n", result);
        }
        System.out.println("Successful: " + completed);
    }
}
```

For the lines `+ 2 3`, `/ 4 0`, and `exit`, the output is `5.000`, an operands message, and `Successful: 1`. For now, read the regular expression in the operation check as a list of permitted single characters; the next topic covers regular expressions more generally.
