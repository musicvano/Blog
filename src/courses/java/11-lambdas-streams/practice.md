---
title: "Practice"
description: "Topic 11. Lambdas and the Stream API: worked examples"
outline: [2, 3]
sourceHash: "aea88921d3a54b1c61abd35e198c1f910937c0c3533acd564cbd08e79419949c"
---

# Practice

## Example 1. Looking up a dictionary entry

The lookup returns an Optional, because a missing word is an ordinary result. The console boundary chooses one of two policies: a fallback label or a domain exception. `findFirst` preserves the first-match rule, so duplicates must either be prohibited on input or explained.

```java
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

public class Main {
    record Entry(String word, String meaning) {}

    static Optional<Entry> find(List<Entry> entries, String word) {
        return entries.stream()
            .filter(e -> e.word().equalsIgnoreCase(word))
            .findFirst();
    }

    public static void main(String[] args) {
        List<Entry> entries = List.of(
            new Entry("stack", "LIFO"),
            new Entry("queue", "FIFO")
        );
        System.out.println(find(entries, "STACK")
            .map(Entry::meaning).orElse("absent"));
        System.out.println(find(entries, "tree")
            .map(Entry::meaning).orElseGet(() -> "not found"));
        try {
            find(entries, "tree").orElseThrow(() ->
                new NoSuchElementException("unknown word"));
        } catch (NoSuchElementException error) {
            System.out.println(error.getMessage());
        }
    }
}
```

```text
LIFO
not found
unknown word
```

Separately test an empty dictionary and different letter case. This training dictionary allows Latin words; complex linguistic comparison rules require a different normalization contract. Do not return null instead of Optional.empty.

## Example 2. Word frequencies across several lines

Each line produces a stream of words, flatMap combines these streams, and toMap explicitly sums repeated keys. The report is sorted first by frequency in descending order, then by word in ascending order.

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> lines = List.of(
            "Red blue", "blue green red", "");
        Map<String, Integer> counts = lines.stream()
            .map(line -> line.toLowerCase(Locale.ROOT))
            .flatMap(line -> Arrays.stream(line.split("[^a-z]+")))
            .filter(word -> !word.isEmpty())
            .collect(Collectors.toMap(
                Function.identity(), word -> 1, Integer::sum));
        Comparator<Map.Entry<String, Integer>> order =
            Map.Entry.<String, Integer>comparingByValue()
                .reversed().thenComparing(Map.Entry.comparingByKey());
        counts.entrySet().stream().sorted(order)
            .forEach(e -> System.out.println(
                e.getKey() + ": " + e.getValue()));
        int total = counts.values().stream()
            .mapToInt(Integer::intValue).sum();
        System.out.println("total: " + total);
    }
}
```

```text
blue: 2
red: 2
green: 1
total: 5
```

Without the Integer::sum function, a repeated word would cause a duplicate key exception. Test lines containing only delimiters, equal frequencies, and a single long line. A change in the order of HashMap entries must not change the printed report.

## Example 3. A schedule of working days

Stream.iterate generates consecutive dates, takeWhile sets an inclusive upper bound, and filter keeps weekdays. The weekend here is defined only as Saturday and Sunday; official holidays are not part of the model.

```java
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Main {
    static String workdays(LocalDate start, LocalDate end) {
        if (start.isAfter(end) || start.getYear() < 1900
                || end.getYear() > 2100) {
            throw new IllegalArgumentException("reversed dates");
        }
        return Stream.iterate(start, day -> day.plusDays(1))
            .takeWhile(day -> !day.isAfter(end))
            .filter(day -> day.getDayOfWeek() != DayOfWeek.SATURDAY)
            .filter(day -> day.getDayOfWeek() != DayOfWeek.SUNDAY)
            .map(LocalDate::toString)
            .collect(Collectors.joining(", "));
    }

    public static void main(String[] args) {
        System.out.println(workdays(LocalDate.of(2026, 9, 4),
            LocalDate.of(2026, 9, 8)));
        System.out.println("weekend: [" + workdays(
            LocalDate.of(2026, 9, 5),
            LocalDate.of(2026, 9, 6)) + "]");
        try {
            workdays(LocalDate.of(2026, 9, 8),
                LocalDate.of(2026, 9, 4));
        } catch (IllegalArgumentException error) {
            System.out.println(error.getMessage());
        }
    }
}
```

```text
2026-09-04, 2026-09-07, 2026-09-08
weekend: []
reversed dates
```

For the training contract, dates are limited to an ordinary calendar range, for example the years 1900–2100. Without this limit, the infinite iterate would overflow the date after LocalDate.MAX before checking the next element. An alternative is to generate a finite number of offsets from the start; this is appropriate when you need to support the entire LocalDate range.
