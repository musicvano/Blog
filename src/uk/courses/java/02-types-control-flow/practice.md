---
title: "Практика"
description: "Тема 2. Типи, операції, керування: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Пора року

Ввести номер місяця 1–12. Некоректний токен і число поза діапазоном мають явні повідомлення.

```java
import java.util.Scanner;

public class Season {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        if (!in.hasNextInt()) {
            System.out.println("Потрібний номер місяця");
            return;
        }
        int month = in.nextInt();
        String season = switch (month) {
            case 12, 1, 2 -> "Зима";
            case 3, 4, 5 -> "Весна";
            case 6, 7, 8 -> "Літо";
            case 9, 10, 11 -> "Осінь";
            default -> "Місяць поза межами";
        };
        System.out.println(season);
    }
}
```

Для 12 очікується `Зима`, для 3 – `Весна`, для 0 – відмова. Кожен допустимий номер належить рівно одній гілці, тому результат однозначний.

## Приклад 2. Цифри числа

Ввести невід’ємне ціле не більше мільярда. Знайти суму цифр і число зі зворотним порядком. Нулі з початку зворотного запису як числа не зберігаються.

```java
import java.util.Scanner;

public class Digits {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        if (!in.hasNextLong()) {
            System.out.println("Потрібне ціле число");
            return;
        }
        long value = in.nextLong();
        if (value < 0 || value > 1_000_000_000L) {
            System.out.println("Поза межами");
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
        System.out.println("Сума: " + sum);
        System.out.println("Реверс: " + reversed);
    }
}
```

Для 12030 результат – сума 6, реверс 3021. Для 0 обидва результати нульові; `do-while` обробляє його як число з однією цифрою. Тип `long` дає запас для зворотного запису.

## Приклад 3. Квадратний корінь методом Ньютона

Ввести скінченне a в межах 0–1000000000000. Для додатного a повторювати `x = (x + a/x)/2` до відносного зближення або до 100 ітерацій. Нуль обробляється окремо, щоб уникнути ділення на нуль.

```java
import java.util.Locale;
import java.util.Scanner;

public class NewtonRoot {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        in.useLocale(Locale.US);
        if (!in.hasNextDouble()) {
            System.out.println("Потрібне число");
            return;
        }
        double a = in.nextDouble();
        if (!Double.isFinite(a) || a < 0 || a > 1e12) {
            System.out.println("Поза межами");
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
            System.out.println("Ліміт ітерацій");
            return;
        }
        System.out.printf(Locale.US, "Root: %.6f%n", x);
        System.out.println("Iterations: " + iterations);
    }
}
```

Для 9 корінь друкується як `3.000000`; для 0 – `0.000000` без ітерацій. Це навчальний критерій із абсолютною складовою для малих значень, а не гарантія однакової відносної точності для всіх додатних `double`. Порівняйте з `Math.sqrt` на 0, 1, 9, 0.25 і верхній межі.
