---
title: "Практика"
description: "Тема 4. Винятки та налагодження: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Розбір часу

Формат строго `HH:mm`: дві цифри години й хвилини, година 0–23, хвилина 0–59. Результат – хвилини від початку доби. Це не розбір часового поясу чи переходу на літній час.

```java
import java.util.Objects;

public class ParseTime {
    static int minutes(String text) {
        Objects.requireNonNull(text, "text");
        if (!text.matches("[0-9]{2}:[0-9]{2}")) {
            throw new IllegalArgumentException("Потрібно HH:mm");
        }
        int hour = Integer.parseInt(text.substring(0, 2));
        int minute = Integer.parseInt(text.substring(3, 5));
        if (hour > 23 || minute > 59) {
            throw new IllegalArgumentException("Час поза межами");
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

Для `09:30` результат 570, для `23:59` – 1439. `9:30` порушує формат, `24:00` – межі. Обидві відмови дають stderr і код 2. Null є помилкою виклику предметного методу; CLI-аргумент Java не стає null сам по собі.

## Приклад 2. Повторення вводу

Прийняти один рядок із цілим числом 1–100. Після неправильного рядка повторити запит. EOF завершує програму; кожна фактична спроба має запис у діагностиці через `finally`.

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
                    throw new IllegalArgumentException("Межі 1..100");
                }
                System.out.println("Прийнято: " + value);
                return;
            } catch (IllegalArgumentException e) {
                System.err.println("Відмова: " + e.getMessage());
            } finally {
                System.err.println("Спроба: " + attempts);
            }
        }
        System.out.println("Кінець вводу без результату");
    }
}
```

Для рядків `abc`, `101`, `42` виконуються три спроби, приймається 42. `NumberFormatException` є підтипом `IllegalArgumentException`, тому обробник охоплює обидва випадки. У готовому інтерфейсі можна розділити їх на два повідомлення.

Перевірте порожній потік і потік лише неправильних рядків. Цикл не повинен зависнути після EOF. Зверніть увагу: `finally` виконується також після правильного числа, перед `return`.

## Приклад 3. Межа бульбашкового сортування

Потрібно відсортувати копію масиву, залишивши оригінал незмінним. Помилковий фрагмент `i < end` при зверненні до `copy[i + 1]` виходить за межі. Правильна умова – `i + 1 < end`.

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
            throw new AssertionError("Неправильне сортування");
        }
        if (!Arrays.equals(input, before)) {
            throw new AssertionError("Оригінал змінено");
        }
    }

    public static void main(String[] args) {
        check(new int[]{}, new int[]{});
        check(new int[]{7}, new int[]{7});
        check(new int[]{3, 1, 2}, new int[]{1, 2, 3});
        check(new int[]{2, 2, -1}, new int[]{-1, 2, 2});
        check(new int[]{1, 2, 3}, new int[]{1, 2, 3});
        System.out.println("П’ять перевірок пройдено");
    }
}
```

Явний `throw new AssertionError` виконується незалежно від `-ea`; він відрізняється від інструкції `assert`. Перевірка не копіює алгоритм сортування: вона порівнює предметний результат і незмінність вхідного масиву.

У тимчасовій копії поверніть помилкову умову `i < end`, поставте умовну точку зупинки `i == end - 1` і поясніть значення `i + 1`. Після демонстрації відновіть правильну умову і повторіть усі п’ять перевірок.
