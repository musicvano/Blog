---
title: "Practice"
description: "Topic 9. Generics: worked examples"
outline: [2, 3]
sourceHash: "b9888e797494bfa289b28131be21667a5f9a2963e5e6f821ee8c6842f24cd136"
---

# Practice

## Example 1. A single-slot container

The container distinguishes the absence of a value from the presence of a non-null reference. The value `null` is prohibited, so the state can be stored in a single field. `put` replaces the previous value, and `get` does not remove it. Reading an empty box is a client state error.

```java
import java.util.NoSuchElementException;
import java.util.Objects;

public class Main {
    static final class Box<T> {
        private T value;

        boolean isEmpty() { return value == null; }

        void put(T next) {
            value = Objects.requireNonNull(next, "value");
        }

        T get() {
            if (isEmpty()) {
                throw new NoSuchElementException("empty");
            }
            return value;
        }

        void clear() { value = null; }
    }

    public static void main(String[] args) {
        Box<String> box = new Box<>();
        System.out.println(box.isEmpty());
        box.put("draft");
        box.put("ready");
        System.out.println(box.get());
        box.clear();
        try {
            box.get();
        } catch (NoSuchElementException error) {
            System.out.println(error.getMessage());
        }
    }
}
```

```text
true
ready
empty
```

Also test `Box<Integer>`, clearing twice, and rejecting `null`. The prohibition of `box.put(42)` for a box of strings is checked with a separate negative compilation test. Catching an exception cannot test code that the compiler does not accept at all.

## Example 2. The bounds of an array

The algorithm makes a single pass and does not sort the input array. The `Comparable<? super T>` bound supports types that inherited comparison from their base type. We reject an empty array: returning made-up bounds for missing data would be an incorrect contract.

```java
import java.util.Objects;

public class Main {
    record Pair<A, B>(A first, B second) {}

    static <T extends Comparable<? super T>>
    Pair<T, T> minmax(T[] values) {
        Objects.requireNonNull(values, "values");
        if (values.length == 0) {
            throw new IllegalArgumentException("empty array");
        }
        T min = Objects.requireNonNull(values[0]);
        T max = min;
        for (T value : values) {
            Objects.requireNonNull(value);
            if (value.compareTo(min) < 0) min = value;
            if (value.compareTo(max) > 0) max = value;
        }
        return new Pair<>(min, max);
    }

    public static void main(String[] args) {
        System.out.println(minmax(new Integer[]{7, -2, 7}));
        System.out.println(minmax(new String[]{"cat", "ant"}));
        System.out.println(minmax(new Integer[]{5}));
        try {
            minmax(new Integer[0]);
        } catch (IllegalArgumentException error) {
            System.out.println(error.getMessage());
        }
    }
}
```

```text
Pair[first=-2, second=7]
Pair[first=ant, second=cat]
Pair[first=5, second=5]
empty array
```

The minimum and maximum are returned as references to the original objects. For mutable objects, the result is not a deep copy. Separately test identical elements, an array in reverse order, and a `null` inside it. For strings, the natural lexicographic Unicode order is used, not the linguistic rules of a dictionary.

## Example 3. Filtering with a consumer of the base type

The condition consumes `T` values, so its parameter has the form `Condition<? super T>`. A condition for `Number` can be applied to an `Integer` array. To preserve the actual array type, we create a copy with `Arrays.copyOf` rather than an unsafe cast of an `Object[]`. The condition is called exactly once for each element.

```java
import java.util.Arrays;
import java.util.Objects;

public class Main {
    interface Condition<T> {
        boolean test(T value);
    }

    static <T> T[] filter(T[] values, Condition<? super T> rule) {
        Objects.requireNonNull(values);
        Objects.requireNonNull(rule);
        T[] result = Arrays.copyOf(values, values.length);
        int size = 0;
        for (T value : values) {
            if (rule.test(value)) result[size++] = value;
        }
        return Arrays.copyOf(result, size);
    }

    public static void main(String[] args) {
        Condition<Number> positive = new Condition<>() {
            public boolean test(Number value) {
                return value != null && value.doubleValue() > 0;
            }
        };
        Integer[] input = {-2, 0, 3, null, 4};
        Integer[] result = filter(input, positive);
        System.out.println(Arrays.toString(result));
        System.out.println(Arrays.toString(input));
        System.out.println(filter(new Integer[0], positive).length);
    }
}
```

```text
[3, 4]
[-2, 0, 3, null, 4]
0
```

An anonymous class implements the condition interface; lambda expressions will be covered separately. The contract of this particular condition allows `null` and rejects it. Another condition may prohibit `null`, but such a policy must be documented explicitly. Check that the result preserves order and that changing a cell of the result does not change a cell of the input array; the objects themselves remain shared.
