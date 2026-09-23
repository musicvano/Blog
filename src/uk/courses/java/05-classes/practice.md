---
title: "Практика"
description: "Тема 5. Класи та об’єкти: розібрані приклади"
outline: [2, 3]
---

# Практика

## Приклад 1. Прямокутник із двома конструкторами

Конструктор із однією стороною делегує двопараметровому. Початкові розміри скінченні та додатні, поля final. Площа й периметр обчислюються при запиті й не дублюються.

```java
final class Rectangle {
    private final double width;
    private final double height;

    Rectangle(double width, double height) {
        if (!Double.isFinite(width) || !Double.isFinite(height)
                || width <= 0 || height <= 0
                || width > 1e6 || height > 1e6) {
            throw new IllegalArgumentException("Invalid dimensions");
        }
        this.width = width;
        this.height = height;
    }

    Rectangle(double side) { this(side, side); }
    public double area() { return width * height; }
    public double perimeter() { return 2 * (width + height); }
    public String toString() { return width + " x " + height; }
}

public class Main {
    public static void main(String[] args) {
        Rectangle rectangle = new Rectangle(3, 4);
        Rectangle square = new Rectangle(2);
        System.out.println(rectangle);
        System.out.println(rectangle.area());
        System.out.println(rectangle.perimeter());
        System.out.println(square.area());
        try {
            new Rectangle(Double.NaN);
        } catch (IllegalArgumentException error) {
            System.out.println(error.getMessage());
        }
    }
}
```

```text
3.0 x 4.0
12.0
14.0
4.0
Invalid dimensions
```

## Приклад 2. Товар зі знижкою

Ціна задана цілими копійками без податку. Навчальна ставка 20% є явно заданою константою прикладу, а не податковою консультацією. Спершу застосовується знижка з округленням донизу, потім податок із таким самим правилом. Порядок округлення є частиною контракту.

```java
final class Product {
    public static final int TAX_PERCENT = 20;
    private final String name;
    private long price;
    private int discount;

    Product(String name, long price) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Invalid name");
        }
        this.name = name;
        setPrice(price);
    }

    public void setPrice(long value) {
        if (value < 0 || value > 1_000_000_000L) {
            throw new IllegalArgumentException("Invalid price");
        }
        price = value;
    }

    public void setDiscount(int value) {
        if (value < 0 || value > 100) {
            throw new IllegalArgumentException("Invalid discount");
        }
        discount = value;
    }

    public long total() {
        long net = price * (100 - discount) / 100;
        return net + net * TAX_PERCENT / 100;
    }

    public String toString() { return name + ": " + total(); }
}

public class Main {
    public static void main(String[] args) {
        Product product = new Product("Notebook", 10000);
        product.setDiscount(10);
        System.out.println(product);
        try {
            product.setDiscount(101);
        } catch (IllegalArgumentException error) {
            System.out.println(error.getMessage());
        }
        System.out.println(product.total());
    }
}
```

```text
Notebook: 10800
Invalid discount
10800
```

## Приклад 3. Відвідувачі й спільний підсумок

Кожен вхід має свій лічильник, а static-поле накопичує сумарну кількість прийнятих відвідувачів. Це однопотокова модель; синхронізацію потоків тут не розглядаємо. Межа дозволяє уникнути переповнення. Файл Counter.java належить пакету ua.edu.study.counter.

```java
package ua.edu.study.counter;

public final class Counter {
    private static int total;
    private int local;

    public void enter(int count) {
        if (count < 0 || count > 1_000_000 - total) {
            throw new IllegalArgumentException("Invalid count");
        }
        local += count;
        total += count;
    }

    public int getLocal() { return local; }
    public static int getTotal() { return total; }
}
```

Файл Main.java належить пакету ua.edu.study.app.

```java
package ua.edu.study.app;

import ua.edu.study.counter.Counter;

public class Main {
    public static void main(String[] args) {
        Counter north = new Counter();
        Counter south = new Counter();
        north.enter(3);
        south.enter(2);
        System.out.println(north.getLocal());
        System.out.println(south.getLocal());
        System.out.println(Counter.getTotal());
    }
}
```

```text
3
2
5
```

Зберіть пакет через javac -d out, запустіть повне ім’я класу, створіть JAR із Main-Class і повторіть запуск. Порівняйте stdout: спосіб пакування не повинен змінювати предметний результат.
