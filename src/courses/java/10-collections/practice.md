---
title: "Practice"
description: "Topic 10. Collections: worked examples"
outline: [2, 3]
sourceHash: "50ac3d1a39085bb2d0b8e338feba6e570ff0789f298625d09f85ba61fdc2e17e"
---

# Practice

## Example 1. A grade log

The list stores all students, even if their scores are equal. Sorting is by descending score and, on a tie, by id. Lookup by id does not depend on the position after sorting. The record constructor protects the grade range and the validity of the id.

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Main {
    record Grade(int id, String name, int points) {
        Grade {
            if (id <= 0 || name == null || name.isBlank()
                    || points < 0 || points > 100) {
                throw new IllegalArgumentException("invalid grade");
            }
        }
    }

    static Grade find(List<Grade> grades, int id) {
        for (Grade grade : grades) {
            if (grade.id() == id) return grade;
        }
        return null;
    }

    public static void main(String[] args) {
        List<Grade> grades = new ArrayList<>(List.of(
            new Grade(2, "Bohdan", 90),
            new Grade(1, "Ada", 90),
            new Grade(3, "Ira", 75)
        ));
        grades.sort(Comparator.comparingInt(Grade::points)
            .reversed().thenComparingInt(Grade::id));
        int total = 0;
        for (Grade grade : grades) {
            System.out.println(grade.id() + " " + grade.name()
                + " " + grade.points());
            total += grade.points();
        }
        System.out.println("total: " + total);
        System.out.println("found: " + find(grades, 2).name());
        System.out.println("absent: " + (find(grades, 99) == null));
    }
}
```

```text
1 Ada 90
2 Bohdan 90
3 Ira 75
total: 255
found: Bohdan
absent: true
```

For a complete system, add a check for unique ids on insertion: the record itself does not know about the other records in the list. If lookup becomes the main operation, a map keyed by id may be more appropriate; that is not a reason to keep two independent copies of the data without a rule for keeping them consistent.

## Example 2. Balanced brackets

We push opening brackets onto the top of the stack. A closing bracket must match the last unclosed one. Other characters are ignored: this is a bracket check for an ordinary string, not a Java parser, which would have to take literals and comments into account.

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    static boolean balanced(String text) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char symbol : text.toCharArray()) {
            int open = "([{".indexOf(symbol);
            if (open >= 0) {
                stack.push(symbol);
                continue;
            }
            int close = ")]}".indexOf(symbol);
            if (close >= 0) {
                if (stack.isEmpty()) return false;
                if (stack.pop() != "([{".charAt(close)) {
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        String[] inputs = {"a(b[c])", "([)]", "", ")"};
        for (String text : inputs) {
            System.out.println(balanced(text));
        }
    }
}
```

```text
true
false
true
false
```

The empty string is valid because it contains no unclosed brackets. The wrong order `([)]` cannot be detected with just three counters: you need information about nesting. The time complexity is linear, and the extra memory is proportional to the depth.

## Example 3. A cache of recent documents

Access order differs from creation order. After A is read, B becomes the least recently read, so it is the one to evict. The capacity must be positive. Keys and values must not be null, so that a missing key has an unambiguous result.

```java
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;

public class Main {
    static final class Recent {
        private final int capacity;
        private final LinkedHashMap<String, String> data =
            new LinkedHashMap<>(16, 0.75f, true);

        Recent(int capacity) {
            if (capacity <= 0) {
                throw new IllegalArgumentException("capacity");
            }
            this.capacity = capacity;
        }

        void put(String key, String value) {
            Objects.requireNonNull(key);
            Objects.requireNonNull(value);
            data.put(key, value);
            if (data.size() > capacity) data.pollFirstEntry();
        }

        String get(String key) { return data.get(key); }

        Map<String, String> snapshot() {
            return new LinkedHashMap<>(data);
        }
    }

    public static void main(String[] args) {
        Recent recent = new Recent(2);
        recent.put("A", "alpha");
        recent.put("B", "beta");
        System.out.println(recent.get("A"));
        recent.put("C", "gamma");
        System.out.println(recent.snapshot());
        System.out.println(recent.get("B"));
        recent.put("A", "updated");
        System.out.println(recent.snapshot());
    }
}
```

```text
alpha
{A=alpha, C=gamma}
null
{C=gamma, A=updated}
```

The snapshot returns an independent container. Since String values are immutable, no additional deep copying is needed here. Test a capacity of 1, an update that does not increase the size, a miss, and a change to the returned snapshot. For a multithreaded cache, these guarantees are not enough: the compound put–evict operation must be coordinated.
