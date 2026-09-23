---
title: "Практика"
description: "Тема 1. Java і перша програма: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Візитка студента

Створіть `StudentCard.java`. Дані навчальні й задані в коді; програма не запитує особистої інформації.

```java
public class StudentCard {
    public static void main(String[] args) {
        String name = "Олена Коваль";
        String group = "КІ-26";
        int year = 2;
        System.out.println("Ім’я: " + name);
        System.out.println("Група: " + group);
        System.out.println("Курс: " + year);
    }
}
```

```powershell
javac -encoding UTF-8 StudentCard.java
java '-Dstdout.encoding=UTF-8' StudentCard
```

Очікуються три рядки: `Ім’я: Олена Коваль`, `Група: КІ-26`, `Курс: 2`. Порівняйте результат у вікні *Run* і в терміналі. Неправильне кодування не виправляють заміною українських літер латинськими.

## Приклад 2. Кілометри та милі

Контракт першої версії: один аргумент із крапкою, скінченне число від 0 до 1 000 000 км. Тут показано саме правильний ввід; розбір помилок є окремою темою. Коефіцієнт: одна міжнародна миля дорівнює 1,609344 км.

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

`java Miles 10` друкує `Miles: 6.214`. Неправильна кількість аргументів або число поза межами дає код 2. Текст `abc` поки спричинить `NumberFormatException`: це відома межа першої версії, яку потрібно записати в README. Не стверджуйте, що програма вже перевіряє кожен можливий формат.

## Приклад 3. Програма та три коміти

Програма обчислює кількість аркушів для копій документа. В одному аркуші містяться дві сторінки; кожна копія починається з нового аркуша. Для п’яти сторінок і трьох копій потрібно дев’ять аркушів.

```java
public class PrintSheets {
    public static void main(String[] args) {
        int pages = 5;
        int copies = 3;
        int sheetsPerCopy = (pages + 1) / 2;
        int sheets = sheetsPerCopy * copies;
        System.out.println("Аркушів на копію: " + sheetsPerCopy);
        System.out.println("Усього аркушів: " + sheets);
    }
}
```

Перший коміт містить працездатний розрахунок для однієї копії. Другий додає кількість копій і правильну формулу округлення. Третій додає README з командами, версією JDK і ручною перевіркою `3 * 3 = 9`. Перед кожним комітом перегляньте `git diff --staged`.

Порівняйте з помилковою формулою `(pages * copies + 1) / 2`: вона дозволяє почати нову копію на звороті попередньої, чого контракт не допускає. Історія має пояснювати виправлення саме цієї поведінки.
