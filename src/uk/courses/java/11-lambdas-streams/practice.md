---
title: "Практика"
description: "Тема 11. Лямбди та Stream API: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Пошук словникової статті

Пошук повертає Optional, бо відсутнє слово є звичайним результатом. Консольна межа обирає одну з двох політик: запасний напис або предметний виняток. `findFirst` зберігає правило першого збігу, тож дублікати мають бути або заборонені при введенні, або пояснені.

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

Окремо перевірте порожній словник і різний регістр. Для цього навчального словника дозволені латинські слова; складні мовні правила порівняння потребують іншого контракту нормалізації. Не повертайте null замість Optional.empty.

## Приклад 2. Частоти слів кількох рядків

Кожен рядок дає потік слів, flatMap об’єднує ці потоки, а toMap явно підсумовує повторні ключі. Сортування звіту визначає спочатку частоту за спаданням, потім слово за зростанням.

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

Без функції Integer::sum повторне слово спричинило б виняток дубліката ключа. Перевірте рядки лише з роздільниками, однакові частоти й один довгий рядок. Зміна порядку записів HashMap не повинна змінити надрукований звіт.

## Приклад 3. Розклад робочих дат

Stream.iterate генерує послідовні дати, takeWhile задає включну верхню межу, filter залишає будні. Вихідні тут визначено лише як суботу й неділю; офіційні свята не входять у модель.

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

Для навчального контракту дати обмежено звичайним календарним діапазоном, наприклад роками 1900–2100. Без цього обмеження нескінченний iterate після LocalDate.MAX переповнив би дату перед перевіркою наступного елемента. Альтернативою є генерація скінченної кількості зміщень від початку; це доречно, коли треба підтримати весь діапазон LocalDate.
